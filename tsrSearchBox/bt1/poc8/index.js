let tsrSearchBoxId = "tsrSearchBox";

let inputTextBoxId = "tsrStockSearch";


// start
function showSearchBox(option) {

    closeDialog(tsrSearchBoxId);

    for (let i = 0; i < searchMenu.length; i++) {
        if (option == searchMenu[i].id) {

            let html = getSearchBoxHeaderHtml();
            html += getSearchBoxBodyHtml(searchMenu[i]);

            paintSearchBox(html);
            addOptionsToSelect(searchMenu[i]);
            attachEventListenersToRadioBtns();

            break;
        }
    }
}

function getSearchBoxHeaderHtml() {

    let html = `<div id="${tsrSearchBoxId + "Header"}" class="d-flex justify-content-between">`

    html += getRadioMenu(searchMenu);

    html += `<button class="btn-close" style="margin: 5px;" tabindex="-1 " onclick ="closeDialog('${tsrSearchBoxId}')"></button>`; // Close button

    html += `</div>`;

    return html;
}

function getRadioMenu(data) {

    let radioMenu = document.createElement("div");
    radioMenu.classList.add("tsrRadioMenu");

    for (let i = 0; i < data.length; i++) {
        let radioBtnDiv = document.createElement("div");
        radioBtnDiv.id = "tsrRadioBtn" + i;
        radioBtnDiv.classList.add("tsrRadioBtn");
        radioBtnDiv.setAttribute("tabindex", 0);
        radioBtnDiv.setAttribute("data-basket", data[i].id);


        let radioCircleDiv = document.createElement("div");
        radioCircleDiv.classList.add("tsrRadioCircle");

        if (data[i].default) {

            radioBtnDiv.setAttribute("checked", "");

            let radioInnerCircleDiv = document.createElement("div");
            radioInnerCircleDiv.classList.add("tsrRadioInnerCircle");
            radioCircleDiv.appendChild(radioInnerCircleDiv);
        }

        let labelDiv = document.createElement("div");
        labelDiv.classList.add("tsrRadioLabel");
        labelDiv.innerText = data[i].label;


        radioBtnDiv.appendChild(radioCircleDiv);
        radioBtnDiv.appendChild(labelDiv);

        radioMenu.appendChild(radioBtnDiv);
    }

    return radioMenu.outerHTML;
}

