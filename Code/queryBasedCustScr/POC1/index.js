// TODO Input sanitisation
// TODO Input validation

// JSON object storing available filters, sub-filters, and their respective operators
let filtersJson = {
    "Open": {
        "operators": [">", "<", "=", "!=", "<>"]
    },
    "High": {
        "operators": [">", "<", "=", "!=", "<>"]
    },
    "Low": {
        "operators": [">", "<", "=", "!=", "<>"]
    },
    "Close": {
        "operators": [">", "<", "=", "!=", "<>"]
    },
    "Market Capitalization": {
        "operators": [">", "<", "=", "!=", "<>"]
    }
};

let tsrCsQueryBox = document.getElementById("tsrCsQueryBox");
let suggestionsDiv = document.getElementById("tsrCsSuggestionsDiv");

tsrCsQueryBox.addEventListener("input", (e) => showMainfilterDropdown(e));

// Function to display filter suggestions when the user types in the query box.
const showMainfilterDropdown = function (e) {
    suggestionsDiv.innerHTML = ""; // Clear previous suggestions

    // Get the last typed word in lowercase for filtering suggestions
    let inputText = e.target.value.trim().split(/\s+/).pop().toLowerCase();
    let filters = Object.keys(filtersJson);

    // If the user types "AND" or "OR", move to a new line and show filter suggestions
    if (inputText === "and" || inputText === "or") {
        tsrCsQueryBox.value += "\n"; // Move cursor to a new line
        return showSuggestionsDiv(filtersJson); // Show main filters again
    }

    suggestionsDiv.style.left = e.offsetLeft;
    suggestionsDiv.style.top = (e.clientY + 50) + 'px';

    // Loop through filters and display only those matching the input text
    filters.forEach(filter => {
        if (filter.toLowerCase().startsWith(inputText)) {
            let div = document.createElement("div");
            div.innerHTML = filter;
            div.onclick = () => insertFilter(filter); // Insert the selected filter on click
            suggestionsDiv.appendChild(div);
        }
    });
    updateSuggestionsPosition();
};

// Function to insert a selected filter into the textarea.
function insertFilter(filterName) {
    let text = tsrCsQueryBox.value.trim().split("\n"); // Get current textarea content

    // Split text into words and get the last word
    let words = text[text.length - 1].split(/\s+/);
    let lastWord = words[words.length - 1].toUpperCase();

    // If the last word is "AND" or "OR", insert the new filter on a new line
    if (lastWord === "AND" || lastWord === "OR") {
        tsrCsQueryBox.value += filterName + " ";
        text = tsrCsQueryBox.value.trim().split("\n");
        words = text[text.length - 1].split(/\s+/);
    } else {
        // Remove the last incomplete word and insert the selected filter
        text = tsrCsQueryBox.value.trim().split("\n"); // splitting query into multiple lines
        tsrCsQueryBox.value = "";
        for (let i = 0; i < text.length; i++) {
            if (i == text.length - 1) {
                words = text[i].trim().split(/\s+/);
                words.pop();
                words.push(filterName);
                tsrCsQueryBox.value += words.join(" ") + " ";
            }
            else {
                words = text[i].trim().split(/\s+/);
                tsrCsQueryBox.value += words.join(" ") + "\n";
            }
        }

    }

    // Display operators or sub-filters related to the selected filter
    let subFilters = filtersJson;
    for (let i = 0; i < words.length; i++) {
        if (subFilters[words[i]]) {
            subFilters = subFilters[words[i]];
        }
    }
    showSuggestionsDiv(subFilters);
}

// Function to insert an operator into the textarea.

function insertOperator(operator) {
    tsrCsQueryBox.value += operator + " "; // Append operator to the query
    suggestionsDiv.innerHTML = ''; // Clear suggestions dropdown
}

// Function to display filter names or operators in the suggestions dropdown

function showSuggestionsDiv(filters) {
    updateSuggestionsPosition();

    suggestionsDiv.innerHTML = ''; // Clear previous suggestions

    // Get the filter keys if the object contains sub-filters or operators
    let filterNames;
    if (typeof filters === "object") {
        filterNames = Object.keys(filters);
    }

    // If the object contains "operators", display operator suggestions
    if ('operators' in filters) {
        filters.operators.forEach(operator => {
            let div = document.createElement("div");
            div.innerHTML = operator;
            div.onclick = () => insertOperator(operator);
            suggestionsDiv.appendChild(div);
        });
    } else {
        // Otherwise, display available filters
        filterNames.forEach(filterName => {
            let div = document.createElement("div");
            div.innerHTML = filterName;
            div.onclick = () => insertFilter(filterName);
            suggestionsDiv.appendChild(div);
        });
    }
}

function updateSuggestionsPosition() {
    let textarea = document.getElementById("tsrCsQueryBox");
    let suggestionsDiv = document.getElementById("tsrCsSuggestionsDiv");

    let cursorPosition = textarea.selectionStart;
    let textBeforeCursor = textarea.value.substring(0, cursorPosition);

    let tempSpan = document.createElement("span");
    tempSpan.style.visibility = "hidden";
    tempSpan.style.whiteSpace = "pre-wrap";
    tempSpan.style.position = "absolute";
    tempSpan.style.font = window.getComputedStyle(textarea).font;
    tempSpan.textContent = textBeforeCursor.replace(/\n/g, "\n\u200B"); // Handle new lines properly

    let textareaRect = textarea.getBoundingClientRect();

    document.body.appendChild(tempSpan);
    let rect = tempSpan.getBoundingClientRect();
    suggestionsDiv.style.top = `${textareaRect.top + rect.height + window.scrollY}px`;
    document.body.removeChild(tempSpan);

    let lines = textBeforeCursor.split("\n");
    let lastLine = lines[lines.length - 1];
    tempSpan.textContent = lastLine.replace(/\n/g, "\n\u200B"); // Handle new lines properly

    document.body.appendChild(tempSpan);
    rect = tempSpan.getBoundingClientRect();
    suggestionsDiv.style.left = `${textareaRect.left + rect.width}px`;
    document.body.removeChild(tempSpan);
}

function runCsQuery() {
    console.log(tsrCsQueryBox.value); // Log the query in the console
}
