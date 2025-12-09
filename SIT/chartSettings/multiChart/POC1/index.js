let multiChartPopup = document.getElementById("chMultiChartsPopup");

// Remove later
let addedStocksHtml = `
<div class="divTable myTsrDivTable" id="comparedStocksTable" style="width:function" h(){return=""
mobile?controlwidth-40:controlwidth}px;="">
<div class="divTableBody">
<div class="divTableRow">
<div class="divTableCell" style="width: 150px">Dabur India Ltd.</div>
<div class="divTableCell"><a
        onclick="javascript:myTsrChartSettings.gcp(colorArr,'DABURColorDiv' ,'stockCompare',1);">
        <div style="width:22px;height:22px;background-color:rgb(44, 42, 42); color:black;font-size: 13px;padding:3px 2px 2px 4px;border-radius:4px"
            id="DABURColorDiv"><svg class="svg-inline--fa fa-chevron-down fa-w-14" aria-hidden="true"
                focusable="false" data-prefix="fa" data-icon="chevron-down" role="img"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                <path fill="currentColor"
                    d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z">
                </path>
            </svg>
            <!-- <span class="fa  fa-chevron-down"></span> -->
        </div>
    </a></div>
<div class="divTableCell">Line Size <input type="text" id="DABURLineSize" size="3" value="10"
        onchange="javascript:chms.scc();"></div>
<div class="divTableCell"></div>
</div>
<div class="divTableRow">
<div class="divTableCell">JSW Energy Ltd. </div>
<div class="divTableCell"><a
        onclick="javascript:myTsrChartSettings.gcp(colorArr,'JSWENERGYColorDiv' ,'stockCompare',1);">
        <div style="width:22px;height:22px;background-color:#0000FF; color:black;font-size: 13px;padding:3px 2px 2px 4px;border-radius:4px"
            id="JSWENERGYColorDiv"><svg class="svg-inline--fa fa-chevron-down fa-w-14" aria-hidden="true"
                focusable="false" data-prefix="fa" data-icon="chevron-down" role="img"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                <path fill="currentColor"
                    d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z">
                </path>
            </svg>
            <!-- <span class="fa  fa-chevron-down"></span> -->
        </div>
    </a></div>
<div class="divTableCell">Line Size <input type="text" id="JSWENERGYLineSize" size="3" value="1"
        onchange="javascript:chms.scc();"></div>
<div class="divTableCell"><a title="Remove" onclick="javascript:chms.rmSt('JSWENERGY');">
        <font size="4" color="red"><svg class="svg-inline--fa fa-trash-alt fa-w-14" aria-hidden="true"
                focusable="false" data-prefix="fa" data-icon="trash-alt" role="img"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                <path fill="currentColor"
                    d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z">
                </path>
            </svg>
            <!-- <span class="fa fa-trash-o fa-trash-alt"></span> -->
        </font>
    </a></div>
</div>
<div class="divTableRow">
<div class="divTableCell">Reliance Industries
    Ltd.</div>
<div class="divTableCell"><a
        onclick="javascript:myTsrChartSettings.gcp(colorArr,'RELIANCEColorDiv' ,'stockCompare',1);">
        <div style="width:22px;height:22px;background-color:#FF0000; color:black;font-size: 13px;padding:3px 2px 2px 4px;border-radius:4px"
            id="RELIANCEColorDiv"><svg class="svg-inline--fa fa-chevron-down fa-w-14" aria-hidden="true"
                focusable="false" data-prefix="fa" data-icon="chevron-down" role="img"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                <path fill="currentColor"
                    d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z">
                </path>
            </svg>
            <!-- <span class="fa  fa-chevron-down"></span> -->
        </div>
    </a></div>
<div class="divTableCell">Line Size <input type="text" id="RELIANCELineSize" size="3" value="1"
        onchange="javascript:chms.scc();"></div>
<div class="divTableCell"><a title="Remove" onclick="javascript:chms.rmSt('RELIANCE');">
        <font size="4" color="red"><svg class="svg-inline--fa fa-trash-alt fa-w-14" aria-hidden="true"
                focusable="false" data-prefix="fa" data-icon="trash-alt" role="img"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                <path fill="currentColor"
                    d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z">
                </path>
            </svg>
            <!-- <span class="fa fa-trash-o fa-trash-alt"></span> -->
        </font>
    </a></div>
</div>
<div class="divTableRow">
<div class="divTableCell">Cipla Ltd.</div>
<div class="divTableCell"><a
        onclick="javascript:myTsrChartSettings.gcp(colorArr,'CIPLAColorDiv' ,'stockCompare',1);">
        <div style="width:22px;height:22px;background-color:#008000; color:black;font-size: 13px;padding:3px 2px 2px 4px;border-radius:4px"
            id="CIPLAColorDiv"><svg class="svg-inline--fa fa-chevron-down fa-w-14" aria-hidden="true"
                focusable="false" data-prefix="fa" data-icon="chevron-down" role="img"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                <path fill="currentColor"
                    d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z">
                </path>
            </svg>
            <!-- <span class="fa  fa-chevron-down"></span> -->
        </div>
    </a></div>
<div class="divTableCell">Line Size <input type="text" id="CIPLALineSize" size="3" value="1"
        onchange="javascript:chms.scc();"></div>
<div class="divTableCell"><a title="Remove" onclick="javascript:chms.rmSt('CIPLA');">
        <font size="4" color="red"><svg class="svg-inline--fa fa-trash-alt fa-w-14" aria-hidden="true"
                focusable="false" data-prefix="fa" data-icon="trash-alt" role="img"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                <path fill="currentColor"
                    d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z">
                </path>
            </svg>
            <!-- <span class="fa fa-trash-o fa-trash-alt"></span> -->
        </font>
    </a></div>
</div>

<div class="divTableRow">
<div class="divTableCell">Aarey Drugs &amp; Pharmaceuticals Ltd.</div>
<div class="divTableCell"><a
        onclick="javascript:myTsrChartSettings.gcp(colorArr,'AAREYDRUGSColorDiv' ,'stockCompare',1);">
        <div style="width:22px;height:22px;background-color:#808000; color:black;font-size: 13px;padding:3px 2px 2px 4px;border-radius:4px"
            id="AAREYDRUGSColorDiv"><svg class="svg-inline--fa fa-chevron-down fa-w-14" aria-hidden="true"
                focusable="false" data-prefix="fa" data-icon="chevron-down" role="img"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                <path fill="currentColor"
                    d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z">
                </path>
            </svg><!-- <span class="fa  fa-chevron-down"></span> -->
        </div>
    </a></div>
<div class="divTableCell">Line Size <input type="text" id="AAREYDRUGSLineSize" size="3" value="1"
        onchange="javascript:chms.scc();"></div>
<div class="divTableCell"><a title="Remove" onclick="javascript:chms.rmSt('AAREYDRUGS');">
        <font size="4" color="red"><svg class="svg-inline--fa fa-trash-alt fa-w-14" aria-hidden="true"
                focusable="false" data-prefix="fa" data-icon="trash-alt" role="img"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                <path fill="currentColor"
                    d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z">
                </path>
            </svg><!-- <span class="fa fa-trash-o fa-trash-alt"></span> -->
        </font>
    </a></div>
</div>

<div class="divTableRow">
<div class="divTableCell">Aarey Drugs &amp; Pharmaceuticals Ltd.</div>
<div class="divTableCell"><a
        onclick="javascript:myTsrChartSettings.gcp(colorArr,'AAREYDRUGSColorDiv' ,'stockCompare',1);">
        <div style="width:22px;height:22px;background-color:#808000; color:black;font-size: 13px;padding:3px 2px 2px 4px;border-radius:4px"
            id="AAREYDRUGSColorDiv"><svg class="svg-inline--fa fa-chevron-down fa-w-14" aria-hidden="true"
                focusable="false" data-prefix="fa" data-icon="chevron-down" role="img"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                <path fill="currentColor"
                    d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z">
                </path>
            </svg><!-- <span class="fa  fa-chevron-down"></span> -->
        </div>
    </a></div>
<div class="divTableCell">Line Size <input type="text" id="AAREYDRUGSLineSize" size="3" value="1"
        onchange="javascript:chms.scc();"></div>
<div class="divTableCell"><a title="Remove" onclick="javascript:chms.rmSt('AAREYDRUGS');">
        <font size="4" color="red"><svg class="svg-inline--fa fa-trash-alt fa-w-14" aria-hidden="true"
                focusable="false" data-prefix="fa" data-icon="trash-alt" role="img"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                <path fill="currentColor"
                    d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z">
                </path>
            </svg><!-- <span class="fa fa-trash-o fa-trash-alt"></span> -->
        </font>
    </a></div>
</div>
</div>
</div>
`
function showMultiChartPopup() {
    multiChartPopup.style.display = multiChartPopup.style.display === "block" ? "none" : "block";
    chCompareCharts('stocks');

    if (multiChartPopup.style.display == "block") {
        document.addEventListener("pointerdown", closePopupOnClickOutside);
    }
    else {
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
}

const closePopupOnClickOutside = function closePopupOnClickOutside(e) {
    let target = e.target;
    let popupBtn = multiChartPopup.previousElementSibling;
    if (multiChartPopup.style.display === "block" && !(multiChartPopup.contains(target) || popupBtn.contains(target))) {
        multiChartPopup.style.display = "none";
        document.removeEventListener("pointerdown", closePopupOnClickOutside);
    }
}

function chCompareCharts(option){
    let cmpStocksBtn = document.getElementById("chCompareMulStocks");
    let cmpTicksBtn = document.getElementById("chCompareMulTicks");
    

    let chCompareChartsForm = document.getElementById("chCompareChartsForm");
    if(option === 'stocks'){

        cmpTicksBtn.classList.remove("ch_mch_active");
        cmpStocksBtn.classList.add("ch_mch_active");

        chCompareChartsForm.innerHTML = "";
        
        chCompareChartsForm.innerHTML = `
            <div class="ch_view_options_wrapper">
                                                            <span>View type</span>
                                                            <div id="chCompareViewOptions"
                                                                class="ch_mch_compare_view_options">
                                                                <button type="button" onclick="selectOption(this)">Inline</button>
                                                                <button type="button" onclick="selectOption(this)">Tile</button>
                                                                <button type="button" onclick="selectOption(this)">Stack</button>
                                                            </div>
                                                        </div>
                                                        <div id="chCompareSearchStock" class="ch_mch_compare_search_stock">
                                                            <span>Search</span>
                                                            <div id="chCompareViewOptions"
                                                                class="">
                                                                <input type="text" name="" id=""
                                                                class="ch_optionInput" size="25" placeholder="Add Symbol">
                                                            </div>
                                                        </div>
                                                        <div class="ch_mch_compare_settings">
                                                            <div class="ch_mch_compare_charts_per_row"
                                                                style="border-right: 1px solid;">
                                                                <span style="margin-right: 5px;">Charts per row</span>
                                                                <input type="number" min="2" max="5" value="2" size="2">
                                                            </div>
                                                            <div class="ch_mch_compare_show_axis">
                                                                <span>Show % axis</span>
                                                                <input type="checkbox">
                                                            </div>
                                                        </div>
                                                        <div class="ch_mch_compare_stocks_added">
                                                            <span>Stocks Added:</span>
                                                            ${addedStocksHtml}
                                                        </div>
        `;
    }
    else {
        cmpStocksBtn.classList.remove("ch_mch_active");
        cmpTicksBtn.classList.add("ch_mch_active");

        chCompareChartsForm.innerHTML = "";

        chCompareChartsForm.innerHTML = `    
        <div class="ch_view_options_wrapper">
        <span>View type</span>
        <div id="chCompareViewOptions" class="ch_mch_compare_view_options">
            <button type="button" onclick="selectOption(this)">Tile</button>
            <button type="button" onclick="selectOption(this)">Stack</button>
        </div>
    </div>
    <div class="ch_mch_compare_settings">
        <div class="ch_mch_compare_charts_per_row" style="border-right: 1px solid;">
            <span  style="margin-right: 5px;">Charts per row</span>
            <input type="number" min="2" max="5" value="2" size="2">
        </div>
        <div class="ch_mch_compare_show_axis">
            <span>Show % axis</span>
            <input type="checkbox">
        </div>
    </div>
    <hr>
    <span style="margin: 15px;">Select tick</span>
    <div class="ch_mch_compare_tick_row">
        <button type="button" onclick="selectTickOption(this)">5 mins</button>
        <button type="button" onclick="selectTickOption(this)">10 mins</button>
        <button type="button" onclick="selectTickOption(this)">15 mins</button>
        <button type="button" onclick="selectTickOption(this)">30 mins</button>
    </div>
    <div class="ch_mch_compare_tick_row">
        <button type="button" onclick="selectTickOption(this)">45 mins</button>
        <button type="button" onclick="selectTickOption(this)">1 Hour</button>
        <button type="button" onclick="selectTickOption(this)">75 mins</button>
        <button type="button" onclick="selectTickOption(this)">90 mins</button>
    </div>
    <div class="ch_mch_compare_tick_row">
        <button type="button" onclick="selectTickOption(this)">2 Hours</button>
        <button type="button" onclick="selectTickOption(this)">3 Hours</button>
        <button type="button" onclick="selectTickOption(this)">4 Hours</button>
        <button type="button" onclick="selectTickOption(this)">Daily</button>
    </div>
    <div class="ch_mch_compare_tick_row">
        <button type="button" onclick="selectTickOption(this)">Weekly</button>
        <button type="button" onclick="selectTickOption(this)">Monthly</button>
        <button type="button" onclick="selectTickOption(this)">Quarterly</button>
        <button type="button" onclick="selectTickOption(this)">Half Yearly</button>

    </div>
    <div class="ch_mch_compare_tick_row">
        <button type="button" onclick="selectTickOption(this)">Yearly</button>
    </div>`;
    }
}

function selectOption(button) {
    // Remove 'selected' class from all buttons
    const buttons = document.querySelectorAll('#chCompareViewOptions button');
    buttons.forEach(btn => {
        btn.classList.remove('selected');
    });

    // Add 'selected' class to the clicked button
    button.classList.add('selected');
}

function selectTickOption(button) {
    // Add or remove 'selected' class to the clicked button
    button.classList.contains("selected") ? button.classList.remove('selected') : button.classList.add('selected');

}