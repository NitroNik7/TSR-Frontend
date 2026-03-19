

// ==============================================
//                  PRICE_ACTION_DEF
// ==============================================


var PRICE_ACTION_DEF = [
    { id: "price", label: "Price", title: "Price", func: "csh.aebbStrut", params: ["csPrice", 220], subMenu: null, addOnce: true, premium: false },
    { id: "gainLoss", label: "Gain Loss in %", title: "Gain Loss in %", func: "csp.ctd", params: ["priceGainLoss"], subMenu: null, addOnce: true, premium: false },
    { id: "ohlcCompare", label: "OHLC Compare", title: "Add OHLC Compare", func: "cscmn.ac", params: ["price", "priceCs"], subMenu: null, addOnce: false, premium: false },
    { id: "ohlcTrending", label: "OHLC Trending", title: "Add OHLC Trending", func: "cscmn.atn", params: ["price", "priceCs"], subMenu: null, addOnce: false, premium: false },
    { id: "turnover", label: "Turnover", title: "Add Turnover", func: "csfdc.an", params: ["turnOver"], subMenu: null, addOnce: false, premium: false },
    { id: "vwap", label: "A / MA / PP - VWAP", title: "Add A / MA / PP - VWAP", func: "csp.awap", params: [], subMenu: null, addOnce: false, premium: true },
    { id: "breakOutBreakDown", label: "Break Out / Down", title: "Add Break Out / Down", func: "csp.abod", params: [], subMenu: null, addOnce: false, premium: true },
    { id: "ohlcTimeCompare", label: "OHLC Specific Time Compare", title: "Add OHLC Specific Time Compare", func: "cscmn.astc", params: ["price", "priceCs"], subMenu: null, addOnce: false, premium: true },
    { id: "ohlcvAdvanced", label: "OHLCV Advanced", title: "Add OHLCV Advanced", func: "cscmn.aao", params: ["price", "priceCs"], subMenu: null, addOnce: false, premium: true },
    { id: "demandSupplyZones", label: "Demand & Supply Zones", title: "Demand & Supply Zones", func: "csp.arbc", params: ["rbr", "priceCs"], subMenu: null, addOnce: false, premium: true },
    { id: "trendingCandleBoDwn", label: "Trending Candles", title: "Trending Candles", func: "csp.tcc", params: [], subMenu: null, addOnce: false, premium: true },
    { id: "orNg", label: "Open Range Strategies", title: "Add Open Range Strategies", func: "csp.ornc", params: [], subMenu: null, addOnce: false, premium: true },
    { id: "gapRunAway", label: "Previous Range Strategies", title: "Add Previous Range Strategies", func: "csp.prch", params: [], subMenu: null, addOnce: false, premium: true },
    { id: "gapFill", label: "Gap Strategies", title: "Add Gap Strategies", func: "csp.gfc", params: [], subMenu: null, addOnce: false, premium: true },
]

// ==============================================
//                  VOL_DEF
// ==============================================


var VOL_AEBB_MAP = [
    { id: 'csVol', label: 'Tick Volume', csType: VOL_CS, postInfo: 'For Ex if you want Volume between 3:15 PM to 3:30 PM > 500K. ' },// Id retained for historical compatibility...
    { id: 'csDayVol', label: 'Days Volume', csType: VOL_CS },

];

// csh.aebbStrut(VOL_AEBB_MAP[i].id, VOL_LABEL_WIDTH);
var VOL_DEF = [
    { id: "tickVol", label: "Tick Volume", title: "Tick Volume", func: "csh.aebbStrut", params: ["csVol", 220], subMenu: null, addOnce: true, premium: false },
    { id: "dayVol", label: "Days Volume", title: "Days Volume", func: "csh.aebbStrut", params: ["csDayVol", 220], subMenu: null, addOnce: true, premium: false },
    { id: "compPrevTick", label: "Compare With Prev Ticks", title: "Compare With Prev Ticks", func: "cscmn.ac", params: ["vol", "volCs"], subMenu: null, addOnce: false, premium: false },
    { id: "volTrend", label: "Volume Trending", title: "Add Volume Trending", func: "cscmn.atn", params: ["vol", "volCs"], subMenu: null, addOnce: false, premium: false },
    { id: "tickVolVsHistAvg", label: "Tick Vol Vs. Hist Avg", title: "Tick Vol Vs. Hist Avg", func: "csv.athv", params: ["vol", "volCs"], subMenu: null, addOnce: false, premium: false }
]


