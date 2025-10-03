
let searchBaskets = [
    { id: "charts", label: "Charts" },
    { id: "equity", label: "Equity", default: true },
    { id: "screeners", label: "Screeners" },
];

var CHARTS_SUB_CATEGORY = [
    // { id: 'any', label: "All " },
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

// TECH INDI BUTTONS
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

// FUNDA BUTTONS
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



var SCREENERS_SUB_CATEGORY = [
    { id: 'any', label: "All " },
    { id: 'CandlestickScreeners', label: "Candlestick Screeners", },
    { id: 'TechnicalScreeners', label: "Technical Screeners" },

];

var base_url = "";




let chartData = [{
    "code": "A2ZINFRA", "label": "A2ZINFRA", name: "A2Z Infra Engineering", industry: "IT Services", sector: "POWER"
}, {
    "code": "AAATECH", "label": "AAATECH", name: "AAA Technologies Ltd.", industry: "IT Services", sector: "COMPUTERS", industry: "IT Services", sector: "SOFTWARE"
}, {
    "code": "AADHARHFC", "label": "AADHARHFC", name: "Aadhar Housing Finance Ltd.", industry: "IT Services", sector: "FINANCE", industry: "IT Services", sector: "HOUSING"
}, {
    "code": "AAKAAR", "label": "AAKAAR", name: "Aakaar Medical Technologies Limited", industry: "IT Services", sector: "Hospitals & Medical Services"
}, {
    "code": "AAKASH", "label": "AAKASH", name: "Aakash Exploration Services Ltd.", industry: "IT Services", sector: "ENGINEERING"
}, {
    "code": "AARADHYA", "label": "AARADHYA", name: "Aaradhya Disposal Industries Limited", industry: "IT Services", sector: "PAPER AND PAPER PRODUCTS"
}, {
    "code": "AAREYDRUGS", "label": "AAREYDRUGS", name: "Aarey Drugs & Pharmaceuticals Ltd.", industry: "IT Services", sector: "PHARMACEUTICALS"
}, {
    "code": "AARON", "label": "AARON", name: "Aaron Industries Ltd.", industry: "IT Services", sector: "MISCELLANEOUS"
}, {
    "code": "AARTECH", "label": "AARTECH", name: "Aartech Solonics Ltd.", industry: "IT Services", sector: "ELECTRICAL EQUIPMENT"
}, {
    "code": "AARTIDRUGS", "label": "AARTIDRUGS", name: "Aarti Drugs", industry: "IT Services", sector: "PHARMACEUTICALS"
}, {
    "code": "AARTIIND", "label": "AARTIIND", name: "Aarti Industries Ltd.", industry: "IT Services", sector: "CHEMICALS", industry: "IT Services", sector: "ORGANIC"
}, {
    "code": "AARTIPHARM", "label": "AARTIPHARM", name: "Aarti Pharmalabs Ltd.", industry: "IT Services", sector: "PHARMACEUTICALS"
}, {
    "code": "AARTISURF", "label": "AARTISURF", name: "Aarti Surfactants Ltd.", industry: "IT Services", sector: "CHEMICALS", industry: "IT Services", sector: "SPECIALITY"
}, {
    "code": "AARVEEDEN", "label": "AARVEEDEN", name: "Aarvee Denim and Exports", industry: "IT Services", sector: "TEXTILE PRODUCTS"
}, {
    "code": "AARVI", "label": "AARVI", name: "Aarvi Encon Ltd.", industry: "IT Services", sector: "DIVERSIFIED"
}, {
    "code": "AATMAJ", "label": "AATMAJ", name: "Aatmaj Healthcare Ltd.", industry: "IT Services", sector: "Hospitals & Medical Services"
}, {
    "code": "AAVAS", "label": "AAVAS", name: "Aavas Financiers Ltd.", industry: "IT Services", sector: "FINANCE", industry: "IT Services", sector: "HOUSING"
}, {
    "code": "ABAN", "label": "ABAN", name: "Aban Offshore Ltd.", industry: "IT Services", sector: "OIL EXPLORATION/PRODUCTION"
}, {
    "code": "ABB", "label": "ABB", name: "ABB Ltd.", industry: "IT Services", sector: "ELECTRICAL EQUIPMENT"
}, {
    "code": "ABBOTINDIA", "label": "ABBOTINDIA", name: "Abbott India Ltd.", industry: "IT Services", sector: "PHARMACEUTICALS"
}, {
    "code": "ABCAPITAL", "label": "ABCAPITAL", name: "Aditya Birla Capital Ltd.", industry: "IT Services", sector: "FINANCE"
}, {
    "code": "ABCOTS", "label": "ABCOTS", name: "AB Cotspin India Ltd.", industry: "IT Services", sector: "TEXTILES", industry: "IT Services", sector: "COTTON"
}, {
    "code": "ABDL", "label": "ABDL", name: "Allied Blenders and Distillers Ltd.", industry: "IT Services", sector: "BREW/DISTILLERIES"
}, {
    "code": "ABFRL", "label": "ABFRL", name: "Aditya Birla Fashion and Retail Ltd.", industry: "IT Services", sector: "RETAIL"
}, {
    "code": "ABGSEC", "label": "ABGSEC", name: "AdityaBirlaSunLifeMF-Aditya Birla Sun Life CRISIL Broad Based Gilt ETF", industry: "IT Services", sector: "ETF"
}, {
    "code": "ABHAPOWER", "label": "ABHAPOWER", name: "Abha Power and Steel Limited", industry: "IT Services", sector: "CASTINGS/FORGINGS"
}, {
    "code": "ABINFRA", "label": "ABINFRA", name: "A B Infrabuild Ltd.", industry: "IT Services", sector: "CEMENT AND CEMENT PRODUCTS"
}, {
    "code": "ABLBL", "label": "ABLBL", name: "Aditya Birla Lifestyle Brands Limited", industry: "IT Services", sector: "RETAIL"
}, {
    "code": "ABMINTLLTD", "label": "ABMINTLLTD", name: "ABM International Ltd.", industry: "IT Services", sector: "TRADING"
}, {
    "code": "ABREL", "label": "ABREL", name: "Aditya Birla Real Estate Limited", industry: "IT Services", sector: "DIVERSIFIED"
}, {
    "code": "ABSLAMC", "label": "ABSLAMC", name: "Aditya Birla Sun Life AMC Ltd.", industry: "IT Services", sector: "FINANCE"
}, {
    "code": "ABSLBANETF", "label": "ABSLBANETF", name: "ABSLBANETF Ltd.", industry: "IT Services", sector: "MISCELLANEOUS"
}, {
    "code": "ABSLLIQUID", "label": "ABSLLIQUID", name: "Aditya Birla Sun Life CRISIL Liquid Overnight ETF", industry: "IT Services", sector: "ETF"
}, {
    "code": "ABSLNN50ET", "label": "ABSLNN50ET", name: "ABSLNN50ET Ltd.", industry: "IT Services", sector: "MISCELLANEOUS"
}, {
    "code": "ABSLPSE", "label": "ABSLPSE", name: "Aditya Birla Sun Life Mutual Fund-Aditya Birla Sun Life Nifty PSE ETF", industry: "IT Services", sector: "ETF"
}, {
    "code": "ABSMARINE", "label": "ABSMARINE", name: "ABS Marine Services Ltd.", industry: "IT Services", sector: "SHIPPING"
}, {
    "code": "ACC", "label": "ACC", name: "ACC Ltd.", industry: "IT Services", sector: "CEMENT AND CEMENT PRODUCTS"
}, {
    "code": "ACCELYA", "label": "ACCELYA", name: "Accelya Solutions India Ltd.", industry: "IT Services", sector: "COMPUTERS", industry: "IT Services", sector: "SOFTWARE"
}, {
    "code": "ACCENTMIC", "label": "ACCENTMIC", name: "Accent Microcell Ltd.", industry: "IT Services", sector: "PHARMACEUTICALS"
}, {
    "code": "ACCORD", "label": "ACCORD", name: "Accord Synergy Ltd.", industry: "IT Services", sector: "TELECOMMUNICATION", industry: "IT Services", sector: "SERVICES"
}, {
    "code": "ACCPL", "label": "ACCPL", name: "Accretion Pharmaceuticals Limited", industry: "IT Services", sector: "PHARMACEUTICALS"
}, {
    "code": "ACCURACY", "label": "ACCURACY", name: "Accuracy Shipping Ltd.", industry: "IT Services", sector: "SHIPPING"
}, {
    "code": "ACE", "label": "ACE", name: "Action Construction Equipment Ltd. ", industry: "IT Services", sector: "ENGINEERING"
}, {
    "code": "ACEINTEG", "label": "ACEINTEG", name: "ACE Integrated Solutions Ltd.", industry: "IT Services", sector: "MISCELLANEOUS"
}, {
    "code": "ACI", "label": "ACI", name: "Archean Chemical Industries Ltd.", industry: "IT Services", sector: "CHEMICALS", industry: "IT Services", sector: "ORGANIC"
}, {
    "code": "ACL", "label": "ACL", name: "Andhra Cements Ltd.", industry: "IT Services", sector: "CEMENT AND CEMENT PRODUCTS"
}, {
    "code": "ACLGATI", "label": "ACLGATI", name: "Allcargo Gati Ltd.", industry: "IT Services", sector: "TRAVEL AND TRANSPORT"
}, {
    "code": "ACMESOLAR", "label": "ACMESOLAR", name: "Acme Solar Holdings Limited", industry: "IT Services", sector: "CONSTRUCTION"
}, {
    "code": "ACTIVEINFR", "label": "ACTIVEINFR", name: "Active Infrastructures Limited", industry: "IT Services", sector: "CONSTRUCTION"
}, {
    "code": "ACUTAAS", "label": "ACUTAAS", name: "Acutaas Chemicals Limited", industry: "IT Services", sector: "PHARMACEUTICALS"
}, {
    "code": "ADANIENSOL", "label": "ADANIENSOL", name: "Adani Energy Solutions Ltd.", industry: "IT Services", sector: "MISCELLANEOUS"
}, {
    "code": "ADANIENT", "label": "ADANIENT", name: "Adani Enterprises Ltd.", industry: "IT Services", sector: "TRADING"
}, {
    "code": "ADANIGREEN", "label": "ADANIGREEN", name: "Adani Green Energy Ltd.", industry: "IT Services", sector: "POWER"
}, {
    "code": "ADANIPORTS", "label": "ADANIPORTS", name: "Adani Ports & Special Economic Zone Ltd.", industry: "IT Services", sector: "CONSTRUCTION"
}, {
    "code": "ADANIPOWER", "label": "ADANIPOWER", name: "Adani Power Limited", industry: "IT Services", sector: "POWER"
}, {
    "code": "ADFFOODS", "label": "ADFFOODS", name: "ADF Foods Industries", industry: "IT Services", sector: "FOOD AND FOOD PROCESSING"
}, {
    "code": "ADL", "label": "ADL", name: "Archidply Decor Ltd.", industry: "IT Services", sector: "MISCELLANEOUS"
}, {
    "code": "ADOR", "label": "ADOR", name: "Ador Welding Ltd.", industry: "IT Services", sector: "ELECTRODES"
}, {
    "code": "ADROITINFO", "label": "ADROITINFO", name: "Adroit Infotech Ltd.", industry: "IT Services", sector: "MEDIA & ENTERTAINMENT"
}, {
    "code": "ADSL", "label": "ADSL", name: "Allied Digital Services L", industry: "IT Services", sector: "COMPUTERS", industry: "IT Services", sector: "SOFTWARE"
}, {
    "code": "ADVANIHOTR", "label": "ADVANIHOTR", name: "Advani Hotels and Resorts (India)", industry: "IT Services", sector: "HOTELS"
}, {
    "code": "ADVENZYMES", "label": "ADVENZYMES", name: "Advanced Enzyme Technologies", industry: "IT Services", sector: "PHARMACEUTICALS"
}, {
    "code": "AEGISLOG", "label": "AEGISLOG", name: "Aegis Logistics Ltd.", industry: "IT Services", sector: "TRAVEL AND TRANSPORT"
}, {
    "code": "AEGISVOPAK", "label": "AEGISVOPAK", name: "Aegis Vopak Terminals Limited", industry: "IT Services", sector: "Logistic"
}, {
    "code": "AEROENTER", "label": "AEROENTER", name: "Aeroflex Enterprises Limited", industry: "IT Services", sector: "TRADING"
}, {
    "code": "AEROFLEX", "label": "AEROFLEX", name: "Aeroflex Industries Ltd.", industry: "IT Services", sector: "STEEL AND STEEL PRODUCTS"
}, {
    "code": "AERON", "label": "AERON", name: "Aeron Composite Ltd.", industry: "IT Services", sector: "PLASTIC AND PLASTIC PRODUCTS"
}, {
    "code": "AERONEU", "label": "AERONEU", name: "Aeroflex Neu Limited", industry: "IT Services", sector: "PACKAGING"
}, {
    "code": "AESTHETIK", "label": "AESTHETIK", name: "Aesthetik Engineers Ltd.", industry: "IT Services", sector: "CONSTRUCTION"
}, {
    "code": "AETHER", "label": "AETHER", name: "Aether Industries Ltd.", industry: "IT Services", sector: "CHEMICALS", industry: "IT Services", sector: "SPECIALITY"
}, {
    "code": "AFCONS", "label": "AFCONS", name: "Afcons Infrastructure Limited", industry: "IT Services", sector: "CONSTRUCTION"
}, {
    "code": "AFFLE", "label": "AFFLE", name: "Affle 3I Limited", industry: "IT Services", sector: "MEDIA & ENTERTAINMENT"
}, {
    "code": "AFFORDABLE", "label": "AFFORDABLE", name: "Affordable Robotic & Automation Limited", industry: "IT Services", sector: "ENGINEERING"
}, {
    "code": "AFIL", "label": "AFIL", name: "Akme Fintrade (India) Ltd.", industry: "IT Services", sector: "FINANCE"
}, {
    "code": "AFSL", "label": "AFSL", name: "Abans Financial Services Limited", industry: "IT Services", sector: "FINANCE"
}, {
    "code": "AGARIND", "label": "AGARIND", name: "Agarwal Industrial Corporation Ltd.", industry: "IT Services", sector: "TRAVEL AND TRANSPORT"
}, {
    "code": "AGARWALEYE", "label": "AGARWALEYE", name: "Dr. Agarwal's Health Care Limited", industry: "IT Services", sector: "Hospitals & Medical Services"
}, {
    "code": "AGARWALFT", "label": "AGARWALFT", name: "Agarwal Float Glass India Ltd.", industry: "IT Services", sector: "TRADING"
}, {
    "code": "AGARWALTUF", "label": "AGARWALTUF", name: "Agarwal Toughened Glass India Limited", industry: "IT Services", sector: "Glass, Glass Product"
}, {
    "code": "AGI", "label": "AGI", name: "AGI Greenpac Ltd.", industry: "IT Services", sector: "CONSTRUCTION"
}, {
    "code": "AGIIL", "label": "AGIIL", name: "Agi Infra Ltd.", industry: "IT Services", sector: "CONSTRUCTION"
}, {
    "code": "AGNI", "label": "AGNI", name: "Agni Green Power Ltd.", industry: "IT Services", sector: "ELECTRICAL EQUIPMENT"
}, {
    "code": "AGRITECH", "label": "AGRITECH", name: "Agri-Tech (India)", industry: "IT Services", sector: "FERTILISERS"
}, {
    "code": "AGROPHOS", "label": "AGROPHOS", name: "Agro Phos India Ltd.", industry: "IT Services", sector: "DIVERSIFIED"
}, {
    "code": "AGSTRA", "label": "AGSTRA", name: "AGS Transact Technologies Ltd.", industry: "IT Services", sector: "COMPUTERS", industry: "IT Services", sector: "SOFTWARE"
}, {
    "code": "AGUL", "label": "AGUL", name: "A G Universal Ltd.", industry: "IT Services", sector: "TRADING"
}, {
    "code": "AHCL", "label": "AHCL", name: "Anlon Healthcare Limited", industry: "IT Services", sector: "CHEMICALS", industry: "IT Services", sector: "SPECIALITY"
}, {
    "code": "AHLADA", "label": "AHLADA", name: "Ahlada Engineers Ltd.", industry: "IT Services", sector: "ELECTRICAL EQUIPMENT"
}, {
    "code": "AHLEAST", "label": "AHLEAST", name: "Asian Hotels (East)", industry: "IT Services", sector: "HOTELS"
}, {
    "code": "AHLUCONT", "label": "AHLUCONT", name: "Ahluwalia Contracts (India) Ltd.", industry: "IT Services", sector: "CONSTRUCTION"
}, {
    "code": "AIAENG", "label": "AIAENG", name: "AIA Engineering Ltd.", industry: "IT Services", sector: "ENGINEERING"
}, {
    "code": "AIIL", "label": "AIIL", name: "Authum Investment & Infrastructure Ltd.", industry: "IT Services", sector: "FINANCE"
}, {
    "code": "AILIMITED", "label": "AILIMITED", name: "Abhishek Integrations Ltd.", industry: "IT Services", sector: "MISCELLANEOUS"
}, {
    "code": "AIMTRON", "label": "AIMTRON", name: "Aimtron Electronics Ltd.", industry: "IT Services", sector: "ELECTRONICS", industry: "IT Services", sector: "INDUSTRIAL"
}, {
    "code": "AIRAN", "label": "AIRAN", name: "Airan Ltd.", industry: "IT Services", sector: "COMPUTERS", industry: "IT Services", sector: "HARDWARE"
}, {
    "code": "AIROLAM", "label": "AIROLAM", name: "Airo Lam Ltd.", industry: "IT Services", sector: "MISCELLANEOUS"
}, {
    "code": "AIRTELPP", "label": "AIRTELPP", name: "Bharti Airtel PP Ltd.", industry: "IT Services", sector: "CABLES", industry: "IT Services", sector: "TELECOM"
}, {
    "code": "AISL", "label": "AISL", name: "ANI Integrated Services Ltd.", industry: "IT Services", sector: "ENGINEERING"
}, {
    "code": "AJANTPHARM", "label": "AJANTPHARM", name: "Ajanta Pharmaceuticals Ltd.", industry: "IT Services", sector: "PHARMACEUTICALS"
}, {
    "code": "AJAXENGG", "label": "AJAXENGG", name: "Ajax Engineering Limited", industry: "IT Services", sector: "ENGINEERING"
}]

let screenerData = [{
    "id": "https://www.tsrbt1.com/rt//Screener/TSRStrengthIndex/TechnicalStrength/Bullish/BullishTechStrength", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/Bullish1Day/BullishPinBar", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Pin Bar"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/Bullish2Day/BullishEngulfing", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Engulfing"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/Bullish2Day/BullishGapUp", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Gap Up"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/Bullish2Day/BullishHarami", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Harami"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/Bullish3Day/BullishAbandonedBaby", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Abandoned Baby"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/BullishMultiDay/BullishBreakaway", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Breakaway"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/BullishMultiDay/BullishIslandReversal", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Island Reversal"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/BullishMultiDay/BullishThreeLinesStrike", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Three Lines Strike"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/BullishHeikinAshi/BullishInitiation", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Initiation"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/BullishHeikinAshi/BullishContinuation", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Continuation"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/BullishHeikinAshi/BullishWithHighVolume", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish With High Volume"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/BullishHeikinAshi/BullishTickFromRedToGreen", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Tick From Red To Green"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ChartPatterns/PopularChartPatterns/BullishPatterns/BullishFlag", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Flag"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ChartPatterns/PopularChartPatterns/BullishPatterns/BullishPennant", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Pennant"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishReversal", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Trend Reversal Screeners"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishContinuation", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Continuation Screeners"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishBreakout", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Breakout Screeners"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishMomentum", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Momentum Screeners"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ExpertScreener/PriceActionBased/BullishTrendReversal", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Trend Reversal Screener"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ExpertScreener/PriceActionBased/BullishTrendReversal/BullishPatternsAtBottom", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Reversal Candlestick Patterns at Lower Levels"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ExpertScreener/TechIndiBased/BullishTechScreener", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Technical Screener"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ExpertScreener/TechIndiBased/BullishScan", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Screener"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ExpertScreener/TechIndiBased/BullishScan/UpTrendingStocks", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Stocks Screener with Good Value & Stability"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ExpertScreener/TechIndiBased/BullishScan/GrowthStockWithMomentum", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Stocks with High Growth (Funda) and Stability"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/Bullish1Day/BullishMarubozu", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Marubozu"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/Bullish2Day/BullishBeltHold", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Belt Hold"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/Bullish2Day/BullishCounterAttack", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Counter Attack"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/Bullish2Day/BullishHaramiCross", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Harami Cross"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/Bullish2Day/BullishKicker", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Kicker"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/Bullish2Day/BullishOnNeck", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish On Neck"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/Bullish2Day/BullishPiercing", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Piercing"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/Bullish2Day/BullishSeparatingLines", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Separating Lines"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/Bullish3Day/BullishSidebySideWhiteLines", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Side by Side White Lines"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/Bullish3Day/BullishStickSandwich", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Stick Sandwich"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/Bullish3Day/BullishTriStar", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Tri Star"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Candlestick/BullishScreener/BullishMultiDay/BullishHikkake", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Hikkake"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BTSTAndIntraday/BullishBreakoutwithVolumeConfirmation", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Breakout with Volume Confirmation"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BTSTAndIntraday/BullishMomentumStocksandHighVolume", code: "", defaultUrl: "", industry: "", sector: "", candlestick: true, tech: true,name: "Bullish Momentum Stocks and High Volume "
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/TSRStrengthIndex/TechnicalStrength/Bullish/StrongBullTechStrength", code: "", defaultUrl: "", industry: "", sector: "", name: "Strong Bullish"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/TSRStrengthIndex/TechnicalStrength/Bullish/MildBullTechStrength", code: "", defaultUrl: "", industry: "", sector: "", name: "Mild Bullish"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/TSRStrengthIndex/TechnicalStrength/Neutral/NeutralWithBullTechStrength", code: "", defaultUrl: "", industry: "", sector: "", name: "Neutral With Bullish Bias"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/OHLCScreeners/BullishScreener/LHLLReversal", code: "", defaultUrl: "", industry: "", sector: "", name: "Lower High Lower Low Bullish Reversal"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/OverboughtSold/RSISmooth/RSISmoothBullishDivergence", code: "", defaultUrl: "", industry: "", sector: "", name: "RSI Bullish Divergence"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/OverboughtSold/RSI/RSIBullishDivergence", code: "", defaultUrl: "", industry: "", sector: "", name: "RSI Fast Bullish Divergence"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/OverboughtSold/SlowStochastic/StochasticSlowBullishDivergence", code: "", defaultUrl: "", industry: "", sector: "", name: "Stochastic Slow Bullish Divergence"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/OverboughtSold/FastStochastic/StochasticFastBullishDivergence", code: "", defaultUrl: "", industry: "", sector: "", name: "Stochastic Fast Bullish Divergence"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/OverboughtSold/StochasticRSI/StochasticRSIBullishDivergence", code: "", defaultUrl: "", industry: "", sector: "", name: "Stochastic RSI Fast Bullish Divergence"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/OverboughtSold/StochasticRSISmooth/StochasticRSISmoothBullishDivergence", code: "", defaultUrl: "", industry: "", sector: "", name: "Stochastic RSI Bullish Divergence"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/OverboughtSold/WilliamsR/WilliamsRBullishDivergence", code: "", defaultUrl: "", industry: "", sector: "", name: "Williams % R Bullish Divergence"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/OverboughtSold/CommodityChannelIndex/CCIBullishDivergence", code: "", defaultUrl: "", industry: "", sector: "", name: "CCI Bullish Divergence"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/OverboughtSold/MoneyFlowIndex/MFIBullishDivergence", code: "", defaultUrl: "", industry: "", sector: "", name: "MFI Bullish Divergence"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/OverboughtSold/UltimateOscillator/UltimateOscillatorBullishDivergence", code: "", defaultUrl: "", industry: "", sector: "", name: "Ultimate Oscillator Bullish Divergence"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/OverboughtSold/AroonOscillator/AroonOscillatorBullishDivergence", code: "", defaultUrl: "", industry: "", sector: "", name: "Aroon Oscillator Bullish Divergence"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/Overlays/ParabolicSAR/PSARBullishReversal", code: "", defaultUrl: "", industry: "", sector: "", name: "PSAR Bullish Reversal"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/TrendIndicator/MACD/MACDBullishDivergence", code: "", defaultUrl: "", industry: "", sector: "", name: "MACD Bullish Divergence"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/TrendIndicator/MACD/MACDHistogramBullishDivergence", code: "", defaultUrl: "", industry: "", sector: "", name: "MACD Histogram Bullish Divergence"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/TrendIndicator/ADX/ADXBullishDivergence", code: "", defaultUrl: "", industry: "", sector: "", name: "ADX Bullish Divergence"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/TrendIndicator/Supertrend/SupertrendBullishReversal", code: "", defaultUrl: "", industry: "", sector: "", name: "Supertrend Bullish Reversal"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/TrendIndicator/AwesomeOscillator/AwesomeOscillatorBullishReversal", code: "", defaultUrl: "", industry: "", sector: "", name: "Awesome Oscillator Bullish Reversal"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/TrendIndicator/AwesomeOscillator/AwesomeOscillatorBullishDivergence", code: "", defaultUrl: "", industry: "", sector: "", name: "Awesome Oscillator Bullish Divergence"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/TrendIndicator/RateOfChange/ROCBullishDivergence", code: "", defaultUrl: "", industry: "", sector: "", name: "Rate Of Change Bullish Divergence"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/VolumeBasedIndicator/ChaikinMoneyFlow/CMFBullishTrendChange", code: "", defaultUrl: "", industry: "", sector: "", name: "CMF Bullish Trend Change"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/VolumeBasedIndicator/ChaikinMoneyFlow/CMFBullishDivergence", code: "", defaultUrl: "", industry: "", sector: "", name: "CMF Bullish Divergence"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/EMAScreener/TrendingEMA/UptrendEmaBullCO", code: "", defaultUrl: "", industry: "", sector: "", name: "EMA Trending Up with Bullish Crossover"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/EMAScreener/EMAConvergenceDivergence/BullishConvergence20and50EMA", code: "", defaultUrl: "", industry: "", sector: "", name: "20 and 50 EMA Bullish Convergence"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/EMAScreener/EMAConvergenceDivergence/BullishDivergence20and50EMA", code: "", defaultUrl: "", industry: "", sector: "", name: "20 and 50 EMA Bullish Divergence"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ChartPatterns/NRWR/NarrowRange/NR7BullishBreakout", code: "", defaultUrl: "", industry: "", sector: "", name: "NR 7 Bullish Breakout"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ChartPatterns/NRWR/NarrowRange/NR11BullishBreakout", code: "", defaultUrl: "", industry: "", sector: "", name: "NR 11 Bullish Breakout"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ChartPatterns/NRWR/WideRange/WR7BullishContinuation", code: "", defaultUrl: "", industry: "", sector: "", name: "WR 7 Bullish Continuation"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ChartPatterns/NRWR/WideRange/WR14BullishContinuation", code: "", defaultUrl: "", industry: "", sector: "", name: "WR 14 Bullish Continuation"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ExpertScreener/MovingAverageStrategies/MovingAverageConvergence/MABullishConvergence20and50SMA", code: "", defaultUrl: "", industry: "", sector: "", name: "MA Bullish Convergence 20 and 50 SMA"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/TrendIndicator/AwesomeOscillator/AwesomeOscillatorBullishSaucer", code: "", defaultUrl: "", industry: "", sector: "", name: "Awesome Oscillator Bullish Saucer"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/TrendIndicator/AwesomeOscillator/AwesomeOscillatorBullishTwinPeak", code: "", defaultUrl: "", industry: "", sector: "", name: "Awesome Oscillator Bullish Twin Peak"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ChartPatterns/NRWR/NarrowRange/NR4BullishBreakout", code: "", defaultUrl: "", industry: "", sector: "", name: "NR 4 Bullish Breakout"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ChartPatterns/NRWR/NarrowRange/NR15BullishBreakout", code: "", defaultUrl: "", industry: "", sector: "", name: "NR 15 Bullish Breakout"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ChartPatterns/NRWR/WideRange/WR20BullishContinuation", code: "", defaultUrl: "", industry: "", sector: "", name: "WR 20 Bullish Continuation"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/TSRStrengthIndex/TechnicalStrength/Bullish/AllBullishTechStrength", code: "", defaultUrl: "", industry: "", sector: "", name: "All Bullish"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/OverboughtSold/RSISmooth/RSIBullishSwingRejection", code: "", defaultUrl: "", industry: "", sector: "", name: "RSI Bullish Swing Rejection"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/Technical/OverboughtSold/RSI/RSIFastBullishSwingRejection", code: "", defaultUrl: "", industry: "", sector: "", name: "RSI Fast Bullish Swing Rejection"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishReversal/MACDBullishCrosswithVolume", code: "", defaultUrl: "", industry: "", sector: "", name: "MACD Bullish Cross with Volume"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishReversal/MACDBullishCrossoverandStochIndicatorAbove50", code: "", defaultUrl: "", industry: "", sector: "", name: "MACD Bullish Crossover and Stochastic Slow Indicator Above 50"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishReversal/MACDBullishcrossoverandADXPDICrossAboveMDI", code: "", defaultUrl: "", industry: "", sector: "", name: "MACD Bullish Crossover and ADX PDI Cross Above MDI"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishReversal/MACDbullishcrossoverandStochasticRSIindicatorabove50", code: "", defaultUrl: "", industry: "", sector: "", name: "MACD Bullish Crossover and Stochastic RSI Indicator Above 50"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishReversal/StochBullishCrossoverRSICrossAbove30", code: "", defaultUrl: "", industry: "", sector: "", name: "Stochastic Slow Bullish Crossover and RSI Cross Above 30"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishReversal/MACDBullishcrossoverandPricebetweenMid&lowerband", code: "", defaultUrl: "", industry: "", sector: "", name: "MACD Bullish Crossover and Price between Mid & Lower Band"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishReversal/StochasticBullishCrosswithPriceCrossabove50MA", code: "", defaultUrl: "", industry: "", sector: "", name: "Stochastic Bullish Cross with Price Cross above 50 MA"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishReversal/StochasticRSIBullishCrosswithPriceCrossabove50MA", code: "", defaultUrl: "", industry: "", sector: "", name: "Stochastic RSI Bullish Cross with Price Cross above 50 MA"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishReversal/MACDBullishCrossat3MonthLow", code: "", defaultUrl: "", industry: "", sector: "", name: "MACD Bullish Cross at 3 Month Low"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishContinuation/MACDBullishCrossandCMFabove0", code: "", defaultUrl: "", industry: "", sector: "", name: "MACD Bullish Cross and CMF Above 0"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishContinuation/RSIabove50andMACDBullishCrossover", code: "", defaultUrl: "", industry: "", sector: "", name: "RSI Above 50 and MACD Bullish Crossover"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishContinuation/MACDBullishcrossoverandADXAbove25", code: "", defaultUrl: "", industry: "", sector: "", name: "MACD Bullish Crossover and ADX Above 25"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishBreakout/BollingerBandBreakoutandMACDBullishCrossover", code: "", defaultUrl: "", industry: "", sector: "", name: "Bollinger Band Breakout and MACD Bullish Crossover"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishBreakout/MACDBullishCrosswith30daysBreakout", code: "", defaultUrl: "", industry: "", sector: "", name: "MACD Bullish Cross with 30 days Breakout"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishMomentum/MACDBullishCrossoverandMFIAbove50", code: "", defaultUrl: "", industry: "", sector: "", name: "MACD Bullish Crossover and MFI Above 50"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishMomentum/StochBullishCrossoverAbove80withVolume", code: "", defaultUrl: "", industry: "", sector: "", name: "Stochastic Slow Bullish Crossover Above 80 with Volume"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishMomentum/ZLMACDBullishCrossandZeroLineCross", code: "", defaultUrl: "", industry: "", sector: "", name: "Zero lag MACD Bullish Cross and Zero Line Cross"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BullishMomentum/ZLMACDBullishCrossAnd21EMACross", code: "", defaultUrl: "", industry: "", sector: "", name: "Zero Lag MACD  Bullish Cross And 21 EMA Cross"
}, {
    "id": "https://www.tsrbt1.com/rt//Screener/ComboScreener/BullishTechnicalsScreener/BTSTAndIntraday/RSICross57andBullishTechStrengthWithHighVol", code: "", defaultUrl: "", industry: "", sector: "", name: "RSI Cross 57 and Bullish Tech Strength With High Volume"
}];

// Dummy equityData array with 25 items
let equityData = [{
    "code": "A2ZINFRA", "label": "A2ZINFRA", name: "A2Z Infra Engineering", industry: "IT Services", sector: "POWER", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "AAATECH", "label": "AAATECH", name: "AAA Technologies Ltd.", industry: "IT Services", sector: "COMPUTERS", industry: "IT Services", sector: "SOFTWARE", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "AADHARHFC", "label": "AADHARHFC", name: "Aadhar Housing Finance Ltd.", industry: "IT Services", sector: "FINANCE"
    , defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "AAKAAR", "label": "AAKAAR", name: "Aakaar Medical Technologies Limited", industry: "IT Services", sector: "Hospitals & Medical Services"
}, {
    "code": "AAKASH", "label": "AAKASH", name: "Aakash Exploration Services Ltd.", industry: "IT Services", sector: "ENGINEERING", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "AARADHYA", "label": "AARADHYA", name: "Aaradhya Disposal Industries Limited", industry: "IT Services", sector: "PAPER AND PAPER PRODUCTS"
}, {
    "code": "AAREYDRUGS", "label": "AAREYDRUGS", name: "Aarey Drugs & Pharmaceuticals Ltd.", industry: "IT Services", sector: "PHARMACEUTICALS"
    , defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "AARON", "label": "AARON", name: "Aaron Industries Ltd.", industry: "IT Services", sector: "MISCELLANEOUS", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "AARTECH", "label": "AARTECH", name: "Aartech Solonics Ltd.", industry: "IT Services", sector: "ELECTRICAL EQUIPMENT"
}, {
    "code": "AARTIDRUGS", "label": "AARTIDRUGS", name: "Aarti Drugs", industry: "IT Services", sector: "PHARMACEUTICALS"
    , defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "AARTIIND", "label": "AARTIIND", name: "Aarti Industries Ltd.", industry: "IT Services", sector: "CHEMICALS", industry: "IT Services", sector: "ORGANIC"
}, {
    "code": "AARTIPHARM", "label": "AARTIPHARM", name: "Aarti Pharmalabs Ltd.", industry: "IT Services", sector: "PHARMACEUTICALS"
    , defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "AARTISURF", "label": "AARTISURF", name: "Aarti Surfactants Ltd.", industry: "IT Services", sector: "CHEMICALS", industry: "IT Services", sector: "SPECIALITY"
}, {
    "code": "AARVEEDEN", "label": "AARVEEDEN", name: "Aarvee Denim and Exports", industry: "IT Services", sector: "TEXTILE PRODUCTS"
}, {
    "code": "AARVI", "label": "AARVI", name: "Aarvi Encon Ltd.", industry: "IT Services", sector: "DIVERSIFIED"
}, {
    "code": "AATMAJ", "label": "AATMAJ", name: "Aatmaj Healthcare Ltd.", industry: "IT Services", sector: "Hospitals & Medical Services"
}, {
    "code": "AAVAS", "label": "AAVAS", name: "Aavas Financiers Ltd.", industry: "IT Services", sector: "FINANCE"
    , defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ABAN", "label": "ABAN", name: "Aban Offshore Ltd.", industry: "IT Services", sector: "OIL EXPLORATION/PRODUCTION"
}, {
    "code": "ABB", "label": "ABB", name: "ABB Ltd.", industry: "IT Services", sector: "ELECTRICAL EQUIPMENT"
}, {
    "code": "ABBOTINDIA", "label": "ABBOTINDIA", name: "Abbott India Ltd.", industry: "IT Services", sector: "PHARMACEUTICALS"
    , defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ABCAPITAL", "label": "ABCAPITAL", name: "Aditya Birla Capital Ltd.", industry: "IT Services", sector: "FINANCE"
    , defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ABCOTS", "label": "ABCOTS", name: "AB Cotspin India Ltd.", industry: "IT Services", sector: "TEXTILES", industry: "IT Services", sector: "COTTON"
}, {
    "code": "ABDL", "label": "ABDL", name: "Allied Blenders and Distillers Ltd.", industry: "IT Services", sector: "BREW/DISTILLERIES"
}, {
    "code": "ABFRL", "label": "ABFRL", name: "Aditya Birla Fashion and Retail Ltd.", industry: "IT Services", sector: "RETAIL"
}, {
    "code": "ABGSEC", "label": "ABGSEC", name: "AdityaBirlaSunLifeMF-Aditya Birla Sun Life CRISIL Broad Based Gilt ETF", industry: "IT Services", sector: "ETF"
}, {
    "code": "ABHAPOWER", "label": "ABHAPOWER", name: "Abha Power and Steel Limited", industry: "IT Services", sector: "CASTINGS/FORGINGS"
}, {
    "code": "ABINFRA", "label": "ABINFRA", name: "A B Infrabuild Ltd.", industry: "IT Services", sector: "CEMENT AND CEMENT PRODUCTS"
    , defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ABLBL", "label": "ABLBL", name: "Aditya Birla Lifestyle Brands Limited", industry: "IT Services", sector: "RETAIL"
}, {
    "code": "ABMINTLLTD", "label": "ABMINTLLTD", name: "ABM International Ltd.", industry: "IT Services", sector: "TRADING"
}, {
    "code": "ABREL", "label": "ABREL", name: "Aditya Birla Real Estate Limited", industry: "IT Services", sector: "DIVERSIFIED"
}, {
    "code": "ABSLAMC", "label": "ABSLAMC", name: "Aditya Birla Sun Life AMC Ltd.", industry: "IT Services", sector: "FINANCE"
    , defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ABSLBANETF", "label": "ABSLBANETF", name: "ABSLBANETF Ltd.", industry: "IT Services", sector: "MISCELLANEOUS", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ABSLLIQUID", "label": "ABSLLIQUID", name: "Aditya Birla Sun Life CRISIL Liquid Overnight ETF", industry: "IT Services", sector: "ETF"
}, {
    "code": "ABSLNN50ET", "label": "ABSLNN50ET", name: "ABSLNN50ET Ltd.", industry: "IT Services", sector: "MISCELLANEOUS", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ABSLPSE", "label": "ABSLPSE", name: "Aditya Birla Sun Life Mutual Fund-Aditya Birla Sun Life Nifty PSE ETF", industry: "IT Services", sector: "ETF"
}, {
    "code": "ABSMARINE", "label": "ABSMARINE", name: "ABS Marine Services Ltd.", industry: "IT Services", sector: "SHIPPING"
}, {
    "code": "ACC", "label": "ACC", name: "ACC Ltd.", industry: "IT Services", sector: "CEMENT AND CEMENT PRODUCTS"
    , defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ACCELYA", "label": "ACCELYA", name: "Accelya Solutions India Ltd.", industry: "IT Services", sector: "COMPUTERS", industry: "IT Services", sector: "SOFTWARE", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ACCENTMIC", "label": "ACCENTMIC", name: "Accent Microcell Ltd.", industry: "IT Services", sector: "PHARMACEUTICALS"
    , defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ACCORD", "label": "ACCORD", name: "Accord Synergy Ltd.", industry: "IT Services", sector: "TELECOMMUNICATION", industry: "IT Services", sector: "SERVICES"
}, {
    "code": "ACCPL", "label": "ACCPL", name: "Accretion Pharmaceuticals Limited", industry: "IT Services", sector: "PHARMACEUTICALS"
    , defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ACCURACY", "label": "ACCURACY", name: "Accuracy Shipping Ltd.", industry: "IT Services", sector: "SHIPPING"
}, {
    "code": "ACE", "label": "ACE", name: "Action Construction Equipment Ltd. ", industry: "IT Services", sector: "ENGINEERING", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ACEINTEG", "label": "ACEINTEG", name: "ACE Integrated Solutions Ltd.", industry: "IT Services", sector: "MISCELLANEOUS", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ACI", "label": "ACI", name: "Archean Chemical Industries Ltd.", industry: "IT Services", sector: "CHEMICALS", industry: "IT Services", sector: "ORGANIC"
}, {
    "code": "ACL", "label": "ACL", name: "Andhra Cements Ltd.", industry: "IT Services", sector: "CEMENT AND CEMENT PRODUCTS"
    , defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ACLGATI", "label": "ACLGATI", name: "Allcargo Gati Ltd.", industry: "IT Services", sector: "TRAVEL AND TRANSPORT"
}, {
    "code": "ACMESOLAR", "label": "ACMESOLAR", name: "Acme Solar Holdings Limited", industry: "IT Services", sector: "CONSTRUCTION"
}, {
    "code": "ACTIVEINFR", "label": "ACTIVEINFR", name: "Active Infrastructures Limited", industry: "IT Services", sector: "CONSTRUCTION"
}, {
    "code": "ACUTAAS", "label": "ACUTAAS", name: "Acutaas Chemicals Limited", industry: "IT Services", sector: "PHARMACEUTICALS"
    , defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ADANIENSOL", "label": "ADANIENSOL", name: "Adani Energy Solutions Ltd.", industry: "IT Services", sector: "MISCELLANEOUS", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ADANIENT", "label": "ADANIENT", name: "Adani Enterprises Ltd.", industry: "IT Services", sector: "TRADING"
}, {
    "code": "ADANIGREEN", "label": "ADANIGREEN", name: "Adani Green Energy Ltd.", industry: "IT Services", sector: "POWER", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ADANIPORTS", "label": "ADANIPORTS", name: "Adani Ports & Special Economic Zone Ltd.", industry: "IT Services", sector: "CONSTRUCTION"
}, {
    "code": "ADANIPOWER", "label": "ADANIPOWER", name: "Adani Power Limited", industry: "IT Services", sector: "POWER", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ADFFOODS", "label": "ADFFOODS", name: "ADF Foods Industries", industry: "IT Services", sector: "FOOD AND FOOD PROCESSING"
}, {
    "code": "ADL", "label": "ADL", name: "Archidply Decor Ltd.", industry: "IT Services", sector: "MISCELLANEOUS", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ADOR", "label": "ADOR", name: "Ador Welding Ltd.", industry: "IT Services", sector: "ELECTRODES"
}, {
    "code": "ADROITINFO", "label": "ADROITINFO", name: "Adroit Infotech Ltd.", industry: "IT Services", sector: "MEDIA & ENTERTAINMENT"
}, {
    "code": "ADSL", "label": "ADSL", name: "Allied Digital Services L", industry: "IT Services", sector: "COMPUTERS", industry: "IT Services", sector: "SOFTWARE", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "ADVANIHOTR", "label": "ADVANIHOTR", name: "Advani Hotels and Resorts (India)", industry: "IT Services", sector: "HOTELS"
}, {
    "code": "ADVENZYMES", "label": "ADVENZYMES", name: "Advanced Enzyme Technologies", industry: "IT Services", sector: "PHARMACEUTICALS"
    , defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "AEGISLOG", "label": "AEGISLOG", name: "Aegis Logistics Ltd.", industry: "IT Services", sector: "TRAVEL AND TRANSPORT"
}, {
    "code": "AEGISVOPAK", "label": "AEGISVOPAK", name: "Aegis Vopak Terminals Limited", industry: "IT Services", sector: "Logistic"
}, {
    "code": "AEROENTER", "label": "AEROENTER", name: "Aeroflex Enterprises Limited", industry: "IT Services", sector: "TRADING"
}, {
    "code": "AEROFLEX", "label": "AEROFLEX", name: "Aeroflex Industries Ltd.", industry: "IT Services", sector: "STEEL AND STEEL PRODUCTS"
}, {
    "code": "AERON", "label": "AERON", name: "Aeron Composite Ltd.", industry: "IT Services", sector: "PLASTIC AND PLASTIC PRODUCTS"
}, {
    "code": "AERONEU", "label": "AERONEU", name: "Aeroflex Neu Limited", industry: "IT Services", sector: "PACKAGING"
}, {
    "code": "AESTHETIK", "label": "AESTHETIK", name: "Aesthetik Engineers Ltd.", industry: "IT Services", sector: "CONSTRUCTION"
}, {
    "code": "AETHER", "label": "AETHER", name: "Aether Industries Ltd.", industry: "IT Services", sector: "CHEMICALS", industry: "IT Services", sector: "SPECIALITY"
}, {
    "code": "AFCONS", "label": "AFCONS", name: "Afcons Infrastructure Limited", industry: "IT Services", sector: "CONSTRUCTION"
}, {
    "code": "AFFLE", "label": "AFFLE", name: "Affle 3I Limited", industry: "IT Services", sector: "MEDIA & ENTERTAINMENT"
}, {
    "code": "AFFORDABLE", "label": "AFFORDABLE", name: "Affordable Robotic & Automation Limited", industry: "IT Services", sector: "ENGINEERING", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "AFIL", "label": "AFIL", name: "Akme Fintrade (India) Ltd.", industry: "IT Services", sector: "FINANCE"
    , defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "AFSL", "label": "AFSL", name: "Abans Financial Services Limited", industry: "IT Services", sector: "FINANCE"
    , defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "AGARIND", "label": "AGARIND", name: "Agarwal Industrial Corporation Ltd.", industry: "IT Services", sector: "TRAVEL AND TRANSPORT"
}, {
    "code": "AGARWALEYE", "label": "AGARWALEYE", name: "Dr. Agarwal's Health Care Limited", industry: "IT Services", sector: "Hospitals & Medical Services"
}, {
    "code": "AGARWALFT", "label": "AGARWALFT", name: "Agarwal Float Glass India Ltd.", industry: "IT Services", sector: "TRADING"
}, {
    "code": "AGARWALTUF", "label": "AGARWALTUF", name: "Agarwal Toughened Glass India Limited", industry: "IT Services", sector: "Glass, Glass Product"
}, {
    "code": "AGI", "label": "AGI", name: "AGI Greenpac Ltd.", industry: "IT Services", sector: "CONSTRUCTION"
}, {
    "code": "AGIIL", "label": "AGIIL", name: "Agi Infra Ltd.", industry: "IT Services", sector: "CONSTRUCTION"
}, {
    "code": "AGNI", "label": "AGNI", name: "Agni Green Power Ltd.", industry: "IT Services", sector: "ELECTRICAL EQUIPMENT"
}, {
    "code": "AGRITECH", "label": "AGRITECH", name: "Agri-Tech (India)", industry: "IT Services", sector: "FERTILISERS"
}, {
    "code": "AGROPHOS", "label": "AGROPHOS", name: "Agro Phos India Ltd.", industry: "IT Services", sector: "DIVERSIFIED"
}, {
    "code": "AGSTRA", "label": "AGSTRA", name: "AGS Transact Technologies Ltd.", industry: "IT Services", sector: "COMPUTERS", industry: "IT Services", sector: "SOFTWARE", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "AGUL", "label": "AGUL", name: "A G Universal Ltd.", industry: "IT Services", sector: "TRADING"
}, {
    "code": "AHCL", "label": "AHCL", name: "Anlon Healthcare Limited", industry: "IT Services", sector: "CHEMICALS", industry: "IT Services", sector: "SPECIALITY"
}, {
    "code": "AHLADA", "label": "AHLADA", name: "Ahlada Engineers Ltd.", industry: "IT Services", sector: "ELECTRICAL EQUIPMENT"
}, {
    "code": "AHLEAST", "label": "AHLEAST", name: "Asian Hotels (East)", industry: "IT Services", sector: "HOTELS"
}, {
    "code": "AHLUCONT", "label": "AHLUCONT", name: "Ahluwalia Contracts (India) Ltd.", industry: "IT Services", sector: "CONSTRUCTION"
}, {
    "code": "AIAENG", "label": "AIAENG", name: "AIA Engineering Ltd.", industry: "IT Services", sector: "ENGINEERING", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "AIIL", "label": "AIIL", name: "Authum Investment & Infrastructure Ltd.", industry: "IT Services", sector: "FINANCE"
    , defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "AILIMITED", "label": "AILIMITED", name: "Abhishek Integrations Ltd.", industry: "IT Services", sector: "MISCELLANEOUS", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "AIMTRON", "label": "AIMTRON", name: "Aimtron Electronics Ltd.", industry: "IT Services", sector: "ELECTRONICS", industry: "IT Services", sector: "INDUSTRIAL"
}, {
    "code": "AIRAN", "label": "AIRAN", name: "Airan Ltd.", industry: "IT Services", sector: "COMPUTERS", industry: "IT Services", sector: "HARDWARE"
}, {
    "code": "AIROLAM", "label": "AIROLAM", name: "Airo Lam Ltd.", industry: "IT Services", sector: "MISCELLANEOUS", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "AIRTELPP", "label": "AIRTELPP", name: "Bharti Airtel PP Ltd.", industry: "IT Services", sector: "CABLES", industry: "IT Services", sector: "TELECOM"
}, {
    "code": "AISL", "label": "AISL", name: "ANI Integrated Services Ltd.", industry: "IT Services", sector: "ENGINEERING", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "AJANTPHARM", "label": "AJANTPHARM", name: "Ajanta Pharmaceuticals Ltd.", industry: "IT Services", sector: "PHARMACEUTICALS"
    , defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}, {
    "code": "AJAXENGG", "label": "AJAXENGG", name: "Ajax Engineering Limited", industry: "IT Services", sector: "ENGINEERING", defaultUrl: "",
    funda: true,
    tech: true,
    fno: true,
    ma: true
}]





