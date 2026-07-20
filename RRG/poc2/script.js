// Scope all global module variables explicitly at the top of the closure execution ring
let datasets = {};
let fullTimeline = [];
let masterTimeline = [];
let playInterval = null;

document.addEventListener("DOMContentLoaded", function () {

    const tailSelect = document.getElementById("rrgTailLength");
    const controlsContainer = document.getElementById("rrgSectorControls");
    const slider = document.getElementById("rrgTimelineSlider");
    const dateDisplay = document.getElementById("rrgCurrentDateDisplay");
    const playBtn = document.getElementById("rrgPlayBtn");
    const tooltip = document.getElementById("rrgTooltip");
    const chartContainer = document.getElementById("rrgChartContainer");
    const periodSelect = document.getElementById("rrgPeriodSelect");

    let period = "";
    if(periodSelect.value == "3m"){
        period = "3 Months"
    } else if(periodSelect.value == "1y"){
        period = "1 Year"
    } 
    // else{
    //     period = "5 Years"
    // }
    

    const csvUrls = {
        "NIFTY IT": `https://raw.githubusercontent.com/NitroNik7/TSR-Frontend/refs/heads/nitro/RRG/poc2/sectorData/rrg/${period}/NIFTY IT.csv`,
        "NIFTY METALS": `https://raw.githubusercontent.com/NitroNik7/TSR-Frontend/refs/heads/nitro/RRG/poc2/sectorData/rrg/${period}/NIFTY METALS.csv`,
        "NIFTY PHARMA": `https://raw.githubusercontent.com/NitroNik7/TSR-Frontend/refs/heads/nitro/RRG/poc2/sectorData/rrg/${period}/NIFTY PHARMA.csv`,
        "NIFTY OIL GAS": `https://raw.githubusercontent.com/NitroNik7/TSR-Frontend/refs/heads/nitro/RRG/poc2/sectorData/rrg/${period}/NIFTY OIL GAS.csv`
    };

    const sectorColors = {
        "NIFTY IT": "#8eb9ff",   //#3b82f6
        "NIFTY METALS": "#c1a6ff", //#8b5cf6
        "NIFTY PHARMA": "#d376a4", //#ec4899
        "NIFTY OIL GAS": "#ffc767" //#f59e0b
    };


    async function fetchCSV(url) {
        const response = await fetch(url);
        const data = await response.text();
        return parseCSV(data);
    }

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
        const height = width; 
        const padding = 55; 

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
            if (checkbox && !checkbox.checked) return;

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

        const xScale = d3.scaleLinear().domain([100 - maxDev, 100 + maxDev]).range([padding, width - padding]);
        const yScale = d3.scaleLinear().domain([100 - maxDev, 100 + maxDev]).range([height - padding, padding]);

        const svg = d3.select("#rrgChartContainer")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const midX = xScale(100);
        const midY = yScale(100);

        // 1. Quadrant Fills
        svg.append("rect").attr("x", midX).attr("y", padding).attr("width", width - padding - midX).attr("height", midY - padding).attr("class", "rrg-quadrant").attr("fill", "#198754");
        svg.append("rect").attr("x", padding).attr("y", padding).attr("width", midX - padding).attr("height", midY - padding).attr("class", "rrg-quadrant").attr("fill", "#0dcaf0");
        svg.append("rect").attr("x", padding).attr("y", midY).attr("width", midX - padding).attr("height", height - padding - midY).attr("class", "rrg-quadrant").attr("fill", "#dc3545");
        svg.append("rect").attr("x", midX).attr("y", midY).attr("width", width - padding - midX).attr("height", height - padding - midY).attr("class", "rrg-quadrant").attr("fill", "#ffc107");

        // 2. Main Center Quad Intersection Grid Lines (Left as faint subtle indicators)
        svg.append("line").attr("x1", padding).attr("y1", midY).attr("x2", width - padding).attr("y2", midY).attr("stroke", "#cbd5e1").attr("stroke-width", 1.5).attr("stroke-dasharray", "4,4");
        svg.append("line").attr("x1", midX).attr("y1", padding).attr("x2", midX).attr("y2", height - padding).attr("stroke", "#cbd5e1").attr("stroke-width", 1.5).attr("stroke-dasharray", "4,4");

        // 3. Dynamic Outer Edge Border Value Ticks
        // X-Axis Ticks (Aligned cleanly to the absolute BOTTOM boundary edge frame line)
        const xAxis = d3.axisBottom(xScale)
            .ticks(7)
            .tickFormat(d3.format(".1f"));

        svg.append("g")
            .attr("transform", `translate(0, ${height - padding})`)
            .call(xAxis)
            .call(g => g.select(".domain").attr("stroke", "#64748b").attr("stroke-width", 1.5)) 
            .call(g => g.selectAll(".tick line").attr("stroke", "#64748b"))
            .call(g => g.selectAll(".tick text")
                .attr("fill", "#475569")
                .style("font-size", "10px")
                .style("font-weight", "600"));

        // Y-Axis Ticks (Aligned cleanly to the absolute LEFT boundary edge frame line)
        const yAxis = d3.axisLeft(yScale)
            .ticks(7)
            .tickFormat(d3.format(".1f"));

        svg.append("g")
            .attr("transform", `translate(${padding}, 0)`)
            .call(yAxis)
            .call(g => g.select(".domain").attr("stroke", "#64748b").attr("stroke-width", 1.5)) 
            .call(g => g.selectAll(".tick line").attr("stroke", "#64748b"))
            .call(g => g.selectAll(".tick text")
                .attr("fill", "#475569")
                .style("font-size", "10px")
                .style("font-weight", "600"));

        // 4. Quadrant Descriptive Labels
        svg.append("text").attr("x", width - padding - 12).attr("y", padding + 20).attr("text-anchor", "end").attr("class", "rrg-quadrant-text").attr("fill", "#198754").text("LEADING");
        svg.append("text").attr("x", padding + 12).attr("y", padding + 20).attr("text-anchor", "start").attr("class", "rrg-quadrant-text").attr("fill", "#0dcaf0").text("IMPROVING");
        svg.append("text").attr("x", padding + 12).attr("y", height - padding - 15).attr("text-anchor", "start").attr("class", "rrg-quadrant-text").attr("fill", "#dc3545").text("LAGGING");
        svg.append("text").attr("x", width - padding - 12).attr("y", height - padding - 15).attr("text-anchor", "end").attr("class", "rrg-quadrant-text").attr("fill", "#ffc107").text("WEAKENING");

        // 5. Outer Title Labels
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height - 10)
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .attr("fill", "#64748b")
            .text("JdK RS-Ratio");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .attr("fill", "#64748b")
            .text("JdK RS-Momentum");

            		// let advances = d3.line().curve(d3.curveMonotoneX).x(d => x(d.Date)).y(d => y(d.Advances));

        const lineGenerator = d3.line().curve(d3.curveNatural)
            .x(d => xScale(d.ratio))
            .y(d => yScale(d.momentum));

        // 6. Connecting Trails & Interactive Points
        Object.keys(activePointsBySector).forEach(name => {
            const points = activePointsBySector[name];
            const color = sectorColors[name] || "#000000";

            svg.append("path")
                .datum(points)
                .attr("class", "rrg-sector-line")
                .attr("d", lineGenerator)
                .attr("stroke", color)
                .attr("stroke-width", 2.5);

            svg.selectAll(`.dot-${name.replace(/\s+/g, '')}`)
                .data(points)
                .enter()
                .append("circle")
                .attr("class", "rrg-history-dot")
                .attr("cx", d => xScale(d.ratio))
                .attr("cy", d => yScale(d.momentum))
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

            const latest = points[points.length - 1];
            svg.append("text")
                .attr("x", xScale(latest.ratio) + 8)
                .attr("y", yScale(latest.momentum) + 4)
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("font-weight", "bold")
                .attr("fill", "#1e293b")
                .text(name);
        });
    }

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
                } else {
                    curr++;
                }
                slider.value = curr;
                renderChart();
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
        // FIX: Use the custom parsing logic instead of native constructor
        const latestDateObj = parseDateString(latestDateStr);
        
        if (isNaN(latestDateObj.getTime())) {
            console.error("Failed to parse latest date:", latestDateStr);
            return;
        }

        const boundaryDate = new Date(latestDateObj);

        if (periodSelect && periodSelect.value === "3m") {
            boundaryDate.setMonth(boundaryDate.getMonth() - 3);
        } else {
            boundaryDate.setFullYear(boundaryDate.getFullYear() - 1);
        }

        // FIX: Use the custom parsing logic here as well for timeline evaluation
        masterTimeline = fullTimeline.filter(dateStr => parseDateString(dateStr) >= boundaryDate);

        if (masterTimeline.length === 0) {
            masterTimeline = fullTimeline.slice(-60);
        }

        slider.max = masterTimeline.length - 1;
        slider.value = masterTimeline.length - 1;

        Object.keys(datasets).forEach(key => {
            const safeId = key.replace(/\s+/g, '');
            let count = 0;
            masterTimeline.forEach(d => {
                if (datasets[key][d]) count++;
            });

            const checkbox = document.getElementById(`chk_${safeId}`);
            if (checkbox) {
                const badge = checkbox.closest('.rrg-sector-item').querySelector('.badge');
                if (badge) badge.textContent = `${count} Days`;
            }
        });

        renderChart();
    }

    async function init() {
        try {
            const keys = Object.keys(csvUrls);
            const promises = keys.map(key => fetchCSV(csvUrls[key]));
            const results = await Promise.all(promises);

            let allDates = new Set();
            keys.forEach((key, index) => {
                datasets[key] = results[index];
                Object.keys(results[index]).forEach(d => allDates.add(d));
            });

            fullTimeline = Array.from(allDates).sort((a, b) => new Date(a) - new Date(b));

            if (fullTimeline.length === 0) {
                controlsContainer.innerHTML = `<div class="text-warning small p-2">Empty structured data sets retrieved.</div>`;
                return;
            }

            slider.disabled = false;
            controlsContainer.innerHTML = "";
            
            keys.forEach(key => {
                const safeId = key.replace(/\s+/g, '');
                const item = document.createElement("div");
                item.className = "d-flex align-items-center justify-content-between p-2 rounded rrg-sector-item border bg-white";
                item.innerHTML = `
                    <div class="form-check mb-0">
                        <input class="form-check-input" type="checkbox" id="chk_${safeId}" checked style="cursor: pointer;">
                        <label class="form-check-label small fw-bold text-dark" for="chk_${safeId}" style="cursor: pointer;">
                            <span class="d-inline-block rounded-circle me-2" style="width: 10px; height: 10px; background-color: ${sectorColors[key]};"></span>${key}
                        </label>
                    </div>
                    <span class="badge bg-light text-secondary border x-small">0 Days</span>
                `;
                controlsContainer.appendChild(item);
                document.getElementById(`chk_${safeId}`).addEventListener("change", renderChart);
            });

            window.addEventListener("resize", renderChart);
            tailSelect.addEventListener("change", renderChart);
            slider.addEventListener("input", renderChart);
            playBtn.addEventListener("click", togglePlayback);

            if (periodSelect) {
                periodSelect.addEventListener("change", updateTimelineFilter);
            }

            updateTimelineFilter();

        } catch (err) {
            console.error("Timeline setup mapping context error:", err);
            controlsContainer.innerHTML = `<div class="text-danger small p-2"><i class="fas fa-exclamation-circle me-1"></i> Failed to download data context tracking options.</div>`;
        }
    }

    init();
});
