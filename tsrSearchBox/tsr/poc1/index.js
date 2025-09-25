

let data = [
    {
        code: "AAATech",
        name: "AAA Technologies Ltd.",
        industry: "COMPUTERS - SOFTWARE - INDIA",
    },
    {
        code: "AXISBPSETF",
        name: "AXIS MUTUAL FUND - Axis Nifty AAA Bond Plus SDL Apr 2026 50-50 ETF",
        industry: "FINANCE - INDIA",
    }, {
        code: "CEDAAR",
        name: "Cedaar Textile Limited",
        industry: "TEXTILES - COTTON - INDIA",
    }, {
        code: "DIAMONDYD",
        name: "Prataap Snacks Ltd.",
        industry: "FOOD AND FOOD PROCESSING - INDIA",
    }, {
        code: "IMAGICAA",
        name: "Imagicaaworld Entertainment Ltd.",
        industry: "MEDIA & ENTERTAINMENT - INDIA",
    }
];

let chartData = [];

let screenerData = [];


// Dummy equityData array with 25 items
let equityData = [
    {
        code: "EQ001", name: "Equity One Ltd.", industry: "FINANCE - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ002", name: "Equity Two Ltd.", industry: "TechNOLOGY - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ003", name: "Equity Three Ltd.", industry: "PHARMA - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ004", name: "Equity Four Ltd.", industry: "AUTOMOBILE - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ005", name: "Equity Five Ltd.", industry: "TEXTILE - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ006", name: "Equity Six Ltd.", industry: "ENERGY - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ007", name: "Equity Seven Ltd.", industry: "BANKING - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ008", name: "Equity Eight Ltd.", industry: "CHEMICALS - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ009", name: "Equity Nine Ltd.", industry: "INFRASTRUCTURE - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ010", name: "Equity Ten Ltd.", industry: "MEDIA - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ011", name: "Equity Eleven Ltd.", industry: "RETAIL - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ012", name: "Equity Twelve Ltd.", industry: "FOOD - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ013", name: "Equity Thirteen Ltd.", industry: "LOGISTICS - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ014", name: "Equity Fourteen Ltd.", industry: "REAL ESTATE - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ015", name: "Equity Fifteen Ltd.", industry: "IT SERVICES - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ016", name: "Equity Sixteen Ltd.", industry: "TELECOM - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ017", name: "Equity Seventeen Ltd.", industry: "FMCG - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ018", name: "Equity Eighteen Ltd.", industry: "METALS - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ019", name: "Equity Nineteen Ltd.", industry: "OIL & GAS - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ020", name: "Equity Twenty Ltd.", industry: "POWER - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ021", name: "Equity Twenty-One Ltd.", industry: "AGRICULTURE - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ022", name: "Equity Twenty-Two Ltd.", industry: "DEFENSE - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ023", name: "Equity Twenty-Three Ltd.", industry: "AVIATION - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ024", name: "Equity Twenty-Four Ltd.", industry: "TOURISM - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    },
    {
        code: "EQ025", name: "Equity Twenty-Five Ltd.", industry: "EDUCATION - INDIA",
        urls: {
            "BirdsEyeView": "https://example.com",
            "MA": "https://example.com",
            "Tech": "https://example.com",
            "Funda": "https://example.com",
            "Fno": "https://example.com"
        }
    }
];


function getSearchBoxHtml(option) {


    let html = ``;

    html += `
    
        <div class="radioBtns ms-2">
            <input type="radio" name="stockBaskets" id="chartBasket" onclick="showTsrSearchBox('chart')" 
            ${(option == "chart" ? "checked" : "")}>
            <label for="chartBasket">Charts</label>

            <input type="radio" name="stockBaskets" id="equityBasket" onclick="showTsrSearchBox('equity')"
            ${(option == "equity" ? "checked" : "")}>
            <label for="equityBasket">Equity</label>

            <input type="radio" name="stockBaskets" id="screenerBasket" onclick="showTsrSearchBox('screener')"
            ${(option == "screener" ? "checked" : "")}>
            <label for="screenerBasket">Screeners</label>
        </div>

        <hr>

        <div class="d-flex">`;

    html += `    <input id="tsrStockSearch" type="text" class="form-control ui-autocomplete-input mx-2"
                placeholder="Search a Stock / Screener" autocomplete="off">`;

    html += `<select
                style="border-radius: 6px; height: 35px;  box-shadow: inset 0px 0px 0px 0px red; text-shadow: none; border-color: #C0C0C0; background-color:white; width: 20%"
                id="eqSubCat" onchange="JavaScript:miSrch.sc('sc');" class="mx-2">
                <option value="any">All </option>
                <option value=""Funda"mentalAnalysis">Stock "Funda"mentals</option>
                <option value=""Tech"nicalAnalysis">Stock "Tech"nicals</option>
                <option value="PivotPoint">Stock Pivot Point</option>
            </select>
        </div>

        <div class="mt-3">
            <ul id="tsrStockList"></ul>
        </div>
    
    `;

    /*

        <option value="Screener">Screener Only</option>
                        <option value="Candlestick">Stock Candlestick</option>
                        <option value=""BirdsEyeView"">Stock Birds Eye View</option>
                    <option value="InteractiveCharts">Stock Interactive Charts</option>


    */

    return html;
}

function showTsrSearchBox(option) {

    let dialog = document.getElementById("tsrMoreInfoPopup");

    if (dialog) {
        closeDialog(dialog);
    }


    if (option == "equity") {
        let html = getSearchBoxHtml(option);
        createDialog(false, html);
        filterStocks('', equityData);

        let input = document.getElementById("tsrStockSearch");
        input.addEventListener("input", () => { filterStocks(input.value, equityData) });
    }
    else if (option == "screener") {
        let html = getSearchBoxHtml(option);
        createDialog(false, html);
        filterStocks('', screenerData);

        let input = document.getElementById("tsrStockSearch");
        input.addEventListener("input", () => { filterStocks(input.value) });
    }
    else if (option == "chart") {
        let html = getSearchBoxHtml(option);
        createDialog(false, html);
        filterStocks('', chartData);

        let input = document.getElementById("tsrStockSearch");
        input.addEventListener("input", () => { filterStocks(input.value, chartData) });
    }

}


function createDialog(isImg, html) {
    let dialog = document.createElement("dialog");
    dialog.id = "tsrMoreInfoPopup";
    // dialog.classList.add("border", "bg-light", "border", "rounded", "shadow-lg", "w-75");
    dialog.classList.add("border", "border", "rounded", "shadow-lg", "w-75");

    document.body.style.overflow = "hidden";


    let closeDiv = document.createElement("div");
    let closeBtn = document.createElement("button");
    closeBtn.classList.add("btn-close");
    closeBtn.onclick = closeDialog;

    closeDiv.setAttribute("align", "right");
    closeDiv.classList.add("mb-2");
    closeDiv.appendChild(closeBtn);

    let contentDiv = document.createElement("div");
    contentDiv.style.maxWidth = "80vw";
    contentDiv.style.maxHeight = "80vh";
    // contentDiv.style.overflowX = "visible";
    contentDiv.style.overflowY = "hidden";
    // contentDiv.classList.add("border", "border-5", "rounded");


    if (isImg) {
        let img = document.createElement("img");
        img.classList.add("m-3")
        img.src = html;
        contentDiv.appendChild(img);
    } else {
        contentDiv.innerHTML = html;
    }

    dialog.appendChild(closeDiv);
    dialog.appendChild(contentDiv);

    document.body.appendChild(dialog);

    dialog.showModal();

    dialog.addEventListener("keydown", handleKeydownOnDialog);
}

let handleKeydownOnDialog = (e) => { handleKeydown(e, "tsrMoreInfoPopup") };

function handleKeydown(e, dialogId) {

    let dialog = document.getElementById(dialogId);
    if (e.key === "Escape") {
        closeDialog(dialog);
    }
    else if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
        console.log(document.activeElement);
        let list = dialog.querySelector("ul");

        let listElements = list.childNodes;

        let listItemHasFocus = false;

        if (listElements.length != 0) {
            for (let i = 0; i < listElements.length; i++) {
                if (listElements[i] == document.activeElement) {
                    listItemHasFocus = true;
                }
            }

            if (!listItemHasFocus) {
                listElements[0].focus();

            }
        }
    }
}

