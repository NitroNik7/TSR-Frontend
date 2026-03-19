var PRICE_CS 	= 	'priceCs';
var VOL_CS 		= 	'volCs';
var HL_CS 		= 	'hlCs';

var MA_CS 			= 	'maCs';
var TI_CS 			= 	'tiCs';

var DIV_CS 			= 	'divCs';


var CP_CS 			= 	'cpCs'; // chart pattern C

var BV_CS 			= 	'betaCs'; // Uses Price Js File...


var PP_CS 			= 	'pivotCs'; // Uses Price Js File...

var STR_CS 			= 	'strCs'; // Uses Price Js File...



var SCR_FREQ = 'scrFreq';





// var WK_PRICE_VOL 		= 	'wKpvCs';
// var WK_MA_CS 			= 	'WkmaCs';
// var WK_TI_CS 			= 	'WktiCs';

var FIN_RAT_NG	='finRatNg';

var FIN_STMT_NG	='finStmtNg';


// Fin
var FIN_HLR 		= 	'hlrCs';

// Fin
var FIN_YR 		= 	'finyCs';


var FIN_BASIC 		= 	'fbCs';
var FIN_RATIO 		= 	'frCs';
var FIN_BAL_SHEET 	= 	'bsCs';


var FIN_CASH_FLOW 	= 	'cfCs';
var FIN_INCOME 		= 	'incomeCs';
var FIN_QTRLY 		= 	'qtrlyCs';


var  AVAIL_HIGH_PLAN = 'Available in higher Plans'



var INDI_TABLE_STYLE ="table table-bordered table-striped ";

var TAB_INDI_STYLE = ' class="'+INDI_TABLE_STYLE+' "   style="white-space: nowrap;" ';



var  CS_INDI_PROPS = ['ops','p1', 'v1', 'v2','v3' ,'v4' , 'tolPc' ,'techTick', 'fieldType', 'field',
				'p1'  ,'p2','p3', 'maField' , 'maType' , 'priceField' , 'shift', 'shiftType' , 'showCustSet', 'f1', 'f2', 'f3',
				'srl',
				'indiIndex','strat', // added for techDiy
				'ops2',
				'fieldCat'
				];

// screenerData.csPrice ={}

var SCR_INIT_LD_DIV = 'SC_INIT_LD';
var ScreenerLoadingDiv = 'SC_LD';
var ScreenerFeedbackDiv = 'SC_FD';
var CS_SAV_LDG_DIV = 'saveLoadingDiv';
var CS_SAV_FB_DIV =  'saveFeedbackDiv'; 
var CS_VIEW_MY_SET_DIV ="ViewCustSetDiv";

var CS_SCR_CTRL_FB_DIV ="csScrCtrlFbDiv";

var CS_SCR_SB_FB_DIV ="csScrSbFbDiv";


var CS_HELP_DIV_STYLE = 'style="margin:15px;text-align: left;"';


var CS_DIV_WITH_MGN = 	'<div style ="margin:10px;">';

var CS_SEL_FONT_SIZE = '10';

var CS_LABEL_WIDTH = 180;


var BREAK_OUT = 'breakOut';
var BREAK_DOWN = 'breakDown';

var BREAK_OUT_FAKE = 'boFake';
var BREAK_DOWN_FAKE = 'bdFake';

var BREAK_OUT_SUS = 'boSus';
var BREAK_DOWN_SUS = 'bdSus';

var BREAK_OUT_TAK_SUP = 'boTakSup';
var BREAK_DOWN_TAK_RES = 'bdTakRes';





var CS_NOT_SELECTED = 'na';
var CS_ABOVE = 'abv';
var CS_BELOW = 'blw';
var CS_EQUALS = 'eq';
var CS_BETWEEN = 'between';


var CS_GT_EQ = 'gtEq';
var CS_LT_EQ = 'ltEq';

var CS_CO_ABV = 'coAbv';
var CS_CO_BLW = 'coBlw';