const radioBtnHandler = function radioBtnHandler(e) {

    e.stopPropagation(); // prevents search box dialog from closing 

    let radio = e.currentTarget;

    if (radio.hasAttribute("data-basket")) {
        let searchCat = radio.getAttribute("data-basket");

        if (e.type === "click") {
            for (let i = 0; i < searchMenu.length; i++) {
                if (searchMenu[i].id == radio.getAttribute("data-basket")) {
                    searchMenu[i].default = true;
                } else {
                    searchMenu[i].default = false;
                }
            }
            showSearchBox(searchCat);

        }
        else if (e.type === "keydown") {
            if (e.key === "Enter") {
                for (let i = 0; i < searchMenu.length; i++) {
                    if (searchMenu[i].id == radio.getAttribute("data-basket")) {
                        searchMenu[i].default = true;
                    } else {
                        searchMenu[i].default = false;
                    }
                }
                showSearchBox(searchCat);
            }
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

function getSearchBoxBodyHtml(searchCat) {

    let html = ``;

    html += `<hr>`;

    html += `<div class="d-flex">`;

    html += `   <input id="${inputTextBoxId}" type="text" class="form-control ui-autocomplete-input mx-2" placeholder="${searchCat.inputPlaceholder}" autocomplete="off" autofocus tabindex="0">`;

    html += `   <div id="${tsrSearchBoxId + "SelectWrapper"}" class="d-none d-md-flex"></div>`;
    html += `</div>`;

    html += `<div class="mt-3">
                <ul id="${tsrSearchBoxId + "List"}"></ul>
            </div> `;

    return html;
}

function addOptionsToSelect(searchCat) {

    let input = document.getElementById(inputTextBoxId);
    input.value = "";

    let container = document.getElementById(tsrSearchBoxId + "SelectWrapper");

    let select = document.createElement("select");
    select.id = tsrSearchBoxId + "Select";
    select.onchange = function () {
        input.focus();
        input.value = "";
        filterStocks(input.value);
    };

    select.classList.add("form-select");
    select.setAttribute("tabindex", "0");

    let data = [];

    if (searchCat.subCat) {
        data = searchCat.subCat;
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


    filterStocks(input.value);
}

function paintSearchBox(html) {
    let dialog = document.createElement("dialog");
    dialog.id = tsrSearchBoxId;
    dialog.classList.add("border", "rounded", "shadow-lg", "p-0");

    let contentDiv = document.createElement("div");
    contentDiv.id = tsrSearchBoxId + "content";
    contentDiv.classList.add("p-3");
    contentDiv.style.maxWidth = "80vw";
    contentDiv.style.maxHeight = "80vh";
    contentDiv.style.overflowY = "hidden";

    contentDiv.innerHTML = html;

    dialog.appendChild(contentDiv);
    document.body.appendChild(dialog);

    dialog.showModal();

    dialog.addEventListener("keydown", handleKeypressOnSearchBox);
    dialog.addEventListener("click", closeSearchBoxOnClickOut);

    // document.body.style.overflow = "hidden";
}

let handleKeypressOnSearchBox = (e) => { handleKeydownOnSearchBox(e, tsrSearchBoxId) };

function handleKeydownOnSearchBox(e, searchBoxId) {

    let searchBox = document.getElementById(searchBoxId);
    let inputTextBox = document.getElementById(inputTextBoxId);

    // * Condition 1 : If entered key represents an alphanumeric character
    if (isAlphaNumericSymbol(e.key)) {

        // Check if Ctrl key is also pressed at the time
        // This prevents default beahviour and character from being entered twice
        if (!e.ctrlKey)
            e.preventDefault();

        // If user types from somewhere other than input text box, reset the text box
        if (document.activeElement != inputTextBox) {
            inputTextBox.value = "";
        }

        // Update current text box value with the new character entered
        let text = inputTextBox.value + e.key;

        inputTextBox.value = text;
        inputTextBox.focus();

        filterStocks(inputTextBox.value);

        // setTimeout(
        //     filterStocks(inputTextBox.value), 10
        // );
    }
    // * Condition 2 : if Arrow Up or Down key is pressed
    else if (e.key === "ArrowUp" || e.key === "ArrowDown") {

        // * if Arrow Up is pressed while focus is on input box, then perform no action
        // * else focus on list item
        // * this prevents first list item from getting focused when ArrowUp is pressed on input box
        if (!(document.activeElement == inputTextBox && e.key == 'ArrowUp')) {

            let list = searchBox.querySelector("ul");
            let listElements = list.childNodes;

            let listItemHasFocus = false;

            // if list has elements, find which element has focus and bring it into view
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
    }
    // * Condition 3 : if Arrow Left or Right key is pressed do not perform any action
    else if (e.key === "ArrowLeft" || e.key === "ArrowRight") { }
    // * Condition 4 : if Tab key is pressed do not perform any action, let sequential focus navigation work by itself
    else if (e.key === "Tab") {
        // * Not possible to programatically open a <select>
        // let select = document.getElementById(tsrSearchBoxId + "Select");
        // if (paramDefined(select) && document.activeElement == inputTextBox) {
        //     select.click();
        // }

    }
    // * Condition 5 : if Enter key is pressed do not perform any action, if select options cannot be selected using Enter key
    else if (e.key === "Enter") { }
    // * Condition 6 : if below keys are pressed do not perform any action, since these are modifier keys and have other functionality such as Ctrl + S, Ctrl + P, Alt + Tab etc.
    else if (e.ctrlKey || e.altKey || e.shiftKey) { }
    // * Condition 7 : close search box if escape is pressed and remove form DOM 
    else if (e.key === "Escape") {
        closeDialog(searchBoxId);
    } // * Condition 8 : if anything else on the keyboard is pressed, focus on inputTextBox 
    else {
        inputTextBox.focus();
        filterStocks('');
    }
}

function isAlphaNumericSymbol(character) {
    if (character.length == 1) {
        let asciiCode = character.charCodeAt(0);

        if ((asciiCode >= 65 && asciiCode <= 90) || (asciiCode >= 97 && asciiCode <= 122) || (asciiCode >= 48 && asciiCode <= 57)) {
            return true;
        }
    }

    return false;
}

let closeSearchBoxOnClickOut = function closeSearchBoxOnClickOut(e) {
    let div = document.getElementById(tsrSearchBoxId + "content");

    if (!div.contains(e.target)) {
        closeDialog(tsrSearchBoxId);
    }
}

function closeDialog(dialogId) {

    let dialog = document.getElementById(dialogId);

    if (dialog) {
        dialog.close();
        dialog.removeEventListener("keydown", handleKeypressOnSearchBox);

        document.body.removeChild(dialog);
        // document.body.style.overflow = "auto";
        document.removeEventListener("click", closeSearchBoxOnClickOut);
    }
}

function filterStocks(query) {

    // ! WARNING assuming there will be always be a radio button in the search box, i.e. in the searchMenu[] 
    let radioBtns = document.getElementsByClassName("tsrRadioBtn");

    let checkedRadio = radioBtns[0];

    for (let i = 0; i < radioBtns.length; i++) {
        if (radioBtns[i].hasAttribute("checked")) {
            checkedRadio = radioBtns[i];
        }
    }

    let categoryName = checkedRadio.getAttribute("data-basket");

    let stockList = [];
    let categoryButtons = [];
    let urlPrefix = "", urlSuffix = "";

    // * below code passes relevant data to populateSearchList()
    // * First: it finds desired search category from the radio button
    // * Second: it checks for any additional sub category that might be selected using the Select (select)
    for (let i = 0; i < searchMenu.length; i++) {
        if (searchMenu[i].id == categoryName) {
            stockList = searchMenu[i].catData;

            if (document.getElementById(tsrSearchBoxId + "Select")) {
                let basketCategory = document.getElementById(tsrSearchBoxId + "Select");
                let category = basketCategory.value;

                let subCat = searchMenu[i].subCat;
                for (let j = 0; j < subCat.length; j++) {
                    if (subCat[j].id == category) {
                        // if (!subCat[i].default) {
                        if (paramDefined(subCat[j].buttons)) {
                            categoryButtons = subCat[j].buttons;
                        }
                        if (paramDefined(subCat[j].urlPrefix)) {
                            urlPrefix = subCat[j].urlPrefix;
                        }
                        if (paramDefined(subCat[j].urlSuffix)) {
                            urlSuffix = subCat[j].urlSuffix;
                        }

                        if (!subCat[j].default) {
                            let mappedParam = subCat[j].mappedParam;
                            if (paramDefined(mappedParam)) {
                                stockList = stockList.filter((item) => {
                                    if (item[mappedParam]) {
                                        item.defaultUrl = base_url + urlPrefix + "/" + item.code + "/" + urlSuffix;
                                        return item;
                                    }
                                });
                            }
                        }

                        stockList = stockList.filter((item) => {
                            item.defaultUrl = base_url + urlPrefix + "/" + item.code + "/" + urlSuffix;
                            return item;
                        });


                        return populateSearchList(query, stockList, urlPrefix, categoryButtons);
                    }
                }
            }

            stockList = stockList.filter((item) => {
                item.defaultUrl = base_url + urlPrefix + "/" + item.code + "/" + urlSuffix;
                return item;
            });

            return populateSearchList(query, stockList, urlPrefix, categoryButtons);

        }
    }
}

function populateSearchList(query, stockList, urlPrefix, buttons) {

    // filter stocks which include query string
    stockList = stockList.filter((item) => {
        let keys = Object.keys(item);

        for (let i = 0; i < keys.length; i++) {
            if (typeof item[keys[i]] == "string" && item[keys[i]].toLowerCase().includes(query.toLowerCase())) {
                return item;
            }
        }
    });

    let list = document.getElementById(tsrSearchBoxId + "List");
    list.innerHTML = ''; // Clear previous results

    // If list is empty - show "No Records Found" message
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
        a.href = element.defaultUrl; // defaultUrl - set in filterStocks()

        let itemRow = document.createElement('div');
        itemRow.classList.add('d-flex', 'justify-content-between');
        itemRow.style.width = "100%";
        itemRow.style.overflowX = "hidden";

        let itemLeft = document.createElement('div');
        itemLeft.classList.add('d-flex', 'flex-column');

        let itemRight = document.createElement('div');

        // setting width of left and right div 
        // if code exists left div has 25% width
        if (paramDefined(element.code) && element.code != "") {
            let top = document.createElement('div');
            top.innerHTML = element.code;
            itemLeft.appendChild(top);
            itemLeft.classList.add("w-25");
            itemRight.classList.add("w-75");

        } else { // else left div does not have width
            itemLeft.classList.add("w-0");
            itemRight.classList.add("w-100");
        }

        let bottom = document.createElement('div');
        // bottom.style.whiteSpace = "nowrap";

        if (paramDefined(element.industry) && element.industry != "") {
            bottom.innerHTML += element.industry;
            itemLeft.appendChild(bottom);

        }
        if (paramDefined(element.sector) && element.sector != "") {
            bottom.innerHTML += "<br>" + element.sector;
            itemLeft.appendChild(bottom);
        }

        bottom.style.fontSize = "0.8em";


        // aligning name to the left/start, if code doesn't exist
        itemRight.classList.add('d-sm-flex', 'd-none', "d-flex", "itemRight", "align-items-center", "justify-content-start");
        itemRight.style.width = ((document.getElementById(tsrSearchBoxId + "List").offsetWidth * 0.75) / 125) + "px";

        // hack
        // * stores max no. of buttons that can be shown on the screen at a time for each <li>
        let maxButtons = Math.round((document.getElementById(tsrSearchBoxId + "List").offsetWidth * 0.75) / 75);

        let leftScrollBtn = document.createElement("button");
        leftScrollBtn.classList.add("h-100", "px-2", "align-items-center");
        leftScrollBtn.innerHTML = `<i class="fas fa-angle-left"></i>`;
        leftScrollBtn.addEventListener("click", function (e) {
            btnContainer.scrollBy({
                left: -125,
                behavior: 'smooth'
            });
            e.preventDefault();
            btnContainer.focus();
        });

        let btnContainer = document.createElement("div");
        btnContainer.classList.add("d-flex");
        btnContainer.style.overflowX = "hidden";

        let noOfBtns = 0; // stores actual no of buttons appended to button container
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
            button.innerHTML = `
                <a href="${buttons[i].urlPrefix + "/" + element.code + "/" + buttons[i].id}" style="color: black; ">
                ${buttons[i].label}
                </a>
            `;
            button.setAttribute("tabindex", "-1");
            button.addEventListener("keydown", navigateButtons);
            btnContainer.appendChild(button);

            noOfBtns++;
        }

        // If actual no of buttons appended to btnContainer are more than max buttons, add leftscroll and rightscroll btn, else don't
        if (noOfBtns > maxButtons) {
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

        if (noOfBtns > maxButtons) {
            itemRight.appendChild(rightScrollBtn);
        }

        // if code exists then name should be aligned to the end/right
        let name = document.createElement('span');
        if ((paramDefined(element.code) && element.code != "")) {
            itemRight.classList.add("justify-content-end");
            name.classList.add("name");
        }

        if (noOfBtns > 0) { // if there are buttons to show, then align name to end/right
            if (name.classList.contains("justify-content-start")) {
                name.classList.remove("justify-content-start");
            }
            itemRight.classList.add("justify-content-end");
        } else {    // else: it will stay aligned to start/left and remove name class so that it even shows on hover
            // itemRight.classList.add("justify-content-start");

            name.classList.remove("name");
        }
        name.innerHTML = element.name;
        itemRight.appendChild(name);


        // -------------------------------------

        itemRow.appendChild(itemLeft);
        itemRow.appendChild(itemRight);

        a.appendChild(itemRow);

        li.appendChild(a);

        list.appendChild(li);

    });
}

let navigateList = function navigateList(e) {

    let li = this;

    if (e.key === "Tab") {
        let radioBtns = document.getElementsByClassName("tsrRadioBtn");
        radioBtns[0].focus();

        e.preventDefault();
    }
    else if (e.key === "Enter") {
        let a = li.querySelector("a");
        window.open(a.href, "_self");
    }
    else if (e.key === "ArrowUp") {

        if (li.previousSibling) {
            li.previousSibling.focus();
        } else { // if li doesn't have prev sibling then, focus on inputTextBox
            let input = document.getElementById(inputTextBoxId);
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
                let input = document.getElementById(inputTextBoxId);
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

    let dialog = document.getElementById(tsrSearchBoxId);

    if (e.ctrlKey) {
        document.addEventListener("keydown", (event) => {
            if (event.code === "Space") { // ! e.key returns Unidentified for Space key in some browsers
                if (!dialog) // * if dialog is null || unidentified - not found
                    showSearchBox('equity');
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