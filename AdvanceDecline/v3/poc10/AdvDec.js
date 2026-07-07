var dyadr = (function () {  // Advance Decline


	let thisObj = 'dyadr';
	let USER_ACTION = thisObj + '.ua';
	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;
	var width, height;
	// Premium Dashboard Setup & Theming
	var margin = { top: 20, right: 30, bottom: 30, left: 40 }; // Expanded right margin for endpoint labels

	// Glassmorphism-style premium floating tooltip configuration
	let tooltipStyle = ` 
		display: block;
		position: absolute; 
		border: 1px solid rgba(255, 255, 255, 0.2); 
		border-radius: 12px; 
		padding: 12px 16px;
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(12px) saturate(180%);
		-webkit-backdrop-filter: blur(12px) saturate(180%);
		box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03);
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
		font-size: 13px;
		line-height: 1.6;
		color: #0f172a;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.15s ease-out, transform 0.1s ease-out;
		z-index: 9999;
	`;

	// Minimalist, high-end chart geometry styles
	var xAxisStyle = "stroke: #cbd5e1; stroke-width: 1px; font-family: sans-serif; font-size: 11px; color: #64748b;";
	var yAxisStyle = "stroke: #cbd5e1; stroke-width: 1px; font-family: sans-serif; font-size: 11px; color: #64748b;";

	// Line style declarations referencing our newly injected SVG gradients
	var advancesLineStyle = 'fill: none; stroke-width: 3; stroke: url(#advances-grad); stroke-linecap: round; stroke-linejoin: round;';
	var declinesLineStyle = 'fill: none; stroke-width: 3; stroke: url(#declines-grad); stroke-linecap: round; stroke-linejoin: round;';

	// Glowing radar style hover anchors
	var circleAdvancesStyle = 'fill: #10b981; stroke: #ffffff; stroke-width: 2.5; filter: drop-shadow(0 0 6px rgba(16,185,129,0.6));';
	var circleDeclinesStyle = 'fill: #f43f5e; stroke: #ffffff; stroke-width: 2.5; filter: drop-shadow(0 0 6px rgba(244,63,94,0.6));';
	let circleRadius = 6;

	// Precision crosshair guides
	var crosshairStyle = 'stroke: #94a3b8; stroke-width: 1; stroke-dasharray: 4 4;';

	var offsetTop;
	var rawDailyData, todaysData;
	var params, period;
	var today;
	var smallDimension;
	var xAxisTickSpacing;
	let url, dateFormat;

	// let svgId;
	let chartSectionDivId = "tsrAdrChartSection";
	var chartDivId = 'arContentDiv';
	let chartSectionSideBoxId = "tsrAdrChartSectionSideBox";
	let controlDivId = "arCtrlDiv";
	let adrRowSectionId = "arCountDiv";
	let adrRowContainerId = "advCntRow"; // ADR Row Container Id

	let LOAD_DIV = 'arLdgDiv';
	let FB_DIV = 'arFbDiv'

	let FREQ_LIST = null;

	let IDX_TYPE = [
		{ id: 'BroadBased', label: 'Broad Based Index' },
		{ id: 'SecIdx', label: 'Sectorial Index' },
		{ id: 'ThemIdx', label: 'Thematic Index' },
	]

	let INDEX_LIST = [
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

	var activeIndex = null;

	/*
		/======================/
		/     PAGE LAYOUT      /
		/======================/
		/  tsrAdrHeadingBlock  /
		/     				   /
		/    chart section     /
		/       controls       /
		/  adr row container   /
		/======================/
	*/

	/*
		FLOW
	*/

	function init(param1) {
		addControl();
		addAdrRowSection();
		addChart();
	}

	// -------------------------- ADD Controls Row Starts-----------------------
	function addControl() {
		getSupportedFreq(); // load Freq List

		let html = '<div id="miCtrl">';

		// html += htmlU.doBold('Stock Basket') + SP_2 +
		// 	htmlU.getDropDown(INDEX_LIST, 'adrSb', null, USER_ACTION, 'chart', FREQ_MM1);

		html += `	
				<div class="tsrAdrControlsWrapper p-3 p-sm-4">
			    	<div class="tsrAdrControlsFlex">`
		html += getIdxTypeButtonMenuHtml();
		html += SP_2;
		html += `		<div class="tsrAdrControlItem tsrAdrIntervalBlock">
							<span class="tsrAdrControlLabel">
								<i class="far fa-clock me-2"></i>
								Interval:
							</span>`
		// html += htmlU.doBold('Tick') + SP_2 + htmlU.getDropDown(FREQ_LIST, 'adrFreq', "", USER_ACTION, 'chart', FREQ_MM1); // ? Q1. Can we pass classname ? .tsrAdrDropdown
		html += htmlU.getDropDown(FREQ_LIST, 'adrFreq', "", USER_ACTION, 'chart', FREQ_MM1); // ? Q1. Can we pass classname ? .tsrAdrDropdown
		html += `		</div>`
		html += '	</div>';
		html += '</div>';
		htmlU.addMsgToDiv('arCtrlDiv', true, html);


		// htmlU.addMsgToDiv('arCountDiv', true, createBarHtml(true));
	}

	function getIdxTypeButtonMenuHtml() {
		let html = "";

		html += `
			        <div class="tsrAdrControlItem flex-grow-1">
			            <span class="tsrAdrControlLabel">
								<i class="fas fa-layer-group me-2"></i>
								Select Index Type:
						</span>
			            <div class="tsrAdrToggleGroup">`

		for (let i = 0; i < IDX_TYPE.length; i++) {
			let idxType = IDX_TYPE[i];
			let checked = i == 0 ? "checked" : "";

			html += `
							<input type="radio" name="tsrAdrIdxType" value="${idxType.id}" id="tsrAdrIdx${idxType.id}" ${checked} 
								onclick="dyadr.ua('adrSbTick')">
							<label for="tsrAdrIdx${idxType.id}" class="tsrHmBtnLabel">${idxType.label}</label>
					`
		}

		html += `		</div>
					</div>`



		return html;

	}

	// -------------------------- ADD Controls Row ENDS -----------------------

	function addAdrRowSection() {
		htmlU.addMsgToDiv(adrRowSectionId, true, getAdrRowSectionHtml());
		userAction('adrSbTick');
		// dyadr.uarc('BroadBased');
	}

	function addChart() {

		getChartSectionHtml();


		xAxisTickSpacing = 100;
		$('#' + chartDivId).height(300);
		userAction('chart');
	}


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
		if (!data || data.length === 0) return;

		var chartContainer = $('#' + chartDivId);
		chartContainer.empty();
		$('#tooltipDiv').remove();

		setDimensions(params, $(`#${chartDivId}`));

		let chartContainerOffset = chartContainer.offset().left;

		// Canvas initialization
		const svg = d3.select(`#${chartDivId}`)
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom);

		// --- 1. DEFINE PREMIUM GRADIENTS & GLOWS ---
		const defs = svg.append("defs");

		// Advances Line Gradient (Vibrant Emerald)
		const advGrad = defs.append("linearGradient").attr("id", "advances-grad").attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
		advGrad.append("stop").attr("offset", "0%").attr("stop-color", "#34d399");
		advGrad.append("stop").attr("offset", "100%").attr("stop-color", "#059669");

		// Advances Area Gradient
		const advAreaGrad = defs.append("linearGradient").attr("id", "advances-area-grad").attr("x1", "0%").attr("y1", "0%").attr("x2", "0%").attr("y2", "100%");
		advAreaGrad.append("stop").attr("offset", "0%").attr("stop-color", "#10b981").attr("stop-opacity", 0.12);
		advAreaGrad.append("stop").attr("offset", "100%").attr("stop-color", "#10b981").attr("stop-opacity", 0.0);

		// Declines Line Gradient (Vibrant Crimson)
		const decGrad = defs.append("linearGradient").attr("id", "declines-grad").attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
		decGrad.append("stop").attr("offset", "0%").attr("stop-color", "#f87171");
		decGrad.append("stop").attr("offset", "100%").attr("stop-color", "#dc2626");

		// Declines Area Gradient
		const decAreaGrad = defs.append("linearGradient").attr("id", "declines-area-grad").attr("x1", "0%").attr("y1", "0%").attr("x2", "0%").attr("y2", "100%");
		decAreaGrad.append("stop").attr("offset", "0%").attr("stop-color", "#f43f5e").attr("stop-opacity", 0.1);
		decAreaGrad.append("stop").attr("offset", "100%").attr("stop-color", "#f43f5e").attr("stop-opacity", 0.0);

		// --- 2. AXES & SCALES CONFIGURATION ---
		let xAxisTickFreq = parseInt((width + margin.left + margin.right) / xAxisTickSpacing);

		const x = d3.scaleTime()
			.domain(d3.extent(data, d => d.Date))
			.range([0, width]);

		svg.append("g")
			.attr("transform", `translate(${margin.left}, ${height + margin.top})`)
			.call(d3.axisBottom(x).ticks(xAxisTickFreq).tickSizeOuter(0))
			.attr("style", xAxisStyle);

		let minDec = d3.min(data, d => d.Declines);
		let minAdv = d3.min(data, d => d.Advances);
		let maxDec = d3.max(data, d => d.Declines);
		let maxAdv = d3.max(data, d => d.Advances);

		let minY = minAdv > minDec ? minDec : minAdv;
		let maxY = maxAdv > maxDec ? maxAdv : maxDec;

		minY = Math.abs(parseInt(minY - ((10.0 / 100) * minY)));
		maxY = Math.abs(parseInt(maxY + ((10.0 / 100) * maxY)));

		const y = d3.scaleLinear()
			.domain([minY, maxY])
			.range([height, 0]);

		svg.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`)
			.call(d3.axisLeft(y).tickSizeOuter(0))
			.attr("style", yAxisStyle);

		// --- 3. DASHED BACKGROUND GRID ---
		let gridGroup = svg.append("g")
			.attr("class", "grid")
			.attr("transform", `translate(${margin.left}, ${margin.top})`)
			.call(d3.axisLeft(y).tickSize(-width).tickFormat(""));

		let gridGroupVertical = svg.append("g")
			.attr("class", "grid")
			.attr("transform", `translate(${margin.left}, ${margin.top})`)
			.call(d3.axisTop(x).tickSize(-width).tickFormat(""));

		gridGroup.select(".domain").remove();
		gridGroup.selectAll(".tick line")
			.attr("stroke", "#cbd5e1")
			.attr("stroke-opacity", 0.8)
			.attr("stroke-dasharray", "4 4")
			.attr("style", "shape-rendering: crispEdges;");

		gridGroupVertical.select(".domain").remove();
		gridGroupVertical.selectAll(".tick line")
			.attr("stroke", "#cbd5e1")
			.attr("stroke-opacity", 0.8)
			.attr("stroke-dasharray", "4 4")
			.attr("style", "shape-rendering: crispEdges;");

		// --- 4. AREA AND PATH GENERATION ---
		let areaGenAdv = d3.area().curve(d3.curveMonotoneX).x(d => x(d.Date)).y0(height).y1(d => y(d.Advances));
		let areaGenDec = d3.area().curve(d3.curveMonotoneX).x(d => x(d.Date)).y0(height).y1(d => y(d.Declines));

		let advances = d3.line().curve(d3.curveMonotoneX).x(d => x(d.Date)).y(d => y(d.Advances));
		let declines = d3.line().curve(d3.curveMonotoneX).x(d => x(d.Date)).y(d => y(d.Declines));

		// Render Fills first so lines sit crisp on top
		svg.append("path")
			.datum(data)
			.attr("fill", "url(#advances-area-grad)")
			.attr("d", areaGenAdv)
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		svg.append("path")
			.datum(data)
			.attr("fill", "url(#declines-area-grad)")
			.attr("d", areaGenDec)
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		// Render Main Data Paths
		const advPath = svg.append("path")
			.datum(data)
			.attr("style", advancesLineStyle)
			.attr("d", advances)
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		const decPath = svg.append("path")
			.datum(data)
			.attr("style", declinesLineStyle)
			.attr("d", declines)
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		// --- 5. PREMIUM INITIAL DRAW ANIMATION ---
		[advPath, decPath].forEach(path => {
			const totalLength = path.node().getTotalLength();
			path.attr("stroke-dasharray", totalLength + " " + totalLength)
				.attr("stroke-dashoffset", totalLength)
				.transition()
				.duration(2500)
				.ease(d3.easeCubicOut)
				.attr("stroke-dashoffset", 0);
		});

		// --- 6. TERMINAL ENDPOINT BADGES ---
		const latestData = data[data.length - 1];
		const endX = x(latestData.Date) + margin.left + 6;

		// Advances Tag
		svg.append("text")
			.attr("x", endX)
			.attr("y", y(latestData.Advances) + margin.top + 4)
			.attr("fill", "#049669")
			.style("font-family", "sans-serif")
			.style("font-size", "11px")
			.style("font-weight", "600")
			.text(`${latestData.Advances}`);

		// Declines Tag
		svg.append("text")
			.attr("x", endX)
			.attr("y", y(latestData.Declines) + margin.top + 4)
			.attr("fill", "#dc2626")
			.style("font-family", "sans-serif")
			.style("font-size", "11px")
			.style("font-weight", "600")
			.text(`${latestData.Declines}`);

		// --- 7. INTERACTIVE TRACKING ELEMENTS ---
		// Vertical Guide
		const vCrosshair = svg.append("line")
			.attr("id", "v-crosshair")
			.attr("opacity", 0)
			.attr("y1", 0)
			.attr("y2", height)
			.attr("style", crosshairStyle)
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		// Horizontal Guide
		const hCrosshair = svg.append("line")
			.attr("id", "h-crosshair")
			.attr("opacity", 0)
			.attr("x1", 0)
			.attr("x2", width)
			.attr("style", crosshairStyle)
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		// Synchronized Pointer Targets
		let circleAdvances = svg.append("circle")
			.attr("r", circleRadius)
			.attr("style", circleAdvancesStyle)
			.attr("transform", `translate(${margin.left}, ${margin.top})`)
			.attr("opacity", 0);

		let circleDeclines = svg.append("circle")
			.attr("r", circleRadius)
			.attr("style", circleDeclinesStyle)
			.attr("transform", `translate(${margin.left}, ${margin.top})`)
			.attr("opacity", 0);

		// Clean interaction capture canvas
		svg.append("rect")
			.attr("id", "rectOverlay")
			.attr("width", width)
			.attr("height", height)
			.attr("opacity", 0)
			.attr("transform", `translate(${margin.left}, ${margin.top})`)
			.on("mouseover", mouseover)
			.on("mousemove", mousemove)
			.on("mouseout", mouseout);

		var bisect = d3.bisector(d => d.Date).left;
		let div = document.createElement("div");
		div.id = "tooltipDiv";
		div.setAttribute("style", tooltipStyle);

		function mouseover() {
			circleAdvances.attr("opacity", 1);
			circleDeclines.attr("opacity", 1);
			vCrosshair.attr("opacity", 1);
			hCrosshair.attr("opacity", 1);
			div.style.opacity = "1";

			if (!div.isConnected) document.body.appendChild(div);
		}

		function mousemove(e) {
			let x0 = x.invert(e.clientX - chartContainerOffset - margin.left);
			var index = bisect(data, x0, 1);
			if (index > data.length - 1) index = data.length - 1;

			let selectedData = data[index];
			if (!selectedData) return;

			let xCord = x(selectedData.date);

			// Update Anchor Coordinates
			circleAdvances.attr("cx", xCord).attr("cy", y(selectedData.Advances));
			circleDeclines.attr("cx", xCord).attr("cy", y(selectedData.Declines));

			// Crosshair snapping tracking logic
			vCrosshair.attr("x1", xCord).attr("x2", xCord);

			// Map horizontal crosshair target to the closer of the two tracking segments relative to crosshair cursor
			let mouseYPos = e.clientY - chartContainer.offset().top - margin.top;
			let yTarget = Math.abs(mouseYPos - y(selectedData.Advances)) < Math.abs(mouseYPos - y(selectedData.Declines))
				? y(selectedData.Advances)
				: y(selectedData.Declines);
			hCrosshair.attr("y1", yTarget).attr("y2", yTarget);

			// Dynamic Smart Tooltip Alignment Boundaries
			let tooltipWidth = div.getBoundingClientRect().width || 180;
			if (xCord > width / 2) {
				div.style.left = (e.clientX - tooltipWidth - 20) + "px";
			} else {
				div.style.left = (e.clientX + 20) + "px";
			}
			div.style.top = (e.pageY - 40) + "px";

			let displayDate = "";

			// let str  ="".toString;

			let adrFreq = htmlU.getInputVal('adrFreq');
			if (jsu.containsString([FREQ_DAILY, FREQ_WK, FREQ_MTH], adrFreq)) {
				displayDate = jsu.dateToString(selectedData.date);
			}

			// Calculate Advance/Decline Ratio (ADR) safely
			let adr = selectedData.Declines > 0 ? (selectedData.Advances / selectedData.Declines).toFixed(2) : selectedData.Advances;
			let adrColor = adr >= 1.0 ? "#10b981" : "#f43f5e";

			div.innerHTML = `
				<div style="font-weight: 600; color: #0f172a; margin-bottom: 8px; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px;">
					${displayDate}
				</div>
				<div style="display: flex; justify-content: space-between; gap: 28px; margin-bottom: 3px;">
					<span style="color: #10b981; font-weight: 500;">Advances</span>
					<span style="font-weight: 600; color: #334155;">${selectedData.Advances}</span>
				</div>
				<div style="display: flex; justify-content: space-between; gap: 28px; margin-bottom: 3px;">
					<span style="color: #f43f5e; font-weight: 500;">Declines</span>
					<span style="font-weight: 600; color: #334155;">${selectedData.Declines}</span>
				</div>
				<div style="display: flex; justify-content: space-between; gap: 28px; border-top: 1px dashed #e2e8f0; margin-top: 4px; padding-top: 4px;">
					<span style="color: #64748b; font-weight: 500;">ADR Ratio</span>
					<span style="font-weight: 700; color: ${adrColor};">${adr}</span>
				</div>
			`;
		}

		function mouseout() {
			circleAdvances.attr("opacity", 0);
			circleDeclines.attr("opacity", 0);
			vCrosshair.attr("opacity", 0);
			hCrosshair.attr("opacity", 0);
			div.style.opacity = "0";

			if (div.isConnected) {
				document.body.removeChild(div);
			}
		}
	}
	// Chart related thing are done ....

	function updateAdrRowCards(indexList) {
		// onclick="JavaScript:dyadr.ua('chart');"
		// let indexList = getIndexListByType(idxType);
		let html = "";

		for (let i = 0; i < indexList.length; i++) {
			const index = indexList[i];

			let onclick = "";

			// if (i == 0) {
			onclick = `dyadr.har(this, '${index.id}'); dyadr.ua('chart', '${index.id}');`; //dyadr.vci('${index.id}', event);
			// } else {
			// 	onclick = `dyadr.ua('chart', '${index.id}'); `; // dyadr.vci('${index.id}', event);
			// }

			// TEMP:
			// let max = 100, min = 0;
			let advances = index.a;
			let declines = index.d;

			let advancesPc = Math.round((advances / (advances + declines)) * 100) + "%";
			let declinesPc = Math.round((declines / (advances + declines)) * 100) + "%";

			let adRatio = Math.round((advances / declines) * 100) / 100;

			let ratioCls = adRatio > 0 ? "tsrAdrTextGreen" : "tsrAdrTextRed";

			let indexObj = jsu.getObjFrmArr(INDEX_LIST, index.id);

			/*
			html += `
					<div class="tsrAdrRowCard" data-index-id="${index.id}" onclick="${onclick}">
						<div class="tsrAdrAssetIdentity">
							<span class="tsrAssetName">${indexObj.label}</span>
							<button type="button" class="tsrAdrInlineChartBtn" onclick="${onclick}">
								<i class="fas fa-chart-line me-1"></i> View Chart
							</button>
						</div>
						<div class="tsrAdrMetricGroup tsrAdrCenterMetric">
							<div class="tsrAdrHighlightBadge">
								<span>ADR Ratio</span>
								<font class="${ratioCls}">${adRatio}</font>
							</div>
						</div>
						<div class="tsrAdrMetricGroup tsrAdrSplitMetrics">
							<div class="tsrAdrMetricBlock text-start">
								<span>Advances</span>
								<font class="tsrAdrTextGreen">${advances}</font>
							</div>
							<div class="tsrAdrMetricBlock text-end ms-auto">
								<span>Declines</span>
								<font class="tsrAdrTextRed">${declines}</font>
							</div>
						</div>
						<div class="tsrAdrBarCentralFlex">
							<div class="tsrAdrBarValueLabel tsrAdrTextGreen text-end"> ${advancesPc}</div>
							<div class="tsrAdrBarVisualTrack">
								<div class="tsrAdrSegmentAdvance" style="width: ${advancesPc}"></div>
								<div class="tsrAdrSegmentDecline" style="width: ${declinesPc}"></div>
							</div>
							<div class="tsrAdrBarValueLabel tsrAdrTextRed"> ${declinesPc}</div>
						</div>
						<div class="tsrAdrRowActionGrid">
							<a href="https://www.topstockresearch.com/rt/Screener/Markets/HeatMap/FuturesAndOptions"
								class="tsrAdrActionBtn tsrAdrBtnSecondary">
								<i class="fas fa-th me-1"></i> Heat Map
							</a>
						</div>
					</div>
				`
				*/

			html += `
				<div class="tsrAdrRowCard" data-index-id="${index.id}" onclick="dyadr.har(this, '${index.id}'); dyadr.ua('chart', '${index.id}');">
        <div class="tsrAdrAssetIdentity">
            <span class="tsrAssetName">${indexObj.label}</span>
			
        </div>
        
<div class="tsrAdrRowChartBand" onclick="event.stopPropagation(); dyadr.har(this.closest('.tsrAdrRowCard'), 'FuturesAndOptions'); dyadr.ua('chart', 'FuturesAndOptions');">
        <i class="fas fa-chart-line"></i>
        <span>Chart</span>
    </div>

        <div class="tsrAdrMetricGroup tsrAdrCenterMetric">
            <div class="tsrAdrHighlightBadge">
                <span>ADR Ratio</span>
                <font class="tsrAdrTextGreen">${adRatio}</font>
            </div>
        </div>

        <div class="tsrAdrBarCentralFlex">
            <div class="tsrAdrSideRatioLabels d-flex justify-content-between w-100 mb-1 px-1">
                <span class="tsrAdrMetricLabelSub text-start tsrAdrTextGreen">Adv: <strong>${advances}</strong></span>
                <span class="tsrAdrMetricLabelSub text-end tsrAdrTextRed">Dec: <strong>${declines}</strong></span>
            </div>
            <div class="d-flex align-items-center w-100 gap-2">
                <div class="tsrAdrBarValueLabel tsrAdrTextGreen text-end">${advancesPc}%</div>
                <div class="tsrAdrBarVisualTrack flex-grow-1">
                    <div class="tsrAdrSegmentAdvance" style="width: ${advancesPc}"></div>
                    <div class="tsrAdrSegmentDecline" style="width: ${declinesPc}"></div>
                </div>
                <div class="tsrAdrBarValueLabel tsrAdrTextRed">${declinesPc}%</div>
            </div>
        </div>

        <div class="tsrAdrRowActionGrid">
            
            <a href="https://www.topstockresearch.com/rt/Screener/Markets/HeatMap/FuturesAndOptions" class="tsrAdrActionBtn tsrAdrBtnSecondary">
                <i class="fas fa-th me-1"></i> Heat Map
            </a>
        </div>
    </div>
			
			`
		}

		let adrRowContainer = document.getElementById("advCntRow");
		adrRowContainer.innerHTML = html;


		let firstRow = document.querySelector(".tsrAdrRowCard");
		let firstRowIndexId = firstRow.getAttribute("data-index-id");

		dyadr.har(firstRow, firstRowIndexId);
		dyadr.ua('chart');
		// return html;
	}

	function getIndexListByType(idxType) {

		let list = [];

		for (let i = 0; i < INDEX_LIST.length; i++) {
			let index = INDEX_LIST[i];
			if (index.type == idxType) {
				list.push(index);
			}
		}

		return list;
	}

	function userAction(param1) {
		if (param1 == 'chart') {

			// let adrSb = "";

			// 	adrSb = htmlU.getInputVal('adrSb');



			// TEMP
			// let url = `http://127.0.0.1:5500/AdvanceDecline/v3/poc9/data/index/${activeIndex}.json`;
									let url = `https://nitronik7.github.io/TSR-Frontend/AdvanceDecline/v3/poc10/data/index/${activeIndex}.json`;



			getData(url).then((data) => {

				let result = data.results;

				let dataArr = [];
				let row = null;
				for (let i = 0; i < result.length; i++) {

					row = result[i];
					dataArr.push({ 'Date': jsu.parseDate(row.dt), 'Advances': Number(row.a), 'Declines': Number(row.d) });

					// if(i==  1) break;

				}
				// drawChartFromData(dataArr);
				updateChartSection(dataArr);

			});
			// let adrFreq = htmlU.getInputVal('adrFreq');

			// let DJS_URL = '/rt/djs';
			// // let postData = { cat: 'Markets', subCat: 'AdvanceDecline', freq: adrFreq, classi: adrSb, type: 'chart' }
			// let postData = { cat: 'Markets', subCat: 'AdvanceDecline', freq: adrFreq, classi: activeIndex, type: 'chart' }
			// var remoteObject = new RC(DJS_URL, null, postData, LOAD_DIV, FB_DIV, thisObj, 'uar', 'chart');
			// // URL  : // https://www.tsruat.com/rt//djs?cat=Markets&subCat=HeatMap&freq=mm5&index=Nifty50
			// jsu.rc(remoteObject);

		} else if (param1 == 'adrSbTick') {


			let adrFreq = htmlU.getInputVal('adrFreq');
			// let adrFreq = htmlU.getInputVal('allAdrTick');  // tsrAdrSbTick
			let indexType = htmlU.getRadioVal('tsrAdrIdxType');
			// let url = `http://127.0.0.1:5500/AdvanceDecline/v3/poc9/data/indexType/${indexType}Indices.json`;
						let url = `https://nitronik7.github.io/TSR-Frontend/AdvanceDecline/v3/poc10/data/indexType/${indexType}Indices.json`;


			getData(url).then((data) => {
				updateAdrRowCards(data.results);
			});


			// // let classi = htmlU.getInputVal('idxType');
			// let classi = htmlU.getRadioVal('tsrAdrIdxType');
			// let DJS_URL = '/rt/djs';
			// let postData = { cat: 'Markets', subCat: 'AdvanceDecline', freq: adrFreq, classi: classi, type: param1 }

			// var remoteObject = new RC(DJS_URL, null, postData, LOAD_DIV, FB_DIV, thisObj, 'uar', param1);
			// remoteObject.param1 = param1;
			// // URL  : // https://www.tsruat.com/rt//djs?cat=Markets&subCat=HeatMap&freq=mm5&index=Nifty50
			// jsu.rc(remoteObject);

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

				// drawChartFromData();
				updateChartSection(dataArr);

			} else {
				let rows = ''
				let result = data.results;


				/* Old code
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
				*/

				updateAdrRowCards(result);

				// if(remoteObject.param1 == 'adrSbTick'){
				// 	htmlU.addMsgToDiv('advCntRow', true,rows);
				// }else{
				// 	htmlU.addMsgToDiv('advCntRow', true,rows);
				// }


			}
		}
	}

	function updateChartSection(dataArr) {
		htmlU.addMsgToDiv(chartSectionDivId, true, getChartSectionHtml(dataArr));
		// htmlU.addMsgToDiv(chartSectionSideBoxId, true,);
		drawChartFromData(dataArr);


	}

	function getChartSectionHtml(dataArr) {

		const latestData = dataArr[dataArr.length - 1];

		let html = "";

		html += `
								<div
                                    class="tsrAdrChartHeaderRow px-3 py-3 d-flex flex-column flex-lg-row align-items-center justify-content-between">
                                    <div class="d-flex align-items-center gap-2">
                                        <h2 class="tsrAdrChartSectionTitle" style="font-size: 20px;">
                                            F&amp;O Stocks ADR <span> on 15 mins tick </span>
                                            <!-- <span>15 mins Tick</span> -->
                                        </h2>
                                    </div>
                                    <div class="tsrAdrSelColor mt-2 mt-lg-0">
                                        <p class="tsrAdrAdvanceLabel">Advances</p>
                                        <p class="tsrAdrDeclineLabel">Declines</p>
                                    </div>
                                </div>

                                <div class="tsrAdrChartContentRow">
                                    <div id="arContentDiv" class="tsrAdrChartScrollContainer">
                                    </div>

                                    <div id="tsrAdrChartSectionSideBox" class="tsrAdrChartSidePanel">`
		html += getChartSectionSideBox(latestData);
		html += `					</div>
                                </div>
		
		`


		return html;


	}

	function getChartSectionSideBox(latestData) {
		let html = "";

		let advances = latestData.Advances;
		let declines = latestData.Declines;
		let adRatio = (advances / declines).toFixed(2);

		let advancesPc = ((advances / (advances + declines)) * 100).toFixed(2) + "%";
		let declinesPc = ((declines / (advances + declines)) * 100).toFixed(2) + "%";

		let ratioCls = adRatio > 0 ? "tsrAdrTextGreen" : "tsrAdrTextRed";

		html += `
			<div class="tsrAdrPrimaryMetricBadge">
				<span class="tsrAdrMetricLabel">ADR Ratio</span>
				<font class="tsrAdrMetricValue ${ratioCls}">${adRatio}</font>
			</div>

			<div class="tsrAdrSideRatioBox">
				<div class="tsrAdrSideRatioLabels">
					<span class="tsrAdrTextGreen">${advancesPc} Adv</span>
					<span class="tsrAdrTextRed">${declinesPc} Dec</span>
				</div>
				<div class="tsrAdrSideBarTrack">
					<div class="tsrAdrSegmentAdvance" style="width: ${advancesPc} "></div>
					<div class="tsrAdrSegmentDecline" style="width: ${declinesPc} "></div>
				</div>
			</div>

			<div class="tsrAdrGridBorderWrapper mt-auto">
				<div class="tsrAdrSplitBlock text-start">
					<span>Advances</span>
					<font class="tsrAdrTextGreen">${advances}</font>
				</div>
				<div class="tsrAdrSplitBlock text-end">
					<span>Declines</span>
					<font class="tsrAdrTextRed">${declines}</font>
				</div>
			</div>
		`

		return html;
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

	// function createBarHtml(showIndex) {
	// 	let html = `
	// 								<div class="row mt-5 container-fluid">
	//                                     <div class="card text-bg-primary mb-3">
	//                                         <div class="card-header d-flex justify-content-between" style="font-size: 18px; font-weight:600;">
	//         									<span>Advance Decline Ratio</span>`;
	// 	if (showIndex) {
	// 		let CNT_FREQ = jsu.cloneObj(FREQ_LIST);
	// 		CNT_FREQ.push(FREQ_QTR_OBJ);
	// 		CNT_FREQ.push(FREQ_YR_OBJ);

	// 		html += htmlU.getDropDown(IDX_TYPE, 'idxType', null, USER_ACTION, 'adrSbTick', 'BroadBased');
	// 		html += htmlU.getDropDown(CNT_FREQ, 'allAdrTick', null, USER_ACTION, 'adrSbTick', FREQ_INTRA_DAILY);
	// 	}
	// 	html += `							</div> 
	// 										<div class="card-body">`
	// 	html += '								<div id ="advCntRow"></div>';
	// 	html += `                           </div>
	//                                     </div>
	//                                 </div>
	// 	`

	// 	return html;

	// }

	function getAdrRowSectionHtml() {
		let html = "";

		html += `
					<div class="tsrAdrLowerHeader mb-3 mb-sm-4 d-flex align-items-center justify-content-between flex-wrap gap-2">
						<h4 class="tsrAdrLowerTitle">
							<i class="fas fa-database me-2 text-primary"></i>
							Index Components Overview
						</h4>
						<span class="text-muted small font-monospace">
							Rows auto-align to top when focused
						</span>
					</div>

					<div id="${adrRowContainerId}" class="tsrAdrListContainer">
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
                                        </div>`;
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

	function autoRefresh() {

	}


	/**
	 * Changes focus highlight assignments and moves active rows to the top of the stack
	 * @param {HTMLElement} cardElement - Target DOM selection card
	 */
	function highlightAdrRow(cardElement, indexId) {
		const parentContainer = document.getElementById('advCntRow');
		if (!parentContainer || cardElement.classList.contains('tsrAdrRowActive')) return;

		// 1. Clear highlight classes on adjacent loops
		const allCards = parentContainer.querySelectorAll('.tsrAdrRowCard');
		allCards.forEach(card => card.classList.remove('tsrAdrRowActive'));

		// 2. Assign active state rules
		cardElement.classList.add('tsrAdrRowActive');

		// 3. Move row to the top of the container layout list smoothly
		parentContainer.insertBefore(cardElement, parentContainer.firstChild);

		// let index = mintJsUtil.getObjFrmArr(INDEX_LIST, indexId);
		activeIndex = indexId;


	}

	// /**
	//  * Handles action execution and forces parent list state reflow
	//  * @param {string} indexCode - Unique asset signature identifier mapping parameters
	//  * @param {Event} clickEvent - Native mouse listener interaction tracker
	//  */
	// function viewChartInline(indexCode, clickEvent) {
	// 	if (clickEvent && clickEvent.stopPropagation) {
	// 		clickEvent.stopPropagation();
	// 	}

	// 	const matchingCard = clickEvent.currentTarget.closest('.tsrAdrRowCard');
	// 	if (matchingCard) {
	// 		highlightAdrRow(matchingCard);
	// 	}

	// 	// Fire structural rendering routine mapping your chart elements here
	// 	// e.g., dyadr.ua('chart', indexCode);
	// 	console.log(`Active layout focus shifted. Graph loading scope parameter: ${indexCode}`);
	// }


	return {
		init: init,
		ua: userAction,
		uar: userActionResponse,

		ar: autoRefresh,

		hlr: highLowReturnChange,
		uarc: updateAdrRowCards,
		har: highlightAdrRow,
		// vci: viewChartInline,




	}


})(); // module 



// TODO review
$(window).resize(function () {
	dyadr.init();

	dyadr.ua('chart');
	// drawChart
	// reDraw();

	// drawChart('chartContainer', null);
	// lc.dcfd();
});


async function getData(url) {
	let res = await fetch(url);
	let data = await res.json();

	return data;
}