var CS_CO_ABV_PT = 'coAbvPt';
var CS_CO_BLW_PT = 'coBlwPt';

var CS_CO_ABV_WITHIN ='caWithin';
var CS_CO_BLW_WITHIN ='cbWithin';

var CS_RATIO_ABV = 'ratioAbv';
var CS_RATIO_BLW = 'ratioBlw';


var CS_LATEST = 'latest';
var CS_PREV = 'p1';
// var CS_PREV_2 = 'p2';
// var CS_WITHIN_3 = 'within3';


var CS_HIGHEST = 'highest';
var CS_LOWEST = 'lowest';



var WITHIN = 'within';

var MORE_THAN = 'moreThan';

var TRENDING_UP = 'trendUp';
var TRENDING_DOWN = 'trendDown';

var TRENDING_UP_ONLY_BUL_CO = 'trendUpOnlyBulCo';
var TRENDING_UP_NO_CO = 'trendUpNoCo';

var TRENDING_DOWN_ONLY_BEAR_CO = 'trendDownOnlyBearCo';
var TRENDING_DOWN_NO_CO = 'trendDownNoCo';


var STRAT_TREND = 'trend';
var STRAT_VS_AVG = 'va';
var STRAT_VS_HIST = 'vh';
var STRAT_VS_ANOTHER = 'vr';





var GROW_DEGROW = [{id: "grow", label: "Growth"},{id: "degrow", label: "De-Growth"}];

var EMPTY_ARRAY=[];

var SELECT_ONE = {id:CS_NOT_SELECTED, label:'Select One'} ;

var OPS_HIGHEST = {id:CS_HIGHEST, label:'Highest'} ;
var OPS_LOWEST = {id:CS_LOWEST, label:'Lowest'} ;

var OPS_HL = [OPS_HIGHEST , OPS_LOWEST];

var OPS_ABV = {id:CS_ABOVE, label:'Above'} ;
var OPS_BELOW = {id:CS_BELOW, label:'Below'};
var OPS_BETWEEN = {id:CS_BETWEEN, label:'Between'};

var OPS_GT_EQ = {id:CS_GT_EQ, label:'Greater or Equals'} ;
var OPS_LT_EQ = {id:CS_LT_EQ, label:'Less Or Equals'} ;


var	OPS_CO_ABV	= {id: CS_CO_ABV, label:'Cross Above (CA)'} ;
var OPS_CO_BLW   = {id: CS_CO_BLW, label:'Cross Below (CB)'} ;

var OPS_CO_ABV_WITHIN = {id: CS_CO_ABV_WITHIN, label:'Cross Above Within'};
var OPS_CO_BLW_WITHIN= {id: CS_CO_BLW_WITHIN, label:'Cross Below Within'};


var OPS_ABV_RATIO = {id:CS_RATIO_ABV, label:'Ratio Above'} ;
var OPS_BELOW_RATIO = {id:CS_RATIO_BLW, label:'Ratio Below'};



// OVERLAYS_OPS_PR.push({id: CS_CO_ABV_WITHIN, label:'Cross Above Within'});
// OVERLAYS_OPS_PR.push({id: CS_CO_BLW_WITHIN, label:'Cross Below Within'});

var OPS_EQ =  {id:CS_EQUALS, label:'Equals'};

var OPS_WITHIN =  {id: WITHIN, label:'Within'};

var OPS_MORE_THAN =  {id: MORE_THAN, label:'Off More Than'};

var BASIC_OPS = [ SELECT_ONE,	OPS_ABV , OPS_BELOW  , OPS_BETWEEN ];

var AB_OPS = [ 	  OPS_ABV , OPS_BELOW 	];

var AEB_OPS = [	 OPS_ABV , OPS_EQ,  OPS_BELOW	];



var WITHIN_OFF_OPS = [ OPS_WITHIN ,OPS_MORE_THAN ];


