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
        id: 1,
        name: "ADI",
        about: "Accumulation/Distribution Index is a volume-based indicator that assesses the strength of price moves by measuring the volume flows."
    },
    {
        id: 2,
        name: "ADX",
        about: "Average Directional Index is used to measure the strength of a trend, with higher values indicating stronger trends."
    },
    {
        id: 3,
        name: "Aroon",
        about: "Aroon indicator identifies the beginning of a new trend and helps assess whether the trend is rising or falling."
    },
    {
        id: 4,
        name: "AroonOsc",
        about: "Aroon Oscillator calculates the difference between the Aroon Up and Aroon Down indicators to gauge the strength of a trend."
    },
    {
        id: 5,
        name: "ATR",
        about: "Average True Range is a volatility indicator that measures the degree of price movement in an asset."
    },
    {
        id: 6,
        name: "ATR Band",
        about: "ATR Bands plot volatility bands above and below a moving average, based on the Average True Range."
    },
    {
        id: 7,
        name: "Awe Osc",
        about: "Awesome Oscillator is a momentum indicator used to determine market momentum by comparing current and historic averages."
    },
    {
        id: 8,
        name: "Bollinger",
        about: "Bollinger Bands are volatility bands placed around a moving average, expanding and contracting based on market volatility."
    },
    {
        id: 9,
        name: "BOP",
        about: "Balance of Power is a momentum indicator that measures buying and selling pressure."
    },
    {
        id: 10,
        name: "CMF",
        about: "Chaikin Money Flow is a volume-weighted average of accumulation and distribution over a specified period."
    },
    {
        id: 11,
        name: "CCI",
        about: "Commodity Channel Index measures the difference between the current price and its historical average, identifying overbought/oversold levels."
    },
    {
        id: 12,
        name: "Chandelier",
        about: "Chandelier Exit is a trend-following indicator that sets a trailing stop-loss based on the highest high during a trend."
    },
    {
        id: 13,
        name: "Choppiness",
        about: "Choppiness Index is a volatility indicator designed to measure whether the market is choppy (trading sideways) or trending."
    },
    {
        id: 14,
        name: "Coppock",
        about: "Coppock Curve is a long-term momentum indicator used primarily to identify major market bottoms."
    },
    {
        id: 15,
        name: "CMO",
        about: "Chande Momentum Oscillator is a momentum indicator that calculates the relative strength of price movements."
    },
    {
        id: 16,
        name: "DPO",
        about: "Detrended Price Oscillator removes the trend from price to identify cycles, often used to isolate short-term price movement."
    },
    {
        id: 17,
        name: "Donchian",
        about: "Donchian Channels plot the highest high and lowest low over a specified period to identify breakout potential."
    },
    {
        id: 18,
        name: "ElderRay",
        about: "Elder-Ray Index uses bull and bear power to assess the strength of bulls and bears in the market."
    },
    {
        id: 19,
        name: "EFI",
        about: "Elder's Force Index is an indicator that uses price and volume to assess the power behind a move in a stock."
    },
    {
        id: 20,
        name: "EOM",
        about: "Ease of Movement combines price and volume to evaluate the relationship between price change and volume."
    },
    {
        id: 21,
        name: "HL Bands",
        about: "High-Low Bands create a volatility band by adding and subtracting a moving average of the high-low range to the price."
    },
    {
        id: 22,
        name: "HL MA Bands",
        about: "High-Low Moving Average Bands use moving averages of high and low prices to assess volatility."
    },
    {
        id: 23,
        name: "Ichimoku",
        about: "Ichimoku Cloud is a trend-following indicator that defines support and resistance, trend direction, and momentum."
    },
    {
        id: 24,
        name: "Keltner",
        about: "Keltner Channels are volatility-based bands set above and below an exponential moving average, useful for identifying reversals."
    },
    {
        id: 25,
        name: "KST",
        about: "Know Sure Thing is a momentum indicator that combines rate-of-change readings over different periods."
    },
    {
        id: 26,
        name: "MACD",
        about: "Moving Average Convergence Divergence shows the relationship between two moving averages of a security’s price."
    },
    {
        id: 27,
        name: "MA Channel",
        about: "Moving Average Channel plots channels around a moving average to gauge potential breakout zones."
    },
    {
        id: 28,
        name: "MA Envelope",
        about: "Moving Average Envelopes use upper and lower bands around a moving average, helpful in identifying trend direction."
    },
    {
        id: 29,
        name: "Mass Idx",
        about: "Mass Index is a volatility indicator that identifies price reversals by calculating range expansions and contractions."
    },
    {
        id: 30,
        name: "MFI",
        about: "Money Flow Index is a momentum indicator that uses price and volume to assess buying and selling pressure."
    },
    {
        id: 31,
        name: "Momentum",
        about: "Momentum measures the rate of change in price to assess the strength and direction of a trend."
    },
    {
        id: 32,
        name: "OBV",
        about: "On-Balance Volume is a cumulative volume-based indicator that measures buying and selling pressure."
    },
    {
        id: 33,
        name: "PGO",
        about: "Pretty Good Oscillator compares recent price changes to average price changes over time to measure momentum."
    },
    {
        id: 34,
        name: "P SAR",
        about: "Parabolic SAR is a trend-following indicator that sets trailing stop points above or below the price."
    },
    {
        id: 35,
        name: "PVT",
        about: "Price Volume Trend is a cumulative volume-based indicator used to determine price direction and strength."
    },
    {
        id: 36,
        name: "PVO",
        about: "Percentage Volume Oscillator shows the difference between two volume-based moving averages, indicating changes in volume trends."
    },
    {
        id: 37,
        name: "PPO",
        about: "Percentage Price Oscillator measures the percentage difference between two price-based moving averages."
    },
    {
        id: 38,
        name: "PMO",
        about: "Price Momentum Oscillator is used to measure momentum by calculating the rate of price changes over time."
    },
    {
        id: 39,
        name: "ROC",
        about: "Rate of Change is a momentum indicator that measures the percentage change in price over a specified period."
    },
    {
        id: 40,
        name: "RSI",
        about: "Relative Strength Index measures the magnitude of recent price changes to evaluate overbought or oversold conditions."
    },
    {
        id: 41,
        name: "RSI (fast)",
        about: "Fast RSI is a quicker-moving version of the Relative Strength Index, more responsive to recent price changes."
    },
    {
        id: 42,
        name: "Rel Vigor Idx",
        about: "Relative Vigor Index measures the tendency of prices to close higher than they open in uptrends and lower in downtrends."
    },
    {
        id: 43,
        name: "Sto (Fast)",
        about: "Fast Stochastic Oscillator tracks the current price in relation to a range of prices over a specific period, indicating momentum."
    },
    {
        id: 44,
        name: "Sto (Slow)",
        about: "Slow Stochastic Oscillator is a smoothed version of the Fast Stochastic, less sensitive to price changes."
    },
    {
        id: 45,
        name: "Sto RSI",
        about: "Stochastic RSI is a momentum oscillator that uses RSI values to identify overbought and oversold conditions."
    },
    {
        id: 46,
        name: "Sto RSI (Fast)",
        about: "Fast Stochastic RSI is a quicker version of Stochastic RSI, giving faster signals based on RSI movements."
    },
    {
        id: 47,
        name: "Std Dev",
        about: "Standard Deviation measures the dispersion of price data, commonly used to assess market volatility."
    },
    {
        id: 48,
        name: "Supertrend",
        about: "Supertrend is a trend-following indicator that provides buy and sell signals based on price and volatility."
    },
    {
        id: 49,
        name: "TSI",
        about: "True Strength Index is a momentum indicator that smooths price changes to help identify trend direction."
    },
    {
        id: 50,
        name: "TWAP",
        about: "Time-Weighted Average Price calculates the average price of a security over a specified period based on time."
    },
    {
        id: 51,
        name: "Ultimate (O)",
        about: "Ultimate Oscillator combines short, medium, and long-term price movements to provide a comprehensive momentum analysis."
    },
    {
        id: 52,
        name: "Ulcer",
        about: "Ulcer Index measures the depth and duration of price declines, useful for assessing downside risk."
    },
    {
        id: 53,
        name: "W %R",
        about: "Williams %R measures the level of the close relative to the highest high over a certain period, indicating overbought or oversold levels."
    },
    {
        id: 54,
        name: "Wil Alligator",
        about: "Williams Alligator is a trend-following indicator that uses moving averages to indicate market direction."
    },
    {
        id: 55,
        name: "VWAP / MVWAP",
        about: "Volume Weighted Average Price/MVWAP calculates the average trading price based on volume, used for assessing market trends."
    },
    {
        id: 56,
        name: "Vortex",
        about: "Vortex Indicator identifies the start of a new trend by using price movements to determine direction."
    },
    {
        id: 57,
        name: "ZigZag",
        about: "ZigZag indicator filters minor price movements to help identify significant trends and price reversals."
    }
]

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

