let adrCardData = {
    cardTitle: "Advance Decline Ratio",
    numAdvances: 100,
    numDeclines: 400,
    advancesElementId: "advancesTextElement",
    declinesElementId: "declinesTextElement",
    stockBasketOptions: ["Nifty 50", "Nifty 100", "Nifty 200", "Nifty 500"],
    adrDetailsPageUrl: ""
}

function createAdrCardWithSbSelect(data) {
    let totalStocks = data.numAdvances + data.numDeclines;

    let advancesPercent = (data.numAdvances / totalStocks) * 100;
    let declinesPercent = (data.numDeclines / totalStocks) * 100;

    let html = `
            <div class="card text-bg-primary mb-3">
                                        <div class="card-header" style="font-size: 18px; font-weight:600;">Advance Decline Ratio
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="mb-3 mb-md-0 col-sm-6 col-md-2 d-flex"
                                                    style="text-align: center; align-items: center; justify-content: center;">
                                                    <div class="d-flex flex-column" style="justify-items: center;">
                                                        <select name="tsrAdrStockBasketSelect" id="tsrAdrStockBasketSelect" style="font-weight: bold;" onchange="updateAdvanceDeclineCard()">`;

    for (let i = 0; i < data.stockBasketOptions.length; i++) {
        html += `<option value="${data.stockBasketOptions[i]}">${data.stockBasketOptions[i]}</option>`;
    }

    html += `                                           </select>
                                                    </div>
                                                </div>
                                                <div class="mb-3 mb-md-0 col-sm-6 col-md-2" style="text-align: center;">
                                                    <div class="d-flex flex-column">
                                                        <span>Advances</span>
                                                        <span style="font-size: 24;">
                                                            <font color="green" id="tsrAdrAdvancesText"> ${data.numAdvances}</font>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="mb-3 mb-md-0 col-sm-6 col-md-2" style="text-align: center;">
                                                    <div class="d-flex flex-column">
                                                        <span>Declines</span>
                                                        <span style="font-size: 24;">
                                                            <font color="red" id="tsrAdrDeclinesText"> ${data.numDeclines}</font>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="mb-3 mb-md-0 col-sm-6 col-md-4" style="text-align: center;">
                                                    <div class="d-flex flex-column h-100">
                                                        <span style="font-size: 16px;">
                                                            <b>
                                                                Advance Decline Ratio
                                                            </b>
                                                        </span>
                                                        <div class="d-flex flex-column" style="justify-content: center; align-content: center; flex-wrap: wrap; height: 100%;">

                                                            <div class="d-flex flex-row" style="height: 20px; justify-content: start;">
                                                                <span id="tsrAdrAdvancesPercentText" style="white-space: nowrap; font-weight: bold;color: #008080;">${advancesPercent.toFixed()}%</span>
                                                            </div>
                                                            <div class="d-flex" 
                                                                style="height: 10px;  width: 60%;">
                                                                    <div id="tsrAdrBarAdvancesDiv" style="background-color: #008080; height: 100%; border-top-left-radius: 10px; border-bottom-left-radius: 10px; width: ${advancesPercent}%;">

                                                                    </div>
                                                                    <div style="width: 2%;">

                                                                    </div>
                                                                    <div id="tsrAdrBarDeclinesDiv" style="background-color: #fd4757; height: 100%; border-top-right-radius: 10px; border-bottom-right-radius: 10px; width: ${declinesPercent}%;">

                                                                    </div>

                                                            </div>

                                                            <div class="d-flex flex-row" style="height: 20px; justify-content: end;">
                                                                <span id="tsrAdrDeclinesPercentText" style="white-space: nowrap; font-weight: bold; color: #fd4757;">${declinesPercent.toFixed()}%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-2 d-flex align-content-center  flex-wrap justify-content-center">
                                                    <a href="${data.adrDetailsPageUrl}"><button type="button"
                                                            class="btn btn-custom primary btn-sm h-auto w-auto">Detailed
                                                            View</button></a>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
    `;

    return html;
}

document.getElementById("tsrAdrCardContainer").innerHTML = createAdrCardWithSbSelect(adrCardData);

adrCardData.numAdvances = 30;
adrCardData.numDeclines = 70;

