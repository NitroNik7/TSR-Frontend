// Scope all global module variables explicitly at the top of the closure execution ring
// let datasets = {};
// let fullTimeline = [];
// let masterTimeline = [];
// let playInterval = null;
// let allIndices = [];
// let leadingIndices = [];
// let laggingIndices = [];
// let improvingIndices = [];
// let weakeningIndices = [];
// let benchmarkIdx = "NIFTY";

// const tailSelect = document.getElementById("tsrRrgTailLengthSlider");
// const indicesContainer = document.getElementById("tsrRrgIndicesContainer");
// const slider = document.getElementById("tsrRrgTimelineSlider");
// const dateDisplay = document.getElementById("rrgCurrentDateDisplay");
// const playBtn = document.getElementById("tsrRrgPlayChartBtn");
// const tooltip = document.getElementById("rrgTooltip");
// const chartContainer = document.getElementById("rrgChartContainer");
// const periodSelect = document.getElementById("tsrRrgPeriodSelect");
// const tickSelect = document.getElementById("tsrRrgTickSelect");
// // const indexCatMenu = document.getElementById("tsrRrgIndexCategoryMenu");

// const indexDef = [
//     { id: "NIFTY IT", label: "NIFTY IT", color: "#3b82f6" },
//     { id: "NIFTY METALS", label: "NIFTY METALS", color: "#8b5cf6" },
//     { id: "NIFTY PHARMA", label: "NIFTY PHARMA", color: "#ec4899" },
//     { id: "NIFTY OIL GAS", label: "NIFTY OIL GAS", color: "#f59e0b" },
//     { id: "NIFTY AUTO", label: "NIFTY AUTO", color: "#724800" },
//     { id: "NIFTY MIDCAP 50", label: "NIFTY MIDCAP 50", color: "#49dc95" },
//     { id: "NIFTY CHEMICALS", label: "NIFTY CHEMICALS", color: "#f50b0b" },
//     { id: "NIFTY MEDIA", label: "NIFTY MEDIA", color: "#260bf5" },
//     { id: "NIFTY RURAL", label: "NIFTY RURAL", color: "#ff00f7" },
//     { id: "NIFTY 200", label: "NIFTY 200", color: "#854c4e" },
//     { id: "NIFTY 500", label: "NIFTY 500", color: "#462c00" },
// ];

// async function getData(id) {
//     let period = "";
//     if (periodSelect.value == "3m") {
//         period = "3 Months"
//     } else if (periodSelect.value == "1y") {
//         period = "1 Year"
//     }
//     // else{
//     //     period = "5 Years"
//     // }

//     let url = `https://raw.githubusercontent.com/NitroNik7/TSR-Frontend/refs/heads/nitro/RRG/poc3/rrg/${period}/${id}.csv`;

//     const response = await fetch(url);
//     const data = await response.text();
//     return parseCSV(data);
// }

// TODO Rewrite to simplify
// function parseCSV(text) {
//     const lines = text.split(/\r?\n/).map(line => line.trim()).filter(line => line !== "");
//     if (lines.length <= 1) return {};

//     const headers = lines[0].split(",").map(h => h.trim().toLowerCase());

//     let dateIndex = headers.findIndex(h => h.includes("date"));
//     let ratioIndex = headers.findIndex(h => h.includes("ratio") || h.includes("rsratio") || h.includes("jdkrs"));
//     let momentumIndex = headers.findIndex(h => h.includes("momentum") || h.includes("rsmom") || h.includes("jdkmom"));

//     if (dateIndex === -1) dateIndex = 0;
//     if (ratioIndex === -1) ratioIndex = 1;
//     if (momentumIndex === -1) momentumIndex = 2;

//     const dateMap = {};
//     for (let i = 1; i < lines.length; i++) {
//         const cols = lines[i].split(",");
//         if (cols.length > Math.max(ratioIndex, momentumIndex)) {
//             const rawRatio = parseFloat(cols[ratioIndex]);
//             const rawMomentum = parseFloat(cols[momentumIndex]);
//             const dateKey = cols[dateIndex] ? cols[dateIndex].trim() : "";

//             if (dateKey && !isNaN(rawRatio) && !isNaN(rawMomentum)) {
//                 dateMap[dateKey] = { ratio: rawRatio, momentum: rawMomentum };
//             }
//         }
//     }
//     return dateMap;
// }

// function renderChart() {
//     if (!masterTimeline || masterTimeline.length === 0) return;

//     const containerRect = chartContainer.getBoundingClientRect();
//     const width = containerRect.width || 600;
//     const height = containerRect.height || 400;
//     const padding = 40;

//     chartContainer.innerHTML = "";

//     const currentIndex = parseInt(slider.value, 10);
//     const tailLength = parseInt(tailSelect.value, 10);
//     const targetDate = masterTimeline[currentIndex];

//     if (dateDisplay) {
//         dateDisplay.textContent = targetDate || "No Data Selected";
//     }

//     const activePointsBySector = {};
//     let maxDev = 1.0;

