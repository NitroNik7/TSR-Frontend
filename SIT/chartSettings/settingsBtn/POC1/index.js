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
    <div class="ch_sttg_saveChartTypeAsDefaultWrapper" >
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
            <div style="padding: 10px; background-color: white; max-height: 430px; overflow-y: auto;">
            <div class="ch_sttg_chartTypeTopSection" style="display: flex; justify-content: space-between; align-items: center;">
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
                
                </div>
            `;
            break;
        case "volume":
            chSettingsOptionContent.innerHTML = `
            <div id="ch_sttg_volumeSettingsContainer" class="ch_sttg_volumeSettingsContainer" style="padding: 10px; background-color: white;">
        
        <div id="ch_sttg_VolumeSettings" class="ch_sttg_VolumeSettings">
            <div class="lineChartSettingRow">
                <span style="">Show Volume</span>
                <div class="ch_sttg_volume_toggle_container">
                    <label class="ch_sttg_volume_toggle">
                        <input type="checkbox" id="volumeToggleSwitch" onchange="volumeToggle()">
                        <span class="ch_sttg_volume_toggle_slider"></span>
                    </label>
                </div>
            </div>
            <div  class="lineChartSettingRow">
                <label for="seperatePanelForVolCheckbox" style="font-size: 14px; font-weight: 300;">Show as seperate Panel</label>
                <input type="checkbox" name="seperatePanelForVolCheckbox" class="ch_sttg_checkbox" id="ch_sttg_seperatePanelForVolCheckbox" onchange="">
            </div>

            <div class="ch_sttg_volumeRadioButtons">
                <div class="ch_sttg_volRadioButton" onclick="showVolBarSettings()">
                    <input type="radio" name="volRadioButton" id="" checked>
                    <label for="volRadioButton">Bar</label>
                </div>
                <div class="ch_sttg_volRadioButton" onclick="showVolLineSettings()">
                    <input type="radio" name="volRadioButton" id="">
                    <label for="volRadioButton">Line</label>
                </div>  
                <div class="ch_sttg_volRadioButton" onclick="showVolBarAndLineSettings()">
                    <input type="radio" name="volRadioButton" id="">
                    <label for="volRadioButton">Both</label>
                </div>  
            </div>
            
            
            <div class="lineChartSettingRow" id="resetVolButtonWrapper" style="position: fixed; bottom: 100px;">
                <button class="ch_sttg_reset_btn" onclick="resetVolToDefault(this)">
                     Reset
                 </button>
            </div>



            
            `;

            showVolBarSettings();


            //     <div class="lineChartSettingRow">
            //         <span>Up color</span>
            //         ${colorPickerHtml}
            //     </div>
            //     <div class="lineChartSettingRow">
            //         <span>Down color</span>
            //         ${colorPickerHtml}
            //     </div>
            //     <div class="lineChartSettingRow">
            //         <span>No Change color</span>
            //         ${colorPickerHtml}
            //     </div>
            //     <div class="lineChartSettingRow">
            //         <span>Opacity %</span>
            //         <input type="number" style="width: 75px" value="10" step="10" min="10" max="100">
            //     </div>
            //     

            //     <div class="lineChartSettingRow" style="margin-top: 25px;">
            //         <label for="ch_sttg_showVolLine" style="font-size: 14px; cursor: pointer; font-weight: 300;">Plot Volume with line</label>
            //         <input type="checkbox" name="ch_sttg_showVolLine" id="ch_sttg_showVolLine" class="ch_sttg_checkbox" checked>
            //     </div>

            // </div>



            ch_sttg_showVolLine();
            document.getElementById("ch_sttg_showVolLine").addEventListener("change", function () {
                ch_sttg_showVolLine();
            });
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

function getSaveResetButtonChartTypeHTML(chartType) {
    let html = `
        <div class="lineChartSettingRow" id="saveResetChartTypeButtonWrapper" style="position: fixed; bottom: 100px;">
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
    if (option == 'Line') {
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
    } else if (option == 'Candle') {
        return `
        <div class="candleChartOptions">
        <div id="candleSettings" class="candle_settings">
            <div class="lineChartSettingRow">
                <span style="font-size: 14px; font-weight: 300;">Candle Body</span>
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
                <span>Neutral color</span>
                ${colorPickerHtml}
            </div>  

            <div class="lineChartSettingRow" style="margin-top: 25px;">
                <label for="ch_sttg_showWick" style="font-size: 14px; cursor: pointer; font-weight: 300;">Candle Wick</label>
                <input type="checkbox" name="ch_sttg_showWick" id="ch_sttg_showWick" class="ch_sttg_checkbox" checked>
            </div>

           ${getSaveResetButtonChartTypeHTML("Candle")}
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
        <div id="candleSettings" class="candle_settings">
            <div class="lineChartSettingRow">
                <span style="font-size: 14px; font-weight: 300;">Candle Body</span>
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
                <span>Neutral color</span>
                ${colorPickerHtml}
            </div>  

            <div class="lineChartSettingRow" style="margin-top: 25px;">
                <label for="ch_sttg_showWick" style="font-size: 14px; cursor: pointer; font-weight: 300;">Candle Wick</label>
                <input type="checkbox" name="ch_sttg_showWick" id="ch_sttg_showWick" class="ch_sttg_checkbox" checked>
            </div>

           ${getSaveResetButtonChartTypeHTML("HeikinAshi")}
        </div>  
        </div>
        `;
    }
    else if (option == 'Hollow Candle') {
        return `
        <div class="hollowCandleChartOptions">
        <div id="candleSettings" class="hollow_candle_settings">
            <div class="lineChartSettingRow">
                <span style="font-size: 14px; font-weight: 300;">Candle Borders</span>
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
                <span>Neutral color</span>
                ${colorPickerHtml}
            </div>  

            <div class="lineChartSettingRow" style="margin-top: 25px;">
                <label for="ch_sttg_showWick" style="font-size: 14px; cursor: pointer; font-weight: 300;">Candle Wick</label>
                <input type="checkbox" name="ch_sttg_showWick" id="ch_sttg_showWick" class="ch_sttg_checkbox" checked>
            </div>

           ${getSaveResetButtonChartTypeHTML("HollowCandles")}
        </div>  
        </div>
        
        `

        ;
    } 
    else if (option == 'Area') {
        return `
        <div class="areaChartOptions">
        <div id="areaSettings" class="area_settings">
            
            <div class="lineChartSettingRow">
                <span>Fill color</span>
                ${colorPickerHtml}
            </div>
            
           ${getSaveResetButtonChartTypeHTML("Area")}
        </div>  
        </div>
        
        `

        ;
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
    let chartTypeOptions = ['Line', 'Candle', 'OHLC', 'Hollow Candles', 'Heikin Ashi', 'Area'];

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

            // To be used
            chartTypeOption.innerHTML = `${getChartTypeOptionsHtml("Candle")}`;
            ch_sttg_showWick();
            document.getElementById("ch_sttg_showWick").addEventListener("change", function () {
                ch_sttg_showWick();
            });
            break;
        case "Hollow Candles":
            chartTypeOptionSelector.innerHTML = `
                <span>Hollow Candles</span>
                <span>
                    <i class="fas fa-caret-down"></i>
                </span>
            `;

            // To be used
            chartTypeOption.innerHTML = `${getChartTypeOptionsHtml("Hollow Candle")}`;
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
            ch_sttg_showWick();
            document.getElementById("ch_sttg_showWick").addEventListener("change", function () {
                ch_sttg_showWick();
            });
            break;
        case "Area":
            chartTypeOptionSelector.innerHTML = `
                <span>Area</span>
                <span>
                    <i class="fas fa-caret-down"></i>
                </span>
            `;

            // To be used
            chartTypeOption.innerHTML = `${getChartTypeOptionsHtml("Area")}`;
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

function ch_sttg_showWick() {
    let wickCheckbox = document.getElementById("ch_sttg_showWick");
    let candleSettingsDiv = document.getElementById("candleSettings");
    if (wickCheckbox.checked) {
        let colorDiv = document.createElement("div");
        colorDiv.id = "ch_sttg_showWick_color";
        colorDiv.className = "lineChartSettingRow";
        colorDiv.innerHTML = `
        <span>Color</span>
        ${colorPickerHtml}
        `;
        candleSettingsDiv.appendChild(colorDiv);

        let wickThicknessDiv = document.createElement("div");
        wickThicknessDiv.id = "ch_sttg_showWick_wickThickness";
        wickThicknessDiv.className = "lineChartSettingRow";
        wickThicknessDiv.innerHTML = `
        <span>Wick thickness</span>
        <input type="number" style="width: 75px" value="1.5" step="0.1" min="1" max="5">
        `;
        candleSettingsDiv.appendChild(wickThicknessDiv);



    } else {
        let colordiv = document.getElementById("ch_sttg_showWick_color");
        let wickThicknessDiv = document.getElementById("ch_sttg_showWick_wickThickness");

        candleSettingsDiv.removeChild(colordiv);
        candleSettingsDiv.removeChild(wickThicknessDiv);
    }

}

function volumeToggle() {
    if (this.checked) {

    } else {}
};

function showVolLineSettings() {
    let volumeSettingsDiv = document.getElementById("ch_sttg_VolumeSettings");
    let volBarSettingsDiv = document.getElementById("volBarSettingsDiv");
    let volLineSettingsDiv = document.getElementById("volLineSettingsDiv");

    if (volBarSettingsDiv != undefined) {
        volBarSettingsDiv.remove();
    }
    if (volLineSettingsDiv != undefined) {
        volLineSettingsDiv.remove();
    }

    volLineSettingsDiv = document.createElement("div");
    volLineSettingsDiv.id = "volLineSettingsDiv";

    volLineSettingsDiv.innerHTML = `
        <div class="lineChartSettingRow">
                <span>Color</span>
            ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
                <span>Line thickness</span>
            <input type="number" style="width: 75px" value="1.5" step="0.1" min="1" max="5">
            </div>
    `;

    volumeSettingsDiv.append(volLineSettingsDiv);


}

function showVolBarSettings() {
    let volumeSettingsDiv = document.getElementById("ch_sttg_VolumeSettings");
    let volLineSettingsDiv = document.getElementById("volLineSettingsDiv");
    let volBarSettingsDiv = document.getElementById("volBarSettingsDiv");

    if (!(volLineSettingsDiv == undefined)) {
        volLineSettingsDiv.remove();
    }

    if (!(volBarSettingsDiv == undefined)) {
        volBarSettingsDiv.remove();
    }

    volBarSettingsDiv = document.createElement("div");
    volBarSettingsDiv.id = "volBarSettingsDiv";

    volBarSettingsDiv.innerHTML = `
        <div class="lineChartSettingRow">
                <span>Up color</span>
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
                <span>Down color</span>
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
                <span>Neutral color</span>
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
                <span>Opacity %</span>
                <input type="number" style="width: 75px" value="10" step="10" min="10" max="100">
            </div>
    
    `;

    volumeSettingsDiv.append(volBarSettingsDiv);
}

function showVolBarAndLineSettings() {
    let volumeSettingsDiv = document.getElementById("ch_sttg_VolumeSettings");
    let volLineSettingsDiv = document.getElementById("volLineSettingsDiv");
    let volBarSettingsDiv = document.getElementById("volBarSettingsDiv");

    if (!(volLineSettingsDiv == undefined)) {
        volLineSettingsDiv.remove();
    }

    if (!(volBarSettingsDiv == undefined)) {
        volBarSettingsDiv.remove();
    }

    volBarSettingsDiv = document.createElement("div");
    volBarSettingsDiv.id = "volBarSettingsDiv";

    volBarSettingsDiv.innerHTML = `
        <div class="lineChartSettingRow">
                <span>Up color</span>
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
                <span>Down color</span>
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
                <span>Neutral color</span>
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
                <span>Opacity %</span>
                <input type="number" style="width: 75px" value="10" step="10" min="10" max="100">
            </div>
    
    `;

    volumeSettingsDiv.append(volBarSettingsDiv);
}

function ch_sttg_showVolLine() {
    let volLineCheckbox = document.getElementById("ch_sttg_showVolLine");
    let volumeSettingsDiv = document.getElementById("ch_sttg_VolumeSettings");
    if (volLineCheckbox.checked) {

        let lineColordiv = document.createElement("div");
        lineColordiv.id = "ch_sttg_volLine_color";
        lineColordiv.className = "lineChartSettingRow";
        lineColordiv.innerHTML = `
            <span>Color</span>
            ${colorPickerHtml}
        `;
        volumeSettingsDiv.appendChild(lineColordiv);

        let volLineThicknessDiv = document.createElement("div");
        volLineThicknessDiv.id = "ch_sttg_volLine_thickness";
        volLineThicknessDiv.className = "lineChartSettingRow";
        volLineThicknessDiv.innerHTML = `
            <span>Line thickness</span>
            <input type="number" style="width: 75px" value="1.5" step="0.1" min="1" max="5">
        `;
        volumeSettingsDiv.appendChild(volLineThicknessDiv);
    } else {
        let lineColordiv = document.getElementById("ch_sttg_volLine_color");
        let volLineThicknessDiv = document.getElementById("ch_sttg_volLine_thickness");

        volumeSettingsDiv.removeChild(lineColordiv);
        volumeSettingsDiv.removeChild(volLineThicknessDiv);
    }

}