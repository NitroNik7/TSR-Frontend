var indexData = null;

const periodSelect = document.getElementById("tsrRrgPeriodSelect");
const tickSelect = document.getElementById("tsrRrgTickSelect");

let htmlU = mintHtmlUtil;
let jsu = mintJsUtil;

const tickPeriodDef = [
    // {
    //     id: "mm5", label: "5 mins", pr: true, periods: [
    //         { id: "100", label: "Last 100 records" },
    //         { id: "200", label: "Last 200 records" },
    //         { id: "500", label: "Last 500 records" }
    //     ]
    // },
    {
        id: "D", label: "Daily", pr: false, periods: [
            { id: "1m", label: "1 Month" },
            { id: "3m", label: "3 Months" },
            { id: "1y", label: "1 Year" },
        ]
    },
    {
        id: "W", label: "Weekly", pr: true, periods: [
            { id: "3m", label: "3 Months" },
            { id: "1y", label: "1 Year" },
            { id: "2y", label: "2 Years" }
        ]
    },
    {
        id: "M", label: "Monthly", pr: true, periods: [
            { id: "1y", label: "1 Year" },
            { id: "2y", label: "2 Years" },
            { id: "3y", label: "3 Years" },
            { id: "4y", label: "4 Years" },
            { id: "5y", label: "5 Years" },
        ]
    },
];


function populateTickSelect() {

    // let premiumUser = isPrUser();
    let html = "";
    for (let i = 0; i < tickPeriodDef.length; i++) {

        let disabled = '';
        // if (tickPeriodDef[i].pr) {
        //     disabled = premiumUser ? '' : "disabled";
        // }

        html += `<option value="${tickPeriodDef[i].id}" ${disabled}>${tickPeriodDef[i].label}</option>`

    }

    tickSelect.innerHTML = html;
    tickSelect.addEventListener("change", () => {
        populatePeriodSelect();

        // update data and UI
        // Object.keys(indexData).forEach((idxName) => {
        //     indexData[idxName].data = null;
        // })

        // userAction('init');
        // setTimeout(() => {
        //     process();
        // }, 2000);

        miSrg.init();
        setTimeout(() => {
            indexData = miSrg.gid();
        }, 2000);
        console.log();
    });
}

function populatePeriodSelect() {
    let tick = tickSelect.value;

    let tickPeriod = jsu.getObjFrmArr(tickPeriodDef, tick);

    let periodArr = tickPeriod.periods;

    let html = "";
    for (let i = 0; i < periodArr.length; i++) {
        html += `<option value="${periodArr[i].id}">${periodArr[i].label}</option>`
    }

    periodSelect.innerHTML = html;

    // periodSelect.addEventListener("change", () => {
    //     updateMasterTimeline();
    //     updateTimelineFilter();
    //     renderChart();
    // });

}

populateTickSelect();
populatePeriodSelect();





