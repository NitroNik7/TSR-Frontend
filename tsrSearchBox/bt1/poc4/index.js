function getSearchBoxHeaderHtml(option){
    let html = "";

    html = `
    <div class="d-flex justify-content-between"">
        <div class="radioBtns ms-2">
            <span>Search in: &nbsp; </span>
            <input type="radio" name="stockBaskets" data-basket-name="charts" id="chartBasket" onclick="showTsrSearchBox('chart')" 
            ${(option == "chart" ? "checked" : "")}>
            <label for="chartBasket">Charts</label>

            <input type="radio" name="stockBaskets"  data-basket-name="equity" id="equityBasket" onclick="showTsrSearchBox('equity')"
            ${(option == "equity" ? "checked" : "")}>
            <label for="equityBasket">Equity</label>

            <input type="radio" name="stockBaskets"  data-basket-name="screeners" id="screenerBasket" onclick="showTsrSearchBox('screener')"
            ${(option == "screener" ? "checked" : "")}>
            <label for="screenerBasket">Screeners</label>
        </div>

        <button class="btn-close"></button>
    </div>
    `;

    return html;
}

function getSearchBoxHtml(option) {


    let html = ``;

    html += `
    
        

        <hr>

        <div class="d-flex">`;

    let placeholder;

    if (option == "chart") {
        placeholder = "Search a Chart";
    }
    else if (option == "equity") {
        placeholder = "Search a Stock";
    }
    else if (option == "screener") {
        placeholder = "Search a Screener";
    }

    html += `    <input id="tsrStockSearch" type="text" class="form-control ui-autocomplete-input mx-2"
                placeholder="${placeholder}" autocomplete="off" autofocus>`;

    html += `
            <div id="selectContainer" class="d-flex">

            </div>
    `;

    // html += getStockBasketSelect();

    // html += `<select
    //             style="border-radius: 6px; height: 35px;  box-shadow: inset 0px 0px 0px 0px red; text-shadow: none; border-color: #C0C0C0; background-color:white; width: 20%"
    //             id="eqSubCat" onchange="JavaScript:miSrch.sc('sc');" class="mx-2">
    //             <option value="any">All </option>
    //             <option value="FundamentalAnalysis">Stock Fundamentals</option>
    //             <option value="TechnicalAnalysis">Stock Technicals</option>
    //             <option value="PivotPoint">Stock Pivot Point</option>
    //             <option value="Candlestick">Stock Candlestick</option>
    //         </select>`;

    html += `</div>

        <div class="mt-3">
            <ul id="tsrStockList"></ul>
        </div>
    
    `;

    /*
        <option value="Screener">Screener Only</option>
        <option value="InteractiveCharts">Stock Interactive Charts</option>
    */

    return html;
}


function writeToSelectContainer(option) {

    let input = document.getElementById("tsrStockSearch");
    input.value = "";

    let container = document.getElementById("selectContainer");

    let select = document.createElement("select");
    select.id = "basketSelect";
    select.onchange = function () { 
        input.focus();
        filterStocks('') };
    // select.onchange = function () { showSubCategories(option) };
    select.classList.add("form-select");

    let data;

    if (option == "chart") {
        data = CHARTS_SUB_CATEGORY;
    }
    else if (option == "equity") {
        data = EQUITY_SUB_CAT;
    }
    else if (option == "screener") {
        data = SCREENERS_SUB_CATEGORY;
    }

    for (let i = 0; i < data.length; i++) {
        let option = document.createElement("option");
        option.value = data[i].id;
        option.text = data[i].label;

        select.appendChild(option);
    }

    container.appendChild(select);
    filterStocks('');
}

function showSubCategories(option) {

    let input = document.getElementById("tsrStockSearch");
    input.value = "";

    let container = document.getElementById("selectContainer");

    let select = document.getElementById("basketSelect");
    select.classList.add("form-select");

    if (option == "equity") {
        let value = select.value;

        let data;

        if (value == "any" || value == "FuturesAndOptions") {
            data = undefined;
        }

        if (value == "TechnicalAnalysis") {
            data = TECH_INDI;
        }
        else if (value == "FundamentalAnalysis") {
            data = FUNDA_INDI;
        }

        if (data != undefined) {
            let subSelect = document.getElementById("subSelect");
            if (subSelect == undefined) {
                subSelect = document.createElement("select");
                subSelect.id = "subSelect";
                subSelect.onchange = function () { filterStocks('') };


                for (let i = 0; i < data.length; i++) {
                    let option = document.createElement("option");
                    option.value = data[i].id;
                    option.text = data[i].label;

                    subSelect.appendChild(option);
                }

                container.appendChild(subSelect);
            }
            else {
                container.removeChild(subSelect);
                showSubCategories(option);
            }
        }
        else {
            let subSelect = document.getElementById("subSelect");
            if (subSelect != undefined) {
                container.removeChild(subSelect);
                showSubCategories(option);
            }
        }

        filterStocks('');
    }
}

