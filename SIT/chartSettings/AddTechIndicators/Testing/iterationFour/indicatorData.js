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


const fundaFields = [{
        "Balance Sheet": [{
                name: "Book Value / Share"
            },
            {
                name: "Total Permanent Equity"
            },
            {
                name: "Long Term Debt"
            },
            {
                name: "Deferred Long term Debt"
            },
            {
                name: "Property Plant Equipment"
            },
            {
                name: "Inventory"
            },
            {
                name: "Non Current Assets"
            },
            {
                name: "Long term Investment"
            },
            {
                name: "Common Stock"
            },
            {
                name: "Reserve"
            },
            {
                name: "Minority Interest"
            },
            {
                name: "Other Current Liabilities"
            },
            {
                name: "Goodwill"
            },
            {
                name: "Cash"
            },
            {
                name: "Other Assets"
            },
            {
                name: "Short Long Term Debt"
            },
            {
                name: "Stock Holder Fund"
            },
            {
                name: "Retained Earning"
            },
            {
                name: "Current Liabilities"
            },
            {
                name: "Other Liabilities"
            },
            {
                name: "Net Tangible Assets"
            },
            {
                name: "Other Current Assets"
            },
            {
                name: "Total Assets"
            },
            {
                name: "Working Capital"
            },
            {
                name: "Other Stock Holder Equity"
            },
            {
                name: "Non Current Liabilities"
            },
            {
                name: "Accounts Payable"
            },
            {
                name: "Total Liabilities"
            },
            {
                name: "Intangible Assets"
            },
            {
                name: "Current Assets"
            },
            {
                name: "Short term Investment"
            },
            {
                name: "Net Receivable"
            }
        ]
    }, {
        "Cash Flow": [{
                name: "Cash EPS"
            },
            {
                name: "Cash From Operating Activities"
            },
            {
                name: "Inventory"
            },
            {
                name: "Other Cash from Investing Activities"
            },
            {
                name: "Sale Purchase of Stocks"
            },
            {
                name: "Net Cash Flow"
            },
            {
                name: "Investments"
            },
            {
                name: "Net Income"
            },
            {
                name: "Cash From Investment Activities"
            },
            {
                name: "Dividend Paid"
            },
            {
                name: "Other Cash From Fin Activities"
            },
            {
                name: "Change In Liabilities"
            },
            {
                name: "Depreciation"
            },
            {
                name: "Net Borrowings"
            },
            {
                name: "Change to Inventory"
            },
            {
                name: "Change to Net Income"
            },
            {
                name: "Profit Before Tax"
            },
            {
                name: "Account Receivable"
            },
            {
                name: "Cash from Financial Activities"
            },
            {
                name: "Change to Account Receivable"
            },
            {
                name: "Capital Expenditure"
            }
        ]

    }, {
        "Income Statement": [{
                name: "Cost Of Revenue"
            },
            {
                name: "Other Operating Expense"
            },
            {
                name: "Depreciation Expense"
            },
            {
                name: "Income/Profit Before Tax"
            },
            {
                name: "EPS (Earning Per Share)"
            },
            {
                name: "Total Revenue/Income"
            },
            {
                name: "Operating Income/Profit"
            },
            {
                name: "Total Other Income Expense Net"
            },
            {
                name: "Income Tax Expense"
            },
            {
                name: "Total Dividend"
            },
            {
                name: "Gross Profit"
            },
            {
                name: "Interest Expense"
            },
            {
                name: "Net Income"
            },
            {
                name: "DEBIT"
            },
            {
                name: "Total Operating Expense"
            },
            {
                name: "Net Income From Continuing Operation"
            },
            {
                name: "Net Income Applicable to Common Share"
            },
            {
                name: "EBITDA"
            }
        ]
    },
    {
        "Quarterly Income": [{
                name: "Qtr Cost Of Revenue"
            },
            {
                name: "Qtr Other Operating Expense"
            },
            {
                name: "Qtr Depreciation Expense"
            },
            {
                name: "Qtr Income / Profit Before Tax"
            },
            {
                name: "Qtr EPS(Earning Per Share)"
            },
            {
                name: "Qtr Total Revenue / Income"
            },
            {
                name: "Qtr Operating Income / Profit"
            },
            {
                name: "Qtr Total Other Income Expense Net"
            },
            {
                name: "Qtr Income Tax Expense"
            },
            {
                name: "Qtr Total Dividend"
            },
            {
                name: "Qtr Gross Profit Qtr Total Operating Expense"
            },
            {
                name: "Qtr Interest Expense Qtr Net Income From Continuing Operation"
            },
            {
                name: "Qtr Net Income"
            },
            {
                name: "Qtr EBIT"
            },
            {
                name: "Qtr Net Income Applicable to Common Share"
            },
            {
                name: "Qtr EBITDA"
            }
        ]

    }
];