var CS_BREAKOUT = { id : BREAK_OUT, label :   'Break Out' };
var CS_BREAKDOWN = { id : BREAK_DOWN, label :   'Break Down' };

var CS_BREAKOUT_FAKE = { id : BREAK_OUT_FAKE, label :   'Fake Break Out' };
var CS_BREAKDOWN_FAKE = { id : BREAK_DOWN_FAKE, label :   'Fake Break Down' };


var CS_BREAKOUT_SUS = { id : BREAK_OUT_SUS, label :   'Break Out & Sustaining' };
var CS_BREAKDOWN_SUS = { id : BREAK_DOWN_SUS, label :   'Break Down & Sustaining' };

var CS_BREAKOUT_TAK_SUP = { id : BREAK_OUT_TAK_SUP, label :   'Break Out & Taken Support' };
var CS_BREAKDOWN_TAK_RES = { id : BREAK_DOWN_TAK_RES, label :   'Break Down & Taken Resistance' };



// var BREAK_OUT = [CS_BREAKOUT , CS_BREAKDOWN];


// Price Volume ... 
var COMP_OPS = [OPS_ABV , OPS_GT_EQ,  OPS_EQ, OPS_BELOW ,OPS_LT_EQ , OPS_BETWEEN, OPS_WITHIN , OPS_MORE_THAN , OPS_ABV_RATIO, OPS_BELOW_RATIO ];

var COMP_DIY_OPS = [OPS_ABV , OPS_GT_EQ,  OPS_EQ, OPS_BELOW ,OPS_LT_EQ , 
	OPS_BETWEEN, OPS_WITHIN , OPS_MORE_THAN , OPS_CO_ABV , OPS_CO_BLW , OPS_CO_ABV_WITHIN , OPS_CO_BLW_WITHIN  ];


var AB_CO_OPS_BASIC =[ OPS_ABV , OPS_BELOW, OPS_CO_ABV , OPS_CO_BLW ];
// 	{id: CS_CO_ABV, label:'Cross Above (CA)'} ,
//     {id: CS_CO_BLW, label:'Cross Below (CB)'},
// ]


var TRENDING_OPS = [{id: TRENDING_UP, label:'Trending Up'},
					{id: TRENDING_DOWN, label:'Trending Down'}];


var TRENDING_OL_OPS = TRENDING_OPS.slice();
	TRENDING_OL_OPS.push({id: TRENDING_UP_ONLY_BUL_CO, label:'Trending Up Include Bullish CO Only'});
	TRENDING_OL_OPS.push({id: TRENDING_UP_NO_CO, label:'Trending Up With No CO'});
	TRENDING_OL_OPS.push({id: TRENDING_DOWN_ONLY_BEAR_CO, label:'Trending Down Include Bearish CO Only'});
	TRENDING_OL_OPS.push({id: TRENDING_DOWN_NO_CO, label:'Trending Down With No CO'});


 var  FLAT_BULL = 'flatBull';
 var  FLAT_BEAR = 'flatBear';
 
 var OL_SUP = 'olTakenSup';
 var OL_RES = 'olTakenRes';

 var FLAT_BUL_OL =  {id: FLAT_BULL, label:'Flat Bullish Line'};
 var FLAT_BEAR_OL =  {id: FLAT_BEAR, label:'Flat Bearish Line'};
 var OL_TAKEN_SUP =  {id: OL_SUP, label:'Taken Support'};
 var OL_TAKEN_RES =  {id: OL_RES , label:'Taken Resistance'};
 // var FLAT_BEAR_OL =  {id: 'flatBear', label:'Flat Bullish Line'};


var AB_CO_OPS =  AB_CO_OPS_BASIC.slice();

AB_CO_OPS.push(OPS_WITHIN);
AB_CO_OPS.push(OPS_MORE_THAN);



