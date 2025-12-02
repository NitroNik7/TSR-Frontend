
var intChUi = (function () {

    var tsrSignalId = "dropdownMenuButton1";

    function getIntChHeader() {
        let html = "";

        html += getCss();

        html += `
                <nav class="navbar fixed-top navbar-light" style="padding: 0; background: white;">
                    <div class="container-fluid" style="justify-content: start;">`

        html += getNavMenu();

        html += getSignalHtml();

        html += getUserProfile();

        // html += getLinks();

        html += `   </div>
                </nav>`;

        return html;
    }

    function getCss() {
        let html = "";

        html += `
        <style>
                .tsrIntChHeader {
                    height: 40px;
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

    // function getSignalHtml() {
    //     let html = "";
    //     html += `
    //         <a tabindex="0" class="example-popover" role="button" data-bs-toggle="popover">
    //             <span class="icon-holder" id="strSbDiv" aria-hidden="true"> 
    //                 <svg style="fill: blue" height="32" viewBox="0 0 288 288" fill="white" xmlns="http://www.w3.org/2000/svg" 	<g>		<path d="M22.9069 213.682L40.0547 203.795C40.0547 203.795 35.8931 195.84 34.6222 185.911C-1.02016 209.71 0.00315178 150.262 0.00315178 150.262L6.24374 160.158C6.5699 200.546 31.0645 180.71 34.3426 177.873C35.2683 164.356 43.9571 150.168 75.2226 147.882C75.2226 147.882 97.9209 145.615 119.197 123.785C119.197 123.785 181.245 47.3955 237.257 117.413C237.257 117.413 250.907 133.094 253.92 141.732C253.92 141.732 274.296 139.467 284.932 156.064C284.932 156.064 270.588 151.969 268.042 154.462C268.042 154.462 289.102 164.236 287.955 184.929C287.955 184.929 273.841 164.689 259.943 166.284C259.943 166.284 257.626 174.694 253.233 180.604V188.786C253.233 188.786 253.465 193.554 237.961 194.465C237.961 194.465 230.552 193.782 229.625 174.683C229.625 174.683 227.771 166.501 219.672 171.053C219.672 171.053 197.19 189.243 219.672 196.737C229.582 200.038 259.026 201.966 256.247 216.743L233.322 224.468C233.322 224.468 234.469 216.286 228.235 211.068C228.235 211.068 206.254 213.684 195.136 210.941C195.136 210.941 231.931 222.881 228.823 244.358H204.519C204.519 244.358 210.426 230.049 196.187 229.021C196.187 229.021 169.459 220.162 156.257 195.267C156.257 195.267 118.755 189.134 83.0053 230.724C83.0053 230.724 79.536 248.464 103.84 255.621C103.84 255.621 126.064 260.743 126.064 278.452H100.369C100.369 278.452 107.666 266.183 90.981 265.508C90.981 265.508 52.1063 261.75 55.912 250.498C55.912 250.498 54.8656 236.864 47.9132 236.864C47.9132 236.864 30.907 239.583 21.1847 274.365C21.1847 274.365 31.2611 279.818 31.2611 288H5.90071C5.90071 288 -5.90153 264.807 19.4482 225.941L22.9069 213.682Z"></path>		<path d="M180.819 2.68447C183.499 6.26516 183.499 12.0687 180.819 15.6493L115.617 102.751C112.937 106.331 108.592 106.331 105.912 102.751L76.4465 63.3903L29.8251 125.673C27.1004 129.191 22.756 129.09 20.12 125.447C17.5507 121.895 17.5507 116.262 20.12 112.708L71.5962 43.9435C74.2765 40.3645 78.6209 40.3645 81.3012 43.9435L110.767 83.3045L171.114 2.68447C173.794 -0.894456 178.138 -0.894456 180.819 2.68447Z"></path>		<path d="M136.678 7.3775C136.678 3.3029 139.261 0 142.447 0H177.06C180.246 0 182.829 3.3029 182.829 7.3775V51.6425C182.829 55.7171 180.246 59.02 177.06 59.02C173.874 59.02 171.291 55.7171 171.291 51.6425V14.755H142.447C139.261 14.755 136.678 11.4521 136.678 7.3775Z"></path>		</g>		</svg>
    //             </span>  
    //         </a>
    //     `;

    //     return html;
    // }
    function getSignalHtml() {
        let html = "";

        html += `
        <div class="dropdown d-flex align-items-center " style="height: 40px;">
            <a class="px-3" id="${tsrSignalId}" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="icon-holder" id="strSbDiv" aria-hidden="true"> <svg fill="url(#gradient)" height="32" viewBox="0 0 288 288" xmlns="http://www.w3.org/2000/svg">		<g>		<path d="M22.9069 213.682L40.0547 203.795C40.0547 203.795 35.8931 195.84 34.6222 185.911C-1.02016 209.71 0.00315178 150.262 0.00315178 150.262L6.24374 160.158C6.5699 200.546 31.0645 180.71 34.3426 177.873C35.2683 164.356 43.9571 150.168 75.2226 147.882C75.2226 147.882 97.9209 145.615 119.197 123.785C119.197 123.785 181.245 47.3955 237.257 117.413C237.257 117.413 250.907 133.094 253.92 141.732C253.92 141.732 274.296 139.467 284.932 156.064C284.932 156.064 270.588 151.969 268.042 154.462C268.042 154.462 289.102 164.236 287.955 184.929C287.955 184.929 273.841 164.689 259.943 166.284C259.943 166.284 257.626 174.694 253.233 180.604V188.786C253.233 188.786 253.465 193.554 237.961 194.465C237.961 194.465 230.552 193.782 229.625 174.683C229.625 174.683 227.771 166.501 219.672 171.053C219.672 171.053 197.19 189.243 219.672 196.737C229.582 200.038 259.026 201.966 256.247 216.743L233.322 224.468C233.322 224.468 234.469 216.286 228.235 211.068C228.235 211.068 206.254 213.684 195.136 210.941C195.136 210.941 231.931 222.881 228.823 244.358H204.519C204.519 244.358 210.426 230.049 196.187 229.021C196.187 229.021 169.459 220.162 156.257 195.267C156.257 195.267 118.755 189.134 83.0053 230.724C83.0053 230.724 79.536 248.464 103.84 255.621C103.84 255.621 126.064 260.743 126.064 278.452H100.369C100.369 278.452 107.666 266.183 90.981 265.508C90.981 265.508 52.1063 261.75 55.912 250.498C55.912 250.498 54.8656 236.864 47.9132 236.864C47.9132 236.864 30.907 239.583 21.1847 274.365C21.1847 274.365 31.2611 279.818 31.2611 288H5.90071C5.90071 288 -5.90153 264.807 19.4482 225.941L22.9069 213.682Z"></path>		<path d="M180.819 2.68447C183.499 6.26516 183.499 12.0687 180.819 15.6493L115.617 102.751C112.937 106.331 108.592 106.331 105.912 102.751L76.4465 63.3903L29.8251 125.673C27.1004 129.191 22.756 129.09 20.12 125.447C17.5507 121.895 17.5507 116.262 20.12 112.708L71.5962 43.9435C74.2765 40.3645 78.6209 40.3645 81.3012 43.9435L110.767 83.3045L171.114 2.68447C173.794 -0.894456 178.138 -0.894456 180.819 2.68447Z"></path>		<path d="M136.678 7.3775C136.678 3.3029 139.261 0 142.447 0H177.06C180.246 0 182.829 3.3029 182.829 7.3775V51.6425C182.829 55.7171 180.246 59.02 177.06 59.02C173.874 59.02 171.291 55.7171 171.291 51.6425V14.755H142.447C139.261 14.755 136.678 11.4521 136.678 7.3775Z"></path>		</g>		</svg></span>
            </a>
            <div class="dropdown-menu p-4">
                <div id="niftyTechStr"><svg width="200" height="43"><defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" spreadMethod="pad"><stop offset="0%" stop-color="#ff0000" stop-opacity="1"></stop><stop offset="50%" stop-color="#e6e600" stop-opacity="1"></stop><stop offset="100%" stop-color="#009900" stop-opacity="1"></stop></linearGradient></defs><g><text x="110" y="10" text-anchor="end" style="font-size: 12px; font-weight: bold;">Nifty Tech Index</text></g><g><rect x="0" y="15" width="190" height="8" rx="4" style="fill: url(&quot;#gradient&quot;);"></rect></g><g><line x1="94.62745098039215" y1="15" x2="94.62745098039215" y2="23" stroke-width="1" stroke-dasharray="2, 2" stroke="black "></line></g><path d="M0,-7.019L6.079,3.51L-6.079,3.51Z" fill="#000" stroke="#000" stroke-width="1" transform="translate(94.62745098039215,25)"></path><g><text x="10" y="34" style="font-size: 10px; font-weight: bold;">Low</text></g><g><text x="180" y="34" text-anchor="end" style="font-size: 10px; font-weight: bold;">High</text></g><g><text x="109" y="34" text-anchor="end" style="font-size: 9px; font-weight: bold;">49.80%</text></g></svg></div>

                <div id="tsaRnkDivLabel">
                    <b><span> NIFTY is more bullish than 30.24 % of stocks </span></b>
                </div>
            </div>
        </div>
        `;

        return html;
    }

    function getUserProfile() {
        let html = "";
        html += `
            <a style="right: 20px; position: fixed;">
                <i class="fas fa-user"></i>
            </a>
        `;

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

    function addMousehover() {
        const dropdownElement = document.getElementById(tsrSignalId); // Or any other selector
        const dropdown = bootstrap.Dropdown.getOrCreateInstance(dropdownElement);

        $("#" + tsrSignalId).hover(
            function () {
                // Code to run on mouseenter (when hovering in)
                dropdown.show();
            },
            function () {
                // Code to run on mouseleave (when hovering out)
                // $(this).removeClass("hovered");
                dropdown.hide();
            }
        )
    }

    return {
        gich: getIntChHeader,
        amh: addMousehover,
        // ep: enablePopover,

    }
})();