// ==============================================
//                  HIGH_LOWS_DEF
// ==============================================

var HIGH_LOWS_DEF = [
    { id: "", label: "New Intraday", title: "Add New Intraday High Lows", func: "cshl.hls", params: [], subMenu: null, addOnce: true, premium: false }, // todo need a function
    { id: "", label: "New High Lows", title: "Add New High Lows", func: "cshl.anhl", params: ["hl"], subMenu: null, addOnce: false, premium: false },
    { id: "", label: "New High Low Range", title: "Add New High Low Range", func: "cshl.anhlr", params: ["hl"], subMenu: null, addOnce: false, premium: false },
    { id: "", label: "Compare With Historical High Lows", title: "Compare With Historical High Lows", func: "cshl.hlc", params: ["hl"], subMenu: null, addOnce: false, premium: false },
];

// ==============================================
//                  BETA_VOLS_DEF
// ==============================================

var BETA_VOLS_DEF = [
    { id: "priceRange", label: "Price Range", title: "Add Price Range", func: "csu.opsCompare", params: ["prc"], subMenu: null, addOnce: false, premium: false },
    { id: "Beta", label: "Beta", title: "Add Beta", func: "csu.opsCompare", params: ["beta"], subMenu: null, addOnce: false, premium: false },
]

// ==============================================
//                  PIVOT_DEF
// ==============================================

var PIVOT_DEF = [
    { id: "pricePivotLevel", label: "Price / Pivot Levels", title: "Add Price / Pivot Levels", func: "cspp.addPP", params: ["pp"], subMenu: null, addOnce: false, premium: false },
    { id: "centralPivotLevel", label: "Central Pivot Levels", title: "Add Central Pivot Levels", func: "cspp.addCpr", params: ["cpr"], subMenu: null, addOnce: false, premium: false },
    { id: "FibRetracement", label: "Fibonacci Retracement", title: "Add Fibonacci Retracement", func: "cspp.addFibr", params: ["fibr"], subMenu: null, addOnce: false, premium: true },
]

// a. INC_STMT_ALL -- mint_cn_minV0
// b. BAL_SHEET_ALL  -- mint_cn_minV0
// c. CASH_FLOW_ALL  -- mint_cn_minV0
// ==============================================
//                  STRENGTH_DEF
// ==============================================

var STRENGTH_DEF = [
    { id: "", label: "Tech Strength", title: "Add Tech Strength", func: "csstr.addStr", params: ["techStrComp"], subMenu: null, addOnce: false, premium: false },
    { id: "", label: "Tech Rank", title: "Add Tech Rank", func: "csstr.addStr", params: ["techRankComp"], subMenu: null, addOnce: false, premium: false },
    { id: "", label: "Returns", title: "Add Returns", func: "csstr.addStr", params: ["returnsComp"], subMenu: null, addOnce: false, premium: false },
    { id: "", label: "Relative Price Strength", title: "Add Relative Price Strength", func: "csstr.addStr", params: ["relPriceStrComp"], subMenu: null, addOnce: false, premium: false },
    { id: "", label: "TSR Growth Index", title: "Add TSR Growth Index", func: "csstr.addStr", params: ["gwthStrComp"], subMenu: null, addOnce: false, premium: false },
    { id: "", label: "TSR Growth Rank", title: "Add TSR Growth Rank", func: "csstr.addStr", params: ["gwthRankComp"], subMenu: null, addOnce: false, premium: false },
    { id: "", label: "TSR Value Index", title: "Add TSR Value Index", func: "csstr.addStr", params: ["valStrComp"], subMenu: null, addOnce: false, premium: false },
    { id: "", label: "TSR Value Rank", title: "Add TSR Value Rank", func: "csstr.addStr", params: ["valRankComp"], subMenu: null, addOnce: false, premium: false },
    { id: "", label: "TSR Profit Index", title: "Add TSR Profit Index", func: "csstr.addStr", params: ["pftStrComp"], subMenu: null, addOnce: false, premium: false },
    { id: "", label: "TSR Profit Rank", title: "Add TSR Profit Rank", func: "csstr.addStr", params: ["pftRankComp"], subMenu: null, addOnce: false, premium: false },
    { id: "", label: "TSR Stablity Index", title: "Add TSR Stablity Index", func: "csstr.addStr", params: ["stabStrComp"], subMenu: null, addOnce: false, premium: false },
    { id: "", label: "TSR Stablity Rank", title: "Add TSR Stablity Rank", func: "csstr.addStr", params: ["stabRankComp"], subMenu: null, addOnce: false, premium: false },
];


