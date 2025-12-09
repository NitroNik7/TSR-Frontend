let sttgPopup = document.getElementById("ch_sttg_popup");
let chSettingsOptionContent = document.getElementById("chSettingsOptionContent");


const colorPickerHtml = getColors(colorsDesktop, colorsMobile);

function getColors(colorsDesktop, colorsMobile) {
    let colorsMobileHtml = `
    <div style="padding: 5px; border: 1px solid gray; border-radius: 5px;">
    <div onclick="showColorPicker(this, event)" id="colorPicker"
        style="height: 16px; width: 16px; background-color: red;">
        <i class="fa-solid fa-chart-line" style="color: white;"></i>
    </div>
    <div id="compactColorPicker" class="compact-color-picker"
        style="display: none; right: 60px; overflow: auto; top: 0">
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
};

function showColorPicker(ele, event) {
    const colorPicker = ele.nextElementSibling;
    const parentDiv = ele.closest(".tableRow");
    colorPicker.style.display = colorPicker.style.display === "none" ? "block" : "none";

    // Get the mouse click position
    const mouseY = event.clientY;
    const screenHeight = window.innerHeight;

    // Determine if the click is in the bottom half of the screen
    const isBottomHalf = mouseY > screenHeight / 2;
    console.log("isBottomHalf", isBottomHalf);

    // Set the position of the color picker
    

    // Adjust for mobile or desktop view
    if (document.body.getBoundingClientRect().width < 768) {
        colorPicker.children[0].style.display = "flex"; // Show mobile color picker
        colorPicker.children[1].style.display = "none";
    } else {
        colorPicker.children[0].style.display = "none";
        colorPicker.children[1].style.display = "flex"; // Show desktop color picker
    }

    if (isBottomHalf) {
        console.log(mouseY, colorPicker.getBoundingClientRect().height)
        colorPicker.style.top = (mouseY - colorPicker.getBoundingClientRect().height - 10) + "px"; // 10px above the click
    } else {
        colorPicker.style.top = (mouseY + 10) + "px"; // 10px below the click
    }

    function clickHandler(e) {
        if (!colorPicker.contains(e.target) && !ele.contains(e.target)) {
            colorPicker.style.display = "none";
        }

        document.body.removeEventListener("mousedown", clickHandler);
    }

    function scrollHandler(e) {
        if (!colorPicker.contains(e.target)) {
            colorPicker.style.display = "none";
            window.removeEventListener("wheel", scrollHandler);
        }
    }

    document.body.addEventListener("mousedown", clickHandler); // Close colorPicker when clicking outside it
    window.addEventListener("wheel", scrollHandler); // Close colorPicker when scrolling outside it
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
};

function inlineLabelAndCheckbox(type, label, style) {
    let html = `
        <div class="ch_sttg_inlineLabelCheckboxWrapper" >
            <input type="checkbox" id="inlineLabelCheckboxFor${type}"  class="ch_sttg_checkbox" onchange="inlineLabelCheckboxFor${type}()">
            <label for="inlineLabelCheckboxFor${type}" style="${style}">&thinsp; ${label}</label>
        </div>
    `;


    return html;
};

function scrollSettingsMenu(direction) {
    if (direction == 'left') {
        document.getElementById('settingsOptionMenuUl').scroll({
            "left": -300,
            "behavior": "smooth"
        })
    } else {
        document.getElementById('settingsOptionMenuUl').scroll({
            "left": 300,
            "behavior": "smooth"
        })
    }
};

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
            <div id="ch_sttg_chartTypeSettingsContainer" style="padding: 10px; background-color: white; max-height: 430px; overflow-y: auto; scroll-behavior: smooth;">
                ${toastContainerHtml}
                
                <div class="ch_sttg_chartTypeTopSection" style="display: flex; justify-content: space-between; align-items: center;">
                
                    <div id="chooseChartTypeOptionWrapper" class="chDDoptWrap">
                        <div id="chartTypeOptionSelector" class="chDdOptSel" onclick="showChartTypeOptions()">
                    <span>Hollow Candles</span>
                    <span>
                        <svg class="svg-inline--fa fa-caret-down fa-w-10" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg><!-- <i class="fas fa-caret-down"></i> -->
                    </span>
                </div>
                        <ul id="chartTypechooseOptionList">
                            ${getChartTypeOptionList()}
                        </ul>
                    </div>
                    <div class="">
                        ${inlineLabelAndCheckbox('DefaultTechChart', 'Set Default for Tech Charts', "cursor: pointer; font-size: 14px; font-weight: 300;")}
                        ${inlineLabelAndCheckbox('DefaultScreenerChart', 'Set Default for Screener Charts', 'cursor: pointer; font-size: 14px; font-weight: 300;')}
                    </div>
                </div>
    
            <hr>

            <div id="ch_sp_settingsOptionContent" class="ch_sp_settingsOptionContent">
                <button class="ch_sttg_chartTypeAccordion" id="lineSettingsBtn">
                    <span>Line</span>
                    <i class="fas fa-angle-down"></i>
                </button>
                <div class="ch_sttg_chartTypePanel" id="lineSettingsPanel">
                    
                </div>

                <button class="ch_sttg_chartTypeAccordion" id="candleSettingsBtn">
                    <span>Candle</span> 
                    <i class="fas fa-angle-down"></i>
                </button>
                <div class="ch_sttg_chartTypePanel" id="candleSettingsPanel">
                    
                </div>

                <button class="ch_sttg_chartTypeAccordion" id="ohlcSettingsBtn">
                    <span>OHLC</span>
                    <i class="fas fa-angle-down"></i>    
                </button>
                <div class="ch_sttg_chartTypePanel" id="ohlcSettingsPanel">
                    
                </div>

                <button class="ch_sttg_chartTypeAccordion" id="heikinAshiSettingsBtn">
                    <span>Heikin Ashi</span>
                    <i class="fas fa-angle-down"></i>
                </button>
                <div class="ch_sttg_chartTypePanel" id="heikinAshiSettingsPanel">
                    
                </div>

                <button class="ch_sttg_chartTypeAccordion" id="hollowCandleSettingsBtn">
                    <span>Hollow Candle</span>
                    <i class="fas fa-angle-down"></i>
                    </button>
                <div class="ch_sttg_chartTypePanel" id="hollowCandleSettingsPanel">
                    
                </div>

                <button class="ch_sttg_chartTypeAccordion" id="areaSettingsBtn">
                    <span>Area</span>
                    <i class="fas fa-angle-down"></i>
                </button>
                <div class="ch_sttg_chartTypePanel" id="areaSettingsPanel">
                    
                </div>
        </div>


        </div>
        ${getSaveResetButtonHTML("ChartType")}
            `;
            ch_showCollapseAccordionDiv();

            // To keep any particular settings panel open
            let clickEvent = new Event("click");
            document.getElementById("hollowCandleSettingsBtn").dispatchEvent(clickEvent);
            break;
        case "volume":
            chSettingsOptionContent.innerHTML = `
            <div id="ch_sttg_volumeSettingsContainer" class="ch_sttg_volumeSettingsContainer" style="padding: 10px; background-color: white; scroll-behavior: smooth;">
                ${toastContainerHtml}

                <div class="chCusSetRow">
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
                    <div class="chCusSetRow" id="ch_sttg_volPlotTypeSettingsWrapper" style="flex-direction: column; align-items: unset;">
                        <div class="ch_sttg_radioButtons">
                            <div class="ch_sttg_radioButton" onclick="showVolBarSettings()">
                                <input id="volBarSettings" type="radio" name="volRadioButton" id="">
                                <label for="volRadioButton" style="cursor: pointer;">Bar</label>
                            </div>
                            <div class="ch_sttg_radioButton" onclick="showVolLineSettings()">
                                <input id="volLineSettings" type="radio" name="volRadioButton" id="" >
                                <label for="volRadioButton" style="cursor: pointer;">Line</label>
                            </div>  
                            <div class="ch_sttg_radioButton" onclick="showVolBarAndLineSettings()">
                                <input id="volBarAndLineSettings" type="radio" name="volRadioButton">
                                <label for="volRadioButton" style="cursor: pointer;">Both</label>
                            </div>  
                            <hr>
                        </div>
                    </div>
                    <hr>
                    <div class="chCusSetRow">
                        <span>Visibility %</span>
                        <input type="number" value="10" step="10" min="10" max="100">
                    </div>
                    <div  class="chCusSetRow">
                        <label for="ch_sttg_volAsSeperatePanel" style="font-size: 14px; font-weight: 300;">Show Volume as seperate Panel</label>
                        <div class="ch_sttg_toggle_container">
                            <label class="ch_sttg_volume_toggle">
                                <input type="checkbox" id="ch_sttg_volAsSeperatePanel" onchange="showVolAsSeperatePanel()">
                                <span class="ch_sttg_toggle_slider"></span>
                            </label>
                        </div>
                    </div>
                    <div  class="chCusSetRow">
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
            ${getSaveResetButtonHTML("Volume")}
            `;

            volumeToggle(document.getElementById('volumeToggleSwitch'));
            showVolBarSettings();
            break;
        case "chart style":
            chSettingsOptionContent.innerHTML = ` 
                <div id="ch_sttg_chartStyleSettingsContainer" class="ch_sttg_chartStyleSettingsContainer" style="padding: 10px; background-color: white;">
                    ${toastContainerHtml}

                    ${chartStyleSettingsHtml}
                    <hr>
                    ${crosshairSettingsHtml}
                    <hr>
                    ${axesSettingsHtml}
                    <hr>
                    ${xAxisSettingsHtml}
                    <hr>
                    ${yAxisSettingsHtml}
                    <hr>
                    ${gridLineSettingsHtml}
                    
                </div>
                ${getSaveResetButtonHTML("ChartStyle")}
                `;
            break;
        case "display ohlc":
            chSettingsOptionContent.innerHTML = ` 
                    <div id="ch_sttg_displayOHLCSettingsContainer" class="ch_sttg_chartStyleSettingsContainer" style="padding: 10px; background-color: white;">
                        ${displayStatusSettingsHtml}
                    </div>
                ${getSaveResetButtonHTML("DisplayOHLC")}
                    `;
            break;
        case "drawings":
            chSettingsOptionContent.innerHTML = ` 
            <div id="ch_sttg_drawingSettingsContainer" class="ch_sttg_chartStyleSettingsContainer" style="padding: 10px; background-color: white;">
                ${trendlineSettingsHtml}
                <hr>
                ${fibonacciSettingsHtml}
                <hr>
                ${pivotPointSettingsHtml}
                <hr>
                ${verticalLineSettingsHtml}
                <hr>
                ${horizontalLineSettingsHtml}
            </div>    
                `;
            break;
        case "other settings":
            chSettingsOptionContent.innerHTML = `
                
            `;
            break;
        default:
            break;
    }
};

