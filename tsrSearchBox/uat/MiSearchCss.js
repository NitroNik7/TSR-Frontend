


var miIsc = (function () {  // my Ui Head


    let radioBtnIdPrefix = 'mishRadioBtn'


    // CSS:
    let tsr_search_box_css = `
    .tsrSearchBox {
        width: 50% !important;
    }

    .tsrSearchBox::backdrop {
        background: rgba(0, 0, 0, 0.75);
    }

`;

    let tsr_search_box_list_css = `

    .tsrSearchBoxList {
        max-height: 300px;
        overflow-y: auto;
        scroll-behavior: smooth;
        list-style-type: none;
        padding-left: 0;
    }

    .tsrSearchBoxList::-webkit-scrollbar {
        width: 4px;
    }

    .tsrSearchBoxList::-webkit-scrollbar-track {
        background-color: white;
    }

    .tsrSearchBoxList li {
        padding: 8px;
        border-bottom: 1px solid #ddd;
    }

    .tsrSearchBoxList .hover {
        background-color: lightgray;
        cursor: pointer;
        color: black !important;
        font-weight: 700;
        font-size: 17px;
        cursor: pointer;
    }

    .tsrSearchBoxList li:focus {
        /* background-color: gray; */
        background-color: #acacac;
        cursor: pointer;
        color: white !important;
        font-weight: 700;
        font-size: 17px;
    }

    .tsrSearchBoxList li a {
        color: black;
    }

    .tsrSearchBoxList li:focus a {
        color: white;
    }

    .tsrSearchBoxList li .name {
        display: block;
    }

    .tsrSearchBoxList .hover .name,
    .tsrSearchBoxList li:focus .name {
        display: none !important;
    }

    .tsrSearchBoxList li:focus-within {
        /* background-color: gray; */
        background-color: #acacac;
        cursor: pointer;
    }

    .tsrSearchBoxList li:focus-within .itemLeft{
        color: white;
        font-weight: 700;
        font-size: 17px;
    }

    .tsrSearchBoxList li:focus-within .name {
        display: none;
    }


    .tsrSearchBoxList li:focus-within .btn {
        display: block;
        background-color: white;

    }

    .tsrSearchBoxList li .btn {
        display: none;
        border-radius: 15px;
    }

     .tsrSearchBoxList li .btn:hover span,
    .tsrSearchBoxList li .btn:focus span {
        /* background-color: black !important; */
        color: white !important;
    }

    .tsrSearchBoxList li .btn:hover a,
    .tsrSearchBoxList li .btn:focus a {
        /* background-color: black !important; */
        color: white !important;
    }

    .tsrSearchBoxList li .btn:hover,
    .tsrSearchBoxList li .btn:focus {
        background-color: black !important;
        font-weight: 700;
        box-shadow: none;

    }

    .tsrSearchBoxList li .itemRight {
        overflow-x: hidden;
        justify-content: end;
        display: flex;
    }

    .tsrSearchBoxList li .itemRight button {
        display: none;
        border: none;
        background: none;
    }

    .tsrSearchBoxList .hover .itemRight button {
        display: flex;
    }

    .tsrSearchBoxList .hover .itemRight button:hover {
        color: white;
    }


    .tsrSearchBoxList .hover .itemRight div,
    .tsrSearchBoxList li:focus .itemRight div {
        overflow-x: hidden;
        display: flex;
    }

    .tsrSearchBoxList .hover .btn,
    .tsrSearchBoxList li:focus .btn {
        display: block;
        background-color: white;
        /* border: 1px solid gray; */
    }

    .tsrSearchBoxList .empty:hover {
        background-color: white;
        cursor: default;
        color: black !important;
        font-weight: 400 !important;
    }
`;

    let tsr_search_box_media_query = `

    @media only screen and (max-width: 1200px) {

        .tsrSearchBox {
            width: 75% !important;
        }

    }

    @media only screen and (max-width: 768px) {

        .tsrSearchBox{
            width: 100%  !important;
            max-width: 450px;
        }

        
    }

`;

    let tsr_radio_btn_css = `
    .${radioBtnIdPrefix}Menu {
        display: flex;
        width: 100%;
    }

    .${radioBtnIdPrefix} {
        display: inline-flex;
        align-items: center;
        margin-left: 15px;
        cursor: default;
    }

    .${radioBtnIdPrefix}:focus {
        border: 1px solid;
    }

    .${radioBtnIdPrefix}Circle {
        margin-right: 5px;
        border: 1px solid;
        border-radius: 20px;
        height: 13px;
        width: 13px;
    }

    .${radioBtnIdPrefix}InnerCircle {
        /* border: 1px solid; */
        border-radius: 20px;
        height: 7.5px;
        width: 7.5px;
        position: relative;
        top: 2px;
        left: 2px;
        background-color: black;
    }

    @media only screen and (max-width: 768px) {

        .${radioBtnIdPrefix}Menu{
            display: flex;
            flex-direction: column;
            width: 100%;

        }
    }
`;


    function addTsrSearchBoxCss() {
        let className = 'tsrSearchBox';

        for (let sheet of document.styleSheets) {
            if (sheet.ownerNode && sheet.ownerNode.tagName === 'STYLE') {
                try {
                    for (let rule of sheet.cssRules) {
                        if (rule.selectorText && rule.selectorText.includes(`.${className}`)) {
                            console.log(rule.selectorText, rule.style.cssText);
                            break;

                        }
                        else {
                            let style = document.createElement("style");
                            style.innerHTML = tsr_search_box_css + `\n` + tsr_search_box_list_css + `\n` + tsr_search_box_media_query + `\n` + tsr_radio_btn_css;

                            document.getElementsByTagName('head')[0].appendChild(style);
                            break;

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

    return {
        init: addTsrSearchBoxCss
    }


})(); // module 	