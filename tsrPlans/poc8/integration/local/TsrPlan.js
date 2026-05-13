
var miSuPl = (function () { // Mi Subscription plan cards ...

    let htmlU = mintHtmlUtil;
    let jsu = mintJsUtil;

    // let plansSectionId = "tsrPlanWrapper"; // TODO - add as ID along with class

    let subsSectionId = "tsrPlansCurSubsSection"

    function init() {


        // TODO REMOVE LATER
        // TODO add CSS to head OR
        // TODO replace with getElementById
        // let plansSection = document.querySelector("." + plansSectionId); 
        // plansSection.innerHTML += tsrPlanActionCss();


        if (curSub != null && jsu.isNotNull(curSub.plan)) {
            htmlU.divHide('nonLoggedInDiv');
        }


        setSubsDetails();

        let cards = miSupc.gc();

        htmlU.addMsgToDiv('tsrPlanCards', true, cards);

        window.addEventListener('load', adjustPlanTableStickyHeaders);
        window.addEventListener('resize', adjustPlanTableStickyHeaders);

    }

    function periodChange(btn, period, btnIdx) {

        let cards = miSupc.gc(period);
        htmlU.addMsgToDiv('tsrPlanCards', true, cards);


        let btns = document.querySelectorAll(".tsrBillingToggle button")

        btns.forEach(button => {
            button.classList.remove("active");
        });

        btn.classList.add("active");

        // TODO add btnIdx param to .pc() on server side
        const slider = document.querySelector(".tsrToggleSlider");
        slider.style.transform = `translateX(${btnIdx * 100}%)`;

    }


    function adjustPlanTableStickyHeaders() {
        const navHeight = 65; // navbar height

        const headerRow = document.getElementById('tsrPlanTableHeaderRow');
        const sectionHeaders = document.querySelectorAll('.tsrPlanTableSectionHeader');

        if (headerRow) {
            const headerHeight = headerRow.offsetHeight;
            sectionHeaders.forEach(sh => {
                sh.style.top = (navHeight + headerHeight - 1) + 'px';
            });
        }
    }


    function isEmptyObject(obj) {
        return JSON.stringify(plan) !== "{}";
    }


    function setSubsDetails() {

        let curPlan = curSub.plan;

        let planName = "";
        let daysRemaining = ""
        let endDate = ""

        let emailTrig = null
        let emailBal = null

        let smsTrig = null
        let smsBal = null

        let waTrig = null
        let waBal = null

        let status = "";
        let showAlerts = null;

        if (jsu.isNull(curPlan)) {
            return;
        } else if (curPlan == "EXPIRED") {
            planName = "-"
            daysRemaining = "-";
            endDate = "-";
            status = "EXPIRED";
            showAlerts = false;
        } else {
            planName = curPlan == null ? "" : curPlan;
            daysRemaining = curSub.daysRemain == null ? "-" : curSub.daysRemain;
            endDate = curSub.endDate == null ? "" : curSub.endDate;

            if (planName != "") {
                status = "ACTIVE"
            } else {
                status = "NOT SUBSCRIBED";
            }

            showAlerts = true;

            emailTrig = curSub.emailTrig;
            emailBal = curSub.emailPending;
            smsTrig = curSub.smsTrig;
            smsBal = curSub.smsPending;
            waTrig = curSub.waTrig;
            waBal = curSub.waPending;

        }

        let html = "";

        html += `<div class="container my-3">`
        html += `   <div class="accordion tsrAccordion" id="subscriptionAccordion">`

        html += `       <div class="accordion-item tsrAccordionItem">`

        html += `           <h2 class="accordion-header">`
        html += `           <button class="accordion-button tsrAccordionBtn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#subsDetails">`
        html += `               <div class="tsrAccordionHeader">`
        html += `                   <div>`
        html += `                       <p class="tsrPlansLabelText">Plan</p>`
        html += `                       <p class="tsrPlanValue">${planName}</p>`
        html += `                   </div>`

        html += `                   <div>`
        html += `                       <p class="tsrPlansLabelText">Status</p>`
        html += `                       <p class="tsrStatus active">${status}</p>`
        html += `                   </div>`

        html += `                   <div>`
        html += `                       <p class="tsrPlansLabelText">Valid Till</p>`
        html += `                       <p class="tsrPlanValue">${endDate}</p>`
        html += `                   </div>`

        html += `                   <div>`
        html += `                       <p class="tsrPlansLabelText">Days remaining</p>`
        html += `                       <p class="tsrPlanValue">${daysRemaining}</p>`
        html += `                   </div>`
        html += `               </div>`

        html += `           </button>`
        html += `           </h2>`

        html += `           <div id="subsDetails" class="accordion-collapse collapse" data-bs-parent="#subscriptionAccordion">`

        html += `               <div class="accordion-body">`

        html += `                   <div class="row">`
        if (showAlerts) {
            html += `                       <table class="table table-sm tsrTable">`
            html += `                           <thead>`
            html += `                               <tr>`
            html += `                                   <th>Alerts</th>`
            html += `                                   <th>Triggered</th>`
            html += `                                   <th>Balance</th>`
            html += `                               </tr>`
            html += `                           </thead>`
            html += `                           <tbody>`
            html += `                               <tr>`
            html += `                                  <td><i class="fas fa-envelope me-2" style="color: #2563eb;"></i>EMAIL</td>`;
            html += `                                  <td>${emailTrig}</td>`;
            html += `                                  <td>${emailBal}</td>`;
            html += `                               </tr>`
            html += `                               <tr>`
            html += `                                  <td><i class="fas fa-sms me-2" style="color: #001542;"></i>SMS</td>`;
            html += `                                  <td>${smsTrig}</td>`;
            html += `                                  <td>${smsBal}</td>`;
            html += `                               </tr>`
            html += `                               <tr>`
            html += `                                  <td><i class="fab fa-whatsapp me-2" style="color: #2f9e44;"></i> Whatsapp</td>`;
            html += `                                  <td>${waTrig}</td>`;
            html += `                                  <td>${waBal}</td>`;
            html += `                               </tr>`
            html += `                           </tbody>`
            html += `                       </table>`

            html += `
                                        <!-- Buy Alerts code -->

                                        <div class="accordion tsrAccordion" id="buyAlertAccordion">
                                            <div class="accordion-item tsrAccordionItem">
                                                <h2 class="accordion-header"> <button
                                                        class="accordion-button tsrPlansBuyAlertAccordionBtn  collapsed"
                                                        type="button" data-bs-toggle="collapse"
                                                        data-bs-target="#buyAlertDetails"
                                                        aria-expanded="false">
                                                            <span
                                                                    class="d-flex align-items-center">
                                                                    <span class="icon-badge me-3">
                                                                        <i class="fas fa-bell"></i>
                                                                    </span>
                                                                    <span class="text-start" style="font-weight: 600; ">
                                                                        Get More Alerts
                                                                    </span>
                                                                </span>

                                                        </button>
                                                </h2>
                                            </div>
                                            <div id="buyAlertDetails"
                                                class="accordion-collapse collapse"
                                                data-bs-parent="#buyAlertAccordion">
                                                <div id="showAlertOptions"
                                                    class="container-fluid py-4 px-0">
                                                    <div class="row gy-4 justify-content-center">

                                                        <!-- Small Pack -->
                                                        <div
                                                            class="col-6 col-md-4 d-flex justify-content-center">
                                                            <div class="tsrPlanCard text-center p-3 p-md-4 h-100 shadow-sm"
                                                                style="border: 1px solid #e0e0e0; border-radius: 12px; background: #fff; min-width: 125px; width: fit-content; ">
                                                                <h3
                                                                    style="font-size: 20px; font-weight: 600; margin-bottom: 15px;">
                                                                    Small Pack</h3>
                                                                <div
                                                                    class="tsrPlanAlertPackCount mb-3">
                                                                    <div
                                                                        style="font-size: 24px; font-weight: 800; color: #2c3e50; line-height: 1.2">

                                                                        <span
                                                                            class="d-none d-md-block">
                                                                            400 Emails
                                                                        </span>
                                                                        <span
                                                                            class="d-block d-md-none">
                                                                            400 <span
                                                                                style="font-size: 12px;">Emails</span>
                                                                        </span>

                                                                    </div>
                                                                    <div
                                                                        style="font-size: 18px; font-weight: 500; color: #6c757d;">
                                                                        <span
                                                                            class="d-none d-md-block">
                                                                            100 SMS
                                                                        </span>
                                                                        <span
                                                                            class="d-block d-md-none">
                                                                            100 <span
                                                                                style="font-size: 12px;">SMS</span>
                                                                        </span>

                                                                    </div>
                                                                    <div
                                                                        style="font-size: 16px; color: #2f9e44; font-weight: 600; margin-top: 5px;">
                                                                        <span
                                                                            class="d-none d-md-block">
                                                                            200 WhatsApp
                                                                        </span>
                                                                        <span
                                                                            class="d-block d-md-none">
                                                                            200
                                                                            <span
                                                                                style="font-size: 12px;">Whatsapp</span>
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <hr
                                                                    style="border-top: 1px dashed #dee2e6; margin: 20px 0;">

                                                                <div class="price-section mb-4">
                                                                    <div
                                                                        style="font-size: 24px; font-weight: 700; color: #2c3e50;">
                                                                        <i class="fas fa-rupee-sign"
                                                                            style="font-size: 18px;"></i>
                                                                        236
                                                                    </div>
                                                                    <div
                                                                        style="font-size: 11px; color: #adb5bd; text-transform: uppercase; font-weight: 600;">
                                                                        Total Incl. GST
                                                                    </div>
                                                                </div>`
            html += `
                                                                <button class="btn  btn-dark py-2"
                                                                    style="border-radius: 6px; font-weight: 600;"
                                                                    onclick="miSuPgi.ua('ALERT_PACK', '', '1X')">
                                                                    Buy
                                                                </button>`
            html += `
                                                            </div>
                                                        </div>

                                                        <!-- Medium Pack -->
                                                        <div
                                                            class="col-6 col-md-4 d-flex justify-content-center">
                                                            <div class="tsrPlanCard text-center p-3 p-md-4  h-100 shadow-sm"
                                                                style="border: 1px solid #e0e0e0; border-radius: 12px; background: #fff;  min-width: 125px; width: fit-content;">
                                                                <h3
                                                                    style="font-size: 20px; font-weight: 600; margin-bottom: 15px;">
                                                                    Medium Pack
                                                                </h3>

                                                                <div
                                                                    class="tsrPlanAlertPackCount mb-3">
                                                                    <div
                                                                        style="font-size: 24px; font-weight: 800; color: #2c3e50; line-height: 1.2">
                                                                        <span
                                                                            class="d-none d-md-block">
                                                                            1200 Emails
                                                                        </span>
                                                                        <span
                                                                            class="d-block d-md-none">
                                                                            1200
                                                                            <span
                                                                                style="font-size: 12px;">Emails</span>

                                                                        </span>
                                                                    </div>
                                                                    <div
                                                                        style="font-size: 18px; font-weight: 500; color: #6c757d;">
                                                                        <span
                                                                            class="d-none d-md-block">
                                                                            200 SMS
                                                                        </span>
                                                                        <span
                                                                            class="d-block d-md-none">
                                                                            200
                                                                            <span
                                                                                style="font-size: 12px;">SMS</span>

                                                                        </span>
                                                                    </div>
                                                                    <div
                                                                        style="font-size: 16px; color: #2f9e44; font-weight: 600; margin-top: 5px;">
                                                                        <span
                                                                            class="d-none d-md-block">
                                                                            400 WhatsApp
                                                                        </span>
                                                                        <span
                                                                            class="d-block d-md-none">
                                                                            400 <span
                                                                                style="font-size: 12px;">Whatsapp</span>

                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <hr
                                                                    style="border-top: 1px dashed #dee2e6; margin: 20px 0;">

                                                                <div class="price-section mb-4">
                                                                    <div
                                                                        style="font-size: 24px; font-weight: 700; color: #2c3e50;">
                                                                        <i class="fas fa-rupee-sign"
                                                                            style="font-size: 18px;"></i>
                                                                        590
                                                                    </div>
                                                                    <div
                                                                        style="font-size: 11px; color: #adb5bd; text-transform: uppercase; font-weight: 600;">
                                                                        Total Incl. GST
                                                                    </div>
                                                                </div>`
            html += `
                                                                <button class="btn  btn-dark py-2"
                                                                    style="border-radius: 6px; font-weight: 600;"
                                                                    onclick="miSuPgi.ua('ALERT_PACK', '', '2X')">
                                                                    Buy
                                                                </button>`

            html += `
                                                            </div>
                                                        </div>

                                                        <!-- Large Pack -->
                                                        <div
                                                            class="col-6 col-md-4 d-flex justify-content-center">
                                                            <div class="tsrPlanCard text-center p-3 p-md-4  h-100 shadow-sm"
                                                                style="border: 1px solid #e0e0e0; border-radius: 12px; background: #fff;  min-width: 125px; width: fit-content;">
                                                                <h3
                                                                    style="font-size: 20px; font-weight: 600; margin-bottom: 15px;">
                                                                    Large Pack</h3>

                                                                <div
                                                                    class="tsrPlanAlertPackCount mb-3">
                                                                    <div
                                                                        style="font-size: 24px; font-weight: 800; color: #2c3e50; line-height: 1.2">
                                                                        <span
                                                                            class="d-none d-md-block">
                                                                            3000 Emails
                                                                        </span>
                                                                        <span
                                                                            class="d-block d-md-none">
                                                                            3000
                                                                            <span
                                                                                style="font-size: 12px;">Emails</span>

                                                                        </span>
                                                                    </div>
                                                                    <div
                                                                        style="font-size: 18px; font-weight: 500; color: #6c757d;">
                                                                        <span
                                                                            class="d-none d-md-block">
                                                                            500 SMS
                                                                        </span>
                                                                        <span
                                                                            class="d-block d-md-none">
                                                                            500
                                                                            <span
                                                                                style="font-size: 12px;">SMS</span>

                                                                        </span>
                                                                    </div>
                                                                    <div
                                                                        style="font-size: 16px; color: #2f9e44; font-weight: 600; margin-top: 5px;">
                                                                        <span
                                                                            class="d-none d-md-block">
                                                                            1000 WhatsApp
                                                                        </span>
                                                                        <span
                                                                            class="d-block d-md-none">
                                                                            1000
                                                                            <span
                                                                                style="font-size: 12px;">Whatsapp</span>

                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <hr
                                                                    style="border-top: 1px dashed #dee2e6; margin: 20px 0;">

                                                                <div class="price-section mb-4">
                                                                    <div
                                                                        style="font-size: 24px; font-weight: 700; color: #2c3e50;">
                                                                        <i class="fas fa-rupee-sign"
                                                                            style="font-size: 18px;"></i>
                                                                        1180
                                                                    </div>
                                                                    <div
                                                                        style="font-size: 11px; color: #adb5bd; text-transform: uppercase; font-weight: 600;">
                                                                        Total Incl. GST
                                                                    </div>
                                                                </div>`

            html += `                                           <button class="btn btn-dark py-2"
                                                                    style="border-radius: 6px; font-weight: 600;"
                                                                    onclick="miSuPgi.ua('ALERT_PACK', '', '3X')">
                                                                    Buy
                                                                </button>`
            html += `
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
        `

        }
        html += `            </div>`

        html += `       </div>`
        html += `</div>`

        html += `</div>`
        html += `</div>`
        html += `</div>`

        htmlU.addMsgToDiv(subsSectionId, true, html);

    }


    // TODO REMOVE LATER
    // function tsrPlanActionCss() {
    //     let html = "";

    //     html += `
    //     <style>
    //         .tsrPlansRenewOptionsWrapper {
    //             display: grid;
    //             grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    //             gap: 10px;
    //             margin-bottom: 15px;
    //         }

    //         .tsrPlansRenewOption {
    //             padding: 10px;
    //             transition: border 0.1s;
    //         }

    //         .tsrPlansRenewOption.active {
    //             border: 2px solid #2563eb;
    //         }

    //         .tsrPlansRenewOption:hover {
    //             border: 1px solid #2563eb;
    //             cursor: pointer;
    //         }

    //         .tsrPlansRenewOption h6 {
    //             margin: 10px 0;
    //             font-weight: bold;
    //             border-bottom: 1px solid black;
    //         }

    //         .tsrPlansRenewOption p {
    //             margin-bottom: 5px;
    //         }
    //     </style>
    // `;



    //     return html;
    // }


    return {
        init: init,

        pc: periodChange
    }
})();