// ==============================================
//                  MA_DEF
// ==============================================

var MA_DEF = [
    { id: "pma", label: "Compare Price & MA", title: "Add Compare Price & MA", func: "csma.addMa", params: ["pma"], subMenu: null, addOnce: false, premium: false },
    { id: "maco", label: "Compare Two MA's", title: "Add Compare Two MA's", func: "csma.addMa", params: ["maco"], subMenu: null, addOnce: false, premium: false },
    { id: "maTrend", label: "Trending MA", title: "Add Trending MA", func: "csma.addMa", params: ["maTrend"], subMenu: null, addOnce: false, premium: true },
    { id: "maHist", label: "DIY Hist Compare", title: "Add DIY Hist Compare", func: "csma.addMa", params: ["maHist"], subMenu: null, premium: true, addOnce: false, premium: true },
    { id: "maFakeBreak", label: "MA Fake Break", title: "Add MA Fake Break", func: "csma.addMa", params: ["maFakeBreak"], subMenu: null, addOnce: false, premium: true },
    { id: "maSupResBounce", label: "Bounced From MA", title: "Add Bounced From MA", func: "csma.addMa", params: ["maSupResBounce"], subMenu: null, addOnce: false, premium: true },
    { id: "maCon", label: "MA Convergence", title: "Add MA Convergence", func: "csma.addMa", params: ["maCon"], subMenu: null, addOnce: false, premium: true },
    { id: "maDiv", label: "MA Divergence", title: "Add MA Divergence", func: "csma.addMa", params: ["maDiv"], subMenu: null, addOnce: false, premium: true },
];



// ==============================================
//                  TECH_INDI_DEF
// ==============================================

var TECH_OBOS_CODE = "obos";
var OBOS_LIST = [
    { id: "aroon", label: "Aroon Osc", title: "Add Aroon Oscillator", func: "cst.atn", params: ["aroon", TECH_OBOS_CODE],  addOnce: false, premium: false },
    { id: "cci", label: "CCI", title: "Add CCI (Commodity Channel Index)", func: "cst.atn", params: ["cci", TECH_OBOS_CODE],  addOnce: false, premium: false },
    { id: "mfi", label: "MFI", title: "Add MFI (Money Flow Index)", func: "cst.atn", params: ["mfi", TECH_OBOS_CODE],  addOnce: false, premium: false },
    { id: "rsi", label: "RSI (Fast)", title: "Add RSI (Fast)", func: "cst.atn", params: ["rsi", TECH_OBOS_CODE],  addOnce: false, premium: false },
    { id: "rsis", label: "RSI", title: "Add RSI ( Relative Strength Indicator)", func: "cst.atn", params: ["rsis", TECH_OBOS_CODE],  addOnce: false, premium: false },
    { id: "stof", label: "Sto Fast", title: "Add Stochastic Fast", func: "cst.atn", params: ["stof", TECH_OBOS_CODE],  addOnce: false, premium: false },
    { id: "stos", label: "Sto Slow", title: "Add Stochastic Slow", func: "cst.atn", params: ["stos", TECH_OBOS_CODE],  addOnce: false, premium: false },
    { id: "stoRsi", label: "Sto RSI (FAST)", title: "Add Stochastic RSI", func: "cst.atn", params: ["stoRsi", TECH_OBOS_CODE],  addOnce: false, premium: false },
    { id: "stoRsiSlow", label: "Sto RSI", title: "Add Stochastic RSI", func: "cst.atn", params: ["stoRsiSlow", TECH_OBOS_CODE] ,  addOnce: false, premium: false},
    { id: "uo", label: "UO", title: "Add UO (Ultimate Oscillator)", func: "cst.atn", params: ["uo", TECH_OBOS_CODE],  addOnce: false, premium: false },
    { id: "wr", label: "W%R", title: "Add W%R ( Williams %R)", func: "cst.atn", params: ["wr", TECH_OBOS_CODE],  addOnce: false, premium: false },
];

