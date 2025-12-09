var miIsh = (function () {  // mi Intelli search Helper
	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;
	var cjs = mintStkCommon;

	var thisObject = 'miIsh';

	// let thisSearchMenu;
	let searchMenu;

	let inputTextBoxId = "tsrStockSearch";
	let radioBtnIdPrefix = "mishRadioBtn";


	// * FOR EQUITY

	// For All buttons
	var ALL_SEARCH_CAT = [
		{ id: 'BirdsEyeView', label: "Birds Eye View", default: true, urlPrefix: "Stock" },
		{ id: 'MovingAverage', label: "MA", default: true, urlPrefix: "Stock" },
		{ id: 'TechnicalAnalysis', label: "Tech", default: true, urlPrefix: "Stock" },
		{ id: 'FundamentalAnalysis', label: "Funda", default: false, mappedParam: "funda", urlPrefix: "Stock" },
		{ id: 'FuturesAndOptions', label: "FNO", default: false, mappedParam: "fno", urlPrefix: "Stock" },
		{ id: 'Candlestick', label: "Candlestick", default: true, urlPrefix: "Stock" },
	];


	// TECH INDI BUTTONS
	var TECH_INDI = [
		{ id: 'TechnicalAnalysis', label: "All Technicals ", default: true, urlPrefix: "Stock" },
		{ id: 'ADX', label: "ADX", default: true, urlPrefix: "ViewInChart" },
		{ id: 'AROON', label: "AROON", default: true, urlPrefix: "ViewInChart" },
		{ id: 'AwesomeOscillator', label: "AwesomeOsc", default: true, urlPrefix: "ViewInChart" },
		{ id: 'BOLLINGER', label: "Bollinger", default: true, urlPrefix: "ViewInChart" },
		{ id: 'CCI', label: "CCI", default: true, urlPrefix: "ViewInChart" },
		{ id: 'CMF', label: "CMF", default: true, urlPrefix: "ViewInChart" },
		{ id: 'KeltnerBand', label: "KeltnerBand", default: true, urlPrefix: "ViewInChart" },
		{ id: 'MACD', label: "MACD", default: true, urlPrefix: "ViewInChart" },
		{ id: 'MFI', label: "MFI", default: true, urlPrefix: "ViewInChart" },
		{ id: 'PSAR', label: "PSAR", default: true, urlPrefix: "ViewInChart" },
		{ id: 'RsiSmooth', label: "RSI", default: true, urlPrefix: "ViewInChart" },
		{ id: 'ROC', label: "ROC", default: true, urlPrefix: "ViewInChart" },
		{ id: 'Supertrend', label: "Supertrend", default: true, urlPrefix: "ViewInChart" },
		{ id: 'WilliamsR', label: "WilliamsR", default: true, urlPrefix: "ViewInChart" },
	];

	// FUNDA BUTTONS
	var FUNDA_INDI = [
		{ id: 'FundamentalAnalysis', label: "All Fundamentals ", default: true, urlPrefix: "Stock" },
		{ id: 'AltmanZScore', label: "Altman Z", default: true, urlPrefix: "Financial" },
		{ id: 'CashRatio', label: "Cash Ratio", default: true, urlPrefix: "Financial" },
		{ id: 'DebtToEquityRatio', label: "Debt to Eq Ratio", default: true, urlPrefix: "Financial" },

		{ id: 'EBITDAMargin', label: "EBITDA Margin", default: true, urlPrefix: "Financial" },
		{ id: 'EVToEBITDA', label: "EV to EBITDA", default: true, urlPrefix: "Financial" },

		{ id: 'NetProfitMargin', label: "Net Profit Margin", default: true, urlPrefix: "Financial" },
		{ id: 'OperatingProfitMargin', label: "Ops Profit Margin", default: true, urlPrefix: "Financial" },
		{ id: 'PiotroskiFScore', label: "Piotroski F Score", default: true, urlPrefix: "Financial" },
		{ id: 'PriceToEarningRatio', label: "PE Ratio", default: true, urlPrefix: "Financial" },
		{ id: 'PriceToBookRatio', label: "Price To Book", default: true, urlPrefix: "Financial" },
		{ id: 'PriceToSalesRatio', label: "Price To Sales", default: true, urlPrefix: "Financial" },
		{ id: 'QuickRatio', label: "Quick Ratio", default: true, urlPrefix: "Financial" },
		{ id: 'ReturnOnEquity', label: "Return on Equity", default: true, urlPrefix: "Financial" },
		{ id: 'ReturnOnAsset', label: "Return On Asset", default: true, urlPrefix: "Financial" },
		{ id: 'ShareholdersEquityRatio', label: "Sh Equity Ratio", default: true, urlPrefix: "Financial" },
	];

	// FNO BUTTONS
	let FNO_CAT = [
		{ id: 'FuturesAndOptions', label: "Summary", default: true },
		{ id: 'ViewOptionChain', label: "Option Chain", default: true },
		{ id: 'ViewPutCallRatio', label: "Put Call Ratio", default: true },
	];


	// MA BUTTONS
	let MA_CAT = [
		{ id: 'SMA', label: "SMA", default: true },
		{ id: 'EMA', label: "EMA", default: true },
		{ id: 'WMA', label: "WMA", default: true },
	];

	var EQUITY_SUB_CAT = [
		{ id: 'any', label: "All ", buttons: ALL_SEARCH_CAT, urlPrefix: "Stock", urlSuffix: "BirdsEyeView", default: true },
		{ id: 'FundamentalAnalysis', label: "Stock Fundamentals", urlPrefix: "Stock", urlSuffix: "FundamentalAnalysis", buttons: FUNDA_INDI, default: false, mappedParam: "funda" },
		{ id: 'MovingAverage', label: "Stock Moving Average", urlPrefix: "Stock", urlSuffix: "MovingAverage", buttons: MA_CAT, default: true },
		{ id: 'TechnicalAnalysis', label: "Stock Technicals", urlPrefix: "Stock", urlSuffix: "TechnicalAnalysis", buttons: TECH_INDI, default: true },
		{ id: 'FuturesAndOptions', label: "Futures & Options", urlPrefix: "Stock", urlSuffix: "FuturesAndOptions", buttons: FNO_CAT, default: false, mappedParam: "fno" },
	];



	// 	var EQUITY_SUB_CAT = [
	//     { id: 'any', label: "All ", buttons: ALL_SEARCH_CAT, urlPrefix: "Stock", urlSuffix: "BirdsEyeView", default: true },
	//     { id: 'FundamentalAnalysis', label: "Stock Fundamentals", urlPrefix: "Stock", urlSuffix: "FundamentalAnalysis", buttons: FUNDA_INDI, default: false, mappedParam: "funda" },
	//     { id: 'MovingAverage', label: "Stock Moving Average", urlPrefix: "Stock", urlSuffix: "MovingAverage", buttons: MA_CAT, default: true },
	//     { id: 'TechnicalAnalysis', label: "Stock Technicals", urlPrefix: "Stock", urlSuffix: "TechnicalAnalysis", buttons: TECH_INDI, default: true },
	//     { id: 'FuturesAndOptions', label: "Futures & Options", urlPrefix: "Stock", urlSuffix: "FuturesAndOptions", buttons: FNO_CAT, default: false, mappedParam: "fno" },
	// ];

	var COMP_CH_SUB_CAT = [
		{ id: 'inline', label: "Inline ", buttons: ALL_SEARCH_CAT, default: true },
		{ id: 'tile', label: "Tile ", buttons: ALL_SEARCH_CAT, default: true },
		{ id: 'stack', label: "Stack ", buttons: ALL_SEARCH_CAT, default: true },

	];

	// https://www.tsruat.com/rt/Stock/IDEA/InteractiveCharts#{"chartTick":"mm1"}     --> Min1
	// https://www.tsruat.com/rt/Stock/IDEA/InteractiveCharts#{"chartTick":"mm5"}     -- Min5
	// https://www.tsruat.com/rt/Stock/IDEA/InteractiveCharts#{"chartTick":"mm15"}    -- -- Min15
	// https://www.tsruat.com/rt/Stock/IDEA/InteractiveCharts#{"chartTick":"D"}    -- Daily

	// var TICKS = [
	// 	{ id: "InteractiveCharts#{'chartTick':'mm1'}", label: "1m", default: true, urlPrefix: "Stock" },
	// 	{ id: "InteractiveCharts#{'chartTick':'mm5'}", label: "5m", default: true, urlPrefix: "Stock" },
	// 	{ id: "InteractiveCharts#{'chartTick':'mm15'}", label: "15m", default: true, urlPrefix: "Stock" },
	// 	{ id: "InteractiveCharts#{'chartTick':'D'}", label: "D", default: true, urlPrefix: "Stock" },
	// ];

	// var CHART_SUB_CAT = [
	// 	{ id: 'any', label: "All ", buttons: ALL_SEARCH_CAT, urlPrefix: "Stock", urlSuffix: "InteractiveCharts", default: true, buttons: TICKS },
	// ];

	var TICKS = [
		{ id: 'InteractiveCharts#{%22chartTick%22:%22mm1%22}', label: "Min 1", default: true, urlPrefix: "Stock" },
		{ id: 'InteractiveCharts#{%22chartTick%22:%22mm5%22}', label: "Min 5", default: true, urlPrefix: "Stock" },
		{ id: 'InteractiveCharts#{%22chartTick%22:%22mm15%22}', label: "Min 15", default: true, urlPrefix: "Stock" },
		{ id: 'InteractiveCharts#{%22chartTick%22:%22D%22}', label: "Daily", default: true, urlPrefix: "Stock" },
	];

	var CHART_SUB_CAT = [
		{ id: 'any', label: "All ", buttons: ALL_SEARCH_CAT, urlPrefix: "Stock", urlSuffix: "InteractiveCharts", default: true, buttons: TICKS },
	];


	let EQ_DEF_DATA = [
		{
			"id": "NIFTY", "label": "NIFTY - S&P CNX NIFTY - INDEX - INDIA",
			"name": "S&P CNX NIFTY", "code": "NIFTY", "fno": "true",
			"funda": "false", "sector": "INDEX", "industry": "Broad-Based Index",
			"scId": "200000", "ecId": "10000", "ccId": "in"
		},
		{
			"id": "BANKNIFTY", "label": "BANKNIFTY - BANK NIFTY - INDEX - INDIA",
			"name": "BANK NIFTY", "code": "BANKNIFTY", "fno": "true",
			"funda": "false", "sector": "INDEX", "industry": "Sectoral  Index",
			"scId": "200000", "ecId": "10100", "ccId": "in"
		},
		{
			"id": "RELIANCE", "label": "RELIANCE - Reliance Industries Ltd. - REFINERIES - INDIA",
			"name": "Reliance Industries Ltd.", "code": "RELIANCE",
			"fno": "true", "funda": "true", "sector": "Energy",
			"industry": "Crude Oil & Natural Gas", "scId": "170", "ecId": "1", "ccId": "in"
		},

		{
			"id": "HDFCBANK", "label": "HDFCBANK - HDFC Bank Ltd. - BANKS - INDIA",
			"name": "HDFC Bank Ltd.", "code": "HDFCBANK", "fno": "true",
			"funda": "true", "sector": "Financial", "industry": "Banking",
			"scId": "121", "ecId": "93", "ccId": "in"
		},
		{
			"id": "TCS", "label": "TCS - Tata Consultancy Services Ltd. - COMPUTERS - SOFTWARE - INDIA",
			"name": "Tata Consultancy Services Ltd.", "code": "TCS",
			"fno": "true", "funda": "true", "sector": "Technology",
			"industry": "Computer Software", "scId": "133", "ecId": "19", "ccId": "in"
		},
		{
			"id": "BHARTIARTL",
			"label": "BHARTIARTL - Bharti Airtel Ltd. - TELECOMMUNICATION - SERVICES - INDIA",
			"name": "Bharti Airtel Ltd.", "code": "BHARTIARTL", "fno": "true",
			"funda": "true", "sector": "Communication", "industry": "Telecom Services",
			"scId": "178", "ecId": "137", "ccId": "in"
		},
		{
			"id": "ICICIBANK",
			"label": "ICICIBANK - ICICI Bank Ltd. - BANKS - INDIA",
			"name": "ICICI Bank Ltd.", "code": "ICICIBANK", "fno": "true",
			"funda": "true", "sector": "Financial", "industry": "Banking",
			"scId": "121", "ecId": "94", "ccId": "in"
		}
	]


	let SCR_DEF_DATA = [
		{
			"id": "https://www.tsrbt1.com/rt/Screener/Technical/SMAScreener/SMABullishCrossover/50SMACrossAbv200",
			uri: "Screener/Technical/SMAScreener/SMABullishCrossover/50SMACrossAbv200",
			"label": "50 SMA Cross Above 200"
		},
		{
			"id": "https://www.tsrbt1.com/rt//Screener/Technical/OverboughtSold/RSISmooth/RSISmoothOSForMoreThan3Days",
			uri: "Screener/Technical/OverboughtSold/RSISmooth/RSISmoothOSForMoreThan3Days",
			"label": "RSI Oversold For More Than 3 Days"
		},
		{
			"id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/Bullish2Day/BullishEngulfing",
			uri: "Screener/Candlestick/BullishScreener/Bullish2Day/BullishEngulfing",
			"label": "Bullish Engulfing"
		},
		{
			"id": "https://www.tsrbt1.com/rt//Screener/ChartPatterns/PopularChartPatterns/BullishPatterns/DoubleBottomPotential",
			uri: "Screener/ChartPatterns/PopularChartPatterns/BullishPatterns/DoubleBottomPotential",
			"label": "Double Bottom (Potential)"
		},
		{
			"id": "https://www.tsrbt1.com/rt//Screener/ExpertScreener/PriceActionBased/Breakout",
			uri: "Screener/ExpertScreener/PriceActionBased/Breakout",
			"label": "Breakout Screener"
		},
		{
			"id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/PriceActionScreeners/DemandZoneScreeners",
			uri: "Screener/ComboScreener/PriceActionScreeners/DemandZoneScreeners",
			"label": "Demand  Zone Screeners"
		}

	]


	let EQ_SEARCH = { id: "equity", label: "Stock",  inputPlaceholder: "Search a Stock",  subCat: EQUITY_SUB_CAT ,  defData : EQ_DEF_DATA  };

	let SCR_SEARCH = { id: "screener", label: "Screener", inputPlaceholder: "Search a Screener", defData : SCR_DEF_DATA , subCat: [] };

	let CH_SEARCH = { id: "chart", label: "Chart", inputPlaceholder: "Chart", defData : EQ_DEF_DATA , subCat: [] , subCat: CHART_SUB_CAT };


	let EQ_CHART_SEARCH = { id: "eqCh", label: "Stock In Chart",  inputPlaceholder: "Change Equity in Chart",
	 	subCat: [], defData : EQ_DEF_DATA  , jsFnc :true   };

	let CHART_INDI_SEARCH = { id: "indCh", label: "Tech Indicator", 
				inputPlaceholder: "Add Indicator to Chart", subCat: [] , jsFnc :true };

	let CHART_COMP_EQ_SEARCH = { id: "compEqCh", label: "Compare", inputPlaceholder: "Compare Another Equity in Chart", 
		subCat: COMP_CH_SUB_CAT , defData : EQ_DEF_DATA , jsFnc :true };

	let CS_FILTER = { id: "addFilter", label: "Add a Filter",  inputPlaceholder: "Add another Filter", 
		subCat: [] , jsFnc :true };



	// var searchMenu = [
	//     { id: "charts", label: "Charts", inputPlaceholder: "Search a Chart", subCat: CHART_SUB_CATEGORY, catData: chartData },
	//     { id: "equity", label: "Equity", default: true, inputPlaceholder: "Search a Stock", subCat: EQUITY_SUB_CAT, catData: equityData },
	//     { id: "screeners", label: "Screeners", inputPlaceholder: "Search a Screener", subCat: SCREENER_SUB_CATEGORY, catData: screenerData },
	// ];





	function initSearchMenu(option) {

		searchMenu = [];


		let context = getContext();

		let defaultSel = null;


		// Always Search EQ and Screener as First to keep 
		searchMenu.push(jsu.cloneObj(EQ_SEARCH));
		searchMenu.push(jsu.cloneObj(SCR_SEARCH));


		if (context === 'Chart') {
			searchMenu.push(jsu.cloneObj(EQ_CHART_SEARCH));
			searchMenu.push(jsu.cloneObj(CHART_INDI_SEARCH));
			searchMenu.push(CHART_COMP_EQ_SEARCH);
			defaultSel = 'indCh';
		} else if (context === 'ScrFilter') {
			searchMenu.push(jsu.cloneObj(CS_FILTER));
			defaultSel = 'addFilter';

		} else {

			searchMenu.push(jsu.cloneObj(CH_SEARCH));
			var defPref = localStorage.getItem('SearchPref');

			if (defPref == 'screener') {
				defaultSel = 'screener';
			} else if (defPref == 'equity') {
				defaultSel = 'equity';
			} else {   // Default
				defaultSel = 'equity';
			}
		}

		if (jsu.isNotNull(option)) {
			defaultSel = option;
		}

		let defObj = jsu.getObjFrmArr(searchMenu, defaultSel);

		// for(let i=0;i< searchMenu.length;i++){
		// 	searchMenu[i].default = false;
		// }


		defObj.default = true;

		// thisSearchMenu = searchMenu

		return searchMenu;
	}

	function getSearchMenu() {
		return searchMenu;
	}



	function getContext() {

		let href = window.location.href;

		if ((href.indexOf('/rt/InteractiveCharts') != -1)) {  // To work AIO
			return 'Chart';
		}

		// chartDetails.popup
		if (typeof chartDetails !== 'undefined' && mintHtmlUtil.divExist('chartPanel') && chartDetails.popup) {
			return 'Chart';
		}


		if ((href.indexOf('/rt/CustomStockScreener') != -1)) { // To work AIO
			return 'ScrFilter';
		}

	}



	function getSearchBoxHeaderHtml(option, tsrSearchBoxId, searchMenu) {

		let html = `<div id="${tsrSearchBoxId + "Header"}" class="d-flex justify-content-between">`

		html += getRadioMenuHtml(searchMenu);

		html += `<button class="btn-close" style="margin: 5px;" tabindex="-1 " onclick ="miIs.cd('${tsrSearchBoxId}')"></button>`; // Close button

		html += `</div>`;

		return html;
	}


	function getRadioMenuHtml(data) {
		// let radioBtnIdPrefix = "mishRadioBtn";

		let html = `<div class="${radioBtnIdPrefix + "Menu"}">`;

		for (let i = 0; i < data.length; i++) {

			html += `<div id="${radioBtnIdPrefix + i}" class="${radioBtnIdPrefix}" tabindex="0" data-basket="${data[i].id}"`;
			html += data[i].default ? "checked" : "";
			html += ` onclick="${thisObject}.rbh(event)" onkeydown="${thisObject}.rbh(event)">`;

			html += `       <div class="${radioBtnIdPrefix + "Circle"}" >`;
			if (data[i].default) {
				html += `       <div class="${radioBtnIdPrefix + "InnerCircle"}" >`;
				html += `       </div>`
			}
			html += `       </div>`;
			html += `       <div class="${radioBtnIdPrefix + "Label"}">`;
			html += data[i].label;
			html += `       </div>`;
			html += `</div>`;
		}

		html += "</div>";
		return html;
	}


	function radioBtnHandler(e) {

		let radio = e.currentTarget;

		if (radio.hasAttribute("data-basket")) {
			let searchCat = radio.getAttribute("data-basket");

			if (e.type === "click") {
				e.stopPropagation(); // prevents search box dialog from closing 

				handleRadioEvent(searchMenu, radio)

			}
			else if (e.type === "keydown") {
				if (e.key === "Enter") {
					handleRadioEvent(searchMenu, radio)
					miIs.ssb(searchCat);
				}
				else if (e.key === "ArrowLeft") {
					if (e.target.previousSibling) {
						e.target.previousSibling.focus();
					}
					e.stopPropagation(); // prevents search box dialog from closing 

				}
				else if (e.key === "ArrowRight") {
					if (e.target.nextSibling) {
						e.target.nextSibling.focus();
					}
					e.stopPropagation(); // prevents search box dialog from closing 
				}
				else if (e.key === "ArrowDown") {

					if (e.target.classList.contains(radioBtnIdPrefix)) {
						let input = document.getElementById(inputTextBoxId);
						input.focus();
					}
					e.stopPropagation(); // prevents search box dialog from closing 
				}
				else if (jsu.isAlphaNum(e.key)) {

				}
				else {
					e.stopPropagation(); // prevents search box dialog from closing 

				}

			}
		}
	}
	function handleRadioEvent(searchMenu, radio) {
		let searchCat = null;
		for (let i = 0; i < searchMenu.length; i++) {
			if (searchMenu[i].id == radio.getAttribute("data-basket")) {
				searchMenu[i].default = true;
				searchCat = searchMenu[i].id;
			} else {
				searchMenu[i].default = false;
			}
		}
		miIs.ssb(searchCat);
	}

	function getSearchBoxBodyHtml(searchCat, inputTextBoxId, tsrSearchBoxId) {

		let html = ``;

		html += `<hr style="margin: 1rem;">`;

		html += `<div class="d-flex">`;

		html += `   <input id="${inputTextBoxId}" type="text" class="form-control ui-autocomplete-input mx-2" placeholder="${searchCat.inputPlaceholder}" autocomplete="off" autofocus tabindex="0">`;

		html += `   <div id="${tsrSearchBoxId + "SelectWrapper"}" class="d-none d-md-flex"></div>`;
		html += `</div>`;

		html += `<div class="mt-3">
	                <ul id="${tsrSearchBoxId + "List"}" class="${tsrSearchBoxId + "List"}"></ul>
	            </div> `;

		return html;
	}


	function addOptionsToSelect(searchCat, inputTextBoxId, tsrSearchBoxId) {

		let input = document.getElementById(inputTextBoxId);
		input.value = "";

		let container = document.getElementById(tsrSearchBoxId + "SelectWrapper");

		let select = document.createElement("select");
		select.id = tsrSearchBoxId + "Select";
		select.onchange = function () {
			input.focus();
			input.value = "";
			miIs.fs(input.value);
		};

		select.classList.add("form-select");
		select.setAttribute("tabindex", "0");

		let data = [];

		if (searchCat.subCat) {
			data = searchCat.subCat;
		}

		if (data != undefined && data != null && data.length != 0) {
			container.style.width = "40%";

			for (let i = 0; i < data.length; i++) {
				let option = document.createElement("option");
				option.value = data[i].id;
				option.text = data[i].label;

				select.appendChild(option);
			}

			container.appendChild(select);
		}


		miIs.fs(input.value);
	}

	function paintSearchBox(searchBoxHtml, inputTextBoxId, tsrSearchBoxId) {

		let html = `
	            <dialog id="${tsrSearchBoxId}" class="border rounded p-0 ${tsrSearchBoxId}" 
	    		onclick="miIs.sbc(event)" 
	    		onkeydown="miIs.kpsb(event, '${inputTextBoxId}', '${tsrSearchBoxId}')"
	    		onmouseover="miIsh.epe(this)" 
	    		ontouchstart="miIsh.epe(this)">
			`;
		html += `   <div id="${tsrSearchBoxId + "content"}" class="p-3" style="overflowY: hidden;">`;



		html += searchBoxHtml;
		html += `   </div>`;
		html += `</dialog>`;

		let searchBoxWrapper = document.getElementById(tsrSearchBoxId + "Wrapper");
		searchBoxWrapper.innerHTML = html;

		let searchBox = document.getElementById(tsrSearchBoxId);
		searchBox.showModal();
	}


	function enablePointerEvents(dialog) {

		// return;

		// dialog.style.pointerEvents = "auto";
		let liElements = dialog.querySelectorAll("li");

		for (let i = 0; i < liElements.length; i++) {
			liElements[i].style.pointerEvents = "auto";
		}
	}


	function addJSFunction( menucat, element, li, param2, param3){

		// let menucat =searchMenuData.id;
        // let paramId= element.id;
        

		// Add indi to chart
        if( jsu.containsString( ['indCh'  ,'eqCh' ,'compEqCh']  , menucat) ){
   	        li.onclick = function (e) {
		         handleJs(menucat, element, param2, param3)
		         miIs.cd();
	        }
	        li.onkeydown = function (e) {
	        	if (e.key == "Enter") {
	               // miChIs.ua(element.catParam,   element.id)
	        		handleJs(menucat, element, param2, param3)
	                miIs.cd();
	            }
	       }
        }


	}

	function handleJs(menucat, element, param2, param3){

		if(  menucat === 'indCh'  ){
			miChIs.ua(element.catParam,   element.id, element)
		}else if(  menucat === 'eqCh'  ){
			myTsrChartInit.sc(element);
		}else if(  menucat === 'compEqCh'  ){
			let layout = jsu.isNull( param2) ? LO_INLINE : param2  
			myTsrChartInit.asc(element, layout, true)
		}
	}




	function getList(searchMenuData, query) {

		let searchUrl = jsu.searchUrl();//+ '?eqSubCat='+eqSubCat;

		// searchUrl + '?eqSubCat='+eqSubCat 

		var pd = { eqSubCat: searchMenuData.id, term: query, trimJson: 'trimjson' }


		var rc = new RC(searchUrl, null, pd, 'chartLoading', 'chartFeedBack', thisObject, 'uar', 'init');
		rc.searchMenuData = searchMenuData;

		myTsrUtils.rc(rc);

		// ( url, up,pd, lDv,erDv,obj, fnc, id){
	}

	function userActionResponse(data, id, rc) {
		miIs.psc(rc.searchMenuData, data);

	}



	return {

		gsm: getSearchMenu,
		ism: initSearchMenu,
		sbh: getSearchBoxHeaderHtml,
		sbbh: getSearchBoxBodyHtml,
		psb: paintSearchBox,
		ots: addOptionsToSelect,

		epe: enablePointerEvents,

		rbh: radioBtnHandler,

		ajs: addJSFunction,

		ls: getList,

		uar: userActionResponse


	}


})(); // module createFormElem      
