

var NEAR_FAR =[{id: "near", label: "Near"},{id: "far", label: "Off More Than"}, OPS_BETWEEN];

var HIGH_LOW =[{id: "high", label: "High"},{id: "low", label: "Low"}];

var DAY_TICK =[{id: "day", label: "Days"},{id: "tick", label: "Ticks"}];



 

var HL_PERIOD  = [

		//{id: "lbd", label: "Last Business Day"},
      {id: "1W", label: "One Week"},
      {id: "2W", label: "Two Week"},
      {id: "1M", label: "One Month"},
      {id: "3M", label: "Three Month"},
      {id: "6M", label: "Six Month"},
	  {id: "1Y", label: "One Year"},
	  {id: "2Y", label: "Two Year"},
	  {id: "3Y", label: "Three Year"},
	  {id: "4Y", label: "Four Year"},
	  {id: "5Y", label: "Five Year"},
	  {id: "10Y", label: "Ten Year"},



	  ];
	let HL_PERIOD_HIST = HL_PERIOD.slice();
	  
	HL_PERIOD_HIST.unshift( {id: "1D", label: "Day"})
      // {id: "1D", label: "Day"},
	  

	var histHighLowMap =  [
		{id :  'highDt' , csType :  HL_CS,   div : 'highDtHistDiv' , label :  'High Made  ' , suffix : '  back' ,  info: ' Choose Period to Match Recent High Dates'},
	
		{id :  'highWi' , csType :  HL_CS,   div : 'highWiHistDiv' , label :  'High within last ' , suffix : ' ' ,  info: ' Choose Period and enter to check if High Made within last n Days/Ticks'},

		{id :  'lowDt' ,  csType :  HL_CS,   div : 'lowDtHistDiv' , label :  'Low Made  ' , suffix : '  back' ,  info: ' Choose Period to Match Recent Low Dates'},
					
		{id :  'lowWi' ,  csType :  HL_CS,   div : 'lowWiHistDiv' , label :  'Low within last ' , suffix : ' ' ,  info: ' Choose Period and enter days to check if Low Made within last n Days/Ticks'},


	];





