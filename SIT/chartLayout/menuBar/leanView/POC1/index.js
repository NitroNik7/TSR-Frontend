let chCtrlMenuBarLeft = document.getElementById("chCtrlMenuBarLeft");
const closePopupOnClickOutside = function closePopupOnClickOutside(e, DropwdownBtn, DropdownList) {
    let target = e.target;
    if (DropdownList.style.display === "block" && !(DropdownList.contains(target) || DropwdownBtn
            .contains(target))) {
        DropdownList.style.display = "none";
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
}

// chCtrlMenuBarLeft.onload = function () {
//     chCtrlMenuBarLeft.innerHTML
// }


// let tickOptions = [
//     { tick: "5m", fav: false },
//     { tick: "10m", fav: false },
//     { tick: "15m", fav: false },
//     { tick: "30m", fav: false },
//     { tick: "45m", fav: false },
//     { tick: "1Hr", fav: false },
//     { tick: "75m", fav: false },
//     { tick: "90m", fav: false },
//     { tick: "2Hrs", fav: false },
//     { tick: "3Hrs", fav: false },
//     { tick: "4Hrs", fav: false },
//     { tick: "Daily", fav: false },
//     { tick: "Weekly", fav: false },
//     { tick: "Monthly", fav: false },
//     { tick: "Quarterly", fav: false },
//     { tick: "Half Yearly", fav: false },
//     { tick: "Yearly", fav: false }
// ];

document.getElementById("tickOptionList").innerHTML =
getTickOptionList();

document.getElementById("chartTypeOptionList").innerHTML =
getChartTypeOptionList();

document.getElementById("frequencyOptionList").innerHTML =
getFrequencyOptionList();

document.getElementById("stockOptionList").innerHTML =
getMyStocksList();

document.getElementById("mySettingsOptionList").innerHTML =
getMySettingsList();

document.getElementById("drawingsOptionList").innerHTML =
getDrawingList();


function showTickOptions() {
    
    tickOptionSelector = document.getElementById("tickOptionSelector");
    tickOptionList = document.getElementById("tickOptionList");
    
    window.addEventListener("wheel", function(e) { scrollHandler(tickOptionList)});

    tickOptionList.style.top = tickOptionSelector.getBoundingClientRect().top + 40;

    tickOptionList.style.display = tickOptionList.style.display === "block" ? "none" : "block";

    if (tickOptionList.style.display == "block") {
        document.addEventListener("pointerdown", function (e) {
            closePopupOnClickOutside(e, tickOptionSelector, tickOptionList);
        });
    } else {
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
}

function getTickOptionList() {

    let tickOptions = [
        "5m",
        "10m",
        "15m",
        "30m",
        "45m",
        "1Hr",
        "75m",
        "90m",
        "2Hrs",
        "3Hrs",
        "4Hrs",
        "D",
        "Wk",
        "Mo",
        "Qtr",
        "6 Mo",
        "Yr"
    ];

    let list = ``;

    for (let i = 0; i < tickOptions.length; i++) {
        list += `<li onclick="">
                <span>${tickOptions[i]}</span>
                
                
            </li>`;
            // <button onclick="addToFavourites(${i}, ${tickOptions})"><i class="far fa-star"></i></button>
    }

    return list;
}

function showChartTypeOptions() {

    
    chartTypeOptionSelector = document.getElementById("chartTypeOptionSelector");
    chartTypechooseOptionList = document.getElementById("chartTypeOptionList");
    
    window.addEventListener("wheel", function(e) { scrollHandler(chartTypechooseOptionList)});

    chartTypechooseOptionList.style.top = chartTypeOptionSelector.getBoundingClientRect().top + 40;

    chartTypechooseOptionList.style.display = chartTypechooseOptionList.style.display === "block" ? "none" : "block";

    if (chartTypechooseOptionList.style.display == "block") {
        document.addEventListener("pointerdown", function (e) {
            closePopupOnClickOutside(e, chartTypeOptionSelector, chartTypechooseOptionList);
        });

    } else {
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
};

function getChartTypeOptionList() {
    let chartTypeOptions = [
        { type: "Line", iconUrl: "https://www.tsrsit.com/Test/Nikhil/frontend/chartLayout/menuBar/leanView/POC1/media/line.png" },
        { type: "Candle", iconUrl: "" },
        { type: "OHLC", iconUrl: "" },
        { type: "Hollow Candles", iconUrl: "https://www.tsrsit.com/Test/Nikhil/frontend/chartLayout/menuBar/leanView/POC1/media/hollowCandles.png" },
        { type: "Heikin Ashi", iconUrl: "" },
        { type: "Area", iconUrl: "" }
    ];

    let list = ``;

    for (let i = 0; i < chartTypeOptions.length; i++) {
        list += `<li onclick="chartTypeSetting('${chartTypeOptions[i]}')">
                            <span>${chartTypeOptions[i].type}</span>
                            <img style="height: 50; width: 50;" src="${chartTypeOptions[i].iconUrl}" alt="">
                        </li>`;
    }

    return list;
};

function showFrequencyOptions() {

    
    frequencyOptionSelector = document.getElementById("frequencyOptionSelector");
    frequencyOptionList = document.getElementById("frequencyOptionList");
    
    window.addEventListener("wheel", function(e) { scrollHandler(frequencyOptionList)});

    frequencyOptionList.style.top = frequencyOptionSelector.getBoundingClientRect().top + 40;

    frequencyOptionList.style.display = frequencyOptionList.style.display === "block" ? "none" : "block";

    if (frequencyOptionList.style.display == "block") {
        document.addEventListener("pointerdown", function (e) {
            closePopupOnClickOutside(e, frequencyOptionSelector, frequencyOptionList);
        });

    } else {
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
};

function getFrequencyOptionList() {
    let frequencyOptions = ["1D", "2D", "1W", "2W", "1M", "3M", "6M", "1Y", "2Y", "5Y", "10Y", "15Y", "20Y", "25Y", "YTD"];

    let list = ``;

    for (let i = 0; i < frequencyOptions.length; i++) {
        list += `<li onclick="chartTypeSetting('${frequencyOptions[i]}')">
                            <span>${frequencyOptions[i]}</span>
                        </li>`;
    }

    return list;
};

function showMySettingsOptions() {

    
    mySettingsSelector = document.getElementById("mySettingsOptionSelector");
    mySettingsOptionList = document.getElementById("mySettingsOptionList");
    
    window.addEventListener("wheel", function(e) { scrollHandler(mySettingsOptionList)});

    mySettingsOptionList.style.top = mySettingsSelector.getBoundingClientRect().top + 40;

    mySettingsOptionList.style.display = mySettingsOptionList.style.display === "block" ? "none" : "block";

    if (mySettingsOptionList.style.display == "block") {
        document.addEventListener("pointerdown", function (e) {
            closePopupOnClickOutside(e, mySettingsSelector, mySettingsOptionList);
        });

    } else {
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
};

function getMySettingsList() {
    let settingOptions = ["Setting 1", "RSI", "Support"];

    let list = ``;

    for (let i = 0; i < settingOptions.length; i++) {
        list += `<li onclick="chartTypeSetting('${settingOptions[i]}')">
                            <span>${settingOptions[i]}</span>
                        </li>`;
    }

    return list;
};


function showMyStockOptions() {

    
    stockOptionSelector = document.getElementById("stockOptionSelector");
    stockOptionList = document.getElementById("stockOptionList");
    
    window.addEventListener("wheel", function(e) { scrollHandler(stockOptionList)});

    stockOptionList.style.top = stockOptionSelector.getBoundingClientRect().top + 40;

    stockOptionList.style.display = stockOptionList.style.display === "block" ? "none" : "block";

    if (stockOptionList.style.display == "block") {
        document.addEventListener("pointerdown", function (e) {
            closePopupOnClickOutside(e, stockOptionSelector, stockOptionList);
        });

    } else {
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
};

function getMyStocksList() {
    let stockOptions = ["A", "ABB", "ACC", "ADD"];

    let list = ``;

    for (let i = 0; i < stockOptions.length; i++) {
        list += `<li onclick="chartTypeSetting('${stockOptions[i]}')">
                            <span>${stockOptions[i]}</span>
                        </li>`;
    }

    return list;
};

function showDrawingOptions() {

    drawingSelector = document.getElementById("drawingOptionSelector");
    drawingOptionList = document.getElementById("drawingsOptionList");
    
    window.addEventListener("wheel", function(e) { scrollHandler(drawingOptionList)});

    drawingOptionList.style.top = drawingSelector.getBoundingClientRect().top + 40;

    drawingOptionList.style.display = drawingOptionList.style.display === "block" ? "none" : "block";

    if (drawingOptionList.style.display == "block") {
        document.addEventListener("pointerdown", function (e) {
            closePopupOnClickOutside(e, drawingSelector, drawingOptionList);
        });

    } else {
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
};

function getDrawingList() {
    let drawingOptions = [
        {url: "https://www.tsrsit.com/Test/Nikhil/frontend/chartLayout/menuBar/leanView/POC1/media/trendline.png", name: "Trendline"}, 
        {url: "https://www.tsrsit.com/Test/Nikhil/frontend/chartLayout/menuBar/leanView/POC1/media/pivotPoint.png", name: "Pivot point"},
        {url: "https://www.tsrsit.com/Test/Nikhil/frontend/chartLayout/menuBar/leanView/POC1/media/pivotPoint.png", name: "Pivot point"},
        {url: "https://www.tsrsit.com/Test/Nikhil/frontend/chartLayout/menuBar/leanView/POC1/media/pivotPoint.png", name: "Pivot point"},
        {url: "https://www.tsrsit.com/Test/Nikhil/frontend/chartLayout/menuBar/leanView/POC1/media/pivotPoint.png", name: "Pivot point"}
        ];

    let list = ``;

    for (let i = 0; i < drawingOptions.length; i++) {
        list += `<li onclick="chartTypeSetting('${drawingOptions[i]}')">
        <span>${drawingOptions[i].name}
                            <img src="${drawingOptions[i].url}" style="width: 20px; height: 20px;"></span>
                        </li>`;
    }

    return list;
};

function scrollHandler(element) {
    
        element.style.display = "none";
        window.removeEventListener("wheel", scrollHandler);
    
}


// function addToFavourites(index, array){
//     array[index].fav = true;
// }