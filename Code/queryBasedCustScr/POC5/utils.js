const getPhrase = function getPhrase(selectionStartIdx, textValue) {

    let lines = textValue.split("\n");
    let words = [];
    for (let i = 0; i < lines.length; i++) {
        words.push(...lines[i].trim().split(/\s+/));
    }
    let sum = 0;
    let phrase = "", isPhrase = false;
    for (let j = 0; j < words.length; j++) {
        words[j] = words[j].toLowerCase();
        if (words[j] != "and" && words[j] != "or")
            sum += words[j].length + 1; // adding 1 to include space
        else
            sum += words[j].length;
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

    return "";
};

function addHeaderToSuggestions(fieldCategory) {
    let header = document.createElement("section");
    header.innerHTML = fieldCategory.id;
    header.id = fieldCategory.id;
    header.style.fontSize = "12px";
    header.style.fontWeight = "bold";
    header.style.backgroundColor = "grey";
    header.style.color = "white";
    suggestionsDiv.appendChild(header);
}

function createDivForSuggestions(label, relatedOps, qlCategory, showRelatedOps) {
    let div = document.createElement("div");
    div.setAttribute("tabIndex", 1);
    div.innerHTML = label;
    div.classList.add("tsrSuggestion");
    // tsrCsQueryBox.setSelectionRange(tsrCsQueryBox.value.length, tsrCsQueryBox.value.length);

    div.addEventListener("pointerdown", () => {
        insertMetric(label, relatedOps, qlCategory, showRelatedOps);
    });
    div.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            e.preventDefault();
            insertMetric(label, relatedOps, qlCategory, showRelatedOps);
            // suggestionsDiv.innerHTML = "";
            // tsrCsQueryBox.focus();
        }
    });

    return div;
}

function createOpDivForSuggestions(op, qlCategory) {
    let div = document.createElement("div");
    div.setAttribute("tabIndex", 1);
    div.innerHTML = op;
    div.classList.add("tsrSuggestion");
    // tsrCsQueryBox.setSelectionRange(tsrCsQueryBox.value.length, tsrCsQueryBox.value.length);

    div.addEventListener("pointerdown", () => {
        insertOp(op, qlCategory);
    });
    div.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            e.preventDefault();
            insertOp(op, qlCategory);
            // suggestionsDiv.innerHTML = "";
            // tsrCsQueryBox.focus();
        }
    });
    operators.push(op);
    return div;
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
    tempSpan.textContent = textBeforeCursor == "" ? "." : textBeforeCursor;
    tempSpan.style.width = textarea.getBoundingClientRect().width + "px";
    // console.log(tempSpan.textContent);

    // tempSpan.textContent = textBeforeCursor.replace(/\n/g, "\n\u200B"); // Handle new lines properly

    let textareaRect = textarea.getBoundingClientRect();

    // Setting offset from Top
    document.body.appendChild(tempSpan);
    let rect = tempSpan.getBoundingClientRect();
    suggestionsDiv.style.top = `${textareaRect.top + rect.height + window.scrollY + 20}px`;
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
    if ((textareaRect.left + rect.width) > textareaRect.width)
        suggestionsDiv.style.left = `${textareaRect.left + rect.width - textareaRect.width}px`;
    else
        suggestionsDiv.style.left = `${textareaRect.left + rect.width}px`;

    // console.log(textareaRect.left, rect.width);
    document.body.removeChild(tempSpan);
}

function lineHasOperator(startIdx, relatedOps) {


    let lineNo = 0;
    let lineHasOperator = false;
    let textLines = tsrCsQueryBox.value.split(/\r?\n/);
    let sum = 0;
    for (let i = 0; i < textLines.length; i++) {
        sum += textLines[i].length + 1;

        if (sum > startIdx)
            lineNo = i;
    }
    let words = textLines[lineNo].split(/\s+/);
    for (let i = 0; i < relatedOps.length; i++) {
        if (words.includes(relatedOps[i])) {
            lineHasOperator = true;
        }
    }
    // console.log(lineHasOperator);
    return lineHasOperator;
}


function getAdvancedOptions(keyword) {
    for (let i = 0; i < DATA_MASTER.length; i++) { // for every qlCategory
        let qlCategory = DATA_MASTER[i].voArr;
        if (qlCategory != null) {
            for (let j = 0; j < qlCategory.length; j++) { // for every field category
                let fieldCategory = qlCategory[j].voArr;
                if (fieldCategory != null) {
                    for (let k = 0; k < fieldCategory.length; k++) { // for every field
                        if (keyword.toLowerCase() == fieldCategory[k].id.toLowerCase()) {
                            return fieldCategory[k].advancedOptions;
                        }
                    }
                }
            }
        }
    }
}

function modifyAdvancedOptionsDiv(keyword, advancedOptions, currentFields) {
    let tsrCsAdvancedOptions = document.getElementById("tsrCsAdvancedOptions");
    tsrCsAdvancedOptions.innerHTML = "";
    let selectionStartIdx = tsrCsQueryBox.selectionStart;
    let label, brElement = document.createElement('br');

    if (advancedOptions != null) {
        tsrCsAdvancedOptions.style.display = "block";
        let div = document.createElement("div");
        div.innerHTML = `<h4>Advanced Options</h4>`;
        // div.innerHTML = `<h4>Advanced Options</h4>
        // <h6>${keyword}</h6>`;
        tsrCsAdvancedOptions.appendChild(div);
        let i =0;

        Object.entries(advancedOptions).forEach(item => {

            if (item[1].inputType == "select") {
                label = document.createElement("label");
                label.innerHTML = `<b>${item[0]}:</b>`;
                label.htmlFor = item[1].inputType + item[0];

                let selectElement = document.createElement("select");
                selectElement.id = item[1].inputType + item[0];
                selectElement.onchange = () => { 
                    updateKeyword(selectionStartIdx, keyword, tsrCsAdvancedOptions.children);
                };

                item[1].options.forEach(option => {
                    let ele = document.createElement("option");
                    ele.innerHTML = option.label;
                    ele.value = option.value;
                    if(currentFields.includes(option.value))
                        ele.selected = 'selected';
                    selectElement.appendChild(ele);
                });

                tsrCsAdvancedOptions.appendChild(label);
                tsrCsAdvancedOptions.appendChild(selectElement);
            }
            else if (item[1].inputType == "input") {

                label = document.createElement("label");
                label.innerHTML = `<b>${item[0]}:</b>`;
                label.htmlFor = item[1].inputType + item[0];

                let inputElement = document.createElement("input");
                inputElement.id = item[1].inputType + item[0];
                inputElement.onchange = () => { 
                    updateKeyword(selectionStartIdx, keyword, tsrCsAdvancedOptions.children);
                };
                if(!isNaN(Number(currentFields[0])))
                    inputElement.value = Number(currentFields[0]) == 0 ? 21: Number(currentFields[0]);

                tsrCsAdvancedOptions.appendChild(label);
                tsrCsAdvancedOptions.appendChild(inputElement);

            }
        })
    }
    else {
        tsrCsAdvancedOptions.style.display = "none";
    }
}