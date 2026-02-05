let jsu = mintJsUtil;

// cs issue:
// code quality - don't know how to start correctly
//  options:
//      a. do it now
//      b. do it later
//      Option chosen : b. (As design can still change, code might also be required to change)
//  ways:
//      1. think about your code

// ui
// how to show cs 

let modalHeaderId = "tsrCsModalHeader";
let modalBodyId = "tsrCsModalBody";
let modalFooterId = "tsrCsModalFooter";

let filterSearchId = "tsrCsFilterSearch";

let filterCatId = "tsrCsFilterCatMenu";
let filterListId = "tsrCsSearchFiltersList";
let filterMenuId = "tsrCsFilterList";


let allCatRowId = "tsrCsFilterCatMenu-accordion-button";
let accordionBodyId = "tsrCsFilterCatMenu-accordion-body";

let allFilters = [
    {
        id: "allFilters",
        label: "All",
        subFilters: [
            { id: "price", label: "Price" },
            { id: "gainPc", label: "Gain %" },
            { id: "ohlcCompare", label: "OHLC Compare" },
            { id: "gain %", label: "Gain %" },
            { id: "volumeTrending", label: "Volume Trending" },
            { id: "pricePivotLevelsPc", label: "Price / Pivot levels %" },
            { id: "newHighLows", label: "New High Lows" },
            { id: "bullishCandles", label: "Bullish Candles" },
            { id: "comparePriceAndMa", label: "Compare Price & MA" },
            { id: "peRatio", label: "P/E Ratio" },
            { id: "pbRatio", label: "P/B Ratio" },
            { id: "etc", label: "XYZ" },
            { id: "pitrioskiScore", label: "PitrioskiScore" },
            { id: "valuationRatio", label: "Valuation Ratio" },
            { id: "price", label: "Price" },
            { id: "gainPc", label: "Gain %" },
            { id: "ohlcCompare", label: "OHLC Compare" },
            { id: "gain %", label: "Gain %" },
            { id: "volumeTrending", label: "Volume Trending" },
            { id: "pricePivotLevelsPc", label: "Price / Pivot levels %" },
            { id: "newHighLows", label: "New High Lows" },
            { id: "bullishCandles", label: "Bullish Candles" },
            { id: "comparePriceAndMa", label: "Compare Price & MA" },
            { id: "peRatio", label: "P/E Ratio" },
            { id: "pbRatio", label: "P/B Ratio" },
            { id: "etc", label: "XYZ" },
            { id: "pitrioskiScore", label: "PitrioskiScore" },
            { id: "valuationRatio", label: "Valuation Ratio" },
        ]
    },
    {
        id: "favourites",
        label: "Favourites",
        subFilters: [
            { id: "price", label: "Price" },
            { id: "gainPc", label: "Gain %" },
            { id: "ohlcCompare", label: "OHLC Compare" },
            { id: "gain %", label: "Gain %" },
            { id: "volumeTrending", label: "Volume Trending" },
            { id: "pricePivotLevelsPc", label: "Price / Pivot levels %" },
            { id: "newHighLows", label: "New High Lows" },
            { id: "bullishCandles", label: "Bullish Candles" },
            { id: "comparePriceAndMa", label: "Compare Price & MA" },
        ]
    },
    {
        id: "priceAction",
        label: "Price Action",
        subFilters: [
            { id: "price", label: "Price" },
            { id: "gainPc", label: "Gain %" },
            { id: "ohlcCompare", label: "OHLC Compare" },
            { id: "gain %", label: "Gain %" },
            { id: "gain %", label: "Gain %" },
            { id: "gain %", label: "Gain %" },
        ]
    },
    {
        id: "volume",
        label: "Volume",
        subFilters: [
            { id: "peRatio", label: "P/E Ratio" },
            { id: "pbRatio", label: "P/B Ratio" },
            { id: "etc", label: "XYZ" },
            { id: "pitrioskiScore", label: "PitrioskiScore" },
            { id: "valuationRatio", label: "Valuation Ratio" },
        ]
    },
    {
        id: "highLow",
        label: "High/Low",
        subFilters: [
            { id: "peRatio", label: "P/E Ratio" },
            { id: "pbRatio", label: "P/B Ratio" },
            { id: "etc", label: "XYZ" },
            { id: "pitrioskiScore", label: "PitrioskiScore" },
            { id: "valuationRatio", label: "Valuation Ratio" },
        ]
    },
    {
        id: "betaVols",
        label: "Beta/Vols",
        subFilters: [
            { id: "peRatio", label: "P/E Ratio" },
            { id: "pbRatio", label: "P/B Ratio" },
            { id: "etc", label: "XYZ" },
            { id: "pitrioskiScore", label: "PitrioskiScore" },
            { id: "valuationRatio", label: "Valuation Ratio" },
        ]
    },
    {
        id: "pivotFib",
        label: "Pivot/Fib",
        subFilters: [
            { id: "peRatio", label: "P/E Ratio" },
            { id: "pbRatio", label: "P/B Ratio" },
            { id: "etc", label: "XYZ" },
            { id: "pitrioskiScore", label: "PitrioskiScore" },
            { id: "valuationRatio", label: "Valuation Ratio" },
        ]
    },
    {
        id: "strength",
        label: "Strength",
        subFilters: [
            { id: "peRatio", label: "P/E Ratio" },
            { id: "pbRatio", label: "P/B Ratio" },
            { id: "etc", label: "XYZ" },
            { id: "pitrioskiScore", label: "PitrioskiScore" },
            { id: "valuationRatio", label: "Valuation Ratio" },
        ]
    },
    {
        id: "movAvg",
        label: "Mov Avg",
        subFilters: [
            { id: "peRatio", label: "P/E Ratio" },
            { id: "pbRatio", label: "P/B Ratio" },
            { id: "etc", label: "XYZ" },
            { id: "pitrioskiScore", label: "PitrioskiScore" },
            { id: "valuationRatio", label: "Valuation Ratio" },
        ]
    },
    {
        id: "techIndi",
        label: "Tech Indi",
        subFilters: [
            { id: "peRatio", label: "P/E Ratio" },
            { id: "pbRatio", label: "P/B Ratio" },
            { id: "etc", label: "XYZ" },
            { id: "pitrioskiScore", label: "PitrioskiScore" },
            { id: "valuationRatio", label: "Valuation Ratio" },
        ]
    },
    {
        id: "divergence",
        label: "Divergence",
        subFilters: [
            { id: "peRatio", label: "P/E Ratio" },
            { id: "pbRatio", label: "P/B Ratio" },
            { id: "etc", label: "XYZ" },
            { id: "pitrioskiScore", label: "PitrioskiScore" },
            { id: "valuationRatio", label: "Valuation Ratio" },
        ]
    },
    {
        id: "chartPatterns",
        label: "Chart Patterns",
        subFilters: [
            { 
                id: "CandleHa", 
                label: "Candle / HA", 
                subFilters: [
                    { id: "bullishCandle", label: "Bullish Candle", 
                        
                        subFilters: [
                            {
                                title: "1 Candle Patterns",
                                subFilters: [
                                    {id: "Bullish Marubozu", label: "Bullish Marubozu"},
                                    {id: "Bullish Dragon Fly Doji", label: "Bullish Dragon Fly Doji"},
                                    {id: "Inverted Hammer At Downtrend", label: "Inverted Hammer At Downtrend"},
                                    {id: "Bullish Gravestone Doji", label: "Bullish Gravestone Doji"},
                                    {id: "Hammer At Downtrend", label: "Hammer At Downtrend"}
                                ]
                            },
                            {
                                title: "2 Candle Patterns",
                                subFilters: [
                                    {id: "Bullish Engulfing", label: "Bullish Engulfing"},
                                    {id: "Bullish Harami", label: "Bullish Harami Cross"},
                                    {id: "Bullish Belt Hold", label: "Bullish On Neck "},
                                    {id: "Bullish Separating Lines", label: "Bullish Separating Lines"},
                                    {id: "Homing Pigeon - Bullish", label: "Homing Pigeon - Bullish"}
                                ]
                            },
                            {
                                title: "3 Candle Patterns",
                                subFilters: [
                                    {id: "Three White Soldiers", label: "Three White Soldiers"},
                                    {id: "Bullish Side by Side", label: "Bullish Side by Side"},
                                    {id: "Abandoned Baby Bullish", label: "Abandoned Baby Bullish"},
                                    {id: "Upside Gap Three Methods", label: "Upside Gap Three Methods"},
                                    {id: "Bullish Stick Sandwich", label: "Bullish Stick Sandwich"}
                                ]
                            },
                        ]
                     },
                    { id: "bearishCandle", label: "Bearish Candle" },
                    { id: "oneTickCandle", label: "One Tick Candle" },
                    { id: "heikenAshi", label: "Heikin Ashi" },
                ] 
            },
            { 
                id: "candleRangeBased", 
                label: "Candle Range Based", 
                subFilters: [
                    { id: "narrowRange", label: "Narrow Range" },
                    { id: "wideRange", label: "Wide Range" },
                    { id: "masterCandle", label: "Master Candle" },
                    { id: "heikenAshi", label: "Heikin Ashi" },
                ] 
            },
            { 
                id: "chartPatterns", 
                label: "Chart Patterns", 
                subFilters: [
                    { id: "popularBullish", label: "Popular (Bullish)" },
                    { id: "wideRange", label: "Wide Range" },
                    { id: "masterCandle", label: "Master Candle" },
                    { id: "heikenAshi", label: "Heikin Ashi" },
                ] 
            },
           
        ]
    },
    {
        id: "financialRatios",
        label: "Fin Ratios",
        subFilters: [
            { id: "peRatio", label: "P/E Ratio" },
            { id: "pbRatio", label: "P/B Ratio" },
            { id: "etc", label: "XYZ" },
            { id: "pitrioskiScore", label: "PitrioskiScore" },
            { id: "valuationRatio", label: "Valuation Ratio" },
        ]
    },
    {
        id: "finStatements",
        label: "Fin Stmts",
        subFilters: [
            { id: "peRatio", label: "P/E Ratio" },
            { id: "pbRatio", label: "P/B Ratio" },
            { id: "etc", label: "XYZ" },
            { id: "pitrioskiScore", label: "PitrioskiScore" },
            { id: "valuationRatio", label: "Valuation Ratio" },
        ]
    },
];

