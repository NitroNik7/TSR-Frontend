
let chartData = [
    {
        code: "EQ001", name: "Equity One Ltd.", industry: "FINANCE - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ002", name: "Equity Two Ltd.", industry: "TECHNOLOGY - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ003", name: "Equity Three Ltd.", industry: "PHARMA - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ004", name: "Equity Four Ltd.", industry: "AUTOMOBILE - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ005", name: "Equity Five Ltd.", industry: "TEXTILE - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ006", name: "Equity Six Ltd.", industry: "ENERGY - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ007", name: "Equity Seven Ltd.", industry: "BANKING - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ008", name: "Equity Eight Ltd.", industry: "CHEMICALS - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ009", name: "Equity Nine Ltd.", industry: "INFRASTRUCTURE - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ010", name: "Equity Ten Ltd.", industry: "MEDIA - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ011", name: "Equity Eleven Ltd.", industry: "RETAIL - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ012", name: "Equity Twelve Ltd.", industry: "FOOD - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ013", name: "Equity Thirteen Ltd.", industry: "LOGISTICS - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ014", name: "Equity Fourteen Ltd.", industry: "REAL ESTATE - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ015", name: "Equity Fifteen Ltd.", industry: "IT SERVICES - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ016", name: "Equity Sixteen Ltd.", industry: "TELECOM - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ017", name: "Equity Seventeen Ltd.", industry: "FMCG - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ018", name: "Equity Eighteen Ltd.", industry: "METALS - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ019", name: "Equity Nineteen Ltd.", industry: "OIL & GAS - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ020", name: "Equity Twenty Ltd.", industry: "POWER - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ021", name: "Equity Twenty-One Ltd.", industry: "AGRICULTURE - INDIA",
        defaultUrl: "https://example.com",
    },

    {
        code: "EQ022", name: "Equity Twenty-Two Ltd.", industry: "DEFENSE - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ023", name: "Equity Twenty-Three Ltd.", industry: "AVIATION - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ024", name: "Equity Twenty-Four Ltd.", industry: "TOURISM - INDIA",
        defaultUrl: "https://example.com",

    },
    {
        code: "EQ025", name: "Equity Twenty-Five Ltd.", industry: "EDUCATION - INDIA",
        defaultUrl: "https://example.com",

    }
];

let screenerData = [];


// Dummy equityData array with 25 items
let equityData = [
    {
        code: "EQ001", name: "Equity One Ltd.", industry: "FINANCE - INDIA",
        defaultUrl: "",
        funda: true,
        tech: true,
        fno: true,
        ma: true
    },
    {
        code: "EQ002", name: "Equity Two Ltd.", industry: "TECHNOLOGY - INDIA",
        defaultUrl: "",
        funda: true,
        tech: true,
        fno: true,
        ma: true
    },
    {
        code: "EQ003", name: "Equity Three Ltd.", industry: "PHARMA - INDIA",
        defaultUrl: "",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com",
            "Candlestick": "https://example.com",
        }
    },
    {
        code: "EQ004", name: "Equity Four Ltd.", industry: "AUTOMOBILE - INDIA",
        defaultUrl: "",
        funda: true,
        tech: true,
        fno: true,
        ma: true
    },
    {
        code: "EQ005", name: "Equity Five Ltd.", industry: "TEXTILE - INDIA",
        defaultUrl: "",
        funda: true,
        tech: true,
        fno: true,
        ma: true
    },
    {
        code: "EQ006", name: "Equity Six Ltd.", industry: "ENERGY - INDIA",
        defaultUrl: "",
        funda: true,
        tech: true,
        fno: true,
        ma: true
    },
    {
        code: "EQ007", name: "Equity Seven Ltd.", industry: "BANKING - INDIA",
        defaultUrl: "",
        funda: true,
        tech: true,
        fno: true,
        ma: true
    },
    {
        code: "EQ008", name: "Equity Eight Ltd.", industry: "CHEMICALS - INDIA",
        defaultUrl: "",
        funda: true,
        tech: true,
        fno: true,
        ma: true
    },
    {
        code: "EQ009", name: "Equity Nine Ltd.", industry: "INFRASTRUCTURE - INDIA",
        defaultUrl: "",
    },
    {
        code: "EQ010", name: "Equity Ten Ltd.", industry: "MEDIA - INDIA",
        defaultUrl: "",
    },
    {
        code: "EQ011", name: "Equity Eleven Ltd.", industry: "RETAIL - INDIA",
        defaultUrl: "",
    },
    {
        code: "EQ012", name: "Equity Twelve Ltd.", industry: "FOOD - INDIA",
        defaultUrl: "",
    },
    {
        code: "EQ013", name: "Equity Thirteen Ltd.", industry: "LOGISTICS - INDIA",
        defaultUrl: "",
        funda: true,
        tech: true,
        fno: true,
        ma: true
    },
    {
        code: "EQ014", name: "Equity Fourteen Ltd.", industry: "REAL ESTATE - INDIA",
        defaultUrl: "",
    },
    {
        code: "EQ015", name: "Equity Fifteen Ltd.", industry: "IT SERVICES - INDIA",
        defaultUrl: "",
        funda: true,
        tech: true,
        fno: true,
        ma: true
    },
    {
        code: "EQ016", name: "Equity Sixteen Ltd.", industry: "TELECOM - INDIA",
        defaultUrl: "",
        funda: true,
        tech: true,
        fno: true,
        ma: true
    },
    {
        code: "EQ017", name: "Equity Seventeen Ltd.", industry: "FMCG - INDIA",
        defaultUrl: "",
    },
    {
        code: "EQ018", name: "Equity Eighteen Ltd.", industry: "METALS - INDIA",
        defaultUrl: "",
        funda: true,
        tech: true,
        fno: true,
        ma: true
    },
    {
        code: "EQ019", name: "Equity Nineteen Ltd.", industry: "OIL & GAS - INDIA",
        defaultUrl: "",
        fno: true,
    },
    {
        code: "EQ020", name: "Equity Twenty Ltd.", industry: "POWER - INDIA",
        defaultUrl: "",
        fno: true,
    },
    {
        code: "EQ021", name: "Equity Twenty-One Ltd.", industry: "AGRICULTURE - INDIA",
        defaultUrl: "",
    },
    {
        code: "EQ022", name: "Equity Twenty-Two Ltd.", industry: "DEFENSE - INDIA",
        defaultUrl: "",
        fno: true,
    },
    {
        code: "EQ023", name: "Equity Twenty-Three Ltd.", industry: "AVIATION - INDIA",
        defaultUrl: "",
    },
    {
        code: "EQ024", name: "Equity Twenty-Four Ltd.", industry: "TOURISM - INDIA",
        defaultUrl: "",
        fno: true,
    },
    {
        code: "EQ025", name: "Equity Twenty-Five Ltd.", industry: "EDUCATION - INDIA",
        defaultUrl: "",
    }
];


