
async function getData(url) {

    const res = await fetch(url)

    const data = await res.json();

    return data;

}

function getRoundedValue(val) {

    // Recheck later
    if (val > 9999999) {
        val = val / 10000000;
    }

    if (val < -9999999) {
        val = val / 10000000;
    }

    val = Math.round(val * 100) / 100;

    return val;
}

function getColoredValue(val) {

    val = getRoundedValue(val);
    let html = "";

    if (paramDefined(val)) {
        if (val > 0) {
            html += "<div style='color: #31a745;'>" + val + "</div>";
        }
        else if (val < 0) {
            html += "<div style='color: #ff9999;'>" + val + "</div>";
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
