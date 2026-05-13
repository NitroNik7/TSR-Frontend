var miSupc = (function () { // Mi Subscription plan cards ...

    let htmlU = mintHtmlUtil;
    let jsu = mintJsUtil;


    let CSS_OLD_PRICE = `text-decoration: line-through; color: #adb5bd;font-size: 14px; text-wrap: nowrap;`

    let CSS_DISCOUNT = `background: #e6f4ea;color: #2f9e44;padding: 3px 8px; border-radius: 999px;font-size: 11px;`

    let CSS_PRICE = `font-size: 34px;font-weight: 600;margin-bottom: 6px;`

    let CSS_PRICE_SPAN = `font-size: 14px;color: #6c757d;`
    let CSS_EFF_PRICE = `font-size: 12px; color: #6c757d; margin-bottom: 16px;`


    let curPlan = null;
    let curPlanCost = null;

    let DEF_PERIOD = '1Y';

    let SU_PA_FB_DIV = "tsrPlanActionModalFbDiv"; // SUBS. PLAN ACTION FB DIV

    // let FORM_ID = "tsrPlanActionModalForm";

    function getCards(period) {

        curPlan = curSub.plan;

        if (period == null) period = DEF_PERIOD;

        if (jsu.isNotNull(curPlan) && curPlan !='EXPIRED') {
            let planDef = jsu.getObjFrmArr(planDetails, curPlan);
            let planData = jsu.getObjFrmArr(planDef.period, period);
            curPlanCost = Math.round(planData.orig);
        }

        let html = '';



        for (let i = 0; i < planDetails.length; i++) {

            let details = planDetails[i];

            html += getCard(details, period);
        }
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

        if (jsu.isNotNull(curPlan)   && curPlan != 'EXPIRED') {
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


        let curPlanVal = -1 * curSub.valueRemain;


        let buyPrice = null;
        if (state == `renew` && jsu.isNotNull(renewDiscount)) {
            buyPrice = planData.orig - (((planData.off + renewDiscount) / 100) * planData.orig);
        } else if (state == `upgrade` && jsu.isNotNull(upgradeDiscount)) {
            buyPrice = planData.orig - (((planData.off + upgradeDiscount) / 100) * planData.orig) - curSub.valueRemain; // TODO 1a check with Sir 
        }
        else {
            buyPrice = planData.buyPrice;
        }
        buyPrice = Math.round(buyPrice);


         // if(buyPrice < 0){
         //    return ''  // case of Upgrade to smaller period Higher plan
         // }

        let html = `
            <div class="tsrPlanCard  ${popular}"   data-plan-id="${details.id}">

                <h3>${details.name}</h3>
        `
        // if (jsu.isNotNull(planData.off)) {

        html += `<div class="tsrPriceMeta align-items-center">`
        html += `   <span style="${CSS_OLD_PRICE}"><i class="fas fa-rupee-sign"></i>${Math.round(planData.orig)}</span>`
        html += `</div>`

        html += `<div class="mb-2">`
        if (jsu.isNotNull(planData.off)) {
            html += `   <span style="${CSS_DISCOUNT} text-wrap: nowrap;">${planData.off}% OFF</span>`
        }
        if (state == 'renew' && jsu.isNotNull(renewDiscount)) {
            if (jsu.isNotNull(planData.off)) {
                html += `   <span style="color: #adb5bd;font-size: 16px; ">+</span>`
            }
            if (renewDiscount != 0) {
                html += `   <span style="${CSS_DISCOUNT}" class="">Renew ${renewDiscount}% OFF</span>`
            }
        } else if (state == `upgrade` && jsu.isNotNull(upgradeDiscount) && curSub.valueRemain != 0) { // TODO 1A
            if (jsu.isNotNull(planData.off)) {
                html += `   <span style="color: #adb5bd;font-size: 16px; ">+</span>`
            }
            if (upgradeDiscount != 0) {
                html += `   <span style="${CSS_DISCOUNT}" class="">Upgrade ${upgradeDiscount}% OFF</span>`
                html += `   <span style="color: #adb5bd;font-size: 16px; ">+</span>`
            }
            html += `<br class="my-3">`
            html += `   <span style="${CSS_DISCOUNT} min-width: 90px;" class="">`
            html += `       Active Plan Discount <i class="fas fa-rupee-sign"></i> ${Math.round( curSub.valueRemain)}`
            html += `   </span>`
        }
        html += `</div>`
        // }


        if(buyPrice < 0){

        }else{
             html += `<h2  style="${CSS_PRICE};display: block;">`
                html += `   <i class="fas fa-rupee-sign"></i> ${buyPrice}`
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
        }

        if (jsu.isNotNull(planData.off)) {
            html += ` <div  style="${CSS_EFF_PRICE};display: block;">Effective 
                <strong><i class="fas fa-rupee-sign"></i> ${Math.round(planData.perMth)}/month</strong></div>`
        }


        html += ` <p style="font-size: 14px; color: grey;"> ${details.fit}</p>`

        if (jsu.isNull(curPlan) || curPlan =='EXPIRED') {
            html += `<button onclick="miSupc.pa('buy','${details.id}', '${period}');">Buy</button>`;
        } else {
            if (state == 'disable') {
                // do nothing
                html+=  htmlU.getSpan('You already have higher plan', 'cornflowerblue', 12);

            } else if (state == 'renew') {
                html += `<button onclick="miSupc.pa('renew', '${details.id}', '${period}');">Renew</button>`;
            } else {

                if(buyPrice < 0){
                    html+= htmlU.getSpan( 'Current value more than Plan price. Select Higher period' , 'orange' , 12);
                }else{
                    html += `<button onclick="miSupc.pa('upgrade', '${details.id}', '${period}');">Upgrade</button>`;    
                }

                
               

                


            }
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

        html += getPaymentGatewayHtml();

        html += getPersonalDetailsHtml();
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

        // TODO REMOVE LATER
        //         html += `<!-- 3: Plan Details Table -->
        //         <!-- 3: Plan Details Table -->
        // <div class="bg-light p-3 rounded-3 mb-4 border border-opacity-10">
        //     <div class="d-flex justify-content-between mb-2">
        //         <span class="text-secondary">Original Price</span>
        //         <span class="fw-bold">Trader Pro</span>
        //     </div>
        //     <div class="d-flex justify-content-between mb-2 text-success">
        //         <span class="">Discount</span>
        //         <span class="fw-bold">₹7,080</span>
        //     </div>
        //     <div class="d-flex justify-content-between mb-2 text-success">
        //         <span class="fw-medium">Current Value</span>
        //         <span class="fw-bold">- - ₹2,124</span>
        //     </div>
        //     <hr class="my-2">
        //     <div class="d-flex justify-content-between align-items-center">
        //         <span class="mb-0 fw-bold">Upgrade Total</span>
        //         <span class="mb-0 fw-bold">₹5,848</span>
        //     </div>
        // </div>`

        html += getPaymentGatewayHtml();

        html += getPersonalDetailsHtml();
        html += ``
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

        html += getPaymentGatewayHtml();

        // TODO REMOVE LATER
        // html += `    <!-- Choose Renew duration  -->`
        // html += `    <div>`
        // // html += `        <p class="fw-bold">Select Renew Duration :</p>`
        // html += `        <!-- RENEW discount text -->`
        // html += `        <p style="text-align: center; font-weight: 500;" class="text-success">Additional ${renewDiscount}% Renew Discount on Annual Plans</p>`
        // html += `        <div class="tsrPlansRenewOptionsWrapper">`

        // for (let i = 0; i < periodArr.length; i++) {

        //     let period = periodArr[i];

        //     // let buyPrice = Math.round(period.buyPrice * 100) / 100;
        //     // let origPc = Math.round(period.orig * 100) / 100;

        //     let origPc = Math.round(period.orig);
        //     let offPcHtml = period.off == null ? `<span class="text-success">${renewDiscount}%</span>` : `${period.off}% + <span class="text-success">${renewDiscount}%</span>`;
        //     let offPc = period.off == null ? renewDiscount : renewDiscount + period.off;
        //     let buyPrice = period.orig - ((offPc / 100.0) * period.orig);
        //     buyPrice = Math.round(buyPrice);

        //     if (period.id == selPeriod) {
        //         html += `            <div class="card tsrPlansRenewOption active">`
        //     } else {
        //         html += `            <div class="card tsrPlansRenewOption">`
        //     }

        //     html += `                <h6>${period.period}</h6>`
        //     html += ``
        //     html += `                <div class="d-flex justify-content-between">`
        //     html += `                    <p>Basic Price</p>`
        //     html += `                    <p><i class="fas fa-rupee-sign"></i> ${origPc}</p>`
        //     html += `                </div>`
        //     html += `                <div class="d-flex justify-content-between">`
        //     html += `                    <p>Discount</p>`
        //     html += `                    <p>${offPcHtml}</p>`
        //     html += `                </div>`
        //     html += `                <div class="d-flex justify-content-between fw-bold">`
        //     html += `                    <p>Total Price</p>`
        //     html += `                    <p><i class="fas fa-rupee-sign"></i> ${buyPrice}</p>`
        //     html += `                </div>`
        //     // html += `               <div class="text-center mt-3">`
        //     // html += `                   <button type="submit" class="btn btn-primary">Renew</button>`
        //     // html += `               </div>`
        //     html += `            </div>`

        // }

        // html += ``
        // html += `        </div>`
        // html += `    </div>`
        // html += ``

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

        html += getPersonalDetailsHtml();
        html += ``

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
        html +=    ' </div>'

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
        // TODO REMOVE LATER
        // html += `           
        //             <select class="form-select" name="countryCode" id="countryCode" style="max-width: 120px">
        //                 <option value="IND, +91">+91 India</option>
        //                 <option value="AFG, +93">+93 Afghanistan</option>
        //                 <option value="ALA, +358">+358 Åland Islands</option>
        //                 <option value="ALB, +355">+355 Albania</option>
        //                 <option value="DZA, +213">+213 Algeria</option>
        //                 <option value="ASM, +1684">+1684 American Samoa</option>
        //                 <option value="AND, +376">+376 Andorra</option>
        //                 <option value="AGO, +244">+244 Angola</option>
        //                 <option value="AIA, +1264">+1264 Anguilla</option>
        //                 <option value="ATA, +672">+672 Antarctica</option>
        //                 <option value="ATG, +1268">+1268 Antigua and Barbuda</option>
        //                 <option value="ARG, +54">+54 Argentina</option>
        //                 <option value="ARM, +374">+374 Armenia</option>
        //                 <option value="ABW, +297">+297 Aruba</option>
        //                 <option value="AUS, +61">+61 Australia</option>
        //                 <option value="AUT, +43">+43 Austria</option>
        //                 <option value="AZE, +994">+994 Azerbaijan</option>
        //                 <option value="BHS, +1242">+1242 Bahamas</option>
        //                 <option value="BHR, +973">+973 Bahrain</option>
        //                 <option value="BGD, +880">+880 Bangladesh</option>
        //                 <option value="BRB, +1246">+1246 Barbados</option>
        //                 <option value="BLR, +375">+375 Belarus</option>
        //                 <option value="BEL, +32">+32 Belgium</option>
        //                 <option value="BLZ, +501">+501 Belize</option>
        //                 <option value="BEN, +229">+229 Benin</option>
        //                 <option value="BMU, +1441">+1441 Bermuda</option>
        //                 <option value="BTN, +975">+975 Bhutan</option>
        //                 <option value="BOL, +591">+591 Bolivia</option>
        //                 <option value="BES, +599">+599 Bonaire, Sint Eustatius and Saba</option>
        //                 <option value="BIH, +387">+387 Bosnia and Herzegovina</option>
        //                 <option value="BWA, +267">+267 Botswana</option>
        //                 <option value="BVT, +47">+47 Bouvet Island</option>
        //                 <option value="BRA, +55">+55 Brazil</option>
        //                 <option value="IOT, +246">+246 British Indian Ocean Territory</option>
        //                 <option value="BRN, +673">+673 Brunei Darussalam</option>
        //                 <option value="BGR, +359">+359 Bulgaria</option>
        //                 <option value="BFA, +226">+226 Burkina Faso</option>
        //                 <option value="BDI, +257">+257 Burundi</option>
        //                 <option value="KHM, +855">+855 Cambodia</option>
        //                 <option value="CMR, +237">+237 Cameroon</option>
        //                 <option value="CAN, +1">+1 Canada</option>
        //                 <option value="CPV, +238">+238 Cabo Verde</option>
        //                 <option value="CYM, +1345">+1345 Cayman Islands</option>
        //                 <option value="CAF, +236">+236 Central African Republic</option>
        //                 <option value="TCD, +235">+235 Chad</option>
        //                 <option value="CHL, +56">+56 Chile</option>
        //                 <option value="CHN, +86">+86 China</option>
        //                 <option value="CXR, +61">+61 Christmas Island</option>
        //                 <option value="CCK, +61">+61 Cocos (Keeling) Islands</option>
        //                 <option value="COL, +57">+57 Colombia</option>
        //                 <option value="COM, +269">+269 Comoros</option>
        //                 <option value="COG, +242">+242 Congo</option>
        //                 <option value="COD, +243">+243 Congo, Democratic Republic of the Congo</option>
        //                 <option value="COK, +682">+682 Cook Islands</option>
        //                 <option value="CRI, +506">+506 Costa Rica</option>
        //                 <option value="CIV, +225">+225 Côte d'Ivoire</option>
        //                 <option value="HRV, +385">+385 Croatia</option>
        //                 <option value="CUB, +53">+53 Cuba</option>
        //                 <option value="CUW, +599">+599 Curaçao</option>
        //                 <option value="CYP, +357">+357 Cyprus</option>
        //                 <option value="CZE, +420">+420 Czechia</option>
        //                 <option value="DNK, +45">+45 Denmark</option>
        //                 <option value="DJI, +253">+253 Djibouti</option>
        //                 <option value="DMA, +1767">+1767 Dominica</option>
        //                 <option value="DOM, +1809">+1809 Dominican Republic</option>
        //                 <option value="ECU, +593">+593 Ecuador</option>
        //                 <option value="EGY, +20">+20 Egypt</option>
        //                 <option value="SLV, +503">+503 El Salvador</option>
        //                 <option value="GNQ, +240">+240 Equatorial Guinea</option>
        //                 <option value="ERI, +291">+291 Eritrea</option>
        //                 <option value="EST, +372">+372 Estonia</option>
        //                 <option value="ETH, +251">+251 Ethiopia</option>
        //                 <option value="FJI, +679">+679 Fiji</option>
        //                 <option value="FIN, +358">+358 Finland</option>
        //                 <option value="FRA, +33">+33 France</option>
        //                 <option value="DEU, +49">+49 Germany</option>
        //                 <option value="GRC, +30">+30 Greece</option>
        //                 <option value="HKG, +852">+852 Hong Kong</option>
        //                 <option value="ISL, +354">+354 Iceland</option>
        //                 <option value="IDN, +62">+62 Indonesia</option>
        //                 <option value="IRN, +98">+98 Iran</option>
        //                 <option value="IRQ, +964">+964 Iraq</option>
        //                 <option value="IRL, +353">+353 Ireland</option>
        //                 <option value="ISR, +972">+972 Israel</option>
        //                 <option value="ITA, +39">+39 Italy</option>
        //                 <option value="JPN, +81">+81 Japan</option>
        //                 <option value="JOR, +962">+962 Jordan</option>
        //                 <option value="KEN, +254">+254 Kenya</option>
        //                 <option value="KOR, +82">+82 Korea, Republic of</option>
        //                 <option value="LBN, +961">+961 Lebanon</option>
        //                 <option value="LKA, +94">+94 Sri Lanka</option>
        //                 <option value="MEX, +52">+52 Mexico</option>
        //                 <option value="NPL, +977">+977 Nepal</option>
        //                 <option value="NLD, +31">+31 Netherlands</option>
        //                 <option value="NZL, +64">+64 New Zealand</option>
        //                 <option value="NGA, +234">+234 Nigeria</option>
        //                 <option value="NOR, +47">+47 Norway</option>
        //                 <option value="PAK, +92">+92 Pakistan</option>
        //                 <option value="PHL, +63">+63 Philippines</option>
        //                 <option value="POL, +48">+48 Poland</option>
        //                 <option value="PRT, +351">+351 Portugal</option>
        //                 <option value="QAT, +974">+974 Qatar</option>
        //                 <option value="ROU, +40">+40 Romania</option>
        //                 <option value="RUS, +7">+7 Russian Federation</option>
        //                 <option value="SAU, +966">+966 Saudi Arabia</option>
        //                 <option value="SGP, +65">+65 Singapore</option>
        //                 <option value="ZAF, +27">+27 South Africa</option>
        //                 <option value="ESP, +34">+34 Spain</option>
        //                 <option value="SWE, +46">+46 Sweden</option>
        //                 <option value="CHE, +41">+41 Switzerland</option>
        //                 <option value="TWN, +886">+886 Taiwan</option>
        //                 <option value="THA, +66">+66 Thailand</option>
        //                 <option value="TUR, +90">+90 Türkiye</option>
        //                 <option value="UKR, +380">+380 Ukraine</option>
        //                 <option value="ARE, +971">+971 United Arab Emirates</option>
        //                 <option value="GBR, +44">+44 United Kingdom</option>
        //                 <option value="USA, +1">+1 United States of America</option>
        //                 <option value="URY, +598">+598 Uruguay</option>
        //                 <option value="UZB, +998">+998 Uzbekistan</option>
        //                 <option value="VEN, +58">+58 Venezuela</option>
        //                 <option value="VNM, +84">+84 Viet Nam</option>
        //                 <option value="YEM, +967">+967 Yemen</option>
        //                 <option value="ZMB, +260">+260 Zambia</option>
        //                 <option value="ZWE, +263">+263 Zimbabwe</option>
        //                 <option value="OTH, "> Other</option>
        //             </select>


        //     `
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


    return {
        gc: getCards,
        pa: planAction,
        hs: handleSubmit,
    }
})();