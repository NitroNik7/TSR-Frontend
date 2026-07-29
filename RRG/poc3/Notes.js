// TODO
// Rename id's / classnames
// Auth
// Get data using ajax only
// calc. RRG values
// Article


// * --------------------- PLAN --------------------------

init();
// // get settings
// // get Data accd. to Auth
// // calc. RRG values
// // render UI - charts, timeline & indicesContainer

updateIndices();
// // when index category changes

renderChart();
// // when index is enabled / disabled
// // when index category changes
// // when tail changes

const tickPeriods = [
    {
        id: "5m", label: "5 mins", periods: [
            { id: "100", label: "Last 100 records" },
            { id: "200", label: "Last 200 records" },
            { id: "500", label: "Last 500 records" }
        ]
    },
    {
        id: "D", label: "Daily", periods: [
            { id: "1m", label: "1 Month" },
            { id: "3m", label: "3 Months" },
            { id: "1y", label: "1 Year" },
        ]
    },
    {
        id: "W", label: "Weekly", periods: [
            { id: "3m", label: "3m" },
            { id: "1y", label: "1 Year" },
            { id: "2y", label: "2 Years" }
        ]
    },
    {
        id: "M", label: "Monthly", periods: [
            { id: "1y", label: "1 Year" },
            { id: "2y", label: "2 Years" },
            { id: "3y", label: "3 Years" },
            { id: "4y", label: "4 Years" },
            { id: "5y", label: "5 Years" },
        ]
    },
];




// NIFTY IT
// https://www.topstockresearch.com/charts/csv/200000/9700M.csv?var=39    

// NIFTY AUTO
// https://www.topstockresearch.com/charts/csv/200000/8200M.csv?var=26

// NIFTY PHARMA
// https://www.topstockresearch.com/charts/csv/200000/8800M.csv?var=45

// NIFTY METALS
// https://www.topstockresearch.com/charts/csv/200000/8000M.csv?var=12

// NIFTY Oil Gas
// https://www.topstockresearch.com/charts/csv/200000/4700M.csv?var=68

// NIFTY MEDIA
//  https://www.topstockresearch.com/charts/csv/200000/8100M.csv?var=74

// NIFTY MIDCAP 50
// https://www.topstockresearch.com/charts/csv/200000/9400M.csv?var=8

// NIFTY RURAL
// https://www.topstockresearch.com/charts/csv/200000/48500M.csv?var=8


const indexData = {
    "NIFTY 50": { id: "NIFTY 50", label: "NIFTY 50", pr: false, color: "#3b82f6" },
    "NIFTY AUTO": { id: "NIFTY_AUTO", name: "NIFTY AUTO", label: "NIFTY AUTO", pr: false, color: "#ec4899" },
    "NIFTY BANK": { id: "NIFTY BANK", label: "NIFTY BANK", pr: false, color: "#2eff51" },
    "NIFTY CONSUMER DURABLES": { id: "NIFTY CONSUMER DURABLES", label: "NIFTY CONSUMER DURABLES", pr: true, color: "#857c4c" },
    "NIFTY FINANCIAL SERVICES": { id: "NIFTY FINANCIAL SERVICES", label: "NIFTY FINANCIAL SERVICES", pr: true, color: "#ffcb11" },
    "NIFTY FMCG": { id: "NIFTY FMCG", label: "NIFTY FMCG", pr: true, color: "#854c4e" },
    "NIFTY HEALTHCARE": { id: "NIFTY HEALTHCARE", label: "NIFTY HEALTHCARE", pr: true, color: "#ff00f7" },
    "NIFTY IT": { id: "NIFTY IT", label: "NIFTY IT", pr: false, color: "#8b5cf6" },
    "NIFTY MEDIA": { id: "NIFTY MEDIA", label: "NIFTY MEDIA", pr: true, color: "#260bf5" },
    "NIFTY METALS": { id: "NIFTY METALS", label: "NIFTY METALS", pr: true, color: "#684200" },
    "NIFTY OIL GAS": { id: "NIFTY OIL GAS", label: "NIFTY OIL GAS", pr: true, color: "#49dc95" },
    "NIFTY PHARMA": { id: "NIFTY PHARMA", label: "NIFTY PHARMA", pr: true, color: "#f59e0b" },
    "NIFTY PRIVATE BANK": { id: "NIFTY PRIVATE BANK", label: "NIFTY PRIVATE BANK", pr: true, color: "#f59e0b" },
    "NIFTY PSU BANK": { id: "NIFTY PSU BANK", label: "NIFTY PSU BANK", pr: true, color: "#0b80f575" },
    "NIFTY REALTY": { id: "NIFTY REALTY", label: "NIFTY REALTY", pr: true, color: "#f600d541" },
    "NIFTY RURAL": { id: "NIFTY RURAL", label: "NIFTY RURAL", pr: true, color: "#5af7ff" },
    "NIFTY FMCG": { id: "NIFTY FMCG", label: "NIFTY FMCG", pr: true, color: "#4e854c" },
};

// code: "NIFTY", scId: "200000", ecId: "10000", ccId: "in"