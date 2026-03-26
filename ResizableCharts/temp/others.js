
function populateLeftAndBottomBar() {
    let leftBarHtml = "";

    leftBarHtml += getScrollDivHtml(true, "y", leftBarId, "tsrChNgDrawingsMenu", 100);
    // htmlU.addMsgToDiv(leftBarId, false, leftBarHtml);
    let leftBar = document.getElementById(leftBarId);
    leftBar.innerHTML = leftBarHtml;

    let bottomBarHtml = "";
    bottomBarHtml += getScrollDivHtml(true, "x", bottomBarId, "tsrChNgTickMenu", 50);
    bottomBarHtml += getScrollDivHtml(true, "x", bottomBarId, "tsrChNgIndiMenu", 50);
    bottomBarHtml += getScrollDivHtml(true, "x", bottomBarId, "tsrChNgTimeFrameMenu", 50);
    let bottomBar = document.getElementById(bottomBarId);
    bottomBar.innerHTML = bottomBarHtml;
    // htmlU.addMsgToDiv(bottomBarId, true, bottomBarHtml);

    addBtnsToScrollDivs('tsrChNgDrawingsMenu', drawingBtns);
    addBtnsToScrollDivs('tsrChNgTickMenu', tickBtns);
    addBtnsToScrollDivs('tsrChNgIndiMenu', indiBtns);
    addBtnsToScrollDivs('tsrChNgTimeFrameMenu', timeFrameButtons);
}

