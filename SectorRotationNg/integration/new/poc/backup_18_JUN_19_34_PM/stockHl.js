
var miStkHl = (function () {  // chart init Params

    let htmlU = mintHtmlUtil;
    let jsu = mintJsUtil;

    /*  helpers  */
    const fmt = (v, suffix = "") => (v == null ? "-" : (parseFloat(v) % 1 === 0 ? parseFloat(v).toFixed(0) : parseFloat(v).toFixed(2)) + suffix);
    const signCls = v => (parseFloat(v) >= 0 ? "tsrSecRotPos" : "tsrSecRotNeg");

    let freq = "";

    var css = `
                /* ============================================================
                TSR Stock Birds Eye View – Popup Styles
                Prefix : tsrSecRot
                Requires: Bootstrap 5, Font Awesome 5, Owl Carousel
                ============================================================ */

                /* -- Design tokens -- */
                :root {
                    --tsrSecRotBlueDark   : #0d2d6e;   /* TSR brand deep navy  */
                    --tsrSecRotBlue        : #1a56db;   /* TSR brand blue       */
                    --tsrSecRotBlueMid    : #2563eb;
                    --tsrSecRotGold        : #f59e0b;   /* accent               */
                    --tsrSecRotPos         : #059669;
                    --tsrSecRotPosBg      : #ecfdf5;
                    --tsrSecRotNeg         : #dc2626;
                    --tsrSecRotNegBg      : #fef2f2;
                    --tsrSecRotNeutral     : #334155;
                    --tsrSecRotSurface     : #f8fafc;
                    --tsrSecRotBorder      : #e2e8f0;
                    --tsrSecRotCardBg     : #ffffff;
                    --tsrSecRotMuted       : #64748b;
                    --tsrSecRotRadius      : 10px;
                    --tsrSecRotRadiusSm   : 6px;
                    --tsrSecRotShadow      : 0 1px 4px rgba(0,0,0,.08);
                    --tsrSecRotShadowMd    : 0 4px 16px rgba(13,45,110,.12);
                }

                /* -- Colour helpers -- */
                .tsrSecRotPos     { color: var(--tsrSecRotPos) !important; }
                .tsrSecRotNeg     { color: var(--tsrSecRotNeg) !important; }
                .tsrSecRotNeutral { color: var(--tsrSecRotNeutral) !important; }

                /* ============================================
                HEADER WITH BUY/SELL UTILITIES
                ============================================ */
                .tsrSecRotHeader {
                    background: linear-gradient(120deg, var(--tsrSecRotBlueDark) 0%, var(--tsrSecRotBlue) 100%);
                    padding: 14px 20px 0;
                    position: sticky;
                    top: 0;
                    z-index: 10;
                }

                .tsrSecRotHeaderInner {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    flex-wrap: wrap;
                    padding-bottom: 12px;
                }

                /* Title group */
                .tsrSecRotTitleGroup {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex: 1 1 1;
                    /* min-width: 0; */
                }

                .tsrSecRotTickerBadge {
                    background: var(--tsrSecRotGold);
                    color: #1a1a1a;
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: .06em;
                    padding: 3px 9px;
                    border-radius: 4px;
                    white-space: nowrap;
                    flex-shrink: 0;
                    text-transform: uppercase;
                }

                .tsrSecRotStockName {
                    color: #ffffff;
                    font-size: 15px;
                    font-weight: 700;
                    line-height: 1.25;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .tsrSecRotHeaderSub {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 3px;
                    flex-wrap: wrap;
                }

                .tsrSecRotPriceTag {
                    color: rgba(255,255,255,.85);
                    font-size: 13px;
                    font-weight: 600;
                }

                .tsrSecRotChangeTag {
                    font-size: 12px;
                    font-weight: 700;
                    padding: 1px 8px;
                    border-radius: 20px;
                    background: rgba(255,255,255,.12);
                }

                .tsrSecRotChangeTag.tsrSecRotPos { color: #6ee7b7 !important; }
                .tsrSecRotChangeTag.tsrSecRotNeg { color: #fca5a5 !important; }

                /* Action buttons container */
                .tsrSecRotHeaderActions {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-shrink: 0;
                    flex-wrap: wrap;
                }

                .tsrSecRotViewLabel {
                    color: rgba(255,255,255,.55);
                    font-size: 11px;
                    white-space: nowrap;
                }

                .tsrSecRotActionBtn {
                    display: inline-flex;
                    align-items: center;
                    font-size: 12px;
                    font-weight: 600;
                    padding: 5px 14px;
                    border-radius: 20px;
                    text-decoration: none !important;
                    transition: transform .15s, box-shadow .15s;
                    white-space: nowrap;
                }
                .tsrSecRotActionBtn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,.25); }

                .tsrSecRotBtnTech   { background: rgba(255,255,255,.15); color: #fff !important; border: 1px solid rgba(255,255,255,.3); }
                .tsrSecRotBtnFunda  { background: var(--tsrSecRotGold);  color: #1a1a1a !important; border: none; }

                /* Buy & Sell Native Accents */
                .tsrSecRotBtnBuy    { font-weight: 700 !important; letter-spacing: 0.02em; }
                .tsrSecRotBtnSell   { font-weight: 700 !important; letter-spacing: 0.02em; }

                /* Accent rule */
                .tsrSecRotHeaderRule {
                    height: 3px;
                    background: linear-gradient(90deg, var(--tsrSecRotGold) 0%, transparent 70%);
                    border-radius: 2px 2px 0 0;
                }

                /* ============================================
                BODY WRAPPER
                ============================================ */
                .tsrSecRotBody {
                    padding: 18px 18px 24px;
                    background: var(--tsrSecRotSurface);
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                }

                /* ============================================
                SECTION COMMON
                ============================================ */
                .tsrSecRotSection {
                    background: var(--tsrSecRotCardBg);
                    border: 1px solid var(--tsrSecRotBorder);
                    border-radius: var(--tsrSecRotRadius);
                    padding: 14px 16px 16px;
                    box-shadow: var(--tsrSecRotShadow);
                }

                .tsrSecRotSectionHd {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    /* margin-bottom: 12px; */
                }

                .tsrSecRotSectionIcon {
                    width: 26px;
                    height: 26px;
                    border-radius: 6px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    flex-shrink: 0;
                }

                .tsrSecRotIconHl   { background: #ede9fe; color: #7c3aed; }
                .tsrSecRotIconTsr  { background: #dbeafe; color: var(--tsrSecRotBlue); }
                .tsrSecRotIconRet  { background: #dcfce7; color: #16a34a; }
                .tsrSecRotIconEma  { 
                    /* background: #fef3c7; */
                    /* color: #d97706;  */
                    background: #dbeafe;
                    color: #1a56db;
                    }
                .tsrSecRotIconTech { background: #fee2e2; color: #dc2626; }
                .tsrSecRotIconFund { background: #e0f2fe; color: #0284c7; }

                .tsrSecRotSectionTitle {
                    font-size: 14px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: .07em;
                    color: var(--tsrSecRotNeutral);
                    margin: 0;
                }

                /* ============================================
                HIGHLIGHTS GRID
                ============================================ */
                .tsrSecRotHighlightsGrid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
                    gap: 10px;
                }

                .tsrSecRotHlCard {
                    position: relative;
                    border-radius: var(--tsrSecRotRadiusSm);
                    padding: 12px 14px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    overflow: hidden;
                    border: 1px solid var(--tsrSecRotBorder);
                    transition: box-shadow .2s;
                }
                .tsrSecRotHlCard:hover { box-shadow: var(--tsrSecRotShadowMd); }

                .tsrSecRotHlNifty  { background: #f0fdf4; }
                .tsrSecRotHlSector { background: #eff6ff; }
                .tsrSecRotHlPrice  { background: #fefce8; }
                .tsrSecRotHlChange { background: #fdf4ff; }

                .tsrSecRotHlLabel {
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: .06em;
                    color: var(--tsrSecRotMuted);
                }

                .tsrSecRotHlValue {
                    font-size: 20px;
                    font-weight: 700;
                    line-height: 1.1;
                }

                .tsrSecRotHlIcon {
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 28px;
                    opacity: .07;
                    color: #000;
                }

                /* ============================================
                TSR METRICS PILL ROW
                ============================================ */
                .tsrSecRotMetricsRow {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                .tsrSecRotMetricPill {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: var(--tsrSecRotSurface);
                    border: 1px solid var(--tsrSecRotBorder);
                    border-radius: 30px;
                    padding: 7px 14px 7px 10px;
                    flex: 1 1 250px;
                    /* min-width: 0;  */
                    max-width: 400px;
                    transition: box-shadow .2s, transform .15s;
                }
                .tsrSecRotMetricPill:hover { box-shadow: var(--tsrSecRotShadowMd); transform: translateY(-1px); }

                .tsrSecRotMetricIcon { font-size: 24px; flex-shrink: 0; }

                .tsrSecRotMetricText {
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                }

                .tsrSecRotMetricLabel {
                    font-size: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: .06em;
                    color: var(--tsrSecRotMuted);
                }

                .tsrSecRotMetricVal {
                    font-size: 16px;
                    font-weight: 700;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                /* ============================================
                CAROUSEL CARDS
                ============================================ */
                .tsrSecRotCarouselCard {
                    display: flex;
                    flex-direction: column;
                    padding: 10px 12px;
                    border-radius: var(--tsrSecRotRadiusSm);
                    border: 1px solid var(--tsrSecRotBorder);
                    background: var(--tsrSecRotSurface);
                    gap: 3px;
                    transition: box-shadow .15s;
                    min-height: 64px;
                }
                .tsrSecRotCarouselCard:hover { box-shadow: var(--tsrSecRotShadowMd); background: #fff; }

                .tsrSecRotCcLabel {
                    font-size: 12px;
                    font-weight: 600;
                    color: var(--tsrSecRotMuted);
                    text-transform: uppercase;
                    letter-spacing: .04em;
                    white-space: nowrap;
                }

                .tsrSecRotCcValue {
                    font-size: 20px;
                    font-weight: 700;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: var(--tsrSecRotNeutral);
                }

                .tsrSecRotCcSub {
                    font-size: 11px;
                    font-weight: 600;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .tsrSecRotCcThree { min-height: 76px; }

                /* Owl carousel tweaks */
                .tsrSecRotCarousel .owl-dots { margin-top: 8px !important; }
                .tsrSecRotCarousel .owl-dot span {
                    width: 6px !important;
                    height: 6px !important;
                    background: var(--tsrSecRotBorder) !important;
                    margin: 0 3px !important;
                }
                .tsrSecRotCarousel .owl-dot.active span { background: var(--tsrSecRotBlue) !important; }

                /* ============================================
                RESPONSIVE DESIGN (Desktop, Laptop, Tablet, Mobile)
                ============================================ */
                @media (max-width: 992px) {
                    .tsrSecRotActionBtn { padding: 5px 10px; font-size: 11.5px; }
                }

                @media (max-width: 768px) {
                    .tsrSecRotDualRow           { grid-template-columns: 1fr; }
                    .tsrSecRotHeaderActions     { width: 100%; justify-content: flex-start; margin-top: 6px; }
                    .tsrSecRotHighlightsGrid    { grid-template-columns: repeat(2, 1fr); }
                    .tsrSecRotStockName         { font-size: 13px; }
                    .tsrSecRotMetricsRow        { gap: 6px; }
                    .tsrSecRotMetricPill        { flex: 1 1 250px; }
                }

                @media (max-width: 480px) {
                    .tsrSecRotHighlightsGrid { grid-template-columns: 1fr 1fr; }
                    .tsrSecRotBody             { padding: 12px 12px 18px; gap: 12px; }
                    .tsrSecRotHeader           { padding: 10px 12px 0; }
                    .tsrSecRotActionBtn       { font-size: 11px; padding: 4px 8px; }
                    .tsrSecRotViewLabel       { display: none; }
                }


                /* -- Technicals Tick Marker Note -- */
                .tsrSecRotTickNote {
                    font-size: 14px;
                    font-weight: 700;
                    color: var(--tsrSecRotNeutral);
                    background-color: var(--tsrSecRotSurface);
                    border: 1px solid var(--tsrSecRotBorder);
                    border-radius: var(--tsrSecRotRadiusSm);
                    padding: 3px 8px;
                    white-space: nowrap;
                    letter-spacing: 0.02em;
                }

                .tsrSecRotTickAsterisk {
                    color: var(--tsrSecRotNeg);
                    margin-right: 1px;
                }

                /* Tablet & Mobile responsive optimization tweaks */
                /* @media (max-width: 576px) {
                    .tsrSecRotTickNote {
                        font-size: 10px;
                        padding: 2px 6px;
                    }
                } 
     */
   `

    function init(secRot, divId) {
        htmlU.addCssToHead("tsrSecRotHeader", css);
        if (jsu.isNotNull(secRot)) {
            initPopup(divId);
        }
    }

    // entry point
    function paintStockSection(params, sectRot, divId) {
        /*
               if(sectRot) {
                   Required params
                       freq
                       stock.code
                       stock.id
                       stock.name
                       stock.priceChange
                       stock.vsIdx
                       stock.sectorName
               } else{
                       freq
                       stock.code
                       stock.id
                       stock.name
                       stock.priceChange
               }                
           */

        let url = ``;
        freq = params.freq;
        if (sectRot) {
            if (jsu.isNotNull(mintJsUtil.getRootUrl())) {
                url = mintJsUtil.getRootUrl() + `/djs?id=${freq}&type=eq&cat=SecRot&code=${params.stock.code}&action=eq`;
            } else {
                url = `https://www.tsrbt1.com/rt/djs?id=${freq}&type=eq&cat=SecRot&code=${params.stock.code}&action=eq`;
            }
        } else {
            if (jsu.isNotNull(mintJsUtil.getRootUrl())) {
                url = mintJsUtil.getRootUrl() + `/djs?freq=${freq}&type=eq&cat=EqSmry&code=${params.stock.code}&action=eq`;
            }
            else {
                url = `https://www.tsrbt1.com/rt/djs?freq=${freq}&type=eq&cat=EqSmry&code=${params.stock.code}&action=eq`;
            }
        }

        getDataFromUrl(url).then(data => {
            if (data["statusCode"] == "success") {
                let stock = data;

                Object.entries(params.stock).forEach(element => {
                    stock[`${element[0]}`] = element[1];
                });

                let headerHtml = getHeaderHtml(stock, sectRot);
                let bodyHtml = getBodyHtml(stock);

                if (sectRot) {
                    let popup = document.getElementById(divId);
                    popup.style.display = "block";
                    let popupHeaderId = "tsrSecRotStockSectionHeader";
                    let popupBodyId = "tsrSecRotStockSectionBody";
                    let popupHtml = ``;
                    // <!-- <a onclick="${USER_FUNC}('close')" id="btnClose"> -->
                    // <!-- </a>  -->
                    // TODO Add close button functionality, ESC
                    popupHtml += `
                                <table style="width: 100%; border: 0px; background: linear-gradient(120deg, var(--tsrSecRotBlueDark) 0%, var(--tsrSecRotBlue) 100%);" cellpadding="3" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td style="padding: 7px; font-weight: 500; color: white; ">${stock["code"]} Highlights</td>
                                            <td class="align_right">
                                                <font color="white"><span class="fa fa-remove fa-times "></span>
                                                </font>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div id=${popupHeaderId}></div>
                                <div id=${popupBodyId} style="max-height: 70vh; overflow:  auto; border-radius: 10px;"></div>
                            `
                    popup.innerHTML = popupHtml;

                    let stockHlPopupHeader = document.getElementById(popupHeaderId);
                    let stockHlPopupBody = document.getElementById(popupBodyId);

                    /*  Injections  */
                    stockHlPopupHeader.innerHTML = headerHtml;
                    stockHlPopupBody.innerHTML = bodyHtml;

                } else {
                    let div = document.getElementById(divId);
                    div.style.display = "block";

                    let divHtml = `
                        <div id=${popupHeaderId}></div>
                        <div id=${popupBodyId} style="max-height: 70vh; overflow:  auto; border-radius: 10px;"></div>
                    `
                    div.innerHTML = divHtml;

                    let divHeader = document.getElementById(popupHeaderId);
                    let divBody = document.getElementById(popupBodyId);

                    /*  Injections  */
                    divHeader.innerHTML = headerHtml;
                    divBody.innerHTML = bodyHtml;
                }

                initializeCarousal(false);

            }


        });

    }

    function getHeaderHtml(stock, popup) {

        let techUrl = mintJsUtil.getRootUrl() + '/Stock/' + stock["id"] + "/TechnicalAnalysis";
        let fundaUrl = mintJsUtil.getRootUrl() + '/Stock/' + stock["id"] + "/FundamentalAnalysis";

        // let buyUrl = mintJsUtil.getRootUrl() + '/Stock/' + stock["id"] + "/BuyScreen";
        // let sellUrl = mintJsUtil.getRootUrl() + '/Stock/' + stock["id"] + "/SellScreen";

        let headerHtml = `
            <div class="tsrSecRotHeader">
                <div class="tsrSecRotHeaderInner">

                    <div class="tsrSecRotTitleGroup">
                        <span class="tsrSecRotTickerBadge">${stock["id"]}</span>
                        <div>
                            <div class="tsrSecRotStockName">${stock["name"]}</div>
                            <div class="tsrSecRotHeaderSub">
                                <span class="tsrSecRotPriceTag">
                                    <i class="fas fa-rupee-sign me-1"></i>${fmt(stock["price"])}
                                </span>
                                <span class="tsrSecRotChangeTag ${signCls(stock["priceChange"])}">
                                    <i class="fas fa-${parseFloat(stock["priceChange"]) >= 0 ? 'caret-up' : 'caret-down'} me-1"></i>${fmt(stock["priceChange"], " %")}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onclick="" class="btn btn-success tsrSecRotActionBtn tsrSecRotBtnBuy">
                            <i class="fas fa-shopping-cart me-1"></i>Buy
                        </button>
                        <button onclick="" class="btn btn-danger tsrSecRotActionBtn tsrSecRotBtnSell">
                            <i class="fas fa-gavel me-1"></i>Sell
                        </button>

                        <button onclick="" class="btn btn-warning tsrSecRotActionBtn tsrSecRotBtnSell">
                            <i class="fas fa-bell me-1"></i>Alert
                        </button>
                    </div>`


        if (popup) {


            headerHtml += `     <div class="tsrSecRotHeaderActions">
                                    <span class="tsrSecRotViewLabel">View Analysis</span>
                                    <a href="${techUrl}" target="_blank" class="tsrSecRotActionBtn tsrSecRotBtnTech" oncontextmenu="return false;">
                                        <i class="fas fa-chart-line me-1"></i>Technical
                                    </a>
                                    <a href="${fundaUrl}" target="_blank" class="tsrSecRotActionBtn tsrSecRotBtnFunda" oncontextmenu="return false;">
                                        <i class="fas fa-university me-1"></i>Fundamental
                                    </a>
                                </div>`


        } else {
            headerHtml += ` 
                                <button class="d-block d-md-none btn btn-sm btn-light ms-4" style="border-radius: 20px; font-size: 14px;">
                                    <i class="fas fa-redo"></i>
                                    Refresh
                                </button>
                            `
            headerHtml += `     <div class="d-flex flex-wrap g-3">
                                     <div class="tsrSecRotHeaderActions">
                                         <span class="tsrSecRotViewLabel">View Analysis</span>
                                         <a href="${techUrl}" target="_blank" class="tsrSecRotActionBtn tsrSecRotBtnTech" oncontextmenu="return false;">
                                             <i class="fas fa-chart-line me-1"></i>Technical
                                         </a>
                                         <a href="${fundaUrl}" target="_blank" class="tsrSecRotActionBtn tsrSecRotBtnFunda" oncontextmenu="return false;">
                                             <i class="fas fa-university me-1"></i>Fundamental
                                         </a>
                                     </div>
                                     <button class="d-none d-md-block btn btn-sm btn-light ms-4" style="border-radius: 20px;  font-size: 14px;">
                                         <i class="fas fa-redo"></i>
                                         Refresh
                                     </button>
                                 </div>`
        }
        headerHtml += `</div>
                            <div class="tsrSecRotHeaderRule"></div>
                        </div>
        `;

        return headerHtml;
    }

    function getBodyHtml(stock) {

        let bodyHtml = `<div class="tsrSecRotBody">`;
        // bodyHtml += getTickHtml();
        bodyHtml += getHighlightsSectionHtml(stock);
        bodyHtml += getTsrMetricsSectionHtml(stock);
        bodyHtml += getReturnsSectionHtml(stock);
        bodyHtml += getFundaSectionHtml(stock);
        bodyHtml += getTechSectionHtml(stock);
        bodyHtml += getEmaSectionHtml(stock);

        bodyHtml += `</div>`; // end tsrSecRotBody

        return bodyHtml;
    }


    function getTickHtml() {

        let tick = getTick();

        let tickHtml = ``;
        tickHtml += `
            <!-- Refactored Tick Marker Node Placement -->
                    <div class="tsrSecRotTickNote">
                        <span class="tsrSecRotTickAsterisk">*</span> ${tick} Tick
                    </div>
        `

        return tickHtml;
    }
    // TODO
    function getTick() {
        if (freq == "D") {
            return "Daily"
        } else if (freq == "Q" || freq == "3m") {
            return "Quarterly"
        } else if (freq == "HY" || freq == "6m") {
            return "Half Yearly"
        } else if (freq == "Y") {
            return "Yearly"
        } else if (freq == "2Y") {
            return "2 Yearly"
        } else if (freq == "5Y") {
            return "5 Yearly"
        } else {
            return "TODO";
        }
    }

    function getHighlightsSectionHtml(stock) {
        let highlightsHtml = "";
        /*  1. HIGHLIGHTS  */

        highlightsHtml += `
            <section class="tsrSecRotSection">
                <div class="tsrSecRotSectionHd">
                    <span class="tsrSecRotSectionIcon tsrSecRotIconHl"><i class="fas fa-bolt"></i></span>
                    <h6 class="tsrSecRotSectionTitle">Highlights</h6>
                </div>
                <div class="tsrSecRotHighlightsGrid mt-3">

                    <div class="tsrSecRotHlCard tsrSecRotHlNifty">
                        <span class="tsrSecRotHlLabel">vs NIFTY</span>
                        <span class="tsrSecRotHlValue ${signCls(stock["vsNifty"])}">${fmt(stock["vsNifty"], " %")}</span>
                        <span class="tsrSecRotHlIcon"><i class="fas fa-chart-area"></i></span>
                    </div>`;

        if (jsu.isNotNull(stock.vsIdx) && stock.vsIdx) {
            highlightsHtml += `
                    <div class="tsrSecRotHlCard tsrSecRotHlSector">
                        <span class="tsrSecRotHlLabel">vs ${stock["sectorName"]}</span>
                        <span class="tsrSecRotHlValue ${signCls(stock["vsIdx"])}">${fmt(stock["vsIdx"], " %")}</span>
                        <span class="tsrSecRotHlIcon"><i class="fas fa-building"></i></span>
                    </div>`;
        }

        highlightsHtml += `
                    <div class="tsrSecRotHlCard tsrSecRotHlPrice">
                        <span class="tsrSecRotHlLabel">Current Price</span>
                        <span class="tsrSecRotHlValue tsrSecRotNeutral"><i class="fas fa-rupee-sign"></i>${fmt(stock["price"])}</span>
                        <span class="tsrSecRotHlIcon"><i class="fas fa-rupee-sign"></i></span>
                    </div>

                    <div class="tsrSecRotHlCard tsrSecRotHlChange">
                        <span class="tsrSecRotHlLabel">Price Change</span>
                        <span class="tsrSecRotHlValue ${signCls(stock["priceChange"])}">${fmt(stock["priceChange"], " %")}</span>
                        <span class="tsrSecRotHlIcon"><i class="fas fa-percentage"></i></span>
                    </div>

                </div>
            </section>`;

        return highlightsHtml;
    }

    function getTsrMetricsSectionHtml(stock) {

        /*  2. TSR METRICS – pill row  */
        let tsrMetricsHtml = ""

        const tsrMetrics = [
            { label: "Technical", val: stock["tsrStr"]["techStr"], clr: stock["tsrStr"]["techClr"], icon: "fa-chart-bar" },
            { label: "Value", val: stock["tsrStr"]["valStr"], clr: stock["tsrStr"]["valClr"], icon: "fa-coins" },
            { label: "Stability", val: stock["tsrStr"]["stabStr"], clr: stock["tsrStr"]["stabClr"], icon: "fa-shield-alt" },
            { label: "Profitability", val: stock["tsrStr"]["pftStr"], clr: stock["tsrStr"]["pftClr"], icon: "fa-piggy-bank" },
            { label: "Growth", val: stock["tsrStr"]["gwthStr"], clr: stock["tsrStr"]["gwthClr"], icon: "fa-seedling" },
        ];

        // bg-primary bg-opacity-25
        tsrMetricsHtml += `
                    <section class="tsrSecRotSection" style="background: #eff6ff;">
                        <div class="d-flex justify-content-between">
                            <div class="tsrSecRotSectionHd">
                                <span class="tsrSecRotSectionIcon tsrSecRotIconTsr">
                                    <i class="fas fa-tachometer-alt"></i>
                                </span>
                                <h6 class="tsrSecRotSectionTitle">TSR Metrics</h6>
                                <sup style="font-size: 16px;color: red;font-weight: bold;top: -5px;left: -5px;">*</sup>
                            </div>`;
        tsrMetricsHtml += `    ${getTickHtml()}
                        </div>`

        tsrMetricsHtml += `<div class="tsrSecRotMetricsRow mt-3">`;

        tsrMetrics.forEach(m => {
            tsrMetricsHtml += `
                            <div class="tsrSecRotMetricPill"  style="background: #fff;">
                                <span class="tsrSecRotMetricIcon" style="color:${m.clr}"><i class="fas ${m.icon}"></i></span>
                                <div class="tsrSecRotMetricText">
                                    <span class="tsrSecRotMetricLabel">${m.label}</span>
                                    <span class="tsrSecRotMetricVal" style="color:${m.clr}">${m.val}</span>
                                </div>
                            </div>`;
        });

        tsrMetricsHtml += `</div></section>`;

        return tsrMetricsHtml;
    }

    function getReturnsSectionHtml(stock) {

        let returnRecords = [];
        stock["tsrRtn"].forEach((e, j) => {
            if (jsu.isNotNull(e["label"]))
                returnRecords.push(e);
        });

        // Returns
        let returnsHtml = "";

        if (returnRecords.length > 0) {

            // <div class="d-flex justify-content-between">
            returnsHtml += `<section class="tsrSecRotSection tsrSecRotHalf" style="background: #f0fdf4;">
                                    <div class="tsrSecRotSectionHd">
                                        <span class="tsrSecRotSectionIcon tsrSecRotIconRet"><i class="fas fa-history"></i></span>
                                        <h6 class="tsrSecRotSectionTitle">Returns</h6>
                                    </div>`;
            // <sup style="font-size: 16px;color: red;font-weight: bold;top: -5px;left: -5px;">*</sup>
            // returnsHtml += `        ${getTickHtml()}
            //                     </div>`


            if (returnRecords.length > 2) {

                returnsHtml += `    <div style="display: flex; padding: 0 15px;" class="owl-nav align-items-center justify-content-center mt-3">`
                returnsHtml += `       <button type="button" role="presentation" class="owl-prev btn tsrStockHlReturnsPrevBtn">`
                returnsHtml += `           <span aria-label="Previous" style="color: gray;">`
                returnsHtml += `               <i class="fas fa-caret-left"></i>`
                returnsHtml += `           </span>`
                returnsHtml += `       </button>`
            }
            returnsHtml += `        <div id="tsrStockHlReturns" class="owl-carousel owl-theme tsrSecRotCarousel periodicReturns">`;

            returnRecords.forEach((r, j) => {
                if (jsu.isNull(r["label"])) return;
                const v = fmt(r["stkRtn"]);
                returnsHtml += `
                                    <div class="tsrSecRotCarouselCard" style="background: #fff;">
                                        <span class="tsrSecRotCcLabel">${r["label"]}</span> 
                                        <span class="tsrSecRotCcValue ${v >= 0 ? 'tsrSecRotPos' : 'tsrSecRotNeg'}">
                                            <i class="fas fa-${v >= 0 ? 'caret-up' : 'caret-down'} me-1"></i>${fmt(v, " %")}
                                        </span>        
                                    </div>`;
            });

            returnsHtml += `        </div>`;
            if (returnRecords.length > 2) {

                returnsHtml += `        <button type = "button" role = "presentation" class="owl-next btn tsrStockHlReturnsNextBtn">`;
                returnsHtml += `            <span aria-label="Next" style="color: gray;">`;
                returnsHtml += `                <i class="fas fa-caret-right"></i>`;
                returnsHtml += `            </span>`;
                returnsHtml += `        </button>`;
                returnsHtml += `    </div>`;
            }
            returnsHtml += `</section>`;
        }

        return returnsHtml;
    }

    function getEmaSectionHtml(stock) {

        // EMA
        let emaHtml = "";

        let emaRecords = [];
        stock["ema"].forEach((e, j) => {
            if (jsu.isNotNull(e["label"]))
                emaRecords.push(e);
        });

        if (emaRecords.length > 0) {

            emaHtml += `
                    <section class="tsrSecRotSection tsrSecRotHalf" style="background: #eff6ff;">
                        <div class="d-flex justify-content-between">
                            <div class="tsrSecRotSectionHd">
                                <span class="tsrSecRotSectionIcon tsrSecRotIconEma"><i class="fas fa-wave-square"></i></span>
                                <h6 class="tsrSecRotSectionTitle">EMA</h6>
                                <sup style="font-size: 16px;color: red;font-weight: bold;top: -5px;left: -5px;">*</sup>
                            </div>`;
            emaHtml += `    ${getTickHtml()}
                        </div>`


            // emaHtml += `<div class="owl-carousel owl-theme tsrSecRotCarousel periodicReturns">`;
            if (emaRecords.length > 2) {
                emaHtml += `    <div style="display: flex; padding: 0 15px;" class="owl-nav align-items-center justify-content-center mt-3">`
                emaHtml += `       <button type="button" role="presentation" class="owl-prev btn tsrStockHlEmaPrevBtn">`
                emaHtml += `           <span aria-label="Previous" style="color: gray;">`
                emaHtml += `               <i class="fas fa-caret-left"></i>`
                emaHtml += `           </span>`
                emaHtml += `       </button>`
            }
            emaHtml += `        <div id="tsrStockHlEma" class="owl-carousel owl-theme tsrSecRotCarousel ema">`;
            emaRecords.forEach((e, j) => {
                if (jsu.isNull(e["label"])) return;
                emaHtml += `
                                        <div class="tsrSecRotCarouselCard" style="background: #fff;">
                                            <span class="tsrSecRotCcLabel">${e["label"]}</span>
                                            <span class="tsrSecRotCcValue" style="color:${e["clrl"] || '#334155'}">
                                                ${fmt(e["val"])}
                                            </span>
                                            <span class="tsrSecRotCcSub" style="color:${e["clrl"] || '#64748b'}">${e["intr"] || ""}</span>
                                        </div>`;
            });
            emaHtml += `        </div>`;
            if (emaRecords.length > 2) {
                emaHtml += `        <button type="button" role="presentation" class="owl-next btn tsrStockHlEmaNextBtn">`;
                emaHtml += `            <span aria-label="Next" style="color: gray;">`;
                emaHtml += `                <i class="fas fa-caret-right"></i>`;
                emaHtml += `            </span>`;
                emaHtml += `        </button>`;
                emaHtml += `    </div>`;
            }

            emaHtml += `</section>`
        }

        return emaHtml;
    }

    function getTechSectionHtml(stock) {
        let techHtml = ``;

        let techRecords = [];
        stock["tech"].forEach((e, j) => {
            if (jsu.isNotNull(e["label"]))
                techRecords.push(e);
        });

        if (techRecords.length > 0) {
            techHtml += `
                    <section class="tsrSecRotSection tsrSecRotHalf">
                        <div class="d-flex justify-content-between">
                            <div class="tsrSecRotSectionHd">
                                <span class="tsrSecRotSectionIcon tsrSecRotIconTech">
                                    <!-- <i class="fas fa-microscope"></i> -->
                                    <svg viewBox="0 0 288 288" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="red" height="14"><g><path d="M19.3101 187.074L74.3545 93.274L146.78 130.294L175.751 43.9139L251.074 75.994L282.94 1.95398L283.666 0.484009" stroke-width="16.5597"></path><path d="M282.53 226L21.002 230.103" stroke-width="2.29167" stroke-miterlimit="8" stroke-linecap="square" stroke-dasharray="6.88 2.29"></path><path d="M279.53 184L18.002 188.103" stroke-width="10.3125" stroke-miterlimit="8"></path><path d="M23 262C28.91 240.11 34.8301 218.22 45.8101 210.83C56.8001 203.44 78.1301 212.25 88.9001 217.65C99.6701 223.05 102 238.4 110.45 243.24C118.89 248.07 130.09 250.91 139.59 246.65C149.1 242.38 158.6 222.77 167.48 217.65C176.35 212.53 182.26 211.11 192.82 215.95C203.38 220.78 218.8 242.67 230.84 246.65C242.88 250.63 257.03 245.51 265.06 239.83C273.09 234.14 276.04 223.34 279 212.53" stroke-width="13.75" stroke-miterlimit="8"></path><path d="M14.5 1.5L14.4997 276.933" stroke-width="20.625" stroke-miterlimit="8"></path><path d="M285.93 267.5L10.4971 268.001" stroke-width="20.625" stroke-miterlimit="8"></path></g></svg>    
                                </span>
                                <h6 class="tsrSecRotSectionTitle">Technicals</h6>
                                <sup style="font-size: 16px;color: red;font-weight: bold;top: -5px;left: -5px;">*</sup>
                            </div>
                            ${getTickHtml()}

                        </div>`


            if (techRecords.length > 2) {

                techHtml += `    <div style="display: flex; padding: 0 15px;" class="owl-nav align-items-center justify-content-center mt-3">`
                techHtml += `       <button type="button" role="presentation" class="owl-prev btn tsrStockHlTechPrevBtn">`
                techHtml += `           <span aria-label="Previous" style="color: gray;">`
                techHtml += `               <i class="fas fa-caret-left"></i>`
                techHtml += `           </span>`
                techHtml += `       </button>`
            }
            techHtml += `    <div id="tsrStockHlTech" class="owl-carousel owl-theme tsrSecRotCarousel technicals">`;

            techRecords.forEach((t, j) => {
                if (jsu.isNull(t["label"])) return;
                techHtml += `
                            <div class="tsrSecRotCarouselCard tsrSecRotCcThree">
                                <span class="tsrSecRotCcLabel">${t["label"]}</span>
                                <span class="tsrSecRotCcValue" style="color:${t["clrl"] || '#334155'}">${fmt(t["val"])}</span>
                                <span class="tsrSecRotCcSub" style="color:${t["clrl"] || '#64748b'}">${t["intr"] || ""}</span>
                            </div>`;
            });
            techHtml += `           </div>`

            if (techRecords.length > 2) {
                techHtml += `        <button type="button" role="presentation" class="owl-next btn tsrStockHlTechNextBtn">`;
                techHtml += `            <span aria-label="Next" style="color: gray;">`;
                techHtml += `                <i class="fas fa-caret-right"></i>`;
                techHtml += `            </span>`;
                techHtml += `        </button>`;
                techHtml += `    </div>`;
            }

            techHtml += `</section>`;
        }

        return techHtml;
    }

    function getFundaSectionHtml(stock) {

        let fundaHtml = "";

        let fundaRecords = [];
        stock["funda"].forEach((e, j) => {
            if (jsu.isNotNull(e["label"]))
                fundaRecords.push(e);
        });

        // Returns
        let returnsHtml = "";

        if (fundaRecords.length > 0) {

            fundaHtml += `
                            <section class="tsrSecRotSection tsrSecRotHalf" style="background: #eff6ff;">
                                <div class="tsrSecRotSectionHd">
                                    <span class="tsrSecRotSectionIcon tsrSecRotIconFund"><i class="fas fa-landmark"></i></span>
                                    <h6 class="tsrSecRotSectionTitle">Fundamentals</h6>
                                </div>`
            if (fundaRecords.length > 2) {

                fundaHtml += `    <div style="display: flex; padding: 0 15px;" class="owl-nav align-items-center justify-content-center mt-3">`
                fundaHtml += `       <button type="button" role="presentation" class="owl-prev btn tsrStockHlFundaPrevBtn">`
                fundaHtml += `           <span aria-label="Previous" style="color: gray;">`
                fundaHtml += `               <i class="fas fa-caret-left"></i>`
                fundaHtml += `           </span>`
                fundaHtml += `       </button>`
            }
            fundaHtml += `               <div id="tsrStockHlFunda" class="owl-carousel owl-theme tsrSecRotCarousel fundamentals">`;
            fundaRecords.forEach((f, j) => {
                if (jsu.isNull(f["label"])) return;
                fundaHtml += `
                                        <div class="tsrSecRotCarouselCard tsrSecRotCcThree" style="background: #fff;">
                                            <span class="tsrSecRotCcLabel" title="${f["label"]}">${f["label"]}</span>
                                            <span class="tsrSecRotCcValue" style="color:${f["clrl"] || '#334155'}">${fmt(f["val"])}</span>
                                            <span class="tsrSecRotCcSub" style="color:${f["clrl"] || '#64748b'}">${f["intr"] || ""}</span>
                                        </div>`;
            });
            fundaHtml += `           </div>`
            if (fundaRecords.length > 2) {

                fundaHtml += `        <button type="button" role="presentation" class="owl-next btn tsrStockHlFundaNextBtn">`;
                fundaHtml += `            <span aria-label="Next" style="color: gray;">`;
                fundaHtml += `                <i class="fas fa-caret-right"></i>`;
                fundaHtml += `            </span>`;
                fundaHtml += `        </button>`;
                fundaHtml += `    </div>`;
            }
            fundaHtml += `   </section>`;
        }

        return fundaHtml;
    }

    function initializeCarousal() {
        var carouselDef = {
            margin: 10,
            dots: false,
            nav: false,
            autoWidth: false,
            responsive: {
                0: {
                    items: 1
                },
                500: {
                    items: 2,
                },
                1000: {
                    items: 3
                },
                1400: {
                    items: 4
                }
            }
        };

        $(".periodicReturns").owlCarousel(carouselDef);

        $(".periodicReturns, .ema, .fundamentals, .technicals").on('mousedown', '.owl-stage', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });

        $(".periodicReturns, .ema, .fundamentals, .technicals").on('drag.owl.carousel', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });
        $(".periodicReturns, .ema, .fundamentals, .technicals").on('dragged.owl.carousel', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });

        $(".periodicReturns, .ema, .fundamentals, .technicals").on('touchstart', '.owl-stage', function (e) {
            e.preventDefault();
            event.stopPropagation();
        });

        $('.tsrStockHlReturnsPrevBtn').click(function () {
            $("#tsrStockHlReturns").trigger('prev.owl.carousel', [300]);
        });
        $('.tsrStockHlReturnsNextBtn').click(function () {
            $("#tsrStockHlReturns").trigger('next.owl.carousel', [300]); // [300] - optional speed parameter
        });

        $(".ema").owlCarousel(carouselDef);
        $('.tsrStockHlEmaPrevBtn').click(function () {
            $("#tsrStockHlEma").trigger('prev.owl.carousel', [300]);
        });
        $('.tsrStockHlEmaNextBtn').click(function () {
            $("#tsrStockHlEma").trigger('next.owl.carousel', [300]); // [300] - optional speed parameter
        });

        $(".fundamentals").owlCarousel(carouselDef);

        $('.tsrStockHlFundaPrevBtn').click(function () {
            $("#tsrStockHlFunda").trigger('prev.owl.carousel', [300]);
        });
        $('.tsrStockHlFundaNextBtn').click(function () {
            $("#tsrStockHlFunda").trigger('next.owl.carousel', [300]); // [300] - optional speed parameter
        });

        $(".technicals").owlCarousel(carouselDef);

        $('.tsrStockHlTechPrevBtn').click(function () {
            $("#tsrStockHlTech").trigger('prev.owl.carousel', [300]);
        });
        $('.tsrStockHlTechNextBtn').click(function () {
            $("#tsrStockHlTech").trigger('next.owl.carousel', [300]); // [300] - optional speed parameter
        });

    };

    function initPopup(popupId) {

        $("#" + popupId).draggable({ containment: 'parent' });
        let popup = document.getElementById(popupId);
        popup.classList.add("web_dialog");
        popup.style.width = "calc(100% - 250px)";
        popup.style.minWidth = "300px";
        popup.style.minHeight = "70vh";
        popup.style.fontFamily = "unset";
        popup.style.overflow = "unset";
        // stockSectionModal.style.height = "calc(80% - 150px)";

    }


    async function getDataFromUrl(url) {

        const res = await fetch(url)

        const data = await res.json();

        return data;

    }

    return {
        init: init,
        pss: paintStockSection,
    }
})();