var cshl =  (function () {			

	var thisObject  = 'cshl';

	var htmlU = mintHtmlUtil;
	// var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;

	var HL_LABEL_WIDTH =220;

	function getHighLowHtml(id){

		var scrData = mtgv.cs.screenerData;

		var html ='<br/><div id="'+id+'Div">';
		html+= '<table id="hlCtrlTab" '+TAB_INDI_STYLE+'  >';
/*
		for(var i=0;i<histHighLowMap .length ;i++ ){
			html += getHighLowMadeOn(histHighLowMap[i].id);
		}
*/
		html+= getAllRows();
		
		html+= '</table>'; // BS TAB START...		


		html+= getControls();
		
		html+='<div '+CS_HELP_DIV_STYLE +'>';


		var  helpText = "You can choose combinations like One Year High was made in previous Trading Session . "
			+" In Such case you need to select first Row options and enter text value as 1 "

			+"<br/> For Option Checking if Six Months Low was made in last 3 Trading session then enter 3 in fourth Option ";
		helpText += '<br/> Or a combo of Six Months High was made in last 5 days (Select 2nd Option) and price is Still within 2 % of One year High (Click on Compare with Historical High/Lows)'

		

		html+=  getSpan(helpText,  'grey', 10);

		// html+= BR_2 + getSpan(ohlcComp,  'grey', 10);

		html+='</div>';




		html +='</div>'; //pvCsDiv	

		// console.log(html);
		return html;
	}


	function getAllRows(){
		var scrData = mtgv.cs.screenerData;

		let html ='';

		if(!jsu.isMigContext()){
			var hlObject = mtgv.cs. screenerData.hlSustain;

			if(mtgv.cs.ng){
				if( !jsu.isNullDef(hlObject.hlSusHist) && jsu.isNotNull(hlObject.hlSus) ){

					html+= getHlSustainRow();
				}

			}else{
				html+= getHlSustainRow();
			}

		}

		


		// html += getHighLowMadeOn('highDt', scrData.highDtHist);
		// html += getHighLowMadeOn('highWi', scrData.highWiHist);

		// html += getHighLowMadeOn('lowDt', scrData.lowDtHist);
		// html += getHighLowMadeOn('lowWi', scrData.lowWiHist);


		for(var i=0;i< scrData.hlComp.length;i++){
				html+= getNewHlCompHtml(scrData.hlComp[i]) ;
		}


		for(var i=0;i< scrData.hlRangeComp.length;i++){
				html+= getNewHlRangeNgHtml(scrData.hlRangeComp[i]) ;
		}


		for(var i=0;i< scrData.priceHlComp.length;i++){
				html+= getHlCompHtml(scrData.priceHlComp[i]) ;
		}

		return html;

	}


	function getFormRow(type, id, state){ //MA_PRICE_OPTIONS

		let obj =   csu.gso(type, id)

		if(type=='hls'  || type == 'hlSustain'){
			obj= mtgv.cs. screenerData.hlSustain;
		}


		if(jsu.isNotNull(state)){
			if(state == 'enable')  obj.disabled  = false;
			if(state == 'disable') obj.disabled  = true	;
		}else{
			 obj.disabled  = false;
		}


		if(type=='hls'  || type == 'hlSustain'){ // add new Intraday.....
    	    return getHlSustainRow();
		}else if(type=='anhl'  || type =='hlComp' ){
    	     return getNewHlCompHtml(obj);
		}else if(type=='anhlr'   || type =='hlRange' || type =='hlRangeComp'){
    	     return getNewHlRangeNgHtml(obj);
		}else if(type == 'hlc' || type =='priceHlComp' || type =='pricHl'){
    	     return getHlCompHtml(obj);
		}
	}


	function getFormTd(type, id, state){ //MA_PRICE_OPTIONS

		let obj =   csu.gso(type, id)

		if(type=='hls'  || type == 'hlSustain'){
			obj= mtgv.cs. screenerData.hlSustain;
		}


		if(jsu.isNotNull(state)){
			if(state == 'enable')  obj.disabled  = false;
			if(state == 'disable') obj.disabled  = true	;
		}else{
			 obj.disabled  = false;
		}


		if(type=='hls'  || type == 'hlSustain'){ // add new Intraday.....
    	    return hlSustainTd();
		}else if(type=='anhl'  || type =='hlComp' ){
    	     return getNewHlCompTd(obj);
		}else if(type=='anhlr'   || type =='hlRange' || type =='hlRangeComp'){
    	     return getNewHlRangeNgTd(obj);
		}else if(type == 'hlc' || type =='priceHlComp' || type =='pricHl'){
    	     return getHlCompTd(obj);
		}
	}



	function getControls(){

		let html ='';

		html+= getButtonP('New High Lows' , 'cshl.ahl', 'anhl');
		html+= SP_3;

		html+= getButtonP('New High Low Range' , 'cshl.ahl', 'anhlr');
		html+= SP_3;

		html+= getButtonP('Compare With Historical High Lows' , 'cshl.ahl', 'hlc');

		return html;

	}


	function addHighLows(type){ //MA_PRICE_OPTIONS

		let json = addNewFilter(type);

		$('#hlCtrlTab').append(json.html );

		addFilterChange(type , json.id);

	}

	function addNewFilter(type){

		var scrData = mtgv.cs.screenerData;
		var id =  myTsrScreener.getNextId(type +'CompId');

		let html =''

		if(type=='hls'  || type == 'hlSustain'){
			var highLowObj = mtgv.cs. screenerData.hlSustain;

			// highLowObj

			html = getHlSustainRow();
			id = highLowObj.id;
		}else if(type=='anhl'){
			var id =  myTsrScreener.getNextId('hlCompId')

			var hlComp = {
				id :id, period : 1,  term :  'year' , newHl :0,  hl : HIGH_LOW[0].id , ticks : getPeriodNew()[0].id
			};

			 mtgv.cs.screenerData.hlComp.push(hlComp); 

			 html = getNewHlCompHtml(hlComp)
			
		}else if(type=='anhlr'){

			var id =  myTsrScreener.getNextId('hlRangeCompId')

			var hlRangeComp = {
				id :id, period : 1,  term :  'year' , newHl :3,  hl : HIGH_LOW[0].id , ticks : getPeriodNew()[0].id
			};

			mtgv.cs.screenerData.hlRangeComp.push(hlRangeComp); 

	        html =  getNewHlRangeNgHtml(hlRangeComp);

		}else if(type=='hlc'){	
			
			var id =  myTsrScreener.getNextId('priceHlCompId')
			var obj={ id :id, pcCmp:PERCENT_CMP[0].id, nearFar:NEAR_FAR[0].id,hlPeriod : HL_PERIOD[0].id , hl :HIGH_LOW[0].id};
			mtgv.cs. screenerData.priceHlComp.push(obj); 
	     	
	        html = getHlCompHtml(obj) ;
		}

		return { html : html , id : id};

	}


	function addFilterChange(type, id){ //MA_PRICE_OPTIONS
		
		if(type=='hls' || type == 'hlSustain'){ // add new Intraday
    	    hlSustainChg()
		}else if(type=='anhl'){
    	    hlNewChg(id)
		}else if(type=='anhlr'){
    	    hlRangeNgChg(id);
		}else if(type == 'hlc'){
    	    hlCompChg(id)
		}

        csu.dsf(); // displaySelectedFields();
	}


	/****************************************************************
			High Made On

	*****************************************************************/

	

	function getHighLowMadeOn(type){

		var obj = jsu.getObjFrmArr(histHighLowMap, type);

		var highLowObj = jsu.getObjFrmArr(mtgv.cs. screenerData.hlHist , type);

		
		// if(jsu.isNull(highLowObj) ){
		// 	highLowObj ={id : type, histType : NA_VAL};
		// 	mtgv.cs. screenerData.hlHist.push(highLowObj);
		// }

		var val = histHLVal(highLowObj, type);

		val+= BREAK_LINE;
		val+= getSpan('Caution :  ' , 'orange' , 10 );

		val+= getSpan('Please use '+doBold( 'New high Low / Range')+' Option Button <i class="fas fa-long-arrow-alt-down"></i> Instead. This will be removed by 31st Mar' , 'grey' , 10  );




		var td = createTd(createDiv( obj.div , val)); 

		

		// setHlHistVali(highLowObj, obj)
		return '<tr  >'+  td +'</tr>';   // +  createTd( doBold('Close Price') )
	}

	function histHLVal (highLowObj, type){
		var obj = jsu.getObjFrmArr(histHighLowMap, type);
		var func = 'cshl.hhlc'

		var periodMap = HL_PERIOD.slice();
		periodMap.splice(0, 0, {id:NA_VAL, label : 'Select One' });

		var val =   getDropDown(periodMap,  type+ 'HistDd', null, func, type, highLowObj.histType)
		
		if( jsu.isNullDef(highLowObj.histType)){
			val+= SP_3 +  htmlU.getSpan(obj.info, 'grey',10) ; 
		}else{
			val+= SP_3 +  obj.label ; 
			val += SP_3 + getInputTxtParam( type +'hlHistDays' , 3, highLowObj.hlHistDays, func , type)  ;
			val += SP_3 + getDropDown(DAY_TICK,  type+ 'tickType', null, func, type, highLowObj.tickType)


			val+= SP_3 +  obj.suffix  + htmlU.getSpan(' (Max 10 Days/Ticks , Zero for Latest)', 'grey',8) 
		}




		return val;
	}

	function histHighLowChg(type){

		var histType =  htmlU.getInputVal(type +'HistDd'); 
		var obj = jsu.getObjFrmArr(histHighLowMap, type);

		var func = 'cshl.hhlc';			

		var hlObject = jsu.getObjFrmArr(mtgv.cs. screenerData.hlHist , type);


		hlObject.histType = histType;

		var periodMap = HL_PERIOD.slice();
		periodMap.splice(0, 0, {id:NA_VAL, label : 'Select One' });

		var val =  getDropDown(periodMap,  type+ 'HistDd', null, func, type, hlObject.histType);
		if( jsu.isNullDef(histType)){
			val+= SP_3 +  htmlU.getSpan(obj.info, 'grey',10) ; 
			htmlU.addMsgToDiv( obj.div	, true, val); 
			hlObject.goodData = false;

			
		}else{
			
			var period = type +'hlHistDays'
			hlObject.hlHistDays = htmlU.getInputVal(period)
			hlObject.tickType = htmlU.getInputVal(type+ 'tickType');

			val+= SP_3 +  obj.label ; 
			val += SP_3 + getInputTxtParam( type +'hlHistDays' , 3, hlObject.hlHistDays, func , type) ;  ;

			val += SP_3 + getDropDown(DAY_TICK,  type+ 'tickType', null, func, type, hlObject.tickType);
			val+= SP_3 +  obj.suffix   + htmlU.getSpan(' (Max 10 Days , Zero for Latest - <b>Tick here is 5 Min TicK</b>)', 'grey',8) 


			hlObject.hlHistDays = htmlU.getInputVal(period)
			
			htmlU.addMsgToDiv( obj.div	, true, val); 

			if(jsu.isIntegerInput(period)  && jsu.inputNumberRange ( period, 0,10) ){
				// good Numbber.... Do not Remove ... Kept For marking border of Text box...
			}	
		}

		// setHlHistVali(hlObject,obj);
		// jsu.isInputPositiveNumber ('priceTrendPeriod');		
		csu.dsf(); // displaySelectedFields();


	}

	function setHlHistVali(hlObject){

		var obj = jsu.getObjFrmArr(histHighLowMap, hlObject.id);

		hlObject.csType = HL_CS;
		if( jsu.isNullDef(hlObject.histType)){
			hlObject.hasData = false;
			return;
		}
		hlObject.hasData = true;
		var goodData = true;
		var days =hlObject.hlHistDays;
		if(jsu.isNotNull( days)) days = Number(days);

		var valiMsg ='High / Lows : ';
		if(  jsu.isInteger(days) && (days >=0 || days <= 10)){

			var tickObj = jsu.getObjFrmArr(DAY_TICK,  hlObject.tickType);
			valiMsg +=    obj.label +' '   +  hlObject.hlHistDays +  ' ' +tickObj.label +' '+ obj.suffix ;  
		}else{
			goodData = false;
			valiMsg  += ' Invalid value for High /Low Period  ';
		}
		hlObject.goodData = goodData;
		hlObject.valiMsg  =  valiMsg;
	}

	function validateHlHist(validResults){


		var arr = mtgv.cs.screenerData.hlHist;
		for(var i=0;i<arr.length ;i++ ){
			var obj  = arr [i];

			setHlHistVali(obj)





			if(!obj.hasData) continue;


			var selParam =  'hlHist' + ':' + obj.id
			if(obj.goodData){
				// validResults.validFieldCount++;
				csh.cdt(obj,obj.valiMsg, validResults, selParam, true);
			}else{
				csh.cdt(obj,obj.valiMsg, validResults, selParam, false);
				// if(!obj.disabled) validResults.invalidFields++;

			}
		}

	}
	


/**********************************************************************************************
									New High / Lows Flexible
**********************************************************************************************/


	function getNewHlCompTd(hlComp){
		var csTypeId = hlComp.id;
		var func = 'cshl.hlnc';

		var fncParam = csTypeId ;;

		var html='';


		html+= htmlU.doBold('New High/Low : ') ;


		html+= SP_3 + getInputTxtParam( csTypeId+'period' , 3, hlComp.period, func , csTypeId)

		html+=  SP_3 + getDropDown(getPeriodNew(), csTypeId+'term', "width:90px;",func, fncParam, hlComp.term);

		html+= SP_3 + getDropDown( HIGH_LOW , csTypeId+'hl', "width:90px;",func, fncParam, hlComp.hl); 


		html+= ' made ' + getInputTxtParam( csTypeId+'newHl' , 3, hlComp.newHl, func , csTypeId);

		html+= ' Tick Back ' ;

		html+=  htmlU.getSpan(' Optional  -   where 0 is latest,  valid entry 0 to 5' , 'grey' , 10);


		// html+=  SP_3 + getDropDown(getPeriodNew(), csTypeId+'ticks', "width:90px;",func, fncParam, hlComp.ticks);



		var param = 'hlComp:'+csTypeId; 

		html+= csh.gept(hlComp, HL_CS,  param);

		html+= SP_3 + csh.delIcon(param) ;

		return html;
	}


	function getNewHlCompHtml(hlComp){


		

		let  html = getNewHlCompTd(hlComp)

		html =  createDiv(hlComp.id+'Td2Div', html);

		return '<tr id="'+hlComp.id+'">' +createTd( html ) +'</tr>';

	}


	function hlNewChg(id){

		var scrData = mtgv.cs.screenerData;

		// var obj= getObjFrmArr(scrData.hlComp, id);

		csu.setProp( scrData.hlComp, ['period','term','hl',  'newHl' ],id);   // 'ticks',

		if(inputNumberRange (id+'period', 1,200) && jsu.isIntegerInput( id+'period')){

		}


		if(jsu.isNotNull(id+'newHl')){
			jsu.inputNumberRange (id+'newHl', 1,5) ;
			jsu.isIntegerInput( id+'newHl');
		}

		csu.setProp( scrData.hlComp, ['period','term','hl',  'newHl' ],id);   // 'ticks',

		csu.dsf(); // displaySelectedFields();

	}


	function vaidateNewHl(validResults){
		var objArr = validResults.scrData.hlComp;

		for ( var i=0;i< objArr.length ;i++){
			var obj = objArr[i];

			var goodData = true;
			var text = '';
			obj.csType = HL_CS;


			text += htmlU.doBold('New High/Low : ') ;

			if( jsu.isNumber(obj.period) && Number(obj.period) >0){
				text +=  obj.period ;

			}else{
				obj.goodData = false;
			}

			var termObj = jsu.getObjFrmArr(getPeriodNew(), obj.term );
			var hlObj = jsu.getObjFrmArr(HIGH_LOW, obj.hl );

			text+= ' ' +termObj.label + ' ' + hlObj.label




			// if(jsu.isNotNull(id+'newHl')){
				if( jsu.isNumber(obj.newHl) && obj.newHl >=0 &&  obj.newHl <=5  ){

					// var tickObj = jsu.getObjFrmArr(getPeriodNew(), obj.ticks );


					if(obj.newHl ==  0){
						text+= ' made in latest  tick ';   //  ' + tickObj.label  + '
					}else{
						text+= ' made ' + 	obj.newHl  +' ticks back' // +' '  + tickObj.label  + 
					}
					


				}else{
					obj.goodData = false;
				}
			// }

			var selParam =   'hlComp:'+obj.id ; 

			obj.goodData = goodData;

			if(goodData){
				csh.cdt(obj,text, validResults, selParam, true);
				// validResults.validFieldCount++; 	
			 }else{
			 	csh.cdt(gainObj,text, validResults, selParam, false);
			 	// if(!gainObj.disabled) validResults.invalidFields++;
			 }

		}


	}

	
/**********************************************************************************************
									New High / Lows Flexible Ends
**********************************************************************************************/




/**********************************************************************************************
									New High / Lows Range Flexible
**********************************************************************************************/

	function getNewHlRangeNgTd(hlRangeComp){

		var csTypeId = hlRangeComp.id;
		var func = 'cshl.hlrc';

		var fncParam = csTypeId ;;

		var html='';

		html+= htmlU.doBold('New High/Low Range : ') ;

		html+= SP_3 + getInputTxtParam( csTypeId+'period' , 3, hlRangeComp.period, func , csTypeId)

		html+=  SP_3 + getDropDown(getPeriodNew(), csTypeId+'term', "width:90px;",func, fncParam, hlRangeComp.term);

		html+= SP_3 + getDropDown( HIGH_LOW , csTypeId+'hl', "width:90px;",func, fncParam, hlRangeComp.hl); 


		html+= ' made within ' + getInputTxtParam( csTypeId+'newHl' , 3, hlRangeComp.newHl, func , csTypeId);

		html+= ' Screener Tick ' ;

		html+=  htmlU.getSpan(' Optional  -   where 0 is latest,  valid entry 0 to 5' , 'grey' , 10);


		var param = 'hlRangeComp:'+csTypeId; 

		html+= csh.gept(hlRangeComp, HL_CS,  param);

		html+= SP_3 + csh.delIcon(param) ;

		return html;
	}


	function getNewHlRangeNgHtml(hlRangeComp){


		let html = getNewHlRangeNgTd(hlRangeComp);

		html =  createDiv(hlRangeComp.id+'Td2Div', html);
		return '<tr id="'+hlRangeComp.id+'">' +createTd( html ) +'</tr>';

	}


	function hlRangeNgChg(id){

		var scrData = mtgv.cs.screenerData;


		csu.setProp( scrData.hlRangeComp, ['period','term','hl',  'newHl' ],id);   // 'ticks',

		if(inputNumberRange (id+'period', 1,200) && jsu.isIntegerInput( id+'period')){

		}


		if(jsu.isNotNull(id+'newHl')){
			jsu.inputNumberRange (id+'newHl', 1,5) ;
			jsu.isIntegerInput( id+'newHl');
		}

		csu.setProp( scrData.hlRangeComp, ['period','term','hl',  'newHl' ],id);   // 'ticks',

		csu.dsf(); // displaySelectedFields();

	}


	function vaidateNewRangeHl(validResults){
		var objArr = validResults.scrData.hlRangeComp;

		for ( var i=0;i< objArr.length ;i++){
			var obj = objArr[i];

			var goodData = true;
			var text = '';

			text += htmlU.doBold('New High/Low Range : ') ;

			if( jsu.isNumber(obj.period) && Number(obj.period) >0){
				text +=  obj.period ;

			}else{
				obj.goodData = false;
			}

			var termObj = jsu.getObjFrmArr(getPeriodNew(), obj.term );
			var hlObj = jsu.getObjFrmArr(HIGH_LOW, obj.hl );

			text+= ' ' +termObj.label + ' ' + hlObj.label




			// if(jsu.isNotNull(id+'newHl')){
				if( jsu.isNumber(obj.newHl) && obj.newHl >=0 &&  obj.newHl <=5  ){

					// var tickObj = jsu.getObjFrmArr(getPeriodNew(), obj.ticks );


					if(obj.newHl ==  0){
						text+= ' made in latest  tick ';   //  ' + tickObj.label  + '
					}else{
						text+= ' made within ' + 	obj.newHl  +' screener ticks ' // +' '  + tickObj.label  + 
					}
					


				}else{
					obj.goodData = false;
				}
			// }

			var selParam =   'hlRangeComp:'+obj.id ; 

			obj.goodData = goodData;

			obj.csType = HL_CS;

			if(goodData){
				csh.cdt(obj,text, validResults, selParam, true);
				// validResults.validFieldCount++; 	
			 }else{
			 	csh.cdt(gainObj,text, validResults, selParam, false);
			 	// if(!gainObj.disabled) validResults.invalidFields++;
			 }

		}


	}

	
/**********************************************************************************************
									New High / Lows Range Flexible Ends
**********************************************************************************************/



/**********************************************************************************************
									New High / Lows and sustaining
**********************************************************************************************/
	
	function getHlSustainRow(){

		
		let td = hlSustainTd()

		// if(mtgv.cs.ng){
		// 	var highLowObj = mtgv.cs. screenerData.hlSustain;
		// 	highLowObj.id = 'hlSustain';

		// 	var selParam =  'hlSus' + ':' + 'hlSus'
		// 	td+= SP_3 + csh.delIcon(selParam) ; // '<a  onClick="javascript:'+thisAlias+'.delRow(\''+delObj+'\');"><font size="4" color="red"><span class="glyphicon glyphicon-remove"></span></font> </a> ';

			
		// }

		return '<tr id="hlSustain">' +createTd(createDiv( 'hlSustainTd2Div' , td ))  + '</tr>';


	}


	function printHlSustainDefault(){

	}


	function hlSustainTd(){

		var highLowObj = mtgv.cs. screenerData.hlSustain;

		var periodMap = HL_PERIOD.slice();
		
		if(!mtgv.cs.ng){
			periodMap.splice(0, 0, {id:NA_VAL, label : 'Select One' });	
		}


		if(mtgv.cs.ng){
			if ( jsu.isNull(highLowObj.hlSusHist) )  highLowObj.hlSusHist = HL_PERIOD[1].id;
			if ( jsu.isNull(highLowObj.hlSus) )  highLowObj.hlSus = 'high';
		}
		


		var func = 'cshl.hlsc';	
		var val =   getDropDown(periodMap,  'hlSusHistDd', null, func, null, highLowObj.hlSusHist)

			

		var td = doBold( 'New Intraday '+ " : " + val  );

		if( jsu.isNullDef(highLowObj.hlSusHist)){
			td+= SP_3 +  htmlU.getSpan("Works for Intraday Only when Price has hit a new High/Low and is sustaining ", 'grey',10) ; 
		} else{
			td += SP_3 + getDropDown(HIGH_LOW,  'hlSusDd', null, func, null, highLowObj.hlSus);

			if(highLowObj.hlSus =='high' ||  jsu.isNull(highLowObj.hlSus) ){
				td+= " and is still Above previous Day High"
			}else{
				td+= " and is still below previous Day Low"
			}
			 
		}

		if(mtgv.cs.ng){
			var highLowObj = mtgv.cs. screenerData.hlSustain;
			highLowObj.id = 'hlSustain';

			var selParam =  'hlSustain' + ':' + 'hlSustain'

			td+= csh.gept(highLowObj, HL_CS,  selParam);

			td+= SP_3 + csh.delIcon(selParam) ; // '<a  onClick="javascript:'+thisAlias+'.delRow(\''+delObj+'\');"><font size="4" color="red"><span class="glyphicon glyphicon-remove"></span></font> </a> ';

			
		}
		

		return td ; //   ;   // +  createTd( doBold('Close Price') )

	}

	function hlSustainChg(){
		var hlObject =  mtgv.cs. screenerData.hlSustain;

		// var hlSusHist =  htmlU.getInputVal('hlSusHistDd'); 

		hlObject. hlSusHist  =  htmlU.getInputVal('hlSusHistDd'); ;
		hlObject. hlSus = htmlU.getInputVal('hlSusDd');  ;

		if(! jsu.isNullDef(hlObject.hlSusHist)  &&  jsu.isNull(hlObject. hlSus) ){
			hlObject.hlSus = 'high';
		}


		htmlU.addMsgToDiv(  'hlSustainTd2Div'	, true, hlSustainTd());
		
		hlObject. hlSus = htmlU.getInputVal('hlSusDd');  // setting again when doing for first time...

		csu.dsf(); // displaySelectedFields();
	}


	function validateHlSus(validResults){

		console.log('vhls')

		var hlObject = mtgv.cs. screenerData.hlSustain;

		if( jsu.isNullDef(hlObject.hlSusHist) || jsu.isNull(hlObject.hlSus) ){
			hlObject.hasData = false;
			return;
		}
		hlObject.hasData = true;
		hlObject.goodData = true;

		var periodObj = jsu.getObjFrmArr(HL_PERIOD, hlObject.hlSusHist);
		var hlObj = jsu.getObjFrmArr(HIGH_LOW, hlObject.hlSus);


		hlObject.valiMsg =  htmlU.doBold("Intraday High/Low : ") +   'Made new ' + periodObj.label + " " + hlObj.label + ' and sustaining vis-a-vis previous day' ;

		// hlObject.id = 

		hlObject.csType=HL_CS ;

		var selParam =  'hlSustain' + ':' + 'hlSustain'
		if(hlObject.goodData){
			// validResults.validFieldCount++;
			csh.cdt(hlObject,hlObject.valiMsg, validResults, selParam, true);
		}else{
			csh.cdt(hlObject,hlObject.valiMsg, validResults, selParam, false);
			// if(!obj.disabled) validResults.invalidFields++;

		}

	}


	/**********************************************************************************************
									HIGH LOW HTML
	**********************************************************************************************/
	



	function getHlCompHtml(obj){
		
		var html = getHlCompTd(obj)


		html =  createDiv(obj.id+'Td2Div', html);


		return '<tr id="'+obj.id+'">' +
		 // + createTd( createDiv(obj.id+'Td1Div', tds.td1, null)  , CS_LABEL_WIDTH) 
		   createTd( html ) +'</tr>';
		// return html;


	}

	function getHlCompTd(obj){
		var id = obj.id;
		var func = 'cshl.hlcc';


		var html = '';
		html+= htmlU.doBold('Compare With Hist High / Lows : ') ;


		html +=  'Latest Price ' + getDropDown(NEAR_FAR, id+'nearFar', null,func, id, obj.nearFar);
		html+=  SP_3 ;
		
		html+=getDropDown(PERCENT_CMP, id+'pcCmp', null,func, id, obj.pcCmp)

		if(obj.nearFar == CS_BETWEEN){

			html+= ' and ';

			html+= SP_3 + getDropDown(PERCENT_CMP, id+'pcCmpTo', null,func, id, obj.pcCmpTo);
		}

		html+=  SP_3 +' Of ' +SP_3;
		html+= getDropDown(HL_PERIOD_HIST, id+'hlPeriod', null,func, id, obj.hlPeriod)
		html+=  SP_3 ;
		html+= getDropDown(HIGH_LOW, id+'hl', null,func, id, obj.hl)
		var param = 'pricHl:'+id; // Vol Compare
		html+= csh.gept(obj, HL_CS,  param);

		html+= SP_3 + csh.delIcon(param) ; // '<a  onClick="javascript:'+thisAlias+'.delRow(\''+delObj+'\');"><font size="4" color="red"><span class="glyphicon glyphicon-remove"></span></font> </a> ';

		return html;


	}


	function hlCompChg(id){
		csu.setProp(mtgv.cs.screenerData.priceHlComp, ['nearFar','pcCmp','hlPeriod','hl', 'pcCmpTo'],id);

		var obj = jsu.getObjFrmArr(mtgv.cs.screenerData.priceHlComp , id); 

		var td = getHlCompTd(obj);

		htmlU.addMsgToDiv(obj.id+'Td2Div' , true, td);

		csu.setProp(mtgv.cs.screenerData.priceHlComp, ['nearFar','pcCmp','hlPeriod','hl', 'pcCmpTo'],id);

		csu.dsf(); // displaySelectedFields();
	}


	function validateHighLowComp(params){

		var scrData = params.scrData;
		for ( var i=0;i< scrData.priceHlComp.length ;i++){
			var obj = scrData.priceHlComp[i];
			var pcCmp = getObjFrmArr( PERCENT_CMP,  obj.pcCmp); 
			var nearFar = getObjFrmArr( NEAR_FAR,  obj.nearFar); 
			var hlPeriod = getObjFrmArr( HL_PERIOD_HIST, obj.hlPeriod);
			var hl = getObjFrmArr( HIGH_LOW, obj.hl);

			var text = htmlU.doBold('Compare With Hist High / Lows : ') ;

			 text += 'Close Price ' +nearFar.label + ' ' + pcCmp.label  + ' Of ' + hlPeriod.label + ' ' +hl.label;

			obj.csType = HL_CS;
			obj.goodData = true;
			var selParam  =  'pricHl:'+ obj.id;
			var json = 	csh.cdt(obj, text, params ,selParam, true);

			// validResults.validFields+= getSpan(text, 'green', CS_SEL_FONT_SIZE) + '<br/>';
			// validResults.validFieldCount++;
		}

	}

	/**********************************************************************
		
		New High Low NG   ....

	/**********************************************************************/




	function validateHL(validResults){
		vaidateNewHl(validResults);
		vaidateNewRangeHl(validResults);
	}



	function getPeriodNew(){

		var periods = [
	      {id: "day", label: "Days"},
	      {id: "week", label: "Weeks"},
	      {id: "mth", label: "Months"},
	      {id: "year", label: "Years"},
	  ];

	  if(mtgv.mtpp.rt &&  mtgv.mtpp.crossFreq ){
	  
		   periods.unshift(   {id: "hr", label: "Hours"} );
		   periods.unshift(   {id: "5min", label: "5 Minutes"});
	  }


      return periods;

	}



	function getCustScrFilter(filer,defFilter){
		// var filer = [];

		
		if(!jsu.isMigContext() && mtgv.mtpp.crossFreq){
			filer.push({  id :  "hlSusDiv" , label : 'New Intraday High'  , sLabel : 'New Intraday High'  ,
			 tab : HL_CS, type : 'dd' }) ;	
		}
		
		

		// JavaScript:cshl.anhl('hl');

		let obj = {  id :  "hlComp" , label : 'New High Low '  , sLabel : 'New High , New Low '  , tab : HL_CS, 
			type : 'btn'  , filtDef : {obj: thisObject, fnc: 'anhl' , params:  'hl' } , mobFilter: "hlCs_newHls"};

		defFilter.push(obj)


		filer.push(obj) ;    

		filer.push({  id :  "hlRangeComp" , label : 'New High Low within '    , tab : HL_CS, 
			type : 'btn'  , filtDef : {obj:'cscmn', fnc: 'anhlr' , params:  'hl' } , mobFilter: "hlCs_newHlrange"}) ;  


		filer.push({  id :  "priceHlComp" , label : 'High Low Range Compare '  , sLabel : 'OHLC Trending '  , tab : HL_CS, 
			type : 'btn'  , filtDef : {obj:thisObject, fnc: 'hlc' , params:  'hl' } , mobFilter: "hlCs_compHistHl"}) ; 

		return filer ;

	}

	function ngSearch(item, filterDef, params ){

		let id = ''

		let type = item.id

		if(type =='hlSusDiv'){ // add new Intraday
    	    id = 'hls'
		}else if(type=='hlComp'){
    	    id = 'anhl'
		}else if(type=='hlRangeComp'){
    	   id = 'anhlr'
		}else if(type == 'priceHlComp'){
    	   id ='hlc'
		}

/*
	if(type=='hls'){ // add new Intraday
    	    hlSustainChg()
		}else if(type=='anhl'){
    	    hlNewChg(id)
		}else if(type=='anhlr'){
    	    hlRangeNgChg(id);
		}else if(type == 'hlc'){
    	    hlCompChg(id)
		}
*/




		paintFilterRow(id);
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


// 


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


		ahl : addHighLows ,

		hlht :  getHighLowHtml,

		hhlc : histHighLowChg,
		vhlh : validateHlHist,

		hlsc  :hlSustainChg,
		vhls  :validateHlSus,

		// hlc : addHighLowC,
		hlch : 	getHlCompHtml,
		hlcc : hlCompChg,
		vhlcc : validateHighLowComp,


		// new High Low 

		// anhl : addNewHighLow,
		ghnl :	getNewHlCompHtml,
		hlnc : hlNewChg,
		vhl : validateHL,


		// new High low Range ...
		// anhlr : addNewHighLowRangeNg ,
		gnhlr : getNewHlRangeNgHtml,
		hlrc : hlRangeNgChg,

		gcsf : getCustScrFilter


	
	
		
		
			
			
			



	}


})(); // module 			  