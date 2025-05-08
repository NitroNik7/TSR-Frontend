// TODO Modify code such that on inserting operator, comparable fields are shown
// TODO modify conditions to work with both upper and lower case for and/or 
// TODO Input sanitisation
// TODO Input validation

// // !After entering a few keywords or conditions
// // Issue #1: Metric not getting inserted / last word not getting updated -- Solved
// // Issue #2: suggestionsDiv not showing matching metrics to entered text -- Solved
// ? Test Cases:
// 1. Multiple line input
// 2. Multiple keywords on same line
// 3. every keyword on new line

// TODO How to parse input

function runTsrCsQuery() {
  // console.log(tsrCsQueryBox.value); // Log the query in the console
  let isSyntaxValid = parseEnteredQuery();
  if (isSyntaxValid === true) {
    console.log("Syntax valid");
    syntaxErrorElement.innerHTML = `Syntax valid`;
    syntaxErrorElement.style.color = 'green';
  }

}

let syntaxErrorElement = document.getElementById("syntaxErrorMsg");
// parses entire query and returns true or false if it's syntax is valid
function parseEnteredQuery() {
  let query = tsrCsQueryBox.value;
  let queryLines = query.split(/\n/);
  let isValid = false;

  for (let i = 0; i < queryLines.length; i++) {
    isValid = parseLine(queryLines[i].trim().toLowerCase()); // ! Make sure stock metrics are all in lowercase only
    if (isValid == false) {
      console.error("Syntax error at line number", i + 1);
      syntaxErrorElement.innerHTML = `Syntax error at line number ${i + 1}`;
      syntaxErrorElement.style.color = 'red';
      break;
    }
  }

  return isValid;
}

// parses each line and returns true or false if it's syntax is valid
function parseLine(queryLine) {
  if (queryLine.includes("and"))
    queryLine = queryLine.split("and")[0].trim();

  if (queryLine.includes("or"))
    queryLine = queryLine.split("or")[0].trim();

  let lhs, rhs, subQueries = [];
  for (let i = 0; i < operators.length; i++) {
    // console.log(queryLine.includes(operators[i]));
    if (queryLine.includes(operators[i])) {
      subQueries.push(queryLine.split(operators[i])[0]);
      subQueries.push(queryLine.substring(queryLine.indexOf(operators[i]) + 1));
      subQueries = subQueries.map(str => str.trim());
      lhs = parseLine(subQueries[0]);
      rhs = parseLine(subQueries[1]);
      if (lhs == true && rhs == true)
        return true;
      break;
    }
    else {

      if (stockMetrics.price.includes(queryLine) || queryLine == "" || !isNaN(Number(queryLine)))
        return true; // TODO Add Comparable fields logic OR Match SubQuery with keywords
    }
  }
  return false;
}

function resetTsrCsQueryBox() {
  tsrCsQueryBox.value = "";
  tsrCsQueryBox.focus();
}

let tsrCsQueryBox = document.getElementById("tsrCsQueryBox");
let suggestionsDiv = document.getElementById("tsrCsSuggestionsDiv");

tsrCsQueryBox.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }

  // ? Issue: keydown handler runs before textarea value updates, i.e. before character entered is shown in it, thus,
  // ? after entering any word, eg. 'and' in the textarea, textarea value remains 'an'
  // * Thus, adding a timeout of 0ms so that keydown handler runs after character entered is shown inside textarea. 
  setTimeout(function () {
    showSuggestions(e);
  }, 0);
});

tsrCsQueryBox.addEventListener("focusout", function (e) {
  if (e.relatedTarget != suggestionsDiv) {
    suggestionsDiv.innerHTML = "";
  }
});

