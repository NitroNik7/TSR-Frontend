var miChTb = (function () {

    var chartContainerId = "chartPanel1";
    var toolbarId = "tsrDrawingsToolbar";
    var toolbarDraggerId = "tsrDrawingsToolbarDragger";
    var replayPeriodId = "tsrChReplayPeriod";
    var playPauseBtnId = "tsrReplayPlayPauseBtn";
    var fbDivId = "tsrReplayFbDiv";
    var startDateInputId = "tsrReplayStartDate";
    var tickInputId = "tsrReplayTicks";
    var stepForwardBtnId = "tsrReplayStepForwardBtn";
    var stepBackwardBtnId = "tsrReplayStepBackwardBtn";
    var speedSelectId = "tsrReplaySpeedSelect";
    var restartBtnId = "tsrReplayRestartBtn";

    var play = false;

    var chartContainer = document.getElementById(chartContainerId);
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

        if (!miChTbUtils.im()) {
            html += `<div id=${toolbarDraggerId} class='tsr_chart_toolbar_dragger'>`;
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

        let leftOffset = chartContainer.getBoundingClientRect().left + window.scrollX - 20;

        if (miChTbUtils.im()) {
            toolbar.style.top = (distanceFromTop + 50) + "px";
            toolbar.style.left = leftOffset + "px";
            toolbar.style.scale = "0.8";
        } else {
            toolbar.style.top = (distanceFromTop + 50) + "px";
            toolbar.style.left = "40vw";
            toolbar.style.scale = "1";
        }

        if (!miChTbUtils.im()) {

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

        html += `<div class="d-flex flex-column">`
        html += `   <div class="d-flex align-items-center">`
        html += `      <div class="text-center">   `
        html += `          <div class="dropdown-center">`
        html += `             <button id="${replayPeriodId}" class="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" title="Select Replay Period">`
        html += `                  Select Period`
        html += `              </button>`
        html += `              <ul class="dropdown-menu"  style="width: max-content; min-width:unset;">`
        html += `                  <li style="width: max-content;">`
        html += `                      <button class="btn btn-sm" onclick="miChTb.urp('chart')">Candle on Chart</button>`
        html += `                  </li>`
        html += `                  <li style="width: max-content;">`
        html += `                      <div class="dropend">`
        html += `                          <button type="button" class="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" data-bs-offset="-41,28">`
        html += `                               Start Date`
        html += `                          </button>`
        html += `                          <form class="dropdown-menu p-2 text-end">`
        html += `                              <div class="form-floating mb-2">`
        html += `                                  <input type="datetime-local" class="form-control" id="${startDateInputId}" value="${getCurrentDateTime()}" required>`
        html += `                                  <label for="${startDateInputId}" class="form-label">Select Date & Time</label>`
        html += `                              </div>`
        html += `                              <button type="button" class="btn btn-secondary btn-sm" onclick="miChTb.urp('startDate')">Apply</button>`
        html += `                          </form>`
        html += `                      </div>`
        html += `                  </li>`
        html += `                  <li style="width: max-content;">`
        html += `                      <div class="dropend">`
        html += `                          <button type="button" class="btn dropdown-toggle btn-sm" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" data-bs-offset="-70,20">` // offset (Y,X)
        html += `                              Last N Ticks`
        html += `                          </button>`
        html += `                          <form class="dropdown-menu p-2 text-end">`
        html += `                              <div class="form-floating mb-2 d-flex align-items-center justify-content-between">`
        html += `                                  <input type="number" class="form-control" id="${tickInputId}" value="10" required>`
        html += `                                  <label for="${tickInputId}" class="form-label">Enter Ticks</label>`
        html += `                              </div>`
        html += `                              <button type="button" class="btn btn-secondary btn-sm" style="margin: 0;"  onclick="miChTb.urp('tick')">Apply</button>`
        html += `                          </form>`
        html += `                      </div>`
        html += `                  </li>`
        html += `              </ul>`
        html += `          </div>`;
        html += `      </div>`;

        // html += `   <div class="vr"></div> `;


        html += `      <div class="text-center mx-2">`
        html += `         <div class="d-flex">`
        html += `             <button id="${stepBackwardBtnId}" class="btn" style="margin: 0; font-size: 20px;"  title="Step Backward"  onclick="">`
        html += `                 <i class="fas fa-step-backward"></i>`
        html += `             </button>`

        html += `              <button id="${playPauseBtnId}" class="btn" style="margin: 0; font-size: 20px;" title="Play" onclick="miChTb.rr()">`
        html += `                  <i class="fas fa-play"></i>`
        html += `              </button>`

        html += `             <button id="${stepForwardBtnId}" class="btn" style="margin: 0; font-size: 20px;"  title="Step Forward"  onclick="">`
        html += `                 <i class="fas fa-step-forward"></i>`
        html += `             </button>`


        html += `              <select id="${speedSelectId}" class="form-select form-select-sm mx-1" style="min-width: fit-content; font-size: 16px; font-weight: 500;" aria-label="Small select example" title="Select Speed" onchange="">`
        html += `                  <option value="0.5">0.5x</option>`
        html += `                  <option value="0.75">0.75x</option>`
        html += `                  <option selected>1x</option>`
        html += `                  <option value="2">2x</option>`
        html += `                  <option value="5">5x</option>`
        html += `              </select>`


        html += `         <button id="${restartBtnId}" class="btn" style="margin: 0;"  title="Restart"  onclick="">`
        html += `             <i class="fas fa-redo"></i>`
        html += `         </button>`

        html += `         </div>`
        html += `      </div>`

        // html += `   <div class="vr"></div>`

        html += `      <div class="d-flex mx-2">`
        html += `         <button class="btn btn-close" style="margin: 0;"  onclick="miChTb.de()" title="Close">`
        html += `         </button>`
        html += `      </div>`;

        html += `   </div>`;

        html += `       <div class="text-center" id="${fbDivId}">`

        html += `       </div>`;

        return html;
    }

    function deleteElement() {
        if (miChTbUtils.pd(targetElement))
            chartContainer.removeChild(targetElement);

        let toolbar = document.getElementById(toolbarId);
        if (miChTbUtils.pd(toolbar))
            toolbar.remove();

    }

    function getCurrentDateTime() {

        const now = new Date();
        return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}T09:15`;
    }

    function updateRelayPeriod(option) {
        let button = document.getElementById(replayPeriodId);
        let fbDiv = document.getElementById(fbDivId);

        let html = "";
        if (option == "tick") {
            let input = document.getElementById(tickInputId);
            if (input.value > 100) {
                fbDiv.innerHTML = `
                    <hr style="margin: 5px 0;">
                   <span style="color:red">Please enter valid value</span>
                `;

                html += "Last N Ticks";
            } else {
                fbDiv.innerHTML = "";
                html += "Last " + input.value + " Ticks";
            }
        } else if (option == "startDate") {
            let input = document.getElementById(startDateInputId);
            // if (input.value ) {
            //     fbDiv.innerHTML = `
            //         <hr style="margin: 5px 0;">
            //        <span style="color:red">Please enter valid value</span>
            //     `;
            //      html+="Start Date";
            // }
            // else {
            // fbDiv.innerHTML = "";

            let date = new Date(input.value);
            html += "Start Date <br>" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
            // }
        } else {
            fbDiv.innerHTML = "";
            html += "Candle on Chart";
        }
        button.innerHTML = html;

        let replayPeriodDropdown = document.getElementById(replayPeriodId);
        bootstrap.Dropdown.getInstance(replayPeriodDropdown).hide();
    }

    function runReplay() {
        let playPauseBtn = document.getElementById(playPauseBtnId);

        let html = "";
        if (!play) {
            play = true;
            html += `<i class="fas fa-pause"></i>`;
        } else {
            html += `<i class="fas fa-play"></i>`;
            play = false;
        }

        playPauseBtn.innerHTML = html;

    }

    function closeFbDiv() {
        let fbDiv = document.getElementById(fbDivId);
        let html = "";

        fbDiv.innerHTML = html;
    }


    return {
        srt: showReplayToolbar,
        urp: updateRelayPeriod,
        de: deleteElement,
        rr: runReplay,
        cfb: closeFbDiv,
    }

})();