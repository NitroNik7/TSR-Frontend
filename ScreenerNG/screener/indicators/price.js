
var gainCompaibility ='Use Gain Button At Bottom Instead. This is retained for Compatibility purpose and will be removed in coming months'

var PRICE_AEBB_MAP =  [{id: 'csPrice' , label: 'Price' , csType: PRICE_CS},
				// {id: 'csVol'		, label: 'Volume'},
				// {id: 'csPriceGain'	, label: 'Price Gain %', csType: PRICE_CS , info : "vs. Previous Day" , postInfo : gainCompaibility},
				// {id: 'csPriceGainTick'	, label: 'Price Gain %' , info : "vs. Previous Tick"},
				// {id: 'csPriceGainTick'	, label: 'Price Gain %' , info : "Previous Tick"},

				// {id: 'csPriceFall'	, label: 'Price Fall %' , csType: PRICE_CS, info : "vs. Previous Day" , postInfo : gainCompaibility},
				// {id: 'csPriceFallTick'	, label: 'Price Fall %' , info : "vs. Previous Tick"}

				];




var PRICE_MAP = pdef . priceMap;







var PRICE_GAIN_LOSS = 'priceGainLoss';
// var PRICE_RANGE_BREAK_OUT_DOWN = 'rangeBoDwn';
// var PRICE_GAP_RUN_AWAY = 'gapRunAway';
// var PRICE_GAP_FILL = 'gapFill';

// var PRICE_TRENDING_CANDLE  = 'trendingCandleBoDwn';
	
// var OPEN_RANGE_NG = 'orNg';  -- Defined in CSObj