let stockMetrics = {
  "price": ["open", "high", "low", "close", "o1", "o2", "h1", "l1"],
  "funda": ["Market_Cap", "Operating_Profit", "Price_to_Earning"],
  "others": ["Volume"]
};
// let stockMetrics = {
//   "price": ["open", "high", "low", "close", "o1", "o2", "h1", "l1"],
//   "funda": ["Market Cap", "Operating Profit", "Price to Earning"],
//   "others": ["Volume"]
// };
let operators = ["<", ">", "=", "!=", "<", ">"];

// // TODO Add text filter logic
function showSuggestions(e) {

  let enteredWord = getKeyword(tsrCsQueryBox.selectionStart, tsrCsQueryBox.value).toLowerCase().trim();
  // console.log("enteredWord: ", enteredWord);
  let keyCode = e.key;

  // console.log("keyCode: ", keyCode, "Entered Word: ", enteredWord);
  if ((/[a-zA-Z]/).test(keyCode) && keyCode.length == 1) {
    suggestionsDiv.innerHTML = "";
    Object.entries(stockMetrics).forEach(metric => {

      let values = metric[1];
      for (let i = 0; i < values.length; i++) {

        if (values[i].toLowerCase().startsWith(enteredWord)) {
          let div = document.createElement("div");
          div.setAttribute("tabIndex", 1);
          div.innerHTML = values[i];
          div.addEventListener("pointerdown", () => {
            insertMetric(values[i]);
          });
          div.addEventListener("keydown", (e) => {
            if (e.key == "Enter") {
              e.preventDefault();
              insertMetric(values[i]);
              suggestionsDiv.innerHTML = "";
              tsrCsQueryBox.focus();
            }
          });

          /*
          // let header = document.createElement("div");
          // header.innerHTML = metric[0];
          // header.style.fontSize = "12px";
          // header.style.fontWeight = "bold";
          // header.style.backgroundColor = "grey";
          // header.style.color = "white";
          // suggestionsDiv.appendChild(header);
          */

          suggestionsDiv.appendChild(div);
        }
      }
    });
    // suggestionsDiv.addEventListener("keydown", navigateSuggestionsDiv);
  }
  // 37 - arrowLeft, 38 - arrowUp, 39 - arrowRight, 40 - arrowDown, 9 - tab
  else if (keyCode == "ArrowDown" || keyCode == "ArrowUp") {
    suggestionsDiv.focus();

    // Dispatching below event is required for focusing on first div inside suggestionsDiv 
    let ev = new Event("keydown");
    ev.key = "ArrowDown";
    suggestionsDiv.addEventListener("keydown", navigateSuggestionsDiv);
    suggestionsDiv.dispatchEvent(ev);
  }
  else {
    suggestionsDiv.innerHTML = "";
  }

  updateSuggestionsPosition();

  let textLines = tsrCsQueryBox.value.split(/\r?\n/);
  let words = textLines[textLines.length - 1].split(/\s+/);
  let lastword = words.pop().toLowerCase();

  if (lastword == "and" || lastword == "or") {
    tsrCsQueryBox.value += "\n";
    suggestionsDiv.innerHTML = "";
  }
}

// // TODO Add metric using Enter key
function insertMetric(metric) {

  let start = tsrCsQueryBox.selectionStart;
  let textLines = tsrCsQueryBox.value.split("\n");
  let sum = 0, words = [], updatedText = "";

  let isMetricAdded = false;
  let phrase;
  for (let i = 0; i < textLines.length; i++) {

    words = textLines[i].split(/\s+/); // splits a line into words seperated by either single or multiple whitespaces

    for (let j = 0; j < words.length; j++) {
      sum += words[j].length + 1; // Adding 1 to cover space character between words
      if (!isMetricAdded) {
        if (sum < start) {
          if (words[j] == "and" || words[j] == "or")
            updatedText += words[j];
          else
            updatedText += words[j] + " ";
        }
        else {
          updatedText += metric + " ";
          isMetricAdded = true;
        }
      }
      else {
        if (words[j] == "and" || words[j] == "or")
          updatedText += words[j];
        else
          updatedText += words[j] + " ";
      }
    }

    if (i != textLines.length - 1) {
      updatedText += "\n";
    }
  }


  tsrCsQueryBox.value = updatedText;
  // suggestionsDiv.innerHTML = "";
}

