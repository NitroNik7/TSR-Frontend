
var PatternEye = (function () {   // mytsr home

	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;


	var classiSet = false;


	function preInit() {


		if (mintJsUtil.isNull(mtgv.portlet)) {
			mtgv.portlet = {};
		}

		mtgv.portlet.current = 'PatternEye'
		mtgv.portlet.code = 'PatternEye';
		mtgv.portlet.curTab = 0;
		mtgv.portlet.obj = 'PatternEye';


		if (mintJsUtil.isNull(mtgv.portlet.PatternEye)) {
			mtgv.portlet.PatternEye = {
				configName: 'default', reqs: [], topTab: [], type: 'PatternEye', config: null, divNo: 0,
				runLoop: true, pageScope: null
			};
		}
	}

	function init() {

		preInit();

		var pd = { ccId: getMarket() };
		var remoteObject = new RC(PATTERN_EYE_PORTLETS_URL, null, pd, 'pfLoading', 'pfFeeback', 'PatternEye', 'homeInit', 'init');
		jsu.rc(remoteObject);

	}


	function homeInit(data, identifier) {

		htmlU.divHide('tevLoadingDiv');

		if (jsu.isNotNull(data)) {
			// mtgv.homeVars['config'] = data;
			if (identifier == 'init') {

				if (jsu.isNull(data.TABS)) {  // First Timer or Not yet Set
					data = getUserDefCfg();
				}
				mtgv.portlet.PatternEye.config = data;

				mtgv.portlet.PatternEye.defConfig = defaultConfig();


				var availPortlet = portu.gap('balance', mtgv.portlet.PatternEye.config, mtgv.portlet.PatternEye.defConfig);

				mtgv.portlet.PatternEye.availPortlet = availPortlet;

				createHomePage(data, true);

				portu.setClassi('init', null);

				// if(jsu.isNull(data.TABS) || data.TABS.length ==0 ){
				// 	//creating default Tab
				// 	portu.gap('NoCustYet', mtgv.portlet.Home.config , data );
				// }	
				// At least one tab will always be there



			}
		}
	}




	function createHomePage(data, homeInit) {

		portu.init();
		var code = mtgv.portlet.code;
		// if(data.TAB_NO==0){
		// 	portCfg.previewDef( code);
		// }else{
		// 	portCfg.previewPage('init',  code);	
		// }
		portCfg.printPage();


		// if(!homeInit) {
		// 	loadPortlets();
		// }
		mtgv.portlet.PatternEye.rptLocalTime = new Date();

	}


	function loadPortlets() {

		var portlets = portu.getTabPortlets();

		// var classi = 'idx500';

		for (var i = 0; i < portlets.length; i++) {
			var portlet = portlets[i];

			// console.log( portlet);
			var portletCode = portlet.CODE;

			if (jsu.isNull(portlet.pid)) { // hack as Pid got added later ...
				var def = jsu.getObjFrmArr(PORTLET_CAT, portlet.reportName);
				portlet.pid = def.pid;
			}


			var html = portu.create(portlet.Label, portletCode, true, mtgv.portlet.PatternEye.type, portlet);
			$('#TabData').append(html);
			portu.tlBar(portletCode, null, true);

		}

		loadPortletData(false);



	}

	function autoRfresh() {


		loadPortletData(true)
		console.log('Autorefresh Called : Pattern Eye');

		mtgv.portlet.PatternEye.rptLocalTime = new Date();

	}




	function loadPortletData(auto, dClassiSet) {


		if (dClassiSet) {
			classiSet = true;
		}

		if (!classiSet) {
			setTimeout(loadPortletData, 40, auto);
			return;
		}



		var portlets = portu.getTabPortlets();

		// var classi = 'idx500';

		var config = mtgv.portlet.PatternEye.config;

		var classi = config.classi;
		var stkBsktCat = config.stkBsktCat;

		for (var i = 0; i < portlets.length; i++) {
			var portlet = portlets[i];


			if (auto && !portlet.autoRefresh) {
				continue;
			}


			var json = { classi: classi, stkBsktCat: stkBsktCat, freq: portlet.tick, reportName: portlet.reportName, actionType: 'PatternEye' }

			if (portlet.term == 'all') {
				var addiParams = portlet.addiInfo.split(":");
				json.reportName = addiParams[2];
				json.term = portlet.term;

			}


			var remoteObject = new RC(BIRDS_EYE_VIEW, null, json, 'MasEqLdDiv', 'MasEqFbDiv', 'portp', 'pgp', portlet.reportName);
			remoteObject.portlet = portlet;

			// remoteObject.classi = classi;
			// remoteObject.stkBsktCat = stkBsktCat;

			jsu.rc(remoteObject);

		}

	}













	function getUserDefCfg() {


		var json = { Name: "default", TABS: [], CODE_CAT: [] };


		addUserDefTab(json, FREQ_DAILY)
		if (mtgv.mtpp.rt) {
			addUserDefTab(json, FREQ_INTRA_DAILY);
		}





		if (jsu.arrayContainsId(mtgv.mtpp.FREQ_SCR_MAP, FREQ_MM15)) {
			addUserDefTab(json, FREQ_MM15);
		}


		addUserDefTab(json, FREQ_WK);

		json.TAB_NO = json.TABS.length;


		return json;

	}

	function addUserDefTab(json, freq) {


		var freqElem = jsu.getObjFrmArr(mtgv.mtpp.FREQ_SCR_MAP, freq);

		var cat = freqElem.label;

		var tab = { TabName: 'Tick : ' + freqElem.label };

		var portlets = addDefForTick(freqElem, json, cat, false);
		tab.PREFS = portlets;

		json.CODE_CAT.push(cat);

		json.TABS.push(tab);

	}



	function defaultConfig() {

		var json = { Name: 'default', TAB_NO: 0, CODE_CAT: [], AVAILABLE_PORTLETS: [] };

		for (var i = 0; i < mtgv.mtpp.FREQ_SCR_MAP.length; i++) {

			var freqElem = mtgv.mtpp.FREQ_SCR_MAP[i];
			var cat = freqElem.label;

			var portlets = addDefForTick(freqElem, json, cat, true)

			// json.AVAILABLE_PORTLETS.push(portlets)
			json.AVAILABLE_PORTLETS = json.AVAILABLE_PORTLETS.concat(portlets)

			json.CODE_CAT.push(cat);
		}
		return json;

	}

	function addDefForTick(freqElem, json, cat, addAll) {

		var cat = freqElem.label;

		var autoRefresh = true;

		if (jsu.arrayContainsId(FREQ_EOD_MAP, freqElem.id)) {
			autoRefresh = false;
		}

		var portlets = []

		for (var i = 0; i < PORTLET_CAT.length; i++) {
			var elem = PORTLET_CAT[i];

			if (!addAll && !elem.def) {
				continue;
			}


			// { 
			// 		Label: " Bullish Engulfing", id: "bullishEngulfing", eyeType: 'Pattern', 
			// 		addiInfo: 'chartPattern:Candlestick:Bullish', def: true, 
			// 		pid: '/Candlestick/BullishScreener/Bullish2Day/BullishEngulfing' 
			// },

			var portLet = {

				"CODE": elem.id + freqElem.id,
				reportName: elem.id,
				colLabel1: elem.colLabel1,
				colLabel2: elem.colLabel2,

				"CODE_CAT": cat,
				"id": elem.id + freqElem.id,
				"Label": elem.Label + ' - ' + freqElem.label,
				"hidden": "false",
				"common": "true",
				"url": "null",
				"size": "4",
				"autoRefresh": autoRefresh,
				tick: freqElem.id,
				"ticks": "false",
				eyeType: elem.eyeType,
				"pid": elem.pid
			};

			var addiParams = elem.addiInfo.split(":");

			if (addiParams.length == 2) { // chart Patterns
				portLet.addiInfo = elem.addiInfo + ":" + elem.id + ":" + "all"
				portLet.term = 'all';
			} else {
				portLet.addiInfo = elem.addiInfo + ":" + elem.id;  // candle / HA / NR
			}

			portlets.push(portLet);


		}

		return portlets;

	}

	// function addObos(list, portlets){

	// 	var codes = list.code;


	// 		for(var i=0;i< codes.length ;i++){

	// 			var code = list[i];

	// 			if(!addAll && !obj.def){
	// 				continue;
	// 			}

	// 			var elem = 


	// 			addPortlet(elem, portlets);





	// 		}



	// }









	function userActionResponse(response, identifier, remoteObject) {

		if (identifier == 'saveHome') {
			// mtgv.portlet.PatternEye.config =  response;
			// No Need to Save as its Dynamic...

		} else if (identifier == 'eqDet') {
			eqo.ped(response, identifier, remoteObject, 'PatternEyeEqContentDiv');
		}

	}


	function savePref() {

		var cfg = mtgv.portlet.PatternEye.config

		cfg.AVAILABLE_PORTLETS = null;

		var params = JSON.stringify(cfg);

		var pd = { params: params, action: 'save' };


		var remoteObject = new RC(CUST_EQ_PORTLETS_URL, null, pd, 'pfLoading', 'FEEDBACK', 'PatternEye', 'uar', 'saveHome');
		mintJsUtil.rc(remoteObject);
	}


	function applyDef() {

		var data = getUserDefCfg()

		homeInit(data, 'init');

		portCfg.addMsg('Home', 'Default Config applied');

		var pd = { action: 'applyDef' };
		var remoteObject = new RC(PATTERN_EYE_PORTLETS_URL, null, pd, 'pfLoading', 'FEEDBACK', 'PatternEye', 'uar', 'saveHome');
		mintJsUtil.rc(remoteObject);
	}


	/*
	
			var OBOS_DEF= {
					code : [
						{id: 'rsi'  : label "RSI" } ,
						{ id :  'rsiSmooth', label : 'RSI Smooth ' , def : true},
						{ id :  'williamsR', label : 'William %R ' , def : true},
						{ id :  'cci', label : 'CCI ' },
						{ id :  'mfi', label : 'MFI ' },
						{ id :  'slowSto', label : 'Slow Stochastic ' },
						{ id :  'fastSto', label : 'Fast Stochatic ' },
	
				],
				rptType : [ {  id: 'Overbought'  : label "Over Bought by INDI_TYPE" }  ,  
									{  id: 'Falling'  : label "Falling INDI_TYPE" , def : true}   
									{  id: 'BlwCentralLine'  : label "INDI_TYPE Cross Below center line" }   
									{  id: 'OverboughtWait'  : label "INDI_TYPE OB for > 3 Period" }   
									{  id: 'Oversold'  : label "Over Sold by INDI_TYPE"  }   
									{  id: 'Rising'  : label "Rising INDI_TYPE"  , def : true}   
									{  id: 'AboveCentralLine'  : label "INDI_TYPE Cross Abv Central Line" }   
									{  id: 'OversoldWait'  : label "INDI_TYPE OS for > 3 Period" }   
									// {  id: ''  : label "" }   
	
				 ],
	
			};
	
	*/




	var PORTLET_CAT = [
		{ Label: " Bullish Engulfing", id: "bullishEngulfing", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:Bullish', def: true, pid: '/Candlestick/BullishScreener/Bullish2Day/BullishEngulfing' },
		{ Label: " Bullish Harami", id: "bullishharami", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:Bullish', def: true, pid: '/Candlestick/BullishScreener/Bullish2Day/BullishHarami' },
		{ Label: "Bullish Piercing", id: "bullishPiercing", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:Bullish', pid: '/Candlestick/BullishScreener/Bullish2Day/BullishPiercing' },
		{ Label: "Three White Soldiers", id: "threeWhiteSoldiers", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:Bullish', pid: '/Candlestick/BullishScreener/Bullish3Day/ThreeWhiteSoldiers' },
		{ Label: "Three Outside Up", id: "threeOutsideUp", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:Bullish', pid: '/Candlestick/BullishScreener/Bullish3Day/ThreeOutsideUp' },
		{ Label: "Three Inside Up", id: "threeInsideUp", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:Bullish', pid: '/Candlestick/BullishScreener/Bullish3Day/ThreeInsideUp' },
		{ Label: "Morning Star", id: "morningStar", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:Bullish', pid: '/Candlestick/BullishScreener/Bullish3Day/MorningStar' },
		{ Label: "Abandoned Baby Bullish", id: "abandonedBabyBullish", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:Bullish', pid: '/Candlestick/BullishScreener/Bullish3Day/BullishAbandonedBaby' },
		{ Label: "Bullish GapUp", id: "bullishGapUp", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:Bullish', pid: 'Candlestick/BullishScreener/Bullish2Day/BullishGapUp' },
		{ Label: "Bearish Engulfing", id: "bearishEngulfing", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:Bearish', pid: '/Candlestick/BearishScreener/Bearish2Day/BearishEngulfing' },
		{ Label: "Bearish Harami", id: "bearsishHarami", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:Bearish', pid: '/Candlestick/BearishScreener/Bearish2Day/BearishHarami' },
		{ Label: "Dark Cloud cover", id: "darkCloudCover", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:Bearish', pid: '/Candlestick/BearishScreener/Bearish2Day/DarkCloudCover' },
		{ Label: "Three Dark Crows", id: "threeBlackCrows", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:Bearish', pid: '/Candlestick/BearishScreener/Bearish3Day/ThreeBlackCrows' },
		{ Label: "Three Outside Down", id: "threeOutsideDown", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:Bearish', pid: '/Candlestick/BearishScreener/Bearish3Day/ThreeOutsideDown' },
		{ Label: "Three Inside Down", id: "threeInsideDown", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:Bearish', pid: '/Candlestick/BearishScreener/Bearish3Day/ThreeInsideDown' },
		{ Label: "Evening Doji Star", id: "eveningDojiStar", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:Bearish', pid: '/Candlestick/BearishScreener/Bearish3Day/EveningDojiStar' },
		{ Label: "Evening Star", id: "eveningStar", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:Bearish', pid: '/Candlestick/BearishScreener/Bearish3Day/EveningStar' },
		{ Label: "Abandoned Baby Bearish", id: "abandonedBabyBearish", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:Bearish', pid: '/Candlestick/BearishScreener/Bearish3Day/BearishAbandonedBaby' },
		{ Label: "Bearish GapDown", id: "bearishGapDown", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:Bearish', pid: '/Candlestick/BearishScreener/Bearish2Day/BearishGapDown' },
		{ Label: "Doji", id: "doji", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:OneDayCandle', pid: '/Candlestick/Consolidation/Consolidation/Doji' },
		{ Label: "Morning Doji Star", id: "morningDojiStar", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:OneDayCandle', pid: '/Candlestick/BullishScreener/Bullish3Day/MorningDojiStar' },
		{ Label: "Hammer", id: "hammer", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:OneDayCandle', pid: '/Candlestick/BullishScreener/Bullish1Day/Hammer' },
		{ Label: "Hammer At Downtrend", id: "hammerAtDownTrend", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:OneDayCandle', pid: '/Candlestick/BullishScreener/Bullish1Day/HammerAtDowntrend' },
		{ Label: "Hanging Man at Uptrend", id: "handingManAtUptrend", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:OneDayCandle', pid: '/Candlestick/BearishScreener/Bearish1Day/HangingManAtUptrend' },
		{ Label: "Inverted Hammer", id: "invertedHammer", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:OneDayCandle', pid: '/Candlestick/BullishScreener/Bullish1Day/InvertedHammer' },
		{ Label: "Inverted Hammer at Downtrend", id: "invertedHammerAtDowntrend", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:OneDayCandle', pid: '/Candlestick/BullishScreener/Bullish1Day/InvertedHammerAtDowntrend' },
		{ Label: "Spinning Top", id: "spinningTop", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:OneDayCandle', pid: '/Candlestick/Consolidation/Consolidation/SpinningTop' },
		{ Label: "Bullish MaruBozu", id: "bullishMarubozu", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:OneDayCandle', pid: '/Candlestick/BullishScreener/Bullish1Day/BullishMarubozu' },
		{ Label: "Bearish MaruBozu", id: "bearishMarubozu", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:OneDayCandle', pid: '/Candlestick/BearishScreener/Bearish1Day/BearishMarubozu' },
		{ Label: "Bearish DragonFly Doji", id: "bearishDragonFlyDoji", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:OneDayCandle', pid: '/Candlestick/BullishScreener/Bullish1Day/DragonflyDoji' },
		{ Label: "Bullish GraveStone Doji", id: "bullishGravestoneDoji", eyeType: 'Pattern', addiInfo: 'chartPattern:Candlestick:OneDayCandle', pid: '/Candlestick/BearishScreener/Bearish1Day/GravestoneDoji' },
		{ Label: "HA Bullish Initiation", id: "haBulInit", eyeType: 'Pattern', addiInfo: 'chartPattern:ha:haBul', def: true, pid: '/Candlestick/BearishScreener/BearishHeikinAshi/BearishInitiation' },
		{ Label: "HA Bullish Continuation", id: "haBulCont", eyeType: 'Pattern', addiInfo: 'chartPattern:ha:haBul', pid: '/Candlestick/BearishScreener/BearishHeikinAshi/BearishContinuation' },
		{ Label: "HA Bullish With High Vol", id: "haBulHighVol", eyeType: 'Pattern', addiInfo: 'chartPattern:ha:haBul', pid: '/Candlestick/BearishScreener/BearishHeikinAshi/BearishWithHighVolume' },
		{ Label: "HA Bullish Tick From Red To Green", id: "haBullRedToGreen", eyeType: 'Pattern', addiInfo: 'chartPattern:ha:haBul', pid: '/Candlestick/BearishScreener/BearishHeikinAshi/BearishTickFromGreenToRed' },
		{ Label: "HA Bearish Initiation", id: "haBearInit", eyeType: 'Pattern', addiInfo: 'chartPattern:ha:haBear', pid: '/Candlestick/BearishScreener/BearishHeikinAshi/BearishInitiation' },
		{ Label: "HA Bearish Continuation", id: "haBearCont", eyeType: 'Pattern', addiInfo: 'chartPattern:ha:haBear', pid: '/Candlestick/BearishScreener/BearishHeikinAshi/BearishContinuation' },
		{ Label: "HA Bearish With High Vol", id: "haBearHighVol", eyeType: 'Pattern', addiInfo: 'chartPattern:ha:haBear', pid: '/Candlestick/BearishScreener/BearishHeikinAshi/BearishWithHighVolume' },
		{ Label: "HA Bullish Tick From Green to red", id: "haBearGreenToRed", eyeType: 'Pattern', addiInfo: 'chartPattern:ha:haBear', pid: '/Candlestick/BearishScreener/BearishHeikinAshi/BearishTickFromGreenToRed' },
		{ Label: "HA Doji", id: "haDoji", eyeType: 'Pattern', addiInfo: 'chartPattern:ha:haCons', pid: '/Candlestick/BearishScreener/BearishHeikinAshi/BearishInitiation' },
		{ Label: "HA Spinning Top", id: "haSpinTop", eyeType: 'Pattern', addiInfo: 'chartPattern:ha:haCons', pid: '/Candlestick/BearishScreener/BearishHeikinAshi/BearishContinuation' },
		{ Label: "HA Doji (Previous Tick)", id: "haDojiPrev", eyeType: 'Pattern', addiInfo: 'chartPattern:ha:haCons', pid: '/Candlestick/BearishScreener/BearishHeikinAshi/BearishWithHighVolume' },
		{ Label: "HA Spinning Top (Previous Tick)", id: "haSpinTopPrev", eyeType: 'Pattern', addiInfo: 'chartPattern:ha:haCons', pid: '/Candlestick/BearishScreener/BearishHeikinAshi/BearishTickFromGreenToRed' },
		{ Label: "Double Top ", id: "doubleTop", eyeType: 'Pattern', addiInfo: 'chartPattern:ChartPatterns', def: true, pid: '/ChartPatterns/PopularChartPatterns/BearishPatterns/DoubleTop' },
		{ Label: "Double Bottom ", id: "doubleBottom", eyeType: 'Pattern', addiInfo: 'chartPattern:ChartPatterns', pid: '/ChartPatterns/PopularChartPatterns/BearishPatterns/DoubleBottom' },
		{ Label: "Double Top (Potential)", id: "doubleTopPot", eyeType: 'Pattern', addiInfo: 'chartPattern:ChartPatterns', pid: '/ChartPatterns/PopularChartPatterns/BearishPatterns/DoubleTopPotential' },
		{ Label: "Double Bottom (Potential)", id: "doubleBottomPot", eyeType: 'Pattern', addiInfo: 'chartPattern:ChartPatterns', pid: '/ChartPatterns/PopularChartPatterns/BearishPatterns/DoubleBottomPotential' },
		{ Label: "Triple Top ", id: "tripleTop", eyeType: 'Pattern', addiInfo: 'chartPattern:ChartPatterns', pid: '/ChartPatterns/PopularChartPatterns/BearishPatterns/TripleTop' },
		{ Label: "Triple Bottom ", id: "tripleBottom", eyeType: 'Pattern', addiInfo: 'chartPattern:ChartPatterns', pid: '/ChartPatterns/PopularChartPatterns/BearishPatterns/TripleBottom' },
		{ Label: "Triple Top (Potential)", id: "tripleTopPot", eyeType: 'Pattern', addiInfo: 'chartPattern:ChartPatterns', pid: '/ChartPatterns/PopularChartPatterns/BearishPatterns/TripleTopPotential' },
		{ Label: "Triple Bottom (Potential)", id: "tripleBottomPot", eyeType: 'Pattern', addiInfo: 'chartPattern:ChartPatterns', pid: '/ChartPatterns/PopularChartPatterns/BearishPatterns/TripleBottomPotential' },
		{ Label: "Head & Shoulder ", id: "headAndShoulder", eyeType: 'Pattern', addiInfo: 'chartPattern:ChartPatterns', pid: '/ChartPatterns/PopularChartPatterns/BearishPatterns/HeadAndShoulder' },
		{ Label: "Reverse Head & Shoulder ", id: "revHeadAndShoulder", eyeType: 'Pattern', addiInfo: 'chartPattern:ChartPatterns', def: true, pid: '/ChartPatterns/PopularChartPatterns/BearishPatterns/ReverseHeadAndShoulder' },
		{ Label: "Head & Shoulder (Potential)", id: "headAndShoulderPot", eyeType: 'Pattern', addiInfo: 'chartPattern:ChartPatterns', pid: '/ChartPatterns/PopularChartPatterns/BearishPatterns/HeadAndShoulderPotential' },
		{ Label: "Reverse Head & Shoulder  (Potential)", id: "revHeadAndShoulderPot", eyeType: 'Pattern', addiInfo: 'chartPattern:ChartPatterns', pid: '/ChartPatterns/PopularChartPatterns/BearishPatterns/ReverseHeadAndShoulderPotential' },
		{ Label: "Higher Highs & Higher Lows", id: "higherHighHigherLow", eyeType: 'Pattern', addiInfo: 'chartPattern:ChartPatterns', pid: '/ChartPatterns/PopularChartPatterns/BearishPatterns/LowerHighsAndLowerLows' },
		{ Label: "Higher Highs & Higher Lows", id: "higherHighHigherLow", eyeType: 'Pattern', addiInfo: 'chartPattern:ChartPatterns', pid: '/ChartPatterns/PopularChartPatterns/BearishPatterns/HigherHighsAndHigherLows' },
		{ Label: "Horizontal Trendline", id: "supTrendline", eyeType: 'Pattern', addiInfo: 'chartPattern:TrendLines', def: true, pid: '/ChartPatterns/Trendlines/HorizontalTrendlines/HorizontalSupportTrendline' },
		{ Label: "Rising Support Trendline", id: "supRisingTrendline", eyeType: 'Pattern', addiInfo: 'chartPattern:TrendLines', pid: '/ChartPatterns/Trendlines/RisingTrendlines/RisingSupportTrendline' },
		{ Label: "Falling Support Trendline", id: "supFallingTrendline", eyeType: 'Pattern', addiInfo: 'chartPattern:TrendLines', pid: '/ChartPatterns/Trendlines/FallingTrendlines/FallingSupportTrendline' },
		{ Label: "Support Trendline Breakdown", id: "supTrendlineBreakDown", eyeType: 'Pattern', addiInfo: 'chartPattern:TrendLines', pid: '/ChartPatterns/Trendlines/HorizontalTrendlines/SupportTrendlineBD' },
		{ Label: "Support Rising Trendline Breakdown", id: "supRisingTrendlineBreakDown", eyeType: 'Pattern', addiInfo: 'chartPattern:TrendLines', pid: '/ChartPatterns/Trendlines/RisingTrendlines/SupportRisingTrendlineBD' },
		{ Label: "Resistance Trendline", id: "resTrendline", eyeType: 'Pattern', addiInfo: 'chartPattern:TrendLines', def: true, pid: '/ChartPatterns/Trendlines/HorizontalTrendlines/HorizontalResistanceTrendline' },
		{ Label: "Resistance Rising Trendline", id: "resRisingTrendline", eyeType: 'Pattern', addiInfo: 'chartPattern:TrendLines', pid: '/ChartPatterns/Trendlines/RisingTrendlines/ResistanceRisingTrendline' },
		{ Label: "Resistance Falling Trendline", id: "resFallingTrendline", eyeType: 'Pattern', addiInfo: 'chartPattern:TrendLines', pid: '/ChartPatterns/Trendlines/FallingTrendlines/ResistanceFallingTrendline' },
		{ Label: "Resistance Trendline  Breakout", id: "resTrendlineBreakOut", eyeType: 'Pattern', addiInfo: 'chartPattern:TrendLines', pid: '/ChartPatterns/Trendlines/HorizontalTrendlines/ResistanceTrendlineBO' },
		{ Label: "Resistance Falling  Breakout", id: "resFallingTrendlineBreakOut", eyeType: 'Pattern', addiInfo: 'chartPattern:TrendLines', pid: '/ChartPatterns/Trendlines/FallingTrendlines/ResistanceFallingTrendlineBO' },
		{ Label: "Acsending Triangle", id: "ascTriangle", eyeType: 'Pattern', addiInfo: 'chartPattern:Triangle', def: true, pid: '/ChartPatterns/Triangle/AscendingTriangle/AscendingTriangle' },
		{ Label: "Acsending Triangle Breakout", id: "ascTriangleBreakout", eyeType: 'Pattern', addiInfo: 'chartPattern:Triangle', pid: '/ChartPatterns/Triangle/AscendingTriangle/AscendingTriangleBO' },
		{ Label: "Descending Triangle", id: "dscTriangle", eyeType: 'Pattern', addiInfo: 'chartPattern:Triangle', pid: '/ChartPatterns/Triangle/DescendingTriangle/DescendingTriangle' },
		{ Label: "Descending Triangle Breakdown", id: "dscTriangleBreakdown", eyeType: 'Pattern', addiInfo: 'chartPattern:Triangle', pid: '/ChartPatterns/Triangle/DescendingTriangle/DescendingTriangleBD' },
		{ Label: "Symmetric Triangle", id: "symTriangle", eyeType: 'Pattern', addiInfo: 'chartPattern:Triangle', pid: '/ChartPatterns/Triangle/SymmetricalTriangle/SymmetricTriangle' },
		{ Label: "Symmetric Triangle Breakout", id: "symTriangleBreakout", eyeType: 'Pattern', addiInfo: 'chartPattern:Triangle', pid: '/ChartPatterns/Triangle/SymmetricalTriangle/SymmetricTriangleBO' },
		{ Label: "Symmetric Triangle Breakdown", id: "symTriangleBreakdown", eyeType: 'Pattern', addiInfo: 'chartPattern:Triangle', pid: '/ChartPatterns/Triangle/SymmetricalTriangle/SymmetricTriangleBD' },
		{ Label: "Narrow Range(NR) 4", id: "nr4", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:nr', def: true, pid: '/ChartPatterns/NRWR/NarrowRange/NarrowRange4' },
		{ Label: "NR 4 Bullish BO", id: "nr4BullBO", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:nr', pid: '/ChartPatterns/NRWR/NarrowRange/NR4BullishBreakout' },
		{ Label: "NR 4 Bearish BO", id: "nr4BearBO", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:nr', pid: '/ChartPatterns/NRWR/NarrowRange/NR4BearishBreakdown' },
		{ Label: "NR 7", id: "nr7", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:nr', pid: '/ChartPatterns/NRWR/NarrowRange/NarrowRange7' },
		{ Label: "NR 7 Bullish BO", id: "nr7BullBO", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:nr', pid: '/ChartPatterns/NRWR/NarrowRange/NR7BullishBreakout' },
		{ Label: "NR 7 Bearish BO", id: "nr7BearBO", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:nr', pid: '/ChartPatterns/NRWR/NarrowRange/NR7BearishBreakdown' },
		{ Label: "NR 11", id: "nr11", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:nr', pid: '/ChartPatterns/NRWR/NarrowRange/NarrowRange11' },
		{ Label: "NR 11 Bullish BO", id: "nr11BullBO", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:nr', pid: '/ChartPatterns/NRWR/NarrowRange/NR11BullishBreakout' },
		{ Label: "NR 11 Bearish BO", id: "nr11BearBO", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:nr', pid: '/ChartPatterns/NRWR/NarrowRange/NR11BearishBreakdown' },
		{ Label: "NR 15", id: "nr15", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:nr', pid: '/ChartPatterns/NRWR/NarrowRange/NarrowRange15' },
		{ Label: "NR 15 Bullish BO", id: "nr15BullBO", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:nr', pid: '/ChartPatterns/NRWR/NarrowRange/NR15BullishBreakout' },
		{ Label: "NR 15 Bearish BO", id: "nr15BearBO", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:nr', pid: '/ChartPatterns/NRWR/NarrowRange/NR15BearishBreakdown' },
		{ Label: "Wide Range(WR) 7", id: "wr7", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:wr', def: true, pid: '/ChartPatterns/NRWR/WideRange/WideRange7' },
		{ Label: "WR 7 Bull Continuation", id: "wr7BullCont", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:wr', pid: '/ChartPatterns/NRWR/WideRange/WR7BullishContinuation' },
		{ Label: "WR 7 Bear Cont", id: "wr7BearCont", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:wr', pid: '/ChartPatterns/NRWR/WideRange/WR7BearishContinuation' },
		{ Label: "Wide Range(WR) 14", id: "wr14", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:wr', pid: '/ChartPatterns/NRWR/WideRange/WideRange14' },
		{ Label: "WR 14 Bull Cont", id: "wr14BullCont", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:wr', pid: '/ChartPatterns/NRWR/WideRange/WR14BullishContinuation' },
		{ Label: "WR 14 Bear Cont", id: "wr14BearCont", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:wr', pid: '/ChartPatterns/NRWR/WideRange/WR14BearishContinuation' },
		{ Label: "Wide Range(WR) 20", id: "wr20", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:wr', pid: '/ChartPatterns/NRWR/WideRange/WideRange20' },
		{ Label: "WR 20 Bull Cont", id: "wr20BullCont", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:wr', pid: '/ChartPatterns/NRWR/WideRange/WR20BullishContinuation' },
		{ Label: "WR 20 Bear Cont", id: "wr20BearCont", eyeType: 'Pattern', addiInfo: 'chartPattern:nrwr:wr', pid: '/ChartPatterns/NRWR/WideRange/WR20BearishContinuation' },
	];

	return {

		init: init,
		homeInit: homeInit,
		lp: loadPortlets,
		// sp : showPortlet,
		// sbc : stockBasketChg,
		applyDef: applyDef,

		ar: autoRfresh,


		lpd: loadPortletData,

		// setClassi : setClassi,




		// loadDefConfig : loadDefConfig, 
		// fc : frequencyChange,
		// shp : showHomePortlet,

		// ua : userAction,
		savePref: savePref,

		uar: userActionResponse


	}

})(); // module 