var CHARTS_SUB_CATEGORY = [
    { id: 'any', label: "All " },
]




// For buttons
var ALL_SEARCH_CAT = [
    { id: 'BirdsEyeView', label: "Birds Eye View" },
    { id: 'MovingAverages', label: "MA" },
    { id: 'TechnicalAnalysis', label: "Tech" },
    { id: 'FundamentalAnalysis', label: "Funda" },
    { id: 'FuturesAndOptions', label: "FNO" },
    { id: 'Candlestick', label: "Candlestick" },
];



var EQUITY_SUB_CAT = [
    { id: 'any', label: "All " },
    // { id: 'Screener', label: "Screener Only" },
    // { id: 'BirdsEyeView', label: "Stock Birds Eye View" },
    // { id: 'Candlestick', label: "Stock Candlestick" },
    // { id: 'InteractiveCharts', label: "Stock Interactive Charts" },
    { id: 'FundamentalAnalysis', label: "Stock Fundamentals" },
    { id: 'MovingAverage', label: "Stock Moving Average" },
    { id: 'TechnicalAnalysis', label: "Stock Technicals" },
    // { id: 'PivotPoint', label: "Stock Pivot Point" },
    { id: 'FuturesAndOptions', label: "Futures & Options" },
];

var TECH_INDI = [
    { id: 'any', label: "All Technicals " },
    { id: 'ADX', label: "ADX" },
    { id: 'AROON', label: "AROON" },
    { id: 'AwesomeOscillator', label: "AwesomeOsc" },
    { id: 'BOLLINGER', label: "Bollinger" },
    { id: 'CCI', label: "CCI" },
    { id: 'CMF', label: "CMF" },
    { id: 'KeltnerBand', label: "KeltnerBand" },
    { id: 'MACD', label: "MACD" },
    { id: 'MFI', label: "MFI" },
    { id: 'PSAR', label: "PSAR" },
    { id: 'RsiSmooth', label: "RSI" },
    { id: 'ROC', label: "ROC" },
    { id: 'Supertrend', label: "Supertrend" },
    { id: 'WilliamsR', label: "WilliamsR" },
];

var FUNDA_INDI = [
    { id: 'any', label: "All Fundamentals " },
    { id: 'AltmanZScore', label: "Altman Z" },
    { id: 'CashRatio', label: "Cash Ratio" },
    { id: 'DebtToEquityRatio', label: "Debt to Eq Ratio" },

    { id: 'EBITDAMargin', label: "EBITDA Margin" },
    { id: 'EVToEBITDA', label: "EV to EBITDA" },

    { id: 'NetProfitMargin', label: "Net Profit Margin" },
    { id: 'OperatingProfitMargin', label: "Ops Profit Margin" },
    { id: 'PiotroskiFScore', label: "Piotroski F Score" },
    { id: 'PriceToEarningRatio', label: "PE Ratio" },
    { id: 'PriceToBookRatio', label: "Price To Book" },
    { id: 'PriceToSalesRatio', label: "Price To Sales" },
    { id: 'QuickRatio', label: "Quick Ratio" },
    { id: 'ReturnOnEquity', label: "Return on Equity" },
    { id: 'ReturnOnAsset', label: "Return On Asset" },
    { id: 'ShareholdersEquityRatio', label: "Sh Equity Ratio" },

    // {id: 'DebtToEBITDA' , label: ""},
    // {id: '' , label: ""},
    // {id: '' , label: ""},

];

// for buttons
let FNO_CAT = [
    { id: 'FuturesAndOptions', label: "Summary" },
    { id: 'ViewOptionChain', label: "Option Chain" },
    { id: 'ViewPutCallRatio', label: "Put Call Ratio" },
];

// for buttons
let MA_CAT = [
    { id: 'SMA', label: "SMA" },
    { id: 'EMA', label: "EMA" },
    { id: 'WMA', label: "WMA" },
    { id: 'HullMA', label: "Hull MA" },
    { id: 'SmoothMA', label: "Smooth MA" },
    { id: 'WilderMA', label: "Wilder MA" },
    { id: 'DoubleEMA', label: "Double EMA" },
    { id: 'TripleEMA', label: "Triple EMA" },
    { id: 'TriangleMA', label: "Triangle MA" },
    { id: 'ZLEMA', label: "Zero Lag EMA" }
];



var SCREENERS_SUB_CATEGORY = [
    { id: 'any', label: "All " },
]

var base_url = "";