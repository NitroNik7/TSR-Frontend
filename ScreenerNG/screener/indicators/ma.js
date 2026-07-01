


/**********************************************************************************************
								MOV AVG HTML
**********************************************************************************************/


// var MA_PRICE_OPTIONS = AB_CO_OPS_WITH_PT;

// var MA_PRICE_OPTIONS =[
// 		{id: CS_ABOVE, label: "Above"},
// 		{id: CS_BELOW, label: "Below"},
// 		{id: "maCa", label: "Cross Above"},
// 		{id: "maCb", label: "Cross Below"},
// 	];





var csma =  (function () {

	var thisObject = 'csma';

	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;

	var MAX_MA = 200;  // maxMa
/*
	var TREND_MA_RANGE = [
		{id: "5", label:'5'},
		{id: "10", label:'10'},
		{id: "15", label:'15'},
		{id: "20", label:'20'},
		{id: "25", label:'25'},
		{id: "30", label:'30'},
		{id: "40", label:'40'},
		{id: "50", label:'50'},
		{id: "100", label:'100'},
		{id: "200", label:'200'},
	];
*/

	var FAKE_BO_BD = [
			{id: "maFbo", label:'Fake Break Out'},
			{id: "maFbd", label:'Fake Break Down'}
		];

	var FAKE_PRICE_FIELD =[
		{id: CLOSE, label:'Close'},
		{id: 'high', label:'High Only'},
		{id: 'low', label:'Low Only'},
	];


	var BOUNCE_FROM = [
		{id: 'maSuppBounce', label:'Support'},
		{id: 'maResisBounce', label:'Resistance'},
	];


	var MA_TREND = [
		{id: NA_VAL, label: 'Any Trend'},
		{id: 'maRise', label:'Rising'},
		{id: 'maFall', label:'Falling'},
	];


	function getMaHtml(id){
		
		var html ='';
		var html ='<br/><div id="'+id+'Div">';
		html+= '<table id="maCtrlTab" '+TAB_INDI_STYLE+'   >';

		html+= getAllRows();

		html+= '</table>';
		
		html+= getControls();

		html+='<br/>';
		html+='<br/>';

		html+='</div>';

		return html;
	}


	function getAllRows(){
		var scrData = mtgv.cs.screenerData;
		let html= ''

		for(var i=0;i<scrData.pmaComp.length;i++){
			html+=getPmaHtml(scrData.pmaComp[i]);
		}

		for(var i=0;i<scrData.macoComp.length;i++){
			html+=getMacoHtml(scrData.macoComp[i]);
		}

		for(var i=0;i<scrData.maTrendComp.length;i++){
			html+=getMaTrendHtml(scrData.maTrendComp[i]);
		}

		for(var i=0;i<scrData.maFakeBreakComp.length;i++){
			html+=getMaFakeBreakHtml(scrData.maFakeBreakComp[i]);
		}

		for(var i=0;i<scrData.maSupResBounceComp.length;i++){
			html+=getMaSupResBounceHtml(scrData.maSupResBounceComp[i]);
		}

		for(var i=0;i<scrData.maConComp.length;i++){
			html+=getMaConHtml(scrData.maConComp[i]);
		}

		for(var i=0;i<scrData.maDivComp.length;i++){
			html+=getMaDivHtml(scrData.maDivComp[i]);
		}


		for(var i=0;i<scrData.maHistComp.length;i++){
			html+= maDiy.ghr(scrData.maHistComp[i]);
		}
		// 

		for(var i=0;i<scrData.maOlComp.length;i++){
			html+= maOlDiy.gmo(scrData.maOlComp[i]);
		}

		return html;
	}


	function getFormRow(type, id , state){ //MA_PRICE_OPTIONS
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

		if(type=='pma'){
    	    return getPmaHtml(obj);
		}else if(type=='maco'){
    	    return getMacoHtml(obj);
		}else if(type=='maTrend'){
    	    return getMaTrendHtml(obj);
		}else if(type == 'maFakeBreak'){
    	    return getMaFakeBreakHtml(obj);
		}else if(type == 'maSupResBounce'){
    	    return getMaSupResBounceHtml(obj);
		}else if(type == 'maCon'){
    	    return getMaConHtml(obj);
		}else if(type == 'maDiv'){
    	    return getMaDivHtml(obj);
    	}else if(type == 'maHist'){
    	    return maDiy.ghr(obj );
		}else if(type == 'maOl'){
    	    return maOlDiy.gmo(obj );
		}
	}


	function getFormTd(type, id , state){ //MA_PRICE_OPTIONS
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

		if(type=='pma'){
    	    return getPricemaTd2(obj);
		}else if(type=='maco'){
    	    return getMacoTd(obj);
		}else if(type=='maTrend'){
    	    return getMaTrendTd(obj);
		}else if(type == 'maFakeBreak'){
    	    return getMaFakeBreakTd(obj);
		}else if(type == 'maSupResBounce'){
    	    return getMaSupResBounceTd(obj);
		}else if(type == 'maCon'){
    	    return getMaConTd(obj);
		}else if(type == 'maDiv'){
    	    return getMaDivTd(obj);
    	}else if(type == 'maHist'){
    	    return maDiy.gftd(obj );
		}else if(type == 'maOl'){
    	    return maOlDiy.gftd(obj );
		}
	}



	function getControls(){

		let html= ''

		html+= SP_3 + getButtonP('Compare Price & MA' , 'csma.addMa', 'pma');
		html+= SP_3 + getButtonP("Compare Two MA's " , 'csma.addMa', 'maco');

		// if(mtgv.mtpp.TRENDING_MA_OPS.length >0){
		// 	html+= SP_3 + getButtonP('Trending MA ' , 'csma.addMa', 'maTrend');
		// 	html+= SP_3 + getButtonP('DIY Hist Compare ' , 'maDiy.add', 'maHist');
		// }

		if(mtgv.mtpp.crossFreq  && mtgv.mtpp.pr){
			html+= SP_3 + getButtonP('Trending MA ' , 'csma.addMa', 'maTrend');
			html+= SP_3 + getButtonP('DIY Hist Compare ' , 'maDiy.add', 'maHist');

			html+= SP_3 + getButtonP('MA / Bollinger / SuperTrend ' , 'maOlDiy.add', 'maOl');
		}else{
			html+= SP_3 + htmlU.gdb('Trending MA ', 'Availble in higher Plans');
			html+= SP_3 + htmlU.gdb('DIY Hist Compare ', 'Availble in higher Plans');
			html+= SP_3 + htmlU.gdb('MA / Bollinger / SuperTrend ' , AVAIL_HIGH_PLAN );
		}

		html+= TSR_HR;
		html+= '<br/>';

		if(mtgv.mtpp.crossFreq  && mtgv.mtpp.pr){

			
			html+= SP_3 + getButtonP('MA Fake Break ' , 'csma.addMa', 'maFakeBreak');

			html+= SP_3 + getButtonP('Bounced From MA ' , 'csma.addMa', 'maSupResBounce');

			html+= SP_3 + getButtonP('MA Convergence ' , 'csma.addMa', 'maCon');

			html+= SP_3 + getButtonP('MA Divergence ' , 'csma.addMa', 'maDiv');
			// html+= '<br/>';

			

		}else{

			html+= SP_3 + htmlU.gdb('MA Fake Break ', AVAIL_HIGH_PLAN);
			html+= SP_3 + htmlU.gdb('Bounced From MA ', AVAIL_HIGH_PLAN);
			html+= SP_3 + htmlU.gdb('MA Convergence ', AVAIL_HIGH_PLAN);
			html+= SP_3 + htmlU.gdb('MA Divergence ', AVAIL_HIGH_PLAN);
			// html+= '<br/>';
			// html+= '<br/>';
			

		}

		return html;
	}



	function addMa(type){ //MA_PRICE_OPTIONS

		let json = addNewFilter(type);

		$('#maCtrlTab').append(json.html );

		addFilterChange(type , json.id);

	}


	function addNewFilter(type){

		var scrData = mtgv.cs.screenerData;
		var id =  myTsrScreener.getNextId(type +'CompId');

		let html =''

		if(type=='pma'){
			var pmaObj={ id :id, ops:mtgv.mtpp.MA_PRICE_OPTIONS[0].id, maType:mtgv.mtpp.MA_TYPE[0].id };
			scrData.pmaComp.push(pmaObj);
			html = getPmaHtml(pmaObj);
		}else if(type=='maco'){
			var macoComp={ id :id,  type1:mtgv.mtpp.MA_TYPE[0].id , type2:mtgv.mtpp.MA_TYPE[0].id,  ops:mtgv.mtpp.MA_PRICE_OPTIONS[0].id };
			scrData.macoComp.push(macoComp);
			html = getMacoHtml(macoComp);
		}else if(type=='maTrend'){
			var maTrendComp={ id :id,  ma:50, type:  mtgv.mtpp.MA_TYPE[0].id,  ops:  mtgv.mtpp.TRENDING_MA_OPS[0].id, ticks : 15 };
			scrData.maTrendComp.push(maTrendComp);
			html=  getMaTrendHtml(maTrendComp)
		}else if(type == 'maFakeBreak'){
			var maFakeBreakComp = {id : id, ops: FAKE_BO_BD[0].id, maType:mtgv.mtpp.MA_TYPE[0].id ,
				 priceField : FAKE_PRICE_FIELD[0].id, fakePeriod : 1, maxfakePc : .75,  period : 10}

			scrData.maFakeBreakComp.push(maFakeBreakComp);
			html =  getMaFakeBreakHtml(maFakeBreakComp);
		}else if(type == 'maSupResBounce'){
			var maSupResBounceComp = {id : id , ops: BOUNCE_FROM[0].id, maType:mtgv.mtpp.MA_TYPE[0].id , bounceTimes :2 , bouncePc :1 , period:20}
			scrData.maSupResBounceComp.push(maSupResBounceComp);
			html = getMaSupResBounceHtml(maSupResBounceComp);
		}else if(type == 'maCon'){
			var maConComp = {id : id, maType1:mtgv.mtpp.MA_TYPE[0].id , maType2:mtgv.mtpp.MA_TYPE[0].id,
				ma1Trend:MA_TREND[0].id , ma2Trend:MA_TREND[0].id,  conDays : 10
			}
			scrData.maConComp.push(maConComp);
			html = getMaConHtml(maConComp);
		}else if(type == 'maDiv'){
			var maDivComp = {id : id , maType1:mtgv.mtpp.MA_TYPE[0].id , maType2:mtgv.mtpp.MA_TYPE[0].id,
				ma1Trend:MA_TREND[0].id , ma2Trend:MA_TREND[0].id, divDays : 5 , coDays : 10   }
			scrData.maDivComp.push(maDivComp);
			html = getMaDivHtml(maDivComp);
		}else if(type == 'maHist'){
			return maDiy.anf();
		}else if(type == 'maOl'){
    	    return maOlDiy.anf();
		}

		return { html : html , id : id};

	}


	function addFilterChange(type, id){ //MA_PRICE_OPTIONS
		
		if(type=='pma'){
    	    pmaChg(id);
		}else if(type=='maco'){
    	    macoChg(id);
		}else if(type=='maTrend'){
    	    maTrendChg(id);
		}else if(type == 'maFakeBreak'){
    	    maFakeBreakChg(id);
		}else if(type == 'maSupResBounce'){
    	    maSupResBounceChg(id);
		}else if(type == 'maCon'){
    	    maConChg(id);
		}else if(type == 'maDiv'){
    	    maDivChg(id);
		}else if(type == 'maHist'){
    	    maDiy.afc( type , id )
    	    return;
		}else if(type == 'maOl'){
    	    maOlDiy.afc( type , id )
    	    return;
		}

        csu.dsf(); // displaySelectedFields();
        cst.shCs(id);
	}




	function getCrossTickSpec(maObj , type, func){
		var html = '';

		if(!mtgv.mtpp.crossFreq){ // Cross Freq.... 
			return html;
		}
		var id = maObj.id;

		html+= '<div id ="' +id+'CustSetDiv">';


		var ticks = csu.gct(maObj , 'maTick');

		// html+= BR_2
		html+=  ' On ' + 	getDropDown(ticks, id+'maTick', null,func, id, maObj.maTick);
		html+=  ' Tick,  '  

		if(type =='pma'){
			html +=  '  Price Field ' +  getDropDown(MA_PRICE_FIELDS, id+'priceField', null,func, id, maObj.priceField) ;
			html +=  '  MA On ' +  getDropDown(MA_PRICE_FIELDS, id+'maField', null,func, id, maObj.maField) ;
			html += getAddiMAVar(maObj , maObj.maType, 1, func);

		}else if(type =='maco'){

			html +=  '  Base MA On' +  getDropDown(MA_PRICE_FIELDS, id+'baseMaField', null,func, id, maObj.baseMaField) ;
			html +=  '  To MA On ' +  getDropDown(MA_PRICE_FIELDS, id+'compMaField', null,func, id, maObj.compMaField) ;
		}else if(type =='maTrend'){
			html +=  '  MA On ' +  getDropDown(MA_PRICE_FIELDS, id+'maField', null,func, id, maObj.maField) ;
		
		}else if(type =='maFakeBreak'){
			html +=  '  Price Field ' +  getDropDown(FAKE_PRICE_FIELD, id+'priceField', null,func, id, maObj.priceField) ;
			html +=  '  MA On ' +  getDropDown(MA_PRICE_FIELDS, id+'maField', null,func, id, maObj.maField) ;
		}else if(type =='maSupResBounce'){
			html +=  '  Price Field ' +  getDropDown(MA_PRICE_FIELDS, id+'priceField', null,func, id, maObj.priceField) ;
			html +=  '  MA On ' +  getDropDown(MA_PRICE_FIELDS, id+'maField', null,func, id, maObj.maField) ;
			
		}else if(type =='maCon'){
			// TODO

			html +=  '  Base MA On' +  getDropDown(MA_PRICE_FIELDS, id+'baseMaField', null,func, id, maObj.baseMaField) ;
			html +=  '  To MA On ' +  getDropDown(MA_PRICE_FIELDS, id+'compMaField', null,func, id, maObj.compMaField) ;

		}else if(type =='maDiv'){
			// TODO
			html +=  '  Base MA On' +  getDropDown(MA_PRICE_FIELDS, id+'baseMaField', null,func, id, maObj.baseMaField) ;
			html +=  '  To MA On ' +  getDropDown(MA_PRICE_FIELDS, id+'compMaField', null,func, id, maObj.compMaField) ;
		}

		html+='</div>';

		html+= BREAK_LINE;
		return html;
	}

	



	function getPmaHtml(pmaObj){

		var td2 =       getPricemaTd2(pmaObj) ;

		var td2Div =  createDiv(pmaObj.id+'Td2Div', td2)

		var html = '<tr id='+pmaObj.id+'> ' +  createTd( td2Div ) +'</tr>';

		return html;

		// return csh.dynTr(pmaObj, {td1 : , td2 : td2 })
	}

	function getPricemaTd2(pmaObj){

		var supportedRange = ' Supported MA range 2-200';

		var id = pmaObj.id;
		var func = 'csma.pmaChg';
		var html = '';


		html+= getCrossTickSpec(pmaObj , 'pma', func);

		html+= doBold('Price / MA : ') + 'Price' + SP_3;

		html +=  getDropDown(mtgv.mtpp.MA_PRICE_OPTIONS, id+'ops', null,func, id, pmaObj.ops);

		if(pmaObj.ops == WITHIN || pmaObj.ops == MORE_THAN ){
			// tolVal = jsu.isNotNull(ppObj.tolval) ? ppObj.tolval : 1;
			html += SP_3 + getDropDown(PC_COMP_MID, id+'tolPc', 'width:100px',func, id, pmaObj.tolPc);
		}

		html+= SP_3 +  getInputTxtParam( id+'ma' , 5, pmaObj.ma, func , id)	;
		html+= SP_3 + getDropDown(mtgv.mtpp.MA_TYPE, id+'maType', null,func, id, pmaObj.maType); 

/*

		if(mtgv.mtpp.crossFreq){

			// var ticks = mtgv.mtpp.FREQ_SCR_MAP.slice();
			// ticks.unshift({id: "scrFreq", label: "Screener"} )

			// if(jsu.isNull(pmaObj.maTick)){
			// 	pmaObj.maTick = 'scrFreq';
			// }

			var ticks = csu.gct(pmaObj , 'maTick');

			html+=  ' on ' + 	getDropDown(ticks, id+'maTick', null,func, id, pmaObj.maTick);
			html+=  ' Tick '  
		}

*/

		if(mtgv.mtpp.crossFreq){
			html+= cst.acscb(pmaObj.id);
		}
		

		var param = 'pma:'+id; // Vol Compare

		html+= csh.gept(pmaObj, MA_CS,  param);


		html+= SP_3 + csh.delIcon(param) ; // '<a  onClick="javascript:'+thisAlias+'.delRow(\''+delObj+'\');"><font size="4" color="red"><span class="glyphicon glyphicon-remove"></span></font> </a> ';
		html+= SP_3 +getSpan( supportedRange, 'grey',8)	;	

		return html;

	}



	function pmaChg(id){
		// var maxMa = 200;
		// if(screenerData.scrFreq =='WEOD'  || screenerData.scrFreq =='MEOD' ){
		// 	maxMa = 50;
		// } 

		// maxMa = 200;
		var scrData = mtgv.cs.screenerData;

		var obj= getObjFrmArr(scrData.pmaComp, id);


		csu.setProp(scrData.pmaComp, ['ops','maType', 'ma' ,'tolPc' ,'maTick', 'priceField', 'maField'  , 'ma1v1', 'ma1v2'],id);

		htmlU.addMsgToDiv(  obj.id+'Td2Div' , true, getPricemaTd2(obj) );

		obj.goodData = true;
		if(!isIntegerInput(id+'ma') || !inputNumberRange (id+'ma', 1,MAX_MA)){
			obj.goodData =false;
			// return; ;	
		} 

		// KAMA
		if(!valiAddiMAVar(obj , obj.maType, 1 )){
			obj.goodData =false;
			// return;
		}


		
		csu.setProp(scrData.pmaComp, ['ops','maType', 'ma' , 'tolPc' ,'maTick', 'priceField', 'maField' , 'ma1v1', 'ma1v2'],id);

		if(mtgv.mtpp.crossFreq){
			obj.custom = (obj.maField != CLOSE || obj.priceField != CLOSE   );
		}


		csu.dsf(); // displaySelectedFields();

		
	}

	function validatePriceMa(validResults){
		var scrData = mtgv.cs.screenerData;

		for ( var i=0;i< scrData.pmaComp.length ;i++){
			var obj = scrData.pmaComp[i];
			var ops = getObjFrmArr( mtgv.mtpp.MA_PRICE_OPTIONS,  obj.ops); 
			var maType = getObjFrmArr( mtgv.mtpp.MA_TYPE,  obj.maType); 
			var ma = obj.ma;
			obj.csType = MA_CS;

			var selParam = 'pma:' +obj.id;
			if(obj.goodData){
				var text = doBold('Price / MA : ');

				if(  mtgv.mtpp.crossFreq &&   jsu.isNotNull(obj.priceField ) ){
					var fieldDef =  getObjFrmArr(MA_PRICE_FIELDS, obj.priceField);
				 	text+=  fieldDef.label ;
				}



				text+=  ' Price ' + ops.label ;

				if(obj.ops == WITHIN || obj.ops == MORE_THAN ){
					var tolPc =  getObjFrmArr(PC_COMP_MID , obj.tolPc) ; 
					text+=  " " + tolPc.label; 	
				}

				text += ' ' + ma + " Period " + maType.label;

				if( jsu.isNotNull(obj.maField) &&  obj.maField!==  CLOSE  && mtgv.mtpp.crossFreq){
					var fieldDef =  getObjFrmArr(MA_PRICE_FIELDS, obj.maField);
					text+= ', MA on ' + fieldDef.label ;
				}

				if(mtgv.mtpp.crossFreq){
					if(jsu.isNull(obj.maTick ))  obj.maTick = 'scrFreq';

					if(obj.maTick == 'scrFreq'){
						text+= ' On Screener Tick';
					}else{
						var maTick =  getObjFrmArr(mtgv.mtpp.FREQ_SCR_MAP, obj.maTick);
						text+= ' On '+ maTick.label +' Tick';
					}
				}


				csh.cdt(obj,text, validResults, selParam, true);
			}else{
				csh.cdt(obj,' Invalid value for MA ', validResults, selParam, false);
			}
		}
	}


	/***************************************************************************************
			MA CO
	*****************************************************************************************/



	function getMacoHtml(macoObj){
		

		var td2 =       getMacoTd(macoObj) ;
		

		var td2Div =  createDiv(macoObj.id+'Td2Div', td2)

		var html = '<tr id='+macoObj.id+'> ' +  createTd( td2Div ) +'</tr>';

		return html;

		// var td2 =    createDiv(getMacoTd.id+'Td2Div', getMacoTd(macoObj), null);


		// return csh.dynTr(macoObj, {td1 : doBold('Compare MA\'s '), td2 : td2 })
	}



	function getMacoTd(macoObj){

		var id = macoObj.id;
		var func = 'csma.macoChg';
		var html = '' ;

		// html+=  doBold('Two MA / Cross ');

		html+= getCrossTickSpec(macoObj , 'maco', func);

/*
		if(mtgv.mtpp.crossFreq){

			// var ticks = mtgv.mtpp.FREQ_SCR_MAP.slice();
			// ticks.unshift({id: "scrFreq", label: "Screener"} )

			// if(jsu.isNull(macoObj.maTick)){
			// 	macoObj.maTick = 'scrFreq';
			// }

			var ticks = csu.gct(macoObj , 'maTick');

			html+=  ' ' + 	getDropDown(ticks, id+'maTick', null,func, id, macoObj.maTick);
			html+=  ' Tick - '  
		}
*/		

		html+= htmlU.doBold( 'Compare Two MA : ' ); 
		html+= SP_3 + getInputTxtParam( id+'ma1' , 3, macoObj.ma1, func , id)	;
		html+= SP_3 + getDropDown(mtgv.mtpp.MA_TYPE, id+'type1', 'width:60px',func, id, macoObj.type1); 
		html+= SP_3 + getDropDown(mtgv.mtpp.MA_PRICE_OPTIONS, id+'ops', null,func, id, macoObj.ops);

		if(macoObj.ops == WITHIN || macoObj.ops == MORE_THAN ){
			// tolVal = jsu.isNotNull(ppObj.tolval) ? ppObj.tolval : 1;
			html += SP_3 + getDropDown(PC_COMP_MID, id+'tolPc', 'width:70px',func, id, macoObj.tolPc);
		}

		html+= SP_3 + getInputTxtParam( id+'ma2' , 3, macoObj.ma2, func , id)	;
		html+= SP_3 + getDropDown(mtgv.mtpp.MA_TYPE, id+'type2', 'width:60px',func, id, macoObj.type2); 
		html+= SP_3 +getSpan(' Supported MA range 2-200' , 'grey',8)	;	
		

		if(mtgv.mtpp.crossFreq){
			html+= cst.acscb(macoObj.id);
		}

		var param = 'maco:'+id; // Vol Compare

		html+= csh.gept(macoObj, MA_CS,  param);
		
		html+= SP_3 + csh.delIcon(param) ; // '<a  onClick="javascript:'+thisAlias+'.delRow(\''+delObj+'\');"><font size="4" color="red"><span class="glyphicon glyphicon-remove"></span></font> </a> ';

		return html;		
	}


	function macoChg(id){
		var scrData = mtgv.cs.screenerData;

		var obj= getObjFrmArr(scrData.macoComp, id);

		csu.setProp(scrData.macoComp, ['ops','type1', 'type2', 'ma1','ma2' , 'tolPc' ,'maTick'   ,'baseMaField' ,'compMaField'],id);

		htmlU.addMsgToDiv(  obj.id+'Td2Div' , true, getMacoTd(obj) );
		obj.goodData = true;

		if(!isIntegerInput(id+'ma1') || !isIntegerInput(id+'ma2') ||
		 	 !inputNumberRange (id+'ma1', 1,201) || !inputNumberRange (id+'ma2', 1,201)){
			obj.goodData = false;
		}
		
		csu.setProp(scrData.macoComp, ['ops','type1', 'type2', 'ma1','ma2' , 'tolPc' ,'maTick'  ,'baseMaField' ,'compMaField'],id);

		
		if(mtgv.mtpp.crossFreq){
			obj.custom = (obj.baseMaField != CLOSE || obj.compMaField != CLOSE );
		}

		csu.dsf(); // displaySelectedFields();

		
	}

	function validateMaCo(validResults){
		var scrData = mtgv.cs.screenerData;
		for ( var i=0;i< scrData.macoComp.length ;i++){
			var obj = scrData.macoComp[i];
			var ops = getObjFrmArr( mtgv.mtpp.MA_PRICE_OPTIONS,  obj.ops); 
			var type1 = getObjFrmArr( mtgv.mtpp.MA_TYPE,  obj.type1); 
			var type2 = getObjFrmArr( mtgv.mtpp.MA_TYPE,  obj.type2); 
			var ma = obj.ma;

			var selParam = 'maco:'+obj.id; // Vol Compare

			obj.csType = MA_CS;
			if(obj.goodData){
				// validResults.validFieldCount++;
				var text =''

				text+= htmlU.doBold( 'Compare Two MA : ' );
				if(mtgv.mtpp.crossFreq){
					if(jsu.isNull(obj.maTick ))  obj.maTick = 'scrFreq';	
					if(obj.maTick == 'scrFreq'){
						text+= ' Screener Tick - ';
					}else{
						var maTick =  getObjFrmArr(mtgv.mtpp.FREQ_SCR_MAP, obj.maTick);
						text+=  maTick.label +' Tick - ';
					}



				}
				text += obj.ma1 + ' ' + type1.label + ' ' 

				if(mtgv.mtpp.crossFreq && obj.baseMaField != CLOSE   &&  jsu.isNotNull(obj.maField)  ){
					var fieldDef =  getObjFrmArr(MA_PRICE_FIELDS, obj.baseMaField);
					text+= ' on ' + fieldDef.label ;
				}

				text += ops.label ;

				if(obj.ops == WITHIN || obj.ops == MORE_THAN ){
					var tolPc =  getObjFrmArr(PC_COMP_MID , obj.tolPc) ; 
					text+=  " " + tolPc.label; 	
				}

				
				text+= ' ' + obj.ma2 + "  " + type2.label;

				if(mtgv.mtpp.crossFreq && obj.compMaField != CLOSE &&  jsu.isNotNull(obj.maField)){
					var fieldDef =  getObjFrmArr(MA_PRICE_FIELDS, obj.compMaField);
					text+= ' on ' + fieldDef.label ;
				}


				csh.cdt(obj,text, validResults, selParam, true);
			}else{
				csh.cdt(obj,' Invalid value for MA Crossovers', validResults, selParam, false);
				// if(!obj.disabled) validResults.invalidFields++;

			}
		}	
	}


	// --------------------- MA Trend .........


	function getMaTrendHtml(maTrendObj){

		var td2 =       getMaTrendTd(maTrendObj) ;

		var td2Div =  createDiv(maTrendObj.id+'Td2Div', td2)

		var html = '<tr id='+maTrendObj.id+'> ' +  createTd( td2Div ) +'</tr>';

		return html;

	}



	function getMaTrendTd(maTrendObj){

		var id = maTrendObj.id;
		var func = 'csma.maTrendChg';
		var html = '' ;

/*
		if(mtgv.mtpp.crossFreq){
			var ticks = csu.gct(maTrendObj , 'maTick');
			html+=  ' ' + 	getDropDown(ticks, id+'maTick', null,func, id, maTrendObj.maTick);
			html+=  ' Tick - '  
		}
*/		

		html+= htmlU.doBold("Trending MA : ")

		html+= getCrossTickSpec(maTrendObj , 'maTrend', func);


		// html+= SP_3 + getDropDown(TREND_MA_RANGE, id+'ma', 'width:60px',func, id, maTrendObj.ma); 

		 html+= SP_3 + getInputTxtParam(id+'ma' ,3, maTrendObj.ma , func , id );

		html+= SP_3 + getDropDown(mtgv.mtpp.MA_TYPE, id+'type', '',func, id, maTrendObj.type); 
		html+= SP_3 + getDropDown(mtgv.mtpp.TRENDING_MA_OPS, id+'ops', '',func, id, maTrendObj.ops); 
		html+= SP_3 + 'for Minimum'
		html+= SP_3 + getInputTxtParam( id+'ticks' , 3, maTrendObj.ticks, func , id)	;
		html+= SP_3 +getSpan(' Supported Ticks 2-50' , 'grey',8)	;
		html+= SP_3 + 'Ticks';

		if(mtgv.mtpp.crossFreq){
			html+= cst.acscb(maTrendObj.id);
		}


		var param = 'maTrend:'+id; // Vol Compare

		html+= csh.gept(maTrendObj, MA_CS,  param);

		html+= SP_3 + csh.delIcon(param) ; // '<a  onClick="javascript:'+thisAlias+'.delRow(\''+delObj+'\');"><font size="4" color="red"><span class="glyphicon glyphicon-remove"></span></font> </a> ';

		return html;		
	}

	function maTrendChg(id){

		var scrData = mtgv.cs.screenerData;

		var obj= getObjFrmArr(scrData.maTrendComp, id);

		csu.setProp(scrData.maTrendComp, [ 'maTick', 'ma', 'type', 'ops','ticks', 'maField'],id);

		htmlU.addMsgToDiv(  obj.id+'Td2Div' , true, getMaTrendTd(obj) );
		obj.goodData = true;
		if(!isIntegerInput(id+'ticks') ||  !inputNumberRange (id+'ticks', 1,51)){
			obj.goodData = false;
		}

		if(!isIntegerInput(id+'ma') ||  !inputNumberRange (id+'ma', 2,200)){
			obj.goodData = false;
		}


		

		// 

		csu.setProp(scrData.maTrendComp, [ 'maTick', 'ma', 'type', 'ops','ticks' , 'maField'],id);


		if(mtgv.mtpp.crossFreq){
			obj.custom = (obj.maField != CLOSE );
		}

		csu.dsf(); // displaySelectedFields();

		// cst.shCs(id);
	}




	function validateMaTrend(validResults){


		var scrData = mtgv.cs.screenerData;
		for ( var i=0;i< scrData.maTrendComp.length ;i++){
			var obj = scrData.maTrendComp[i];

			// var ma = getObjFrmArr( TREND_MA_RANGE,  obj.ma); 
			var type = getObjFrmArr( mtgv.mtpp.MA_TYPE,  obj.type); 
			var ops = getObjFrmArr( mtgv.mtpp.TRENDING_MA_OPS,  obj.ops); 
			
			var ticks = obj.ticks;
			var ma = obj.ma;

			var selParam = 'maTrend:'+obj.id; 

			obj.csType = MA_CS;

			if(obj.goodData){
				// validResults.validFieldCount++;
				var text =''
				text += htmlU.doBold("Trending MA : ")

				if(mtgv.mtpp.crossFreq){
					if(jsu.isNull(obj.maTick ))  obj.maTick = 'scrFreq';	
					if(obj.maTick == 'scrFreq'){
						text+= ' Screener Tick - ';
					}else{
						var maTick =  getObjFrmArr(mtgv.mtpp.FREQ_SCR_MAP, obj.maTick);
						text+=  maTick.label +' Tick - ';
					}
				}
				text += ma + ' ' + type.label + ' ' 

				if(mtgv.mtpp.crossFreq && obj.maField != CLOSE){
					var fieldDef =  getObjFrmArr(MA_PRICE_FIELDS, obj.maField);
					text+= ' on ' + fieldDef.label ;
				}

				text+= ops.label ;
				text+=  " for Minimum " + ticks + ' Ticks'; 	

				csh.cdt(obj,text, validResults, selParam, true);
			}else{
				csh.cdt(obj,' Invalid value for Trending MA', validResults, selParam, false);
				// if(!obj.disabled) validResults.invalidFields++;

			}
		}	

	}


	/************************************************************************************

			FAKE BREAK

	**************************************************************************************/


	function getMaFakeBreakHtml(maFakeObj){

		var td2 =       getMaFakeBreakTd(maFakeObj) ;
		var td2Div =  createDiv(maFakeObj.id+'Td2Div', td2)
		var html = '<tr id='+maFakeObj.id+'> ' +  createTd( td2Div ) +'</tr>';

		return html;

	}

	function getMaFakeBreakTd(maFakeObj){

		var id = maFakeObj.id;
		var func = 'csma.fbc'; 
		var html = '' ;

		html+= htmlU.doBold( 'MA Fake Breakout : ' ); 

		html+= getCrossTickSpec(maFakeObj , 'maFakeBreak', func);


		// TODO  -- ADD Other content ....

		// High Price Fake Break Break out on 20 SMA for max 1 Tick with max Breach of 1 %

		// html +=  getDropDown(FAKE_PRICE_FIELD, id+'priceField', null,func, id, maFakeObj.priceField);

		// html+= SP_2 +'Price' ;

		html+= SP_3 + getDropDown(FAKE_BO_BD, id+'ops', null,func, id, maFakeObj.ops);  

		html+= ' on ' + getInputTxtParam( id+'ma' , 5, maFakeObj.ma, func , id) +	htmlU.getSpan(' Supported MA range 2-200' , 'grey',8)	;	

		html+= ' ' + getDropDown(mtgv.mtpp.MA_TYPE, id+'maType', null,func, id, maFakeObj.maType);  		

		html+= BR_2

		html+= ' for max ' + getInputTxtParam( id+'fakePeriod' , 5, maFakeObj.fakePeriod, func , id)	+ htmlU.getSpan(' Range 1-10' , 'grey',8)	;	;

		// html+= ' ' + getInputTxtParam( id+'ma' , 5, maFakeObj.ma, func , id) + ' Ticks '	;

		 html+= ' Ticks '

		html+= ' with max Breach of ' + getInputTxtParam( id+'maxfakePc' , 5, maFakeObj.maxfakePc, func , id) + ' % '
			 + htmlU.getSpan(' Range .1 to 10%' , 'grey',8)	;


		html+= ' breach within last ' + getInputTxtParam( id+'period' , 5, maFakeObj.period , func , id) +' Tick '	+ htmlU.getSpan(' Range 2-50' , 'grey',8)	;	;


		if(mtgv.mtpp.crossFreq){
			html += BREAK_LINE
			html+= cst.acscb(maFakeObj.id);
		}



		var param = 'maFakeBreak:'+id; // Vol Compare

		html+= csh.gept(maFakeObj, MA_CS,  param);


		html+= SP_3 + csh.delIcon(param) ; // '<a  onClick="javascript:'+thisAlias+'.delRow(\''+delObj+'\');"><font size="4" color="red"><span class="glyphicon glyphicon-remove"></span></font> </a> ';

		return html;
	}

	function maFakeBreakChg(id){

		// MAX_MA

		var scrData = mtgv.cs.screenerData;

		var obj= getObjFrmArr(scrData.maFakeBreakComp, id);


		csu.setProp(scrData.maFakeBreakComp, ['ops','maType', 'ma' ,'fakePeriod'  , 'maxfakePc' ,'maTick', 'priceField', 'maField', 'period'],id);

		htmlU.addMsgToDiv(  obj.id+'Td2Div' , true, getMaFakeBreakTd(obj) );
		obj.goodData = true;

		if(!jsu.isIntegerInput(id+'ma') || ! jsu.inputNumberRange (id+'ma', 1,MAX_MA)){
			obj.goodData =false;
			// return; ;	
		} 

		if(!jsu.isIntegerInput(id+'fakePeriod') || !jsu.inputNumberRange (id+'fakePeriod', 1,10)){
			obj.goodData =false;
			// return; ;	
		} 


		if(!jsu.isPositiveNumInput(id+'maxfakePc') || !jsu.inputNumberRange (id+'maxfakePc', .1,10)){
			obj.goodData =false;
			// return; ;	
		} 

		if(!jsu.isPositiveNumInput(id+'period') || !jsu.inputNumberRange (id+'period', 1,50)){
			obj.goodData =false;
			// return; ;	
		} 
		
		
		csu.setProp(scrData.maFakeBreakComp, ['ops','maType', 'ma' ,'fakePeriod'  , 'maxfakePc' ,'maTick', 'priceField', 'maField', 'period'],id);

		if(mtgv.mtpp.crossFreq){
			obj.custom = (obj.maField != CLOSE || obj.priceField != CLOSE );
		}

		csu.dsf(); // displaySelectedFields();
	}

	function validateMaFake(validResults){

		var scrData = mtgv.cs.screenerData;
		for ( var i=0;i< scrData.maFakeBreakComp.length ;i++){
		
			var obj = scrData.maFakeBreakComp[i];

			var ops = getObjFrmArr( FAKE_BO_BD,  obj.ops); 
			var maType = getObjFrmArr( mtgv.mtpp.MA_TYPE,  obj.maType); 
			var ma = obj.ma;
		
			var selParam = 'maFakeBreak:'+obj.id; 

			obj.csType = MA_CS;

			if(obj.goodData){
				// validResults.validFieldCount++;
				var text =''
				text += htmlU.doBold( 'MA Fake Breakout : ' )

				// High Price Fake Break Break out on 20 SMA for max 1 Tick with max Breach of 1 %

				if(mtgv.mtpp.crossFreq){
					// TODO

					if(  mtgv.mtpp.crossFreq &&   jsu.isNotNull(obj.priceField ) ){
						var fieldDef =  getObjFrmArr(FAKE_PRICE_FIELD, obj.priceField);
					 	text+=  fieldDef.label +' Price ' ;
					}

					text+= '' + ops.label

					text+=' on ' + ma  + ' '  +maType.label;

					if( jsu.isNotNull(obj.maField) &&  obj.maField!==  CLOSE  && mtgv.mtpp.crossFreq){
						var fieldDef =  getObjFrmArr(MA_PRICE_FIELDS, obj.maField);
						text+= ', MA on ' + fieldDef.label ;
					}

					text+= ' for max ' + obj.fakePeriod + ' tick with max Breach of '+ obj.maxfakePc+ '% '

					text+= ' within last ' + obj.period + ' '
					if(mtgv.mtpp.crossFreq){
						if(jsu.isNull(obj.maTick ))  obj.maTick = 'scrFreq';

						if(obj.maTick == 'scrFreq'){
							text+= ' On Screener Tick';
						}else{
							var maTick =  getObjFrmArr(mtgv.mtpp.FREQ_SCR_MAP, obj.maTick);
							text+= ' On '+ maTick.label +' Tick';
						}
					}

				}

				// TODO 
				csh.cdt(obj,text, validResults, selParam, true);
			}else{
				csh.cdt(obj,' Invalid value for MA Fake Break', validResults, selParam, false);
				// if(!obj.disabled) validResults.invalidFields++;
			}	
		}

	}


	/************************************************************************************

			Bounce From MA

	**************************************************************************************/


	function getMaSupResBounceHtml(maSupResObj){

		var td2 =       getMaSupResBounceTd(maSupResObj) ;
		var td2Div =  createDiv(maSupResObj.id+'Td2Div', td2)
		var html = '<tr id='+maSupResObj.id+'> ' +  createTd( td2Div ) +'</tr>';

		return html;
	}

	function getMaSupResBounceTd(maSupResObj){

		var id = maSupResObj.id;
		var func = 'csma.spbc'; 
		var html = '' ;

		html+= htmlU.doBold( 'Bounce From MA : ' ); 

		html+= getCrossTickSpec(maSupResObj , 'maSupResBounce', func);

		// TODO  -- ADD Other content ....
		// High Price bounced from 20 MA Support at least 1 Time with price within 1 % of MA level


		html+=  ' Price ' + SP_3 + 'Bounced from '    

		html+= ' ' + getDropDown(BOUNCE_FROM, id+'ops', null,func, id, maSupResObj.ops);  

		html+=  ' on ' + getInputTxtParam( id+'ma' , 5, maSupResObj.ma, func , id) +	htmlU.getSpan(' Supported MA range 2-200' , 'grey',8)	;	

		html+= ' ' + getDropDown(mtgv.mtpp.MA_TYPE, id+'maType', null,func, id, maSupResObj.maType);  

		html+= BR_2;

		html+= ' at least ' + getInputTxtParam( id+'bounceTimes' , 5, maSupResObj.bounceTimes, func , id) + ' times ' 	+ htmlU.getSpan(' Range 1-5' , 'grey',8)	;	;

		html+= ' with price within  ' + getInputTxtParam( id+'bouncePc' , 5, maSupResObj.bouncePc, func , id) + ' % of bounce'	+ htmlU.getSpan(' Range .1-5%' , 'grey',8)	;	;


		html+= ' within last ' + getInputTxtParam( id+'period' , 5, maSupResObj.period, func , id)  + ' ticks' + htmlU.getSpan(' Range 2-50' , 'grey',8)	;	;

		if(mtgv.mtpp.crossFreq){
			html+= cst.acscb(maSupResObj.id);
		}

		var param = 'maSupResBounce:'+id; // Vol Compare

		html+= csh.gept(maSupResObj, MA_CS,  param);



		html+= SP_3 + csh.delIcon(param) ; // '<a  onClick="javascript:'+thisAlias+'.delRow(\''+delObj+'\');"><font size="4" color="red"><span class="glyphicon glyphicon-remove"></span></font> </a> ';

		return html;

	}

	function maSupResBounceChg(id){

		var scrData = mtgv.cs.screenerData;

		var obj= getObjFrmArr(scrData.maSupResBounceComp, id);

		csu.setProp(scrData.maSupResBounceComp, ['ops','maType', 'ma' ,'bounceTimes'  , 'bouncePc' ,'maTick', 'priceField', 'maField', 'period'],id);


		htmlU.addMsgToDiv(  obj.id+'Td2Div' , true, getMaSupResBounceTd(obj) );
		obj.goodData = true;

		if(!jsu.isIntegerInput(id+'ma') || ! jsu.inputNumberRange (id+'ma', 1,MAX_MA)){
			obj.goodData =false;
			// return; ;	
		} 

		if(!jsu.isIntegerInput(id+'bounceTimes') || !jsu.inputNumberRange (id+'bounceTimes', 1,5)){
			obj.goodData =false;
			// return; ;	
		} 


		if(!jsu.isPositiveNumInput(id+'bouncePc') || !jsu.inputNumberRange (id+'bouncePc', .1,10)){
			obj.goodData =false;
			// return; ;	
		} 

		if(!jsu.isIntegerInput(id+'period') || !jsu.inputNumberRange (id+'period', 2,50)){
			obj.goodData =false;
			// return; ;	
		} 

		
		
		csu.setProp(scrData.maSupResBounceComp, ['ops','maType', 'ma' ,'bounceTimes'  , 'bouncePc' ,'maTick', 'priceField', 'maField', 'period'],id);

		if(mtgv.mtpp.crossFreq){
			obj.custom = (obj.maField != CLOSE || obj.priceField != CLOSE );
		}

		csu.dsf(); // displaySelectedFields();

	}

	function validateSupResBounce(validResults){

		var scrData = mtgv.cs.screenerData;
		for ( var i=0;i< scrData.maSupResBounceComp.length ;i++){
		
			var obj = scrData.maSupResBounceComp[i];

			var ops = getObjFrmArr( BOUNCE_FROM,  obj.ops); 
			var maType = getObjFrmArr( mtgv.mtpp.MA_TYPE,  obj.maType); 
			var ma = obj.ma;


			var selParam = 'maSupResBounce:'+obj.id; 

			obj.csType = MA_CS;

			if(obj.goodData){
				// validResults.validFieldCount++;
				var text =''
				text += htmlU.doBold( 'Bounce From MA : ' );
				// High Price bounced from 20 MA Support at least 1 Time with price within 1 % of MA level

				if(mtgv.mtpp.crossFreq){
					// TODO
					var fieldDef =  getObjFrmArr(MA_PRICE_FIELDS, obj.priceField);
					text+=  fieldDef.label +' ' ;

				}

				text+= ' Price bounced from  ' + obj.ma + '  ' +maType.label 

				if( jsu.isNotNull(obj.maField) &&  obj.maField!==  CLOSE  && mtgv.mtpp.crossFreq){
						var fieldDef =  getObjFrmArr(MA_PRICE_FIELDS, obj.maField);
						text+= ', MA on ' + fieldDef.label ;
				}


				text+= ' '  + ops.label;

				text+= ' at least ' + obj.bounceTimes + ' times with price within ' + obj.bouncePc  + ' % of MA Level'

				text+= ' withing last ' + obj.period + ' tick';

				if(mtgv.mtpp.crossFreq){
						if(jsu.isNull(obj.maTick ))  obj.maTick = 'scrFreq';

						if(obj.maTick == 'scrFreq'){
							text+= ' On Screener Tick';
						}else{
							var maTick =  getObjFrmArr(mtgv.mtpp.FREQ_SCR_MAP, obj.maTick);
							text+= ' On '+ maTick.label +' Tick';
						}
				}

				// TODO 
				csh.cdt(obj,text, validResults, selParam, true);
			}else{
				csh.cdt(obj,' Invalid value for MA Bounce', validResults, selParam, false);
				// if(!obj.disabled) validResults.invalidFields++;
			}	
		}

	}



	/************************************************************************************

			MA Convergence

	**************************************************************************************/


	function getMaConHtml(maConObj){

		var td2 =       getMaConTd(maConObj) ;
		var td2Div =  createDiv(maConObj.id+'Td2Div', td2)
		var html = '<tr id='+maConObj.id+'> ' +  createTd( td2Div ) +'</tr>';

		return html;

	}

	function getMaConTd(maConObj){

		var id = maConObj.id;
		var func = 'csma.mcc'; 
		var html = '' ;

		html+= htmlU.doBold( 'MA Convergence : ' ); 

		html+= getCrossTickSpec(maConObj , 'maCon', func);

		// TODO  -- ADD Other content ....
		//  Uptrending 20 SMA is converging with  Downtrending 50 SMA for min 20 days....   

		html+= SP_3 + getDropDown(MA_TREND, id+'ma1Trend', null,func, id, maConObj.ma1Trend);  

		html+= '  ' + getInputTxtParam( id+'ma1' , 5, maConObj.ma1, func , id) +	htmlU.getSpan(' Supported MA range 2-200' , 'grey',8)	;	

		html+= ' ' + getDropDown(mtgv.mtpp.MA_TYPE, id+'maType1', null,func, id, maConObj.maType1);  		

		html+= '  is converging with ' + getDropDown(MA_TREND, id+'ma2Trend', null,func, id, maConObj.ma2Trend); 

		html+= '  ' + getInputTxtParam( id+'ma2' , 5, maConObj.ma2, func , id) +	htmlU.getSpan(' Supported MA range 2-200' , 'grey',8)	;	

		html+= BR_2;

		html+= ' ' + getDropDown(mtgv.mtpp.MA_TYPE, id+'maType2', null,func, id, maConObj.maType2);  		

		html+= ' for min '+ getInputTxtParam( id+'conDays' , 5, maConObj.conDays, func , id)    +' Ticks'  +	htmlU.getSpan(' Supported range 2-20' , 'grey',8)	;

		if(mtgv.mtpp.crossFreq){
			html+= cst.acscb(maConObj.id);
		}


		// html+= csh.gept(maConObj, );

		var param = 'maCon:'+id; // Vol Compare

		html+= csh.gept(maConObj, MA_CS,  param);


		html+= SP_3 + csh.delIcon(param) ; // '<a  onClick="javascript:'+thisAlias+'.delRow(\''+delObj+'\');"><font size="4" color="red"><span class="glyphicon glyphicon-remove"></span></font> </a> ';

		return html;
	}

	function maConChg(id){

		var scrData = mtgv.cs.screenerData;

		var obj= getObjFrmArr(scrData.maConComp, id);

		csu.setProp(scrData.maConComp, ['maType1','maType2', 'ma1' , 'ma2','ma1Trend'  , 'ma2Trend' ,'maTick',
			 'baseMaField', 'compMaField' ,'conDays'],id);

		htmlU.addMsgToDiv(  obj.id+'Td2Div' , true, getMaConTd(obj) );
		obj.goodData = true;

		if(!jsu.isIntegerInput(id+'ma1') || ! jsu.inputNumberRange (id+'ma1', 1,MAX_MA)){
			obj.goodData =false;
			// return; ;	
		} 

		if(!jsu.isIntegerInput(id+'ma2') || ! jsu.inputNumberRange (id+'ma2', 1,MAX_MA)){
			obj.goodData =false;
			// return; ;	
		} 

		if(!jsu.isPositiveNumInput(id+'conDays') || !jsu.inputNumberRange (id+'conDays', 2,20)){
			obj.goodData =false;
			// return; ;	
		} 
		
		csu.setProp(scrData.maConComp, ['maType1','maType2', 'ma1' , 'ma2','ma2Trend'  , 'ma1Trend' ,'maTick',
		 	'baseMaField', 'compMaField' , 'conDays'],id);

		if(mtgv.mtpp.crossFreq){
			obj.custom = (obj.baseMaField != CLOSE || obj.compMaField != CLOSE );
		}

		csu.dsf(); // displaySelectedFields();


	}

	function validateCon(validResults){

		var scrData = mtgv.cs.screenerData;
		for ( var i=0;i< scrData.maConComp.length ;i++){
		
			var obj = scrData.maConComp[i];
		

			var maType1 = getObjFrmArr( mtgv.mtpp.MA_TYPE,  obj.maType1); 
			var ma1 = obj.ma1;
			var ma1Trend = getObjFrmArr( MA_TREND,  obj.ma1Trend); 

			var maType2 = getObjFrmArr( mtgv.mtpp.MA_TYPE,  obj.maType2); 
			var ma2 = obj.ma2;
			var ma2Trend = getObjFrmArr( MA_TREND,  obj.ma2Trend); 

			var selParam = 'maCon:'+obj.id; 

			obj.csType = MA_CS;

			//  Uptrending 20 SMA is converging with  Downtrending 50 SMA for min 20 days....   

			if(obj.goodData){
				// validResults.validFieldCount++;
				var text =''

				text += htmlU.doBold( 'MA Convergence : ' )

				text += ma1Trend.label + ' ' + ma1 + ' ' + maType1.label + ' '

				if(mtgv.mtpp.crossFreq){
					var fieldDef =  getObjFrmArr(MA_PRICE_FIELDS, obj.baseMaField);
					text+= ' on ' + fieldDef.label +' ' ;
				}

				text += ' is converging with ';

				text += ma2Trend.label + ' ' + ma2 + ' ' + maType2.label + ' '

				if(mtgv.mtpp.crossFreq){
					var fieldDef =  getObjFrmArr(MA_PRICE_FIELDS, obj.compMaField);
					text+=  fieldDef.label +' ' ;
				}	

				text+= ' for min ' + obj.conDays ; 

				if(mtgv.mtpp.crossFreq){
					if(jsu.isNull(obj.maTick ))  obj.maTick = 'scrFreq';

						if(obj.maTick == 'scrFreq'){
							text+= ' On Screener ';
						}else{
							var maTick =  getObjFrmArr(mtgv.mtpp.FREQ_SCR_MAP, obj.maTick);
							text+= ' On '+ maTick.label +' ';
						}
				}
				text += ' ticks'

				csh.cdt(obj,text, validResults, selParam, true);
			}else{
				csh.cdt(obj,' Invalid value for MA Convergence', validResults, selParam, false);
				// if(!obj.disabled) validResults.invalidFields++;
			}	
		}
	}


	/************************************************************************************

			MA Divergence

	**************************************************************************************/


	function getMaDivHtml(maDivObj){
		var td2 =       getMaDivTd(maDivObj) ;
		var td2Div =  createDiv(maDivObj.id+'Td2Div', td2)
		var html = '<tr id='+maDivObj.id+'> ' +  createTd( td2Div ) +'</tr>';
		return html;

	}

	function getMaDivTd(maDivObj){

		var id = maDivObj.id;
		var func = 'csma.mdc'; 
		var html = '' ;

		html+= htmlU.doBold( 'MA Divergence : ' ); 

		html+= getCrossTickSpec(maDivObj , 'maDiv', func);

		//   20 SMA is diverging with  50 SMA for min 10 days after BULL Crossover happened within 20 ticks ....   

		html+= SP_3 + getDropDown(MA_TREND, id+'ma1Trend', null,func, id, maDivObj.ma1Trend);  

		html+= '  ' + getInputTxtParam( id+'ma1' , 5, maDivObj.ma1, func , id) +	htmlU.getSpan(' Supported MA range 2-200' , 'grey',8)	;	

		html+= ' ' + getDropDown(mtgv.mtpp.MA_TYPE, id+'maType1', null,func, id, maDivObj.maType1);  		

		html+= BR_2;

		html+= '  is diverging with ' + getDropDown(MA_TREND, id+'ma2Trend', null,func, id, maDivObj.ma2Trend); 

		html+= '  ' + getInputTxtParam( id+'ma2' , 5, maDivObj.ma2, func , id) +	htmlU.getSpan(' Supported MA range 2-200' , 'grey',8)	;	

		html+= ' ' + getDropDown(mtgv.mtpp.MA_TYPE, id+'maType2', null,func, id, maDivObj.maType2);  		

		html+= ' for min '+ getInputTxtParam( id+'divDays' , 5, maDivObj.divDays, func , id)    +' Ticks'  +	htmlU.getSpan(' Supported range 2-20' , 'grey',8)	;

		html+= BR_2;
		
		html+= ' after ' +   getDropDown(DIV_TYPE_LEAN, id+'coType', null,func, id, maDivObj.coType); 

		html+= ' Crossover happened within ' + getInputTxtParam( id+'coDays' , 5, maDivObj.coDays, func , id)  +	htmlU.getSpan(' Supported range 2-20' , 'grey',8)	;

		html+= ' ticks back';    // maDivObj.

		if(mtgv.mtpp.crossFreq){
			html+= cst.acscb(maDivObj.id);
		}

		var param = 'maDiv:'+id; // Vol Compare

		html+= csh.gept(maDivObj, MA_CS,  param);
		
		html+= SP_3 + csh.delIcon(param) ; // '<a  onClick="javascript:'+thisAlias+'.delRow(\''+delObj+'\');"><font size="4" color="red"><span class="glyphicon glyphicon-remove"></span></font> </a> ';

		return html;
	}

	function maDivChg(id){

		var scrData = mtgv.cs.screenerData;

		var obj= getObjFrmArr(scrData.maDivComp, id);

		csu.setProp(scrData.maDivComp, ['maType1','maType2', 'ma1' , 'ma2','ma1Trend'  , 'ma2Trend' ,'maTick', 
			'baseMaField', 'compMaField' ,  'divDays' ,   'coType' , 'coDays'],id);

		htmlU.addMsgToDiv(  obj.id+'Td2Div' , true, getMaDivTd(obj) );
		obj.goodData = true;

		if(!jsu.isIntegerInput(id+'ma1') || ! jsu.inputNumberRange (id+'ma1', 1,MAX_MA)){
			obj.goodData =false;
			// return; ;	
		} 

		if(!jsu.isIntegerInput(id+'ma2') || ! jsu.inputNumberRange (id+'ma2', 1,MAX_MA)){
			obj.goodData =false;
			// return; ;	
		} 

		if(!jsu.isPositiveNumInput(id+'divDays') || !jsu.inputNumberRange (id+'divDays', 2,20)){
			obj.goodData =false;
			// return; ;	
		} 
		
		if(!jsu.isPositiveNumInput(id+'coDays') || !jsu.inputNumberRange (id+'coDays', 2,20)){
			obj.goodData =false;
			// return; ;	
		} 

		csu.setProp(scrData.maDivComp, ['maType1','maType2', 'ma1' , 'ma2','ma1Trend'  , 'ma1Trend' ,'maTick', 
			'baseMaField', 'compMaField' ,  'divDays' ,   'coType' , 'coDays'],id);

		if(mtgv.mtpp.crossFreq){
			obj.custom = (obj.baseMaField != CLOSE || obj.compMaField != CLOSE );
		}

		csu.dsf(); // displaySelectedFields();

	}

	function validateDiv(validResults){

		var scrData = mtgv.cs.screenerData;
		for ( var i=0;i< scrData.maDivComp.length ;i++){
		
			var obj = scrData.maDivComp[i];
		

			var maType1 = getObjFrmArr( mtgv.mtpp.MA_TYPE,  obj.maType1); 
			var ma1 = obj.ma1;
			var ma1Trend = getObjFrmArr( MA_TREND,  obj.ma1Trend); 

			var maType2 = getObjFrmArr( mtgv.mtpp.MA_TYPE,  obj.maType2); 
			var ma2 = obj.ma2;
			var ma2Trend = getObjFrmArr( MA_TREND,  obj.ma2Trend); 

			var coType = getObjFrmArr( DIV_TYPE_LEAN,  obj.coType); 


			var selParam = 'maDiv:'+obj.id; 

			obj.csType = MA_CS;

			if(obj.goodData){
				// validResults.validFieldCount++;

				//   20 SMA is diverging with  50 SMA for min 10 days after BULL Crossover happened within 20 ticks ....   

				var text =''

				text += htmlU.doBold( 'MA Divergence : ' );
				

				text += ma1Trend.label + ' ' + ma1 + ' ' + maType1.label + ' '

				if(mtgv.mtpp.crossFreq){
					var fieldDef =  getObjFrmArr(MA_PRICE_FIELDS, obj.baseMaField);
					text+= ' on ' + fieldDef.label +' ' ;
				}

				text += ' is diverging with ';

				// text+= BR_2;

				text += ma2Trend.label + ' ' + ma2 + ' ' + maType2.label + ' '

				if(mtgv.mtpp.crossFreq){
					var fieldDef =  getObjFrmArr(MA_PRICE_FIELDS, obj.compMaField);
					text+=  fieldDef.label +' ' ;
				}	

				text+= ' for min ' + obj.divDays ; 

				text+= ' after '  + coType.label + ' crossover '   + obj.coDays  + ' back '; 	

				if(mtgv.mtpp.crossFreq){
					if(jsu.isNull(obj.maTick ))  obj.maTick = 'scrFreq';

						if(obj.maTick == 'scrFreq'){
							text+= ' On Screener ';
						}else{
							var maTick =  getObjFrmArr(mtgv.mtpp.FREQ_SCR_MAP, obj.maTick);
							text+= ' On '+ maTick.label +' ';
						}
				}
				text += ' ticks'

				csh.cdt(obj,text, validResults, selParam, true);
			}else{
				csh.cdt(obj,' Invalid value for MA Divergence', validResults, selParam, false);
				// if(!obj.disabled) validResults.invalidFields++;
			}	
		}

	}

	//------------------------------------------------

	function validateMa(validResults){

		validatePriceMa(validResults);
		validateMaCo(validResults);
		validateMaTrend(validResults);

		validateMaFake(validResults);
		validateSupResBounce(validResults);

		validateCon(validResults);
		validateDiv(validResults);

		maDiy.vf(validResults);

		maOlDiy.vf(validResults);

	}

	function getAddiMAVar(maObj , maType, maCnt , func){
		var html = '';


		var var1 =  'ma'+ maCnt +'v1';
		var var2 =  'ma'+ maCnt + 'v2';

		var id =maObj.id;

		if(maType == KAMA.toLowerCase()){
			
			if(jsu.isNull(maObj[var1])){
				maObj[var1] = 2;
			}
			html+= SP_3 + ' Fast (Smooth) ' +  getInputTxtParam( id+ var1 , 5, maObj[var1], func , id)	;

			
			if(jsu.isNull(maObj[var2])){
				maObj[var2] = 30;
			}
			html+= SP_3 + ' Slow (Smooth) ' +  getInputTxtParam( id+ var2 , 5, maObj[var2], func , id)	;

		}
		return html;
	}


	function valiAddiMAVar(maObj , maType, maCnt ){

		var var1 =  'ma'+ maCnt +'v1';
		var var2 =  'ma'+ maCnt + 'v2';
		var id =maObj.id;
		if(maType == KAMA.toLowerCase()){

			if(!jsu.isIntegerInput(id+var1) || ! jsu.inputNumberRange (id+var1, 1,100)){
				
				return false;
			} 
			if(!jsu.isIntegerInput(id+var2) || ! jsu.inputNumberRange (id+var2, 1,100)){
				
				return false;
			} 
			maObj.custom = true;
		}

		return true;
	}


	function getCustScrFilter(filer, defFilter){
		// var filer = [];
		
		filer.push({  id :  "pmaComp" , label : 'Price MA Comparision' , slabel : 'Moving Average'  , tab : MA_CS, 
			type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addMa' , params:  'pma' } , subDef : mtgv.mtpp.MA_TYPE, mobFilter: "maCs_pma" }) ; 

		filer.push({  id :  "macoComp" , label : 'MA Cross Over' , slabel : 'Moving Average Crossover'  , tab : MA_CS, 
			type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addMa' , params:  'maco' } , subDef : mtgv.mtpp.MA_TYPE , mobFilter: "maCs_maco"}) ; 


		filer.push({  id :  "maTrendComp" , label : 'MA Trend' , slabel : 'Trending Moving Average'  , tab : MA_CS, 
			type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addMa' , params:  'maTrend' }, subDef : mtgv.mtpp.MA_TYPE , mobFilter: "maCs_maTrend"}) ; 

		if( mtgv.mtpp.crossFreq){

				filer.push({  id :  "maFakeBreakComp" , label : 'MA Fake Breakout' , slabel : 'Moving Average Fake Breakout'  , tab : MA_CS, 
					type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addMa' , params:  'maFakeBreak' } , subDef : mtgv.mtpp.MA_TYPE , mobFilter: "maCs_maFakeBreak"}) ; 


				filer.push({  id :  "maSupResBounceComp" , label : 'Bounce From MA' , slabel : 'Bounce from Moving Average'  , tab : MA_CS, 
					type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addMa' , params:  'maFakeBreak' }, subDef : mtgv.mtpp.MA_TYPE , mobFilter: "maCs_maFakeBreak"}) ; 

				filer.push({  id :  "maConComp" , label : 'MA Convergence' , slabel : 'Moving Average Convergence'  , tab : MA_CS, 
					type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addMa' , params:  'maCon' }, subDef : mtgv.mtpp.MA_TYPE , mobFilter: "maCs_maCon"}) ; 

				filer.push({  id :  "maDivComp" , label : 'MA Divergence' , slabel : 'Moving Average Divergence'  , tab : MA_CS, 
					type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addMa' , params:  'maDiv' }, subDef : mtgv.mtpp.MA_TYPE , mobFilter: "maCs_maDiv"}) ; 
		}

		// defFilter.push({  id :  "pmaComp" , label : 'Price MA Comparision' , slabel : 'Moving Average'  , tab : MA_CS, 
		// 	type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addMa' , params:  'pma' } , subDef : mtgv.mtpp.MA_TYPE , mobFilter: ""}) ; 

		// defFilter.push({  id :  "macoComp" , label : 'MA Cross Over' , slabel : 'Moving Average Crossover'  , tab : MA_CS, 
		// 	type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addMa' , params:  'maco' } , subDef : mtgv.mtpp.MA_TYPE, mobFilter: ""}) ; 



		return filer ;
	}


	function ngSearch(item, filterDef, params ){

		let type = item.id.replace('Comp' ,'');

		paintFilterRow(type);
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



return{

	// New Starts 

	gar : getAllRows,

	gfr : getFormRow,

	gftd : getFormTd,

	anf : addNewFilter,

	afc : addFilterChange,

	pfr : paintFilterRow,
	ngs : ngSearch,

	// New Ends



	mht : getMaHtml,
	
	addMa : addMa,
	pmaChg : pmaChg,
	// vpm : validatePriceMa,

	macoChg : macoChg ,
	// vmco :  validateMaCo,

	maTrendChg : maTrendChg,
	// vmat : validateMaTrend

	fbc : maFakeBreakChg,

	spbc : maSupResBounceChg,

	mcc : maConChg,
	mdc : maDivChg,


	vma : validateMa,

	gcsf : getCustScrFilter

}

})(); // module 	