// For Accordions in Chart Type Setting Panel
function ch_showCollapseAccordionDiv() {
    var acc = document.getElementsByClassName("ch_sttg_chartTypeAccordion");
    var i;
    let ch_sttg_chartTypeSettingsContainer = document.getElementById("ch_sttg_chartTypeSettingsContainer");


    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }

            if (this.id == "lineSettingsBtn") {

                let panels = document.getElementsByClassName("ch_sttg_chartTypePanel");

                for (let i = 0; i < panels.length; i++) {
                    if (panels[i].id == "lineSettingsPanel") {
                        panels[i].innerHTML = `
                            ${lineSettingsHtml}
                            `;
                        panels[i].style.padding = '20px';
                        ch_sttg_chartTypeSettingsContainer.scrollTop = panels[i].getBoundingClientRect().top;
                    } else {
                        panels[i].innerHTML = ``;
                        panels[i].style.padding = '0px';
                    }
                }
            } else if (this.id == "candleSettingsBtn") {
                let panels = document.getElementsByClassName("ch_sttg_chartTypePanel");

                for (let i = 0; i < panels.length; i++) {
                    if (panels[i].id == "candleSettingsPanel") {
                        panels[i].innerHTML = `
                        ${candleSettingsHtml}
                        `;
                        panels[i].style.padding = '20px';
                        ch_sttg_chartTypeSettingsContainer.scrollTop = panels[i].getBoundingClientRect().top;
                    } else {
                        panels[i].innerHTML = ``;
                        panels[i].style.padding = '0px';
                    }
                }
            } else if (this.id == "ohlcSettingsBtn") {
                let panels = document.getElementsByClassName("ch_sttg_chartTypePanel");

                for (let i = 0; i < panels.length; i++) {
                    if (panels[i].id == "ohlcSettingsPanel") {
                        panels[i].innerHTML = `
                        ${ohlcSettingsHtml}
                        `;
                        panels[i].style.padding = '20px';
                        ch_sttg_chartTypeSettingsContainer.scrollTop = panels[i].getBoundingClientRect().top;
                    } else {
                        panels[i].innerHTML = ``;
                        panels[i].style.padding = '0px';
                    }
                }
            } else if (this.id == "heikinAshiSettingsBtn") {
                let panels = document.getElementsByClassName("ch_sttg_chartTypePanel");

                for (let i = 0; i < panels.length; i++) {
                    if (panels[i].id == "heikinAshiSettingsPanel") {
                        panels[i].innerHTML = `
                        ${haSettingsHtml}
                        
                        `;
                        panels[i].style.padding = '20px';
                        ch_sttg_chartTypeSettingsContainer.scrollTop = panels[i].getBoundingClientRect().top;
                    } else {
                        panels[i].innerHTML = ``;
                        panels[i].style.padding = '0px';
                    }
                }
            } else if (this.id == "hollowCandleSettingsBtn") {
                let panels = document.getElementsByClassName("ch_sttg_chartTypePanel");

                for (let i = 0; i < panels.length; i++) {
                    if (panels[i].id == "hollowCandleSettingsPanel") {
                        panels[i].innerHTML = `
                        ${hollowCandleSettingsHtml}
                        `;
                        panels[i].style.padding = '20px';
                        ch_sttg_chartTypeSettingsContainer.scrollTop = panels[i].getBoundingClientRect().top;
                    } else {
                        panels[i].innerHTML = ``;
                        panels[i].style.padding = '0px';
                    }
                }
            } else if (this.id == "areaSettingsBtn") {
                let panels = document.getElementsByClassName("ch_sttg_chartTypePanel");

                for (let i = 0; i < panels.length; i++) {
                    if (panels[i].id == "areaSettingsPanel") {
                        panels[i].innerHTML = `
                        ${areaChartSettingsHtml}
                        `;
                        panels[i].style.padding = '20px';
                        ch_sttg_chartTypeSettingsContainer.scrollTop = panels[i].getBoundingClientRect().top;

                    } else {
                        panels[i].innerHTML = ``;
                        panels[i].style.padding = '0px';
                    }
                }
            }
        });
    }
}

function getSaveResetButtonHTML(panelName) {
    let html = `
        <div class="" id="saveResetChartTypeButtonWrapper" style="display:flex; position: absolute; margin: 10px; height: auto" >
            <button  onclick="save${panelName}SttgToDefault(this)">
                Save
            </button>
            
            <div id="chooseResetSettingsOptionWrapper" class="chDDoptWrap">
            <button id="resetSettingsOptionSelector" onclick="showResetSettingsOptions()">
                Reset Settings
            </button>
                
                <ul id="resetSettingsOptionList">
                    ${getResetSettingsOptionList()}
                </ul>
            </div>
        </div>
    `;

    return html;
};

function saveChartTypeSttgToDefault() {
    ch_showToast("Saved Chart settings successfully!", "save", document.getElementById("ch_sttg_chartTypeSettingsContainer"));

}

function resetChartTypeSttgToDefault() {
    ch_showToast("Default Chart settings applied!", "reset", document.getElementById("ch_sttg_chartTypeSettingsContainer"));

}

function saveVolumeSttgToDefault() {
    ch_showToast("Saved Volume settings successfully!", "save", document.getElementById("ch_sttg_volumeSettingsContainer"));
}

function resetVolumeSttgToDefault() {
    ch_showToast("Default Volume settings applied!", "reset", document.getElementById("ch_sttg_volumeSettingsContainer"));
}

function saveChartStyleSttgToDefault() {
    ch_showToast("Saved Style settings successfully!", "save", document.getElementById("ch_sttg_chartStyleSettingsContainer"));
}

