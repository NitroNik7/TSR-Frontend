
var intChUi = (function () {

    function getIntChHeader() {
        let html = "";

        html += getCss();

        html += `
                <nav class="navbar fixed-top navbar-light bg-light" style="padding: 0;">
                    <div class="container-fluid" style="justify-content: start;">`

        html += getNavMenu();

        html += getLinks();

        html += `   </div>
                </nav>`;

        return html;
    }

    function getCss() {
        let html = "";

        html += `
        <style>
                .tsrIntChHeader {
                    height: 30px;
                    border-bottom: 1px solid #8080805e;
                }

                .chartPanel {
                    /* border: 2px solid #DDD; */
                    border-radius: 0px !important;
                    padding: 0 !important;
                }

                .tsrIntChLinks:hover{
                    text-decoration: underline;
                    text-underline-offset: 3px;
                }

                /* old classes */
                .page-container {
                padding-left: 0px !important;
                }

                .main-content {
                padding: 0 !important;
                }

                .container-fluid {
                padding: 0 !important;
                }

                .tsrIntChPanelMenu{
                list-style: none !important; 
                padding-left: 0 !important;
                }

                .tsrIntChPanelMenu>li{
                width: 100%;
                }

                .tsrIntChPanelMenu>li>a{
                position: relative;
                display: block;
                padding: 10px 0 10px 0;
                font-weight: 500;
                font-size: 15px;
                white-space: nowrap;
                color: #fff !important;
                -webkit-transition: .3s;
                -moz-transition: .3s;
                -o-transition: .3s;
                -ms-transition: .3s;
                cursor: pointer;
                }
                
                .tsrIntChPanelMenu>li>a>.arrow{
                position: absolute;
                right: 10px;
                }

                .tsrIntChPanelMenu li a.dropdown-toggle:after { 
                display: none; border-radius: 0px; 
                }

                .tsrIntChPanelMenu>li>ul{
                position: relative;
                padding: 0;
                padding-left: 30px;
                width: 100%;
                        border: 0;
                        box-shadow: none;
                        background-color: transparent;
                }

                .tsrIntChPanelMenu>li>ul>li>a{
                color: #fff;
                }

        </style>
`;

        return html;
    }

    function getNavMenu() {

        let html = "";

        html += `
                        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                                aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon" style="height: 20px; width: 20px;"></span>
                        </button>

                        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel"
                                style="width: 275px;">
                                <div class="offcanvas-header">
                                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                                        <img src="//www.topstockresearch.com/static/v21/img/tsr/TsrLogo.png" alt="TSR - TopStockresearch"
                                        name="TSR - TopStockresearch" height="40px;" style="vertical-align:top">
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div class="offcanvas-body" style="background: linear-gradient(0deg,#09124f 0,#090979 30%,#006fbf 100%);">`
        html += `
                                    <ul class="tsrIntChPanelMenu">`



        html += `               <ul class="tsrIntChPanelMenu">`;


        let keys = Object.keys(menuJson);

        for (let i = 0; i < keys.length; i++) {
            html += `<li class='nav-item' style="margin-top: 6px;">`;
            if (menuJson[keys[i]]["dropdown"]) {
                html += `<a> `;
            } else {
                html += `<a href='${menuJson[keys[i]]["url"]}'> `;
            }
            html += `
                        <span class='icon-holder' id='${menuJson[keys[i]]["iconHolderId"]}Div' aria-hidden='true'> </span> 
                        <span class='title'>${menuJson[keys[i]]["label"]}</span>`
            if (menuJson[keys[i]]["dropdown"]) {
                html += `<span class="arrow"> <i class="fa fa-solid fa-chevron-right"></i> </span>`
            }
            html += `</a>`

            if (menuJson[keys[i]]["dropdown"]) {
                let subMenu = menuJson[keys[i]]["subMenu"];

                html += `<ul class="dropdown-menu"> `
                for (let j = 0; j < subMenu.length; j++) {
                    html += `   
                                <li>
                                <a href='${subMenu[j].url}'>
                                        ${subMenu[j].label}
                                </a>
                                </li> `;
                }
                html += `</ul> `;
            };
            html += `</li>`
        }


        html += '                   </ul>';
        html += `               </div>
                        </div>`;

        return html;
    }

    function getLinks() {
        let html = "";

        let links = [
            { label: "BTST", url: "https://www.topstockresearch.com/rt/Screener/ExpertScreener/BTSTStrategies" },
            { label: "Breakout", url: "https://www.topstockresearch.com/rt/Screener/ExpertScreener/BreakoutStrategies" },
            { label: "Swing", url: "https://www.topstockresearch.com/rt/Screener/ExpertScreener/SwingTradingStrategies" },
        ]

        html += `<div class="d-flex justify-content-around w-50">`;

        for (let i = 0; i < links.length; i++) {
            html += `<a href="${links[i]["url"]}" style="font-size: 14px; border-radius: 5px;" class="tsrIntChLinks link-secondary p-1 px-3">${links[i]["label"]}</a>`;
        }

        html += `</div>`;

        return html;
    }

    return {
        gich: getIntChHeader,

    }
})();