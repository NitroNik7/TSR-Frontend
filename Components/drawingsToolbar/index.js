var miChTb = (function () {

    var chartContainerId = "tsrChart";
    var toolbarId = "tsrDrawingsToolbar";
    var toolbarDraggerId = "tsrDrawingsToolbarDragger";

    var chartContainer = document.getElementById(chartContainerId);

    var targetElement;

    function showDrawingsToolbar(e) {
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

        html += `<div id=${toolbarDraggerId} class='tsr_chart_toolbar_box'>`;
        html += `   <i class="fas fa-grip-vertical"></i>`;
        html += `</div>`;

        html += `<div style="border-left: 1px solid lightgray; margin-left: 3px; margin-right: 3px;">`;
        html += `</div>`;


        html += getToolsContainer();

        toolbar.innerHTML = html;

        document.body.appendChild(toolbar);

        let distanceFromTop = chartContainer.getBoundingClientRect().top;
        let offset = 0.15 * window.innerHeight;

        toolbar.style.top = (distanceFromTop + offset) + "px";

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

        document.onmousedown = function (e) {
            if (!toolbar.contains(e.target)) {
                toolbar.remove();
            }
        };
    }

    function getToolsContainer() {

        let html = "";

        html += `<div class="d-flex tsr_chart_toolbar_box">`;
        html += `   <button class="btn">`;
        html += `       <div style="display: flex; align-items: center;">
                            <svg height="20" width="40" background-color="white">  <line x1="0" y1="10" x2="250" y2="10" style="stroke:black;stroke-width:1.5"></line> </svg>
                            <span class="fa fa-chevron-down"></span>
                        </div>`;
        html += `   </button>`;
        html += `   <button class="btn">`;
        html += `       <i class="fa-solid fa-pencil" style="font-size: 16px"></i>`;
        html += `   </button>`;
        html += `   <button class="btn" onclick="miChTb.de()">`
        html += `       <i class="fa-solid fa-trash" style="font-size: 16px"></i>`;
        html += `   </button>`
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

    return {
        sdt: showDrawingsToolbar,
        de: deleteElement,
    }

})();