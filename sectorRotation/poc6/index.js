
var sectorContainerId = "tsrSectorContainer";
var sectorStocksTableId = "sectorStocksTable";

function showSectorTable() {


    let sectorCardNav = document.getElementById("sectorCardNav");
    sectorCardNav.style.display = "none";

    let sectorContainer = document.getElementById(sectorContainerId);

    sectorContainer.innerHTML = `
        
                            <div class="card-header">
                                <h5>Overview</h5>
                            </div>


                            <div class="card-body p-3" style="max-height: 60vh; overflow-y: auto;">
                                <table class="table table-striped">
                                    <thead style="font-size: 14px;">
                                        <tr>
                                            <th>Name</th>
                                            <th>Market Cap Change</th>
                                            <th>Outperforming</th>
                                            <th>Underperforming</th>
                                            <th>RSI Above 50% Stocks</th>
                                            <th>MACD Above 50% Stocks</th>
                                        </th>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>
                                                <div style="cursor: pointer;" onclick="showSectorCard('NIFTY IT')"
                                                    class="link-primary link-underline-primary link-offset-3">
                                                    NIFTY IT
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    20 Cr.
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    7
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #ff4f55;">
                                                    3
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    4
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    6
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div style="cursor: pointer;" onclick="showSectorCard('NIFTY MEDIA')"
                                                    class="link-primary link-underline-primary link-offset-3">
                                                    NIFTY MEDIA
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    7 Cr.
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    2
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #ff4f55;">
                                                    3
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    2
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    3
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div style="cursor: pointer;" onclick="showSectorCard('NIFTY AUTO')"
                                                    class="link-primary link-underline-primary link-offset-3">
                                                    NIFTY AUTO
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    5 Cr.
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    1
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #ff4f55;">
                                                    1
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    1
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    1
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div style="cursor: pointer;" onclick="showSectorCard('NIFTY FMCG')"
                                                    class="link-primary link-underline-primary link-offset-3">
                                                    NIFTY FMCG
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    2 Cr.
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    2
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #ff4f55;">
                                                    1
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    2
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    1
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div style="cursor: pointer;" onclick="showSectorCard('NIFTY PHARMA')"
                                                    class="link-primary link-underline-primary link-offset-3">
                                                    NIFTY PHARMA
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #ff4f55;">
                                                    1 Cr.
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    3
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #ff4f55;">
                                                    2
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    1
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    4
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style="cursor: pointer;" onclick="showSectorCard('NIFTY IT')"
                                                    class="link-primary link-underline-primary link-offset-3">
                                                    NIFTY IT
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    20 Cr.
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    7
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #ff4f55;">
                                                    3
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    4
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    6
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div style="cursor: pointer;" onclick="showSectorCard('NIFTY MEDIA')"
                                                    class="link-primary link-underline-primary link-offset-3">
                                                    NIFTY MEDIA
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    7 Cr.
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    2
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #ff4f55;">
                                                    3
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    2
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    3
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div style="cursor: pointer;" onclick="showSectorCard('NIFTY AUTO')"
                                                    class="link-primary link-underline-primary link-offset-3">
                                                    NIFTY AUTO
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    5 Cr.
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    1
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #ff4f55;">
                                                    1
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    1
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    1
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div style="cursor: pointer;" onclick="showSectorCard('NIFTY FMCG')"
                                                    class="link-primary link-underline-primary link-offset-3">
                                                    NIFTY FMCG
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    2 Cr.
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    2
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #ff4f55;">
                                                    1
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    2
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    1
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div style="cursor: pointer;" onclick="showSectorCard('NIFTY PHARMA')"
                                                    class="link-primary link-underline-primary link-offset-3">
                                                    NIFTY PHARMA
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #ff4f55;">
                                                    1 Cr.
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    3
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #ff4f55;">
                                                    2
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    1
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    4
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style="cursor: pointer;" onclick="showSectorCard('NIFTY IT')"
                                                    class="link-primary link-underline-primary link-offset-3">
                                                    NIFTY IT
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    20 Cr.
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    7
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #ff4f55;">
                                                    3
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    4
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    6
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div style="cursor: pointer;" onclick="showSectorCard('NIFTY MEDIA')"
                                                    class="link-primary link-underline-primary link-offset-3">
                                                    NIFTY MEDIA
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    7 Cr.
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    2
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #ff4f55;">
                                                    3
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    2
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    3
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div style="cursor: pointer;" onclick="showSectorCard('NIFTY AUTO')"
                                                    class="link-primary link-underline-primary link-offset-3">
                                                    NIFTY AUTO
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    5 Cr.
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    1
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #ff4f55;">
                                                    1
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    1
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    1
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div style="cursor: pointer;" onclick="showSectorCard('NIFTY FMCG')"
                                                    class="link-primary link-underline-primary link-offset-3">
                                                    NIFTY FMCG
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    2 Cr.
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    2
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #ff4f55;">
                                                    1
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    2
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    1
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div style="cursor: pointer;" onclick="showSectorCard('NIFTY PHARMA')"
                                                    class="link-primary link-underline-primary link-offset-3">
                                                    NIFTY PHARMA
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #ff4f55;">
                                                    1 Cr.
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #31a745;">
                                                    3
                                                </div>
                                            </td>
                                            <td>
                                                <div style="color: #ff4f55;">
                                                    2
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    1
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    4
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
    `;

}

