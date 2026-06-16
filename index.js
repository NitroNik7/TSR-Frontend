function paintStockSection(sector, stock) {
    let stockSectionModal = document.getElementById(stockSectionModalId);
    stockSectionModal.style.display = "block";

    // Clean up modal container positioning classes (Optional: add Bootstrap modal formatting helper classes)
    // stockSectionModal.className = "ui-draggable ui-draggable-handle web-dialog shadow-lg rounded-3 border-0";

    let stockSectionHeader = document.getElementById(stockSectionHeaderId);
    let stockSectionBody = document.getElementById(stockSectionBodyId);

    let techUrl = mintJsUtil.getRootUrl() + '/Stock/' + stock["id"] + "/TechnicalAnalysis";
    let fundaUrl = mintJsUtil.getRootUrl() + '/Stock/' + stock["id"] + "/FundamentalAnalysis";

    // * ================= HEADER SECTION ================= *
    let headerHtml = `
        <div class="p-3 bg-light border-bottom border-2 border-light-subtle">
            <div class="container-fluid p-0">
                <div class="row align-items-center g-2">
                    <div class="col-12 col-md-7 text-start">
                        <h4 class="fw-bold text-dark m-0 tracking-tight">${stock["name"]}</h4>
                    </div>
                    <div class="col-12 col-md-5 d-flex justify-content-md-end align-items-center gap-3">
                        <span class="text-muted small fw-medium m-0">View Analysis</span>
                        <div class="btn-group btn-group-sm" role="group">
                            <a href="${techUrl}" target="_blank" style="text-wrap: nowrap;" class="btn btn-outline-primary px-3" oncontextmenu="return false;">
                                <i class="fas fa-chart-line me-1"></i> Tech
                            </a>
                            <a href="${fundaUrl}" target="_blank" style="text-wrap: nowrap;"  class="btn btn-outline-primary px-3" oncontextmenu="return false;">
                                <i class="fas fa-university me-1"></i> Funda
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    // * ================= BODY SECTION ================= *
    let bodyHtml = `<div class="p-4">`;

    // * HIGHLIGHTS SECTION
    bodyHtml += `
        <section class="mb-4">
            <div class="d-flex align-items-center mb-3">
                <h5 class=" tsrSecRotStockSectionTitle">Highlights</h5>
            </div>
            <div class="row g-3 text-center">
                <div class="col-6 col-md-3">
                    <div class="p-3 rounded-3 bg-light border border-light-subtle h-100">
                        <span class="text-muted d-block small mb-1 fw-medium">Returns vs NIFTY</span>
                        <h4 class="fw-bold m-0 text-success">${miSrnUtils.gcv(stock["vsNifty"], null, "%")}</h4>
                    </div>
                </div>`;

    if (jsu.isNotNull(stock.vsIdx) && stock.vsIdx) {
        bodyHtml += `
                <div class="col-6 col-md-3">
                    <div class="p-3 rounded-3 bg-white border border-light-subtle h-100">
                        <span class="text-muted d-block small mb-1 fw-medium">Returns vs ${sector["name"]}</span>
                        <h4 class="fw-bold m-0 text-success">${miSrnUtils.gcv(stock["vsIdx"], null, "%")}</h4>
                    </div>
                </div>`;
    }

    bodyHtml += `
                <div class="col-6 col-md-3">
                    <div class="p-3 rounded-3 bg-light border border-light-subtle h-100">
                        <span class="text-muted d-block small mb-1 fw-medium">Price</span>
                        <h4 class="fw-bold m-0 text-dark">${miSrnUtils.gcv(stock["price"])}</h4>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="p-3 rounded-3 bg-white border border-light-subtle h-100">
                        <span class="text-muted d-block small mb-1 fw-medium">Price Change</span>
                        <h4 class="fw-bold m-0 text-success">${miSrnUtils.gcv(stock["priceChange"], null, "%")}</h4>
                    </div>
                </div>
            </div>
        </section>`;

    // * TSR METRICS SECTION
    bodyHtml += `
        <section class="mb-4">
            <div class="mb-3">
                <h5 class="tsrSecRotStockSectionTitle">TSR Metrics</h5>
            </div>
            <div class="owl-carousel owl-theme tsrStrengthIndex">
                <div class="card border border-light-subtle p-3 shadow-sm rounded-3">
                    <p class="text-muted small fw-medium mb-2">Technical Strength</p>
                    <h6 class="fw-bold m-0" style="color: ${stock["tsrStr"]["techClr"]};">${stock["tsrStr"]["techStr"]}</h6>
                </div>
                <div class="card border border-light-subtle p-3 shadow-sm rounded-3 bg-light">
                    <p class="text-muted small fw-medium mb-2">Value Index</p>
                    <h6 class="fw-bold m-0" style="color: ${stock["tsrStr"]["valClr"]};">${stock["tsrStr"]["valStr"]}</h6>
                </div>
                <div class="card border border-light-subtle p-3 shadow-sm rounded-3">
                    <p class="text-muted small fw-medium mb-2">Stability Index</p>
                    <h6 class="fw-bold m-0" style="color: ${stock["tsrStr"]["stabClr"]};">${stock["tsrStr"]["stabStr"]}</h6>
                </div>
                <div class="card border border-light-subtle p-3 shadow-sm rounded-3 bg-light">
                    <p class="text-muted small fw-medium mb-2">Profitability Index</p>
                    <h6 class="fw-bold m-0" style="color: ${stock["tsrStr"]["pftClr"]};">${stock["tsrStr"]["pftStr"]}</h6>
                </div>
                <div class="card border border-light-subtle p-3 shadow-sm rounded-3">
                    <p class="text-muted small fw-medium mb-2">Growth Index</p>
                    <h6 class="fw-bold m-0" style="color: ${stock["tsrStr"]["gwthClr"]};">${stock["tsrStr"]["gwthStr"]}</h6>
                </div>
            </div>
        </section>`;

    bodyHtml += `<div class="row g-4">`;

    // * RETURNS SECTION
    // <div class="col-12 col-lg-6">
    bodyHtml += `
            <section>
                <div class="mb-3">
                    <h5 class="tsrSecRotStockSectionTitle">Returns</h5>
                </div>
                <div class="owl-carousel owl-theme periodicReturns">`;
    for (let j = 0; j < stock["tsrRtn"].length; j++) {
        if (jsu.isNull(stock["tsrRtn"][j]["label"])) continue;
        let cardBg = (j % 2 === 0) ? 'bg-light' : 'bg-white';
        bodyHtml += `
                    <div class="card border border-light-subtle p-3 shadow-sm rounded-3 ${cardBg}">
                        <p class="text-muted small fw-medium mb-2">${stock["tsrRtn"][j]["label"]}</p>
                        <h5 class="fw-bold text-dark m-0">${miSrnUtils.gcv(stock["tsrRtn"][j]["stkRtn"], null, "%")}</h5>
                    </div>`;
    }
    bodyHtml += `
                </div>
            </section>
        `;
    // </div>

    // * EMA SECTION
    // <div class="col-12 col-lg-6">
    bodyHtml += `
            <section>
                <div class="mb-3">
                    <h5 class="tsrSecRotStockSectionTitle">EMA</h5>
                </div>
                <div class="owl-carousel owl-theme periodicReturns">`;
    for (let j = 0; j < stock["ema"].length; j++) {
        if (jsu.isNull(stock["ema"][j]["label"])) continue;
        let cardBg = (j % 2 === 0) ? 'bg-light' : 'bg-white';
        bodyHtml += `
                    <div class="card border border-light-subtle p-3 shadow-sm rounded-3 ${cardBg}">
                        <p class="text-muted small fw-medium mb-2">${stock["ema"][j]["label"]}</p>
                        <h5 class="fw-bold m-0">${miSrnUtils.gcv(stock["ema"][j]["val"], stock["ema"][j]["clrl"], null)}</h5>
                    </div>`;
    }
    bodyHtml += `
                </div>
            </section>
            `;
    // </div>

    bodyHtml += `</div><div class="row g-4 mt-2">`;

    // * TECHNICALS SECTION
    if (jsu.isNotNull(stock["tech"])) {
        // <div class="col-12 col-lg-6">
        bodyHtml += `
            <section>
                <div class="mb-3">
                    <h5 class="tsrSecRotStockSectionTitle">Technicals</h5>
                </div>
                <div class="owl-carousel owl-theme technicals">`;
        for (let j = 0; j < stock["tech"].length; j++) {
            if (jsu.isNull(stock["tech"][j]["label"])) continue;
            let cardBg = (j % 2 === 0) ? 'bg-light' : 'bg-white';
            bodyHtml += `
                    <div class="card border border-light-subtle p-3 shadow-sm rounded-3 ${cardBg}">
                        <p class="text-muted small fw-medium mb-1">${stock["tech"][j]["label"]}</p>
                        <h5 class="fw-bold text-dark mb-1 text-truncate">${miSrnUtils.gcv(stock["tech"][j]["val"], stock["tech"][j]["clrl"], null)}</h5>
                        <p class="small fw-medium m-0 text-truncate text-muted">${miSrnUtils.gcv(stock["tech"][j]["intr"], stock["tech"][j]["clrl"], null)}</p>
                    </div>`;
        }
        bodyHtml += `
                </div>
            </section>
            `;
        // </div>
    }

    // * FUNDAMENTALS SECTION
    if (jsu.isNotNull(stock["funda"])) {
        // <div class="col-12 col-lg-6">
        bodyHtml += `
            <section>
                <div class="mb-3">
                    <h5 class="tsrSecRotStockSectionTitle">Fundamentals</h5>
                </div>
                <div class="owl-carousel owl-theme technicals">`;
        for (let j = 0; j < stock["funda"].length; j++) {
            if (jsu.isNull(stock["funda"][j]["label"])) continue;
            let cardBg = (j % 2 === 0) ? 'bg-light' : 'bg-white';
            bodyHtml += `
                    <div class="card border border-light-subtle p-3 shadow-sm rounded-3 ${cardBg}">
                        <p class="text-muted small fw-medium mb-1" title="${stock["funda"][j]["label"]}">${stock["funda"][j]["label"]}</p>
                        <h5 class="fw-bold text-dark mb-1 text-truncate">${miSrnUtils.gcv(stock["funda"][j]["val"], stock["funda"][j]["clrl"], null)}</h5>
                        <p class="small fw-medium m-0 text-truncate text-muted">${miSrnUtils.gcv(stock["funda"][j]["intr"], stock["funda"][j]["clrl"], null)}</p>
                    </div>`;
        }
        bodyHtml += `
                </div>
            </section>
            `;
        // </div>
    }

    bodyHtml += `</div></div>`; // Closing row and container divs

    stockSectionHeader.innerHTML = headerHtml;
    stockSectionBody.innerHTML = bodyHtml;

    initializeCarousal(false);
}