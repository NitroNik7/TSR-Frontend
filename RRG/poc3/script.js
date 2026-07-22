// Scope all global module variables explicitly at the top of the closure execution ring
let datasets = {};
let fullTimeline = [];
let masterTimeline = [];
let playInterval = null;

const tailSelect = document.getElementById("tsrRrgTailLengthSlider");
const indicesContainer = document.getElementById("tsrRrgIndicesContainer");
const slider = document.getElementById("tsrRrgTimelineSlider");
const dateDisplay = document.getElementById("rrgCurrentDateDisplay");
const playBtn = document.getElementById("tsrRrgPlayChartBtn");
const tooltip = document.getElementById("rrgTooltip");
const chartContainer = document.getElementById("rrgChartContainer");
const periodSelect = document.getElementById("tsrRrgPeriodSelect");
const tickSelect = document.getElementById("tsrRrgTickSelect");
// const indexCatMenu = document.getElementById("tsrRrgIndexCategoryMenu");

const indexDef = [
    { id: "NIFTY IT", label: "NIFTY IT", color: "#3b82f6" },
    { id: "NIFTY METALS", label: "NIFTY METALS", color: "#8b5cf6" },
    { id: "NIFTY PHARMA", label: "NIFTY PHARMA", color: "#ec4899" },
    { id: "NIFTY OIL GAS", label: "NIFTY OIL GAS", color: "#f59e0b" },
    { id: "NIFTY AUTO", label: "NIFTY AUTO", color: "#724800" },
    { id: "NIFTY MIDCAP 50", label: "NIFTY MIDCAP 50", color: "#49dc95" },
    { id: "NIFTY CHEMICALS", label: "NIFTY CHEMICALS", color: "#f50b0b" },
    { id: "NIFTY MEDIA", label: "NIFTY MEDIA", color: "#260bf5" },
    { id: "NIFTY RURAL", label: "NIFTY RURAL", color: "#ff00f7" },
    { id: "NIFTY 200", label: "NIFTY 200", color: "#854c4e" },
    { id: "NIFTY 500", label: "NIFTY 500", color: "#462c00" },
];

let allIndices = [];
let leadingIndices = [];
let laggingIndices = [];
let improvingIndices = [];
let weakeningIndices = [];

async function getData(id) {
    let period = "";
    if (periodSelect.value == "3m") {
        period = "3 Months"
    } else if (periodSelect.value == "1y") {
        period = "1 Year"
    }
    // else{
    //     period = "5 Years"
    // }

    let url = `https://raw.githubusercontent.com/NitroNik7/TSR-Frontend/refs/heads/nitro/RRG/poc3/rrg/${period}/${id}.csv`;

    const response = await fetch(url);
    const data = await response.text();
    return parseCSV(data);
}

// TODO Rewrite to simplify
function parseCSV(text) {
    const lines = text.split(/\r?\n/).map(line => line.trim()).filter(line => line !== "");
    if (lines.length <= 1) return {};

    const headers = lines[0].split(",").map(h => h.trim().toLowerCase());

    let dateIndex = headers.findIndex(h => h.includes("date") || h.includes("time"));
    let ratioIndex = headers.findIndex(h => h.includes("ratio") || h.includes("rsratio") || h.includes("jdkrs"));
    let momentumIndex = headers.findIndex(h => h.includes("momentum") || h.includes("rsmom") || h.includes("jdkmom"));

    if (dateIndex === -1) dateIndex = 0;
    if (ratioIndex === -1) ratioIndex = 1;
    if (momentumIndex === -1) momentumIndex = 2;

    const dateMap = {};
    for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(",");
        if (cols.length > Math.max(ratioIndex, momentumIndex)) {
            const rawRatio = parseFloat(cols[ratioIndex]);
            const rawMomentum = parseFloat(cols[momentumIndex]);
            const dateKey = cols[dateIndex] ? cols[dateIndex].trim() : "";

            if (dateKey && !isNaN(rawRatio) && !isNaN(rawMomentum)) {
                dateMap[dateKey] = { ratio: rawRatio, momentum: rawMomentum };
            }
        }
    }
    return dateMap;
}

