
$(document).ready(function () {

    // $('#tsrSecRotOutperformTable').DataTable({
    //     paging: false,
    //     // pageLength: 5,
    //     responsive: true,
    //     scrollCollapse: false,
    //     scrollY: 250,
    //     scrollX: true

    //     // ordering: true
    // });
    // $('#tsrSecRotUnderperformTable').DataTable({
    //     paging: false,
    //     // pageLength: 5,
    //     responsive: true,
    //     scrollCollapse: false,
    //     scrollY: 250,
    //     scrollX: true

    //     // ordering: true
    // });

    /* =========================================
        DATATABLES
    ========================================== */

    // $('#tsrStockComparisonTable0').DataTable({

    //     // scrollX: true,
    //     // paging: true,
    //     pageLength: 5,
    //     // searching: true,
    //     // ordering: true,
    //     // info: true,
    //     // autoWidth: false,

    //     // fixedColumns: {
    //     //     left: 1,
    //     //     right: 1
    //     // },

    //     // dom: 'Bfrtip',

    //     // buttons: [
    //     //     'copy',
    //     //     'csv',
    //     //     'excel',
    //     //     'print'
    //     // ]

    // });

    // $('.tsrSecRotApplyBtn').click(function () {

    //     $(this).html(`
    //         <span class="spinner-border spinner-border-sm me-2"></span>
    //         Applying...
    //     `);

    //     setTimeout(() => {
    //         $(this).html(`
    //         <i class="fas fa-filter me-2"></i>
    //         Apply Filters
    //     `);
    //     }, 1200);

    // });

    // $('.tsrSecRotRefreshBtn').click(function () {

    //     $(this).addClass('active');

    //     setTimeout(() => {
    //         $(this).removeClass('active');
    //     }, 800);

    // });


});

function expandSectorCompTable(btn, id) {
    let opDivId = "tsrSecRotOpSectorsWrapper";
    let upDivId = "tsrSecRotUpSectorsWrapper";
    let btnArr = document.getElementsByClassName("tsrSecRotTableExpandCollapseBadge");

    let opDiv = document.getElementById(opDivId);
    let upDiv = document.getElementById(upDivId);
    if (opDiv.classList.contains("col-xl-6")) {
        opDiv.classList.remove("col-xl-6");
        upDiv.classList.remove("col-xl-6");
        opDiv.classList.add("col-12");
        upDiv.classList.add("col-12");
        for (let i = 0; i < btnArr.length; i++) {
            let btn = btnArr[i];
            btn.innerHTML = `
                <span class="fw-medium me-2">Show less</span>
                <i class="fas fa-expand"></i>
            `;
        }
    }
    else {
        opDiv.classList.remove("col-12");
        upDiv.classList.remove("col-12");
        opDiv.classList.add("col-xl-6");
        upDiv.classList.add("col-xl-6");
        for (let i = 0; i < btnArr.length; i++) {
            let btn = btnArr[i];
            btn.innerHTML = `
                <span class="fw-medium me-2">Show more</span>
                <i class="fas fa-expand"></i>
            `;
        }
    }

    let div = document.getElementById(id);
    div.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

/**
 * TSR Sector Rotation Stacked Sliders Initializer Framework Hook
*/
$(document).ready(function () {
    // Stacking vertically allows increasing item count safely per viewport slice
    if ($.fn.owlCarousel && $('.periodicReturns').length > 0) {
        $('.periodicReturns').owlCarousel({
            loop: false,
            margin: 8,
            nav: false,
            dots: true,
            responsive: {
                0: { items: 1 },
                400: { items: 2 },
                576: { items: 3 },
                992: { items: 2 },
                1400: { items: 3 }
            }
        });
    }

    if ($.fn.owlCarousel && $('.technicals').length > 0) {
        $('.technicals').owlCarousel({
            loop: false,
            margin: 8,
            nav: false,
            dots: true,
            responsive: {
                0: { items: 1 },
                400: { items: 2 },
                576: { items: 3 },
                992: { items: 2 },
                1400: { items: 3 }
            }
        });
    }
});

