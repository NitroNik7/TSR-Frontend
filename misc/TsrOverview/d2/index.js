
let tsrOverviewData = [
    {
        sectionTitle: "Ready to use Dashboards",
        cards: [
            {
                title: "360 Degree Research View",
                urls: [
                    { text: "Index Outperformers Stocks - Active", url: "" },
                    { text: "Tech Strong", url: "" },
                    { text: "HeatMap", url: "" }
                ]
            },
            {
                title: "Intraday Opportunities",
                urls: [
                    { text: "Gapup", url: "" },
                    { text: "Open=close ORB", url: "" },
                    { text: "New Highs Trending Candle", url: "" },
                    { text: "VWAP", url: "" }
                ]
            },
            {
                title: "Strategy Snapshot",
                urls: [
                    { text: "Result of Multiple Strategies in One Place", url: "" },
                    { text: "Highly Customisable", url: "" },
                    { text: "Auto Refresh", url: "" },
                ]
            }
        ]
    },
    {
        sectionTitle: "Patterns Screener",
        cards: [
            {
                title: "Chart Patterns",
                urls: [
                    { text: "Common W", url: "" },
                    { text: "H&S", url: "" },
                    { text: "Geometry - Triangle", url: "" },
                    { text: "Channel", url: "" },
                    { text: "Other - Rounding Bottom", url: "" }
                ]
            },
            {
                title: "Candlestick patterns",
                urls: [
                    { text: "70+ patterns", url: "" },
                    { text: "Pattern Highly Optimised ", url: "" },
                    { text: "Multiple pattern in One Filter", url: "" },
                ]
            },
            {
                title: "Other patterns",
                urls: [
                    { text: "NR4 / NR7", url: "" },
                    { text: "Master candle", url: "" },
                    { text: "Heikin Ashi", url: "" },
                ]
            }
        ]


    },
    {
        sectionTitle: "Technical Indicator / Oscillator",
        cards: [
            {
                title: "Indicator Customisation",
                urls: [
                    { text: "RSI (7)", url: "" },
                    { text: "Bollinger (20 , 1.5)", url: "" },
                    { text: "ADX (10,10)", url: "" }
                ]
            },
            {
                title: "Cross Tick",
                urls: [
                    { text: "MACD Abv 0 on Daily", url: "" },
                    { text: "1 Hr and Weekly Tick", url: "" },
                ]
            },
            {
                title: "Addition pattern",
                urls: [
                    { text: "RSI Double Bottom", url: "" },
                    { text: "SuperTrend Support", url: "" },
                    { text: "Zero Lag Macd", url: "" },
                ]
            }
        ]
    },
    {
        sectionTitle: "Strategies",
        cards: [
            {
                title: "1000+ Precreated",
                urls: [
                    { text: "Simple like 50", url: "" },
                    { text: "200 EMA Cross", url: "" },
                    { text: "Combo - With Multiple Tech", url: "" },
                    { text: "Price Action based", url: "" }
                ]
            },
            {
                title: "Custom Strategy (1000’s Filter)",
                urls: [
                    { text: "Ready to use Building Block", url: "" },
                    { text: "Alert, Auto Refresh", url: "" },
                    { text: "Mix Tech + Funda Filter", url: "" },
                ]
            },
            {
                title: "Advance Customisable",
                urls: [
                    { text: "Demand Supply Zone", url: "" },
                    { text: "Range Break out", url: "" },
                    { text: "VWAP ", url: "" },
                ]
            }
        ]
    }
]

let container = document.getElementById("tsrOverviewContainer");

let wrapper = document.createElement("div");
wrapper.classList.add("row");
let sectionContainer = document.createElement("div");
sectionContainer.classList.add("container", "col-10", "my-5");
sectionContainer.style.overflowY = "auto";
sectionContainer.style.scrollBehavior = "smooth";
sectionContainer.style.height = "75vh";

