
function showTsrSearchBox(option) {

    closeDialog('tsrSearchBoxPopup');

    if (option == "equity") {
        let html = getSearchBoxHeaderHtml(option);
        html += getSearchBoxHtml(option);

        createDialog(html);
        addOptionsToSelect(option);
        attachEventListenersToRadioBtns();
    }
    else if (option == "screeners") {
        let html = getSearchBoxHeaderHtml(option);
        html += getSearchBoxHtml(option);
        createDialog(html);
        addOptionsToSelect(option);
        attachEventListenersToRadioBtns();
    }
    else if (option == "charts") {
        let html = getSearchBoxHeaderHtml(option);
        html += getSearchBoxHtml(option);
        createDialog(html);
        addOptionsToSelect(option);

        attachEventListenersToRadioBtns();
    }

}


function getSearchBoxHeaderHtml() {



    let html = `<div class="d-flex justify-content-between">`

    html += createRadioBtns(searchBaskets);

    html += `<button class="btn-close" style="margin: 5px;" tabindex="-1 " onclick ="closeDialog('tsrSearchBoxPopup')"></button>`; // Close button

    html += `</div>`;
    return html;
}



function createRadioBtns(radioBtnData) {

    let container = document.createElement("div");
    container.classList.add("tsrRadioBtnContainer");
    // container.setAttribute("tabindex", 1);

    for (let i = 0; i < radioBtnData.length; i++) {
        let div = document.createElement("div");
        div.id = "tsrRadioBtn" + i;
        div.classList.add("tsrRadioBtn");
        div.setAttribute("tabindex", 0);
        div.setAttribute("data-basket", radioBtnData[i].id);


        let radioDiv = document.createElement("div");
        radioDiv.classList.add("tsrRadio");

        if (radioBtnData[i].default) {

            div.setAttribute("checked", "");

            let radioDivCircle = document.createElement("div");
            radioDivCircle.classList.add("tsrRadioCircle");
            radioDiv.appendChild(radioDivCircle);
        }

        let labelDiv = document.createElement("div");
        labelDiv.classList.add("tsrRadioLabel");
        labelDiv.innerText = radioBtnData[i].label;


        div.appendChild(radioDiv);
        div.appendChild(labelDiv);

        container.appendChild(div);
    }

    return container.outerHTML;
}

const radioBtnHandler = function radioBtnHandler(e) {
    // console.log(e.t)
    e.stopPropagation();
    let radio = e.currentTarget;

    if (e.type === "click") {
        for (let i = 0; i < searchBaskets.length; i++) {
            if (searchBaskets[i].id == radio.getAttribute("data-basket")) {
                searchBaskets[i].default = true;
            } else {
                searchBaskets[i].default = false;
            }
        }
        showTsrSearchBox(radio.getAttribute("data-basket"));

    }
    else if (e.type === "keydown") {
        if (e.key === "Enter") {
            for (let i = 0; i < searchBaskets.length; i++) {
                if (searchBaskets[i].id == radio.getAttribute("data-basket")) {
                    searchBaskets[i].default = true;
                } else {
                    searchBaskets[i].default = false;
                }
            }
            showTsrSearchBox(radio.getAttribute("data-basket"));
        }
    }
}

function attachEventListenersToRadioBtns() {
    let radioBtns = document.querySelectorAll(".tsrRadioBtn");

    for (let i = 0; i < radioBtns.length; i++) {
        radioBtns[i].addEventListener("click", radioBtnHandler);
        radioBtns[i].addEventListener("keydown", radioBtnHandler);
    }
}

