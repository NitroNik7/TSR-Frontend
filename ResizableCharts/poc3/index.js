

let chContainerId = "tsrChNgChartPanelContainer";

const container = $("#" + chContainerId);
container.height("100%");

var jsu = mintJsUtil;
var htmlU = mintHtmlUtil;

let rightBarId = "tsrChNgPanelBar";
let bottomBarId = "tsrChNgBottomBar";
let leftBarId = "tsrChNgLeftBar";

// ----------------- LAYOUT CODE -----------------------

var splitLayout = (function () {

    let minRowHeight = 40;

    // Function params:
    // element - parent div
    // elementName - for giving ID to children
    // layout - value is set to horizontal to create columns, else set to vertical to create rows 
    // noOfDivs - no. of children to be created
    function createLayout(element, elementName, layout, noOfDivs, isCollapsable, callback) {
        if (layout == "vertical") { // vertical layout
            element.css({
                "display": "flex",
                "flex-direction": "column"
            });
            let rowId;
            let resizer, resizerId;
            let collapseBtn, collapseBtnId;

            let resizerHeight = 3;  // should match with .row_resizer CSS
            let rowHeight = (element.height() - (noOfDivs - 1) * resizerHeight) / noOfDivs;
            for (let i = 1; i <= noOfDivs; i++) {
                rowId = elementName + `Row` + i;
                resizerId = elementName + `RowResizer` + i;
                collapseBtnId = elementName + `RowCollapseBtn` + i;
                if (i == 1) {
                    // Creating first child div / first row 
                    element.append(`
                    <div class='row' id='${rowId}' style='background-color: white; height: ` + rowHeight + `px; flex-grow: 1; min-height: ${minRowHeight}px;'>
                        
                    </div>
                `);

                } else if (i > 1 && i < noOfDivs) {

                    // Creating resizer with collapseBtn and subsequent child div /  middle row 
                    if (isCollapsable) {
                        element.append(`
                            <div class='row_resizer' id='${resizerId}'>
                                <button class="collapse_btn" id='${collapseBtnId}' style='padding: 5px 5px 15px 5px;'>
                                    <i class="fas fa-caret-down"></i>
                                </button>
                            </div>
                        `);
                    } else {
                        element.append(`
                            <div class='row_resizer' id='${resizerId}'>
                            </div>
                        `);
                    }
                    resizer = "#" + resizerId;

                    $(resizer).on("mousedown", function (e) {
                        mouseDownHandler(e, callback);
                        if (!isEmptyOrUndefined(callback)) {
                            callback();
                        }
                    });

                    element.append(`
                        <div class='row' id='${rowId}' style='background-color: white; height: ` + rowHeight + `px; min-height: ${minRowHeight}px;'>
                            
                        </div>
                    `);

                    collapseBtn = "#" + collapseBtnId;

                    // below variables should have local scope only for correct element passing to collapseDiv()
                    let row = "#" + rowId;
                    let prevRow = "#" + elementName + `Row` + (i - 1);

                    $(collapseBtn).on("click", function (e) {
                        collapseDiv(e, $(prevRow), $(row), callback);
                    });
                } else {
                    // Creating last child div / bottom row 
                    if (isCollapsable) {
                        element.append(`
                            <div class='row_resizer' id='${resizerId}'>
                                <button class="collapse_btn" id='${collapseBtnId}'  style='padding: 5px 5px 15px 5px;'>
                                    <i class="fas fa-caret-down"></i>
                                </button>
                            </div>
                        `);
                    } else {
                        element.append(`
                            <div class='row_resizer' id='${resizerId}'>
                            </div>
                        `);
                    }

                    resizer = "#" + resizerId;
                    collapseBtn = "#" + collapseBtnId;

                    $(resizer).on("mousedown", function (e) {
                        mouseDownHandler(e, callback);
                        if (!isEmptyOrUndefined(callback)) {
                            callback();
                        }
                    });

                    element.append(`
                        <div class='row' id='${rowId}' style='background-color: white; height: ` + rowHeight + `px; min-height: ${minRowHeight}px;'>

                        </div>
                    `);

                    // below variables should have local scope only for correct element passing to collapseDiv()
                    let row = "#" + rowId;
                    let prevRow = "#" + elementName + `Row` + (i - 1);

                    $(collapseBtn).on("click", function (e) {
                        collapseDiv(e, $(prevRow), $(row), callback);
                    });
                }
            }
        } else { // horizontal layout 
            element.css({
                "display": "flex"
            });

            let resizerWidth = 3; // should match with .col_resizer CSS

            let elementWidth = (0.30 * element.width()) - (noOfDivs - 1) * resizerWidth; // width = 30% of parent container - (7 * no of resizers)
            // let elementWidth = element.width() - ((noOfDivs - 1) * 7);

            let colWidth = elementWidth / (noOfDivs - 1);
            let colId;
            let resizer, resizerId;
            let collapseBtn, collapseBtnId;
            for (let i = 1; i <= noOfDivs; i++) {
                colId = elementName + `Column` + i;
                resizerId = elementName + "ColResizer" + i;
                collapseBtnId = elementName + "ColCollapseBtn" + i;
                if (i == 1) {
                    // Appending first child div / column
                    // width = (0.70 * element.width()) i.e. 70% of parent container
                    element.append(`
                        <div class='column' id="${colId}" style='background-color: white; width: ` + (0.70 * element.width()) + `px; flex-grow: 1;'>
                            
                        </div> 
                    `);

                } else if (i > 1 && i < noOfDivs) {
                    // Appending resizer and collapseBtn and subsequent child div / middle column
                    element.append(`
                            <div class='col_resizer' id="${resizerId}">
                                <button class="collapse_btn" id="${collapseBtnId}"  style='left: 10px;'>
                                    <i class="fas fa-caret-right"></i>
                                </button>
                            </div>
                        `);
                    resizer = "#" + resizerId;
                    $(resizer).on("mousedown", function (e) {
                        mouseDownHandler(e, callback);
                        if (!isEmptyOrUndefined(callback)) {
                            callback();
                        }
                    });

                    collapseBtn = "#" + collapseBtnId;

                    element.append(`
                        <div class='column' id='${colId}' style='background - color:  white; width: ` + colWidth + `px;'>
                            
                        </div>
                    `);

                    // below variables should have local scope only for correct element passing to collapseDiv()
                    let col = "#" + colId;
                    let prevCol = "#" + elementName + `Column` + (i - 1);
                    $(collapseBtn).on("click", function (e) {
                        collapseDiv(e, $(prevCol), $(col), callback);
                    });
                } else {
                    resizerId = elementName + "ColResizer" + i;
                    collapseBtnId = elementName + "ColCollapseBtn" + i;

                    // Appending last resizer and collapseBtn
                    element.append(`
                        <div class="col_resizer" id = "${resizerId}"> 
                            <button class="collapse_btn" id="${collapseBtnId}"  style='left: 10px;'>
                                <i class="fas fa-caret-right"></i>
                            </button>
                        </div>
                    `);

                    resizer = "#" + resizerId;
                    $(resizer).on("mousedown", function (e) {
                        mouseDownHandler(e, callback);
                        if (!isEmptyOrUndefined(callback)) {
                            callback();
                        }
                    });

                    collapseBtn = "#" + collapseBtnId;


                    // Appending last child div / column
                    element.append(`
                        <div class="column" id = "${colId}" style = 'background-color: white; width: ` + colWidth + `px;'>

                        </div>
                    `);

                    // below variables should have local scope only for correct element passing to collapseDiv()
                    let col = "#" + colId;
                    let prevCol = "#" + elementName + `Column` + (i - 1);
                    $(collapseBtn).on("click", function (e) {
                        collapseDiv(e, $(prevCol), $(col), callback);
                    });
                }
            }
        }
    }

    // TODO: recheck
    const mouseDownHandler = function mouseDownHandler(e, callback) {
        // Executes, when e.currentTarget is a row resizer, otherwise else part executes for column resizer
        // TODO Check condition
        if ($(e.currentTarget).attr('class').toLowerCase().indexOf("row_resizer") != -1) {
            yCord = e.clientY;

            let id = "#" + e.currentTarget.id;

            // execute only when, mousedown target is not collapseBtn
            if (id.toLowerCase().indexOf("collapsebtn") == -1) {
                rowBelow = $(id).next()[0];
                rowAbove = $(id).prev()[0];
                if (rowBelow.offsetHeight == 0)
                    return;

                if (!isEmptyOrUndefined(rowAbove) && !isEmptyOrUndefined(rowBelow)) {
                    $(document.body).on("mousemove", (e) => {
                        if (!isEmptyOrUndefined(callback)) {
                            callback();
                        }
                        rowMouseMoveHandler(e, rowAbove, rowBelow);
                    });
                    $(document.body).on("mouseup", mouseUpHandler);
                }
            }
        } else {
            xCord = e.clientX;

            let id = "#" + e.currentTarget.id;

            if (id.toLowerCase().indexOf("collapsebtn") == -1) {
                colAfter = $(id).next()[0];
                colBefore = $(id).prev()[0];

                if (!isEmptyOrUndefined(colAfter) && !isEmptyOrUndefined(colBefore)) {
                    $(document.body).on("mousemove", (e) => {
                        if (!isEmptyOrUndefined(callback)) {
                            callback();
                        }
                        colMouseMoveHandler(e, colAfter, colBefore);
                    });
                    $(document.body).on("mouseup", mouseUpHandler);
                }

            }
        }
    }

    const rowMouseMoveHandler = function (e, rowAbove, rowBelow) {
        let dy = yCord - e.clientY;

        rowAbove.style.transition = 'none';
        rowBelow.style.transition = 'none';

        let newRowAboveHeight, newRowBelowHeight;

        newRowAboveHeight = rowAbove.offsetHeight - dy + 'px';
        newRowBelowHeight = rowBelow.offsetHeight + dy + 'px';

        rowAbove.style.height = newRowAboveHeight;
        rowBelow.style.height = newRowBelowHeight;

        yCord = e.clientY;
    }

    const colMouseMoveHandler = function (e, colAfter, colBefore) {
        let dx = xCord - e.clientX;

        colAfter.style.transition = 'none';
        colBefore.style.transition = 'none';
        let newColAfterWidth, newColBeforeWidth;

        newColBeforeWidth = colBefore.offsetWidth - dx + 'px';
        newColAfterWidth = colAfter.offsetWidth + dx + 'px';

        colBefore.style.width = newColBeforeWidth;
        colAfter.style.width = newColAfterWidth;

        xCord = e.clientX;
    }

    const mouseUpHandler = () => {
        $(document.body).off("mousemove");
        $(document.body).off("mouseup");
    }

    function collapseDiv(e, prevDiv, postDiv, callback) {
        let collapseBtn = $(`#${e.currentTarget.id}`)[0];

        postDiv.css({
            transition: "0.2s ease"
        });
        prevDiv.css({
            transition: "0.2s ease"
        });

        let newPrevDivWidth, newPostDivWidth;
        let newPrevDivHeight, newPostDivHeight;


        // Optimize condition
        if (prevDiv.attr("class").indexOf("col") != -1 && postDiv.attr("class").indexOf("col") != -1) { // if col_resizer

            // 300px width TBD when div is expanded
            if (postDiv.width() == 0) { // if div is collapsed

                collapseBtn.innerHTML = '<i class="fas fa-caret-right"></i>';
                newPrevDivWidth = (0.70 * prevDiv.width()) + 'px';
                newPostDivWidth = (0.30 * prevDiv.width()) + 'px';

                prevDiv.width(newPrevDivWidth);
                postDiv.width(newPostDivWidth);

                prevDiv.css("z-index", "unset");
                postDiv.css("z-index", "unset");

                prevDiv.next().css("z-index", "1");

                collapseBtn.style.left = "10px";

                prevDiv.next().on("mousedown", function (e) {
                    mouseDownHandler(e, callback);
                    if (!isEmptyOrUndefined(callback)) {
                        callback();
                    }
                });
            } else { // if div is already open
                collapseBtn.innerHTML = '<i class="fas fa-caret-left"></i>';
                newPrevDivWidth = prevDiv.width() + postDiv.width() + 'px';
                newPostDivWidth = '0px';

                prevDiv.width(newPrevDivWidth);
                prevDiv.css("z-index", "2");
                postDiv.width(newPostDivWidth);
                postDiv.css("z-index", "1");

                collapseBtn.style.left = "-10px";


                prevDiv.next().css("z-index", "2");
                prevDiv.next().off("mousedown");
            }
        } else {
            // Collapse div functionality for vertical divs to be implemented...
            // Height TBD when div is expanded
            if (postDiv.height() == minRowHeight) {
                collapseBtn.innerHTML = '<i class="fas fa-caret-down"></i>';

                newPrevDivHeight = (0.50 * prevDiv.height()) + 'px';
                newPostDivHeight = (0.50 * prevDiv.height()) + 'px';

                prevDiv.height(newPrevDivHeight);
                postDiv.height(newPostDivHeight);

                collapseBtn.style.top = "0px";

                prevDiv.next().on("mousedown", function (e) {
                    mouseDownHandler(e, callback);
                    if (!isEmptyOrUndefined(callback)) {
                        callback();
                    }
                });


            } else { // If div is expanded
                collapseBtn.innerHTML = '<i class="fas fa-caret-up"></i>';

                newPrevDivHeight = prevDiv.height() + postDiv.height() + 'px';
                newPostDivHeight = '0px';

                postDiv.height(newPostDivHeight);
                prevDiv.height(newPrevDivHeight);

                collapseBtn.style.top = "-20px";

                prevDiv.next().off("mousedown");
            }
        }

        if (!isEmptyOrUndefined(callback)) {
            setTimeout(function () {
                callback();
            }, 200); // timeout required as we have given transition 0.2s to div's
        }
    }

    function isEmptyOrUndefined(obj) {
        if (obj === undefined) {
            return true;
        } else if (obj === null) {
            return true;
        } else if (obj instanceof HTMLElement) {
            return false;
        }

        return false;
    }

    return {
        cl: createLayout,
    }
})();

