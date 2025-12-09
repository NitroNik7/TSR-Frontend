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

    chartTypechooseOptionList.style.top = chartTypeOptionSelector.getBoundingClientRect().top + 60;

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
        { type: "Line", iconUrl: `<svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" style="padding: 0;">
    <polyline xmlns="http://www.w3.org/2000/svg" points="2,30 10,15 17,24 27,5" fill="none" stroke="currentColor" stroke-width="2"></polyline>
</svg>` },
        { type: "Candle", iconUrl: `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30" height="30" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet" style="padding: 0 !important;">
                                                                    <g transform="translate(10,49.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                                                                        <path d="M280 460 c0 -27 -3 -30 -30 -30 l-30 0 0 -130 0 -130 30 0 c29 0 30 -1 30 -50 0 -27 5 -50 10 -50 6 0 10 23 10 50 0 49 1 50 30 50 l30 0 0 130 0 130 -30 0 c-27 0 -30 3 -30 30 0 17 -4 30 -10 30 -5 0 -10 -13 -10 -30z"></path>
                                                                        <path d="M60 310 c0 -16 -7 -20 -30 -20 l-30 0 0 -120 0 -120 30 0 c23 0 30 -4 30 -20 0 -11 5 -20 10 -20 6 0 10 9 10 20 0 16 7 20 30 20 l30 0 0 120 0 120 -30 0 c-23 0 -30 4 -30 20 0 11 -4 20 -10 20 -5 0 -10 -9 -10 -20z"></path>
                                                                    </g>
                                                                </svg>` },
        { type: "OHLC", iconUrl: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="30" height="30" style="padding: 0;">
    <g transform="translate(20, 0)">
        <path fill="currentColor" d="M20 10h-3v15h-8v3h8v15h3v-5h8v-3h-8V10ZM0 12h-3v25h-8v3h8v5h3V20h8v-3h-8v-8Z"></path>
    </g>
</svg>` },
        { type: "Hollow Candles", iconUrl: `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30" height="30" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet" style="padding: 0 !important;">
    <g transform="translate(10,49) scale(0.100000,-0.100000)" fill="none" stroke="currentColor" stroke-width="20"> <!-- Increased stroke-width -->
        <!-- Left Candle -->
        <path d="M280 460 c0 -27 -3 -30 -30 -30 l-30 0 0 -130 0 -130 30 0 c29 0 30 -1 30 -50 0 -27 5 -50 10 -50 6 0 10 23 10 50 0 49 1 50 30 50 l30 0 0 130 0 130 -30 0 c-27 0 -30 3 -30 30 0 17 -4 30 -10 30 -5 0 -10 -13 -10 -30z"></path>
        <!-- Right Candle -->
        <path d="M60 310 c0 -16 -7 -20 -30 -20 l-30 0 0 -120 0 -120 30 0 c23 0 30 -4 30 -20 0 -11 5 -20 10 -20 6 0 10 9 10 20 0 16 7 20 30 20 l30 0 0 120 0 120 -30 0 c-23 0 -30 4 -30 20 0 11 -4 20 -10 20 -5 0 -10 -9 -10 -20z"></path>
    </g>
</svg>` },
        { type: "Heikin Ashi", iconUrl: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 50" style="padding: 0;">
    <!-- Background -->
    <rect width="50" height="50" fill="none"></rect>

    <!-- Bullish Candle 1 -->
    <line x1="16" y1="10" x2="16" y2="30" stroke="currentColor" stroke-width="2"></line> <!-- High Line (Wick) -->
    <rect x="8" y="20" width="15" height="25" fill="black" ></rect> <!-- Body -->


    <!-- Bullish Candle 2 -->
    <line x1="36" y1="5" x2="36" y2="30" stroke="currentColor" stroke-width="2"></line> <!-- High Line (Wick) -->
    <rect x="28" y="15" width="15" height="25" fill="white" stroke="currentColor" stroke-width="2"></rect> <!-- Body -->


</svg>` },
        { type: "Area", iconUrl: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 50"  style="padding: 0;">
    <rect width="50" height="50" fill="none"></rect>
    <path d="M5 40 L15 20 L25 30 L35 10 L45 25 L45 40 Z" fill="gray" style="/* stroke: currentColor; *//* stroke-width: 3; */fill: lightgray;"></path>
    <path d="M5 40 L15 20 L25 30 L35 10 L45 25" fill="none" style="stroke: black;stroke-width: 3;"></path>
</svg>` }
    ];

    let list = ``;

    for (let i = 0; i < chartTypeOptions.length; i++) {
        list += `<li onclick="chartTypeSetting('${chartTypeOptions[i]}')"  style="padding: 10px 5px 10px 0 !important;">
                            <span>${chartTypeOptions[i].type}</span>
                            ${chartTypeOptions[i].iconUrl}
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
        {svg: `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30" height="30" viewBox="0 0 236.000000 236.000000" preserveAspectRatio="xMidYMid meet" style="padding: 0;">
<g transform="translate(0.000000,236.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
<path d="M174 2336 c-65 -30 -120 -85 -150 -150 l-24 -51 0 -955 0 -955 24 -51 c30 -65 85 -120 150 -150 l51 -24 955 0 955 0 51 24 c65 30 120 85 150 150 l24 51 0 955 0 955 
-24 51 c-30 65 -85 120 -150 150 l-51 24 -955 0 -955 0 -51 -24z m1929 -124 c59 -30 103 -82 122 -146 23 -77 22 -1698 -1 -1775 -21 -72 -83 -134 -155 -155 -77 -23 -1698 -24 -1775 
-1 -64 19 -116 63 -146 122 l-23 48 -3 845 c-2 572 1 861 8 895 19 90 90 163 175 184 24 5 384 9 895 8 l855 -2 48 -23z"/>
<path d="M1876 2040 c-35 -11 -75 -47 -88 -80 -16 -40 -10 -117 12 -167 11 -26 17 -50 13 -53 -5 -4 -287 -261 -628 -571 -341 -310 -628 -570 -638 -578 -14 -11 -24 -10 -71 9 -151 63 -265 
-51 -211 -211 57 -167 271 -236 359 -116 26 36 28 136 4 182 l-16 30 609 555 c776 707 688 633 732 615 115 -48 217 16 217 136 0 108 -79 213 -184 244 -55 17 -68 17 -110 5z"/>
</g>
</svg>`, name: "Trendline"}, 
        {svg: `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30" height="30" viewBox="0 0 242.000000 240.000000" preserveAspectRatio="xMidYMid meet" style="padding: 0;">
<metadata>

</metadata>
<g transform="translate(0.000000,240.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
<path d="M182 2340 c-69 -35 -104 -72 -138 -145 l-24 -50 0 -965 0 -965 24 -51 c28 -60 81 -116 136 -144 38 -20 58 -20 1027 -20 l988 0 52 30 c57 33 91 72 122 140 20 44 21 62 21 1010 l0 965 -24 50 c-27 58 -84 118 -141 148 l-40 22 -971 3 -970 2 -62 -30z m1938 -124 c49 -26 88 -64 113 -111 l22 -40 0 -885 0 -885 -28 -48 c-36 -60 -94 -103 -160 -117 -37 -8 -301 -10 -897 -8 -844 3 -845 3 -885 25 -47 25 -85 64 -111 113 -18 33 -19 78 -22 894 -3 975 -6 933 73 1011 77 77 30 74 1000 72 818 -2 862 -3 895 -21z"/>
<path d="M369 1711 l-24 -19 -3 -560 c-2 -513 -1 -560 14 -573 12 -10 46 -14 116 -14 87 0 101 2 114 19 11 16 14 61 14 203 l0 183 93 0 c213 0 356 76 423 223 26 57 29 72 29 182 0 111 -2 124 -28 177 -30 62 -84 116 -148 148 -74 38 -160 50 -375 50 -184 0 -204 -2 -225 -19z m443 -209 c49 -31 72 -82 71 -159 -2 -129 -72 -193 -210 -193 l-73 0 0 191 0 191 88 -4 c68 -3 96 -9 124 -26z"/>
<path d="M1346 1707 l-26 -26 0 -561 0 -560 28 -11 c29 -12 189 -8 210 5 9 5 12 58 12 202 l0 194 95 0 c267 0 418 107 456 324 29 169 -28 322 -145 391 -87 51 -125 57 -373 62 l-232 5 -25 -25z m405 -188 c74 -25 109 -82 109 -177 0 -128 -70 -192 -212 -192 l-78 0 0 190 0 190 74 0 c40 0 88 -5 107 -11z"/>
</g>
</svg>`, name: "Pivot Point"},
        {svg: `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30" height="30" viewBox="0 0 238.000000 238.000000" preserveAspectRatio="xMidYMid meet" style="padding: 0 ;">
<metadata>

</metadata>
<g transform="translate(0.000000,238.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
<path d="M290 2347 c-53 -16 -134 -71 -165 -111 -14 -19 -35 -58 -46 -86 -18 -48 -19 -86 -19 -969 0 -1006 -3 -955 60 -1046 32 -47 91 -92 150 -116 29 -12 190 -15 935 -17 1041 -4 1004 -7 1106 85 74 67 69 -18 69 1101 l0 1008 -36 42 c-31 37 -124 110 -131 104 -2 -1 -4 -2 -5 -1 -2 0 -12 3 -23 7 -37 12 -1857 11 -1895 -1z m1860 -157 c60 -34 98 -91 110 -165 13 -82 13 -1625 0 -1696 -13 -68 -51 -123 -109 -157 l-46 -27 -870 0 c-804 0 -872 1 -901 17 -44 24 -88 70 -110 115 -18 36 -19 76 -22 866 -2 545 1 848 8 885 11 62 46 122 85 148 67 44 56 43 955 41 l855 -2 45 -25z"/>
<path d="M1105 1603 c-11 -3 -24 -8 -28 -12 -13 -13 -10 -851 4 -867 8 -10 34 -14 81 -14 119 0 108 -44 108 444 0 359 -2 425 -15 436 -15 13 -118 22 -150 13z"/>
<path d="M460 1580 c-19 -19 -20 -33 -20 -428 0 -477 -8 -442 107 -442 103 0 103 1 103 193 l0 157 133 0 c134 0 134 0 145 25 19 42 15 102 -9 126 -18 18 -30 20 -145 17 l-124 -3 0 103 0 102 139 0 c107 0 141 3 150 14 19 23 24 81 11 120 l-12 36 -229 0 c-216 0 -230 -1 -249 -20z"/>
<path d="M1446 1585 c-14 -15 -16 -59 -16 -426 0 -396 1 -410 20 -429 18 -18 33 -20 183 -20 214 1 293 20 366 92 120 117 98 314 -41 378 l-38 17 24 11 c40 18 80 98 80 157 0 100 -42 167 -130 207 -45 21 -66 23 -240 26 -167 3 -193 1 -208 -13z m294 -144 c57 -12 80 -40 80 -98 0 -33 -6 -50 -25 -68 -21 -22 -33 -25 -100 -25 l-75 0 0 100 0 100 38 0 c20 -1 57 -5 82 -9z m93 -379 c49 -46 43 -132 -12 -169 -29 -19 -47 -23 -117 -23 l-84 0 0 111 0 111 94 -4 c82 -3 98 -6 119 -26z"/>
</g>
</svg>`, name: "Fibonacci"},
        {svg: `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30" height="30" viewBox="0 0 236.000000 236.000000" preserveAspectRatio="xMidYMid meet" style="padding: 0;">
<metadata>

</metadata>
<g transform="translate(0.000000,236.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
<path d="M174 2336 c-65 -30 -120 -85 -150 -150 l-24 -51 0 -955 0 -955 24 -51 c30 -65 85 -120 150 -150 l51 -24 955 0 955 0 51 24 c65 30 120 85 150 150 l24 51 0 955 0 955 -24 51 c-30 65 -85 120 -150 150 l-51 24 -955 0 -955 0 -51 -24z m1929 -124 c59 -30 103 -82 122 -146 23 -77 22 -1698 -1 -1775 -21 -72 -83 -134 -155 -155 -77 -23 -1698 -24 -1775 -1 -64 19 -116 63 -146 122 l-23 48 -3 845 c-2 572 1 861 8 895 19 90 90 163 175 184 24 5 384 9 895 8 l855 -2 48 -23z"/>
<path d="M331 1375 c-50 -16 -103 -63 -126 -111 -20 -42 -19 -136 1 -177 43 -84 107 -121 204 -115 76 4 121 28 158 84 l22 34 603 0 602 0 20 -31 c33 -51 98 -83 169 -83 125 1 206 83 206 209 0 84 -39 148 -112 186 -44 23 -134 25 -181 6 -32 -14 -107 -88 -107 -107 0 -7 -208 -10 -599 -10 l-599 0 -22 35 c-44 71 -153 108 -239 80z"/>
</g>
</svg>`, name: "Horizontal Line"},
        {svg: `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30" height="30" viewBox="0 0 236.000000 237.000000" preserveAspectRatio="xMidYMid meet" style="padding: 0;">
<metadata>

</metadata>
<g transform="translate(0.000000,237.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
<path d="M174 2346 c-60 -28 -115 -80 -146 -139 l-23 -42 0 -980 0 -980 23 -42 c31 -59 86 -111 146 -139 l51 -24 955 0 955 0 51 24 c60 28 115 80 146 139 l23 42 0 980 0 980 -23 42 c-31 59 -86 111 -146 139 l-51 24 -955 0 -955 0 -51 -24z m1921 -121 c21 -10 56 -36 77 -57 70 -70 68 -41 68 -983 0 -952 3 -913 -74 -990 -24 -23 -60 -49 -82 -56 -56 -20 -1750 -21 -1806 -1 -20 7 -55 31 -78 53 -80 78 -75 11 -78 964 -2 550 1 867 8 898 20 93 94 169 183 187 23 4 425 7 892 7 823 -2 851 -3 890 -22z"/>
<path d="M1095 2173 c-76 -40 -115 -103 -115 -188 0 -31 6 -70 13 -88 14 -32 88 -107 107 -107 7 0 10 -208 10 -600 l0 -600 -38 -25 c-105 -69 -117 -227 -25 -317 47 -46 79 -58 149 -58 85 0 149 40 189 119 13 25 16 52 13 101 -4 76 -28 121 -84 158 l-34 22 0 603 0 602 35 22 c50 33 79 95 79 168 -1 87 -42 153 -118 189 -44 21 -142 20 -181 -1z"/>
</g>
</svg>`, name: "Vertical Line"}
        ];

    let list = ``;

    for (let i = 0; i < drawingOptions.length; i++) {
        list += `<li onclick="chartTypeSetting('${drawingOptions[i]}')" style="padding: 10px 5px 10px 0 !important;">
        <span>${drawingOptions[i].name}</span>
        ${drawingOptions[i].svg}
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