function paintCs() {
filterArr = allFilters;


    let modalHeader = document.getElementById(modalHeaderId);

    let headerHtml = "";

    headerHtml = `
        <h5 class="modal-title">Add Filters</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    `;

    modalHeader.innerHTML = headerHtml;

    let bodyHtml = "";
    bodyHtml += `
        <div>
            <input id="${filterSearchId}" type="text"
                class="form-control ui-autocomplete-input"
                placeholder="Search a Filter" autocomplete="off"
                autofocus="" tabindex="0" onclick="showCsSearchList();"
                onblur="mintHtmlUtil.emptyDiv('${filterListId}');">
                <ul id="${filterListId}" style="position: fixed; z-index: 1000;"
                    class="ui-menu ui-widget ui-widget-content">

                </ul>
        </div>`

    //    bodyHtml +=` <div id="${allCatRowId}" class="d-flex justify-content-start my-2">
    //         <button type="button" class="btn btn-outline-secondary rounded-pill"
    //             style="height: 40px; font-size: 14px;"
    //             onclick="updateFilterMenu('allFilters'); ">All</button>

    //         <button type="button" class="btn btn-outline-secondary rounded-pill"
    //             style="height: 40px; font-size: 14px;"
    //             onclick="updateFilterMenu('favourites'); ">Favourites</button>
            
    //         <button
    //             class="btn rounded-pill accordion-button w-auto border border-secondary"
    //             style="height: 40px; font-size: 14px;"
    //             data-bs-toggle="collapse" data-bs-target="#collapseOne">More
    //         </button>
    //     </div>`

        // bodyHtml+=`<div id="collapseOne" class="accordion-collapse collapse"
        //     aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        //     <div id="${accordionBodyId}" class="accordion-body px-0">`

        
        // for (let i = 0; i < allFilters.length; i++) {
        //     let filterCat = allFilters[i];
        //     if (filterCat["id"] != "allFilters" && filterCat["id"] != "favourites") {
                
        //         bodyHtml += `
        //         <button type="button" class="btn btn-outline-secondary rounded-pill mb-2" style="height: 40px; font-size: 14px;" onclick="updateFilterMenu('${filterCat["id"]}'); ">
        //         ${filterCat["label"]}
        //         </button>
        //         `
        //     }
        // }
        
        
        // bodyHtml += `
        //     </div>
        
        //     </div>`
        bodyHtml +=` <div id="${allCatRowId}" class="d-flex my-2" style="overflow-x: auto;">`

        for (let i = 0; i < allFilters.length; i++) {
        let filterCat = allFilters[i];
        // if (filterCat["id"] != "allFilters" && filterCat["id"] != "favourites") {

            bodyHtml += `
                <button type="button" class="btn btn-outline-secondary rounded-pill mb-2" style="height: 40px; font-size: 14px; text-wrap: nowrap;" onclick="updateFilterMenu('${filterCat["id"]}'); ">
                    ${filterCat["label"]}
                </button>
            `
        // }
    }
    bodyHtml += `            </div>`

        bodyHtml+=`<div id="${filterMenuId}" style="overflow-y: auto; height: 80%;">

        </div>
    `;

    let modalBody = document.getElementById(modalBodyId);
    modalBody.innerHTML = bodyHtml;

    updateFilterMenu("allFilters");

    let footerHtml = `
            <button type="button" class="btn d-flex flex-column" style="width: 20%">
                <i class="fas fa-play"></i>
                <span style="font-size: 12px;">Run</span>
            </button>
            <button type="button" class="btn d-flex flex-column" style="width: 20%">
                <i class="fas fa-undo"></i>
                <span style="font-size: 12px;">Reset</span>
            </button>
            <button type="button" class="btn d-flex flex-column" style="width: 20%">
                <i class="fas fa-save"></i>
                <span style="font-size: 12px;">Save</span>
            </button>
            <button type="button" class="btn d-flex flex-column" style="width: 20%">
                <i class="fas fa-bell"></i>
                <span style="font-size: 12px;">Alert</span>
            </button>
            <button type="button" class="btn d-flex flex-column" style="width: 20%">
                <i class="fas fa-ellipsis-v"></i>
                <span style="font-size: 12px;">More</span>
            </button>
    `;

    let modalFooter = document.getElementById(modalFooterId);
    modalFooter.innerHTML = footerHtml;

}