function showTsrSearchBox(option) {

    let dialog = document.getElementById("tsrMoreInfoPopup");

    if (dialog) {
        closeDialog(dialog);
    }

    if (option == "equity") {
        let html = getSearchBoxHeaderHtml(option); 
        html+=getSearchBoxHtml(option);
        
        createDialog(false, html);
        writeToSelectContainer(option);
        // filterStocks('');
    }
    else if (option == "screener") {
                let html = getSearchBoxHeaderHtml(option); 
        html+=getSearchBoxHtml(option);
        createDialog(false, html);
        filterStocks('');
    }
    else if (option == "chart") {
        let html = getSearchBoxHtml(option);
        createDialog(false, html);
        filterStocks('');
    }

}


function createDialog(isImg, html) {
    let dialog = document.createElement("dialog");
    dialog.id = "tsrMoreInfoPopup";
    dialog.classList.add("border", "rounded", "shadow-lg", "w-75", "p-0");

    let div = document.createElement("div");
    div.id = "searchBox";
    div.classList.add("p-3");

    document.body.style.overflow = "hidden";

    // let closeDiv = document.createElement("div");
    // // closeDiv.setAttribute("align", "right");
    // closeDiv.classList.add("d-flex", "justify-content-between");

    // let closeBtn = document.createElement("button");
    // closeBtn.classList.add("btn-close");
    // closeBtn.onclick = function () { closeDialog(dialog) };

    // closeDiv.classList.add("mb-2");
    // option = "equity";
    // closeDiv.innerHTML = getSearchBoxHeaderHtml(option);
    // closeDiv.appendChild(closeBtn);

    let contentDiv = document.createElement("div");
    contentDiv.style.maxWidth = "80vw";
    contentDiv.style.maxHeight = "80vh";
    contentDiv.style.overflowY = "hidden";

    if (isImg) {
        let img = document.createElement("img");
        img.classList.add("m-3")
        img.src = html;
        contentDiv.appendChild(img);
    } else {
        contentDiv.innerHTML = html;
    }

    // div.appendChild(closeDiv);
    div.appendChild(contentDiv);

    dialog.appendChild(div);


    document.body.appendChild(dialog);

    dialog.showModal();

    dialog.addEventListener("keyup", handleKeydownOnDialog);

    dialog.addEventListener("click", closeOnClick);

}

let closeOnClick = function closeOnClick(e) {
    if (!document.getElementById("searchBox").contains(e.target)) {
        let dialog = document.getElementById("tsrMoreInfoPopup");
        closeDialog(dialog);
    }
}

let handleKeydownOnDialog = (e) => { handleKeydown(e, "tsrMoreInfoPopup") };

function handleKeydown(e, dialogId) {

    let dialog = document.getElementById(dialogId);
    if (e.key === "Escape") {
        closeDialog(dialog);
    }
    else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        let list = dialog.querySelector("ul");

        let listElements = list.childNodes;

        let listItemHasFocus = false;

        if (listElements.length != 0) {
            let idx = 0;
            for (let i = 0; i < listElements.length; i++) {
                if (listElements[i] == document.activeElement || listElements[i].contains(document.activeElement)) {
                    idx = i;
                    listItemHasFocus = true;
                }
            }

            listElements[idx].focus();
        }
    }
    else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
    }
    else if (e.key == "Enter") {  // redo
        if (document.activeElement.tagName == "LI") {
            window.open(document.activeElement.childNodes[0].href, "_self");
        }
    }
    else if (isAlphaNumericSymbol(e.key)) {
        // e.preventDefault();

        let input = document.getElementById("tsrStockSearch");
        if (document.activeElement != input) {
            let text = input.value + e.key;
            // console.log(e.key, input.value);

            input.value = text;

        }
        input.focus();
        setTimeout(
            filterStocks(input.value), 10
        )
    }
    else {
        // * Issue: when key such as backspace is pressed, input.value doesn't get updated immediately, due to which stocks are filtered incorrectly 
        // * Solution: below code is a hack which solves the concerned issue by calling filterStocks() after a timeout
        setTimeout(() => {
            let input = document.getElementById("tsrStockSearch");
            filterStocks(input.value);

        }, 10);
    }
}

