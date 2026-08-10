var EquityEyeHh = (function () {

    var htmlU = mintHtmlUtil;
    var jsu = mintJsUtil;

    let CAT_HIGH_LOW = "highsNLows";

    function printPortletContent(data, type, remoteObject) {

        let html = "";

        var portlet = remoteObject.portlet;
        if (data.statusCode == "success") {


            if (type == "highsNLows") {
                html = getHighLowHtml(portlet, type, data.data);
            } else if (type == "finStrength") {
                // TODO
            }

        }

        htmlU.addMsgToDiv(portlet.id + "Body", true, html);
    }

    function getHighLowHtml(portlet, cat, data) {


        let html = "";
        // print settings row
        //      Add a period button
        //      Save changes button
        let settingsRowHtml = "";
        settingsRowHtml += `<div class="miCtrl">`;
        settingsRowHtml += `    <button onclick="EquityEyeHh.csd('${cat}', 'addPeriod')">Add a Period</button>`;
        settingsRowHtml += `    <button onclick="EquityEyeHh.ss('${cat}')">Save changes</button>`;
        settingsRowHtml += `</div>`;
        settingsRowHtml += `<br>`;

        let tableHtml = "";
        if (jsu.isNotNull(data)) {
            tableHtml += `<div id="${cat}Table">`;
            tableHtml += `
                            <table class="table table-striped table-bordered table-hover">
                                <thead> 
                                    <tr>
                                        <th>Duration</th>
                                        <th>Old Price</th>
                                        <th>Price Gain</th>
                                        <th>Price Gain %</th>
                                        <th>Period High</th>
                                        <th>Period High Date</th>
                                        <th>Period Low</th>
                                        <th>Period Low Date</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>`
            // < tr ></tr >
            Object.keys(data).forEach((duration) => {
                let periodVals = data[duration];

                // oldPrice: 7567.50,
                // priceGain: 662.50,
                // priceGainPc: 8.75,
                // periodHigh: 8775.5,
                // periodHighDate: "06/08/2026",
                // periodLowOnDate: 7473.5,
                // periodLowDate: "31/07/2026",
                tableHtml += `<tr>
                                    <td>${duration}</td>
                                    <td>${periodVals["oldPrice"]}</td>
                                    <td>${periodVals["priceGain"]}</td>
                                    <td>${periodVals["priceGainPc"]}</td>
                                    <td>${periodVals["periodHigh"]}</td>
                                    <td>${periodVals["periodHighDate"]}</td>
                                    <td>${periodVals["periodLow"]}</td>
                                    <td>${periodVals["periodLowDate"]}</td>
                                    <td><span class="fa fa-chart-line" style="color:#04a1f4;" ></span></td>
                                    <td><span class="fas fa-trash-alt fas fa-times" style="color:grey;" onclick="EquityEyeHh.us('${cat}', 'removePeriod')"></span></td>
                            </tr>`
            });

            tableHtml += `
                                </tbody>
                            </table>
            `
            tableHtml += `</div>`;
        } else { } // TODO later


        html += settingsRowHtml + tableHtml;
        // print table
        //      ...


        return html;
    }

    function createSettingsDialog(cat, settingName) {

        let html = "";

        if (cat == CAT_HIGH_LOW) {

            let title = cat; // TODO later
            let settingsHtml = getHighLowHtmlSettings(cat, settingName); // TODO later

            html += mobile ? '<table style=" border: 0px;width:500px;font-size:10px" cellpadding="3" cellspacing="0"><tr>' : '<table style="border: 0px;  style="width:100%;font-size:10px" cellpadding="3" cellspacing="0" width="100%" ><tr>';
            if (mobile) {
                html += '<td width="15" class="cc_dialog_title align_right"><a onclick="javascript:HideDialog(\'setting_dialog\');" id="btnClose"> <font color=\'white\' size="4" ><span class=\'fa fa-remove fa-times\'></span></font></a> </td>'
            }

            html += '<td class="cc_dialog_title" align="center" >' + title + "</td>" + '<td width="15" class="cc_dialog_title align_right"><a onclick="javascript:HideDialog(\'setting_dialog\');" id="btnClose"> <font color=\'white\' size="4" ><span class=\'fa fa-remove fa-times\'></span></font></a> </td></tr></table>';
            html += '<div style ="padding:10px;marging 10px;width:400px;">' + settingsHtml + "</div>";
        }

        $("#setting_dialog").empty();
        $("#setting_dialog").append(html);
        $("#setting_dialog").css({ overflow: "unset" });
        $("#setting_dialog").fadeIn(300);
        $("#setting_dialog").draggable({
            containment: "window"
        });

        /*
            stockSectionModal.style.width = "calc(100% - 250px)";
            stockSectionModal.style.minWidth = "300px";
            stockSectionModal.style.height = "calc(80% - 150px)";
            stockSectionModal.style.minHeight = "70vh";
            stockSectionModal.style.fontFamily = "unset";
            stockSectionModal.style.overflow = "unset";
        */
    }

    function getHighLowHtmlSettings(cat, settingName) {

        let html = "";

        if (settingName == "addPeriod") {
            let periods = [ // TODO later
                "Minute", "Hour", "Day", "Week", "Month"
            ];

            html += `<div>`;
            for (let i = 0; i < periods.length; i++) {
                html += `   <label for="${periods[i]}">${periods[i]}</label>`;
                let checked = periods[i] == "Day" ? "checked" : "";
                html += `   <input type="radio" name="highLowPeriodMenu" id="${periods[i]}" value="${periods[i]}" ${checked}>`;
            }
            html += `</div>`;

            html += `<div>`;
            html += `   <input type="text" id="highLowPeriod">`;
            html += `</div>`;

            html += `<div>`;
            html += `   <button onclick="EquityEyeHh.us('${cat}', '${settingName}');">`;
            html += `       Add`;
            html += `   </button>`;
            html += `</div>`;
        }

        return html;
    }

    function updateSettings(cat, settingName) {
        if (cat == CAT_HIGH_LOW) {
            let selPeriod = htmlU.getRadioVal("highLowPeriodMenu");
            let periodVal = htmlU.getInputVal("highLowPeriod");
            if (settingName == "addPeriod") {

                if (periodVal < 0) { // TODO later
                    alert("Invalid value entered");
                    return;
                }

                // TODO Make better
                let equityEye = mtgv.portlet.EquityEye;

                initializeCustSettings(cat);
                if (jsu.isNull(equityEye.custom[cat].period)) {
                    equityEye.custom[cat].period = [];
                }

                if (jsu.isNull(equityEye.custom[cat].period[periodVal + "_" + selPeriod])) {
                    equityEye.custom[cat].period[periodVal + "_" + selPeriod] = {};
                }
            } else if (settingName = "removePeriod") {
                let arr = [];

                let periodArr = mtgv.portlet.EquityEye.custom[cat].period;
                let eleIdx = periodArr.findIndex((period) => period == periodVal + "_" + selPeriod);
                periodArr.splice(eleIdx, 1);
            }
        }

        EquityEye.lpd(false); // TODO later
        HideDialog('setting_dialog');
    }

    function saveSettings(cat) {
        if (cat == CAT_HIGH_LOW) {
            var params = JSON.stringify(mtgv.portlet.EquityEye.custom[cat]);

            var pd = { custom: params, action: 'saveHl' };


            var remoteObject = new RC(EQUITY_EYE_PORTLETS_URL, null, pd, 'pfLoading', 'FEEDBACK', 'EquityEye', 'uar', 'saveHl');
            mintJsUtil.rc(remoteObject);
        }
    }

    function initializeCustSettings(cat) {
        let equityEye = mtgv.portlet.EquityEye;

        if (jsu.isNull(equityEye.custom)) {
            equityEye.custom = {};
            // equityEye.custom.HighLow.period: null };
        }
        if (jsu.isNull(equityEye.custom[cat])) {
            equityEye.custom[cat] = {};
        }

    }

    /*    
        function q(a) {
            if (a)
                return a = "<div>" + p.createEmptyDiv("tsaGrowthDiv") + "</div>  ",
                    a += " <br/> <div>" + p.createEmptyDiv("tsaValueDiv") + "</div>  ",
                    a += "<br/><div>" + p.createEmptyDiv("tsaPftDiv") + "</div>  ",
                    a += "<br/><div>" + p.createEmptyDiv("tsaStabDiv") + "</div>  ";
            mintStkCommon.lts(mtgv.eq.eqInfo.code, "D")
        }

        function paintFinStrengthPortlet(data) {
            mintHtmlUtil.dlg({
                divId: "tsaRnkDiv",
                rank: Number(e[c]),
                title: "Technical Strength " + k.label,
                leftLabel: "Sell",
                rightLabel: "Buy",
                width: 200,
                height: 8
            });
            x.isNotNull(e.label) && F.addMsgToDiv("tsaRnkDivLabel", !0, F.doBold(F.getSpan(e.label, "#832A0D", 12)));
            x.isNotNull(e.growth) && mintHtmlUtil.dlg({
                divId: "tsaGrowthDiv",
                rank: Number(e.growth),
                title: "TSR Growth Index ",
                leftLabel: "Low",
                rightLabel: "High",
                width: 200,
                height: 8
            });
            x.isNotNull(e.value) && mintHtmlUtil.dlg({
                divId: "tsaValueDiv",
                rank: Number(e.value),
                title: "TSR Value Index ",
                leftLabel: "Low",
                rightLabel: "High",
                width: 200,
                height: 8
            });
            x.isNotNull(e.value) && mintHtmlUtil.dlg({
                divId: "tsaPftDiv",
                rank: Number(e.profit),
                title: "TSR Profit Index ",
                leftLabel: "Low",
                rightLabel: "High",
                width: 200,
                height: 8
            });
            x.isNotNull(e.stability) && mintHtmlUtil.dlg({
                divId: "tsaStabDiv",
                rank: Number(e.stability),
                title: "TSR Stability Index ",
                leftLabel: "Low",
                rightLabel: "High",
                width: 200,
                height: 8
            })
        }
    */
    return {
        ppc: printPortletContent,
        csd: createSettingsDialog,
        us: updateSettings,
        ss: saveSettings,
        ics: initializeCustSettings
    }
})();