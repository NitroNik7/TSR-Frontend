let tsrSearchBoxId = "tsrSearchBox";

let inputTextBoxId = "tsrStockSearch";

let radioBtnIdPrefix = "tsrRadioBtn";



// start
function showSearchBox(option) {

    closeDialog(tsrSearchBoxId);

    for (let i = 0; i < searchMenu.length; i++) {
        if (option == searchMenu[i].id) {

            let html = getSearchBoxHeaderHtml();
            html += getSearchBoxBodyHtml(searchMenu[i]);

            paintSearchBox(html);
            addOptionsToSelect(searchMenu[i]);
            // attachEventListenersToRadioBtns();

            break;
        }
    }
}

function getSearchBoxHeaderHtml() {

    let html = `<div id="${tsrSearchBoxId + "Header"}" class="d-flex justify-content-between">`

    html += getRadioMenuHtml(searchMenu);

    html += `<button class="btn-close" style="margin: 5px;" tabindex="-1 " onclick ="closeDialog('${tsrSearchBoxId}')"></button>`; // Close button

    html += `</div>`;

    return html;
}

function getRadioMenuHtml(data) {

    let html = `<div class="${radioBtnIdPrefix + "Menu"}">`;

    for (let i = 0; i < data.length; i++) {

        html += `<div id="${radioBtnIdPrefix + i}" class="${radioBtnIdPrefix}" tabindex="0" data-basket="${data[i].id}"`;
        html += data[i].default ? "checked" : "";
        html += ` onclick="radioBtnHandler(event)" onkeydown="radioBtnHandler(event)">`;

        html += `       <div class="${radioBtnIdPrefix + "Circle"}" >`;
        if (data[i].default) {
            html += `       <div class="${radioBtnIdPrefix + "InnerCircle"}" >`;
            html += `       </div>`
        }
        html += `       </div>`;
        html += `       <div class="${radioBtnIdPrefix + "Label"}">`;
        html += data[i].label;
        html += `       </div>`;
        html += `</div>`;
    }

    html += "</div>";
    return html;
}

