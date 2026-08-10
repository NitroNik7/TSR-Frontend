var $jscomp = $jscomp || {}; $jscomp.scope = {}; $jscomp.findInternal = function (k, r, p) { k instanceof String && (k = String(k)); for (var m = k.length, l = 0; l < m; l++) { var f = k[l]; if (r.call(p, f, l, k)) return { i: l, v: f } } return { i: -1, v: void 0 } }; $jscomp.ASSUME_ES5 = !1; $jscomp.ASSUME_NO_NATIVE_MAP = !1; $jscomp.ASSUME_NO_NATIVE_SET = !1; $jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (k, r, p) { k != Array.prototype && k != Object.prototype && (k[r] = p.value) }; $jscomp.getGlobal = function (k) { return "undefined" != typeof window && window === k ? k : "undefined" != typeof global && null != global ? global : k }; $jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (k, r, p, m) { if (r) { p = $jscomp.global; k = k.split("."); for (m = 0; m < k.length - 1; m++) { var l = k[m]; l in p || (p[l] = {}); p = p[l] } k = k[k.length - 1]; m = p[k]; r = r(m); r != m && null != r && $jscomp.defineProperty(p, k, { configurable: !0, writable: !0, value: r }) } }; $jscomp.polyfill("Array.prototype.find", function (k) { return k ? k : function (k, p) { return $jscomp.findInternal(this, k, p).v } }, "es6", "es3");
var BIRDS_EYE_VIEW = "/my/MyTsrData/BirdsEyeView.tsr", BUZZ_STK_PORTLETS_URL = "/my/MyTsrData/BuzzingStocks.tsr", INVEYE_PORTLETS_URL = "/my/MyTsrData/InvestorEyeView.tsr", TECHI_EYE_PORTLETS_URL = "/my/MyTsrData/TechEyeView.tsr", PATTERN_EYE_PORTLETS_URL = "/my/MyTsrData/PatternEyeView.tsr", STRATEGY_EYE_PORTLETS_URL = "/my/MyTsrData/StrategyEyeView.tsr",

