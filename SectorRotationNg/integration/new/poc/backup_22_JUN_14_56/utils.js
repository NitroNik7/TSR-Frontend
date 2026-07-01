// TODO rename duration to period
var miSrnUtils = (function () {

    let htmlU = mintHtmlUtil;
    let jsu = mintJsUtil;

    var premInit = false;
    var toastContainerId = "secRotToastContainer";



    let css = `
        

                /* ======================================================
                                    TSR Sector Rotation
                    ====================================================== */

                /* -- Design tokens -- */
                :root {
                    --tsrSecRotBlueDark: #0d2d6e;
                    /* TSR brand deep navy  */
                    --tsrSecRotBlue: #1a56db;
                    /* TSR brand blue       */
                    --tsrSecRotBlueMid: #2563eb;
                    --tsrSecRotGold: #f59e0b;
                    /* accent               */
                    --tsrSecRotPos: #059669;
                    --tsrSecRotPosBg: #ecfdf5;
                    --tsrSecRotNeg: #dc2626;
                    --tsrSecRotNegBg: #fef2f2;
                    --tsrSecRotNeutral: #334155;
                    --tsrSecRotSurface: #f8fafc;
                    --tsrSecRotBorder: #e2e8f0;
                    --tsrSecRotCardBg: #ffffff;
                    --tsrSecRotMuted: #64748b;
                    --tsrSecRotRadius: 10px;
                    --tsrSecRotRadiusSm: 6px;
                    --tsrSecRotShadow: 0 1px 4px rgba(0, 0, 0, .08);
                    --tsrSecRotShadowMd: 0 4px 16px rgba(13, 45, 110, .12);
                }

                #tsrSecRotTitle {
                    color: midnightblue;
                    font-weight: bold;
                    font-size: 50px;
                }

                #tsrSecRotTitle sup {
                    top: -1em;
                    font-size: 20px;
                }

                .tsrSecRotSettings {
                    gap: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                @media only screen and (max-width: 768px) {
                    #tsrSecRotTitle {
                        font-size: 40px;
                    }

                    #tsrSecRotTitle sup {
                        font-size: 10px;
                    }

                    .tsrSecRotSettings {
                        justify-content: space-between;
                    }

                    #tsrSecRotApplySettingsBtn {
                        width: 100%;
                    }
                }

                .tsrSecRotPage {
                    background: #f5f8fc;
                    border-radius: 15px;
                    /* min-height: 100vh; */
                }

                /* .tsrSectRotBaseIndexSection,
                .tsrSectRotSectCompareSection, */
                .tsrSecRotSectOvrvwSection,
                .tsrSecRotChartSection {
                    background: #f5f8fc;
                    border-radius: 15px;
                }

                .tsrSecRotControlCard,
                .tsrSecRotTableCard {
                    border: none;
                    border-radius: 18px;
                    box-shadow: 0 4px 18px rgba(15, 23, 42, 0.06);
                }

                .tsrSecRotControlCard .card-body,
                .tsrSecRotTableCard .card-body {
                    padding: 1.5rem;
                }

                .tsrSecRotSelect {
                    border-radius: 12px;
                    border: 1px solid #dbe4f0;
                    min-height: 48px;
                    font-weight: 500;
                }

                .tsrSecRotApplyBtn,
                .tsrSecRotRefreshBtn {
                    background: linear-gradient(135deg, #0b5ed7, #2563eb);
                    color: white;
                    border: none;
                    min-height: 48px;
                    border-radius: 12px;
                    font-weight: 600;
                    transition: 0.25s ease;
                }

                .tsrSecRotApplyBtn:hover,
                .tsrSecRotRefreshBtn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
                    color: white;
                }

                .tsrSecRotMetricCard {
                    background: white;
                    border-radius: 18px;
                    padding: 22px;
                    height: 100%;
                    box-shadow: 0 4px 18px rgba(15, 23, 42, 0.06);
                    transition: 0.25s ease;
                }

                .tsrSecRotMetricCard:hover {
                    transform: translateY(-4px);
                }

                .tsrSecRotMetricTop {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 18px;
                }

                .tsrSecRotMetricIcon {
                    width: 48px;
                    height: 48px;
                    /* width: 18px;
                    height: 18px; */
                    border-radius: 14px;
                    background: #e8f1ff;
                    color: #2563eb;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                }

                /* .tsrSecRotMetricIcon a {
                    color:  unset;
                } */

                .tsrSecRotMetricIcon.negative {
                    background: #ffe8e8;
                    color: #dc2626;
                }

                .tsrSecRotMetricBadge {
                    background: #dbeafe;
                    color: #1d4ed8;
                    padding: 5px 10px;
                    border-radius: 50px;
                    font-size: 11px;
                    font-weight: 700;
                }

                .tsrSecRotMetricTitle {
                    font-size: 13px;
                    color: #64748b;
                    margin-bottom: 8px;
                }

                .tsrSecRotMetricValue {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #0f172a;
                }

                .tsrSecRotMetricHighlight {
                    font-size: 1.4rem;
                    font-weight: 700;
                }

                .tsrSecRotMetricHighlight.positive {
                    color: #059669;
                }

                .tsrSecRotMetricHighlight.negative {
                    color: #dc2626;
                }

                .tsrSecRotMetricSubtext {
                    margin-top: 8px;
                    color: #64748b;
                    font-size: 13px;
                }

                .tsrSecRotMetricChange {
                    font-size: 14px;
                    font-weight: 700;
                    margin-top: 8px;
                }

                .tsrSecRotMetricChange.positive {
                    color: #059669;
                }

                .tsrSecRotMetricChange.negative {
                    color: #dc2626;
                }

                .tsrSecRotTableHeader {
                    border: none;
                    padding: 20px 24px;
                    background: white;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .tsrSecRotTableExpandCollapseBadge {
                    /* background: #dbeafe;
                    color: #1d4ed8; */
                    background-color: white;
                    color: darkslategrey;
                    padding: 5px 10px;
                    border-radius: 50px;
                    font-size: 14px;
                    font-weight: 700;
                    transition: all 0.3s;
                    cursor: pointer;
                }

                .tsrSecRotTableExpandCollapseBadge:hover {
                    transform: scale(1.2);
                }

                .tsrSecRotTableHeader.outperform {
                    border-bottom: 3px solid #10b981;

                }

                .tsrSecRotTableHeader.underperform {
                    border-bottom: 3px solid #ef4444;
                }

                .tsrSecRotTableSubheader {
                    font-size: 13px;
                    color: #64748b;
                }

                .tsrSecRotTable th {
                    color: #64748b;
                    font-size: 13px;
                    font-weight: 700;
                    font-family: monospace;
                    /* 
                    font-family: Arial, Helvetica, sans-serif;
                    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                    */
                    /* border-bottom-width: 1px; */
                    text-wrap: nowrap;
                    border: 1px solid rgba(0, 0, 0, 0.08)
                }

                .tsrSecRotTable td {
                    /* font-weight: 600; */
                    font-size: 14px;
                    /* font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; */
                    text-wrap: nowrap;
                    vertical-align: middle;
                    padding-top: 8px;
                    padding-bottom: 8px;

                }

                .tsrSecRotTable .positive {
                    color: #059669;
                }

                .tsrSecRotTable .negative {
                    color: #dc2626;
                }

                .tsrSecRotTrendBadge {
                    padding: 6px 12px;
                    border-radius: 50px;
                    font-size: 12px;
                    font-weight: 700;
                }

                .tsrSecRotTrendBadge.positive {
                    background: #dcfce7;
                    color: #15803d;
                }

                .tsrSecRotTrendBadge.negative {
                    background: #fee2e2;
                    color: #b91c1c;
                }

                @media (max-width: 768px) {

                    .tsrSecRotTitle {
                        font-size: 1.6rem;
                    }

                    .tsrSecRotMetricValue {
                        font-size: 1.5rem;
                    }

                }


                /* ==========================================================================
                                                        TSR UI DOCK MATRIX LAYOUT SPECIFICATIONS
                                                    ========================================================================== */

                .tsrSectorRotationDetailsWorkspaceCard {
                    background-color: #ffffff !important;
                    border: 1px solid #e2e8f0 !important;
                    border-radius: 12px !important;
                }

                .tsrSectorRotationCardHeaderTitle {
                    color: #1e3a8a !important;
                    /* Midnight Branding Accent */
                    font-size: 1.35rem;
                    letter-spacing: -0.2px;
                }


                .tsrSectorRotationMetricRow {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.72rem 1rem;
                    border-bottom: 1px solid #f1f5f9;
                }

                .tsrSectorRotationMetricRow:hover {
                    background-color: #f8fafc;
                }

                .tsrSecRotSectorDetailsSubText {
                    font-size: 0.88rem;
                    color: #475569;
                    font-weight: 500;
                }

                .tsrSecRotSectorDetailsValue {
                    font-size: 0.95rem;
                    font-weight: 700;
                }

                /* Right Grid: Combined Card Modifications */
                .tsrSectorRotationUnifiedTechCard {
                    border-color: #e2e8f0 !important;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02) !important;
                }

                /* Vertical Stacking Blocks Layout Adjustments */
                .tsrSectorRotationRowCarouselBlock {
                    background-color: #ffffff;
                    padding: 0.25rem 0;
                    width: 100%;
                }

                /* Single-Line Compact Slider Element Accents */
                .tsrSectorRotationSliderSingleLine {
                    display: flex;
                    align-items: baseline;
                    justify-content: space-between;
                    background-color: #f8fafc;
                    border: 1px solid #e2e8f0;
                    padding: 0.45rem 0.65rem;
                    border-radius: 6px;
                    width: 100%;
                }

                .tsrSectorRotationSliderSingleLine span {
                    font-size: 0.72rem;
                    font-weight: 700;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.1px;
                }

                .tsrSectorRotationSliderSingleLine strong {
                    font-size: 0.92rem;
                    font-weight: 800;
                }

                /* Owl Slider Micro Control Navigation Points */
                .tsrSectorRotationOwlMetricsSlider .owl-dots {
                    margin-top: 8px !important;
                }

                .tsrSectorRotationOwlMetricsSlider .owl-dot span {
                    background: #e2e8f0 !important;
                    width: 5px !important;
                    height: 5px !important;
                    margin: 3px !important;
                }

                .tsrSectorRotationOwlMetricsSlider .owl-dot.active span {
                    background: #2563eb !important;
                    width: 12px !important;
                }

                /* ==========================================================================
                FIXED STOCKS SEGMENT CONTROLS PILL SPECIFICATION
                ========================================================================== */

                .tsrSectorRotationStockSegmentWrapper {
                    display: flex;
                    align-items: center;
                }

                .tsrSectorRotationStockSegmentWrapper .btn-group {
                    background-color: #f1f5f9 !important;
                    border: 1px solid #e2e8f0 !important;
                    border-radius: 50px !important;
                }

                .tsrSectorRotationSegmentButton {
                    border: 0 !important;
                    color: #475569 !important;
                    font-size: 0.78rem !important;
                    font-weight: 700 !important;
                    padding: 0.45rem 1.4rem !important;
                    background: transparent !important;
                    border-radius: 50px !important;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
                }

                .tsrSectorRotationSegmentButton:hover {
                    color: #1e3a8a !important;
                }

                /* Dynamic slider background transition on active radio check overlay */
                .btn-check:checked+.tsrSectorRotationSegmentButton {
                    background-color: #ffffff !important;
                    color: #2563eb !important;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08) !important;
                }

                /* System DataTables Workspace Alignment Sync */
                #tsrSecRotOutperformTable_wrapper,
                #tsrSecRotUnderperformTable_wrapper {
                    font-size: 12px;
                }


                .tsrSecRotStockSectionTitle {
                    border-left: 3px solid #0d6efd;
                    padding-left: 8px;
                    letter-spacing: 0.5px;
                    color: #515151;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    font-weight: bold;
                }

                .tsrSecRotLabel {
                    font-size: .875em;
                    margin-bottom: .25rem !important;
                    color: #6c757d !important;


                }

                /* TODO change later */
                /* --- TRADITIONAL SELECT MENUS & INTERACTIVE GRID TABS --- 
                Unified properties applied across button types to maintain seamless sizing symmetry */
                .tsrSecRotDropbtnIdx,
                .tsrSecRotTabBtnIdx {
                    background-color: #ffffff;
                    /* color: #344054; */
                    color: #64748b;
                    padding: 10px 16px;
                    font-size: 14px;
                    font-weight: 600;
                    border: 1px solid #d0d5dd;
                    border-radius: 8px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                    outline: none;
                    box-sizing: border-box;
                    /* height: 42px; */
                    /* Locks uniform heights across all options */
                }

                /* Custom indicator icon scale adjustments */
                .tsrSecRotMs1 {
                    font-size: 12px !important;
                    color: #667085;
                    transition: transform 0.2s ease;
                }

                /* Standard Hover States across Dropdowns & Stock Basket Tabs */
                .tsrSecRotDdIdx:hover .tsrSecRotDropbtnIdx,
                .tsrSecRotTabBtnIdx:hover {
                    background-color: #f9fafb;
                    border-color: #98a2b3;
                    color: #101828;
                }

                /* Rotates indicator arrow dynamically on drop menu open states */
                .tsrSecRotDdIdx:hover .tsrSecRotDropbtnIdx .tsrSecRotMs1 {
                    transform: rotate(180deg);
                    color: #101828;
                }


                /* Unified Label Formatting Styles */
                .tsrSecRotControlLabel {
                    font-size: 13px;
                    font-weight: 600;
                    color: #475467;
                    text-transform: uppercase;
                    letter-spacing: 0.02em;
                    user-select: none;
                    white-space: nowrap;
                    /* position: absolute;
                    top: -11px;
                    left: 15px;
                    background-color: white;
                    padding: 3px; */
                }


                /* -- Technicals Tick Marker Note -- */
                .tsrSecRotTickNote {
                    font-size: 14px;
                    font-weight: 700;
                    color: var(--tsrSecRotNeutral);
                    /* background-color: var(--tsrSecRotSurface); */
                    background-color: white;
                    border: 1px solid var(--tsrSecRotBorder);
                    border-radius: var(--tsrSecRotRadiusSm);
                    padding: 3px 8px;
                    white-space: nowrap;
                    letter-spacing: 0.02em;
                }

                .tsrSecRotTickAsterisk {
                    color: var(--tsrSecRotNeg);
                    margin-right: 1px;
                }

                /* ============== DATA TABLE BTNs ================ */
                .tsrSecRotDtBtn {
                    background-color: #64748b;
                }

    `;



    // TODO - use full names
    var sectorRotationDef = {
        "Short Term": {
            "1d": {
                "label": "1 Day",
                "freq": "mm15",
                "tick": "mm15",
                "ema1": "5",
                "ema2": "8",
                "rtnBreak": "hh1"
            },
            "1w": {
                "label": "1 Week",
                "freq": "hh2",
                "tick": "hh2",
                "ema1": "5",
                "ema2": "8",
                "rtnBreak": "D"
            },

            "2w": {
                "label": "2 Weeks",
                "freq": "hh4",
                "tick": "hh4",
                "ema1": "5",
                "ema2": "8",
                "rtnBreak": "2D"
            },
        },
        "Medium Term": {
            "1m": {
                "label": "1 Month",
                "freq": "M",
                "tick": "D",
                "ema1": "5",
                "ema2": "8",
                "rtnBreak": "W"
            },
            "3m": {
                "label": "3 Months",
                "freq": "Q",
                "tick": "D",
                "ema1": "13",
                "ema2": "34",
                "rtnBreak": "W"
            },
            "6m": {
                "label": "6 Months",
                "freq": "HY",
                "tick": "D",
                "ema1": "15",
                "ema2": "50",
                "rtnBreak": "M"
            },
        },
        "Long Term": {
            "1y": {
                "label": "1 Year",
                "freq": "Y",
                "tick": "D",
                "ema1": "50",
                "ema2": "200",
                "rtnBreak": "Q"
            },
            "2y": {
                "label": "2 Years",
                "freq": "2Y",
                "tick": "W",
                "ema1": "13",
                "ema2": "34",
                "rtnBreak": "Q"
            },
            "5y": {
                "label": "5 Years",
                "freq": "5Y",
                "tick": "M",
                "ema1": "13",
                "ema2": "34",
                "rtnBreak": "Y"
            }
        }
    };

    function getFreq(duration) {
        let terms = Object.entries(sectorRotationDef);

        for (let i = 0; i < terms.length; i++) {
            let periods = Object.entries(terms[i][1]);
            for (let j = 0; j < periods.length; j++) {
                let period = periods[j];
                if (period[0] == duration)
                    return period[1].freq;
            }
        }
    }

    function getTick(duration) {
        let terms = Object.entries(sectorRotationDef);

        for (let i = 0; i < terms.length; i++) {
            let periods = Object.entries(terms[i][1]);
            for (let j = 0; j < periods.length; j++) {
                let period = periods[j];
                if (period[0] == duration)
                    return period[1].tick;
            }
        }
    }



    // TODO - add optgroup's
    function populateDurationSelect(sectorDurationSelectId, selVal) {

        let durationSelect = document.getElementById(sectorDurationSelectId);

        let html = "";

        let durationArr = Object.entries(sectorRotationDef);

        let defaultOption = selVal;
        if (jsu.isNull(defaultOption) || selVal == "") {
            defaultOption = "3m";
        }

        // for (let i = 0; i < durationArr.length; i++) {
        //     if (durationArr[i][0] != defaultOption)
        //         html += `<option value='${durationArr[i][0]}'>${durationArr[i][0].toUpperCase()}</option>`
        //     else {
        //         html += `<option value='${defaultOption}' selected>${defaultOption.toUpperCase()}</option>` // default option
        //     }
        // }
        let terms = Object.entries(sectorRotationDef);
        for (let i = 0; i < terms.length; i++) {
            // let termName = Object.keys(terms[i][0]);
            let term = terms[i];
            html += `<optgroup label="${term[0]}">`

            // for (let j = 0; j < term[1].length; j++) {
            let periods = Object.entries(term[1]);
            for (let j = 0; j < periods.length; j++) {
                let period = periods[j];
                if (period[0] != defaultOption)
                    html += `<option value='${period[0]}'>${period[1].label}</option>`
                else {
                    html += `<option value='${period[0]}' selected>${period[1].label}</option>` // default option
                }
            }
            // let period = term[1][j];
            // if (period[0] != defaultOption)
            //     html += `<option value='${period[0]}'>${period[1].label.toUpperCase()}</option>`
            // else {
            //     html += `<option value='${period[0]}' selected>${period[1].label.toUpperCase()}</option>` // default option
            // }
            // // }
            html += `</optgroup>`;
        }

        durationSelect.innerHTML = html;

    }

    async function getData(url) {

        const res = await fetch(url)

        const data = await res.json();

        return data;

    }

    function getRoundedValue(val) {


        if (!isNaN(parseFloat(val))) {
            val = parseFloat(val);
            if (val == 0) {
                return val;
            }

            if (typeof val == "number") {
                // Recheck later
                if (val > 9999999) {
                    val = val / 10000000;
                }

                if (val < -9999999) {
                    val = val / 10000000;
                }

                val = Math.round(val * 100) / 100;
            }
        }


        return val;
    }

    function getColoredValue(val, color, text) {

        val = getRoundedValue(val);

        if (jsu.isNull(text) || typeof text != "string") {
            text = "";
        }

        let html = "";

        let positiveColor = "#059669"; // #31a745;
        let negativeColor = "#dc2626"; // #ff5050; 
        let neutralColor = "#000000"; // #ff8400;

        if (jsu.isNull(color)) {
            if (jsu.isNotNull(val)) {
                textColor = (val == 0) ? neutralColor : (val > 0) ? positiveColor : negativeColor;
                val += " " + text;

                html += `<span style='color: ${textColor}'> ${val} </span>`;
            }
            else {
                html += "<span style='color: black;'> - </span>";
            }
        } else {
            val += " " + text;
            html += `<span style='color: ${color};'> ${val} </span>`;
        }



        return html;
    }

    function showLoginToast(show) {
        let toastContainer = document.getElementById(toastContainerId);

        if (jsu.isNotNull(mtgv) && jsu.isNotNull(mtgv.mtpp) && jsu.isNotNull(mtgv.mtpp)) {
            premInit = true;
        } else {
            setTimeout(() => {
                showLoginToast(show);
            }, 500);
        }

        if (premInit && !mtgv.mtpp.pr && show) {
            let loginUrl = mintJsUtil.getBaseUrl() + `/my/UserManagement/?act=login`;
            let subscribeUrl = mintJsUtil.getBaseUrl() + `/my/TsrPlans/`;

            let html = ""
            html += `<h5 style="color: red;">This is a premium feature. Please `
            html += `   <a href="${loginUrl}">Login</a>`
            html += `   &nbsp;OR&nbsp;`
            html += `   <a href="${subscribeUrl}">Subscribe</a>`
            html += `</h5>`;
            toastContainer.innerHTML = html;
        } else {
            toastContainer.innerHTML = '';
        }
    }


    function makeDataTable(id, options) {    // init datatable

        if (jsu.isNotNull(mtgv) && jsu.isNotNull(mtgv.mtpp) && jsu.isNotNull(mtgv.mtpp)) {
            premInit = true;
        } else {
            setTimeout(() => {
                makeDataTable(id, options);
            }, 500);
        }

        if (typeof DataTable != "undefined" && premInit && mtgv.mtpp.pr) {
            setTimeout(() => {
                // if (!$.fn.DataTable.isDataTable("#" + id)) { // do not reinitialize if table is already a dataTable - or else shows reinitialize error
                // midt.pvdt(id);
                // }
                $('#' + id).DataTable(options);

            }, 100);
        }
    }

    function expandSectorCompTable(btn, id) {
        let opDivId = "tsrSecRotOpSectorsWrapper";
        let upDivId = "tsrSecRotUpSectorsWrapper";
        let btnArr = document.getElementsByClassName("tsrSecRotTableExpandCollapseBadge");

        let opDiv = document.getElementById(opDivId);
        let upDiv = document.getElementById(upDivId);
        if (opDiv.classList.contains("col-xl-6")) {
            opDiv.classList.remove("col-xl-6");
            upDiv.classList.remove("col-xl-6");
            opDiv.classList.add("col-12");
            upDiv.classList.add("col-12");
            for (let i = 0; i < btnArr.length; i++) {
                let btn = btnArr[i];
                btn.innerHTML = `
                <span class="fw-medium me-2">Show less</span>
                <i class="fas fa-expand"></i>
            `;
            }
        }
        else {
            opDiv.classList.remove("col-12");
            upDiv.classList.remove("col-12");
            opDiv.classList.add("col-xl-6");
            upDiv.classList.add("col-xl-6");
            for (let i = 0; i < btnArr.length; i++) {
                let btn = btnArr[i];
                btn.innerHTML = `
                <span class="fw-medium me-2">Show more</span>
                <i class="fas fa-expand"></i>
            `;
            }
        }

        let div = document.getElementById(id);
        div.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }


    return {
        pds: populateDurationSelect,
        gd: getData,
        gf: getFreq,
        gt: getTick,
        grv: getRoundedValue,
        gcv: getColoredValue,
        slt: showLoginToast,
        mdt: makeDataTable,
        esct: expandSectorCompTable,

        css: css
    }
})();