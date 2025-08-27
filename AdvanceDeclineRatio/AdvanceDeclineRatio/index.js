// const d3 = require("./d3.v7");

// import * as d3 from "./d3.v7";

var width, height;

var margin = { top: 10, right: 70, bottom: 20, left: 20 }

var offsetTop;

let tooltipStyle = "font-weight: bold; background-color: white; height: max-content;";

function setDimensions(params, chartDiv) {
    // width =  mintJsUtil.isNull(params.width) ? 300 : params.width ;
    // height = mintJsUtil.isNull(params.height) ? 300 : params.height ;


    width = chartDiv.width() - 100;

    smallDimention = width < 500 ? true : false;

    if (smallDimention) {
        margin.left = 5;
        margin.right = 5;
        margin.top = 5;
        margin.bottom = 35;
    }

    width = chartDiv.width() - margin.left - margin.right;


    if (window.innerHeight < chartDiv.height()) {
        height = window.innerHeight - margin.top - margin.bottom - 50;;
    } else {
        height = chartDiv.height() - margin.top - margin.bottom;
    }

    offsetTop = chartDiv.offset().top;
    // height = div.height()- margin.top - margin.bottom;

    // if(isMobile()){
    // 	width = $('#'+divId).width();
    // }
}

today = true;
function downloadData() {
    var filePrefix = ''
    if (today) {
        filePrefix = 'today';
    } else {
        filePrefix = 'D';
    }

    var url = '//' + window.location.hostname + '/charts/'

    // if(jsu.isMigContext()){

    //     if(jsu.isUsContext()){
    //         url += 'US/';
    //     }else if(jsu.isUkContext()){
    //         url += 'UK/';
    //     }else if(jsu.isCaContext()){
    //         url += 'CA/';
    //     }else if(jsu.isAuContext()){
    //         url += 'AU/';
    //     }

    // }

    // url +=   'csv/'+secId+'/'+equityId+filePrefix+'.csv' + '?var='+Math.floor((Math.random()*100)+1);;

    // var url = mintJsUtil.getBaseUrl()+'/charts/csv/'+secId +'/'+equityId+ filePrefix + '.csv?var='+Math.floor((Math.random()*100)+1);
    /*
            d3.csv(url, function(error, upData) {
            if (error){
                console.log(error);
            } else{
                if(today){
                    todaysData = upData;
                }else{
                    rawDailyData = upData;
                }
                drawChartFromData();
            }
            });   
    */

    url = "https://raw.githubusercontent.com/NitroNik7/TSR-Frontend/refs/heads/nitro/AdvanceDeclineRatio/AdvanceDeclineRatio/AdvanceDeclineData.csv";
    downloadAndProcess(url)

}


async function downloadAndProcess(url) {
    let upData = await d3.csv(url, d => d);

    if (today) {
        todaysData = upData;
    } else {
        rawDailyData = upData;
    }
    drawChartFromData(upData);
}


function isNull(obj) {
    if (obj == null)
        return true;

    return false;
}

function parseDate(date) {
    // The date and time string to parse
    let dateString = '' + date;
    // Split the string into components: day, month, year, hour, and minute
    const parts = dateString.split('_');
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Months are 0-based in JavaScript (0 = January)
    const year = parseInt(parts[2]);
    const hour = parseInt(parts[3]);
    const minute = parseInt(parts[4]);

    // Create a new Date object
    const parsedDate = new Date(year, month, day, hour, minute);

    // Log the result to the console
    return parsedDate;
}

setDimensions(null, $("#chartContainer"));
downloadData();

