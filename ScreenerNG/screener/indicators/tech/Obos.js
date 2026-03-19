

var LIST_STO = [	
	{id: 'k', label: "%K Stochastic"},  // K is sto
	{id: 'd', label: "%D Stochastic"},
	
];


var STO_ADDI_OPS = [

		{id: 'stosKAbvD', label: "Sto %K Abv %D Crossover"},
		{id: 'stosKAbvDWithin', label: "Sto %K Abv %D CO Within"},
		{id: 'stosKBlwD', label: "Sto %K Below %D Crossover"},
		{id: 'stosKBlwDWithin', label: "Sto %K Below %D CO Within"},
	];






var tobos =  (function () {


	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;

	var TECH_INDI_INDEX = cscmn.gttp(20);

/*

	var COMMON_ADV_OPS = [
			{id: BULL_MACO, label:'Bullish MA Crossovers'},
			{id: BEAR_MACO, label:'Bearish MA Crossovers'},
			// {id: BULL_SWING_REJ, label:'Bullish Swing Rejection'},
			// {id: BEAR_SWING_REJ, label:'Bearish Swing Rejection'}

	];

*/

	// var COMMON_ADV_OPS = COMMON_MACO_OPS ;



	var SINGLE_LINE_INDI = [ RSI, RSI_SMOOTH ,  MFI, UO, CCI , AROON , AROON_OSC];



	var UPGRADED_INDI = [ RSI, RSI_SMOOTH , STO_RSI, STO_RSI_SLOW , STO_FAST , STO_SLOW, MFI, UO, CCI, AROON, AROON_OSC, ];


	function getAdvOptionCommon(indi, label){

		// var options = [];

		// for(var i=0; i<COMMON_ADV_OPS.length;i++ ){
		// 	var obj = COMMON_ADV_OPS[i];
		// 	options.push(  { id: obj.id , label : label +' ' + obj.label   });
		// }


		var options = cst.gmo(indi, label);  // MACO Options .....

		if(jsu.containsString([RSI_SMOOTH, RSI] , indi)  ){

			var swingRejOptions  = cst.gsr(indi, label);  // Swing Rejection Options .....

			options = jsu.arrayAddAll(options,  swingRejOptions, true);

		}




		// ADD other options 

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
			
			setCrossTickDefVals(techObj ) ; // set def vals ...

			html+= '<div id ="' +id+'CustSetDiv">';

			html+= getCrossTickHtml(techObj , objDef, func, id);
/*
				if(techObj.indi == RSI  || techObj.indi == RSI_SMOOTH  ){
				

					mcval.sina(techObj , 'p1') // sets def Val
					mcval.sina(techObj , 'priceField') // sets def Val

					html+=  ' RSI Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , id)	;

					html+=  ' On ' + getDropDown(CLOSE_FIELDS_NO_VOL, id+'priceField', 'width:90px',func, id, techObj.priceField) +' ' ;

					html+='<br/>';


					// html+=  ' ' + getDropDown(CLOSE_FIELDS_NO_VOL, id+'priceField', 'width:90px',func, id, techObj.priceField) +' ' ;

				}else  if(techObj.indi == MFI ){	
					mcval.sina(techObj , 'p1') // sets def Val
					html+=  'MFI Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , id)	;
					html+='<br/>';

				}else  if(techObj.indi == CCI ){	
					mcval.sina(techObj , 'p1') // sets def Val
					html+=  'CCI Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , id)	;
					html+='<br/>';

				}else  if(techObj.indi == UO ){	
					mcval.sina(techObj , 'p1') // sets def Val
					mcval.sina(techObj , 'p2') // sets def Val
					mcval.sina(techObj , 'p3') // sets def Val

					html+=  ' Period1 ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , id)	;
					html+=  ' Period2 ' + getInputTxtParam( id+'p2' , 3, techObj.p2, func , id)	;
					html+=  ' Period3 ' + getInputTxtParam( id+'p3' , 3, techObj.p3, func , id)	;

					html+='<br/>';

				}else  if(techObj.indi == STO_FAST || techObj.indi == STO_SLOW ){
					
					mcval.sina(techObj , 'p1') // sets def Val
					mcval.sina(techObj , 'p2') // sets def Val

					html+=  ' Sto Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , id)	;

					html+= ' Smooth Period ' +  getInputTxtParam( id+'p2' , 3, techObj.p2, func , id)	;

					html+='<br/>';


				}else  if(techObj.indi == STO_RSI || techObj.indi == STO_RSI_SLOW ){
					
					mcval.sina(techObj , 'p1') // sets def Val
					mcval.sina(techObj , 'p2') // sets def Val
					mcval.sina(techObj , 'p3') // sets def Val
					mcval.sina(techObj , 'field') // sets def Val


					html+=  ' RSI Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , id)	;	

					html+=   ' On ' + getDropDown(CLOSE_FIELDS_NO_VOL, id+'field', 'width:90px',func, id, techObj.field) +' ' ;										

					html+=  ' Sto Period ' + getInputTxtParam( id+'p2' , 3, techObj.p2, func , id)	;

					html+= ' Smooth Period ' +  getInputTxtParam( id+'p3' , 3, techObj.p3, func , id)	;

					html+='<br/>';

				}else  if(techObj.indi == AROON ){	
					mcval.sina(techObj , 'p1') // sets def Val
					html+=  'Aroon Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , id)	;
					html+='<br/>';	
				}
*/


				html+='<br/>';	


				html+='</div>';
				// if(showPrice){
				// 	html+=  ' ' + getDropDown(CLOSE_FIELDS_NO_VOL, id+'priceField', 'width:90px',func, id, techObj.priceField) +' ' ;
				// }


			return html;
	}

	function getCrossTickHtml(techObj , objDef, func, param){
		
		var html ='';
		var id = techObj.id;  // id and param not same in case of DIY Tech 

		setCrossTickDefVals(techObj );


		// if(true){
			html +=  getDropDown(TECH_INDI_INDEX, techObj.id+'indiIndex', null,func, param, techObj.indiIndex);
			html+= SP_2
		// }

		if(techObj.indi == RSI  || techObj.indi == RSI_SMOOTH  ){

			html+=  ' RSI Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , param)	;

			html+=  ' On ' + getDropDown(CLOSE_FIELDS_NO_VOL, id+'priceField', 'width:90px',func, param, techObj.priceField) +' ' ;

		}else  if(techObj.indi == MFI ){	
			
			html+=  'MFI Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , param)	;
			

		}else  if(techObj.indi == CCI ){	
			
			html+=  'CCI Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , param)	;
			

		}else  if(techObj.indi == UO ){	
			
			html+=  ' Period1 ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , param)	;
			html+=  ' Period2 ' + getInputTxtParam( id+'p2' , 3, techObj.p2, func , param)	;
			html+=  ' Period3 ' + getInputTxtParam( id+'p3' , 3, techObj.p3, func , param)	;

		}else  if(techObj.indi == STO_FAST || techObj.indi == STO_SLOW ){

			html+=  ' Sto Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , param)	;

			html+= ' Smooth Period ' +  getInputTxtParam( id+'p2' , 3, techObj.p2, func , param)	;

		}else  if(techObj.indi == STO_RSI || techObj.indi == STO_RSI_SLOW ){

			html+=  ' RSI Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , param)	;	

			html+=   ' On ' + getDropDown(CLOSE_FIELDS_NO_VOL, id+'field', 'width:90px',func, param, techObj.field) +' ' ;										

			html+=  ' Sto Period ' + getInputTxtParam( id+'p2' , 3, techObj.p2, func , param)	;

			html+= ' Smooth Period ' +  getInputTxtParam( id+'p3' , 3, techObj.p3, func , param)	;

		}else  if(techObj.indi == AROON || techObj.indi == AROON_OSC ){	
			html+=  'Aroon Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , param)	;
		}


		return html;
	}


	function setCrossTickDefVals(techObj ){


		if(techObj.indi == RSI  || techObj.indi == RSI_SMOOTH  ){
		

			mcval.sina(techObj , 'p1') // sets def Val
			mcval.sina(techObj , 'priceField') // sets def Val

		}else  if(techObj.indi == MFI ){	
			mcval.sina(techObj , 'p1') // sets def Val

		}else  if(techObj.indi == CCI ){	
			mcval.sina(techObj , 'p1') // sets def Val

		}else  if(techObj.indi == UO ){	
			mcval.sina(techObj , 'p1') // sets def Val
			mcval.sina(techObj , 'p2') // sets def Val
			mcval.sina(techObj , 'p3') // sets def Val
			

		}else  if(techObj.indi == STO_FAST || techObj.indi == STO_SLOW ){
			
			mcval.sina(techObj , 'p1') // sets def Val
			mcval.sina(techObj , 'p2') // sets def Val

		}else  if(techObj.indi == STO_RSI || techObj.indi == STO_RSI_SLOW ){
			
			mcval.sina(techObj , 'p1') // sets def Val
			mcval.sina(techObj , 'p2') // sets def Val
			mcval.sina(techObj , 'p3') // sets def Val
			mcval.sina(techObj , 'field') // sets def Val

		}else  if(techObj.indi == AROON  || techObj.indi == AROON_OSC ){	
			mcval.sina(techObj , 'p1') // sets def Val
		}

	}



	function getOpsOptionsDD(techObj, objDef, func){


		var opsOption = mtgv.mtpp.TECH_OPS;

		var ddWidth = 90;

		if(mtgv.mtpp.crossFreq){ 

			ddWidth = 120;
			if( jsu.containsString(SINGLE_LINE_INDI,techObj.indi )   ){
				opsOption =  jsu.arrayAddAll(opsOption,  getAdvOptionCommon(techObj.indi, objDef.shortName) , true);
			}


		}

		// var opsOption = getOpsOptions(techObj, objDef);

		return    getDropDown(opsOption, techObj.id+'ops', 'width:'+ddWidth+'px',func, techObj.id, techObj.ops); 


		// return options;

	}


	function addCustomiseOption(techObj){
		

		var html =''
		if(!mtgv.mtpp.crossFreq){ return html }

		if( jsu.containsString(UPGRADED_INDI, techObj.indi  )  ){
			html = cst.acscb(techObj.id);
		}
		return html;

	}


	function getSwingRejTd(techObj, objDef, func){
		var html = '';

		var defLevel = 0;
		if(techObj.ops ===  BULL_SWING_REJ   || techObj.ops === INDI_DOUBLE_BOTTOM){
			defLevel = objDef.fields.os.val;
		}else{
			defLevel = objDef.fields.ob.val;
		}
		
		if(jsu.isNull(techObj.srl)){
			techObj.srl = defLevel;
		}

		html+= '  from  ' + getInputTxtParam( techObj.id+'srl' , 3, techObj.srl, func , techObj.id)	 + ' levels  ';   

		return html;
	}




	function getAdvObosOptionTd(techObj, objDef, func){

		// var id = techObj.id;
		var html = '';

		if(!mtgv.mtpp.crossFreq){ return html }

		// if( jsu.containsString([ BULL_MACO ,  BEAR_MACO ,  ] , techObj.ops )  ){
		if( jsu.arrayContainsId(COMMON_MACO_OPS , techObj.ops )  ){

			html += cst.gmtd(techObj, objDef, func , true);

		}else if( jsu.containsString([ BULL_SWING_REJ ,  BEAR_SWING_REJ , INDI_DOUBLE_BOTTOM ,INDI_DOUBLE_TOP ] , techObj.ops )  ){
			// do nothing

			html += getSwingRejTd(techObj, objDef, func);
		}
		return html;
	}


	// TECH_OPS_ADV

	function getObosTD(techObj, objDef, func){

		var html ='';

/*
		if( mtgv.mtpp.crossFreq){ // getStandardOps

			// Go with existing flow ....
			if(techObj.subType == 'obos' ){	
				html+= getCrossTickSpec(techObj , objDef, func);
			}else if(techObj.subType ==  'sto' ){
				html+= 	getTMultiLineTd(techObj , objDef, func, 'k', LIST_STO, STO_ADDI_OPS, ['stosKAbvD' , 'stosKBlwD' ] , ['stosKAbvDWithin' , 'stosKBlwDWithin' ] )  			
			}else if(techObj.subType ==  'stoRsi' ){
				// USES SAME Fields as Normal STO
				html+= 	getTMultiLineTd(techObj , objDef, func, 'k', LIST_STO, STO_ADDI_OPS, ['stosKAbvD' , 'stosKBlwD' ] , ['stosKAbvDWithin' , 'stosKBlwDWithin' ] )  			
			}
		}

*/		

		html+= getCrossTickSpec(techObj , objDef, func);


		

		if( jsu.containsString(SINGLE_LINE_INDI,techObj.indi )  ){
		
			// var advOpts = getAdvOptionCommon(techObj.indi , techObj.indi  );

			html+= SP_3 + getOpsOptionsDD(techObj, objDef, func);

			if(isAdvOptions(techObj)){
				html+= getAdvObosOptionTd(techObj, objDef, func);

			}else{
				html+= cst.gso(techObj, objDef, func);  // Till proper Implementation is done....
			}


		}else if(techObj.subType ==  'obos' ){
			html+= SP_3 + getOpsOptionsDD(techObj, objDef, func);


			html+= cst.gso(techObj, objDef, func);  // Till proper Implementation is done....

		}else if(techObj.subType ==  'sto' ){
			html+= 	cst.gml(techObj , objDef, func, 'k', LIST_STO, STO_ADDI_OPS, ['stosKAbvD' , 'stosKBlwD' ] , ['stosKAbvDWithin' , 'stosKBlwDWithin' ] )  			
		}else if(techObj.subType ==  'stoRsi' ){
			// USES SAME Fields as Normal STO
			html+= 	cst.gml(techObj , objDef, func, 'k', LIST_STO, STO_ADDI_OPS, ['stosKAbvD' , 'stosKBlwD' ] , ['stosKAbvDWithin' , 'stosKBlwDWithin' ] )  			
		}	


		html+=addCustomiseOption(techObj); // customise Option

		return html;

	}


	function getCrossTickChange(techObj ){


		if(! jsu.containsString(UPGRADED_INDI , techObj.indi) ){ // techObj.indi != RSI  || techObj.indi == RSI_SMOOTH  ){
			return;

		}


		if(mtgv.mtpp.crossFreq){ // Cross Freq.... 

			var id = techObj.id;

			var objDef = getObjDef(techObj) ;//  jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi );

			var OBOS_FIELD = objDef.fields;
			var FIELDS_TO_VAL = getStdFieldTovali(techObj , OBOS_FIELD); // standard Ones ...



			{

				// override ....
				 //var FIELDS_TO_VAL =['',''];  // Different set of field
			}



			if(OBOS_FIELD !=null){

				mcval.vstf(techObj,  id,  null, null, null); // other  params non Man Field

				if(  mcval.avm(techObj, OBOS_FIELD , FIELDS_TO_VAL)){
					techObj.custom = null;


					// if( techObj.ops ==  BULL_MACO  ||  techObj.ops ==  BEAR_MACO) { 
					if( jsu.arrayContainsId(COMMON_MACO_OPS , techObj.ops )  ){
						techObj.custom = true;
					}



				}   else{
					techObj.custom = true;
				}
			}


		}

	}


	function swingRejChg(techObj){

		if( !jsu.containsString([BULL_SWING_REJ ,  BEAR_SWING_REJ  , INDI_DOUBLE_BOTTOM ,INDI_DOUBLE_TOP   ] , techObj.ops )  ){
			return;
		}
		var objDef =  jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi );


		if(jsu.inputNumberRange( techObj.id+'srl', objDef.os.min , objDef.os.max  )){

		}




	}

	function advanceOptionChange(techObj){

		cst.moc(techObj);  // maco Change

		swingRejChg(techObj);

	}



	function getObosChg(techObj){

		getCrossTickChange(techObj);

		if( jsu.containsString(SINGLE_LINE_INDI , techObj.indi) ){   // techObj.indi == RSI  || techObj.indi == RSI_SMOOTH

		// if(jsu.containsString(   ))	
			if(isAdvOptions(techObj)){
				advanceOptionChange(techObj)
			}else{
				cst.tcc(techObj);
			}

		}else if(techObj.subType ==  'obos' ){
			cst.tcc(techObj);
		}else if(techObj.subType ==  'sto' ){
			cst.tmlc(techObj ,jsu.getListToIdArr(STO_ADDI_OPS));
			// html+= 	cst.gml(techObj , objDef, func, 'k', LIST_STO, STO_ADDI_OPS, ['stosKAbvD' , 'stosKBlwD' ] , ['stosKAbvDWithin' , 'stosKBlwDWithin' ] )  			
		}else if(techObj.subType ==  'stoRsi' ){
			cst.tmlc( techObj ,jsu.getListToIdArr(STO_ADDI_OPS)); // STO RSI Option same as STO Option
		}	

	}


	function validateCrossTick(techObj , validResults,valObj ){


		if(jsu.containsString(UPGRADED_INDI   , techObj.indi)  ){


		// if(techObj.indi == RSI  || techObj.indi == RSI_SMOOTH  ){
			// to continue ....

		}else{
			return ; // Till impl of all OBOS is done ... 
		}


		var goodData = true;
		var text = '';

		if(!mtgv.mtpp.crossFreq){
			// return {text : text , goodData : goodData };
			return ;
		}


		var FIELDS_TO_VAL = getStdFieldTovali(techObj , null); // standard Ones ...

		if(!mcval.vtf(  techObj, null, null, FIELDS_TO_VAL)){

			valObj.goodData = false;
			// return {text : text , goodData : false };
		}


		var objDef = getObjDef(techObj) ; // jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi );

		text +=' '+objDef.shortName+' Cfg ( ' ;

		if(techObj.indi == RSI  || techObj.indi == RSI_SMOOTH  ){
			text += techObj.p1  +'  on ' +  techObj.priceField + ' Price' ;
		}else  if(techObj.indi == STO_FAST || techObj.indi == STO_SLOW ){
			text += techObj.p1  +'  , ' +  techObj.p2 ;

		}else  if(techObj.indi == STO_RSI || techObj.indi == STO_RSI_SLOW ){	
			text += techObj.p1   +'  ,  '  + techObj.field  +'  ,  ' +  techObj.p2 +'  ,  ' +  techObj.p3 ;
		}else  if(techObj.indi == UO  ){	
			text += techObj.p1   +'  ,  '   +  techObj.p2 +'  ,  ' +  techObj.p3 ;
		}else if(techObj.indi == MFI  || techObj.indi == CCI || techObj.indi == AROON  || techObj.indi ==AROON_OSC ){
			text += techObj.p1  ;
		}



		text += ' ) ';

		valObj.text = text+valObj.text;



		// return { goodData : goodData , text : text };

	}


	function valiObosAdv(techObj, validResults, objDef , fieldName){
		var text = '' ;

			var goodData = true;


			text+= fieldName ;

			var options = getAdvOptionCommon(techObj.indi , '' );//objDef.shortName  

			var opsObj = jsu.getObjFrmArr( options ,  techObj.ops);

			// if( jsu.containsString([ BULL_MACO ,  BEAR_MACO ,  ] , techObj.ops )  ){
			if( jsu.arrayContainsId(COMMON_MACO_OPS , techObj.ops )  ){	
				var v1 = jsu.getNumericValue(techObj.v1 );

				if( !jsu.isInteger(v1) || (v1 < 2 || v1> 100  ) ){
					goodData = false;
				}else{
					text+= ' ' + opsObj.label + ' ' +v1 + ' '+ techObj.maType;
				}

			}else if( jsu.containsString([ BULL_SWING_REJ ,  BEAR_SWING_REJ  , INDI_DOUBLE_BOTTOM ,INDI_DOUBLE_TOP   ] , techObj.ops )  ){
	
				var srl = jsu.getNumericValue(techObj.srl );

				if(srl > objDef.fields.ob.max || srl < objDef.fields.os.min   ){
					goodData = false;
				}else{
					var opsLabel =  jsu.getObjFrmArr(cst.gsr(techObj.indi, objDef.shortName), techObj.ops ).label

					text = opsLabel +' from ' + srl + ' level ';
				}

			}else {
				text+= ' ' + opsObj.label ;
			}


			return { goodData : goodData , text : text };

	}



	function validateObos(techObj, validResults){

		var valObj = null;

		var objDef =  getObjDef(techObj) ;// jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi );


		if( jsu.containsString(SINGLE_LINE_INDI , techObj.indi) ){   // techObj.indi == RSI  || techObj.indi == RSI_SMOOTH

			if(isAdvOptions(techObj)){
				valObj = valiObosAdv(techObj, validResults , objDef, objDef.shortName);
			}else{
				valObj = cst.vnc(techObj, validResults , objDef, objDef.shortName);
			}


			

		}else if(techObj.subType ==  'obos' ){



			valObj = cst.vnc(techObj, validResults , objDef, objDef.shortName);

		}else if(techObj.subType == 'sto'  || techObj.subType == 'stoRsi'   ){

			// objDef= jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi );

			if(techObj.fieldType == 'k'){
				objDef.label = objDef.shortName + "%K" ;	
				techObj.shortName = objDef.shortName + "%K" ;
			} else if(techObj.fieldType == 'd'){
				techObj.shortName = objDef.shortName + "%D" ;
				objDef.label =objDef.shortName + "%D" ;	
			} 	else{
				techObj.fieldType  = 'k'; 
			}
			valObj = cst.vml( techObj, validResults , objDef , 'k',  LIST_STO, STO_ADDI_OPS, ['stosKAbvD' , 'stosKBlwD' ] , ['stosKAbvDWithin' , 'stosKBlwDWithin' ]);
		}	

		// return { goodData : goodData , text : text };

		validateCrossTick(techObj, validResults, valObj);

		return valObj;
	}




	// generic .....

	function getStdFieldTovali(techObj, fields){
		var FIELDS_TO_VAL = [];


		if(fields == null){
			var objDef =  jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi );

			fields = objDef.fields;
		}

		// standard Ones ...
		for (key in fields){

			if(key == 'ob' || key =='os' || key =='cl' || key =='ma' || key =='maType' || key =='color'){
				continue;
			}
			FIELDS_TO_VAL.push(key);
		}
		return FIELDS_TO_VAL;
	}


	function getStdFieldToValiArr(techObj, fields){
		var fieldsToVali = {};

		if(fields == null){
			var objDef =  jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi );
			fields = objDef.fields;
		}



		// standard Ones ...
		for (key in fields){

			if(key == 'ob' || key =='os' || key =='cl'  || key =='ma' || key =='maType' || key =='color'){
				continue;
			}



			fieldsToVali[key]  = fields[key];
		}
		return fieldsToVali;
	}


	function getObjDef(techObj){

		var indi = techObj.indi;
		
		if(techObj.indi == AROON && techObj.subType =='obos'){
			indi = AROON_OSC;
		}

		var objDef =  jsu.getObjFrmArr( ALL_INDIS_MAP, indi );

		return objDef;
	}



	return {

		got: getObosTD,
		goc : getObosChg,
		vobos : validateObos,
		sfv : getStdFieldToValiArr,

		cth : getCrossTickHtml,
		ctdf : setCrossTickDefVals,
		ctc : getCrossTickChange

	}

})(); // module 