

var jsu = mintJsUtil;
var htmlU = mintHtmlUtil;

let rightBarId = "tsrRcLayoutBar";
let bottomBarId = "tsrRcBottomBar";
let leftBarId = "tsrRcLeftBar";

let chContainerId = "chPanelContainer";

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


const container = $("#" + chContainerId);
container.height("100%");

let boxBtns = [
    {
        id: "mySettings", label: "My Settings", title: "My settings", open: true, html: `<i class="fas fa-cogs"></i>`
    },
    { id: "watchlist", label: "Watchlist", title: "Watchlist", open: true, html: `<svg height="32" viewBox="0 0 288 288" fill="#2a2c2d" xmlns="http://www.w3.org/2000/svg"><g><path d="M118.688 68.0625V33.75H127.125C131.788 33.75 135.562 29.9756 135.562 25.3125V8.4375C135.562 3.77438 131.788 0 127.125 0H42.75C38.0869 0 34.3125 3.77438 34.3125 8.4375V25.3125C34.3125 29.9756 38.0869 33.75 42.75 33.75H51.1875V68.0625H118.688ZM152.438 76.5C152.438 71.7739 148.726 68.0625 144 68.0625C139.274 68.0625 135.562 71.7739 135.562 76.5V84.9375H152.438V76.5ZM135.562 177.75C135.562 182.474 139.274 186.188 144 186.188C148.726 186.188 152.438 182.474 152.438 177.75V169.312H135.562V177.75ZM237.375 68.0625V33.75H245.812C250.476 33.75 254.25 29.9756 254.25 25.3125V8.4375C254.25 3.77438 250.476 0 245.812 0H160.875C156.212 0 152.438 3.77438 152.438 8.4375V25.3125C152.438 29.9756 156.212 33.75 160.875 33.75H169.312V68.0625H237.375ZM118.688 220.5V169.312H135.562V84.9375H42.75C38.8699 84.9375 35.4949 87.6375 34.6511 91.3489L1.85625 220.5H118.688ZM169.312 169.312V220.5H286.144L253.911 91.3489C253.068 87.6381 249.693 84.9375 245.812 84.9375H152.438V169.312H169.312ZM0 279.562C0 284.226 3.77438 288 8.4375 288H110.25C114.913 288 118.688 284.226 118.688 279.562V237.375H0V279.562ZM288 279.562V237.375H169.312V279.562C169.312 284.226 173.087 288 177.75 288H279.562C284.226 288 288 284.226 288 279.562Z"></path></g></svg>` },
    { id: "screeners", label: "Screeners", title: "Screeners", open: true, html: `<svg height="32" viewBox="0 0 288 288" fill="black" xmlns="http://www.w3.org/2000/svg"><g><path d="M91.8845 190.936C85.1558 190.936 79.6949 195.094 79.6949 200.224C79.6949 205.359 85.1558 209.517 91.8845 209.517C98.6177 209.517 104.074 205.359 104.074 200.224C104.074 195.094 98.6177 190.936 91.8845 190.936ZM79.6949 163.059C72.9662 163.059 67.5048 167.222 67.5048 172.352C67.5048 177.486 72.9662 181.644 79.6949 181.644C86.4281 181.644 91.8845 177.486 91.8845 172.352C91.8845 167.222 86.4281 163.059 79.6949 163.059ZM113.217 13.9367V84.0969L81.1615 126.361H181.845L149.786 84.0969V13.9367H113.217ZM76.6472 0H186.355V13.9367H168.071V80.356L223.655 153.638H134.057C123.975 153.647 115.808 160.712 115.816 169.423C115.819 173.337 117.508 177.113 120.552 180.011L180.884 237.336V237.855H33.5736C21.4546 237.855 10.5975 233.076 4.54111 225.07C-1.51932 217.069 -1.51195 207.515 4.55442 199.514L94.9318 80.356V13.9367H76.6472V0Z"></path><path d="M272.566 164.635H154.775C146.244 164.639 139.334 170.723 139.341 178.214C139.344 181.582 140.772 184.83 143.348 187.324L194.396 236.648V283.163C194.397 285.018 195.606 286.709 197.508 287.516C198.253 287.84 199.073 288.004 199.903 288C201.155 288 202.369 287.623 203.345 286.935L213.67 279.68L230.879 267.583C232.183 266.668 232.943 265.28 232.944 263.811V236.648L283.992 187.324C289.725 181.773 289.251 173.191 282.934 168.154C280.095 165.891 276.399 164.639 272.566 164.635Z"></path></g></svg>` },
]

