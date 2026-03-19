
var LIST_MACD = [
	{id: 'macd', label: "MACD (Mov Avg Conv Div)"},
	{id: 'macdSignal', label: "MACD - Signal Line"},
	{id: 'macdHist', label: "MACD - Histogram"}, 
];


var MACD_ADDI_OPS = [{id: 'macBul', label:'Macd Bullish Crossovers'},
			{id: 'macBulWithin', label:'Macd Bull CO Within'},
			{id: 'macBear', label:'Macd Bearish Crossover'},
			{id: 'macBearWithin', label:'Macd Bear CO Within'}
];


var LIST_ADX = [
	{id: ADX, label: "ADX (Average Directional Index)"},
	{id: 'adxPdi', label: "ADX PDI - (ADX +DI)"},
	{id: 'adxMdi', label: "ADX MDI - (ADX -DI)"},
];

var ADX_ADDI_OPS = [  //// Naming convention of ADX CO rong
	{id: 'adxP2M', label: "ADX PDI Abv MDI"},
	{id: 'adxP2MWithin', label: "ADX PDI Abv MDI Within"},
	{id: 'adxM2P', label: "ADX MDI Abv PDI"},
	{id: 'adxM2PWithin', label: "ADX MDI Abv PDI Within"},
];


var LIST_AROON = [
	{id: 'aroonUp', label: "Aroon Up"},
	{id: 'aroonDown', label: "Aroon Down"},
];

var AROON_ADDI_OPS = [
	{id: 'aroonUpCO', label: "Aroon Up Abv Down"},
	{id: 'aroonUpCOWithin', label: "Aroon Up Abv Down Within"},
	{id: 'aroonDownCO', label: "Aroon Down Abv Up"},
	{id: 'aroonDownCOWithin', label: "Aroon Down Abv Up Within"},
];


var LIST_RVI = [
	{id: RVI, label: "RVI (Rel Vigor Idx)"},
	{id: 'rviSignal', label: "RVI - Signal Line"},
	
];

var RVI_ADDI_OPS = [{id: 'rviBul', label:'RVI Bullish Crossovers'},
			{id: 'rviBulWithin', label:'RVI Bull CO Within'},
			{id: 'rviBear', label:'RVI Bearish Crossover'},
			{id: 'rviBearWithin', label:'RVI Bear CO Within'}
];




