
let syntaxErrorElement = document.getElementById("syntaxErrorMsg");

function runTsrCsQuery() {
    // console.log(tsrCsQueryBox.value); // Log the query in the console
    let isSyntaxValid = parseEnteredQuery();
    if (isSyntaxValid === true) {
        // console.log("Syntax valid");
        syntaxErrorElement.innerHTML = `Syntax valid`;
        syntaxErrorElement.style.color = 'green';
    }
}

// parses entire query and returns true or false if it's syntax is valid
function parseEnteredQuery() {
    let query = tsrCsQueryBox.value;
    let queryLines = query.split(/\n/);
    let isValid = false;

    for (let i = 0; i < queryLines.length; i++) {
        isValid = parseLine(queryLines[i].trim().toLowerCase()); // ! Make sure stock metrics are all in lowercase only
        if (isValid == false) {
            // console.error("Syntax error at line number", i + 1);
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

            if (stockMetrics.price.fields.includes(queryLine) || queryLine == "" || !isNaN(Number(queryLine)))
                return true; // TODO Add Comparable fields logic OR Match SubQuery with keywords
        }
    }
    return false;
}

function resetTsrCsQueryBox() {
    tsrCsQueryBox.value = "";
    tsrCsQueryBox.focus();
}