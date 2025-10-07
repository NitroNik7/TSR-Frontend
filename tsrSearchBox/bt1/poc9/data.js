
// * -------------------------------------------
// * FOR CHARTS

var CHART_SUB_CATEGORY = [];



// * -------------------------------------------
// * FOR EQUITY

// For buttons
var ALL_SEARCH_CAT = [
    { id: 'BirdsEyeView', label: "Birds Eye View", default: true, urlPrefix: "Stock" },
    { id: 'MovingAverages', label: "MA", default: true, urlPrefix: "Stock" },
    { id: 'TechnicalAnalysis', label: "Tech", default: true, urlPrefix: "Stock" },
    { id: 'FundamentalAnalysis', label: "Funda", default: false, mappedParam: "funda", urlPrefix: "Stock" },
    { id: 'FuturesAndOptions', label: "FNO", default: false, mappedParam: "fno", urlPrefix: "Stock" },
    { id: 'Candlestick', label: "Candlestick", default: true, urlPrefix: "Stock" },
];

// TECH INDI BUTTONS
var TECH_INDI = [
    { id: 'TechnicalAnalysis', label: "All Technicals ", default: true, urlPrefix: "Stock" },
    { id: 'ADX', label: "ADX", default: true, urlPrefix: "ViewInChart" },
    { id: 'AROON', label: "AROON", default: true, urlPrefix: "ViewInChart" },
    { id: 'AwesomeOscillator', label: "AwesomeOsc", default: true, urlPrefix: "ViewInChart" },
    { id: 'BOLLINGER', label: "Bollinger", default: true, urlPrefix: "ViewInChart" },
    { id: 'CCI', label: "CCI", default: true, urlPrefix: "ViewInChart" },
    { id: 'CMF', label: "CMF", default: true, urlPrefix: "ViewInChart" },
    { id: 'KeltnerBand', label: "KeltnerBand", default: true, urlPrefix: "ViewInChart" },
    { id: 'MACD', label: "MACD", default: true, urlPrefix: "ViewInChart" },
    { id: 'MFI', label: "MFI", default: true, urlPrefix: "ViewInChart" },
    { id: 'PSAR', label: "PSAR", default: true, urlPrefix: "ViewInChart" },
    { id: 'RsiSmooth', label: "RSI", default: true, urlPrefix: "ViewInChart" },
    { id: 'ROC', label: "ROC", default: true, urlPrefix: "ViewInChart" },
    { id: 'Supertrend', label: "Supertrend", default: true, urlPrefix: "ViewInChart" },
    { id: 'WilliamsR', label: "WilliamsR", default: true, urlPrefix: "ViewInChart" },
];

// FUNDA BUTTONS
var FUNDA_INDI = [
    { id: 'any', label: "All Fundamentals ", default: true, urlPrefix: "Stock" },
    { id: 'AltmanZScore', label: "Altman Z", default: true, urlPrefix: "Financial" },
    { id: 'CashRatio', label: "Cash Ratio", default: true, urlPrefix: "Financial" },
    { id: 'DebtToEquityRatio', label: "Debt to Eq Ratio", default: true, urlPrefix: "Financial" },

    { id: 'EBITDAMargin', label: "EBITDA Margin", default: true, urlPrefix: "Financial" },
    { id: 'EVToEBITDA', label: "EV to EBITDA", default: true, urlPrefix: "Financial" },

    { id: 'NetProfitMargin', label: "Net Profit Margin", default: true, urlPrefix: "Financial" },
    { id: 'OperatingProfitMargin', label: "Ops Profit Margin", default: true, urlPrefix: "Financial" },
    { id: 'PiotroskiFScore', label: "Piotroski F Score", default: true, urlPrefix: "Financial" },
    { id: 'PriceToEarningRatio', label: "PE Ratio", default: true, urlPrefix: "Financial" },
    { id: 'PriceToBookRatio', label: "Price To Book", default: true, urlPrefix: "Financial" },
    { id: 'PriceToSalesRatio', label: "Price To Sales", default: true, urlPrefix: "Financial" },
    { id: 'QuickRatio', label: "Quick Ratio", default: true, urlPrefix: "Financial" },
    { id: 'ReturnOnEquity', label: "Return on Equity", default: true, urlPrefix: "Financial" },
    { id: 'ReturnOnAsset', label: "Return On Asset", default: true, urlPrefix: "Financial" },
    { id: 'ShareholdersEquityRatio', label: "Sh Equity Ratio", default: true, urlPrefix: "Financial" },
];

