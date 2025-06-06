// By Nikhil H

let CLOSE = 'CLOSE', OPEN = 'OPEN', HIGH = 'HIGH', LOW = 'LOW';

let CLOSE_DEF = { id: CLOSE, label: 'Close', sLabel: 'C' };
let OPEN_DEF = { id: OPEN, label: 'Open', sLabel: 'O' };
let HIGH_DEF = { id: HIGH, label: 'High', sLabel: 'H' };
let LOW_DEF = { id: LOW, label: 'Low', sLabel: 'L' }

var EMA = 'EMA';
var SMA = 'SMA';
var WMA = 'WMA';

let SMA_DEF = { id: SMA, label: 'Sma' };
let EMA_DEF = { id: EMA, label: 'Ema' };
let WMA_DEF = { id: WMA, label: 'Wma' };

function cloneObj(obj) {
    var str = JSON.stringify(obj);
    var clone = JSON.parse(str);

    return clone;
}

let OPEN_DEF_CLONE = cloneObj(OPEN_DEF);
let HIGH_DEF_CLONE = cloneObj(HIGH_DEF);
let LOW_DEF_CLONE = cloneObj(LOW_DEF);
let CLOSE_DEF_CLONE = cloneObj(CLOSE_DEF);

var OHLC_DEF = [
    OPEN_DEF_CLONE,
    HIGH_DEF_CLONE,
    LOW_DEF_CLONE,
    CLOSE_DEF_CLONE
];

let ohlcDefaultVal = ['latest', 'tick'];
// * IMPORTANT - let value of each option be in lowercase only 
let ohlcAdvancedOptions = {
    period: {
        inputType: "select",
        options: [
            { label: "Latest", value: "latest" },
            { label: "Previous (P-1)", value: "p1" },
            { label: "P-2", value: "p2" },
            { label: "P-3", value: "p3" },
            { label: "P-4", value: "p4" },
            { label: "P-5", value: "p5" }
        ]
    },
    tick: {
        inputType: "select",
        options: [
            { label: "Tick (Current Screener Tick)", value: "tick" },
            { label: "Day", value: "day" }
        ]
    }
};

for (let i = 0; i < OHLC_DEF.length; i++) {
    OHLC_DEF[i].qlCat = 'OVERLAY';
    OHLC_DEF[i].advancedOptions = ohlcAdvancedOptions;
    OHLC_DEF[i].defaultVal = ohlcDefaultVal.join(",");
}

let SMA_DEF_CLONE = cloneObj(SMA_DEF);
let EMA_DEF_CLONE = cloneObj(EMA_DEF);
let WMA_DEF_CLONE = cloneObj(WMA_DEF);

var MA_DEF = [
    SMA_DEF_CLONE,
    EMA_DEF_CLONE,
    WMA_DEF_CLONE
];

let maDefaultVal = [21];

let maAdvancedOptions = {
    period: {
        inputType: "input",
        options: null
    }
};

for (let i = 0; i < MA_DEF.length; i++) {
    MA_DEF[i].qlCat = 'OVERLAY';
    MA_DEF[i].advancedOptions = maAdvancedOptions;
    MA_DEF[i].defaultVal = maDefaultVal.join(",");
}

let ohlcOps = ["<", ">", "!=", "="];
let maOps = ["above", "below", "cross_above", "cross_below", "crossover"];
let highlightsOps = ["above", "below", "between"];
let guruNumberOps = ["above", "below", "between"];
let valRatioOps = ["above", "below", "between"];

let OVERLAYS_DEF = [
    { id: 'Price', voArr: OHLC_DEF, relatedOps: ohlcOps },
    { id: 'Moving Averages', voArr: MA_DEF, relatedOps: maOps }
];

// * HIGHLIGHTS DEF
let highlightsDefaultVal = [];

let highlightsAdvancedOptions = {
};

let MKT_CAP_DEF = { id: "Market Cap", label: "Market_Capitalization" };
let FACE_VAL_DEF = { id: "Face Value", label: "Face_Value" };

let HIGHLIGHTS_DEF = [
    MKT_CAP_DEF,
    FACE_VAL_DEF
];

setFieldDefValues(HIGHLIGHTS_DEF, 'FUNDA', highlightsAdvancedOptions, highlightsDefaultVal);

// * GURU NUMBERS DEF
let guruNumbersDefaultVal = [];

let guruNumbersAdvancedOptions = {
};

let SLOAN_RATIO_DEF = { id: "Sloan Ratio", label: "Sloan_Ratio" };
let ALTMAN_Z_SCORE_DEF = { id: "Altman Z Score", label: "Altman_Z_Score" };

let GURU_NUMBERS_DEF = [
    SLOAN_RATIO_DEF,
    ALTMAN_Z_SCORE_DEF
];

setFieldDefValues(GURU_NUMBERS_DEF, 'FUNDA', guruNumbersAdvancedOptions, guruNumbersDefaultVal);

// * VALUATION RATIO DEF
let valRatioDefaultVal = ["TTM", "Compare_Value"];

let valRatioAdvancedOptions = {
    frequency: {
        inputType: "select",
        options: [
            { label: "TTM", value: "TTM" },
            { label: "FY", value: "FY" }
        ]
    },
    strategy: {
        inputType: "select",
        options: [
            { label: "Compare_Value", value: "Compare_Value" },
            { label: "Compare_Average", value: "Compare_Average" },
            { label: "CAGR", value: "CAGR" }
        ]
    }
};

let PRICE_EPS_DEF = { id: "Price EPS", label: "Price/EPS_PE" };
let PRICE_TO_BOOK_DEF = { id: "Price To Book", label: "Price_To_Book" };

let VALUATION_RATIOS_DEF = [
    PRICE_EPS_DEF,
    PRICE_TO_BOOK_DEF
];

setFieldDefValues(VALUATION_RATIOS_DEF, 'FUNDA', valRatioAdvancedOptions, valRatioDefaultVal);

let FUNDA_DEF = [
    { id: 'Highlights', voArr: HIGHLIGHTS_DEF, relatedOps: highlightsOps },
    { id: 'Guru Numbers', voArr: GURU_NUMBERS_DEF, relatedOps: guruNumberOps },
    { id: 'Valuation Ratios', voArr: VALUATION_RATIOS_DEF, relatedOps: valRatioOps }
];

let DATA_MASTER = [
    { id: 'OVERLAYS', voArr: OVERLAYS_DEF },
    { id: 'FUNDA', voArr: FUNDA_DEF }
];

function setFieldDefValues(DEF, qlCat, advancedOptions, defaultVal) {
    for (let i = 0; i < DEF.length; i++) {
        DEF[i].qlCat = qlCat;
        DEF[i].advancedOptions = advancedOptions;
        DEF[i].defaultVal = defaultVal.join(",");
    }
}