//     Object.keys(datasets).forEach(name => {
//         const checkbox = document.getElementById(`chk_${name.replace(/\s+/g, '')}`);
//         if (mintJsUtil.isNull(checkbox) || !checkbox.checked) return;

//         const sectorMap = datasets[name];
//         const sectorPoints = [];

//         for (let i = currentIndex - tailLength + 1; i <= currentIndex; i++) {
//             if (i >= 0 && i < masterTimeline.length) {
//                 const dKey = masterTimeline[i];
//                 if (sectorMap[dKey]) {
//                     sectorPoints.push({
//                         date: dKey,
//                         ratio: sectorMap[dKey].ratio,
//                         momentum: sectorMap[dKey].momentum,
//                         sectorName: name
//                     });
//                 }
//             }
//         }

//         if (sectorPoints.length > 0) {
//             activePointsBySector[name] = sectorPoints;
//             sectorPoints.forEach(pt => {
//                 const devX = Math.abs(pt.ratio - 100);
//                 const devY = Math.abs(pt.momentum - 100);
//                 if (devX > maxDev) maxDev = devX;
//                 if (devY > maxDev) maxDev = devY;
//             });
//         }
//     });

//     maxDev = maxDev * 1.30;

//     // Base Scales
//     const xScaleBase = d3.scaleLinear().domain([100 - maxDev, 100 + maxDev]).range([padding, width - padding]);
//     const yScaleBase = d3.scaleLinear().domain([100 - maxDev, 100 + maxDev]).range([height - padding, padding]);

//     // Root SVG
//     const svg = d3.select("#rrgChartContainer")
//         .append("svg")
//         .attr("width", width)
//         .attr("height", height)
//         .style("cursor", "grab");

//     // Clip Path to prevent chart elements from overflowing outside grid area during zoom/pan
//     svg.append("defs").append("clipPath")
//         .attr("id", "rrgClip")
//         .append("rect")
//         .attr("x", padding)
//         .attr("y", padding)
//         .attr("width", width - (padding * 2))
//         .attr("height", height - (padding * 2));

//     // Group for Zoomable Content (clipped to chart boundary)
//     const chartContent = svg.append("g").attr("clip-path", "url(#rrgClip)");

//     // Group for Non-Zoomable Axes and Outer Labels
//     const axesGroup = svg.append("g");

//     // Static Quadrant Quadrants Background Fills (Inside chartContent)
//     const quadGroup = chartContent.append("g").attr("class", "quadrants");

//     // Grid Lines Group
//     const gridGroup = chartContent.append("g").attr("class", "grid-lines");

//     // Path & Marker Data Group
//     const dataGroup = chartContent.append("g").attr("class", "data-layer");

//     // Line Generator Helper
//     const lineGenerator = d3.line().curve(d3.curveNatural);

//     // Zoom Behaviour Setup
//     const zoom = d3.zoom()
//         .scaleExtent([0.5, 10]) // Min/Max Zoom level
//         .extent([[padding, padding], [width - padding, height - padding]])
//         .on("zoom", zoomed);

//     svg.call(zoom);

//     // Initial Zoom Update Handler
//     function zoomed(event) {
//         const transform = event.transform;

//         // Rescale X and Y domains based on pan/zoom transformation
//         const newX = transform.rescaleX(xScaleBase);
//         const newY = transform.rescaleY(yScaleBase);

//         const midX = newX(100);
//         const midY = newY(100);

//         // 1. Update Quadrant Backgrounds
//         quadGroup.selectAll("*").remove();
//         quadGroup.append("rect").attr("x", midX).attr("y", padding).attr("width", Math.max(0, width - padding - midX)).attr("height", Math.max(0, midY - padding)).attr("class", "rrg-quadrant").attr("fill", "#198754");
//         quadGroup.append("rect").attr("x", padding).attr("y", padding).attr("width", Math.max(0, midX - padding)).attr("height", Math.max(0, midY - padding)).attr("class", "rrg-quadrant").attr("fill", "#0dcaf0");
//         quadGroup.append("rect").attr("x", padding).attr("y", midY).attr("width", Math.max(0, midX - padding)).attr("height", Math.max(0, height - padding - midY)).attr("class", "rrg-quadrant").attr("fill", "#dc3545");
//         quadGroup.append("rect").attr("x", midX).attr("y", midY).attr("width", Math.max(0, width - padding - midX)).attr("height", Math.max(0, height - padding - midY)).attr("class", "rrg-quadrant").attr("fill", "#ffc107");

//         // 2. Update Grid Lines (Full chart background grid)
//         gridGroup.selectAll("*").remove();

//         // Horizontal Grid Lines
//         gridGroup.selectAll(".grid-line-h")
//             .data(newY.ticks(10))
//             .enter()
//             .append("line")
//             .attr("class", "grid-line-h")
//             .attr("x1", padding)
//             .attr("x2", width - padding)
//             .attr("y1", d => newY(d))
//             .attr("y2", d => newY(d))
//             .attr("stroke", "#e2e8f0")
//             .attr("stroke-width", 1);

