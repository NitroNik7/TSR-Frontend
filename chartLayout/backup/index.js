const chartPanel = document.getElementById('chartPanel');
const chartTopLayout = document.getElementById('chartTopLayout');
const chartBottomLayout = document.getElementById('chartBottomLayout');
const chartBottomCollapseBtn = document.getElementById('chartBottomCollapse');

function launchFullScreenChart() {
    if (!chartPanel.fullscreenElement) {
        // chartPanel.style.height = '100vh';
        chartPanel.requestFullscreen({ navigationUI: "hide" });
        chartTopLayout.style.height = '70vh';
        chartBottomLayout.style.height = '30vh';
        chartBottomCollapseBtn.style.marginBottom = '3px';
    }
    else {
        chartPanel.exitFullscreen();
    }
}

// For collapsing and resizing bottom div;
// Should work in fullscreen also
// When div is collapsed, cursor should change to normal over chartMiddleDivider
// Consider how this functionality should work in variable screen sizes
// Add some data to bottom divs

const chartMiddleDivider = document.getElementById('chartMiddleDivider');
let yCord;

chartMiddleDivider.addEventListener('mousedown', (e) => {
    yCord = e.clientY; // yCord stores Y cordinate value when mouse is initially clicked

    document.addEventListener('mousemove', mouseMoveHandlerMiddleDivider);

    document.addEventListener('mouseup', mouseUpHandlerMiddleDivider);


});

const mouseMoveHandlerMiddleDivider = (e) => {
    // let newYCord = e.clientY;
    // console.log(yCord, " ", e.clientY);
    // console.log("initial yCord: " + yCord + " , new yCord:" +e.clientY);
    let dy = yCord - e.clientY; // dy < 0, when cursor is moved down, dy > 0 when cursor is moved up
    // console.log(dy);
    chartTopLayout.style.transition = 'none';
    chartBottomLayout.style.transition = 'none';
    chartTopLayout.style.height = (chartTopLayout.offsetHeight - dy) + 'px';
    chartBottomLayout.style.height = (chartPanel.offsetHeight - chartTopLayout.offsetHeight) + 'px';
    yCord = e.clientY;
}

const mouseUpHandlerMiddleDivider = () => {
    document.removeEventListener('mousemove', mouseMoveHandlerMiddleDivider);
    document.removeEventListener('mouseup', mouseUpHandlerMiddleDivider);
}

// For collapsing bottom div
let prevHeight = chartBottomLayout.offsetHeight;
function collapseChartBottomLayout() {
    // If bottom div is collapsed, then expand it
    if (chartBottomLayout.offsetHeight == 0) {
        chartTopLayout.style.transition = 'height 0.2s ease';
        chartBottomLayout.style.transition = 'height 0.2s ease';
        chartTopLayout.style.height = (chartPanel.offsetHeight - prevHeight) + 'px';
        chartBottomLayout.style.height = prevHeight + 'px';

    }
    // If bottom div is not collapsed, then collapse it
    else {
        chartTopLayout.style.transition = 'height 0.2s ease';
        chartBottomLayout.style.transition = 'height 0.2s ease';
        prevHeight = chartBottomLayout.offsetHeight;
        chartBottomLayout.style.height = '0px';
        chartTopLayout.style.height = (chartTopLayout.offsetHeight + prevHeight - 15) + 'px';
    }
}


const chartCentreDivider = document.getElementById('chartTopCenterDivider');
let xCord;

const chartTopLayoutRight = document.getElementById('chartTopLayoutRight');
const chartTopLayoutLeft = document.getElementById('chartTopLayoutLeft');

let initialLeftWidth = chartTopLayoutLeft.offsetWidth; // using initialLeftWidth to set width of chartTopLayoutLeft later on

chartCentreDivider.addEventListener('mousedown', (e) => {
    xCord = e.clientX; // xCord stores X cordinate value when mouse is initially clicked

    document.addEventListener('mousemove', mouseMoveHandlerCentreDivider);

    document.addEventListener('mouseup', mouseUpHandlerCentreDivider);

});

const mouseMoveHandlerCentreDivider = (e) => {

    let dx = xCord - e.clientX; // dx > 0 when cursor is moved left, which means chartTopLayoutLeft w decreases and chartTopLayoutRight w increase
    // whereas dx < 0 when cursor is moved right, which means chartTopLayoutLeft w increases and chartTopLayoutRight w decreases

    chartTopLayoutLeft.style.transition = 'none';
    chartTopLayoutRight.style.transition = 'none';
    // Subtracting change in x, i.e. dx from initialLeftWidth and then updating chartTopLayoutLeft width, works fine
    chartTopLayoutLeft.style.width = (initialLeftWidth - dx) + 'px';
    chartTopLayoutRight.style.width = (chartTopLayout.offsetWidth - chartTopLayoutLeft.offsetWidth) + 'px';

    // xCord = e.clientX; // new value of xCord when divider is moved left or right
    // when xCord was getting updated continously, it caused errors, therefore not updating it
    // Using initial xCord value and subtracting e.ClientX from it, gives the change in x, i.e. dx
}

