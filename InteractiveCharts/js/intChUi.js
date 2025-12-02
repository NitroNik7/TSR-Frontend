var intChUi = (function () {

 function getIntChNavMenu() {
        let html = "";

        html += `
                <style>
                    .tsrIntChHeader {
                        height: 40px;
                        border-bottom: 1px solid #8080805e;
                    }

                    .chartPanel {
                        /* border: 2px solid #DDD; */
                        border-radius: 0px !important;
                        padding: 0 !important;
                    }

                    /* old classes */
                    .page-container {
                        padding-left: 0px !important;
                    }

                    .main-content {
                        padding: 0 !important;
                    }

                    .container-fluid {
                        padding: 0 !important;
                    }

                    .tsrIntChPanelMenu{
                        list-style: none !important; 
                        padding-left: 0 !important;
                    }

                    .tsrIntChPanelMenu>li{
                        width: 100%;
                    }

                    .tsrIntChPanelMenu>li>a{
                        position: relative;
                        display: block;
                    	padding: 10px 0 10px 0;
                        font-weight: 500;
                        font-size: 15px;
                        white-space: nowrap;
                        color: #fff;
                        -webkit-transition: .3s;
                        -moz-transition: .3s;
                        -o-transition: .3s;
                        -ms-transition: .3s;
                    }
                      
                    .tsrIntChPanelMenu>li>a>.arrow{
                        position: absolute;
                        right: 10px;
                    }

                    .tsrIntChPanelMenu li a.dropdown-toggle:after { 
                        display: none; border-radius: 0px; 
                    }

                    .tsrIntChPanelMenu>li>ul{
                    	position: relative;
                        padding: 0;
                        padding-left: 30px;
                        width: 100%;
	                    border: 0;
	                    box-shadow: none;
	                    background-color: transparent;
                    }

                    .tsrIntChPanelMenu>li>ul>li>a{
                        color: #fff;
                    }

                </style>
            `;
        html += `
                <nav class="navbar fixed-top navbar-light bg-light" style="padding: 0;">
                    <div class="container-fluid" style="justify-content: start;">
                        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                            aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel"
                            style="width: 275px;">
                            <div class="offcanvas-header">
                                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                                    <img src="//www.topstockresearch.com/static/v21/img/tsr/TsrLogo.png" alt="TSR - TopStockresearch"
                                        name="TSR - TopStockresearch" height="40px;" style="vertical-align:top">
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body" style="background: linear-gradient(0deg,#09124f 0,#090979 30%,#006fbf 100%);">`
        html += `
                                <ul class="tsrIntChPanelMenu">
                                    <li class='nav-item' style='margin-top:6px;'><a href='https://www.TopStockResearch.com/rt/Home'> <span
                                                class='icon-holder' id='homeSbDiv' aria-hidden='true'> </span> <span class='title'>Home</span></a></li>
                                    <li class="nav-item dropdown" style='margin-top:6px;'>
                                        <a href="javascript:void(0);" class="dropdown-toggle"><span class='icon-holder' id='msSbDiv' aria-hidden='true'>
                                            </span> <span class='title'>Market
                                                Screener</span><span class="arrow"><i class="fa fa-solid fa-chevron-right"></i> </span></a>
                                        <ul class="dropdown-menu">
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/MarketScreener'>Market
                                                    Overview</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/PriceVolume'>Price
                                                    / Volume</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/HighsLows'>Highs
                                                    / Lows</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/Returns'>Returns</a>
                                            </li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/RelativeStrength'>Relative
                                                    Price Strength</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/IndexAnalysis'>Index
                                                    Analysis</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/SectorRotation'>Sector
                                                    Rotation</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/SectorAnalysis'>Sector
                                                    Analysis</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/HeatMap'>Heat
                                                    Map</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/AdvanceDecline'>Advance
                                                    /Decline</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/IntradayScreener'>Intraday
                                                    Strategies</a></li>
                                        </ul>
                                    </li>
                                    <li class="nav-item dropdown" style='margin-top:6px;'>
                                        <a href="javascript:void(0);" class="dropdown-toggle"><span class='icon-holder' id='strSbDiv'
                                                aria-hidden='true'> </span> <span class='title'>TSR Strength
                                                Index</span><span class="arrow"><i class="fa fa-solid fa-chevron-right"></i>
                                            </span></a>
                                        <ul class="dropdown-menu">
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/TSRStrengthIndex/TechnicalStrength'>Technical
                                                    Strength</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/TSRStrengthIndex/FinancialStrength'>Financial
                                                    Strength</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/TSRStrengthIndex/EODBetaVolatile'>EOD
                                                    Beta Volatile</a></li>
                                        </ul>
                                    </li>
                                    <li class="nav-item dropdown" style='margin-top:6px;'>
                                        <a href="javascript:void(0);" class="dropdown-toggle"><span class='icon-holder' id='csSbDiv' aria-hidden='true'>
                                            </span> <span class='title'>Candlestick
                                                Screeners</span><span class="arrow"><i class="fa fa-solid fa-chevron-right"></i> </span></a>
                                        <ul class="dropdown-menu">
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Candlestick/BullishScreener'>Bullish
                                                    Screener</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Candlestick/BearishScreener'>Bearish
                                                    Screener</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Candlestick/Consolidation'>Consolidation</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="nav-item dropdown" style='margin-top:6px;'>
                                        <a href="javascript:void(0);" class="dropdown-toggle"><span class='icon-holder' id='techSbDiv'
                                                aria-hidden='true'> </span> <span class='title'>Technical
                                                Screeners</span><span class="arrow"><i class="fa fa-solid fa-chevron-right"></i> </span></a>
                                        <ul class="dropdown-menu">
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Technical/OHLCScreeners'>OHLC
                                                    Screeners</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Technical/OverboughtSold'>Overbought/Sold</a>
                                            </li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Technical/Overlays'>Overlays</a>
                                            </li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Technical/TrendIndicator'>Trend
                                                    Indicator</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Technical/VolumeBasedIndicator'>Volume
                                                    Based Indicator</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Technical/SMAScreener'>SMA
                                                    Screener</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Technical/EMAScreener'>EMA
                                                    Screener</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Technical/WMAScreener'>WMA
                                                    Screener</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Technical/PivotPoint'>Pivot
                                                    Point</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Technical/VwapScreener'>VWAP
                                                    Screener</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Technical/FibonacciScreener'>Fibonacci
                                                    Screener</a></li>
                                        </ul>
                                    </li>
                                    <li class="nav-item dropdown" style='margin-top:6px;'>
                                        <a href="javascript:void(0);" class="dropdown-toggle"><span class='icon-holder' id='cpSbDiv' aria-hidden='true'>
                                            </span> <span class='title'>Chart
                                                Patterns</span><span class="arrow"><i class="fa fa-solid fa-chevron-right"></i> </span></a>
                                        <ul class="dropdown-menu">
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/ChartPatterns/PopularChartPatterns'>Popular
                                                    Chart Patterns</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/ChartPatterns/Triangle'>Triangle</a>
                                            </li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/ChartPatterns/Channel'>Channel</a>
                                            </li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/ChartPatterns/Trendlines'>Trendlines</a>
                                            </li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/ChartPatterns/NRWR'>NR
                                                    / WR</a></li>
                                        </ul>
                                    </li>
                                    <li class="nav-item dropdown" style='margin-top:6px;'>
                                        <a href="javascript:void(0);" class="dropdown-toggle"><span class='icon-holder' id='fundaSbDiv'
                                                aria-hidden='true'> </span> <span class='title'>Financial
                                                Screener</span><span class="arrow"><i class="fa fa-solid fa-chevron-right"></i> </span></a>
                                        <ul class="dropdown-menu">
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Financial/FinHighlight'>Financial
                                                    Highlight</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Financial/GuruRatios'>Guru
                                                    Ratios</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Financial/ValuationRatios'>Valuation
                                                    Ratios</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Financial/ProfitabilityRatios'>Profitability
                                                    Ratios</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Financial/SolvencyRatios'>Solvency
                                                    Ratios</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Financial/EfficiencyRatios'>Efficiency
                                                    Ratios</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Financial/IncStatGrowthYr'>Income
                                                    Statment Growth (Yr)</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Financial/BalSheetGrowthYr'>Balance
                                                    Sheet Growth (Yr)</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/Financial/CashFlowStatGrowthYr'>Cash
                                                    Flow Stat Growth (Yr)</a></li>
                                        </ul>
                                    </li>
                                    <li class="nav-item dropdown" style='margin-top:6px;'>
                                        <a href="javascript:void(0);" class="dropdown-toggle"><span class='icon-holder' id='comboSbDiv'
                                                aria-hidden='true'> </span> <span class='title'>Combo
                                                Screener </span><span class="arrow"><i class="fa fa-solid fa-chevron-right"></i> </span></a>
                                        <ul class="dropdown-menu">
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/ComboScreener/PriceActionScreeners'>Price
                                                    Action Screeners</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/ComboScreener/BullishTechnicalsScreener'>Bullish
                                                    Technical Screeners</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/ComboScreener/BearishTechnicalsScreener'>Bearish
                                                    Technical Screeners</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/ComboScreener/FundamentalScreener'>Fundamental
                                                    Screeners</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/ComboScreener/MovingAverageScreeners'>Moving
                                                    Average Screeners</a></li>
                                        </ul>
                                    </li>
                                    <li class='nav-item' style='margin-top:6px;'><a href='https://www.TopStockResearch.com/rt/CustomStockScreener.tsr'>
                                            <span class='icon-holder' id='diysSbDiv' aria-hidden='true'> </span> <span class='title'>Custom
                                                Screener</span></a></li>
                                    <li class="nav-item dropdown" style='margin-top:6px;'>
                                        <a href="javascript:void(0);" class="dropdown-toggle"><span class='icon-holder' id='expsSbDiv'
                                                aria-hidden='true'> </span> <span class='title'>Expert
                                                Screeners</span><span class="arrow"><i class="fa fa-solid fa-chevron-right"></i> </span></a>
                                        <ul class="dropdown-menu">
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/ExpertScreener/PriceActionBased'>Price
                                                    Action Strategies</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/ExpertScreener/TechIndiBased'>Technical
                                                    Indicator Strategies</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/ExpertScreener/MovingAverageStrategies'>Moving
                                                    Average Strategies</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/ExpertScreener/BTSTStrategies'>BTST
                                                    Strategies</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/ExpertScreener/BreakoutStrategies'>Breakout
                                                    Strategies</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/ExpertScreener/SwingTradingStrategies'>Swing
                                                    Trading Strategies</a></li>
                                        </ul>
                                    </li>
                                    <li class='nav-item' style='margin-top:6px;'><a href='https://www.TopStockResearch.com/rt/InteractiveCharts.tsr'>
                                            <span class='icon-holder' id='tcSbDiv' aria-hidden='true'> </span> <span class='title'>Technical
                                                Charts</span></a></li>
                                    <li class='nav-item' style='margin-top:6px;'><a href='https://www.TopStockResearch.com/my/TsrPlans/'> <span
                                                class='icon-holder' id='subsSbDiv' aria-hidden='true'> </span> <span class='title'>Premium
                                                Plans</span></a></li>
                                    <li class="nav-item dropdown" style='margin-top:6px;'>
                                        <a href="javascript:void(0);" class="dropdown-toggle"><span class='icon-holder' id='fnoSbDiv'
                                                aria-hidden='true'> </span> <span class='title'>Futures And
                                                Options</span><span class="arrow"><i class="fa fa-solid fa-chevron-right"></i> </span></a>
                                        <ul class="dropdown-menu">
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/FuturesAndOptions/Futures'>Futures
                                                    Screeners</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/FuturesAndOptions/CallOptions'>Call
                                                    Option Screeners</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/FuturesAndOptions/PutOptions'>Put
                                                    Option Screeners</a></li>
                                            <li><a href='https://www.topstockresearch.com/rt/Screener/FuturesAndOptions/PutCallRatio'>PCR
                                                    Screeners</a></li>
                                        </ul>
                                    </li>
                                    <li class="nav-item dropdown" style='margin-top:6px;'>
                                        <a href="javascript:void(0);" class="dropdown-toggle"><span class='icon-holder' id='tutSbDiv'
                                                aria-hidden='true'> </span> <span class='title'>Learn
                                            </span><span class="arrow"><i class="fa fa-solid fa-chevron-right"></i>
                                            </span></a>
                                        <ul class="dropdown-menu">
                                            <li><a href='https://tutorials.TopStockResearch.com'>Tutorials</a></li>
                                            <li><a href='https://www.TopStockResearch.com/rt/Ebooks'>E-Books</a></li>
                                        </ul>
                                    </li>`

        /*
// <ul class="tsrIntChPanelMenu">
//     <li class='nav-item' style='margin-top:6px;'><a href='https://www.TopStockResearch.com/rt/Home'> <span
//         class='icon-holder' id='homeSbDiv' aria-hidden='true'> </span> <span class='title'>Home</span></a></li>
//     <li class="nav-item dropdown" style='margin-top:6px;'>
//         <a href="javascript:void(0);" class="dropdown-toggle"><span class='icon-holder' id='msSbDiv' aria-hidden='true'>
//         </span> <span class='title'>Market
//             Screener</span><span class="arrow"><i class="fa fa-solid fa-chevron-right"></i> </span></a>
//         <ul class="dropdown-menu">
//             <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/MarketScreener'>Market
//                 Overview</a></li>
//             <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/PriceVolume'>Price
//                 / Volume</a></li>
//             <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/HighsLows'>Highs
//                 / Lows</a></li>
//             <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/Returns'>Returns</a>
//             </li>
//             <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/RelativeStrength'>Relative
//                 Price Strength</a></li>
//             <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/IndexAnalysis'>Index
//                 Analysis</a></li>
//             <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/SectorRotation'>Sector
//                 Rotation</a></li>
//             <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/SectorAnalysis'>Sector
//                 Analysis</a></li>
//             <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/HeatMap'>Heat
//                 Map</a></li>
//             <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/AdvanceDecline'>Advance
//                 /Decline</a></li>
//             <li><a href='https://www.topstockresearch.com/rt/Screener/Markets/IntradayScreener'>Intraday
//                 Strategies</a></li>
//         </ul>
//     </li>


let navMenuLinks = {
    "Home": {
        iconHolderId: "",
        label: "",
        url: "",
        dropdown: false,
    },
    "Markets": {
        iconHolderId: "",
        label: "",
        url: "",
        dropdown: true,
        subMenu: [{
            label: "",
            url: ""
        }]
    },
};



html += `               <ul class="tsrIntChPanelMenu">`;

let keys = Object.keys(navMenuLinks);

for (let i = 0; i < keys.length; i++) {
    html += `<li class='nav-item'>`;
    html += `
            <a href='${navMenuLinks[keys[i]]["url"]}'> 
                <span class='icon-holder' id='${navMenuLinks[keys[i]["iconHolderId"]]}Div' aria-hidden='true'> </span> 
                <span class='title'>${navMenuLinks[keys[i]["label"]]}</span>`
    if (navMenuLinks[keys[i]["dropdown"]]) {
        html += `<span class="arrow"> <i class="fa fa-solid fa-chevron-right"></i> </span>`
    }
    html += `</a>`

    if (navMenuLinks[keys[i]["dropdown"]]) {
        let subMenu = navMenuLinks[keys[i]]["subMenu"];

        html += `<ul class="dropdown-menu"> `
        for (let j = 0; j < subMenu.length; j++) {
            html += `   
                    <li>
                        <a href='${subMenu[j].url}'>
                            ${subMenu[j].label}
                        </a>
                    </li> `;
        }
        html += `</ul> `;
    };
    html += `</li>`
}
*/
        html += '               </ul>';

        html += `           </div>
                        </div>
                    </div>
                </nav>
            `;


        return html;
    }

    return {
        gicnm: getIntChNavMenu,

    }
})();