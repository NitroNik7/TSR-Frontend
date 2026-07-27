var miSrg = (function () {

    let htmlU = mintHtmlUtil;
    let jsu = mintJsUtil;

    let thisObj = 'miSrg';
    const FB_DIV = "tsrRrgFbDiv";
    const LOAD_DIV = "tsrRrgLdDiv";

    const periodSelect = document.getElementById("tsrRrgPeriodSelect");
    const tickSelect = document.getElementById("tsrRrgTickSelect");
    const tailSlider = document.getElementById("tsrRrgTailLengthSlider");
    const tailInputSlider = document.getElementById("tsrRrgTailLengthSlider");
    const dateDisplay = document.getElementById("tsrRrgCurrentDateDisplay");
    const indexRadioMenuId = "tsrRrgIndexCategoryMenu";
    const slider = document.getElementById("tsrRrgTimelineSlider");
    const playBtn = document.getElementById("tsrRrgPlayChartBtn");

    let playInterval = null;

    const chartContainer = document.getElementById("tsrRrgChartContainer");
    const tooltip = document.getElementById("tsrRrgChartTooltip");
    const indicesContainer = document.getElementById("tsrRrgIndicesContainer");


    let masterTimeline = new Set();

    const tickPeriodDef = [
        {
            id: "5m", label: "5 mins", periods: [
                { id: "100", label: "Last 100 records" },
                { id: "200", label: "Last 200 records" },
                { id: "500", label: "Last 500 records" }
            ]
        },
        {
            id: "D", label: "Daily", periods: [
                { id: "1m", label: "1 Month" },
                { id: "3m", label: "3 Months" },
                { id: "1y", label: "1 Year" },
            ]
        },
        {
            id: "W", label: "Weekly", periods: [
                { id: "3m", label: "3 Months" },
                { id: "1y", label: "1 Year" },
                { id: "2y", label: "2 Years" }
            ]
        },
        {
            id: "M", label: "Monthly", periods: [
                { id: "1y", label: "1 Year" },
                { id: "2y", label: "2 Years" },
                { id: "3y", label: "3 Years" },
                { id: "4y", label: "4 Years" },
                { id: "5y", label: "5 Years" },
            ]
        },
    ];

    // color: "#462c00"
    const indexData = {
        "NIFTY 50": { id: "NIFTY 50", label: "NIFTY 50", pr: false, eqId: 10000, color: "#3b82f6" },
        "NIFTY IT": { id: "NIFTY IT", label: "NIFTY IT", pr: true, eqId: 9700, color: "#8b5cf6" },
        "NIFTY AUTO": { id: "NIFTY AUTO", label: "NIFTY AUTO", pr: true, eqId: 8200, color: "#ec4899" },
        "NIFTY PHARMA": { id: "NIFTY PHARMA", label: "NIFTY PHARMA", pr: true, eqId: 8800, color: "#f59e0b" },
        "NIFTY METALS": { id: "NIFTY METALS", label: "NIFTY METALS", pr: false, eqId: 8000, color: "#724800" },
        "NIFTY OIL GAS": { id: "NIFTY OIL GAS", label: "NIFTY OIL GAS", pr: false, eqId: 4700, color: "#49dc95" },
        "NIFTY MEDIA": { id: "NIFTY MEDIA", label: "NIFTY MEDIA", pr: false, eqId: 8100, color: "#260bf5" },
        "NIFTY MIDCAP 50": { id: "NIFTY MIDCAP 50", label: "NIFTY MIDCAP 50", pr: false, eqId: 9400, color: "#ff00f7" },
        "NIFTY RURAL": { id: "NIFTY RURAL", label: "NIFTY RURAL", pr: false, eqId: 48500, color: "#854c4e" },
    };


    // NIFTY IT
    // https://www.topstockresearch.com/charts/csv/200000/9700M.csv?var=39    

    // NIFTY AUTO
    // https://www.topstockresearch.com/charts/csv/200000/8200M.csv?var=26


    // NIFTY PHARMA
    // https://www.topstockresearch.com/charts/csv/200000/8800M.csv?var=45

    // NIFTY METALS
    // https://www.topstockresearch.com/charts/csv/200000/8000M.csv?var=12



    // NIFTY Oil Gas
    // https://www.topstockresearch.com/charts/csv/200000/4700M.csv?var=68


    // NIFTY MEDIA
    //  https://www.topstockresearch.com/charts/csv/200000/8100M.csv?var=74

    // NIFTY MIDCAP 50
    // https://www.topstockresearch.com/charts/csv/200000/9400M.csv?var=8

    // NIFTY RURAL
    // https://www.topstockresearch.com/charts/csv/200000/48500M.csv?var=8


    let benchmarkIdx = indexData["NIFTY 50"];

    function init() {

        // populateTickAndPeriodSelect("5m");
        populateTickSelect();
        populatePeriodSelect()
        // get data
        userAction('init');

        // TODO fix
        setTimeout(() => {
            process();
        }, 2000);

        slider.addEventListener("input", () => { updateTimelineDateLabel(); renderChart(); });
        tailSlider.addEventListener("input", () => { updateTailLabel(); renderChart(); });
        let indexRadios = document.querySelectorAll("input[name='tsrRrgIndexCategoryMenu']");
        indexRadios.forEach(radio => {
            radio.addEventListener("click", () => {
                updateIndices(radio.id);
            });
        });
        playBtn.addEventListener("click", togglePlayback);
    }

    function populateTickSelect() {

        let html = "";
        for (let i = 0; i < tickPeriodDef.length; i++) {
            html += `<option value="${tickPeriodDef[i].id}">${tickPeriodDef[i].label}</option>`
        }

        tickSelect.innerHTML = html;
        tickSelect.addEventListener("change", () => {
            populatePeriodSelect();

            // update data and UI
            Object.keys(indexData).forEach((idxName) => {
                indexData[idxName].data = null;
            })

            userAction('init');
            setTimeout(() => {
                process();
            }, 2000);
        });
    }

    function process() {
        processData();
        updateTimelineFilter();
        updateTimelineDateLabel();
        updateTailLabel();
        updateIndices('showAll');
        renderChart();
    }

    function populatePeriodSelect() {
        let tick = tickSelect.value;

        let tickPeriod = jsu.getObjFrmArr(tickPeriodDef, tick);

        let periodArr = tickPeriod.periods;

        let html = "";
        for (let i = 0; i < periodArr.length; i++) {
            html += `<option value="${periodArr[i].id}">${periodArr[i].label}</option>`
        }

        periodSelect.innerHTML = html;

        periodSelect.addEventListener("change", () => {
            updateMasterTimeline();
            updateTimelineFilter();
            renderChart();
        });

    }

    // function populateTickAndPeriodSelect(tick) {
    //     let tickObj = jsu.getObjFrmArr(tickPeriodDef, tick);

    //     let periods = tickObj.periods;

    //     let html = "";
    //     for (let i = 0; i < periods.length; i++) {
    //         html += `<option value="">${periods[i].label}</option>`
    //     }
    // }

    // TODO understand
    function togglePlayback() {


        if (playInterval) {

            clearInterval(playInterval);
            playInterval = null;
            playBtn.innerHTML = '<i class="fas fa-play"></i>';

        } else {
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';

            // animate slider
            playInterval = setInterval(() => {
                let curr = parseInt(slider.value, 10);
                let masterTimelineArr = Array.from(masterTimeline);
                if (curr >= masterTimelineArr.length - 1) {
                    curr = 0;
                    clearInterval(playInterval);
                    playInterval = null;
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                } else {
                    curr++;
                    renderChart();
                }
                slider.value = curr;
                updateTimelineDateLabel();
            }, 140);
        }

    }

    function userAction(param1) {

        if (param1 == 'init') {

            // isPrUser();

            let isPremUser = isPrUser();

            Object.keys(indexData).forEach(indexName => {
                let index = indexData[indexName];
                let tick = tickSelect.value;
                // let tick = tickSelect.value;
                // let tickSym = "D";
                // if (tick == "D") {
                //     tickSym = "D";
                // } else if (tick == "weekly") {
                //     tickSym = "W";
                // } else if (tick == "monthly") {
                //     tickSym = "M";
                // }


                let url = `https://raw.githubusercontent.com/NitroNik7/TSR-Frontend/refs/heads/nitro/RRG/sectorData/${tick}/${indexName}.csv`;
                // let url = `https://www.tsrbt1.com/charts/csv/200000/${index.eqId}${tick}.csv?var=39`;
                if (index.pr && isPremUser) {
                    return;
                }

                // let DJS_URL = '/rt/djs';
                // let postData = { cat: 'Markets', subCat: 'AdvanceDecline', freq: adrFreq, classi: adrSb, type: 'chart' }
                // let postData = {};

                // var remoteObject = new RC(url, null, postData, LOAD_DIV, FB_DIV, thisObj, 'uar', 'init');
                // remoteObject.param1 = index.id;
                // jsu.rc(remoteObject); // bt1 

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
    }

    function userActionResponse(data, type, remoteObject) {
        // if (data.statusCode == MSG_STATUS_GOOD) {

        if (type == 'init') {
            // indexData[remoteObject.param1].data = data; // bt1
            indexData[remoteObject.param1].data = data.results;
        }
        // }
    }

    // TODO 
    function isPrUser() {

        // let subsUser = false; // is user subscribed
        // let prUser = false; // is premium plan user
        // if (mtgv.mtpp.pr) {
        //     if (mtgv.mtpp.crossFreq) {
        //         prUser = true;
        //     } else {
        //         subsUser = true;
        //     }
        // }

        while (jsu.isNotNull(mtgv) && jsu.isNotNull(mtgv.mtpp)) {
            if (jsu.isNotNull(mtgv.mtpp.pr)) {
                return true;
            } else {
                return false;
            }
        }


        return false;
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
        // For each index, parseCSV and sort by date
        Object.keys(indexData).forEach((indexName) => {
            let index = indexData[indexName];

            if (jsu.isNotNull(index.data)) {
                console.log(indexName);
                index.data = parseCSV(index.data);
                sortObjByDateStr(index.data);
            }
        });


        updateMasterTimeline();

        // For each index, calc RRG
        Object.keys(indexData).forEach((indexName) => {
            let index = indexData[indexName];

            if (indexName == benchmarkIdx.id) {
                return;
            }

            if (jsu.isNotNull(index.data)) {
                index.data = calcRrg(index.data);
            }
        });

    }

    // Helper function to turn custom date strings into valid Date objects
    function parseDateString(dateStr) {
        if (!dateStr) return new Date(NaN);

        const monthMap = {
            jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
            jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12"
        };

        if (dateStr.includes("-")) {
            const parts = dateStr.split("-").map(p => p.trim());

            // Case 1: "May-08" (Month-YY)
            if (parts.length === 2) {
                const monthKey = parts[0].toLowerCase();
                if (monthMap[monthKey]) {
                    const month = monthMap[monthKey];
                    let year = parts[1];
                    if (year.length === 2) {
                        year = "20" + year;
                    }
                    // Defaults to the 1st day of the month for "May-08" -> 2008-05-01
                    return new Date(`${year}-${month}-01`);
                }
            }

            // Case 2: 3-part dates like "15-Jul-2026", "15-07-2026", or "2026-07-15"
            if (parts.length === 3) {
                // Already ISO format "YYYY-MM-DD"
                if (parts[0].length === 4 && !isNaN(parts[0])) {
                    return new Date(dateStr);
                }

                const day = parts[0].padStart(2, "0");
                let month = parts[1];
                let year = parts[2];

                // Convert month string ("Jul") to numeric string ("07")
                const monthKey = month.toLowerCase();
                if (monthMap[monthKey]) {
                    month = monthMap[monthKey];
                } else {
                    month = month.padStart(2, "0");
                }

                // Convert 2-digit year ("26") to 4-digit year ("2026")
                if (year.length === 2) {
                    year = "20" + year;
                }

                return new Date(`${year}-${month}-${day}`);
            }
        } else if (dateStr.includes("_")) { // dates with time part 04_05_2026_09_15
            const parts = dateStr.split("_").map(p => p.trim());

            let day = parts[0];
            // let monthKey = parts[1].toLowerCase();
            let month = parts[1];
            let year = parts[2];
            let hours = parts[3];
            let minutes = parts[4];
            return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
        }

        console.error("Error in parsing dateStr", dateStr);
        return new Date(dateStr);
    }

    function updateMasterTimeline() {

        let period = periodSelect.value;

        // update data & masterTimeline wrt period
        masterTimeline.clear();
        Object.keys(indexData).forEach((indexName) => {
            let index = indexData[indexName];

            if (jsu.isNotNull(index.data)) {
                let dateKeys = Object.keys(index.data);

                let latestDateStr = dateKeys[dateKeys.length - 1];
                let latestDateObj = parseDateString(latestDateStr);

                // let startDateObj = parseDateString(latestDateStr);
                // if (period == "3m") {
                //     startDateObj.setMonth(latestDateObj.getMonth() - 3);
                // } else if (period == "1y") {
                //     startDateObj.setFullYear(latestDateObj.getFullYear() - 1);
                // }

                let startDateObj = getStartDate(latestDateStr);
                // console.log(indexName, startDateObj, latestDateObj);

                let dataWithinPeriod = {};
                Object.keys(index.data).forEach((dateStr) => {
                    let date = parseDateString(dateStr);
                    if (date >= startDateObj) {
                        dataWithinPeriod[dateStr] = index.data[dateStr];

                        if (!masterTimeline.has(dateStr))
                            masterTimeline.add(dateStr);
                    }
                })

                // index.data = dataWithinPeriod;
            }
        });

        // if date is common across indices, then keep else remove
        masterTimeline.forEach((dateStr) => {

            let rmDate = false; // remove date
            let indices = Object.keys(indexData);

            indices.forEach(index => {
                if (jsu.isNotNull(indexData[index].data)) {

                    let data = indexData[index].data;

                    if (!Object.keys(data).includes(dateStr)) {
                        rmDate = true;
                    }
                }
            })

            if (rmDate)
                masterTimeline.delete(dateStr);
        })
    }

    function getStartDate(latestDateStr) {
        let period = periodSelect.value;

        let latestDateObj = parseDateString(latestDateStr);
        let startDateObj = latestDateObj;

        let masterTimelineArr = Array.from(masterTimeline);

        new Date()
        switch (period) {
            case "100":
                return new Date((latestDateObj.getTime() / (1000 * 60)) - 100);
            case "200":
                return new Date((latestDateObj.getTime() / (1000 * 60)) - 200);
            case "500":
                return new Date((latestDateObj.getTime() / (1000 * 60)) - 500);
            case "1m":
                return startDateObj.setMonth(latestDateObj.getMonth() - 1);
            case "3m":
                return startDateObj.setMonth(latestDateObj.getMonth() - 3);
            case "1y":
                return startDateObj.setFullYear(latestDateObj.getFullYear() - 1);
            case "2y":
                return startDateObj.setFullYear(latestDateObj.getFullYear() - 2);
            case "3y":
                return startDateObj.setFullYear(latestDateObj.getFullYear() - 3);
            case "4y":
                return startDateObj.setFullYear(latestDateObj.getFullYear() - 4);
            case "5y":
                return startDateObj.setFullYear(latestDateObj.getFullYear() - 5);
            default:
                return null;
        }
    }

    function updateTimelineFilter() {

        let period = periodSelect.value;
        let masterTimelineArr = Array.from(masterTimeline);
        if (!masterTimelineArr || masterTimelineArr.length === 0) return;

        if (playInterval) {
            clearInterval(playInterval);
            playInterval = null;
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }

        const latestDateStr = masterTimelineArr[masterTimelineArr.length - 1];
        const latestDateObj = parseDateString(latestDateStr); // FIX: Use the custom parsing logic instead of native constructor

        if (isNaN(latestDateObj.getTime())) {
            console.error("Failed to parse latest date:", latestDateStr);
            return;
        }

        // const boundaryDate = new Date(latestDateObj);


        // if (period === "3m") {
        //     boundaryDate.setMonth(boundaryDate.getMonth() - 3);
        // } else {
        //     boundaryDate.setFullYear(boundaryDate.getFullYear() - 1);

        // }

        // masterTimeline = fullTimeline.filter(dateStr => parseDateString(dateStr) >= boundaryDate); // FIX: Use the custom parsing logic here as well for timeline evaluation

        // if (masterTimeline.length === 0) {
        //     masterTimeline = fullTimeline;
        // }

        slider.max = masterTimelineArr.length - 1;
        slider.value = masterTimelineArr.length - 1;

        // leadingIndices = [];
        // laggingIndices = [];
        // improvingIndices = [];
        // weakeningIndices = [];
        // Object.keys(indexData).forEach(name => {
        //     // const checkbox = document.getElementById(`chk_${name.replace(/\s+/g, '')}`);
        //     // datasets[name].findIndex()
        //     let indexRrgVal = indexData[name].data[latestDateStr];

        //     if (mintJsUtil.isNotNull(indexRrgVal)) {

        //         if (indexRrgVal.ratio >= 100 && indexRrgVal.momentum >= 100) {
        //             leadingIndices.push(name);
        //         } else if (indexRrgVal.ratio >= 100 && indexRrgVal.momentum < 100) {
        //             weakeningIndices.push(name);
        //         } else if (indexRrgVal.ratio < 100 && indexRrgVal.momentum < 100) {
        //             laggingIndices.push(name);
        //         } else {
        //             improvingIndices.push(name);
        //         }

        //         allIndices.push(name);
        //     }
        // });

        // renderChart();
    }

    function updateTimelineDateLabel() {
        let dateKeys = Array.from(masterTimeline);
        const currentIndex = parseInt(slider.value, 10);
        let targetDateStr = dateKeys[currentIndex];

        if (targetDateStr.includes("-")) {
            targetDateStr = targetDateStr.replaceAll("-", " ");
            let substrings = targetDateStr.split("-");
            if (substrings.length == 3) {
                substrings[0] = substrings[0] + "/";
                substrings[1] = substrings[1] + "/";
            }
            let str = "";
            let arr = str.split("");

            targetDateStr = substrings.join();
        } else if (targetDateStr.includes("_")) {
            let substrings = targetDateStr.split("_");
            substrings[0] = substrings[0] + "/";
            substrings[1] = substrings[1] + "/";
            substrings[2] = substrings[2] + " ";
            substrings[3] = substrings[3] + ":";
            targetDateStr = substrings.join("");
        }

        if (dateDisplay) {
            dateDisplay.textContent = targetDateStr || "No Data Selected";
        }

    }

    function updateTailLabel() {
        let tailLabelId = "tsrRrgTailLengthSliderLabel";
        let tailLabel = document.getElementById(tailLabelId);

        let tick = tickSelect.value;
        tailLabel.innerHTML = tailSlider.value;
        // if (tick == "5m") {
        //     tailLabel.innerHTML = (Number(tailSlider.value) * 5) + "mins"
        // } else
        //     tailLabel.innerHTML = tailSlider.value + " " + tick;
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


        let rocArr = [];
        let emaRocArr = [];
        let k = 10; // lookback period

        // ------------------- 4. Calculate ROC ---------------------------
        for (let i = 0; i < dateKeys.length; i++) {
            let lookbackIdx = Math.max(0, i - k);
            let prevRsRatio = rsRatioArr[lookbackIdx];

            if (prevRsRatio != 0)
                rocArr[i] = (rsRatioArr[i] - prevRsRatio) / prevRsRatio;
            else
                rocArr[i] = 0.0;
        }

        // Calc. EMA ROC
        emaRocArr[0] = rocArr[0];
        for (let i = 1; i < dateKeys.length; i++) {
            emaRocArr[i] = (alpha * rocArr[i]) + ((1 - alpha) * emaRocArr[i - 1]);
        }

        for (let i = 0; i < dateKeys.length; i++) {
            let rsMom = 100 + (100 * emaRocArr[i]);
            idxData[dateKeys[i]].rsMomentum = rsMom;
        }

        // console.log(idxData);
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

    function renderChart() {
        // if (!masterTimeline || masterTimeline.length === 0) return;


        const containerRect = chartContainer.getBoundingClientRect();
        const width = containerRect.width || 600;
        const height = containerRect.height || 400;
        const padding = 55;

        chartContainer.innerHTML = "";

        let dateKeys = Array.from(masterTimeline);


        const currentIndex = parseInt(slider.value, 10);
        const tailLength = parseInt(tailSlider.value, 10);
        const targetDateStr = dateKeys[currentIndex];

        // if (dateDisplay) {
        //     dateDisplay.textContent = targetDateStr || "No Data Selected";
        // }

        const activePointsBySector = {};
        let maxDev = 1.0;

        Object.keys(indexData).forEach(name => {


            // const checkbox = document.getElementById(`chk_${name.replace(/\s+/g, '')}`);
            // if (mintJsUtil.isNull(checkbox) || !checkbox.checked) return;

            let cb = document.getElementById(`tsrRrgIdxChk${name.replace(/\s+/g, '')}`); // .replace removes whitespaces
            if (mintJsUtil.isNull(cb) || !cb.checked) return;

            if (name == benchmarkIdx.id)
                return;

            if (jsu.isNull(indexData[name].data)) {
                return;
            }

            const sectorMap = indexData[name].data;
            const sectorPoints = [];

            for (let i = currentIndex - tailLength + 1; i <= currentIndex; i++) {
                if (parseDateString(dateKeys[i]) <= parseDateString(targetDateStr)) {

                    let date = dateKeys[i];
                    let data = sectorMap[date];

                    if (jsu.isNull(data) || jsu.isNull(data.rsRatio) || jsu.isNull(data.rsMomentum)) {
                        console.error(name, date, data);
                    }
                    sectorPoints.push({
                        sectorName: name,
                        date: date,
                        rsRatio: data.rsRatio,
                        rsMomentum: data.rsMomentum,
                    })
                }
            }

            // for (let i = currentIndex - tailLength + 1; i <= currentIndex; i++) {
            //     if (i >= 0 && i < masterTimeline.length) {
            //         const dKey = masterTimeline[i];
            //         if (sectorMap[dKey]) {
            //             sectorPoints.push({
            //                 date: dKey,
            //                 ratio: sectorMap[dKey].ratio,
            //                 momentum: sectorMap[dKey].momentum,
            //                 sectorName: name
            //             });
            //         }
            //     }
            // }

            if (sectorPoints.length > 0) {
                activePointsBySector[name] = sectorPoints;
                sectorPoints.forEach(pt => {
                    const devX = Math.abs(pt.rsRatio - 100);
                    const devY = Math.abs(pt.rsMomentum - 100);
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
        const svg = d3.select("#tsrRrgChartContainer")
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
                .x(d => newX(d.rsRatio))
                .y(d => newY(d.rsMomentum));

            Object.keys(activePointsBySector).forEach(name => {
                const points = activePointsBySector[name];
                const color = indexData[name]["color"];

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
                    .attr("cx", d => newX(d.rsRatio))
                    .attr("cy", d => newY(d.rsMomentum))
                    .attr("r", (d, i) => i === points.length - 1 ? 5.5 : 3.5)
                    .attr("fill", color)
                    .attr("stroke", "#ffffff")
                    .attr("stroke-width", (d, i) => i === points.length - 1 ? 1.5 : 1)
                    .on("mouseover", function (event, d) {
                        tooltip.style.display = "block";
                        tooltip.innerHTML = `
                        <div class="fw-bold text-center border-bottom pb-1 mb-1 small text-info">${d.sectorName}</div>
                        <div class="x-small">Date: <b>${d.date}</b></div>
                        <div class="x-small">Rs-Ratio: <b>${d.rsRatio.toFixed(2)}</b></div>
                        <div class="x-small">Rs-Momentum: <b>${d.rsMomentum.toFixed(2)}</b></div>
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
                    .attr("x", newX(latest.rsRatio) + 8)
                    .attr("y", newY(latest.rsMomentum) + 4)
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
            .text("RS-Ratio");

        axesGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", 12)
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .attr("fill", "#64748b")
            .text("RS-Momentum");

        // Bind Zoom Buttons
        d3.select("#rrgZoomInBtn").on("click", () => svg.transition().duration(300).call(zoom.scaleBy, 1.3));
        d3.select("#rrgZoomOutBtn").on("click", () => svg.transition().duration(300).call(zoom.scaleBy, 0.7));
        d3.select("#rrgZoomResetBtn").on("click", () => svg.transition().duration(300).call(zoom.transform, d3.zoomIdentity));

        // Trigger Initial Render
        svg.call(zoom.transform, d3.zoomIdentity);
    }

    function updateIndices(type) {
        // tsrRrgIndexCategoryMenu
        // tsrRrgIndicesContainer
        // leadingIndices = [];
        // laggingIndices = [];
        // improvingIndices = [];
        // weakeningIndices = [];

        let activeIndices = [];
        let masterTimelineArr = Array.from(masterTimeline);
        const latestDateStr = masterTimelineArr[masterTimelineArr.length - 1];

        let allIndices = {};
        Object.keys(indexData).forEach(name => {
            if (name == benchmarkIdx.id)
                return;

            allIndices[name] = indexData[name];
        });

        Object.keys(indexData).forEach(name => {
            // const checkbox = document.getElementById(`chk_${name.replace(/\s+/g, '')}`);
            // datasets[name].findIndex()
            if (name == benchmarkIdx.id)
                return;

            if (jsu.isNotNull(indexData[name].data)) {
                let idxData = indexData[name].data[latestDateStr];

                if (jsu.isNotNull(idxData)) {

                    if (type == "leading" && idxData.rsRatio >= 100 && idxData.rsMomentum >= 100) {
                        activeIndices[name] = idxData;
                    } else if (type == "weakening" && idxData.rsRatio >= 100 && idxData.rsMomentum < 100) {
                        activeIndices[name] = idxData;
                    } else if (type == "lagging" && idxData.rsRatio < 100 && idxData.rsMomentum < 100) {
                        activeIndices[name] = idxData;
                    } else if (type == "improving" && idxData.rsRatio < 100 && idxData.rsMomentum > 100) {
                        activeIndices[name] = idxData;
                    }
                }
            }
        });

        Object.keys(allIndices).forEach(idxName => {
            if (benchmarkIdx.id == idxName)
                return;

            let idxData = indexData[idxName];
            const safeId = idxData.id.replace(/\s+/g, ''); // removes whitespaces
            let cb = document.getElementById(`tsrRrgIdxChk${safeId}`);
            if (jsu.isNotNull(cb)) {
                cb.checked = "false";
            }
        });

        if (type == "showAll" || type == "hideAll") {
            activeIndices = allIndices;
        }

        indicesContainer.innerHTML = "";
        let showIndices = type == "hideAll" ? "" : "checked";
        Object.keys(activeIndices).forEach(idxName => {
            let idxData = indexData[idxName];
            const safeId = idxData.id.replace(/\s+/g, ''); // removes whitespaces
            const item = document.createElement("div");
            item.className = "w-100 d-flex align-items-center justify-content-between p-2 rounded rrg-sector-item border bg-white";
            if (!idxData.pr || (idxData.pr && isPrUser())) {

                item.innerHTML = `
    
                        <div class="form-check mb-0">
                            <input class="form-check-input" type="checkbox" id="tsrRrgIdxChk${safeId}" ${showIndices} style="cursor: pointer;">
                            <label class="form-check-label small fw-bold text-dark" for="tsrRrgIdxChk${safeId}" style="cursor: pointer;">
                                <span class="d-inline-block rounded-circle me-2" style="width: 10px; height: 10px; background-color: ${idxData.color};"></span>
                                ${idxData.label}
                            </label>
                        </div>
    
                    `;
            } else {
                item.innerHTML = `
                    <div class="form-check mb-0">
                            <input class="form-check-input" type="checkbox" id="tsrRrgIdxChk${safeId}" style="cursor: pointer;" disabled>
                            <label class="form-check-label small fw-bold text-dark" for="tsrRrgIdxChk${safeId}" style="cursor: pointer;">
                                <span class="d-inline-block rounded-circle me-2" style="width: 10px; height: 10px; background-color: ${idxData.color};"></span>
                                ${idxData.label}
                            </label>
                        </div>
                `
            }
            indicesContainer.appendChild(item);

            let cb = document.getElementById(`tsrRrgIdxChk${safeId}`);
            cb.addEventListener("click", renderChart);
        });

        renderChart();
    }


    return {
        init: init,
        uar: userActionResponse,

    };
})();