function showCsSearchList() {

    let ul = document.getElementById(filterListId);
    mintHtmlUtil.emptyDiv(filterListId);

    for (let i = 0; i < allFilters.length; i++) {
        let subFilters = allFilters[i]["subFilters"];

        if (jsu.isNotNull(subFilters)) {
            for (let j = 0; j < subFilters.length; j++) {
                let html = "";

                html += `<li class="ui-menu-item">`;
                html += `   <div tabindex="-1" class="ui-menu-item-wrapper">`
                html += `       ${subFilters[j]["id"]}`;
                html += `   </div>`
                html += `</li>`;

                ul.innerHTML += html;
            }
        }
    }
}

let filterArr = allFilters;
function updateFilterMenu(catId) {

    let filterCat = jsu.getObjFrmArrByField(filterArr, "id", catId);

    let subFilters = filterCat["subFilters"];

    let html = "";
    for (let i = 0; i < subFilters.length; i++) {
        let filter = subFilters[i];

        html += `
            <div class="d-flex justify-content-between align-items-center me-3" style="height: 50px;" onclick="showFilterBox('${filter["label"]}');">
                <span style="font-weight: 300;">${filter["label"]}</span>
                <span style="color: gray;"><i class="fas fa-angle-right"></i></span>
            </div>
        `;
        

    }

    let filterMenu = document.getElementById(filterMenuId);

    filterMenu.innerHTML = html;





}