function getSearchBoxHtml(option) {


    let html = ``;

    html += `
        <hr>

        <div class="d-flex">`;

    let placeholder;

    if (option == "charts") {
        placeholder = "Search a Chart";
    }
    else if (option == "equity") {
        placeholder = "Search a Stock";
    }
    else if (option == "screeners") {
        placeholder = "Search a Screener";
    }

    html += `    <input id="tsrStockSearch" type="text" class="form-control ui-autocomplete-input mx-2"
                placeholder="${placeholder}" autocomplete="off" autofocus tabindex="0">`;

    html += `
            <div id="selectContainer" class="d-none d-md-flex">

            </div>
    `;

    html += `</div>

        <div class="mt-3">
            <ul id="tsrStockList"></ul>
        </div>
    
    `;

    return html;
}


function addOptionsToSelect(option) {

    let input = document.getElementById("tsrStockSearch");
    input.value = "";

    let container = document.getElementById("selectContainer");

    let select = document.createElement("select");
    select.id = "basketSelect";
    select.onchange = function () {
        input.focus();
        filterStocks('')
    };
    // select.onchange = function () { showSubCategories(option) };
    select.classList.add("form-select");
    select.setAttribute("tabindex", "0");

    let data;

    if (option == "charts") {
        data = CHARTS_SUB_CATEGORY;
    }
    else if (option == "equity") {
        data = EQUITY_SUB_CAT;
    }
    else if (option == "screeners") {
        data = SCREENERS_SUB_CATEGORY;
    }

    if (data != undefined && data != null && data.length != 0) {
        container.style.width = "40%";

        for (let i = 0; i < data.length; i++) {
            let option = document.createElement("option");
            option.value = data[i].id;
            option.text = data[i].label;

            select.appendChild(option);
        }

        container.appendChild(select);
    }


    filterStocks('');
}

function createDialog(html) {
    let dialog = document.createElement("dialog");
    dialog.id = "tsrSearchBoxPopup";
    dialog.classList.add("border", "rounded", "shadow-lg", "p-0");

    let div = document.createElement("div");
    div.id = "searchBox";
    div.classList.add("p-3");

    document.body.style.overflow = "hidden";

    let contentDiv = document.createElement("div");
    contentDiv.style.maxWidth = "80vw";
    contentDiv.style.maxHeight = "80vh";
    contentDiv.style.overflowY = "hidden";

    contentDiv.innerHTML = html;


    // div.appendChild(closeDiv);
    div.appendChild(contentDiv);

    dialog.appendChild(div);


    document.body.appendChild(dialog);

    dialog.showModal();

    dialog.addEventListener("keydown", handleKeydownOnDialog);

    dialog.addEventListener("click", closeOnClick);

}

let closeOnClick = function closeOnClick(e) {

    let div = document.getElementById("searchBox");
    // console.log(div.contains(e.target));
    if (!div.contains(e.target)) {
        // let dialog = document.getElementById("tsrSearchBoxPopup");
        closeDialog('tsrSearchBoxPopup');
    }
}

let handleKeydownOnDialog = (e) => { handleKeydown(e, "tsrSearchBoxPopup") };

