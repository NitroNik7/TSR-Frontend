
/*  

	This is unique one with two tabs in one file.... 

*/


var csFr =  (function () {			

	var thisObject = 'csFr';

	var htmlU = mintHtmlUtil;
	// var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;

	// var TERM_CUR = 'Cur';


	var TERM_FY = 'Fy';
	var TERM_1Y = '1yg';
	var TERM_3Y = '3yg';
	var TERM_5Y = '5yg';
	var TERM_7Y = '7yg';
	var TERM_10Y = '10yg';

	var TERM_QTR = 'Qtr';
	var TERM_QTR_GW_LAST = 'QtrGwLast';
	var TERM_QTR_GW_YEAR = 'QtrGwYr';



	var YR_TYPE = [ {id: TERM_FY , label : "Latest FY"} , {id: TERM_1Y , label : "1Y Growth %"} ,
			 {id: TERM_3Y , label : "3Y CAGR %"} ,  {id: TERM_5Y , label : "5Y CAGR %"} ,
			 {id: TERM_7Y , label : "7Y CAGR %"} , {id: TERM_10Y , label : "10Y CAGR %"}
	  ];

	  var QTR_TYPE = [ {id: TERM_QTR , label : "Latest Quarter"} , {id: TERM_QTR_GW_LAST , label : "Vs Previous Qtr %"} ,
			 {id: TERM_QTR_GW_YEAR , label : "Qtr Vs YoY %"} 
	  ];



	  var PRICE_BASED_FIELDS = 'Pbf'; // Price Based Fields
	  var GURU_FIELDS = 'Gnf'; // Price Based Fields
	  		  


	  var SHARE_FIELDS = 'Sh';
	  var TTM_FIELDS = 'Ttm'; 
	  var MRQ_FIELDS = 'Mrq'; 




	  var VAL_RATIO = 'Vr'; 
	  var PFT_RATIO = 'Pr';
	  var SOL_RATIO = 'Sr';
	  var EFF_RATIO = 'Er';

  	  var INC_STMT  	= 'Isy';
	  var BAL_SHEET  	= 'Bsy';
	  var CASH_FLOW  	= 'Cfy';

	  var INC_STMT_QTR  	= 'Isq';

	  var INC_STMT_FIELDS  = getBoldFields(INC_STMT_ALL);
	  var BAL_SHEET_FIELDS  = getBoldFields(BAL_SHEET_ALL);
	  var CASH_FLOW_FIELDS  = getBoldFields(CASH_FLOW_ALL);


	function getFinRatioHtml(id){
		var scrData = mtgv.cs.screenerData;

		var html ='<br/><div id="'+id+'Div">';


		html+=  htmlU.getSpan( " Please note that a more feature rich "
			+"version on <b>Ratio's</b> is now available at <b>Fin Ratio (new)</b> " , 'orange',10);

		html+= '<table id="hlrCtrlTab" '+TAB_INDI_STYLE+'   >';

		for(var i=0;i<scrData.finPbfPbfComp.length;i++){
			html+=getFinRatioTr(scrData.finPbfPbfComp[i], PRICE_BASED_FIELDS , PRICE_BASED_FIELDS);
		}

		for(var i=0;i<scrData.finGnfGnfComp.length;i++){
			html+=getFinRatioTr(scrData.finGnfGnfComp[i], GURU_FIELDS , GURU_FIELDS);
		}




		for(var i=0;i<scrData.finShShComp.length;i++){
			html+=getFinRatioTr(scrData.finShShComp[i], SHARE_FIELDS , SHARE_FIELDS);
		}

		for(var i=0;i<scrData.finMrqMrqComp.length;i++){
			html+=getFinRatioTr(scrData.finMrqMrqComp[i], MRQ_FIELDS , MRQ_FIELDS);
		}

		for(var i=0;i<scrData.finTtmTtmComp.length;i++){
			html+=getFinRatioTr(scrData.finTtmTtmComp[i], TTM_FIELDS , TTM_FIELDS);
		}



		html+=printByRatioType(VAL_RATIO);
		html+=printByRatioType(PFT_RATIO);
		html+=printByRatioType(SOL_RATIO);
		html+=printByRatioType(EFF_RATIO);

		// printByRatioType(INC_STMT_FIELDS);
		



		html+= '</table>'; // BS TAB START...		

		html+= BREAK_LINE +  TSR_HR + BREAK_LINE;

		// HIGHLIGHTS

		html+= SP_3 + doBold("Highlights") ;

		html+= SP_3 + getButtonP('Price Based Ratio/Fields' , 'csFr.ar', PRICE_BASED_FIELDS + PARAM_DELIM + PRICE_BASED_FIELDS);

		html+= SP_3 + getButtonP('Guru Numbers' , 'csFr.ar', GURU_FIELDS + PARAM_DELIM + GURU_FIELDS);



		html+= SP_3 + getButtonP('Share Insight' , 'csFr.ar', SHARE_FIELDS + PARAM_DELIM + SHARE_FIELDS);

		html+= SP_3 + getButtonP('Most Recent Qtr (MRQ)' , 'csFr.ar', MRQ_FIELDS + PARAM_DELIM + MRQ_FIELDS);

		html+= SP_3 + getButtonP('Trailing Twelve Mths(TTM)' , 'csFr.ar', TTM_FIELDS + PARAM_DELIM + TTM_FIELDS);

		
		html+= BREAK_LINE +  TSR_HR + BREAK_LINE;

		// ------------ Valuations ----------------- 

		html+= SP_3 + doBold("Valuation Ratios") ;
		

		html+=printByRatioYear(VAL_RATIO);

		// html+= SP_3 + getButtonP('Latest FY' , 'csFr.ar',  'vr' + PARAM_DELIM + 'fy');

		html+= BREAK_LINE +  TSR_HR + BREAK_LINE;

		// ------------Over Lays ----------------- 

		html+= SP_3 + doBold("Profitability Ratios") ;
		html+=printByRatioYear(PFT_RATIO);


		// html+= SP_3 + getButtonP('Latest FY' , 'csFr.ar', 'pr' + PARAM_DELIM + 'fy');

		html+= BREAK_LINE +  TSR_HR + BREAK_LINE;

		// ------------ Solvency Ratios ----------------- 

		html+= SP_3 + doBold("Solvency Ratios") ;
		html+=printByRatioYear(SOL_RATIO);

		// html+= SP_3 + getButtonP('Latest FY' , 'csFr.ar', 'sr' + PARAM_DELIM + 'fy');

		html+= BREAK_LINE +  TSR_HR + BREAK_LINE;
		
		// ------------ Efficiency Ratios ----------------- 

		html+= SP_3 + doBold("Efficiency Ratios") ;
		html+=printByRatioYear(EFF_RATIO);
		// html+= SP_3 + getButtonP('Latest FY' , 'csFr.ar', 'er' + PARAM_DELIM + 'fy');

		html+= BREAK_LINE +  TSR_HR + BREAK_LINE;

		html+='<div '+CS_HELP_DIV_STYLE +'>';

/*
		var  helpText = "Tech Strength is based on Deep Analysis, Back Testing and Historical Trend Analysis using Machine Learning."
		+" Overall Technical Strength is based on 50+ indicators (and growing) including Technicals, moving Avg, chart patterns, "
		+" candlestick and proprietary algorithms.Technical Strength is calculated every 5 Mins for intraday "
		+" and around around 5 to 6 PM for EOD , Weekly and Monthly."

		helpText += BR_2 + "Tech Rank - the position of tock in terms of %. "+
		"For Example in universe of 2000 stocks, More bullish than 99% means it is in top 10. You can further sort using column sorter";

		helpText += BR_2 + ' You can mix and match strength of various ticks in this filter'

		helpText += BR_2 + 'More Type of Strength coming soon';

		html+=  getSpan(helpText,  'grey', 10);

*/

		html+='</div>';



		html +='</div>'; //pvCsDiv	

		// console.log(html);
		return html;
	}



	function getFinYrHtml(id){
		var scrData = mtgv.cs.screenerData;

		var html ='<br/><div id="'+id+'Div">';

		// html+=  htmlU.getSpan( " Please note this Upgraded version of FY /Qtr / CAGR Screener. This will replace legacy Bal Sheet/Cash Flow/ Inc Stmt Screener(Next Tabs)" , 'orange',10);

		html+=  htmlU.getSpan( " Please note that a more feature rich "
			+"version on <b>Fin Statement's</b> is now available at <b>Fin Statement(new)</b> " , 'orange',10);


		html+= '<table id="finYCtrlTab" class="'+INDI_TABLE_STYLE+' "  >';
		
		html+=printByRatioType(INC_STMT);
		html+=printByRatioType(BAL_SHEET);
		html+=printByRatioType(CASH_FLOW);
		
		html+=printByRatioType(INC_STMT_QTR);
		


		html+= '</table>'; // BS TAB START...		

		html+= BREAK_LINE +  TSR_HR + BREAK_LINE;

		// ------------ FY Income Statement ----------------- 

		html+= SP_3 + doBold("FY Income Statement ") ;
		

		html+=printByRatioYear(INC_STMT);


		html+= BREAK_LINE +  TSR_HR + BREAK_LINE;

		// ------------ Balance Sheet ----------------- 

		html+= SP_3 + doBold("Balance Sheet") ;
		html+=printByRatioYear(BAL_SHEET);

		html+= BREAK_LINE +  TSR_HR + BREAK_LINE;

		// ------------ Cash Flow ----------------- 

		html+= SP_3 + doBold("Cash Flow") ;
		html+=printByRatioYear(CASH_FLOW);
		html+= BREAK_LINE +  TSR_HR + BREAK_LINE;
		

		// ------------ Cash Flow ----------------- 

		html+= SP_3 + doBold("Qtr Inc Statement") ;
		html+=printByRatioYear(INC_STMT_QTR);
		html+= BREAK_LINE +  TSR_HR + BREAK_LINE;
		


		html+='<div '+CS_HELP_DIV_STYLE +'>';

		html+='</div>';

		html +='</div>'; //pvCsDiv	

		return html;
	}




	function  printByRatioType(ratioType){
		var scrData = mtgv.cs.screenerData;

		var periodArr = getPeriodArr(ratioType);



		var html='';
		for(var i=0;i< periodArr.length ;i++){
			var yrDef =periodArr[i];
			var dataType = scrData['fin'+ratioType + yrDef.id +'Comp'];

			for(var j=0;j<dataType.length;j++){
				html+=getFinRatioTr(dataType[j] , ratioType  , yrDef.id);
			}
		}
		return html;
	}

	function  printByRatioYear(ratioType){
		var periodArr = getPeriodArr(ratioType);

		var html=''
		for(var i=0;i< periodArr.length ;i++){
			var yrDef =periodArr[i];

			 html+= SP_3 + getButtonP(yrDef.label , 'csFr.ar',  ratioType + PARAM_DELIM + yrDef.id);

		}
		return html;
	}


	function getFinRatioTr(ratioObj , type, cat){

		var td = getFinRatioTds(ratioObj, type, cat);
		var html = '<tr id='+ratioObj.id+'>'
			 // + createTd( createDiv(ratioObj.id+'Td1Div', tds.td1, null)  , CS_LABEL_WIDTH) 
			 + createTd(createDiv(ratioObj.id+'Td2Div', td , null)) +'</tr>';

			 return html;
	}

	function getFinRatioTds(ratioObj ,  type, cat){
		var defs = getFinRatio( type, cat );
		var id = ratioObj.id;
		var func = 'csFr.rc';

		var def = jsu.getObjFrmArr(defs, id);

		var params = type + PARAM_DELIM + cat + PARAM_DELIM  +id;

		// var td1 = " " + def.label;
		var catLabel = getCatLabel(cat);


		var html = ' '
		html += catLabel +SP_3;
		html+=  getDropDown(defs, id+'ratio', null,func, params, ratioObj.ratio);
		html+= SP_3 ;//+ 'Stocks on  '

		html+=  getDropDown(OPS_AEB, id+'ops', null,func, params, ratioObj.ops);

		html+= SP_3 + getInputTxtParam( id+'v1' , 3, ratioObj.v1, func , params)	;

		if( ratioObj.ops ==  CS_BETWEEN){
				html+= SP_3 + " and ";
				html+= SP_3 + getInputTxtParam( id+'v2' , 3, ratioObj.v2, func , params)	;	
		}

		var delParam = getObjectType(type, cat)  + ':'+id; 
		html+= SP_3 + csh.delIcon(delParam) ;
		// return  {td1 : td1, td2 : html };

		return html;

	}

	function addRatio(type,cat, ratio){
		var ratioObjArr = getRatioObjectArr(type,cat);
		var id =  myTsrScreener.getNextId(type+cat +'CompId');
		var html ='';
		var ratioObj= null;
		var defs = null;

		defs = getFinRatio(type, cat);

		ratio =  jsu.isNull(ratio) ? defs[0].id : ratio;


		ratioObj={ id :id,  ratio : ratio ,type:type, cat : cat, goodData : true};
		ratioObjArr.push(ratioObj);
		html = getFinRatioTr(ratioObj, type, cat );

		if(jsu.containsString([INC_STMT , BAL_SHEET , CASH_FLOW , INC_STMT_QTR], type )){ // FY
			$('#finYCtrlTab').append( html);	
		}else{  // RATI
			$('#hlrCtrlTab').append( html);	
		}

		

		ratioChg(type, cat , id);
	}

	function ratioChg(type, cat , id){
		var ratioObjArr = getRatioObjectArr(type, cat);
		var ratioObj = jsu.getObjFrmArr(ratioObjArr, id);

		csu.setProp(ratioObjArr, ['ratio', 'ops','v1', 'v2'],id);

		var td = getFinRatioTds( ratioObj ,  type, cat);
		htmlU.addMsgToDiv( ratioObj.id+'Td2Div', true, td);

		if(jsu.isInputNumber(id +'v1')) {  // VALI ONLY
		}

		if( ratioObj.ops ==  CS_BETWEEN && isInputNumber(id+'v2')) {
		}
		csu.setProp(ratioObjArr, ['ratio', 'ops','v1', 'v2'],id);
		csu.dsf();
	}

	function getFinRatio( type, cat){

		var defs = null;
	
		if(type == PRICE_BASED_FIELDS){
			defs = RATIO_PRICE
		}else if(type == GURU_FIELDS){
			defs = GURU_NUMBERS
				

		}else if(type == SHARE_FIELDS){
			defs = SHARE_FIELD
		}else if(type == TTM_FIELDS){
			defs = TTM_RATIO_FIELD
		}else if(type == MRQ_FIELDS){
			defs = MRQ_RATIO_FIELD

		}else if(type == VAL_RATIO){
			defs = RATIO_VAL_DEF
		} else if(type == PFT_RATIO){
			defs = RATIO_PFT_DEF
		} else if(type == SOL_RATIO){
			defs = RATIO_SOL_DEF
		} else if(type == EFF_RATIO){
			defs = RATIO_EFF_DEF
		
		// Year ...	
		} else if(type == INC_STMT || type == INC_STMT_QTR){
			defs = INC_STMT_FIELDS
		} else if(type == BAL_SHEET){
			defs = BAL_SHEET_FIELDS
		} else if(type == CASH_FLOW){
			defs = CASH_FLOW_FIELDS
		}


		defs = getRatios(defs, cat);

		if(defs[0].id == 'period'){  // REMOVE From the default list...
			var newDefs = defs.slice();
			newDefs.shift();
			return newDefs;
		}

		return defs;
	}

	function getRatios(def, cat){
		if(jsu.containsString([TERM_FY, TERM_1Y, TERM_3Y , TERM_5Y,  TERM_7Y , TERM_10Y ], cat   )){
			return def;
		}

		if(jsu.containsString([TERM_QTR, TERM_QTR_GW_LAST, TERM_QTR_GW_YEAR ], cat   )){
			return def;
		}


		if(cat == PRICE_BASED_FIELDS  || cat == SHARE_FIELDS   || cat == MRQ_FIELDS || cat == TTM_FIELDS || cat == GURU_FIELDS ){
			return def;  // TO DO Implement for latest and others like MRQ , QoQ , latest Quarter...
		}
	}

	function getRatioObjectArr(type , cat){
		var scrData = mtgv.cs.screenerData;

		var objType = getObjectType(type , cat);
		return scrData[objType];

		// if(type == 'vr'){
		// 	if(cat == 'lat') return scrData.finVrLatComp;
		// 	if(cat == 'fy') return scrData.finVrFyComp;
		// }else if (type == 'pr'){
		// 	return scrData.finPrFyComp;
		// }else if (type == 'sr'){
		// 	return scrData.finSrFyComp;
		// }else if (type == 'er'){
		// 	return scrData.finErFyComp;
		// }

		// if (type=='finVrLatComp'){
		// 	defs = getFinRatio('vr', 'lat');
		// } else if (type==''){
		// 	defs = getFinRatio('vr', 'fy');
		// } else if (type==''){
		// 	defs = getFinRatio('pr', 'fy');
		// } else if (type=='finSrFyComp'){
		// 	defs = getFinRatio('sr', 'fy');
		// } else if (type=='finErFyComp'){
		// 	defs = getFinRatio('er', 'fy');
		// }

	}	

	function getObjectType(type , cat){
		var scrData = mtgv.cs.screenerData;

		return 'fin'+ type +cat +'Comp';
		// if(type == 'vr'){
		// 	if(cat == 'lat') return 'finVrLatComp';
		// 	if(cat == 'fy') return 'finVrFyComp';
		// }else if (type == 'pr'){
		// 	return 'finPrFyComp';
		// }else if (type == 'sr'){
		// 	return 'finSrFyComp';
		// }else if (type == 'er'){
		// 	return 'finErFyComp';
		// }
	}	

	function getCatLabel(cat){
		if( cat == PRICE_BASED_FIELDS  || cat == SHARE_FIELDS  || cat == MRQ_FIELDS || cat == TTM_FIELDS  || cat == GURU_FIELDS){
			return "";
		}

		var periodArr = jsu.arrayContainsId(YR_TYPE , cat) ? YR_TYPE : QTR_TYPE;

		var catObj = jsu.getObjFrmArr( periodArr , cat);
		if(catObj!=null){
			return catObj.label;
		}
		// other category ...
		return 'NO LAB';
	}


	function validateFields(validResults){
		var scrData = mtgv.cs.screenerData;

		validate(PRICE_BASED_FIELDS, PRICE_BASED_FIELDS , validResults);
		validate(GURU_FIELDS, GURU_FIELDS , validResults);

		validate(SHARE_FIELDS, SHARE_FIELDS , validResults);



		validate(MRQ_FIELDS, MRQ_FIELDS , validResults);
		validate(TTM_FIELDS, TTM_FIELDS , validResults);
		

		validateByFyType(VAL_RATIO, validResults);
		validateByFyType(PFT_RATIO, validResults);
		validateByFyType(SOL_RATIO, validResults);
		validateByFyType(EFF_RATIO, validResults);
		// validate('vr', 'fy'  , validResults);
		// validate('pr', 'fy'  , validResults);
		// validate('sr', 'fy' , validResults);
		// validate('er', 'fy' , validResults);
		

	}
	function validateFieldsYearly(validResults){
		var scrData = mtgv.cs.screenerData;
		validateByFyType(INC_STMT, validResults);
		validateByFyType(BAL_SHEET, validResults);
		validateByFyType(CASH_FLOW, validResults);

		validateByFyType(INC_STMT_QTR, validResults);		
	}


	function validateByFyType(ratioType, validResults){

		var periodArr = getPeriodArr(ratioType);

		for(var i=0;i< periodArr.length ;i++){
			var yrDef =periodArr[i];
			validate(ratioType, yrDef.id  , validResults);
		}
	}


	function validate( type , cat  , validResults ){
		var ratioArr = getRatioObjectArr( type , cat);

		for(var i=0;i< ratioArr.length ; i++){
			validateObj(ratioArr[i], type , cat , validResults);
		}

	}


	function validateObj(obj, type , cat , validResults){
		// var obj = scrData.returnsComp[i];
		obj.csType = FIN_HLR;


		if(type == INC_STMT ||  BAL_SHEET ==type ||  type ==CASH_FLOW || INC_STMT_QTR == type ){
			obj.csType = FIN_YR;
		}




		var ops = getObjFrmArr( OPS_AEB, obj.ops);
		var v1 = obj.v1;
		var v2 = obj.v2;

		var defs = getFinRatio(type , cat);
		var def = jsu.getObjFrmArr(defs, obj.ratio);

		var catLabel = getCatLabel(cat);
		var text = catLabel +SP_2 +  def.label + SP_2 ;

		// if(jsu.isNotNull( v1)) v1 = Number(v1);
		var goodData = true;

		var selParam = getObjectType(type, cat)  + ':'+obj.id; 

		if( jsu.isNotNull( v1) && jsu.isNumber(v1)){
				if(ops ==CS_BETWEEN){
					if( jsu.isNull(v2) || !isNumber(v2)){
						goodData = false;
					}else{
						text += ' between ' + v1 +  +' and ' + v2+  '%';	
					}
				}else{
					text += ' ' + ops.label + ' ' + v1 + (jsu.isNull( def.suffix) ? '' : def.suffix) ;
				}
				

				csh.cdt(obj,text, validResults, selParam, true);
		}else{
			goodData = false;
		}

		if(!goodData){
			

			csh.cdt(obj,  "Invalid value for " + text, validResults, selParam, false);
		}

	}

	function getBoldFields(srcArr){
		var boldArr = [];

		for(var i=0 ; i < srcArr.length ; i++){
			if( srcArr[i].bold ){
				var obj =  srcArr[i] ;

				if(obj.id == 'eps' || obj.id =='bvps') continue;

				var cloneObj = jsu.cloneObj(obj);
				cloneObj.label = obj.label +" (Cr)";
				boldArr.push( cloneObj );
			}
		}

		return boldArr;
	}

	function getPeriodArr(ratioType){
		var period = YR_TYPE;

		if(INC_STMT_QTR == ratioType) period = QTR_TYPE;

		return period;		
	}




	function getCustScrFilter(filter){

		// var filter = [];

		addRatioForSearch(filter, RATIO_PRICE , PRICE_BASED_FIELDS , PRICE_BASED_FIELDS);
		addRatioForSearch(filter, GURU_NUMBERS , GURU_FIELDS , GURU_FIELDS);
		addRatioForSearch(filter, SHARE_FIELD , SHARE_FIELDS , SHARE_FIELDS);

		addRatioForSearch(filter, MRQ_RATIO_FIELD , MRQ_FIELDS , MRQ_FIELDS);

		addRatioForSearch(filter, TTM_RATIO_FIELD , TTM_FIELDS , TTM_FIELDS);

		
		addFyRatioForSearch(filter, RATIO_VAL_DEF , VAL_RATIO , FIN_HLR);
		addFyRatioForSearch(filter, RATIO_PFT_DEF , PFT_RATIO  , FIN_HLR);
		addFyRatioForSearch(filter, RATIO_SOL_DEF , SOL_RATIO  , FIN_HLR);
		addFyRatioForSearch(filter, RATIO_EFF_DEF , EFF_RATIO  , FIN_HLR);


		addFyRatioForSearch(filter, INC_STMT_FIELDS , INC_STMT  , FIN_YR);
		addFyRatioForSearch(filter, BAL_SHEET_FIELDS , BAL_SHEET  , FIN_YR);
		addFyRatioForSearch(filter, CASH_FLOW_FIELDS , CASH_FLOW  , FIN_YR);
		addFyRatioForSearch(filter, INC_STMT_FIELDS , INC_STMT_QTR  , FIN_YR);



		// TODO .....
	}

	function addRatioForSearch(filter , list , type, cat){
		// type+cat +'CompId'
		for(var i=0;i< list.length ;i++){
			var ratio = list[i];

			var seqId = 'fin'+type+cat +'CompId'
			filter.push({  id :  seqId , label : ratio.label, slabel : ratio.shortName    , tab : FIN_HLR, 
				type : 'btn'  , filtDef : {obj:thisObject, fnc: 'afs' , params:  ratio.id  + PARAM_DELIM +type+ PARAM_DELIM +cat} }) ; 
		}
	}

	function addFyRatioForSearch(filter , list , ratioType , tab){
		var periodArr = getPeriodArr(ratioType);

		for(var i=0;i< periodArr.length ;i++){
			var yrDef =periodArr[i];

			var id =  'fin'+ratioType + yrDef.id +'Comp'

			for(var i=0;i< list.length ;i++){
				var ratio = list[i];
				filter.push({  id :  id , label : ratio.label, slabel : ratio.shortName    , tab : tab, 
					type : 'btn'  , filtDef : {obj:thisObject, fnc: 'afs' , params:  ratio.id  + PARAM_DELIM +ratioType+ PARAM_DELIM +yrDef.id} }) ; 

			}
		}
	}

	function addFromSearch(ratio, type, cat ){

		if(jsu.containsString([PRICE_BASED_FIELDS, GURU_FIELDS,SHARE_FIELDS ,  MRQ_FIELDS, TTM_FIELDS] , type)){
			// 
			addRatio(type, cat, ratio);
		}else if(jsu.containsString([VAL_RATIO, PFT_RATIO,SOL_RATIO ,  EFF_RATIO] , type)){
			// 
			addRatio(type, cat, ratio);
		}


	}


	return {
		frh : getFinRatioHtml,
		fry : getFinYrHtml,
		ar : addRatio, 
		rc :ratioChg,
		vf : validateFields,
		vfy : validateFieldsYearly,
		gcsf : getCustScrFilter,
		afs : addFromSearch

	}


})(); // module 		