// For demonstration
// remove later
let backgroundColors = ["cornflowerblue", "aquamarine", "hotpink", "burlywood", "darkgrey"];

function chooseLayout(id) {
    const container = $("#" + chContainerId);
    container.html("");
    // container.height("80vh");
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
    if (id == 9) {

        let openBoxes = addBtnToCol(boxBtns, "secondColRow");

        if (openBoxes.length > 0) {
            splitLayout.cl(container, "container", "horizontal", 2);
        }

        const secondCol = container.children(".column").last();
        splitLayout.cl(secondCol, "secondCol", "vertical", openBoxes.length, false);

        for (let i = 0; i < openBoxes.length; i++) {
            let infoBox = openBoxes[i];
            let html = getInfoBoxHtml(infoBox);

            if (jsu.isNotNull(html)) {
                htmlU.addMsgToDiv(infoBox.rowId, true, html);
            }
        }



        createScrollDiv(true, "x", bottomBarId, "tsrRcBottomMenu", 50);
        createScrollDiv(true, "y", leftBarId, "tsrRcLeftBarMenu", 100);

        $('#' + rightBarId).append(`
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
        `);

        addBtnToBottomBar();
        addBtnToLeftBar();

    }
}

function addBtnToCol(btns, boxEleIdPrefix) {

    var html = "";
    let openBoxCount = 0;
    let openBoxes = [];
    html += `<div class="d-flex flex-column">`
    for (let i = 0; i < btns.length; i++) {
        let btn = btns[i];
        if (btn.open) {
            openBoxCount++;
            let rowId = boxEleIdPrefix + openBoxCount;
            openBoxes.push({ "rowId": rowId, "btnId": btn.id });
        }
        html += `<button class="btn" id="${btn.id}" title="${btn.title}"  onclick="toggleBtn('${btn.id}'); splitLayout.cl('9');">`
        html += btn.html;
        html += `</button>`
    }
    html += `</div>`

    htmlU.addMsgToDiv(rightBarId, true, html);

    return openBoxes;
}

function toggleBtn(btnId) {
    let currBtn = jsu.getObjFrmArr(boxBtns, btnId);

    currBtn.open = !currBtn.open;
}

function getInfoBoxHtml(infoBox) {
    if (infoBox.btnId == "mySettings") {
        return getMySettingsHtml(infoBox);
    } else if (infoBox.btnId == "watchlist") {
        return getWatchlistHtml(infoBox);
    } else if (infoBox.btnId = "screeners") {
        return getPreCreatedScreenersHtml(infoBox);
    } else {
        return null;
    }
}

let mySettings = [
    { id: "", label: "winning strategy", func: "" },
    { id: "", label: "saved", func: "" },
    { id: "", label: "52 week strategy", func: "" },
    { id: "", label: "Morning Star Candlestick Pattern", func: "" },
    { id: "", label: "Setting Named", func: "" },
    { id: "", label: "daily dbr", func: "" },
    { id: "", label: "Strategies", func: "" },
    { id: "", label: "winning strategy", func: "" },
    { id: "", label: "saved", func: "" },
    { id: "", label: "52 week strategy", func: "" },
    { id: "", label: "Morning Star Candlestick Pattern", func: "" },
    { id: "", label: "Setting Named", func: "" },
    { id: "", label: "daily dbr", func: "" },
    { id: "", label: "Strategies", func: "" },
    { id: "", label: "winning strategy", func: "" },
    { id: "", label: "saved", func: "" },
    { id: "", label: "52 week strategy", func: "" },
    { id: "", label: "Morning Star Candlestick Pattern", func: "" },
    { id: "", label: "Setting Named", func: "" },
    { id: "", label: "daily dbr", func: "" },
    { id: "", label: "Strategies", func: "" },
];