//         // Vertical Grid Lines
//         gridGroup.selectAll(".grid-line-v")
//             .data(newX.ticks(10))
//             .enter()
//             .append("line")
//             .attr("class", "grid-line-v")
//             .attr("y1", padding)
//             .attr("y2", height - padding)
//             .attr("x1", d => newX(d))
//             .attr("x2", d => newX(d))
//             .attr("stroke", "#e2e8f0")
//             .attr("stroke-width", 1);

//         // Highlight Center Axes Lines (100, 100 Baseline)
//         gridGroup.append("line")
//             .attr("x1", padding).attr("y1", midY)
//             .attr("x2", width - padding).attr("y2", midY)
//             .attr("stroke", "#94a3b8").attr("stroke-width", 1.5).attr("stroke-dasharray", "4,4");

//         gridGroup.append("line")
//             .attr("x1", midX).attr("y1", padding)
//             .attr("x2", midX).attr("y2", height - padding)
//             .attr("stroke", "#94a3b8").attr("stroke-width", 1.5).attr("stroke-dasharray", "4,4");

//         // 3. Rescale Ticks
//         axesGroup.selectAll(".axis-layer").remove();

//         const xAxis = d3.axisBottom(newX).ticks(7).tickFormat(d3.format(".1f"));
//         const yAxis = d3.axisLeft(newY).ticks(7).tickFormat(d3.format(".1f"));

//         axesGroup.append("g")
//             .attr("class", "axis-layer")
//             .attr("transform", `translate(0, ${height - padding})`)
//             .call(xAxis)
//             .call(g => g.select(".domain").attr("stroke", "#64748b").attr("stroke-width", 1.5))
//             .call(g => g.selectAll(".tick line").attr("stroke", "#64748b"))
//             .call(g => g.selectAll(".tick text").attr("fill", "#475569").style("font-size", "10px").style("font-weight", "600"));

//         axesGroup.append("g")
//             .attr("class", "axis-layer")
//             .attr("transform", `translate(${padding}, 0)`)
//             .call(yAxis)
//             .call(g => g.select(".domain").attr("stroke", "#64748b").attr("stroke-width", 1.5))
//             .call(g => g.selectAll(".tick line").attr("stroke", "#64748b"))
//             .call(g => g.selectAll(".tick text").attr("fill", "#475569").style("font-size", "10px").style("font-weight", "600"));

//         // 4. Update Sector Paths and History Dots
//         dataGroup.selectAll("*").remove();

//         lineGenerator
//             .x(d => newX(d.ratio))
//             .y(d => newY(d.momentum));

//         Object.keys(activePointsBySector).forEach(name => {
//             const points = activePointsBySector[name];
//             const color = mintJsUtil.getObjFrmArr(indexDef, name).color;

//             // Tail Path
//             dataGroup.append("path")
//                 .datum(points)
//                 .attr("class", "rrg-sector-line")
//                 .attr("d", lineGenerator)
//                 .attr("stroke", color)
//                 .attr("stroke-width", 2.5)
//                 .attr("fill", "none");

//             // Interactive Dots
//             dataGroup.selectAll(`.dot-${name.replace(/\s+/g, '')}`)
//                 .data(points)
//                 .enter()
//                 .append("circle")
//                 .attr("class", "rrg-history-dot")
//                 .attr("cx", d => newX(d.ratio))
//                 .attr("cy", d => newY(d.momentum))
//                 .attr("r", (d, i) => i === points.length - 1 ? 5.5 : 3.5)
//                 .attr("fill", color)
//                 .attr("stroke", "#ffffff")
//                 .attr("stroke-width", (d, i) => i === points.length - 1 ? 1.5 : 1)
//                 .on("mouseover", function (event, d) {
//                     tooltip.style.display = "block";
//                     tooltip.innerHTML = `
//                         <div class="fw-bold text-center border-bottom pb-1 mb-1 small text-info">${d.sectorName}</div>
//                         <div class="x-small">Date: <b>${d.date}</b></div>
//                         <div class="x-small">Rs-Ratio: <b>${d.ratio.toFixed(2)}</b></div>
//                         <div class="x-small">Rs-Momentum: <b>${d.momentum.toFixed(2)}</b></div>
//                     `;
//                 })
//                 .on("mousemove", function (event) {
//                     const containerRect = chartContainer.getBoundingClientRect();
//                     const mouseX = event.clientX - containerRect.left;
//                     const mouseY = event.clientY - containerRect.top;
//                     tooltip.style.left = (mouseX + 15) + "px";
//                     tooltip.style.top = (mouseY - 15) + "px";
//                 })
//                 .on("mouseout", function () {
//                     tooltip.style.display = "none";
//                 });

//             // Sector Label
//             const latest = points[points.length - 1];
//             dataGroup.append("text")
//                 .attr("x", newX(latest.ratio) + 8)
//                 .attr("y", newY(latest.momentum) + 4)
//                 .attr("font-family", "sans-serif")
//                 .attr("font-size", "11px")
//                 .attr("font-weight", "bold")
//                 .attr("fill", "#1e293b")
//                 .text(name);
//         });
//     }

