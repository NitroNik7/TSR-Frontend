var VOL_PERIOD_DAYS = [
	{ id: "Yest", label: "Business Day Vol" },
	{ id: "3D", label: "3 Days Avg Volume" },
	{ id: "5D", label: "5 Days Avg Volume" },
	{ id: "10D", label: "10 Days Avg Volume" },
	{ id: "14D", label: "14 Days Avg Volume" },

	{ id: "LWK", label: "Weeks Vol" },
	{ id: "3WK", label: "3 Weeks Avg Volume" },
	{ id: "6WK", label: "6 Weeks Avg Volume" },
	{ id: "12WK", label: "12 Weeks Avg Volume" },


	{ id: "1M", label: "1 Month Avg Volume" },
	{ id: "LMTH", label: "Months Vol" },
	{ id: "3MTH", label: "3 Months Avg Volume" },
	{ id: "6MTH", label: "6 Months Avg Volume" },
	{ id: "12MTH", label: "12 Months Avg Volume" },
];

var VOL_PERIOD_WEEKS = [
	{ id: "LWK", label: "Weeks Vol" },
	{ id: "3WK", label: "3 Weeks Avg Volume" },
	{ id: "6WK", label: "6 Weeks Avg Volume" },
	{ id: "12WK", label: "12 Weeks Avg Volume" },


];

var VOL_PERIOD_MONTHS = [
	// {id: "LMTH", 	label: "Previous Months Vol"}, 
	//    {id: "3MTH", 	label: "3 Months Avg Volume"},
	//    {id: "6MTH", 	label: "6 Months Avg Volume"},
	//    {id: "12MTH", label: "12 Months Avg Volume"},
];

var VOL_AEBB_MAP = [
	{ id: 'csVol', label: 'Tick Volume', csType: VOL_CS, postInfo: 'For Ex if you want Volume between 3:15 PM to 3:30 PM > 500K. ' },// Id retained for historical compatibility...
	{ id: 'csDayVol', label: 'Days Volume', csType: VOL_CS },

];


var VOL_AVG_TICK = [   // vat
	{ id: "V3T", label: "Avg Vol 3 Ticks" },
	{ id: "V5T", label: "Avg Vol 5 Ticks" },
	{ id: "V7T", label: "Avg Vol 7 Ticks" },
	{ id: "V10T", label: "Avg Vol 10 Ticks" },
];

var VOL_AVG_DAYS = [ // vad
	{ id: "V3D", label: "Avg Vol 3 Days" },
	{ id: "V5D", label: "Avg Vol 5 Days" },
	{ id: "V7D", label: "Avg Vol 7 Days" },
	{ id: "V10D", label: "Avg Volume 10 Days" },
];


var VOL_TICK_TYPE = [ // vad
	{ id: "latest", label: "Latest" },
	{ id: "p1", label: "Previous" },
];



