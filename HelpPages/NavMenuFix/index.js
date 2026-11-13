let jsu = mintJsUtil;
let container = document.getElementById("tsrOverviewContainer");

let wrapper = document.createElement("div");
wrapper.classList.add("row");
let sectionContainer = document.createElement("div");
sectionContainer.classList.add("container", "col-12", "col-sm-8", "col-md-8", "col-lg-9", "col-xxl-10", "my-3");

let custScrUrl = mintJsUtil.getBaseUrl() + '/rt/CustomStockScreener.tsr';



function addSections(tsrOverviewData, sectionContainer) {
    for (let i = 0; i < tsrOverviewData.length; i++) {

        // SECTION DIV 
        let sectionDiv = document.createElement("div");
        sectionDiv.classList.add("mb-5", "mx-3", "p-3", "border", "shadow");

        // ---
        // ! Added
        // sectionDiv.setAttribute("data-bs-spy", "scroll");
        // sectionDiv.setAttribute("data-bs-target", "#tsrHelpPageNavbar");
        // sectionDiv.setAttribute("data-bs-offset", "0");
        // ---

        sectionDiv.style.borderRadius = "15px";

        let cssText = sectionDiv.style.cssText + tsrOverviewData[i].style.section;
        sectionDiv.style.cssText = cssText;

        let sectionObj = tsrOverviewData[i];

        // -----
        // SECTION HEADING
        let sectionHeadingLink = document.createElement("a");
        sectionHeadingLink.classList.add("tsrSectionHeading");
        // sectionHeadingLink.href = "#" + sectionObj.section.url;
        sectionHeadingLink.href = "#" + sectionObj.section.title.replaceAll(" ", ""); // temp

        let sectionHeading = document.createElement("h5");
        sectionHeading.innerHTML = sectionObj.section.title;
        sectionHeading.id = sectionObj.section.title.replaceAll(" ", "");
        sectionHeading.style.scrollMargin = "100px";

        cssText = sectionHeading.style.cssText;
        sectionHeading.style.cssText = cssText + tsrOverviewData[i].style.sectionTitle;

        sectionHeadingLink.appendChild(sectionHeading);

        let hr = document.createElement("hr");

        sectionHeadingLink.appendChild(hr);

        sectionDiv.appendChild(sectionHeadingLink);
        // -----

        // -----
        // SECTION DESCRIPTION
        if (sectionObj.section.desc != null) {
            let sectionDesc = document.createElement("p");
            // cssText = desc.style.cssText;
            // desc.style.cssText = cssText + tsrOverviewData[i].style.cardTitle;
            sectionDesc.innerHTML = sectionObj.section.desc;

            sectionDiv.appendChild(sectionDesc);

        }
        // -----



        let cards = sectionObj.cards;
        let noOfRows = cards.length % 3 == 0 ? (cards.length / 3) : (cards.length / 3) + 1;
        for (let j = 0; j < noOfRows; j++) {
            let row = document.createElement("div");
            row.classList.add("row", "mb-3");
            for (let k = 0; k <= 2; k++) {
                let cardIdx = (j * 3) + k;
                if (cards[cardIdx]) {

                    // ----
                    // CARD
                    let cardContainer = document.createElement("div");
                    cardContainer.classList.add("col-12", "col-md-6", "col-lg-4", "mb-3", "mb-lg-0");

                    let card = document.createElement("div");

                    card.classList.add("tsrPopupCard");

                    let cssText = card.style.cssText;
                    card.style.cssText = cssText + tsrOverviewData[i].style.card;

                    let cardTitle = document.createElement("h5");

                    cssText = cardTitle.style.cssText;
                    cardTitle.classList.add("card-title");

                    cardTitle.style.cssText = cssText + tsrOverviewData[i].style.cardTitle;
                    cardTitle.innerHTML = cards[cardIdx].title;

                    let cardBody = document.createElement("p");
                    cssText = cardBody.style.cssText;
                    cardBody.style.cssText = cssText + tsrOverviewData[i].style.cardText;
                    // cardBody.innerHTML = cards[cardIdx].text;

                    if (cards[cardIdx].points != null) {
                        let points = cards[cardIdx].points;
                        if (points.desc != null) {
                            let p = document.createElement("p");
                            p.innerHTML = points.desc;

                            cardBody.appendChild(p);
                        }

                        let cardData = points.list;

                        let ul = document.createElement("ul");
                        ul.classList.add("card-text", "mb-0");

                        cssText = ul.style.cssText;
                        ul.style.cssText = cssText + tsrOverviewData[i].style.cardText;

                        for (let l = 0; l < cardData.length; l++) {
                            let data = cardData[l];

                            let li = document.createElement("li");
                            li.innerText = data.text;
                            li.style.cursor = "default";

                            ul.appendChild(li);
                        }

                        cardBody.appendChild(ul);
                    }

                    if (cards[cardIdx].subtext != null) {
                        let descP = document.createElement("p");

                        let subtext = cards[cardIdx].subtext

                        if (cards[cardIdx].iconImg != null) {
                            // let baseUrl = mintJsUtil.getBaseUrl() + '/static/';
                            let baseUrl = "https://www.topstockresearch.com" + '/static';
                            let imgUrl = cards[cardIdx].iconImg.replaceAll("STATIC_HOME", baseUrl);

                            // subtext += '<br/> <img src="' + imgUrl + ' ">'
                            // ! modified
                            subtext += `<br>`;
                            // subtext += `<div style="overflow-y: auto; padding: 20px 0;">`;
                            subtext += `<div style="padding: 10px 0;">`;
                            subtext += `    <img src="${imgUrl}" class="img-fluid" style="cursor: zoom-in;" onclick="expandImg(this)">`;
                            subtext += `</div>`;
                            // subtext += `</div>`;
                        }

                        descP.innerHTML = subtext;
                        cardBody.appendChild(descP);
                    }

                    if (cards[cardIdx].helpLink != null) {

                        let helpLinkEle = document.createElement("p");

                        helpLinkEle.classList.add("text-center");

                        let html = `<a href='${cards[cardIdx].helpLink}' class='btn btn-link mx-auto mt-2'>`
                        html += `       Help`
                        html += `</a>`;
                        helpLinkEle.innerHTML = html;

                        cardBody.appendChild(helpLinkEle);

                    }

                    card.appendChild(cardTitle);
                    card.appendChild(cardBody);

                    cardContainer.appendChild(card);
                    row.appendChild(cardContainer);
                    // ----
                }

            }
            sectionDiv.appendChild(row);
        }
        sectionContainer.appendChild(sectionDiv);
    }
}

