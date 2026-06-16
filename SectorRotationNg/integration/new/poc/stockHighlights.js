
var miStkHl = (function () {  // chart init Params

    let htmlU = mintHtmlUtil;
    let jsu = mintJsUtil;


    /* ── helpers ── */
    const fmt = (v, suffix = "") => (v == null ? "—" : (parseFloat(v) % 1 === 0 ? parseFloat(v).toFixed(0) : parseFloat(v).toFixed(2)) + suffix);
    const signCls = v => (parseFloat(v) >= 0 ? "tsrSecRotPos" : "tsrSecRotNeg");

    function paintStockSection(stock) {

        let stockSectionModal = document.getElementById("tsrSecRotStockSectionModal");
        stockSectionModal.style.display = "block";

        let modalHtml = ``;
        // <!-- <a onclick="${USER_FUNC}('close')" id="btnClose"> -->
        modalHtml += `
                                <table style="width: 100%; border: 0px; background: linear-gradient(120deg, var(--tsrSecRotBlueDark) 0%, var(--tsrSecRotBlue) 100%);" cellpadding="3" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            
                                            <td style="padding: 7px; font-weight: 500; color: white; ">${stock["code"]} Highlights</td>
                                            <td class="align_right">
                                                <font color="white"><span class="fa fa-remove fa-times "></span>
                                                </font>
                                                <!-- </a>  -->
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div id="tsrSecRotStockSectionHeader"></div>
                                <div id="tsrSecRotStockSectionBody" style="max-height: 70vh; overflow:  auto; border-radius: 10px;"></div>
        `
        stockSectionModal.innerHTML = modalHtml;

        let stockSectionHeader = document.getElementById("tsrSecRotStockSectionHeader");
        let stockSectionBody = document.getElementById("tsrSecRotStockSectionBody");

        let headerHtml = getHeaderHtml(stock);
        // ╔══════════════════════════════════════════════════════╗
        // ║                     BODY                            ║
        // ╚══════════════════════════════════════════════════════╝

        let bodyHtml = getBodyHtml(stock);
        /* ── Injections ── */
        stockSectionHeader.innerHTML = headerHtml;
        stockSectionBody.innerHTML = bodyHtml;

        initializeCarousal(false);
    }

    function getHeaderHtml(stock) {
        // ╔══════════════════════════════════════════════════════╗
        // ║                    HEADER                           ║
        // ╚══════════════════════════════════════════════════════╝

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
                                    <i class="fas fa-${parseFloat(stock["priceChange"]) >= 0 ? 'caret-up' : 'caret-down'} me-1"></i>${fmt(stock["priceChange"])}%
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <a onclick="" class="btn btn-success tsrSecRotActionBtn tsrSecRotBtnBuy">
                            <i class="fas fa-shopping-cart me-1"></i>Buy
                        </a>
                        <a onclick="" class="btn btn-danger tsrSecRotActionBtn tsrSecRotBtnSell">
                            <i class="fas fa-gavel me-1"></i>Sell
                        </a>

                        <a onclick="" class="btn btn-warning tsrSecRotActionBtn tsrSecRotBtnSell">
                            <i class="fas fa-bell me-1"></i>Alert
                        </a>
                    </div>

                    <div class="tsrSecRotHeaderActions">
                        <span class="tsrSecRotViewLabel">View Analysis</span>
                        <a href="${techUrl}" target="_blank" class="tsrSecRotActionBtn tsrSecRotBtnTech" oncontextmenu="return false;">
                            <i class="fas fa-chart-line me-1"></i>Technical
                        </a>
                        <a href="${fundaUrl}" target="_blank" class="tsrSecRotActionBtn tsrSecRotBtnFunda" oncontextmenu="return false;">
                            <i class="fas fa-university me-1"></i>Fundamental
                        </a>
                    </div>
                </div>

                <div class="tsrSecRotHeaderRule"></div>
            </div>
        `;

        return headerHtml;
    }

    function getBodyHtml(stock) {
        let bodyHtml = `<div class="tsrSecRotBody">`;

        bodyHtml += getHighlightsSectionHtml(stock);
        bodyHtml += getTsrMetricsSectionHtml(stock);
        bodyHtml += getReturnsSectionHtml(stock);
        bodyHtml += getFundaSectionHtml(stock);
        bodyHtml += getTechSectionHtml(stock);
        bodyHtml += getEmaSectionHtml(stock);

        bodyHtml += `</div>`; // end tsrSecRotBody

        return bodyHtml;
    }

    function getHighlightsSectionHtml(stock) {
        let highlightsHtml = "";
        /* ── 1. HIGHLIGHTS ── */
        highlightsHtml += `
            <section class="tsrSecRotSection">
                <div class="tsrSecRotSectionHd">
                    <span class="tsrSecRotSectionIcon tsrSecRotIconHl"><i class="fas fa-bolt"></i></span>
                    <h6 class="tsrSecRotSectionTitle">Highlights</h6>
                </div>
                <div class="tsrSecRotHighlightsGrid">

                    <div class="tsrSecRotHlCard tsrSecRotHlNifty">
                        <span class="tsrSecRotHlLabel">vs NIFTY</span>
                        <span class="tsrSecRotHlValue ${signCls(stock["vsNifty"])}">${fmt(stock["vsNifty"])}%</span>
                        <span class="tsrSecRotHlIcon"><i class="fas fa-chart-area"></i></span>
                    </div>`;

        if (jsu.isNotNull(stock.vsIdx) && stock.vsIdx) {
            highlightsHtml += `
                    <div class="tsrSecRotHlCard tsrSecRotHlSector">
                        <span class="tsrSecRotHlLabel">vs ${stock["sectorName"]}</span>
                        <span class="tsrSecRotHlValue ${signCls(stock["vsIdx"])}">${fmt(stock["vsIdx"])}%</span>
                        <span class="tsrSecRotHlIcon"><i class="fas fa-building"></i></span>
                    </div>`;
        }

        highlightsHtml += `
                    <div class="tsrSecRotHlCard tsrSecRotHlPrice">
                        <span class="tsrSecRotHlLabel">Current Price</span>
                        <span class="tsrSecRotHlValue tsrSecRotNeutral">₹${fmt(stock["price"])}</span>
                        <span class="tsrSecRotHlIcon"><i class="fas fa-rupee-sign"></i></span>
                    </div>

                    <div class="tsrSecRotHlCard tsrSecRotHlChange">
                        <span class="tsrSecRotHlLabel">Price Change</span>
                        <span class="tsrSecRotHlValue ${signCls(stock["priceChange"])}">${fmt(stock["priceChange"])}%</span>
                        <span class="tsrSecRotHlIcon"><i class="fas fa-percentage"></i></span>
                    </div>

                </div>
            </section>`;

        return highlightsHtml;
    }

    function getTsrMetricsSectionHtml(stock) {

        /* ── 2. TSR METRICS – pill row ── */
        let tsrMetricsHtml = ""

        const tsrMetrics = [
            { label: "Technical", val: stock["tsrStr"]["techStr"], clr: stock["tsrStr"]["techClr"], icon: "fa-chart-bar" },
            { label: "Value", val: stock["tsrStr"]["valStr"], clr: stock["tsrStr"]["valClr"], icon: "fa-coins" },
            { label: "Stability", val: stock["tsrStr"]["stabStr"], clr: stock["tsrStr"]["stabClr"], icon: "fa-shield-alt" },
            { label: "Profitability", val: stock["tsrStr"]["pftStr"], clr: stock["tsrStr"]["pftClr"], icon: "fa-piggy-bank" },
            { label: "Growth", val: stock["tsrStr"]["gwthStr"], clr: stock["tsrStr"]["gwthClr"], icon: "fa-seedling" },
        ];

        tsrMetricsHtml += `
                    <section class="tsrSecRotSection">
                        <div class="tsrSecRotSectionHd">
                            <span class="tsrSecRotSectionIcon tsrSecRotIconTsr"><i class="fas fa-tachometer-alt"></i></span>
                            <h6 class="tsrSecRotSectionTitle">TSR Metrics</h6>
                        </div>
                        <div class="tsrSecRotMetricsRow">`;

        tsrMetrics.forEach(m => {
            tsrMetricsHtml += `
                            <div class="tsrSecRotMetricPill">
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

        // Returns
        let returnsHtml = "";
        returnsHtml += `<section class="tsrSecRotSection tsrSecRotHalf">
                            <div class="tsrSecRotSectionHd">
                                <span class="tsrSecRotSectionIcon tsrSecRotIconRet"><i class="fas fa-history"></i></span>
                                <h6 class="tsrSecRotSectionTitle">Returns</h6>
                            </div>`;

        returnsHtml += `    <div style="display: flex; padding: 0 15px;" class="owl-nav align-items-center justify-content-center my-3">`
        returnsHtml += `       <button type="button" role="presentation" class="owl-prev btn tsrStockHlReturnsPrevBtn">`
        returnsHtml += `           <span aria-label="Previous" style="color: gray;">`
        returnsHtml += `               <i class="fas fa-caret-left"></i>`
        returnsHtml += `           </span>`
        returnsHtml += `       </button>`
        returnsHtml += `        <div id="tsrStockHlReturns" class="owl-carousel owl-theme tsrSecRotCarousel periodicReturns">`;

        stock["tsrRtn"].forEach((r, j) => {
            if (jsu.isNull(r["label"])) return;
            const v = parseFloat(r["stkRtn"]);
            returnsHtml += `
                                    <div class="tsrSecRotCarouselCard">
                                        <span class="tsrSecRotCcLabel">${r["label"]}</span> 
                                        <span class="tsrSecRotCcValue ${v >= 0 ? 'tsrSecRotPos' : 'tsrSecRotNeg'}">
                                            <i class="fas fa-${v >= 0 ? 'caret-up' : 'caret-down'} me-1"></i>${fmt(v)}%
                                        </span>        
                                    </div>`;
        });

        returnsHtml += `        </div>`;
        returnsHtml += `        <button type = "button" role = "presentation" class="owl-next btn tsrStockHlReturnsNextBtn">`;
        returnsHtml += `            <span aria-label="Next" style="color: gray;">`;
        returnsHtml += `                <i class="fas fa-caret-right"></i>`;
        returnsHtml += `            </span>`;
        returnsHtml += `        </button>`;
        returnsHtml += `    </div>`;
        returnsHtml += `</section>`;

        return returnsHtml;
    }

    function getEmaSectionHtml(stock) {
        // EMA
        let emaHtml = "";
        emaHtml += `
                <section class="tsrSecRotSection tsrSecRotHalf">
                    <div class="tsrSecRotSectionHd">
                        <span class="tsrSecRotSectionIcon tsrSecRotIconEma"><i class="fas fa-wave-square"></i></span>
                        <h6 class="tsrSecRotSectionTitle">EMA</h6>
                    </div>`
        // emaHtml += `<div class="owl-carousel owl-theme tsrSecRotCarousel periodicReturns">`;
        emaHtml += `    <div style="display: flex; padding: 0 15px;" class="owl-nav align-items-center justify-content-center my-3">`
        emaHtml += `       <button type="button" role="presentation" class="owl-prev btn tsrStockHlEmaPrevBtn">`
        emaHtml += `           <span aria-label="Previous" style="color: gray;">`
        emaHtml += `               <i class="fas fa-caret-left"></i>`
        emaHtml += `           </span>`
        emaHtml += `       </button>`
        emaHtml += `        <div id="tsrStockHlEma" class="owl-carousel owl-theme tsrSecRotCarousel ema">`;

        stock["ema"].forEach((e, j) => {
            if (jsu.isNull(e["label"])) return;
            emaHtml += `
                                    <div class="tsrSecRotCarouselCard">
                                        <span class="tsrSecRotCcLabel">${e["label"]}</span>
                                        <span class="tsrSecRotCcValue" style="color:${e["clrl"] || '#334155'}">
                                            ${fmt(e["val"])}
                                        </span>
                                        <span class="tsrSecRotCcSub" style="color:${e["clrl"] || '#64748b'}">${e["intr"] || ""}</span>
                                    </div>`;
        });

        emaHtml += `        </div>`;
        emaHtml += `        <button type="button" role="presentation" class="owl-next btn tsrStockHlEmaNextBtn">`;
        emaHtml += `            <span aria-label="Next" style="color: gray;">`;
        emaHtml += `                <i class="fas fa-caret-right"></i>`;
        emaHtml += `            </span>`;
        emaHtml += `        </button>`;
        emaHtml += `    </div>`;

        emaHtml += `</section>`

        return emaHtml;
    }

    function getTechSectionHtml(stock) {
        let techHtml = ``;
        if (jsu.isNotNull(stock["tech"])) {
            techHtml += `
                    <section class="tsrSecRotSection tsrSecRotHalf">
                        <div class="tsrSecRotSectionHd">
                            <span class="tsrSecRotSectionIcon tsrSecRotIconTech"><i class="fas fa-microscope"></i></span>
                            <h6 class="tsrSecRotSectionTitle">Technicals</h6>
                        </div>`
            techHtml += `    <div style="display: flex; padding: 0 15px;" class="owl-nav align-items-center justify-content-center my-3">`
            techHtml += `       <button type="button" role="presentation" class="owl-prev btn tsrStockHlTechPrevBtn">`
            techHtml += `           <span aria-label="Previous" style="color: gray;">`
            techHtml += `               <i class="fas fa-caret-left"></i>`
            techHtml += `           </span>`
            techHtml += `       </button>`
            techHtml += `    <div id="tsrStockHlTech" class="owl-carousel owl-theme tsrSecRotCarousel technicals">`;

            stock["tech"].forEach((t, j) => {
                if (jsu.isNull(t["label"])) return;
                techHtml += `
                            <div class="tsrSecRotCarouselCard tsrSecRotCcThree">
                                <span class="tsrSecRotCcLabel">${t["label"]}</span>
                                <span class="tsrSecRotCcValue" style="color:${t["clrl"] || '#334155'}">${miSrnUtils.gcv(t["val"], t["clrl"], null)}</span>
                                <span class="tsrSecRotCcSub" style="color:${t["clrl"] || '#64748b'}">${t["intr"] || ""}</span>
                            </div>`;
            });
            techHtml += `           </div>`
            techHtml += `        <button type="button" role="presentation" class="owl-next btn tsrStockHlTechNextBtn">`;
            techHtml += `            <span aria-label="Next" style="color: gray;">`;
            techHtml += `                <i class="fas fa-caret-right"></i>`;
            techHtml += `            </span>`;
            techHtml += `        </button>`;
            techHtml += `    </div>`;

            techHtml += `</section>`;
        }

        return techHtml;
    }

    function getFundaSectionHtml(stock) {

        let fundaHtml = "";

        if (jsu.isNotNull(stock["funda"])) {
            fundaHtml += `
                            <section class="tsrSecRotSection tsrSecRotHalf">
                                <div class="tsrSecRotSectionHd">
                                    <span class="tsrSecRotSectionIcon tsrSecRotIconFund"><i class="fas fa-landmark"></i></span>
                                    <h6 class="tsrSecRotSectionTitle">Fundamentals</h6>
                                </div>`
            fundaHtml += `    <div style="display: flex; padding: 0 15px;" class="owl-nav align-items-center justify-content-center my-3">`
            fundaHtml += `       <button type="button" role="presentation" class="owl-prev btn tsrStockHlFundaPrevBtn">`
            fundaHtml += `           <span aria-label="Previous" style="color: gray;">`
            fundaHtml += `               <i class="fas fa-caret-left"></i>`
            fundaHtml += `           </span>`
            fundaHtml += `       </button>`
            fundaHtml += `               <div id="tsrStockHlFunda" class="owl-carousel owl-theme tsrSecRotCarousel fundamentals">`;
            stock["funda"].forEach((f, j) => {
                if (jsu.isNull(f["label"])) return;
                fundaHtml += `
                                        <div class="tsrSecRotCarouselCard tsrSecRotCcThree">
                                            <span class="tsrSecRotCcLabel" title="${f["label"]}">${f["label"]}</span>
                                            <span class="tsrSecRotCcValue" style="color:${f["clrl"] || '#334155'}">${miSrnUtils.gcv(f["val"], f["clrl"], null)}</span>
                                            <span class="tsrSecRotCcSub" style="color:${f["clrl"] || '#64748b'}">${f["intr"] || ""}</span>
                                        </div>`;
            });
            fundaHtml += `           </div>`
            fundaHtml += `        <button type="button" role="presentation" class="owl-next btn tsrStockHlFundaNextBtn">`;
            fundaHtml += `            <span aria-label="Next" style="color: gray;">`;
            fundaHtml += `                <i class="fas fa-caret-right"></i>`;
            fundaHtml += `            </span>`;
            fundaHtml += `        </button>`;
            fundaHtml += `    </div>`;
            fundaHtml += `   </section>`;
        }

        return fundaHtml;
    }

    function initializeCarousal() {
        var carouselDef = {
            margin: 10,
            dots: false,
            nav: false,
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

    return {
        pss: paintStockSection,

    }

})();
