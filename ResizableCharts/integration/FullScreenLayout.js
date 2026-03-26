var michnglo = (function () { // mint  chart ng layout  ....

    var htmlU = mintHtmlUtil;
    var jsu = mintJsUtil;



    /*
        NewChartSettingDiv --  is popup for Indicators can be place any where

        -- selectedValues shoule be just above Chart Warp 

        

    */


    /*
        let CHARTS_DIV =`
            <div id='chartPanel' class="chartPanel " >
               <div id="chartFocus" style="margin:1px ; padding:1px; height:1px;width:1px" tabindex='1'></div>
               <div id='NewChartSettingDiv' class ='ch_root_sel_indi miCtrl' ></div>
               <div id='chSettingsPopup' class ='ch_settings_popup miCtrl' ></div>
               <div id='chartControls' ></div>
               <div id='chartLoading'></div>
               <div id='chartFeedBack' style='text-align:center'></div>
               <div id = 'panel' align='center'> 
               </div>
               <div id = 'selectedValues' align='center' style='padding:0px;margin:3px; font-size: 8pt;height:12px; white-space:nowrap '> </div>
               <div id = 'settingsDiv' style='padding:0px;margin:0px;' > </div>
               <div id='chartWrap'>
                  <div id = 'tsrchart' style="font-size:10px;width:100%"  > 
                  </div>
                  <!-- <div id = 'settings'> </div> -->
               </div>
               <div id="chart_dialog" class="cc_dialog miCtrl"> 
               </div>
               <div id='imgDiv'> </div>
            </div>
        `
    */

    // let  =` <div id='chartWrap'>
    //                    <div id = 'tsrchart' style="font-size:10px;width:100%"  > 
    //                    </div>

    //                 </div>`;

    let CHART_CONT_DIV = '<div id = "tsrchart" style="font-size:10px;width:100%"  > </div>'

    // modified
    let CHARTS_DIV = `
        <div id='chartPanel' class="chartPanel "  >
           <div id='NewChartSettingDiv' class ='ch_root_sel_indi miCtrl' ></div>
           <div id="chartFocus" style="margin:1px ; padding:1px; height:1px;width:1px" tabindex='1'></div>
           <div id='chSettingsPopup' class ='ch_settings_popup miCtrl' ></div>
           <div id ='chartNgLODiv' style="display: flex; flex-direction: column; height: 100vh; overflow: hidden; margin-right: 10px !important;">
                <div id='tsrChNgTopBar'></div>
                <div id='chartControls'></div>
                <div class="d-flex" style="width: 100%; height: 100%; flex-grow: 1;">
                    <div id="tsrChNgLeftBar" style="width: 50px; border: 1px solid lightgray; display: none;"></div>
                    <div id="tsrChNgChartPanelContainer" style="flex-grow: 1; overflow: hidden;">
                        <div id='chartLoading'></div>
                        <div id='chartFeedBack' style='text-align:center'></div>
                        <div id='panel' align='center'> </div>
                        <div id='selectedValues' align='center' style='padding:0px;margin:3px; font-size: 8pt;height:12px; white-space:nowrap '> </div>
                        <div id='settingsDiv' style='padding:0px;margin:0px;' > </div>
                        <div id='chartNgWrap'></div>
                </div>
                <div id="tsrChNgPanelBar" style="display: none; width: 50px; border-left: 1px solid lightgray; border: 1px solid lightgray;" class="flex-column align-items-center justify-content-between">
                </div>
            </div>
            <div id="tsrChNgBottomBar" style="height: 50px; border: 1px solid lightgray; display: none;">
            </div>
        </div>
        <div id="chart_dialog" class="cc_dialog miCtrl"> 
        </div>
        <div id='imgDiv'> </div>
        </div>
    `

    let NG_LO_DIVS = ['tsrChNgTopBar', 'tsrChNgLeftBar', 'tsrChNgPanelBar', 'tsrChNgBottomBar',
        'containerColResizer1', 'panelWrap'];

    let OLD_LO_DIV = ['chartControls'];

    function isNewLayout() {




        let ngch = localStorage.getItem("ngchfs");

        // let ngch = null;

        if (ngch == null || ngch == 'false') {
            ngch = false;
        } else {
            ngch = true;
        }
        return ngch;
    }



    function handleNewLayout() {

        let newlayout = isNewLayout();


        if (htmlU.divExist('chartPanel')) {
            return;
        }

        htmlU.addMsgToDiv('chNgDivWrapper', true, CHARTS_DIV);



        let layoutHoriDivs = [
            { id: "chartWrap" },
            { id: "panelWrap" },
            // { id: "wrap" },
            // { id: "wrap2" }
        ]


        // let panelVertDivs = [
        //     { id: "marketOverview" },
        //     { id: "savedSettings" },
        //     { id: "viewedStocks" },
        //     { id: "watchlist" },
        //     { id: "favScreeners" },
        // ]

        let SETTINGS_SVG = aioIcons.gs('setSb', 'black', 32);
        let PREV_STOCKS_SVG = aioIcons.gs('tevSb', 'black', 32);
        let WL_SVG = aioIcons.gs('wlSb', 'black', 32);
        let SCR_SVG = aioIcons.gs('diysSb', 'lightgray', 32);
        let MARKET_OVERVIEW_SVG = aioIcons.gs('msSb', 'lightgray', 32);

        let panelVertDivs = [
            { id: "savedSettings", label: "Saved Settings", title: "Saved settings", open: true, icon: SETTINGS_SVG },
            { id: "viewedStocks", label: "Viewed Stocks", title: "Viewed Stocks", open: true, icon: PREV_STOCKS_SVG },
            { id: "watchlist", label: "Watchlist", title: "Watchlist", open: true, icon: WL_SVG },
            { id: "marketOverview", label: "Market Overview", title: "Market Overview", open: false, icon: MARKET_OVERVIEW_SVG },
            { id: "favScreeners", label: "Favourite Screeners", title: "Favourite Screeners", open: false, icon: SCR_SVG },
        ];


        // chnglost.pl(layoutHoriDivs,panelVertDivs );
        chnglost.pl(layoutHoriDivs, panelVertDivs);
        htmlU.addMsgToDiv('chartWrap', true, CHART_CONT_DIV);

        // Painting PANEL content
        for (let i = 0; i < panelVertDivs.length; i++) {
            let panel = panelVertDivs[i];
            chngh.gsph(panel);
        }




        // if(isNewLayout()){

        // }else{
        //     htmlU.addMsgToDiv( 'chartNgWrap' , true , CHART_CONT_DIV);   
        // }








        if (!isNewLayout()) {

            let rightBar = document.getElementById("tsrChNgPanelBar");
            rightBar.style.display = "none";
            rightBar.classList.remove("d-flex")
            htmlU.clearAndHideDiv(NG_LO_DIVS);


        } else {

            let rightBar = document.getElementById("tsrChNgPanelBar");
            htmlU.clearAndHideDiv(OLD_LO_DIV);
            rightBar.style.display = "flex";
            rightBar.classList.add("d-flex");



            htmlU.addMsgToDiv('tsrChNgLeftBar', true, 'left');

            htmlU.addMsgToDiv('tsrChNgBottomBar', true, 'Bottom');
            // htmlU.addMsgToDiv('tsrChNgPanelBar' ,true, 'pannel');

            chngh.abtpb(panelVertDivs);


        }

        chnglost.ul(newlayout);
        // return;

    }


    function createNewLayout() {

        // createNewLayout();

    }


    function handleLayoutChange() {

        let gen = htmlU.getRadioVal('ngChRad');

        htmlU.addMsgToDiv('chNgDivWrapper', true, CHARTS_DIV);


        if (gen == 'ngch') {
            createNewLayout();
        } else {
            // use oldLayout




            // Init Tool Bar 

            // Chart Controls --  chartControls

            chInimb.init()


        }

        // and Re draw Charts....
    }




    return {
        hnl: handleNewLayout,
        inl: isNewLayout,
        hnc: handleLayoutChange

    }

})(); // module 
