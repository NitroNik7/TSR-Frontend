let sttgPopup = document.getElementById("chSettingsPopup");
let chSettingsOptionContent = document.getElementById("chSettingsOptionContent");


const colorPickerHtml = getColors(colorsDesktop, colorsMobile);

function getColors(colorsDesktop, colorsMobile) {
    let colorsMobileHtml = `
    <div>
    <div onclick="showColorPicker(this)" id="colorPicker"
        style="height: 16px; width: 16px; background-color: red;">
        <i class="fa-solid fa-chart-line" style="color: white;"></i>
    </div>
    <div id="compactColorPicker" class="compact-color-picker"
        style="display: none; right: 60px; overflow: auto">
        <div id="defaultColorsMobile" class="default-colors-mobile" style="display: none;">`;
    colorsMobile.forEach((element, index) => {
        if (index % 5 == 0) {
            colorsMobileHtml += `<div class="colorRowsMobile">`;
        }
        colorsMobileHtml += (`<button onclick="selectColor(this)"
                    style="background-color: ${element.hex};" title="${element.id}"></button>`);
        if (index % 5 == 4 || index == (colorsMobile.length - 1)) {
            colorsMobileHtml += `</div>`;
        }
    });

    colorsMobileHtml += `</div>`;

    let colorsDesktopHtml = `<div id="defaultColorsDesktop" class="default-colors-desktop"
            style="display: none;">`;
    colorsDesktop.forEach((ele, index) => {
        colorsDesktopHtml += (`<div class="colorRows">`);
        colorsDesktop[index].shades.forEach((element) => {
            colorsDesktopHtml += `<button onclick="selectColor(this)"
                    style="background-color: ${element.hex};" title="${element.id}"></button>`;
        });
        colorsDesktopHtml += `</div>`;
    });
    colorsDesktopHtml += `</div>`;

    return colorsMobileHtml + colorsDesktopHtml + ' </div> </div>';
}

function showChartSettingsPopup() {
    sttgPopup.style.display = sttgPopup.style.display === "flex" ? "none" : "flex";

    let chartSettingsBtn = document.getElementById("chSettingsWrapper");
    let windowCenterXCord = window.innerWidth / 2;

    if (window.innerWidth > 500) {
        if (chartSettingsBtn.getBoundingClientRect().left > windowCenterXCord) {
            sttgPopup.style.right = "130px";
            sttgPopup.style.left = "unset";
        } else {
            sttgPopup.style.left = "130px";
            sttgPopup.style.right = "unset";
        }
    } else {
        if (chartSettingsBtn.getBoundingClientRect().left > windowCenterXCord) {
            sttgPopup.style.right = "30px";
            sttgPopup.style.left = "unset";
        } else {
            sttgPopup.style.left = "30px";
            sttgPopup.style.right = "unset";
        }
    }

}

let saveChartTypeAsDefault = `
    <div>
        <input type="checkbox" name="saveChartTypeAsDefault" class="ch_sttg_checkbox" id="saveChartTypeAsDefault" onchange="saveChartTypeAsDefault()">
        <label for="saveChartTypeAsDefault">&thinsp; Make as Default</label>
    </div>
    `;

    


