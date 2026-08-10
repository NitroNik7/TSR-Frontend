
var TechiEye = (function () {   // mytsr home

	var htmlU = mintHtmlUtil;
    var jsu = mintJsUtil;


    var classiSet = false;

    function preInit(){
    	if( mintJsUtil.isNull(mtgv.portlet ) ){
            mtgv.portlet ={};
        }        

        mtgv.portlet.current = 'TechiEye' 
        mtgv.portlet.code = 'TechiEye';
        mtgv.portlet.curTab =0;
        mtgv.portlet.obj = 'TechiEye';



        if( mintJsUtil.isNull(mtgv.portlet.TechiEye)){
            mtgv.portlet.TechiEye = {   configName :'default',  reqs :[],   topTab :[],     type : 'TechiEye',  config : null,  divNo : 0,
                runLoop : true,     pageScope : null };
        }

    }


	function init(){
		preInit();

		var pd = {ccId : getMarket()};
        var remoteObject = new RC(TECHI_EYE_PORTLETS_URL, null, pd, 'pfLoading', 'pfFeeback', 'TechiEye', 'homeInit', 'init');
        jsu.rc(remoteObject);

	}


	function homeInit(data, identifier){

		htmlU.divHide('tevLoadingDiv');
		
		if(jsu.isNotNull(data)){
			// mtgv.homeVars['config'] = data;
			if(identifier =='init'){
				
				if(jsu.isNull(data.TABS)){  // First Timer or Not yet Set
			  		data = getUserDefCfg();
				}
				mtgv.portlet.TechiEye.config = data;

				mtgv.portlet.TechiEye.defConfig = defaultConfig();


				var availPortlet =  portu.gap('balance', mtgv.portlet.TechiEye.config , mtgv.portlet.TechiEye.defConfig);

				mtgv.portlet.TechiEye.availPortlet = availPortlet;

				createHomePage(data,  true);

				portu.setClassi('init', null);

				// if(jsu.isNull(data.TABS) || data.TABS.length ==0 ){
				// 	//creating default Tab
				// 	portu.gap('NoCustYet', mtgv.portlet.Home.config , data );
				// }	
				// At least one tab will always be there


				
			}
		}
	}




	function createHomePage(data,  homeInit){

		portu.init( );
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
			mtgv.portlet.TechiEye.rptLocalTime= new Date();

	}


	function loadPortlets(){

			var portlets = portu. getTabPortlets();

			// var classi = 'idx500';

				for(var i=0;i<portlets.length;i++){
					var portlet = portlets[i];

					// console.log( portlet);
					var portletCode = portlet.CODE;

					if(jsu.isNull(portlet.pid)){ // hack as Pid got added later ...
						var def = jsu.getObjFrmArr(PORTLET_CAT , portlet.reportName);
						portlet.pid = def.pid;
					}

					var html = portu.create(portlet.Label,  portletCode, true, mtgv.portlet.TechiEye.type, portlet   ) ;
					$('#TabData').append(html);
					portu.tlBar(portletCode, null, true);	

				}

				loadPortletData(false);	


				
		}

		function autoRfresh(){


			console.log('Autorefresh Called : TechiEye' );


			loadPortletData(true)


			mtgv.portlet.TechiEye.rptLocalTime= new Date();

		}




		function loadPortletData(auto, dClassiSet){


			if(dClassiSet) {
				classiSet = true;
			}	

			if(!classiSet){
                setTimeout(loadPortletData, 40, auto);
                return;
          	}



			var portlets = portu. getTabPortlets();

			// var classi = 'idx500';

			var config  = mtgv.portlet.TechiEye.config;

			var classi = config.classi;
			var stkBsktCat = config.stkBsktCat;

				for(var i=0;i<portlets.length;i++){
					var portlet = portlets[i];
					

					if(auto && ! portlet.autoRefresh){
						continue;
					}


					var json = {classi : classi, stkBsktCat : stkBsktCat ,  freq : portlet.tick, reportName : portlet.reportName  , actionType : 'TechiEye'}

					var remoteObject = new RC( BIRDS_EYE_VIEW, null,json, 'MasEqLdDiv', 'MasEqFbDiv' ,'portp', 'pgp', portlet.reportName);
					remoteObject.portlet = portlet;

					// remoteObject.classi = classi;
					// remoteObject.stkBsktCat = stkBsktCat;

					jsu.rc(remoteObject);

				}

		}




		


		


	


	function getUserDefCfg(){


		var json = {Name: "default", TABS : [] ,  CODE_CAT : []};


		addUserDefTab(json , FREQ_DAILY)
		if(mtgv.mtpp.rt){
			addUserDefTab(json , FREQ_INTRA_DAILY);
		}





		if(jsu.arrayContainsId(mtgv.mtpp.FREQ_SCR_MAP, FREQ_MM15)){
			addUserDefTab(json , FREQ_MM15);
		}


		addUserDefTab(json , FREQ_WK);

		json.TAB_NO = json.TABS.length;


		return json;

	}

	function addUserDefTab(json , freq){
		

		var freqElem = jsu.getObjFrmArr(  mtgv.mtpp.FREQ_SCR_MAP , freq) ;

		var cat = freqElem.label; 

		var tab = { TabName : 'Tick : ' + freqElem.label };

		var portlets = addDefForTick(freqElem , json,cat,  false ) ;
		tab.PREFS = portlets;

		json.CODE_CAT.push(cat);

		json.TABS.push(tab);

	}



	function defaultConfig(){

		var  json ={  Name : 'default',  TAB_NO : 0, CODE_CAT : [] , AVAILABLE_PORTLETS:[] };
		
		for( var i=0;i< mtgv.mtpp.FREQ_SCR_MAP.length ;i++ ){

				var freqElem = mtgv.mtpp.FREQ_SCR_MAP[i];
				var cat = freqElem.label;

				var portlets = addDefForTick(freqElem , json, cat, true )
				
				// json.AVAILABLE_PORTLETS.push(portlets)

				json.AVAILABLE_PORTLETS = json.AVAILABLE_PORTLETS.concat(portlets)

				json.CODE_CAT.push(cat);
		}
		return json;

	}

	function addDefForTick(freqElem , json, cat , addAll ){

			var cat = freqElem.label;

			var autoRefresh = true;

			if( jsu.arrayContainsId(FREQ_EOD_MAP, freqElem.id )){
				autoRefresh = false;
			}

			var portlets =[]

			for(var i=0;i< PORTLET_CAT.length ;i++){
				var elem = PORTLET_CAT[i];

				if(!addAll && !elem.def){
					continue;
				}

				
				
				var portLet = {

					  "CODE": elem.id+freqElem.id,
					  reportName : elem.id,
					  colLabel1 : elem.colLabel1,
					  colLabel2 : elem.colLabel2,

					  "CODE_CAT": cat,
					  "id":  elem.id+freqElem.id,
					  "Label": elem.Label + ' - ' +  freqElem.label ,
					  "hidden": "false",
					  addiInfo : elem.addiInfo ,
					  "common": "true",
					  "url": "null",
					  "size": "4",
					  "autoRefresh": autoRefresh,
					  tick : freqElem.id,
					  "ticks": "false",
					  "pid" : elem.pid
				};


				if( elem.id.indexOf("_sma") ==-1  && elem.id.indexOf("_ema") ==-1 ){  // Bad Logic defined in PORTLET_CAT for ma and other indi
						portLet.addiInfo = portLet.addiInfo   +":" + elem.id;
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





	



	function userActionResponse(response,identifier, remoteObject){

		if(identifier == 'saveHome'){
				// mtgv.portlet.TechiEye.config =  response;
				// No Need to Save as its Dynamic...
		}else if(identifier =='eqDet'){
			eqo.ped(response , identifier, remoteObject , 'TechiEyeEqContentDiv'  );
		}

	}


	function savePref(){

			var cfg =mtgv.portlet.TechiEye.config

			cfg.AVAILABLE_PORTLETS = null;

			var params = JSON.stringify(cfg);

			var pd = {params : params , action : 'save'}; 


			var remoteObject = new RC(TECHI_EYE_PORTLETS_URL, null, pd, 'pfLoading', 'FEEDBACK', 'TechiEye', 'uar', 'saveHome');
            		mintJsUtil.rc(remoteObject);
		}


		function applyDef(){
			
			var data = getUserDefCfg()

			homeInit(data, 'init');

			portCfg. addMsg('Home','Default Config applied' );

			var pd = {action : 'applyDef'}; 
			var remoteObject = new RC(TECHI_EYE_PORTLETS_URL, null, pd, 'pfLoading', 'FEEDBACK', 'TechiEye', 'uar', 'saveHome');
            		mintJsUtil.rc(remoteObject);
		}


/*

		var OBOS_DEF= {
				code : [
					{id: 'rsi'  : label "RSI" } ,
					{ id :  'rsiSmooth', label : 'RSI Smooth ' , def: false},
					{ id :  'williamsR', label : 'William %R ' , def: false},
					{ id :  'cci', label : 'CCI ' },
					{ id :  'mfi', label : 'MFI ' },
					{ id :  'slowSto', label : 'Slow Stochastic ' },
					{ id :  'fastSto', label : 'Fast Stochatic ' },

			],
			rptType : [ {  id: 'Overbought'  : label "Over Bought by INDI_TYPE" }  ,  
			 				{  id: 'Falling'  : label "Falling INDI_TYPE" , def: false}   
			 				{  id: 'BlwCentralLine'  : label "INDI_TYPE Cross Below center line" }   
			 				{  id: 'OverboughtWait'  : label "INDI_TYPE OB for > 3 Period" }   
			 				{  id: 'Oversold'  : label "Over Sold by INDI_TYPE"  }   
			 				{  id: 'Rising'  : label "Rising INDI_TYPE"  , def: false}   
			 				{  id: 'AboveCentralLine'  : label "INDI_TYPE Cross Abv Central Line" }   
			 				{  id: 'OversoldWait'  : label "INDI_TYPE OS for > 3 Period" }   
			 				// {  id: ''  : label "" }   

			 ],

		};

*/




	var  PORTLET_CAT =  [ 

// TSR Tech Indicator 


{  id:  'tsaAllBullish'  , Label : "Bullish By TSR Index"  , def: true  , colLabel1 : 'Strength'  , addiInfo :'tsrStrength:TechStrength:Bullish' , pid: '/TSRStrengthIndex/TechnicalStrength/Bullish/AllBullishTechStrength'},
{  id:  'tsaAllBearish'  , Label : "Bearish By TSR Index" , def: true , colLabel1 : 'Strength' , addiInfo :'tsrStrength:TechStrength:Bearish' , pid: '/TSRStrengthIndex/TechnicalStrength/Bearish/AllBearishTechStrength/'},



// {  id:  'obos'  , Label : "OBOS" , def: false, list : OBOS_DEF , type : 'obos' },


//  Bollinger Band

 
{Label:"Above Bollinger", id:"bollingerStockAboveBand" , def: false  , colLabel1 : 'Upper Band'  , colLabel2 : 'Lower Band'  , addiInfo :'tech:TechnicalIndicators:BollingerBand' , pid: '/Technical/Overlays/BollingerBands/AboveBollingerBand'},
{Label:"Below Bollinger", id:"bollingerStockBlwBand",  colLabel1 : 'Upper Band'  , colLabel2 : 'Lower Band'  , addiInfo :'tech:TechnicalIndicators:BollingerBand' , pid: '/Technical/Overlays/BollingerBands/BelowBollingerBand'},
{Label:"BB Crossed Above Central Line",id:"bollingerStockAboveMiddleBand" , colLabel1 : 'Upper Band'  , colLabel2 : 'Lower Band'  , addiInfo :'tech:TechnicalIndicators:BollingerBand' , pid: '/Technical/Overlays/BollingerBands/BBCrossedAboveCentralLine'},
{Label:"BB Crossed Below Central Line",id:"bollingerStockBlwMiddleBand" , colLabel1 : 'Upper Band'  , colLabel2 : 'Lower Band'  , addiInfo :'tech:TechnicalIndicators:BollingerBand' , pid: '/Technical/Overlays/BollingerBands/BBCrossedBelowCentralLine'},
{Label:"BB Narrowing Band",id:"bollingerNarrow" , colLabel1 : 'Upper Band'  , colLabel2 : 'Lower Band'  , addiInfo :'tech:TechnicalIndicators:BollingerBand' , pid: '/Technical/Overlays/BollingerBands/NarrowingBand'},
{Label:"BB Narrowing Breakout",id:"bollingerBreakOutNarrow" , colLabel1 : 'Upper Band'  , colLabel2 : 'Lower Band'  , addiInfo :'tech:TechnicalIndicators:BollingerBand' , pid: '/Technical/Overlays/BollingerBands/NarrowingBreakout'},
{Label:"BB Narrowing Breakdown",id:"bollingerBreakDownNarrow", colLabel1 : 'Upper Band'  , colLabel2 : 'Lower Band'  , addiInfo :'tech:TechnicalIndicators:BollingerBand' , pid: '/Technical/Overlays/BollingerBands/NarrowingBreakdown'},


// MACD Indicator 


{Label:"MACD Above Signal Line",id:"macdCOAboveSignalLine"  , def: false  , colLabel1 : 'MACD'  , colLabel2 : 'SL' , addiInfo :'tech:TechnicalIndicators:MACD', pid: '/Technical/TrendIndicator/MACD/MACDCrossAboveSignalLine'},
{Label:"MACD Cross Below Signal Line",id:"macdCOBlwSignalLine"   , colLabel1 : 'MACD'  , colLabel2 : 'SL' , addiInfo :'tech:TechnicalIndicators:MACD', pid: '/Technical/TrendIndicator/MACD/MACDCrossBelowSignalLine'},
{Label:"MACD Above Zero Line",id:"macdCOAboveZeroLine"   , colLabel1 : 'MACD'  , colLabel2 : 'SL' , addiInfo :'tech:TechnicalIndicators:MACD', pid: '/Technical/TrendIndicator/MACD/MACDAboveZeroLine'},
{Label:"MACD Below Zero Line",id:"macdCOBlwZeroLine"   , colLabel1 : 'MACD'  , colLabel2 : 'SL' , addiInfo :'tech:TechnicalIndicators:MACD', pid: '/Technical/TrendIndicator/MACD/MACDBelowZeroLine'},


//  Rebranding of RSI

// RSI Fast Indicator 

{Label:"Over Bought By RSI (F)",id:"rsiOverbought" , colLabel1 : 'RSI (F)'   , addiInfo :'tech:OverBoughtOversold:RSI' , pid:  '/Technical/OverboughtSold/RSI/RSIOverbought'},
{Label:"OB falling RSI (F)",id:"rsiFalling" , colLabel1 : 'RSI (F)'   , addiInfo :'tech:OverBoughtOversold:RSI' , pid:  '/Technical/OverboughtSold/RSI/OBFallingRSI'},
{Label:"RSI (F) Cross Below center line",id:"rsiBlwCentralLine", colLabel1 : 'RSI (F)'   , addiInfo :'tech:OverBoughtOversold:RSI' , pid:  '/Technical/OverboughtSold/RSI/RSICrossBelowCenterLine'},
{Label:"RSI (F) OB for > 3 Period",id:"rsiOverboughtWait", colLabel1 : 'RSI (F)'   , addiInfo :'tech:OverBoughtOversold:RSI' , pid:  '/Technical/OverboughtSold/RSI/RSIOBForMoreThan3Days'},
{Label:"Over Sold  By RSI (F)",id:"rsiOversold" , def: false, colLabel1 : 'RSI (F)'   , addiInfo :'tech:OverBoughtOversold:RSI' , pid:  '/Technical/OverboughtSold/RSI/RSIOversold'},
{Label:"Rising RSI (F)",id:"rsiRising", colLabel1 : 'RSI (F)'   , addiInfo :'tech:OverBoughtOversold:RSI' , pid:  '/Technical/OverboughtSold/RSI/RisingRSI'},
{Label:"RSI (F) Cross Abv Central Line",id:"rsiAboveCentralLine", colLabel1 : 'RSI (F)'   , addiInfo :'tech:OverBoughtOversold:RSI' , pid:  '/Technical/OverboughtSold/RSI/RSICrossAbvCentralLine'},
{Label:"RSI (F) OS for > 3 Period",id:"rsiOversoldWait", colLabel1 : 'RSI (F)'  , addiInfo :'tech:OverBoughtOversold:RSI' , pid:  '/Technical/OverboughtSold/RSI/RSIOSForMoreThan3Days'},

// RSI Smooth Indicator 



{Label:"Over Bought By RSI",id:"rsiSmoothOverbought" , colLabel1 : 'RSI'    , addiInfo :'tech:OverBoughtOversold:RsiSmooth' , pid:  '/Technical/OverboughtSold/RSISmooth/RSISmoothOverbought'},
{Label:"RSI OB falling RSI",id:"rsiSmoothFalling"  , colLabel1 : 'RSI' , addiInfo :'tech:OverBoughtOversold:RsiSmooth' , pid:  '/Technical/OverboughtSold/RSISmooth/OBFallingRSISmooth'},
{Label:"RSI Cross Below center line",id:"rsiSmoothBlwCentralLine"  , colLabel1 : 'RSI' , addiInfo :'tech:OverBoughtOversold:RsiSmooth' , pid:  '/Technical/OverboughtSold/RSISmooth/RSISmoothCrossBelowCenterLine'},
{Label:"RSI OB for > 3 Period",id:"rsiSmoothOverboughtWait"  , colLabel1 : 'RSI' , addiInfo :'tech:OverBoughtOversold:RsiSmooth' , pid:  '/Technical/OverboughtSold/RSISmooth/RSISmoothOBForMoreThan3Days'},
{Label:"Over Sold By RSI",id:"rsiSmoothOversold", def: false  , colLabel1 : 'RSI' , addiInfo :'tech:OverBoughtOversold:RsiSmooth' , pid:  '/Technical/OverboughtSold/RSISmooth/RSISmoothOversold'},
{Label:"Rising RSI",id:"rsiSmoothRising"  , colLabel1 : 'RSI' , addiInfo :'tech:OverBoughtOversold:RsiSmooth' , pid:  '/Technical/OverboughtSold/RSISmooth/RisingRSISmooth'},
{Label:"RSI Cross Abv Central Line",id:"rsiSmoothAboveCentralLine"  , colLabel1 : 'RSI' , addiInfo :'tech:OverBoughtOversold:RsiSmooth' , pid:  '/Technical/OverboughtSold/RSISmooth/RSISmoothCrossAbvCentralLine'},
{Label:"RSI OS for > 3 Period",id:"rsiSmoothOversoldWait"  , colLabel1 : 'RSI' , addiInfo :'tech:OverBoughtOversold:RsiSmooth' , pid:  '/Technical/OverboughtSold/RSISmooth/RSISmoothOSForMoreThan3Days'},



// ADX Indicator 


{Label:"ADX Mild Trending Stocks",id:"adxMildTrending"  , colLabel1 : 'ADX'  , addiInfo :'tech:TechnicalIndicators:9100' , pid:  '/Technical/TrendIndicator/ADX/ADXMildTrendingStocks'},
{Label:"ADX Trending Stocks",id:"adxTrending" , colLabel1 : 'ADX'  , addiInfo :'tech:TechnicalIndicators:9100' , pid:  '/Technical/TrendIndicator/ADX/ADXTrendingStocks'},
{Label:"ADX Strong Trending Stocks",id:"adxStrongTrending"  , def: false , colLabel1 : 'ADX'  , addiInfo :'tech:TechnicalIndicators:9100' , pid:  '/Technical/TrendIndicator/ADX/ADXStrongTrendingStocks'},
{Label:"ADX +DI Cross Above - DI",id:"adxPlusDiAbvMinus" , colLabel1 : 'ADX'  , addiInfo :'tech:TechnicalIndicators:9100' , pid:  '/Technical/TrendIndicator/ADX/PDICrossAboveMDI'},
{Label:"ADX -DI Cross Above + DI",id:"adxMinusDiAbvMinus" , colLabel1 : 'ADX'  , addiInfo :'tech:TechnicalIndicators:9100' , pid:  '/Technical/TrendIndicator/ADX/PDICrossBelowMDI'},


// williams % R




{Label:"Over Bought By Williams %R",id:"williamsROverbought"  , colLabel1 : 'WIlliam %R' , addiInfo :'tech:OverBoughtOversold:WilliamsR' , pid:  '/Technical/OverboughtSold/WilliamsR/WilliamsROverbought'},
{Label:"OB falling Williams %R",id:"williamsRFalling"  , colLabel1 : 'WIlliam %R' , addiInfo :'tech:OverBoughtOversold:WilliamsR' , pid:  '/Technical/OverboughtSold/WilliamsR/OBFallingWilliamsR'},
{Label:"W%R Cross Below center line",id:"williamsRBlwCentralLine"  , colLabel1 : 'WIlliam %R' , addiInfo :'tech:OverBoughtOversold:WilliamsR' , pid:  '/Technical/OverboughtSold/WilliamsR/WilliamsRCrossBelowCenterLine'},
{Label:"W%R OB for > 3 Period",id:"williamsROverboughtWait"  , colLabel1 : 'WIlliam %R' , addiInfo :'tech:OverBoughtOversold:WilliamsR' , pid:  '/Technical/OverboughtSold/WilliamsR/WilliamsROBForMoreThan3Days'},
{Label:"Over Sold By Williams %R",id:"williamsROversold"  , colLabel1 : 'WIlliam %R' , addiInfo :'tech:OverBoughtOversold:WilliamsR' , pid:  '/Technical/OverboughtSold/WilliamsR/WilliamsROverSold'},
{Label:"Rising Williams %R",id:"williamsRRising"  , colLabel1 : 'WIlliam %R' , addiInfo :'tech:OverBoughtOversold:WilliamsR' , pid:  '/Technical/OverboughtSold/WilliamsR/RisingWilliamsR'},
{Label:"W%R Cross Abv Central Line",id:"williamsRAboveCentralLine"  , colLabel1 : 'WIlliam %R' , addiInfo :'tech:OverBoughtOversold:WilliamsR' , pid:  '/Technical/OverboughtSold/WilliamsR/WilliamsRCrossingAboveCentralLine'},
{Label:"W%R OS for > 3 Period",id:"williamsROversoldWait"  , colLabel1 : 'WIlliam %R', addiInfo :'tech:OverBoughtOversold:WilliamsR' , pid:  '/Technical/OverboughtSold/WilliamsR/WilliamsROversoldForMoreThan3Days'},


// CMF Indicator 



{Label:"Very Strong Buying Pressure (CMF)",id:"cmfVeryStrongBuyingPress" , def: false  , colLabel1 : 'CMF'  , addiInfo :'tech:TechnicalIndicators:ChaikinMoneyFlow' , pid:  '/Technical/VolumeBasedIndicator/ChaikinMoneyFlow/CMFVeryStrongBuyingPressure'},
{Label:"Strong Buying Pressure (CMF)",id:"cmfStrongBuyingPress"  , colLabel1 : 'CMF'   , addiInfo :'tech:TechnicalIndicators:ChaikinMoneyFlow' , pid:  '/Technical/VolumeBasedIndicator/ChaikinMoneyFlow/CMFStrongBuyingPressure'},
{Label:"Some Buying Pressure (CMF)",id:"cmfSomeBuyingPress"  , colLabel1 : 'CMF'   , addiInfo :'tech:TechnicalIndicators:ChaikinMoneyFlow' , pid:  '/Technical/VolumeBasedIndicator/ChaikinMoneyFlow/CMFSomeBuyingPressure'},
{Label:"Some Selling Pressure (CMF)",id:"cmfSomeSellingPress"  , colLabel1 : 'CMF'   , addiInfo :'tech:TechnicalIndicators:ChaikinMoneyFlow' , pid:  '/Technical/VolumeBasedIndicator/ChaikinMoneyFlow/CMFSomeSellingPressure'},
{Label:"Strong Selling Pressure (CMF)",id:"cmfStrongSellingPress"  , colLabel1 : 'CMF'   , addiInfo :'tech:TechnicalIndicators:ChaikinMoneyFlow' , pid:  '/Technical/VolumeBasedIndicator/ChaikinMoneyFlow/CMFStrongSellingPressure'},
{Label:"Very Strong Selling Pressure (CMF)",id:"cmfVeryStrongSellingPress"  , colLabel1 : 'CMF'   , addiInfo :'tech:TechnicalIndicators:ChaikinMoneyFlow' , pid:  '/Technical/VolumeBasedIndicator/ChaikinMoneyFlow/CMFVeryStrongSellingPressure'},
{Label:"Bullish Trend Change (CMF)",id:"cmfAbvZero" ,  colLabel1 : 'CMF'   , addiInfo :'tech:TechnicalIndicators:ChaikinMoneyFlow' , pid:  '/Technical/VolumeBasedIndicator/ChaikinMoneyFlow/CMFBullishTrendChange'},
{Label:"Bearish Trend Change (CMF)",id:"cmfBlwZero"  , colLabel1 : 'CMF'   , addiInfo :'tech:TechnicalIndicators:ChaikinMoneyFlow' , pid:  '/Technical/VolumeBasedIndicator/ChaikinMoneyFlow/CMFBearishTrendChange'},



// PSAR Indicator




{Label:"Price Above PSAR ",id:"psarBlwPrice"   , colLabel1 : 'PSAR'   , addiInfo :'tech:TechnicalIndicators:ParabolicSAR', pid: '/Technical/Overlays/ParabolicSAR/PriceAbovePSAR'},
{Label:"Price Below PSAR ",id:"psarAbvPrice"   , colLabel1 : 'PSAR'   , addiInfo :'tech:TechnicalIndicators:ParabolicSAR', pid: '/Technical/Overlays/ParabolicSAR/PriceBelowPSAR'},
{Label:"PSAR Bullish Reversal",id:"psarPriceAbvCo" , def: false   , colLabel1 : 'PSAR'   , addiInfo :'tech:TechnicalIndicators:ParabolicSAR', pid: '/Technical/Overlays/ParabolicSAR/PSARBullishReversal'},
{Label:"PSAR Bearish Reversal",id:"psarPriceBlwCo"   , colLabel1 : 'PSAR'   , addiInfo :'tech:TechnicalIndicators:ParabolicSAR', pid: '/Technical/Overlays/ParabolicSAR/PSARBearishReversal'},


// Supertrend Indicator 



{Label:"Price Above Supertrend ",id:"stBlwPrice"   , colLabel1 : 'Supertrend'  , addiInfo :'tech:TechnicalIndicators:Supertrend', pid: '/Technical/TrendIndicator/Supertrend/PriceAboveSupertrend'},
{Label:"Price Below Supertrend ",id:"stAbvPrice"  , colLabel1 : 'Supertrend'  , addiInfo :'tech:TechnicalIndicators:Supertrend', pid: '/Technical/TrendIndicator/Supertrend/PriceBelowSupertrend'},
{Label:"Supertrend Bullish Reversal",id:"stPriceAbvCo" , def: false  , colLabel1 : 'Supertrend'  , addiInfo :'tech:TechnicalIndicators:Supertrend', pid: '/Technical/TrendIndicator/Supertrend/SupertrendBullishReversal'},
{Label:"Supertrend Bearish Reversal",id:"stPriceBlwCo"  , colLabel1 : 'Supertrend'  , addiInfo :'tech:TechnicalIndicators:Supertrend', pid: '/Technical/TrendIndicator/Supertrend/SupertrendBearishReversal'},



// Ichimoku Indicator 




{Label:"Price Above Ichimoku Cloud",id:"ichimokuPriceAbvCloud" , def: false    , colLabel1 : 'Lead Span A' ,  colLabel2 : 'Lead Span B'  , addiInfo :'tech:TechnicalIndicators:IchimokuCloud', pid: '/Technical/Overlays/IchimokuCloud/PriceAboveIchimokuCloud'},
{Label:"Price Below Ichimoku Cloud",id:"ichimokuPriceBlwCloud"   , colLabel1 : 'Lead Span A' ,  colLabel2 : 'Lead Span B'  , addiInfo :'tech:TechnicalIndicators:IchimokuCloud', pid: '/Technical/Overlays/IchimokuCloud/PriceBelowIchimokuCloud'},
{Label:"Price Within Ichimoku Cloud",id:"ichimokuPriceInsideCloud"   , colLabel1 : 'Lead Span A' ,  colLabel2 : 'Lead Span B'  , addiInfo :'tech:TechnicalIndicators:IchimokuCloud', pid: '/Technical/Overlays/IchimokuCloud/PriceWithinIchimokuCloud'},
{Label:"Price Cross Above Ichimoku Cloud",id:"ichimokuPriceAbvCloudCO"   , colLabel1 : 'Lead Span A' ,  colLabel2 : 'Lead Span B'  , addiInfo :'tech:TechnicalIndicators:IchimokuCloud', pid: '/Technical/Overlays/IchimokuCloud/PriceCrossAboveIchimokuCloud'},
{Label:"Price Cross Below Ichimoku Cloud",id:"ichimokuPriceBlwCloudCO"  , colLabel1 : 'Lead Span A' ,  colLabel2 : 'Lead Span B'  , addiInfo :'tech:TechnicalIndicators:IchimokuCloud', pid: '/Technical/Overlays/IchimokuCloud/PriceCrossBelowIchimokuCloud'},
{Label:"Ichimoku Leading SpanA Cross Above Leading SpanB",id:"ichimokuLsaAbvLsbCO"   , colLabel1 : 'Lead Span A' ,  colLabel2 : 'Lead Span B'  , addiInfo :'tech:TechnicalIndicators:IchimokuCloud', pid: '/Technical/Overlays/IchimokuCloud/IchimokuLSACrossAboveLSB'},
{Label:"Ichimoku Leading SpanA Cross Below Leading SpanB",id:"ichimokuLsaBlwLsbCO"   , colLabel1 : 'Lead Span A' ,  colLabel2 : 'Lead Span B'  , addiInfo :'tech:TechnicalIndicators:IchimokuCloud', pid: '/Technical/Overlays/IchimokuCloud/IchimokuLSACrossBelowLSB'},
{Label:"Ichimoku Leading SpanA Above Leading SpanB",id:"ichimokuLsaAbvLsb"  , colLabel1 : 'Lead Span A' ,  colLabel2 : 'Lead Span B'  , addiInfo :'tech:TechnicalIndicators:IchimokuCloud', pid: '/Technical/Overlays/IchimokuCloud/IchimokuLSAAboveLSB'},
{Label:"Ichimoku Leading SpanA Below Leading SpanB",id:"ichimokuLsaBlwLsb"  , colLabel1 : 'Lead Span A' ,  colLabel2 : 'Lead Span B' , addiInfo :'tech:TechnicalIndicators:IchimokuCloud', pid: '/Technical/Overlays/IchimokuCloud/IchimokuLSABelowLSB'},



// CCI Indicator 




{Label:"Over Bought By CCI", id:"cciOverbought" , colLabel1 : 'CCI'  , addiInfo :'tech:OverBoughtOversold:CommodityChannelIndex' , pid: '/Technical/OverboughtSold/CommodityChannelIndex/CCIOverbought'},
{Label:"OB falling CCI",id:"cciFalling"  , colLabel1 : 'CCI'  , addiInfo :'tech:OverBoughtOversold:CommodityChannelIndex' , pid: '/Technical/OverboughtSold/CommodityChannelIndex/OBFallingCCI'},
{Label:"CCI Cross Below center line",id:"cciBlwCentralLine"  , colLabel1 : 'CCI'  , addiInfo :'tech:OverBoughtOversold:CommodityChannelIndex' , pid: '/Technical/OverboughtSold/CommodityChannelIndex/CCICrossBelowCenterLine'},
{Label:"OB for > 3 Period",id:"cciOverboughtWait"  , colLabel1 : 'CCI'  , addiInfo :'tech:OverBoughtOversold:CommodityChannelIndex' , pid: '/Technical/OverboughtSold/CommodityChannelIndex/CCIOBForMoreThan3Days'},
{Label:"Over Sold By CCI",id:"cciOversold"  , colLabel1 : 'CCI'  , addiInfo :'tech:OverBoughtOversold:CommodityChannelIndex' , pid: '/Technical/OverboughtSold/CommodityChannelIndex/CCIOversold'},
{Label:"Rising CCI",id:"cciRising"  , colLabel1 : 'CCI'  , addiInfo :'tech:OverBoughtOversold:CommodityChannelIndex' , pid: '/Technical/OverboughtSold/CommodityChannelIndex/RisingCCI'},
{Label:"CCI Cross Abv Central Line",id:"cciAboveCentralLine"  , colLabel1 : 'CCI'  , addiInfo :'tech:OverBoughtOversold:CommodityChannelIndex' , pid: '/Technical/OverboughtSold/CommodityChannelIndex/CCICrossingAboveCentralLine'},
{Label:"CCI OS for > 3 Period",id:"cciOversoldWait"  , colLabel1 : 'CCI'  , addiInfo :'tech:OverBoughtOversold:CommodityChannelIndex' , pid: '/Technical/OverboughtSold/CommodityChannelIndex/CCIOversoldForMoreThan3Days'},


// MFI Indicator 




{Label:"Over Bought By MFI",id:"mfiOverbought"  , colLabel1 : 'MFI'    , addiInfo :'tech:OverBoughtOversold:MoneyFlowIndex' , pid: '/Technical/OverboughtSold/MoneyFlowIndex/MFIOverbought'},
{Label:"OB falling MFI",id:"mfiFalling"  , colLabel1 : 'MFI'   , addiInfo :'tech:OverBoughtOversold:MoneyFlowIndex' , pid: '/Technical/OverboughtSold/MoneyFlowIndex/OBFallingMFI'},
{Label:"MFI Cross Below center line",id:"mfiBlwCentralLine"  , colLabel1 : 'MFI'   , addiInfo :'tech:OverBoughtOversold:MoneyFlowIndex' , pid: '/Technical/OverboughtSold/MoneyFlowIndex/MFICrossBelowCenterLine'},
{Label:"OB for > 3 Period",id:"mfiOverboughtWait"  , colLabel1 : 'MFI'   , addiInfo :'tech:OverBoughtOversold:MoneyFlowIndex' , pid: '/Technical/OverboughtSold/MoneyFlowIndex/MFIOBForMoreThan3Days'},
{Label:"Over Sold  By MFI",id:"mfiOversold"  , colLabel1 : 'MFI'   , addiInfo :'tech:OverBoughtOversold:MoneyFlowIndex' , pid: '/Technical/OverboughtSold/MoneyFlowIndex/MFIOverSold'},
{Label:"Rising MFI",id:"mfiRising"  , colLabel1 : 'MFI'   , addiInfo :'tech:OverBoughtOversold:MoneyFlowIndex' , pid: '/Technical/OverboughtSold/MoneyFlowIndex/RisingMFI'},
{Label:"MFI Cross Abv Central Line",id:"mfiAboveCentralLine"  , colLabel1 : 'MFI'   , addiInfo :'tech:OverBoughtOversold:MoneyFlowIndex' , pid: '/Technical/OverboughtSold/MoneyFlowIndex/MFICrossingAboveCentralLine'},
{Label:"MFI OS for > 3 Period",id:"mfiOversoldWait"  , colLabel1 : 'MFI'   , addiInfo :'tech:OverBoughtOversold:MoneyFlowIndex' , pid: '/Technical/OverboughtSold/MoneyFlowIndex/MFIOversoldForMoreThan3Days'},


// Stochastic Indicator




{Label:"Over Bought - Fast Sto",id:"fastStoOverbought" , colLabel1 : 'Fast Sto K' , addiInfo :'tech:OverBoughtOversold:StochaticFast', pid: '/Technical/OverboughtSold/FastStochastic/StochasticFastOverbought'},
{Label:"OB falling Sto(F)",id:"fastStoFalling"  , colLabel1 : 'Fast Sto K' , addiInfo :'tech:OverBoughtOversold:StochaticFast', pid: '/Technical/OverboughtSold/FastStochastic/OBFallingStochasticFast'},
{Label:"Sto(F) Cross Below center line",id:"fastStoBlwCentralLine"  , colLabel1 : 'Fast Sto K' , addiInfo :'tech:OverBoughtOversold:StochaticFast', pid: '/Technical/OverboughtSold/FastStochastic/StochasticFastCrossBelowCenterLine'},
{Label:"Sto(F) OB for > 3 Period",id:"fastStoOverboughtWait"  , colLabel1 : 'Fast Sto K' , addiInfo :'tech:OverBoughtOversold:StochaticFast', pid: '/Technical/OverboughtSold/FastStochastic/StochasticFastOBForMoreThan3Days'},
{Label:"Over Sold - Fast Sto",id:"fastStoOversold"  , colLabel1 : 'Fast Sto K' , addiInfo :'tech:OverBoughtOversold:StochaticFast', pid: '/Technical/OverboughtSold/FastStochastic/StochasticFastOversold'},
{Label:"Rising Sto(F)",id:"fastStoRising"  , colLabel1 : 'Fast Sto K' , addiInfo :'tech:OverBoughtOversold:StochaticFast', pid: '/Technical/OverboughtSold/FastStochastic/RisingStochasticFast'},
{Label:"STO (F) Cross Abv Central Line",id:"fastStoAboveCentralLine"  , colLabel1 : 'Fast Sto K' , addiInfo :'tech:OverBoughtOversold:StochaticFast', pid: '/Technical/OverboughtSold/FastStochastic/StochasticFastCrossingAboveCentralLine'},
{Label:"Sto(F) OS for > 3 Period",id:"fastStoOversoldWait"  , colLabel1 : 'Fast Sto K' , addiInfo :'tech:OverBoughtOversold:StochaticFast', pid: '/Technical/OverboughtSold/FastStochastic/StochasticFastOversoldForMoreThan3Days'},




//  Slow Stochastic Indicator





{Label:"Over Bought - Slow Sto",id:"slowStoOverbought"  , colLabel1 : 'Slow Sto K'   , addiInfo :'tech:OverBoughtOversold:StochaticSlow' , pid: '/Technical/OverboughtSold/SlowStochastic/StochasticSlowOverbought'},
{Label:"OB falling Sto(S)",id:"slowStoFalling"   , colLabel1 : 'Slow Sto K'   , addiInfo :'tech:OverBoughtOversold:StochaticSlow' , pid: '/Technical/OverboughtSold/SlowStochastic/OBFallingStochasticSlow'},
{Label:"Sto(S) Cross Below center line",id:"slowStoBlwCentralLine"   , colLabel1 : 'Slow Sto K'   , addiInfo :'tech:OverBoughtOversold:StochaticSlow' , pid: '/Technical/OverboughtSold/SlowStochastic/StochasticSlowCrossBelowCenterLine'},
{Label:"Sto(S) OB for > 3 Period",id:"slowStoOverboughtWait"   , colLabel1 : 'Slow Sto K'  , addiInfo :'tech:OverBoughtOversold:StochaticSlow'  , pid: '/Technical/OverboughtSold/SlowStochastic/StochasticSlowOBForMoreThan3Days'},
{Label:"Over Sold - Slow Sto",id:"slowStoOversold"   , colLabel1 : 'Slow Sto K'   , addiInfo :'tech:OverBoughtOversold:StochaticSlow' , pid: '/Technical/OverboughtSold/SlowStochastic/StochasticSlowOversold'},
{Label:"Rising Sto(S)",id:"slowStoRising"   , colLabel1 : 'Slow Sto K'   , addiInfo :'tech:OverBoughtOversold:StochaticSlow' , pid: '/Technical/OverboughtSold/SlowStochastic/RisingStochasticSlow'},
{Label:"Sto (S) Cross Abv Central Line",id:"slowStoAboveCentralLine"   , colLabel1 : 'Slow Sto K'   , addiInfo :'tech:OverBoughtOversold:StochaticSlow' , pid: '/Technical/OverboughtSold/SlowStochastic/StochasticSlowCrossingAboveCentralLine'},
{Label:"Sto(S) OS for > 3 Period",id:"slowStoOversoldWait"   , colLabel1 : 'Slow Sto K'  , addiInfo :'tech:OverBoughtOversold:StochaticSlow'  , pid: '/Technical/OverboughtSold/SlowStochastic/StochasticSlowOversoldForMoreThan3Days'},




// Price Cross Above SMA




{Label:"Price Cross Abv 5 SMA",id:"5_priceSmaCoBull_sma"   , colLabel1 : '5 SMA'    , addiInfo :'tech:SMA:priceSmaCoBull:5', pid: '/Technical/SMAScreener/PriceCrossAboveSMA/PriceCrossAbv5SMA'},
{Label:"Price Cross Abv 10 SMA",id:"10_priceSmaCoBull_sma"  , colLabel1 : '10 SMA'   , addiInfo :'tech:SMA:priceSmaCoBull:10', pid: '/Technical/SMAScreener/PriceCrossAboveSMA/PriceCrossAbv10SMA'},
{Label:"Price Cross Abv 15 SMA",id:"15_priceSmaCoBull_sma"  , colLabel1 : '15 SMA'   , addiInfo :'tech:SMA:priceSmaCoBull:15', pid: '/Technical/SMAScreener/PriceCrossAboveSMA/PriceCrossAbv15SMA'},
{Label:"Price Cross Abv 20 SMA",id:"20_priceSmaCoBull_sma"  , colLabel1 : '20 SMA'   , addiInfo :'tech:SMA:priceSmaCoBull:20' , pid: '/Technical/SMAScreener/PriceCrossAboveSMA/PriceCrossAbv20SMA'},
{Label:"Price Cross Abv 25 SMA",id:"25_priceSmaCoBull_sma"  , colLabel1 : '25 SMA'   , addiInfo :'tech:SMA:priceSmaCoBull:25', pid: '/Technical/SMAScreener/PriceCrossAboveSMA/PriceCrossAbv25SMA'},
{Label:"Price Cross Abv 30 SMA",id:"30_priceSmaCoBull_sma"  , colLabel1 : '30 SMA'   , addiInfo :'tech:SMA:priceSmaCoBull:30', pid: '/Technical/SMAScreener/PriceCrossAboveSMA/PriceCrossAbv30SMA'},
{Label:"Price Cross Abv 40 SMA",id:"40_priceSmaCoBull_sma"  , colLabel1 : '40 SMA'   , addiInfo :'tech:SMA:priceSmaCoBull:40', pid: '/Technical/SMAScreener/PriceCrossAboveSMA/PriceCrossAbv40SMA'},
{Label:"Price Cross Abv 50 SMA",id:"50_priceSmaCoBull_sma" , def: false  , colLabel1 : '50 SMA'  , addiInfo :'tech:SMA:priceSmaCoBull:50', pid: '/Technical/SMAScreener/PriceCrossAboveSMA/PriceCrossAbv50SMA'},
{Label:"Price Cross Abv 100 SMA",id:"100_priceSmaCoBull_sma"  , colLabel1 : '100 SMA'   , addiInfo :'tech:SMA:priceSmaCoBull:100', pid: '/Technical/SMAScreener/PriceCrossAboveSMA/PriceCrossAbv100SMA'},
{Label:"Price Cross Abv 200 SMA",id:"200_priceSmaCoBull_sma"  , colLabel1 : '200 SMA'   , addiInfo :'tech:SMA:priceSmaCoBull:200', pid: '/Technical/SMAScreener/PriceCrossAboveSMA/PriceCrossAbv200SMA'},




// Price Cross Above EMA




{Label:"Price Cross Abv 5 EMA",id:"5_priceEmaCoBull_ema"    , colLabel1 : '5 EMA'    , addiInfo :'tech:EMA:priceEmaCoBull:5', pid: '/Technical/EMAScreener/PriceCrossAboveEMA/PriceCrossAbv5EMA'},
{Label:"Price Cross Abv 10 EMA",id:"10_priceEmaCoBull_ema"   , colLabel1 : '10 EMA' , addiInfo :'tech:EMA:priceEmaCoBull:10', pid: '/Technical/EMAScreener/PriceCrossAboveEMA/PriceCrossAbv10EMA'},
{Label:"Price Cross Abv 15 EMA",id:"15_priceEmaCoBull_ema"   , colLabel1 : '15 EMA' , addiInfo :'tech:EMA:priceEmaCoBull:15', pid: '/Technical/EMAScreener/PriceCrossAboveEMA/PriceCrossAbv15EMA'},
{Label:"Price Cross Abv 20 EMA",id:"20_priceEmaCoBull_ema"   , colLabel1 : '20 EMA' , addiInfo :'tech:EMA:priceEmaCoBull:20', pid: '/Technical/EMAScreener/PriceCrossAboveEMA/PriceCrossAbv20EMA'},
{Label:"Price Cross Abv 25 EMA",id:"25_priceEmaCoBull_ema"   , colLabel1 : '25 EMA' , addiInfo :'tech:EMA:priceEmaCoBull:25', pid: '/Technical/EMAScreener/PriceCrossAboveEMA/PriceCrossAbv25EMA'},
{Label:"Price Cross Abv 30 EMA",id:"30_priceEmaCoBull_ema"   , colLabel1 : '30 EMA' , addiInfo :'tech:EMA:priceEmaCoBull:30', pid: '/Technical/EMAScreener/PriceCrossAboveEMA/PriceCrossAbv30EMA'},
{Label:"Price Cross Abv 40 EMA",id:"40_priceEmaCoBull_ema"   , colLabel1 : '40 EMA' , addiInfo :'tech:EMA:priceEmaCoBull:40', pid: '/Technical/EMAScreener/PriceCrossAboveEMA/PriceCrossAbv40EMA'},
{Label:"Price Cross Abv 50 EMA",id:"50_priceEmaCoBull_ema"   , colLabel1 : '50 EMA' , addiInfo :'tech:EMA:priceEmaCoBull:50', pid: '/Technical/EMAScreener/PriceCrossAboveEMA/PriceCrossAbv50EMA'},
{Label:"Price Cross Abv 100 EMA",id:"100_priceEmaCoBull_ema"   , colLabel1 : '100 EMA' , addiInfo :'tech:EMA:priceEmaCoBull:100', pid: '/Technical/EMAScreener/PriceCrossAboveEMA/PriceCrossAbv100EMA'},
{Label:"Price Cross Abv 200 EMA",id:"200_priceEmaCoBull_ema" ,  colLabel1 : '200 EMA' , addiInfo :'tech:EMA:priceEmaCoBull:200', pid: '/Technical/EMAScreener/PriceCrossAboveEMA/PriceCrossAbv200EMA'},





//  SMA Bullish Cross
  
  
  

{Label:"5 SMA Cross Abv 15",  id:"5-15_smaCoBull_sma" , colLabel1 : '5 SMA' , colLabel2 : '15 SMA', addiInfo :'tech:SMA:smaCoBull:5,15' , pid: '/Technical/SMAScreener/SMABullishCrossover/5SMACrossAbv15'},
{Label:"5 SMA Cross Abv 20",  id:"5-20_smaCoBull_sma"  , colLabel1 : '5 SMA' , colLabel2 : '20 SMA' , addiInfo :'tech:SMA:smaCoBull:5,20' , pid: '/Technical/SMAScreener/SMABullishCrossover/5SMACrossAbv20'},
{Label:"15 SMA Cross Abv 50",  id:"15-50_smaCoBull_sma" , colLabel1 : '15 SMA' , colLabel2 : '50 SMA' , addiInfo :'tech:SMA:smaCoBull:15,50', pid: '/Technical/SMAScreener/SMABullishCrossover/15SMACrossAbv50'},
{Label:"20 SMA Cross Abv 50",  id:"20-50_smaCoBull_sma"  , colLabel1 : '20 SMA' , colLabel2 : '50 SMA'  , addiInfo :'tech:SMA:smaCoBull:20,50', pid: '/Technical/SMAScreener/SMABullishCrossover/20SMACrossAbv50'},
{Label:"15 SMA Cross Abv 100", id:"15-100_smaCoBull_sma" ,   def: false  , colLabel1 : '15 SMA' , colLabel2 : '100 SMA' , addiInfo :'tech:SMA:smaCoBull:15,100', pid: '/Technical/SMAScreener/SMABullishCrossover/15SMACrossAbv100'},
{Label:"20 SMA Cross Abv 100", id:"20-100_smaCoBull_sma"  , colLabel1 : '20 SMA' , colLabel2 : '100 SMA' , addiInfo :'tech:SMA:smaCoBull:20,100', pid: '/Technical/SMAScreener/SMABullishCrossover/20SMACrossAbv100'},
{Label:"50 SMA Cross Abv 200",  id:"50-200_smaCoBull_sma"  , colLabel1 : '50 SMA' , colLabel2 : '200 SMA' , addiInfo :'tech:SMA:smaCoBull:50,200', pid: '/Technical/SMAScreener/SMABullishCrossover/50SMACrossAbv200'},





//  EMA Bullish Cross




{Label:"5 EMA Cross Abv 15",        id:"5-15_emaCoBull_ema"     , colLabel1 : '5 EMA' , colLabel2 : '15 EMA'  , addiInfo :'tech:EMA:emaCoBull:5,15'  , pid: '/Technical/EMAScreener/EMABullishCrossover/5EMACrossAbv15'},
{Label:"5 EMA Cross Abv 20",        id:"5-20_emaCoBull_ema"     , colLabel1 : '5 EMA' , colLabel2 : '20 EMA' , addiInfo :'tech:EMA:emaCoBull:5,20' , pid: '/Technical/EMAScreener/EMABullishCrossover/5EMACrossAbv20'},
{Label:"15 EMA Cross Abv 50",        id:"15-50_emaCoBull_ema"   , colLabel1 : '15 EMA' , colLabel2 : '50 EMA'  , addiInfo :'tech:EMA:emaCoBull:15,50' , pid: '/Technical/EMAScreener/EMABullishCrossover/15EMACrossAbv50'},
{Label:"20 EMA Cross Abv 50",        id:"20-50_emaCoBull_ema"    , colLabel1 : '20 EMA' , colLabel2 : '50 EMA'    , addiInfo :'tech:EMA:emaCoBull:20,50' , pid: '/Technical/EMAScreener/EMABullishCrossover/20EMACrossAbv50'},
{Label:"15 EMA Cross Abv 100",        id:"15-100_emaCoBull_ema"     ,  colLabel1 : '15 EMA' , colLabel2 : '100 EMA'  , addiInfo :'tech:EMA:emaCoBull:15,100'  , pid: '/Technical/EMAScreener/EMABullishCrossover/15EMACrossAbv100'},
{Label:"20 EMA Cross Abv 100",        id:"20-100_emaCoBull_ema"    , colLabel1 : '20 EMA' , colLabel2 : '100 EMA'   , addiInfo :'tech:EMA:emaCoBull:20,100' , pid: '/Technical/EMAScreener/EMABullishCrossover/20EMACrossAbv100'},
{Label:"50 EMA Cross Abv 200",        id:"50-200_emaCoBull_ema"    ,   colLabel1 : '50 EMA' , colLabel2 : '200 EMA' , addiInfo :'tech:EMA:emaCoBull:50,200' , pid: '/Technical/EMAScreener/EMABullishCrossover/50EMACrossAbv200'},






// Price Cross Below SMA




{Label:"5 SMA Cross BLW 15",  id:"5-15_smaCoBear_sma" ,   colLabel1 : '5 SMA' , colLabel2 : '15 SMA'  , addiInfo :'tech:SMA:smaCoBear:5,15', pid: '/Technical/SMAScreener/SMABearishCrossover/5SMACrossBlw15'},
{Label:"5 SMA Cross BLW 20",  id:"5-20_smaCoBear_sma" , colLabel1 : '5 SMA' , colLabel2 : '20 SMA' , addiInfo :'tech:SMA:smaCoBear:5,20', pid: '/Technical/SMAScreener/SMABearishCrossover/5SMACrossBlw20'},
{Label:"15 SMA Cross BLW 50",  id:"15-50_smaCoBear_sma" , colLabel1 : '15 SMA' , colLabel2 : '50 SMA' , addiInfo :'tech:SMA:smaCoBear:15,50', pid: '/Technical/SMAScreener/SMABearishCrossover/15SMACrossBlw50'},
{Label:"20 SMA Cross BLW 50",  id:"20-50_smaCoBear_sma" , colLabel1 : '20 SMA' , colLabel2 : '50 SMA' , addiInfo :'tech:SMA:smaCoBear:20,50', pid: '/Technical/SMAScreener/SMABearishCrossover/20SMACrossBlw50'},
{Label:"15 SMA Cross BLW 100", id:"15-100_smaCoBear_sma" , colLabel1 : '15 SMA' , colLabel2 : '100 SMA'  , addiInfo :'tech:SMA:smaCoBear:15,100', pid: '/Technical/SMAScreener/SMABearishCrossover/15SMACrossBlw100'},
{Label:"20 SMA Cross BLW 100", id:"20-100_smaCoBear_sma" , colLabel1 : '20 SMA' , colLabel2 : '100 SMA' , addiInfo :'tech:SMA:smaCoBear:20,100', pid: '/Technical/SMAScreener/SMABearishCrossover/20SMACrossBlw100'},
{Label:"50 SMA Cross BLW 200",  id:"50-200_smaCoBear_sma",  colLabel1 : '50 SMA' , colLabel2 : '200 SMA' , addiInfo :'tech:SMA:smaCoBear:50,200' , pid: '/Technical/SMAScreener/SMABearishCrossover/50SMACrossBlw200'},






// Price Cross Below EMA





{Label:"5 EMA Cross Blw 15",        id:"5-15_emaCoBear_ema"    , colLabel1 : '5 EMA' , colLabel2 : '15 EMA'   , addiInfo :'tech:EMA:emaCoBear:5,15'   , pid: '/Technical/EMAScreener/EMABearishCrossover/5EMACrossBlw15'},
{Label:"5 EMA Cross Blw 20",        id:"5-20_emaCoBear_ema"     , colLabel1 : '5 EMA' , colLabel2 : '20 EMA'   , addiInfo :'tech:EMA:emaCoBear:5,20'   , pid: '/Technical/EMAScreener/EMABearishCrossover/5EMACrossBlw20'},
{Label:"15 EMA Cross Blw 50",        id:"15-50_emaCoBear_ema"     , colLabel1 : '15 EMA' , colLabel2 : '50 EMA'   , addiInfo :'tech:EMA:emaCoBear:15,50'   , pid: '/Technical/EMAScreener/EMABearishCrossover/15EMACrossBlw50'},
{Label:"20 EMA Cross Blw 50",        id:"20-50_emaCoBear_ema"      , colLabel1 : '20 EMA' , colLabel2 : '50 EMA'     , addiInfo :'tech:EMA:emaCoBear:20,50'   , pid: '/Technical/EMAScreener/EMABearishCrossover/20EMACrossBlw50'},
{Label:"15 EMA Cross Blw 100",        id:"15-100_emaCoBear_ema"      ,  colLabel1 : '15 EMA' , colLabel2 : '100 EMA'  , addiInfo :'tech:EMA:emaCoBear:15,100'      , pid: '/Technical/EMAScreener/EMABearishCrossover/15EMACrossBlw100'},
{Label:"20 EMA Cross Blw 100",        id:"20-100_emaCoBear_ema"    , colLabel1 : '20 EMA' , colLabel2 : '100 EMA'  , addiInfo :'tech:EMA:emaCoBear:20,100'     , pid: '/Technical/EMAScreener/EMABearishCrossover/20EMACrossBlw100'},
{Label:"50 EMA Cross Blw 200",        id:"50-200_emaCoBear_ema"   , colLabel1 : '50 EMA' , colLabel2 : '200 EMA'    , addiInfo :'tech:EMA:emaCoBear:50,200'     , pid: '/Technical/EMAScreener/EMABearishCrossover/50EMACrossBlw200'},






// Price Below SMA




{Label:"Price Cross Blw 5 SMA",id:"5_priceSmaCoBear_sma",  colLabel1 : '5 SMA' ,  addiInfo :'tech:SMA:priceSmaCoBear:5', pid: '/Technical/SMAScreener/PriceCrossBelowSMA/PriceCrossBlw5SMA'},
{Label:"Price Cross Blw 10 SMA",id:"10_priceSmaCoBear_sma", colLabel1 : '10 SMA'  ,  addiInfo :'tech:SMA:priceSmaCoBear:10', pid: '/Technical/SMAScreener/PriceCrossBelowSMA/PriceCrossBlw10SMA'},
{Label:"Price Cross Blw 15 SMA",id:"15_priceSmaCoBear_sma",colLabel1 : '15 SMA'   ,  addiInfo :'tech:SMA:priceSmaCoBear:15', pid: '/Technical/SMAScreener/PriceCrossBelowSMA/PriceCrossBlw15SMA'},
{Label:"Price Cross Blw 20 SMA",id:"20_priceSmaCoBear_sma", colLabel1 : '20 SMA'  ,  addiInfo :'tech:SMA:priceSmaCoBear:20', pid: '/Technical/SMAScreener/PriceCrossBelowSMA/PriceCrossBlw20SMA'},
{Label:"Price Cross Blw 25 SMA",id:"25_priceSmaCoBear_sma", colLabel1 : '25 SMA'  ,  addiInfo :'tech:SMA:priceSmaCoBear:25', pid: '/Technical/SMAScreener/PriceCrossBelowSMA/PriceCrossBlw25SMA'},
{Label:"Price Cross Blw 30 SMA",id:"30_priceSmaCoBear_sma", colLabel1 : '30 SMA' ,  addiInfo :'tech:SMA:priceSmaCoBear:30', pid: '/Technical/SMAScreener/PriceCrossBelowSMA/PriceCrossBlw30SMA'},
{Label:"Price Cross Blw 40 SMA",id:"40_priceSmaCoBear_sma", colLabel1 : '40 SMA'  ,  addiInfo :'tech:SMA:priceSmaCoBear:40', pid: '/Technical/SMAScreener/PriceCrossBelowSMA/PriceCrossBlw40SMA'},
{Label:"Price Cross Blw 50 SMA",id:"50_priceSmaCoBear_sma" , colLabel1 : '50 SMA'  ,  addiInfo :'tech:SMA:priceSmaCoBear:50' , pid: '/Technical/SMAScreener/PriceCrossBelowSMA/PriceCrossBlw50SMA'},
{Label:"Price Cross Blw 100 SMA",id:"100_priceSmaCoBear_sma", colLabel1 : '100 SMA'  ,  addiInfo :'tech:SMA:priceSmaCoBear:100', pid: '/Technical/SMAScreener/PriceCrossBelowSMA/PriceCrossBlw100SMA'},
{Label:"Price Cross Blw 200 SMA",id:"200_priceSmaCoBear_sma",colLabel1 : '200 SMA'  ,  addiInfo :'tech:SMA:priceSmaCoBear:200', pid: '/Technical/SMAScreener/PriceCrossBelowSMA/PriceCrossBlw200SMA'},







// Price Below EMA





{Label:"Price Cross Blw 5 EMA",id:"5_priceEmaCoBear_ema"    ,  colLabel1 : '5 EMA'  ,  addiInfo :'tech:EMA:priceEmaCoBear:5', pid: 'Technical/EMAScreener/PriceCrossBelowEMA/PriceCrossBlw5EMA'},
{Label:"Price Cross Blw 10 EMA",id:"10_priceEmaCoBear_ema"   ,  colLabel1 : '10 EMA' ,  addiInfo :'tech:EMA:priceEmaCoBear:10' , pid: 'Technical/EMAScreener/PriceCrossBelowEMA/PriceCrossBlw10EMA'},
{Label:"Price Cross Blw 15 EMA",id:"15_priceEmaCoBear_ema"    ,  colLabel1 : '15 EMA' ,  addiInfo :'tech:EMA:priceEmaCoBear:15', pid: 'Technical/EMAScreener/PriceCrossBelowEMA/PriceCrossBlw15EMA'},
{Label:"Price Cross Blw 20 EMA",id:"20_priceEmaCoBear_ema"    ,  colLabel1 : '20 EMA' ,  addiInfo :'tech:EMA:priceEmaCoBear:20', pid: 'Technical/EMAScreener/PriceCrossBelowEMA/PriceCrossBlw20EMA'},
{Label:"Price Cross Blw 25 EMA",id:"25_priceEmaCoBear_ema"    ,  colLabel1 : '25 EMA' ,  addiInfo :'tech:EMA:priceEmaCoBear:25', pid: 'Technical/EMAScreener/PriceCrossBelowEMA/PriceCrossBlw25EMA'},
{Label:"Price Cross Blw 30 EMA",id:"30_priceEmaCoBear_ema"   ,  colLabel1 : '30 EMA' ,  addiInfo :'tech:EMA:priceEmaCoBear:30', pid: 'Technical/EMAScreener/PriceCrossBelowEMA/PriceCrossBlw30EMA'},
{Label:"Price Cross Blw 40 EMA",id:"40_priceEmaCoBear_ema"   ,  colLabel1 : '40 EMA' ,  addiInfo :'tech:EMA:priceEmaCoBear:40', pid: 'Technical/EMAScreener/PriceCrossBelowEMA/PriceCrossBlw40EMA'},
{Label:"Price Cross Blw 50 EMA",id:"50_priceEmaCoBear_ema"   ,  colLabel1 : '50 EMA' ,  addiInfo :'tech:EMA:priceEmaCoBear:50', pid: 'Technical/EMAScreener/PriceCrossBelowEMA/PriceCrossBlw50EMA'},
{Label:"Price Cross Blw 100 EMA",id:"100_priceEmaCoBear_ema"   ,  colLabel1 : '100 EMA' ,  addiInfo :'tech:EMA:priceEmaCoBear:100', pid: 'Technical/EMAScreener/PriceCrossBelowEMA/PriceCrossBlw100EMA'},
{Label:"Price Cross Blw 200 EMA",id:"200_priceEmaCoBear_ema"   ,  colLabel1 : '200 EMA' ,  addiInfo :'tech:EMA:priceEmaCoBear:200', pid: 'Technical/EMAScreener/PriceCrossBelowEMA/PriceCrossBlw200EMA'},






// Price Just Above SMA




{Label:"Price Just Abv 5 SMA",id:"5_priceNearSmaBull_sma", colLabel1 : '5 SMA'  ,  addiInfo :'tech:SMA:priceNearSmaBull:5', pid: '/Technical/SMAScreener/PriceJustAboveSMA/PriceJustAbv5SMA'},
{Label:"Price Just Abv 10 SMA",id:"10_priceNearSmaBull_sma" , colLabel1 : '10 SMA'  ,  addiInfo :'tech:SMA:priceNearSmaBull:10', pid: '/Technical/SMAScreener/PriceJustAboveSMA/PriceJustAbv10SMA'},
{Label:"Price Just Abv 15 SMA",id:"15_priceNearSmaBull_sma" , colLabel1 : '15 SMA',  addiInfo :'tech:SMA:priceNearSmaBull:15', pid: '/Technical/SMAScreener/PriceJustAboveSMA/PriceJustAbv15SMA'},
{Label:"Price Just Abv 20 SMA",id:"20_priceNearSmaBull_sma" , colLabel1 : '20 SMA',  addiInfo :'tech:SMA:priceNearSmaBull:20', pid: '/Technical/SMAScreener/PriceJustAboveSMA/PriceJustAbv20SMA'},
{Label:"Price Just Abv 25 SMA",id:"25_priceNearSmaBull_sma" , colLabel1 : '25 SMA',  addiInfo :'tech:SMA:priceNearSmaBull:25', pid: '/Technical/SMAScreener/PriceJustAboveSMA/PriceJustAbv25SMA'},
{Label:"Price Just Abv 30 SMA",id:"30_priceNearSmaBull_sma" , colLabel1 : '30 SMA',  addiInfo :'tech:SMA:priceNearSmaBull:30', pid: '/Technical/SMAScreener/PriceJustAboveSMA/PriceJustAbv30SMA'},
{Label:"Price Just Abv 40 SMA",id:"40_priceNearSmaBull_sma" , colLabel1 : '40 SMA',  addiInfo :'tech:SMA:priceNearSmaBull:40', pid: '/Technical/SMAScreener/PriceJustAboveSMA/PriceJustAbv40SMA'},
{Label:"Price Just Abv 50 SMA",id:"50_priceNearSmaBull_sma" , colLabel1 : '50 SMA',  addiInfo :'tech:SMA:priceNearSmaBull:50', pid: '/Technical/SMAScreener/PriceJustAboveSMA/PriceJustAbv50SMA'},
{Label:"Price Just Abv 100 SMA",id:"100_priceNearSmaBull_sma" , colLabel1 : '100 SMA',  addiInfo :'tech:SMA:priceNearSmaBull:100', pid: '/Technical/SMAScreener/PriceJustAboveSMA/PriceJustAbv100SMA'},
{Label:"Price Just Abv 200 SMA",id:"200_priceNearSmaBull_sma" , colLabel1 : '200 SMA',  addiInfo :'tech:SMA:priceNearSmaBull:200', pid: '/Technical/SMAScreener/PriceJustAboveSMA/PriceJustAbv200SMA'},





// Price Just Above EMA




{Label:"Price Just Abv 5 EMA",        id:"5_priceNearEmaBull_ema"    , colLabel1 : '5 EMA'     ,  addiInfo :'tech:EMA:priceNearEmaBull:5' , pid: '/Technical/EMAScreener/PriceJustAboveEMA/PriceJustAbv5EMA'},
{Label:"Price Just Abv 10 EMA",        id:"10_priceNearEmaBull_ema"   , colLabel1 : '10 EMA'    ,  addiInfo :'tech:EMA:priceNearEmaBull:10' , pid: '/Technical/EMAScreener/PriceJustAboveEMA/PriceJustAbv10EMA'},
{Label:"Price Just Abv 15 EMA",        id:"15_priceNearEmaBull_ema"    ,  colLabel1 : '15 EMA'   ,  addiInfo :'tech:EMA:priceNearEmaBull:15' , pid: '/Technical/EMAScreener/PriceJustAboveEMA/PriceJustAbv15EMA'},
{Label:"Price Just Abv 20 EMA",        id:"20_priceNearEmaBull_ema"     ,  colLabel1 : '20 EMA'  ,  addiInfo :'tech:EMA:priceNearEmaBull:20', pid: '/Technical/EMAScreener/PriceJustAboveEMA/PriceJustAbv20EMA'},
{Label:"Price Just Abv 25 EMA",        id:"25_priceNearEmaBull_ema"    ,  colLabel1 : '25 EMA'   ,  addiInfo :'tech:EMA:priceNearEmaBull:25', pid: '/Technical/EMAScreener/PriceJustAboveEMA/PriceJustAbv25EMA'},
{Label:"Price Just Abv 30 EMA",        id:"30_priceNearEmaBull_ema"      ,  colLabel1 : '30 EMA'    ,  addiInfo :'tech:EMA:priceNearEmaBull:30', pid: '/Technical/EMAScreener/PriceJustAboveEMA/PriceJustAbv30EMA'},
{Label:"Price Just Abv 40 EMA",        id:"40_priceNearEmaBull_ema"      ,  colLabel1 : '40 EMA'  ,  addiInfo :'tech:EMA:priceNearEmaBull:40', pid: '/Technical/EMAScreener/PriceJustAboveEMA/PriceJustAbv40EMA'},
{Label:"Price Just Abv 50 EMA",        id:"50_priceNearEmaBull_ema"      ,  colLabel1 : '50 EMA'  ,  addiInfo :'tech:EMA:priceNearEmaBull:50', pid: '/Technical/EMAScreener/PriceJustAboveEMA/PriceJustAbv50EMA'},
{Label:"Price Just Abv 100 EMA",        id:"100_priceNearEmaBull_ema"      ,  colLabel1 : '100 EMA' ,  addiInfo :'tech:EMA:priceNearEmaBull:100', pid: '/Technical/EMAScreener/PriceJustAboveEMA/PriceJustAbv100EMA'},
{Label:"Price Just Abv 200 EMA",        id:"200_priceNearEmaBull_ema"     ,  colLabel1 : '200 EMA'  ,  addiInfo :'tech:EMA:priceNearEmaBull:200', pid: '/Technical/EMAScreener/PriceJustAboveEMA/PriceJustAbv200EMA'},






// Price Just Below SMA




{Label:"Price Just Blw 5 SMA",        id:"5_priceNearSmaBear_sma"   , colLabel1 : '5 SMA'   ,  addiInfo :'tech:SMA:priceNearSmaBear:5' , pid: '/Technical/SMAScreener/PriceJustBelowSMA/PriceJustBlw5SMA'},
{Label:"Price Just Blw 10 SMA",        id:"10_priceNearSmaBear_sma"  , colLabel1 : '10 SMA'   ,  addiInfo :'tech:SMA:priceNearSmaBear:10'    , pid: '/Technical/SMAScreener/PriceJustBelowSMA/PriceJustBlw10SMA'},
{Label:"Price Just Blw 15 SMA",        id:"15_priceNearSmaBear_sma"   , colLabel1 : '15 SMA'  ,  addiInfo :'tech:SMA:priceNearSmaBear:15'   , pid: '/Technical/SMAScreener/PriceJustBelowSMA/PriceJustBlw15SMA'},
{Label:"Price Just Blw 20 SMA",        id:"20_priceNearSmaBear_sma"   , colLabel1 : '20 SMA'  ,  addiInfo :'tech:SMA:priceNearSmaBear:20'   , pid: '/Technical/SMAScreener/PriceJustBelowSMA/PriceJustBlw20SMA'},
{Label:"Price Just Blw 25 SMA",        id:"25_priceNearSmaBear_sma"    , colLabel1 : '25 SMA'  ,  addiInfo :'tech:SMA:priceNearSmaBear:25'  , pid: '/Technical/SMAScreener/PriceJustBelowSMA/PriceJustBlw25SMA'},
{Label:"Price Just Blw 30 SMA",        id:"30_priceNearSmaBear_sma"     , colLabel1 : '30 SMA'  ,  addiInfo :'tech:SMA:priceNearSmaBear:30'    , pid: '/Technical/SMAScreener/PriceJustBelowSMA/PriceJustBlw30SMA'},
{Label:"Price Just Blw 40 SMA",        id:"40_priceNearSmaBear_sma"    , colLabel1 : '40 SMA'  ,  addiInfo :'tech:SMA:priceNearSmaBear:40'   , pid: '/Technical/SMAScreener/PriceJustBelowSMA/PriceJustBlw40SMA'},
{Label:"Price Just Blw 50 SMA",        id:"50_priceNearSmaBear_sma"     , colLabel1 : '50 SMA'  ,  addiInfo :'tech:SMA:priceNearSmaBear:50'  , pid: '/Technical/SMAScreener/PriceJustBelowSMA/PriceJustBlw50SMA'},
{Label:"Price Just Blw 100 SMA",        id:"100_priceNearSmaBear_sma"   , colLabel1 : '100 SMA'  ,  addiInfo :'tech:SMA:priceNearSmaBear:100'   , pid: '/Technical/SMAScreener/PriceJustBelowSMA/PriceJustBlw100SMA'},
{Label:"Price Just Blw 200 SMA",        id:"200_priceNearSmaBear_sma"   , colLabel1 : '200 SMA'  ,  addiInfo :'tech:SMA:priceNearSmaBear:200'   , pid: '/Technical/SMAScreener/PriceJustBelowSMA/PriceJustBlw200SMA'},






// Price Just Below EMA





{Label:"Price Just Blw 5 EMA", id:"5_priceNearEmaBear_ema"   , colLabel1 : '5 EMA' ,  addiInfo :'tech:EMA:priceNearEmaBear:5' , pid: '/Technical/EMAScreener/PriceJustBelowEMA/PriceJustBlw5EMA'},
{Label:"Price Just  Blw 10 EMA",id:"10_priceNearEmaBear_ema"   , colLabel1 : '10 EMA'  ,  addiInfo :'tech:EMA:priceNearEmaBear:10' , pid: '/Technical/EMAScreener/PriceJustBelowEMA/PriceJustBlw10EMA'},
{Label:"Price Just  Blw 15 EMA",id:"15_priceNearEmaBear_ema"    ,  colLabel1 : '15 EMA' ,  addiInfo :'tech:EMA:priceNearEmaBear:15' , pid: '/Technical/EMAScreener/PriceJustBelowEMA/PriceJustBlw15EMA'},
{Label:"Price Just  Blw 20 EMA",id:"20_priceNearEmaBear_ema"  ,  colLabel1 : '20 EMA' ,  addiInfo :'tech:EMA:priceNearEmaBear:20' , pid: '/Technical/EMAScreener/PriceJustBelowEMA/PriceJustBlw20EMA'},
{Label:"Price Just  Blw 25 EMA",id:"25_priceNearEmaBear_ema"   ,  colLabel1 : '25 EMA' ,  addiInfo :'tech:EMA:priceNearEmaBear:25' , pid: '/Technical/EMAScreener/PriceJustBelowEMA/PriceJustBlw25EMA'},
{Label:"Price Just  Blw 30 EMA",id:"30_priceNearEmaBear_ema"  ,  colLabel1 : '30 EMA' ,  addiInfo :'tech:EMA:priceNearEmaBear:30' , pid: '/Technical/EMAScreener/PriceJustBelowEMA/PriceJustBlw30EMA'},
{Label:"Price Just  Blw 40 EMA",id:"40_priceNearEmaBear_ema"   ,  colLabel1 : '40 EMA',  addiInfo :'tech:EMA:priceNearEmaBear:40' , pid: '/Technical/EMAScreener/PriceJustBelowEMA/PriceJustBlw40EMA'},
{Label:"Price Just  Blw 50 EMA",id:"50_priceNearEmaBear_ema"   ,  colLabel1 : '50 EMA',  addiInfo :'tech:EMA:priceNearEmaBear:50' , pid: '/Technical/EMAScreener/PriceJustBelowEMA/PriceJustBlw50EMA'},
{Label:"Price Just  Blw 100 EMA",id:"100_priceNearEmaBear_ema"  ,  colLabel1 : '100 EMA'  ,  addiInfo :'tech:EMA:priceNearEmaBear:100' , pid: '/Technical/EMAScreener/PriceJustBelowEMA/PriceJustBlw100EMA'},
{Label:"Price Just  Blw 200 EMA",id:"200_priceNearEmaBear_ema"  ,  colLabel1 : '200 EMA' ,  addiInfo :'tech:EMA:priceNearEmaBear:200' , pid: '/Technical/EMAScreener/PriceJustBelowEMA/PriceJustBlw200EMA'},

	];



 	return {

 		init : init,
        homeInit : homeInit,
        lp : loadPortlets,
        // sp : showPortlet,
        // sbc : stockBasketChg,
        applyDef : applyDef,

        ar : autoRfresh,


        lpd : loadPortletData,

        // setClassi : setClassi,




        // loadDefConfig : loadDefConfig, 
        // fc : frequencyChange,
        // shp : showHomePortlet,

        // ua : userAction,
        savePref : savePref,

        uar : userActionResponse


    }

})(); // module 