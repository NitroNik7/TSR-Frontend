
let tsrOverviewData = [
    {
        section: {
            title: "Ready to use Dashboard",
            url: null
        },
        cards: [
            {
                title: "360 Degree Research View",
                url: "",
                html: true,
                htmlUrl: "./assets/html/360DegreeResearchView.html",
                data: [
                    { text: "Index Outperformers Stocks - Active", url: "https://www.topstockresearch.com/rt/Home", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Tech Strong", url: null, modal: false, imgSrc: null, htmlSrc: null },
                    {
                        text: "HeatMap", url: null,
                        modal: true, imgSrc: "./assets/MACDBearishDivergenceStrategyExample.png", htmlSrc: ""
                    }
                ]
            },
            {
                title: "Intraday Opportunities",
                url: "",
                html: true,
                htmlUrl: "./assets/html/IntradayOpportunities.html",
                data: [
                    { text: "Gapup", url: null, modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Open=close ORB", url: "https://www.topstockresearch.com/rt/Home", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "New Highs Trending Candle", url: "https://www.topstockresearch.com/rt/Home", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "VWAP", url: null, modal: false, imgSrc: null, htmlSrc: null }
                ]
            },
            {
                title: "Strategy Snapshot",
                url: "",
                data: [
                    { text: "Result of Multiple Strategies in One Place", url: null, modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Highly Customisable", url: null, modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Auto Refresh", url: "https://www.topstockresearch.com/rt/Home", modal: false, imgSrc: null, htmlSrc: null },
                ]
            }
        ]
    },
    {
        section: {
            title: "Patterns Screener",
            url: null
        },
        cards: [
            {
                title: "Chart Patterns",
                url: "",
                data: [
                    { text: "Common W", url: null, modal: false, imgSrc: null, htmlSrc: null },
                    { text: "H&S", url: null, modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Geometry - Triangle", url: "https://www.topstockresearch.com/rt/Home", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Channel", url: null, modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Other - Rounding Bottom", url: null, modal: false, imgSrc: null, htmlSrc: null }
                ]
            },
            {
                title: "Candlestick patterns",
                url: "",
                data: [
                    { text: "70+ patterns", url: "", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Pattern Highly Optimised ", url: null, modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Multiple pattern in One Filter", url: "", modal: false, imgSrc: null, htmlSrc: null },
                ]
            },
            {
                title: "Other patterns",
                url: "",
                data: [
                    { text: "NR4 / NR7", url: "https://www.topstockresearch.com/rt/Home", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Master candle", url: "", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Heikin Ashi", url: null, modal: true, imgSrc: "./assets/MACDBearishDivergence.png", htmlSrc: "" },
                ]
            }
        ]
    },
    {
        section: {
            title: "Technical Indicator / Oscillator",
            url: null
        },
        cards: [
            {
                title: "Indicator Customisation",
                url: "",
                data: [
                    { text: "RSI (7)", url: null, modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Bollinger (20 , 1.5)", url: null, modal: false, imgSrc: null, htmlSrc: null },
                    {
                        text: "ADX (10,10)", url: "", modal: true, imgSrc: null,
                        htmlSrc: `
                            <h2>Tutorial on Average Directional Index (ADX)</h2>
                                <br>
                                <p align="justify" style="text-align:justify"> 
                                <b>Trading with ADX:</b> Most profitable and least risky strategy is to trade with the  <a href="https://tutorials.topstockresearch.com/basics/Trends/TutorialOnTrend.html">Trend</a>. The stronger the trend the better the reward is. Finding the trend, measuring its strength is possible with Average Directional Index (ADX), an indicator developed by Welles Wilder. It may be worth mentioning here that of Welder contribution to technical analysis was also in developing 
                                <a href="https://tutorials.topstockresearch.com/TutorialsOnRSI/TutorialOnRSI.html">RSI</a>, ATR and Parabolic SAR.
                                </p>


                                <p align="justify" style="text-align:justify"> 
                                ADX indicator is used to find whether Stock is in trend and also finds the strength of the trend. It, however, does not indicate about the direction of the trend. It provides similar value for both <a href="https://tutorials.topstockresearch.com/basics/Trends/Uptrend/TutorialOnUptrend.html">uptrending </a> and <a href="https://tutorials.topstockresearch.com/basics/Trends/Downtrend/TutorialOnDowntrend.html">down-trending </a> stocks. Stock direction is provided by additional lines that supplement with ADX. We will cover them later.<br> <br> 
                                Though complex in calculating its value, its usage is very simple. Its value oscillates between 0 and 100. Wilder suggested that if ADX is above 25 then stock is trending and as the trend gets stronger, ADX moves up. A value above 40 is considered a very Strong uptrend. A value below 20 is considered as no trend or sideways market.O wing to its vast acceptance, most of technical Analysis software does the calculation including TopStockResearch. 
                                </p>
                        `  }
                ]
            },
            {
                title: "Cross Tick",
                url: "",
                data: [
                    { text: "MACD Abv 0 on Daily", url: "https://www.topstockresearch.com/rt/Home", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "1 Hr and Weekly Tick", url: "", modal: false, imgSrc: null, htmlSrc: null },
                ]
            },
            {
                title: "Addition pattern",
                url: "",
                data: [
                    { text: "RSI Double Bottom", url: "https://www.topstockresearch.com/rt/Home", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "SuperTrend Support", url: "", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Zero Lag Macd", url: null, modal: false, imgSrc: null, htmlSrc: null },
                ]
            }
        ]
    },
    {
        section: {
            title: "Strategies",
            url: ""
        },
        cards: [
            {
                title: "1000+ Precreated",
                url: "",
                data: [
                    { text: "Simple like 50", url: "", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "200 EMA Cross", url: null, modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Combo - With Multiple Tech", url: "https://www.topstockresearch.com/rt/Home", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Price Action based", url: "", modal: false, imgSrc: null, htmlSrc: null }
                ]
            },
            {
                title: "Custom Strategy (1000’s Filter)",
                url: "",
                data: [
                    { text: "Ready to use Building Block", url: "", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Alert, Auto Refresh", url: null, modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Mix Tech + Funda Filter", url: "", modal: false, imgSrc: null, htmlSrc: null },
                ]
            },
            {
                title: "Advance Customisable",
                data: [
                    { text: "Demand Supply Zone", url: "", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Range Break out", url: "", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "VWAP ", url: null, modal: false, imgSrc: null, htmlSrc: null },
                ]
            }
        ]
    },
    {
        section: {
            title: "Technical Stock Charts",
            url: ""
        },
        cards: [
            {
                title: "Highlights",
                url: "",
                data: [
                    { text: "All Major Indicators", url: "", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "1 Min to yearly Tick", url: "https://www.topstockresearch.com/rt/Home", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Auto Refresh", url: "", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Drawing - Trenline , Symbol", url: "", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Save/Share Charts", url: null, modal: false, imgSrc: null, htmlSrc: null },
                ]
            },
            {
                title: "Compare / Multi Charts",
                url: "",
                html: true,
                htmlUrl: "./assets/html/CompareMultiChart.html",
                data: [
                    { text: "Tile - Multi Stocks In One View", url: "", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Tile - Multi Ticks in one View", url: null, modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Inline - Compare Multiple Stock", url: "", modal: false, imgSrc: null, htmlSrc: null },
                ]
            },
            {
                title: "Screener Integration",
                url: "",
                data: [
                    { text: "View Screener results in Charts Ex ", url: "https://www.topstockresearch.com/rt/Home", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Fibonacci", url: "https://www.topstockresearch.com/rt/Home", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Demand And Supply", url: "", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Pivot Breakout", url: "", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Divergence", url: null, modal: false, imgSrc: null, htmlSrc: null },

                ]
            }
        ]
    },
    {
        section: {
            title: "Traders Delight",
            url: ""
        },
        cards: [
            {
                title: "Traders Eye View",
                url: "",
                data: [
                    { text: "Movers & Shakers", url: null, modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Buzzing Stocks", url: "https://www.topstockresearch.com/rt/Home", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Strategy Snapshot", url: "", modal: false, imgSrc: null, htmlSrc: null },
                ]
            },
            {
                title: "Supported Ticks",
                url: "",
                data: [
                    { text: "Minute Ticks: 1, 2, 3, 5, 10, 15, 30 45, and 75 minutes", url: "", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Hourly Ticks: 1, 2, 3, 4 hours", url: null, modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Higher Ticks: Daily, Weekly, Monthly, Quarterly", url: "https://www.topstockresearch.com/rt/Home", modal: false, imgSrc: null, htmlSrc: null },
                ]
            },
            {
                title: "Alerts",
                url: "",
                data: [
                    { text: "SMS , WhatsApp , Email , PopUp", url: "", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "95% Alerts Generated Within 6 Sec", url: "https://www.topstockresearch.com/rt/Home", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Specific Time range Alerts", url: null, modal: false, imgSrc: null, htmlSrc: null },

                ]
            },
            {
                title: "Auto Refresh",
                url: "",
                data: [
                    { text: "Every Min or at Preferred Time Interval", url: "https://www.topstockresearch.com/rt/Home", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Beep Sound", url: null, modal: false, imgSrc: null, htmlSrc: null },
                ]
            },
            {
                title: "Mock Trading",
                url: "",
                data: [
                    { text: "Test Your Stocks with TSR portfolio before you Trade", url: "https://www.topstockresearch.com/rt/Home", modal: false, imgSrc: null, htmlSrc: null },
                ]
            },
            {
                title: "Back Testing Strategies",
                url: "",
                data: [
                    { text: "Technical", url: "", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Price Action", url: null, modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Chart Pattern", url: "", modal: false, imgSrc: null, htmlSrc: null }
                ]
            },
            {
                title: "Watchlist",
                url: "",
                data: [
                    { text: "Watch  All Stocks in a list", url: "", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Add from 1000’s of Data point", url: null, modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Screen Stock on your Watchlist", url: "https://www.topstockresearch.com/rt/Home", modal: false, imgSrc: null, htmlSrc: null },
                ]
            },
            {
                title: "Historical Comparison",
                url: "",
                data: [
                    { text: "OHLC ", url: "", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Technical", url: null, modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Fundamental", url: null, modal: false, imgSrc: null, htmlSrc: null },
                ]
            },
            {
                title: "Download Data",
                url: "",
                data: [
                    { text: "Save Screener as CSV , Excel", url: "", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Save Chart with Drawings", url: "https://www.topstockresearch.com/rt/Home", modal: false, imgSrc: null, htmlSrc: null },
                    { text: "Save Heatmap", url: "", modal: false, imgSrc: null, htmlSrc: null },

                ]
            }
        ]
    }
    /**
     * ,
        {
        sectionTitle: "",
        cards: [
            {
                title: "",
                data: [
                    { text: "", url: "", modal: false, imgSrc: null, htmlSrc: null  },
                    { text: "", url: "", modal: false, imgSrc: null, htmlSrc: null  },
                    { text: "", url: "", modal: false, imgSrc: null, htmlSrc: null  },
                    { text: "", url: "", modal: false, imgSrc: null, htmlSrc: null  },
                    { text: "", url: "", modal: false, imgSrc: null, htmlSrc: null  },
                ]
            },
            {
                title: "",
                data: [
                    { text: "", url: "", modal: false, imgSrc: null, htmlSrc: null  },
                    { text: "", url: "", modal: false, imgSrc: null, htmlSrc: null  },
                    { text: "", url: "", modal: false, imgSrc: null, htmlSrc: null  },
                ]
            },
            {
                title: "",
                data: [
                    { text: "", url: "", modal: false, imgSrc: null, htmlSrc: null  },
                    { text: "", url: "", modal: false, imgSrc: null, htmlSrc: null  },
                    { text: "", url: "", modal: false, imgSrc: null, htmlSrc: null  },
                    { text: "", url: "", modal: false, imgSrc: null, htmlSrc: null  },
                    { text: "", url: "", modal: false, imgSrc: null, htmlSrc: null  },

                ]
            }
        ]
    }
     */
]


let container = document.getElementById("tsrOverviewContainer");

let wrapper = document.createElement("div");
wrapper.classList.add("row");
let sectionContainer = document.createElement("div");
sectionContainer.classList.add("container", "col-12", "col-sm-8", "col-md-8", "col-lg-9", "col-xxl-10", "my-3");

function addSections(tsrOverviewData, sectionContainer) {
    for (let i = 0; i < tsrOverviewData.length; i++) {
        let sectionDiv = document.createElement("div");
        sectionDiv.classList.add("mb-5", "mx-3", "p-3", "border");
        sectionDiv.style.borderRadius = "15px";
        sectionDiv.style.backgroundColor = "antiquewhite"; // change here

        let sectionObj = tsrOverviewData[i];

        let sectionHeadingLink = document.createElement("a");
        sectionHeadingLink.classList.add("tsrSectionHeading");
        // sectionHeadingLink.href = "#" + sectionObj.section.url;
        sectionHeadingLink.href = "#" + sectionObj.section.title.replaceAll(" ", ""); // temp

        let sectionHeading = document.createElement("h5");
        sectionHeading.innerHTML = sectionObj.section.title;
        sectionHeading.id = sectionObj.section.title.replaceAll(" ", "");
        sectionHeading.style.scrollMargin = "100px";

        sectionHeadingLink.appendChild(sectionHeading);

        let hr = document.createElement("hr");

        sectionHeadingLink.appendChild(hr);

        sectionDiv.appendChild(sectionHeadingLink);

        let cards = sectionObj.cards;
        let noOfRows = cards.length % 3 == 0 ? (cards.length / 3) : (cards.length / 3) + 1;
        for (let j = 0; j < noOfRows; j++) {
            let row = document.createElement("div");
            row.classList.add("row", "mb-3");
            for (let k = 0; k <= 2; k++) {
                let cardIdx = (j * 3) + k;
                if (cards[cardIdx]) {
                    let cardContainer = document.createElement("div");
                    cardContainer.classList.add("col-12", "col-md-6", "col-lg-4", "mb-3", "mb-lg-0");

                    let card = document.createElement("div");
                    card.classList.add("card", "h-100", "shadow-lg", "tsrPopupCard");
                    if (k + 1 <= 2) {
                        card.classList.add("border-end");
                    }
                    card.style.backgroundColor = "aliceblue"; // change here

                    let cardBody = document.createElement("div");
                    cardBody.classList.add("card-body", "h-100");

                    let a = document.createElement("a");
                    let h5 = document.createElement("h5");
                    h5.classList.add("card-title");
                    h5.innerText = cards[cardIdx].title;
                    h5.id = cards[cardIdx].title;
                    a.href = cards[cardIdx].url;
                    a.appendChild(h5);

                    let ul = document.createElement("ul");
                    ul.classList.add("card-text", "mb-0");

                    let cardData = cards[cardIdx].data;

                    for (let l = 0; l < cardData.length; l++) {
                        let data = cardData[l];

                        let li = document.createElement("li");
                        li.innerText = data.text;
                        li.style.cursor = "default";

                        // removed links for popup/external link
                        // if (data.modal == false) {  // if modal: false, create URL using <a>
                        //     if (data.url != null) {
                        //         let a = document.createElement("a");
                        //         a.innerHTML = data.text + '&nbsp;' + '<i class="fas fa-link"></i>' + "<br>";
                        //         a.href = data.url;
                        //         a.classList.add("tsrLinks");
                        //         li.appendChild(a);
                        //     }
                        //     else {
                        //         li.innerText = data.text;
                        //         li.style.cursor = "default";
                        //     }
                        // }
                        // else { // if modal: true, create dialog

                        //     li.innerHTML = data.text + "&nbsp;" + '<i class="fas fa-external-link-alt"></i>';
                        //     // li.innerHTML = data.text + "&nbsp;" + '<i class="far fa-image"></i>';
                        //     li.classList.add("tsrLinks");
                        //     li.style.cursor = "pointer";

                        //     if (data.imgSrc != null) {
                        //         li.onclick = function () { createDialog(true, data.imgSrc) };
                        //     }
                        //     else {
                        //         li.onclick = function () { createDialog(false, data.htmlSrc) };
                        //     }
                        // }
                        ul.appendChild(li);
                    }

                    cardBody.appendChild(a);
                    cardBody.appendChild(ul);




                    card.appendChild(cardBody);

                    cardContainer.appendChild(card);
                    row.appendChild(cardContainer);
                }

            }
            sectionDiv.appendChild(row);
        }
        sectionContainer.appendChild(sectionDiv);
    }
}

function getPopupHtml(popupDataObj) {
    /*
                                    htmlSrc: [
                                {
                                    title: "Tile - Multi Stocks in one View",
                                    steps: [
                                        "<b>Step 1</b>: On the right side of the chart, click the <b>Compare</b> tab.",
                                        "Step 2: A pop-up will open — select Compare with Stocks.",
                                        "Step 3: Click on Tile."
                                    ],
                                    imageSrc: [
                                        "d5/assets/inline1.png",
                                        "d5/assets/inline2.png"
                                    ],
                                    desc: null
                                },
                                {
                                    title: "Tile - Multi Ticks in one View",
                                    steps: [
                                        "Step 1: In that pop-up, click on Multiple Ticks (Freq).",
                                        "Step 2: Click on Tile."
                                    ],
                                    imageSrc: [
                                        "d5/assets/multiStock.png"
                                    ],
                                    desc: null
                                },
                                {
                                    title: "Tile - Multi Stocks in one View",
                                    steps: [
                                        "<b>Step 1</b>: On the right side of the chart, click the <b>Compare</b> tab.",
                                        "Step 2: A pop-up will open — select Compare with Stocks.",
                                        "Step 3: Click on Tile."
                                    ],
                                    imageSrc: [
                                        "d5/assets/inline1.png",
                                        "d5/assets/inline2.png"
                                    ],
                                    desc: null
                                },
                            ],
    
                            */

    let html = "";
    for (let i = 0; i < popupDataObj.length; i++) {
        let dataObj = popupDataObj[i];
        let div = document.createElement("div");
        div.style.color = "blue";
        div.classList.add("text-center");

        let stepsList = document.createElement("ul");
        let steps = dataObj.steps;
        for (let j = 0; j < steps.length; j++) {
            let li = document.createElement("li");
            li.innerHTML = steps[j];
            stepsList.appendChild(li);
        }

        let imgContainer = document.createElement("div");
        // imgContainer.style.overflowX = "auto";

        let images = dataObj.imageSrc;

        for (let j = 0; j < images.length; j++) {
            let img = document.createElement("img");
            img.src = images[j];

            imgContainer.appendChild(img);
        }



        html += div.outerHTML;
        html += stepsList.outerHTML;
        html + imgContainer.outerHTML;
        html += "<br>";
    }
    return html;
}

addSections(tsrOverviewData, sectionContainer);

let navMenuContainer = document.createElement("div");
navMenuContainer.classList.add("d-none", "d-sm-flex", "col-sm-4", "col-md-4", "col-lg-3", "col-xxl-2", "border-start");
let navMenu = document.createElement("div");
navMenu.id = "tsrNavMenu";
navMenu.classList.add("d-none", "d-sm-flex", "my-3", "flex-column", "position-fixed");

let navMenuTitle = document.createElement("span");
navMenuTitle.innerHTML = "On this page <br><br> ";
navMenuTitle.style.fontWeight = "bold";

navMenu.appendChild(navMenuTitle);

function addNavMenuLink(tsrOverviewData, navMenu) {
    for (let i = 0; i < tsrOverviewData.length; i++) {
        let a = document.createElement("a");

        a.href = "#" + tsrOverviewData[i].section.title.replaceAll(" ", "");
        a.innerHTML = tsrOverviewData[i].section.title + "<br>";
        a.classList.add("mb-2", "tsrLinks");
        a.style.fontSize = "14px";
        a.style.fontWeight = "300";

        navMenu.appendChild(a);
    }
}

addNavMenuLink(tsrOverviewData, navMenu);

// For pricing plans section

let a = document.createElement("a");

a.href = "#pricingPlans";
a.innerHTML = "Pricing / Plans" + "<br>";
a.classList.add("mb-2", "tsrLinks");
a.style.fontSize = "14px";
a.style.fontWeight = "300";

navMenu.appendChild(a);


sectionContainer.innerHTML += `

<div class="mb-5 mx-3 p-3 border" style="border-radius: 15px; background-color: antiquewhite;">
        <a
            class="tsrSectionHeading" href="#pricingPlans">
            <h5 id="pricingPlans" style="scroll-margin: 100px;">Pricing Plans</h5>
            <hr>
        </a>
        <div class="row mb-3">
            <div class="col-12 mb-3">
                <div class="card h-100 shadow-lg border-end" style="background-color: aliceblue;">
                    <div class="card-body h-100"><div class="card-title">
                        <h5>Tailor Made Plans</h5>
                    </div>
                    <hr>
                    <div>
                        <b>EOD Plans</b>
                        <ul style="list-style-type: disclosure-closed;">
                            <li>
                                <span class="ul-header">EOD Funda</span> - For Students and Investors
                            </li>
                            <li>
                                <span class="ul-header">EOD Combo</span> - For Part Time Pro

                            </li>
                        </ul>
                    </div>
                    <div>
                        <b>Live Plans</b>
                        <ul style="list-style-type: disclosure-closed;">
                            <li>
                                <span class="ul-header">Trader Value</span>
                                <ul>
                                    <li>Ticks - Daily / Weekly / Monthly</li>
                                    <li>Newbie or Causal Trader</li>
                                </ul>
                            </li>
                            <li>
                                <span class="ul-header">Trader</span>
                                <ul>
                                    <li>5 Min to Qtr Tick</li>
                                    <li>Swing / Positional Trader</li>
                                </ul>
                            </li>
                            <li>
                                <span class="ul-header">Trader Pro</span>
                                <ul>
                                    <li>Tick 1/ 2 min to Qtr Ticks</li>
                                    <li>Professional Trader, Intraday, Swing Trader</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
            <div class="col-12 mb-3">
                <div class="card h-100 shadow-lg border-end" style="background-color: aliceblue;">
                    <div class="card-body h-100">
                        <div class="card-title">
                        <h5>Plan terms</h5>
                    </div>
                    <hr>
                    <div>
                        <ul style="list-style-type: disclosure-closed;">
                            <li>
                                <span class="ul-header">Monthly Plan</span> - Try TSR at Reasonable Price
                            </li>
                            <li>
                                <span class="ul-header">Annual Plan</span> - For Regular users with Discount
                            </li>
                            <li>
                                <span class="ul-header">2 / 5 Year Plan</span> - Deep Discount , Beat Inflation
                                Suggested for pro
                            </li>
                            <li>
                                Loyalty benefit for renewal
                                And upgrade
                            </li>
                            <li>
                                Refer a Friend and get 1 Mth free for you and for your friend
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
            <div class="col-12 mb-3">
                <div class="card h-100 shadow-lg" style="background-color: aliceblue;">
                    <div class="card-body h-100">
                        <div class="card-title">
                        <h5>Vs Competitor</h5>
                    </div>
                    <hr>
                    <div>
                        <ul style="list-style-type: disclosure-closed;">
                            <li>
                                Majority of Competitor don’t have <span class="ul-header">1, 2, 3 mins Tick</span>
                            </li>
                            <li>
                                <span class="ul-header">TSR Trader Plans</span> are more Feature Rich that most
                                Competitors
                            </li>
                            <li>
                                <span class="ul-header">Chart Pattern Screen</span>not available
                                Suggested for pro
                            </li>
                            <li>
                                <span class="ul-header">Candlestick pattern 70+</span> and ability to select multiple
                                pattern in one
                            </li>
                            <li>
                                <span class="ul-header">TSR Pro Plan</span>comes with lots of pre built Strategies not
                                available with competitors
                            </li>
                            <li>
                                Competitor lack deep integration between <span class="ul-header">Equity, Chart and
                                    Screener combo</span>
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        

    <div class="mb-5 mx-3 p-3 border" style="border-radius: 15px; background-color: antiquewhite;"><a
            class="tsrSectionHeading" href="#AboutUs/Help">
            <h5 id="AboutUs/Help" style="scroll-margin: 100px;">About Us / Help</h5>
            <hr>
        </a>
        <div class="row mb-3">
            <div class="col-12 col-md-6 mb-3">
                <div class="card h-100 shadow-lg border-end" style="background-color: aliceblue;">
                    <div class="card-body h-100">
                        <div class="card-title">
                            <h5>Legacy</h5>
                        </div>
                        <hr>
                        <div>
                            <b>Experience</b>
                            <ul style="list-style-type: disclosure-closed;">
                                <li>
                                    15 Years and growing Strong
                                </li>
                            </ul>
                        </div>
                        <div>
                            <b>Markets</b>
                            <ul style="list-style-type: disclosure-closed;">
                                <li>
                                    India , Australia , Europe and America
                                </li>

                            </ul>
                        </div>
                        <div>
                            <b>Happy Users</b>
                            <ul style="list-style-type: disclosure-closed;">
                                <li>
                                    Million+ Happy Users
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 mb-3">
                <div class="card h-100 shadow-lg border-end" style="background-color: aliceblue;">
                    <div class="card-body h-100">
                        <div class="card-title">
                            <h5>Help / Support</h5>
                        </div>
                        <hr>
                        <div>
                            <b>Resources</b>
                            <ul style="list-style-type: disclosure-closed;">
                                <li>
                                    Tutorial
                                </li>
                                <li>
                                    Ebooks
                                </li>
                            </ul>
                        </div>
                        <div>
                            <b>Tutorial Videos</b>
                            <ul style="list-style-type: disclosure-closed;">
                                <li>
                                    English
                                </li>
                                <li>
                                    Hindi
                                </li>
                            </ul>
                        </div>
                        <div>
                            <b>One on One demo</b>
                            <ul style="list-style-type: disclosure-closed;">
                                <li>
                                    Call us on <span>+91 922 655 760 3/4/5</span>
                                </li>
                                <li>
                                    Write to us on <span>support@topstockresearch.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



`;


// tsrOverviewData = [{
//     section: {
//         title: "Legacy",
//         url: null
//     },
//     cards: [
//         {
//             title: "Experience",
//             url: "",
//             data: [
//                 { text: "15 Years and growing Strong", url: null, modal: false, imgSrc: null, htmlSrc: null },
//             ]
//         },
//         {
//             title: "Markets",
//             url: "",
//             data: [
//                 { text: "India , Australia , Europe and America", url: null, modal: false, imgSrc: null, htmlSrc: null }
//             ]
//         },
//         {
//             title: "Happy users",
//             url: "",
//             data: [
//                 { text: "Million+ happy Users", url: null, modal: false, imgSrc: null, htmlSrc: null }
//             ]
//         }
//     ]
// },
// {
//     section: {
//         title: "New User? No Problem - Help/ Support System ",
//         url: null
//     },
//     cards: [
//         {
//             title: "Documentation",
//             url: "",
//             data: [
//                 { text: "Tutorial", url: null, modal: false, imgSrc: null, htmlSrc: null },
//                 { text: "Ebooks", url: "", modal: false, imgSrc: null, htmlSrc: null }
//             ]
//         },
//         {
//             title: "Tutorial Videos",
//             url: "",
//             data: [
//                 { text: "English", url: "", modal: false, imgSrc: null, htmlSrc: null },
//                 { text: "Hindi", url: null, modal: false, imgSrc: null, htmlSrc: null }]
//         },
//         {
//             title: "One on One demo",
//             url: "",
//             data: [
//                 { text: "Call us on +91 922 655 760 3/4/5 ", url: "", modal: false, imgSrc: null, htmlSrc: null },
//                 { text: "Write to us on support@topstockresearch.com ", url: "", modal: false, imgSrc: null, htmlSrc: null },

//             ]
//         }
//     ]
// }];

// addSections(tsrOverviewData, sectionContainer);
// addNavMenuLink(tsrOverviewData, navMenu);

a = document.createElement("a");

a.href = "#AboutUs/Help";
a.innerHTML = "About Us / Help" + "<br>";
a.classList.add("mb-2", "tsrLinks");
a.style.fontSize = "14px";
a.style.fontWeight = "300";

navMenu.appendChild(a);


wrapper.appendChild(sectionContainer);

navMenuContainer.appendChild(navMenu);
wrapper.appendChild(navMenuContainer);
container.appendChild(wrapper);



function addClickListenerToCards() {

    let cards = document.querySelectorAll(".tsrPopupCard");

    let cardsObj = [];
    for (let i = 0; i < tsrOverviewData.length; i++) {
        let section = tsrOverviewData[i];

        let cards = section.cards;

        cardsObj.push(...cards);
    }

    for (let i = 0; i < cards.length; i++) {
        if (cardsObj[i].html) {
            let div = document.createElement("div");
            div.setAttribute("align", "right");
            div.style.position = "absolute";
            div.style.bottom = "10px";
            div.style.right = "10px";

            let button = document.createElement("button");
            // button.innerHTML = `<i class="far fa-object-ungroup fa-flip-horizontal"></i>`;
            // button.innerHTML = `<i class="fas fa-info-circle"></i>`;
            button.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-picture-in-picture"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 19h-6a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4" /><path d="M14 14m0 1a1 1 0 0 1 1 -1h5a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1z" /></svg>`;
            button.classList.add("btn", "btn-sm", "tsr-popup-btn");
            button.title = "More";
            let obj = cardsObj[i];
            button.onclick = function () {
                $.get(obj.htmlUrl, function (data, status) {
                    createDialog(false, data);
                });
            };

            div.appendChild(button);
            cards[i].appendChild(div);
        }
    }
}

addClickListenerToCards();

function createDialog(isImg, html) {
    let dialog = document.createElement("dialog");
    dialog.id = "tsrMoreInfoPopup";
    dialog.classList.add("border", "rounded");
    document.body.style.overflow = "hidden";

    let closeDiv = document.createElement("div");
    let closeBtn = document.createElement("button");
    closeBtn.classList.add("btn-close");
    closeBtn.onclick = closeDialog;

    closeDiv.setAttribute("align", "right");
    closeDiv.classList.add("mb-2");
    closeDiv.appendChild(closeBtn);

    let contentDiv = document.createElement("div");
    contentDiv.style.maxWidth = "90vw";
    contentDiv.style.maxHeight = "80vh";
    // contentDiv.style.overflowX = "visible";
    contentDiv.style.overflowY = "hidden";
    contentDiv.classList.add("border", "rounded");


    if (isImg) {
        let img = document.createElement("img");
        img.classList.add("m-3")
        img.src = html;
        contentDiv.appendChild(img);
    } else {
        contentDiv.innerHTML = html;
    }

    dialog.appendChild(closeDiv);
    dialog.appendChild(contentDiv);

    document.body.appendChild(dialog);

    dialog.showModal();

    document.addEventListener("keydown", handleKeydown);

}

function handleKeydown(e) {
    if (e.key === "Escape") {
        closeDialog();
    }
}

function closeDialog() {
    let dialog = document.getElementById("tsrMoreInfoPopup");
    dialog.close();
    document.body.removeChild(dialog);
    document.body.style.overflow = "auto";

    document.removeEventListener("keydown", handleKeydown);
}


window.onscroll = function (e) {

    // navMenu.style.transition = "top 1s ease";

    // if(window.scrollY > 0 && window.scrollY < 300){
    //     console.log("offsetTop",navMenu.offsetTop);
    //     console.log("scrollY", window.scrollY);
    //     navMenu.style.top = (navMenu.offsetTop - window.scrollY) + "px";
    //     console.log("top",navMenu.style.top);
    // }
    // else 
    if (window.scrollY > 300) {
        navMenu.style.top = "100px";
    }
    else {
        navMenu.style.top = "auto";
    }

}