function renderChart() {
    if (!masterTimeline || masterTimeline.length === 0) return;

    const containerRect = chartContainer.getBoundingClientRect();
    const width = containerRect.width || 600;
    const height = containerRect.height || 400;
    const padding = 40;

    chartContainer.innerHTML = "";

    const currentIndex = parseInt(slider.value, 10);
    const tailLength = parseInt(tailSelect.value, 10);
    const targetDate = masterTimeline[currentIndex];

    if (dateDisplay) {
        dateDisplay.textContent = targetDate || "No Data Selected";
    }

    const activePointsBySector = {};
    let maxDev = 1.0;

    Object.keys(datasets).forEach(name => {
        const checkbox = document.getElementById(`chk_${name.replace(/\s+/g, '')}`);
        if (mintJsUtil.isNull(checkbox) || !checkbox.checked) return;

        const sectorMap = datasets[name];
        const sectorPoints = [];

        for (let i = currentIndex - tailLength + 1; i <= currentIndex; i++) {
            if (i >= 0 && i < masterTimeline.length) {
                const dKey = masterTimeline[i];
                if (sectorMap[dKey]) {
                    sectorPoints.push({
                        date: dKey,
                        ratio: sectorMap[dKey].ratio,
                        momentum: sectorMap[dKey].momentum,
                        sectorName: name
                    });
                }
            }
        }

        if (sectorPoints.length > 0) {
            activePointsBySector[name] = sectorPoints;
            sectorPoints.forEach(pt => {
                const devX = Math.abs(pt.ratio - 100);
                const devY = Math.abs(pt.momentum - 100);
                if (devX > maxDev) maxDev = devX;
                if (devY > maxDev) maxDev = devY;
            });
        }
    });

    maxDev = maxDev * 1.30;

    // Base Scales
    const xScaleBase = d3.scaleLinear().domain([100 - maxDev, 100 + maxDev]).range([padding, width - padding]);
    const yScaleBase = d3.scaleLinear().domain([100 - maxDev, 100 + maxDev]).range([height - padding, padding]);

    // Root SVG
    const svg = d3.select("#rrgChartContainer")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("cursor", "grab");

    // Clip Path to prevent chart elements from overflowing outside grid area during zoom/pan
    svg.append("defs").append("clipPath")
        .attr("id", "rrgClip")
        .append("rect")
        .attr("x", padding)
        .attr("y", padding)
        .attr("width", width - (padding * 2))
        .attr("height", height - (padding * 2));

    // Group for Zoomable Content (clipped to chart boundary)
    const chartContent = svg.append("g").attr("clip-path", "url(#rrgClip)");
    
    // Group for Non-Zoomable Axes and Outer Labels
    const axesGroup = svg.append("g");

    // Static Quadrant Quadrants Background Fills (Inside chartContent)
    const quadGroup = chartContent.append("g").attr("class", "quadrants");
    
    // Grid Lines Group
    const gridGroup = chartContent.append("g").attr("class", "grid-lines");

    // Path & Marker Data Group
    const dataGroup = chartContent.append("g").attr("class", "data-layer");

    // Line Generator Helper
    const lineGenerator = d3.line().curve(d3.curveNatural);

    // Zoom Behaviour Setup
    const zoom = d3.zoom()
        .scaleExtent([0.5, 10]) // Min/Max Zoom level
        .extent([[padding, padding], [width - padding, height - padding]])
        .on("zoom", zoomed);

    svg.call(zoom);

    // Initial Zoom Update Handler
    function zoomed(event) {
        const transform = event.transform;
        
        // Rescale X and Y domains based on pan/zoom transformation
        const newX = transform.rescaleX(xScaleBase);
        const newY = transform.rescaleY(yScaleBase);

        const midX = newX(100);
        const midY = newY(100);

        // 1. Update Quadrant Backgrounds
        quadGroup.selectAll("*").remove();
        quadGroup.append("rect").attr("x", midX).attr("y", padding).attr("width", Math.max(0, width - padding - midX)).attr("height", Math.max(0, midY - padding)).attr("class", "rrg-quadrant").attr("fill", "#198754");
        quadGroup.append("rect").attr("x", padding).attr("y", padding).attr("width", Math.max(0, midX - padding)).attr("height", Math.max(0, midY - padding)).attr("class", "rrg-quadrant").attr("fill", "#0dcaf0");
        quadGroup.append("rect").attr("x", padding).attr("y", midY).attr("width", Math.max(0, midX - padding)).attr("height", Math.max(0, height - padding - midY)).attr("class", "rrg-quadrant").attr("fill", "#dc3545");
        quadGroup.append("rect").attr("x", midX).attr("y", midY).attr("width", Math.max(0, width - padding - midX)).attr("height", Math.max(0, height - padding - midY)).attr("class", "rrg-quadrant").attr("fill", "#ffc107");

        // 2. Update Grid Lines (Full chart background grid)
        gridGroup.selectAll("*").remove();

        // Horizontal Grid Lines
        gridGroup.selectAll(".grid-line-h")
            .data(newY.ticks(10))
            .enter()
            .append("line")
            .attr("class", "grid-line-h")
            .attr("x1", padding)
            .attr("x2", width - padding)
            .attr("y1", d => newY(d))
            .attr("y2", d => newY(d))
            .attr("stroke", "#e2e8f0")
            .attr("stroke-width", 1);

        // Vertical Grid Lines
        gridGroup.selectAll(".grid-line-v")
            .data(newX.ticks(10))
            .enter()
            .append("line")
            .attr("class", "grid-line-v")
            .attr("y1", padding)
            .attr("y2", height - padding)
            .attr("x1", d => newX(d))
            .attr("x2", d => newX(d))
            .attr("stroke", "#e2e8f0")
            .attr("stroke-width", 1);

        // Highlight Center Axes Lines (100, 100 Baseline)
        gridGroup.append("line")
            .attr("x1", padding).attr("y1", midY)
            .attr("x2", width - padding).attr("y2", midY)
            .attr("stroke", "#94a3b8").attr("stroke-width", 1.5).attr("stroke-dasharray", "4,4");

        gridGroup.append("line")
            .attr("x1", midX).attr("y1", padding)
            .attr("x2", midX).attr("y2", height - padding)
            .attr("stroke", "#94a3b8").attr("stroke-width", 1.5).attr("stroke-dasharray", "4,4");

        // 3. Rescale Ticks
        axesGroup.selectAll(".axis-layer").remove();

        const xAxis = d3.axisBottom(newX).ticks(7).tickFormat(d3.format(".1f"));
        const yAxis = d3.axisLeft(newY).ticks(7).tickFormat(d3.format(".1f"));

        axesGroup.append("g")
            .attr("class", "axis-layer")
            .attr("transform", `translate(0, ${height - padding})`)
            .call(xAxis)
            .call(g => g.select(".domain").attr("stroke", "#64748b").attr("stroke-width", 1.5))
            .call(g => g.selectAll(".tick line").attr("stroke", "#64748b"))
            .call(g => g.selectAll(".tick text").attr("fill", "#475569").style("font-size", "10px").style("font-weight", "600"));

        axesGroup.append("g")
            .attr("class", "axis-layer")
            .attr("transform", `translate(${padding}, 0)`)
            .call(yAxis)
            .call(g => g.select(".domain").attr("stroke", "#64748b").attr("stroke-width", 1.5))
            .call(g => g.selectAll(".tick line").attr("stroke", "#64748b"))
            .call(g => g.selectAll(".tick text").attr("fill", "#475569").style("font-size", "10px").style("font-weight", "600"));

        // 4. Update Sector Paths and History Dots
        dataGroup.selectAll("*").remove();

        lineGenerator
            .x(d => newX(d.ratio))
            .y(d => newY(d.momentum));

        Object.keys(activePointsBySector).forEach(name => {
            const points = activePointsBySector[name];
            const color = mintJsUtil.getObjFrmArr(indexDef, name).color;

            // Tail Path
            dataGroup.append("path")
                .datum(points)
                .attr("class", "rrg-sector-line")
                .attr("d", lineGenerator)
                .attr("stroke", color)
                .attr("stroke-width", 2.5)
                .attr("fill", "none");

            // Interactive Dots
            dataGroup.selectAll(`.dot-${name.replace(/\s+/g, '')}`)
                .data(points)
                .enter()
                .append("circle")
                .attr("class", "rrg-history-dot")
                .attr("cx", d => newX(d.ratio))
                .attr("cy", d => newY(d.momentum))
                .attr("r", (d, i) => i === points.length - 1 ? 5.5 : 3.5)
                .attr("fill", color)
                .attr("stroke", "#ffffff")
                .attr("stroke-width", (d, i) => i === points.length - 1 ? 1.5 : 1)
                .on("mouseover", function (event, d) {
                    tooltip.style.display = "block";
                    tooltip.innerHTML = `
                        <div class="fw-bold text-center border-bottom pb-1 mb-1 small text-info">${d.sectorName}</div>
                        <div class="x-small">Date: <b>${d.date}</b></div>
                        <div class="x-small">Rs-Ratio: <b>${d.ratio.toFixed(2)}</b></div>
                        <div class="x-small">Rs-Momentum: <b>${d.momentum.toFixed(2)}</b></div>
                    `;
                })
                .on("mousemove", function (event) {
                    const containerRect = chartContainer.getBoundingClientRect();
                    const mouseX = event.clientX - containerRect.left;
                    const mouseY = event.clientY - containerRect.top;
                    tooltip.style.left = (mouseX + 15) + "px";
                    tooltip.style.top = (mouseY - 15) + "px";
                })
                .on("mouseout", function () {
                    tooltip.style.display = "none";
                });

            // Sector Label
            const latest = points[points.length - 1];
            dataGroup.append("text")
                .attr("x", newX(latest.ratio) + 8)
                .attr("y", newY(latest.momentum) + 4)
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("font-weight", "bold")
                .attr("fill", "#1e293b")
                .text(name);
        });
    }

    // Static Outer Labels (Non-Zoomable)
    axesGroup.append("text").attr("x", width - padding - 12).attr("y", padding + 20).attr("text-anchor", "end").attr("class", "rrg-quadrant-text").attr("fill", "#198754").text("LEADING");
    axesGroup.append("text").attr("x", padding + 12).attr("y", padding + 20).attr("text-anchor", "start").attr("class", "rrg-quadrant-text").attr("fill", "#0dcaf0").text("IMPROVING");
    axesGroup.append("text").attr("x", padding + 12).attr("y", height - padding - 15).attr("text-anchor", "start").attr("class", "rrg-quadrant-text").attr("fill", "#dc3545").text("LAGGING");
    axesGroup.append("text").attr("x", width - padding - 12).attr("y", height - padding - 15).attr("text-anchor", "end").attr("class", "rrg-quadrant-text").attr("fill", "#ffc107").text("WEAKENING");

    axesGroup.append("text")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("fill", "#64748b")
        .text("JdK RS-Ratio");

    axesGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2))
        .attr("y", 12)
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("fill", "#64748b")
        .text("JdK RS-Momentum");

    // Bind Zoom Buttons
    d3.select("#rrgZoomInBtn").on("click", () => svg.transition().duration(300).call(zoom.scaleBy, 1.3));
    d3.select("#rrgZoomOutBtn").on("click", () => svg.transition().duration(300).call(zoom.scaleBy, 0.7));
    d3.select("#rrgZoomResetBtn").on("click", () => svg.transition().duration(300).call(zoom.transform, d3.zoomIdentity));

    // Trigger Initial Render
    svg.call(zoom.transform, d3.zoomIdentity);
}

