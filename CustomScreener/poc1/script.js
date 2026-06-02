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
            { id: "peRatio", label: "P/E Ratio" },
            { id: "pbRatio", label: "P/B Ratio" },
            { id: "etc", label: "XYZ" },
            { id: "pitrioskiScore", label: "PitrioskiScore" },
            { id: "valuationRatio", label: "Valuation Ratio" },
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




function updateFilterMenu(catId) {



    let filterCat = jsu.getObjFrmArrByField(allFilters, "id", catId);

    let subFilters = filterCat["subFilters"];

    let html = "";
    for (let i = 0; i < subFilters.length; i++) {
        let filter = subFilters[i];

        html += `
            <div class="d-flex justify-content-between align-items-center" style="height: 40px;" onclick="showFilterBox('${filter["label"]}');">
                <span>${filter["label"]}</span>
                <span><i class="fas fa-angle-right"></i></span>
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
            <div class="border-bottom">
                <h6>
                    ${filterLabel}
                </h6>
            </div>

            <div style="height: 100%; max-height: fit-content; overflow-y: auto;">

            </div>
        </div>
    `;

    let modalBody = document.getElementById(modalBodyId);
    modalBody.innerHTML = bodyHtml;
}

function updateAllCatRow() {
    let html = "";


}

function updateAccordionBody(catId) {
    let allCatRow = document.getElementById(allCatRowId);
    let accordionBody = document.getElementById(accordionBodyId);

    let filterCat = jsu.getObjFrmArrByField(allFilters, "id", catId);

    let rowHtml = "";
    rowHtml += `
        <button type="button" class="btn btn-secondary rounded-pill" style="height: 40px; font-size: 14px;" onclick="updateFilterMenu('${catId}'); updateAccordionBody('${catId}');">
            ${filterCat["label"]}
        </button>
            
        <button class="btn btn-outline-secondary rounded-pill accordion-button w-auto border border-secondary" style="height: 40px; font-size: 14px; color: #6c757d; background-color: white;" data-bs-toggle="collapse" data-bs-target="#collapseOne">
            More
        </button>
    `;
    allCatRow.innerHTML = rowHtml;

    let bodyHtml = "";
    for (let i = 0; i < allFilters.length; i++) {
        let filterCat = allFilters[i];

        if (filterCat["id"] != catId) {
            bodyHtml += `
                <button type="button" class="btn btn-outline-secondary rounded-pill mb-2" style="height: 40px; font-size: 14px;"  onclick="updateFilterMenu('${filterCat["id"]}'); updateAccordionBody('${filterCat["id"]}');">
                    ${filterCat["label"]}
                </button>
            `;
        }
    }
    accordionBody.innerHTML = bodyHtml;

}


function paintCs() {


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
                onblur="mintHtmlUtil.emptyDiv(${filterListId});">
                <ul id="${filterListId}" style="position: fixed; z-index: 1000;"
                    class="ui-menu ui-widget ui-widget-content">

                </ul>
        </div>

        <div id="${allCatRowId}" class="d-flex justify-content-start my-2">
            <button type="button" class="btn btn-secondary rounded-pill"
                style="height: 40px; font-size: 14px;"
                onclick="updateFilterMenu('priceAction'); updateAccordionBody('priceAction');">All filters</button>

            <button type="button" class="btn btn-secondary rounded-pill"
                style="height: 40px; font-size: 14px;"
                onclick="updateFilterMenu('favourites'); updateAccordionBody('priceAction');">Favourites</button>
            
            <button
                class="btn btn-outline-secondary rounded-pill accordion-button w-auto border border-secondary"
                style="height: 40px; font-size: 14px; color: #6c757d;  background-color: white;"
                data-bs-toggle="collapse" data-bs-target="#collapseOne">More
            </button>
        </div>

        <div id="collapseOne" class="accordion-collapse collapse"
            aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div id="${accordionBodyId}" class="accordion-body px-0">`

    for (let i = 0; i < allFilters.length; i++) {
        let filterCat = allFilters[i];
        if (filterCat["id"] != "priceAction") {

            bodyHtml += `
                <button type="button" class="btn btn-outline-secondary rounded-pill mb-2" style="height: 40px; font-size: 14px;" onclick="updateFilterMenu('${filterCat["id"]}'); updateAccordionBody('${filterCat["id"]}');">
                    ${filterCat["label"]}
                </button>
            `
        }
    }


    bodyHtml += `
        </div>
        
        </div>

        <div id="${filterMenuId}">

        </div>
    `;

    let modalBody = document.getElementById(modalBodyId);
    modalBody.innerHTML = bodyHtml;

    updateFilterMenu("priceAction");

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


function paintCsSelFilters() {
    let modalHeader = document.getElementById(modalHeaderId);

    let headerHtml = "";

    headerHtml = `
        <h5 class="modal-title">Selected Filters</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    `;

    modalHeader.innerHTML = headerHtml;

    let bodyHtml = "";
    bodyHtml += `
        <div id="csSelFieldsDiv"><span style="color:green;font-size:10pt;">   Price Above 20&nbsp;&nbsp;&nbsp;<a onclick="javascript:csu.pc('aebb:csPrice');" title="Disable i.e. this filter will not be selected for Run"><font size="4" color="grey"><span class="fa fa-pause"></span></font> </a> &nbsp;&nbsp;&nbsp;<a onclick="javascript:myTsrScreener.showControl('priceCs');" title="Edit (Change Value)"><font size="4" color="grey"><span class="fa fa-edit"></span></font> </a> &nbsp;&nbsp;&nbsp;<a onclick="javascript:csu.dr('aebb:csPrice');" title="Delete Row"><font size="4" color="red"><span class="fa fa-remove fa-times"></span></font> </a> <hr style="margin:1px;height:1;padding:1px;color:#adb5bd"></span><span style="color:green;font-size:10pt;"> Close Price  is 'Rising Trend' for at least 3 period  on Tick (Current Screener Tick) Tick  on Any Candle Type&nbsp;&nbsp;&nbsp;<a onclick="javascript:csu.pc('dynpriceTrendNg:priceTrendId1');" title="Disable i.e. this filter will not be selected for Run"><font size="4" color="grey"><span class="fa fa-pause"></span></font> </a> &nbsp;&nbsp;&nbsp;<a onclick="javascript:myTsrScreener.showControl('priceCs');" title="Edit (Change Value)"><font size="4" color="grey"><span class="fa fa-edit"></span></font> </a> &nbsp;&nbsp;&nbsp;<a onclick="javascript:csu.dr('dynpriceTrendNg:priceTrendId1');" title="Delete Row"><font size="4" color="red"><span class="fa fa-remove fa-times"></span></font> </a> <hr style="margin:1px;height:1;padding:1px;color:#adb5bd"></span><span style="color:green;font-size:10pt;"> Gain Over Previous  Tick Below 10%&nbsp;&nbsp;&nbsp;<a onclick="javascript:csu.pc('priceGainLoss');" title="Disable i.e. this filter will not be selected for Run"><font size="4" color="grey"><span class="fa fa-pause"></span></font> </a> &nbsp;&nbsp;&nbsp;<a onclick="javascript:myTsrScreener.showControl('priceCs');" title="Edit (Change Value)"><font size="4" color="grey"><span class="fa fa-edit"></span></font> </a> &nbsp;&nbsp;&nbsp;<a onclick="javascript:csu.dr('priceGainLoss');" title="Delete Row"><font size="4" color="red"><span class="fa fa-remove fa-times"></span></font> </a> <hr style="margin:1px;height:1;padding:1px;color:#adb5bd"></span><span style="color:red;font-size:10pt;"> Market Capitalization  settings is incorrect &nbsp;&nbsp;&nbsp;<a onclick="javascript:csu.pc('finNgComp:finNgCompId1');" title="Disable i.e. this filter will not be selected for Run"><font size="4" color="grey"><span class="fa fa-pause"></span></font> </a> &nbsp;&nbsp;&nbsp;<a onclick="javascript:myTsrScreener.showControl('finRatNg');" title="Edit (Change Value)"><font size="4" color="grey"><span class="fa fa-edit"></span></font> </a> &nbsp;&nbsp;&nbsp;<a onclick="javascript:csu.dr('finNgComp:finNgCompId1');" title="Delete Row"><font size="4" color="red"><span class="fa fa-remove fa-times"></span></font> </a> <hr style="margin:1px;height:1;padding:1px;color:#adb5bd"></span><span style="color:red;font-size:10pt;"> Total Stockholders Fund  settings is incorrect &nbsp;&nbsp;&nbsp;<a onclick="javascript:csu.pc('finStmtNgComp:finStmtNgCompId1');" title="Disable i.e. this filter will not be selected for Run"><font size="4" color="grey"><span class="fa fa-pause"></span></font> </a> &nbsp;&nbsp;&nbsp;<a onclick="javascript:myTsrScreener.showControl('finStmtNg');" title="Edit (Change Value)"><font size="4" color="grey"><span class="fa fa-edit"></span></font> </a> &nbsp;&nbsp;&nbsp;<a onclick="javascript:csu.dr('finStmtNgComp:finStmtNgCompId1');" title="Delete Row"><font size="4" color="red"><span class="fa fa-remove fa-times"></span></font> </a> <hr style="margin:1px;height:1;padding:1px;color:#adb5bd"></span></div>
    `;

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