// Search functionality for input box
searchIndicatorInput.addEventListener('input', function () {
    const searchQuery = this.value;
    filterOptionsBySearch(searchQuery);
});

// Function to populate the select options
function populateSelectOptions() {
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

    // document.getElementById("noActiveIndi").style.display = 'none';
    // If Active Indicators exist
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
    }
    // If no active indicator exists
    else {
        document.getElementById("noActiIndi").style.display = 'block';
    }

    selectElement.scrollTop = 0;
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

    addIndicator(index);

    settings.innerHTML = `
    <h4 style="color: green">${indicators[id - 1].name} Added!</h4>
    <p style="font-weight: bold;">${indicators[id - 1].name}</p>
    <div style="display: flex; flex-direction: column;">
    <div class="divTableRow" style="display: flex; flex-direction: column;">
    <div class="tableRow">
    <div class="divTableCell align-bottom">Period1</div>
    <div class="divTableCell align-bottom"><input type="text" id="uoPeriod1" size="3" value="7"
        onchange="javascript:myTsrChartSettings.uoc();" style="border-color: grey; border-width: 1px;"></div>
    </div>
    <div class="tableRow">
    <div class="divTableCell align-bottom">Period2</div>
    <div class="divTableCell align-bottom"><input type="text" id="uoPeriod2" size="3" value="14"
        onchange="javascript:myTsrChartSettings.uoc();" style="border-color: grey; border-width: 1px;"></div>
    </div>
    <div class="tableRow">
    <div class="divTableCell align-bottom">Period3</div>
    <div class="divTableCell align-bottom"><input type="text" id="uoPeriod3" size="3" value="28"
        onchange="javascript:myTsrChartSettings.uoc();" style="border-color: grey; border-width: 1px;"></div>
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
    <div class="divTableCell align-bottom"></div>
    </div>
    <div class="tableRow">
    <div class="divTableCell align-bottom">Overbought</div>
    <div class="divTableCell align-bottom">
        <input type="text" id="uoOB" size="3" value="70" onchange="javascript:myTsrChartSettings.uoc();"
            style="border-color: grey; border-width: 1px;">
    </div>
    <div class="divTableCell align-bottom">
    </div>
    </div>
    <div class="tableRow">
    <div class="divTableCell align-bottom">Oversold</div>
    <div class="divTableCell align-bottom">
        <input type="text" id="uoOS" size="3" value="30" onchange="javascript:myTsrChartSettings.uoc();"
            style="border-color: grey; border-width: 1px;">
    </div>
    <div class="divTableCell align-bottom"> 
    </div>
    </div>
    <div class="tableRow">
    <div class="divTableCell align-bottom">MA Color</div>
    <div class="divTableCell align-bottom">
    </div>
    </div>
    <div>
    <div onclick="showColorPicker()" id="colorPicker" style="margin-top:16px;">
        <label for="colorPicker">Choose a color:</label>
        <i class="fa-solid fa-eye-dropper" style="color: #74C0FC;"></i>
    </div>
    <div id="compactColorPicker" class="compact-color-picker" style="display: none;">
        <div id="defaultColorsMobile" class="default-colors-mobile" style="display: none;">
            <div class="colorRowsMobile">
                <button style="background-color: #FF0000;" title="Red"></button>
                <button style="background-color: #0000FF;" title="Blue"></button>
                <button style="background-color: #FFFF00;" title="Yellow"></button>
                <button style="background-color: #008000;" title="Green"></button>
                <button style="background-color: #FFA500;" title="Orange"></button>
            </div>
            <div class="colorRowsMobile">
                <button style="background-color: #800080;" title="Purple"></button>
                <button style="background-color: #FFC0CB;" title="Pink"></button>
                <button style="background-color: #008080;" title="Teal"></button>
                <button style="background-color: #A52A2A;" title="Brown"></button>
                <button style="background-color: #FFFFFF; border: 1px solid #ccc;" title="White"></button>
            </div>
            <div class="colorRowsMobile">
                <button style="background-color: #808080;" title="Gray"></button>
                <button style="background-color: #000000;" title="Black"></button>
                <button style="background-color: #FF0000;" title="Red"></button>
                <button style="background-color: #0000FF;" title="Blue"></button>
                <button style="background-color: #FFFF00;" title="Yellow"></button>
            </div>
            <div class="colorRowsMobile">
                <button style="background-color: #008000;" title="Green"></button>
                <button style="background-color: #FFA500;" title="Orange"></button>
                <button style="background-color: #800080;" title="Purple"></button>
                <button style="background-color: #FFC0CB;" title="Pink"></button>
                <button style="background-color: #008080;" title="Teal"></button>
            </div>
            <div class="colorRowsMobile">
                <button style="background-color: #A52A2A;" title="Brown"></button>
                <button style="background-color: #FFFFFF; border: 1px solid #ccc;" title="White"></button>
                <button style="background-color: #808080;" title="Gray"></button>
                <button style="background-color: #000000;" title="Black"></button>
            </div>
        </div>
        <!-- Default Colors Matrix -->
        <div id="defaultColorsDesktop" class="default-colors-desktop" style="display: none;">
            <div class="colorRows">
                <button style="background-color: #f44336;" data-color="red"></button>
                <button style="background-color: #ffebee;" data-color="red-50"></button>
                <button style="background-color: #ffcdd2;" data-color="red-100"></button>
                <button style="background-color: #ef9a9a;" data-color="red-200"></button>
                <button style="background-color: #e57373;" data-color="red-300"></button>
                <button style="background-color: #ef5350;" data-color="red-400"></button>
                <button style="background-color: #f44336;" data-color="red-500"></button>
                <button style="background-color: #e53935;" data-color="red-600"></button>
                <button style="background-color: #d32f2f;" data-color="red-700"></button>
                <button style="background-color: #c62828;" data-color="red-800"></button>
                <button style="background-color: #b71c1c;" data-color="red-900"></button>
            </div>
            <!-- Pink -->
            <div class="colorRows">
                <button style="background-color: #e91e63;" data-color="pink"></button>
                <button style="background-color: #fce4ec;" data-color="pink-50"></button>
                <button style="background-color: #f8bbd0;" data-color="pink-100"></button>
                <button style="background-color: #f48fb1;" data-color="pink-200"></button>
                <button style="background-color: #f06292;" data-color="pink-300"></button>
                <button style="background-color: #ec407a;" data-color="pink-400"></button>
                <button style="background-color: #e91e63;" data-color="pink-500"></button>
                <button style="background-color: #d81b60;" data-color="pink-600"></button>
                <button style="background-color: #c2185b;" data-color="pink-700"></button>
                <button style="background-color: #ad1457;" data-color="pink-800"></button>
                <button style="background-color: #880e4f;" data-color="pink-900"></button>
            </div>
            <div class="colorRows">
                <button style="background-color: #9c27b0;" data-color="purple"></button>
                <button style="background-color: #f3e5f5;" data-color="purple-50"></button>
                <button style="background-color: #e1bee7;" data-color="purple-100"></button>
                <button style="background-color: #ce93d8;" data-color="purple-200"></button>
                <button style="background-color: #ba68c8;" data-color="purple-300"></button>
                <button style="background-color: #ab47bc;" data-color="purple-400"></button>
                <button style="background-color: #9c27b0;" data-color="purple-500"></button>
                <button style="background-color: #8e24aa;" data-color="purple-600"></button>
                <button style="background-color: #7b1fa2;" data-color="purple-700"></button>
                <button style="background-color: #6a1b9a;" data-color="purple-800"></button>
                <button style="background-color: #4a148c;" data-color="purple-900"></button>
            </div>
            <div class="colorRows">
                <button style="background-color: #673ab7;" data-color="deep-purple"></button>
                <button style="background-color: #ede7f6;" data-color="deep-purple-50"></button>
                <button style="background-color: #d1c4e9;" data-color="deep-purple-100"></button>
                <button style="background-color: #b39ddb;" data-color="deep-purple-200"></button>
                <button style="background-color: #9575cd;" data-color="deep-purple-300"></button>
                <button style="background-color: #7e57c2;" data-color="deep-purple-400"></button>
                <button style="background-color: #673ab7;" data-color="deep-purple-500"></button>
                <button style="background-color: #5e35b1;" data-color="deep-purple-600"></button>
                <button style="background-color: #512da8;" data-color="deep-purple-700"></button>
                <button style="background-color: #4527a0;" data-color="deep-purple-800"></button>
                <button style="background-color: #311b92;" data-color="deep-purple-900"></button>
            </div>
            <!-- Indigo -->
            <div class="colorRows">
                <button style="background-color: #3f51b5;" data-color="indigo"></button>
                <button style="background-color: #e8eaf6;" data-color="indigo-50"></button>
                <button style="background-color: #c5cae9;" data-color="indigo-100"></button>
                <button style="background-color: #9fa8da;" data-color="indigo-200"></button>
                <button style="background-color: #7986cb;" data-color="indigo-300"></button>
                <button style="background-color: #5c6bc0;" data-color="indigo-400"></button>
                <button style="background-color: #3f51b5;" data-color="indigo-500"></button>
                <button style="background-color: #3949ab;" data-color="indigo-600"></button>
                <button style="background-color: #303f9f;" data-color="indigo-700"></button>
                <button style="background-color: #283593;" data-color="indigo-800"></button>
                <button style="background-color: #1a237e;" data-color="indigo-900"></button>
            </div>
            <!-- Blue -->
            <div class="colorRows">
                <button style="background-color: #2196f3;" data-color="blue"></button>
                <button style="background-color: #e3f2fd;" data-color="blue-50"></button>
                <button style="background-color: #bbdefb;" data-color="blue-100"></button>
                <button style="background-color: #90caf9;" data-color="blue-200"></button>
                <button style="background-color: #64b5f6;" data-color="blue-300"></button>
                <button style="background-color: #42a5f5;" data-color="blue-400"></button>
                <button style="background-color: #2196f3;" data-color="blue-500"></button>
                <button style="background-color: #1e88e5;" data-color="blue-600"></button>
                <button style="background-color: #1976d2;" data-color="blue-700"></button>
                <button style="background-color: #1565c0;" data-color="blue-800"></button>
                <button style="background-color: #0d47a1;" data-color="blue-900"></button>
            </div>
            <!-- Light Blue -->
            <div class="colorRows">
                <button style="background-color: #03a9f4;" data-color="light-blue"></button>
                <button style="background-color: #e1f5fe;" data-color="light-blue-50"></button>
                <button style="background-color: #b3e5fc;" data-color="light-blue-100"></button>
                <button style="background-color: #81d4fa;" data-color="light-blue-200"></button>
                <button style="background-color: #4fc3f7;" data-color="light-blue-300"></button>
                <button style="background-color: #29b6f6;" data-color="light-blue-400"></button>
                <button style="background-color: #03a9f4;" data-color="light-blue-500"></button>
                <button style="background-color: #039be5;" data-color="light-blue-600"></button>
                <button style="background-color: #0288d1;" data-color="light-blue-700"></button>
                <button style="background-color: #0277bd;" data-color="light-blue-800"></button>
                <button style="background-color: #01579b;" data-color="light-blue-900"></button>
            </div>
            <!-- Cyan -->
            <div class="colorRows">
                <button style="background-color: #00bcd4;" data-color="cyan"></button>
                <button style="background-color: #e0f7fa;" data-color="cyan-50"></button>
                <button style="background-color: #b2ebf2;" data-color="cyan-100"></button>
                <button style="background-color: #80deea;" data-color="cyan-200"></button>
                <button style="background-color: #4dd0e1;" data-color="cyan-300"></button>
                <button style="background-color: #26c6da;" data-color="cyan-400"></button>
                <button style="background-color: #00bcd4;" data-color="cyan-500"></button>
                <button style="background-color: #00acc1;" data-color="cyan-600"></button>
                <button style="background-color: #0097a7;" data-color="cyan-700"></button>
                <button style="background-color: #00838f;" data-color="cyan-800"></button>
                <button style="background-color: #006064;" data-color="cyan-900"></button>
            </div>
            <!-- Teal -->
            <div class="colorRows">
                <button style="background-color: #009688;" data-color="teal"></button>
                <button style="background-color: #e0f2f1;" data-color="teal-50"></button>
                <button style="background-color: #b2dfdb;" data-color="teal-100"></button>
                <button style="background-color: #80cbc4;" data-color="teal-200"></button>
                <button style="background-color: #4db6ac;" data-color="teal-300"></button>
                <button style="background-color: #26a69a;" data-color="teal-400"></button>
                <button style="background-color: #009688;" data-color="teal-500"></button>
                <button style="background-color: #00897b;" data-color="teal-600"></button>
                <button style="background-color: #00796b;" data-color="teal-700"></button>
                <button style="background-color: #00695c;" data-color="teal-800"></button>
                <button style="background-color: #004d40;" data-color="teal-900"></button>
            </div>
            <!-- Green -->
            <div class="colorRows">
                <button style="background-color: #4caf50;" data-color="green"></button>
                <button style="background-color: #c8e6c9;" data-color="green-50"></button>
                <button style="background-color: #a5d6a7;" data-color="green-100"></button>
                <button style="background-color: #81c784;" data-color="green-200"></button>
                <button style="background-color: #66bb6a;" data-color="green-300"></button>
                <button style="background-color: #43a047;" data-color="green-400"></button>
                <button style="background-color: #4caf50;" data-color="green-500"></button>
                <button style="background-color: #388e3c;" data-color="green-600"></button>
                <button style="background-color: #2c6e2f;" data-color="green-700"></button>
                <button style="background-color: #1b5e20;" data-color="green-800"></button>
                <button style="background-color: #0b3d16;" data-color="green-900"></button>
            </div>
            <!-- Light Green -->
            <div class="colorRows">
                <button style="background-color: #8bc34a;" data-color="light-green"></button>
                <button style="background-color: #f1f8e9;" data-color="light-green-50"></button>
                <button style="background-color: #dcedc8;" data-color="light-green-100"></button>
                <button style="background-color: #c5e1a5;" data-color="light-green-200"></button>
                <button style="background-color: #aed581;" data-color="light-green-300"></button>
                <button style="background-color: #9ccc65;" data-color="light-green-400"></button>
                <button style="background-color: #8bc34a;" data-color="light-green-500"></button>
                <button style="background-color: #7cb342;" data-color="light-green-600"></button>
                <button style="background-color: #689f38;" data-color="light-green-700"></button>
                <button style="background-color: #558b2f;" data-color="light-green-800"></button>
                <button style="background-color: #33691e;" data-color="light-green-900"></button>
            </div>
            <!-- Yellow -->
            <div class="colorRows">
                <button style="background-color: #ffeb3b;" data-color="yellow"></button>
                <button style="background-color: #fffde7;" data-color="yellow-50"></button>
                <button style="background-color: #fff9c4;" data-color="yellow-100"></button>
                <button style="background-color: #fff59d;" data-color="yellow-200"></button>
                <button style="background-color: #fff176;" data-color="yellow-300"></button>
                <button style="background-color: #ffee58;" data-color="yellow-400"></button>
                <button style="background-color: #ffeb3b;" data-color="yellow-500"></button>
                <button style="background-color: #fdd835;" data-color="yellow-600"></button>
                <button style="background-color: #fbc02d;" data-color="yellow-700"></button>
                <button style="background-color: #f9a825;" data-color="yellow-800"></button>
                <button style="background-color: #f57f17;" data-color="yellow-900"></button>
            </div>
            <!-- Amber -->
            <div class="colorRows">
                <button style="background-color: #ff9800;" data-color="amber"></button>
                <button style="background-color: #fff8e1;" data-color="amber-50"></button>
                <button style="background-color: #ffecb3;" data-color="amber-100"></button>
                <button style="background-color: #ffe082;" data-color="amber-200"></button>
                <button style="background-color: #ffd54f;" data-color="amber-300"></button>
                <button style="background-color: #ffca28;" data-color="amber-400"></button>
                <button style="background-color: #ff9800;" data-color="amber-500"></button>
                <button style="background-color: #fb8c00;" data-color="amber-600"></button>
                <button style="background-color: #f57c00;" data-color="amber-700"></button>
                <button style="background-color: #ef6c00;" data-color="amber-800"></button>
                <button style="background-color: #e65100;" data-color="amber-900"></button>
            </div>
            <!-- Orange -->
            <div class="colorRows">
                <button style="background-color: #ff5722;" data-color="orange"></button>
                <button style="background-color: #fbe9e7;" data-color="orange-50"></button>
                <button style="background-color: #ffccbc;" data-color="orange-100"></button>
                <button style="background-color: #ffab91;" data-color="orange-200"></button>
                <button style="background-color: #ff8a65;" data-color="orange-300"></button>
                <button style="background-color: #ff7043;" data-color="orange-400"></button>
                <button style="background-color: #ff5722;" data-color="orange-500"></button>
                <button style="background-color: #f4511e;" data-color="orange-600"></button>
                <button style="background-color: #e64a19;" data-color="orange-700"></button>
                <button style="background-color: #d84315;" data-color="orange-800"></button>
                <button style="background-color: #bf360c;" data-color="orange-900"></button>
            </div>
            <!-- Deep Orange -->
            <div class="colorRows">
                <button style="background-color: #ff3d00;" data-color="deep-orange"></button>
                <button style="background-color: #fbe9e7;" data-color="deep-orange-50"></button>
                <button style="background-color: #ffccbc;" data-color="deep-orange-100"></button>
                <button style="background-color: #ffab91;" data-color="deep-orange-200"></button>
                <button style="background-color: #ff8a65;" data-color="deep-orange-300"></button>
                <button style="background-color: #ff7043;" data-color="deep-orange-400"></button>
                <button style="background-color: #ff5722;" data-color="deep-orange-500"></button>
                <button style="background-color: #f4511e;" data-color="deep-orange-600"></button>
                <button style="background-color: #e64a19;" data-color="deep-orange-700"></button>
                <button style="background-color: #d84315;" data-color="deep-orange-800"></button>
                <button style="background-color: #bf360c;" data-color="deep-orange-900"></button>
            </div>
            <!-- Brown -->
            <div class="colorRows">
                <button style="background-color: #795548;" data-color="brown"></button>
                <button style="background-color: #efebe9;" data-color="brown-50"></button>
                <button style="background-color: #d7ccc8;" data-color="brown-100"></button>
                <button style="background-color: #bcaaa4;" data-color="brown-200"></button>
                <button style="background-color: #a1887f;" data-color="brown-300"></button>
                <button style="background-color: #8d6e63;" data-color="brown-400"></button>
                <button style="background-color: #795548;" data-color="brown-500"></button>
                <button style="background-color: #6d4c41;" data-color="brown-600"></button>
                <button style="background-color: #5d4037;" data-color="brown-700"></button>
                <button style="background-color: #4e342e;" data-color="brown-800"></button>
                <button style="background-color: #3e2723;" data-color="brown-900"></button>
            </div>
            <!-- Grey -->
            <div class="colorRows">
                <button style="background-color: #9e9e9e;" data-color="grey"></button>
                <button style="background-color: #fafafa;" data-color="grey-50"></button>
                <button style="background-color: #f5f5f5;" data-color="grey-100"></button>
                <button style="background-color: #eeeeee;" data-color="grey-200"></button>
                <button style="background-color: #e0e0e0;" data-color="grey-300"></button>
                <button style="background-color: #bdbdbd;" data-color="grey-400"></button>
                <button style="background-color: #9e9e9e;" data-color="grey-500"></button>
                <button style="background-color: #757575;" data-color="grey-600"></button>
                <button style="background-color: #616161;" data-color="grey-700"></button>
                <button style="background-color: #424242;" data-color="grey-800"></button>
                <button style="background-color: #212121;" data-color="grey-900"></button>
            </div>
            <!-- Blue Grey -->
            <div class="colorRows">
                <button style="background-color: #607d8b;" data-color="blue-grey"></button>
                <button style="background-color: #eceff1;" data-color="blue-grey-50"></button>
                <button style="background-color: #cfd8dc;" data-color="blue-grey-100"></button>
                <button style="background-color: #b0bec5;" data-color="blue-grey-200"></button>
                <button style="background-color: #90a4ae;" data-color="blue-grey-300"></button>
                <button style="background-color: #78909c;" data-color="blue-grey-400"></button>
                <button style="background-color: #607d8b;" data-color="blue-grey-500"></button>
                <button style="background-color: #546e7a;" data-color="blue-grey-600"></button>
                <button style="background-color: #455a64;" data-color="blue-grey-700"></button>
                <button style="background-color: #37474f;" data-color="blue-grey-800"></button>
                <button style="background-color: #263238;" data-color="blue-grey-900"></button>
            </div>
            <!-- White -->
            <!-- <div class="colorRows">
                <button style="background-color: #ffffff;" data-color="white"></button>
                </div> -->
            <!-- Black -->
            <!-- <div class="colorRows">
                <button style="background-color: #000000;" data-color="black"></button>
                </div> -->
        </div>
    </div>                  
    </div>
    `;
    info.innerHTML = indicators[id - 1].about;
    // updateDelete.innerHTML = `
    // <div id="addIndicatorBtn" class="add_indicator_btn" style="float: right">
    //     <button onclick="addIndicator(${index})">Add</button>
    // </div>
    //  `
    updateDelete.innerHTML = `
    <div id="rmIndicatorBtn" class="rm_indicator_btn" style="float: left">
        <button onclick="removeIndicator(${(activeIndicatorsArr.length - 1)})">Remove <i class="fa-solid fa-trash"></i></button>
    </div>
    <div id="updateIndicatorBtn" class="update_indicator_btn" style="float: right">
        <button onclick="updateIndicator(${(activeIndicatorsArr.length - 1)})">Update</button>
    </div>
     `
}