// FNO BUTTONS
let FNO_CAT = [
    { id: 'FuturesAndOptions', label: "Summary", default: true },
    { id: 'ViewOptionChain', label: "Option Chain", default: true },
    { id: 'ViewPutCallRatio', label: "Put Call Ratio", default: true },
];

// MA BUTTONS
let MA_CAT = [
    { id: 'SMA', label: "SMA", default: true },
    { id: 'EMA', label: "EMA", default: true },
    { id: 'WMA', label: "WMA", default: true },
    { id: 'HullMA', label: "Hull MA", default: true },
    { id: 'SmoothMA', label: "Smooth MA", default: true },
    { id: 'WilderMA', label: "Wilder MA", default: true },
    { id: 'DoubleEMA', label: "Double EMA", default: true },
    { id: 'TripleEMA', label: "Triple EMA", default: true },
    { id: 'TriangleMA', label: "Triangle MA", default: true },
    { id: 'ZLEMA', label: "Zero Lag EMA", default: true },
];

// url: https://www.tsrbt1.com/rt/Stock/A2ZINFRA/BirdsEyeView
// url: https://www.tsrbt1.com/rt/Stock/A2ZINFRA/FundamentalAnalysis
// url: https://www.tsrbt1.com/rt/Stock/A2ZINFRA/MovingAverage
// url: https://www.tsrbt1.com/rt/Stock/A2ZINFRA/TechnicalAnalysis
// url: https://www.tsrbt1.com/rt/Stock/RELIANCE/FuturesAndOptions
// url: https://www.tsrbt1.com/rt/Stock/A2ZINFRA/PivotPoint
// https://www.tsrbt1.com/rt/Stock/AADHARHFC/Candlestick

// url: https://www.tsrbt1.com/rt/Financial/A2ZINFRA/CashRatio - FUnda
// url: https://www.tsrbt1.com/rt/ViewInChart/AAATECH/BOLLINGER - Tech
var EQUITY_SUB_CAT = [
    { id: 'any', label: "All ", buttons: ALL_SEARCH_CAT, urlPrefix: "Stock", urlSuffix: "BirdsEyeView", default: true },
    { id: 'FundamentalAnalysis', label: "Stock Fundamentals", urlPrefix: "Stock", urlSuffix: "FundamentalAnalysis", buttons: FUNDA_INDI, default: false, mappedParam: "funda" },
    { id: 'MovingAverage', label: "Stock Moving Average", urlPrefix: "Stock", urlSuffix: "MovingAverage", buttons: MA_CAT, default: true },
    { id: 'TechnicalAnalysis', label: "Stock Technicals", urlPrefix: "Stock", urlSuffix: "ViewInChart", buttons: TECH_INDI, default: true },
    { id: 'FuturesAndOptions', label: "Futures & Options", urlPrefix: "Stock", urlSuffix: "FuturesAndOptions", buttons: FNO_CAT, default: false, mappedParam: "fno" },
];




// * --------------------------------------
// * FOR SCREENERS

var SCREENER_SUB_CATEGORY = [
    { id: 'any', label: "All ", default: true },
    { id: 'CandlestickScreeners', label: "Candlestick Screeners", default: false, mappedParam: "candlestick" },
    { id: 'TechnicalScreeners', label: "Technical Screeners", default: false, mappedParam: "tech" },
];


// * --------------------------------------
//  * OTHER

var searchMenu = [
    { id: "charts", label: "Charts", inputPlaceholder: "Search a Chart", subCat: CHART_SUB_CATEGORY, catData: chartData, jsFnc: true },
    { id: "equity", label: "Equity", default: true, inputPlaceholder: "Search a Stock", subCat: EQUITY_SUB_CAT, catData: EQ_DEF_DATA },
    { id: "screeners", label: "Screeners", inputPlaceholder: "Search a Screener", subCat: SCREENER_SUB_CATEGORY, catData: SCR_DEF_DATA },
];



var base_url = "https://www.tsrbt1.com/rt/";