const mouseUpHandlerCentreDivider = () => {

    document.removeEventListener('mousemove', mouseMoveHandlerCentreDivider);
    document.removeEventListener('mouseup', mouseUpHandlerCentreDivider);

}

// For collapsing chartTopRight div
let chartTopRightCollapseBtn = document.getElementById('chartTopRightCollapseBtn');
let prevWidth = chartTopLayoutRight.offsetWidth;
function collapseChartTopRight() {
    // If chartTopRight div is collapsed, then expand it
    if (chartTopLayoutRight.offsetWidth == 0) {
        chartTopLayoutLeft.style.transition = 'width 0.2s ease';
        chartTopLayoutRight.style.transition = 'width 0.2s ease';
        chartTopLayoutLeft.style.width = (chartTopLayout.offsetWidth - prevWidth) + 'px';


        chartTopLayoutRight.style.width = prevWidth + 'px';
        chartTopLayoutRight.style.minWidth = '300px';

        chartTopRightCollapseBtn.innerText = '>';
        // chartTopRightCollapseBtn.style.content = '>';

    }
    // If chartTopRight div is not collapsed, then collapse it
    else {
        chartTopLayoutLeft.style.transition = 'width 0.2s ease';
        chartTopLayoutRight.style.transition = 'width 0.2s ease';
        prevWidth = chartTopLayoutRight.offsetWidth;
        chartTopLayoutRight.style.minWidth = '0px';
        chartTopLayoutRight.style.width = '0px';
        chartTopLayoutLeft.style.width = (chartTopLayoutLeft.offsetWidth + prevWidth) + 'px';
        // chartTopRightCollapseBtn.innerText = '<';
        chartTopRightCollapseBtn.innerText = '<';
    }

}


window.onresize = (e) => {
    chartTopLayoutLeft.style.transition = 'none';
    chartTopLayoutLeft.style.width = (chartTopLayout.offsetWidth - chartTopLayoutRight.offsetWidth) + 'px';
}

// document.addEventListener("resize", windowResizeHandler);

// const windowResizeHandler = (e) => {
//     chartTopLayoutLeft.style.width = chartTopLayout.offsetWidth - chartTopLayoutRight.offsetWidth;
// }

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

let noOfDivs = 5; // Need 5 divs in container div;
let layout = "vertical"; // vertical | horizontal , specifies whether divs created must be vertically stacked or horizontally arranged

const container = $(".container");

let backgroundColors = ["cornflowerblue", "aquamarine", "hotpink", "burlywood", "darkgrey"];
let rowAbove, rowBelow;

const mouseDownHandler = function mouseDownHandler(e) {
    yCord = e.clientY; // yCord stores Y cordinate value when mouse is initially clicked

    let id = "#" + e.target.id;
    // get row above and below resizer
    // console.log("Id contains collapseBtn: " ,id.indexOf("collapseBtn"));
    // previous and next of #collapseBtn is undefined i.e. does not exist, hence using the condition: 
    // If id does not contain substring "collapseBtn" then execute
    if (id.indexOf("collapseBtn") == -1) {
        rowBelow = $(id).next()[0];
        rowAbove = $(id).prev()[0];
        if(rowBelow.offsetHeight == 0)
            return;
        let bothRowHeightCombined = rowAbove.offsetHeight + rowBelow.offsetHeight;

        if (!isEmptyOrUndefined(rowAbove) && !isEmptyOrUndefined(rowBelow)) {
            $(document.body).on("mousemove", (e) => {
                mouseMoveHandler(e, rowAbove, rowBelow, bothRowHeightCombined);
            });
            $(document.body).on("mouseup", mouseUpHandler);
        }
    }

    // $("mousemove", mouseMoveHandler);
    // $("mouseup", mouseUpHandler);
}


const mouseMoveHandler = function (e, rowAbove, rowBelow, bothRowHeightCombined) {
    let dy = yCord - e.clientY; // dy < 0, when cursor is moved down, dy > 0 when cursor is moved up
    // console.log(dy);
    // How to select divs to be resized
    rowAbove.style.transition = 'none';
    rowBelow.style.transition = 'none';

    rowAbove.style.height = (rowAbove.offsetHeight - dy) + 'px';
    rowBelow.style.height = (bothRowHeightCombined - rowAbove.offsetHeight) + 'px';
    yCord = e.clientY;
}

const mouseUpHandler = () => {
    $(document.body).off("mousemove");
    $(document.body).off("mouseup");
}

