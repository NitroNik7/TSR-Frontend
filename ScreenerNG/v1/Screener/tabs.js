


// -- Daily Tech
// var PRICE_VOL 		= 	'pvCs';


var daily_tabs = [

	{ id: PRICE_CS, label: 'PriceAction', tab: 'priceCtrlTab', map: PRICE_AEBB_MAP, ANALYSIS_CAT: ANALYSIS_CAT_COMMON, mig: true, subMenu: null }, // Price  Custom Screener Div
	{ id: VOL_CS, label: 'Volume', tab: 'volCtrlTab', map: VOL_AEBB_MAP, ANALYSIS_CAT: ANALYSIS_CAT_COMMON, mig: true, subMenu: null }, //  Volume Custom Screener Div
	{ id: HL_CS, label: 'High/Low', tab: 'hlCtrlTab', map: null, ANALYSIS_CAT: ANALYSIS_CAT_COMMON, mig: true, subMenu: HIGH_LOWS_DEF }, //  Volume Custom Screener Div
	{ id: BV_CS, label: 'Beta/Vols', tab: 'bvCtrlTab', map: null, ANALYSIS_CAT: ANALYSIS_CAT_COMMON, subMenu: BETA_VOLS_DEF }, //  Volume Custom Screener Div

	{ id: PP_CS, label: 'Pivot/Fib', tab: 'ppCtrlTab', map: null, ANALYSIS_CAT: ANALYSIS_CAT_TECH, mig: true, subMenu: PIVOT_DEF },

	{ id: STR_CS, label: 'Strength', tab: 'strCtrlTab', map: null, ANALYSIS_CAT: ANALYSIS_CAT_COMMON, mig: true, subMenu: STRENGTH_DEF }, //Tech Strength.....

	{ id: MA_CS, label: 'Mov Avg', map: null, ANALYSIS_CAT: ANALYSIS_CAT_TECH, mig: true, subMenu: MA_DEF },
	{ id: TI_CS, label: 'TechIndi', map: null, ANALYSIS_CAT: ANALYSIS_CAT_TECH, mig: true, subMenu: TECH_INDI_DEF },
	{ id: DIV_CS, label: 'Divergence', map: null, ANALYSIS_CAT: ANALYSIS_CAT_TECH, mig: true, subMenu: DIVERGENCE_DEF },

	{ id: CP_CS, label: 'Chart Patterns', map: null, ANALYSIS_CAT: ANALYSIS_CAT_TECH, mig: true, subMenu: CHART_PATTERN_DEF },

	// <i class="fas fa-crown"></i>
	{ id: FIN_RAT_NG, label: 'Fin Ratio ', tab: 'finRatNgTab', map: null, ANALYSIS_CAT: ANALYSIS_CAT_FUNDA, mig: true, subMenu: FIN_RATIO_DEF },

	{ id: FIN_STMT_NG, label: 'Fin Stmt', tab: 'finStmtNgTab', map: null, ANALYSIS_CAT: ANALYSIS_CAT_FUNDA, mig: true, subMenu: FIN_STMT_DEF },

	// {id: FIN_HLR, label :'Fin Ratios (Old)', tab : 'hlrCtrlTab', map : null  , ANALYSIS_CAT : ANALYSIS_CAT_FUNDA },
	// {id: FIN_YR, label :'Fin Stmt (Old)', tab : 'finYCtrlTab', map : null , ANALYSIS_CAT : ANALYSIS_CAT_FUNDA},

	// {id: FIN_BASIC, label:'FinBasic', map:FIN_BASIC_AEBB_FIELDS} ,
	// {id: FIN_RATIO, label:'FinRatios', map : FIN_RATIO_AEBB_FIELDS} ,


	// {id: FIN_BAL_SHEET, label:'Bal Sheet', map:BAL_SHEET_AEBB_FIELDS} ,
	// {id: FIN_CASH_FLOW, label:'CashFlow', map:CASHFLOW_AEBB_FIELDS} ,

	// {id: FIN_INCOME, label:'Income', map: INCOME_AEBB_FIELDS} ,
	// {id: FIN_QTRLY, label:'Qtr Inc', map: QTRLY_AEBB_FIELDS} ,

	// {id: FIN_QTRLY, label:'Quarterly', map : QTRLY_AEBB_FIELDS} ,
];



function getCsTabs() {

	var list = [];

	for (var i = 0; i < daily_tabs.length; i++) {

		var tab = daily_tabs[i];


		if (mintJsUtil.arrayContains(mtgv.mtpp.analCat, tab.ANALYSIS_CAT)) {

			if (mintJsUtil.isMigContext() && !tab.mig) {
				continue;
			}

			list.push(tab);
		}


	}


	return list;




}

function showCSTab(id) {

	for (var i = 0; i < daily_tabs.length; i++) {
		var tab = daily_tabs[i];

		if (tab.id == id) {
			$('#' + tab.id).addClass('active');
		} else {
			$('#' + tab.id).removeClass('active');
		}
	}
}