function isAlphaNumericSymbol(character) {
    if (character.length == 1) {
        let asciiCode = character.charCodeAt(0);

        if ((asciiCode >= 65 && asciiCode <= 90) || (asciiCode >= 97 && asciiCode <= 122)) {
            return true;
        }
    }

    return false;
}

function closeDialog(dialog) {
    dialog.close();
    dialog.removeEventListener("keydown", handleKeydownOnDialog);

    document.body.removeChild(dialog);
    document.body.style.overflow = "auto";
    document.removeEventListener("click", closeOnClick);


}

function filterStocks(query) {

    let radioBtns = document.getElementsByName("stockBaskets");

    let checkedRadio = radioBtns[0];

    for (let i = 0; i < radioBtns.length; i++) {
        if (radioBtns[i].checked) {
            checkedRadio = radioBtns[i]
        }
    }

    let stockList = [];

    let basketName = checkedRadio.getAttribute("data-basket-name");

    let basketCategory = document.getElementById("basketSelect");
    let category = basketCategory.value;

    let buttons;
    let btnPrefix = "";

    if (basketName === "charts") {
        stockList = chartData;
        // No sub categories for now
    }
    else if (basketName === "equity") {

        stockList = equityData;

        if (category == 'any') {
            stockList = stockList.filter((item) => {
                item.defaultUrl = base_url + "/Stock/" + item.code + "/BirdsEyeView";
                return item;
            });

            buttons = ALL_SEARCH_CAT;
            btnPrefix = "Stock";

        }
        else if (category == 'TechnicalAnalysis') {
            // let techIndi = document.getElementById("subSelect").value;

            stockList = stockList.filter((item) => {
                // if (item.tech) {

                // if (techIndi == "any") {
                item.defaultUrl = base_url + "/Stock/" + item.code + "/TechnicalAnalysis";
                // }
                // else {
                //     item.defaultUrl = base_url + "/Technicals/" + item.code + "/" + techIndi;
                // }
                return item;
                // }
            });

            buttons = TECH_INDI;
            btnPrefix = "ViewInChart";


        }
        else if (category == "FundamentalAnalysis") {
            // let funda = document.getElementById("subSelect").value;

            stockList = stockList.filter((item) => {
                // if (item.funda) {
                // if (funda == "any") {
                item.defaultUrl = base_url + "/Stock/" + item.code + "/FundamentalAnalysis";
                // }
                // else {
                //     item.defaultUrl = base_url + "/Financial/" + item.code + "/" + funda;
                // }
                return item;
                // }
            });

            buttons = FUNDA_INDI;
            btnPrefix = "Financial";

        }
        else if (category == "FuturesAndOptions") {
            stockList = stockList.filter((item) => {
                if (item.fno) {
                    item.defaultUrl = base_url + "/Stock/" + item.code + "/FuturesAndOptions";

                    return item;
                }
            });

            buttons = FNO_CAT;
            btnPrefix = "Stock";

        }
        else if (category == "MovingAverage") {
            stockList = stockList.filter((item) => {
                if (item.ma) {
                    item.defaultUrl = base_url + "/Stock/" + item.code + "/FuturesAndOptions";

                    return item;
                }
            });

            buttons = MA_CAT;
            btnPrefix = "Stock";

        }
    }
    else if (basketName === "screeners") {
        stockList = screenerData;
        // No sub categories for now
    }

    stockList = stockList.filter((item) => {
        if (item.code.toLowerCase().includes(query.toLowerCase()) || item.name.toLowerCase().includes(query.toLowerCase()) || item.industry.toLowerCase().includes(query.toLowerCase())) {
            return item;
        }
    });


    let list = document.getElementById('tsrStockList');
    list.innerHTML = ''; // Clear previous results

    stockList.forEach(element => {
        let li = document.createElement('li');
        li.setAttribute("tabindex", "0");
        li.addEventListener("keydown", navigateList);
        li.addEventListener("keydown", navigateButtons);

        let a = document.createElement("a");
        a.href = element.defaultUrl;

        let itemRow = document.createElement('div');
        itemRow.classList.add('d-flex', 'justify-content-between');
        itemRow.style.width = "100%";
        itemRow.style.overflowX = "hidden";

        let itemLeft = document.createElement('div');
        itemLeft.classList.add('d-flex', 'flex-column', "w-25");


        let top = document.createElement('div');
        top.innerHTML = element.name + "&nbsp;";

        let bottom = document.createElement('div');
        bottom.textContent = element.industry;
        bottom.style.fontSize = "0.6em";

        itemLeft.appendChild(top);
        itemLeft.appendChild(bottom);

        // -------------------------------------

        let itemRight = document.createElement('div');
        itemRight.classList.add('d-sm-flex', 'd-none', "d-flex", "w-75", "justify-content-end");


        // let data = element.urls;
        // let urls = Object.keys(data);
        let maxElements = (document.getElementById("tsrStockList").offsetWidth / 150);
        console.log(maxElements);

        for (let i = 0; i < buttons.length; i++) {
            let button = document.createElement('button');
            button.classList.add('btn', 'btn-sm', 'me-2');
            button.style.maxWidth = "125px";
            // button.style.whiteSpace = "nowrap";
            // button.style.overflow = "hidden";
            // button.style.textOverflow = "ellipsis";
            button.innerHTML = `
            <a href="${btnPrefix + "/" + buttons[i].id}" style="color: black; ">
             ${buttons[i].label}
            </a>
            `;
            button.setAttribute("tabindex", "0");

            button.addEventListener("keydown", navigateButtons);

            itemRight.appendChild(button);

            if (i > maxElements)
                break;
        }


        let code = document.createElement('span');
        code.classList.add("code");
        code.innerHTML = element.code;

        itemRight.appendChild(code);

        // -------------------------------------

        itemRow.appendChild(itemLeft);
        itemRow.appendChild(itemRight);

        a.appendChild(itemRow);

        li.appendChild(a);

        list.appendChild(li);
    });
}

