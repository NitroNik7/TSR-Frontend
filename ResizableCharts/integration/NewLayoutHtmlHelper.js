var chngh = (function () {
    let rightBarId = "tsrChNgPanelBar";
    let bottomBarId = "tsrChNgBottomBar";
    let leftBarId = "tsrChNgLeftBar";

    // ------------------------ SIDE PANEL HTML CODE -----------------------------

    function getSidePanelHtml(panel) {
        let panelId = panel.id;

        if (panelId == "marketOverview") {

        } else if (panelId == "savedSettings") {
            paintSavedSettingsPanel(panel);
        } else if (panelId == "watchlist") {

        } else if (panelId == "favScreeners") {
            paintFavScrPanel(panel);
        } else if (panelId == "viewedStocks") {
            paintViewedStocksPanel(panel);
        }
    }

    function paintSavedSettingsPanel(panel) {
        let html = "";

        let mySettings = chartDetails.MySettings;
        let height = $("#" + panel.id).height() - 50;

        if (jsu.isNotNull(mySettings)) {
            html += `<div class="card p-0 m-0 rounded-0">`
            html += `    <div class="card-header py-2 px-0" style="text-align: center; overflow: hidden;">`
            html += `       <b>${panel.label}</b>`
            html += `    </div>`
            html += `    <div class="card-body p-0"  style="height: ${height}px; overflow-y: auto;">`
            html += `       <table class="table table-striped table-hover table-sm">`
            html += `           <tbody>`
            if (mySettings.length > 0) {
                for (let i = 0; i < mySettings.length; i++) {
                    let setting = mySettings[i];

                    html += `           <tr>`
                    html += `               <td>${setting.Name}</td>`;
                    html += `               <td>
                                            <a onclick="" style="font-size:16px;color:#0d6efd;" title="View Chart"><i class="fas fa-chart-line"></i></a>
                                        </td>`
                    html += `           </tr>`
                }
            } else {
                html += `           <tr>`
                html += `               <td colspan="2">No Settings to Show</td>`;
                html += `           </tr>`
            }
            html += `           </tbody>`
            html += `       </table>`
            html += `    </div>`
            html += `</div>`

            $("#" + panel.id).html(html);
        } else {
            setTimeout(function () {
                paintSavedSettingsPanel(panel);
            }, 250);
        }
    }

    function paintFavScrPanel(panel) {
        let html = "";

        let height = $("#" + panel.id).height() - 50;

        html += `<div class="card p-0 m-0">`
        html += `    <div class="card-header d-flex justify-content-evenly align-items-center px-0 py-2" style="text-align: center; overflow: hidden;">`
        html += `       <b class="px-2">Favourite Screeners</b>`

        // let favScrSelectId = "tsrChWlSelect"
        // let favScrSelect = document.getElementById(favScrSelectId);
        // let scrId;

        // if (favScreenersDef.length > 0) {
        //     if (jsu.isNull(scrId)) {
        //         scrId = watchlists[0].id;
        //     }
        // }

        // if (jsu.isNotNull(favScrSelect)) {
        //     scrId = favScrSelect.value;
        // }

        html += `   <select class="form-select ms-3" onchange=""  style="width: max-content;">`
        html += `       <option value="one" selected>Screener 1</option>`
        html += `       <option value="two" selected>Screener 2</option>`
        html += `       <option value="thre" selected>Screener 3</option>`
        html += `   </select>`
        // if (favScreenersDef.length > 0) {
        //     html += `   <select class="form-select ms-3" onchange="paintPrCrScrPanel('${panelId}')" style="width: max-content;">`
        //     for (let i = 0; i < favScreenersDef.length; i++) {
        //         let scr = favScreenersDef[i];
        //         if (scr.id == scrId) {
        //             html += `<option value="${scr.id}" selected>${scr.label}</option>`
        //         } else {
        //             html += `<option value="${scr.id}">${scr.label}</option>`
        //         }
        //     }
        //     html += `   </select>`
        // }

        html += `    </div>`
        html += `    <div class="card-body p-0"  style="height: ${height}px; overflow-y: auto;">`

        html += `       <table class="table table-striped table-hover table-sm table-responsive">`

        html += `           <thead>`
        html += `               <tr>`
        html += `                   <th>Stock</th>`
        html += `                   <th>Price</th>`
        html += `                   <th> </th>`
        html += `                   <th> </th>`
        html += `                   <th> </th>`
        html += `                   <th>Buy</th>`
        html += `                   <th>Sell</th>`
        html += `                   <th> </th>`
        html += `               </tr>`
        html += `           </thead>`
        html += `           <tbody>`
        html += `               <tr "="" class="odd"><td>ABB</td><td>6392.50</td><td> <a onclick="misu.atc(&quot;ABB&quot;,&quot;pf&quot;,&quot;scr&quot;);" title="Add to Portfolio"> <span class="fa fa-solid fa-briefcase" style="font-size:14px;color:#708090;"></span></a></td><td><a onclick="misu.atc(&quot;ABB&quot;,&quot;wl&quot;,&quot;scr&quot;);" title="Add to Watchlist"> <span class="fa  fa-eye" style="font-size:14px;color:#708090;"></span></a></td><td><a onclick="misu.atc(&quot;ABB&quot;,&quot;alert&quot;,&quot;scr&quot;);" title="Add Alert"> <span class="fa  fa-bell" style="font-size:14px;color:#708090;"></span></a></td><td>
						<button class="btn btn-sm btn-outline-success" style="height:25px;padding : .1rem .5rem" title="Buy" onclick="mibbsu.init('BUY', 'ABB', '6392.5')">
						<b>B</b></button></td>

						<td><button class="btn btn-sm btn-outline-danger" style="height:25px;padding : .1rem .5rem" title="Sell" onclick="mibbsu.init( 'SELL', 'ABB', '6392.5')">
						<b>S</b></button>
					</td><td style="position: sticky; right: 0px;" class="dtfc-fixed-right"><a href="javascript:cputl.chcp('ABB%20Ltd.','ABB','141','243','gen=alpha&amp;cf=d&amp;period=3M&amp;src=cscr&amp;code=243&amp;sector=141&amp;domain=www.tsrbt1.com&amp;ex=in&amp;popSrc=cs');" oncontextmenu="return false;"><span class="fas fa-chart-line"></span></a></td></tr>`
        html += `       <tr "="" class="even"><td>ADANIENSOL</td><td>992.30</td><td> <a onclick="misu.atc(&quot;ADANIENSOL&quot;,&quot;pf&quot;,&quot;scr&quot;);" title="Add to Portfolio"> <span class="fa fa-solid fa-briefcase" style="font-size:14px;color:#708090;"></span></a></td><td><a onclick="misu.atc(&quot;ADANIENSOL&quot;,&quot;wl&quot;,&quot;scr&quot;);" title="Add to Watchlist"> <span class="fa  fa-eye" style="font-size:14px;color:#708090;"></span></a></td><td><a onclick="misu.atc(&quot;ADANIENSOL&quot;,&quot;alert&quot;,&quot;scr&quot;);" title="Add Alert"> <span class="fa  fa-bell" style="font-size:14px;color:#708090;"></span></a></td><td>
						<button class="btn btn-sm btn-outline-success" style="height:25px;padding : .1rem .5rem" title="Buy" onclick="mibbsu.init('BUY', 'ADANIENSOL', '992.3')">
						<b>B</b></button></td>

						<td><button class="btn btn-sm btn-outline-danger" style="height:25px;padding : .1rem .5rem" title="Sell" onclick="mibbsu.init( 'SELL', 'ADANIENSOL', '992.3')">
						<b>S</b></button>
					</td><td style="position: sticky; right: 0px;" class="dtfc-fixed-right"><a href="javascript:cputl.chcp('Adani%20Energy%20Solutions%20Ltd.','ADANIENSOL','158','2576','gen=alpha&amp;cf=d&amp;period=3M&amp;src=cscr&amp;code=2576&amp;sector=158&amp;domain=www.tsrbt1.com&amp;ex=in&amp;popSrc=cs');" oncontextmenu="return false;"><span class="fas fa-chart-line"></span></a></td></tr>`
        html += `<tr "="" class="odd"><td>ADANIENT</td><td>1961.10</td><td> <a onclick="misu.atc(&quot;ADANIENT&quot;,&quot;pf&quot;,&quot;scr&quot;);" title="Add to Portfolio"> <span class="fa fa-solid fa-briefcase" style="font-size:14px;color:#708090;"></span></a></td><td><a onclick="misu.atc(&quot;ADANIENT&quot;,&quot;wl&quot;,&quot;scr&quot;);" title="Add to Watchlist"> <span class="fa  fa-eye" style="font-size:14px;color:#708090;"></span></a></td><td><a onclick="misu.atc(&quot;ADANIENT&quot;,&quot;alert&quot;,&quot;scr&quot;);" title="Add Alert"> <span class="fa  fa-bell" style="font-size:14px;color:#708090;"></span></a></td><td>
						<button class="btn btn-sm btn-outline-success" style="height:25px;padding : .1rem .5rem" title="Buy" onclick="mibbsu.init('BUY', 'ADANIENT', '1961.1')">
						<b>B</b></button></td>

						<td><button class="btn btn-sm btn-outline-danger" style="height:25px;padding : .1rem .5rem" title="Sell" onclick="mibbsu.init( 'SELL', 'ADANIENT', '1961.1')">
						<b>S</b></button>
					</td><td style="position: sticky; right: 0px;" class="dtfc-fixed-right"><a href="javascript:cputl.chcp('Adani%20Enterprises%20Ltd.','ADANIENT','183','303','gen=alpha&amp;cf=d&amp;period=3M&amp;src=cscr&amp;code=303&amp;sector=183&amp;domain=www.tsrbt1.com&amp;ex=in&amp;popSrc=cs');" oncontextmenu="return false;"><span class="fas fa-chart-line"></span></a></td></tr>`

        html += `           </tbody>`
        html += `       </table>`
        html += `    </div>`
        // html += `    <div class="card-footer" style="text-align: center; overflow: hidden;">`
        // html += `    </div>`
        html += `</div>`

        $("#" + panel.id).html(html);

    }

    function paintViewedStocksPanel(panel) {
        let html = "";

        let viewedStocks = act.grc();
        let height = $("#" + panel.id).height() - 50;

        html += `<div class="card p-0 m-0 rounded-0">`
        html += `    <div class="card-header py-2 px-0" style="text-align: center; overflow: hidden;">`
        html += `       <b>${panel.label}</b>`
        html += `    </div>`
        html += `    <div class="card-body p-0"  style="height: ${height}px; overflow-y: auto;">`
        html += `       <table class="table table-striped table-hover table-sm">`
        html += `           <thead>`
        html += `               <tr>`
        html += `                   <th>Code</th>`
        html += `                   <th>Name</th>`
        html += `               </tr>`
        html += `           </thead>`
        html += `           <tbody>`
        if (viewedStocks.length > 0) {
            for (let i = 0; i < viewedStocks.length; i++) {
                let stock = viewedStocks[i];
                html += `           <tr>`
                html += `               <td>`
                html += `                   <a class="link-primary" style="cursor: pointer;" onclick="chnglost.psc(${i});">`
                html += `                       ${stock.code}`
                html += `                   </a>`
                html += `               </td>`;
                html += `               <td>`
                html += `                    ${stock.name}`
                html += `               </td>`;
                html += `           </tr>`
            }
        } else {
            html += `           <tr>`
            html += `               <td colspan="2">No Settings to Show</td>`;
            html += `           </tr>`
        }
        html += `           </tbody>`
        html += `       </table>`
        html += `    </div>`
        html += `</div>`

        $("#" + panel.id).html(html);


    }

    function paintStockChart(i) {
        let viewedStocks = act.grc();
        let stock = viewedStocks[i];
        if (jsu.isNotNull(stock)) {
            myTsrChartInit.sc(stock);
        }
    }

    // ------------------------ BOTTOM BAR HTML CODE -----------------------------

    /*
        function addBtnstoBottomBar() {
            let html = "";

            html += `<div class="d-flex">`
            html += getTickMenu();
            html += `</div>`

            return html;
        }

        function getTickMenu() {

            let enabledTicks = [], disabledTicks = [];

            // mtgv.mtpp.FREQ_SCR_MAP = [
            // 	{ "id": "D", "label": "Daily (EOD)", "sf": "DAILY", "sLabel": "d", "cp": 1, "period": "3M" },
            // 	{ "id": "W", "label": "Weekly", "sf": "WEEKLY", "sLabel": "w", "cp": 4, "period": "1Y" },
            // 	{ "id": "M", "label": "Monthly", "sf": "MONTHLY", "sLabel": "m", "cp": 10, "period": "10Y" }
            // ]
            for (let i = 0; i < FREQ_SCR_MAP.length; i++) {
                let freq = FREQ_SCR_MAP[i];
                let enabled = false;
                for (let j = 0; j < mtgv.mtpp.FREQ_SCR_MAP.length; j++) {
                    let enabledFreq = mtgv.mtpp.FREQ_SCR_MAP[j];
                    if (freq.id == enabledFreq.id) {
                        enabled = true;
                    }
                }
                if (enabled) {
                    enabledTicks.push(FREQ_SCR_MAP[i]);
                } else {
                    disabledTicks.push(FREQ_SCR_MAP[i]);
                }
            }

            let html = "";

            html += `<div class="d-flex justify-content-evenly">`
            for (let i = 0; i < enabledTicks.length; i++) {
                let tick = enabledTicks[i];
                html += `<button class="btn" onclick="chInimb.ua('pChg', '${tick.id}' )">${tick.label}</button>`
                if (i > 2) {
                    break;
                }
            }
            html += `</div>`

            var tickFunc = 'myTsrScreener.sfc()';

            html += `<select id="scrFreq" onchange="${tickFunc}; chnglost.utm();" class="form-select ms-3">`
            for (let i = 0; i < enabledTicks.length; i++) {
                html += `<option value="${enabledTicks[i].id}">${enabledTicks[i].label}</option>`
            }
            for (let i = 0; i < disabledTicks.length; i++) {
                html += `<option value="${disabledTicks[i].id}" disabled>${disabledTicks[i].label}</option>`
            }
            html += `</select>`

            // html += getDropDown(mtgv.mtpp.FREQ_SCR_MAP, 'scrFreq', 'width:70%; margin-left: 10px;', tickFunc, null, scrFreq);
            return html;
        }

        function updateTickMenu() {

            let enabledTicks = [];

            for (let i = 0; i < FREQ_SCR_MAP.length; i++) {
                let freq = FREQ_SCR_MAP[i];
                let enabled = false;
                for (let j = 0; j < mtgv.mtpp.FREQ_SCR_MAP.length; j++) {
                    let enabledFreq = mtgv.mtpp.FREQ_SCR_MAP[j];
                    if (freq.id == enabledFreq.id) {
                        enabled = true;
                    }
                }
                if (enabled) {
                    enabledTicks.push(FREQ_SCR_MAP[i]);
                }
            }

            let html = "";
            let btnCount = 0;
            for (let i = 0; i < enabledTicks.length; i++) {
                let tick = enabledTicks[i];
                if (tick.id != currTick.id) {
                    html += `<button class="btn" onclick="chInimb.ua('pChg', '${tick.id}' )">${tick.label}</button>`
                    btnCount++;
                }
                if (btnCount > 2) {
                    break;
                }
            }
        }

        function getMySettingsMenu() {
            let mySettings = chartDetails.MySettings;


        }
    */


    // ------------------------ ADD ALERT & NEW VIEW TOGGLE CODE -----------------------------
    
    /*
        html += `<div class="align-items-center d-flex mx-3" style=" text-wrap: nowrap;">`
        html += `   <button class="btn" style=" font-size: 14px;" onclick='artngc.csa();'> `
        html += aioIcons.gs('alertSb', 'lightgray', 32);
        html += `       &nbsp;&nbsp; Add Alert`
        html += `   </button>`
        html += `   <div class="vr mx-3"></div>`
        html += `   <div class="form-check form-select-sm form-switch">`
        html += `       <input class="form-check-input" type="checkbox" role="switch" id="tsrChNgSwitch" onchange='switchChView()'>`
        html += `       <label class="form-check-label" for="tsrChNgSwitch">New View</label>`
        html += `   </div>`
        html += `</div>`

        function switchChView() {
            localStorage.setItem("ngchfs", true);
        }
    */

    // ------------------------ RIGHT BAR & PANEL HTML CODE -----------------------------

    function addBtnsToPanelBar(panels) {
        // let rightColDiv = document.getElementById(rightColId);
        var html = "";

        // let openPanels = getOpenPanels(maxOpenPanels);
        html += `<div class="d-flex flex-column align-items-center">`
        for (let i = 0; i < panels.length; i++) {
            let panel = panels[i];
            html += `<button class="btn" id="${panel.id + "Btn"}" title="${panel.title}" style="margin: 0;" onclick="chngh.tpbb('${panel.id}'); ">`
            html += panel.icon;
            html += `</button>`
        }
        html += `</div>`

        // LAYOUT SETTING BUTTON
        html += `
                <div class="dropstart">
                    <button class="btn" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-cog"></i>
                    </button>

                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><a class="dropdown-item" onclick="chngh.sb(this, '${leftBarId}')">Left Bar</a></li>
                        <li><a class="dropdown-item" onclick="chngh.sb(this, '${bottomBarId}')">Bottom Bar</a></li>
                        <!-- <li><a class="dropdown-item" >More Settings</a></li> -->
                    </ul>
                </div>
            `;
        htmlU.addMsgToDiv(rightBarId, true, html);
    }

    function showBar(btn, barId) {
        btn.classList.toggle("tsrChNgActive");

        let bar = document.getElementById(barId);
        if (bar.style.display == "flex") {
            bar.style.display = "none";
        } else {
            let container = document.getElementById(chContainerId);
            bar.style.display = "flex";
            if (barId == bottomBarId) {
                let parent = container.parentElement;
                let boundingRect = parent.getBoundingClientRect();
                parent.style.height = (boundingRect.height - 50) + "px"; // to allocate space for bottom bar
            }
        }
    }

    // ---------------------------------------------------------------------

    function togglePanelBarBtn(panelId) { // show/hide panels
        let currBtn = jsu.getObjFrmArr(panelVertDivs, panelId);
        currBtn.open = !currBtn.open;
        let btn = document.getElementById(panelId + "Btn");
        let svg = btn.querySelector("svg");

        let openPanelCount = 0;
        for (let i = 0; i < panelVertDivs.length; i++) {
            let panel = panelVertDivs[i];
            if (panel.open) {
                openPanelCount++;
            }
        }

        if (openPanelCount == 0) { // atleast one panel will always remain open
            currBtn.open = true;
        }

        if (currBtn.open) {
            svg.setAttribute("fill", "black");
        } else {
            svg.setAttribute("fill", "lightgray");
        }

        let openPanels = getOpenPanels(maxOpenPanels);

        if (openPanelCount > maxOpenPanels) {
            openPanels[0].open = false;
            openPanels = getOpenPanels(maxOpenPanels);
        }
        const secondCol = chContainer.children(".column").last();
        createLayout(secondCol, vertContPrefix, "vertical", openPanels, false);

        for (let i = 0; i < panelVertDivs.length; i++) {
            let panel = panelVertDivs[i];
            $("#" + panel.id).html(chngh.gsph(panel));
        }
        
    }

    function getOpenPanels(maxNo) {
        let openPanels = [];
        for (let i = 0; i < panelVertDivs.length; i++) {
            let panel = panelVertDivs[i];
            if (openPanels.length == maxNo) {
                break;
            }
            if (panel.open) {
                openPanels.push(panel);
            }
        }

        return openPanels;
    }


    return {

        gsph: getSidePanelHtml,
        psc: paintStockChart,

        abtpb: addBtnsToPanelBar,
        tpbb: togglePanelBarBtn,
        sb: showBar,
        // utmh: updateTickMenu,
    }
})();