//     // Static Outer Labels (Non-Zoomable)
//     axesGroup.append("text").attr("x", width - padding - 12).attr("y", padding + 20).attr("text-anchor", "end").attr("class", "rrg-quadrant-text").attr("fill", "#198754").text("LEADING");
//     axesGroup.append("text").attr("x", padding + 12).attr("y", padding + 20).attr("text-anchor", "start").attr("class", "rrg-quadrant-text").attr("fill", "#0dcaf0").text("IMPROVING");
//     axesGroup.append("text").attr("x", padding + 12).attr("y", height - padding - 15).attr("text-anchor", "start").attr("class", "rrg-quadrant-text").attr("fill", "#dc3545").text("LAGGING");
//     axesGroup.append("text").attr("x", width - padding - 12).attr("y", height - padding - 15).attr("text-anchor", "end").attr("class", "rrg-quadrant-text").attr("fill", "#ffc107").text("WEAKENING");

//     axesGroup.append("text")
//         .attr("x", width / 2)
//         .attr("y", height - 10)
//         .attr("text-anchor", "middle")
//         .attr("font-family", "sans-serif")
//         .attr("font-size", "12px")
//         .attr("font-weight", "bold")
//         .attr("fill", "#64748b")
//         .text("JdK RS-Ratio");

//     axesGroup.append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("x", -(height / 2))
//         .attr("y", 12)
//         .attr("text-anchor", "middle")
//         .attr("font-family", "sans-serif")
//         .attr("font-size", "12px")
//         .attr("font-weight", "bold")
//         .attr("fill", "#64748b")
//         .text("JdK RS-Momentum");

//     // Bind Zoom Buttons
//     d3.select("#rrgZoomInBtn").on("click", () => svg.transition().duration(300).call(zoom.scaleBy, 1.3));
//     d3.select("#rrgZoomOutBtn").on("click", () => svg.transition().duration(300).call(zoom.scaleBy, 0.7));
//     d3.select("#rrgZoomResetBtn").on("click", () => svg.transition().duration(300).call(zoom.transform, d3.zoomIdentity));

//     // Trigger Initial Render
//     svg.call(zoom.transform, d3.zoomIdentity);
// }

// // TODO understand
// function togglePlayback() {
//     if (playInterval) {
//         clearInterval(playInterval);
//         playInterval = null;
//         playBtn.innerHTML = '<i class="fas fa-play"></i>';
//     } else {
//         playBtn.innerHTML = '<i class="fas fa-pause"></i>';
//         playInterval = setInterval(() => {
//             let curr = parseInt(slider.value, 10);
//             if (curr >= masterTimeline.length - 1) {
//                 curr = 0;
//                 clearInterval(playInterval);
//                 playInterval = null;
//                 playBtn.innerHTML = '<i class="fas fa-play"></i>';
//             } else {
//                 curr++;
//                 renderChart();
//             }
//             slider.value = curr;
//         }, 140);
//     }
// }

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
        let year = parts[2];
        if (year.length == 2) {
            year = "20" + year
        }
        return new Date(`${year}-${month}-${day}`);
    }
    return new Date(dateStr);
}

// function updateTimelineFilter() {
//     if (!fullTimeline || fullTimeline.length === 0) return;

//     if (playInterval) {
//         clearInterval(playInterval);
//         playInterval = null;
//         playBtn.innerHTML = '<i class="fas fa-play"></i>';
//     }

//     const latestDateStr = fullTimeline[fullTimeline.length - 1];
//     const latestDateObj = parseDateString(latestDateStr); // FIX: Use the custom parsing logic instead of native constructor

//     if (isNaN(latestDateObj.getTime())) {
//         console.error("Failed to parse latest date:", latestDateStr);
//         return;
//     }

//     const boundaryDate = new Date(latestDateObj);

//     // rewrite
//     if (periodSelect && periodSelect.value === "3m") {
//         boundaryDate.setMonth(boundaryDate.getMonth() - 3);
//     } else {
//         boundaryDate.setFullYear(boundaryDate.getFullYear() - 1);

//     }

//     masterTimeline = fullTimeline.filter(dateStr => parseDateString(dateStr) >= boundaryDate); // FIX: Use the custom parsing logic here as well for timeline evaluation

//     if (masterTimeline.length === 0) {
//         masterTimeline = fullTimeline;
//     }

//     slider.max = masterTimeline.length - 1;
//     slider.value = masterTimeline.length - 1;


//     leadingIndices = [];
//     laggingIndices = [];
//     improvingIndices = [];
//     weakeningIndices = [];
//     Object.keys(datasets).forEach(name => {
//         const checkbox = document.getElementById(`chk_${name.replace(/\s+/g, '')}`);
//         // datasets[name].findIndex()
//         let indexRrgVal = datasets[name][latestDateStr];

//         if (mintJsUtil.isNotNull(indexRrgVal)) {

