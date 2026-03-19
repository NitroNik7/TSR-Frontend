



function getTickMap(){

	var tickMap = null;

	if(mtgv.mtpp.crossFreq){
		tickMap = mtgv.mtpp.FREQ_SCR_MAP.slice();
		tickMap.unshift({id: "scrFreq", label: "Screener"} )

	}else{
		tickMap = [
			{id: 'tick' , label: 'Tick (Current Screener Tick)'},
			{id: 'day' , label: 'Day'},
		]
	}
	return tickMap;
}

// var TICK_MAP = getTickMap();





var  TICK_PERIOD = miInd.gtp(); //    getTickPeriod();







var pdef =  (function () {	

	var jsu = mintJsUtil;
	var htmlU = mintHtmlUtil;

	var PRICE_MAP = [
		{id: 'openD' , label: 'Open Today'},
		{id: 'highD' , label: 'High Today'},
		{id: 'lowD' , label: 'Low Today'},
		{id: 'closeD' , label: 'Close/Current Today'},

		{id: 'openT' , label: 'Open Current Tick'},
		{id: 'highT' , label: 'High Current Tick'},
		{id: 'lowT' , label: 'Low Current Tick'},
		{id: 'closeT' , label: 'Close Current Tick'},

		{id: 'openPd1' , label: 'Open Prev Day (D-1)'},
		{id: 'highPd1' , label: 'High Prev Day '},
		{id: 'lowPd1' , label: 'Low Prev Day )'},
		{id: 'closePd1' , label: 'Close Prev Day)'},
		
		{id: 'openPt1' , label: 'Open Prev Tick (T-1)'},
		{id: 'highPt1' , label: 'High Prev Tick'},
		{id: 'lowPt1' , label: 'Low Prev Tick'},
		{id: 'closePt1' , label: 'Close Prev Tick'},

		{id: 'openPd2' , label: 'Open (D-2)'},
		{id: 'highPd2' , label: 'High (D-2) '},
		{id: 'lowPd2' , label: 'Low P(D-2)'},
		{id: 'closePd2' , label: 'Close (D-2)'},
		
		{id: 'openPt2' , label: 'Open (T-2)'},
		{id: 'highPt2' , label: 'High (T-2)'},
		{id: 'lowPt2' , label: 'Low (T-2)'},
		{id: 'closePt2' , label: 'Close (T-2)'},

	];



	var AVG_PRICE_RANGE = [
		  {id: "D3", label: "Three Day Range"},
		  {id: "D5", label: "Five day Range"},
		  {id: "D10", label: "Ten Day range"},
		  {id: "D15", label: "Fifteen day Range"},
		  {id: "D30", label: "Thirty Day Range"},
		  {id: "D50", label: "Fifty day Range"},
		  {id: "W5", label: "Five Week Range"},
		  {id: "W10", label: "Ten Week Range"},
		  {id: "W20", label: "Twenty Week Range"},
		  {id: "W50", label: "Fifty Week Range"},
		  {id: "M3", label: "Three Month Range"},
		  {id: "M6", label: "Six Month Range"},
		  {id: "M9", label: "Nine Month Range"},
		  {id: "M12", label: "Twelve Month Range"}
	];

	var BETA_PERIOD = [
			  {id: "D1M", label: "Daily 1 Month"},
		      {id: "D3M", label: "Daily 3 Month"},	
			  {id: "W1Y", label: "Weekly 1 Year"},	
			  {id: "W2Y", label: "Weekly 2 Year"},	
			  {id: "F2Y", label: "Fortnightly 2 Year"},	
			  {id: "M2Y", label: "Monthly 2 Year"},	
			  {id: "M4Y", label: "Monthly 4 Year"},	
	];



	// GAP ......

	var GAP_NG_OPT = [   {id : 'gapUp' , label : 'Gap Up' }   , {id : 'gapDown' , label : 'Gap Down' }    ];


	var GAP_UP_NG_OPT =[
		{ id: 'gapNgPlain', label :'Simple Gap Up' },
		{ id: 'gapNgRunAway', label :'Gap Up Run Away' },
		{ id: 'gapNgFill', label :'Gap Up Fill' },
		{ id: 'gapNgFillPot', label :'Gap Up Fill Potential' },
		{ id: 'gapNgHighBounce', label :'Gap Up Bounce From Gap High' },
		{ id: 'gapNgLowBounce', label :'Gap Up Bounce From Gap Low' },
	];


	var GAP_DOWN_NG_OPT =[
		{ id: 'gapNgPlain', label :'Simple Gap Down' },
		{ id: 'gapNgRunAway', label :'Gap Down Run Away' },
		{ id: 'gapNgFill', label :'Gap Down Fill' },
		{ id: 'gapNgFillPot', label :'Gap Down Fill Potential' },
		{ id: 'gapNgHighBounce', label :'Gap Down Bounce From Gap High' },
		{ id: 'gapNgLowBounce', label :'Gap Down Bounce From Gap Low' },
	];

	// price range NG

	var OR_NG_BO_OPTS = [
					// { id: CS_NOT_SELECTED, label :'Any Conditions ' },
					{ id: 'orNgFirstBoBd', label :'First Breakout No Breakdown' },
					{ id: 'orNgIgBoBd', label :'First BO Ignore BreakDown ' },
					{ id: 'orNgAnyCo', label:  "Every Time Cross Above High"},
					{ id: 'orNgBoBdSus', label:  "Breakout & Sustaining"},
					{ id: 'orNgBoBdSupRes', label:  "Breakout & Taken Support"},
					{ id: 'orNgBoBdFake', label:  "Fake Breakout"},
	];

	var OR_NG_BD_OPTS = [
					// { id: CS_NOT_SELECTED, label :'Any Conditions ' },
					{ id: 'orNgFirstBoBd', label :'First Breakdown no Breakout' },
					{ id: 'orNgIgBoBd', label :'First Breakdown Ignore Breakout ' },
					{ id: 'orNgAnyCo', label:  "Every Time Cross Below"},
					{ id: 'orNgBoBdSus', label:  "Breakdown & Sustaining"},
					{ id: 'orNgBoBdSupRes', label:  "Breakdown & Taken Resistance"},
					{ id: 'orNgBoBdFake', label:  "Fake Breakdown"},
	];


	// prev Range 
	var PREV_RAN_BO_OPTS = [
					// { id: CS_NOT_SELECTED, label :'Any Conditions ' },
					{ id: 'prevRangeFirstBoBd', label :'First Breakout No Breakdown' },
					{ id: 'prevRangeIgBoBd', label :'First BO Ignore BreakDown ' },
					{ id: 'prevRangeAnyCo', label:  "Every Time Cross Above High"},
					// { id: 'prevRangeBoBdSus', label:  "Breakout & Sustaining"},
					// { id: 'prevRangeBoBdSupRes', label:  "Breakout & Taken Support"},
					// { id: 'prevRangeBoBdFake', label:  "Fake Breakout"},
	];

	var PREV_RAN_BD_OPTS = [
					// { id: CS_NOT_SELECTED, label :'Any Conditions ' },
					{ id: 'prevRangeFirstBoBd', label :'First Breakdown no Breakout' },
					{ id: 'prevRangeIgBoBd', label :'First Breakdown Ignore Breakout ' },
					{ id: 'prevRangeAnyCo', label:  "Every Time Cross Below"},
					// { id: 'prevRangeBoBdSus', label:  "Breakdown & Sustaining"},
					// { id: 'prevRangeBoBdSupRes', label:  "Breakdown & Taken Resistance"},
					// { id: 'prevRangeBoBdFake', label:  "Fake Breakdown"},
	];


	// https://aliceblueonline.com/time-weighted-average-price/#:~:text=Time-Weighted%20Average%20Price%20(TWAP,intervals%20throughout%20the%20trading%20day.

	var VWAP_OPT= [
			{ id: 'vwap', label :'VWAP (Vol Wt Avg Price)' },
			{ id: 'mvwap', label :'Moving VWAP' },
			{ id: 'avwap', label :'Anchored VWAP(Ticks)' },
			{ id: 'twap', label :'Specific Time Anchor' },
			{ id: 'vwapMa', label :'VWAP OverLays/MA Cross' },
			{ id: 'vwapPP', label :'VWAP Pivot Cross' },

			// { id: 'twap', label :' (TWAP) Time Wt Avg Price' },
		];

	// var VWAP_OP_OPT = [
	// 		{ id: CS_CO_ABV, label :'Price Cross Above WAP' },
	// 		{ id: CS_ABOVE, label :'Price Above WAP' },
	// 		{ id: CS_CO_BLW, label :'Price Cross Below WAP' },
	// 		{ id: CS_BELOW, label :'Price Below WAP' },
	// 		{ id: WITHIN, label :'Price Within % WAP' },

	// 		{ id: TRENDING_UP, label :'WAP Trending Up' },
	// 		{ id: TRENDING_DOWN, label :'WAP Trending Down' },
	// 		{ id: 'gapWiden', label :'WAP Gap Widening' },
	// 		{ id: 'gapNarrow', label :'WAP Gap Narrowing' },
	// ];
    

	var VWAP_OP_OPT = [
			{ id: CS_CO_ABV, label :'Price Cross Above WAP' },
			{ id: CS_ABOVE, label :'Price Above WAP' },
			{ id: CS_CO_BLW, label :'Price Cross Below WAP' },
			{ id: CS_BELOW, label :'Price Below WAP' },
			{ id: WITHIN, label :'Price Within % WAP' },
	    	
			{ id: TRENDING_UP, label :'WAP Trending Up' },
			{ id: TRENDING_DOWN, label :'WAP Trending Down' },
			{ id: 'gapWiden', label :'WAP Gap Widening' },
			{ id: 'gapNarrow', label :'WAP Gap Narrowing' },
	];


	var VWAP_OP_BAND_OPT = [
			{ id: CS_CO_ABV, label :'Price Cross Above WAP' },
			{ id: CS_ABOVE, label :'Price Above WAP' },
			{ id: CS_CO_BLW, label :'Price Cross Below WAP' },
			{ id: CS_BELOW, label :'Price Below WAP' },
			{ id: WITHIN, label :'Price Within % WAP' },
	    	{id: 'abvBand', label :'Price Above Upper Band' },
			{ id: 'caBand', label :'Price Cross Abv UB' },

			{ id: 'blwBand', label :'Price Below Lower Band' },
			{ id: 'cbBand', label :'Price Cross Below LB' },
			// { id: 'withBand', label :'Price Within Band' },
			{ id: TRENDING_UP, label :'WAP Trending Up' },
			{ id: TRENDING_DOWN, label :'WAP Trending Down' },
			{ id: 'gapWiden', label :'WAP Gap Widening' },
			{ id: 'gapNarrow', label :'WAP Gap Narrowing' },
	];


	let VWAP_PRICE_FIELDS = CLOSE_FIELDS_NO_VOL.slice();

	

	let V_HA_FIELDS = HA_FIELDS.slice()

	VWAP_PRICE_FIELDS = VWAP_PRICE_FIELDS.concat(V_HA_FIELDS);
	VWAP_PRICE_FIELDS.push(HA_HLC3_DEF);

let VWAP_OL = MA_TYPE_BASIC.slice();
	VWAP_OL.push({id: 'wma', label: "WMA"});
	VWAP_OL.push({id: 'bollingerUB', label: "Bollinger UB"});
	VWAP_OL.push({id: 'bollingerMB', label: "Bollinger MB"});
	VWAP_OL.push({id: 'bollingerLB', label: "Bollinger LB"});
	VWAP_OL.push({id: SUPER_TREND, label: "Super Trend"});
	VWAP_OL.push({id: PSAR, label: "Parabolic SAR"});


	let VBAND_FIELDS = CLOSE_FIELDS_NO_VOL.slice();

	// VBAND_FIELDS.push( { id: 'vwap', label :'VWAP' }, );
    

    let VBAND_TYPE = [
    	{ id: 'sd', label :'Std Dev' },
    	{ id: SHIFT_TYPE_PC, label :'% Range' },
    	{ id:  SHIFT_TYPE_PTS , label :'Fixed Points' },
    ]

	var VWAP_PERIOD = [
			{ id: 'sod', label :'Start of the Day' },
			{ id: 'sody', label :'Start of Previous Day' },
			// { id: 'since', label :'Period' },
	];

	var VWAP_ANCHOR = [
			{ id: 'sPeriod', label :' Any ' },
			{ id: 'HighPricePoint', label :'High Price Point' },
			{ id: 'LowPricePoint', label :'Low Price Point' },
			{ id: 'HighVolPoint', label :'High Volume Point' },
			{ id: 'LowVolPoint', label :'Low Volume Point' },
			// { id: 'SpecificTime', label :'Specific' },
	];





	var SHORT_PERIODS = [
		// { id :FREQ_MM1, label : '1 Minute' , sf: 'MIN1' }, 
		// { id :FREQ_MM5, label : '5 Minutes' , sf: 'MIN5' }, 
		// { id :FREQ_MM10, label : '10 Minutes' , sf: 'MIN10'},
        // { id :FREQ_MM15, label : '15 Minutes', sf: 'MIN15'}
		FREQ_MM1_OBJ, FREQ_MM2_OBJ, FREQ_MM3_OBJ,
		FREQ_MM5_OBJ, FREQ_MM10_OBJ, FREQ_MM15_OBJ, 
		FREQ_MM30_OBJ, FREQ_MM45_OBJ, FREQ_HH1_OBJ 
    ];


	function getPrevRangeTicks(){

		var periods = [
	      // {id: "day", label: "Day's"},
	      {id: "week", label: "Week's"},
	      {id: "mth", label: "Month's"},
	      // {id: "year", label: "Years"},
		  ];

		  if(mtgv.mtpp.rt &&  mtgv.mtpp.crossFreq ){
		  	
		  	periods.unshift(   {id: "day", label: "Day's"} );	
			periods.unshift(   {id: "hr", label: "Hour's"} );
			periods.unshift(   {id: "5min", label: "5 Minute's"});
		  }


	      return periods;

	}


	function getPriceRangeDerivedTicks(tick){
		
		var periods = [ ];

		if(jsu.containsString(['week' , 'mth'] ,  tick)){

			if(mtgv.mtpp.rt &&  mtgv.mtpp.crossFreq ){
				periods.push({id: FREQ_INTRA_DAILY, label: "Live"});
			}
			periods.push({id: FREQ_DAILY, label: "EOD"});
		}else{

			periods = SHORT_PERIODS ;
		}

		return periods;

	}



	var RALL_BASE_COMBO = [
			{ id: 'rbr', label :'Rally Base Rally (RBR)' },
			{ id: 'rbd', label :'Rally Base Drop (RBD)' },
			{ id: 'dbr', label :'Drop Base Rally (DBR)' },
			{ id: 'dbd', label :'Drop Base Drop (DBD)' },
		]




	// -----------------------

	var OHLC_ADV_OPT = [
			{ id: 'hlIdx', label :'Comparing a Tick With Highest/Lowest of last N Ticks' },
			{ id: 'hlIdxRange', label :'Comparing Range of Ticks With Another Range of Ticks' },
			// { id: 'lowest', label :'Comparing With Lowest of last N Ticks' },
			// { id: 'min', label :'Minimum In' },
			// { id: 'max', label :'Maximum In' },
			{ id: 'withinRange', label :'Within Range of each other' },
	];
	

	var OHLC_ADV_HL_OPS = [  // TODO ADD, OPS_CO_ABV, OPS_CO_BLW
		OPS_ABV , OPS_BELOW, OPS_WITHIN   , OPS_CO_ABV, OPS_CO_BLW
	]

	var OHLC_ADV_HLR_OPS = [  // TODO ADD, OPS_CO_ABV, OPS_CO_BLW
		OPS_ABV , OPS_BELOW, OPS_WITHIN   
	]

	var OHLC_ADV_RANGE_OPS = [
		 OPS_WITHIN, OPS_MORE_THAN
	]




	function help(){

		var html ='';

		if(!isMobile()){
			html+='<div '+CS_HELP_DIV_STYLE +'>';  

			var  trendingText = "<b>Price Trending</b> To find if stock is consistently Moving up or down. "
			+" You can further customise to Add Min Percentage of gain/ Loss. In real World Scenario there can be exceptions. You may wish to ignore them. ";
			trendingText += BREAK_LINE +' Fox Ex 1. Price Gaining daily for 10 days. '
			+' OR Price gaining for last 10 days but ignore 1 exception where it has fallen '

			var  GainText = "Click <b> Gain/Loss Button</b> to compare Open/High/Low/Close with Previous  Day/Ticks up to 10 Ticks by Specified % ";
			GainText += BREAK_LINE +' Fox Ex Current Tick Close > previous Days High By 2% '

			var  ohlcComp = "<b>OHLC Compare Button</b> is a simple version of Gain /Loss. Very Useful to customise/Create Candlestick Patterns";
			ohlcComp += BREAK_LINE +' Fox Ex Current Tick Close > previous Tick High and Current Tick Open is less than previous Tick Low- Bullish Engulfing '


			html+= BR_2 + getSpan(trendingText,  'grey', 10);


			html+= BR_2 + getSpan(GainText,  'grey', 10);

			html+= BR_2 + getSpan(ohlcComp,  'grey', 10);

			html+='</div>';
		}

		return html;

	}


	return {
		
		priceMap : PRICE_MAP,
		avgPriceRange : AVG_PRICE_RANGE, 
		betaPeriod  : 	BETA_PERIOD, 
		
		sp : SHORT_PERIODS,

		// Gap 
		gapNgOpt : GAP_NG_OPT,
		gapUpNgOpt 	: 	GAP_UP_NG_OPT ,
		gapDownNgOpt 	: 	GAP_DOWN_NG_OPT,

		// price Range Ng
		orNgBoOpt : OR_NG_BO_OPTS,
		orNgBdOpt : OR_NG_BD_OPTS,

		// prev range
		prevRanBoOpt : PREV_RAN_BO_OPTS, 
		prevRanBdOpt : PREV_RAN_BD_OPTS , 

		prt : getPrevRangeTicks,
		prdt : getPriceRangeDerivedTicks,

		rbcOpt 	: RALL_BASE_COMBO, 

		// VVAP

		vwopt : VWAP_OPT ,
		vwoopt : VWAP_OP_OPT,
		vobo: VWAP_OP_BAND_OPT,


		vbf: VBAND_FIELDS,
		vwp :  VWAP_PERIOD, 
		vwa : VWAP_ANCHOR,
		vbt : VBAND_TYPE,
		VWAP_PRICE_FIELDS : VWAP_PRICE_FIELDS,
		VWAP_OL : VWAP_OL,

		// OHLC Adv 

		oao :OHLC_ADV_OPT,
		oahl : OHLC_ADV_HL_OPS,
		oahlr : OHLC_ADV_HLR_OPS,


		help : help
	}


})(); // module 	
