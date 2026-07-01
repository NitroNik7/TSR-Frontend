


var cspp =  (function () {

	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;

	var thisObject = 'cspp';


	var PP_CO = AB_CO_OPS.slice();
	

	var CPR_CS_RPT = [

          { id: "cprPriceAbvTc", label : "Price Above TC" },
          { id: "cprCrossedAbvTc", label : "Price Crossed Above TC" },

          { id: "cprPriceBlwBc", label : "Price Below BC" },
          { id: "cprCrossedBlwBc", label : "Price Crossed Below BC" },

          { id: "tcAbvBc", label : "TC Above BC" },
          { id: "tcBelowBc", label : "TC Below BC" },

           { id: "cprNarrow", label : "Narrower CPR" },
           { id: "cprInside", label : "Inside CPR" },

           { id: "cprHighOl", label : "Higher Overlapping CPR" },
           { id: "cprLowOl", label : "Lower Overlapping CPR" },
           
           { id: "cprVirginSup", label : "Virgin CPR Support" },
           { id: "cprVirginRes", label : "Virgin CPR Resistance" },
	];

	let FIB_LEVELS = [
		{ id: "23.6", label : "23.6 %" },
		{ id: "38.2", label : "38.2 %" },
		{ id: "50", label : "50 %" },
		{ id: "61.8", label : "61.8 %" },
		{ id: "78.6", label : "78.6 %" },
		{ id: "custom", label : "Custom" },
	];

	let SWING_PERIOD = [
		{ id: "st", label : "Short Term" },
		{ id: "mt", label : "Medium Term" },
		{ id: "lt", label : "Long Term" },
		{ id: "cust", label : "Custom Swing Period" },
	];

	let SWING_PERIOD_FX = [
		{ id: "prevDay", label : "Previous Day" },
		{ id: "1W", label : "One Week" },
		{ id: "2W", label : "Two Weeks" },
		{ id: "1M", label : "One Month" },
		{ id: "3M", label : "Three Months" },
		{ id: "6M", label : "6 Months" },
		{ id: "1Y", label : "1 Year" },
		{ id: "2Y", label : "2 Year" },
		{ id: "3Y", label : "3 Year" },
		{ id: "4Y", label : "4 Year" },
		{ id: "5Y", label : "5 Year" },
	];

	let FIB_PERIOD_CAT = [
		{ id: "swingPeriod", label : "Swing Period" ,  list : SWING_PERIOD },
		{ id: "fixedPeriod", label : "Fixed Period" ,  list : SWING_PERIOD_FX},
	];

	let SWING_TYPE=[
		{ id: "ret", label : "Retracement" },
		// { id: "ret", label : "Extention" },
		// { id: "ret", label : "Projection" },
	];

	let RETRACE_TYPE  =[
		{ id: "lth", label : "Low To High" },
		{ id: "htl", label : "High To Low" },
		

	];

	let FIB_FIELD  =[

		{ id: "close", label : "High To Low" },
		{ id: "hl", label : "Low To High" },
	];


	let  FIB_OPS  = AB_CO_OPS_BASIC.slice();
	FIB_OPS.push( OPS_BETWEEN);
	FIB_OPS.push( OPS_WITHIN);

	FIB_OPS.push({id: 'tknSupNvrBreach', label:'Taken Support Never Breached'});
	FIB_OPS.push({id: 'tknResNvrBreach', label:'Taken Resistance  Never Breached'});

	FIB_OPS.push({id: OL_SUP, label:'Taken Recent Support'});
	FIB_OPS.push({id: OL_RES, label:'Taken Recent Resistance'});


	var MINS_CO_PP = MINS_CO_INT.slice();
	MINS_CO_PP.unshift({id: "-1", label: "Today"});

	function getPpHtml(id){

		if(!jsu.isMigContext()){

			if(jsu.arrayContainsId(CS_CO_ABV_WITHIN)){
				PP_CO.push({id: CS_CO_ABV_WITHIN, label:'Cross Above in last N Mins'});
				PP_CO.push({id: CS_CO_BLW_WITHIN, label:'Cross Below in last N Mins'});
			}
		}
		var html ='<br/><div id="'+id+'Div">';
		html+= '<table id="ppCtrlTab" '+TAB_INDI_STYLE+'   >';

		html+= getAllRows();

		html+= '</table>';

		html+= getControls();

		html+='<br/>';
		html+='<br/>';

/*
		html+='<div '+CS_HELP_DIV_STYLE +'>'; 


		var  helpText = " Click on <b>Compare Price With Pivot Levels</b> to configure Pivot screeners. "

		+" You can add as comparison many as you want. For ex Above R3 and  Camarilla R4 and Fib R3 for a good break out "
		
		+"<br/><br/><b>Supported Pivots</b> - Standard Pivot , Carmarilla , Fibbonacci, Woodies And Demark"
		+"<br/><br/><b>Latest Price </b> is latest tick price during Market Hours and EOD price after market Hours "

		+"<br/> <b>For Above / Below</b>Always Latest Price is used "
		
		+"<br/> For <b>Cross Above / Below</b> For Daily Pivot Levels , supported ticks are 5 / 10 /15 / 30 / 60 /120 Mins "
		+"<br/>For Weekly / Monthly Pivot Levels , supported ticks All Except weekly / Monthly "
		+"<br/> Not matching above criteria will be ignored "


		+"<br/> For <b>Within</b>Latest Price should be within tolerance %. "
		+"<br/>For Example for Rs 100 R3 , tolerance of 1 % means range of 99 to 101"

		+"<br/> For <b>More than</b>Latest Price should be More than tolerance  %. "
		+"<br/>For Example for Rs 100 R3 , tolerance of 1 % means above  101 or lesss than 99";

		helpText += '<br/> '

		html+=  getSpan(helpText,  'grey', 10);

		// html+= BR_2 + getSpan(ohlcComp,  'grey', 10);

		html+='</div>';
*/

		return html;

		// return html;
	}




	function getAllRows(){

		let html =''

		var scrData = mtgv.cs.screenerData;

		for(var i=0;i<scrData.ppComp.length;i++){
			html+=getPpLevelsHtml(scrData.ppComp[i]);
		}

		for(var i=0;i<scrData.cprComp.length;i++){
			html+=getCprHtml(scrData.cprComp[i]);
		}


		for(var i=0;i<scrData.fibrComp.length;i++){
			html+=getFibrHtml(scrData.fibrComp[i]);
		}

		return html;
	}


	function getFormRow(type, id, state){ //MA_PRICE_OPTIONS
		// var scrData = mtgv.cs.screenerData;
		// let objList = scrData[type+'Comp'];

		// let obj =  jsu.getObjFrmArr(objList, id)

		let obj =   csu.gso(type, id)


		if(jsu.isNotNull(state)){
			if(state == 'enable')  obj.disabled  = false;
			if(state == 'disable') obj.disabled  = true	;
		}else{
			 obj.disabled  = false;
		}

		if(type=='pp'){
    	    return getPpLevelsHtml(obj);
    	}else if(type=='cpr'){
    	    return getCprHtml(obj);    
		}else if(type=='fibr'){
    	    return getFibrHtml(obj);
		}
	}



	function getFormTd(type, id, state){ //MA_PRICE_OPTIONS
		// var scrData = mtgv.cs.screenerData;
		// let objList = scrData[type+'Comp'];

		// let obj =  jsu.getObjFrmArr(objList, id)

		let obj =   csu.gso(type, id)


		if(jsu.isNotNull(state)){
			if(state == 'enable')  obj.disabled  = false;
			if(state == 'disable') obj.disabled  = true	;
		}else{
			 obj.disabled  = false;
		}

		if(type=='pp'){
    	    return getTD(obj);
    	}else if(type=='cpr'){
    	    return getCprTD(obj);    
		}else if(type=='fibr'){
    	    return getFibrTD(obj);
		}
	}


	function getControls(){

		let html= ''

		html+= SP_3 + getButtonP('Price / Pivot Levels' , 'cspp.addPivot', 'pp');

		html+= SP_3 + getButtonP('Central Pivot Levels' , 'cspp.addPivot', 'cpr');

		if(mtgv.mtpp.crossFreq  && mtgv.mtpp.pr   ){
			html+= SP_3 + getButtonP('Fibonacci Retracement' , 'cspp.addPivot', 'fibr');
		}else{
			html+= SP_3 + htmlU.gdb('Fibonacci Retracement', AVAIL_HIGH_PLAN);

		}

		return html;

	}

	function addPivot(type){

		let json = addNewFilter(type);
		
    	$('#ppCtrlTab').append(json.html  );

    	addFilterChange(type , json.id);
    	   
	}


	function addNewFilter(type){

		var scrData = mtgv.cs.screenerData;
		var id =  myTsrScreener.getNextId(type +'CompId');

		let html =''

		if(type=='pp'){
			var id =  myTsrScreener.getNextId(type +'PPId');

			var ppObj={ id :id, ops:PP_CO[0].id, ppVal: pivot_fields[0].id ,type:type, tolVal : 1, coMin : MINS_CO_INT[0].id};
			var scrData = mtgv.cs.screenerData;
			scrData.  ppComp.push(ppObj);
			html = getPpLevelsHtml(ppObj);


		}else if(type=='cpr'){
			var id =  myTsrScreener.getNextId(type +'CprId');

			var cprObj={ id :id,   rpt:CPR_CS_RPT[0].id, type:type,  ppTick:getFreqMap()[0].id ,  coMin : MINS_CO_PP[1].id};
			var scrData = mtgv.cs.screenerData;
			scrData.cprComp.push(cprObj);

			html = getCprHtml(cprObj);

		}else if(type=='fibr'){

			var id =  myTsrScreener.getNextId(type +'Id');

			var fibrObj={ id :id, 	ops:'tknSupNvrBreach' 		,	retType: RETRACE_TYPE[0].id ,
					 fibrPerCat : 	FIB_PERIOD_CAT[0].id   	,	speriod : SWING_PERIOD[0].id   ,
					 speriodf 	: 	SWING_PERIOD_FX[0].id   , 	levels : FIB_LEVELS[1].id
			};

			var scrData = mtgv.cs.screenerData;
			scrData.fibrComp.push(fibrObj);
	    	html =  getFibrHtml(fibrObj);
		}

		return { html : html , id : id};

	}



	function addFilterChange(type, id){ //MA_PRICE_OPTIONS
		
		if(type=='pp'){
    	    ppChg(id);
		}else if(type=='cpr'){
    	    cprChg(id);
		}else if(type=='fibr'){
    	    fibrChg(id);
		}

        csu.dsf(); // displaySelectedFields();
	}



	function getPpLevelsHtml(ppObj){


		var html = '<tr id='+ppObj.id+'>' + getTD(ppObj) + '</tr>';

		return html;
		

	}


	

	function ppChg(id){

		var ppOps = $('#'+id+'ppOps').val();
		// var ppVal = $('#'+id+'ppVal').val();
		// var ppTick = $('#'+id+'ppTick').val();
		// var arr


		csu.setProp(mtgv.cs.screenerData.ppComp, ['ppOps','ppVal','ppTick','tolPc' , 'coMin'],id);

		var ppObj = getObjFrmArr(mtgv.cs.screenerData.ppComp, id);

		// var tolPc = null;
		// if(ppOps == 'within'){
		// 	tolPc = $('#'+id+'ppOps').val();
		// 	var tr = 


		// }

		var tr = getTD(ppObj);

		addMsgToDiv(''+id+'Td2Div', true, tr);		
		csu.setProp(mtgv.cs.screenerData.ppComp, ['ppOps','ppVal','ppTick','tolPc' , 'coMin'],id);
		csu.dsf(); // displaySelectedFields();

	}


	function getTD(ppObj){

		var id = ppObj.id;
		var func = 'cspp.ppChg';

		let td2 = doBold('Pivot Levels : ');

		td2 += 'Latest Price' + SP_3 +   getDropDown(PP_CO, id+'ppOps', 'width:100px',func, id, ppObj.ppOps);

		if(ppObj.ppOps == WITHIN || ppObj.ppOps == MORE_THAN ){
			// tolVal = jsu.isNotNull(ppObj.tolval) ? ppObj.tolval : 1;
			td2 += SP_3 + getDropDown(PC_COMP_LOW, id+'tolPc', 'width:100px',func, id, ppObj.tolPc);
		}


		td2+= SP_3 + getDropDown(pivot_fields, id+'ppVal', null,func, id, ppObj.ppVal);
		td2+= SP_3 + 'On' + SP_3 + getDropDown(getFreqMap(), id+'ppTick', null,func, id, ppObj.ppTick) + SP_3 + 'Tick';

		if(ppObj.ppOps == CS_CO_ABV_WITHIN || ppObj.ppOps == CS_CO_BLW_WITHIN ){
			// tolVal = jsu.isNotNull(ppObj.tolval) ? ppObj.tolval : 1;
			td2 += ' Within ' + SP_3 +  getDropDown(MINS_CO_INT, id+'coMin', 'width:100px',func, id, ppObj.coMin);
		}


		// var html = csh.opCompHtml(tecObj, func);
		var param = ppObj.type + ':'+id; // Vol Compare

		td2 += csh.gept(ppObj, PP_CS,  param);

		td2+= SP_3 + csh.delIcon(param) ;


		
				 // + createTd(   , CS_LABEL_WIDTH) 
		var td =  createTd(createDiv(ppObj.id+'Td2Div', td2, null));

				 
    	return td;

	}
 

	function validatePP(params){
		var ppComp = params.scrData.ppComp;


		for( var i=0 ;i<ppComp.length ;i++ ){
			var obj = ppComp[i];


			var ppOps =  getObjFrmArr(PP_CO , obj.ppOps) ;  // getDropDown(AB_CO_OPS, id+'ppOps', 'width:100px',func, id, ppObj.ppOps);

			var ppVal =  getObjFrmArr(pivot_fields , obj.ppVal) ;  // getDropDown(AB_CO_OPS, id+'ppOps', 'width:100px',func, id, ppObj.ppOps);

			var ppTick =  getObjFrmArr(getFreqMap() , obj.ppTick) ;  // getDropDown(AB_CO_OPS, id+'ppOps', 'width:100px',func, id, ppObj.ppOps);

			var text = doBold('Pivot Levels : ');

			if( ( params.scrData.scrFreq =='W' || params.scrData.scrFreq =='M' )  && (ppOps.id == CS_CO_ABV || ppOps.id == CS_CO_BLW  ) ){
				text += " Cross Above / Below is not supported on Weekly / Monthly Ticks "    ;

				obj.goodData = false;
			}else{
				text += 'Latest price   ' ;
				text+= ppOps.label
				if(obj.ppOps == WITHIN || obj.ppOps == MORE_THAN ){
					var tolPc =  getObjFrmArr(PC_COMP_LOW , obj.tolPc) ; 
					text+=  " " + tolPc.label; 	
				} 

				text += " " + ppVal.label  ;

				text += " on " + ppTick.label + " Tick" ;


				if(obj.ppOps == CS_CO_ABV_WITHIN || obj.ppOps == CS_CO_BLW_WITHIN ){
					var coMin =  getObjFrmArr(MINS_CO_INT , obj.coMin) ; 
					text+=  " In last " + coMin.label; 	
				}

				obj.csType = PP_CS;
				obj.goodData = true;
			}

			var selParam  =  'pp:'+ obj.id;
			var json = 	csh.cdt(obj, text, params ,selParam, obj.goodData);
		}
	}

//	 -------------CPR
	function getCprHtml(cprObj){

		var html = '<tr id='+cprObj.id+'>' + getCprTD(cprObj) + '</tr>';
		return html;
	}

	function getCprTD(cprObj){

		var id = cprObj.id;
		var func = 'cspp.cprChg';


		let td2 = doBold('Central Pivot : ');


		td2 += getDropDown(CPR_CS_RPT, id+'rpt', null,func, id, cprObj.rpt)

		td2+= SP_3 + 'On' + SP_3 + getDropDown(getFreqMap(), id+'ppTick', null,func, id, cprObj.ppTick) + SP_3 + 'Tick';

		if(cprObj.rpt == 'cprCrossedAbvTc' || cprObj.rpt == 'cprCrossedBlwBc' ){
			td2+= SP_3 +' Within last ' + SP_3 +  getDropDown(MINS_CO_PP, id+'coMin', 'width:100px',func, id, cprObj.coMin);
		}

		var param = cprObj.type + ':'+id; // Vol Compare

		td2+= csh.gept(cprObj, PP_CS,  param);

		td2+= SP_3 + csh.delIcon(param) ;

		var td =  createTd(createDiv(cprObj.id+'Td2Div', td2, null));
    	return td;
	}
/*
	function addCpr(type){

		let json = addNewFilter(type);
		
    	$('#ppCtrlTab').append(json.html  );

    	addFilterChange(type , json.id);

		
    	// $('#ppCtrlTab').append( );

    	//  cprChg(id);   
    	   
	}
*/
	function cprChg(id){

		csu.setProp(mtgv.cs.screenerData.cprComp, ['rpt','ppTick', 'coMin'],id);

		var cprObj = getObjFrmArr(mtgv.cs.screenerData.cprComp, id);

		var tr = getCprTD(cprObj);

		addMsgToDiv(''+id+'Td2Div', true, tr);		
		csu.setProp(mtgv.cs.screenerData.cprComp,  ['rpt','ppTick', 'coMin'],id);
		csu.dsf(); // displaySelectedFields();
	}


	function validateCpr(params){
		var cprComp = params.scrData.cprComp;

		for( var i=0 ;i<cprComp.length ;i++ ){
			var obj = cprComp[i];

			var rpt =  getObjFrmArr(CPR_CS_RPT , obj.rpt) ;  
		
			var ppTick =  getObjFrmArr(getFreqMap() , obj.ppTick) ; 

			var text = ''

			text += doBold('Central Pivot : ')

			text += rpt.label  ;

			text += " on " + ppTick.label + " Tick" ;

			if(obj.rpt == 'cprCrossedAbvTc' || obj.rpt == 'cprCrossedBlwBc' ){
				var coMin =  getObjFrmArr(MINS_CO_PP , obj.coMin) ; 
				text+=  " In last " + coMin.label; 	
			}

			obj.csType = PP_CS;
			obj.goodData = true;

			var selParam  =  'cpr:'+ obj.id;
			var json = 	csh.cdt(obj, text, params ,selParam, obj.goodData);
		}
	}


	// Fibonacci Retracement ...

	function getFibrHtml(fibrObj){

		var td =  createTd(createDiv(fibrObj.id+'Td2Div', getFibrTD(fibrObj), null));

		var html = '<tr id='+fibrObj.id+'>' + td + '</tr>';
		return html;
	}	

	function getFibrTD(fibrObj){

		var id = fibrObj.id;
		
		var func = 'cspp.fibrChg';

		let  td = '<b> Fibonacci : </b> Price Retracing from ';

		
		
		
		td +=	 SP_3+  htmlU.getDropDown(FIB_PERIOD_CAT, id+'fibrPerCat', null,func, id, fibrObj.fibrPerCat) ;
		

		

		if(fibrObj.fibrPerCat == 'swingPeriod'){
			
			td += SP_3 + ' on '+ htmlU.getDropDown(RETRACE_TYPE, id+'retType', null,func, id, fibrObj.retType) ;

			td += SP_3 +' on ' + htmlU.getDropDown(SWING_PERIOD, id+'speriod', null,func, id, fibrObj.speriod) ;

			if(fibrObj.speriod == 'cust'){

				if( jsu.isNull(fibrObj.lticks)){
					fibrObj.lticks = 35;
				}


				td+= BR_2   + ' Swing(high/lows) formed within last '
				 +   getInputTxtParam( id+'lticks' , 5, fibrObj.lticks, func , id)	
				 + ' Ticks '
				 ;
			}

		}else{
		
			td += SP_3 +' on ' + htmlU.getDropDown(SWING_PERIOD_FX, id+'speriodf', null,func, id, fibrObj.speriodf) ;
		}

		td+= BR_2  ;

		td += ' Now ' + htmlU.getDropDown(FIB_OPS, id+'ops', null,func, id, fibrObj.ops) ;

		td += SP_3+ htmlU.getDropDown(FIB_LEVELS, id+'levels', null,func, id, fibrObj.levels) ;

		if(fibrObj.levels =='custom'){
			td += SP_2 + getInputTxtParam( id+'clevel1' , 5, fibrObj.clevel1, func , id) + ' %'	;	
		}
		

		if(fibrObj.ops == WITHIN ){
			td += SP_2 + ' Within ' + getInputTxtParam( id+'within' , 5, fibrObj.within, func , id)+ ' %'	;
		}


		if(fibrObj.ops == CS_BETWEEN ){
			td +=  ' and ' ;
			td += htmlU.getDropDown(FIB_LEVELS, id+'level2', null,func, id, fibrObj.level2) ;

			if(fibrObj.level2 =='custom'){
				td += SP_2 + getInputTxtParam( id+'clevel2' , 5, fibrObj.clevel2, func , id)+ ' %'	;
			}
		}

		td+= ' Levels';

		var param = 'fibr' + ':'+id; // Vol Compare

		td+= csh.gept(fibrObj, PP_CS,  param);
		td += SP_3 + csh.delIcon(param) ;


		return td;



	}


	function fibrChg(id){

		let FIELD_SET = ['retType','fibrPerCat', 'speriod' ,'lticks' , 'speriodf' , 'ops' 
			, 'levels' , 'level2' , 'clevel1' ,'clevel2'  , 'within'];


		csu.setProp(mtgv.cs.screenerData.fibrComp, FIELD_SET,id);

		var fibrObj = getObjFrmArr(mtgv.cs.screenerData.fibrComp, id);

		var tr = getFibrTD(fibrObj);
		var goodData = true;

		// --- 

		addMsgToDiv(''+id+'Td2Div', true, tr);

		// let id = fibrObj.id;

		if(fibrObj.fibrPerCat == 'swingPeriod'){
			if(fibrObj.speriod == 'cust'){
				if(!jsu.isIntegerInput( id+'lticks'  ) ||			!jsu.inputNumberRange(id+'lticks' , 5,400  )){
					goodData = false;
				}
			}
		}

		if(fibrObj.levels =='custom'){
			if(	!jsu.inputNumberRange(id+'clevel1' , 1,99  )){
					goodData = false;
				}
		}
		if(fibrObj.ops == CS_BETWEEN ){
			if(fibrObj.level2 =='custom'){
				if(	!jsu.inputNumberRange(id+'clevel2' , 1,99  )){
						goodData = false;
					}
			}
		}

		


		csu.setProp(mtgv.cs.screenerData.fibrComp, FIELD_SET,id);

		fibrObj.goodData = goodData;

		csu.dsf(); // displaySelectedFields();
	}

	function valiFibr(params){

		for( var i=0 ;i<mtgv.cs.screenerData.fibrComp.length ;i++ ){
			var fibrObj = mtgv.cs.screenerData.fibrComp[i];

			let text =''
			// hard coding 
			if(fibrObj.goodData ){
				text = doBold('Fibonacci ')+ 'Price Retracing from '

				

				if(fibrObj.fibrPerCat == 'swingPeriod'){
					var retraceType = getObjFrmArr( RETRACE_TYPE,  fibrObj.retType); 

					text += ' ' +	 retraceType.label;

					var fibCat = getObjFrmArr( FIB_PERIOD_CAT,  fibrObj.fibrPerCat); 

					text += ' on ' + fibCat.label;


					var swingperiod = getObjFrmArr( SWING_PERIOD,  fibrObj.speriod); 

					text += ' ' + swingperiod.label;

					if(fibrObj.speriod == 'cust'){
						text +=  ' Swing(high/lows) formed within last ' + fibrObj.lticks + ' Ticks'
					}
				}else{
					
					var fibCat = getObjFrmArr( FIB_PERIOD_CAT,  fibrObj.fibrPerCat); 

					text += ' on ' + fibCat.label;


					var swingperiod = getObjFrmArr( SWING_PERIOD_FX,  fibrObj.speriodf); 

					text += ' on ' + swingperiod.label;
				}

				var ops = getObjFrmArr( FIB_OPS,  fibrObj.ops); 

				text += ' Now ' + ops.label;

				var levels = getObjFrmArr( FIB_LEVELS,  fibrObj.levels); 				

				if(fibrObj.levels =='custom'){
					text += ' ' + fibrObj.clevel1  +' %'
				}else{
					text +=  levels.label ;
				}

				if(fibrObj.ops == CS_BETWEEN ){
					var levels = getObjFrmArr( FIB_LEVELS,  fibrObj.level2); 				
					if(fibrObj.level2 =='custom'){
						text += ' and ' + fibrObj.clevel2  +' %'
					}else{
						text +=  levels.label ;
					}
				}
				text += ' levels';

			}else{
				text = ' Invalid config for Fibonacci Levels'
			}

			
			fibrObj.csType = PP_CS;
			var selParam  =  'fibr:'+ fibrObj.id;
			var json = 	csh.cdt(fibrObj, text, params ,selParam, fibrObj.goodData);

		}

	}


	function getCustScrFilter(filer , defFilter){
		// var filer = [];
		
		filer.push({  id :  "ppComp" , label : 'Pivot Point'    , tab : PP_CS, 
			type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addPivot' , params:  'pp' } , subDef :pivot_fields , mobFilter: "pivotCs_pricePivotLevel" }) ;  //   JavaScript:cscmn.atn('price','priceCs');


		filer.push({  id :  "cprComp" , label : 'Central Pivot Point'  ,  tab : PP_CS, 
			type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addPivot' , params:  'cpr' } , subDef : CPR_CS_RPT , mobFilter: "pivotCs_centralPivotLevel"}) ;  //   JavaScript:cscmn.atn('price','priceCs');

		if( mtgv.mtpp.crossFreq){
			let obj = {  id :  "fibrComp" , label : 'Fibonacci Retracement'  ,  tab : PP_CS, 
				type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addPivot' , params:  'fibr' } , subDef : [] , mobFilter: "pivotCs_FibRetracement"}

			filer.push(obj) ;  //   JavaScript:cscmn.atn('price','priceCs');



		}

		return filer ;
	}



	function getFreqMap(){

		var PP_FREQ_MAP = FREQ_EOD_MAP.slice();

		if(mtgv.mtpp.crossFreq){
			if(!jsu.arrayContainsId(PP_FREQ_MAP, FREQ_QTR)){
				 PP_FREQ_MAP.push(FREQ_QTR_OBJ);
			}
			PP_FREQ_MAP.push( FREQ_YR_OBJ);
		}

		return PP_FREQ_MAP;

	}


	function ngSearch(item, filterDef, params ){
		paintFilterRow(params);
	}

	function paintFilterRow(type) {
		// { html: html, id: id }

		mtgv.cs.editActive = [];
		let newFilterRow = addNewFilter(type);

		let filterTable = $("#" + CS_FILTERS_TABLE);
		
		// filterTable.append(getFormRow(type, newFilterRow["id"]));
		filterTable.append(newFilterRow.html);

		mtgv.cs.editActive.push(newFilterRow); 
		
		addFilterChange(type, newFilterRow["id"]);

		csh.sib(false);
	}



	return {

		// New Starts 

		gar : getAllRows,

		gfr : getFormRow,

		gftd : getFormTd,

		anf : addNewFilter,

		afc : addFilterChange,

		pfr : paintFilterRow,
		ngs : ngSearch,

		// New Ends

		addPivot : addPivot,

		ppht : getPpHtml,
		// addPP : addPP,
		ppChg : ppChg,
		vpp : validatePP,


		// addCpr : addCpr,
		cprChg : cprChg,
		vcpr : validateCpr,

		// addFibr : addFibr,
		fibrChg : fibrChg,
		vfr : valiFibr,


		gcsf : getCustScrFilter,

		ppFreq : getFreqMap



		// addTech : addTech,
		// tecChg : tecChg,
		// tecCoChg : tecCoChg,
		// ichiChg : ichiChg,

		// vt : validateTech

	}

})(); // module 	