var csp =  (function () {			


	


	var thisObject = 'csp';

	var htmlU = mintHtmlUtil;
	// var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;


	var PRICE_LABEL_WIDTH =220;


	var PRICE_BREAK_OUT = [CS_BREAKOUT , CS_BREAKDOWN ,
			CS_BREAKOUT_TAK_SUP , CS_BREAKDOWN_TAK_RES	,
			// CS_BREAKOUT_SUS , CS_BREAKDOWN_SUS, 
			CS_BREAKOUT_FAKE , CS_BREAKDOWN_FAKE];


	var  BO_BD_RANGE = [
			{id : CS_LATEST , label : 'Latest' }   	 	, 
		 	{id : CS_PREV , label : 'Previous' }   	 	, 
		 	{id : WITHIN , label : 'Within' }   	 	, 
	];


	var PR_BO_DWN_LIST = [  SELECT_ONE ,
	 	{id : 'prBO' , label : 'Break Out' }   	 	, 
	 	{id : 'prBOIgBD' , label : 'Break Out Ignore Break Downs' }   	 	, 
	 	{id : 'prBOSus' , label : 'Break Out & Sustaining' }   	 	, 

	 	// {id : 'prBOAll' , label : 'Every Time Cross Above' }   	 	, 

 	
	 	{id : 'prBDwn' , label : 'Break Down' }  ,
	 	{id : 'prBDwnIgBo' , label : 'Break Down Ignore BreakOut' }  ,
	 	{id : 'prBDwnSus' , label : 'Break Down & Sustaining' }  ,

	 	// {id : 'prBDAll' , label : 'Every Time Cross Below' }   	 	, 
	];

	var PR_BO_DWN_NG_LIST = [  
	 	{id : 'prBO' , label : 'Break Out' }   	 	, 
	 	{id : 'prBDwn' , label : 'Break Down' }  ,
	 	{id : 'prInRange' , label : 'Within Range' }  ,
	];




	var GAP_UP_DWN_LIST = [   {id : 'gapUpRunAway' , label : 'Gap Up' }   , {id : 'gapDownRunAway' , label : 'Gap Down' }    ];


	var GAP_FILL_LIST = [ {id : 'gapUpFill' , label : 'Gap Up Fill' }   , {id : 'gapDownFill' , label : 'Gap Down Fill' } ,
			{id : 'gapUpFillPot' , label : 'Gap Up Fill Potential' }   , {id : 'gapDownFillPot' , label : 'Gap Down Fill Potential' } 
	   ];

	var TREND_CANDLE_LIST = [
		 {id : 'hhHl' , label : 'Higher High Higher Low' }  ,
		 {id : 'hhHlBD' , label : 'HH HL - Latest Low Below Prev Low' }  ,
		 {id : 'hhHlBDPot' , label : 'HH HL - Latest Near Previous Low' }  ,

		 {id : 'lhLl' , label : 'Lower High Lower Low' } ,
		 {id : 'lhLlBO' , label : 'LH LL - Latest High Above Prev High' } ,
		 {id : 'lhLlBOPot' , label : 'LH LL - Latest Near Prev High' } ,

	]   

	var CANDLE_RANGE = [
		
		{id: 'highLowRange' , label: 'High Low Range'},
		{id: 'bodyRange' , label: 'Candle Body Range'},
	];


	var RBR_ZONE_OPTS = [
					{ id: 'inZone', label :'Price Retraced in Zone' },
					{ id: 'nearZone', label :'Price Near Zone' },
					{ id: 'breachZone', label :'Zone Breached' },
	];


	var OR_NG_BO_OPTS =pdef.orNgBoOpt;

	var OR_NG_BD_OPTS = pdef.orNgBdOpt;

	var PREV_RANGE_BO_OPTS =pdef.prevRanBoOpt;

	var PREV_RANGE_BD_OPTS = pdef.prevRanBdOpt;

	// var PREV_RANGE_TICKS = pdef.prt();


	var GAP_NG_OPT = pdef.gapNgOpt;
	var GAP_UP_NG_OPT = pdef.gapUpNgOpt;
	var GAP_DOWN_NG_OPT = pdef.gapDownNgOpt;


	var RALL_BASE_COMBO  = pdef.rbcOpt;


	var  VWAP_OPT  =  pdef.vwopt    ;
	var  VWAP_OP_OPT  =  pdef.vwoopt    ;

	var VWAP_OP_BAND_OPT = pdef.vobo;
	var  VWAP_PERIOD  =  pdef.vwp    ;

	var VBAND_FIELDS = pdef.vbf;

	var VWAP_ANCHOR = pdef.vwa;

	var VWAP_PRICE_FIELDS = pdef.VWAP_PRICE_FIELDS;

	let VWAP_OL = pdef.VWAP_OL;

	var SHORT_PERIODS = pdef.sp;

	var orNgChecked ;
	var prevRangChecked;

	var gapNgChecked ;


	var orOldChecked ;
	var trendCandleChecked ;

	var gapRunChecked ;
	var gapFillChecked ;


	function init(){

		orNgChecked = csu.ifc(mtgv.cs.screenerData[OPEN_RANGE_NG]);
		prevRangChecked = csu.ifc(mtgv.cs.screenerData[PREV_RANGE_BOBD]);

		gapNgChecked = csu.ifc(mtgv.cs.screenerData[GAPS_NG]);

		orOldChecked = csu.ifc(mtgv.cs.screenerData[OPEN_RANGE_OLD]);
		trendCandleChecked = csu.ifc(mtgv.cs.screenerData[TREND_CANDLE_BOBD]);

		gapRunChecked = csu.ifc(mtgv.cs.screenerData[GAP_RUNAWAY]);
		gapFillChecked = csu.ifc(mtgv.cs.screenerData[GAP_FILL]);
	}


		/**********************************************************************************************
								PRICE HTML
		**********************************************************************************************/

	function getPriceHtml(id){

		var scrData = mtgv.cs.screenerData;

		init();

		var html ='<div id="'+id+'Div">';
		// style="min-width:1000px;" 
		html+= '<table id="priceCtrlTab" '+TAB_INDI_STYLE+'    width="100%"  >';

		
		html+= getAllRows()

		html+= '</table>'; // BS TAB START...		

		
		html+= getControls();

		// html+=  SP_3 +getButtonP( 'Gain/Loss' , 'cscmn.ag', 'price'+PARAM_DELIM+PRICE_CS);

		
		if(!isMobile()){
			// html += pdef.help();	
		}
		

		html +='</div>'; //pvCsDiv	

		// console.log(html);
		return html;
	}
	

	function getAllRows(){

		var scrData = mtgv.cs.screenerData;

		let html ='';

		if(mtgv.cs.ng){

			let csPriceObj = jsu.getObjFrmArr(mtgv.cs.screenerData.aebb, "csPrice");

			if(csPriceObj.hasData){
				html+= csh.aebbStrut('csPrice', null);	
			}

			let priceGainLossObj = mtgv.cs.screenerData.priceGainLoss;

			if(  priceGainLossObj.ops !=null &&  priceGainLossObj.ops != 'na'){
				html+= getPriceGainLossRow();	
			}
			
			let trendCanObj =  scrData[TREND_CANDLE_BOBD];

			if( jsu.isNotNull( trendCanObj) && trendCanObj.enabled){
				html+= getTrendingCandleRow();
			}

			if( jsu.isNotNull(scrData[OPEN_RANGE_NG]) && scrData[OPEN_RANGE_NG].enabled){
				html+= openRangeStratRow();
			}
			if( jsu.isNotNull(scrData[PREV_RANGE_BOBD])   &&  scrData[PREV_RANGE_BOBD].enabled){
				html+= prevRangeStartRow();
			}
			if( jsu.isNotNull(scrData[GAPS_NG])  &&  scrData[GAPS_NG].enabled  ){
				html+= gapStratRow();
			}
			if( jsu.isNotNull(scrData[OPEN_RANGE_OLD])  &&  scrData[OPEN_RANGE_OLD].enabled){
				html+= getRangeBoDwnRowOld();
			}

			if( jsu.isNotNull(scrData[GAP_RUNAWAY])  &&  scrData[GAP_RUNAWAY].enabled){
				html+= gapRunAwayRow();
			}
			if( jsu.isNotNull(scrData[GAP_FILL])  &&  scrData[GAP_FILL].enabled){
				html+= gapRunAwayFillRow();
			}



		}else{

			for(var i=0;i< PRICE_AEBB_MAP.length ;i++) html+= csh.aebbStrut(PRICE_AEBB_MAP[i].id, PRICE_LABEL_WIDTH);

			html+=     '<tr>' +   createTd( createDiv('priceGainLossTd2Div', createTableData(PRICE_GAIN_LOSS) ) ) + '</tr>';

		}





		// if(mtgv.mtpp.crossFreq){
		html+= addproRows();

		for(var i=0;i< scrData.priceGain.length;i++){
			html+= cscmn.ggh(scrData.priceGain[i], 'price' ) ;
		}

		for(var i=0;i< scrData.dynpriceComp.length;i++){
			html+= cscmn.gch(scrData.dynpriceComp[i] , 'price');
			// html+= cscmn.getPriceCompHtml(scrData.priceComp[i]) ;
		}

		for(var i=0;i< scrData.dynSpTimepriceComp.length;i++){
			html+= cscmn.spch(scrData.dynSpTimepriceComp[i] , 'price');
			// html+= cscmn.getPriceCompHtml(scrData.priceComp[i]) ;
		}

		for(var i=0;i< scrData.dynAdvOhlcComp.length;i++){
			html+= cscmn.aoh(scrData.dynAdvOhlcComp[i] , 'price');
			// html+= cscmn.getPriceCompHtml(scrData.priceComp[i]) ;
		}




		for(var i=0;i< scrData.dynpriceTrendNg.length;i++){
			html+= cscmn.gth(scrData.dynpriceTrendNg[i] , 'price');
		}

		if(mtgv.mtpp.crossFreq){
			for(var i=0;i< scrData.priceBoBd.length;i++){
				html+= getBreakOutDownHtml(scrData.priceBoBd[i]);
			}
		}


		if(mtgv.mtpp.crossFreq){
			for(var i=0;i<  scrData[ CS_VWAP ].length;i++){
				html+= getVwapHtml(scrData[ CS_VWAP ][i]);
			}
		}


		// if(mtgv.mtpp.crossFreq){
			for(var i=0;i< scrData[ CS_TURNOVER ].length;i++){
				html+=   csfdc. gth(scrData[CS_TURNOVER][i]   , CS_TURNOVER);
			}
		// }

		


		if(mtgv.mtpp.crossFreq){
			for(var i=0;i< scrData.rallyBaseCom.length;i++){
				html+= getRbcHtml(scrData.rallyBaseCom[i]);
			}
		}

		return html;
	}


	function addproRows(){

		var html ='';

		if(mtgv.mtpp.crossFreq  && mtgv.mtpp.pr){

			// html+=     '<tr><td><b>Trending Candle</b></td> ' +   createTd( createDiv(PRICE_TRENDING_CANDLE+ 'Div', createTableData(PRICE_TRENDING_CANDLE) ) ) + '</tr>';
		
			if(trendCandleChecked){
				html+=     '<tr id="'+TREND_CANDLE_BOBD+'"  >' 
					+   createTd( createDiv('trendcandleTd2Div', getTrendCandleTd(TREND_CANDLE_BOBD) ) ) + '</tr>';
			}


			if(!jsu.isMigContext() && orOldChecked){
				// html+=     '<tr><td>Range Break Out/Down'+
				// '<p class="mb-1"></p>' + htmlU.getSpan('Retiring End Jun <b>Use Open Range Strategy Below</b>', 'orange', 8)
				// +'</td> ' 
				// 	+   createTd( createDiv('rangeBoDwnDiv', createTableData(PRICE_RANGE_BREAK_OUT_DOWN) ) ) + '</tr>';
				html+=     '<tr id="'+OPEN_RANGE_OLD+'"  > ' 
					+   createTd( createDiv('orOldTd2Div', getOpeningRangeOldTd(OPEN_RANGE_OLD) ) ) + '</tr>';
			}

			// html+=     '<tr><td><b>Gap Up/Down Run Away</b></td> ' +   createTd( createDiv( PRICE_GAP_RUN_AWAY + 'Div', createTableData(PRICE_GAP_RUN_AWAY) ) ) + '</tr>';

			// html+=     '<tr><td><b>Gap Fill / Potential</b></td> ' +   createTd( createDiv( PRICE_GAP_FILL + 'Div', createTableData(PRICE_GAP_FILL) ) ) + '</tr>';
		

			if(gapRunChecked){
				html+=     '<tr id="'+GAP_RUNAWAY+'"  >' 
					+   createTd( createDiv(GAP_RUNAWAY+ 'Td2Div', createGapRunAwayTd(GAP_RUNAWAY) ) ) + '</tr>';
			}

			if(gapFillChecked){
				html+=     '<tr id="'+GAP_FILL+'"  > ' 
					+   createTd( createDiv(GAP_FILL+ 'Td2Div', createGapFillTd(GAP_FILL) ) ) + '</tr>';
			}


			if(!jsu.isMigContext()  && orNgChecked){
				html+=     '<tr id="'+OPEN_RANGE_NG+'"  > ' 
					+   createTd( createDiv('orNgTd2Div', getOpeningRangeNgTd(OPEN_RANGE_NG) ) ) + '</tr>';
			}

			if(!jsu.isMigContext()  && prevRangChecked){
				html+=     '<tr id="'+PREV_RANGE_BOBD+'"  >' 
					+   createTd( createDiv(PREV_RANGE_BOBD +  'Td2Div', getPreviousRangeTd(PREV_RANGE_BOBD) ) ) + '</tr>';
			}

			if(!jsu.isMigContext()  && gapNgChecked){
				html+=     '<tr id="'+GAPS_NG+'"  >' 
					+   createTd( createDiv(GAPS_NG+ 'Td2Div', getGapNgTd(GAPS_NG) ) ) + '</tr>';
			}

		}

		return html;

	}


	function getFormRow(type, id, state){ 
		

		let obj = null;

		if(type=='csPrice'){
			obj = getObjFrmArr(mtgv.cs.screenerData.aebb, type);
		}else if(type== PRICE_GAIN_LOSS){

			obj = mtgv.cs.screenerData[PRICE_GAIN_LOSS];

		}else if(jsu.containsString([TREND_CANDLE_BOBD, OPEN_RANGE_NG, PREV_RANGE_BOBD,GAPS_NG, OPEN_RANGE_OLD, GAP_RUNAWAY, GAP_FILL ] , type)){
			obj = mtgv.cs.screenerData[type] ;
		}else {
			obj =   csu.gso(type, id);
		}

		if(jsu.isNotNull(state)){
			if(state == 'enable')  obj.disabled  = false;
			if(state == 'disable') obj.disabled  = true	;
		}else{
			 obj.disabled  = false;
		}


		if(type=='csPrice'){ // Tick Vol 
    		return csh.aebbStrut(type, null);;
		}else if(type== PRICE_GAIN_LOSS){	 // daily Vol
			
			return  getPriceGainLossRow();

		}else if(type == TREND_CANDLE_BOBD){			
			return getTrendingCandleRow()

		}else if(type == OPEN_RANGE_NG){
			return openRangeStratRow();		

		}else if(type == PREV_RANGE_BOBD){	
			return prevRangeStartRow();

		}else if(type == GAPS_NG){	
			return gapStratRow();

		}else if(type == OPEN_RANGE_OLD){	
			return getRangeBoDwnRowOld();

		}else if(type == GAP_RUNAWAY){	
			return gapRunAwayRow();

		}else if(type == GAP_FILL){	

			return gapRunAwayFillRow();

		}

		// let obj =   csu.gso(type, id)

		 if(type=='ac' || type == 'dynpriceComp'){
			return cscmn. gch(obj, 'price');

		}else if(type=='atn' || type =='dynpriceTrendNg'){ // OHLC TRENDING 
    	      return  cscmn.gth(obj, 'price'); 
		}else if(type == 'turnOver'){
			return csfdc.gth(obj,'turnOver');

	    }else if(type == CS_VWAP){    
	    	return  getVwapHtml(obj);

		}else if(type == 'priceBoBd'){    	
			return getBreakOutDownHtml(obj);

		}else if(type == 'dynSpTimepriceComp'){    
			return cscmn. spch(obj,'price' )

		}else if(type == 'dynAdvOhlcComp'){    
			return cscmn.aoh(obj)
		}else if(type == 'rallyBaseCom'){    		
			return getRbcHtml(obj);

		}

	}


	function getFormTd(type, id, state){ 
		

		let obj = null;

		if(type=='csPrice'){
			obj = getObjFrmArr(mtgv.cs.screenerData.aebb, type);
		
		}else if(type== PRICE_GAIN_LOSS){

			obj = mtgv.cs.screenerData[PRICE_GAIN_LOSS];
		}else if(jsu.containsString([TREND_CANDLE_BOBD, OPEN_RANGE_NG, PREV_RANGE_BOBD,GAPS_NG, OPEN_RANGE_OLD, GAP_RUNAWAY, GAP_FILL ] , type)){
			obj = mtgv.cs.screenerData[type] ;
		}else {
			obj =   csu.gso(type, id);
		}

		if(jsu.isNotNull(state)){
			if(state == 'enable')  obj.disabled  = false;
			if(state == 'disable') obj.disabled  = true	;
		}else{
			 obj.disabled  = false;
		}


		if(type=='csPrice'){ // Tick Vol 
    		return csh.aebbStruttd(obj, type, null);;
		}else if(type== PRICE_GAIN_LOSS){	 // daily Vol
			
			return  createTableData(PRICE_GAIN_LOSS)

		}else if(type == TREND_CANDLE_BOBD){			
			return getTrendCandleTd(TREND_CANDLE_BOBD) 
		}else if(type == OPEN_RANGE_NG){
			return getOpeningRangeNgTd(OPEN_RANGE_NG);

		}else if(type == PREV_RANGE_BOBD){	
			return getPreviousRangeTd(PREV_RANGE_BOBD) ;

		}else if(type == GAPS_NG){	
			return getGapNgTd(GAPS_NG) ;

		}else if(type == OPEN_RANGE_OLD){	
			return  getOpeningRangeOldTd(OPEN_RANGE_OLD) 

		}else if(type == GAP_RUNAWAY){	
			return createGapRunAwayTd(GAP_RUNAWAY)

		}else if(type == GAP_FILL){	

			return createGapFillTd(GAP_FILL);

		}

		// let obj =   csu.gso(type, id)

		 if(type=='ac' || type == 'dynpriceComp'){
			return cscmn. gchtd(obj, 'price');

		}else if(type=='atn' || type =='dynpriceTrendNg'){ // OHLC TRENDING 
    	      return  cscmn.gttd(obj, 'price'); 
		}else if(type == 'turnOver'){

			return csfdc.gttd(obj,'turnOver');

	    }else if(type == CS_VWAP){    
	    	return  getVwapTd(obj);

		}else if(type == 'priceBoBd'){    	
			return getBreakOutDownTD(obj);

		}else if(type == 'dynSpTimepriceComp'){    
			return cscmn. spchtd(obj,'price' )

		}else if(type == 'dynAdvOhlcComp'){    
			return cscmn.aohtd(obj)
		}else if(type == 'rallyBaseCom'){    		
			return getRbcTD(obj);

		}

	}


	function getControls(){


		let html =''

		html+= SP_3 +getButtonP('OHLC Compare' , 'cscmn.ac', 'price'+PARAM_DELIM+PRICE_CS);

		html+=  SP_3 +getButtonP( 'OHLC Trending' , 'cscmn.atn', 'price'+PARAM_DELIM+PRICE_CS);

		// if(mtgv.mtpp.int  ){
			html+=  SP_3 +getButtonP( 'Turnover' , 'csfdc.an',  CS_TURNOVER);
		// }

		html+= addProCtrls();



		return html;
	}


	function addProCtrls(){

		var html ='';





		if(mtgv.mtpp.crossFreq  && mtgv.mtpp.pr   ){

			if(!jsu.isMigContext() && mtgv.mtpp.rt){ // for real time ...
				html+=  SP_3 +getButtonP( 'A / MA / PP - VWAP' , 'csp.apf', CS_VWAP);	
			}

			html+=  SP_3 +getButtonP( 'Break Out / Down' , 'csp.apf', 'priceBoBd');

			html+= BR_2;
			// if(mtgv.mtpp.int  ){
			html+= SP_3 +getButtonP('OHLC Specific Time Compare' , 'csp.apf', 'dynSpTimepriceComp');
			
			html+= SP_3 +getButtonP('OHLCV Advanced' , 'csp.apf', 'dynAdvOhlcComp');
			
			html+=  SP_3 +getButtonP( 'Demand & Supply Zones ' , 'csp.apf', 'rallyBaseCom');
			
			if( mtgv.mtpp.int ){
				
			}

			// }

			html+= BR_2;

			var trendCandleChechedLab = trendCandleChecked ? 'checked' : ''

			html+=  SP_3  +getCheckboxP( TREND_CANDLE_BOBD+ 'CB' , 'csp.tcc', trendCandleChechedLab, null) + ' Trending Candles ';

			if(!jsu.isMigContext() ){  // Only Real Time

				var orngChechedLab = orNgChecked ? 'checked' : ''

				html+=  SP_3 + ' | ' +getCheckboxP( OPEN_RANGE_NG  + 'CB', 'csp.ornc', orngChechedLab, null) + ' Open Range Strategies ';

			}

			var prngChechedLab = prevRangChecked ? 'checked' : ''

			html+=  SP_3 + ' | ' +getCheckboxP( PREV_RANGE_BOBD + 'CB' , 'csp.prch', prngChechedLab, null) + ' Previous Range Strategies ';


			var gapNgChechedLab = gapNgChecked ? 'checked' : ''

			html+=  SP_3 + ' | ' +getCheckboxP( GAPS_NG + 'CB' , 'csp.gnc', gapNgChechedLab, null) + ' Gap Strategies ';
			
			html+= BR_2;

			// if(!jsu.isMigContext() ){ 
				

				// html+= htmlU.getSpan('when you want to compare Tick On Specific Time. Beta Mode ', 'grey' , 10);
				// html+= BR_2;
			// }



			if(!jsu.isMigContext() ){ 

				var oldChecked = (orOldChecked) ? 'checked' :''

				html+=  SP_3 + getCheckboxP( OPEN_RANGE_OLD + 'CB' , 'csp.oroc', oldChecked, null) + ' Open Range Breakout / Down(old) ';

			}

			var gapRunChechedLab = gapRunChecked ? 'checked' : ''

			html+=  SP_3 + ' | ' +getCheckboxP( GAP_RUNAWAY + 'CB', 'csp.grc', gapRunChechedLab, null) + 'Gap Up/Down Run Away (old) ';

			var gapFillCheckedLab = gapFillChecked ? 'checked' : ''

			html+=  SP_3 + ' | ' +getCheckboxP( GAP_FILL + 'CB', 'csp.gfc', gapFillCheckedLab, null) + ' Gap Fill / Potential	 (old)';

		}else{

			html+= TSR_HR;
			html+= '<br/>';
			html+= SP_3 + htmlU.gdb('OHLC Specific Time', AVAIL_HIGH_PLAN);
			html+= SP_3 + htmlU.gdb('OHLC Advance / Math', AVAIL_HIGH_PLAN);

			
			html+= SP_3 + htmlU.gdb('Demand & Supply Zone', AVAIL_HIGH_PLAN);

			html+= '<br/>';
			html+= SP_3 + htmlU.gdb('Open Break Out', AVAIL_HIGH_PLAN);
			html+= SP_3 + htmlU.gdb('Trending Candle', AVAIL_HIGH_PLAN);
			html+= SP_3 + htmlU.gdb('Range Break Out/Down', AVAIL_HIGH_PLAN);
			html+= SP_3 + htmlU.gdb('Previous Range', AVAIL_HIGH_PLAN);

			html+= SP_3 + htmlU.gdb('Gap Up/Down Run Away', AVAIL_HIGH_PLAN);
			html+= SP_3 + htmlU.gdb('Gap Fill / Potential', AVAIL_HIGH_PLAN);

			html+= '<br/>';
			html+= '<br/>';

		}

		return html;
	}



	function addPriceFilter(type, subType){ //MA_PRICE_OPTIONS

		let json = addNewFilter(type, subType);

		$('#priceCtrlTab').append(json.html );

		addFilterChange(type , json.id);

	}


	function addNewFilter(type, subType){ // subtype is required for Search

		var scrData = mtgv.cs.screenerData;
		var id =  '';

		let html =''

		if(type=='csPrice'){ // Tick Vol 
			html = csh.aebbStrut('csPrice', null);;
			id = type;
    	
		}else if(type==PRICE_GAIN_LOSS){	 // daily Vol
			
			html= getPriceGainLossRow();
			
			id = mtgv.cs. screenerData[PRICE_GAIN_LOSS].id
		}else if(type=='ac'){

			return cscmn. acr('price', 'PRICE_CS');  // OHLC Compare

		}else if(type=='atn'){ // OHLC TRENDING 
    	      
			return cscmn.gtnr('price', PRICE_CS);

		}else if(type == 'turnOver'){
		
	        return csfdc.anr(type) 

	    }else if(type == CS_VWAP){    

	    	var obj = mtgv.cs.screenerData[CS_VWAP];
			id =  myTsrScreener.getNextId( CS_VWAP +'Id');

			var ticks = csu.gct({} , null);

			var obj = {
				id : id, type : VWAP_OPT[0].id,   ops : VWAP_OP_BAND_OPT[0].id,  
				tick1: SHORT_PERIODS[0].id, field1 : CLOSE , goodData : true 
			};

			if(jsu.isNotNull(subType )){
				obj.type = subType;
			}

			mtgv.cs.screenerData[CS_VWAP].push(obj); 

			html = getVwapHtml(obj);

		}else if(type == 'priceBoBd'){    	

			var priceBoBd = mtgv.cs.screenerData.priceBoBd;
			id =  myTsrScreener.getNextId( 'priceBoBdId');

			var ticks = csu.gct({} , null);

			var boBdObj = {
				id : id, type : PRICE_BREAK_OUT[0].id,  period : 40, toPeriod : 60,   tick1: ticks[0].id,
				field1 : CLOSE , gap : 20 , tick2: ticks[0].id, field2 : CLOSE , pc: 10 ,
				period3 : BO_BD_RANGE[0].id , period4: null , goodData : true , gen:'alpha'
			};

			mtgv.cs.screenerData.priceBoBd.push(boBdObj); 

			html = getBreakOutDownHtml(boBdObj);

		}else if(type == 'dynSpTimepriceComp'){    
			return cscmn.astcn('price', PRICE_CS)

		}else if(type == 'dynAdvOhlcComp'){    
			return cscmn. aaon('price', PRICE_CS)

		}else if(type == 'rallyBaseCom'  || type =='rbr'){    		

			var rallyBaseCom = mtgv.cs.screenerData.rallyBaseCom;
			id =  myTsrScreener.getNextId( 'rallyBaseComId');

			var ticks = csu.gct({} , null);

			var obj = {
				id : id, type : RALL_BASE_COMBO[0].id, minBoring : 1, maxBoring : 4,
				minLegIn : 2 ,minLegOut : 2.5 , goodData : true , 
				tick1: ticks[0].id
			};
			if(jsu.isNotNull(subType )){
				obj.type = subType;
			}


			// if(jsu.isNotNull(type)){
			// 	obj.type  = type;
			// }

			mtgv.cs.screenerData.rallyBaseCom.push(obj); 

			html =  getRbcHtml(obj);

		}else if(type == TREND_CANDLE_BOBD){		

			id = 	TREND_CANDLE_BOBD;
			html = getTrendingCandleRow()

		}else if(type == OPEN_RANGE_NG){
			id = 	OPEN_RANGE_NG;
			html = openRangeStratRow();		

		}else if(type == PREV_RANGE_BOBD){	
			id = PREV_RANGE_BOBD	 
			html = prevRangeStartRow();

		}else if(type == GAPS_NG){	
			id =GAPS_NG
			html = gapStratRow();

		}else if(type == OPEN_RANGE_OLD){	
			id =OPEN_RANGE_OLD
			html = getRangeBoDwnRowOld();

		}else if(type == GAP_RUNAWAY){	
			id =GAP_RUNAWAY
			html = gapRunAwayRow();

		}else if(type == GAP_FILL){	
			id =GAP_FILL
			html = gapRunAwayFillRow();
		}



		return { html : html , id : id};

	}


	function addFilterChange(type, id){ 

		if(type=='csPrice'){ // Tick Vol 
    		
    		html = csu.csAebbChg(type);;

		}else if(type== PRICE_GAIN_LOSS){	 // daily Vol
			
			priceChange();

		}else if(type=='ac'){
			cscmn. cc(id, 'price');

		}else if(type=='atn'){ // OHLC TRENDING 

    	      cscmn.tnc(  id , 'price');
		}else if(type == 'turnOver'){
			csfdc.ua(id)

	    }else if(type == CS_VWAP){    
	    	wapChg(id);

		}else if(type == 'priceBoBd'){    	
			
			brkOutDwnChg(id)
		}else if(type == 'dynSpTimepriceComp'){    
			cscmn.ccst(id, 'price')

		}else if(type == 'dynAdvOhlcComp'){    
			cscmn.ccao(id )

		}else if(type == 'rallyBaseCom'  || type =='rbr'){    		
			rbcChange(id);

		}else if(type == TREND_CANDLE_BOBD){
			trendingCandleChange();			

		}else if(type == OPEN_RANGE_NG){		
			openRangeNgChg();
		}else if(type == PREV_RANGE_BOBD){	
			previousRangeChange();
		}else if(type == GAPS_NG){		
			gapsNgChg();
		}else if(type == OPEN_RANGE_OLD){	
			openRangeOldChange();

		}else if(type == GAP_RUNAWAY){	
			gapRunawayChange();

		}else if(type == GAP_FILL){	
			gapFillChange();
		}

		csu.dsf(); // displaySelectedFields();
	}




	function addPriceFilters(type){ //MA_PRICE_OPTIONS

		if(!mtgv.cs.ng){
			if( type=='csPrice' ||   type ==PRICE_GAIN_LOSS){
				return;
			}
		}

		if(type == TREND_CANDLE_BOBD){
			// trendingCandleBoDwnCB
			$('#trendingCandleBoDwnCB').prop('checked', true);
			trendingCandleChange()
			return;
		}else if(type == OPEN_RANGE_NG){		
			// orNgCB
			$('#orNgCB').prop('checked', true);
			openRangeNgChg();
			return;
		}else if(type == PREV_RANGE_BOBD){	
			// prevRngBoBdCB
			$('#prevRngBoBdCB').prop('checked', true);
			previousRangeChange();
			return;
		}else if(type == GAPS_NG){		
			$('#gapNgCB').prop('checked', true);
			gapsNgChg();
			return;
		}


		let json = addNewFilter(type);

		$('#priceCtrlTab').append(json.html );

		addFilterChange(type , json.id);

	}



	function getPriceGainLossRow(){

		let html = createTableData(PRICE_GAIN_LOSS)

		return '<tr id="'+PRICE_GAIN_LOSS+'">' +createTd(createDiv( PRICE_GAIN_LOSS +'Td2Div' , html ))  + '</tr>';
	}


	function getTrendingCandleRow(){

		let html = getTrendCandleTd(TREND_CANDLE_BOBD) 

		return '<tr id="'+TREND_CANDLE_BOBD+'"  > ' 
					+   createTd( createDiv(TREND_CANDLE_BOBD+'Td2Div', html) ) + '</tr>';
	}


	function getRangeBoDwnRowOld(){

		let html =  getOpeningRangeOldTd(OPEN_RANGE_OLD) 

		return '<tr id="'+OPEN_RANGE_OLD+'"  > ' 
					+   createTd( createDiv(OPEN_RANGE_OLD+'Td2Div', html) ) + '</tr>';

	}

	function gapRunAwayRow(){

		let html = createGapRunAwayTd(GAP_RUNAWAY)

		return    '<tr id="'+GAP_RUNAWAY+'"  >' 
					+   createTd( createDiv(GAP_RUNAWAY+ 'Td2Div', html ) ) + '</tr>';
	}

	function gapRunAwayFillRow(){

		let html =  createGapFillTd(GAP_FILL);

		return '<tr id="'+GAP_FILL+'"  > ' 
					+   createTd( createDiv(GAP_FILL+ 'Td2Div', html ) ) + '</tr>';
	}

	function openRangeStratRow(){

		let html =    getOpeningRangeNgTd(OPEN_RANGE_NG);

		return '<tr id="'+OPEN_RANGE_NG+'"  > ' 
					+   createTd( createDiv(OPEN_RANGE_NG+'Td2Div', html ) ) + '</tr>'
	}

	function prevRangeStartRow(){

		let html =  getPreviousRangeTd(PREV_RANGE_BOBD) ;

		return '<tr id="'+PREV_RANGE_BOBD+'"  > ' 
					+   createTd( createDiv(PREV_RANGE_BOBD +  'Td2Div', html) ) + '</tr>';
	}

	function gapStratRow(){

		let html =  getGapNgTd(GAPS_NG) ;

		return  '<tr id="'+GAPS_NG+'"  >' 
					+   createTd( createDiv(GAPS_NG+ 'Td2Div', html ) )+ '</tr>';
	}


	



	// Break out /down ....
/*
	function addBreakOutDown(){

		var priceBoBd = mtgv.cs.screenerData.priceBoBd;
		var id =  myTsrScreener.getNextId( 'priceBoBdId');

		var ticks = csu.gct({} , null);

		var boBdObj = {
			id : id, type : PRICE_BREAK_OUT[0].id,  period : 40, toPeriod : 60,   tick1: ticks[0].id,
			field1 : CLOSE , gap : 20 , tick2: ticks[0].id, field2 : CLOSE , pc: 10 ,
			period3 : BO_BD_RANGE[0].id , period4: null , goodData : true , gen:'alpha'
		};

		mtgv.cs.screenerData.priceBoBd.push(boBdObj); 

		$('#priceCtrlTab' ).append( getBreakOutDownHtml(boBdObj));

		csu.dsf(); // displaySelectedFields();	
	}
*/

	function getBreakOutDownHtml(boBdObj){

		if(!mtgv.mtpp.crossFreq){
			return '';
		}

		if(!boBdObj.ng){
			// Backward Compatibility ....adv Options .....     advOpt
			if(boBdObj.tick2 != SCR_FREQ  || boBdObj.field2 != CLOSE   || !jsu.isNotNull('gap')  || !jsu.isNotNull('pc') ){
				boBdObj.advOpt = true;
			}
		}  


		var html = getBreakOutDownTD(boBdObj);


		// if(mtgv.cs.ng){
				var html = '<tr id=' + boBdObj.id + '>'
						+ createTd(createDiv(boBdObj.id + 'Td2Div', html, null)) + '</tr>';
				return html;			
		// }


		// return  csh.dynTr(boBdObj, {td1 : doBold('Break out/Down'), td2 : html })




	}


	function getBreakOutDownTD(boBdObj){

		var id = boBdObj.id;
		var func = 'csp.bobdc';
		var fncParam = id;

		var html = '' 


		// if(mtgv.cs.ng){
			html+= doBold('Break out/Down') + BR_2;
		// }

		// html+= 'Latest ' 

		html+=getDropDown(PRICE_BREAK_OUT, id+'type', null,func, fncParam, boBdObj.type)
		html+= SP_3 +' Of ';
		html+= BR_2; 
		

		html+=  getInputTxtParam( id+'period' , 3, boBdObj.period, func , fncParam)	;
/*
		if(boBdObj.advOpt){


			html+= ' to  ';
			html+=  getInputTxtParam( id+'toPeriod' , 3, boBdObj.toPeriod, func , fncParam)	;
		}
*/
		// Order of fields , Tick Number is other way round due to historical reason...
		var ticks = csu.gct(boBdObj , 'tick2');
		html+= SP_3 +	getDropDown(ticks, boBdObj.id+'tick2', '',func, boBdObj.id, boBdObj.tick2) ;

		html+=SP_3;

		html+= 	getDropDown(CLOSE_FIELDS_NO_VOL, id+'field2', '',func, id, boBdObj.field2);

		html+=  SP_3+   htmlU.getCheckboxP( boBdObj.id+ 'advOpt', func,  ( boBdObj.advOpt ? 'checked' : '' ), boBdObj.id  ) + ' Advance Options '


		if(boBdObj.advOpt){

			if(! jsu.containsString( [BREAK_OUT_TAK_SUP  ,  BREAK_DOWN_TAK_RES ] ,  boBdObj.type )){

				html+= BR_2;

				html+=  htmlU.getSpan(	' with latest candle  away for min  ' , 'grey' , 10  );
				html+=  getInputTxtParam( id+'gap' , 3, boBdObj.gap, func , fncParam) // + htmlU.getSpan(' (Optional)')	;

				html += htmlU.getSpan(	' Ticks from previous High/Low', 'grey' , 10  );

				html+= BR_2;

				html+= 	 htmlU.getSpan(	' and  latest Value atleast  ' , 'grey' , 10);
				html+=  getInputTxtParam( id+'pc' , 3, boBdObj.pc, func , fncParam) + ' % '  // (Optional)

			    html+= htmlU.getSpan(' away from Previous High/Low levels' , 'grey' , 10);

			}else{
				html+= BREAK_LINE;
				html+= htmlU.getSpan('Additional Options Coming Soon' , 'grey' , 10);
			}

			html+= BR_2;


			if( jsu.containsString( [BREAK_OUT  ,  BREAK_DOWN ] ,  boBdObj.type )){

				html+= "Using " 

				html+= 	getDropDown(BO_BD_RANGE, boBdObj.id+'period3', '',func, boBdObj.id, boBdObj.period3) ;
			
				if(boBdObj.period3 == WITHIN){
					html+=  SP_3 +getInputTxtParam( id+'period4' , 3, boBdObj.period4, func , fncParam)  + htmlU.getSpan(' (Optional)', 'grey', 10)	;
				}

				// Order of fields Number is other way round due to historical reason...
				var ticks1 = SP_3 + csu.gct(boBdObj , 'tick1');

				var ticks = null;

				if(mtgv.mtpp.ar){ // Only Intraday Ticks 

					ticks = FREQ_SCR_INTRA_FREQ_MAP.slice();
					ticks.unshift({id: "scrFreq", label: "Screener"} )
					jsu.removeFromArrayWithId(ticks, FREQ_INTRA_DAILY);

				}else{
					ticks = [ {id: "scrFreq", label: "Screener"} ];
				}



				html+= 	getDropDown(ticks, boBdObj.id+'tick1', '',func, boBdObj.id, boBdObj.tick1) ;

				html+=SP_3;

				html+= 	getDropDown(CLOSE_FIELDS_NO_VOL, id+'field1', '',func, id, boBdObj.field1);

				html+=  ' for Break Out / Down Level' ;
				html+= BREAK_LINE
				html+=   htmlU.getSpan('This option works only in live market' , 'grey' ,10)
			}



		}

/*


		

*/
		// html+= BREAK_LINE;

		

	   	var param = 'priceBoBd'+':'+id  ; 

	   	html+= csh.gept(boBdObj, PRICE_CS,  param);

		html+= SP_3 + csh.delIcon(param) ; 

		return html;

	}


	function brkOutDwnChg(id){  //bobdc
		var boBdObj = jsu.getObjFrmArr(  mtgv.cs.screenerData.priceBoBd, id );

		csu.setProp(mtgv.cs.screenerData.priceBoBd, [  'type', 'period', 'gap',  'tick1','field1' ,'tick2'  ,'field2' , 'pc',
			'toPeriod' , 'period3' , 'period4' 
			],id);


		boBdObj.goodData = true;





		if(htmlU.isChecked(boBdObj.id+'advOpt')){
			
			boBdObj.advOpt = true;
/*
			if(jsu.isNull(boBdObj.toPeriod)){
				boBdObj.toPeriod = 60;
			}
*/
			if(jsu.isNull(boBdObj.pc)) {
				boBdObj.pc = 10;
			}

			if(jsu.isNull(boBdObj.gap)) {
				boBdObj.gap = 20;
			}

			if(jsu.isNull( boBdObj.tick1 )){
				var ticks = csu.gct({} , null);
				boBdObj.tick1 = ticks[0].id
			}

		}else{
			boBdObj.advOpt = false;
		}


		var td = getBreakOutDownTD( boBdObj );
		
		htmlU.addMsgToDiv(boBdObj.id+'Td2Div', true, td);

		if(!jsu.isPositiveIntegerInput (id+'period')){
			boBdObj.goodData = false;
		}

/*		if(jsu.isNotNull(boBdObj.toPeriod)){
			if(!jsu.isPositiveIntegerInput (id+'toPeriod')){
				boBdObj.goodData = false;
			}
		}
*/

		if(boBdObj.advOpt   && ! jsu.containsString( [BREAK_OUT_TAK_SUP  ,  BREAK_DOWN_TAK_RES ] ,  boBdObj.type )){   //if(! jsu.containsString( [BREAK_OUT_TAK_SUP  ,  BREAK_DOWN_TAK_RES ] ,  boBdObj.type )){


			if(jsu.isNotNull(boBdObj.gap)){
				if(!jsu.isPositiveIntegerInput (id+'gap')){
					boBdObj.goodData = false;
				}
			}

			if(jsu.isNotNull(boBdObj.pc)){
				if(!jsu.isPositiveNumInput (id+'pc')){
					boBdObj.goodData = false;
				}	
			}

			if(jsu.isNotNull(boBdObj.period4)){

				if(!jsu.isPositiveIntegerInput (id+'period4')){
					boBdObj.goodData = false;
				}
			}
		}


		csu.setProp(mtgv.cs.screenerData.priceBoBd, [  'type', 'period', 'gap',  'tick1','field1' ,'tick2'  ,'field2' , 'pc',
			'toPeriod' , 'period3' , 'period4' 
			],id);

		csu.dsf(); // displaySelectedFields();	

	}


	function validateBoBd(validResults){


		for(var i=0;i < mtgv.cs.screenerData.priceBoBd.length; i++){

			var boBdObj = mtgv.cs.screenerData.priceBoBd[i];

			var selParam =  'priceBoBd' +':'+boBdObj.id ;// + '

			var goodData = true;

			var text =''

			text+= htmlU.doBold("Break Out/Down : ")

			var typeObj =  jsu.getObjFrmArr( PRICE_BREAK_OUT , boBdObj.type );

			if(boBdObj.goodData){

				var ticks = csu.gct(boBdObj , 'tick1');

				text += typeObj.label;

				text+= ' of ';

				text += SP_3 + boBdObj.period;

/*
				if(boBdObj.advOpt){
					text+= ' to ';
					text += SP_3 + boBdObj.toPeriod;
				}
*/
				text += SP_3;

				var tick2Obj = jsu.getObjFrmArr(ticks, boBdObj.tick2);		

				text += tick2Obj.label;

				var field2Obj = jsu.getObjFrmArr( CLOSE_FIELDS_NO_VOL , boBdObj.field2 );

				text += ' ' + 	field2Obj.label;	

				if(boBdObj.advOpt){



					if(! jsu.containsString( [BREAK_OUT_TAK_SUP  ,  BREAK_DOWN_TAK_RES ] ,  boBdObj.type )){
						if( Number( boBdObj.gap) > 0){			
							text+= 	' with latest candle away for min  '
							text += boBdObj.gap;
							text +=' Ticks from previous Highs/lows'
						}
						if( Number( boBdObj.pc) > 0){			
							text+= 	' and  latest Value atleast '
							text += boBdObj.pc;
							text +=' % away from Highs/Lows levels'
						}

					}


					if( jsu.containsString( [BREAK_OUT  ,  BREAK_DOWN ] ,  boBdObj.type )){
						var tick1Obj = jsu.getObjFrmArr(ticks, boBdObj.tick1);		
						var field1Obj = jsu.getObjFrmArr( CLOSE_FIELDS_NO_VOL , boBdObj.field1 );


						text+= ', Using ' 
						text += tick1Obj.label;
						text += ' ' + 	field1Obj.label;	
						html+=  ' for Break Out / Down Level' ;
					}

				}

/*

				// text += 'Latest '	

				var tick1Obj = jsu.getObjFrmArr(ticks, boBdObj.tick1);		

				text += tick1Obj.label;



				var field1Obj = jsu.getObjFrmArr( CLOSE_FIELDS_NO_VOL , boBdObj.field1 );

				text += ' ' + 	field1Obj.label;		

				text += SP_3

				text += typeObj.label;

				text+= ' of ';

				if( !jsu.isInteger(boBdObj.period) && Number(boBdObj.period) <=0){ 
					goodData = false;
				}else

				text += SP_3 + boBdObj.period;

				text += SP_3;

				var tick2Obj = jsu.getObjFrmArr(ticks, boBdObj.tick2);

				text += tick2Obj.label;


				var field2Obj = jsu.getObjFrmArr( CLOSE_FIELDS_NO_VOL , boBdObj.field2 );

				text += ' ' + 	field2Obj.label;		


				if(jsu.isNotNull(boBdObj.gap)){
					if( !jsu.isInteger(boBdObj.gap) && Number(boBdObj.gap) <=0){ 
						goodData = false;
					}else if( Number( boBdObj.gap) > 0){			
						text+= 	' with latest candle away for min  '
						text += boBdObj.gap;
						text +=' Ticks from previous levels'
					}
				}


				if(jsu.isNotNull(boBdObj.pc)){
					if( !jsu.isInteger(boBdObj.pc) && Number(boBdObj.pc) <=0){ 
						goodData = false;
					}else if( Number( boBdObj.pc) > 0){			
						text+= 	' and  latest Value atleast '
						text += boBdObj.pc;
						text +=' % away from extreme levels'
					}
				}
*/

			}else{ // not good data

				text = 'Incorrect Value for Break Out / Down'
				goodData = false;
					// csh.cdt(obj,text, validResults, obj.id, false);
			}





			boBdObj.csType = PRICE_CS;
			// boBdObj.goodData = goodData;
			
			csh.cdt(boBdObj,text, validResults, selParam, goodData);

		}

	}


	// Break out /down Change ....

	// VWAP Start -------------------
/*
	function addWap(){

		var obj = mtgv.cs.screenerData[CS_VWAP];
		var id =  myTsrScreener.getNextId( CS_VWAP +'Id');

		var ticks = csu.gct({} , null);

		var obj = {
			id : id, type : VWAP_OPT[0].id,   ops : VWAP_OP_BAND_OPT[0].id,  
			tick1: SHORT_PERIODS[0].id, field1 : CLOSE , goodData : true 
		};

		mtgv.cs.screenerData[CS_VWAP].push(obj); 

		$('#priceCtrlTab' ).append( getVwapHtml(obj));

		csu.dsf(); // displaySelectedFields();	

	}
*/

	function getVwapHtml(obj){

		if(!mtgv.mtpp.crossFreq){
			return '';
		}

		var html = getVwapTd(obj);


		// if(mtgv.cs.ng){
			var html = '<tr id=' + obj.id + '>'
						+ createTd(createDiv(obj.id + 'Td2Div', html, null)) + '</tr>';
			return html;			
		// }



		// return  csh.dynTr(obj, {td1 : doBold('Wt Abv Price (WAP) '), td2 : html })


	}

	function getVwapTd(obj){

		var id = obj.id;
		var func = 'csp.wapc';
		var fncParam = id;

		var html = '' 

		// if(mtgv.cs.ng){

			html+=doBold('Wt Abv Price (WAP) ') +BR_2;

		// }

		if(!obj.advOpt){
			html+=  htmlU.getCheckboxP(id+ 'advOpt' , func,  (obj.advOpt ? 'checked' : '' ), id  ) + SP_2 +' Advance Options '
			html+= BR_2 ;

			html+=getDropDown(VWAP_OP_BAND_OPT, id+'ops', null,func, fncParam, obj.ops);

			html+= vwapOpsHtml(obj , func, fncParam);

			html += SP_3 + ' since Start of day on ' + ' ' ;
			html+=  SP_3 + getDropDown(SHORT_PERIODS , id+'tick1', null,func, fncParam, obj.tick1);
			html+= BR_2 ;

			
		
		}else{

			html+= htmlU.getCheckboxP(id+ 'advOpt' , func,  (obj.advOpt ? 'checked' : '' ), id  )  +SP_2 +'  Advance Options '
			html+= BR_2 ;

			html+=getDropDown(VWAP_OPT, id+'type', null,func, fncParam, obj.type);

			

			html+= BR_2 ;
			
			if(jsu.isNull(obj.priceField)) obj.priceField =  HLC;

			html+= 'Price Field : ' +   getDropDown(VWAP_PRICE_FIELDS, id+'priceField', null,func, fncParam, obj.priceField)
					+ htmlU.getSpan('(H+L+C)/3 aka Typical Price ')
					;
			
			// if(jsu.containsString({}  , ))		


			html+= BR_2 ;

			if(jsu.isNull(obj.type)) obj.type = 'vwap';

			
			if(obj.type == 'vwapMa'){

				// html+= SP_3 + getDropDown(VWAP_OP_OPT, id+'ops', null,func, fncParam, obj.ops);
				// html+= BR_2 ;
				html+= getVwapMaHtml(obj , func, fncParam, id);

			}else if(obj.type == 'vwapPP'){	

				html+= getVwapPivotHtml(obj , func, fncParam, id)

			}else{
				html+= vwapOpsHtml(obj , func, fncParam, id);

				 if(obj.type == 'vwap'){
					html+= getDropDown(VWAP_OP_BAND_OPT, id+'ops', null,func, fncParam, obj.ops); 	

					if( jsu.containsString( ['abvBand','caBand','blwBand','cbBand','withBand'] ,  obj.ops ) ){

						if(jsu.isNull(obj.bandType)) obj.bandType =  'sd';

						if(jsu.isNull(obj.bandField)) obj.bandField =  HLC;

						html+= SP_3  +' Band Type : ' +   getDropDown( pdef.vbt, id+'bandType', null,func, fncParam, obj.bandType)

						html+= SP_3  +  getInputTxtParam( id + 'mult' , 3, obj.mult, func , fncParam) ;  

						if(obj.bandType =='sd'){
							if(jsu.isNull(obj.mult)) obj.mult =  1;
							
							html+= SP_3  +' SD on : ' +   getDropDown( VBAND_FIELDS, id+'bandField', null,func, fncParam, obj.bandField)
						}
					}


				 }else{
					html+= getDropDown(VWAP_OP_OPT, id+'ops', null,func, fncParam, obj.ops); 	
				 }
				
				// html+=  SP_3 +  htmlU.getCheckboxP(id+ 'advOpt' , func,  (obj.advOpt ? 'checked' : '' ), id  ) + ' Advance Options '
		
				

				html+= BR_2 ;

				if( obj.type == 'vwap'){

					// html+= vwapOpsHtml(obj , func, fncParam, id);

					// html+= SP_3 + getDropDown(VWAP_OP_OPT, id+'ops', null,func, fncParam, obj.ops);

					// html+=  SP_3 +  htmlU.getCheckboxP(id+ 'advOpt' , func,  (obj.advOpt ? 'checked' : '' ), id  ) + ' Advance Options '

					// html+= BR_2 ;

					html+= ' Since ' + getDropDown(VWAP_PERIOD, id+'tick2', null,func, fncParam, obj.tick2);
		
					html+=  ' on ' + getDropDown(SHORT_PERIODS , id+'tick1', null,func, fncParam, obj.tick1) + ' Tick ';

				} else {
					
					html+= 	getAvwapHtml(obj, func , fncParam, id);
				}

			}

		}


		var param = CS_VWAP+':'+id  ; 
		html+= csh.gept(obj, PRICE_CS,  param);
		html+= SP_3 + csh.delIcon(param) ; 

		return html;

	}


	

	function getAvwapHtml(obj , func, fncParam, id){

		var html =''
		if(obj.type == 'mvwap'){
				// nothing more
			html+= ' Starting from last '  
			html+= SP_3 +  getInputTxtParam( id + 'period' , 3, obj.period, func , fncParam)  +' Ticks ';

		} else if(obj.type == 'avwap'){
			
			html+=     getDropDown(VWAP_ANCHOR,  id+ 'point', null, func, fncParam, obj.point) ;

			html+= ' Starting from last '  
			html+= SP_3 +  getInputTxtParam( id + 'period' , 3, obj.period, func , fncParam)  +' Ticks ';

			// html += BR_2;


		} else if(obj.type == 'twap'){
			
			// html+=    getDropDown(VWAP_ANCHOR,  id+ 'point', null, func, fncParam, obj.point) ;


			html+=  SP_2 + ' Starting from ' ;
			html += BR_2;
			html+= '  Date ' + getInputTxtParam( id + 'sdate' , 10, obj.sdate, func , fncParam) 
				+ htmlU.getSpan(' dd/MM/yyyy format ' , 'grey' ,10)
			html += BR_2;
			html+= '  Hours ' + getInputTxtParam( id + 'hh' , 3, obj.hh, func , fncParam) 	

			html+= SP_3 + '  Mins ' + getInputTxtParam( id + 'mm' , 3, obj.mm, func , fncParam) 	

			html+= htmlU.getSpan('Atleast Date or Time (hh /mm) is required ', 'grey' ,10);
		}


		html += BR_2;
		var ticks = csu.gct(obj , 'tick2');
		html+=  " On  " + getDropDown(ticks,  id+ 'tick2', null, func, fncParam, obj.tick2) ;
		html+= " tick ";
		

		return html;

	}

	function getVwapMaHtml(obj , func, fncParam, id){

		var html = '';

		html += getDropDown(cscmn.gttp(100) , id+'vwapPeriod', null,func, fncParam, obj.vwapPeriod) ;

		html +=SP_3 +  'VWAP on ' + getDropDown(SHORT_PERIODS , id+'tick1', null,func, fncParam, obj.tick1) + ' Tick ';

		// html+=  SP_3 +  htmlU.getCheckboxP(id+ 'advOpt' , func,  (obj.advOpt ? 'checked' : '' ), id  ) + ' Advance Options '

		html+= BR_2 ;

		html+= getDropDown(AB_CO_OPS_BASIC , id+'ops', null,func, fncParam, obj.ops) ;

		

		html+= BR_2 ;

		if(jsu.isNull(obj.maType)){
			obj.maType = EMA.toLowerCase();
		}

		html += getDropDown(cscmn.gttp(100) , id+'bandPeriod', null,func, fncParam, obj.bandPeriod) ;
		html+= SP_3 + getDropDown(VWAP_OL , id+'maType', null,func, fncParam, obj.maType) ;
	

		if(jsu.containsString( ['sma', 'ema', 'wma'],   obj.maType)){
			html+= SP_3 + getInputTxtParam( obj.id + 'v1' , 3, obj.v1, func , fncParam);

			html+=  ' on ' + getDropDown(ALL_OHLC_HA_FIELD, id+'bandField', null,func, fncParam, obj.bandField);

			var ticks = csu.gct(obj , 'tick2');
			html+=  BR_2 +  " On  " + getDropDown(ticks,  id+ 'tick2', null, func, fncParam, obj.tick2) ;
			html+= " tick ";			

		} else if(  jsu.arrayContainsId( olHistComp.olt, obj.maType)    )	{
		
			html+= olHistComp.gh(id, obj , obj.maType, func, fncParam)

/*
		} else if( obj.maType == SUPER_TREND){

			let techObj = {indi: SUPER_TREND , p1: obj.p1 , p2: obj.p2, maType :obj.bandMa }

			mcval.sina(techObj , 'p1') // sets def Val

			mcval.sina(techObj , 'p2') // sets def Val

			mcval.sina(techObj , 'maType') // sets def Val

			var mas = jsu.cloneObj(mtgv.mtpp.MA_TYPE);

			mas.unshift(ATR_MA_DEF) ;

			obj.p1 = techObj.p1;
			obj.p2 = techObj.p2;
			obj.bandMa = techObj.maType;

			html+= BR_2 ;
			html+= 'Period  ' +  getInputTxtParam( id+'p1' , 3, obj.p1, func , fncParam)	;

			html+= SP_2 + getDropDown(mas, id+'bandMa', null,func, fncParam, obj.bandMa);

			

			html+=  SP_3+' Multiplier  '+ getInputTxtParam( id+'p2' , 3, obj.p2, func , fncParam)	;

			// html+=  SP_3+ getDropDown(OHLC_HA, id+'bandField', null,func, fncParam, obj.bandField);


		} else if( obj.maType == PSAR){
			
			let techObj = {indi: PSAR , p1: obj.p1 , p2: obj.p2, p3 : obj.p3 }

			mcval.sina(techObj , 'p1') // sets def Val

			mcval.sina(techObj , 'p2') // sets def Val

			mcval.sina(techObj , 'p3') // sets def Val

			obj.p1 = techObj.p1;
			obj.p2 = techObj.p2;
			obj.p3 = techObj.p3;
			html+= BR_2 ;

			html+= 'Start ' + getInputTxtParam( id+'p1' , 3, obj.p1, func , fncParam)	;

			html+=  '  Increment  '+ getInputTxtParam( id+'p3' , 3, obj.p3, func , fncParam)	; // Incorrect order due to backward compatibility

			html+=  ' Maximum  '+ getInputTxtParam( id+'p2' , 3, obj.p2, func , fncParam)	;

			// html+=  SP_3  +' on '+ getDropDown(OHLC_HA, id+'fieldCat', null,func, fncParam, obj.fieldCat);

		}else if ( jsu.containsString( ['bollingerUB', 'bollingerMB', 'bollingerLB'],   obj.maType) ){

			let techObj = {indi: BOLLINGER , p1: obj.p1 , p2: obj.p2}
			mcval.sina(techObj , 'p1') // sets def Val
			mcval.sina(techObj , 'p2') // sets def Val
			obj.p1 = techObj.p1;
			obj.p2 = techObj.p2;

			html+= ' ' + getDropDown(mtgv.mtpp.MA_TYPE, id+'bandMa', null,func, fncParam, obj.bandMa);

			html+=  ' ' + getInputTxtParam( id+'p1' , 3, obj.p1, func , fncParam)	;
			
			html+=  ' on ' + getDropDown(ALL_OHLC_HA_FIELD, id+'bandField', null,func, fncParam, obj.bandField);

			html+=  ' Std Dev ' + getInputTxtParam( id+'p2' , 3, obj.p2, func , fncParam)	;

			// html+= SP_3 + getInputTxtParam( obj.id + 'v1' , 3, obj.v1, func , fncParam);
*/			
		}
	

		


		return html;
	}

	function getVwapPivotHtml(obj , func, fncParam, id){

		var html =''

		html += getDropDown(cscmn.gttp(100) , id+'vwapPeriod', null,func, fncParam, obj.vwapPeriod) ;

		html += SP_3 + 'VWAP on ' + getDropDown(SHORT_PERIODS , id+'tick1', null,func, fncParam, obj.tick1) + ' Tick ';

		// html+=  SP_3 +  htmlU.getCheckboxP(id+ 'advOpt' , func,  (obj.advOpt ? 'checked' : '' ), id  ) + ' Advance Options '

		html+= BR_2 ;

		html+= getDropDown(AB_CO_OPS_BASIC , id+'ops', null,func, fncParam, obj.ops) ;

		html+= SP_3 + htmlU.getDropDown(cspp.ppFreq(), id+'tick2', null, func, fncParam, obj.tick2);

		html+= SP_3 +getDropDown(pivot_fields , id+'ppType', null,func, fncParam, obj.ppType) ;

		return html;
	}

	



	function vwapOpsHtml(obj, func, fncParam){
		var html ='';

		// if(jsu.isNull(obj.period2)){
		// 	obj.period2= 
		// }


		// if(obj.ops)

		

		if(obj.ops == WITHIN){
			html+= SP_3 + getInputTxtParam( obj.id + 'period2' , 3, obj.period2, func , fncParam);
			html+= SP_3 + ' %' ;
		}else if(jsu.containsString([ TRENDING_UP, TRENDING_DOWN, 'gapWiden' , 'gapNarrow']  , obj.ops )){
			html+= SP_3 + getInputTxtParam( obj.id + 'period2' , 3, obj.period2, func , fncParam);
			html+= SP_3 + ' Ticks' ;
		}


		return html;
	}


	function wapChg(id){
		
		var obj = jsu.getObjFrmArr(  mtgv.cs.screenerData[CS_VWAP] , id );

		if(htmlU.isChecked(obj.id+'advOpt')){
			obj.advOpt = true;
		}else{
			obj.advOpt = false;
		}

		let origMa = null;

		let resetMa = false;

		if(obj.advOpt && obj.type == 'vwapMa'){
			resetMa = true;
			origMa = obj.maType;
		}


		var FIELDS = [  'type', 'ops', 'period', 'period2',  'tick1',  'tick2', 
			'field1' , 'point' , 'v1', 'maType', 'ppType', 'type',
			 'sdate' , 'hh' ,'mm',  'priceField'   ,'mult' , 'bandField' ,'bandType',
			 'p1','p2','p3','p4', 'bandMa', 'bandField', 'vwapPeriod' ,'bandPeriod'
			];

		csu.setProp( mtgv.cs.screenerData[CS_VWAP], FIELDS ,id);

		obj.goodData = true;


		if(resetMa &&  (origMa != obj.maType   ) ){

			if(jsu.containsString( [SMA, EMA, WMA],   obj.maType)){
				// obj.p1 = 

			} else if(  jsu.arrayContainsId( olHistComp.olt, obj.maType)    )	{
				// set Def Vals ...

				olHistComp.sdv(obj, obj.maType)
			}

				

		}

		

		var td = getVwapTd( obj );
		
		htmlU.addMsgToDiv(obj.id+'Td2Div', true, td);

		if(!obj.advOpt){
			// No Validation  required
		}else{


			if( jsu.containsString( ['abvBand','caBand','blwBand','cbBand','withBand'] ,  obj.ops ) ){
					if(!jsu.isPositiveNumInput (id+'mult')) obj.goodData = false;
			}

			if(obj.type == 'vwap'){
				if(obj.tick1 == 'since'){
					if(!jsu.isPositiveNumInput (id+'period')) obj.goodData = false;
				}
			}else if(obj.type == 'twap'){
				
				if( jsu.isNotNull(obj.sdate) ){
					if(!jsu.isValidDateInput( id+'sdate' )) obj.goodData = false;
					
				}

				if( jsu.isNotNull(obj.hh) ){
					if( !jsu.isIntegerInput (id+'hh')   || !jsu.inputNumberRange (id+'hh', 9,15)) obj.goodData = false;
				}

				if( jsu.isNotNull(obj.mm) ){
					if( !jsu.isIntegerInput (id+'mm')   || !jsu.inputNumberRange (id+'mm', 0,59)) obj.goodData = false;
				}

				if(jsu.isNull(obj.hh)  && jsu.isNull(obj.sdate)){ // either Date or hours shoul be filled
					obj.goodData = false;
				}

				if( jsu.isNotNull(obj.mm)  && jsu.isNull(obj.hh)){ 
					obj.goodData = false; // mins without hh is not valid
				}

			}else if(obj.type == 'vwapMa'){

				if(jsu.containsString( ['sma', 'ema', 'wma'],   obj.maType)){
					if(!jsu.isPositiveNumInput (id+'v1')) obj.goodData = false;
				
					if(!jsu.inputNumberRange (id+'v1', 1,200)) obj.goodData = false;

				} else if(  jsu.arrayContainsId( olHistComp.olt, obj.maType)    )	{
					olHistComp.hc(id, obj, obj.maType)
				}

			}else if(obj.type == 'vwapPP'){	
				// no vali

			}else{
				if(!jsu.isPositiveNumInput (id+'period')) obj.goodData = false;
			}
		}

		csu.setProp( mtgv.cs.screenerData[CS_VWAP], FIELDS,id);

		csu.dsf(); // displaySelectedFields();	

	}

	function validateVwap(validResults){

		for(var i=0;i < mtgv.cs.screenerData[CS_VWAP].length; i++){

			var obj = mtgv.cs.screenerData[CS_VWAP][i];

			if(jsu.isNull( obj.vwapPeriod ) )   obj.vwapPeriod = 0; // backward compatibility


			var selParam =  CS_VWAP +':'+obj.id ;// + '

			var text = htmlU .doBold('VWAP : ');

			var opsObj = jsu.getObjFrmArr( VWAP_OP_BAND_OPT , obj.ops ); 

			if(!obj.advOpt){

				var tickObj = jsu.getObjFrmArr( SHORT_PERIODS , obj.tick1 ); 

				text += opsObj.label + ' since Start of day on ' + tickObj.label + ' tick '

			}else{
				var tickObj =  jsu.getObjFrmArr( SHORT_PERIODS , obj.tick1 ); 
				var typeObj =  jsu.getObjFrmArr( VWAP_OPT , obj.type );

				text += typeObj.label + ' ' + opsObj.label ;

				if(obj.type == 'vwap'){

					var tick2Obj =  jsu.getObjFrmArr( VWAP_PERIOD , obj.tick2 );
					// tickObj = jsu.getObjFrmArr( SHORT_PERIODS , obj.tick1 ); 

					text += ' Since ' +  tick2Obj.label;
				
					text += ' on '  + tickObj.label + ' tick '; 


				}else if(obj.type == 'twap'){

					var ticks = csu.gct(obj , 'tick2');


					if(obj.type == 'avwap'      ){
						var ptObj = jsu.getObjFrmArr( VWAP_ANCHOR , obj.point )
						text += ptObj.label;
					}

					text += ' Since ';
				
					if(jsu.isNotNull(obj.sdate)){
						text += obj.sdate;
					}

					if(jsu.isNotNull(obj.hh)){
						text +=  SP_2+ obj.hh;
					}

					if(jsu.isNotNull(obj.mm)){
						text +=  ' : ' + obj.mm;
					}

					tickObj = jsu.getObjFrmArr( ticks , obj.tick2 )

					text += ' on '  + tickObj.label + ' tick '; 


				}else if(obj.type == 'vwapMa'){


					
					if(jsu.isNull( obj.bandPeriod ) )   obj.bandPeriod = 0; // backward compatibility

					let periodList = cscmn.gttp(100) ;


					var opsObj = jsu.getObjFrmArr( AB_CO_OPS_BASIC , obj.ops ); 

					let vwapPeriodObj =  jsu.getObjFrmArr( periodList , obj.vwapPeriod ); 

					text = vwapPeriodObj.label + SP_2;
					text +='VWAP on' + tickObj.label + ' Tick ' +  opsObj.label;


					let bandPeriodObj =  jsu.getObjFrmArr( periodList , obj.bandPeriod ); 
					text += SP_2 + bandPeriodObj.label + SP_2;

					if(jsu.containsString( [SMA, EMA, WMA],   obj.maType)){

						var maObj = jsu.getObjFrmArr( MA_TYPE_PR , obj.maType );

						text +=   ' '  +  obj.v1  +' ' + maObj.label;

						var ticks = csu.gct(obj , 'tick2');
						tickObj = jsu.getObjFrmArr( ticks , obj.tick2 )
						text += ' on '  + tickObj.label + ' tick '; 

					} else if(  jsu.arrayContainsId( olHistComp.olt, obj.maType)    )	{	

						text += olHistComp.vf(obj , obj.maType);

/*
					} else if( obj.maType == SUPER_TREND){	

						let olObj =  jsu.getObjFrmArr( VWAP_OL , obj.maType ); 

						text+= olObj.label;

						let fieldObj =  jsu.getObjFrmArr( OHLC_HA , obj.bandField ); 

						text += '('+ obj.bandMa +',' +obj.p1 + ',' + obj.p2 + ',' + obj.bandField  +')'

					} else if( obj.maType == PSAR){	

						let olObj =  jsu.getObjFrmArr( VWAP_OL , obj.maType ); 

						text+= olObj.label;

						let fieldObj =  jsu.getObjFrmArr( OHLC_HA , obj.bandField ); 

						text += '('+ obj.bandMa +',' +obj.p1 + ',' + obj.p2 + ',' + obj.p3 + ',' + obj.bandField  +')'	

					} else if ( jsu.containsString( ['bollingerUB', 'bollingerMB', 'bollingerLB'],   obj.maType) ){

						let olObj =  jsu.getObjFrmArr( VWAP_OL , obj.maType ); 

						text+= olObj.label;

						text += '('+ obj.bandMa +',' +obj.p1 + ',' + obj.p2   +')'
 */
					}

					
					
				}else if(obj.type == 'vwapPP'){	

					let periodList = cscmn.gttp(100) ;

					let vwapPeriodObj =  jsu.getObjFrmArr( periodList , obj.vwapPeriod ); 

					text = vwapPeriodObj.label + SP_2;


					var opsObj = jsu.getObjFrmArr( AB_CO_OPS_BASIC , obj.ops ); 

					text +=   'VWAP on' + tickObj.label + ' Tick ' +  opsObj.label;

					// html+= SP_3 + htmlU.getDropDown(cspp.ppFreq, id+'tick2', null, ,func, fncParam, obj.tick2);

					var ppTickObj = jsu.getObjFrmArr( cspp.ppFreq() , obj.tick2 ); 

					text+= ' ' + ppTickObj.label;

					var ppObj = jsu.getObjFrmArr( pivot_fields , obj.ppType );

					text +=   ' '  + ppObj.label;

				}else{
					var ticks = csu.gct(obj , 'tick2');


					if(obj.type == 'avwap'      ){
						var ptObj = jsu.getObjFrmArr( VWAP_ANCHOR , obj.point )
						text += ptObj.label;
					}

					text += ' Starting from last ' + obj.period + ' ticks ' ;
					tickObj = jsu.getObjFrmArr( ticks , obj.tick2 )
					text += ' on '  + tickObj.label + ' tick '; 
				}
				

			}


			obj.csType = PRICE_CS;
			
			if(!obj.goodData){
				text = 'Incorrect Value VWAP'
			}

			csh.cdt(obj,text, validResults, selParam, obj.goodData);

		}

	}


	// VWAP End -------------------


	// Rally Boring Combo 
/*
	function addRallyBoringCombo(type){

		var rallyBaseCom = mtgv.cs.screenerData.rallyBaseCom;
		var id =  myTsrScreener.getNextId( 'rallyBaseComId');

		var ticks = csu.gct({} , null);

		var obj = {
			id : id, type : RALL_BASE_COMBO[0].id, minBoring : 1, maxBoring : 4,
			minLegIn : 2 ,minLegOut : 2.5 , goodData : true , 
			tick1: ticks[0].id
		};


		if(jsu.isNotNull(type)){
			obj.type  = type;
		}


		mtgv.cs.screenerData.rallyBaseCom.push(obj); 

		$('#priceCtrlTab' ).append( getRbcHtml(obj));

		csu.dsf(); // displaySelectedFields();	
	}

*/
	function getRbcHtml(obj){

		if(!mtgv.mtpp.crossFreq){
			return '';
		}

		var html = getRbcTD(obj);

		// if(mtgv.cs.ng){
			var html = '<tr id=' + obj.id + '>'
					+ createTd(createDiv(obj.id + 'Td2Div', html, null)) + '</tr>';
			return html;			
		// }

		// return  csh.dynTr(obj, {td1 : doBold('Rally Base Combo'), td2 : html })


	}


	function getRbcTD(obj){
		var id = obj.id;
		var func = 'csp.rbcc';
		var fncParam = id;

		var html = '' 

		// if(mtgv.cs.ng){

			html+=doBold('Demand & Supply Zones : ') +BR_2;

		// }


		html+=getDropDown(RALL_BASE_COMBO, id+'type', null,func, fncParam, obj.type)


		var isAdvOptionChecked = obj.advOpt	

		html+=  SP_3+   htmlU.getCheckboxP(  id+'advOpt', func,  (isAdvOptionChecked ? 'checked' : '' ), id  ) + ' Advance Options '


		if(obj.advOpt){

			html+= BR_2;

			var ticks = csu.gct(obj , 'tick1');
			// html+= SP_3 +	getDropDown(ticks, obj.id+'tick1', '',func, obj.id, obj.tick1) ;

			
  

			html+= 'Boring / Base Candle Count ' 
			html+=  getInputTxtParam( id+'minBoring' , 3, obj.minBoring, func , fncParam); 
			html+= ' to ';

			html+=  getInputTxtParam( id+'maxBoring' , 3, obj.maxBoring, func , fncParam); 
			html+=  htmlU.getSpan(	' Valid Vals 1 to 10 ' , 'grey' , 10  );

			html+= BR_2;

			html+= 'Min Leg In Size to max Boring Candle Size ' 
					+ getInputTxtParam( id+'minLegIn' , 3, obj.minLegIn, func , fncParam); 

			
			html+= SP_2 + getDropDown(CANDLE_RANGE,  id+'minLegInType', null, func, null, obj.minLegInType);


			html+= BR_2;

			html+= 'Min Leg Out Size to max Boring Candle Size ' 
					+ getInputTxtParam( id+'minLegOut' , 3, obj.minLegOut, func , fncParam); 		

			html+= SP_2 + getDropDown(CANDLE_RANGE, id+ 'minLegOutType', null, func, null, obj.minLegOutType);		


			html+= BR_2;		

			html+= 'Min Leg Out Body to LegIn Body (Ratio)' 
					+ getInputTxtParam( id+'minLegOutIn' , 3, obj.minLegOutIn, func , fncParam) 		
					+ SP_3 + htmlU.getSpan('(Optional)' ,'grey', 12)

			html+= BR_2;		

			html+= 'Min Leg In Body to candle Size (%)' 
					+ getInputTxtParam( id+'minLegInBodyToCandle' , 3, obj.minLegInBodyToCandle, func , fncParam)		
					+ SP_3 + htmlU.getSpan('(Optional)' ,'grey', 12)

			html+= BR_2;		

			html+= 'Min Leg Out Body to candle Size (%)' 
					+ getInputTxtParam( id+'minLegOutBodyToCandle' , 3, obj.minLegOutBodyToCandle, func , fncParam) 		
					+ SP_3 + htmlU.getSpan('(Optional)' ,'grey', 12)


			html+= BR_2;

			html+=  htmlU.getCheckboxP(  id+'loCon', func,  (obj.loCon ? 'checked' : '' ), id  ) + ' Leg Out Confirmation  '

			html+= BR_2;


			html+=  htmlU.getCheckboxP(  id+'inZone', func,  (obj.inZone ? 'checked' : '' ), id  ) + ' Additional Zone Filters  '

			// html+= htmlU.crg(RBR_ZONE_OPTS, func, RBR_ZONE_OPTS, obj.zoneType, null, true  );

			if(obj.inZone){
				html+= SP_3  + getDropDown(RBR_ZONE_OPTS, obj.id+'zoneOpt', null,func, obj.id, obj.zoneOpt) ;

				if(obj.zoneOpt == 'nearZone'){
					html+= ' Price within '+ getInputTxtParam( id+'withinPc' , 3, obj.withinPc, func , fncParam) + ' % of Zone '; 	
				}


			}


			html+= BR_2;		
			html+= ' on '  + getDropDown(ticks, obj.id+'tick1', '',func, obj.id, obj.tick1)   + ' tick ';

		}

		var param = 'rallyBaseCom'+':'+id  ; 
		html+= csh.gept(obj, PRICE_CS,  param);
		html+= SP_3 + csh.delIcon(param) ; 

		return html;
	}


	function rbcChange(id){  //bobdc

		var obj = jsu.getObjFrmArr(  mtgv.cs.screenerData.rallyBaseCom, id );

		// var id = obj.id;

		let RBC_FILEDS = [  'type', 'tick1', 'minBoring',  'maxBoring' ,'minLegIn' 
			 ,'minLegOut' , 'zoneOpt','withinPc',
			 'minLegOutIn' , 'minLegInBodyToCandle' ,'minLegOutBodyToCandle',
			 'minLegOutType', 'minLegInType'
			  ]


		csu.siop(obj, RBC_FILEDS);

		obj.goodData = true;

		obj.inZone = htmlU.isChecked(obj.id+'inZone');

		obj.loCon = htmlU.isChecked(obj.id+'loCon');



		if(htmlU.isChecked(obj.id+'advOpt')){
			obj.advOpt = true;
			if(jsu.isNull(obj.maxBoring)) {
				obj.maxBoring = 4;
			}
			if(jsu.isNull(obj.minBoring)) {
				obj.minBoring = 1;
			}

			if(jsu.isNull(obj.minLegIn)) {
				obj.minLegIn = 2.5;
			}
			if(jsu.isNull(obj.minLegOut)) {
				obj.minLegOut = 3;
			}
		}else{
			obj.advOpt = false;
		}


		var td = getRbcTD( obj );

		htmlU.addMsgToDiv(obj.id+'Td2Div', true, td);

		if(obj.advOpt){

			
			if(!jsu.isPositiveNumInput (id+'maxBoring')  ||  ! jsu.inputNumberRange(id+'maxBoring' , 1, 10) ) {
				obj.goodData = false;
			}

			if(!jsu.isPositiveNumInput (id+'minBoring')  ||  ! jsu.inputNumberRange(id+'minBoring' , 1, 10) ) {
				obj.goodData = false;
			}

			if(obj.minBoring > obj.maxBoring){
				obj.goodData = false;
			}
			
			if(!jsu.isPositiveNumInput (id+'minLegIn')  ) {
				obj.goodData = false;
			}
			
			if(!jsu.isPositiveNumInput (id+'minLegOut')  ) {
				obj.goodData = false;
			}

			if( obj.inZone && obj.zoneOpt == 'nearZone'){
				if(!jsu.isPositiveNumInput (id+'withinPc')  ||  ! jsu.inputNumberRange(id+'withinPc' , .1, 10) ) {
					obj.goodData = false;
				}
			}

			if( jsu.isNotNull(obj.minLegOutIn) &&  !jsu.isPositiveNumInput (id+'minLegOutIn')  ) {
				obj.goodData = false;
			}

			if( jsu.isNotNull(obj.minLegInBodyToCandle) &&  !jsu.isPositiveNumInput (id+'minLegInBodyToCandle')  ) {
				obj.goodData = false;
			}

			if( jsu.isNotNull(obj.minLegOutBodyToCandle) &&  !jsu.isPositiveNumInput (id+'minLegOutBodyToCandle')  ) {
				obj.goodData = false;
			}

		}

		csu.siop(obj, RBC_FILEDS);

		csu.dsf(); // displaySelectedFields();
	}


	function validateRbc(validResults){

		for(var i=0;i < mtgv.cs.screenerData.rallyBaseCom.length; i++){

			var obj = mtgv.cs.screenerData.rallyBaseCom[i];

			var selParam =  'rallyBaseCom' +':'+obj.id ;// + '

			var goodData = true;

			var text = htmlU.doBold('Demand & Supply Zone : ');

			var typeObj =  jsu.getObjFrmArr( RALL_BASE_COMBO , obj.type );

			if(obj.goodData){

				text += ' '
				text+= typeObj.label; 

				// if(obj.advOpt){
				// 	var ticks = csu.gct(obj , 'tick1');

				// 	text += obj.label;

				// 	text+= ' M'
				// }

/*

				

				text+= ' of ';

				text += SP_3 + obj.period;
*/

			}else{
				text = 'Incorrect Value for Rally Base Combo Settings'
				goodData = false;
			}

			obj.csType = PRICE_CS;
			// boBdObj.goodData = goodData;

			csh.cdt(obj,text, validResults, selParam, goodData);
		}	
	}


	// Price range NG



	function openRangeNgChg(mode){

		var orNgObj  = mtgv.cs.screenerData[OPEN_RANGE_NG];


		if(mtgv.cs.ng){
			orNgObj.enabled= true;
		}else{
			if(mode == 'SEARCH'){
				$("#orNg" ).prop("checked", true);
			}


			if(!htmlU.isChecked(OPEN_RANGE_NG +'CB')){
				$("#" + OPEN_RANGE_NG +'').remove();
				orNgObj.enabled= false;
				csu.dsf();
				return;
			}

			if(!htmlU.divExist(OPEN_RANGE_NG+'Td2Div')) {// Row Not Exist 
				var row = getOpeningRangeNgTr();
				$('#priceCtrlTab' ).append( row);
				orNgObj.enabled= true;
			}

		}


		csu.siop(orNgObj, [   'orNgtick1','orNgtick2'  ,'orNgtype' , 'orNgRange', 
				'orNgMinRan', 'orNgField', 'orNgMinTicks', 'orNgMaxTicks' ,'orNgWithinPc', 'orNgWithinHl']  , true);

		orNgObj.orNgBoBdOpt =  htmlU.getRadioVal('orNgBoBdRdoGrp');
		

		if(htmlU.isChecked('orNgAdvOpt')){
			orNgObj.advOpt = true;
		}else{
			orNgObj.advOpt = false;
		}

		orNgObj.goodData = true;

		var td =  getOpeningRangeNgTd();

		htmlU.addMsgToDiv('orNgTd2Div', true,  td);

		if(jsu.isNotNull(orNgObj.orNgMinRan)){
			if(!jsu.isPositiveNumInput ('orNgMinRan') ) orNgObj.goodData = false;
		}
		
		if(jsu.isNotNull(orNgObj.orNgMinTicks)){
			if(!jsu.isPositiveIntegerInput ('orNgMinTicks') ) orNgObj.goodData = false;			
		}

		if(jsu.isNotNull(orNgObj.orNgMaxTicks)){
			if(!jsu.isPositiveIntegerInput ('orNgMaxTicks') ) orNgObj.goodData = false;		
		}

		if(jsu.isNotNull(orNgObj.orNgWithinPc)){
			if(!jsu.isPositiveNumInput ('orNgWithinPc') ) orNgObj.goodData = false;		
		}



		csu.siop(orNgObj, [   'orNgtick1','orNgtick2'  ,'orNgtype' , 'orNgRange', 
				'orNgMinRan', 'orNgField', 'orNgMinTicks', 'orNgMaxTicks' ,'orNgWithinPc', 'orNgWithinHl']  , true);

		csu.dsf(); // displaySelectedFields()
	}
	
	function getOpeningRangeNgTr(){

		var html = '<tr id="'+OPEN_RANGE_NG+'"  > ' 
				+   createTd( createDiv(OPEN_RANGE_NG+'Td2Div', getOpeningRangeNgTd() ) ) + '</tr>';

		return html;
	}



	function getOpeningRangeNgTd(){
		var func = 'csp.ornc';

		var orNgObj  = mtgv.cs.screenerData[OPEN_RANGE_NG];

		if(orNgObj == null){
			orNgObj = { id: OPEN_RANGE_NG};
			mtgv.cs.screenerData[OPEN_RANGE_NG] = orNgObj;
		}
		if(jsu.isNull( orNgObj.orNgtick1) ){
			orNgObj.orNgtick1 = FREQ_MM15 ;
		}

		if(jsu.isNull( orNgObj.orNgtype) ){
			orNgObj.orNgtype = 'prBO' ;
		}

		var html ='<b>Open Range Strategies</b>';

		var ticks = csu.gct(orNgObj , 'tick1');
		html+= 	getDropDown(ticks, 'orNgtick1', '',func, null, orNgObj.orNgtick1) ;

		html+=  SP_3+ getDropDown(PR_BO_DWN_NG_LIST,  'orNgtype', null, func, null, orNgObj.orNgtype); // rangeBoDwnType

		// var isAdvOptionChecked = htmlU.isChecked('orNgAdvOpt');
		var isAdvOptionChecked = orNgObj.advOpt	

		html+=  SP_3+   htmlU.getCheckboxP('orNgAdvOpt', func,  (isAdvOptionChecked ? 'checked' : '' ), null  ) + ' Advance Options '

		if(isAdvOptionChecked){
			html+= BR_2;
			html+=  'Opening candle Range' + getDropDown(CANDLE_RANGE,  'orNgRange', null, func, null, orNgObj.orNgRange); // rangeBoDwnType
			
			if(jsu.isNull( orNgObj.orNgMinRan) ){
				orNgObj.orNgMinRan = 2 ;
			}

			html+= SP_2 + " Min Open Range in %" + getInputTxtParam( 'orNgMinRan' , 3, orNgObj.orNgMinRan, func , null) 
				+ htmlU.getSpan( '  (Optional) The Higher the better','grey', 10  )	;

			if(jsu.isNull( orNgObj.orNgtick2) ){
				orNgObj.orNgtick2 = FREQ_MM5 ;
			}			

			if(orNgObj.orNgtype == 'prBO' || orNgObj.orNgtype == 'prBDwn'){

				var orNgOPT = (orNgObj.orNgtype == 'prBO'  ? OR_NG_BO_OPTS : OR_NG_BD_OPTS )
				
				if(jsu.isNull( orNgObj.orNgBoBdOpt) ){
					orNgObj.orNgBoBdOpt = orNgOPT[0].id ;
				}

				html+= BR_2;
				
				html+= htmlU.crg('orNgBoBdRdoGrp', func, orNgOPT, orNgObj.orNgBoBdOpt, null, true  );

				html+= 	BR_2;
				
				html+=  SP_3+ "Subsequent  " + getDropDown(ticks,  'orNgtick2', null, func, null, orNgObj.orNgtick2) +" Candle"; // rangeBoDwnType

				html+=  SP_3+ "On Subsequent Candle's " + getDropDown(CLOSE_FIELDS,  'orNgField', null, func, null, orNgObj.orNgField); // rangeBoDwnType

				html+= 	BR_2;
				
				if(orNgObj.orNgBoBdOpt == 'orNgBoBdFake'){
					html+=  SP_3+ "Fake Break out within  -  Min (optional)";
				}else if(orNgObj.orNgBoBdOpt == 'orNgBoBdSupRes'){
					html+=  SP_3+ "Bouncing within  -  Min (optional)";
				}else if(orNgObj.orNgBoBdOpt == 'orNgBoBdSus'){
					html+=  SP_3+ "Subsequent  Candle's sustaining for  -  Min (optional)";
				}else{
					html+=  SP_3+ "Subsequent  Candle's Stay in Range  -  Min (optional)";	
				}

				html+= getInputTxtParam( 'orNgMinTicks' , 2,  orNgObj.orNgMinTicks , func,  null) ; 

				html+= ' Max (Optional) ';
				html+= getInputTxtParam( 'orNgMaxTicks' , 2,  orNgObj.orNgMaxTicks , func,  null) ; 

			// }else if(orNgObj.orNgtype == 'prBDwn'){

			}else if(orNgObj.orNgtype == 'prInRange'){	
				html+= 	BR_2;
				html+= " With Subsequent " + getDropDown(ticks,  'orNgtick2', null, func, null, orNgObj.orNgtick2) +" Candle's "; // rangeBoDwnType
				// html+= 	BR_2;
				html+=  SP_3+ getDropDown(CLOSE_FIELDS,  'orNgField', null, func, null, orNgObj.orNgField)  +' Price'; // rangeBoDwnType


				html+= 	BR_2;
				html+=  ' and is Within (Optional) ' + getInputTxtParam( 'orNgWithinPc' , 2,  orNgObj.orNgWithinPc , func,  null) ; 
				html+=  ' % of' +  getDropDown(HL_OPTIONS,  'orNgWithinHl', null, func, null, orNgObj.orNgWithinHl) ;




			}
		}

		var param = orNgObj.id+':'+orNgObj.id  ; 
		html+= csh.gept(orNgObj, PRICE_CS,  param);
		html+= SP_3 + csh.delIcon(param) ; 

		return html;
	}


	function validateOrNg(validResults){
		var orNgObj  = mtgv.cs.screenerData[OPEN_RANGE_NG];

		if(!orNgObj.enabled){
			return;
		}

		var ngType   = jsu.getObjFrmArr(PR_BO_DWN_NG_LIST, orNgObj.orNgtype );

		var ticks = csu.gct(orNgObj , 'tick1');

		var tick1Obj = jsu.getObjFrmArr(ticks, orNgObj.orNgtick1);		

		var  text =  '';

		text +=  htmlU.doBold('Open Range : ')

		text+= 'Opening : ' + tick1Obj.label ;
		text+= ",   Price '" + ngType.label + "'" ;

		var goodData = true;


		if(orNgObj.advOpt ){

			if(orNgObj.goodData){
				var canRan = jsu.getObjFrmArr(CANDLE_RANGE, orNgObj.orNgRange);			

				text+= ' On Candles "'+ canRan.label +'"';

				if(jsu.isNotNull(orNgObj.orNgMinRan)){
					text+= ' With Min Price Range of ' + orNgObj.orNgMinRan + '% ';
				}

				var identi = (orNgObj.orNgtype == 'prBO'  ? "Break Out" : "Break Down" )	

				if(orNgObj.orNgtype == 'prBO' || orNgObj.orNgtype == 'prBDwn'){
					
					var orNgOPT = (orNgObj.orNgtype == 'prBO'  ? OR_NG_BO_OPTS : OR_NG_BD_OPTS )

					var opt = jsu.getObjFrmArr(orNgOPT , orNgObj.orNgBoBdOpt);

					text+= " On Condition '"+ opt.label +"'";

					var tick2Obj = jsu.getObjFrmArr(ticks, orNgObj.orNgtick2);	

					var field =  jsu.getObjFrmArr(CLOSE_FIELDS,  orNgObj.orNgField );

					text += ' On ' + field.label + ' on Subsequent '+ tick2Obj.label + ' tick';
				}
			}else{
				text += 'Invalid Setting of Open Range Break out'
				goodData = false;
			}
		}

		// var selParam =  'priceBoBd' +':'+boBdObj.id ;// + '
		orNgObj.csType = PRICE_CS;
		csh.cdt(orNgObj,text, validResults, orNgObj.id, goodData);

	}


	// previous range Bo BD ..... 


	function previousRangeChange(mode){

		var obj  = mtgv.cs.screenerData[PREV_RANGE_BOBD];

		if(mtgv.cs.ng){
			obj.enabled= true;
		}else{

			if(mode == 'SEARCH'){
				$("#prevRngBoBd" ).prop("checked", true);
			}

			if(!htmlU.isChecked(PREV_RANGE_BOBD +'CB')){
				$("#" + PREV_RANGE_BOBD +'').remove();
				obj.enabled= false;
				csu.dsf();
				return;
			}

			if(!htmlU.divExist(PREV_RANGE_BOBD+'Td2Div')) {// Row Not Exist 
				var row = getPreviousRangeTr();
				$('#priceCtrlTab' ).append( row);
				obj.enabled= true;
			}

		}

		csu.siop(obj, [   'prevRangetick1','prevRangetick2'  ,'prevRangetype' , 'prevRangeRange', 'prevRangeperiod',
				'prevRangeMinRan', 'prevRangeField', 'prevRangeMinTicks', 'prevRangeMaxTicks' ,'prevRangeWithinPc', 'prevRangeWithinHl']  , true);

		obj.prevRangeBoBdOpt =  htmlU.getRadioVal('prevRangeBoBdRdoGrp');
		

		if(htmlU.isChecked('prevRangeAdvOpt')){
			obj.advOpt = true;
		}else{
			obj.advOpt = false;
		}

		obj.goodData = true;

		var td =  getPreviousRangeTd();

		htmlU.addMsgToDiv(PREV_RANGE_BOBD +  'Td2Div', true,  td);

		if(jsu.isNotNull(obj.prevRangeMinRan)){
			if(!jsu.isPositiveNumInput ('prevRangeMinRan') ) obj.goodData = false;
		}
		
		if(jsu.isNotNull(obj.prevRangeMinTicks)){
			if(!jsu.isPositiveIntegerInput ('prevRangeMinTicks') ) obj.goodData = false;			
		}

		if(jsu.isNotNull(obj.prevRangeMaxTicks)){
			if(!jsu.isPositiveIntegerInput ('prevRangeMaxTicks') ) obj.goodData = false;		
		}

		if(jsu.isNotNull(obj.prevRangeWithinPc)){
			if(!jsu.isPositiveNumInput ('prevRangeWithinPc') ) obj.goodData = false;		
		}


		if(obj.advOpt){


			if(!jsu.isPositiveIntegerInput ('prevRangeperiod') || !jsu.inputNumberRange ('prevRangeperiod', 1, 100)  ) {
				obj.goodData = false;
			}
		}


		csu.siop(obj, [   'prevRangetick1','prevRangetick2'  ,'prevRangetype' , 'prevRangeRange', 'prevRangeperiod',
				'prevRangeMinRan', 'prevRangeField', 'prevRangeMinTicks', 'prevRangeMaxTicks' ,'prevRangeWithinPc', 'prevRangeWithinHl']  , true);

		csu.dsf(); // displaySelectedFields()
	}


	function getPreviousRangeTr(){

		var html = '<tr id="'+PREV_RANGE_BOBD+'"  > ' 
				+   createTd( createDiv(PREV_RANGE_BOBD +  'Td2Div', getPreviousRangeTd() ) ) + '</tr>';

		return html;
	}


	function getPreviousRangeTd(){
		var func = 'csp.prch';

		var obj  = mtgv.cs.screenerData[PREV_RANGE_BOBD];

		if(obj == null){
			obj = { id: PREV_RANGE_BOBD};
			mtgv.cs.screenerData[PREV_RANGE_BOBD] = obj;
		}

		var isAdvOptionChecked = obj.advOpt	
		if(jsu.isNull( obj.prevRangetick1) ){

			// if
			obj.prevRangetick1 = (mtgv.mtpp.rt) ?  'day' : 'week';

		}

		if(jsu.isNull( obj.prevRangetype) ){
			obj.prevRangetype = 'prBO' ;
		}

		var html ='<b>Previous Range Strategies</b> ';

		
		html+= 'Previous '  	;

		if(isAdvOptionChecked){
			if(jsu.isNull( obj.prevRangeperiod) ){
				obj.prevRangeperiod = 1 ;
			}
			html+=   getInputTxtParam( 'prevRangeperiod' , 3, obj.prevRangeperiod, func , null) ;
			html += htmlU.getSpan( '  Val Between [1 to 100]','grey', 10  ) +' '
		}

		html+=	getDropDown(pdef.prt(), 'prevRangetick1', '',func, null, obj.prevRangetick1) ;

		html+=  SP_3+ getDropDown(PR_BO_DWN_NG_LIST,  'prevRangetype', null, func, null, obj.prevRangetype); // rangeBoDwnType

		// var isAdvOptionChecked = htmlU.isChecked('prevRangeAdvOpt');
		

		html+=  SP_3+   htmlU.getCheckboxP('prevRangeAdvOpt', func,  (isAdvOptionChecked ? 'checked' : '' ), null  ) + ' Advance Options '

		if(mtgv.mtpp.rt){
			var addiMsg =''
			if(obj.prevRangetick1 =='week' || obj.prevRangetick1=='mth'){
				addiMsg ='For Breakout / Down Daily Tick is used'
			}else{
				addiMsg ='For Breakout / Down 5 Min Tick is used'
			}
			html+= SP_3 + htmlU.getSpan(addiMsg, 'grey', 10);
		}

		if(isAdvOptionChecked){


			html+= BR_2;
			html+=  'Candle Range' + getDropDown(CANDLE_RANGE,  'prevRangeRange', null, func, null, obj.prevRangeRange); // rangeBoDwnType
			
			if(jsu.isNull( obj.prevRangeMinRan) ){
				obj.prevRangeMinRan = 2 ;
			}

			html+= SP_2 + " Min Previous Range in %" + getInputTxtParam( 'prevRangeMinRan' , 3, obj.prevRangeMinRan, func , null) 
				+ htmlU.getSpan( '  (Optional) The Higher the better','grey', 10  )	;

			// if(jsu.isNull( obj.prevRangetick2) ){
			// 	obj.prevRangetick2 = FREQ_MM5 ;
			// }			

			if(obj.prevRangetype == 'prBO' || obj.prevRangetype == 'prBDwn'){

				var ticks = pdef .prdt( obj.prevRangetick1 );

				var prevRangeOPT = (obj.prevRangetype == 'prBO'  ? PREV_RANGE_BO_OPTS : PREV_RANGE_BD_OPTS )
				
				if(jsu.isNull( obj.prevRangeBoBdOpt) ){
					obj.prevRangeBoBdOpt = prevRangeOPT[0].id ;
				}

				html+= BR_2;
				
				html+= htmlU.crg('prevRangeBoBdRdoGrp', func, prevRangeOPT, obj.prevRangeBoBdOpt, null, true  );

				html+= 	BR_2;
				
				html+=  SP_3+ "Subsequent  " + getDropDown(ticks,  'prevRangetick2', null, func, null, obj.prevRangetick2) +" Candle"; // rangeBoDwnType

				html+=  SP_3+ "On Subsequent Candle's " + getDropDown(CLOSE_FIELDS,  'prevRangeField', null, func, null, obj.prevRangeField); // rangeBoDwnType

				html+= 	BR_2;
				
				if(obj.prevRangeBoBdOpt == 'prevRangeBoBdFake'){
					html+=  SP_3+ "Fake Break out within  -  Min (optional)";
				}else if(obj.prevRangeBoBdOpt == 'prevRangeBoBdSupRes'){
					html+=  SP_3+ "Bouncing within  -  Min (optional)";
				}else if(obj.prevRangeBoBdOpt == 'prevRangeBoBdSus'){
					html+=  SP_3+ "Subsequent  Candle's sustaining for  -  Min (optional)";
				}else{
					html+=  SP_3+ "Subsequent  Candle's Stay in Range  -  Min (optional)";	
				}

				html+= getInputTxtParam( 'prevRangeMinTicks' , 2,  obj.prevRangeMinTicks , func,  null) ; 

				html+= ' Max (Optional) ';
				html+= getInputTxtParam( 'prevRangeMaxTicks' , 2,  obj.prevRangeMaxTicks , func,  null) ; 

			// }else if(obj.prevRangetype == 'prBDwn'){
/*
			}else if(obj.prevRangetype == 'prInRange'){	
				html+= 	BR_2;
				html+= " With Subsequent " + getDropDown(ticks,  'prevRangetick2', null, func, null, obj.prevRangetick2) +" Candle's "; // rangeBoDwnType
				// html+= 	BR_2;
				html+=  SP_3+ getDropDown(CLOSE_FIELDS,  'prevRangeField', null, func, null, obj.prevRangeField)  +' Price'; // rangeBoDwnType


				html+= 	BR_2;
				html+=  ' and is Within (Optional) ' + getInputTxtParam( 'prevRangeWithinPc' , 2,  obj.prevRangeWithinPc , func,  null) ; 
				html+=  ' % of' +  getDropDown(HL_OPTIONS,  'prevRangeWithinHl', null, func, null, obj.prevRangeWithinHl) ;

*/


			}
		}

		var param = obj.id+':'+ obj.id  ; 
		html+= csh.gept(obj, PRICE_CS,  param);
		html+= SP_3 + csh.delIcon(param) ; 

		return html;
	}


	function validatePrevRange(validResults){
		var obj  = mtgv.cs.screenerData[PREV_RANGE_BOBD];

		if(!obj.enabled){
			return;
		}

		var ngType   = jsu.getObjFrmArr(PR_BO_DWN_NG_LIST, obj.prevRangetype );

		var ticks = csu.gct(obj , 'tick1');

		var tick1Obj = jsu.getObjFrmArr(pdef.prt(), obj.prevRangetick1);		

		var  text =  '';

		text +=  htmlU.doBold('Previous Range : ')

		text+= 'Opening : ' + tick1Obj.label ;
		text+= ",   Price '" + ngType.label + "'" ;

		var goodData = true;


		if(obj.advOpt ){

			if(obj.goodData){
				var canRan = jsu.getObjFrmArr(CANDLE_RANGE, obj.prevRangeRange);			

				text+= ' On Candles "'+ canRan.label +'"';

				if(jsu.isNotNull(obj.prevRangeMinRan)){
					text+= ' With Min Price Range of ' + obj.prevRangeMinRan + '% ';
				}

				var identi = (obj.prevRangetype == 'prBO'  ? "Break Out" : "Break Down" )	

				if(obj.prevRangetype == 'prBO' || obj.prevRangetype == 'prBDwn'){
					
					var prevRangeOPT = (obj.prevRangetype == 'prBO'  ? PREV_RANGE_BO_OPTS : PREV_RANGE_BD_OPTS )

					var opt = jsu.getObjFrmArr(prevRangeOPT , obj.prevRangeBoBdOpt);

					text+= " On Condition '"+ opt.label +"'";

					var tick2Obj = jsu.getObjFrmArr(ticks, obj.prevRangetick2);	

					var field =  jsu.getObjFrmArr(CLOSE_FIELDS,  obj.prevRangeField );

					text += ' On ' + field.label + ' on Subsequent '+ tick2Obj.label + ' tick';
				}
			}else{
				text += 'Invalid Setting of Open Range Break out'
				goodData = false;
			}
		}

		// var selParam =  'priceBoBd' +':'+boBdObj.id ;// + '
		obj.csType = PRICE_CS;
		csh.cdt(obj,text, validResults, obj.id, goodData);

	}



	// ----------------- GAP NG GAPS_NG Starts

	function gapsNgChg(){
		var obj  = mtgv.cs.screenerData[GAPS_NG];


		if(mtgv.cs.ng){
			obj.enabled= true;
		}else{
			if(!htmlU.isChecked(GAPS_NG +'CB')){
				$("#" + GAPS_NG +'').remove();
				obj.enabled= false;
				csu.dsf();
				return;
			}

			if(!htmlU.divExist(GAPS_NG+'Td2Div')) {// Row Not Exist 
				var row = getGapsNgTr();
				$('#priceCtrlTab' ).append( row);
				obj.enabled= true;
			}
		}

		var FIELDS_TO_VAL = [  'gapType'  ,    'minGapPc',
				 'minTick' ,  'maxTick' ,
				 'tick1' ,  'candleRange' ,  'tick2' ,  'field2',
				 'withinPc'
			];

		
		csu.siop(obj,FIELDS_TO_VAL   );

		obj.gapNgOpt =  htmlU.getRadioVal('gapNgOptGrp');
		

		if(htmlU.isChecked(GAPS_NG +'AdvOpt')){
			obj.advOpt = true;
		}else{
			obj.advOpt = false;
		}

		obj.gapTypeAdv =  htmlU.getRadioVal( GAPS_NG +'AdvRdoGrp');

		obj.goodData = true;

		var td =  getGapNgTd();

		htmlU.addMsgToDiv(GAPS_NG + 'Td2Div', true,  td);

		// TODO ..... Validations

		if(!jsu.isPositiveNumInput (GAPS_NG+ 'minGapPc') ) obj.goodData = false;

		if(obj.advOpt){
			// Advance Options .... 

			if(jsu.containsString(['gapNgRunAway', 'gapNgFill' , 'gapNgFillPot'] ,obj.gapTypeAdv ) ){

				if(!jsu.isInputPositiveNumber (GAPS_NG+ 'minTick') 
					|| ! jsu.inputNumberRange(GAPS_NG+ 'minTick' , 1, 10) ) {
					 obj.goodData = false; 
				}

				if(jsu.containsString(['gapNgRunAway', 'gapNgFill'] ,obj.gapTypeAdv ) ){
					if(!jsu.isInputPositiveNumber (GAPS_NG+ 'maxTick') 
						|| ! jsu.inputNumberRange(GAPS_NG+ 'maxTick' , 1, 10) ) {
						 obj.goodData = false; 
					}
				}

				if(jsu.containsString(['gapNgFillPot'] ,obj.gapTypeAdv ) ){
					if(!jsu.isInputPositiveNumber (GAPS_NG+ 'withinPc') 
						|| ! jsu.inputNumberRange(GAPS_NG+ 'withinPc' , 1, 10) ) {
						 obj.goodData = false; 
					}
				}

			}
		}


		csu.siop(obj,FIELDS_TO_VAL   );

		csu.dsf(); // displaySelectedFields()
	}
	


	function getGapsNgTr(){
		var html = '<tr id="'+GAPS_NG+'"  > ' 
				+   createTd( createDiv( GAPS_NG + 'Td2Div', getGapNgTd() ) ) + '</tr>';
		return html;
	}

	function getGapNgTd(){

		var func = 'csp.gnc';

		var obj  = mtgv.cs.screenerData[GAPS_NG];

		if(obj == null){
			obj = { id: GAPS_NG};
			mtgv.cs.screenerData[GAPS_NG] = obj;
		}


		if(jsu.isNull( obj.minGapPc) ){
			obj.minGapPc = 1 ;
		}

		var isAdvOptionChecked = obj.advOpt	

		var html ='<b>Gap Strategies : </b>';

		html += 'Min ' + getInputTxtParam(GAPS_NG+ 'minGapPc' , 2,  obj.minGapPc , func,  null)  + ' %'; 

		html+= SP_3 + getDropDown(GAP_NG_OPT,  GAPS_NG+'gapType', null, func, null, obj.gapType); 

		html+=  SP_3+   htmlU.getCheckboxP(GAPS_NG+ 'AdvOpt', func,  (isAdvOptionChecked ? 'checked' : '' ), null  ) + ' Advance Options '

		if(isAdvOptionChecked){

			html+= BR_2;

			var ticks = csu.gct(obj , 'tick1');

			html+=  SP_3+ " On  " + getDropDown(ticks,  GAPS_NG+ 'tick1', null, func, null, obj.tick1) ;

			// html+=  SP_3+ getDropDown(CLOSE_FIELDS, GAPS_NG+ 'field1', null, func, null, obj.field1); // rangeBoDwnType
			html+=  SP_3+ getDropDown(CANDLE_RANGE,   GAPS_NG+ 'candleRange', null, func, null, obj.candleRange); // rangeBoDwnType


			html+= BR_2;

			var gapTypeAdvOptions = (obj.gapType == 'gapUp'  ? GAP_UP_NG_OPT : GAP_DOWN_NG_OPT );
			
			if(jsu.isNull(obj.gapTypeAdv)) obj.gapTypeAdv = gapTypeAdvOptions[0].id ; 

			html+= htmlU.crg(GAPS_NG+ 'AdvRdoGrp', func, gapTypeAdvOptions, obj.gapTypeAdv, null, true  );

			if(jsu.containsString(['gapNgRunAway'] ,obj.gapTypeAdv ) ){

				if(jsu.isNull(obj.minTick)) obj.minTick =2;
				if(jsu.isNull(obj.maxTick)) obj.maxTick =5;


				html+= BR_2;
				html+= ' for min ' + getInputTxtParam(GAPS_NG+ 'minTick' , 2,  obj.minTick , func,  null) ; 

				html+= ' to max ' + getInputTxtParam(GAPS_NG+ 'maxTick' , 2,  obj.maxTick , func,  null) ; 
				html+= htmlU.getSpan('Valid range 1 to 10' , 'grey', 10)

				html+= BR_2;
				html+=  SP_3+ " Using Subsequent  " + getDropDown(ticks, GAPS_NG+ 'tick2', null, func, null, obj.tick2) +" Candle"; // rangeBoDwnType

				html+=  SP_3+ " " + getDropDown(CLOSE_FIELDS, GAPS_NG+ 'field2', null, func, null, obj.field2); // rangeBoDwnType
			
			}else if(jsu.containsString(['gapNgFill'] ,obj.gapTypeAdv ) ){

				if(jsu.isNull(obj.minTick)) obj.minTick =2;
				if(jsu.isNull(obj.maxTick)) obj.maxTick =5;

				html+= BR_2;
				html+= ' After min ' + getInputTxtParam(GAPS_NG+ 'minTick' , 2,  obj.minTick , func,  null) ; 

				html+= ' to max ' + getInputTxtParam(GAPS_NG+ 'maxTick' , 2,  obj.maxTick , func,  null) ; 
				html+= htmlU.getSpan('Valid range 1 to 10' , 'grey', 10)

				html+= BR_2;
				html+=  SP_3+ "Subsequent  " + getDropDown(ticks, GAPS_NG+ 'tick2', null, func, null, obj.tick2) +" Candle"; // rangeBoDwnType

				html+=  SP_3+ " " + getDropDown(CLOSE_FIELDS, GAPS_NG+ 'field2', null, func, null, obj.field2); // rangeBoDwnType

			}else if(jsu.containsString(['gapNgFillPot'] ,obj.gapTypeAdv ) ){

				if(jsu.isNull(obj.minTick)) obj.minTick =5;
				if(jsu.isNull(obj.withinPc)) obj.withinPc =1;

				html+= BR_2;
				html+= '  and Gap sustaining for minimum  ' + getInputTxtParam(GAPS_NG+ 'minTick' , 2,  obj.minTick , func,  null) ; 

				
				html+= htmlU.getSpan('Valid range 1 to 10' , 'grey', 10)

				html+= BR_2;
				html+=  SP_3+ "Subsequent  " + getDropDown(ticks, GAPS_NG+ 'tick2', null, func, null, obj.tick2) +" Candle"; // rangeBoDwnType

				html+=  SP_3+ " " + getDropDown(CLOSE_FIELDS, GAPS_NG+ 'field2', null, func, null, obj.field2); // rangeBoDwnType

				html+= BR_2;

				html+= ' And is currently within ' + getInputTxtParam(GAPS_NG+ 'withinPc' , 2,  obj.withinPc , func,  null) 
					+' % of Fill '; 


			}

		}


		var param = obj.id+':'+ obj.id  ; 
		html+= csh.gept(obj, PRICE_CS,  param);
		html+= SP_3 + csh.delIcon(param) ; 

		return html;

	}


	function validateGapNg(validResults){

		var obj  = mtgv.cs.screenerData[GAPS_NG];

		if(!obj.enabled){
			return;
		}


		// var FIELDS_TO_VAL = [  'gapType'  ,    'minGapPc',
		// 		 'minTick' ,  'maxTick' ,
		// 		 'tick1' ,  'candleRange' ,  'tick2' ,  'field2',
		// 		 'withinPc'
		// 	];

		var text =''

		text+= htmlU.doBold("Gap Strategies : ");

		if(obj.goodData){

			text += 'Min '+ obj.minGapPc + '% '

			var gapType = jsu.getObjFrmArr(GAP_NG_OPT ,obj.gapType );

			text += "'" +gapType.label + "'";

			if(obj.advOpt){

				var ticks = csu.gct(obj , 'tick1');

				var candleType =  jsu.getObjFrmArr(CANDLE_RANGE ,obj.candleRange );

				text += ' on ' +  candleType.label;
			}


			if(jsu.containsString(['gapNgRunAway', 'gapNgFill' , 'gapNgFillPot'] ,obj.gapTypeAdv ) ){
				text = 'Min '+ obj.minGapPc + '% '

				var gapTypeAdvOptions = (obj.gapType == 'gapUp'  ? GAP_UP_NG_OPT : GAP_DOWN_NG_OPT );

				var gapTypeOpt = jsu.getObjFrmArr(gapTypeAdvOptions ,obj.gapTypeAdv );

				text += "'" +gapTypeOpt.label + "'";

				var ticks = csu.gct(obj , 'tick1');

				var candleType =  jsu.getObjFrmArr(CANDLE_RANGE ,obj.candleRange );

				text += ' on ' +  candleType.label;


			}



			// html+=  SP_3+ getDropDown(CANDLE_RANGE,   GAPS_NG+ 'candleRange', null, func, null, obj.candleRange); // rangeBoDwnType



		}else{
			text = 'Invalid Value for Gap Strategies ....';
		}

		obj.csType = PRICE_CS;

		csh.cdt(obj,text, validResults, obj.id, obj.goodData);	

	}


	// ----------------- GAP NG GAPS_NG Ends


	// -----------  OPEN_RANGE_OLD = 'rangeBoDwn';  ------


	function openRangeOldChange(){

		// rangeBoDwn

		// var orNgObj  = mtgv.cs.screenerData[OPEN_RANGE_OLD];

		var obj = mtgv.cs. screenerData[OPEN_RANGE_OLD];

		if(mtgv.cs.ng){
			obj.enabled= true;
		}else{
			if(!htmlU.isChecked(OPEN_RANGE_OLD+'CB')){
				$("#" + OPEN_RANGE_OLD +'').remove();
				obj.enabled= false;
				csu.dsf();
				return;
			}

			if(!htmlU.divExist(OPEN_RANGE_OLD+'')) {// Row Not Exist 
				var row = getOpeningRangeOldTr();
				$('#priceCtrlTab' ).append( row);
				obj.enabled= true;
			}
		}


		// obj. id =  PRICE_RANGE_BREAK_OUT_DOWN ;

		csu.setProp([obj], [  'type' ,  'minTicks' , 'maxTicks' ,   'baseTick' , 'boDnTick'  ,'candleRange' , 'susTicks'], obj.id);

		var td =  getOpeningRangeOldTd();

		htmlU.addMsgToDiv(OPEN_RANGE_OLD+'Td2Div', true,  td);

		var validMin = obj.id+'minTicks';
		
		var goodData = true;

		if(!jsu.isIntegerInput(validMin) ||			!jsu.inputNumberRange(validMin , 1,10  )){
			goodData = false;
		}

		var validMax = obj.id+'maxTicks';

		if(!jsu.isIntegerInput(validMax) || !jsu.inputNumberRange(validMax , 1,75  )){
			goodData = false;
		}

		if(   obj.type == 'prBOSus' ||   obj.type == 'prBDwnSus'  ){
			var validSus = obj.id+'susTicks';

			if(!jsu.isIntegerInput(validSus) || !jsu.inputNumberRange(validSus , 1,10 ) ){
				goodData = false;
			}
		}
		
		csu.setProp([obj], [  'type' ,  'minTicks' , 'maxTicks' , 'baseTick' , 'boDnTick' ,'candleRange', 'susTicks'], obj.id);
		obj.goodData = goodData;

		csu.dsf(); // displaySelectedFields();
	}

	function getOpeningRangeOldTr(){

		var html = '<tr id="'+OPEN_RANGE_OLD+'"  > '
				+  htmlU.getSpan('Older Version use <b>Open Range Strategies</b> intead ' , 'orange', 10 ) +

				'</td> ' 
				+   createTd( createDiv(OPEN_RANGE_OLD +'Td2Div', getOpeningRangeOldTd() ) ) + '</tr>';

		return html;
	}


	function getOpeningRangeOldTd(){


		var func = 'csp.oroc';	

		var baseTicks = csu.goit();


		var obj = mtgv.cs. screenerData[OPEN_RANGE_OLD];

		var type = obj. id ;

		if(jsu.isNull(obj.baseTick) && baseTicks.length>2){
			obj.baseTick = baseTicks[2].id;
		}

		var html =  htmlU.doBold('Open Range ') +'(Old)';

		html+= 'Opening ';
		html+= getDropDown(baseTicks, type+'baseTick', '',func, obj.id,  obj[ 'baseTick']); 
		// html+= ' Tick ';
		html+=SP_3;
		html+=  getDropDown(CANDLE_RANGE,  type+ 'candleRange', null, func, type, obj[ 'candleRange']); // gapFill
		html+=  ' Tick '

		html+=SP_3;	
		html+= getDropDown(PR_BO_DWN_LIST,  type+ 'type', null, func, type, obj[ 'type']); // rangeBoDwnType
		html+=SP_3;


		if( obj.type !=null && obj.type != CS_NOT_SELECTED){

			var boDnTicks = csu.goit();

			html+= BR_2;

			html+= getSpan(' after staying in the Range of last ', 'grey', 10);;

			html+= getInputTxtParam( type+'minTicks' , 2,  obj[ 'minTicks'], func,  obj.id) ; 

			html+= ' to  ';
			html+= getInputTxtParam( type+'maxTicks' , 2,  obj[ 'maxTicks'], func,  obj.id) ; 

			html+=SP_3;	
			html+=getDropDown(boDnTicks, type+'boDnTick', '',func, obj.id, obj[ 'boDnTick']); 
			html+= getSpan(' Ticks - Valid range 1 to 75', 'grey', 10) ; //' Tick & Sustaining';

			if(   obj.type == 'prBOSus' ||   obj.type == 'prBDwnSus'  ){
				html+= ' and sustaining for max  ';
				html+= getInputTxtParam( type+'susTicks' , 2,  obj[ 'susTicks'], func,  obj.id) ; 	
				html+= ' Ticks ';
			}

		}

		var param = obj.id+':'+ obj.id  ; 
		html+= csh.gept(obj, PRICE_CS,  param);
		html+= SP_3 + csh.delIcon(param) ; 
		return html;

	}

	function validateOpeningRangeOld(validResults){
					var obj = mtgv.cs. screenerData.rangeBoDwn;


				// var orNgObj  = mtgv.cs.screenerData[OPEN_RANGE_NG];

		if(!obj.enabled){
			return;
		}		


			obj.csType = PRICE_CS;

			var rangeBoDwnType = getObjFrmArr( PR_BO_DWN_LIST,  obj.type); 

			

			if(rangeBoDwnType!=null && rangeBoDwnType.id != CS_NOT_SELECTED){

				var baseTicks = csu.goit();
				var boDnTicks = csu.goit();

				

				if(obj.goodData){

					var baseTick = getObjFrmArr( baseTicks,  obj.baseTick ); 
					var boDnTick = getObjFrmArr( boDnTicks,  obj.boDnTick ); 
					// var ticks = getObjFrmArr( TICK_PERIOD,  obj.Ticks ); 

					var candleRange = getObjFrmArr( CANDLE_RANGE,  obj.candleRange ); 


					var text =  rangeBoDwnType.label +  ' on Opening  '+baseTick.label + ' "' + candleRange.label +'" Tick '
					

					+' after staying in Range of last '	+ obj.minTicks + ' to  '+  obj.maxTicks  + ' ' + boDnTick.label + ' Ticks';
				


					if(   obj.type == 'prBOSus' ||   obj.type == 'prBDwnSus'  ){
					
						text+= ' and sustaining for max  ' + obj.susTicks + ' Ticks';
						// csh.cdt(obj,text, validResults, obj.id, true);	
						

						// html+= ' and sustaining for min  ';
						// html+= getInputTxtParam( type+'susTicks' , 2,  obj[ 'susTicks'], func,  obj.id) ; 	
						// html+= ' Ticks ';
					}
						csh.cdt(obj,text, validResults, obj.id, true);		

				}else{
					var text =  'Invalid Value of Opening range Tick - Supported Value from 1 to 75';

					csh.cdt(obj,text, validResults, obj.id, false);	
				}

			}
	}


	// ------------- OPEN_RANGE_OLD = 'rangeBoDwn';  ------

	// Trending candle Start ...... 


	function trendingCandleChange( mode){

		var goodData = true;
		var obj = mtgv.cs. screenerData.trendingCandleBoDwn;



		if(mtgv.cs.ng){
			obj.enabled= true;
		}else{

			if(mode == 'SEARCH'){
				$("#trendingCandleBoDwn" ).prop("checked", true);
			}


			
			if(!htmlU.isChecked(TREND_CANDLE_BOBD+'CB')){
				$("#" + TREND_CANDLE_BOBD +'').remove();
				obj.enabled= false;
				csu.dsf();
				return;
			}

			if(!htmlU.divExist(TREND_CANDLE_BOBD+'Td2Div')) {// Row Not Exist 
				var row = getTrendCandleTr();
				$('#priceCtrlTab' ).append( row);
				obj.enabled= true;
			}
		}



		obj. id =  TREND_CANDLE_BOBD ;

		csu.setProp([obj], [  'type' ,  'minTicks' , 'baseTick' , 'withinPC' , 'candleRange' ], obj.id);

		var html = getTrendCandleTd(obj. id );

		htmlU.addMsgToDiv( obj.id + 'Td2Div' , true, html);

		var validV1 = obj.id+'minTicks';

		if(!jsu.isIntegerInput(validV1) ||  !jsu.inputNumberRange(validV1 , 1,10 ) ){
			goodData = false;
		}

		csu.setProp([obj], [  'type' ,  'minTicks' ,   'baseTick' , 'withinPC' , 'candleRange' ], obj.id);

		obj.goodData = goodData;
		
		csu.dsf(); // displaySelectedFields()

	}


	function getTrendCandleTr(){

		var html = '<tr id="'+TREND_CANDLE_BOBD+'"  > ' 
				+   createTd( createDiv( TREND_CANDLE_BOBD + 'Td2Div', getTrendCandleTd() ) ) + '</tr>';
		return html;
	}


	function getTrendCandleTd(){

		var func = 'csp.tcc';

		var obj = mtgv.cs.screenerData[TREND_CANDLE_BOBD];

			type = obj.id 

			var baseTicks = csu.gct(obj ,  obj.baseTick);

			// if(jsu.isNull(obj.type) ){
			// 	obj.type = TREND_CANDLE_LIST[1].id;
			// }

			var html =  htmlU.doBold('Trending Candles'); 


			html+=  getDropDown(TREND_CANDLE_LIST,  type+ 'type', null, func, type, obj[ 'type']); // gapFill
			html+=SP_3;
			

			// if(obj.type !=null && obj.type != CS_NOT_SELECTED){
				html+= BR_2

				html+= 'on ' + getDropDown(baseTicks,  type+ 'baseTick', null, func, type, obj[ 'baseTick']); // gapFill
				// html+=' Tick ';


				html+= ' Tick ' + getDropDown(CANDLE_RANGE,  type+ 'candleRange', null, func, type, obj[ 'candleRange']); // gapFill

				html+= BR_2

				if(jsu.isNull(obj.minTicks )){
					obj.minTicks =3;
				}


				html+= ' for minimum ' ;
				html+= getInputTxtParam( type+'minTicks' , 2,  obj[ 'minTicks'], func,  obj.id) +' Ticks ';

				if( obj.type == 'hhHl' || obj.type =='lhLl' ){

					
				}

				if( obj.type == 'hhHlBD' ) html+= " followed by lower Price than Previous Low";

				if(  obj.type =='lhLlBO' )   html+= " followed by Higher Price than Previous High";

				if( obj.type == 'hhHlBDPot' ) {
					html+= BR_2
					html+= " with latest within " +
					getDropDown(PC_COMP_LOW, type+'withinPC', '',func, obj.id, obj[ 'withinPC'])

					+"  % Previous Low";
				}	
				if(  obj.type =='lhLlBOPot' ){
					html+= BR_2
					html+= " with latest within " +
					getDropDown(PC_COMP_LOW, type+'withinPC', '',func, obj.id, obj[ 'withinPC'])

					+"  % Previous Low";
				}   

			// }
			var param = obj.id+':'+ obj.id  ; 
			html+= csh.gept(obj, PRICE_CS,  param);
			html+= SP_3 + csh.delIcon(param) ; 
			return html;
	}

	function validateTrendCandle(validResults){
		var obj = mtgv.cs. screenerData.trendingCandleBoDwn;
		obj.csType = PRICE_CS;

		if(!obj.enabled){
			return;
		}


		var trendingCandleBoDwn = getObjFrmArr( TREND_CANDLE_LIST,  obj.type); 
	


		if(trendingCandleBoDwn!=null && trendingCandleBoDwn.id != CS_NOT_SELECTED){

			var text = '' ;
			var good  = true;

			var validV1 = obj.id+'minTicks';

			if(obj.goodData){

				var baseTicks = csu.gct(obj ,  'baseTick');
				var baseTick = getObjFrmArr( baseTicks,  obj.baseTick ); 

				var candleRange = getObjFrmArr( CANDLE_RANGE,  obj.candleRange ); 

				text +=  trendingCandleBoDwn.label +' on ' + baseTick.label ;

				text += ' Tick '+ candleRange.label;

				text+= ' for minimum  '  +obj.minTicks  + " Ticks "; 

				if( obj.type == 'hhHlBD' ) text+= " followed by lower Price than Previous Low";

				if(  obj.type =='lhLlBO' )   text+= " followed by Higher Price than Previous High";

				if( obj.type == 'hhHlBDPot' ) {
					text+= " with latest within " + obj.withinPC  +"  % Previous Low";
				}	
				if(  obj.type =='lhLlBOPot' ){
					text+= " with latest within " + obj.withinPC +"  % Previous High";
				}   
			}else{
				text = 'Invalid Tick value for Trending candle';
				good = false;
			}


			csh.cdt(obj,text, validResults, obj.id, good);	

		}

	}


	// Trending candle ends ...... 


	// GAP Runaway 

	function gapRunawayChange(){ // grc

		var goodData = true;

			var obj = mtgv.cs. screenerData.gapRunAway;

		if(mtgv.cs.ng){
			obj.enabled= true;
		}else{	
			if(!htmlU.isChecked(GAP_RUNAWAY + 'CB')){
				$("#" + GAP_RUNAWAY +'').remove();
				obj.enabled= false;
				csu.dsf();
				return;
			}

			if(!htmlU.divExist(GAP_RUNAWAY+'Td2Div')) {// Row Not Exist 
				var row = getGapRunAwayTr();
				$('#priceCtrlTab' ).append( row);
				obj.enabled= true;
			}
		}	

			obj. id =  GAP_RUNAWAY ;

			csu.setProp([obj], [  'type' ,   'baseTick' , 'runAwayTick' ,'candleRange' ,  'minTicks' , 'maxTicks' , 'gapPc'], obj.id);

			var html = createGapRunAwayTd(obj. id );

			htmlU.addMsgToDiv( obj.id + 'Div' , true, html);


			var validMinGap = obj.id+'gapPc';
			// jsu.inputNumberRange(validMinGap);
			if(!jsu.inputNumberRange(validMinGap , .1,20  )){
				goodData = false;
			}



			var validMin = obj.id+'minTicks';
			if(!jsu.isIntegerInput(validMin) ||			!jsu.inputNumberRange(validMin , 1,10  )){
				goodData = false;
			}


			var validMax = obj.id+'maxTicks';
			if(!jsu.isIntegerInput(validMax) || !jsu.inputNumberRange(validMax , 1,50  )){
				goodData = false;
			}



			csu.setProp([obj], [  'type' ,  'baseTick' , 'runAwayTick' ,'candleRange' ,  'minTicks' , 'maxTicks' , 'gapPc'], obj.id);

			obj.goodData = goodData;

			csu.dsf(); // displaySelectedFields()
	}

	function getGapRunAwayTr(){
		var html = '<tr id="'+GAP_RUNAWAY+'"  > ' 
				+   createTd( createDiv( GAP_RUNAWAY + 'Td2Div', createGapRunAwayTd() ) ) + '</tr>';
		return html;
	}

	function createGapRunAwayTd(){

		var type = GAP_RUNAWAY;

		var obj = mtgv.cs. screenerData[type];

			obj. id =  type
		var func = 'csp.grc';

			if(jsu.isNull(obj.gapPc)){
				obj.gapPc = PC_COMP_LOW[5].id;
			}			

			var html =  htmlU.doBold('Gap Up/Down Run Away');
			html+= ' Min ' +  getInputTxtParam( type+'gapPc' , 2,  obj[ 'gapPc'], func,  obj.id) ;  //  getDropDown(PC_COMP_LOW,  type+ 'gapPc', null, func, type, obj[ 'gapPc']);  

			html+=' %';

			html+= getDropDown(GAP_UP_DWN_LIST,  type+ 'type', null, func, type, obj[ 'type']); // gapRunAway
			
			html+=SP_3;


			// if(obj.type !=null && obj.type != CS_NOT_SELECTED){

				var baseTicks = csu.gct(obj ,  obj.baseTick);
				var runAwayTick = csu.gct(obj ,  obj.runAwayTick);

				html+= ' on ';
				html+= getDropDown(baseTicks, type+'baseTick', '',func, obj.id,  obj[ 'baseTick']); 
				// html+= ' Tick';

				html+= ' Tick ' + getDropDown(CANDLE_RANGE,  type+ 'candleRange', null, func, type, obj[ 'candleRange']); 

				html+= BR_2;

				html+= getSpan(' and Run away in range of last  ', 'grey', 10);;
				html+= getInputTxtParam( type+'minTicks' , 2,  obj[ 'minTicks'], func,  obj.id) ; 

				html+= ' to  ';
				html+= getInputTxtParam( type+'maxTicks' , 2,  obj[ 'maxTicks'], func,  obj.id) ; 

				// html+= getSpan(' and minimum ', 'grey', 10);;

				// html+= getInputTxtParam( type+'Ticks' , 2,  obj[ 'Ticks'], func,  obj.id) ; 

				html+=SP_3;
				html+=getDropDown(runAwayTick, type+'runAwayTick', '',func, obj.id, obj[ 'runAwayTick']); 
				html+=  getSpan(' Tick - Valid range 1 to 10');
				// html+= getInputTxtParam( type+'sustainCandle' , 2,  obj[ 'sustainCandle'], func,  obj.id) ; 
				// html+= getSpan(' Candles ');

			// }

			var param = obj.id+':'+ obj.id  ; 
			html+= csh.gept(obj, PRICE_CS,  param);
		html+= SP_3 + csh.delIcon(param) ; 
		return html;

	}

	function validateGapRunway(validResults){
		var obj = mtgv.cs. screenerData.gapRunAway;
			obj.csType = PRICE_CS;

			if(!obj.enabled){
				return;
			}
			var gapRunAwayType = getObjFrmArr( GAP_UP_DWN_LIST,  obj.type); 

			if(gapRunAwayType!=null && gapRunAwayType.id != CS_NOT_SELECTED){


				if(obj.goodData){
					var baseTicks = csu.gct(obj ,  'baseTick');
					var runAwayTicks = csu.gct(obj ,  'runAwayTick');


					var baseTick = getObjFrmArr( baseTicks,  obj.baseTick ); 
					var runAwayTick = getObjFrmArr( runAwayTicks,  obj.runAwayTick ); 
					var ticks =  obj.Ticks ; 

					// var validV1 = obj.id +'minTicks';
					// var validV2 = obj.id +'maxTicks';
					// var validMinGap = obj.id+'gapPc';

					var candleRange = getObjFrmArr( CANDLE_RANGE,  obj.candleRange ); 
					// var validV2 = obj.id +'sustainCandle';


					// jsu.inputNumberRange(validMinGap);
					var text =  'Min ' +  obj.gapPc + ' % ' + gapRunAwayType.label +  ' on '+baseTick.label + ' "' + candleRange.label  
						+'" Tick and Run away in range of last '
						+ obj.minTicks + '  to '+ obj.maxTicks +  ' '+ runAwayTick.label + ' Ticks ';

					csh.cdt(obj,text, validResults, obj.id, true);	
				;
				}else{
					var text =  'Invalid Value of Run Away Tick - Supported Value from 1 to 20';

					csh.cdt(obj,text, validResults, obj.id, false);	
				}

				


				// if(jsu.isIntegerInput(validV1) && jsu.inputNumberRange(validV1 , 1,10  )    
				// 	&& jsu.isIntegerInput(validV2) && jsu.inputNumberRange(validV2 , 1,10  ) 
				// 	&& jsu.inputNumberRange(validMinGap , .1,20  )
				// 	){

					
				// } 
			}
	}

	// GAP Runaway Ends 



	// GAP Fill 

	function gapFillChange(){  // gfc
		var goodData = true;
			var obj = mtgv.cs. screenerData.gapFill;

			if(mtgv.cs.ng){
				obj.enabled= true;
			}else{	

				if(!htmlU.isChecked(GAP_FILL+ 'CB')){
					$("#" + GAP_FILL +'').remove();
					obj.enabled= false;
					csu.dsf();
					return;
				}

				if(!htmlU.divExist(GAP_FILL+'Td2Div')) {// Row Not Exist 
					var row = getGapFillTr();
					$('#priceCtrlTab' ).append( row);
					obj.enabled= true;
				}

			}
			// obj. id =  PRICE_GAP_FILL ;

			csu.setProp([obj], [  'type' ,  'fillPC' , 'baseTick' , 'fillTick' , 'candleRange' ,  'minTicks' , 'maxTicks' , 'gapPc'], obj.id);

			var html = createGapFillTd(obj. id );

			htmlU.addMsgToDiv( obj.id + 'Td2Div' , true, html);

			var validMinGap = obj.id+'gapPc';
			// jsu.inputNumberRange(validMinGap);


			if(!jsu.inputNumberRange(validMinGap , .1,20  )){
				goodData = false;
			}

			

				var validMin = obj.id+'minTicks';


				if(!jsu.isIntegerInput(validMin) || !jsu.inputNumberRange(validMin , 1,10  )){
					goodData = false;
				}

			if( obj.type == 'gapUpFill' || obj.type =='gapDownFill' ){		
				var validMax = obj.id+'maxTicks';
				if(!jsu.isIntegerInput(validMax) || !jsu.inputNumberRange(validMax , 1,10  )){
					goodData = false;
				}


			}else{ // fill potential

				var validFillPc = obj.id+'fillPC';
				if( !jsu.inputNumberRange(validFillPc , .1,20  )){
					goodData = false;
				}

			}

			csu.setProp([obj], [  'type' ,  'fillPC' , 'baseTick' , 'fillTick' , 'candleRange' ,  'minTicks' , 'maxTicks' , 'gapPc'], obj.id);
			obj.goodData = goodData;

			csu.dsf(); // displaySelectedFields()

	}


	function getGapFillTr(){
		var html = '<tr id="'+GAP_FILL+'"  > ' 
				+   createTd( createDiv( GAP_FILL + 'Td2Div', createGapFillTd() ) ) + '</tr>';
		return html;
	}

	function createGapFillTd(){

		var func = 'csp.gfc';

		var type = GAP_FILL;

		var html = htmlU.doBold('Gap Fill');

		var obj = mtgv.cs.screenerData[type];

			obj.id =  type

			var baseTicks = csu.gct(obj ,  obj.baseTick);

			if(jsu.isNull(obj.gapPc)){
				obj.gapPc = PC_COMP_LOW[5].id;
			}			

			// html+= 'Min ' +  getDropDown(PC_COMP_LOW,  type+ 'gapPc', null, func, type, obj[ 'gapPc']);  

			html+= ' Min ' +  getInputTxtParam( type+'gapPc' , 2,  obj[ 'gapPc'], func,  obj.id) ;  //  getDropDown(PC_COMP_LOW,  type+ 'gapPc', null, func, type, obj[ 'gapPc']);  

			html+=' %';


			html+=' Gap on  ';


			html+= 'Base ' + getDropDown(baseTicks,  type+ 'baseTick', null, func, type, obj[ 'baseTick']); // gapFill
			// html+=' Tick ';

			html+= ' Tick ' + getDropDown(CANDLE_RANGE,  type+ 'candleRange', null, func, type, obj[ 'candleRange']); 
			html+=SP_3;

			html+=  getDropDown(GAP_FILL_LIST,  type+ 'type', null, func, type, obj[ 'type']); // gapFill
			html+=SP_3;

			// if(obj.type !=null && obj.type != CS_NOT_SELECTED){


				var fillTick = csu.gct(obj ,  obj.boDnTick);
				if( obj.type == 'gapUpFill' || obj.type =='gapDownFill' ){

					html+= BREAK_LINE;

					// html += ' After minimum ';
					html+= getSpan(' After minimum  ', 'grey', 10);;
					html+= getInputTxtParam( type+'minTicks' , 2,  obj[ 'minTicks'], func,  obj.id) ; 

					html+=SP_3;
					html+= getDropDown(fillTick, type+'fillTick', '',func, obj.id, obj[ 'fillTick']); 
					html+= getSpan(' Tick & Sustaining for up to ', 'grey', 10);;
					html+= getInputTxtParam( type+'maxTicks' , 2,  obj[ 'maxTicks'], func,  obj.id) ; 
					html+= getSpan(' Candles ', 'grey', 10);;

				}else if( obj.type == 'gapUpFillPot' || obj.type =='gapDownFillPot' ){

					if(jsu.isNull(obj.fillPC)){
						obj.fillPC = PC_COMP_LOW[5].id;
					}


					html+= getSpan(' and Gap sustaining for minimum  ', 'grey', 10);;
					html+= getInputTxtParam( type+'minTicks' , 2,  obj[ 'minTicks'], func,  obj.id) ; 

					html+=SP_3;
					html+= getDropDown(fillTick, type+'fillTick', '',func, obj.id, obj[ 'fillTick']); 
					html+= getSpan(' Tick & and is currently ', 'grey', 10);;



					html += ' within ';

					// html+=getDropDown(PC_COMP_LOW, type+'fillPC', '',func, obj.id, obj[ 'fillPC']); 
					html+= getInputTxtParam( type+'fillPC' , 2,  obj[ 'fillPC'], func,  obj.id) ; 



					html += ' % of Fill';
				}
			// }

		var param = obj.id+':'+ obj.id ; 
		html+= csh.gept(obj, PRICE_CS,  param);
		html+= SP_3 + csh.delIcon(param) ; 
		return html;

	}



	function validateGapFill(validResults){

		var obj = mtgv.cs. screenerData.gapFill;
			obj.csType = PRICE_CS;


			if(!obj.enabled){
				return;
			}
			var gapFillType = getObjFrmArr( GAP_FILL_LIST,  obj.type); 
		

			if(gapFillType!=null && gapFillType.id != CS_NOT_SELECTED){

				var text = '' ;
				var good  = true;


				var baseTicks = csu.gct(obj ,  'baseTick');
				var baseTick = getObjFrmArr( baseTicks,  obj.baseTick ); 



				var fillTicks = csu.gct(obj ,  'fillTick');
				var fillTick = getObjFrmArr( fillTicks,  obj.fillTick ); 

				var validV1 =  obj.id + 'minTicks';
				var validMinGap = obj.id+'gapPc';


				if(obj.goodData){

					if( obj.type == 'gapUpFill' || obj.type =='gapDownFill' ){
						

							text +=  'Min ' +  obj.gapPc + ' % Gap '  +' on ' + baseTick.label + ' Tick, '+  gapFillType.label+'  after  minimum of '  +obj.minTicks + ' '  
							+  fillTick.label  + ' Ticks & Sustaining for up to ' +obj.minTicks + ' Candles' ;
					}else{
													text +=  'Min  ' +  obj.gapPc + ' % Gap on '  + baseTick.label +  ' Tick, ' + doBold(gapFillType.label) +'  and Gap is sustaining for min '  +obj.minTicks + ' '  
							+  fillTick.label   +  ' is currently  within ' +	obj.fillPC	+'  % of Gap.. could be filled'; 	
					}

					csh.cdt(obj,text, validResults, obj.id, good);	
				}else{
					csh.cdt(obj,'Invalid Config for Gap Fill', validResults, obj.id, false);		
				}



					// 	

			}

	}



	// GAP Fill Ends 


	function createTableData(type){

		var html ='';

		var func = 'csp.prc';	

		var  has5MinTick = csu.has5MinTick();


		if(type ==  PRICE_GAIN_LOSS){

			var obj = mtgv.cs. screenerData[PRICE_GAIN_LOSS];

			obj. id =  type

			// if(mtgv.cs.ng){
				html = doBold(' Gain / Loss (%) : ' );	
			// }
			

			html+= getDropDown(GAIN_LOSS,  obj.id+'type', null, func, obj.id, obj.type);
			
			html+=SP_3;

			// if(	mtgv.mtpp.crossFreq){
				var ticks = csu.gct(obj , 'Tick');

				html+= 'On ';
				html+=getDropDown(ticks, obj.id+'baseTick', '',func, obj.id, obj.baseTick) 
				html+= ' Tick';
			// }

			html+=SP_3;

			html+=  csh.opCompHtml(obj,   func, null, " %" , 3) 	;

			if(mtgv.cs.ng){
				var selParam =  PRICE_GAIN_LOSS + ':' + obj.id
				html+= csh.gept(obj, PRICE_CS,  selParam);
				html += SP_3 + csh.delIcon(selParam) ;
			}
		}
		



		return html;

	}


	function priceChange(){


		{
			//priceGainLoss
			var obj = mtgv.cs. screenerData.priceGainLoss;

			obj. id =  PRICE_GAIN_LOSS ;

			csu.setProp([obj], ['ops','v1', 'v2' , 'type' ,'baseTick'], obj.id);

			var html = createTableData(obj. id );

			htmlU.addMsgToDiv('priceGainLossTd2Div' , true, html);

			csu.valNSetAeb( obj. id , obj.ops, obj.v1, obj.v2,  obj);
		}
/*
		{
			// rangeBoDwn

			moved out ....
*/		
		{
			// gapRunAway
			

		}
		
		{
			// gapFill
			
		} 
		{

			// moved ....

		}
		csu.dsf(); // displaySelectedFields();
	}

	function validateFields(validResults){

		validateBoBd(validResults) ;// BReak Out / Down ...

		validateVwap(validResults);

		validateOrNg(validResults) ;

		validateGapNg(validResults);

		validateOpeningRangeOld(validResults) ;

		validateTrendCandle(validResults);

		validateGapFill(validResults);

		validateGapRunway(validResults);

		validateRbc(validResults);

		validatePrevRange(validResults);

		csfdc.vf(validResults);

		{
			var obj = mtgv.cs. screenerData.priceGainLoss;
			obj.csType = PRICE_CS;

			// csu.valNSetAeb(obj.id,obj.ops,  obj.v1,  obj.v2, obj);

			var ops = getObjFrmArr( BASIC_OPS,  obj.ops); 
			var gainLoss = getObjFrmArr( GAIN_LOSS,  obj.type); 
			
			if( ops!=null &&  ops.id != CS_NOT_SELECTED){
				if(obj.goodData  ){
						

					var text = doBold(' Gain / Loss (%) : ' );	

					text +=  gainLoss.label +  ' Over Previous ';

					if(	mtgv.mtpp.crossFreq){

						var ticks = csu.gct(obj , 'baseTick');

						var tick = getObjFrmArr( ticks,  obj.baseTick); 

						text+= tick.label ;
					}

					text+= ' Tick ' + ops.label +' ' + obj.v1  +"%";


					if(ops.id == CS_BETWEEN) text+= ' And ' +obj.v2 +"%";


					csh.cdt(obj,text, validResults, obj.id, true);
				}else{
					var text = 'Incorrect Value for Gain Loss'

					csh.cdt(obj,text, validResults, obj.id, false);
				}
			}

		}

		{
				// open Range Moved ...

		}

		{
			
		}


		{  //gapFill

			


				

			
		}

		{

		  // PRICE_TRENDING_CANDLE

		  // moved

		}

	}




	function getCustScrFilter(filer, defFilter){
		// var filer = [];

		filer.push({  id :  "csPrice" , label : 'Price'  , sLabel : 'Close Price'  , tab : PRICE_CS, type : 'dd' ,
			filtDef : {obj: thisObject, fnc: 'apf' , params: 'csPrice' }, mobFilter: "priceCs_price"
		}) ;
		filer.push({  id :  "priceGainLoss" , label : 'Price Change'  , sLabel : 'Gain , Loss'  , tab : PRICE_CS, type : 'dd' ,
				filtDef : {obj: thisObject, fnc: 'apf' , params: PRICE_GAIN_LOSS } , mobFilter: "priceCs_gainLoss"
			}) ;
		

/*
		filer.push({  id :  "trendingCandleBoDwntype" , label : 'Trending Candle'  , sLabel : 'Gain , Loss'  , tab : PRICE_CS, type : 'dd', subDef : TREND_CANDLE_LIST }) ;
		filer.push({  id :  "gapRunAwaytype" , label : 'Run Away Gap'  , sLabel : 'Run Away Gap '  , tab : PRICE_CS, type : 'dd', subDef : TREND_CANDLE_LIST }) ;
		filer.push({  id :  "gapFilltype" , label : 'Gap Fill '  , sLabel : 'Gap Fill Potential '  , tab : PRICE_CS, type : 'dd' }) ;
*/


		if(!jsu.isMigContext()   && mtgv.mtpp.crossFreq){   //
			
			// filer.push({  id :  "rangeBoDwntype" , label : 'Range Breakout '  , sLabel : 'Gap Fill Potential '  , tab : PRICE_CS, 
			// 	type : 'dd'  , subDef : PR_BO_DWN_LIST}) ;	

			filer.push({  id :  "orNg" , label : 'Open Range Breakout (ORB)'  , sLabel : 'ORB-Open Range Breakout  '  , tab : PRICE_CS, 
				type : 'btn'  , filtDef : {obj: thisObject, fnc: 'apf' , params: OPEN_RANGE_NG }, mobFilter: "priceCs_orNg" }) ;

			filer.push({  id :  "prevRngBoBd" , label : 'Previous Range Breakout '  , sLabel : 'Previous Range Breakout '  , tab : PRICE_CS, 
				type : 'btn'  , filtDef : {obj: thisObject, fnc: 'apf' , params: PREV_RANGE_BOBD } , mobFilter:  "priceCs_prevRng"}) ;

			filer.push({  id :  GAPS_NG , label : 'Gap Strategies '  , sLabel : 'Gap Strategies '  , tab : PRICE_CS, 
				type : 'btn'  , filtDef : {obj: thisObject, fnc: 'apf' , params: GAPS_NG }, mobFilter: 	""}) ;
		

		}

		filer.push({  id :  "dynpriceComp" , label : 'OHLC Filter '  , sLabel : 'OHLC Compare '  , tab : PRICE_CS, 
			type : 'btn'  , filtDef : {obj: thisObject, fnc: 'apf' , params:  'ac'  }, mobFilter: "priceCs_ohlcCompare"}) ; 


		// RBR
		if( mtgv.mtpp.crossFreq){
					filer.push({  id :  "rallyBaseCom" , label : 'RBR (Rally Base Rally) '  , sLabel : 'RBR (Rally Base Rally)'  , tab : PRICE_CS, 
			type : 'btn'  , filtDef : {obj: thisObject, fnc: 'apf' , params:   'rallyBaseCom'+ PARAM_DELIM +'rbr'  } , mobFilter: ""}) ; 

			filer.push({  id :  "rallyBaseCom" , label : 'RBD (Rally Base Drop) '  , sLabel : 'RBD (Rally Base Drop)'  , tab : PRICE_CS, 
				type : 'btn'  , filtDef : {obj: thisObject, fnc: 'apf' , params:   'rallyBaseCom'+ PARAM_DELIM +'rbd'  } , mobFilter: ""}) ; 



			filer.push({  id :  "rallyBaseCom" , label : 'DBR (Drop Base Rally) '  , sLabel : 'DBR (Drop Base Rally)'  , tab : PRICE_CS, 
				type : 'btn'  , filtDef : {obj: thisObject, fnc: 'apf', params:   'rallyBaseCom'+ PARAM_DELIM +'dbr' }, mobFilter:  ""}) ; 

			filer.push({  id :  "rallyBaseCom" , label : 'DBD (Drop Base Drop) '  , sLabel : 'DBD (Drop Base Drop)'  , tab : PRICE_CS, 
				type : 'btn'  , filtDef : {obj: thisObject, fnc: 'apf' , params:   'rallyBaseCom'+ PARAM_DELIM +'dbd' } , mobFilter: ""}) ; 


			if(!jsu.isMigContext()){

				filer.push({  id :  CS_VWAP , label : 'VWAP'  , sLabel : 'VWAP'  , tab : PRICE_CS, 
					type : 'btn'  , filtDef : {obj: thisObject, fnc: 'apf' , params: CS_VWAP +PARAM_DELIM+'vwap'} , mobFilter: "priceCs_vwap"}) ;    

				filer.push({  id :  CS_VWAP , label : 'Anchored WAP'  , sLabel : 'AVWAP'  , tab : PRICE_CS, 
				type : 'btn'  , filtDef : {obj: thisObject, fnc: 'apf' , params:  CS_VWAP +PARAM_DELIM+ 'avwap'} , mobFilter: "priceCs_vwap"}) ;    

				filer.push({  id :  CS_VWAP , label : 'Moving VWAP'  , sLabel : 'MVWAP'  , tab : PRICE_CS, 
					type : 'btn'  , filtDef : {obj: thisObject, fnc: 'apf' , params:   CS_VWAP +PARAM_DELIM+'mvwap'} , mobFilter: "priceCs_vwap"}) ;    

				filer.push({  id :  CS_VWAP , label : 'Time WAP'  , sLabel : 'Time WAP'  , tab : PRICE_CS, 
					type : 'btn'  , filtDef : {obj: thisObject, fnc: 'apf', params:   CS_VWAP +PARAM_DELIM+'twap'}, mobFilter:  "priceCs_vwap"}) ;    

			}	

			

		}


		// VWAP 




		// Trending

		filer.push({  id :  "trendingCandleBoDwntype" , label : 'Trending candle '  , sLabel : 'Trending candle '  , tab : PRICE_CS, 
			type : 'btn'  , filtDef : {obj: thisObject, fnc: 'apf' , params: TREND_CANDLE_BOBD }, mobFilter: "priceCs_trendingCandleBoDwn" }) ;    


		filer.push({  id :  CS_TURNOVER , label : 'Turnover  (Price x Vol)'  , sLabel : 'Turnover'  , tab : PRICE_CS, 
			type : 'btn'  , filtDef : {obj: thisObject, fnc: 'apf' , params:  CS_TURNOVER} , mobFilter: "priceCs_turnover"}) ;    



		filer.push({  id :  "dynpriceTrendNg" , label : 'OHLC Trending '  , sLabel : 'OHLC Trending '  , tab : PRICE_CS, 
			type : 'btn'  , filtDef : {obj:thisObject, fnc: 'apf' , params:  'atn'  } , mobFilter:  "priceCs_ohlcTrending"}) ;  //   JavaScript:cscmn.atn('price','priceCs');




		if( mtgv.mtpp.crossFreq){

			filer.push({  id :  "priceBoBd" , label : 'Breakout / Down '  , sLabel : 'Breakout / Down'  , tab : PRICE_CS, 
				type : 'btn'  , filtDef : {obj: thisObject, fnc: 'apf' , params:  'priceBoBd' }, mobFilter: "priceCs_breakOutBreakDown"}) ;  //   JavaScript:cscmn.atn('price','priceCs');

		}

		

		// ---------

		

		if( mtgv.mtpp.crossFreq){

			defFilter.push({  id :  "rallyBaseCom" , label : 'RBR (Rally Base Rally) '  , sLabel : 'RBR (Rally Base Rally)'  , tab : PRICE_CS, 
			type : 'btn'  , filtDef : {obj: thisObject, fnc: 'apf' , params:  'rallyBaseCom'+ PARAM_DELIM +'rbr'  } , mobFilter: ""}) ; 

			 

			defFilter.push({  id :  "priceBoBd" , label : 'Breakout / Down '  , sLabel : 'Breakout / Down'  , tab : PRICE_CS, 
			type : 'btn'  , filtDef : {obj: thisObject, fnc: 'apf' , params:  'priceBoBd' }, mobFilter: "priceCs_breakOutBreakDown"}) ;  //   JavaScript:cscmn.atn('price','priceCs');

 

		}

		if (!jsu.isMigContext()) {

				// defFilter.push({  id :  "prComp" , label : 'Price Range'    , tab : BV_CS, 
				// 	type : 'btn'  , filtDef : {obj:'csu', fnc: 'opsCompare' , params:  'prc' } , subDef :AVG_PRICE_RANGE });

				defFilter.push({  id :  CS_VWAP , label : 'VWAP'  , sLabel : 'VWAP'  , tab : PRICE_CS, 
				type : 'btn'  , filtDef : {obj: thisObject, fnc: 'apf' , params:  'vwap'} , mobFilter:   "priceCs_vwap"}) ;  
		}



		return filer ;

	}


	function ngSearch(item, filterDef, params ){

		if(Array.isArray(params)){
			paintFilterRow(params[0], params[1]); 
		}else{
			paintFilterRow(params); 	
		}

		
	}



	function paintFilterRow(type, subType) {

		mtgv.cs.editActive = [];
		let newFilterRow = addNewFilter(type, subType);

		let filterTable = $("#" + CS_FILTERS_TABLE);
		
		// filterTable.append(getFormRow(type, newFilterRow["id"]));
		filterTable.append(newFilterRow.html);

		mtgv.cs.editActive.push(newFilterRow); 
		
		addFilterChange(type, newFilterRow["id"]);
		
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

		apf : addPriceFilters,


		pht : getPriceHtml,
		
		prc : priceChange,
		vf : validateFields,
		ctd : createTableData,

		// break out / down ..
		// abod : addBreakOutDown ,
		bobdc : brkOutDwnChg,

		// VWAP
		// awap : addWap ,
		wapc : wapChg,

		// Open Range NG 
		ornc :openRangeNgChg,
		gnc : gapsNgChg,


		// prev range

		prch :previousRangeChange,


		// 
		// arbc : addRallyBoringCombo ,
		rbcc : rbcChange,


		// Open range Old 
		oroc : openRangeOldChange,

		tcc : trendingCandleChange,


		grc : gapRunawayChange,
		gfc : gapFillChange,

		// vbb : validateBoBd
		gcsf : getCustScrFilter,
		

	}


})(); // module 	