addSections(tsrOverviewData, sectionContainer);
wrapper.appendChild(sectionContainer);

// ----
// NAV MENU
let navMenuContainer = document.createElement("div");
navMenuContainer.classList.add("d-none", "d-sm-flex", "col-sm-4", "col-md-4", "col-lg-3", "col-xxl-2", "border-start");
navMenuContainer.style.backgroundColor = "#f3f3f3";
let navMenu = document.createElement("div");
navMenu.id = "tsrNavMenu";


// navMenu.classList.add("d-none", "d-sm-flex", "my-3", "flex-column", "position-fixed");

// ! New
// ---
navMenu.classList.add("d-none", "d-sm-flex", "my-3", "flex-column");
// navMenu.style.height = "calc(60vh - 20px)";

let windowHeight = window.innerHeight;

navMenu.style.overflowY = "auto";
navMenu.style.position = "sticky";
navMenu.style.top = "100px";
navMenu.style.height = (windowHeight - 240) + "px";
navMenu.style.width = "100%";
navMenu.style.overscrollBehavior = "contain";
// navMenu.style.minHeight = "100vh";
// ---

// Custom Screener link
let navMenuTitle = document.createElement("span");
let onThePagehtm = '<a href ="' + custScrUrl + '"   target="_blank">Go To Custom Screener</a> <br><br>'
    + 'On this page <br><br>'


navMenuTitle.innerHTML = onThePagehtm;
navMenuTitle.style.fontWeight = "bold";


navMenu.appendChild(navMenuTitle);

function addNavMenuLink(tsrOverviewData, navMenu) {
    for (let i = 0; i < tsrOverviewData.length; i++) {
        let a = document.createElement("a");

        a.href = "#" + tsrOverviewData[i].section.title.replaceAll(" ", "");
        a.innerHTML = tsrOverviewData[i].section.title + "<br>";
        a.classList.add("mb-2", "tsrLinks");
        a.style.fontSize = "14px";
        a.style.fontWeight = "300";

        navMenu.appendChild(a);
    }
}

addNavMenuLink(tsrOverviewData, navMenu);


let otherPagesHelpText = document.createElement("span");
otherPagesHelpText.innerHTML = '<br>Other Help guides <br><br>';
otherPagesHelpText.style.fontWeight = "bold";
navMenu.appendChild(otherPagesHelpText);

let otherPagesHelp = [
    { pageTitle: "Price Action", pageUrl: "/rt/TsrHighlights/CsTabsHelp/PriceAction" },
    { pageTitle: "Moving Average", pageUrl: "/rt/TsrHighlights/CsTabsHelp/MovingAverage" },
    { pageTitle: "Technicals", pageUrl: "/rt/TsrHighlights/CsTabsHelp/Technicals" },
];

let otherPagesHelpContainer = document.createElement("div");

for (let i = 0; i < otherPagesHelp.length; i++) {
    let a = document.createElement("a");

    a.innerHTML = otherPagesHelp[i].pageTitle + "<br>";
    a.href = otherPagesHelp[i].pageUrl;
    a.classList.add("mb-2", "tsrLinks");
    a.style.fontSize = "14px";
    a.style.fontWeight = "300";

    otherPagesHelpContainer.appendChild(a);
}
navMenu.appendChild(otherPagesHelpContainer);

navMenuContainer.appendChild(navMenu);
wrapper.appendChild(navMenuContainer);
// ---- 


