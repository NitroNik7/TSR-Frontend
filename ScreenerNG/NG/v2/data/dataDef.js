var MA_DEF = [
    { id: "pma", label: "Compare Price & MA", title: "Compare Price & MA", func: "csma.addMa", params: ["pma"], subMenu: null },
    { id: "maco", label: "Compare Two MA's", title: "Compare Two MA's", func: "csma.addMa", params: ["maco"], subMenu: null },
    { id: "maTrend", label: "Trending MA", title: "Trending MA", func: "csma.addMa", params: ["maTrend"], subMenu: null },
    { id: "maHist", label: "DIY Hist Compare", title: "DIY Hist Compare", func: "csma.addMa", params: ["maHist"], subMenu: null },
    { id: "maFakeBreak", label: "MA Fake Break", title: "MA Fake Break", func: "csma.addMa", params: ["maFakeBreak"], subMenu: null },
    { id: "maSupResBounce", label: "Bounced From MA", title: "Bounced From MA", func: "csma.addMa", params: ["maSupResBounce"], subMenu: null },
    { id: "maCon", label: "MA Convergence", title: "MA Convergence", func: "csma.addMa", params: ["maCon"], subMenu: null },
    { id: "maDiv", label: "MA Divergence", title: "MA Divergence", func: "csma.addMa", params: ["maDiv"], subMenu: null },
];

var TECH_INDI_DEF = [
    {
        id: "obos", label: "Over Bot/Sold", func: null, params: null, subMenu: [
            { id: "aroon", label: "Aroon Osc", title: "Aroon Oscillator", func: "cst.atn", params: ["aroon", "obos"] },
            { id: "cci", label: "CCI", title: "CCI (Commodity Channel Index)", func: "cst.atn", params: ["cci", "obos"] },
            { id: "mfi", label: "MSI", title: "MFI (Money Flow Index)", func: "cst.atn", params: ["mfi", "obos"] },
            { id: "rsi", label: "RSI (Fast)", title: "RSI (Fast)", func: "cst.atn", params: ["rsi", "obos"] },
            { id: "rsis", label: "RSI", title: "RSI ( Relative Strength Indicator)", func: "cst.atn", params: ["rsis", "obos"] },
            { id: "stof", label: "Sto Fast", title: "Stochastic Fast", func: "cst.atn", params: ["stof", "sto"] },
            { id: "stos", label: "Sto Slow", title: "Stochastic Slow", func: "cst.atn", params: ["stos", "sto"] },
            { id: "stoRsi", label: "Sto RSI (FAST)", title: "Stochastic RSI", func: "cst.atn", params: ["stoRsi", "stoRsi"] },
            { id: "stoRsiSlow", label: "Sto RSI", title: "Stochastic RSI", func: "cst.atn", params: ["stoRsiSlow", "stoRsi"] },
            { id: "uo", label: "UO", title: "UO (Ultimate Oscillator)", func: "cst.atn", params: ["uo", "obos"] },
            { id: "wr", label: "W%R", title: "W%R ( Williams %R)", func: "cst.atn", params: ["wr", "obos"] },
        ]
    },
    {
        id: "overlays", label: "Overlays", func: null, params: null, subMenu: [
            { id: "", label: "Price & Bollinger", title: "Price Comparision With Bollinger Band", func: "cst.atn", params: ["bb", "price"] },
            { id: "", label: "Ichimoku (old)", title: "Ichimoku Old", func: "ichiOld.aim", params: ["techIchiComp"] },
            { id: "", label: "Ichimoku", title: "Ichimoku Cloud", func: "cst.atn", params: ["ichimoku", "ichimoku"] },
            { id: "", label: "Price & Keltner", title: "Price Comparision With Keltner Channel", func: "cst.atn", params: ["keltner", "price"] },
            { id: "", label: "PSAR", title: "Parabolic SAR", func: "cst.atn", params: ["psar", "psar"] },
        ]
    },
    {
        id: "trendMom", label: "Trend/Momentum", func: null, params: null, subMenu: [
            { id: "", label: "ADX", title: "ADX (Average Directional Index)", func: "cst.atn", params: ["adx", "adx"] },
            { id: "", label: "Aroon", title: "Aroon", func: "cst.atn", params: ["aroon", "AroonIndi"] },
            { id: "", label: "AweOsc", title: "Awesome Oscillator", func: "cst.atn", params: ["aweOsc", "aweOsc"] },
            { id: "", label: "MACD", title: "MACD (Moving Average Conv & Divergence)", func: "cst.atn", params: ["mac", "macd"] },
            { id: "", label: "ROC", title: "ROC (Rate of Change)", func: "cst.atn", params: ["roc", "roc"] },
            { id: "", label: "RVI", title: "RVI (Relative Vigor Idx)", func: "cst.atn", params: ["rvi", "rvi"] },
            { id: "", label: "Supertrend", title: "Supertrend", func: "cst.atn", params: ["st", "st"] },
        ]
    },
    {
        id: "accDist", label: "Accumulation / Distribution", func: null, params: null, subMenu: [
            { id: "", label: "CMF", title: "CMF (Chaikin Money Flow", func: "cst.atn", params: ["cmf", "cmf"] },
        ]
    },
    {
        id: "vol", label: "Volatility", func: null, params: null, subMenu: [
            { id: "", label: "ATR", title: "ATR (Average True Range)", func: "cst.atn", params: ["atr", "atr"] },
            { id: "", label: "Std Dev", title: "Standard Deviation", func: "cst.atn", params: ["stdDev", "stdDev"] },
        ]
    },
    {
        id: "diy", label: "DIY - Advance Comparision", func: null, params: null, subMenu: [
            { id: "", label: "Over Bot/Sold", title: "DIY Deep Compare Over Bot/Sold Indicators", func: "diybi.add", params: ["Obos"] },
            { id: "", label: "Trend Indi", title: "DIY Deep Compare Trend Indicators", func: "diybi.add", params: ["Trend"] },
            { id: "", label: "Momentum Indi", title: "DIY Deep Compare Momentum Indicators", func: "diybi.add", params: ["Momentum"] },
            { id: "", label: "Accumulation Dist", title: "DIY Deep Compare Accumulation Distribution Indicators", func: "diybi.add", params: ["AccDist"] },
            { id: "", label: "Volatility", title: "DIY Deep Compare Volatility Indicators", func: "diybi.add", params: ["Volatility"] },
            { id: "", label: "Overlays", title: "DIY Deep Compare Overlays", func: "diybi.add", params: ["Overlays"] },
        ]
    },


];