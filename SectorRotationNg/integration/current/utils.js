var miSrnUtils = (function () {


    var premInit = false;
    var toastContainerId = "secRotToastContainer";


    var sectorRotationDef = {
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
    };



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

    function getColoredValue(val) {

        val = getRoundedValue(val);
        let html = "";

        if (paramDefined(val)) {
            if (val > 0) {
                html += "<div style='color: #31a745;'>" + val + "</div>";
            }
            else if (val < 0) { // ff9999
                html += "<div style='color: #ff5050;'>" + val + "</div>";
            } else {
                html += "<div style='color: #ff8400;'>" + val + "</div>";

            }
        }
        else {
            html += "<div style='color: black;'>" + val + "</div>";
        }

        return html;
    }


    function paramDefined(param) {
        if (typeof param != "undefined" && param != null) {
            return true;
        }

        return false;
    }

    function populateDurationSelect(sectorDurationSelectId) {

        let durationSelect = document.getElementById(sectorDurationSelectId);

        let html = "";

        let defaultOption = "3m";
        let keys = Object.keys(sectorRotationDef);
        html += `<option value='${defaultOption}'>${defaultOption.toUpperCase()}</option>` // default option
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] != defaultOption)
                html += `<option value='${keys[i]}'>${keys[i].toUpperCase()}</option>`
        }

        durationSelect.innerHTML = html;

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


    function makeDataTable(id) {    // init datatable

        if (paramDefined(mtgv) && paramDefined(mtgv.mtpp) && paramDefined(mtgv.mtpp)) {
            premInit = true;
        } else {
            setTimeout(() => {                                                                                                                                                                                                     
                makeDataTable(id);
            }, 500);
        }

        if (typeof DataTable != "undefined" && premInit && mtgv.mtpp.pr) {
            setTimeout(() => {
                // if (!$.fn.DataTable.isDataTable("#" + id)) { // do not reinitialize if table is already a dataTable - or else shows reinitialize error
                    midt.pvdt(id);
                // }
            }, 100);
        }

    }

    return {
        pds: populateDurationSelect,
        pd: paramDefined,
        gd: getData,
        grv: getRoundedValue,
        gcv: getColoredValue,
        slt: showLoginToast,
        mdt: makeDataTable,

    }
})();