let containerHeight = container.height() - (noOfDivs - 1) * 7;
let prevDivHeight;
function collapseDiv(currDiv, prevDiv) {
    console.log(currDiv.height(), prevDiv.height());
    // If bottom div is collapsed, then expand it
    if (currDiv.height() == 0) {
        prevDiv.css({
            "transition": "height 0.2s ease",
            "height": (prevDiv.height() - prevDivHeight) + 'px'
        });

        currDiv.css({
            "transition": "height 0.2s ease",
            "height": prevDivHeight + 'px'
        })
    }
    // If bottom div is not collapsed, then collapse it
    else {
        prevDiv.css({
            "transition": "height 0.2s ease",
            "height": (currDiv.height() + prevDivHeight) + 'px'
        });
        prevDivHeight = currDiv.height();
        currDiv.css({
            "transition": "height 0.2s ease",
            "height": '0px'
        })
    }
}

// function to create divs inside container - which are vertically resizable and collapsable
function createDivs(layout, noOfDivs) {
    if (layout == "vertical") {
        container.css({
            "display": "flex",
            "flex-direction": "column",
            "justify-content": "flex-start"
        });

        let divHeight = containerHeight / noOfDivs;
        for (let i = 1; i <= noOfDivs; i++) {
            if (i == 1) {
                // Creating Div No. 1
                container.append(`
                    <div class='row' id='row` + i + `' style='background-color:` + backgroundColors[i - 1] + `; height: ` + divHeight + `px;'>

                    </div>
                `);
            }
            else if (i > 1 && i < noOfDivs) {
                // Creating resizer and other divs 
                container.append(`
                    <div class='row_resizer' id='resizer` + i + `'>
                        <button class="collapse_btn" id='collapseBtn`+ i + `'>
                            &#x25BC;
                        </button>
                    </div>
                `);
                let resizerId = "#resizer" + i;


                $(resizerId).on("mousedown", mouseDownHandler);

                container.append(`
                    <div class='row' id='row` + i + `' style='background-color:` + backgroundColors[i - 1] + `; height: ` + divHeight + `px;'>

                    </div>
                `);

                let collapseBtnId = "#collapseBtn" + i;

                let rowId = "#row" + i;
                let prevDivId = "#row" + (i - 1);
                prevDivHeight = $(prevDivId).height();
                $(collapseBtnId).on("click", function () {
                    collapseDiv($(rowId), $(prevDivId));
                });
            }
            else {
                // Creating bottom div
                container.append(`
                    <div class='row_resizer' id='resizer` + i + `'>
                        <button class="collapse_btn" id='collapseBtn`+ i + `'">
                            &#x25BC;
                        </button>
                    </div>
                `);

                let resizerId = "#resizer" + i;
                let collapseBtnId = "#collapseBtn" + i;


                $(resizerId).on("mousedown", mouseDownHandler);

                // container.append(`
                //     <div class='row' id='row` + i + `' style='background-color:` + backgroundColors[i - 1] + `; height: ` + divHeight + `px; position: static; bottom: 0; min-height: 50px'>

                //     </div>
                // `);
                container.append(`
                    <div class='row' id='row` + i + `' style='background-color:` + backgroundColors[i - 1] + `; height: ` + divHeight + `px;'>

                    </div>
                `);
                let rowId = "#row" + i;
                let prevDivId = "#row" + (i - 1);
                prevDivHeight = $(prevDivId).height();
                $(collapseBtnId).on("click", function () {
                    collapseDiv($(rowId), $(prevDivId));
                });


            }
        }
    }
    else {

    }
}

createDivs("vertical", noOfDivs);

const rows = $(".row"); // collection(Array) of all rows, row.id starts from 1
const resizers = $(".row_resizer"); // collection(Array) of all resizers, resizer.id starts from 2

// let yCord;

// resizers.on("mousedown", mouseDownHandler)



// const chartMiddleDivider = document.getElementById('chartMiddleDivider');
// let yCord;

// chartMiddleDivider.addEventListener('mousedown', (e) => {
//     yCord = e.clientY; // yCord stores Y cordinate value when mouse is initially clicked


//     document.addEventListener('mousemove', mouseMoveHandlerMiddleDivider);

//     document.addEventListener('mouseup', mouseUpHandlerMiddleDivider);


// });

// // For collapsing bottom div
// let prevHeight = chartBottomLayout.offsetHeight;
// function collapseChartBottomLayout() {
//     // If bottom div is collapsed, then expand it
//     if (chartBottomLayout.offsetHeight == 0) {
//         chartTopLayout.style.transition = 'height 0.2s ease';
//         chartBottomLayout.style.transition = 'height 0.2s ease';
//         chartTopLayout.style.height = (chartPanel.offsetHeight - prevHeight) + 'px';
//         chartBottomLayout.style.height = prevHeight + 'px';

//     }
//     // If bottom div is not collapsed, then collapse it
//     else {
//         chartTopLayout.style.transition = 'height 0.2s ease';
//         chartBottomLayout.style.transition = 'height 0.2s ease';
//         prevHeight = chartBottomLayout.offsetHeight;
//         chartBottomLayout.style.height = '0px';
//         chartTopLayout.style.height = (chartTopLayout.offsetHeight + prevHeight - 15) + 'px';

//     }

// }


