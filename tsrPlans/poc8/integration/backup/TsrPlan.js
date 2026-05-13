
var miSuPl = (function () { // Mi Subscription plan cards ...

    let htmlU = mintHtmlUtil;
    let jsu = mintJsUtil;

    let plansSectionId = "tsrPlanWrapper"; // TODO - add as ID along with class

    function init() {


        // TODO REMOVE LATER
        // TODO add CSS to head OR
        // TODO replace with getElementById
        // let plansSection = document.querySelector("." + plansSectionId); 
        // plansSection.innerHTML += tsrPlanActionCss();

        let cards = miSupc.gc();

        htmlU.addMsgToDiv('tsrPlanCards', true, cards);

    }

    function periodChange(period, btnIdx) {

        let cards = miSupc.gc(period);
        htmlU.addMsgToDiv('tsrPlanCards', true, cards);


        // TODO add btnIdx param to .pc() on server side
        const slider = document.querySelector(".tsrToggleSlider");
        slider.style.transform = `translateX(${btnIdx * 100}%)`;

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