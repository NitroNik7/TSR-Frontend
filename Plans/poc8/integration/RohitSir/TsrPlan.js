
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


        if(curSub!=null && jsu.isNotNull(curSub.plan)){
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


        if (jsu.isNull(curPlan)   || curPlan == 'EXPIRED'){
            return;
        }
        let html = "";
        if (jsu.isNotNull(curSub)) {
            let plan = curSub;
            if (jsu.isNotNull(plan) && JSON.stringify(plan) !== "{}") {

                let planName = plan.name == null ? "" : plan.name.toUpperCase();
                let daysRemaining = plan.daysRemaining == null ? "-" : plan.daysRemain;
                let endDate = plan.endDate == null ? "" : plan.endDate;

                let status = "";
                if (planName != "") {
                    if (daysRemaining > 0) {
                        status = "ACTIVE"
                    } else {
                        status = "EXPIRED"
                    }
                } else {
                    status = "NOT SUBSCRIBED";
                }

                let emailTrig = plan.emailTrig;
                let emailBal = plan.emailPending;

                let smsTrig = plan.smsTrig;
                let smsBal = plan.smsPending;

                let waTrig = plan.waTrig;
                let waBal = plan.waPending;

                let alertArr = plan.alert;

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

                // html += `               <!-- RIGHT (Arrow) -->`
                // html += `               <span class="tsrAccArrow"></span>`

                html += `           </button>`
                html += `           </h2>`

                html += `           <div id="subsDetails" class="accordion-collapse collapse" data-bs-parent="#subscriptionAccordion">`

                html += `               <div class="accordion-body">`

                html += `                   <div class="row">`
                // html += `                   <div class="col-md-9">`
                html += `                       <table class="table table-sm tsrTable">`
                html += `                           <thead>`
                html += `                               <tr>`
                html += `                                   <th>Alerts</th>`
                html += `                                   <th>Triggered</th>`
                html += `                                   <th>Balance</th>`
                html += `                               </tr>`
                html += `                           </thead>`
                html += `                           <tbody>`

                // "emailTrig": 0,
                // "emailPending": 0,
                // "smsTrig": 0,
                // "smsPending": 0,
                // "waTrig": 0,
                // "waPending": 0
                // for (let i = 0; i < alertArr.length; i++) {
                //     let alertType = alertArr[i]["type"].toUpperCase();
                //     let triggered = alertArr[i]["triggered"];
                //     let balance = alertArr[i]["balance"];

                html += `                               <tr>`
                html += `                                  <td>EMAIL</td>`;
                html += `                                  <td>${emailTrig}</td>`;
                html += `                                  <td>${emailBal}</td>`;
                html += `                               </tr>`
                html += `                               <tr>`
                html += `                                  <td>SMS</td>`;
                html += `                                  <td>${smsTrig}</td>`;
                html += `                                  <td>${smsBal}</td>`;
                html += `                               </tr>`
                html += `                               <tr>`
                html += `                                  <td>Whatsapp</td>`;
                html += `                                  <td>${waTrig}</td>`;
                html += `                                  <td>${waBal}</td>`;
                html += `                               </tr>`
                // }
                html += `                           </tbody>`
                html += `                       </table>`
                // html += `                   </div>`

                // html += `                   <div class="col-md-3 tsrActionCol">`
                // html += `                       <button class="btn btn-outline-primary tsrActionBtn">UPGRADE`
                // html += `                           PLAN</button>`
                // html += `                       <button class="btn btn-outline-primary tsrActionBtn">RENEW`
                // html += `                           PLAN</button>`
                // html += `                       <button class="btn btn-outline-primary tsrActionBtn">BUY`
                // html += `                           ALERTS</button>`
                // html += `                   </div>`
                html += `            </div>`

                html += `       </div>`
                html += `</div>`

                html += `</div>`
                html += `</div>`
                html += `</div>`

            }

        } else {
            let html = "";

            html += `<div class="container card my-3" style="max-width: 400px;">`
            html += `   <div class="d-flex flex-column flex-sm-row align-items-center justify-content-between p-3">`
            html += `       <p style="margin-bottom: 0;">To Buy / Manage Plan</p>`
            html += `       <a href="" class="btn btn-primary my-2 my-sm-0">Login / Register</a>`
            html += `   </div>`
            html += `</div>`
        }
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