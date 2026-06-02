
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

let screenerData = [
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
];


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
    { id: 'BirdsEyeView', label: "Birds Eye View", default: true },
    { id: 'MovingAverages', label: "MA", default: true },
    { id: 'TechnicalAnalysis', label: "Tech", default: true },
    { id: 'FundamentalAnalysis', label: "Funda", default: false, mappedParam: "funda" },
    { id: 'FuturesAndOptions', label: "FNO", default: false, mappedParam: "fno" },
    { id: 'Candlestick', label: "Candlestick", default: true },
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
    { id: 'any', label: "All Technicals ", default: true },
    { id: 'ADX', label: "ADX", default: true },
    { id: 'AROON', label: "AROON", default: true },
    { id: 'AwesomeOscillator', label: "AwesomeOsc", default: true },
    { id: 'BOLLINGER', label: "Bollinger", default: true },
    { id: 'CCI', label: "CCI", default: true },
    { id: 'CMF', label: "CMF", default: true },
    { id: 'KeltnerBand', label: "KeltnerBand", default: true },
    { id: 'MACD', label: "MACD", default: true },
    { id: 'MFI', label: "MFI", default: true },
    { id: 'PSAR', label: "PSAR", default: true },
    { id: 'RsiSmooth', label: "RSI", default: true },
    { id: 'ROC', label: "ROC", default: true },
    { id: 'Supertrend', label: "Supertrend", default: true },
    { id: 'WilliamsR', label: "WilliamsR", default: true },
];

var FUNDA_INDI = [
    { id: 'any', label: "All Fundamentals ", default: true },
    { id: 'AltmanZScore', label: "Altman Z", default: true },
    { id: 'CashRatio', label: "Cash Ratio", default: true },
    { id: 'DebtToEquityRatio', label: "Debt to Eq Ratio", default: true },

    { id: 'EBITDAMargin', label: "EBITDA Margin", default: true },
    { id: 'EVToEBITDA', label: "EV to EBITDA", default: true },

    { id: 'NetProfitMargin', label: "Net Profit Margin", default: true },
    { id: 'OperatingProfitMargin', label: "Ops Profit Margin", default: true },
    { id: 'PiotroskiFScore', label: "Piotroski F Score", default: true },
    { id: 'PriceToEarningRatio', label: "PE Ratio", default: true },
    { id: 'PriceToBookRatio', label: "Price To Book", default: true },
    { id: 'PriceToSalesRatio', label: "Price To Sales", default: true },
    { id: 'QuickRatio', label: "Quick Ratio", default: true },
    { id: 'ReturnOnEquity', label: "Return on Equity", default: true },
    { id: 'ReturnOnAsset', label: "Return On Asset", default: true },
    { id: 'ShareholdersEquityRatio', label: "Sh Equity Ratio", default: true },

    // {id: 'DebtToEBITDA' , label: ""},
    // {id: '' , label: ""},
    // {id: '' , label: ""},
];

// for buttons
let FNO_CAT = [
    { id: 'FuturesAndOptions', label: "Summary", default: true },
    { id: 'ViewOptionChain', label: "Option Chain", default: true },
    { id: 'ViewPutCallRatio', label: "Put Call Ratio", default: true },
];

// for buttons
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



var SCREENERS_SUB_CATEGORY = [
    { id: 'any', label: "All " },
]

var base_url = "";