function showFilterBox(filterLabel) {

    let headerHtml = "";

    headerHtml += `
                <button class="btn ps-0" style="font-size: 20px; color: grey;" onclick="paintCs()">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h5 class="modal-title">Add Filters</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                </button>

    `;

    let modalHeader = document.getElementById(modalHeaderId);
    modalHeader.innerHTML = headerHtml;

    let bodyHtml = "";

    bodyHtml += `
        <div>
            <div class="border-bottom d-flex justify-content-between">
                <h6>
                    ${filterLabel}
                </h6>
                <button class="btn" onclick="addToFavourites()">
                    <i class="far fa-star"></i>
                </button>
            </div>

            <div style="height: 100%; max-height: fit-content; overflow-y: auto;">

                <div>
                    <button class="btn btn-lg btn-primary" style="position: fixed; bottom: 80px; right: 20px;">
                        Add filter
                    </button>
                </div>
            </div>
        </div>
    `;

    let modalBody = document.getElementById(modalBodyId);
    modalBody.innerHTML = bodyHtml;
}

function updateAllCatRow() {
    let html = "";


}


function paintCsSelFilters() {
    let modalHeader = document.getElementById(modalHeaderId);

    let headerHtml = "";

    headerHtml = `
        <h5 class="modal-title">Selected Filters</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    `;

    modalHeader.innerHTML = headerHtml;

    let bodyHtml = "";

    let selFilters = [
        { text: "Price above 20", color: "green" },
        { text: "Invalid value for Beta - Daily 1 Month", color: "red" },
        { text: "3 Ticks Wide Range(WR) on High Low Range 120 times of previous ticks", color: "green" },
        { text: "Made new One Week High and sustaining vis-a-vis previous day", color: "red" },
        { text: "Invalid value for MA", color: "green" },
        { text: "Invalid value for Beta - Daily 1 Month", color: "red" },
        { text: "3 Ticks Wide Range(WR) on High Low Range 120 times of previous ticks", color: "green" },
        { text: "Made new One Week High and sustaining vis-a-vis previous day", color: "red" },
        { text: "Invalid value for MA", color: "green" },
        { text: "Invalid value for Beta - Daily 1 Month", color: "red" },
        { text: "3 Ticks Wide Range(WR) on High Low Range 120 times of previous ticks", color: "green" },
        { text: "Made new One Week High and sustaining vis-a-vis previous day", color: "red" },
        { text: "Invalid value for MA", color: "green" },
    ];
    bodyHtml += `
        <div id="csSelFieldsDiv">`

    for(let i=0; i<selFilters.length; i++){
        bodyHtml+=`
            <div class="d-flex align-items-center my-2 ">
                <span style="color: ${selFilters[i]["color"]}; width: 60%; ">${selFilters[i]["text"]}</span>
                <div style="position: relative; right: 0; font-size: 24px; " class="mx-2 d-flex align-items-center">
                    <a class="ms-3" onclick="javascript:csu.pc('aebb:csPrice');"
                        title="Disable i.e. this filter will not be selected for Run" style="color: grey;">
                        <span class="fa fa-pause"></span>
                    </a>
                    <a class="ms-3"  onclick="javascript:myTsrScreener.showControl('priceCs');" title="Edit (Change Value)" style="color: grey;">
                        <span class="fa fa-edit"></span> 
                    </a>  

                    <a  class="ms-3" onclick="javascript:csu.dr('aebb:csPrice');" title="Delete Row" style="color: red;">
                        <span class="fa fa-remove fa-times"></span> 
                    </a>
                </div>
            </div>
            <hr>
        `
    }

    bodyHtml+= `   </div>`;
                    
        
    

    let modalBody = document.getElementById(modalBodyId);
    modalBody.innerHTML = bodyHtml;

    let footerHtml = `
            <button type="button" class="btn d-flex flex-column" style="width: 20%">
                <i class="fas fa-play"></i>
                <span style="font-size: 12px;">Run</span>
            </button>
            <button type="button" class="btn d-flex flex-column" style="width: 20%">
                <i class="fas fa-undo"></i>
                <span style="font-size: 12px;">Reset</span>
            </button>
            <button type="button" class="btn d-flex flex-column" style="width: 20%">
                <i class="fas fa-save"></i>
                <span style="font-size: 12px;">Save</span>
            </button>
            <button type="button" class="btn d-flex flex-column" style="width: 20%">
                <i class="fas fa-bell"></i>
                <span style="font-size: 12px;">Alert</span>
            </button>
            <button type="button" class="btn d-flex flex-column" style="width: 20%">
                <i class="fas fa-ellipsis-v"></i>
                <span style="font-size: 12px;">More</span>
            </button>
    `;


    let modalFooter = document.getElementById(modalFooterId);
    modalFooter.innerHTML = footerHtml;
}

