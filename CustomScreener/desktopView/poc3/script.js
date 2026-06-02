
let jsu = mintJsUtil;

function init() {
    let seperatorId = 'tsrCsDivSeperator';
    $('#' + seperatorId).on("mousedown", function (e) {
        e.preventDefault()
        mouseDownHandler(e);
    });
}

init();

function showSelectedFields(checkbox) {
    let sfDivId = "tsrCsSelectedFilters";
    let sfDiv = document.getElementById(sfDivId);
    let seperatorId = "tsrCsDivSeperator";
    let sepDiv = document.getElementById(seperatorId);
    let show = checkbox.checked;

    if (show) {
        sfDiv.style.display = "flex";
        sepDiv.style.display = "inline-block";
    } else {
        sfDiv.style.display = "none";
        sepDiv.style.display = "none";
    }
}


function showCsAdvancedOptions() {
    let autoRefreshCheckId = "dropdownCheck1";
    let stockRelCheckId = "dropdownCheck2";
    let custResCheckId = "dropdownCheck3";
    let backTestCheckId = "dropdownCheck4";

    let autoRefreshCheck = document.getElementById(autoRefreshCheckId);
    let stockRelCheck = document.getElementById(stockRelCheckId);
    let custResCheck = document.getElementById(custResCheckId);
    let backtestCheck = document.getElementById(backTestCheckId);

    let autoRefDivId = "csAutoRefDiv";
    let autoRefDiv = document.getElementById(autoRefDivId);
    if (autoRefreshCheck.checked) {
        autoRefDiv.innerHTML = `
            <b>Tick :</b>
            &nbsp;&nbsp;
            <select id="csAutoRefDD"
                onchange="JavaScript:miscru.ua('csAutoRefDD');">
                <option value="scrTick" selected=""> Screener Tick
                </option>
                <option value="2">2 Mins</option>
                <option value="3">3 Mins</option>
                <option value="5">5 Mins</option>
                <option value="10">10 Mins</option>
                <option value="15">15 Mins</option>
                <option value="20">20 Mins</option>
                <option value="30">30 Mins</option>
            </select>&nbsp;&nbsp;&nbsp;
            <br>
            <span style="color:grey;font-size:10pt;"> Screener Tick is
                Recommended. Change to Manage refresh Interval. Works on
                Live ticks Only </span>
        `;
    } else {
        autoRefDiv.innerHTML = "";
    }

    let stockRelId = "csstkRelDiv";
    let stockRelDiv = document.getElementById(stockRelId);
    if (stockRelCheck.checked) {
        stockRelDiv.innerHTML = `
            <label class="radio-inline">
                <input
                type="radio" name="csstkRelRad" value="match"
                checked=""
                onclick="JavaScript:miscru.ua('csstkRel');">&nbsp;All
            Matched</label>&nbsp;&nbsp;
            <label class="radio-inline">
                <input type="radio" name="csstkRelRad" value="new" onclick="JavaScript:miscru.ua('csstkRel');">&nbsp;Only New</label>&nbsp;&nbsp;
                <label class="radio-inline"><input type="radio" name="csstkRelRad" value="repeat" onclick="JavaScript:miscru.ua('csstkRel');">&nbsp;Only Repeated</label>&nbsp;&nbsp;
                <label class="radio-inline"><input type="radio"
                name="csstkRelRad" value="rem"
                onclick="JavaScript:miscru.ua('csstkRel');">&nbsp;Removed
            from Prev Runs</label>&nbsp;&nbsp;<label
            class="radio-inline"><input type="radio"
                name="csstkRelRad" value="all"
                onclick="JavaScript:miscru.ua('csstkRel');">&nbsp;All
            Incl Removed</label>&nbsp;&nbsp;
        `;
    } else {
        stockRelDiv.innerHTML = ``;
    }

    let custResultsId = "cstRsltDiv";
    let custResultsDiv = document.getElementById(custResultsId);
    if (custResCheck.checked) {
        custResultsDiv.innerHTML = `
        <b>Result Template</b> -
        &nbsp;&nbsp;&nbsp;
        <div class="d-flex">
            <div>
                Pre <select id="preTempId"
                    onchange="JavaScript:misu.ctc('preTempId','myTsrScreener','screenNow','run');">
                    <option value="NA">None</option>
                    <option value="17">HighLow</option>
                    <option value="1">IndustrySector</option>
                    <option value="8">OH</option>
                    <option value="18">OneYearHighLow</option>
                    <option value="2">PricVolChangePC</option>
                    <option value="19">Volume</option>
                </select>&nbsp;&nbsp;&nbsp;
            </div>

            <div>
                Custom Cols <select id="custTempId"
                    onchange="JavaScript:misu.ctc('custTempId','myTsrScreener','screenNow','run');">
                    <option value="NA">Default</option>
                    <option value="15">BetaVol</option>
                    <option value="16">CandlePatterns</option>
                    <option value="12">CommonlyUsed</option>
                    <option value="11">EMA</option>
                    <option value="13">FinCommon</option>
                    <option value="7">MovingAvg</option>
                    <option value="10">OHLC</option>
                    <option value="6">OverBotSoldOsc</option>
                    <option value="14">PivotPoint</option>
                    <option value="5">TechIndi</option>
                </select>&nbsp;&nbsp;&nbsp;
            </div>

            <div>
                Cols <select id="postTempId"
                    onchange="JavaScript:misu.ctc('postTempId','myTsrScreener','screenNow','run');">
                    <option value="NA">None</option>
                    <option value="3">FinBasic</option>
                    <option value="4">FinRatio</option>
                    <option value="21">Highs</option>
                    <option value="20">KeyTech</option>
                    <option value="104">TSR Strength</option>
                </select>&nbsp;&nbsp;&nbsp;
            </div>

            <a target="_blank"
                href="https://www.topstockresearch.com/my/MyTsr/#/ScreenerResultTemplate">Create
                Template</a>
        </div>
        
        <div id="cstRsltLoadDiv" style="display: none;"><img
                src="//www.topstockresearch.com/static/img/LoadingMedium.gif">
        </div>
        <div id="cstRsltFbDiv"></div>
    `;
    } else {
        custResultsDiv.innerHTML = "";

    }

    let backtestId = "backtestDiv";
    let backtestDiv = document.getElementById(backtestId);
    if (backtestCheck.checked) {
        backtestDiv.innerHTML = `
            <span
                style="font-size:12pt;"> <b>Time
                    Machine</b> : </span>&nbsp;&nbsp;&nbsp;
                <select id="btIndex">
                    <option value="0">Latest Tick</option>
                    <option value="1">Prev Tick</option>
                    <option value="2"> P - 2</option>
                    <option value="3"> P - 3</option>
                    <option value="4"> P - 4</option>
                    <option value="5"> P - 5</option>
                    <option value="6"> P - 6</option>
                    <option value="7"> P - 7</option>
                    <option value="8"> P - 8</option>
                    <option value="9"> P - 9</option>
                    <option value="10"> P - 10</option>
                    <option value="11"> P - 11</option>
                    <option value="12"> P - 12</option>
                    <option value="13"> P - 13</option>
                    <option value="14"> P - 14</option>
                    <option value="15"> P - 15</option>
                    <option value="16"> P - 16</option>
                    <option value="17"> P - 17</option>
                    <option value="18"> P - 18</option>
                    <option value="19"> P - 19</option>
                    <option value="20"> P - 20</option>
                    <option value="21"> P - 21</option>
                    <option value="22"> P - 22</option>
                    <option value="23"> P - 23</option>
                    <option value="24"> P - 24</option>
                    <option value="25"> P - 25</option>
                    <option value="26"> P - 26</option>
                    <option value="27"> P - 27</option>
                    <option value="28"> P - 28</option>
                    <option value="29"> P - 29</option>
                    <option value="30"> P - 30</option>
                    <option value="31"> P - 31</option>
                    <option value="32"> P - 32</option>
                    <option value="33"> P - 33</option>
                    <option value="34"> P - 34</option>
                    <option value="35"> P - 35</option>
                    <option value="36"> P - 36</option>
                    <option value="37"> P - 37</option>
                    <option value="38"> P - 38</option>
                    <option value="39"> P - 39</option>
                    <option value="40"> P - 40</option>
                    <option value="41"> P - 41</option>
                    <option value="42"> P - 42</option>
                    <option value="43"> P - 43</option>
                    <option value="44"> P - 44</option>
                    <option value="45"> P - 45</option>
                    <option value="46"> P - 46</option>
                    <option value="47"> P - 47</option>
                    <option value="48"> P - 48</option>
                    <option value="49"> P - 49</option>
                </select>
            <br>
            <span style="color:grey;font-size:10pt;"> Only
                Filters from <b>Price , Volume, TechIndi , MovAvg &amp;
                    Chart Patterns</b> are currently supported</span>
        `;

    } else {
        backtestDiv.innerHTML = "";
    }
}