function ch_settingsOption(e, option) {

    if (e != null) {
        let settingsOptionMenuListItems = document.getElementsByClassName("settingsOptionMenuListItem");
        for (let i = 0; i < settingsOptionMenuListItems.length; i++) {
            settingsOptionMenuListItems[i].classList.remove("active");
        }

        e.currentTarget.classList.add("active");
    }

    switch (option) {
        case "chart type":

            chSettingsOptionContent.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div id="chooseChartTypeOptionWrapper" class="choose_chart_type_option_wrapper">
                    <div id="chartTypeOptionSelector" class="chart_type_option_selector" onclick="showChartTypeOptions()">
                        <span>Line</span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>

                    <ul id="chartTypechooseOptionList">
                        ${getChartTypechooseOptionList()}
                    </ul>
                </div>
                    ${saveChartTypeAsDefault}
                </div> 
                <hr>
                <div id="chartTypeOption">
                    ${getChartTypeOptionsHtml("Line")}
                </div>
            `;
            break;
        case "volume":
            chSettingsOptionContent.innerHTML = `
            <div id="lineTypevolumeSettingsContainer" class="lineTypevolumeSettingsContainer">
        
        <div id="lineTypeVolumeSettings" class="lineTypeVolumeSettings">
            <div class="lineChartSettingRow">
                <span>Volume</span>
                <div class="volume_toggle_container">
                    <label class="volume_toggle">
                        <input type="checkbox" id="volumeToggleSwitch" onchange="volumeToggle()">
                        <span class="volume_toggle_slider"></span>
                    </label>
                </div>
            </div>
            <div class="lineChartSettingRow">
                <span>Up color</span>
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
                <span>Down color</span>
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
                <span>No Change color</span>
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
                <button class="ch_sttg_reset_btn" onclick="resetVolToDefault(this)">
                    Reset
                </button>
            </div>
        </div>
            `;
            break;
        case "chart style":
            chSettingsOptionContent.innerHTML = ` 
                
                `;
            break;
        case "drawings":
            chSettingsOptionContent.innerHTML = ` 
                
                `;
            break;
        case "other settings":
            chSettingsOptionContent.innerHTML = `
                
            `;
            break;
        default:
            break;
    }
}

function getSaveResetButtonChartTypeHTML(chartType){
    let html = `
        <div class="lineChartSettingRow" style="margin-top: 30px;">
            <button  onclick="save${chartType}SttgToDefault(this)">
                Save Settings
            </button>
            <button class="ch_sttg_reset_btn" onclick="reset${chartType}SttgToDefault(this)">
                Reset
            </button>
        </div>
    `;

    return html;
}

function getChartTypeOptionsHtml(option) {
    if (option == 'Line')
        return `
    <div class="lineChartOptions">
        <div id="lineSettings" class="line_settings">
            <div class="lineChartSettingRow">
                <span>Price</span>
                <div id="choosePriceOptionWrapper" class="choose_chart_type_option_wrapper">
                    <div id="priceOptionSelector" class="chart_type_option_selector" onclick="showPriceOptions()">
                        <span>Close</span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="priceOptionList">
                        ${getPricechooseOptionList()}
                    </ul>
                </div>
            </div>
            <div class="lineChartSettingRow">
                <span>Color</span>
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
                <span>Line thickness</span>
                <input type="number" style="width: 75px" value="1.5" step="0.1" min="1" max="5">
            </div>
            <div class="lineChartSettingRow">
                <span>Line style</span>
                <div id="chooseLineStyleWrapper" class="choose_chart_type_option_wrapper">
                    <div id="lineStyleSelector" class="chart_type_option_selector" onclick="showLineStyleOptions()">
                        <span><svg height="20" width="40">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:undefined ; stroke-dasharray:3 "></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineStyleOptionList">
                        ${getlineStyleOptionList()}
                    </ul>
                </div>
            </div>
            ${getSaveResetButtonChartTypeHTML("Line")}
            
            
        </div>
        </div>
    `;
    else if (option == 'Candle') {
        return `
        <div class="candleChartOptions">
        <div id="candleSettings" class="candle_settings">
            <div class="lineChartSettingRow">
                <span style="font-size: 14px;">Candle Body</span>
            </div>
            <div class="lineChartSettingRow">
                <span>Up color</span>
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
                <span>Down color</span>
                ${colorPickerHtml}
            </div>  

            <div class="lineChartSettingRow" style="margin-top: 25px;">
                <label for="ch_sttg_showWick" style="font-size: 14px; cursor: pointer;">Candle Wick</label>
                <input type="checkbox" name="ch_sttg_showWick" id="ch_sttg_showWick" class="ch_sttg_checkbox" checked>
            </div>

           
        </div>  
        </div>
        
        `

        ;
    } else if (option == 'OHLC') {
        return `
        <div class="ohlcChartOptions">
        <div id="ohlcSettings" class="ohlc_settings">
            <div class="lineChartSettingRow">
                <span>Up color</span>
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
                <span>Down color</span>
                ${colorPickerHtml}
            </div>  
            ${getSaveResetButtonChartTypeHTML("OHLC")}
        </div>
        </div>
        
        `;
    } else if (option == 'Heiken Ashi') {
        return `
        <div class="haChartOptions">
        <div id="haSettings" class="ha_settings">
            <div class="lineChartSettingRow">
                <span>Up color</span>
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
                <span>Down color</span>
                ${colorPickerHtml}
            </div>  
            ${getSaveResetButtonChartTypeHTML("HeikenAshi")}
        </div>
        </div>
        `;
    }
}

// For chart type selector
function showChartTypeOptions() {

    chartTypeOptionSelector = document.getElementById("chartTypeOptionSelector");
    chartTypeOptionSelector.style.focus = true;
    chartTypechooseOptionList = document.getElementById("chartTypechooseOptionList");

    chartTypechooseOptionList.style.display = chartTypechooseOptionList.style.display === "block" ? "none" : "block";

    if (chartTypechooseOptionList.style.display == "block") {
        document.addEventListener("pointerdown", function (e) {
            closePopupOnClickOutside(e, chartTypeOptionSelector, chartTypechooseOptionList);
        });

    } else {
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
}

function getChartTypechooseOptionList() {
    let chartTypeOptions = ['Line', 'Candle', 'OHLC', 'Heikin Ashi'];

    let list = ``;

    for (let i = 0; i < chartTypeOptions.length; i++) {
        list += `<li onclick="chartTypeSetting('${chartTypeOptions[i]}')">
                            <span>${chartTypeOptions[i]}</span>
                        </li>`;
    }

    return list;
}

function chartTypeSetting(option) {
    let chartTypeOption = document.getElementById("chartTypeOption");

    switch (option) {
        case "Line":
            chartTypeOptionSelector.innerHTML = `
                <span>Line</span>
                <span>
                    <i class="fas fa-caret-down"></i>
                </span>
            `;
            chartTypeOption.innerHTML = `${getChartTypeOptionsHtml("Line")}`;
            break;
        case "Candle":
            chartTypeOptionSelector.innerHTML = `
                <span>Candle</span>
                <span>
                    <i class="fas fa-caret-down"></i>
                </span>
            `;
            chartTypeOption.innerHTML = `${getChartTypeOptionsHtml("Candle")}`;
            ch_sttg_showWick();
            document.getElementById("ch_sttg_showWick").addEventListener("change", function () {
                ch_sttg_showWick();
            });
            break;
        case "OHLC":
            chartTypeOptionSelector.innerHTML = `
                <span>OHLC</span>
                <span>
                    <i class="fas fa-caret-down"></i>
                </span>
            `;
            chartTypeOption.innerHTML = `${getChartTypeOptionsHtml("OHLC")}`;
            break;
        case "Heikin Ashi":
            chartTypeOptionSelector.innerHTML = `
                <span>Heikin Ashi</span>
                <span>
                    <i class="fas fa-caret-down"></i>
                </span>
            `;
            chartTypeOption.innerHTML = `${getChartTypeOptionsHtml("Heiken Ashi")}`;
            break;
        default:
            break;
    }
    chartTypechooseOptionList.style.display = "none";
}


function showPriceOptions() {

    priceOptionSelector = document.getElementById("priceOptionSelector");
    priceOptionList = document.getElementById("priceOptionList");

    priceOptionList.style.display = priceOptionList.style.display === "block" ? "none" :
        "block";

    if (priceOptionList.style.display == "block") {
        document.addEventListener("pointerdown", function (e) {
            closePopupOnClickOutside(e, priceOptionSelector, priceOptionList);
        });
    } else {
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
}

function getPricechooseOptionList() {
    let priceOptions = ['Close', 'Open', 'High', 'Low'];

    let list = ``;

    for (let i = 0; i < priceOptions.length; i++) {
        list += `<li style="padding: 10px 10px 10px 10px" onclick="priceSetting('${priceOptions[i]}')">
                    <span>${priceOptions[i]}</span>
                </li>`;
    }

    return list;
}

function showLineStyleOptions() {

    lineStyleSelector = document.getElementById("lineStyleSelector");
    lineStyleOptionList = document.getElementById("lineStyleOptionList");

    lineStyleOptionList.style.display = lineStyleOptionList.style.display === "block" ? "none" :
        "block";

    if (lineStyleOptionList.style.display == "block") {
        document.addEventListener("pointerdown", function (e) {
            closePopupOnClickOutside(e, lineStyleSelector, lineStyleOptionList);
        });
    } else {
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
}

function getlineStyleOptionList() {
    let lineStyles = [
        `<svg height="20" width="80">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:undefined ; stroke-dasharray:3 "></line> </svg>`,
        `<svg height="20" width="80">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:undefined ; stroke-dasharray:5 "></line> </svg>`,
        `<svg height="20" width="80">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:undefined ; stroke-dasharray:8 "></line> </svg>`,
        `<svg height="20" width="80">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:undefined ; stroke-dasharray:11 "></line> </svg>`
    ];

    let list = ``;

    for (let i = 0; i < lineStyles.length; i++) {
        // Escape single quotes in the SVG string for the onclick attribute
        list += `<li onclick="lineStyleSetting(${i})">
                    ${lineStyles[i]}
                </li>`;
    }

    return list;
}