var OVERLAYS_LIST = [
    { id: "", label: "Price & Bollinger", title: "Add Add Price Comparision With Bollinger Band", func: "cst.atn", params: ["bb", "price"],  addOnce: false, premium: false },
    { id: "", label: "Bollinger Squeeze", title: "Add Bollinger Bands Squeeze", func: "cst.atn", params: ["bb", "squeeze"],  addOnce: false, premium: false },
    { id: "", label: "Ichimoku (old)", title: "Add Ichimoku Old", func: "ichiOld.aim", params: ["techIchiComp"],  addOnce: false, premium: false },
    { id: "", label: "Ichimoku", title: "Add Ichimoku Cloud", func: "cst.atn", params: ["ichimoku", "ichimoku"],  addOnce: false, premium: false },
    { id: "", label: "Price & Keltner", title: "Add Price Comparision With Keltner Channel", func: "cst.atn", params: ["keltner", "price"],  addOnce: false, premium: false },
    { id: "", label: "PSAR", title: "Add Parabolic SAR", func: "cst.atn", params: ["psar", "psar"],  addOnce: false, premium: false },
];

var TREND_MOM_LIST = [
    { id: "adx", label: "ADX", title: "Add ADX (Average Directional Index)", func: "cst.atn", params: ["adx", "adx"],  addOnce: false, premium: false },
    { id: "aroon", label: "Aroon", title: "Add Aroon", func: "cst.atn", params: ["aroon", "AroonIndi"],  addOnce: false, premium: false },
    { id: "aweOsc", label: "AweOsc", title: "Add Awesome Oscillator", func: "cst.atn", params: ["aweOsc", "aweOsc"],  addOnce: false, premium: false },
    { id: "mac", label: "MACD", title: "Add MACD (Moving Average Conv & Divergence)", func: "cst.atn", params: ["mac", "macd"] ,  addOnce: false, premium: false},
    { id: "roc", label: "ROC", title: "Add ROC (Rate of Change)", func: "cst.atn", params: ["roc", "roc"],  addOnce: false, premium: false },
    { id: "rvi", label: "RVI", title: "Add RVI (Relative Vigor Idx)", func: "cst.atn", params: ["rvi", "rvi"] ,  addOnce: false, premium: false},
    { id: "st", label: "Supertrend", title: "Add Supertrend", func: "cst.atn", params: ["st", "st"],  addOnce: false, premium: false },
];

var ACC_DIST_LIST = [
    { id: "cmf", label: "CMF", title: "Add CMF (Chaikin Money Flow)", func: "cst.atn", params: ["cmf", "cmf"],  addOnce: false, premium: false },
];

var VOLATILITY_LIST = [
    { id: "atr", label: "ATR", title: "Add ATR (Average True Range)", func: "cst.atn", params: ["atr", "atr"],  addOnce: false, premium: false },
    { id: "stdDev", label: "Std Dev", title: "Add Standard Deviation", func: "cst.atn", params: ["stdDev", "stdDev"] ,  addOnce: false, premium: false},
];

var DIY_LIST = [
    { id: "", label: "Over Bot/Sold", title: "Add DIY Deep Compare Over Bot/Sold Indicators", func: "diybi.add", params: ["Obos"], addOnce: false, premium: true },
    { id: "", label: "Trend Indi", title: "Add DIY Deep Compare Trend Indicators", func: "diybi.add", params: ["Trend"], addOnce: false, premium: true },
    { id: "", label: "Momentum Indi", title: "Add DIY Deep Compare Momentum Indicators", func: "diybi.add", params: ["Momentum"], addOnce: false, premium: true },
    { id: "", label: "Accumulation Dist", title: "Add DIY Deep Compare Accumulation Distribution Indicators", func: "diybi.add", params: ["AccDist"], addOnce: false, premium: true },
    { id: "", label: "Volatility", title: "Add DIY Deep Compare Volatility Indicators", func: "diybi.add", params: ["Volatility"], addOnce: false, premium: true },
    { id: "", label: "Overlays", title: "Add DIY Deep Compare Overlays", func: "diybi.add", params: ["Overlays"], addOnce: false, premium: true },
];


var TECH_INDI_DEF = [
    { id: TECH_OBOS_CODE, label: "Over Bot/Sold", func: null, params: null, subMenu: OBOS_LIST },
    { id: "overlays", label: "Overlays", func: null, params: null, subMenu: OVERLAYS_LIST },
    { id: "trendMom", label: "Trend/Momentum", func: null, params: null, subMenu: TREND_MOM_LIST },
    { id: "accDist", label: "Accumulation / Distribution", func: null, params: null, subMenu: ACC_DIST_LIST },
    { id: "vol", label: "Volatility", func: null, params: null, subMenu: VOLATILITY_LIST },
    { id: "diy", label: "DIY - Advance Comparision", func: null, params: null, subMenu: DIY_LIST },
];