function getMySettingsHtml(infoBox) {
    let html = "";

    let height = $("#" + infoBox.rowId).height() - 50;

    html += `<div class="card p-0 m-0">`
    html += `    <div class="card-header py-2 px-0" style="text-align: center; overflow: hidden;">`
    html += `       <b>My Settings</b>`
    html += `    </div>`
    html += `    <div class="card-body p-0"  style="height: ${height}px; overflow-y: auto;">`
    html += `       <table class="table table-striped">`
    for (let i = 0; i < mySettings.length; i++) {
        let setting = mySettings[i];
        html += `       <tr>`
        html += `           <td>${setting.label}</td>`;
        html += `           <td>
                                <a onclick="${setting.func}" style="font-size:16px;color:green;" title="Apply Setting &amp; Run"><span class="fa fa-play"></span></a>
                            </td>`
        html += `       </tr>`
    }
    html += `       </table>`
    html += `    </div>`
    // html += `    <div class="card-footer" style="text-align: center; overflow: hidden;">`
    // html += `    </div>`
    html += `</div>`

    return html;
}

let watchlist = [
    { id: "", label: "TCS", price: 1500, chgPc: 3, func: "" },
    { id: "", label: "INFY", price: 900, chgPc: -2, func: "" },
    { id: "", label: "WIPRO", price: 400, chgPc: 1, func: "" },
    { id: "", label: "PERSISTENT", price: 800, chgPc: 0.05, func: "" },
    { id: "", label: "TECHM", price: 200, chgPc: 1.4, func: "" },
    { id: "", label: "TCS", price: 1500, chgPc: 3, func: "" },
    { id: "", label: "INFY", price: 900, chgPc: -2, func: "" },
    { id: "", label: "WIPRO", price: 400, chgPc: 1, func: "" },
    { id: "", label: "PERSISTENT", price: 800, chgPc: 0.05, func: "" },
    { id: "", label: "TECHM", price: 200, chgPc: 1.4, func: "" },

    { id: "", label: "TCS", price: 1500, chgPc: 3, func: "" },
    { id: "", label: "INFY", price: 900, chgPc: -2, func: "" },
    { id: "", label: "WIPRO", price: 400, chgPc: 1, func: "" },
    { id: "", label: "PERSISTENT", price: 800, chgPc: 0.05, func: "" },
    { id: "", label: "TECHM", price: 200, chgPc: 1.4, func: "" },

    { id: "", label: "TCS", price: 1500, chgPc: 3, func: "" },
    { id: "", label: "INFY", price: 900, chgPc: -2, func: "" },
    { id: "", label: "WIPRO", price: 400, chgPc: 1, func: "" },
    { id: "", label: "PERSISTENT", price: 800, chgPc: 0.05, func: "" },
    { id: "", label: "TECHM", price: 200, chgPc: 1.4, func: "" },


];

function getWatchlistHtml(infoBox) {
    let html = "";

    let height = $("#" + infoBox.rowId).height() - 60;

    html += `<div class="card p-0 m-0">`
    html += `    <div class="card-header py-2 px-0" style="text-align: center; overflow: hidden;">`
    html += `       <b>Watchlist</b>`
    html += `    </div>`
    html += `    <div class="card-body p-0"  style="height: ${height}px; overflow-y: auto;">`
    html += `       <table class="table table-striped">`
    html += `           <tr>`
    html += `               <th>Stock</th>`
    html += `               <th>Price</th>`
    html += `               <th>Change %</th>`
    html += `           </tr>`
    for (let i = 0; i < watchlist.length; i++) {
        let stock = watchlist[i];
        html += `       <tr>`
        html += `           <td>${stock.label}</td>`;
        html += `           <td>${stock.price}</td>`
        html += `           <td>${stock.chgPc}</td>`
        html += `       </tr>`
    }
    html += `       </table>`
    html += `    </div>`
    // html += `    <div class="card-footer" style="text-align: center; overflow: hidden;">`
    // html += `    </div>`
    html += `</div>`

    return html;
}

