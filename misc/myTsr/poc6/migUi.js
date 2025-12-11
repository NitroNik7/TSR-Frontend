// Flow:
/**
 * migUi.init() is called when HTML loads - i.e. page is loaded
 * 
 * 
 * * printHeader() - prints nav menu and top header of page, also initializes myTsrMenu icons in TSR context
 * if(page != interactiveCharts)
     then prints the top header for mobile (width < 576) or desktop (width > 576)
 * else
     then prints interactive chart header
 
 * * sideNavDropDownInit() - adds interactivity to nav menu using event listeners and onClicks for either mobile or desktop
 * if(page != interactiveCharts)
     then adds hover and click functionality for both mobile and desktop nav menu
 * else
     then add onclick functionality to interactive chart header nav menu for both mobile and desktop

 * both of the above () - printHeader(), sideNavDropDownInit() are called again if window is resized / device orientation is changed
 * 
 * * navMenuInit - this boolean variable indicates whether event listeners are already added to nav menu items or not
 * relevant to all pages except interactiveCharts page
 * when sideNavDropDownInit() is called for the first time by migUi.init() - event listeners are attached to nav menu(present in html)
 * then, we set navMenuInit = true
 * As nav menu html is already present in html, we do not need to reset navMenuInit's value to reattach event listeners when window is resized / device orientation is changed
 * 
 * 
*/

