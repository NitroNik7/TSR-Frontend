var csFrNg =  (function () {


	var thisObject = 'csFrNg';
	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;


	var CHG_FNC = thisObject +'.ua';


	var HL_LIST_CODE ='finHl';
	var GURU_LIST_CODE = 'guruNo'; 
	var VAL_RATIO_LIST_CODE = 'valRat'; 
	var PFT_RATIO_LIST_CODE = 'pftRat';
	var SOL_RATIO_LIST_CODE = 'solRat';
	var EFF_RATIO_LIST_CODE = 'effRat';


	var STRAT_VALUE_BASED = 'vb';
	var STRAT_COMP_AVG = 'ca';
	var STRAT_CAGR = 'cagr';
	
	// Other generic Strat in Common Files


	var HIGHLIGHTS_DEF =[


		];

	var NG_RATIO_LIST = [

			{id : HL_LIST_CODE ,  label : 'Highlights' ,  list : HIGHLIGHTS_DEF  , onlyVal : true },	
			{id : GURU_LIST_CODE ,  label : 'Guru Numbers' ,  list : GURU_NUMBERS  , onlyVal : true },
			{id : VAL_RATIO_LIST_CODE , label : 'Valuation Ratios' , list : RATIO_VAL_DEF   },
			{id : PFT_RATIO_LIST_CODE ,  label : 'Profitability Ratios' ,list : RATIO_PFT_DEF   },
			{id : SOL_RATIO_LIST_CODE ,  label : 'Solvency Ratios' ,list : RATIO_SOL_DEF   },
			{id : EFF_RATIO_LIST_CODE ,  label : 'Efficiency Ratios' ,list : RATIO_EFF_DEF   },

		];
	


	var RATIO_STRAT =[]
	var RATIO_STRAT_BASIC = [
			{'id':  STRAT_VALUE_BASED  , 'label' : 'Compare Value'  },
			{'id':  STRAT_COMP_AVG  , 'label' : 'Compare Average'  },
			{'id':  STRAT_CAGR  , 'label' : 'CAGR'  },
			
		];
	var RATIO_STRAT_ADV = [
			{'id':  STRAT_TREND  , 'label' : 'Trending'  },
			{'id':  STRAT_VS_AVG  , 'label' : 'Vs. Average'  },
			{'id':  STRAT_VS_HIST  , 'label' : 'Vs. History'  },
			{'id':  STRAT_VS_ANOTHER  , 'label' : 'Vs Another Field'  }
		];	

	var RATIO_STRAT = null ;

//      AEB --      baseField (PE)  freq(TTM)   Between v1 and v2
    
//      Vs Avg -      baseField(PE)  freq(FY)   AEB   v1 (2) yrs Avg by v2 (%)
    
//      CAGR     --  baseField(PE)  freq(FY)  v1 (5) yrs CAGR  >  v2 %
    
//      Vs Hist     baseField(PE)  freq(FY)  Period1 (latest) AEB  period 2( prev year) by v1 %   
    
//      Trending    baseField(PE)  freq(FY)  Trending up for last 5 Years ... 
    
//      Vs Another ratio - type PE AEB AEB  compField ratio  by v1
    
//      Deep Compare ...      type(PE)  freq(FY)  Period1 (latest) AEB  type2  period2 ( prev year) by v1 %   
    

	function inithighlights(){

		if(HIGHLIGHTS_DEF.length >0){
			return; // Already inited .... 
		}




		HIGHLIGHTS_DEF.push( jsu.getObjFrmArr(RATIO_PRICE, 'marCap'));
		HIGHLIGHTS_DEF.push( jsu.getObjFrmArr(RATIO_PRICE, 'divYield'));
		HIGHLIGHTS_DEF.push( jsu.getObjFrmArr(SHARE_FIELD, 'shInst'));
		HIGHLIGHTS_DEF.push( jsu.getObjFrmArr(SHARE_FIELD, 'shInsider'));
		
		HIGHLIGHTS_DEF.push( jsu.getObjFrmArr(RATIO_PRICE, 'fwdPe'));
		HIGHLIGHTS_DEF.push( jsu.getObjFrmArr(RATIO_PRICE, 'entVal'));
		HIGHLIGHTS_DEF.push( jsu.getObjFrmArr(SHARE_FIELD, 'outShare'));
	
		HIGHLIGHTS_DEF.push( jsu.getObjFrmArr(SHARE_FIELD, 'floatShare'));
		HIGHLIGHTS_DEF.push( jsu.getObjFrmArr(SHARE_FIELD, 'floatToOsShare'));
		
		HIGHLIGHTS_DEF.push( jsu.getObjFrmArr(SHARE_FIELD, 'faceVal'));

	}

	function init(){   // mtgv.mtpp.funda

		if(mtgv.mtpp.allPro || mtgv.mtpp.funda ){
			RATIO_STRAT = RATIO_STRAT_BASIC.concat(RATIO_STRAT_ADV);
		}else{
			RATIO_STRAT = RATIO_STRAT_BASIC;
		}



		inithighlights();
	}

	function getHtml(id){

		init();

		

		var html ='<br/><div id="'+id+'Div">';

		if(!jsu.isMigContext()){

			// html+=  htmlU.getSpan( "This is upgraded Version of <b>Ratio's</b>. "
			// 	+"We recommend you to use this tab instead. " , 'green',10);
		}

		html+= '<table id="finCtrlTab" '+TAB_INDI_STYLE+'  "  >';

		html+= getAllRows();

		html+='</table>';

		// var quickPointer = " To Add a Ratio multiple time, click <b>add</b> button next to ratio again";
		var quickPointer = " You can add same Ratio multiple time for different Strategies by Clicking <b>add</b> button next to Ratio again";

		html+=  SP_3 + getSpan(quickPointer,  '#465b66', 10);

		html+='<div class="row gy-2">'

		for(var i=0;i< NG_RATIO_LIST.length ;i++){
			var ngRatio = NG_RATIO_LIST[i];
			// html+= createScrPortlet(ngRatio.id, BOOT_4_12COL, ngRatio.label, ngRatio.list ,  null, ngRatio.id);
			html+= csFinCmnNg.csp (ngRatio.id, BOOT_4_12COL, ngRatio.label, ngRatio.list ,  null, ngRatio.id, thisObject);

		}


		html+='</div>';  // ROW ....

		html+='<div '+CS_HELP_DIV_STYLE +'>';

		var  helpText ='All values are consolidated,  '  // TO ADD   .....
		helpText+=  " <b>TTM</b>  - Trailing Twelve Months,"
		helpText+= " <b>MRQ</b>  - Most Recent Quarter"

		if(!isMobile()){	

			html+=  getSpan(helpText,  'grey', 10);

		}


		html+='</div>';


		html+='<br/>';
		html+='<br/>';

		return html;

	}


	function getAllRows(){
		var scrData = mtgv.cs.screenerData;

		let html = '';
		for(var i=0;i<scrData.finNgComp.length;i++){
			// html+=getRatioHtml(scrData.finNgComp[i]);
			var finObj = scrData.finNgComp[i];
			html += getRatioRow(finObj);
		}

		return html;

	}


	function getRatioRow(finObj){
		return '<tr id='+finObj.id+'>'+ createTd(createDiv(finObj.id+'Td2Div', getHtmlTds(finObj))) +'</tr>';

	}

	function getFormRow(type, id, state){
		let obj =   csu.gso('finNgComp', id)

		if(jsu.isNotNull(state)){
			if(state == 'enable')  obj.disabled  = false;
			if(state == 'disable') obj.disabled  = true	;
		}else{
			 obj.disabled  = false;
		}

		return getRatioRow(obj)

	}

	function getFormTd(type, id, state){

		let obj =   csu.gso('finNgComp', id)

		if(jsu.isNotNull(state)){
			if(state == 'enable')  obj.disabled  = false;
			if(state == 'disable') obj.disabled  = true	;
		}else{
			 obj.disabled  = false;
		}

		return getHtmlTds(obj)


	}



	function addNewFilter(type,baseField){
		var elem = getElem(type , baseField );

  		var finNgComp = mtgv.cs.screenerData.finNgComp;
	
		var id =  myTsrScreener.getNextId( 'finNgCompId');

		var finObj = null;

		var freq = getFreqArr(elem);

		var finObj = { id :id,   strat :RATIO_STRAT[0].id , freq : freq[0].id,   type : type ,   baseField: baseField };
	
		finNgComp.push(finObj);

		var td = getHtmlTds(finObj);


		let html =getRatioRow(finObj);



		return { html : html , id : id};
	}


	function addFilterChange(type, id){ //MA_PRICE_OPTIONS

		userAction(id);
	    csu.dsf();
		csu.dsf(); // displaySelectedFields();
	}


	  function addElem (type , baseField){

  		
  		let json = addNewFilter(type , baseField);

		// var html = '<tr id='+finObj.id+'>'	+ createTd(createDiv(finObj.id+'Td2Div', td)) +'</tr>';
	    $('#finCtrlTab').append( json.html);

	    addFilterChange(type, json.id)

	    var element = document.querySelector('#csControlsDiv');
	    element.scrollTop = 0;

	  }

	  function getHtmlTds(finObj){


	  		var func = CHG_FNC;

	  		var id = finObj.id;
		  	var elem = getElem(finObj.type , finObj.baseField );

		  	var html= doBold( elem.sLabel + " : " );

		  	var params =  id +  PARAM_DELIM  + finObj.strat ;  // type + PARAM_DELIM + cat + PARAM_DELIM  +id;



		  	html+= addFreqHtml(elem , finObj);

		  	if(onlyValBased(finObj)){ // Guru No, Highlight and Share Holding Don't have Hist
		  		finObj.strat = STRAT_VALUE_BASED
		  	}else{
		  		html+=  SP_2 +  getDropDown(RATIO_STRAT, id+'strat', null,func, params, finObj.strat);	
		  	}



		  	if(finObj.strat == STRAT_VALUE_BASED){  
		  		//      AEB --      baseField(PE)  freq(TTM)   Between v1 and v2
		  		html+= getValBasedTd(finObj, func , params);
		  	
		  	}else if(finObj.strat == STRAT_COMP_AVG){  
		  		//      AEB --      baseField(PE)  3 Yr Avg   Between v1 and v2
		  		html+= getCompAvgTd(finObj, func , params);	

		  	} else if(finObj.strat == STRAT_VS_AVG){
		  		//      Vs Avg -      baseField(PE)  freq(FY)   AEB   v1 (2) yrs Avg by v2 (%)
		  		html+=  getVsAvgTd(finObj, func , params);

		  	} else if(finObj.strat == STRAT_VS_HIST){	
		  		// Vs Hist     baseField(PE)  freq(FY)  Period1 (latest) AEB  period 2( prev year) by v1 %  
		  		html+=  getVsHistTd(finObj, func , params);
		  	} else if(finObj.strat == STRAT_CAGR){	
		  		//      CAGR     --  baseField(PE)  freq(FY)  v1 (5) yrs CAGR  >  v2 %
		  		html+= getCagrTd(finObj, func , params);
		  	} else if(finObj.strat == STRAT_TREND){	
		  		//      Trending    baseField(PE)  freq(FY)  Trending up for last 5 Years ...
		  		html+= getTrendingTd(finObj, func , params);

		  	} else if(finObj.strat == STRAT_VS_ANOTHER){	
		  		//      Vs Another ratio - baseField PE AEB AEB  type2 compField  by v1
		  		html += getVsAnotherRatio(finObj, func , params)
		  	
		  	} else if(finObj.strat == 'dc'){	
		  		//      Deep Compare ...      baseField(PE)  freq(FY)  Period1 (latest) AEB  compField  period2 ( prev year) by v1 %   
		  	}


		  	var param = 'finNgComp:'+id; // Vol Compare
		  	html+= csh.gept(finObj, FIN_RAT_NG,  param);
			html+= SP_3 + csh.delIcon(param) ; // '<a  onClick="javascript:'+thisAlias+'.delRow(\''+delObj+'\');"><font size="4" color="red"><span class="glyphicon glyphicon-remove"></span></font> </a> ';


		  	return html;
	  }

	  function getValBasedTd(finObj, func , params){

	  		var id = finObj.id;
	  		var html ='';

	  		var ratDef = jsu.getObjFrmArr( NG_RATIO_LIST , finObj.type); // Guru No hist not avail....

	  		if( (finObj.freq == 'fy' || finObj.freq == null) && !ratDef.onlyVal){
	  			var list = getHistPeriod(10, "Year");
	  			html+= SP_3 + getDropDown(list, id+'period1', null,func, params, finObj.period1);
	  		}

	  		html+= SP_3 + getDropDown(OPS_AEB, id+'ops', null,func, params, finObj.ops);

			html+= SP_3 + getInputTxtParam( id+'v1' , 3, finObj.v1, func , params)	;

			if( finObj.ops ==  CS_BETWEEN){
				html+= SP_3 + " and ";
				html+= SP_3 + getInputTxtParam( id+'v2' , 3, finObj.v2, func , params)	;	
			}


			if(finObj.type ==  HL_LIST_CODE){


				var def = jsu.getObjFrmArr( ratDef.list, finObj.baseField);
				if( jsu.isNotNull(  def.suffix) ){
					html+=  jsu.isMigContext() ?   ' (M)' : def.suffix ;
				}
			}


			return html;
	  }

	  function getCompAvgTd(finObj, func , params){

	  		var id = finObj.id;
	  		var html ='';

	  		
	  		html+= SP_3 + getInputTxtParam( id+'v3' , 3, finObj.v3, func , params)	;


	  		html+= (finObj.freq =='qtr') ?  " Qtr Avg " : " Year Avg " ;

	  		html+= SP_3 + getDropDown(OPS_AEB, id+'ops', null,func, params, finObj.ops);

			html+= SP_3 + getInputTxtParam( id+'v1' , 3, finObj.v1, func , params)	;

			if( finObj.ops ==  CS_BETWEEN){
				html+= SP_3 + " and ";
				html+= SP_3 + getInputTxtParam( id+'v2' , 3, finObj.v2, func , params)	;	
			}
			return html;
	  }

	  function getTrendingTd(finObj, func , params){

	  		var id = finObj.id;
	  		var html ='';
	  		html+= SP_3 + getDropDown(TRENDING_OPS, id+'ops', null,func, params, finObj.ops);

			html+= ' for min ' + getInputTxtParam( id+'v1' , 3, finObj.v1, func , params)	;


			html+= (finObj.freq =='qtr') ?  " Qtr  " : " Year " ;




			// html+= ' years';

			return html;
	  }

	  function getCagrTd(finObj, func , params){

	  	var html = ''
	  	var id = finObj.id;

	  	html+= SP_2 + getInputTxtParam( id+'v3' , 3, finObj.v3, func , params)	;

	  	html+= ' Years CAGR ' ;

	  	html+= SP_3 + getDropDown(OPS_AEB, id+'ops', null,func, params, finObj.ops);

	  	html+= SP_3 + getInputTxtParam( id+'v1' , 3, finObj.v1, func , params)	;

		if( finObj.ops ==  CS_BETWEEN){
			html+= SP_3 + " and ";
			html+= SP_3 + getInputTxtParam( id+'v2' , 3, finObj.v2, func , params)	;	
		}

	  	html+= ' % ' ;

	  	return html;
	  }

	  function getVsAvgTd(finObj, func , params){

	  	var html = ''

	  	var id = finObj.id;
	  	
	  	html+= SP_3 + getDropDown(AB_OPS, id+'ops', null,func, params, finObj.ops);

	  	html+= SP_3 + getInputTxtParam( id+'v1' , 3, finObj.v1, func , params)	;

	  	html+= (finObj.freq =='qtr') ?  " Qtr  " : " Year " ;

		html+= '  Average by' ;

		html+= SP_3 + getInputTxtParam( id+'v2' , 3, finObj.v2, func , params)   ;	

	  	html+= ' % ' + htmlU.getSpan('(<b>Optional</b> Range -200 to 1000)' , 'grey', 8)  ;	  

	  	return html;
	  }


	  function getVsHistTd(finObj, func , params){

	  	// return ' not yet implemented';

	  	var id = finObj.id;

	  	var tickType  = null;
	  	if(finObj.freq == null || finObj.freq =='fy'){
	  		tickType= " Year" 	  			
	  	}else{
	  		tickType= " Quarter" 	
	  	}

	  	var tickPeriod  = getHistPeriod(10, tickType);

	  	var html ='';

	  	html+= SP_3 + getDropDown(tickPeriod, id+'period1', null,func, params, finObj.period1);

	  	html+= SP_3 + getDropDown(AB_OPS, id+'ops', null,func, params, finObj.ops);

	  	if(jsu.isNull(finObj.period2)){
	  		finObj.period2= tickPeriod [1].id;
	  	}

	  	html+= SP_3 + getDropDown(tickPeriod, id+'period2', null,func, params, finObj.period2);

	  	html+= ' by ' + getInputTxtParam( id+'v1' , 3, finObj.v1, func , params)   ;	

	  	html+= ' % ' + htmlU.getSpan('(<b>Optional</b> Range 1 to 1000)' , 'grey', 8)  ;	

	  	return html;
	  }


	  function getVsAnotherRatio(finObj, func , params){

	  	var id = finObj.id;
	  	
	  	var html ='';

	  	html+= SP_3 + getDropDown(AB_OPS, id+'ops', null,func, params, finObj.ops);


	  	var anotherRatList = getCompareRatioList(finObj.type ,finObj.freq =='mrq' );
	  	

	  	if(finObj.freq =='mrq'){
	  		html+= ' Latest Qtr '
	  	}else{
	  		html+= ' Latest FY '
	  	}


	  	html+= SP_3 + getDropDown(anotherRatList, id+'compField', null,func, params, finObj.compField);

	  	html+= ' by ' + getInputTxtParam( id+'v1' , 3, finObj.v1, func , params)   ;	

	  	html+= ' % ' + htmlU.getSpan('(<b>Optional</b> Range 1 to 1000)' , 'grey', 8)  ;	

	  	return html;
	  }
	  


	  function onlyValBased(finObj){


	  	var ngRatiosDef = jsu.getObjFrmArr(NG_RATIO_LIST , finObj.type);

	  	return ngRatiosDef.onlyVal;



	  }

	  function addFreqHtml(elem , finObj){

	  		var html ='';

	  		var id = finObj.id;

	  		if(finObj.strat == STRAT_VALUE_BASED || finObj.strat == STRAT_VS_ANOTHER ){  
		  		var freq = getFreqArr(elem);
			  	if(freq.length > 1){
			  		html+=  SP_2 + getDropDown(freq, id+'freq', 'width:90px',CHG_FNC, id, finObj.freq) ;
			  	}
	  		}
	  		if(finObj.strat == STRAT_TREND ||   finObj.strat == STRAT_COMP_AVG  
	  				||   finObj.strat == STRAT_VS_AVG  ||   finObj.strat == STRAT_VS_HIST   ){
	  			var freq = getFyQtrArray(elem);
			  	if(freq.length > 1){
			  		html+=  SP_2 + getDropDown(freq, id+'freq', 'width:90px',CHG_FNC, id, finObj.freq) ;
			  	}
	  		}

	  		return html;
	  }


	  function getFreqArr(elem){

	  	var freq =[];
			if(elem.ttm){
				freq.push( { id : 'ttm' , label :'TTM'} );
			}

			if(elem.mrq){
				freq.push( { id : 'mrq' , label :'MRQ'} );
			}

			freq.push( { id : 'fy' , label : 'FY'} );

			return freq;
	  }

	  function getFyQtrArray(elem){

	  		var freq =[];
			
			freq.push( { id : 'fy' , label : 'FY'} );

			if(elem.mrq){
				freq.push( { id : 'qtr' , label :'Qtr'} );
			}

			

			return freq;

	  }



	  function getElem(type , baseField){


	  		var defList = jsu.getObjFrmArr(  NG_RATIO_LIST , type  );
/*
	  		var defList = null;

	  		if(type === VAL_RATIO_LIST_CODE){
	  			defList = RATIO_VAL_DEF;
	  		}else if(type === PFT_RATIO_LIST_CODE){
	  			defList = RATIO_PFT_DEF;
	  		}else if(type === EFF_RATIO_LIST_CODE){
	  			defList = RATIO_EFF_DEF;
	  		}else if(type === SOL_RATIO_LIST_CODE){
	  			defList = RATIO_SOL_DEF;
	  		}else if(type === GURU_LIST_CODE){
	  			defList = GURU_NUMBERS;
	  		}else if(type === HL_LIST_CODE){
	  			defList = HIGHLIGHTS_DEF;
	  		
	  		}
*/
	  		var elem = jsu.getObjFrmArr(  defList.list , baseField );

	  		return elem;

	  }



	  


	function userAction( id){

	  	var finObj= getObjFrmArr(mtgv.cs.screenerData.finNgComp, id);

	  	// var strat = $('#'+id+'strat').val();
	  	// var curStrat = finObj.strat; // just in case Ops change has impact....

	  	csu.setProp(mtgv.cs.screenerData.finNgComp, [ 'strat',  'ops', 'aeb',  'v1', 'v2','v3' ,'v4' , 'period1' ,'period2', 
	  			   , 'compField'  , 'freq'],  finObj.id);


	  	var td = getHtmlTds( finObj);

		htmlU.addMsgToDiv( finObj.id+'Td2Div', true, td);


		// obj.goodData = true;

		validateUsrInput(finObj)


	  	csu.setProp(mtgv.cs.screenerData.finNgComp, [ 'strat','ops','aeb', 'v1', 'v2','v3' ,'v4' , 'period1' ,'period2', 
	  			    'compField' , 'freq' ],  finObj.id);

	  	setType2(finObj);


	  	if(onlyValBased(finObj)){ // Guru No, Highlight and Share Holding Don't have Hist
		 	finObj.strat = STRAT_VALUE_BASED
		 }

	  	csu.dsf();

	  }

	  function validateUsrInput(finObj){

	  		var id = finObj.id;

	  		if(finObj.strat == STRAT_VALUE_BASED){  
		  		
	  			if(!isInputNumber(id+'v1'   ) ){
					return;
				} 
				if(!jsu.hasInput(id+'v1')) return;

				if( finObj.ops ==  CS_BETWEEN ) {
					
					if(!isInputNumber(id+'v2'   )) return;


					if(!jsu.hasInput(id+'v2')) return;
				}
		  	
		  	}else if(finObj.strat == STRAT_COMP_AVG){  

		  		if(!jsu.isIntegerInput(id+'v3')) return;

		  		if(!jsu.inputNumberRange(id+'v3', 2, 10)) return;

		  		// if(isInputNumber(id+'v1'   ) ){ } 
		  		if(!isInputNumber(id+'v1'   ) ){ return } 

				if( finObj.ops ==  CS_BETWEEN && !isInputNumber(id+'v2'   )) {}

		  	} else if(finObj.strat == STRAT_VS_AVG){
		  		if(!jsu.isIntegerInput(id+'v1') ) return;
		  		if(!jsu.inputNumberRange(id+'v1', 2, 10) ) return;
		  		
		  		if(jsu.isNotNull( finObj.v2) &&  isInputPositiveNumber(id+'v2'   ) ){ } 


		  	} else if(finObj.strat == STRAT_VS_HIST){	

		  		if(jsu.isNotNull( finObj.v1)){
		  			if(!isInputPositiveNumber(id+'v1'   ) ) return;
		  		}
		  	} else if(finObj.strat == STRAT_CAGR){	
		  		if(!jsu.isIntegerInput(id+'v3') ) return;
		  		if(!jsu.inputNumberRange(id+'v3', 2, 10) ) return

		  		if(!isInputNumber(id+'v1'   ) ){ return} 
				if( finObj.ops ==  CS_BETWEEN && !isInputNumber(id+'v2'   )) {}

		  	} else if(finObj.strat == STRAT_TREND){	
		  		if(!jsu.isIntegerInput(id+'v1') ) return;
		  		if(!jsu.inputNumberRange(id+'v1', 2, 10) );
		  	} else if(finObj.strat == STRAT_VS_ANOTHER){	
		  		if(jsu.isNotNull( finObj.v1)){

		  			isInputPositiveNumber(id+'v1'   );
		  		}
		  	
		  	} else if(finObj.strat == 'dc'){	
		  		//      Deep Compare ...      baseField(PE)  freq(FY)  Period1 (latest) AEB  compField  period2 ( prev year) by v1 %   
		  	}
	  }



	 function setType2(finObj){
		if(finObj.strat == STRAT_VS_ANOTHER   ){

	  		if(jsu.isNotNull(  jsu.getObjFrmArr( RATIO_VAL_DEF , finObj.compField )  )){
	  			finObj.type2 = 	VAL_RATIO_LIST_CODE
	  		} else if(jsu.isNotNull(  jsu.getObjFrmArr( RATIO_PFT_DEF , finObj.compField )  )){
	  			finObj.type2 = 	PFT_RATIO_LIST_CODE
	  		}else if(jsu.isNotNull(  jsu.getObjFrmArr( RATIO_SOL_DEF , finObj.compField )  )){
	  			finObj.type2 = 	SOL_RATIO_LIST_CODE
	  		}else if(jsu.isNotNull(  jsu.getObjFrmArr( RATIO_EFF_DEF , finObj.compField )  )){
	  			finObj.type2 = 	EFF_RATIO_LIST_CODE
	  		}
	  	}

	 } 




	  // TODO -- to complete .....

	function validate(validResults){

		var scrData = mtgv.cs.screenerData;
		for ( var i=0;i< scrData.finNgComp.length ;i++){
			
			var finObj = scrData.finNgComp[i];

			var selParam = 'finNgComp:'+finObj.id; // Vol Compare

			var text ='' ;  // ALL goo
			finObj.goodData =true;

			finObj.csType = FIN_RAT_NG;

			var finDef = getElem(finObj.type , finObj.baseField)


			var tickType  = (finObj.freq =='qtr') ?  " Quarter  " : " Year " ;

		  	var tickPeriod  = getHistPeriod(10, tickType);

			if(finObj.strat == STRAT_VALUE_BASED){  

				if( finObj.freq == 'mrq' ){
					text +=  'MRQ '
				}else if ( finObj.freq == 'ttm' ){
					text +=  'TTM '
				}else if ( finObj.freq == 'fy' ){
					var period1Def = jsu.getObjFrmArr(tickPeriod , finObj.period1 );
					text +=  period1Def.label + ' ';
				}

				text += handleAeb(finObj, finDef, opsDef);

				if(finObj.type ==  HL_LIST_CODE){
					if( jsu.isNotNull(  finDef.suffix) ){
						text +=  jsu.isMigContext() ?   ' (M)' : finDef.suffix ;
					}
				}
	  	
		  	}else if(finObj.strat == STRAT_COMP_AVG){  

				text +=  finObj.v3;

				text += (finObj.freq =='qtr') ?  " Qtr Avg " : " Year Avg " ;


				// text+=  ' '+ opsDef.label + ' ' + finObj.v1; 
				
				text += handleAeb(finObj, finDef, opsDef);	

				text+= ' %'

		  	} else if(finObj.strat == STRAT_VS_AVG){

		  		var opsDef = jsu.getObjFrmArr(OPS_AEB, finObj.ops  );

		  		if(!jsu.isNumber(finObj.v1) ||  finObj.v1<2  || finObj.v1 > 11){
					finObj.goodData = false;
				}
				text = '"' + finDef.label  + '" ' 

				text+=  ' is '+ opsDef.label  + ' ' +  finObj.v1 ;

				text+= (finObj.freq =='qtr') ?  " Qtr Avg " : " Year Avg " ;


				// text+= finObj.v1; 
				
				if(jsu.isNotNull( finObj.v2)){
		  			text += ' by min ' + finObj.v2 +' %';

		  			if(!jsu.isNumber(finObj.v2) ||  finObj.v2<2 && finObj.v2 > 11){
						finObj.goodData = false;
					}
		  		}	
	
		  	} else if(finObj.strat == STRAT_VS_HIST){	

		  		text = finDef.label  + ' ' 
		  		
		  		

		  		var period1Def = jsu.getObjFrmArr(tickPeriod , finObj.period1 );
				var period2Def = jsu.getObjFrmArr(tickPeriod , finObj.period2 );

				var opsDef = jsu.getObjFrmArr(OPS_AEB, finObj.ops  );
				
				text += period1Def.label +  ' '+ opsDef.label  + ' ' + period2Def.label;

				
		  		if(jsu.isNotNull( finObj.v1)){
		  			text += ' by min ' + finObj.v1 +' %';

					if(!jsu.isNumber(finObj.v1) ||  finObj.v1<1 && finObj.v1 > 11){
						finObj.goodData = false;
					}

		  		}

		  	} else if(finObj.strat == STRAT_CAGR){	
		  		

		  		
				text =  finObj.v3 + ' years CAGR ';

				// text+=  ' '+ opsDef.label + ' ' + finObj.v1; 
				
				text += handleAeb(finObj, finDef, opsDef);	
				text+= ' %'

		  	} else if(finObj.strat == STRAT_TREND){	

		  		var opsDef = jsu.getObjFrmArr(TRENDING_OPS, finObj.ops  );

				if(!jsu.isNumber(finObj.v1)){
					finObj.goodData = false;
				}

				var tickType  = '';
			  	tickType =  (finObj.freq =='qtr') ?  " Qtr  " : " Year  " ;

				text = finDef.label  + ' '  + opsDef.label + ' for min '  + finObj.v1 + tickType;


		  	} else if(finObj.strat == STRAT_VS_ANOTHER){	

		  		var opsDef = jsu.getObjFrmArr(OPS_AEB, finObj.ops  );
		  		text += (finObj.freq == 'mrq' ) ? 'MRQ ' : ''
				text += (finObj.freq == 'ttm' ) ? 'TTM ' : ''
				text += '"' + finDef.label  + '" is '  + opsDef.label 	;	  		

				text += ' FY ' ; 				

				var finDef2 = getElem(finObj.type2 , finObj.compField);
				text +=  '"' + finDef2.label +'"' 
		  	
				if(jsu.isNotNull(finObj.v1)    ){

					if(!jsu.isNumber(finObj.v1)){
						finObj.goodData = false;	
					}else{
						text+= ' by ' + finObj.v1 + ' %';	
					}
					

					

				}

				

		  	} else if(finObj.strat == 'dc'){	
		  		//      Deep Compare ...      baseField(PE)  freq(FY)  Period1 (latest) AEB  compField  period2 ( prev year) by v1 %   
		  	}

			// text += 'all good...'


			if(finObj.goodData){
				csh.cdt(finObj,text, validResults, selParam, true);	
			}else{

				var badmsg = finDef.label  +' settings is incorrect ';
				csh.cdt(finObj,badmsg, validResults, selParam, false);
			}
			
		}

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


	function getCompareRatioList(baseType, mrq){

		var baseList = [];

		if(mrq){
			for(var i= 0;i< NG_RATIO_LIST.length ;i++){
				addRatToList(baseList ,NG_RATIO_LIST[i]. list , mrq );
			}
		}else{
			var ratioDef = jsu.getObjFrmArr( NG_RATIO_LIST , baseType);

			addRatToList(baseList , ratioDef.list , mrq )

			for(var i= 0;i< NG_RATIO_LIST.length ;i++){
				
				ratioDef = NG_RATIO_LIST[i];

				if(ratioDef.onlyVal){
					continue;
				}

				if(ratioDef.id == baseType) {
					continue; // al ready added ...
				}

				addRatToList(baseList ,NG_RATIO_LIST[i]. list , mrq );
			}

		}

	  	return baseList;
	}

	function addRatToList(baseList , list , mrq ){

		for(var i=0;i<  list.length ;i++){
			var elem = list[i];

			if(elem.id === 'period') continue;

			if(mrq  ){
				if( elem.mrq ) { baseList .push(elem); }
			}else{
					baseList .push(elem);
			}
		}
	}
	
	function getCustScrFilter(filer, defFilter){

		if(jsu.isNull(RATIO_STRAT)){
			init();
		}

		for(var i=0;i< NG_RATIO_LIST.length ;i++){
			var ngRatio = NG_RATIO_LIST[i];
			
			addFilter(filer, ngRatio, defFilter)
		}
		return filer ;
	}
	function addFilter(filer,ngRatio , defFilter){		

		var ratioList =  ngRatio.list;

		for(var i=0;i< ratioList.length ;i++){
			var thisRatio = ratioList[i];

			var secParam =thisRatio.id;


			let mobFilter = FIN_RAT_NG +'_'+ngRatio.id + '_'+thisRatio.id;
			
			let obj = {  id :  "finNgComp" , label : thisRatio.label + ", " + thisRatio.sLabel  , slabel : thisRatio.sLabel    ,
			 	tab : FIN_RAT_NG,  type : 'btn'  ,
			  	filtDef : {obj:thisObject, fnc: 'ae' , params:  ngRatio.id  + PARAM_DELIM +thisRatio.id} ,
			  	mobFilter: mobFilter
			};

			if(jsu.containsString(['piotroskiF','roe','roa', 'peTtm',	'debt2Eq', 'cashRatio'], thisRatio.id)){
				defFilter.push(obj);
			}


			filer.push(obj) ; 
		}
		
	}

	 function getHistPeriod(period, suffix){
		return csFinCmnNg.ghp(period, suffix)
	}



	function ngSearch(item, filterDef, params ){

		paintFilterRow(params[0], params[1] );
	}

	function paintFilterRow(type, subType) {
		// { html: html, id: id }

		mtgv.cs.editActive = [];
		let newFilterRow = addNewFilter(type, subType);

		let filterTable = $("#" + CS_FILTERS_TABLE);
		
		filterTable.append(newFilterRow.html);

		mtgv.cs.editActive.push(newFilterRow); 

		addFilterChange(type,  newFilterRow["id"]);

		// mtgv.cs.editActive.push(newFilterRow); 
		csh.sib(false);
	}

	return {


		// New Starts 

		gar : getAllRows,

		gfr : getFormRow,

		gftd : getFormTd,

		anf : addNewFilter,

		afc : addFilterChange,

		pfr : paintFilterRow,

		ngs : ngSearch,

		// New Ends



		ght : getHtml,
		ae : addElem,
		ua : userAction,


		val : validate,

		gcsf : getCustScrFilter




	}

})(); // module 	