//             if (indexRrgVal.ratio >= 100 && indexRrgVal.momentum >= 100) {
//                 leadingIndices.push(name);
//             } else if (indexRrgVal.ratio >= 100 && indexRrgVal.momentum < 100) {
//                 weakeningIndices.push(name);
//             } else if (indexRrgVal.ratio < 100 && indexRrgVal.momentum < 100) {
//                 laggingIndices.push(name);
//             } else {
//                 improvingIndices.push(name);
//             }

//             allIndices.push(name);
//         }
//     });

//     renderChart();
// }

// async function init() {
//     try {

//         // const keys = Object.keys(csvUrls);
//         // const promises = keys.map(key => fetchCSV(csvUrls[key]));
//         const keys = indexDef;
//         const promises = keys.map(key => getData(key.id));
//         const results = await Promise.all(promises);

//         let allDates = new Set();
//         keys.forEach((key, index) => {
//             datasets[key.id] = results[index];
//             Object.keys(results[index]).forEach(d => allDates.add(d));
//         });

//         fullTimeline = Array.from(allDates).sort((a, b) => new Date(a) - new Date(b));

//         if (fullTimeline.length === 0) {
//             indicesContainer.innerHTML = `<div class="text-warning small p-2">Empty structured data sets retrieved.</div>`;
//             return;
//         }

//         slider.disabled = false;
//         indicesContainer.innerHTML = "";

//         keys.forEach(key => {
//             const safeId = key.id.replace(/\s+/g, '');
//             const item = document.createElement("div");
//             item.className = "w-100 d-flex align-items-center justify-content-between p-2 rounded rrg-sector-item border bg-white";
//             item.innerHTML = `

//                     <div class="form-check mb-0">
//                         <input class="form-check-input" type="checkbox" id="chk_${safeId}" checked style="cursor: pointer;">
//                         <label class="form-check-label small fw-bold text-dark" for="chk_${safeId}" style="cursor: pointer;">
//                             ${key.label}
//                         </label>
//                     </div>

//                 `;
//             indicesContainer.appendChild(item);
//             document.getElementById(`chk_${safeId}`).addEventListener("change", renderChart);
//         });

//         window.addEventListener("resize", renderChart);
//         tailSelect.addEventListener("change", () => { updateTailLabel(); renderChart() });
//         slider.addEventListener("input", renderChart);
//         playBtn.addEventListener("click", togglePlayback);

//         if (periodSelect) {
//             periodSelect.addEventListener("change", updateTimelineFilter);
//         }

//         if (tickSelect) {
//             tickSelect.addEventListener("change", updateTimelineFilter);
//         }

//         updateTimelineFilter();
//         updateTailLabel();

//         let indexRadios = document.querySelectorAll("input[name='tsrRrgIndexCategoryMenu']");
//         indexRadios.forEach(radio => {
//             radio.addEventListener("click", () => {
//                 updateIndices(radio.id);
//             });

//         });
//         // if (indexCatMenu) {
//         //     indexCatMenu.addEventListener("change", updateIndices);
//         // }

//     } catch (err) {
//         console.error("Timeline setup mapping context error:", err);
//         indicesContainer.innerHTML = `<div class="text-danger small p-2"><i class="fas fa-exclamation-circle me-1"></i> Failed to download data context tracking options.</div>`;
//     }
// }

// function updateTailLabel() {
//     let tailLabelId = "tsrRrgTailLengthSliderLabel";
//     let tailLabel = document.getElementById(tailLabelId);

//     tailLabel.innerHTML = tailSelect.value + " " + tickSelect.value;
// }

// function updateIndices(radioId) {
//     let indices = null;
//     let radio = document.getElementById(radioId);
//     if (radio.checked) {
//         // if (radio.id == "showAll") {

//         // } else if (radio.id == "hideAll") {

//         // }
//         let showIndices = true;
//         if (radio.id == "showLeading") {
//             indices = leadingIndices;
//         } else if (radio.id == "showLagging") {
//             indices = laggingIndices;
//         } else if (radio.id == "showImproving") {
//             indices = improvingIndices;
//         } else if (radio.id == "showWeakening") {
//             indices = weakeningIndices;
//         } else if (radio.id == "showAll") {
//             indices = allIndices;
//         } else {
//             showIndices = false;
//             indices = allIndices;
//         }

//         indicesContainer.innerHTML = "";
//         indices.forEach(index => {
//             const safeId = index.replace(/\s+/g, '');
//             const item = document.createElement("div");

//             let indexObj = mintJsUtil.getObjFrmArr(indexDef, index);
//             let checked = showIndices ? "checked" : "";
//             item.className = "w-100 d-flex align-items-center justify-content-between p-2 rounded rrg-sector-item border bg-white";
//             item.innerHTML = `

//                         <div class="form-check mb-0">
//                             <input class="form-check-input" type="checkbox" id="chk_${safeId}" ${checked} style="cursor: pointer;">
//                             <label class="form-check-label small fw-bold text-dark" for="chk_${safeId}" style="cursor: pointer;">
//                                 <span class="d-inline-block rounded-circle me-2" style="width: 10px; height: 10px; background-color: ${indexObj.color};"></span>${indexObj.label}
//                             </label>
//                         </div>

