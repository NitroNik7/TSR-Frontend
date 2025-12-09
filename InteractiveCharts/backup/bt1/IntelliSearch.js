var miIs = (function () {  // chart init Params

    var htmlU = mintHtmlUtil;
    var jsu = mintJsUtil;
    var cjs = mintStkCommon;
    var objName = 'miIs';

    let tsrSearchBoxId = "tsrSearchBox";

    let inputTextBoxId = "tsrStockSearch";

    let radioBtnIdPrefix = "mishRadioBtn";



    let searchMenu;

    let searchType = 'equity'

    function init(mobile, type) {

        miIsc.init();

        if(jsu.isNotNull(type)){
            searchType = type; // = 'equity'
        }


        searchMenu = miIsh.ism(); // Get search Menu

        var searchForm = ''

        if (mobile) {
            searchForm = `<input id="user_input" type="text" class="form-control " placeholder="Search (Ctrl + K)" 
            onclick="miIs.ssb('${searchType}')" autocomplete="off" style="width:95%; margin:10px">`;
        } else {

            searchForm = `

                        <style>
                            .miSearchWrapper a {
                                color: rgb(102 115 103);
                                font-size: 10px;
                                transition: all 0.3s ease
                            }
                            .miSearchWrapper a:hover{
                                color: #2a67ca;
                                font-size: 13px;
                            }

                            .miUpdatesBox a, .miUpdatesBox span {
                                font-family: 'Georgia', serif;
                                font-weight: 600;
                                letter-spacing: 1px;
                                color: rgb(102 115 103);
                                line-height: 1.4;
                                font-size: 18px;
                                white-space: nowrap;
                            }

                            .miUpdatesBox a:hover{
                                color: rgb(102 115 103);
                                text-decoration: underline;
                                                                font-size: 18px;

                            }
                        </style>

                        <div>
                            <div id="searchFormDiv">
                                <div class="miSearchWrapper d-flex pt-1 w-100" style="box-sizing: border-box;">
                                    <div style="width: auto; text-align: center;">`

            if (!jsu.isMigContext()) {

                searchForm += `             <input id="user_input" type="text" class="form-control " placeholder="Search (Ctrl + K)"
                                        onclick="miIs.ssb('${searchType}')" autocomplete="off" style="width:200px; margin:10px; margin-bottom: 5px; margin-top: 0px;">

                                        <a href="${jsu.getBaseUrl()}/rt/TsrHighlights/TsrTechnicalTool" style="margin-left: 10px; font-weight: 500;">India's Best Technical Tool</a>`;

                searchForm += `</div>
                                    <div class="miUpdatesBox text-center w-100 mx-3">
                                        ${topBanner(mobile)}
                                    </div>
                                </div>
                            </div>
                        </div>`;
            }
            else {
                searchForm += `      <input id = "user_input" type = "text" class="form-control " placeholder = "Search (Ctrl + K)"
                onclick = "miIs.ssb('${searchType}')" autocomplete = "off" style = "width:200px; margin:10px;" > `;

                searchForm += `</div>
                                    <div class="miUpdatesBox text-center w-100 mx-3">
                                        ${miIsh.wub()}
                                    </div>
                                </div>
                            </div>
                        </div>`;
            }

                // <a href="https://www.topstockresearch.com/rt/TsrHighlights/TsrTechnicalTool" style="font-size: 12px;">India's Best Technical Tool</a>


                // let input = `<input id="user_input" type="text" class="form-control " placeholder="Search (Ctrl + K)" 
                // onclick="miIs.ssb('equity')" autocomplete="off" style="width:200px; margin:10px">`



                // searchForm += '<table border="0" width="100%">';

                // searchForm += '<tr><td>'
                // searchForm += input



                // searchForm += '</td><td align="center">'

                // // if(jsu.isMigContext()){ // Interactive charts not support in MIG
                // //      jsu.removeFromArrayWithId(SEARCH_SUB_CAT, 'InteractiveCharts');
                // // }

                // searchForm += htmlU.getSpan('hello', null ,12) + TSR_HR 
                // + htmlU.getSpan("Dashboard"  , 'grey' ,12)
                // + SP_3
                // + htmlU.getSpan("Heatmap"  , 'grey' ,12);

                // // searchForm += htmlU.getDropDown(SEARCH_SUB_CAT, 'eqSubCat', ddStyle, objName+".sc", 'sc', defPref);

                // // if(defPref == 'TechnicalAnalysis') {
                // //  searchForm += SP_2+  addTechIndiOpt();
                // // }else if(defPref == 'FundamentalAnalysis') {
                // //  searchForm += SP_2+  addFundaIndiOpt();
                // // }

                // searchForm += '</td></tr>'
                // searchForm += '</table>'
            }





            htmlU.addMsgToDiv('mainController', false, '<div id="' + tsrSearchBoxId + 'Wrapper"></div>');

            addEventListner();

            // $('#').append('<div id="'+ tsrSearchBoxId+'Wrapper"></div>')

            // const parentElement = document.getElementById('body');

            // parentElement.appendChild(document.createElement( tsrSearchBoxId +'Wrapper'));

            return searchForm;


            // let html=  searchForm +'<div id="tsrSearchBoxWrapper"></div>'


            // return html;
        }



        function topBanner(mobile) {
            return miIsh.wub();
/*
            let premium = false;

            if (userProf.status == 'signedIn' && jsu.isNotNull(userProf.sub) && userProf.sub != 'EXPIRED') {
                premium = true;
            }

            if (premium) {

                var url = window.location.href;

                if (url.includes("rt/Home") || url.includes("/rt/TsrHighlights")
                    || url.includes("my/TsrPlans/")) {
                    // Show Ads
                    return showAds();
                } else {
                    return miIsh.wub();
                }
            } else {
                // if(mobile){
                //     return ''    
                // }

                // return miIsh.wub();
                // always Ads
                let ads = showAds();

                // if(mobile){
                //     ads+'</div>';

                //     return
                // }
                return ads;
            }

*/            
        }
/*
        function showAds() {


            // return ''


            return `
                                    <!-- Diwali banner starts here -->
                                                    <style>
                                                        .animate-charcter1 {
                                                            background-image: linear-gradient(-225deg, var(--bs-primary) 0%, #af487c 29%, #537ab4 67%, var(--bs-primary) 100%);
                                                            background-size: auto auto;
                                                            background-clip: border-box;
                                                            background-size: 200% auto;
                                                            background-clip: text;
                                                            text-fill-color: transparent;
                                                            -webkit-background-clip: text;
                                                            -webkit-text-fill-color: transparent;
                                                            animation: textclip 2s linear infinite;
                                                            display: inline-block;
                                                            font-weight: bold;
                                                        }
                                                    </style>

                                                    <div class="miUpdatesBox text-center w-100 mx-3">
                                                        <!-- MEDIUM SIZED SCREEN VIEW - ABOVE 768 PX -->
                                                        <div class="d-none d-md-flex flex-column d-xl-none h-100 text-center" 
                                                            style="box-sizing: border-box;">
                                                            
                                                            <div class="d-flex justify-content-center">
                                                                <span class="pe-2" style="font-size: 14px; color: darkblue;">
                                                                    <i>
                                                                        Offers Upto
                                                                        <span style="font-size: 20px;" class="animate-charcter1">
                                                                            60%
                                                                        </span>
                                                                        Off
                                                                    </i>
                                                                </span>
                                                                <a class="btn btn-primary btn-style userEdit py-1"
                                                                    style="border-radius: 999px;box-shadow: #0061ff 0 10px 10px -10px; font-size: 15px; font-weight: bold; color: white; letter-spacing: 0;"
                                                                    href="https://www.topstockresearch.com/my/TsrPlans/"
                                                                    target="_blank" target="_blank"> Buy Now</a>
                                                            </div>


                                                            <span style="font-size: 16px; 
                                                                font-family: 'Georgia', serif;
                                                                font-weight: 600;
                                                                color: #fd7e14;
                                                                letter-spacing: 2px;
                                                                position: relative;
                                                                display: inline-block;
                                                                font-style: italic;">
                                                                Ending Sat 6PM

                                                            </span>

                                                        </div>
                                                        <!-- LARGE SIZED SCREEN VIEW - ABOVE 992 PX -->
                                                        <div class="d-none d-xl-flex h-100">
                                                            <div class="my-1 d-flex align-items-center px-3"
                                                                style="font-size: 18px; 
                                                                font-family: 'Georgia', serif;
                                                                font-size: 18px;
                                                                font-weight: 600;
                                                                color: #2c3e50;
                                                                letter-spacing: 2px;
                                                                position: relative;
                                                                display: inline-block;
                                                                line-height: 1.4; border-right: 3px solid #ff9800; white-space: nowrap;">

                                                                <a href="https://www.topstockresearch.com/my/TsrPlans/"><img
                                                                        style="max-width: unset; height: 50px; width: 70px;"
                                                                        src="https://www.topstockresearch.com/static/img/Campaign/HappyDiwaliY23.png"
                                                                        title="TSR Diwali 2025"
                                                                        class="img-responsive img-fluid"></a>

                                                            </div>
                                                            <div class="d-flex align-items-center ps-3 w-100">
                                                                <div class="d-flex flex-column w-100 text-center">
                                                                   
                                                                    <div class="d-flex justify-content-center mx-1">
                                                                        <span class="px-1 align-content-center"
                                                                            style="color: darkblue; font-size: 16px;">
                                                                            <i>
                                                                                Diwali Special Offers Up to
                                                                                <span class="animate-charcter1" style="font-size: 20px;">
                                                                                    60%
                                                                                </span>
                                                                                Off
                                                                            </i>
                                                                        </span>
                                                                        <!-- <span class="mx-auto d-none d-xxl-block"
                                                                            style='color:#6c757d;font-weight: bold;font-size: 14px;'>US/UK Screener@ Rs 999/Yr </span> -->
                                                                        <a class="btn btn-primary btn-style userEdit mx-3 py-1"
                                                                            style="border-radius: 999px;box-shadow: #3a5176 0 10px 10px -10px;font-size: 15px; font-weight: bold; color: white; letter-spacing: 0; text-decoration: none;"
                                                                            href="https://www.topstockresearch.com/my/TsrPlans/"
                                                                            target="_blank" target="_blank">Buy
                                                                            Now</a>
                                                                    </div>
                                                                    <div>
                                                                        <span
                                                                            style='color:#fd7e14;font-weight: bold;font-size: 16px; font-style: italic;'>
                                                                            Hurry! Offer Ending Sat 6 PM</span>
                                                                    </div>                                        


                                                                </div>


                                                            </div>
                                                                 
                                                 </div>
                                            </div>

                                               <!-- Diwali banner ends here -->
          
        `;
        }

*/

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

                    // console.log(jsu.getBaseUrl(), jsu.getRootUrl(), jsu.getBaseWwwUrl())

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

                    // If user types from somewhere other than input text box, reset the text box
                    if (document.activeElement != inputTextBox) {
                        inputTextBox.value = "";
                    }

                    // * For allowing default Ctrl + hotkey behaviour
                    let start = inputTextBox.selectionStart;
                    let end = inputTextBox.selectionEnd;
                    // Update current text box value with the new character entered
                    let text = inputTextBox.value.substring(0, start) + e.key + inputTextBox.value.substring(end, inputTextBox.length);

                    // If text is selected using the mouse or Ctrl key and replaced
                    let replacedText = replaceSelectedText(inputTextBox, e.key);
                    if (replacedText.length > 0) {
                        text = replacedText;
                    }

                    inputTextBox.value = text;
                    inputTextBox.focus();

                    // * For allowing default Ctrl + hotkey behaviour
                    inputTextBox.setSelectionRange(start + 1, start + 1);

                    setTimeout(function () {
                        filterStocks(inputTextBox.value);
                    }, 10);
                }
                else {
                    // filter stocks if text is pasted/cleared/other using Ctrl + key
                    setTimeout(function () {
                        filterStocks(inputTextBox.value);
                    }, 10);

                }


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



            if (jsu.containsString(['screener', 'equity', 'chart', 'eqCh', 'compEqCh'], searchMenuData.id)) {
                if (jsu.isNull(query)) {
                    stockList = searchMenuData.defData;
                } else {
                    // // AJAX CALL
                    miIsh.ls(searchMenuData, query);
                    return;
                }
            } else if (searchMenuData.id == 'indCh') {
                stockList = miChIs.ls(query)
            } else if (searchMenuData.id == 'addFilter') {
                stockList = mintSrch.gf(query)

            }

            processSearchCategory(searchMenuData, stockList);
        }


        function processSearchCategory(searchMenuData, stockList) {

            // ! data params used in populateSearchList() are code, name, industry and sector only
            let base_url = null;// jsu.getRootUrl() + "/";

            if (jsu.isMigContext()) {
                if (searchMenuData.id === "screener")
                    base_url = jsu.getRootUrl() + "/";
                else
                    base_url = jsu.getBaseUrl(); // https://www.aiostag.com

            } else {
                base_url = jsu.getBaseWwwUrl() + "/rt/";
            }


            let categoryButtons = [];
            let urlPrefix = "", urlSuffix = "";

            // * below code passes relevant data to populateSearchList()
            switch (searchMenuData.id) {

                // case "chart":


                // let subCat = processSubCategory(searchMenuData, stockList, base_url);

                // // urlPrefix = "Stock", urlSuffix = "InteractiveCharts";
                // // stockList = stockList.filter((item) => {
                // //     item.defaultUrl = base_url + urlPrefix + "/" + item.code + "/" + urlSuffix;
                // //     return item;
                // // });

                // return populateSearchList(searchMenuData, stockList, subCat.cb, base_url);
                case "screener":

                    stockList = stockList.filter((item) => {
                        item.defaultUrl = base_url + item.uri;
                        item.code = item.label; // * element.code should be present - it represents left part of the search box record 
                        return item;
                    });

                    return populateSearchList(searchMenuData, stockList, categoryButtons);


                case 'indCh':
                case 'addFilter':
                case 'eqCh':
                    return populateSearchList(searchMenuData, stockList, categoryButtons, base_url);
                case "chart":

                case 'compEqCh':


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
                                            if ((item[mappedParam] && typeof item[mappedParam] == "boolean") || item[mappedParam] == 'true') { // if mappedParam exists in element, then set url and add it to stockList
                                                item.defaultUrl = base_url + miIsh.gmc(item.ccId) + urlPrefix + "/" + item.code + "/" + urlSuffix;
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
                                    item.defaultUrl = base_url + miIsh.gmc(item.ccId) + urlPrefix + "/" + item.code + "/" + urlSuffix;
                                    return item;
                                });

                                return populateSearchList(searchMenuData, stockList, categoryButtons, base_url);
                            }
                        }
                    }
                    break;
            }
        }

        function populateSearchList(searchMenuData, stockList, buttons, base_url) {


            let list = document.getElementById(tsrSearchBoxId + "List");
            list.innerHTML = ''; // Clear previous results

            // list.onmousemove = function (e) {
            //     list.style.pointerEvents = "auto";
            // }

            // If list is empty - show "No Records Found" message
            if (stockList.length == 0) {
                let li = document.createElement('li');
                li.classList.add("empty");
                li.innerHTML = 'No records found';
                li.style.fontSize = '14px';
                li.style.borderBottom = '';
                list.appendChild(li);
            }

            stockList.forEach(item => {
                let li = document.createElement('li');
                li.style.pointerEvents = "none";

                li.setAttribute("tabindex", "0");
                li.addEventListener("keydown", navigateList);


                // * Solution to Jitter issue
                // * mousemove - only fires when cursor's hotspot is inside it.
                // * cursor's hotspot is the exact point(a single pixel) in the cursor that interacts with other elements on the screen.

                li.onmousemove = function (e) {
                    this.classList.add("hover");
                    if (this.nextSibling) {
                        this.nextSibling.style.pointerEvents = "none";
                    }
                    e.stopImmediatePropagation();
                }

                li.onmouseleave = function (e) {

                    li.classList.remove("hover");
                    if (this.nextSibling) {
                        this.nextSibling.style.pointerEvents = "auto";
                    }
                }

                if (searchMenuData.jsFnc) { // set onclick handler

                    if (buttons.length == 0) {
                        li = createOnClick(li, searchMenuData, item);
                    }
                    else {
                        li = createOnClickAndButtons(li, item, buttons, base_url, searchMenuData);

                    }


                }
                else { // add <a> link and buttons
                    li = createLinkAndButtons(li, item, buttons, base_url);
                }

                list.appendChild(li);

            });
        }


        function createLinkAndButtons(li, item, buttons, base_url) {
            let itemRow = document.createElement('div');
            itemRow.classList.add('d-flex', 'justify-content-between');
            itemRow.style.width = "100%";
            itemRow.style.overflowX = "hidden";

            // add <a> link and buttons
            li.addEventListener("keydown", navigateButtons);

            let a = document.createElement("a");
            a.href = item.defaultUrl; // defaultUrl - set in filterStocks()

            let itemLeft = document.createElement('div');
            itemLeft.classList.add('itemLeft', 'd-flex', 'flex-column', "justify-content-center");
            // itemLeft.style

            let itemRight = document.createElement('div');

            // setting width of left and right div 
            // if code exists left div has 25% width
            if ((paramDefined(item.code) && item.code != "")) { // If code exists 
                if (paramDefined(item.name) && item.name != "") { // if name also exists - give width to both itemLeft and itemRight
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
            top.innerHTML = item.code;
            itemLeft.appendChild(top);

            // aligning name to the left/start, if code doesn't exist
            itemRight.classList.add("d-none", "d-sm-flex", "itemRight", "justify-content-start");
            itemRight.style.width = ((document.getElementById(tsrSearchBoxId + "List").offsetWidth * 0.75) / 125) + "px";

            // hack
            // * stores max no. of buttons that can be shown on the screen at a time for each <li>
            let maxButtons = Math.round((document.getElementById(tsrSearchBoxId + "List").offsetWidth * 0.75) / 100);

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
                    if (!item[buttons[i].mappedParam] || item[buttons[i].mappedParam] == 'false') {
                        continue;
                    }
                }
                let button = document.createElement('button');
                button.classList.add('btn', 'btn-sm', 'me-2', "p-0");
                button.style.maxWidth = "125px";
                button.style.minHeight = "37.5px";
                button.style.whiteSpace = "nowrap";
                // modified
                if (paramDefined(buttons[i].jsFnc) && buttons[i].jsFnc) {
                    button.innerHTML = buttons[i].label;
                    button.onclick = function (e) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }

                    button.innerHTML = `
                            <span style="color: black; padding: 10px;">
                            ${buttons[i].label}
                            </span>`;
                }
                else {
                    button.innerHTML = `
                            <a href="${base_url + miIsh.gmc(item.ccId) + buttons[i].urlPrefix + "/" + item.code + "/" + buttons[i].id}" style="color: black; padding: 10px;">
                            ${buttons[i].label}
                            </a>`;
                }
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
            if ((paramDefined(item.code) && item.code != "")) {
                // itemRight.classList.add("justify-content-end");
                nameDiv.classList.add("name");
            }

            if (noOfBtns <= 0) { // remove name class so that it even shows on hover
                // itemRight.classList.add("justify-content-start");

                nameDiv.classList.remove("name");
                nameDiv.style.display = "block";

            }
            if (paramDefined(item.name) && item.name != "") {
                let name = document.createElement("span");
                name.innerHTML = item.name;

                let indSector = document.createElement("span");
                indSector.style.fontSize = "12px";
                if (paramDefined(item.industry) && paramDefined(item.sector)) {
                    indSector.innerHTML = item.industry + " | " + item.sector;
                }
                else if (paramDefined(item.industry)) {
                    indSector.innerHTML = item.industry;
                }
                else if (paramDefined(item.sector)) {
                    indSector.innerHTML = item.sector;
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

            return li;

        }

        function createOnClick(li, searchMenuData, element) {
            let itemRow = document.createElement('div');
            itemRow.classList.add('d-flex', 'justify-content-between');
            itemRow.style.width = "100%";
            itemRow.style.overflowX = "hidden";

            itemRow.innerHTML = element.label;

            miIsh.ajs(searchMenuData.id, element, li);
            li.appendChild(itemRow);

            return li;
        }

        function createOnClickAndButtons(li, element, buttons, base_url, searchMenuData) {
            let itemRow = document.createElement('div');
            itemRow.classList.add('d-flex', 'justify-content-between');
            itemRow.style.width = "100%";
            itemRow.style.overflowX = "hidden";

            li.addEventListener("keydown", navigateButtons);

            miIsh.ajs(searchMenuData.id, element, li);

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
            let maxButtons = Math.round((document.getElementById(tsrSearchBoxId + "List").offsetWidth * 0.75) / 100);

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
                // modified
                if (paramDefined(buttons[i].jsFnc) && buttons[i].jsFnc) {
                    button.innerHTML = buttons[i].label;

                    miIsh.ajs(searchMenuData.id, element, button, buttons[i].id);

                    // button.onclick = function (e) {

                    //     miIsh.ajs(searchMenuData.id, element, button,buttons[i].id );
                    //     e.stopImmediatePropagation();
                    //     e.preventDefault();
                    // }

                    button.innerHTML = `
                            <span style="color: black; padding: 10px;">
                            ${buttons[i].label}
                            </span>`;
                }
                else {
                    button.innerHTML = `
                            <a href="${base_url + miIsh.gmc() + buttons[i].urlPrefix + "/" + element.code + "/" + buttons[i].id}" style="color: black; padding: 10px;">
                            ${buttons[i].label}
                            </a>`;
                }
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

            // div.appendChild(itemRow);

            li.appendChild(itemRow);

            return li;
        }

        let navigateList = function navigateList(e) {

            // let list = document.getElementById(tsrSearchBoxId + "List");
            // list.style.pointerEvents = "none";

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
                    if (e.target.querySelector("a")) {
                        let a = e.target.querySelector("a");
                        window.open(a.href, "_self");
                    }
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
                document.body.style.overflowY = "auto";

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


    }) (); // module createFormElem      
