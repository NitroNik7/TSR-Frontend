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

let allFilters = [
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
        id: "financialRatios",
        label: "Financial Ratios",
        subFilters: [
            { id: "peRatio", label: "P/E Ratio" },
            { id: "pbRatio", label: "P/B Ratio" },
            { id: "etc", label: "XYZ" },
            { id: "pitrioskiScore", label: "PitrioskiScore" },
            { id: "valuationRatio", label: "Valuation Ratio" },
        ]
    }
];

function showCsFilters() {
    let filterListId = "tsrCsFiltersList"; // also used in HTML

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

function showFilterCategories(){
    let filterMenuId = "tsrCsFilterMenu";
}

function updateFilterCategories(button) {

}

function updateFilterMenu(catId) {
    

    let filterMenuListId = "tsrFilterMenu"

    let filterCat = jsu.getObjFrmArrByField(allFilters, "id", catId);

    let subFilters = filterCat["subFilters"];

    let html = "";
    for(let i=0; i<subFilters.length;i++){
        let filter = subFilters[i];
        
        html+=`
            <div class="d-flex justify-content-between align-items-center" style="height: 40px;">
                <span>${filter["label"]}</span>
                <span>></span>
            </div>
        `;

    }

    let filterMenu = document.getElementById(filterMenuListId);

    filterMenu.innerHTML = html;


    


}



// function paintCs() {

//     let modalBodyId = "tsrCsModalBody";

    

//     let html = "";

//     html += `
        
//     `;

//     modalBodyId.innerHTML = html;
// }