container.appendChild(wrapper);



function addClickListenerToCards() {

    let cards = document.querySelectorAll(".tsrPopupCard");

    let cardsObj = [];
    let cardsPipIconStyle = [];  // wacky fix

    let baseUrl = mintJsUtil.getBaseUrl() + '/static/';

    for (let i = 0; i < tsrOverviewData.length; i++) {
        let section = tsrOverviewData[i];

        let cards = section.cards;

        cardsObj.push(...cards);
        // wacky fix
        cards.forEach(card => {
            cardsPipIconStyle.push(section.style.pipIcon);
        });
    }

    for (let i = 0; i < cards.length; i++) {

        if (jsu.isNotNull(cardsObj[i].html) || jsu.isNotNull(cardsObj[i].img)) {

            // if (cardsObj[i].html) {
            let div = document.createElement("div");
            div.setAttribute("align", "right");
            //div.style.position = "absolute";
            // div.style.bottom = "10px";
            // div.style.right = "10px";


            let button = document.createElement("button");
            // button.innerHTML = `<i class="far fa-object-ungroup fa-flip-horizontal"></i>`;
            // button.innerHTML = `<i class="fas fa-info-circle"></i>`;
            // let btnHtml = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-picture-in-picture"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 19h-6a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4" /><path d="M14 14m0 1a1 1 0 0 1 1 -1h5a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1z" /></svg>`

            let btnurl = baseUrl + '/highlights/CustomScreenerHelp/popIcon.ico'
            let btnHtml = '<img src="' + btnurl + '"> ';


            button.innerHTML = btnHtml;


            button.classList.add("btn", "btn-sm", "tsr-popup-btn");
            button.title = "More";
            cssText = button.style.cssText;
            button.style.cssText = cssText + cardsPipIconStyle[i];



            let obj = cardsObj[i];
            button.onclick = function () {




                console.log('..');
                if (cardsObj[i].html) { // TODO use jsu

                    obj.htmlUrl = obj.htmlUrl.replaceAll("STATIC_HOME", baseUrl);
                    $.get(obj.htmlUrl, function (data, status) {


                        // console.log(data);

                        data = data.replaceAll("STATIC_HOME", baseUrl + '/highlights/CustomScreenerHelp/') // TODO change
                        // console.log(data);
                        createDialog(false, data);

                    });
                } else if (cardsObj[i].img) {
                    // createDialog(true, data);

                    obj.imgUrl = obj.imgUrl.replaceAll("STATIC_HOME", baseUrl);

                    // $.get(obj.imgUrl, function (data, status) {

                    //     // console.log(data);

                    //     // data = data.replaceAll("STATIC_HOME", baseUrl + 'CustomScreenerHelp/') // TODO change
                    //     // console.log(data);
                    createDialog(true, obj.imgUrl);

                    // });

                }
            };

            div.appendChild(button);
            cards[i].appendChild(div);
            // } else if(cardsObj[i].img){

            // }
        }
    }
}

addClickListenerToCards();


function createDialog(isImg, html) {
    let dialog = document.createElement("dialog");
    dialog.id = "tsrMoreInfoPopup";
    dialog.classList.add("border", "bg-light", "border", "rounded", "shadow-lg");
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
    contentDiv.classList.add("border", "border-5", "rounded");


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

    document.addEventListener("keydown", handleKeydown);

}

function handleKeydown(e) {
    if (e.key === "Escape") {
        closeDialog();
    }
}

function closeDialog() {
    let dialog = document.getElementById("tsrMoreInfoPopup");
    dialog.close();
    document.body.removeChild(dialog);
    document.body.style.overflow = "auto";

    document.removeEventListener("keydown", handleKeydown);
}


// ! Modified
// ---
window.onscroll = function (e) {
    let windowHeight = window.innerHeight;
    if (window.scrollY > 240) {
        navMenu.style.height = (windowHeight - 110) + "px";
    }
    else {
        navMenu.style.height = (windowHeight - 240) + "px";
    }
}
// ---


// For solving overflowing images issue 
function expandImg(img) {
    let html = "";
    html += `   <div class="d-flex align-items-center" style="height: 100%;">`;
    // html += `       <img src="${img.src}">`;
    // html += `        <button style="position: absolute; right: 0px; top: 0px;" onclick="closeImg()">X</button>`
    html += `       <span onclick="closeImg()"><i class="fas fa-times"></i></span>`
    html += `       <img src="${img.src}">`
    html += `   </div>`;

    imgDialog.innerHTML = html;
    imgDialog.style.display = "block";

    document.body.addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
            closeImg();
        }
    })

}

function closeImg() {
    imgDialog.style.display = "none";
}

let imgDialog = document.createElement("div");
imgDialog.id = "tsrHelpPagesImgDialog";
imgDialog.classList.add("tsrHelpPagesImgDialog");
// imgDialog.style.cssText = `background: black; z-index: 1000;`;

document.body.appendChild(imgDialog);

// imgDialog.innerHTML = 
