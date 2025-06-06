// By Nitronik

let tsrCsQueryBox = document.getElementById("tsrCsQueryBox");
let suggestionsDiv = document.getElementById("tsrCsSuggestionsDiv");

let operators = [];

tsrCsQueryBox.addEventListener("keydown", (e) => {
    // if (e.key == "Enter") {
    //     e.preventDefault();
    // }

    if (e.key == "ArrowLeft" || e.key == "ArrowRight") {

        let selectionStartIdx = e.currentTarget.selectionStart;

        let keyword = getKeyword(selectionStartIdx, tsrCsQueryBox.value).trim();
        let phrase = getPhrase(selectionStartIdx, tsrCsQueryBox.value).trim();

        showAdvancedOptions(selectionStartIdx, keyword, phrase);
    }

    // * Solution for 
    // ! Bug #2: Reentering keyword, using keyboard on suggestionsDiv, inserts keyword incorrectly 
    if(e.key == "ArrowDown") {
        e.preventDefault();
    }

    // ? Issue: keydown handler runs before textarea value updates, i.e. before character entered is shown in it, thus,
    // ? after entering any word, eg. 'and' in the textarea, textarea value remains 'an'
    // * Thus, adding a timeout of 0ms so that keydown handler runs after character entered is shown inside textarea. 
    setTimeout(function () {
        showAllSuggestions(e);
    }, 0);
});

tsrCsQueryBox.addEventListener("focusout", function (e) {
    if (e.relatedTarget != null && e.relatedTarget != suggestionsDiv && !e.relatedTarget.classList.contains("tsrSuggestion")) {
        suggestionsDiv.innerHTML = "";
        return;
    }
    if(e.relatedTarget == null){
        suggestionsDiv.innerHTML = "";
    }
});

tsrCsQueryBox.addEventListener("click", (e) => { // Event listener for detecting click on a keyword, and then showing corresponding Advanced options

    let selectionStartIdx = e.currentTarget.selectionStart;

    let keyword = getKeyword(selectionStartIdx, tsrCsQueryBox.value).trim();
    // let currentFields = getKeyword(selectionStartIdx, tsrCsQueryBox.value).trim();
    let phrase = getPhrase(selectionStartIdx, tsrCsQueryBox.value).trim();
    
    // console.log("cursorPos",selectionStartIdx);
    console.log("phrase", phrase);
    console.log("keyword", keyword);

    showAdvancedOptions(selectionStartIdx, keyword, phrase);
});