// ==============================================
//                  DIVERGENCE_DEF
// ==============================================

var DIV_OBOS_CODE = "obos";

var DIV_OBOS_LIST = [
    { id: "aroonOsc", label: "Aroon Osc", title: "Aroon Oscillator", func: "csd.adv", params: ["aroonOsc", DIV_OBOS_CODE],  addOnce: false, premium: false },
    { id: "cci", label: "CCI", title: "CCI (Commodity Channel Index)", func: "csd.adv", params: ["cci", DIV_OBOS_CODE] ,  addOnce: false, premium: false},
    { id: "mfi", label: "MFI", title: "MFI (Money Flow Index)", func: "csd.adv", params: ["mfi", DIV_OBOS_CODE] ,  addOnce: false, premium: false},
    { id: "rsi", label: "RSI (Fast)", title: "RSI (Fast)", func: "csd.adv", params: ["rsi", DIV_OBOS_CODE],  addOnce: false, premium: false },
    { id: "rsis", label: "RSI", title: "RSI ( Relative Strength Indicator)", func: "csd.adv", params: ["rsis", DIV_OBOS_CODE] ,  addOnce: false, premium: false},
    { id: "stof", label: "Sto Fast", title: "Stochastic Fast", func: "csd.adv", params: ["stof", "sto"] ,  addOnce: false, premium: false},
    { id: "stos", label: "Sto Slow", title: "Stochastic Slow", func: "csd.adv", params: ["stos", "sto"] ,  addOnce: false, premium: false},
    { id: "stoRsi", label: "Sto RSI (FAST)", title: "Stochastic RSI", func: "csd.adv", params: ["stoRsi", "stoRsi"],  addOnce: false, premium: false },
    { id: "stoRsiSlow", label: "Sto RSI", title: "Stochastic RSI", func: "csd.adv", params: ["stoRsiSlow", "stoRsi"],  addOnce: false, premium: false },
    { id: "uo", label: "UO", title: "UO (Ultimate Oscillator)", func: "csd.adv", params: ["uo", DIV_OBOS_CODE],  addOnce: false, premium: false },
    { id: "wr", label: "W%R", title: "W%R ( Williams %R)", func: "csd.adv", params: ["wr", DIV_OBOS_CODE],  addOnce: false, premium: false },

];
var TREND_DIV_LIST = [
    { id: "adx", label: "ADX", title: "ADX (Average Directional Index)", func: "csd.adv", params: ["adx", "adx"],  addOnce: false, premium: false },
    { id: "atr", label: "ATR", title: "ATR (Average True Range)", func: "csd.adv", params: ["atr", "atr"],  addOnce: false, premium: false },
    { id: "aweOsc", label: "AweOsc", title: "Awesome Oscillator", func: "csd.adv", params: ["aweOsc", "aweOsc"],  addOnce: false, premium: false },
    { id: "mac", label: "MACD", title: "MACD (Moving Average Conv & Divergence)", func: "csd.adv", params: ["mac", "macd"],  addOnce: false, premium: false },
    { id: "macdHist", label: "MACD Hist", title: "MACD Histogram", func: "csd.adv", params: ["macdHist", "macdHist"],  addOnce: false, premium: false },
    { id: "roc", label: "ROC", title: "ROC (Rate of Change)", func: "csd.adv", params: ["roc", "roc"],  addOnce: false, premium: false },
    { id: "rvi", label: "RVI", title: "RVI (Relative Vigor Idx)", func: "csd.adv", params: ["rvi", "rvi"],  addOnce: false, premium: false },

];
var VOL_DIV_LIST = [
    { id: "cmf", label: "CMF", title: "CMF Chaikin Money Flow", func: "csd.adv", params: ["cmf", "cmf"],  addOnce: false, premium: false },
    { id: "adi", label: "ADI", title: "ADI Accumulation Distribution Index", func: "csd.adv", params: ["adi", "adi"],  addOnce: false, premium: false },
];


var DIVERGENCE_DEF = [
    { id: DIV_OBOS_CODE, label: "Over Bot/Sold", func: null, params: null, subMenu: DIV_OBOS_LIST },
    { id: "", label: "Trend", func: null, params: null, subMenu: TREND_DIV_LIST },
    { id: "", label: "Volume Based", func: null, params: null, subMenu: VOL_DIV_LIST },
];



