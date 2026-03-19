

var LIST_TECH_ABS =[

		
	];

var LIST_TECH_CO =[

];



var BULL_MACO = 'BullMaCo';
var BEAR_MACO = 'BearMaCo';

var TECH_ABV_MA = 'abvMa';
var TECH_BLW_MA = 'blwMa';



	// var BULL_MACO = 'BullMaCo';
	// var BEAR_MACO = 'BearMaCo';
	var BULL_SWING_REJ = 'BullSwingRej';
	var BEAR_SWING_REJ = 'BearSwingRej';

    var INDI_DOUBLE_BOTTOM = "indiDoubleBottom";
    var INDI_DOUBLE_TOP = "indiDoubleTop";


var INDI_PRICE_PC = 'IndiPricePc';
var PRICE_TO_INDI = 'PriceToIndi';
var PRICE_TO_INDI_PC = 'PriceToIndiPc';




var COMMON_MACO_OPS = [
		{id: TECH_ABV_MA, label:'Above Its MA'},
		{id: BULL_MACO, label:'Bullish MA Crossovers'},
		{id: TECH_BLW_MA, label:'Below Its MA'},
		{id: BEAR_MACO, label:'Bearish MA Crossovers'},
];





var COMMON_SR_OPS = [
	{id: BULL_SWING_REJ, label:'Bullish Swing Rejection'},
	{id: BEAR_SWING_REJ, label:'Bearish Swing Rejection'}
];

var INDI_DOUBLE_TOP_BOT = [
	{id: INDI_DOUBLE_BOTTOM, label:'Double Bottom'},
	{id: INDI_DOUBLE_TOP, label:'Double Top'}
];



var INDI_PRICE_RATIO = [
	{id: INDI_PRICE_PC, label:' / Price %'},
	{id: PRICE_TO_INDI, label:' - Price/Indicator'},
	{id: PRICE_TO_INDI_PC, label:' - Price / Indi %'},
	
];




var  PRICE_RAT_OPS = [ OPS_ABV , OPS_BELOW  , OPS_BETWEEN ];




