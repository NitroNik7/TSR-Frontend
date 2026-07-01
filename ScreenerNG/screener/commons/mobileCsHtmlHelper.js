var mcsh = (function () {

    var jsu = mintJsUtil;
    var htmlU = mintHtmlUtil;

    var scrAlias = 'myTsrScreener';

    let csModalId = "tsrMoCsModal";
    let csModalHeaderId = csModalId + "Header";
    let csModalBodyId = csModalId + "Body";
    let csModalFooterId = csModalId + "Footer";

    let searchFilterDivId = "tsrMoCsSearchFilter";
    let filterCatMenuId = "tsrMoCsFilterCatMenu"

    let csFilterMenuId = "tsrMoCsFilterMenu";
    let csControlsDivId = "csControlsDiv";

    let addFilterBtnId = "addAnotherFilterBtn";

    let selFieldsWrapperId = "csSelFieldsDivWrapper";
    let selFieldsId = "csSelFieldsDiv";

    let scrCtrlFbDivId = "csScrCtrlFbDiv"

    let moSelCountId = "tsrMoCsSelCount"

    function getCsHtml() {

        let html = "";

        html += getCsSettingsRow();
        html += `<br>`;
        html += getCsModalRow();
        html += `<hr>`;
        html += getCsControlsRow();
        html += `<hr>`;
        html += `<div id="${scrCtrlFbDivId}" class="text-center">` 
        html += `</div>`

        let csDiv = document.getElementById("csDiv");
        csDiv.style.overflow = "hidden";

        return html;
    }

    function getCsSettingsRow() {
        let html = "";

        var tickFunc = 'myTsrScreener.sfc';
        let scrFreq = localStorage.getItem("csscrFreq");

        if (scrFreq == null) {

            if (jsu.isMigContext()) {
                scrFreq = FREQ_DAILY;
            } else {
                scrFreq = (mtgv.mktDet.mktHours ? FREQ_INTRA_DAILY : FREQ_DAILY)
            }
        }

        mtgv.cs.screenerData.scrFreq = scrFreq;

        html += `<div class="d-flex justify-content-between">`
        html += csh.gsbh();
        html += csh.gtdh();
        html += '   <select id ="myScrSetting" onmousedown ="csmng.so();" class="form-select ms-1" onkeypress="csmng.soc();">'
            + '         <option value="none" selected="">My Settings</option>'
            + '     </select>';
        html += `</div>`

        return html;
    }


    function getCsModalRow() {
        let html = "";

        // Add Filter & Sel. Filters button HTML
        html += `<div class="d-flex justify-content-between">`
        html += `   <button class="border border-1 btn btn-lg" data-bs-target="${"#" + csModalId}" data-bs-toggle="modal" onclick="mcsh.scm()">`
        html += `       <span>`
        html += `           <i class="fas fa-plus"></i>`
        html += `       </span>`
        html += `       Add filter`
        html += `   </button>`
        html += `   <button class="border border-1 btn btn-lg position-relative me-3" data-bs-target="${"#" + csModalId}" data-bs-toggle="modal" onclick="mcsh.ssfm()">`
        html += `       <span>`
        html += `           <i class="fas fa-filter"></i>`
        html += `       </span>`
        html += `       Added Filters` // modified
        html += `       <span id="${moSelCountId}" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">`
        html += `           0 <span class="visually-hidden">unread messages</span>`
        html += `       </span>`
        html += `   </button>`
        html += `</div>`

        // CS Modal HTML
        html += `<div id="${csModalId}" class="modal fade" tabindex="-1">`
        html += `   <div class="modal-dialog modal-fullscreen-lg-down">`
        html += `       <div class="modal-content">`
        html += `           <div class="modal-header py-2" id="${csModalHeaderId}">`
        html += `           </div>`
        html += `           <div class="modal-body" id="${csModalBodyId}" style="height: -webkit-fill-available; overflow-x: hidden; overflow-y: auto;">`
        html += `           </div>`
        html += `           <div class="modal-footer px-0 py-1 justify-content-around" id="${csModalFooterId}" style="flex-wrap: nowrap;">`
        html += `           </div>`
        html += `       </div>`
        html += `   </div>`
        html += `</div>`

        return html;
    }

    function showCsModal() {


        let headerHtml = getCsModalHeaderHtml();
        htmlU.addMsgToDiv(csModalHeaderId, true, headerHtml);

        if(htmlU.divExist(csModalBodyId)){
            htmlU.clearDiv(csModalBodyId);

        }

        let bodyHtml = getCsModalBodyHtml();
        htmlU.addMsgToDiv(csModalBodyId, true, bodyHtml);

        let footerHtml = getCsModalFooterHtml();
        htmlU.addMsgToDiv(csModalFooterId, true, footerHtml);

        showCatFilters("tsrMoCspriceCsTabBtn", "priceCs"); // loading price Action filters initially
        htmlU.divHide(csControlsDivId);


        let modal = document.querySelector("#" + csModalId + " .modal-content");
        modal.style.backgroundColor = "";

        mintSrch.ras(true); 

    }

    function getCsModalHeaderHtml() {
        // modal header
        let headerHtml = "";

        headerHtml += `<h5 class="modal-title">Add Filters</h5>`
        headerHtml += `<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;

        return headerHtml;
    }

    function getCsModalBodyHtml() {
        // modal body
        let html = "";

        // search filter box
        html += `<div id="${searchFilterDivId}" class="mb-3">`
        html += mintSrch.gs('width:100%;')
        html += `</div>`

        // filter tab menu
        html += `<div id="${filterCatMenuId}" class="d-flex my-2" style="overflow-x: auto;">`
        for (let i = 0; i < mtgv.cs.tabs.length; i++) {
            let btnId = "tsrMoCs" + mtgv.cs.tabs[i].id + "TabBtn";
            let tabId = mtgv.cs.tabs[i].id;
            html += `<button id="${btnId}" type="button" class="btn btn-lg btn-outline-secondary rounded-pill mb-2 tsrMoCsCatButton" style="height: 40px; font-size: 14px; text-wrap: nowrap;" onclick="mcsh.scf('${btnId}', '${tabId}');">`
            html += mtgv.cs.tabs[i].label;
            html += `</button>`
        }
        html += `</div>`

        // filter menu
        html += `<div id="${csFilterMenuId}" style="overflow-y: auto; height: max-content; max-height: calc(100% - 100px);">`;
        html += `</div>`;

        // csControlsDiv
        html += `<button id="${addFilterBtnId}"  style="color: cornflowerblue; font-size: 20px;" class="btn mb-3">
                        <i class="fas fa-arrow-left"></i> 
                        <span class="ms-2">Add Another</span>
                    </button>`
        html += `<div id="${csControlsDivId}" class="miCtrl w-100 p-3 shadow" style="display: none; height: max-content; max-height: calc(100% - 100px); min-height: 40%;">`; // modified
        html += `   <table id="${CS_FILTERS_TABLE}">`
        html += `   </table>`
        html += `</div>`;

        // selected filters 
        html += `<div id="${selFieldsWrapperId}" style="display: none; margin-right: 15px;">`
        html += `   <hr>`
        html += `   <h6>Added Filters</h6>` // modified
        html += `   <div id="${selFieldsId}">`
        html += `   </div>`
        html += `</div>`

        return html;
    }




    function getCsModalFooterHtml() {
        // modal footer
        let html = "";
        var custBtnClass = 'btn  btn-secondary';
        var func = scrAlias + '.' + 'screenNow';
        let tabindex = 1;

        html += ` <a type="button" onclick="${func + "('run');"}" class="${custBtnClass}" title="Run Screener" onkeypress="JavaScript:myTsrScreener.screenNow('run');" tabindex="1" data-bs-dismiss="modal" aria-label="Close">`
        html += `   <span class="fas fa-play"></span> Run `
        html += `</a>`

        html += htmlU.getCusBtn('Reset', func, 'reset', 'Reset Screener', custBtnClass, 'fas fa-undo', tabindex);

        html += ` <a type="button" onclick="${func + "('save');"}" class="${custBtnClass}" title="Save screener settings" tabindex="1" data-bs-dismiss="modal" aria-label="Close">`
        html += `   <span class="fas fa-play"></span> Save `
        html += `</a>`

        html += ` <a type="button" onclick="${func + "('alertNew');"}" class="${custBtnClass}" title="Add alert on Screener" tabindex="1"  data-bs-dismiss="modal" aria-label="Close">`
        html += `   <span class="fas fa-play"></span> Alert `
        html += `</a>`

        // ? are more settings required ?
        return html;
    }


    function showCatFilters(btnId, tabId) {
        // btnId - required to toggle .active class on button
        // tabId - required to get filter btn html for all filters in tab (i.e. category)

        let btn = document.getElementById(btnId);
        if (jsu.isNotNull(btn)) {
            let catBtns = document.querySelectorAll(".tsrMoCsCatButton");

            for (let i = 0; i < catBtns.length; i++) {
                catBtns[i].classList.remove("active");
            }

            btn.classList.toggle('active');
        }

        let html = "";

        let filterObj = csh.gfofsd(tabId);
        let subMenu = filterObj.subMenu;

        if (jsu.isNotNull(subMenu)) {
            for (let i = 0; i < subMenu.length; i++) {
                html += getFilterBtnHtml(subMenu[i], tabId);
            }
        }

        let modalBody = document.getElementById(csModalBodyId);
        modalBody.style.overflow = "hidden";

        // hide csControlsDiv & sel. filters
        htmlU.divHide(addFilterBtnId);
        htmlU.divHide(csControlsDivId);
        htmlU.divHide(selFieldsWrapperId);

        // show other divs
        // htmlU.divShow(searchFilterDivId); // modified

        htmlU.divShow(csFilterMenuId);
        htmlU.addMsgToDiv(csFilterMenuId, true, html);
        // let csFilterMenu = document.getElementById(csFilterMenuId);
        // csFilterMenu.innerHTML = html;

        let filterCatMenuDiv = document.getElementById(filterCatMenuId);
        filterCatMenuDiv.classList.add("d-flex");
        filterCatMenuDiv.classList.remove("d-none");

        let modal = document.querySelector("#" + csModalId + " .modal-content"); 
        modal.style.backgroundColor = "white"; 

    }

    function getFilterBtnHtml(filterObj, menuId) {
        // filterObj - required to get name and other req data of a filter
        // menuId - used to form filterIdStr - which is used in other funcs to get filterObj from scrData obj

        let subsUser = false; // is user subscribed
        let prUser = false; // is premium plan user
        if (mtgv.mtpp.pr) {
            if (mtgv.mtpp.crossFreq) {
                prUser = true;
            } else {
                subsUser = true;
            }
        }

        let prFilter = false;
        if (filterObj["premium"]) {
            prFilter = true;
        }

        // let addOnce = false;
        // if (filterItem["addOnce"]) {
        //     addOnce = true;
        // }

        let filterIdStr = menuId + "_" + filterObj.id;

        if (jsu.isNotNull(filterObj.subMenu)) {
            func = `mcsh.ufm('${filterIdStr}');`
        } else {
            func = `mcsh.sfb('${filterIdStr}');`
        }

        let plansUrl = jsu.getMyTsrUrl() + '/TsrPlans';
        
        let html = "";
        if (prFilter) {
            if (prUser) { // show
                html += `<div class="d-flex justify-content-between align-items-center me-3" style="height: 50px;" onclick="${func}">`;
                html += `   <span style="font-weight: 300;">${filterObj.label}</span>`;
                html += `   <span style="color: gray;"><i class="fas fa-angle-right"></i></span>`;
                html += `</div>`;
                // if (addOnce) {

                // } else {

                // }
            } else {
                if (subsUser) { // upgrade
                    html += `<a class="d-flex justify-content-between align-items-center me-3" style="height: 50px; color: grey;" href="${plansUrl}">`;
                    html += `   <span style="font-weight: 300; ">${filterObj.label}</span>`;
                    html += `   <span class="badge ms-2" style="background-color: #0254ad;">UPGRADE</span>`
                    html += `</a>`;

                } else { // pro
                    html += `<a class="d-flex justify-content-between align-items-center me-3" style="height: 50px; color: grey;" href="${plansUrl}">`;
                    html += `   <span style="font-weight: 300;">${filterObj.label}</span>`;
                    html += `   <span class="badge ms-2" style="background-color: #0254ad;">PRO</span>`
                    html += `</a>`;
                }
            }
        } else { // show
            html += `<div class="d-flex justify-content-between align-items-center me-3" style="height: 50px;" onclick="${func}">`;
            html += `   <span style="font-weight: 300;">${filterObj.label}</span>`;
            html += `   <span style="color: gray;"><i class="fas fa-angle-right"></i></span>`;
            html += `</div>`;
            // if (addOnce) {

            // } else {

            // }
        }

        return html;
    }


    function updateFilterMenu(filterIdStr) {

        let html = "";

        let filterObj = csh.gfofsd(filterIdStr);
        let subMenu = filterObj.subMenu;

        if (jsu.isNotNull(subMenu)) {
            for (let i = 0; i < subMenu.length; i++) {

                html += getFilterBtnHtml(subMenu[i], filterIdStr);
            }
        }

        htmlU.divShow(csFilterMenuId);
        htmlU.addMsgToDiv(csFilterMenuId, true, html);

        // let csFilterMenu = document.getElementById(csFilterMenuId);
        // csFilterMenu.style.display = "block";

        // csFilterMenu.innerHTML = html;
        let modalBody = document.getElementById(csModalBodyId);
        modalBody.style.overflow = "hidden";

        htmlU.divHide(addFilterBtnId);
        htmlU.divHide(csControlsDivId);
        htmlU.divHide(selFieldsWrapperId);
    }


    function showFilterBox(idStr) {

        // miCtrl 

        let html = "";

        let filterObj = csh.gfofsd(idStr);

        let func = filterObj["func"];

        let params = "";
        for (let l = 0; l < filterObj["params"].length; l++) {
            params += "'" + filterObj["params"][l] + "'";
            if (l < filterObj["params"].length - 1) {
                params += ",";
            }
        }

        // programatically calling function using btn.click() to print filter form
        let btn = document.createElement("button");
        btn.style.display = "none";
        btn.setAttribute("onclick", func + `(${params});`);


        // print html

        // let csControlsDiv = document.getElementById(csControlsDivId);
        // csControlsDiv.style.display = "block";

        let modalBody = document.getElementById(csModalBodyId);
        modalBody.style.overflow = "hidden auto ";

        htmlU.divShow(addFilterBtnId);
        htmlU.divShow(csControlsDivId);
        htmlU.divShow(selFieldsWrapperId);

        let btnId = "tsrMoCs" + idStr.split("_")[0] + "TabBtn";

        // let csControlsDiv = document.getElementById(csControlsDivId);
        let backBtn = document.getElementById(addFilterBtnId);
        // let menuId = idStr.slice(0, idStr.lastIndexOf("_"));
        let catId = idStr.split("_")[0];
        backBtn.setAttribute("onclick", `mcsh.scf('${btnId}', '${catId}')`);

        let csFilterTable = document.getElementById(CS_FILTERS_TABLE);
        csFilterTable.innerHTML = "";
        csFilterTable.appendChild(btn);
        btn.click();

        // hide other divs in modal body
        // htmlU.divHide(searchFilterDivId); // modified
        htmlU.divHide(csFilterMenuId);

        let filterCatMenuDiv = document.getElementById(filterCatMenuId);
        filterCatMenuDiv.classList.remove("d-flex");
        filterCatMenuDiv.classList.add("d-none");

        let modal = document.querySelector("#" + csModalId + " .modal-content");
        modal.style.backgroundColor = "floralwhite";
    }

    function getCsControlsRow() {
        let html = "";

        var custBtnClass = 'btn btn-secondary';

        var func = scrAlias + '.' + 'screenNow';
        var tabindex = 1;

        html += `<div class="d-flex justify-content-between align-items-center">`
        html += htmlU.getCusBtn('Run ', func, 'run', 'Run Screener', custBtnClass, 'fas fa-play', tabindex);

        html += htmlU.getCusBtn('Reset ', func, 'reset', 'Reset Screener', custBtnClass, 'fas fa-redo-alt', tabindex);
        html += htmlU.getCusBtn('Save ', func, 'save', 'Save Screener', custBtnClass, 'fas fa-save', tabindex);
        html += htmlU.getCusBtn('Alert ', func, 'alertNew', 'Alerts', custBtnClass, 'fas fa-bell', tabindex);
        html += `</div>`

        return html;
    }



    function showSelFiltersModal() {
        // modal header
        let headerHtml = "";
        headerHtml += `<h4 class="modal-title">Added Filters</h4>`
        headerHtml += `<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
        htmlU.addMsgToDiv(csModalHeaderId, true, headerHtml);

        let bodyHtml = "";
        // let bodyHtml = getCsModalBodyHtml();

        bodyHtml += `<div id="${csControlsDivId}" class="miCtrl w-100 pb-3 border-bottom p-3 shadow">`; // modified
        bodyHtml += `    <table id="${CS_FILTERS_TABLE}">`
        bodyHtml += `    </table>`

        bodyHtml += `</div>`;
        // bodyHtml += `<hr>`
        bodyHtml += `<div id="${selFieldsId}">`
        bodyHtml += `</div>`
        bodyHtml += `<br>`
        bodyHtml += `<div class="text-center">`
        bodyHtml += `   <button class="btn btn-primary mx-auto" onclick = "mcsh.scm(); csu.dsf();">`
        bodyHtml += `       Add Filter`
        bodyHtml += `   </button>`
        bodyHtml += `</div>`
        htmlU.addMsgToDiv(csModalBodyId, true, bodyHtml);

        let footerHtml = getCsModalFooterHtml();
        htmlU.addMsgToDiv(csModalFooterId, true, footerHtml);


        csu.dsf();
    }

    return {
        gch: getCsHtml,
        scm: showCsModal,
        scf: showCatFilters,
        ufm: updateFilterMenu,
        sfb: showFilterBox,
        ssfm: showSelFiltersModal,
    }
})();