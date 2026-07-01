

// CS DIVERGENCE
var csd =  (function () {


	var thisObject = 'csd';

	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;








	function getDivHtml(id){

		// var html = '';

		


		var html ='<br/><div id="'+id+'Div">';

		if(jsu.isMigContext()){
			mtgv.mtpp.DIV_TYPE = DIV_TYPE_LEAN;			
		}


		if(jsu.isNull( mtgv.mtpp.DIV_TYPE ) ){

			html+= doBold(" Divergence is available in Trader Plan onwards.")

			html+="</div>";

			return html;
		}




		if(mtgv.mtpp.DIV_TYPE.length ==2){
			html+= doBold(" More Divergence Options is available in Trader Plus Plan.")
		}

		html+= '<table id="techDivCtrlTab" '+TAB_INDI_STYLE+'     >';


		html+= getAllRows();

		html+="</table>";

		

		html+= SP_3 + htmlU.getSpan(doBold("Click on any Tech Indicator to Configure Screener. You can add More than One of any type "), 'grey' , 10);

		html+= getControls();
/*
		html+='<div '+CS_HELP_DIV_STYLE +'>';
		var  helpText ='';
		helpText+= BR_2  + doBold( 'You can select as many divergence. Unlike other filters, Screening of divergence is based on any of the selected divergence ' )  ;

		helpText+= BR_2 +'Bullish Divergence - When price is falling and Indicator is rising'
		helpText+= BR_2 +'Mild Bullish Divergence - When price Lower level is flat/horizontal  and Indicator is rising'

		helpText+= BR_2 +'Weak Bullish Divergence - When price is falling and Indicator lower level is flat'
		helpText+= BR_2 +'Bullish Hidden Divergence - When price rising  and Indicator is falling'
		helpText+= BR_2 +'Bullish Potential Divergence - Possibility of a Bullish Divergence'


		helpText+= BR_2 +'Bearish Divergence - When price is rising and Indicator is falling'
		helpText+= BR_2 +'Mild Bearish Divergence - When price Lower level is flat/horizontal and Indicator is falling'

		helpText+= BR_2 +'Weak Bearish Divergence - When price is rising and Indicator lower level is flat'
		helpText+= BR_2 +'Bearish Hidden Divergence - When price falling  and Indicator is rising'

		helpText+= BR_2 +'Bearish Potential Divergence - Possibility of a Bearish Divergence'


		html+=  getSpan(helpText,  'grey', 10);

		// html+= BR_2 + getSpan(ohlcComp,  'grey', 10);

		html+='</div>';

		html+='<br/>';
		html+='<br/>';
*/
		html+="</div>";

		return html;
	}


	function getAllRows(){

		let html = '';
		var techDivComp = mtgv.cs.screenerData.techDivComp;

		for(var i=0;i< techDivComp.length ;i++){

			html+=getDivTr(techDivComp[i]);

		}
		return html;
	}


	function getFormRow(type, id, state){ //MA_PRICE_OPTIONS

		let obj =  jsu.getObjFrmArr(mtgv.cs.screenerData.techDivComp, id)

		if(jsu.isNotNull(state)){
			if(state == 'enable')  obj.disabled  = false;
			if(state == 'disable') obj.disabled  = true	;
		}else{
			 obj.disabled  = false;
		}

		return getDivTr(obj);
	}


	function getFormTd(type, id, state){ //MA_PRICE_OPTIONS

		let obj =  jsu.getObjFrmArr(mtgv.cs.screenerData.techDivComp, id)

		if(jsu.isNotNull(state)){
			if(state == 'enable')  obj.disabled  = false;
			if(state == 'disable') obj.disabled  = true	;
		}else{
			 obj.disabled  = false;
		}

		return getDivTr(obj);
	}



	function getControls(){
		var addFnc = "csd.adv"
		let html ='';
		html+= '<table id="	" class="table table-bordered   "  >';

		// ------------ Overbought / Sold ----------------- 
		html+= '<tr><td>';
		html+= doBold('Over Bot/Sold : ') ; 		
		html+= htmlU.getButtonP('Aroon Osc' , addFnc, AROON_OSC  + PARAM_DELIM + 'obos','Aroon (Aroon Oscillator)');
		html+= SP_3 + htmlU.getButtonP('CCI' , addFnc, CCI + PARAM_DELIM+ 'obos' ,'Commodity Channel Index');
		html+= SP_3 + htmlU.getButtonP('MFI' , addFnc, MFI + PARAM_DELIM + 'obos','MSI (Money Flow Index)');
		

		//  Rebranding of RSI
		html+= SP_3 + htmlU.getButtonP('RSI (F)' , addFnc, RSI + PARAM_DELIM + 'obos','RSI (Fast)');
		html+= SP_3 + htmlU.getButtonP('RSI(S)' , addFnc, RSI_SMOOTH+ PARAM_DELIM  + 'obos','RSI ( Relative Strength Indicator)');


		html+= SP_3 + htmlU.getButtonP('Sto Fast' , addFnc, STO_FAST + PARAM_DELIM + 'sto','Stochastic Fast');
		html+= SP_3 + htmlU.getButtonP('Sto Slow' , addFnc, STO_SLOW + PARAM_DELIM + 'sto','Stochastic Slow');
		
		html+= SP_3 + htmlU.getButtonP('Sto RSI' , addFnc, STO_RSI + PARAM_DELIM + 'stoRsi','Stochastic RSI (Fast)');
		html+= SP_3 + htmlU.getButtonP('Sto Rsi Slow' , addFnc, STO_RSI_SLOW + PARAM_DELIM + 'stoRsi','Stochastic RSI');
		


		html+= SP_3 + htmlU.getButtonP('UO' , addFnc, UO + PARAM_DELIM + 'obos','UO ( Ultimate Oscillator)');
		html+= SP_3 + htmlU.getButtonP('W%R' , addFnc, WILLIAMS + PARAM_DELIM + 'obos','W%R ( Williams %R)');

		
		html+= '</td></tr>';
		// ------------Over Lays ----------------- 


		// ------------Trend ----------------- 

		html+= '<tr><td>';
		html+= doBold('Trend : ') ;

		html+= htmlU.getButtonP('ADX' , addFnc, ADX  + PARAM_DELIM + ADX,'ADX (Average Directional Index)');
		
		

		html+= SP_3 +htmlU.getButtonP('ATR' , addFnc, ATR  + PARAM_DELIM + ATR,'ATR (Average True Range)');

		html+= SP_3 +htmlU.getButtonP('AweOsc' , addFnc, AWESOME_OSC  + PARAM_DELIM + AWESOME_OSC,'Awesome Oscillator');


		html+= SP_3 + htmlU.getButtonP('MACD' , addFnc, MACD + PARAM_DELIM + 'macd','MACD (Moving Average Convergence & Divergence)');
		html+= SP_3 + htmlU.getButtonP('MACD Hist' , addFnc, MACD_HIST + PARAM_DELIM + MACD_HIST,'MACD Histogram');


		html+= SP_3 + htmlU.getButtonP('ROC' , addFnc, ROC + PARAM_DELIM + ROC,'ROC (Rate of Change)');

		html+= SP_3 + htmlU.getButtonP('RVI' , addFnc, RVI + PARAM_DELIM + RVI,'RVI (Relative Vigor Idx)');

		// html+= SP_3 + htmlU.getButtonP('Supertrend' , addFnc, SUPER_TREND  + PARAM_DELIM +SUPER_TREND,'Supertrend');
		
		// html+= htmlU.getSpan("More Indicators coming by Mid Jan" , 'grey', 10);

		html+= '</td></tr>';

		
		// ------------Volume Based  ----------------- 
		html+= '<tr><td>';
		
		// html+= SMALL_BR  + TSR_HR +SMALL_BR +  SP_3 

		html+= doBold('Volume Based : ') ; 		
		html+= htmlU.getButtonP('CMF' , addFnc, CMF +  PARAM_DELIM  + CMF ,'CMF Chaikin Money Flow');
		html+= SP_3 +htmlU.getButtonP('ADI' , addFnc, ADI +  PARAM_DELIM  + ADI ,'ADI Accumulation Distribution Index');



		// html+= SMALL_BR  + TSR_HR +SMALL_BR
		html+= '</td></tr>';
		html+= '<tr><td>';

	
		// html+= SP_3 + getButtonP('Others with Abs Value' , 'cst.addTech', 'techAbsComp');
		// html+= SP_3 + getButtonP('Other Crossovers ' , 'cst.addTech', 'techCoComp');
		
		html+= '</table>';

		return html;

	}

	function addNewFilter(indi){

		var techDivComp = mtgv.cs.screenerData.techDivComp;
		var id =  myTsrScreener.getNextId( 'techDivCompId');

		var techDivObj = { id :id,  type : 'techDiv' ,   indi: indi}


		techDivComp.push(techDivObj);

		var html = getDivTr(techDivObj);


		return { html : html , id : id};
	}

	function addFilterChange(type, subtype,id){ //MA_PRICE_OPTIONS
		techDivChg(id);
	}


	function getDivTr(techDivObj){
		
		// var td1 = createTd(td1Txt)


		var td2 = getTD( techDivObj );

		// var html = '<tr id='+techDivObj.id+'>' + td1	+ createTd(createDiv(techDivObj.id+'Td2Div', td2)) +'</tr>';

		// if(mtgv.cs.ng){

			html = '<tr id='+techDivObj.id+'>' +  createTd(createDiv(  techDivObj.id+'Td2Div',  td2)) +'</tr>';

		// }else{


		// 	html = '<tr id='+techDivObj.id+'>' + td1	+ createTd(createDiv(techDivObj.id+'Td2Div', td2)) +'</tr>';
		// }



		return html;
	}





	function addDiv(indi, subType){

		let json = addNewFilter(indi);
		
	    $('#techDivCtrlTab').append( json.html);

	    techDivChg(json.id);
	    csu.dsf();

	}


	function getTD(techDivObj){

		var html= '';

		
		var objDef =  jsu.getObjFrmArr( ALL_INDIS_MAP, techDivObj.indi );
		
		if(techDivObj.indi == MACD_HIST){
			objDef = {id : MACD_HIST , label : "MACD Histogram" , shortName : "MACD Histogram"}
		}

		

		var td1Txt =  htmlU.doBold( objDef.shortName);

		if(mtgv.mtpp.crossFreq){ // Cross Freq....

			td1Txt += htmlU.getSpan(' On ' , 'grey' , 10) ;




			var ticks = csu.gct(techDivObj , 'divTick');
			td1Txt +=  	getDropDown(ticks, techDivObj.id+'divTick', 'width:90px','csd.tdc', techDivObj.id, techDivObj.divTick) 
			+ htmlU.getSpan(' Tick ' , 'grey' , 10)

			td1Txt += BR_2;

		}

		td1Txt ='<div>' + td1Txt +'</div>'  // required to remove Default styling of BS


		html+= td1Txt;

		for(var i=0;i<mtgv.mtpp.DIV_TYPE.length ; i++){

			var divType = mtgv.mtpp.DIV_TYPE[i];
			
			var cbId = techDivObj.id+techDivObj.type+divType.id;

			var checked ='';
			if(techDivObj[divType.id] =='chk'){
				checked = 'checked';
			}
			if( divType.id =='br' && mtgv.mtpp.DIV_TYPE.length >2 ) html+=BR_2;




			html+=    htmlU.getCheckboxP(cbId, 'csd.tdc', checked,techDivObj.id  ) +' ' + divType.label +SP_3;

		}


		var param = 'techDivComp' + ':'+techDivObj.id; // Vol Compare


		html+= csh.gept(techDivObj, DIV_CS,  param);



		html+= SP_3 + csh.delIcon(param) ;

		return html;


	}


	function techDivChg(id){

		var techDivObj =   jsu.getObjFrmArr(mtgv.cs.screenerData.techDivComp,id);

		if(mtgv.mtpp.crossFreq){
			techDivObj.divTick = htmlU.getInputVal(techDivObj.id+'divTick');
		}
		for(var i=0;i<mtgv.mtpp.DIV_TYPE.length ; i++){
			var divType = mtgv.mtpp.DIV_TYPE[i];
			
			var cbId = techDivObj.id+techDivObj.type+divType.id;

			delete  techDivObj[divType.id]; // Remove all property and add only checked..

			if(htmlU.isChecked(cbId)){
				techDivObj[divType.id] = 'chk';
			}

			// console.log( ' id : ' + techDivObj.id + ' type : ' + techDivObj.type 
			// 	+ ' divType :  ' + divType.label  + " Checked : " + htmlU.isChecked(cbId));

		}




		csu.dsf();

	}


	function validateDiv(validResults){

		var techDivComp = mtgv.cs.screenerData.techDivComp;
		
		for ( var i=0;i< techDivComp.length ;i++){

			var techDivObj = techDivComp[i];

			var text= '';
			var selText= '';
			var hasSel = false;
			techDivObj.goodData =false;

			for(var j=0;j<mtgv.mtpp.DIV_TYPE.length ; j++){
				var divType = mtgv.mtpp.DIV_TYPE[j];

				if(techDivObj[divType.id] == 'chk'){
					hasSel = true;

					selText += divType.label +', '
					techDivObj.goodData =true;
				}
			}	

			techDivObj.csType = DIV_CS;

			var objDef =  jsu.getObjFrmArr( ALL_INDIS_MAP, techDivObj.indi );

			if(techDivObj.indi == MACD_HIST){
				objDef = {id : MACD_HIST , label : "MACD Histogram" , shortName : "MACD Histogram"}
			}

			var selParam = 'techDivComp' + ':'+techDivObj.id; // Vol Compare

			if(!hasSel) {
				csh.cdt(techDivObj, objDef.label  + ' Divergence Selected None ' , validResults, selParam, false);

			}else{
				text = objDef.label ;
				if(jsu.isNotNull(techDivObj.divTick)){
					text+= 'on ' +techDivObj.divTick  +' Tick'

				}

				 text+=  " Selected Divergence (" + selText +')';
				csh.cdt(techDivObj,text, validResults, selParam, true);
			}
			
		}		
	}


	function getCustScrFilter(filer, defFilter){
		// var filer = [];
		
		// filer.push({  id :  "ppComp" , label : 'Pivot Point'    , tab : PP_CS, 
		// 	type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addPP' , params:  'pp' } , subDef :pivot_fields }) ;  //   JavaScript:cscmn.atn('price','priceCs');


		if(!mtgv.mtpp.pr){
			return filer;
		}

		for(var i=0;i< ALL_INDIS_MAP.length ;i++){
			var thisIndi = ALL_INDIS_MAP[i];

			if(!thisIndi.scr){
				continue;
			}

			var secParam =thisIndi.id;

			if(thisIndi.techType  == 'Obos'){

				if( jsu.containsString([STO_FAST, STO_SLOW] , thisIndi.id )){
					secParam ='sto'
				}else if( jsu.containsString([STO_RSI, STO_RSI_SLOW] , thisIndi.id )){
					secParam ='stoRsi'
				}else{
					secParam ='obos'
				}
				
			}else	if (thisIndi.id  == MACD ){
					secParam ='macd'
				}else if (thisIndi.id  == AROON ){
					secParam ='AroonIndi'
				}

				let mobFilter =''
				if(jsu.isNotNull(thisIndi.techType)){
					mobFilter = DIV_CS +'_'+thisIndi.techType.toLowerCase() + '_'+thisIndi.id;
				}else{
					console.log('Missing Tech Type ' + thisIndi.id );
				}

				if(thisIndi.subType =='volatility'){
					mobFilter = DIV_CS +'_'+ 'volatility' + '_'+thisIndi.id;
				}

				let obj = {  id :  "techDivComp" , label : thisIndi.label +' Divergence', slabel : thisIndi.shortName +' Divergence'   , tab : DIV_CS, 
							type : 'btn'  , filtDef : {obj:thisObject, fnc: 'adv' , params:  thisIndi.id  + PARAM_DELIM +secParam} ,
						mobFilter: mobFilter	
					}


				filer.push(obj) ; 

				if(jsu.containsString([ RSI_SMOOTH, MACD], thisIndi.id)){
					defFilter.push(obj);
				}
				
			

		}
		filer.push({  id :  "techDivComp" , label : 'MACD Histogram Divergence', tab : DIV_CS, 
						type : 'btn'  , filtDef : {obj:thisObject, fnc: 'adv' , params:  MACD_HIST  + PARAM_DELIM + MACD_HIST} }) ; 

		return filer ;
	}

	function ngSearch(item, filterDef, params ){

		paintFilterRow(params[0], params[1] );
	}


	function paintFilterRow(type, subType) {
		// { html: html, id: id }

		mtgv.cs.editActive = [];
		let newFilterRow = addNewFilter(type, subType);

		let filterTable = $("#" + CS_FILTERS_TABLE);
		
		filterTable.append(newFilterRow.html);

		addFilterChange(type, subType, newFilterRow["id"]);

		mtgv.cs.editActive.push(newFilterRow); 

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

		thd : getDivHtml,
		adv : addDiv,
		tdc  : techDivChg,
		vd : validateDiv,
		gcsf : getCustScrFilter

	}

})(); // module 	

