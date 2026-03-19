
var cscmn =  (function () {
// CS Commons
	var htmlU = mintHtmlUtil;
	// var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;


	function getTechTickPeriod(period){

		var tickPeriod = [
			{id: '0' , label: 'Latest'},
			{id: '1' , label: 'Previous (P-1)'},
			];

			if(mintJsUtil.isNull(period)){
				period = 100;
			}

		 	for(var i=2;i<period;i++){
		 		tickPeriod.push( {id: i , label: '(P- '+i +')'}  );
		 	}

	 	return tickPeriod;

	}


/*******************************************************************************************
		TREND 
********************************************************************************************/

	function getTrendHtml(trendObj, type){

		// var html =  '';

		var trendDef = jsu.getObjFrmArr( TRENDING_DEF, type);

		var val = trendPeriodVal(trendObj, type);

		var td = createTd(createDiv( type +'Trend'+'Div' , val)); 

		var obj = jsu.getObjFrmArr(trendDef.map, type);

		return '<tr  >'+ createTd( doBold(trendDef.label), null ) +  td +'</tr>';
		// return html;
	}

	function trendPeriodVal (trendObject, type){
		// var obj = jsu.getObjFrmArr(trendMap, type);
		var trendDef = jsu.getObjFrmArr( TRENDING_DEF, type);

		var func = 'cscmn.tc'
		var val =  getDropDown(trendDef.map,  type+ 'TrendDd', null, func, type, trendObject.id)
		
		

		if(jsu.isNull(trendObject.period )) trendObject.period =3;

		if( !jsu.isNullDef(trendObject.id)){
			val += SP_3 + 'Min. Period : '+  getInputTxtParam( type + 'TrendPeriod' , 5, trendObject.period, func , type)	+", ";
			val += SP_3 + 'Min. %Chg' + getSpan('Optional', 'grey',8) +" : " +  getInputTxtParam( type +'TrendPc' , 3, trendObject.trendPc, func , type) + ' %'	+", ";
			val += BREAK_LINE + 'Exceptions '+ getSpan('Optional', 'grey',8)  + " : " +  getInputTxtParam( type +'TrendEx' , 3, trendObject.trendEx, func , type) + 	getSpan('# of times When Criteria Does not Match. Valid Range 0-5', 'grey',8) ;
		}

		var type  = ''
		if(trendDef.id.startsWith('price')){
			type = 'OHLC Trending';
		}else{
			type ='Volume Trending'
		}

		val+= BREAK_LINE + getSpan('Caution :  ' , 'orange' , 10 )    

		+ getSpan('Please use '+doBold( type )+' Option Button <i class="fas fa-long-arrow-alt-down"></i> Instead. This will be removed by 31st Mar' , 'grey' , 10  );

		return val;
	}


	function trendChg(type){
		var ops =  htmlU.getInputVal(type +'TrendDd'); 

		var period = type +'TrendPeriod';
		var trendPc = type +'TrendPc';
		var trendEx = type +'TrendEx';

		var trendDef = jsu.getObjFrmArr( TRENDING_DEF, type);

		var trendObject = mtgv.cs.screenerData.trend[type +'Trend'];


		var curOps = trendObject.id;
		trendObject.id = ops;

		var valDef = ''

		// if(ops=='na') {
		// 	trendObject.period =  null;
		// 	trendObject.trendPc =  null;
		// 	trendObject.trendEx = null;
		// }


		if(curOps != ops || ops=='na'){ // Second part when Deleted from 'Selected Field Option'
			var val = trendPeriodVal(trendObject, type);
			htmlU.addMsgToDiv( type + 'Trend'+'Div'	, true, val); 
		}

		var validationText = ''
		var goodData = true;

		if(ops=='na') {
			trendObject.period 	=  null;
			trendObject.trendPc =  null;
			trendObject.trendEx = null;
			trendObject.hasData = false;
			trendObject.goodData = false;
		}else{
			trendObject.hasData = true;
			trendObject.period = htmlU.getInputVal(period);
			trendObject.trendPc = htmlU.getInputVal(trendPc);
			trendObject.trendEx = htmlU.getInputVal(trendEx);

			trendObject.csType = trendDef.csType;
			
			validationText = trendDef .label + " : "

			if(jsu.isIntegerInput(period)  && jsu.isInputPositiveNumber ( period) ){
				
			}
			// else{
			// 	validationText += 'Please Enter Valid value for Period';
			// 	goodData = false;
			// }

			if(jsu.isNull(htmlU.getInputVal(trendPc))){
				htmlU.returnGreyBorder(trendPc)
			}else if( !jsu.isInputPositiveNumber (trendPc) ){
				// validationText += ' Please Enter Valid value for % Change';
				// goodData = false;
			}
			if( jsu.isNull(htmlU.getInputVal(trendEx) )){
				htmlU.returnGreyBorder(trendEx)
			}else if(  !(jsu.isInputPositiveNumber (trendEx) &&  jsu.isIntegerInput(trendEx) ) ){
				// validationText += ' Please Enter Valid value for Exception Period';
				// goodData = false;

			}
/*
			trendObject.goodData = goodData;
			if(goodData){
				var selDD = getObjFrmArr(trendDef.map ,trendObject.id );


				validationText += selDD.label + "  for Minimum period of " +  trendObject.period  + ' ' + trendDef.tickType ;
				if(jsu.isNotNull( trendObject. trendPc)){
					validationText += ' With Minimum change of ' + trendObject.trendPc + '% '
				}

				if(jsu.isNotNull( trendObject. trendEx)){
					validationText += ' With Exeption of  ' + trendObject.trendEx + ' '+ trendDef.tickType+'. ';
				}

			}
			trendObject.valiMsg = 	validationText;			
*/			
			
		}
		// if(ops!='na') {
			 
		// }	

		// jsu.isInputPositiveNumber ('priceTrendPeriod');		
		csu.dsf(); // displaySelectedFields();
	} 


	function setTrendStatus(trendObject){
		
		var trendDef = jsu.getObjFrmArr( TRENDING_DEF, trendObject.trendType);
	
		var validationText = trendDef .label + " : "
		var goodData = true;
		trendObject.valiMsg = validationText;


		if(jsu.isNull( trendObject. period)  ){
			trendObject.goodData = false;
			trendObject.valiMsg +=   'Please Enter Valid value for Period';
			return;
		}
		var period = Number(trendObject.period);
		if(!jsu.isInteger(period) || period < 0){
			trendObject.goodData = false;
			trendObject.valiMsg +=  'Please Enter Valid value for Period';
			return;
		}

		if(jsu.isNotNull(trendObject. trendPc)){
			var trendPc = Number(trendObject. trendPc);
			if(!jsu.isNumber(trendPc) || trendPc <0){
				trendObject.valiMsg  +=  ' Please Enter Valid value for % Change';
				trendObject.goodData = false;
				return;
			}
		}
		if(jsu.isNotNull(trendObject. trendEx)){
			var trendEx = Number( trendObject. trendEx);
			if(!jsu.isInteger(trendEx) || trendEx <0){
				trendObject.valiMsg  += ' Please Enter Valid value for Exception Period';
				trendObject.goodData = false;
				return;
			}
		}


		var selDD = getObjFrmArr(trendDef.map ,trendObject.id );

		validationText += selDD.label + "  for Minimum period of " +  trendObject.period  + ' ' + trendDef.tickType ;
		if(jsu.isNotNull( trendObject. trendPc)){
			validationText += ' With Minimum change of ' + trendObject.trendPc + '% '
		}

		if(jsu.isNotNull( trendObject. trendEx)){
			validationText += ' With Exception of  ' + trendObject.trendEx + ' '+ trendDef.tickType+'. ';
		}
		trendObject.valiMsg  = validationText;
		trendObject.goodData = true;

	}



	function validateTrending(validResults){
		


		// volTrend , priceTrend

		for(var i= 0 ; i< TRENDING_DEF.length ; i++){
			var trendDef = TRENDING_DEF[i] ;
			// var field = trendDef.id;

			var trendObj = validResults.scrData.trend[trendDef.obj];

			if(isNull( trendObj.id) || trendObj.id == NA_VAL) continue;

			setTrendStatus(trendObj);
			if(!trendObj.hasData) continue;

			var selParam  =  'trend:'+ trendDef.id;
			if(trendObj.goodData){
				// validResults.validFieldCount++;
				csh.cdt(trendObj,trendObj.valiMsg, validResults, selParam, true);
			}else{
				csh.cdt(trendObj,trendObj.valiMsg, validResults, selParam, false);

				// if(!trendObj.disabled) validResults.invalidFields++;

			}


/*
			var ops =  htmlU.getInputVal(field +'Dd'); 

			if(ops=='na') continue;

			var period  = field +'Period';
			var trendPc = field +'Pc';
			var trendEx = field +'Ex';

			var valiGood = true;

			var text = '';
			if(jsu.isNull(trendObject.period)  ){
				text =  trendDef. label + ' is not properly configured';
			}else{


			}


			if(jsu.isIntegerInput(period)  && jsu.isInputPositiveNumber ( period) ){
				trendObject.period = htmlU.getInputVal(period)
			}

			if( jsu.isNotNull(htmlU.getInputVal(trendPc)) && jsu.isInputPositiveNumber (trendPc) ){
				trendObject.trendPc = htmlU.getInputVal(trendPc)
			}

			if( jsu.isNotNull(htmlU.getInputVal(trendEx) )  && jsu.isInputPositiveNumber (trendEx) &&  jsu.isIntegerInput(trendEx) ){
				trendObject.trendEx = htmlU.getInputVal(trendEx)
			}			

*/

		}

	}

	

/*******************************************************************************************
		COMPARE 
********************************************************************************************/



	function addComp(type, csType){


		let json = addCompRow(type, csType);
		var tabDef = jsu.getObjFrmArr(daily_tabs, csType)

		$('#' + tabDef.tab).append( json.html);

	    csu.dsf(); // displaySelectedFields();	
	}

	function addCompRow(type, csType){


			var obj = jsu.getObjFrmArr(TICK_COMP_MAP, type);

			var id =  myTsrScreener.getNextId(obj.nextId)
			var compObj={ id :id, tick1:getTickMap()[0].id,     tperiod1 : TICK_PERIOD[0].id,
				ops:AEB_OPS[0].id,
				tick2:getTickMap()[0].id,     tperiod2 : TICK_PERIOD[1].id
				// , csType: csType
				
			 };

			 if(jsu.isNotNull(obj.map)){
			 	compObj. field1  =  obj.map[ obj.defFirstIdx].id;
			 	compObj. field2  =  obj.map[ obj.defSecIdx].id;
			 }

			 mtgv.cs.screenerData['dyn'+ type +'Comp' ].push(compObj); 

			// mtgv.cs.screenerData.priceComp.push(compObj); 

			var tabDef = jsu.getObjFrmArr(daily_tabs, csType)


	        let html =   getCompHtml(compObj, type);

	        return { html : html , id : id};

	}

	

	function getCompHtml( compObj , type){
			var csTypeId = compObj.id;
			var func = 'cscmn.cc';
			var fncParam = csTypeId +PARAM_DELIM + type;
			
			var obj = jsu.getObjFrmArr(TICK_COMP_MAP, type);
			
			var html = getCompTd( compObj , type)

			// var param = 'dyn'+ type +'Comp'+':'+csTypeId  ; //+ ':'+type ;  dynpriceComp
			// html+= SP_3 + csh.delIcon(param) ; 
			// setCompStatus(compObj , type);

			if(mtgv.cs.ng){
				var html = '<tr id=' + compObj.id + '>'
						+ createTd(createDiv(compObj.id + 'Td2Div', html, null)) + '</tr>';
				return html;			
			}


			return  csh.dynTr(compObj, {td1 : doBold(obj.label), td2 : html })
		}

		function getCompTd( compObj , type){
			var csTypeId = compObj.id;
			var func = 'cscmn.cc';
			var fncParam = csTypeId +PARAM_DELIM + type;

			var html = '' 

			var obj = jsu.getObjFrmArr(TICK_COMP_MAP, type);

			if(mtgv.cs.ng){
				html += doBold(obj.label)+BREAK_LINE;
			}



			html+=getDropDown(TICK_PERIOD, csTypeId+'tperiod1', null,func, fncParam, compObj.tperiod1)
			html+=  SP_3 + getDropDown(getTickMap(), csTypeId+'tick1', null,func, fncParam, compObj.tick1);
			// html+=  SP_3 ;

			if(jsu.isNotNull(obj.map)){
				html+=  SP_3 ;
				html+=getDropDown(obj.map, csTypeId+'field1', null,func, fncParam, compObj.field1)
			}

			html+=SP_3 +getDropDown(COMP_OPS, csTypeId+'ops', null,func, fncParam, compObj.ops)
	

			// html+=  SP_3 +'<br/> <b>vs.</b> ' +SP_3;
			html+=  SP_3 +'<div align="left"> ' +SP_3  +doBold('Vs.	') 	+ '</div>'; // + getSpan('' , 'green' , 14)
			html+=getDropDown(TICK_PERIOD, csTypeId+'tperiod2', null,func, fncParam, compObj.tperiod2)


			html += SP_3  +  getDropDown(getTickMap(), csTypeId+'tick2', null,func, fncParam, compObj.tick2);
			
			if(jsu.isNotNull(obj.map)){
				html+=  SP_3 ;
				html+=getDropDown(obj.map, csTypeId+'field2', null,func, fncParam, compObj.field2)
			}

/*
			if( jsu.containsString( [CS_ABOVE, CS_BELOW],   compObj.ops ) ){
					html+=  htmlU.getSpan(  ' By min (Optional) ' , 'grey' , 10);
					html+=  getInputTxtParam( csTypeId+'v1' , 3, compObj.v1, func , fncParam)	;
					html+=  ' %';
			} else if( jsu.containsString( [ WITHIN , MORE_THAN],   compObj.ops ) ){
					html+=  getInputTxtParam( csTypeId+'v1' , 3, compObj.v1, func , fncParam)	;
					html+=  ' %';
			}else if(jsu.containsString( [CS_BETWEEN],   compObj.ops )) {
					html+=  getInputTxtParam( csTypeId+'v1' , 3, compObj.v1, func , fncParam)	;
					html+= ' and ';
					html+=  getInputTxtParam( csTypeId+'v2' , 3, compObj.v2, func , fncParam)	;
					html+=  ' %';
			}
*/
			html += getCompOpsHtml(compObj ,csTypeId , func , fncParam );


			// html+=  SP_3 ;
			// html+=getDropDown(OHLC_MAP, csTypeId+'ohlc2', null,func, fncParam, compObj.ohlc2)

			var param = 'dyn'+ type +'Comp'+':'+csTypeId  ; //+ ':'+type ;  dynpriceComp
			html+= SP_3 + csh.delIcon(param) ; 
			// setCompStatus(compObj , type);

			return html;
		}


		// Generic beyond -- COMP_OPS  ..  Used in Tech Comparion also...  Should be used in Fin also in future 
		function getCompOpsHtml(compObj ,csTypeId , func , fncParam ){
			var html =''

			html+= SP_3
			// No need for OPS_EQ, OPS_GT_EQ , OPS_LT_EQ, CS_CO_ABV , CS_CO_ABV , CS_CO_BLW

			if( jsu.containsString( [CS_ABOVE, CS_BELOW],   compObj.ops ) ){
					html+=  htmlU.getSpan(  ' By min (Optional) ' , 'grey' , 10);
					html+=  getInputTxtParam( csTypeId+'v1' , 3, compObj.v1, func , fncParam)	;
					html+=  ' %';
			} else if( jsu.containsString( [ WITHIN , MORE_THAN ],   compObj.ops ) ){
					html+=  getInputTxtParam( csTypeId+'v1' , 3, compObj.v1, func , fncParam)	;
					html+=  ' %';
			} else if( jsu.containsString( [  CS_CO_ABV_WITHIN , CS_CO_BLW_WITHIN],   compObj.ops ) ){
					html+=  htmlU.getSpan(  'CO  Within  (Optional)' , 'grey' , 10);
					html+=  getInputTxtParam( csTypeId+'v1' , 3, compObj.v1, func , fncParam)	;
					html+=  htmlU.getSpan(  ' Ticks - (0 for latest, Range 0-10)' , 'grey' , 10);
					// html+=  ' Ticks';		
			}else if(jsu.containsString( [CS_BETWEEN],   compObj.ops )) {
					html+=  getInputTxtParam( csTypeId+'v1' , 3, compObj.v1, func , fncParam)	;
					html+= ' and ';
					html+=  getInputTxtParam( csTypeId+'v2' , 3, compObj.v2, func , fncParam)	;
					html+=  ' %';
			} else if( jsu.containsString( [ CS_RATIO_ABV , CS_RATIO_BLW ],   compObj.ops ) ){
					html+=  getInputTxtParam( csTypeId+'v1' , 3, compObj.v1, func , fncParam)	;
					html+=  ' %';
			}
			return html;
		} 

		
		function compChg(id, type){
			csu.setProp(mtgv.cs.screenerData['dyn'+ type +'Comp' ], ['tick1','tick2','field1' , 'field2', 'tperiod1','tperiod2', 'ops', 'v1', 'v2' ],id);
			
			var compObj = jsu.getObjFrmArr( mtgv.cs.screenerData['dyn'+ type +'Comp' ] , id );
			
			var td = getCompTd( compObj , type);

			htmlU.addMsgToDiv(compObj.id+'Td2Div', true, td);


			// setCompStatus(compObj, type)

			// html+=SP_3 +getDropDown(COMP_OPS, csTypeId+'ops', null,func, fncParam, compObj.ops)
			runCompHtmlVal(id, compObj);
			
			csu.dsf(); // displaySelectedFields();	
		}

		function runCompHtmlVal(id, compObj){

			if( jsu.containsString( [CS_ABOVE, CS_BELOW],   compObj.ops ) && jsu.isNotNull(compObj.v1)  ){
					 jsu.isInputPositiveNumber (id+'v1')
			} else if( jsu.containsString( [ WITHIN , MORE_THAN],   compObj.ops ) ){
					jsu.isInputPositiveNumber (id+'v1')
			} else if( jsu.containsString( [ CS_CO_ABV_WITHIN , CS_CO_BLW_WITHIN],   compObj.ops ) && jsu.isNotNull(compObj.v1)){
					// jsu.isInputPositiveNumber (id+'v1')
					jsu.inputNumberRange (id+'v1', 0,10)	

			}else if(jsu.containsString( [CS_BETWEEN],   compObj.ops )) {
					jsu.isInputPositiveNumber (id+'v1')
					jsu.isInputPositiveNumber (id+'v2')
			} else if( jsu.containsString( [ CS_RATIO_ABV , CS_RATIO_BLW ],   compObj.ops ) && jsu.isNotNull(compObj.v1) ){
				jsu.isInputPositiveNumber (id+'v1')
			}

		}


		function setCompStatus(compObj, compDef){

			var obj = compDef;
			// var obj = jsu.getObjFrmArr(TICK_COMP_MAP, type);
			var text =  obj.label  + ' : ' ;


			// var tick1Obj = null;
			// var tick2Obj = null;

			if(mtgv.cs.crossFreq){
				if(compObj.tick1 =='tick') {  compObj.tick1 = mtgv.cs.screenerData.scrFreq}; 
				if(compObj.tick2 =='tick') {  compObj.tick2 = mtgv.cs.screenerData.scrFreq}; 
			}	
			// }else{
			// 	if(compObj.tick1 =='tick') {  compObj.tick1 = mtgv.cs.screenerData.scrFreq}; 
			// 	if(compObj.tick2 =='tick') {  compObj.tick2 = mtgv.cs.screenerData.scrFreq}; 
			// }







			var tick1Obj = jsu.getObjFrmArr(getTickMap(), compObj.tick1 );
			var tick2Obj = jsu.getObjFrmArr(getTickMap(), compObj.tick2 );

			var tperiod1Obj = jsu.getObjFrmArr(TICK_PERIOD, compObj.tperiod1 );
			var tperiod2Obj = jsu.getObjFrmArr(TICK_PERIOD, compObj.tperiod2 );

			var opsObj = jsu.getObjFrmArr(COMP_OPS, compObj.ops );

			text +=  tperiod1Obj.label + ' ' 


			if(tick1Obj !=null){
				text+= tick1Obj.label + " " ;	
			}
			


			var goodData = true;

			if(jsu.isNotNull(obj.map)){
				var field1Obj = jsu.getObjFrmArr(obj.map, compObj.field1 ) ;
				text += field1Obj.label + " "
			}
			text += opsObj.label + " "

			



			text += tperiod2Obj.label + ' ' 

			if(tick2Obj !=null){
				text+= tick2Obj.label + " "  ;
			}


			if(jsu.isNotNull(obj.map)){
				var field2Obj = jsu.getObjFrmArr(obj.map, compObj.field2) ;
				text += field2Obj.label + " "
			}


			if( jsu.containsString( [CS_ABOVE, CS_BELOW],   compObj.ops )  && jsu.isNotNull(compObj.v1) ){


					if( jsu.isNumber(compObj.v1) && Number(compObj.v1) >0){
						text += ' by min ' + compObj.v1 + '%'
					}else{
						goodData = false;
					}

			} else if( jsu.containsString( [ WITHIN , MORE_THAN],   compObj.ops ) ){
					
				if( jsu.isNumber(compObj.v1) && Number(compObj.v1) >0){
						text += ' '+ compObj.v1 + '%'
					}else{
						goodData = false;
					}	
			} else if( jsu.containsString( [ CS_RATIO_ABV , CS_RATIO_BLW ],   compObj.ops )){
				if( jsu.isNumber(compObj.v1) && Number(compObj.v1) >0){
						text += ' by min ' + compObj.v1 + '%'
					}else{
						goodData = false;
					}


			}else if(jsu.containsString( [CS_BETWEEN],   compObj.ops )) {
					if( jsu.isNumber(compObj.v1) && Number(compObj.v1) >0   && jsu.isNumber(compObj.v2) && Number(compObj.v2) >0){
						text += ' '+ compObj.v1 + ' and ' + compObj.v2+   '%'
					}else{
						goodData = false;
					}	
			}

			compObj.valiMsg = text;
			compObj.hasData = true;
			compObj.goodData = goodData;
		}

		function validateComp(validResults){
			for(var i= 0 ; i< TICK_COMP_MAP.length ; i++){
				var compDef = TICK_COMP_MAP[i] ;
				// var field = trendDef.id;

				var compObjArr = validResults.scrData[compDef.obj];

				validateCompType(compObjArr, validResults, compDef);
			}	
		}

		function validateCompType(compObjArr,  validResults, compDef){
			// var param =  'dynComp:'+csTypeId + ':dyn'+type + 'Comp'; 
			for(var i=0;i<compObjArr.length ;i++ ){
				var compObj = 	compObjArr[i];
				// validResults.validFieldCount++;
				 var selParam =  'dyn'+ compDef.id  +'Comp' +':'+compObj.id ;// + ':'+; 
				 setCompStatus(compObj , compDef);


				 compObj.csType = compDef.csType;
				csh.cdt(compObj,compObj.valiMsg, validResults, selParam, compObj.goodData);
			}
		}

	/**********************************************************************************************
								Add Specific Time Compare    
	**********************************************************************************************/



	function addSpecificTimeCompNg(type, csType){
	
		var obj = jsu.getObjFrmArr(TICK_SP_COMP_MAP, type);

			var id =  myTsrScreener.getNextId(obj.nextId)


			var periodmap = getSpetimeTickMap()
			
			var compObj={ id :id, tick1:getTickMap()[3].id,     tperiod1 : periodmap[0].id,
				ops:AEB_OPS[0].id,
				tick2:getTickMap()[1].id,     tperiod2 : periodmap[1].id
				
			 };

			 // Set OHLC
			 if(jsu.isNotNull(obj.map)){
			 	compObj. field1  =  obj.map[ obj.defFirstIdx].id;
			 	compObj. field2  =  obj.map[ obj.defSecIdx].id;
			 }

			 mtgv.cs.screenerData['dynSpTime'+ type +'Comp' ].push(compObj); 

			var tabDef = jsu.getObjFrmArr(daily_tabs, csType)


	        html = getSpTimeCompHtml(compObj, type);

	        return { html : html , id : id};
	}		




	function addSpecificTimeComp(type, csType){

/*
			var obj = jsu.getObjFrmArr(TICK_SP_COMP_MAP, type);

			var id =  myTsrScreener.getNextId(obj.nextId)


			var periodmap = getSpetimeTickMap()
			
			var compObj={ id :id, tick1:getTickMap()[3].id,     tperiod1 : periodmap[0].id,
				ops:AEB_OPS[0].id,
				tick2:getTickMap()[1].id,     tperiod2 : periodmap[1].id
				
			 };

			 // Set OHLC
			 if(jsu.isNotNull(obj.map)){
			 	compObj. field1  =  obj.map[ obj.defFirstIdx].id;
			 	compObj. field2  =  obj.map[ obj.defSecIdx].id;
			 }

			 mtgv.cs.screenerData['dynSpTime'+ type +'Comp' ].push(compObj); 

			var tabDef = jsu.getObjFrmArr(daily_tabs, csType)
*/

		let json = addSpecificTimeCompNg(type, csType);

	        $('#' + tabDef.tab).append( json.html);

	        compChgSpecTime(json.id, type);

	        csu.dsf(); // displaySelectedFields();	
	}	




	function getSpTimeCompHtml(compObj, type){

		var csTypeId = compObj.id;
		var func = 'cscmn.ccst';
		var fncParam = csTypeId +PARAM_DELIM + type;
		
		var obj = jsu.getObjFrmArr(TICK_SP_COMP_MAP, type);
		
		var html = getCompSpTimeTd( compObj , type)


		if(mtgv.cs.ng){
				var html = '<tr id=' + obj.id + '>'
					+ createTd(createDiv(obj.id + 'Td2Div', html, null)) + '</tr>';
				return html;			
		}

		return  csh.dynTr(compObj, {td1 : doBold(obj.label), td2 : html })


	}


	function getCompSpTimeTd( compObj , type){
		var csTypeId = compObj.id;
		var func = 'cscmn.ccst';
		var fncParam = csTypeId +PARAM_DELIM + type;

		var html = '' 
		var obj = jsu.getObjFrmArr(TICK_SP_COMP_MAP, type);

		var PERIOD_MAP = getSpetimeTickMap()

		if(mtgv.cs.ng){
			html += doBold(obj.label)+BREAK_LINE;

		}


		html+=getDropDown(PERIOD_MAP, csTypeId+'tperiod1', null,func, fncParam, compObj.tperiod1)
		
		html+= getTimeHtml(compObj, func , fncParam, 1); // 1 for LHS


		if(jsu.isNotNull(obj.map)){
			// html+=  SP_3 ;
			html+=getDropDown(obj.map, csTypeId+'field1', null,func, fncParam, compObj.field1)
		}

		html+=SP_3 +getDropDown(COMP_OPS, csTypeId+'ops', null,func, fncParam, compObj.ops)



		html+=  SP_3 +'<div align="left"> ' +SP_3  +doBold('Vs.	') 	+ '</div>'; // + getSpan('' , 'green' , 14)



		html+=getDropDown(PERIOD_MAP, csTypeId+'tperiod2', null,func, fncParam, compObj.tperiod2)

		html+= getTimeHtml(compObj, func,fncParam , 2); // 1 for RHS


		// html += SP_3  +  getDropDown(getTickMap(), csTypeId+'tick2', "width:90px;",func, fncParam, compObj.tick2);
		
		if(jsu.isNotNull(obj.map)){
			// html+=  SP_3 ;
			html+=getDropDown(obj.map, csTypeId+'field2', null,func, fncParam, compObj.field2)
		}

		html += getCompOpsHtml(compObj ,csTypeId , func , fncParam );

		var param = 'dynSpTime'+ type +'Comp'+':'+csTypeId  ; //+ ':'+type ;  dynpriceComp
		html+= SP_3 + csh.delIcon(param) ; 

		return html;
	}


	function getTimeHtml(compObj, func  ,fncParam, index ){

		var html = '';

		var csTypeId = compObj.id;
		var periodType = compObj['tperiod' + index];

		if( periodType == 'time'){  // hh == tf / simpler Object

			html+= SP_3+ ' Hours ' +  getInputTxtParam( csTypeId+'tf' +index , 2, compObj['tf' +index], func , fncParam)	;

			html+= SP_3+ ' Mins ' +  getInputTxtParam( csTypeId+'mm' +index , 2, compObj['mm' +index], func , fncParam)	;

			var freqType = FREQ_SCR_INTRA_FREQ_MAP.slice();
			
			 jsu.removeFromArrayWithId(freqType,   FREQ_INTRA_DAILY);

			html+= ' On ';

			html+=  SP_3 + getDropDown(freqType, csTypeId+'tick' + index, null,func, fncParam, compObj['tick' + index]);

			html+= SP_3+ htmlU.getSpan('Please select Time According to Tick otherwise you will not get result', 'grey' , 10);
			html+= BR_2;

		}else if(periodType == 'date'){
			
			html+= SP_3+   getInputTxtParam( csTypeId+'tf' +index , 10, compObj['tf' +index], func , fncParam)	;

			html+= SP_3+ htmlU.getSpan('dd/MM/yyyy format' ,'grey' , 10);
			html+= BR_2;

		}else if(periodType == 'day'){

			var DAYS = WEEK_DAYS.slice();

			jsu.removeFromArrayWithId(DAYS, 1); // sun
			jsu.removeFromArrayWithId(DAYS,7); // sat

			html+=  SP_3 + getDropDown(DAYS, csTypeId+'tf' + index, null,func, fncParam, compObj['tf' + index]);
			 html+=  SP_3 ;
		}else if(periodType == 'month'){
			
			html+=  SP_3 + getDropDown(MTH_MAP, csTypeId+'tf' + index, null,func, fncParam, compObj['tf' + index]);
			 html+=  SP_3 ;
		}else if(periodType == 'firstTick' || periodType == 'lastTick'  ){	
			var freqType = FREQ_SCR_INTRA_FREQ_MAP.slice();
			
			 jsu.removeFromArrayWithId(freqType , FREQ_INTRA_DAILY);

			html+= ' On ';

			html+=  SP_3 + getDropDown(freqType, csTypeId+'tick' + index, null,func, fncParam, compObj['tick' + index]);
			 html+=  SP_3 ;
		} else if ( jsu.containsString(['firstWeekDay','lastWeekDay', 'firstMtnDay','lastMthDay' ,
			'firstQtrDay', 'lastQtrDay' , 'firstYearDay' ,  'lastYearDay'  ] , periodType) )	{
			// do Nothing special ....
			 html+=  SP_3 ;
		} else if ( jsu.containsString(['latest','p1', 'p2','p3' ,
			'p4', 'p5' , 'p6'   ] , periodType) )	{
			
			html+=  SP_3 + getDropDown(getTickMap(), csTypeId+'tick' + index, null,func, fncParam, compObj['tick' + index]);
			 html+=  SP_3 ;
		}

		return html ;
	}


	function compChgSpecTime(id, type){ // ccst

			var fieldArr =  ['tick1','tick2','field1' , 'field2', 'tperiod1','tperiod2', 'ops', 'v1', 'v2' ,
					 'mm1', 'mm2','tf1', 'tf2',
				];

			csu.setProp(mtgv.cs.screenerData['dynSpTime'+ type +'Comp' ], fieldArr,id); 
			//tf - "time field"
			
			var compObj = jsu.getObjFrmArr( mtgv.cs.screenerData['dynSpTime'+ type +'Comp' ] , id );
			
			var td = getCompSpTimeTd( compObj , type);

			htmlU.addMsgToDiv(compObj.id+'Td2Div', true, td);

			csu.setProp(mtgv.cs.screenerData['dynSpTime'+ type +'Comp' ], fieldArr,id); 

			runCompHtmlVal(id, compObj); // common AEEB
			
			validateSpTimeparam(id, compObj,1);
			validateSpTimeparam(id, compObj,2);
			csu.dsf(); // displaySelectedFields();	
	}


	function validateSpTimeparam(csTypeId, compObj, index){


		// var csTypeId = 

		var periodType = compObj['tperiod' + index];

		if( periodType == 'time'){

		
			var hhField = csTypeId+'tf' +index ; 
			var mmField = csTypeId+'mm' +index ;


			var hhVal = Number(htmlU.getInputVal(hhField));
			var mmVal = Number(htmlU.getInputVal(mmField));

			jsu.isInputPositiveNumber (hhField);
			jsu.isInputPositiveNumber (mmField);
	

			

			if(!validHh(hhVal) ){
				returnRedBorder(hhField) ;
			}

			if(!validMm(hhVal, mmVal)){
				returnRedBorder(mmField) ;
			}

		}else if(periodType == 'date'){

			var validDate = jsu.isValidDateInput( csTypeId+'tf' +index );
			if(!validDate){
				compObj['tf' +index] = null;
			}

		}else if(periodType == 'day'){

			// Nothing


		}else if(periodType == 'month'){
			
			// no special

		}else if(periodType == 'firstTick' || periodType == 'lastTick'  ){	
			// no special

		} else if ( jsu.containsString(['firstWeekDay','lastWeekDay', 'firstMtnDay','lastMthDay' ,
			'firstQtrDay', 'lastQtrDay' , 'firstYearDay' ,  'lastYearDay'  ] , periodType) )	{
			// do Nothing special ....
		} else if ( jsu.containsString(['latest','p1', 'p2','p3' ,
			'p4', 'p5' , 'p6'   ] , periodType) )	{
			
			// nothing special
		}

	}

	function validHh(hhVal){
		var mktTime = jsu.getMktTime();
		hhVal = Number(hhVal);
		if( isNaN(hhVal) || hhVal == null  || hhVal < mktTime.startHH || hhVal > mktTime.endHH  ){
			return false;
		}
		return true;
	}

	function validMm(hhVal, mmVal){
		var mktTime = jsu.getMktTime();
		mmVal = Number(mmVal);
		hhVal = Number(hhVal);
		if(  isNaN(hhVal) ||  isNaN(mmVal) || mmVal == null  ||  mmVal > 60 
				||  ( hhVal == mktTime.startHH && mmVal < mktTime.startMM )  
				||  ( hhVal == mktTime.endHH && mmVal >  mktTime.endMM )   ){
			return false;
		}
		return true;
	}


	function validateSpTimeComp(validResults){
		for(var i= 0 ; i< TICK_SP_COMP_MAP.length ; i++){
			var compDef = TICK_SP_COMP_MAP[i] ;
			// var field = trendDef.id;

			var compObjArr = validResults.scrData[compDef.obj];

			validateSpTimeCompType(compObjArr, validResults, compDef);
		}	
	}

	function validateSpTimeCompType(compObjArr,  validResults, compDef){
		// var param =  'dynComp:'+csTypeId + ':dyn'+type + 'Comp'; 
		for(var i=0;i<compObjArr.length ;i++ ){
			var compObj = 	compObjArr[i];
			// validResults.validFieldCount++;
			 var selParam =  'dynSpTime'+ compDef.id  +'Comp' +':'+compObj.id ;// + ':'+; 
			 setCompSpTimeStatus(compObj , compDef);


			 compObj.csType = compDef.csType;
			csh.cdt(compObj,compObj.valiMsg, validResults, selParam, compObj.goodData);
		}
	}


	function spTimePeriodLabel(compObj , index){
		var periodType = compObj['tperiod' + index];

		var goodData = true;
		var text = '';

		var tfVal = compObj['tf' +index];

		if( periodType == 'time'){
			if(! validHh(compObj['tf' +index]) || !validMm(compObj['tf' +index] , compObj['mm' +index])){
				goodData = false;
				text += 'Invalid HH :MM';
			}else{
				text +=  tfVal  + ' : ' + compObj['mm' +index] + '  ';	
			}

			
		}else if(periodType == 'date'){
			
			//jsu.isValidDateInput( csTypeId+'tf' +index );

			// var date = compObj['tf' +index]
			if(tfVal==null){
				text +=  'Invalid Date';
				goodData = false;
			}else{
				text +=  tfVal;	
			}
		}else if(periodType == 'day'){
			var dayObj = jsu.getObjFrmArr( WEEK_DAYS , tfVal);
			text+= dayObj.label;
		}else if(periodType == 'month'){
			var obj = jsu.getObjFrmArr( MTH_MAP , tfVal);

			text+= obj.label;
		}else if(periodType == 'firstTick' || periodType == 'lastTick'  ){	
			// do nothing ....
		}

		return { goodData : goodData , text : text};
	}


	function setCompSpTimeStatus(compObj , compDef){

		var obj = compDef;
		var text =  obj.label  + ' : ' ;


		if(mtgv.cs.crossFreq){
			if(compObj.tick1 =='tick') {  compObj.tick1 = mtgv.cs.screenerData.scrFreq}; 
			if(compObj.tick2 =='tick') {  compObj.tick2 = mtgv.cs.screenerData.scrFreq}; 
		}	
		


		var tick1Obj = jsu.getObjFrmArr(getTickMap(), compObj.tick1 );
		var tick2Obj = jsu.getObjFrmArr(getTickMap(), compObj.tick2 );

		var PERIOD_MAP = getSpetimeTickMap();


		var tperiod1Obj = jsu.getObjFrmArr(PERIOD_MAP, compObj.tperiod1 );
		var tperiod2Obj = jsu.getObjFrmArr(PERIOD_MAP, compObj.tperiod2 );

		var opsObj = jsu.getObjFrmArr(COMP_OPS, compObj.ops );

		var goodData = true;

		text +=  tperiod1Obj.label + ' ' 

		
		var  timeVal1 = spTimePeriodLabel(compObj ,1);
		text += timeVal1.text;
		if(!timeVal1.goodData){
			goodData = false;
		}



		if(tick1Obj !=null){
			text+= tick1Obj.label + " " ;	
		}
			


			

			if(jsu.isNotNull(obj.map)){
				var field1Obj = jsu.getObjFrmArr(obj.map, compObj.field1 ) ;
				text += field1Obj.label + " "
			}
			text += opsObj.label + " "

			

			text += tperiod2Obj.label + ' ' 

			var  timeVal2 = spTimePeriodLabel(compObj ,2);
			text += timeVal2.text;
			if(!timeVal2.goodData){
				goodData = false;
			}

			if(tick2Obj !=null){
				text+= tick2Obj.label + " "  ;
			}


			if(jsu.isNotNull(obj.map)){
				var field2Obj = jsu.getObjFrmArr(obj.map, compObj.field2) ;
				text += field2Obj.label + " "
			}


			if( jsu.containsString( [CS_ABOVE, CS_BELOW],   compObj.ops )  && jsu.isNotNull(compObj.v1) ){


					if( jsu.isNumber(compObj.v1) && Number(compObj.v1) >0){
						text += ' by min ' + compObj.v1 + '%'
					}else{
						goodData = false;
					}

			} else if( jsu.containsString( [ WITHIN , MORE_THAN],   compObj.ops ) ){
					
				if( jsu.isNumber(compObj.v1) && Number(compObj.v1) >0){
						text += ' '+ compObj.v1 + '%'
					}else{
						goodData = false;
					}	
			} else if( jsu.containsString( [ CS_RATIO_ABV , CS_RATIO_BLW ],   compObj.ops )){
				if( jsu.isNumber(compObj.v1) && Number(compObj.v1) >0){
						text += ' by min ' + compObj.v1 + '%'
					}else{
						goodData = false;
					}


			}else if(jsu.containsString( [CS_BETWEEN],   compObj.ops )) {
					if( jsu.isNumber(compObj.v1) && Number(compObj.v1) >0   && jsu.isNumber(compObj.v2) && Number(compObj.v2) >0){
						text += ' '+ compObj.v1 + ' and ' + compObj.v2+   '%'
					}else{
						goodData = false;
					}	
			}

			compObj.valiMsg = text;
			compObj.hasData = true;
			compObj.goodData = goodData;
	}



	function getSpetimeTickMap(){

		if(mtgv.mtpp.rt){
			return OHLC_TIME;
		}else{  // for EOD
			var arr = [];

			for(var i=0;i< OHLC_TIME.length ;i++){

				var elem = OHLC_TIME[i];
				if(elem.intra){ // intra case
					continue;
				}
				arr.push(elem);
			}
			return arr;
		}
	}

	/**********************************************************************************************
								OHLC Advance
	**********************************************************************************************/

	function addAdvanceOhlcNg(){
		var id =  myTsrScreener.getNextId('dynAdvOhlcCompId')

		var compObj = {
			id : id,  aot : 'hlIdx' 
		};



		mtgv.cs.screenerData.dynAdvOhlcComp.push(compObj); 

		let html =  getAdvOhlcHtml(compObj);


		return { html : html , id : id};
	}




	function addAdvanceOhlc(){

/*
		var id =  myTsrScreener.getNextId('dynAdvOhlcCompId')

		var compObj = {
			id : id,  aot : 'hlIdx' 
		};



		mtgv.cs.screenerData.dynAdvOhlcComp.push(compObj); 

		$('#priceCtrlTab' ).append( getAdvOhlcHtml(compObj));
*/
		let json = addAdvanceOhlcNg();

		$('#priceCtrlTab' ).append( json.html);

		compChgAdvOhlc(json.id );

		csu.dsf(); // displaySelectedFields();	

	}

	function getAdvOhlcHtml(compObj){

		var html = getAdvOhlcTd( compObj )

		if(mtgv.cs.ng){
			var html = '<tr id=' + compObj.id + '>'
					+ createTd(createDiv(compObj.id + 'Td2Div', html, null)) + '</tr>';
			return html;			
		}

		return  csh.dynTr(compObj, {td1 : doBold('Advanced OHLCV'), td2 : html })
	}

	function getAdvOhlcTd( compObj ){

		var csTypeId = compObj.id;
		
		var func = 'cscmn.ccao';

		var fncParam = csTypeId ;

		let html = '' ;

		if(mtgv.cs.ng){
			html+=doBold('Advanced OHLCV') +BR_2;
		}


		html+=getDropDown(pdef.oao, csTypeId+'aot', null,func, fncParam, compObj.aot); // Advance OHLC Type

		html+= BR_2;

		if(compObj.aot == 'hlIdx'){
			html+= addHighLowest(compObj, func , fncParam ,true);
		} else if(compObj.aot == 'hlIdxRange'){
			html+= addHighLowestRange(compObj, func , fncParam ,false);
		} else if(compObj.aot == 'withinRange'){
			html+= addWithinRange(compObj, func , fncParam ,true);
		}

		var param = 'dynAdvOhlcComp'+':'+csTypeId  ; //+ ':'+type ;  dynpriceComp

		html+= SP_3 + csh.delIcon(param) ; 

		return html;

	}

	function addHighLowest(compObj, func , fncParam , high){

		var csTypeId = compObj.id;

		if(jsu.isNull(compObj.field1)) compObj.field1 = CLOSE;
		if(jsu.isNull(compObj.field2)) compObj.field2 = HIGH;
		if(jsu.isNull(compObj.tperiod2)) compObj.tperiod2 = TICK_PERIOD[1].id;
		if(jsu.isNull(compObj.v1)) compObj.v1 = 10;
		if(jsu.isNull(compObj.ops)) compObj.ops = CS_ABOVE;
		if(jsu.isNull(compObj.v2)) compObj.v2 = 0;

		let html = '' ;

		html+=getDropDown(TICK_PERIOD, csTypeId+'tperiod1', null,func, fncParam, compObj.tperiod1);

		html+=  SP_3 + getDropDown(getTickMap(), csTypeId+'tick1', "width:110px;",func, fncParam, compObj.tick1);

		html+= SP_3 +  getDropDown(OHLC_TIME_COMP_MAP, csTypeId+'field1', "width:110px;",func, fncParam, compObj.field1);

		// html+=  BR_2;

		html+= SP_3 +  getDropDown(pdef.oahl, csTypeId+'ops', null,func, fncParam, compObj.ops);


		if(jsu.containsString([CS_ABOVE , CS_BELOW , WITHIN] , compObj.ops)){
			html +=  SP_3 +getInputTxtParam( csTypeId+'v2' , 3, compObj.v2, func , fncParam) + ' % '	;
			html += htmlU.getSpan('(Optional)', 'grey', 9);
			html+= ' than  '
		}


		html+=  BR_2;

		html+=  getDropDown(OPS_HL, csTypeId+'hlType', null,func, fncParam, compObj.hlType);


		html += ' of last ';

		html +=  getInputTxtParam( csTypeId+'v1' , 3, compObj.v1, func , fncParam)	;

		html+= htmlU.getSpan('max 200' , 'grey', 9);

		html+= SP_3 + ' ticks Starting from ';

		html+= SP_3 + getDropDown(TICK_PERIOD, csTypeId+'tperiod2', null,func, fncParam, compObj.tperiod2);

		html+= SP_3 + getDropDown(getTickMap(), csTypeId+'tick2', null,func, fncParam, compObj.tick2);

		html+= SP_3 +  getDropDown(OHLC_TIME_COMP_MAP, csTypeId+'field2', null,func, fncParam, compObj.field2);

		return html;
	}


	function addHighLowestRange(compObj, func , fncParam){

		var csTypeId = compObj.id;

		if(jsu.isNull(compObj.field1)) compObj.field1 = CLOSE;
		if(jsu.isNull(compObj.field2)) compObj.field2 = HIGH;
		if(jsu.isNull(compObj.tperiod2)) compObj.tperiod2 = TICK_PERIOD[10].id;
		if(jsu.isNull(compObj.v1)) compObj.v1 = 10;
		if(jsu.isNull(compObj.v2)) compObj.v2 = 2;
		if(jsu.isNull(compObj.v3)) compObj.v3 = 10;

		let html = '' ;

		html+=  getDropDown(OPS_HL, csTypeId+'hlType', null,func, fncParam, compObj.hlType);


		html += ' of last ';

		html +=  getInputTxtParam( csTypeId+'v1' , 3, compObj.v1, func , fncParam)	;

		html+= SP_3 + ' ticks Starting from ';

		html+= SP_3 + getDropDown(TICK_PERIOD, csTypeId+'tperiod1', null,func, fncParam, compObj.tperiod1);

		html+= SP_3 + getDropDown(getTickMap(), csTypeId+'tick1', null,func, fncParam, compObj.tick1);

		html+= SP_3 +  getDropDown(OHLC_TIME_COMP_MAP, csTypeId+'field1', null,func, fncParam, compObj.field1);

		html+=  BR_2;	

		html+= getDropDown(pdef.oahlr, csTypeId+'ops', null,func, fncParam, compObj.ops);

		// if(jsu.containsString([CS_ABOVE , CS_BELOW , WITHIN] , compObj.ops)){
			html +=  SP_3 +getInputTxtParam( csTypeId+'v2' , 3, compObj.v2, func , fncParam) + ' % '	;
			html += htmlU.getSpan('(Optional)', 'grey', 9);
			html+= ' than  '
		// }

		html+=  BR_2;	

		html+=  getDropDown(OPS_HL, csTypeId+'hlType2', null,func, fncParam, compObj.hlType2);


		html += ' of last ';

		html +=  getInputTxtParam( csTypeId+'v3' , 3, compObj.v3, func , fncParam)	;

		html+= SP_3 + ' ticks Starting from ';

		html+= SP_3 + getDropDown(TICK_PERIOD, csTypeId+'tperiod2', null,func, fncParam, compObj.tperiod2);

		html+= SP_3 + getDropDown(getTickMap(), csTypeId+'tick2', null,func, fncParam, compObj.tick2);

		html+= SP_3 +  getDropDown(OHLC_TIME_COMP_MAP, csTypeId+'field2', null,func, fncParam, compObj.field2);


		return html;
	}


	function addWithinRange(compObj, func , fncParam ,){

		var csTypeId = compObj.id;


		if(jsu.isNull(compObj.field1)) compObj.field1 = OHLC_ADV_COMP_MAP[0].id;
		if(jsu.isNull(compObj.v1)) compObj.v1 = 10;
		if(jsu.isNull(compObj.v2)) compObj.v2 = 2;

		// if(jsu.isNull(compObj.field2)) compObj.field2 = CLOSE;
		// if(jsu.isNull(compObj.tperiod2)) compObj.tperiod2 = TICK_PERIOD[1].id;
		
		// if(jsu.isNull(compObj.ops)) compObj.ops = CS_ABOVE;
		

		let html = '' ;

		// html+= 

		html +=  getInputTxtParam( csTypeId+'v1' , 3, compObj.v1, func , fncParam)	;

		html+= SP_3 + ' Ticks Starting from ';

		html+= SP_3 + getDropDown(TICK_PERIOD, csTypeId+'tperiod1', null,func, fncParam, compObj.tperiod1);

		

		html+= SP_3 +  getDropDown(OHLC_ADV_COMP_MAP, csTypeId+'field1', null,func, fncParam, compObj.field1);

		html+=  BR_2;

		html+= ' is '; 

		html+= SP_3 +  getDropDown(WITHIN_OFF_OPS, csTypeId+'ops', null,func, fncParam, compObj.ops);

		html += SP_3 + getInputTxtParam( csTypeId+'v2' , 3, compObj.v2, func , fncParam)	+ ' %';

		html+= ' On ' + getDropDown(getTickMap(), csTypeId+'tick1', null,func, fncParam, compObj.tick1) + ' tick';

		return html;
	}

	function compChgAdvOhlc(id){

		let propList = ['aot', 'tick1','tick2','field1' , 'field2', 'tperiod1','tperiod2',
		 'ops', 'v1', 'v2' , 'v3'  , 'hlType' ,'hlType2'] ; 

		var compObj = jsu.getObjFrmArr( mtgv.cs.screenerData.dynAdvOhlcComp , id );

		let newAot  = htmlU.getInputVal(id+'aot');

		if(jsu.isNull(newAot)) newAot = 'hlIdx'; 

		if(compObj.aot != newAot){  // change in strat
			jsu.removeProps(compObj , propList );
			compObj.aot =  newAot;
		}else{
			csu.setProp(mtgv.cs.screenerData.dynAdvOhlcComp, propList,id); 
		}

		var td = getAdvOhlcTd( compObj );

		htmlU.addMsgToDiv(compObj.id+'Td2Div', true, td);

		csu.setProp(mtgv.cs.screenerData.dynAdvOhlcComp, propList,id); 

		// validate fields ...

		compObj.goodData = true;

		let v1Field = id+'v1';
		let v2Field = id+'v2';
		let v3Field = id+'v3';

		if(compObj.aot == 'hlIdx'){
			
			if(jsu.isNotNull(compObj.v2)){
				if(!jsu.isInputPositiveNumber (v2Field) || !jsu.inputNumberRange (v2Field, 0,99)){
					compObj.goodData = false;
				}
			}else if(compObj.ops == WITHIN ){  // v2 mandatory for Within
				compObj.goodData = false;
				htmlU.returnRedBorder(v2Field);
			}

			if(!jsu.isIntegerInput (v1Field) || !jsu.inputNumberRange (v1Field, 1,201)){
					compObj.goodData = false;
			}

		}else if(compObj.aot == 'hlIdxRange'){

			if(jsu.isNotNull(compObj.v2)){
				if(!jsu.isInputPositiveNumber (v2Field) || !jsu.inputNumberRange (v2Field, 0,99)){
					compObj.goodData = false;
				}
			}
			if(!jsu.isIntegerInput (v1Field) || !jsu.inputNumberRange (v1Field, 1,99)){
					compObj.goodData = false;
			}
			if(!jsu.isIntegerInput (v3Field) || !jsu.inputNumberRange (v3Field, 1,99)){
					compObj.goodData = false;
			}


		}else if(compObj.aot == 'withinRange'){
			if(!jsu.isIntegerInput (v1Field) || !jsu.inputNumberRange (v1Field, 1,99)){
					compObj.goodData = false;
			}

			if(jsu.isNotNull(v2Field)){
				if(!jsu.isInputPositiveNumber (v2Field) || !jsu.inputNumberRange (v2Field, 0,99)){
					compObj.goodData = false;
				}
			}
		}



		csu.dsf(); // displaySelectedFields();	

	}

	function validateAdvOhlc(validResults){


		var dynAdvOhlcComp = validResults.scrData.dynAdvOhlcComp;


		for( var i=0 ;i<dynAdvOhlcComp.length ;i++ ){
			var compObj = dynAdvOhlcComp[i];

			let text ='';

			if(compObj.goodData){
				
				var aotType = getObjFrmArr( pdef.oao,  compObj.aot); 

				var tick1Obj = jsu.getObjFrmArr(getTickMap(), compObj.tick1 );
				var tick2Obj = jsu.getObjFrmArr(getTickMap(), compObj.tick2 );

				var tperiod1Obj = jsu.getObjFrmArr(TICK_PERIOD, compObj.tperiod1 );
				var tperiod2Obj = jsu.getObjFrmArr(TICK_PERIOD, compObj.tperiod2 );

				var field1Obj = jsu.getObjFrmArr(OHLC_ADV_COMP_MAP, compObj.field1 );
				var field2Obj = jsu.getObjFrmArr(OHLC_ADV_COMP_MAP, compObj.field2 );

				var opsObj = jsu.getObjFrmArr(COMP_OPS, compObj.ops );

				var hlObj = jsu.getObjFrmArr(OPS_HL, compObj.hlType );


				text += aotType.label +  ' : '; 

				if(compObj.aot == 'hlIdx'){

					opsObj = jsu.getObjFrmArr(pdef.oahl, compObj.ops );

					text+= tick1Obj.label + ' ' + tperiod1Obj.label + ' ' + field1Obj.label;

					text += ' ' + opsObj.label;

					if(jsu.isNotNull(compObj.v2)){
						
						text += ' ' + compObj.v2 + ' % than';
					}
					
					text +=  ' ' + hlObj.label + ' of last ' + compObj.v1 + ' ticks Starting from  ';

					text +=  tick2Obj.label + ' ' + tperiod2Obj.label + ' ' + field2Obj.label;


				}else if(compObj.aot == 'hlIdxRange'){
					
					var hl2Obj = jsu.getObjFrmArr(OPS_HL, compObj.hlType2 );

					text +=  ' ' + hlObj.label + ' of last ' + compObj.v1 + ' ticks Starting from  ';
					text +=  tick1Obj.label + ' ' + tperiod1Obj.label + ' ' + field1Obj.label;

					text += ' ' + opsObj.label;

					if(jsu.isNotNull(compObj.v2)){
						
						text += ' ' + compObj.v2 + ' % than';
					}

					text +=  ' ' + hl2Obj.label + ' of last ' + compObj.v1 + ' ticks Starting from  ';
					text +=  tick2Obj.label + ' ' + tperiod2Obj.label + ' ' + field2Obj.label;


				}else if(compObj.aot == 'withinRange'){
					
					text +=  compObj.v1 + ' Ticks Starting from ' + tick1Obj.label 

					text +=  ''  + field1Obj.label + ' is '

					text +=  ' ' + opsObj.label  + ' ' + compObj.v2 + ' %';

					text += ' On ' + tick1Obj.label + ' tick ';

				}



			}else{
				text = 'Invalid Config for Advance OHLC settings';
			}


			compObj.csType = PRICE_CS;
			
			var selParam  =  'dynAdvOhlcComp:'+ compObj.id;
			var json = 	csh.cdt(compObj, text, validResults ,selParam, compObj.goodData);
		}

		

	}



	/**********************************************************************************************
								PRICE TREND
	**********************************************************************************************/


	function addTrendNg(type, csType){

/*
				var obj = jsu.getObjFrmArr(TICK_TREND_MAP, type);

				var id =  myTsrScreener.getNextId(obj.nextId)

				var trendObj={ id :id, tick:getTickMap()[0].id,    
					trendType:TREND_NG_OPS[0].id, period : 3, trendPc: null,  trendEx: null ,
					candleType : CANDLE_TYPES[0].id
					
				 };

				 if(jsu.isNotNull(obj.map)){
				 	trendObj. field  =  obj.map[ obj.defFirstIdx].id;
				 }

				 mtgv.cs.screenerData['dyn'+ type +'TrendNg' ].push(trendObj); 


				var tabDef = jsu.getObjFrmArr(daily_tabs, csType)


		        $('#' + tabDef.tab).append( getTrendNgHtml(trendObj, type));
*/
			let json =getTrendNgRow(trendObj, type)



			$('#' + tabDef.tab).append(json.html);

		    csu.dsf(); // displaySelectedFields();	
		}

	function getTrendNgRow(type){

		var obj = jsu.getObjFrmArr(TICK_TREND_MAP, type);

		var id =  myTsrScreener.getNextId(obj.nextId)

		var trendObj={ id :id, tick:getTickMap()[0].id,    
			trendType:TREND_NG_OPS[0].id, period : 3, trendPc: null,  trendEx: null ,
			candleType : CANDLE_TYPES[0].id
			
		 };

		 if(jsu.isNotNull(obj.map)){
		 	trendObj. field  =  obj.map[ obj.defFirstIdx].id;
		 }

		 mtgv.cs.screenerData['dyn'+ type +'TrendNg' ].push(trendObj); 


		var tabDef = jsu.getObjFrmArr(daily_tabs, csType)


        let html = getTrendNgHtml(trendObj, type);

        return { html : html , id : id};
	}	




	function getTrendNgHtml( trendObj , type){	
			var csTypeId = trendObj.id;
			var fncParam = csTypeId +PARAM_DELIM + type;
			
			var obj = jsu.getObjFrmArr(TICK_TREND_MAP, type);
			
			var html = getTrendNgTd( trendObj , type)

			if(mtgv.cs.ng){
				var html = '<tr id=' + trendObj.id + '>'
						+ createTd(createDiv(trendObj.id + 'Td2Div', html, null)) + '</tr>';
				return html;			
			}



			return  csh.dynTr(trendObj, {td1 : doBold(obj.label), td2 : html })
		}	



	function getTrendNgTd( trendObj , type){
			var csTypeId = trendObj.id;
			var func = 'cscmn.tnc';
			var fncParam = csTypeId +PARAM_DELIM + type;

			var html = '' 
			var obj = jsu.getObjFrmArr(TICK_TREND_MAP, type);

			if(mtgv.cs.ng){

				html+=doBold(obj.label) +BR_2;

			}

					
			html+=  getDropDown(getTickMap(), csTypeId+'tick', null,func, fncParam, trendObj.tick);

			if(jsu.isNotNull(obj.map)){
				html+=  SP_3 ;
				html+=getDropDown(obj.map, csTypeId+'field', null,func, fncParam, trendObj.field)
			}

			html+=SP_3 +getDropDown(TREND_NG_OPS, csTypeId+'trendType', null,func, fncParam, trendObj.trendType)
	
			html+=   htmlU.getSpan( ' for Minimum ' , null, 11  ) +getInputTxtParam( csTypeId+'period' , 3, trendObj.period, func , fncParam)	;
			html+=  ' ticks '

			


			html+=  BREAK_LINE;

			html+= 'On' +getDropDown(CANDLE_TYPES, csTypeId+'candleType', null,func, fncParam, trendObj.candleType)

			html+=  ' ,' + htmlU.getSpan(' With Min Change % ' , null , 11  )+  htmlU.getSpan( 'On every Tick (Optional) ' , 'grey' , 10);

			html+= 	getInputTxtParam( csTypeId+'trendPc' , 3, trendObj.trendPc, func , fncParam)	;

			html+=  BREAK_LINE;
			html+=   htmlU.getSpan( ' Exceptions  ' , null , 11);
			html+= 	getInputTxtParam( csTypeId+'trendEx' , 3, trendObj.trendEx, func , fncParam)	;

			html+=  htmlU.getSpan( ' (Optional) # of times When Criteria Does not Match. Valid Range 0-5' , 'grey' , 10);

			var param = 'dyn'+ type +'TrendNg'+':'+csTypeId  ; 
			html+= SP_3 + csh.delIcon(param) ; 

			return html;
		}


		function trendNgChg(id, type){

			var objArr = mtgv.cs.screenerData['dyn'+ type +'TrendNg' ]


			var trendObj = jsu.getObjFrmArr(  objArr, id );

			csu.setProp(objArr, ['tick','field' , 'trendType', 'period', 'trendPc' , 'trendEx' , 'candleType' ],id);
			
			var td = getTrendNgTd( trendObj , type);

			htmlU.addMsgToDiv(trendObj.id+'Td2Div', true, td);

			jsu.isPositiveIntegerInput (id+'period');


			if(jsu.isNotNull(trendObj.v2)){
				jsu.isInputPositiveNumber (id+'trendPc');
			}

			if(jsu.isNotNull(trendObj.v3)){
				jsu.isPositiveIntegerInput (id+'trendEx');
			}
		
			csu.dsf(); // displaySelectedFields();	
		}



	function setTrendNgStatus(trendObj, trendNgDef){

			var obj = trendNgDef;

			var text =  '';

			var tickObj = jsu.getObjFrmArr(getTickMap(), trendObj.tick );


			var opsObj = jsu.getObjFrmArr(TREND_NG_OPS, trendObj.trendType );
			var fieldObj =null;

			var price = false;

			if(jsu.isNotNull(obj.map)){
				fieldObj = jsu.getObjFrmArr(obj.map, trendObj.field ) ;
				price = true;

				// text += fieldObj.label + " "

			}

			var goodData = true;

			if(price){
				text += fieldObj.label + ' Price ' ;
			}else{
				text += ' Volume ' ;
			}

			

			text+= " is '" + opsObj.label+"'";

			text += ' for at least ' + trendObj.period + ' period ';

			text +=  ' on ' + tickObj.label + ' Tick ';


			if(trendObj.candleType!=null){
				var candleObj = jsu.getObjFrmArr(CANDLE_TYPES, trendObj.candleType );
				text +=  ' on ' + candleObj.label ;

			}



			if( !jsu.isInteger(trendObj.period) && Number(trendObj.period) <=0){
				goodData = false;
			}

			if( jsu.isNotNull ( trendObj .trendPc) ){
				if( jsu.isNumber(trendObj.trendPc) && Number(trendObj.trendPc) >0){
					text +=  ' for atleast ' +trendObj.trendPc +' % tick over ticks change';
 				}else{
 					goodData = false;
				}
			}


			if( jsu.isNotNull ( trendObj .trendEx) ){
				if( jsu.isNumber(trendObj.trendEx) && Number(trendObj.trendEx) >0){
					text +=  ' With Exception of ' +trendObj.trendEx +' tick in between';
 				}else{
 					goodData = false;
				}
			}




			
			trendObj.valiMsg = text;
			trendObj.hasData = true;
			trendObj.goodData = goodData;
		}



		function validateTrendNg(validResults){
			for(var i= 0 ; i< TICK_TREND_MAP.length ; i++){
				var trendNgDef = TICK_TREND_MAP[i] ;
				// var field = trendDef.id;

				var trendNgObjArr = validResults.scrData[trendNgDef.obj];

				validaterendNgType(trendNgObjArr, validResults, trendNgDef);
			}	
		}

		function validaterendNgType(trendNgObjArr,  validResults, trendNgDef){

			for(var i=0;i<trendNgObjArr.length ;i++ ){
				var trendNgObj = 	trendNgObjArr[i];
				 var selParam =  'dyn'+ trendNgDef.id  +'TrendNg' +':'+trendNgObj.id ;// + ':'+; 
				 setTrendNgStatus(trendNgObj , trendNgDef);


				trendNgObj.csType = trendNgDef.csType;
				csh.cdt(trendNgObj,trendNgObj.valiMsg, validResults, selParam, trendNgObj.goodData);
			}
		}




	/**********************************************************************************************
								PRICE GAIN
	**********************************************************************************************/

	// var GAIN_MAP =[
	// 	{id : 'price'  , label: 'OHLC Compare' , nextId : 'priceGainId', tab :  'priceCtrlTab', map : OHLC_MAP ,  defFirstIdx : 3, defSecIdx : 1  },
	// 	{id : 'vol'  	 , label: 'Volume Compare' , nextId : 'volGain', tab :  'volCtrlTab'  },
	// ];


	function addGain(type, csType){

		var obj = jsu.getObjFrmArr(TICK_GAIN_MAP, type);

		var id =  myTsrScreener.getNextId( type + 'GainId')
		var gainObj={ id :id, tick1:getTickMap()[0].id,      tperiod1 : TICK_PERIOD[0].id,
			gain:GAIN_LOSS[0].id, ops:AEB_OPS[0].id,
			val:1,
			tick2:getTickMap()[0].id,      tperiod2 : TICK_PERIOD[1].id
		 };

		 if(jsu.isNotNull(obj.map)){
		 	gainObj. field1  =  obj.map[ obj.defFirstIdx].id;
		 	gainObj. field2  =  obj.map[ obj.defSecIdx].id;
		 }

		mtgv.cs. screenerData[ type +  'Gain'].push(gainObj); 

		var tabDef = jsu.getObjFrmArr(daily_tabs, csType)

        $('#' + tabDef.tab).append( getGainHtml(gainObj, type));
        csu.dsf(); // displaySelectedFields();	
	}


	function getGainHtml( gainObj, type){
		var csTypeId = gainObj.id;
		var func = 'cscmn.gc';
		var fncParam = csTypeId +PARAM_DELIM + type;


		var obj = jsu.getObjFrmArr(TICK_GAIN_MAP, type);

		var html = ''


		html+=getDropDown(TICK_PERIOD, csTypeId+'tperiod1', null,func, fncParam, gainObj.tperiod1)
		html+=  SP_3 +  getDropDown(getTickMap(), csTypeId+'tick1', null,func, fncParam, gainObj.tick1);
		
		if(jsu.isNotNull(obj.map)){
			html+=  SP_3 ;
			html+=getDropDown(obj.map, csTypeId+'field1', null,func, fncParam, gainObj.field1)
		}

		html+=SP_3 +getDropDown(GAIN_LOSS, csTypeId+'gain', null,func, fncParam, gainObj.gain)
		html+=SP_3 +getDropDown(AEB_OPS, csTypeId+'ops', null,func, fncParam, gainObj.ops)

		html+=SP_3 + ' By ' + getInputTxtParam( csTypeId+'val' , 4, gainObj.val, func , fncParam) +"%" 
		html+=  SP_3 +'<div align="left"> ' +SP_3  +doBold('Vs.	') 	+ '</div>'; // + getSpan('' , 'green' , 14)
		// html+=  SP_3 +' <b>vs.</b> ' +SP_3;

		// html+=  SP_3 ;
		html+=getDropDown(TICK_PERIOD, csTypeId+'tperiod2', null,func, fncParam, gainObj.tperiod2)
		html += SP_3  +  getDropDown(getTickMap(), csTypeId+'tick2', null,func, fncParam, gainObj.tick2);


		var gainType = 'Compare With Prev Tick'

		// var type = ''

		if(jsu.isNotNull(obj.map)){
			html+=  SP_3 ;
			html+=getDropDown(obj.map, csTypeId+'field2', null,func, fncParam, gainObj.field2)
			gainType = 'OHLC Compare';
		}
		


		// var param =  type+'Gain:'+csTypeId; 
		var param =   type + 'Gain:'+gainObj.id ; 
		html+= SP_3 + csh.delIcon(param) ; 



		 html += BREAK_LINE + getSpan('Caution :  ' , 'orange' , 10 )    

		+ getSpan('Please use '+ doBold( gainType )+' Option Button <i class="fas fa-long-arrow-alt-down"></i> Instead . This will be removed by 31st Mar' , 'grey' , 10  );



		// html+=BREAK_LINE + htmlU.getSpan('Caution : Please use '+gainType+' Option Button Instead. This will be removed by 31st Mar ' , 'orange' , 10 );

		// setGainLossStatus(gainObj, type)

		return  csh.dynTr(gainObj, {td1 : doBold('Gain/Loss'), td2 : html })
	}

	function gainChg(id, type){


		 var val = htmlU.getInputVal( id+'val');
		 // mtgv.cs.screenerData.gainLoss[type + 'Gain'].val =val;
		 // if(jsu.isNill(val)) 
		if(     jsu.isInputPositiveNumber (id+'val') ){
			
		}



		csu.setProp(mtgv.cs.screenerData[type + 'Gain'], ['tick1','tick2','field1' ,  'field2', 'tperiod1','tperiod2', 'ops' , 'val', 'gain'],id);
		
		var gainObj = jsu.getObjFrmArr( mtgv.cs.screenerData[ type +'Gain' ] , id );
		// setGainLossStatus(gainObj, type)

		csu.dsf(); // displaySelectedFields();	
	}

	function setGainLossStatus(gainObj , obj){

		// var obj = jsu.getObjFrmArr(TICK_GAIN_MAP, type);
			var text =  obj.label  + ' : ' ;


			if(mtgv.cs.crossFreq){
				if(gainObj.tick1 =='tick') {  gainObj.tick1 = mtgv.cs.screenerData.scrFreq}; 
				if(gainObj.tick2 =='tick') {  gainObj.tick2 = mtgv.cs.screenerData.scrFreq}; 
			}


			var tick1Obj = jsu.getObjFrmArr(getTickMap(), gainObj.tick1 );
			var tick2Obj = jsu.getObjFrmArr(getTickMap(), gainObj.tick2 );

			var tperiod1Obj = jsu.getObjFrmArr(TICK_PERIOD, gainObj.tperiod1 );
			var tperiod2Obj = jsu.getObjFrmArr(TICK_PERIOD, gainObj.tperiod2 );

			var opsObj = jsu.getObjFrmArr(AEB_OPS, gainObj.ops );


			// var val = htmlU.getInputVal( gainObj.id+'val');

			text +=  tperiod1Obj.label + ' ' 

			if(tick1Obj!=null){
				text += tick1Obj.label + " " ;
			}


			if(jsu.isNotNull(obj.map)){
				var field1Obj = jsu.getObjFrmArr(obj.map, gainObj.field1 ) ;
				text += field1Obj.label + " "
			}
			

			text += opsObj.label + " "
			gainObj.goodData = true;

			// var val = htmlU.getInputVal( id+'val');
			if( jsu.isNumber(gainObj.val) && Number(gainObj.val) >0){
				text +=  ' By' +gainObj.val+ "% ";

			}else{
				gainObj.goodData = false;
			}

			text += tperiod2Obj.label + ' ' 


			if(tick2Obj !=null){
				text+= tick2Obj.label + " "  ;	
			}

			
			if(jsu.isNotNull(obj.map)){
				var field2Obj = jsu.getObjFrmArr(obj.map, gainObj.field2) ;
				text += field2Obj.label + " "
			}
			gainObj.valiMsg = text;
			gainObj.hasData = true;
			// gainObj.goodData = true;
			if(!gainObj.goodData) {
				gainObj.valiMsg = text =  obj.label  + ' : Invalid value of ' + opsObj.label +' %' ;
			}

	}


	function validateGain(validResults){
			for(var i= 0 ; i< TICK_GAIN_MAP.length ; i++){
				var gainDef = TICK_GAIN_MAP[i] ;
				// var field = trendDef.id;

				var gainObjArr = validResults.scrData[gainDef.obj];

				validateGainType(gainObjArr, validResults, gainDef);
			}	
		}


	function validateGainType(gainObjArr,  validResults, gainDef){
			// var param =  'dynComp:'+csTypeId + ':dyn'+type + 'Comp'; 
			for(var i=0;i<gainObjArr.length ;i++ ){
				var gainObj = 	gainObjArr[i];
				// validResults.validFieldCount++;

				setGainLossStatus(gainObj, gainDef);


				gainObj.csType = gainDef.csType;
				 var selParam =  gainDef.id + 'Gain:'+gainObj.id ; 

				 if(gainObj.goodData){
					
					csh.cdt(gainObj,gainObj.valiMsg, validResults, selParam, true);
					// validResults.validFieldCount++; 	
				 }else{
				 	csh.cdt(gainObj,gainObj.valiMsg, validResults, selParam, false);
				 	// if(!gainObj.disabled) validResults.invalidFields++;
				 }
			}
	}



	// DIY 
	function validateDiyBase(compObj){
		if(compObj.idL == CS_NOT_SELECTED){
			return false;
		}

		if( jsu.containsString( [CS_ABOVE, CS_BELOW],   compObj.ops ) && jsu.isNotNull(compObj.v1)  ){
			return  jsu.isNumber(compObj.v1);
			
		} else if( jsu.containsString( [ WITHIN , MORE_THAN],   compObj.ops ) ){
			return  jsu.isNumber(compObj.v1);
		} else if( jsu.containsString( [ CS_CO_ABV_WITHIN , CS_CO_BLW_WITHIN],   compObj.ops ) && jsu.isNotNull(compObj.v1)){
				// jsu.isInputPositiveNumber (id+'v1')
			// jsu.inputNumberRange (id+'v1', 0,10)	
			return ( jsu.isNumber(compObj.v1) && compObj.v1 >=0 && compObj.v1 <=10)

		}else if(jsu.containsString( [CS_BETWEEN],   compObj.ops )) {
			return (  jsu.isNumber(compObj.v1) && jsu.isNumber(compObj.v1) );
		}
		return true;
	}


	function getDiyOpsText(compObj,  rightIndiText){
		var text =  ''

		var opsObj = jsu.getObjFrmArr( COMP_DIY_OPS, compObj.ops );

		if( jsu.containsString( [CS_ABOVE, CS_BELOW],   compObj.ops )   ){

			text +=  opsObj.label +' '+  rightIndiText ;

			if( jsu.isNotNull(compObj.v1) && jsu.isNumber(compObj.v1) && Number(compObj.v1) >0){
				text += ' by min ' + compObj.v1 + '%'
			}

		} else if( jsu.containsString( [ CS_EQUALS , CS_GT_EQ, CS_LT_EQ],   compObj.ops ) ){
			text +=  opsObj.label ;
	
			text += ' ' +  rightIndiText

		} else if( jsu.containsString( [ WITHIN , MORE_THAN],   compObj.ops ) ){
			text +=  opsObj.label ;
				
			if( jsu.isNumber(compObj.v1) && Number(compObj.v1) >0){
					text += ' '+ compObj.v1 + '% of '
			}	
			text += ' '+  rightIndiText

		}else if(jsu.containsString( [CS_BETWEEN],   compObj.ops )) {
			text +=  opsObj.label ;
			if( jsu.isNumber(compObj.v1) && Number(compObj.v1) >0   && jsu.isNumber(compObj.v2) && Number(compObj.v2) >0){
				text += ' '+ compObj.v1 + ' and ' + compObj.v2+   '% of '
			}	
			text += ' '+  rightIndiText;
		}else if(jsu.containsString( [CS_CO_ABV, CS_CO_BLW],   compObj.ops )) {
			text +=  opsObj.label ;
			text += ' '+  rightIndiText;
	
		}else if(jsu.containsString( [CS_CO_ABV_WITHIN, CS_CO_BLW_WITHIN],   compObj.ops )) {
			text +=  opsObj.label ;
			text += ' '+  rightIndiText;
			
			if(compObj.v1 > 0){
				text+= ' within last ' + compObj.v1 + ' ticks';	
			}
		}

		return text;
	}


	// // Field Deep Compare --- Ex - Turn Over  Start ...


	// function getHtmlTds(finObj){

		
	// }







	return {

		gttp: getTechTickPeriod ,

		// TREND 
		// tpv : trendPeriodVal.

		gtnr : getTrendNgRow,
		tht : getTrendHtml,
		tc  : trendChg,
		vt : validateTrending,

		ac : addComp,
		acr : addCompRow,

		cc : compChg,
		gch : getCompHtml,
		vc : validateComp,

		gcoh : getCompOpsHtml,
		rchv : runCompHtmlVal,

		// OHLC Sp Time 
		astc : addSpecificTimeComp,


		astcn : addSpecificTimeCompNg,

		ccst : compChgSpecTime,
		spch :	getSpTimeCompHtml,
		vspt : validateSpTimeComp,

		
		// Advanced OHLC  
		aao : addAdvanceOhlc,
		aaon : addAdvanceOhlcNg,


		ccao : compChgAdvOhlc,
		aoh :	getAdvOhlcHtml,
		vao : validateAdvOhlc,


		// Trend NG
		atn : addTrendNg,
		tnc : trendNgChg,
		gth : getTrendNgHtml,
		vtn : validateTrendNg,



		ggh : getGainHtml,
		ag : addGain,
		gc : gainChg,
		vg : validateGain,

		vdb: validateDiyBase,
		dot : getDiyOpsText
	}

})(); // module 	