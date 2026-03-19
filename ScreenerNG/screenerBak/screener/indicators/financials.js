var FIN_BASIC_AEBB_FIELDS = [	
				// Basic Financials
				{id: 'csFbMc'		, label: 'Market Capitalization (cr)' , csType: FIN_BASIC},
				{id: 'csFbBvps'		, label: 'Book Value Per Share', csType: FIN_BASIC},
				{id: 'csFbFv'		, label: 'Face Value', csType: FIN_BASIC},		
				{id: 'csFbProfMrg'		, label: 'Profit margin', csType: FIN_BASIC},
				{id: 'csFbOpsMarginTtm'		, label: 'Operatinng MarginTtm', csType: FIN_BASIC},
				{id: 'csFbQtrRevGwtYoy'		, label: 'Qtr Revenue Growth YOY', csType: FIN_BASIC},
				{id: 'csFbQtrEarnGwtYoy'		, label: 'Qtr Earning Growth YOY', csType: FIN_BASIC},
				{id: 'csFbRevTtm'		, label: 'Revenue TTM (Cr)', csType: FIN_BASIC},
				{id: 'csFbGrosProfit'		, label: 'Gross Profit TTM (cr)', csType: FIN_BASIC},
				{id: 'csFbOutSh'		, label: 'Outstanding Shares (Cr)', csType: FIN_BASIC},
				{id: 'csFbFloatSh'		, label: 'Floating Share (Cr)', csType: FIN_BASIC},
				{id: 'csFbRpsTtm'		, label: 'Revenue Per Share TTM', csType: FIN_BASIC},

  ];

var FIN_RATIO_AEBB_FIELDS  = [// Financial Ratios


				{id: 'csFrEps'		, label: 'Earning Per Share', csType: FIN_RATIO},
				{id: 'csFrDilEpsTtm'		, label: 'Dil EPS TTM', csType: FIN_RATIO},
				{id: 'csFrCashEps'		, label: 'Cash EPS ', csType: FIN_RATIO},

				{id: 'csFrQtrltEps'		, label: 'Qtrly EPS', csType: FIN_RATIO},
				{id: 'csFbPe'		, label: 'Price / Earning', csType: FIN_RATIO},
				{id: 'csFbDps'		, label: 'Dividend Per Share', csType: FIN_RATIO},

				{id: 'csFbDivYield'		, label: 'Div Yield', csType: FIN_RATIO},
				{id: 'csFrPeg'		, label: 'PEG', csType: FIN_RATIO},
				{id: 'csFrTrailPE'		, label: 'Trailing PE', csType: FIN_RATIO},

				{id: 'csFrForwardPE'		, label: 'Forward PE', csType: FIN_RATIO},

				{id: 'csFrPbSTtm'		, label: 'Price Sales TTM', csType: FIN_RATIO},
				{id: 'csFrPbMrq'		, label: 'Price / Book MRQ', csType: FIN_RATIO},
				{id: 'csFrEvByRev'		, label: 'Enterprise Value / Revenue', csType: FIN_RATIO},
				{id: 'csFrEvByEbitda'		, label: 'Enterprise Value / EBITDA', csType: FIN_RATIO},
				{id: 'csFrRoaTtm'		, label: 'Return on Asset TTM', csType: FIN_RATIO},
				{id: 'csFrRoeTtm'		, label: 'Return on Equity TTM', csType: FIN_RATIO},
];

var BAL_SHEET_AEBB_FIELDS = [
		// Balance Sheet Cash Flow....
				{id: 'csBsBvps'		, label: 'Book Value/Share', csType: FIN_BAL_SHEET},
				{id: 'csBsSF'		, label: 'Share Holders Funds (Cr)', csType: FIN_BAL_SHEET},
				{id: 'csBsReserves'	, label: 'Reserves (Cr)', csType: FIN_BAL_SHEET},
				{id: 'csBsCL'		, label: 'Current Liabilities (Cr)', csType: FIN_BAL_SHEET},
				{id: 'csBsTotLiab'	, label: 'Total Liabilities (Cr)', csType: FIN_BAL_SHEET},
				{id: 'csBsPropPlant', label: 'Property Plant Equipment (Cr)', csType: FIN_BAL_SHEET},
				{id: 'csBsInventory'		, label: 'Total Inventory (Cr)', csType: FIN_BAL_SHEET},

				{id: 'csBsCB'		, label: 'Cash & Bank Balance (Cr)', csType: FIN_BAL_SHEET},
				// {id: 'csBsCwip'		, label: 'Capital Work in Progress'},
				{id: 'csBsCA'		, label: 'Current Assets (Cr)', csType: FIN_BAL_SHEET},
				{id: 'csBsTA'		, label: 'Total Assets (Cr)', csType: FIN_BAL_SHEET},
				// {id: 'csBsWc'		, label: 'Working Capital'},
				{id: 'csBsNetRec'		, label: 'Net Receivable (Cr)', csType: FIN_BAL_SHEET},

				// {id: 'csBsEqCs'		, label: 'Equity Capital Shareholding'},
				// {id: 'csBsNB'		, label: 'Net Block'},
				// {id: 'csBsTD'		, label: 'Total Debt'},

		];