// ==============================================
//                  CHART_PATTERN_DEF
// ==============================================

var CANDLE_LIST_CODE = "candle";
var RANGE_LIST_CODE = "range";
var PATTERN_LIST_CODE = "pat";

// var CANDLE_LIST = [
//     { id: "bullCs", label: "Bullish Candle", title: "Bullish Candlestick Chart Pattern", func: "cscp.acp", params: ["bullCs", CANDLE_LIST_CODE] },
//     { id: "bearCs", label: "Bearish Candle", title: "Bearish Candlestick Chart Pattern", func: "cscp.acp", params: ["bearCs", CANDLE_LIST_CODE] },
//     { id: "odCs", label: "One Tick Candle", title: "One Tick  Chart Pattern", func: "cscp.acp", params: ["odCs", CANDLE_LIST_CODE] },
//     { id: "haCs", label: "Heikin Ashi", title: "Heikin Ashi Chart Pattern", func: "cscp.acp", params: ["haCs", CANDLE_LIST_CODE] },
// ];

// var CANDLE_RANGE_LIST = [
//     { id: "narRng", label: "Narrow Range", title: "Create Narrow Range Patterns like NR4 , NR7", func: "cscp.acp", params: ["narRng", RANGE_LIST_CODE] },
//     { id: "wideRng", label: "Wide Range", title: "Create Wide Range Patterns", func: "cscp.acp", params: ["wideRng", RANGE_LIST_CODE] },
//     { id: "masCan", label: "Master Candle", title: "Create Master Candle Patterns ", func: "cscp.acp", params: ["masCan", RANGE_LIST_CODE] },
// ];

// var CHART_PATTERNS = [
//     { id: "popBul", label: "Popular (Bullish)", title: "Popular Bullish Pattern", func: "cscp.acp", params: ["popBul", PATTERN_LIST_CODE] },
//     { id: "popBear", label: "Popular Bearish Pattern", title: "Popular Bearish Pattern", func: "cscp.acp", params: ["popBear", PATTERN_LIST_CODE] },
//     { id: "tri", label: "Triangle", title: "Triangle Pattern", func: "cscp.acp", params: ["tri", PATTERN_LIST_CODE] },
//     { id: "chn", label: "Channel", title: "Channel Pattern", func: "cscp.acp", params: ["chn", PATTERN_LIST_CODE] },
//     { id: "tl", label: "Trendline", title: "Trendline", func: "cscp.acp", params: ["tl", PATTERN_LIST_CODE] },
//     { id: "hhll", label: "Higher High/Lows", title: "Higher High and Higher Lows", func: "cscp.acp", params: ["hhll", PATTERN_LIST_CODE] },
// ];

// var CP_FIELDS = [
//     { id: 'bullCs', label: 'Bullish Candlestick Pattern', shortName: 'Bull Candle', elems: CP_CANDLE_BULL, patType: 'candle' },
//     { id: 'bearCs', label: 'Bearish Candlestick Pattern', shortName: 'Bear Candle', elems: CP_CANDLE_BEAR, patType: 'candle' },
//     { id: 'odCs', label: 'One Period Candlestick Pattern', shortName: 'One Candle', elems: CP_CANDLE_SINGLE, patType: 'candle' },
//     // { id:  'bullishharami',label : 'Bullish Heikin Ashi Pattern' , elems : CP_HA_BULLISH},
//     // { id: 'bearHa',label : 'Bearish Heikin Ashi Pattern' , elems : CP_HA_BEARISH},
//     // { id: 'conHa',label : 'Consolidation/Reversal Heikin Ashi Pattern' , elems : CP_HA_CONSOLIDATION}
//     { id: 'haCs', label: 'Heikin Ashi', shortName: 'Heikin Ashi', elems: CP_HA_PATTERN, patType: 'ha' },

//     { id: 'narRng', label: 'Narrow Range ', shortName: 'Narrow Range ', elems: NARROW_RANGE_PAT, patType: 'range' },
//     { id: 'wideRng', label: 'Wide Range ', shortName: 'Wide Range ', elems: WIDE_RANGE_PAT, patType: 'range' },
//     { id: 'masCan', label: 'Master Candle ', shortName: 'Master Candle ', elems: MASTER_CANDLE_PAT, patType: 'range' },

