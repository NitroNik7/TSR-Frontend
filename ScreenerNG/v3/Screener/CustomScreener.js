


var subDomain = mintJsUtil.getSubDomain();


var inMyTsr = mintJsUtil.isMyContext();

var pp = '';// public premium


let CS_FILTERS_TABLE = 'csFiltersTable';


//var SRC_SCR = 'scr'; //  Duplicate of miScreenrUtils -- Hack to be removed

// if(subDomain == 'my'){
// 	inMyTsr = true;
// }


// let csing = true;  // Custom Screener IS NG 

var showCstabs = false;


var LIST_OPS_COMPARE = [

    {
        id: 'prc', list: AVG_PRICE_RANGE, csType: BV_CS, field: 'pr',
        scrData: 'prComp', func: 'listOpCompChg', label: 'Price Range'
    },

    {
        id: 'beta', list: BETA_PERIOD, csType: BV_CS, field: 'beta',
        scrData: 'betaComp', func: 'listOpCompChg', label: 'Beta'
    },

    // volAvgTick
    {
        id: 'vatComp', list: VOL_AVG_TICK, csType: VOL_CS, field: 'vatComp',
        scrData: 'vatComp', func: 'listOpCompChg', label: "Tick's Avg Vol"
    },

    // volAvgDays 
    {
        id: 'vadComp', list: VOL_AVG_DAYS, csType: VOL_CS, field: 'vadComp',
        scrData: 'vadComp', func: 'listOpCompChg', label: "Day's Avg Vol"
    },


];

var SCREEN_URL = '/rt/DynCustScreener.tsr'

var MIG_CS_URL = "/AioScreenerHandler";

var MY_SCREEN_URL = '/my/MyTsrData/MyDynCustScreener.tsr';
var SS_URL = '/my/MyTsrData/ScreenerSettings.tsr'; // Get Chart Initial Settings....


