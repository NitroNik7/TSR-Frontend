
// ---------------- PANEL HTML CODE -----------------------

function paintMarketOverviewPanel(infoBoxRowId) {
    let html = "";

    let height = $("#" + infoBoxRowId).height() - 50;

    let radioVal = htmlU.getRadioVal("marketOverview");
    if (jsu.isNull(radioVal)) {
        radioVal = "gainers";
    }

    html += `<div class="card p-0 m-0">`

    html += `    <div class="card-header py-2 px-0" style="text-align: center; overflow: hidden;">`
    html += `       <b>Market Overview</b>`
    html += `    </div>`

    html += `    <div class="card-body p-0"  style="height: ${height}px; overflow-y: auto;">`
    html += `       <div>`
    for (let i = 0; i < marketOverviewDef.length; i++) {
        let cat = marketOverviewDef[i];
        if (cat.id == radioVal) {
            html += `       <input type="radio" name="marketOverview" id="${cat.id}" value="${cat.id}" checked onclick="paintMarketOverviewPanel('${infoBoxRowId}')">`
        } else {
            html += `       <input type="radio" name="marketOverview" id="${cat.id}" value="${cat.id}" onclick="paintMarketOverviewPanel('${infoBoxRowId}')">`
        }
        html += `           <label for="${cat.id}">${cat.label}</label>`
    }
    html += `       </div>`

    let cat = jsu.getObjFrmArr(marketOverviewDef, radioVal);
    if (jsu.isNotNull(cat)) {
        let stockList = cat.list;
        html += `       <table class="table table-striped table-hover table-sm table-responsive">`
        html += `           <thead>`
        html += `               <tr>`
        html += `                   <th>Stock</th>`
        html += `                   <th>   </th>`
        html += `                   <th>   </th>`
        html += `                   <th>Price</th>`
        html += `                   <th>Change %</th>`
        html += `                   <th>Open</th>`
        html += `                   <th>High</th>`
        html += `                   <th>Low</th>`
        html += `               </tr>`
        html += `           </thead>`
        html += `           <tbody>`
        for (let i = 0; i < stockList.length; i++) {
            let stock = stockList[i];
            html += `           <tr>`
            html += `               <td>${stock.label}</td>`
            html += `               <td><a href="" title="View Chart"><i class="fas fa-chart-line"></i></a></td>`
            html += `               <td><a href="" title="View Analysis"><i class="fas fa-eye"></i></a></td>`
            html += `               <td>${stock.price}</td>`
            html += `               <td>${stock.chgPc}</td>`
            html += `               <td>${stock.open}</td>`
            html += `               <td>${stock.high}</td>`
            html += `               <td>${stock.low}</td>`
            html += `           </tr>`
        }
        html += `               `
        html += `           </tbody>`
        html += `       </table>`
    }


    html += `    </div>`

    html += `</div>`

    htmlU.addMsgToDiv(infoBoxRowId, true, html);
}

function paintSavedSettingsPanel(infoBoxRowId) {
    let html = "";

    let height = $("#" + infoBoxRowId).height() - 50;

    html += `<div class="card p-0 m-0">`
    html += `    <div class="card-header py-2 px-0" style="text-align: center; overflow: hidden;">`
    html += `       <b>Saved Settings</b>`
    html += `    </div>`
    html += `    <div class="card-body p-0"  style="height: ${height}px; overflow-y: auto;">`
    html += `       <table class="table table-striped table-hover table-sm">`
    html += `           <tbody>`
    for (let i = 0; i < mySettings.length; i++) {
        let setting = mySettings[i];
        html += `           <tr>`
        html += `               <td>${setting.label}</td>`;
        html += `               <td>
                                    <a onclick="${setting.func}" style="font-size:16px;color:#0d6efd;" title="View Chart"><i class="fas fa-chart-line"></i></a>
                                </td>`
        html += `           </tr>`
    }
    html += `           </tbody>`
    html += `       </table>`
    html += `    </div>`
    // html += `    <div class="card-footer" style="text-align: center; overflow: hidden;">`
    // html += `    </div>`
    html += `</div>`

    return html;

}

