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


// * IMPORTANT - let value of each option be in lowercase only 
let ohlcAdvancedOptions = {
    period: {
        inputType: "select",
        options: [
            { label: "Latest", value: "latest" },
            { label: "Previous (P-1)", value: "p1" },
            { label: "(P-2)", value: "p2" },
            { label: "(P-3)", value: "p3" },
            { label: "(P-4)", value: "p4" },
            { label: "(P-5)", value: "p5" }
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
}

let SMA_DEF_CLONE = cloneObj(SMA_DEF);
let EMA_DEF_CLONE = cloneObj(EMA_DEF);
let WMA_DEF_CLONE = cloneObj(WMA_DEF);

var MA_DEF = [
    SMA_DEF_CLONE,
    EMA_DEF_CLONE,
    WMA_DEF_CLONE
];


let maAdvancedOptions = {
    period: {
        inputType: "input",
        options: null
    }
};

for (let i = 0; i < MA_DEF.length; i++) {
    MA_DEF[i].qlCat = 'OVERLAY';
    MA_DEF[i].advancedOptions = maAdvancedOptions;
}

let ohlcOps = ["<", ">", "!=", "="];
let maOps = ["above", "below", "cross_above", "cross_below", "crossover"];

let OVERLAYS_DEF = [
    { id: 'OHLC', voArr: OHLC_DEF, relatedOps: ohlcOps },
    { id: 'MA', voArr: MA_DEF, relatedOps: maOps }
];

let FUNDA_DEF = null;

let DATA_MASTER = [
    { id: 'OVERLAYS', voArr: OVERLAYS_DEF },
    { id: 'FUNDA', voArr: FUNDA_DEF }
];