var migUi = (function () {  // my Ui Head

    var htmlU = mintHtmlUtil;
    var jsu = mintJsUtil;
    var cjs = mintStkCommon;

    var objName = 'migUi';

    var myMenuIcon = '';

    var navMenuInit = false;

    function init() {

        // setSideMenu();

        printHeader();
        sideNavDropDownInit();
        aioIcons.init();
        // initBreadCrumbs();
        htmlU.ibc();


        htmlU.aed(['chart_dialog', 'custDialog', 'dialog', 'alertDialog', 'chart_dialog'])
        // registerAutoSelect();
        // mintHtmlUtil.escapeDiv(event, )

        navMenuInit = true;
    }

    function printHeader() {

        var width = window.innerWidth;

        // TODO - uncomment below line
        var logo = ''
        // var logo = jsu.getLogo(true);

        /*
        if (jsu.isRtContext() || jsu.isMyContext()) {
            logo = '<img src="' + jsu.getStaticUrl() + '/v21/img/tsr/TsrLogo.png" alt="TSR - TopStockresearch"  name="TSR - TopStockresearch" height="45px;" style="vertical-align:top">';
        } else {
            logo = '<img src="' + jsu.getStaticUrl() + '/img/StockAioLogo.png" alt="Stock AIO"  name="Stock All In One" height="45px;" style="vertical-align:top">';
        }
        */

        var html = '';
        var search = ''

        var myTopDiv = jsu.isMigContext() ? 'myAioTopDiv' : 'myTsrSbTopDiv';

        myMenuIcon = '<a> <span class="icon-holder" style="align-items: center;" id="' + myTopDiv + '" aria-hidden="true"> </a>';

        let href = window.location.href;

        if (href.indexOf('/StockTechnicalCharts') > 0 || href.indexOf('/InteractiveCharts') > 0) {

            intChUi.init();
            // html = intChUi.gich;
            // let dynHead = document.getElementById("dynHead");
            // dynHead.classList.add("tsrIntChHeader");

            // htmlU.addMsgToDiv('dynHead', true, html);
            aioIcons.init();


            // intChUi.amh();
            // intChUi.csd();

            // let searchInput = document.querySelector("#user_input");
            // searchInput.onclick = null;
            // searchInput.onclick = miIs.ssb('eqCh');

        }
        else {
            if (width < 576) {

                html += ' <div style="display: inline;float:left"> <a onclick="' + objName + '.lsmt();">'
                    + '<i class="fas fa-bars fa-3x" style="color:#6c757d; margin-left:10px"></i> </a> <span class="ms-4"><b>'

                if (width < 350) {
                    // html+=	'MyTSR'
                } else {
                    html += logo;

                }

                html += '		</b></span>'
                    + '</div>'
                html += '<div style="margin-top:5px;" align="right"  class="d-flex align-items-center justify-content-end h-100">'
                html += getAioText(width);
                // html+= myMenuIcon
                html += "</div>";



                // search =  miSrch. gs();
                search = miIs.init(true);

            } else {
                html += '   <div style="display: inline">'
                    + '  <div class="row">'
                // +'     <div class="col-sm-1 col-md1 col-lg-1 ">'
                //        + getSideToggle()
                // +'     </div>'


                html += '<div class="col-sm-8 col-md-9 col-lg-9 ">'
                    // +  miSrch. gs(showSubcat)
                    + miIs.init()
                    + '</div>'
                    + '<div class="col-sm-4 col-md-3 col-lg-3 ">'

                // var showSubcat = false; 

                // if(width> 1180){
                // 	showSubcat = true;
                // }	    


                // if(width < 1280){
                // 	html+= '<div class="col-sm-8 col-md-8 col-lg-8 ">'
                // 		// +  miSrch. gs(showSubcat)
                // 		+ miIs.init()
                // 	 	+'</div>'
                // 		+'<div class="col-sm-3 col-md-3 col-lg-3 ">'
                // }else{
                // 	html+= '<div class="col-sm-8 col-md-8 col-lg-8 ">'
                // 		// +  miSrch. gs(showSubcat)
                // 		+ miIs.init()

                // 	 	+'</div>'
                // 		+'<div class="col-sm-3 col-md-3 col-lg-3 ">'
                // }

                // html+= '<div  style="margin-top:15px;" align="center">'
                // html+= "Stock All In One (AIO)" 
                // 		+"<br/> (Beta Version)"

                // /*
                // html+= getAutoRefresh();   				
                // html+= SP_3;

                // html+= getFav();   				
                // html+= SP_3;

                // html+= getUserHead();
                // html+= SP_3;

                // // html+= getHelp();

                // */
                // html+='</div>'	// align right div
                html += '<div style="text-align:right; width: max-content;" class="d-flex align-items-center h-100 float-end">';

                html += getAioText(width);


                // + contract + ' '
                html += '</div>'	// col
                html += '</div>'	// col


                // html+='     <div class="col-sm-1 col-md1 col-lg-1 "><div style="text-align:right; margin:10px;">'
                // 		// + contract + ' '
                // 	   + myMenuIcon +" " 
                // 	    +'  </div>   </div>'

                html += '</div>'	// ROW

                html += '</div>'	// Final
                html += `
                    <style>


                        .myTsrLinksBtn:hover {
                            background-color: white;
                            font-weight: bold;
                            cursor: pointer;
                            font-size: 14px;
                            color: black;
                        }



                        .myTsrLinksBtn:hover svg {
                            fill: silver;
                        }


                        .myTsrLinksBtn svg {
                            margin: 0 3px 0px 3px;
                        }

                        
                    </style>
                
                `
            }

            htmlU.addMsgToDiv('dynHead', true, html);
            htmlU.addMsgToDiv('dynSearch', true, search);
        }

        if (!jsu.isMigContext()) {
            // <div class="modal fade" id="tsrUserRegModal" tabindex="-1">
            //     <div class="modal-dialog modal-dialog-centered">
            //         <div class="modal-content" id="tsrUserRegModalContent">

            //         </div>
            //     </div>
            // </div>
        }
        // htmlU.addMsgToDiv('myMenuIcon' , true, myMenuIcon);

        htmlU.divShow('navLogoDiv');
        if (width < 576) {
            htmlU.divHide('navLogoDiv');
        }


        // if (jsu.isMigContext()) {

        // }else{
        aioIcons.iti();
        // }

        miSrch.ras();

        // html+= '<div id="tsrSearchBoxWrapper"></div>'
        // '<div id="tsrSearchBoxWrapper"></div>'
    }


    function getAioText(width) {

        var html = '';
        // myMenuIcon = '<a > <span class="icon-holder" style="align-items: center;" id="' + myTopDiv + '" aria-hidden="true"> </a>';

        // if(!jsu.isMigContext()){
        html += flag();
        html += getUserHead();
        html += `<div class="myTsrLinksBtn" style="text-align: center;" onclick="${objName}.help();">`
        html += myMenuIcon + " "
        html += '   <span style="text-align:center; border-radius: 5px;">'
            + '     </span>';
        html += `   <hr style="margin: 3px;">`
        html += '   <b style="color: gray; font-size: 12px; text-align: center;">My TSR<b>';
        html += `</div>`

        // }else{

        // 	html+=  getUserHead()   ;//if(jsu.isRtContext()) ? getTsrUserHead() :  getMigUserHead();
        // }

        /*

        html+= SP_3;
    	
        // html+= getHelp();

        */
        // html+='</div>'	// align right div
        return html;
    }


    var totalFlag = [{ flag: 'UKFlag', context: '/UK/ai', label: 'UK Stock Analysis' },
    { flag: 'USFlag', context: '/US/ai', label: 'US Stock Analysis' },
    { flag: 'CAFlag', context: '/CA/ai', label: 'Canada Stock Analysis' },
    { flag: 'AUFlag', context: '/AU/ai', label: 'Australia Stock Analysis' },

    ];

    function flag() {


        if (!jsu.isMigContext()) {
            return ''
        }

        var defFlag = 'USFlag';

        if (jsu.isUsContext()) {
            defFlag = 'USFlag';
        } else if (jsu.isUkContext()) {
            defFlag = 'UKFlag';
        } else if (jsu.isCaContext()) {
            defFlag = 'CAFlag';
        } else if (jsu.isAuContext()) {
            defFlag = 'AUFlag';
        }

        var baseImg = jsu.getStaticUrl() + "/img/flags/"

        var html = ''   // upsa user profile show anchor a hack to make it work with Interactive charts
        html += '			<li   class="user-profile dropdown dropdown-animated scale-left">'
        html += '						   <a href=""  id="upsa1" class="dropdown-toggle" data-bs-toggle="dropdown" style="margin-right:10px">'
        // html +='						   <i class="fas fa-user fa-2x "></i>'
        // html += '<span  class="fa fa-battery-full " style="margin-top:10px;font-size:30px;"></span>'
        html += '<img src="' + baseImg + defFlag + '.png"   style="max-height:25px;">'

        html += '						   </a>'
        html += '						   <ul id="upsul1" class="dropdown-menu dropdown-md p-v-0">'

        for (var i = 0; i < totalFlag.length; i++) {

            var def = totalFlag[i];

            if (def.flag == defFlag) {
                continue;
            }
            html += '						      <li>'
            // html +='						         <div style="margin: 20px"> <b>Hello, Guest </b><br> </div>'

            var path = window.location.pathname

            var url = jsu.getBaseWwwUrl() + def.context + '/Home'

            if (path.includes('ai/Home') || path.includes('ai/Stock/')) {
                // do Nothing ...
            } else {
                var servlet = path.substring(path.indexOf('/ai/') + 3);
                url = jsu.getBaseWwwUrl() + def.context + servlet;
            }

            html += '<a href="' + url + '"> '
                + '<img src="' + baseImg + def.flag + '.png" style="max-height:25px;">  ' + SP_2 + htmlU.getSpan(def.label, '#232751', 13) + '</a>'

            html += '						      </li>'

        }


        // html+= getPlan();


        // if(userProf.status ==='signedIn'){
        // 	html+=getLogOff();
        // }

        html += '						   </ul>'
        html += '						</li> '
        return html;

    }



    function getUserHead() {


        var html = ''




        // upsa user profile show anchor a hack to make it work with Interactive charts
        html += '			<li onClick="migUi.addShow();" class="user-profile dropdown dropdown-animated scale-left">'
        html += '						   <a href="" id="upsa" class="dropdown-toggle" data-bs-toggle="dropdown" style="margin-right:10px">'
        // html +='						   <i class="fas fa-user fa-2x "></i>'
        html += '<span class="fas fa-user fa" style="font-size:25px;"></span>'

        html += '						   </a>'
        // To change width set syle in ul 
        html += '						   <ul id="upsul" class="dropdown-menu dropdown-md p-v-0">'


        if (userProf.status === 'signedIn') {

            html += getSignedIn();
            html += getRefCode();

        } else {
            html += getLoginIn();
        }


        html += getPlan();


        if (userProf.status === 'signedIn') {
            html += getLogOff();
        }

        html += '						   </ul>'
        html += '						</li> '





        return html;

    }

    function getSignedIn() {

        var heelo = (jsu.isRtContext() || jsu.isMyContext()) ? 'Namaste/Hello' : 'Hello';

        var html = '';

        html += '						      <li>'
        html += '						         <div style="margin: 20px"> <b>' + heelo + ',<br> ' + userProf.sal + ' ' + userProf.fName + '</b><br>                                    </div>'
        html += '						      </li>'
        html += '						      <li role="separator" class="divider"></li>'

        html += '						      <li>'
        html += '						         <a href="' + jsu.getUsrProf() + '">'
        html += '						         <i class="far fa-handshake"></i>'
        html += '						         <span>View Profile</span>'
        html += '						         </a>'
        html += '						      </li>'

        return html;
    }

    function getLoginIn() {
        var html = ''
        html += '						      <li>'
        html += '						         <div style="margin: 20px"> <b>Hello, Guest </b><br>                                    </div>'
        html += '						      </li>'
        html += '						      <li role="separator" class="divider"></li>'
        html += '						      <li>'

        if (jsu.isMigContext()) {
            html += '						         <a href="' + jsu.getLoginUrl() + '">'
        } else {
            html += '						         <a data-bs-toggle="modal" data-bs-target="#tsrUserRegModal" onclick="migUi.urm()">'
        }

        html += '						         <i class="fa fa-edit"></i>'
        html += '						         <span>Login / Register</span>'
        html += '						         </a>'


        html += '						      </li>'
        return html;
    }

    function getLogOff() {
        var html = ''
        html += '						      <li role="separator" class="divider"></li>'
        html += '						      <li> <a href="' + jsu.getLoginOff() + '">'
        html += '						         <i class="fas fa-sign-out-alt"></i>'
        html += '						         <span>Logout</span>'
        html += '						         </a>'
        html += '						      </li>'
        return html;
    }

    function getPlan() {

        var plan = ''

        if (jsu.isRtContext() || jsu.isMyContext()) {
            var planLink = jsu.getMyTsrUrl() + '/TsrPlans/';
            var linkLabel = ''


            if (jsu.isNull(userProf.sub)) {
                plan = "You are yet to Subscribe to Premium Plan <br/>";
                linkLabel = "View Plans";
            } else if (userProf.sub === 'EXPIRED') {
                plan = "You Premium Plan has <b>Expired</b> <br/>";
                linkLabel = "Click to Buy Plan";
            } else if (userProf.sub === 'TRIAL') {
                plan = "Your trial Plan is expiring on " + userProf.expDt + " <br/>";
                linkLabel = "Click to Buy Plan";
            } else {
                plan = " Plan Details : <br/> Plan : <b>" + userProf.sub + "</b>"
                    + "<br/> Valid till " + userProf.expDt + " <br/> ";
                linkLabel = "View Plan";
            }

            plan += '<a href="' + jsu.getMyTsrUrl() + '/TsrPlans"  title="View Subscription Plans" >' + linkLabel + '</a>'

        } else {
            if (jsu.isNull(userProf.sub)) {
                plan = 'Premium Plan - Not Yet Enabled'
            } else {
                plan = " Plan Details : <br/> Plan : <b>" + userProf.sub + "</b>"
                // + "<br/> Valid till "+ userProf.expDt +" <br/> " ;
                linkLabel = "View Plan";

            }
        }

        var html = '';
        html += '						      <li role="separator" class="divider"></li>'
        html += '						      <li>'
        html += '						         <div style="margin: 20px"> '
        html += '						           ' + plan
        html += '						         </div>'
        html += '						      </li>';

        return html;

    }

    function getRefCode() {
        var html = '';

        if (jsu.isNotNull(userProf.refCode)) {
            html += '						      <li role="separator" class="divider"></li>'
            html += '						      <li>'
            html += '						         <div style="margin: 20px"> Referal Code : <b>' + userProf.refCode + '</b><br>                                    </div>'
            html += '						      </li>'
            html += '						      <li role="separator" class="divider"></li>'

            html += '						      <li>'
            html += '						         <a href="' + jsu.getMyTsrUrl() + '/MyTsr/#/CustomReport">'
            html += '						         <i class="far fa-handshake"></i>'
            html += '						         <span>View My Referrals</span>'
            html += '						         </a>'
            html += '						      </li>'
        }

        return html;
    }

    function getHelp() {

        return '<a onclick="' + objName + '.help();">'
            + '<i class="fas fa-angle-double-left fa-3x " style="color:#6c757d;margin-right:10px"></i>'
            + '</a>'

    }

    function getFav() {
        return '<a href="#Favorites" title="Favorites"><span style="color:#DC143C;" class="fa fa-heart fa-2x"></span></a>'
    }

    function getAutoRefresh() {

        var html = '<span style="color:dimgray;" class="fa fa-bullhorn fa-2x" title="Refresh/Alert Sound"></span> ';
        html += '<input type="checkbox" class="tsrToggle tsrToggle-checkbox" tabindex="0"  id="enableSound" '

        if (localStorage.getItem('TsrSound') == null || localStorage.getItem('TsrSound') === 'yes') {
            html += 'checked';
        }

        html += ' onChange="myc.schk()" >';

        // + '        <input type="checkbox" class="tsrToggle tsrToggle-checkbox" tabindex="0" checked="" id="enableSound">  '

        html += '        <label class="tsrToggle tsrToggle-label" for="enableSound" title="Alert Sound During Market Hours">'
            + ' <span class="tsrToggle tsrToggle-inner"></span><span class="tsrToggle tsrToggle-switch"></span></label>'

        return html;

    }

    var expand = "<i class='fas fa-angle-double-right' style='color:#6c757d'></i> <span style='color:white;font-size:1px;'>Expand</span>";
    var contract = "<i class='fas fa-angle-double-left' style='color:#6c757d'></i> <span style='color:white;font-size:1px;'>contract</span>";

    // function getSideToggle(){


    // 	return '<a onclick="'+objName+'.lslt()" class="tsrsn-expand-toggler">'
    //       	+ '<div id="sideNavToogleIconDiv" class="fa-3x"> '+expand+' </div>'
    //     	+	'</a>'
    // }

    // below function adds event listeners to nav menu items for expected behaviour
    function sideNavDropDownInit() {

        let href = window.location.href;

        if (!(href.indexOf('/StockTechnicalCharts') > 0 || href.indexOf('/InteractiveCharts') > 0)) { // Current page is not interactive charts...
            let navMenuCntr = document.querySelector(".tsrNavMenuCntr");

            let navCntrRect = navMenuCntr.getBoundingClientRect();
            navMenuCntr.style.height = (window.innerHeight - navCntrRect.top) + "px";

            let navList = document.querySelector(".tsrNavMenuList");

            // * if else for down arrow btn (scroll btn) working
            if (window.innerWidth > 576) {
                navList.style.height = (window.innerHeight - navCntrRect.top - 60) + "px"; // this gives 60px height to btn

                let btn = document.querySelector("#tsrNavMenuScrollBtn");

                let isProgramaticScroll = false;

                btn.addEventListener("click", function () {
                    let visibleHeight = navList.clientHeight;
                    let actualHeight = navList.scrollHeight;

                    let scrolledHeightFromTop = Math.round(navList.scrollTop);
                    let scrollHeight = Math.round(actualHeight - visibleHeight);

                    if (scrollHeight > scrolledHeightFromTop) {
                        navList.scrollBy(0, actualHeight);
                        btn.innerHTML = `<i class="fas fa-caret-up"></i>`;
                    } else {
                        navList.scrollBy(0, -scrollHeight);
                        btn.innerHTML = `<i class="fas fa-caret-down"></i>`;
                    }

                    isProgramaticScroll = true;
                });

                navList.addEventListener('scroll', function (e) {
                    if (!isProgramaticScroll) {
                        let visibleHeight = navList.clientHeight;
                        let actualHeight = navList.scrollHeight;

                        let scrolledHeightFromTop = Math.round(navList.scrollTop);
                        let scrollHeight = Math.round(actualHeight - visibleHeight);

                        if (scrollHeight > scrolledHeightFromTop) {
                            btn.innerHTML = `<i class="fas fa-caret-down"></i>`;

                        } else {
                            btn.innerHTML = `<i class="fas fa-caret-up"></i>`;

                        }
                    }
                });

                navList.addEventListener('scrollend', function (e) {
                    isProgramaticScroll = false;
                });

            } else {
                navList.style.height = (window.innerHeight - navCntrRect.top) + "px";
            }

            // * below code handles hover and clicks on nav menu items
            if (!navMenuInit) { // * to prevent event listeners from being attached multiple times
                let menuItems = document.querySelectorAll(".tsrNavMenuList>li"); // all menu items on left side nav bar
                for (let i = 0; i < menuItems.length; i++) {
                    let menuItem = menuItems[i];

                    let subMenu = menuItem.querySelector("ul"); // sub menu list for a menu item

                    if (subMenu != null) {
                        menuItem.addEventListener("mouseenter", function (e) {
                            if (window.innerWidth > 576) {
                                showSubMenuList(e, navMenuCntr, subMenu, menuItem, i);
                            }
                        });

                        // for making nav menu operable with both mouse(for windows below 576px width) & touch enabled devices
                        menuItem.addEventListener("pointerdown", function (e) {
                            if (subMenu.style.display == "none" || subMenu.style.display == "") {
                                if (e.pointerType == "mouse") {
                                    showSubMenuList(e, navMenuCntr, subMenu, menuItem, i);
                                } else {
                                    showMenuListMob(subMenu, menuItems, menuItem, i);
                                }
                            } else {
                                if (window.innerWidth < 576) {
                                    hideSubMenuList(e, navMenuCntr, subMenu, menuItem);
                                }
                            }
                        });

                        menuItem.addEventListener("mouseleave", function (e) {
                            if (window.innerWidth > 576) {
                                hideSubMenuList(e, navMenuCntr, subMenu, menuItem);
                            }
                        });
                    }
                }


                document.body.addEventListener("pointerdown", function (e) {

                    let isOutsideClick = true;
                    for (let i = 0; i < menuItems.length; i++) {
                        let item = menuItems[i]; // menu item on left side nav bar
                        let subMenuList = item.querySelector("ul"); // sub menu list for above item

                        // * if target is not the navItem, subMenuList or scrollBtn
                        if ((e.target == item || item.contains(e.target)) ||
                            subMenuList != null && (e.target == subMenuList || subMenuList.contains(e.target)) &&
                            (e.target == btn || btn.contains(e.target))) {

                            isOutsideClick = false;
                            break;
                        }
                    }

                    if (isOutsideClick) {
                        hideAllSubMenuLists(menuItems, -1);
                    }
                });


                function showSubMenuList(e, navMenuCntr, subMenu, menuItem, i) {

                    navMenuCntr.style.zIndex = "1001"; // ! discuss later
                    subMenu.style.display = "block";

                    // this forces browser reflow - browser calculates position and geometry of certain parts of a webpage again
                    void subMenu.offsetHeight; // required for opacity transition

                    subMenu.style.opacity = "1";
                    subMenu.style.height = "auto";

                    if (window.innerWidth > 576) {
                        alignMenu(menuItem, subMenu);
                    } else {
                        // ---------- height animation ------------------
                        let height = subMenu.getBoundingClientRect().height;
                        subMenu.style.height = "0";
                        void subMenu.offsetHeight; // browser reflow
                        subMenu.style.height = height + "px";

                        // for hiding all open sub menu's except selected one
                        hideAllSubMenuLists(menuItems, i);
                    }
                };

                function showMenuListMob(subMenu, menuItems, menuItem, i) {

                    // this condition is required for following cases:
                    // 1. for desktop/laptop with browser window width < 576
                    // 2. for touch devices i.e. tablets, mobiles etc.
                    if (isTouchEnabled() || window.innerWidth < 576) {

                        subMenu.style.display = "block";
                        subMenu.style.opacity = "1";
                        subMenu.style.height = "auto";

                        if (isTouchEnabled() && window.innerWidth > 576) {
                            alignMenu(menuItem, subMenu);
                        }

                        // ---------- height animation ------------------
                        if (window.innerWidth < 576) {
                            let height = subMenu.getBoundingClientRect().height;
                            subMenu.style.height = "0";
                            void subMenu.offsetHeight; // browser reflow
                            subMenu.style.height = height + "px";
                        }

                        // for preventing accidental clicks on mobile view
                        if (window.innerWidth < 576) {

                            subMenu.style.pointerEvents = "none";
                            setTimeout(function () {
                                subMenu.style.pointerEvents = "auto";
                            }, 300);

                            // for hiding all open sub menu's except selected one
                            setTimeout(function () {
                                hideAllSubMenuLists(menuItems, i);
                            }, 300);
                        } else {
                            hideAllSubMenuLists(menuItems, i);
                        }

                        let arrowEle = menuItem.querySelector(".arrow");
                        arrowEle.style.transform = "rotate(90deg)";
                    }
                }


                function hideSubMenuList(e, navMenuCntr, subMenu, menuItem) {
                    if (e.type == "pointerdown") {
                        // check if click target is outside subMenu 
                        if (!(subMenu == e.target || subMenu.contains(e.target))) {

                            subMenu.style.opacity = "0";
                            navMenuCntr.style.zIndex = "1000";
                            subMenu.style.height = "0";
                            setTimeout(function () {
                                subMenu.style.display = "none";
                                // timeout value should match with transition duration on .tsrNavSubMenuList in CSS
                            }, 300);

                            let arrowEle = menuItem.querySelector(".arrow");
                            if (arrowEle != null) {
                                arrowEle.style.transform = "rotate(0deg)";
                            }
                        }
                    } else {
                        subMenu.style.display = "none";
                        subMenu.style.opacity = "0";
                        subMenu.style.height = "0";

                        navMenuCntr.style.zIndex = "1000";
                    }
                }

                function hideAllSubMenuLists(menuItems, selectedItemIdx) {
                    for (let i = 0; i < menuItems.length; i++) {
                        if (selectedItemIdx != i) {
                            let menuItem = menuItems[i]; // menu item on left side nav bar
                            let subMenu = menuItem.querySelector("ul"); // sub menu list for above item

                            if (subMenu != null) {
                                subMenu.style.opacity = "0";
                                subMenu.style.height = "0";
                                setTimeout(function () {
                                    subMenu.style.display = "none";
                                    // timeout value should match with transition duration on .tsrNavSubMenuList in CSS
                                }, 300);

                                let arrowEle = menuItem.querySelector(".arrow");
                                if (arrowEle != null) {

                                    arrowEle.style.transform = "rotate(0deg)";
                                }
                            }
                        }
                    }
                }

                function alignMenu(menuItem, subMenu) {
                    let menuItemRect = menuItem.getBoundingClientRect();
                    let subMenuRect = subMenu.getBoundingClientRect();

                    // * if sub menu overflows at window bottom, then display it upwards from menu item bottom
                    if (menuItemRect.top + subMenuRect.height > window.innerHeight) {
                        subMenu.style.bottom = window.innerHeight - menuItemRect.bottom;
                        subMenu.style.top = "auto";

                        subMenuRect = subMenu.getBoundingClientRect();
                        // * if subMenu height overflows at window top
                        if (subMenuRect.height > menuItemRect.bottom) {
                            // subMenu.style.top = menuItemRect.top - (subMenuRect.height - menuItemRect.bottom);
                            subMenu.style.top = menuItemRect.top;
                            subMenu.style.bottom = "auto";

                            subMenuRect = subMenu.getBoundingClientRect();
                            // subMenu can have max 70% height of window, to avoid clipping
                            subMenu.style.maxHeight = (window.innerHeight - subMenuRect.top - 20) + "px";
                            // console.log(window.innerHeight, subMenu.style.top)
                        }
                    } else {
                        subMenu.style.top = menuItemRect.top;
                        subMenu.style.bottom = "auto";
                    }
                }
            }
        }
        else { // Is interactive charts...
            $('.tsrIntChPanelMenu li a').on('click', function (e) {
                if ($(this).parent().hasClass("open")) {
                    $(this).parent().children('.dropdown-menu').slideUp(200, function () {
                        $(this).parent().removeClass("open");
                    });
                } else {
                    $(this).parent().parent().children('li.open').children('.dropdown-menu').slideUp(200);
                    $(this).parent().parent().children('li.open').children('a').removeClass('open');
                    $(this).parent().parent().children('li.open').removeClass("open");
                    $(this).parent().children('.dropdown-menu').slideDown(200, function () {
                        $(this).parent().addClass("open");
                    });
                }
            });
        }

        var html = createQuickLinks();
        if (jsu.isRtContext()) {
            html += getUsOffer();
        }

        htmlU.addMsgToDiv('myTsrLinks', true, html);
        $("#myTsrLinks").css('margin', '10px');

        // ! test later
        // if(!jsu.isMigContext()){
        // aioIcons.iti(); 
        // }
    }


    function isTouchEnabled() { // detects whether device is a touch screen
        return ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0);
    }

    var links = [
        { id: 'MyTSR', aioid: null, label: 'My TSR Classic', svg: 'myTsrSb', desc: 'Prefer Old UI,  Click here to Continue' },
        { id: 'TsrFavorites', aioid: 'AioFavorites', label: 'My Favorites', svg: 'favSb', desc: 'Arrange Watclist , Screener, Equity Favorites' },

        { id: 'TradersEyeView', aioid: null, label: 'Traders Eye', svg: 'tevSb' },
        { id: 'TsrAlerts', aioid: null, label: 'TSR Alerts', svg: 'alertSb', desc: 'Manage and View Alerts ' },

        { id: 'TsrWatchlist', aioid: 'AioWatchlist', label: 'My Watchlist', svg: 'wlSb', desc: 'View Key Parameter of your favorite Stocks ' },
        { id: 'TsrPortfolio', aioid: 'AioPortfolio', label: 'My Portfolio', svg: 'pfSb', desc: 'Mock Trade Integrated With Screeners' },

        { id: 'TsrSettings', aioid: 'null', label: 'TSR Settings', svg: 'setSb', desc: 'TSR Settings' },

        // {id: ''  , label : '' , svg},
        // {id: ''  , label : '' , svg},
    ];

    function createQuickLinks() {
        var html = '<br/><br/>';

        html += '	<div class="card shadow-lg">'
        html += '     <div class="card-header">'
        html += '        <h5 class="card-title">Quick Links</h5>'
        html += '     </div>'
        html += '     <div class="card-body">'
        html += '        <div class="table-responsive">'
        html += '           <table class="table  ">'  // table-hover
        html += '              <tbody>'


        for (var i = 0; i < links.length; i++) {
            var link = links[i];


            var url = '';

            if (jsu.isMigContext()) {

                if (link.aioid == null) {
                    continue
                }

                url = jsu.getRootUrl() + '/' + link.aioid;
            } else if (jsu.isRtContext() || jsu.isMyContext()) {
                url = jsu.getBaseWwwUrl() + '/rt/' + link.id;
            }



            // if(jsu.isMigContext() && link.id == 'TsrAlerts'){
            // 	continue;
            // }
            // var url = jsu.getRootUrl()+'/'+link.id ;

            // if(jsu.isMyContext()){
            // 		url = jsu.getBaseWwwUrl()+'/rt/'+link.id ;
            // }


            if (link.id == 'MyTSR') {
                // if(jsu.isMigContext()){
                // 	continue;
                // }
                url = jsu.getMyTsrSpUrl() + 'Home'
            }


            html += '                 <tr>'
            html += '                    <td>' + htmlU.createEmptyDiv(link.svg + 'Div', true) + '</td>'
            html += '                    <td> <b>' + link.label + '</b> <br/> ';

            if (link.id == 'TradersEyeView') {

                // if(mtgv.mtpp.tew){
                // 		html+= gettevLinks();	
                // }else{
                // 		html+= 'To Access <b>Traders Eye View</b> Please upgrade';
                // }
                html += gettevLinks();

            } else if (link.id == 'TsrSettings') {
                html += getSettingsLinks();

            } else {
                html += '<a href="' + url + '" > ' + htmlU.getSpan(link.desc, null, 12);
                html += '</a>'
            }


            html += ' </td>'
            html += '                 </tr>'
        }


        html += '                '
        html += '              </tbody>'
        html += '           </table>'
        html += '        </div>'
        html += '     </div>'
        html += '</div>'

        return html;
    }


    var tev_links = [
        { id: 'MoversAndShakers', label: 'Movers & Shakers' },
        { id: 'BuzzingStocks', label: 'Buzzing Stocks' },
        { id: 'StrategySnapshot', label: 'Strategy Snapshot ' },
        { id: 'TechnicalView', label: 'Technical View' },
        { id: 'PatternView', label: 'Pattern View' },

    ]

    function gettevLinks() {

        var html = '';
        html += ' <div class="list-group">'
        for (var i = 0; i < tev_links.length; i++) {
            var link = tev_links[i];
            var url = jsu.getRootUrl() + '/' + link.id;

            if (jsu.isMyContext()) {
                url = jsu.getBaseWwwUrl() + '/rt/' + link.id;
            }

            html += '<a href="' + url + '" class="list-group-item list-group-item-action" style="color:#04a1f4">' + link.label + '</a>	'
        }




        html += '</div> ';

        return html;
    }

    function getSettingsLinks() {

        var html = '';
        html += ' <div class="list-group">'

        html += '<a onClick="misu.sfg()" class="list-group-item list-group-item-action" style="color:#04a1f4">'
            + 'Alert Sound Config</a>	'


        html += '</div> ';

        return html;
    }

    function help() {

        var width = window.innerWidth;

        var divWidth = $("#helpNav").width();

        // $("#dialog").width( innerWidth - ( (100-ui.value ) /100 * innerWidth) );

        if (divWidth > width) {
            $("#helpNav").width(width - 10);

        } else if (width > 800) {
            $("#helpNav").width(800 - 10);
        }

        htmlU.divShow('helpNav');

        if ($('.tsrqv-backdrop').length) {
            $('.tsrqv-backdrop').remove();
        }
        if (!$('.app').hasClass('tsrqv-expand1')) {
            var quickViewBackdrop = '<div class="tsrqv-backdrop"></div>';
            $('.app').append(quickViewBackdrop);
        }

        $('.app').toggleClass('tsrqv-expand1');
        $('.app').removeClass('tsrqv-expand');

        //Quick View Backdrop Toggle
        $('.tsrqv-backdrop').on('click', function (e) {
            $('.app').removeClass('tsrqv-expand1');
            $(this).remove();
            htmlU.divHide('helpNav');
        });

        aioIcons.iti();

    }

    function leftSideMiniToggle() {

        if ($('.tsrsn-backdrop').length) {
            $('.tsrsn-backdrop').remove();
        }
        else {
            var sideNavBackdrop = '<div class="tsrsn-backdrop"></div>';
            $('.app').append(sideNavBackdrop);
        }
        // $('.app').toggleClass("tsrsn-expand");

        $('.tsrNavMenuCntr').toggleClass("tsrMobileNavMenu");
        // e.stopPropagation();

        //Side Nav Backdrop Toggle
        $('.tsrsn-backdrop').on('click', function (e) {
            // $('.app').removeClass('tsrsn-expand');
            $('.tsrNavMenuCntr').removeClass("tsrMobileNavMenu");
            $(this).remove();

        });

    }

    function leftSideLargeToggle() {

        $('.app').toggleClass("tsrsn-folded");

        var iconHtml = $('#sideNavToogleIconDiv').text();

        if (iconHtml.indexOf('Expand') == -1) {
            mintHtmlUtil.addMsgToDiv('sideNavToogleIconDiv', true, expand);

        } else {
            mintHtmlUtil.addMsgToDiv('sideNavToogleIconDiv', true, contract);
        }

    }

    var MY_LINKS = [
        { id: 'myScrQlDiv', label: 'My Screeners', favType: SRC_SCR },
        { id: 'myStratQlDiv', label: 'My Strategies', favType: SRC_CSS },
        { id: 'myWlQlDiv', label: 'My Watchlist', favType: SRC_WL },
        { id: 'myPfQlDiv', label: 'My Portfolio', favType: SRC_PF },
    ];

    function myLinks() {

        var html = '';

        html += '<div class="row gy-2">';

        for (var i = 0; i < MY_LINKS.length; i++) {
            html += '<div class="col-lg-6 col-md-12 col-sm-12"><div class="card shadow-lg"><div class="card-header">';
            html += '<h5 class="card-title">' + MY_LINKS[i].label + '</h5>'

            html += '</div><div class="card-body"><div class="table-responsive">'

            html += '<div id="' + MY_LINKS[i].id + '"></div>'
            html += '<div id="' + MY_LINKS[i].id + 'Fb"></div>'

            html += '</div></div></div></div>';
        }

        html += '</div>';

        if (!mtgv.mtpp.pr) {
            html += BR_2;
            html += htmlU.getSpan('Favorites is available only for Premium Users', 'orange', 14);
        }



        htmlU.addMsgToDiv('myLinksDiv', true, html);
        $("#myLinksDiv").css('margin', '10px');


        for (var i = 0; i < MY_LINKS.length; i++) {
            var favType = MY_LINKS[i].favType;
            miFav.ua('dashboard', MY_LINKS[i].id, favType);
        }
    }

    function myRecentActivies() {

        var eqhtml = act.ged();
        var scrhtml = act.gsd();
        var html = '';
        html += '<div class="row gy-2">';
        html += '<div class="col-lg-6 col-md-12 col-sm-12">'
        html += eqhtml;
        html += '</div>'

        html += '<div class="col-lg-6 col-md-12 col-sm-12">'
        html += scrhtml;
        html += '</div>'

        html += '</div>';

        if (jsu.isMigContext() && !mtgv.mtpp.pr) {
            html += BR_2;
            html += htmlU.getSpan('Tracking is available only for Premium Users', 'orange', 14);
        }


        htmlU.addMsgToDiv('myRecentActivityDiv', true, html);
        $("#myRecentActivityDiv").css('margin', '10px');

    }

    /*
    	
            function initBreadCrumbs(){
    	
                    $('.dropdown').on('mouseenter', function(){
                        console.log('called')
                        $(this).children('.dropdown-menu').addClass('show');
                    })
    	
                    $('.dropdown').on('mouseleave', function(){
                        $(this).children('.dropdown-menu').removeClass('show');
                    })
    	
            }
    	
    */

    function getUsOffer() {

        var html = '<div align="center">';

        var excOffer = ''
            + ' <span style="color:#45464c;font-size: 19px; background-image: linear-gradient('
            + ' -225deg,'
            + ' #1F912A 0%,'
            + ' #00B050 29%,'
            + ' #88c943 67%,'
            + ' #0a8d00 100%'
            + ' );'
            + ' background-size: auto auto; background-clip: border-box;background-size: 200% auto;'
            + ' background-clip: text;text-fill-color: transparent; -webkit-background-clip: text;'
            + ' -webkit-text-fill-color: transparent;animation: textclip 2s linear infinite;'
            + 'display: inline-block;font-weight: bold;"> '
            + ' Offer - Exclusively for TSR Premium Users</span>'

        html += BR_2;
        html += excOffer;
        html += BREAK_LINE;

        html += 'US Screener @ Discounted Price ' + htmlU.createLink(jsu.getMyTsrUrl() + '/TsrPlans', ' View Plans')
        html += ' service at ' + htmlU.createLink('https://www.StockAio.com', ' StockAIO.com');
        html += '</div>';
        return html;
    }

    function addShow() {
        // HACK As drop down was not working ONLY in Interactive Chart of TSR , working in AIO  :( why?? Nikhil the savior
        $('#upsul').addClass('show');
        $('#upsa').addClass('show');
    }

    // User registration Model
    function userRegistrationModal() {

        // jsu.dlhrtd();

        // htmlU.divHide(  'upsul');

        // let url = jsu.getStaticUrl()+'/template/user/UserRegistration.html';   ///web/static/template/user/UserRegistration.html
        let url = jsu.getMyTsrUrl() + '/user/QuickRegis';

        jsu.dlhrtd({}, url, 'usrRegDiv', false, null, null, null);

        // (json, url, divId , focusToDiv, loadingDiv, feedbackDiv, cfg )

    }

    return {
        init: init,
        ph: printHeader,
        // setSideMenu : setSideMenu,
        lslt: leftSideLargeToggle,
        lsmt: leftSideMiniToggle,
        help: help,
        myLinks: myLinks,
        myRecAct: myRecentActivies,
        addShow: addShow,
        urm: userRegistrationModal,
        sni: sideNavDropDownInit,
        guh: getUserHead,
    }

})(); // module 	