function resetChartStyleSttgToDefault() {
    ch_showToast("Default Style settings applied!", "reset", document.getElementById("ch_sttg_chartStyleSettingsContainer"));
}

function resetToDefaultSttgWarningDialog() {

}

let toastContainerHtml = `
    <div id="ch_toastContainer">

    </div>
`;

let lineSettingsHtml = `
<div class="chCusSetRow">
        <span style="font-size: 14px; font-weight: 600;">Line Settings</span>
    </div>
    <div>
        <div  class="chartTypeSttgContainer">
            <div class="chCusSetRow">
                <div id="choosePriceOptionWrapper" class="chDDoptWrap">
                    <div id="priceOptionSelector" class="chDdOptSel" onclick="showPriceOptions(this, 'priceOptionListForLine')">
                        <span>Close</span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="priceOptionListForLine">
                        ${getPriceOptionList()}
                    </ul>
                </div>
            </div>
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
                <div id="chooseLineThicknessWrapper" class="chDDoptWrap">
                    <div id="lineThicknessSelector" class="chDdOptSel" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListforLine')">
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
            <div class="chCusSetRow">
                <div id="chooseLineStyleWrapper" class="chDDoptWrap">
                    <div id="lineStyleSelector" class="chDdOptSel" onclick="showLineStyleOptions(this, 'lineStyleOptionListForLine')">
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
    <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 600;">Candle Settings</span>
            </div>
        <div class="candleChartOptions">
        <div id="candleSettings" class="candle_settings">
            <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 300;">Body</span>
            </div>
            <div class="chartTypeSttgContainer">
                <div class="chCusSetRow">
                <span style="font-size: 30px; margin-right: 10px; color: green"><i class="fas fa-long-arrow-alt-up"></i></span>
                    ${colorPickerHtml}
                </div>
                <div class="chCusSetRow">
                <span style="font-size: 30px; margin-right: 10px; color: red"><i class="fas fa-long-arrow-alt-down"></i></span>
                    ${colorPickerHtml}
                </div>  
                <div class="chCusSetRow">
                <span style="font-size: 25px; font-weight: 900; margin-right: 10px;"><i class="fas fa-equals"></i></span>
                    ${colorPickerHtml}
                </div>  
            </div>
            <div class="chCusSetRow">
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
    <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 600;">OHLC Settings</span>
            </div>

        <div class="ohlcChartOptions">
        <div id="ohlcSettings" class="chartTypeSttgContainer">
        
            <div class="chCusSetRow">
                <span style="font-size: 30px;
    margin-right: 10px; color: green;"><i class="fas fa-long-arrow-alt-up"></i></span>
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
                <span style="font-size: 30px;
    margin-right: 10px; color: red"><i class="fas fa-long-arrow-alt-down"></i></span>
                ${colorPickerHtml}
            </div>  
            <div class="chCusSetRow">
                <span style="font-size: 25px; font-weight: 900; margin-right: 10px;"><i class="fas fa-equals"></i></span>
                    ${colorPickerHtml}
                </div>  
        </div>
        </div>
`;

let haSettingsHtml = `
    <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 600;">Heikin Ashi Settings</span>
                ${inlineLabelAndCheckbox("HeikinAshi", "Same as Candle", "cursor: pointer; font-size: 14px; font-weight: 300")}
            </div>
        <div class="candleChartOptions">
        <div id="haCandleSettings" class="candle_settings">
            <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 300;">Body</span>
            </div>
            <div class="chartTypeSttgContainer">
            <div class="chCusSetRow">
            <span style="font-size: 30px;
    margin-right: 10px; color: green"><i class="fas fa-long-arrow-alt-up"></i></span>
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
            <span style="font-size: 30px;
    margin-right: 10px; color: red"><i class="fas fa-long-arrow-alt-down"></i></span>
                ${colorPickerHtml}
            </div>  
            <div class="chCusSetRow">
            <span style="font-size: 25px; font-weight: 900;
    margin-right: 10px;"><i class="fas fa-equals"></i></span>
                ${colorPickerHtml}
            </div>  
            </div>
            <div class="chCusSetRow">
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
`;

let hollowCandleSettingsHtml = `
    <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 600;">Hollow Candle Settings</span>
                ${inlineLabelAndCheckbox("HollowCandle", "Same as Candle", "cursor: pointer; font-size: 14px; font-weight: 300")}
            </div>
        <div class="hollowCandleChartOptions">
        <div id="hollowCandleSettings" class="candle_settings">
            <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 300;">Borders</span>
            </div>
            <div class="chartTypeSttgContainer">
            <div class="chCusSetRow">
            <span style="font-size: 30px;
    margin-right: 10px; color: green"><i class="fas fa-long-arrow-alt-up"></i></span>
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
            <span style="font-size: 30px;
    margin-right: 10px; color: red"><i class="fas fa-long-arrow-alt-down"></i></span>
                ${colorPickerHtml}
            </div>  
            <div class="chCusSetRow">
            <span style="font-size: 25px; font-weight: 900; margin-right: 10px;"><i class="fas fa-equals"></i></span>
                ${colorPickerHtml}
            </div>  
            </div>
            <div class="chCusSetRow">
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

    <div class="areaChartOptions">
    <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 600;">Area Settings</span>
            </div>
        <div id="areaSettings" class="area_settings">
            <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 300;">Fill</span>
            </div>
            <div class="chartTypeSttgContainer">
                <div class="chCusSetRow">
                    ${colorPickerHtml}
                </div>
            </div>
            <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 300;">Line</span>
            </div>
            <div class="chartTypeSttgContainer">
                <div class="chCusSetRow">
                    <div id="choosePriceOptionWrapper" class="chDDoptWrap">
                        <div id="priceOptionSelector" class="chDdOptSel" onclick="showPriceOptions(this, 'priceOptionListForArea')">
                            <span>Close</span>
                            <span>
                                <i class="fas fa-caret-down"></i>
                            </span>
                        </div>
                        <ul id="priceOptionListForArea">
                            ${getPriceOptionList()}
                        </ul>
                    </div>
                </div>
                <div class="chCusSetRow">
                    ${colorPickerHtml}
                </div>
                <div class="chCusSetRow">
                <div id="chooseLineThicknessWrapper" class="chDDoptWrap">
                    <div id="lineThicknessSelector" class="chDdOptSel" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListforArea')">
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
                <div class="chCusSetRow">
                    <div id="chooseLineStyleWrapper" class="chDDoptWrap">
                        <div id="lineStyleSelector" class="chDdOptSel" onclick="showLineStyleOptions(this, 'lineStyleOptionListforArea')">
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

let chartStyleSettingsHtml = `
    <div class="chCusSetRow">
        <span style="font-size: 14px; font-weight: 600;">Chart Colors</span>
    </div>
    <div>
        <div class="chartTypeSttgContainer">
            <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 300;">Background</span>
            </div>
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 300;">Controls</span>
            </div>
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
        </div>      
    </div>
`;

let crosshairSettingsHtml = `
    <div class="chCusSetRow">
        <span style="font-size: 14px; font-weight: 600;">Crosshair Settings</span>
    </div>
    <div>
        <div class="chartTypeSttgContainer">
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
                <div id="chooseLineThicknessWrapper" class="chDDoptWrap">
                    <div id="lineThicknessSelector" class="chDdOptSel" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListforCrosshair')">
                        <span><svg height="20" width="40" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:0.7"></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineThicknessOptionListforCrosshair">
                        ${getlineThicknessOptionList()}
                    </ul>
                </div>
            </div>
            <div class="chCusSetRow">
                <div id="chooseLineStyleWrapper" class="chDDoptWrap">
                    <div id="lineStyleSelector" class="chDdOptSel" onclick="showLineStyleOptions(this, 'lineStyleOptionListForLine')">
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