let preCreatedScreeners = [
    { id: "", label: "Potential Reversal from One Year Low Stocks", func: "" },
    { id: "", label: "3 Months Low Breakdown Strategy", func: "" },
    { id: "", label: "EMA Pullback Scalping Strategy", func: "" },
    { id: "", label: "MACD Bullish Crossover and Volume Strategy", func: "" },
    { id: "", label: "Bearish Momentum Stocks", func: "" },
    { id: "", label: "Potential Reversal from One Year Low Stocks", func: "" },
    { id: "", label: "3 Months Low Breakdown Strategy", func: "" },
    { id: "", label: "EMA Pullback Scalping Strategy", func: "" },
    { id: "", label: "MACD Bullish Crossover and Volume Strategy", func: "" },
    { id: "", label: "Bearish Momentum Stocks", func: "" },
    { id: "", label: "Potential Reversal from One Year Low Stocks", func: "" },
    { id: "", label: "3 Months Low Breakdown Strategy", func: "" },
    { id: "", label: "EMA Pullback Scalping Strategy", func: "" },
    { id: "", label: "MACD Bullish Crossover and Volume Strategy", func: "" },
    { id: "", label: "Bearish Momentum Stocks", func: "" },
    { id: "", label: "Potential Reversal from One Year Low Stocks", func: "" },
    { id: "", label: "3 Months Low Breakdown Strategy", func: "" },
    { id: "", label: "EMA Pullback Scalping Strategy", func: "" },
    { id: "", label: "MACD Bullish Crossover and Volume Strategy", func: "" },
    { id: "", label: "Bearish Momentum Stocks", func: "" },
];


function getPreCreatedScreenersHtml(infoBox) {
    let html = "";

    let height = $("#" + infoBox.rowId).height() - 50;

    html += `<div class="card p-0 m-0">`
    html += `    <div class="card-header py-2 px-0" style="text-align: center; overflow: hidden;">`
    html += `       <b>Pre-Created Screeners</b>`
    html += `    </div>`
    html += `    <div class="card-body p-0"  style="height: ${height}px; overflow-y: auto;">`
    html += `       <table class="table table-striped">`
    // html += `           <tr>`
    // html += `               <th>Stock</th>`
    // html += `               <th>Price</th>`
    // html += `               <th>Change %</th>`
    // html += `           </tr>`
    for (let i = 0; i < preCreatedScreeners.length; i++) {
        let screener = preCreatedScreeners[i];
        html += `       <tr>`
        html += `           <td>${screener.label}</td>`;
        html += `           <td>
                                <a onclick="${screener.func}" style="font-size:16px;color:green;" title="Apply Setting &amp; Run"><span class="fa fa-play"></span></a>
                            </td>`
        html += `       </tr>`
    }
    html += `       </table>`
    html += `    </div>`
    // html += `    <div class="card-footer" style="text-align: center; overflow: hidden;">`
    // html += `    </div>`
    html += `</div>`

    return html;
}

function createScrollDiv(hasBtns, scrollDir, containerId, divId, scrollBy) {

    let html = "";

    let container = document.getElementById(containerId);
    container.classList.add("tsrRcScrollDivContainer");

    if (scrollDir == "horizontal" || scrollDir == "x") {
        container.classList.add("justify-content-between");
    } else if (scrollDir == "vertical" || scrollDir == "y") {
        container.classList.add("flex-column", "justify-content-between");
    }

    scrollDir.toLowerCase();
    if (scrollDir == "horizontal" || scrollDir == "x") {
        if (hasBtns) {
            html += `<button class="scrollBtn" onclick="scrollDiv('${scrollDir}', ${scrollBy * -1}, '${divId}')">`
            html += `   <`
            html += `</button>`
        }
    } else if (scrollDir == "vertical" || scrollDir == "y") {
        html += `<button class="scrollBtn" onclick="scrollDiv('${scrollDir}', ${scrollBy * -1}, '${divId}')">`
        html += `   <p style="transform: rotate(270deg);margin: 0;">></p>`
        html += `</button>`
    }

    if (scrollDir == "horizontal" || scrollDir == "x") {
        html += `<div id="${divId}" class="d-flex tsrRcScrollDiv" style="width: calc(100% - 40px); overflow-y: hidden; overflow-x: auto;" >`;

        html += `</div>`;
    }
    else if (scrollDir == "vertical" || scrollDir == "y") {
        html += `<div id="${divId}" class="d-flex flex-column tsrRcScrollDiv" style="height: calc(100% - 60px); overflow-y: auto; overflow-x: hidden;" >`;

        html += `</div>`;
    }


    if (scrollDir == "horizontal" || scrollDir == "x") {
        if (hasBtns) {
            html += `<button class="scrollBtn" onclick="scrollDiv('${scrollDir}', ${scrollBy}, '${divId}')">`
            html += `   >`
            html += `</button>`
        }
    } else if (scrollDir == "vertical" || scrollDir == "y") {
        html += `<button class="scrollBtn" onclick="scrollDiv('${scrollDir}', ${scrollBy * 1}, '${divId}')">`
        html += `   <p style="transform: rotate(90deg);margin: 0;">></p>`
        html += `</button>`
    }

    htmlU.addMsgToDiv(containerId, true, html);
    container.style.display = "none";


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
    btn.classList.toggle("tsrRcActive");

    let bar = document.getElementById(barId);
    if (bar.style.display == "flex") {
        bar.style.display = "none";
    } else {
        bar.style.display = "flex";
        // let chContainer = document.getElementById(chContainerId);
        // chContainer.style.width = (chContainer.getBoundingClientRect().width - 50) + "px";
    }

    // htmlU.showDiv(barId);
}

