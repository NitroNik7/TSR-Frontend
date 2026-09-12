var miSupc = (function () { // Mi Subscription plan cards ...

    let htmlU = mintHtmlUtil;
    let jsu = mintJsUtil;

    let thisObject = 'miSupc'


    let CSS_OLD_PRICE = `text-decoration: line-through; color: #adb5bd;font-size: 14px; text-wrap: nowrap;`

    // let CSS_DISCOUNT = `background: #e6f4ea;color: #2f9e44;padding: 3px 8px; border-radius: 999px;font-size: 11px;`

    // let CSS_DISCOUNT = `background: #e6f4ea;color: #2f9e44;padding: 3px 8px; border-radius: 999px;font-size: 11px;font-weight: 600;`
    let CSS_DISCOUNT = `background: #ededed;color: #9aa2aa; padding: 3px 8px; border-radius: 999px;font-size: 11px;font-weight: 600;`

    let CSS_SAVINGS = `background: #e6f4ea; color: #2f9e44; padding: 5px 8px; border-radius: 999px; font-size: 12px; font-weight: bold; width: max-content; margin-bottom: 0; text-wrap: nowrap;`
    let CSS_SAVINGS_INFO = `color: grey; padding: 5px 8px; border-radius: 999px; font-size: 12px; font-weight: bold; width: max-content; margin-bottom: 0;`

    // let CSS_PRICE = `font-size: 34px;font-weight: 600;margin-bottom: 6px;`
    let CSS_PRICE = `font-size: 40px;font-weight: 600;margin-bottom: 6px; display: block;`


    let CSS_PRICE_SPAN = `font-size: 14px;color: #6c757d;`
    // let CSS_EFF_PRICE = `font-size: 12px; color: #6c757d; margin-bottom: 16px;`
    let CSS_EFF_PRICE = `font-size: 12px; font-weight: 600; color: black; margin: 8px 0;`



    let curPlan = null;
    let curPlanCost = null;

    let DEF_PERIOD = '1Y';

    let SU_PA_FB_DIV = "tsrPlanActionModalFbDiv"; // SUBS. PLAN ACTION FB DIV

    // let FORM_ID = "tsrPlanActionModalForm";



    let origBuyPrice = null; // needed to apply ref. disc.
    let origAioPrice = null; // needed to apply ref. disc.
    let finalBuyPrice = null;

    let refDisc = 0;

    let selPeriod = null;

    let aioPrice = 999;

    function getCards(period) {

        curPlan = curSub.plan;

        if (period == null) period = DEF_PERIOD;

        if (jsu.isNotNull(curPlan) && curPlan != 'EXPIRED' && curPlan != 'BASIC') {
            let planDef = jsu.getObjFrmArr(planDetails, curPlan);
            let planData = jsu.getObjFrmArr(planDef.period, period);
            curPlanCost = Math.round(planData.orig);
        }

        let html = '';


        html += getCard(jsu.getObjFrmArr(planDetails, "EOD_COMBO"), period);
        html += getCard(jsu.getObjFrmArr(planDetails, "TRADER_PRO"), period);
        html += getCard(jsu.getObjFrmArr(planDetails, "TRADER_VALUE"), period);

        // for (let i = 0; i < planDetails.length; i++) {

        //     let details = planDetails[i];

        //     if (details.id == 'EOD_FUNDA' || details.id == 'TRADER') {
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

        if (jsu.isNotNull(curPlan) && curPlan != 'EXPIRED' && curPlan != 'BASIC') {
            if (origCost < curPlanCost) {
                state = 'disable'
            } else if (origCost == curPlanCost) {
                state = 'renew'
            } else {
                state = 'upgrade'
            }
        }

        if (jsu.isNull(curPlan)) { state = 'login' }



        let popular = details.pop ? 'featured ' : ''
        let renewDiscount = details.renew;
        let upgradeDiscount = details.upgrade;


        // let curPlanVal = -1 * curSub.valueRemain;


        let buyPrice = null, savings = null;
        if (state == `renew` && jsu.isNotNull(renewDiscount)) {
            savings = ((planData.off + renewDiscount) / 100) * planData.orig;
            buyPrice = planData.orig - savings;
        } else if (state == `upgrade` && jsu.isNotNull(upgradeDiscount)) {
            savings = (((planData.off + upgradeDiscount) / 100) * planData.orig) + curSub.valueRemain;
            buyPrice = planData.orig - savings;
        }
        else {
            savings = (planData.off / 100) * planData.orig;
            buyPrice = planData.orig - savings;
            // OR
            // buyPrice = planData.buyPrice; // as planData.buyPrice = planData.orig - planData.off % 
        }
        savings = Math.round(savings);
        buyPrice = Math.round(buyPrice);


        // if(buyPrice < 0){
        //    return ''  // case of Upgrade to smaller period Higher plan
        // }

        let html = `
                <div class="tsrPlanCard ${popular}" style="display: flex; flex-direction: column; justify-content: space-between" data-plan-id="${details.id}">`

        if (jsu.isNotNull(popular)) {
            html += `<span class="badge btn-success" style="position: absolute; top: -12px; left: 36%;  border-radius: 10px"><i class="fas fa-crown"></i> POPULAR</span>`
        }
        html += `<div class="d-flex flex-column">`

        html += `   <h3 style="font-size: 22px; margin-bottom: 12px; font-weight: 600;">${details.name}</h3>`

        if (jsu.isNotNull(details.subHeading)) {
            html += `   <h6 style="font-size: 13px; font-weight: 600; color: grey; margin-top: 4px; margin-bottom: 16px; text-wrap: nowrap;">${details.subHeading}</h6>`
        }

        // Original price row - Original price + Savings + Disc %
        // if (jsu.isNotNull(planData.off) || (state == "renew" && jsu.isNotNull(renewDiscount)) || (state=="upgrade" && jsu.isNotNull(upgradeDiscount)) || (state=="upgrade" && curSub.valueRemain)) {
        if (jsu.isNotNull(savings) && buyPrice > 0) {
            html += `<div class="tsrPriceMeta">`
            html += `       <span style="${CSS_OLD_PRICE}"><i class="fas fa-rupee-sign"></i>${origCost}</span>`
            // if (jsu.isNotNull(savings)) {
            // html += `<div class="mb-2">`
            html += `       <p style="${CSS_SAVINGS};"> Save <i class="fas fa-rupee-sign"></i> `
            html += `           <span style="font-size: 15px;">${savings}</span>`
            html += `       </p>`
            // html += `</div>`
            // }

            if (jsu.isNotNull(planData.off)) {
                html += `   <span style="${CSS_DISCOUNT} text-wrap: nowrap;">`
                html += `        ${planData.off}% OFF`
                html += `   </span>`
            }

            html += `</div>`

        }

        // Discount row - Upgrade / Renew Disc. % + Active Plan Discount
        html += `   <div class="mt-2 mb-3" style="text-align: center;">`
        if (state == 'renew' && jsu.isNotNull(renewDiscount)) {
            html += `   <span style="${CSS_DISCOUNT} text-wrap: nowrap;">`
            if (jsu.isNotNull(planData.off)) {
                html += `   + `
            }
            html += `       Renew ${renewDiscount}% OFF `
            html += `   </span>`
        } else if (state == `upgrade` && jsu.isNotNull(upgradeDiscount) && buyPrice > 0) {
            html += `   <span style="${CSS_DISCOUNT} text-wrap: nowrap;">`
            if (jsu.isNotNull(planData.off)) {
                html += `   + `
            }
            html += `       Upgrade ${upgradeDiscount}% OFF`
            if (curSub.valueRemain != 0) {
                html += `       + `
                html += `       <i class="fas fa-rupee-sign" style="font-size: 8px;"></i> ${Math.round(curSub.valueRemain)} OFF <i class="fas fa-info-circle" title='Active Plan Discount'></i>`
            }
            html += `   </span>`
        }

        html += `   </div>`


        // if (buyPrice < 0) {

        // } else {
        html += `<h2  style="${CSS_PRICE};display: block;">`
        if (buyPrice < 0) {

            html += `   <i class="fas fa-rupee-sign" style="font-size: 1.25rem; font-weight: 600; color: #0f172a; "></i>  ${origCost}`
        } else {
            html += `   <i class="fas fa-rupee-sign" style="font-size: 1.25rem; font-weight: 600; color: #0f172a; "></i>  ${buyPrice}`
        }
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
        // }



        let perMth = buyPrice;
        if (buyPrice < 0) {
            perMth = origCost;
        }
        // else {
        html += ` <div style="${CSS_EFF_PRICE};display: block;"> `
        if (period != "1M") {
            // if (period)
            if (period == "1Y") {
                perMth = buyPrice / 12;
            } else if (period == "2Y") {
                perMth = buyPrice / 24;
            } else if (period == "5Y") {
                perMth = buyPrice / 60;
            }
            html += `   <span>
                            <i class="fas fa-rupee-sign"></i> ${Math.round(perMth)}/month
                        </span>`
            html += `   <span style="font-weight: 300;">&#x2022;</span>`
        }
        html += ` 
                        <span>
                            <i class="fas fa-rupee-sign"></i> ${Math.round(perMth / 30)}/day
                        </span>
                    </div>`
        // }


        let margin = planData.gstInv ? "0" : "8px 0";
        html += `   <p style="margin: ${margin}; font-size: 12px; color: grey;">
                        <span>Incl. of all taxes</span>
                    </p>`

        if (planData.gstInv) {
            html += `<p style="margin:4px 0px 8px 0; font-size: 12px; color: grey;">
                        <span>GST invoice available</span>
                    </p>`
        }
        html += `</div>`


        if (jsu.isNull(curPlan) || curPlan == 'EXPIRED' || curPlan == 'BASIC') {
            if (state == 'login') {
                // do nothing
                html += `<button onClick='migUi.urm()'  data-bs-toggle='modal' data-bs-target='#tsrUserRegModal'>Buy</button> `

            } else {
                html += `<button onclick="miSupc.pa('buy','${details.id}', '${period}');">Buy</button>`;
            }
        } else {
            if (state == 'disable') {
                // do nothing
                // html += htmlU.getSpan('You already have higher plan', 'cornflowerblue', 12);
                html += `
                        <div class="tsrPlansAlertNotice tsrPlansAlertMuted">
                            <i class="fas fa-info-circle tsrPlansAlertIcon"></i>
                            <div class="tsrPlansAlertContent">
                                <span class="tsrPlansAlertTitle">Higher Plan Active</span>
                                <span class="tsrPlansAlertSubtitle">You already have a higher plan</span>
                            </div>
                        </div>
                
                `
            } else if (state == 'renew') {
                html += `<button onclick="miSupc.pa('renew', '${details.id}', '${period}');">Renew</button>`;
            } else {
                if (buyPrice < 0) {
                    // html += htmlU.getSpan('Current value more than Plan price. Select Higher period', 'orange', 12);
                    html += `
                            <div class="tsrPlansAlertNotice tsrPlansAlertWarning">
                                <i class="fas fa-exclamation-circle tsrPlansAlertIcon"></i>
                                <div class="tsrPlansAlertContent">
                                    <span class="tsrPlansAlertTitle">Current Value Exceeds Price</span>
                                    <span class="tsrPlansAlertSubtitle">Select a higher billing period</span>
                                </div>
                            </div>
                    `
                } else {
                    html += `<button onclick="miSupc.pa('upgrade', '${details.id}', '${period}');">Upgrade</button>`;
                }
            }
        }

        html += ` <hr style="border-top: 1px dashed #dee2e6; margin: 20px 0;">`
        html += ``
        html += `   <div>`
        html += `       <ul class="mb-3">`
        let entitlements = planData.entitlements;
        for (let j = 0; j < entitlements.length; j++) {
            html += `       <li class="d-flex align-items-baseline gap-3">
                               <i class="fas fa-check" style="color: green;"></i> 
                               <span style="text-align: left;">${entitlements[j]}</span>
                           </li>`
        }
        html += `       </ul>`

        html += `       <div class="tsrPlansSuitabilityBox p-2 rounded-2">`
        html += `           <div class="tsrPlansSuitabilityHeader d-flex align-items-center mb-2">`
        html += `               <span>Suitable for</span>`
        html += `           </div>`
        html += `           <div class="tsrPlansFitChipsContainer">`
        for (let i = 0; i < details.fit.length; i++) {
            html += `           <span class="tsrPlansFitChip">${details.fit[i]}</span>`
        }
        html += `          </div>`
        html += `      </div>`
        html += `   </div>`


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


            triggerReferrer();
        }
    }


    function buyPlanModalHtml(detailsId, period) {

        let details = jsu.getObjFrmArr(planDetails, detailsId);
        let planData = jsu.getObjFrmArr(details.period, period);

        selPeriod = period;

        if (jsu.isNull(planData.off)) planData.off = 0;

        // let buyPrice = Math.round(planData.buyPrice);
        let savings = planData.off / 100 * planData.orig;
        let buyPrice = Math.round(planData.orig - savings);

        origBuyPrice = buyPrice;
        origAioPrice = aioPrice;

        let html = "";

        html += ``

        html += getPlanDetailsHtml(detailsId, period, buyPrice, aioPrice);
        html += `   <hr style="margin: 8px 0 16px 0">`

        html += getBuyAioHtml();
        html += `   <hr  style="margin: 16px 0">`

        html += getPaymentGatewayHtml();


        html += getPersonalDetailsHtml();

        if (planData.gstInv) {
            html += getGstDetailsHtml();
        }

        html += ``

        html += '<div id="refCodeDiv"></div>';


        //   userAction(action, id, period, country, telPrefix, tel)
        html += `    <button  onsubmit="return false;" onclick="miSupc.hs('NEW' ,'${detailsId}', '${period}')" class="btn btn-success w-100">PROCEED TO PAYMENT</button>`
        // html += `</form>`
        html += getFbDiv();




        return html;
    }

    function upgradePlanModalHtml(detailsId, period) {

        let details = jsu.getObjFrmArr(planDetails, detailsId);
        let planData = jsu.getObjFrmArr(details.period, period);

        if (jsu.isNull(planData.off)) planData.off = 0;
        if (jsu.isNull(details.upgrade)) details.upgrade = 0;

        selPeriod = period;
        let buyPrice = null;

        let upgradeDiscount = details.upgrade;
        if (jsu.isNotNull(upgradeDiscount)) {
            let savings = (((planData.off + upgradeDiscount) / 100) * planData.orig) + curSub.valueRemain
            buyPrice = planData.orig - savings;
        } else {
            let savings = (planData.off / 100) * planData.orig;
            buyPrice = planData.orig - savings;
            // buyPrice = planData.buyPrice;
        }
        buyPrice = Math.round(buyPrice);

        origBuyPrice = buyPrice;
        origAioPrice = aioPrice;

        let html = "";

        html += ``


        html += getPlanDetailsHtml(detailsId, period, buyPrice, aioPrice);
        html += `   <hr style="margin: 8px 0 16px 0">`


        html += getBuyAioHtml();
        html += `   <hr  style="margin: 16px 0">`


        html += getPaymentGatewayHtml();
        // html += `   <hr>`

        html += getPersonalDetailsHtml();
        html += ``
        if (planData.gstInv) {
            html += getGstDetailsHtml();
        }

        html += '<div id="refCodeDiv"></div>';
        //   userAction(action, id, period, country, telPrefix, tel)
        html += `    <button  onsubmit="return false;" onclick="miSupc.hs('UPGRADE' ,'${detailsId}', '${period}')" class="btn btn-success w-100">PROCEED TO PAYMENT</button>`
        // html += `</form>`
        html += getFbDiv();




        return html;
    }

    function renewPlanModalHtml(detailsId, period) {

        let details = jsu.getObjFrmArr(planDetails, detailsId);
        let planData = jsu.getObjFrmArr(details.period, period);

        selPeriod = period;

        if (jsu.isNull(planData.off)) planData.off = 0;
        if (jsu.isNull(details.renew)) details.renew = 0;

        let renewDiscount = details.renew;


        let html = "";
        // html += `<form id="${FORM_ID}">`

        // html += getFbDiv();


        // let offPc = planData.off == null ? renewDiscount : renewDiscount + planData.off;
        let savings = ((planData.off + renewDiscount) / 100) * planData.orig;
        let buyPrice = planData.orig - savings;
        buyPrice = Math.round(buyPrice);

        origBuyPrice = buyPrice;
        origAioPrice = aioPrice;

        html += ``
        html += ``
        html += getPlanDetailsHtml(detailsId, period, buyPrice, aioPrice);
        html += `   <hr style="margin: 8px 0 16px 0">`


        html += getBuyAioHtml();
        html += `   <hr  style="margin: 16px 0">`

        // html += `   <hr>`

        html += getPaymentGatewayHtml();
        // html += `   <hr>`

        html += getPersonalDetailsHtml();

        if (planData.gstInv) {
            html += getGstDetailsHtml();
        }
        html += ``
        html += '<div id="refCodeDiv"></div>';
        // html += `    <button type="submit" class="btn btn-primary w-100">PROCEED TO PAYMENT</button>`
        html += `    <button  onsubmit="return;" onclick="miSupc.hs('RENEW' ,'${detailsId}', '${period}')" class="btn btn-success w-100">PROCEED TO PAYMENT</button>`
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



    function getPlanDetailsHtml(detailsId, period, buyPrice, aioPrice) {

        let details = jsu.getObjFrmArr(planDetails, detailsId);
        let planData = jsu.getObjFrmArr(details.period, period);

        buyPrice = Math.round(buyPrice);

        // let tsrPlanDetailsDivId = "tsrPlanDetailsDiv";
        let aioPlanDetailsDivId = "tsrPlansAioPlanDetailsDiv";

        let html = "";
        // html += `   <div id="${tsrPlanDetailsDivId}">`;
        html += `   <div>`;

        html += `       <div id="refDiscDiv" class="mb-2"></div>`

        // tsr plan row
        html += `       <div class="row g-3">`
        html += `           <div class="col-4">`
        html += `               <p class="fw-bold" style="text-transform: uppercase; font-size: 14px; margin-bottom: 0;">Plan</p>`
        html += `               <p style="margin-bottom: 0;">${details.name}</p>`
        html += `           </div>`
        html += `           <div class="col-4">`
        html += `               <p class="fw-bold" style="text-transform: uppercase; font-size: 14px; margin-bottom: 0;">Duration</p>`
        html += `               <p style="margin-bottom: 0;">${planData.period}</p>`
        html += `           </div>`
        html += `           <div class="col-4">`
        html += `               <p class="fw-bold" style="text-transform: uppercase; font-size: 14px; margin-bottom: 0;">Price</p>`
        html += `               <p id='buyPriceDiv' style="margin-bottom: 0;"><i class="fas fa-rupee-sign"></i> ${buyPrice}</p>`
        html += `           </div>`
        html += `        </div>`
        html += `       <div id="${aioPlanDetailsDivId}" class="row g-3"  style="display: none;">`
        html += `           <div class="col-4">`
        html += `               <p style="margin-bottom: 0;">AIO Pro</p>`
        html += `           </div>`
        html += `           <div class="col-4">`
        html += `               <p style="margin-bottom: 0;">1 Year</p>`
        html += `           </div>`
        html += `           <div class="col-4">`
        html += `               <p  id='buyAioPriceDiv' style="margin-bottom: 0;"><i class="fas fa-rupee-sign"></i> ${aioPrice}</p>`
        html += `           </div>`
        html += `       </div>`
        html += `          <hr style="margin: 8px 0">`

        // total row
        html += `           <div class="row">`
        html += `               <div class="col-8">`
        html += `                   <p class="fw-bold" style="text-transform: uppercase; font-size: 14px; margin-bottom: 0;">Total</p>`
        // html += `               <p style="margin-bottom: 0;">AIO Pro</p>`
        html += `               </div>`
        html += `               <div class="col-4">`
        // html += `               <p class="fw-bold" style="text-transform: uppercase; font-size: 14px; margin-bottom: 0;">Duration</p>`
        html += `                  <p id="buyTotalPriceDiv" style="margin-bottom: 0;"><i class="fas fa-rupee-sign"></i> ${buyPrice}</p>`
        html += `              </div>`
        html += `          </div>`
        html += `       </div>`

        html += `   </div>`;


        html += ``

        return html;
    }

    function getBuyAioHtml() {
        const tsrPlansStockAioCheck = "tsrPlansStockAioCheck";
        const tsrPlansAioImpNotesDivId = "tsrPlansAioImpNotesDiv";

        let html = "";

        html += `<div class="tsrPlansAioCard mb-3">`;
        html += `  <div class="form-check">`;
        html += `    <input class="form-check-input" type="checkbox" id="${tsrPlansStockAioCheck}" onchange="miSupc.sapd();">`;
        html += `    <label class="form-check-label" for="${tsrPlansStockAioCheck}">`;
        html += `      <p class="tsrPlansAioHeadline">`;
        html += `        Get Access to global market @ <span class="tsrPlansAioBadge"><i class="fas fa-rupee-sign"></i> ${aioPrice}</span> with <a href="https://www.stockaio.com/US/ai/Home" target="_blank" rel="noopener noreferrer" class="text-decoration-underline">StockAIO</a>`;
        html += `      </p>`;
        html += `      <p class="tsrPlansAioSubtitle">Markets covered: AU, CA, UK and US</p>`;
        html += `    </label>`;
        html += `  </div>`;

        html += `  <div id="${tsrPlansAioImpNotesDivId}" style="display: none;">`;
        html += `    <div class="accordion w-100" id="tsrPlansAioNoteAccordion">`;
        html += `      <div class="accordion-item">`;
        html += `        <h2 class="accordion-header" id="tsrPlansAioNoteHeading">`;
        html += `          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#tsrPlansAioNoteCollapse" aria-expanded="false" aria-controls="tsrPlansAioNoteCollapse">`;
        html += `            Important Notes`;
        html += `          </button>`;
        html += `        </h2>`;
        html += `        <div id="tsrPlansAioNoteCollapse" class="accordion-collapse collapse" aria-labelledby="tsrPlansAioNoteHeading" data-bs-parent="#tsrPlansAioNoteAccordion">`;
        html += `          <div class="accordion-body">`;
        html += `            <ul class="tsrPlansAioNotesList">`;
        html += `              <li>New Stock AIO Account created automatically if not registered.</li>`;
        html += `              <li>StockAIO is managed separately from TSR.</li>`;
        html += `              <li>Password of Stock AIO is maintained independently.</li>`;
        html += `              <li>Stock AIO currently serves EOD AU/CA/UK/US prices.</li>`;
        html += `            </ul>`;
        html += `          </div>`;
        html += `        </div>`;
        html += `      </div>`;
        html += `    </div>`;
        html += `  </div>`;
        html += `</div>`;

        return html;
    }

    function getPaymentGatewayHtml() {
        let html = "";

        html += `    <!-- 5: Payment Gateway -->`
        html += `    <div class="d-flex mb-2">`
        html += `        <p class="mb-2">Payment Gateway</p>`
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


    function triggerReferrer() {

        let referral = htmlU.getInputVal('referral');

        if (referral == null) return;

        var REF_URL = '/my/GetRefInfo';

        var pd = { code: referral, period: selPeriod }
        var rc = new RC(REF_URL, null, pd, '', '', thisObject, 'trr', '');
        myTsrUtils.rc(rc);


    }

    function triggerReferrerResponse(data, type, remoteObject) { // apply Save Setting


        refDisc = 0;

        if (data.statusCode == NOT_SIGNED_IN) {
            return;
        }

        if (data.statusCode == MSG_STATUS_NO_RECORD) {
            return;
        }

        if (data.statusCode !== MSG_STATUS_GOOD) {
            return;
        }

        let msg = 'You have applied code of ' + htmlU.doBold(data.refOf);

        if (data.msg != null) {
            msg += BR_2 + htmlU.getSpan(data.msg, 'orange', null);
        } else {

            if (jsu.isNotNull(data.mths)) {
                msg += BR_2 + htmlU.getSpan("Additional  " + data.mths + " months extention is applicable", 'green', null);
            }

            if (jsu.isNotNull(data.discount)) {

                refDisc = data.discount;

                msg += BREAK_LINE + htmlU.getSpan("Additional Discount of   " + htmlU.doBold(data.discount) + "% will be offered", null, null);

                // msg += BR_2 + htmlU.getSpan("Old Price was    <i class='fas fa-rupee-sign'></i> " + origBuyPrice + "", null, null);



                let totalPrice, oldPrice;

                let aioChecked = htmlU.isChecked("tsrPlansStockAioCheck");
                oldPrice = aioChecked ? origBuyPrice + origAioPrice : origBuyPrice;

                let newBuyPrice = Math.round(origBuyPrice * (100 - refDisc) / 100);
                let newAioPrice = Math.round(origAioPrice * (100 - refDisc) / 100);
                totalPrice = aioChecked ? newBuyPrice + newAioPrice : newBuyPrice;

                // msg += BREAK_LINE + htmlU.getSpan("Old Price was    <i class='fas fa-rupee-sign'></i> " + oldPrice + "", null, null);
                msg += BREAK_LINE + `<p id="refOldPriceDiv" style="margin-bottom: 0; color: green;">Old Price was   <i class='fas fa-rupee-sign'></i>${oldPrice}</p>`
                msg += BREAK_LINE + `<p id="refTotalPriceDiv" style="margin-bottom: 0; color: green;">New Price with Referral Discount is   <i class='fas fa-rupee-sign'></i>${totalPrice}</p>`
                // msg += BR_2 + htmlU.getSpan("New Price with Referral Discount is   <i class='fas fa-rupee-sign'></i>  " + totalPrice + "", 'green', null);


                // id='buyPriceDiv'><i class="fas fa-rupee-sign"></i> ${buyPrice}</p>

                htmlU.addMsgToDiv('buyPriceDiv', true, "<i class='fas fa-rupee-sign'></i>" + newBuyPrice)
                htmlU.addMsgToDiv('buyAioPriceDiv', true, "<i class='fas fa-rupee-sign'></i>" + newAioPrice)
                htmlU.addMsgToDiv('buyTotalPriceDiv', true, "<i class='fas fa-rupee-sign'></i>" + totalPrice);
                htmlU.addMsgToDiv("refDiscDiv", true, `<strong style="color: green;">${refDisc} % Referral Discount Applied</strong>`);
            }

        }
        htmlU.addMsgToDiv('refCodeDiv', true, msg);
        msg += BR_2
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
        if (jsu.isNotNull(curSub) && jsu.isNotNull(curSub.gstNo)) {
            html += `            <input type="text" class="form-control" id="${gstNumberInputId}" value="${curSub.gstNo}">`
        } else {
            html += `            <input type="text" class="form-control" id="${gstNumberInputId}" placeholder="(Optional)">`
        }
        html += `        </div>`
        html += `    </div>`

        return html;

    }

    function showAioPlanDetails() {

        let aioChecked = htmlU.isChecked("tsrPlansStockAioCheck");
        let aioPlanImpNotesDivId = "tsrPlansAioImpNotesDiv";
        let aioPlanImpNotesDiv = document.getElementById(aioPlanImpNotesDivId);

        let aioPlanDetailsDivId = "tsrPlansAioPlanDetailsDiv";
        let aioPlanDetailsDiv = document.getElementById(aioPlanDetailsDivId);

        if (aioChecked) {
            aioPlanImpNotesDiv.style.display = "block";
            aioPlanDetailsDiv.style.display = "flex";
            // planDetailsDiv.style.display = "none"
        } else {
            aioPlanImpNotesDiv.style.display = "none";
            aioPlanDetailsDiv.style.display = "none";
            // planDetailsDiv.style.display = "flex";
        }

        let oldPrice = 0;
        let totalPrice = 0;

        if (aioChecked) {
            oldPrice = origBuyPrice + origAioPrice;
            totalPrice = (origBuyPrice + origAioPrice) * ((100 - refDisc) / 100);
        } else {
            oldPrice = origBuyPrice;
            totalPrice = origBuyPrice * ((100 - refDisc) / 100);
        }

        oldPrice = Math.round(oldPrice);
        totalPrice = Math.round(totalPrice);
        if (jsu.isNotNull(refDisc) && refDisc > 0) {
            htmlU.addMsgToDiv("refDiscDiv", true, `<strong style="color: green;">${refDisc} % Referral Discount Applied</strong>`);
        }
        htmlU.addMsgToDiv("buyTotalPriceDiv", true, "<i class='fas fa-rupee-sign'></i>" + totalPrice);
        htmlU.addMsgToDiv("refOldPriceDiv", true, "Old Price was   <i class='fas fa-rupee-sign'></i>" + oldPrice);
        htmlU.addMsgToDiv("refTotalPriceDiv", true, "New Price with Referral Discount is   <i class='fas fa-rupee-sign'></i>" + totalPrice);

    }



    return {
        gc: getCards,
        pa: planAction,
        hs: handleSubmit,
        trr: triggerReferrerResponse,
        sapd: showAioPlanDetails
    }
})();