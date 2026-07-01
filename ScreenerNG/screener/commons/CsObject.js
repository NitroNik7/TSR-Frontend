
var OPEN_RANGE_NG = 'orNg';

var PREV_RANGE_BOBD = 'prevRngBoBd';


var GAPS_NG = 'gapNg';


var OPEN_RANGE_OLD = 'rangeBoDwn';

var GAP_RUNAWAY = 'gapRunAway';

var GAP_FILL = 'gapFill';

var TREND_CANDLE_BOBD = 'trendingCandleBoDwn';


var CS_TURNOVER = 'turnOver';

var CS_VWAP = 'vwap';




var csos =  (function () {

// CS Object Streucture

	var jsu = mintJsUtil;
	var htmlU = mintHtmlUtil;

	var screenerDataDef= [
		// Standardd Above, equeals , below  , between....
		{ id : 'aebb' , type : 'arr' , nonstd : true   },
		
		// Common in Cs Commons
		{ id : 'trend' , type : 'obj' , numId : null ,nonstd : true  },

		{ id : 'priceGainLoss' , type : 'obj' , nonstd : true  , 'ops' : NA_VAL },

		{ id : OPEN_RANGE_OLD , type : 'obj' , nonstd : true  },  // Range Breakout / down

		{ id : GAP_RUNAWAY , type : 'obj' , nonstd : true  },  // Gap up / down Runaway

		{ id : GAP_FILL , type : 'obj' , nonstd : true  },  // Gap Fill / Potential

		{ id : TREND_CANDLE_BOBD , type : 'obj' , nonstd : true  },  // Trending Candle Breakout / down

		{ id : OPEN_RANGE_NG , type : 'obj' , nonstd : true  },  


		{ id : PREV_RANGE_BOBD , type : 'obj' , nonstd : true  },  



		{ id : GAPS_NG , type : 'obj' , nonstd : true  },  



		//price 
		{ id : 'priceGain' , type : 'arr' , numId : 'priceGainId' },
		{ id : 'dynpriceComp' , type : 'arr' , numId : 'dynpriceCompId' },
		{ id : 'dynpriceTrendNg' , type : 'arr' , numId : 'dynpriceTrendNgId' },

		{ id : 'dynSpTimepriceComp' , type : 'arr' , numId : 'dynSpTimepriceCompId' },
		
		{ id : 'dynAdvOhlcComp' , type : 'arr' , numId : 'dynAdvOhlcCompId' },
		


		{ id : 'priceBoBd' , type : 'arr' , numId : 'priceBoBdId' },

		{ id :CS_TURNOVER , type : 'arr' , numId :  CS_TURNOVER +'Id' },

		{ id :CS_VWAP , type : 'arr' , numId :  CS_VWAP +'Id' },

		{ id : 'rallyBaseCom' , type : 'arr' , numId : 'rallyBaseComId' },


		// vol		
		{ id : 'volGain' , type : 'arr' , numId : 'volGainId' },		
		{ id : 'dynvolComp' , type : 'arr' , numId : 'dynvolCompId' },
		{ id : 'dynvolTrendNg' , type : 'arr' , numId : 'dynvolTrendNgId' },

		{ id : 'dynSpTimevolComp' , type : 'arr' , numId : 'dynSpTimevolCompId' },

		{ id : 'vatComp' , type : 'arr' , numId : 'vatCompId' },
		{ id : 'vadComp' , type : 'arr' , numId : 'vadCompId' },
		{ id : 'volComp' , type : 'arr' , numId : 'volCompId' },
		{ id : 'tickHistVol' , type : 'arr' , numId : 'tickHistVolId' },
		
		
		// Strength.....
		{ id : 'techStrComp' , type : 'arr' , numId : 'techStrCompId' },
		{ id : 'techRankComp' , type : 'arr' , numId : 'techRankCompId' },




		{ id : 'returnsComp' , type : 'arr' , numId : 'returnsCompId' },
		{ id : 'returnsRankComp' , type : 'arr' , numId : 'returnsRankCompId' },
		{ id : 'relPriceStrComp' , type : 'arr' , numId : 'relPriceStrCompId' },
		{ id : 'relStrComp' , type : 'arr' , numId : 'relStrCompId' },


		{ id : 'gwthStrComp' , type : 'arr' , numId : 'gwthStrCompId' },
		{ id : 'gwthRankComp' , type : 'arr' , numId : 'gwthRankCompId' },

		{ id : 'pftStrComp' , type : 'arr' , numId : 'pftStrCompId' },
		{ id : 'pftRankComp' , type : 'arr' , numId : 'pftRankCompId' },

		{ id : 'valStrComp' , type : 'arr' , numId : 'valStrCompId' },
		{ id : 'valRankComp' , type : 'arr' , numId : 'valRankCompId' },

		{ id : 'stabStrComp' , type : 'arr' , numId : 'stabStrCompId' },
		{ id : 'stabRankComp' , type : 'arr' , numId : 'stabRankCompId' },



		// { id : 'dynComp' , type : 'obj' , numId : null , nonstd : true},
		// { id : 'gainLoss' , type : 'obj' , numId : null ,nonstd : true },

		// High Lows

		{ id : 'hlHist' , type : 'arr' , nonstd : true },

		{ id : 'hlSustain' , type : 'obj' , nonstd : true },

		{ id : 'priceHlComp' , type : 'arr' , numId : 'priceHlCompId' },

		{ id : 'hlComp' , type : 'arr' , numId : 'hlCompId' },

		{ id : 'hlRangeComp' , type : 'arr' , numId : 'hlRangeCompId' },		


		// tickHistVol




		// beta Vol
		{ id : 'prComp' , type : 'arr' , numId : 'prcId' },  // not follow convention of id + Id
		{ id : 'betaComp' , type : 'arr' , numId : 'betaId' }, // not follow convention


		{ id : 'ppComp' , type : 'arr' , numId : 'ppCompId' }, // unnecessary Extra...
		{ id : 'cprComp' , type : 'arr' , numId : 'cprCompId' }, // unnecessary Extra...
		{ id : 'fibrComp' , type : 'arr' , numId : 'fibrCompId' }, // unnecessary Extra...


		// Moving Average...
		{ id : 'pmaComp' , type : 'arr' , numId : 'pmaCompId' },
		{ id : 'macoComp' , type : 'arr' , numId : 'macoCompId' },
		{ id : 'maTrendComp' , type : 'arr' , numId : 'maTrendCompId' },


		{ id : 'maFakeBreakComp' , type : 'arr' , numId : 'maFakeBreakCompId' },
		{ id : 'maSupResBounceComp' , type : 'arr' , numId : 'maSupResBounceCompId' },
		{ id : 'maConComp' , type : 'arr' , numId : 'maConCompId' },
		{ id : 'maDivComp' , type : 'arr' , numId : 'maDivCompId' },
		{ id : 'maHistComp' , type : 'arr' , numId : 'maHistCompId' },

		{ id : 'maOlComp' , type : 'arr' , numId : 'maOlCompId' },



		// Tech ...

		{ id : 'techNgComp' , type : 'arr' , numId : 'techNgCompId' }, // unnecessary Extra... 
		{ id : 'techAbsComp' , type : 'arr' , numId : 'techAbsCompCompId' }, // unnecessary Extra... 
		{ id : 'techCoComp' , type : 'arr' , numId : 'techCoCompCompId' }, // unnecessary Extra... 
		{ id : 'techIchiComp' , type : 'arr' , numId : 'techIchiCompCompId' }, // unnecessary Extra... 

		{ id : 'techDiyBiComp' , type : 'arr' , numId : 'techDiyBiCompId' }, 
		{ id : 'techDiyOlComp' , type : 'arr' , numId : 'techDiyOlCompId' }, 



		{ id : 'techDivComp' , type : 'arr' , numId : 'techDivCompId' }, // Divergence


		// FIN ...

		{ id : 'finNgComp' , type : 'arr' , numId : 'finNgCompId' },
		{ id : 'finStmtNgComp' , type : 'arr' , numId : 'finStmtNgCompId' },

		{ id : 'csCagr' , type : 'arr' ,  numId : 'csCacgrId' },
		{ id : 'csQoq' , type : 'arr' ,  numId : 'csQoqId'},			

		// FIN Ratios .... 
		{ id : 'finPbfPbfComp' , type : 'arr' ,  numId : 'finPbfPbfId' },
		{ id : 'finGnfGnfComp' , type : 'arr' ,  numId : 'finGnfGnfId' },


		{ id : 'finShShComp' , type : 'arr' ,  numId : 'finShShId' },
		{ id : 'finMrqMrqComp' , type : 'arr' ,  numId : 'finMrqMrqId' },
		{ id : 'finTtmTtmComp' , type : 'arr' ,  numId : 'finTtmTtmId' },


		{ id : 'finVrFyComp' , type : 'arr' ,  numId : 'finVrFyId' },
		{ id : 'finVr1ygComp' , type : 'arr' ,  numId : 'finVr1ygId' },
		{ id : 'finVr3ygComp' , type : 'arr' ,  numId : 'finVr3ygId' },
		{ id : 'finVr5ygComp' , type : 'arr' ,  numId : 'finVr5ygId' },
		{ id : 'finVr7ygComp' , type : 'arr' ,  numId : 'finVr7ygId' },
		{ id : 'finVr10ygComp' , type : 'arr' ,  numId : 'finVr10ygId' },

		
		{ id : 'finPrFyComp' , type : 'arr' ,  numId : 'finPrFyId' },
		{ id : 'finPr1ygComp' , type : 'arr' ,  numId : 'finPr1ygId' },
		{ id : 'finPr3ygComp' , type : 'arr' ,  numId : 'finPr3ygId' },
		{ id : 'finPr5ygComp' , type : 'arr' ,  numId : 'finPr5ygId' },
		{ id : 'finPr7ygComp' , type : 'arr' ,  numId : 'finPr7ygId' },
		{ id : 'finPr10ygComp' , type : 'arr' ,  numId : 'finPr10ygId' },

		{ id : 'finSrFyComp' , type : 'arr' ,  numId : 'finSrFyId' },
		{ id : 'finSr1ygComp' , type : 'arr' ,  numId : 'finSr1ygId' },
		{ id : 'finSr3ygComp' , type : 'arr' ,  numId : 'finSr3ygId' },
		{ id : 'finSr5ygComp' , type : 'arr' ,  numId : 'finSr5ygId' },
		{ id : 'finSr7ygComp' , type : 'arr' ,  numId : 'finSr7ygId' },
		{ id : 'finSr10ygComp' , type : 'arr' ,  numId : 'finSr10ygId' },
		
		{ id : 'finErFyComp' , type : 'arr' ,  numId : 'finErFyId' },
		{ id : 'finEr1ygComp' , type : 'arr' ,  numId : 'finEr1ygId' },
		{ id : 'finEr3ygComp' , type : 'arr' ,  numId : 'finEr3ygId' },
		{ id : 'finEr5ygComp' , type : 'arr' ,  numId : 'finEr5ygId' },
		{ id : 'finEr7ygComp' , type : 'arr' ,  numId : 'finEr7ygId' },
		{ id : 'finEr10ygComp' , type : 'arr' ,  numId : 'finEr10ygId' },

		// Income statemet  - 
		{ id : 'finIsyFyComp' , type : 'arr' ,  numId : 'finIsyFyId' },
		{ id : 'finIsy1ygComp' , type : 'arr' ,  numId : 'finIsy1ygId' },
		{ id : 'finIsy3ygComp' , type : 'arr' ,  numId : 'finIsy3ygId' },
		{ id : 'finIsy5ygComp' , type : 'arr' ,  numId : 'finIsy5ygId' },
		{ id : 'finIsy7ygComp' , type : 'arr' ,  numId : 'finIsy7ygId' },
		{ id : 'finIsy10ygComp' , type : 'arr' ,  numId : 'finIsy10ygId' },

		// BALANCE SHEET
		{ id : 'finBsyFyComp' , type : 'arr' ,  numId : 'finBsyFyId' },
		{ id : 'finBsy1ygComp' , type : 'arr' ,  numId : 'finBsy1ygId' },
		{ id : 'finBsy3ygComp' , type : 'arr' ,  numId : 'finBsy3ygId' },
		{ id : 'finBsy5ygComp' , type : 'arr' ,  numId : 'finBsy5ygId' },
		{ id : 'finBsy7ygComp' , type : 'arr' ,  numId : 'finBsy7ygId' },
		{ id : 'finBsy10ygComp' , type : 'arr' ,  numId : 'finBsy10ygId' },

		// CASH FLOW
		{ id : 'finCfyFyComp' , type : 'arr' ,  numId : 'finCfyFyId' },
		{ id : 'finCfy1ygComp' , type : 'arr' ,  numId : 'finCfy1ygId' },
		{ id : 'finCfy3ygComp' , type : 'arr' ,  numId : 'finCfy3ygId' },
		{ id : 'finCfy5ygComp' , type : 'arr' ,  numId : 'finCfy5ygId' },
		{ id : 'finCfy7ygComp' , type : 'arr' ,  numId : 'finCfy7ygId' },
		{ id : 'finCfy10ygComp' , type : 'arr' ,  numId : 'finCfy10ygId' },

		// Income statemet  - 
		{ id : 'finIsqQtrComp' , type : 'arr' ,  numId : 'finIsqQtrId' },
		{ id : 'finIsqQtrGwLastComp' , type : 'arr' ,  numId : 'finIsqQtrGwLastId' },
		{ id : 'finIsqQtrGwYrComp' , type : 'arr' ,  numId : 'finIsqQtrGwYrId' },


		// screenerData.chartPattern= {}; // Old to deprecate

		// { id : 'patterns' , type : 'arr' ,  nonstd : true},	
		// complex Patterns....
		// { id : 'compPatterns' , type : 'arr' ,  nonstd : true},			

		{ id : 'patternNg' , type : 'arr' ,  numId : 'patternNgId' },	

		// csObject


	];	

	// function defineScrdata(){


	// }

	function init(reset){
	
		var scrData = mtgv.cs.screenerData;

		if(!reset){
			scrData.scrFreq = FREQ_DAILY;
			scrData.currentTab = PRICE_CS;
		}

		var sbDef = msbu.gcd();

		scrData.stkType =sbDef.defSb;


		// if(jsu.isMigContext()){
		// 	scrData.stkType ='all';
		// }


	   // initializeAebbData();
		initDef(scrData);
		initializeAebbData(scrData);
	

		scrData.priceGainLoss ={ gainLossType : NA_VAL}

		scrData[OPEN_RANGE_OLD] ={ rangeBoDwnType : NA_VAL ,  enabled : false, id: OPEN_RANGE_OLD} 

		scrData[GAP_RUNAWAY] ={  enabled : false, id: GAP_RUNAWAY,  gapRunAwayType : NA_VAL}

		scrData[GAP_FILL] ={  enabled : false, id:  GAP_FILL   , gapFillType : NA_VAL}

		scrData[OPEN_RANGE_NG] ={ enabled : false, id: OPEN_RANGE_NG}

		scrData[PREV_RANGE_BOBD] ={ enabled : false, id: PREV_RANGE_BOBD}



		scrData[GAPS_NG] ={ enabled : false, id: GAPS_NG}


		scrData[TREND_CANDLE_BOBD] ={ enabled : false, id: TREND_CANDLE_BOBD , trendingCandleBoDwnType : NA_VAL}


		// screenerData.trend ={};
		// Hist High Low
		for(var i=0;i< histHighLowMap.length ;i++){
			scrData.hlHist.push({id : histHighLowMap[i].id,  histType : NA_VAL })
		}
		scrData.hlSustain ={hlSusHist : NA_VAL}

		// TRENDING_FIELDS
		for(var i=0;i< TRENDING_DEF.length ;i++){
			scrData.trend [ TRENDING_DEF[i].obj] = {trendType : TRENDING_DEF[i].id};
		}




		// for(var i=0;i< CP_FIELDS.length ; i++){
		// 	var pattern = {id : CP_FIELDS[i].id, pat : NA_VAL , csType: CP_CS }
		// 	scrData.patterns.push(pattern);
		// }
		


		// for(var i=0;i< CP_FIELDS.length ; i++){
		// 	var pattern = {id : CP_FIELDS[i].id, pat : NA_VAL , csType: CP_CS }
		// 	scrData.patterns.push(pattern);
		// }

		// Other Patterns ...
		// CP_COMP_FIELDS   -- Chart Pattern Complex...

		// Narrow Range - V1  - Tick
		// scrData.compPatterns.push(({id : 'narRng',    pat : NA_VAL , v1 : 4,  csType: CP_CS }));  
		
		// Narrow Range - V1  - Tick , v2 is Multiple largest candle in range...
		// scrData.compPatterns.push(({id : 'wideRng',   pat : NA_VAL , v1 : 4,  v2 : 2,   csType: CP_CS }));



	}

	function initDef(scrData){
		for(var i=0;i< screenerDataDef.length;i++ ){
			var obj = screenerDataDef[i];

			if(obj.type == 'arr' ) scrData[obj.id] = [];
			if(obj.type == 'obj' ) scrData[obj.id] = {};
		}
	}

	function initializeAebbData(scrData){
		// screenerData.aebb =[];

		AEBB_MAP =[];
		AEBB_MAP = AEBB_MAP.concat(PRICE_AEBB_MAP);
		AEBB_MAP = AEBB_MAP.concat(VOL_AEBB_MAP);

		AEBB_MAP = AEBB_MAP.concat(FIN_BASIC_AEBB_FIELDS);
		AEBB_MAP = AEBB_MAP.concat(BAL_SHEET_AEBB_FIELDS);
		AEBB_MAP =AEBB_MAP.concat(FIN_RATIO_AEBB_FIELDS);
		AEBB_MAP =AEBB_MAP.concat(CASHFLOW_AEBB_FIELDS);
		AEBB_MAP =AEBB_MAP.concat(INCOME_AEBB_FIELDS);	
		AEBB_MAP =AEBB_MAP.concat(QTRLY_AEBB_FIELDS);

		for(var i=0;i<AEBB_MAP.length;i++){
			scrData.aebb.push( {id:AEBB_MAP[i].id, noData:true});
		}
	}


	function getScreenerDataDef(){
		return screenerDataDef;
	}



	function getSelObjs(type){
		// if(type =='save') return getObjSelForSave();
		// if(type =='run') return getSelectedObjectsForRun();

		var clone =  prepareClone();

		return clone;

	}


	function prepareClone(){
		var clone =  cloneObj(mtgv.cs.screenerData);
		// var screenerDataDef = sc();

		for(var i=0;i< screenerDataDef.length;i++){
			var def = screenerDataDef[i];
			if(!def.nonstd){
				removeUnselected( clone , def.id, true);
			}
			if(jsu.isNotNull(def.numId)){
				delete clone[def.numId]; 
			}
		}

		// non Standard 
		removeUnselected( clone, 'aebb' , false);
		
		removeUnselected( clone, 'hlHist' , false);

		// removeUnselected(clone, 'patterns', false);

		// removeUnselected(clone, 'compPatterns', false);


		removeUnselectedInObj(clone, 'trend', false);

		//// Individual Object -- To Do in more generic manner

		removeUnselectedDirectObj(clone, 'hlSustain', null);

		//
		// removeUnselectedDirectObj(clone, 'hlSustain', null);


		// Direct Object Delete Unwanted
		removeNaObject(clone, 'priceGainLoss', 'ops');

		// removeNaObject(clone, OPEN_RANGE_OLD, 'type');

		removeNotEnabledObject(clone, OPEN_RANGE_OLD);

		removeNotEnabledObject(clone, GAP_RUNAWAY );

		removeNotEnabledObject(clone, GAP_FILL );

		// removeNaObject(clone, 'trendingCandleBoDwn', 'type');

		removeNotEnabledObject(clone, TREND_CANDLE_BOBD);

		removeNotEnabledObject(clone, OPEN_RANGE_NG);

		removeNotEnabledObject(clone, PREV_RANGE_BOBD);

		removeNotEnabledObject(clone, GAPS_NG);



		// if(!clone.hlSustain.goodData) delete (clone['hlSustain']);


		// removeUnselectedInObj(clone, 'hlSustain', false) ; 

		// removeUnselected(clone, 'trend', false);

		


		// removeUnselected(clone, 'patterns' , false);
		/*
			removeUnselected(clone , 'csCagr', true);
			removeUnselected(clone, 'csQoq', true);

			var idCols = ['bsCsId', 'cfCsId', 'incomeCsId'];

			for(var i=0;i< idCols.length;i++){
				delete clone[idCols[i]];
			}
		*/

		// clone.stkType =$('input[name=stkType]:checked').val();
				// CP Chart Patterns Direct Drop Down.....
		// for(var i=0  ;i<CP_FIELDS.length ;i++){
		// 	var obj = CP_FIELDS[i];
		// 	if( jsu.isNull(clone.patterns[obj.id]) ||  clone.patterns[obj.id] == 'none') delete clone.patterns[obj.id];
		// }


		//console.log( 'clone \n'  + JSON.stringify( clone )+ '\n');
		return clone;
	}

	/*

	function getObjSelForSave(){
		var clone =  prepareClone();

		return clone;
	}

	function getSelectedObjectsForRun(){
		

		var clone =  prepareClone();

		return clone;
	}

*/


	var FIELDS_TO_STRIP = ['goodData','hasData','noData', 'disabled', 'csType', 'valiMsg'];
	
	function removeUnselected(clone, objId, removeId){
		// Not Good data

		var arr = clone[objId];

		for(var i=arr.length-1;i>=0 ;i--){
			var obj = arr[i];
			if(!obj.goodData) arr.splice(i,1);
		}	

		// Disabled

		for(var i=arr.length-1;i>=0 ;i--){
			var obj = arr[i];
			if(obj.disabled) arr.splice(i,1);
		}	

		var fieldToRemove = FIELDS_TO_STRIP.slice();
		if(removeId) fieldToRemove.push('id');

		stripUnwantedFields(clone, objId,  fieldToRemove);
	}

	function removeUnselectedInObj(clone, objId, removeId){
		var obj = clone[objId];

		for(var key in obj){
			// console.log( ' Key : ' + key);
			var val = obj[key];
			if(!val.goodData)  delete (obj[key]);
			if(val.disabled)  delete (obj[key]);

			for(var i=0;i<FIELDS_TO_STRIP.length ;i++ ){
				delete (val[FIELDS_TO_STRIP[i]]);
			}
			if(removeId) delete (val['id']);
		}

	}

	function removeUnselectedDirectObj(clone, objId, removeId){
		var  obj = clone[objId];
		if(!obj.goodData)  delete (clone[objId]);
		if(obj.disabled)  delete (clone[objId]);

		for(var i=0;i<FIELDS_TO_STRIP.length ;i++ ){
				delete (obj[FIELDS_TO_STRIP[i]]);
			}
		if(removeId) delete (obj['id']);

	}

	function removeNaObject(clone, objId, field){

		var obj = clone[objId];

		if(obj.disabled){
			delete (clone[objId]);
			return;
		}

		var fieldVal = obj[field];
		if(fieldVal==CS_NOT_SELECTED){
			delete (clone[objId]);
			return;
		}




		var fieldToRemove = FIELDS_TO_STRIP.slice();
		stripUnwantedFields(clone, objId,  fieldToRemove);
	}

	function removeNotEnabledObject(clone, objId){

		var obj = clone[objId];

		if(!obj.enabled){
			delete (clone[objId]);
			return;
		}

	}




	function applySettings(jsonObj){

		applySettingBackwardCompat(jsonObj);

		var scrData = mtgv.cs.screenerData;
		// var aeeb = jsonObj.aeeb;


		for(var i=0;i< screenerDataDef.length;i++){
			var def = screenerDataDef[i];
			
			if(def.nonstd) continue;

			var typeArr= jsonObj[def.id];
			if(jsu.isNull(typeArr) ) continue;

			scrData[def.numId] = 0;
			for(var j=0 ; j< typeArr.length; j++){
				var obj= typeArr[j];
				obj.id = def.numId +j;
				scrData[def.numId] = scrData[def.numId] +1;
				obj.hasData = true;
				obj.goodData = true;

				scrData[def.id].push(obj);
			}
		}
		// AEBB
		var replaceAeebIdx = mintJsUtil.arrayReplace(scrData.aebb , jsonObj.aebb);
		for(var i=0;i< replaceAeebIdx.length;i++){
			var elem = scrData.aebb[replaceAeebIdx[i]];
			elem.goodData = true;	elem.hasData=true; // csType is setin VF....
		}

		// Trend ...
		if(jsu.isNotNull(jsonObj.trend)){
			for(var key in jsonObj.trend){
				var val = jsonObj.trend[key];
				val.goodData = true;
				val.hasData = true;
				scrData.trend[key] = val;
			}
		}

		// InDividual Object 
		if(jsu.isNotNull( jsonObj.hlSustain)){
			scrData.hlSustain  = jsonObj.hlSustain;
			scrData.hlSustain.goodData = true;
			scrData.hlSustain.hasData = true;
		}



		singleObjSettings(scrData , jsonObj,  ['hlSustain' ,  'priceGainLoss' ,  
			OPEN_RANGE_OLD ,GAP_RUNAWAY , GAP_FILL ,  TREND_CANDLE_BOBD, OPEN_RANGE_NG, PREV_RANGE_BOBD , GAPS_NG]);		

		// singleObjSettings(jsonObj,  'hlSustain');
		// singleObjSettings(jsonObj, 'priceGainLoss');
		// singleObjSettings(jsonObj, 'rangeBoDwn');
		// singleObjSettings(jsonObj, 'gapRunAway');
		// singleObjSettings(jsonObj, 'gapFill');
		// singleObjSettings(jsonObj, 'trendingCandleBoDwn');


		// if(jsu.isNotNull( jsonObj.priceGainLoss)){
		// 	scrData.priceGainLoss  = jsonObj.priceGainLoss;
		// 	scrData.priceGainLoss.goodData = true;
		// 	scrData.priceGainLoss.hasData = true;
		// }



/*
		if(jsu.isNotNull(jsonObj.patterns)){
			var replacePatIdx = mintJsUtil.arrayReplace(scrData.patterns , jsonObj.patterns);
			for(var i=0;i< replacePatIdx.length;i++){
				var elem = scrData.patterns[replacePatIdx[i]];
				elem.goodData = true;	elem.hasData=true; // csType is setin VF....
			}
		}

		// Other Patterns... / complex Patterns - compPatterns
		if(jsu.isNotNull(jsonObj.compPatterns)){
			var replacePatIdx = mintJsUtil.arrayReplace(scrData.compPatterns , jsonObj.compPatterns);
			for(var i=0;i< replacePatIdx.length;i++){
				var elem = scrData.compPatterns[replacePatIdx[i]];
				elem.goodData = true;	elem.hasData=true; // csType is setin VF....
			}
		}

*/

		// Hist High Low ...
		if(jsu.isNotNull(jsonObj.hlHist)){
			var replacePatIdx = mintJsUtil.arrayReplace(scrData.hlHist , jsonObj.hlHist);
			for(var i=0;i< replacePatIdx.length;i++){
				var elem = scrData.hlHist[replacePatIdx[i]];
				elem.goodData = true;	elem.hasData=true; // csType is setin VF....
			}
		}

	}


	function singleObjSettings(scrData, jsonObj, fields){

		for(var i=0 ;i< fields.length ;i++){
			var field = fields[i];

			if(jsu.isNotNull( jsonObj[field] )){
				scrData[field]  = jsonObj[field] ;
				scrData[field].goodData = true;
				scrData[field].hasData = true;
			}
		}
	}


	function applySettingBackwardCompat(jsonObj){
		var scrData = mtgv.cs.screenerData;
		// Backward Compatibility from Old Saved Screeners....	
		if(jsonObj.currentTab =='pvCs') jsonObj.currentTab = PRICE_CS; 

		// if(jsu.isNotNull(jsonObj.chartPattern)){

		// 	if(isNull(jsonObj.patterns)) jsonObj.patterns =[];

		// 	for(var i=0;i<CP_FIELDS.length;i++){
		// 		var cpId = CP_FIELDS[i].id ;
		// 		if(jsu.isNotNull( jsonObj.chartPattern[cpId ])){
		// 			jsonObj.patterns.push({id : cpId, pat : jsonObj.chartPattern[cpId]} )
		// 		}
		// 	}
		// }
/*

		CHART PATTERNS NOW TAKEN CARE FROM DB LEVEL
		// Chart Patterns ..... 
		if(jsu.isNotNull(jsonObj.chartPattern)){   // First Gen
			if(isNull(jsonObj.patternNg)) jsonObj.patternNg =[];

			for(var i=0;i<CP_FIELDS.length;i++){
				var cpDef = CP_FIELDS[i];
				if(cpDef.patType != 'candle'){   // only candle was supported ....
					continue;
				}	
				var cpId = cpDef.id ;
				if(jsu.isNotNull( jsonObj.chartPattern[cpId ])){
					var pattern = { type : 'patternNg' ,   indi: cpDef.id  , pat : jsonObj.chartPattern[cpId] };
					jsonObj.patternNg.push(pattern);
				}
			}
		}

		// Chart Patterns Second Gen..... 
		if(jsu.isNotNull(jsonObj.patterns)){   // Second Gen
			for(var i=0;i<CP_FIELDS.length;i++){
				var cpDef = CP_FIELDS[i];
				if(cpDef.patType =='candle' ){

					var savedPat = jsu.getObjFrmArr( jsonObj.patterns,cpDef.id );

					if(savedPat.pat != 'na'  ){
						var pattern = { type : 'patternNg' ,   indi: cpDef.id  , pat : savedPat.pat };	
						jsonObj.patternNg.push(pattern);
					}
				}else{  // Heikin Ashi ...

				}

			}

		}

*/		

		// maco / price ma

		if( jsu.isNotNull(jsonObj.pmaComp)){
			for(var i = 0;i< jsonObj.pmaComp.length ;i++){
				var obj = jsonObj.pmaComp[i];
				if(obj.ops == "maCa" ) obj.ops = CS_CO_ABV;
				if(obj.ops == "maCb" ) obj.ops = CS_CO_BLW;
			}
		}

		if( jsu.isNotNull(jsonObj.macoComp)){
			for(var i = 0;i< jsonObj.macoComp.length ;i++){
				var obj = jsonObj.macoComp[i];
				if(obj.ops == "maCa" ) obj.ops = CS_CO_ABV;
				if(obj.ops == "maCb" ) obj.ops = CS_CO_BLW;
			}
		}

		if(jsu.isNotNull(jsonObj.aebb)){
			for(var i=0;i<jsonObj.aebb.length;i++){
				var aebbVo = jsonObj.aebb[i];
				if(aebbVo.id==='csPriceGain' || aebbVo.id==='csPriceFall'){

					var type = aebbVo.id==='csPriceGain' ? 'gain' : 'loss';
					
					jsonObj.priceGainLoss= { gainLossType : 'na', hasData : true, ops : aebbVo.ops  , v1 : aebbVo.v1,
						v2: aebbVo.v2, baseTick : 'D', type : type, id : 'priceGainLoss', goodData : true
					}

					// jsonObj.aebb = jsonObj.aebb.slice(i);

					jsu.removeFromArrayWithId(jsonObj.aebb , aebbVo.id);
					break;
				}
			}
		}

		
		if(jsu.isNotNull(jsonObj.techAbsComp)){
			var i= jsonObj.techAbsComp.length;

		// {id: 'adx', label: "Average Directional Index (ADX)"},
		// {id: 'adxPdi', label: "ADX  PDI"},
		// {id: 'adxMdi', label: "ADX  MDI"},

// {id: 'aroonUp', label: "Aroon Up"},
// 		{id: 'aroonDown', label: "Aroon Down"},

// {id: 'macd', label: "Mov Avg Conv Div (MACD)"},
// 		{id: 'macdSignal', label: "MACD - Signal"},
// 		{id: 'macdHist', label: "MACD - Histogram"},

		// {id: 'stof', label: "Stochastic (Fast)"},
		// {id: 'stos', label: "Stochastic (Slow)"},

			while(i--){
				var obj = jsonObj.techAbsComp[i];
				if( jsu.containsString([RSI,RSI_SMOOTH, AROON, CCI, MFI, UO, WILLIAMS  ,
					ATR, CCI, ROC,CMF,
					'adx', 'adxPdi','adxMdi',
					'aroonUp', 'aroonDown',
					'macd', 'macdSignal', 'macdHist',
					'stof','stos'

				 ]  ,obj.field )     ){
					var ngObj = {ops : obj.ops, v1 : obj.v1 , subType:'obos' , indi: obj.field, type :"techIndi" };
					if(jsu.isNotNull(obj.v2)) {
						ngObj.v2 = obj.v2;
					}
					if(jsu.isNull(jsonObj.techNgComp)){
						jsonObj.techNgComp=[];
					}

					if( jsu.containsString([ATR, CCI, ROC ]  ,obj.field )){
						ngObj.subType =obj.field;
					}

					if( jsu.containsString(['adx', 'adxPdi','adxMdi' ]  ,obj.field )){
						ngObj.subType =ADX;
						ngObj.indi = ADX;
						ngObj.fieldType=obj.field;

					}
					if( jsu.containsString(['aroonUp', 'aroonDown' ]  ,obj.field )){
						ngObj.subType ='AroonIndi';
					}
					if( jsu.containsString(['macd', 'macdSignal', 'macdHist']  ,obj.field )){
						ngObj.subType ='macd';
						ngObj.indi = MACD;
						ngObj.fieldType=obj.field;
					}
					if( jsu.containsString(['stof','stos']  ,obj.field )){ 
						ngObj.subType ='sto';
						ngObj.indi = obj.field;
						ngObj.fieldType='k';

					}

					jsonObj.techNgComp.push(ngObj);
					jsonObj.techAbsComp.splice(i,1);
				}
			}
		}

		if(jsu.isNotNull(jsonObj.techCoComp)){
			var i= jsonObj.techCoComp.length;
			while(i--){
				var obj = jsonObj.techCoComp[i];   
				var ngObj= null;
				if(jsu.containsString(['rsiRise','rsisRise' ],obj.co )){ 
					ngObj ={v1 :30 ,  subType:'obos' };
				}else if(jsu.containsString(['rsiFall','rsisFall' ],obj.co )){
					ngObj ={v1 :70 ,  subType:'obos' } ;
				}else if(jsu.containsString(['mfiRise' ],obj.co )){
					ngObj ={v1 :20 ,  subType:'obos' };
				}else if(jsu.containsString(['mfiFall' ],obj.co )){
					ngObj ={v1 :80 ,  subType:'obos' };
				}else if(jsu.containsString(['wrRise' ],obj.co )){
					ngObj ={v1 :-80 , subType:'obos' };
				}else if(jsu.containsString(['wrFall' ],obj.co )){
					ngObj ={v1 :-20 ,  subType:'obos' };
				}else if(jsu.containsString(['rsiClRise' ,'rsisClRise', 'mfiClRise'  ,  'rsiClFall' ,'rsisClFall', 'mfiFall'  ],obj.co )){
					ngObj ={v1 :50 ,  subType:'obos' };
				}else if(jsu.containsString(['wrClRise' ,'wrClFall'  ],obj.co )){
					ngObj ={v1 :-50 ,subType:'obos' };
				}else if(jsu.containsString(['cmfN2P' ,'cmfP2N'  ],obj.co )){
					ngObj ={v1 :0 ,subType:CMF , indi : CMF };
				}else if(jsu.containsString(['adxP2M' ,'adxM2P'  ],obj.co )){
					ngObj ={subType:ADX  , indi : ADX };

				}else if(jsu.containsString(['macBul' ,'macBear', 'macdZeroAbv' ,'macdZeroBlw' ,'macdSlZeroAbv' , 'macdSlZeroBlw' ],obj.co )){
					ngObj ={v1 :0 ,subType:'macd', indi : MACD };
					ngObj.fieldType='macd'


				}else if(jsu.containsString(['stosRise' ,'stosFall', 'stosClRise' ,'stosClFall' ,'stosKAbvD' , 'stosKBlwD' ],obj.co )){
					ngObj ={v1 :50 ,subType:'sto', indi : STO_SLOW };

					if(obj.co == 'stosRise') ngObj.v1 =20;
					if(obj.co == 'stosFall') ngObj.v1 =80;
					ngObj.fieldType='k'

				}else if(jsu.containsString(['bbmbbul' ,'bbmbbear', 'bbubbul' ,'bbubbear' ,'bblbbul' , 'bblbbear' ],obj.co )){
					ngObj ={v1 :50 ,subType:'price', indi : BOLLINGER };
				}

				if(ngObj != null){
					ngObj.ops = ( obj.co.endsWith('Rise') ? CS_CO_ABV : CS_CO_BLW );

					ngObj.v2   =  ( obj.period == 'tday' ? null : 1 );

					if(obj.co.startsWith('rsis')){
						ngObj.indi = RSI_SMOOTH;
					}else if(obj.co.startsWith('rsi')){
						ngObj.indi = RSI;
					}else if(obj.co.startsWith('mfi')){
						ngObj.indi = MFI;
					}else if(obj.co.startsWith('wr')){
						ngObj.indi = WILLIAMS;
					}else if(  jsu.containsString(['cmfN2P', 'macdZeroAbv' ,'macdSlZeroAbv' ],obj.co ) ){		
						// ngObj.v1 = ( obj.period == 'tday' ? null : 1 );			
						ngObj.ops = CS_CO_ABV;
					}else if( jsu.containsString(['cmfP2N', 'macdZeroBlw' ,'macdSlZeroBlw' ],obj.co )  ){					
						ngObj.ops = CS_CO_BLW;	
						// ngObj.v1 = ( obj.period == 'tday' ? null : 1 );	
					}else if(jsu.containsString(['adxP2M' ,'adxM2P', 'macBul' ,'macBear', 'stosKAbvD' , 'stosKBlwD' ],obj.co )){
						ngObj.ops = obj.co;
						ngObj.v1 = ( obj.period == 'tday' ? null : 1 );
					}else if(jsu.containsString(['bbmbbul' ,'bbmbbear', 'bbubbul' ,'bbubbear' ,'bblbbul' , 'bblbbear' ],obj.co )){
						ngObj.v1 = ( obj.period == 'tday' ? null : 1 );

						ngObj.ops = ( obj.co.endsWith('bul') ? CS_CO_ABV : CS_CO_BLW );

						if(obj.co.startsWith('bbmb')) ngObj.fieldType = 'mb';
						
						if(obj.co.startsWith('bbub')) ngObj.fieldType = 'ub';
						
						if(obj.co.startsWith('bblb')) ngObj.fieldType = 'lb';

					}

					ngObj.type ="techIndi" ;

					if(jsu.isNull(jsonObj.techNgComp)){
						jsonObj.techNgComp=[];
					}
					jsonObj.techNgComp.push(ngObj);
					jsonObj.techCoComp.splice(i,1);

				}

			}
		}

	}

	return{
		sdd : getScreenerDataDef,
		init : init,
		getSelObjs : getSelObjs,
		as : applySettings
	}


})(); // module 	