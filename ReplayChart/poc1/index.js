var chartContainerId = "chartPanel1";
var relayPopupId = "tsrRelayPopup";
var replayPeriodOptionsId = "tsrReplayPeriodOptions";

function showReplayPopup(show) {

    if (show) {

        let chartContainer = document.getElementById(chartContainerId);

        let replayPopup = document.createElement("div");
        replayPopup.id = relayPopupId;
        replayPopup.setAttribute("style", "z-index: 999; position: absolute; background-color: white; border: 1px solid lightgray; border-radius: 5px; box-shadow: 0px 3px 5px 0px #888888;");
        replayPopup.innerHTML = `lorem`;

        chartContainer.appendChild(replayPopup);

        let distanceFromTop = chartContainer.getBoundingClientRect().top;
        let distanceFromLeft = chartContainer.getBoundingClientRect().left;

        replayPopup.style.top = (distanceFromTop + 100) + "px";
        replayPopup.style.left = (distanceFromLeft + 25) + "px";

        replayPopup.innerHTML = getFormHtml();
    }
    else {
        let relayPopup = document.getElementById(relayPopupId);
        relayPopup.remove();
    }
}

function getFormHtml() {
    let html = "";

    html += `<form>`
    html += `   <div class="d-flex justify-content-between" style="background-color: gray; padding: 5px;">`
    html += `        <h6 style="color: white">Replay Historical Data</h6>`;
    html += `        <button style="color: white" type="button" class="btn-close" onclick="showReplayPopup(false)"></button>`
    html += `   </div>`;

    html += `   <div class="p-3 pb-2 text-end">`
    html += `       <div class="d-flex">
                        <label class="my-auto" style="white-space: nowrap;">Select Period &emsp;</label>
                        <select class="form-select" onchange="showSubOptions(this)">
                            <option value="chart" selected>From Chart</option>
                            <option value="date">From Date</option>
                            <option value="tick">From Ticks</option>
                        </select>
                    </div>`;
    html += `   </div>`;
    html += `   <div id="${replayPeriodOptionsId}">`
    html += `   </div>`
    html += `   <div class="text-end p-3 pb-2">`
    html += `       <button class="btn btn-outline-secondary" onclick="updateRelayPopup('auto')">`;
    html += `           Next`
    html += `       </button>`;
    html += `   </div>`
    html += `</form>`


    return html;
}

function showSubOptions(select) {

    let replayPeriod = document.getElementById(replayPeriodOptionsId);

    let html = "";
    if (select.value == "date") {
        replayPeriod.classList.add("p-3", "pb-2");
        html += `Choose Start Date & Time`
        html += `<div class="d-flex justify-content-between my-2">`
        html += `   <label for="date">Date</label>`
        html += `   <input type="date" name="" id="date" value="2025-11-17">`
        html += `</div>`
        html += `<div class="d-flex justify-content-between my-2">`
        html += `   <label for="date">Time</label>`
        html += `   <input type="time" name="" id="time" value="09:15">`
        html += `</div>`

    }
    else if (select.value == "tick") {
        replayPeriod.classList.add("p-3");
        html += `<div class="d-flex justify-content-between">`
        html += `   <label for="date">Choose ticks</label>`
        html += `   <input type="number" name="" id="tick" size="2">`;
        html += `</div>`

    } else {
        replayPeriod.classList.remove("p-3", "pb-2");

    }

    replayPeriod.innerHTML = html;
}

function updateRelayPopup(option) {
    let html = "";

    html += `   <div class="d-flex justify-content-between" style="background-color: gray; padding: 5px; color: white;">`
    html += `        <h6 style="color: white">Replay Historical Data</h6>`;
    html += `        <button style="color: white" type="button" class="btn-close" onclick="showReplayPopup(false)"></button>`
    html += `   </div>`;
    html += `   <div class="btn-group w-100" role="group">`;
    html += `       <input type="radio" class="btn-check" name="replayMode" id="auto" autocomplete="off" checked>`;
    html += `       <label class="btn btn-outline-secondary" for="auto" onclick="">Auto</label>`;
    html += `       <input type="radio" class="btn-check" name="replayMode" id="manual" autocomplete="off">`;
    html += `       <label class="btn btn-outline-secondary" for="auto" onclick="">Manual</label>`;
    html += `   </div>`;
    html += `   <div class="d-flex justify-content-around p-3 pb-2">`;
    html += `       <div class="d-flex flex-column">`
    html += `         <button class="btn">`
    html += `             <i class="fas fa-play"></i>`
    html += `         </button>`
    html += `         <br>`
    html += `         <span class="mx-auto" style="font-size: 12px">`
    html += `               Play`
    html += `         </span>`
    html += `       </div>`;
    html += `       <div class="d-flex flex-column">`
    html += `         <button class="btn">`
    html += `             <i class="fas fa-pause"></i>`
    html += `         </button>`
    html += `         <br>`
    html += `         <span class="mx-auto" style="font-size: 12px">`
    html += `               Pause`
    html += `         </span>`
    html += `       </div>`;
    html += `   </div>`;
    html += `   <div class="d-flex align-items-center p-3 pb-2">`;
    html += `           Speed`
    html += `         <button class="btn">`
    html += `             0.5x`
    html += `         </button>`
    html += `         <button class="btn">`
    html += `             0.75x`
    html += `         </button>`
    html += `         <button class="btn">`
    html += `             1x`
    html += `         </button>`
    html += `         <button class="btn">`
    html += `             5x`
    html += `         </button>`
    html += `         <button class="btn">`
    html += `             10x`
    html += `         </button>`
    html += `   </div>`;
    html += `   <div class="p-3 text-end">`;
    html += `       <button class="btn btn-outline-secondary">`
    html += `           Restart <i class="fas fa-redo"></i>`
    html += `       </button`
    html += `   </div>`

    let relayPopup = document.getElementById(relayPopupId);
    relayPopup.innerHTML = html;
}