// TODO understand
function togglePlayback() {
    if (playInterval) {
        clearInterval(playInterval);
        playInterval = null;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playInterval = setInterval(() => {
            let curr = parseInt(slider.value, 10);
            if (curr >= masterTimeline.length - 1) {
                curr = 0;
                clearInterval(playInterval);
                playInterval = null;
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                curr++;
                renderChart();
            }
            slider.value = curr;
        }, 140);
    }
}

// Helper function to turn "DD-MM-YYYY" into a valid date object
function parseDateString(dateStr) {
    if (!dateStr) return new Date(NaN);
    // If it's already in YYYY-MM-DD or contains a slash, try parsing it directly
    if (dateStr.includes("-")) {
        const parts = dateStr.split("-");
        // If the first part is 4 digits, it's already YYYY-MM-DD
        if (parts[0].length === 4) return new Date(dateStr);

        // Otherwise assume DD-MM-YYYY and rearrange to YYYY-MM-DD
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        return new Date(`${year}-${month}-${day}`);
    }
    return new Date(dateStr);
}

function updateTimelineFilter() {
    if (!fullTimeline || fullTimeline.length === 0) return;

    if (playInterval) {
        clearInterval(playInterval);
        playInterval = null;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    const latestDateStr = fullTimeline[fullTimeline.length - 1];
    const latestDateObj = parseDateString(latestDateStr); // FIX: Use the custom parsing logic instead of native constructor

    if (isNaN(latestDateObj.getTime())) {
        console.error("Failed to parse latest date:", latestDateStr);
        return;
    }

    const boundaryDate = new Date(latestDateObj);

    // rewrite
    if (periodSelect && periodSelect.value === "3m") {
        boundaryDate.setMonth(boundaryDate.getMonth() - 3);
    } else {
        boundaryDate.setFullYear(boundaryDate.getFullYear() - 1);

    }

    masterTimeline = fullTimeline.filter(dateStr => parseDateString(dateStr) >= boundaryDate); // FIX: Use the custom parsing logic here as well for timeline evaluation

    if (masterTimeline.length === 0) {
        masterTimeline = fullTimeline;
    }

    slider.max = masterTimeline.length - 1;
    slider.value = masterTimeline.length - 1;


    leadingIndices = [];
    laggingIndices = [];
    improvingIndices = [];
    weakeningIndices = [];
    Object.keys(datasets).forEach(name => {
        const checkbox = document.getElementById(`chk_${name.replace(/\s+/g, '')}`);
        // datasets[name].findIndex()
        let indexRrgVal = datasets[name][latestDateStr];

        if (mintJsUtil.isNotNull(indexRrgVal)) {

            if (indexRrgVal.ratio >= 100 && indexRrgVal.momentum >= 100) {
                leadingIndices.push(name);
            } else if (indexRrgVal.ratio >= 100 && indexRrgVal.momentum < 100) {
                weakeningIndices.push(name);
            } else if (indexRrgVal.ratio < 100 && indexRrgVal.momentum < 100) {
                laggingIndices.push(name);
            } else {
                improvingIndices.push(name);
            }

            allIndices.push(name);
        }
    });

    renderChart();
}

async function init() {
    try {

        // const keys = Object.keys(csvUrls);
        // const promises = keys.map(key => fetchCSV(csvUrls[key]));
        const keys = indexDef;
        const promises = keys.map(key => getData(key.id));
        const results = await Promise.all(promises);

        let allDates = new Set();
        keys.forEach((key, index) => {
            datasets[key.id] = results[index];
            Object.keys(results[index]).forEach(d => allDates.add(d));
        });

        fullTimeline = Array.from(allDates).sort((a, b) => new Date(a) - new Date(b));

        if (fullTimeline.length === 0) {
            indicesContainer.innerHTML = `<div class="text-warning small p-2">Empty structured data sets retrieved.</div>`;
            return;
        }

        slider.disabled = false;
        indicesContainer.innerHTML = "";

        keys.forEach(key => {
            const safeId = key.id.replace(/\s+/g, '');
            const item = document.createElement("div");
            item.className = "w-100 d-flex align-items-center justify-content-between p-2 rounded rrg-sector-item border bg-white";
            item.innerHTML = `
                
                    <div class="form-check mb-0">
                        <input class="form-check-input" type="checkbox" id="chk_${safeId}" checked style="cursor: pointer;">
                        <label class="form-check-label small fw-bold text-dark" for="chk_${safeId}" style="cursor: pointer;">
                            ${key.label}
                        </label>
                    </div>
                
                `;
            indicesContainer.appendChild(item);
            document.getElementById(`chk_${safeId}`).addEventListener("change", renderChart);
        });

        window.addEventListener("resize", renderChart);
        tailSelect.addEventListener("change", () => { updateTailLabel(); renderChart() });
        slider.addEventListener("input", renderChart);
        playBtn.addEventListener("click", togglePlayback);

        if (periodSelect) {
            periodSelect.addEventListener("change", updateTimelineFilter);
        }

        if (tickSelect) {
            tickSelect.addEventListener("change", updateTimelineFilter);
        }

        updateTimelineFilter();
        updateTailLabel();

        let indexRadios = document.querySelectorAll("input[name='tsrRrgIndexCategoryMenu']");
        indexRadios.forEach(radio => {
            radio.addEventListener("click", () => {
                updateIndices(radio.id);
            });

        });
        // if (indexCatMenu) {
        //     indexCatMenu.addEventListener("change", updateIndices);
        // }

    } catch (err) {
        console.error("Timeline setup mapping context error:", err);
        indicesContainer.innerHTML = `<div class="text-danger small p-2"><i class="fas fa-exclamation-circle me-1"></i> Failed to download data context tracking options.</div>`;
    }
}

function updateTailLabel() {
    let tailLabelId = "tsrRrgTailLengthSliderLabel";
    let tailLabel = document.getElementById(tailLabelId);

    tailLabel.innerHTML = tailSelect.value + " " + tickSelect.value;
}

function updateIndices(radioId) {
    let indices = null;
    let radio = document.getElementById(radioId);
    if (radio.checked) {
        // if (radio.id == "showAll") {

        // } else if (radio.id == "hideAll") {

        // }
        let showIndices = true;
        if (radio.id == "showLeading") {
            indices = leadingIndices;
        } else if (radio.id == "showLagging") {
            indices = laggingIndices;
        } else if (radio.id == "showImproving") {
            indices = improvingIndices;
        } else if (radio.id == "showWeakening") {
            indices = weakeningIndices;
        } else if (radio.id == "showAll") {
            indices = allIndices;
        } else {
            showIndices = false;
            indices = allIndices;
        }

        indicesContainer.innerHTML = "";
        indices.forEach(index => {
            const safeId = index.replace(/\s+/g, '');
            const item = document.createElement("div");

            let indexObj = mintJsUtil.getObjFrmArr(indexDef, index);
            let checked = showIndices ? "checked" : "";
            item.className = "w-100 d-flex align-items-center justify-content-between p-2 rounded rrg-sector-item border bg-white";
            item.innerHTML = `

                        <div class="form-check mb-0">
                            <input class="form-check-input" type="checkbox" id="chk_${safeId}" ${checked} style="cursor: pointer;">
                            <label class="form-check-label small fw-bold text-dark" for="chk_${safeId}" style="cursor: pointer;">
                                <span class="d-inline-block rounded-circle me-2" style="width: 10px; height: 10px; background-color: ${indexObj.color};"></span>${indexObj.label}
                            </label>
                        </div>

                    `;
            indicesContainer.appendChild(item);
            document.getElementById(`chk_${safeId}`).addEventListener("change", renderChart);

        })
        // if (!showIndices) {
        // indices.forEach((index) => {
        //     const safeId = index.replace(/\s+/g, '');
        renderChart();
        // })
        // }
        //     keys.forEach(key => {
        // const safeId = key.id.replace(/\s+/g, '');
        // const item = document.createElement("div");
        // item.className = "w-100 d-flex align-items-center justify-content-between p-2 rounded rrg-sector-item border bg-white";
        // item.innerHTML = `

        //         <div class="form-check mb-0">
        //             <input class="form-check-input" type="checkbox" id="chk_${safeId}" checked style="cursor: pointer;">
        //             <label class="form-check-label small fw-bold text-dark" for="chk_${safeId}" style="cursor: pointer;">
        //                 <span class="d-inline-block rounded-circle me-2" style="width: 10px; height: 10px; background-color: ${key.color};"></span>${key.label}
        //             </label>
        //         </div>

        //     `;
        // indicesContainer.appendChild(item);
        // document.getElementById(`chk_${safeId}`).addEventListener("change", renderChart);
        // });
    }
    // console.log(indexCatMenu.value);

}

init();

// TODO
// Fetch data from API