// var AB_CO_OPS =[
// 	{id: CS_ABOVE, label:'Above'} ,
//     {id: CS_BELOW, label:'Below'},
// 	{id: CS_CO_ABV, label:'Cross Above (CA)'} ,
//     {id: CS_CO_BLW, label:'Cross Below (CB)'},
// 	// {id: CS_CO_ABV_PT, label:'CA - Previous Tick'} ,
//  //    {id: CS_CO_BLW_PT, label:'CB - Previous Tick'},
//     {id: WITHIN, label:'Within'},
// 	{id: MORE_THAN, label:'More Than'},

// ];


var AB_CO_OPS_WITH_PT = AB_CO_OPS_BASIC.slice();

AB_CO_OPS_WITH_PT.push({id: CS_CO_ABV_PT, label:'CA - Previous Tick'});
AB_CO_OPS_WITH_PT.push({id: CS_CO_BLW_PT, label:'CB - Previous Tick'});
AB_CO_OPS_WITH_PT.push({id: WITHIN, label:'Within'});
AB_CO_OPS_WITH_PT.push({id: MORE_THAN, label:'Off More Than'});

var OVERLAYS_OPS = AB_CO_OPS_BASIC.slice()

var OVERLAYS_OPS_PR = OVERLAYS_OPS.slice();

OVERLAYS_OPS_PR.push({id: CS_CO_ABV_WITHIN, label:'Cross Above Within'});
OVERLAYS_OPS_PR.push({id: CS_CO_BLW_WITHIN, label:'Cross Below Within'});
OVERLAYS_OPS_PR.push({id: WITHIN, label:'Within'});
OVERLAYS_OPS_PR.push({id: MORE_THAN, label:'Off More Than'});

var OVERLAYS_OPS_ADV = OVERLAYS_OPS_PR.slice();

OVERLAYS_OPS_ADV = OVERLAYS_OPS_ADV.concat(TRENDING_OPS);

var OPS_AEB = [ OPS_ABV , OPS_BELOW  , OPS_BETWEEN
		  // {id:CS_ABOVE, label:'Above'} ,
		  // {id:CS_BELOW, label:'Below'},
		  // {id:CS_BETWEEN, label:'Between'},
];


var TECH_OPS = OPS_AEB.slice();

TECH_OPS.push({id: CS_CO_ABV, label:'Cross Above (CA)'}) ;
TECH_OPS.push({id: CS_CO_BLW, label:'Cross Below (CB)'});


var TECH_OPS_PR = TECH_OPS.slice();


TECH_OPS_PR.push({id: CS_CO_ABV_WITHIN, label:'Range Cross Above'});

TECH_OPS_PR.push({id: CS_CO_BLW_WITHIN, label:'Range Cross Below'});



TECH_OPS_PR.push(OPS_WITHIN);
TECH_OPS_PR.push(OPS_MORE_THAN);

var TECH_OPS_ADV = TECH_OPS_PR.slice();


// TECH_OPS_ADV.push({id: TRENDING_UP, label:'Trending Up'}) ;
// TECH_OPS_ADV.push({id: TRENDING_DOWN, label:'Trending Down'});

TECH_OPS_ADV = TECH_OPS_ADV.concat(TRENDING_OPS);


var TREND_CHANGE = [
		  {id:'n2p', label:'Negative to Positive'} ,
		  {id:'p2n', label:'Positive to Negative'} ,
];


var DIV_TYPE= [
	{id: 'bul', label: "Bullish", bul : true},
	{id: 'bulMld', label: "Mild Bull", bul : true},
	{id: 'bulWk', label: "Weak Bull", bul : true},
	{id: 'bulHid', label: "Bull Hidden", bul : true},
	{id: 'bulPot', label: "Potential Bullish", bul : true},


	{id: 'br', label: "Bearish", bul : false},
	{id: 'brMld', label: "Mild Bear", bul : false},
	{id: 'brWk', label: "Weak Bear", bul : false},
	{id: 'brHid', label: "Bear Hidden", bul : false},
	{id: 'brPot', label: "Potential Bearish", bul : true},
];


