var miSrnUtils = (function () {

    let htmlU = mintHtmlUtil;
    let jsu = mintJsUtil;

    var premInit = false;
    var toastContainerId = "secRotToastContainer";

    // TODO - use full names
    var sectorRotationDef = {
        // "Short Term": {
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
        // },
        // "Medium Term": {
        "1m": {
            "freq": "M",
            "ema1": "5",
            "ema2": "8",
            "rtnBreak": "W"
        },
        "3m": {
            "freq": "Q",
            "ema1": "13",
            "ema2": "34",
            "rtnBreak": "W"
        },
        "6m": {
            "freq": "HY",
            "ema1": "15",
            "ema2": "50",
            "rtnBreak": "M"
        },
        // },
        // "Long Term": {
        "1y": {
            "freq": "Y",
            "ema1": "50",
            "ema2": "200",
            "rtnBreak": "Q"
        },
        "2y": {
            "freq": "2Y",
            "ema1": "13",
            "ema2": "34",
            "rtnBreak": "Q"
        },
        "5y": {
            "freq": "5Y",
            "ema1": "13",
            "ema2": "34",
            "rtnBreak": "Y"
        }
        // }
    };

    function getTerm(duration) {
        if (duration == '1m' || duration == '3m' || duration == '6m') {
            return 'Medium Term';
        } else if (duration == '1y' || duration == '2y' || duration == '5y') {
            return 'Long Term'
        } else {
            return 'Short Term'
        }
    }

    function getFreq(duration) {
        let durationArr = Object.entries(sectorRotationDef);

        for (let i = 0; i < durationArr.length; i++) {
            if (durationArr[i][0] == duration)
                return durationArr[i][1].freq;
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

        for (let i = 0; i < durationArr.length; i++) {
            if (durationArr[i][0] != defaultOption)
                html += `<option value='${durationArr[i][0]}'>${durationArr[i][0].toUpperCase()}</option>`
            else {
                html += `<option value='${defaultOption}' selected>${defaultOption.toUpperCase()}</option>` // default option
            }
        }

        // for (let i = 0; i < terms.length; i++) {
        //     let durations = Object.keys(terms[i][0]);
        //     html += `<optgroup label="${getTerm(durations)}">`
        //     for (let i = 0; i < durations.length; i++) {
        //         if (durations[i] != defaultOption)
        //             html += `<option value='${durations[i]}'>${durations[i].toUpperCase()}</option>`
        //         else {
        //             html += `<option value='${defaultOption}' selected>${defaultOption.toUpperCase()}</option>` // default option
        //         }
        //     }
        //     html += `</optgroup>`;
        // }

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


        // val = parseInt(val);
        val = getRoundedValue(val);

        if (jsu.isNull(text) || typeof text != "string") {
            text = "";
        }

        let html = "";

        let positiveColor = "#059669"; // #31a745;
        let negativeColor = "#dc2626"; // #ff5050; 
        // let neutralColor = "#000000"; // #ff8400;

        if (jsu.isNull(color)) {
            if (jsu.isNotNull(val)) {
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
        grv: getRoundedValue,
        gcv: getColoredValue,
        slt: showLoginToast,
        mdt: makeDataTable,
        esct: expandSectorCompTable,
    }
})();