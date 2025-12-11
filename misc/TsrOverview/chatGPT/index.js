
let tsrOverviewData = [
    {
        sectionTitle: "Ready to use Dashboard",
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

]

let container = document.getElementById("tsrOverviewContainer");

let sectionContainer = document.createElement("div");

for (let i = 0; i < tsrOverviewData.length; i++) {
    let section = tsrOverviewData[i];

    let sectionHeading = document.createElement("h4");
    sectionHeading.innerText = section.sectionTitle;

    sectionContainer.appendChild(sectionHeading);

    let cards = section.cards;
    let noOfRows = cards.length % 3 == 0 ? (cards.length / 3) : (cards.length / 3) + 1;
    for (let j = 0; j < noOfRows; j++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let k = 0; k <= 2; k++) {
            let cardIdx = j + k;
            if (cards[cardIdx]) {
                let cardContainer = document.createElement("div");
                cardContainer.classList.add("col-md-6", "col-lg-4", "mb-3", "mb-sm-0");

                let card = document.createElement("div");
                card.classList.add("card", " h-100", "shadow-sm");

                let cardBody = document.createElement("div");
                cardBody.classList.add("card-body");

                let h5 = document.createElement("h5");
                h5.classList.add("card-title");
                h5.innerText = cards[cardIdx].title;

                let ul = document.createElement("ul");
                ul.classList.add("card-text", "mb-0" ,"ps-3");

                let urls = cards[cardIdx].urls;

                for (let l = 0; l < urls.length; l++) {
                    let li = document.createElement("li");
                    li.innerHTML = urls[l].text + "<br>";
                    li.href = urls[l].url;

                    ul.appendChild(li);
                }

                cardBody.appendChild(h5);
                cardBody.appendChild(ul);

                card.appendChild(cardBody);

                cardContainer.appendChild(card);
                row.appendChild(cardContainer);
            }

        }

        sectionContainer.appendChild(row);
    }


}

container.appendChild(sectionContainer);


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