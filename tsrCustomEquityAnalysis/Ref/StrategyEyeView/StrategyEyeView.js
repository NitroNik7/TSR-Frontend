
var StrategyEye = (function () {   // mytsr home

	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;

	var thisAlias = 'StrategyEye';

	var SERVLET_URL = STRATEGY_EYE_PORTLETS_URL;

	// var classiSet = false;

	function preInit() {
		if (mintJsUtil.isNull(mtgv.portlet)) {
			mtgv.portlet = {};
		}

		mtgv.portlet.current = 'StrategyEye'
		mtgv.portlet.code = 'StrategyEye';
		mtgv.portlet.curTab = 0;
		mtgv.portlet.obj = 'StrategyEye';

		if (mintJsUtil.isNull(mtgv.portlet.StrategyEye)) {
			mtgv.portlet.StrategyEye = { configName: 'default', reqs: [], topTab: [], type: 'StrategyEye', config: null, divNo: 0, runLoop: true, pageScope: null };
		}


	}


	function init() {
		preInit();

		var pd = { ccId: getMarket() };
		var remoteObject = new RC(SERVLET_URL, null, pd, 'pfLoading', 'pfFeeback', thisAlias, 'homeInit', 'init');
		jsu.rc(remoteObject);

	}

	function homeInit(data, identifier) {

		htmlU.divHide('tevLoadingDiv');

		if (jsu.isNotNull(data)) {

			if (identifier == 'init') {
				mtgv.portlet.StrategyEye.config = data;
				if (jsu.isNull(data.TABS)) {  // First Timer or Not yet Set
					loadDefConfig('NoCustYet');
					return;
				}
				if (jsu.isNull(data.TABS) || data.TABS.length == 0) {
					//creating default Tab
					portu.gap('NoCustYet', mtgv.portlet.StrategyEye.config, data);
				}
				// At least one tab will always be there


				createHomePage(data, true);
				// portu.setClassi('init', null);
			}
		}
	}

	function createHomePage(data, homeInit) {

		// var portlets = data.AVAILABLE_PORTLETS;
		// portu.setClassi('init', null);

		portu.init();
		var code = mtgv.portlet.code;
		// if(data.TAB_NO==0){
		// 	portCfg.previewDef( code);
		// }else{
		// 	portCfg.previewPage('init',  code);	
		// }
		portCfg.printPage();


		if (!homeInit) {
			loadPortlets();
		}
	}


	function loadPortlets(defLoad) {


		var portlets = portu.getTabPortlets();

		if (portlets.length == 0) {

			var link = jsu.getMyTsrUrl() + '/MyTsr/#/CustomStockScreener';


			var msg = BR_2 +

				'<h3>You are Yet to Create a Strategy.</h3> ' + BR_2 + 'You can Create Strategy using <b>DIY (Do It Yourself) Screener</b> by Clicking ' +
				htmlU.createLink(link, "here");


			htmlU.addMsgToDiv('StrategyEyeContents', true, msg);


			return;
		}


		for (var i = 0; i < portlets.length; i++) {
			var portlet = portlets[i];


			if (mtgv.portlet.StrategyEye.runLoop) {
				var portletCode = portlet.CODE;

				// if(jsu.isNull(portlet.pid)){ // hack as Pid got added later ...
				// 		var def = jsu.getObjFrmArr(PORTLET_CAT , portlet.reportName);
				// 		portlet.pid = def.pid;
				// 	}

				// create portlet structure ....	
				var html = portu.create(portlet.Label, portletCode, true, mtgv.portlet.StrategyEye.type, portlet);
				$('#TabData').append(html);
				portu.tlBar(portletCode, null, true);

				// loadPortlet(portlet)


				if (!mtgv.portlet.StrategyEye.runLoop) return false;
			}
		}

		loadPortletData(false);


		mtgv.portlet.StrategyEye.rptLocalTime = new Date();
		// set report Gen time ...  for auto refresh	
	}


	function autoRfresh() {


		loadPortletData(true)
		console.log('Autorefresh Called : StrategyEye');

		mtgv.portlet.StrategyEye.rptLocalTime = new Date();

	}



	function loadPortletData(auto) {


		var portlets = portu.getTabPortlets();

		// var classi = 'idx500';

		var config = mtgv.portlet.StrategyEye.config;

		// var classi = config.classi;
		// var stkBsktCat = config.stkBsktCat;

		for (var i = 0; i < portlets.length; i++) {
			var portlet = portlets[i];


			// if(auto && ! portlet.autoRefresh){
			// 	continue;
			// }


			// var favUrl = portlet.url;

			// var vals = favUrl.split("/");

			// var custScrId = vals[2];

			var json = { reportName: portlet.CODE, actionType: 'StrategyEye', custScrId: portlet.CODE };

			var remoteObject = new RC(BIRDS_EYE_VIEW, null, json, 'MasEqLdDiv', 'MasEqFbDiv', 'portp', 'pp', portlet.CODE);
			remoteObject.portlet = portlet;

			// remoteObject.classi = classi;
			// remoteObject.stkBsktCat = stkBsktCat;

			jsu.rc(remoteObject);

		}

	}




	function loadPortlet(portlet) {

		var portletCode = portlet.CODE;


		// var availCatList = getAvailAnalCat();

		// if(!jsu.arrayContains(availCatList, portlet.CODE_CAT)){

		// 	htmlU.addMsgToDiv(portletCode +'Body', true, 'You are not entitled to this view');
		// 	return;

		// }

		var json = { classi: classi, stkBsktCat: stkBsktCat, freq: portlet.tick, reportName: portlet.reportName, actionType: 'StrategyEye' }

		var remoteObject = new RC(BIRDS_EYE_VIEW, null, json, 'MasEqLdDiv', 'MasEqFbDiv', 'portp', 'pp', portlet.reportName);
		remoteObject.portlet = portlet;


		jsu.rc(remoteObject);


	}


	function loadDefConfig(type) {

		var pd = { ccId: getMarket(), reqType: 'default' };
		var remoteObject = new RC(SERVLET_URL, null, pd, 'pfLoading', 'pfFeeback', thisAlias, 'uar', type);
		jsu.rc(remoteObject);


	}

	function savePref() {

		var cfg = mtgv.portlet.StrategyEye.config

		cfg.AVAILABLE_PORTLETS = null;

		var params = JSON.stringify(cfg);

		var pd = { params: params, action: 'save' };


		var remoteObject = new RC(SERVLET_URL, null, pd, 'pfLoading', 'FEEDBACK', thisAlias, 'uar', 'save');
		mintJsUtil.rc(remoteObject);
	}

	function applyDef() {
		var pd = { action: 'applyDef' };

		var remoteObject = new RC(SERVLET_URL, null, pd, 'pfLoading', 'FEEDBACK', thisAlias, 'uar', 'applyDef');
		mintJsUtil.rc(remoteObject);
	}


	function userActionResponse(response, identifier) {
		if (identifier == 'save') {
			mtgv.portlet.StrategyEye.config = response;
		} else if (identifier == 'showConfig') {

			var cfg = mtgv.portlet.StrategyEye.config;
			mtgv.portlet.StrategyEye.defConfig = response;

			response.AVAILABLE_PORTLETS = response.TABS[0].PREFS;  // Only Applicable for strat Eye View


			var availPortlet = portu.gap('balance', cfg, response)
			mtgv.portlet.StrategyEye.availPortlet = availPortlet;

			portCfg.showConfig();

		} else if (identifier == 'NoCustYet') {
			var cfg = mtgv.portlet.StrategyEye.config;

			mtgv.portlet.StrategyEye.defConfig = response;

			var availPortlet = portu.gap(identifier, cfg, response)

			mtgv.portlet.StrategyEye.availPortlet = availPortlet;

			createHomePage(cfg, true);
		} else if (identifier == 'applyDef') {
			homeInit(response, 'init');
			portCfg.addMsg('StrategyEye', 'Default Config applied');

		}
	}





	return {

		init: init,
		homeInit: homeInit,
		lp: loadPortlets,

		lpd: loadPortletData,

		loadDefConfig: loadDefConfig,
		// fc : frequencyChange,
		// shp : showHomePortlet,
		savePref: savePref,

		uar: userActionResponse,
		applyDef: applyDef,
		ar: autoRfresh,

		// sbc : stockBasketChg,

		// pds : printDynStatic,
		// gac : getAvailAnalCat


	}

})(); // module 