function paintLayout(id) {
    container.html("");
    // container.height("80vh");
    /*
        if (id === 1) {
            splitLayout.cl(container, "container", "horizontal", 1);
        }

        if (id === 2) {
            splitLayout.cl(container, "container", "horizontal", 2);
        }

        if (id === 3) {
            splitLayout.cl(container, "container", "vertical", 2);
        }

        if (id === 4) {
            splitLayout.cl(container, "container", "vertical", 3);
        }


        if (id === 5) {
            splitLayout.cl(container, "container", "horizontal", 3);
        }

        if (id === 6) {
            splitLayout.cl(container, "container", "horizontal", 2);

            // const child = container.children(".column").first();
            // splitLayout.cd(child, "child", "horizontal", 2);

            const grandChild = container.children(".column").last();
            splitLayout.cl(grandChild, "grandchild", "vertical", 2);
        }

        if (id === 7) {
            splitLayout.cl(container, "container", "vertical", 2);

            const child = container.children(".row").last();
            splitLayout.cl(child, "child", "horizontal", 2);
        }

        if (id == 8) {
            splitLayout.cl(container, "container", "vertical", 2);

            const firstRow = container.children(".row").first();
            splitLayout.cl(firstRow, "firstRow", "horizontal", 2);

            const secondRow = container.children(".row").last();
            splitLayout.cl(secondRow, "secondRow", "horizontal", 2);
        }
    */

    if (id == 9) {
        let openPanels = addBtnsToPanelBar(panelBtns, "secondColRow");

        if (openPanels.length > 0) {
            splitLayout.cl(container, "container", "horizontal", 2);

            const secondCol = container.children(".column").last();
            splitLayout.cl(secondCol, "secondCol", "vertical", openPanels.length, false);

            for (let i = 0; i < openPanels.length; i++) {
                let panel = openPanels[i];
                let html = getSidePanelHtml(panel);

                if (jsu.isNotNull(html)) {
                    htmlU.addMsgToDiv(panel.rowId, true, html);
                }
            }
        }

        htmlU.addMsgToDiv('containerColumn1', true, `
            <div id='chartWrap'>
                <div id = 'tsrchart' style="font-size : 10px; width : 100%"> 
                </div>
            </div>
        `);

        populateLeftAndBottomBar();
    }

    if (id == 10) {
        splitLayout.cl(container, "container", "horizontal", 2);

        const secondCol = container.children(".column").last();
        splitLayout.cl(secondCol, "secondCol", "vertical", 3, false);
    }
}