function showColorPicker() {
    document.getElementById("compactColorPicker").style.display = document.getElementById("compactColorPicker").style.display === "block" ? "none" : "block";
    if (document.body.getBoundingClientRect().width < 768) {
        document.getElementById("defaultColorsMobile").style.display = "flex";
        document.getElementById("defaultColorsDesktop").style.display = "none";
    } else {
        document.getElementById("defaultColorsMobile").style.display = "none";
        document.getElementById("defaultColorsDesktop").style.display = "flex";
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
    <p style="font-weight: bold;">${indicators[id - 1].name}</p>
    <div style="display: flex; flex-direction: column;">
    <div class="divTableRow" style="display: flex; flex-direction: column;">
    <div class="tableRow">
    <div class="divTableCell align-bottom">Period1</div>
    <div class="divTableCell align-bottom"><input type="text" id="uoPeriod1" size="3" value="7"
        onchange="javascript:myTsrChartSettings.uoc();" style="border-color: grey; border-width: 1px;"></div>
    </div>
    <div class="tableRow">
    <div class="divTableCell align-bottom">Period2</div>
    <div class="divTableCell align-bottom"><input type="text" id="uoPeriod2" size="3" value="14"
        onchange="javascript:myTsrChartSettings.uoc();" style="border-color: grey; border-width: 1px;"></div>
    </div>
    <div class="tableRow">
    <div class="divTableCell align-bottom">Period3</div>
    <div class="divTableCell align-bottom"><input type="text" id="uoPeriod3" size="3" value="28"
        onchange="javascript:myTsrChartSettings.uoc();" style="border-color: grey; border-width: 1px;"></div>
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
    <div class="divTableCell align-bottom"></div>
    </div>
    <div class="tableRow">
    <div class="divTableCell align-bottom">Overbought</div>
    <div class="divTableCell align-bottom">
        <input type="text" id="uoOB" size="3" value="70" onchange="javascript:myTsrChartSettings.uoc();"
            style="border-color: grey; border-width: 1px;">
    </div>
    <div class="divTableCell align-bottom">
    </div>
    </div>
    <div class="tableRow">
    <div class="divTableCell align-bottom">Oversold</div>
    <div class="divTableCell align-bottom">
        <input type="text" id="uoOS" size="3" value="30" onchange="javascript:myTsrChartSettings.uoc();"
            style="border-color: grey; border-width: 1px;">
    </div>
    <div class="divTableCell align-bottom"> 
    </div>
    </div>
    <div class="tableRow">
    <div class="divTableCell align-bottom">MA Color</div>
    <div class="divTableCell align-bottom">
    </div>
    </div>
    <div>
    <div onclick="showColorPicker()" id="colorPicker" style="margin-top:16px;">
    <label for="colorPicker">Choose a color:</label>
    <i class="fa-solid fa-eye-dropper" style="color: #74C0FC;"></i>
    </div>
    <div id="compactColorPicker" class="compact-color-picker" style="display: none;">
            <div id="defaultColorsMobile" class="default-colors-mobile" style="display: none;">
                <div class="colorRowsMobile">
                    <button style="background-color: #FF0000;" title="Red"></button>
                    <button style="background-color: #0000FF;" title="Blue"></button>
                    <button style="background-color: #FFFF00;" title="Yellow"></button>
                    <button style="background-color: #008000;" title="Green"></button>
                    <button style="background-color: #FFA500;" title="Orange"></button>
                </div>
                <div class="colorRowsMobile">
                    <button style="background-color: #800080;" title="Purple"></button>
                    <button style="background-color: #FFC0CB;" title="Pink"></button>
                    <button style="background-color: #008080;" title="Teal"></button>
                    <button style="background-color: #A52A2A;" title="Brown"></button>
                    <button style="background-color: #FFFFFF; border: 1px solid #ccc;" title="White"></button>
                </div>
                <div class="colorRowsMobile">
                    <button style="background-color: #808080;" title="Gray"></button>
                    <button style="background-color: #000000;" title="Black"></button>
                    <button style="background-color: #FF0000;" title="Red"></button>
                    <button style="background-color: #0000FF;" title="Blue"></button>
                    <button style="background-color: #FFFF00;" title="Yellow"></button>
                </div>
                <div class="colorRowsMobile">
                    <button style="background-color: #008000;" title="Green"></button>
                    <button style="background-color: #FFA500;" title="Orange"></button>
                    <button style="background-color: #800080;" title="Purple"></button>
                    <button style="background-color: #FFC0CB;" title="Pink"></button>
                    <button style="background-color: #008080;" title="Teal"></button>
                </div>
                <div class="colorRowsMobile">
                    <button style="background-color: #A52A2A;" title="Brown"></button>
                    <button style="background-color: #FFFFFF; border: 1px solid #ccc;" title="White"></button>
                    <button style="background-color: #808080;" title="Gray"></button>
                    <button style="background-color: #000000;" title="Black"></button>
                </div>
            </div>
            <!-- Default Colors Matrix -->
            <div id="defaultColorsDesktop" class="default-colors-desktop" style="display: none;">
                <div class="colorRows">
                    <button style="background-color: #f44336;" data-color="red"></button>
                    <button style="background-color: #ffebee;" data-color="red-50"></button>
                    <button style="background-color: #ffcdd2;" data-color="red-100"></button>
                    <button style="background-color: #ef9a9a;" data-color="red-200"></button>
                    <button style="background-color: #e57373;" data-color="red-300"></button>
                    <button style="background-color: #ef5350;" data-color="red-400"></button>
                    <button style="background-color: #f44336;" data-color="red-500"></button>
                    <button style="background-color: #e53935;" data-color="red-600"></button>
                    <button style="background-color: #d32f2f;" data-color="red-700"></button>
                    <button style="background-color: #c62828;" data-color="red-800"></button>
                    <button style="background-color: #b71c1c;" data-color="red-900"></button>
                </div>
                <!-- Pink -->
                <div class="colorRows">
                    <button style="background-color: #e91e63;" data-color="pink"></button>
                    <button style="background-color: #fce4ec;" data-color="pink-50"></button>
                    <button style="background-color: #f8bbd0;" data-color="pink-100"></button>
                    <button style="background-color: #f48fb1;" data-color="pink-200"></button>
                    <button style="background-color: #f06292;" data-color="pink-300"></button>
                    <button style="background-color: #ec407a;" data-color="pink-400"></button>
                    <button style="background-color: #e91e63;" data-color="pink-500"></button>
                    <button style="background-color: #d81b60;" data-color="pink-600"></button>
                    <button style="background-color: #c2185b;" data-color="pink-700"></button>
                    <button style="background-color: #ad1457;" data-color="pink-800"></button>
                    <button style="background-color: #880e4f;" data-color="pink-900"></button>
                </div>
                <div class="colorRows">
                    <button style="background-color: #9c27b0;" data-color="purple"></button>
                    <button style="background-color: #f3e5f5;" data-color="purple-50"></button>
                    <button style="background-color: #e1bee7;" data-color="purple-100"></button>
                    <button style="background-color: #ce93d8;" data-color="purple-200"></button>
                    <button style="background-color: #ba68c8;" data-color="purple-300"></button>
                    <button style="background-color: #ab47bc;" data-color="purple-400"></button>
                    <button style="background-color: #9c27b0;" data-color="purple-500"></button>
                    <button style="background-color: #8e24aa;" data-color="purple-600"></button>
                    <button style="background-color: #7b1fa2;" data-color="purple-700"></button>
                    <button style="background-color: #6a1b9a;" data-color="purple-800"></button>
                    <button style="background-color: #4a148c;" data-color="purple-900"></button>
                </div>
                <div class="colorRows">
                    <button style="background-color: #673ab7;" data-color="deep-purple"></button>
                    <button style="background-color: #ede7f6;" data-color="deep-purple-50"></button>
                    <button style="background-color: #d1c4e9;" data-color="deep-purple-100"></button>
                    <button style="background-color: #b39ddb;" data-color="deep-purple-200"></button>
                    <button style="background-color: #9575cd;" data-color="deep-purple-300"></button>
                    <button style="background-color: #7e57c2;" data-color="deep-purple-400"></button>
                    <button style="background-color: #673ab7;" data-color="deep-purple-500"></button>
                    <button style="background-color: #5e35b1;" data-color="deep-purple-600"></button>
                    <button style="background-color: #512da8;" data-color="deep-purple-700"></button>
                    <button style="background-color: #4527a0;" data-color="deep-purple-800"></button>
                    <button style="background-color: #311b92;" data-color="deep-purple-900"></button>
                </div>
                <!-- Indigo -->
                <div class="colorRows">
                    <button style="background-color: #3f51b5;" data-color="indigo"></button>
                    <button style="background-color: #e8eaf6;" data-color="indigo-50"></button>
                    <button style="background-color: #c5cae9;" data-color="indigo-100"></button>
                    <button style="background-color: #9fa8da;" data-color="indigo-200"></button>
                    <button style="background-color: #7986cb;" data-color="indigo-300"></button>
                    <button style="background-color: #5c6bc0;" data-color="indigo-400"></button>
                    <button style="background-color: #3f51b5;" data-color="indigo-500"></button>
                    <button style="background-color: #3949ab;" data-color="indigo-600"></button>
                    <button style="background-color: #303f9f;" data-color="indigo-700"></button>
                    <button style="background-color: #283593;" data-color="indigo-800"></button>
                    <button style="background-color: #1a237e;" data-color="indigo-900"></button>
                </div>
                <!-- Blue -->
                <div class="colorRows">
                    <button style="background-color: #2196f3;" data-color="blue"></button>
                    <button style="background-color: #e3f2fd;" data-color="blue-50"></button>
                    <button style="background-color: #bbdefb;" data-color="blue-100"></button>
                    <button style="background-color: #90caf9;" data-color="blue-200"></button>
                    <button style="background-color: #64b5f6;" data-color="blue-300"></button>
                    <button style="background-color: #42a5f5;" data-color="blue-400"></button>
                    <button style="background-color: #2196f3;" data-color="blue-500"></button>
                    <button style="background-color: #1e88e5;" data-color="blue-600"></button>
                    <button style="background-color: #1976d2;" data-color="blue-700"></button>
                    <button style="background-color: #1565c0;" data-color="blue-800"></button>
                    <button style="background-color: #0d47a1;" data-color="blue-900"></button>
                </div>
                <!-- Light Blue -->
                <div class="colorRows">
                    <button style="background-color: #03a9f4;" data-color="light-blue"></button>
                    <button style="background-color: #e1f5fe;" data-color="light-blue-50"></button>
                    <button style="background-color: #b3e5fc;" data-color="light-blue-100"></button>
                    <button style="background-color: #81d4fa;" data-color="light-blue-200"></button>
                    <button style="background-color: #4fc3f7;" data-color="light-blue-300"></button>
                    <button style="background-color: #29b6f6;" data-color="light-blue-400"></button>
                    <button style="background-color: #03a9f4;" data-color="light-blue-500"></button>
                    <button style="background-color: #039be5;" data-color="light-blue-600"></button>
                    <button style="background-color: #0288d1;" data-color="light-blue-700"></button>
                    <button style="background-color: #0277bd;" data-color="light-blue-800"></button>
                    <button style="background-color: #01579b;" data-color="light-blue-900"></button>
                </div>
                <!-- Cyan -->
                <div class="colorRows">
                    <button style="background-color: #00bcd4;" data-color="cyan"></button>
                    <button style="background-color: #e0f7fa;" data-color="cyan-50"></button>
                    <button style="background-color: #b2ebf2;" data-color="cyan-100"></button>
                    <button style="background-color: #80deea;" data-color="cyan-200"></button>
                    <button style="background-color: #4dd0e1;" data-color="cyan-300"></button>
                    <button style="background-color: #26c6da;" data-color="cyan-400"></button>
                    <button style="background-color: #00bcd4;" data-color="cyan-500"></button>
                    <button style="background-color: #00acc1;" data-color="cyan-600"></button>
                    <button style="background-color: #0097a7;" data-color="cyan-700"></button>
                    <button style="background-color: #00838f;" data-color="cyan-800"></button>
                    <button style="background-color: #006064;" data-color="cyan-900"></button>
                </div>
                <!-- Teal -->
                <div class="colorRows">
                    <button style="background-color: #009688;" data-color="teal"></button>
                    <button style="background-color: #e0f2f1;" data-color="teal-50"></button>
                    <button style="background-color: #b2dfdb;" data-color="teal-100"></button>
                    <button style="background-color: #80cbc4;" data-color="teal-200"></button>
                    <button style="background-color: #4db6ac;" data-color="teal-300"></button>
                    <button style="background-color: #26a69a;" data-color="teal-400"></button>
                    <button style="background-color: #009688;" data-color="teal-500"></button>
                    <button style="background-color: #00897b;" data-color="teal-600"></button>
                    <button style="background-color: #00796b;" data-color="teal-700"></button>
                    <button style="background-color: #00695c;" data-color="teal-800"></button>
                    <button style="background-color: #004d40;" data-color="teal-900"></button>
                </div>
                <!-- Green -->
                <div class="colorRows">
                    <button style="background-color: #4caf50;" data-color="green"></button>
                    <button style="background-color: #c8e6c9;" data-color="green-50"></button>
                    <button style="background-color: #a5d6a7;" data-color="green-100"></button>
                    <button style="background-color: #81c784;" data-color="green-200"></button>
                    <button style="background-color: #66bb6a;" data-color="green-300"></button>
                    <button style="background-color: #43a047;" data-color="green-400"></button>
                    <button style="background-color: #4caf50;" data-color="green-500"></button>
                    <button style="background-color: #388e3c;" data-color="green-600"></button>
                    <button style="background-color: #2c6e2f;" data-color="green-700"></button>
                    <button style="background-color: #1b5e20;" data-color="green-800"></button>
                    <button style="background-color: #0b3d16;" data-color="green-900"></button>
                </div>
                <!-- Light Green -->
                <div class="colorRows">
                    <button style="background-color: #8bc34a;" data-color="light-green"></button>
                    <button style="background-color: #f1f8e9;" data-color="light-green-50"></button>
                    <button style="background-color: #dcedc8;" data-color="light-green-100"></button>
                    <button style="background-color: #c5e1a5;" data-color="light-green-200"></button>
                    <button style="background-color: #aed581;" data-color="light-green-300"></button>
                    <button style="background-color: #9ccc65;" data-color="light-green-400"></button>
                    <button style="background-color: #8bc34a;" data-color="light-green-500"></button>
                    <button style="background-color: #7cb342;" data-color="light-green-600"></button>
                    <button style="background-color: #689f38;" data-color="light-green-700"></button>
                    <button style="background-color: #558b2f;" data-color="light-green-800"></button>
                    <button style="background-color: #33691e;" data-color="light-green-900"></button>
                </div>
                <!-- Yellow -->
                <div class="colorRows">
                    <button style="background-color: #ffeb3b;" data-color="yellow"></button>
                    <button style="background-color: #fffde7;" data-color="yellow-50"></button>
                    <button style="background-color: #fff9c4;" data-color="yellow-100"></button>
                    <button style="background-color: #fff59d;" data-color="yellow-200"></button>
                    <button style="background-color: #fff176;" data-color="yellow-300"></button>
                    <button style="background-color: #ffee58;" data-color="yellow-400"></button>
                    <button style="background-color: #ffeb3b;" data-color="yellow-500"></button>
                    <button style="background-color: #fdd835;" data-color="yellow-600"></button>
                    <button style="background-color: #fbc02d;" data-color="yellow-700"></button>
                    <button style="background-color: #f9a825;" data-color="yellow-800"></button>
                    <button style="background-color: #f57f17;" data-color="yellow-900"></button>
                </div>
                <!-- Amber -->
                <div class="colorRows">
                    <button style="background-color: #ff9800;" data-color="amber"></button>
                    <button style="background-color: #fff8e1;" data-color="amber-50"></button>
                    <button style="background-color: #ffecb3;" data-color="amber-100"></button>
                    <button style="background-color: #ffe082;" data-color="amber-200"></button>
                    <button style="background-color: #ffd54f;" data-color="amber-300"></button>
                    <button style="background-color: #ffca28;" data-color="amber-400"></button>
                    <button style="background-color: #ff9800;" data-color="amber-500"></button>
                    <button style="background-color: #fb8c00;" data-color="amber-600"></button>
                    <button style="background-color: #f57c00;" data-color="amber-700"></button>
                    <button style="background-color: #ef6c00;" data-color="amber-800"></button>
                    <button style="background-color: #e65100;" data-color="amber-900"></button>
                </div>
                <!-- Orange -->
                <div class="colorRows">
                    <button style="background-color: #ff5722;" data-color="orange"></button>
                    <button style="background-color: #fbe9e7;" data-color="orange-50"></button>
                    <button style="background-color: #ffccbc;" data-color="orange-100"></button>
                    <button style="background-color: #ffab91;" data-color="orange-200"></button>
                    <button style="background-color: #ff8a65;" data-color="orange-300"></button>
                    <button style="background-color: #ff7043;" data-color="orange-400"></button>
                    <button style="background-color: #ff5722;" data-color="orange-500"></button>
                    <button style="background-color: #f4511e;" data-color="orange-600"></button>
                    <button style="background-color: #e64a19;" data-color="orange-700"></button>
                    <button style="background-color: #d84315;" data-color="orange-800"></button>
                    <button style="background-color: #bf360c;" data-color="orange-900"></button>
                </div>
                <!-- Deep Orange -->
                <div class="colorRows">
                    <button style="background-color: #ff3d00;" data-color="deep-orange"></button>
                    <button style="background-color: #fbe9e7;" data-color="deep-orange-50"></button>
                    <button style="background-color: #ffccbc;" data-color="deep-orange-100"></button>
                    <button style="background-color: #ffab91;" data-color="deep-orange-200"></button>
                    <button style="background-color: #ff8a65;" data-color="deep-orange-300"></button>
                    <button style="background-color: #ff7043;" data-color="deep-orange-400"></button>
                    <button style="background-color: #ff5722;" data-color="deep-orange-500"></button>
                    <button style="background-color: #f4511e;" data-color="deep-orange-600"></button>
                    <button style="background-color: #e64a19;" data-color="deep-orange-700"></button>
                    <button style="background-color: #d84315;" data-color="deep-orange-800"></button>
                    <button style="background-color: #bf360c;" data-color="deep-orange-900"></button>
                </div>
                <!-- Brown -->
                <div class="colorRows">
                    <button style="background-color: #795548;" data-color="brown"></button>
                    <button style="background-color: #efebe9;" data-color="brown-50"></button>
                    <button style="background-color: #d7ccc8;" data-color="brown-100"></button>
                    <button style="background-color: #bcaaa4;" data-color="brown-200"></button>
                    <button style="background-color: #a1887f;" data-color="brown-300"></button>
                    <button style="background-color: #8d6e63;" data-color="brown-400"></button>
                    <button style="background-color: #795548;" data-color="brown-500"></button>
                    <button style="background-color: #6d4c41;" data-color="brown-600"></button>
                    <button style="background-color: #5d4037;" data-color="brown-700"></button>
                    <button style="background-color: #4e342e;" data-color="brown-800"></button>
                    <button style="background-color: #3e2723;" data-color="brown-900"></button>
                </div>
                <!-- Grey -->
                <div class="colorRows">
                    <button style="background-color: #9e9e9e;" data-color="grey"></button>
                    <button style="background-color: #fafafa;" data-color="grey-50"></button>
                    <button style="background-color: #f5f5f5;" data-color="grey-100"></button>
                    <button style="background-color: #eeeeee;" data-color="grey-200"></button>
                    <button style="background-color: #e0e0e0;" data-color="grey-300"></button>
                    <button style="background-color: #bdbdbd;" data-color="grey-400"></button>
                    <button style="background-color: #9e9e9e;" data-color="grey-500"></button>
                    <button style="background-color: #757575;" data-color="grey-600"></button>
                    <button style="background-color: #616161;" data-color="grey-700"></button>
                    <button style="background-color: #424242;" data-color="grey-800"></button>
                    <button style="background-color: #212121;" data-color="grey-900"></button>
                </div>
                <!-- Blue Grey -->
                <div class="colorRows">
                    <button style="background-color: #607d8b;" data-color="blue-grey"></button>
                    <button style="background-color: #eceff1;" data-color="blue-grey-50"></button>
                    <button style="background-color: #cfd8dc;" data-color="blue-grey-100"></button>
                    <button style="background-color: #b0bec5;" data-color="blue-grey-200"></button>
                    <button style="background-color: #90a4ae;" data-color="blue-grey-300"></button>
                    <button style="background-color: #78909c;" data-color="blue-grey-400"></button>
                    <button style="background-color: #607d8b;" data-color="blue-grey-500"></button>
                    <button style="background-color: #546e7a;" data-color="blue-grey-600"></button>
                    <button style="background-color: #455a64;" data-color="blue-grey-700"></button>
                    <button style="background-color: #37474f;" data-color="blue-grey-800"></button>
                    <button style="background-color: #263238;" data-color="blue-grey-900"></button>
                </div>
                <!-- White -->
                <!-- <div class="colorRows">
                    <button style="background-color: #ffffff;" data-color="white"></button>
                    </div> -->
                <!-- Black -->
                <!-- <div class="colorRows">
                    <button style="background-color: #000000;" data-color="black"></button>
                    </div> -->
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
function filterOptionsBySearch(query) {
    // If indicator is to be searched id it starts with entered input, use startsWith(query.toLowerCase())
    const filteredOptions = indicators.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    selectElement.innerHTML = ''; // Clear previous options
    filteredOptions.forEach((item, index) => {
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
}

// Filter function for the alphabet
function filterOptionsByLetter(letter) {
    const filteredOptions = indicators.filter(item => item.name.startsWith(letter));
    selectElement.innerHTML = ''; // Clear previous options
    filteredOptions.forEach((item, index) => {
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
}

// Reset the filter (show all options)
function resetFilter() {
    populateSelectOptions();
}

// Event listeners for filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        const letter = this.getAttribute('data-letter');
        if (letter === '*') {
            resetFilter();
        } else {
            filterOptionsByLetter(letter);
        }
    });
});

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

const closeIndiPopup = function closeIndiPopup() {
    selectedIndiSettings.style.display = 'none';
    document.getElementById("indiSearchSelect").style.display = "flex";
    document.getElementById("indicatorCategories").style.display = "flex";
}

const addIndicator = function addIndicator(id) {
    activeIndicatorsArr.push(indicators[id]);
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
    console.log("settings updated for array element having index : ", index);

    selectedIndiSettings.style.display = 'none';
    document.getElementById("indiSearchSelect").style.display = "flex";
    document.getElementById("indicatorCategories").style.display = "flex";
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
            div.innerHTML = `
            <button class="indiOptions" onclick="selectActiveOption(event, ${index});" style="background-color: white;">${item.name}</button>
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
    }

    activeIndicatorsDivList.scrollTop = 0;
}

// function showIndiSettingsBox() {
//     document.getElementById("indiInfoBox").style.display = "none";
//     document.getElementById("indiSettingsBox").style.display = "flex";
// }


// function showIndiInfoBox() {
//     document.getElementById("indiSettingsBox").style.display = "none";
//     document.getElementById("indiInfoBox").style.display = "block";
// }

// selectElement.classList.remove("miCtrl");