
// custom screenerUtil...
var csu = (function () {

	var jsu = mintJsUtil;
	var htmlU = mintHtmlUtil;



	function getCrossTick(object, field) {
		var ticks = mtgv.mtpp.FREQ_SCR_MAP.slice();
		ticks.unshift({ id: "scrFreq", label: "Screener" })

		if (jsu.isNull(object[field])) {
			object[field] = 'scrFreq';
		}

		return ticks;
	}

	function csAebbChg(csTypeId) {   // AEBB Above Equals, Below, Between 
		var ops = $('#' + csTypeId + 'ops').val();
		var v1 = $('#' + csTypeId + 'v1').val();
		var v2 = $('#' + csTypeId + 'v2').val();
		var tds = csh.aebbHtm(csTypeId, ops, v1, v2);
		addMsgToDiv('' + csTypeId + 'Div', true, tds.ctrl);
		var aebbData = getObjFrmArr(mtgv.cs.screenerData.aebb, csTypeId);
		csu.valNSetAeb(csTypeId, ops, v1, v2, aebbData);
		displaySelectedFields();
	}

	/*
		function addNewFilterPost(json){
	
			let filterTable = $("#" + CS_FILTERS_TABLE);
			
			filterTable.append(json.html);
	
			addFilterChange(type, json.id);
	
			mtgv.cs.editActive.push(json); 
		}
	*/
	function listOpCompChg(id, type) {

		// HARD CODING TYPE ... Look for a better logic
		// var type = 'prc'; 
		// if(id.indexOf('prc')!= -1) type ='prc';
		// if(id.indexOf('beta')!= -1) type ='beta';

		var def = getObjFrmArr(LIST_OPS_COMPARE, type);
		var data = getObjFrmArr(mtgv.cs.screenerData[def.scrData], id)

		// var selectedField = ops = $('#'+id).val();

		// var data = getObjFrmArr(def.list , selectedField );
		// var data = {id : id };
		var field = $('#' + id + def.field).val();
		var ops = $('#' + id + 'ops').val();
		var v1 = $('#' + id + 'v1').val();
		var v2 = $('#' + id + 'v2').val();


		// var tmpObj = {id:id, field:field, ops:ops,v1:v1,v2:v2};

		data.field = field;
		data.ops = ops;
		data.v1 = v1;
		data.v2 = v2;

		var tds = csh.opsCompTd(data, def);
		addMsgToDiv('' + id + 'Td2Div', true, tds.td2);
		csu.valNSetAeb(id, ops, v1, v2, data); // Sets  Ops, v1,v2
		if (data.goodData) { //set others
			data[def.field] = field;
		}
		displaySelectedFields();
	}


	function opsCompare(type) {
		var def = getObjFrmArr(LIST_OPS_COMPARE, type);
		var id = myTsrScreener.getNextId(def.id + 'Id') // price Range Comparision
		var obj = { id: id, ops: BASIC_OPS[0].id, noData: true, hasData: true, type: type, csType: def.csType };
		// set LIST item to select
		obj.field = def.list[0].id,
			mtgv.cs.screenerData[def.scrData].push(obj);
		var html = csh.dynTr(obj, csh.opsCompTd(obj, def));

		var ctrl = jsu.getObjFrmArr(daily_tabs, def.csType);
		$('#' + ctrl.tab).append(html);
		displaySelectedFields();

	}



	function displaySelectedFields() {

		// var display =  $('#displaySel').is(":checked")
		// $('#csUserFeedBack').empty();
		// if(isNotNull(display) && display){
		// 	var fieldVal= csu. vf();
		// 	$('#csUserFeedBack').append(fieldVal.validFields);
		// 	$('#csUserFeedBack').append(fieldVal.invalidFields);

		// }
		var fieldVal = validateFields();
		var html = '' //doBold('Selected Field') + BREAK_LINE;
		html += fieldVal.validFields;
		html += fieldVal.invalidFields;

		htmlU.addMsgToDiv('csSelFieldsDiv', true, html);


		// ONE or More Filter Changed .. To Redo Previous Records
		mtgv.cs.prevResults = [];

	}

	// Validate Starts 


	function validateAndsetAebb(csTypeId, ops, v1, v2, aebbData) {

		var validV1 = false;
		if (containsString([CS_ABOVE, CS_BELOW, CS_EQUALS], ops, true)) {



			validV1 = isInputNumber(csTypeId + 'v1');

			if (validV1) {
				validV1 = isInputPositiveNumber(csTypeId + 'v1')
			}



		} else if (ops == CS_BETWEEN) {
			validV1 = isInputNumber(csTypeId + 'v1');
			validV2 = isInputNumber(csTypeId + 'v2');

			if (validV1) {
				validV1 = isInputPositiveNumber(csTypeId + 'v1')
			}

			if (validV2) {
				validV2 = isInputPositiveNumber(csTypeId + 'v2')
			}

		}

		aebbData.hasData = true; // Has data is true unless ops is not selected....

		aebbData.ops = ops;
		aebbData.v1 = v1;
		aebbData.v2 = v2;

		if (ops == CS_NOT_SELECTED) {
			aebbData.hasData = false;
			aebbData.goodData = false;
		} else if (containsString([CS_ABOVE, CS_BELOW, CS_EQUALS], ops, true)) {
			if (validV1) {
				aebbData.goodData = true;
				// aebbData.ops =ops;
				// aebbData.v1 =v1;
			} else {
				aebbData.goodData = false;
			}
		} else if (ops == CS_BETWEEN) {
			if (validV1 && validV2) {
				if (Number(v1) >= Number(v2)) {
					$('#' + csTypeId + 'Td2Div').append(getSpan('Invaid Range', 'red', 8));
					aebbData.goodData = false;
				} else {
					aebbData.goodData = true;
					// aebbData.ops =ops;
					// aebbData.v1 =v1;
					// aebbData.v2 =v2;
				}
			} else {
				aebbData.goodData = false;
			}
		}

	}



	function validateAebb(validResults) {
		for (var i = 0; i < validResults.scrData.aebb.length; i++) {
			obj = validResults.scrData.aebb[i];
			var selParam = 'aebb:' + obj.id;

			if (obj.ops == 'na') { obj.goodData = false; continue; }
			if (obj.hasData) {
				var aebb = getObjFrmArr(AEBB_MAP, obj.id);
				obj.csType = aebb.csType;
				if (obj.goodData) {
					var ops = getObjFrmArr(BASIC_OPS, obj.ops);

					var label = aebb.label;

					if (jsu.isNotNull(aebb.info)) label += " (" + aebb.info + ")";
					var text = '  ' + label + ' ' + ops.label + ' ' + obj.v1;

					if (ops.id == CS_BETWEEN) text += ' And ' + obj.v2;

					// validResults.validFields+= getSpan(text, 'green', CS_SEL_FONT_SIZE) + '<br/>';

					csh.cdt(obj, text, validResults, selParam, true);
					//csh.cdt(obj, text, params ,selParam, true);
					// validResults.validFieldCount++;
				} else {
					var text = 'Invalid value for ' + aebb.label;
					csh.cdt(obj, text, validResults, selParam, false);

					// if(!obj.disabled) validResults.invalidFields++;


					// validResults.invalidFields += getSpan( 'Invalid value for ' + aebb.label  ,'red',CS_SEL_FONT_SIZE)+' <br/>';	
				}
			}
		}

	}


	function validateFields(runType) {


		if (jsu.isNull(runType) || jsu.containsString(['applyCustSettings', 'tickChg', 'sbChg'], runType)) {
			// Config Changed Show new Not applicable.....  

			mtgv.cs.prevResults = [];
			mtgv.cs.response = null;
			// else just run // show new  applicable
		}


		// Set Number of Selected filters per Tab ... Bad Approach but a Quick Sol
		// Value is Set at csHtmlHelper.createDisplayText
		mtgv.cs.TabCount = [];


		var scrData = mtgv.cs.screenerData;

		// var invalidFields = '';
		// var validFields = '';
		// var validFieldCount=0;

		var validResults = { scrData: scrData, invalidFields: '', validFields: '', validFieldCount: 0, invalidFieldCount: 0 };

		validateAebb(validResults);
		// cs commons
		cscmn.vt(validResults);
		cscmn.vc(validResults);
		cscmn.vg(validResults);
		cscmn.vtn(validResults);
		cscmn.vspt(validResults); // sp time ...
		cscmn.vao(validResults); // Advance OHLC ...


		// Price ....
		csp.vf(validResults);

		// vol
		csv.vf(validResults);

		for (var i = 0; i < LIST_OPS_COMPARE.length; i++) {
			doOpsCompValidate(LIST_OPS_COMPARE[i], validResults);
		}

		// High Low
		cshl.vhlh(validResults);
		cshl.vhlcc(validResults); //validateHighLowComp
		cshl.vhls(validResults); //validateHlSus

		cshl.vhl(validResults);

		cspp.vpp(validResults);
		cspp.vcpr(validResults);

		cspp.vfr(validResults);




		csstr.vstr(validResults);

		// csma.vpm(validResults);
		// csma.vmco(validResults);
		// csma.vmco(validResults);
		csma.vma(validResults);

		cst.vt(validResults);



		csd.vd(validResults);


		csf.vf(validResults);

		// chart patterns
		cscp.vcp(validResults);

		// Fin NG .... 
		csFrNg.val(validResults);
		csStmtNg.val(validResults);


		// fin Ratios
		csFr.vf(validResults);

		// yrly
		csFr.vfy(validResults);


		// console.log(validResults);

		// console.log( ' validFieldCount  : ' + validResults.validFieldCount + ', invalidFieldCount : ' + validResults.invalidFieldCount + ' ');


		// Tab Filter Count

		setTabCount();




		return validResults;



		// return   {validFields : validFields , invalidFields : invalidFields, validFieldCount : validFieldCount};
	}


	function doOpsCompValidate(def, validResults) {

		var scrData = mtgv.cs.screenerData;
		// var validFields ='';
		// var invalidFields ='';
		// var validFieldCount=0;
		// var def = getObjFrmArr(LIST_OPS_COMPARE , type);
		var arr = scrData[def.scrData];

		for (var i = 0; i < arr.length; i++) {
			var obj = arr[i];

			if (obj.hasData) {
				var field = getObjFrmArr(def.list, obj.field);
				var text = '';
				if (obj.goodData) {
					var ops = getObjFrmArr(BASIC_OPS, obj.ops);
					text = def.label + '  "' + field.label + '" ' + ops.label + ' ' + obj.v1;
					if (ops.id == CS_BETWEEN) text += ' And ' + obj.v2;
					text += ' %'
					// validFields+= getSpan(text, 'green', CS_SEL_FONT_SIZE) + '<br/>';
					// validFieldCount++;
				} else {
					// invalidFields += getSpan( 'Invalid value for ' + def.label + ' - "' + field.label +'" ' ,'red',CS_SEL_FONT_SIZE)+' <br/>';	
					text = 'Invalid value for ' + def.label + ' - "' + field.label + '" ';
				}

				var selParam = def.id + ':' + obj.id //  'trend:'+ trendDef.id;
				if (obj.goodData) {
					// validResults.validFieldCount++;
					csh.cdt(obj, text, validResults, selParam, true);
				} else {
					csh.cdt(obj, text, validResults, selParam, false);
					// if(!obj.disabled) validResults.invalidFields++;

				}

			}
		}

	}


	function setTabCount() {

		if (mtgv.cs.TabCount == null) return;

		// Tab Filter Count
		for (let i = 0; i < daily_tabs.length; i++) {
			let tabDef = daily_tabs[i];

			let tabLabel = tabDef.label

			let tabFilt = jsu.getObjFrmArr(mtgv.cs.TabCount, tabDef.id);

			if (tabFilt != null && tabFilt.count > 0) {

				let color = tabFilt.valid ? '#38df38' : '#ff4308';

				tabLabel += htmlU.getSpan('(' + tabFilt.count + ')', color);
			}


			htmlU.addMsgToDiv(tabDef.id, true, tabLabel);


		}
	}


	// Validate Ends 

	// function edit

	function editRow(tab, obj) {
		var json = getSelectedField(obj);



		if (id == BV_CS) {

		} else {

			let tabObj = jsu.getObjFrmArr(daily_tabs, tab);

			let html = window[tabObj.tabObj]['gfr'](json.type, json.id);

			let div = json.id + 'Td2Div';
			htmlU.addMsgToDiv(div, true, html);
		}

		// if(PRICE_CS== id) {   // containsString()

		// }else if(id== VOL_CS){


		// }else if(id== HL_CS){

		// }else if(id== BV_CS){

		// }else if(id==MA_CS){

		// }else if(id==TI_CS){

		// }else if(id==DIV_CS){

		// }else if(id==PP_CS){

		// }else if(id==STR_CS){

		// }else if(id==CP_CS){

		// }else if(id==FIN_RAT_NG){

		// }else if(id==FIN_STMT_NG){
		// }


	}


	function delRow(obj) {

		var json = getSelectedField(obj);

		if (json.type == 'aebb') {
			var aebbObj = jsu.getObjFrmArr(json.scrData.aebb, json.id);
			// var selectDD =  json.id+'ops';
			// // $("div.id_100 select").val("val2");

			// $("#" + selectDD).val("na").change();
			// aebbObj.ops = 'na';

			// todo - fix hack to enable filter in filter menu
			// hack
			let tempAebbObj = jsu.cloneObj(aebbObj);
			if (jsu.isNull(tempAebbObj)) {
				if (json.id == "priceGainLoss") {
					tempAebbObj = {};
					tempAebbObj.csType = "priceCs";
					tempAebbObj.id = "gainLoss"
				}
			}
			else if (json.id == "csPrice") {
				tempAebbObj.id = "price";
			} else if (json.id == "csVol") {
				tempAebbObj.id = "tickVol"
			} else if (json.id == "csDayVol") {
				tempAebbObj.id = "dayVol"
			}

			setObjDelCommonFnc(tempAebbObj, json.id + 'ops', 'ops');

			if (mtgv.cs.ng) {
				$('#' + json.id).remove();
			}


		} else if (json.type == 'trend') {
			var trendDef = jsu.getObjFrmArr(TRENDING_DEF, json.id);
			var obj = json.scrData.trend[trendDef.obj];
			// var selectDD = json.id +'TrendDd';

			// $("#" + selectDD).val(NA_VAL).change();
			// obj.hasData = false;
			setObjDelCommonFnc(obj, json.id + 'TrendDd', 'id');
		} else if (json.type == 'hlSus') {  // Individual Object ...
			let tempObj = jsu.cloneObj(json.scrData);
			tempObj.csType = "hlCs";
			tempObj.id = "hls";
			setObjDelCommonFnc(tempObj, 'hlSusHistDd', 'hlSustain');
			// setObjDelCommonFnc(json.scrData, 'hlSusHistDd', 'hlSustain');

		} else if (json.type == 'hlHist') {
			var obj = jsu.getObjFrmArr(json.arr, json.id);
			setObjDelCommonFnc(obj, json.id + 'HistDd', 'histType');

		} else if (json.type == 'priceGainLoss') {  // Individual Object ...
			// alert('todo');	
			setObjDelCommonFnc(json.scrData[json.type], json.type + 'Ops', 'ops'); // priceGainLoss

			var html = csp.ctd(json.type);

			htmlU.addMsgToDiv(json.type + 'Div', true, html);

			// }else if(jsu.containsString( [ 'gapRunAway' ,'gapFill' ]  , json.type)){  // Individual Object ...
			// 	// alert('todo');	
			// 	setObjDelCommonFnc( json.scrData[json.type],  json.type + 'Type' , 'type'); 

			// 	var html = csp.ctd(json.type);

			// 	htmlU.addMsgToDiv(  json.type + 'Div' , true, html);

			// }else if(jsu.containsString( [ OPEN_RANGE_OLD ]  , json.type)){  // Individual Object ...

			// 	var rowId =  json.type + 'TrId';
			// 	$("#" + rowId).remove();
			// 	json.scrData[json.type].enabled= false;
			// 	$('#'+json.type  ).prop('checked', false); 



		} else if (jsu.containsString([OPEN_RANGE_NG, PREV_RANGE_BOBD, GAPS_NG, TREND_CANDLE_BOBD, OPEN_RANGE_OLD, GAP_FILL, GAP_RUNAWAY], json.type)) {  // Individual Object ...

			var rowId = json.type + 'TrId';
			$("#" + rowId).remove();
			json.scrData[json.type].enabled = false;
			$('#' + json.type).prop('checked', false);


			// OPEN_RANGE_NG


			// }else if(json.type == 'patterns'){
			// 	var selObj = jsu.getObjFrmArr(json.scrData.patterns, json.id);
			// 	setObjDelCommonFnc( selObj,  json.id +'Dd' , 'pat');
			// }else if(json.type == 'compPatterns'){
			// 	var selObj = jsu.getObjFrmArr(json.scrData.compPatterns, json.id);

			// 	if(json.id =="narRng"){
			// 		setObjDelCommonFnc( selObj,  'nrpDd' , 'pat');	
			// 	}
			// 	if(json.id =="wideRng"){
			// 		setObjDelCommonFnc( selObj,  'wrpDd' , 'pat');	
			// 	}

			// setObjDelCommonFnc( selObj,  json.id +'Dd' , 'pat');


		} else {
			// Includes dynComp
			var arr = json.arr;
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].id == json.id) {
					arr.splice(i, 1);
				}
			}
			$('#' + json.id).remove();
		}

		displaySelectedFields();
	}

	function setObjDelCommonFnc(obj, ddToReset, selId) {
		obj[selId] = NA_VAL;
		$("#" + ddToReset).val(NA_VAL).change();
		obj.hasData = false;

		if (mtgv.cs.ng) {
			$('#' + selId).remove();

			let param = obj.csType + '_' + obj.id;
			csh.ef(param);

		}





	}

	function enableControl(obj) {
		changeEnableStatus(obj, false);
	}

	function pauseControl(obj) {
		changeEnableStatus(obj, true);
	}

	function changeEnableStatus(obj, newStatus) {
		var json = getSelectedField(obj);

		if (json.type == 'aebb') {
			var aebbObj = jsu.getObjFrmArr(json.scrData.aebb, json.id);
			aebbObj.disabled = newStatus;
		} else if (json.type == 'trend') {
			// json.scrData.trend[]
			var trendDef = jsu.getObjFrmArr(TRENDING_DEF, json.id);
			var obj = json.scrData.trend[trendDef.obj];
			obj.disabled = newStatus;
		} else if (json.type == 'hlSus') {	  // Individual level object ...
			json.scrData.hlSustain.disabled = newStatus;
		} else if (json.type == 'hlHist') {
			var obj = jsu.getObjFrmArr(json.arr, json.id);
			obj.disabled = newStatus;
			// }else if(json.type == 'priceGainLoss'){  // Individual level object ...
			// 	json.scrData.priceGainLoss.disabled = newStatus;
		} else if (jsu.containsString(['priceGainLoss', OPEN_RANGE_OLD, GAP_RUNAWAY, GAP_FILL,
			TREND_CANDLE_BOBD, OPEN_RANGE_NG, PREV_RANGE_BOBD, GAPS_NG], json.type)) {  // Individual level object ...
			json.scrData[json.type].disabled = newStatus;



			// }else if(json.type == 'patterns'){
			// 	var obj = jsu.getObjFrmArr(json.scrData.patterns, json.id);
			// 	obj.disabled =  newStatus;
			// }else if(json.type == 'compPatterns'){
			// 	var obj = jsu.getObjFrmArr(json.scrData.compPatterns, json.id);
			// 	obj.disabled =  newStatus;

		} else {
			var arr = json.arr;

			for (var i = 0; i < arr.length; i++) {
				if (arr[i].id == json.id) {
					// arr.splice(i,1);
					arr[i].disabled = newStatus;
				}
			}
		}
		displaySelectedFields();
	}

	function getSelectedField(obj) {

		var scrData = mtgv.cs.screenerData;


		var val = obj.split(':');
		var arr;
		var type = val[0];
		var id = val[1];

		var selObj = { id: id, type: type, scrData: mtgv.cs.screenerData };

		if (type == 'aebb' || type == 'trend' || type == 'hlSus'
			|| jsu.containsString(['priceGainLoss', OPEN_RANGE_OLD, GAP_FILL, GAP_RUNAWAY
				, TREND_CANDLE_BOBD, OPEN_RANGE_NG, GAPS_NG], type)

		) {
			return selObj;
		}
		// if(type == 'dynComp'){
		// 	var subType = val[2];
		// 	arr = scrData.dynComp['dyn'+subType+'Comp']; //'
		// 	selObj.subType = subType;
		// }
		// if(type == 'gainLoss'){
		// 	var subType = val[2];
		// 	arr = scrData.gainLoss[subType+'Gain'];
		// 	selObj.subType = subType;
		// }

		// if(type =='patterns'){

		// 	var patTypeDef = jsu.getObjFrmArr(CP_FIELDS, id);
		// 	// var patDef = getObjFrmArr( patTypeDef.elems, pattern.pat);
		// 	arr = 	patTypeDef.elems
		// }
		// if(type =='compPatterns'){ // Chart Pattern Complex....

		// 	var patTypeDef = jsu.getObjFrmArr(CP_COMP_FIELDS, id);
		// 	// var patDef = getObjFrmArr( patTypeDef.elems, pattern.pat);
		// 	arr = 	patTypeDef.elems
		// }

		// if()

		arr = getItemArray(type);


		selObj.arr = arr;

		return selObj;
	}


	function getSelObject(type, id) {
		let objList = getItemArray(type);

		let obj = jsu.getObjFrmArr(objList, id)

		return obj;

	}


	function getItemArray(type) {

		var scrData = mtgv.cs.screenerData;

		let arr = null;

		if (jsu.arrayContainsId(LIST_OPS_COMPARE, type)) {
			var scrObj = jsu.getObjFrmArr(LIST_OPS_COMPARE, type).scrData;
			arr = scrData[scrObj]
			// if(type=='prc') arr= scrData.prComp;
			// if(type=='beta') arr= scrData.betaComp;
		}


		if (type == 'hlHist') arr = scrData.hlHist;



		// Price 

		if (jsu.containsString(['dynpriceComp', 'priceGain', 'dynpriceTrendNg', 'dynSpTimepriceComp',
			'dynAdvOhlcComp', 'priceBoBd', CS_TURNOVER, CS_VWAP, 'rallyBaseCom'], type)) {
			arr = scrData[type];
		}

		/*
				if(type == 'dynpriceComp') arr = scrData.dynpriceComp;
				if(type == 'priceGain') arr = scrData.priceGain;		
				if(type == 'dynpriceTrendNg') arr = scrData.dynpriceTrendNg;		
		
				if(type == 'dynSpTimepriceComp') arr = scrData.dynSpTimepriceComp;
		
				if(type == 'dynAdvOhlcComp') arr = scrData.dynAdvOhlcComp;
		
		
				if(type == 'priceBoBd') arr = scrData.priceBoBd;		
		
				if(type == CS_TURNOVER) arr = scrData[ CS_TURNOVER ];		
		
				if(type == CS_VWAP) arr = scrData[ CS_VWAP ];		
		
		
		
				if(type == 'rallyBaseCom') arr = scrData.rallyBaseCom;	
		*/


		// Volume

		if (type == 'volc') arr = scrData.volComp;
		if (type == 'tkHistVol') arr = scrData.tickHistVol;


		if (jsu.containsString(['dynvolComp', 'dynvolTrendNg', 'volGain', 'dynSpTimevolComp',
			'dynAdvOhlcComp', 'priceBoBd', CS_TURNOVER, CS_VWAP, 'rallyBaseCom'], type)) {
			arr = scrData[type];
		}

		/*
				if(type == 'dynvolComp') arr = scrData.dynvolComp;
				if(type == 'dynvolTrendNg') arr = scrData.dynvolTrendNg;
				if(type == 'volGain') arr = scrData.volGain;
				if(type == 'dynSpTimevolComp') arr = scrData.dynSpTimevolComp;
		*/



		// high Lows

		if (type == 'pricHl') arr = scrData.priceHlComp;


		if (jsu.containsString(['hlComp', 'hlRangeComp'], type)) {
			arr = scrData[type];
		}

		// if(type =='hlComp') arr= scrData.hlComp;
		// if(type =='hlRangeComp') arr= scrData.hlRangeComp;


		// Moving Average .... 

		if (jsu.containsString(['pma', 'maco', 'maTrend', 'maFakeBreak',
			'maSupResBounce', 'maCon', 'maDiv', 'maHist', 'maOl'], type)) {
			arr = scrData[type + 'Comp'];
		}

		/*
				if(type=='pma') arr= scrData.pmaComp;
				if(type=='maco') arr= scrData.macoComp;
				if(type=='maTrend') arr= scrData.maTrendComp;
		
				if(type=='maFakeBreak') arr= scrData.maFakeBreakComp;
				if(type=='maSupResBounce') arr= scrData.maSupResBounceComp;
				if(type=='maCon') arr= scrData.maConComp;
				if(type=='maDiv') arr= scrData.maDivComp;
				if(type=='maHist') arr= scrData.maHistComp;
		
				if(type=='maOl') arr= scrData.maOlComp;
		*/


		if (type == 'finNgComp') arr = scrData.finNgComp;
		if (type == 'finStmtNgComp') arr = scrData.finStmtNgComp;



		// tech 

		if (jsu.containsString(['techNgComp', 'techAbsComp', 'techCoComp', 'techIchiComp',
			'techDivComp', 'techDiyBiComp', 'techDiyOlComp'], type)) {
			arr = scrData[type];
		}
		/*
				
				if(type=='techNgComp') arr = scrData.techNgComp;
				if(type=='techAbsComp') arr = scrData.techAbsComp;
				if(type=='techCoComp') arr = scrData.techCoComp;
				if(type=='techIchiComp') arr = scrData.techIchiComp;
		
				if(type=='techDivComp') arr = scrData.techDivComp;
		
				if(type=='techDiyBiComp') arr = scrData.techDiyBiComp;
				if(type=='techDiyOlComp') arr = scrData.techDiyOlComp;
		*/


		// Strength

		if (jsu.containsString(['techStrComp', 'techRankComp', 'gwthStrComp', 'gwthRankComp',
			'valStrComp', 'valRankComp', 'pftStrComp', 'pftRankComp',

			'stabStrComp', 'stabRankComp', 'returnsComp', 'returnsRankComp',
			'relPriceStrComp', 'relStrComp'
		], type)) {
			arr = scrData[type];
		}

		/*
				if(type=='techStrComp') arr = scrData.techStrComp;
				if(type=='techRankComp') arr = scrData.techRankComp;
		
		
				if(type=='gwthStrComp') arr = scrData.gwthStrComp;
				if(type=='gwthRankComp') arr = scrData.gwthRankComp;
		
				if(type=='valStrComp') arr = scrData.valStrComp;
				if(type=='valRankComp') arr = scrData.valRankComp;
		
				if(type=='pftStrComp') arr = scrData.pftStrComp;
				if(type=='pftRankComp') arr = scrData.pftRankComp;
		
				if(type=='stabStrComp') arr = scrData.stabStrComp;
				if(type=='stabRankComp') arr = scrData.stabRankComp;
		
				if(type=='returnsComp') arr = scrData.returnsComp;
				if(type=='returnsRankComp') arr = scrData.returnsRankComp;
				if(type=='relPriceStrComp') arr = scrData.relPriceStrComp;
				if(type=='relStrComp') arr = scrData.relStrComp;
		
		*/
		if (type == 'patternNg') arr = scrData.patternNg;

		if (type == 'pp') arr = scrData.ppComp;
		if (type == 'cpr') arr = scrData.cprComp;
		if (type == 'fibr') arr = scrData.fibrComp;




		// FIN RATIO's
		if (jsu.containsString([
			'finPbfPbfComp', 'finShShComp', 'finMrqMrqComp', 'finTtmTtmComp', 'finGnfGnfComp',
			'finVrCurComp', 'finVrFyComp', 'finVr1ygComp', 'finVr3ygComp', 'finVr5ygComp', 'finVr7ygComp', 'finVr10ygComp',

			'finPrFyComp', 'finPr1ygComp', 'finPr3ygComp', 'finPr5ygComp', 'finPr7ygComp', 'finPr10ygComp',
			'finSrFyComp', 'finSr1ygComp', 'finSr3ygComp', 'finSr5ygComp', 'finSr7ygComp', 'finSr10ygComp',
			'finErFyComp', 'finEr1ygComp', 'finEr3ygComp', 'finEr5ygComp', 'finEr7ygComp', 'finEr10ygComp',

			'finIsyFyComp', 'finIsy1ygComp', 'finIsy3ygComp', 'finIsy5ygComp', 'finIsy7ygComp', 'finIsy10ygComp',
			'finBsyFyComp', 'finBsy1ygComp', 'finBsy3ygComp', 'finBsy5ygComp', 'finBsy7ygComp', 'finBsy10ygComp',
			'finCfyFyComp', 'finCfy1ygComp', 'finCfy3ygComp', 'finCfy5ygComp', 'finCfy7ygComp', 'finCfy10ygComp',
			'finIsqQtrComp', 'finIsqQtrGwLastComp', 'finIsqQtrGwYrComp'


		], type, true)) {
			arr = scrData[type];
		}

		if (containsString([FIN_BAL_SHEET, FIN_RATIO, FIN_BASIC, FIN_CASH_FLOW, FIN_INCOME], type, true)) arr = scrData.csCagr;
		if (type == FIN_QTRLY) arr = scrData.csQoq;


		return arr;

	}




	// Objects ....


	/* when a list of Object is past as first Paramfor Ex mtgv.cs.screenerData.techNgComp */
	function setObjectProp(listArr, fieldArr, id) {
		for (var i = 0; i < listArr.length; i++) {
			var comp = listArr[i];
			if (comp.id == id) {
				setIndiObjProp(comp, fieldArr)
			}
		}
	}

	function setIndiObjProp(comp, fieldArr, ignoreIdPrefix) {  // when an Object is past - Use case Tech DIY....
		for (var j = 0; j < fieldArr.length; j++) {

			var val = $('#' + comp.id + fieldArr[j]).val();

			if (ignoreIdPrefix) {
				val = $('#' + fieldArr[j]).val();
			}


			if (jsu.isNull(val)) {
				delete comp[fieldArr[j]];
			} else {
				comp[fieldArr[j]] = val;
			}



		}
	}



	// var OBJS_TO_STRIP = ['csCagr','csQoq','pmaComp', 'macoComp' , 'techAbsComp'];

	/*
		Unselected Category 


	*/




	function has5MinTick() {
		var availTicks = mtgv.mtpp.FREQ_SCR_MAP.slice();

		var conTains5Mins = jsu.arrayContainsId(availTicks, FREQ_MM5);
		return conTains5Mins;
	}

	function getOnlyIntraTick() {
		var availTicks = mtgv.mtpp.FREQ_SCR_MAP.slice();

		var ticks = [];

		for (var i = 0; i < FREQ_SCR_INTRA_FREQ_MAP.length; i++) {
			var tick = FREQ_SCR_INTRA_FREQ_MAP[i];

			if (jsu.arrayContainsId(availTicks, tick.id) && tick.id != FREQ_INTRA_DAILY) {
				ticks.push(tick);
			}

		}
		return ticks;
	}


	function isFeatureChecked(obj) {
		if (obj != null && obj.enabled) {
			return true;
		}
		return false;
	}


	return {


		// anfp : addNewFilterPost,

		gct: getCrossTick,
		// tabs : tabs
		csAebbChg: csAebbChg,
		listOpCompChg: listOpCompChg,
		opsCompare: opsCompare,

		vf: validateFields,
		valNSetAeb: validateAndsetAebb,


		stc: setTabCount,

		gia: getItemArray,
		gso: getSelObject,

		er: editRow,

		dr: delRow,
		ec: enableControl,
		pc: pauseControl,


		dsf: displaySelectedFields,


		setProp: setObjectProp,

		siop: setIndiObjProp,
		has5MinTick: has5MinTick,
		goit: getOnlyIntraTick,

		ifc: isFeatureChecked

	}




})(); // module 	