const radioBtnHandler = function radioBtnHandler(e) {

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
            e.stopPropagation(); // prevents search box dialog from closing 
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
            else if (e.key === "ArrowLeft") {
                if (e.target.previousSibling) {
                    e.target.previousSibling.focus();
                }
                e.stopPropagation(); // prevents search box dialog from closing 

            }
            else if (e.key === "ArrowRight") {
                if (e.target.nextSibling) {
                    e.target.nextSibling.focus();
                }
                e.stopPropagation(); // prevents search box dialog from closing 
            }
            else if (e.key === "ArrowDown") {

                if (e.target.classList.contains(radioBtnIdPrefix)) {
                    let input = document.getElementById(inputTextBoxId);
                    input.focus();
                }
                e.stopPropagation(); // prevents search box dialog from closing 
            }
            else if (isAlphaNumericSymbol(e.key)) {

            }
            else {
                e.stopPropagation(); // prevents search box dialog from closing 

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
                <ul id="${tsrSearchBoxId + "List"}" class="${tsrSearchBoxId + "List"}"></ul>
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

function paintSearchBox(searchBoxHtml) {

    let html = `
            <dialog id="${tsrSearchBoxId}" class="border rounded p-0 ${tsrSearchBoxId}" onclick="closeSearchBoxOnClickOut(event)" onkeydown="handleKeypressOnSearchBox(event, '${tsrSearchBoxId}')">`;
    html += `   <div id="${tsrSearchBoxId + "content"}" class="p-3" style="overflow-Y: hidden; ">`;
    html += searchBoxHtml;
    html += `   </div>`;
    html += `</dialog>`;

    let searchBoxWrapper = document.getElementById(tsrSearchBoxId + "Wrapper");
    searchBoxWrapper.innerHTML = html;

    let searchBox = document.getElementById(tsrSearchBoxId);
    searchBox.showModal();
}

// let handleKeypressOnSearchBox = (e) => { handleKeydownOnSearchBox(e, tsrSearchBoxId) };

function handleKeypressOnSearchBox(e, searchBoxId) {

    let searchBox = document.getElementById(searchBoxId);
    let inputTextBox = document.getElementById(inputTextBoxId);

    // * Condition 1 : If entered key represents an alphanumeric character
    if (isAlphaNumericSymbol(e.key)) {

        // Check if Ctrl key is also pressed at the time
        // This prevents default beahviour and character from being entered twice
        if (!e.ctrlKey) {
            e.preventDefault();
        }

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
        else {
            let radioBtns = document.getElementsByClassName("tsrRadioBtn");
            radioBtns[0].focus();
        }
    }
    // * Condition 3 : if Arrow Left or Right key is pressed do not perform any action
    else if (e.key === "ArrowLeft" || e.key === "ArrowRight") { 

        // if(document.activeElement == inputTextBox){
        //     if(paramDefined(document.getElementById(tsrSearchBoxId + "Select"))){
        //         let select = document.getElementById(tsrSearchBoxId + "Select");
        //         select.focus();
        //     } 
        // }
    }
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
        setTimeout(() => {
            filterStocks(inputTextBox.value);
        }, 10);
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
function closeSearchBoxOnClickOut(e) {
    let div = document.getElementById(tsrSearchBoxId + "content");

    if (paramDefined(div) && !div.contains(e.target)) {
        closeDialog(tsrSearchBoxId);
    }
}

function closeDialog(searchBoxId) {

    let searchBox = document.getElementById(searchBoxId);

    if (searchBox) {
        searchBox.close();
        let searchBoxWrapper = document.getElementById(tsrSearchBoxId + "Wrapper");
        searchBoxWrapper.removeChild(searchBox);
    }
}

function filterStocks(query) {

    // ! WARNING assuming there will be always be a radio button in the search box, i.e. in the searchMenu[] 
    let searchBox = document.getElementById(tsrSearchBoxId);
    let radioBtns = searchBox.getElementsByClassName(radioBtnIdPrefix);
    
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
<<<<<<< HEAD
    stockList = stockList.filter((item) => {
        let keys = Object.keys(item);

        for (let i = 0; i < keys.length; i++) {
            if (typeof item[keys[i]] == "string" && item[keys[i]].toLowerCase().includes(query.toLowerCase())) {
                return item;
            }
        }
    });
=======

    // let params = ["label", "name", "industry", "sector"]
    // stockList = stockList.filter((item) => {

    //     for (let i = 0; i < params.length; i++) {
    //         if(paramDefined(item[params[i]]) && typeof item[params[i]] == "string" && item[params[i]].toLowerCase().includes(query.toLowerCase())){
    //         // if (typeof item[keys[i]] == "string" && item[keys[i]].toLowerCase().includes(query.toLowerCase())) {
    //             return item;
    //         }
    //     }
    // });
>>>>>>> 820ba23 (updates)

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
        itemLeft.classList.add('itemLeft', 'd-flex', 'flex-column', "justify-content-center");
        // itemLeft.style

        let itemRight = document.createElement('div');

        // setting width of left and right div 
        // if code exists left div has 25% width
        if ((paramDefined(element.code) && element.code != "")) { // If code exists 
            if (paramDefined(element.name) && element.name != "") { // if name also exists - give width to both itemLeft and itemRight
                itemLeft.classList.add("w-25");
                itemLeft.style.minWidth = "125px";
                itemRight.classList.add("w-75");
            }
            else { // If name doesn't exist - give available width to itemLeft
                itemLeft.classList.add("w-auto");
                itemLeft.style.minWidth = "125px";
                itemRight.classList.add("w-auto");
            }
        }

        let top = document.createElement('div');
        top.innerHTML = element.code;
        itemLeft.appendChild(top);

        // aligning name to the left/start, if code doesn't exist
        itemRight.classList.add("d-none", "d-sm-flex", "itemRight", "justify-content-start");
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
<<<<<<< HEAD
            button.classList.add('btn', 'btn-sm', 'me-2', "p-2");
            button.style.maxWidth = "125px";
            button.style.whiteSpace = "nowrap";
            button.innerHTML = `
                <a href="${buttons[i].urlPrefix + "/" + element.code + "/" + buttons[i].id}" style="color: black; ">
=======
            button.classList.add('btn', 'btn-sm', 'me-2', "p-0");
            button.style.maxWidth = "125px";
            button.style.minHeight = "37.5px";
            button.style.whiteSpace = "nowrap";
            button.innerHTML = `
                <a href="${buttons[i].urlPrefix + "/" + element.code + "/" + buttons[i].id}" style="color: black; padding: 7px;">
>>>>>>> 820ba23 (updates)
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
        let nameDiv = document.createElement('div');
        if ((paramDefined(element.code) && element.code != "")) {
            // itemRight.classList.add("justify-content-end");
            nameDiv.classList.add("name");
        }

        if (noOfBtns <= 0) { // remove name class so that it even shows on hover
            // itemRight.classList.add("justify-content-start");

            nameDiv.classList.remove("name");
            nameDiv.style.display = "block";

        }
        if (paramDefined(element.name) && element.name != "") {
            let name = document.createElement("span");
            name.innerHTML = element.name;

            let indSector = document.createElement("span");
            indSector.style.fontSize = "12px";
            if (paramDefined(element.industry) && paramDefined(element.sector)) {
                indSector.innerHTML = element.industry + " | " + element.sector;
            }
            else if (paramDefined(element.industry)) {
                indSector.innerHTML = element.industry;
            }
            else if (paramDefined(element.sector)) {
                indSector.innerHTML = element.sector;
            }
            else {
                itemLeft.style.width = "100%";
                itemRight.style.width = "0%";
            }

            nameDiv.appendChild(name);
            nameDiv.innerHTML += "<br>";
            nameDiv.appendChild(indSector);


            itemRight.appendChild(nameDiv);
        }


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
<<<<<<< HEAD
=======
    else if (e.key === "Enter") {
        if(e.target.tagName = "BUTTON"){
            let a = e.target.querySelector("a");
            window.open(a.href, "_self");
        }
        e.stopPropagation();
        e.preventDefault();
    }
>>>>>>> 820ba23 (updates)
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



// CSS:
let tsr_search_box_css = `
    .tsrSearchBox {
        width: 50%;
    }

    .tsrSearchBox::backdrop {
        background: rgba(0, 0, 0, 0.75);
    }

`;

let tsr_search_box_list_css = `

    .tsrSearchBoxList {
        max-height: 300px;
        overflow-y: auto;
        scroll-behavior: smooth;
        list-style-type: none;
        padding-left: 0;
    }

    .tsrSearchBoxList::-webkit-scrollbar {
        width: 4px;
    }

    .tsrSearchBoxList::-webkit-scrollbar-track {
        background-color: white;
    }

    .tsrSearchBoxList li {
<<<<<<< HEAD
=======
        margin-bottom: 8px;
>>>>>>> 820ba23 (updates)
        padding: 8px;
        border-bottom: 1px solid #ddd;
    }

    .tsrSearchBoxList li:hover {
        background-color: lightgray;
        cursor: pointer;
        color: black !important;
        font-weight: 700;
        font-size: 17px;
    }

<<<<<<< HEAD
=======
    .tsrSearchBoxList li:hover + li{
        z-index: -1;
    }

>>>>>>> 820ba23 (updates)
    .tsrSearchBoxList li:focus {
        background-color: gray;
        cursor: pointer;
        color: white !important;
        font-weight: 700;
        font-size: 17px;
    }

    .tsrSearchBoxList li a {
        color: black;
    }

    .tsrSearchBoxList li:focus a {
        color: white;
    }

    .tsrSearchBoxList li .name {
        display: block;
    }

    .tsrSearchBoxList li:hover .name,
    .tsrSearchBoxList li:focus .name {
        display: none !important;
    }

    .tsrSearchBoxList li:focus-within {
        background-color: gray;
        cursor: pointer;
    }

    .tsrSearchBoxList li:focus-within .itemLeft{
        color: white;
        font-weight: 700;
        font-size: 17px;
    }

    .tsrSearchBoxList li:focus-within .name {
        display: none;
    }


    .tsrSearchBoxList li:focus-within .btn {
        display: block;
        background-color: white;

    }

    .tsrSearchBoxList li .btn {
        display: none;
        border-radius: 15px;
    }

    .tsrSearchBoxList li .btn:hover a,
    .tsrSearchBoxList li .btn:focus a {
        /* background-color: black !important; */
        color: white !important;
    }

    .tsrSearchBoxList li .btn:hover,
    .tsrSearchBoxList li .btn:focus {
        background-color: black !important;
        font-weight: 700;
        box-shadow: none;
    }

    .tsrSearchBoxList li .itemRight {
        overflow-x: hidden;
        justify-content: end;
        display: flex;
    }

    .tsrSearchBoxList li .itemRight button {
        display: none;
        border: none;
        background: none;
    }

    .tsrSearchBoxList li:hover .itemRight button {
        display: flex;
    }

    .tsrSearchBoxList li:hover .itemRight button:hover {
        color: white;
    }


    .tsrSearchBoxList li:hover .itemRight div,
    .tsrSearchBoxList li:focus .itemRight div {
        overflow-x: hidden;
        display: flex;
    }

    .tsrSearchBoxList li:hover .btn,
    .tsrSearchBoxList li:focus .btn {
        display: block;
        background-color: white;
    }

    .tsrSearchBoxList .empty:hover {
        background-color: white;
        cursor: default;
        color: black !important;
        font-weight: 400 !important;
    }
`;

let tsr_search_box_media_query = `

    @media only screen and (max-width: 1200px) {

        .tsrSearchBox {
            width: 75%;
        }

    }

    @media only screen and (max-width: 768px) {

        .tsrSearchBox{
            width: 100%;
            max-width: 450px;
        }

        
    }

`;

let tsr_radio_btn_css = `
    .${radioBtnIdPrefix}Menu {
        display: flex;
    }

    .${radioBtnIdPrefix} {
        display: inline-flex;
        align-items: center;
        margin-left: 15px;
        cursor: default;
    }

    .${radioBtnIdPrefix}:focus {
        border: 1px solid;
    }

    .${radioBtnIdPrefix}Circle {
        margin-right: 5px;
        border: 1px solid;
        border-radius: 20px;
        height: 13px;
        width: 13px;
    }

    .${radioBtnIdPrefix}InnerCircle {
        /* border: 1px solid; */
        border-radius: 20px;
        height: 7.5px;
        width: 7.5px;
        position: relative;
        top: 2px;
        left: 2px;
        background-color: black;
    }
`;

// Code to find CSS in HTML and append it if not found
addTsrSearchBoxCss();
function addTsrSearchBoxCss() {
    let className = 'tsrSearchBox';

    for (let sheet of document.styleSheets) {
        if (sheet.ownerNode && sheet.ownerNode.tagName === 'STYLE') {

            try {
                for (let rule of sheet.cssRules) {
                    if (rule.selectorText && rule.selectorText.includes(`.${className}`)) {
                        console.log(rule.selectorText, rule.style.cssText);
                        break;

                    }
                    else {
                        let style = document.createElement("style");
                        style.innerHTML = tsr_search_box_css + `\n` + tsr_search_box_list_css + `\n` + tsr_search_box_media_query + `\n` + tsr_radio_btn_css;

                        document.getElementsByTagName('head')[0].appendChild(style);
                        break;

                    }
                }
            } catch (e) {

                // Some stylesheets might be from different origins and not accessible
                // console.warn('Cannot access stylesheet:', sheet.href);
            }
            break;
        }
    }
}