var DIV_TYPE_LEAN= [
	{id: 'bul', label: "Bullish", bul : true},
	{id: 'br', label: "Bearish", bul : false},
];



var GAIN_LOSS = [ 
				  // {id:CS_NOT_SELECTED, label:'Select One'} ,	
				  {id:'gain', label:'Gain'} ,
				  {id:'loss', label:'Loss'} ,
]


var GT_LT_OPS = [ 
				  // {id:CS_NOT_SELECTED, label:'Select One'} ,	
				  {id:CS_ABOVE, label:'Greater Than'} ,
				  {id:CS_BELOW, label:'Less Than'} ,
]

var MULTIPLES = [{id: "1", label: "1"},
	      {id: "2", label: "2"},
	      {id: "5", label: "5"},
	      {id: "10", label: "10"},
	      {id: "15", label: "15"},
	      {id: "20", label: "20"},
		  {id: "25", label: "25"},
	  ]

var LIST_CO_PERIOD =[
	{id: 'tday', label: "Today"},
	{id: 'yday', label: "Yesterday"},

];


var MA_TYPE_BASIC =[
		{id: 'sma', label: "SMA"},
		{id: 'ema', label: "EMA "},
	];

var MA_TYPE_PR =[
		{id: 'sma', label: "SMA"},
		{id: 'ema', label: "EMA"},
		{id: 'wma', label: "WMA"},
		

	];


var FREQ_CONVR_MAP = {'DEOD' :FREQ_DAILY,  'WEOD':   FREQ_WK ,  'MEOD':   FREQ_MTH,
	 'DINT':   FREQ_INTRA_DAILY,  'M120':   FREQ_HH2,  'M90':   FREQ_MM90, 
	 'M75':   FREQ_MM75,
	 'M60':   FREQ_HH1,  'M45':   FREQ_MM45,  'M30':   FREQ_MM30,
	 'M15':   FREQ_MM15,  'M10':   FREQ_MM10 ,  'M5':   FREQ_MM5
 };



var PC_COMP_LOW =[
	{id:'.1', label:'.1 %'} ,
	{id:'.2', label:'.2 %'} ,
	{id:'.3', label:'.3 %'} ,
	{id:'.5', label:'.5 %'} ,
	{id:'.8', label:'.8 %'} ,
	{id:'1', label:'1 %'} ,
	{id:'1.25', label:'1.25 %'} ,
	{id:'1.5', label:'1.5 %'} ,
    {id:'2', label:'2 %'} ,
    {id:'3', label:'3 %'} ,
    {id:'5', label:'5 %'} ,
    {id:'10', label:'10 %'} ,
];


var PC_COMP_MID = PC_COMP_LOW.slice();


PC_COMP_MID.push(   {id:'15', label:'15 %'}    )  ;
PC_COMP_MID.push(   {id:'20', label:'20 %'}    )  ;
PC_COMP_MID.push(   {id:'25', label:'25 %'}    )  ;
PC_COMP_MID.push(   {id:'30', label:'30 %'}    )  ;
PC_COMP_MID.push(   {id:'35', label:'35 %'}    )  ;
PC_COMP_MID.push(   {id:'40', label:'40 %'}    )  ;
PC_COMP_MID.push(   {id:'45', label:'45 %'}    )  ;
PC_COMP_MID.push(   {id:'50', label:'50 %'}    )  ;