function handleKeydown(e, dialogId) {

    let dialog = document.getElementById(dialogId);

    let input = document.getElementById("tsrStockSearch");
    if (e.key === "Escape") {
        // console.log("escape clicked");
        closeDialog(dialogId);
    }
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {

        if (!(document.activeElement == input && e.key == 'ArrowUp')) { // * this prevents first list item from getting focused when ArrowUp is pressed on input box

            // console.log("in handlekeydown");
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
                listElements[idx].scrollIntoView();
                e.preventDefault();
            }
        }
        // else if (document.activeElement == input && e.key == 'ArrowUp') {
        //     document.getElementById("tsrRadioBtn0").focus();
        //     e.preventDefault();
        // }
        // else if (document.activeElement != input && e.key == 'ArrowDown') {
        //     input.focus();
        // }
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
        if (!e.ctrlKey)
            e.preventDefault();

        if (document.activeElement != input) {
            input.value = "";
        }
        // if (document.activeElement != input) {
        let text = input.value + e.key;
        // console.log(e.key, input.value);

        input.value = text;

        input.focus();
        // }
        setTimeout(
            filterStocks(input.value), 10
        )
    }
    else if (e.key === "Tab") {
        // e.preventDefault();
    }
    else if (e.ctrlKey || e.altKey || e.shiftKey) {
        // console.log(e.key, "in handleKeyDown");
        // e.stopPropagation();
        // e.preventDefault();
    }
    else {
        // * Issue: when key such as backspace is pressed, input.value doesn't get updated immediately, due to which stocks are filtered incorrectly 
        // * Solution: below code is a hack which solves the concerned issue by calling filterStocks() after a timeout


        // if (e.key === "Backspace") {
        //     input.focus();
        // }
        // else{
        //     e.preventDefault();
        // }
        input.focus();
        setTimeout(() => {
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

function closeDialog(dialogId) {

    let dialog = document.getElementById(dialogId);

    if (dialog) {
        dialog.close();
        dialog.removeEventListener("keydown", handleKeydownOnDialog);

        document.body.removeChild(dialog);
        document.body.style.overflow = "auto";
        document.removeEventListener("click", closeOnClick);
    }
}

function filterStocks(query) {

    // console.log(query)

    let radioBtns = document.getElementsByClassName("tsrRadioBtn");

    let checkedRadio = radioBtns[0];

    for (let i = 0; i < radioBtns.length; i++) {
        if (radioBtns[i].hasAttribute("checked")) {
            checkedRadio = radioBtns[i]
        }
    }

    let stockList = [];

    let basketName = checkedRadio.getAttribute("data-basket");

    let buttons = [];
    let btnPrefix = "";

    if (basketName === "charts") {
        stockList = chartData;
        // No sub categories for now
    }
    else if (basketName === "equity") {

        stockList = equityData;

        let basketCategory = document.getElementById("basketSelect");
        let category = basketCategory.value;

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
                if (item.funda) {
                    // if (funda == "any") {
                    item.defaultUrl = base_url + "/Stock/" + item.code + "/FundamentalAnalysis";
                    // }
                    // else {
                    //     item.defaultUrl = base_url + "/Financial/" + item.code + "/" + funda;
                    // }
                    return item;
                }
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

        let basketCategory = document.getElementById("basketSelect");
        let category = basketCategory.value;

        stockList = screenerData;

        if (category == 'any') {
            stockList = stockList.filter((item) => {
                // if (item.candlestick) {
                item.defaultUrl = base_url + "/Stock/" + item.code + "/FuturesAndOptions";

                return item;
                // }
            });

        }
        else if (category == 'CandlestickScreeners') {
            stockList = stockList.filter((item) => {
                if (item.candlestick) {
                    item.defaultUrl = base_url + "/Stock/" + item.code + "/FuturesAndOptions";

                    return item;
                }
            });

        }
        else if (category == 'TechnicalScreeners') {
            stockList = stockList.filter((item) => {
                if (item.tech) {
                    item.defaultUrl = base_url + "/Stock/" + item.code + "/FuturesAndOptions";

                    return item;
                }
            });

        }
        // No sub categories for now
    }

    stockList = stockList.filter((item) => {
        if (item.code.toLowerCase().includes(query.toLowerCase()) || item.name.toLowerCase().includes(query.toLowerCase()) || item.industry.toLowerCase().includes(query.toLowerCase())) {
            return item;
        }
    });

    createListItem(stockList, btnPrefix, buttons);
}

function createListItem(stockList, btnPrefix, buttons) {


    let list = document.getElementById('tsrStockList');
    list.innerHTML = ''; // Clear previous results

    if (stockList.length == 0) {
        let li = document.createElement('li');
        li.classList.add("empty");
        li.innerHTML = 'No records found';
        li.style.fontSize = '14px';
        li.style.borderBottom = '';
        list.appendChild(li);
    }

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
        itemLeft.classList.add('d-flex', 'flex-column');

        let itemRight = document.createElement('div');

        if (paramDefined(element.code) && element.code != "") {
            let top = document.createElement('div');
            top.innerHTML = element.code;
            itemLeft.appendChild(top);
            itemLeft.classList.add("w-25");
            itemRight.classList.add("w-75");

        } else {
            itemLeft.classList.add("w-0");
            itemRight.classList.add("w-100");
        }

        let bottom = document.createElement('div');
        // let industry = document.createElement("")
        if (paramDefined(element.industry) && element.industry != "") {
            bottom.innerHTML += element.industry;
            itemLeft.appendChild(bottom);

        }
        if (paramDefined(element.sector) && element.sector != "") {


            bottom.innerHTML += "<br>" + element.sector;
            itemLeft.appendChild(bottom);
        }

        bottom.style.fontSize = "0.6em";


        // -------------------------------------

        itemRight.classList.add('d-sm-flex', 'd-none', "d-flex", "itemRight", "align-items-center", "justify-content-start");
        itemRight.style.width = ((document.getElementById("tsrStockList").offsetWidth * 0.75) / 125) + "px";
        // itemRight.style.textAlign = "end";

        // hack
        let maxElements = Math.round((document.getElementById("tsrStockList").offsetWidth * 0.75) / (75)); // 125px is the max-width of a button, 13px is the margin-x for each button
        // console.log(maxElements);

        let leftScrollBtn = document.createElement("button");
        leftScrollBtn.classList.add("h-100", "px-2", "align-items-center");
        leftScrollBtn.innerHTML = `<i class="fas fa-angle-left"></i>`;
        leftScrollBtn.addEventListener("click", function (e) {
            btnContainer.scrollBy({
                left: -125,
                behavior: 'smooth' // For smooth scrolling animation
            });
            e.preventDefault();
            btnContainer.focus();

        });

        let btnContainer = document.createElement("div");
        btnContainer.classList.add("d-flex");
        btnContainer.style.overflowX = "hidden";

        let noOfBtns = 0;
        for (let i = 0; i < buttons.length; i++) {
            // * Below conditions check if current button should be shown for a stock or not
            if (!buttons[i].default) {
                if (!element[buttons[i].mappedParam]) {
                    continue;
                }
            }
            let button = document.createElement('button');
            button.classList.add('btn', 'btn-sm', 'me-2', "p-2");
            button.style.maxWidth = "125px";
            button.style.whiteSpace = "nowrap";
            // button.style.overflow = "hidden";
            // button.style.textOverflow = "ellipsis";
            button.innerHTML = `
            <a href="${btnPrefix + "/" + buttons[i].id}" style="color: black; ">
             ${buttons[i].label}
            </a>
            `;
            button.setAttribute("tabindex", "-1");

            button.addEventListener("keydown", navigateButtons);

            btnContainer.appendChild(button);
            noOfBtns++;
        }

        // console.log(noOfBtns, maxElements, noOfBtns > maxElements);

        if (noOfBtns > maxElements) {
            itemRight.appendChild(leftScrollBtn);

        }

        itemRight.appendChild(btnContainer);

        let rightScrollBtn = document.createElement("button");
        rightScrollBtn.classList.add("h-100", "px-2", "align-items-center");

        rightScrollBtn.innerHTML = `<i class="fas fa-angle-right"></i>`;
        rightScrollBtn.addEventListener("click", function (e) {

            btnContainer.scrollBy({
                left: 150,
                behavior: 'smooth'
            });

            e.preventDefault();
            btnContainer.focus();

        });
        if (noOfBtns > maxElements) {
            itemRight.appendChild(rightScrollBtn);
        }

        let code = document.createElement('span');
        if ((paramDefined(element.code) && element.code != "")) {
            itemRight.classList.add("justify-content-end");
            code.classList.add("code");
        }
        if (noOfBtns > 0) {
            if (code.classList.contains("justify-content-start")) {
                code.classList.remove("justify-content-start");
            }
            else {
                itemRight.classList.add("justify-content-end");
                // code.classList.add("code");
            }
        } else {
            itemRight.classList.add("justify-content-start");

            code.classList.remove("code");
        }
        code.innerHTML = element.name;
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
    // e.preventDefault();
    /* 
    ----------------------------------------
    * e.preventDefault() -
    *   prevents multiple scrolls from happening together - 1. ul scrolling & li scrolling during focus
    *   prevents abnormal scrolling when user repeatedly presses arrow up or down
    * 
    *   also stops tab key behaviour
    ---------------------------------------
    */
    let li = this;

    if (e.key === "Tab") {
        // console.log(document.getElementsByClassName("tsrRadioBtn"));
        document.getElementById("tsrRadioBtn0").focus();
        e.preventDefault();
    }
    else if (e.key === "ArrowUp") {

        if (li.previousSibling) {
            li.previousSibling.focus();
        } else {
            let input = document.getElementById("tsrStockSearch");
            input.focus();
            e.stopImmediatePropagation();
        }
    }
    else if (e.key === "ArrowDown") {

        if (li.nextSibling) {
            li.nextSibling.focus();
        }

        /* 
        --------------------------------------------
         * Below code enables focusing on input box when ArrowDown is clicked on last item of list
            Commented for now
            Reason: Not normal for shorter lists having few items
            else {
                let input = document.getElementById("tsrStockSearch");
                input.focus();
                e.stopImmediatePropagation();
            }
        --------------------------------------------
         */

    }
}

function navigateButtons(e) {

    let element = this;
    // console.log(this);
    if (e.key === "ArrowLeft") {

        if (element.tagName == "LI") {
            let buttons = this.querySelectorAll(".btn");

            let buttonHasFocus = false;

            if (buttons.length != 0) {
                for (let i = 0; i < buttons.length; i++) { // check if any button is active
                    if (buttons[i] == document.activeElement) {

                        buttonHasFocus = true;
                    }
                }

                if (!buttonHasFocus) {
                    buttons[0].focus();
                }
            }
        }
        else if (element.classList.contains("btn")) {
            if (element.previousSibling) {
                element.previousSibling.focus();
                // element.previousSibling.scrollIntoView({
                //     inline: "start",
                //     block: "nearest"
                // });
            } else {
                element.scrollIntoView({
                    inline: "start",
                    block: "nearest"
                });
            }
        }
    }
    else if (e.key === "ArrowRight") {
        if (element.tagName == "LI") {
            let buttons = this.querySelectorAll(".btn");

            let buttonHasFocus = false;

            if (buttons.length != 0) {
                for (let i = 0; i < buttons.length; i++) { // check if any button is active
                    if (buttons[i] == document.activeElement) {
                        buttonHasFocus = true;
                    }
                }

                if (!buttonHasFocus) {
                    buttons[0].focus();
                }
            }
        }
        else if (element.classList.contains("btn")) {
            if (element.nextSibling) {

                element.nextSibling.focus();
                // element.nextSibling.scrollIntoView({
                //     inline: "start",
                //     block: "nearest"
                // });
            } else {
                element.scrollIntoView({
                    inline: "start",
                    block: "nearest"
                });
            }
        }
    }
}

// listen for ctrl + space
document.addEventListener("keydown", (e) => {

    let dialog = document.getElementById("tsrSearchBoxPopup");

    if (e.ctrlKey) {
        document.addEventListener("keydown", (event) => {
            if (event.code === "Space") { // ! e.key returns Unidentified for Space key in some browsers
                if (!dialog) // * if dialog is null || unidentified - not found
                    showTsrSearchBox('equity');
            }
        }, { once: true });
    }
}
);





function paramDefined(param) {
    if (param != null && param != undefined)
        return true;

    return false;
}