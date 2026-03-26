


// ----------------- LAYOUT CODE -----------------------

var splitLayout = (function () {

    let minRowHeight = 40;

    // Function params:
    // element - parent div
    // elementName - for giving ID to children
    // layout - value is set to horizontal to create columns, else set to vertical to create rows 
    // divs - array of IDs of divs to be created
    // isCollapsable - show/hide collapse button
    function createLayout(element, elementName, layout, divs, isCollapsable) {

        if (divs.length < 1) {
            return;
        }

        let noOfDivs = divs.length;

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
            for (let i = 0; i < noOfDivs; i++) {
                // rowId = elementName + `Row` + i;
                rowId = divs[i].id;
                resizerId = elementName + `RowResizer` + i;
                collapseBtnId = elementName + `RowCollapseBtn` + i;
                if (i == 0) {
                    // Creating first child div / first row 
                    element.append(`
                    <div class='row' id='${rowId}' style='background-color: white; height: ` + rowHeight + `px; flex-grow: 1; min-height: ${minRowHeight}px;'>
                        
                    </div>
                `);

                } else if (i > 0 && i < noOfDivs - 1) {

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
                        mouseDownHandler(e);
                    });

                    element.append(`
                        <div class='row' id='${rowId}' style='background-color: white; height: ` + rowHeight + `px; min-height: ${minRowHeight}px;'>
                            
                        </div>
                    `);

                    collapseBtn = "#" + collapseBtnId;

                    // below variables should have local scope only for correct element passing to collapseDiv()
                    let row = "#" + rowId;
                    // let prevRow = "#" + elementName + `Row` + (i - 1);
                    let prevRow = "#" + divs[i - 1].id;

                    $(collapseBtn).on("click", function (e) {
                        collapseDiv(e, $(prevRow), $(row));
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
                        mouseDownHandler(e);
                    });

                    element.append(`
                        <div class='row' id='${rowId}' style='background-color: white; height: ` + rowHeight + `px; min-height: ${minRowHeight}px;'>

                        </div>
                    `);

                    // below variables should have local scope only for correct element passing to collapseDiv()
                    let row = "#" + rowId;
                    // let prevRow = "#" + elementName + `Row` + (i - 1);
                    let prevRow = "#" + divs[i - 1].id;
                    $(collapseBtn).on("click", function (e) {
                        collapseDiv(e, $(prevRow), $(row));
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
            for (let i = 0; i < noOfDivs; i++) {
                // colId = elementName + `Column` + i;
                colId = divs[i].id;
                resizerId = elementName + "ColResizer" + i;
                collapseBtnId = elementName + "ColCollapseBtn" + i;
                if (i == 0) {
                    // Appending first child div / column
                    // width = (0.70 * element.width()) i.e. 70% of parent container
                    element.append(`
                        <div class='column' id="${colId}" style='background-color: white; width: ` + (0.70 * element.width()) + `px; flex-grow: 1;'>
                            
                        </div> 
                    `);

                } else if (i > 0 && i < noOfDivs - 1) {
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
                        mouseDownHandler(e);
                    });

                    collapseBtn = "#" + collapseBtnId;

                    element.append(`
                        <div class='column' id='${colId}' style='background - color:  white; width: ` + colWidth + `px;'>
                            
                        </div>
                    `);

                    // below variables should have local scope only for correct element passing to collapseDiv()
                    let col = "#" + colId;
                    // let prevCol = "#" + elementName + `Column` + (i - 1);
                    let prevCol = "#" + divs[i - 1].id;
                    $(collapseBtn).on("click", function (e) {
                        collapseDiv(e, $(prevCol), $(col));
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
                        mouseDownHandler(e);
                    });

                    collapseBtn = "#" + collapseBtnId;


                    // Appending last child div / column
                    element.append(`
                        <div class="column" id = "${colId}" style = 'background-color: white; width: ` + colWidth + `px;'>

                        </div>
                    `);

                    // below variables should have local scope only for correct element passing to collapseDiv()
                    let col = "#" + colId;
                    // let prevCol = "#" + elementName + `Column` + (i - 1);
                    let prevCol = "#" + divs[i - 1].id;
                    $(collapseBtn).on("click", function (e) {
                        collapseDiv(e, $(prevCol), $(col));
                    });
                }
            }
        }
    }

    const mouseDownHandler = function mouseDownHandler(e) {
        // Executes, when e.currentTarget is a row resizer, otherwise else part executes for column resizer
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
                        rowMouseMoveHandler(e, rowAbove, rowBelow);
                    });
                    $(document.body).on("mouseup", mouseUpHandler);
                }
            }
        } else if ($(e.currentTarget).attr('class').toLowerCase().indexOf("col_resizer") != -1) {
            xCord = e.clientX;

            let id = "#" + e.currentTarget.id;

            if (id.toLowerCase().indexOf("collapsebtn") == -1) {
                colAfter = $(id).next()[0];
                colBefore = $(id).prev()[0];

                if (!isEmptyOrUndefined(colAfter) && !isEmptyOrUndefined(colBefore)) {
                    $(document.body).on("mousemove", (e) => {
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

    function collapseDiv(e, prevDiv, postDiv) {
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
                    mouseDownHandler(e);
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
                    mouseDownHandler(e);
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

function paintLayout() {
    // var jsu = mintJsUtil;
    // var htmlU = mintHtmlUtil;

    // let rightBarId = "tsrChNgPanelBar";
    // let bottomBarId = "tsrChNgBottomBar";
    // let leftBarId = "tsrChNgLeftBar";
    let chContainerId = "tsrChNgChartPanelContainer";

    const chContainer = $("#" + chContainerId);
    chContainer.height("100%");

    chContainer.html("");

    let layoutDivs = [
        { id: "chartWrap" },
        { id: "panelWrap" },
        // { id: "wrap" },
        // { id: "wrap2" }
    ]

    splitLayout.cl(chContainer, "container", "horizontal", layoutDivs, true);

    let panelDivs = [
        { id: "marketOverview" },
        { id: "savedSettings" },
        { id: "prevViewedStocks" },
        { id: "watchlist" },
        { id: "favSceeners" },
    ]

    const secondCol = chContainer.children(".column").last();
    splitLayout.cl(secondCol, "secondCol", "vertical", panelDivs, true);
}