function updateSuggestionsPosition() {
  let textarea = document.getElementById("tsrCsQueryBox");
  let suggestionsDiv = document.getElementById("tsrCsSuggestionsDiv");

  let cursorPosition = textarea.selectionStart;
  let textBeforeCursor = textarea.value.substring(0, cursorPosition);

  let tempSpan = document.createElement("span");
  tempSpan.style.visibility = "hidden";
  tempSpan.style.whiteSpace = "break-spaces";
  tempSpan.style.position = "absolute";
  tempSpan.style.font = window.getComputedStyle(textarea).font;
  tempSpan.textContent = textBeforeCursor;
  tempSpan.style.width = textarea.getBoundingClientRect().width + "px";
  // console.log(tempSpan.textContent);

  // tempSpan.textContent = textBeforeCursor.replace(/\n/g, "\n\u200B"); // Handle new lines properly

  let textareaRect = textarea.getBoundingClientRect();

  // Setting offset from Top
  document.body.appendChild(tempSpan);
  let rect = tempSpan.getBoundingClientRect();
  suggestionsDiv.style.top = `${textareaRect.top + rect.height + window.scrollY + 10}px`;
  document.body.removeChild(tempSpan);

  // Setting offset from Left
  tempSpan.style.width = "unset";
  let lines = textBeforeCursor.split("\n");
  let lastLine = lines[lines.length - 1];
  if (lastLine == "")
    lastLine = ".";

  let cols = tsrCsQueryBox.cols;
  if (lastLine.length > cols) {
    let index = Math.round(lastLine.length / cols);
    if (index * cols < lastLine.length) {
      tempSpan.textContent = lastLine.substring(index * cols, lastLine.length);
    }
    else {
      index = Math.floor(lastLine.length / cols);
      tempSpan.textContent = lastLine.substring(index * cols, lastLine.length);
    }
    tempSpan.textContent = tempSpan.textContent.replace(/\n/g, "\n\u200B"); // Handle new lines properly
  }
  else {
    tempSpan.textContent = lastLine.replace(/\n/g, "\n\u200B"); // Handle new lines properly
  }

  document.body.appendChild(tempSpan);
  rect = tempSpan.getBoundingClientRect();
  if ((textareaRect.left + rect.width) > textareaRect.width) {

    suggestionsDiv.style.left = `${textareaRect.left + rect.width - textareaRect.width}px`;
  }
  else
    suggestionsDiv.style.left = `${textareaRect.left + rect.width}px`;

  // console.log(textareaRect.left, rect.width);
  document.body.removeChild(tempSpan);
}

// Event listener for detecting click on a keyword, and then showing corresponding Advanced options
tsrCsQueryBox.addEventListener("click", (e) => {

  // console.log("click");
  let selectionStartIdx = e.currentTarget.selectionStart;

  let keyword = getKeyword(selectionStartIdx, tsrCsQueryBox.value).trim();

  // console.log(keyword);
  showAdvancedOptions(selectionStartIdx, keyword);
});

const getKeyword = function getKeyword(selectionStartIdx, textValue) {
  let lines = textValue.split("\n");
  let words = [];
  for (let i = 0; i < lines.length; i++) {
    words.push(...lines[i].trim().split(/\s+/));
  }
  let sum = 0;
  let phrase = "", isPhrase = false;
  for (let j = 0; j < words.length; j++) {
    sum += words[j].length + 1; // adding 1 to include space
    if (!operators.includes(words[j]) && words[j] != "and" && words[j] != "or") {
      phrase += words[j] + " ";
    }
    else {
      if (sum > selectionStartIdx) {
        return phrase;
      }
      phrase = "";
    }

  }
  return phrase;
};

