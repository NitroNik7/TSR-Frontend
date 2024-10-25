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

    $(".row").css({
        height: (container.height() / noOfDivs.val() + 'px')
    })
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

let noOfDivs = $("#noOfDivs").on("change", () => {
    createDivs("vertical", Number($("#noOfDivs").val()));
    // return $("#noOfDivs").val();
});

// Need 5 divs in container div;
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
        if (rowBelow.offsetHeight == 0) // when bottom div is collapsed, don't resize
            return;
        // let bothRowHeightCombined = rowAbove.offsetHeight + rowBelow.offsetHeight;

        if (!isEmptyOrUndefined(rowAbove) && !isEmptyOrUndefined(rowBelow)) {
            // console.log("mousedown at ", yCord);
            $(document.body).on("mousemove", (e) => {
                mouseMoveHandler(e, rowAbove, rowBelow);
            });
            $(document.body).on("mouseup", mouseUpHandler);
        }
        else{
            return;
        }
    }

    // $("mousemove", mouseMoveHandler);
    // $("mouseup", mouseUpHandler);
}

let  = 0, output = '';
const mouseMoveHandler = function (e, rowAbove, rowBelow) {
    let dy = yCord - e.clientY; // dy < 0, when cursor is moved down, dy > 0 when cursor is moved up
    // console.log("dy ", dy, " e.clientY: " , e.clientY);
    // How to select divs to be resized
    rowAbove.style.transition = 'none';
    rowBelow.style.transition = 'none';
    bothRowHeightCombined = rowAbove.offsetHeight + rowBelow.offsetHeight;

    // Before modification
    output+=`Before: yCord: ${yCord} dy: ${dy} bothRowHeightCombined: ${bothRowHeightCombined} rowAbove height: ${rowAbove.offsetHeight},  rowBelow height: ${rowBelow.offsetHeight}`;
    console.log("Before: yCord: ", yCord, " dy: " , dy, " bothRowHeightCombined: ", bothRowHeightCombined, " rowAbove height: ", rowAbove.offsetHeight, " rowBelow height: ", rowBelow.offsetHeight);
    let aboveHeight = rowAbove.offsetHeight - dy;
    rowAbove.style.height = (rowAbove.offsetHeight - dy) + 'px';
    rowBelow.style.height = (bothRowHeightCombined - aboveHeight) + 'px';
    output+=`After: yCord: ${yCord} dy: ${dy} bothRowHeightCombined: ${bothRowHeightCombined} rowAbove height: ${rowAbove.offsetHeight},  rowBelow height: ${rowBelow.offsetHeight}`;
    console.log("After:  yCord: ", yCord, " dy: " , dy, " bothRowHeightCombined: ", bothRowHeightCombined,  " rowAbove height: ", rowAbove.offsetHeight, " rowBelow height: ", rowBelow.offsetHeight);
    // console.log("dy ", dy, " e.clientY: " , e.clientY);
    yCord = e.clientY;
    
}

const mouseUpHandler = () => {
    $(document.body).off("mousemove");
    $(document.body).off("mouseup");
}


