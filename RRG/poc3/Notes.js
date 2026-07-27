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
                { id: "1y", label: "2 Years" }
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