var myTsrScreener = (function () {


    var htmlU = mintHtmlUtil;
    var jsu = mintJsUtil;

    // if(jsu.isMigContext()){
    // 	SS_URL = '/US/ai/ScreenerSettings'
    // }

    if (jsu.isMigContext()) {
        SS_URL = jsu.getMigUrl() + "/ScreenerSettings";
    }



    // var screenerData={};

    if (jsu.isNull(mtgv.cs)) {
        mtgv.cs = {};
        mtgv.cs.screenerData = {};
        mtgv.cs.MY_SCR_SETTINGS = [];


        //let csing = true;  // Custom Screener IS NG 

        mtgv.cs.ng = true;

        mtgv.cs.editActive = []; // {id: id}


    }

    var screenerData = mtgv.cs.screenerData;
    var MY_SCR_SETTINGS = mtgv.cs.MY_SCR_SETTINGS;
    var tabs = mtgv.cs.tabs;



    var thisAlias = 'myTsrScreener';

    var htmlU = mintHtmlUtil;
    // var htmlU = mintHtmlUtil;
    var jsu = mintJsUtil;



    csos.init();


    function init() {

        // todo remove
        mtgv.mtpp.analCat.push("tech");
        mtgv.mtpp.analCat.push("fno");
        mtgv.mtpp.analCat.push("portfolio");
        mtgv.mtpp.analCat.push("dashboard");


        mintHtmlUtil.addMsgToDiv('csDiv', true, myTsrScreener.getScreenerHtml());

        myTsrScreener.showControl(PRICE_CS);

        // SEARCH
        mintSrch.ras();

        // CS Dropdown Change ...
        // document.getElementById("myScrSetting").addEventListener("mousedown", simulateCsChange);

        // if(jsu.isMigContext()){
        csfstr.init();
        // }

        // Custom Template
        if (mtgv.mtpp.srt.avail) {
            misu.csua('load', thisAlias, 'screenNow', 'run', true);
        }


        // Stock relevance
        miscru.ssr(true);

        // Auto refresh
        miscru.sar(true);


        // htmlU.focusToDiv('csDiv');


        divHide(SCR_INIT_LD_DIV);
        divHide(ScreenerLoadingDiv);
        divHide(ScreenerFeedbackDiv);
        divHide('csMoreFreqDiv');

        // Mobile Selected Field Div
        divHide('csSelFieldsDivWrapMobile');


        mtgv.cs.init = false;
        mtgv.cs.prevResults = [];

        $('#pvCs').addClass('active');
        myTsrScreener.sss('init');

        // window.scrollTo(0, 0);
    }





    function initExpScreener(id) {
        mtgv.cs.prevResults = [];

        if (mtgv.cs.init) {  // waiting for init... better approach then next two runCustScr / runAlertCustScr
            if (jsu.isNull(mtgv.pubScr)) {
                esu.init({ id: id, type: 'iex' })
            } else {
                csh.spsd('apply', id);
            }
        } else {
            setTimeout(function () { initExpScreener(id) }, 50);

        }





    }



    function runCustScr(id) {
        //  $('#myScrSetting').append(getOption( 'none','No Availble Settings'));
        // Setting Loaded...
        var selectDD = '#myScrSetting';


        if ($(selectDD).length && $(selectDD).children('option').length > 1) {

            // if( $(selectDD).children('option').length ==1){
            // 	// 
            // 	setTimeout( function() {runCustScr(id)} , 100);   // Wait for init....
            // }

            var elemExist = false;
            $(selectDD).find('option').each(function (index, element) {
                // console.log(index);
                // console.log(element.value);
                // console.log(element.text);
                if (element.value == id) {
                    elemExist = true;
                }
            });
            if (elemExist) {
                $(selectDD).val(id).change();
                // csmng.so();
                csmng.ua('run', id);
            }

        } else {
            // wait ...
            // console.log(' Waiting runCustScr');
            setTimeout(function () { runCustScr(id) }, 50);
        }



    }


    function runAlertCustScr(json) { // runAlertCustScr
        var selectDD = '#myScrSetting';

        if ($(selectDD).length && $(selectDD).children('option').length > 1) {
            applyCustSettings(json);
        } else {
            // wait ...
            // console.log(' Waiting runCustScr');
            setTimeout(function () { runAlertCustScr(json) }, 50);
        }

    }


    function getScreenerHtml() {


        var defClassi = ''

        if (mtgv.mtpp == null) {   // PUBLIC 


            var sbDef = msbu.gcd();

            mtgv.mtpp = {
                CLASSI: sbDef.defs, DEF_CLASSI: sbDef.defSel, FREQ_SCR_MAP: FREQ_EOD_MAP,
                MA_TYPE: MA_TYPE_PR, MA_PRICE_OPTIONS: AB_CO_OPS_WITH_PT, crossFreq: true,
                TECH_OPS: TECH_OPS_ADV, OVERLAYS_OPS: OVERLAYS_OPS, sq: true, DIV_TYPE: null,
                srt: {}, TRENDING_MA_OPS: EMPTY_ARRAY,
                allPro: true,
            };


            mtgv.mtpp.cp = {}
            mtgv.mtpp.cp.stp = false;
            mtgv.mtpp.cp.maxFields = 1;

            if (jsu.isMigContext) {
                mtgv.mtpp.cp.maxFields = 5;
            }

            mtgv.mtpp.analCat = [ANALYSIS_CAT_COMMON, ANALYSIS_CAT_TECH, ANALYSIS_CAT_FUNDA, ANALYSIS_CAT_FNO];

        } else { // in my context....
            micr.scsr();

            // mtc.scsr();


        }


        tabs = getCsTabs();;
        mtgv.cs.tabs = tabs;
        return csh.initHtml();
    }

    function scrFreqChg() {
        // init();

        if (jsu.isMigContext()) {
            screenerData.scrFreq = htmlU.getInputVal('scrFreq');;
        } else {
            // screenerData.scrFreq =  $('input[name=scrFreq]:checked').val();	
            screenerData.scrFreq = htmlU.getInputVal('scrFreq');;
        }

        localStorage.setItem("csscrFreq", screenerData.scrFreq);


        $('#resultsTable').empty();
        showControl(screenerData.currentTab);

        // screenNow('run','tickChg');

    }

    function showControl(id, param2) {

        if (mtgv.cs.ng) {
            return;
        }


        var html = '';


        let fieldType = null;
        let objId = null;

        if (param2 != null && param2.includes(':')) {

            var val = param2.split(':');
            // var arr; 
            fieldType = val[0];
            objId = val[1];


        }




        var tabs = getCsTabs();

        for (var i = 0; i < tabs.length; i++) {


            let tabDef = tabs[i];

            htmlU.addMsgToDiv(tabDef.id, true, tabDef.label);

            if (tabs[i].id === id) {
                // $('#' +id).removeClass('csTab');
                // $('#' +id).addClass('active');
                // $('#' +id).style.background = 'white';
                // $('#' +id).style.color = 'black';
                $('#' + tabs[i].id).css('background', 'white');
                $('#' + tabs[i].id).css('color', 'black');

            } else {
                $('#' + tabs[i].id).css('background', 'grey');
                $('#' + tabs[i].id).css('color', 'white');
            }

            $('#' + tabs[i].id).css('border', '1px solid');


            csu.stc();

        }





        if (containsString([PRICE_CS], id, true)) {   // containsString()
            // html = getPriceHtml(id);
            html += csp.pht(id, fieldType, objId);
        } else if (id == VOL_CS) {
            html += csv.vht(id, fieldType, objId);

        } else if (id == HL_CS) {
            html += cshl.hlht(id, fieldType, objId);
        } else if (id == BV_CS) {
            html += csp.bvh(id, fieldType, objId);
        } else if (id == MA_CS) {
            html = csma.mht(id, fieldType, objId);
        } else if (id == TI_CS) {
            // html = getTiHtml(id);
            html += cst.tht(id, fieldType, objId);
        } else if (id == DIV_CS) {
            // html = getTiHtml(id);
            html += csd.thd(id, fieldType, objId);

        } else if (id == PP_CS) {
            html = cspp.ppht(id, fieldType, objId);
        } else if (id == STR_CS) {
            html = csstr.strht(id, fieldType, objId);
        } else if (id == CP_CS) {
            html = cscp.cpht(id, fieldType, objId);

        } else if (id == FIN_RAT_NG) {
            html = csFrNg.ght(id, fieldType, objId);

        } else if (id == FIN_STMT_NG) {
            html = csStmtNg.ght(id, fieldType, objId);


        } else if (id == FIN_BASIC) {
            html = csf.basicHtm(id, fieldType, objId);
        } else if (id == FIN_RATIO) {
            html = csf.finRatio(id, fieldType, objId);

            // }else if(id==FIN_BAL_SHEET){
            // 	html = csf.finBal(id , fieldType);
            // }else if(id==FIN_CASH_FLOW){
            // 	html =  csf.finGen(id, CASHFLOW_AEBB_FIELDS, 'Cash Flow');
            // }else if(id==FIN_INCOME){
            // 	html = csf.finGen(id, INCOME_AEBB_FIELDS, 'Income Statement');
            // }else if(id==FIN_QTRLY){
            // 	html = csf.finQtr(id, fieldType);
        } else if (id == FIN_HLR) {
            html = csFr.frh(id, fieldType, objId);
        } else if (id == FIN_YR) {
            html = csFr.fry(id, fieldType, objId);
        }

        screenerData.currentTab = id;
        showCSTab(id);
        /*
            for(var i=0;i<tabs.length;i++){
                  var tab = tabs[i];
    	
                  if(tab.id == id){
                        $('#'+tab.id).addClass('active');
                  }else{
                        $('#'+tab.id).removeClass('active');
                  }
            }
        */
        // console.log(html);
        addMsgToDiv('csControlsDiv', true, html);

        // htmlU.focusToDiv('csControlsDiv');
    }

    // var PRICE








    /**********************************************************************************************
                                    TECH HTML ...
    **********************************************************************************************/







    function getNextId(type) {
        if (isNull(screenerData[type])) { screenerData[type] = 1; id = 1; }
        else { screenerData[type] = screenerData[type] + 1; id = screenerData[type]; }
        return type + id;
    }







    function screenNow(type, runType) {

        if (type == 'display') {
            displaySelectedFields();
        } else if (type == 'reset') {
            csos.init(true);
            $('#csUserFeedBack').empty();
            $('#displaySel').prop('checked', false);

            $('#csSelFieldsDiv').empty();



            // retain Radio / Stock basket

            mtgv.cs.screenerData.stkType = htmlU.getRadioVal('stkType');
            // mtgv.cs.screenerData.stkBsktCat = null;

            mtgv.cs.TabCount = [];

            showControl(PRICE_CS);
            // $('#resultsTable').empty();

            $('#results').empty();

            //  

            // Move to Common as reset control

            $("#csAutoRefCB").prop("checked", false);
            $("#csstkRelCB").prop("checked", false);
            $("#cstRsltCB").prop("checked", false);
            $("#csBt").prop("checked", false);


            htmlU.divHide('csAutoRefDiv');
            htmlU.divHide('cstRsltDiv');
            htmlU.divHide('csstkRelDiv');
            htmlU.divHide('backtestDiv');

            localStorage.setItem('cs' + 'stkRel', 'false');
            localStorage.setItem('cs' + 'AutoRef', 'false');
            localStorage.setItem('cs' + 'tRsltCB', 'false');
            // localStorage.setItem('cs' + 'arFreq' , 'false');  //cst




            if (isMobile()) {

                addMsgToDiv(CS_SCR_CTRL_FB_DIV, true, htmlU.getGlaf('fa fa-remove fa-times', 'black', 18, 'mintHtmlUtil.divHide', CS_SCR_CTRL_FB_DIV)
                    + ' Filters Reset', 'green', 14);
                // CS_SCR_CTRL_FB_DIV
            }

        } if (type == 'save') {

            if (jsu.isMigContext() || inMyTsr || pp) {

            } else {
                // Public view ...
                // alert('Save Option is available in MyTsr. Please login to my.TopStockStockResearch.com')
                addMsgToDiv(CS_SCR_CTRL_FB_DIV, true, htmlU.getGlaf('fa fa-remove fa-times', 'black', 18, 'mintHtmlUtil.divHide', CS_SCR_CTRL_FB_DIV)
                    + 'Save Option is available in ' + htmlU.createLink(jsu.getMyTsrUrl(), 'MyTsr') + '. Please login to my.TopStockStockResearch.com', 'red', 14);
                return;
            }


            if (!validSelection()) {
                return;
            }

            // var selObjs = getSelectedObjects();
            // console.log( JSON.stringify(selObjs));

            csh.dht('save');
            // saveDialog('save');

        } if (type == 'run') {

            // if(isNotNull(fieldVal.invalidFields)) {
            // 	$('#csUserFeedBack').empty();
            // 	$('#csUserFeedBack').append(fieldVal.invalidFields);
            // 	return;
            // } 

            if (jsu.isNull(runType)) {
                runType = 'UserRun'
            }


            if (!validSelection(runType)) {
                return;
            }

            var selObjs = csos.getSelObjs('run');

            if (mtgv.mtpp.int || mtgv.mtpp.crossFreq) {
                selObjs.btIndex = htmlU.getInputVal('btIndex');
            }

            // send request to server ...
            var pd = { 'params': JSON.stringify(selObjs) }

            if (jsu.isMyContext() || pp) {
                misu.sct(pd); // Set Cust Template ...	
            }


            var url = (jsu.isMyContext() || pp) ? MY_SCREEN_URL : SCREEN_URL;


            if (jsu.isMigContext()) {
                url = jsu.getMigUrl() + "/" + MIG_CS_URL;
            }

            htmlU.emptyDiv(ScreenerFeedbackDiv);
            var rc = new RC(url, null, pd, ScreenerLoadingDiv, ScreenerFeedbackDiv, 'csh', 'dr', 'run');
            rc.runType = runType;


            // console.log( JSON.stringify(selObjs));
            myTsrUtils.rc(rc);

            // if(jsu.isNotNull(runType) && runType =='auto'){
            // 	myc.su();	
            // }

        }
        if (type == 'sn') {

            if (jsu.isNull(mtgv.cs.prevResults)) {
                mtgv.cs.prevResults = [];
            }

            if (jsu.isNull(mtgv.cs.response)) {
                return;
            }

            var showNew = $('#showNewCb').is(":checked");

            htmlU.divShow('resultLoading');



            csh.drsn(mtgv.cs.response, null, {}, showNew, mtgv.cs.prevResults);
            htmlU.divShow('results')

            htmlU.divHide('resultLoading');
            htmlU.focusToDiv('results');


        }




        if (type == 'alert') {

            if (jsu.isMigContext()) {
                addMsgToDiv(CS_SCR_CTRL_FB_DIV, true, htmlU.getGlaf('fa fa-remove fa-times', 'black', 18, 'mintHtmlUtil.divHide', CS_SCR_CTRL_FB_DIV)
                    + 'Alert Option is not yet enabled', 'red', 14);
                return;
            }

            if (!inMyTsr && !pp) {
                // alert('Save Option is available in MyTsr. Please login to my.TopStockStockResearch.com')
                addMsgToDiv(CS_SCR_CTRL_FB_DIV, true, htmlU.getGlaf('fa fa-remove fa-times', 'black', 18, 'mintHtmlUtil.divHide', CS_SCR_CTRL_FB_DIV)
                    + 'Adding Alert Option is available in ' + htmlU.createLink(jsu.getMyTsrUrl(), 'MyTsr')
                    + '. Please login to my.TopStockStockResearch.com', 'red', 14);


                return;
            }
            // saveDialog('alert');
            // getAlertHtml();
            csh.dht('alert');
        }


        if (type == 'alertNew') {

            if (jsu.isMigContext()) {
                addMsgToDiv(CS_SCR_CTRL_FB_DIV, true, htmlU.getGlaf('fa fa-remove fa-times', 'black', 18, 'mintHtmlUtil.divHide', CS_SCR_CTRL_FB_DIV)
                    + 'Alert Option is not yet enabled', 'red', 14);
                return;
            }

            if (!inMyTsr && !pp) {
                // alert('Save Option is available in MyTsr. Please login to my.TopStockStockResearch.com')
                addMsgToDiv(CS_SCR_CTRL_FB_DIV, true, htmlU.getGlaf('fa fa-remove fa-times', 'black', 18, 'mintHtmlUtil.divHide', CS_SCR_CTRL_FB_DIV)
                    + 'Adding Alert Option is available in ' + htmlU.createLink(jsu.getMyTsrUrl(), 'MyTsr')
                    + '. Please login to my.TopStockStockResearch.com', 'red', 14);


                return;
            }
            // saveDialog('alert');
            // getAlertHtml();
            csh.dht('alertNew');
        }




        /*
                if(type == 'publish'){
                    if(!validSelection()){
                        return;
                    }
    	
                    if(!inMyTsr){
                        // alert('Save Option is available in MyTsr. Please login to my.TopStockStockResearch.com')
                        addMsgToDiv( 'csCtrlFbDiv', true, htmlU.getGlaf( 'fa fa-remove fa-times','black', 14, 'mintHtmlUtil.divHide', 'csCtrlFbDiv' )  
                        + 'This Option is available in '+ htmlU.createLink( jsu.getMyTsrUrl()  , 'MyTsr' )  +'. Please login to my.TopStockStockResearch.com' , 'red' , 10); 
    	
                        return;
                    }
    	
    	
                    csh.dht(type);
                }
        */
        /*		
                if(type == 'publishForUser'){
                    if(!validSelection()){
                        return;
                    }
    	
                    if(!inMyTsr){
                        // alert('Save Option is available in MyTsr. Please login to my.TopStockStockResearch.com')
                        addMsgToDiv( 'csCtrlFbDiv', true, htmlU.getGlaf( 'fa fa-remove fa-times','black', 14, 'mintHtmlUtil.divHide', 'csCtrlFbDiv' )  
                        + 'This Option is available in '+ htmlU.createLink( jsu.getMyTsrUrl()  , 'MyTsr' )  +'. Please login to my.TopStockStockResearch.com' , 'red' , 10); 
    	
                        return;
                    }
    	
    	
                    csh.dht(type);
                }
        */

        if (type == 'showPubScr') {

            if (!inMyTsr && !pp) {
                // alert('Save Option is available in MyTsr. Please login to my.TopStockStockResearch.com')
                addMsgToDiv(CS_SCR_CTRL_FB_DIV, true, htmlU.getGlaf('fa fa-remove fa-times', 'black', 14, 'mintHtmlUtil.divHide', CS_SCR_CTRL_FB_DIV)
                    + 'This Option is available in ' + htmlU.createLink(jsu.getMyTsrUrl(), 'MyTsr') + '. Please login to my.TopStockStockResearch.com', 'red', 10);

                return;
            }
            csh.dht(type);

        }






    }


    function validSelection(runType) {

        var fieldVal = csu.vf(runType);

        if (fieldVal.invalidFieldCount > 0) {



            // EXPAND Invalid Section for Mobile view
            csfstr.scsffmi();
            var invalidFieldsMsg = 'One or More Filters not configured Properly. You May wish to Disable ' + htmlU.getPlainGlaf('fa fa-pause', 'grey') + ' Or delete' + htmlU.getPlainGlaf('fa fa-remove fa-times', 'grey') + 'Them in <b>Selected Section</b> Right of Filters';
            var fontSize = 12;

            if (isMobile()) {

                invalidFieldsMsg = 'One or More Filters not configured Properly.';
                fontSize = 10;
            } else {


            }


            addMsgToDiv(CS_SCR_CTRL_FB_DIV, true, htmlU.getGlaf('fa fa-remove fa-times', 'black', 14, 'mintHtmlUtil.divHide', CS_SCR_CTRL_FB_DIV)
                + invalidFieldsMsg, 'red', fontSize);



            // Do something....
            // htmlU.addMsgToDiv(CS_SCR_CTRL_FB_DIV, true , invalidFieldsMsg  ,'red' ,fontSize);
            return false;


        } else {
            htmlU.divHide(CS_SCR_CTRL_FB_DIV);
        }
        return true;
    }



    function displaySelectedFields() {

        csu.dsf();
        // var display =  $('#displaySel').is(":checked")
        // $('#csUserFeedBack').empty();
        // if(isNotNull(display) && display){
        // 	var fieldVal= csu. vf();
        // 	$('#csUserFeedBack').append(fieldVal.validFields);
        // 	$('#csUserFeedBack').append(fieldVal.invalidFields);
        // }
    }





    // function getTab(id){

    // }















    function saveScreenerSettings(type) {

        // console.log(' sss called :' + type);

        var selObjs = csos.getSelObjs('save');
        var json = JSON.stringify(selObjs);

        if (type == 'sav') {
            // Check the Length

            var settingName = getInputVal('setName');
            var pd = { 'setting': json, name: settingName, action: 'save' }
            var rc = new RC(SS_URL, null, pd, CS_SAV_LDG_DIV, CUS_DIAL_FB_DIV, 'myTsrScreener', 'ass', type);
            myTsrUtils.rc(rc);

            /*
                    }else if(type =='publish'){
                        // Check the Length
        	
                        var name = getInputVal('name');
                        var pubCat = getInputVal('pubCat');
                        var pubDesc = getInputVal('pubDesc');
        	
                        if(jsu.isNull(name) || name.length < 5){
        	
                            htmlU.addMsgToDiv('csFbDiv', true,'Please enter a valid name. Length should be between 5 to 100 Characters', 'red', null);
                            return;
                        }			
        	
                        // 
        	
        	
                        var pd = {'setting': json, name :name, pubCat : pubCat,    action:type , pubDesc : pubDesc}
                        var rc =  new RC( SS_URL, null,pd, CUS_DIAL_LD_DIV, CS_SAV_FB_DIV, 'myTsrScreener','ass', type);
                        myTsrUtils.rc(rc);		
            */
            /*
        	
                    }else if(type =='publishForUser'){
                        // Check the Length
        	
                        var name = getInputVal('name');
                        var email = getInputVal('email');
        	
                        if(jsu.isNull(name) || name.length < 5){
        	
                            htmlU.addMsgToDiv('csFbDiv', true,'Please enter a valid name. Length should be between 5 to 100 Characters', 'red', null);
                            return;
                        }			
        	
                        var pd = {'setting': json, name :name, email : email,    action:type }
                        var rc =  new RC( SS_URL, null,pd, CUS_DIAL_LD_DIV, CS_SAV_FB_DIV, 'myTsrScreener','ass', type);
                        myTsrUtils.rc(rc);		
             */
            /*
                    }else if(type =='upd'){
                        var settingId = getInputVal('mysSettings');
                        var settingName = getInputVal('setName');
        	
                        if(settingId=='none'){
                            addMsgToDiv(CS_SAV_FB_DIV,true,'Please choose a Setting to modify','red',null);    
                            return;
                        }
                        var pd = {'setting': json, id :settingId, action:'update', name :settingName}
                        var rc =  new RC( SS_URL, null,pd, CS_SAV_LDG_DIV, CS_SAV_FB_DIV, 'myTsrScreener','ass', type);
                        myTsrUtils.rc(rc);
            */
        } else if (type == 'init') {
            var pd = { action: 'init' }
            var rc = new RC(SS_URL, null, pd, CS_SAV_LDG_DIV, CS_SAV_FB_DIV, 'myTsrScreener', 'ass', type);
            myTsrUtils.rc(rc);
        } else if (type == 'view') {

            // MOVED to Manage settings ...
            /*
            var html ="";
            var div = getDiv(CS_VIEW_MY_SET_DIV);
            div.empty();
            var fields =[];
            var html='<h4>My Saved Screener Settings</h4>';
            var mysettings = MY_SCR_SETTINGS;

             if(mysettings==null || mysettings.length==0){
                fields.push('You Do not have any Saved Settings ');
                html+=createTsrTableDivSingleRow(fields);
                // html+='<tr><td> You Do not have any Saved Settings </td></tr>';
             }else{
                // html+='<tr><td> <h4>My Saved Chart Settings </h4></td></tr>';

                 for(var i=0;i<mysettings.length;i++){
                    var setting = mysettings[i];
                    var id= 'SettingId'+setting.id
                    var cols = [ getInputTxt(id,30  ,setting.Name,null) , getButtonP( 'Update Name','myTsrScreener.usn',setting.id),
                            getButtonP( 'Delete','myTsrScreener.usd',setting.id)
                    ]
                    fields.push(cols);

                }
                html+=createTsrTableDiv(fields);
                hideDiv('ManageSetDiv');
             }

             $('#'+CS_VIEW_MY_SET_DIV).append(html);

             */
        }
    }


    function addAlertNg(pd) {

        if (pd.custAlertType == 'savedAlert') {
            // from saved Settings...
        } else {

            var selObjs = csos.getSelObjs('run');
            var freq = htmlU.getInputVal('scrFreq');

            selObjs.scrFreq = freq;

            pd.freq = freq;

            if (pd.custAlertType == 'stk') {
                selObjs.stkType = pd.custAlertType;
            } else {
                var stkType = $('input[name=stkType]:checked').val();
                selObjs.stkType = stkType;
            }

            pd.jsonParams = JSON.stringify(selObjs);
        }

        var rc = new RC(SS_URL, null, pd, CS_SAV_LDG_DIV, CS_SAV_FB_DIV, 'myTsrScreener', 'ass', 'usang');
        myTsrUtils.rc(rc);

    }

    function usa(id) { // user Saved Alert..

        var pd = { action: 'alert' };

        if (!au.vali(pd)) return;

        // validate currect Settings...
        if (pd.alertType == 'savedAlert') {
            // from saved Settings...


        } else {
            // Run time settings with no saved screener.....
            var fieldVal = csu.vf();

            if (isNotNull(fieldVal.invalidFields)) {
                $('#csUserFeedBack').empty();
                $('#csUserFeedBack').append(fieldVal.invalidFields);
                jsu.addMsgToDiv('cs_dialog', true, fieldVal.invalidFields);
                return;
            }
            var selObjs = csos.getSelObjs('run');


            if (pd.stkType == 'stk') {
                selObjs.stkType = pd.stkType;
            } else {
                var stkType = $('input[name=stkType]:checked').val();
                selObjs.stkType = stkType;
            }
            // selObjs.scrFreq = pd.freq; 
            // pd.freq  = 

            // var freq = $('input[name=scrFreq]:checked').val() ;
            var freq = htmlU.getInputVal('scrFreq');


            selObjs.scrFreq = freq;

            pd.freq = freq;


            // if(isMobile()){
            // 	// var freq = $('input[name=scrFreq]:checked').val() ;

            // 	var classiId = $('input[name=stkType]:checked').val();
            // 	selObjs.stkType =classiId;
            // 	// selObjs.scrFreq =  freq;
            // }


            pd.jsonParams = JSON.stringify(selObjs);
        }

        // var name=getInputVal('SettingId'+id);
        // var pd = {'id': id,  action:'alert'}
        var rc = new RC(SS_URL, null, pd, CS_SAV_LDG_DIV, CS_SAV_FB_DIV, 'myTsrScreener', 'ass', 'usa');
        myTsrUtils.rc(rc);
    }





    function applySaveSettings(data, type, remoteObject) { // apply Save Setting
        if (data.statusCode == NOT_SIGNED_IN) {

            var msg = "Please sign in to Save Setting."
            if (jsu.isMigContext()) {
                msg = data.statusMsg;
            } else {

            }

            addMsgToDiv(CS_SAV_FB_DIV, true, msg, 'red', null);

            return;
        }

        var fbDiv = CS_SAV_FB_DIV;

        if (jsu.isNotNull(remoteObject.erDv)) {
            fbDiv = remoteObject.erDv;
        }

        if (data.statusCode == MSG_STATUS_GOOD) {

            if (type == 'init') {
                populateSaveSettings(data, type)

                mtgv.cs.init = true;
            } else
                if (type == 'sav') {
                    populateSaveSettings(data, type)
                    addMsgToDiv(CS_SAV_FB_DIV, true, "Screener Setting Successfully Saved", 'green', null);

                } else if (type == 'publish') {
                    addMsgToDiv(CS_SAV_FB_DIV, true, data.statusMsg, 'green', null);
                    mtgv.pubScr = null;
                } else if (type == 'publishForUser') {
                    addMsgToDiv(CS_SAV_FB_DIV, true, data.statusMsg, 'green', null);

                    // htmlU.divHide('pub4userDiv');

                    mtgv.pubScr = null;
                    // }else if(type == 'showPubScr'){
                    // 	csh.dht('printPubScr' , data);

                } else if (type == 'usn') {
                    populateSaveSettings(data, type)
                    addMsgToDiv(CS_SAV_FB_DIV, true, data.statusMsg, 'green', null);
                } else if (type == 'usd') {
                    populateSaveSettings(data, type)
                    addMsgToDiv(CS_SAV_FB_DIV, true, data.statusMsg, 'green', null);
                } else if (type == 'usa') {
                    // populateSaveSettings(data,type)
                    // addMsgToDiv(SAV_FB_DIV,true,data.statusMsg,'green',null);     

                    if (data.statusCode == 'success') {
                        htmlU.addMsgToDiv(CS_SAV_FB_DIV, true, data.statusMsg, 'green');

                    } else {
                        htmlU.addMsgToDiv(CS_SAV_FB_DIV, true, data.statusMsg, 'red');
                    }
                    // htmlU.focusToDiv(SAV_FB_DIV);
                    // setTimeout(function() { $('#'+).scrollTop(0); }, 500);

                } else if (type == 'usang') {

                    if (data.statusCode == 'success') {
                        htmlU.addMsgToDiv('alertFbDivNg', true, data.statusMsg, 'green');
                    } else {
                        htmlU.addMsgToDiv('alertFbDivNg', true, data.statusMsg, 'red');
                    }

                } else {
                    // syncMySettingDropDown(data,'save',settingName);
                    populateSaveSettings(data, type);
                    addMsgToDiv(CS_SAV_FB_DIV, true, "Screener Setting Successfully Updated", 'green', null);
                }
        } else if (data.statusCode == MSG_STATUS_INVALID_VALUES) {

            if (type == 'usang') fbDiv = 'alertFbDivNg';

            addMsgToDiv(fbDiv, true, data.statusMsg, 'red', null);



        } else {
            addMsgToDiv(fbDiv, true, ERROR_MSG, 'red', null);
        }
    }

    function populateSaveSettings(data, type) {


        MY_SCR_SETTINGS = data.MySettings;


        if (MY_SCR_SETTINGS != null) {
            for (var i = 0; i < MY_SCR_SETTINGS.length; i++) {
                var set = MY_SCR_SETTINGS[i];

                if (jsu.isNotNull(set.Settings)) {
                    if (set.Settings.scrFreq in FREQ_CONVR_MAP) {
                        set.Settings.scrFreq = FREQ_CONVR_MAP[set.Settings.scrFreq];
                    }
                }
            }
        }


        mtgv.cs.MY_SCR_SETTINGS = MY_SCR_SETTINGS


        var settingsId = jsu.isNotNull(data.imset) ? data.imset.id : null;


        csmng.csdd(type, MY_SCR_SETTINGS, settingsId);

        /*
       if(type =='usd' || type =='usn') {
           saveScreenerSettings('view');
       }   
       */

    }

    function acss(type, settings) { // apply Custom Screener Settings....
        // var text = $( "#myScrSetting option:selected" ).text();

        if (jsu.isNotNull(type) && type == 'expertScr') {  // Expert Published Screener


            applyCustSettings(settings);
            return;
        }
        /*
    	
                if(type =='ng'){
    	
                    return csmng.so();
                }
        */

        var selOption = getObjFrmArr(MY_SCR_SETTINGS, getInputVal('myScrSetting'));

        if (selOption == null) return;

        var selSettings = selOption.Settings;

        applyCustSettings(selSettings);

    }

    function applyCustSettings(settings, norun) {


        cst.sdvif(settings);  // Backward compatible for 

        csos.init();
        var jsonObj = jsu.cloneObj(settings);

        if (isNotNull(jsonObj.scrFreq)) {

            // mintHtmlUtil.chkRadio('scrFreq', jsonObj.scrFreq);

            var objSelect = document.getElementById("scrFreq");

            for (var i = 0; i < objSelect.options.length; i++) {
                if (objSelect.options[i].value == jsonObj.scrFreq) {
                    objSelect.options[i].selected = true;
                    break;
                }
            }

            screenerData.scrFreq = jsonObj.scrFreq;

        }
        // if(isNotNull(jsonObj.stkType)) mintHtmlUtil.chkRadio('stkType', jsonObj.stkType);

        if (isNull(jsonObj.stkType)) {

            var sbDef = msbu.gcd();
            settings.stkType = sbDef.defs[1].id;
        }

        if (inMyTsr || pp) {

            var sbAndCat = msbu.ua('getStockBasketAndCat', settings.stkBsktCat, settings.stkType);

            if (!sbAndCat.loaded) {
                setTimeout(applyCustSettings, 40, settings);
                return;
            } else {

                var sblcfg = { fieldName: 'stkType', obj: thisAlias, fnc: 'cbc', selected: settings.stkType, stkBsktCat: settings.stkBsktCat };

                var html = msbu.ua('getsb', sblcfg);
                htmlU.addMsgToDiv('sbDiv', true, html);
                screenerData.stkType = sbAndCat.stkBasket.id;
                screenerData.stkBsktCat = sbAndCat.stkBsktCat

            }
        }


        csos.as(jsonObj);

        showControl(jsonObj.currentTab);
        displaySelectedFields();

        if (norun) {
            return;
        }
        // Second Param 
        screenNow('run', 'applyCustSettings');

    }




    /**********************************************************************************************
                                    AUTO Refresh ....
    **********************************************************************************************/



    function isAutoRun(auto) {

        var scrFreq = htmlU.getInputVal('scrFreq');


        // Only Live tick 
        if (jsu.arrayContainsId(FREQ_EOD_MAP, scrFreq)) {
            return false;
        }

        // Only Market Hrs
        if (!mtgv.mktDet.mktHours) {
            return false;
        }

        let checked = htmlU.isChecked('cs' + 'AutoRef' + 'CB');

        if (!checked) return false;

        let arFreq = htmlU.getInputVal('cs' + 'AutoRefDD');


        if (arFreq == 'scrTick' && auto) {
            return true;
        } else if (arFreq != 'scrTick' && !auto) {
            return true;
        }

    }


    function getNextRunTime() {
        // manage other tick
        let arFreq = htmlU.getInputVal('cs' + 'AutoRefDD');

        if (mtgv.cs.reportGenTime == null) {

            return 0; // Run Now
        }


        let lastRunTime = mtgv.cs.reportGenTime.getTime();;

        let nextRun = lastRunTime + Number(arFreq) * 60 * 1000;

        let currentTime = new Date().getTime() - mtgv.mktDet.timeDiffInMillis;

        let gap = nextRun - currentTime;

        // console.log( ' Gap   ' + gap +  ' lastRunTime ' + lastRunTime  
        // 	+ ' , next Run ' + nextRun + ' currentTime ' + currentTime)


        if (gap <= 0) return 0; // run Immediately ...

        return gap;
    }

    function autoRefresh(fixedTime, arTick) {


        // 
        if (htmlU.isChecked('csBt')) {
            htmlU.addMsgToDiv('csScrCtrlFbDiv', true, 'Auto refresh is disabled when Back Test is on', 'red', 14);
            return;
        }


        if (fixedTime) {
            if (isAutoRun(false)) {

                let arFreq = htmlU.getInputVal('cs' + 'AutoRefDD');

                // console.log( ' AR Freq : ' + arFreq  + ' arTick ' + arTick);

                if (arFreq != arTick) {
                    // disable stale refresh Freq
                    return;
                }

                let runAt = getNextRunTime();

                // console.log( 'Auto Refresh : ' + runAt + '  - '   + new Date()  );

                if (runAt == 0) {
                    // Run time

                    // console.log ( ' Running ft ar');
                    screenNow('run', 'auto');
                    runAt = 30 * 1000; // Delaying next attempt for screener to run
                }



                setTimeout(function () { myTsrScreener.arf(true, arTick) }, runAt);
            }
        } else {
            if (isAutoRun(true)) {
                screenNow('run', 'auto'); // regular Auto Refresh ....	
                return;
            }
        }
    }


    function checkBoxChange() {


        var sbDef = msbu.gcd();

        if (jsu.isMyContext() || pp || (jsu.isMigContext() && userProf.status == 'signedIn')) {

            mtgv.cs.screenerData.stkType = $('input[name=stkType]:checked').val();
            if (jsu.arrayContainsId(sbDef.defs, mtgv.cs.screenerData.stkType)) {
                mtgv.cs.screenerData.stkBsktCat = null;
            } else {
                mtgv.cs.screenerData.stkBsktCat = mtgv.mtpp.sblcfg.stkBsktCat;
            }
            // screenNow('run','sbChg');

            return;

        }

        htmlU.divHide(CS_SCR_SB_FB_DIV);
        var stkBasket = $('input[name=stkType]:checked').val();




        // India Public ... 

        // var sbDefs = jsu.getObjFrmArr(sbDef.defs);

        var publicSb = ['all'];
        publicSb.push(sbDef.defSb)


        if (!jsu.containsString(publicSb, stkBasket)) {

            var msg = htmlU.getGlaf('fa fa-remove fa-times', 'black', 14, 'mintHtmlUtil.divHide', CS_SCR_SB_FB_DIV)

                + 'This filter is available in Premium View  '  // /by logging in to '+ mintHtmlUtil.createLink( mintJsUtil.getMyTsrUrl()+'/MyTsr/#/CustomStockScreener' ,  "MyTSR" ) ; //+')'

            htmlU.addMsgToDiv(CS_SCR_SB_FB_DIV, true, msg, 'red', 14);
            $('input[name="stkType"][value="' + sbDef.defSb + '"]').prop('checked', true);
            htmlU.divShow(CS_SCR_SB_FB_DIV);

        }

    }



    return {

        init: init,

        iex: initExpScreener,

        getScreenerHtml: getScreenerHtml,

        // vs : validSelection,


        runCustScr: runCustScr,

        racr: runAlertCustScr,
        sfc: scrFreqChg,
        showControl: showControl,
        // csAebbChg : csAebbChg,  // Value Above Equals, Below, between...


        // addMa : addMa,
        // pmaChg : pmaChg,
        // macoChg : macoChg ,






        getNextId: getNextId,

        screenNow: screenNow,
        // addPriceRange : addPriceRange,
        // onPrChg: onPrChg,
        // listOpCompChg : listOpCompChg,
        // addListOpsCompare : addListOpsCompare,


        acs: applyCustSettings,

        // dr:displayResults,
        sss: saveScreenerSettings,
        ass: applySaveSettings,
        // usn : usn,
        // usd : usd,
        usa: usa,
        aan: addAlertNg,


        acss: acss,
        arf: autoRefresh,
        // arfc : autoRefreshChk,
        cbc: checkBoxChange,

        // addAlert : addAlert
    }

})(); // module 

window.onkeyup = function (event) {
    mintHtmlUtil.escapeDiv(event, ['cs_dialog', 'dialog', 'custDialog', 'alertDialog', 'artnuDiv']);
}