var plans = (function () {

    let htmlU = mintHtmlUtil;
    let jsu = mintJsUtil;

    let url = "";

    let subsSectionId = "tsrPlansActiveSubsSection";

    function init() {
        setSubsDetails();
    }

    function setSubsDetails() {

        let plan = userProf.plan;
        let html = "";
        if (jsu.isNotNull(planStatus.personal)) {
            if (jsu.isNotNull(plan)) {

                let planName = plan.name == null ? "" : plan.name.toUpperCase();
                let status = plan.status == null ? "-" : plan.status.toUpperCase();
                let expDate = plan.expDate == null ? "" : plan.expDate.toUpperCase();
                let daysRemaining = plan.daysRemaining == null ? "-" : plan.daysRemaining;

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
                html += `                       <p class="tsrPlanValue">${expDate}</p>`
                html += `                   </div>`

                html += `                   <div>`
                html += `                       <p class="tsrPlansLabelText">Days remaining</p>`
                html += `                       <p class="tsrPlanValue">${daysRemaining}</p>`
                html += `                   </div>`
                html += `               </div>`

                html += `               <!-- RIGHT (Arrow) -->`
                html += `               <span class="tsrAccArrow"></span>`

                html += `           </button>`
                html += `           </h2>`

                html += `           <div id="subsDetails" class="accordion-collapse collapse" data-bs-parent="#subscriptionAccordion">`

                html += `               <div class="accordion-body">`

                html += `                   <div class="row">`
                html += `                   <div class="col-md-9">`
                html += `                       <table class="table table-sm tsrTable">`
                html += `                           <thead>`
                html += `                               <tr>`
                html += `                                   <th>Alerts</th>`
                html += `                                   <th>Triggered</th>`
                html += `                                   <th>Balance</th>`
                html += `                               </tr>`
                html += `                           </thead>`
                html += `                           <tbody>`
                for (let i = 0; i < alertArr.length; i++) {
                    let alertType = alertArr[i]["type"].toUpperCase();
                    let triggered = alertArr[i]["triggered"];
                    let balance = alertArr[i]["balance"];

                    html += `<tr>`
                    html += `   <td>${alertType}</td>`;
                    html += `   <td>${triggered}</td>`;
                    html += `   <td>${balance}</td>`;
                    html += `</tr>`
                }
                html += `                           </tbody>`
                html += `                       </table>`
                html += `                   </div>`

                html += `                   <div class="col-md-3 tsrActionCol">`
                html += `                       <button class="btn btn-outline-primary tsrActionBtn">UPGRADE`
                html += `                           PLAN</button>`
                html += `                       <button class="btn btn-outline-primary tsrActionBtn">RENEW`
                html += `                           PLAN</button>`
                html += `                       <button class="btn btn-outline-primary tsrActionBtn">BUY`
                html += `                           ALERTS</button>`
                html += `                   </div>`
                html += `            </div>`

                html += `       </div>`
                html += `</div>`

                html += `</div>`
                html += `</div>`
                html += `</div>`

            }
            htmlU.addMsgToDiv(subsSectionId, true, html);

        } else {
            let html = "";

            html += `<div class="container card my-3" style="max-width: 400px;">`
            html += `   <div class="d-flex flex-column flex-sm-row align-items-center justify-content-between p-3">`
            html += `       <p style="margin-bottom: 0;">To Buy / Manage Plan</p>`
            html += `       <a href="" class="btn btn-primary my-2 my-sm-0">Login / Register</a>`
            html += `   </div>`
            html += `</div>`
            htmlU.addMsgToDiv(subsSectionId, true, html);
        }


    }

    // function getData(url) {
    //     let response = await fetch(url);
    //     let data = await response.json();

    //     return json;
    // }

    return {
        init: init
    }
})();

plans.init();

// ------------------PLANS SECTION----------------------

const toggleBtns = document.querySelectorAll(".tsrBillingToggle span");
const slider = document.querySelector(".tsrToggleSlider");
const cards = document.querySelectorAll(".tsrPlanCard[data-monthly]");

let period = "monthly";


// function paintPlanCards() {
//     let html = "";



//     for (let i = 0; i < planDetails.length; i++) {
//         let plan = planDetails[i];
//         let planId = plan.planId;
//         let planName = plan.planName;
//         let planFeatured = plan.planFeatured;
//         let planTypes = plan.planTypes;



