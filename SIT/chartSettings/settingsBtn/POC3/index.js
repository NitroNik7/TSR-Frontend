let sttgPopup = document.getElementById("chSettingsPopup");
let chSettingsOptionContent = document.getElementById("chSettingsOptionContent");


const colorPickerHtml = getColors(colorsDesktop, colorsMobile);

function getColors(colorsDesktop, colorsMobile) {
    let colorsMobileHtml = `
    <div style="padding: 5px; border: 1px solid gray; border-radius: 5px;">
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
    // Toggle the display of the popup
    sttgPopup.style.display = sttgPopup.style.display === "flex" ? "none" : "flex";

    // Get the popup dimensions
    let popupWidth = sttgPopup.offsetWidth; // Get the width of the popup
    let windowWidth = window.innerWidth; // Get the width of the window

    // Center the popup
    if (sttgPopup.style.display === "flex") {
        // Calculate the left position to center the popup
        let leftPosition = (windowWidth - popupWidth) / 2;

        // Set the left position and reset right
        sttgPopup.style.left = `${leftPosition}px`;
        sttgPopup.style.right = "unset"; // Reset right
    } else {
        // Optionally reset the position when hiding
        sttgPopup.style.left = "unset";
        sttgPopup.style.right = "unset";
    }
}
let saveChartTypeAsDefault = `
    <div class="ch_sttg_saveChartTypeAsDefaultWrapper" >
        <input type="checkbox" name="saveChartTypeAsDefault" class="ch_sttg_checkbox" id="saveChartTypeAsDefault" onchange="saveChartTypeAsDefault()">
        <label for="saveChartTypeAsDefault">&thinsp; Mark as Default</label>
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
                    ${lineSettingsHtml}

                    <hr>
                    ${candleSettingsHtml}

                    <hr>
                    ${ohlcSettingsHtml}

                    <hr>
                    ${haSettingsHtml}

                    <hr>
                    ${hollowCandleSettingsHtml}

                    <hr>
                    ${areaChartSettingsHtml}
                    </div>
                
                </div>
                ${getSaveResetButtonChartTypeHTML()}
            `;
            break;
        case "volume":
            chSettingsOptionContent.innerHTML = `
            <div id="ch_sttg_volumeSettingsContainer" class="ch_sttg_volumeSettingsContainer" style="padding: 10px; background-color: white;">
            <div class="lineChartSettingRow">
                        <span style="">Show Volume</span>
                        <div class="ch_sttg_toggle_container">
                            <label class="ch_sttg_volume_toggle">
                                <input type="checkbox" id="volumeToggleSwitch" onchange="volumeToggle(this)">
                                <span class="ch_sttg_toggle_slider"></span>
                            </label>
                        </div>
                    </div>
                    <hr>
                <div id="ch_sttg_VolumeSettings" class="ch_sttg_VolumeSettings">
                    
                    <div class="lineChartSettingRow" id="ch_sttg_volPlotTypeSettingsWrapper" style="flex-direction: column; align-items: unset;">
                        <div class="ch_sttg_volumeRadioButtons">
                            <div class="ch_sttg_volRadioButtons" onclick="showVolBarSettings()">
                                <input id="volBarSettings" type="radio" name="volRadioButton" id="">
                                <label for="volRadioButton" style="cursor: pointer;">Bar</label>
                            </div>
                            <div class="ch_sttg_volRadioButtons" onclick="showVolLineSettings()">
                                <input id="volLineSettings" type="radio" name="volRadioButton" id="" >
                                <label for="volRadioButton" style="cursor: pointer;">Line</label>
                            </div>  
                            <div class="ch_sttg_volRadioButtons" onclick="showVolBarAndLineSettings()">
                                <input id="volBarAndLineSettings" type="radio" name="volRadioButton">
                                <label for="volRadioButton" style="cursor: pointer;">Both</label>
                            </div>  
                            <hr>
                        </div>
                    </div>
                    <hr>
                    <div class="lineChartSettingRow">
                        <span>Visibility %</span>
                        <input type="number" style="width: 75px" value="10" step="10" min="10" max="100">
                    </div>
                    <div  class="lineChartSettingRow">
                        <label for="ch_sttg_plotVolumeMA" style="font-size: 14px; font-weight: 300;">Show Volume as seperate Panel</label>
                        <div class="ch_sttg_toggle_container">
                            <label class="ch_sttg_volume_toggle">
                                <input type="checkbox" id="ch_sttg_plotVolumeMA" onchange="showVolAsSeperatePanel()">
                                <span class="ch_sttg_toggle_slider"></span>
                            </label>
                        </div>
                    </div>
                    <div  class="lineChartSettingRow">
                        <label for="ch_sttg_plotVolumeMA" style="font-size: 14px; font-weight: 300;">Plot Volume MA on Chart</label>
                        <div class="ch_sttg_toggle_container">
                            <label class="ch_sttg_volume_toggle">
                                <input type="checkbox" id="ch_sttg_plotVolumeMA" onchange="plotVolumeMA(this)">
                                <span class="ch_sttg_toggle_slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    </div>
                </div>


            ${getSaveResetButtonChartTypeHTML("Volume")}

            
            `;
            
            volumeToggle(document.getElementById('volumeToggleSwitch'));
            showVolBarSettings();
            break;
        case "chart style":
            chSettingsOptionContent.innerHTML = ` 
                <div id="ch_sttg_chartStyleSettingsContainer" class="ch_sttg_chartStyleSettingsContainer" style="padding: 10px; background-color: white;">
                    <div id="ch_sttg_chartStyleSettingsContainer" class="ch_sttg_chartStyleSettingsContainer"
                        style="padding: 10px; background-color: white;">
                        <div>
                            <div class="lineChartSettingRow">
                                <span style="font-size: 14px; font-weight: 600;">Crosshair</span>
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
                                <span>Style</span>
                                <div id="chooseCrosshairOptionWrapper" class="choose_chart_type_option_wrapper">
                                    <div id="crosshairStyleOptionSelector" class="chart_type_option_selector" onclick="showCrosshairStyleOptions()">
                                        <span>
                                            <svg height="20" width="40">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:undefined ; stroke-dasharray:3 "></line> </svg>
                                        </span>
                                        <span>
                                            <i class="fas fa-caret-down"></i>
                                        </span>
                                    </div>
                                    <ul id="crosshairStyleOptionList">
                                        ${getCrosshairStyleOptionList()}
                                    </ul>
                                </div>
                            </div>
                            <div class="lineChartSettingRow">
                                <span style="font-size: 14px; font-weight: 600;">Axes</span>
                            </div>
                            <div class="lineChartSettingRow">
                                <span>Tick color</span>
                                ${colorPickerHtml}
                            </div>
                            <div class="lineChartSettingRow">
                                <span>Tick size</span>
                                <input type="number" style="width: 75px" value="1" step="0.1" min="1" max="5">
                            </div>
                            <div class="lineChartSettingRow">
                                <span style="font-size: 14px; font-weight: 00;">Y Axis</span>
                            </div>
                            <div class="lineChartSettingRow">
                                <span>Position</span>
                                <div id="chooseaxisPositionsOptionWrapper" class="choose_chart_type_option_wrapper">
                                    <div id="axisPositionOptionSelector" class="chart_type_option_selector" onclick="showAxisPositionOptions()">
                                        <span>
                                            Price Right, % Left
                                        </span>
                                        <span>
                                            <i class="fas fa-caret-down"></i>
                                        </span>
                                    </div>
                                    <ul id="axisPositionsOptionList">
                                        ${getAxisPositionsOptionList()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>





                </div>
                
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
        <div class="" id="saveResetChartTypeButtonWrapper" style="position: absolute; margin: 10px; height: auto" >
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

let lineSettingsHtml = `
<div class="lineChartSettingRow">
        <span style="font-size: 14px; font-weight: 600;">Line Settings</span>
    </div>
    <div class="lineChartOptions">
        <div id="lineSettings" class="chartTypeSttgContainer">
            <div class="lineChartSettingRow">
                <div id="choosePriceOptionWrapper" class="choose_chart_type_option_wrapper">
                    <div id="priceOptionSelector" class="chart_type_option_selector" onclick="showPriceOptions(this, 'priceOptionListForLine')">
                        <span>Close</span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="priceOptionListForLine">
                        ${getPricechooseOptionList()}
                    </ul>
                </div>
            </div>
            <div class="lineChartSettingRow">
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
                <div id="chooseLineThicknessWrapper" class="choose_chart_type_option_wrapper">
                    <div id="lineThicknessSelector" class="chart_type_option_selector" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListforLine')">
                        <span><svg height="20" width="40" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:0.7"></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineThicknessOptionListforLine">
                        ${getlineThicknessOptionList()}
                    </ul>
                </div>
            </div>
            <div class="lineChartSettingRow">
                <div id="chooseLineStyleWrapper" class="choose_chart_type_option_wrapper">
                    <div id="lineStyleSelector" class="chart_type_option_selector" onclick="showLineStyleOptions(this, 'lineStyleOptionListForLine')">
                        <span><svg height="20" width="40">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:undefined ; stroke-dasharray:3 "></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineStyleOptionListForLine">
                        ${getlineStyleOptionList()}
                    </ul>
                </div>
            </div>
            
            
            
            
        </div>
        
        </div>
        `;

let candleSettingsHtml = `
    <div class="lineChartSettingRow">
                <span style="font-size: 14px; font-weight: 600;">Candle Settings</span>
            </div>
        <div class="candleChartOptions">
        <div id="candleSettings" class="candle_settings">
            <div class="lineChartSettingRow">
                <span style="font-size: 14px; font-weight: 300;">Body</span>
            </div>
            <div class="chartTypeSttgContainer">
                <div class="lineChartSettingRow">
                <span style="font-size: 30px; margin-right: 10px; color: green"><i class="fas fa-long-arrow-alt-up"></i></span>
                    ${colorPickerHtml}
                </div>
                <div class="lineChartSettingRow">
                <span style="font-size: 30px; margin-right: 10px; color: red"><i class="fas fa-long-arrow-alt-down"></i></span>
                    ${colorPickerHtml}
                </div>  
                <div class="lineChartSettingRow">
                <span style="font-size: 25px; font-weight: 900; margin-right: 10px;"><i class="fas fa-equals"></i></span>
                    ${colorPickerHtml}
                </div>  
            </div>
            <div class="lineChartSettingRow">
                <label for="ch_sttg_showWick" style="font-size: 14px; cursor: pointer; font-weight: 300;"> Wick</label>
                <div class="ch_sttg_toggle_container">
                    <label class="ch_sttg_volume_toggle">
                        <input type="checkbox" id="" class="ch_sttg_showWick"  onclick="ch_sttg_showWick(this, 'candleSettings')">
                        <span class="ch_sttg_toggle_slider"></span>
                    </label>
                </div>
            </div>
        </div>  
        </div>
`;

let ohlcSettingsHtml = `
    <div class="lineChartSettingRow">
                <span style="font-size: 14px; font-weight: 600;">OHLC Settings</span>
            </div>

        <div class="ohlcChartOptions">
        <div id="ohlcSettings" class="chartTypeSttgContainer">
        
            <div class="lineChartSettingRow">
                <span style="font-size: 30px;
    margin-right: 10px; color: green;"><i class="fas fa-long-arrow-alt-up"></i></span>
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
                <span style="font-size: 30px;
    margin-right: 10px; color: red"><i class="fas fa-long-arrow-alt-down"></i></span>
                ${colorPickerHtml}
            </div>  
        </div>
        </div>
`

let haSettingsHtml = `
    <div class="lineChartSettingRow">
                <span style="font-size: 14px; font-weight: 600;">Heikin Ashi Settings</span>
            </div>
        <div class="candleChartOptions">
        <div id="haCandleSettings" class="candle_settings">
            <div class="lineChartSettingRow">
                <span style="font-size: 14px; font-weight: 300;">Body</span>
            </div>
            <div class="chartTypeSttgContainer">
            <div class="lineChartSettingRow">
            <span style="font-size: 30px;
    margin-right: 10px; color: green"><i class="fas fa-long-arrow-alt-up"></i></span>
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
            <span style="font-size: 30px;
    margin-right: 10px; color: red"><i class="fas fa-long-arrow-alt-down"></i></span>
                ${colorPickerHtml}
            </div>  
            <div class="lineChartSettingRow">
            <span style="font-size: 25px; font-weight: 900;
    margin-right: 10px;"><i class="fas fa-equals"></i></span>
                ${colorPickerHtml}
            </div>  
            </div>
            <div class="lineChartSettingRow">
                <label for="ch_sttg_showWick" style="font-size: 14px; cursor: pointer; font-weight: 300;"> Wick</label>
                <div class="ch_sttg_toggle_container">
                    <label class="ch_sttg_volume_toggle">
                        <input type="checkbox" id="" class="ch_sttg_showWick" onclick="ch_sttg_showWick(this, 'haCandleSettings')">
                        <span class="ch_sttg_toggle_slider"></span>
                    </label>
                </div>
            </div>

          
        </div>  
        </div>
`

let hollowCandleSettingsHtml = `
    <div class="lineChartSettingRow">
                <span style="font-size: 14px; font-weight: 600;">Hollow Candle Settings</span>
            </div>
        <div class="hollowCandleChartOptions">
        <div id="hollowCandleSettings" class="candle_settings">
            <div class="lineChartSettingRow">
                <span style="font-size: 14px; font-weight: 300;">Borders</span>
            </div>
            <div class="chartTypeSttgContainer">
            <div class="lineChartSettingRow">
            <span style="font-size: 30px;
    margin-right: 10px; color: green"><i class="fas fa-long-arrow-alt-up"></i></span>
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
            <span style="font-size: 30px;
    margin-right: 10px; color: red"><i class="fas fa-long-arrow-alt-down"></i></span>
                ${colorPickerHtml}
            </div>  
            <div class="lineChartSettingRow">
            <span style="font-size: 25px; font-weight: 900; margin-right: 10px;"><i class="fas fa-equals"></i></span>
                ${colorPickerHtml}
            </div>  
            </div>
            <div class="lineChartSettingRow">
                <label for="ch_sttg_showWick" style="font-size: 14px; cursor: pointer; font-weight: 300;">Wick</label>
                <div class="ch_sttg_toggle_container">
                    <label class="ch_sttg_volume_toggle">
                        <input type="checkbox" id="" class="ch_sttg_showWick"  onclick="ch_sttg_showWick(this, 'hollowCandleSettings')">
                        <span class="ch_sttg_toggle_slider"></span>
                    </label>
                </div>
            </div>
        </div>  
        </div>
`;

let areaChartSettingsHtml = `
<div class="lineChartSettingRow">
                <span style="font-size: 14px; font-weight: 600;">Area Chart Settings</span>
            </div>
    <div class="areaChartOptions">
        <div id="areaSettings" class="area_settings">
            <div class="lineChartSettingRow">
                <span style="font-size: 14px; font-weight: 300;">Fill</span>
            </div>
            <div class="chartTypeSttgContainer">
                <div class="lineChartSettingRow">
                    ${colorPickerHtml}
                </div>
            </div>
            <div class="lineChartSettingRow">
                <span style="font-size: 14px; font-weight: 300;">Line</span>
            </div>
            <div class="chartTypeSttgContainer">
                <div class="lineChartSettingRow">
                    <div id="choosePriceOptionWrapper" class="choose_chart_type_option_wrapper">
                        <div id="priceOptionSelector" class="chart_type_option_selector" onclick="showPriceOptions(this, 'priceOptionListForArea')">
                            <span>Close</span>
                            <span>
                                <i class="fas fa-caret-down"></i>
                            </span>
                        </div>
                        <ul id="priceOptionListForArea">
                            ${getPricechooseOptionList()}
                        </ul>
                    </div>
                </div>
                <div class="lineChartSettingRow">
                    ${colorPickerHtml}
                </div>
                <div class="lineChartSettingRow">
                <div id="chooseLineThicknessWrapper" class="choose_chart_type_option_wrapper">
                    <div id="lineThicknessSelector" class="chart_type_option_selector" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListforArea')">
                        <span><svg height="20" width="40" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:0.7"></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineThicknessOptionListforArea">
                        ${getlineThicknessOptionList()}
                    </ul>
                </div>
            </div>
                <div class="lineChartSettingRow">
                    <div id="chooseLineStyleWrapper" class="choose_chart_type_option_wrapper">
                        <div id="lineStyleSelector" class="chart_type_option_selector" onclick="showLineStyleOptions(this, 'lineStyleOptionListforArea')">
                            <span><svg height="20" width="40">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:undefined ; stroke-dasharray:3 "></line> </svg></span>
                            <span>
                                <i class="fas fa-caret-down"></i>
                            </span>
                        </div>
                        <ul id="lineStyleOptionListforArea">
                            ${getlineStyleOptionList()}
                        </ul>
                    </div>
                </div>
                </div>
            
        </div>  
        </div>
`;

// For chart type selector
function showChartTypeOptions() {

    chartTypeOptionSelector = document.getElementById("chartTypeOptionSelector");
    chartTypeOptionSelector.style.focus = true;
    chartTypechooseOptionList = document.getElementById("chartTypechooseOptionList");

    chartTypechooseOptionList.style.top = chartTypeOptionSelector.getBoundingClientRect().top + 40;

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
    switch (option) {
        case "Line":
            chartTypeOptionSelector.innerHTML = `
                <span>Line</span>
                <span>
                    <i class="fas fa-caret-down"></i>
                </span>
            `;
            break;
        case "Candle":
            chartTypeOptionSelector.innerHTML = `
                <span>Candle</span>
                <span>
                    <i class="fas fa-caret-down"></i>
                </span>
            `;
            break;
        case "Hollow Candles":
            chartTypeOptionSelector.innerHTML = `
                <span>Hollow Candles</span>
                <span>
                    <i class="fas fa-caret-down"></i>
                </span>
            `;
            break;
        case "OHLC":
            chartTypeOptionSelector.innerHTML = `
                <span>OHLC</span>
                <span>
                    <i class="fas fa-caret-down"></i>
                </span>
            `;
            break;
        case "Heikin Ashi":
            chartTypeOptionSelector.innerHTML = `
                <span>Heikin Ashi</span>
                <span>
                    <i class="fas fa-caret-down"></i>
                </span>
            `;
            break;
        case "Area":
            chartTypeOptionSelector.innerHTML = `
                <span>Area</span>
                <span>
                    <i class="fas fa-caret-down"></i>
                </span>
            `;
            break;
        default:
            break;
    }
    chartTypechooseOptionList.style.display = "none";
}

function showPriceOptions(priceOptionSelector, listName) {
    priceOptionList = document.getElementById(listName);

    priceOptionList.style.top = priceOptionSelector.getBoundingClientRect().top + 40;

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
    let priceOptions = ['Close', 'Open', 'High', 'Low', '(High+Low)/2', '(H+L+C)/3', '(O+H+L+C)/4', 'Volume'];

    let list = ``;

    for (let i = 0; i < priceOptions.length; i++) {
        list += `<li onclick="priceSetting('${priceOptions[i]}')">
                    <span>${priceOptions[i]}</span>
                </li>`;
    }

    return list;
}

function showLineThicknessOptions(lineThicknessSelector, listId) {
    lineThicknessOptionList = document.getElementById(listId);

    lineThicknessOptionList.style.display = lineThicknessOptionList.style.display === "block" ? "none" :
        "block";

        lineThicknessOptionList.style.top = lineThicknessSelector.getBoundingClientRect().top + 40;

    if (lineThicknessOptionList.style.display == "block") {
        document.addEventListener("pointerdown", function (e) {
            closePopupOnClickOutside(e, lineThicknessSelector, lineThicknessOptionList);
        });
    } else {
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
}

function getlineThicknessOptionList() {
    let lineThickness = [
        `<svg height="20" width="80" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:0.7"></line> </svg>`,
        `<svg height="20" width="80" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:1"></line> </svg>`,
        `<svg height="20" width="80" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:2"></line> </svg>`,
        `<svg height="20" width="80" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:3"></line> </svg>`
    ];

    let list = ``;

    for (let i = 0; i < lineThickness.length; i++) {
        list += `<li onclick="lineThicknessSetting(${i})">
                    ${lineThickness[i]}
                </li>`;
    }

    return list;
}

function showLineStyleOptions(lineStyleSelector, listName) {

    lineStyleOptionList = document.getElementById(listName);

    lineStyleOptionList.style.display = lineStyleOptionList.style.display === "block" ? "none" :
        "block";

    lineStyleOptionList.style.top = lineStyleSelector.getBoundingClientRect().top + 40;

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
        `<svg height="20" width="80" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:0.7"></line> </svg>`,
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

function ch_sttg_showWick(wickCheckbox, divId) {
    let candleSettingsDiv = document.getElementById(divId);
    let colordiv = document.getElementById("ch_sttg_showWick_color");
    let wickThicknessDiv = document.getElementById("ch_sttg_showWick_wickThickness");
    let parentDiv = document.getElementById("wickSttgContainer");

    if (wickCheckbox.checked) {
        parentDiv = document.createElement("div");
        parentDiv.id = "wickSttgContainer";
        parentDiv.className = "chartTypeSttgContainer";

        colorDiv = document.createElement("div");
        colorDiv.id = "ch_sttg_showWick_color";
        colorDiv.className = "lineChartSettingRow";
        colorDiv.innerHTML = `
        ${colorPickerHtml}
        `;

        wickThicknessDiv = document.createElement("div");
        wickThicknessDiv.id = "ch_sttg_showWick_wickThickness";
        wickThicknessDiv.className = "lineChartSettingRow";
        wickThicknessDiv.innerHTML = `
        <div class="lineChartSettingRow">
                <div id="chooseLineThicknessWrapper" class="choose_chart_type_option_wrapper">
                    <div id="lineThicknessSelector" class="chart_type_option_selector" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListForWick')">
                        <span><svg height="20" width="40" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:0.7"></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineThicknessOptionListForWick">
                        ${getlineThicknessOptionList()}
                    </ul>
                </div>
            </div>
        `;

        parentDiv.appendChild(colorDiv);
        parentDiv.appendChild(wickThicknessDiv);
        candleSettingsDiv.appendChild(parentDiv);
    } else {

        if (!(parentDiv == undefined)) {
            candleSettingsDiv.removeChild(parentDiv);
        }
    }

}



// Volume functions start here

function volumeToggle(showVolCheckbox) {
    let volumeSettingsDiv = document.getElementById("ch_sttg_VolumeSettings");
    if (showVolCheckbox.checked) {
        volumeSettingsDiv.style.opacity = 'unset';
        volumeSettingsDiv.style.pointerEvents = 'unset';
//         opacity: '50%',
// pointerEvents: 'none'
    } else {
        volumeSettingsDiv.style.opacity = '50%';
        volumeSettingsDiv.style.pointerEvents = 'none';
    }
};

function showVolBarSettings() {

    document.getElementById("volBarSettings").checked = true;

    let volumeSettingsDiv = document.getElementById("ch_sttg_volPlotTypeSettingsWrapper");
    let volLineSettingsDiv = document.getElementById("volLineSettingsDiv");
    let volBarSettingsDiv = document.getElementById("volBarSettingsDiv");
    let volBarAndLineSettingsDiv = document.getElementById("volBarAndLineSettingsDiv");

    if (!(volLineSettingsDiv == undefined)) {
        volLineSettingsDiv.remove();
    }

    if (!(volBarSettingsDiv == undefined)) {
        volBarSettingsDiv.remove();
    }

    if (!(volBarAndLineSettingsDiv == undefined)) {
        volBarAndLineSettingsDiv.remove();
    }

    volBarSettingsDiv = document.createElement("div");
    volBarSettingsDiv.id = "volBarAndLineSettingsDiv";

    volBarSettingsDiv.innerHTML = `
        <div class="chartTypeSttgContainer">
                <div class="lineChartSettingRow">
                <span style="font-size: 30px; margin-right: 10px; color: green"><i class="fas fa-long-arrow-alt-up"></i></span>
                    ${colorPickerHtml}
                </div>
                <div class="lineChartSettingRow">
                <span style="font-size: 30px; margin-right: 10px; color: red"><i class="fas fa-long-arrow-alt-down"></i></span>
                    ${colorPickerHtml}
                </div>  
                <div class="lineChartSettingRow">
                <span style="font-size: 25px; font-weight: 900; margin-right: 10px;"><i class="fas fa-equals"></i></span>
                    ${colorPickerHtml}
                </div>  
            </div>
            

    `;

    volumeSettingsDiv.append(volBarSettingsDiv);
}

function showVolLineSettings() {

    document.getElementById("volLineSettings").checked = true;

    let volumeSettingsDiv = document.getElementById("ch_sttg_volPlotTypeSettingsWrapper");
    let volBarSettingsDiv = document.getElementById("volBarSettingsDiv");
    let volLineSettingsDiv = document.getElementById("volLineSettingsDiv");

    let volBarAndLineSettingsDiv = document.getElementById("volBarAndLineSettingsDiv");


    if (volBarSettingsDiv != undefined) {
        volBarSettingsDiv.remove();
    }
    if (volLineSettingsDiv != undefined) {
        volLineSettingsDiv.remove();
    }

    if (!(volBarAndLineSettingsDiv == undefined)) {
        volBarAndLineSettingsDiv.remove();
    }

    volLineSettingsDiv = document.createElement("div");
    volLineSettingsDiv.id = "volLineSettingsDiv";

    volLineSettingsDiv.innerHTML = `
    
            <div id="lineSettings" class="chartTypeSttgContainer">

        <div class="lineChartSettingRow">
                <div id="choosePriceOptionWrapper" class="choose_chart_type_option_wrapper">
                    <div id="priceOptionSelector" class="chart_type_option_selector" onclick="showPriceOptions(this, 'priceOptionListForLine')">
                        <span>Close</span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="priceOptionListForLine">
                        ${getPricechooseOptionList()}
                    </ul>
                </div>
            </div>
            <div class="lineChartSettingRow">
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
                <div id="chooseLineThicknessWrapper" class="choose_chart_type_option_wrapper">
                    <div id="lineThicknessSelector" class="chart_type_option_selector" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListforLine')">
                        <span><svg height="20" width="40" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:0.7"></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineThicknessOptionListforLine">
                        ${getlineThicknessOptionList()}
                    </ul>
                </div>
            </div>
            <div class="lineChartSettingRow">
                <div id="chooseLineStyleWrapper" class="choose_chart_type_option_wrapper">
                    <div id="lineStyleSelector" class="chart_type_option_selector" onclick="showLineStyleOptions(this, 'lineStyleOptionListForLine')">
                        <span><svg height="20" width="40">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:undefined ; stroke-dasharray:3 "></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineStyleOptionListForLine">
                        ${getlineStyleOptionList()}
                    </ul>
                </div>
            </div>  
            </div>  
    `;

    volumeSettingsDiv.append(volLineSettingsDiv);


}


function showVolBarAndLineSettings() {
    document.getElementById("volBarAndLineSettings").checked = true;


    let volumeSettingsDiv = document.getElementById("ch_sttg_volPlotTypeSettingsWrapper");
    let volLineSettingsDiv = document.getElementById("volLineSettingsDiv");
    let volBarSettingsDiv = document.getElementById("volBarSettingsDiv");
    let volBarAndLineSettingsDiv = document.getElementById("volBarAndLineSettingsDiv");

    if (!(volLineSettingsDiv == undefined)) {
        volLineSettingsDiv.remove();
    }

    if (!(volBarSettingsDiv == undefined)) {
        volBarSettingsDiv.remove();
    }
    if (!(volBarAndLineSettingsDiv == undefined)) {
        volBarAndLineSettingsDiv.remove();
    }

    volBarAndLineSettingsDiv = document.createElement("div");
    volBarAndLineSettingsDiv.id = "volBarSettingsDiv";

    volBarAndLineSettingsDiv.innerHTML = `
        <div class="lineChartSettingRow">
            <span style="font-size: 14px; font-weight: 600;">Bar</span>
        </div>
        <div class="chartTypeSttgContainer">
                <div class="lineChartSettingRow">
                <span style="font-size: 30px; margin-right: 10px; color: green"><i class="fas fa-long-arrow-alt-up"></i></span>
                    ${colorPickerHtml}
                </div>
                <div class="lineChartSettingRow">
                <span style="font-size: 30px; margin-right: 10px; color: red"><i class="fas fa-long-arrow-alt-down"></i></span>
                    ${colorPickerHtml}
                </div>  
                <div class="lineChartSettingRow">
                <span style="font-size: 25px; font-weight: 900; margin-right: 10px;"><i class="fas fa-equals"></i></span>
                    ${colorPickerHtml}
                </div>  
            </div>



            
        <div class="lineChartSettingRow">
            <span style="font-size: 14px; font-weight: 600;">Line</span>
        </div>
        <div id="lineSettings" class="chartTypeSttgContainer">
        <div class="lineChartSettingRow">
                <div id="choosePriceOptionWrapper" class="choose_chart_type_option_wrapper">
                    <div id="priceOptionSelector" class="chart_type_option_selector" onclick="showPriceOptions(this, 'priceOptionListForLine')">
                        <span>Close</span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="priceOptionListForLine">
                        ${getPricechooseOptionList()}
                    </ul>
                </div>
            </div>
            <div class="lineChartSettingRow">
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
                <div id="chooseLineThicknessWrapper" class="choose_chart_type_option_wrapper">
                    <div id="lineThicknessSelector" class="chart_type_option_selector" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListforLine')">
                        <span><svg height="20" width="40" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:0.7"></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineThicknessOptionListforLine">
                        ${getlineThicknessOptionList()}
                    </ul>
                </div>
            </div>
            <div class="lineChartSettingRow">
                <div id="chooseLineStyleWrapper" class="choose_chart_type_option_wrapper">
                    <div id="lineStyleSelector" class="chart_type_option_selector" onclick="showLineStyleOptions(this, 'lineStyleOptionListForLine')">
                        <span><svg height="20" width="40">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:undefined ; stroke-dasharray:3 "></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineStyleOptionListForLine">
                        ${getlineStyleOptionList()}
                    </ul>
                </div>
            </div>  
            </div>  

    `;

    volumeSettingsDiv.append(volBarAndLineSettingsDiv);
}

function plotVolumeMA(plotVolumeMACheckbox) {
    // let plotVolumeMACheckbox = document.getElementById("ch_sttg_plotVolumeMA");
    let volumeSettingsDiv = document.getElementById("ch_sttg_VolumeSettings");
    // volumeSettingsDiv.scrollTop = volumeSettingsDiv.scrollHeight;
    let volMaLineSettingsDiv = document.getElementById("volMaLineSettingsDiv");

    if (plotVolumeMACheckbox.checked) {
        volMaLineSettingsDiv = document.createElement("div");
        volMaLineSettingsDiv.id = "volMaLineSettingsDiv";
        volMaLineSettingsDiv.className = "";
        volMaLineSettingsDiv.innerHTML = `
            <hr>
            <div id="lineSettings" class="chartTypeSttgContainer">

            <div class="lineChartSettingRow">
                <div id="chooseMAOptionWrapper" class="choose_chart_type_option_wrapper">
                    <div id="maOptionSelector" class="chart_type_option_selector" onclick="showMAOptions(this, 'maOptionList')">
                        <span>SMA</span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="maOptionList">
                        ${getMAchooseOptionList()}
                    </ul>
                </div>
            </div>
            
            <div class="lineChartSettingRow">
                ${colorPickerHtml}
            </div>
            <div class="lineChartSettingRow">
                <div id="chooseLineThicknessWrapper" class="choose_chart_type_option_wrapper">
                    <div id="lineThicknessSelector" class="chart_type_option_selector" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListforMA')">
                        <span><svg height="20" width="40" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:0.7"></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineThicknessOptionListforMA">
                        ${getlineThicknessOptionList()}
                    </ul>
                </div>
            </div>
            <div class="lineChartSettingRow">
                <div id="chooseLineStyleWrapper" class="choose_chart_type_option_wrapper">
                    <div id="lineStyleSelectorMA" class="chart_type_option_selector" onclick="showLineStyleOptions(this, 'lineStyleOptionListForMA')">
                        <span><svg height="20" width="40">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:undefined ; stroke-dasharray:3 "></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineStyleOptionListForMA">
                        ${getlineStyleOptionList()}
                    </ul>
                </div>
            </div>
        </div>
        <div class="lineChartSettingRow">
                <span>MA Period</span>
                <input type="number" style="width: 75px" value="10" step="1" min="1">
            </div>
        `;
        volumeSettingsDiv.appendChild(volMaLineSettingsDiv);
    } else {
        if (!(volMaLineSettingsDiv == undefined)) {
            volMaLineSettingsDiv.remove();
        }


    }


}


function showMAOptions(maOptionSelector, listName) {

    maOptionList = document.getElementById(listName);

    maOptionList.style.top = maOptionSelector.getBoundingClientRect().top + 40;

    maOptionList.style.display = maOptionList.style.display === "block" ? "none" :
        "block";

    if (maOptionList.style.display == "block") {
        document.addEventListener("pointerdown", function (e) {
            closePopupOnClickOutside(e, maOptionSelector, maOptionList);
        });
    } else {
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
}

function getMAchooseOptionList() {
    let maOptions = ['SMA', 'EMA', 'DEMA', 'TEMA', 'ZLMA', 'TMA'];

    let list = ``;

    for (let i = 0; i < maOptions.length; i++) {
        list += `<li style="padding: 10px 10px 10px 10px" onclick="maSetting('${maOptions[i]}')">
                    <span>${maOptions[i]}</span>
                </li>`;
    }

    return list;
}


// function showLineStyleOptionsMA(lineStyleSelector, listName) {

//     lineStyleSelector = document.getElementById("lineStyleSelectorMA");
//     lineStyleOptionList = document.getElementById(listName);

//     lineStyleOptionList.style.display = lineStyleOptionList.style.display === "block" ? "none" :
//         "block";

//     lineStyleOptionList.style.top = lineStyleSelector.getBoundingClientRect().top + 40;

//     if (lineStyleOptionList.style.display == "block") {
//         document.addEventListener("pointerdown", function (e) {
//             closePopupOnClickOutside(e, lineStyleSelector, lineStyleOptionList);
//         });
//     } else {
//         document.removeEventListener("pointerdown", closePopupOnClickOutside);
//     }
// }



// function showCrosshairStyleOptions() {

//     lineStyleSelector = document.getElementById("crosshairStyleOptionSelector");
//     lineStyleOptionList = document.getElementById("crosshairStyleOptionList");

//     lineStyleOptionList.style.display = lineStyleOptionList.style.display === "block" ? "none" :
//         "block";

//     lineStyleOptionList.style.top = lineStyleSelector.getBoundingClientRect().top + 40;

//     if (lineStyleOptionList.style.display == "block") {
//         document.addEventListener("pointerdown", function (e) {
//             closePopupOnClickOutside(e, lineStyleSelector, lineStyleOptionList);
//         });
//     } else {
//         document.removeEventListener("pointerdown", closePopupOnClickOutside);
//     }
// }

// function getCrosshairStyleOptionList() {

//     let lineStyles = ['Price left, % Right', 'Price Right, % Left', '', '', ''];

//     let list = ``;

//     for (let i = 0; i < lineStyles.length; i++) {
//         // Escape single quotes in the SVG string for the onclick attribute
//         list += `<li onclick="lineStyleSetting(${i})">
//                     ${lineStyles[i]}
//                 </li>`;
//     }

//     return list;
// }


// function showAxisPositionOptions() {

//     axisPositionSelector = document.getElementById("axisPositionOptionSelector");
//     axisPositionOptionList = document.getElementById("axisPositionsOptionList");

//     axisPositionOptionList.style.display = axisPositionOptionList.style.display === "block" ? "none" :
//         "block";

//     axisPositionOptionList.style.top = axisPositionSelector.getBoundingClientRect().top + 40;

//     if (axisPositionOptionList.style.display == "block") {
//         document.addEventListener("pointerdown", function (e) {
//             closePopupOnClickOutside(e, axisPositionSelector, axisPositionOptionList);
//         });
//     } else {
//         document.removeEventListener("pointerdown", closePopupOnClickOutside);
//     }
// }

// function getAxisPositionsOptionList() {
//     let axisPositions = ['Price Right, % Left', 'Price left, % Right'];

//     let list = ``;

//     for (let i = 0; i < axisPositions.length; i++) {
//         // Escape single quotes in the SVG string for the onclick attribute
//         list += `<li onclick="lineStyleSetting(${i})" style="padding: 10px;">
//                     ${axisPositions[i]}
//                 </li>`;
//     }

//     return list;
// }