/*
portCfg = function () {
    function k() {
        var b = portu.getPortletCfg(), a = b.type, d = b.config, c = "", e = ""; b.topTabs = []; var g = [], h = 0, f = []; b.divNo = d.TABS.length; var m = 0; var k = localStorage.getItem(a +
            "TabName"); if (q.isNotNull(k)) for (var l = 0; l < d.TABS.length; l++)if (d.TABS[l].TabName === k) { m = l; break } for (l = 0; l < d.TABS.length; l++) {
                var p = "#tab" + l; h++; k = d.TABS[l].TabName; var w = { TabName: k, tabPref: [] }; f.push(w); g.push(k); var t = "topTab" + l, u = t + "Btn", v = '<div id="' + t + '">'; l == m ? (e += '&nbsp;&nbsp;<button class="btn btn-outline-secondary btn_margin btn-sm mt-1"  id="' + u + '" onClick="javascript:portCfg.showThisTab(\'' + t + "','" + u + "'  ,'" + a + "');\">" + k + " </button>", mtgv.portlet.selTab = t) : e += ' &nbsp;&nbsp;<button class="btn btn-primary btn_margin btn-sm mt-1"  id="' +
                    u + '" onClick="javascript:portCfg.showThisTab(\'' + t + "','" + u + "','" + a + "');\">" + k + " </button>"; v += "<div class='row no-gutter' >"; b.topTabs.push(t); $("select" + p).find("option").each(function () { var a = $(this).val(); w.tabPref.push(a) }); v += "</div>"; v += "</div>"; c += v
            } c = '<div align ="left">' + e + "</div>" + (SMALL_BR + c + SMALL_BR); n.addMsgToDiv(a + "TabDiv", !0, c); portu.init(d); n.addMsgToDiv(a + "TabDiv", !0, c); window[mtgv.portlet.obj].lp(); r(b); return !0
    } function r(b) {
        for (var a = 0; a < b.topTabs.length; a++)0 == a ? $("#" + b.topTabs[a]).show() :
            $("#" + b.topTabs[a]).hide()
    } function p(b, a, d) {
        var c = portu.getPortletCfg(), e = c.config, g = c.availPortlet; c = c.defConfig.CODE_CAT; var h = null, f = "Tab number - " + b; d || 0 == e.TAB_NO || (h = e.TABS[b], f = h.TabName); html = "<div id='selectDiv" + b + "'>"; d = "#tab" + b; 0 < b && (html += "<br/>"); e = 950 < n.getSelectConfigTableWidth() ? 930 : n.getSelectConfigTableWidth(); html += '<table width ="' + e + '" align="center"><tr><td width="' + n.getSelectConfigWidth() + '">'; if (0 == b) {
            html += "<select id='AllList' size='8' multiple='true' style='width:100%;' class='form-control'>";
            for (a = 0; a < c.length; a++) { var q = c[a]; html += '<optgroup label="' + q + '">'; $.each(g, function (a, b) { b.CODE_CAT == q && (html += '<option value="' + b.CODE + '" >' + b.Label + "</option>") }); html += "</optgroup>" } html += "</select>"; html += "</td>"
        } else html += ' Tab Name : <input class="form-control" type="text" required name = "tabName' + b + '"  id = "tabName' + b + '" value="' + f + '" pattern="/^[-_a-zA-Z0-9s]*$/" >', html += "<a onclick='javascript:portCfg.removeTabConfig(  \"" + d + '","#AllList", "' + b + '", "' + a + "\")' title='Delete Tab'><font color='grey'> <span class='fa fa-remove fa-times'></span>Delete Tab</font></a>";
        html += '<td width="' + n.getSelectConfigControlWidth() + '"  align="center">'; html += '<a href=\'javascript:mintHtmlUtil.moveOptionToTab("#AllList", "' + d + "\")' title='Add Selected'> <font color='green'><span class='fa fa-chevron-right'></span></font></a> <br/><br/>"; html += '<a href=\'javascript:mintHtmlUtil.moveAllOptionToTab("#AllList",  "' + d + "\")' title='Add All'><font color='green'> <span class='fa fa-chevron-right'></span><span class='fa fa-chevron-right'></span></font></a> <br/><br/>"; html += "<a href='javascript:mintHtmlUtil.moveOptionToTab( \"" +
            d + "\", \"#AllList\")' title='Remove Selected'><font color='red'><span class='fa fa-chevron-left'></span></font></a> <br/><br/>"; html += "<a href='javascript:mintHtmlUtil.moveAllOptionToTab( \"" + d + "\", \"#AllList\")' title='Remove All'><font color='red'><span class='fa fa-chevron-left'></span><span class='fa fa-chevron-left'></span></font></a> "; html += "</td>"; html += '<td width="' + n.getSelectConfigWidth() + '">'; html += "<select id=tab" + b + " size='8' multiple='true' style='width:100%' class='form-control'>";
        if (!isNull(h)) for (a = 0; a < h.PREFS.length; a++)html += '<option value="' + h.PREFS[a].CODE + '" >' + h.PREFS[a].Label + "</option>"; html += "</select>"; html += "</td>"; html += '<td width="' + n.getSelectConfigControlWidth() + '"  cellpadding="10" align="center">'; html += "<a href='javascript:mintHtmlUtil.moveOptionToTop( \"" + d + "\", \"top\");' title='Move To Top'> <font color='green'><span class='fa fa-arrow-up'></span></font></a> <br/><br/>"; html += "<a href='javascript:mintHtmlUtil.moveOptionUpDown( \"" + d + "\", \"up\");' title='Move Up'><font color='green'> <span class='fa fa-chevron-up'></font></a> <br/><br/>";
        html += "<a href='javascript:mintHtmlUtil.moveOptionUpDown( \"" + d + "\", \"down\");' title='Move Down'><font color='red'><span class='fa fa-chevron-down'></span></font></a> <br/><br/>"; html += "<a href='javascript:mintHtmlUtil.moveOptionToTop( \"" + d + "\", \"bottom\");' title='Move To Bottom'><font color='red'><span class='fa fa-arrow-down'></font></a> "; html += "</td>"; html += "</tr></table>"; return html += "</div>"
    } function m(b, a, d) {
        window[mtgv.portlet.obj].savePref(); l(a, b); b = portu.getPortletCfg(); q.isNotNull(b.defConfig) &&
            (b.availPortlet = portu.gap("balance", b.config, b.defConfig))
    } function l(b, a) { n.addMsgToDiv(b + "ContentsFeedBack", !0, '<div style="' + DIV_STYLE_GREEN_BORDER + '" align="center"  ><span style="color:#69b390;font-size:24px;"> ' + a + " </span><a onClick=\"JavaScript=mintHtmlUtil. clearDiv('" + b + 'ContentsFeedBack\');" <span class="fa fa-remove fa-times"  style="color:black"></span> </a> </div>'); $("#" + b + "ConfigSettings").empty() } function f(b) {
        var a = portu.getPortletCfg(); $("#" + b + "ConfigFeedBack").empty(); for (var d =
            0; d <= a.divNo; d++) { var c = "#tab" + d; if (0 != $("#tab" + d).length) { var e = !1; $(c).find("option").each(function () { e = !0 }); if (0 == e) return $("#" + b + "ConfigFeedBack").append('<font color="red"> Atleast one of the tab has no value <font>'), !1; c = $("#tabName" + d).val(); isNull(c) && 0 != d && $("#" + b + "ConfigFeedBack").append('<font color="red"> Missing Tab Name <font>') } } return !0
    } var n = mintHtmlUtil, q = mintJsUtil; return {
        showConfig: function () {
            var b = mtgv.portlet.code;
            if (q.isNull(mtgv.portlet[b].defConfig))
                window[mtgv.portlet.obj].loadDefConfig("showConfig");
            else {
                var a = portu.getPortletCfg(),
                    // function m() {
                    //     if ("home" == mtgv.portlet.current) return mtgv.portlet.Home; 
                    //     if ("equity" == mtgv.portlet.current) return mtgv.portlet.Equity; 
                    //     if ("BuzStk" == mtgv.portlet.current) return mtgv.portlet.BuzStk; 
                    //     if ("invEye" == mtgv.portlet.current) return mtgv.portlet.invEye; 
                    //     if ("TechiEye" == mtgv.portlet.current) return mtgv.portlet.TechiEye; 
                    //     if ("PatternEye" == mtgv.portlet.current) return mtgv.portlet.PatternEye;
                    //     if ("StrategyEye" == mtgv.portlet.current) return mtgv.portlet.StrategyEye
                    //     if ("EquityEye" == mtgv.portlet.current) return mtgv.portlet.EquityEye
                    // }
                    d = a.config,
                    c = b + "ConfigSettings";
                n.emptyDiv(b + "ConfigFeedBack");
                var e = "padding:20px; margin:10px;";
                isMobile() && (e = "");
                e = "<div  style='border-width:1px; border-color: #737373; border-style:solid; " + e + "border-radius:10px; background-color:#f9f9f9;'  ><div style='float:right'></div>" + ("<div style='float:right' class='miCtrl'> " + n.getButtonP("Apply Default Template ", "portCfg.applyDef", b, "Apply Default Template") + "<a onClick='javascript:portCfg.closeConfig(\"" + b + "\");' style='padding-left:20px; '> <font color='grey'><span class='fa fa-remove fa-times'></span></font> </a> </div>");
                e += " <h3 > Configure  View </h3>"; e += '<div id="selectDiv" class="table-responsive">';

                a.divNo = 0;

                if (0 == d.TAB_NO)
                    e += p(a.divNo, b, !1);
                else
                    for (var g = 0; g < d.TAB_NO; g++)
                        e += p(g, b, !1), a.divNo += 1;
                e += "</div>";
                e += "<div id='" + b + "ConfigFeedBack'></div>";
                e += "<div align='center'> <br/><Button class='btn btn-success btn_margin'   onClick='portCfg.saveConfig(\"" + b + "\" );'> <span class='fa fa-save'></span> Save Setting </button> &nbsp;&nbsp;<Button onClick='portCfg.addATab(\"" + b + "\");' class='btn btn-info btn_margin'> <span class='fa fa-plus'></span> Add a Tab </button>&nbsp;&nbsp;<Button onClick='portCfg.closeConfig(\"" + b + "\");' class='btn btn-outline-secondary btn_margin'> <span class='fa fa-remove fa-times'></span>Cancel </button> &nbsp;&nbsp;</div>";
                e += "</br>";
                e += "<div >" + n.getSpan("Supported :Max 20 portlet/tab and max 15 Tabs", "grey", 10) + "</div>";
                e += "</div>";
                n.addMsgToDiv(c, !0, e);
                n.divShow(b + "Config");
            }
        }, printPage: k, saveSet: function () { m("Setting Saved", mtgv.portlet.code, "saveCur") }, saveConfig: function (b) {
            if (!f(b)) return !1; for (var a = portu.getPortletCfg(), d = [], c = 0, e = 0; e <= a.divNo; e++) {
                var g = "#tab" + e; if (0 != $("#tab" +
                    e).length) { c++; tabName = 0 == e ? "Landing Page" : $("#tabName" + e).val(); var h = { TabName: tabName, tabPref: [] }; d.push(h); a.topTabs.push("topTab" + e); $("select" + g).find("option").each(function () { var a = $(this).val(); h.tabPref.push(a) }) }
            } mtgv.portlet.curTab = 0; c = []; for (e = 0; e < d.length; e++) { h = d[e]; g = { TabName: h.TabName }; for (var q = [], l = 0; l < h.tabPref.length; l++) { var n = portu.getDef(a, h.tabPref[l]); q.push(n); if (20 == l) break } g.PREFS = q; c.push(g) } a.config.TABS = c; a.config.TAB_NO = d.length; k(); m(" Settings saved", b, "saveConfig")
        },
        addATab: function (b) { var a = portu.getPortletCfg(); a.divNo += 1; b = p(a.divNo, b, !0); $("#selectDiv").append(b) }, closeConfig: function (b) { portu.getPortletCfg().divNo = 0; emptyDiv(b + "ConfigSettings") }, removeTabConfig: function (b, a, d, c) { n.moveAllOptionToTab(b, a); $("#selectDiv" + d).empty(); $("#" + c + "ConfigFeedBack").empty() }, showThisTab: function (b, a, d) {
            portu.init(); a = portu.getPortletCfg(); for (var c = 0, e = 0; e < a.topTabs.length; e++)a.topTabs[e] == b ? ($("#" + a.topTabs[e]).show(), $("#" + a.topTabs[e] + "Btn").removeClass("btn-primary").addClass("btn-outline-secondary"),
                c = e) : ($("#" + a.topTabs[e]).hide(), $("#" + a.topTabs[e] + "Btn").removeClass("btn-outline-secondary").addClass("btn-primary")); mtgv.portlet.selTab = b; portu.init(); window[mtgv.portlet.obj].lp(); a.config.TABS.length >= c && localStorage.setItem(d + "TabName", a.config.TABS[c].TabName)
        }, removePortlet: function (b, a) {
            portu.getPortletCfg(); for (var d = portu.getCurTab().PREFS, c = "", e = d.length - 1; 0 <= e; e--) { var g = d[e]; if (g.CODE == b) { c = g.Label; d.splice(e, 1); break } } n.divHide(b + "Portlet"); m("Portlet " + c + " is removed Permananetly",
                a, "remove")
        }, applyDef: function (b) { n.divHide(b + "ConfigSettings"); window[mtgv.portlet.obj].applyDef() }, addMsg: l
    }
}(); 

var portu = function () {
    function k(a, b, c, e, g) { a = "<li>" + ('\t<div id ="' + e + '">') + ('\t\t<a href="javascript:portu.' + a + "  ('" + b + '\');" class="text-secondary" title="' + g + '"  >') + ('\t\t\t<i class="' + c + ' ms-1 "></i>'); a += "\t\t</a>"; a += "\t</div>"; return a += "</li>" } function r(a, d) {
        var c = m(), e = l(c, a), g = Number(e.size); if (d) { if (12 == g) return; g += 1 } else { if (1 == g) return; --g } e.size = g; d = a + "Portlet"; $("#" + d).removeClass(); g = b.getObjFrmArr(BS_COLS, g); $("#" + d).addClass(g.COL); c = c.type; q.addMsgToDiv(c + "ContentsFeedBack", !0,
            '<div style="' + DIV_STYLE_ORANGE_BORDER + '" align="center"  ><span style="color:#ff9125;font-size:24px;">  You have Unsaved Settings. Do you wish to <button onClick="JavaScript= portCfg.saveSet(\'' + c + 'ContentsFeedBack\');" class="btn btn_margin btn-outline-warning" style="color:#ff9125;font-size:24px;"> Save <span class="fas fa-save"  "></span> </button>  </span></div>'); p(a)
    } function p(a, d, c) {
        b.isNull(d) && (cfg = m(), d = l(cfg, a)); var e = 4; b.isNotNull(d) && b.isNotNull(d.size) && (e = Number(d.size)); c && ($("#" +
            a + "Max").hide(), $("#" + a + "Restore").hide()); $("#" + a + "Small").show(); $("#" + a + "Large").show(); 1 == e ? $("#" + a + "Small").hide() : 12 == e && $("#" + a + "Large").hide()
    }

    // Modified
    function m() {
        if ("home" == mtgv.portlet.current) return mtgv.portlet.Home;
        if ("equity" == mtgv.portlet.current) return mtgv.portlet.Equity;
        if ("BuzStk" == mtgv.portlet.current) return mtgv.portlet.BuzStk;
        if ("invEye" == mtgv.portlet.current) return mtgv.portlet.invEye;
        if ("TechiEye" == mtgv.portlet.current) return mtgv.portlet.TechiEye;
        if ("PatternEye" == mtgv.portlet.current) return mtgv.portlet.PatternEye;
        if ("StrategyEye" == mtgv.portlet.current) return mtgv.portlet.StrategyEye;
        if ("EquityEye" == mtgv.portlet.current) return mtgv.portlet.EquityEye;
    }


    function l(a, d) { for (var c, e = a.config, g = 0; g < e.TABS.length; g++) { c = e.TABS[g].PREFS; a: { for (var h = 0; h < c.length; h++) { var f = c[h]; if (f.CODE === d) { c = f; break a } } c = null } if (b.isNotNull(c)) return c } return b.getObjFrmArr(a.availPortlet, d) } function f() { var a = m(), d = 0; if (b.isNotNull(a.topTabs)) for (var c = 0; c < a.topTabs.length; c++)a.topTabs[c] == mtgv.portlet.selTab && (d = c); return a.config.TABS[d] } 
    
    function n(a, d) {
        var c = m().config, e = c.classi, g = c.stkBsktCat;
        if ("loadSb" == d) { 
            var h = msbu.ua("getStockBasketAndCat", g, e); 
            if (!h.loaded) { 
                setTimeout(n, 40, a, d); 
                return 
            } 
        } 
        
        if (b.isNull(e)) 
            e = "fo"; 
        else if (b.arrayContainsId(CLASSI, e)) 
            e = b.getObjFrmArr(CLASSI, e).id; 
        else { 
            h = msbu.ua("getStockBasketAndCat", g, e); 
            if (!h.loaded) { 
                setTimeout(n, 40, a, d); 
                return
             } 
             e = h.stkBasket.id; g = b.arrayContainsId(CLASSI, e) ? null : h.stkBsktCat 
            } 
            c.classi = e; c.stkBsktCat = g; 
            d = TSR_HR + msbu.ua("getsb", { fieldName: "classiGrp", obj: "portu", fnc: "sbc", selected: e, stkBsktCat: g }) + TSR_HR; 
            q.addMsgToDiv("sbDiv", !0, d); 
            "init" == a ? window[mtgv.portlet.obj].lpd(!1, !0) : "sbc" == a && window[mtgv.portlet.obj].lpd(!1, !0)
    } var q = mintHtmlUtil, b = mintJsUtil;
    return {
        init: function () {
            var a = mtgv.portlet.code;
            $("#" + a + "Contents").empty();
            $("#" + a + "Contents").append("<div id='" + a + "ContentsFeedBack'></div> <div id='" + a + "Title'></div> "); $("#" + a + "Config").hide(); $("#" + a + "Contents").append("<div class='row gy-2' id='TabData'></div>")
        },
        getPortletCfg: m, createS: function (a, b, c) { q.addMsgToDiv(b + "Body", !0, a) }, createSF: function (a, b, c) {
            a = q.getSpan(ERROR_MSG,
                "red", 10); q.addMsgToDiv(b + "Body", !0, a)
        }, create: function (a, d, c, e, g) {
            b.isNull(g) && (g = l(m(), d)); d = d.toString(); c = d + "Portlet"; var h = ""; g = b.getObjFrmArr(BS_COLS, g.size); h += '<div class="' + g.COL + '"   id="' + c + '">'; h = h + ('<div id="' + d + 'Config"  align="left"><div id="' + d + 'ConfigFeedBack"></div></div>') + '\t<div class="card shadow-lg" > \t<div class="card-header"> '; h += '\t<h5 class="card-title">' + a + "</h5> "; h += '\t<div class="card-toolbar"> '; h += "\t<ul>"; h += k("min", d, "fas fa-chevron-up", d + "Min", "Minimize"); h +=
                k("max", d, "fas fa-chevron-down", d + "Max", "Maximize"); h += k("small", d, "fas fa-search-minus", d + "Small", "Smaller Size"); h += k("large", d, "fas fa-search-plus", d + "Large", "Larger Size"); h += k("del", d, "fas fa-times", d + "Del", "Remove"); h += "\t</ul>"; h += "  </div>"; h += "  </div>"; h += ' <div class="card-body">'; h += ' <div class="table-responsive">'; h = h + (' <div id="' + d + 'Body">') + "  </div>" + ('<div id="' + d + 'Restore">') + ("<a onclick=\"javascript:portu.restore('" + d + '\')" ><b><font color="green">Undo</font></b></a> &nbsp;&nbsp;<a onclick="javascript:portCfg.removePortlet(\'' +
                    d + "', '" + e + '\' )" ><b><font color="red">  Remove Permanently<font></b></a> &nbsp;&nbsp; <a onclick="javascript:portCfg.showConfig(false, \'' + e + '\');" > <font  color="grey"> Customize this view<span class="fa fa-cog"></span> </font> </a>') + "  </div>"; h += "  </div>"; h += "  </div>"; h += "  </div>"; return h += "  </div>"
        }, getDef: l, curTb: function (a) { for (var b = f().PREFS, c = 0; c < b.length; c++)if (b[c].CODE === a) return !0; return !1 }, getCurTab: f, min: function (a) { $("#" + a + "Body").hide(); $("#" + a + "Min").hide(); $("#" + a + "Max").show() },
        max: function (a) { $("#" + a + "Body").show(); $("#" + a + "Min").show(); $("#" + a + "Max").hide() }, small: function (a) { r(a, !1) }, large: function (a) { r(a, !0) }, del: function (a) { $("#" + a + "Body").hide(); $("#" + a + "Restore").show() }, restore: function (a) { $("#" + a + "Body").show(); $("#" + a + "Restore").hide() }, getTabPortlets: function () { return f().PREFS }, 
        gap: function (a, d, c) {
            var e = []; 
            if ("balance" == a) {
                for (var g = 0; g < c.AVAILABLE_PORTLETS.length; g++) { 
                    var h = c.AVAILABLE_PORTLETS[g]; 
                    e.push(h) 
                } 
                for (g = 0; g < d.TABS.length; g++)
                    for (a = d.TABS[g].PREFS, c = 0; c < a.length; c++)
                        h = a[c], 
                        b.removeFromArrayWithId(e, h.CODE, "CODE")
            } else if ("NoCustYet" == a) 
                for (g = [], a = [], g.push({ TabName: "Landing Page", PREFS: a }), d.TABS = g, d.TAB_NO = 1, g = 0; g < c.AVAILABLE_PORTLETS.length; g++)
                    h = c.AVAILABLE_PORTLETS[g], b.isValTrue(h.hidden) || 8 < g ? e.push(h) : a.push(h); 
                return e
        }, tlBar: p, setClassi: n, sbc: function () {
            var a = $("input[name=classiGrp]:checked").val(), d = m().config; if (d.classi != a) {
                d.classi = a; if (b.arrayContainsId(CLASSI, a)) { var c = b.getObjFrmArr(CLASSI, a); d.classi = c.id; d.stkBsktCat = null } else c =
                    b.isNull(mtgv.mtpp.sblcfg) ? null : mtgv.mtpp.sblcfg.stkBsktCat, a = msbu.ua("getStockBasketAndCat", c, a), d.classi = a.stkBasket.id, d.stkBsktCat = c; n("sbc")
            }
        }
    }
}();


var portp = function () {
    function k(q, b, a, d) {
        b = ""; d.showTicks && (b += l(d, a)); b += '<div class="table-responsive"><table class="table table-striped  table-hover"><thead><tr><th>Name</th>  <th>Close</th>  <th>Change</th> <th>Change (%)</th></tr></thead><tbody>'; if (q.statusCode == MSG_STATUS_NO_RECORD) b += '<tr><td colspan ="4">' + q.statusMsg + "</td></tr>"; else if (q = q.list, 0 == q.length) b += '<tr><td colspan ="4">No Records </td></tr>'; else for (var c = 0; c < q.length; c++) {
            b += "<tr>"; var e = q[c], g = m(e.Code, a.tick, e.Name); b +=
                f.createTd(g); b += f.createTd(e.close); b += f.createTd(n.formatColor(e.close - e.prevClose)); b += f.createTd(f.doBold(n.formatPC(e.close, e.prevClose))); b += "</tr>"
        } b = b + "</tbody></table></div>" + r(a, d); f.addMsgToDiv(a.CODE + "Body", !0, b)
    } function r(f, b) {
        if (n.isMyContext()) {
            var a = n.isNull(f.alias) ? f.reportName : f.alias; b = { freq: f.tick, classi: b.pd.classi, stkBsktCat: b.pd.stkBsktCat, item: a, showIdx: !1, scrType: "CommonScreener", cat: "PriceVolume", subCat: "GainerLosers" }; if ("bullishGapUp" == a || "bearishGapDown" == a) b.cat = "OHLCScreeners",
                b.subCat = "bullishGapUp" == a ? "Bullish" : "Bearish"; else if ("trendingUp3Days" == a || "trendingUpHigh3Days" == a || "openEqLow" == a) b.cat = "OHLCScreeners", b.subCat = "Bullish"; else if ("trendingDown3Days" == a || "trendingDownLow3Days" == a || "openEqHigh" == a) b.cat = "OHLCScreeners", b.subCat = "Bearish"; else if ("trendingUpVol3Days" == a || "trendingDownVol3Days" == a) b.cat = "OHLCScreeners", b.subCat = "VolumeTrend"; else if ("volJump" == a || "volHighIntra" == a) b.subCat = "VolumeBased"; a = n.getMyTsrUrl() + "/MyTsr/#/PreScreened/PreScreenedReport/" +
                    JSON.stringify(b); "CustomScreener" == f.CODE_CAT && (a = n.getMyTsrUrl() + "/MyTsr/#/" + f.url)
        } else a = "CustomScreener" == f.CODE_CAT ? n.getRootUrl() + "/CustomStockScreener.tsr?custScrId=" + f.id : p(f, b); return "<div align= 'right'   ><br/> <a href='" + a + "' class='btn btn-primary btn-sm' >more..</a></div>"
    } function p(f, b) {
        var a = n.getRootUrl() + "/Screener" + f.pid; f = f.tick; n.isNull(f) && (f = FREQ_DAILY); f = n.getObjFrmArr(FREQ_SCR_MAP, f); n.isNotNull(f) && (a = a + "/" + f.sf); n.isNotNull(b.pd.classi) && (a += "?sbOverride=true&klassi=" +
            b.pd.classi, n.isNotNull(b.pd.stkBsktCat) && (a += "&stkBsktCat=" + b.pd.stkBsktCat)); return a
    } function m(k, b, a) { return f.getFncLink(k, "portp.ua", "eqDet" + PARAM_DELIM + k + PARAM_DELIM + b, "Click to View key Highlights of " + a, "color:" + LINK_COLOR) } function l(k, b) { k = '<div class="miCtrl">' + BREAK_LINE; var a = b.CODE; k += f.getDropDown(mtgv.mtpp.FREQ_SCR_MAP, a + "DD", null, "myth.fc", a + PARAM_DELIM + b.freq, b.freq); return k + "</div>" } var f = mintHtmlUtil, n = mintJsUtil; return {
        pp: function (q, b, a) {
            var d = a.portlet, c = n.isNull(d.alias) ?
                d.reportName : d.alias; if ("priceGainer" == c || "priceLoser" == c || "bullishGapUp" == c || "bearishGapDown" == c) k(q, b, d, a); else if ("priceGainWithHighVol" == c || "priceFallWithHighVol" == c || "volJump" == c || "volHighIntra" == c) {
                    c = ""; a.showTicks && (c += l(a, d)); c += '<div class="table-responsive"><table class="table table-striped  table-hover"><thead><tr><th>Name</th>  <th>Close</th>  <th>Price Change(%)</th> <th>Vol Change (%)</th></tr></thead><tbody>'; var e = q.list; if (0 == e.length) c += '<tr><td colspan ="4">No Records </td></tr>';
                    else for (var g = 0; g < e.length; g++) { c += "<tr>"; var h = e[g], p = m(h.Code, d.tick, h.Name); c += f.createTd(p); c += f.createTd(h.close); c += f.createTd(f.doBold(n.formatPC(h.close, h.prevClose))); c += f.createTd(f.doBold(n.formatPC(h.vol, h.prevVol))); c += "</tr>" } c = c + "</tbody></table>" + r(d, a); f.addMsgToDiv(d.CODE + "Body", !0, c + "</div>")
                } else if (n.containsString("trendingUp3Days trendingDown3Days trendingUpHigh3Days trendingDownLow3Days trendingUpVol3Days trendingDownVol3Days".split(" "), c)) {
                    c = ""; a.showTicks && (c += l(a, d));
                    c += '<div class="table-responsive"><table class="table table-striped  table-hover"><thead><tr><th>Name</th>  <th>Close</th>   <th>Trending Period</th></tr></thead><tbody>'; e = q.list; if (0 == e.length) c += '<tr><td colspan ="4">No Records </td></tr>'; else for (g = 0; g < e.length; g++)c += "<tr>", h = e[g], p = m(h.Code, d.tick, h.Name), c += f.createTd(p), c += f.createTd(h.close), c += f.createTd(h.trendingPeriod), c += "</tr>"; c = c + "</tbody></table>" + r(d, a); f.addMsgToDiv(d.CODE + "Body", !0, c + "</div>")
                } else if ("openEqHigh" == c || "openEqLow" ==
                    c) {
                    c = ""; a.showTicks && (c += l(a, d)); c += '<div class="table-responsive"><table class="table table-striped  table-hover"><thead><tr><th>Name</th>  <th>Close</th>   <th>Open</th> <th>High</th> <th>Low</th> </tr></thead><tbody>'; e = q.list; if (0 == e.length) c += '<tr><td colspan ="4">No Records </td></tr>'; else for (g = 0; g < e.length; g++)c += "<tr>", h = e[g], p = m(h.Code, d.tick, h.Name), c += f.createTd(p), c += f.createTd(h.close), c += f.createTd(h.open), c += f.createTd(h.high), c += f.createTd(h.low), c += "</tr>"; c = c + "</tbody></table>" +
                        r(d, a); f.addMsgToDiv(d.CODE + "Body", !0, c + "</div>")
                } "CustomScreener" == d.CODE_CAT && k(q, b, d, a)
        }, pgp: function (k, b, a) {

            b = a.portlet; 
            var d = ""; 
            a.showTicks && (d += l(a, b));
             var c = null, e = null, g = b.addiInfo; 
             "Pattern" == b.eyeType ? (g = g.split(":"), c = "Change", e = "Change (%)") : null != g && (g = g.split(":"), null != b.colLabel1 ? (c = b.colLabel1, null != b.colLabel2 && (e = b.colLabel2)) : c = g[3]); d = d + '<div class="table-responsive"><table class="table table-striped  table-hover">' + ("<thead><tr><th>Name</th>   <th>Price</th> <th>" + c + "</th>");
            null != e && (d += "<th>" + e + "</th>"); d += "</tr></thead><tbody>"; k = k.list; if (n.isNull(k) || 0 == k.length) d += '<tr><td colspan ="4">No Records </td></tr>'; else for (c = 0; c < k.length; c++) { d += "<tr>"; var h = k[c], q = m(h.Code, b.tick, h.Name); d += f.createTd(q); d += f.createTd(h.close); "Pattern" == b.eyeType ? (d += f.createTd(n.formatColor(h.close - h.prevClose)), d += f.createTd(f.doBold(n.formatPC(h.close, h.prevClose)))) : (d += f.createTd(f.doBold(h.Value)), null != e && (d += f.createTd(f.doBold(h.Value2)))); d += "</tr>" } d += "</tbody></table></div>";
            n.isMyContext() ? (e = "", null != g && (e = { freq: b.tick, classi: a.pd.classi, stkBsktCat: a.pd.stkBsktCat, item: b.CODE, showIdx: !1, scrType: g[0], cat: g[1], subCat: g[2] }, "Pattern" == b.eyeType && (n.containsString(["Triangle", "TrendLines", "Channel", "ChartPatterns"], e.cat) ? e.item = "all" : e.item = b.reportName), "tech" == g[0] || "TechStrength" == g[1]) && (e.item = g[3]), a = n.getMyTsrUrl() + "/MyTsr/#/PreScreened/PreScreenedReport/" + JSON.stringify(e)) : a = p(b, a); f.addMsgToDiv(b.CODE + "Body", !0, d + ("<div align= 'right'   ><br/> <a href='" + a + "' class='btn btn-primary btn-sm' >more..</a></div>"))
        },
        ua: function (f, b, a) { "eqDet" == f && (f = new RC(BIRDS_EYE_VIEW, null, { actionType: "masEqView", code: b, freq: a }, "MasEqLdDiv", "MasEqFbDiv", "portp", "uar", "eqDet"), f.code = b, n.rc(f)) }, uar: function (f, b, a) { "eqDet" == b && eqo.ped(f, b, a, "EqDetContentDiv") }
    }
}();

*/