var CASHFLOW_AEBB_FIELDS = [
	// Balance Sheet Cash Flow....
		{id: 'csCfCfa'	, label: 'Cash From Financial Activity (Cr)', csType: FIN_CASH_FLOW},
		{id: 'csCfCia'	, label: 'Cash From Investment Activity (Cr)', csType: FIN_CASH_FLOW},
		{id: 'csCfCoa'	, label: 'Cash From Operating Activity (Cr)', csType: FIN_CASH_FLOW},
		{id: 'csCfNcf'	, label: 'Net Cash Flow (Cr)', csType: FIN_CASH_FLOW},

		{id: 'csCfInv'	, label: 'Investments (Cr)', csType: FIN_CASH_FLOW},
		{id: 'csCfNetBorrow'	, label: 'Net Borrowings (Cr)', csType: FIN_CASH_FLOW},
		// Hiding Div Paid as values in DB is al
		{id: 'csCfDivPaid'	, label: 'Divident Paid (Cr)', csType: FIN_CASH_FLOW}, 

];

var INCOME_AEBB_FIELDS = [

		{id : 'csInCostRev', label: 'Cost Of Revenue (Cr)', csType: INCOME_AEBB_FIELDS},
		{id : 'csInRev', label: 'Revenue (Cr)', csType: INCOME_AEBB_FIELDS},
		{id : 'csInGrsProfit', label: 'Gross Profit (Cr)', csType: INCOME_AEBB_FIELDS},
		{id : 'csInOe', label: 'Operating Expense (Cr)', csType: INCOME_AEBB_FIELDS},
		{id : 'csInOp', label: 'Operating Profit (Cr)', csType: INCOME_AEBB_FIELDS},
		{id : 'csInInt', label: 'Interest (Cr)', csType: INCOME_AEBB_FIELDS},
		{id : 'csInDe', label: 'Depreciation Expense (Cr)', csType: INCOME_AEBB_FIELDS},
		{id : 'csInNi', label: 'Net Income (Cr)', csType: INCOME_AEBB_FIELDS},
		{id : 'csInPbt', label: 'Profit Before Tax (Cr)', csType: INCOME_AEBB_FIELDS},
		{id : 'csInPbtd', label: 'Profit Before tax & Depreciation (Cr)', csType: INCOME_AEBB_FIELDS},
		{id : 'csInIt', label: 'Income Tax (Cr)', csType: INCOME_AEBB_FIELDS},
		{id : 'csInEbitda', label: 'EBITDA (Cr)', csType: INCOME_AEBB_FIELDS},
		{id : 'csInTd', label: 'Total Dividend (Cr)', csType: INCOME_AEBB_FIELDS},
		{id : 'csInEps', label: 'Earning / Share (EPS)', csType: INCOME_AEBB_FIELDS},

		// {id : 'csInCtr', label: 'Corporate Tax Rate'},
		// {id : 'csInOs', label: 'Outstanding Shares'},
		// {id : 'csInOi', label: 'Other Income'},
		// {id : 'csInTi', label: 'Total Income'},
		// {id : 'csInPbtd', label: 'Profit Before tax & Depreciation'},
		// {id : 'csIn', label: ''},
];

