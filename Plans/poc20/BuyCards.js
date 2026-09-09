// TODOs:
// Put Trader Pro plan card in 2nd position
// reduce font-size for screens below laptop width
// * Check
// TODO
// !


var miSupc = (function () { // Mi Subscription plan cards ...

    let htmlU = mintHtmlUtil;
    let jsu = mintJsUtil;

    let CSS_OLD_PRICE = `text-decoration: line-through; color: #adb5bd; font-size: 16px; text-wrap: nowrap; text-decoration-thickness: 3px; text-decoration-color: #a8a8a8;`

    let CSS_DISCOUNT = `background: #e6f4ea;color: #2f9e44;padding: 3px 8px; border-radius: 999px;font-size: 11px;font-weight: 600;`
    // let CSS_DISCOUNT = `background: #e6f4ea;color: #2f9e44;padding: 3px 8px; border-radius: 999px;font-size: 11px;font-weight: 600;`
    let CSS_SAVINGS = `background: #e6f4ea; color: #2f9e44; padding: 5px 8px; border-radius: 999px; font-size: 12px; font-weight: bold; width: max-content; margin-bottom: 0;`
    let CSS_SAVINGS_INFO = `color: grey; padding: 5px 8px; border-radius: 999px; font-size: 12px; font-weight: bold; width: max-content; margin-bottom: 0;`

    // let CSS_PRICE = `font-size: 44px;font-weight: 600;margin-bottom: 6px; display: block;`
    let CSS_PRICE = `font-size: 40px;font-weight: 600;margin-bottom: 6px; display: block;`

    let CSS_PRICE_SPAN = `font-size: 14px;color: #6c757d;`
    let CSS_EFF_PRICE = `font-size: 14px; color: #6c757d; margin: 8px 0;`


    let curPlan = null;
    let curPlanCost = null;

    let DEF_PERIOD = '1Y'; // * When changing this:
    /* Change translateX property of '.tsrToggleSlider'
        Add popular badge to resp. .tsrBillingToggle <button>:
        <button onclick="miSuPl.pc(this, '1Y', 1)" class="active">
            <p style="margin: 0; position: absolute; top: -10px; left: 85px; border-radius: 10px;"
                class="badge btn-warning">
                <i class="fas fa-crown"></i> Popular
            </p>
            1 Year
        </button>
    */

    let SU_PA_FB_DIV = "tsrPlanActionModalFbDiv"; // SUBS. PLAN ACTION FB DIV

    // let FORM_ID = "tsrPlanActionModalForm";

    function getCards(period) {

        curPlan = curSub.plan;

        if (period == null) period = DEF_PERIOD;

        if (jsu.isNotNull(curPlan) && curPlan != 'EXPIRED') {
            let planDef = jsu.getObjFrmArr(planDetails, curPlan);
            let planData = jsu.getObjFrmArr(planDef.period, period);
            curPlanCost = Math.round(planData.orig);
        }

        let html = '';


        // ! TEMP REMOVE LATER
        // TODO fix
        html += getCard(jsu.getObjFrmArr(planDetails, "EOD_COMBO"), period);
        let popPlanDetails = jsu.getObjFrmArrByField(planDetails, "pop", true);
        html += getCard(popPlanDetails, period, period);
        html += getCard(jsu.getObjFrmArr(planDetails, "TRADER_VALUE"), period);
        // html += getCard(jsu.getObjFrmArr(planDetails, "TRADER"), period); // * removed trader plan for now

        // let arr = [];
        // let secPlan = arr.splice(1, 1);
        // let lastPlan = arr.splice(3, 1);

        // arr.sort


        // for (let i = 0; i < planDetails.length; i++) {

        //     let details = planDetails[i];
        //     if (details.id == popPlanDetails.id) {
        //         continue;
        //     }

        //     html += getCard(details, period);
        // }

        return html;
    }


    function getCard(details, period) {


        let planTypes = details.period;

        let planData = jsu.getObjFrmArr(planTypes, period);

        let origCost = Math.round(planData.orig);

        if (jsu.isNull(planData.off)) planData.off = 0;
        if (jsu.isNull(details.renew)) details.renew = 0;
        if (jsu.isNull(details.upgrade)) details.upgrade = 0;


        let state = null;

        if (jsu.isNotNull(curPlan) && curPlan != 'EXPIRED') {
            if (origCost < curPlanCost) {
                state = 'disable'
            } else if (origCost == curPlanCost) {
                state = 'renew'
            } else {
                state = 'upgrade'
            }
        }

        let popular = details.pop ? 'featured ' : ''
        let renewDiscount = details.renew;
        let upgradeDiscount = details.upgrade;


        let curPlanVal = curSub.valueRemain;


        let buyPrice = null, savings = null;;
        if (state == `renew` && jsu.isNotNull(renewDiscount)) {
            savings = (((planData.off + renewDiscount) / 100) * planData.orig);
            buyPrice = planData.orig - savings;
        } else if (state == `upgrade` && jsu.isNotNull(upgradeDiscount)) {
            savings = (((planData.off + upgradeDiscount) / 100) * planData.orig) + curSub.valueRemain; // TODO recheck
            buyPrice = planData.orig - savings; // TODO 1a check with Sir 
        }
        else {
            buyPrice = planData.buyPrice;
        }
        savings = Math.round(savings);
        buyPrice = Math.round(buyPrice);

        if (buyPrice < 0) {
            return ''  // case of Upgrade to smaller period Higher plan
        }

        // let html = `
        //             <div class="tsrPlanCard  ${popular}" style="display: flex; flex-direction: column; justify-content: space-between" data-plan-id="${details.id}">
        //                 <h3>${details.name}</h3>
        //         `

        let html = `
                <div class="tsrPlanCard ${popular}" style="display: flex; flex-direction: column; justify-content: space-between" data-plan-id="${details.id}">`

        if (jsu.isNotNull(popular)) {
            html += `<span class="badge btn-primary" style="position: absolute; top: -12px; left: 36%;  border-radius: 10px"><i class="fas fa-crown"></i> POPULAR</span>`
        }

        html += `
                    <h3>${details.name}</h3>
                `

        html += `   <h6 style="font-size: 13px; font-weight: 600; color: grey; margin-bottom: 12px;">${details.subHeading}</h6>`

        // Original price
        if (jsu.isNotNull(planData.off) || jsu.isNotNull(renewDiscount) || jsu.isNotNull(upgradeDiscount) || curSub.valueRemain) {

            html += `<div class="tsrPriceMeta">`
            html += `   <span style="${CSS_OLD_PRICE}"><i class="fas fa-rupee-sign"></i>${Math.round(planData.orig)}</span>`
            if (jsu.isNotNull(savings)) {
                // html += `<div class="mb-2">`
                html += `   <p style="${CSS_SAVINGS};"> Save <i class="fas fa-rupee-sign"></i> `
                html += `       <span style="font-size: 16px;">${savings}</span>`
                html += `   </p>`
                // html += `</div>`
            }

            if (jsu.isNotNull(savings)) {
                // html += `<div class="mb-2">`
                html += `   <p style="${CSS_SAVINGS_INFO};"> `
                html += `       <span style="font-size: 14px;"><i class="fas fa-info-circle"></i></span>`
                html += `   </p>`
                // html += `</div>`
            }
            html += `</div>`

        }

        // Discount section
        /*
            html += `<div class="mb-3">`
            if (jsu.isNotNull(planData.off)) {
                html += `   <span style="${CSS_DISCOUNT} text-wrap: nowrap;">${planData.off}% OFF</span>`
            }
            if (state == 'renew' && jsu.isNotNull(renewDiscount)) {
                if (jsu.isNotNull(planData.off)) {
                    html += `   <span style="color: #2f9e44;font-size: 16px; ">+</span>`
                }
                if (renewDiscount != 0) {
                    html += `   <span style="${CSS_DISCOUNT}" class="">Renew ${renewDiscount}% OFF</span>`
                }
            } else if (state == `upgrade` && jsu.isNotNull(upgradeDiscount) && curSub.valueRemain != 0) { // TODO 1A
                if (jsu.isNotNull(planData.off)) {
                    html += `   <span style="color: #2f9e44;font-size: 16px; ">+</span>`
                }
                if (upgradeDiscount != 0) {
                    html += `   <span style="${CSS_DISCOUNT}" class="">Upgrade ${upgradeDiscount}% OFF</span>`
                    html += `   <span style="color: #2f9e44;font-size: 16px; ">+</span>`
                }
                html += `<br class="my-3">`
                html += `   <span style="${CSS_DISCOUNT} min-width: 90px;" class="">`
                html += `       Active Plan Discount <i class="fas fa-rupee-sign"></i> ${Math.round(curSub.valueRemain)}`
                html += `   </span>`
            }

            html += `</div>`
        */

        // // }


        if (buyPrice < 0) {

        } else {
            html += `<h2  style="${CSS_PRICE};">`
            html += `   <i class="fas fa-rupee-sign" style="font-size: 1.25rem; font-weight: 600; color: #0f172a; "></i> ${buyPrice}`
            if (period == "1M") {
                html += `   <span style='${CSS_PRICE_SPAN}'>/ month</span>`
            } else {
                let planPeriod = "year";
                if (planData.period != "1 Year") {
                    planPeriod = planData.period;
                }
                html += `   <span style='${CSS_PRICE_SPAN}'>/ ${planPeriod}</span>`
            }

            html += `</h2>`
            html += `<p style="margin-bottom: 0px; font-size: 12px;">Incl. of all taxes</p>`
        }


        if (jsu.isNotNull(planData.off)) { // TODO planData price per day
            html += ` 
                <div style="${CSS_EFF_PRICE};display: block;">
                    Just`
            if (period != "1M") {
                html += `<span>
                            <i class="fas fa-rupee-sign"></i> ${Math.round(planData.perMth)}/month
                        </span>`
                html += `<span class="tsrPlansEffectiveDivider">•</span>`
            }
            html += ` 
                    <span>
                        <i class="fas fa-rupee-sign"></i> ${Math.round(planData.perMth / 30)}/day
                    </span>
                </div>`
        }



        html += ` <hr style="border-top: 1px dashed #dee2e6; margin: 20px 0;">`


        html += ``

        html += `<ul class="mb-3">`
        let entitlements = planData.entitlements;
        for (let j = 0; j < entitlements.length; j++) {
            html += `<li class="d-flex align-items-baseline gap-3">
                            <i class="fas fa-check" style="color: green;"></i> 
                            <span style="text-align: left;">${entitlements[j]}</span>
                        </li>`
        }
        html += `</ul>`

        html += `   <div class="tsrPlansSuitabilityBox p-2 rounded-2 mb-3">`
        html += `       <div class="tsrPlansSuitabilityHeader d-flex align-items-center mb-2">`
        html += `           <span>Suitable for</span>`
        html += `       </div>`
        html += `       <div class="tsrPlansFitChipsContainer">`
        for (let i = 0; i < details.fit.length; i++) {
            html += `       <span class="tsrPlansFitChip">${details.fit[i]}</span>`
        }
        html += `       </div>`
        html += `   </div>`

        if (jsu.isNull(curPlan) || curPlan == 'EXPIRED') {
            html += `<button onclick="miSupc.pa('buy','${details.id}', '${period}');">Buy</button>`;
        } else {
            if (state == 'disable') {
                // do nothing
                html += htmlU.getSpan('You already have higher plan', 'cornflowerblue', 12);

            } else if (state == 'renew') {
                html += `<button onclick="miSupc.pa('renew', '${details.id}', '${period}');">Renew</button>`;
            } else {

                if (buyPrice < 0) {
                    html += htmlU.getSpan('Current value more than Plan price. Select Higher period', 'orange', 12);
                } else {
                    html += `<button onclick="miSupc.pa('upgrade', '${details.id}', '${period}');">Upgrade</button>`;
                }
            }
        }

        if (planData.gstInv) {
            html += `<p style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 0; color: grey; text-align: center ;position: absolute; bottom: 7px;">
                            <i class="fas fa-check"></i> 
                            <span style="text-align: left;">GST invoice available</span>
                    </p>`
        }


        html += `</div>`;

        return html;

    }


    function planAction(action, detailsId, period) {

        let planActionModalId = "tsrPlansActionModal";
        let planActionModalBodyId = planActionModalId + "Body";
        let planActionModalTitleId = planActionModalId + "Title";


        let titleHtml = null;
        let modalTitleId = null;
        let html = null;
        let modalBodyId = null;

        if (jsu.isNotNull(action) && typeof action == "string") {
            action = action.toLowerCase();
            if (action == "buy") {
                titleHtml = "Buy Plan"
                html = buyPlanModalHtml(detailsId, period);
            } else if (action == "upgrade") {
                titleHtml = "Upgrade Plan"
                html = upgradePlanModalHtml(detailsId, period);
            } else if (action == "renew") {
                titleHtml = "Renew Plan"
                html = renewPlanModalHtml(detailsId, period);
            }

            if (jsu.isNotNull(titleHtml) && jsu.isNotNull(html)) {

                modalTitleId = planActionModalTitleId;
                modalBodyId = planActionModalBodyId;
                var myModalEl = document.getElementById(planActionModalId);
                var myModal = bootstrap.Modal.getOrCreateInstance(myModalEl); // Returns a Bootstrap modal instance

                myModal.toggle();

                if (jsu.isNotNull(modalTitleId)) {
                    let modalTitle = document.getElementById(modalTitleId);
                    modalTitle.innerHTML = titleHtml;
                }

                if (jsu.isNotNull(modalBodyId)) {
                    let modalBody = document.getElementById(modalBodyId);
                    modalBody.innerHTML = html;
                }
            }
        }
    }


    function buyPlanModalHtml(detailsId, period) {

        let details = jsu.getObjFrmArr(planDetails, detailsId);
        let planData = jsu.getObjFrmArr(details.period, period);


        let buyPrice = Math.round(planData.buyPrice);
        // let buyPrice = Math.round(planData.buyPrice * 100) / 100;

        let html = "";

        html += ``

        // html += `<form id="${FORM_ID}">`
        html += ``
        html += `    <div class="row g-3">`
        html += `        <div class="col-4">`
        html += `            <p class="fw-bold" style="text-transform: uppercase; font-size: 14px; margin-bottom: 0;">Plan</p>`
        html += `            <p style="margin-bottom: 0;">${details.name}</p>`
        html += `        </div>`
        html += `        <div class="col-4">`
        html += `            <p class="fw-bold" style="text-transform: uppercase; font-size: 14px; margin-bottom: 0;">Duration</p>`
        html += `            <p style="margin-bottom: 0;">${planData.period}</p>`
        html += `        </div>`
        html += `        <div class="col-4">`
        html += `            <p class="fw-bold" style="text-transform: uppercase; font-size: 14px; margin-bottom: 0;">Price</p>`
        html += `            <p style="margin-bottom: 0;"><i class="fas fa-rupee-sign"></i> ${buyPrice}</p>`
        html += `        </div>`
        html += `    </div>`
        html += ``
        html += `   <hr>`

        html += getBuyAioHtml();

        html += getPaymentGatewayHtml();

        html += getPersonalDetailsHtml();

        if (planData.gstInv) {
            html += getGstDetailsHtml();
        }

        html += `<div id="refCodeDiv"></div>` // TODO ask Sir

        html += ``

        //   userAction(action, id, period, country, telPrefix, tel)
        html += `    <button  onsubmit="return false;" onclick="miSupc.hs('NEW' ,'${detailsId}', '${period}')" class="btn btn-primary w-100">PROCEED TO PAYMENT</button>`
        // html += `</form>`
        html += getFbDiv();




        return html;
    }

    function upgradePlanModalHtml(detailsId, period) {

        let details = jsu.getObjFrmArr(planDetails, detailsId);
        let planData = jsu.getObjFrmArr(details.period, period);


        let buyPrice = null;

        let upgradeDiscount = details.upgrade;
        if (jsu.isNotNull(upgradeDiscount)) {
            buyPrice = planData.orig - (((planData.off + upgradeDiscount) / 100) * planData.orig) - curSub.valueRemain; // TODO 1a check with Sir 
        } else {
            buyPrice = planData.buyPrice;
        }
        buyPrice = Math.round(buyPrice);

        let html = "";

        html += ``

        // html += `<form id="${FORM_ID}">`
        html += ``
        // html += getFbDiv();
        html += `    <div class="row g-3">`
        html += `        <div class="col-4">`
        html += `            <p class="fw-bold" style="text-transform: uppercase; font-size: 14px; margin-bottom: 0;">Plan</p>`
        html += `            <p style="margin-bottom: 0;">${details.name}</p>`
        html += `        </div>`
        html += `        <div class="col-4">`
        html += `            <p class="fw-bold" style="text-transform: uppercase; font-size: 14px; margin-bottom: 0;">Duration</p>`
        html += `            <p style="margin-bottom: 0;">${planData.period}</p>`
        html += `        </div>`
        html += `        <div class="col-4">`
        html += `            <p class="fw-bold" style="text-transform: uppercase; font-size: 14px; margin-bottom: 0;">Price</p>`
        html += `            <p style="margin-bottom: 0;"><i class="fas fa-rupee-sign"></i> ${buyPrice}</p>`
        html += `        </div>`
        html += `    </div>`
        html += ``
        html += `   <hr>`

        html += getBuyAioHtml();

        html += getPaymentGatewayHtml();

        html += getPersonalDetailsHtml();
        html += ``

        if (planData.gstInv) {
            html += getGstDetailsHtml();
        }

        //   userAction(action, id, period, country, telPrefix, tel)
        html += `    <button  onsubmit="return false;" onclick="miSupc.hs('UPGRADE' ,'${detailsId}', '${period}')" class="btn btn-primary w-100">PROCEED TO PAYMENT</button>`
        // html += `</form>`
        html += getFbDiv();




        return html;
    }

    function renewPlanModalHtml(detailsId, period) {

        let details = jsu.getObjFrmArr(planDetails, detailsId);
        let planData = jsu.getObjFrmArr(details.period, period);

        let renewDiscount = details.renew;


        let html = "";
        // html += `<form id="${FORM_ID}">`

        // html += getFbDiv();


        let offPc = planData.off == null ? renewDiscount : renewDiscount + planData.off;
        let buyPrice = planData.orig - ((offPc / 100.0) * planData.orig);
        buyPrice = Math.round(buyPrice);
        html += ``
        // html += getFbDiv();
        html += `    <div class="row g-3">`
        html += `        <div class="col-4">`
        html += `            <p class="fw-bold" style="text-transform: uppercase; font-size: 14px; margin-bottom: 0;">Plan</p>`
        html += `            <p style="margin-bottom: 0;">${details.name}</p>`
        html += `        </div>`
        html += `        <div class="col-4">`
        html += `            <p class="fw-bold" style="text-transform: uppercase; font-size: 14px; margin-bottom: 0;">Duration</p>`
        html += `            <p style="margin-bottom: 0;">${planData.period}</p>`
        html += `        </div>`
        html += `        <div class="col-4">`
        html += `            <p class="fw-bold" style="text-transform: uppercase; font-size: 14px; margin-bottom: 0;">Price</p>`
        html += `            <p style="margin-bottom: 0;"><i class="fas fa-rupee-sign"></i> ${buyPrice}</p>`
        html += `        </div>`
        html += `    </div>`
        html += ``
        html += `   <hr>`


        html += getBuyAioHtml();

        html += getPaymentGatewayHtml();

        html += getPersonalDetailsHtml();
        html += ``

        if (planData.gstInv) {
            html += getGstDetailsHtml();
        }

        // html += `    <button type="submit" class="btn btn-primary w-100">PROCEED TO PAYMENT</button>`
        html += `    <button  onsubmit="return;" onclick="miSupc.hs('RENEW' ,'${detailsId}', '${period}')" class="btn btn-primary w-100">PROCEED TO PAYMENT</button>`
        // html += `</form>`
        html += getFbDiv();


        return html;
    }

    function handleSubmit(action, detailsId, period) {

        // const form = document.getElementById('myForm');

        // Triggers native validation messages without submitting the form
        // if (form.reportValidity()) {
        // This only runs if the form passed all native checks
        let countryCodeSel = document.getElementById("countryCode");
        let selVal = countryCodeSel.value;

        let countryDetails = selVal.split(",");
        let telPrefix = countryDetails[0].trim();
        let country = countryDetails[1].trim();

        let tel = null;

        let telNumberInputId = "tsrPlansUserRegPhnNumber";
        let telNoInput = document.getElementById(telNumberInputId);
        if (jsu.isNotNull(telNoInput.value)) {
            tel = telNoInput.value;

        } else {

            htmlU.addMsgToDiv(SU_PA_FB_DIV, true, 'Please enter Telephone Number', 'red', 14)
            return;
        }

        miSuPgi.ua(action, detailsId, period, country, telPrefix, tel);

        // }



    }

    function getFbDiv() {
        let html = "";

        html += '   <div id="' + SU_PA_FB_DIV + '" class="mt-2"></div>'
        html += ' </div>'

        return html;
    }

    function getPaymentGatewayHtml() {
        let html = "";

        html += `    <!-- 5: Payment Gateway -->`
        html += `    <div class="d-flex">`
        html += `        <p class="fw-bold mb-2">Payment Gateway</p>`
        html += `        <div class="d-flex justify-content-center ms-3 gap-4">`
        html += `            <div class="form-check">`
        html += `                <input class="form-check-input" type="radio" name="payGate" id="payU" value="payU">`
        html += `                <label class="form-check-label" for="payU" style="text-wrap: nowrap;">PayU</label>`
        html += `            </div>`
        html += `            <div class="form-check">`
        html += `                <input class="form-check-input" type="radio" name="payGate" id="ccAvenue" value="ccAvenue" checked>`
        html += `                <label class="form-check-label" for="ccAvenue" style="text-wrap: nowrap;">CC Avenue</label>`
        html += `            </div>`
        html += `        </div>`
        html += `    </div>`
        html += ``
        html += ``

        return html;
    }

    function getPersonalDetailsHtml() {

        let phoneNumberInputId = "tsrPlansUserRegPhnNumber";

        let html = "";

        html += `    <!-- Personal Details -->`
        html += `    <div>`
        // html += `        <p class="fw-bold">Personal Details</p>`
        // html += ``
        // html += `        <div class="input-group mb-3">`
        // html += `            <span class="input-group-text ">Email ID</span>`
        // html += `            <input type="email" class="form-control" aria-label="Username" value="nikhilharpale@gmail.com" disabled>`
        // html += `        </div>`
        html += `        <label for="tsrUserRegPhnNumber" class="form-label text-secondary" style="font-size: 14px;">You will be notified at provided telephone number</label>`
        html += `        <div class="input-group mb-3">`
        html += `            <span class="input-group-text">`
        html += `                <i class="fas fa-phone fa-sm" style="rotate: 90deg;"></i>`
        // html += `                Mobile No.`
        html += `            </span>`
        html += ``
        html += getCountryNameAndTelPrefixSelect(curSub.country);

        html += ``
        if (jsu.isNotNull(curSub) && jsu.isNotNull(curSub.mob)) {
            html += `            <input type="text" class="form-control" id="${phoneNumberInputId}" placeholder="Phone Number" value="${curSub.mob}" required>`
        } else {
            html += `            <input type="text" class="form-control" id="${phoneNumberInputId}" placeholder="Phone Number" required>`
        }
        html += `        </div>`
        html += `    </div>`

        return html;
    }

    function getGstDetailsHtml() {

        let gstNumberInputId = "tsrPlansUserGstNumber";

        let html = "";

        html += `    <div>`
        html += `        <label for="tsrUserRegPhnNumber" class="form-label text-secondary" style="font-size: 14px;">GST Invoice will be sent to registered email ID</label>`
        html += `        <div class="input-group mb-3">`
        html += `            <span class="input-group-text">`
        html += `                GST No.`
        html += `            </span>`

        html += ``
        if (jsu.isNotNull(curSub) && jsu.isNotNull(curSub.gst)) {
            html += `            <input type="text" class="form-control" id="${gstNumberInputId}" value="${curSub.mob}">`
        } else {
            html += `            <input type="text" class="form-control" id="${gstNumberInputId}" placeholder="(Optional)">`
        }
        html += `        </div>`
        html += `    </div>`

        return html;

    }

    function getBuyAioHtml() {

        let aioCheckId = "tsrPlanStockAioCheck";
        let html = "";
        html += ``;
        html += `        <div class="d-flex mb-3">`
        html += `            <div class="form-check">`
        html += `                <input class="form-check-input" type="checkbox" id="${aioCheckId}" onchange="miSupc.sapd();">`
        html += `                <label class="form-check-label" for="${aioCheckId}" style="text-wrap: nowrap;">
            <p style="margin-bottom: 0;">Get StockAIO Premium 1 Year plan @ <i class="fas fa-rupee-sign"></i> 999</p>
            <p style="margin-bottom: 0; font-size: 12px">Access Global Markets: AU, CA, UK and US</p>
        </label>`
        html += `            </div>`
        html += `        </div>`

        let aioPlanDetailsDivId = "tsrPlanAioPlanDetails";
        html += `    <div id="${aioPlanDetailsDivId}" class="row g-3" style="display: none;">`
        html += `        <div class="col-4">`
        html += `            <p class="fw-bold" style="text-transform: uppercase; font-size: 14px; margin-bottom: 0;">Plan</p>`
        html += `            <p style="margin-bottom: 0;">AIO Pro</p>`
        html += `        </div>`
        html += `        <div class="col-4">`
        html += `            <p class="fw-bold" style="text-transform: uppercase; font-size: 14px; margin-bottom: 0;">Duration</p>`
        html += `            <p style="margin-bottom: 0;">1 Year</p>`
        html += `        </div>`
        html += `        <div class="col-4">`
        html += `            <p class="fw-bold" style="text-transform: uppercase; font-size: 14px; margin-bottom: 0;">Price</p>`
        html += `            <p style="margin-bottom: 0;"><i class="fas fa-rupee-sign"></i> 999</p>`
        html += `        </div>`
        html += `    </div>`

        html += ``
        html += `   <hr>`


        return html;
    }

    function getCountryNameAndTelPrefixSelect(selCountry) {


        let countryCallingCodes = {
            "IND": { "name": "India", "code": "+91" },
            "AFG": { "name": "Afghanistan", "code": "+93" },
            "ALA": { "name": "Åland Islands", "code": "+358" },
            "ALB": { "name": "Albania", "code": "+355" },
            "DZA": { "name": "Algeria", "code": "+213" },
            "ASM": { "name": "American Samoa", "code": "+1684" },
            "AND": { "name": "Andorra", "code": "+376" },
            "AGO": { "name": "Angola", "code": "+244" },
            "AIA": { "name": "Anguilla", "code": "+1264" },
            "ATA": { "name": "Antarctica", "code": "+672" },
            "ATG": { "name": "Antigua and Barbuda", "code": "+1268" },
            "ARG": { "name": "Argentina", "code": "+54" },
            "ARM": { "name": "Armenia", "code": "+374" },
            "ABW": { "name": "Aruba", "code": "+297" },
            "AUS": { "name": "Australia", "code": "+61" },
            "AUT": { "name": "Austria", "code": "+43" },
            "AZE": { "name": "Azerbaijan", "code": "+994" },
            "BHS": { "name": "Bahamas", "code": "+1242" },
            "BHR": { "name": "Bahrain", "code": "+973" },
            "BGD": { "name": "Bangladesh", "code": "+880" },
            "BRB": { "name": "Barbados", "code": "+1246" },
            "BLR": { "name": "Belarus", "code": "+375" },
            "BEL": { "name": "Belgium", "code": "+32" },
            "BLZ": { "name": "Belize", "code": "+501" },
            "BEN": { "name": "Benin", "code": "+229" },
            "BMU": { "name": "Bermuda", "code": "+1441" },
            "BTN": { "name": "Bhutan", "code": "+975" },
            "BOL": { "name": "Bolivia", "code": "+591" },
            "BES": { "name": "Bonaire, Sint Eustatius and Saba", "code": "+599" },
            "BIH": { "name": "Bosnia and Herzegovina", "code": "+387" },
            "BWA": { "name": "Botswana", "code": "+267" },
            "BVT": { "name": "Bouvet Island", "code": "+47" },
            "BRA": { "name": "Brazil", "code": "+55" },
            "IOT": { "name": "British Indian Ocean Territory", "code": "+246" },
            "BRN": { "name": "Brunei Darussalam", "code": "+673" },
            "BGR": { "name": "Bulgaria", "code": "+359" },
            "BFA": { "name": "Burkina Faso", "code": "+226" },
            "BDI": { "name": "Burundi", "code": "+257" },
            "KHM": { "name": "Cambodia", "code": "+855" },
            "CMR": { "name": "Cameroon", "code": "+237" },
            "CAN": { "name": "Canada", "code": "+1" },
            "CPV": { "name": "Cabo Verde", "code": "+238" },
            "CYM": { "name": "Cayman Islands", "code": "+1345" },
            "CAF": { "name": "Central African Republic", "code": "+236" },
            "TCD": { "name": "Chad", "code": "+235" },
            "CHL": { "name": "Chile", "code": "+56" },
            "CHN": { "name": "China", "code": "+86" },
            "CXR": { "name": "Christmas Island", "code": "+61" },
            "CCK": { "name": "Cocos (Keeling) Islands", "code": "+61" },
            "COL": { "name": "Colombia", "code": "+57" },
            "COM": { "name": "Comoros", "code": "+269" },
            "COG": { "name": "Congo", "code": "+242" },
            "COD": { "name": "Congo, Democratic Republic of the Congo", "code": "+243" },
            "COK": { "name": "Cook Islands", "code": "+682" },
            "CRI": { "name": "Costa Rica", "code": "+506" },
            "CIV": { "name": "Côte d'Ivoire", "code": "+225" },
            "HRV": { "name": "Croatia", "code": "+385" },
            "CUB": { "name": "Cuba", "code": "+53" },
            "CUW": { "name": "Curaçao", "code": "+599" },
            "CYP": { "name": "Cyprus", "code": "+357" },
            "CZE": { "name": "Czechia", "code": "+420" },
            "DNK": { "name": "Denmark", "code": "+45" },
            "DJI": { "name": "Djibouti", "code": "+253" },
            "DMA": { "name": "Dominica", "code": "+1767" },
            "DOM": { "name": "Dominican Republic", "code": "+1809" },
            "ECU": { "name": "Ecuador", "code": "+593" },
            "EGY": { "name": "Egypt", "code": "+20" },
            "SLV": { "name": "El Salvador", "code": "+503" },
            "GNQ": { "name": "Equatorial Guinea", "code": "+240" },
            "ERI": { "name": "Eritrea", "code": "+291" },
            "EST": { "name": "Estonia", "code": "+372" },
            "ETH": { "name": "Ethiopia", "code": "+251" },
            "FJI": { "name": "Fiji", "code": "+679" },
            "FIN": { "name": "Finland", "code": "+358" },
            "FRA": { "name": "France", "code": "+33" },
            "DEU": { "name": "Germany", "code": "+49" },
            "GRC": { "name": "Greece", "code": "+30" },
            "HKG": { "name": "Hong Kong", "code": "+852" },
            "ISL": { "name": "Iceland", "code": "+354" },
            "IDN": { "name": "Indonesia", "code": "+62" },
            "IRN": { "name": "Iran", "code": "+98" },
            "IRQ": { "name": "Iraq", "code": "+964" },
            "IRL": { "name": "Ireland", "code": "+353" },
            "ISR": { "name": "Israel", "code": "+972" },
            "ITA": { "name": "Italy", "code": "+39" },
            "JPN": { "name": "Japan", "code": "+81" },
            "JOR": { "name": "Jordan", "code": "+962" },
            "KEN": { "name": "Kenya", "code": "+254" },
            "KOR": { "name": "Korea, Republic of South Korea", "code": "+82" },
            "LBN": { "name": "Lebanon", "code": "+961" },
            "LKA": { "name": "Sri Lanka", "code": "+94" },
            "MEX": { "name": "Mexico", "code": "+52" },
            "NPL": { "name": "Nepal", "code": "+977" },
            "NLD": { "name": "Netherlands", "code": "+31" },
            "NZL": { "name": "New Zealand", "code": "+64" },
            "NGA": { "name": "Nigeria", "code": "+234" },
            "NOR": { "name": "Norway", "code": "+47" },
            "PAK": { "name": "Pakistan", "code": "+92" },
            "PHL": { "name": "Philippines", "code": "+63" },
            "POL": { "name": "Poland", "code": "+48" },
            "PRT": { "name": "Portugal", "code": "+351" },
            "QAT": { "name": "Qatar", "code": "+974" },
            "ROU": { "name": "Romania", "code": "+40" },
            "RUS": { "name": "Russian Federation", "code": "+7" },
            "SAU": { "name": "Saudi Arabia", "code": "+966" },
            "SGP": { "name": "Singapore", "code": "+65" },
            "ZAF": { "name": "South Africa", "code": "+27" },
            "ESP": { "name": "Spain", "code": "+34" },
            "SWE": { "name": "Sweden", "code": "+46" },
            "CHE": { "name": "Switzerland", "code": "+41" },
            "TWN": { "name": "Taiwan", "code": "+886" },
            "THA": { "name": "Thailand", "code": "+66" },
            "TUR": { "name": "Türkiye", "code": "+90" },
            "UKR": { "name": "Ukraine", "code": "+380" },
            "ARE": { "name": "United Arab Emirates", "code": "+971" },
            "GBR": { "name": "United Kingdom", "code": "+44" },
            "USA": { "name": "United States of America", "code": "+1" },
            "URY": { "name": "Uruguay", "code": "+598" },
            "UZB": { "name": "Uzbekistan", "code": "+998" },
            "VEN": { "name": "Venezuela", "code": "+58" },
            "VNM": { "name": "Vietnam", "code": "+84" },
            "YEM": { "name": "Yemen", "code": "+967" },
            "ZMB": { "name": "Zambia", "code": "+260" },
            "ZWE": { "name": "Zimbabwe", "code": "+263" },
            "OTH": { "name": "Other", "code": "" }
        }


        let html = "";

        // html += `<div class="form-floating mb-3">`;
        html += `    <select class="form-select" name="countryCode" id="countryCode" style="max-width: 120px">`;

        let countryCodes = Object.keys(countryCallingCodes);
        for (let i = 0; i < countryCodes.length; i++) {
            let countryCode = countryCodes[i];
            let countryName = countryCallingCodes[countryCodes[i]].name;
            let telPrefix = countryCallingCodes[countryCodes[i]].code;
            if (jsu.isNotNull(selCountry) && countryCode == selCountry) {
                html += `<option value="${telPrefix}, ${countryCode}" selected>${telPrefix} ${countryName}</option>`;
            }
            else {
                html += `<option value="${telPrefix}, ${countryCode}">${telPrefix} ${countryName}</option>`;
            }
        }

        html += `    </select>`;
        // html += `   <label for="countryCode">Code</label>`;
        // html += `</div>`;

        return html;

    }

    function showAioPlanDetails() {
        let aioCheckId = "tsrPlanStockAioCheck";
        let aioCheck = document.getElementById(aioCheckId);
        let checked = aioCheck.checked ? true : false;

        let aioPlanDetailsDivId = "tsrPlanAioPlanDetails";
        let aioPlanDetailsDiv = document.getElementById(aioPlanDetailsDivId);
        if (checked) {
            aioPlanDetailsDiv.style.display = "flex";
        } else {
            aioPlanDetailsDiv.style.display = "none";
        }

    }


    return {
        gc: getCards,
        pa: planAction,
        hs: handleSubmit,
        sapd: showAioPlanDetails,
    }
})();