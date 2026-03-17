

var jsu = mintJsUtil;
var htmlU = mintHtmlUtil;

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


const container = $(".chPanelContainer");
container.height("100%");

let boxBtns = [
    {
        id: "mySettings", label: "My Settings", title: "My settings", open: true, html: `<svg height="32" viewBox="0 0 288 288" fill="#2a2c2d" xmlns="http://www.w3.org/2000/svg">
			<path d="M252.612 98H251.46C249.771 97.9851 248.127 97.4619 246.74 96.4988C245.353 95.5356 244.288 94.177 243.684 92.6C243.048 91.0772 242.88 89.3997 243.201 87.7811C243.521 86.1623 244.316 84.6756 245.484 83.51L246.303 82.691C251.24 77.7351 254.012 71.0248 254.012 64.0295C254.012 57.0342 251.24 50.3239 246.303 45.368L232.704 31.778C227.752 26.8372 221.042 24.0624 214.047 24.0624C207.052 24.0624 200.342 26.8372 195.39 31.778L194.571 32.597C193.364 33.759 191.845 34.5435 190.199 34.8543C188.553 35.165 186.851 34.9884 185.304 34.3462C183.757 33.704 182.431 32.6241 181.489 31.239C180.547 29.854 180.029 28.2239 180 26.549V25.388C179.993 18.3917 177.21 11.6839 172.263 6.73676C167.316 1.7896 160.608 -0.992852 153.612 -1H134.388C127.392 -0.992852 120.684 1.7896 115.737 6.73676C110.79 11.6839 108.007 18.3917 108 25.388V26.549C107.956 28.2119 107.431 29.8265 106.489 31.1972C105.546 32.5679 104.226 33.636 102.689 34.2721C101.152 34.9083 99.4638 35.0852 97.8282 34.7815C96.1927 34.4779 94.6802 33.7065 93.474 32.561L92.7 31.742C87.748 26.8012 81.0383 24.0264 74.043 24.0264C67.0477 24.0264 60.338 26.8012 55.386 31.742L41.742 45.332C36.805 50.2879 34.0331 56.9982 34.0331 63.9935C34.0331 70.9888 36.805 77.6991 41.742 82.655L42.561 83.474C43.7405 84.6807 44.5299 86.2142 44.8268 87.8753C45.1238 89.5364 44.9144 91.2484 44.226 92.789C43.6084 94.3235 42.5472 95.639 41.1781 96.5672C39.809 97.4955 38.1941 97.9943 36.54 98H35.388C28.3917 98.0071 21.6839 100.79 16.7368 105.737C11.7896 110.684 9.00715 117.392 9 124.388V143.612C9.00715 150.608 11.7896 157.316 16.7368 162.263C21.6839 167.21 28.3917 169.993 35.388 170H36.54C38.2286 170.015 39.8735 170.538 41.2605 171.501C42.6475 172.464 43.7122 173.823 44.316 175.4C44.9517 176.923 45.12 178.6 44.7994 180.219C44.4789 181.838 43.684 183.324 42.516 184.49L41.697 185.309C36.76 190.265 33.9881 196.975 33.9881 203.971C33.9881 210.966 36.76 217.676 41.697 222.632L55.287 236.213C60.2382 241.159 66.9503 243.937 73.9485 243.937C80.9467 243.937 87.6588 241.159 92.61 236.213L93.429 235.394C94.6364 234.216 96.1698 233.427 97.8306 233.13C99.4914 232.833 101.203 233.042 102.744 233.729C104.278 234.344 105.594 235.403 106.523 236.771C107.451 238.139 107.95 239.753 107.955 241.406V242.567C107.953 246.039 108.635 249.477 109.962 252.685C111.29 255.893 113.237 258.808 115.692 261.263C118.147 263.718 121.062 265.665 124.27 266.993C127.478 268.32 130.916 269.002 134.388 269H153.612C160.608 268.993 167.316 266.21 172.263 261.263C177.21 256.316 179.993 249.608 180 242.612V241.451C180.044 239.788 180.569 238.174 181.511 236.803C182.454 235.432 183.774 234.364 185.311 233.728C186.848 233.092 188.536 232.915 190.172 233.218C191.807 233.522 193.32 234.293 194.526 235.439L195.345 236.258C200.297 241.199 207.007 243.974 214.002 243.974C220.997 243.974 227.707 241.199 232.659 236.258L246.258 222.677C251.195 217.721 253.967 211.011 253.967 204.015C253.967 197.02 251.195 190.31 246.258 185.354L245.439 184.535C244.26 183.328 243.47 181.795 243.173 180.134C242.876 178.473 243.086 176.761 243.774 175.22C244.39 173.684 245.451 172.366 246.82 171.437C248.189 170.507 249.805 170.006 251.46 170H252.612C259.608 169.993 266.316 167.21 271.263 162.263C276.21 157.316 278.993 150.608 279 143.612V124.388C278.993 117.392 276.21 110.684 271.263 105.737C266.316 100.79 259.608 98.0071 252.612 98ZM261 143.612C260.998 145.836 260.113 147.968 258.541 149.541C256.968 151.113 254.836 151.998 252.612 152H251.46C246.237 152.044 241.143 153.625 236.813 156.545C232.482 159.465 229.107 163.595 227.108 168.421C225.109 173.246 224.575 178.553 225.571 183.68C226.568 188.807 229.052 193.527 232.713 197.252L233.523 198.071C235.094 199.647 235.977 201.781 235.977 204.007C235.977 206.232 235.094 208.366 233.523 209.942L219.924 223.523C218.351 225.096 216.218 225.98 213.993 225.98C211.768 225.98 209.635 225.096 208.062 223.523L207.252 222.704C203.525 219.047 198.806 216.567 193.68 215.573C188.554 214.578 183.25 215.114 178.426 217.112C173.603 219.11 169.473 222.483 166.553 226.811C163.632 231.139 162.049 236.23 162 241.451V242.612C161.998 244.836 161.113 246.968 159.541 248.541C157.968 250.113 155.836 250.998 153.612 251H134.388C132.164 250.998 130.032 250.113 128.459 248.541C126.887 246.968 126.002 244.836 126 242.612V241.451C125.975 236.22 124.405 231.112 121.488 226.769C118.571 222.427 114.436 219.042 109.602 217.041C104.769 215.039 99.4517 214.51 94.3185 215.519C89.1852 216.528 84.4642 219.031 80.748 222.713L79.929 223.532C78.3536 225.101 76.2211 225.981 73.998 225.981C71.7749 225.981 69.6424 225.101 68.067 223.532L54.477 209.951C52.9057 208.375 52.0234 206.241 52.0234 204.015C52.0234 201.79 52.9057 199.656 54.477 198.08L55.296 197.261C58.9607 193.536 61.4473 188.814 62.4455 183.685C63.4436 178.556 62.9091 173.246 60.9086 168.418C58.9082 163.591 55.5303 159.46 51.1966 156.54C46.863 153.62 41.7654 152.041 36.54 152H35.388C33.1641 151.998 31.032 151.113 29.4594 149.541C27.8869 147.968 27.0024 145.836 27 143.612V124.388C27.0024 122.164 27.8869 120.032 29.4594 118.459C31.032 116.887 33.1641 116.002 35.388 116H36.54C41.7628 115.956 46.8569 114.375 51.1874 111.455C55.5178 108.535 58.8929 104.405 60.8919 99.5793C62.891 94.754 63.4254 89.447 62.4287 84.3201C61.432 79.1931 58.9482 74.4729 55.287 70.748L54.477 69.929C52.9063 68.3548 52.0241 66.2218 52.0241 63.998C52.0241 61.7742 52.9063 59.6412 54.477 58.067L68.067 44.468C69.64 42.8951 71.7735 42.0114 73.998 42.0114C76.2225 42.0114 78.356 42.8951 79.929 44.468L80.739 45.287C84.4645 48.9465 89.1844 51.429 94.3106 52.4253C99.4369 53.4217 104.743 52.8878 109.568 50.8903C114.393 48.8927 118.524 45.5197 121.446 41.1915C124.367 36.8632 125.951 31.771 126 26.549V25.388C126.002 23.1641 126.887 21.032 128.459 19.4594C130.032 17.8869 132.164 17.0024 134.388 17H153.612C155.836 17.0024 157.968 17.8869 159.541 19.4594C161.113 21.032 161.998 23.1641 162 25.388V26.549C162.046 31.771 163.628 36.8639 166.549 41.193C169.47 45.5221 173.6 48.8958 178.425 50.8937C183.25 52.8917 188.556 53.4254 193.682 52.4284C198.808 51.4313 203.528 48.9477 207.252 45.287L208.071 44.468C209.644 42.8951 211.777 42.0114 214.002 42.0114C216.227 42.0114 218.36 42.8951 219.933 44.468L233.523 58.067C235.094 59.6412 235.976 61.7742 235.976 63.998C235.976 66.2218 235.094 68.3548 233.523 69.929L232.704 70.748C229.042 74.4734 226.558 79.1945 225.562 84.3223C224.566 89.4501 225.101 94.7577 227.101 99.5834C229.101 104.409 232.477 108.539 236.809 111.458C241.141 114.378 246.236 115.957 251.46 116H252.612C254.836 116.002 256.968 116.887 258.541 118.459C260.113 120.032 260.998 122.164 261 124.388V143.612Z"></path>
			<path d="M144 71C131.54 71 119.359 74.6949 108.999 81.6174C98.6388 88.5399 90.5639 98.3792 85.7956 109.891C81.0273 121.403 79.7797 134.07 82.2105 146.291C84.6414 158.511 90.6416 169.737 99.4523 178.548C108.263 187.358 119.489 193.359 131.709 195.789C143.93 198.22 156.597 196.973 168.109 192.204C179.621 187.436 189.46 179.361 196.383 169.001C203.305 158.641 207 146.46 207 134C206.981 117.297 200.337 101.284 188.527 89.4733C176.716 77.6627 160.703 71.0191 144 71ZM144 179C135.1 179 126.4 176.361 118.999 171.416C111.599 166.471 105.831 159.443 102.425 151.221C99.0195 142.998 98.1283 133.95 99.8647 125.221C101.601 116.492 105.887 108.474 112.18 102.18C118.474 95.8868 126.492 91.601 135.221 89.8647C143.95 88.1283 152.998 89.0195 161.221 92.4254C169.443 95.8314 176.471 101.599 181.416 108.999C186.361 116.4 189 125.1 189 134C188.986 145.93 184.24 157.368 175.804 165.804C167.368 174.24 155.93 178.986 144 179Z"></path>
			</svg>` },
    { id: "watchlist", label: "Watchlist", title: "Watchlist", open: true, html: `<svg height="32" viewBox="0 0 288 288" fill="#2a2c2d" xmlns="http://www.w3.org/2000/svg"><g><path d="M118.688 68.0625V33.75H127.125C131.788 33.75 135.562 29.9756 135.562 25.3125V8.4375C135.562 3.77438 131.788 0 127.125 0H42.75C38.0869 0 34.3125 3.77438 34.3125 8.4375V25.3125C34.3125 29.9756 38.0869 33.75 42.75 33.75H51.1875V68.0625H118.688ZM152.438 76.5C152.438 71.7739 148.726 68.0625 144 68.0625C139.274 68.0625 135.562 71.7739 135.562 76.5V84.9375H152.438V76.5ZM135.562 177.75C135.562 182.474 139.274 186.188 144 186.188C148.726 186.188 152.438 182.474 152.438 177.75V169.312H135.562V177.75ZM237.375 68.0625V33.75H245.812C250.476 33.75 254.25 29.9756 254.25 25.3125V8.4375C254.25 3.77438 250.476 0 245.812 0H160.875C156.212 0 152.438 3.77438 152.438 8.4375V25.3125C152.438 29.9756 156.212 33.75 160.875 33.75H169.312V68.0625H237.375ZM118.688 220.5V169.312H135.562V84.9375H42.75C38.8699 84.9375 35.4949 87.6375 34.6511 91.3489L1.85625 220.5H118.688ZM169.312 169.312V220.5H286.144L253.911 91.3489C253.068 87.6381 249.693 84.9375 245.812 84.9375H152.438V169.312H169.312ZM0 279.562C0 284.226 3.77438 288 8.4375 288H110.25C114.913 288 118.688 284.226 118.688 279.562V237.375H0V279.562ZM288 279.562V237.375H169.312V279.562C169.312 284.226 173.087 288 177.75 288H279.562C284.226 288 288 284.226 288 279.562Z"></path></g></svg>` },
    { id: "screeners", label: "Screeners", title: "Screeners", open: true, html: `<svg height="32" viewBox="0 0 288 288" fill="black" xmlns="http://www.w3.org/2000/svg"><g><path d="M91.8845 190.936C85.1558 190.936 79.6949 195.094 79.6949 200.224C79.6949 205.359 85.1558 209.517 91.8845 209.517C98.6177 209.517 104.074 205.359 104.074 200.224C104.074 195.094 98.6177 190.936 91.8845 190.936ZM79.6949 163.059C72.9662 163.059 67.5048 167.222 67.5048 172.352C67.5048 177.486 72.9662 181.644 79.6949 181.644C86.4281 181.644 91.8845 177.486 91.8845 172.352C91.8845 167.222 86.4281 163.059 79.6949 163.059ZM113.217 13.9367V84.0969L81.1615 126.361H181.845L149.786 84.0969V13.9367H113.217ZM76.6472 0H186.355V13.9367H168.071V80.356L223.655 153.638H134.057C123.975 153.647 115.808 160.712 115.816 169.423C115.819 173.337 117.508 177.113 120.552 180.011L180.884 237.336V237.855H33.5736C21.4546 237.855 10.5975 233.076 4.54111 225.07C-1.51932 217.069 -1.51195 207.515 4.55442 199.514L94.9318 80.356V13.9367H76.6472V0Z"></path><path d="M272.566 164.635H154.775C146.244 164.639 139.334 170.723 139.341 178.214C139.344 181.582 140.772 184.83 143.348 187.324L194.396 236.648V283.163C194.397 285.018 195.606 286.709 197.508 287.516C198.253 287.84 199.073 288.004 199.903 288C201.155 288 202.369 287.623 203.345 286.935L213.67 279.68L230.879 267.583C232.183 266.668 232.943 265.28 232.944 263.811V236.648L283.992 187.324C289.725 181.773 289.251 173.191 282.934 168.154C280.095 165.891 276.399 164.639 272.566 164.635Z"></path></g></svg>` },
]

// For demonstration
// remove later
let backgroundColors = ["cornflowerblue", "aquamarine", "hotpink", "burlywood", "darkgrey"];

function chooseLayout(id) {
    const container = $(".chPanelContainer");
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

    }
}

function addBtnToCol(btns, boxEleIdPrefix) {
    let rightColDiv = document.getElementById("rightColWrapper");

    var html = "";
    let openBoxCount = 0;
    let openBoxes = [];
    for (let i = 0; i < btns.length; i++) {
        let btn = btns[i];
        if (btn.open) {
            openBoxCount++;
            let rowId = boxEleIdPrefix + openBoxCount;
            openBoxes.push({ "rowId": rowId, "btnId": btn.id });
        }
        html += `<button class="btn" id="${btn.id}" title="${btn.title}"  onclick="toggleBtn('${btn.id}'); chooseLayout('9');">`
        html += btn.html;
        html += `</button>`
    }

    rightColDiv.innerHTML = html;

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