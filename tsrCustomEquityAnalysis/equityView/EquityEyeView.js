var EquityEye = (function () {

    let jsu = mintJsUtil;
    let htmlU = mintHtmlUtil;

    let SERVLET_URL = EQUITY_EYE_PORTLETS_URL;
    let thisAlias = "EquityEye";

    var classiSet = false;

    var equity = {
        "scId": "129",
        "ecId": "659",
        "code": "NAVINFLUOR",
        "name": "Navin Fluorine International Ltd.",
        "fno": "false",
        "close": 8288,
        "src": "custom",
        "ccId": "IN",
        "lra": "2026-08-07T09:25:56.261Z",
        "lastProcessedTime": "07_08_2026_15_04",
        "today": []
    }

    // initialize mtgv portlet 
    function preInit() {

        if (mintJsUtil.isNull(mtgv.portlet)) {
            mtgv.portlet = {};
        }

        mtgv.portlet.current = 'EquityEye'
        mtgv.portlet.code = 'EquityEye';
        mtgv.portlet.curTab = 0;
        mtgv.portlet.obj = 'EquityEye';

        if (mintJsUtil.isNull(mtgv.portlet.EquityEye)) {
            mtgv.portlet.EquityEye = {
                configName: 'default',
                reqs: [],
                topTab: [],
                type: 'EquityEye',
                config: null,
                divNo: 0,
                runLoop: true,
                pageScope: null,
                custom: {}
            };
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

            if (jsu.isNull(data.TABS)) {  // First Timer or Not yet Set
                data = getUserDefCfg();
            }

            mtgv.portlet.EquityEye.config = data;

            mtgv.portlet.EquityEye.defConfig = defaultConfig();

            var availPortlet = portu.gap('balance', mtgv.portlet.EquityEye.config, mtgv.portlet.EquityEye.defConfig);
            mtgv.portlet.EquityEye.availPortlet = availPortlet;

            createHomePage(data, true);

            // portu.setClassi('init', null);
            // loadPortletData(false);

            // if (identifier == 'init') {
            //     mtgv.portlet.EquityEye.config = data;
            //     if (jsu.isNull(data.TABS)) {  // First Timer or Not yet Set
            //         loadDefConfig('NoCustYet');
            //         return;
            //     }


            // }
        }
    }

    function createHomePage(data, homeInit) {

        portu.init();
        var code = mtgv.portlet.code;
        portCfg.printPage();

        mtgv.portlet.EquityEye.rptLocalTime = new Date();

    }

    function getUserDefCfg() {
        var json = {
            Name: "default",
            TABS: [],
            CODE_CAT: []
        };

        addUserDefTab(json, FREQ_DAILY);
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

    // Add tabs for each tick
    function addUserDefTab(json, freq) {
        var freqElem = jsu.getObjFrmArr(mtgv.mtpp.FREQ_SCR_MAP, freq);
        var cat = freqElem.label;
        var tab = { TabName: 'Tick : ' + freqElem.label };
        var portlets = addDefForTick(freqElem, json, cat, false);

        tab.PREFS = portlets;
        json.CODE_CAT.push(cat);
        json.TABS.push(tab);
    }

    // Add all def portlets for each tick (tab)
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

    function defaultConfig() {

        var json = { Name: 'default', TAB_NO: 0, CODE_CAT: [], AVAILABLE_PORTLETS: [] };
        for (var i = 0; i < mtgv.mtpp.FREQ_SCR_MAP.length; i++) {
            var freqElem = mtgv.mtpp.FREQ_SCR_MAP[i];
            var cat = freqElem.label;
            var portlets = addDefForTick(freqElem, json, cat, true);
            // json.AVAILABLE_PORTLETS.push(portlets)
            json.AVAILABLE_PORTLETS = json.AVAILABLE_PORTLETS.concat(portlets)
            json.CODE_CAT.push(cat);
        }

        return json;
    }

    function loadPortlets() {

        var portlets = portu.getTabPortlets();

        for (var i = 0; i < portlets.length; i++) {
            var portlet = portlets[i];
            var portletCode = portlet.CODE;

            if (jsu.isNull(portlet.pid)) { // hack as Pid got added later ...
                var def = jsu.getObjFrmArr(PORTLET_CAT, portlet.reportName);
                portlet.pid = def.pid;
            }

            var html = portu.create(portlet.Label, portletCode, true, mtgv.portlet.EquityEye.type, portlet);
            $('#TabData').append(html);
            portu.tlBar(portletCode, null, true);
        }

        loadPortletData(false);
    }

    function loadPortletData(auto) {

        // if (dClassiSet) {
        //     classiSet = true;
        // }

        // if (!classiSet) {
        //     setTimeout(loadPortletData, 40, auto);
        //     return;
        // }

        var portlets = portu.getTabPortlets();
        var config = mtgv.portlet.EquityEye.config;

        var classi = config.classi;
        var stkBsktCat = config.stkBsktCat;

        for (var i = 0; i < portlets.length; i++) {
            var portlet = portlets[i];

            if (auto && !portlet.autoRefresh) {
                continue;
            }

            var json = {
                classi: classi,
                stkBsktCat: stkBsktCat,
                freq: portlet.tick,
                reportName: portlet.reportName,
                actionType: 'EquityEye',
                eq: equity,
            }

            if (jsu.isNotNull(mtgv.portlet.EquityEye.custom[portlet.reportName])) {
                json.custom = JSON.stringify(mtgv.portlet.EquityEye.custom[portlet.reportName]);
            }

            if (portlet.term == 'all') {
                var addiParams = portlet.addiInfo.split(":");
                json.reportName = addiParams[2];
                json.term = portlet.term;
            }

            // var remoteObject = new RC(BIRDS_EYE_VIEW, null, json, 'MasEqLdDiv', 'MasEqFbDiv', 'portp', 'pgp', portlet.reportName);
            var remoteObject = new RC(BIRDS_EYE_VIEW, null, json, 'evLoadingDiv', 'EquityEyeContentsFeedBack', 'EquityEye', 'uar', 'updateHl');
            remoteObject.portlet = portlet;

            jsu.rc(remoteObject);

        }
    }

    // let CAT_HIGH_LOW = "highsNLows";

    // function loadCustomPortletData(cat) {
    //     if (cat == CAT_HIGH_LOW) {
    //         var remoteObject = new RC(BIRDS_EYE_VIEW, null, json, 'evLoadingDiv', 'EquityEyeContentsFeedBack', 'EquityEyeHh', 'ppc', portlet.reportName);
    //         remoteObject.portlet = portlet;

    //         jsu.rc(remoteObject);
    //     }
    // }

    // function printPortletContent() {
    //     let html = "";

    //     htmlU.addMsgToDiv(cat + "Table", true, html);
    // }

    // function userAction(action) {
    //     if(action == )
    // }

    function userActionResponse(response, identifier, remoteObject) {

        if (identifier == 'saveHome') {
            // mtgv.portlet.EquityEye.config =  response;
            // No Need to Save as its Dynamic...

        } else if (identifier == 'applyDef') {

        } else if (identifier == 'saveHl') {
            let cat = remoteObject.portlet.reportName;
            EquityEyeHh.ics(cat);
            mtgv.portlet.EquityEye.custom[cat].period = response.data;
            EquityEyeHh.ppc(response, cat, remoteObject);
        }
        else if (identifier == 'updateHl') {
            if (response.statusCode == "success") {
                let cat = remoteObject.portlet.reportName;
                EquityEyeHh.ics(cat);
                mtgv.portlet.EquityEye.custom[cat].period = response.data;
                EquityEyeHh.ppc(response, cat, remoteObject);
            }
        }
        // else if (identifier == 'printPortlet') {
        //     paintPortlet(response, remoteObject.portlet.reportName, remoteObject)
        // }
        // else if (identifier == 'eqDet') {
        //     eqo.ped(response, identifier, remoteObject, 'PatternEyeEqContentDiv');
        // }

    }

    function savePref() {

        var cfg = mtgv.portlet.EquityEye.config;

        cfg.AVAILABLE_PORTLETS = null;

        var params = JSON.stringify(cfg);

        var pd = { params: params, action: 'save' };


        var remoteObject = new RC(EQUITY_EYE_PORTLETS_URL, null, pd, 'pfLoading', 'FEEDBACK', 'EquityEye', 'uar', 'saveHome');
        // var remoteObject = new RC(EQUITY_EYE_PORTLETS_URL, null, pd, 'pfLoading', 'FEEDBACK', 'EquityEye', 'uar', 'saveHome');
        mintJsUtil.rc(remoteObject);
    }

    function applyDef() {

        var data = getUserDefCfg();

        homeInit(data, 'init');

        // portCfg.addMsg('Home', 'Default Config applied');
        portCfg.addMsg('EquityEye', 'Default Config applied');

        var pd = { action: 'applyDef' };
        // var remoteObject = new RC(EQUITY_EYE_PORTLETS_URL, null, pd, 'pfLoading', 'FEEDBACK', 'EquityEye', 'uar', 'saveHome');
        var remoteObject = new RC(EQUITY_EYE_PORTLETS_URL, null, pd, 'pfLoading', 'FEEDBACK', 'EquityEye', 'uar', 'applyDef');
        mintJsUtil.rc(remoteObject);
    }

    function autoRfresh() {
        loadPortletData(true)

        console.log('Autorefresh Called : Pattern Eye');

        mtgv.portlet.PatternEye.rptLocalTime = new Date();
    }

    var PORTLET_CAT = [
        { Label: "Highs & Lows", id: "highsNLows", def: true, eyeType: 'Equity', addiInfo: '', def: true, pid: '', custom: true },
        { Label: "Overview", id: "overview", eyeType: 'Equity', addiInfo: '', def: true, pid: '' },
        { Label: "Technical Strength", id: "techStrength", eyeType: 'Equity', addiInfo: '', def: true, pid: '' },
        { Label: "Financial Strength", id: "finStrength", eyeType: 'Equity', addiInfo: '', def: true, pid: '' },
    ];

    return {
        init: init,
        homeInit: homeInit,
        lpd: loadPortletData,
        lp: loadPortlets,
        uar: userActionResponse,
        savePref: savePref,
        applyDef: applyDef,
        ar: autoRfresh
    }
})();