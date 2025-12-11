
var intChUi = (function () {

    var tsrStrengthIconId = "dropdownMenuButton1";

    var tsrStrengthDivId = "tsaRnkDiv";
    var tsrStrengthDivLabelId = "tsaRnkLabelDiv";
    var tsrSignalLabelDivId = "tsrSignalDiv";

    var chPanelWrapperId = "chartPanelWrapper";



    var htmlU = mintHtmlUtil;
    var jsu = mintJsUtil;

    let navMenuJsonUrl = "https://www.tsrbt1.com/test/Nikhil/InteractiveCharts/js/menu.json";

    var isLayoutLoaded = false;

    function init() {
        getIntChHeader();
        initSignalDiv();

        getChartPanel();

        if (!jsu.isMigContext()) {
            initSignalDiv();
        }


        // hack
        let searchInput = document.querySelector("#user_input");
        searchInput.onclick = null;
        searchInput.onclick = function () {
            miIs.ssb('eqCh');
        };
    }


    function getIntChHeader() {
        let html = "";

        html += getCss();

        html += `
                <nav class="navbar fixed-top navbar-light" style="padding: 0; background: white;">
                    <div class="container-fluid" style="justify-content: start;">`

        html += getNavMenu();

        html += `<div class="vr"></div>`

        html += getLogo();

        html += getSearchBox();

        html += getSignalHtml();

        html += `<div class="vr d-none d-md-inline-block"></div>`

        html += getUpdatesDiv();

        html += getUserProfile();

        html += `   </div>
                </nav>`;

        let dynHead = document.getElementById("dynHead");
        dynHead.classList.add("tsrIntChHeader");

        htmlU.addMsgToDiv('dynHead', true, html);


    }

    function getCss() {
        let html = "";

        html += `
        <style>
                .tsrIntChHeader {
                    height: 40px;
                    max-width: 100vw; 
                    border-bottom: 1px solid #8080805e;
                }

                .navbar{
                    z-index: 999; 
                }

                .navbar .container-fluid{
                    flex-wrap: none !important;
                    height: 40px;
                }

                .chartPanel {
                    /* border: 2px solid #DDD; */
                    border-radius: 0px !important;
                    padding: 0 !important;
                    margin-right: 10px !important;
                }

                .navbar-toggler{
                    border: none !important;
                }

                .navbar-toggler:focus{
                    box-shadow: none !important;
                }

                .tsrIntChLinks:hover{
                    text-decoration: underline;
                    text-underline-offset: 3px;
                }

                /*
                .tsrIntChHover{
                    height: 30px;
                    width: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                */

                .tsrIntChHover:hover {
                    /* outline: 1px solid gray; */
                    scale: 120%;
                }

                /* Below css is a hack for styling user-profile icon correctly */
                /* start  */
                #upsa {
                    display: flex;
                    align-items: center;    
                    margin-right: 0 !important;
                }

                #upsa svg {
                    margin: 0 !important;
                    font-size: 20px !important;
                }
                /* end  */


                /* old classes */
                .page-container {
                    padding-left: 0px !important;
                }

                .main-content {
                    padding: 0 !important;
                }

                .container-fluid {
                    padding: 0 !important;
                }

                .tsrIntChPanelMenu{
                    list-style: none !important; 
                    padding-left: 0 !important;
                }

                .tsrIntChPanelMenu>li{
                    width: 100%;
                }

                .tsrIntChPanelMenu>li>a{
                    position: relative;
                    display: block;
                    padding: 10px 0 10px 0;
                    font-weight: 500;
                    font-size: 15px;
                    white-space: nowrap;
                    color: #fff !important;
                    -webkit-transition: .3s;
                    -moz-transition: .3s;
                    -o-transition: .3s;
                    -ms-transition: .3s;
                    cursor: pointer;
                }
                
                .tsrIntChPanelMenu>li>a>.arrow{
                    position: absolute;
                    right: 10px;
                }

                .tsrIntChPanelMenu li a.dropdown-toggle:after { 
                    display: none; border-radius: 0px; 
                }

                .tsrIntChPanelMenu>li>ul{
                    position: relative;
                    padding: 0;
                    padding-left: 30px;
                    width: 100%;
                    border: 0;
                    box-shadow: none;
                    background-color: transparent;
                }

                .tsrIntChPanelMenu>li>ul>li>a{
                    color: #fff;
                }

                #user_input{
                    width:200px !important;                     
                    margin-bottom: auto !important; 
                    margin-top: auto !important;
                }


                /* Below css is a hack for showing updatesBox links correctly  */
                /* start  */
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
                    font-size: 14px !important;
                    white-space: nowrap;
                }

                .miUpdatesBox a:hover{
                    color: rgb(102 115 103);
                    text-decoration: underline;
                    font-size: 16px !important;

                }

                .miUpdatesBox>:nth-child(1){
                    display: none !important;
                }

                @media only screen and (min-width: 768px) {
                    .miUpdatesBox {
                        flex-grow: 1;
                    }

                    .miUpdatesBox>:nth-child(2){
                        display: flex !important;
                        justify-content : between;
                    }

                    .miUpdatesBox>:nth-child(2)>div{
                        font-size: 14px !important;
                    }
                }

                @media only screen and (max-width: 768px) {
                    .miUpdatesBox {
                        display: none !important;
                    }
                }


                /* end  */

        </style>
                `;

        return html;
    }

    function getNavMenu() {

        let url = "";

        let html = "";

        // TODO uncomment
        // var logo = jsu.getLogo(true, 'vertical-align:top;height:40px;');
        var logo = '';

        html += `
                        <button class="navbar-toggler tsrIntChHover" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                                aria-controls="offcanvasNavbar" aria-label="Toggle navigation" tab-index="0">
                                <span class="navbar-toggler-icon" style="height: 20px; width: 20px;"></span>
                        </button>

                        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel"
                                style="width: 275px;">
                                <div class="offcanvas-header">
                                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                                        ${logo}
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div class="offcanvas-body" style="background: linear-gradient(0deg,#09124f 0,#090979 30%,#006fbf 100%);">`
        html += `
                                    <ul class="tsrIntChPanelMenu">`



        html += `               <ul class="tsrIntChPanelMenu">`;


        // getData(navMenuJsonUrl).then(menuJson => {
        //     if (jsu.isNotNull(menuJson)) {
        let menuJson = navMenuLinks;

        let keys = Object.keys(menuJson);
        // let html = "";
        for (let i = 0; i < keys.length; i++) {
            html += `<li class='nav-item' style="margin-top: 6px;">`;
            if (menuJson[keys[i]]["dropdown"]) {
                html += `<a> `;
            } else {
                html += `<a href='${menuJson[keys[i]]["url"]}'> `;
            }
            html += `
                        <span class='icon-holder' id='${menuJson[keys[i]]["iconHolderId"]}Div' aria-hidden='true'> </span> 
                        <span class='title'>${menuJson[keys[i]]["label"]}</span>`
            if (menuJson[keys[i]]["dropdown"]) {
                html += `<span class="arrow"> <i class="fa fa-solid fa-chevron-right"></i> </span>`
            }
            html += `</a>`

            if (menuJson[keys[i]]["dropdown"]) {
                let subMenu = menuJson[keys[i]]["subMenu"];

                html += `<ul class="dropdown-menu"> `
                for (let j = 0; j < subMenu.length; j++) {
                    html += `   
                                <li>
                                    <a href='${subMenu[j].url}'>
                                        ${subMenu[j].label}
                                    </a>
                                </li> `;
                }
                html += `</ul> `;
            };
            html += `</li>`
        }

        // let navMenuUl = document.querySelector(".tsrIntChPanelMenu");
        // navMenuUl.innerHTML = html;
        //     }
        // });



        html += '                   </ul>';
        html += `               </div>
                        </div>`;

        return html;
    }

    function getLogo() {

        // TODO uncomment
        // var logo = jsu.getLogo(false, 'height: 30px; width: 30px;');
        var logo = '';
        let html = "";
        html += `
                    <div style="margin: 5px;">
                         <a href="${jsu.getRootUrl()}/Home">
                            ${logo}
                         </a>
                    </div>`;

        return html;
    }

    function getSearchBox() {
        let html = "";
        html += miIs.init(true, 'chEq');


        // html += `
        //     <input id="user_input" type="text" class="form-control " placeholder="Search (Ctrl + K)" onclick="miIs.ssb('eqCh')" 
        //     autocomplete="off" style="width:200px; margin:10px; margin-bottom: 5px; margin-top: 0px;">

        //     <div id="tsrSearchBoxWrapper"></div>
        // `


        return html;
    }

    function getUpdatesDiv() {


        let html = "";

        html += `<div class="miUpdatesBox text-center mx-3">
                    ${miIsh.wub()}
                </div>`

        return html;
    }

    function getSignalHtml() {
        let html = "";

        if (jsu.isMigContext()) {
            return html; // Currently not supported....
        }

        // hack
        html += `<svg style="height: 0; width: 0;"><defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" spreadMethod="pad"><stop offset="0%" stop-color="#ff0000" stop-opacity="1"></stop><stop offset="50%" stop-color="#e6e600" stop-opacity="1"></stop><stop offset="100%" stop-color="#009900" stop-opacity="1"></stop></linearGradient></defs></svg>`;

        html += `
        <div class="dropdown d-none d-sm-flex align-items-center" style="height: 40px;">
            <a class="mx-3 tsrIntChHover" id="${tsrStrengthIconId}" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                <span class="icon-holder" id="strSbDiv" aria-hidden="true"> <svg height="24" viewBox="0 0 288 288" xmlns="http://www.w3.org/2000/svg">		<g>		<path d="M22.9069 213.682L40.0547 203.795C40.0547 203.795 35.8931 195.84 34.6222 185.911C-1.02016 209.71 0.00315178 150.262 0.00315178 150.262L6.24374 160.158C6.5699 200.546 31.0645 180.71 34.3426 177.873C35.2683 164.356 43.9571 150.168 75.2226 147.882C75.2226 147.882 97.9209 145.615 119.197 123.785C119.197 123.785 181.245 47.3955 237.257 117.413C237.257 117.413 250.907 133.094 253.92 141.732C253.92 141.732 274.296 139.467 284.932 156.064C284.932 156.064 270.588 151.969 268.042 154.462C268.042 154.462 289.102 164.236 287.955 184.929C287.955 184.929 273.841 164.689 259.943 166.284C259.943 166.284 257.626 174.694 253.233 180.604V188.786C253.233 188.786 253.465 193.554 237.961 194.465C237.961 194.465 230.552 193.782 229.625 174.683C229.625 174.683 227.771 166.501 219.672 171.053C219.672 171.053 197.19 189.243 219.672 196.737C229.582 200.038 259.026 201.966 256.247 216.743L233.322 224.468C233.322 224.468 234.469 216.286 228.235 211.068C228.235 211.068 206.254 213.684 195.136 210.941C195.136 210.941 231.931 222.881 228.823 244.358H204.519C204.519 244.358 210.426 230.049 196.187 229.021C196.187 229.021 169.459 220.162 156.257 195.267C156.257 195.267 118.755 189.134 83.0053 230.724C83.0053 230.724 79.536 248.464 103.84 255.621C103.84 255.621 126.064 260.743 126.064 278.452H100.369C100.369 278.452 107.666 266.183 90.981 265.508C90.981 265.508 52.1063 261.75 55.912 250.498C55.912 250.498 54.8656 236.864 47.9132 236.864C47.9132 236.864 30.907 239.583 21.1847 274.365C21.1847 274.365 31.2611 279.818 31.2611 288H5.90071C5.90071 288 -5.90153 264.807 19.4482 225.941L22.9069 213.682Z"></path>		<path d="M180.819 2.68447C183.499 6.26516 183.499 12.0687 180.819 15.6493L115.617 102.751C112.937 106.331 108.592 106.331 105.912 102.751L76.4465 63.3903L29.8251 125.673C27.1004 129.191 22.756 129.09 20.12 125.447C17.5507 121.895 17.5507 116.262 20.12 112.708L71.5962 43.9435C74.2765 40.3645 78.6209 40.3645 81.3012 43.9435L110.767 83.3045L171.114 2.68447C173.794 -0.894456 178.138 -0.894456 180.819 2.68447Z"></path>		<path d="M136.678 7.3775C136.678 3.3029 139.261 0 142.447 0H177.06C180.246 0 182.829 3.3029 182.829 7.3775V51.6425C182.829 55.7171 180.246 59.02 177.06 59.02C173.874 59.02 171.291 55.7171 171.291 51.6425V14.755H142.447C139.261 14.755 136.678 11.4521 136.678 7.3775Z"></path>		</g>		</svg></span>
            </a>
            <div class="dropdown-menu  dropdown-menu-end dropdown-menu-md-start p-3 text-center">
                <div id="${tsrStrengthDivId}" class="mt-2">

                </div>
                <div id="${tsrStrengthDivLabelId}" class="mt-2">

                </div>
                <div id="${tsrSignalLabelDivId}" class="mt-2">

                </div>
            </div>
        </div>
        `;

        return html;
    }

    function getUserProfile() {
        let html = "";

        html += `<div style="position: fixed; right: 20px;">`;

        html += migUi.guh();

        html += `</div>`;

        return html;
    }

    function initSignalDiv() {
        let signalSvg = document.querySelector(`#${tsrStrengthIconId} svg`);
        signalSvg.style.fill = 'url("#gradient")';

        addEventListeners();
    }

    function addEventListeners() {
        const dropdownElement = document.getElementById(tsrStrengthIconId); // Or any other selector
        const dropdown = bootstrap.Dropdown.getOrCreateInstance(dropdownElement);

        $("#" + tsrStrengthIconId).hover(
            function () {
                createStrengthDiv();
                dropdown.show();
            },
            function () {
                dropdown.hide();
            }
        );

        $("#" + tsrStrengthIconId).click(
            function () {
                createStrengthDiv();
                dropdown.show();
            }
        );
    }

    async function getData(url) {

        const res = await fetch(url)

        const data = await res.json();

        return data;

    }

    function createStrengthDiv() {

        let param = { code: chartDetails.stocks[0].code, freq: chartDetails.freq };
        let divs = { divId: tsrStrengthDivId, strRank: tsrStrengthDivLabelId, strSig: tsrSignalLabelDivId };
        let styles = { width: 300, label: 'color:#832A0D;font-size:12pt; font-weight: bold;', signal: 'font-size: 16px; font-weight: bold;' };

        mintStkCommon.utsa(divs, param, styles);
    }


    // ---------------------------------------------------------------

    function getChartPanel() {

        let html = "";



        let chContainer = $('#' + chPanelWrapperId);
        chContainer.height(window.innerHeight - 50);

        if (window.innerWidth > 992) {
            if (!isLayoutLoaded) {
                chContainer.html("");
                /*
                html += `
                    <div id='chartPanel' class="chartPanel " >

                        <div id="chartFocus" style="margin:1px ; padding:1px; height:1px;width:1px" tabindex='1'></div>

                        <div id='NewChartSettingDiv' class ='ch_root_sel_indi miCtrl' ></div>
                        
                        <div id='chSettingsPopup' class ='ch_settings_popup miCtrl' ></div>
                        
                        <div id='chartLoading'></div>

                        <div id='chartFeedBack' style='text-align:center'></div>

                        <div id = 'panel' align='center'> 

                        </div>

                        <div id = 'selectedValues' align='center' style='padding:0px;margin:3px; font-size: 8pt;height:12px; white-space:nowrap '> </div>

                        <div id = 'settingsDiv' style='padding:0px;margin:0px;' > </div>

                        <div id='chartWrap'>

                        <div id = 'tsrchart' style="font-size:10px;width:100%"  > 

                        </div>

                        <!-- <div id = 'settings'> </div> -->

                        </div>


                        <div id="chart_dialog" class="cc_dialog miCtrl"> 


                        </div>

                        <div id='imgDiv'> </div>

                    </div>
                `;
                */

                html = "";

                let topBar = true;

                let layoutHtml = "";
                layoutHtml = `
                    <div id="${chPanelWrapperId + 'TopBar'}" style="border: 1px solid lightgray; border-bottom: none;">
                    </div>

                    <div id="${chPanelWrapperId + 'Row'}" class="h-100">

                    </div>

                     <div id="${chPanelWrapperId + 'BottomBar'}" style="border: 1px solid lightgray;">
                    </div>
                `
                chContainer.append(layoutHtml);
                if (topBar) {
                    createTopBar();
                }

                let leftBar = true;
                if (leftBar) {
                    createLeftBar();
                }

                const callback = reDraw;
                // const callback = myTsrChartInit.init;

                let chContainerRow = $("#" + chPanelWrapperId + 'Row');
                // element - parent div
                // elementName - for giving ID to children
                // layout - value is set to horizontal to create columns, else set to vertical to create rows 
                // noOfDivs - no. of children to be created
                splitLayout.cl(chContainerRow, chPanelWrapperId, "horizontal", 2, callback);

                const grandChild1 = chContainerRow.children(".column").first();
                splitLayout.cl(grandChild1, chPanelWrapperId + 'Row' + "Column1Child1", "vertical", 2, callback);

                const grandChild2 = chContainerRow.children(".column").last();
                splitLayout.cl(grandChild2, chPanelWrapperId + 'Row' + "Column2Child2", "vertical", 3, null);

                let chPanel = document.getElementById(chPanelWrapperId + 'Row' + "Column1Child1Row1");
                chPanel.innerHTML = html;

                createRightBar();

                createBottomBar();

                // hack - to keep bottom div collapsed
                let collapse_btn = document.getElementById(chPanelWrapperId + 'Row' + "Column1Child1RowCollapseBtn2");
                let ev = new Event("click");
                collapse_btn.dispatchEvent(ev);

                // reDraw();
                // return html;
                isLayoutLoaded = true;
            }
        }
        else {
            html += `
                    <div id='chartPanel' class="chartPanel " >

                        <div id="chartFocus" style="margin:1px ; padding:1px; height:1px;width:1px" tabindex='1'></div>

                        <div id='NewChartSettingDiv' class ='ch_root_sel_indi miCtrl' ></div>
                        
                        <div id='chSettingsPopup' class ='ch_settings_popup miCtrl' ></div>
                        
                        
                        <div id='chartControls' ></div>

                        <div id='chartLoading'></div>

                        <div id='chartFeedBack' style='text-align:center'></div>

                        <div id = 'panel' align='center'> 

                        </div>

                        <div id = 'selectedValues' align='center' style='padding:0px;margin:3px; font-size: 8pt;height:12px; white-space:nowrap '> </div>

                        <div id = 'settingsDiv' style='padding:0px;margin:0px;' > </div>

                        <div id='chartWrap'>

                        <div id = 'tsrchart' style="font-size:10px;width:100%"  > 

                        </div>

                        <!-- <div id = 'settings'> </div> -->

                        </div>


                        <div id="chart_dialog" class="cc_dialog miCtrl"> 


                        </div>

                        <div id='imgDiv'> </div>

                    </div>
                `;

            chContainer.html(html);

            reDraw();
            isLayoutLoaded = false;
        }
        //     isLayoutLoaded = true;
        // }
    }

    function createTopBar() {
        let html = "";
        // html = `<div id='chartControls' ></div>`;
        html += chPanelControlsHtml;
        let chContainer = $('#' + chPanelWrapperId + 'TopBar');
        chContainer.append(html);
    }

    function createLeftBar() {
        let chContainer = $('#' + chPanelWrapperId + 'Row');

        let leftBarHtml = `
            <div id="leftBar" style="width: 50px; border-right: 1px solid lightgray;">
            </div>
        `
        chContainer.append(leftBarHtml);
    }

    function createRightBar() {

        let chContainer = $('#' + chPanelWrapperId + 'Row');
        let rightBarHtml = `
            <div id="rightBar" style="width: 50px; border-left: 1px solid lightgray;">

            </div>
        `
        chContainer.append(rightBarHtml);
    }

    function createBottomBar() {
        let chContainer = $('#' + chPanelWrapperId + 'BottomBar');

        let bottomBarHtml = `
            <div id="bottomBar" style="height: 50px; border-left: 1px solid lightgray;">
                            ${chPanelControlVerticalHtml}
            </div>
        `;

        chContainer.append(bottomBarHtml);
    }

    return {
        init: init,
        // gich: getIntChHeader,
        // amh: addMousehover,
        // csd: createStrengthDiv,
        // ep: enablePopover,

    }
})();