function addToFavourites(){
    
}

// function updateAccordionBody(catId) {
//     let allCatRow = document.getElementById(allCatRowId);
//     let accordionBody = document.getElementById(accordionBodyId);

//     let filterCat = jsu.getObjFrmArrByField(allFilters, "id", catId);

//     let rowHtml = "";
//     rowHtml += `
//         <button type="button" class="btn btn-secondary rounded-pill" style="height: 40px; font-size: 14px;" onclick="updateFilterMenu('${catId}'); updateAccordionBody('${catId}');">
//             ${filterCat["label"]}
//         </button>
            
//         <button class="btn btn-outline-secondary rounded-pill accordion-button w-auto border border-secondary" style="height: 40px; font-size: 14px; color: #6c757d; background-color: white;" data-bs-toggle="collapse" data-bs-target="#collapseOne">
//             More
//         </button>
//     `;
//     allCatRow.innerHTML = rowHtml;

//     let bodyHtml = "";
//     for (let i = 0; i < allFilters.length; i++) {
//         let filterCat = allFilters[i];

//         if (filterCat["id"] != catId) {
//             bodyHtml += `
//                 <button type="button" class="btn btn-outline-secondary rounded-pill mb-2" style="height: 40px; font-size: 14px;"  onclick="updateFilterMenu('${filterCat["id"]}'); updateAccordionBody('${filterCat["id"]}');">
//                     ${filterCat["label"]}
//                 </button>
//             `;
//         }
//     }
//     accordionBody.innerHTML = bodyHtml;

// }
