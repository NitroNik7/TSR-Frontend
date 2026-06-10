
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
    // // var baseSectorCardId = "tsrSecRotBaseSectorCard";
    var sectorCompSectionId = "tsrSectRotSectCompareSection";
    var opSectorTableDivId = "tsrSecRotOpSectorTable";
    var upSectorTableDivId = "tsrSecRotUpSectorTable";
    // var sectorTableId = "tsrSectorTable";
    var sectorOverviewContainerId = "tsrSecRotSectorOverviewContainer";
    var stockTableContainerId = "tsrSecRotStockComparisonTableContainer";
    var stockTableId = "tsrSecRotStockComparisonTable"
    var stockContainerId = "tsrSecRotSectorStockContainer";
    var chartContainerId = "tsrSecRotChartContainer";
    var stockSectionModalId = "tsrStockSectionModal";
    var stockSectionDivId = "tsrStockSection";

    var allSectorDataClone;
    var allSectorData;
    var sectorData;
    var minStocks = 2; // min. no. of stocks in a sector
    var NIFTY;
    var currSector;
    var tsrStrengthIndexList = {};

    let dsInit = false; // durationSelect inited
    // Start
    init();

    function init() {

        let sectorTypeSelect = document.getElementById(sectorTypeSelectId);
        let durationSelect = document.getElementById(sectorDurationSelectId);

        let sectorType = sectorTypeSelect.value;
        let duration = durationSelect.value;


        miSrnUtils.pds(sectorDurationSelectId, duration);
        duration = durationSelect.value;
        // paintTsrToolsContainer();

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

        let stockSectionModal = document.getElementById(stockSectionModalId);
        $("#" + stockSectionModalId).draggable({ containment: 'parent' });
        stockSectionModal.classList.add("web_dialog");
        stockSectionModal.style.width = "calc(100% - 250px)";
        stockSectionModal.style.maxHeight = "calc(100vh - 150px)";
        stockSectionModal.style.fontFamily = "unset";




        if (miSrnUtils.pd(sectorTypeSelect) && miSrnUtils.pd(durationSelect)) {

            if (sectorType != 'industry' || duration != '3m') {
                miSrnUtils.slt(true);
            } else {
                miSrnUtils.slt(false);
            }

            // let url = mintJsUtil.getRootUrl() + `/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=all`; // TODO - use this later
            // let url = `https://www.tsrbt1.com/rt/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=all`;
            let url = `http://127.0.0.1:5500/Temp/secRotData/secRot${duration}${sectorType}.json`;
            // let url = `https://nitronik7.github.io/TSR-Frontend/Temp/secRotData/secRot${duration}${sectorType}.json`;

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
        if (miSrnUtils.pd(baseSectorSection) && miSrnUtils.pd(allSectorDataClone[baseSector])) {

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
            html += `           <div class="tsrSecRotMetricTitle d-flex" style="gap: 10px;">`
            // html += `               <div class="tsrSecRotMetricIcon">`
            // html += `                       <i class="fas fa-chart-line"></i>`
            // html += `               </div>`
            html += `               Benchmark`
            html += `           </div>`
            // if (isSectorIdxBased('op') || isSectorIdxBased('up')) {
            //     html += `           <span class="tsrSecRotMetricBadge">
            //                             Benchmark
            //                         </span>`
            // }
            html += `           </div>`
            // html += `           <div class="tsrSecRotMetricTitle d-flex" style="gap: 10px;">`
            // // html += `               <div class="tsrSecRotMetricIcon">`
            // // html += `                       <i class="fas fa-chart-line"></i>`
            // // html += `               </div>`
            // html += `               Benchmark`
            // html += `           </div>`
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

            // html += `       <!-- NIFTY 50 detailed card -->
            /*
                //                 <div class="tsrSecRotMetricCard" style="display: none;">

                //                     <div class="tsrSecRotMetricTop">
                //                         <div class="tsrSecRotMetricIcon">
                //                             <i class="fas fa-chart-line"></i>
                //                         </div>

                //                         <span class="tsrSecRotMetricBadge">
                //                             Benchmark
                //                         </span>
                //                     </div>

                //                     <div class="tsrSecRotMetricTitle">
                //                         NIFTY 50
                //                     </div>

                //                     <div class="align-items-center d-flex tsrSecRotMetricValue"
                //                         style="gap: 10px;">
                //                         24,845.20
                //                         <div class="tsrSecRotMetricChange positive">
                //                             <i class="fas fa-arrow-up"></i>
                //                             1.84%
                //                         </div>
                //                     </div>

                //                     <div class="tsrSecRotMetricChange positive" style="display: none;">
                //                         <span class="me-2 tsrSecRotMetricSubtext"
                //                             style="font-weight: 400;">Period Change</span>
                //                         <br>
                //                         <i class="fas fa-arrow-up"></i>
                //                         1.84%
                //                     </div>
                //                     <div class="tsrSecRotMetricChange positive" style="display: none;">
                //                         <span class="me-2 tsrSecRotMetricSubtext"
                //                             style="font-weight: 400;">Market Cap Chg Pc

                //                         </span>
                //                         <i class="fas fa-arrow-up"></i>
                //                         1.84%
                //                     </div>

                //                     <div class="tsrSecRotMetricChange positive">
                //                         <span class="me-2 tsrSecRotMetricSubtext"
                //                             style="font-weight: 400;">Market Cap Chg</span>
                //                             <span style="font-weight: 300;"></span>
                //                         <br>
                //                         27373921 Cr
                //                         <span class=" tsrSecRotMetricSubtext">|</span>
                //                         <i class="fas fa-arrow-up"></i> 1.84%
                //                     </div>
                //                 </div>`
            */

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
            html += `            <div class="tsrSecRotMetricTitle d-flex" style="gap: 10px;">`
            // html += `                <div class="tsrSecRotMetricIcon">`
            // html += `                    <i class="fas fa-bolt"></i>`
            // html += `                </div>`
            html += `                Strongest Sector`
            html += `            </div>`
            html += `            </div>`
            // html += `            <div class="tsrSecRotMetricTitle d-flex" style="gap: 10px;">`
            // // html += `                <div class="tsrSecRotMetricIcon">`
            // // html += `                    <i class="fas fa-bolt"></i>`
            // // html += `                </div>`
            // html += `                Strongest Sector`
            // html += `            </div>`
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
            html += `            <div class="tsrSecRotMetricTitle d-flex" style="gap: 10px;">`
            // html += `                <div class="tsrSecRotMetricIcon" style="color: #ff4d4d; background-color: #ffe8e8;">`
            // // html += `                    <i class="fas fa-arrow-trend-down"></i>`
            // html += `                       <i class="fas fa-bolt"></i>`
            // html += `                </div>`
            html += `                Weakest Sector`
            html += `            </div>`
            html += `            </div>`
            // html += `            <div class="tsrSecRotMetricTitle d-flex" style="gap: 10px;">`
            // // html += `                <div class="tsrSecRotMetricIcon" style="color: #ff4d4d; background-color: #ffe8e8;">`
            // // // html += `                    <i class="fas fa-arrow-trend-down"></i>`
            // // html += `                       <i class="fas fa-bolt"></i>`
            // // html += `                </div>`
            // html += `                Weakest Sector`
            // html += `            </div>`
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
            html += `           <div class="tsrSecRotMetricTitle d-flex" style="gap: 10px;">`
            // html += `               <div class="tsrSecRotMetricIcon">`
            // html += `                   <i class="fas fa-layer-group"></i>`
            // html += `               </div>`
            html += `               Sector Performance`
            html += `           </div>`
            html += `           </div>`


            html += `           <div class="d-flex flex-column">`
            // html += `               <div >`
            // html += `                   <p style="margin-bottom: 0; font-size: 14px; text-wrap: nowrap;">`
            // html += `                       <span style="color: #64748b;">Outperforming</span>`
            // html += `                       <i class="fas fa-arrow-up me-2" style="color: green;"></i>`
            // html += `                   </p>`
            // html += `                   <h4 class="mb-1 mb-md-0" style="color: #059669;">`
            // html += `                       ${opSectors.length}`
            // html += `                   </h4>`
            // html += `               </div>`
            html += `               <div class="d-flex align-items-center mb-2">`
            html += `                   <p style="margin-bottom: 0; font-size: 16px; text-wrap: nowrap;">`
            html += `                       <i class="fas fa-arrow-up me-2" style="color: green;"></i>`
            html += `                       <span style="color: #64748b;">Outperforming</span>`
            html += `                   </p>`
            html += `                   <h3 class="ms-3 mb-0" style="color: #059669; font-weight: 600;">`
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
            html += `               <div class="d-flex align-items-center">`
            html += `                   <p style="margin-bottom: 0; font-size: 16px; text-wrap: nowrap;">`
            html += `                       <i class="fas fa-arrow-down me-2" style="color: #dc2626;"></i>`
            html += `                       <span style="color: #64748b;">Underperforming</span>`
            html += `                   </p>`
            html += `                   <h3 class="ms-3 mb-0" style="color: #dc2626; font-weight: 600;">`
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

            /*
                html += `< div class="card" > `
                html += `   < div class="card-header d-flex justify-content-between" > `
                html += `       < h5 class="card-title" > `
                html += baseSector;
                html += `       </h5 > `
                html += `       < div class="text-center" > `
                html += `           < a onclick = "miSrn.pc('op', 0,'opEqList', 'NIFTY', false, 'inline', true);" class="mx-1 link-primary" style = "cursor: pointer;" > Chart < i class="fa fa-chart-line" ></i ></a > `
                html += `           < a href = "${technicalsUrl}" class="mx-1 link-primary" target = "_blank" > Technicals < i class="fas fa-external-link-alt" ></i ></a > `
                html += `       </div > `
                html += `   </div > `

                html += `   < div class="card-body" > `
                html += `       < div class="d-flex flex-column flex-md-row justify-content-around" > `
                html += `           < div > `
                html += `               < div id = 'trendStrengthDiv${baseSector}' class="d-flex justify-content-center" ></div > `
                html += `               < div class="tsr_strength_values_container" > `
                html += `                   < div class="d-flex justify-content-center" id = "strRank" > `
                html += `                       < span style = "font-size: 14px;" > ${ allSectorDataClone[baseSector]["techPosi"] } </span > `
                html += `                   </div > `
                html += `               </div > `
                html += `           </div > `

                html += `           < div class="d-none d-md-block text-center my-2 my-md-0" > `
                html += `               < h6 > Price</h6 > `
                html += `               < h5 > `
                html += miSrnUtils.gcv(allSectorDataClone[baseSector]["price"]);
                html += `               </h5 > `
                html += `           </div > `
                html += `           < div class="d-none d-md-block text-center my-2 my-md-0" > `
                html += `               < h6 > Price Change %</h6 > `
                html += `               < h5 > `
                html += miSrnUtils.gcv(allSectorDataClone[baseSector]["priceChange"]);
                html += `               </h5 > `
                html += `           </div > `
                html += `           < div class="text-center my-2 my-md-0" > `
                html += `               < h6 > Period Change %</h6 > `
                html += `               < h5 > `
                html += miSrnUtils.gcv(allSectorDataClone[baseSector]["periodReturn"]);
                html += `               </h5 > `
                html += `           </div > `
                html += `           < div class="d-none d-md-block text-center my-2 my-md-0" > `
                html += `               < h6 > Market Cap Chg(Cr.)</h6 > `
                html += `               < h5 > `
                html += miSrnUtils.gcv(allSectorDataClone[baseSector]["mcChg"]);
                html += `               </h5 > `
                html += `           </div > `
                html += `       </div > `
                html += `   </div > `
                html += `</div > `;
            */

            baseSectorSection.innerHTML = html;

            /*
                mintHtmlUtil.dlg({
                    divId: 'trendStrengthDiv' + baseSector,
                    rank: miSrnUtils.grv(allSectorDataClone[baseSector]["techStrength"]),
                    title: 'Technical Strength Daily',
                    leftLabel: 'Sell',
                    rightLabel: 'Buy',
                    width: 240,
                    height: 8
                });
            */
        }

    }

    function paintSectorCompSection() {
        let sectorTableSection = document.getElementById(sectorCompSectionId);

        let html = "";
        html += `       <!-- Outperforming -->`
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



        html += `       <!-- Underperforming -->`
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

        // sectorTableContainer.classList.add("card");

        // let html = "";
        // html += `< div class="card-header d-flex justify-content-between align-items-center" > `;
        // html += `       < h5 > Sector Comparison</h5 > `;
        // html += `       < p style = "font-size: 12px; margin-bottom: 0;" > `
        // html += `           < span style = "color: red;" >*</span > `
        // html += `           Technicals based on ${ allSectorDataClone["displayFreq"] } tick`
        // html += `       </p > `
        // html += `</div > `;

        // // Radio buttons
        // html += `< div class="card-body p-3" > `;
        // html += `   < div > `;
        // html += `       < div class="mb-3 btn-group" role = "group" > `;
        // html += `           < input type = "radio" class="btn-check" name = "btnradio" id = "outPerformingSectors" autocomplete = "off" checked > `;
        // html += `           < label class="btn btn-outline-secondary" for= "outPerformingSectors" onclick = "miSrn.ust('op'); miSrn.ec();" > Out Performing</label > `;
        // html += `           < input type = "radio" class="btn-check" name = "btnradio" id = "underPerformingSectors" autocomplete = "off" > `;
        // html += `           < label class="btn btn-outline-secondary" for= "underPerformingSectors" onclick = "miSrn.ust('up'); miSrn.ec();" > Under Performing</label > `;
        // html += `       </div > `;
        // html += `   </div > `;
        // html += `   < div id = "${sectorTableDivId}" > `;
        // html += `   </div > `;

        // html += `</div > `;

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
        }
        else {
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
        // html += `           <th></th>`
        html += `           <th></th>`
        if (isIdxBased) {
            html += `       <th></th>`
        }
        html += `           <th colspan="2">Stock Performance</th>`
        html += `           <th colspan="2">Market Cap</th>`
        if (isIdxBased) {
            html += `       <th></th>`
        }
        html += `           <th colspan="2">TSR Strength Index</th>`
        html += `           <th colspan="6">% Stocks</th>`
        html += `       </tr>`
        html += `       <tr>`
        html += `           <th>Rank</th>`
        // html += `           <th></th>`
        html += `           <th>Sector</th>`
        if (isIdxBased) {
            // html += `       <th>Relative Returns vs NIFTY</th>`
            html += `       <th>Returns vs NIFTY (%)</th>`
        }

        html += `           <th>Leading</th>`
        html += `           <th>Lagging</th>`
        html += `           <th>Change (%)</th>`
        html += `           <th>Change (Cr.)</th>`
        if (isIdxBased) {
            html += `           <th>Period Returns (%)</th>`
        }
        html += `           <th>Bullish Stocks</th>`
        html += `           <th>Bearish Stocks</th>`
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
                let onclickFn = "";
                if (isIdxBased) {
                    onclickFn = `miSrn.ssc('${secType}', ${i}); miSrn.pc('${secType}', '${i}', 'sectorList', '${sector.code}', false, 'inline', false);`
                } else {
                    onclickFn = `miSrn.ssc('${secType}', ${i});`
                }
                html += `           <td>`
                html += `               <button class="btn btn-sm btn-outline-primary"`
                html += `                   style="font-size: 12px;" onclick="${onclickFn}">`
                html += `                   <b style="font-size: 16px; font-weight: 800;">${i + 1}</b>`
                html += `                   View`
                html += `                   <i class="fas fa-arrow-down"></i>`
                html += `               </button>`
                html += `           </td>`

                // html += `           <td>`
                // html += `               <button class="btn btn-sm btn-outline-primary"`
                // html += `                   style="font-size: 12px;" onclick="${onclickFn}">`
                // html += `                   View`
                // html += `                   <i class="fas fa-arrow-down"></i>`
                // html += `               </button>`
                // html += `           </td>`

                html += `           <td><b>${sector.name}<b></td>`

                if (isIdxBased) {
                    html += `           <td><b>${miSrnUtils.gcv(sector.vsNifty)}<b></td>`
                }
                html += `           <td>${sector.opEq}</td>`
                html += `           <td>${sector.upEq}</td>`
                html += `           <td><b>${miSrnUtils.gcv(sector.mcChgPc)}</b></td>`
                html += `           <td>${miSrnUtils.grv(sector.mcChg)}</td>`
                if (isIdxBased) {
                    html += `           <td><span style='font-weight: 600;'>${miSrnUtils.gcv(sector.periodReturn)}</span</td>`
                }
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



        // html += `< table  id = "${sectorTableId}" class="table table-striped" > `

        // html += `< thead style = "font-size: 14px;" > `
        // html += `   < tr > `
        // if (isIdxBased) {
        //     html += `       < th colspan = "2" ></th > `
        //     html += `       < th colspan = "2" > Market Cap </th > `
        //     html += `       < th colspan = "1" > </th > `
        //     html += `       < th colspan = "2" > Performance </th > `

        //     html += `       < th colspan = "2" > TSR Strength Index</th > `
        //     html += `       < th colspan = "6" > % of Stocks </th > `
        // }
        // else {
        //     html += `       < th colspan = "1" ></th > `

        //     html += `       < th colspan = "2" > Market Cap </th > `
        //     html += `       < th colspan = "2" > Performance </th > `
        //     html += `       < th colspan = "2" > TSR Strength Index</th > `
        //     html += `       < th colspan = "6" > % of Stocks </th > `
        // }
        // html += `   </tr > `
        // html += `   < tr > `
        // html += `       < th > Name</th > `
        // if (isIdxBased) {
        //     html += `       < th > Relative Returns vs NIFTY</th > `
        // }
        // html += `       < th > `
        // html += `               Change`
        // html += `                < br > `
        // html += `                   (in Cr.)`;
        // html += `         </th > `
        // html += `       < th > Change %</th > `
        // if (isIdxBased) {
        //     html += `       < th > Period Return %</th > `
        // }
        // html += `       < th > Out Performing</th > `
        // html += `       < th > Under Performing</th > `
        // html += `       < th > Bullish Stocks</th > `
        // html += `       < th > Bearish Stocks</th > `
        // if (secType == "op") {

        //     html += `       < th > Above EMA  ${allSectorDataClone["ma1"]}</th > `
        //     html += `       < th > Above EMA ${allSectorDataClone["ma2"]}</th > `
        //     html += `       < th > ADX > 20</th > `
        //     html += `       < th > RSI > 50</th > `
        //     html += `       < th > MACD > 0</th > `
        //     html += `       < th > MACD > Signal</th > `
        // }
        // else {

        //     html += `       < th > Below EMA  ${allSectorDataClone["ma1"]}</th > `
        //     html += `       < th > Below EMA ${allSectorDataClone["ma2"]}</th > `
        //     html += `       < th > ADX < 20</th > `
        //     html += `       < th > RSI < 50</th > `
        //     html += `       < th > MACD < 0</th > `
        //     html += `       < th > MACD < Signal</th > `
        // }

        // html += `   </tr > `
        // html += `</thead > `

        // html += `< tbody class="table-borderless" > `;

        // if (sectors.length == 0) {

        //     html += `< tr > `;
        //     html += `   < td colspan = "13" class="text-center" > `;
        //     html += `       No records`;
        //     html += `   </td > `;
        //     html += `</tr > `;
        // }
        // else {
        //     for (let i = 0; i < sectors.length; i++) {

        //         if ((secType == "op" && (sectors[i]["mcChg"] >= 0 || sectors[i]["mcChgPc"] >= 0)) || (secType == "up")) {

        //             html += `< tr > `
        //             html += `   < td > `
        //             if (miSrnUtils.pd(sectors[i]["secIdx"]) && sectors[i]["secIdx"]) {
        //                 html += `       < div style = "cursor: pointer;"
        //                     onclick = "miSrn.ssc('${secType}', ${i}); 
        //                     miSrn.pc('${secType}', '${i}', 'sectorList', '${sectors[i]["code"]}', false, 'inline', false); " class="link - primary">`
        //             } else {
        //                 html += `       <div style="cursor: pointer;" onclick="miSrn.ssc('${secType}', ${i}); miSrn.ec();" class="link-primary" >`
        //             }
        //             html += sectors[i].name;
        //             html += `       </div`
        //             html += `   </td>`;
        //             if (isIdxBased) {
        //                 html += `   <td>`;
        //                 html += miSrnUtils.gcv(sectors[i]["vsNifty"]);
        //                 html += `   </td>`;
        //             }
        //             html += `   <td>`;
        //             html += miSrnUtils.gcv(sectors[i]["mcChg"]);
        //             html += `   </td>`;
        //             html += `   <td>`;
        //             html += miSrnUtils.gcv(sectors[i]["mcChgPc"]);
        //             html += `   </td>`;
        //             if (isIdxBased) {
        //                 html += `   <td>`;
        //                 html += miSrnUtils.gcv(sectors[i]["periodReturn"]);
        //                 html += `   </td>`;
        //             }
        //             html += `   <td>`;
        //             html += miSrnUtils.gcv(sectors[i]["opEq"]);
        //             html += `   </td>`;
        //             html += `   <td>`;
        //             html += miSrnUtils.gcv(sectors[i]["upEq"]);
        //             html += `   </td>`;
        //             html += `   <td>`;
        //             html += miSrnUtils.gcv(sectors[i]["tsrBullish"]);
        //             html += `   </td>`;
        //             html += `   <td>`;
        //             html += miSrnUtils.gcv(sectors[i]["tsrBearish"]);
        //             html += `   </td>`;
        //             if (secType == "op") {
        //                 html += `   <td>`;
        //                 html += miSrnUtils.gcv((sectors[i]["ma1"]) * 100);
        //                 html += `   </td>`;
        //                 html += `   <td>`;
        //                 html += miSrnUtils.gcv((sectors[i]["ma2"]) * 100);
        //                 html += `   </td>`;
        //                 html += `   <td>`;
        //                 html += miSrnUtils.gcv((sectors[i]["adx"]) * 100);
        //                 html += `   </td>`;
        //                 html += `   <td>`;
        //                 html += miSrnUtils.gcv((sectors[i]["rsi"]) * 100);
        //                 html += `   </td>`;
        //                 html += `   <td>`;
        //                 html += miSrnUtils.gcv((sectors[i]["macd0"]) * 100);
        //                 html += `   </td>`;
        //                 html += `   <td>`;
        //                 html += miSrnUtils.gcv((sectors[i]["macds"]) * 100);
        //                 html += `   </td>`;
        //             }
        //             else {
        //                 html += `   <td>`;
        //                 html += miSrnUtils.gcv((1 - sectors[i]["ma1"]) * 100);
        //                 html += `   </td>`;
        //                 html += `   <td>`;
        //                 html += miSrnUtils.gcv((1 - sectors[i]["ma2"]) * 100);
        //                 html += `   </td>`;
        //                 html += `   <td>`;
        //                 html += miSrnUtils.gcv((1 - sectors[i]["adx"]) * 100);
        //                 html += `   </td>`;
        //                 html += `   <td>`;
        //                 html += miSrnUtils.gcv((1 - sectors[i]["rsi"]) * 100);
        //                 html += `   </td>`;
        //                 html += `   <td>`;
        //                 html += miSrnUtils.gcv((1 - sectors[i]["macd0"]) * 100);
        //                 html += `   </td>`;
        //                 html += `   <td>`;
        //                 html += miSrnUtils.gcv((1 - sectors[i]["macds"]) * 100);
        //                 html += `   </td>`;
        //             }
        //             html += `</tr>`;
        //         }
        //     }
        // }


        // html += `</tbody>`
        // html += `</table>`;
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
                searching: false,
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
            html += `       <a href="#${i}" onclick="miSrn.ec()">`;
            html += `           <div class="card flex-row justify-content-around shadow-sm p-2">`;
            html += `               <span style="font-weight: 500;">`
            html += sectors[i].name;
            html += `               </span>`
            html += `               <span style="color: midnightblue; white-space: nowrap;">`

            if (i == 0) {
                html += `               1 <sup> st</sup>`;
            }
            else if (i == 1) {
                html += `               2 <sup> nd</sup>`;
            }
            else if (i == 2) {
                html += `               3 <sup> rd</sup>`;
            }
            else {
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


        for (let i = 0; i < sectors.length; i++) {
            processStockTableSection(secType, "opEq", i, true, false);
        }

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

    };

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
                    items: 2
                },
                1000: {
                    items: 5
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
                    items: 2
                },
                1000: {
                    items: 5
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
                    items: 2
                },
                1000: {
                    items: 3
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

    function paintSectorCard(secType, sectors, i) {
        let html = "";

        // sector card header starts
        /*
            html += `
                <div class="tsrSecRotSectOvrvwSection border-0 p-3">

                    <div class="card shadow-sm tsrSectorRotationDetailsWorkspaceCard">
                        <div class="card-header bg-transparent p-4 border-bottom d-flex flex-wrap justify-content-between align-items-center gap-3">
                            <div class="d-flex align-items-center gap-3">
                                <h4 class="h5 mb-0 fw-bold text-dark tsrSectorRotationCardHeaderTitle"
                                    id="tsrSectorRotationSelectedSectorName">NIFTY METAL</h4>
                                <span
                                    class="text-muted small border-start ps-3 d-none d-sm-inline">Sector
                                    Overview</span>
                                
                            </div>
                        </div>

                        <div class="card-body p-4">
                            <div class="row gy-4 mb-4">
                                <div class="col-12 col-lg-6">
                                    <div class="h-100">
                                        <div class="tsrSectorRotationMetricRow">
                                            <span class="tsrSecRotSectorDetailsSubText">Relative
                                                Returns
                                                vs
                                                NIFTY 50</span>
                                            <span
                                                class="tsrSecRotSectorDetailsValue text-success fw-bold">+2.35%</span>
                                        </div>
                                        <div class="tsrSectorRotationMetricRow">
                                            <span class="tsrSecRotSectorDetailsSubText">Price</span>
                                            <span
                                                class="tsrSecRotSectorDetailsValue text-dark fw-bold">19,232.00</span>
                                        </div>
                                        <div class="tsrSectorRotationMetricRow">
                                            <span class="tsrSecRotSectorDetailsSubText">Price Chg
                                                %</span>
                                            <span
                                                class="tsrSecRotSectorDetailsValue text-success fw-bold">+2.20%</span>
                                        </div>
                                        <div class="tsrSectorRotationMetricRow">
                                            <span class="tsrSecRotSectorDetailsSubText">Market Cap
                                                Chg
                                                %</span>
                                            <span
                                                class="tsrSecRotSectorDetailsValue text-success fw-bold">+2.35%</span>
                                        </div>
                                        <div class="tsrSectorRotationMetricRow">
                                            <span class="tsrSecRotSectorDetailsSubText">Market Cap
                                                Chg</span>
                                            <span
                                                class="tsrSecRotSectorDetailsValue text-success fw-bold">2,325
                                                Cr.</span>
                                        </div>
                                        <div class="tsrSectorRotationMetricRow">
                                            <span
                                                class="tsrSecRotSectorDetailsSubText">Outperforming
                                                Stocks</span>
                                            <span
                                                class="tsrSecRotSectorDetailsValue text-success fw-bold">10
                                                Stocks</span>
                                        </div>
                                        <div class="tsrSectorRotationMetricRow border-bottom-0">
                                            <span
                                                class="tsrSecRotSectorDetailsSubText">Underperforming
                                                Stocks</span>
                                            <span
                                                class="tsrSecRotSectorDetailsValue text-danger fw-bold">5
                                                Stocks</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 col-lg-6">
                                    <div
                                        class="p-3 bg-white h-100 tsrSectorRotationUnifiedTechCard d-flex flex-column justify-content-between gap-3">
                                        <div class="d-flex flex-column gap-3">
                                            <!-- <h6 class="text-uppercase x-small fw-bold text-secondary mb-1">
                                        <i class="fas fa-bold text-primary me-1"></i> Momentum &
                                        Technical Matrix
                                    </h6> -->

                                            <div class="tsrSectorRotationRowCarouselBlock">
                                                <span
                                                    class="d-block text-muted x-small fw-bold text-uppercase mb-2">Daily
                                                    Returns History</span>
                                                <div
                                                    class="owl-carousel owl-theme periodicReturns tsrSectorRotationOwlMetricsSlider">
                                                    <div class="item">
                                                        <div
                                                            class="tsrSectorRotationSliderSingleLine text-success">
                                                            <span>Latest</span><strong>1.67%</strong>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div
                                                            class="tsrSectorRotationSliderSingleLine text-success">
                                                            <span>Latest-1</span><strong>1.10%</strong>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div
                                                            class="tsrSectorRotationSliderSingleLine text-success">
                                                            <span>Latest-2</span><strong>0.56%</strong>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div
                                                            class="tsrSectorRotationSliderSingleLine text-success">
                                                            <span>Latest-3</span><strong>0.44%</strong>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div
                                                            class="tsrSectorRotationSliderSingleLine text-success">
                                                            <span>Latest-4</span><strong>0.20%</strong>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div
                                                            class="tsrSectorRotationSliderSingleLine text-success">
                                                            <span>Latest-5</span><strong>0.17%</strong>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div
                                                            class="tsrSectorRotationSliderSingleLine text-danger">
                                                            <span>Latest-6</span><strong>-0.05%</strong>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div
                                                            class="tsrSectorRotationSliderSingleLine text-danger">
                                                            <span>Latest-7</span><strong>-0.98%</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="tsrSectorRotationRowCarouselBlock">
                                                <span
                                                    class="d-block text-muted x-small fw-bold text-uppercase mb-2">Technicals</span>
                                                <div
                                                    class="owl-carousel owl-theme technicals tsrSectorRotationOwlMetricsSlider">
                                                    <div class="item">
                                                        <div
                                                            class="tsrSectorRotationSliderSingleLine text-dark">
                                                            <span>EMA
                                                                13</span><strong>13294.97</strong>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div
                                                            class="tsrSectorRotationSliderSingleLine text-dark">
                                                            <span>EMA
                                                                34</span><strong>12927.42</strong>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div
                                                            class="tsrSectorRotationSliderSingleLine text-success">
                                                            <span>RSI
                                                                (14)</span><strong>69.89</strong>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div
                                                            class="tsrSectorRotationSliderSingleLine text-success">
                                                            <span>MACD</span><strong>251.27</strong>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div
                                                            class="tsrSectorRotationSliderSingleLine text-success">
                                                            <span>Signal</span><strong>247.59</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            class="w-100 pt-3 border-top d-flex flex-column align-items-center justify-content-center">
                                            <div id="trendStrengthDivNIFTY_METAL"
                                                class="tsrSectorRotationGaugeContainer">
                                                <svg width="240" height="43">
                                                    <defs>
                                                        <linearGradient id="gradient" x1="0%"
                                                            y1="0%" x2="100%" y2="0%"
                                                            spreadMethod="pad">
                                                            <stop offset="0%" stop-color="#ff0000"
                                                                stop-opacity="1"></stop>
                                                            <stop offset="50%" stop-color="#e6e600"
                                                                stop-opacity="1"></stop>
                                                            <stop offset="100%" stop-color="#009900"
                                                                stop-opacity="1"></stop>
                                                        </linearGradient>
                                                    </defs>
                                                    <g><text x="180" y="10" text-anchor="end"
                                                            style="font-size: 12px; font-weight: bold;">Technical
                                                            Strength Daily</text></g>
                                                    <g>
                                                        <rect x="0" y="15" width="230" height="8"
                                                            rx="4"
                                                            style="fill: url(&quot;#gradient&quot;);">
                                                        </rect>
                                                    </g>
                                                    <g>
                                                        <line x1="195.5" y1="15" x2="195.5" y2="23"
                                                            stroke-width="1" stroke-dasharray="2, 2"
                                                            stroke="black "></line>
                                                    </g>
                                                    <path d="M0,-7.019L6.079,3.51L-6.079,3.51Z"
                                                        fill="#000" stroke="#000" stroke-width="1"
                                                        transform="translate(195.5,25)"></path>
                                                    <g><text x="10" y="34"
                                                            style="font-size: 10px; font-weight: bold;">Sell</text>
                                                    </g>
                                                    <g><text x="220" y="34" text-anchor="end"
                                                            style="font-size: 10px; font-weight: bold;">Buy</text>
                                                    </g>
                                                    <g><text x="129" y="34" text-anchor="end"
                                                            style="font-size: 9px; font-weight: bold;">85.00%</text>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div
                                                class="tsr_strength_values_container mt-1 text-center text-muted small fw-medium">
                                                <span id="strRank">NIFTY_METAL is more bullish than
                                                    35.00 %
                                                    of stocks</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div class="border-top pt-4">
                                <div
                                    class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-3">
                                    <div class="tsrSectorRotationStockSegmentWrapper">
                                        <b class="me-3">STOCKS</b>
                                        <div class="btn-group p-1 bg-light border rounded-pill"
                                            role="group" aria-label="Stock Performance View Filter">
                                            <input type="radio" class="btn-check"
                                                name="tsrStocksViewRadio" id="tsrViewOutperforming"
                                                autocomplete="off" checked>
                                            <label
                                                class="btn btn-sm px-4 rounded-pill fw-bold text-uppercase tsrSectorRotationSegmentButton"
                                                for="tsrViewOutperforming">
                                                Outperforming
                                            </label>

                                            <input type="radio" class="btn-check"
                                                name="tsrStocksViewRadio"
                                                id="tsrViewUnderperforming" autocomplete="off">
                                            <label
                                                class="btn btn-sm px-4 rounded-pill fw-bold text-uppercase tsrSectorRotationSegmentButton"
                                                for="tsrViewUnderperforming">
                                                Underperforming
                                            </label>
                                        </div>
                                    </div>
                                    <span class="text-muted small italic opacity-75">* Technical
                                        markers
                                        evaluate on live dynamic ticking intervals</span>
                                </div>

                                <div id="tsrSecRotOutperformTable_wrapper"
                                    class="dataTables_wrapper dt-bootstrap5 no-footer mt-2">
                                    <div class="table-responsive">
                                        <table id="tsrStockComparisonTable0" class="table">

                                            <thead>

                                                <tr>

                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Price Chg %</th>
                                                    <th>vs Nifty</th>
                                                    <th>vs Nifty Metal</th>
                                                    <th>Period Return %</th>
                                                    <th>EMA 13</th>
                                                    <th>EMA 34</th>
                                                    <th>Chart</th>

                                                </tr>

                                            </thead>

                                            <tbody>

                                                <tr>
                                                    <td>Hindalco Industries Ltd.</td>
                                                    <td>1149.7</td>
                                                    <td>4.16</td>
                                                    <td>29.38</td>
                                                    <td>12.26</td>
                                                    <td>24.33</td>
                                                    <td>1088.81</td>
                                                    <td>1047.84</td>
                                                    <td><i class="fa fa-chart-line"></i></td>
                                                </tr>

                                                <tr>
                                                    <td>Welspun Corp Ltd.</td>
                                                    <td>1372.9</td>
                                                    <td>4.09</td>
                                                    <td>71.41</td>
                                                    <td>54.29</td>
                                                    <td>66.36</td>
                                                    <td>1307.27</td>
                                                    <td>1208.36</td>
                                                    <td><i class="fa fa-chart-line"></i></td>
                                                </tr>
                                                <tr>
                                                    <td>IKON STEEL</td>
                                                    <td>1149.7</td>
                                                    <td>4.16</td>
                                                    <td>29.38</td>
                                                    <td>12.26</td>
                                                    <td>24.33</td>
                                                    <td>1088.81</td>
                                                    <td>1047.84</td>
                                                    <td><i class="fa fa-chart-line"></i></td>
                                                </tr>

                                                <tr>
                                                    <td>JSW STEEL</td>
                                                    <td>1149.7</td>
                                                    <td>4.16</td>
                                                    <td>29.38</td>
                                                    <td>12.26</td>
                                                    <td>24.33</td>
                                                    <td>1088.81</td>
                                                    <td>1047.84</td>
                                                    <td><i class="fa fa-chart-line"></i></td>
                                                </tr>

                                                <tr>
                                                    <td>Hindalco Industries Ltd.</td>
                                                    <td>1149.7</td>
                                                    <td>4.16</td>
                                                    <td>29.38</td>
                                                    <td>12.26</td>
                                                    <td>24.33</td>
                                                    <td>1088.81</td>
                                                    <td>1047.84</td>
                                                    <td><i class="fa fa-chart-line"></i></td>
                                                </tr>

                                                <tr>
                                                    <td>Hindalco Industries Ltd.</td>
                                                    <td>1149.7</td>
                                                    <td>4.16</td>
                                                    <td>29.38</td>
                                                    <td>12.26</td>
                                                    <td>24.33</td>
                                                    <td>1088.81</td>
                                                    <td>1047.84</td>
                                                    <td><i class="fa fa-chart-line"></i></td>
                                                </tr>

                                                <tr>
                                                    <td>IKON STEEL</td>
                                                    <td>1149.7</td>
                                                    <td>4.16</td>
                                                    <td>29.38</td>
                                                    <td>12.26</td>
                                                    <td>24.33</td>
                                                    <td>1088.81</td>
                                                    <td>1047.84</td>
                                                    <td><i class="fa fa-chart-line"></i></td>
                                                </tr>

                                                <tr>
                                                    <td>JSW STEEL</td>
                                                    <td>1149.7</td>
                                                    <td>4.16</td>
                                                    <td>29.38</td>
                                                    <td>12.26</td>
                                                    <td>24.33</td>
                                                    <td>1088.81</td>
                                                    <td>1047.84</td>
                                                    <td><i class="fa fa-chart-line"></i></td>
                                                </tr>

                                                <tr>
                                                    <td>IKON STEEL</td>
                                                    <td>1149.7</td>
                                                    <td>4.16</td>
                                                    <td>29.38</td>
                                                    <td>12.26</td>
                                                    <td>24.33</td>
                                                    <td>1088.81</td>
                                                    <td>1047.84</td>
                                                    <td><i class="fa fa-chart-line"></i></td>
                                                </tr>

                                                <tr>
                                                    <td>JSW STEEL</td>
                                                    <td>1149.7</td>
                                                    <td>4.16</td>
                                                    <td>29.38</td>
                                                    <td>12.26</td>
                                                    <td>24.33</td>
                                                    <td>1088.81</td>
                                                    <td>1047.84</td>
                                                    <td><i class="fa fa-chart-line"></i></td>
                                                </tr>

                                            </tbody>

                                        </table>
                                    </div>
                                </div>

                            </div>

                            <div class="my-3 d-flex flex-column flex-md-row">
                                <p style="margin: 0 10px 0 0; font-weight: bold;">View Stocks on
                                    Chart
                                </p>
                                <div class="d-flex">
                                    <button class="btn btn-sm btn-outline-primary">
                                        Inline
                                    </button>
                                    <button class="btn btn-sm btn-outline-primary">
                                        Tile
                                    </button>
                                </div>
                            </div>

                            <div class="border-top pt-4">
                                <h6 class="mb-3" style="font-weight: bold;">CHART</h6>
                                
                            </div>
                        </div>
                    </div>
                </div>
            `
        */

        html += `       <div class="tsrSecRotSectOvrvwSection border-0 p-3" data-hash="${i}">`
        html += `            <div class="card shadow-sm tsrSectorRotationDetailsWorkspaceCard">`
        html += `                <div class="card-header p-4 border-bottom d-flex flex-wrap justify-content-between align-items-center gap-3">`
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
        if (i != 0) {
            html += `                   <div style="cursor: pointer; white-space: nowrap;" class="link-primary sectorCardsCarousalPrev">`
            html += `                       <i class="fas fa-arrow-left"></i>`
            html += `                       <span class="d-none d-md-inline">`
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
            html += `                   <div style="cursor: pointer; white-space: nowrap;" class="link-primary sectorCardsCarousalNext">`
            html += `                       <span class="d-none d-md-inline">`
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
        // Highlights row
        html += `
            
        `

        html += `                   <div class="row">`;

        if (miSrnUtils.pd(sectors[i].secIdx) && sectors[i].secIdx) {
            html += `                   <div class="col col-md-6 p-3" style='align-items: stretch;'>`
            html += `                       <section class="tsrSecRotLabel mb-4">`
            html += `                          <div class="mb-3 d-flex justify-content-between">`
            html += `                              <h6 style="border-bottom: 1px solid lightgrey;">Highlights</h6>`
            html += `                          </div>`
            html += `                          <div class="d-flex justify-content-between mb-3">`
            html += `                              <div class="w-100 d-flex flex-column">`
            html += `                                  <span>`
            html += `                                      Relative Returns`
            html += `                                  </span>`
            html += `                                  <h4 style="color: black; white-space: nowrap;">${miSrnUtils.gcv(sectors[i]["vsNifty"], null, "%")}</h4>`
            html += `                              </div>`
            html += `                              <div class="w-100 d-flex flex-column">`
            html += `                                  <span>Market Cap Change </span>`
            html += `                                  <h4 style="color: black; white-space: nowrap;">${miSrnUtils.gcv(sectors[i]["mcChg"], null, "Cr.")}`
            html += `                                  </h4>`
            html += `                              </div> `
            html += `                          </div>`;
            html += `                          <div class="d-flex justify-content-between mb-3">`
            html += `                              <div class="w-100 d-flex flex-column">`
            html += `                                  <span>`
            html += `                                      Outperformers`
            // html += `                                      <i class="fas fa-long-arrow-alt-up"></i>`
            html += `                                  </span>`
            html += `                                  <h4>${miSrnUtils.gcv(sectors[i]["opEq"])}</h4>`;
            html += `                              </div>`;
            html += `                              <div class="w-100 d-flex flex-column">`;
            html += `                                  <span>`;
            html += `                                      Underperformers`;
            // html += `                                      <i class="fas fa-long-arrow-alt-down"></i>`
            html += `                                  </span>`;
            html += `                                  <h4>${miSrnUtils.gcv(sectors[i]["upEq"], "#dc2626")}</h4>`
            html += `                              </div>`
            html += `                          </div>`
            html += `                          <div class="d-flex justify-content-between mb-3">`
            html += `                              <div class="w-100 d-flex flex-column">`
            html += `                                      <span>Price</span>`
            html += `                                      <h4 style="color: black; white-space: nowrap;">`
            html += miSrnUtils.gcv(sectors[i]["idxVals"]["price"]);
            html += `                                      </h4>`
            html += `                              </div>`
            html += `                              <div class="w-100 d-flex flex-column">`
            html += `                                  <span>Price Change</span>`
            html += `                                  <h4 style="color: black; white-space: nowrap;">`
            html += miSrnUtils.gcv(sectors[i]["idxVals"]["priceChange"], null, "%");
            html += `                                  </h4>`
            html += `                              </div>`
            html += `                          </div>`
            html += `                       </section>`;

            html += `                       <section class="mb-4" id="tsrStrengthIndex">`;
            html += `                           <div class="mb-3">`
            html += `                               <h6 style="border-bottom: 1px solid lightgrey; width: max-content;">Technical Strength Index</h6>`
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
            html += `                       <section class="mb-4">`;
            html += `                           <div class="mb-3 d-flex justify-content-between align-items-center">`
            html += `                               <h6 style="border-bottom: 1px solid lightgrey; width: max-content;">Technicals</h6>`
            html += `                               <p style="font-size: 12px; margin-bottom: 0;">`
            html += `                                   <span style="color: red;">*</span>`
            html += `                                       Technicals based on ${allSectorDataClone["displayFreq"]} tick`
            html += `                               </p>`
            html += `                           </div>`;
            html += `                           <div class="owl-carousel owl-theme technicals tsrSecRotLabel">`;

            let keys = Object.keys(sectors[i]["idxVals"]);

            for (let j = 0; j < keys.length; j++) {
                if (keys[j] == "ma1" || keys[j] == "ma2" || keys[j] == "rsi" || keys[j] == "macd" || keys[j] == "signal" || keys[j] == "st") {
                    html += `                               <div class="card d-flex flex-column p-3">`;
                    if (keys[j] == "ma1" || keys[j] == "ma2") {
                        if (keys[j] == "ma1") {
                            html += `                           <p style="margin-bottom: 0">EMA ${allSectorDataClone["ma1"]}</p>`;
                        } else if (keys[j] == "ma2") {
                            html += `                           <p style="margin-bottom: 0">EMA ${allSectorDataClone["ma2"]}</p>`;
                        }
                    }
                    else {
                        html += `                               <p style="margin-bottom: 0">${keys[j].toUpperCase()}</p>`;
                    }
                    html += `                                   <h4 style="color: orange; white-space: nowrap;">`;
                    html += miSrnUtils.gcv(sectors[i]["idxVals"][keys[j]]);
                    html += `                                   </h4>`;
                    //             // html += `                       <p style="color: orange;  margin: 0;">Neutral</p>`
                    html += `                               </div>`;
                }
            }

            html += `                           </div>`;
            html += `                       </section>`;

            html += `                       <section class="mb-4">`
            html += `                           <div class="mb-3">`
            html += `                               <h6 style="border-bottom: 1px solid lightgrey; width: max-content;">${allSectorDataClone["rtnFreq"]} Returns</h6>`
            html += `                           </div>`
            html += `                           <div class="owl-carousel owl-theme periodicReturns tsrSecRotLabel">`;

            for (let j = 0; j < sectors[i]["idxVals"]["rtnList"].length; j++) {
                html += `                           <div class="card d-flex flex-column p-3">`
                html += `                               <p style="margin-bottom: 0; text-wrap: nowrap;">`
                if (j == 0) {
                    html += `                               Latest`;
                } else {
                    html += `                               Latest - ${j}`;
                }
                html += `                               </p>`
                html += `                               <h5 style="color: black; white-space: nowrap;">`
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
        html += `                   <div id="${stockContainerId + i}" class="${stockContainerId} row " >`;
        html += '                   </div>';

        // Chart Row
        html += `                   <div id="${chartContainerId}" class="row">`;
        html += '                   </div>';
        html += `                </div>`
        html += `            </div>`
        html += `        </div>`


        // Old sector card carousal menu code
        /*
            // html += `   <div class="container-md" data-hash="${i}">`;
            // html += `       <div class="card shadow">`;

            // html += `           <div class="card-header d-flex justify-content-between align-items-center" style="background: linear-gradient(135deg, #dbeafe, #f1f5ff);">`;
            // if (i != 0) {
            //     html += `               <div style="cursor: pointer; white-space: nowrap;" class="link-primary sectorCardsCarousalPrev">`
            //     html += `                   <i class="fas fa-arrow-left"></i>`
            //     html += `                   <span class="d-none d-md-inline">`
            //     html += `                       &nbsp;`
            //     html += `                       Prev`
            //     html += `                   </span>`
            //     html += `               </div>`
            // }

            // html += `                   <h5 class="card-title text-center" style="font-weight: 600;">`
            // html += `                       <p style="margin: 0;">`
            // html += sectors[i].name;
            // html += `                           <b class="d-none d-sm-inline">`
            // if (i == 0) {
            //     html += `                           <sup style="color: gray;"> 1 <sup>st</sup></sup>`;
            // }
            // else if (i == 1) {
            //     html += `                           <sup style="color: gray;"> 2 <sup>nd</sup></sup>`;
            // }
            // else if (i == 2) {
            //     html += `                           <sup style="color: gray;"> 3 <sup>rd</sup></sup>`;
            // }
            // else {
            //     html += `                           <sup style="color: gray;">${i + 1} <sup>th</sup></sup>`;
            // }
            // html += `                           </b>`
            // html += `                       </p>`
            // html += `                   </h5>`


            // if (i != sectors.length - 1) {
            //     html += `               <div style="cursor: pointer; white-space: nowrap;" class="link-primary sectorCardsCarousalNext">`
            //     html += `                   <span class="d-none d-md-inline">`
            //     html += `                       Next`
            //     html += `                       &nbsp;`
            //     html += `                   </span>`
            //     html += `                   <i class="fas fa-arrow-right"></i>`
            //     html += `               </div>`
            // }
            // html += `           </div>`;
        */

        // sector card header ends


        // ---------------------------------------------------------------------

        // sector card body starts

        /*
            // let sectorAnalysisUrl = mintJsUtil.getRootUrl() + "/Screener/Markets/" + sectors[i].url; // TODO
            // let sectorAnalysisUrl = "http" + "/Screener/Markets/" + sectors[i].url;
            // if (!sectors[i]["secIdx"]) {
            //     sectorAnalysisUrl += "/All"
            // }
        */
        /*
         // html += `           <div class="card-body">`;
         // html += `               <div class="row text-center">`;
         // html += `                   <h6 class="">`;
         // html += `                       <a href="${sectorAnalysisUrl}" target="_blank">`
         // html += `                           View in Depth Analysis`
         // html += `                           <i class="fas fa-external-link-square-alt"></i>`
         // html += `                       </a>`
         // html += `                   </h6>`
         // html += `               </div>`;
 
 
         // html += `               <div id="${stockTableContainerId + i}" class="${stockTableContainerId} row" >`;
         // html += '               </div>';
 
         // html += `               <div id="${stockContainerId + i}" class="${stockContainerId} row container-md" >`;
 
         // html += '               </div>';
 
 
         // html += `               <div class="d-flex flex-column text-end mt-2">`
         // html += `                   <p style="font-size: 12px; margin-bottom: 0;">`
         // html += `                       <span style="color: red;">*</span>`
         // html += `                           Sector / Index rating utilizes only Stocks beyond certain Market Capital`
         // html += `                   </p>`
         // html += `                   <p style="font-size: 12px; margin-bottom: 0;">`
         // html += `                       <span style="color: red;">*</span>`
         // html += `                           Show all - includes Stocks across all Market Cap. Maximum of 20 stocks are shown`
         // html += `                   </p>`
         // html += `               </div>`
 
         // html += `           </div> `; // card body closes here
         // html += `       </div>`; // card closes here
         // html += `   </div> `; // .tsrSecRotSectOvrvwSection closes here
         */
        if (miSrnUtils.pd(sectors[i].secIdx) && sectors[i].secIdx) {
            //     html += `</div>`;

            tsrStrengthIndexList[sectors[i]["id"]] = {
                divId: "trendStrengthDiv" + sectors[i]["id"],
                rank: miSrnUtils.grv(sectors[i]["idxVals"]["techStrength"])
            }
        }

        return html;
    }

    function processStockTableSection(secType, stockType, secId, show, update) {

        let sectorTypeSelect = document.getElementById(sectorTypeSelectId);

        let durationSelect = document.getElementById(sectorDurationSelectId);

        let sectors = [...allSectorDataClone[secType + "Sec"]];

        let sector = sectors[secId];

        let html = "";

        let mdtOptions = {
            paging: false,
            responsive: true,
            scrollY: 250,
            scrollX: true,
            scrollCollapse: false,
            searching: false,
            dom: 'Bfrtip',
            info: false,
            buttons: [
                { extend: "copy", className: "btn btn-sm  btn-secondary ms-2    mt-1", text: " Copy" },
                { extend: "csv", className: "btn  btn-sm btn-secondary ms-2    mt-1", text: " CSV" },
                { extend: "excel", className: "btn  btn-sm btn-secondary ms-2     mt-1", text: " Excel" },
                { extend: "print", className: "btn  btn-sm btn-secondary ms-1    mt-1", text: " Print" }
            ],
            fixedColumns: {
                leftColumns: 1,
                rightColumns: 1,
            }
        }

        if (miSrnUtils.pd(sectorTypeSelect) && miSrnUtils.pd(durationSelect)) {
            let sectorType = sectorTypeSelect.value;
            let duration = durationSelect.value;

            // let url = mintJsUtil.getRootUrl() + `/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=one&code=${sector["uriCode"]}`;
            // let url = "https://www.tsrbt1.com/rt" + `/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=one&code=${sector["uriCode"]}`;
            let url = `http://127.0.0.1:5500/Temp/secRotData/${sector["uriCode"]}.json`;
            // let url = `https://nitronik7.github.io/TSR-Frontend/Temp/secRotData/${sector["uriCode"]}.json`;

            // TODO - replace miSrnUtils.pd with jsu.isNotNull()
            // avoiding multiple API calls for same sector
            if (!(miSrnUtils.pd(sectorData) && sectorData.secType == secType && sectorData.secId == secId && sectorData["statusCode"] == "success")) {

                miSrnUtils.gd(url).then(data => {
                    let container = document.getElementById(stockTableContainerId + secId);

                    sectorData = data;
                    sectorData["secType"] = secType;
                    sectorData["secId"] = secId;

                    if (sectorData["statusCode"] == "success") {
                        html = paintStockTableSection(sector, secType, stockType, secId);
                        container.innerHTML = html;

                        let stockList = sectorData[stockType + "List"];
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

                let stockList = sectorData[stockType + "List"];
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

    };

    function paintStockTableSection(sector, secType, stockType, secId) {


        let html = "";

        // Radio buttons
        // let onclickFn = `miSrn.ec(); miSrn.psts('${secType}','${stockType}', ${secId}, true, true);`
        html += `   <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-3">`
        html += `       <div class="tsrSectorRotationStockSegmentWrapper">`
        html += `           <b class="me-3">STOCKS</b>`
        html += `           <div class="btn-group p-1 bg-light border rounded-pill" role="group" aria-label="Stock Performance View Filter">`
        if (stockType == "opEq") {
            html += `               <input type="radio" class="btn-check" name="sector${secId}Stocks" id="outPerformingStocks${secId}" autocomplete="off" checked>`
        } else {
            html += `               <input type="radio" class="btn-check" name="sector${secId}Stocks" id="outPerformingStocks${secId}" autocomplete="off">`
        }

        html += `               <label class="btn btn-sm px-4 rounded-pill fw-bold text-uppercase tsrSectorRotationSegmentButton" for="tsrViewOutperforming" onclick="miSrn.ec(); miSrn.psts('${secType}','opEq', ${secId}, true, true);">`

        html += `                   Outperforming`
        html += `               </label>`

        if (stockType == "upEq") {
            html += `               <input type="radio" class="btn-check" name="sector${secId}Stocks" id="underPerformingStocks${secId}" autocomplete="off" checked>`
        } else {
            html += `               <input type="radio" class="btn-check" name="sector${secId}Stocks" id="underPerformingStocks${secId}" autocomplete="off">`
        }
        html += `               <label class="btn btn-sm px-4 rounded-pill fw-bold text-uppercase tsrSectorRotationSegmentButton" for="tsrViewUnderperforming"  onclick="miSrn.ec(); miSrn.psts('${secType}','upEq', ${secId}, true, true);">`
        html += `                   Underperforming`
        html += `               </label>`
        html += `           </div>`
        html += `       </div>`
        html += `       <span class="text-muted small italic opacity-75">* Technical markers
                                                        evaluate on live dynamic ticking intervals</span>`
        html += `   </div>`

        html += ``
        // html += `               <div class="mb-3" style="border-bottom: 1px solid lightgrey;">`
        // html += `                   <h6>Stocks</h6>`
        // html += `               </div>`
        // html += `   <div>`;
        // html += `       <div class="mb-3 btn-group" role="group">`;

        // if (stockType == "opEq") {
        //     html += `       <input type="radio" class="btn-check" name="sector${secId}Stocks" id="outPerformingStocks${secId}" autocomplete="off" checked>`;
        // }
        // else {
        //     html += `       <input type="radio" class="btn-check" name="sector${secId}Stocks" id="outPerformingStocks${secId}" autocomplete="off">`;
        // }

        // html += `           <label class="btn btn-outline-secondary" for="outPerformingStocks${secId}" onclick=" miSrn.ec(); miSrn.psts('${secType}','opEq', ${secId}, true, true);">Out Performing</label>`;

        // if (stockType == "upEq") {
        //     html += `       <input type="radio" class="btn-check" name="sector${secId}Stocks" id="underPerformingStocks${secId}" autocomplete="off" checked>`;
        // }
        // else {
        //     html += `       <input type="radio" class="btn-check" name="sector${secId}Stocks" id="underPerformingStocks${secId}" autocomplete="off">`;
        // }

        // html += `           <label class="btn btn-outline-secondary" for="underPerformingStocks${secId}" onclick=" miSrn.ec(); miSrn.psts('${secType}','upEq', ${secId}, true, true);">Under Performing</label>`;

        // html += `       </div>`;
        // html += `   </div>`;



        // table
        let tableFields = ["Name", "", "Price", "Price Chg %", "vs Nifty", "Period Return %", `EMA ${allSectorDataClone["ma1"]}`, `EMA ${allSectorDataClone["ma2"]}`, `RSI`, `MACD`, `Signal`, `ST`, `Chart`];

        let isIdxBased = false;
        if (miSrnUtils.pd(sector.secIdx) && sector.secIdx) {
            isIdxBased = true;
            tableFields.splice(4, 0, `vs ${sector.name}`);
        }

        // html += `                             <div style="max-height: 40vh; overflow: auto;">`
        html += `                          <div>`
        html += `                             <table id="${stockTableId + secId}" class="table align-middle tsrSecRotTable w-100">`
        html += `                               <thead>`;
        html += `                                   <tr>`;
        for (let i = 0; i < tableFields.length; i++) {
            html += `                                   <th scope="col">${tableFields[i]}</th>`
        }
        html += `                                   </tr>`;
        html += `                               </thead>`;
        html += `                               <tbody>`;

        let stockList = sectorData[stockType + "List"];

        if (stockList.length == 0) {
            html += `                               <tr>`;
            html += `                                  <td colspan="${tableFields.length}"  class="text-center">`
            html += `                                      No records`
            html += `                                  </td>`
            html += `                               </tr>`;
        }
        else {
            for (let i = 0; i < stockList.length; i++) {

                html += `<tr>`;
                html += `   <td title="${stockList[i]["name"]}"><b style="font-size: 15px;">${stockList[i]["code"]}</b></td>`;
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

        html += `                               </tbody>`;
        html += `                             </table>`;
        html += `                        </div>`

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

        html += `   <div class="d-flex flex-column text-end">`
        html += `                   <p style="font-size: 12px; margin-bottom: 0;">`
        html += `                       <span style="color: red;">*</span>`
        html += `                           Sector / Index rating utilizes only Stocks beyond certain Market Capital`
        html += `                   </p>`
        html += `                   <p style="font-size: 12px; margin-bottom: 0;">`
        html += `                       <span style="color: red;">*</span>`
        html += `                           Show all - includes Stocks across all Market Cap. Maximum of 20 stocks are shown`
        html += `                   </p>`
        html += `   </div>`
        html += `                           </div>`

        return html;
    }

    function processStockSection(secType, stockType, secId, stockCode, show) {

        let stockSectionModal = document.getElementById(stockSectionModalId);
        stockSectionModal.style.display = "block";

        let stockContainer = document.getElementById(stockSectionDivId);

        // let stockContainer = document.getElementById(stockContainerId + secId);


        if (!show) {
            stockContainer.innerHTML = "";
            stockContainer.parentElement.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            return;
        }

        let sectorTypeSelect = document.getElementById(sectorTypeSelectId);

        let durationSelect = document.getElementById(sectorDurationSelectId);


        if (miSrnUtils.pd(sectorTypeSelect) && miSrnUtils.pd(durationSelect)) {
            let sectorType = sectorTypeSelect.value;
            let duration = durationSelect.value;

            let sectors = [...allSectorDataClone[secType + "Sec"]];

            let sector = sectors[secId];

            // let url = mintJsUtil.getRootUrl() + `/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=one&code=${sector["uriCode"]}`;
            // let url = "https://www.tsrbt1.com/rt" + `/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=one&code=${sector["uriCode"]}`;
            let url = `http://127.0.0.1:5500/Temp/secRotData/secRot${duration}${sectorType}`;

            // avoiding multiple API calls for same sector
            if (!(miSrnUtils.pd(sectorData) && sectorData.secType == secType && sectorData.secId == secId && sectorData["statusCode"] == "success")) {
                miSrnUtils.gd(url).then(data => {

                    if (data.statusCode == "success") {
                        sectorData = data;
                        sectorData["secType"] = secType;
                        sectorData["secId"] = secId;

                        paintStockSection(secType, sector, stockContainer, stockType, secId, stockCode);
                    }

                });
            } else {
                paintStockSection(secType, sector, stockContainer, stockType, secId, stockCode);
            }
        };
    }

    function paintStockSection(secType, sector, stockContainer, stockType, secId, stockCode) {

        let stockList = sectorData[stockType + "List"];
        let stock = mintJsUtil.getObjFrmArrByField(stockList, "code", stockCode)

        stockContainer.classList.add("p-3");

        let html = "";

        let techUrl = mintJsUtil.getRootUrl() + '/Stock/' + stock["id"] + "/TechnicalAnalysis";
        let fundaUrl = mintJsUtil.getRootUrl() + '/Stock/' + stock["id"] + "/FundamentalAnalysis"
        // html += `                     <hr>`
        html += `                   <div class="row">`
        html += `                       <div class="text-center d-flex justify-content-between flex-column flex-lg-row">`
        html += `                           <h2 style="margin-bottom: 0px;">`
        html += `                               ${stock["name"]}`
        html += `                           </h2>`
        // html += `                           <div class="d-flex justify-content-between align-items-center" style="gap: 10px; margin-bottom: 8px;">`
        // html += `                               <span style="font-size: 14px; font-weight: 200;">Price</span>`
        // html += `                                   <h5 style="color: black; white-space: nowrap; margin-bottom: 0;">`
        // html += miSrnUtils.gcv(stock["eqVals"]["price"]);
        // html += `                                   </h5>`
        // html += `                           </div>`
        // html += `                           <div class="d-flex justify-content-between align-items-center" style="gap: 10px; margin-bottom: 8px;">`
        // html += `                               <span style="font-size: 14px; font-weight: 200;">Price Change </span>`
        // html += `                                   <h5 style="color: black; white-space: nowrap; margin-bottom: 0;">`
        // html += miSrnUtils.gcv(stock["eqVals"]["priceChange"], null, "%");
        // html += `                                   </h5>`

        // html += `                           </div>`
        html += `                           <div style="white-space: nowrap; gap: 10px;" class="text-center d-flex justify-content-between">`
        html += `                               <span class="tsrSecRotLabel">View Analysis &emsp;</span>`
        html += `                               <div>`
        html += `                                   <a href="${techUrl}" target="_blank" class="text-primary" oncontextmenu="return false;">`
        html += `                                       <span class="fas fa-chart-line"></span> Tech </a> | `
        html += `                                   <a href="${fundaUrl}" target="_blank" class="text-primary" oncontextmenu="return false;">`
        html += `                                       <span class="fas fa-chart-line"></span> Funda`
        html += `                                   </a>`
        html += `                               </div>`
        html += `                           </div>`
        html += `                       </div>`
        html += `                   </div>`

        html += `<hr>`


        // HIGHLIGHTS SECTION
        html += `                   <section class="tsrSecRotLabel">`
        html += `                       <div class="mb-3">`
        html += `                            <h6 style="border-bottom: 1px solid lightgrey; width: max-content;">Highlights</h6>`
        html += `                       </div>`
        // html += `                       <div class="d-flex justify-content-between mb-3">`
        // html += `                           <div class="w-100 d-flex flex-column">`
        // html += `                               <span style="font-weight: 100;">`
        // html += `                                   Relative Returns vs NIFTY`
        // html += `                               </span>`
        // html += `                               <h4 style="color: black; white-space: nowrap;">${miSrnUtils.gcv(stock["vsNifty"], null, "%")}</h4>`
        // html += `                           </div>`
        // if (miSrnUtils.pd(sector.secIdx) && sector.secIdx) {

        //     html += `                           <div class="w-100 d-flex flex-column">`
        //     html += `                               <span style="font-weight: 100;">`
        //     html += `                                   Relative Returns vs ${sector["name"]}`
        //     html += `                               </span>`
        //     html += `                               <h4 style="color: black; white-space: nowrap;">${miSrnUtils.gcv(stock["vsIdx"], null, "%")}</h4>`
        //     html += `                           </div>`
        // }
        // html += `                       </div>`

        html += `                       <div class="d-flex flex-column flex-md-row justify-content-between mb-">`
        html += `                           <div class="d-flex justify-content-between mb-3 w-100 ">`
        html += `                               <div class="w-100 d-flex flex-column">`
        html += `                                   <span style="font-weight: 100;">`
        html += `                                       Relative Returns vs NIFTY`
        html += `                                   </span>`
        html += `                                   <h4 style="color: black; white-space: nowrap;">${miSrnUtils.gcv(stock["vsNifty"], null, "%")}</h4>`
        html += `                               </div>`
        if (miSrnUtils.pd(sector.secIdx) && sector.secIdx) {

            html += `                           <div class="w-100 d-flex flex-column">`
            html += `                               <span style="font-weight: 100;">`
            html += `                                   Relative Returns vs ${sector["name"]}`
            html += `                               </span>`
            html += `                               <h4 style="color: black; white-space: nowrap;">${miSrnUtils.gcv(stock["vsIdx"], null, "%")}</h4>`
            html += `                           </div>`
        }
        html += `                           </div>`

        html += `                           <div class="d-flex justify-content-between mb-3 w-100 ">`
        html += `                               <div class="w-100 d-flex flex-column">`
        html += `                                   <span style="font-weight: 100;">Price</span>`
        html += `                                       <h4 style="color: black; white-space: nowrap;">`
        html += miSrnUtils.gcv(stock["eqVals"]["price"]);
        html += `                                       </h4>`
        html += `                               </div>`


        html += `                               <div class="w-100 d-flex flex-column">`
        html += `                                   <span style="font-weight: 100;">Price Change </span>`
        html += `                                       <h4 style="color: black; white-space: nowrap;">`
        html += miSrnUtils.gcv(stock["eqVals"]["priceChange"], null, "%");
        html += `                                       </h4>`
        html += `                               </div>`
        html += `                           </div>`

        html += `                       </div>`


        html += `                   </section>`;
        // html += `                 <div class="col-12 col-md-6 my-3 my-md-0">`
        html += `           <section class="mb-4 tsrSecRotLabel">`
        html += `               <div class="mb-3">`
        html += `                   <h6 style="border-bottom: 1px solid lightgrey; width: max-content;">`
        html += `                       TSR Strength Index`
        html += `                   </h6>`;
        html += `               </div>`
        html += `               <div>`
        // html += `                   <table class="table table-striped"> 
        //                                 <tbody>
        //                                     <tr>
        //                                         <td>Technical Strength</td>
        //                                         <td><span style="color:orange;">Mild Bearish</span></td>
        //                                     </tr>
        //                                     <tr>
        //                                         <td>Growth Index</td>
        //                                         <td> <span style="color:#ff9999;  ">Low Growth Stock</span></td>
        //                                     </tr>
        //                                     <tr>
        //                                         <td>Value Index</td>
        //                                         <td> <span style="color:orange;  ">No Significant Value</span></td>
        //                                     </tr>
        //                                     <tr>
        //                                         <td>Profitability Index</td>
        //                                         <td> <span style="color:#ff4c4c;  ">Very Low Profitability Stock</span></td>
        //                                     </tr>
        //                                     <tr>
        //                                         <td>Stability Index</td>
        //                                         <td> <span style="color:#008B00;  ">Good Stability</span></td>
        //                                     </tr>
        //                                 </tbody>
        //                             </table>`

        html += `               <div class="owl-carousel owl-theme tsrStrengthIndex">`;

        html += `                   <div class="card d-flex flex-column p-2">`
        html += `                       <p style="margin-bottom: 0;">`
        html += `                           Technical Strength`
        html += `                       </p>`
        html += `                       <h6 style="color: black; white-space: nowrap;">`
        html += `                           Mild Bearish`
        html += `                       </h6>`
        html += `                   </div>`;
        html += `                   <div class="card d-flex flex-column p-2">`
        html += `                       <p style="margin-bottom: 0;">`
        html += `                           Growth Index`
        html += `                       </p>`
        html += `                       <h6 style="color: black; white-space: nowrap;">`
        html += `                           Low Growth Stock`
        html += `                       </h6>`
        html += `                   </div>`;
        html += `                   <div class="card d-flex flex-column p-2">`
        html += `                       <p style="margin-bottom: 0;">`
        html += `                           Value Index`
        html += `                       </p>`
        html += `                       <h6 style="color: black; white-space: nowrap;">`
        html += `                           No Significant Value`
        html += `                       </h6>`
        html += `                   </div>`;
        html += `                   <div class="card d-flex flex-column p-2">`
        html += `                       <p style="margin-bottom: 0;">`
        html += `                           Profitability Index`
        html += `                       </p>`
        html += `                       <h6 style="color: black; white-space: nowrap;">`
        html += `                           Very Low Profitability Stock`
        html += `                       </h6>`
        html += `                   </div>`;
        html += `                   <div class="card d-flex flex-column p-2">`
        html += `                       <p style="margin-bottom: 0;">`
        html += `                           Stability Index`
        html += `                       </p>`
        html += `                       <h6 style="color: black; white-space: nowrap;">`
        html += `                           Good Stability`
        html += `                       </h6>`
        html += `                   </div>`;

        html += `               </div>`

        html += `               </div>`
        html += `           </section>`;


        // FUNDAMENTALS SECTION
        html += `           <section class="mb-4 tsrSecRotLabel">`;
        html += `               <div class="mb-3 d-flex justify-content-between align-items-center flex-column flex-sm-row">`
        html += `                   <h6 style="margin-bottom: 0; border-bottom: 1px solid lightgrey; width: max-content;">Fundamentals</h6>`
        html += `                   <p style="font-size: 12px; margin-bottom: 0;">`
        html += `                       <span style="color: red;">*</span>`
        html += `                           Fundamentals based on ${allSectorDataClone["displayFreq"]} tick`
        html += `                   </p>`
        html += `               </div>`;
        html += `               <div class="owl-carousel owl-theme technicals">`;

        // TODO hack
        let fundaKeys = [];
        if (miSrnUtils.pd(stock["eqVals"])) {
            fundaKeys = Object.keys(stock["eqVals"]);

        }

        for (let j = 0; j < fundaKeys.length; j++) {
            if (fundaKeys[j] == "ma1" || fundaKeys[j] == "ma2" || fundaKeys[j] == "rsi" || fundaKeys[j] == "macd" || fundaKeys[j] == "signal" || fundaKeys[j] == "st") {

                html += `                   <div class="card d-flex flex-column p-2">`;
                if (fundaKeys[j] == "ma1" || fundaKeys[j] == "ma2") {
                    if (fundaKeys[j] == "ma1") {
                        html += `                       <p style="margin-bottom: 0;">EMA ${allSectorDataClone["ma1"]}</p>`;
                    } else if (fundaKeys[j] == "ma2") {
                        html += `                       <p style="margin-bottom: 0;">EMA ${allSectorDataClone["ma2"]}</p>`;
                    }
                }
                else {
                    html += `                       <p style="margin-bottom: 0;">${fundaKeys[j].toUpperCase()}</p>`;
                }
                html += `                       <h5 style="color: orange; white-space: nowrap;">`;
                html += miSrnUtils.gcv(stock["eqVals"][fundaKeys[j]]);
                html += `                       </h5>`;
                html += `                   </div>`;

            }
        }

        html += `               </div>`;
        html += `           </section>`;



        // html += `                 </div>`


        // html += `   <div class="col-12 col-md-6 my-3 my-md-0">`
        // RETURNS SECTION
        html += `           <section class="mb-4 tsrSecRotLabel">`
        html += `               <div class="mb-3">`
        html += `                   <h6 style="border-bottom: 1px solid lightgrey; width: max-content;">`
        html += `                       ${allSectorDataClone["rtnFreq"]} Returns`
        html += `                   </h6>`;
        html += `               </div>`
        html += `               <div class="owl-carousel owl-theme periodicReturns">`;

        for (let j = 0; j < stock["eqVals"]["rtnList"].length; j++) {
            html += `               <div class="card d-flex flex-column p-2">`

            html += `                   <p style="margin-bottom: 0;">`
            if (j == 0) {
                html += `                       Latest`;
            } else {
                html += `                       Latest - ${j}`;
            }
            html += `                   </p>`
            html += `                   <h5 style="color: black; white-space: nowrap;">`
            html += miSrnUtils.gcv(stock["eqVals"]["rtnList"][j]["rtn"], null, "%");
            html += `                   </h5>`
            html += `               </div>`;
        };
        html += `               </div>`
        html += `           </section>`;

        // TECHNICALS SECTION
        html += `           <section class="mb-4 tsrSecRotLabel">`;
        html += `               <div class="mb-3 d-flex justify-content-between align-items-center flex-column flex-sm-row">`
        html += `                   <h6 style="margin-bottom: 0; border-bottom: 1px solid lightgrey; width: max-content;">Technicals</h6>`
        html += `                   <p style="font-size: 12px; margin-bottom: 0;">`
        html += `                       <span style="color: red;">*</span>`
        html += `                           Technicals based on ${allSectorDataClone["displayFreq"]} tick`
        html += `                   </p>`
        html += `               </div>`;
        html += `               <div class="owl-carousel owl-theme technicals">`;

        // TODO hack
        let keys = [];
        if (miSrnUtils.pd(stock["eqVals"])) {
            keys = Object.keys(stock["eqVals"]);

        }

        for (let j = 0; j < keys.length; j++) {
            if (keys[j] == "ma1" || keys[j] == "ma2" || keys[j] == "rsi" || keys[j] == "macd" || keys[j] == "signal" || keys[j] == "st") {

                html += `                   <div class="card d-flex flex-column p-2">`;
                if (keys[j] == "ma1" || keys[j] == "ma2") {
                    if (keys[j] == "ma1") {
                        html += `                       <p style="margin-bottom: 0;">EMA ${allSectorDataClone["ma1"]}</p>`;
                    } else if (keys[j] == "ma2") {
                        html += `                       <p style="margin-bottom: 0;">EMA ${allSectorDataClone["ma2"]}</p>`;
                    }
                }
                else {
                    html += `                       <p style="margin-bottom: 0;">${keys[j].toUpperCase()}</p>`;
                }
                html += `                       <h5 style="color: orange; white-space: nowrap;">`;
                html += miSrnUtils.gcv(stock["eqVals"][keys[j]]);
                html += `                       </h5>`;
                html += `                   </div>`;

            }
        }

        html += `               </div>`;
        html += `           </section>`;


        // html += `   </div>`;



        // html += `                   <div class="text-center">`
        // html += `                       <a style="color: var(--primary-color,#006aff); cursor: pointer;" onclick="miSrn.pss('${secType}', '${stockType}', ${secId}, '${stock["code"]}', false)">`;
        // html += `                               Hide`;
        // html += `                       </a>`;
        // html += `                   </div>`;

        stockContainer.innerHTML = html;

        mintHtmlUtil.dlg({
            divId: `trendStrengthDiv${stock["id"]}`,
            rank: miSrnUtils.grv(stock["eqVals"]["techStrength"]),
            title: 'Technical Strength Daily',
            leftLabel: 'Sell',
            rightLabel: 'Buy',
            width: 240,
            height: 8
        });
        stockContainer.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
        initializeCarousal(false);
    }

    function paintChart(secType, secId, stockListType, stockCode, all, chartType, scrollTo) {

        defStk = null;
        json = null;
        jPlist = [];

        let sectorTypeSelect = document.getElementById(sectorTypeSelectId);

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
        // let url = `https://www.tsrbt1.com/rt/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=one&code=${sector["uriCode"]}`;
        let url = `http://127.0.0.1:5500/Temp/secRotData/${sector["uriCode"]}.json`;
        // let url = `https://nitronik7.github.io/TSR-Frontend/Temp/secRotData/${sector["uriCode"]}.json`;

        if (!(miSrnUtils.pd(sectorData) && sectorData.secType == secType && sectorData.secId == secId && sectorData["statusCode"] == "success")) {
            miSrnUtils.gd(url).then(data => {

                sectorData = data;

                processChart(sectorData, secType, stockListType, stockCode, all, chartType, scrollTo);
            });
        } else {
            processChart(sectorData, secType, stockListType, stockCode, all, chartType, scrollTo);
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
            if (miSrnUtils.pd(currSector["secIdx"]) && currSector["secIdx"]) {
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

    function eraseContent() {
        let chart = document.getElementById(chartContainerId);

        if (miSrnUtils.pd(chart)) {
            chart.innerHTML = '';
            chart.classList.remove("card");
        }

        // let stockTableContainers = document.getElementsByClassName(stockTableContainerId);

        // for (let i = 0; i < stockTableContainers.length; i++) {
        //     stockTableContainers[i].innerHTML = '';
        //     stockTableContainers[i].style.maxHeight = "unset";

        // }

        let stockContainers = document.getElementsByClassName(stockContainerId);

        for (let i = 0; i < stockContainers.length; i++) {
            stockContainers[i].innerHTML = '';
        }

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

    function paintTsrToolsContainer() {
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

// fields required for completion
// 1. Screener analysis links
// 2. 
