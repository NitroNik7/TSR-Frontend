var miSrnUtils = (function () {

    let htmlU = mintHtmlUtil;
    let jsu = mintJsUtil;

    var premInit = false;
    var toastContainerId = "secRotToastContainer";


    var sectorRotationDef = {
        "Short Term": {
            "1d": {
                "freq": "mm15",
                "ema1": "5",
                "ema2": "8",
                "rtnBreak": "hh1"
            },
            "1w": {
                "freq": "hh2",
                "ema1": "5",
                "ema2": "8",
                "rtnBreak": "D"
            },

            "2w": {
                "freq": "hh4",
                "ema1": "5",
                "ema2": "8",
                "rtnBreak": "2D"
            },
        },
        "Medium Term": {
            "1m": {
                "freq": "D",
                "ema1": "5",
                "ema2": "8",
                "rtnBreak": "W"
            },
            "3m": {
                "freq": "D",
                "ema1": "13",
                "ema2": "34",
                "rtnBreak": "W"
            },
            "6m": {
                "freq": "D",
                "ema1": "15",
                "ema2": "50",
                "rtnBreak": "M"
            },
        },
        "Long Term": {
            "1y": {
                "freq": "D",
                "ema1": "50",
                "ema2": "200",
                "rtnBreak": "Q"
            },
            "2y": {
                "freq": "W",
                "ema1": "13",
                "ema2": "34",
                "rtnBreak": "Q"
            },
            "5y": {
                "freq": "M",
                "ema1": "13",
                "ema2": "34",
                "rtnBreak": "Y"
            }
        }
    };


    function populateDurationSelect(sectorDurationSelectId, selVal) {

        let durationSelect = document.getElementById(sectorDurationSelectId);

        let html = "";

        let terms = Object.entries(sectorRotationDef);

        let defaultOption = selVal;
        if (jsu.isNull(defaultOption) || selVal == "") {
            defaultOption = "3m";
        }

        for (let i = 0; i < terms.length; i++) {
            let durations = Object.keys(terms[i][1]);
            html += `<optgroup label="${terms[i][0]}">`
            for (let i = 0; i < durations.length; i++) {
                if (durations[i] != defaultOption)
                    html += `<option value='${durations[i]}'>${durations[i].toUpperCase()}</option>`
                else {
                    html += `<option value='${defaultOption}' selected>${defaultOption.toUpperCase()}</option>` // default option
                }
            }
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
        // let neutralColor = "#000000"; // #ff8400;

        if (jsu.isNull(color)) {
            if (paramDefined(val)) {
                let textColor = "#000000";
                if (val > 0) {
                    textColor = positiveColor;
                }
                else if (val < 0) {
                    textColor = negativeColor;
                }
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


    function paramDefined(param) {
        if (typeof param != "undefined" && param != null) {
            return true;
        }

        return false;
    }

    function showLoginToast(show) {
        let toastContainer = document.getElementById(toastContainerId);

        if (paramDefined(mtgv) && paramDefined(mtgv.mtpp) && paramDefined(mtgv.mtpp)) {
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

        if (paramDefined(mtgv) && paramDefined(mtgv.mtpp) && paramDefined(mtgv.mtpp)) {
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
    pd: paramDefined,
    gd: getData,
    grv: getRoundedValue,
    gcv: getColoredValue,
    slt: showLoginToast,
    mdt: makeDataTable,
    esct: expandSectorCompTable,
}
}) ();