let leftBarBtns = [
    { id: "", label: '<i class="fas fa-pencil-alt"></i>', icon: "", func: "" },
    { id: "", label: '<i class="far fa-square"></i>', icon: "", func: "" },
    { id: "", label: '<i class="fas fa-pencil-alt"></i>', icon: "", func: "" },
    { id: "", label: '<i class="far fa-square"></i>', icon: "", func: "" },
    { id: "", label: '<i class="fas fa-pencil-alt"></i>', icon: "", func: "" },
    { id: "", label: '<i class="far fa-square"></i>', icon: "", func: "" },
];

function addBtnToLeftBar() {
    var html = "";

    for (let i = 0; i < leftBarBtns.length; i++) {
        let btn = leftBarBtns[i];

        html += `<button class="btn">`
        html += btn.label;
        html += `</button>`
    }
    html += `</div>`;



    htmlU.addMsgToDiv("tsrRcLeftBarMenu", true, html);
}

let bottomBarBtns = [
    { id: "", label: "RSI", icon: "", func: "" },
    { id: "", label: "EMA", icon: "", func: "" },
    { id: "", label: "MACD", icon: "", func: "" },
    { id: "", label: "Overbrought", icon: "", func: "" },
    { id: "", label: "Bollinger Bands", icon: "", func: "" },
    { id: "", label: "ADR", icon: "", func: "" },
     { id: "", label: "RSI", icon: "", func: "" },
    { id: "", label: "EMA", icon: "", func: "" },
    { id: "", label: "MACD", icon: "", func: "" },
    { id: "", label: "Overbrought", icon: "", func: "" },
    { id: "", label: "Bollinger Bands", icon: "", func: "" },
    { id: "", label: "ADR", icon: "", func: "" },
     { id: "", label: "RSI", icon: "", func: "" },
    { id: "", label: "EMA", icon: "", func: "" },
    { id: "", label: "MACD", icon: "", func: "" },
    { id: "", label: "Overbrought", icon: "", func: "" },
    { id: "", label: "Bollinger Bands", icon: "", func: "" },
    { id: "", label: "ADR", icon: "", func: "" },
     { id: "", label: "RSI", icon: "", func: "" },
    { id: "", label: "EMA", icon: "", func: "" },
    { id: "", label: "MACD", icon: "", func: "" },
    { id: "", label: "Overbrought", icon: "", func: "" },
    { id: "", label: "Bollinger Bands", icon: "", func: "" },
    { id: "", label: "ADR", icon: "", func: "" },
     { id: "", label: "RSI", icon: "", func: "" },
    { id: "", label: "EMA", icon: "", func: "" },
    { id: "", label: "MACD", icon: "", func: "" },
    { id: "", label: "Overbrought", icon: "", func: "" },
    { id: "", label: "Bollinger Bands", icon: "", func: "" },
    { id: "", label: "ADR", icon: "", func: "" },
];

function addBtnToBottomBar() {

    var html = "";

    for (let i = 0; i < bottomBarBtns.length; i++) {
        let btn = bottomBarBtns[i];

        html += `<button class="btn" style="min-width: 100px;">`
        html += btn.label;
        html += `</button>`
    }
    html += `</div>`

    htmlU.addMsgToDiv("tsrRcBottomMenu", true, html);
}