// CS TECH
var cst =  (function () {


	var thisObject = 'cst';
	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;



	function getTiHtml(id){

		
		let html = '';

		html+= getAllRows(id);

		html+= SP_3 + htmlU.getSpan(doBold("Click on any Tech Indicator to Configure Screener. You can add More than One of any type "), 'grey' , 10);

		html+= getControls();

		html+='<br/>';
		html+='<br/>';

		return html;
	}

	function getAllRows(id){
		var scrData = mtgv.cs.screenerData;

		// var html ='';
		// var html ='';
		var html ='<br/><div id="'+id+'Div">';

		html+= '<table id="tecCtrlTab" '+TAB_INDI_STYLE+'  "  >';

		for(var i=0;i<scrData.techNgComp.length;i++){
			html+=getTechNgHtml(scrData.techNgComp[i]);
		}

		for(var i=0;i<scrData.techAbsComp.length;i++){
			html+=getTiAbsHtml(scrData.techAbsComp[i]);
		}

		for(var i=0;i<scrData.techCoComp.length;i++){
			html+=getTiCoHtml(scrData.techCoComp[i]);
		}

		for(var i=0;i<scrData.techIchiComp.length;i++){
			// html+=   getIchiCoHtml(scrData.techIchiComp[i]);
			html+=   ichiOld.gih(scrData.techIchiComp[i]);
		}

		for(var i=0;i<scrData.techDiyBiComp.length;i++){
			html+=  diybi.ghr(scrData.techDiyBiComp[i]);

		}


		html+= '</table>';

		return html;

	}

	function getFormRow(type, id){ //MA_PRICE_OPTIONS
		// var scrData = mtgv.cs.screenerData;
		// let objList = scrData[type+'Comp'];
		// let obj =  jsu.getObjFrmArr(objList, id)

		let obj =   csu.gso(type, id)


		if(type=='techNgComp'){
    	    return getTechNgHtml(obj);
		}else if(type=='techAbsComp'){
    	    return getTiAbsHtml(obj);
		}else if(type=='techCoComp'){
    	    return getTiCoHtml(obj);
		}else if(type == 'techIchiComp'){
    	    return ichiOld.gih(obj);
		}else if(type == 'techDiyBiComp'){
    	    return diybi.ghr(obj);
		}


	}


	function getControls(){

		let html ='';

		html+= '<table id="tecCtrlTab" class="table table-bordered   "  >';

		// ------------ Overbought / Sold ----------------- 
		html+= '<tr><td>';
		html+= doBold('Over Bot/Sold : ') ; 		
		html+= htmlU.getButtonP('Aroon Osc' , 'cst.atn', AROON  + PARAM_DELIM + 'obos','Aroon (Aroon Oscillator)');
		html+= SP_3 + htmlU.getButtonP('CCI' , 'cst.atn', CCI + PARAM_DELIM+ 'obos' ,'Commodity Channel Index');
		html+= SP_3 + htmlU.getButtonP('MFI' , 'cst.atn', MFI + PARAM_DELIM + 'obos','MSI (Money Flow Index)');


		// Rebranding of RSI
		html+= SP_3 + htmlU.getButtonP('RSI (fast)' , 'cst.atn', RSI + PARAM_DELIM + 'obos','RSI (Fast)');
		html+= SP_3 + htmlU.getButtonP('RSI' , 'cst.atn', RSI_SMOOTH+ PARAM_DELIM  + 'obos',' RSI ( Relative Strength Indicator)');


		html+= SP_3 + htmlU.getButtonP('Sto Fast' , 'cst.atn', STO_FAST + PARAM_DELIM + 'sto','Stochastic Fast');
		html+= SP_3 + htmlU.getButtonP('Sto Slow' , 'cst.atn', STO_SLOW + PARAM_DELIM + 'sto','Stochastic Slow');
		
		html+= SP_3 + htmlU.getButtonP('Sto RSI (Fast)' , 'cst.atn', STO_RSI + PARAM_DELIM + 'stoRsi','Stochastic RSI (Fast)');
		html+= SP_3 + htmlU.getButtonP('Sto RSI' , 'cst.atn', STO_RSI_SLOW + PARAM_DELIM + 'stoRsi','Stochastic RSI');
		


		html+= SP_3 + htmlU.getButtonP('UO' , 'cst.atn', UO + PARAM_DELIM + 'obos','UO ( Ultimate Oscillator)');
		html+= SP_3 + htmlU.getButtonP('W%R' , 'cst.atn', WILLIAMS + PARAM_DELIM + 'obos','W%R ( Williams %R)');

		
		html+= '</td></tr>';
		// ------------Over Lays ----------------- 

		html+= '<tr><td>';

		// html+= SMALL_BR  + TSR_HR +SMALL_BR +  SP_3 


		html+= doBold('Overlays : ') ; 		
		

		html+=  htmlU.getButtonP('Price & Bollinger' , 'cst.atn', BOLLINGER  + PARAM_DELIM +'price','Price Comparision With Bollinger Band');

		if(mtgv.mtpp.pr || mtgv.mtpp.sq){
			html+= SP_3 + htmlU.getButtonP('Bollinger Squeeze' , 'cst.atn', BOLLINGER  + PARAM_DELIM +'squeeze','Bollinger Bands Squeeze');
		}

		// html+= SP_3 + getButtonP('Ichimoku' , 'cst.addTech', 'techIchiComp');

		if(!jsu.isMigContext()){
			html+= SP_3 + getButtonP('Ichimoku (old)' , 'ichiOld.aim', 'techIchiComp');
		}


		html+= SP_3 + htmlU.getButtonP('Ichimoku ' , 'cst.atn', ICHIMOKU  + PARAM_DELIM +ICHIMOKU,'Ichimoku Cloud');
		

		html+= SP_3 + getButtonP('Price & Keltner' , 'cst.atn', KELTNER  + PARAM_DELIM +'price','Price Comparision With Keltner Channel');

		html+= SP_3 + htmlU.getButtonP('PSAR' , 'cst.atn', PSAR  + PARAM_DELIM +PSAR,'Parabolic SAR');


		// html+= htmlU.getSpan("Bollinger Squeeze / Widening Coming soon" , 'grey', 10);


		html+= '</td></tr>';

		// ------------Trend ----------------- 

		html+= '<tr><td>';
		html+= doBold('Trend/Momentum : ') ;

		html+= htmlU.getButtonP('ADX' , 'cst.atn', ADX  + PARAM_DELIM + ADX,'ADX (Average Directional Index)');
		
		html+= SP_3 +htmlU.getButtonP('Aroon' , 'cst.atn', AROON  + PARAM_DELIM + 'AroonIndi','Aroon');

		

		html+= SP_3 +htmlU.getButtonP('AweOsc' , 'cst.atn', AWESOME_OSC  + PARAM_DELIM + AWESOME_OSC,'Awesome Oscillator');

		html+= SP_3 + htmlU.getButtonP('MACD' , 'cst.atn', MACD + PARAM_DELIM + 'macd','MACD (Moving Average Conv & Divergence)');

		html+= SP_3 + htmlU.getButtonP('ROC' , 'cst.atn', ROC + PARAM_DELIM + ROC,'ROC (Rate of Change)');

		html+= SP_3 + htmlU.getButtonP('RVI' , 'cst.atn', RVI + PARAM_DELIM + RVI,'RVI (Relative Vigor Idx)');

		html+= SP_3 + htmlU.getButtonP('Supertrend' , 'cst.atn', SUPER_TREND  + PARAM_DELIM +SUPER_TREND,'Supertrend');
		
		// html+= htmlU.getSpan("More Indicators coming by Mid Jan" , 'grey', 10);

		html+= '</td></tr>';

		
		// ------------Volume Based  ----------------- 
		html+= '<tr><td>';
		
		// html+= SMALL_BR  + TSR_HR +SMALL_BR +  SP_3 

		html+= doBold('Accumulation / Distribution : ') ; 		
		html+= htmlU.getButtonP('CMF' , 'cst.atn', CMF +  PARAM_DELIM  + CMF ,'CMF (Chaikin Money Flow');
		html+= htmlU.getSpan("ADI / OBV / PVT Coming soon" , 'grey', 10);

		// html+= SMALL_BR  + TSR_HR +SMALL_BR
		html+= '</td></tr>';



		// ------------Volatility Based  ----------------- 
		html+= '<tr><td>';
		
		html+= doBold('Volatility ') ; 		
		html+= htmlU.getButtonP('ATR' , 'cst.atn', ATR  + PARAM_DELIM + ATR,'ATR (Average True Range)');
		html+= SP_3 +htmlU.getButtonP('Std Dev' , 'cst.atn', STD_DEV +  PARAM_DELIM  + STD_DEV ,'Standard Deviation');
		
		html+= '</td></tr>';




		html+= '<tr><td>';
		html+= doBold('DIY - Advance Comparision : ') ; 		
		if(mtgv.mtpp.crossFreq  && mtgv.mtpp.pr){
			// Advance Indicators 

			

			
			html+= SP_3 + getButtonP('Over Bot/Sold' , 'diybi.add', OBOS , 'DIY Deep Compare Over Bot/Sold Indicators');

			html+= SP_3 + getButtonP('Trend Indi' , 'diybi.add', TREND , 'DIY Deep Compare Trend Indicators');

			html+= SP_3 + getButtonP('Momentum Indi' , 'diybi.add', MOMENTUM , 'DIY Deep Compare Momentum Indicators');

			html+= SP_3 + getButtonP('Accumulation Dist' , 'diybi.add', ACC_DIST , 'DIY Deep Compare Accumulation Distribution Indicators');

			html+= SP_3 + getButtonP('Volatility' , 'diybi.add', VOLATILITY , 'DIY Deep Compare Volatility Indicators');
			

			html+= SP_3 + getButtonP('Overlays' , 'diybi.add', OVERLAYS , 'DIY Deep Compare Overlays');
			

			// html+= SP_3 + getButtonP('Other Crossovers ' , 'cst.addTech', 'techCoComp');
			
			
		} else{

			html+= SP_3 + htmlU.gdb('Over Bot/Sold ', AVAIL_HIGH_PLAN);
			html+= SP_3 + htmlU.gdb('Trend Indi ', AVAIL_HIGH_PLAN);
			html+= SP_3 + htmlU.gdb('Momentum Indi ', AVAIL_HIGH_PLAN);
			html+= SP_3 + htmlU.gdb('Accumulation Dist ', AVAIL_HIGH_PLAN);
			html+= SP_3 + htmlU.gdb('Volatility ', AVAIL_HIGH_PLAN);
		}
		html+= '</td></tr>';



		html+= '</table>';

		return html;

	}


	function addNewFilter(indi, subType){

		let id = null;
		let html = null;

		if(subType == null || subType =='diy'){
			return diybi.anf(type);

		}else{

			var techNgComp = mtgv.cs.screenerData.techNgComp;
			id =  myTsrScreener.getNextId( 'techNgCompId');

			var tecObj = null;

			if(indi == ICHIMOKU){

				tecObj = imccs.cio(id);

			}else{

				var tecObj = { id :id,   ops :mtgv.mtpp.TECH_OPS[0].id ,  type : 'techIndi' ,  subType:subType, indi: indi};
			
				if(tecObj.indi == BOLLINGER && tecObj.subType ==  'squeeze'){
					tecObj.ops= LIST_BB_SQUEEZE [0].id;
				}
			}

			techNgComp.push(tecObj);

			var td = getTechNgHtmlTds(tecObj);

			html = '<tr id='+tecObj.id+'>'	+ createTd(createDiv(tecObj.id+'Td2Div', td)) +'</tr>';
		}

		return { html : html , id : id};

	}


	function addFilterChange(type,subType, id){ //MA_PRICE_OPTIONS

		if(subType == null || subType =='diy'){

		}else{
	    	techNgChg(id);
		}
		csu.dsf();
	}


// -------------------- OBOS ---------------------

	function getTechNgHtml(tecObj){

		return '<tr id='+tecObj.id+'>'+ createTd(createDiv(tecObj.id+'Td2Div', getTechNgHtmlTds(tecObj))) +'</tr>';

		// if(tecObj.subType == 'obos'){
		// 	return '<tr id='+tecObj.id+'>'+ createTd(createDiv(tecObj.id+'Td2Div', getObosHtmlTds(obosObj))) +'</tr>';
		// }
	}


	function addTechNg(indi, subType){

/*		
		var techNgComp = mtgv.cs.screenerData.techNgComp;
		var id =  myTsrScreener.getNextId( 'techNgCompId');

		var tecObj = null;

		if(indi == ICHIMOKU){

			tecObj = imccs.cio(id);

		}else{

			var tecObj = { id :id,   ops :mtgv.mtpp.TECH_OPS[0].id ,  type : 'techIndi' ,  subType:subType, indi: indi};
		
			if(tecObj.indi == BOLLINGER && tecObj.subType ==  'squeeze'){
				tecObj.ops= LIST_BB_SQUEEZE [0].id;
			}
		}

		techNgComp.push(tecObj);

		var td = getTechNgHtmlTds(tecObj);



		// if(subType!=null && subType =='obos'){
		// 	td = getObosHtmlTds(obosObj);
		// }

		var html = '<tr id='+tecObj.id+'>'	+ createTd(createDiv(tecObj.id+'Td2Div', td)) +'</tr>';

*/

		let json = addNewFilter(indi, subType);


	    $('#tecCtrlTab').append( json.html);

	    addFilterChange(indi , subType, json.id);


	    // techNgChg(id);
	    // csu.dsf();

	     var element = document.querySelector('#csControlsDiv');
	    element.scrollTop = 0;


	}

	
	function getTechNgHtmlTds(techObj){

		var id = techObj.id;
		var func = 'cst.tnc';  // TODO -- Change to generic name

		var indi = techObj.indi;
		if(techObj.indi == AROON && techObj.subType =='obos'){
			indi = AROON_OSC;
		}

		var objDef =  jsu.getObjFrmArr( ALL_INDIS_MAP, indi );

		var html= doBold( objDef.shortName + " : " );

		html+= getCustomTechInput(techObj, objDef, func);
		html+= getCrossFreqInput(techObj, objDef, func);

		// ---


		if(techObj.subType == 'obos' || techObj.subType ==  'sto'  || techObj.subType ==  'stoRsi'){
			html+= tobos.got(techObj, objDef, func); // ALL OBOS ....

		}else if( jsu.containsString( [AWESOME_OSC] ,   techObj.subType )) { //}   techObj.subType ==  'macd' ){	
			html+= tindis.git(techObj, objDef, func);

		// }else if( techObj.subType ==  CMF  || techObj.subType ==  ROC  || techObj.subType ==  ATR     ){ // || techObj.subType ==  AWESOME_OSC
	
		}else if(jsu.containsString([CMF, ATR, ROC, STD_DEV], techObj.subType)){	

			// html+=   SP_3 + getDropDown(mtgv.mtpp.TECH_OPS, id+'ops', 'width:90px',func, id, techObj.ops); 
			// html +=getStandardOps(techObj, objDef, func);
			html+= tibsl.gtd(techObj, objDef, func);
		

		}else if( jsu.containsString( ['macd' , ADX , 'AroonIndi' , RVI] ,   techObj.subType )) { //}   techObj.subType ==  'macd' ){
			// html+=  getMacdTd(techObj , objDef, func);
			// html+= 	getTMultiLineTd(techObj , objDef, func, 'macd', LIST_MACD, MACD_ADDI_OPS, ['macBul' , 'macBear' ] , ['macBulWithin' , 'macBearWithin' ] )  			
		
			html+= tindis.git(techObj, objDef, func);


		// }else if(techObj.subType ==  RVI ){
			// html+=  getMacdTd(techObj , objDef, func);
			// html+= 	getTMultiLineTd(techObj , objDef, func, RVI, LIST_RVI, RVI_ADDI_OPS, ['rviBul' , 'rviBear' ] , ['rviBulWithin' , 'rviBearWithin' ] )  			
		

/*
		}else if(techObj.subType ==  'sto' ){
			html+= 	getTMultiLineTd(techObj , objDef, func, 'k', LIST_STO, STO_ADDI_OPS, ['stosKAbvD' , 'stosKBlwD' ] , ['stosKAbvDWithin' , 'stosKBlwDWithin' ] )  			
		}else if(techObj.subType ==  'stoRsi' ){
			// USES SAME Fields as Normal STO
			html+= 	getTMultiLineTd(techObj , objDef, func, 'k', LIST_STO, STO_ADDI_OPS, ['stosKAbvD' , 'stosKBlwD' ] , ['stosKAbvDWithin' , 'stosKBlwDWithin' ] )  			
		
*/

		// }else if(techObj.subType ==  ADX ){
		// 	html+= 	getTMultiLineTd(techObj , objDef, func, ADX, LIST_ADX, ADX_ADDI_OPS, ['adxP2M' , 'adxM2P' ] , ['adxP2MWithin' , 'adxM2PWithin' ] )  			
		
		// }else if(techObj.subType ==  'AroonIndi' ){
		// 	html+= 	getTMultiLineTd(techObj , objDef, func, 'aroonUp', LIST_AROON, AROON_ADDI_OPS, ['aroonUpCO' , 'aroonDownCO' ] , ['aroonUpCOWithin' , 'aroonDownCOWithin' ] )  			
		}else if(jsu.containsString([ICHIMOKU], techObj.subType)){	

			html += imccs.git(techObj, objDef, func);

		}


		// Bands ....
		html+= tband.gbtd(techObj, objDef, func); 



		var param = 'techNgComp' + ':'+id; // Vol Compare
		html+= SP_3 + csh.delIcon(param) ;

		return html;

	}

	


	function getTMultiLineTd(techObj , objDef, func, defField, fieldList, addiOption, daysCo , daysWitin ){
		var id = techObj.id;
		var html ='';
		if(jsu.isNull(techObj.fieldType)){
			techObj.fieldType = defField;
		}


		var  opsList = mtgv.mtpp.TECH_OPS.slice();
		if(techObj.fieldType == defField){
			 opsList = opsList.concat(addiOption);
		}

		html+=   SP_3 + getDropDown(fieldList, id+'fieldType', null,func, id, techObj.fieldType);

		html+=   SP_3 + getDropDown(opsList, id+'ops', null,func, id, techObj.ops);
		
		html +=	getStandardOps(techObj, objDef, func);

		if( jsu.containsString(daysCo , techObj.ops )  ){
			html+=indisCoDay(techObj, objDef, func);
		}else if( jsu.containsString(daysWitin , techObj.ops )  ){
			html+=indisCoWitin(techObj, objDef, func);
		}
		return html;
	}




// -------------------- Generic Tech NG Starts  ---------------	

	function getCustomTechInput(techObj, objDef, func){  // NOT implemented Well
		if(mtgv.mtpp.cTech){   // Custom Tech ....
			if(jsu.isNull( techObj.p1)){
				techObj.p1 = objDef.p1;
			}
			return SP_3 + getInputTxtParam( techObj.id+'p1' , 3, techObj.p1, func , id)	;
		}
		return "";
	}





	function getCrossFreqInput(techObj, objDef, func){

		if(mtgv.mtpp.crossFreq){ // Cross Freq....
			var ticks = csu.gct(techObj , 'techTick');
			return  htmlU.getSpan(' On ' , 'grey' , 10) + 	getDropDown(ticks, techObj.id+'techTick', null,func, techObj.id, techObj.techTick) 
			+ htmlU.getSpan(' Tick ' , 'grey' , 10)
		}

		return "";
	}

	function getStandardOps(techObj, objDef, func){  //ABB /CO / Trend ....
		var id = techObj.id;
		var html = '';
		if( jsu.containsString([CS_ABOVE , CS_BELOW  ,CS_BETWEEN  ] , techObj.ops )  ){
			html+= SP_3 + getInputTxtParam( id+'v1' , 3, techObj.v1, func , id)	;


			if( techObj.ops ==  CS_BETWEEN){
				html+= SP_3 + " and ";
				html+= SP_3 + getInputTxtParam( id+'v2' , 3, techObj.v2, func , id)	;	
			}

			html+= SP_3  + ' for min ' + getInputTxtParam( id+'v3' , 2, techObj.v3, func , id)	 
				+ htmlU.getSpan('(<b>Optional</b> 0 for latest, Range 0-9)' , 'grey', 8) + " Ticks" ;			
		}else if( jsu.containsString([CS_CO_ABV , CS_CO_BLW ] , techObj.ops)){

			// if(jsu.isNull())
			html+= SP_3 + getInputTxtParam( id+'v1' , 3, techObj.v1, func , id)	 +", ";
			html+=  '# ' + getInputTxtParam( id+'v2' , 3, techObj.v2, func , id)	;

			html+= SP_3 +htmlU.getSpan('Ticks Back' , 'grey', 10) + htmlU.getSpan('(<b>Optional</b> Empty =   latest or 0, Range 0-5) ' , 'grey', 8) 

		}else if( jsu.containsString([CS_CO_ABV_WITHIN , CS_CO_BLW_WITHIN ] , techObj.ops)){
			// if(jsu.isNull())
			html+= SP_3 + getInputTxtParam( id+'v1' , 3, techObj.v1, func , id)	 +",";

			html+= SP_3 + htmlU.getSpan('Within last '  ,'grey'  ,10) + getInputTxtParam( id+'v2' , 3, techObj.v2, func , id)	;

			html+= ' Ticks' + htmlU.getSpan('(0 for latest, Range 0-5) ' , 'grey', 8) 
		}else if( jsu.containsString([WITHIN , MORE_THAN ] , techObj.ops)){
			// if(jsu.isNull())
			html+= SP_3 +      getDropDown(PC_COMP_LOW, id+'tolPc', 'width:70px',func, id, techObj.tolPc)+" of " ;//

			html+= SP_3 +  getInputTxtParam( id+'v1' , 3, techObj.v1, func , id)	 +" Level";
			
		}else if( jsu.containsString([TRENDING_UP , TRENDING_DOWN ] , techObj.ops)){ // trending ...
			html+= SP_3 +  ' for '  + getInputTxtParam( id+'v1' , 3, techObj.v1, func , id) +' Ticks ' +htmlU.getSpan('(Range 2-20) ' , 'grey', 8) 	;
			html+= SP_3 +   htmlU.getSpan('With Exception of ' , 'grey', 9)  + getInputTxtParam( id+'v2' , 3, techObj.v2, func , id) 
				+ htmlU.getSpan('(Optional Range 1-3) ' , 'grey', 9) 	
				 +' Ticks ';
		}
		return html;

	}

	function indisCoDay(techObj, objDef, func){

		var html=SP_3 +  '# ' + getInputTxtParam( techObj.id+'v1' , 3, techObj.v1, func , techObj.id)	;
		html+= SP_3 +htmlU.getSpan('Ticks Back' , 'grey', 10) + htmlU.getSpan('(<b>Optional</b> Empty =   latest or 0, Range 0-5) ' , 'grey', 8) 

		return html;
	}

	function indisCoWitin(techObj, objDef, func){

		var html= SP_3 + htmlU.getSpan('Within last '  ,'grey'  ,10) + getInputTxtParam( techObj.id+'v1' , 3, techObj.v1, func , techObj.id)	;

		html+= ' Ticks' + htmlU.getSpan('(0 for latest, Range 0-5) ' , 'grey', 8) 

		return html;
	}



	function techNgChgCmn(techObj){

		// techObj, objDef

		// var techObj= getObjFrmArr(mtgv.cs.screenerData.techNgComp, id);

		var id = techObj.id;

		var objDef =  jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi );

		// No Validation requied for ... OPS_GT_EQ,  OPS_EQ , OPS_LT_EQ 

		if( jsu.containsString([CS_ABOVE , CS_BELOW  ,CS_BETWEEN  ] , techObj.ops )  ){

			if(!inputNumberRange(id+'v1' , objDef.min  , objDef.max   ) ){
				// obosObj.goodData =false;
				// return;
			} 
			if( techObj.ops ==  CS_BETWEEN && !inputNumberRange(id+'v2' , objDef.min  , objDef.max   )) {
				// obosObj.goodData =false;
				// return;
			}
			var v3 = htmlU.getInputVal(id+'v3');

			if(jsu.isNotNull(v3)){
				if( !isIntegerInput(id+'v3') || !inputNumberRange (id+'v3', 0,10)  ){
					// obosObj.goodData =false;
					// return;
				}
			}
		}else if( jsu.containsString([CS_CO_ABV , CS_CO_BLW , CS_CO_ABV_WITHIN , CS_CO_BLW_WITHIN ] , techObj.ops)){
			if(!inputNumberRange(id+'v1' , objDef.min  , objDef.max   ) ){
				// obosObj.goodData =false;
				// return;
			} 
			var v2 = htmlU.getInputVal(id+'v2');
			if(jsu.isNotNull(v2)){
				if( !isIntegerInput(id+'v2') || !inputNumberRange (id+'v2', 0,5)  ){
					// obosObj.goodData =false;
					// return;
				}
			}
		}else if( jsu.containsString([WITHIN , MORE_THAN ] , techObj.ops)){
			if(!inputNumberRange(id+'v1' , objDef.min  , objDef.max   ) ){
				// obosObj.goodData =false;
				// return;
			} 


		}else if( jsu.containsString([TRENDING_UP , TRENDING_DOWN ] , techObj.ops)){ // trending ...
			if( !isIntegerInput(id+'v1') || !inputNumberRange (id+'v1', 2,20)  ){
					// obosObj.goodData =false;
					// return;
			}
			var v2 = htmlU.getInputVal(id+'v2');
			if(jsu.isNotNull(v2)){
				if( !isIntegerInput(id+'v2') || !inputNumberRange (id+'v2', 1,4)  ){
					// obosObj.goodData =false;
					// return;
				}
			}
		}
	}

	function techNgMultiLineChg(techObj, addiOption){
		techNgChgCmn(techObj);
		var id = techObj.id;
		if( jsu.containsString(addiOption , techObj.ops )  ){
			if(jsu.isNotNull(htmlU.getInputVal(id+'v1'))){
				if( !isIntegerInput(id+'v1') || !inputNumberRange (id+'v1', 0,5)  ){
					// obosObj.goodData =false;
					// return;
				}
			}
		}
	}

	



	function techNgChg(id){

		// NOTE for ICHI there is a separate function


		var ops = $('#'+id+'ops').val();

		var techObj= getObjFrmArr(mtgv.cs.screenerData.techNgComp, id);

		var curOps = techObj.ops;


		// ICHI moku requires drop down change if base change

		if(techObj.subType == ICHIMOKU){
			imccs.sidd(techObj)
		}else{

/*
			csu.setProp(mtgv.cs.screenerData.techNgComp, ['ops','p1', 'v1', 'v2','v3' ,'v4' , 'tolPc' ,'techTick', 'fieldType', 'field',
				'p1'  ,'p2','p3', 'maField' , 'maType' , 'priceField' , 'shift', 'shiftType' , 'showCustSet', 'f1', 'f2', 'f3',
				'srl'
				],techObj.id);
*/
			csu.setProp(mtgv.cs.screenerData.techNgComp,   CS_INDI_PROPS, techObj.id);
		}




		if( ops!=null && ops !== curOps &&  curOps!=null){
			techObj.v1= null; techObj.v2= null;  techObj.v3= null; techObj.v4= null; techObj.srl= null; 
		}


		var td = getTechNgHtmlTds( techObj);

		htmlU.addMsgToDiv( techObj.id+'Td2Div', true, td);




		if(techObj.subType == 'obos' || techObj.subType ==  'sto'  || techObj.subType ==  'stoRsi'){

			tobos.goc(techObj);

		// }else 		if( techObj.subType == CMF || techObj.subType ==  ROC || techObj.subType ==  ATR    ){

		}else if(jsu.containsString([CMF, ATR, ROC, STD_DEV], techObj.subType)){		

			// obosChg(techObj);
			// techNgChgCmn(techObj);
			tibsl.goc(techObj)

		}else if ( jsu.containsString( ['macd' , ADX ,'AroonIndi' , RVI , AWESOME_OSC ] ,  techObj.subType ) ) { //} ==  'macd'){
			// techNgMultiLineChg(techObj , jsu.getListToIdArr(MACD_ADDI_OPS));
			tindis.gic(techObj)
		} else if(techObj.subType == ICHIMOKU){

			imccs.ic(techObj);
		}

		tband.tnbc(techObj);  // Bands....


		csu.setProp(mtgv.cs.screenerData.techNgComp, ['ops','p1', 'v1', 'v2','v3' , 'tolPc' ,'techTick' , 'fieldType'],id);


		csu.dsf();


		showHideCustSetting(id);

	}

	
	// -------------------- TEch NG Ends ---------------------

	// ---------------------- validate  -----------------------------------


	function getNumericValue(val){
		// if(val ===0 || val =='0') return 0;
		// if(jsu.isNull(val)) return null;
		// if(isNumber(val)) return Number(val);

		// else return val; 

		return jsu.getNumericValue(val);
	}

	function validateNgCmn(techObj, validResults, objDef , fieldName){

		

			var text = '' ;

			var goodData = true;


			text+= fieldName ;

			var opsObj = jsu.getObjFrmArr( mtgv.mtpp.TECH_OPS ,  techObj.ops);

			

			var v1 = getNumericValue(techObj.v1 );
			var v2 = getNumericValue(techObj.v2 );
			var v3 = getNumericValue(techObj.v3 );


			if( jsu.containsString([CS_ABOVE , CS_BELOW  ,CS_BETWEEN  ] , techObj.ops )  ){

				text+= ' ' + opsObj.label + ' ' +v1;


				if(  !jsu.isNumber(v1) || v1 == null ||   v1 < objDef.min || v1> objDef.max   ) {
					goodData =false;
				} else{

				}

				if( techObj.ops ==  CS_BETWEEN ){


					if( !jsu.isNumber(v2) ||   v2 ==null ||  v2 < objDef.min || v2> objDef.max  ) {
						goodData =false;
					}else{
						text += " and " +v2;
					}
				}
				if(v3 !=null){
					if( !jsu.isInteger(v3) || (v3 < 0 || v3> 10  ) ){
						goodData =false;
					}else{
						text += ' for minimum ' + v3 + " Ticks";
					}
				}
			}else if( jsu.containsString([CS_CO_ABV , CS_CO_BLW , CS_CO_ABV_WITHIN , CS_CO_BLW_WITHIN ] , techObj.ops)){
				if( !jsu.isNumber(v1) ||  v1 ==null || v1 < objDef.min || v1> objDef.max   ) {
					goodData =false;
				} 
				text+= ' ' + opsObj.label + ' ' +v1 ;

				if(v2 !=null){
					if( !jsu.isInteger(v2) || (v2 < 0 || v2> 5  ) ){
						goodData =false;
					}else{
						if(v2 ==0)  {
							text+= ' in latest tick' ;
						}else{
							if( jsu.containsString([CS_CO_ABV , CS_CO_BLW ], techObj.ops )){
								text+= ' '+ v2+' tick back' ;
							}else{
								text+= ' within last '+ (v2 +1)+ ' ticks' ;
							}

							// text+= ' in latest tick' ;
						}
					}
				}else{
					text+= ' in latest tick' ;
				}

			}else if( jsu.containsString([WITHIN , MORE_THAN ] , techObj.ops)){
				if(!jsu.isNumber(v1) ||  v1== null ||  v1 < objDef.min || v1> objDef.max   ) {
					goodData =false;
				}else{
					var tolPc =  getObjFrmArr(PC_COMP_LOW , techObj.tolPc) ; 
					text+= ' ' + opsObj.label + ' '  + tolPc.label +" of "  +v1 ;
				}

			}else if( jsu.containsString([TRENDING_UP , TRENDING_DOWN ] , techObj.ops)){ // trending ...

				text+= ' ' + opsObj.label ;
				if(v1== null || !jsu.isInteger(v1) || v1 < 2 || v1> 20   ){
						goodData =false;
				}else{
					text+= ' for last '  +v1 + ' Ticks ';
				}

				if(v2 !=null){
					if( !jsu.isInteger(v2) || (v2 < 1 || v2> 4  ) ){
						goodData =false;
					}else{

						text+= ' with min tolerance of '  +v2  +' Ticks ';
					}
				}
			}

			return { goodData : goodData , text : text };
			// if(goodData){
			// 	return { goodData : goodData , text : text };
			// }else{
			// 	return { goodData : goodData , text : invalidText };
			// }
	}

	function validateNgMultiLine(techObj, validResults, objDef , defField,  fieldList,addiOption, daysCo , daysWitin ){

		var valObj = null;

		
		var fieldName = objDef.shortName;
		if(techObj.fieldType != defField){
			var fieldObj = 	jsu.getObjFrmArr(fieldList , techObj.fieldType);
			fieldName = fieldObj.label;
		}


		if(  jsu.containsString(jsu.getListToIdArr(addiOption) , techObj.ops )  ){
			var v1 = getNumericValue(techObj.v1 );
			
			var opsObj = jsu.getObjFrmArr( addiOption ,  techObj.ops);
			var text = opsObj.label;

			if(jsu.isNull(v1)){
				valObj = {goodData : true , text : text + ' in latest tick' };
			}else{
				

				// text+= ' ' + opsObj.label + ' ' +v1 ;
				if( !jsu.isInteger(v1) || (v1 < 0 || v1> 5  ) ){
					valObj = {goodData :false };
				}else{
					// var text ='';
					if(v1 ==0)  {
							text+= ' in latest tick' ;
					}else{
						if( jsu.containsString(daysCo, techObj.ops )){
							text+= ' '+ v1+' tick back' ;
						}else{
							text+= ' within last '+ (v1 +1)+ ' ticks' ;
						}
					}
				}
				valObj = {goodData : true , text : text };
			}
		}else{
			valObj = validateNgCmn(techObj, validResults, objDef, fieldName);
		}

		valObj.fieldName = fieldName;
		return valObj;
	}

	

	function validateTechNg(techObj, validResults){

		var valObj = null;

		var objDef =  jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi );
		var OPS_LIST = mtgv.mtpp.TECH_OPS ;


		if(techObj.subType == 'obos' || techObj.subType ==  'sto'  || techObj.subType ==  'stoRsi'){
			valObj = tobos.vobos(techObj, validResults);
		// }else 



		// if( techObj.subType ==CMF  || techObj.subType ==  ROC || techObj.subType ==  ATR     ){
		}else if(jsu.containsString([CMF, ATR, ROC, STD_DEV], techObj.subType)){		

			// valObj = validateNgCmn(techObj, validResults , objDef, objDef.shortName);
			valObj = tibsl.vti(techObj, validResults);

		
		}else if( jsu.containsString( ['macd', ADX ,'AroonIndi', RVI , AWESOME_OSC] ,   techObj.subType)  ){ //   techObj.subType == 'macd'  ){
		
			valObj = tindis.vt(techObj, validResults , objDef, objDef.shortName);

		}else if(techObj.subType == ICHIMOKU ){	
		
			valObj = imccs.vic(techObj, validResults , objDef )
		}else{
			// BANDS ...
			valObj = tband.vbc(techObj, validResults , objDef ); 	
		}


		


		techObj.goodData = valObj.goodData;
		// obosObj.text = text;	

		techObj.csType	 = TI_CS;

		var selParam = 'techNgComp' + ':'+techObj.id; // Vol Compare
	

		if(valObj.goodData){
			csh.cdt(techObj,valObj.text, validResults, selParam, true);
		}else{
			// obosObj.text = invalidText

			var fieldName = (valObj.fieldName == null ? objDef.shortName : valObj.fieldName);

			var opsObj = jsu.getObjFrmArr( OPS_LIST ,  techObj.ops);
			var invalidText = 'Invalid value for ' + fieldName +' Filter  ' ;
			if(jsu.isNotNull(opsObj)){
				invalidText += opsObj.label;
			}

			csh.cdt(techObj, invalidText , validResults, selParam, false);
		}
	}


	function validateTech(validResults){

		var scrData = mtgv.cs.screenerData;

		for ( var i=0;i< scrData.techNgComp.length ;i++){

			var obj = scrData.techNgComp[i];

			// if(obj.subType == 'obos'){

				validateTechNg(obj, validResults);
			// }
		}
		diybi.vf(validResults);

		ichiOld.valiIchi(validResults);

/*
		for ( var i=0;i< scrData.techIchiComp.length ;i++){
			var obj = scrData.techIchiComp[i];
			obj.csType = TI_CS;
			var ichi = getObjFrmArr( LIST_ICHI,  obj.ichiFilters); 
			
			var text = 'Ichimoku Cloud' + ichi.label  ;
			// validResults.validFields+= getSpan(text, 'green', CS_SEL_FONT_SIZE) + '<br/>';
			// validResults.validFieldCount++;

			var selParam = obj.type + ':'+obj.id; 
			csh.cdt(obj,text, validResults, selParam, true);
		}

*/

	}


	function addCustSetCheckBox(id){

		var html=''
		if(mtgv.mtpp.crossFreq){

				var checked  = isChecked(id+'SetCB') ? 'checked' : '';

				// html+= " | "  

				html += BREAK_LINE + htmlU.getCheckboxP(id+'SetCB', 'cst.shCs'  , checked, id ) +SP_2  + htmlU.getPlainGlaf('fas fa-tools' , 'black', 16  ) +' Customize' ;
			}

		return html;	
	}


	function showHideCustSetting(id){

		var checked  = isChecked(id+'SetCB') 

		var divId =id+'CustSetDiv';
		if(checked){
			htmlU.divShow(divId);
		}else{
			htmlU.divHide(divId);
		}
	}


	function setDefValIfNull(settingDef){

		
		if(!mtgv.mtpp.crossFreq){
			return;
			// techNgComp
		}

		var techNgComp = settingDef.techNgComp;

		if(techNgComp == null || techNgComp.length==0){
			return;
		}

		for(var i=0;i< techNgComp.length;i++){
			var setting = techNgComp[i];
			if(jsu.containsString(BOLLINGER , KELTNER, SUPER_TREND, PSAR), setting.indi ){

				mcval.sinaa(setting, null); // backward compatible ... old report without custom settings

				// var fields = ['p1','p2','p3', 'p4', 'p5' ,'shift' , ]


				// if(setting.indi == BOLLINGER){ mcval.sina('p1'); mcval.sina('p2');}
				// if(setting.indi == KELTNER){ mcval.sina(p1); mcval.sina(p2); mcval.sina('shift'); }
				

			}
		}
	}


	// INDI MACO


	function getMacoOption(indi, label){

		var options = [];

		for(var i=0; i<COMMON_MACO_OPS.length;i++ ){
			var obj = COMMON_MACO_OPS[i];
			options.push(  { id: obj.id , label : label +' ' + obj.label   });
		}
		return options;
	}


	function getMacoTd(techObj, objDef, func, lean){
		
		var id = techObj.id;
		var html = '';

		// if(!mtgv.mtpp.crossFreq){ return html }

		let maTypes = mtgv.mtpp.MA_TYPE;

		if(lean){

			let LEAN_MA = MA_TYPE_BASIC.slice();
			LEAN_MA.push({id: 'wma', label: "WMA"});
			maTypes = LEAN_MA;
		}


		html+= SP_3 + getDropDown( maTypes  , id+'maType', null,func, id, techObj.maType);
		
		if(jsu.isNull( techObj.v1)){
			techObj.v1 = 20;
		}
		if(jsu.isNull( techObj.maType)){
			techObj.maType = 'sma';
		}

		html+= SP_3 + getInputTxtParam( id+'v1' , 3, techObj.v1, func , id)	;   
		html+= SP_3 + htmlU.getSpan('(Supported value 2 to 100) ' , 'grey', 8) 

		return html;
	}


	function macoOptionChange(techObj){
		// if( jsu.containsString([ BULL_MACO ,  BEAR_MACO ,TECH_ABV_MA , TECH_BLW_MA  ] , techObj.ops )  ){
		if( jsu.arrayContainsId(COMMON_MACO_OPS , techObj.ops )  ){


			if( !isIntegerInput(id+'v1') || !inputNumberRange (id+'v1', 2,20)  ){
			}  // only ma --- v1 ...

		}
	}

	// Price Indi ratio 

	function getPriceIndiRatioTd(techObj, objDef, func){
		
		var id = techObj.id;
		var html = '';

		// if(!mtgv.mtpp.crossFreq){ return html }


		html+= SP_3 + getDropDown(PRICE_RAT_OPS, id+'ops2', null,func, id, techObj.ops2);
		
		// if(jsu.isNull( techObj.v1)){
		// 	techObj.v1 = 5;
		// }

		html+= SP_3 + getInputTxtParam( id+'v1' , 3, techObj.v1, func , id)	;   

		if(jsu.containsString( [CS_BETWEEN],   techObj.ops2 )) {
			html+= ' and ';
			html+=  getInputTxtParam( id+'v2' , 3, techObj.v2, func , id)	;
		}

		// gcoh


		return html;
	}

	function priceIndiRatioChg(techObj){   //pirc
		if( jsu.arrayContainsId(PRICE_RAT_OPS , techObj.ops )  ){

			if( !isPositiveNumInput(id+'v1')   ){
			}  // only ma --- v1 ...
			
			if(jsu.containsString( [CS_BETWEEN],   techObj.ops2 )) {
				if( !isPositiveNumInput(id+'v2')) {}
			}


		}
	}



	// Swing Rejection  

	function getSwingRejectionOption(indi, label){
/*
		var options = [];

		for(var i=0; i<COMMON_SR_OPS.length;i++ ){
			var obj = COMMON_SR_OPS[i];
			options.push(  { id: obj.id , label : label +' ' + obj.label   });
		}
		return options;
*/
		var srOptions =  addMoreOption(indi, label, COMMON_SR_OPS);

		var doubTopOptions =  addMoreOption(indi, label, INDI_DOUBLE_TOP_BOT);


		return jsu.arrayAddAll(srOptions,  doubTopOptions, true);
	}


	function addMoreOption(indi, label, moreOptions){

		var options = [];

		for(var i=0; i<moreOptions.length;i++ ){
			var obj = moreOptions[i];
			options.push(  { id: obj.id , label : label +' ' + obj.label   });
		}
		return options;
	}





	function getCrossTickChange(techObj ){

		if(!mtgv.mtpp.crossFreq){ return; }

		var id = techObj.id;

		var objDef =  jsu.getObjFrmArr( ALL_INDIS_MAP, techObj.indi );

		var FIELDS = objDef.fields;

		if(FIELDS !=null){

			var FIELDS_TO_VAL = jsu.getArrayKeys(FIELDS);

			mcval.vstf(techObj,  id,  null, null, null); // other  params non Man Field

			if(  mcval.avm(techObj, FIELDS , FIELDS_TO_VAL)){
				techObj.custom = false;

				// if( techObj.ops ==  BULL_MACO  ||  techObj.ops ==  BEAR_MACO) { 
				if( jsu.arrayContainsId(COMMON_MACO_OPS , techObj.ops )  ){
						techObj.custom = true;
				}

			}else{
				techObj.custom = true;
			}
		}
	}



	function getCustScrFilter(filer, defFilter){
		// var filer = [];
		
		// filer.push({  id :  "ppComp" , label : 'Pivot Point'    , tab : PP_CS, 
		// 	type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addPP' , params:  'pp' } , subDef :pivot_fields }) ;  //   JavaScript:cscmn.atn('price','priceCs');

		for(var i=0;i< ALL_INDIS_MAP.length ;i++){
			var thisIndi = ALL_INDIS_MAP[i];

			if(!thisIndi.scr){
				continue;
			}

			var secParam =thisIndi.id;

			if(thisIndi.techType  == 'Obos'){

				if( jsu.containsString([STO_FAST, STO_SLOW] , thisIndi.id )){
					secParam ='sto'
				}else if( jsu.containsString([STO_RSI, STO_RSI_SLOW] , thisIndi.id )){
					secParam ='stoRsi'
				}else{
					secParam ='obos'
				}
				
			}else if (thisIndi.id  == BOLLINGER || thisIndi.id  == KELTNER ){
				secParam ='price'
			}else if (thisIndi.id  == MACD ){
				secParam ='macd'
			}else if (thisIndi.id  == AROON ){
				secParam ='AroonIndi'
			}

			let obj = {  id :  "techNgComp" , label : thisIndi.label, slabel : thisIndi.shortName    , tab : TI_CS, 
						type : 'btn'  , filtDef : {obj:thisObject, fnc: 'atn' , params:  thisIndi.id  + PARAM_DELIM +secParam} }

			filer.push(obj) ; 

			if(jsu.containsString([BOLLINGER , RSI_SMOOTH, MACD, SUPER_TREND], thisIndi.id)){
				defFilter.push(obj);
			}

		}

		filer.push({  id :  "techNgComp" , label : 'Bollinger Band Squeeze', tab : TI_CS, 
						type : 'btn'  , filtDef : {obj:thisObject, fnc: 'atn' , params:  BOLLINGER  + PARAM_DELIM +'squeeze'} }) ; 

		return filer ;
	}

	function paintFilterRow(type, subType) {
		// { html: html, id: id }

		mtgv.cs.editActive = [];
		let newFilterRow = addNewFilter(type, subType);

		let filterTable = $("#" + CS_FILTERS_TABLE);
		
		filterTable.append(newFilterRow.html);

		mtgv.cs.editActive.push(newFilterRow); 
		
		addFilterChange(type, subType, newFilterRow["id"]);

		

	}



	return {


		// New Starts 

		gar : getAllRows,

		gfr : getFormRow,

		anf : addNewFilter,

		afc : addFilterChange,

		pfr : paintFilterRow,
		// New Ends



		tht : getTiHtml,
		gso : getStandardOps,
		gml : getTMultiLineTd,


		// addObos : addObos,
		// obosChg : obosChg,
		atn : addTechNg,
		tnc :  techNgChg ,
		tcc : techNgChgCmn,
		tmlc : techNgMultiLineChg,

		// addTech : addTech,
		// tecChg : tecChg,
		// tecCoChg : tecCoChg,
		// ichiChg : ichiChg,

		vt : validateTech,

		vnc : validateNgCmn,
		vml : validateNgMultiLine,


		shCs : showHideCustSetting,
		acscb : addCustSetCheckBox,
		sdvif : setDefValIfNull, 

		// MACO 
		gmo : getMacoOption,
		gmtd : getMacoTd,
		moc : macoOptionChange,

		// price indi Ratio
		pir : getPriceIndiRatioTd,
		pirc: priceIndiRatioChg,

		// Swing Rej
		gsr : getSwingRejectionOption,
		amo : addMoreOption,


		gctc : getCrossTickChange,

		gcsf : getCustScrFilter




	}

})(); // module 	