// birds eye view ....

// var BIRDS_EYE_VIEW = '/my/MyTsrData/BirdsEyeView.tsr';

// var BUZZ_STK_PORTLETS_URL = '/my/MyTsrData/BuzzingStocks.tsr';


// // Investor Eye View ....

// // var INVEYE_VIEW_URL= '/my/MyTsrData/BirdsEyeView.tsr';

// var INVEYE_PORTLETS_URL = '/my/MyTsrData/InvestorEyeView.tsr';

// var TECHI_EYE_PORTLETS_URL = '/my/MyTsrData/TechEyeView.tsr';


// var PATTERN_EYE_PORTLETS_URL = '/my/MyTsrData/PatternEyeView.tsr';


// var STRATEGY_EYE_PORTLETS_URL = '/my/MyTsrData/StrategyEyeView.tsr';

CUST_EQ_PORTLETS_URL = '/my/MyTsrData/CustEquityView.tsr';
// CUST_EQ_PORTLETS_URL = '/my/MyTsrData/CustEquityView.tsr';



var portCfg = (function () {   // portlet Utils home

    var htmlU = mintHtmlUtil;
    var jsu = mintJsUtil;

    // Portlet



    function showConfig() {

        var type = mtgv.portlet.code;


        if (jsu.isNull(mtgv.portlet[type]['defConfig'])) {
            window[mtgv.portlet.obj]['loadDefConfig']('showConfig');   // Async Call
            return; // load from server
        }



        var pageParams = getPageParams(type);
        var data = pageParams['config'];

        var divName = type + 'ConfigSettings';

        htmlU.emptyDiv(type + 'ConfigFeedBack');


        // $(divName).empty();

        // console.log('type ' + type);

        var paddingMargin = 'padding:20px; margin:10px;';
        if (isMobile()) {
            paddingMargin = '';
        }

        var html = "<div  style='border-width:1px; border-color: #737373; border-style:solid; " + paddingMargin + "border-radius:10px; background-color:#f9f9f9;'  >";
        html += "<div style='float:right'></div>";

        html += "<div style='float:right' class='miCtrl'> " + htmlU.getButtonP('Apply Default Template ', 'portCfg.applyDef', type, 'Apply Default Template')

            + "<a onClick='javascript:portCfg.closeConfig(\"" + type + "\");' style='padding-left:20px; '> <font color='grey'><span class='fa fa-remove fa-times'></span></font> </a>"
            // +SP_3
            + " </div>";



        html += ' <h3 > Configure  View </h3>';


        html += '<div id="selectDiv" class="table-responsive">';

        // html+='<table align="center"><tr><td width="200">';
        // console.log (' data ' + data);
        // console.log (' data ' + data);


        pageParams['divNo'] = 0;

        if (data.TAB_NO == 0) {
            html += createSelectDiv(pageParams['divNo'], type, false);
        } else {
            for (var i = 0; i < data.TAB_NO; i++) {
                html += createSelectDiv(i, type, false);
                pageParams['divNo'] = pageParams['divNo'] + 1;
            }
        }

        html += '</div>';


        html += "<div id='" + type + "ConfigFeedBack'></div>";
        html += "<div align='center'> "

            // +"<div align='center'>"
            + "<br/><Button class='btn btn-success btn_margin'   onClick='portCfg.saveConfig(\"" + type + "\" );'> <span class='fa fa-save'></span> Save Setting </button> &nbsp;&nbsp;"
            + "<Button onClick='portCfg.addATab(\"" + type + "\");' class='btn btn-info btn_margin'> <span class='fa fa-plus'></span> Add a Tab </button>&nbsp;&nbsp;"
            // +"<Button onClick='portCfg.previewPage(\"preview\", \""+type + "\" );' class='btn btn-warning btn_margin'> <span class='fa fa-film'></span> Preview Page</button>&nbsp;&nbsp;"
            + "<Button onClick='portCfg.closeConfig(\"" + type + "\");' class='btn btn-outline-secondary btn_margin'> <span class='fa fa-remove fa-times'></span>Cancel </button> &nbsp;&nbsp;"
            // +"</div>"
            + "</div>";


        html += '</br>'

        html += "<div >" + htmlU.getSpan('Supported :Max 20 portlet/tab and max 15 Tabs', 'grey', 10) + "</div>";

        html += '</div>';

        htmlU.addMsgToDiv(divName, true, html);


        htmlU.divShow(type + 'Config');


        // $(divName).append(html);

        // if(isMobile()){
        //   $(divName).width(getSettingTableWidth());
        //   }else{
        //     $(divName).width(getSettingTableWidth()+50);
        //   }

        // if(!init){
        //     $(divName).show();
        //     $('#html,body').animate({
        //       scrollTop:$(divName).offset().top });
        // }

    }






    function addATab(type) {

        var pageParams = getPageParams(type);

        pageParams['divNo'] = pageParams['divNo'] + 1;

        var html = createSelectDiv(pageParams['divNo'], type, true);
        // console.log(html);
        $('#selectDiv').append(html);
    }



    function closeConfig(type) {
        getPageParams(type)['divNo'] = 0;
        emptyDiv(type + "ConfigSettings");
    }


    function printPage() {
        var pageParams = getPageParams(type);
        var type = pageParams['type'];
        var data = pageParams['config'];

        var tabHtml = '';
        var topButtonsHtml = '';
        // pageParams['reqs'] =[];
        pageParams['topTabs'] = [];
        var tabNames = [];
        var tabName;

        // var queryParams= 'ccId='+getMarket().toLowerCase() ;

        var tabCount = 0;

        var newTabs = [];

        pageParams['divNo'] = data.TABS.length;

        var selcTabId = 0;
        var tabName = localStorage.getItem(type + 'TabName')

        if (jsu.isNotNull(tabName)) {
            for (var i = 0; i < data.TABS.length; i++) {

                if (data.TABS[i].TabName === tabName) {
                    selcTabId = i;
                    break;
                }


            }

        }


        for (var i = 0; i < data.TABS.length; i++) {
            var tab = '#tab' + i;

            // console.log(' tab' +i +  $('#tab'+i).length);
            // if( $('#tab'+i).length == 0 ){
            //   continue;
            // }
            tabCount++;
            // queryParams+='&';

            // if(i==0) {
            //   tabName ='Landing Page'; 
            // }else{
            //   tabName = $('#tabName'+i).val();

            // }

            tabName = data.TABS[i].TabName;


            var tabPref = [];

            var newTab = { TabName: tabName, tabPref: [] }

            newTabs.push(newTab);

            // queryParams+='tab'+tabCount+'name='+tabName ;

            tabNames.push(tabName);
            // var tabName = $('#tabName'+i).val();

            var topTabId = 'topTab' + i;
            var topTabIdBtn = topTabId + "Btn";
            var topTabHtml = '<div id="' + topTabId + '">';

            if (i == selcTabId) {
                topButtonsHtml += '&nbsp;&nbsp;<button class="btn btn-outline-secondary btn_margin btn-sm mt-1"  id="' + topTabIdBtn + '" onClick="javascript:portCfg.showThisTab(\'' + topTabId + '\',\'' + topTabIdBtn + '\'  ,\'' + type + '\');">' + tabName + ' </button>';
                mtgv.portlet.selTab = topTabId;


            } else {
                topButtonsHtml += ' &nbsp;&nbsp;<button class="btn btn-primary btn_margin btn-sm mt-1"  id="' + topTabIdBtn + '" onClick="javascript:portCfg.showThisTab(\'' + topTabId + '\',\'' + topTabIdBtn + '\',\'' + type + '\');">' + tabName + ' </button>';
            }

            topTabHtml += "<div class='row no-gutter' >";

            pageParams['topTabs'].push(topTabId);
            var tabFields = '&tab' + tabCount + 'Fields=';


            $('select' + tab).find('option').each(function () {

                // pageParams['reqs'].push($(this).val());
                var code = $(this).val();
                newTab.tabPref.push(code);

            });


            topTabHtml += "</div>"; // BS rows

            topTabHtml += '</div>';

            // queryParams+=tabFields;

            tabHtml += topTabHtml;

        } // for 


        var html = '';
        // console.log(queryParams);

        html += '<div align ="left">' + topButtonsHtml + '</div>';

        html += SMALL_BR + tabHtml + SMALL_BR;





        htmlU.addMsgToDiv(type + 'TabDiv', true, html)


        // if(action == 'save'){
        //   // pageParams['pageScope'].savePref(queryParams); 
        //   doSave(pageParams, newTabs);


        // }

        portu.init(data); // empties portlet contents div and appends row to it


        // console.log(html);
        // $('#'+type+'Contents').append(html);
        htmlU.addMsgToDiv(type + 'TabDiv', true, html)



        // pageParams['pageScope'].loadPortlets();
        window[mtgv.portlet.obj]['lp']();

        hideShowTabs(pageParams);



        // $('#html,body').animate({
        //   scrollTop:$('#'+type+'Contents').offset().top -20});

        return true;



    }


    function hideShowTabs(pageParams) {
        for (var i = 0; i < pageParams['topTabs'].length; i++) {
            // console.log($('#'+topTabs[i]));

            if (i == 0) {
                $('#' + pageParams['topTabs'][i]).show();
            } else {
                $('#' + pageParams['topTabs'][i]).hide();
            }
        }
    }



    function createSelectDiv(number, type, newUserAction) {



        var pageParams = getPageParams(type);
        var data = pageParams['config'];

        var availPortlet = pageParams.availPortlet;


        // OLD METHOS for All Cats
        var catCodes = pageParams.defConfig.CODE_CAT;
        // var catCodes = window[mtgv.portlet.obj][ 'gac']();




        var userTab = null;
        var userTabName = 'Tab number - ' + number;
        if (!newUserAction && data.TAB_NO != 0) {
            var userTab = data.TABS[number];
            // console.log( 'userTab ' +userTab);
            userTabName = userTab.TabName;
        }

        html = "<div id='selectDiv" + number + "'>";

        var tabN0 = "#tab" + number;


        if (number > 0) {
            html += "<br/>";
        }
        var tableSettingWitdh = htmlU.getSelectConfigTableWidth() > 950 ? 930 : htmlU.getSelectConfigTableWidth()

        html += '<table width ="' + tableSettingWitdh + '" align="center"><tr><td width="' + htmlU.getSelectConfigWidth() + '">';

        if (number == 0) {



            var currentcat = null;
            html += "<select id='AllList' size='8' multiple='true' style='width:100%;' class='form-control'>";


            for (var i = 0; i < catCodes.length; i++) {
                var cat = catCodes[i];
                html += '<optgroup label="' + cat + '">'
                $.each(availPortlet, function (i, item) {

                    if (item.CODE_CAT == cat) {
                        html += '<option value="' + item.CODE + '" >' + item.Label + '</option>';
                    }
                });


                html += '</optgroup>';
            }



            // $.each(availPortlet, function (i, item) {
            // 		var cat =null;

            // 		if(currentcat == null  ){
            // 			 cat = getNextCatCode(currentcat , catCodes); // for frouping of options
            // 			 html+='<optgroup label="'+cat +'">'
            // 		}else if(currentcat != item.CODE_CAT){
            // 			html+='</optgroup>';
            // 			cat = getNextCatCode(currentcat , catCodes); // for frouping of options
            // 			html+='<optgroup label="'+cat +'">'
            // 		}

            //            html+='<option value="'+ item.CODE+'" >'+item.Label +'</option>';
            //            currentcat = cat;
            // });



            html += "</select>";
            html += '</td>';
        } else {
            html += ' Tab Name : <input class="form-control" type="text" required name = "tabName' + number + '"  id = "tabName' + number + '" value="' + userTabName + '" pattern="/^[-_a-zA-Z0-9\s]*$/" >';
            html += "<a onclick='javascript:portCfg.removeTabConfig(  \"" + tabN0 + "\",\"#AllList\", \"" + number + "\", \"" + type + "\")' title='Delete Tab'><font color='grey'> <span class='fa fa-remove fa-times'></span>Delete Tab</font></a>";

            // html+= 'Tab number - ' + number + ' &nbsp;</td>';
        }

        html += '<td width="' + htmlU.getSelectConfigControlWidth() + '"  align="center">';

        html += "<a href='javascript:mintHtmlUtil.moveOptionToTab(\"#AllList\", \"" + tabN0 + "\")' title='Add Selected'> <font color='green'><span class='fa fa-chevron-right'></span></font></a> <br/><br/>";
        html += "<a href='javascript:mintHtmlUtil.moveAllOptionToTab(\"#AllList\",  \"" + tabN0 + "\")' title='Add All'><font color='green'> <span class='fa fa-chevron-right'></span><span class='fa fa-chevron-right'></span></font></a> <br/><br/>";

        html += "<a href='javascript:mintHtmlUtil.moveOptionToTab( \"" + tabN0 + "\", \"#AllList\")' title='Remove Selected'><font color='red'><span class='fa fa-chevron-left'></span></font></a> <br/><br/>";
        html += "<a href='javascript:mintHtmlUtil.moveAllOptionToTab( \"" + tabN0 + "\", \"#AllList\")' title='Remove All'><font color='red'><span class='fa fa-chevron-left'></span><span class='fa fa-chevron-left'></span></font></a> ";


        html += '</td>';

        html += '<td width="' + htmlU.getSelectConfigWidth() + '">';

        var curCat = null;

        html += "<select id=tab" + number + " size='8' multiple='true' style='width:100%' class='form-control'>";
        if (!isNull(userTab)) {



            for (var i = 0; i < userTab.PREFS.length; i++) {
                html += '<option value="' + userTab.PREFS[i].CODE + '" >' + userTab.PREFS[i].Label + '</option>';
            }
        }
        html += "</select>";

        html += '</td>';
        html += '<td width="' + htmlU.getSelectConfigControlWidth() + '"  cellpadding="10" align="center">';
        html += "<a href='javascript:mintHtmlUtil.moveOptionToTop( \"" + tabN0 + "\", \"top\");' title='Move To Top'> <font color='green'><span class='fa fa-arrow-up'></span></font></a> <br/><br/>";
        html += "<a href='javascript:mintHtmlUtil.moveOptionUpDown( \"" + tabN0 + "\", \"up\");' title='Move Up'><font color='green'> <span class='fa fa-chevron-up'></font></a> <br/><br/>";
        html += "<a href='javascript:mintHtmlUtil.moveOptionUpDown( \"" + tabN0 + "\", \"down\");' title='Move Down'><font color='red'><span class='fa fa-chevron-down'></span></font></a> <br/><br/>";
        html += "<a href='javascript:mintHtmlUtil.moveOptionToTop( \"" + tabN0 + "\", \"bottom\");' title='Move To Bottom'><font color='red'><span class='fa fa-arrow-down'></font></a> ";
        html += '</td>';
        html += '</tr></table>';
        html += "</div>";
        // console.log(html);

        return html;

    }

    // function getNextCatCode(current, codeCats){

    // 	if(jsu.isNull(current)){
    // 		return codeCats[0];
    // 	}
    // 	// var in
    // 	for(var i=0;i< codeCats.length;i++ ){
    // 		if(codeCats[i] == current){
    // 			if(codeCats.length > i+1){
    // 				return codeCats[i+1];
    // 			}
    // 		}

    // 	}
    // 	return 'Miscellaneous';

    // }



    /*
    
            function previewPage(action, type){
    
                  var pageParams = getPageParams(type);
                  var type = pageParams['type'];
                  var data = pageParams['config'];
    
                  if(action=='preview' || action=='save'){
                    if(!validateConfig(type)) return false;
                  }
    
    
                  // $('#'+type+'Contents').empty();
    
                  // $('#'+type+'Contents').append("<div id='"+type+"'ContentsFeedBack'></div> <div id='"+type+"Title'></div> ");
                  
    
    
    
                  
                      
                  // queryParams+='&tabCount=' + tabCount +'&configName='+pageParams['configName'];
    
                  
            }
    
        */


    function saveConfig(type) {

        // if(!previewPage('save', type)) return false;

        if (!validateConfig(type)) return false;



        var pageParams = getPageParams(type);

        var newTabs = [];
        var tabCount = 0;


        for (var i = 0; i <= pageParams['divNo']; i++) {
            var tab = '#tab' + i;

            // console.log(' tab' +i +  $('#tab'+i).length);
            if ($('#tab' + i).length == 0) {
                continue;
            }
            tabCount++;
            // queryParams+='&';

            if (i == 0) {
                tabName = 'Landing Page';
            } else {
                tabName = $('#tabName' + i).val();

            }
            var tabPref = [];

            var newTab = { TabName: tabName, tabPref: [] }

            newTabs.push(newTab);

            // queryParams+='tab'+tabCount+'name='+tabName ;

            // tabNames.push(tabName);
            // var tabName = $('#tabName'+i).val();

            var topTabId = 'topTab' + i;
            // var topTabIdBtn = topTabId+"Btn";
            // var topTabHtml = '<div id="'+topTabId +'">'   ;   

            // if(i==0){
            //   topButtonsHtml += '<button class="btn btn-outline-secondary btn_margin"  id="'+topTabIdBtn+'" onClick="javascript:portCfg.showThisTab(\''+topTabId+'\',\''+topTabIdBtn+'\'  ,\''+type+'\');">' + tabName+' </button>';
            // }else{
            //   topButtonsHtml +=   ' &nbsp;&nbsp;<button class="btn btn-primary btn_margin"  id="'+topTabIdBtn+'" onClick="javascript:portCfg.showThisTab(\''+topTabId+'\',\''+topTabIdBtn+'\',\''+type+'\');">' + tabName+' </button>';
            // }

            // topTabHtml+="<div class='row no-gutter' >";

            pageParams['topTabs'].push(topTabId);
            // var tabFields='&tab'+tabCount+'Fields=';


            $('select' + tab).find('option').each(function () {

                // pageParams['reqs'].push($(this).val());
                var code = $(this).val();
                newTab.tabPref.push(code);

            });


        }


        // APPLYING NEW SETTIGS
        mtgv.portlet.curTab = 0;

        var TABS = [];

        for (var i = 0; i < newTabs.length; i++) {
            var newTab = newTabs[i];
            var tab = { TabName: newTab.TabName };

            var prefs = [];

            for (var j = 0; j < newTab.tabPref.length; j++) {

                var pref = portu.getDef(pageParams, newTab.tabPref[j]);
                prefs.push(pref);

                if (j == 20) break;

            }
            tab.PREFS = prefs;
            TABS.push(tab);
        }

        pageParams.config.TABS = TABS;
        pageParams.config.TAB_NO = newTabs.length

        printPage();

        saveOnServer(' Settings saved', type, 'saveConfig');


    }





    function removePortlet(div, type) {

        var pageParams = getPageParams(type);
        //   // TODO
        //   // save in server
        //   $('#'+div+"RestoreDiv").hide();
        //   // save in server

        //   // pageParams['pageScope'].removePortlet(div);

        var tab = portu.getCurTab();
        var prefs = tab.PREFS;

        var label = '';

        for (var i = prefs.length - 1; i >= 0; i--) {
            var obj = prefs[i];
            if (obj.CODE == div) {

                label = obj.Label;
                prefs.splice(i, 1);
                // return obj;
                break;
            }


        }



        htmlU.divHide(div + "Portlet");

        var msg = 'Portlet ' + label + ' is removed Permananetly';

        saveOnServer(msg, type, 'remove');



        // loadPortlets

        // pageParams['reqs'].splice($.inArray(div, pageParams['reqs']),1);  

    }


    function saveSettings() {

        var code = mtgv.portlet.code;

        saveOnServer('Setting Saved', code, 'saveCur');
    }


    function saveOnServer(msg, type, action) {



        window[mtgv.portlet.obj]['savePref']();


        addMsg(type, msg)


        var portCfg = portu.getPortletCfg();

        if (jsu.isNotNull(portCfg.defConfig)) {
            portCfg.availPortlet = portu.gap('balance', portCfg.config, portCfg.defConfig);
        }


    }


    function addMsg(type, msg) {
        var fbMsg = '<div style="' + DIV_STYLE_GREEN_BORDER + '" align="center"  ><span style="color:#69b390;font-size:24px;"> ' + msg + ' </span>'
            + '<a onClick="JavaScript=mintHtmlUtil. clearDiv(\'' + type + 'ContentsFeedBack\');" <span class="fa fa-remove fa-times"  style="color:black"></span> </a> '
            + '</div>'
            ;

        htmlU.addMsgToDiv(type + 'ContentsFeedBack', true, fbMsg);


        // $('#'+type+ 'ContentsFeedBack').append('<font color="green">Settings Saved</font>  <a onClick="JavaScript=clearDiv(\''+type+ 'ContentsFeedBack\');" <span class="fa fa-remove fa-times" ></span> </a> ');

        $('#' + type + 'ConfigSettings').empty();

    }


    function getPageParams(type) {

        return portu.getPortletCfg();
        // if(type==  'Equity'){
        //   return eqVars;

        // }else if(type =='Home'){
        //   return mtgv.homeVars;
        // }
    }

    function showThisTab(tabId, btnId, type) {

        portu.init();

        var pageParams = getPageParams(type);

        var seltabId = 0;
        for (var i = 0; i < pageParams['topTabs'].length; i++) {
            if (pageParams['topTabs'][i] == tabId) {
                $('#' + pageParams['topTabs'][i]).show();
                $('#' + pageParams['topTabs'][i] + 'Btn').removeClass('btn-primary').addClass('btn-outline-secondary');
                seltabId = i;

            } else {
                $('#' + pageParams['topTabs'][i]).hide();
                $('#' + pageParams['topTabs'][i] + 'Btn').removeClass('btn-outline-secondary').addClass('btn-primary');
            }
        }

        mtgv.portlet.selTab = tabId;

        portu.init();


        window[mtgv.portlet.obj]['lp']();


        if (pageParams.config.TABS.length >= seltabId) {

            localStorage.setItem(type + 'TabName', pageParams.config.TABS[seltabId].TabName);
        }




        // myth.lp();


    }

    function removeTabConfig(from, to, number, type) {
        htmlU.moveAllOptionToTab(from, to);
        $("#selectDiv" + number).empty();
        $('#' + type + 'ConfigFeedBack').empty();
    }


    function validateConfig(type) {

        var pageParams = getPageParams(type);
        $('#' + type + 'ConfigFeedBack').empty();
        for (var i = 0; i <= pageParams['divNo']; i++) {
            var tab = '#tab' + i;
            // console.log(' tab' +i +  $('#tab'+i).length);
            if ($('#tab' + i).length == 0) {
                continue;
            }
            var hasOption = false;
            $(tab).find('option').each(function () {
                // console.log(" Tab no "+i  + "Option " + $(this).val()  );
                hasOption = true;
            });
            if (hasOption == false) {
                $('#' + type + 'ConfigFeedBack').append('<font color="red"> Atleast one of the tab has no value <font>');
                return false;
            }
            var tabName = $('#tabName' + i).val();
            if (isNull(tabName) && i != 0) {
                // console.log('tabName : ' +tabName);
                $('#' + type + 'ConfigFeedBack').append('<font color="red"> Missing Tab Name <font>');
            }
        }
        return true;
    }


    // function loadOnDemand(newDemand, type){
    // 	  var pageParams = getPageParams(type);

    // 	  pageParams['pageScope'].loadOnDemand(newDemand);

    // 	  // removePortlet
    // }


    function createPortletTable(title, head, rows, divName, type) {

        var content = createBaseTable(head, rows);
        return createPortlet(title, content, divName, true, type);

        // return createTableFull(title, head, rows, 'left', 4, divName);
    }


    /*
            function getItem(data, code){
    
                var item =null;
                for(var i=0;i<data.TAB_NO ;i++){
                          var tab = data.TABS[i];
                          for(j=0;j<tab.PREFS.length;j++){
                              if(code == tab.PREFS[j].CODE){
                                item = tab.PREFS[j];
                                return item;
                              }
                          }
                        }
    
                        if(item==null){
    
                          for(j=0;j<data.AVAILABLE_PORTLETS.length;j++){
                              if(code == data.AVAILABLE_PORTLETS[j].CODE){
                                item = data.AVAILABLE_PORTLETS[j];
                                return item;
                              }
                          }
                        }
                return item;
    
            }
    
    */


    function applyDef(type) {

        htmlU.divHide(type + 'ConfigSettings')

        window[mtgv.portlet.obj]['applyDef']();

        // HomeConfig

    }


    return {
        showConfig: showConfig,
        // previewDef : previewDef ,

        printPage: printPage,
        // doSave : doSave,
        // previewPage : previewPage,
        // getItem  : getItem,

        saveSet: saveSettings,

        saveConfig: saveConfig,
        addATab: addATab,
        closeConfig: closeConfig,
        removeTabConfig: removeTabConfig,
        showThisTab: showThisTab,

        removePortlet: removePortlet,

        applyDef: applyDef,
        addMsg: addMsg


    }

})(); // module 