for (let i = 0; i < tsrOverviewData.length; i++) {
    let sectionDiv = document.createElement("div");
    sectionDiv.classList.add("mb-5", "card", "shadow-sm");
    let section = tsrOverviewData[i];

    let sectionHeader = document.createElement("div");
    sectionHeader.classList.add("card-header");
    sectionHeader.style.backgroundColor = "aliceblue";
    sectionHeader.style.fontSize = "20px";
    sectionHeader.style.fontWeight = "400";


    sectionHeader.style.color = "white";
    let sectionHeadingLink = document.createElement("a");
    sectionHeadingLink.id = section.sectionTitle;
    sectionHeadingLink.href = "#" + section.sectionTitle;

    // let sectionHeading = document.createElement("h4");
    // sectionHeading.innerHTML = section.sectionTitle;
    // sectionHeading.style.textDecoration = "underline";

    // sectionHeadingLink.appendChild(sectionHeading);
    sectionHeadingLink.innerHTML = section.sectionTitle;

    sectionHeader.appendChild(sectionHeadingLink);


    sectionDiv.appendChild(sectionHeader);

    let sectionBody = document.createElement("div");
    sectionBody.classList.add("card-body", "pt-0");

    let cards = section.cards;
    let noOfRows = cards.length % 3 == 0 ? (cards.length / 3) : (cards.length / 3) + 1;
    for (let j = 0; j < noOfRows; j++) {
        let row = document.createElement("div");
        row.classList.add("row", "mt-3");
        for (let k = 0; k <= 2; k++) {
            let cardIdx = j + k;
            if (cards[cardIdx]) {
                let cardContainer = document.createElement("div");
                cardContainer.classList.add("col-md-6", "col-lg-4", "mb-3", "mb-sm-0");

                let card = document.createElement("div");
                // card.classList.add("h-100", "shadow-lg");
                if (k + 1 <= 2) {
                    card.classList.add("border-end");
                }

                let cardBody = document.createElement("div");
                cardBody.classList.add("card-body", "h-100");

                let h5 = document.createElement("h5");
                h5.classList.add("card-title");
                h5.innerText = cards[cardIdx].title;

                let ul = document.createElement("ul");
                ul.classList.add("card-text", "mb-0", "ps-3");

                let urls = cards[cardIdx].urls;

                for (let l = 0; l < urls.length; l++) {
                    let li = document.createElement("li");
                    let a = document.createElement("a");
                    a.innerHTML = urls[l].text + "<br>";
                    a.href = urls[l].url;
                    li.appendChild(a);

                    ul.appendChild(li);
                }

                cardBody.appendChild(h5);
                cardBody.appendChild(ul);

                card.appendChild(cardBody);

                cardContainer.appendChild(card);
                row.appendChild(cardContainer);
            }

        }

        sectionBody.appendChild(row);
    }
    sectionDiv.appendChild(sectionBody);
    sectionContainer.appendChild(sectionDiv);


}


let navMenu = document.createElement("div");
navMenu.classList.add("col-2", "my-5", "border-start", "d-flex", "flex-column");
// navMenu.style.height = "max-content";

let navMenuTitle = document.createElement("span");
navMenuTitle.innerHTML = "On this page <br><br> ";
navMenuTitle.style.fontWeight = "bold";

navMenu.appendChild(navMenuTitle);

for (let i = 0; i < tsrOverviewData.length; i++) {
    let a = document.createElement("a");

    a.href = "#" + tsrOverviewData[i].sectionTitle;
    a.innerHTML = tsrOverviewData[i].sectionTitle + "<br>";
    a.classList.add("my-1");
    navMenu.appendChild(a);
}

wrapper.appendChild(sectionContainer);
wrapper.appendChild(navMenu);
container.appendChild(wrapper);




/*
<div class="col-md-6 col-lg-4">
    <div class="card h-100 shadow-sm">
        <div class="card-body">
            <h5 class="card-title">Help & Support</h5>
            <ul class="mb-0 ps-3">
                <li>Documentation, Tutorials, eBooks, Videos</li>
                <li>Available in English & Hindi</li>
                <li>One-on-One Demo Support</li>
            </ul>
        </div>
    </div>
</div>
*/