var tindis =  (function () {


	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;

	var TECH_INDI_INDEX = cscmn.gttp(20);


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

		if(techObj.indi == MACD ){

			mcval.sina(techObj , 'p1') // sets def Val
			mcval.sina(techObj , 'p2') // sets def Val
			mcval.sina(techObj , 'p3') // sets def Val
			mcval.sina(techObj , 'maType') // sets def Val
			mcval.sina(techObj , 'priceField') // sets def Val

			html+=  ' MACD Fast ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , id)	;
			html+=  ' Slow ' + getInputTxtParam( id+'p2' , 3, techObj.p2, func , id)	;
			html+=  ' Signal ' + getInputTxtParam( id+'p3' , 3, techObj.p3, func , id)	;


			html+= ' MA ' + getDropDown([{id : 'ema' , label : 'EMA'}], id+'maType', 'width:90px',func, id, techObj.maType);			

			// html+= ' MA ' + getDropDown(mtgv.mtpp.MA_TYPE, id+'maType', 'width:90px',func, id, techObj.maType);

			html+=  ' On ' + getDropDown(CLOSE_FIELDS_NO_VOL, id+'priceField', 'width:90px',func, id, techObj.priceField) +' ' ;

		}else if(techObj.indi == ADX ){

			mcval.sina(techObj , 'p1') // sets def Val
			mcval.sina(techObj , 'p2') // sets def Val

			html+=  ' ADX Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , id)	;
			html+=  ' DI Length  ' + getInputTxtParam( id+'p2' , 3, techObj.p2, func , id)	;
		}else if(techObj.indi == AROON ){

			mcval.sina(techObj , 'p1') // sets def Val
			// mcval.sina(techObj , 'p2') // sets def Val

			html+=  ' Aroon Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , id)	;
			// html+=  ' Smoothening ' + getInputTxtParam( id+'p2' , 3, techObj.p2, func , id)	;

		}else if(techObj.indi == RVI ){

			mcval.sina(techObj , 'p1') // sets def Val
			// mcval.sina(techObj , 'p2') // sets def Val

			html+=  ' RVI Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , id)	;
			// html+=  ' Smoothening ' + getInputTxtParam( id+'p2' , 3, techObj.p2, func , id)	;

		}else if(techObj.indi == AWESOME_OSC ){

			mcval.sina(techObj , 'p1') // sets def Val
			mcval.sina(techObj , 'p2') // sets def Val
			mcval.sina(techObj , 'maType') // sets def Val
			mcval.sina(techObj , 'field') // sets def Val


			html+=  ' MA1 ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , id)	;
			html+=  ' MA2 ' + getInputTxtParam( id+'p2' , 3, techObj.p2, func , id)	;

			html+= ' MA ' + getDropDown(mtgv.mtpp.MA_TYPE, id+'maType', 'width:90px',func, id, techObj.maType);

			html+=  ' On ' + getDropDown(CLOSE_FIELDS_NO_VOL, id+'field', 'width:90px',func, id, techObj.field) +' ' ;


		}
*/


		html+='</div>';

		return html;

	}


	function getCrossTickHtml(techObj , objDef, func, param){
		
		var html ='';
		var id = techObj.id;  // id and param not same in case of DIY Tech 

		setCrossTickDefVals(techObj );
		
		html +=  getDropDown(TECH_INDI_INDEX, techObj.id+'indiIndex', null,func, param, techObj.indiIndex);
		html+= SP_2

		if(techObj.indi == MACD ){


			html+=  ' MACD Fast ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , param)	;
			html+=  ' Slow ' + getInputTxtParam( id+'p2' , 3, techObj.p2, func , param)	;
			html+=  ' Signal ' + getInputTxtParam( id+'p3' , 3, techObj.p3, func , param)	;

			var emaOption = objDef.fields.emaOpt;

			html+= ' MA ' + getDropDown( emaOption, id+'maType', 'width:90px',func, param, techObj.maType);			

			// html+= ' MA ' + getDropDown(mtgv.mtpp.MA_TYPE, id+'maType', 'width:90px',func, param, techObj.maType);

			html+=  ' On ' + getDropDown(CLOSE_FIELDS_NO_VOL, id+'priceField', 'width:90px',func, param, techObj.priceField) +' ' ;

		}else if(techObj.indi == ADX ){

			html+=  ' ADX Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , param)	;
			html+=  ' DI Length  ' + getInputTxtParam( id+'p2' , 3, techObj.p2, func , param)	;
		}else if(techObj.indi == AROON ){

			html+=  ' Aroon Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , param)	;
			// html+=  ' Smoothening ' + getInputTxtParam( id+'p2' , 3, techObj.p2, func , param)	;

		}else if(techObj.indi == RVI ){


			html+=  ' RVI Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , param)	;
			// html+=  ' Smoothening ' + getInputTxtParam( id+'p2' , 3, techObj.p2, func , param)	;

		}else if(techObj.indi == AWESOME_OSC ){

			html+=  ' MA1 ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , param)	;
			html+=  ' MA2 ' + getInputTxtParam( id+'p2' , 3, techObj.p2, func , param)	;

			html+= ' MA ' + getDropDown(mtgv.mtpp.MA_TYPE, id+'maType', 'width:90px',func, param, techObj.maType);
			html+=  ' On ' + getDropDown(CLOSE_FIELDS_NO_VOL, id+'field', 'width:90px',func, param, techObj.field) +' ' ;
		}


		return html;
	}

	function setCrossTickDefVals(techObj ){
		if(techObj.indi == MACD ){

			mcval.sina(techObj , 'p1') // sets def Val
			mcval.sina(techObj , 'p2') // sets def Val
			mcval.sina(techObj , 'p3') // sets def Val
			mcval.sina(techObj , 'maType') // sets def Val
			mcval.sina(techObj , 'priceField') // sets def Val


		}else if(techObj.indi == ADX ){

			mcval.sina(techObj , 'p1') // sets def Val
			mcval.sina(techObj , 'p2') // sets def Val
		}else if(techObj.indi == AROON ){

			mcval.sina(techObj , 'p1') // sets def Val
			// mcval.sina(techObj , 'p2') // sets def Val

		}else if(techObj.indi == RVI ){

			mcval.sina(techObj , 'p1') // sets def Val
			// mcval.sina(techObj , 'p2') // sets def Val

		}else if(techObj.indi == AWESOME_OSC ){

			mcval.sina(techObj , 'p1') // sets def Val
			mcval.sina(techObj , 'p2') // sets def Val
			mcval.sina(techObj , 'maType') // sets def Val
			mcval.sina(techObj , 'field') // sets def Val

		}

	}



	function getIndiTD(techObj, objDef, func){

		var html ='';

		html+= getCrossTickSpec(techObj , objDef, func);


		if( jsu.containsString( [AWESOME_OSC] ,   techObj.subType )) {

			html+= getDropDown(mtgv.mtpp.TECH_OPS, techObj.id+'ops', 'width:90px',func, techObj.id, techObj.ops); 

			html+= cst.gso(techObj, objDef, func);
		}else 

		if(techObj.indi == MACD ){
			html+= 	cst.gml(techObj , objDef, func, 'macd', LIST_MACD, MACD_ADDI_OPS, ['macBul' , 'macBear' ] , ['macBulWithin' , 'macBearWithin' ] )  			
		}else if(techObj.subType ==  ADX ){
			html+= 	cst.gml(techObj , objDef, func, ADX, LIST_ADX, ADX_ADDI_OPS, ['adxP2M' , 'adxM2P' ] , ['adxP2MWithin' , 'adxM2PWithin' ] )  			
		}else if(techObj.indi == AROON ){
			html+= 	cst.gml(techObj , objDef, func, 'aroonUp', LIST_AROON, AROON_ADDI_OPS, ['aroonUpCO' , 'aroonDownCO' ] , ['aroonUpCOWithin' , 'aroonDownCOWithin' ] )  			
		}else if(techObj.indi == RVI ){
			html+= 	cst.gml(techObj , objDef, func, RVI, LIST_RVI, RVI_ADDI_OPS, ['rviBul' , 'rviBear' ] , ['rviBulWithin' , 'rviBearWithin' ] ) ;
		} 





		// Customizable Check Box ....
		if(mtgv.mtpp.crossFreq){
			html+= cst.acscb(techObj.id);
		}

		

		return html;


	}


	


	function getIndiChg(techObj){
		// getCrossTickChange(techObj);
		cst.gctc(techObj);



		if(jsu.containsString( [AWESOME_OSC] , techObj.indi )   ){

			cst.tcc(techObj);
			// techNgChgCmn(techObj);

		}else if(techObj.indi == MACD ){
			cst.tmlc(techObj , jsu.getListToIdArr(MACD_ADDI_OPS));

		}else if (techObj.subType ==  ADX){	
			cst.tmlc(techObj ,jsu.getListToIdArr(ADX_ADDI_OPS));
		
		}else if (techObj.subType ==  AROON){	
			cst.tmlc(techObj ,jsu.getListToIdArr(AROON_ADDI_OPS));

		}else if (techObj.subType ==  RVI){	
			cst.tmlc(techObj , jsu.getListToIdArr(RVI_ADDI_OPS)); 
		}




		
	}


	function validateCrossTick(techObj , validResults,valObj ){

		if(!mtgv.mtpp.crossFreq){			return ; 		}





		if(!mcval.vtf(  techObj, null, null, null)){

			valObj.goodData = false;
			// return {text : text , goodData : false };
		}

		// var goodData = true;
		var text = '';



		var objDef =  jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi );

		text +=' '+objDef.shortName+' Cfg ( ' ;

		if(techObj.indi == MACD ){

			text += techObj.p1  +' , ' +  techObj.p2  +' , ' +  techObj.p3  +' , ' + techObj.maType  +' on ' +  techObj.priceField + ' Price' ;
		}else if(techObj.indi == ADX ){
			text += techObj.p1  +' , ' +  techObj.p2 ;
		}else if(techObj.indi == AROON ){
			text += techObj.p1   ;
		}else if(techObj.indi == RVI ){
			text += techObj.p1   ;
		}else if(techObj.indi == AWESOME_OSC ){
			text += techObj.p1  +' , ' +  techObj.p2   +' , ' + techObj.maType  +' on ' +  techObj.field + ' Price' ;
		}


		text += ' ) ';

		valObj.text = text+valObj.text;

	}


	function validateTindis(techObj, validResults){

		var valObj = null;

		var objDef =  jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi )


		if(jsu.containsString([AWESOME_OSC], techObj.indi  )){
			valObj = cst.vnc(techObj, validResults , objDef, objDef.shortName);	


		}else if(techObj.indi == MACD ){

			// objDef= jsu.getObjFrmArr( ALL_INDIS_MAP, MACD );
			if(techObj.fieldType == 'macdSignal'){
				objDef.label ="MACD - Signal Line";	
				techObj.shortName = 'MACD - Signal Line'
			} else if(techObj.fieldType == 'macdHist'){
				techObj.shortName = 'MACD - Histogram'
				objDef.label ="MACD - Histogram";	
			} 	else{
				techObj.fieldType  = 'macd'; 
			}

			valObj = cst.vml(techObj, validResults , objDef , 'macd', LIST_MACD, MACD_ADDI_OPS, ['macBul' , 'macBear' ] , ['macBulWithin' , 'macBearWithin' ]);
		}else if(techObj.subType == ADX  ){
			// objDef= jsu.getObjFrmArr( ALL_INDIS_MAP, ADX );

			if(techObj.fieldType == 'adxPdi'){
				objDef.label ="ADX PDI";	
				techObj.shortName = 'ADX PDI'
			} else if(techObj.fieldType == 'adxMdi'){
				techObj.shortName = 'ADX MDI'
				objDef.label ="ADX MDI";	
			}else{
				techObj.fieldType  = ADX;
			} 
			valObj = cst.vml(techObj, validResults , objDef , ADX,  LIST_ADX, ADX_ADDI_OPS, ['adxP2M' , 'adxM2P' ] , ['adxP2MWithin' , 'adxM2PWithin' ]);
		
		}else if(techObj.indi == AROON  ){	
			// objDef= jsu.getObjFrmArr( ALL_INDIS_MAP, AROON );

			if(techObj.fieldType == 'aroonUp'){
				objDef.label ="Aroon Up";	
				techObj.shortName = 'Aroon Up'
			} else if(techObj.fieldType == 'aroonDown'){
				techObj.shortName = 'Aroon Down'
				objDef.label ="Aroon Down";	
			}else{
				techObj.fieldType  = 'aroonUp';
			} 


			valObj = cst.vml(techObj, validResults , objDef , 'aroonUp',  LIST_AROON, AROON_ADDI_OPS, ['aroonUpCO' , 'aroonDownCO' ] , ['aroonUpCOWithin' , 'aroonDownCOWithin' ]);


		}else if(techObj.indi == RVI  ){		
			// objDef= jsu.getObjFrmArr( ALL_INDIS_MAP, RVI );
			if(techObj.fieldType == 'rviSignal'){
				objDef.label ="RVI - Signal Line";	
				techObj.shortName = 'RVI - Signal Line'
			}else{
				techObj.fieldType  = RVI; 
			}

			valObj = cst.vml(techObj, validResults , objDef , RVI, LIST_RVI, RVI_ADDI_OPS, ['rviBul' , 'rviBear' ] , ['rviBulWithin' , 'rviBearWithin' ]);
		}






		validateCrossTick(techObj, validResults, valObj);

		return valObj;

	}


	return {

		git: getIndiTD,
		gic : getIndiChg,
		vt : validateTindis,

		cth : getCrossTickHtml,
		ctdf : setCrossTickDefVals
		// ctc : getCrossTickChange

	}

})(); // module 