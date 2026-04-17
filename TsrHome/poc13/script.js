

let jsu = mintJsUtil;

function init() {




    let carousalDef3 = {
        loop: false,
        dots: false,
        // margin: 5,s
        stagePadding: 10,
        autoWidth: true
    };

    initCarousal(true, carousalDef3, "tsrToolCatSelector");
    showUseCasesByCat(null, "marketOverview");
}

var url = "./Marquee.json";

var reportJson = null;

// STEPS:
// GET REPORT JSON ON PAGE LOAD
// PRINT MARQUEE CONTENT
// WAIT FOR 55 seconds before hitting server again
// ON GETTING NEW REPORT JSON UPDATE MARQUEE CONTENT

// ! BUT WAIT, SERVER TIME MATTERS HERE. BUT HOW ?
// * DIFFERENCE IN SERVER TIME GIVES RISE TO A DELTA
// * WE NEED TO GET NEW REPORT JSON & UPDATE MARQUEE AFTER DELTA TIME
// * THEN CONTINUE UPDATING EVERY 55 SECONDS PROVIDED WE GET NEW REPORT JSON

// * NEW REPORT JSON WILL HAVE LATER TIME THAN ORIGINAL REPORT JSON

// * MKT_HOURS CONDITION


// * PSEUDO CODE
// * printMarquee()
// *    if(reportJson)
// *        print Marquee
// *        calc. delta
// *        wait for delta seconds
// *        get new reportJson
// *        refreshed = true;
// *        printMarquee()
// *    else
// *        
// *    

// async function getReportJson() {
//     let data = await fetch(url);
//     reportJson = data.json();
// }

// var refresh = false;

// function paintMarquee() {
//     if (jsu.isNotNull(reportJson)) {

//         if (mtgv.mktDet.mktHours) {

//             // ! Convert into seconds
//             let serverTime = mtgv.mktDet.serverTime;
//             let ogReportGenTime = reportJson.reportGenTime;

//             let delta = 60 - (serverTime - ogReportGenTime);
//             setTimeout(() => {
//                 getReportJson();
//                 let reportTime = reportJson.reportGenTime;
//                 if (reportTime > ogReportGenTime) {
//                     updateMarquee();
//                     refresh = true;
//                 }
//             }, delta * 1000);
//         }
//     } else {
//         setTimeout(() => {
//             getReportJson();
//             console.log("run after json is fetched", reportJson);
//             paintMarquee();
//         }, 250);
//     }
// }

// var refreshTimeInSec = 55;
// var retryTimeInSec = 3;

// function refreshMarquee() {
//     if (refresh) {
//         setTimeout(() => {
//             paintMarquee();
//             refreshMarquee();
//         }, refreshTimeInSec * 1000);
//     } else {
//         setTimeout(() => {
//             paintMarquee();
//             refreshMarquee();
//         }, retryTimeInSec * 1000);
//     }
// }

// refreshMarquee();

// PSEUDO CODE
// GET ogReportJson
// if (mkt_hours) {
//  if(ogReportTime < serverTime) {
//      let delta = 60 - (serverTime - ogReportTime); // TIME in seconds
//      setTimeout(()=>{
//          getReportJson();
//      }, delta);
//  }
// } else {
//  paintMarquee(ogReportJson)
// 
// }
// 

function initCarousal(nav, def, containerId) {
    let container = $("#" + containerId);
    let carousal = container.children(".owl-carousel");
    carousal.owlCarousel(def);

    if (nav) {
        let prevBtn = container.children(".tsrHomeOwlPrev");
        let nextBtn = container.children(".tsrHomeOwlNext");

        prevBtn.click(function () {
            carousal.trigger('prev.owl.carousel', [300]);
        });
        nextBtn.click(function () {
            carousal.trigger('next.owl.carousel', [300]); // [300] - optional speed parameter
        });

    }
}