let prevDivHeight;
function collapseDiv(currDiv, prevDiv) {
    // console.log(currDiv.height(), prevDiv.height());
    // If bottom div is collapsed, then expand it
    if (currDiv.height() == 0) {
        // console.log(`"currDivHeight: ` + currDiv.height() + ` prevDivHeight: `+ prevDiv.height() + `"`);
        $("#showHeights").html(`currDivHeight: ` + currDiv.height() + ` prevDivHeight: `+ prevDiv.height());

        prevDiv.css({
            // "transition": "height 0.2s ease",
            "height": (prevDiv.height() - prevDivHeight) + 'px'
        });

        currDiv.css({
            // "transition": "height 0.2s ease",
            "height": prevDivHeight + 'px'
        })
    }
    // If bottom div is not collapsed, then collapse it
    else {

        prevDivHeight = currDiv.height();
        currDiv.css({
            "transition": "height 0.2s ease",
            "height": '0px'
        })
        prevDiv.css({
            "transition": "height 0.2s ease",
            "height": "100%"
        });
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
        let containerHeight = container.height() - (noOfDivs - 1) * 7;
        let divHeight = containerHeight / noOfDivs;
        for (let i = 1; i <= noOfDivs; i++) {
            if (i == 1) {
                // Creating Div No. 1
                container.append(`
                    <div class='row' id='row` + i + `' style='background-color:` + backgroundColors[i - 1] + `; height: ` + divHeight + `px;'>
                        <div class="table-container">
                            <h3>Stock Name: ADANI ENT</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Open</th>
                                        <th>High</th>
                                        <th>Low</th>
                                        <th>Close</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>2024-10-10</td><td>2000</td><td>2050</td><td>1980</td><td>2030</td></tr>
                                    <tr><td>2024-10-09</td><td>1985</td><td>2015</td><td>1970</td><td>1990</td></tr>
                                    <tr><td>2024-10-08</td><td>1990</td><td>2020</td><td>1950</td><td>2000</td></tr>
                                    <tr><td>2024-10-07</td><td>1950</td><td>1980</td><td>1925</td><td>1960</td></tr>
                                    <tr><td>2024-10-06</td><td>1930</td><td>1955</td><td>1905</td><td>1940</td></tr>
                                    <tr><td>2024-10-05</td><td>1910</td><td>1935</td><td>1895</td><td>1920</td></tr>
                                    <tr><td>2024-10-04</td><td>1920</td><td>1960</td><td>1910</td><td>1950</td></tr>
                                    <tr><td>2024-10-03</td><td>1900</td><td>1925</td><td>1885</td><td>1915</td></tr>
                                    <tr><td>2024-10-02</td><td>1890</td><td>1915</td><td>1870</td><td>1905</td></tr>
                                    <tr><td>2024-10-01</td><td>1885</td><td>1900</td><td>1865</td><td>1895</td></tr>
                                </tbody>
                            </table>
                        </div>
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
                        <div class="content-container">
                            <h3>About Adani Enterprises Limited</h3>
                            <div class="company-info">
                                <p><strong>Address:</strong> Adani Corporate House, Ahmedabad, India, 382421</p>
                                <p><strong>Tel:</strong> +91 79 2656 5555</p>
                                <p><strong>URL:</strong> <a href="https://www.adanienterprises.com" target="_blank">https://www.adanienterprises.com</a></p>
                                <p><strong>Code:</strong> ADANIENT, <strong>ISIN:</strong> INE423A01024, <strong>Exchange:</strong> NSE, <strong>Country:</strong> India</p>
                                <p><strong>Fiscal Year End:</strong> March</p>
                                <p><strong>Employee Count:</strong> 8676</p>
                            </div>

                            <div class="description">
                                <p>Adani Enterprises Limited, together with its subsidiaries, operates as a conglomerate company in India and internationally. It operates through the following segments:</p>
                                <ul>
                                    <li>Integrated Resources Management</li>
                                    <li>Mining Services</li>
                                    <li>Commercial Mining</li>
                                    <li>New Energy Ecosystem</li>
                                    <li>Airport, Road, and Others</li>
                                </ul>

                                <p>The company offers transport and logistics services; manufactures cement, hydrogen and its derivatives, polysilicon, ingots, wafers, solar cells with modules, wind turbines, generators, electrolysers, and fuel cells, as well as ammonia and urea. It offers integrated coal management services; imports fruits including apples, pears, kiwis, oranges, grapes, and other fruits under the <strong>FARM-PIK</strong> brand; generates solar and wind energy; and manufactures solar panels.</p>

                                <p>Adani Enterprises is involved in the mining of iron ore, copper, and aluminum properties; minerals such as limestone, chromite, diamond, bauxite, and graphite; and the mining and trading of coal. It also offers a variety of edible oils, rice, pulses, and wheat flour under brands like <strong>Fortune</strong>, <strong>King's</strong>, <strong>Bullet</strong>, <strong>Raag</strong>, <strong>Avsar</strong>, and more. In addition, the company manufactures polyvinyl chloride, caustic soda, tar, hydrated lime, etc.</p>

                                <p>The company is also active in defense manufacturing, producing fighter aircraft, unmanned aerial systems, helicopters, submarines, air defense guns, missiles, and small arms. It develops avionics and systems, opto-electronics, aerospace composites, radar and electronic warfare systems, and constructs highways, motorways, railways, and metro-rail systems.</p>

                                <p>Additionally, it engages in sewage and wastewater treatment, operates airports, develops data centers, and more. Founded in 1988 and headquartered in Ahmedabad, India, Adani Enterprises Limited operates as a subsidiary of S.B. Adani Family Trust.</p>
                            </div>
                        </div>
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
                        <div style="background-color: white; height: 100%; margin: 15px; display: flex; flex-direction: column; justify-content: center">
                            <svg width="200" height="43"><defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" spreadMethod="pad"><stop offset="0%" stop-color="#ff0000" stop-opacity="1"></stop><stop offset="50%" stop-color="#e6e600" stop-opacity="1"></stop><stop offset="100%" stop-color="#009900" stop-opacity="1"></stop></linearGradient></defs><g><text x="110" y="10" text-anchor="end" style="font-size: 12px; font-weight: bold;">TSR Growth Index</text></g><g><rect x="0" y="15" width="190" height="8" rx="4" style="fill: url(&quot;#gradient&quot;);"></rect></g><g><line x1="109.72500000000002" y1="15" x2="109.72500000000002" y2="23" stroke-width="1" stroke-dasharray="2, 2" stroke="black "></line></g><path d="M0,-7.019061402413294L6.07868548521274,3.509530701206647L-6.07868548521274,3.509530701206647Z" fill="#000" stroke="#000" stroke-width="1" transform="translate(109.72500000000002,25)"></path><g><text x="10" y="34" style="font-size: 10px; font-weight: bold;">Low</text></g><g><text x="180" y="34" text-anchor="end" style="font-size: 10px; font-weight: bold;">High</text></g><g><text x="109" y="34" text-anchor="end" style="font-size: 9px; font-weight: bold;">57.75%</text></g></svg>
                            
                            <svg width="200" height="43"><defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" spreadMethod="pad"><stop offset="0%" stop-color="#ff0000" stop-opacity="1"></stop><stop offset="50%" stop-color="#e6e600" stop-opacity="1"></stop><stop offset="100%" stop-color="#009900" stop-opacity="1"></stop></linearGradient></defs><g><text x="110" y="10" text-anchor="end" style="font-size: 12px; font-weight: bold;">TSR Growth Index</text></g><g><rect x="0" y="15" width="190" height="8" rx="4" style="fill: url(&quot;#gradient&quot;);"></rect></g><g><line x1="109.72500000000002" y1="15" x2="109.72500000000002" y2="23" stroke-width="1" stroke-dasharray="2, 2" stroke="black "></line></g><path d="M0,-7.019061402413294L6.07868548521274,3.509530701206647L-6.07868548521274,3.509530701206647Z" fill="#000" stroke="#000" stroke-width="1" transform="translate(109.72500000000002,25)"></path><g><text x="10" y="34" style="font-size: 10px; font-weight: bold;">Low</text></g><g><text x="180" y="34" text-anchor="end" style="font-size: 10px; font-weight: bold;">High</text></g><g><text x="109" y="34" text-anchor="end" style="font-size: 9px; font-weight: bold;">57.75%</text></g></svg>
                        </div>    
                        
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





const rows = $(".row"); // collection(Array) of all rows, row.id starts from 1
const resizers = $(".row_resizer"); // collection(Array) of all resizers, resizer.id starts from 2