//                     `;
//             indicesContainer.appendChild(item);
//             document.getElementById(`chk_${safeId}`).addEventListener("change", renderChart);

//         })
//         // if (!showIndices) {
//         // indices.forEach((index) => {
//         //     const safeId = index.replace(/\s+/g, '');
//         renderChart();
//         // })
//         // }
//         //     keys.forEach(key => {
//         // const safeId = key.id.replace(/\s+/g, '');
//         // const item = document.createElement("div");
//         // item.className = "w-100 d-flex align-items-center justify-content-between p-2 rounded rrg-sector-item border bg-white";
//         // item.innerHTML = `

//         //         <div class="form-check mb-0">
//         //             <input class="form-check-input" type="checkbox" id="chk_${safeId}" checked style="cursor: pointer;">
//         //             <label class="form-check-label small fw-bold text-dark" for="chk_${safeId}" style="cursor: pointer;">
//         //                 <span class="d-inline-block rounded-circle me-2" style="width: 10px; height: 10px; background-color: ${key.color};"></span>${key.label}
//         //             </label>
//         //         </div>

//         //     `;
//         // indicesContainer.appendChild(item);
//         // document.getElementById(`chk_${safeId}`).addEventListener("change", renderChart);
//         // });
//     }
//     // console.log(indexCatMenu.value);

// }

// init();

