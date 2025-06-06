// By Nikhil H

let CLOSE = 'CLOSE', OPEN = 'OPEN', HIGH = 'HIGH', LOW = 'LOW';

let OPEN_DEF = { id: OPEN, label: 'OPEN', sLabel: 'O' };
let HIGH_DEF = { id: HIGH, label: 'HIGH', sLabel: 'H' };
let LOW_DEF = { id: LOW, label: 'LOW', sLabel: 'L' }
let CLOSE_DEF = { id: CLOSE, label: 'CLOSE', sLabel: 'C' };

var EMA = 'EMA';
var SMA = 'SMA';
var WMA = 'WMA';

let SMA_DEF = { id: SMA, label: 'SMA' };
let EMA_DEF = { id: EMA, label: 'EMA' };
let WMA_DEF = { id: WMA, label: 'WMA' };

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

let ohlcDefaultVal = ['0', 'D'];
// * IMPORTANT - let value of each option be in lowercase only 
let ohlcAdvancedOptions = {
    Period: {
        inputType: "select",
        options: [
            { label: "P-0", value: "0" },
            { label: "P-1", value: "1" },
            { label: "P-2", value: "2" },
            { label: "P-3", value: "3" },
            { label: "P-4", value: "4" },
            { label: "P-5", value: "5" }
        ]
    },
    Tick: {
        inputType: "select",
        options: [
            { label: "1 Minute", value: "1m" },
            { label: "2 Minutes", value: "2m" },
            { label: "3 Minutes", value: "3m" },
            { label: "5 Minutes", value: "5m" },
            { label: "10 Minutes", value: "10m" },
            { label: "15 Minutes", value: "15m" },
            { label: "30 Minutes", value: "30m" },
            { label: "45 Minutes", value: "45m" },
            { label: "1 Hour", value: "1H" },
            { label: "75 Minutes", value: "75m" },
            { label: "2 Hours", value: "2H" },
            { label: "3 Hours", value: "3H" },
            { label: "4 Hours", value: "4H" },
            // { label: "Daily (Mkt Hours)", value: "I_D" },
            { label: "Daily", value: "D" },
            { label: "Weekly", value: "W" },
            { label: "Monthly", value: "M" },
            { label: "Quarterly", value: "Q" }
        ]
    }
};

setFieldDefValues(OHLC_DEF, 'OVERLAY', ohlcAdvancedOptions, ohlcDefaultVal);

let SMA_DEF_CLONE = cloneObj(SMA_DEF);
let EMA_DEF_CLONE = cloneObj(EMA_DEF);
let WMA_DEF_CLONE = cloneObj(WMA_DEF);

var MA_DEF = [
    SMA_DEF_CLONE,
    EMA_DEF_CLONE,
    WMA_DEF_CLONE
];

let maDefaultVal = ["O", 21];

let maAdvancedOptions = {

    Price: {
        inputType: "select",
        options: [
            { label: "Open", value: "O" },
            { label: "High", value: "H" },
            { label: "Low", value: "L" },
            { label: "Close", value: "C" }
        ]
    },
    Period: {
        inputType: "input",
        options: null
    }
};

setFieldDefValues(MA_DEF, 'OVERLAY', maAdvancedOptions, maDefaultVal);

let ohlcOps = ["<", ">", "="];
let maOps = ["above", "below", "crossabove", "crossbelow", "crossover"];
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

let MKT_CAP_DEF = { id: "Market Cap", label: "MARKET CAPITALIZATION" };
let FACE_VAL_DEF = { id: "Face Value", label: "FACE VALUE" };

let HIGHLIGHTS_DEF = [
    MKT_CAP_DEF,
    FACE_VAL_DEF
];

setFieldDefValues(HIGHLIGHTS_DEF, '', highlightsAdvancedOptions, highlightsDefaultVal);

// * GURU NUMBERS DEF
let guruNumbersDefaultVal = [];

let guruNumbersAdvancedOptions = {
};

let SLOAN_RATIO_DEF = { id: "Sloan Ratio", label: "SLOAN RATIO" };
let ALTMAN_Z_SCORE_DEF = { id: "Altman Z Score", label: "ALTZMAN Z SCORE" };

let GURU_NUMBERS_DEF = [
    SLOAN_RATIO_DEF,
    ALTMAN_Z_SCORE_DEF
];

setFieldDefValues(GURU_NUMBERS_DEF, '', guruNumbersAdvancedOptions, guruNumbersDefaultVal);

// * VALUATION RATIO DEF
// let valRatioDefaultVal = ["TTM", "Compare Value"];
let valRatioDefaultVal = ["TTM"];

let valRatioAdvancedOptions = {
    frequency: {
        inputType: "select",
        options: [
            { label: "TTM", value: "TTM" },
            { label: "FY", value: "FY" }
        ]
    }
    // ,
    // strategy: {
    //     inputType: "select",
    //     options: [
    //         { label: "Compare Value", value: "Compare Value" },
    //         { label: "Compare Average", value: "Compare Average" },
    //         { label: "CAGR", value: "CAGR" }
    //     ]
    // }
};

let PRICE_EPS_DEF = { id: "Price EPS", label: "PRICE/EPS PE" };
let PRICE_TO_BOOK_DEF = { id: "Price To Book", label: "PRICE TO BOOK" };

let VALUATION_RATIOS_DEF = [
    PRICE_EPS_DEF,
    PRICE_TO_BOOK_DEF
];

setFieldDefValues(VALUATION_RATIOS_DEF, '', valRatioAdvancedOptions, valRatioDefaultVal);

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
        if (qlCat != '')
            DEF[i].qlCat = qlCat;
        else
            DEF[i].qlCat = '';
        DEF[i].advancedOptions = advancedOptions;
        DEF[i].defaultVal = defaultVal.join(", ");
    }
}