let axesSettingsHtml = `
    <div class="chCusSetRow">
        <span style="font-size: 14px; font-weight: 600;">Axes Settings</span>
    </div>
    <div>
        <div class="chCusSetRow">
            <span style="font-size: 14px; font-weight: 300;">Axis</span>
        </div>
        <div class="chartTypeSttgContainer">
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
                <div id="chooseLineThicknessWrapper" class="chDDoptWrap">
                    <div id="lineThicknessSelector" class="chDdOptSel" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListforAxis')">
                        <span><svg height="20" width="40" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:0.7"></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineThicknessOptionListforAxis">
                        ${getlineThicknessOptionList()}
                    </ul>
                </div>
        </div>      
    </div>
    
    <div>
        <div class="chCusSetRow">
            <span style="font-size: 14px; font-weight: 300;">Tick labels</span>
        </div>
        <div class="chartTypeSttgContainer">
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
                <input type="number" value="12" step="1" min="1" max="">
            </div>
        </div>      
    </div>
    <div>
        <div class="chCusSetRow">
            <span style="font-size: 14px; font-weight: 300;">Crosshair Labels</span>
        </div>
        <div class="chartTypeSttgContainer">
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
                <input type="number" value="12" step="1" min="1" max="">
            </div>
            <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 300;">Box color</span>
            </div>
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
        </div>      
    </div>
    <div>
        <div class="chCusSetRow">
            <span style="font-size: 14px; font-weight: 300;">Volume Axis</span>
        </div>
        <div class="chartTypeSttgContainer">
            <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 300;">Height %</span>
            </div>
            <div class="chCusSetRow">
                <input type="number" value="10" step="10" min="10" max="100">
            </div>
        </div>      
    </div>
`;

let xAxisSettingsHtml = `
    <div class="chCusSetRow">
        <span style="font-size: 14px; font-weight: 600;">Date Axis (X) Settings</span>
    </div>
    <div>
    <div class="chCusSetRow">
        <div class="chCusSetRow">
            <span style="font-size: 14px; font-weight: 300;">Margin Left</span>
        </div>
        <div class="chCusSetRow">
                <input type="number" value="0" step="1" min="0" max="">
            </div>
    </div>
    <div class="chCusSetRow">
            <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 300;">Margin Right</span>
            </div>
            <div class="chCusSetRow">
                <input type="number" value="0" step="1" min="0" max="">
            </div>
    </div>
    <div class="chCusSetRow">
    <div class="chCusSetRow">
        <span style="font-size: 14px; font-weight: 300;">Date format</span>
    </div>
    <div id="chooseDateWrapper" class="chDDoptWrap">
        <div id="dateFormatSelector" class="chDdOptSel" onclick="showDateFormatOptions(this, 'DateFormatListforXAxis')">
            <span>DD-MM-YYYY</span>
            <span>
                <i class="fas fa-caret-down"></i>
            </span>
        </div>
        <ul id="DateFormatListforXAxis">
            ${getDateFormatList()}
        </ul>
    </div>
    </div>
    
    
                
`;

let yAxisSettingsHtml = `
    <div class="chCusSetRow">
        <span style="font-size: 14px; font-weight: 600;">Value Axis (Y) Settings</span>
    </div>
    <div id="ch_sttg_yAxisLeftSettingsWrapper">
        <div class="chCusSetRow">
            <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 300;">Left Axis</span>
            </div>
            <div class="chCusSetRow">
                <div class="ch_sttg_toggle_container">
                    <label class="ch_sttg_volume_toggle">
                        <input type="checkbox" id="ch_sttg_yAxisLeftSettingsCheckbox" onchange="showAxisSettings(this)">
                        <span class="ch_sttg_toggle_slider"></span>
                    </label>
                </div>
            </div>
        </div>
    </div>
    <div id="ch_sttg_yAxisRightSettingsWrapper">
        <div class="chCusSetRow">
            <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 300;">Right Axis</span>
            </div>
            <div class="chCusSetRow">
                <div class="ch_sttg_toggle_container">
                    <label class="ch_sttg_volume_toggle">
                        <input type="checkbox" id="ch_sttg_yAxisRightSettingsCheckbox" onchange="showAxisSettings(this)">
                        <span class="ch_sttg_toggle_slider"></span>
                    </label>
                </div>
            </div>        
            
        </div>
    </div>
    <div id="ch_sttg_yAxisLatestValueSettingsWrapper">
        <div class="chCusSetRow">
            <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 300;">Latest value</span>
            </div>
            <div class="chCusSetRow">
                <div class="ch_sttg_toggle_container">
                    <label class="ch_sttg_volume_toggle">
                        <input type="checkbox" id="ch_sttg_yAxisLatestValueSettingsCheckbox" onchange="showAxisSettings(this)">
                        <span class="ch_sttg_toggle_slider"></span>
                    </label>
                </div>
            </div>        
            
        </div>
    </div>
`;

let gridLineSettingsHtml = `
     <div class="chCusSetRow">
        <span style="font-size: 14px; font-weight: 600;">Grid Settings</span>
    </div>
    <div>
        <div class="chCusSetRow">
            <span style="font-size: 14px; font-weight: 300;">X (Vertical lines)</span>
            <div class="chCusSetRow">
                    <div class="ch_sttg_toggle_container">
                        <label class="ch_sttg_volume_toggle">
                            <input type="checkbox" id="ch_sttg_xGridSettings" onchange="showGridSettings(this)">
                            <span class="ch_sttg_toggle_slider"></span>
                        </label>
                    </div>
                </div>
        </div>
        <div class="chartTypeSttgContainer" id="xGridSettings" style="display: none;">
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
                <div id="chooseLineThicknessWrapper" class="chDDoptWrap">
                    <div id="lineThicknessSelector" class="chDdOptSel" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListforXGrid')">
                        <span><svg height="20" width="40" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:0.7"></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineThicknessOptionListforXGrid">
                        ${getlineThicknessOptionList()}
                    </ul>
                </div>
            </div>
        </div> 
        <div class="chCusSetRow">
            <span style="font-size: 14px; font-weight: 300;">Y (Horizontal lines)</span>
            <div class="chCusSetRow">
                    <div class="ch_sttg_toggle_container">
                        <label class="ch_sttg_volume_toggle">
                            <input type="checkbox" id="ch_sttg_yGridSettings" onchange="showGridSettings(this)">
                            <span class="ch_sttg_toggle_slider"></span>
                        </label>
                    </div>
                </div>
        </div>
        <div class="chartTypeSttgContainer" id="yGridSettings" style="display: none;">
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
                <div id="chooseLineThicknessWrapper" class="chDDoptWrap">
                    <div id="lineThicknessSelector" class="chDdOptSel" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListforYGrid')">
                        <span><svg height="20" width="40" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:0.7"></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineThicknessOptionListforYGrid">
                        ${getlineThicknessOptionList()}
                    </ul>
                </div>
            </div>
        </div>      
    </div>
`;