// $(window).on('load', function () {
//     // Only wire up the resize handler after loading is complete to prevent fire of resize before page is loaded.
//     $(window).on('resize', function () {
//         migUi.sni();
//     });
//     window.matchMedia("(orientation: portrait)").addEventListener("change", (e) => { // detect device orientation change
//         migUi.sni();
//     });
// });

// $(window).resize(function () {
//     // window.innerWidth() 
//     if (isMobile()) {

//         if (mintJsUtil.opsy() === 'Android') {
//             // affectes Search text Box
//         } else {
//             migUi.ph();
//         }
//     } else {
//         migUi.ph();
//     }
// });

$(window).on('load', function () {

    let resizeTimer;
    $(window).on("resize", () => {
        clearTimeout(resizeTimer); // Clear any previous timer
        resizeTimer = setTimeout(() => {
            if (isMobile()) {
                if (mintJsUtil.opsy() === 'Android') {
                    // affectes Search text Box
                } else {
                    migUi.ph();
                }
            } else {
                migUi.ph();
            }
            migUi.sni(); // sni() is called for showing/hiding scroll btn
        }, 250); // Execute after 250ms of no further resize events
    });

    window.matchMedia("(orientation: portrait)").addEventListener("change", (e) => { // detect device orientation change
        migUi.ph();
        migUi.sni();
    });


});



window.onkeyup = function (event) {
    mintHtmlUtil.escapeDiv(event, ['chart_dialog', 'custDialog', 'dialog', 'alertDialog'])
}
