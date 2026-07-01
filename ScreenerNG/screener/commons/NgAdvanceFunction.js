
// custom screenerUtil...
var csngaf = (function () {

	var jsu = mintJsUtil;
	var htmlU = mintHtmlUtil;








	function showMore() {

		let html = "";

		html += `	<div id="tsrCsAdvancedOptions" class="btn-group dropup" style="min-width: 100px;">`;
		html += `
						<button type="button" id="tsrCsNgAdvOptToggle" class="btn w-100 dropdown-toggle d-flex justify-content-evenly align-items-center" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
							<span style="font-size: 16px;">More</span>
						</button>
		`;

		html += `
						<div class="dropdown-menu miCtrl" style="max-height: 400px; overflow-y: auto;">
							<form class="m-0" style="width: 500px;">
								<div class="d-flex flex-column">
		`
		html += `
									<div class="mx-3 my-2">`
		// html +=  miscru.arcb() + 'Auto Refresh';


		html += `						
										<div id="csAutoRefDiv" class="mt-2" style="">

										</div>`
		html += `					</div>`

		// html += `					<hr style="margin: 0.5rem 0">`

		// html += miscru.srcb() + ' Stock Relevance';

		html += `
									<div class="mx-3 my-2">
										<div class="d-flex justify-content-between p-0">
											<label class="form-check-label fw-bold" style="text-wrap: nowrap;"
												for="csstkRelCB">
												Stock Relevance
											</label>
											${miscru.srcb()}
										</div>
										<div id="csstkRelDiv" class="mt-2" style="">
										</div>
									</div>
		`
		// html += `					<hr style="margin: 0.5rem 0">`

		// ${misu.csua('gctcb', scrAlias, 'screenNow', 'run')} // -- for custom results checkbox
		html += `
									<div class="mx-3 my-2">
										<div class="d-flex justify-content-between p-0">
											<label class="form-check-label fw-bold" style="text-wrap: nowrap;"
												for="cstRsltCB">
												Custom Results
											</label>
											<input type="checkbox" class="form-check-input" id="cstRsltCB" onclick="JavaScript:misu.csua('cbc','myTsrScreener','screenNow','run');">
										</div>
										<div id="cstRsltDiv" class="mt-2" style="">

										</div>
									</div>
		`

		// html += `					<hr style="margin: 0.5rem 0">`
		// html+= getCheckboxP('csBt' , 'csh.bt', null,'bt') // -- for backtest checkbox
		html += `					<div class="mx-3 my-2">
										<div class="d-flex justify-content-between p-0">
											<label class="form-check-label fw-bold" style="text-wrap: nowrap;"
												for="csBt">
												Backtest
											</label>
											${getCheckboxP('csBt', 'csh.bt', null, 'bt')}
										</div>
										<div id="backtestDiv" style="" class="mt-2">

										</div>
									</div>
				`
		html += `
								</div>
							</form>
						</div>
		`;

		return html;

	}


	function postShowMore() { // Post Populating the Show More...

	}


	function userAction(action, param1, param2, param3) {

		if (action == 'autoRefresh') {
			handleAutoRefreshChange();
		} else if (action == 'runps') {


			for (let i = 0; i < preCreatedScr.length; i++) {
				let def = preCreatedScr[i];
				let obj = jsu.getObjFrmArr(def.screeners, param1);

				if (obj != null) {
					json = obj.json;

					myTsrScreener.acs(json);
					return;
				}
			}
		}
	}


	function handleAutoRefreshChange() {

		miscru.ua('cs' + 'showAutoRef');

		let checked = htmlU.isChecked('csAutoRefCB');

		if (checked) {
			// Show More
			csngutil.ttcm("#tsrCsNgAdvOptToggle", true);

		} else {
			csngutil.ttcm("#tsrCsNgAdvOptToggle", false);
			//hide more
		}
	}



	let preCreatedScr = [
		{
			label: "Price Action",
			screeners: [
				{
					id: "priceActionScr1", label: "Open Equals Low", func: "csngaf.ua( 'runps' ,'priceActionScr1')",
					json: { "scrFreq": "I_D", "currentTab": "priceCs", "stkType": "NiftTotalMarket", "trend": {}, "priceGainLoss": { "gainLossType": "na", "id": "priceGainLoss", "Tick": "scrFreq", "csType": "priceCs", "goodData": true, "hasData": true }, "dynpriceComp": [{ "tick1": "scrFreq", "tperiod1": "latest", "ops": "eq", "tick2": "scrFreq", "tperiod2": "latest", "field1": "open", "field2": "low" }], "stkBsktCat": null }
				},

				{
					id: "priceActionScr2", label: "Trending Up for Min 3 Ticks", func: "csngaf.ua( 'runps' ,'priceActionScr2')",
					json: { "scrFreq": "I_D", "currentTab": "priceCs", "stkType": "NiftTotalMarket", "trend": {}, "priceGainLoss": { "gainLossType": "na", "id": "priceGainLoss", "Tick": "scrFreq", "csType": "priceCs", "goodData": true, "hasData": true }, "dynpriceTrendNg": [{ "tick": "scrFreq", "trendType": "rising", "period": 3, "trendPc": null, "trendEx": null, "candleType": "na", "field": "close" }], "dynvolTrendNg": [{ "tick": "scrFreq", "trendType": "rising", "period": 3, "trendPc": null, "trendEx": null, "candleType": "na" }], "stkBsktCat": null }
				},

				{
					id: "priceActionScr3", label: "VWAP Bullish Crossover", func: "csngaf.ua( 'runps' ,'priceActionScr3')",
					json: { "scrFreq": "mm5", "currentTab": "priceCs", "stkType": "NiftTotalMarket", "trend": {}, "priceGainLoss": { "gainLossType": "na", "id": "priceGainLoss", "Tick": "scrFreq", "csType": "priceCs", "goodData": true, "hasData": true }, "vwap": [{ "ops": "coAbv", "tick1": "mm5", "advOpt": true, "type": "vwap", "tick2": "sod", "priceField": "HLC", "vwapPeriod": 0 }], "stkBsktCat": null }
				},

				{
					id: "priceActionScr4", label: "Breakout of 20 Candles", func: "csngaf.ua( 'runps' ,'priceActionScr4')",
					json: { "scrFreq": "I_D", "currentTab": "priceCs", "stkType": "NiftTotalMarket", "trend": {}, "priceGainLoss": { "gainLossType": "na", "id": "priceGainLoss", "Tick": "scrFreq", "csType": "priceCs", "goodData": true, "hasData": true }, "priceBoBd": [{ "type": "breakOut", "period": "20", "tick2": "scrFreq", "field2": "Close", "gen": "alpha", "advOpt": false, "tick1": "scrFreq" }], "stkBsktCat": null }
				},

				// {
				// 	id: "priceActionScr5", label: "Rally Base Rally (RBR)", func: "csngaf.ua( 'runps' ,'priceActionScr5')",
				// 	json: { "scrFreq": "mm15", "currentTab": "priceCs", "stkType": "idx500", "trend": {}, "priceGainLoss": { "gainLossType": "na", "id": "priceGainLoss", "Tick": "scrFreq", "csType": "priceCs", "goodData": true, "hasData": true }, "rallyBaseCom": [{ "type": "rbr", "advOpt": true, "maxBoring": "3", "minLegIn": "2.5", "minLegOut": "3", "tick1": "scrFreq" }], "stkBsktCat": null }
				// },
			]
		},
		{
			label: "Technicals",
			screeners: [
				{
					id: "techScr1", label: "RSI Cross Above 30", func: "csngaf.ua( 'runps' ,'techScr1')",
					json: { "scrFreq": "I_D", "currentTab": "priceCs", "stkType": "NiftTotalMarket", "trend": {}, "priceGainLoss": { "gainLossType": "na", "id": "priceGainLoss", "Tick": "scrFreq", "csType": "priceCs", "goodData": true, "hasData": true }, "techNgComp": [{ "ops": "coAbv", "type": "techIndi", "subType": "obos", "indi": "rsis", "techTick": "scrFreq", "p1": "14", "priceField": "Close", "indiIndex": "0", "custom": null, "ob": 70, "os": 30, "v1": "30", "maType": "" }], "stkBsktCat": null }
				},
				{
					id: "techScr2", label: "MACD Bullish Crossover", func: "csngaf.ua( 'runps' ,'techScr2')",
					json: { "scrFreq": "I_D", "currentTab": "priceCs", "stkType": "NiftTotalMarket", "trend": {}, "priceGainLoss": { "gainLossType": "na", "id": "priceGainLoss", "Tick": "scrFreq", "csType": "priceCs", "goodData": true, "hasData": true }, "techNgComp": [{ "ops": "macBul", "type": "techIndi", "subType": "macd", "indi": "mac", "techTick": "scrFreq", "p1": "12", "p2": 26, "p3": 9, "maType": "EMA", "priceField": "Close", "fieldType": "macd", "custom": false, "indiIndex": "0", "v4": null, "srl": null }], "stkBsktCat": null }
				},
				{
					id: "techScr3", label: "Golden EMA Crossover", func: "csngaf.ua( 'runps' ,'techScr3')",
					json: { "scrFreq": "I_D", "currentTab": "priceCs", "stkType": "NiftTotalMarket", "trend": {}, "priceGainLoss": { "gainLossType": "na", "id": "priceGainLoss", "Tick": "scrFreq", "csType": "priceCs", "goodData": true, "hasData": true }, "macoComp": [{ "type1": "ema", "type2": "ema", "ops": "coAbv", "maTick": "scrFreq", "ma1": "50", "ma2": "200", "baseMaField": "Close", "compMaField": "Close", "custom": false }], "stkBsktCat": null }
				},
				{
					id: "techScr4", label: "Bullish Engulfing / Gap Up", func: "csngaf.ua( 'runps' ,'techScr4')",
					json: { "scrFreq": "I_D", "currentTab": "priceCs", "stkType": "NiftTotalMarket", "trend": {}, "priceGainLoss": { "gainLossType": "na", "id": "priceGainLoss", "Tick": "scrFreq", "csType": "priceCs", "goodData": true, "hasData": true }, "patternNg": [{ "type": "patternNg", "indi": "bullCs", "cpTick": "scrFreq", "pat": "bullishEngulfing,bullishGapUp", "tickPeriod": "cTick" }], "stkBsktCat": null }
				}, // modified

				// {
				// 	id: "techScr5", label: "52-Week High Breakout", func: "csngaf.ua( 'runps' ,'techScr5')",
				// 	json: { "scrFreq": "W", "currentTab": "priceCs", "stkType": "idx500", "trend": {}, "priceGainLoss": { "gainLossType": "na", "id": "priceGainLoss", "Tick": "scrFreq", "csType": "priceCs", "goodData": true, "hasData": true }, "dynpriceComp": [{ "tick1": "scrFreq", "tperiod1": "latest", "ops": "abv", "tick2": "scrFreq", "tperiod2": "p1", "field1": "close", "field2": "close" }], "dynvolComp": [{ "tick1": "scrFreq", "tperiod1": "latest", "ops": "abv", "tick2": "scrFreq", "tperiod2": "p1", "v1": "20" }], "techStrComp": [{ "tick": "I_D", "strType": "strBull", "type": "techStrComp" }], "hlRangeComp": [{ "period": "52", "term": "week", "newHl": "1", "hl": "high", "ticks": "5min" }], "stkBsktCat": null }
				// },
			]
		},
		{
			label: "Fundamental",
			screeners: [
				{
					id: "fundaScr1", label: "Large Cap Stocks", func: "csngaf.ua( 'runps' ,'fundaScr1')",
					json: { "scrFreq": "D", "currentTab": "finRatNg", "stkType": "idx500", "trend": {}, "priceGainLoss": { "gainLossType": "na", "id": "priceGainLoss", "Tick": "scrFreq", "csType": "priceCs" }, "finNgComp": [{ "type": "finHl", "baseField": "marCap", "ops": "abv", "v1": "20000", "strat": "vb" }], "stkBsktCat": null }
				},

				{
					id: "fundaScr2", label: "Good Valuation Stocks", func: "csngaf.ua( 'runps' ,'fundaScr2')",
					json: { "scrFreq": "D", "currentTab": "finRatNg", "stkType": "NiftTotalMarket", "trend": {}, "priceGainLoss": { "gainLossType": "na", "id": "priceGainLoss", "Tick": "scrFreq", "csType": "priceCs", "goodData": true, "hasData": true }, "valStrComp": [{ "strType": "allGdval", "type": "valStrComp" }], "finNgComp": [{ "strat": "vb", "freq": "ttm", "type": "valRat", "baseField": "pe", "ops": "between", "v1": "15", "v2": "25", "type2": "valRat" }, { "strat": "vb", "freq": "ttm", "type": "valRat", "baseField": "priceToBook", "ops": "blw", "v1": "3" }], "stkBsktCat": null }
				},

				{
					id: "fundaScr3", label: "Low Debt Profitable Stocks", func: "csngaf.ua( 'runps' ,'fundaScr3')",
					json: { "scrFreq": "D", "currentTab": "finRatNg", "stkType": "idx500", "trend": {}, "priceGainLoss": { "gainLossType": "na", "id": "priceGainLoss", "Tick": "scrFreq", "csType": "priceCs", "goodData": true, "hasData": true }, "pftRankComp": [{ "rankType": "bull", "rankPc": "70", "type": "pftRankComp" }], "finNgComp": [{ "strat": "trend", "type": "pftRat", "baseField": "fcfRev", "ops": "trendUp", "v1": "3" }, { "strat": "vb", "freq": "fy", "type": "solRat", "baseField": "debt2Eq", "ops": "blw", "period1": "latest", "v1": ".4" }, { "strat": "vb", "type": "pftRat", "baseField": "divPayoutRatio", "ops": "blw", "period1": "latest", "v1": "40" }], "stkBsktCat": null }
				},
				{
					id: "fundaScr4", label: "Stable Stocks - High EPS & ROCE", func: "csngaf.ua( 'runps' ,'fundaScr4')",
					json: { "scrFreq": "D", "currentTab": "finRatNg", "stkType": "idx500", "trend": {}, "priceGainLoss": { "gainLossType": "na", "id": "priceGainLoss", "Tick": "scrFreq", "csType": "priceCs", "goodData": true, "hasData": true }, "tickHistVol": [{ "ops": "abv", "pc": "100", "tickType": "latest", "ticks": "20", "baseTick": "scrFreq", "compareTick": "scrFreq" }], "stabRankComp": [{ "rankType": "bull", "rankPc": "70", "type": "stabRankComp" }], "techNgComp": [{ "ops": "abv", "type": "techIndi", "subType": "obos", "indi": "rsis", "techTick": "scrFreq", "p1": "14", "priceField": "Close", "indiIndex": "0", "custom": null, "v1": "50", "maType": "", "ob": 70, "os": 30 }], "finNgComp": [{ "strat": "cagr", "type": "valRat", "baseField": "eps", "ops": "abv", "v1": "15", "v3": "3" }, { "strat": "vb", "type": "pftRat", "baseField": "roce", "ops": "abv", "period1": "latest", "v1": "20" }, { "strat": "vb", "freq": "fy", "type": "solRat", "baseField": "debt2Eq", "ops": "blw", "period1": "latest", "v1": ".3" }], "stkBsktCat": null }
				},


				// {
				// 	id: "fundaScr5", label: "ROE Growth Stocks", func: "csngaf.ua( 'runps' ,'fundaScr5')",
				// 	json: { "scrFreq": "D", "currentTab": "strCs", "stkType": "idx500", "trend": {}, "priceGainLoss": { "gainLossType": "na", "id": "priceGainLoss", "Tick": "scrFreq", "csType": "priceCs", "goodData": true, "hasData": true }, "gwthStrComp": [{ "strType": "allGdgwth", "type": "gwthStrComp" }], "finNgComp": [{ "strat": "vb", "freq": "ttm", "type": "pftRat", "baseField": "roe", "ops": "abv", "v1": "15" }, { "strat": "vb", "freq": "ttm", "type": "valRat", "baseField": "pe", "ops": "between", "v1": "15", "v2": "25" }], "stkBsktCat": null }
				// },
			]
		},
	];


	function getInstrBoxHtml() {
		let html = "";



		let breakpoints = ["d-flex", "d-none d-md-flex", "d-none d-lg-flex"];

		html += `	<div class="d-flex py-1 bg-info ms-4" style="width: max-content; color: white; background: linear-gradient(0deg, #09124f 0, #090979 30%, #006fbf 100%);">`
		html += `		<div class="tsrCsNgArrowEle" style="background-color: #071e88;">`
		html += `		</div>`
		html += `		<h3 class="mx-3 mb-0">`
		html += `			Add a Filter`
		html += `		</h3>`
		html += `	</div>`

		// html += `<hr class="ms-5">`
		html += `	<div class="miVertDivider d-flex w-100 ms-5 my-1">
						<div class="miVertLine"></div>
						<div class="fw-bold fs-16 mx-3" style="color: gray;font-size:28px;">OR</div>
						<div class="miVertLine"></div>
					</div>`
		// html += `	<p class="ms-5 my-3 text-center">OR</p>`

		html += `	<div class="align-items-center d-flex flex-column ms-5 bg-light py-1" style="overflow-y: auto; min-height: 200px;">`
		html += `		<h4 class="text-secondary text-start">Run Pre-created Screener</h4>`
		html += `		<div class="d-flex justify-content-around w-100 my-2">`

		for (let i = 0; i < preCreatedScr.length; i++) {
			html += `		<div class="${breakpoints[i]} card flex-column mx-3">`
			html += `			<div class="card-header bg-secondary bg-opacity-75">`

			html += `				<h5 class="text-white m-0 p-0">${preCreatedScr[i].label}</h5>`
			html += `			</div>`
			html += `			<div class="card-body d-flex flex-column">`
			// html += `				<table class="table table-striped">`
			// html += `					<tbody>`
			let screeners = preCreatedScr[i].screeners;
			for (let j = 0; j < screeners.length; j++) {
				let func = screeners[j].func;
				// html += `					<tr>`
				html += `						<a onclick="${func}" class=" link-secondary my-2" style="font-weight: 300; padding: 0px 5px;">`
				html += `							<i class="fas fa-play"></i>`
				html += `							<span class="ms-1">${screeners[j].label}</span>`
				html += `						</a>`
				// html += `					</tr>`
			}
			// html += `					</tbody>`
			// html += `				</table>`
			html += `			</div>`
			html += `		</div>`
		}

		html += `		</div>`
		html += `	</div>`

		return html;
	}



	return {


		gibh: getInstrBoxHtml,
		sm: showMore,
		spm: postShowMore,
		ua: userAction

	}


})(); // module 