let displayStatusSettingsHtml = `
    <div class="chCusSetRow">
        <span style="font-size: 14px; font-weight: 600;">Status Settings</span>
    </div>
    <div>
    <div id="ohlcValueContainer">
        <div id="ohlcCheckboxes" class="chCusSetRow">
            <div style="display: flex; flex-direction: column; width: 100%; justify-content: space-around;">
            <div class="chCusSetRow" >
                <label for="seperatePanelForVolCheckbox" style="font-size: 14px; font-weight: 300; margin: 5px;">Open</label>
                <input type="checkbox" name="seperatePanelForVolCheckbox" class="ch_sttg_checkbox"
                    id="ch_sttg_seperatePanelForVolCheckbox" onchange=""  checked>
            </div>
            <div class="chCusSetRow" >
                <label for="seperatePanelForVolCheckbox" style="font-size: 14px; font-weight: 300; margin: 5px;">High</label>
                <input type="checkbox" name="seperatePanelForVolCheckbox" class="ch_sttg_checkbox"
                    id="ch_sttg_seperatePanelForVolCheckbox" onchange=""  checked>
            </div>
            <div class="chCusSetRow" >
                <label for="seperatePanelForVolCheckbox" style="font-size: 14px; font-weight: 300; margin: 5px;">Low</label>
                <input type="checkbox" name="seperatePanelForVolCheckbox" class="ch_sttg_checkbox"
                    id="ch_sttg_seperatePanelForVolCheckbox" onchange=""  checked>
            </div>
            <div class="chCusSetRow" >
                <label for="seperatePanelForVolCheckbox" style="font-size: 14px; font-weight: 300; margin: 5px;">Close</label>
                <input type="checkbox" name="seperatePanelForVolCheckbox" class="ch_sttg_checkbox"
                    id="ch_sttg_seperatePanelForVolCheckbox" onchange=""  checked>
            </div>
        </div>
            
        <div style="display: flex; flex-direction: column; width: 100%; justify-content: space-around;">
            <div class="chCusSetRow" >
                <label for="seperatePanelForVolCheckbox" style="font-size: 14px; font-weight: 300; margin: 5px;">(O + C)/2</label>
                <input type="checkbox" name="seperatePanelForVolCheckbox" class="ch_sttg_checkbox"
                    id="ch_sttg_seperatePanelForVolCheckbox" onchange=""  checked>
            </div>
            <div class="chCusSetRow" >
                <label for="seperatePanelForVolCheckbox" style="font-size: 14px; font-weight: 300; margin: 5px;">(H + L)/2</label>
                <input type="checkbox" name="seperatePanelForVolCheckbox" class="ch_sttg_checkbox"
                    id="ch_sttg_seperatePanelForVolCheckbox" onchange=""  checked>
            </div>
            <div class="chCusSetRow" >
                <label for="seperatePanelForVolCheckbox" style="font-size: 14px; font-weight: 300; margin: 5px;">(H + L + C)/3</label>
                <input type="checkbox" name="seperatePanelForVolCheckbox" class="ch_sttg_checkbox"
                    id="ch_sttg_seperatePanelForVolCheckbox" onchange=""  checked>
            </div>
            <div class="chCusSetRow" >
                <label for="seperatePanelForVolCheckbox" style="font-size: 14px; font-weight: 300; margin: 5px;">(O + H + L + C)/4</label>
                <input type="checkbox" name="seperatePanelForVolCheckbox" class="ch_sttg_checkbox"
                    id="ch_sttg_seperatePanelForVolCheckbox" onchange=""  checked>
            </div>
        </div>
        </div>
    </div>
        <div class="chCusSetRow">
            <span style="font-size: 14px; font-weight: 300;">Date</span>
            <div class="chCusSetRow">
                <div class="ch_sttg_toggle_container">
                    <label class="ch_sttg_volume_toggle">
                        <input type="checkbox" id="ch_sttg_date" onchange="showDate(this)">
                        <span class="ch_sttg_toggle_slider"></span>
                    </label>
                </div>
            </div>
        </div>
        <div class="chCusSetRow">
            <span style="font-size: 14px; font-weight: 300;">Volume</span>
            <div class="chCusSetRow">
                <div class="ch_sttg_toggle_container">
                    <label class="ch_sttg_volume_toggle">
                        <input type="checkbox" id="ch_sttg_volume" onchange="showVolume(this)">
                        <span class="ch_sttg_toggle_slider"></span>
                    </label>
                </div>
            </div>
        </div>
        <div class="chCusSetRow">
            <span style="font-size: 14px; font-weight: 300;">% Change</span>
            <div class="chCusSetRow">
                <div class="ch_sttg_toggle_container">
                    <label class="ch_sttg_volume_toggle">
                        <input type="checkbox" id="ch_sttg_percentChange" onchange="showPercentChange(this)">
                        <span class="ch_sttg_toggle_slider"></span>
                    </label>
                </div>
            </div>
        </div>
        <hr>
        
        <div id="ch_sttg_ohlcValuesColorSettingsWrapper">
            <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 300;">Override System Colors</span>
            
            <div class="chCusSetRow">
                <div class="ch_sttg_toggle_container">
                    <label class="ch_sttg_volume_toggle">
                        <input type="checkbox" id="ch_sttg_ohlcValueSettingsCheckbox" onchange="showOhlcValuesColorSettings(this)">
                        <span class="ch_sttg_toggle_slider"></span>
                    </label>
                </div>
            </div>        
            
        </div>
        </div>
    </div>
`;