function showSectorCard(option) {

    let sectorCardNav = document.getElementById("sectorCardNav");
    sectorCardNav.style.display = "flex";


    let sectorNav = {
        loop: true,
        margin: 10,
        dots: false
    }

    $(".sectorNav").owlCarousel(sectorNav);


    let sectorContainer = document.getElementById(sectorContainerId);

    sectorContainer.innerHTML = `
        <div class="card-header d-flex justify-content-between align-items-center"
                    style="background: linear-gradient(135deg, #dbeafe, #f1f5ff);">


                    <div style="cursor: pointer" class="link-primary" onclick="showSectorTable()">
                        <i class="fas fa-arrow-left"></i>
                        &nbsp;
                        Back
                    </div>

                    <h5 class="card-title" style="font-weight: 600;">
                        ${option}
                    </h5>

                    <!-- <p style="border: 1px solid lightgray; border-radius: 50%; padding:0 5px 0 5px; margin: 0;"> -->

                    <p style="margin: 0; color: gray;">

                        <b>
                            <!-- RANK 1 -->
                            1<sup>st</sup> Rank
                        </b>
                    </p>


                </div>
                <div class="card-body">

                    <div class="row">

                        <div class="col col-md-6 p-3">
                            <section class="mb-4">
                                <div class="mb-3" style="border-bottom: 1px solid lightgrey;">
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
                                        <span style="font-weight: 100;">Up Times <i
                                                class="fas fa-long-arrow-alt-up"></i></span>
                                        <h4>5</h4>
                                    </div>
                                    <div class="w-100 d-flex flex-column">
                                        <span style="font-weight: 100;">Down times <i
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
                                    The <b>NIFTY IT</b> Sector rose by <b
                                        style="color: green;">11.17%</b>
                                    over the <b>quarter</b>, while the <b>Nifty 50</b> changed
                                    <b style="color: green">4.08%</b>
                                </p>

                            </section>


                            <section>
                                <div>
                                    <p
                                        style="text-align:center; margin-bottom: 10px; font-weight: 600;">
                                        TSR
                                        Strength Index</p>
                                    <div class="row tsr_strength_svg_container">
                                        <div id="trendStrengthDiv"
                                            class="d-flex justify-content-center">

                                            <svg width="250" height="43">
                                                <defs>
                                                    <linearGradient id="gradient" x1="0%"
                                                        y1="0%" x2="100%" y2="0%"
                                                        spreadMethod="pad">
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
                                                    <line x1="158.88" y1="15" x2="158.88"
                                                        y2="23" stroke-width="1"
                                                        stroke-dasharray="2, 2" stroke="black ">
                                                    </line>
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
                                            <div class="d-flex justify-content-around"
                                                id="strSig">
                                                Signal
                                                <span><span
                                                        style="color:#008B00;;  ">Bullish</span></span>
                                            </div>
                                            <br>
                                            <div class="d-flex justify-content-center"
                                                id="strRank">
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
                                                        <a href=""><span
                                                                style="color:grey; font-size:12pt;"
                                                                class="fa fa-chart-line"></span></a>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td><a href="">WIPRO</a></td>
                                                    <td>13.17%</td>
                                                    <td>3.17%</td>
                                                    <td>
                                                        <a href=""><span
                                                                style="color:grey; font-size:12pt;"
                                                                class="fa fa-chart-line"></span></a>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td><a href="">INFY</a></td>
                                                    <td>13.17%</td>
                                                    <td>3.17%</td>
                                                    <td>
                                                        <a href=""><span
                                                                style="color:grey; font-size:12pt;"
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
                                                        <a href=""><span
                                                                style="color:grey; font-size:12pt;"
                                                                class="fa fa-chart-line"></span></a>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td><a href="">WIPRO</a></td>
                                                    <td>13.17%</td>
                                                    <td>3.17%</td>
                                                    <td>
                                                        <a href=""><span
                                                                style="color:grey; font-size:12pt;"
                                                                class="fa fa-chart-line"></span></a>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td><a href="">INFY</a></td>
                                                    <td>13.17%</td>
                                                    <td>3.17%</td>
                                                    <td>
                                                        <a href=""><span
                                                                style="color:grey; font-size:12pt;"
                                                                class="fa fa-chart-line"></span></a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <a style="color: var(--primary-color,#006aff); cursor: pointer;" onclick="showSectorStockTable(this)">
                                        Show more
                                    </a>
                                </div>
                            </section>

                        </div>

                    </div>

                    <div class="row">
                        <div class="sectorStocksContainer p-3" style=" visibility: hidden;
                                max-height: 75vh;
                                height: 0px;
                                overflow-y: auto;
                                transition: height 0.5s ease-out;">
                                
                                <div class="mb-3" style="border-bottom: 1px solid lightgrey;">
                                    <h5>Stocks</h5>
                                </div>


                            <div class="mb-3 btn-group" role="group">
  <input type="radio" class="btn-check" name="btnradio" id="outPerformingStocks" autocomplete="off" checked>
  <label class="btn btn-outline-secondary" for="outPerformingStocks"  onclick="updateSectorStocksTable('outPerforming')">Out Performing</label>

  <input type="radio" class="btn-check" name="btnradio" id="underPerformingStocks" autocomplete="off">
  <label class="btn btn-outline-secondary" for="underPerformingStocks" onclick="updateSectorStocksTable('underPerforming')">Under Performing</label>
</div>

                            <table id="${sectorStocksTableId}" class="table">
                             
                            </table>
                        </div>
                        
                    </div>
                </div>
    `;



    // sectorContainer.scrollIntoView();
    initializeCarousal();
};