var portu = (function () {   // portlet Utils home

    var htmlU = mintHtmlUtil;
    var jsu = mintJsUtil;

    // Portlet

    function init() { //createStructure // data, tab

        var code = mtgv.portlet.code;

        $('#' + code + 'Contents').empty();
        $('#' + code + 'Contents').append("<div id='" + code + "ContentsFeedBack'></div> <div id='" + code + "Title'></div> ");

        // $('#'+code+'Contents').append("<div id='"+code+"TabDiv'></div>");


        // portCfg.showConfig(true, code);  



        $('#' + code + 'Config').hide();


        var html = "<div class='row gy-2' id='TabData'>";

        // var portlets = data.AVAILABLE_PORTLETS;


        // $('#FEEDBACK').empty();


        // for(var i=0;i<portlets.length;i++){

        //  var item = portlets[i];
        //      if( mintJsUtil.isValTrue( item.hidden)  && data.TAB_NO==0){
        //            continue;
        //      }

        // }

        html += "</div>"; // BS rows
        // console.log(html);
        $('#' + code + 'Contents').append(html);



    }




    function createStaticPortlet(content, code, cfg) {
        // var html = createPortlet( cfg.title, content,id,true, cfg.type , null );
        printStatic(content, code, cfg);
    }

    function createStaticFailPortlet(data, code, cfg) {

        var content = htmlU.getSpan(ERROR_MSG, 'red', 10);
        printStatic(content, code, cfg);

    }

    function printStatic(content, code, cfg) {
        // var html = createPortlet( cfg.title, content, code ,true, cfg.type , null );

        // $('#TabData').append(html);
        // 	portletToolBarZoomReinit(code, null, true);	
        // 	return;

        htmlU.addMsgToDiv(code + 'Body', true, content);

    }



    function createPortlet(title, portletCode, allowRemove, portLetType, defi) {

        if (jsu.isNull(defi)) {
            defi = getDef(getPortletCfg(), portletCode);
        }



        var portletCode = portletCode.toString();

        var div = portletCode + "Portlet";
        var html = '';

        var col = jsu.getObjFrmArr(BS_COLS, defi.size); //    htmlU.bsCol(defi.size);  

        html += '<div class="' + col.COL + '"   id="' + div + '">';

        html += '<div id="' + portletCode + 'Config"  align="left"><div id="' + portletCode + 'ConfigFeedBack"></div></div>';


        html += '	<div class="card shadow-lg" > ';

        // header Start
        html += '	<div class="card-header"> ';
        html += '	<h5 class="card-title">' + title + '</h5> ';
        html += '	<div class="card-toolbar"> ';
        html += '	<ul>';

        html += addPortletToolBarLi('min', portletCode, 'fas fa-chevron-up', portletCode + 'Min', 'Minimize');   //fnc, code , fontAwe 

        html += addPortletToolBarLi('max', portletCode, 'fas fa-chevron-down', portletCode + 'Max', 'Maximize');   //fnc, code , fontAwe 

        html += addPortletToolBarLi('small', portletCode, 'fas fa-search-minus', portletCode + 'Small', 'Smaller Size');   //fnc, code , fontAwe 

        html += addPortletToolBarLi('large', portletCode, 'fas fa-search-plus', portletCode + 'Large', 'Larger Size');   //fnc, code , fontAwe 

        html += addPortletToolBarLi('del', portletCode, 'fas fa-times', portletCode + 'Del', 'Remove');   //fnc, code , fontAwe 


        html += '	</ul>';

        html += '  </div>';   //card-toolbar
        html += '  </div>';   //card-header

        // body start 

        html += ' <div class="card-body">';
        html += ' <div class="table-responsive">';

        html += ' <div id="' + portletCode + 'Body">';

        // html+= content;

        html += '  </div>';   //portletCode +'Body

        html += '<div id="' + portletCode + 'Restore">';



        var restoreHtml = '<a onclick="javascript:portu.restore(\'' + portletCode + '\')" ><b><font color="green">Undo</font></b></a> &nbsp;&nbsp;'
            + '<a onclick="javascript:portCfg.removePortlet(\'' + portletCode + '\', \'' + portLetType + '\' )" ><b><font color="red">  Remove Permanently<font></b></a> &nbsp;&nbsp;'
            + ' <a onclick="javascript:portCfg.showConfig(false, \'' + portLetType + '\');" > <font  color="grey"> Customize this view<span class="fa fa-cog"></span> </font> </a>'




        html += restoreHtml;

        // html+= content;
        html += '  </div>';   //portletCode +'RestoreDiv



        // if( divExist( divName+"RestoreDiv")){
        // 	emptyDiv(divName+"RestoreDiv");
        // }

        // $('#'+portletCode+"RestoreDiv").append(restoreHtml);



        html += '  </div>';   //card-resp
        html += '  </div>';   //card-body

        html += '  </div>';   //ccard Shadow
        html += '  </div>';   // Portlet

        /*
                    var width = $(window).width(); 
        
                    var mainWidth=85;
                    var sideWidth=15;
        
                    if(width<500){
                      mainWidth = 60;
                     sideWidth=40;
                    }else if(width<750){
                      mainWidth = 70;
                     sideWidth=30;
                    }else if(width<950){
                      mainWidth = 80;
                     sideWidth=20;
                    }
        
                    html+= '<div class="datagrid" >';
        
        
                    html+= '<div style="float:left; width:'+mainWidth+'%; ">'
                    html+='<h3 class="datagrid">';
        
        
                    html +=title+'</h3>';
                    html+='</div >';
        
                      // float = right
                    html+= '<div style ="float:right; width:'+sideWidth+'%;   " >'
        
        
                    var divWidth = "width:50%;";
        
        
                    if(!allowRemove){
                        divWidth = "width:100%;";
                    }
        
        
                    html+='<div id="'+ div +'Minus" style="'+divWidth+' float:left;overflow:hidden;background-color:#1C89B5; ">';
                    html+='<a   style="color:#FFFFFF;"   onclick="javascript:hidePortletDiv( \''   + div+'\')">';
                    html+='<h3 class="datagrid"><span class="fa fa-minus" ></span></h3>';
                    html+='</a>'; 
                    html+='</div>';
        
        
                    html+='<div id="'+ div +'Plus"  style="'+divWidth+' float:left;overflow:hidden">';
                    html+='<a   style="color:#FFFFFF;"   onclick="javascript:showPortletDiv( \''   + div+'\')">';
                    html+='<h3 class="datagrid"><span class="fa fa-plus-square" ></span></h3>';
                    html+='</a>'; 
                    html+='</div>';
        
                    if(allowRemove){
                        html+='<div id="'+ div +'Remove" style="'+divWidth+ ' overflow:hidden;background-color:#1C89B5; ">';
                        html+='<a   style="color:#FFFFFF;"   onclick="javascript:removePortletDiv( \''   + divName+'\')">';
                        html+='<h3 class="datagrid"><span class="fa fa-remove fa-times" ></span></h3>';
                        html+='</a>'; 
                        html+='</div>';
                    }
        
                    html+='</div>';
        
        
                    html+='<div id="'+div+ '" style="display:inline-block;width:100%">';
        
                    html+= content;
                    html+= '</div>';
                    html+= '</div>';
        
                    var restoreHtml = '<a onclick="javascript:restorePortletDiv(\'' + divName+'\')" ><b><font color="green">Undo</font></b></a> &nbsp;&nbsp;' 
                    + '<a onclick="javascript:removePermanently(\'' + divName+'\', \'' + type+'\' )" ><b><font color="red">  Remove Permanently<font></b></a> &nbsp;&nbsp;'
                    + ' <a onclick="javascript:showConfig(false, \'' + type+'\');" > <font  color="grey"> Customize this view<span class="fa fa-cog"></span> </font> </a>'
        
                    // console.log(' Div Name ' + divName);
                    // console.log(' restoreHtml ' + restoreHtml);
        
                    if( divExist( divName+"RestoreDiv")){
                        emptyDiv(divName+"RestoreDiv");
                    }
        
                    $('#'+divName+"RestoreDiv").append(restoreHtml);
        
                    $('#'+divName+"RestoreDiv").hide();
        
        
                    // html= html+"<h"+ size +" align ='" +align+"'> "+ title +"</h"+size +" 3>"; 
        
        
                    // html+= createImage(genInfo.oneMthChart);
                    return html;
        */
        return html;
    }

    function addPortletToolBarLi(fnc, code, fontAwe, div, title) {

        var html = '';

        html += '<li>'
        html += '	<div id ="' + div + '">'
        html += '		<a href="javascript:portu.' + fnc + '  (\'' + code + '\');" class="text-secondary" title="' + title + '"  >';
        html += '			<i class="' + fontAwe + ' ms-1 "></i>';
        html += '		</a>';
        html += '	</div>';
        html += '</li>';

        return html;
    }

    function minimizePortlet(code) {
        $('#' + code + "Body").hide();
        $('#' + code + "Min").hide();
        $('#' + code + "Max").show();
    }

    function maxPortlet(code) {
        $('#' + code + "Body").show();
        $('#' + code + "Min").show();
        $('#' + code + "Max").hide();
    }

    function smallPortlet(code) {

        setPortletCol(code, false);
    }


    function largePortlet(code) {
        setPortletCol(code, true);
    }

    function setPortletCol(code, large) {
        var cfg = getPortletCfg();
        var def = getDef(cfg, code)

        var size = Number(def.size);

        if (large) {
            if (size == 12) {
                return;
            }
            size = size + 1;
        } else {
            if (size == 1) {
                return;
            }
            size = size - 1;
        }
        def.size = size;

        var div = code + "Portlet";


        $("#" + div).removeClass(); // removes all classes


        var col = jsu.getObjFrmArr(BS_COLS, size); //    htmlU.bsCol(defi.size);  

        $("#" + div).addClass(col.COL);

        var msg = ' You have Unsaved Settings. Do you wish to ';

        var type = cfg.type;

        var fbMsg = '<div style="' + DIV_STYLE_ORANGE_BORDER + '" align="center"  ><span style="color:#ff9125;font-size:24px;"> ' + msg
            + '<button onClick="JavaScript= portCfg.saveSet(\'' + type + 'ContentsFeedBack\');" class="btn btn_margin btn-outline-warning" style="color:#ff9125;font-size:24px;"> Save <span class="fas fa-save"  "></span> </button> '
            + ' </span>'
            + '</div>'
            ;



        htmlU.addMsgToDiv(type + 'ContentsFeedBack', true, fbMsg);





        portletToolBarZoomReinit(code);
    }

    function portletToolBarZoomReinit(code, def, init) {

        if (jsu.isNull(def)) {
            cfg = getPortletCfg();
            def = getDef(cfg, code)
        }

        var size = 4;
        if (jsu.isNotNull(def) && (jsu.isNotNull(def.size))) {
            size = Number(def.size);

        }

        if (init) {
            $('#' + code + "Max").hide();
            $('#' + code + "Restore").hide();
        }

        $('#' + code + "Small").show();
        $('#' + code + "Large").show();

        if (size == 1) {
            $('#' + code + "Small").hide();
        } else if (size == 12) {
            $('#' + code + "Large").hide();
        }

    }

    function delPortlet(code) {

        $('#' + code + "Body").hide();
        $('#' + code + "Restore").show();


    }

    function restorePortlet(code) {
        $('#' + code + "Body").show();
        $('#' + code + "Restore").hide();
    }




    // small : smallPortlet,
    // large : largePortlet,
    // del : delPortlet



    /*
            function hidePortletDiv(div){
                 $('#'+div).hide();
                 $('#'+div+"Minus").hide();
                 $('#'+div+"Plus").show();
            }
            function showPortletDiv(div){
                 $('#'+div).show();
                  $('#'+div+"Minus").show();
                 $('#'+div+"Plus").hide();
            }
    
            function removePortletDiv(div){
                 $('#'+div).hide();
                 $('#'+div+"RestoreDiv").show();
            }
            function restorePortletDiv(div){
                $('#'+div).show();
                $('#'+div+"ColDiv").show();
                $('#'+div+"RestoreDiv").hide();
                 $('#'+div+"ColDivMinus").show();
                 $('#'+div+"ColDivPlus").hide();
            }
    */


    function getPortletCfg() {

        if (mtgv.portlet.current == 'home') {
            return mtgv.portlet.Home;
        } else if (mtgv.portlet.current == 'equity') {
            return mtgv.portlet.Equity;
        } else if (mtgv.portlet.current == 'BuzStk') {
            return mtgv.portlet.BuzStk;
        } else if (mtgv.portlet.current == 'invEye') {
            return mtgv.portlet.invEye;
        } else if (mtgv.portlet.current == 'TechiEye') {
            return mtgv.portlet.TechiEye;
        } else if (mtgv.portlet.current == 'PatternEye') {
            return mtgv.portlet.PatternEye;
        } else if (mtgv.portlet.current == 'StrategyEye') {
            return mtgv.portlet.StrategyEye;
        } else if (mtgv.portlet.current == 'EquityEye') {
            return mtgv.portlet.EquityEye;
        }

    }




    // generic can be home / equity etc.....

    // function getAlldef(){
    // 	var cfg =getPortletCfg();
    // 	var defs =[]
    // 	var config = cfg.config;

    // 	for(var i=0;i<config.TABS.length ; i++ ){

    // 		var tab = config.TABS[i];
    // 		var prefs = tab.PREFS;

    // 		for(var j=0;i<prefs.length ; j++){
    // 			var pref = prefs[j];
    // 			defs.push(pref);
    // 		}

    // 	}



    // }


    function getDef(cfg, code) {
        ;
        var defi = null;

        var config = cfg.config
        // in Use first....
        for (var i = 0; i < config.TABS.length; i++) {

            var tab = config.TABS[i];
            var prefs = tab.PREFS;
            defi = getDefFromArr(prefs, code);
            if (jsu.isNotNull(defi)) {
                return defi;
            }
        }
        // Not in Use searching available ones....
        return jsu.getObjFrmArr(cfg.availPortlet, code);
    }

    function getDefFromArr(prefs, code) {
        for (var i = 0; i < prefs.length; i++) {
            var pref = prefs[i];

            if (pref.CODE === code) {
                return pref;
            }
        }
        return null;
    }


    // TAB SPECIFIC

    function getCurrentTab() {

        var cfg = getPortletCfg();

        //if( jsu.isNull())

        var tabNo = 0;

        if (jsu.isNotNull(cfg.topTabs)) {
            for (var i = 0; i < cfg.topTabs.length; i++) {

                if (cfg.topTabs[i] == mtgv.portlet.selTab) {
                    tabNo = i;
                }

            }
        }

        var tab = cfg.config.TABS[tabNo];
        return tab;

    }



    function inCurrentTab(code) {

        /*
                    var cfg =getPortletCfg();
        
                    var tabNo = 0;
        
                    if(jsu.isNotNull(cfg.topTabs)){
                        for(var i=0;i<cfg.topTabs.length;i++  ){
        
                            if(cfg.topTabs[i] == mtgv.portlet.selTab){
                                tabNo =i;
                            }
        
                        }
                    }
        
                    if(cfg.config.TABS.length < tabNo){
                        return false;
                    }
        */
        var tab = getCurrentTab();

        var prefs = tab.PREFS;

        for (var i = 0; i < prefs.length; i++) {
            var pref = prefs[i];

            if (pref.CODE === code) {
                return true;
            }
        }
        return false;

    }

    function getTabPortlets() {
        var tab = getCurrentTab();


        return tab.PREFS;
    }


    function getAvaiPortlet(identifier, cfg, defCfg) {

        var availPortlet = [];

        if (identifier == 'balance') {

            for (var i = 0; i < defCfg.AVAILABLE_PORTLETS.length; i++) {
                var pref = defCfg.AVAILABLE_PORTLETS[i];
                availPortlet.push(pref);
            }

            for (var i = 0; i < cfg.TABS.length; i++) { // remove available ones in Tabs....

                var tab = cfg.TABS[i];
                var prefs = tab.PREFS;
                for (var j = 0; j < prefs.length; j++) {
                    var pref = prefs[j];
                    jsu.removeFromArrayWithId(availPortlet, pref.CODE, 'CODE');
                }
            }

        } else if (identifier == 'NoCustYet') {


            var TABS = [];
            var prefs = [];
            var tabData = { TabName: 'Landing Page', PREFS: prefs }
            TABS.push(tabData);

            cfg.TABS = TABS;
            cfg.TAB_NO = 1;

            for (var i = 0; i < defCfg.AVAILABLE_PORTLETS.length; i++) {
                var pref = defCfg.AVAILABLE_PORTLETS[i];
                if (jsu.isValTrue(pref.hidden) || i > 8) {
                    availPortlet.push(pref);
                } else {
                    prefs.push(pref)
                }

            }
        }

        return availPortlet;
    }


    // function setGenTime(){

    // 	var cfg = getPortletCfg();


    // 	var reportServerTime = new Date(cfg.rptLocalTime.getTime() - mtgv.mktDet.timeDiffInMillis  );
    // 	cfg.genDate = reportServerTime;


    // }


    // ------------------- Stock Basket ---------------------------------



    function setClassi(type, subtype) {

        var sbAndCat = null;

        var config = getPortletCfg().config;

        var classi = config.classi;
        var stkBsktCat = config.stkBsktCat;

        // if(type == 'sbc'){

        // }



        if (subtype == 'loadSb') {
            sbAndCat = msbu.ua('getStockBasketAndCat', stkBsktCat, classi);
            if (!sbAndCat.loaded) {
                setTimeout(setClassi, 40, type, subtype);
                return;
            }
        }

        if (jsu.isNull(classi)) {
            classi = 'fo'
        } else if (jsu.arrayContainsId(CLASSI, classi)) {
            var classElem = jsu.getObjFrmArr(CLASSI, classi);
            classi = classElem.id;
        } else {
            sbAndCat = msbu.ua('getStockBasketAndCat', stkBsktCat, classi);
            if (!sbAndCat.loaded) {
                setTimeout(setClassi, 40, type, subtype);
                return;
            }
            classi = sbAndCat.stkBasket.id;

            if (jsu.arrayContainsId(CLASSI, classi)) {
                stkBsktCat = null;
            } else {
                stkBsktCat = sbAndCat.stkBsktCat;
            }

        }
        config.classi = classi;
        config.stkBsktCat = stkBsktCat;


        var func = 'sbc';

        var sblcfg = { fieldName: 'classiGrp', obj: 'portu', fnc: func, selected: classi, stkBsktCat: stkBsktCat };

        var html = TSR_HR + msbu.ua('getsb', sblcfg) + TSR_HR;

        htmlU.addMsgToDiv('sbDiv', true, html);

        // classiSet = true;

        if (type == 'init') {
            window[mtgv.portlet.obj].lpd(false, true);
            return;
        } else if (type == 'sbc') {
            window[mtgv.portlet.obj].lpd(false, true);
            return;
        }

    }




    function stockBasketChg() {
        var classi = $('input[name=classiGrp]:checked').val();
        // var config  = mtgv.portlet.BuzStk.config;

        var config = getPortletCfg().config;


        if (config.classi == classi) {
            return;
        }
        config.classi = classi;

        if (jsu.arrayContainsId(CLASSI, classi)) {


            var classElem = jsu.getObjFrmArr(CLASSI, classi);
            config.classi = classElem.id

            config.stkBsktCat = null;

        } else {
            var stkBsktCat = jsu.isNull(mtgv.mtpp.sblcfg) ? null : mtgv.mtpp.sblcfg.stkBsktCat;

            var sbAndCat = msbu.ua('getStockBasketAndCat', stkBsktCat, classi);

            config.classi = sbAndCat.stkBasket.id;
            config.stkBsktCat = stkBsktCat;

        }

        setClassi('sbc');
        // window[mtgv.portlet.obj].setClassi('sbc')
    }



    // ------------------- Stock Basket ---------------------------------


    return {

        init: init,
        getPortletCfg: getPortletCfg,
        createS: createStaticPortlet,

        createSF: createStaticFailPortlet,


        create: createPortlet,
        getDef: getDef,

        curTb: inCurrentTab,
        getCurTab: getCurrentTab,

        min: minimizePortlet,
        max: maxPortlet,
        small: smallPortlet,
        large: largePortlet,
        del: delPortlet,

        restore: restorePortlet,

        getTabPortlets: getTabPortlets,
        gap: getAvaiPortlet,

        tlBar: portletToolBarZoomReinit,


        setClassi: setClassi,
        sbc: stockBasketChg

        // sgt : setGenTime

        // init : init,
        //      homeInit : homeInit,
        //      lp : loadPortlets,
        //      shpf : saveHomePrefFeedback,
        //      shc : showHomeConfig, 
        //      fc : frequencyChange,
        //      shp : showHomePortlet


    }

})(); // module 




