let fs = require("fs");
// let files = [
//     { "fileName": "", "path": "" },
// ];

let dirPath = "C:/Users/USER/Downloads/Detailed Views HTML Files/";
function addHtml() {
    // var files = fs.readdirSync(dirPath);

    let files = [
        'SectorRotation.html',
        'Heatmap.html',
        'OHLCfilters.html',
        'DemandSupplyZones.html',
        'VWAP.html',
        'PriceAction.html',
        'Volume.html',
        'HighLows.html',
        'OtherOptions.html',
        'TechIndicators.html',
        'RSI.html',
        'MACD.html',
        'Supertrend.html',
        'Bollinger.html',
        'Ichimoku.html',
        'MovAverage.html',
        'ChartPatterns.html',
        'Fundamental.html',
        'Learning.html',
    ]

    console.log(files);

    let html = "";
    for (let i = 0; i < files.length; i++) {
        // console.log(dirPath + files[i]);
        // console.log(getFileContent(dirPath + files[i]));
        // getFileContent(files[i], dirPath + files[i]).then((data) => {
        //     // console.log(data);
        //     html += data;
        // });
        html += getFileContent(files[i], dirPath + files[i]);
    }
    setTimeout(() => {
        // console.log("---------HTML---------------");
        // console.log();
        // console.log(html);
        // console.log();

        fs.writeFile("./tableSectionHtml.html", html, () => { });
    }, 4000);
    // console.log(html);

}

function getFileContent(fileName, filepath) {

    let data = fs.readFileSync(filepath, 'utf8');
    //     (err, data) => {
    //     if (data) {
    //         // data += `<!-- ${fileName} Section code -->`
    //         console.log(`<!-- ${fileName} Section code --> \n`, data);
    //         return data;
    //     } else {
    //         // console.log("undefined", data);
    //         return "";
    //     }
    // });
    // console.log();
    // console.log("in getFileContent()", data);
    // console.log();
    return data;
}


addHtml();