let qlCat = "";
const showAllSuggestions = function showAllSuggestions(e) {

    let textLines = tsrCsQueryBox.value.split(/\r?\n/);
    let words = textLines[textLines.length - 1].trim().split(/\s+/);
    let lastword = words.pop().toLowerCase();

    if (lastword == "and" || lastword == "or") {
        // replaceWord(position, word);
        tsrCsQueryBox.value += "\n";
        tsrCsQueryBox.focus();
        suggestionsDiv.innerHTML = "";
    }

    let keyCode = e.key;

    if (((/[a-zA-Z]/).test(keyCode) && keyCode.length == 1) || keyCode == "Backspace") {
        let enteredWord = getPhrase(tsrCsQueryBox.selectionStart, tsrCsQueryBox.value).toLowerCase().trim();
        
        suggestionsDiv.innerHTML = "";

        for (let i = 0; i < DATA_MASTER.length; i++) { // for every qlCategory
            let qlCategory = DATA_MASTER[i].voArr;
            if (qlCategory != null) {
                for (let j = 0; j < qlCategory.length; j++) { // for every field category
                    let fieldCategory = qlCategory[j].voArr;
                    if (fieldCategory != null) {
                        let isHeaderAdded = false;
                        for (let k = 0; k < fieldCategory.length; k++) { // for every field
                            let label = fieldCategory[k].label;
                            let defaultVal = fieldCategory[k].defaultVal;
                            if (label.toLowerCase().startsWith(enteredWord) && enteredWord != "") {
                                if (!isHeaderAdded) {
                                    addHeaderToSuggestions(qlCategory[j]);
                                    isHeaderAdded = true;
                                }
                                let div = createDivForSuggestions(label, defaultVal, qlCategory[j].relatedOps, fieldCategory[k].qlCat, true);
                                suggestionsDiv.appendChild(div);
                            }

                            // Do not show any related operators if line has an operator already
                            if (!lineHasOperator(tsrCsQueryBox.selectionStart, operators)) {
                                // console.log("here");
                                if (label.toLowerCase() === enteredWord) {
                                    tsrCsQueryBox.value += " ";
                                    qlCat = fieldCategory[k].qlCat;
                                    showRelatedOperators(qlCategory[j].relatedOps, fieldCategory[k].qlCat);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else if(operators.includes(keyCode) && keyCode.length == 1 || operators.includes(lastword)){
        tsrCsQueryBox.value += " ";
        showRelatedSuggestions(qlCat);

        suggestionsDiv.focus();
        // Dispatching below event is required for focusing on first div inside suggestionsDiv 
        let ev = new Event("keydown");
        ev.key = "ArrowDown";
        suggestionsDiv.addEventListener("keydown", navigateSuggestionsDiv);
        suggestionsDiv.dispatchEvent(ev);
    }
    else if (keyCode == "ArrowDown" || keyCode == "ArrowUp") {
        // e.preventDefault();
        // e.stopPropagation();
        suggestionsDiv.focus();
        // Dispatching below event is required for focusing on first div inside suggestionsDiv 
        let ev = new Event("keydown");
        ev.key = "ArrowDown";
        suggestionsDiv.addEventListener("keydown", navigateSuggestionsDiv);
        suggestionsDiv.dispatchEvent(ev);
        // ev.preventDefault();
    }
    else {
        suggestionsDiv.innerHTML = "";
    }

    updateSuggestionsPosition();

}

const insertMetric = function insertMetric(metric, defaultVal, relatedOps, qlCategory, showRelatedOps) {

    qlCat = qlCategory;
    let start = tsrCsQueryBox.selectionStart;

    let textLines = tsrCsQueryBox.value.split("\n");
    let sum = 0, words = [], updatedText = "";

    let isMetricAdded = false;

    for (let i = 0; i < textLines.length; i++) {

        words = textLines[i].split(" "); // splits a line into words seperated by either single or multiple whitespaces

        for (let j = 0; j < words.length; j++) {
            sum += words[j].length + 1; // Adding 1 to cover space character between words

            if (!isMetricAdded) {
                if (sum <= start) {
                    if (words[j] == "and" || words[j] == "or")
                        updatedText += words[j];
                    else
                        updatedText += words[j] + " ";
                }
                else {
                    if(defaultVal.length > 0)
                        updatedText += metric + " (" + defaultVal + ") ";
                    else
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

    if (showRelatedOps == true && !lineHasOperator(start, relatedOps))
        showRelatedOperators(relatedOps, qlCategory);
    else {
        suggestionsDiv.innerHTML = "";
    }

    tsrCsQueryBox.focus();
    // showAdvancedOptions(start, metric);
}

const insertOp = function insertOp(op, qlCategory) {
    // let text = tsrCsQueryBox.value.trim() + " ";
    // tsrCsQueryBox.setSelectionRange(text.length, text.length);

    let start = tsrCsQueryBox.selectionStart;

    let textLines = tsrCsQueryBox.value.split("\n");
    let sum = 0, words = [], updatedText = "";

    let isOpAdded = false;

    for (let i = 0; i < textLines.length; i++) {

        words = textLines[i].split(" "); // splits a line into words seperated by either single or multiple whitespaces

        for (let j = 0; j < words.length; j++) {
            sum += words[j].length + 1; // Adding 1 to cover space character between words
            if (!isOpAdded) {
                if (sum <= start) {
                    if (words[j] == "and" || words[j] == "or")
                        updatedText += words[j];
                    else
                        updatedText += words[j] + " ";
                }
                else {
                    updatedText += op + " ";
                    isOpAdded = true;
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

    showRelatedSuggestions(qlCategory);

    tsrCsQueryBox.focus();
}

const showRelatedOperators = function showRelatedOperators(relatedOps, qlCategory) {
    suggestionsDiv.innerHTML = "";

    let enteredWord = getKeyword(tsrCsQueryBox.selectionStart, tsrCsQueryBox.value);

    for (let k = 0; k < relatedOps.length; k++) { // for every field
        let op = relatedOps[k];
        if (op.toLowerCase().startsWith(enteredWord) || enteredWord == "") {
            let div = createOpDivForSuggestions(op, qlCategory);
            suggestionsDiv.appendChild(div);
        }

        if (op.toLowerCase() === enteredWord) {
            showRelatedSuggestions(qlCategory);
        }
    }
    suggestionsDiv.focus();
    updateSuggestionsPosition();
}

const showRelatedSuggestions = function showRelatedSuggestions(qlCat) {
    suggestionsDiv.innerHTML = "";

    let enteredWord = getKeyword(tsrCsQueryBox.selectionStart, tsrCsQueryBox.value).toLowerCase().trim();

    for (let i = 0; i < DATA_MASTER.length; i++) { // for every qlCategory
        let qlCategory = DATA_MASTER[i].voArr;
        if (qlCategory != null) {
            for (let j = 0; j < qlCategory.length; j++) { // for every field category
                let fieldCategory = qlCategory[j].voArr;
                if (fieldCategory != null) {
                    let isHeaderAdded = false;
                    for (let k = 0; k < fieldCategory.length; k++) { // for every field
                        if (fieldCategory[k].qlCat === qlCat) {
                            let label = fieldCategory[k].label;
                            let defaultVal = fieldCategory[k].defaultVal;
                            if (label.toLowerCase().startsWith(enteredWord) || enteredWord == "" || operators.includes(enteredWord)) {
                                if (!isHeaderAdded) {
                                    addHeaderToSuggestions(qlCategory[j]);
                                    isHeaderAdded = true;
                                }
                                let div = createDivForSuggestions(label, defaultVal, qlCategory[j].relatedOps, fieldCategory[k].qlCat, false);
                                suggestionsDiv.appendChild(div);
                            }

                            // * Uncomment below lines to show related Operators after user enters an operator from the keyboard
                            // if (label.toLowerCase() === enteredWord) {
                            //     tsrCsQueryBox.value += " ";
                            //     showRelatedOperators(qlCategory[j].relatedOps, fieldCategory[k].qlCat);
                            // }
                        }
                    }
                }
            }
        }
    }

    suggestionsDiv.focus();
    updateSuggestionsPosition();

    
    

}

function navigateSuggestionsDiv(e) {
    // console.log("navigateSuggestionsDiv: ", e);
    let childNodes = this.getElementsByTagName("div");
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

// * Create an advanced options div
// * div should be able to show multiple categories of options
// *

const showAdvancedOptions = function showAdvancedOptions(selectionStartIdx, keyword, phrase) {
    keyword = phrase.toLowerCase();
    let tsrCsAdvancedOptions = document.getElementById("tsrCsAdvancedOptions");
    if (keyword.includes("("))
        keyword = keyword.split("(")[0].trim();

    if (keyword == "") {
        tsrCsAdvancedOptions.style.display = "none";
        tsrCsAdvancedOptions.innerHTML = "";
        return;
    }

    let currentFieldsStr = "";
    let currentFields = [];
    if (phrase.includes(keyword)) {
        currentFieldsStr = phrase.split(keyword)[1].trim();
        currentFieldsStr = currentFieldsStr.substring(1, currentFieldsStr.length - 1);

        currentFields = currentFieldsStr.split(",");
    }

    let advancedOptions = getAdvancedOptions(keyword);

    modifyAdvancedOptionsDiv(keyword, advancedOptions, currentFields);
};

const updateKeyword = function updateKeyword(selectionStartIdx, keyword, advancedOptions) {

    let fields = [];

    for (let i = 0; i < advancedOptions.length; i++) {
        if (advancedOptions[i].tagName == 'SELECT' || advancedOptions[i].tagName == 'INPUT')
            fields.push(advancedOptions[i].value);
    }

    let text = tsrCsQueryBox.value;
    let lines = text.trim().split("\n");

    tsrCsQueryBox.value = "";

    let words;
    let sum = 0, isKeywordUpdated = false;
    for (let i = 0; i < lines.length; i++) {
        words = lines[i].trim().split(/\s+/);

        for (let j = 0; j < words.length; j++) {
            if (words[j] != "and" || words[j] != "or")
                sum += words[j].length + 1;
            else
                sum += words[j].length;

            if (sum > selectionStartIdx) {
                if (words[j].includes("(") && !isKeywordUpdated) { //  && !isKeywordUpdated condition so that other keyword fields are not updated once req. keyword fields are changed
                    if (j - 1 >= 0) {
                        let preceedingWord = words[j - 1].toLowerCase();
                        if(preceedingWord == keyword){
                            words[j] = `(${fields})`;
                            isKeywordUpdated = true;
                        }
                    }
                    else
                        words[j] = words[j].split("(")[0];  
                    
                }
                if (keyword === words[j].toLowerCase() && !isKeywordUpdated) {
                    words[j] = words[j] + ` (${fields})`; // adding fields to the selected keyword

                    if (j + 1 < words.length) {
                        let succeedingWord = words[j + 1];
                        if (succeedingWord.indexOf("(") == 0) {
                            words[j + 1] = "";
                        }
                    }
                    isKeywordUpdated = true;
                }
            }
        }

        let wordsInLine = [];

        for (let i = 0; i < words.length; i++) {
            if (words[i] != "")
                wordsInLine.push(words[i])

        }
        let text;
        if (i < lines.length - 1) {
            text = wordsInLine.join(" ") + "\n";
            tsrCsQueryBox.value += text;
        }
        // for adding last line of words, without new line character
        else {
            text = wordsInLine.join(" ");
            tsrCsQueryBox.value += text;
        }
    }
};