const closePopupOnClickOutside = function closePopupOnClickOutside(e, DropwdownBtn, DropdownList) {
    let target = e.target;
    if (DropdownList.style.display === "block" && !(DropdownList.contains(target) || DropwdownBtn
            .contains(target))) {
        DropdownList.style.display = "none";
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
}

function volumeToggle() {
    if (this.checked) {

    } else {}
};

function ch_sttg_showWick() {
    let wickCheckbox = document.getElementById("ch_sttg_showWick");
    let candleSettingsDiv = document.getElementById("candleSettings");
    if (wickCheckbox.checked) {
        let upColordiv = document.createElement("div");
        upColordiv.id = "ch_sttg_showWick_upColor";
        upColordiv.className = "lineChartSettingRow";
        upColordiv.innerHTML = `
            <span>Up color</span>
            ${colorPickerHtml}
        `;
        candleSettingsDiv.appendChild(upColordiv);

        let downColordiv = document.createElement("div");
        downColordiv.id = "ch_sttg_showWick_downColor";
        downColordiv.className = "lineChartSettingRow";
        downColordiv.innerHTML = `
            <span>Down color</span>
            ${colorPickerHtml}
        `;
        candleSettingsDiv.appendChild(downColordiv);

        let wickThicknessDiv = document.createElement("div");
        wickThicknessDiv.id = "ch_sttg_showWick_wickThickness";
        wickThicknessDiv.className = "lineChartSettingRow";
        wickThicknessDiv.innerHTML = `
            <span>Wick thickness</span>
            <input type="number" style="width: 75px" value="1.5" step="0.1" min="1" max="5">
        `;
        candleSettingsDiv.appendChild(wickThicknessDiv);

      
        
    } else {
        let upColordiv = document.getElementById("ch_sttg_showWick_upColor");
        let downColordiv = document.getElementById("ch_sttg_showWick_downColor");
        let wickThicknessDiv = document.getElementById("ch_sttg_showWick_wickThickness");

        candleSettingsDiv.removeChild(upColordiv);
        candleSettingsDiv.removeChild(downColordiv);
        candleSettingsDiv.removeChild(wickThicknessDiv);
    }

}