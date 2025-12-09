const addIndicatorsButton = document.getElementById('addIndicatorsButton');
const searchSelectIndicator = document.querySelector('.search_select_indicator');
const selectElement = document.getElementById('indicatorListDivs');
const resetFilterButton = document.getElementById('resetFilter');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchIndicatorInput = document.getElementById('searchIndicator');
const selectedIndiSettings = document.getElementById('selectedIndiSettings');
const indiSearchSelect = document.getElementById('indiSearchSelect');
const indiCategories = document.getElementById('indicatorCategories');
const indicators = [{
        "id": 1,
        "name": "ADI",
        "about": "Accumulation/Distribution Index is a volume-based indicator that assesses the strength of price moves by measuring the volume flows.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 2,
        "name": "ADX",
        "about": "Average Directional Index is used to measure the strength of a trend, with higher values indicating stronger trends.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 3,
        "name": "Aroon",
        "about": "Aroon indicator identifies the beginning of a new trend and helps assess whether the trend is rising or falling.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 4,
        "name": "AroonOsc",
        "about": "Aroon Oscillator calculates the difference between the Aroon Up and Aroon Down indicators to gauge the strength of a trend.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 5,
        "name": "ATR",
        "about": "Average True Range is a volatility indicator that measures the degree of price movement in an asset.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 6,
        "name": "ATR Band",
        "about": "ATR Bands plot volatility bands above and below a moving average, based on the Average True Range.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 7,
        "name": "Awe Osc",
        "about": "Awesome Oscillator is a momentum indicator used to determine market momentum by comparing current and historic averages.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 8,
        "name": "Bollinger",
        "about": "Bollinger Bands are volatility bands placed around a moving average, expanding and contracting based on market volatility.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 9,
        "name": "BOP",
        "about": "Balance of Power is a momentum indicator that measures buying and selling pressure.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 10,
        "name": "CMF",
        "about": "Chaikin Money Flow is a volume-weighted average of accumulation and distribution over a specified period.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 11,
        "name": "CCI",
        "about": "Commodity Channel Index measures the difference between the current price and its historical average, identifying overbought/oversold levels.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 12,
        "name": "Chandelier",
        "about": "Chandelier Exit is a trend-following indicator that sets a trailing stop-loss based on the highest high during a trend.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 13,
        "name": "Choppiness",
        "about": "Choppiness Index is a volatility indicator designed to measure whether the market is choppy (trading sideways) or trending.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 14,
        "name": "Coppock",
        "about": "Coppock Curve is a long-term momentum indicator used primarily to identify major market bottoms.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 15,
        "name": "CMO",
        "about": "Chande Momentum Oscillator is a momentum indicator that calculates the relative strength of price movements.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 16,
        "name": "DPO",
        "about": "Detrended Price Oscillator removes the trend from price to identify cycles, often used to isolate short-term price movement.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 17,
        "name": "Donchian",
        "about": "Donchian Channels plot the highest high and lowest low over a specified period to identify breakout potential.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 18,
        "name": "ElderRay",
        "about": "Elder-Ray Index uses bull and bear power to assess the strength of bulls and bears in the market.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 19,
        "name": "EFI",
        "about": "Elder's Force Index is an indicator that uses price and volume to assess the power behind a move in a stock.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 20,
        "name": "EOM",
        "about": "Ease of Movement combines price and volume to evaluate the relationship between price change and volume.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 21,
        "name": "HL Bands",
        "about": "High-Low Bands create a volatility band by adding and subtracting a moving average of the high-low range to the price.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 22,
        "name": "HL MA Bands",
        "about": "High-Low Moving Average Bands use moving averages of high and low prices to assess volatility.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 23,
        "name": "Ichimoku",
        "about": "Ichimoku Cloud is a trend-following indicator that defines support and resistance, trend direction, and momentum.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 24,
        "name": "Keltner",
        "about": "Keltner Channels are volatility-based bands set above and below an exponential moving average, useful for identifying reversals.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 25,
        "name": "KST",
        "about": "Know Sure Thing is a momentum indicator that combines rate-of-change readings over different periods.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 26,
        "name": "MACD",
        "about": "Moving Average Convergence Divergence shows the relationship between two moving averages of a security’s price.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 27,
        "name": "MA Channel",
        "about": "Moving Average Channel plots channels around a moving average to gauge potential breakout zones.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 28,
        "name": "MA Envelope",
        "about": "Moving Average Envelopes use upper and lower bands around a moving average, helpful in identifying trend direction.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 29,
        "name": "Mass Idx",
        "about": "Mass Index is a volatility indicator that identifies price reversals by calculating range expansions and contractions.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 30,
        "name": "MFI",
        "about": "Money Flow Index is a momentum indicator that uses price and volume to assess buying and selling pressure.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 31,
        "name": "Momentum",
        "about": "Momentum measures the rate of change in price to assess the strength and direction of a trend.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 32,
        "name": "OBV",
        "about": "On-Balance Volume is a cumulative volume-based indicator that measures buying and selling pressure.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 33,
        "name": "PGO",
        "about": "Pretty Good Oscillator compares recent price changes to average price changes over time to measure momentum.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 34,
        "name": "P SAR",
        "about": "Parabolic SAR is a trend-following indicator that sets trailing stop points above or below the price.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 35,
        "name": "PVT",
        "about": "Price Volume Trend is a cumulative volume-based indicator used to determine price direction and strength.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 36,
        "name": "PVO",
        "about": "Percentage Volume Oscillator shows the difference between two volume-based moving averages, indicating changes in volume trends.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 37,
        "name": "PPO",
        "about": "Percentage Price Oscillator measures the percentage difference between two price-based moving averages.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 38,
        "name": "PMO",
        "about": "Price Momentum Oscillator is used to measure momentum by calculating the rate of price changes over time.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 39,
        "name": "ROC",
        "about": "Rate of Change is a momentum indicator that measures the percentage change in price over a specified period.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 40,
        "name": "RSI",
        "about": "Relative Strength Index measures the magnitude of recent price changes to evaluate overbought or oversold conditions.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 41,
        "name": "RSI (fast)",
        "about": "Fast RSI is a quicker-moving version of the Relative Strength Index, more responsive to recent price changes.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 42,
        "name": "Rel Vigor Idx",
        "about": "Relative Vigor Index measures the tendency of prices to close higher than they open in uptrends and lower in downtrends.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 43,
        "name": "Sto (Fast)",
        "about": "Fast Stochastic Oscillator tracks the current price in relation to a range of prices over a specific period, indicating momentum.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 44,
        "name": "Sto (Slow)",
        "about": "Slow Stochastic Oscillator is a smoothed version of the Fast Stochastic, less sensitive to price changes.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 45,
        "name": "Sto RSI",
        "about": "Stochastic RSI is a momentum oscillator that uses RSI values to identify overbought and oversold conditions.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 46,
        "name": "Sto RSI (Fast)",
        "about": "Fast Stochastic RSI is a quicker version of Stochastic RSI, giving faster signals based on RSI movements.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 47,
        "name": "Std Dev",
        "about": "Standard Deviation measures the dispersion of price data, commonly used to assess market volatility.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 48,
        "name": "Supertrend",
        "about": "Supertrend is a trend-following indicator that provides buy and sell signals based on price and volatility.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 49,
        "name": "TSI",
        "about": "True Strength Index is a momentum indicator that smooths price changes to help identify trend direction.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 50,
        "name": "TWAP",
        "about": "Time-Weighted Average Price calculates the average price of a security over a specified period based on time.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 51,
        "name": "Ultimate (O)",
        "about": "Ultimate Oscillator combines short, medium, and long-term price movements to provide a comprehensive momentum analysis.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 52,
        "name": "Ulcer",
        "about": "Ulcer Index measures the depth and duration of price declines, useful for assessing downside risk.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 53,
        "name": "W %R",
        "about": "Williams %R measures the level of the close relative to the highest high over a certain period, indicating overbought or oversold levels.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 54,
        "name": "Wil Alligator",
        "about": "Williams Alligator is a trend-following indicator that uses moving averages to indicate market direction.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 55,
        "name": "VWAP / MVWAP",
        "about": "Volume Weighted Average Price/MVWAP calculates the average trading price based on volume, used for assessing market trends.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 56,
        "name": "Vortex",
        "about": "Vortex Indicator identifies the start of a new trend by using price movements to determine direction.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 57,
        "name": "ZigZag",
        "about": "ZigZag indicator filters minor price movements to help identify significant trends and price reversals.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    }
];

const bottomIndicators = [{
        "id": 1,
        "name": "ADI",
        "about": "Accumulation/Distribution Index is a volume-based indicator that assesses the strength of price moves by measuring the volume flows.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 2,
        "name": "ADX",
        "about": "Average Directional Index is used to measure the strength of a trend, with higher values indicating stronger trends.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 3,
        "name": "Aroon",
        "about": "Aroon indicator identifies the beginning of a new trend and helps assess whether the trend is rising or falling.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 4,
        "name": "AroonOsc",
        "about": "Aroon Oscillator calculates the difference between the Aroon Up and Aroon Down indicators to gauge the strength of a trend.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 5,
        "name": "ATR",
        "about": "Average True Range is a volatility indicator that measures the degree of price movement in an asset.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 6,
        "name": "ATR Band",
        "about": "ATR Bands plot volatility bands above and below a moving average, based on the Average True Range.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 7,
        "name": "Awe Osc",
        "about": "Awesome Oscillator is a momentum indicator used to determine market momentum by comparing current and historic averages.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 8,
        "name": "Bollinger",
        "about": "Bollinger Bands are volatility bands placed around a moving average, expanding and contracting based on market volatility.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 9,
        "name": "BOP",
        "about": "Balance of Power is a momentum indicator that measures buying and selling pressure.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 10,
        "name": "CMF",
        "about": "Chaikin Money Flow is a volume-weighted average of accumulation and distribution over a specified period.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 11,
        "name": "CCI",
        "about": "Commodity Channel Index measures the difference between the current price and its historical average, identifying overbought/oversold levels.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 12,
        "name": "Chandelier",
        "about": "Chandelier Exit is a trend-following indicator that sets a trailing stop-loss based on the highest high during a trend.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 13,
        "name": "Choppiness",
        "about": "Choppiness Index is a volatility indicator designed to measure whether the market is choppy (trading sideways) or trending.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 14,
        "name": "Coppock",
        "about": "Coppock Curve is a long-term momentum indicator used primarily to identify major market bottoms.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 15,
        "name": "CMO",
        "about": "Chande Momentum Oscillator is a momentum indicator that calculates the relative strength of price movements.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    }
];

const overlayIndicators = [{
        "id": 1,
        "name": "ADI",
        "about": "Accumulation/Distribution Index is a volume-based indicator that assesses the strength of price moves by measuring the volume flows.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 2,
        "name": "ADX",
        "about": "Average Directional Index is used to measure the strength of a trend, with higher values indicating stronger trends.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 3,
        "name": "Aroon",
        "about": "Aroon indicator identifies the beginning of a new trend and helps assess whether the trend is rising or falling.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 4,
        "name": "AroonOsc",
        "about": "Aroon Oscillator calculates the difference between the Aroon Up and Aroon Down indicators to gauge the strength of a trend.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 5,
        "name": "ATR",
        "about": "Average True Range is a volatility indicator that measures the degree of price movement in an asset.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    },
    {
        "id": 6,
        "name": "ATR Band",
        "about": "ATR Bands plot volatility bands above and below a moving average, based on the Average True Range.",
        "settings": {
            "uoPeriod1": 7,
            "uoPeriod2": 14,
            "uoPeriod3": 28
        }
    }
];

const fundaIndicators = [];

const movingAverages = [{
        "id": 1,
        "name": "SMA",
        "about": "Simple Moving Average",
        "settings": {
            "Period1": 7
        }
    },
    {
        "id": 2,
        "name": "EMA",
        "about": "Exponential Moving Average",
        "settings": {
            "Period1": 7
        }
    },
    {
        "id": 3,
        "name": "WMA",
        "about": "Weighted Moving Average",
        "settings": {
            "Period1": 7
        }
    },
    {
        "id": 4,
        "name": "DEMA",
        "about": "Double Exponential Moving Average",
        "settings": {
            "Period1": 7
        }
    },
    {
        "id": 5,
        "name": "TEMA",
        "about": "Triple Exponential Moving Average",
        "settings": {
            "Period1": 7
        }
    },
    {
        "id": 6,
        "name": "TRIMA",
        "about": "Triangular Moving Average",
        "settings": {
            "Period1": 7
        }
    },
    {
        "id": 7,
        "name": "WSMA",
        "about": "Wilder’s Smoothing Moving Average",
        "settings": {
            "Period1": 7
        }
    },
    {
        "id": 8,
        "name": "HULLMA",
        "about": "Hull Moving Average",
        "settings": {
            "Period1": 7
        }
    },
    {
        "id": 9,
        "name": "KAMA",
        "about": "Kaufman’s Adaptive Moving Average",
        "settings": {
            "Period1": 7
        }
    },
    {
        "id": 10,
        "name": "DMA",
        "about": "Displaced Moving Average",
        "settings": {
            "Period1": 7
        }
    },
    {
        "id": 11,
        "name": "ZLEMA",
        "about": "Zero Lag Exponential Moving Average",
        "settings": {
            "Period1": 7
        }
    },
    {
        "id": 12,
        "name": "SMMA",
        "about": "Smoothed Moving Average",
        "settings": {
            "Period1": 7
        }
    }
];

const colorPickerHtml = getColors(colorsDesktop, colorsMobile);

function getColors(colorsDesktop, colorsMobile) {

    let colorsMobileHtml = `
    <div>
    <div onclick="showColorPicker(this)" id="colorPicker" style="height: 16px; width: 16px; background-color: red;">
        <i class="fa-solid fa-chart-line" style="color: white;"></i>
    </div>
    <div id="compactColorPicker" class="compact-color-picker" style="display: none; right: 60px; overflow: auto">
    <div id="defaultColorsMobile" class="default-colors-mobile" style="display: none;">`;
    colorsMobile.forEach((element, index) => {
        if (index % 5 == 0) {
            colorsMobileHtml += `<div class="colorRowsMobile">`;
        }
        colorsMobileHtml += (`<button onclick="selectColor(this)" style="background-color: ${element.hex};" title="${element.id}"></button>`);
        if (index % 5 == 4 || index == (colorsMobile.length - 1)) {
            colorsMobileHtml += `</div>`;
        }
    });

    colorsMobileHtml += `</div>`;

    let colorsDesktopHtml = `<div id="defaultColorsDesktop" class="default-colors-desktop" style="display: none;">`;
    colorsDesktop.forEach((ele, index) => {
        colorsDesktopHtml += (`<div class="colorRows">`);
        colorsDesktop[index].shades.forEach((element) => {
            colorsDesktopHtml += `<button onclick="selectColor(this)" style="background-color: ${element.hex};" title="${element.id}"></button>`;
        });
        colorsDesktopHtml += `</div>`;
    });
    colorsDesktopHtml += `</div>`;

    return colorsMobileHtml + colorsDesktopHtml + '</div> </div>';
}

function selectColor(ele) {
    const eleParent = ele.closest(".compact-color-picker");
    eleParent.style.display = "none";
    eleParent.previousElementSibling.style.backgroundColor = ele.style.backgroundColor;
}

let activeIndicatorsArr = [];

addIndicatorsButton.addEventListener('click', function () {

    searchSelectIndicator.style.display = searchSelectIndicator.style.display === "flex" ? "none" : "flex";
    selectedIndiSettings.style.display = "none";

    if (searchSelectIndicator.style.display === "none") {
        document.getElementById("indiSearchSelect").style.display = "flex";
        document.getElementById("indicatorCategories").style.display = "flex";
    } else {
        populateSelectOptions();
    }
});

// Function to populate the select options
function populateSelectOptions() {
    searchIndicatorInput.removeEventListener("input", search);
    selectElement.style.display = 'block';
    selectElement.innerHTML = ''; // Clear previous options
    document.getElementById("searchIndicator").style.display = 'block';
    document.getElementById("indicatorFilter").style.display = "flex";
    document.getElementById("indiSettingsBox").style.display = 'flex';
    document.getElementById("noActiIndi").style.display = 'none';
    document.getElementById("indiSearchSelect").style.borderRight = '1px solid lightgray';
    document.getElementById("indicatorListDivs").style.borderRight = '1px solid lightgray';
    document.getElementById("activeIndicatorListDivs").style.display = "none";
    document.getElementById('selectedIndiSettings').style.display = 'none';

    if (indicators.length != 0) {
        indicators.forEach((item, index) => {
            const div = document.createElement("div");
            div.setAttribute("data-index", index);
            div.setAttribute("style", "display: flex; flex-direction: row; justify-content: space-between");
            div.id = item.id;
            div.className = "divOptions";
            div.innerHTML = `
            <button class="indiOptions" onclick="selectOption(event, ${index});" style="background-color: white;">${item.name}</button>
            `;
            selectElement.appendChild(div);
        });
    } else {
        document.getElementById("noActiIndi").style.display = 'block';
        document.getElementById("noActiIndi").innerHTML = "";
        document.getElementById("searchIndicator").style.display = 'none';
        document.getElementById("indicatorFilter").style.display = "none";
        document.getElementById("indicatorListDivs").style.borderRight = 'none';
    }
    selectElement.scrollTop = 0;

    // Search functionality for input box
    searchIndicatorInput.addEventListener('input', search);

    function search() {
        const searchQuery = this.value;
        filterOptionsBySearch(searchQuery, indicators, "indicators");
    }

    // Event listeners for filter buttons
    filterButtons.forEach(button => {
        button.removeEventListener('click', filterbyLetter);
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', filterbyLetter);
    });

    function filterbyLetter() {
        const letter = this.getAttribute('data-letter');
        if (letter === '*') {
            resetFilter("library");
        } else {
            filterOptionsByLetter(letter, indicators, "indicators");
        }
    }
}

function showBottomIndicators() {
    searchIndicatorInput.removeEventListener("input", search);
    selectElement.style.display = 'block';
    selectElement.innerHTML = ''; // Clear previous options
    document.getElementById("searchIndicator").style.display = 'block';
    document.getElementById("indicatorFilter").style.display = "flex";
    document.getElementById("indiSettingsBox").style.display = 'flex';
    document.getElementById("noActiIndi").style.display = 'none';
    document.getElementById("indiSearchSelect").style.borderRight = '1px solid lightgray';
    document.getElementById("indicatorListDivs").style.borderRight = '1px solid lightgray';
    document.getElementById("activeIndicatorListDivs").style.display = "none";
    document.getElementById('selectedIndiSettings').style.display = 'none';

    if (bottomIndicators.length != 0) {
        bottomIndicators.forEach((item, index) => {
            const div = document.createElement("div");
            div.setAttribute("data-index", index);
            div.setAttribute("style", "display: flex; flex-direction: row; justify-content: space-between");
            div.id = item.id;
            div.className = "divOptions";
            div.innerHTML = `
            <button class="indiOptions" onclick="selectBottomIndicator(event, ${index});" style="background-color: white;">${item.name}</button>
            `;
            selectElement.appendChild(div);
        });
    } else {
        document.getElementById("noActiIndi").style.display = 'block';
        document.getElementById("noActiIndi").innerHTML = "";
        document.getElementById("searchIndicator").style.display = 'none';
        document.getElementById("indicatorFilter").style.display = "none";
        document.getElementById("indicatorListDivs").style.borderRight = 'none';
    }

    selectElement.scrollTop = 0;

    searchIndicatorInput.addEventListener('input', search);

    function search() {
        const searchQuery = this.value;
        filterOptionsBySearch(searchQuery, bottomIndicators, "bottomIndicators");
    }

    // Event listeners for filter buttons
    filterButtons.forEach(button => {
        button.removeEventListener('click', filterbyLetter);
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', filterbyLetter);
    });

    function filterbyLetter() {
        const letter = this.getAttribute('data-letter');
        if (letter === '*') {
            resetFilter("bottomIndicators");
        } else {
            filterOptionsByLetter(letter, bottomIndicators, "bottomIndicators");
        }
    }
}

function showOverlayIndicators() {
    searchIndicatorInput.removeEventListener("input", search);
    selectElement.style.display = 'block';
    selectElement.innerHTML = ''; // Clear previous options
    document.getElementById("searchIndicator").style.display = 'block';
    document.getElementById("indicatorFilter").style.display = "flex";
    document.getElementById("indiSettingsBox").style.display = 'flex';
    document.getElementById("noActiIndi").style.display = 'none';
    document.getElementById("indiSearchSelect").style.borderRight = '1px solid lightgray';
    document.getElementById("indicatorListDivs").style.borderRight = '1px solid lightgray';
    document.getElementById("activeIndicatorListDivs").style.display = "none";
    document.getElementById('selectedIndiSettings').style.display = 'none';

    if (overlayIndicators.length != 0) {
        overlayIndicators.forEach((item, index) => {
            const div = document.createElement("div");
            div.setAttribute("data-index", index);
            div.setAttribute("style", "display: flex; flex-direction: row; justify-content: space-between");
            div.id = item.id;
            div.className = "divOptions";
            div.innerHTML = `
            <button class="indiOptions" onclick="selectOverlayIndicator(event, ${index});" style="background-color: white;">${item.name}</button>
            `;
            selectElement.appendChild(div);
        });
    } else {
        document.getElementById("noActiIndi").style.display = 'block';
        document.getElementById("noActiIndi").innerHTML = "";
        document.getElementById("searchIndicator").style.display = 'none';
        document.getElementById("indicatorFilter").style.display = "none";
        document.getElementById("indicatorListDivs").style.borderRight = 'none';
    }

    selectElement.scrollTop = 0;

    searchIndicatorInput.addEventListener('input', search);

    function search() {
        const searchQuery = this.value;
        filterOptionsBySearch(searchQuery, overlayIndicators, "overlayIndicators");
    }

    // Event listeners for filter buttons
    filterButtons.forEach(button => {
        button.removeEventListener('click', filterbyLetter);
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', filterbyLetter);
    });

    function filterbyLetter() {
        const letter = this.getAttribute('data-letter');
        if (letter === '*') {
            resetFilter("overlayIndicators");
        } else {
            filterOptionsByLetter(letter, overlayIndicators, "overlayIndicators");
        }
    }
}

function showFundaIndicators() {
    searchIndicatorInput.removeEventListener("input", search);
    selectElement.style.display = 'block';
    selectElement.innerHTML = ''; // Clear previous options
    document.getElementById("searchIndicator").style.display = 'block';
    document.getElementById("indicatorFilter").style.display = "flex";
    document.getElementById("indiSettingsBox").style.display = 'flex';
    document.getElementById("noActiIndi").style.display = 'none';
    document.getElementById("indiSearchSelect").style.borderRight = '1px solid lightgray';
    document.getElementById("indicatorListDivs").style.borderRight = '1px solid lightgray';
    document.getElementById("activeIndicatorListDivs").style.display = "none";
    document.getElementById('selectedIndiSettings').style.display = 'none';

    if (fundaIndicators.length != 0) {
        fundaIndicators.forEach((item, index) => {
            const div = document.createElement("div");
            div.setAttribute("data-index", index);
            div.setAttribute("style", "display: flex; flex-direction: row; justify-content: space-between");
            div.id = item.id;
            div.className = "divOptions";
            div.innerHTML = `
            <button class="indiOptions" onclick="selectFundaIndicator(event, ${index});" style="background-color: white;">${item.name}</button>
            `;
            selectElement.appendChild(div);
        });
    } else {
        document.getElementById("noActiIndi").style.display = 'block';
        document.getElementById("noActiIndi").innerHTML = "";
        document.getElementById("searchIndicator").style.display = 'none';
        document.getElementById("indicatorFilter").style.display = "none";
        document.getElementById("indicatorListDivs").style.borderRight = 'none';
    }

    selectElement.scrollTop = 0;

    searchIndicatorInput.addEventListener('input', search);

    function search() {
        const searchQuery = this.value;
        filterOptionsBySearch(searchQuery, fundaIndicators, "fundaIndicators");
    }

    // Event listeners for filter buttons
    filterButtons.forEach(button => {
        button.removeEventListener('click', filterbyLetter);
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', filterbyLetter);
    });

    function filterbyLetter() {
        const letter = this.getAttribute('data-letter');
        if (letter === '*') {
            resetFilter("movingAverages");
        } else {
            filterOptionsByLetter(letter, fundaIndicators, "fundaIndicators");
        }
    }
}

function showMovingAverages() {
    searchIndicatorInput.removeEventListener("input", search);
    selectElement.style.display = 'block';
    selectElement.innerHTML = ''; // Clear previous options
    document.getElementById("searchIndicator").style.display = 'block';
    document.getElementById("indicatorFilter").style.display = "flex";
    document.getElementById("indiSettingsBox").style.display = 'flex';
    document.getElementById("noActiIndi").style.display = 'none';
    document.getElementById("indiSearchSelect").style.borderRight = '1px solid lightgray';
    document.getElementById("indicatorListDivs").style.borderRight = '1px solid lightgray';
    document.getElementById("activeIndicatorListDivs").style.display = "none";
    document.getElementById('selectedIndiSettings').style.display = 'none';

    if (movingAverages.length != 0) {
        movingAverages.forEach((item, index) => {
            const div = document.createElement("div");
            div.setAttribute("data-index", index);
            div.setAttribute("style", "display: flex; flex-direction: row; justify-content: space-between");
            div.id = item.id;
            div.className = "divOptions";
            div.innerHTML = `
            <button class="indiOptions" onclick="selectMovingAverage(event, ${index});" style="background-color: white;">${item.name}</button>
            `;
            selectElement.appendChild(div);
        });
    }

    selectElement.scrollTop = 0;

    searchIndicatorInput.addEventListener('input', search);

    function search() {
        const searchQuery = this.value;
        filterOptionsBySearch(searchQuery, movingAverages, "movingAverages");
    }

    // Event listeners for filter buttons
    filterButtons.forEach(button => {
        button.removeEventListener('click', filterbyLetter);
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', filterbyLetter);
    });

    function filterbyLetter() {
        const letter = this.getAttribute('data-letter');
        if (letter === '*') {
            resetFilter("movingAverages");
        } else {
            filterOptionsByLetter(letter, movingAverages, "movingAverages");
        }
    }
}


const selectOption = (e, index) => {
    let div = e.target.parentElement;
    let id = Number(div.id);
    let btn = e.target;

    let divOptions = document.getElementsByClassName(div.className);
    // console.log(typeof (divOptions));

    // For changing background colors of all other buttons in the indicator list
    const keys = Object.keys(divOptions);
    const values = Object.values(divOptions);
    const keyValuePairs = keys.map((key, index) => [key, values[index]]);
    keyValuePairs.forEach((item) => {
        const btn = item[1].getElementsByTagName("button")[0];
        btn.style.backgroundColor = "white";
        btn.style.fontWeight = "normal";
    });

    btn.style.backgroundColor = "lightgrey";
    btn.style.fontWeight = "600";

    const backButton = document.getElementById("backButton");

    if (document.body.getBoundingClientRect().width < 768) {
        indiCategories.style.display = "none";
        indiSearchSelect.style.display = "none";
        backButton.style.display = "block";
    } else {
        backButton.style.display = "none";
    }

    selectedIndiSettings.style.display = "flex";
    document.getElementById("indiSettingsContainer").scrollTop = 0;

    const settings = document.getElementById("indiSettingsBox");
    const info = document.getElementById("indiInfoBox");
    const updateDelete = document.getElementById("addUpdateDeleteBox");

    addIndicator(index, indicators);

    settings.innerHTML = `
        <div id="toast-container">
        </div>
        <p style="font-weight: bold;">${indicators[id - 1].name}</p>
        <div style="display: flex; flex-direction: column;">
        <div class="divTableRow" style="display: flex; flex-direction: column;">
        <div class="tableRow">
            <div class="divTableCell align-bottom">Period1</div>
            <div class="divTableCell align-bottom"><input type="text" id="uoPeriod1" size="3" 
            onchange="updateSettings(id, value)" style="border-color: grey; border-width: 1px;"></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Period2</div>
            <div class="divTableCell align-bottom"><input type="text" id="uoPeriod2" size="3"
            onchange="updateSettings(id, value)" style="border-color: grey; border-width: 1px;"></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Period3</div>
            <div class="divTableCell align-bottom"><input type="text" id="uoPeriod3" size="3" value="28"
            onchange="updateSettings(id, value)" style="border-color: grey; border-width: 1px;"></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom"><b>MA On UO</b><span style="color:grey;font-size:8pt;"> (Optional) </span>
            </div>
            <div class="divTableCell align-bottom">
                <select style="width:90px" id="uomaType" onchange="updateSettings(id, value)" >
                    <option value="">None</option>
                    <option value="SMA">SMA</option>
                    <option value="EMA">EMA</option>
                    <option value="WMA">WMA</option>
                    <option value="TRIMA">TriMA</option>
                    <option value="WSMA">WilderMA</option>
                </select>
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom"> MA - Period </div>
            <div class="divTableCell align-bottom"><input type="text" id="uoma" size="3"
                onchange="updateSettings(id, value)" ></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">UO Color</div>
            <div class="divTableCell align-bottom">
                ${colorPickerHtml}
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Overbought</div>
            <div class="divTableCell align-bottom">
                <input type="text" id="uoOB" size="3" value="70" 
                    style="border-color: grey; border-width: 1px;">
            </div>
            <div class="divTableCell align-bottom">
                ${colorPickerHtml}
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Oversold</div>
            <div class="divTableCell align-bottom">
                <input type="text" id="uoOS" size="3" value="30" 
                    style="border-color: grey; border-width: 1px;">
            </div>
            <div class="divTableCell align-bottom"> 
                ${colorPickerHtml}
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">MA Color</div>
            <div class="divTableCell align-bottom">
                ${colorPickerHtml}
            </div>
        </div>
    
    `;
    info.innerHTML = indicators[id - 1].about;
    showToast(`${indicators[id - 1].name} added!`, 1);

    updateDelete.innerHTML = `
    <div id="rmIndicatorBtn" class="rm_indicator_btn" style="float: left">
        <button onclick="removeIndicator(${(activeIndicatorsArr.length - 1)})">Remove <i class="fa-solid fa-trash"></i></button>
    </div>
    <div id="updateIndicatorBtn" class="update_indicator_btn" style="float: right">
        <button onclick="updateIndicator(${(activeIndicatorsArr.length - 1)})">Update</button>
    </div>
     `
}

const selectBottomIndicator = (e, index) => {
    let div = e.target.parentElement;
    let id = Number(div.id);
    let btn = e.target;

    let divOptions = document.getElementsByClassName(div.className);
    // console.log(typeof (divOptions));

    // For changing background colors of all other buttons in the indicator list
    const keys = Object.keys(divOptions);
    const values = Object.values(divOptions);
    const keyValuePairs = keys.map((key, index) => [key, values[index]]);
    keyValuePairs.forEach((item) => {
        const btn = item[1].getElementsByTagName("button")[0];
        btn.style.backgroundColor = "white";
        btn.style.fontWeight = "normal";
    });

    btn.style.backgroundColor = "lightgrey";
    btn.style.fontWeight = "600";

    const backButton = document.getElementById("backButton");

    if (document.body.getBoundingClientRect().width < 768) {
        indiCategories.style.display = "none";
        indiSearchSelect.style.display = "none";
        backButton.style.display = "block";
    } else {
        backButton.style.display = "none";
    }

    selectedIndiSettings.style.display = "flex";
    document.getElementById("indiSettingsContainer").scrollTop = 0;

    const settings = document.getElementById("indiSettingsBox");
    const info = document.getElementById("indiInfoBox");
    const updateDelete = document.getElementById("addUpdateDeleteBox");

    addIndicator(index, bottomIndicators);

    settings.innerHTML = `
        <div id="toast-container">
        </div>
        <p style="font-weight: bold;">${bottomIndicators[id - 1].name}</p>
        <div style="display: flex; flex-direction: column;">
        <div class="divTableRow" style="display: flex; flex-direction: column;">
        <div class="tableRow">
            <div class="divTableCell align-bottom">Period1</div>
            <div class="divTableCell align-bottom"><input type="text" id="uoPeriod1" size="3" 
            onchange="updateSettings(id, value)" style="border-color: grey; border-width: 1px;"></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Period2</div>
            <div class="divTableCell align-bottom"><input type="text" id="uoPeriod2" size="3"
            onchange="updateSettings(id, value)" style="border-color: grey; border-width: 1px;"></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Period3</div>
            <div class="divTableCell align-bottom"><input type="text" id="uoPeriod3" size="3" value="28"
            onchange="updateSettings(id, value)" style="border-color: grey; border-width: 1px;"></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom"><b>MA On UO</b><span style="color:grey;font-size:8pt;"> (Optional) </span>
            </div>
            <div class="divTableCell align-bottom">
                <select style="width:90px" id="uomaType" onchange="updateSettings(id, value)" >
                    <option value="">None</option>
                    <option value="SMA">SMA</option>
                    <option value="EMA">EMA</option>
                    <option value="WMA">WMA</option>
                    <option value="TRIMA">TriMA</option>
                    <option value="WSMA">WilderMA</option>
                </select>
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom"> MA - Period </div>
            <div class="divTableCell align-bottom"><input type="text" id="uoma" size="3"
                onchange="updateSettings(id, value)" ></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">UO Color</div>
            <div class="divTableCell align-bottom">
                ${colorPickerHtml}
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Overbought</div>
            <div class="divTableCell align-bottom">
                <input type="text" id="uoOB" size="3" value="70" 
                    style="border-color: grey; border-width: 1px;">
            </div>
            <div class="divTableCell align-bottom">
                ${colorPickerHtml}
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Oversold</div>
            <div class="divTableCell align-bottom">
                <input type="text" id="uoOS" size="3" value="30" 
                    style="border-color: grey; border-width: 1px;">
            </div>
            <div class="divTableCell align-bottom"> 
                ${colorPickerHtml}
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">MA Color</div>
            <div class="divTableCell align-bottom">
                ${colorPickerHtml}
            </div>
        </div>
    
    `;
    info.innerHTML = bottomIndicators[id - 1].about;
    showToast(`${bottomIndicators[id - 1].name} added!`, 1);

    updateDelete.innerHTML = `
    <div id="rmIndicatorBtn" class="rm_indicator_btn" style="float: left">
        <button onclick="removeIndicator(${(activeIndicatorsArr.length - 1)})">Remove <i class="fa-solid fa-trash"></i></button>
    </div>
    <div id="updateIndicatorBtn" class="update_indicator_btn" style="float: right">
        <button onclick="updateIndicator(${(activeIndicatorsArr.length - 1)})">Update</button>
    </div>
     `
}

const selectOverlayIndicator = (e, index) => {
    let div = e.target.parentElement;
    let id = Number(div.id);
    let btn = e.target;

    let divOptions = document.getElementsByClassName(div.className);
    // console.log(typeof (divOptions));

    // For changing background colors of all other buttons in the indicator list
    const keys = Object.keys(divOptions);
    const values = Object.values(divOptions);
    const keyValuePairs = keys.map((key, index) => [key, values[index]]);
    keyValuePairs.forEach((item) => {
        const btn = item[1].getElementsByTagName("button")[0];
        btn.style.backgroundColor = "white";
        btn.style.fontWeight = "normal";
    });

    btn.style.backgroundColor = "lightgrey";
    btn.style.fontWeight = "600";

    const backButton = document.getElementById("backButton");

    if (document.body.getBoundingClientRect().width < 768) {
        indiCategories.style.display = "none";
        indiSearchSelect.style.display = "none";
        backButton.style.display = "block";
    } else {
        backButton.style.display = "none";
    }

    selectedIndiSettings.style.display = "flex";
    document.getElementById("indiSettingsContainer").scrollTop = 0;

    const settings = document.getElementById("indiSettingsBox");
    const info = document.getElementById("indiInfoBox");
    const updateDelete = document.getElementById("addUpdateDeleteBox");

    addIndicator(index, overlayIndicators);

    settings.innerHTML = `
        <div id="toast-container">
        </div>
        <p style="font-weight: bold;">${overlayIndicators[id - 1].name}</p>
        <div style="display: flex; flex-direction: column;">
        <div class="divTableRow" style="display: flex; flex-direction: column;">
        <div class="tableRow">
            <div class="divTableCell align-bottom">Period1</div>
            <div class="divTableCell align-bottom"><input type="text" id="uoPeriod1" size="3" 
            onchange="updateSettings(id, value)" style="border-color: grey; border-width: 1px;"></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Period2</div>
            <div class="divTableCell align-bottom"><input type="text" id="uoPeriod2" size="3"
            onchange="updateSettings(id, value)" style="border-color: grey; border-width: 1px;"></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Period3</div>
            <div class="divTableCell align-bottom"><input type="text" id="uoPeriod3" size="3" value="28"
            onchange="updateSettings(id, value)" style="border-color: grey; border-width: 1px;"></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom"><b>MA On UO</b><span style="color:grey;font-size:8pt;"> (Optional) </span>
            </div>
            <div class="divTableCell align-bottom">
                <select style="width:90px" id="uomaType" onchange="updateSettings(id, value)" >
                    <option value="">None</option>
                    <option value="SMA">SMA</option>
                    <option value="EMA">EMA</option>
                    <option value="WMA">WMA</option>
                    <option value="TRIMA">TriMA</option>
                    <option value="WSMA">WilderMA</option>
                </select>
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom"> MA - Period </div>
            <div class="divTableCell align-bottom"><input type="text" id="uoma" size="3"
                onchange="updateSettings(id, value)" ></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">UO Color</div>
            <div class="divTableCell align-bottom">
                ${colorPickerHtml}
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Overbought</div>
            <div class="divTableCell align-bottom">
                <input type="text" id="uoOB" size="3" value="70" 
                    style="border-color: grey; border-width: 1px;">
            </div>
            <div class="divTableCell align-bottom">
                ${colorPickerHtml}
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Oversold</div>
            <div class="divTableCell align-bottom">
                <input type="text" id="uoOS" size="3" value="30" 
                    style="border-color: grey; border-width: 1px;">
            </div>
            <div class="divTableCell align-bottom"> 
                ${colorPickerHtml}
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">MA Color</div>
            <div class="divTableCell align-bottom">
                ${colorPickerHtml}
            </div>
        </div>
    
    `;
    info.innerHTML = overlayIndicators[id - 1].about;
    showToast(`${overlayIndicators[id - 1].name} added!`, 1);

    updateDelete.innerHTML = `
    <div id="rmIndicatorBtn" class="rm_indicator_btn" style="float: left">
        <button onclick="removeIndicator(${(activeIndicatorsArr.length - 1)})">Remove <i class="fa-solid fa-trash"></i></button>
    </div>
    <div id="updateIndicatorBtn" class="update_indicator_btn" style="float: right">
        <button onclick="updateIndicator(${(activeIndicatorsArr.length - 1)})">Update</button>
    </div>
     `
}

const selectFundaIndicator = (e, index) => {
    let div = e.target.parentElement;
    let id = Number(div.id);
    let btn = e.target;

    let divOptions = document.getElementsByClassName(div.className);
    // console.log(typeof (divOptions));

    // For changing background colors of all other buttons in the indicator list
    const keys = Object.keys(divOptions);
    const values = Object.values(divOptions);
    const keyValuePairs = keys.map((key, index) => [key, values[index]]);
    keyValuePairs.forEach((item) => {
        const btn = item[1].getElementsByTagName("button")[0];
        btn.style.backgroundColor = "white";
        btn.style.fontWeight = "normal";
    });

    btn.style.backgroundColor = "lightgrey";
    btn.style.fontWeight = "600";

    const backButton = document.getElementById("backButton");

    if (document.body.getBoundingClientRect().width < 768) {
        indiCategories.style.display = "none";
        indiSearchSelect.style.display = "none";
        backButton.style.display = "block";
    } else {
        backButton.style.display = "none";
    }

    selectedIndiSettings.style.display = "flex";
    document.getElementById("indiSettingsContainer").scrollTop = 0;

    const settings = document.getElementById("indiSettingsBox");
    const info = document.getElementById("indiInfoBox");
    const updateDelete = document.getElementById("addUpdateDeleteBox");

    addIndicator(index, fundaIndicators);

    settings.innerHTML = `
        <div id="toast-container">
        </div>
        <p style="font-weight: bold;">${fundaIndicators[id - 1].name}</p>
        <div style="display: flex; flex-direction: column;">
        <div class="divTableRow" style="display: flex; flex-direction: column;">
        <div class="tableRow">
            <div class="divTableCell align-bottom">Period1</div>
            <div class="divTableCell align-bottom"><input type="text" id="uoPeriod1" size="3" 
            onchange="updateSettings(id, value)" style="border-color: grey; border-width: 1px;"></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Period2</div>
            <div class="divTableCell align-bottom"><input type="text" id="uoPeriod2" size="3"
            onchange="updateSettings(id, value)" style="border-color: grey; border-width: 1px;"></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Period3</div>
            <div class="divTableCell align-bottom"><input type="text" id="uoPeriod3" size="3" value="28"
            onchange="updateSettings(id, value)" style="border-color: grey; border-width: 1px;"></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom"><b>MA On UO</b><span style="color:grey;font-size:8pt;"> (Optional) </span>
            </div>
            <div class="divTableCell align-bottom">
                <select style="width:90px" id="uomaType" onchange="updateSettings(id, value)" >
                    <option value="">None</option>
                    <option value="SMA">SMA</option>
                    <option value="EMA">EMA</option>
                    <option value="WMA">WMA</option>
                    <option value="TRIMA">TriMA</option>
                    <option value="WSMA">WilderMA</option>
                </select>
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom"> MA - Period </div>
            <div class="divTableCell align-bottom"><input type="text" id="uoma" size="3"
                onchange="updateSettings(id, value)" ></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">UO Color</div>
            <div class="divTableCell align-bottom">
                ${colorPickerHtml}
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Overbought</div>
            <div class="divTableCell align-bottom">
                <input type="text" id="uoOB" size="3" value="70" 
                    style="border-color: grey; border-width: 1px;">
            </div>
            <div class="divTableCell align-bottom">
                ${colorPickerHtml}
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Oversold</div>
            <div class="divTableCell align-bottom">
                <input type="text" id="uoOS" size="3" value="30" 
                    style="border-color: grey; border-width: 1px;">
            </div>
            <div class="divTableCell align-bottom"> 
                ${colorPickerHtml}
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">MA Color</div>
            <div class="divTableCell align-bottom">
                ${colorPickerHtml}
            </div>
        </div>
    
    `;
    info.innerHTML = fundaIndicators[id - 1].about;
    showToast(`${fundaIndicators[id - 1].name} added!`, 1);

    updateDelete.innerHTML = `
    <div id="rmIndicatorBtn" class="rm_indicator_btn" style="float: left">
        <button onclick="removeIndicator(${(activeIndicatorsArr.length - 1)})">Remove <i class="fa-solid fa-trash"></i></button>
    </div>
    <div id="updateIndicatorBtn" class="update_indicator_btn" style="float: right">
        <button onclick="updateIndicator(${(activeIndicatorsArr.length - 1)})">Update</button>
    </div>
     `
}

const selectMovingAverage = (e, index) => {
    let div = e.target.parentElement;
    let id = Number(div.id);
    let btn = e.target;

    let divOptions = document.getElementsByClassName(div.className);
    // console.log(typeof (divOptions));

    // For changing background colors of all other buttons in the indicator list
    const keys = Object.keys(divOptions);
    const values = Object.values(divOptions);
    const keyValuePairs = keys.map((key, index) => [key, values[index]]);
    keyValuePairs.forEach((item) => {
        const btn = item[1].getElementsByTagName("button")[0];
        btn.style.backgroundColor = "white";
        btn.style.fontWeight = "normal";
    });

    btn.style.backgroundColor = "lightgrey";
    btn.style.fontWeight = "600";

    const backButton = document.getElementById("backButton");

    if (document.body.getBoundingClientRect().width < 768) {
        indiCategories.style.display = "none";
        indiSearchSelect.style.display = "none";
        backButton.style.display = "block";
    } else {
        backButton.style.display = "none";
    }

    selectedIndiSettings.style.display = "flex";
    document.getElementById("indiSettingsContainer").scrollTop = 0;

    const settings = document.getElementById("indiSettingsBox");
    const info = document.getElementById("indiInfoBox");
    const updateDelete = document.getElementById("addUpdateDeleteBox");

    addIndicator(index, movingAverages);

    settings.innerHTML = `
        <div id="toast-container">
        </div>
        <p style="font-weight: bold;">${movingAverages[id - 1].name}</p>
        <div style="display: flex; flex-direction: column;">
        <div class="divTableRow" style="display: flex; flex-direction: column;">
        <div class="tableRow">
            <div class="divTableCell align-bottom">Period1</div>
            <div class="divTableCell align-bottom"><input type="text" id="uoPeriod1" size="3" 
            onchange="updateSettings(id, value)" style="border-color: grey; border-width: 1px;"></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Period2</div>
            <div class="divTableCell align-bottom"><input type="text" id="uoPeriod2" size="3"
            onchange="updateSettings(id, value)" style="border-color: grey; border-width: 1px;"></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Period3</div>
            <div class="divTableCell align-bottom"><input type="text" id="uoPeriod3" size="3" value="28"
            onchange="updateSettings(id, value)" style="border-color: grey; border-width: 1px;"></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom"><b>MA On UO</b><span style="color:grey;font-size:8pt;"> (Optional) </span>
            </div>
            <div class="divTableCell align-bottom">
                <select style="width:90px" id="uomaType" onchange="updateSettings(id, value)" >
                    <option value="">None</option>
                    <option value="SMA">SMA</option>
                    <option value="EMA">EMA</option>
                    <option value="WMA">WMA</option>
                    <option value="TRIMA">TriMA</option>
                    <option value="WSMA">WilderMA</option>
                </select>
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom"> MA - Period </div>
            <div class="divTableCell align-bottom"><input type="text" id="uoma" size="3"
                onchange="updateSettings(id, value)" ></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">UO Color</div>
            <div class="divTableCell align-bottom">
                ${colorPickerHtml}
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Overbought</div>
            <div class="divTableCell align-bottom">
                <input type="text" id="uoOB" size="3" value="70" 
                    style="border-color: grey; border-width: 1px;">
            </div>
            <div class="divTableCell align-bottom">
                ${colorPickerHtml}
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Oversold</div>
            <div class="divTableCell align-bottom">
                <input type="text" id="uoOS" size="3" value="30" 
                    style="border-color: grey; border-width: 1px;">
            </div>
            <div class="divTableCell align-bottom"> 
                ${colorPickerHtml}
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">MA Color</div>
            <div class="divTableCell align-bottom">
                ${colorPickerHtml}
            </div>
        </div>
    
    `;
    info.innerHTML = movingAverages[id - 1].about;
    showToast(`${movingAverages[id - 1].name} added!`, 1);

    updateDelete.innerHTML = `
    <div id="rmIndicatorBtn" class="rm_indicator_btn" style="float: left">
        <button onclick="removeIndicator(${(activeIndicatorsArr.length - 1)})">Remove <i class="fa-solid fa-trash"></i></button>
    </div>
    <div id="updateIndicatorBtn" class="update_indicator_btn" style="float: right">
        <button onclick="updateIndicator(${(activeIndicatorsArr.length - 1)})">Update</button>
    </div>
     `
}



function showColorPicker(ele) {
    const colorPicker = ele.nextElementSibling;
    const parentDiv = ele.closest(".tableRow");
    colorPicker.style.display = colorPicker.style.display === "none" ? "block" : "none";

    if (document.body.getBoundingClientRect().width < 768) {
        // console.log(colorPicker.children);
        colorPicker.children[0].style.display = "flex"; // to show mobile color picker
        colorPicker.children[1].style.display = "none";
        colorPicker.style.top = (ele.offsetTop - 200) + "px";
    } else {
        colorPicker.children[0].style.display = "none";
        colorPicker.children[1].style.display = "flex"; // to show desktop color picker
        colorPicker.style.top = (ele.offsetTop - 180) + "px"; // to show desktop color picker
    }

    function clickHandler(e) {
        if (!colorPicker.contains(e.target) && !ele.contains(e.target)) {
            colorPicker.style.display = "none";
        }

        document.body.removeEventListener("mousedown", clickHandler);
    }

    function scrollHandler(e) {
        if (!colorPicker.contains(e.target)) {
            colorPicker.style.display = "none";
            window.removeEventListener("wheel", scrollHandler);
        }
    }

    document.body.addEventListener("mousedown", clickHandler); // for closing colorPicker when clicking outside it
    window.addEventListener("wheel", scrollHandler); // for closing colorPicker when clicking outside it
}

function showToast(message, indiAdded) {
    const toastContainer = document.getElementById('toast-container');

    toastContainer.innerHTML = "";

    // Create the toast element
    const toast = document.createElement('div');
    toast.className = 'toastNotification';

    document.getElementById("indiSettingsContainer").scrollTop = 0;
    toast.innerHTML = `
            <div style="display: flex; flex-direction: row; justify-content: space-between">
                <span>${message}</span>
                <button class="close-btn" onclick="closeToast(this)">
                    <i class="fa-solid fa-xmark" aria-hidden="true" style="height: 8px; width: 8px; margin-top: 8px;"></i>
                </button>
            </div>
        `;

    // Append the toast to the container
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toastContainer.innerHTML = "";
    }, 4000);
}

function closeToast(button) {
    const toast = button.parentElement;
    const toastParent = toast.parentNode;
    // Removing toastNotification div
    if (toastParent) {
        toastParent.parentNode.removeChild(toastParent);
    }
}

// index - passing array index (in activeIndicatorsArr) of the selected option
const selectActiveOption = (e, index) => {
    let div = e.target.parentElement;
    let id = Number(div.id);
    let btn = e.target;

    let divOptions = document.getElementsByClassName(div.className);
    // console.log(typeof (divOptions));

    // For changing background colors of all other buttons in activ indicator list
    const keys = Object.keys(divOptions);
    const values = Object.values(divOptions);
    const keyValuePairs = keys.map((key, index) => [key, values[index]]);
    keyValuePairs.forEach((item) => {
        const btn = item[1].getElementsByTagName("button")[0];
        btn.style.backgroundColor = "white";
        btn.style.fontWeight = "normal";
    });

    btn.style.backgroundColor = "lightgrey";
    btn.style.fontWeight = "600";

    const backButton = document.getElementById("backButton");
    // addIndicator(id);
    if (document.body.getBoundingClientRect().width < 768) {
        indiCategories.style.display = "none";
        indiSearchSelect.style.display = "none";
        backButton.style.display = "block";
    } else {
        backButton.style.display = "none";
    }
    selectedIndiSettings.style.display = "flex";
    document.getElementById("indiSettingsContainer").scrollTop = 0;

    const settings = document.getElementById("indiSettingsBox");
    const info = document.getElementById("indiInfoBox");
    const updateDelete = document.getElementById("addUpdateDeleteBox");

    settings.innerHTML = `
        <div id="toast-container">
        </div>
        <p style="font-weight: bold;">${indicators[id - 1].name}</p>
        <div style="display: flex; flex-direction: column;">
        <div class="divTableRow" style="display: flex; flex-direction: column;">
        <div class="tableRow">
            <div class="divTableCell align-bottom">Period1</div>
            <div class="divTableCell align-bottom"><input type="text" id="uoPeriod1" size="3" value="7"
                 style="border-color: grey; border-width: 1px;"></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Period2</div>
            <div class="divTableCell align-bottom"><input type="text" id="uoPeriod2" size="3" value="14"
                 style="border-color: grey; border-width: 1px;"></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Period3</div>
            <div class="divTableCell align-bottom"><input type="text" id="uoPeriod3" size="3" value="28"
                 style="border-color: grey; border-width: 1px;"></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom"><b>MA On UO</b><span style="color:grey;font-size:8pt;"> (Optional) </span>
            </div>
            <div class="divTableCell align-bottom">
                <select style="width:90px" id="uomaType" onchange="JavaScript:myTsrChartSettings.uoc('uo','Uo');">
                    <option value="">None</option>
                    <option value="SMA">SMA</option>
                    <option value="EMA">EMA</option>
                    <option value="WMA">WMA</option>
                    <option value="TRIMA">TriMA</option>
                    <option value="WSMA">WilderMA</option>
                </select>
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom"> MA - Period </div>
            <div class="divTableCell align-bottom"><input type="text" id="uoma" size="3"
                onchange="JavaScript:myTsrChartSettings.uoc('uo','Uo');"></div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">UO Color</div>
            <div class="divTableCell align-bottom">
                ${colorPickerHtml}
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Overbought</div>
            <div class="divTableCell align-bottom">
                <input type="text" id="uoOB" size="3" value="70" 
                    style="border-color: grey; border-width: 1px;">
            </div>
            <div class="divTableCell align-bottom">
                ${colorPickerHtml}
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">Oversold</div>
            <div class="divTableCell align-bottom">
                <input type="text" id="uoOS" size="3" value="30" 
                    style="border-color: grey; border-width: 1px;">
            </div>
            <div class="divTableCell align-bottom"> 
                ${colorPickerHtml}
            </div>
        </div>
        <div class="tableRow">
            <div class="divTableCell align-bottom">MA Color</div>
            <div class="divTableCell align-bottom">
                ${colorPickerHtml}
            </div>
        </div>
    `;
    info.innerHTML = indicators[id - 1].about;

    updateDelete.innerHTML = `
    <div id="rmIndicatorBtn" class="rm_indicator_btn" style="float: left">
        <button onclick="removeIndicator(${index})">Remove <i class="fa-solid fa-trash"></i></button>
    </div>
    <div id="updateIndicatorBtn" class="update_indicator_btn" style="float: right">
        <button onclick="updateIndicator(${index})">Update</button>
    </div>
     `

    // * Check
    // * addIndicatorDiv.addEventListener("click", addIndicator(id));
}

// Filter options based on the search input
function filterOptionsBySearch(query, list, listName) {
    // If indicator is to be searched id it starts with entered input, use startsWith(query.toLowerCase())
    const filteredOptions = list.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    selectElement.innerHTML = ''; // Clear previous options
    filteredOptions.forEach((item, index) => {
        const div = document.createElement("div");
        div.setAttribute("data-index", index);
        div.setAttribute("style", "display: flex; flex-direction: row; justify-content: space-between");
        div.id = item.id;
        div.className = "divOptions";
        if (listName.localeCompare("bottomIndicators") == 0) {
            div.innerHTML = `
            <button class="indiOptions" onclick="selectBottomIndicator(event, ${index});" style="background-color: white;">${item.name}</button>
            `;
        } else if (listName.localeCompare("overlayIndicators") == 0) {
            div.innerHTML = `
            <button class="indiOptions" onclick="selectOverlayIndicator(event, ${index});" style="background-color: white;">${item.name}</button>
            `;
        } else if (listName.localeCompare("fundaIndicators") == 0) {
            div.innerHTML = `
            <button class="indiOptions" onclick="selectFundaIndicator(event, ${index});" style="background-color: white;">${item.name}</button>
            `;
        } else if (listName.localeCompare("movingAverages") == 0) {
            div.innerHTML = `
            <button class="indiOptions" onclick="selectMovingAverage(event, ${index});" style="background-color: white;">${item.name}</button>
            `;
        } else {
            div.innerHTML = `
            <button class="indiOptions" onclick="selectOption(event, ${index});" style="background-color: white;">${item.name}</button>
            `;
        }

        selectElement.appendChild(div);
    });
}

// Filter function for the alphabet
function filterOptionsByLetter(letter, list, listName) {
    const filteredOptions = list.filter(item => item.name.startsWith(letter));
    selectElement.innerHTML = ''; // Clear previous options
    filteredOptions.forEach((item, index) => {
        const div = document.createElement("div");
        div.setAttribute("data-index", index);
        div.setAttribute("style", "display: flex; flex-direction: row; justify-content: space-between");
        div.id = item.id;
        div.className = "divOptions";
        if (listName.localeCompare("bottomIndicators") == 0) {
            div.innerHTML = `
            <button class="indiOptions" onclick="selectBottomIndicator(event, ${index});" style="background-color: white;">${item.name}</button>
            `;
        } else if (listName.localeCompare("overlayIndicators") == 0) {
            div.innerHTML = `
            <button class="indiOptions" onclick="selectOverlayIndicator(event, ${index});" style="background-color: white;">${item.name}</button>
            `;
        } else if (listName.localeCompare("fundaIndicators") == 0) {
            div.innerHTML = `
            <button class="indiOptions" onclick="selectFundaIndicator(event, ${index});" style="background-color: white;">${item.name}</button>
            `;
        } else if (listName.localeCompare("movingAverages") == 0) {
            div.innerHTML = `
            <button class="indiOptions" onclick="selectMovingAverage(event, ${index});" style="background-color: white;">${item.name}</button>
            `;
        } else {
            div.innerHTML = `
            <button class="indiOptions" onclick="selectOption(event, ${index});" style="background-color: white;">${item.name}</button>
            `;
        }
        selectElement.appendChild(div);
    });
}

// Reset the filter (show all options)
function resetFilter(listName) {
    listName = listName.toLowerCase();
    if (listName.localeCompare("bottomindicators") == 0)
        showBottomIndicators();
    else if (listName.localeCompare("overlayindicators") == 0)
        showOverlayIndicators();
    else if (listName.localeCompare("movingaverages") == 0)
        showMovingAverages();
    else
        populateSelectOptions();
}



const showIndiList = function showIndiPopup() {
    selectedIndiSettings.style.display = 'none';
    document.getElementById("indiSearchSelect").style.display = "flex";
    document.getElementById("indicatorCategories").style.display = "flex";
}

const closePopup = function closePopup() {
    searchSelectIndicator.style.display = 'none';
    document.getElementById("indiSearchSelect").style.display = "flex";
    document.getElementById("indicatorCategories").style.display = "flex";
}

// ? Used for closing Indi popup settings only
// const closeIndiPopup = function closeIndiPopup() {
//     selectedIndiSettings.style.display = 'none';
//     document.getElementById("indiSearchSelect").style.display = "flex";
//     document.getElementById("indicatorCategories").style.display = "flex";
// }

const addIndicator = function addIndicator(id, list) {
    activeIndicatorsArr.push(list[id]);
    // console.log("Adding Indicator:", activeIndicatorsArr);
    // selectedIndiSettings.style.display = 'none';
    document.getElementById("selectedIndicatorsCount").innerHTML = `<i class="fa-solid fa-circle-check"></i>&nbsp;Active (${activeIndicatorsArr.length})`;

    if (document.body.getBoundingClientRect().width >= 768) {
        document.getElementById("indiSearchSelect").style.display = "flex";
        document.getElementById("indicatorCategories").style.display = "flex";
    }
}

// passing index of array element to remove
const removeIndicator = function removeIndicator(index) {
    activeIndicatorsArr.splice(index, 1);
    selectedIndiSettings.style.display = 'none';
    document.getElementById("selectedIndicatorsCount").innerHTML = `<i class="fa-solid fa-circle-check"></i>&nbsp;Active (${activeIndicatorsArr.length})`;
    showActiveIndicators();

    document.getElementById("indiSearchSelect").style.display = "flex";
    document.getElementById("indicatorCategories").style.display = "flex";
}
// passing index of array element to be updated
const updateIndicator = function updateIndicator(index) {
    showToast(`${activeIndicatorsArr[index].name} updated!`, 0);
    console.log("settings updated for array element having index : ", index);

    // selectedIndiSettings.style.display = 'none';
    // document.getElementById("indiSearchSelect").style.display = "flex";
    // document.getElementById("indicatorCategories").style.display = "flex";
}

const activeIndicatorsList = document.getElementById('indicatorListDivs');
const activeIndicatorsDivList = document.getElementById('activeIndicatorListDivs');

function showActiveIndicators() {
    activeIndicatorsDivList.innerHTML = "";
    activeIndicatorsDivList.style.display = "flex";
    selectElement.style.display = "none";

    document.getElementById("searchIndicator").style.display = 'none';
    document.getElementById("indicatorFilter").style.display = "none";
    document.getElementById('selectedIndiSettings').style.display = 'none';

    // If Active Indicators exist
    if (activeIndicatorsArr.length != 0) {
        activeIndicatorsArr.forEach((item, index) => {
            const div = document.createElement("div");
            div.setAttribute("data-index", index);
            div.setAttribute("style", "display: flex; flex-direction: row; justify-content: space-between");
            div.id = item.id;
            div.className = "divOptions";
            // here
            let indicatorSettings = '';
            console.log(Object.keys(item.settings));
            Object.keys(item.settings).forEach((setting, index) => {
                if (index != 0)
                    indicatorSettings += ",";
                indicatorSettings += item.settings[setting];
            });
            div.innerHTML = `
            <button class="indiOptions" onclick="selectActiveOption(event, ${index});" style="background-color: white;">${item.name} (${indicatorSettings})</button>
            <button onclick="removeIndicator(${index})" style="color: red; border: none; background-color: white; margin-bottom: 0px">
                <i class="fa-solid fa-xmark"></i>
            </button>
            `;
            activeIndicatorsDivList.appendChild(div);
        });

    }
    // If no active indicator exists
    else {
        document.getElementById("noActiIndi").style.display = 'block';
        document.getElementById("noActiIndi").innerHTML = "No Active indicators";

    }

    activeIndicatorsDivList.scrollTop = 0;
}


// {passive: false} option used so that mouse events are kept from being sent to the listener, by using e.preventDefault(). Need to set option as false since its value is true in chrome by default 
// searchSelectIndicator.addEventListener("touchstart", indiPopupTouchStartHandler, {passive: false});
searchSelectIndicator.addEventListener("mousedown", (e) => {
    if (!document.getElementById("indiSettingsContainer").contains(e.target) && !searchIndicatorInput.contains(e.target) && !indiCategories.contains(e.target))
        indiPopupMouseDownHandler(e);
});

// function indiPopupTouchStartHandler(e) {
//     e.preventDefault();
//     let initialX = e.touches[0].clientX;
//     let initialY = e.touches[0].clientY;

//     searchSelectIndicator.addEventListener("touchmove", indiPopupTouchMoveHandler);
//     searchSelectIndicator.addEventListener("touchend", indiPopupTouchEndHandler);

//     function indiPopupTouchMoveHandler(e) {

//         let currentX = e.touches[0].clientX;
//         let currentY = e.touches[0].clientY;

//         // dx denotes change in x (horizontal position) and dy denotes change in y (vertical position) 
//         let dx = currentX - initialX; // dx > 0 when div is dragged to the right, else dx < 0 
//         let dy = currentY - initialY; // dy > 0 when div is dragged down, else dy < 0

//         moveDiv(dx, dy, searchSelectIndicator);

//         initialX = currentX;
//         initialY = currentY;
//     }

//     function moveDiv(dx, dy, ele) {
//         ele.style.top = (ele.offsetTop + dy) + "px";
//         ele.style.left = (ele.offsetLeft + dx) + "px";
//     }

//     function indiPopupTouchEndHandler(e) {
//         // for changing mouse pointer to auto after moving the div has finished

//         searchSelectIndicator.removeEventListener("touchmove", indiPopupTouchMoveHandler);
//         searchSelectIndicator.removeEventListener("touchend", indiPopupTouchEndHandler);
//     }
// }

function indiPopupMouseDownHandler(e) {
    e.preventDefault();
    // storing cordinates of mouseclick
    let initialX = e.clientX;
    let initialY = e.clientY;

    function indiPopupMouseMoveHandler(e) {

        // for changing mouse pointer to move while moving div
        if (window.getComputedStyle(e.target).cursor === "auto") {
            e.target.style.cursor = "grab";
        }

        // storing cordinates of mousemove
        let currentX = e.clientX;
        let currentY = e.clientY;

        // dx denotes change in x (horizontal position) and dy denotes change in y (vertical position) 
        let dx = currentX - initialX; // dx > 0 when div is dragged to the right, else dx < 0
        let dy = currentY - initialY; // dy > 0 when div is dragged down, else dy < 0

        moveDiv(dx, dy, searchSelectIndicator);

        initialX = currentX;
        initialY = currentY;
    }

    function indiPopupMouseUpHandler(e) {
        // for changing mouse pointer to auto after moving the div has finished
        if (window.getComputedStyle(e.target).cursor === "grab") {
            e.target.style.cursor = "pointer";
        }

        document.body.removeEventListener("mousemove", indiPopupMouseMoveHandler);
        document.body.removeEventListener("mouseup", indiPopupMouseUpHandler);
    }

    function moveDiv(dx, dy, ele) {
        ele.style.top = (ele.offsetTop + dy) + "px";
        ele.style.left = (ele.offsetLeft + dx) + "px";
    }

    document.body.addEventListener("mousemove", indiPopupMouseMoveHandler);
    document.body.addEventListener("mouseup", indiPopupMouseUpHandler);


}