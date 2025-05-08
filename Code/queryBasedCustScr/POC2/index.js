// TODO Modify code such that on inserting operator, comparable fields are shown

// TODO Input sanitisation
// TODO Input validation

// * How to modify above code so that on inserting operator, comparable fields are shown ???
// * modify insertOp()

function runTsrCsQuery() {
  console.log(tsrCsQueryBox.value); // Log the query in the console
}

function resetTsrCsQueryBox() {
  tsrCsQueryBox.value = "";
  tsrCsQueryBox.focus();
}

// JSON object storing available filters, sub-filters, and their respective operators
let filtersJson = {
  Open: {
    operators: [">", "<", "=", "!=", "<>"],
    comparableFields: ["cf1", "cf2", "cf3", "cf4", "cf5"],
  },
  High: {
    operators: [">", "<", "=", "!=", "<>"],
    comparableFields: ["cf1", "cf2", "cf3", "cf4", "cf5"],
  },
  Low: {
    operators: [">", "<", "=", "!=", "<>"],
    comparableFields: ["cf1", "cf2", "cf3", "cf4", "cf5"],
  },
  Close: {
    operators: [">", "<", "=", "!=", "<>"],
    comparableFields: ["cf1", "cf2", "cf3", "cf4", "cf5"],
  },
  "Market Capitalization": {
    operators: [">", "<", "=", "!=", "<>"],
    comparableFields: ["cf1", "cf2", "cf3", "cf4", "cf5"],
    // comparableFields: ["PE, PB, ROA, ROE, Debt to Equity, Revenue, Net Income"],
  },
};

let tsrCsQueryBox = document.getElementById("tsrCsQueryBox");
let suggestionsDiv = document.getElementById("tsrCsSuggestionsDiv");

tsrCsQueryBox.addEventListener("input", (e) => showMainFiltersDropdown(e));

// Event listener for detecting click on a keyword, and then showing corresponding Advanced options
tsrCsQueryBox.addEventListener("click", (e) => {
  let selectionStartIdx = e.currentTarget.selectionStart;
  let keyword = getKeyword(selectionStartIdx, tsrCsQueryBox.value);

  showAdvancedOptions(selectionStartIdx, keyword);
});