var QTRLY_AEBB_FIELDS = [
	
	{id : 'csQtCostRev', label: 'Cost Of revenue', csType: QTRLY_AEBB_FIELDS},
	{id : 'csQtRev', label: 'Revenue', csType: QTRLY_AEBB_FIELDS},
	{id : 'csQtGrsProfit', label: 'Gross Profit', csType: QTRLY_AEBB_FIELDS},
	{id : 'csQtOe', label: 'Operating Expense', csType: QTRLY_AEBB_FIELDS},
	{id : 'csQtOp', label: 'Operating Profit', csType: QTRLY_AEBB_FIELDS},
	{id : 'csQtInt', label: 'Interest', csType: QTRLY_AEBB_FIELDS},
	{id : 'csQtNI', label: 'Net Income', csType: QTRLY_AEBB_FIELDS},
	{id : 'csQtPbt', label: 'Income Before Tax ', csType: QTRLY_AEBB_FIELDS},
	{id : 'csQtIte', label: 'Income tax Expense', csType: QTRLY_AEBB_FIELDS},

	{id : 'csQtEb', label: 'EBITDA', csType: QTRLY_AEBB_FIELDS},
	{id : 'csQtEps', label: 'Earning / Share (EPS)', csType: QTRLY_AEBB_FIELDS},
	// {id : 'csQtPbtd', label: 'Profit Before Tax & Depreciation'},
	
	
	// {id : 'csQtTI', label: 'Total Income'},
	
	
	// {id : 'csQtEm', label: 'EBITDA Margin'},
	// {id : 'csQtIbtm', label: 'IBT Margin'},
	// {id : 'csQtNetm', label: 'Net Margin'},

];


var CAGR_PERIOD =[
		{id: "1Y", label: "One Year"},
		{id: "3Y", label: "Three Years"},
		{id: "5Y", label: "Five Years"},
		{id: "7Y", label: "Seven Years"},
		{id: "10Y", label: "Ten Years"},
	];

var QOQ_PERIOD =[
		{id: "1Q", label: "With Last Quarter"},
		{id: "1QYoY", label: "Year On Year"},
	];