var PERCENT_CMP	=   [	  
	  {id: ".2", label: "0.2 %"},	
	  {id: ".3", label: "0.3 %"},		
	  {id: ".4", label: "0.4 %"},	
	  {id: ".5", label: "0.5 %"},	
	  {id: ".7", label: "0.7 %"},	
	  {id: ".8", label: "0.8 %"},	
	  
      {id: "1",  label: "1 %"},
      {id: "2",  label: "2 %"},
      {id: "5",  label: "5 %"},
      {id: "10", label: "10 %"},
      {id: "15", label: "15 %"},
      {id: "20", label: "20 %"},
	  {id: "25", label: "25 %"},
	  {id: "30", label: "30 %"},
	  {id: "40", label: "40 %"},
	  {id: "50", label: "50 %"},
	  {id: "75", label: "75 %"},
	  {id: "90", label: "90 %"},
	  {id: "100", label: "100 %"},
	  {id: "110", label: "110 %"},
	  {id: "125", label: "125 %"},
	  {id: "150", label: "150 %"},
	  {id: "200", label: "200 %"} ,
	  {id: "500", label: "500 %"} ,
	  {id: "1000", label: "1000 %"} ];


var AEBB_MAP =[];  // ABOVE, EQQIALS , BELOW, BETWEEN


var CS_HIGH_OPTION = {id: 'high' , label: 'High'};

var CS_LOW_OPTION = {id: 'low' , label: 'Low'};



var OHLC_DET_MAP = [
	{id: 'open' , label: 'Open'},
	CS_HIGH_OPTION,
	
	CS_LOW_OPTION,
		{id: 'close' , label: 'Close'},

	{id: 'hlRange' , label: 'High Low Range'},
	{id: 'bodyRange' , label: 'Body Range'},
	{id: 'ocVal' , label: '(O+C)/2'},
	{id: 'hlc' , label: '(H+L+C)/3'},
	{id: 'ohlc' , label: '(O+H+L+C)/4'},  //(O+H+L+C)/4

];

var HL_OPTIONS = [CS_HIGH_OPTION, CS_LOW_OPTION ] ;


var OHLC_COMP_MAP = OHLC_DET_MAP.slice();

OHLC_COMP_MAP.push ( {id: 'upperWick' , label: 'Upper Wick'})   ; 
OHLC_COMP_MAP.push ( {id: 'lowerWick' , label: 'Lower Wick'})   ; 

OHLC_COMP_MAP.push ( {id: 'ohlcTrueRange' , label: 'True Range'})   ; 



OHLC_COMP_MAP = OHLC_COMP_MAP.concat(HA_FIELDS);

// OHLC_COMP_MAP.push (HA_OPEN);
// OHLC_COMP_MAP.push (HA_LOW);
// OHLC_COMP_MAP.push (HA_HIGH);
// OHLC_COMP_MAP.push (HA_CLOSE);


// OHLC_COMP_MAP.push ( {id: 'haOpen' , label: 'Heikin Ashi Open'})   ; 
// OHLC_COMP_MAP.push ( {id: 'haHigh' , label: 'Heikin Ashi High'})   ; 
// OHLC_COMP_MAP.push ( {id: 'haLow' , label: 'Heikin Ashi Low'})   ; 
// OHLC_COMP_MAP.push ( {id: 'haClose' , label: 'Heikin Ashi Close'})   ; 


var OHLC_TIME_COMP_MAP = OHLC_COMP_MAP.slice();



// OHLC_TIME_COMP_MAP.push ( {id: 'upperWick' , label: 'Upper Wick'})   ; 
// OHLC_TIME_COMP_MAP.push ( {id: 'lowerWick' , label: 'Lower Wick'})   ; 

// OHLC_TIME_COMP_MAP.push ( {id: 'ohlcTrueRange' , label: 'True Range'})   ; 

// OHLC_TIME_COMP_MAP = OHLC_TIME_COMP_MAP.concat(HA_FIELDS);

OHLC_TIME_COMP_MAP.push ({id: 'vol' , label: 'Volume'},)   ; 

var OHLC_ADV_COMP_MAP = OHLC_TIME_COMP_MAP.slice();

OHLC_ADV_COMP_MAP.unshift( {id: 'actOCHa' , label: 'Open & Close - Heikin Ashi'}   );
OHLC_ADV_COMP_MAP.unshift( {id: 'actHlHa' , label: 'High & Low - Heikin Ashi'}   );