function initializeCarousal() {

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


    $(".periodicReturns").owlCarousel(periodicReturns);

    $(".technicals").owlCarousel(technicals);

};

function showSectorStockTable(element) {

    element.style.display = "none";

    let container = document.getElementsByClassName("sectorStocksContainer")[0];

    updateSectorStocksTable("outPerforming");

    container.scrollIntoView();

    setTimeout(function () {
        container.style.visibility = "visible";
        container.style.height = "75vh";
    }, 100);



};

function updateSectorStocksTable(option) {

    let sectorStocksTable = document.getElementById(sectorStocksTableId);
    if (option == "outPerforming") {
        sectorStocksTable.innerHTML = `
            <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Field 1</th>
                                        <th>Field 2</th>
                                        <th>Field 3</th>
                                        <th>Field 4</th>
                                        <th>Field 5</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>TCS</td>
                                        <td>23</td>
                                        <td>67</td>
                                        <td>Bullish</td>
                                        <td>12</td>
                                        <td>221</td>
                                    </tr>
                                    <tr>
                                        <td>INFY</td>
                                        <td>18</td>
                                        <td>54</td>
                                        <td>Bullish</td>
                                        <td>8</td>
                                        <td>198</td>
                                    </tr>
                                    <tr>
                                        <td>WIPRO</td>
                                        <td>12</td>
                                        <td>45</td>
                                        <td>Neutral</td>
                                        <td>5</td>
                                        <td>142</td>
                                    </tr>
                                    <tr>
                                        <td>HCLTECH</td>
                                        <td>20</td>
                                        <td>60</td>
                                        <td>Bullish</td>
                                        <td>10</td>
                                        <td>210</td>
                                    </tr>
                                    <tr>
                                        <td>LT</td>
                                        <td>9</td>
                                        <td>38</td>
                                        <td>Bearish</td>
                                        <td>3</td>
                                        <td>95</td>
                                    </tr>
                                    <tr>
                                        <td>HDFC</td>
                                        <td>16</td>
                                        <td>50</td>
                                        <td>Bullish</td>
                                        <td>7</td>
                                        <td>176</td>
                                    </tr>
                                    <tr>
                                        <td>ICICI</td>
                                        <td>14</td>
                                        <td>48</td>
                                        <td>Neutral</td>
                                        <td>6</td>
                                        <td>154</td>
                                    </tr>
                                    <tr>
                                        <td>SBIN</td>
                                        <td>11</td>
                                        <td>42</td>
                                        <td>Bearish</td>
                                        <td>4</td>
                                        <td>132</td>
                                    </tr>
                                    <tr>
                                        <td>KOTAK</td>
                                        <td>17</td>
                                        <td>55</td>
                                        <td>Bullish</td>
                                        <td>9</td>
                                        <td>189</td>
                                    </tr>
                                    <tr>
                                        <td>AXIS</td>
                                        <td>10</td>
                                        <td>40</td>
                                        <td>Neutral</td>
                                        <td>4</td>
                                        <td>120</td>
                                    </tr>
                                    <tr>
                                        <td>JSW</td>
                                        <td>13</td>
                                        <td>46</td>
                                        <td>Bullish</td>
                                        <td>6</td>
                                        <td>160</td>
                                    </tr>
                                    <tr>
                                        <td>RELIANCE</td>
                                        <td>25</td>
                                        <td>70</td>
                                        <td>Bullish</td>
                                        <td>15</td>
                                        <td>240</td>
                                    </tr>
                                    <tr>
                                        <td>MARUTI</td>
                                        <td>8</td>
                                        <td>36</td>
                                        <td>Bearish</td>
                                        <td>2</td>
                                        <td>88</td>
                                    </tr>
                                    <tr>
                                        <td>BAJAJ</td>
                                        <td>19</td>
                                        <td>58</td>
                                        <td>Bullish</td>
                                        <td>11</td>
                                        <td>202</td>
                                    </tr>
                                    <tr>
                                        <td>LTIM</td>
                                        <td>15</td>
                                        <td>52</td>
                                        <td>Neutral</td>
                                        <td>7</td>
                                        <td>170</td>
                                    </tr>
                                    <tr>
                                        <td>SUNPHARMA</td>
                                        <td>12</td>
                                        <td>44</td>
                                        <td>Bullish</td>
                                        <td>5</td>
                                        <td>148</td>
                                    </tr>
                                    <tr>
                                        <td>DRREDDY</td>
                                        <td>14</td>
                                        <td>49</td>
                                        <td>Neutral</td>
                                        <td>6</td>
                                        <td>156</td>
                                    </tr>
                                    <tr>
                                        <td>HINDUNILVR</td>
                                        <td>21</td>
                                        <td>62</td>
                                        <td>Bullish</td>
                                        <td>12</td>
                                        <td>204</td>
                                    </tr>
                                    <tr>
                                        <td>ITC</td>
                                        <td>7</td>
                                        <td>30</td>
                                        <td>Bearish</td>
                                        <td>1</td>
                                        <td>75</td>
                                    </tr>
                                    <tr>
                                        <td>BHARTI</td>
                                        <td>22</td>
                                        <td>65</td>
                                        <td>Bullish</td>
                                        <td>13</td>
                                        <td>215</td>
                                    </tr>
                                </tbody>
        `;
    } else if (option == "underPerforming") {
        sectorStocksTable.innerHTML = `
            <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Field 1</th>
                                        <th>Field 2</th>
                                        <th>Field 3</th>
                                        <th>Field 4</th>
                                        <th>Field 5</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>TCS</td>
                                        <td>23</td>
                                        <td>67</td>
                                        <td>Bullish</td>
                                        <td>12</td>
                                        <td>221</td>
                                    </tr>
                                    <tr>
                                        <td>INFY</td>
                                        <td>18</td>
                                        <td>54</td>
                                        <td>Bullish</td>
                                        <td>8</td>
                                        <td>198</td>
                                    </tr>
                                    <tr>
                                        <td>WIPRO</td>
                                        <td>12</td>
                                        <td>45</td>
                                        <td>Neutral</td>
                                        <td>5</td>
                                        <td>142</td>
                                    </tr>
                                    <tr>
                                        <td>HCLTECH</td>
                                        <td>20</td>
                                        <td>60</td>
                                        <td>Bullish</td>
                                        <td>10</td>
                                        <td>210</td>
                                    </tr>
                                    <tr>
                                        <td>LT</td>
                                        <td>9</td>
                                        <td>38</td>
                                        <td>Bearish</td>
                                        <td>3</td>
                                        <td>95</td>
                                    </tr>
                                </tbody>
        `;
    }
}

showSectorTable();