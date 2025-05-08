// * Task 1: Tab Structure
// // TODO - Add CSS using JS
// // TODO - Add JS for switching between tabs

let mintTabsCss = `
    .mintTabs {
        display: flex;
        flex-direction: row;
        position: relative;
        width: auto;
        min-width: 300px;
    }
`;

let leftRightScrollCss = `
    .leftMintTab,.rightMintTab {
        display: none;
        align-content: center;
        border-radius: 25px;
        background-color: #fff;
        width: 15px;
    }

    .leftMintTab:hover,.rightMintTab:hover {
        background-color: #e5e5e5
    }

    .LeftMintTabBtn {
        padding: 2px 15px 2px 2px;
        width: 9px;
        height: 17px
    }

    .RightMintTabBtn {
        padding: 2px 2px 2px 5px;
        width: 9px;
        height: 17px
    }

    @media only screen and (max-width: 1230px) {
        .leftMintTab, .rightMintTab {
            display: block;
        }
    }
`;

let insideMintTabs = `
    .insideMintTabsDiv {
        width: 100%;
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        overscroll-behavior-y: none;
        cursor: pointer;
        scrollbar-width: none;
    }

    .insideMintTabsDiv div {
        white-space: nowrap;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 18px;
        font-weight: 500;
        line-height: 40px;
        border: 1px solid #fff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        height: auto;
        /* background: linear-gradient(180deg, #120d67 0, #3030c2 59%, #00d4ff 100%); */
        /* background-color: #0D47A1 !important; */
        padding-right: 10px;
        padding-left: 10px;
        color: #fff;
        justify-content: space-evenly;
        transition: .3s ease-in-out;
        width: 100%;
        text-align: center;
    }

    .insideMintTabsDiv div:active, .insideMintTabsDiv div:hover {
        background: #fff !important;
        color: #000 !important;
        border: 1px solid !important;
        border-bottom: none !important;
    }

    .insideMintTabsDiv::-webkit-scrollbar {
        display: none !important;
    }
`;

addCss();
function addCss() {
    let className = 'mintTabs';

    for (let sheet of document.styleSheets) {
        if (sheet.ownerNode && sheet.ownerNode.tagName === 'STYLE') {

            try {
                for (let rule of sheet.cssRules) {
                    if (rule.selectorText && rule.selectorText.includes(`.${className}`)) {
                        console.log(rule.selectorText, rule.style.cssText);

                    }
                    else {
                        let style = document.createElement("style");
                        style.innerHTML = mintTabsCss + leftRightScrollCss + insideMintTabs;
                        document.getElementsByTagName('head')[0].appendChild(style);

                    }
                }
            } catch (e) {

                // Some stylesheets might be from different origins and not accessible
                // console.warn('Cannot access stylesheet:', sheet.href);
            }
            break;
        }
    }
}

let noOfTabs = 7;
addMintTabs(7);
function addMintTabs(noOfTabs) {
    let insideMintTabsDiv = document.getElementsByClassName("insideMintTabsDiv")[0];

    let div;
    for (let i = 1; i <= noOfTabs; i++) {
        div = document.createElement("div");
        div.id = `tab${i}Cs`;
        if (i == 1) {
            div.setAttribute('style', 'background: white !important; color: rgb(0, 0, 0); border: 1px solid; border-bottom: white;');
        }
        else {
            div.setAttribute('style', 'background: grey; color: rgb(255, 255, 255); border: 1px solid; border-bottom: white;');
        }
        div.innerHTML = `Tab ${i}`;
        div.setAttribute('onclick', `showControl(${i}, 'tab${i}Cs')`);

        insideMintTabsDiv.appendChild(div);
        }
        showControl(1, `tab1Cs`);
}

function showControl(tabNo, id) {

    let tab = document.getElementById(id);
    let tabs = document.getElementsByClassName('insideMintTabsDiv')[0].children;

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].setAttribute('style', 'background: grey; color: rgb(255, 255, 255); border: 1px solid; border-bottom: white;');
        
    }
    tab.setAttribute('style', 'background: white !important; color: rgb(0, 0, 0); border: 1px solid; border-bottom: white;');
    
    let alertDetailsDiv = document.getElementById('alertDetailsDiv');

    alertDetailsDiv.innerHTML = `
        <h4 style="padding: 50px;">
            Div ${tabNo}
        </h4>
    `;


}

function left_scroll() {
    const left = document.getElementsByClassName("insideMintTabsDiv")[0];
    left.scrollBy({
        left: -250,
        behavior: "smooth"
    });
}

function right_scroll() {
    const right = document.getElementsByClassName("insideMintTabsDiv")[0];
    right.scrollBy({
        left: 250,
        behavior: "smooth"
    });
}