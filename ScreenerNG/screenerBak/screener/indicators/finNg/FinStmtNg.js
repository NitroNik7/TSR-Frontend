// FinStmtNg.js

var csStmtNg = (function () {


	var thisObject = 'csStmtNg';
	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;

	var CHG_FNC = thisObject + '.ua';


	var BS_LIST_CODE = 'balSheet';
	var CF_LIST_CODE = 'cashFlow';
	var ISY_LIST_CODE = 'isYr';
	var ISQ_LIST_CODE = 'isQtr';

	var STRAT_VALUE_BASED = 'vb';
	var STRAT_COMP_GROWTH = 'cg';
	var STRAT_COMP_HIST_GROWTH = 'chg';
	var STRAT_CAGR = 'cagr';
	var STRAT_VS_AVG = 'va';
	var STRAT_TREND = 'trend';
	var STRAT_VS_HIST = 'vh';
	var STRAT_VS_TREND_CHG = 'tc';



	function initDefs(list) {

		var newList = [];

		for (var i = 0; i < list.length; i++) {
			var elem = list[i];
			if (elem.ngDiy) {
				newList.push(elem);
			}
		}

		return newList;
	}

	var NG_STMT_LIST = [

		{ id: BS_LIST_CODE, label: 'Balance Sheet Fields', list: initDefs(BAL_SHEET_ALL) },
		{ id: CF_LIST_CODE, label: 'Cash Flow Fields', list: initDefs(CASH_FLOW_ALL) },
		{ id: ISY_LIST_CODE, label: 'Income Stmt (FY)', list: initDefs(INC_STMT_ALL) },
		{ id: ISQ_LIST_CODE, label: 'Income Stmt (Qtr)', list: initDefs(INC_STMT_ALL) },
	];


	var STMT_STRAT = []
	var STMT_STRAT_BASIC = [
		{ 'id': STRAT_VALUE_BASED, 'label': 'Compare Value' },
		{ 'id': STRAT_COMP_GROWTH, 'label': 'Compare Growth (%)' },
		{ 'id': STRAT_COMP_HIST_GROWTH, 'label': 'Compare Hist Growth' },
		{ 'id': STRAT_CAGR, 'label': 'CAGR' },

	];

	var STMT_STRAT_ADV = [
		{ 'id': STRAT_TREND, 'label': 'Trending' },
		{ 'id': STRAT_VS_TREND_CHG, 'label': 'Trend Change' },
		{ 'id': STRAT_VS_AVG, 'label': 'Vs. Average' },
		{ 'id': STRAT_VS_HIST, 'label': 'Vs. History' },
	];

	var STMT_STRAT = null;







	function init() {

		if (mtgv.mtpp.allPro || mtgv.mtpp.funda) {
			STMT_STRAT = STMT_STRAT_BASIC.concat(STMT_STRAT_ADV);
		} else {
			STMT_STRAT = STMT_STRAT_BASIC;
		}
	}

	// modified
	function getHtml(id) {

		var html = "";

		if (isNg) {
			html += '<br/>'
			html += '<div id="' + id + 'Div">';
			html += '	<table id="finStmtCtrlTab" ' + TAB_INDI_STYLE + '  "  >';
			html += '	</table>';
			html += '</div>';
			html += '<br/>';
			html += '<br/>';

		} else {
			var scrData = mtgv.cs.screenerData;


			html = '<br/><div id="' + id + 'Div">';

			if (!jsu.isMigContext()) {
				html += htmlU.getSpan("This is upgraded Version of <b>Financial Statements</b>. "
					+ "We recommend you to use this tab instead. ", 'green', 10);

			}



			html += '<table id="finStmtCtrlTab" ' + TAB_INDI_STYLE + '  "  >';

			for (var i = 0; i < scrData.finStmtNgComp.length; i++) {
				// html+=getStmtHtml(scrData.finStmtNgComp[i]);
				var finObj = scrData.finStmtNgComp[i];

				html += '<tr id=' + finObj.id + '>' + createTd(createDiv(finObj.id + 'Td2Div', getHtmlTds(finObj))) + '</tr>';
			}

			html += '</table>';

			var quickPointer = " You can add same Fields multiple time for different Strategies by Clicking <b>add</b> button next to Fields again";

			html += SP_3 + getSpan(quickPointer, '#465b66', 10);

			html += '<div class="row gy-2">'

			for (var i = 0; i < NG_STMT_LIST.length; i++) {
				var ngRatio = NG_STMT_LIST[i];
				html += csFinCmnNg.csp(ngRatio.id, BOOT_6_12COL, ngRatio.label, ngRatio.list, null, ngRatio.id, thisObject);
			}

			html += '</div>';  // ROW ....

			html += '<div ' + CS_HELP_DIV_STYLE + '>';

			var helpText = 'All values are consolidated. '  // TO ADD   .....

			if (jsu.isMigContext()) {
				helpText += BR_2 + " <b>Values in Millions(M)</b>  Where ever applicable"
			} else {
				helpText += BR_2 + " <b>Values in Crores (CR)</b>  Where ever applicable"
			}



			if (!isMobile()) {

				html += getSpan(helpText, 'grey', 10);
			}

			html += '</div>';

			html += '<br/>';
			html += '<br/>';
		}



		return html;
	}


	function addElem(type, baseField) {

		if (jsu.isNull(STMT_STRAT) || STMT_STRAT.length) {
			init();
		}

		var elem = getElem(type, baseField);

		var finStmtNgComp = mtgv.cs.screenerData.finStmtNgComp;

		var id = myTsrScreener.getNextId('finStmtNgCompId');

		var finObj = null;

		// var freq = getFreqArr(elem); freq : freq[0].id,

		var finObj = { id: id, strat: STMT_STRAT[0].id, type: type, baseField: baseField };

		finStmtNgComp.push(finObj);

		var td = getHtmlTds(finObj);

		var html = '<tr id=' + finObj.id + '>' + createTd(createDiv(finObj.id + 'Td2Div', td)) + '</tr>';
		$('#finStmtCtrlTab').append(html);

		userAction(id);
		csu.dsf();

		var element = document.querySelector('#csControlsDiv');
		element.scrollTop = 0;

	}


	function getHtmlTds(finObj) {


		var func = CHG_FNC;

		var id = finObj.id;
		var elem = getElem(finObj.type, finObj.baseField);

		var html = doBold(elem.label + " : ");

		var params = id + PARAM_DELIM + finObj.strat;  // type + PARAM_DELIM + cat + PARAM_DELIM  +id;

		var stratsList = getStratsList(finObj)

		html += SP_2 + getDropDown(stratsList, id + 'strat', null, func, params, finObj.strat);


		if (finObj.strat == STRAT_VALUE_BASED) {
			//      AEB --      baseField(PE)  freq(TTM)   Between v1 and v2
			html += getValBasedTd(finObj, func, params);

		} else if (finObj.strat == STRAT_COMP_GROWTH) {   // new
			html += getCompGwthTd(finObj, func, params);

		} else if (finObj.strat == STRAT_COMP_HIST_GROWTH) {   // new
			html += getCompHistGwthTd(finObj, func, params);

		} else if (finObj.strat == STRAT_CAGR) {
			//      CAGR     --  baseField(PE)  freq(FY)  v1 (5) yrs CAGR  >  v2 %
			html += getCagrTd(finObj, func, params);

		} else if (finObj.strat == STRAT_VS_AVG) {
			//      Vs Avg -      baseField(PE)  freq(FY)   AEB   v1 (2) yrs Avg by v2 (%)
			html += getVsAvgTd(finObj, func, params);

		} else if (finObj.strat == STRAT_VS_HIST) {
			// Vs Hist     baseField(PE)  freq(FY)  Period1 (latest) AEB  period 2( prev year) by v1 %  
			html += getVsHistTd(finObj, func, params);

		} else if (finObj.strat == STRAT_TREND) {
			//      Trending    baseField(PE)  freq(FY)  Trending up for last 5 Years ...
			html += getTrendingTd(finObj, func, params);

		} else if (finObj.strat == STRAT_VS_TREND_CHG) {	 // New 
			html += getTrendChange(finObj, func, params)

		} else if (finObj.strat == 'dc') {
			//      Deep Compare ...      baseField(PE)  freq(FY)  Period1 (latest) AEB  compField  period2 ( prev year) by v1 %   
		}

		var param = 'finStmtNgComp:' + id; // Vol Compare
		html += SP_3 + csh.delIcon(param); // '<a  onClick="javascript:'+thisAlias+'.delRow(\''+delObj+'\');"><font size="4" color="red"><span class="glyphicon glyphicon-remove"></span></font> </a> ';

		return html;
	}


	function getValBasedTd(finObj, func, params) {

		var id = finObj.id;
		var html = '';

		var ratDef = jsu.getObjFrmArr(NG_STMT_LIST, finObj.type); // Guru No hist not avail....

		html += SP_3 + getDropDown(getTickList(finObj), id + 'period1', null, func, params, finObj.period1);

		html += SP_3 + getDropDown(OPS_AEB, id + 'ops', null, func, params, finObj.ops);

		html += SP_3 + getInputTxtParam(id + 'v1', 8, finObj.v1, func, params);

		if (finObj.ops == CS_BETWEEN) {
			html += SP_3 + " and ";
			html += SP_3 + getInputTxtParam(id + 'v2', 8, finObj.v2, func, params);
		}

		html += ' ' + getPriceDenom();

		return html;
	}


	function getCompGwthTd(finObj, func, params) {

		var id = finObj.id;
		var html = '';

		var ratDef = jsu.getObjFrmArr(NG_STMT_LIST, finObj.type); // Guru No hist not avail....

		html += SP_3 + getDropDown(getTickList(finObj), id + 'period1', null, func, params, finObj.period1);

		html += ' Growth %';

		html += SP_3 + getDropDown(OPS_AEB, id + 'ops', null, func, params, finObj.ops);

		html += SP_3 + getInputTxtParam(id + 'v1', 3, finObj.v1, func, params);

		if (finObj.ops == CS_BETWEEN) {
			html += SP_3 + " and ";
			html += SP_3 + getInputTxtParam(id + 'v2', 3, finObj.v2, func, params);
		}

		// html+= ' %';

		return html;

	}

	function getCompHistGwthTd(finObj, func, params) {

		var id = finObj.id;

		var tickPeriod = getTickList(finObj);

		var html = '';

		html += SP_3 + getDropDown(tickPeriod, id + 'period1', null, func, params, finObj.period1);

		html += ' Growth % ';

		html += SP_3 + getDropDown(AB_OPS, id + 'ops', null, func, params, finObj.ops);

		if (jsu.isNull(finObj.period2)) {
			finObj.period2 = tickPeriod[1].id;
		}

		html += SP_3 + getDropDown(tickPeriod, id + 'period2', null, func, params, finObj.period2);
		html += ' Growth % ';

		html += ' by min ' + getInputTxtParam(id + 'v1', 3, finObj.v1, func, params) + ' %';

		html += htmlU.getSpan('(<b>Optional</b> Range 1 to 1000)', 'grey', 8);

		return html;

	}

	function getCagrTd(finObj, func, params) {

		var html = ''
		var id = finObj.id;

		html += SP_2 + getInputTxtParam(id + 'v3', 3, finObj.v3, func, params);

		html += ' Years CAGR ';

		html += SP_3 + getDropDown(OPS_AEB, id + 'ops', null, func, params, finObj.ops);

		html += SP_3 + getInputTxtParam(id + 'v1', 3, finObj.v1, func, params);

		if (finObj.ops == CS_BETWEEN) {
			html += SP_3 + " and ";
			html += SP_3 + getInputTxtParam(id + 'v2', 3, finObj.v2, func, params);
		}

		html += ' % ';

		return html;
	}

	function getVsAvgTd(finObj, func, params) {

		var html = ''

		var id = finObj.id;

		html += SP_3 + getDropDown(AB_OPS, id + 'ops', null, func, params, finObj.ops);

		html += SP_3 + getInputTxtParam(id + 'v1', 3, finObj.v1, func, params);


		html += getTickLable(finObj);

		html += '  Average by';

		html += SP_3 + getInputTxtParam(id + 'v2', 3, finObj.v2, func, params);

		html += ' % ' + htmlU.getSpan('(<b>Optional</b> Range -200 to 1000)', 'grey', 8);

		return html;
	}




	function getVsHistTd(finObj, func, params) {
		var id = finObj.id;

		var tickPeriod = getTickList(finObj);

		var html = '';

		html += SP_3 + getDropDown(tickPeriod, id + 'period1', null, func, params, finObj.period1);

		html += SP_3 + getDropDown(AB_OPS, id + 'ops', null, func, params, finObj.ops);

		if (jsu.isNull(finObj.period2)) {
			finObj.period2 = tickPeriod[1].id;
		}

		html += SP_3 + getDropDown(tickPeriod, id + 'period2', null, func, params, finObj.period2);

		html += ' by ' + getInputTxtParam(id + 'v1', 3, finObj.v1, func, params);

		html += ' % ' + htmlU.getSpan('(<b>Optional</b> Range 1 to 1000)', 'grey', 8);

		return html;
	}


	function getTrendingTd(finObj, func, params) {
		var id = finObj.id;
		var html = '';
		html += SP_3 + getDropDown(TRENDING_OPS, id + 'ops', null, func, params, finObj.ops);

		html += ' for min ' + getInputTxtParam(id + 'v1', 3, finObj.v1, func, params);

		html += getTickLable(finObj) + 's';

		return html;
	}

	function getTrendChange(finObj, func, params) {

		var id = finObj.id;
		var html = '';
		html += SP_3 + getDropDown(TREND_CHANGE, id + 'ops', null, func, params, finObj.ops);

		return html;
	}

	//  User Action ................


	function userAction(id) {

		var finObj = getObjFrmArr(mtgv.cs.screenerData.finStmtNgComp, id);

		csu.setProp(mtgv.cs.screenerData.finStmtNgComp, ['strat', 'ops', 'aeb', 'v1', 'v2', 'v3', 'v4', 'period1', 'period2',
			, 'compField', 'freq'], finObj.id);

		var td = getHtmlTds(finObj);

		htmlU.addMsgToDiv(finObj.id + 'Td2Div', true, td);

		validateUsrInput(finObj)

		csu.setProp(mtgv.cs.screenerData.finStmtNgComp, ['strat', 'ops', 'aeb', 'v1', 'v2', 'v3', 'v4', 'period1', 'period2',
			'compField', 'freq'], finObj.id);

		csu.dsf();

	}


	function validateUsrInput(finObj) {

		var id = finObj.id;

		if (finObj.strat == STRAT_VALUE_BASED) {

			if (isInputNumber(id + 'v1')) { }
			if (finObj.ops == CS_BETWEEN && !isInputNumber(id + 'v2')) { }

		} else if (finObj.strat == STRAT_COMP_GROWTH) {

			if (isInputNumber(id + 'v1')) { }
			if (finObj.ops == CS_BETWEEN && !isInputNumber(id + 'v2')) { }

		} else if (finObj.strat == STRAT_COMP_HIST_GROWTH) {   // new
			if (isInputNumber(id + 'v1')) { }

		} else if (finObj.strat == STRAT_CAGR) {

			jsu.isIntegerInput(id + 'v3')
			jsu.inputNumberRange(id + 'v3', 2, 10);

			if (isInputNumber(id + 'v1')) { }
			if (finObj.ops == CS_BETWEEN && !isInputNumber(id + 'v2')) { }

		} else if (finObj.strat == STRAT_VS_AVG) {

			jsu.isIntegerInput(id + 'v1')
			jsu.inputNumberRange(id + 'v1', 2, 10);

			if (jsu.isNotNull(finObj.v2) && isInputPositiveNumber(id + 'v2')) { }

		} else if (finObj.strat == STRAT_VS_HIST) {
			if (jsu.isNotNull(finObj.v1)) {
				isInputPositiveNumber(id + 'v1');
			}
		} else if (finObj.strat == STRAT_TREND) {
			jsu.isIntegerInput(id + 'v1')
			jsu.inputNumberRange(id + 'v1', 2, 10);
		} else if (finObj.strat == STRAT_VS_TREND_CHG) {	 // New 
			// html += getTrendChange(finObj, func , params)
		}
	}

	function validate(validResults) {

		var scrData = mtgv.cs.screenerData;
		for (var i = 0; i < scrData.finStmtNgComp.length; i++) {

			var finObj = scrData.finStmtNgComp[i];

			var selParam = 'finStmtNgComp:' + finObj.id; // Vol Compare

			var text = '';  // ALL goo
			finObj.goodData = true;

			finObj.csType = FIN_STMT_NG;

			var finDef = getElem(finObj.type, finObj.baseField)

			var tickPeriod = getTickList(finObj);

			if (finObj.strat == STRAT_VALUE_BASED) {

				var period1Def = jsu.getObjFrmArr(tickPeriod, finObj.period1);


				text += period1Def.label + ' ' + handleAeb(finObj, finDef, opsDef) + ' ' + getPriceDenom();

			} else if (finObj.strat == STRAT_COMP_GROWTH) {

				var period1Def = jsu.getObjFrmArr(tickPeriod, finObj.period1);
				var opsDef = jsu.getObjFrmArr(OPS_AEB, finObj.ops);

				text += period1Def.label + ' Growth of '
				text += handleAeb(finObj, finDef, opsDef);
				text += ' %';

			} else if (finObj.strat == STRAT_COMP_HIST_GROWTH) {   // new

				var period1Def = jsu.getObjFrmArr(tickPeriod, finObj.period1);
				var period2Def = jsu.getObjFrmArr(tickPeriod, finObj.period2);

				var opsDef = jsu.getObjFrmArr(OPS_AEB, finObj.ops);

				text += period1Def.label + ' "' + finDef.label + '" Growth % is '
				text += opsDef.label;
				text += ' ' + period2Def.label
				text += ' Growth % '

				if (jsu.isNotNull(finObj.v1)) {
					text += ' by min ' + finObj.v1 + ' %';
				}

			} else if (finObj.strat == STRAT_CAGR) {

				text = finObj.v3 + ' years CAGR of ';

				text += handleAeb(finObj, finDef, opsDef);
				text += ' %'


			} else if (finObj.strat == STRAT_VS_AVG) {

				var opsDef = jsu.getObjFrmArr(OPS_AEB, finObj.ops);

				if (!jsu.isNumber(finObj.v1) || finObj.v1 < 2 || finObj.v1 > 11) {
					finObj.goodData = false;
				}
				text = '"' + finDef.label + '" '

				text += ' ' + opsDef.label + ' ' + finObj.v1 + ' ' + getTickLable(finObj) + 's' + ' avg ';

				if (jsu.isNotNull(finObj.v2)) {
					text += ' by min ' + finObj.v2 + ' %';

					if (!jsu.isNumber(finObj.v2) || finObj.v2 < 2 && finObj.v2 > 11) {
						finObj.goodData = false;
					}
				}

			} else if (finObj.strat == STRAT_VS_HIST) {

				text = finDef.label + ' '

				var period1Def = jsu.getObjFrmArr(tickPeriod, finObj.period1);
				var period2Def = jsu.getObjFrmArr(tickPeriod, finObj.period2);

				var opsDef = jsu.getObjFrmArr(OPS_AEB, finObj.ops);

				text += period1Def.label + ' ' + opsDef.label + ' ' + period2Def.label;

				if (jsu.isNotNull(finObj.v1)) {
					text += ' by min ' + finObj.v1 + ' %';

					if (!jsu.isNumber(finObj.v1) || finObj.v1 < 1 && finObj.v1 > 11) {
						finObj.goodData = false;
					}
				}

			} else if (finObj.strat == STRAT_TREND) {
				var opsDef = jsu.getObjFrmArr(TRENDING_OPS, finObj.ops);

				if (!jsu.isNumber(finObj.v1)) {
					finObj.goodData = false;
				}
				text = finDef.label + ' ' + opsDef.label + ' for min ' + finObj.v1
					+ ' ' + getTickLable(finObj) + 's';

			} else if (finObj.strat == STRAT_VS_TREND_CHG) {	 // New 

				var opsDef = jsu.getObjFrmArr(TREND_CHANGE, finObj.ops);
				text += finDef.label + ' has moved from ' + opsDef.label;

			}




			if (finObj.goodData) {
				csh.cdt(finObj, text, validResults, selParam, true);
			} else {

				var badmsg = finDef.label + ' settings is incorrect ';
				csh.cdt(finObj, badmsg, validResults, selParam, false);
			}

		}

	}


	function handleAeb(finObj, finDef, opsDef) {

		var opsDef = jsu.getObjFrmArr(OPS_AEB, finObj.ops);

		if (!jsu.isNumber(finObj.v1)) {
			finObj.goodData = false;
		}

		var text = ''
		if (finObj.ops != CS_BETWEEN) {
			return '"' + finDef.label + '" is ' + opsDef.label + ' ' + finObj.v1;
		}

		if (!jsu.isNumber(finObj.v2)) {
			finObj.goodData = false;
		} else {
			finObj.goodData = true;
			text = '"' + finDef.label + '" is ' + opsDef.label + ' ' + finObj.v1 + ' and ' + finObj.v2;
		}

		return text;
	}



	function getStratsList(finObj) {

		if (jsu.isNull(STMT_STRAT)) {
			init();
		}

		if (finObj.type == ISQ_LIST_CODE) {
			var strats = jsu.cloneObj(STMT_STRAT);
			jsu.removeFromArrayWithId(strats, STRAT_CAGR);  // NO CAGR for quarterly ... 
			return strats;

		} else {
			return STMT_STRAT;
		}
	}




	function getTickList(finObj) {

		var periodLabel = (finObj.type == ISQ_LIST_CODE) ? 'Quarter' : 'Year';

		var list = getHistPeriod(10, periodLabel);

		return list;
	}

	function getTickLable(finObj) {
		var periodLabel = (finObj.type == ISQ_LIST_CODE) ? 'Quarter' : 'Year';
		return periodLabel;
	}


	function getElem(type, baseField) {

		var defList = jsu.getObjFrmArr(NG_STMT_LIST, type);

		// if(type === BS_LIST_CODE){
		// 	defList = RATIO_VAL_DEF;
		// }else if(type === CF_LIST_CODE){
		// 	defList = RATIO_PFT_DEF;
		// }else if(type === ISQ_LIST_CODE){
		// 	defList = RATIO_EFF_DEF;
		// }else if(type === SOL_RATIO_LIST_CODE){
		// 	defList = RATIO_SOL_DEF;
		// }else if(type === GURU_LIST_CODE){
		// 	defList = GURU_NUMBERS;
		// }

		var elem = jsu.getObjFrmArr(defList.list, baseField);

		return elem;
	}


	function getCustScrFilter(filer) {



		if (jsu.isNull(STMT_STRAT)) {
			init();
		}

		for (var i = 0; i < NG_STMT_LIST.length; i++) {
			var ngRatio = NG_STMT_LIST[i];

			addFilter(filer, ngRatio)
		}
		return filer;
	}
	function addFilter(filer, ngRatio) {

		var ratioList = ngRatio.list;

		var suffix = (ngRatio.id == ISQ_LIST_CODE) ? '(Qtr) ' : ''

		for (var i = 0; i < ratioList.length; i++) {
			var thisRatio = ratioList[i];

			var secParam = thisRatio.id;

			filer.push({
				id: "finStmtNgComp", label: thisRatio.label + suffix + ", " + thisRatio.sLabel, slabel: thisRatio.sLabel,
				tab: FIN_STMT_NG, type: 'btn',
				filtDef: { obj: thisObject, fnc: 'ae', params: ngRatio.id + PARAM_DELIM + thisRatio.id }
			});
		}

	}

	function getHistPeriod(period, suffix) {
		return csFinCmnNg.ghp(period, suffix)
	}

	function getPriceDenom() {

		if (jsu.isMigContext()) {
			return 'M'
		} else {
			return 'Cr'
		}
	}


	return {

		ght: getHtml,
		ae: addElem,
		ua: userAction,
		val: validate,
		gcsf: getCustScrFilter
	}

})(); // module 	

