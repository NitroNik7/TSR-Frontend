
var LIST_BB = [
	// {id: 'price', label: "Price"},  // K is sto
	{id: 'bollingerUB', label: "Bollinger Upper"},  // K is sto
	{id: 'bollingerMB', label: "Bollinger Middle"},
	{id: 'bollingerLB', label: "Bollinger Lower"},
];

var LIST_KELTNER = [
	// {id: 'price', label: "Price"},  // K is sto
	{id: 'keltnerUB', label: "Keltner Upper"},  // K is sto
	{id: 'keltnerMB', label: "Keltner Middle"},
	{id: 'keltnerLB', label: "Keltner Lower"},
];





var LIST_BAND_SQUEEZE = [
	// {id: 'price', label: "Price"},  // K is sto
	// {id: 'bandAnySqueeze', label: "Any Type"},  
	// {id: 'bandAnyBO', label: "Breakout Any Type"},  
	// {id: 'bandAnyBD', label: "Breakdown Any Type"},  

	{id: 'bandSqLowBWRange', label: "Low BW Range"},  
	{id: 'bandSqLowBWBORange', label: "Low BW Range Breakout"}, 
	{id: 'bandSqLowBWBDRange', label: "Low BW Range Breakdown"},

	{id: 'bandSqLowBW', label: "Lowest Bandwidth"},  
	{id: 'bandSqLowBWBO', label: "Low BW Breakout"},  
	{id: 'bandSqLowBWBD', label: "Low BW Breakdown"}, 

	

	{id: 'bWWithin', label: "Bandwidth within %"},  
	{id: 'bWWithinBO', label: "BW within % Breakout"}, 
	{id: 'bWWithinBD', label: "BW within % Breakdown"},


];

var LIST_BB_SQUEEZE = LIST_BAND_SQUEEZE.slice();

LIST_BB_SQUEEZE.push({id: 'bbSqKeltner', label: "Within Ketlner/Atr "} );
LIST_BB_SQUEEZE.push({id: 'bbSqKeltnerBO', label: "Ketlner/Atr Breakout"} );
LIST_BB_SQUEEZE.push({id: 'bbSqKeltnerBD', label: "Ketlner/Atr Breakdown"} );



var LIST_PSAR = [
	{id: PSAR, label: "PSAR (Parabolic SAR)"},  // K is sto
];

var LIST_SUPER_TREND = [
	{id: SUPER_TREND, label: "Supertrend"},  // K is sto
];



var OHLC_HA = [
	{id: 'ohlc', label: "OHLC (default) "}, 
	{id: 'haOhlc', label: "Heikin Ashi Based "}, 
];