//     }

//     planCardsDiv.innerHTML = `

//                     <!-- EOD -->
//                     <div class="tsrPlanCard featured" data-monthly="100"
//                         data-1_year="1888" data-2_year="3068" data-5_year="6490"
//                         data-original-1_year="2360" data-original-2_year="4720"
//                         data-original-5_year="11800" data-effective-1_year="157"
//                         data-effective-2_year="128" data-effective-5_year="108">

//                         <h3>EOD Combo</h3>

//                         <div class="tsrPriceMeta">
//                             <span class="tsrOldPrice"></span>
//                             <span class="tsrDiscount"></span>
//                         </div>

//                         <h2 class="tsrPrice"></h2>
//                         <div class="tsrEffectivePrice"></div>

//                         <p style="font-size: 14px; color: grey;">Suitable for part-time
//                             Investor and Trader</p>
//                         <button>Buy</button>
//                     </div>
//                                         `

// }

function updatePlans() {

    let planCardsDiv = document.querySelector(".tsrPlanCards");
    cards.forEach(card => {
        const monthly = card.dataset.monthly;

        const priceEle = card.querySelector(".tsrPrice");
        const oldPriceEle = card.querySelector(".tsrOldPrice");
        const discountEle = card.querySelector(".tsrDiscount");
        const effectiveEle = card.querySelector(".tsrEffectivePrice");

        if (period === "monthly") {
            priceEle.innerHTML = `<i class="fas fa-rupee-sign"></i> ${monthly} <span>/ month</span>`;

            oldPriceEle.style.display = "none";
            discountEle.style.display = "none";
            effectiveEle.style.display = "none";
            oldPriceEle.innerHTML = "";
            discountEle.innerHTML = "";
            effectiveEle.innerHTML = "";
        } else {
            const total = +card.dataset[period];
            const original = +card.dataset["original-" + period];
            const effective = +card.dataset["effective-" + period];

            const discount = Math.round(((original - total) / original) * 100);

            oldPriceEle.style.display = "block";
            discountEle.style.display = "block";
            effectiveEle.style.display = "block";

            let modeText = "" + period;
            modeText = modeText.replace("_", " ");

            modeText = modeText.replace("1 year", "year");
            priceEle.innerHTML = `<i class="fas fa-rupee-sign"></i> ${total} <span>/ ${modeText}</span>`;
            oldPriceEle.innerHTML = `<i class="fas fa-rupee-sign"></i> ${original}`;
            discountEle.innerHTML = `${discount}% OFF`;
            effectiveEle.innerHTML = `Effective <strong><i class="fas fa-rupee-sign"></i> ${effective}/month</strong>`;
        }
    });
}

toggleBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        toggleBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        period = btn.dataset.type;

        slider.style.transform = `translateX(${index * 100}%)`;

        updatePlans();
    });
});

updatePlans();


// ------------------------------- PLAN COMPARISON SECTION -----------------------------------------

/** 
                                     * Dynamically adjusts the section header 'top' position 
                                     * based on the actual height of the primary header row.
                                     */
function adjustStickyHeaders() {
    const headerRow = document.getElementById('tsrHeaderRow');
    const sectionHeaders = document.querySelectorAll('.tsrPlanSectionHeader');
    const navHeight = 70; // Change this to your navbar's actual pixel height

    if (headerRow) {
        const headerHeight = headerRow.offsetHeight;
        sectionHeaders.forEach(sh => {
            sh.style.top = (navHeight + headerHeight - 1) + 'px';
        });
    }
}

window.addEventListener('load', adjustStickyHeaders);
window.addEventListener('resize', adjustStickyHeaders);

// Logic to ensure sticky headers stack perfectly even if font sizes or padding changes
window.addEventListener('load', function () {
    const mainHeader = document.getElementById('mainHeader');
    const sectionHeaders = document.querySelectorAll('.tsrPlanCompTableSectionHeader');

    const updateHeaderPos = () => {
        const headerHeight = mainHeader.offsetHeight;
        const navbarHeight = 70; // Change this to your actual navbar height

        sectionHeaders.forEach(sh => {
            sh.style.top = (navbarHeight + headerHeight - 1) + 'px';
        });
    };

    updateHeaderPos();
    window.addEventListener('resize', updateHeaderPos);
});