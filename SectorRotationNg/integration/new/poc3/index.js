/*
* IMPORANT
*   functions with 'process' keyword in their name - load data
*   functions with 'paint' keyword in their name - paint UI
*/


var defStk;
var json;
var jPlist = [];

var miSrn = (function () {  // chart init Params

    let htmlU = mintHtmlUtil;
    let jsu = mintJsUtil;

    var toolsContainerId = "tsrToolsContainer";
    var sectorTypeSelectId = "tsrSecRotTypeSelect";
    var sectorDurationSelectId = "tsrSecRotDurationSelect";

    var baseSectorSectionId = "tsrSecRotBaseSectorSection";
    var sectorCompSectionId = "tsrSectRotSectCompareSection";
    var opSectorTableDivId = "tsrSecRotOpSectorTable";
    var upSectorTableDivId = "tsrSecRotUpSectorTable";
    var sectorOverviewContainerId = "tsrSecRotSectorOverviewContainer";
    var stockTableContainerId = "tsrSecRotStockComparisonTableContainer";
    var stockTableId = "tsrSecRotStockComparisonTable"
    var stockContainerId = "tsrSecRotSectorStockContainer";
    var chartContainerId = "tsrSecRotChartContainer";
    var stockSectionModalId = "tsrSecRotStockSectionModal";
    var stockSectionHeaderId = "tsrSecRotStockSectionHeader";
    var stockSectionBodyId = "tsrSecRotStockSectionBody";

    var allSectorData;
    var allSectorDataClone;
    var minStocks = 2; // min. no. of stocks in a sector
    var NIFTY;
    var currSectorData;
    var currSector;
    var tsrStrengthIndexList = {};
    let sectorTypeSelect = document.getElementById(sectorTypeSelectId);
    let durationSelect = document.getElementById(sectorDurationSelectId);

    // Start
    init();

    function init() {
        let sectorType = sectorTypeSelect.value;
        let duration = durationSelect.value;

        miSrnUtils.pds(sectorDurationSelectId, duration);
        duration = durationSelect.value;

        defStk = null;
        json = null;
        jPlist = [];

        let baseSectorContainer = document.getElementById(baseSectorSectionId);
        baseSectorContainer.innerHTML = "";

        let sectorContainer = document.getElementById(sectorCompSectionId);
        sectorContainer.innerHTML = "";

        let sectorOverviewContainer = document.getElementById(sectorOverviewContainerId);
        sectorOverviewContainer.innerHTML = `<div id="${chartContainerId}"></div>`

        // let chart = document.getElementById(chartContainerId);
        // chart.innerHTML = "";

        $("#" + stockSectionModalId).draggable({ containment: 'parent' });
        let stockSectionModal = document.getElementById(stockSectionModalId);
        stockSectionModal.classList.add("web_dialog");
        stockSectionModal.style.width = "calc(100% - 250px)";
        stockSectionModal.style.minWidth = "300px";
        stockSectionModal.style.height = "calc(80% - 150px)";
        stockSectionModal.style.minHeight = "70vh";
        stockSectionModal.style.fontFamily = "unset";
        stockSectionModal.style.overflow = "unset";

        if (validateSecRotSettings()) {

            if (sectorType != 'industry' || duration != '3m') {
                miSrnUtils.slt(true);
            } else {
                miSrnUtils.slt(false);
            }

            // let url = mintJsUtil.getRootUrl() + `/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=all`; // TODO - use this later
            // let url = `https://www.tsrbt1.com/rt/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=all`;
            // let url = `https://nitronik7.github.io/TSR-Frontend/Temp/secRotData/secRot${duration}${sectorType}.json`;
            // let url = `http://127.0.0.1:5500/Temp/secRotData/secRot${duration}${sectorType}.json`;
            sectorType = sectorType.toUpperCase();
            duration = duration.toUpperCase();

            let url = `https://nitronik7.github.io/TSR-Frontend/SectorRotationNg/integration/new/data/${sectorType}/${duration}_${sectorType}_ALL.json`;
            miSrnUtils.gd(url).then(data => {
                allSectorData = data;
                allSectorDataClone = jsu.cloneObj(allSectorData);

                if (allSectorDataClone["statusCode"] == "success") {
                    //             // TODO to manage from server ...
                    let opSectors = allSectorDataClone["opSec"];
                    let newOpSectors = [];
                    for (let i = 0; i < opSectors.length; i++) {
                        let noOfStocks = opSectors[i]["opEqList"].length + opSectors[i]["upEqList"].length;
                        if ((opSectors[i]["mcChg"] > 0 && opSectors[i]["mcChgPc"] > 0) && (noOfStocks > minStocks)) {
                            newOpSectors.push(opSectors[i]);
                        }
                    }

                    let upSectors = allSectorDataClone["upSec"];
                    let newUpSectors = [];
                    for (let i = 0; i < upSectors.length; i++) {
                        let noOfStocks = upSectors[i]["opEqList"].length + upSectors[i]["upEqList"].length;
                        if ((upSectors[i]["mcChg"] < 0 && upSectors[i]["mcChgPc"] < 0) && (noOfStocks > minStocks)) {
                            newUpSectors.push(upSectors[i]);
                        }
                    }

                    allSectorDataClone["opSec"] = newOpSectors;
                    allSectorDataClone["upSec"] = newUpSectors;

                    paintBaseSectorSection();
                    paintSectorCompSection();
                }
            });
        }
    }

    function paintBaseSectorSection() {

        let baseSectorSection = document.getElementById(baseSectorSectionId);
        let baseSector = "NIFTY";

        // create accordion only if NIFTY (base sector) exists
        if (jsu.isNotNull(baseSectorSection) && jsu.isNotNull(allSectorDataClone[baseSector])) {
            baseSectorSection.classList.add("tsrSectRotBaseIndexSection", "row", "g-4", "p-3", "mb-4", "d-none", "d-md-flex");

            let html = ``;
            // let technicalsUrl = mintJsUtil.getRootUrl() + "/Stock/NIFTY/TechnicalAnalysis";
            // BASE SECTOR CARD
            html += `   <div class="col-xl-3 col-md-6 mt-md-0 ">`
            html += `       <div class="tsrSecRotMetricCard">`
            html += `           <div class="tsrSecRotMetricTop">`
            html += `               <div class="tsrSecRotMetricIcon">`
            // let niftyUrl = mintJsUtil.getRootUrl() + "/Screener/Markets/"; // TODO
            // html += `                   <a href="${niftyUrl}">`
            html += `                       <i class="fas fa-chart-line"></i>`
            // html += `                   </a>`
            html += `               </div>`
            // if (isSectorIdxBased('op') || isSectorIdxBased('up')) {
            //     html += `           <span class="tsrSecRotMetricBadge">
            //                             Benchmark
            //                         </span>`
            // }
            html += `           </div>`
            html += `           <div class="tsrSecRotMetricTitle d-flex" style="gap: 10px;">`
            // html += `               <div class="tsrSecRotMetricIcon">`
            // html += `                       <i class="fas fa-chart-line"></i>`
            // html += `               </div>`
            html += `               Benchmark`
            html += `           </div>`
            // html += `           <div class="tsrSecRotMetricValue">`
            html += `           <div class="tsrSecRotMetricHighlight">`
            // html += `               <div class="tsrSecRotMetricIcon">`
            // html += `                       <i class="fas fa-chart-line"></i>`
            // html += `               </div>`
            // html += `               ${miSrnUtils.grv(allSectorDataClone[baseSector]["price"])}
            html += `               NIFTY`
            html += `           </div>`
            // html += `           <div class="tsrSecRotMetricChange positive">
            //                         <i class="fas fa-arrow-up"></i>
            //                         Market Cap Change: ${miSrnUtils.grv(allSectorDataClone[baseSector]["priceChange"])} %
            //                     </div>`
            let mktChgEleClass = "tsrSecRotMetricChange";
            if (miSrnUtils.grv(allSectorDataClone[baseSector]["mcChg"] > 0)) {
                mktChgEleClass += " positive";
            } else {
                mktChgEleClass += " negative";
            }
            html += `            <div class="tsrSecRotMetricSubtext" >`
            // html += `                Market Cap Change: <span class="${mktChgEleClass}">${miSrnUtils.grv(allSectorDataClone[baseSector]["mcChg"])} | ${miSrnUtils.grv(allSectorDataClone[baseSector]["mcChgPc"])}</span>`
            html += `                <p style="margin-bottom: 0;">Market Cap Change:</p><p> <b>${miSrnUtils.gcv(allSectorDataClone[baseSector]["mcChg"], null, true)} | ${miSrnUtils.gcv(allSectorDataClone[baseSector]["mcChgPc"], null, "%")}</b></p>`
            html += `            </div>`
            html += `       </div>`
            html += `   </div>`

            // STRONGEST SECTOR CARD
            let opSectors = jsu.cloneObj(allSectorDataClone["opSec"]);
            let strongestSector = { name: "-", data: "-" };
            let onclickFn = "";
            if (opSectors.length > 0) {
                // TODO -  IF NOT ALREADY SORTED, SORT SECTORS IN DESC ORDER ACCORDING TO MARKET CAP / RELATIVE STRENGTH
                strongestSector.name = opSectors[0].name;
                if (isSectorIdxBased('op')) {
                    strongestSector.data = "<p style='margin-bottom: 0;'>Relative Returns vs NIFTY:</p> <p style='margin-bottom: 0;'><b>" + miSrnUtils.gcv(opSectors[0].vsNifty, null, "%") + "</b></p>";
                    // function paintChart(secType, secId, stockListType, stockCode, all, chartType, scrollTo)
                    onclickFn = `miSrn.ssc('op', 0); miSrn.pc('op', '0', 'sectorList', '${opSectors[0].code}', false, 'inline', false);`;
                } else {
                    strongestSector.data = "<p style='margin-bottom: 0;'>Market Cap Change:</p><p><b>" + miSrnUtils.gcv(opSectors[0].mcChg, null, "Cr.") + " | " + miSrnUtils.gcv(opSectors[0].mcChgPc, null, "%") + "</b></p>";
                    onclickFn = "miSrn.ssc('op', 0);";
                }
            }
            html += `   <div class="col-xl-3 col-md-6 mt-md-0 ">`
            html += `        <div class="tsrSecRotMetricCard" style="cursor: pointer;" onclick="${onclickFn}">`
            html += `            <div class="tsrSecRotMetricTop">`
            html += `                <div class="tsrSecRotMetricIcon">`
            html += `                    <i class="fas fa-bolt"></i>`
            html += `                </div>`
            html += `            </div>`
            html += `            <div class="tsrSecRotMetricTitle d-flex" style="gap: 10px;">`
            // html += `                <div class="tsrSecRotMetricIcon">`
            // html += `                    <i class="fas fa-bolt"></i>`
            // html += `                </div>`
            html += `                Strongest Sector`
            html += `            </div>`
            html += `            <div class="tsrSecRotMetricHighlight positive">`
            html += `                ${strongestSector.name}`
            html += `            </div>`
            html += `            <div class="tsrSecRotMetricSubtext"  >`
            html += `                ${strongestSector.data}`
            html += `            </div>`
            html += `        </div>`
            html += `   </div> `

            // WEAKEST SECTOR CARD
            let upSectors = jsu.cloneObj(allSectorDataClone["upSec"]);
            let weakestSector = { name: "-", data: "-" };
            onclickFn = "";
            if (upSectors.length > 0) {
                // TODO - SORT SECTORS IN ASC ORDER ACCORDING TO MARKET CAP / RELATIVE STRENGTH
                weakestSector.name = upSectors[0].name;
                if (isSectorIdxBased('up')) {
                    weakestSector.data = "<p style='margin-bottom: 0;'>Relative Returns vs NIFTY:</p> <p style='margin-bottom: 0;'><b>" + miSrnUtils.gcv(upSectors[0].vsNifty, null, "%") + " </b></p>";
                    onclickFn = `miSrn.ssc('up', 0); miSrn.pc('up', '0', 'sectorList', '${upSectors[0].code}', false, 'inline', false);`;
                } else {
                    weakestSector.data = "<p style='margin-bottom: 0;'>Market Cap Change:</p> <p><b>" + miSrnUtils.gcv(upSectors[0].mcChg, null, "Cr.") + " | " + miSrnUtils.gcv(upSectors[0].mcChgPc, null, "%") + "</b></p>";
                    onclickFn = `miSrn.ssc('up', 0);`;
                }
            }
            html += `   <div class="col-xl-3 col-md-6 mt-md-0">`
            html += `        <div class="tsrSecRotMetricCard"  style="cursor: pointer;" onclick="${onclickFn}">`
            html += `            <div class="tsrSecRotMetricTop">`
            html += `                <div class="tsrSecRotMetricIcon" style="color: #ff4d4d; background-color: #ffe8e8;">`
            // html += `                    <i class="fas fa-arrow-trend-down"></i>`
            html += `                       <i class="fas fa-bolt"></i>`
            html += `                </div>`
            html += `            </div>`
            html += `            <div class="tsrSecRotMetricTitle d-flex" style="gap: 10px;">`
            // html += `                <div class="tsrSecRotMetricIcon" style="color: #ff4d4d; background-color: #ffe8e8;">`
            // // html += `                    <i class="fas fa-arrow-trend-down"></i>`
            // html += `                       <i class="fas fa-bolt"></i>`
            // html += `                </div>`
            html += `                Weakest Sector`
            html += `            </div>`
            html += `            <div class="tsrSecRotMetricHighlight negative">`
            html += `                ${weakestSector.name}`
            html += `            </div>`
            html += `            <div class="tsrSecRotMetricSubtext"  >`
            html += `                ${weakestSector.data}`
            html += `            </div>`
            html += `        </div>`
            html += `   </div> `

            // SECTOR PERFORMANCE CARD
            let totalSectors = opSectors.length + upSectors.length;
            html += `   <div class="col-xl-3 col-md-6 mt-md-0">`
            html += `       <div class="tsrSecRotMetricCard">`
            html += `           <div class="tsrSecRotMetricTop">`
            html += `               <div class="tsrSecRotMetricIcon">`
            html += `                   <i class="fas fa-layer-group"></i>`
            html += `               </div>`
            html += `           </div>`
            html += `           <div class="tsrSecRotMetricTitle d-flex" style="gap: 10px;">`
            // html += `               <div class="tsrSecRotMetricIcon">`
            // html += `                   <i class="fas fa-layer-group"></i>`
            // html += `               </div>`
            html += `               Sector Performance`
            html += `           </div>`

            html += `           <div class="d-flex flex-column flex-xxl-row" style="gap: 10px; height: 55%;">`
            // html += `               <div >`
            // html += `                   <p style="margin-bottom: 0; font-size: 14px; text-wrap: nowrap;">`
            // html += `                       <span style="color: #64748b;">Outperforming</span>`
            // html += `                       <i class="fas fa-arrow-up me-2" style="color: green;"></i>`
            // html += `                   </p>`
            // html += `                   <h4 class="mb-1 mb-md-0" style="color: #059669;">`
            // html += `                       ${opSectors.length}`
            // html += `                   </h4>`
            // html += `               </div>`
            html += `               <div class="h-100 d-flex flex-column">`
            html += `                   <p style="margin-bottom: 0; font-size: 14px; text-wrap: nowrap;">`
            html += `                       <span style="color: #64748b;">Outperforming</span>`
            html += `                       <i class="fas fa-arrow-up me-2" style="color: green;"></i>`
            html += `                   </p>`
            html += `                   <h3 class="mb-1 mb-md-0 mt-0 mt-xxl-2" style="color: #059669;">`
            html += `                       ${opSectors.length}`
            html += `                   </h3>`
            html += `               </div>`
            // html += `               <div>`
            // html += `                   <p style="margin-bottom: 0; font-size: 14px; text-wrap: nowrap;">`
            // html += `                       <span style="color: #64748b;">Underperforming</span>`
            // html += `                       <i class="fas fa-arrow-down me-2" style="color: #dc2626;"></i>`
            // html += `                   </p>`
            // html += `                   <h4 class="mb-1 mb-md-0" style="color: #dc2626; ">`
            // html += `                       ${upSectors.length}`
            // html += `                   </h4>`
            // html += `               </div>`
            html += `               <div class="h-100 d-flex flex-column">`
            html += `                   <p style="margin-bottom: 0; font-size: 14px; text-wrap: nowrap;">`
            html += `                       <span style="color: #64748b;">Underperforming</span>`
            html += `                       <i class="fas fa-arrow-down me-2" style="color: #dc2626;"></i>`
            html += `                   </p>`
            html += `                   <h3 class="mb-1 mb-md-0 mt-0 mt-xxl-2" style="color: #dc2626;">`
            html += `                       ${upSectors.length}`
            html += `                   </h3>`
            html += `               </div>`
            html += ``
            // html += `               <div class="mb-1">`
            // // <span style="color: #64748b;">Outperforming:</span>
            // html += `                   <i class="fas fa-arrow-up me-2" style="color: green;"></i>  ${opSectors.length} `
            // html += `               </div>`

            // html += `               <h6 class="mb-1">`
            // html += `                   <i class="fas fa-arrow-down me-2" style="color: red;"></i>  <span style="color: #64748b;">Underperforming:</span> ${upSectors.length} `
            // html += `               </h6>`
            // html += `               <p style="margin-bottom: 0;">OutPerforming: ${opSectors.length}</p>`
            // html += `               <p style="margin-bottom: 0;">UnderPerforming: ${upSectors.length}</p>`
            // html += `               ${totalSectors}`
            html += `           </div>`
            // html += `           <div class="tsrSecRotMetricSubtext">`
            // html += `               Currently Tracked`
            // html += `           </div>`
            html += `       </div>`
            html += `   </div>`


            baseSectorSection.innerHTML = html;
        }
    }

    function paintSectorCompSection() {
        let sectorTableSection = document.getElementById(sectorCompSectionId);

        let html = "";
        // html += `       <!-- Outperforming -->`
        html += `       <div id="tsrSecRotOpSectorsWrapper" class="col-xl-6">`
        html += `           <div class="card tsrSecRotTableCard">`
        html += `                 <div class="card-header tsrSecRotTableHeader outperform">`
        html += `                     <div>`
        html += `                         <h6 class="mb-1">`
        html += `                             <i class="fas fa-arrow-up me-2" style="color: green;"></i>`
        html += `                             Outperforming Sectors`
        html += `                         </h6>`
        html += `                         <div class="tsrSecRotTableSubheader">`
        html += `                             Sectors outperforming benchmark`
        html += `                         </div>`
        html += `                     </div>`
        html += `                     <div class="tsrSecRotTableExpandCollapseBadge d-none d-md-block"`
        html += `                         onclick="miSrnUtils.esct(this, 'tsrSecRotOpSectorsWrapper');">`
        html += `                         <span class="fw-medium me-2">Show more</span>`
        html += `                         <i class="fas fa-expand"></i>`
        html += `                     </div>`
        html += `                 </div>`
        html += `                 <div class="card-body">`
        html += `                     <div id="${opSectorTableDivId}" class="table-responsive">`
        html += `                     </div>`
        html += `                 </div>`
        html += `             </div>`
        html += `         </div>`

        // html += `       <!-- Underperforming -->`
        html += `       <div id="tsrSecRotUpSectorsWrapper" class="col-xl-6">`
        html += `           <div class="card tsrSecRotTableCard">`
        html += `               <div class="card-header tsrSecRotTableHeader underperform">`
        html += `                   <div>`
        html += `                       <h6 class="mb-1">`
        html += `                           <i class="fas fa-arrow-down me-2" style="color: red;"></i>`
        html += `                           Underperforming Sectors`
        html += `                       </h6>`
        html += `                       <div class="tsrSecRotTableSubheader">`
        html += `                           Sectors lagging benchmark`
        html += `                       </div>`
        html += `                   </div>`
        html += `                   <div class="tsrSecRotTableExpandCollapseBadge d-none d-md-block"`
        html += `                       onclick="miSrnUtils.esct(this, 'tsrSecRotUpSectorsWrapper');">`
        html += `                       <span class="fw-medium me-2">Show more</span>`
        html += `                       <i class="fas fa-expand"></i>`
        html += `                   </div>`
        html += `               </div>`
        html += `               <div class="card-body">`
        html += `                   <div id="${upSectorTableDivId}"  class="table-responsive">`
        html += `                   </div>`
        html += `               </div>`
        html += `           </div>`
        html += `       </div>`

        sectorTableSection.innerHTML = html;
        updateSectorTable(opSectorTableDivId, 'op');
        updateSectorTable(upSectorTableDivId, 'up');
    }

    function updateSectorTable(tableContainerId, secType) {

        let sectorTableDiv = document.getElementById(tableContainerId);

        let html = "";
        let isIdxBased = false;

        let sectors;

        let tableId = "";
        if (secType == 'op') {
            sectors = allSectorDataClone["opSec"];
            tableId = "tsrSecRotOutperformTable";
        } else {
            sectors = allSectorDataClone["upSec"];
            tableId = "tsrSecRotUnderperformTable";
        }

        isIdxBased = isSectorIdxBased('op');
        // for (let i = 0; i < sectors.length; i++) {
        //     if (sectors[i].secIdx) {
        //         isIdxBased = true;
        //     }
        // }

        // html += `< div style = "max-height: 50vh; overflow: auto;" > `;

        html += `<table class="table align-middle tsrSecRotTable" id="${tableId}">`
        html += `   <thead>`
        html += `       <tr>`
        html += `           <th></th>`
        html += `           <th></th>`
        html += `           <th></th>`
        if (isIdxBased) {
            html += `       <th></th>`
        }
        html += `           <th colspan="2">Market Cap</th>`
        if (isIdxBased) {
            html += `       <th></th>`
        }
        html += `           <th colspan="2">Stock Performance</th>`
        html += `           <th colspan="2">TSR Strength Index</th>`
        html += `           <th colspan="6">% Stocks</th>`
        html += `       </tr>`
        html += `       <tr>`
        html += `           <th>Rank</th>`
        html += `           <th>Sector</th>`
        html += `           <th></th>`
        if (isIdxBased) {
            // html += `       <th>Relative Returns vs NIFTY</th>`
            html += `       <th>Returns vs NIFTY</th>`
        }
        html += `           <th>Change (%)</th>`
        html += `           <th>Change (in Cr.)</th>`
        if (isIdxBased) {
            html += `           <th>Period Returns (%)</th>`
        }
        html += `           <th>Leading</th>`
        html += `           <th>Lagging</th>`
        html += `           <th>Bullish Stocks</th>`
        html += `           <th>Bearish Stocks</th>`
        if (isIdxBased) {
            if (secType == "op") {
                html += `       <th> Above EMA ${allSectorDataClone["ma1"]} </th> `
                html += `       <th> Above EMA ${allSectorDataClone["ma2"]} </th> `
                html += `       <th> ADX > 20 </th> `
                html += `       <th> RSI > 50 </th> `
                html += `       <th> MACD > 0 </th> `
                html += `       <th> MACD > Signal </th> `
            }
            else {
                html += `       <th> Below EMA ${allSectorDataClone["ma1"]} </th> `
                html += `       <th> Below EMA ${allSectorDataClone["ma2"]} </th> `
                html += `       <th> ADX < 20 </th> `
                html += `       <th> RSI < 50 </th> `
                html += `       <th> MACD < 0 </th> `
                html += `       <th> MACD < Signal </th> `
            }
        }else {

        }
        html += `       </tr>`
        html += `   </thead>`
        html += `   <tbody>`
        if (sectors.length == 0) {
            html += `<tr>`;
            html += `   <td colspan = "13" class="text-center">`;
            html += `       <b>No records</b>`;
            html += `   </td>`;
            html += `</tr> `;
        }
        else {
            for (let i = 0; i < sectors.length; i++) {
                let sector = sectors[i];

                html += `       <tr>`
                html += `           <td><b>${i + 1}</b></td>`
                html += `           <td><b>${sector.name}<b></td>`

                let onclickFn = "";
                if (isIdxBased) {
                    onclickFn = `miSrn.ssc('${secType}', ${i}); miSrn.pc('${secType}', '${i}', 'sectorList', '${sector.code}', false, 'inline', false);`
                } else {
                    onclickFn = `miSrn.ssc('${secType}', ${i});`
                }
                html += `           <td>`
                html += `               <button class="btn btn-sm btn-outline-primary"`
                html += `                   style="font-size: 12px;" onclick="${onclickFn}">`
                html += `                   View`
                html += `                   <i class="fas fa-arrow-down"></i>`
                html += `               </button>`
                html += `           </td>`
                if (isIdxBased) {
                    html += `           <td><b>${miSrnUtils.gcv(sector.vsNifty, null, "%")}<b></td>`
                }

                html += `           <td><b>${miSrnUtils.gcv(sector.mcChgPc, null, "%")}</b></td>`
                html += `           <td>${miSrnUtils.grv(sector.mcChg)}</td>`
                if (isIdxBased) {
                    html += `           <td>${miSrnUtils.gcv(sector.periodReturn, "black", "%")}</td>`
                }
                html += `           <td>${sector.opEq}</td>`
                html += `           <td>${sector.upEq}</td>`
                html += `           <td>${miSrnUtils.grv(sector.tsrBullish)}</td>`
                html += `           <td>${miSrnUtils.grv(sector.tsrBearish)}</td>`
                html += `           <td>${miSrnUtils.grv(sector.ma1 * 100)}</td>`
                html += `           <td>${miSrnUtils.grv(sector.ma2 * 100)}</td>`
                html += `           <td>${miSrnUtils.grv(sector.adx * 100)}</td>`
                html += `           <td>${miSrnUtils.grv(sector.rsi * 100)}</td>`
                html += `           <td>${miSrnUtils.grv(sector.macd0 * 100)}</td>`
                html += `           <td>${miSrnUtils.grv(sector.macds * 100)}</td>`
                html += `       </tr>`
            }
        }
        html += `   </tbody>`
        html += `</table>`

        html += `</div>`;


        html += `<div class="d-flex justify-content-between flex-column flex-md-row mt-3">`

        // TODO hack recheck later
        if (isIdxBased) {
            html += `   <div style="white-space: nowrap;">`
            html += `       View Chart &emsp;`;

            html += `       <a class="link-primary" style="cursor:pointer" onclick="miSrn.pc('${secType}', 0, 'sectorList', '', true, 'inline', true);" oncontextmenu="return false;"> <span class="fas fa-chart-line"></span> Inline </a>`
            html += `       &emsp;|&emsp;`;
            html += `       <a class="link-primary" style="cursor:pointer" onclick="miSrn.pc('${secType}', 0, 'sectorList', '', true, 'tile', true);" oncontextmenu="return false;">  <span class="fas fa-chart-line"></span> Tile  </a>`
            html += `   </div>`
        }
        html += `           <div class="mt-2">`
        html += `                   <p style="font-size: 12px; margin-bottom: 0;">`
        html += `                       <span style="color: red;">*</span>`
        html += `                           Sector / Index rating utilizes only Stocks beyond certain Market Capital`
        html += `                   </p>`
        html += `           </div>`


        html += `</div>`


        sectorTableDiv.innerHTML = html;

        // erase sector cards when other option (of op/up) is selected 
        // let sectorCardContainer = document.getElementById(sectorCardContainerId);
        // sectorCardContainer.innerHTML = "";

        if (!isMobile() && sectors.length != 0) {
            let mdtOptions = {
                paging: false,
                info: false,
                ordering: false,
                responsive: true,
                scrollCollapse: false,
                scrollY: 250,
                scrollX: true,
                dom: 'Bfrtip',
                buttons: [
                    { extend: "copy", className: "btn btn-sm  btn-secondary ms-2    mt-1", text: " Copy" },
                    { extend: "csv", className: "btn  btn-sm btn-secondary ms-2    mt-1", text: " CSV" },
                    { extend: "excel", className: "btn  btn-sm btn-secondary ms-2     mt-1", text: " Excel" },
                    { extend: "print", className: "btn  btn-sm btn-secondary ms-1    mt-1", text: " Print" }
                ],
                fixedColumns: {
                    leftColumns: 2
                }
            }

            miSrnUtils.mdt(tableId, mdtOptions);
        }

    }

    function showSectorCard(secType, secId) {

        let sectorOverviewContainer = document.getElementById(sectorOverviewContainerId);

        let sectors = allSectorDataClone[secType + "Sec"];
        let html = "";

        // sector menu code begins
        html += `<div id="tsrSecRotSectorMenuContainer" style="display: flex;" class="owl-nav align-items-center justify-content-center my-3">`
        html += `   <button type="button" role="presentation" class="owl-prev btn tsrSecRotSectorMenuCarousalPrev">`
        html += `       <span aria-label="Previous">`
        html += `           <i class="fas fa-angle-left"></i>`
        html += `       </span>`
        html += `   </button>`
        html += `   <div id="tsrSecRotSectorMenuCarousal" class="w-75 owl-carousel owl-theme">`
        for (let i = 0; i < sectors.length; i++) {
            html += `   <div class="item p-2">`;
            html += `       <a href="#${i}" onclick="miSrn.ec(); miSrn.psts('${secType}','opEq', ${i}, true, true);">`;
            html += `           <div class="card flex-row justify-content-around shadow-sm p-2">`;
            html += `               <span style="font-weight: 500;">`
            html += sectors[i].name;
            html += `               </span>`
            html += `               <span style="color: midnightblue; white-space: nowrap;">`
            if (i == 0) {
                html += `               1 <sup> st</sup>`;
            } else if (i == 1) {
                html += `               2 <sup> nd</sup>`;
            } else if (i == 2) {
                html += `               3 <sup> rd</sup>`;
            } else {
                html += `               ${i + 1} <sup>th</sup>`;
            }
            html += `               </span>`
            html += `           </div>`
            html += `       </a>`
            html += `   </div>`
        }
        html += `   </div>`;
        html += `   <button type = "button" role = "presentation" class="owl-next btn tsrSecRotSectorMenuCarousalNext">`;
        html += `       <span aria-label="Next">`;
        html += `           <i class="fas fa-angle-right"></i>`;
        html += `       </span>`;
        html += `   </button>`;
        html += `</div>`;

        // sector menu code ends
        // --------------------------------------------------------------------
        // sector card carousal code starts

        html += `<div id="sectorCardsCarousal" class="owl-carousel owl-theme mx-auto">`;
        for (let i = 0; i < sectors.length; i++) {
            html += paintSectorCard(secType, sectors, i);
        }
        html += `</div>`;

        sectorOverviewContainer.innerHTML = html;
        initializeCarousal(true);

        // for (let i = 0; i < sectors.length; i++) {
        processStockTableSection(secType, "opEq", secId, true, false);
        // }

        sectorOverviewContainer.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        let items = Object.keys(tsrStrengthIndexList);
        for (let i = 0; i < items.length; i++) {
            mintHtmlUtil.dlg({
                divId: tsrStrengthIndexList[items[i]]["divId"],
                rank: tsrStrengthIndexList[items[i]]["rank"],
                title: 'Technical Strength Daily',
                leftLabel: 'Sell',
                rightLabel: 'Buy',
                width: 240,
                height: 8
            });
        }

        // sector card carousal code ends
        // initializeCarousal(true);
        // goto selected sector card
        // sectorCardsCarousal
        $("#sectorCardsCarousal").trigger('to.owl.carousel', [secId]);
    }

    function paintSectorCard(secType, sectors, i) {
        let html = "";

        html += `       <div class="tsrSecRotSectOvrvwSection border-0 p-3" data-hash="${i}">`
        html += `            <div class="card shadow-sm tsrSectorRotationDetailsWorkspaceCard">`
        html += `                <div class="card-header bg-transparent p-4 border-bottom d-flex flex-wrap justify-content-between align-items-center gap-3">`
        /*
            html += `                    <div class="d-flex align-items-center gap-3">`
            html += `                        <h4 class="h5 mb-0 fw-bold text-dark tsrSectorRotationCardHeaderTitle"`
            html += `                            id="tsrSectorRotationSelectedSectorName">NIFTY METAL</h4>`
            html += `                        <span`
            html += `                            class="text-muted small border-start ps-3 d-none d-sm-inline">Sector`
            html += `                            Overview</span>`
            html += `                    </div>`
        */
        // html += `                    <div class="d-flex justify-content-between align-items-center">`
        // secType, stockType, secId, show, update
        if (i != 0) {
            html += `                   <div style="cursor: pointer; white-space: nowrap;" class="link-primary sectorCardsCarousalPrev" onclick="miSrn.psts('${secType}','opEq', ${i - 1}, true, true);">`
            html += `                       <i class="fas fa-arrow-left"></i>`
            html += `                       <span class="d-none d-md-inline text-muted">`
            html += `                           &nbsp;`
            html += `                           Prev`
            html += `                       </span>`
            html += `                   </div>`
        }

        html += `                       <h5 class="card-title text-center" style="font-weight: 600;">`
        html += `                           <p style="margin: 0;">`
        html += sectors[i].name;
        html += `                               <b class="d-none d-sm-inline">`
        if (i == 0) {
            html += `                               <sup style="color: gray;"> 1 <sup>st</sup></sup>`;
        }
        else if (i == 1) {
            html += `                               <sup style="color: gray;"> 2 <sup>nd</sup></sup>`;
        }
        else if (i == 2) {
            html += `                               <sup style="color: gray;"> 3 <sup>rd</sup></sup>`;
        }
        else {
            html += `                               <sup style="color: gray;">${i + 1} <sup>th</sup></sup>`;
        }
        html += `                               </b>`
        html += `                           </p>`
        html += `                       </h5>`

        if (i != sectors.length - 1) {
            html += `                   <div style="cursor: pointer; white-space: nowrap;" class="link-primary sectorCardsCarousalNext" onclick="miSrn.psts('${secType}','opEq', ${i + 1}, true, true);">`
            html += `                       <span class="d-none d-md-inline  text-muted">`
            html += `                           Next`
            html += `                           &nbsp;`
            html += `                       </span>`
            html += `                       <i class="fas fa-arrow-right"></i>`
            html += `                   </div>`
        }
        html += `                </div>` // CARD HEADER ENDS

        let sectorAnalysisUrl = mintJsUtil.getRootUrl() + "/Screener/Markets/" + sectors[i].url; // TODO
        // let sectorAnalysisUrl = "http" + "/Screener/Markets/" + sectors[i].url;
        if (!sectors[i]["secIdx"]) {
            sectorAnalysisUrl += "/All"
        }
        html += `                <div class="card-body p-4">`
        html += `                   <div class="row text-center">`;
        html += `                       <h6 class="">`;
        html += `                           <a href="${sectorAnalysisUrl}" target="_blank">`
        html += `                               View in Depth Analysis`
        html += `                               <i class="fas fa-external-link-square-alt"></i>`
        html += `                           </a>`
        html += `                       </h6>`
        html += `                   </div>`;

        // * Highlights row
        html += `                   <div class="row">`;
        if (jsu.isNotNull(sectors[i].secIdx) && sectors[i].secIdx) {
            html += `                   <div class="col col-md-6 p-3" style='align-items: stretch;'>`
            html += `                       <section class="mb-4">`
            html += `                          <div class="mb-3 d-flex justify-content-between">`
            html += `                              <h6 class="tsrSecRotStockSectionTitle">Highlights</h6>`
            html += `                          </div>`
            html += `                          <div class="d-flex justify-content-between mb-3">`
            html += `                              <div class="w-100 d-flex flex-column">`
            html += `                                  <span class="tsrSecRotLabel">`
            html += `                                      Relative Returns`
            html += `                                  </span>`
            html += `                                  <h4 style="color: black; white-space: nowrap; font-weight: bold;">${miSrnUtils.gcv(sectors[i]["vsNifty"], null, "%")}</h4>`
            html += `                              </div>`
            html += `                              <div class="w-100 d-flex flex-column">`
            html += `                                  <span class="tsrSecRotLabel">Market Cap Change </span>`
            html += `                                  <h4 style="color: black; white-space: nowrap; font-weight: bold;">${miSrnUtils.gcv(sectors[i]["mcChg"], null, "Cr.")}`
            html += `                                  </h4>`
            html += `                              </div> `
            html += `                          </div>`;
            html += `                          <div class="d-flex justify-content-between mb-3">`
            html += `                              <div class="w-100 d-flex flex-column">`
            html += `                                  <span class="tsrSecRotLabel">`
            html += `                                      Outperformers`
            // html += `                                      <i class="fas fa-long-arrow-alt-up"></i>`
            html += `                                  </span>`
            html += `                                  <h4 style=" font-weight: bold;">${miSrnUtils.gcv(sectors[i]["opEq"])}</h4>`;
            html += `                              </div>`;
            html += `                              <div class="w-100 d-flex flex-column">`;
            html += `                                  <span class="tsrSecRotLabel">`;
            html += `                                      Underperformers`;
            // html += `                                      <i class="fas fa-long-arrow-alt-down"></i>`
            html += `                                  </span>`;
            html += `                                  <h4 style=" font-weight: bold;">${miSrnUtils.gcv(sectors[i]["upEq"], "#dc2626")}</h4>`
            html += `                              </div>`
            html += `                          </div>`
            html += `                          <div class="d-flex justify-content-between mb-3">`
            html += `                              <div class="w-100 d-flex flex-column">`
            html += `                                      <span class="tsrSecRotLabel">Price</span>`
            html += `                                      <h4 style="color: black; white-space: nowrap; font-weight: bold;">`
            html += miSrnUtils.gcv(sectors[i]["idxVals"]["price"]);
            html += `                                      </h4>`
            html += `                              </div>`
            html += `                              <div class="w-100 d-flex flex-column">`
            html += `                                  <span class="tsrSecRotLabel">Price Change</span>`
            html += `                                  <h4 style="color: black; white-space: nowrap; font-weight: bold;">`
            html += miSrnUtils.gcv(sectors[i]["idxVals"]["priceChange"], null, "%");
            html += `                                  </h4>`
            html += `                              </div>`
            html += `                          </div>`
            html += `                       </section>`;

            html += `                       <section class="mb-4" id="tsrStrengthIndex">`;
            html += `                           <div class="mb-3">`
            html += `                               <h6  class="tsrSecRotStockSectionTitle">Technical Strength Index</h6>`
            html += `                           </div>`
            html += `                           <div class="col-12 col-md-6 d-flex flex-column justify-content-center w-100 my-5">`
            html += `                               <div id='trendStrengthDiv${sectors[i]["id"]}' class="d-flex justify-content-center"></div>`
            html += `                               <div class="tsr_strength_values_container">`
            html += `                                   <div class="d-flex justify-content-center" id="strRank">`
            html += `                                       <span style="font-size: 14px;"> ${sectors[i]["idxVals"]["techPosi"]} </span>`
            html += `                                   </div>`
            html += `                               </div>`
            html += `                           </div>`
            html += `                       </section>`;

            html += `                   </div>`;

            html += `                   <div class="col col-md-6 p-3">`;
            html += `                       <section class="mb-3">`;
            html += `                           <div class="mb-3 d-flex justify-content-between align-items-center">`
            html += `                               <h6 class="tsrSecRotStockSectionTitle">Technicals</h6>`
            // html += `                               <p style="font-size: 12px; margin-bottom: 0;">`
            // html += `                                   <span style="color: red;">*</span>`
            // html += `                                       Technicals based on ${allSectorDataClone["displayFreq"]} tick`
            // html += `                               </p>`
            html += `                           </div>`;
            html += `                           <div class="owl-carousel owl-theme technicals ">`;

            let keys = Object.keys(sectors[i]["idxVals"]);

            for (let j = 0; j < keys.length; j++) {
                if (keys[j] == "ma1" || keys[j] == "ma2" || keys[j] == "rsi" || keys[j] == "macd" || keys[j] == "signal" || keys[j] == "st") {
                    html += `                               <div class="card d-flex flex-column p-3">`;
                    if (keys[j] == "ma1" || keys[j] == "ma2") {
                        if (keys[j] == "ma1") {
                            html += `                           <p  class="tsrSecRotLabel" style="margin-bottom: 0">EMA ${allSectorDataClone["ma1"]}</p>`;
                        } else if (keys[j] == "ma2") {
                            html += `                           <p  class="tsrSecRotLabel" style="margin-bottom: 0">EMA ${allSectorDataClone["ma2"]}</p>`;
                        }
                    }
                    else {
                        html += `                               <p  class="tsrSecRotLabel" style="margin-bottom: 0">${keys[j].toUpperCase()}</p>`;
                    }
                    html += `                                   <h5 style="white-space: nowrap; font-weight: bold;">`;
                    html += miSrnUtils.gcv(sectors[i]["idxVals"][keys[j]]);
                    html += `                                   </h5>`;
                    //             // html += `                       <p style="color: orange;  margin: 0;">Neutral</p>`
                    html += `                               </div>`;
                }
            }

            html += `                           </div>`;
            html += `                       </section>`;

            html += `                       <section class="mb-3">`
            html += `                           <div class="mb-3">`
            html += `                               <h6 class="tsrSecRotStockSectionTitle">Returns</h6>`
            html += `                           </div>`
            html += `                           <div class="owl-carousel owl-theme periodicReturns ">`;

            // for (let j = 0; j < stock["tech"].length; j++) {
            //     if (jsu.isNull(stock["tech"][j]["label"])) continue;
            //     let cardBg = (j % 2 === 0) ? 'bg-light' : 'bg-white';
            //     bodyHtml += `
            //         <div class="card border border-light-subtle p-3 shadow-sm rounded-3 ${cardBg}">
            //             <p class="text-muted small fw-medium mb-1">${stock["tech"][j]["label"]}</p>
            //             <h5 class="fw-bold text-dark mb-1 text-truncate">${miSrnUtils.gcv(stock["tech"][j]["val"], stock["tech"][j]["clrl"], null)}</h5>
            //             <p class="small fw-medium m-0 text-truncate text-muted">${miSrnUtils.gcv(stock["tech"][j]["intr"], stock["tech"][j]["clrl"], null)}</p>
            //         </div>`;
            // }

            for (let j = 0; j < sectors[i]["idxVals"]["rtnList"].length; j++) {
                let cardBg = (j % 2 === 0) ? 'bg-light' : 'bg-white';

                html += `                           <div class="card d-flex flex-column p-3">`
                html += `                               <p class="tsrSecRotLabel" style="margin-bottom: 0; text-wrap: nowrap;">`
                if (j == 0) {
                    html += `                               Latest`;
                } else {
                    html += `                               Latest - ${j}`;
                }
                html += `                               </p>`
                html += `                               <h5 style="color: black; white-space: nowrap; font-weight: bold;">`
                html += miSrnUtils.gcv(sectors[i]["idxVals"]["rtnList"][j]["rtn"], null, "%");
                html += `                               </h5>`
                html += `                           </div>`;
            };
            html += `                           </div>`
            html += `                       </section>`;

            html += `                   </div> `;

            // row ends
        }
        html += `                   </div> `;
        // Stock Table row
        html += `                   <div id="${stockTableContainerId + i}" class="${stockTableContainerId} row" >`;
        html += '                   </div>';

        // Stock row
        // html += `                   <div id="${stockContainerId + i}" class="${stockContainerId} row " >`;
        // html += '                   </div>';
        // Chart Row
        html += `                   <div id="${chartContainerId}" class="row">`;
        html += '                   </div>';
        html += `                </div>`
        html += `            </div>`
        html += `        </div>`

        if (jsu.isNotNull(sectors[i].secIdx) && sectors[i].secIdx) {
            //     html += `</div>`;
            tsrStrengthIndexList[sectors[i]["id"]] = {
                divId: "trendStrengthDiv" + sectors[i]["id"],
                rank: miSrnUtils.grv(sectors[i]["idxVals"]["techStrength"])
            }
        }

        return html;
    }

    function processStockTableSection(secType, stockType, secId, show, update) {

        let sectors = [...allSectorDataClone[secType + "Sec"]];
        let sector = sectors[secId];

        let html = "";
        let mdtOptions = {
            info: false,
            paging: false,
            responsive: true,
            scrollY: 250,
            scrollX: true,
            scrollCollapse: true,
            dom: 'Bfrtip',
            buttons: [
                { extend: "copy", className: "btn btn-sm  btn-secondary ms-2    mt-1", text: " Copy" },
                { extend: "csv", className: "btn  btn-sm btn-secondary ms-2    mt-1", text: " CSV" },
                { extend: "excel", className: "btn  btn-sm btn-secondary ms-2     mt-1", text: " Excel" },
                { extend: "print", className: "btn  btn-sm btn-secondary ms-1    mt-1", text: " Print" }
            ],
            fixedColumns: {
                leftColumns: 1
            }
        }

        if (validateSecRotSettings()) {
            let sectorType = sectorTypeSelect.value;
            let duration = durationSelect.value;

            // let url = mintJsUtil.getRootUrl() + `/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=one&code=${sector["uriCode"]}`;
            // let url = `http://127.0.0.1:5500/Temp/secRotData/${sector["uriCode"]}.json`;
            // let url = `https://nitronik7.github.io/TSR-Frontend/Temp/secRotData/${sector["uriCode"]}.json`;
            // let url = "https://www.tsrbt1.com/rt" + `/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=one&code=${sector["uriCode"]}`;

            sectorType = sectorType.toUpperCase();
            duration = duration.toUpperCase();
            let sectorCode = sector["uriCode"].toUpperCase();
            let url = `https://nitronik7.github.io/TSR-Frontend/SectorRotationNg/integration/new/data/${sectorType}/${sectorCode}/${duration}_SECTOR.json`;

            // avoiding multiple API calls for same sector
            if (!(isSectorLoaded(currSectorData, secType, secId))) {

                miSrnUtils.gd(url).then(sectorData => {
                    let container = document.getElementById(stockTableContainerId + secId);

                    currSectorData = sectorData;
                    currSectorData["secType"] = secType;
                    currSectorData["secId"] = secId;

                    if (currSectorData["statusCode"] == "success") {
                        html = paintStockTableSection(sector, secType, stockType, secId);
                        container.innerHTML = html;

                        let stockList = currSectorData[stockType + "List"];
                        if (stockList.length != 0) {
                            miSrnUtils.mdt(stockTableId + secId, mdtOptions);
                        }
                    }
                });
            }
            else {
                let container = document.getElementById(stockTableContainerId + secId);

                html = paintStockTableSection(sector, secType, stockType, secId);
                container.innerHTML = html;

                let stockList = currSectorData[stockType + "List"];
                if (stockList.length != 0) {
                    miSrnUtils.mdt(stockTableId + secId, mdtOptions);
                }
            }
        }

        if (update) {
            let container = document.getElementById(stockTableContainerId + secId);
            container.innerHTML = html;
            return;
        }
    }

    function paintStockTableSection(sector, secType, stockType, secId) {
        let html = "";

        // Radio buttons
        // let onclickFn = `miSrn.ec(); miSrn.psts('${secType}','${stockType}', ${secId}, true, true);`
        html += `               <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-3">`
        html += `                   <div class="tsrSectorRotationStockSegmentWrapper">`
        html += `                       <b class="me-3">STOCKS</b>`
        html += `                       <div class="btn-group p-1 bg-light border rounded-pill" role="group" aria-label="Stock Performance View Filter">`
        if (stockType == "opEq") {
            html += `               <input type="radio" class="btn-check" name="sector${secId}Stocks" id="outPerformingStocks${secId}" autocomplete="off" checked>`
        } else {
            html += `               <input type="radio" class="btn-check" name="sector${secId}Stocks" id="outPerformingStocks${secId}" autocomplete="off">`
        }

        html += `                           <label class="btn btn-sm px-4 rounded-pill fw-bold text-uppercase tsrSectorRotationSegmentButton" for="tsrViewOutperforming" onclick="miSrn.ec(); miSrn.psts('${secType}','opEq', ${secId}, true, true);">`

        html += `                   Outperforming`
        html += `                           </label>`

        if (stockType == "upEq") {
            html += `               <input type="radio" class="btn-check" name="sector${secId}Stocks" id="underPerformingStocks${secId}" autocomplete="off" checked>`
        } else {
            html += `               <input type="radio" class="btn-check" name="sector${secId}Stocks" id="underPerformingStocks${secId}" autocomplete="off">`
        }
        html += `                           <label class="btn btn-sm px-4 rounded-pill fw-bold text-uppercase tsrSectorRotationSegmentButton" for="tsrViewUnderperforming"  onclick="miSrn.ec(); miSrn.psts('${secType}','upEq', ${secId}, true, true);">`
        html += `                   Underperforming`
        html += `                           </label>`
        html += `                       </div>`
        html += `                   </div>`
        html += `                   <span class="text-muted small italic opacity-75">* Technical markers
                                                        evaluate on live dynamic ticking intervals</span>`
        html += `               </div>`

        // table
        let tableFields = ["Name", "", "Price", "Price Chg %", "vs Nifty", "Period Return %", `EMA ${allSectorDataClone["ma1"]}`, `EMA ${allSectorDataClone["ma2"]}`, `RSI`, `MACD`, `Signal`, `ST`, `Chart`];

        let isIdxBased = false;
        if (jsu.isNotNull(sector.secIdx) && sector.secIdx) {
            isIdxBased = true;
            tableFields.splice(4, 0, `vs ${sector.name}`);
        }

        html += `                  <div>`
        html += `                       <table id="${stockTableId + secId}" class="table align-middle tsrSecRotTable w-100">`
        html += `                           <thead>`;
        html += `                               <tr>`;
        for (let i = 0; i < tableFields.length; i++) {
            html += `                                   <th scope="col">${tableFields[i]}</th>`
        }
        html += `                               </tr>`;
        html += `                           </thead>`;
        html += `                           <tbody>`;

        let stockList = currSectorData[stockType + "List"];

        if (stockList.length == 0) {
            html += `<tr>`;
            html += `   <td colspan="${tableFields.length}"  class="text-center">`
            html += `       No records`
            html += `   </td>`
            html += `</tr>`;

        }
        else {
            for (let i = 0; i < stockList.length; i++) {

                html += `<tr>`;
                html += `   <td>${stockList[i]["name"]} </td>`;
                // html += `   <td>`
                // html += `       <a class="link-primary" style="cursor: pointer;"
                //                 onclick="miSrn.pss('${secType}', '${stockType}', ${secId}, '${stockList[i]["code"]}', true);  
                //                 miSrn.pc('${secType}', ${secId}, '${stockType}List', '${stockList[i]["code"]}', false, 'inline', false);"> ${stockList[i]["name"]} </a>`;
                // html += `   </td>`;
                let onclickFn = `miSrn.pss('${secType}', '${stockType}', ${secId}, '${stockList[i]["code"]}', true);  
                                miSrn.pc('${secType}', ${secId}, '${stockType}List', '${stockList[i]["code"]}', false, 'inline', false);`;

                html += `   <td>`
                html += `               <button class="btn btn-sm btn-outline-primary"`
                html += `                   style="font-size: 12px;" onclick="${onclickFn}">`
                html += `                   View</button>`
                // <!-- Button trigger modal -->
                // html += `           <button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="modal"`
                // html += `               data-bs-target="#${stockSectionModalId}">`
                // html += `               View`
                // html += `           </button>`
                html += `   </td>`
                html += `   <td>${miSrnUtils.grv(stockList[i]["price"])}</td>`;
                html += `   <td>${miSrnUtils.grv(stockList[i]["priceChange"])}</td>`;
                html += `   <td>${miSrnUtils.grv(stockList[i]["vsNifty"])}</td>`;
                if (isIdxBased) {
                    html += `   <td>${miSrnUtils.grv(stockList[i]["vsIdx"])}</td>`;
                }
                html += `   <td>${miSrnUtils.grv(stockList[i]["periodReturn"])}</td>`;
                html += `   <td>${miSrnUtils.grv(stockList[i]["eqVals"]["ma1"])}</td>`;
                html += `   <td>${miSrnUtils.grv(stockList[i]["eqVals"]["ma2"])}</td>`;

                html += `   <td>${miSrnUtils.grv(stockList[i]["eqVals"]["rsi"])}</td>`;
                html += `   <td>${miSrnUtils.grv(stockList[i]["eqVals"]["macd"])}</td>`;
                html += `   <td>${miSrnUtils.grv(stockList[i]["eqVals"]["signal"])}</td>`;
                html += `   <td>${miSrnUtils.grv(stockList[i]["eqVals"]["st"])}</td>`;
                html += `   <td>`;
                html += `       <a style="cursor: pointer;" onclick="miSrn.pss('${secType}', '${stockType}', ${secId}, '${stockList[i]["code"]}', false);  miSrn.pc('${secType}', ${secId}, '${stockType}List', '${stockList[i]["code"]}', false, 'inline', true); ">`
                html += `           <i style="color:grey; font-size:12pt;" class="fa fa-chart-line">`
                html += `           </i>`
                html += `       </a>`;
                html += `   </td>`;

                html += `</tr>`;
            }
        }

        html += `                           </tbody>`;
        html += `                       </table>`;
        html += `                   </div>`

        if (stockList.length > 0) {
            html += `                       <div class="d-flex flex-column flex-md-row justify-content-between my-3">`
            html += `                           <div style="white-space: nowrap;">`
            html += `                               View Chart &emsp;`;
            html += `                                   <a class="link-primary" style="cursor:pointer" onclick=" miSrn.pss('${secType}', '${stockType}', ${secId}, '', false); miSrn.pc('${secType}', ${secId}, '${stockType}List', '', true, 'inline', true);" oncontextmenu="return false;"> <span class="fas fa-chart-line"></span> Inline </a>`
            html += `&emsp;|&emsp;`;
            html += `                                   <a class="link-primary" style="cursor:pointer" onclick=" miSrn.pss('${secType}', '${stockType}', ${secId}, '', false); miSrn.pc('${secType}', ${secId}, '${stockType}List', '', true, 'tile', true);" oncontextmenu="return false;">  <span class="fas fa-chart-line"></span> Tile  </a>`
            html += `                           </div>`
        }
        else {
            html += `                       <div class="d-flex flex-column flex-md-row justify-content-end my-3">`

        }

        html += `               <div class="d-flex flex-column text-end">`
        html += `                   <p style="font-size: 12px; margin-bottom: 0;">`
        html += `                       <span style="color: red;">*</span>`
        html += `                           Sector / Index rating utilizes only Stocks beyond certain Market Capital`
        html += `                   </p>`
        html += `                   <p style="font-size: 12px; margin-bottom: 0;">`
        html += `                       <span style="color: red;">*</span>`
        html += `                           Show all - includes Stocks across all Market Cap. Maximum of 20 stocks are shown`
        html += `                   </p>`
        html += `               </div>`
        html += `         </div>`

        return html;
    }

    function processStockSection(secType, stockType, secId, stockCode, show) {

        if (validateSecRotSettings()) {
            let sectorType = sectorTypeSelect.value;
            let duration = durationSelect.value;

            let sectors = [...allSectorDataClone[secType + "Sec"]];
            let sector = sectors[secId];

            // let url = mintJsUtil.getRootUrl() + `/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=one&code=${sector["uriCode"]}`;
            // let url = `http://127.0.0.1:5500/Temp/secRotData/secRot${duration}${sectorType}`;
            // https://www.tsrbt1.com/rt/djs?id=3m&type=industry&cat=SecRot&action=one&code=DEFENCE
            // let url = "https://www.tsrbt1.com/rt" + `/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=one&code=${sector["uriCode"]}`;

            sectorType = sectorType.toUpperCase();
            duration = duration.toUpperCase();
            let sectorCode = sector["uriCode"].toUpperCase();

            let url = `https://nitronik7.github.io/TSR-Frontend/SectorRotationNg/integration/new/data/${sectorType}/${sectorCode}/${duration}_SECTOR.json`;

            // avoiding multiple API calls for same sector
            if (!(isSectorLoaded(currSectorData, secType, secId))) {
                miSrnUtils.gd(url).then(data => {

                    if (data.statusCode == "success") {
                        currSectorData = data;
                        currSectorData["secType"] = secType;
                        currSectorData["secId"] = secId;

                        let stockList = currSectorData[stockType + "List"];
                        let stockMetaData = mintJsUtil.getObjFrmArrByField(stockList, "code", stockCode);

                        let duration = durationSelect.value;
                        let freq = miSrnUtils.gf(duration);
                        // let url = `https://www.tsrbt1.com/rt/djs?freq=${duration}&type=eq&cat=EqSmry&code=${stockCode}&action=eq`;
                        let url = `https://nitronik7.github.io/TSR-Frontend/SectorRotationNg/integration/new/data/${sectorType}/${sectorCode}/${freq}_${stockCode}.json`;


                        miSrnUtils.gd(url).then(stockData => {
                            if (stockData.statusCode == "success") {
                                let stock = stockData;
                                stock.id = stockMetaData['id'];
                                stock.name = stockMetaData['name'];
                                stock.vsNifty = stockMetaData['vsNifty'];
                                if (jsu.isNotNull(stockMetaData['vsIdx'])) {
                                    stock.vsIdx = stockMetaData['vsIdx'];
                                }
                                stock.priceChange = stockMetaData['priceChange'];
                                paintStockSection(secType, sector, stockType, secId, stockCode);
                            }
                        });

                        // paintStockSection(secType, sector, stockContainer, stockType, secId, stockCode);
                    }

                });
            }
            else {
                let duration = durationSelect.value;
                let freq = miSrnUtils.gf(duration);
                // let url = `https://www.tsrbt1.com/rt/djs?freq=${freq}&type=eq&cat=EqSmry&code=${stockCode}&action=eq`;
                let url = `https://nitronik7.github.io/TSR-Frontend/SectorRotationNg/integration/new/data/${sectorType}/${sectorCode}/${freq}_${stockCode}.json`;


                let stockList = currSectorData[stockType + "List"];
                let stockMetaData = mintJsUtil.getObjFrmArrByField(stockList, "code", stockCode);

                miSrnUtils.gd(url).then(stockData => {
                    if (stockData.statusCode == "success") {
                        let stock = stockData;
                        stock.id = stockMetaData['id'];
                        stock.name = stockMetaData['name'];
                        stock.vsNifty = stockMetaData['vsNifty'];
                        if (jsu.isNotNull(stockMetaData['vsIdx'])) {
                            stock.vsIdx = stockMetaData['vsIdx'];
                        }
                        stock.priceChange = stockMetaData['priceChange'];
                        paintStockSection(secType, sector, stockType, secId, stockCode, stock);
                    }
                });
            }
        };
    }

function paintStockSection(secType, sector, stockType, secId, stockCode, stock) {

    let stockSectionModal = document.getElementById(stockSectionModalId);
    stockSectionModal.style.display = "block";

    let stockSectionHeader = document.getElementById(stockSectionHeaderId);
    let stockSectionBody = document.getElementById(stockSectionBodyId);

    const techUrl =
        mintJsUtil.getRootUrl() +
        "/Stock/" +
        stock.id +
        "/TechnicalAnalysis";

    const fundaUrl =
        mintJsUtil.getRootUrl() +
        "/Stock/" +
        stock.id +
        "/FundamentalAnalysis";

    // ==================================================
    // HEADER
    // ==================================================

    stockSectionHeader.innerHTML = `
    <div class="stock-header">

        <div class="d-flex justify-content-between align-items-center flex-wrap">

            <div>
                <div class="stock-header-name">
                    ${stock.name}
                </div>

                <div class="stock-header-symbol">
                    ${stock.id}
                </div>
            </div>

            <div class="d-flex gap-2">

                <a href="${techUrl}"
                   target="_blank"
                   class="btn btn-light stock-action-btn">

                    <i class="fas fa-chart-line me-1"></i>
                    Technical
                </a>

                <a href="${fundaUrl}"
                   target="_blank"
                   class="btn btn-outline-light stock-action-btn">

                    <i class="fas fa-building me-1"></i>
                    Fundamental
                </a>

            </div>

        </div>

    </div>
    `;

    // ==================================================
    // BODY
    // ==================================================

    // ${buildQuickSummary(stock)}
    let bodyHtml = `
    <div class="stock-scroll">


        ${buildHighlights(stock, sector)}

        ${buildTSRMetrics(stock)}

        ${buildReturns(stock)}

        ${buildFundamentals(stock)}

        ${buildTechnicals(stock)}

        ${buildEMA(stock)}

    </div>
    `;

    stockSectionBody.innerHTML = bodyHtml;
}

function buildQuickSummary(stock) {

    return `
    <div class="alert alert-light shadow-sm border rounded-4 mb-4">

        <strong>Quick View</strong>

        <span class="badge bg-success ms-2">
            ${stock.tsrStr.techStr}
        </span>

        <span class="badge bg-primary ms-2">
            ${stock.tsrStr.stabStr}
        </span>

        <span class="badge bg-success ms-2">
            ${stock.tsrStr.pftStr}
        </span>

        <span class="badge bg-secondary ms-2">
            ${stock.tsrStr.gwthStr}
        </span>

    </div>
    `;
}

function buildHighlights(stock, sector) {

    return `
    <section class="mb-5">

        <div class="tsr-section-title">
            Market Snapshot
        </div>

        <div class="row g-3">

            ${buildKpiCard(
                "Current Price",
                "₹" + miSrnUtils.gcv(stock.price),
                "text-dark"
            )}

            ${buildKpiCard(
                "Price Change",
                miSrnUtils.gcv(stock.priceChange, null, "%"),
                stock.priceChange >= 0
                    ? "kpi-positive"
                    : "kpi-negative"
            )}

            ${buildKpiCard(
                "Returns vs NIFTY",
                miSrnUtils.gcv(stock.vsNifty, null, "%"),
                "kpi-positive"
            )}

            ${buildKpiCard(
                `Returns vs ${sector.name}`,
                miSrnUtils.gcv(stock.vsIdx, null, "%"),
                "kpi-positive"
            )}

        </div>

    </section>
    `;
}

function buildKpiCard(label, value, valueClass) {

    return `
    <div class="col-lg-3 col-md-6">

        <div class="kpi-card">

            <div class="kpi-label">
                ${label}
            </div>

            <div class="kpi-value ${valueClass}">
                ${value}
            </div>

        </div>

    </div>
    `;
}

function buildTSRMetrics(stock) {

    const m = stock.tsrStr;

    return `
    <section class="mb-5">

        <div class="tsr-section-title">
            TSR Ratings
        </div>

        <div class="row g-3">

            ${metric("Technical Strength", m.techStr, m.techClr)}
            ${metric("Value Index", m.valStr, m.valClr)}
            ${metric("Stability Index", m.stabStr, m.stabClr)}
            ${metric("Profitability", m.pftStr, m.pftClr)}
            ${metric("Growth Index", m.gwthStr, m.gwthClr)}

        </div>

    </section>
    `;
}

function metric(label, value, color) {

    return `
    <div class="col-lg col-md-6">

        <div class="metric-card">

            <div class="metric-label">
                ${label}
            </div>

            <div class="metric-value"
                 style="color:${color}">
                ${value}
            </div>

        </div>

    </div>
    `;
}

function buildReturns(stock) {

    let html = `
    <section class="mb-5">

        <div class="tsr-section-title">
            Returns
        </div>

        <div class="data-grid">
    `;

    stock.tsrRtn.forEach(r => {

        html += `
        <div class="data-card">

            <div class="data-card-label">
                ${r.label}
            </div>

            <div class="data-card-value">
                ${miSrnUtils.gcv(r.stkRtn, null, "%")}
            </div>

        </div>
        `;
    });

    html += `</div></section>`;

    return html;
}

function buildEMA(stock) {

    let html = `
    <section class="mb-5">

        <div class="tsr-section-title">
            EMA Levels
        </div>

        <div class="data-grid">
    `;

    stock.ema.forEach(e => {

        if (!e.label) return;

        html += `
        <div class="data-card">

            <div class="data-card-label">
                ${e.label}
            </div>

            <div class="data-card-value"
                 style="color:${e.clrl}">
                ${miSrnUtils.gcv(e.val)}
            </div>

        </div>
        `;
    });

    html += `</div></section>`;

    return html;
}

function buildTechnicals(stock) {

    if (!stock.tech) return "";

    let html = `
    <section class="mb-5">

        <div class="tsr-section-title">
            Technical Indicators
        </div>

        <div class="data-grid">
    `;

    stock.tech.forEach(t => {

        html += `
        <div class="data-card">

            <div class="data-card-label">
                ${t.label}
            </div>

            <div class="data-card-value"
                 style="color:${t.clrl}">
                ${miSrnUtils.gcv(t.val)}
            </div>

            <div class="data-card-sub"
                 style="color:${t.clrl}">
                ${t.intr}
            </div>

        </div>
        `;
    });

    html += `</div></section>`;

    return html;
}

function buildFundamentals(stock) {

    if (!stock.funda) return "";

    let html = `
    <section>

        <div class="tsr-section-title">
            Fundamental Metrics
        </div>

        <div class="data-grid">
    `;

    stock.funda.forEach(f => {

        html += `
        <div class="data-card">

            <div class="data-card-label">
                ${f.label}
            </div>

            <div class="data-card-value"
                 style="color:${f.clrl || "#111827"}">
                ${miSrnUtils.gcv(f.val)}
            </div>

            <div class="data-card-sub"
                 style="color:${f.clrl || "#64748b"}">
                ${f.intr || ""}
            </div>

        </div>
        `;
    });

    html += `</div></section>`;

    return html;
}



    function paintChart(secType, secId, stockListType, stockCode, all, chartType, scrollTo) {

        defStk = null;
        json = null;
        jPlist = [];

        let durationSelect = document.getElementById(sectorDurationSelectId);
        let sectorType = sectorTypeSelect.value;
        let duration = durationSelect.value;

        let sectors = [...allSectorDataClone[secType + "Sec"]];

        currSector = sectors[secId];

        let sector = sectors[secId]; // has only 5 stocks for op/up eq list
        if (stockCode == "NIFTY") {
            processChart(sector, secType, stockListType, stockCode, all, chartType, scrollTo);

        }
        // let url = mintJsUtil.getRootUrl() + `/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=one&code=${sector["uriCode"]}`;
        let url = `https://www.tsrbt1.com/rt/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=one&code=${sector["uriCode"]}`;
        // let url = `http://127.0.0.1:5500/Temp/secRotData/${sector["uriCode"]}.json`;
        // let url = `https://nitronik7.github.io/TSR-Frontend/Temp/secRotData/${sector["uriCode"]}.json`;

        if (!isSectorLoaded(currSectorData, secType, secId)) {
            miSrnUtils.gd(url).then(data => {

                currSectorData = data;

                processChart(currSectorData, secType, stockListType, stockCode, all, chartType, scrollTo);
            });
        } else {
            processChart(currSectorData, secType, stockListType, stockCode, all, chartType, scrollTo);
        }
    }

    function processChart(sectorData, secType, stockListType, stockCode, all, chartType, scrollTo) {

        let sector = sectorData;


        let sectors = [...allSectorDataClone[secType + "Sec"]];

        let stockList = [];
        if (stockListType == "sectorList") {
            stockList = sectors;
        }
        else {
            stockList = sector[stockListType];
        }

        let gifUrl = mintJsUtil.getBaseUrl() + "/static/img/LoadingMedium.gif";


        if (stockList.length <= 0) {
            return;
        }

        let container = document.getElementById(chartContainerId);

        // container.classList.add("card");

        let html = "";

        if (stockListType == "sectorList") {
            html += `
                <div class="mb-3">
                    <b>CHARTS</b>
                </div>`
        } else {
            html += `
                <div class="mb-3">
                    <b>STOCK CHART</b>
                </div>`
        }
        html += `


            <div id='Html5'>

                <div id='chartPanel' class="chartPanel">

                    <div id="chartFocus" style="margin:1px ; padding:1px; height:1px;width:1px" tabindex='1'></div>

                    <div id='NewChartSettingDiv' class='ch_root_sel_indi miCtrl'></div>

                    <div id='chSettingsPopup' class='ch_settings_popup miCtrl'></div>


                    <div id='chartControls'></div>

                    <div id='chartLoading'></div>

                    <div id='chartFeedBack' style='text-align:center'></div>

                    <div id='panel' align='center'>

                    </div>

                    <div id='selectedValues' align='center'
                        style='padding:0px;margin:3px; font-size: 8pt;height:12px; white-space:nowrap '> </div>

                    <div id='settingsDiv' style='padding:0px;margin:0px;'> </div>

                    <div id='chartWrap'>

                        <div id='tsrchart' style="font-size:10px;width:100%">
                            <img src="${gifUrl}" title="loading"></img>
                        </div>

                    </div>


                    <div id="chart_dialog" class="cc_dialog miCtrl">


                    </div>

                    <div id='imgDiv'> </div>

                </div>

            </div>
        `;

        container.innerHTML = html;

        if (scrollTo) {
            container.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

        // json = flexParamToHtml(`cf=${allSectorDataClone["cf"]}&period=${allSectorDataClone["cp"]}`);

        json = { freq: allSectorDataClone["cf"], cf: allSectorDataClone["cf"], period: allSectorDataClone["cp"] };



        if (all == true) { // if stock idx is -1, then display all stocks

            // For charts
            NIFTY = allSectorDataClone["NIFTY"];
            defStk = { name: NIFTY["name"], code: NIFTY["code"], scId: NIFTY["scId"], ecId: NIFTY["ecId"] };

            myTsrChartInit.init(defStk, json, chartType);
            jPlist = [{ id: 'tp' }];
            if (jsu.isNotNull(currSector["secIdx"]) && currSector["secIdx"]) {
                jPlist.push(currSector);
            }

            for (let i = 0; i < stockList.length; i++) {
                if (i > 5) {
                    break;
                }
                jPlist.push(stockList[i]);
            }
            javascript: ptia.ca(chartType, 'ignore');

            // var jPlist = [{ id: 'tp' }, { id: stock["id"], name: stock["name"], code: stock["code"], scId: stock["scId"], ecId: stock["ecId"] }];
        }
        else {
            let stock;

            if (stockCode == "NIFTY") {
                stock = allSectorDataClone["NIFTY"];
            }
            else {
                stock = mintJsUtil.getObjFrmArrByField(stockList, "code", stockCode);
            }
            defStk = { id: stock["id"], name: stock["name"], code: stock["code"], scId: stock["scId"], ecId: stock["ecId"] };

            myTsrChartInit.init(defStk, json, chartType);

        }
    }

    function validateSecRotSettings() {
        return (jsu.isNotNull(sectorTypeSelect) && jsu.isNotNull(durationSelect));
    }

    function isSectorIdxBased(secType) {
        let isIdxBased = false;

        let sectors;

        if (secType == 'op') {
            sectors = allSectorDataClone["opSec"];
        }
        else {
            sectors = allSectorDataClone["upSec"];
        }


        for (let i = 0; i < sectors.length; i++) {

            if (sectors[i].secIdx) {
                return true;
            }
        }

        return false;
    }

    function paintTsrToolsContainer() { // TODO - REMOVE IF NOT REQUIRED
        let toolsContainer = document.getElementById(toolsContainerId);

        let tools = [
            { "id": "Heatmap", "uri": "/Screener/Markets/HeatMap" },
            { "id": "Market Overview", "uri": "/Screener/Markets/MarketScreener" },
            { "id": "Relative Price Strength", "uri": "/Screener/Markets/RelativeStrength" },
            { "id": "Advance / Decline", "uri": "/Screener/Markets/AdvanceDecline" },
            { "id": "Sector Analysis", "uri": "/Screener/Markets/SectorAnalysis" },
            { "id": "Index Analysis", "uri": "/Screener/Markets/IndexAnalysis" },
        ];

        let html = "";

        // html += `<h5 style="color:  midnightblue;" class="text-center">`;
        // html += `   Also from TSR`;
        // html += `</h5>`;

        html += `<div id="tsrToolsMenuContainer" style="display: flex;" class="owl-nav align-items-center justify-content-center my-3">`

        html += `   <button id="tsrToolsCarousalPrev" type="button" role="presentation" class="owl-prev btn">`
        html += `       <span aria-label="Previous">`
        html += `           <i class="fas fa-angle-left"></i>`
        html += `       </span>`
        html += `   </button>`

        html += `<div id="tsrToolsCarousal" class="owl-carousel owl-theme">`;
        for (let i = 0; i < tools.length; i++) {
            let url = mintJsUtil.getRootUrl() + tools[i]["uri"];

            html += `   <div class="item p-2">`;
            html += `       <a href="${url}" target="_blank">`;
            html += `           <div class="card flex-row justify-content-around shadow-sm p-2">`;
            html += `               <span style="font-weight: 500; color: midnightblue;">`
            html += tools[i]["id"];
            html += `               </span>`
            html += `           </div>`
            html += `       </a>`
            html += `   </div>`
        }
        html += `</div>`;

        html += `   <button id="tsrToolsCarousalNext" type="button" role="presentation" class="owl-next btn">`;
        html += `       <span aria-label="Next">`;
        html += `           <i class="fas fa-angle-right"></i>`;
        html += `       </span>`;
        html += `   </button>`;
        html += `</div>`;

        toolsContainer.innerHTML = html;

        let toolsCarousel = {
            loop: true,
            margin: 10,
            dots: false,
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 10000,
            autoplaySpeed: 3000,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                1000: {
                    items: 4
                },
                1400: {
                    items: 5
                }
            },
        };

        $("#tsrToolsCarousal").owlCarousel(toolsCarousel);

        $('#tsrToolsCarousalPrev').click(function () {
            $("#tsrToolsCarousal").trigger('prev.owl.carousel', [300]);
        });
        $('#tsrToolsCarousalNext').click(function () {
            $("#tsrToolsCarousal").trigger('next.owl.carousel', [300]); // [300] - optional speed parameter
        });


    }

    function isSectorLoaded(currSectorData, secType, secId) { // Checks if correct sector is loaded or not
        return (jsu.isNotNull(currSectorData) && currSectorData.secType == secType && currSectorData.secId == secId && currSectorData["statusCode"] == "success");
    }

    function eraseContent() {
        let chart = document.getElementById(chartContainerId);

        if (jsu.isNotNull(chart)) {
            chart.innerHTML = '';
            chart.classList.remove("card");
        }
    }

    function initializeCarousal(initSector) {

        // sector Menu navigation code starts here

        let sectorNav = {
            loop: false,
            margin: 10,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                1000: {
                    items: 3
                },
                1400: {
                    items: 4
                }
            },
        };


        if (initSector) {
            $("#tsrSecRotSectorMenuCarousal").owlCarousel(sectorNav);

            $('.tsrSecRotSectorMenuCarousalPrev').click(function () {
                $("#tsrSecRotSectorMenuCarousal").trigger('prev.owl.carousel', [300]);
            });
            $('.tsrSecRotSectorMenuCarousalNext').click(function () {
                $("#tsrSecRotSectorMenuCarousal").trigger('next.owl.carousel', [300]); // [300] - optional speed parameter
            });
        }

        // sector Menu navigation code ends here

        var sectorCards = {
            loop: false,
            dots: false,
            nav: false,
            mouseDrag: false,
            touchDrag: false,
            responsive: {
                0: {
                    items: 1
                }
            },
            smartSpeed: 0,
        }

        if (initSector) {
            $("#sectorCardsCarousal").owlCarousel(sectorCards);

            // * erase stockTable,stockSection and chart when sector card is dragged

            // * go to prev sector card and erase stockTable,stockSection and chart
            $('.sectorCardsCarousalPrev').click(function () {
                $("#sectorCardsCarousal").trigger('prev.owl.carousel', [300]);
                eraseContent();
            });

            // * go to next sector card and erase stockTable,stockSection and chart
            $('.sectorCardsCarousalNext').click(function () {
                $("#sectorCardsCarousal").trigger('next.owl.carousel', [300]); // [300] - optional speed parameter

                eraseContent();
            });
        }


        var periodicReturns = {
            margin: 10,
            dots: true,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                500: {
                    items: 2,
                },
                1000: {
                    items: 3
                },
                1400: {
                    items: 4
                }
            }
        };

        $(".periodicReturns").owlCarousel(periodicReturns);

        $(".periodicReturns").on('mousedown', '.owl-stage', function (event) {
            event.preventDefault();
            event.stopPropagation();

        });

        $(".periodicReturns").on('drag.owl.carousel', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });
        $(".periodicReturns").on('dragged.owl.carousel', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });

        $(".periodicReturns").on('touchstart', '.owl-stage', function (e) {
            e.preventDefault();
            event.stopPropagation();
        });

        var technicals = {
            margin: 10,
            dots: true,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                500: {
                    items: 2,
                },
                1000: {
                    items: 3
                },
                1400: {
                    items: 4
                }
            }
        };

        $(".technicals").owlCarousel(technicals);

        $(".technicals").on('mousedown', '.owl-stage', function (event) {
            event.preventDefault();
            event.stopPropagation();

        });

        $(".technicals").on('drag.owl.carousel', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });
        $(".technicals").on('dragged.owl.carousel', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });

        $(".technicals").on('touchstart', '.owl-stage', function (e) {
            e.preventDefault();
            event.stopPropagation();
        });

        var tsrStrengthIndex = {
            margin: 10,
            dots: true,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                500: {
                    items: 2,
                },
                1000: {
                    items: 3
                },
                1400: {
                    items: 4
                }
            }
        };
        $(".tsrStrengthIndex").owlCarousel(technicals);


        $(".tsrStrengthIndex").on('mousedown', '.owl-stage', function (event) {
            event.preventDefault();
            event.stopPropagation();

        });

        $(".tsrStrengthIndex").on('drag.owl.carousel', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });
        $(".tsrStrengthIndex").on('dragged.owl.carousel', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });

        $(".tsrStrengthIndex").on('touchstart', '.owl-stage', function (e) {
            e.preventDefault();
            event.stopPropagation();
        });

    };

    return {
        init: init,
        ssc: showSectorCard,
        psts: processStockTableSection,
        pss: processStockSection,
        pc: paintChart,
        ust: updateSectorTable,
        ec: eraseContent
    }

})();