function drawChartFromData(upData) {

    const svg = d3.select("#chartContainer")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
    var data = [];

    for (var i = 0; i < upData.length; i++) {
        var d = upData[i];
        if (!isNaN(parseDate(d.Date)) && d.Advances != '' && d.Declines != '')
            data.push({ 'Date': parseDate(d.Date), 'Advances': Number(d.Advances), 'Declines': Number(d.Declines) });
    }

    const x = d3.scaleTime()
        .domain(d3.extent(data, function (d) { return d.Date }))
        .range([0, width]);
    svg.append("g")
        .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
        .call(d3.axisBottom(x)
            .ticks(d3.timeMinute.every(10)));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return d.Advances + d.Declines })])
        .range([height, 0]);
    svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(d3.axisLeft(y));

    // const y1 = d3.scaleLinear()
    //     .domain([0, d3.max(data, function (d) { return d.Advances + d.Declines })])
    //     .range([height / 2, 0]);
    // svg.append("g")
    //     .attr("transform", `translate(${margin.left}, ${margin.top})`)
    //     .call(d3.axisLeft(y1)
    //         .ticks(0))
    //     .attr("stroke-width", 0);

    // const y2 = d3.scaleLinear()
    //     .domain([0, d3.max(data, function (d) { return d.Advances + d.Declines })])
    //     .range([height, height / 2]);
    // svg.append("g")
    //     .attr("transform", `translate(${margin.left}, ${margin.top})`)
    //     .call(d3.axisLeft(y2)
    //         .ticks(0))
    //     .attr("stroke-width", 0);

    let advances = d3.line()
        .x(function (d) { return x(d.Date) })
        .y(function (d) { return y(d.Advances) })
    // Advances
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 1)
        .attr("d", advances)
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    let declines = d3.line()
        .x(function (d) { return x(d.Date) })
        .y(function (d) { return y(d.Declines) })
    // Declines
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1)
        .attr("d", declines)
        .attr("transform", `translate(${margin.left}, 0)`);



    const tooltip = d3.path();

    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("opacity", 0)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .on("mouseover", function (e) { mouseover(e) })
        .on("mousemove", function (e) { mousemove(e) })
        .on("mouseout", function (e) { mouseout(e) });

    let radius = 3;

    let circleAdvances = svg.append("g")
        .append("circle")
        .attr("r", radius)
        .attr("fill", "green")
        .attr("fill-opacity", "0.2")
        .attr("stroke", "green")
        .attr("stroke-width", "1.5")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("opacity", 0);

    let circleDeclines = svg.append("g")
        .append("circle")
        .attr("r", radius)
        .attr("fill", "red")
        .attr("fill-opacity", "0.2")

        .attr("stroke", "red")
        .attr("stroke-width", "1.5")
        .attr("transform", "translate(" + margin.left + "," + 0 + ")")
        .attr("opacity", 0);

    // // This allows to find the closest X index of the mouse:
    var bisect = d3.bisector(function (d) { return d.Date; }).left;

    // let div = document.createElement("div");
    // // div.style.zIndex = "999";
    // div.style.display = "block";
    // div.style.position = "absolute";
    // div.setAttribute("style", `
    //     display: block; 
    //     position: absolute; 
    //     border: 5px solid lightgray; 
    //     border-radius: 10px; 
    //     box-shadow: 0 1rem 3rem rgba(0,0,0,.1)!important; 
    //     padding: 5px`);

    // document.body.appendChild(div);

    svg.append("line")
        .attr("id", "crosshair")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", height)
        .attr("opacity", 0)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    tooltip.rect(0, 0, 50, 50);
    svg.append("g")
        .attr("id", "tooltipContainer")
        .attr("opacity", "0");

    d3.select("#tooltipContainer")
        .append("path")
        .attr("id", "tooltip")
        .attr("d", tooltip)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("opacity", "0.1")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.select("#tooltipContainer").append("text")
        .attr("id", "tooltipDateTime")
        .style("color", "black");

    d3.select("#tooltipContainer").append("text")
        .attr("id", "tooltipAdvances")
        .style("color", "black");

    d3.select("#tooltipContainer").append("text")
        .attr("id", "tooltipDeclines")
        .style("color", "black");

    function mouseover(e) {
        circleAdvances.attr("opacity", 1);
        circleDeclines.attr("opacity", 1);

        // div.style.opacity = "1";

        d3.select("#crosshair")
            .attr("opacity", "1");

        d3.select("#tooltipContainer")
            .attr("opacity", "1");
        // document.body.appendChild(div);
    }

    function mousemove(e) {
        let x0 = x.invert(e.pageX - margin.left - 8);

        var index = bisect(data, x0, 1);
        if (index <= data.length - 1) {

            let selectedData = data[index];

            circleAdvances.attr("cx", x(selectedData.Date));
            circleAdvances.attr("cy", y(selectedData.Advances));

            circleDeclines.attr("cx", x(selectedData.Date));
            circleDeclines.attr("cy", y(selectedData.Declines));

            // div.style.left = x(selectedData.Date) + 40 + "px";
            // div.style.top = ((offsetTop + height) / 2) + "px";

            // div.innerHTML = `<b>${(selectedData.Date.toLocaleString())}</b>
            //                 <br>
            //                 <span style="color: green">Advances: ${selectedData.Advances}</span>
            //                 <br>
            //             <span style="color: red">Declines: ${selectedData.Declines}</span>`;


            svg.select("#crosshair")
                .attr("x1", x(selectedData.Date))
                .attr("y1", 0)
                .attr("x2", x(selectedData.Date))
                .attr("y2", height)
                .attr("stroke", "gray") // Set the line color
                .attr("stroke-width", 1)
                .attr("stroke-dasharray", "3"); // Set the line thickness

            const newTooltip = d3.path();
            newTooltip.rect(x(selectedData.Date) + 15, e.pageY - offsetTop, 50, 50);

            d3.select("#tooltip")
                .attr("d", newTooltip);

            d3.select("#tooltipDateTime")
                .text("Time: " + selectedData.Date.toLocaleTimeString())
                .attr("x", x(selectedData.Date) + 45)
                .attr("y", e.pageY - offsetTop + margin.top + margin.bottom)
                .style("font-weight", "bold");

                d3.select("#tooltipAdvances")
                .text("Advance: " + selectedData.Advances)
                .attr("x", x(selectedData.Date) + 45)
                .attr("y", e.pageY - offsetTop + margin.top + margin.bottom + 15)
                .style("font-weight", "bold");

                d3.select("#tooltipDeclines")
                .html("<span style='color: red;'>Decline: " + selectedData.Declines + "</span>")
                .attr("x", x(selectedData.Date) + 45)
                .attr("y", e.pageY - offsetTop + margin.top + margin.bottom + 30)
                .style("font-weight", "bold");


        }
    }

    function mouseout(e) {

        circleAdvances.attr("opacity", 0);
        circleDeclines.attr("opacity", 0);

        d3.select("#crosshair")
            .attr("opacity", "0");

        d3.select("#tooltipContainer")
            .attr("opacity", "0");

    }
}