var tband =  (function () {





	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;



		function getBandTD(techObj, objDef, func){

			var html =''


			if(techObj.indi == BOLLINGER && techObj.subType ==  'squeeze' ){
				// TODo		
				html+= getSqueezeTd('Bollinger',  techObj , objDef, func, LIST_BB_SQUEEZE);

			}else if(techObj.indi == BOLLINGER && techObj.subType ==  'price' ){
						
				html+= getPriceOverLayCO(techObj , objDef, func, LIST_BB)	;
			}else if(techObj.indi == KELTNER && techObj.subType ==  'price' ){
						
				html+= getPriceOverLayCO(techObj , objDef, func, LIST_KELTNER)	;

			}else if(techObj.subType ==  PSAR ){
				html+= getPriceOverLayCO(techObj , objDef, func, LIST_PSAR)	;			
			}else if(techObj.subType ==  SUPER_TREND ){
				html+= getPriceOverLayCO(techObj , objDef, func, LIST_SUPER_TREND)	;			
			}

			return html;

		}


		function getCrossTickSpec(techObj , objDef, func, showPrice){
			var html = '';


			if(!mtgv.mtpp.crossFreq){ // Cross Freq.... 
				return html;
			}
			var id = techObj.id;

			html+= '<div id ="' +id+'CustSetDiv">';

				html+= getCrossTickSetting(techObj , func , id);
				html+='</div>';
				if(showPrice){
					html+=  ' ' + getDropDown(ALL_OHLC_HA_FIELD	, id+'priceField', null,func, id, techObj.priceField) +' ' ;
				}

			return html;
		}

		function getCrossTickSetting(techObj , func , param){
			var id = techObj.id;
			var html ='';
			if(techObj.indi == BOLLINGER){
				html+= getDropDown(mtgv.mtpp.MA_TYPE, id+'maType', null,func, param, techObj.maType);

					mcval.sina(techObj , 'p1') // sets def Val

					html+=  ' ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , param)	;

					html+=  ' on ' + getDropDown(ALL_OHLC_HA_FIELD, id+'maField', null,func, param, techObj.maField);

					mcval.sina(techObj , 'p2') // sets def Val

					html+=  ' Std Dev ' + getInputTxtParam( id+'p2' , 3, techObj.p2, func , param)	;
					html+= htmlU.getSpan('Bollinger Band Def ends here' , 'grey',10);

					html+='<br/>';


					// html+=  ' ' + getDropDown(CLOSE_FIELDS_NO_VOL, id+'priceField', 'width:90px',func, id, techObj.priceField) +' ' ;

				}else  if(techObj.indi == KELTNER ){
					mcval.sina(techObj , 'maType') // sets def Val

					html+= getDropDown(mtgv.mtpp.MA_TYPE, id+'maType', null,func, param, techObj.maType);

					mcval.sina(techObj , 'p1') // sets def Val

					mcval.sina(techObj , 'p2') // sets def Val

					mcval.sina(techObj , 'shift') // sets def Val

					mcval.sina(techObj , 'f1') // sets def Val



					html+=  ' ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , param)	;

					html+=  ' on ' + getDropDown(ALL_OHLC_HA_FIELD, id+'maField', null,func, param, techObj.maField);

					html+=  ', ATR Period  '+ getInputTxtParam( id+'p2' , 3, techObj.p2, func , param)	;


					var mas = jsu.cloneObj(mtgv.mtpp.MA_TYPE);

					mas.unshift(ATR_MA_DEF) ;


					html+=  '  ATR MA  '+ getDropDown(mas, id+'f1', null,func, id, techObj.f1);

					html+=  ', Shift  '+ getInputTxtParam( id+'shift' , 3, techObj.shift, func , param)	;

					html+=  ', Type  '+ htmlU.getDropDown(SHIFT_TYPE, id+'shiftType' , null, func, param, techObj.shiftType );


					// html+='<br/>';


				}else  if(techObj.indi == SUPER_TREND ){
					mcval.sina(techObj , 'p1') // sets def Val

					mcval.sina(techObj , 'p2') // sets def Val

					mcval.sina(techObj , 'maType') // sets def Val

					html+= 'Period ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , param)	;

					var mas = jsu.cloneObj(mtgv.mtpp.MA_TYPE);

					mas.unshift(ATR_MA_DEF) ;

					html+= SP_3+   getDropDown(mas, id+'maType', null,func, param, techObj.maType);

					html+=  SP_3+' Multiplier  '+ getInputTxtParam( id+'p2' , 3, techObj.p2, func , param)	;


					html+=  SP_3+ getDropDown(OHLC_HA, id+'fieldCat', null,func, param, techObj.fieldCat);




				}else  if(techObj.indi == PSAR ){
					mcval.sina(techObj , 'p1') // sets def Val

					mcval.sina(techObj , 'p2') // sets def Val

					mcval.sina(techObj , 'p3') // sets def Val

					html+= 'Start ' + getInputTxtParam( id+'p1' , 3, techObj.p1, func , param)	;

					html+=  '  Increment  '+ getInputTxtParam( id+'p3' , 3, techObj.p3, func , param)	; // Incorrect order due to backward compatibility

					html+=  ' Maximum  '+ getInputTxtParam( id+'p2' , 3, techObj.p2, func , param)	;

					html+=  SP_3  +' on '+ getDropDown(OHLC_HA, id+'fieldCat', null,func, param, techObj.fieldCat);

				}


				return html;

		}




		function getPriceOverLayCO(techObj , objDef, func, fieldList ){
			var html = ''

			if(jsu.isNull(techObj.fieldType)){
				techObj.fieldType = fieldList[0].id;
			}

			var id = techObj.id;



			if( jsu.containsString([TRENDING_UP , TRENDING_DOWN  ] , techObj.ops )  ){

				html+= getCrossTickSpec(techObj , objDef, func, false);

			}else{
				html+= getCrossTickSpec(techObj , objDef, func, true);
			
				html +=  doBold('Price');
			}

			// super trend has more params  -- Flat Line , taken support

			var olOptions = getOverLaysOptions(techObj); 

			html+=   SP_3 + getDropDown(olOptions, id+'ops', null,func, id, techObj.ops); 



			// html +=getStandardOps(techObj, objDef, func);
			if( jsu.containsString([CS_ABOVE , CS_BELOW  ] , techObj.ops )  ){

				html+=   SP_3 + getDropDown(fieldList, id+'fieldType', 'width:100px',func, id, techObj.fieldType);
				html+= SP_3  + ' for min ' + getInputTxtParam( id+'v1' , 2, techObj.v1, func , id)	 
					+ htmlU.getSpan('(<b>Optional</b> 0 for latest, Range 0-5)' , 'grey', 8) + " Ticks" ;	

			}else if( jsu.containsString([CS_CO_ABV , CS_CO_BLW ] , techObj.ops)){

				html+=   SP_3 + getDropDown(fieldList, id+'fieldType', 'width:100px',func, id, techObj.fieldType);
				html+=  '# ' + getInputTxtParam( id+'v1' , 3, techObj.v1, func , id)	;
				html+= SP_3 +htmlU.getSpan('Ticks Back' , 'grey', 10) + htmlU.getSpan('(<b>Optional</b> Empty =   latest or 0, Range 0-5) ' , 'grey', 8)

			}else if( jsu.containsString([CS_CO_ABV_WITHIN , CS_CO_BLW_WITHIN ] , techObj.ops)){

				html+=   SP_3 + getDropDown(fieldList, id+'fieldType', 'width:100px',func, id, techObj.fieldType);
				html+= SP_3 + htmlU.getSpan('Within last '  ,'grey'  ,10) + getInputTxtParam( id+'v1' , 3, techObj.v1, func , id)	;
				html+= ' Ticks' + htmlU.getSpan('(0 for latest, Range 0-5) ' , 'grey', 8) 

			}else if( jsu.containsString([WITHIN , MORE_THAN ] , techObj.ops)){

				html+= SP_3 +      getDropDown(PC_COMP_LOW, id+'tolPc', 'width:70px',func, id, techObj.tolPc)+" % of " ;//

				html+=   SP_3 + getDropDown(fieldList, id+'fieldType', 'width:100px',func, id, techObj.fieldType);
			} else if( jsu.containsString([TRENDING_UP , TRENDING_DOWN , FLAT_BULL , FLAT_BEAR ] , techObj.ops )  ){
				if(jsu.isNull(techObj.v1)) techObj.v1 = 5;

				html+=   SP_3 + getDropDown(fieldList, id+'fieldType', 'width:100px',func, id, techObj.fieldType);
				html+= SP_3  + ' for min ' + getInputTxtParam( id+'v1' , 2, techObj.v1, func , id)	 + " Ticks" ;

			} else if( jsu.containsString([OL_SUP , OL_RES  ] , techObj.ops )  ){
			
				if(jsu.isNull(techObj.v1)) techObj.v1 = 1;

				
				html+=   SP_3 + getDropDown(fieldList, id+'fieldType', 'width:100px',func, id, techObj.fieldType);
				html+= BREAK_LINE;
				html+= SP_3  + ' reached min gap ' + getInputTxtParam( id+'v1' , 2, techObj.v1, func , id)	 + " %" ;
				html+= SP_3  + ' and latest tick within  ' + getInputTxtParam( id+'v2' , 2, techObj.v2, func , id)	 + " (Optional) Ticks" ;

			}


			html+=cst.acscb(id);

			return html;

		}


	function getSqueezeTd(label, techObj , objDef, func, LIST_BAND){

		if(jsu.isNull(techObj.fieldType)){
			techObj.fieldType = 'bollingerUB';
		}

		var id = techObj.id;

		var html='';

		html+= getCrossTickSpec(techObj , objDef, func, false);

		html +=  doBold("Squeeze");

		html+=   SP_3 + getDropDown(LIST_BAND, id+'ops', 'width:90px',func, id, techObj.ops); 

		if( jsu.containsString(['bandAnySqueeze' , 'bandAnyBO'  , 'bandAnyBD'  ] , techObj.ops )  ){
			// nothing extra
		}else if( jsu.containsString(['bandSqLowBW'  ] , techObj.ops )  ){
			if(jsu.isNull(techObj.v1)) techObj.v1  =6 ; 
			html +=   SP_3 + htmlU.getSpan('Within last '  ,'grey'  ,10) + getInputTxtParam( id+'v1' , 3, techObj.v1, func , id)	+ ' Period';
			html +=  htmlU.getSpan('(<b>Optional</b> 0 for latest, Range 0-15)' , 'grey', 8) + " Ticks" ;	

		}else if( jsu.containsString([ 'bandSqLowBWBO'  , 'bandSqLowBWBD'  ] , techObj.ops )  ){
			if(jsu.isNull(techObj.v1)) techObj.v1  =6 ; 
			if(jsu.isNull(techObj.v2)) techObj.v2  =10 ;

			html +=   SP_3 + htmlU.getSpan('Within last '  ,'grey'  ,10) + getInputTxtParam( id+'v1' , 3, techObj.v1, func , id)	;
			html +=  htmlU.getSpan('(Ticks <b>Optional</b> 0 for latest, Range 0-15)' , 'grey', 8) ;	

			html +=   SP_3 + htmlU.getSpan('With BW low within last '  ,'grey'  ,10) + getInputTxtParam( id+'v2' , 3, techObj.v2, func , id)	;
			html +=  htmlU.getSpan('(Ticks <b>Optional</b> Range 2-20)' , 'grey', 8)  ;	

		}else if( jsu.containsString(['bandSqLowBWRange' ] , techObj.ops )  ){
			if(jsu.isNull(techObj.v1)) techObj.v1  =12 ;
			if(jsu.isNull(techObj.v2)) techObj.v2  =15 ;
			if(jsu.isNull(techObj.v3)) techObj.v3  =20 ; 

			html +=   SP_3 + htmlU.getSpan('Average latest ' , 'grey', 8) + getInputTxtParam( id+'v1' , 3, techObj.v1, func , id)	
				+ htmlU.getSpan(' Tick (Range 3 to 20) Bandwidth is less than ', 'grey', 8) + getInputTxtParam( id+'v2' , 3, techObj.v2, func , id) 
				+ htmlU.getSpan(' % of Average of previous ' , 'grey', 8)  + getInputTxtParam( id+'v3' , 3, techObj.v3, func , id)
				+ htmlU.getSpan(' Ticks (Range 5 to 20) ' , 'grey', 8) 
				 ;
		}else if( jsu.containsString(['bandSqLowBWBORange'  , 'bandSqLowBWBDRange'  ] , techObj.ops )  ){
			if(jsu.isNull(techObj.v1)) techObj.v1  =0 ;
			// if(jsu.isNull(techObj.v2)) techObj.v2  =10 ;

			//  Hack v1, v2, v3 is v2, v3, v4 forr BO BW

			if(jsu.isNull(techObj.v2)) techObj.v2  =12 ;
			if(jsu.isNull(techObj.v3)) techObj.v3  =15 ;
			if(jsu.isNull(techObj.v4)) techObj.v4  =20 ; 

			html +=   SP_3 + htmlU.getSpan('Average latest ' , 'grey', 8) + getInputTxtParam( id+'v2' , 3, techObj.v2, func , id)	
				+ htmlU.getSpan(' Tick (Range 3 to 20) Bandwidth is less than ', 'grey', 8) + getInputTxtParam( id+'v3' , 3, techObj.v3, func , id) 
				+ htmlU.getSpan(' % of Average of previous ' , 'grey', 8)  + getInputTxtParam( id+'v4' , 3, techObj.v4, func , id)
				+ htmlU.getSpan(' Ticks (Range 5 to 20) ' , 'grey', 8) 

			var boDw =	 ('bandSqLowBWBORange' ==  techObj.ops) ? doBold("Break Out") :  doBold("Break Down") ;
			
			html += SP_3 + boDw +    SP_3 + htmlU.getSpan('Within last '  ,'grey'  ,10) + getInputTxtParam( id+'v1' , 3, techObj.v1, func , id)	+ htmlU.getSpan('(Ticks <b>Optional</b> Range 0-5)' , 'grey', 8)

			// html +=   SP_3 + htmlU.getSpan(' After    '  ,'grey'  ,10) + getInputTxtParam( id+'v2' , 3, techObj.v2, func , id)	+ htmlU.getSpan(' min  Squeeze period (Optional) Period' ,'grey'  ,10)
			;

		}else if(  techObj.indi == BOLLINGER &&  jsu.containsString(['bbSqKeltner'   ] , techObj.ops )  ){
			html +=   SP_3 + htmlU.getSpan('for min '  ,'grey'  ,10) + getInputTxtParam( id+'v1' , 3, techObj.v1, func , id)	
			+ SP_3 + htmlU.getSpan(' Period (Optional range 0 to 10 with zero being latest) ','grey'  ,10)

		}else if(  techObj.indi == BOLLINGER &&  jsu.containsString([ 'bbSqKeltnerBO'  , 'bbSqKeltnerBD'  ] , techObj.ops )  ){

			html +=   SP_3 + htmlU.getSpan('Within last '  ,'grey'  ,10) + getInputTxtParam( id+'v1' , 3, techObj.v1, func , id)	

			html+=  SP_3 +"Period";

			// html +=   SP_3 + htmlU.getSpan('Period (Optional Range 0 to 10 )'  ,'grey'  ,10) 

			// html +=   SP_3 + htmlU.getSpan('Period (Optional Range 0 to 10 )  After Staying within Keltner for min  '  ,'grey'  ,10) 
			// + getInputTxtParam( id+'v2' , 3, techObj.v2, func , id)	+ htmlU.getSpan(' Period (Optional Range 0 to 10 )','grey'  ,10)

		
		}else if( jsu.containsString(['bWWithinBO'  , 'bWWithinBD' , 'bWWithin'  ] , techObj.ops )  ){
			if(jsu.isNull(techObj.v1)) techObj.v1  =8 ;
			if(jsu.isNull(techObj.v2)) techObj.v2  =10 ;
			if(jsu.isNull(techObj.v2)) techObj.v3  =5 ;


			html +=   SP_3 + ' Bandwidth within  ' + getInputTxtParam( id+'v1' , 3, techObj.v1, func , id)	+" % of middle Band for min "

			html +=  getInputTxtParam( id+'v2' , 3, techObj.v2, func , id)	
			html +=   SP_3 + htmlU.getSpan('Period (Optional Range 2 to 10 )'  ,'grey'  ,10) ;

			if( jsu.containsString(['bWWithinBO'  , 'bWWithinBD'],  techObj.ops )  ){

				var boBd = ( techObj.ops == 'bWWithinBO' ) ? 'Breakout' : 'Breakdown';

				// html +=  boBd + ' with in last ' + getInputTxtParam( id+'v3' , 3, techObj.v2, func , id) +' Ticks'	
				html +=  boBd + '  in lastest  Tick'	;
				
			}

		}	


		html+=cst.acscb(id);
		return html;
	}


	function techNgBandChg(techObj){

		if (techObj.subType ==  PSAR){
			techNgPriceOverlayChg(techObj);
		}else if (techObj.subType ==  SUPER_TREND){
			techNgPriceOverlayChg(techObj);
		}else if (techObj.subType ==  'price' && techObj.indi == BOLLINGER){
			techNgPriceOverlayChg(techObj);
		}else if (techObj.subType ==  'price' && techObj.indi == KELTNER){
			techNgPriceOverlayChg(techObj);
		}else if (techObj.subType ==  'squeeze' && techObj.indi == BOLLINGER){
			techNgSqueezeChg(techObj);
		}

	}


	function crossFreqChg(techObj, squeeze){
		if(mtgv.mtpp.crossFreq){ // Cross Freq.... 

			var id = techObj.id;

			var BAND_FIELD = null;
			var FIELDS_TO_VAL = null;

			if(techObj.indi == BOLLINGER  ){   // && techObj.subType ==  'price'

				BAND_FIELD = BB_FIELDS;
				FIELDS_TO_VAL =  ['p1', 'p2', 'maField' , 'maType'   ];

				techObj.shift = techObj.p2; // STD Dev a hack to make All bands unifor for CS and chart to be right....
				techObj.shiftType = SHIFT_TYPE_MULT; //
			
			}else if(techObj.indi == KELTNER  ){ // && techObj.subType ==  'price'
				BAND_FIELD = KEL_FIELDS;
				FIELDS_TO_VAL = ['p1', 'p2', 'shift', 'shiftType', 'field' , 'maType' , 'f1' ]
			}else if(techObj.indi == SUPER_TREND  ){ // && techObj.subType ==  'price'
				BAND_FIELD = SUPERTREND_FIELDS;
				FIELDS_TO_VAL = ['p1', 'p2',  'maType' , 'fieldCat' ]
			}else if(techObj.indi == PSAR  ){ // && techObj.subType ==  'price'
				BAND_FIELD = PSAR_FIELDS;
				FIELDS_TO_VAL = ['p1', 'p2', 'p3' , 'fieldCat']
			}




			if(BAND_FIELD !=null){

				mcval.vstf(techObj,  id,  null, null, null); // other  params non Man Field

				if(!squeeze){
					FIELDS_TO_VAL.push( 'priceField');
				}

				if(  mcval.avm(techObj, BAND_FIELD , FIELDS_TO_VAL)){
					techObj.custom = null;
				}else{
					techObj.custom = true;
				}

				if( (techObj.indi == PSAR  || techObj.indi == SUPER_TREND ) && techObj.fieldCat == 'haOhlc' ){
					techObj.custom = true;
				}


			}

		}
	}



	function techNgPriceOverlayChg(techObj){
		var id = techObj.id;

		if( jsu.containsString([ OL_SUP , OL_RES] , techObj.ops)){
			
			isInputPositiveNumber(id+'v1')
			
			if( jsu.containsString([ OL_SUP , OL_RES] , techObj.ops)){
				if(jsu.isNotNull(htmlU.getInputVal(id+'v2'))){
					if( !isIntegerInput(id+'v2') || !inputNumberRange (id+'v2', 2,15)  ){
					}
				}
			}

		}else{

			if(jsu.isNotNull(htmlU.getInputVal(id+'v1'))){

				if( !isIntegerInput(id+'v1') || !inputNumberRange (id+'v1', 0,5)  ){
				
				}
			}

			if( jsu.containsString([TRENDING_UP ,TRENDING_DOWN , FLAT_BULL , FLAT_BEAR] , techObj.ops)){
				if( !isIntegerInput(id+'v1') || !inputNumberRange (id+'v1', 0,15)  ){
				}
			}

		}




		crossFreqChg(techObj, false);	

	}

	function techNgSqueezeChg(techObj){
		var id = techObj.id;



		crossFreqChg(techObj, true);	


		if( jsu.containsString(['bandAnySqueeze' , 'bandAnyBO'  , 'bandAnyBD'  ] , techObj.ops )  ){
			// nothing extra
		}else if( jsu.containsString(['bandSqLowBW'  ] , techObj.ops )  ){
			if(jsu.isNotNull(htmlU.getInputVal(id+'v1'))){
				if( !isIntegerInput(id+'v1') || !inputNumberRange (id+'v1', 0,15)  ){}
			}
		}else if( jsu.containsString(['bandSqLowBWBO'  , 'bandSqLowBWBD'  ] , techObj.ops )  ){
			if(jsu.isNotNull(htmlU.getInputVal(id+'v1'))){
				if( !isIntegerInput(id+'v1') || !inputNumberRange (id+'v1', 0,15)  ){}
			}
			if(jsu.isNotNull(htmlU.getInputVal(id+'v2'))){
				if( !isIntegerInput(id+'v2') || !inputNumberRange (id+'v2', 2,20)  ){}
			}

		}else if( jsu.containsString(['bandSqLowBWRange' ] , techObj.ops )  ){
			if( !isIntegerInput(id+'v1') || !inputNumberRange (id+'v1', 3,20)  ){	}

			if( !isInputNumber(id+'v2') || !inputNumberRange (id+'v2', 2,99)  ){	}		

			if( !isIntegerInput(id+'v3') || !inputNumberRange (id+'v3', 5,20)  ){	}	


		}else if( jsu.containsString(['bandSqLowBWBORange'  , 'bandSqLowBWBDRange'  ] , techObj.ops )  ){
			if(jsu.isNotNull(htmlU.getInputVal(id+'v1'))){
				if( !isIntegerInput(id+'v1') || !inputNumberRange (id+'v1', 0,5)  ){	}
			}
			// if(jsu.isNotNull(htmlU.getInputVal(id+'v2'))){
			// 	if( !isIntegerInput(id+'v2') || !inputNumberRange (id+'v2', 2,20)  ){}
			// }

			if( !isIntegerInput(id+'v2') || !inputNumberRange (id+'v2', 3,20)  ){	}

			if( !isInputNumber(id+'v3') || !inputNumberRange (id+'v3', 2,99)  ){	}		

			if( !isIntegerInput(id+'v4') || !inputNumberRange (id+'v4', 5,20)  ){	}	



		}else if(  techObj.id == BOLLINGER &&  jsu.containsString(['bbSqKeltner'   ] , techObj.ops )  ){
			if(jsu.isNotNull(htmlU.getInputVal(id+'v1'))){
				if( !isIntegerInput(id+'v1') || !inputNumberRange (id+'v1', 0,9)  ){}
			}

		}else if(  techObj.id == BOLLINGER &&  jsu.containsString([ 'bbSqKeltnerBO'  , 'bbSqKeltnerBD'  ] , techObj.ops )  ){

			if(jsu.isNotNull(htmlU.getInputVal(id+'v1'))){
				if( !isIntegerInput(id+'v1') || !inputNumberRange (id+'v1', 0,9)  ){}
			}

			if(jsu.isNotNull(htmlU.getInputVal(id+'v2'))){
				if( !isIntegerInput(id+'v2') || !inputNumberRange (id+'v2', 0,9)  ){}
			}
		}else if( jsu.containsString(['bWWithinBO'  , 'bWWithinBD' , 'bWWithin'  ] , techObj.ops )  ){
			if(jsu.isNotNull(htmlU.getInputVal(id+'v1'))){
				if( !isIntegerInput(id+'v1') || !inputNumberRange (id+'v1', 1,100)  ){}
			}

			if(jsu.isNotNull(htmlU.getInputVal(id+'v2'))){
				if( !isIntegerInput(id+'v2') || !inputNumberRange (id+'v2', 2,10)  ){}
			}

			// if( jsu.containsString(['bWWithinBO'  , 'bWWithinBD'],  techObj.ops )  ){
			// 	if( !isIntegerInput(id+'v3') || !inputNumberRange (id+'v3', 0,3)  ){}
			// }
		}
	}

	function validateBandChg(techObj, validResults, objDef){

		var valObj =  null;

		if (techObj.subType ==  PSAR){
			valObj = validatePriceOverlayChg(techObj, validResults , objDef, LIST_PSAR );
		}else if (techObj.subType ==  'price' && techObj.indi == BOLLINGER){
			valObj = validatePriceOverlayChg(techObj, validResults , objDef, LIST_BB );
		}else if (techObj.subType ==  'price' && techObj.indi == KELTNER){
			valObj = validatePriceOverlayChg(techObj, validResults , objDef, LIST_KELTNER );
		}else if (techObj.subType ==  SUPER_TREND){
			valObj = validatePriceOverlayChg(techObj, validResults , objDef, LIST_SUPER_TREND );
		}else if (techObj.subType ==  'squeeze' && techObj.indi == BOLLINGER){
			valObj = validateSqueezeChg(techObj, validResults , objDef, LIST_BB_SQUEEZE );
			OPS_LIST = LIST_BB_SQUEEZE;
		}
		return valObj;
	}


	function valiCrossFreqChg(techObj,squeeze){

		var goodData = true;
		var text = '';

		if(!mtgv.mtpp.crossFreq){
			return {text : text , goodData : goodData };
		}

		if(!mcval.vtf(  techObj, null, null, null)){
			return {text : text , goodData : false };
		}




		var id = techObj.id;
		// MA mtgv.mtpp.MA_TYPE[0].id
		if(techObj.indi == BOLLINGER  ){   // && techObj.subType ==  'price'

				text +=' Bollinger Band Cfg ( ' + techObj.p1  +' ' +  techObj.maType + ' on ' +  techObj.maField + ' Price ' ;

				text +=', Std Dev ' +  techObj.p2 +' ) ';

				// if(!squeeze  ){
				// 	text += techObj.priceField + ' ';	
				// }
				


		}else if(techObj.indi == KELTNER ){  //  && techObj.subType ==  'price'
				text +=' Keltner Band Cfg ( ' + techObj.p1  +' ' +  techObj.maType + ' on ' +  techObj.maField + ' Price ' ;

				text +=',  ATR Period ' +  techObj.p2 ;

				text +=',  ATR MA ' +  techObj.f1 ;

				text +=',  Shift ' +  techObj.shift ;

				text +=',  Shift Type ' +  techObj.shiftType ;

				text += ' ) ';

				// text += techObj.priceField + ' ';
		}else if(techObj.indi == SUPER_TREND  ){   // && techObj.subType ==  'price'

				text +=' Supertrend Cfg ( Period ' + techObj.p1  +' ATR MA ' +  techObj.maType ;

				text +=', Multiplier ' +  techObj.p2 +' ) ';

				// text += techObj.priceField + ' ';
		}else if(techObj.indi == PSAR  ){   // && techObj.subType ==  'price'

				text +=' Parabolic Cfg ( Start ' + techObj.p1  +' Increment ' +  techObj.p3 ;

				text +=', Maximum ' +  techObj.p2 +' ) ';

				
		}
	
		if( jsu.isNotNull( techObj.priceField )){
			text += techObj.priceField + ' ';	
		}

		

		return {text : text , goodData : goodData };
	}



	function validatePriceOverlayChg(techObj, validResults , objDef , fieldArr){

		var olOptions = getOverLaysOptions(techObj); 

		var opsObj = jsu.getObjFrmArr( olOptions ,  techObj.ops);

		var v1 = jsu.getNumericValue(techObj.v1 );
		var v2 = jsu.getNumericValue(techObj.v2 );


		var fieldObj =  jsu.getObjFrmArr( fieldArr ,  techObj.fieldType);

		// if(fieldObj == null) fieldObj


		var text = '';

		var goodData = true;

		var cfVali = valiCrossFreqChg(techObj);
		goodData = cfVali.goodData;
		text+= cfVali.text;

		text += 'Price '  + opsObj.label;



		if( jsu.containsString([CS_ABOVE , CS_BELOW  ] , techObj.ops )  ){
			text += SP_3 + fieldObj.label ;
			if(v1 == null){
				// good case
			}else if(!jsu.isInteger(v1)){
				goodData = false;
			}else{
				if(v1 < 0 || v1> 9){
					goodData = false;
				}else{
					text += " for " +  v1 + " Ticks";
				}
			}

		}else if( jsu.containsString([CS_CO_ABV , CS_CO_BLW ,CS_CO_ABV_WITHIN , CS_CO_BLW_WITHIN] , techObj.ops)){

			if(v1!=null &&  !jsu.isInteger(v1)){
				goodData = false;
			}else{
				if(v1 == null){
				// good case
				}else if(!jsu.isInteger(v1)){
					goodData = false;
				}else{
					if( jsu.containsString([ CS_CO_ABV , CS_CO_BLW] , techObj.ops)){
						text += SP_3 + fieldObj.label +  v1 + " Ticks Back";
					}else{
						text += SP_3 + fieldObj.label  +' Within ' +  v1 + " Ticks";
					}
				}
			}
		}else if( jsu.containsString([TRENDING_UP ,TRENDING_DOWN , FLAT_BULL , FLAT_BEAR] , techObj.ops)){
			if(v1 == null || !jsu.isInteger(v1)){
				goodData = false;
			}else{
				if(v1 < 0 || v1> 15){
					goodData = false;
				}else{
					text += " for " +  v1 + " Ticks";
				}
			}
		}else if( jsu.containsString([OL_SUP,OL_RES ] , techObj.ops)){
			if(v1 == null || v1 < 0){
				goodData = false;
			}else{
				if(v1 < 0 || v1> 15){
					goodData = false;
				}else{
					text += " Retracing Within " +  v1 + " %";
				}
				



				if(v2!=null && v2 < 2 || v2> 15){
					goodData = false;
				}

			}
		}else if( jsu.containsString([WITHIN , MORE_THAN ] , techObj.ops)){
			text +=  " Within " + techObj.tolPc + "% of " + fieldObj.label ;
			
		}

		return valObj = {goodData : goodData , text : text };;
	}

	function validateSqueezeChg(techObj, validResults , objDef, LIST_BB_SQUEEZE ){

		var opsObj = jsu.getObjFrmArr(LIST_BB_SQUEEZE ,  techObj.ops);		

		if(opsObj == null) opsObj = LIST_BB_SQUEEZE[0];


		var v1 = jsu.getNumericValue(techObj.v1 );
		var v2 = jsu.getNumericValue(techObj.v2 );
		var v3 = jsu.getNumericValue(techObj.v3 );
		var v4 = jsu.getNumericValue(techObj.v4 );


		// var fieldObj =  jsu.getObjFrmArr( fieldArr ,  techObj.fieldType);

		var text ='';

		text= 'Bollinger Band '  + opsObj.label;

		

		var goodData = true;

		var cfVali = valiCrossFreqChg(techObj, true);
		goodData = cfVali.goodData;
		text+= cfVali.text;

		if( jsu.containsString(['bandAnySqueeze' , 'bandAnyBO'  , 'bandAnyBD'  ] , techObj.ops )  ){
			// nothing extra
		}else if( jsu.containsString(['bandSqLowBW'  ] , techObj.ops )  ){

			if(v1==null ){
				// good case ... 
			}else if(!jsu.isInteger(v1) ){
				goodData = false;
			}else{
				text += SP_3 + 'Within last ' +  v1 ;
			}
		
		}else if( jsu.containsString(['bandSqLowBWBO'  , 'bandSqLowBWBD'  ] , techObj.ops )  ){
			if(v1==null ){
				// good case ... 
			}else if(!jsu.isInteger(v1) ){
				goodData = false;
			}else{
				text += SP_3 + 'Within last ' +  v1 ;
			}

			if(v2==null ){
				// good case ... 
			}else if(!jsu.isInteger(v2) ){
				goodData = false;
			}else{
				text += SP_3 + ' With BW low within last  ' +  v2  +' Ticks';
			}	
	
		}else if( jsu.containsString(['bandSqLowBWRange' ] , techObj.ops )  ){
			
			if(v1==null  || v2==null || v3 ==null ||  !jsu.isInteger(v1) || !jsu.isInteger(v3) || !jsu.isNumber(v2)){
				goodData = false;
			}else{
				text += SP_3 + 'Average latest ' + v1 +" Tick bandwidth is less than " + v2+ ' % of  Average of previous '
				+ v3 + '  Ticks.'
 			}	
		}else if( jsu.containsString(['bandSqLowBWBORange'  , 'bandSqLowBWBDRange'  ] , techObj.ops )  ){


			if(v2==null  || v3==null || v4 ==null ||  !jsu.isInteger(v2) || !jsu.isInteger(v3) || !jsu.isNumber(v4)){
				goodData = false;
			}else{
				text += SP_3 + 'Average latest ' + v2 +" Tick bandwidth is less than " + v3+ ' % of  Average of previous '
				+ v4 + '  Ticks.'
 			}	

 			var boDw = (techObj.ops == 'bandSqLowBWBORange') ? 'Break Out' :'Break Down';


			if(v1==null || v1==0){
				// good case ... 

				text+= SP_3 + boDw + ' in latest Tick ';
			}else if(!jsu.isInteger(v1) ){
				goodData = false;
			}else{
				text += SP_3 + boDw +  ' Within last ' +  v1 +' period';
			}

			// if(v2==null ){
			// 	// good case ... 
			// }else if(!jsu.isInteger(v2) ){
			// 	goodData = false;
			// }else{
			// 	text += SP_3 + ' after  min  Squeeze ' +  v2  +' Ticks';
			// }	





		}else if(  techObj.id == BOLLINGER &&  jsu.containsString(['bbSqKeltner'   ] , techObj.ops )  ){
			
			if(v1==null ){
				// good case ... 
			}else if(!jsu.isInteger(v1) ){
				goodData = false;
			}else{
				text += SP_3 + 'for min ' +  v1 +' period';
			}

		}else if(  techObj.id == BOLLINGER &&  jsu.containsString([ 'bbSqKeltnerBO'  , 'bbSqKeltnerBD'  ] , techObj.ops )  ){

			if(v1==null ){
				// good case ... 
			}else if(!jsu.isInteger(v1) ){
				goodData = false;
			}else{
				text += SP_3 + 'Within last ' +  v1 +' period';
			}

			if(v2==null ){
				// good case ... 
			}else if(!jsu.isInteger(v2) ){
				goodData = false;
			}else{
				text += SP_3 + ' After Staying within Keltner for min  ' +  v2  +' Ticks';
			}
		
		}else if( jsu.containsString(['bWWithinBO'  , 'bWWithinBD' , 'bWWithin'  ] , techObj.ops )  ){	

			var TECH_PROP = ['v1', 'v2'];

			var FIELD_DEF = {};

			  mcval. sfd( FIELD_DEF,  'v1', techObj.v1,  FT_POS_NUM, true , 1, 100 )  ;  // // p1: {val : 20, type: FT_POS_INT  , man : true,  min : 2 , max :200 } ,
			  mcval.sfd( FIELD_DEF,  'v2', techObj.v2,  FT_POS_NUM, true , 0, 10 )  ;  


			  // if( jsu.containsString(['bWWithinBO'  , 'bWWithinBD'],  techObj.ops )  ){
			  // 		TECH_PROP.push('v3');
			  // 		mcval.sfd( FIELD_DEF,  'v3', techObj.v3,  FT_POS_NUM, true , 0, 10 )  ;  

			  // }

			  if( mcval.vtf(  techObj, null, TECH_PROP, FIELD_DEF) ){

			  		text += ' Band width within ' + techObj.v1 + ' % of middle band for min ' +  techObj.v2 + ' Period ';

			  		 if(techObj.ops == 'bWWithinBO'){
			  		 	text+= ' and break out in lastest Tick'
			  		 }else if('bWWithinBD'){
			  		 	text+= ' and break down in lastest Tick'
			  		 }


			  }else{
			  		goodData = false;
			  		text = 'Invalid Values for Bandwith Within  % ';
			  }
				
			


		}
		return valObj = {goodData : goodData , text : text , fieldName : 'Bollinger Squeeze'};;
	}



	
	function getOverLaysOptions(techObj){
		var options = mtgv.mtpp.OVERLAYS_OPS.slice();


		if(techObj.fieldType == SUPER_TREND && mtgv.mtpp.crossFreq){
			options.push(FLAT_BUL_OL);
			options.push(FLAT_BEAR_OL);
			options.push(OL_TAKEN_SUP);
			options.push(OL_TAKEN_RES);
		}

		return options;

	}


	return {
		gbtd : getBandTD,
		tnbc : techNgBandChg,
		vbc : validateBandChg,

		cts : getCrossTickSetting
		
	}



})(); // module 		