let trendlineSettingsHtml = `
    <div class="chCusSetRow">
        <span style="font-size: 14px; font-weight: 600;">Trend Line Settings</span>
    </div>
    <div>
        <div class="chartTypeSttgContainer">
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
                <div id="chooseLineThicknessWrapper" class="chDDoptWrap">
                    <div id="lineThicknessSelector" class="chDdOptSel" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListforCrosshair')">
                        <span><svg height="20" width="40" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:0.7"></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineThicknessOptionListforCrosshair">
                        ${getlineThicknessOptionList()}
                    </ul>
                </div>
            </div>
            <div class="chCusSetRow">
                <div id="chooseLineStyleWrapper" class="chDDoptWrap">
                    <div id="lineStyleSelector" class="chDdOptSel" onclick="showLineStyleOptions(this, 'lineStyleOptionListForLine')">
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

let fibonacciSettingsHtml = `
    <div class="chCusSetRow">
        <span style="font-size: 14px; font-weight: 600;">Fibonacci Settings</span>
    </div>
    <div>
        <div class="chartTypeSttgContainer">
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
                <div id="chooseLineThicknessWrapper" class="chDDoptWrap">
                    <div id="lineThicknessSelector" class="chDdOptSel" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListforCrosshair')">
                        <span><svg height="20" width="40" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:0.7"></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineThicknessOptionListforCrosshair">
                        ${getlineThicknessOptionList()}
                    </ul>
                </div>
            </div>
            <div class="chCusSetRow">
                <div id="chooseLineStyleWrapper" class="chDDoptWrap">
                    <div id="lineStyleSelector" class="chDdOptSel" onclick="showLineStyleOptions(this, 'lineStyleOptionListForLine')">
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
let pivotPointSettingsHtml = `
    <div class="chCusSetRow">
        <span style="font-size: 14px; font-weight: 600;">Pivot Points Settings</span>
    </div>
    <div>
        <div class="chartTypeSttgContainer">
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
                <div id="chooseLineThicknessWrapper" class="chDDoptWrap">
                    <div id="lineThicknessSelector" class="chDdOptSel" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListforCrosshair')">
                        <span><svg height="20" width="40" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:0.7"></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineThicknessOptionListforCrosshair">
                        ${getlineThicknessOptionList()}
                    </ul>
                </div>
            </div>
            <div class="chCusSetRow">
                <div id="chooseLineStyleWrapper" class="chDDoptWrap">
                    <div id="lineStyleSelector" class="chDdOptSel" onclick="showLineStyleOptions(this, 'lineStyleOptionListForLine')">
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
let verticalLineSettingsHtml = `
    <div class="chCusSetRow">
        <span style="font-size: 14px; font-weight: 600;">Vertical Line Settings</span>
    </div>
    <div>
        <div class="chartTypeSttgContainer">
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
                <div id="chooseLineThicknessWrapper" class="chDDoptWrap">
                    <div id="lineThicknessSelector" class="chDdOptSel" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListforCrosshair')">
                        <span><svg height="20" width="40" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:0.7"></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineThicknessOptionListforCrosshair">
                        ${getlineThicknessOptionList()}
                    </ul>
                </div>
            </div>
            <div class="chCusSetRow">
                <div id="chooseLineStyleWrapper" class="chDDoptWrap">
                    <div id="lineStyleSelector" class="chDdOptSel" onclick="showLineStyleOptions(this, 'lineStyleOptionListForLine')">
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
let horizontalLineSettingsHtml = `
    <div class="chCusSetRow">
        <span style="font-size: 14px; font-weight: 600;">Horizontal Line Settings</span>
    </div>
    <div>
        <div class="chartTypeSttgContainer">
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
                <div id="chooseLineThicknessWrapper" class="chDDoptWrap">
                    <div id="lineThicknessSelector" class="chDdOptSel" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListforCrosshair')">
                        <span><svg height="20" width="40" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:0.7"></line> </svg></span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="lineThicknessOptionListforCrosshair">
                        ${getlineThicknessOptionList()}
                    </ul>
                </div>
            </div>
            <div class="chCusSetRow">
                <div id="chooseLineStyleWrapper" class="chDDoptWrap">
                    <div id="lineStyleSelector" class="chDdOptSel" onclick="showLineStyleOptions(this, 'lineStyleOptionListForLine')">
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

// For chart type selector
function showChartTypeOptions() {

    chartTypeOptionSelector = document.getElementById("chartTypeOptionSelector");
    chartTypeOptionSelector.style.focus = true;
    chartTypechooseOptionList = document.getElementById("chartTypechooseOptionList");

    window.addEventListener("wheel", function (e) {
        scrollHandler(e, chartTypechooseOptionList);
    })

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
    let chartTypeOptions = ['Line', 'Candle', 'OHLC', 'Hollow Candles', 'Heikin Ashi', 'Area'];

    let list = ``;

    for (let i = 0; i < chartTypeOptions.length; i++) {
        list += `<li onclick="chartTypeSetting('${chartTypeOptions[i]}')">
                            <span>${chartTypeOptions[i]}</span>
                        </li>`;
    }

    return list;
};

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
};

function showPriceOptions(priceOptionSelector, listName) {
    priceOptionList = document.getElementById(listName);

    priceOptionList.style.top = priceOptionSelector.getBoundingClientRect().top + 40;

    window.addEventListener("wheel", function (e) {
        scrollHandler(e, priceOptionList);
    })

    priceOptionList.style.display = priceOptionList.style.display === "block" ? "none" :
        "block";

    if (priceOptionList.style.display == "block") {
        document.addEventListener("pointerdown", function (e) {
            closePopupOnClickOutside(e, priceOptionSelector, priceOptionList);
        });
    } else {
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
};

function getPriceOptionList() {
    let priceOptions = ['Close', 'Open', 'High', 'Low', '(High+Low)/2', '(H+L+C)/3', '(O+H+L+C)/4', 'Volume'];

    let list = ``;

    for (let i = 0; i < priceOptions.length; i++) {
        list += `<li onclick="priceSetting('${priceOptions[i]}')">
                    <span>${priceOptions[i]}</span>
                </li>`;
    }

    return list;
};

function showLineThicknessOptions(lineThicknessSelector, listId) {
    lineThicknessOptionList = document.getElementById(listId);

    window.addEventListener("wheel", function (e) {
        scrollHandler(e, lineThicknessOptionList);
    })

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
};

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
};

function showLineStyleOptions(lineStyleSelector, listName) {

    lineStyleOptionList = document.getElementById(listName);

    window.addEventListener("wheel", function (e) {
        scrollHandler(e, lineStyleOptionList);
    })

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
};

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
};

function showResetSettingsOptions() {

    resetSettingsSelector = document.getElementById("resetSettingsOptionSelector");
    resetSettingsSelector.style.focus = true;
    resetSettingsOptionList = document.getElementById("resetSettingsOptionList");

    window.addEventListener("wheel", function (e) {
        scrollHandler(e, resetSettingsOptionList);
    })

    resetSettingsOptionList.style.top = resetSettingsSelector.getBoundingClientRect().top - (resetSettingsOptionList.getBoundingClientRect().height + 65);

    resetSettingsOptionList.style.display = resetSettingsOptionList.style.display === "block" ? "none" : "block";

    if (resetSettingsOptionList.style.display == "block") {
        document.addEventListener("pointerdown", function (e) {
            closePopupOnClickOutside(e, resetSettingsSelector, resetSettingsOptionList);
        });

    } else {
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
};

function getResetSettingsOptionList() {
    let resetOptions = ['Reset Current Tab', 'Reset All'];

    let list = ``;

    for (let i = 0; i < resetOptions.length; i++) {
        list += `<li onclick="">
                            <span>${resetOptions[i]}</span>
                        </li>`;
    }

    return list;
};

const closePopupOnClickOutside = function closePopupOnClickOutside(e, DropwdownBtn, DropdownList) {
    let target = e.target;
    if (DropdownList.style.display === "block" && !(DropdownList.contains(target) || DropwdownBtn
            .contains(target))) {
        DropdownList.style.display = "none";
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
};

function showDateFormatOptions(dateFormatSelector, listName) {

    let dateFormatList = document.getElementById(listName);

    dateFormatList.style.display = dateFormatList.style.display === "block" ? "none" :
        "block";

    window.addEventListener("wheel", function (e) {
        scrollHandler(e, dateFormatList);
    })

    dateFormatList.style.top = dateFormatSelector.getBoundingClientRect().top + 40;

    if (dateFormatList.style.display == "block") {
        document.addEventListener("pointerdown", function (e) {
            closePopupOnClickOutside(e, dateFormatSelector, dateFormatList);
        });
    } else {
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
};

function getDateFormatList() {
    let dateFormats = ['DD-MM-YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD'];

    let list = ``;

    for (let i = 0; i < dateFormats.length; i++) {
        // Escape single quotes in the SVG string for the onclick attribute
        list += `<li onclick="">
                    <span>${dateFormats[i]}</span>
                </li>`;
    }

    return list;
};

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
        colorDiv.className = "chCusSetRow";
        colorDiv.innerHTML = `
        ${colorPickerHtml}
        `;

        wickThicknessDiv = document.createElement("div");
        wickThicknessDiv.id = "ch_sttg_showWick_wickThickness";
        wickThicknessDiv.className = "chCusSetRow";
        wickThicknessDiv.innerHTML = `
        <div class="chCusSetRow">
                <div id="chooseLineThicknessWrapper" class="chDDoptWrap">
                    <div id="lineThicknessSelector" class="chDdOptSel" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListForWick')">
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

};

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
                <div class="chCusSetRow">
                <span style="font-size: 30px; margin-right: 10px; color: green"><i class="fas fa-long-arrow-alt-up"></i></span>
                    ${colorPickerHtml}
                </div>
                <div class="chCusSetRow">
                <span style="font-size: 30px; margin-right: 10px; color: red"><i class="fas fa-long-arrow-alt-down"></i></span>
                    ${colorPickerHtml}
                </div>  
                <div class="chCusSetRow">
                <span style="font-size: 25px; font-weight: 900; margin-right: 10px;"><i class="fas fa-equals"></i></span>
                    ${colorPickerHtml}
                </div>  
            </div>
            

    `;

    volumeSettingsDiv.append(volBarSettingsDiv);
};

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
    
            <div  class="chartTypeSttgContainer">

            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
                <div id="chooseLineThicknessWrapper" class="chDDoptWrap">
                    <div id="lineThicknessSelector" class="chDdOptSel" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListforLine')">
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
            <div class="chCusSetRow">
                <div id="chooseLineStyleWrapper" class="chDDoptWrap">
                    <div id="lineStyleSelector" class="chDdOptSel" onclick="showLineStyleOptions(this, 'lineStyleOptionListForLine')">
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


};

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
        <div class="chCusSetRow">
            <span style="font-size: 14px; font-weight: 600;">Bar</span>
        </div>
        <div class="chartTypeSttgContainer">
                <div class="chCusSetRow">
                <span style="font-size: 30px; margin-right: 10px; color: green"><i class="fas fa-long-arrow-alt-up"></i></span>
                    ${colorPickerHtml}
                </div>
                <div class="chCusSetRow">
                <span style="font-size: 30px; margin-right: 10px; color: red"><i class="fas fa-long-arrow-alt-down"></i></span>
                    ${colorPickerHtml}
                </div>  
                <div class="chCusSetRow">
                <span style="font-size: 25px; font-weight: 900; margin-right: 10px;"><i class="fas fa-equals"></i></span>
                    ${colorPickerHtml}
                </div>  
            </div>



            
        <div class="chCusSetRow">
            <span style="font-size: 14px; font-weight: 600;">Line</span>
        </div>
        <div  class="chartTypeSttgContainer">
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
                <div id="chooseLineThicknessWrapper" class="chDDoptWrap">
                    <div id="lineThicknessSelector" class="chDdOptSel" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListforLine')">
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
            <div class="chCusSetRow">
                <div id="chooseLineStyleWrapper" class="chDDoptWrap">
                    <div id="lineStyleSelector" class="chDdOptSel" onclick="showLineStyleOptions(this, 'lineStyleOptionListForLine')">
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
};

function plotVolumeMA(plotVolumeMACheckbox) {
    // let plotVolumeMACheckbox = document.getElementById("ch_sttg_plotVolumeMA");
    let volumeSettingsDiv = document.getElementById("ch_sttg_VolumeSettings");

    let volMaLineSettingsDiv = document.getElementById("volMaLineSettingsDiv");

    if (plotVolumeMACheckbox.checked) {


        volMaLineSettingsDiv = document.createElement("div");
        volMaLineSettingsDiv.id = "volMaLineSettingsDiv";
        volMaLineSettingsDiv.className = "";
        volMaLineSettingsDiv.innerHTML = `
            <hr>
            <div  class="chartTypeSttgContainer">

            <div class="chCusSetRow">
                <div id="chooseMAOptionWrapper" class="chDDoptWrap">
                    <div id="maOptionSelector" class="chDdOptSel" onclick="showMAOptions(this, 'maOptionList')">
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
            
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
                <div id="chooseLineThicknessWrapper" class="chDDoptWrap">
                    <div id="lineThicknessSelector" class="chDdOptSel" onclick="showLineThicknessOptions(this, 'lineThicknessOptionListforMA')">
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
            <div class="chCusSetRow">
                <div id="chooseLineStyleWrapper" class="chDDoptWrap">
                    <div id="lineStyleSelectorMA" class="chDdOptSel" onclick="showLineStyleOptions(this, 'lineStyleOptionListForMA')">
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
        <div class="chCusSetRow">
                <span>MA Period</span>
                <input type="number" value="10" step="1" min="1">
            </div>
        `;
        volumeSettingsDiv.appendChild(volMaLineSettingsDiv);
        document.getElementById("ch_sttg_volumeSettingsContainer").scrollTo({
            "top": volMaLineSettingsDiv.getBoundingClientRect().top
        });
    } else {
        if (!(volMaLineSettingsDiv == undefined)) {
            volMaLineSettingsDiv.remove();
        }


    }


};

function showMAOptions(maOptionSelector, listName) {

    maOptionList = document.getElementById(listName);

    maOptionList.style.top = maOptionSelector.getBoundingClientRect().top + 40;

    window.addEventListener("wheel", function (e) {
        scrollHandler(e, maOptionList);
    })

    maOptionList.style.display = maOptionList.style.display === "block" ? "none" :
        "block";

    if (maOptionList.style.display == "block") {
        document.addEventListener("pointerdown", function (e) {
            closePopupOnClickOutside(e, maOptionSelector, maOptionList);
        });
    } else {
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
};

function getMAchooseOptionList() {
    let maOptions = ['SMA', 'EMA', 'DEMA', 'TEMA', 'ZLMA', 'TMA'];

    let list = ``;

    for (let i = 0; i < maOptions.length; i++) {
        list += `<li onclick="maSetting('${maOptions[i]}')">
                    <span>${maOptions[i]}</span>
                </li>`;
    }

    return list;
};

function showAxisSettings(checkbox) {
    let chartStyleSettingsContainer = document.getElementById("ch_sttg_chartStyleSettingsContainer");
    // chartStyleSettingsContainer.scrollTop = checkbox.getBoundingClientRect().top;


    if (checkbox.id == "ch_sttg_yAxisLeftSettingsCheckbox") {
        let wrapper = document.getElementById("ch_sttg_yAxisLeftSettingsWrapper");
        let div = document.getElementById("ch_sttg_yAxisLeftSettings");
        if (checkbox.checked) {
            div = document.createElement("div");
            div.id = "ch_sttg_yAxisLeftSettings";
            div.className = "chartTypeSttgContainer";

            div.innerHTML = `
                <div class="chCusSetRow">
                    <span style="font-size: 14px; font-weight: 300;">Show</span>
                </div>
                <div class="chDDoptWrap">
                    <div id="axisLeftSelector" class="chDdOptSel" onclick="showAxisValueOptions(this, 'valueListForLeftAxis')">
                        <span>Price</span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="valueListForLeftAxis">
                        ${getAxisValueList()}
                    </ul>
                </div>
            `;
            wrapper.appendChild(div);
            chartStyleSettingsContainer.scroll({
                top: chartStyleSettingsContainer.scrollHeight,
                behavior: "smooth"
            });

        } else {
            if (div != undefined) {
                div.remove();
            }
        }
    } else if (checkbox.id == "ch_sttg_yAxisRightSettingsCheckbox") {
        let wrapper = document.getElementById("ch_sttg_yAxisRightSettingsWrapper");
        let div = document.getElementById("ch_sttg_yAxisRightSettings");
        if (checkbox.checked) {
            div = document.createElement("div");
            div.id = "ch_sttg_yAxisRightSettings";
            div.className = "chartTypeSttgContainer";

            div.innerHTML = `
                <div class="chCusSetRow">
                    <span style="font-size: 14px; font-weight: 300;">Show</span>
                </div>
                <div class="chDDoptWrap">
                    <div id="axisRightSelector" class="chDdOptSel" onclick="showAxisValueOptions(this, 'valueListForRightAxis')">
                        <span>% Change</span>
                        <span>
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <ul id="valueListForRightAxis">
                        ${getAxisValueList()}
                    </ul>
                </div>
            `;
            wrapper.appendChild(div);
            chartStyleSettingsContainer.scroll({
                top: chartStyleSettingsContainer.scrollHeight,
                behavior: "smooth"
            });

        } else {
            if (div != undefined) {
                div.remove();
            }
        }
    } else {
        let wrapper = document.getElementById("ch_sttg_yAxisLatestValueSettingsWrapper");
        let div = document.getElementById("ch_sttg_yAxisLatestValueSettings");
        if (checkbox.checked) {
            div = document.createElement("div");
            div.id = "ch_sttg_yAxisLatestValueSettings";

            div.innerHTML = `
            
                
        
        <div class="chartTypeSttgContainer">
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
            <div class="chCusSetRow">
                <input type="number" value="12" step="1" min="1" max="">
            </div>
            <div class="chCusSetRow">
                <span style="font-size: 14px; font-weight: 300;">Box color</span>
            </div>
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
        </div>      
    
                
            `;
            wrapper.appendChild(div);
            chartStyleSettingsContainer.scroll({
                top: chartStyleSettingsContainer.scrollHeight,
                behavior: "smooth"
            });

        } else {
            if (div != undefined) {
                div.remove();
            }
        }
    }




};

function showAxisValueOptions(axis, listName) {

    // axisPositionSelector = document.getElementById("axisPositionOptionSelector");
    axisValueList = document.getElementById(listName);

    axisValueList.style.display = axisValueList.style.display === "block" ? "none" :
        "block";

    axisValueList.style.top = axis.getBoundingClientRect().top + 40;

    if (axisValueList.style.display == "block") {
        document.addEventListener("pointerdown", function (e) {
            closePopupOnClickOutside(e, axis, axisValueList);
        });
    } else {
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
};

function getAxisValueList() {
    let axisPositions = ['Price', '% Change'];

    let list = ``;

    for (let i = 0; i < axisPositions.length; i++) {
        // Escape single quotes in the SVG string for the onclick attribute
        list += `<li onclick="lineStyleSetting(${i})">
                    <span>${axisPositions[i]}</span>
                </li>`;
    }

    return list;
};

function showGridSettings(grid) {
    let chartStyleSettingsContainer = document.getElementById("ch_sttg_chartStyleSettingsContainer");
    // chartStyleSettingsContainer.scroll({top: chartStyleSettingsContainer.scrollHeight}) ;

    if (grid.id == "ch_sttg_yGridSettings") {
        if (grid.checked) {

            document.getElementById("yGridSettings").style.display = "flex";
            chartStyleSettingsContainer.scroll({
                top: chartStyleSettingsContainer.scrollHeight,
                behavior: "smooth"
            });
        } else {
            document.getElementById("yGridSettings").style.display = "none";
        }
    } else {
        if (grid.checked) {
            document.getElementById("xGridSettings").style.display = "flex";
            chartStyleSettingsContainer.scroll({
                top: chartStyleSettingsContainer.scrollHeight,
                behavior: "smooth"
            });
        } else {
            document.getElementById("xGridSettings").style.display = "none";
        }
    }
};

function showOHLCValues(displayOhlcCheckbox) {
    let ohlcValueContainer = document.getElementById("ohlcValueContainer");
    let div = document.getElementById("ohlcCheckboxes");

    if (displayOhlcCheckbox.checked) {
        div = document.createElement("div");
        div.id = "ohlcCheckboxes";
        div.className = "chCusSetRow";
        // div.style.flexDirection = "column";
        div.innerHTML = `
        <div style="display: flex; flex-direction: column; width: 100%; justify-content: space-around;">
            <div class="chCusSetRow" >
                <label for="seperatePanelForVolCheckbox" style="font-size: 14px; font-weight: 300; margin: 5px;">Open</label>
                <input type="checkbox" name="seperatePanelForVolCheckbox" class="ch_sttg_checkbox"
                    id="ch_sttg_seperatePanelForVolCheckbox" onchange=""  checked>
            </div>
            <div class="chCusSetRow" >
                <label for="seperatePanelForVolCheckbox" style="font-size: 14px; font-weight: 300; margin: 5px;">High</label>
                <input type="checkbox" name="seperatePanelForVolCheckbox" class="ch_sttg_checkbox"
                    id="ch_sttg_seperatePanelForVolCheckbox" onchange=""  checked>
            </div>
            <div class="chCusSetRow" >
                <label for="seperatePanelForVolCheckbox" style="font-size: 14px; font-weight: 300; margin: 5px;">Low</label>
                <input type="checkbox" name="seperatePanelForVolCheckbox" class="ch_sttg_checkbox"
                    id="ch_sttg_seperatePanelForVolCheckbox" onchange=""  checked>
            </div>
            <div class="chCusSetRow" >
                <label for="seperatePanelForVolCheckbox" style="font-size: 14px; font-weight: 300; margin: 5px;">Close</label>
                <input type="checkbox" name="seperatePanelForVolCheckbox" class="ch_sttg_checkbox"
                    id="ch_sttg_seperatePanelForVolCheckbox" onchange=""  checked>
            </div>
        </div>
            
        <div style="display: flex; flex-direction: column; width: 100%; justify-content: space-around;">
            <div class="chCusSetRow" >
                <label for="seperatePanelForVolCheckbox" style="font-size: 14px; font-weight: 300; margin: 5px;">(O + C)/2</label>
                <input type="checkbox" name="seperatePanelForVolCheckbox" class="ch_sttg_checkbox"
                    id="ch_sttg_seperatePanelForVolCheckbox" onchange=""  checked>
            </div>
            <div class="chCusSetRow" >
                <label for="seperatePanelForVolCheckbox" style="font-size: 14px; font-weight: 300; margin: 5px;">(H + L)/2</label>
                <input type="checkbox" name="seperatePanelForVolCheckbox" class="ch_sttg_checkbox"
                    id="ch_sttg_seperatePanelForVolCheckbox" onchange=""  checked>
            </div>
            <div class="chCusSetRow" >
                <label for="seperatePanelForVolCheckbox" style="font-size: 14px; font-weight: 300; margin: 5px;">(H + L + C)/3</label>
                <input type="checkbox" name="seperatePanelForVolCheckbox" class="ch_sttg_checkbox"
                    id="ch_sttg_seperatePanelForVolCheckbox" onchange=""  checked>
            </div>
            <div class="chCusSetRow" >
                <label for="seperatePanelForVolCheckbox" style="font-size: 14px; font-weight: 300; margin: 5px;">(O + H + L + C)/4</label>
                <input type="checkbox" name="seperatePanelForVolCheckbox" class="ch_sttg_checkbox"
                    id="ch_sttg_seperatePanelForVolCheckbox" onchange=""  checked>
            </div>
        </div>
        `;

        ohlcValueContainer.append(div);
    } else {
        if (!(div == undefined)) {
            div.remove();
        }
    }


};

function showOhlcValuesColorSettings(displayOhlcValuesColorsCheckbox) {
    let ohlcValuesColorContainer = document.getElementById("ch_sttg_ohlcValuesColorSettingsWrapper");
    let div = document.getElementById("ohlcValueColorSetting");

    if (displayOhlcValuesColorsCheckbox.checked) {
        div = document.createElement("div");
        div.id = "ohlcValueColorSetting";
        div.className = "chartTypeSttgContainer";
        div.innerHTML = `
        
            
            <div class="chCusSetRow">
                ${colorPickerHtml}
            </div>
        `;


        ohlcValuesColorContainer.append(div);

        ohlcValuesColorContainer.scroll({
            top: ohlcValuesColorContainer.getBoundingClientRect().height,
            behavior: "smooth"
        });

        // ohlcValuesColorContainer.scroll({behavior: "smooth", top: div.getBoundingClientRect().top});
        // ohlcValuesColorContainer.scrollTop = div.getBoundingClientRect().top;
    } else {
        if (!(div == undefined)) {
            div.remove();
        }
    }
}


// Popup drag and move code 
// START

const sttgPopupHeader = document.getElementById("ch_sttg_header");

sttgPopupHeader.addEventListener("mousedown", (e) => {
    chSttgPopupMouseDownHandler(e, sttgPopup);
})

function chSttgPopupMouseDownHandler(e, sttgPopup) {
    e.preventDefault();
    // storing cordinates of mouseclick
    let initialX = e.clientX;
    let initialY = e.clientY;

    function chSttgPopupMouseMoveHandler(e) {

        // for changing mouse pointer to move while moving div
        if (window.getComputedStyle(e.target).cursor === "auto" || window.getComputedStyle(e.target).cursor === "pointer") {
            console.log(e.target.style.cursor);
            e.target.style.cursor = "move";
        }

        // storing cordinates of mousemove
        let currentX = e.clientX;
        let currentY = e.clientY;

        // dx denotes change in x (horizontal position) and dy denotes change in y (vertical position) 
        let dx = currentX - initialX; // dx > 0 when div is dragged to the right, else dx < 0
        let dy = currentY - initialY; // dy > 0 when div is dragged down, else dy < 0

        moveDiv(dx, dy, sttgPopup);

        initialX = currentX;
        initialY = currentY;
    }

    function chSttgPopupMouseUpHandler(e) {
        // for changing mouse pointer to auto after moving the div has finished
        if (window.getComputedStyle(e.target).cursor === "move") {
            e.target.style.cursor = "pointer";
        }

        document.body.removeEventListener("mousemove", chSttgPopupMouseMoveHandler);
        document.body.removeEventListener("mouseup", chSttgPopupMouseUpHandler);
    }

    function moveDiv(dx, dy, ele) {
        ele.style.top = (ele.offsetTop + dy) + "px";
        ele.style.left = (ele.offsetLeft + dx) + "px";
    }

    document.body.addEventListener("mousemove", chSttgPopupMouseMoveHandler);
    document.body.addEventListener("mouseup", chSttgPopupMouseUpHandler);
}

// END


// Toast notification code 
// START

// toastTimeoutId = 0; // Need this global variable to reset setTimeout (because ch_showToast may be called again before it's timer expires). if not reset, toast will expire abruptly and incorrectly 
function ch_showToast(message, action, container) {
    const ch_toastContainer = document.getElementById('ch_toastContainer');

    ch_toastContainer.innerHTML = "";

    // Create the toast element
    const toast = document.createElement('div');
    toast.className = 'ch_sp_toastNotification';

    if (action == "save") {

        toast.innerHTML = `
            <span style="color: green;">
                ${message}            
            </span>
            <button class="ch_close-btn" onclick="ch_closeToast(this)">
                <i class="fas fa-times" aria-hidden="true" style="margin-top: 8px;"></i>
            </button>

    `;
    } else if (action == "save") {
        toast.innerHTML = `
            <span>
                ${message}
            </span>
            
            <button class="ch_close-btn" onclick="ch_closeToast(this)">
                <i class="fas fa-times" aria-hidden="true" style="margin-top: 8px;"></i>
            </button>
    `;
    } else {
        toast.innerHTML = `
            <span>
                ${message}
                
            </span>
            <button class="ch_close-btn" onclick="ch_closeToast(this)">
                <i class="fas fa-times" aria-hidden="true" style="margin-top: 8px;"></i>
            </button>
    `;
    }



    // Append the toast to the container
    ch_toastContainer.appendChild(toast);

    container.style.scrollBehavior = "smooth";
    container.scrollTop = container.getBoundingClientRect().top * -1;

    // For removing toast after 3 secs
    clearTimeout(this.toastTimeoutId);
    toastTimeoutId = setTimeout(() => {
        ch_toastContainer.innerHTML = "";
    }, 3000);
}

function ch_closeToast(button) {
    const toast = button.parentElement;
    if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
    }
}

// END


function scrollHandler(e, element) {
    if (!element.contains(e.target)) {
        element.style.display = "none";
        window.removeEventListener("wheel", scrollHandler);
    }
}