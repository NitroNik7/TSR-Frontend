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


function createTextSettingsPopup(e) {
    let div = document.getElementById("chTextSttgPopup");

    let mouseX = e.clientX;
    let mouseY = e.clientY;

    e.stopPropagation();

    if (div != undefined) {
        div.remove();
        return;
    }

    div = document.createElement("div");
    div.id = "chTextSttgPopup";
    div.className = "ch_text_settings_popup";

    let p = e.target.id;

    // document.getElementById().inn    
    let currFontSize = parseInt(window.getComputedStyle(e.target).fontSize);
    let currentFontStyle = window.getComputedStyle(e.target).fontStyle;
    let currentFontWeight = e.target.style.fontWeight;

    let bgColorForStyle = currentFontStyle == "italic" ? "lightgray" : "white";
    let bgColorForWeight = currentFontWeight == "bold" ? "lightgray" : "white";
    // let color = window.getComputedStyle(e.target).color;

    div.innerHTML = `
        <div style="background-color: gray; padding: 5px;">
            <span style="color: white">Add Text to your chart</span>
        </div>
        <div style="padding: 10px;">
        <div class="ch_settings_panel" >
            
                <input id="" type="text" value="${document.getElementById(p).innerText}">
        </div>
        
        <div class="chartTypeSttgContainer">
            <div class="chCusSetRow" >
                <input type="number" value="${currFontSize}" step="1" min="1" max="" onchange="changeTextFontSize(this, ${p});">
            </div>
            <div class="chCusSetRow"  style="padding: 5; background-color: ${bgColorForWeight}" onclick="changeTextFontStyle(this, 'bold', ${p});">
                <i class="fas fa-bold"></i>
            </div>
            <div class="chCusSetRow"  style="padding: 5; background-color: ${bgColorForStyle}" onclick="changeTextFontStyle(this, 'italic', ${p});">
                <i class="fas fa-italic"></i>
            </div>
        </div>
            <div class="chCusSetRow">
                <select name="chTextFontFamilyOptions" id="chTextFontFamilyOptions" onchange="changeTextFont(this, ${p})">
                    <option value="Arial" style="font-family: Arial;">Arial</option>
                    <option value="'Verdana'" style="font-family: Verdana;">Verdana</option>
                    <option value="Tahoma" style="font-family: Tahoma;">Tahoma</option>
                    <option value="'Trebuchet MS'" style="font-family: 'Trebuchet MS';">Trebuchet MS</option>
                    <option value="'Times New Roman'" style="font-family: 'Times New Roman';">Times New Roman</option>
                    <option value="Georgia" style="font-family: Georgia;">Georgia</option>
                    <option value="Garamond" style="font-family: Garamond;">Garamond</option>
                    <option value="'Courier New'" style="font-family: 'Courier New';">Courier New</option>
                </select>
                <div class="chCusSetRow" style="margin: 0px">
                    ${colorPickerHtml}  
                </div>
            </div>
            
            <div class="chCusSetRow" >
                <div class="miCtrl  chCusSetRow">
                    <button id="" class="">Ok</button>
                </div>
                <div class="miCtrl chCusSetRow">
                    <button id="" class="">Cancel</button>
                </div>
            </div>

            
            
            
            
       </div>

    `;

    isBottomHalf = mouseY > window.innerHeight / 2;
    isRightHalf = mouseX > window.innerWidth / 2;

    document.body.append(div);

    if (isBottomHalf) {
        div.style.top = (mouseY - div.offsetHeight - 10) + "px";
    } else {
        div.style.top = (mouseY + 10) + "px";
    }

    if (isRightHalf) {
        div.style.right = window.innerWidth - (mouseX);
        div.style.left = "unset";
    } else {
        div.style.left = (mouseX);
        div.style.right = "unset";
    }




    const closePopupOnClickOutside = (e) => {

        let div = document.getElementById("chTextSttgPopup");
        let target = e.target;
        if (div != undefined && !div.contains(target)) {

            div.remove();
            document.body.removeEventListener("click", closePopupOnClickOutside);
        }
    }

    document.body.addEventListener("click", closePopupOnClickOutside);

    function scrollHandler(e) {
        if (!div.contains(e.target)) {
            div.remove();
            window.removeEventListener("wheel", scrollHandler);
        }
    }

    window.addEventListener("wheel", scrollHandler); // Close colorPicker when scrolling outside it


}

function changeTextFontSize(inputElement, element) {
    element.style.fontSize = inputElement.value;
}

function changeTextFontStyle(div, style, element) {
    if (style == "italic") {
        if (element.style.fontStyle == "italic") {
            element.style.fontStyle = "normal";
            div.style.backgroundColor = "white";
        } else {
            element.style.fontStyle = "italic";
            div.style.backgroundColor = "lightgray";
        }
    } else {
        if (element.style.fontWeight == "bold") {
            element.style.fontWeight = "normal";
            div.style.backgroundColor = "white";
        } else {
            element.style.fontWeight = "bold";
            div.style.backgroundColor = "lightgray";
        }
    }
}

function changeTextFont(selectElement, element) {
    var selectedFont = selectElement.value;

    element.style.fontFamily = selectedFont;
}