function showUseCasesByCat(e, cat) {
    let buttons = document.querySelectorAll(".tsrToolCatSelectorPill");
    buttons.forEach(btn => btn.classList.remove("active"));

    if (jsu.isNotNull(e)) {
        e.target.classList.add("active");
    } else {
        let currButtonDesktop = document.getElementById("tsrHomeMarketOverviewBtnDesktop");
        let currButtonMobile = document.getElementById("tsrHomeMarketOverviewBtnMobile");
        currButtonDesktop.classList.add("active");
        currButtonMobile.classList.add("active");
    }

    let useCaseContainers = document.getElementsByClassName("tsrToolCatContainer");

    for (let i = 0; i < useCaseContainers.length; i++) {
        let container = useCaseContainers[i];
        container.innerHTML = "";
        container.style.display = "none";
    }

    let containerId = "";
    var html = "";

    html += ` 
            <button type="button" role="presentation" class="tsrHomeOwlPrev btn d-none d-md-block" style="box-shadow: none;">
                <span aria-label="Previous">
                    <i class="fas fa-angle-left"></i>
                </span>
            </button>
            `
    if (cat == "marketOverview") {
        containerId = "tsrMktOvrvwUcContainer";
        html += `
                    <div class="owl-carousel owl-theme">

                        <!-- Card 1 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-rocket"></i></div> -->
                                <h5>Market Insights</h5>
                                <p>360 Market Research</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Pre Market Highlights</li>
                                    <li>Strong Bullish Stocks</li>
                                    <li>Highest Turnover Stocks</li>
                                </ul>
                                <p style="margin: 0;">Suitable for <b>Intraday to Positional</b> Traders
                                </p>

                                <a href="https://www.tsrbt1.com/rt/Screener/Markets/MarketScreener" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 2 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-rocket"></i></div> -->
                                <h5>Buzzing Stocks</h5>
                                <p>Where activity spikes, opportunity strikes.</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Top Gainers / Losers</li>
                                    <li>Open Equals Low</li>
                                    <li>Gap Up</li>
                                </ul>
                                <p style="margin: 0;">Suitable for <b>Intraday to Swing</b> Traders
                                </p>

                                <a href="https://www.tsrbt1.com/rt/BuzzingStocks" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 3 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-bar"></i></div> -->
                                <h5>High / Low Stocks</h5>
                                <p>Buy Low, Sell High</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>52 Weeks High or Low</li>
                                    <li>Three Months High or Low</li>
                                    <li>Near Five Year High or Low</li>
                                </ul>
                                <p style="margin: 0;">Suitable for <b>Swing & Positional</b> Traders
                                </p>

                                <a href="https://www.tsrbt1.com/rt/Screener/Markets/HighsLows" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 4 -->

                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-line"></i></div> -->
                                <h5>Heatmap</h5>
                                <p>Markets painted in real-time emotion.</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>From 1 Min to Qtr Tick</li>
                                    <li>Custom Heatmap on Watchlist</li>
                                    <li>Charts on Move</li>
                                </ul>

                                <p style="margin: 0;">Suitable for <b>Intraday to Positional</b> Traders
                                </p>

                                <a href="https://www.tsrbt1.com/rt/Screener/Markets/HeatMap" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>

                            </div>
                        </div>

                        <!-- Card 5 -->

                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-bar"></i></div> -->
                                <h5>Relative Price Strength</h5>
                                <p>Stocks Beating Market.</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Out Performing Stocks vs Nifty</li>
                                    <li>Get High Returns Stocks</li>
                                    <li>Rank Stock as Per Performance</li>
                                </ul>

                                <p style="margin: 0;">Suitable for <b>Swing to Long Term Invester</b></p>

                                <a href="https://www.tsrbt1.com/rt/Screener/Markets/RelativeStrength" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>


                        <!-- Card 6 -->

                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-bar"></i></div> -->
                                <h5>Sector Rotation</h5>
                                <p>Track where money moves.</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>1 Day - 5 Years timeframe analysis</li>
                                    <li>Identify Top Stocks / Index / Sector</li>
                                    <li>AI-powered insights</li>
                                </ul>

                                <p style="margin: 0;">Suitable for <b>Swing & Positional</b> Traders</p>

                                <a href="https://www.tsrbt1.com/rt/Screener/Markets/SectorRotation" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>


                        <!-- Card 7 -->

                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-rocket"></i></div> -->
                                <h5>Advance and Decline</h5>
                                <p>Reveals the market's true breadth.</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Granularity @ Time Frame</li>
                                    <li>Plotted across various stock baskets.</li>
                                    <li>Combined view for broad & sector indices.</li>
                                </ul>
                                <p style="margin: 0;">Suitable for <b>Intraday to Positional</b> Traders
                                </p>

                                <a href="https://www.tsrbt1.com/rt/Screener/Markets/AdvanceDecline" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 8 -->

                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-bar"></i></div> -->
                                <h5>TSR Strength Index</h5>
                                <p>Trend is my friend.</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Find Strong Momentum Stocks</li>
                                    <li>Rank Company Performance</li>
                                    <li>Compare Strength with Peers</li>
                                </ul>

                                <p style="margin: 0;">Suitable for <b>Intraday to Swing</b> Traders</p>

                                <a href="https://www.tsrbt1.com/rt/Screener/TSRStrengthIndex/TechnicalStrength" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 9 -->
                            
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-bar"></i></div> -->
                                <h5>Guru Numbers</h5>
                                <p>Learn from Market Gurus.</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Altman Z Score</li>
                                    <li>Piotroski F Score</li>
                                    <li>Peter Lynch Fair Value</li>
                                </ul>

                                <p style="margin: 0;">Suitable for <b>Positional & Long Term Investor</b></p>

                                <a href="https://www.tsrbt1.com/rt/Screener/Financial/GuruRatios" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                        
                        
                    </div>



        `
    } else if (cat == "beginner") {
        containerId = "tsrBegUcContainer"
        html += `
                    <div class="owl-carousel owl-theme">

                        <!-- Card 1 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-rocket"></i></div> -->
                                <h5>Market Insights</h5>
                                <p>360 Market Research</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Pre Market Highlights</li>
                                    <li>Strong Bullish Stocks</li>
                                    <li>Highest Turnover Stocks</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Markets/MarketScreener" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 2 -->

                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-bar"></i></div> -->
                                <h5>Relative Price Strength</h5>
                                <p>Stocks Beating Market.</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Out Performing Stocks vs Nifty</li>
                                    <li>Get High Returns Stocks</li>
                                    <li>Rank Stock as Per Performance</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Markets/RelativeStrength" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>


                        <!-- Card 3 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-bar"></i></div> -->
                                <h5>Fundamental</h5>
                                <p>Reality behind the chart.
                                </p>
                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Undervalued Stocks</li>
                                    <li>High Growth Stocks</li>
                                    <li>Large Cap / Blue Chip Stocks</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Financial/ValuationRatios" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 4 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-bar"></i></div> -->
                                <h5>TSR Strength Index</h5>
                                <p>Trend is my friend.
                                </p>
                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Find Strong Momentum Stocks</li>
                                    <li>Rank Company Performance</li>
                                    <li>Compare Strength with Peers</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/TSRStrengthIndex/TechnicalStrength" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 5 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-bar"></i></div> -->
                                <h5>Heatmap</h5>
                                <p>Markets painted in real-time emotion.
                                </p>
                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>From 1 Min to Qtr Tick</li>
                                    <li>Custom Heatmap on Watchlist</li>
                                    <li>Charts on Move</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Markets/HeatMap" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 6 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-rocket"></i></div> -->
                                <h5>Advance and Decline</h5>
                                <p>Reveals the market's true breadth.</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Granularity @ Time Frame</li>
                                    <li>Plotted across various stock baskets.</li>
                                    <li>Combined view for broad & sector indices.</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Markets/AdvanceDecline" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>


                        <!-- Card 7 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-rocket"></i></div> -->
                                <h5>Stocks by Sector</h5>
                                <p>Discover Stocks That Lead</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Information Technology (IT)</li>
                                    <li>Banking & Financials</li>
                                    <li>Pharmaceuticals / Healthcare</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Markets/SectorAnalysis" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 8-->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-rocket"></i></div> -->
                                <h5>High / Low Stocks</h5>
                                <p>Buy Low, Sell High.</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>52 Weeks High or Low</li>
                                    <li>Three Months High or Low</li>
                                    <li>Near Five Year High or Low</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Markets/HighsLows" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 9 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-rocket"></i></div> -->
                                <h5>Moving Average</h5>
                                <p>Guiding through noise.</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Price Cross Above 100 MA</li>
                                    <li>Golden Cross - Where Big Investors Buy</li>
                                    <li>Death Cross - Where Big Investors Sell</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Technical/EMAScreener" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 10 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-rocket"></i></div> -->
                                <h5>Candlestick Patterns</h5>
                                <p>Each candle tells a story.</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Bullish Marubozu</li>
                                    <li>Gap Up</li>
                                    <li>Bullish Engulfing</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Candlestick/BullishScreener" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 11 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-rocket"></i></div> -->
                                <h5>Learn</h5>
                                <p>Learn Before You Earn.</p>                
                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <!-- <li>Tutorials</li>
                                    <li>TSR Videos</li>
                                    <li>eBooks</li> -->
                                    <li><a href="https://tutorials.tsrbt1.com">Tutorials</a></li>                                                   
                                    <li><a href="https://www.youtube.com/watch?v=v4Hp02h_XXQ">TSR Videos</a></li>
                                    <li><a href="https://www.tsrbt1.com/rt/Ebooks">eBooks</a></li>
                                </ul>
                                <a href="https://tutorials.tsrbt1.com" class="tsrToolCta">Start Now <i
                                    class="fas fa-arrow-right"></i></a>                                                
                            </div>
                        </div>

                    </div>
        `
    } else if (cat == "scalpingIntraday") {
        containerId = "tsrIntradayUcContainer";
        html += `                    
                <div class="owl-carousel owl-theme">

                    <!-- Card 1 -->
                    <div class="item">
                        <div class="tsrToolCard">
                            <!-- <div class="tsr-icon"><i class="fas fa-rocket"></i></div> -->
                            <h5>Market Insights</h5>
                            <p>360 Market Research</p>

                            <ul
                                style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                <li>Pre Market Highlights</li>
                                <li>Strong Bullish Stocks</li>
                                <li>Highest Turnover Stocks</li>
                                <li>High Average Volume Stocks</li>                                                    
                            </ul>
                            <a href="https://www.tsrbt1.com/rt/Screener/Markets/MarketScreener" class="tsrToolCta">Start Now <i
                                    class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>

                    <!-- Card 2 -->
                    <div class="item">
                        <div class="tsrToolCard">
                            <!-- <div class="tsr-icon"><i class="fas fa-chart-line"></i></div> -->
                            <h5>Intraday Screeners</h5>
                            <p>Real Time. Real Opportunities.
                            </p>

                            <ul
                                style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                <li>Pre Market Screeners</li>
                                <li>OHLC Screeners</li>
                                <li>VWAP Screeners</li>
                                <li>Open Range Strategies</li>
                            </ul>
                            <a href="https://www.tsrbt1.com/rt/Screener/Markets/PriceVolume" class="tsrToolCta">Start Now <i
                                    class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>

                    <!-- Card 3 -->
                    <div class="item">
                        <div class="tsrToolCard">
                            <!-- <div class="tsr-icon"><i class="fas fa-rocket"></i></div> -->
                            <h5>Buzzing Stocks</h5>
                            <p>Where activity spikes, opportunity strikes.</p>

                            <ul
                                style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                <li>Top Gainers / Losers</li>
                                <li>Open Equal Low</li>
                                <li>Volume Jump</li>
                                <li>Gap Up</li>
                            </ul>
                            <a href="https://www.tsrbt1.com/rt/BuzzingStocks" class="tsrToolCta">Start Now <i
                                    class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>

                    <!-- Card 4 -->
                    <div class="item">
                        <div class="tsrToolCard">
                            <!-- <div class="tsr-icon"><i class="fas fa-chart-bar"></i></div> -->
                            <h5>Heatmap</h5>
                            <p>Markets painted in real-time emotion.</p>

                            <ul
                                style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                <li>From 1 Min to Qtr Tick</li>
                                <li>Custom Heatmap on Watchlist</li>
                                <li>Charts on Move</li>
                                <li>Eye-Soothing Colors</li>
                            </ul>
                            <a href="https://www.tsrbt1.com/rt/Screener/Markets/HeatMap" class="tsrToolCta">Start Now <i
                                    class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>

                    <!-- Card 5 -->
                    <div class="item">
                        <div class="tsrToolCard">
                            <!-- <div class="tsr-icon"><i class="fas fa-chart-bar"></i></div> -->
                            <h5>Popular Screeners</h5>
                            <p>Trade with proven scans.</p>

                            <ul
                                style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                <li>9 & 21 EMA Crossover</li>
                                <li>Oversold stocks (RSI Above 30)</li>
                                <li>MACD Bullish Crossover</li>
                                <li>Supertrend Crossover</li>
                            </ul>
                            <a href="https://www.tsrbt1.com/rt/Screener/Technical/OverboughtSold" class="tsrToolCta">Start Now <i
                                    class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>                  

                    <!-- Card 6 -->
                    <div class="item">
                        <div class="tsrToolCard">
                            <!-- <div class="tsr-icon"><i class="fas fa-chart-bar"></i></div> -->
                            <h5>Expert Strategies</h5>
                            <p>Built for Smart Decisions.</p>

                            <ul
                                style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                <li>Intraday Strategies</li>
                                <li>Scalping Strategies</li>
                                <li>Price Action Strategies</li>
                                <li>Breakout Strategies</li>
                            </ul>
                            <a href="https://www.tsrbt1.com/rt/Screener/ExpertScreener/IntradayTradingStrategies" class="tsrToolCta">Start Now <i
                                    class="fas fa-arrow-right"></i></a>
                        </div>
                    </div> 

                    <!-- Card 7 -->
                    <div class="item">
                        <div class="tsrToolCard">
                            <!-- <div class="tsr-icon"><i class="fas fa-chart-bar"></i></div> -->
                            <h5>Advance and Decline</h5>
                            <p>Reveals the market's true breadth.</p>

                            <ul
                                style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                <li>Granularity @ Time Frame</li>
                                <li>Plotted across various stock baskets</li>
                                <li>Combined view for broad & sector indices</li>
                                <li>Filter Rising vs Falling Stocks</li>
                            </ul>
                            <a href="https://www.tsrbt1.com/rt/Screener/Markets/AdvanceDecline" class="tsrToolCta">Start Now <i
                                    class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>                                                                                 

                    <!-- Card 8 -->
                    <div class="item">
                        <div class="tsrToolCard">
                            <!-- <div class="tsr-icon"><i class="fas fa-chart-bar"></i></div> -->
                            <h5>TSR Strength Index</h5>
                            <p>Trend is my friend.</p>

                            <ul
                                style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                <li>Find Strong Momentum Stocks</li>
                                <li>Rank Company Performance</li>
                                <li>Compare Strength with Peers</li>
                                <li>Filters Strong vs Weak</li>
                            </ul>
                            <a href="https://www.tsrbt1.com/rt/Screener/TSRStrengthIndex/TechnicalStrength" class="tsrToolCta">Start Now <i
                                    class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>


                </div>

        `
    } else if (cat == "swingPositional") {
        containerId = "tsrSwingUcContainer";
        html += `
                    <div class="owl-carousel owl-theme">


                        <!-- Card 1 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-rocket"></i></div> -->
                                <h5>Market Insights</h5>
                                <p>360 Market Research</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Strong Bullish Stocks</li>
                                    <li>Highest Turnover Stocks</li>
                                    <li>High Average Volume Stocks</li>
                                    <li>Recovery From Low Stocks</li>                                              
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Markets/MarketScreener" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>


                        <!-- Card 2 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-line"></i></div> -->
                                <h5>Swing Trading Screeners</h5>
                                <p>Find the next swing opportunity.
                                </p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Swing Trading Strategies</li>
                                    <li>Demand & Supply Zones</li>
                                    <li>Breakout and Breakdown</li>
                                    <li>High / Low Beta Stocks</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/ExpertScreener/SwingTradingStrategies" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 3 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-line"></i></div> -->
                                <h5>Relative Price Strength</h5>
                                <p>Stocks Beating Market.
                                </p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Out Performing Stocks vs Nifty</li>
                                    <li>Get High Returns Stocks</li>
                                    <li>Rank Stock as Per Performance</li>
                                    <li>1 Week to 10 Year Relative Strength</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Markets/RelativeStrength" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 4 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-bar"></i></div> -->
                                <h5>TSR Strength Index</h5>
                                <p>Trend is my friend.</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Find Strong Momentum Stocks</li>
                                    <li>Rank Company Performance</li>
                                    <li>Compare Strength with Peers</li>
                                    <li>Filters Strong vs Weak</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/TSRStrengthIndex/TechnicalStrength" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>


                        <!-- Card 5 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-rocket"></i></div> -->
                                <h5>Sector Rotation</h5>
                                <p>Track where money moves.</p>
                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>1 Day - 5 Years timeframe analysis</li>
                                    <li>Identify Top Stocks / Index / Sector</li>
                                    <li>AI-powered insights</li>
                                    <li>Visualize sector strength in charts</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Markets/SectorRotation" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 6 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <h5>Technical Indicators</h5>
                                <p>Signals built on price.
                                </p>
                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Oversold stocks (RSI Above 30)</li>
                                    <li>MACD Bullish Crossover</li>
                                    <li>Supertrend Crossover</li>
                                    <li>Bollinger Band Crossover</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Technical/OverboughtSold" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 7 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <h5>Moving Average</h5>
                                <p>Guiding through noise.
                                </p>
                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Price Cross Above 100 MA</li>
                                    <li>Golden Cross - 50 CA 200 MA</li>
                                    <li>Death Cross - 50 CB 200 MA</li>
                                    <li>Trending Moving Average</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Technical/EMAScreener" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 8 -->
                        <div class="item">
                            <div class="tsrToolCard">

                                <h5>Candlestick Patterns</h5>
                                <p>Each candle tells a story.
                                </p>
                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Bullish Marubozu</li>
                                    <li>Bullish Engulfing</li>
                                    <li>Morning Star</li>
                                    <li>Hammer</li>
                                </ul>

                                <a href="https://www.tsrbt1.com/rt/Screener/Candlestick/BullishScreener" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 9 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <h5>Patterns</h5>
                                <p>Price forms, patterns inform.
                                </p>
                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Double Bottom</li>
                                    <li>Trendline</li>
                                    <li>Triangle</li>
                                    <li>Channel</li>
                                </ul>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/ChartPatterns/PopularChartPatterns" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
            `
    } else if (cat == "investor") {
        containerId = "tsrInvestorUcContainer";
        html += `
                    <div class="owl-carousel owl-theme">


                        <!-- Card 1 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-rocket"></i></div> -->
                                <h5>Market Insights</h5>
                                <p>360 Market Research</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Strong Bullish Stocks</li>
                                    <li>Highest Turnover Stocks</li>
                                    <li>Recovery From Low Stocks</li>
                                    <li>High Beta Stocks</li>                                                    
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Markets/MarketScreener" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 2 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-line"></i></div> -->
                                <h5>Positional Screeners</h5>
                                <p>Where patience meets opportunity.
                                </p>
                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Positional Trading Strategies</li>
                                    <li>Financial Strength Index</li>
                                    <li>Fibonacci Screeners</li>
                                    <li>Demand & Supply Zones</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/ExpertScreener/PositionalTradingStrategies" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>


                        <!-- Card 3 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-line"></i></div> -->
                                <h5>Fundamental</h5>
                                <p>Reality behind the chart. 
                                </p>
                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Undervalued Stocks</li>
                                    <li>High Growth Stocks</li>
                                    <li>Low Debt Stocks</li>
                                    <li>Stable Stocks</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Financial/ValuationRatios" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>



                        <!-- Card 4 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-line"></i></div> -->
                                <h5>Guru Ratios</h5>
                                <p>Learn from Market Gurus.
                                </p>
                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Altman Z Score</li>
                                    <li>Piotroski F Score</li>
                                    <li>Graham Number</li>
                                    <li>Peter Lynch Fair Value</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Financial/GuruRatios" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>


                        <!-- Card 5 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-line"></i></div> -->
                                <h5>Chart Patterns</h5>
                                <p>Price forms, patterns inform.
                                </p>
                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Double Bottom</li>
                                    <li>Trendline</li>
                                    <li>Triangle</li>
                                    <li>Channel</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/ChartPatterns/PopularChartPatterns" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 6 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-bar"></i></div> -->
                                <h5>Index Analysis</h5>
                                <p>Track the market's pulse.</p>

                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Fundamental analysis of indices</li>
                                    <li>Investment returns of index stocks</li>
                                    <li>Nifty 50 stocks ranked by beta</li>
                                    <li>Technical analysis of indices</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Markets/IndexAnalysis" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>                            

                        <!-- Card 7 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-bar"></i></div> -->
                                <h5>Sector Rotation</h5>
                                <p>Track where money moves.</p>
                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>1 Day - 5 Years timeframe analysis</li>
                                    <li>Identify Top Stocks / Index / Sector</li>
                                    <li>AI-powered insights</li>
                                    <li>Visualize sector strength in charts</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Markets/SectorRotation" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                        <!-- Card 8 -->
                        <div class="item">
                            <div class="tsrToolCard">
                                <!-- <div class="tsr-icon"><i class="fas fa-chart-bar"></i></div> -->
                                <h5>Relative Price Strength</h5>
                                <p>Stocks Beating Market.</p>
                                <ul
                                    style="list-style: circle; font-size: 14px; color: #6c757d; padding-left: 20px;">
                                    <li>Out Performing Stocks vs Nifty</li>
                                    <li>Get High Returns Stocks</li>
                                    <li>Rank Stock as Per Performance</li>
                                    <li>1 Week to 10 Year Relative Strength</li>
                                </ul>
                                <a href="https://www.tsrbt1.com/rt/Screener/Markets/RelativeStrength" class="tsrToolCta">Start Now <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>

                    </div>
        `
    }

    html += `
            <button type="button" role="presentation" class="tsrHomeOwlNext btn d-none d-md-block"
                style="box-shadow: none;">
                <span aria-label="Next">
                    <i class="fas fa-angle-right"></i>
                </span>
            </button>
    `

    let carousalDef1 = {
        loop: false,
        dots: false,
        margin: 10,
        stagePadding: 20,
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

    let activeContainer = document.getElementById(containerId);
    if (jsu.isNotNull(activeContainer)) {
        activeContainer.style.display = "flex";
        activeContainer.innerHTML = html;

        // setTimeout(() => {
        initCarousal(true, carousalDef1, containerId);
        // }, 200);

    }
}

init();

// Feature of the JSON
// let fotdJson = {
//     "title": "",
//     "uri" : "",
// }