function populateLeftAndBottomBar() {
    let leftBarHtml = "";

    leftBarHtml += getScrollDivHtml(true, "y", leftBarId, "tsrChNgDrawingsMenu", 100);
    // htmlU.addMsgToDiv(leftBarId, false, leftBarHtml);
    let leftBar = document.getElementById(leftBarId);
    leftBar.innerHTML = leftBarHtml;

    let bottomBarHtml = "";
    let maxWidth = 100 / 3 + "%"; // IN % or px
    bottomBarHtml += getScrollDivHtml(true, "x", bottomBarId, "tsrChNgTickMenu", 50, maxWidth);
    bottomBarHtml += getScrollDivHtml(true, "x", bottomBarId, "tsrChNgIndiMenu", 50, maxWidth);
    bottomBarHtml += getScrollDivHtml(true, "x", bottomBarId, "tsrChNgTimeFrameMenu", 50, maxWidth);
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
        html += `<button class="btn" id="${btn.id}" title="${btn.title}"  onclick="togglePanelBarBtn('${btn.id}'); paintLayout(9);">`
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

function getScrollDivHtml(hasBtns, scrollDir, containerId, divId, scrollBy, maxWidth) {

    let html = "";

    let container = document.getElementById(containerId);
    container.classList.add("tsrChNgScrollDivContainer");
    container.style.display = "none";


    // if (scrollDir == "horizontal" || scrollDir == "x") {
    //     container.classList.add("justify-content-between");
    // } else if (scrollDir == "vertical" || scrollDir == "y") {
    //     container.classList.add("flex-column", "justify-content-between");
    // }

    if (hasBtns) {
        html += `<div class="d-flex tsrChNgScrollDiv" style="width: max-content; max-width: ${maxWidth};">`
    }

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
        html += `<div id="${divId}" class="d-flex flex-column " style="height: calc(100% - 60px); overflow-y: auto; overflow-x: hidden;" >`;

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

    if (hasBtns) {
        html += `</div>`;
    }

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
        let container = document.getElementById(chContainerId);
        bar.style.display = "none";
        // if (barId == bottomBarId) {
        //     let parent = container.parentElement;
        //     let boundingRect = parent.getBoundingClientRect();
        //     parent.style.height = (boundingRect.height + 50) + "px"; // to allocate space for bottom bar
        // }
    } else {
        let container = document.getElementById(chContainerId);
        bar.style.display = "flex";
        // if (barId == leftBarId) {
        //     let boundingRect = container.getBoundingClientRect();
        //     container.style.width = (boundingRect.width - 50) + "px"; // to allocate space for left bar
        // } else
        if (barId == bottomBarId) {
            let parent = container.parentElement;
            let boundingRect = parent.getBoundingClientRect();
            parent.style.height = (boundingRect.height - 50) + "px"; // to allocate space for bottom bar
        }
    }
}

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

function paintSavedSettingsPanel(panelId) {
    let html = "";

    // let mySettings = chartDetails.MySettings;
    let mySettings = [];
    let height = $("#" + panelId).height() - 50;

    html += `<div class="card p-0 m-0">`
    html += `    <div class="card-header py-2 px-0" style="text-align: center; overflow: hidden;">`
    html += `       <b>Saved Settings</b>`
    html += `    </div>`
    html += `    <div class="card-body p-0"  style="height: ${height}px; overflow-y: auto;">`
    html += `       <table class="table table-striped table-hover table-sm">`
    html += `           <tbody>`
    if (mySettings.length > 0) {
        for (let i = 0; i < mySettings.length; i++) {
            let setting = mySettings[i];
            html += `           <tr>`
            html += `               <td>${setting.name}</td>`;
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