function addBtnsToPanelBar(btns, panelIdPrefix) {
    // let rightColDiv = document.getElementById(rightColId);

    var html = "";
    let openBoxCount = 0;
    let openBoxes = [];
    // PANEL BUTTONS
    html += `<div class="d-flex flex-column align-items-center">`
    for (let i = 0; i < btns.length; i++) {
        let btn = btns[i];
        if (btn.open) {
            openBoxCount++;
            let rowId = panelIdPrefix + openBoxCount;
            openBoxes.push({ "rowId": rowId, "btnId": btn.id });
        }
        html += `<button class="btn" id="${btn.id}" title="${btn.title}"  onclick="togglePanelBarBtn('${btn.id}'); chooseLayout(9);">`
        html += btn.html;
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
                    <li><a class="dropdown-item" onclick="showBar(this, '${leftBarId}')">Left Bar</a></li>
                    <li><a class="dropdown-item" onclick="showBar(this, '${bottomBarId}')">Bottom Bar</a></li>
                    <li><a class="dropdown-item" >More Settings</a></li>
                </ul>
            </div>
        `;
    htmlU.addMsgToDiv(rightBarId, true, html);

    return openBoxes;
}

function togglePanelBarBtn(btnId) {
    let currBtn = jsu.getObjFrmArr(panelBtns, btnId);

    currBtn.open = !currBtn.open;
}

function getSidePanelHtml(panel) {
    let btnId = panel.btnId;
    let rowId = panel.rowId;


    if (btnId == "marketOverview") {
        return paintMarketOverviewPanel(rowId);
    } else if (btnId == "savedSettings") {
        return paintSavedSettingsPanel(rowId);
    } else if (btnId == "watchlist") {
        return paintWatchlistPanel(rowId);
    } else if (btnId = "screeners") {
        return paintFavScrPanel(rowId);
    } else {
        return null;
    }
}

function getScrollDivHtml(hasBtns, scrollDir, containerId, divId, scrollBy) {

    let html = "";

    let container = document.getElementById(containerId);
    container.classList.add("tsrChNgScrollDivContainer");
    container.style.display = "none";


    // if (scrollDir == "horizontal" || scrollDir == "x") {
    //     container.classList.add("justify-content-between");
    // } else if (scrollDir == "vertical" || scrollDir == "y") {
    //     container.classList.add("flex-column", "justify-content-between");
    // }

    // if (hasBtns) {
    //     html += `<div class="d-flex">`
    // }

    scrollDir.toLowerCase();
    if (scrollDir == "horizontal" || scrollDir == "x") {
        if (hasBtns) {
            html += `<button class="scrollBtn" onclick="scrollDiv('${scrollDir}', ${scrollBy * -1}, '${divId}')"  style="width: 25px;">`
            html += `   <i class="fas fa-chevron-left"></i>`
            html += `</button>`
        }
    } else if (scrollDir == "vertical" || scrollDir == "y") {
        if (hasBtns) {
            html += `<button class="scrollBtn" onclick="scrollDiv('${scrollDir}', ${scrollBy * -1}, '${divId}')"  style="width: 100%;">`
            html += `   <p style="transform: rotate(90deg);margin: 0;">`
            html += `       <i class="fas fa-chevron-left"></i>`
            html += `   </p>`
            html += `</button>`
        }
    }

    if (scrollDir == "horizontal" || scrollDir == "x") {
        // html += `<div id="${divId}" class="d-flex tsrChNgScrollDiv" style="width: calc(100% - 40px); overflow-y: hidden; overflow-x: auto;" >`;
        html += `<div id="${divId}" class="d-flex tsrChNgScrollDiv" style="overflow-y: hidden; overflow-x: auto;" >`;
        html += `</div>`;
    }
    else if (scrollDir == "vertical" || scrollDir == "y") {
        html += `<div id="${divId}" class="d-flex flex-column tsrChNgScrollDiv" style="height: calc(100% - 60px); overflow-y: auto; overflow-x: hidden;" >`;

        html += `</div>`;
    }


    if (scrollDir == "horizontal" || scrollDir == "x") {
        if (hasBtns) {
            html += `<button class="scrollBtn" onclick="scrollDiv('${scrollDir}', ${scrollBy}, '${divId}')" style="width: 25px;">`
            html += `   <i class="fas fa-chevron-right"></i>`
            html += `</button>`
        }
    } else if (scrollDir == "vertical" || scrollDir == "y") {
        if (hasBtns) {
            html += `<button class="scrollBtn" onclick="scrollDiv('${scrollDir}', ${scrollBy * 1}, '${divId}')"  style="width: 100%;">`
            html += `   <p style="transform: rotate(90deg); margin: 0;">`
            html += `       <i class="fas fa-chevron-right"></i>`
            html += `   </p>`
            html += `</button>`
        }
    }

    // if (hasBtns) {
    //     html += `</div>`;
    // }

    // htmlU.addMsgToDiv(containerId, true, html);
    return html;

}

function scrollDiv(scrollDir, scrollBy, divId) {
    let div = document.getElementById(divId);
    scrollDir.toLowerCase();

    if (scrollDir == "horizontal" || scrollDir == "x") {
        div.scrollBy({
            "left": scrollBy,
        })
    } else if (scrollDir == "vertical" || scrollDir == "y") {
        div.scrollBy({
            "top": scrollBy,
        })
    }
}

function showBar(btn, barId) {
    btn.classList.toggle("tsrChNgActive");

    let bar = document.getElementById(barId);
    if (bar.style.display == "flex") {
        bar.style.display = "none";
    } else {
        let container = document.getElementById(chContainerId);
        bar.style.display = "flex";
        if (barId == leftBarId) {
            let boundingRect = container.getBoundingClientRect();
            container.style.width = (boundingRect.width - 50) + "px"; // to allocate space for left bar
        } else if (barId == bottomBarId) {
            let parent = container.parentElement;
            let boundingRect = parent.getBoundingClientRect();
            parent.style.height = (boundingRect.height - 50) + "px"; // to allocate space for bottom bar
        }
    }

    // htmlU.showDiv(barId);
}

// ---------------- LEFT, BOTTOM BAR HTML CODE ----------------------



function addBtnToLeftBar() {
    var html = "";

    for (let i = 0; i < leftBarBtns.length; i++) {
        let btn = leftBarBtns[i];

        html += `<button class="btn">`
        html += btn.label;
        html += `</button>`
    }
    html += `</div>`;

    htmlU.addMsgToDiv("tsrChNgLeftBarMenu", true, html);
}

function addBtnsToScrollDivs(divId, btns) {
    var html = "";

    for (let i = 0; i < btns.length; i++) {
        let btn = btns[i];

        html += `<button class="btn">`
        html += btn.label;
        html += `</button>`
    }

    htmlU.addMsgToDiv(divId, true, html);
}