var csf =  (function () {


	/**********************************************************************************************
								FIN BASIC HTML
**********************************************************************************************/



	function getFinBasicHtml(id){

		var html='';

		html+=  mintHtmlUtil.getSpan( " Please note this will be discontinued in favor of more flexible/Powerful <b>NewRatio</b> Screener (Previous Tab). " , 'red',10);


		html +='<br/><div id="'+id+'Div">';
		html+= '<table id="'+id+'CtrlTab" class="'+INDI_TABLE_STYLE+' "   width="100%" >';
		for(var i=0;i< FIN_BASIC_AEBB_FIELDS.length ;i++) html+= csh.aebbStrut(FIN_BASIC_AEBB_FIELDS[i].id);
		html+= '</table>'; // BS TAB START...		
		html +='</div><br/><br/>'; //pvCsDiv
		return html;
	}


/**********************************************************************************************
								FIN RATO HTML
**********************************************************************************************/



	function getFinRatioHtml(id){


		var html ='<br/><div id="pvCsDiv">';
		html+=  mintHtmlUtil.getSpan( " Please note this will be discontinued in favor of more flexible/Powerful <b>NewRatio</b> Screener (Next Tab). " , 'red',10);

		html+= '<table id="'+id+'CtrlTab" '+TAB_INDI_STYLE+'    >';
		for(var i=0;i< FIN_RATIO_AEBB_FIELDS.length ;i++) html+= csh.aebbStrut(FIN_RATIO_AEBB_FIELDS[i].id);
		html+= '</table>'; // BS TAB START...		
		html +='</div><br/><br/>'; //pvCsDiv
		return html;
	}

/**********************************************************************************************
								FIN BAL SHEET HTML
**********************************************************************************************/


	function  getFinBalanceSheetHtml(id){
		var html ='<br/><div id="'+id+'Div">';

		html+=  mintHtmlUtil.getSpan( " Please note this will be discontinued in favor of more flexible/Powerful <b>FinStmtNew</b> Screener (Previous Tab). " , 'red',10);


		html+= '<table id="'+id+'CtrlTab" class="'+INDI_TABLE_STYLE+' "    >';
		for(var i=0;i< BAL_SHEET_AEBB_FIELDS.length ;i++) html+= csh.aebbStrut(BAL_SHEET_AEBB_FIELDS[i].id);
		for(var i=0;i< mtgv.cs.screenerData.csCagr.length;i++){
			if(mtgv.cs.screenerData.csCagr[i].type == id){
				html+= getCagrHtmlRow(mtgv.cs.screenerData.csCagr[i]);		
			}
		} 
		html+= '</table>'; // BS TAB START...		
		html+= getButtonP('Add To Screen CAGR Growth Of Balance Sheet Param' , 'csf.addCagr',id);
		html +='</div><br/><br/>'; //pvCsDiv
		return html;
	}

/**********************************************************************************************
								FIN QTRLY HTML
	**********************************************************************************************/


	function  getFinQtrlyHtml(id){
		var html ='<br/><div id="'+id+'Div">';

		html+=  mintHtmlUtil.getSpan( " Please note this will be discontinued in favor of more flexible/Powerful <b>FinStmtNew</b> Screener (Previous Tab). " , 'red',10);


		html+= '<table id="'+id+'CtrlTab" class="'+INDI_TABLE_STYLE+' "    >';
		for(var i=0;i< QTRLY_AEBB_FIELDS.length ;i++) html+= csh.aebbStrut(QTRLY_AEBB_FIELDS[i].id);

		for(var i=0;i< mtgv.cs.screenerData.csQoq.length;i++){
			if(mtgv.cs.screenerData.csQoq[i].type == id){
				html+= getQoqHtmlRow(mtgv.cs.screenerData.csQoq[i]);		
			} 
		} 	

		html+= '</table>'; // BS TAB START...	
		html+= getButtonP('Add To Screen QoQ Growth ' , 'csf.addQoq',id);	
		html +='</div><br/><br/>'; //pvCsDiv
		return html;
	}

/**********************************************************************************************
								FIN COMMON HTML
	**********************************************************************************************/




	function  getFinGenericHtml(id,aebbFields, type ){
		var html ='<br/><div id="'+id+'Div">';
		html+=  mintHtmlUtil.getSpan( " Please note this will be discontinued in favor of more flexible/Powerful <b>FinStmtNew</b> Screener (Previous Tab). " , 'red',10);

		html+= '<table id="'+id+'CtrlTab" class="'+INDI_TABLE_STYLE+'   "  >';
		for(var i=0;i< aebbFields.length ;i++) html+= csh.aebbStrut(aebbFields[i].id);
		for(var i=0;i< mtgv.cs.screenerData.csCagr.length;i++){
			if(mtgv.cs.screenerData.csCagr[i].type == id){
				html+= getCagrHtmlRow(mtgv.cs.screenerData.csCagr[i]);		
			}
		} 
		html+= '</table>'; // BS TAB START...		
		html+= getButtonP('Add To Screen CAGR Growth Of '+type+' Param' , 'csf.addCagr',id);
		html +='</div><br/><br/>'; //pvCsDiv
		return html;
	}
	

	function addCagr(type){
		var id =  myTsrScreener.getNextId('csCacgrId')
		var fieldsArr = getFieldArr(type);

		var obj={type:type,  id :id, field:fieldsArr[0].id, growDegro:GROW_DEGROW[0].id, cagr : CAGR_PERIOD[0].id ,
			 ops :BASIC_OPS[0].id,v1:null, v2:null, noData:true, hasData:true};
	 
		mtgv.cs.screenerData.csCagr.push(obj); 
		var html = getCagrHtmlRow(obj);
        $('#'+type+'CtrlTab').append(html);
        csu.dsf();
	}
	
	function getCagrHtmlRow(obj){
		var fieldsArr  = getFieldArr(obj.type);
		var tds = getCagrTds(obj, fieldsArr)
		var html= csh.dynTr(obj,getCagrTds(obj, fieldsArr) );
		return html;
	}	

	function getCagrTds(obj,fieldsArr){
		var id = obj.id;
		var func = 'csf.csCagrChg';
		var html = '';
		var aeebDef = getObjFrmArr(AEBB_MAP,obj.field);
		html+=  ' CAGR (%) ' + SP_3;
		html+=getDropDown(GROW_DEGROW, id+'growDegro', null,func, id, obj.growDegro);
		html+=  SP_3+ 'In' +SP_3;
		html+=getDropDown(CAGR_PERIOD, id+'cagr', null,func, id, obj.cagr);
		html+=  SP_3 ;
		html+= csh.opCompHtml(obj,func);
		var param = obj.type + ':'+id; // Vol Compare
		html+= SP_3 + csh.delIcon(param) ; // '<a  onClick="javascript:'+thisAlias+'.delRow(\''+delObj+'\');"><font size="4" color="red"><span class="glyphicon glyphicon-remove"></span></font> </a> ';
		return {td1:getDropDown(fieldsArr, id+'field', null,func, id, obj.field),td2 :html }
	}

	function csCagrChg(id){

		var field = $('#'+id+'field').val();
		var ops = $('#'+id+'ops').val();
		var growDegro = $('#'+id+'growDegro').val();
		var cagr = $('#'+id+'cagr').val();
		var v1 = $('#'+id+'v1').val();
		var v2 = $('#'+id+'v2').val();

		var cagrData = getCagrData(id);
		var type =cagrData.type;
		var tmpObj = {id:id,ops:ops,field:field,growDegro:growDegro, cagr:cagr, v1:v1,v2:v2, type : type};
		var fieldsArr  = getFieldArr(tmpObj.type);

		var tds = getCagrTds( tmpObj, fieldsArr);
		addMsgToDiv(''+id+'Td2Div', true, tds.td2);

		csu.valNSetAeb(id,ops,v1,v2, cagrData); // Sets  Ops, v1,v2
		if(cagrData.goodData){ //set others
			cagrData.field = field;
			cagrData.growDegro = growDegro;
			cagrData.cagr = cagr;
		}
		csu.dsf();
	}

//----------- Qoq 

	function addQoq(type){
		var id =  myTsrScreener.getNextId('csQoqId')
		var fieldsArr = getFieldArr(type);

		var obj={type:type,  id :id, field:fieldsArr[0].id, growDegro:GROW_DEGROW[0].id, qoq : QOQ_PERIOD[0].id ,
			 ops :BASIC_OPS[0].id,v1:null, v2:null, noData:true, hasData:true};
	 
		mtgv.cs.screenerData.csQoq.push(obj);  
		var html = getQoqHtmlRow(obj);
        $('#'+type+'CtrlTab').append(html);
        csu.dsf();
	}

	function getQoqHtmlRow(obj){
		var fieldsArr  = getFieldArr(obj.type);
		var tds = getQoqTds(obj, fieldsArr)
		var html= csh.dynTr(obj,getQoqTds(obj, fieldsArr) );
		return html;
	}	

	function getQoqTds(obj,fieldsArr){
		var id = obj.id;
		var func = 'csf.csQoqChg';
		var html = '';
		var aeebDef = getObjFrmArr(AEBB_MAP,obj.field);
		html+=  ' QoQ (%) ' + SP_3;
		html+=getDropDown(GROW_DEGROW, id+'growDegro', null,func, id, obj.growDegro);
		html+=  SP_3+ 'In' +SP_3;
		html+=getDropDown(QOQ_PERIOD, id+'qoq', null,func, id, obj.qoq);
		html+=  SP_3 ;
		html+= csh.opCompHtml(obj,func);
		var param = obj.type + ':'+id; // Vol Compare
		html+= SP_3 + csh.delIcon(param) ; // '<a  onClick="javascript:'+thisAlias+'.delRow(\''+delObj+'\');"><font size="4" color="red"><span class="glyphicon glyphicon-remove"></span></font> </a> ';
		return {td1:getDropDown(fieldsArr, id+'field', null,func, id, obj.field),td2 :html }
	}

	function csQoqChg(id){

		var field = $('#'+id+'field').val();
		var ops = $('#'+id+'ops').val();
		var growDegro = $('#'+id+'growDegro').val();
		var qoq = $('#'+id+'qoq').val();
		var v1 = $('#'+id+'v1').val();
		var v2 = $('#'+id+'v2').val();

		var qoqData = getQoqData(id);
		var type =qoqData.type;
		var tmpObj = {id:id,ops:ops,field:field,growDegro:growDegro, qoq:qoq, v1:v1,v2:v2, type : type};
		var fieldsArr  = getFieldArr(tmpObj.type);

		var tds = getQoqTds( tmpObj, fieldsArr);
		addMsgToDiv(''+id+'Td2Div', true, tds.td2);

		csu.valNSetAeb(id,ops,v1,v2, qoqData); // Sets  Ops, v1,v2
		if(qoqData.goodData){ //set others
			qoqData.field = field;
			qoqData.growDegro = growDegro;
			qoqData.qoq = qoq;
		}
		csu.dsf();
	}



// ---------------------- Qoq Ends ---------------



	function getFieldArr(type){
		var fieldsArr ;
		if(type == FIN_BAL_SHEET) fieldsArr = BAL_SHEET_AEBB_FIELDS;
		if(type == FIN_RATIO) fieldsArr = FIN_RATIO_AEBB_FIELDS;
		if(type == FIN_CASH_FLOW) fieldsArr = CASHFLOW_AEBB_FIELDS;
		if(type == FIN_INCOME) fieldsArr = INCOME_AEBB_FIELDS;
		if(type == FIN_QTRLY) fieldsArr = QTRLY_AEBB_FIELDS;
		return fieldsArr;
	}

	function getCagrData(id){
		var arr = mtgv.cs.screenerData.csCagr;
		for(var i=0;i< arr.length;i++){
			if(id == arr[i].id ) return  arr[i];
		}
		return null;
	}

	function getQoqData(id){
		var arr = mtgv.cs.screenerData.csQoq;
		for(var i=0;i< arr.length;i++){
			if(id == arr[i].id ) return  arr[i];
		}
		return null;
	}


	function validateFinancials(validResults){
		var scrData = mtgv.cs.screenerData;
		for(var i=0;i<scrData.csCagr.length;i++){
			obj = scrData.csCagr[i];
			if(obj.hasData ){
				// var cagr = getCagrObject(obj.field);
				var cagr =getObjFrmArr(  AEBB_MAP, obj.field );
				var selParam  = obj.type + ':'+obj.id
				obj.csType = obj.type;
				if(obj.goodData){
					var ops = getObjFrmArr( BASIC_OPS,  obj.ops); 
					var grow = getObjFrmArr( GROW_DEGROW,  obj.growDegro); 
					var period = getObjFrmArr( CAGR_PERIOD,  obj.cagr); 
					var text  = '  '+cagr.label + ' CAGR ' + grow.label +' in '  +  period.label+ ' ' + ops.label +' ' + obj.v1 ; 
					if(ops.id == CS_BETWEEN) text+= ' And ' +obj.v2;
					text+= ' %'
					// validResults.validFields+= getSpan(text, 'green', CS_SEL_FONT_SIZE) + '<br/>';
					// validResults.validFieldCount++;

					csh.cdt(obj,text, validResults, selParam, true);
					// validResults.validFieldCount++;

				}else{
					// validResults.invalidFields += getSpan( 'Invalid value for ' + cagr.label +' CAGR Comparision' ,'red',CS_SEL_FONT_SIZE)+' <br/>';	
					csh.cdt(obj,'Invalid value for ' + cagr.label +' CAGR Comparision' , validResults, selParam, false);

				}
			}
		}

		for(var i=0;i<scrData.csQoq.length;i++){
			obj = scrData.csQoq[i];
			if(obj.hasData ){
				// var cagr = getCagrObject(obj.field);
				var qoq =getObjFrmArr(  AEBB_MAP, obj.field );
				var selParam  = obj.type + ':'+obj.id
				obj.csType = obj.type;
				if(obj.goodData){
					var ops = getObjFrmArr( BASIC_OPS,  obj.ops); 
					var grow = getObjFrmArr( GROW_DEGROW,  obj.growDegro); 
					var period = getObjFrmArr( QOQ_PERIOD,  obj.qoq); 
					var text  = '  '+qoq.label + ' QoQ ' + grow.label +' in '  +  period.label+ ' ' + ops.label +' ' + obj.v1 ; 
					if(ops.id == CS_BETWEEN) text+= ' And ' +obj.v2;
					text+= ' %'
					// validResults.validFields+= getSpan(text, 'green', CS_SEL_FONT_SIZE) + '<br/>';
					// validResults.validFieldCount++;

					csh.cdt(obj,text, validResults, selParam, true);
					// validResults.validFieldCount++;

				}else{
					// validResults.invalidFields += getSpan( 'Invalid value for ' + qoq.label +' QoQ Comparision' ,'red',CS_SEL_FONT_SIZE)+' <br/>';	
					csh.cdt(obj,'Invalid value for ' + qoq.label +' QoQ Comparision' , validResults, selParam, false);					
				}
			}
		}

	}


/**********************************************************************************************
								FIN END HTML
**********************************************************************************************/





	return {

		basicHtm : getFinBasicHtml,
		finRatio : getFinRatioHtml,
		finBal : getFinBalanceSheetHtml,
		finGen : getFinGenericHtml,
		finQtr : getFinQtrlyHtml,
		addCagr : addCagr,
		csCagrChg : csCagrChg,

		addQoq : addQoq,
		csQoqChg : csQoqChg,

		vf : validateFinancials
	}

})(); // module 		