function closeDialog(dialog) {
    dialog.close();
    dialog.removeEventListener("keydown", handleKeydownOnDialog);

    document.body.removeChild(dialog);
    document.body.style.overflow = "auto";

}

function focusListElement(pos) {

}

function filterStocks(query, data) {

    let stockList = [];
    if (query == '') {
        stockList = data;
    }
    else {
        stockList = data.filter((item) => {
            if (item.code.toLowerCase().includes(query.toLowerCase()) || item.name.toLowerCase().includes(query.toLowerCase()) || item.industry.toLowerCase().includes(query.toLowerCase())) {
                return item;
            }
        });
    }

    let list = document.getElementById('tsrStockList');
    list.innerHTML = ''; // Clear previous results

    stockList.forEach(element => {
        let li = document.createElement('li');
        li.setAttribute("tabindex", "0");
        li.addEventListener("keydown", navigateList);

        let itemRow = document.createElement('div');
        itemRow.classList.add('d-flex', 'justify-content-between', 'w-100');

        let itemLeft = document.createElement('div');
        itemLeft.classList.add('d-flex', 'flex-column');

        let top = document.createElement('div');
        top.innerHTML = element.name + "&nbsp;";

        let bottom = document.createElement('div');
        bottom.textContent = element.industry;
        bottom.style.fontSize = "0.6em";

        itemLeft.appendChild(top);
        itemLeft.appendChild(bottom);

        // -------------------------------------

        let itemRight = document.createElement('div');
        itemRight.classList.add('d-sm-flex', 'd-none', "d-flex");

        let code = document.createElement('span');
        code.classList.add("code");
        code.innerHTML = element.code;

        itemRight.appendChild(code);

        let data = element.urls;
        let urls = Object.keys(data);
        for (let i = 0; i < urls.length; i++) {
            let button = document.createElement('button');
            button.classList.add('btn', 'btn-sm', 'me-2');
            button.innerHTML = `
            <a href="${data[urls[i]]}" style="color: black;">
             ${urls[i]}
            </a>
            `;

            button.addEventListener("keydown", navigateButtons);

            itemRight.appendChild(button);
        }


        // -------------------------------------

        itemRow.appendChild(itemLeft);
        itemRow.appendChild(itemRight);

        li.appendChild(itemRow);

        list.appendChild(li);
    });

}