// Function to display filter suggestions when the user types in the query box.
const showMainFiltersDropdown = function (e) {
  let words = e.target.value.trim().split(/\s+/);
  console.log(words.length);
  if (words.length >= 2) {
    // if current line contains more than 1 word and a space, then return
    return;
  }

  suggestionsDiv.innerHTML = ""; // Clear previous suggestions
  // Get the last typed word in lowercase for filtering suggestions

  let inputText = words.pop().toLowerCase();
  let filters = Object.keys(filtersJson);

  // If the user types "AND" or "OR", move to a new line and show main filters suggestions again
  if (inputText === "and" || inputText === "or") {
    tsrCsQueryBox.value += "\n"; // Move cursor to a new line
    return showSuggestionsDiv(filtersJson); // Show main filters again
  }

  suggestionsDiv.style.left = e.offsetLeft;
  suggestionsDiv.style.top = e.clientY + 50 + "px";

  // Loop through filters and display only those matching the input text
  filters.forEach((filter) => {
    if (filter.toLowerCase().startsWith(inputText)) {
      let div = document.createElement("div");
      div.innerHTML = filter;
      div.onclick = () => insertFilter(filter); // Insert the selected filter on click
      suggestionsDiv.appendChild(div);

      // ! WHY BELOW CODE
      // if (inputText === filter.toLowerCase())
      // showAdvancedOptions(e.target.selectionStart, inputText);
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

  // Insert the new filter on a new line, if the last word is "AND" or "OR"
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

        showAdvancedOptions(tsrCsQueryBox.value.selectionEnd, filterName);
        tsrCsQueryBox.value += words.join(" ") + " ";
      } else {
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

let operators = [">", "<", "=", "!=", "<>"];

// Function to insert an operator into the textarea.
function insertOperator(operator) {
  let text = tsrCsQueryBox.value.trim().split("\n");
  let words = text[text.length - 1].split(/\s+/);

  tsrCsQueryBox.value += operator + " "; // Append operator to the query
  suggestionsDiv.innerHTML = ""; // Clear suggestions dropdown

  let subFilters = filtersJson;
  for (let i = 0; i < words.length; i++) {
    if (!(words[i] != " " && operators.includes(words[i]))) {
      if (subFilters[words[i]]) {
        subFilters = subFilters[words[i]];
      }
    }
  }

  showSuggestionsDiv(subFilters.comparableFields);
}

// Function to display filter names or operators in the suggestions dropdown
function showSuggestionsDiv(filters, e) {
  if (filters == null) {
    filters = filtersJson;
  }

  let inputText = "";

  if (e != undefined)
    inputText = e.target.value.trim().split(/\s+/).pop().toLowerCase();

  updateSuggestionsPosition();

  suggestionsDiv.innerHTML = ""; // Clear previous suggestions

  // Get the filter keys if the object contains sub-filters or operators
  let filterNames;
  if (Array.isArray(filters)) filterNames = filters;
  else if (typeof filters === "object") {
    filterNames = Object.keys(filters);
  } else {
    filterNames = filters;
  }

  // If the object contains "operators", display operator suggestions
  if ("operators" in filters) {
    filters.operators.forEach((operator) => {
      let div = document.createElement("div");
      div.innerHTML = operator;
      div.onclick = () => insertOperator(operator, filters.comparableFields);
      suggestionsDiv.appendChild(div);
    });
  } else {
    filterNames.forEach((filterName) => {
      if (filterName.toLowerCase().startsWith(inputText)) {
        let div = document.createElement("div");
        div.innerHTML = filterName;
        div.onclick = () => insertFilter(filterName); // Insert the selected filter on click
        suggestionsDiv.appendChild(div);

        // ! WHY BELOW CODE
        // if (inputText === filter.toLowerCase())
        // showAdvancedOptions(e.target.selectionStart, inputText);
      } else {
        let div = document.createElement("div");
        div.innerHTML = filterName;
        div.onclick = () => insertFilter(filterName); // Insert the selected filter on click
        suggestionsDiv.appendChild(div);
      }
    });
    // Otherwise, display available filters
    // filterNames.forEach((filterName) => {
    //   let div = document.createElement("div");
    //   div.innerHTML = filterName;
    //   div.onclick = () => insertFilter(filterName);
    //   suggestionsDiv.appendChild(div);
    // });
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
  suggestionsDiv.style.top = `${
    textareaRect.top + rect.height + window.scrollY
  }px`;
  document.body.removeChild(tempSpan);

  let lines = textBeforeCursor.split("\n");
  let lastLine = lines[lines.length - 1];
  tempSpan.textContent = lastLine.replace(/\n/g, "\n\u200B"); // Handle new lines properly

  document.body.appendChild(tempSpan);
  rect = tempSpan.getBoundingClientRect();
  suggestionsDiv.style.left = `${textareaRect.left + rect.width}px`;
  document.body.removeChild(tempSpan);
}

const getKeyword = function getKeyword(selectionStartIdx, textValue) {
  let lines = textValue.split("\n");
  let words = [];
  for (let i = 0; i < lines.length; i++) {
    words.push(...lines[i].trim().split(" "));
  }
  let sum = 0;

  for (let j = 0; j < words.length; j++) {
    sum += words[j].length + 1; // adding 1 to include space
    if (sum > selectionStartIdx) return words[j];
  }
};

// * Create an advanced options div
// * div should be able to show multiple categories of options
// *
const showAdvancedOptions = function showAdvancedOptions(
  selectionStartIdx,
  keyword
) {
  keyword = keyword.toLowerCase();
  let tsrCsAdvancedOptions = document.getElementById("tsrCsAdvancedOptions");

  let keywords = ["open", "high", "low", "close"];
  if (keyword == "") {
    tsrCsAdvancedOptions.style.display = "none";
    tsrCsAdvancedOptions.innerHTML = "";
    return;
  }

  if (!keywords.includes(keyword)) {
    tsrCsAdvancedOptions.style.display = "none";
    tsrCsAdvancedOptions.innerHTML = "";
    return;
  }

  tsrCsAdvancedOptions.style.display = "block";

  let selectedFields = {
    historicalTick: "",
    tick: "",
  };

  console.log(keyword.substring(keyword.indexOf("("), keyword.indexOf(")")));
  let currentFields = keyword
    .substring(keyword.indexOf("("), keyword.indexOf(")"))
    .split(",");

  let currHistoricalTick = currentFields[0],
    currTick = currentFields[1];

  let historicalTicks = [
    "Latest, latest",
    "Previous(P-1), p1",
    "(P-2), p2",
    "(P-3), p3",
    "(P-4), p4",
    "(P-5), p5",
  ];
  let ticks = ["Tick (Current Screener Tick), Current", "Day, Day"];

  let historicalTickOptions = "";
  let tickOptions = "";

  for (let i = 0; i < historicalTicks.length; i++) {
    if (historicalTicks[i].split(",")[1] == currHistoricalTick)
      historicalTickOptions += `<option value="${
        historicalTicks[i].split(",")[1]
      }" selected>${historicalTicks[i].split(",")[0]}</option>`;
    else
      historicalTickOptions += `<option value="${
        historicalTicks[i].split(",")[1]
      }">${historicalTicks[i].split(",")[0]}</option>`;
  }

  for (let i = 0; i < ticks.length; i++) {
    if (ticks[i].split(",")[1] == currTick)
      tickOptions += `<option value="${ticks[i].split(",")[1]}" selected>${
        ticks[i].split(",")[0]
      }</option>`;
    else
      tickOptions += `<option value="${ticks[i].split(",")[1]}">${
        ticks[i].split(",")[0]
      }</option>`;
  }

  tsrCsAdvancedOptions.innerHTML = `
        <b style="font-size: 18px;">Advanced Options:</b>
            <select name="" id="historicalTick" onchange="updateKeyword(${selectionStartIdx}, '${keyword}', ['historicalTick','tick'])">
                ${historicalTickOptions}
            </select>
            <select name="" id="tick" onchange="updateKeyword(${selectionStartIdx}, '${keyword}', ['historicalTick','tick'])">
                ${tickOptions}
            </select>
    `;
};

const updateKeyword = function updateKeyword(selectionStartIdx, keyword, IDs) {
  // Need to update keywords only
  // Keywords: Open, High, Low, Close etc...
  // else return
  console.log(keyword);
  let fields = [];
  for (let i = 0; i < IDs.length; i++) {
    fields.push(document.getElementById(IDs[i]).value);
  }

  let keywords = ["open", "high", "low", "close"];

  if (keyword == "") {
    return;
  }

  if (!keywords.includes(keyword)) {
    return;
  }

  let text = tsrCsQueryBox.value;
  let lines = text.trim().split("\n");

  let words;
  tsrCsQueryBox.value = "";
  let sum = 0,
    keywordUpdated = false;
  for (let i = 0; i < lines.length; i++) {
    words = lines[i].trim().split(" ");

    for (let j = 0; j < words.length; j++) {
      sum += words[j].length + 1;
      if (sum > selectionStartIdx) {
        if (words[j].includes("(") && !keywordUpdated) {
          words[j] = words[j].split("(")[0];
          keywordUpdated = true;
        }
        if (keyword === words[j].toLowerCase()) {
          words[j] = words[j] + `(${fields})`; // adding fields to the selected keyword
        }
      }
    }

    if (i < lines.length - 1) tsrCsQueryBox.value += words.join(" ") + "\n";
    // for adding last line of words, without new line character
    else tsrCsQueryBox.value += words.join(" ") + " ";
  }
};

