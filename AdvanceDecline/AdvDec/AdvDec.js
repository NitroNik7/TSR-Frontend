var dyadr = (function () {  // Advance Decline


	let thisObj = 'dyadr';


	let USER_ACTION = thisObj + '.ua';
	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;


	var width, height;
	var margin = { top: 10, right: 70, bottom: 20, left: 30 }

	var offsetTop;
	var rawDailyData, todaysData;
	var divId, params, period;
	var today;
	var smallDimension;

	var xAxisTickSpacing;

	var xAxisStyle = "stroke-width: 1.5; ";
	var yAxisStyle = "stroke-width: 1.5; ";

	var advancesLineStyle = 'fill: none; stroke-width: 2; stroke: #0ca08a;';
	var declinesLineStyle = 'fill: none; stroke-width: 2; stroke: red;'

	var circleAdvancesStyle = 'fill-opacity: 0.2; stroke-width: 2; fill: #0ca08a; stroke: #0ca08a';
	var circleDeclinesStyle = 'fill-opacity: 0.2; stroke-width: 2; fill: red; stroke: red';
	let circleRadius = 4;
	var crosshairStyle = 'stroke: gray; stroke-width: 1; stroke-dasharray: 3;';


	let url, dateFormat;

	let svgId;

	let tooltipStyle = ` 
        display: block; 
        position: absolute; 
        border: 5px solid lightgray; 
        border-radius: 10px; 
        padding: 5px;
        background-color: white;
        box-shadow: 0 1rem 3rem rgba(0,0,0,.1) !important;
    `;


	function setDimensions(params, chartDiv) {


		width = chartDiv.width() - 100;

		smallDimension = width < 500 ? true : false;


		width = chartDiv.width() - margin.left - margin.right;

		if (window.innerHeight < chartDiv.height()) {
			height = window.innerHeight - margin.top - margin.bottom - 50;;
		} else {
			height = chartDiv.height() - margin.top - margin.bottom;
		}

		offsetTop = chartDiv.offset().top;
	}


	function drawChartFromData(data) {





		var chartContainer = $('#' + divId);
		chartContainer.empty();
		$('#tooltipDiv').remove();

		setDimensions(params, $(`#${divId}`));

		let chartContainerOffset = chartContainer.offset().left;

		const svg = d3.select(`#${divId}`)
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom);

		let xAxisTickFreq = parseInt((width + margin.left + margin.right) / xAxisTickSpacing);

		const x = d3.scaleTime()
			.domain(d3.extent(data, function (d) { return d.Date }))
			.range([0, width]);
		svg.append("g")
			.attr("transform", `translate(${margin.left}, ${height + margin.top})`)
			.call(d3.axisBottom(x)
				.ticks(xAxisTickFreq))
			.attr("style", xAxisStyle);

		let totalStocks = d3.max(data, function (d) { return d.Declines + d.Advances });


		let minDec = d3.min(data, function (d) { return d.Declines });
		let minAdv = d3.min(data, function (d) { return d.Advances });

		let maxDec = d3.max(data, function (d) { return d.Declines });
		let maxAdv = d3.max(data, function (d) { return d.Advances });


		let minY = minAdv > minDec ? minDec : minAdv;

		let maxY = maxAdv > maxDec ? maxAdv : maxDec;

		// let minY = d3.min(data, function (d) { return d.Declines });
		minY = Math.abs(parseInt(minY - ((10.0 / 100) * minY)));
		// let maxY = d3.max(data, function (d) { return d.Advances });
		maxY = Math.abs(parseInt(maxY + ((10.0 / 100) * maxY)));

		// Add Y axis
		const y = d3.scaleLinear()
			.domain([minY, maxY])
			.range([height, 0]);
		svg.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`)
			.call(d3.axisLeft(y))
			.attr("style", yAxisStyle);

		let advances = d3.line()
			.x(function (d) { return x(d.Date) })
			.y(function (d) { return y(d.Advances) })

		// Advances
		svg.append("path")
			.datum(data)
			.attr("style", advancesLineStyle)
			.attr("d", advances)
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		let declines = d3.line()
			.x(function (d) { return x(d.Date) })
			.y(function (d) { return y(d.Declines) })

		// Declines
		svg.append("path")
			.datum(data)
			.attr("style", declinesLineStyle)
			.attr("d", declines)
			.attr("transform", `translate(${margin.left}, 0)`);

		let circleAdvances = svg.append("g")
			.append("circle")
			.attr("r", circleRadius)
			.attr("style", circleAdvancesStyle)
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
			.attr("opacity", 0);

		let circleDeclines = svg.append("g")
			.append("circle")
			.attr("r", circleRadius)
			.attr("style", circleDeclinesStyle)
			.attr("transform", "translate(" + margin.left + "," + 0 + ")")
			.attr("opacity", 0);

		// rect for capturing mouse interactions
		svg.append("rect")
			.attr("id", "rectOverlay")
			.attr("width", width)
			.attr("height", height)
			.attr("opacity", 0)
			.attr("transform", `translate(${margin.left}, ${margin.top})`)
			.on("mouseover", function (e) { mouseover(e) })
			.on("mousemove", function (e) { mousemove(e) })
			.on("mouseout", function (e) { mouseout(e) });

		// // This allows to find the closest X index of the mouse:
		var bisect = d3.bisector(function (d) { return d.Date; }).left;

		// tooltip div
		let div = document.createElement("div");
		div.id = "tooltipDiv";
		div.style.display = "block";
		div.style.position = "absolute";
		div.setAttribute("style", tooltipStyle);
		div.addEventListener("mouseover", function (e) { mouseover(e) });
		div.addEventListener("mousemove", function (e) { mousemove(e) });
		div.addEventListener("mouseout", function (e) { mouseout(e) });

		svg.append("line")
			.attr("id", "crosshair")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", 0)
			.attr("y2", height)
			.attr("opacity", 0)
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		function mouseover(e) {
			circleAdvances.attr("opacity", 1);
			circleDeclines.attr("opacity", 1);

			div.style.opacity = "1";

			d3.select("#crosshair")
				.attr("opacity", "1");

			if (!div.isConnected)
				document.body.appendChild(div);
		}

		function mousemove(e) {
			let x0 = x.invert(e.clientX - chartContainerOffset - margin.left);

			var index = bisect(data, x0, 1);
			if (index <= data.length - 1) {

				let selectedData = data[index];

				let xCord = x(selectedData.Date);

				circleAdvances.attr("cx", xCord);
				circleAdvances.attr("cy", y(selectedData.Advances));

				circleDeclines.attr("cx", xCord);
				circleDeclines.attr("cy", y(selectedData.Declines));

				if (xCord > window.innerWidth / 2) { // if mouse is on rhs of screen
					div.style.left = (e.clientX - div.getBoundingClientRect().width - 10) + "px";
				}
				else {
					div.style.left = e.clientX + 10 + "px";
				}

				div.style.top = ((e.pageY)) + "px";

				let displayDate = selectedData.Date.toLocaleString();

				let adrFreq = htmlU.getInputVal('adrFreq');

				if (jsu.containsString([FREQ_DAILY, FREQ_WK, FREQ_MTH], adrFreq)) {
					displayDate = jsu.dateToString(selectedData.Date);
				}

				div.innerHTML = `
	                    <b>${(displayDate)}</b>
	                    <br>
	                    <span style="color: green">
	                        Advances: ${selectedData.Advances}
	                    </span>
	                    <br>
	                    <span style="color: red">
	                        Declines: ${selectedData.Declines}
	                    </span>
	                `;

				svg.select("#crosshair")
					.attr("x1", xCord)
					.attr("y1", 0)
					.attr("x2", xCord)
					.attr("y2", height)
					.attr("style", crosshairStyle)
			}
		}

		function mouseout(e) {

			circleAdvances.attr("opacity", 0);
			circleDeclines.attr("opacity", 0);

			d3.select("#crosshair")
				.attr("opacity", "0");

			if (e.target != div || e.target != document.getElementById("rectOverlay"))
				document.body.removeChild(div);
		}
	}


	// Chart related thing are done ....

	let LOAD_DIV = 'arLdgDiv';
	let FB_DIV = 'arFbDiv'

	let FREQ_LIST = null;

	let IDX_TYPE = [
		{ id: 'BroadBased', label: 'Broad Based Index' },
		{ id: 'SecIdx', label: 'Sectorial Index' },
	]


	let INDEX_LIST = [

		// {id : 'all' , label : 'All'},
		{ id: 'FuturesAndOptions', label: 'F&O Stocks', type: "BroadBased" },
		{ id: 'Nifty50', label: 'Nifty 50 ', type: "BroadBased" },
		{ id: 'Nifty100', label: 'Nifty 100', type: "BroadBased" },
		{ id: 'Nifty200', label: 'Nifty 200 ', type: "BroadBased" },
		{ id: 'Nifty500', label: 'Nifty 500 ', type: "BroadBased" },
		{ id: 'NiftyMidCap100', label: 'Nifty Midcap 100', type: "BroadBased" },
		{ id: 'NiftySmallCap100', label: 'Nifty Smallcap 100', type: "BroadBased" },
		{ id: 'NiftMicrocap250', label: 'Nifty Microcap 250', type: "BroadBased" },

		{ id: 'NiftTotalMarket', label: 'Nifty Total Market', type: "BroadBased" },


		{ id: 'NiftyAutoIndex', label: 'Nifty Auto', type: "SecIdx" },
		{ id: 'NiftyBankIndex', label: 'Nifty Bank', type: "SecIdx" },
		{ id: 'NiftyConsumerDurablesIndex', label: 'Nifty Consumer Durable', type: "SecIdx" },
		{ id: 'NiftyFinancialServiceIndex', label: 'Nifty Fin Services', type: "SecIdx" },

		{ id: 'NiftyHealthCareIndex', label: 'Nifty Healthcare', type: "SecIdx" },
		{ id: 'NiftyFmcgIndex', label: 'Nifty FMCG', type: "SecIdx" },

		{ id: 'NiftyITIndex', label: 'Nifty IT', type: "SecIdx" },
		{ id: 'NiftyMediaIndex', label: 'Nifty Media', type: "SecIdx" },
		{ id: 'NiftyMetalIndex', label: 'Nifty Metals', type: "SecIdx" },

		{ id: 'NiftyOilAndGasIndex', label: 'Nifty Oil/ Gas', type: "SecIdx" },
		{ id: 'NiftyPharmaIndex', label: 'Nifty Pharma', type: "SecIdx" },
		{ id: 'NiftyPrivateBankIndex', label: 'Nifty Private Bank', type: "SecIdx" },
		{ id: 'NiftyPSUBankIndex', label: 'Nifty PSU Bank', type: "SecIdx" },
		{ id: 'NiftyRealtyIndex', label: 'Nifty Realty', type: "SecIdx" },

	];






	function addControl() {
		getSupportedFreq(); // load Freq List

		let html = '<div id="miCtrl">';

		html += htmlU.doBold('Stock Basket') + SP_2 +
			htmlU.getDropDown(INDEX_LIST, 'adrSb', null, USER_ACTION, 'chart', FREQ_MM1);

		html += SP_2;

		html += htmlU.doBold('Tick') + SP_2 +
			htmlU.getDropDown(FREQ_LIST, 'adrFreq', null, USER_ACTION, 'chart', FREQ_MM1);

		html += '</div>';
		htmlU.addMsgToDiv('arCtrlDiv', true, html);


		htmlU.addMsgToDiv('arCountDiv', true, createBarHtml(true));
	}


	function init(param1) {

		addControl();

		xAxisTickSpacing = 100;
		divId = 'arContentDiv';

		$('#' + divId).height(400);

		userAction('chart');

		userAction('adrSbTick');
	}



	function autoRefresh() {

	}

	function userAction(param1) {

		if (param1 == 'chart') {
			let adrSb = htmlU.getInputVal('adrSb');
			let adrFreq = htmlU.getInputVal('adrFreq');


			let DJS_URL = '/rt/djs';
			let postData = { cat: 'Markets', subCat: 'AdvanceDecline', freq: adrFreq, classi: adrSb, type: 'chart' }

			var remoteObject = new RC(DJS_URL, null, postData, LOAD_DIV, FB_DIV, thisObj, 'uar', 'chart');

			// URL  : // https://www.tsruat.com/rt//djs?cat=Markets&subCat=HeatMap&freq=mm5&index=Nifty50
			jsu.rc(remoteObject);

		} else if (param1 == 'adrSbTick') {


			let adrFreq = htmlU.getInputVal('allAdrTick');  // tsrAdrSbTick


			let classi = htmlU.getInputVal('idxType');

			let DJS_URL = '/rt/djs';
			let postData = { cat: 'Markets', subCat: 'AdvanceDecline', freq: adrFreq, classi: classi, type: param1 }

			var remoteObject = new RC(DJS_URL, null, postData, LOAD_DIV, FB_DIV, thisObj, 'uar', param1);
			remoteObject.param1 = param1;
			// URL  : // https://www.tsruat.com/rt//djs?cat=Markets&subCat=HeatMap&freq=mm5&index=Nifty50
			jsu.rc(remoteObject);

		} else if (param1 == 'adrSB') {

			let idxSbType = htmlU.getInputVal('idxSbType');

			if (idxSbType == null) idxSbType = 'Nifty500';


			let DJS_URL = '/rt/djs';
			let postData = { cat: 'Markets', subCat: 'AdvanceDecline', freq: FREQ_INTRA_DAILY, classi: idxSbType, type: 'adrSbTick' }

			var remoteObject = new RC(DJS_URL, null, postData, LOAD_DIV, FB_DIV, thisObj, 'uar', param1);

			remoteObject.param1 = param1;
			jsu.rc(remoteObject);

		}




	}

	function userActionResponse(data, type, remoteObject) {
		if (data.statusCode == MSG_STATUS_GOOD) {

			if (type == 'chart') {

				let result = data.results;

				let dataArr = [];
				let row = null;
				for (let i = 0; i < result.length; i++) {

					row = result[i];
					dataArr.push({ 'Date': jsu.parseDate(row.dt), 'Advances': Number(row.a), 'Declines': Number(row.d) });

					// if(i==  1) break;

				}

				drawChartFromData(dataArr);

			} else {
				let rows = ''
				let result = data.results;


				let showIndex = remoteObject.param1 == 'adrSB' ? true : false;

				for (let i = 0; i < result.length; i++) {
					row = result[i];


					if (row == null) {

						if (showIndex) {
							row({ a: 0, d: 0 })
						} else {
							if ((row.a == 0 && row.d == 0)) continue;
						}

					}



					let idxObj = jsu.getObjFrmArr(INDEX_LIST, row.id);

					if (idxObj == null) continue;


					let detailedUrl = jsu.getRootUrl() + '/Screener/Markets/AdvanceDecline'


					let adrData = {
						numAdvances: row.a, numDeclines: row.d, idSuffix: row.id,
						stockBasket: idxObj.label, detailedUrl: detailedUrl
					}


					let cntHtml = createAdvancedDeclineRatioBar(adrData, showIndex, row.id);
					rows += cntHtml;

					if (showIndex) break;

					rows += '<hr>';

				}
				htmlU.addMsgToDiv('advCntRow', true, rows);

				// if(remoteObject.param1 == 'adrSbTick'){
				// 	htmlU.addMsgToDiv('advCntRow', true,rows);
				// }else{
				// 	htmlU.addMsgToDiv('advCntRow', true,rows);
				// }


			}
		}
	}


	function getSupportedFreq() {

		let DAILY = jsu.cloneObj(FREQ_DAILY_OBJ);

		DAILY.label = 'Daily (EOD)';


		FREQ_LIST = [

			{ id: FREQ_INTRA_DAILY, label: 'Daily Live' },
			FREQ_HH1_OBJ, FREQ_MM30_OBJ, FREQ_MM15_OBJ, FREQ_MM5_OBJ, FREQ_MM2_OBJ,
			DAILY, FREQ_WK_OBJ, FREQ_MTH_OBJ
		]






		return FREQ_LIST;

	}


	function createBarHtml(showIndex) {

		let html = `
			<div class="row mt-5 container-fluid">
                                        <div class="card text-bg-primary mb-3">
                                            <div class="card-header d-flex justify-content-between" style="font-size: 18px; font-weight:600;">
            <span>Advance Decline Ratio</span>`;
		if (showIndex) {

			let CNT_FREQ = jsu.cloneObj(FREQ_LIST);
			CNT_FREQ.push(FREQ_QTR_OBJ);
			CNT_FREQ.push(FREQ_YR_OBJ);


			html += htmlU.getDropDown(IDX_TYPE, 'idxType', null, USER_ACTION, 'adrSbTick', 'BroadBased');


			html += htmlU.getDropDown(CNT_FREQ, 'allAdrTick', null, USER_ACTION, 'adrSbTick', FREQ_INTRA_DAILY);


		}
		html += `
						    </div> 


                                            <div class="card-body">`

		html += '<div id ="advCntRow"></div>';

		html += `                                        

                                               
                                            </div>
                                        </div>
                                    </div>
		`

		return html;

	}





	function createAdvancedDeclineRatioBar(data, showIndexOpt, index) {


		let totalStocks = data.numAdvances + data.numDeclines;

		let advancesPercent = (data.numAdvances == 0) ? 0 : (data.numAdvances / totalStocks) * 100;
		let declinesPercent = (data.numDeclines == 0) ? 0 : (data.numDeclines / totalStocks) * 100;




		let html = `

                                        <div class="card-body">
                                            <div class="row mb-10">`

		html += `<div class="mb-3 mb-md-0 col-sm-6 col-md-2 d-flex"
                                                    style="text-align: center; align-items: center; justify-content: center;">`
		if (showIndexOpt) {



			//let params = 'adrSB' 

			html += htmlU.getDropDown(INDEX_LIST, 'idxSbType', null, USER_ACTION, 'adrSB', index);

		} else {
			// Screener/Markets/HeatMap/NIFTY100
			let hmUrl = jsu.getRootUrl() + '/Screener/Markets/IndexAnalysis/' + data.idSuffix.toUpperCase();



			html += `<span style="font-size: 24px;color:#0f92a3;">
                                                    <a href='${hmUrl}'  >${data.stockBasket}</a>
        											</span>
                                                `
		}

		html += '</div>';

		html += `                                        <div class="mb-3 mb-md-0 col-sm-6 col-md-2" style="text-align: center;">
                                                    <div class="d-flex flex-column">
                                                        <span>Advances</span>
                                                        <span style="font-size: 24;">
                                                            <font color="green" id="tsrAdrAdvancesText${data.idSuffix}"> ${data.numAdvances}</font>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="mb-3 mb-md-0 col-sm-6 col-md-2" style="text-align: center;">
                                                    <div class="d-flex flex-column">
                                                        <span>Declines</span>
                                                        <span style="font-size: 24;">
                                                            <font color="red" id="tsrAdrDeclinesText${data.idSuffix}"> ${data.numDeclines}</font>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="mb-3 mb-md-0 col-sm-6 col-md-4" style="text-align: center;">
                                                    <div class="d-flex flex-column h-100">
                                                        <span style="font-size: 16px;">
                                                            <b>
                                                                Advance Decline Ratio
                                                            </b>
                                                        </span>
                                                        <div class="d-flex flex-column" style="justify-content: center; align-content: center; flex-wrap: wrap; height: 100%;">

                                                            <div class="d-flex flex-row" style="height: 20px; justify-content: start;">
                                                                <span id="tsrAdrAdvancesPercentText${data.idSuffix}" style="white-space: nowrap; font-weight: bold;color: #008080;">${advancesPercent.toFixed()}%</span>
                                                            </div>
                                                            <div class="d-flex" 
                                                                style="height: 10px;  width: 60%;">
                                                                    <div id="tsrAdrBarAdvancesDiv${data.idSuffix}" style="background-color: #008080; height: 100%; border-top-left-radius: 10px; border-bottom-left-radius: 10px; width: ${advancesPercent}%;">

                                                                    </div>
                                                                    <div style="width: 2%;">

                                                                    </div>
                                                                    <div id="tsrAdrBarDeclinesDiv${data.idSuffix}" style="background-color: #fd4757; height: 100%; border-top-right-radius: 10px; border-bottom-right-radius: 10px; width: ${declinesPercent}%;">

                                                                    </div>

                                                            </div>

                                                            <div class="d-flex flex-row" style="height: 20px; justify-content: end;">
                                                                <span id="tsrAdrDeclinesPercentText${data.idSuffix}" style="white-space: nowrap; font-weight: bold; color: #fd4757;">${declinesPercent.toFixed()}%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>`
		if (showIndexOpt) {
			html += `<div class="col-md-2 d-flex align-content-center  flex-wrap justify-content-center">
                                                    <a href="${data.detailedUrl}"><button type="button"
                                                            class="btn btn-custom primary btn-sm h-auto w-auto">Detailed
                                                            View</button></a>

                                                </div>`
		} else {

			let hmUrl = jsu.getRootUrl() + '/Screener/Markets/HeatMap/' + data.idSuffix;





			html += `<div class="col-md-2 d-flex align-content-center  flex-wrap justify-content-center">`
			html += `<span style="font-size: 24px;color:#0f92a3;">
                                                    <a href='${hmUrl}'  >Heat Map</a>
        											</span>`

			html += ` </div>`
		}



		html += ` </div>
                                        </div>

    `;

		return html;




	}



	function highLowReturnChange() {  //onchange="JavaScript:dyadr.hlr();"

		let hlrPeriod = htmlU.getInputVal('hlrPeriod');
		let hlrSb = htmlU.getInputVal('hlrSb');

		let url = '/rt/dht';

		var json = { cat: 'Markets', subCat: 'MarketScreener', period: hlrPeriod, classi: hlrSb, type: 'hlrHtml' };

		let focusToDiv = null;
		let loadingDiv = null;
		let feedbackDiv = null;
		let cfg = null;

		jsu.dlhrtd(json, url, 'hlrDynDiv', focusToDiv, loadingDiv, feedbackDiv, cfg);

	}


	return {
		init: init,
		ua: userAction,
		uar: userActionResponse,

		ar: autoRefresh,

		hlr: highLowReturnChange




	}


})(); // module 


$(window).resize(function () {

	// drawChart
	// reDraw();
	// drawChart('chartContainer', null);
	// lc.dcfd();
});