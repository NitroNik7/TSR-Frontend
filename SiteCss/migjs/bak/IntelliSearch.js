var miIs = (function () {  // chart init Params

    var htmlU = mintHtmlUtil;
    var jsu = mintJsUtil;
    var cjs = mintStkCommon;
    var objName = 'miIs';

    let tsrSearchBoxId = "tsrSearchBox";

    let inputTextBoxId = "tsrStockSearch";

    let radioBtnIdPrefix = "mishRadioBtn";



    let searchMenu;

    function init() {

        miIsc.init();

        searchMenu = miIsh.ism(); // Get search Menu

        var searchForm = '<table border="0" width="100%">';

        searchForm += '<tr><td>'
        searchForm += `<input id="user_input" type="text" class="form-control " placeholder="Search (Ctrl + K)" 
		onclick="miIs.ssb('equity')" autocomplete="off">`



        searchForm += '</td><td>'

        // if(jsu.isMigContext()){ // Interactive charts not support in MIG
        // 		jsu.removeFromArrayWithId(SEARCH_SUB_CAT, 'InteractiveCharts');
        // }

        searchForm += 'hello' + BREAK_LINE + "new Listing";

        // searchForm += htmlU.getDropDown(SEARCH_SUB_CAT, 'eqSubCat', ddStyle, objName+".sc", 'sc', defPref);

        // if(defPref == 'TechnicalAnalysis') {
        // 	searchForm += SP_2+  addTechIndiOpt();
        // }else if(defPref == 'FundamentalAnalysis') {
        // 	searchForm += SP_2+  addFundaIndiOpt();
        // }

        searchForm += '</td></tr>'
        searchForm += '</table>'



        htmlU.addMsgToDiv('mainController', false, '<div id="' + tsrSearchBoxId + 'Wrapper"></div>');

        addEventListner();

        // $('#').append('<div id="'+ tsrSearchBoxId+'Wrapper"></div>')

        // const parentElement = document.getElementById('body');

        // parentElement.appendChild(document.createElement( tsrSearchBoxId +'Wrapper'));

        return searchForm;


        // let html=  searchForm +'<div id="tsrSearchBoxWrapper"></div>'


        // return html;
    }

    function showSearchBox(option) {

        closeDialog(tsrSearchBoxId);
        searchMenu = miIsh.ism(option);


        searchMenu = miIsh.gsm();

        // if(jsu.isNull(option)){
        // 	option = searchMenu[i];
        // }

        for (let i = 0; i < searchMenu.length; i++) {

            if (searchMenu[i].default) {

                let searchCat = searchMenu[i];

                let html = miIsh.sbh(searchCat.id, tsrSearchBoxId, searchMenu);

                html += miIsh.sbbh(searchCat, inputTextBoxId, tsrSearchBoxId);

                miIsh.psb(html, inputTextBoxId, tsrSearchBoxId);
                // addOptionsToSelect(searchMenu[i]);

                miIsh.ots(searchCat, inputTextBoxId, tsrSearchBoxId);

                // Taken care in Radio with Actual Event ...
                // attachEventListenersToRadioBtns();

                break;
            }
        }
    }

    function handleKeypressOnSearchBox(e, inputTextBoxId, searchBoxId) {


        let searchBox = document.getElementById(searchBoxId);
        let inputTextBox = document.getElementById(inputTextBoxId);

        // * Condition 1 : If entered key represents an alphanumeric character
        if (jsu.isAlphaNum(e.key)) {

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

            // If text is selected using the mouse or Ctrl key and replaced
            let replacedText = replaceSelectedText(inputTextBox, e.key);
            if (replacedText.length > 0) {
                text = replacedText;
            }

            inputTextBox.value = text;
            inputTextBox.focus();

            setTimeout(function () {
                filterStocks(inputTextBox.value);
            }, 10);

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
                let radioBtns = searchBox.getElementsByClassName(radioBtnIdPrefix);
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
            closeDialog(tsrSearchBoxId);
        } // * Condition 8 : if anything else on the keyboard is pressed, focus on inputTextBox 
        else {
            inputTextBox.focus();
            setTimeout(() => {
                filterStocks(inputTextBox.value);
            }, 10);
        }
    }


    function replaceSelectedText(inputTextBox, char) {
        let start = inputTextBox.selectionStart;
        let end = inputTextBox.selectionEnd;

        let selectedText = inputTextBox.value.substring(start, end);
        let replacedText = "";
        if (selectedText.length > 0) {
            replacedText = inputTextBox.value.substring(0, start) + char + inputTextBox.value.substring(end, inputTextBox.length);
            return replacedText;
        }

        return replacedText;

    }



    function filterStocks(query) {
        let searchMenu = miIsh.gsm();

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

        // * below code passes relevant data to processSearchCategory()
        // * It finds desired search category from the radio button
        for (let i = 0; i < searchMenu.length; i++) {
            if (searchMenu[i].id == categoryName) {
                // processSearchCategory(searchMenu[i], query);
                getStockList(searchMenu[i], query)
            }
        }

    }
    // let base_url = jsu.getRootUrl()+"/";


    function getStockList(searchMenuData, query) {

        let stockList = [];



        if (jsu.containsString(['screener', 'equity', 'chart'  ,'eqCh','compEqCh'], searchMenuData.id)) {
            if (jsu.isNull(query)) {
                stockList = searchMenuData.defData;
            } else {
                // // AJAX CALL
                miIsh.ls(searchMenuData, query);
                return;
            }
        } else if (searchMenuData.id == 'indCh') {
            stockList = miChIs.ls(query)
        }

        processSearchCategory(searchMenuData, stockList);
    }


    function processSearchCategory(searchMenuData, stockList) {

        // ! data params used in populateSearchList() are code, name, industry and sector only
        let base_url = jsu.getRootUrl() + "/";

        let categoryButtons = [];
        let urlPrefix = "", urlSuffix = "";

        // * below code passes relevant data to populateSearchList()
        switch (searchMenuData.id) {

            case "chart":


                let subCat = processSubCategory(searchMenuData, stockList, base_url);

                // urlPrefix = "Stock", urlSuffix = "InteractiveCharts";
                // stockList = stockList.filter((item) => {
                //     item.defaultUrl = base_url + urlPrefix + "/" + item.code + "/" + urlSuffix;
                //     return item;
                // });

                return populateSearchList(searchMenuData, stockList, subCat.cb, base_url);
            case "screener":



                stockList = stockList.filter((item) => {
                    item.defaultUrl = base_url + item.uri;
                    item.code = item.label; // * element.code should be present - it represents left part of the search box record 
                    return item;
                });

                return populateSearchList(searchMenuData, stockList, categoryButtons);


            case 'indCh':     
            case 'eqCh':     
            case 'compEqCh':     
                return populateSearchList(searchMenuData, stockList, categoryButtons, base_url);


            default: // * case equity:

                // * checks for any additional sub category that might be selected using the Select dropdown
                if (document.getElementById(tsrSearchBoxId + "Select")) { // if select dropdown is present
                    let basketCategory = document.getElementById(tsrSearchBoxId + "Select");
                    let category = basketCategory.value; // get selected option

                    let subCat = searchMenuData.subCat;
                    for (let j = 0; j < subCat.length; j++) {
                        if (subCat[j].id == category) { // if selected option and subCat match

                            if (paramDefined(subCat[j].buttons)) { // store buttons if they exist
                                categoryButtons = subCat[j].buttons;
                            }
                            if (paramDefined(subCat[j].urlPrefix)) {  // store url prefix if it exists
                                urlPrefix = subCat[j].urlPrefix;
                            }
                            if (paramDefined(subCat[j].urlSuffix)) { // store url suffix if it exists
                                urlSuffix = subCat[j].urlSuffix;
                            }

                            if (!subCat[j].default) { // if default is false, then check if mapped param is present in the element
                                let mappedParam = subCat[j].mappedParam;
                                if (paramDefined(mappedParam)) {
                                    stockList = stockList.filter((item) => {
                                        if (item[mappedParam]) { // if mappedParam exists in element, then set url and add it to stockList
                                            item.defaultUrl = base_url + urlPrefix + "/" + item.code + "/" + urlSuffix;
                                            return item;
                                        }
                                    });

                                    // stockList contains all items which contains mappedParam
                                    // * Eg. All stocks of equityData do not have fno. So 
                                    // * subCat FuturesAndOptions: default:false, mappedParam: "fno"
                                    // * stockList only contains all elements which has fno: true defined

                                    return populateSearchList(searchMenuData, stockList, categoryButtons, base_url);

                                }
                            }
                            // * else - return entire stockList
                            stockList = stockList.filter((item) => {
                                item.defaultUrl = base_url + urlPrefix + "/" + item.code + "/" + urlSuffix;
                                return item;
                            });

                            return populateSearchList(searchMenuData, stockList, categoryButtons, base_url);
                        }
                    }
                }
                break;
        }
    }

    function processSubCategory(searchMenuData, stockList, base_url) {
        let categoryButtons = [];
        if (document.getElementById(tsrSearchBoxId + "Select")) { // if select dropdown is present
            let basketCategory = document.getElementById(tsrSearchBoxId + "Select");
            let category = basketCategory.value; // get selected option

            let subCat = searchMenuData.subCat;
            for (let j = 0; j < subCat.length; j++) {
                if (subCat[j].id == category) { // if selected option and subCat match

                    if (paramDefined(subCat[j].buttons)) { // store buttons if they exist
                        categoryButtons = subCat[j].buttons;
                    }
                    if (paramDefined(subCat[j].urlPrefix)) {  // store url prefix if it exists
                        urlPrefix = subCat[j].urlPrefix;
                    }
                    if (paramDefined(subCat[j].urlSuffix)) { // store url suffix if it exists
                        urlSuffix = subCat[j].urlSuffix;
                    }

                    if (!subCat[j].default) { // if default is false, then check if mapped param is present in the element
                        let mappedParam = subCat[j].mappedParam;
                        if (paramDefined(mappedParam)) {
                            stockList = stockList.filter((item) => {
                                if (item[mappedParam]) { // if mappedParam exists in element, then set url and add it to stockList
                                    item.defaultUrl = base_url + urlPrefix + "/" + item.code + "/" + urlSuffix;
                                    return item;
                                }
                            });

                            // stockList contains all items which contains mappedParam
                            // * Eg. All stocks of equityData do not have fno. So 
                            // * subCat FuturesAndOptions: default:false, mappedParam: "fno"
                            // * stockList only contains all elements which has fno: true defined

                            return { cb: categoryButtons };

                        }
                    }
                    // * else - return entire stockList
                    stockList = stockList.filter((item) => {
                        item.defaultUrl = base_url + urlPrefix + "/" + item.code + "/" + urlSuffix;
                        return item;
                    });

                    return { cb: categoryButtons };
                }
            }
        }
    }


    function populateSearchList(searchMenuData, stockList, buttons, base_url) {


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
            li.style.pointerEvents = "none";

            li.setAttribute("tabindex", "0");
            li.addEventListener("keydown", navigateList);

            let itemRow = document.createElement('div');
            itemRow.classList.add('d-flex', 'justify-content-between');
            itemRow.style.width = "100%";
            itemRow.style.overflowX = "hidden";

            if (searchMenuData.jsFnc) { // set onclick handler
                itemRow.innerHTML = element.label;

                miIsh.ajs(searchMenuData.id, element, li)
                li.appendChild(itemRow);


                // li.onclick = function (e) {
                //     closeDialog(tsrSearchBoxId);
                // }

                // li.onkeydown = function (e) {
                //     if (e.key == "Enter") {
                //         closeDialog(tsrSearchBoxId);
                //     }
                // }


            }
            else { // add <a> link and buttons
                li.addEventListener("keydown", navigateButtons);

                let a = document.createElement("a");
                a.href = element.defaultUrl; // defaultUrl - set in filterStocks()

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
                    button.classList.add('btn', 'btn-sm', 'me-2', "p-0");
                    button.style.maxWidth = "125px";
                    button.style.minHeight = "37.5px";
                    button.style.whiteSpace = "nowrap";
                    button.innerHTML = `
                    <a href="${base_url + buttons[i].urlPrefix + "/" + element.code + "/" + buttons[i].id}" style="color: black; padding: 7px;">
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
            }

            list.appendChild(li);

        });
    }

    let navigateList = function navigateList(e) {

        let li = this;

        if (e.key === "Tab") {
            let searchBox = document.getElementById(tsrSearchBoxId);
            let radioBtns = searchBox.getElementsByClassName(radioBtnIdPrefix);
            radioBtns[0].focus();

            e.preventDefault();
        }
        else if (e.key === "Enter") {
            // let a = li.querySelector("a");
            // window.open(a.href, "_self");
            if (li.querySelector("a")) {
                let a = li.querySelector("a");
                window.open(a.href, "_self");
            }
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
        else if (e.key === "Enter") {
            if (e.target.tagName = "BUTTON") {
                let a = e.target.querySelector("a");
                window.open(a.href, "_self");
            }
            e.stopPropagation();
            e.preventDefault();
        }
    }







    function addEventListner() {
        // listen for ctrl + space
        document.addEventListener("keydown", (e) => {

            let dialog = document.getElementById(tsrSearchBoxId);

            if (e.ctrlKey) {


                document.addEventListener("keydown", (event) => {
                    if (event.key === "k" || event.key === "K") { // ! e.key returns Unidentified for Space key in some browsers
                        e.preventDefault();
                        event.preventDefault();
                        e.stopPropagation();
                        event.stopPropagation();
                        if (!dialog) {// * if dialog is null || unidentified - not found

                            showSearchBox();
                        }
                    }
                }, { once: true });
            }
        }
        );
    }


    function paramDefined(param) {
        if (param != null && param != undefined)
            return true;

        return false;
    }

    function closeSearchBoxOnClickOut(e) {
        let div = document.getElementById(tsrSearchBoxId + "content");

        if (paramDefined(div) && !div.contains(e.target)) {
            closeDialog(tsrSearchBoxId);
        }
    }

    function closeDialog(searchBoxId) {

        if (jsu.isNull(searchBoxId)) {
            searchBoxId = tsrSearchBoxId;
        }


        let searchBox = document.getElementById(searchBoxId);

        if (searchBox) {
            searchBox.close();
            let searchBoxWrapper = document.getElementById(tsrSearchBoxId + "Wrapper");
            searchBoxWrapper.removeChild(searchBox);
        }
    }





    // var base_url = "https://www.tsrbt1.com/rt/";  // TODO To Correct it later


    return {

        init: init,
        ael: addEventListner,
        ssb: showSearchBox,
        fs: filterStocks,

        psc: processSearchCategory,

        kpsb: handleKeypressOnSearchBox,
        sbc: closeSearchBoxOnClickOut,
        cd: closeDialog

    }


})(); // module createFormElem      