//     // patterns ...
//     { id: 'popBul', label: 'Popular (Bullish) ', shortName: 'Popular (Bullish) ', elems: POP_PAT_BULL, patType: 'pat' },
//     { id: 'popBear', label: 'Popular (Bearish) ', shortName: 'Popular (Bearish) ', elems: POP_PAT_BEAR, patType: 'pat' },
//     { id: 'tri', label: 'Triangle ', shortName: 'Triangle ', elems: TRIANGLE_PAT, patType: 'pat' },
//     { id: 'chn', label: 'Channel ', shortName: 'Channel ', elems: CHANNEL_PAT, patType: 'pat' },

//     { id: 'tl', label: 'Trendline ', shortName: 'Trendline ', elems: TREND_LINE_PAT, patType: 'pat' },

//     { id: 'hhll', label: 'Higher Highs/Lows ', shortName: 'HHLL / LHLL ', elems: HH_LL_PAT, patType: 'pat' },
// ];


var CANDLE_LIST = [];
var CANDLE_RANGE_LIST = [];
var CHART_PATTERNS = [];

for (let i = 0; i < CP_FIELDS.length; i++) {
    let field = CP_FIELDS[i];
    field["title"] = "Add " + field["id"];
    field["func"] = "cscp.acp";
    if (field["patType"] == CANDLE_LIST_CODE) {
        field["params"] = [field["id"], CANDLE_LIST_CODE];
        CANDLE_LIST.push(field);
    } else if (field["patType"] == RANGE_LIST_CODE) {
        field["params"] = [field["id"], RANGE_LIST_CODE];
        CANDLE_RANGE_LIST.push(field);
    } else if (field["patType"] == PATTERN_LIST_CODE) {
        field["params"] = [field["id"], PATTERN_LIST_CODE];
        CHART_PATTERNS.push(field);
    }
}

var CHART_PATTERN_DEF = [
    { id: CANDLE_LIST_CODE, label: "Candle / HA", func: null, params: null, subMenu: CANDLE_LIST },
    { id: RANGE_LIST_CODE, label: "Candle Range Based", func: null, params: null, subMenu: CANDLE_RANGE_LIST },
    { id: PATTERN_LIST_CODE, label: "Chart Patterns", func: null, params: null, subMenu: CHART_PATTERNS },
];



// ==============================================
//                  FIN_RATIO_DEF
// ==============================================

var HL_LIST_CODE = 'finHl';
var GURU_LIST_CODE = 'guruNo';
var VAL_RATIO_LIST_CODE = 'valRat';
var PFT_RATIO_LIST_CODE = 'pftRat';
var SOL_RATIO_LIST_CODE = 'solRat';
var EFF_RATIO_LIST_CODE = 'effRat';


var HL_LIST = [];

function inithighlights() {
    if (HL_LIST.length > 0) {
        return; // Already inited .... 
    }

    HL_LIST.push(jsu.getObjFrmArr(RATIO_PRICE, 'marCap'));
    HL_LIST.push(jsu.getObjFrmArr(RATIO_PRICE, 'divYield'));
    HL_LIST.push(jsu.getObjFrmArr(SHARE_FIELD, 'shInst'));
    HL_LIST.push(jsu.getObjFrmArr(SHARE_FIELD, 'shInsider'));
    HL_LIST.push(jsu.getObjFrmArr(RATIO_PRICE, 'fwdPe'));
    HL_LIST.push(jsu.getObjFrmArr(RATIO_PRICE, 'entVal'));
    HL_LIST.push(jsu.getObjFrmArr(SHARE_FIELD, 'outShare'));
    HL_LIST.push(jsu.getObjFrmArr(SHARE_FIELD, 'floatShare'));
    HL_LIST.push(jsu.getObjFrmArr(SHARE_FIELD, 'floatToOsShare'));
    HL_LIST.push(jsu.getObjFrmArr(SHARE_FIELD, 'faceVal'));
}

inithighlights();

for (let i = 0; i < HL_LIST.length; i++) {
    HL_LIST[i]["title"] = "Add " + HL_LIST[i]["label"];
    HL_LIST[i]["func"] = "csFrNg.ae";
    HL_LIST[i]["params"] = [HL_LIST_CODE, HL_LIST[i]["id"]];
}


