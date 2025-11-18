var miChTb = (function () {

    var chartContainerId = "chartPanel1";
    var toolbarId = "tsrDrawingsToolbar";
    var toolbarDraggerId = "tsrDrawingsToolbarDragger";

    var replayPeriodId = "tsrChReplayPeriod";

    var chartContainer = document.getElementById(chartContainerId);
    var replayPeriodId = "tsrChReplayPeriod";
    var targetElement;

    function showReplayToolbar(e) {
        targetElement = e.currentTarget;

        let prevToolbar = document.getElementById(toolbarId);
        if (miChTbUtils.pd(prevToolbar)) {
            document.getElementById(toolbarId).remove();
        }

        createToolbar();
    }

    function createToolbar() {

        let toolbar = document.createElement("div");

        toolbar.id = toolbarId;
        toolbar.classList.add("tsr_chart_toolbar");

        let html = "";

        if (!isMobile()) {
            html += `<div id=${toolbarDraggerId} class='tsr_chart_toolbar_box'>`;
            html += `   <i class="fas fa-grip-vertical"></i>`;
            html += `</div>`;

            html += `<div style="border-left: 1px solid lightgray; margin-left: 3px; margin-right: 3px;">`;
            html += `</div>`;
        }

        html += getToolsContainer();

        toolbar.innerHTML = html;

        document.body.appendChild(toolbar);

        let distanceFromTop = chartContainer.getBoundingClientRect().top + window.scrollY;
        // let offset = 0.15 * window.innerHeight;

        let leftOffset = chartContainer.getBoundingClientRect().left + window.scrollX;

        if (isMobile()) {
            toolbar.style.top = (distanceFromTop + 50) + "px";
            toolbar.style.left = leftOffset + "px";
        } else {
            toolbar.style.top = (distanceFromTop + 50) + "px";
            toolbar.style.left = "40vw";
        }

        if (!isMobile()) {

            let dragger = document.getElementById(toolbarDraggerId);
            dragger.onmousedown = mousedownHandler;

            let x1, y1, x2, y2;

            function mousedownHandler(e) {

                e.preventDefault();

                x1 = e.clientX;
                y1 = e.clientY;

                document.onmouseup = mouseupHandler;
                document.body.onmousemove = mousemoveHandler;
            }

            function mousemoveHandler(e) {

                e.preventDefault();

                x2 = x1 - e.clientX;
                y2 = y1 - e.clientY;

                let boundingRect = chartContainer.getBoundingClientRect();

                dragger.style.cursor = "grabbing";
                let leftBound = boundingRect.left + dragger.offsetWidth;
                let rightBound = boundingRect.right - toolbar.offsetWidth;

                if (e.clientX > leftBound && e.clientX < rightBound) {
                    let offsetLeft = (toolbar.offsetLeft - x2) < 0 ? 0 : (toolbar.offsetLeft - x2);
                    toolbar.style.left = offsetLeft + 'px';
                }

                let topBound = boundingRect.top + toolbar.offsetHeight;
                let bottomBound = boundingRect.bottom - toolbar.offsetHeight;

                if (e.clientY > topBound && e.clientY < bottomBound) {
                    let offsetTop = (toolbar.offsetTop - y2) < 0 ? 0 : (toolbar.offsetTop - y2);
                    toolbar.style.top = offsetTop + 'px';
                }

                x1 = e.clientX;
                y1 = e.clientY;
            }

            function mouseupHandler(e) {
                dragger.style.cursor = "grab";

                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.body.onmousemove = null;
            }
        }

        // document.onmousedown = function (e) {
        //     if (!toolbar.contains(e.target)) {
        //         toolbar.remove();
        //     }
        // };
    }

    function getToolsContainer() {

        let html = "";

        html += `<div class="d-flex align-items-center">`
        html += `   <div class="text-center">   `
        html += `       <span style="font-size: 12px;">Select Period</span>`
        html += `       <div class="dropdown-center mt-1">`
        html += `          <button id="${replayPeriodId}" class="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">`
        html += `               Select Candle`
        html += `           </button>`
        html += `           <ul class="dropdown-menu">`
        html += `               <li>`
        html += `                   <button class="btn btn-sm" onclick="miChTb.urp('chart')">Select Candle</button>`
        html += `               </li>`
        html += `               <li>`
        html += `                   <div class="dropend">`
        html += `                       <button type="button" class="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" data-bs-offset="-41,28">`
        html += `                           Select Start Date`
        html += `                       </button>`
        html += `                       <form class="dropdown-menu p-2 text-end">`
        html += `                           <div class="input-group input-group-sm form-floating mb-2">`
        html += `                               <input type="datetime-local" class="form-control" id="tsrReplayStartDate" required>`
        html += `                               <label for="tsrReplayStartDate" class="form-label">Select Date & Time</label>`
        html += `                           </div>`
        html += `                           <button type="button" class="btn btn-secondary btn-sm" onclick="miChTb.urp('startDate')">Next</button>`
        html += `                       </form>`
        html += `                   </div>`
        html += `               </li>`
        html += `               <li>`
        html += `                   <div class="dropend">`
        html += `                       <button type="button" class="btn dropdown-toggle btn-sm" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" data-bs-offset="-70,60">`
        html += `                           Select Ticks`
        html += `                       </button>`
        html += `                       <form class="dropdown-menu p-2 text-end">`
        html += `                           <div class="input-group input-group-sm form-floating mb-2">`
        html += `                               <input type="number" class="form-control" id="tsrReplayTicks" size="4" value="10" required>`
        html += `                               <label for="tsrReplayTicks" class="form-label">Enter Ticks</label>`
        html += `                           </div>`
        html += `                           <button type="button" class="btn btn-secondary btn-sm" style="margin: 0;"  onclick="miChTb.urp('tick')">Next</button>`
        html += `                       </form>`
        html += `                   </div>`
        html += `               </li>`
        html += `           </ul>`
        html += `       </div>`;
        html += `   </div>`;

        html += `   <div class="vr"></div> `;

        html += `   <div class="text-center mx-2">`
        html += `       <span style="font-size: 12px;">Auto run</span>`
        html += `       <div class="d-flex mt-1">`
        html += `           <button id="tsrReplayPlayPauseBtn" class="btn" style="margin: 0;" title="Play">`
        html += `               <i class="fas fa-play"></i>`
        html += `           </button>`
        html += `           <select id="tsrReplaySpeedSelect" class="form-select form-select-sm" aria-label="Small select example" title="Select Speed">`
        html += `               <option value="0.5">0.5x</option>`
        html += `               <option value="0.75">0.75x</option>`
        html += `               <option selected>1x</option>`
        html += `               <option value="2">2x</option>`
        html += `               <option value="5">5x</option>`
        html += `           </select>`
        html += `       </div>`
        html += `   </div>`

        html += `   <div class="vr"></div>`

        html += `   <div class="text-center mx-2">`
        html += `      <span style="font-size: 12px;">Manual run</span>`
        html += `      <div class="d-flex mt-1">`
        html += `          <button id="tsrReplayStepBackwardBtn" class="btn" style="margin: 0;"  title="Step Backward">`
        html += `              <i class="fas fa-step-backward"></i>`
        html += `          </button>`
        html += `          <button id="tsrReplayStepForwardBtn" class="btn" style="margin: 0;"  title="Step Forward">`
        html += `              <i class="fas fa-step-forward"></i>`
        html += `          </button>`
        html += `      </div>`
        html += `   </div>`

        html += `   <div class="vr"></div>`

        html += `   <div class="d-flex">`
        html += `      <button id="tsrReplayRestartBtn" class="btn" style="margin: 0;"  title="Restart">`
        html += `          <i class="fas fa-redo"></i>`
        html += `      </button>`
        html += `      <button class="btn btn-close" style="margin: 0;"  onclick="miChTb.de()" title="Close">`
        html += `      </button>`
        html += `   </div>`;

        html += `</div>`;

        return html;
    }

    function deleteElement() {
        if (miChTbUtils.pd(targetElement))
            chartContainer.removeChild(targetElement);

        let toolbar = document.getElementById(toolbarId);
        if (miChTbUtils.pd(toolbar))
            toolbar.remove();

    }

    function updateRelayPeriod(option) {
        let button = document.getElementById(replayPeriodId);

        let html = "";
        if (option == "tick") {
            let input = document.getElementById("tsrReplayTicks");
            html += "Last " + input.value + " Ticks";
        } else if (option == "startDate") {
            let input = document.getElementById("tsrReplayStartDate");
            html += "Start Date <br>" + input.value;
        } else {
            html += "Select Candle";
        }
        button.innerHTML = html;

        let replayPeriodDropdown = document.getElementById(replayPeriodId);
        bootstrap.Dropdown.getInstance(replayPeriodDropdown).hide();
    }

    function isMobile() {
        if (window.innerWidth < 768) {
            return true;
        }

        return false;
    }

    return {
        srt: showReplayToolbar,
        urp: updateRelayPeriod,
        de: deleteElement,
    }

})();