OHLC_ADV_COMP_MAP.unshift( {id: 'actOC' , label: 'Open & Close'}   );
OHLC_ADV_COMP_MAP.unshift( {id: 'actHl' , label: 'High & Low'}   );



var OHLC_TIME = [

		{id: 'latest' , label: 'Current' , intra : false},
		
		{id: 'time' , label: 'Specific Time' , intra : true}, // intra

		{id: 'date' , label: 'Specific Date', intra : false},
		{id: 'day' , label: 'Specific Day', intra : false},
		{id: 'month' , label: 'Specific Month', intra : false},

		{id: 'firstTick' , label: 'First Tick of Day', intra : true}, // intra
		{id: 'lastTick' , label: 'Last Tick of Prev Day', intra : true},  // intra

		{id: 'firstWeekDay' , label: 'First Day of Wk', intra : false},
		{id: 'lastWeekDay' , label: 'Last Day of Prev Wk', intra : false},

		{id: 'firstMtnDay' , label: 'First Day of Mth', intra : false},
		{id: 'lastMthDay' , label: 'Last Day of Prev Mth', intra : false},


		{id: 'firstQtrDay' , label: 'First Day of Qtr', intra : false},
		{id: 'lastQtrDay' , label: 'Last Day of Prev Qtr', intra : false},

		// {id: 'firstYearDay' , label: 'First Day of the Year', intra : false},
		// {id: 'lastYearDay' , label: 'Last Day of Prev Year', intra : false},

		{id: 'p1' , label: 'Previous Tick' , intra : false},
		{id: 'p2' , label: 'P-2 Tick' , intra : false},
		{id: 'p3' , label: 'P-3 Tick' , intra : false},
		{id: 'p4' , label: 'P-4 Tick' , intra : false},
	];




var MINS_CO_INT	=   [	  
	  {id: "5", label: "5 Mins"},	
	  {id: "10", label: "10 Mins"},	
	  {id: "15", label: "15 Mins"},	
	  // {id: "20Min", label: "20 Mins"},	
	  // {id: "5Min", label: "25 Mins"},	
	  // {id: "5Min", label: "5 Mins"},	
      
      ];


var MINS_CO_INT_LONG	=   MINS_CO_INT.slice();

MINS_CO_INT_LONG.push({id: "20n", label: "20 Mins"});
MINS_CO_INT_LONG.push({id: "25", label: "25 Mins"});
MINS_CO_INT_LONG.push({id: "30", label: "30 Mins"});

// MINS_CO_INT_LONG.unshift({id: "Today", label: "Today"});



/*

var PRICE_TREND_MAP =  [{id: 'na' , label: 'Select One'},
				// {id: 'csVol'		, label: 'Volume'},
				{id: 'priceRD'	, label: 'Price Rising Days'},
				{id: 'priceRT'	, label: 'Price Rising Ticks'},
				{id: 'priceFD'	, label: 'Price Falling Days'},
				{id: 'priceFT'	, label: 'Price Falling Ticks'},
];

	var VOL_TREND_MAP =  [{id: 'na' , label: 'Select One'},
				// {id: 'csVol'		, label: 'Volume'},
				{id: 'volRD'	, label: 'Volume Rising Days'},
				{id: 'volRT'	, label: 'Volume Rising Ticks'},
				{id: 'volFD'	, label: 'Volume Falling Days'},
				{id: 'volFT'	, label: 'Volume Falling Ticks'},
		];	

	var  trendMap = [ 
			{  id : 'price' , label : 'Price Trending' 	, map : PRICE_TREND_MAP },
			{  id : 'vol' 	, label : 'Volume Trending' , map : VOL_TREND_MAP},
		];


// var TRENDING_FIELDS = ['volTrend', 'priceTrend'];

var TRENDING_DEF =[];

*/


