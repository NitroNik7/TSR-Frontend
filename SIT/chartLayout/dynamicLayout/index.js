
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
    createDivs("horizontal", Number($("#noOfDivs").val()));
    // return $("#noOfDivs").val();
});

// let noOfDivs = 5; // Need 5 divs in container div;
// let layout = "horizontal"; // vertical | horizontal , specifies whether divs created must be vertically stacked or horizontally arranged

const container = $(".container");

let backgroundColors = ["cornflowerblue", "aquamarine", "hotpink", "burlywood", "darkgrey"];
let rowAbove, rowBelow;

const mouseDownHandler = function mouseDownHandler(e) {
    // console.log($(e.target).attr('class').indexOf("row_resizer"));
    if ($(e.target).attr('class').indexOf("row_resizer") != -1) {
        yCord = e.clientY; // yCord stores Y cordinate value when mouse is initially clicked

        let id = "#" + e.target.id;
        // get row above and below resizer
        // console.log("Id contains collapseBtn: " ,id.indexOf("collapseBtn"));
        // previous and next of #collapseBtn is undefined i.e. does not exist, hence using the condition: 
        // If id does not contain substring "collapseBtn" then execute
        if (id.indexOf("collapseBtn") == -1) {
            rowBelow = $(id).next()[0];
            rowAbove = $(id).prev()[0];
            if (rowBelow.offsetHeight == 0)
                return;
            let bothRowHeightCombined = rowAbove.offsetHeight + rowBelow.offsetHeight;

            if (!isEmptyOrUndefined(rowAbove) && !isEmptyOrUndefined(rowBelow)) {
                $(document.body).on("mousemove", (e) => {
                    rowMouseMoveHandler(e, rowAbove, rowBelow, bothRowHeightCombined);
                });
                $(document.body).on("mouseup", mouseUpHandler);
            }
        }
    }
    else {
        xCord = e.clientX;

        let id = "#" + e.target.id;

        if (id.indexOf("collapseBtn") == -1) {
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

const rowMouseMoveHandler = function (e, rowAbove, rowBelow, bothRowHeightCombined) {
    let dy = yCord - e.clientY; // dy < 0, when cursor is moved down, dy > 0 when cursor is moved up
    // console.log(dy);
    // How to select divs to be resized
    rowAbove.style.transition = 'none';
    rowBelow.style.transition = 'none';

    rowAbove.style.height = (rowAbove.offsetHeight - dy) + 'px';
    rowBelow.style.height = (bothRowHeightCombined - rowAbove.offsetHeight) + 'px';
    yCord = e.clientY;
}

const colMouseMoveHandler = function (e, colAfter, colBefore) {
    let dx = xCord - e.clientX;

    colAfter.style.transition = 'none';
    colBefore.style.transition = 'none';
    let newColAfterWidth, newColBeforeWidth;
    if (dx < 0) {
        newColBeforeWidth = colBefore.offsetWidth - dx + 'px';
        newColAfterWidth = colAfter.offsetWidth + dx + 'px';

        colBefore.style.width = newColBeforeWidth;
        colAfter.style.width = newColAfterWidth;
    }
    else {
        newColBeforeWidth = colBefore.offsetWidth - dx + 'px';
        newColAfterWidth = colAfter.offsetWidth + dx + 'px';

        colBefore.style.width = newColBeforeWidth;
        colAfter.style.width = newColAfterWidth;
    }
    xCord = e.clientX;
    container.on('mouseleave', mouseUpHandler);

}

const mouseUpHandler = () => {
    $(document.body).off("mousemove");
    $(document.body).off("mouseup");
}

let containerHeight = container.height() - (noOfDivs - 1) * 7;
let prevDivHeight, prevDivWidth;

function collapseDiv(prevDiv, postDiv) {
    let newPrevDivWidth, newPostDivWidth;
    if (prevDiv.attr("class").indexOf("col") != -1 && postDiv.attr("class").indexOf("col") != -1) {
        postDiv.css({
            transition: "0.2s ease"
        });
        prevDiv.css({
            transition: "0.2s ease"
        });
        // If div is collapsed
        if (postDiv.width() == 0) {
            newPrevDivWidth = prevDiv.width() - 300 + 'px';
            newPostDivWidth = 300 + 'px';

            prevDiv.width(newPrevDivWidth);
            postDiv.width(newPostDivWidth);

            prevDiv.next().on("mousedown", mouseDownHandler);

        }
        // If div is expanded
        else {
            newPrevDivWidth = prevDiv.width() + postDiv.width() + 'px';
            newPostDivWidth = '0px';

            prevDiv.width(newPrevDivWidth);
            postDiv.width(newPostDivWidth);

            prevDiv.next().off("mousedown");
        }
    }
}

    // console.log(container.class()); 
    // console.log(`currDivClass: ${currDiv.attr('class')} classContainsRow: ${currDiv.attr('class').indexOf("row")}` );
    // if (currDiv.attr('class').indexOf("row") != -1 && prevDiv.attr('class').indexOf("row") != -1) {
    //     console.log(currDiv.height(), prevDiv.height());
    //     // If bottom div is collapsed, then expand its
    //     if (currDiv.height() == 0) {
    //         prevDiv.css({
    //             "transition": "height 0.2s ease",
    //             "height": (prevDiv.height() - prevDivHeight) + 'px'
    //         });

    //         currDiv.css({
    //             "transition": "height 0.2s ease",
    //             "height": prevDivHeight + 'px'
    //         })
    //     }
    //     // If bottom div is not collapsed, then collapse it
    //     else {
    //         prevDiv.css({
    //             "transition": "height 0.2s ease",
    //             "height": (currDiv.height() + prevDivHeight) + 'px'
    //         });
    //         prevDivHeight = currDiv.height();
    //         currDiv.css({
    //             "transition": "height 0.2s ease",
    //             "height": '0px'
    //         })
    //     }
    // }
    
    

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
        container.css({
            "display": "flex",
        });
        let containerWidth = container.width() - (noOfDivs - 1) * 7;
        let divWidth = containerWidth / noOfDivs;
        for (let i = 1; i <= noOfDivs; i++) {
            if (i == 1) {
                // Appending first div
                container.append(`
                    <div class='column' id='column` + i + `' style='background-color:` + backgroundColors[i - 1] + `; width: ` + divWidth + `px;'>
                        
                    </div>
                `);
            }
            else if (i > 1 && i < noOfDivs) {
                // Appending resizer 
                container.append(`
                    <div class='col_resizer' id='resizer` + i + `'>
                        <button class="collapse_btn" id='collapseBtn`+ i + `'>
                            &#x25BC;
                        </button>
                    </div>
                `);
                let resizerId = "#resizer" + i;
                $(resizerId).on("mousedown", mouseDownHandler);

                // Appending column
                container.append(`
                    <div class='column' id='column` + i + `' style='background-color:` + backgroundColors[i - 1] + `; width: ` + divWidth + `px;'>
                        
                    </div>
                `);

                let collapseBtnId = "#collapseBtn" + i;

                let colId = "#column" + i;
                let prevDivId = "#column" + (i - 1);
                prevDivWidth = $(prevDivId).width();
                $(collapseBtnId).on("click", function () {
                    collapseDiv($(prevDivId), $(colId));
                });
            }
            else {
                // Appending last resizer
                container.append(`
                    <div class='col_resizer' id='resizer` + i + `'>
                        <button class="collapse_btn" id='collapseBtn`+ i + `'">
                            &#x25BC;
                        </button>
                    </div>
                `);

                let resizerId = "#resizer" + i;
                let collapseBtnId = "#collapseBtn" + i;


                $(resizerId).on("mousedown", mouseDownHandler);

                // Appending last column
                container.append(`
                    <div class='column' id='column` + i + `' style='background-color:` + backgroundColors[i - 1] + `; width: ` + divWidth + `px;'>

                    </div>
                `);

                let colId = "#column" + i;
                let prevDivId = "#column" + (i - 1);
                prevDivWidth = $(prevDivId).width();
                $(collapseBtnId).on("click", function () {
                    collapseDiv($(prevDivId), $(colId));
                });
            }
        }
    }
}

// createDivs(layout, noOfDivs);

const rows = $(".row"); // collection(Array) of all rows, row.id starts from 1
const resizers = $(".row_resizer"); // collection(Array) of all resizers, resizer.id starts from 2

let yCord;
let xCord;
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


