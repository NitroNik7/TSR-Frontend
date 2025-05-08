// * Task 1: Tab Structure
// // TODO - Add CSS using JS
// // TODO - Add JS for switching between tabs

let json = `{
        "tabStructure1": { "suffix": "Ts1", "param": "" },
        "tabStructure2": { "suffix": "Ts2", "param": "background-color: #0D47A1 !important;" }
    }
`;

function styleTabStructure() {
    let data = JSON.parse(json);

    Object.values(data).forEach(obj => {
        let cName = 'mintTabs' + obj.suffix;
        let css = getCss(obj.suffix, obj.param);

        addCss(cName, css);
    })
}

function getCss(suffix, param) {

    let mintTabsCss = `
        .mintTabs${suffix} {
            display: flex;
            flex-direction: row;
            position: relative;
            width: auto;
            min-width: 300px;
        }
    `;

    let leftRightScrollCss = `
    .leftMintTab${suffix},.rightMintTab${suffix} {
        display: none;
        align-content: center;
        border-radius: 25px;
        background-color: #fff;
        width: 15px;
    }

    .leftMintTab${suffix}:hover,.rightMintTab${suffix}:hover {
        background-color: #e5e5e5
    }

    .LeftMintTabBtn${suffix} {
        padding: 2px 15px 2px 2px;
        width: 9px;
        height: 17px
    }

    .RightMintTabBtn${suffix} {
        padding: 2px 2px 2px 5px;
        width: 9px;
        height: 17px
    }

    @media only screen and (max-width: 1230px) {
        .leftMintTab${suffix}, .rightMintTab${suffix} {
            display: block;
        }
    }
`;

    let insideMintTabs = `
    .insideMintTabsDiv${suffix} {
        width: 100%;
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        overscroll-behavior-y: none;
        cursor: pointer;
        scrollbar-width: none;
    }

    .insideMintTabsDiv${suffix} div {
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
        ${param}
    }

    .insideMintTabsDiv${suffix} div:active, .insideMintTabsDiv${suffix} div:hover {
        background: #fff !important;
        color: #000 !important;
        border: 1px solid !important;
        border-bottom: none !important;
    }

    .insideMintTabsDiv${suffix}::-webkit-scrollbar {
        display: none !important;
    }
`;

    return mintTabsCss + leftRightScrollCss + insideMintTabs
}

function addCss(className, css) {

    for (let sheet of document.styleSheets) {
        if (sheet.ownerNode && sheet.ownerNode.tagName === 'STYLE') {

            try {
                for (let rule of sheet.cssRules) {

                    if (rule.selectorText && rule.selectorText.includes(`.${className}}`)) {
                        console.log(rule.selectorText, rule.style.cssText);

                    }
                    else {
                        let style = document.createElement("style");
                        style.innerHTML = css;
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

function addMintTabs(noOfTabs, suffix) {
    let insideMintTabsDiv = document.getElementsByClassName("insideMintTabsDiv" + suffix)[0];

    let div;
    for (let i = 1; i <= noOfTabs; i++) {
        div = document.createElement("div");
        div.id = `tab${i}${suffix}`;
        if (i == 1) {
            div.setAttribute('style', 'background: white !important; color: rgb(0, 0, 0); border: 1px solid; border-bottom: white;');
        }
        else {
            div.setAttribute('style', 'background: grey; color: rgb(255, 255, 255); border: 1px solid; border-bottom: white;');
        }
        div.innerHTML = `Tab ${i}`;
        div.setAttribute('onclick', `showControl(${i}, 'tab${i}${suffix}', '${suffix}')`);

        insideMintTabsDiv.appendChild(div);
    }
    showControl(1, `tab1${suffix}`, `${suffix}`);
}

function showControl(tabNo, id, suffix) {

    let tab = document.getElementById(id);
    let tabs = document.getElementsByClassName('insideMintTabsDiv' + suffix)[0].children;

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

function left_scroll(suffix) {
    const left = document.getElementsByClassName("insideMintTabsDiv" + suffix)[0];
    left.scrollBy({
        left: -250,
        behavior: "smooth"
    });
}

function right_scroll(suffix) {
    const right = document.getElementsByClassName("insideMintTabsDiv" + suffix)[0];
    right.scrollBy({
        left: 250,
        behavior: "smooth"
    });
}