// TODO
// Fetch data from API
var miSrg = (function () {

    let htmlU = mintHtmlUtil;
    let jsu = mintJsUtil;

    let thisObj = 'miSrg';
    const FB_DIV = "tsrRrgFbDiv";
    const LOAD_DIV = "tsrRrgLdDiv";

    const periodSelect = document.getElementById("tsrRrgPeriodSelect");
    const tickSelect = document.getElementById("tsrRrgTickSelect");
    const tailInputSlider = document.getElementById("tsrRrgTailLengthSlider");
    const indexRadioMenuId = "tsrRrgIndexCategoryMenu";

    const indexData = {
        "NIFTY 50": { id: "NIFTY 50", label: "NIFTY 50", pr: false },
        "NIFTY IT": { id: "NIFTY IT", label: "NIFTY IT", pr: true },
        "NIFTY AUTO": { id: "NIFTY AUTO", label: "NIFTY AUTO", pr: true },
        "NIFTY PHARMA": { id: "NIFTY PHARMA", label: "NIFTY PHARMA", pr: true },
        "NIFTY METALS": { id: "NIFTY METALS", label: "NIFTY METALS", pr: false },
        "NIFTY OIL GAS": { id: "NIFTY OIL GAS", label: "NIFTY OIL GAS", pr: false },
        "NIFTY AUTO": { id: "NIFTY AUTO", label: "NIFTY AUTO", pr: false },
        "NIFTY MEDIA": { id: "NIFTY MEDIA", label: "NIFTY MEDIA", pr: false },
        "NIFTY MIDCAP 50": { id: "NIFTY MIDCAP 50", label: "NIFTY MIDCAP 50", pr: false },
        "NIFTY RURAL": { id: "NIFTY RURAL", label: "NIFTY RURAL", pr: false },
    };

    let benchmarkIdx = indexData["NIFTY 50"];
    let period = periodSelect.value;


    function init() {

        // get data
        userAction('init');

        setTimeout(() => {
            processData();
            console.log(indexData);
        }, 5000);
    }

    function userAction(param1) {

        if (param1 == 'init') {

            isPrUser();
            Object.keys(indexData).forEach(indexName => {
                let index = indexData[indexName];
                let url = `https://raw.githubusercontent.com/NitroNik7/TSR-Frontend/refs/heads/nitro/RRG/sectorData/${indexName}.csv`;

                if (index.pr && !isPrUser()) {
                    return;
                }

                // let DJS_URL = '/rt/djs';
                // let postData = { cat: 'Markets', subCat: 'AdvanceDecline', freq: adrFreq, classi: adrSb, type: 'chart' }
                // let postData = {};

                // var remoteObject = new RC(url, null, postData, LOAD_DIV, FB_DIV, thisObj, 'uar', 'init');
                // remoteObject.param1 = index.id;
                // jsu.rc(remoteObject);

                $.ajax({
                    url: url,
                    success: function (results) {

                        let data = {
                            "statusCode": "success",
                            results: results
                        }
                        var remoteObject = new Object();
                        remoteObject.param1 = index.id;
                        userActionResponse(data, 'init', remoteObject)

                    }, error: function (error) {
                        htmlU.addMsgToDiv(FB_DIV, "Error: " + error);
                    }
                });
            })

        }

        // if (param1 == 'chart') {
        //     let adrSb = htmlU.getInputVal('adrSb');
        //     let adrFreq = htmlU.getInputVal('adrFreq');


        //     let DJS_URL = '/rt/djs';
        //     let postData = { cat: 'Markets', subCat: 'AdvanceDecline', freq: adrFreq, classi: adrSb, type: 'chart' }

        //     var remoteObject = new RC(DJS_URL, null, postData, LOAD_DIV, FB_DIV, thisObj, 'uar', 'chart');

        //     // URL  : // https://www.tsruat.com/rt//djs?cat=Markets&subCat=HeatMap&freq=mm5&index=Nifty50
        //     jsu.rc(remoteObject);

        // } else if (param1 == 'adrSbTick') {


        //     let adrFreq = htmlU.getInputVal('allAdrTick');  // tsrAdrSbTick


        //     let classi = htmlU.getInputVal('idxType');

        //     let DJS_URL = '/rt/djs';
        //     let postData = { cat: 'Markets', subCat: 'AdvanceDecline', freq: adrFreq, classi: classi, type: param1 }

        //     var remoteObject = new RC(DJS_URL, null, postData, LOAD_DIV, FB_DIV, thisObj, 'uar', param1);
        //     remoteObject.param1 = param1;
        //     // URL  : // https://www.tsruat.com/rt//djs?cat=Markets&subCat=HeatMap&freq=mm5&index=Nifty50
        //     jsu.rc(remoteObject);

        // } else if (param1 == 'adrSB') {

        //     let idxSbType = htmlU.getInputVal('idxSbType');

        //     if (idxSbType == null) idxSbType = 'Nifty500';


        //     let DJS_URL = '/rt/djs';
        //     let postData = { cat: 'Markets', subCat: 'AdvanceDecline', freq: FREQ_INTRA_DAILY, classi: idxSbType, type: 'adrSbTick' }

        //     var remoteObject = new RC(DJS_URL, null, postData, LOAD_DIV, FB_DIV, thisObj, 'uar', param1);

        //     remoteObject.param1 = param1;
        //     jsu.rc(remoteObject);

        // }
    }

    function userActionResponse(data, type, remoteObject) {
        if (data.statusCode == MSG_STATUS_GOOD) {

            if (type == 'init') {
                indexData[remoteObject.param1].data = data.results;
            }

            // if (type == 'chart') {

            //     let result = data.results;

            //     let dataArr = [];
            //     let row = null;
            //     for (let i = 0; i < result.length; i++) {

            //         row = result[i];
            //         dataArr.push({ 'Date': jsu.parseDate(row.dt), 'Advances': Number(row.a), 'Declines': Number(row.d) });

            //         // if(i==  1) break;

            //     }

            //     drawChartFromData(dataArr);

            // } else {
            //     let rows = ''
            //     let result = data.results;


            //     let showIndex = remoteObject.param1 == 'adrSB' ? true : false;

            //     for (let i = 0; i < result.length; i++) {
            //         row = result[i];


            //         if (row == null) {

            //             if (showIndex) {
            //                 row({ a: 0, d: 0 })
            //             } else {
            //                 if ((row.a == 0 && row.d == 0)) continue;
            //             }

            //         }



            //         let idxObj = jsu.getObjFrmArr(INDEX_LIST, row.id);

            //         if (idxObj == null) continue;


            //         let detailedUrl = jsu.getRootUrl() + '/Screener/Markets/AdvanceDecline'


            //         let adrData = {
            //             numAdvances: row.a, numDeclines: row.d, idSuffix: row.id,
            //             stockBasket: idxObj.label, detailedUrl: detailedUrl
            //         }


            //         let cntHtml = createAdvancedDeclineRatioBar(adrData, showIndex, row.id);
            //         rows += cntHtml;

            //         if (showIndex) break;

            //         rows += '<hr>';

            //     }
            //     htmlU.addMsgToDiv('advCntRow', true, rows);

            //     // if(remoteObject.param1 == 'adrSbTick'){
            //     // 	htmlU.addMsgToDiv('advCntRow', true,rows);
            //     // }else{
            //     // 	htmlU.addMsgToDiv('advCntRow', true,rows);
            //     // }


            // }
        }
    }

    // TODO
    function isPrUser() {

        // if (jsu.isNotNull(mtgv) && jsu.isNotNull(mtgv.mtpp) && jsu.isNotNull(mtgv.mtpp)) {
        //     premInit = true;
        // } else {
        //     setTimeout(() => {
        //         console.log("new fn call")
        //         isPrUser();
        //     }, 500);
        // }

        // console.log("old fn call")
        // if (premInit && mtgv.mtpp.pr) {
        //     return true;
        // } else {
        //     return false;
        // }

        return true;
    }

    function parseCSV(text) {
        const lines = text.split(/\r?\n/).map(line => line.trim()).filter(line => line !== "");
        if (lines.length <= 1) return {};

        const headers = lines[0].split(",").map(h => h.trim().toLowerCase());

        let dateIndex = headers.findIndex(h => h.includes("date"));
        // let ratioIndex = headers.findIndex(h => h.includes("ratio") || h.includes("rsratio") || h.includes("jdkrs"));
        // let momentumIndex = headers.findIndex(h => h.includes("momentum") || h.includes("rsmom") || h.includes("jdkmom"));
        let closeIndex = headers.findIndex(h => h.includes("close"));

        if (dateIndex === -1) dateIndex = 0;
        if (closeIndex === -1) closeIndex = 1;
        // if (ratioIndex === -1) ratioIndex = 1;
        // if (momentumIndex === -1) momentumIndex = 2;

        const dateMap = {};
        for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(",");
            if (cols.length > closeIndex) {
                // const rawRatio = parseFloat(cols[ratioIndex]);
                // const rawMomentum = parseFloat(cols[momentumIndex]);
                const dateKey = cols[dateIndex] ? cols[dateIndex].trim() : "";
                const close = parseFloat(cols[closeIndex]);

                if (dateKey && !isNaN(close)) {
                    dateMap[dateKey] = { close: close };
                }
            }
        }
        return dateMap;
    }


    function processData() {


        // parseCSV
        Object.keys(indexData).forEach((indexName) => {
            let index = indexData[indexName];

            if (jsu.isNotNull(index.data)) {
                index.data = parseCSV(index.data);
                sortObjByDateStr(index.data);


                let dateKeys = Object.keys(index.data);

                let latestDateStr = dateKeys[dateKeys.length - 1];
                let latestDateObj = parseDateString(latestDateStr);

                let startDateObj = parseDateString(latestDateStr);

                if (period == "3m") {
                    startDateObj.setMonth(latestDateObj.getMonth() - 3);
                } else if (period == "1y") {
                    startDateObj.setFullYear(latestDateObj.getFullYear() - 1);
                }

                let dataWithinPeriod = {};
                Object.keys(index.data).forEach((dateStr) => {
                    if (parseDateString(dateStr) >= startDateObj) {
                        dataWithinPeriod[dateStr] = index.data[dateStr];
                    }
                })

                // console.log("");
                // indexData = data;
                index.data = dataWithinPeriod;
            }
        });

        Object.keys(indexData).forEach((indexName) => {
            let index = indexData[indexName];

            if (indexName == benchmarkIdx.id) {
                return;
            }

            if (jsu.isNotNull(index.data)) {
                index.data = calcRrg(index.data);
            }
        });

        console.log(indexData);

    }


    function calcRrg(idxData) {

        // calc rs
        let benchmarkIdxData = benchmarkIdx.data;

        benchmarkIdxData = sortObjByDateStr(benchmarkIdxData);
        // idxData = sortObjByDateStr(idxData);

        let rsArr = [];

        let dateKeys = Object.keys(idxData);
        for (let i = 0; i < dateKeys.length; i++) {
            let date = dateKeys[i];
            let benchmarkData = benchmarkIdxData[date];

            let rs = 1.0;
            if (jsu.isNotNull(benchmarkData) && benchmarkData.close > 0) {
                rs = idxData[date].close / benchmarkData.close;
            }

            rsArr[i] = rs;
            idxData[date].rs = rs;
        }

        let m = 14;
        let sf = 2;
        let alpha = (1.0 * sf) / (1 + m);
        let emaRsArr = [];
        emaRsArr[0] = rsArr[0];
        for (let i = 1; i < rsArr.length; i++) {
            emaRsArr[i] = rsArr[i] * alpha + emaRsArr[i - 1] * (1 - alpha);
        }

        // calc rs ratio
        let rsRatioArr = [];
        for (let i = 0; i < dateKeys.length; i++) {
            // calc sma(emaRs(i))
            let startIndex = Math.max(0, i - m + 1);
            let count = i - startIndex + 1; // no. of elements

            let sum = 0.0;
            for (let j = startIndex; j <= i; j++) {
                sum += emaRsArr[j];
            }
            let rollingMeanEmaRs = sum / count;

            if (rollingMeanEmaRs != 0) {
                rsRatioArr[i] = 100.0 * (emaRsArr[i] / rollingMeanEmaRs);
            } else {
                rsRatioArr[i] = 100.0;
            }

            idxData[dateKeys[i]].rsRatio = rsRatioArr[i];
        }




        // formula:
        // rs ratio = 100 + (10 * (EMA(rs) - SMA(EMA(rs))) /  );
        console.log(idxData);
        return idxData;
    }


    function sortObjByDateStr(obj) {
        // Get the sorted keys
        let keys = Object.keys(obj).sort((a, b) => {
            let dateA = new Date(a);
            let dateB = new Date(a);

            if (dateA > dateB) return 1;
            if (dateA < dateB) return -1;

            return 0;
        });

        // Create a temporary object to hold sorted key-value pairs
        let temp = {};

        // Copy sorted key-value pairs to the temporary object
        keys.forEach(key => {
            temp[key] = obj[key];
            delete obj[key]; // Remove original key-value pairs
        });

        // Copy the sorted key-value pairs back to the original object
        keys.forEach(key => {
            obj[key] = temp[key];
        });

        return obj;
    }


    return {
        init: init,
        uar: userActionResponse,

    };
})();