var portp = (function () {   // Portlet Printer

    var htmlU = mintHtmlUtil;
    var jsu = mintJsUtil;




    function printGenericPortlet(data, entry, remoteObject) {

        var portlet = remoteObject.portlet;

        var html = ''

        if (remoteObject.showTicks) {  // For Home ...
            html += getTickCfg(remoteObject, portlet)
        }


        // if(entry =='tsaAllBullish'){
        // 	var i= 1;
        // }	


        var label = null;
        var label2 = null

        var addiInfo = portlet.addiInfo;

        if (portlet.eyeType == 'Pattern') {
            addiInfo = addiInfo.split(":");

            label = 'Change';
            label2 = 'Change (%)';

        } else if (addiInfo != null) {
            addiInfo = addiInfo.split(":");





            if (portlet.colLabel1 != null) {    // For Dyna Freq .....
                label = portlet.colLabel1;
                if (portlet.colLabel2 != null) {
                    label2 = portlet.colLabel2;
                }
            } else {    // // For Static DB Config Freq .....

                label = addiInfo[3];
            }
        }



        html += '<div class="table-responsive">'

        html += '<table class="table table-striped  table-hover">';

        html += '<thead><tr><th>Name</th>   <th>Price</th> <th>' + label + '</th>'

        if (label2 != null) {
            html += '<th>' + label2 + '</th>';
        }
        html += '</tr></thead>'


        html += '<tbody>';
        var list = data.list;
        if (jsu.isNull(list) || list.length == 0) {
            html += '<tr><td colspan ="4">No Records </td></tr>';
        } else {

            for (var i = 0; i < list.length; i++) {

                html += '<tr>';
                var element = list[i];
                var link = getEqLink(element.Code, portlet.tick, element.Name)

                html += htmlU.createTd((link));
                html += htmlU.createTd((element.close));
                // html+= htmlU.createTd(  (   jsu.formatColor( element.close - element.prevClose      )  ) );

                if (portlet.eyeType == 'Pattern') {
                    html += htmlU.createTd((jsu.formatColor(element.close - element.prevClose)));
                    html += htmlU.createTd(htmlU.doBold(jsu.formatPC(element.close, element.prevClose)));
                } else {
                    html += htmlU.createTd(htmlU.doBold(element.Value));

                    if (label2 != null) {
                        html += htmlU.createTd(htmlU.doBold(element.Value2));
                    }
                }
                html += '</tr>';

            }
        }

        html += '</tbody></table>';

        html += '</div>';

        var moreUrl = '';

        if (jsu.isMyContext()) {

            var moreParams = '';

            if (addiInfo != null) {
                moreParams = {
                    freq: portlet.tick, classi: remoteObject.pd.classi, stkBsktCat: remoteObject.pd.stkBsktCat, item: portlet.CODE, "showIdx": false,
                    scrType: addiInfo[0], "cat": addiInfo[1], "subCat": addiInfo[2]
                };


                if (portlet.eyeType == 'Pattern') {

                    if (jsu.containsString(['Triangle', 'TrendLines', 'Channel', 'ChartPatterns'], moreParams.cat)) {
                        moreParams.item = 'all';
                    } else {
                        moreParams.item = portlet.reportName;
                    }

                }

                if (addiInfo[0] == 'tech' || addiInfo[1] == 'TechStrength') {    // For Dyna Freq .....
                    moreParams.item = addiInfo[3];
                }
            }

            moreUrl = jsu.getMyTsrUrl() + '/MyTsr/#/PreScreened/PreScreenedReport/' + JSON.stringify(moreParams);

        } else {

            moreUrl = getPubMoreLink(portlet, remoteObject);

            // moreUrl = jsu.getRootUrl()+ '/Screener' + portlet.pid;



        }






        html += "<div align= 'right'   ><br/> <a href='" + moreUrl + "' class='btn btn-primary btn-sm' >more..</a></div>";


        htmlU.addMsgToDiv(portlet.CODE + 'Body', true, html);

    }





    function printPortlet(data, entry, remoteObject) {

        var portlet = remoteObject.portlet;

        var reportName = jsu.isNull(portlet.alias) ? portlet.reportName : portlet.alias;   // Alias for backward compatibility with Home page



        if (reportName == 'priceGainer' || reportName == 'priceLoser' || reportName == 'bullishGapUp' || reportName == 'bearishGapDown') {
            getPriceChangeTable(data, entry, portlet, remoteObject);
        } else if (reportName == 'priceGainWithHighVol' || reportName == 'priceFallWithHighVol' || reportName == 'volJump' || reportName == 'volHighIntra') {
            getPriceVolChangeTable(data, entry, portlet, remoteObject);
        } else if (jsu.containsString(['trendingUp3Days', 'trendingDown3Days', 'trendingUpHigh3Days', 'trendingDownLow3Days', 'trendingUpVol3Days', 'trendingDownVol3Days'], reportName)) {
            getTrending(data, entry, portlet, remoteObject);
        } else if (reportName == 'openEqHigh' || reportName == 'openEqLow') {
            getOhlc(data, entry, portlet, remoteObject);
        }



        if (portlet.CODE_CAT == 'CustomScreener') { // Custom screener   -- Strategy Eye View....
            getPriceChangeTable(data, entry, portlet, remoteObject);
        }

    }



    function getPriceChangeTable(data, entry, portlet, remoteObject) {
        var html = ''

        if (remoteObject.showTicks) {  // For Home ...
            html += getTickCfg(remoteObject, portlet)
        }



        html += '<div class="table-responsive">'

        html += '<table class="table table-striped  table-hover">';

        html += '<thead><tr><th>Name</th>  <th>Close</th>  <th>Change</th> <th>Change (%)</th></tr></thead>'


        html += '<tbody>';


        if (data.statusCode == MSG_STATUS_NO_RECORD) {

            html += '<tr><td colspan ="4">' + data.statusMsg + '</td></tr>';

        } else {

            var list = data.list;





            if (list.length == 0) {
                html += '<tr><td colspan ="4">No Records </td></tr>';
            } else {

                for (var i = 0; i < list.length; i++) {

                    html += '<tr>';
                    var element = list[i];
                    var link = getEqLink(element.Code, portlet.tick, element.Name)

                    html += htmlU.createTd((link));
                    html += htmlU.createTd((element.close));
                    html += htmlU.createTd((jsu.formatColor(element.close - element.prevClose)));
                    html += htmlU.createTd(htmlU.doBold(jsu.formatPC(element.close, element.prevClose)));
                    html += '</tr>';

                }
            }

        }

        html += '</tbody></table>';

        html += '</div>';







        html += getMoreLink(portlet, remoteObject);



        htmlU.addMsgToDiv(portlet.CODE + 'Body', true, html);

    }


    function getPriceVolChangeTable(data, entry, portlet, remoteObject) {
        var html = ''
        if (remoteObject.showTicks) {  // For Home ...
            html += getTickCfg(remoteObject, portlet)
        }



        html += '<div class="table-responsive">'

        html += '<table class="table table-striped  table-hover">';

        html += '<thead><tr><th>Name</th>  <th>Close</th>  <th>Price Change(%)</th> <th>Vol Change (%)</th></tr></thead>'


        html += '<tbody>';
        var list = data.list;
        if (list.length == 0) {
            html += '<tr><td colspan ="4">No Records </td></tr>';
        } else {

            for (var i = 0; i < list.length; i++) {

                html += '<tr>';
                var element = list[i];

                var link = getEqLink(element.Code, portlet.tick, element.Name)

                html += htmlU.createTd((link));
                html += htmlU.createTd((element.close));
                // html+= htmlU.createTd(  (   jsu.formatColor( element.close - element.prevClose      )  ) );
                html += htmlU.createTd(htmlU.doBold(jsu.formatPC(element.close, element.prevClose)));
                html += htmlU.createTd(htmlU.doBold(jsu.formatPC(element.vol, element.prevVol)));
                html += '</tr>';

            }
        }

        html += '</tbody></table>';

        html += getMoreLink(portlet, remoteObject);

        html += '</div>';

        htmlU.addMsgToDiv(portlet.CODE + 'Body', true, html);

    }


    function getTrending(data, entry, portlet, remoteObject) {
        var html = ''

        if (remoteObject.showTicks) {  // For Home ...
            html += getTickCfg(remoteObject, portlet)
        }

        html += '<div class="table-responsive">'

        html += '<table class="table table-striped  table-hover">';

        html += '<thead><tr><th>Name</th>  <th>Close</th>   <th>Trending Period</th></tr></thead>'


        html += '<tbody>';
        var list = data.list;
        if (list.length == 0) {
            html += '<tr><td colspan ="4">No Records </td></tr>';
        } else {

            for (var i = 0; i < list.length; i++) {

                html += '<tr>';
                var element = list[i];

                var link = getEqLink(element.Code, portlet.tick, element.Name)

                html += htmlU.createTd((link));
                html += htmlU.createTd((element.close));
                html += htmlU.createTd((element.trendingPeriod));
                html += '</tr>';

            }
        }

        html += '</tbody></table>';

        html += getMoreLink(portlet, remoteObject);

        html += '</div>';

        htmlU.addMsgToDiv(portlet.CODE + 'Body', true, html);

    }


    function getOhlc(data, entry, portlet, remoteObject) {
        var html = ''

        if (remoteObject.showTicks) {  // For Home ...
            html += getTickCfg(remoteObject, portlet)
        }

        html += '<div class="table-responsive">'

        html += '<table class="table table-striped  table-hover">';

        html += '<thead><tr><th>Name</th>  <th>Close</th>   <th>Open</th> <th>High</th> <th>Low</th> </tr></thead>'


        html += '<tbody>';
        var list = data.list;
        if (list.length == 0) {
            html += '<tr><td colspan ="4">No Records </td></tr>';
        } else {

            for (var i = 0; i < list.length; i++) {

                html += '<tr>';
                var element = list[i];

                var link = getEqLink(element.Code, portlet.tick, element.Name)

                html += htmlU.createTd((link));
                html += htmlU.createTd((element.close));
                html += htmlU.createTd((element.open));
                html += htmlU.createTd((element.high));
                html += htmlU.createTd((element.low));

                html += '</tr>';

            }
        }

        html += '</tbody></table>';

        html += getMoreLink(portlet, remoteObject);

        html += '</div>';

        htmlU.addMsgToDiv(portlet.CODE + 'Body', true, html);

    }




    function getMoreLink(portlet, remoteObject) {
        // var config  = mtgv.portlet.BuzStk.config;

        var moreUrl = null;
        if (jsu.isMyContext()) {

            var reportName = jsu.isNull(portlet.alias) ? portlet.reportName : portlet.alias;
            var moreParams = {
                freq: portlet.tick, classi: remoteObject.pd.classi, stkBsktCat: remoteObject.pd.stkBsktCat, item: reportName, "showIdx": false,
                scrType: "CommonScreener", "cat": "PriceVolume", "subCat": "GainerLosers"
            };

            if (reportName == 'bullishGapUp' || reportName == 'bearishGapDown') {


                moreParams.cat = 'OHLCScreeners';
                moreParams.subCat = (reportName == 'bullishGapUp') ? 'Bullish' : 'Bearish';
            } else if (reportName == 'trendingUp3Days' || reportName == 'trendingUpHigh3Days' || reportName == 'openEqLow') {

                moreParams.cat = 'OHLCScreeners';
                moreParams.subCat = 'Bullish';
            } else if (reportName == 'trendingDown3Days' || reportName == 'trendingDownLow3Days' || reportName == 'openEqHigh') {
                moreParams.cat = 'OHLCScreeners';
                moreParams.subCat = 'Bearish';
            } else if (reportName == 'trendingUpVol3Days' || reportName == 'trendingDownVol3Days') {
                moreParams.cat = 'OHLCScreeners';
                moreParams.subCat = 'VolumeTrend';
            } else if (reportName == 'volJump' || reportName == 'volHighIntra') {
                // moreParams.cat = 'OHLCScreeners' ;
                moreParams.subCat = 'VolumeBased';
            }

            moreUrl = jsu.getMyTsrUrl() + '/MyTsr/#/PreScreened/PreScreenedReport/' + JSON.stringify(moreParams);

            if (portlet.CODE_CAT == 'CustomScreener') {  // Custom Screener - Strategy Eye View ....
                moreUrl = jsu.getMyTsrUrl() + '/MyTsr/#/' + portlet.url;
            }

        } else {


            if (portlet.CODE_CAT == 'CustomScreener') {  // Custom Screener - Strategy Eye View ....
                // TODO
                moreUrl = jsu.getRootUrl() + '/CustomStockScreener.tsr?custScrId=' + portlet.id;
            } else {
                moreUrl = getPubMoreLink(portlet, remoteObject);
                /*		    			moreUrl = jsu.getRootUrl()+'/Screener'+ portlet.pid;
                                        var ptick = portlet.tick;
                                        var freqObj = jsu.getObjFrmArr(FREQ_SCR_MAP, ptick);
                                        if(jsu.isNotNull(freqObj)){
                                            moreUrl = moreUrl + '/'+ freqObj.sf;
                                        }
                */
            }
        }



        var html = "<div align= 'right'   ><br/> <a href='" + moreUrl + "' class='btn btn-primary btn-sm' >more..</a></div>";

        return html;

    }


    function getPubMoreLink(portlet, remoteObject) {

        var moreUrl = jsu.getRootUrl() + '/Screener' + portlet.pid;
        var ptick = portlet.tick;

        if (jsu.isNull(ptick)) {
            ptick = FREQ_DAILY;
        }

        var freqObj = jsu.getObjFrmArr(FREQ_SCR_MAP, ptick);
        if (jsu.isNotNull(freqObj)) {
            moreUrl = moreUrl + '/' + freqObj.sf;
        }

        // classi :  remoteObject.pd.classi , stkBsktCat : remoteObject.pd.stkBsktCat;
        if (jsu.isNotNull(remoteObject.pd.classi)) {
            moreUrl += "?sbOverride=true&klassi=" + remoteObject.pd.classi;

            if (jsu.isNotNull(remoteObject.pd.stkBsktCat)) {
                moreUrl += '&stkBsktCat=' + remoteObject.pd.stkBsktCat;
            }
        }

        return moreUrl;

    }



    function getEqLink(code, freq, name) {
        var funcParam = 'eqDet' + PARAM_DELIM + code + PARAM_DELIM + freq;
        var tooltip = 'Click to View key Highlights of ' + name;

        var link = htmlU.getFncLink((code), 'portp.ua', funcParam, tooltip, 'color:' + LINK_COLOR);     // label, func, param, toolTip

        return link;
    }


    function getTickCfg(remoteObject, portlet) {
        var cfgHtml = '<div class="miCtrl">' + BREAK_LINE;

        var code = portlet.CODE;

        var param = code + PARAM_DELIM + portlet.freq;
        cfgHtml += htmlU.getDropDown(mtgv.mtpp.FREQ_SCR_MAP, code + 'DD', null, 'myth.fc', param, portlet.freq)  //arr, id, style, func,funcParam, selectedId
        cfgHtml += '</div>';

        return cfgHtml;

    }

    function userAction(type, code, freq) {

        if (type == 'eqDet') {

            var json = { actionType: 'masEqView', code: code, freq: freq };
            var remoteObject = new RC(BIRDS_EYE_VIEW, null, json, 'MasEqLdDiv', 'MasEqFbDiv', 'portp', 'uar', 'eqDet');
            remoteObject.code = code;
            // remoteObject.code = code;
            // remoteObject.freq = freq;
            jsu.rc(remoteObject);

        }

    }

    function userActionResponse(response, identifier, remoteObject) {

        if (identifier == 'eqDet') {
            eqo.ped(response, identifier, remoteObject, 'EqDetContentDiv');
        }

    }



    return {

        pp: printPortlet,

        pgp: printGenericPortlet,

        // init : init,
        //      homeInit : homeInit,
        //      lp : loadPortlets,
        //      sp : showPortlet,
        //      sbc : stockBasketChg,
        //      applyDef : applyDef,

        //      // setClassi : setClassi

        //      // loadDefConfig : loadDefConfig, 
        //      // fc : frequencyChange,
        //      // shp : showHomePortlet,

        ua: userAction,
        //      savePref : savePref,

        uar: userActionResponse


    }

})(); // module 