function paintWatchlistPanel(infoBoxRowId) {
    let html = "";

    let wlSelectId = "tsrChWlSelect"
    let wlSelect = document.getElementById(wlSelectId);
    let wlId;

    if (jsu.isNotNull(wlSelect)) {
        wlId = wlSelect.value;
    }

    if (watchlists.length > 0) {
        if (jsu.isNull(wlId)) {
            wlId = watchlists[0].id;
        }
    }

    let height = $("#" + infoBoxRowId).height() - 60;

    html += `<div class="card p-0 m-0">`
    html += `    <div class="card-header d-flex justify-content-evenly align-items-center px-0 py-2" style="text-align: center; overflow: hidden;">`
    html += `       <b class="px-2">Watchlist</b>`
    if (watchlists.length > 0) {
        html += `       <select id="${wlSelectId}" class="form-select ms-3" onchange="paintWatchlistPanel('${infoBoxRowId}')" style="width: max-content;">`
        for (let i = 0; i < watchlists.length; i++) {
            let wl = watchlists[i];
            if (wl.id == wlId) {
                html += `       <option value="${wl.id}" selected>${wl.label}</option>`
            } else {
                html += `       <option value="${wl.id}">${wl.label}</option>`
            }
        }
        html += `       </select>`
    }

    html += `    </div>`
    html += `    <div class="card-body p-0"  style="height: ${height}px; overflow-y: auto;">`
    if (watchlists.length > 0) {
        html += `       <table class="table table-striped table-hover table-sm" style="text-wrap: nowrap;">`
        html += `           <thead>`
        html += `               <tr>`
        html += `                   <th>Stock</th>`
        html += `                   <th>   </th>`
        html += `                   <th>   </th>`
        html += `                   <th>Price</th>`
        html += `                   <th>Change %</th>`
        html += `                   <th>Open</th>`
        html += `                   <th>High</th>`
        html += `                   <th>Low</th>`
        html += `               </tr>`
        html += `           </thead>`
        html += `           <tbody>`
        for (let i = 0; i < watchlists.length; i++) {
            let wl = watchlists[i];
            if (wl.id == wlId) {
                if (wl.list.length > 0) {
                    for (let j = 0; j < wl.list.length; j++) {
                        let stock = wl.list[j];
                        html += `           <tr>`
                        html += `               <td> ${stock.label} </td>`;
                        html += `               <td><a href="" title="View Chart"><i class="fas fa-chart-line"></i></a></td>`
                        html += `               <td><a href="" title="View Analysis"><i class="fas fa-eye"></i></a></td>`
                        html += `               <td>${stock.price}</td>`
                        html += `               <td>${stock.chgPc}</td>`
                        html += `               <td>${stock.open}</td>`
                        html += `               <td>${stock.high}</td>`
                        html += `               <td>${stock.low}</td>`
                        html += `           </tr>`
                    }
                } else {
                    html += `<tr style="text-align: center;">`
                    html += `   <td colspan='8'>No Stocks</td>`
                    html += `</tr>`
                    html += `<tr style="text-align: center;">`
                    html += `   <td colspan='8'>`
                    html += `       <a class="btn btn-sm btn-secondary mx-auto" style="width: max-content;" href="">`
                    html += `           Edit Watchlist &nbsp;<i class="fas fa-external-link-alt"></i>`
                    html += `       </a>`
                    html += `   </td>`
                    html += `</tr>`
                }
            }
        }
        html += `           </tbody>`
        html += `       </table>`
    } else {
        html += `   <div class="d-flex flex-column  justify-content-center h-100 text-center">`
        html += `       <p style="margin: 0; font-weight: lighter; ">You don't have any watchlist</p>`
        html += `       <a class="btn btn-sm btn-secondary mx-auto" style="width: max-content;" href="">`
        html += `           Create Watchlist &nbsp;<i class="fas fa-external-link-alt"></i>`
        html += `       </a>`
        html += `   </div>`

    }
    html += `    </div>`
    // html += `    <div class="card-footer" style="text-align: center; overflow: hidden;">`
    // html += `    </div>`
    html += `</div>`

    htmlU.addMsgToDiv(infoBoxRowId, true, html);
    // return html;
}

function paintFavScrPanel(infoBoxRowId) {
    let html = "";

    let height = $("#" + infoBoxRowId).height() - 50;

    html += `<div class="card p-0 m-0">`
    html += `    <div class="card-header d-flex justify-content-evenly align-items-center px-0 py-2" style="text-align: center; overflow: hidden;">`
    html += `       <b class="px-2">Favourite Screeners</b>`

    let favScrSelectId = "tsrChWlSelect"
    let favScrSelect = document.getElementById(favScrSelectId);
    let scrId;

    if (favScreenersDef.length > 0) {
        if (jsu.isNull(scrId)) {
            scrId = watchlists[0].id;
        }
    }

    if (jsu.isNotNull(favScrSelect)) {
        scrId = favScrSelect.value;
    }


    if (favScreenersDef.length > 0) {
        html += `   <select class="form-select ms-3" onchange="paintPrCrScrPanel('${infoBoxRowId}')" style="width: max-content;">`
        for (let i = 0; i < favScreenersDef.length; i++) {
            let scr = favScreenersDef[i];
            if (scr.id == scrId) {
                html += `<option value="${scr.id}" selected>${scr.label}</option>`
            } else {
                html += `<option value="${scr.id}">${scr.label}</option>`
            }
        }
        html += `   </select>`
    }

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

    return html;
}