function updateAdvanceDeclineCard() {
    let stockBasketSelect = document.getElementById("tsrAdrStockBasketSelect");

    // TODO 
    // get corresponding data for option selected

    let advancesTextElement = document.getElementById("tsrAdrAdvancesText");
    let declinesTextElement = document.getElementById("tsrAdrDeclinesText");

    advancesTextElement.innerText = adrCardData.numAdvances;
    declinesTextElement.innerText = adrCardData.numDeclines;

    let totalStocks = adrCardData.numAdvances + adrCardData.numDeclines;

    let advancesPercent = (adrCardData.numAdvances / totalStocks) * 100;
    let declinesPercent = (adrCardData.numDeclines / totalStocks) * 100;

    let advancesBarElement = document.getElementById("tsrAdrBarAdvancesDiv");
    advancesBarElement.style.width = advancesPercent + "%";

    let declinesBarElement = document.getElementById("tsrAdrBarDeclinesDiv");
    declinesBarElement.style.width = declinesPercent + "%";

    let advancesPercentElement = document.getElementById("tsrAdrAdvancesPercentText");
    advancesPercentElement.innerText = advancesPercent + "%";
    let declinesPercentElement = document.getElementById("tsrAdrDeclinesPercentText");
    declinesPercentElement.innerText = declinesPercent + "%";

}



let adrCardDivData = {
    stockBasket: "Nifty 50",
    numAdvances: 20,
    numDeclines: 30,
    idSuffix: "nifty50"
}


function createAdrCard(data) {
    let totalStocks = data.numAdvances + data.numDeclines;

    let advancesPercent = (data.numAdvances / totalStocks) * 100;
    let declinesPercent = (data.numDeclines / totalStocks) * 100;

    let html = `

                                        <div class="card-body">
                                            <div class="row">
                                                <div class="mb-3 mb-md-0 col-sm-6 col-md-2 d-flex"
                                                    style="text-align: center; align-items: center; justify-content: center;">
                                                    ${data.stockBasket}
                                                </div>
                                                <div class="mb-3 mb-md-0 col-sm-6 col-md-2" style="text-align: center;">
                                                    <div class="d-flex flex-column">
                                                        <span>Advances</span>
                                                        <span style="font-size: 24;">
                                                            <font color="green" id="tsrAdrAdvancesText${data.idSuffix}"> ${data.numAdvances}</font>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="mb-3 mb-md-0 col-sm-6 col-md-2" style="text-align: center;">
                                                    <div class="d-flex flex-column">
                                                        <span>Declines</span>
                                                        <span style="font-size: 24;">
                                                            <font color="red" id="tsrAdrDeclinesText${data.idSuffix}"> ${data.numDeclines}</font>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="mb-3 mb-md-0 col-sm-6 col-md-4" style="text-align: center;">
                                                    <div class="d-flex flex-column h-100">
                                                        <span style="font-size: 16px;">
                                                            <b>
                                                                Advance Decline Ratio
                                                            </b>
                                                        </span>
                                                        <div class="d-flex flex-column" style="justify-content: center; align-content: center; flex-wrap: wrap; height: 100%;">

                                                            <div class="d-flex flex-row" style="height: 20px; justify-content: start;">
                                                                <span id="tsrAdrAdvancesPercentText${data.idSuffix}" style="white-space: nowrap; font-weight: bold;color: #008080;">${advancesPercent.toFixed()}%</span>
                                                            </div>
                                                            <div class="d-flex" 
                                                                style="height: 10px;  width: 60%;">
                                                                    <div id="tsrAdrBarAdvancesDiv${data.idSuffix}" style="background-color: #008080; height: 100%; border-top-left-radius: 10px; border-bottom-left-radius: 10px; width: ${advancesPercent}%;">

                                                                    </div>
                                                                    <div style="width: 2%;">

                                                                    </div>
                                                                    <div id="tsrAdrBarDeclinesDiv${data.idSuffix}" style="background-color: #fd4757; height: 100%; border-top-right-radius: 10px; border-bottom-right-radius: 10px; width: ${declinesPercent}%;">

                                                                    </div>

                                                            </div>

                                                            <div class="d-flex flex-row" style="height: 20px; justify-content: end;">
                                                                <span id="tsrAdrDeclinesPercentText${data.idSuffix}" style="white-space: nowrap; font-weight: bold; color: #fd4757;">${declinesPercent.toFixed()}%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-2 d-flex align-content-center  flex-wrap justify-content-center">
                                                    <a href="${data.adrDetailsPageUrl}"><button type="button"
                                                            class="btn btn-custom primary btn-sm h-auto w-auto">Detailed
                                                            View</button></a>

                                                </div>

                                            </div>
                                        </div>
    `;

    return html;
}

let adrCardDivData2 = {
    stockBasket: "Nifty 500",
    numAdvances: 100,
    numDeclines: 400,
    idSuffix: "nifty500"
}

document.getElementById("tsrAdrCardDiv").innerHTML =
    `               <div class="card text-bg-primary">
<div class="card-header" style="font-size: 18px; font-weight:600;">Advance Decline Ratio </div> ` 
            + createAdrCard(adrCardDivData) 
            + createAdrCard(adrCardDivData2)

    + `</div>`;