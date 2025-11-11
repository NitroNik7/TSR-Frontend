
var sectorTypeSelectId = "tsrSectorRotationTypeSelect";
var sectorDurationSelectId = "tsrSectorRotationDurationSelect";

var toolsContainerId = "tsrToolsContainer";

var sectorData;

// Start
init();

function init() {
    paintTsrToolsContainer();

    let sectorTypeSelect = document.getElementById(sectorTypeSelectId);

    let durationSelect = document.getElementById(sectorDurationSelectId);

    if (paramDefined(sectorTypeSelect) && paramDefined(durationSelect)) {
        let sectorType = sectorTypeSelect.value;
        let duration = durationSelect.value;

        // let url = `https://www.tsrbt1.com:8080/TsrWeb/tmp/SectorRotation.jsp?id=${duration}&type=${sectorType}`;
        // let url = `http://127.0.0.1:5500/poc7/AllSectorRotation.jsp ${duration} ${sectorType}.json`;
        let url = `https://nitronik7.github.io/TSR-Frontend/sectorRotation/poc7/AllSectorRotation.jsp ${duration} ${sectorType}.json`;


        getData(url).then(data => {

            sectorData = data;

            paintBaseSectorAccordion();

            paintSectorTableContainer();
        });

    }
}

function paintTsrToolsContainer() {
    let toolsContainer = document.getElementById(toolsContainerId);

    let tools = [
        { "id": "Heatmap", "url": "#" },
        { "id": "Market Overview", "url": "#" },
        { "id": "Advance / Decline", "url": "#" },
        { "id": "Custom Screener", "url": "#" },
        { "id": "Technical Charts", "url": "#" },
    ];

    let html = "";

    html += `<h5 style="color:  midnightblue;" class="text-center">`;
    html += `   Also from TSR`;
    html += `</h5>`;

    html += `<div id="tsrToolsMenuContainer" style="display: flex;" class="owl-nav align-items-center justify-content-center my-3">`

    html += `   <button id="tsrToolsCarousalPrev" type="button" role="presentation" class="owl-prev btn">`
    html += `       <span aria-label="Previous">`
    html += `           <i class="fas fa-angle-left"></i>`
    html += `       </span>`
    html += `   </button>`

    html += `<div id="tsrToolsCarousal" class="owl-carousel owl-theme">`;
    for (let i = 0; i < tools.length; i++) {
        html += `   <div class="item p-2">`;
        html += `       <a href="#${tools[i]['url']}" target="_blank">`;
        html += `           <div class="card flex-row justify-content-around shadow-sm p-2">`;
        html += `               <span style="font-weight: 500; color:  #2a67ca;">`
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

    $("#tsrToolsCarousal").owlCarousel(sectorNav);

    $('#tsrToolsCarousalPrev').click(function () {
        $("#tsrToolsCarousal").trigger('prev.owl.carousel', [300]);
    });
    $('#tsrToolsCarousalNext').click(function () {
        $("#tsrToolsCarousal").trigger('next.owl.carousel', [300]); // [300] - optional speed parameter
    });


}

var accordionId = "tsrBaseSectorAccordion";
function paintBaseSectorAccordion() {

    let accordionDiv = document.getElementById(accordionId);

    let baseSector = "NIFTY";

    // create accordion only if NIFTY (base sector) exists
    if (paramDefined(accordionDiv) && paramDefined(sectorData[baseSector])) {

        let html = ``;

        html += `<div class="accordion container-md" id="accordionExample">`;

        html += `   <div class="accordion-item">`;
        html += `       <h2 class="accordion-header" style="background: linear-gradient(135deg, #dbeafe, #f1f5ff) !important;">`;
        html += `           <button class="accordion-button text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">`;
        html += `               <span style="font-size: 18px; font-weight: 500;">`;
        html += sectorData[baseSector].id;
        html += `               </span >`
        html += `               <div class="ms-5 d-flex align-items-center" style="font-size: 18px; ">`

        if (sectorData[baseSector].priceChange > 0) {
            html += `<div class="d-flex fw-bold align=items-center" style="color: #31a745;">`;
            html += getRoundedValue(sectorData[baseSector].price);
            html += `</div>`;
            html += `<div class="d-flex fw-bold align=items-center" style="color: #31a745;">`;
            html += "emsp;" + getRoundedValue(sectorData[baseSector].priceChange) + "&nbsp; <i class='fas fa-long-arrow-alt-up'></i>";
            html += `</div>`;
        }
        else if (sectorData[baseSector].priceChange < 0) {

            html += `<div class="d-flex fw-bold align=items-center" style="color: #ff9999;">`;
            html += getRoundedValue(sectorData[baseSector].price);
            html += `</div>`;
            html += `<div class="d-flex fw-bold align=items-center" style="color: #ff9999;">`;
            html += "&emsp;" + getRoundedValue(sectorData[baseSector].priceChange) + "&nbsp; <i class='fas fa-long-arrow-alt-down'></i>";
            html += `</div>`;
        }
        else {
            html += `<div class="d-flex fw-bold align=items-center" style="color: black;">`;
            html += getRoundedValue(sectorData[baseSector].price);
            html += `</div>`;
            html += `<div class="d-flex fw-bold align=items-center" style="color: black;">`;
            html += "emsp;" + getRoundedValue(sectorData[baseSector].priceChange) + "";
            html += `</div>`;
        }
        html += `               </div>`
        html += `           </button>`
        html += `       </h2>`
        html += `       <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">`
        html += `           <div class="accordion-body">`
        html += `               <div class="card-body">`
        html += `                   <div class="row">`
        html += `                       <div class="col-12 col-md-6 d-flex align-items-center">`
        html += `                           <div>
                                                <p style="font-size: 22px; text-align:center; margin-bottom: 10px; font-weight: 600;"> TSR Strength Index
                                                </p>
                                                <div class="row tsr_strength_svg_container">
                                                    <div id="trendStrengthDiv" class="d-flex justify-content-center">

                                                        <svg width="250" height="43">
                                                        <defs>
                                                            <linearGradient id="gradient" x1="0%" y1="0%"
                                                                x2="100%" y2="0%" spreadMethod="pad">
                                                                <stop offset="0%" stop-color="#ff0000"
                                                                    stop-opacity="1">
                                                                </stop>
                                                                <stop offset="50%" stop-color="#e6e600"
                                                                    stop-opacity="1">
                                                                </stop>
                                                                <stop offset="100%" stop-color="#009900"
                                                                    stop-opacity="1">
                                                                </stop>
                                                            </linearGradient>
                                                        </defs>
                                                        <g><text x="180" y="10" text-anchor="end"
                                                            style="font-size: 12px; font-weight: bold;">Technical
                                                            Strength
                                                            Intraday</text></g>
                                                        <g>
                                                            <rect x="0" y="15" width="240" height="8"
                                                                style="fill: url(&quot;#gradient&quot;);"
                                                                rx="4">
                                                            </rect>
                                                        </g>
                                                        <g>
                                                            <line x1="158.88" y1="15" x2="158.88" y2="23"
                                                                stroke-width="1" stroke-dasharray="2, 2"
                                                                stroke="black "></line>
                                                        </g>
                                                        <path d="M0,-7.019L6.079,3.51L-6.079,3.51Z"
                                                            fill="#000" stroke="#000" stroke-width="1"
                                                            transform="translate(158.88,25)">
                                                        </path>
                                                        <g><text x="10" y="34"
                                                            style="font-size: 10px; font-weight: bold;">Sell</text>
                                                        </g>
                                                        <g><text x="230" y="34" text-anchor="end"
                                                            style="font-size: 10px; font-weight: bold;">Buy</text>
                                                        </g>
                                                        <g><text x="134" y="34" text-anchor="end"
                                                            style="font-size: 9px; font-weight: bold;">66.20%</text>
                                                        </g>
                                                        </svg>
                                                    </div>

                                                    <div class="tsr_strength_values_container">
                                                    <div class="d-flex justify-content-around" id="strSig">
                                                        Signal
                                                        <span><span
                                                            style="color:#008B00;;  ">Bullish</span></span>
                                                    </div>
                                                    <br>
                                                        <div class="d-flex justify-content-center" id="strRank">
                                                            <span style="font-size: 12x;  "> NIFTY IT is more
                                                                bullish than
                                                                85.50 % of
                                                                stocks </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> `
        html += `                       </div>`
        html += `<hr class="d-block d-md-none my-3">`

        html += `                       <div class="col-12 mt-md-0 col-md-6 d-flex flex-column justify-content-around">`

        html += `                           <div class="row row-cols-2" style="text-align:center;">`

        html += `                               <div class="col">`
        html += `                                   <div class="card-body justify-content-center">`
        html += `                                       <h6>Period Change</h6>`
        html += `                                   </div>`
        html += `                                   <h4 class="card-title fw-bold" style="color:#004F00;  ">`;
        html += sectorData[baseSector].periodChg;
        html += `                                   </h4>`
        html += `                               </div>`
        html += `                               <div class="col">`
        html += `                                   <div class="card-body justify-content-center">`;
        html += `                                       <h6>Market Cap Change</h6>`;
        html += `                                   </div>`;
        html += `                                   <h4 class="card-title fw-bold" style="color:orange;  ">`
        html += sectorData[baseSector].marketCapChg;
        html += `                                   </h4>`;
        html += `                               </div>`;
        html += `                               <div class="col">`
        html += `                                   <div class="card-body justify-content-center">`;
        html += `                                       <h6>MA 1</h6>`;
        html += `                                   </div>`;
        html += `                                   <h4 class="card-title fw-bold" style="color:orange;  ">`
        html += sectorData[baseSector].marketCapChg;
        html += `                                   </h4>`;
        html += `                               </div>`;
        html += `                               <div class="col">`
        html += `                                   <div class="card-body justify-content-center">`;
        html += `                                       <h6>MA 2</h6>`;
        html += `                                   </div>`;
        html += `                                   <h4 class="card-title fw-bold" style="color:orange;  ">`
        html += sectorData[baseSector].marketCapChg;
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
    }

}

var sectorTableContainerId = "tsrSectorTableContainer";
var sectorTableId = "tsrSectorTable";
function paintSectorTableContainer() {
    let sectorContainer = document.getElementById(sectorTableContainerId);

    sectorContainer.classList.add("card");

    let html = "";
    html += `<div class="card-header">`;
    html += `   <h5>Sector Comparison</h5>`;
    html += `</div>`;

    html += `<div class="card-body p-3" style="max-height: 60vh; overflow-y: auto;">`;
    html += `   <div>`;
    html += `       <div class="mb-3 btn-group" role="group">`;
    html += `           <input type="radio" class="btn-check" name="btnradio" id="outPerformingSectors" autocomplete="off" checked>`;
    html += `           <label class="btn btn-outline-secondary" for="outPerformingSectors" onclick="updateSectorTable('op')">Out Performing</label>`;
    html += `           <input type="radio" class="btn-check" name="btnradio" id="underPerformingSectors" autocomplete="off">`;
    html += `           <label class="btn btn-outline-secondary" for="underPerformingSectors" onclick="updateSectorTable('up')">Under Performing</label>`;
    html += `       </div>`;
    html += `   </div>`;
    html += `   <div id="${sectorTableId}" style="overflow: auto">`;
    html += `   </div>`;
    html += `</div>`;

    sectorContainer.innerHTML = html;
    updateSectorTable('op');
}


function updateSectorTable(option) {

    let sectorTable = document.getElementById(sectorTableId);

    let html = "";


    html += `<table class="table table-striped">`
    html += `   <thead style="font-size: 16px;">`
    html += `       <tr>`
    html += `           <th>Name</th>`
    html += `           <th>`
    html += `               Mkt Cap Change`
    html += `                <br>`
    html += `               <span style="font-weight: 400">`;
    html += `                   (in Cr.)`;
    html += `               </span>`;
    html += `           </th>`
    html += `           <th> Out Performing</th >`
    html += `           <th> Under Performing</th>`

    html += `           <th>`
    html += `               MA 1`
    html += `               <br>`
    html += `               <span style="font-weight: 400">`
    html += `                   (in %)`
    html += `               </span>`
    html += `           </th>`

    html += `           <th>`
    html += `               MA 2`
    html += `               <br>`
    html += `               <span style="font-weight: 400">`
    html += `                   (in %)`
    html += `               </span>`
    html += `           </th>`
    html += `           <th>`
    html += `               ADX`
    html += `               <br>`
    html += `               <span style="font-weight: 400">`
    html += `                   (in %)`
    html += `               </span>`
    html += `           </th>`
    html += `           <th>`
    html += `               RSI`
    html += `               <br>`
    html += `               <span style="font-weight: 400">`
    html += `                   (in %)`
    html += `               </span>`
    html += `           </th>`
    html += `           <th>`
    html += `               macds`
    html += `               <br>`
    html += `               <span style="font-weight: 400">`
    html += `                   (in %)`
    html += `               </span>`
    html += `           </th>`
    html += `           <th>`
    html += `               macd0`
    html += `               <br>`
    html += `               <span style="font-weight: 400">`
    html += `                   (in %)`
    html += `               </span>`
    html += `           </th>`
    html += `         </tr>`;
    html += `   </thead>`;

    let sectors;

    if (option == 'op') {
        sectors = sectorData["opSec"];
    }
    else {
        sectors = sectorData["upSec"];
    }

    html += `<tbody>`;

    sortSectors(sectors);

    if (sectors.length == 0) {

        html += `<tr>`;
        html += `   <td colspan="10" class="text-center">`;
        html += `       No records`;
        html += `   </td>`;
        html += `</tr>`;
    }
    else {
        for (let i = 0; i < sectors.length; i++) {
            html += `<tr>`
            html += `   <td>`
            html += `       <div style="cursor: pointer;" onclick="showSectorCard('${option}', ${i})" class="link-primary">`
            html += sectors[i].name;
            html += `       </div`
            html += `   </td>`;
            html += `   <td>`;
            html += getColoredValue(sectors[i]["mcChg"]);
            html += `   </td>`;
            html += `   <td>`;
            html += getColoredValue(sectors[i]["opEq"]);
            html += `   </td>`;
            html += `   <td>`;
            html += getColoredValue(sectors[i]["upEq"]);
            html += `   </td>`;
            html += `   <td>`;
            html += getColoredValue(sectors[i]["ma1"]);
            html += `   </td>`;
            html += `   <td>`;
            html += getColoredValue(sectors[i]["ma2"]);
            html += `   </td>`;
            html += `   <td>`;
            html += getColoredValue(sectors[i]["adx"]);
            html += `   </td>`;
            html += `   <td>`;
            html += getColoredValue(sectors[i]["rsi"]);
            html += `   </td>`;
            html += `   <td>`;
            html += getColoredValue(sectors[i]["macds"]);
            html += `   </td>`;
            html += `   <td>`;
            html += getColoredValue(sectors[i]["macd0"]);
            html += `   </td>`;
            html += `</tr>`
        }
    }


    html += `</tbody>`
    html += `</table>`;
    sectorTable.innerHTML = html;


}

function sortSectors(sectors) {
    sectors.sort((a, b) => b.mcChg - a.mcChg); // sorts sectors in ascending order wrt mcChg - required for ranking the sectors

}


function showSectorCard(sec, secId) {

    let sectorContainer = document.getElementById(sectorTableContainerId);
    sectorContainer.classList.remove("card");

    // clone data object
    let sectors = [...sectorData[sec + "Sec"]];

    // let sectorInFocus = sectorData[sec][secId];

    let html = "";

    // 
    html += `<div class="text-center">`

    html += `   <a class="link-primary" style="text-decoration: underline;" onclick="paintSectorTableContainer()">`
    html += `       <i class="fas fa-arrow-left"></i>`;
    html += `       &nbsp;`
    html += `       Back to Sector Comparison`;
    html += `   </a>`;

    html += `</div>`;



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
        html += `       <a href="#${i}">`;
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
    html += paintSectorCard(sec, sectors, secId);


    for (let i = 0; i < sectors.length; i++) {
        if (secId != i) {
            html += paintSectorCard(sec, sectors, i);
        }
    }
    html += `</div>`;

    sectorContainer.innerHTML = html;


    // sector card carousal code end


    // TO DO SHOW MORE STOCKS



    // sectorContainer.scrollIntoView();
    initializeCarousal();
};

function initializeCarousal() {

    console.log("initializeCarousal +  running")

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
        loop: true,
        // margin: 20,
        dots: false,
        nav: false,
        // autoplay: true,
        // autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            }
        },
        // URLhashListener: true,
        // startPosition: 'URLHash',
    }

    $("#sectorCardsCarousal").owlCarousel(sectorCards);

    $('.sectorCardsCarousalPrev').click(function () {
        $("#sectorCardsCarousal").trigger('prev.owl.carousel');
    });
    $('.sectorCardsCarousalNext').click(function () {
        $("#sectorCardsCarousal").trigger('next.owl.carousel'); // [300] - optional speed parameter
    });

    var periodicReturns = {
        // loop: true,
        margin: 10,
        // autoplay: true,
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

    $(".periodicReturns").on('touchstart', '.owl-stage', function (e) {
        e.preventDefault();
        event.stopPropagation();
    });

    var technicals = {
        // loop: true,
        margin: 10,
        // autoplay: true,
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

    $(".technicals").on('touchstart', '.owl-stage', function (e) {
        e.preventDefault();
        event.stopPropagation();
    });
};


let stockTableBtnId = "stockTableShowButton";
function paintSectorCard(sec, sectors, i) {
    let html = "";

    html += `   <div class="container-md" data-hash="${i}">`;
    html += `       <div class="card shadow">`;

    html += `           <div class="card-header d-flex justify-content-between align-items-center" style="background: linear-gradient(135deg, #dbeafe, #f1f5ff);">`;
    html += `               <div style="cursor: pointer; white-space: nowrap;" class="link-primary sectorCardsCarousalPrev">`
    html += `                   <i class="fas fa-arrow-left"></i>`
    html += `                       &nbsp;`
    html += `                       Prev`
    html += `               </div>`

    html += `               <h5 class="card-title text-center" style="font-weight: 600;">`
    html += `               <p style="margin: 0;">`
    html += sectors[i].name;
    html += `                       <b class="d-none d-sm-inline">`
    if (i == 0) {
        html += `                       <sup style="color: gray;"> 1 <sup>st</sup></sup >`;
    }
    else if (i == 1) {
        html += `                       <sup style="color: gray;"> 2 <sup>nd</sup></sup >`;
    }
    else if (i == 2) {
        html += `                       <sup style="color: gray;">3 <sup>rd</sup></sup >`;
    }
    else {
        html += `                       <sup style="color: gray;">${i + 1} <sup>th</sup></sup >`;
    }
    html += `                       </b>`
    html += `               </p>`
    html += `               </h5>`



    html += `               <div style="cursor: pointer; white-space: nowrap;" class="link-primary sectorCardsCarousalNext">`
    html += `                       Next`
    html += `                       &nbsp;`
    html += `                   <i class="fas fa-arrow-right"></i>`
    html += `               </div>`
    html += `           </div>`;


    // ---------------------------------------------------------------------


    html += `           <div class="card-body">`;
    html += `               <div class="row text-center">`;
    html += `                   <h6 class="">`;
    html += `                       <a href="">`
    html += `                           View in Depth Analysis`
    html += `                           <i class="fas fa-external-link-square-alt"></i>`
    html += `                       </a>`
    html += `                   </h6>`
    html += `               </div>`;

    html += `           <div class="row">`;

    if (paramDefined(sectors[i].secIdx) && sectors[i].secIdx) {
        html += `               <div class="col col-md-6 p-3">`
        html += `                   <section class="mb-4">`
        html += `                       <div class="mb-3 d-flex justify-content-between" style="border-bottom: 1px solid lightgrey;">`
        html += `                           <h6>Highlights</h6>`
        html += `                       </div>`
        html += `                       <div class="d-flex justify-content-between mb-3">`
        html += `                           <div class="w-100 d-flex flex-column">`
        html += `                               <span style="font-weight: 100;">`
        html += `                                   Relative Returns`
        html += `                               </span>`
        html += `                               <h4 style="color: black; white-space: nowrap;">${getRoundedValue(sectors[i]["idxVals"]["relRtn"])}</h4>`
        html += `                           </div>`
        html += `                           <div class="w-100 d-flex flex-column">`
        html += `                               <span style="font-weight: 100;">Market Cap Change</span>`
        html += `                               <h4 style="color: black; white-space: nowrap;">${getRoundedValue(sectors[i]["mcChg"])}`
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
        html += getRoundedValue(sectors[i]["idxVals"]["price"]);
        html += `                                   </h4>`
        html += `                           </div>`
        html += `                           <div class="w-100 d-flex flex-column">`
        html += `                               <span style="font-weight: 100;">Price Change %</span>`
        html += `                                   <h4 style="color: black; white-space: nowrap;">`
        html += getRoundedValue(sectors[i]["idxVals"]["priceChange"]) + " %";
        html += `                                   </h4>`
        html += `                               </div>`
        html += `                       </div>`
        html += `                   </section>`;

        html += `           <section class="mb-4">`
        html += `               <div class="mb-3" style="border-bottom: 1px solid lightgrey;">`
        html += `                   <h6>Periodic Returns</h6>`
        html += `               </div>`
        html += `               <div class="owl-carousel owl-theme periodicReturns">`;

        for (let j = 0; j < sectors[i]["idxVals"]["rtnList"].length; j++) {
            html += `               <div class="card d-flex flex-column p-3">`
            // html += `                   <h6>`
            // html += "P";
            // html += `                   </h6>`
            html += `                   <h5 style="color: black; white-space: nowrap;">`
            html += getRoundedValue(sectors[i]["idxVals"]["rtnList"][j]["rtn"]);
            html += `                   </h5>`
            html += `               </div>`;
        };
        html += `               </div>`
        html += `           </section>`;


        if (paramDefined(sectors["NIFTY"])) {
            html += `           <section class="mb-4">`;

            html += `               <div class="mb-3" style="border-bottom: 1px solid lightgrey;">`
            html += `                   <h6>Analysis</h6>`;
            html += `               </div>`;
            //         // "vsNifty": 5.060425853536746
            html += `               <p>`;
            html += `                   The <b>${sectors[i]["name"]}</b> Sector is ahead of <b>NIFTY</b> by `;
            html += `                   <b style="color: black;">${sectors[i]["vsNifty"]} %</b>`;
            html += `               </p>`;

            html += `           </section>`;
        }

        html += `           <section id="tsrStrengthIndex">`;
        html += `                           <div>
                                                <p style="font-size: 22px; text-align:center; margin-bottom: 10px; font-weight: 600;"> TSR Strength Index
                                                </p>
                                                <div class="row tsr_strength_svg_container">
                                                    <div id="trendStrengthDiv" class="d-flex justify-content-center">

                                                        <svg width="250" height="43">
                                                        <defs>
                                                            <linearGradient id="gradient" x1="0%" y1="0%"
                                                                x2="100%" y2="0%" spreadMethod="pad">
                                                                <stop offset="0%" stop-color="#ff0000"
                                                                    stop-opacity="1">
                                                                </stop>
                                                                <stop offset="50%" stop-color="#e6e600"
                                                                    stop-opacity="1">
                                                                </stop>
                                                                <stop offset="100%" stop-color="#009900"
                                                                    stop-opacity="1">
                                                                </stop>
                                                            </linearGradient>
                                                        </defs>
                                                        <g><text x="180" y="10" text-anchor="end"
                                                            style="font-size: 12px; font-weight: bold;">Technical
                                                            Strength
                                                            Intraday</text></g>
                                                        <g>
                                                            <rect x="0" y="15" width="240" height="8"
                                                                style="fill: url(&quot;#gradient&quot;);"
                                                                rx="4">
                                                            </rect>
                                                        </g>
                                                        <g>
                                                            <line x1="158.88" y1="15" x2="158.88" y2="23"
                                                                stroke-width="1" stroke-dasharray="2, 2"
                                                                stroke="black "></line>
                                                        </g>
                                                        <path d="M0,-7.019L6.079,3.51L-6.079,3.51Z"
                                                            fill="#000" stroke="#000" stroke-width="1"
                                                            transform="translate(158.88,25)">
                                                        </path>
                                                        <g><text x="10" y="34"
                                                            style="font-size: 10px; font-weight: bold;">Sell</text>
                                                        </g>
                                                        <g><text x="230" y="34" text-anchor="end"
                                                            style="font-size: 10px; font-weight: bold;">Buy</text>
                                                        </g>
                                                        <g><text x="134" y="34" text-anchor="end"
                                                            style="font-size: 9px; font-weight: bold;">66.20%</text>
                                                        </g>
                                                        </svg>
                                                    </div>

                                                    <div class="tsr_strength_values_container">
                                                    <div class="d-flex justify-content-around" id="strSig">
                                                        Signal
                                                        <span><span
                                                            style="color:#008B00;;  ">Bullish</span></span>
                                                    </div>
                                                    <br>
                                                        <div class="d-flex justify-content-center" id="strRank">
                                                            <span style="font-size: 12x;  "> NIFTY IT is more
                                                                bullish than
                                                                85.50 % of
                                                                stocks </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> `
        html += `           </section>`;

        html += `       </div>`;


        html += `       <div class="col col-md-6 p-3">`;

        html += `           <section class="mb-4">`;
        html += `               <div class="mb-3" style="border-bottom: 1px solid lightgrey;">`;
        html += `                   <h6>Technicals</h6>`;
        html += `               </div>`;
        html += `               <div class="owl-carousel owl-theme technicals">`;

        let keys = Object.keys(sectors[i]["idxVals"]);

        for (let j = 0; j < keys.length; j++) {
            if (keys[j] == "ma1" || keys[j] == "ma2" || keys[j] == "rsi" || keys[j] == "macd" || keys[j] == "signal" || keys[j] == "st") {
                html += `                   <div class="card d-flex flex-column p-3">`;
                html += `                       <h6>${keys[j].toUpperCase()}</h6>`;
                html += `                       <h4 style="color: orange; white-space: nowrap;">`;
                html += getRoundedValue(sectors[i]["idxVals"][keys[j]]);
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

    if (paramDefined(sectors[i].secIdx) && sectors[i].secIdx) {
        html += `               <div class="text-center">`
        html += `                   <div class="w-100 p-3 text-center">`
    }
    else {
        html += `               <div class="text-center row">`
        html += `                   <div class="col-12 col-md-6 p-3 text-center"  style="overflow: auto">`
    }


    html += `                           <b>Out Performing</b>`
    html += `                           <table class="table table-striped">`
    html += `                               <thead>`;
    html += `                                   <tr>`;
    html += `                                       <th scope="col">Name</th>`
    html += `                                       <th scope="col">vs NIFTY</th>`
    if (paramDefined(sectors[i].secIdx) && sectors[i].secIdx) {

        html += `                                       <th scope="col">vs ${sectors[i].name}</th>`
    }
    html += `                                       <th scope="col">Chart</th>`
    html += `                                   </tr>`;
    html += `                               </thead>`;
    html += `                               <tbody>`;

    let stockList = sectors[i]["opEqList"];

    if (stockList.length == 0) {

        html += `<tr>`;

        if (paramDefined(sectors[i].secIdx) && sectors[i].secIdx) {

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
            html += `<td>
                           <a class="link-primary" onclick="processStockSection('${sec}', 'op', ${i}, ${j}, true)"> ${getRoundedValue(stockList[j]["name"])} </a>
                    </td>`;
            html += `                                   <td>${getRoundedValue(sectors[i].opEqList[j]["vsNifty"])}</td>`;
            if (paramDefined(sectors[i].secIdx) && sectors[i].secIdx) {

                html += `                                   <td>${getRoundedValue(sectors[i].opEqList[j]["vsIdx"])}</td>`;
            }
            html += `                                   <td>`
            html += `                                       <a href="">`
            html += `                                           <i style="color:grey; font-size:12pt;" class="fa fa-chart-line">`
            html += `                                           </i>`
            html += `                                       </a>`;
            html += `                                   </td>`;
            html += `                               </tr>`;
        }

    }
    html += `                               </tbody>`;
    html += `                           </table>`;
    html += `                       </div>`


    if (paramDefined(sectors[i].secIdx) && sectors[i].secIdx) {
        html += `                   <div class="w-100 p-3 text-center">`
    }
    else {
        html += `                   <div class="col-12 col-md-6 p-3 text-center" style="overflow: auto">`
    }

    html += `                           <b>Under Performing</b>`
    html += `                           <table class="table table-striped">`
    html += `                               <thead>`
    html += `                                   <tr>`
    html += `                                       <th scope="col">Name</th>`
    html += `                                       <th scope="col">vs NIFTY</th>`
    if (paramDefined(sectors[i].secIdx) && sectors[i].secIdx) {
        html += `                                       <th scope="col">vs ${sectors[i].name}</th>`
    }
    html += `                                       <th scope="col">Chart</th>`
    html += `                                   </tr>`
    html += `                               </thead>`
    html += `                               <tbody>`;

    stockList = sectors[i]["upEqList"];
    if (stockList.length == 0) {

        html += `<tr>`;
        if (paramDefined(sectors[i].secIdx) && sectors[i].secIdx) {

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
                                                            <a class="link-primary" onclick="processStockSection('${sec}', 'up', ${i}, ${j}, true)"> ${getRoundedValue(stockList[j]["name"])} </a>
                                                        </td>`;
            html += `                                   <td>${getRoundedValue(sectors[i].upEqList[j]["vsNifty"])}</td>`;
            if (paramDefined(sectors[i].secIdx) && sectors[i].secIdx) {

                html += `                                   <td>${getRoundedValue(sectors[i].upEqList[j]["vsIdx"])}</td>`;
            }
            html += `                                   <td>`
            html += `                                       <a href="">`
            html += `                                           <i style="color:grey; font-size:12pt"; class="fa fa-chart-line">`
            html += `                                           </i>`
            html += `                                       </a>`;
            html += `                                   </td>`;
            html += `                               </tr>`;
        }

    }
    html += `                               </tbody>`;
    html += `                           </table>`;
    html += `                       </div>`;


    if (sec == "op" && sectorData[sec + "Sec"].length > 0) {
        if (sectorData[sec + "Sec"][i]["opEqList"].length > 0) {
            html += `                       <a id="${stockTableBtnId + i}" style="color: var(--primary-color,#006aff); cursor: pointer;" onclick="paintStockComparisonTable('op', 'op', ${i}, true)">`;
        }
        else {
            html += `                       <a id="${stockTableBtnId + i}" style="color: var(--primary-color,#006aff); cursor: pointer;" onclick="paintStockComparisonTable('op', 'up', ${i}, true)">`;
        }
    }
    else {
        if (sectorData[sec + "Sec"][i]["opEqList"].length > 0) {
            html += `                       <a id="${stockTableBtnId + i}" style="color: var(--primary-color,#006aff); cursor: pointer;" onclick="paintStockComparisonTable('up', 'op', ${i}, true)">`;
        }
        else {
            html += `                       <a id="${stockTableBtnId + i}" style="color: var(--primary-color,#006aff); cursor: pointer;" onclick="paintStockComparisonTable('up', 'up', ${i}, true)">`;
        }
    }
    // html += `                       <a id="${stockTableBtnId + i}" style="color: var(--primary-color,#006aff); cursor: pointer;" onclick="paintStockComparisonTable('up', 'op', ${i}, true)">`;

    // }
    html += `                               Show more`;
    html += `                       </a>`;

    html += `                   </div>`;

    // section ends
    html += `               </section>`;

    // row ends
    html += `               </div> `;

    html += `<div class="${stockTableContainerId + i} row"  style="overflow: auto">`;

    // html += getStockComparisonTable("op", sectors[i]);

    html += '</div>';

    html += `<div class="${stockContainerId + i} row container" >`;

    // html += getStockComparisonTable("op", sectors[i]);

    html += '</div>';

    html += `           </div> `;
    html += `       </div>`;
    html += `   </div> `;
    if (paramDefined(sectors[i].secIdx) && sectors[i].secIdx) {
        html += `</div>`;
    }
    return html;
}

let stockTableContainerId = "stockComparisonTableContainer";
let stockContainerId = "stockContainer";

function paintStockComparisonTable(sec, stockType, secId, show) {

    let sectors = [...sectorData[sec + "Sec"]];

    let sector = sectors[secId];


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

    let html = "";

    // Radio buttons
    html += ``
    html += `   <div>`;
    html += `       <div class="mb-3 btn-group" role="group">`;
    if (stockType == "op") {
        html += `       <input type="radio" class="btn-check" name="btnradio" id="outPerformingStocks${secId}" autocomplete="off" checked>`;
    }
    else {
        html += `       <input type="radio" class="btn-check" name="btnradio" id="outPerformingStocks${secId}" autocomplete="off">`;
    }
    html += `           <label class="btn btn-outline-secondary" for="outPerformingStocks${secId}" onclick="paintStockComparisonTable('${sec}','op', ${secId}, true)">Out Performing</label>`;
    if (stockType == "up") {
        html += `       <input type="radio" class="btn-check" name="btnradio" id="underPerformingStocks${secId}" autocomplete="off" checked>`;
    }
    else {
        html += `       <input type="radio" class="btn-check" name="btnradio" id="underPerformingStocks${secId}" autocomplete="off">`;
    }
    html += `           <label class="btn btn-outline-secondary" for="underPerformingStocks${secId}" onclick="paintStockComparisonTable('${sec}','up', ${secId}, true)">Under Performing</label>`;
    html += `       </div>`;
    html += `   </div>`;

    // table
    let tableFields = ["Name", "Price", "Change %", "vs NIFTY", "1Y Returns", "RS wrt  Idx Chg %", "Market Cap", "PE", "EMA 200"];

    if (paramDefined(sector.secIdx) && sector.secIdx) {
        tableFields.splice(2, 0, `vs ${sector.name}`);
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

    let stockList = sector[stockType + "EqList"];


    for (let i = 0; i < stockList.length; i++) {
        html += `<tr>`;

        let keys = Object.keys(stockList[i]);
        for (let j = 0; j < keys.length; j++) {

            if (keys[j] == "name") {
                html += `<td>
                           <a class="link-primary" onclick="processStockSection('${sec}', '${stockType}', ${secId}, ${i}, true)"> ${getRoundedValue(stockList[i][keys[j]])} </a>
                    </td>`;
            }

            if (keys[j] == "vsNifty" || keys[j] == "vsIdx") {
                html += `<td>${getRoundedValue(stockList[i][keys[j]])}</td>`;
            }
        }

        html += `<td>-</td>`;
        html += `<td>-</td>`;
        html += `<td>-</td>`;
        html += `<td>-</td>`;
        html += `<td>-</td>`;
        html += `<td>-</td>`;
        html += `<td>-</td>`;
        html += `</tr>`;
    }

    html += `                               </tbody>`;
    html += `                             </table>`;

    html += `                   <div class="text-center">`
    html += `                       <a style="color: var(--primary-color,#006aff); cursor: pointer;" onclick="paintStockComparisonTable('${sec}', '${stockType}', ${secId}, false)">`;
    html += `                               Show less`;
    html += `                       </a>`;
    html += `                   </div>`;

    for (let i = 0; i < containers.length; i++) {
        containers[i].classList.add("p-3");
        containers[i].innerHTML = html;
    }
};

function processStockSection(secOp, stockType, secId, stockId, show) {

    let stockContainers = document.getElementsByClassName(stockContainerId + secId);

    if (!show) {
        for (let i = 0; i < stockContainers.length; i++) {
            stockContainers[i].innerHTML = "";
        }
        return;
    }

    let sectorTypeSelect = document.getElementById(sectorTypeSelectId);

    let durationSelect = document.getElementById(sectorDurationSelectId);


    if (paramDefined(sectorTypeSelect) && paramDefined(durationSelect)) {
        let sectorType = sectorTypeSelect.value;
        let duration = durationSelect.value;

        let sectors = [...sectorData[secOp + "Sec"]];

        let sector = sectors[secId];


        // let url = `http://127.0.0.1:5500/TSR/sectorRotation/poc7/OneSectorRotation.jsp ${duration} ${sectorType} ${sector["code"]}.json`;
        let url = `https://nitronik7.github.io/TSR-Frontend/sectorRotation/poc7/OneSectorRotation.jsp ${duration} ${sectorType} ${sector["code"]}.json`;

        // GET DATA For sector

        if (paramDefined(getDataFromLocalStorage("sectorStocks"))) {

            secData = getDataFromLocalStorage("sectorStocks"); // data retrieved from cache

            paintStockSection(secOp, sector, secData, stockContainers, stockType, secId, stockId);
        }
        else {
            getData(url).then(data => {

                saveDataToLocalStorage("sectorStocks", data); // caching data 

                secData = data;

                paintStockSection(secOp, sector, secData, stockContainers, stockType, secId, stockId);
            });
        }
    };
}

function paintStockSection(secOp, sector, secData, stockContainers, stockType, secId, stockId) {

    let stockList = secData[stockType + "EqList"];
    let stock = stockList[stockId];


    for (let i = 0; i < stockContainers.length; i++) {

        stockContainers[i].classList.add("p-3");

        let html = "";
        html += `                   <section class="mb-4">`
        html += `                       <div class="mb-3 text-center" style="border-bottom: 1px solid lightgrey;">`
        html += `                           <h4>${stock["name"]}</h4>`
        html += `                       </div>`
        html += `                       <div class="d-flex justify-content-between mb-3">`
        html += `                           <div class="w-100 d-flex flex-column">`
        html += `                               <span style="font-weight: 100;">`
        html += `                                   Relative Returns`
        html += `                               </span>`
        html += `                               <h4 style="color: black; white-space: nowrap;">${getRoundedValue(stock["eqVals"]["relRtn"])}</h4>`
        html += `                           </div>`
        html += `                           <div class="w-100 d-flex flex-column">`
        html += `                               <span style="font-weight: 100;">Price</span>`
        html += `                                   <h4 style="color: black; white-space: nowrap;">`
        html += getRoundedValue(stock["eqVals"]["price"]);
        html += `                                   </h4>`
        html += `                           </div>`
        html += `                           <div class="w-100 d-flex flex-column">`
        html += `                               <span style="font-weight: 100;">Price Change %</span>`
        html += `                                   <h4 style="color: black; white-space: nowrap;">`
        html += getRoundedValue(stock["eqVals"]["priceChange"]) + " %";
        html += `                                   </h4>`
        html += `                           </div>`
        html += `                       </div>`;
        html += `                   </section>`;

        html += `   <div class="row">`
        html += `       <div class="col-12 col-md-6">`
        html += `           <section class="mb-4">`
        html += `               <div class="mb-3" style="border-bottom: 1px solid lightgrey;">`
        html += `                   <h6>Periodic Returns</h6>`
        html += `               </div>`
        html += `               <div class="owl-carousel owl-theme periodicReturns">`;

        for (let j = 0; j < stock["eqVals"]["rtnList"].length; j++) {
            html += `               <div class="card d-flex flex-column p-3">`
            // html += `                   <h6>`
            // html += "P";
            // html += `                   </h6>`
            html += `                   <h5 style="color: black; white-space: nowrap;">`
            html += getRoundedValue(stock["eqVals"]["rtnList"][j]["rtn"]);
            html += `                   </h5>`
            html += `               </div>`;
        };
        html += `               </div>`
        html += `           </section>`;
        html += `       </div>`

        html += `       <div class="col-12 col-md-6">`
        html += `           <section class="mb-4">`;
        html += `               <div class="mb-3" style="border-bottom: 1px solid lightgrey;">`;
        html += `                   <h6>Technicals</h6>`;
        html += `               </div>`;
        html += `               <div class="owl-carousel owl-theme technicals">`;

        let keys = Object.keys(sector["idxVals"]);

        for (let j = 0; j < keys.length; j++) {
            if (keys[j] == "ma1" || keys[j] == "ma2" || keys[j] == "rsi" || keys[j] == "macd" || keys[j] == "signal" || keys[j] == "st") {
                html += `                   <div class="card d-flex flex-column p-3">`;
                html += `                       <h6>${keys[j].toUpperCase()}</h6>`;
                html += `                       <h4 style="color: orange; white-space: nowrap;">`;
                html += getRoundedValue(sector["idxVals"][keys[j]]);
                html += `                       </h4>`;
                //             // html += `                       <p style="color: orange;  margin: 0;">Neutral</p>`
                html += `                   </div>`;
            }
        }

        html += `               </div>`;
        html += `           </section>`;
        html += `       </div>`


        html += `   </div>`;



        html += `                   <div class="text-center">`
        html += `                       <a style="color: var(--primary-color,#006aff); cursor: pointer;" onclick="processStockSection('${secOp}', '${stockType}', ${secId}, ${stockId}, false)">`;
        html += `                               Hide`;
        html += `                       </a>`;
        html += `                   </div>`;


        stockContainers[i].innerHTML = html;
        initializeCarousal();
    }
}

// fields required for completion
// 1. Screener analysis links
// 2. 