var CANDLE_TYPES =[
	{ id:  'na', label: 'Any Candle Type' } ,
	{ id: 'green', label:  'Green Candle ' } ,
	{ id: 'red', label:  'Red Candle ' } ,

];



//---------------
	// Common Trending .... Ant trend Pattern can fit in....
//---------------

var trendDdDef = [ 
		['na', 'Select One' ] ,
		['RP', 'Rising' ] ,  // RP rising Period
		// ['RT', 'Rising Ticks' ] ,
		['FP', 'Falling' ] , // FP Falling Period
		// ['FT', 'Falling Ticks' ] 
];


var TREND_NG_OPS = [
	{id : 'rising' , label: 'Rising Trend' },
	{id : 'falling' , label: 'Falling Trend' }
];





function populateTrendObj(id, label, csType, tickType){


	var map = [];
	for(var i=0;i< trendDdDef.length;i++){
		var def = trendDdDef[i];
		var mapId = (def[0] == 'na'  ? def[0] :  id+def[0]  )
		var mapLabel = (def[0] == 'na'  ? def[1] :  label+' ' +  def[1] );
		map.push( {id: mapId , label :  mapLabel })
	}

	return { id : id , map : map , csType : csType , obj : id + "Trend", label : label + " Trending"  + ' (' + tickType+ ')', tickType : tickType}
}

function populateTrendingDef(){
	var defs = [];

	defs.push(populateTrendObj('priceDays' , 'Price' , PRICE_CS , 'Days' ));
	defs.push(populateTrendObj('priceTicks' , 'Price' , PRICE_CS , 'Ticks' ));
	defs.push(populateTrendObj('volDays' , 'Volume' , VOL_CS , 'Days'));
	defs.push(populateTrendObj('volTicks' , 'Volume' , VOL_CS , 'Ticks'));
	

	return defs;
}


var TRENDING_DEF = populateTrendingDef();

//---------------
	// Compare With Hist
//--------------- 

var TICK_COMP_MAP =[
	{id : 'price' , label: 'OHLC Compare'  , obj : 'dynpriceComp' , nextId : 'dynpriceCompId',  csType : PRICE_CS ,map : OHLC_COMP_MAP ,  defFirstIdx : 3, defSecIdx : 1 },
	{id : 'vol'   , label: 'Volume Compare' , obj: 'dynvolComp'  	, nextId : 'dynvolCompId',  csType : VOL_CS},
]; //..  tab :  'volCtrlTab' , 


var TICK_SP_COMP_MAP =[
	{id : 'price' , label: 'OHLC Specific Time '  , obj : 'dynSpTimepriceComp' , nextId : 'dynSpTimePriceCompId',  csType : PRICE_CS ,map : OHLC_TIME_COMP_MAP ,  defFirstIdx : 0, defSecIdx : 1 },
	{id : 'vol'   , label: 'Volume Specific Time' , obj: 'dynSpTimevolComp'  	, nextId : 'dynSpTimevolCompId',  csType : VOL_CS},
]; //..  tab :  'volCtrlTab' , 





var TICK_GAIN_MAP =[
		{id : 'price' , label: 'OHLC Gain/Loss' , obj: 'priceGain' ,  nextId : 'priceGainId', csType : PRICE_CS , map : OHLC_DET_MAP ,  defFirstIdx : 3, defSecIdx : 1  },
		{id : 'vol'  , label: 'Volume Gain/Loss' , obj: 'volGain'  ,  nextId : 'volGainId', csType : VOL_CS  },
	];


var TICK_TREND_MAP =[
		{id : 'price' , label: 'OHLC Trending' , obj: 'dynpriceTrendNg' ,  nextId : 'priceTrendId', csType : PRICE_CS , map : OHLC_COMP_MAP ,  defFirstIdx : 3, defSecIdx : 1  },
		{id : 'vol'  , label: 'Volume Trending' , obj: 'dynvolTrendNg'  ,  nextId : 'volTrendId', csType : VOL_CS  },
	];