var eqo = function () {
    var k = mintHtmlUtil, r = mintJsUtil, p = mintStkCommon; return {
        ped: function (m, l, f, n) {
            l = "" + BREAK_LINE; l += '<div align="right"><a  onClick="window.scrollTo(0, 0);">' + k.getPlainGlaf("fas fa-angle-double-up", "black", 24) + "  Top</a>  </div>"; r.isMyContext() ? (f = r.getMyTsrUrl() + "/MyTsr/#/Equity/EquityDetails/in/" + m.sectorId + "/" + m.equityId, f = '<a  href="' + f + '">Click to View ' + m.Name + " Page</a>") : f = p.gsl(m.Code, "Click to View " + m.Name, f.type); l = l + ("<div ><h4> " + f + " </h4></div>") + ("<div class='row'>" +
                BOOT_1COL); l = l + '<div class="card shadow-lg"><div class="card-header">' + ("<h3>Key Highlights of " + m.Name + "</h3>"); l += '</div><div class="card-body">    \t<div class="table-responsive" style="max-height: 250px;overflow-y: scroll;" >  <table class="table table-striped  table-hover">'; if (r.isNotNull(m.priceVol)) for (f = 0; f < m.priceVol.length; f++)l += "<tr>" + k.createTd(m.priceVol[f].label) + "</tr>"; if (r.isNotNull(m.Candle)) for (f = 0; f < m.Candle.length; f++)l += "<tr>" + k.createTd(m.Candle[f].label) + "</tr>"; if (r.isNotNull(m.indiPatterns)) for (f =
                    0; f < m.indiPatterns.length; f++)l += "<tr>" + k.createTd(m.indiPatterns[f].label) + "</tr>"; if (r.isNotNull(m.chartPatterns)) for (f = 0; f < m.chartPatterns.length; f++)l += "<tr>" + k.createTd(m.chartPatterns[f].label) + "</tr>"; l = l + "</table></div></div></div></div></div>" + BR_2; l += CHART_DIVS; m = { name: m.Name, code: m.code, scId: m.sectorId, ecId: m.equityId }; $("#chartWrap").height("500px"); myTsrChartInit.init(m, null, "inline"); k.addMsgToDiv(n, !0, l); k.focusToDiv(n)
        }
    }
}();