// * Create an advanced options div
// * div should be able to show multiple categories of options
// *

const showAdvancedOptions = function showAdvancedOptions(selectionStartIdx, keyword) {
  keyword = keyword.toLowerCase();
  let tsrCsAdvancedOptions = document.getElementById("tsrCsAdvancedOptions");
  if (keyword.includes("("))
    keyword = keyword.split("(")[0].trim();

  let keywords = ["open", "high", "low", "close", "volume"];
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

  // console.log(keyword.substring(keyword.indexOf("("), keyword.indexOf(")")));
  // storing current fields of the keyword
  let currentFields = keyword
    .substring(keyword.indexOf("("), keyword.indexOf(")"))
    .split(",");

  let currHistoricalTick = currentFields[0],
    currTick = currentFields[1];

  // console.log(currentFields);
  let historicalTicks = [
    "Latest,latest",
    "Previous(P-1),p1",
    "(P-2),p2",
    "(P-3),p3",
    "(P-4),p4",
    "(P-5),p5",
  ];
  let ticks = ["Tick (Current Screener Tick),Current", "Day,Day"];

  let historicalTickOptions = "";
  let tickOptions = "";

  for (let i = 0; i < historicalTicks.length; i++) {
    if (historicalTicks[i].split(",")[1] == currHistoricalTick)
      historicalTickOptions += `<option value="${historicalTicks[i].split(",")[1]
        }" selected>${historicalTicks[i].split(",")[0]}</option>`;
    else
      historicalTickOptions += `<option value="${historicalTicks[i].split(",")[1]
        }">${historicalTicks[i].split(",")[0]}</option>`;
  }

  for (let i = 0; i < ticks.length; i++) {
    if (ticks[i].split(",")[1] == currTick)
      tickOptions += `<option value="${ticks[i].split(",")[1]}" selected>${ticks[i].split(",")[0]
        }</option>`;
    else
      tickOptions += `<option value="${ticks[i].split(",")[1]}">${ticks[i].split(",")[0]
        }</option>`;
  }

  tsrCsAdvancedOptions.innerHTML = `
        <b style="font-size: 18px; color: black;">Advanced Options:</b>
        <br>
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
    words = lines[i].trim().split(/\s+/);

    for (let j = 0; j < words.length; j++) {
      sum += words[j].length + 1;
      if (sum > selectionStartIdx) {
        if (words[j].includes("(") && !keywordUpdated) {
          words[j] = words[j].split("(")[0];
          keywordUpdated = true;
        }
        if (keyword === words[j].toLowerCase()) {
          words[j] = words[j] + ` (${fields})`; // adding fields to the selected keyword
        }
      }
    }

    if (i < lines.length - 1)
      tsrCsQueryBox.value += words.join(" ") + "\n";
    // for adding last line of words, without new line character
    else
      tsrCsQueryBox.value += words.join(" ") + " ";
  }
};

function navigateSuggestionsDiv(e) {
  // console.log("navigateSuggestionsDiv: ", e);
  let childNodes = this.childNodes;
  let focusedElement = document.activeElement;
  let isChildFocused = false;

  if (e.key == 'ArrowDown' || e.key == 'ArrowUp') {
    for (let i = 0; i < childNodes.length; i++) {

      if (focusedElement == childNodes[i] && !isChildFocused) {
        isChildFocused = true;
        if (e.key == 'ArrowDown') {
          if (i < --childNodes.length)
            childNodes[i + 1].focus({
              focusVisible: false
            });
        }
        else if (e.key == 'ArrowUp') {
          if (i > 0)
            childNodes[i - 1].focus({
              focusVisible: false
            });
        }
      }
    }
    if (isChildFocused == false && childNodes.length != 0) {
      childNodes[0].focus({
        focusVisible: false
      });
    }
  }

  if (e.key == 'Escape') {
    suggestionsDiv.innerHTML = "";
  }
}

