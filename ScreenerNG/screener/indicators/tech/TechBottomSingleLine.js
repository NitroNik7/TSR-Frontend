


// TechBottomSingleLine

// Single input ....

// jsu.containsString([CMF, ATR, ROC], techObj.subType)

var tibsl =  (function () {


	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;

	var BULL_MACO = 'BullMaCo';
	var BEAR_MACO = 'BearMaCo';

	var TECH_INDI_INDEX = cscmn.gttp(20);


	function getAdvOptionCommon(indi, label){

		var options = cst.gmo(indi, label);  // MACO Options .....

		// Add other options as needed....
		if(jsu.containsString([ATR, STD_DEV] , indi)  ){
			var moreOpt  = cst.amo(indi, label,INDI_PRICE_RATIO );  // Swing Rejection Options .....
			options = jsu.arrayAddAll(options,  moreOpt, true);
		}


		return options;
	}



	function isAdvOptions(techObj){

		var advOpts = getAdvOptionCommon(techObj.indi , techObj.indi  );

		return jsu.arrayContainsId(advOpts, techObj.ops);
				

	}




	function getCrossTickSpec(techObj , objDef, func){
		var html = '';

		if(!mtgv.mtpp.crossFreq){ // Cross Freq.... 
			return html;
		}
		var id = techObj.id;

		html+= '<div id ="' +id+'CustSetDiv">';

		html +=  getDropDown(TECH_INDI_INDEX, techObj.id+'indiIndex', null,func, null, techObj.indiIndex);
		html+= SP_2

		//   Single period & single line ... 
		if(jsu.containsString([CMF, ATR, ROC, STD_DEV], techObj.subType)){

			// mcval.sina(techObj , 'p1') // sets def Val
			setCrossTickDefVals(techObj);
			// html+=   objDef.shortName  +' Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , id)	;
			html+= getCrossTickHtml(techObj , objDef, func, id)
			html+='<br/>';	
		}



		html+='</div>';

		return html;

	}

	function getCrossTickHtml(techObj , objDef, func, param){

		return objDef.shortName  +' Period ' + getInputTxtParam( techObj.id+'p1' , 3, techObj.p1, func , param)	;
	}

	function setCrossTickDefVals(techObj ){
		mcval.sina(techObj , 'p1') // sets def Val
	}


	function getOpsOptionsDD(techObj, objDef, func){


		var opsOption = mtgv.mtpp.TECH_OPS;


		// Different options for ATR ...


		var ddWidth = 90;

		if(mtgv.mtpp.crossFreq){ 

			ddWidth = 120;
			
			opsOption =  jsu.arrayAddAll(opsOption,  getAdvOptionCommon(techObj.indi, objDef.shortName) , true);
			

		}

		// var opsOption = getOpsOptions(techObj, objDef);

		return    getDropDown(opsOption, techObj.id+'ops', 'width:'+ddWidth+'px',func, techObj.id, techObj.ops); 


		// return options;

	}


	function getAdvObosOptionTd(techObj, objDef, func){

		var id = techObj.id;
		var html = '';

		if(!mtgv.mtpp.crossFreq){ return html }

		// if( jsu.containsString([ BULL_MACO ,  BEAR_MACO ,  ] , techObj.ops )  ){
		if( jsu.arrayContainsId(COMMON_MACO_OPS , techObj.ops )  ){	
			html += cst.gmtd(techObj, objDef, func);
		}

		if( jsu.arrayContainsId(INDI_PRICE_RATIO , techObj.ops )  ){	
			// html+= INDI_PRICE_RATIO
			// .. TODO
			html+= cst.pir   (techObj, objDef, func);
		}


		return html;
	}


	function getTechTd(techObj, objDef, func){

		var html= '';

		html+= getCrossTickSpec(techObj , objDef, func);


		html+= SP_3 + getOpsOptionsDD(techObj, objDef, func);

		if(isAdvOptions(techObj)){
			html+= getAdvObosOptionTd(techObj, objDef, func);
		}else{
			html+= cst.gso(techObj, objDef, func);  
		}


				// Customizable Check Box ....
		if(mtgv.mtpp.crossFreq){
			html+= cst.acscb(techObj.id);
		}

		return html;
	}


	function advanceOptionChange(techObj){
	
		cst.moc(techObj);  // maco Change


		cst.pirc(techObj);
		// other options 


	}



	function getTechChg(techObj){
		cst.gctc(techObj);


		if(isAdvOptions(techObj)){
			advanceOptionChange(techObj)
		}else{
			cst.tcc(techObj);
		}


	}


	function validateCrossTick(techObj , validResults,valObj ){


		


		var goodData = true;
		var text = '';

		if(!mtgv.mtpp.crossFreq){
			// return {text : text , goodData : goodData };
			return ;
		}

		var id = techObj.id;
		// var FIELDS_TO_VAL = getStdFieldTovali(techObj , null); // standard Ones ...

		if(jsu.containsString([CMF, ATR, ROC, STD_DEV], techObj.indi)){

			var objDef =  jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi );

			var fields = objDef.fields;
			var FIELDS_TO_VAL =  getStdFieldTovali(techObj , fields)
			mcval.vstf(techObj,  id,  null, null, null); // other  params non Man Field

			if(  mcval.avm(techObj, fields , FIELDS_TO_VAL)){
				techObj.custom = null;

				if( jsu.arrayContainsId(COMMON_MACO_OPS , techObj.ops )  ){
					techObj.custom = true;
				}
			}   else{

				techObj.custom = true;
			}


		}else if(!mcval.vtf(  techObj, null, null, null)){

			valObj.goodData = false;
			// return {text : text , goodData : false };
		}


		// var objDef = getObjDef(techObj) ; // jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi );
		var objDef =  jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi );

		text +=' '+objDef.shortName+' Cfg ( ' ;

		if(jsu.containsString([CMF, ATR, ROC, STD_DEV], techObj.subType)){
			text += techObj.p1  ;
		}


		text += ' ) ';

		valObj.text = text+valObj.text;



		// return { goodData : goodData , text : text };

	}




	function valiAdv(techObj, validResults, objDef , fieldName){
		var text = '' ;

		var goodData = true;


		text+= fieldName ;

		var options = getAdvOptionCommon(techObj.indi , '' );//objDef.shortName  

		var opsObj = jsu.getObjFrmArr( options ,  techObj.ops);

		// if( jsu.containsString([ BULL_MACO ,  BEAR_MACO ,  ] , techObj.ops )  ){
		if( jsu.arrayContainsId(COMMON_MACO_OPS , techObj.ops )  ){	
			var v1 = jsu.getNumericValue(techObj.v1 );

			if( !jsu.isInteger(v1) || (v1 < 2 || v1> 20  ) ){
				goodData = false;
			}else{
				text+= ' ' + opsObj.label + ' ' +v1 + ' '+ techObj.maType;
			}

		}else if( jsu.arrayContainsId(INDI_PRICE_RATIO , techObj.ops )  ){	

			var v1 = jsu.getNumericValue(techObj.v1 );
			var v2 = jsu.getNumericValue(techObj.v2 );

			var ops2 = getObjFrmArr( PRICE_RAT_OPS,  techObj.ops2); 

			text+= opsObj.label + ' '

			if( !jsu.isInteger(v1) || (v1 <0  ) ){
				goodData = false;
			}else{
				text+= ' ' + ops2.label + ' ' + v1;
			}
			if(techObj.ops2== CS_BETWEEN){

				if( !jsu.isInteger(v2) || (v2 <0  ) ){
					goodData = false;
				}

				text+= ' and ' +  ' '+v2;
			}


		}else {
			text+= ' ' + opsObj.label ;
		}


		return { goodData : goodData , text : text };

	}



	function valTechInd(techObj, validResults){

		var valObj = null;

		var objDef =  jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi )

		if(isAdvOptions(techObj)){
			valObj = valiAdv(techObj, validResults , objDef, objDef.shortName);
		}else{
			valObj = cst.vnc(techObj, validResults , objDef, objDef.shortName);
		}



		validateCrossTick(techObj, validResults, valObj);

		return valObj;

	} 


	function getStdFieldTovali(techObj, fields){
		var FIELDS_TO_VAL = [];


		if(fields == null){
			var objDef =  jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi );

			fields = objDef.fields;
		}

		// standard Ones ...
		for (key in fields){

			if( key =='ma' || key =='maType' || key =='color'){
				continue;
			}
			FIELDS_TO_VAL.push(key);
		}
		return FIELDS_TO_VAL;
	}


	return {

		gtd: getTechTd,
		goc : getTechChg,
		vti : valTechInd, 

		cth : getCrossTickHtml,
		ctdf : setCrossTickDefVals,

	}

})(); // module 