let navigateList = function navigateList(e) {
    e.preventDefault();
    /* 
    * e.preventDefault() -
    *   prevents multiple scrolls from happening together - 1. ul scrolling & li scrolling during focus
    *   prevents abnor"MA"l scrolling when user repeatedly presses arrow up or down
    * 
    *   also stops tab key behaviour
    * */

    let li = this;
    if (e.key === "ArrowUp") {
        if (li.previousSibling) {
            li.previousSibling.focus();
        }
    }
    else if (e.key === "ArrowDown") {
        if (li.nextSibling) {
            li.nextSibling.focus();
        }
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        let buttons = this.querySelectorAll("button");

        let buttonHasFocus = false;

        if (buttons.length != 0) {
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i] == document.activeElement) {
                    console.log("focused");

                    buttonHasFocus = true;
                }
            }

            if (!buttonHasFocus) {
                buttons[0].focus();
            }
        }
    }
}

function navigateButtons(e) {
    // e.preventDefault();
    /* 
    * e.preventDefault() -
    *   prevents multiple scrolls from happening together - 1. ul scrolling & li scrolling during focus
    *   prevents abnor"MA"l scrolling when user repeatedly presses arrow up or down
    * 
    *   also stops tab key behaviour
    * */

    console.log(e.key);
    let btn = this;
    if (e.key === "ArrowLeft") {
        if (btn.previousSibling) {
            btn.previousSibling.focus();
        }
    }
    else if (e.key === "ArrowRight") {
        if (btn.nextSibling) {
            btn.nextSibling.focus();
        }
    }
    e.stopImmediatePropagation();
}




