
var csfdc =  (function () { // CS Field Deep Compare
// CS Commons
	var htmlU = mintHtmlUtil;
	// var htmlU = mintHtmlUtil;
	
	var jsu = mintJsUtil;
	var thisObject = 'csfdc';

	var CHG_FNC = thisObject +'.ua';

	var STRAT_VALUE_BASED = 'vb';
	var STRAT_COMP_GROWTH = 'cg';

	var STRAT_OPT =[]

	var STRAT_BASIC = [
			{'id':  STRAT_VALUE_BASED  , 'label' : 'Absolute Value'  },
			{'id':  STRAT_COMP_GROWTH  , 'label' : 'Change (%)'  },
	];

	var STRAT_ADV = [
			{'id':  STRAT_TREND  , 'label' : 'Trending'  },
			{'id':  STRAT_VS_AVG  , 'label' : 'Vs. Average'  },
			// {'id':  STRAT_VS_HIST  , 'label' : 'Vs. History'  },
	];	


	var PARAM_LIST = [
			{'id':  CS_TURNOVER  , 'label' : 'Turnover (Price x Vol)' , tab : 'priceCtrlTab'  , csType: PRICE_CS},
		];


	function init(){

		if(mtgv.mtpp.allPro){
			STRAT_OPT = STRAT_BASIC.concat(STRAT_ADV);
		}else{
			STRAT_OPT = STRAT_BASIC;
		}
	}




	function addNewRow(type){

		var obj = jsu.getObjFrmArr(PARAM_LIST , type);


		var objArr = mtgv.cs.screenerData[ type];
		var id =  myTsrScreener.getNextId( type+ 'Id');

		var ticks = csu.gct({} , null);

		var finObj = {
			id : id, strat : STRAT_VALUE_BASED, v1:10, ops : OPS_AEB[0].id  , goodData : true , gen:'alpha'
		};

		objArr.push(finObj); 

		let html = getTrHtml(finObj, type);


		return { html : html , id : id};
		

	}



	function addNew(type){
		// init();

		var obj = jsu.getObjFrmArr(PARAM_LIST , type);

		let json = addNewRow(type);

		$('#' + obj.tab).append( json.html);

	    csu.dsf(); // displaySelectedFields();	

		// $('#' + obj.tab ).append( getTrHtml(finObj, type));

		// csu.dsf(); // displaySelectedFields();	
	}

	



	function getTrHtml(finObj, objType){
		init();

		// if(!mtgv.mtpp.crossFreq){
		// 	return '';
		// }

		var html = getHtmlTds(finObj , objType);

		var obj = jsu.getObjFrmArr(PARAM_LIST , objType);

		if(mtgv.cs.ng){
				var html = '<tr id=' + compObj.id + '>'
						+ createTd(createDiv(compObj.id + 'Td2Div', html, null)) + '</tr>';
				return html;			
			}

		return  csh.dynTr(finObj, {td1 : doBold( obj.label ), td2 : html })
	}


	function getHtmlTds(finObj, objType){

		var func = CHG_FNC;

	  	var id = finObj.id;

	  	var params =  id +  PARAM_DELIM  + finObj.strat ;
	  	var obj = jsu.getObjFrmArr(PARAM_LIST , objType);
	  	var html =''

	  	if(mtgv.cs.ng){
			html += doBold(obj.label)+BREAK_LINE;

		}

	  	html+=  SP_2 +  getDropDown(STRAT_OPT, id+'strat', null,func, params, finObj.strat);	


		if(finObj.strat == STRAT_VALUE_BASED){  
		  		//      AEB --      baseField(PE)  freq(TTM)   Between v1 and v2
		  		html+= getValBasedTd(finObj, func , params);

		}else if(finObj.strat == STRAT_COMP_GROWTH){   // new
		  		html+= getCompGwthTd(finObj, func , params);

		} else if(finObj.strat == STRAT_VS_AVG){
		  		//      Vs Avg -      baseField(PE)  freq(FY)   AEB   v1 (2) yrs Avg by v2 (%)
		  		html+=  getVsAvgTd(finObj, func , params);

		} else if(finObj.strat == STRAT_TREND){	
		  		//      Trending    baseField(PE)  freq(FY)  Trending up for last 5 Years ...
		  		html+= getTrendingTd(finObj, func , params);
		}

		if(mtgv.mtpp.crossFreq){ // Cross Freq....
			var ticks = csu.gct(finObj , 'tick1');
			html+=  htmlU.getSpan(' On ' , 'grey' , 10) + 	getDropDown(ticks, finObj.id+'tick1', 'width:90px',func, finObj.id, finObj.tick1) 
			+ htmlU.getSpan(' Tick ' , 'grey' , 10)
		}

		var param =  objType +':'+id; // Vol Compare
		html+= SP_3 + csh.delIcon(param) ; // '<a  onClick="javascript:'+thisAlias+'.delRow(\''+delObj+'\');"><font size="4" color="red"><span class="glyphicon glyphicon-remove"></span></font> </a> ';

		return html;

	}


	function getValBasedTd(finObj, func , params){

  		var id = finObj.id;
  		var html ='';

  		html+= SP_3 + getDropDown(OPS_AEB, id+'ops', null,func, params, finObj.ops);

		html+= SP_3 + getInputTxtParam( id+'v1' , 8, finObj.v1, func , params)	;

		if( finObj.ops ==  CS_BETWEEN){
			html+= SP_3 + " and ";
			html+= SP_3 + getInputTxtParam( id+'v2' , 8, finObj.v2, func , params)	;	
		}

		html+= ' ' + getPriceDenom();

		html += getAdvProOptions();

		return html;

	  }


	  function getCompGwthTd(finObj, func , params){

	  		var id = finObj.id;
	  		var html ='';

	  		

	  		html+= SP_3 + getDropDown(GAIN_LOSS, id+'gainLoss', null,func, params, finObj.gainLoss);

	  		html+= '  %';

	  		html+= SP_3 + getDropDown(OPS_AEB, id+'ops', null,func, params, finObj.ops);

			html+= SP_3 + getInputTxtParam( id+'v1' , 3, finObj.v1, func , params)	;

			if( finObj.ops ==  CS_BETWEEN){
				html+= SP_3 + " and ";
				html+= SP_3 + getInputTxtParam( id+'v2' , 3, finObj.v2, func , params)	;	
			}

			html += getAdvProOptions();

			return html;

	  }

	  function getTrendingTd(finObj, func , params){
	  		var id = finObj.id;
	  		var html ='';
	  		html+= SP_3 + getDropDown(TRENDING_OPS, id+'ops', null,func, params, finObj.ops);

			html+= ' for min ' + getInputTxtParam( id+'v1' , 3, finObj.v1, func , params)	;

			html+= ' Ticks ';

			html += getAdvProOptions();

			return html;
	  }


	  function getVsAvgTd(finObj, func , params){

	  	var html = ''

	  	var id = finObj.id;
	  	
	  	html+= SP_3 + getDropDown(AB_OPS, id+'ops', null,func, params, finObj.ops);

	  	html+= SP_3 + getInputTxtParam( id+'v1' , 3, finObj.v1, func , params)	;


	  	html+= " Period";

		html+= '  Average by' ;

		html+= SP_3 + getInputTxtParam( id+'v2' , 3, finObj.v2, func , params)   ;	

	  	html+= ' % ' + htmlU.getSpan('(<b>Optional</b> Range -200 to 1000)' , 'grey', 8)  ;	  

	  	return html;
	  }


	  //  User Action ................

	  function userAction( id){


	  	var objArr = getObjArr(id)


	  	var finObj= getObjFrmArr(objArr, id);

	  	csu.setProp(objArr, [ 'strat',  'ops', 'aeb',  'v1', 'v2' , 'gainLoss',
	  			   'tick1'],  finObj.id);
	  	if(htmlU.isChecked(finObj.id+'advOpt')){
			finObj.advOpt = true;
		}

		var objectType = getObjType(finObj.id);

	  	var td = getHtmlTds( finObj, objectType);

		htmlU.addMsgToDiv( finObj.id+'Td2Div', true, td);

		validateUsrInput(finObj)

	  	csu.setProp(objArr, [ 'strat',  'ops', 'aeb',  'v1', 'v2' , 'gainLoss',
	  			   'tick1'],  finObj.id);

	  	csu.dsf();

	  }


	  function validateUsrInput(finObj){

	  		var id = finObj.id;

	  		finObj.goodData = true;

	  		if(finObj.strat == STRAT_VALUE_BASED){  
		  		
	  			if(!isInputPositiveNumber(id+'v1'   ) ){	 finObj.goodData = false		} 
				if( finObj.ops ==  CS_BETWEEN && !isInputNumber(id+'v2'   )) {  finObj.goodData = false}
		  	
		  	}else if(finObj.strat == STRAT_COMP_GROWTH){  

		  		if(!isInputNumber(id+'v1'   ) ){ finObj.goodData = false} 
				if( finObj.ops ==  CS_BETWEEN && !isInputNumber(id+'v2'   )) {finObj.goodData = false}
  	
		  	
		  	} else if(finObj.strat == STRAT_VS_AVG){
		  		
		  		if(!jsu.isIntegerInput(id+'v1') || jsu.inputNumberRange(id+'v1', 2, 30)) {
		  			finObj.goodData = false;
		  		}
		  		
		  		if(jsu.isNotNull( finObj.v2) &&  isInputPositiveNumber(id+'v2'   ) ){ finObj.goodData = false} 

		  	} else if(finObj.strat == STRAT_TREND){	
		  		if(!jsu.isIntegerInput(id+'v1') || !jsu.inputNumberRange(id+'v1', 2, 10)){
		  			finObj.goodData = false
		  		}
		  	
		  	} 
		}






	function validateFields(validResults){

		var scrData = mtgv.cs.screenerData;

		validateArr(validResults , scrData[CS_TURNOVER] , jsu.getObjFrmArr(PARAM_LIST, CS_TURNOVER));

		// for ( var i=0;i< scrData.finStmtNgComp.length ;i++){
			
		// 	var finObj = scrData.finStmtNgComp[i];

		// 	var selParam = 'finStmtNgComp:'+finObj.id; // Vol Compare

			

		// 	finObj.csType = FIN_STMT_NG;

		// 	var finDef = getElem(finObj.type , finObj.baseField)	

			
		// 	validateObj( finObj ,finDef  ) ;
			
		// }

	}

	function validateArr(validResults, objArr , objDef){
		var scrData = mtgv.cs.screenerData;

		// var objArr =  getObjArr(id)



		for ( var i=0;i< objArr.length ;i++){
			
			var finObj = objArr[i];

			// var selParam =  objDef.id ':'+finObj.id; // Vol Compare

			
			finObj.csType = objDef.csType,

			// finObj.csType = FIN_STMT_NG;

			// var finDef = getElem(finObj.type , finObj.baseField)	

			
			validateObj(validResults, finObj ,objDef  ) ;
			
		}

	}



	function validateObj(validResults, finObj ,finDef  ){

		var selParam =  finDef.id +':'+finObj.id; // Vol Compare


		var text ='' ;  // ALL goo
		
		finObj.goodData =true;

		// var tickPeriod  = getTickList(finObj);

		if(finObj.strat == STRAT_VALUE_BASED){  

			// var period1Def = jsu.getObjFrmArr(tickPeriod , finObj.period1 );

  			text +=  finDef.label + ' ' +  handleAeb(finObj, finDef, null) + ' ' + getPriceDenom();
  
  		}else if(finObj.strat == STRAT_COMP_GROWTH){  

		  		// var period1Def = jsu.getObjFrmArr(tickPeriod , finObj.period1 );
		  		var opsDef = jsu.getObjFrmArr(OPS_AEB, finObj.ops  );

		  		text+= ' Growth of '  
		  		text += handleAeb(finObj, finDef, opsDef);	
				text+= ' %';
	  	
	  	} else if(finObj.strat == STRAT_VS_AVG){
	  		
	  		var opsDef = jsu.getObjFrmArr(OPS_AEB, finObj.ops  );

	  		if(!jsu.isNumber(finObj.v1) ||  finObj.v1<2  || finObj.v1 > 30){
				finObj.goodData = false;
			}
			text = '"' +finDef.label  + '" ' 

			text+=  ' '+ opsDef.label  + ' ' + finObj.v1 + ' Ticks'+' avg '; 
			
			if(jsu.isNotNull( finObj.v2)){
	  			text += ' by min ' + finObj.v2 +' %';

	  			if(!jsu.isNumber(finObj.v2) ||  finObj.v2<2 && finObj.v2 > 11){
					finObj.goodData = false;
				}
	  		}	
	  		
	  	} else if(finObj.strat == STRAT_TREND){	
	  		var opsDef = jsu.getObjFrmArr(TRENDING_OPS, finObj.ops  );

			if(!jsu.isNumber(finObj.v1)){
				finObj.goodData = false;
			}
			text = finDef.label  + ' '  + opsDef.label + ' for min '  + finObj.v1 
			 +'Ticks';
	  		
	  	} 

		if(finObj.goodData){
			csh.cdt(finObj,text, validResults, selParam, true);	
		}else{

			var badmsg = finDef.label  +' settings is incorrect ';
			csh.cdt(finObj,badmsg, validResults, selParam, false);
		}

	}



	function getPriceDenom(){

		if(jsu.isMigContext()){
			return 'M'
		}else{
			return 'Cr'
		}
	}


	function getAdvProOptions(finObj){
		var html =''
/*
		if(mtgv.mtpp.allPro){
			html+= getAdvOptionHtml(finObj);

			html+= getTickHtml(finObj);
		}

*/		
		return html;
	}


	function getTickHtml(finObj ,func,  field){
		var html =''

		if(finObj.advOpt ){

			if( jsu.isNull(field) ) field = 'tick1';
			if( jsu.isNull(func) ) func = CHG_FNC;

			var ticks = csu.gct(finObj , 'tick1');

			html+= BR_2;
			html+= SP_3 +	getDropDown(ticks, finObj.id+field , 'width:90px',func, finObj.id, finObj[field]) ;	

			html+= ' Tick';

		}
		return html;
	}


	function getAdvOptionHtml(finObj, func){
		var html =''
		if( jsu.isNull(func) ) func = CHG_FNC;

		html+=  SP_3+   htmlU.getCheckboxP( finObj.id+ 'advOpt', func,  ( finObj.advOpt ? 'checked' : '' ), finObj.id  ) + ' Advance Options '
		return html;
	}


	function handleAeb(finObj, finDef, opsDef){

		var opsDef = jsu.getObjFrmArr(OPS_AEB, finObj.ops  );

		if(!jsu.isNumber(finObj.v1)){
			finObj.goodData = false;
		}

		var text = ''
		if( finObj.ops !=  CS_BETWEEN ){
			return  '"'+ finDef.label  + '" is '+ opsDef.label + ' ' + finObj.v1; 
		}

		if(!jsu.isNumber(finObj.v2)) {
			finObj.goodData = false;
		}else{
			finObj.goodData = true;	
			text = '"'+ finDef.label  + '"is '+ opsDef.label + ' ' + finObj.v1  + ' and ' + finObj.v2 ; 
		}

		return text;
	}


	function getObjArr(id){

		if(id.startsWith(CS_TURNOVER)){
	  		return mtgv.cs.screenerData[CS_TURNOVER];
	  	}
	}

	function getObjType(id){

		if(id.startsWith(CS_TURNOVER)){
	  		return CS_TURNOVER;
	  	}
	}


	return {
		an : addNew,

		anr : addNewRow,
		gth : getTrHtml,

		gpd : getPriceDenom,
		ua : userAction,

		vf : validateFields

	}

})(); // module 	