function addToRatioList(LIST, DEF, LIST_CODE, func) {
    // let defClone = mintJsUtil.cloneArray(DEF);
    let defClone = structuredClone(DEF);

    for (let i = 0; i < defClone.length; i++) {
        if (defClone[i]["id"] == "period")
            continue;
        LIST.push(defClone[i]);
    }

    for (let i = 0; i < LIST.length; i++) {
        LIST[i]["title"] = "Add " + LIST[i]["label"];
        LIST[i]["func"] = func;
        LIST[i]["params"] = [LIST_CODE, LIST[i]["id"]];
    }
}

var GURU_LIST = [];
addToRatioList(GURU_LIST, GURU_NUMBERS, GURU_LIST_CODE, "csFrNg.ae");

var VAL_RATIO_LIST = [];
addToRatioList(VAL_RATIO_LIST, RATIO_VAL_DEF, VAL_RATIO_LIST_CODE, "csFrNg.ae");

var PFT_RATIO_LIST = [];
addToRatioList(PFT_RATIO_LIST, RATIO_PFT_DEF, PFT_RATIO_LIST_CODE, "csFrNg.ae");

var SOL_RATIO_LIST = [];
addToRatioList(SOL_RATIO_LIST, RATIO_SOL_DEF, SOL_RATIO_LIST_CODE, "csFrNg.ae");

var EFF_RATIO_LIST = [];
addToRatioList(EFF_RATIO_LIST, RATIO_EFF_DEF, EFF_RATIO_LIST_CODE, "csFrNg.ae");

var FIN_RATIO_DEF = [
    { id: HL_LIST_CODE, label: "Highlights", func: null, params: null, subMenu: HL_LIST },
    { id: GURU_LIST_CODE, label: "Guru Numbers", func: null, params: null, subMenu: GURU_LIST },
    { id: VAL_RATIO_LIST_CODE, label: "Valuation Ratios", func: null, params: null, subMenu: VAL_RATIO_LIST },
    { id: PFT_RATIO_LIST_CODE, label: "Profitability Ratios", func: null, params: null, subMenu: PFT_RATIO_LIST },
    { id: SOL_RATIO_LIST_CODE, label: "Solvency Ratios", func: null, params: null, subMenu: SOL_RATIO_LIST },
    { id: EFF_RATIO_LIST_CODE, label: "Efficiency Ratios", func: null, params: null, subMenu: EFF_RATIO_LIST }
];


// ==============================================
//                  FIN_STMT
// ==============================================

var BS_LIST_CODE = 'balSheet';
var CF_LIST_CODE = 'cashFlow';
var ISY_LIST_CODE = 'isYr';
var ISQ_LIST_CODE = 'isQtr';

// function (b, h, n) { return n ? b.slice(h, b.length - 1) : b.slice(0, h) }

function addStmtToList(LIST, DEF, LIST_CODE, func) {
    // let defClone = mintJsUtil.cloneArray(DEF); // todo ASK Rohit Sir
    let defClone = structuredClone(DEF);
    for (let i = 0; i < defClone.length; i++) {
        if (defClone[i]["id"] == "period" || !(jsu.isNotNull(defClone[i]["ngDiy"]) && defClone[i]["ngDiy"]))
            continue;
        LIST.push(defClone[i]);
    }

    for (let i = 0; i < LIST.length; i++) {
        LIST[i]["title"] = "Add " + LIST[i]["label"];
        LIST[i]["func"] = func;
        LIST[i]["params"] = [LIST_CODE, LIST[i]["id"]];
    }
}

var BS_LIST = [];
addStmtToList(BS_LIST, BAL_SHEET_ALL, BS_LIST_CODE, "csStmtNg.ae");

var CF_LIST = [];
addStmtToList(CF_LIST, CASH_FLOW_ALL, CF_LIST_CODE, "csStmtNg.ae");


var ISY_LIST = [];
addStmtToList(ISY_LIST, INC_STMT_ALL, ISY_LIST_CODE, "csStmtNg.ae");

var ISQ_LIST = [];
addStmtToList(ISQ_LIST, INC_STMT_ALL, ISQ_LIST_CODE, "csStmtNg.ae");

var FIN_STMT_DEF = [
    { id: BS_LIST_CODE, label: "Balance Sheet", func: null, params: null, subMenu: BS_LIST },
    { id: CF_LIST_CODE, label: "Cash Flow", func: null, params: null, subMenu: CF_LIST },
    { id: ISY_LIST_CODE, label: "Income Statement (FY)", func: null, params: null, subMenu: ISY_LIST },
    { id: ISQ_LIST_CODE, label: "Income Statement (Qtr)", func: null, params: null, subMenu: ISQ_LIST },
];

