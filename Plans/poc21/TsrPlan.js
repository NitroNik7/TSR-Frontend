
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
        `

            for (let i = 0; i < ALERT_DEF.length; i++) {

                let alertDef = ALERT_DEF[i];

                html += getAlert(alertDef);
            }


            // <!-- Small Pack -->


            // <!-- Medium Pack -->


            // <!-- Large Pack -->

            html += `
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
        `
            html += `            <br>`


            html += `<div id="tsrPlanPastTxnDiv" class="mt-3">`
            html += `</div>`



        }
        html += `            </div>`

        html += `       </div>`
        html += `</div>`

        html += `</div>`
        html += `</div>`
        html += `</div>`

        htmlU.addMsgToDiv(subsSectionId, true, html);

        getPastTransactions();

    }


    function getAlert(alertdef) {

        let html = `
                                                      <div
                                                            class="col-6 col-md-4 d-flex justify-content-center">
                                                            <div class="tsrPlanCard text-center p-3 p-md-4 h-100 shadow-sm"
                                                                style="border: 1px solid #e0e0e0; border-radius: 12px; background: #fff; min-width: 125px; width: fit-content; ">
                                                                <h3
                                                                    style="font-size: 20px; font-weight: 600; margin-bottom: 15px;">
                                                                    ${alertdef.label}</h3>

                                                                <hr>
                                                                <div
                                                                    class="tsrPlanAlertPackCount mb-3">
                                                                    <div
                                                                        style="font-size: 18px;color: #6c757d;">

                                                                        <span
                                                                            class="d-none d-md-block">
                                                                            ${alertdef.email} Emails
                                                                        </span>
                                                                        <span
                                                                            class="d-block d-md-none">
                                                                            ${alertdef.email} <span
                                                                                style="font-size: 12px;">Emails</span>
                                                                        </span>

                                                                    </div>
                                                                    <div
                                                                        style="font-size: 18px; color: #6c757d;">
                                                                        <span
                                                                            class="d-none d-md-block">
                                                                            ${alertdef.sms} SMS
                                                                        </span>
                                                                        <span
                                                                            class="d-block d-md-none">
                                                                            ${alertdef.sms} <span
                                                                                style="font-size: 12px;">SMS</span>
                                                                        </span>

                                                                    </div>
                                                                    <div
                                                                        style="font-size: 18px;  color: #6c757d; ">
                                                                        <span
                                                                            class="d-none d-md-block">
                                                                            ${alertdef.wa} WhatsApp
                                                                        </span>
                                                                        <span
                                                                            class="d-block d-md-none">
                                                                            ${alertdef.wa}
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
                                                                        ${alertdef.price}
                                                                    </div>
                                                                    <div
                                                                        style="font-size: 11px; color: #adb5bd; text-transform: uppercase; font-weight: 600;">
                                                                        Total Incl. GST
                                                                    </div>
                                                                </div>
                                                                <button class="btn  btn-dark py-2"
                                                                    style="border-radius: 6px; font-weight: 600;"
                                                                    onclick="miSuPgi.ua('ALERT_PACK', '', '${alertdef.term}')">
                                                                    Buy
                                                                </button>`
        html += `
                                                            </div>
                                                        </div>

        `


        return html;


    }

    function getPastTransactions() {



        // TODO later
        // let reqUrl = "https://www.topstockresearch.com/my/MyTsrData/SubPackage.tsr";
        // let pd = { reqType: "spStatus" }
        // let remoteObject = new RC(reqUrl, null, pd, LD_DIV, CONTENTS_FB_DIV, 'miSuPl', 'ppt', null);
        // jsu.rc(remoteObject);

        let subPackage = {
            "statusCode": "success",
            "statusMsg": "Has Records",
            "plan": "TRADER_PRO",
            "endDate": "17_Sep_2026",
            "trigEmailAlert": 0,
            "balEmailAlert": 10,
            "trigSmsAlert": 10,
            "balSmsAlert": 0,
            "trigWhatsAppAlert": 9,
            "balWhatsAppAlert": 1,
            "count": 14,
            "results": [
                {
                    "txnId": "HBYEZ8CGbG_10_09_25_11_09",
                    "pgId": "null",
                    "sub": "TRADER_PRO",
                    "amt": 5310.0,
                    "term": "1Y",
                    "subType": "NEW",
                    "status": "Initiated"
                },
                {
                    "txnId": "0oBxNED7Z1_10_09_25_11_17",
                    "pgId": "null",
                    "sub": "TRADER_PRO",
                    "amt": 0.0,
                    "term": "12M",
                    "subType": "EXTN",
                    "status": "success"
                },
                {
                    "txnId": "YfbikWYL4I_08_05_26_05_35",
                    "pgId": "114495260913",
                    "sub": "TRADER_PRO",
                    "amt": 4602.0,
                    "term": "1Y",
                    "subType": "RENEW",
                    "status": "Aborted"
                },
                {
                    "txnId": "iPAVaDDpYY_13_05_26_07_00",
                    "pgId": "28580513615",
                    "sub": "ALERT_PACK",
                    "amt": 236.0,
                    "term": "1X",
                    "subType": "ALERT_PACK",
                    "status": "failure"
                },
                {
                    "txnId": "wclUa3O9rV_13_05_26_07_23",
                    "pgId": "null",
                    "sub": "TRADER_PRO",
                    "amt": 561.0,
                    "term": "1M",
                    "subType": "RENEW",
                    "status": "Initiated"
                },
                {
                    "txnId": "Lwghwhe6Bw_13_05_26_07_35",
                    "pgId": "null",
                    "sub": "ALERT_PACK",
                    "amt": 236.0,
                    "term": "1X",
                    "subType": "ALERT_PACK",
                    "status": "Initiated"
                },
                {
                    "txnId": "vlPqx9fAir_13_05_26_07_35",
                    "pgId": "null",
                    "sub": "ALERT_PACK",
                    "amt": 236.0,
                    "term": "1X",
                    "subType": "ALERT_PACK",
                    "status": "Initiated"
                },
                {
                    "txnId": "gYvKD0lILK_13_05_26_07_41",
                    "pgId": "null",
                    "sub": "ALERT_PACK",
                    "amt": 236.0,
                    "term": "1X",
                    "subType": "ALERT_PACK",
                    "status": "Initiated"
                },
                {
                    "txnId": "nDlHtT8HZH_13_05_26_07_46",
                    "pgId": "null",
                    "sub": "ALERT_PACK",
                    "amt": 236.0,
                    "term": "1X",
                    "subType": "ALERT_PACK",
                    "status": "Initiated"
                },
                {
                    "txnId": "dnBwQyJQkh_13_05_26_07_46",
                    "pgId": "null",
                    "sub": "ALERT_PACK",
                    "amt": 236.0,
                    "term": "1X",
                    "subType": "ALERT_PACK",
                    "status": "Initiated"
                },
                {
                    "txnId": "1ImAcD3JYe_13_05_26_07_47",
                    "pgId": "null",
                    "sub": "ALERT_PACK",
                    "amt": 590.0,
                    "term": "2X",
                    "subType": "ALERT_PACK",
                    "status": "Initiated"
                },
                {
                    "txnId": "U7RzgKmlaA_13_05_26_07_48",
                    "pgId": "28581326493",
                    "sub": "ALERT_PACK",
                    "amt": 1180.0,
                    "term": "3X",
                    "subType": "ALERT_PACK",
                    "status": "failure"
                },
                {
                    "txnId": "I51kHufb7G_13_05_26_07_48",
                    "pgId": "null",
                    "sub": "AIO_PRO",
                    "amt": 999.0,
                    "term": "1Y",
                    "subType": "BUY_AIO",
                    "status": "Initiated"
                },
                {
                    "txnId": "Y6p0DWifmr_13_05_26_07_49",
                    "pgId": "null",
                    "sub": "ALERT_PACK",
                    "amt": 1180.0,
                    "term": "3X",
                    "subType": "ALERT_PACK",
                    "status": "Initiated"
                }
            ]
        }
        printPastTxn(subPackage);

    }

    function printPastTxn(subPackage) {
        let txnList = subPackage.results;

        let pastTxnDivId = "tsrPlanPastTxnDiv";


        let html = "";
        html += `
                                        <!-- Past Transactions code -->

                                        <div class="accordion tsrAccordion" id="tsrPlansPastTxnAccordion">
                                            <div class="accordion-item tsrAccordionItem">
                                                <h2 class="accordion-header"> <button
                                                        class="accordion-button tsrPlansBuyAlertAccordionBtn  collapsed"
                                                        type="button" data-bs-toggle="collapse"
                                                        data-bs-target="#tsrPlansPastTxn"
                                                        aria-expanded="false" >
                                                            <span
                                                                    class="d-flex align-items-center">
                                                                    <span class="icon-badge me-3">
                                                                        <i class="fas fa-receipt"></i>
                                                                    </span>
                                                                    <span class="text-start" style="font-weight: 600; ">
                                                                        View past transactions
                                                                    </span>
                                                                </span>

                                                        </button>
                                                </h2>
                                            </div>
                                            <div id="tsrPlansPastTxn"
                                                class="accordion-collapse collapse"
                                                data-bs-parent="#tsrPlansPastTxnAccordion">
                                                <div
                                                    class="container-fluid py-4 px-0">
                                                    <div class="row gy-4 justify-content-center">
        `

        html += `<table class="table table-sm table-striped">`
        html += `   <tr>`
        html += `       <th>Plan</th>`
        html += `       <th>Amount</th>`
        html += `       <th>TSR Txn ID</th>`
        html += `       <th>Payment Gateway Txn ID</th>`
        html += `       <th>Status</th>`
        html += `       <th>Term</th>`
        html += `       <th>Invoice</th>`
        html += `   </tr>`
        for (let i = 0; i < txnList.length; i++) {
            let txn = txnList[i];
            html += `   <tr>`
            html += `       <td>${txn.sub}</td>`
            html += `       <td>${txn.amt}</td>`
            html += `       <td>${txn.txnId}</td>`
            html += `       <td>${txn.pgId}</td>`
            html += `       <td>${txn.status}</td>`
            html += `       <td>${txn.term}</td>`
            if (txn.status == "success" && txn.term != "1Y" && txn.sub == "TRADER_PRO") {
                html += `   <td><i class="fas fa-file-pdf"></i></td>`
            }else{
                html += `   <td>-</td>`
            }
            // html += `       <td>${txn.term}</td>`
            html += `   </tr>`

        }
        html += `</table>`
        html += ``
        html += `
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
        `

        htmlU.addMsgToDiv(pastTxnDivId, true, html);

    }


    /*
        let buyAlertText = `<br><div class="row gy-2"><div class="col-lg-4 col-md-12 col-sm-12"><div class="card shadow-lg"><div class="card-header">
                            <h5 class="card-title">Small Pack</h5>
                        </div><div class="card-body"><div class="table-responsive"><table class="table "><tbody><tr><td>SMS Alert </td><td>100</td>  </tr><tr><td>Email Alert </td><td>400</td>  </tr><tr><td>WhatsApp Alert </td><td>200</td>  </tr><tr><td>Base Price </td><td>200.0</td>  </tr><tr><td>GST</td><td> 18 % </td>  </tr><tr><td>Buy Price (Incl Tax)</td><td><b>236.0</b></td>  </tr><tr><td>&nbsp;</td><td><input type="button" class="btn btn-success btn-xs btn-sm" value="Buy SMS / Email Pack" onclick="miSuPgi.ua(&quot;ALERT_PACK&quot;, &quot;&quot;  , &quot;1X&quot; )"> </td>  </tr></tbody></table></div></div></div></div><div class="col-lg-4 col-md-12 col-sm-12"><div class="card shadow-lg"><div class="card-header">
                            <h5 class="card-title">Medium Pack</h5>
                        </div><div class="card-body"><div class="table-responsive"><table class="table "><tbody><tr><td>SMS Alert </td><td>200</td>  </tr><tr><td>Email Alert </td><td>1200</td>  </tr><tr><td>WhatsApp Alert </td><td>400</td>  </tr><tr><td>Base Price </td><td>500.0</td>  </tr><tr><td>GST</td><td> 18 % </td>  </tr><tr><td>Buy Price (Incl Tax)</td><td><b>590.0</b></td>  </tr><tr><td>&nbsp;</td><td><input type="button" class="btn btn-success btn-xs btn-sm" value="Buy SMS / Email Pack" onclick="miSuPgi.ua(&quot;ALERT_PACK&quot;, &quot;&quot;  , &quot;2X&quot; )"> </td>  </tr></tbody></table></div></div></div></div><div class="col-lg-4 col-md-12 col-sm-12"><div class="card shadow-lg"><div class="card-header">
                            <h5 class="card-title">Large Pack</h5>
                        </div><div class="card-body"><div class="table-responsive"><table class="table "><tbody><tr><td>SMS Alert </td><td>500</td>  </tr><tr><td>Email Alert </td><td>3000</td>  </tr><tr><td>WhatsApp Alert </td><td>1000</td>  </tr><tr><td>Base Price </td><td>1000.0</td>  </tr><tr><td>GST</td><td> 18 % </td>  </tr><tr><td>Buy Price (Incl Tax)</td><td><b>1180.0</b></td>  </tr><tr><td>&nbsp;</td><td><input type="button" class="btn btn-success btn-xs btn-sm" value="Buy SMS / Email Pack" onclick="miSuPgi.ua(&quot;ALERT_PACK&quot;, &quot;&quot;  , &quot;3X&quot; )"> </td>  </tr></tbody></table></div></div></div></div></div>`
    */

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


    let ALERT_DEF = [
        {
            "id": "1X",
            "label": "Small Pack",
            "email": "400",
            "sms": "100",
            "wa": "200",
            "price": "236",
            "term": "1X"
        },
        {
            "id": "1X",
            "label": "Medium Pack",
            "email": "1200",
            "sms": "200",
            "wa": "400",
            "price": "590",
            "term": "2X"
        },
        {
            "id": "3X",
            "label": "Large Pack",
            "email": "3000",
            "sms": "500",
            "wa": "1000",
            "price": "1180",
            "term": "3X"
        }
    ]


    return {
        init: init,

        pc: periodChange,
        ppt: printPastTxn
    }
})();