var csv = (function () {

	var thisObject = 'csv';

	var htmlU = mintHtmlUtil;
	// var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;

	var VOL_LABEL_WIDTH = 220;

	function getVolHtml(id) {

		var html = "";

		if (isNg) {
			html = '<br/>'
			html += '<div id="' + id + 'Div">';
			html += '	<table id="volCtrlTab" ' + TAB_INDI_STYLE + '  width="100%" >';

			// for (var i = 0; i < VOL_AEBB_MAP.length; i++) {
			// 	html += csh.aebbStrut(VOL_AEBB_MAP[i].id, VOL_LABEL_WIDTH);
			// }

			html += '	</table>'; // BS TAB START...		
			html += '</div>'; //pvCsDiv	

		} else {
			var scrData = mtgv.cs.screenerData;

			html = '<br/><div id="' + id + 'Div">';
			html += '<table id="volCtrlTab" ' + TAB_INDI_STYLE + '  width="100%" >';

			for (var i = 0; i < VOL_AEBB_MAP.length; i++) {
				html += csh.aebbStrut(VOL_AEBB_MAP[i].id, VOL_LABEL_WIDTH);
			}

			/*	
					html+= cscmn.tht(scrData.trend.volDaysTrend , 'volDays');	
					html+= cscmn.tht(scrData.trend.volTicksTrend , 'volTicks');	
			*/

			// dynvolComp

			for (var i = 0; i < scrData.dynvolComp.length; i++) {
				// html+= csh.opsCompRow(scrData.dynvolComp[i]) ;
				html += cscmn.gch(scrData.dynvolComp[i], 'vol');
			}

			for (var i = 0; i < scrData.dynSpTimevolComp.length; i++) {
				// html+= csh.opsCompRow(scrData.dynvolComp[i]) ;
				html += cscmn.spch(scrData.dynSpTimevolComp[i], 'vol');
			}


			for (var i = 0; i < scrData.dynvolTrendNg.length; i++) {
				html += cscmn.gth(scrData.dynvolTrendNg[i], 'vol');
			}

			for (var i = 0; i < scrData.tickHistVol.length; i++) {
				// html+= cscmn.ggh(scrData.tickHistVol[i], 'vol') ;
				html += getTickHistVolHtml(scrData.tickHistVol[i]);
			}


			/*
					for(var i=0;i< scrData.vadComp.length;i++){
						html+= csh.opsCompRow(scrData.vadComp[i]) ;
					}
			
					for(var i=0;i< scrData.dynvolComp.length;i++){
						html+= cscmn.gch(scrData.dynvolComp[i] , 'vol');
						// html+= cscmn.getPriceCompHtml(scrData.priceComp[i]) ;
					}
			
					for(var i=0;i< scrData.volComp.length;i++){
						html+= getAvgVolHtml(scrData.volComp[i]) ;
					}	
			
					for(var i=0;i< scrData.tickHistVol.length;i++){
						html+= getTickHistVolHtml(scrData.tickHistVol[i]) ;
					}	
			
			*/
			html += '</table>'; // BS TAB START...		

			html += SP_3 + getButtonP('Compare With Prev Ticks', 'cscmn.ac', 'vol' + PARAM_DELIM + VOL_CS);

			html += SP_3 + getButtonP('Volume Trending', 'cscmn.atn', 'vol' + PARAM_DELIM + VOL_CS);

			html += SP_3 + getButton('Tick Vol Vs. Hist Avg', 'csv.athv');



			html += BREAK_LINE;
			html += BREAK_LINE;

			html += SP_3 + getSpan('<b>Note </b>:  ', '#0a58ca', 12);

			html += getSpan('Volume Ma Crossover & Volume MA Trending is now available using <b>Mov Avg</b> tab', 'grey', 10);


			html += BREAK_LINE;
			html += BREAK_LINE;

			/*
						html+= SP_3 + getSpan('Caution :  ' , 'orange' , 12 );
			
			
					html+= getSpan('Following Options will be removed by 31st Mar. We have more flexible alternate options Available instead. '
						 +BREAK_LINE+SP_3 +" For <b>Avg Vol</b> refer to <b>Mov Tab</b> "
						+BREAK_LINE+SP_3 +" For <b>Jump/Fall</b> refer to <b>Compare With Prev Ticks</b>" , 'grey' , 10  );
			*/
			/*		
			
					html+= BREAK_LINE;html+= BREAK_LINE;
			
					html+= SP_3 +getButtonP('Jump/Fall' , 'cscmn.ag', 'vol'+PARAM_DELIM+VOL_CS);
			
					html+= SP_3 + getButtonP("Tick's Avg Vol" , 'csu.opsCompare','vatComp');
			
					html+= SP_3 + getButtonP("Day's Avg Vol" , 'csu.opsCompare','vadComp');
			
					html+= SP_3 +getButton('Days Vol Vs. Hist Avg' , 'csv.addVol');
			
					
			*/

			html += '</div>'; //pvCsDiv	
		}



		return html;
	}


	function addVol() {

		// myTsrScreener.getNextId(obj.nextId)		

		var id = myTsrScreener.getNextId('volCompId')
		var volObj = { id: id, ops: GT_LT_OPS[0].id, pc: PERCENT_CMP[10].id, period: getVolMap()[0].id, csType: VOL_CS };
		mtgv.cs.screenerData.volComp.push(volObj);

		$('#volCtrlTab').append(getAvgVolHtml(volObj));
		csu.dsf(); // displaySelectedFields();

	}

	function getAvgVolHtml(volObj) {
		var csTypeId = volObj.id;
		var func = 'csv.onVolCompChg';
		var html = getDropDown(GT_LT_OPS, csTypeId + 'ops', null, func, csTypeId, volObj.ops);
		html += '';
		html += getDropDown(PERCENT_CMP, csTypeId + 'pc', null, func, csTypeId, volObj.pc)
		html += SP_3 + ' of Previous' + SP_3;
		html += getDropDown(getVolMap(), csTypeId + 'period', null, func, csTypeId, volObj.period)
		var param = 'volc:' + csTypeId; // Vol Compare
		html += SP_3 + csh.delIcon(param); // '<a  onClick="javascript:'+thisAlias+'.delRow(\''+delObj+'\');"><font size="4" color="red"><span class="glyphicon glyphicon-remove"></span></font> </a> ';


		html += BREAK_LINE;
		html += getSpan('Caution :  ', 'orange', 10);

		html += getSpan('Please use ' + doBold('Tick Volume Vs Hist Vol') + ' Option Button <i class="fas fa-long-arrow-alt-down"></i> Instead. This will be removed by 31st Mar', 'grey', 10);



		return csh.dynTr(volObj, { td1: doBold('Days Vs Hist Avg'), td2: html })

		// return  '<tr id="'+volObj.id+'" >'+ createTd( doBold('Todays Volume'), CS_LABEL_WIDTH ) +  createTd(html) +'</tr>';
	}

	function onVolCompChg(id) {
		csu.setProp(mtgv.cs.screenerData.volComp, ['ops', 'period', 'pc'], id);
		csu.dsf(); // displaySelectedFields();
	}

	//  -------  TICK HIST .......
	function addTickHistVol() {

		// myTsrScreener.getNextId(obj.nextId)		

		var id = myTsrScreener.getNextId('tickHistVolId')
		var tickHistVol = { id: id, ops: GT_LT_OPS[0].id, pc: PERCENT_CMP[10].id, tickType: VOL_TICK_TYPE[0].id, ticks: 3, csType: VOL_CS };
		mtgv.cs.screenerData.tickHistVol.push(tickHistVol);

		$('#volCtrlTab').append(getTickHistVolHtml(tickHistVol));
		csu.dsf(); // displaySelectedFields();

	}

	function getTickHistVolHtml(volObj) {
		var csTypeId = volObj.id;
		var func = 'csv.thvc';

		var html = '';

		if (mtgv.mtpp.crossFreq) {
			html = getDropDown(VOL_TICK_TYPE, csTypeId + 'tickType', null, func, csTypeId, volObj.tickType)
				+ SP_3 + getCrossFreqInput(volObj, func, 'baseTick')
				+ SP_3 + ' Tick Vol '
				+ SP_3 + getDropDown(GT_LT_OPS, csTypeId + 'ops', null, func, csTypeId, volObj.ops)

				+ SP_3 + getDropDown(PERCENT_CMP, csTypeId + 'pc', null, func, csTypeId, volObj.pc)
				+ BREAK_LINE + ' <b>Previous</b> ' + BREAK_LINE
				+ SP_3 + getInputTxtParam(csTypeId + 'ticks', 3, volObj.ticks, func, csTypeId)
				+ SP_3 + ' SMA ' + getSpan(' Supported MA range 2-100', 'grey', 8)
				+ SP_3 + getCrossFreqInput(volObj, func, 'compareTick')
				+ htmlU.getSpan(' Tick Volume', 'grey', 10)

		} else {
			html = getDropDown(VOL_TICK_TYPE, csTypeId + 'tickType', null, func, csTypeId, volObj.tickType)
				+ SP_3 + ' Tick Vol '
				+ SP_3 + getDropDown(GT_LT_OPS, csTypeId + 'ops', null, func, csTypeId, volObj.ops)

				+ SP_3 + getDropDown(PERCENT_CMP, csTypeId + 'pc', null, func, csTypeId, volObj.pc)
				+ BREAK_LINE + ' Previous '
				+ SP_3 + getInputTxtParam(csTypeId + 'ticks', 3, volObj.ticks, func, csTypeId)
				+ SP_3 + ' SMA ' + getSpan(' Supported MA range 2-100', 'grey', 8)
				+ htmlU.getSpan(' Tick Volume', 'grey', 10)
		}



		// var html =    getDropDown(VOL_TICK_TYPE, csTypeId+'tickType', null,func, csTypeId, volObj.tickType)
		// 	+ SP_3 + getCrossFreqInput(volObj, func, 'baseTick') 
		// 	+ SP_3 +' Vol '
		// 	+ SP_3 + getDropDown(GT_LT_OPS, csTypeId+'ops', null,func, csTypeId, volObj.ops)
		// 	+ getDropDown(PERCENT_CMP, csTypeId+'pc', null,func, csTypeId, volObj.pc)
		// 	+ SP_3 +' of '
		// 	+ SP_3 + getInputTxtParam( csTypeId+'ticks' , 3, volObj.ticks, func , csTypeId)
		// 	+ SP_3 + getSpan(' Supported MA range 2-10' , 'grey',8)	
		// 	+ SP_3 + getCrossFreqInput(volObj, func, 'compareTick') 







		// html+=  '' ;
		// html+=getDropDown(PERCENT_CMP, csTypeId+'pc', null,func, csTypeId, volObj.pc)
		// html+=  SP_3 +' of ' +SP_3;
		// html+= getDropDown(getVolMap(), csTypeId+'period', null,func, csTypeId, volObj.period)


		var param = 'tkHistVol:' + csTypeId; // Vol Compare
		html += SP_3 + csh.delIcon(param); // '<a  onClick="javascript:'+thisAlias+'.delRow(\''+delObj+'\');"><font size="4" color="red"><span class="glyphicon glyphicon-remove"></span></font> </a> ';
		return csh.dynTr(volObj, { td1: doBold('Tick Vol Vs Hist Avg'), td2: html })

	}

	function tickHistVolChg(id) {

		var scrData = mtgv.cs.screenerData;

		var obj = getObjFrmArr(scrData.tickHistVol, id);

		csu.setProp(mtgv.cs.screenerData.tickHistVol, ['ops', 'tickType', 'pc', 'ticks', 'baseTick', 'compareTick'], id);

		if (inputNumberRange(id + 'ticks', 1, 100)) {

		}
		csu.setProp(mtgv.cs.screenerData.tickHistVol, ['ops', 'tickType', 'pc', 'ticks', 'baseTick', 'compareTick'], id);

		csu.dsf(); // displaySelectedFields();
	}


	function getVolMap() {

		var volMap = VOL_PERIOD_DAYS;
		if (mtgv.cs.screenerData.scrFreq == FREQ_WK) volMap = VOL_PERIOD_DAYS;
		if (mtgv.cs.screenerData.scrFreq == FREQ_MTH) volMap = VOL_PERIOD_DAYS;
		return volMap;
	}



	function validateFields(params) {

		var scrData = params.scrData;

		for (var i = 0; i < scrData.volComp.length; i++) {
			var obj = scrData.volComp[i];
			var ops = getObjFrmArr(GT_LT_OPS, obj.ops);
			var pc = getObjFrmArr(PERCENT_CMP, obj.pc);
			var volperiod = getObjFrmArr(getVolMap(), obj.period);

			obj.csType = VOL_CS;
			obj.goodData = true;
			var selParam = 'volc:' + obj.id;

			var text = 'Today\'s Volume ' + ops.label + ' than ' + pc.label + ' Of ' + volperiod.label;

			var selParam = 'volc:' + obj.id;

			var json = csh.cdt(obj, text, params, selParam, true);
		}

		for (var i = 0; i < scrData.tickHistVol.length; i++) {
			var obj = scrData.tickHistVol[i];

			var ops = getObjFrmArr(GT_LT_OPS, obj.ops);
			var pc = getObjFrmArr(PERCENT_CMP, obj.pc);
			var tickType = getObjFrmArr(VOL_TICK_TYPE, obj.tickType);
			var ticks = obj.ticks;

			obj.csType = VOL_CS;
			obj.goodData = true;
			var selParam = 'tkHistVol:' + obj.id;


			if (ticks == null || ticks < 2 || ticks > 100) {
				csh.cdt(obj, ' Invalid value Tick Vol', params, selParam, false);
			} else {

				var text = tickType.label + ' ';

				if (obj.baseTick != null) {
					var avilTicks = mtgv.mtpp.FREQ_SCR_MAP;
					var baseTick = getObjFrmArr(avilTicks, obj.baseTick);
					if (baseTick == null) {
						text = " Screener Tick volume ";
					}


				}

				text += ops.label + ' ' + ticks + ' Tick Average Volume ';

				if (obj.compareTick != null) {
					var avilTicks = mtgv.mtpp.FREQ_SCR_MAP;
					var compareTick = getObjFrmArr(avilTicks, obj.compareTick);
					if (compareTick == null) {
						text += " of Screener Tick ";
					} else {
						text += " of Screener Tick ";
					}


				}
				var json = csh.cdt(obj, text, params, selParam, true);
			}


		}


	}


	function getCrossFreqInput(volObj, func, type) {

		if (mtgv.mtpp.crossFreq) { // Cross Freq....
			var ticks = csu.gct(volObj, type);
			return getDropDown(ticks, volObj.id + type, 'width:90px', func, volObj.id, volObj[type])

		}

		return "";
	}



	function getCustScrFilter(filer) {
		// var filer = [];

		// filer.push({  id :  "csVolops" , label : 'Tick Volume'  , sLabel : 'Volume'  , tab : VOL_CS, type : 'dd' }) ;

		filer.push({ id: "csDayVolops", label: 'Days Volume', sLabel: 'Days Volume', tab: VOL_CS, type: 'dd' });


		filer.push({
			id: "dynvolComp", label: 'Volume Gain ', sLabel: 'OHLC Compare ', tab: VOL_CS,
			type: 'btn', filtDef: { obj: 'cscmn', fnc: 'ac', params: 'vol' + PARAM_DELIM + VOL_CS }
		});


		filer.push({
			id: "dynvolTrendNg", label: 'Volume Trending ', tab: VOL_CS,
			type: 'btn', filtDef: { obj: 'cscmn', fnc: 'atn', params: 'vol' + PARAM_DELIM + VOL_CS }
		});  //   JavaScript:cscmn.atn('price','priceCs');


		filer.push({
			id: "tickHistVol", label: 'Compare with Historical Volume ', tab: VOL_CS,
			type: 'btn', filtDef: { obj: thisObject, fnc: 'athv', params: null }
		});  //   JavaScript:cscmn.atn('price','priceCs');

		return filer;

	}


	return {


		vht: getVolHtml,
		addVol: addVol,
		// delRow : delRow,
		onVolCompChg: onVolCompChg,
		// gavh : getAvgVolHtml
		athv: addTickHistVol,
		thvc: tickHistVolChg,

		vf: validateFields,
		gcsf: getCustScrFilter

	}


})(); // module 	