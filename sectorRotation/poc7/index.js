
var sectorTypeSelectId = "tsrSectorRotationTypeSelect";
var sectorDurationSelectId = "tsrSectorRotationDurationSelect";

var sectorData;

// Start
function init() {
    let sectorTypeSelect = document.getElementById(sectorTypeSelectId);

    let durationSelect = document.getElementById(sectorDurationSelectId);

    if (paramDefined(sectorTypeSelect) && paramDefined(durationSelect)) {
        let sectorType = sectorTypeSelect.value;
        let duration = durationSelect.value;

        // let url = `https://www.tsrbt1.com:8080/TsrWeb/tmp/SectorRotation.jsp?id=${duration}&type=${sectorType}`;

        let url = 'https://www.tsrbt1.com/test/Nikhil/SectorRotation/poc7/SecTor.json'

        getData(url).then(data => {

            sectorData = data;

            paintBaseSectorAccordion();

            paintSectorTableContainer();
        });

    }
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
    html += `   <div id="${sectorTableId}">`;
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

    for (let i = 0; i < sectors.length; i++) {
        html += `<tr>`
        html += `   <td>`
        html += `       <div style="cursor: pointer;" onclick="showSectorCard('opSec', ${i})" class="link-primary">`
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


    html += `</tbody>`
    html += `</table>`;

    sectorTable.innerHTML = html;
}


function showSectorCard(sec, secId) {

    let sectorCardNav = document.getElementById("sectorCardNav");
    sectorCardNav.style.display = "flex";


    let sectorNav = {
        loop: true,
        margin: 10,
        dots: false
    }

    $(".sectorNav").owlCarousel(sectorNav);

    let sectorContainer = document.getElementById(sectorTableContainerId);
    sectorContainer.classList.remove("card");

    // showSectorCard('opSec', '${sectors[i].id}');

    let sectorInFocus = sectorData[sec][secId];

    let html = "";

    html += `<div class="owl-carousel owl-theme sectorCards mx-auto">`;
    html += `   <div class="container-md" data-hash="zero">`;
    html += `       <div class="card shadow">`
    html += `           <div class="card-header d-flex justify-content-between align-items-center" style="background: linear-gradient(135deg, #dbeafe, #f1f5ff);">`
    html += `              <div style="cursor: pointer" class="link-primary" onclick="showSectorTable()">`
    html += `                   <i class="fas fa-arrow-left"></i>`
    html += `                   &nbsp`;
    html += `                   Back`;
    html += `               </div>`;
    html += `               <h5 class="card-title" style="font-weight: 600;">`
    html += `                   ${option}`
    html += `               </h5>`

    html += `               <p style="margin: 0; color: gray;">`

    html += `                   <b>`
    html += `                       1<sup>st</sup> Rank`
    html += `                   </b>`
    html += `               </p>`
    html += `           </div>`
    html += `           <div class="card-body">`

    html += `           <div class="row text-center">`

    html += `<h6 class="">`
    html += `<a href="">`
    html += `View in Depth Analysis`
    html += `<i class="fas fa-external-link-square-alt"></i>`
    html += `</a>`
    html += `</h6>`
    html += `</div>`

    html += `<div class="row">

                <div class="col col-md-6 p-3">
                    <section class="mb-4">
                        <div class="mb-3 d-flex justify-content-between"
                            style="border-bottom: 1px solid lightgrey;">
                            <h6>Highlights</h6>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                            <div class="w-100 d-flex flex-column">
                                <span style="font-weight: 100;">
                                    Relative Returns
                                </span>
                                <h4 style="color: green; white-space: nowrap;">+ 15.73%
                                </h4>
                            </div>
                            <div class="w-100 d-flex flex-column">
                                <span style="font-weight: 100;">Market Cap Change</span>
                                <h4 style="color: green; white-space: nowrap;">234 Cr.
                                </h4>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                            <div class="w-100 d-flex flex-column">
                                <span style="font-weight: 100;">Outperformers <i
                                    class="fas fa-long-arrow-alt-up"></i></span>
                                <h4>5</h4>
                            </div>
                            <div class="w-100 d-flex flex-column">
                                <span style="font-weight: 100;">Underperformers <i
                                    class="fas fa-long-arrow-alt-down"></i></span>
                                <h4>1</h4>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                            <div class="w-100 d-flex flex-column">
                                <span style="font-weight: 100;">Price</span>
                                <h4 style="color: green; white-space: nowrap;">
                                    20,013.65
                                </h4>
                            </div>
                            <div class="w-100 d-flex flex-column">
                                <span style="font-weight: 100;">Price Change %</span>
                                <h4 style="color: green; white-space: nowrap;"> 3.1 %
                                </h4>
                            </div>
                        </div>
                    </section>

                    <section class="mb-4">
                        <div class="mb-3" style="border-bottom: 1px solid lightgrey;">
                            <h6>Periodic Returns</h6>
                        </div>
                        <div class="owl-carousel owl-theme periodicReturns">
                            <div class="card d-flex flex-column p-3">
                                <h6>1D</h6>
                                <h5 style="color: green; white-space: nowrap;">+ 5.73%
                                </h5>
                            </div>
                            <div class="card d-flex flex-column p-3">
                                <h6>1M</h6>
                                <h5 style="color: green; white-space: nowrap;">+ 15.73%
                                </h5>
                            </div>
                            <div class="card d-flex flex-column p-3">
                                <h6>3M</h6>
                                <h5 style="color: green; white-space: nowrap;">+ 1.73%
                                </h5>
                            </div>
                            <div class="card d-flex flex-column p-3">
                                <h6>6M</h6>
                                <h5 style="color: red; white-space: nowrap;">- 0.73%
                                </h5>
                            </div>
                            <div class="card d-flex flex-column p-3">
                                <h6>1Y</h6>
                                <h5 style="color: green; white-space: nowrap;">+ 5.73%
                                </h5>
                            </div>
                            <div class="card d-flex flex-column p-3">
                                <h6>5Y</h6>
                                <h5 style="color: green; white-space: nowrap;">+ 2.73%
                                </h5>
                            </div>
                        </div>

                    </section>

                    <section class="mb-4">
                        <div class="mb-3" style="border-bottom: 1px solid lightgrey;">
                            <h6>Analysis</h6>
                        </div>
                        <p>
                            The <b>NIFTY IT</b> Sector rose by <b style="color: green;">11.17%</b>
                            over the <b>quarter</b>, while the <b>Nifty 50</b> changed
                            <b style="color: green">4.08%</b>
                        </p>

                    </section>


                    <section>
                        <div>
                            <p style="text-align:center; margin-bottom: 10px; font-weight: 600;">
                                TSR
                                Strength Index</p>
                            <div class="row tsr_strength_svg_container">
                                <div id="trendStrengthDiv" class="d-flex justify-content-center">

                                    <svg width="250" height="43">
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%"
                                                spreadMethod="pad">
                                                <stop offset="0%" stop-color="#ff0000" stop-opacity="1">
                                                </stop>
                                                <stop offset="50%" stop-color="#e6e600" stop-opacity="1">
                                                </stop>
                                                <stop offset="100%" stop-color="#009900" stop-opacity="1">
                                                </stop>
                                            </linearGradient>
                                        </defs>
                                        <g><text x="180" y="10" text-anchor="end"
                                            style="font-size: 12px; font-weight: bold;">Technical
                                            Strength
                                            Intraday</text></g>
                                        <g>
                                            <rect x="0" y="15" width="240" height="8"
                                                style="fill: url(&quot;#gradient&quot;);" rx="4">
                                            </rect>
                                        </g>
                                        <g>
                                            <line x1="158.88" y1="15" x2="158.88" y2="23" stroke-width="1"
                                                stroke-dasharray="2, 2" stroke="black ">
                                            </line>
                                        </g>
                                        <path d="M0,-7.019L6.079,3.51L-6.079,3.51Z" fill="#000" stroke="#000"
                                            stroke-width="1" transform="translate(158.88,25)">
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
                                        <span><span style="color:#008B00;;  ">Bullish</span></span>
                                    </div>
                                    <br>
                                        <div class="d-flex justify-content-center" id="strRank">
                                            <span style="font-size: 12x;  "> NIFTY IT is
                                                more
                                                bullish than
                                                85.50 % of
                                                stocks </span>
                                        </div>



                                </div>
                            </div>
                        </div>
                    </section>


                </div>


                <!-- <div style="min-width: 1px; background-color: lightgray; padding: 0;" class="d-none d-md-block col-md-2 vr"></div> -->


                <div class="col col-md-6 p-3">

                    <section class="mb-4">
                        <div class="mb-3" style="border-bottom: 1px solid lightgrey;">
                            <h6>Technicals</h6>
                        </div>
                        <div class="owl-carousel owl-theme technicals">
                            <div class="card d-flex flex-column p-3">
                                <h6>RSI</h6>
                                <h4 style="color: orange; white-space: nowrap;">58.18
                                </h4>
                                <p style="color: orange;  margin: 0;">Neutral</p>
                            </div>
                            <div class="card d-flex flex-column p-3">
                                <h6>MACD</h6>
                                <h4 style="color: green; white-space: nowrap;">15.73
                                </h4>
                                <p style="color: green;  margin: 0;">Bullish</p>
                            </div>
                            <div class="card d-flex flex-column p-3">
                                <h6>ADX</h6>
                                <h4 style="color: #ff9999; white-space: nowrap;"> 11.73
                                </h4>
                                <p style="color: #ff9999;  margin: 0;">Mild Bearish</p>
                            </div>
                            <div class="card d-flex flex-column p-3">
                                <h6>SMA</h6>
                                <h4 style="color: black; white-space: nowrap;">0.73</h4>
                                <p style="color: black; margin: 0;"></p>
                            </div>
                            <div class="card d-flex flex-column p-3">
                                <h6>EMA</h6>
                                <h4 style="color: #96C8A2; white-space: nowrap;">5.73
                                </h4>
                                <p style="color: #96C8A2; margin: 0;">Mild Bullish</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div class="mb-3" style="border-bottom: 1px solid lightgrey;">
                            <h6>Stocks</h6>
                        </div>
                        <div class="text-center">
                            <div class="w-100 p-3 text-center">
                                <b>Out Performing</b>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">vs Nifty</th>
                                            <th scope="col">vs NIFTY IT</th>
                                            <th scope="col">Chart</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><a href="">TCS</a></td>
                                            <td>13.17%</td>
                                            <td>3.17%</td>
                                            <td>
                                                <a href=""><span style="color:grey; font-size:12pt;"
                                                    class="fa fa-chart-line"></span></a>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><a href="">WIPRO</a></td>
                                            <td>13.17%</td>
                                            <td>3.17%</td>
                                            <td>
                                                <a href=""><span style="color:grey; font-size:12pt;"
                                                    class="fa fa-chart-line"></span></a>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><a href="">INFY</a></td>
                                            <td>13.17%</td>
                                            <td>3.17%</td>
                                            <td>
                                                <a href=""><span style="color:grey; font-size:12pt;"
                                                    class="fa fa-chart-line"></span></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="w-100 p-3 text-center">
                                <b>Under Performing</b>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">vs NIFTY</th>
                                            <th scope="col">vs NIFTY IT</th>
                                            <th scope="col">Chart</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><a href="">TCS</a></td>
                                            <td>13.17%</td>
                                            <td>3.17%</td>
                                            <td>
                                                <a href=""><span style="color:grey; font-size:12pt;"
                                                    class="fa fa-chart-line"></span></a>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><a href="">WIPRO</a></td>
                                            <td>13.17%</td>
                                            <td>3.17%</td>
                                            <td>
                                                <a href=""><span style="color:grey; font-size:12pt;"
                                                    class="fa fa-chart-line"></span></a>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><a href="">INFY</a></td>
                                            <td>13.17%</td>
                                            <td>3.17%</td>
                                            <td>
                                                <a href=""><span style="color:grey; font-size:12pt;"
                                                    class="fa fa-chart-line"></span></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <a style="color: var(--primary-color,#006aff); cursor: pointer;"
                                onclick="showSectorStockTable(this, 1)">
                                Show more
                            </a>
                        </div>
                    </section>

                </div>

            </div>


        </div >
            </div >
        </div >
        `

    // TO DO SHOW MORE STOCKS
    html += `</div > `;



    // sectorContainer.scrollIntoView();
    initializeCarousal();
};
