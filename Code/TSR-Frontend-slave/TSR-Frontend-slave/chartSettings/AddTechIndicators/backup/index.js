const popupBtn = document.querySelector('.popup-btn');
const popupBox = document.querySelector('.popup-box');
const selectElement = document.getElementById('popupSelect');
const resetFilterButton = document.getElementById('resetFilter');
const filterButtons = document.querySelectorAll('.filter-btn');

const indicators = [
    { id: 1, name: "ADI" },
    { id: 2, name: "ADX" },
    { id: 3, name: "Aroon" },
    { id: 4, name: "AroonOsc" },
    { id: 5, name: "ATR" },
    { id: 6, name: "ATR Band" },
    { id: 7, name: "Awe Osc" },
    { id: 8, name: "Bollinger" },
    { id: 9, name: "BOP" },
    { id: 10, name: "CMF" },
    { id: 11, name: "CCI" },
    { id: 12, name: "Chandelier" },
    { id: 13, name: "Choppiness" },
    { id: 14, name: "Coppock" },
    { id: 15, name: "CMO" },
    { id: 16, name: "DPO" },
    { id: 17, name: "Donchian" },
    { id: 18, name: "ElderRay" },
    { id: 19, name: "EFI" },
    { id: 20, name: "EOM" },
    { id: 21, name: "HL Bands" },
    { id: 22, name: "HL MA Bands" },
    { id: 23, name: "Ichimoku" },
    { id: 24, name: "Keltner" },
    { id: 25, name: "KST" },
    { id: 26, name: "MACD" },
    { id: 27, name: "MA Channel" },
    { id: 28, name: "MA Envelope" },
    { id: 29, name: "Mass Idx" },
    { id: 30, name: "MFI" },
    { id: 31, name: "Momentum" },
    { id: 32, name: "OBV" },
    { id: 33, name: "PGO" },
    { id: 34, name: "P SAR" },
    { id: 35, name: "PVT" },
    { id: 36, name: "PVO" },
    { id: 37, name: "PPO" },
    { id: 38, name: "PMO" },
    { id: 39, name: "ROC" },
    { id: 40, name: "RSI" },
    { id: 41, name: "RSI (fast)" },
    { id: 42, name: "Rel Vigor Idx" },
    { id: 43, name: "Sto (Fast)" },
    { id: 44, name: "Sto (Slow)" },
    { id: 45, name: "Sto RSI" },
    { id: 46, name: "Sto RSI (Fast)" },
    { id: 47, name: "Std Dev" },
    { id: 48, name: "Supertrend" },
    { id: 49, name: "TSI" },
    { id: 50, name: "TWAP" },
    { id: 51, name: "Ultimate (O)" },
    { id: 52, name: "Ulcer" },
    { id: 53, name: "W %R" },
    { id: 54, name: "Wil Alligator" },
    { id: 55, name: "VWAP / MVWAP" },
    { id: 56, name: "Vortex" },
    { id: 57, name: "ZigZag" }
];

// Function to populate the select options
function populateSelectOptions() {
    selectElement.innerHTML = '';  // Clear previous options
    indicators.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.text = item.name;
        selectElement.appendChild(option);
    });
}

// Filter function for the alphabet
function filterOptionsByLetter(letter) {
    const filteredOptions = indicators.filter(item => item.name.startsWith(letter));
    selectElement.innerHTML = '';  // Clear previous options
    filteredOptions.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.text = item.name;
        selectElement.appendChild(option);
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
        if (letter === '#') {
            resetFilter();
        } else {
            filterOptionsByLetter(letter);
        }
    });
});

popupBtn.addEventListener('click', function () {
    popupBox.style.display = popupBox.style.display === 'block' ? 'none' : 'block';
});

// Populate options on load
populateSelectOptions();

// Close the popup when clicking outside of it
document.addEventListener('click', function (event) {
    if (!popupBtn.contains(event.target) && !popupBox.contains(event.target)) {
        popupBox.style.display = 'none';
    }
});
