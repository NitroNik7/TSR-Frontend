// IchimokuNg


var imccs =  (function () {


	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;



	var OPS_OPTION = AB_CO_OPS_BASIC.slice();

	OPS_OPTION.push({id: WITHIN, label:'Within'});

	OPS_OPTION.push({id: CS_CO_ABV_WITHIN, label:'Range Cross Above'});

	OPS_OPTION.push({id: CS_CO_BLW_WITHIN, label:'Range Cross Below'});


	var priceCloudOpsOptions  =OPS_OPTION.slice();

	var CO_OPS_OPTIONS = OPS_OPTION.slice();
	
	var PRICE_CLOUD = 'PriceCloud';
	var PRICE_LINES = 'PriceLines';
	var LINES_CO = 'LineCO';
	var TRENDING_LINES = 'TrendingLines';

	var ichiLines = [
		{ id : 'icLeadingSpanA'   	, 	label : 'Leading Span A' },
		{ id : 'icLeadingSpanB'   	, 	label : 'Leading Span B' },
		{ id : 'icConvLine'   	, 	label : 'Conversion Line' },
		{ id : 'icBaseLine'   	, 	label : 'Base Line' },
		// { id : 'icLaggingSpan'   	, 	label : 'Lagging Line' },
	];


	var baseLinesCO =  [
		{ id : 'icConvLine'   	, 	label : 'Conversion Line' },
		{ id : 'icBaseLine'   	, 	label : 'Base Line' },
		// { id : 'icLaggingSpan'   	, 	label : 'Lagging Line' },
	];


	var cloudOptions = [
		{ id : 'ichimokuCloud'   	, 	label : 'Ichimoku Cloud (Any) ' },
		{ id : 'icRed'   	, 	label : 'Red Cloud' },
		{ id : 'icGreen'   	, 	label : 'Green Cloud' },
	];


	var CORE_OPS = [
		{ id : PRICE_CLOUD , 	label : 'Price & Cloud ' , 	baseFields : CLOSE_FIELDS_NO_VOL , 	opsFields : priceCloudOpsOptions , compareFields : cloudOptions  },
		{ id : PRICE_LINES ,   label :  'Price & Lines ' , 	baseFields : CLOSE_FIELDS_NO_VOL ,  opsFields : priceCloudOpsOptions , compareFields : ichiLines },
		{ id : LINES_CO   	, 	label : 'Lines CrossOver ',	baseFields : baseLinesCO, 			opsFields:  CO_OPS_OPTIONS 		 , compareFields : ichiLines },
		{ id : TRENDING_LINES, 	label : 'Trending ',		baseFields : ichiLines, 			opsFields:  TRENDING_OPS 		 , compareFields : [] },
	];


	function createIchiObj(id){


		// let id =  myTsrScreener.getNextId( 'techNgCompId');
		var defOption = CORE_OPS[0];

		var tecObj = { id :id, type : 'techIndi' ,  subType:ICHIMOKU, indi: ICHIMOKU,
			// ICHI SPECIFIC
			f1 : defOption.id , 
			ops : defOption.opsFields[0].id ,
			f2 : defOption.baseFields[0].id ,
			f3 : defOption.compareFields[0].id ,
		};

		return tecObj;
	}

	function setIchDropDown(techObj){

		var f1 = $('#'+techObj.id+'f1').val();

		// if(jsu.isNull(f1)){
		// 	// yet to be set
		// 	return;
		// }

		if(f1 ==  techObj.f1 ){
			csu.setProp(mtgv.cs.screenerData.techNgComp, ['ops', 'v1', 'techTick',
				'p1'  ,'p2','p3', 'p4',  'showCustSet', 'f1', 'f2', 'f3'],techObj.id);
		}else{

			var ichiDef = jsu.getObjFrmArr(CORE_OPS, f1);

			techObj.f1 = f1;
			techObj.f2 = ichiDef.baseFields[0].id;
			techObj.ops = ichiDef.opsFields[0].id;

			if(ichiDef.compareFields.length >0){
				techObj.f3 = ichiDef.compareFields[0].id;
			}
			techObj.v1 = null;

		}
	}


	function getCrossTickSpec(techObj , objDef, func){
		var html = '';

		if(!mtgv.mtpp.crossFreq){ // Cross Freq.... 
			return html;
		}
		var id = techObj.id;

		html+= '<div id ="' +id+'CustSetDiv">';


		mcval.sina(techObj , 'p1') // sets def Val
		mcval.sina(techObj , 'p2') // sets def Val
		mcval.sina(techObj , 'p3') // sets def Val
		mcval.sina(techObj , 'p4') // sets def Val
		// mcval.sina(techObj , 'p1') // sets def Val


		html+=  ' Conversion Line ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , id)	;
		html+=  ' Base Line ' + getInputTxtParam( id+'p2' , 3, techObj.p2, func , id)	;
		html+=  ' Leading Span ' + getInputTxtParam( id+'p3' , 3, techObj.p3, func , id)	;
		html+=  ' Lagging Span ' + getInputTxtParam( id+'p4' , 3, techObj.p4, func , id)	;



		html+='</div>';

		return html;


	}


	function createTd(techObj, objDef, func){

		// function getStandardOps(techObj, objDef, func){  //ABB /CO / Trend ....
		var id = techObj.id;
		var html = '';



		var ichiDef = jsu.getObjFrmArr(CORE_OPS, techObj.f1);


		html+=   SP_3 + getDropDown(CORE_OPS, id+'f1', '',func, id, techObj.f1);

		html+=   SP_3 + getDropDown(ichiDef.baseFields, id+'f2', '',func, id, techObj.f2);


		html+=   SP_3 + getDropDown(ichiDef.opsFields, id+'ops', '',func, id, techObj.ops);

		if(ichiDef.compareFields.length >0){
			html+=   SP_3 + getDropDown(ichiDef.compareFields, id+'f3', '',func, id, techObj.f3);
		}



		if( jsu.containsString([CS_ABOVE , CS_BELOW  ] , techObj.ops )  ){

			html+= SP_3  + ' for min ' + getInputTxtParam( id+'v1' , 2, techObj.v1, func , id)	 

				+ htmlU.getSpan('(<b>Optional</b> 0 for latest, Range 0-9)' , 'grey', 8) + " Ticks" ;			

		}else if( jsu.containsString([CS_CO_ABV , CS_CO_BLW ] , techObj.ops)){

			// if(jsu.isNull())
			// html+= SP_3 + getInputTxtParam( id+'v1' , 3, techObj.v1, func , id)	 +", ";

			// html+= SP_3 +htmlU.getSpan('Ticks Back' , 'grey', 10) + htmlU.getSpan('(<b>Optional</b> Empty =   latest or 0, Range 0-5) ' , 'grey', 8) 

		}else if( jsu.containsString([CS_CO_ABV_WITHIN , CS_CO_BLW_WITHIN ] , techObj.ops)){


			html+= SP_3 + htmlU.getSpan('Within last '  ,'grey'  ,10) + getInputTxtParam( id+'v1' , 3, techObj.v1, func , id)	;

			html+= ' Ticks' + htmlU.getSpan('(0 for latest, Range 0-5) ' , 'grey', 8) 

		}else if( jsu.containsString([WITHIN ] , techObj.ops)){

			if(jsu.containsString([PRICE_LINES , LINES_CO] , techObj.f1 )){

				html+= SP_3 +  getInputTxtParam( id+'v1' , 3, techObj.v1, func , id)	 +" %";

			}else if( techObj.f1 ==  PRICE_CLOUD ){
				html+= SP_3  + ' for min ' + getInputTxtParam( id+'v1' , 2, techObj.v1, func , id)	 

				+ htmlU.getSpan('(<b>Optional</b> 0 for latest, Range 0-9)' , 'grey', 8) + " Ticks" ;	
			}
			
		}else if( jsu.containsString([TRENDING_UP , TRENDING_DOWN ] , techObj.ops)){ // trending ...
			
			html+= SP_3 +  ' for '  + getInputTxtParam( id+'v1' , 3, techObj.v1, func , id) +' Ticks ' +htmlU.getSpan('(Range 2-10) ' , 'grey', 8) 	;

		}

		return html;
	}

	function getIndiTD(techObj, objDef, func){


		var html ='';

		html+= getCrossTickSpec(techObj , objDef, func);


		html+= createTd(techObj, objDef, func);


		// Customizable Check Box ....
		if(mtgv.mtpp.crossFreq){
			html+= cst.acscb(techObj.id);
		}

		

		return html;


	}


	function ichiChg(techObj){

		var id = techObj.id;

		var objDef =  jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi );


		if( jsu.containsString([CS_ABOVE , CS_BELOW   ] , techObj.ops )  ){

			var v1 = htmlU.getInputVal(id+'v1');

			if(jsu.isNotNull(v1)){
				if( !isIntegerInput(id+'v1') || !inputNumberRange (id+'v1', 0,10)  ){
					
				}
			}
			
		}else if( jsu.containsString([CS_CO_ABV , CS_CO_BLW , CS_CO_ABV_WITHIN , CS_CO_BLW_WITHIN ] , techObj.ops)){
			
			var v1 = htmlU.getInputVal(id+'v1');
			if(jsu.isNotNull(v1)){
				if( !isIntegerInput(id+'v1') || !inputNumberRange (id+'v1', 0,5)  ){
				}
			}
		}else if( jsu.containsString([WITHIN  ] , techObj.ops)){

			if(jsu.containsString([PRICE_LINES , LINES_CO] , techObj.f1 )){
				if(!jsu.isPositiveNumInput(id+'v1' ) ){

				} 
			}else if( techObj.f1 ==  PRICE_CLOUD ){
				var v1 = htmlU.getInputVal(id+'v1');
				if( jsu.isNotNull( v1) ){
					jsu.isPositiveNumInput(id+'v1' );
				}
			}


		}else if( jsu.containsString([TRENDING_UP , TRENDING_DOWN ] , techObj.ops)){ // trending ...
			if( !isIntegerInput(id+'v1') || !inputNumberRange (id+'v1', 2,10)  ){
			
			}
			
		}
	}

	function ichiChange(techObj){

		// getCrossTickChange(techObj);
		cst.gctc(techObj);

		ichiChg(techObj);
	}



	function validateCrossTick(techObj , validResults,valObj ){

		if(!mtgv.mtpp.crossFreq){			return ; 		}

		if(!mcval.vtf(  techObj, null, null, null)){

			valObj.goodData = false;
			return;
		}

		var objDef =  jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi );

		var text =''
		text += ' '+objDef.shortName+' Cfg ( ' ;

		text += techObj.p1  +' , ' +  techObj.p2  +' , ' +  techObj.p3  +' , ' + techObj.p4  ;
	
		text += ' ) ';

		valObj.text = text+valObj.text;

	}


	function validateIchimoku(techObj, validResults){

		var valObj = null;

		var objDef =  jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi );

		var ichiDef = jsu.getObjFrmArr(CORE_OPS, techObj.f1);

		var text = '';
		var v1 =  jsu.getNumericValue(techObj.v1 );


		if(v1!=null && !jsu.isNumber(v1) ){
			return { goodData : false , text : text };
		}

		var goodData = true;

		

		var baseField = null;

		var baseField = jsu.getObjFrmArr(ichiDef.baseFields, techObj.f2);

		text += baseField.label ;

		if(jsu.containsString([PRICE_LINES, PRICE_CLOUD] , ichiDef.id ) ){ 
			 text += ' Price';
		}

		var opsDef = jsu.getObjFrmArr(ichiDef.opsFields, techObj.ops);

		text += ' ' + opsDef.label;

		if(ichiDef.compareFields.length >0){
			var compDef = jsu.getObjFrmArr(ichiDef.compareFields, techObj.f3);
			text+= ' ' + compDef.label;
		}


		if(v1!= null){

			if( jsu.containsString([CS_ABOVE , CS_BELOW  ] , techObj.ops )  ){

				if( !jsu.isInteger(v1) || (v1 < 0 || v1> 10  ) ){
					goodData =false;
				}else{
					text += ' for minimum ' + v1 + " Ticks";
				}			

			}else if( jsu.containsString([CS_CO_ABV , CS_CO_BLW ] , techObj.ops)){

				if( !jsu.isInteger(v1) || (v1 < 0 || v1> 5  ) ){
					goodData =false;
				}else{
					text += ' ' + v1 + " Ticks Back";
				}	

			}else if( jsu.containsString([CS_CO_ABV_WITHIN , CS_CO_BLW_WITHIN ] , techObj.ops)){

				if( !jsu.isInteger(v1) || (v1 < 0 || v1> 5  ) ){
					goodData =false;
				}else{
					text += ' within last  ' + (v1 +1) + " Ticks";
				}	

			}else if( jsu.containsString([WITHIN  ] , techObj.ops)){

				if(jsu.containsString([PRICE_LINES , LINES_CO] , ichiDef.f1 )){

					if(!jsu.isNumber(v1) ||  v1== null ||  v1 < objDef.min || v1> objDef.max   ) {
						goodData =false;
					}else{
						text+= ' '  +v1 + ' %' ;
					}
				}else if( ichiDef.f1 ==  PRICE_CLOUD ){
					
					if(!jsu.isNumber(v1) ){
						goodData =false;
					}else{
						text += ' within last  ' + (v1 +1) + " Ticks";
					}
				}
				
			}else if( jsu.containsString([TRENDING_UP , TRENDING_DOWN ] , techObj.ops)){ // trending ...
				
				if(v1== null || !jsu.isInteger(v1) || v1 < 2 || v1> 10   ){
						goodData =false;
				}else{
					text+= ' for last '  +v1 + ' Ticks ';
				}

			}

		}else if( jsu.containsString([TRENDING_UP , TRENDING_DOWN ] , techObj.ops)){ 
			goodData =false;
		}


		valObj = {goodData : goodData , text : text };

		validateCrossTick(techObj, validResults, valObj);

		return valObj;

	}




	return {

		cio : createIchiObj,
		git : getIndiTD,
		ic : ichiChange,
		// aim : addIchiMoku,
		// gih: getIchiCoHtml,
		
		vic : validateIchimoku,

		sidd : setIchDropDown

		// vt : validateTindis

	}

})(); // module 