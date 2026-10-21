var mcsh = (function () {

    let csModalId = "tsrMoCsModal";
    let csModalHeaderId = csModalId + "Header";
    let csModalBodyId = csModalId + "Body";
    let csModalFooterId = csModalId + "Footer";

    let csFilterMenuId = "tsrMoCsFilterMenu";


    function getCsHtml() {
        let html = "";
        html += getCsSettingsRow();
        html += `<br>`;
        html += getCsModalRow();

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
        html += getDropDown(mtgv.mtpp.FREQ_SCR_MAP, 'scrFreq', 'width:70%; margin-left: 10px;', tickFunc, null, scrFreq); // todo get stock basket dropdown
        html += csh.gtdh();
        html += '   <select id ="myScrSetting" onmousedown ="csmng.so();" class="form-select ms-3" onkeypress="csmng.soc();">'
            + '			<option value="none" selected="">My Settings</option>'
            + '		</select>';
        html += `</div>`

        return html;
    }

    function getCsModalRow() {
        let html = "";

        // Add Filter & Sel. Filters button HTML
        html += `<div class="d-flex justify-content-between">`
        html += `   <button class="btn btn-primary" data-bs-target="${"#" + csModalId}" data-bs-toggle="modal" onclick="mcsh.saf()">`
        html += `       <span>`
        html += `           <i class="fas fa-plus"></i>`
        html += `       </span>`
        html += `       Add filter`
        html += `   </button>`
        html += `   <button class="btn btn-primary position-relative" data-bs-target="${"#" + csModalId}" data-bs-toggle="modal" onclick="mcsh.ssf()">`
        html += `       <span>`
        html += `           <i class="fas fa-filter"></i>`
        html += `       </span>`
        html += `       Selected Filters`
        html += `       <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">`
        html += `           5`
        html += `           <span class="visually-hidden">unread messages</span>`
        html += `       </span>`
        html += `   </button>`
        html += `</div>`

        // CS Modal HTML
        html += `<div id="${csModalId}" class="modal fade" tabindex="-1">`
        html += `   <div class="modal-dialog modal-fullscreen-lg-down">`
        html += `       <div class="modal-content">`
        html += `           <div class="modal-header py-2" id="${csModalHeaderId}">`
        html += `           </div>`
        html += `           <div class="modal-body" id="${csModalBodyId}" style="height: -webkit-fill-available; overflow: hidden;">`
        html += `           </div>`
        html += `           <div class="modal-footer px-0 py-1" id="${csModalFooterId}" style="flex-wrap: nowrap;">`
        html += `           </div>`
        html += `       </div>`
        html += `   </div>`
        html += `</div>`

        return html;
    }

    function showAllFilters() {

        // modal header
        let headerHtml = "";

        headerHtml += `<h5 class="modal-title">Add Filters</h5>`
        headerHtml += `<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;

        let modalHeader = document.getElementById(csModalHeaderId);
        modalHeader.innerHTML = headerHtml;

        // modal body
        let bodyHtml = "";

        bodyHtml += `<div>`
        bodyHtml += `   <input id="csAcFilter" type="text" class="form-control ui-autocomplete-input" onblur="if (this.value == '') this.value = this.defaultValue;" if="" (this.value="=" this.defaultvalue)="" this.value="" ;="" name="term" placeholder="Search a Filter" onclick="this.select();"  autocomplete="off">`
        bodyHtml += `</div>`

        bodyHtml += `<div class="d-flex my-2" style="overflow-x: auto;">`
        for (let i = 0; i < daily_tabs.length; i++) {
            let id = daily_tabs[i].id;
            bodyHtml += `<button type="button" class="btn btn-outline-secondary rounded-pill mb-2 tsrMoCsCatButton" style="height: 40px; font-size: 14px; text-wrap: nowrap;" onclick="mcsh.scf(this, '${id}');">`
            bodyHtml += daily_tabs[i].label;
            bodyHtml += `</button>`
        }
        bodyHtml += `</div>`

        bodyHtml += `<div id="${csFilterMenuId}" style="overflow-y: auto; height: 100%;">`;
        bodyHtml += `</div>`;

        let modalBody = document.getElementById(csModalBodyId);
        modalBody.innerHTML = bodyHtml;

        // modal footer
        let footerHtml = "";
        footerHtml += `
            <button type = "button" class="btn d-flex flex-column" style = "width: 20%" >
                <i class="fas fa-play"></i>
                <span style="font-size: 12px;">Run</span>
            </button>
            <button type="button" class="btn d-flex flex-column" style="width: 20%">
                <i class="fas fa-undo"></i>
                <span style="font-size: 12px;">Reset</span>
            </button>
            <button type="button" class="btn d-flex flex-column" style="width: 20%">
                <i class="fas fa-save"></i>
                <span style="font-size: 12px;">Save</span>
            </button>
            <button type="button" class="btn d-flex flex-column" style="width: 20%">
                <i class="fas fa-bell"></i>
                <span style="font-size: 12px;">Alert</span>
            </button>
            <button type="button" class="btn d-flex flex-column" style="width: 20%">
                <i class="fas fa-ellipsis-v"></i>
                <span style="font-size: 12px;">More</span>
            </button>
        `;

        let modalFooter = document.getElementById(csModalFooterId);
        modalFooter.innerHTML = footerHtml;
    }

    function showCatFilters(btn, catId) {

        let catBtns = document.querySelectorAll(".tsrMoCsCatButton");

        for (let i = 0; i < catBtns.length; i++) {
            catBtns[i].classList.remove("active");
        }

        btn.classList.toggle('active');

        // show filters
    }

    function showSelFilters() {
        // modal header
        let headerHtml = "";
        let modalHeader = document.getElementById(csModalHeaderId);
        modalHeader.innerHTML = headerHtml;

        // modal body
        let bodyHtml = "";
        let modalBody = document.getElementById(csModalBodyId);
        modalBody.innerHTML = bodyHtml;


        // modal footer
        let footerHtml = "";
        let modalFooter = document.getElementById(csModalFooterId);
        modalFooter.innerHTML = footerHtml;

    }

    return {
        gch: getCsHtml,
        saf: showAllFilters,
        scf: showCatFilters,
        ssf: showSelFilters,
    }
})();