let navigateList = function navigateList(e) {
    e.preventDefault();
    /* 
    * e.preventDefault() -
    *   prevents multiple scrolls from happening together - 1. ul scrolling & li scrolling during focus
    *   prevents abnor"MA"l scrolling when user repeatedly presses arrow up or down
    * 
    *   also stops tab key behaviour
    * */

    let li = this;
    if (e.key === "ArrowUp") {
        if (li.previousSibling) {
            li.previousSibling.focus();
        }
    }
    else if (e.key === "ArrowDown") {
        if (li.nextSibling) {
            li.nextSibling.focus();
        }
    }
    // if (e.key === "ArrowLeft" || e.key === "ArrowRight") {

    //     console.log(e.key);

    //     let buttons = this.querySelectorAll("button");

    //     let buttonHasFocus = false;

    //     if (buttons.length != 0) {
    //         for (let i = 0; i < buttons.length; i++) {
    //             if (buttons[i] == document.activeElement) {
    //                 console.log("focused");

    //                 buttonHasFocus = true;
    //             }
    //         }

    //         if (!buttonHasFocus) {
    //             buttons[0].focus();
    //         }
    //     }
    // }
}

function navigateButtons(e) {
    // e.preventDefault();
    /* 
    * e.preventDefault() -
    *   prevents multiple scrolls from happening together - 1. ul scrolling & li scrolling during focus
    *   prevents abnor"MA"l scrolling when user repeatedly presses arrow up or down
    * 
    *   also stops tab key behaviour
    * */

    let element = this;
    if (e.key === "ArrowLeft") {

        if (element.tagName == "LI") {
            let buttons = this.querySelectorAll("button");

            let buttonHasFocus = false;

            if (buttons.length != 0) {
                for (let i = 0; i < buttons.length; i++) { // check if any button is active
                    if (buttons[i] == document.activeElement) {
                        console.log("focused");

                        buttonHasFocus = true;
                    }
                }

                if (!buttonHasFocus) {
                    buttons[0].focus();


                    // e.stopImmediatePropagation();
                }
            }
        }
        else if (element.tagName == "BUTTON") {
            if (element.previousSibling) {
                element.previousSibling.focus();
            }
        }
    }
    else if (e.key === "ArrowRight") {
        if (element.tagName == "LI") {
            let buttons = this.querySelectorAll("button");

            let buttonHasFocus = false;

            if (buttons.length != 0) {
                for (let i = 0; i < buttons.length; i++) { // check if any button is active
                    if (buttons[i] == document.activeElement) {
                        console.log("focused");

                        buttonHasFocus = true;
                    }
                }

                if (!buttonHasFocus) {
                    buttons[0].focus();

                    // e.stopImmediatePropagation();
                }
            }
        }
        else if (element.tagName == "BUTTON") {
            if (element.nextSibling) {

                element.nextSibling.focus();
            }
        }
    }
    e.stopImmediatePropagation();
}

// listen for ctrl + space
document.addEventListener("keyup", (e) => {
    if (e.key === "Control") {
        document.addEventListener("keyup", (event) => {
            if (event.code === "Space") { // e.key returns Unidentified for Space key in some browsers
                showTsrSearchBox('equity');
            }
        }, { once: true });
    }
}
);






