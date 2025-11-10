
var defStk;
var json;
var jPlist = [];

var miSrn = (function () {  // chart init Params

    var sectorTypeSelectId = "tsrSectorRotationTypeSelect";
    var sectorDurationSelectId = "tsrSectorRotationDurationSelect";
    var accordionId = "tsrBaseSectorAccordion";
    var sectorTableContainerId = "tsrSectorTableContainer";
    var sectorTableId = "tsrSectorTable";
    var stockTableContainerId = "stockComparisonTableContainer";
    var stockContainerId = "stockContainer";
    var chartContainerId = "tsrSectorRotationChartContainer";
    var sectorCardContainerId = "tsrSectorCardContainer";
    let stockTableBtnId = "stockTableShowButton";

    var allSectorDataClone;
    var allSectorData;
    var sectorData;
    var NIFTY;
    var tsrStrengthIndexList = {};
    // Start
    miSrnUtils.pds(sectorDurationSelectId);
    init();

    function init() {

        defStk = null;
        json = null;
        jPlist = [];

        let sectorTypeSelect = document.getElementById(sectorTypeSelectId);
        let durationSelect = document.getElementById(sectorDurationSelectId);

        let accordionDiv = document.getElementById(accordionId);
        accordionDiv.innerHTML = "";

        let sectorContainer = document.getElementById(sectorTableContainerId);
        sectorContainer.innerHTML = "";

        let sectorCardContainer = document.getElementById(sectorCardContainerId);
        sectorCardContainer.innerHTML = "";

        let chart = document.getElementById(chartContainerId);
        chart.innerHTML = "";


        if (miSrnUtils.pd(sectorTypeSelect) && miSrnUtils.pd(durationSelect)) {
            let sectorType = sectorTypeSelect.value;
            let duration = durationSelect.value;

            if (sectorType != 'industry' || duration != '3m') {
                miSrnUtils.slt(true);
            }else{
                miSrnUtils.slt(false);
            }

            // <div class="toast-container p-3" id="toastPlacement">
            //     <div class="toast">
            //         <div class="toast-header">
            //             <img src="..." class="rounded me-2" alt="...">
            //                 <strong class="me-auto">Bootstrap</strong>
            //                 <small>11 mins ago</small>
            //         </div>
            //         <div class="toast-body">
            //             Hello, world! This is a toast message.
            //         </div>
            //     </div>
            // </div>

            let url = mintJsUtil.getRootUrl() + `/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=all`;
            // let url = "https://www.tsrbt1.com/rt" + `/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=all`;

            miSrnUtils.gd(url).then(data => {

                allSectorData = data;
                allSectorDataClone = { ...allSectorData };

                let opSectors = allSectorDataClone["opSec"];
                for (let i = 0; i < opSectors.length; i++) {
                    if (opSectors[i]["mcChg"] <= 0 && opSectors[i]["mcChgPc"] <= 0) {
                        opSectors.splice(i, 1);
                    }
                }

                if (allSectorDataClone["statusCode"] == "success") {

                    // paintBaseSectorAccordion();

                    paintSectorTableContainer();
                }
            });

        }
    }

    function paintBaseSectorAccordion() {

        let accordionDiv = document.getElementById(accordionId);

        let baseSector = "NIFTY";

        // create accordion only if NIFTY (base sector) exists
        if (miSrnUtils.pd(accordionDiv) && miSrnUtils.pd(allSectorDataClone[baseSector])) {

            let html = ``;

            html += `<div class="accordion container-md" id="accordionExample">`;

            html += `   <div class="accordion-item">`;
            html += `       <h2 class="accordion-header" style="background: linear-gradient(135deg, #dbeafe, #f1f5ff) !important;">`;
            html += `           <button class="accordion-button text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">`;
            html += `               <span style="font-size: 18px; font-weight: 500;">`;
            html += allSectorDataClone[baseSector].id;
            html += `               </span >`
            html += `               <div class="ms-5 d-flex align-items-center" style="font-size: 18px; ">`

            if (allSectorDataClone[baseSector].priceChange > 0) {
                html += `<div class="d-flex fw-bold align=items-center" style="color: #31a745;">`;
                html += miSrnUtils.grv(allSectorDataClone[baseSector].price);
                html += `</div>`;
                html += `<div class="d-flex fw-bold align=items-center" style="color: #31a745;">`;
                html += "emsp;" + miSrnUtils.grv(allSectorDataClone[baseSector].priceChange) + "&nbsp; <i class='fas fa-long-arrow-alt-up'></i>";
                html += `</div>`;
            }
            else if (allSectorDataClone[baseSector].priceChange < 0) {

                html += `<div class="d-flex fw-bold align=items-center" style="color: #ff9999;">`;
                html += miSrnUtils.grv(allSectorDataClone[baseSector].price);
                html += `</div>`;
                html += `<div class="d-flex fw-bold align=items-center" style="color: #ff9999;">`;
                html += "&emsp;" + miSrnUtils.grv(allSectorDataClone[baseSector].priceChange) + "&nbsp; <i class='fas fa-long-arrow-alt-down'></i>";
                html += `</div>`;
            }
            else {
                html += `<div class="d-flex fw-bold align=items-center" style="color: black;">`;
                html += miSrnUtils.grv(allSectorDataClone[baseSector].price);
                html += `</div>`;
                html += `<div class="d-flex fw-bold align=items-center" style="color: black;">`;
                html += "emsp;" + miSrnUtils.grv(allSectorDataClone[baseSector].priceChange) + "";
                html += `</div>`;
            }
            html += `               </div>`
            html += `           </button>`
            html += `       </h2>`
            html += `       <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">`
            html += `           <div class="accordion-body">`
            html += `               <div class="card-body">`
            html += `                   <div class="row">`
            html += `                       <div class="col-12 col-md-6 d-flex flex-column justify-content-center">`
            html += `                           <div id='trendStrengthDivNIFTY' class="d-flex justify-content-center"></div>`
            html += `                               <div class="tsr_strength_values_container">`
            // html += `                               <div class="d-flex justify-content-around" id="strSig">`
            // html += `                                   Signal`
            // html += `                                   <span>`
            // html += `                                       <span  style='color:#96C8A2;'>`
            // html += `                                           Mild Bullish`
            // html += `                                       </span>`
            // html += `                                   </span>`
            // html += `                               </div>`

            html += `                               <div class="d-flex justify-content-center" id="strRank">`
            html += `                                   <span style="font-size: 14px;"> ${allSectorDataClone[baseSector]['techPosi']} </span>`
            html += `                               </div>`
            html += `                           </div>`
            html += `                       </div>`

            html += `<hr class="d-block d-md-none my-3">`

            html += `                       <div class="col-12 mt-md-0 col-md-6 d-flex flex-column justify-content-around">`

            html += `                           <div class="row row-cols-2" style="text-align:center;">`

            html += `                               <div class="col">`
            html += `                                   <div class="card-body justify-content-center">`
            html += `                                       <h6>Period Change</h6>`
            html += `                                   </div>`
            html += `                                   <h4 class="card-title fw-bold" style="color:#004F00;  ">`;
            html += allSectorDataClone[baseSector].periodChg;
            html += `                                   </h4>`
            html += `                               </div>`
            html += `                               <div class="col">`
            html += `                                   <div class="card-body justify-content-center">`;
            html += `                                       <h6>Market Cap Change</h6>`;
            html += `                                   </div>`;
            html += `                                   <h4 class="card-title fw-bold" style="color:orange;  ">`
            html += allSectorDataClone[baseSector].marketCapChg;
            html += `                                   </h4>`;
            html += `                               </div>`;
            html += `                               <div class="col">`
            html += `                                   <div class="card-body justify-content-center">`;
            html += `                                       <h6>MA 1</h6>`;
            html += `                                   </div>`;
            html += `                                   <h4 class="card-title fw-bold" style="color:orange;  ">`
            html += allSectorDataClone[baseSector].marketCapChg;
            html += `                                   </h4>`;
            html += `                               </div>`;
            html += `                               <div class="col">`
            html += `                                   <div class="card-body justify-content-center">`;
            html += `                                       <h6>MA 2</h6>`;
            html += `                                   </div>`;
            html += `                                   <h4 class="card-title fw-bold" style="color:orange;  ">`
            html += allSectorDataClone[baseSector].marketCapChg;
            html += `                                   </h4>`;
            html += `                               </div>`;
            html += `                           </div>`;
            html += `                       </div>`;
            html += `                   </div>`;
            html += `               </div>`;
            html += `         </div>`;
            html += `   </div>`;
            html += `</div>`
            html += `</div>`

            accordionDiv.innerHTML = html;

            mintHtmlUtil.dlg({
                divId: 'trendStrengthDivNIFTY',
                rank: miSrnUtils.grv(allSectorDataClone[baseSector]["techStrength"]),
                title: 'Technical Strength Daily',
                leftLabel: 'Sell',
                rightLabel: 'Buy',
                width: 240,
                height: 8
            });
        }

    }

    function paintSectorTableContainer() {
        let sectorContainer = document.getElementById(sectorTableContainerId);

        sectorContainer.classList.add("card");

        let html = "";
        html += `<div class="card-header d-flex justify-content-between align-items-center">`;
        html += `       <h5>Sector Comparison</h5>`;
        html += `       <p style="font-size: 12px; margin-bottom: 0;">`
        html += `           <span style="color: red;">*</span>`
        html += `           Technicals based on ${allSectorDataClone["displayFreq"]} tick`
        html += `       </p>`
        html += `</div>`;

        // Radio buttons
        html += `<div class="card-body p-3" style="max-height: 60vh;">`;
        html += `   <div>`;
        html += `       <div class="mb-3 btn-group" role="group">`;
        html += `           <input type="radio" class="btn-check" name="btnradio" id="outPerformingSectors" autocomplete="off" checked>`;
        html += `           <label class="btn btn-outline-secondary" for="outPerformingSectors" onclick="miSrn.ust('op')">Out Performing</label>`;
        html += `           <input type="radio" class="btn-check" name="btnradio" id="underPerformingSectors" autocomplete="off">`;
        html += `           <label class="btn btn-outline-secondary" for="underPerformingSectors" onclick="miSrn.ust('up')">Under Performing</label>`;
        html += `       </div>`;
        html += `   </div>`;
        html += `   <div id="${sectorTableId}">`;
        html += `   </div>`;

        html += `</div>`;

        sectorContainer.innerHTML = html;
        updateSectorTable('op');
    }


    function updateSectorTable(secType) {

        let sectorTable = document.getElementById(sectorTableId);

        let html = "";
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
                isIdxBased = true;
            }
        }

        html += `<div style="max-height: 50vh; overflow: auto;">`;
        html += `<table class="table table-striped">`
        html += `   <thead style="font-size: 14px;">`
        html += `       <tr>`
        html += `           <th>Name</th>`
        if (isIdxBased) {
            html += `           <th>Relative Returns wrt NIFTY</th>`
        }
        html += `           <th>`
        html += `               Mkt Cap Change`
        html += `                <br>`
        html += `               <span style="font-weight: 400">`;
        html += `                   (in Cr.)`;
        html += `               </span>`;
        html += `           </th>`
        html += `           <th>`
        html += `               Mkt Cap Change %`
        html += `           </th>`
        if (isIdxBased) {
            html += `           <th>Period Return %</th>`
        }
        html += `           <th> Out Performing Stocks</th >`
        html += `           <th> Under Performing Stocks</th>`

        html += `           <th> TSR Bullish Stocks</th>`
        html += `           <th> TSR Bearish Stocks</th >`
        html += `           <th>`
        html += `               % of Stocks above EMA ${allSectorDataClone["ma1"]}`
        html += `           </th>`

        html += `           <th>`
        html += `               % of Stocks above EMA ${allSectorDataClone["ma2"]}`
        html += `           </th>`
        html += `           <th>`
        html += `               % of Stocks with ADX > 20`
        html += `           </th>`
        html += `           <th>`
        html += `               % of Stocks with RSI > 50 `
        html += `           </th>`
        html += `           <th>`
        html += `               % of Stocks with MACD > 0 `
        html += `           </th>`
        html += `           <th>`
        html += `               % of Stocks with MACD > Signal `
        html += `           </th>`
        html += `         </tr>`;
        html += `   </thead>`;
        html += `<tbody>`;

        // sortSectors(sectors);


        if (sectors.length == 0) {

            html += `<tr>`;
            html += `   <td colspan="13" class="text-center">`;
            html += `       No records`;
            html += `   </td>`;
            html += `</tr>`;
        }
        else {
            for (let i = 0; i < sectors.length; i++) {

                if ((secType == "op" && (sectors[i]["mcChg"] >= 0 || sectors[i]["mcChgPc"] >= 0)) || (secType == "up")) {

                    html += `<tr>`
                    html += `   <td>`
                    if (miSrnUtils.pd(sectors[i]["secIdx"]) && sectors[i]["secIdx"]) {
                        // paintChart(secType, secId, stockListType, stockIdx, all, chartType, scrollTo) 
                        html += `       <div style="cursor: pointer;" 
                                            onclick="miSrn.ssc('${secType}', ${i}); 
                                                miSrn.pc('${secType}', '${i}', 'sectorList', '${sectors[i]["code"]}', false, 'inline', false);" class="link-primary">`
                    } else {
                        html += `       <div style="cursor: pointer;" onclick="miSrn.ssc('${secType}', ${i}); miSrn.ec();" class="link-primary" >`
                    }
                    html += sectors[i].name;
                    html += `       </div`
                    html += `   </td>`;
                    if (isIdxBased) {
                        html += `   <td>`;
                        html += miSrnUtils.gcv(sectors[i]["vsNifty"]);
                        html += `   </td>`;
                    }
                    html += `   <td>`;
                    html += miSrnUtils.gcv(sectors[i]["mcChg"]);
                    html += `   </td>`;
                    html += `   <td>`;
                    html += miSrnUtils.gcv(sectors[i]["mcChgPc"]);
                    html += `   </td>`;
                    if (isIdxBased) {
                        html += `   <td>`;
                        html += miSrnUtils.gcv(sectors[i]["periodReturn"]);
                        html += `   </td>`;
                    }
                    html += `   <td>`;
                    html += miSrnUtils.gcv(sectors[i]["opEq"]);
                    html += `   </td>`;
                    html += `   <td>`;
                    html += miSrnUtils.gcv(sectors[i]["upEq"]);
                    html += `   </td>`;
                    html += `   <td>`;
                    html += miSrnUtils.gcv(sectors[i]["tsrBullish"]);
                    html += `   </td>`;
                    html += `   <td>`;
                    html += miSrnUtils.gcv(sectors[i]["tsrBearish"]);
                    html += `   </td>`;
                    html += `   <td>`;
                    html += miSrnUtils.gcv(sectors[i]["ma1"] * 100);
                    html += `   </td>`;
                    html += `   <td>`;
                    html += miSrnUtils.gcv(sectors[i]["ma2"] * 100);
                    html += `   </td>`;
                    html += `   <td>`;
                    html += miSrnUtils.gcv(sectors[i]["adx"] * 100);
                    html += `   </td>`;
                    html += `   <td>`;
                    html += miSrnUtils.gcv(sectors[i]["rsi"] * 100);
                    html += `   </td>`;
                    html += `   <td>`;
                    html += miSrnUtils.gcv(sectors[i]["macds"] * 100);
                    html += `   </td>`;
                    html += `   <td>`;
                    html += miSrnUtils.gcv(sectors[i]["macd0"] * 100);
                    html += `   </td>`;
                    html += `</tr>`;
                }
            }
        }


        html += `</tbody>`
        html += `</table>`;
        html += `</div>`;


        html += `<div class="d-flex justify-content-between flex-column flex-md-row">`

        // TODO hack recheck later
        if (isIdxBased) {
            html += `   <div>`
            html += `       View Chart `;
            // paintChart(secType, secId, stockListType, stockIdx, all, chartType, scrollTo) 

            html += `       <a style="color:#04a1f4;cursor:pointer" onclick="miSrn.pc('${secType}', 0, 'sectorList', '', true, 'inline', true);" oncontextmenu="return false;"> <span class="fas fa-chart-line"></span> Inline </a>`
            html += `       &emsp;|&emsp;`;
            html += `       <a style="color:#04a1f4;cursor:pointer" onclick="miSrn.pc('${secType}', 0, 'sectorList', '', true, 'tile', true);" oncontextmenu="return false;">  <span class="fas fa-chart-line"></span> Tile  </a>`
            html += `   </div>`
        }
        html += `           <div>`
        html += `                   <p style="font-size: 12px; margin-bottom: 0;">`
        html += `                       <span style="color: red;">*</span>`
        html += `                           Sector / Index rating utilizes only Stocks beyond certain Market Capital`
        html += `                   </p>`
        html += `           </div>`


        html += `</div>`


        sectorTable.innerHTML = html;


    }

    function showSectorCard(secType, secId) {

        let sectorContainer = document.getElementById(sectorCardContainerId);

        // clone data object
        let sectors = [...allSectorDataClone[secType + "Sec"]];

        // let sectorInFocus = sectorData[sec][secId];

        let html = "";

        // sector menu code begins

        html += `<div id="sectorMenuContainer" style="display: flex;" class="owl-nav align-items-center justify-content-center my-3">`

        html += `   <button type="button" role="presentation" class="owl-prev btn sectorMenuCarousalPrev">`
        html += `       <span aria-label="Previous">`
        html += `           <i class="fas fa-angle-left"></i>`
        html += `       </span>`
        html += `   </button>`

        html += `   <div id="sectorMenuCarousal" class="w-75 owl-carousel owl-theme" >`

        for (let i = 0; i < sectors.length; i++) {
            html += `   <div class="item p-2">`;
            html += `       <a href="#${i}" onclick="miSrn.ec()">`;
            html += `           <div class="card flex-row justify-content-around shadow-sm p-2">`;
            html += `               <span style="font-weight: 500;">`
            html += sectors[i].name;
            html += `               </span>`
            html += `               <span style="color: gray; white-space: nowrap;">`

            if (i == 0) {
                html += `               1 <sup> st</sup >`;
            }
            else if (i == 1) {
                html += `               2 <sup> nd</sup >`;
            }
            else if (i == 2) {
                html += `               3 <sup> rd</sup >`;
            }
            else {
                html += `               ${i + 1} <sup>th</sup >`;
            }

            html += `               </span>`
            html += `           </div>`
            html += `       </a>`
            html += `   </div>`
        }

        html += `   </div>`;

        html += `   <button type = "button" role = "presentation" class="owl-next btn sectorMenuCarousalNext">`;
        html += `       <span aria-label="Next">`;
        html += `           <i class="fas fa-angle-right"></i>`;
        html += `       </span>`;
        html += `   </button>`;
        html += `</div>`;

        // sector menu code ends

        // --------------------------------------------------------------------

        // sector card carousal code starts

        html += `<div id="sectorCardsCarousal" class="owl-carousel owl-theme mx-auto">`;
        // selected sector first
        html += paintSectorCard(secType, sectors, secId);


        for (let i = 0; i < sectors.length; i++) {
            if (secId != i) {
                html += paintSectorCard(secType, sectors, i);
            }
        }
        html += `</div>`;

        sectorContainer.innerHTML = html;

        sectorContainer.scrollIntoView();

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

        initializeCarousal();
    };

    function initializeCarousal() {

        // sector Menu navigation code starts here

        let sectorNav = {
            loop: true,
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

        $("#sectorMenuCarousal").owlCarousel(sectorNav);

        $('.sectorMenuCarousalPrev').click(function () {
            $("#sectorMenuCarousal").trigger('prev.owl.carousel', [300]);
        });
        $('.sectorMenuCarousalNext').click(function () {
            $("#sectorMenuCarousal").trigger('next.owl.carousel', [300]); // [300] - optional speed parameter
        });

        // sector Menu navigation code ends here

        var sectorCards = {
            loop: false,
            dots: false,
            nav: false,
            responsive: {
                0: {
                    items: 1
                }
            },
        }

        $("#sectorCardsCarousal").owlCarousel(sectorCards);

        let chart = document.getElementById(chartContainerId);

        // * erase chart when sector card is dragged
        $("#sectorCardsCarousal").on('dragged.owl.carousel', function (event) {
            chart.innerHTML = '';
            chart.classList.remove("card");
        });

        // * go to prev sector card and erase chart
        $('.sectorCardsCarousalPrev').click(function () {
            $("#sectorCardsCarousal").trigger('prev.owl.carousel');
            chart.innerHTML = '';
            chart.classList.remove("card");
        });

        // * go to next sector card and erase chart
        $('.sectorCardsCarousalNext').click(function () {
            $("#sectorCardsCarousal").trigger('next.owl.carousel'); // [300] - optional speed parameter
            chart.innerHTML = '';
            chart.classList.remove("card");
        });

        var periodicReturns = {
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
                    items: 3
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
    };

    function paintSectorCard(secType, sectors, i) {
        let html = "";

        // sector card header starts

        html += `   <div class="container-md" data-hash="${i}">`;
        html += `       <div class="card shadow">`;

        html += `           <div class="card-header d-flex justify-content-between align-items-center" style="background: linear-gradient(135deg, #dbeafe, #f1f5ff);">`;
        html += `               <div style="cursor: pointer" class="link-primary sectorCardsCarousalPrev">`
        html += `                   <i class="fas fa-arrow-left"></i>`
        html += `                       &nbsp;`
        html += `                       Prev`
        html += `               </div>`

        html += `               <h5 class="card-title" style="font-weight: 600;">`
        html += `               <p style="margin: 0;">`
        html += sectors[i].name;
        html += `                   <b>`
        if (i == 0) {
            html += `               <sup style="color: gray;"> 1 <sup>st</sup></sup >`;
        }
        else if (i == 1) {
            html += `              <sup style="color: gray;"> 2 <sup>nd</sup></sup >`;
        }
        else if (i == 2) {
            html += `               <sup style="color: gray;">3 <sup>rd</sup></sup >`;
        }
        else {
            html += `               <sup style="color: gray;">${i + 1} <sup>th</sup></sup >`;
        }
        html += `                   </b>`
        html += `               </p>`
        html += `               </h5>`



        html += `               <div style="cursor: pointer" class="link-primary sectorCardsCarousalNext">`
        html += `                       Next`
        html += `                       &nbsp;`
        html += `                   <i class="fas fa-arrow-right"></i>`
        html += `               </div>`
        html += `           </div>`;

        // sector card header ends


        // ---------------------------------------------------------------------

        // sector card body starts

        let sectorAnalysisUrl = mintJsUtil.getRootUrl() + "/Screener/Markets/" + sectors[i].url;
        if (!sectors[i]["secIdx"]) {
            sectorAnalysisUrl += "/All"
        }
        html += `           <div class="card-body">`;
        html += `               <div class="row text-center">`;
        html += `                   <h6 class="">`;
        html += `                       <a href="${sectorAnalysisUrl}" target="_blank">`
        html += `                           View in Depth Analysis`
        html += `                           <i class="fas fa-external-link-square-alt"></i>`
        html += `                       </a>`
        html += `                   </h6>`
        html += `               </div>`;

        html += `           <div class="row">`;

        if (miSrnUtils.pd(sectors[i].secIdx) && sectors[i].secIdx) {
            html += `               <div class="col col-md-6 p-3" style='align-items: stretch;'>`
            html += `                   <section class="mb-4">`
            html += `                       <div class="mb-3 d-flex justify-content-between" style="border-bottom: 1px solid lightgrey;">`
            html += `                           <h6>Highlights</h6>`
            html += `                       </div>`
            html += `                       <div class="d-flex justify-content-between mb-3">`
            html += `                           <div class="w-100 d-flex flex-column">`
            html += `                               <span style="font-weight: 100;">`
            html += `                                   Relative Returns`
            html += `                               </span>`
            html += `                               <h4 style="color: black; white-space: nowrap;">${miSrnUtils.grv(sectors[i]["vsNifty"])}</h4>`
            html += `                           </div>`
            html += `                           <div class="w-100 d-flex flex-column">`
            html += `                               <span style="font-weight: 100;">Market Cap Change</span>`
            html += `                               <h4 style="color: black; white-space: nowrap;">${miSrnUtils.grv(sectors[i]["mcChg"])}`
            html += `                               </h4>`
            html += `                           </div > `
            html += `                       </div>`;
            html += `                       <div class="d-flex justify-content-between mb-3" >`
            html += `                           <div class="w-100 d-flex flex-column">`
            html += `                               <span style="font-weight: 100;">`
            html += `                                   Outperformers`
            html += `                                   <i class="fas fa-long-arrow-alt-up"></i>`
            html += `                               </span>`
            html += `                               <h4>${sectors[i]["opEq"]}</h4>`;
            html += `                           </div>`;
            html += `                           <div class="w-100 d-flex flex-column">`;
            html += `                               <span style="font-weight: 100;">`;
            html += `                                   Underperformers`;
            html += `                                   <i class="fas fa-long-arrow-alt-down"></i>`
            html += `                               </span>`;
            html += `                               <h4>${sectors[i]["upEq"]}</h4>`
            html += `                           </div>`
            html += `                       </div>`
            html += `                       <div class="d-flex justify-content-between mb-3">`
            html += `                           <div class="w-100 d-flex flex-column">`
            html += `                               <span style="font-weight: 100;">Price</span>`
            html += `                                   <h4 style="color: black; white-space: nowrap;">`
            html += miSrnUtils.grv(sectors[i]["idxVals"]["price"]);
            html += `                                   </h4>`
            html += `                           </div>`
            html += `                           <div class="w-100 d-flex flex-column">`
            html += `                               <span style="font-weight: 100;">Price Change %</span>`
            html += `                                   <h4 style="color: black; white-space: nowrap;">`
            html += miSrnUtils.grv(sectors[i]["idxVals"]["priceChange"]) + " %";
            html += `                                   </h4>`
            html += `                               </div>`
            html += `                       </div>`
            html += `                   </section>`;

            html += `           <section class="mb-4">`
            html += `               <div class="mb-3" style="border-bottom: 1px solid lightgrey;">`
            html += `                   <h6>${allSectorDataClone["rtnFreq"]} Returns</h6>`
            html += `               </div>`
            html += `               <div class="owl-carousel owl-theme periodicReturns">`;

            for (let j = 0; j < sectors[i]["idxVals"]["rtnList"].length; j++) {
                html += `               <div class="card d-flex flex-column p-3">`
                // html += `                   <h6>`
                // html += "P";
                // html += `                   </h6>`
                html += `                   <h5 style="color: black; white-space: nowrap;">`
                html += miSrnUtils.grv(sectors[i]["idxVals"]["rtnList"][j]["rtn"]);
                html += `                   </h5>`
                html += `               </div>`;
            };
            html += `               </div>`
            html += `           </section>`;

            /*
                    // if (miSrnUtils.pd(sectors["NIFTY"])) {
                    //     html += `           <section class="mb-4">`;
            
                    //     html += `               <div class="mb-3" style="border-bottom: 1px solid lightgrey;">`
                    //     html += `                   <h6>Analysis</h6>`;
                    //     html += `               </div>`;
                    //     //         // "vsNifty": 5.060425853536746
                    //     html += `               <p>`;
                    //     html += `                   The <b>${sectors[i]["name"]}</b> Sector is ahead of <b>NIFTY</b> by `;
                    //     html += `                   <b style="color: black;">${sectors[i]["vsNifty"]} %</b>`;
                    //     html += `               </p>`;
            
                    //     html += `           </section>`;
                    // }
                    */

            html += `           <section id="tsrStrengthIndex">`;

            html += `               <div class="mb-3" style="border-bottom: 1px solid lightgrey;">`
            html += `                   <h6>Technical Strength Index</h6>`
            html += `               </div>`

            html += `                       <div class="col-12 col-md-6 d-flex flex-column justify-content-center w-100 my-5">`
            html += `                           <div id='trendStrengthDiv${sectors[i]["id"]}' class="d-flex justify-content-center"></div>`
            html += `                               <div class="tsr_strength_values_container">`

            html += `                               <div class="d-flex justify-content-center" id="strRank">`
            html += `                                   <span style="font-size: 14px;"> ${sectors[i]["idxVals"]["techPosi"]} </span>`
            html += `                               </div>`
            html += `                           </div>`
            html += `                       </div>`

            html += `           </section>`;

            html += `       </div>`;

            html += `       <div class="col col-md-6 p-3">`;

            html += `           <section class="mb-4">`;
            html += `               <div class="mb-3 d-flex justify-content-between align-items-center" style="border-bottom: 1px solid lightgrey;">`
            html += `                   <h6>Technicals</h6>`
            html += `                   <p style="font-size: 12px; margin-bottom: 0;">`
            html += `                       <span style="color: red;">*</span>`
            html += `                           Technicals based on ${allSectorDataClone["displayFreq"]} tick`
            html += `                   </p>`
            html += `               </div>`;
            html += `               <div class="owl-carousel owl-theme technicals">`;

            let keys = Object.keys(sectors[i]["idxVals"]);

            for (let j = 0; j < keys.length; j++) {
                if (keys[j] == "ma1" || keys[j] == "ma2" || keys[j] == "rsi" || keys[j] == "macd" || keys[j] == "signal" || keys[j] == "st") {
                    html += `                   <div class="card d-flex flex-column p-3">`;
                    if (keys[j] == "ma1" || keys[j] == "ma2") {
                        if (keys[j] == "ma1") {
                            html += `                       <h6>EMA ${allSectorDataClone["ma1"]}</h6>`;
                        } else if (keys[j] == "ma2") {
                            html += `                       <h6>EMA ${allSectorDataClone["ma2"]}</h6>`;
                        }
                    }
                    else {
                        html += `                       <h6>${keys[j].toUpperCase()}</h6>`;
                    }
                    html += `                       <h4 style="color: orange; white-space: nowrap;">`;
                    html += miSrnUtils.grv(sectors[i]["idxVals"][keys[j]]);
                    html += `                       </h4>`;
                    //             // html += `                       <p style="color: orange;  margin: 0;">Neutral</p>`
                    html += `                   </div>`;
                }
            }

            html += `               </div>`;
            html += `           </section>`;
        }

        // section starts
        html += `               <section>`
        html += `                   <div class="mb-3" style="border-bottom: 1px solid lightgrey;">`
        html += `                       <h6>Stocks</h6>`
        html += `                   </div>`

        if (miSrnUtils.pd(sectors[i].secIdx) && sectors[i].secIdx) {
            html += `               <div class="text-center">`
            html += `                   <div class="w-100 p-3 text-center">`
        }
        else {
            html += `               <div class="text-center row">`
            html += `                   <div class="col-12 col-md-6 p-3 text-center"  style="overflow: auto">`
        }

        // Mini OP Stock table 
        html += `                           <b>Out Performing</b>`
        html += `                           <table class="table table-striped">`
        html += `                               <thead>`;
        html += `                                   <tr>`;
        html += `                                       <th scope="col">Name</th>`
        html += `                                       <th scope="col">vs NIFTY</th>`
        if (miSrnUtils.pd(sectors[i].secIdx) && sectors[i].secIdx) {

            html += `                                       <th scope="col">vs ${sectors[i].name}</th>`
        }
        html += `                                       <th scope="col">Chart</th>`
        html += `                                   </tr>`;
        html += `                               </thead>`;
        html += `                               <tbody>`;

        let stockList = sectors[i]["opEqList"];

        if (stockList.length == 0) {

            html += `<tr>`;

            if (miSrnUtils.pd(sectors[i].secIdx) && sectors[i].secIdx) {

                html += `   <td colspan="4" class="text-center">`;
            }
            else {
                html += `   <td colspan="3" class="text-center">`;

            } html += `       No records`;
            html += `   </td>`;
            html += `</tr>`;
        }
        else {
            for (let j = 0; j < stockList.length; j++) {


                if (j > 2) {
                    break;
                }

                html += `                               <tr>`;
                // paintChart(secType, secId, stockListType, stockIdx, all, chartType, scrollTo) 
                html += `<td>
                           <a class="link-primary" onclick="miSrn.pss('${secType}', 'opEq', ${i}, '${stockList[j]["code"]}', true); 
                                    miSrn.pc('${secType}', ${i}, 'opEqList', '${stockList[j]["code"]}', false, 'inline', false);"> ${miSrnUtils.grv(stockList[j]["name"])} </a>
                    </td>`;
                html += `                                   <td>${miSrnUtils.grv(sectors[i].opEqList[j]["vsNifty"])}</td>`;
                if (miSrnUtils.pd(sectors[i].secIdx) && sectors[i].secIdx) {

                    html += `                                   <td>${miSrnUtils.grv(sectors[i].opEqList[j]["vsIdx"])}</td>`;
                }
                html += `                                   <td>`
                html += `                                       <a onclick="miSrn.pc('${secType}', ${i}, 'opEqList', '${stockList[j]["code"]}', false, 'inline', true)">`
                html += `                                           <i style="color:grey; font-size:12pt;" class="fa fa-chart-line">`
                html += `                                           </i>`
                html += `                                       </a>`;
                html += `                                   </td>`;
                html += `                               </tr>`;

            }

        }
        html += `                               </tbody>`;
        html += `                           </table>`;

        if (stockList.length > 0) {
            html += `                           <div>`
            html += `                               View Chart `;
            html += `                                   <a style="color:#04a1f4;cursor:pointer" onclick=" miSrn.pss('${secType}', 'opEq', ${i}, '', false);miSrn.pc('${secType}', ${i}, 'opEqList', '', true, 'inline', true);" oncontextmenu="return false;"> <span class="fas fa-chart-line"></span> Inline </a>`
            html += `&emsp;|&emsp;`;
            html += `                                   <a style="color:#04a1f4;cursor:pointer" onclick=" miSrn.pss('${secType}', 'opEq', ${i}, '', false);miSrn.pc('${secType}', ${i}, 'opEqList', '', true, 'tile', true);" oncontextmenu="return false;">  <span class="fas fa-chart-line"></span> Tile  </a>`
            html += `                           </div>`
        }

        html += `                       </div>`

        if (miSrnUtils.pd(sectors[i].secIdx) && sectors[i].secIdx) {
            html += `                   <div class="w-100 p-3 text-center">`
        }
        else {
            html += `                   <div class="col-12 col-md-6 p-3 text-center" style="overflow: auto">`
        }

        // Mini UP Stock table 
        html += `                           <b>Under Performing</b>`
        html += `                           <table class="table table-striped">`
        html += `                               <thead>`
        html += `                                   <tr>`
        html += `                                       <th scope="col">Name</th>`
        html += `                                       <th scope="col">vs NIFTY</th>`
        if (miSrnUtils.pd(sectors[i].secIdx) && sectors[i].secIdx) {
            html += `                                       <th scope="col">vs ${sectors[i].name}</th>`
        }
        html += `                                       <th scope="col">Chart</th>`
        html += `                                   </tr>`
        html += `                               </thead>`
        html += `                               <tbody>`;

        stockList = sectors[i]["upEqList"];
        if (stockList.length == 0) {

            html += `<tr>`;
            if (miSrnUtils.pd(sectors[i].secIdx) && sectors[i].secIdx) {

                html += `   <td colspan="4" class="text-center">`;
            }
            else {
                html += `   <td colspan="3" class="text-center">`;

            }
            html += `       No records`;
            html += `   </td>`;
            html += `</tr>`;
        }
        else {
            for (let j = 0; j < stockList.length; j++) {

                if (j > 2) {
                    break;
                }

                html += `                               <tr>`;
                html += `                                   <td>
                                                            <a class="link-primary" onclick="miSrn.pss('${secType}', 'upEq', ${i}, '${stockList[j]["code"]}', true); miSrn.pc('${secType}', ${i}, 'upEqList', '${stockList[j]["code"]}', false, 'inline', false);"> ${miSrnUtils.grv(stockList[j]["name"])} </a>
                                                        </td>`;
                html += `                                   <td>${miSrnUtils.grv(sectors[i].upEqList[j]["vsNifty"])}</td>`;
                if (miSrnUtils.pd(sectors[i].secIdx) && sectors[i].secIdx) {

                    html += `                                   <td>${miSrnUtils.grv(sectors[i].upEqList[j]["vsIdx"])}</td>`;
                }
                html += `                                   <td>`
                html += `                                       <a onclick="miSrn.pc('${secType}', ${i}, 'upEqList', '${stockList[j]["code"]}', false, 'inline', true)">`
                html += `                                           <i style="color:grey; font-size:12pt"; class="fa fa-chart-line">`
                html += `                                           </i>`
                html += `                                       </a>`;
                html += `                                   </td>`;
                html += `                               </tr>`;
            }

        }
        html += `                               </tbody>`;
        html += `                           </table>`;

        if (stockList.length > 0) {

            html += `                           <div>`
            html += `                               View Chart `;
            html += `                                   <a style="color:#04a1f4;cursor:pointer" onclick="miSrn.pss('${secType}', 'upEq', ${i}, '', false);miSrn.pc('${secType}', ${i}, 'upEqList', '', true, 'inline', true); " oncontextmenu="return false;"> <span class="fas fa-chart-line"></span> Inline </a>`
            html += `&emsp;|&emsp;`;
            html += `                                   <a style="color:#04a1f4;cursor:pointer" onclick="miSrn.pss('${secType}', 'upEq', ${i}, '', false);miSrn.pc('${secType}', ${i}, 'upEqList', '', true, 'tile', false);" oncontextmenu="return false;">  <span class="fas fa-chart-line"></span> Tile  </a>`
            html += `                           </div>`
        }
        html += `                       </div>`;


        if (secType == "op" && allSectorDataClone[secType + "Sec"].length > 0) {
            if (allSectorDataClone[secType + "Sec"][i]["opEqList"].length > 0) {
                html += `                       <a id="${stockTableBtnId + i}" style="color: var(--primary-color,#006aff); cursor: pointer;" onclick="miSrn.psct('op', 'opEq', ${i}, true)">`;
            }
            else {
                html += `                       <a id="${stockTableBtnId + i}" style="color: var(--primary-color,#006aff); cursor: pointer;" onclick="miSrn.psct('op', 'upEq', ${i}, true)">`;
            }
        }
        else {
            if (allSectorDataClone[secType + "Sec"][i]["opEqList"].length > 0) {
                html += `                       <a id="${stockTableBtnId + i}" style="color: var(--primary-color,#006aff); cursor: pointer;" onclick="miSrn.psct('up', 'opEq', ${i}, true)">`;
            }
            else {
                html += `                       <a id="${stockTableBtnId + i}" style="color: var(--primary-color,#006aff); cursor: pointer;" onclick="miSrn.psct('up', 'upEq', ${i}, true)">`;
            }
        }

        html += `                               Show All`;
        html += `                       </a>`;

        html += `                   </div>`;

        // section ends
        html += `               </section>`;

        // row ends
        html += `               </div> `;
        html += `   <div class="d-flex flex-column text-end">`
        html += `                   <p style="font-size: 12px; margin-bottom: 0;">`
        html += `                       <span style="color: red;">*</span>`
        html += `                           Sector / Index rating utilizes only Stocks beyond certain Market Capital`
        html += `                   </p>`
        html += `                   <p style="font-size: 12px; margin-bottom: 0;">`
        html += `                       <span style="color: red;">*</span>`
        html += `                           Show all - includes Stocks across all Market Cap`
        html += `                   </p>`
        html += `   </div>`

        html += `<div class="${stockTableContainerId + i} row"  style="overflow: auto">`;

        html += '</div>';

        html += `<div class="${stockContainerId + i} row container" >`;

        html += '</div>';

        html += `           </div> `;
        html += `       </div>`;
        html += `   </div> `;
        if (miSrnUtils.pd(sectors[i].secIdx) && sectors[i].secIdx) {
            html += `</div>`;
        }

        if (sectors[i]["secIdx"]) {
            tsrStrengthIndexList[sectors[i]["id"]] = {
                divId: "trendStrengthDiv" + sectors[i]["id"],
                rank: miSrnUtils.grv(sectors[i]["idxVals"]["techStrength"])
            }
        }

        return html;
    }

    function processStockComparisonTable(secType, stockType, secId, show) {

        let containers = document.getElementsByClassName(stockTableContainerId + secId);

        let stockTableBtn = document.getElementById(stockTableBtnId + secId);
        stockTableBtn.style.display = "none";

        if (!show) {
            stockTableBtn.style.display = "block";

            for (let i = 0; i < containers.length; i++) {
                containers[i].innerHTML = "";
            }

            return;
        }


        let sectorTypeSelect = document.getElementById(sectorTypeSelectId);

        let durationSelect = document.getElementById(sectorDurationSelectId);

        let sectors = [...allSectorDataClone[secType + "Sec"]];

        let sector = sectors[secId];


        if (miSrnUtils.pd(sectorTypeSelect) && miSrnUtils.pd(durationSelect)) {
            let sectorType = sectorTypeSelect.value;
            let duration = durationSelect.value;

            let url = mintJsUtil.getRootUrl() + `/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=one&code=${sector["uriCode"]}`;
            // let url = "https://www.tsrbt1.com/rt" + `/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=one&code=${sector["uriCode"]}`;

            // avoiding multiple API calls for same sector
            if (!(miSrnUtils.pd(sectorData) && sectorData.secType == secType && sectorData.secId == secId && sectorData["statusCode"] == "success")) {

                miSrnUtils.gd(url).then(data => {

                    sectorData = data;
                    sectorData["secType"] = secType;
                    sectorData["secId"] = secId;

                    if (sectorData["statusCode"] == "success") {
                        paintStockComparisonTable(containers, sector, secType, stockType, secId);
                    }

                });
            }
            else {
                paintStockComparisonTable(containers, sector, secType, stockType, secId);
            }
        }

    };

    function paintStockComparisonTable(containers, sector, secType, stockType, secId) {


        let html = "";

        // Radio buttons
        html += ``
        html += `   <div>`;
        html += `       <div class="mb-3 btn-group" role="group">`;

        if (stockType == "opEq") {
            html += `       <input type="radio" class="btn-check" name="sector${secId}Stocks" id="outPerformingStocks${secId}" autocomplete="off" checked>`;
        }
        else {
            html += `       <input type="radio" class="btn-check" name="sector${secId}Stocks" id="outPerformingStocks${secId}" autocomplete="off">`;
        }

        html += `           <label class="btn btn-outline-secondary" for="outPerformingStocks${secId}" onclick="miSrn.psct('${secType}','opEq', ${secId}, true)">Out Performing</label>`;

        if (stockType == "upEq") {
            html += `       <input type="radio" class="btn-check" name="sector${secId}Stocks" id="underPerformingStocks${secId}" autocomplete="off" checked>`;
        }
        else {
            html += `       <input type="radio" class="btn-check" name="sector${secId}Stocks" id="underPerformingStocks${secId}" autocomplete="off">`;
        }

        html += `           <label class="btn btn-outline-secondary" for="underPerformingStocks${secId}" onclick="miSrn.psct('${secType}','upEq', ${secId}, true)">Under Performing</label>`;

        html += `       </div>`;
        html += `   </div>`;



        // table
        let tableFields = ["Name", "Price", "Price Chg %", "vs Nifty", "Period Return %", `EMA ${allSectorDataClone["ma1"]}`, `EMA ${allSectorDataClone["ma2"]}`];

        let isIdxBased = false;
        if (miSrnUtils.pd(sector.secIdx) && sector.secIdx) {
            isIdxBased = true;
            tableFields.splice(4, 0, `vs ${sector.name}`);
        }

        html += `                             <table class="table table-striped">`
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
            html += `<tr>`;
            html += `   <td colspan="${tableFields.length}"  class="text-center">`
            html += `       No records`
            html += `   </td>`
            html += `</tr>`;

        }
        else {
            for (let i = 0; i < stockList.length; i++) {



                html += `<tr>`;
                html += `   <td>`

                html += `       <a class="link-primary" 
                                onclick="miSrn.pss('${secType}', '${stockType}', ${secId}, '${stockList[i]["code"]}', true);  
                                miSrn.pc('${secType}', ${secId}, '${stockType}List', '${stockList[i]["code"]}', false, 'inline', false);"> ${stockList[i]["name"]} </a>`;
                html += `</td>`;
                html += `   <td>${miSrnUtils.grv(stockList[i]["price"])}</td>`;
                html += `   <td>${miSrnUtils.grv(stockList[i]["priceChange"])}</td>`;
                html += `   <td>${miSrnUtils.grv(stockList[i]["vsNifty"])}</td>`;
                if (isIdxBased) {
                    html += `   <td>${miSrnUtils.grv(stockList[i]["vsIdx"])}</td>`;
                }
                html += `   <td>${miSrnUtils.grv(stockList[i]["periodReturn"])}</td>`;
                html += `   <td>${miSrnUtils.grv(stockList[i]["eqVals"]["ma1"])}</td>`;
                html += `   <td>${miSrnUtils.grv(stockList[i]["eqVals"]["ma2"])}</td>`;

                html += `</tr>`;
            }
        }

        html += `                               </tbody>`;
        html += `                             </table>`;

        html += `                   <div class="text-center">`
        html += `                       <a style="color: var(--primary-color,#006aff); cursor: pointer;" onclick="miSrn.psct('${secType}', '${stockType}', ${secId}, false)">`;
        html += `                               Show less`;
        html += `                       </a>`;
        html += `                   </div>`;

        for (let i = 0; i < containers.length; i++) {
            containers[i].classList.add("p-3");
            containers[i].innerHTML = html;
        }

        containers[0].scrollIntoView();
    }

    function processStockSection(secType, stockType, secId, stockCode, show) {


        let stockContainers = document.getElementsByClassName(stockContainerId + secId);


        if (!show) {
            for (let i = 0; i < stockContainers.length; i++) {
                stockContainers[i].innerHTML = "";
            }
            return;
        }

        let sectorTypeSelect = document.getElementById(sectorTypeSelectId);

        let durationSelect = document.getElementById(sectorDurationSelectId);


        if (miSrnUtils.pd(sectorTypeSelect) && miSrnUtils.pd(durationSelect)) {
            let sectorType = sectorTypeSelect.value;
            let duration = durationSelect.value;

            let sectors = [...allSectorDataClone[secType + "Sec"]];

            let sector = sectors[secId];

            let url = mintJsUtil.getRootUrl() + `/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=one&code=${sector["uriCode"]}`;
            // let url = "https://www.tsrbt1.com/rt" + `/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=one&code=${sector["uriCode"]}`;

            // avoiding multiple API calls for same sector
            if (!(miSrnUtils.pd(sectorData) && sectorData.secType == secType && sectorData.secId == secId && sectorData["statusCode"] == "success")) {
                miSrnUtils.gd(url).then(data => {

                    if (data.statusCode == "success") {
                        sectorData = data;
                        sectorData["secType"] = secType;
                        sectorData["secId"] = secId;

                        paintStockSection(secType, sector, stockContainers, stockType, secId, stockCode);
                    }

                });
            } else {
                paintStockSection(secType, sector, stockContainers, stockType, secId, stockCode);
            }
        };
    }

    function paintStockSection(secType, sector, stockContainers, stockType, secId, stockCode) {

        // showSectorCard(secType, secId);

        let stockList = sectorData[stockType + "List"];
        // let stock = stockList[stockId];
        let stock = mintJsUtil.getObjFrmArrByField(stockList, "code", stockCode)


        for (let i = 0; i < stockContainers.length; i++) {

            stockContainers[i].classList.add("p-3");

            let html = "";

            let techUrl = mintJsUtil.getRootUrl() + '/Stock/' + stock["id"] + "/BirdsEyeView";
            let fundaUrl = mintJsUtil.getRootUrl() + '/Stock/' + stock["id"] + "/FundamentalAnalysis"

            html += `                   <div class="row">`
            html += `                       <div class="mb-3 text-center d-flex justify-content-between flex-column flex-md-row" style="border-bottom: 1px solid lightgrey;">`
            html += `                           <h4>`
            html += `                               ${stock["name"]}`
            html += `                           </h4>`
            html += `                           <div class="text-center">`
            html += `                               View Analysis`
            html += `                               <a href="${techUrl}" target="_blank" class="text-primary" oncontextmenu="return false;">`
            html += `                                   <span class="fas fa-chart-line"></span> Tech </a> |`
            html += `                               <a href="${fundaUrl}" target="_blank" class="text-primary" oncontextmenu="return false;">`
            html += `                                   <span class="fas fa-chart-line"></span> Funda`
            html += `                               </a>`
            html += `                           </div>`
            html += `                       </div>`
            html += `                   </div>`
            html += `                 <div class="col-12 col-md-6">`
            html += `                   <section class="mb-4">`
            html += `                       <div class="mb-3" style="border-bottom: 1px solid lightgrey;">`
            html += `                            <h6>Highlights</h6>`
            html += `                       </div>`
            html += `                       <div class="d-flex justify-content-between mb-3">`
            html += `                           <div class="w-100 d-flex flex-column">`
            html += `                               <span style="font-weight: 100;">`
            html += `                                   Relative Returns vs NIFTY`
            html += `                               </span>`
            html += `                               <h4 style="color: black; white-space: nowrap;">${miSrnUtils.grv(stock["vsNifty"])}</h4>`
            html += `                           </div>`
            if (miSrnUtils.pd(sector.secIdx) && sector.secIdx) {

                html += `                           <div class="w-100 d-flex flex-column">`
                html += `                               <span style="font-weight: 100;">`
                html += `                                   Relative Returns vs ${sector["name"]}`
                html += `                               </span>`
                html += `                               <h4 style="color: black; white-space: nowrap;">${miSrnUtils.grv(stock["vsIdx"])}</h4>`
                html += `                           </div>`
            }
            html += `                       </div>`

            html += `                       <div class="d-flex justify-content-between mb-3">`

            html += `                           <div class="w-100 d-flex flex-column">`
            html += `                               <span style="font-weight: 100;">Price</span>`
            html += `                                   <h4 style="color: black; white-space: nowrap;">`
            html += miSrnUtils.grv(stock["eqVals"]["price"]);
            html += `                                   </h4>`
            html += `                           </div>`


            html += `                           <div class="w-100 d-flex flex-column">`
            html += `                               <span style="font-weight: 100;">Price Change %</span>`
            html += `                                   <h4 style="color: black; white-space: nowrap;">`
            html += miSrnUtils.grv(stock["eqVals"]["priceChange"]) + " %";
            html += `                                   </h4>`
            html += `                           </div>`


            html += `                   </section>`;


            html += `                   <section>`;

            html += `                           <div class="mb-3" style="border-bottom: 1px solid lightgrey;">`
            html += `                               <h6>Technical Strength Index</h6>`
            html += `                           </div>`
            html += `                           <div id='trendStrengthDiv${stock["id"]}' class="d-flex justify-content-center"></div>`
            html += `                               <div class="tsr_strength_values_container">`

            html += `                               <div class="d-flex justify-content-center" id="strRank">`
            html += `                                   <span style="font-size: 14px;"> ${stock["eqVals"]["techPosi"]} </span>`
            html += `                               </div>`
            html += `                           </div>`
            html += `                   </section>`

            html += `                 </div>`


            html += `   <div class="col-12 col-md-6">`
            html += `           <section class="mb-4">`
            html += `               <div class="mb-3" style="border-bottom: 1px solid lightgrey;">`
            html += `                   <h6>${allSectorDataClone["rtnFreq"]} Returns</h6>`
            html += `               </div>`
            html += `               <div class="owl-carousel owl-theme periodicReturns">`;

            for (let j = 0; j < stock["eqVals"]["rtnList"].length; j++) {
                html += `               <div class="card d-flex flex-column p-3">`
                html += `                   <h5 style="color: black; white-space: nowrap;">`
                html += miSrnUtils.grv(stock["eqVals"]["rtnList"][j]["rtn"]);
                html += `                   </h5>`
                html += `               </div>`;
            };
            html += `               </div>`
            html += `           </section>`;

            html += `           <section class="mb-4">`;
            html += `               <div class="mb-3 d-flex justify-content-between align-items-center" style="border-bottom: 1px solid lightgrey;">`
            html += `                   <h6>Technicals</h6>`
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

                    html += `                   <div class="card d-flex flex-column p-3">`;
                    if (keys[j] == "ma1" || keys[j] == "ma2") {
                        if (keys[j] == "ma1") {
                            html += `                       <h6>EMA ${allSectorDataClone["ma1"]}</h6>`;
                        } else if (keys[j] == "ma2") {
                            html += `                       <h6>EMA ${allSectorDataClone["ma2"]}</h6>`;
                        }
                    }
                    else {
                        html += `                       <h6>${keys[j].toUpperCase()}</h6>`;
                    }
                    html += `                       <h4 style="color: orange; white-space: nowrap;">`;
                    html += miSrnUtils.grv(stock["eqVals"][keys[j]]);
                    html += `                       </h4>`;
                    //             // html += `                       <p style="color: orange;  margin: 0;">Neutral</p>`
                    html += `                   </div>`;

                }

            }

            html += `               </div>`;
            html += `           </section>`;


            html += `   </div>`;



            html += `                   <div class="text-center">`
            html += `                       <a style="color: var(--primary-color,#006aff); cursor: pointer;" onclick="miSrn.pss('${secType}', '${stockType}', ${secId}, '${stock["code"]}', false)">`;
            html += `                               Hide`;
            html += `                       </a>`;
            html += `                   </div>`;


            stockContainers[i].innerHTML = html;


        }
        mintHtmlUtil.dlg({
            divId: `trendStrengthDiv${stock["id"]}`,
            rank: miSrnUtils.grv(stock["eqVals"]["techStrength"]),
            title: 'Technical Strength Daily',
            leftLabel: 'Sell',
            rightLabel: 'Buy',
            width: 240,
            height: 8
        });
        stockContainers[0].scrollIntoView();
        initializeCarousal();
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
        // if (miSrnUtils.pd(sectorData)) {
        // sector = sectorData; // has max stocks (15) for op/up eq List
        // } else {
        // }
        let sector = sectors[secId]; // has only 5 stocks for op/up eq list
        let url = mintJsUtil.getRootUrl() + `/djs?id=${duration}&type=${sectorType}&cat=SecRot&action=one&code=${sector["uriCode"]}`;


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



        if (stockList.length <= 0) {
            return;
        }

        let container = document.getElementById(chartContainerId);

        container.classList.add("card");

        let html = "";
        html += `

        <div class="card-header text-center" style="background: linear-gradient(135deg, #dbeafe, #f1f5ff);">
            <h5 class="card-title">Charts</h5>
        </div>

        <div id='Html5'>

            <div id='chartPanel' class="chartPanel ">

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

                    </div>

                    <!-- <div id = 'settings'> </div> -->

                </div>


                <div id="chart_dialog" class="cc_dialog miCtrl">


                </div>

                <div id='imgDiv'> </div>

            </div>

        </div>
    `;

        container.innerHTML = html;

        if (scrollTo) {
            container.scrollIntoView();
        }

        json = flexParamToHtml(`cf=${allSectorDataClone["cf"]}&period=${allSectorDataClone["cp"]}`);

        if (all == true) { // if stock idx is -1, then display all stocks

            // For charts
            NIFTY = allSectorDataClone["NIFTY"];
            defStk = { name: NIFTY["name"], code: NIFTY["code"], scId: NIFTY["scId"], ecId: NIFTY["ecId"] };

            myTsrChartInit.init(defStk, json, chartType);
            jPlist = [{ id: 'tp' }];
            for (let i = 0; i < stockList.length; i++) {

                jPlist.push(stockList[i]);
            }
            javascript: ptia.ca(chartType, 'ignore');

            // var jPlist = [{ id: 'tp' }, { id: stock["id"], name: stock["name"], code: stock["code"], scId: stock["scId"], ecId: stock["ecId"] }];
        }
        else {

            let stock = mintJsUtil.getObjFrmArrByField(stockList, "code", stockCode);

            defStk = { id: stock["id"], name: stock["name"], code: stock["code"], scId: stock["scId"], ecId: stock["ecId"] };

            myTsrChartInit.init(defStk, json, chartType);

        }
    }

    function eraseContent() {
        let chart = document.getElementById(chartContainerId);

        chart.innerHTML = '';
        chart.classList.remove("card");
    }

    return {
        init: init,
        ssc: showSectorCard,
        psct: processStockComparisonTable,
        pss: processStockSection,
        pc: paintChart,
        ust: updateSectorTable,
        ec: eraseContent
    }

})();

// fields required for completion
// 1. Screener analysis links
// 2. 