function initPopover(popoverTriggerEl) {
    let popover = bootstrap.Popover.getOrCreateInstance(popoverTriggerEl);
    popover.show();
}

function disablePopover(popoverTriggerEl) {
    let popover = bootstrap.Popover.getOrCreateInstance(popoverTriggerEl);
    popover.dispose();
}

function toggleCsAdvancedOptions() {
    let autoRefreshCheckId = "dropdownCheck1";
    let autoRefreshCheck = document.getElementById(autoRefreshCheckId);

    if (autoRefreshCheck.checked) {
        autoRefreshCheck.checked = false;
    } else {
        autoRefreshCheck.checked = true;
    }
    showCsAdvancedOptions();
}




const mouseDownHandler = function mouseDownHandler(e) {

    xCord = e.clientX;
    let id = "#" + e.currentTarget.id;

    colAfter = $(id).next()[0];
    colBefore = $(id).prev()[0];

    if (jsu.isNotNull(colAfter) && jsu.isNotNull(colBefore)) {
        $(document.body).on("mousemove", (e) => {
            colMouseMoveHandler(e, colAfter, colBefore);
        });
        $(document.body).on("mouseup", mouseUpHandler);
    }
}

const colMouseMoveHandler = function (e, colAfter, colBefore) {
    let dx = xCord - e.clientX;

    colAfter.style.transition = 'none';
    colBefore.style.transition = 'none';
    let newColAfterWidth, newColBeforeWidth;

    newColBeforeWidth = colBefore.offsetWidth - dx + 'px';
    newColAfterWidth = colAfter.offsetWidth + dx + 'px';

    colBefore.style.width = newColBeforeWidth;
    colAfter.style.width = newColAfterWidth;

    xCord = e.clientX;
}

const mouseUpHandler = () => {
    $(document.body).off("mousemove");
    $(document.body).off("mouseup");
}

