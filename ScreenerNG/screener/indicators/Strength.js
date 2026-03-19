
var LIST_TEC_STR =[

		{id: 'aBull', label: "All Bullish"},
		{id: 'strBull', label: "Strong Bullish"},
		{id: 'bull', label: "Bullish "},
		{id: 'mBull', label: "Mild Bullish "},

		{id: 'aNeutral', label: "All Neutral"},
		{id: 'bullNeutral', label: "Neutral With Bullish Bias"},
		{id: 'bearNeutral', label: "Neutral With Bearish Bias"},

		{id: 'aBear', label: "All Bearish"},
		{id: 'strBear', label: "Strong Bearish"},
		{id: 'bear', label: "Bearish "},
		{id: 'mBear', label: "Mild Bearish "},
];


var LIST_GWH_STR = createFunList("Growth Index" , 'gwth');
var LIST_VAL_STR = createFunList("Value Index" , 'val');
var LIST_PFT_STR = createFunList("Profitability Index" , 'pft');
var LIST_STAB_STR = createFunList("Stablility Index" , 'stab');


function createFunList(label , type){


	var list = [];

		list.push({id: 'allGd'+type , label: "All " + label +" Stocks"} );
		list.push({id: 'exc'+type , label: "Excellent " + label +" Stocks"} );
		list.push({id: 'gd'+type , label: "Good " + label +" Stocks"} );
		list.push({id: 'mild'+type , label: "Mild " + label +" Stocks"} );
		list.push({id: 'no'+type , label: "No Significant " + label +" Stocks"} );

		list.push({id: 'allLow'+type , label: "All Low " + label +" Stocks"} );
		list.push({id: 'low'+type , label: "Low " + label +" Stocks"} );
		list.push({id: 'vlow'+type , label: "Very Low " + label +" Stocks"} );
		list.push({id: 'poor'+type , label: "Poor " + label +" Stocks"} );

		return list;

}

var LIST_BULL_BEAR =[
		{id: 'bull', label: "Bullish"},
		{id: 'bear', label: "Bearish"},
];


var RS_PERIODS = [
					{id: PERIOD_1W, label: "One Week"},
					{id: PERIOD_2W, label: "Two Week"},
					{id: PERIOD_1M, label: "One Month"},
					{id: PERIOD_3M, label: "Three Month"},
					{id: PERIOD_6M, label: "Six Month"},
					{id: PERIOD_1Y, label: "One Year"},
					{id: PERIOD_2Y, label: "Two Year"},
					{id: PERIOD_3Y, label: "Three Year"},
					{id: PERIOD_4Y, label: "Four Year"},
					{id: PERIOD_5Y, label: "Five Year"},
					{id: PERIOD_10Y, label: "Ten Year"},

	              ] ; 

var RS_BASE_IDX = [
	{id: 'Nifty50', label: "NIFTY 50"},
	{id: 'NiftyNext50', label: "NIFTY Next 50"},
	{id: 'Nifty100', label: "NIFTY 100"},
	{id: 'Nifty200', label: "NIFTY 200"},
	{id: 'Nifty500', label: "NIFTY 500"},

	{id: 'NiftyMidCap50', label: "NIFTY Midcap 50"},
	{id: 'NiftyMidCap100', label: "NIFTY Midcap 100"},
	{id: 'NiftyMidCap150', label: "NIFTY Midcap 150"},

	{id: 'NiftySmallCap50', label: "NIFTY Smallcap 50"},
	{id: 'NiftySmallCap100', label: "NIFTY Smallcap 100"},
	{id: 'NiftySmallCap250', label: "NIFTY Smallcap 250"},


	{id: 'NiftyAutoIndex', label: "NIFTY Auto"},
	{id: 'NiftyBankIndex', label: "NIFTY Bank"},
	{id: 'NiftyConsumerDurablesIndex', label: "NIFTY Consumer Durables"},
	{id: 'NiftyFinancialServiceIndex', label: "NIFTY Financial Services"},
	{id: 'NiftyFmcgIndex', label: "NIFTY FMCG"},
	{id: 'NiftyITIndex', label: "NIFTY IT"},
	{id: 'NiftyMediaIndex', label: "NIFTY Media"},
	
	{id: 'NiftyMetalIndex', label: "NIFTY Metals"},
	{id: 'NiftyPharmaIndex', label: "NIFTY Pharma"},

	{id: 'NiftyPrivateBankIndex', label: "NIFTY Pvt Banks"},

	{id: 'NiftyPSUBankIndex', label: "NIFTY PSU Bank"},
	{id: 'NiftyRealtyIndex', label: "NIFTY Realty"},
];






var csstr =  (function () {			
	var htmlU = mintHtmlUtil;
	// var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;


	var thisObject = 'csstr';

	function getStrengthtml(id){
		var scrData = mtgv.cs.screenerData;

		var html ='<br/><div id="'+id+'Div">';
		html+= '<table id="strCtrlTab" '+TAB_INDI_STYLE+'   >';

		html += getAllRows();


		html+= '</table>'; // BS TAB START...		


		html+= getControls();

		// html+= SP_3 + getButtonP('Relative Str' , 'csstr.addStr', 'relStrComp'); // By Returns


		html+='<div '+CS_HELP_DIV_STYLE +'>';


		var  helpText = "Tech Strength is based on Deep Analysis, Back Testing and Historical Trend Analysis using Machine Learning."
		+" Overall Technical Strength is based on 50+ indicators (and growing) including Technicals, moving Avg, chart patterns, "
		+" candlestick and proprietary algorithms.Technical Strength is calculated every 5 Mins for intraday "
		+" and around around 5 to 6 PM for EOD , Weekly and Monthly."

		helpText += BR_2 + "Tech Rank - the position of tock in terms of %. "+
		"For Example in universe of 2000 stocks, More bullish than 99% means it is in top 10. You can further sort using column sorter";

		html+=  getSpan(helpText,  'grey', 10);

		html+='</div>';

		html +='</div>'; //pvCsDiv	

		// console.log(html);
		return html;
	}

// ----------- 


	function getAllRows(){

		let html = '';

		for(var i=0;i<scrData.techStrComp.length;i++){
			html+=getTecStrHtml(scrData.techStrComp[i]);
		}

		for(var i=0;i<scrData.techRankComp.length;i++){
			html+=getTecRankHtml(scrData.techRankComp[i]);
		}

		for(var i=0;i<scrData.returnsComp.length;i++){
			html+=getReturnsHtml(scrData.returnsComp[i]);
		}

		for(var i=0;i<scrData.relPriceStrComp.length;i++){
			html+=getRelPriceStrHtml(scrData.relPriceStrComp[i]);
		}		


		html+=getFundaStrHtml();

		return html;

	}


	function getFormRow(type, id){ 

		let obj =   csu.gso(type, id)

		if(type=='techStrComp'){
    	    return getTecStrHtml(obj);
		}else if(type=='techRankComp'){
    	    return getTecRankHtml(obj);
		}else if(type=='returnsComp'){
    	    return getReturnsHtml(obj);
		}else if(type=='returnsRankComp'){
    	    return getReturnRankHtml(obj);
		}else if(type=='relPriceStrComp'){
    	    return getRelPriceStrHtml(obj);
		}else if (  jsu.containsString( ['gwthStrComp'   , 'valStrComp'  , 'pftStrComp'  , 'stabStrComp'  ] , type   ) ){
    	    var label = getFundaLabel(type) ;
    	    return getFundaStrRow(obj, label);
		}else if (  jsu.containsString( ['gwthRankComp'   , 'valRankComp'  , 'pftRankComp'  , 'stabRankComp'  ] , type   ) ){
			var label = getFundaLabel(type) ;
			return getFundaRankRow(techRankobj, label)
		}

	}


	function getControls(){

		let html= ''

		html+= SP_3 + getButtonP('Tech Strength' , 'csstr.addStr', 'techStrComp');

		html+= SP_3 + getButtonP('Tech Rank' , 'csstr.addStr', 'techRankComp');

		html+= SP_3 + getButtonP('Returns' , 'csstr.addStr', 'returnsComp');

		// html+= SP_3 + getButtonP('Returns Rank' , 'csstr.addStr', 'returnsRankComp');

		if(!jsu.isMigContext()){
			html+= SP_3 + getButtonP('Relative Price Strength' , 'csstr.addStr', 'relPriceStrComp'); // By Returns	
		}

		


		html+= BREAK_LINE +  TSR_HR + BREAK_LINE;

		html+= SP_3 + getButtonP('TSR Growth Index' , 'csstr.addStr', 'gwthStrComp');

		html+= SP_3 + getButtonP('TSR Growth Rank' , 'csstr.addStr', 'gwthRankComp');

		html+= SP_3 + getButtonP('TSR Value Index' , 'csstr.addStr', 'valStrComp');

		html+= SP_3 + getButtonP('TSR Value Rank' , 'csstr.addStr', 'valRankComp');


		html+= BREAK_LINE +  TSR_HR + BREAK_LINE;

		html+= SP_3 + getButtonP('TSR Profit Index' , 'csstr.addStr', 'pftStrComp');

		html+= SP_3 + getButtonP('TSR Profit Rank' , 'csstr.addStr', 'pftRankComp');

		html+= SP_3 + getButtonP('TSR Stablity Index' , 'csstr.addStr', 'stabStrComp');

		html+= SP_3 + getButtonP('TSR Stablity Rank' , 'csstr.addStr', 'stabRankComp');


		return html;


	}


	function addStr(type){

		let json = addNewFilter(type);

		$('#strCtrlTab').append(json.html );

		addFilterChange(type , json.id);



		csu.dsf();
	}


	function addNewFilter(type){

		var scrData = mtgv.cs.screenerData;
		var id =  myTsrScreener.getNextId(type +'CompId');
		var html ='';

		if (type=='techStrComp'){
	
			var techStrobj={ id :id, tick: mtgv.cs.screenerData.scrFreq, strType : LIST_TEC_STR[0].id ,type:type, goodData : true};
			scrData.techStrComp.push(techStrobj);
			 html = getTecStrHtml(techStrobj)
		
		}else if (type=='techRankComp'){
	
			var techRankobj={ id :id, tick: mtgv.cs.screenerData.scrFreq, rankType : LIST_BULL_BEAR[0].id , rankPc : 90 ,type:type, goodData : true};
			scrData.techRankComp.push(techRankobj);
			 html = getTecRankHtml(techRankobj)
		
		}else if (type=='returnsComp'){
			var returnsobj={ id :id,  period : RS_PERIODS[5].id , ops : OPS_AEB[0].id ,type:type, goodData : true};
			scrData.returnsComp.push(returnsobj);
			 html = getReturnsHtml(returnsobj)
		}else if (type=='returnsRankComp'){
			var returnRankobj={ id :id,  period : RS_PERIODS[5].id , ops : AB_OPS[0].id ,type:type, goodData : true};
			scrData.returnsRankComp.push(returnRankobj);
			 html = getReturnRankHtml(returnRankobj)
		}else if (type=='relPriceStrComp'){
			var rpsobj={ id :id,  idx : RS_BASE_IDX[0].id  ,  period : RS_PERIODS[5].id , ops : AB_OPS[0].id ,type:type, goodData : true};
			scrData.relPriceStrComp.push(rpsobj);
			 html = getRelPriceStrHtml(rpsobj)
		}else if (  jsu.containsString( ['gwthStrComp'   , 'valStrComp'  , 'pftStrComp'  , 'stabStrComp'  ] , type   ) ){

			var list = getFundaList(type) ; 
			var label = getFundaLabel(type) ; 
			var techStrobj={ id :id, strType : list[0].id ,type:type, goodData : true};
			scrData[type].push(techStrobj);
			 html = getFundaStrRow(techStrobj, label)
		
		}else if (  jsu.containsString( ['gwthRankComp'   , 'valRankComp'  , 'pftRankComp'  , 'stabRankComp'  ] , type   ) ){
	
			var label = getFundaLabel(type) ;
			var techRankobj={ id :id,  rankType : LIST_BULL_BEAR[0].id , rankPc : 90 ,type:type, goodData : true};
			scrData[type].push(techRankobj);
			 html = getFundaRankRow(techRankobj, label)
		
		}

		return { html : html , id : id};
	}

	function addFilterChange(type, id){ //MA_PRICE_OPTIONS

		if (type=='techStrComp'){
			tecStrChg(id)
		
		}else if (type=='techRankComp'){
			tecRankChg(id);
					
		}else if (type=='returnsComp'){
			returnsChg(id);

		}else if (type=='returnsRankComp'){
			returnRankChg(id);

		}else if (type=='relPriceStrComp'){
			relPriceStrChg(id);

		}else if (  jsu.containsString( ['gwthStrComp'   , 'valStrComp'  , 'pftStrComp'  , 'stabStrComp'  ] , type   ) ){

			fundaStrChg(id)
		
		}else if (  jsu.containsString( ['gwthRankComp'   , 'valRankComp'  , 'pftRankComp'  , 'stabRankComp'  ] , type   ) ){
			fundaRankChg(id);
			
		
		}

		csu.dsf();
	}



	/********************************************
		Tech Strength
	*********************************************/


	function getTecStrHtml(techStrobj){
		var tds = getTecStrHtmlTds(techStrobj);
		var html = '<tr id='+techStrobj.id+'>'
			 + createTd( createDiv(techStrobj.id+'Td1Div', tds.td1, null)  , CS_LABEL_WIDTH) 
			 + createTd(createDiv(techStrobj.id+'Td2Div', tds.td2, null)) +'</tr>';
			 return html;
	}

	function getTecStrHtmlTds(techStrobj){
		var id = techStrobj.id;
		var func = 'csstr.tsc';
		var td1 = " Technical Strength";
		var html = ' '
		html+=  getDropDown(LIST_TEC_STR, id+'strType', null,func, id, techStrobj.strType);
		html+= SP_3 + 'Stocks on  '

		html+= getDropDown(mtgv.mtpp.FREQ_SCR_MAP, id+'tick', null,func, id, techStrobj.tick);
		html += '  Tick';

		var param = techStrobj.type + ':'+id; // Vol Compare
		html+= SP_3 + csh.delIcon(param) ;
		return  {td1 : td1, td2 : html };
	}

	function tecStrChg(id){
		csu.setProp(mtgv.cs.screenerData.techStrComp, ['tick','strType'],id);
		csu.dsf();
	}

	/********************************************
		Tech Rank
	*********************************************/


	function getTecRankHtml(techRankobj){
		var tds = getTecRankHtmlTds(techRankobj);
		var html = '<tr id='+techRankobj.id+'>'
			 + createTd( createDiv(techRankobj.id+'Td1Div', tds.td1, null)  , CS_LABEL_WIDTH) 
			 + createTd(createDiv(techRankobj.id+'Td2Div', tds.td2, null)) +'</tr>';
			 return html;
	}


	function getTecRankHtmlTds(techRankobj){
		var id = techRankobj.id;
		var func = 'csstr.trc';
		var td1 = " Tech Rank ";
		var html = ' More '
		html+=  getDropDown(LIST_BULL_BEAR, id+'rankType', null,func, id, techRankobj.rankType);
		html+= SP_3 + ' Than  '

		html+= SP_3 + getInputTxtParam( id +'rankPc' , 3, techRankobj.rankPc, func, id ) + htmlU.getSpan(' (value - 1 to 99) ', 'grey', 8) ;

		html+= ' % of Stocks  on  '
		html+= getDropDown(mtgv.mtpp.FREQ_SCR_MAP, id+'tick', null,func, id, techRankobj.tick);
		html += '  Tick';

		var param = techRankobj.type + ':'+id; // Vol Compare
		html+= SP_3 + csh.delIcon(param) ;
		return  {td1 : td1, td2 : html };
	}


	function tecRankChg(id){

		var obj = jsu.getObjFrmArr(mtgv.cs.screenerData.techRankComp, id);

		var pc = htmlU.getInputVal(id +'rankPc' )
		if(jsu.isIntegerInput(id +'rankPc') && jsu.inputNumberRange ( id +'rankPc', 1,99) ){
				// good Numbber.... Do not Remove ... Kept For marking border of Text box...
				// return;
		}

		csu.setProp(mtgv.cs.screenerData.techRankComp, ['tick','rankType', 'rankPc'],id);
		csu.dsf();
	
	}





/********************************************
		Generic Funda
*********************************************/

	function getFundaStrHtml(){
		var scrData = mtgv.cs.screenerData;
		var html = '';
		html+= getFundaHtml(scrData.gwthStrComp , 'TSR Growth Index' );
		html+= getFundaRankHtml(scrData.gwthRankComp , 'TSR Growth Rank' );

		html+= getFundaHtml(scrData.valStrComp , 'TSR Value Index' );
		html+= getFundaRankHtml(scrData.valRankComp , 'TSR Value Rank' );


		html+= getFundaHtml(scrData.pftStrComp , 'TSR Profitability Index' );
		html+= getFundaRankHtml(scrData.pftRankComp , 'TSR Profitability Rank' );

		html+= getFundaHtml(scrData.stabStrComp , 'TSR Stablility Index' );
		html+= getFundaRankHtml(scrData.stabRankComp , 'TSR Stablility Rank' );

		return html;

	}

	function getFundaHtml (strComp, label){
		var html ='';
		for(var i=0;i<strComp.length;i++){
			html+=getFundaStrRow(strComp[i], label);
		}	
		return html;
	}


	function getFundaStrRow(strobj, label){
		var tds = getFundaStrHtmlTds(strobj);
		var html = '<tr id='+strobj.id+'>'
			 + createTd( createDiv(strobj.id+'Td1Div',label, null)  , CS_LABEL_WIDTH) 
			 + createTd(createDiv(strobj.id+'Td2Div', tds.td2, null)) +'</tr>';
			 return html;
	}


	function getFundaStrHtmlTds(strComp){
		var id = strComp.id;
		var func = 'csstr.fsc';
		var td1 = " Technical Strength";
		var html = ' '

		var list = getFundaList(strComp.type);

		html+=  getDropDown(list, id+'strType', null,func, id, strComp.strType);
		

		var param = strComp.type + ':'+id; // Vol Compare
		html+= SP_3 + csh.delIcon(param) ;
		return  {td1 : td1, td2 : html };
	}


	function fundaStrChg(id){
		csu.setProp( getFundaObjListById(id) , ['strType'],id);
		csu.dsf();
	}


	// funda Rank HTML
	function getFundaRankHtml (strComp, label){
		var html ='';
		for(var i=0;i<strComp.length;i++){
			html+=getFundaRankRow(strComp[i], label);
		}	
		return html;
	}

	function getFundaRankRow(strobj, label){
		var tds = getFundaRankHtmlTds(strobj);
		var html = '<tr id='+strobj.id+'>'
			 + createTd( createDiv(strobj.id+'Td1Div',label, null)  , CS_LABEL_WIDTH) 
			 + createTd(createDiv(strobj.id+'Td2Div', tds.td2, null)) +'</tr>';
			 return html;
	}



	function getFundaRankHtmlTds(rankObj){
		var id = rankObj.id;
		var func = 'csstr.frc';
		var td1 = "  ";
		var html = ' More  '


		html+=   getDropDown(LIST_BULL_BEAR, id+'rankType', null,func, id, rankObj.rankType);
		html+= SP_3 + ' Than  '

		html+= SP_3 + getInputTxtParam( id +'rankPc' , 3, rankObj.rankPc, func, id ) + htmlU.getSpan(' (value - 1 to 99) ', 'grey', 8) ;

		html+= ' % of Stocks  '
		// html+= getDropDown(mtgv.mtpp.FREQ_SCR_MAP, id+'tick', null,func, id, rankObj.tick);
		// html += '  Tick';

		var param = rankObj.type + ':'+id; // Vol Compare
		html+= SP_3 + csh.delIcon(param) ;
		return  {td1 : td1, td2 : html };
	}


	function fundaRankChg(id){

		var objList = getFundaObjListById(id);
		// var objList = jsu.getObjFrmArr(objList, id);

		var pc = htmlU.getInputVal(id +'rankPc' )
		if(jsu.isIntegerInput(id +'rankPc') && jsu.inputNumberRange ( id +'rankPc', 1,99) ){
				// good Numbber.... Do not Remove ... Kept For marking border of Text box...
				// return;
		}



		csu.setProp(objList, ['tick','rankType', 'rankPc'],id);
		csu.dsf();
	
	}



	function getFundaList(type){

		if(type ==  'gwthStrComp'   || type == 'gwthRankComp' ){
			return LIST_GWH_STR;
		}else if(type ==  'pftStrComp'   || type == 'pftRankComp' ){
			return LIST_PFT_STR;
		}else if(type ==  'valStrComp'   || type == 'valRankComp' ){
			return LIST_VAL_STR;
		}else if(type ==  'stabStrComp'   || type == 'stabRankComp' ){
			return LIST_STAB_STR;
		}

	}


	function getFundaLabel(type){

		if(type ==  'gwthStrComp'    ){
			return 'TSR Growth Index';
		}else if(type ==  'pftStrComp'   ){
			return 'TSR Profitability Index';
		}else if(type ==  'valStrComp'    ){
			return 'TSR Value Index';
		}else if(type ==  'stabStrComp'    ){
			return 'TSR Stability Index';
		}else if( type == 'gwthRankComp' ){
			return 'TSR Growth Rank';
		}else if( type == 'pftRankComp' ){
			return 'TSR Profitability Rank';
		}else if( type == 'valRankComp' ){
			return 'TSR Value Rank';
		}else if( type == 'stabRankComp' ){
			return 'TSR Stability Rank';
		}

	}


	function getFundaObjListById(id){

		var scrData = mtgv.cs.screenerData;
		var type ='';
		if(  jsu.startsWith( id, 'gwthStrComp' )   ){
			type = 'gwthStrComp';
		}else if(  jsu.startsWith( id,  'pftStrComp' )   ){
			type = 'pftStrComp';
		}else if(  jsu.startsWith( id,  'valStrComp' )   ){
			type = 'valStrComp';
		}else if(  jsu.startsWith( id,  'stabStrComp' )   ){
			type = 'stabStrComp';
		}else if(  jsu.startsWith( id,  'gwthRankComp' )   ){
			type = 'gwthRankComp';
		}else if(  jsu.startsWith( id,  'pftRankComp' )   ){
			type = 'pftRankComp';
		}else if(  jsu.startsWith( id,  'valRankComp' )   ){
			type = 'valRankComp';
		}else if(  jsu.startsWith( id,  'stabRankComp' )   ){
			type = 'stabRankComp';
		}
		return scrData[type];

	}



	/********************************************
		Returns
	*********************************************/

	function getReturnsHtml(returnsobj){
		var tds = getReturnsHtmlTds(returnsobj);
		var html = '<tr id='+returnsobj.id+'>'
			 + createTd( createDiv(returnsobj.id+'Td1Div', tds.td1, null)  , CS_LABEL_WIDTH) 
			 + createTd(createDiv(returnsobj.id+'Td2Div', tds.td2, null)) +'</tr>';
			 return html;
	}

	function getReturnsHtmlTds(returnsobj){
		var id = returnsobj.id;
		var func = 'csstr.src'; // Stock returns Change
		var td1 = " Stock Returns  ";
		var html = ''
		html+=  getDropDown(RS_PERIODS, id+'period', null,func, id, returnsobj.period);
		html+= SP_3 + " returns ";

		html+= SP_3 + getDropDown(OPS_AEB, id+'ops', null,func, id, returnsobj.ops); //' Than  '  //OPS_AEB

		html+= SP_3 + getInputTxtParam( id +'v1' , 3, returnsobj.v1, func, id ) 

		if( returnsobj.ops ==  CS_BETWEEN){
				html+= SP_3 + " and ";
				html+= SP_3 + getInputTxtParam( id+'v2' , 3, returnsobj.v2, func , id)	;	
		}

		html+= htmlU.getSpan(' (in %) ', 'grey', 8) ;

		var param = returnsobj.type + ':'+id; // Vol Compare
		html+= SP_3 + csh.delIcon(param) ;
		return  {td1 : td1, td2 : html };
	}

	function returnsChg(id){  // src -- Stock returns Change

		var returnsobj = jsu.getObjFrmArr(mtgv.cs.screenerData.returnsComp, id);

		csu.setProp(mtgv.cs.screenerData.returnsComp, ['period', 'ops','v1', 'v2'],id);

		var td = getReturnsHtmlTds( returnsobj);

		htmlU.addMsgToDiv( returnsobj.id+'Td2Div', true, td.td2);

		// var pc = htmlU.getInputVal(id +'v1' )
		if(jsu.isIntegerInput(id +'v1') && jsu.isPositiveIntegerInput ( id +'v1', 1,99) ){
				// good Numbber.... Do not Remove ... Kept For marking border of Text box...
				// return;
		}

		if( returnsobj.ops ==  CS_BETWEEN && !isPositiveIntegerInput(id+'v2' ,  1,99  )) {
		}

		csu.setProp(mtgv.cs.screenerData.returnsComp, ['period', 'ops','v1', 'v2'],id);
		csu.dsf();

	}

	/********************************************
		Returns Rank
	*********************************************/

	function getReturnRankHtml(returnRankobj){
		var tds = getReturnRankHtmlTds(returnRankobj);
		var html = '<tr id='+returnRankobj.id+'>'
			 + createTd( createDiv(returnRankobj.id+'Td1Div', tds.td1, null)  , CS_LABEL_WIDTH) 
			 + createTd(createDiv(returnRankobj.id+'Td2Div', tds.td2, null)) +'</tr>';
			 return html;
	}


	function getReturnRankHtmlTds(returnRankobj){
		var id = returnRankobj.id;
		var func = 'csstr.rrc';
		var td1 = " Returns  Rank ";
		var html = ''
		html+=  getDropDown(RS_PERIODS, id+'period', null,func, id, returnRankobj.period);
		html+= SP_3 + ' Returns  '

		html+= SP_3 +getDropDown(AB_OPS, id+'ops', null,func, id, returnRankobj.ops);

		html+= SP_3 + getInputTxtParam( id +'v1' , 3, returnRankobj.v1, func, id ) + htmlU.getSpan(' (value - 1 to 99) ', 'grey', 8) ;

		html+= ' % of Stocks   '

		var param = returnRankobj.type + ':'+id; // Vol Compare
		html+= SP_3 + csh.delIcon(param) ;
		return  {td1 : td1, td2 : html };
	}


	function returnRankChg(id){ // rrc

		var obj = jsu.getObjFrmArr(mtgv.cs.screenerData.returnsRankComp, id);

		var pc = htmlU.getInputVal(id +'v1' )
		if(jsu.isIntegerInput(id +'v1') && jsu.inputNumberRange ( id +'v1', 1,99) ){
				// good Numbber.... Do not Remove ... Kept For marking border of Text box...
				// return;
		}
		csu.setProp(mtgv.cs.screenerData.returnsRankComp, ['period','ops', 'v1'],id);
		csu.dsf();
	
	}

/********************************************
		Relative Price Strength
	*********************************************/

	function getRelPriceStrHtml(rpsobj){
		var tds = getRelPriceStrHtmlTds(rpsobj);
		var html = '<tr id='+rpsobj.id+'>'
			 + createTd( createDiv(rpsobj.id+'Td1Div', tds.td1, null)  , CS_LABEL_WIDTH) 
			 + createTd(createDiv(rpsobj.id+'Td2Div', tds.td2, null)) +'</tr>';
			 return html;
	}

	function getRelPriceStrHtmlTds(rpsobj){
		var id = rpsobj.id;
		var func = 'csstr.rpsc'; // relPriceStrChg
		var td1 = "Relative Price Strength  ";
		var html = ''

		html+=  getDropDown(RS_PERIODS, id+'period', null,func, id, rpsobj.period);
		html+= SP_3 + htmlU.getSpan('Relative Strength wrt', 'grey' , 10);
		

		html+= SP_3 + getDropDown(RS_BASE_IDX, id+'idx', null,func, id, rpsobj.idx);
		html+= SP_3 + "	";

		html+= SP_3 + getDropDown(AB_OPS, id+'ops', null,func, id, rpsobj.ops); //' Than  '  //OPS_AEB

		html+= SP_3 + getInputTxtParam( id +'v1' , 3, rpsobj.v1, func, id ) 
		html+= SP_3 +" %"

		var param = rpsobj.type + ':'+id; // Vol Compare
		html+= SP_3 + csh.delIcon(param) ;
		return  {td1 : td1, td2 : html };
	}

	function relPriceStrChg(id){  // rpsc

		var rpsobj = jsu.getObjFrmArr(mtgv.cs.screenerData.relPriceStrComp, id);

		csu.setProp(mtgv.cs.screenerData.relPriceStrComp, ['period', 'idx', 'ops','v1'],id);

		var td = getRelPriceStrHtmlTds( rpsobj);

		htmlU.addMsgToDiv( rpsobj.id+'Td2Div', true, td.td2);

		// var pc = htmlU.getInputVal(id +'v1' )
		if(jsu.isNumber(id +'v1') && jsu.isNumber ( id +'v1', 1,99) ){
				// good Numbber.... Do not Remove ... Kept For marking border of Text box...
				// return;
		}

		csu.setProp(mtgv.cs.screenerData.relPriceStrComp, ['period', 'idx', 'ops','v1'],id);
		csu.dsf();

	}

	

	function validateStr(validResults){

		var scrData = mtgv.cs.screenerData;

		for ( var i=0;i< scrData.techStrComp.length ;i++){
			var obj = scrData.techStrComp[i];
			obj.csType = STR_CS;
			var tick = getObjFrmArr( FREQ_SCR_MAP,  obj.tick); 
			var strType = getObjFrmArr( LIST_TEC_STR, obj.strType);
			var text = strType.label + ' Stocks at ' + tick.label + ' Tick' ;
			// validResults.validFields+= getSpan(text, 'green', CS_SEL_FONT_SIZE) + '<br/>';
			// validResults.validFieldCount++;

			var selParam = obj.type + ':'+obj.id; // Vol Compare
			csh.cdt(obj,text, validResults, selParam, true);
		}

		for ( var i=0;i< scrData.techRankComp.length ;i++){
			var obj = scrData.techRankComp[i];
			obj.csType = STR_CS;
			var tick = getObjFrmArr( FREQ_SCR_MAP,  obj.tick); 
			var rankType = getObjFrmArr( LIST_BULL_BEAR, obj.rankType);
			var pc = obj.rankPc;

			var text = '';

			if(jsu.isNotNull( pc)) pc = Number(pc);

			if(jsu.isInteger(pc) && (pc >=1 && pc <= 99)){
				text = 'Tech Strength ' + rankType.label + ' Than ' + pc +'% Stocks at ' + tick.label + ' Tick' ;

				var selParam = obj.type + ':'+obj.id; // Vol Compare

				csh.cdt(obj,text, validResults, selParam, true);
			}else{
				// text = 'More ' +  rankType.label + ' Than ' + pc +'% Stocks at ' + tick.label + ' Tick' ;

				var selParam = obj.type + ':'+obj.id; // Vol Compare

				csh.cdt(obj,  "Invalid value for Tech Rank Comparision", validResults, selParam, false);
			}
		}

		for ( var i=0;i< scrData.returnsComp.length ;i++){
			var obj = scrData.returnsComp[i];
			obj.csType = STR_CS;
			var period = getObjFrmArr( RS_PERIODS,  obj.period); 
			var ops = getObjFrmArr( OPS_AEB, obj.ops);

			var v1 = obj.v1;
			var v2 = obj.v2;

			var text = period.label;
			var goodData = true;

			if(jsu.isNotNull( v1)) v1 = Number(v1);

			if(jsu.isNumber(v1) && (v1 >0)){

				if(ops ==CS_BETWEEN){
					if( jsu.isNull(v2) || !isNumber(v2)){
						goodData = false;
					}else{
						text += ' Returns between ' + v1 +  +' and ' + v2+  '%';	
					}
				}else{
					text += ' Returns ' + ops.label + ' ' + v1 +'%';
				}
				var selParam = obj.type + ':'+obj.id; // Vol Compare

				csh.cdt(obj,text, validResults, selParam, true);

			}else{
				goodData = false;
			}

			if(!goodData){
				var selParam = obj.type + ':'+obj.id; // Vol Compare

				csh.cdt(obj,  "Invalid value for Stock returns", validResults, selParam, false);
			}
		}

		for ( var i=0;i< scrData.returnsRankComp.length ;i++){
			var obj = scrData.returnsRankComp[i];
			obj.csType = STR_CS;
			var period = getObjFrmArr( RS_PERIODS,  obj.period); 

			var ops = getObjFrmArr( AB_OPS, obj.ops);

			var pc = obj.v1;

			var text = '';

			if(jsu.isNotNull( pc)) pc = Number(pc);

			if(jsu.isInteger(pc) && (pc >=1 && pc <= 99)){
				text =  period.label + ' returns '  +  ops.label +  ' ' + pc +'% of Stocks  ';

				var selParam = obj.type + ':'+obj.id; // Vol Compare

				csh.cdt(obj,text, validResults, selParam, true);
			}else{
				// text = 'More ' +  rankType.label + ' Than ' + pc +'% Stocks at ' + tick.label + ' Tick' ;

				var selParam = obj.type + ':'+obj.id; // Vol Compare

				csh.cdt(obj,  "Invalid value for Returns Rank Comparision", validResults, selParam, false);
			}
		}

		for ( var i=0;i< scrData.relPriceStrComp.length ;i++){
			var obj = scrData.relPriceStrComp[i];
			obj.csType = STR_CS;

			var idx = getObjFrmArr( RS_BASE_IDX,  obj.idx); 

			var period = getObjFrmArr( RS_PERIODS,  obj.period); 

			var ops = getObjFrmArr( AB_OPS, obj.ops);

			var v1 = obj.v1;

			var text = '';

			if(jsu.isNotNull( v1)) v1 = Number(v1);

			if(jsu.isNumber(v1) ){
				text =  period.label + ' returns compared to '+ idx.label + ' returns ' + ops.label + ' ' + v1 +'%';

				var selParam = obj.type + ':'+obj.id; // Vol Compare

				csh.cdt(obj,text, validResults, selParam, true);
			}else{
				// text = 'More ' +  rankType.label + ' Than ' + pc +'% Stocks at ' + tick.label + ' Tick' ;

				var selParam = obj.type + ':'+obj.id; // Vol Compare

				csh.cdt(obj,  "Invalid value for Relative Price Strength", validResults, selParam, false);
			}
		}


		validateFundaStr(validResults , 'gwthStrComp');
		validateFundaRank(validResults ,  'gwthRankComp'  , 'TSR Growth Rank');

		validateFundaStr(validResults , 'valStrComp');
		validateFundaRank(validResults , 'valRankComp'   , 'TSR Value Rank');

		validateFundaStr(validResults , 'pftStrComp');
		validateFundaRank(validResults , 'pftRankComp'   , 'TSR Profit Rank');

		validateFundaStr(validResults , 'stabStrComp');
		validateFundaRank(validResults , 'stabRankComp'   , 'TSR Stability Rank');
		

	}

	function validateFundaStr(validResults , type){

		var objList = mtgv.cs.screenerData[type];
		var list = getFundaList(type);

		for ( var i=0;i< objList.length ;i++){
			var obj = objList[i];
			obj.csType = STR_CS;
			var strType = getObjFrmArr( list, obj.strType);
			var text = strType.label ;
			var selParam = obj.type + ':'+obj.id; // Vol Compare
			csh.cdt(obj,text, validResults, selParam, true);
		}
	}


	function validateFundaRank(validResults ,type, label){

		var objList = mtgv.cs.screenerData[type];

		for ( var i=0;i< objList.length ;i++){
			var obj = objList[i];
			obj.csType = STR_CS;
			
			var rankType = getObjFrmArr( LIST_BULL_BEAR, obj.rankType);
			var pc = obj.rankPc;

			var text = label;

			var rankLabel = getFundaLabel(type);

			if(jsu.isNotNull( pc)) pc = Number(pc);

			if(jsu.isInteger(pc) && (pc >=1 && pc <= 99)){
				text =  rankLabel +' - ' +  rankType.label + ' Than ' + pc +'% Stocks ' ;

				var selParam = obj.type + ':'+obj.id; // Vol Compare

				csh.cdt(obj,text, validResults, selParam, true);
			}else{
				// text = 'More ' +  rankType.label + ' Than ' + pc +'% Stocks at ' + tick.label + ' Tick' ;

				var selParam = obj.type + ':'+obj.id; // Vol Compare

				csh.cdt(obj,  "Invalid value for "+label+" Rank Comparision", validResults, selParam, false);
			}
		}
	}


	function getCustScrFilter(filer){
		// var filer = [];
		
		filer.push({  id :  "techStrComp" , label : 'Technical Strength'    , tab : STR_CS, 
			type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addStr' , params:  'techStrComp' } , subDef :LIST_TEC_STR }) ;  //   JavaScript:cscmn.atn('price','priceCs');


		filer.push({  id :  "techRankComp" , label : 'Technical Rank'    , tab : STR_CS, 
			type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addStr' , params:  'techStrComp' }  }) ;  //   JavaScript:cscmn.atn('price','priceCs');


		filer.push({  id :  "returnsComp" , label : 'Stock Returns'    , tab : STR_CS, 
				type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addStr' , params:  'techStrComp' } , subDef : RS_PERIODS  }) ;

		if(jsu.isMigContext()){

			// filer.push({  id :  "returnsRankComp" , label : 'Technical Rank'    , tab : STR_CS, 
			// 	type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addStr' , params:  'techStrComp' }  }) ;  //   JavaScript:cscmn.atn('price','priceCs');

			filer.push({  id :  "relPriceStrComp" , label : 'Relative Price Strength'    , tab : STR_CS, 
				type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addStr' , params:  'relPriceStrComp' }  }) ;  //   JavaScript:cscmn.atn('price','priceCs');

			// filer.push({  id :  "relStrComp" , label : 'Technical Rank'    , tab : STR_CS, 
			// 	type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addStr' , params:  'techStrComp' }  }) ;  //   JavaScript:cscmn.atn('price','priceCs');

		}


		filer.push({  id :  "gwthStrComp" , label : 'Growh Rank'    , tab : STR_CS, 
				type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addStr' , params:  'gwthStrComp' }   }) ;

		filer.push({  id :  "gwthRankComp" , label : 'Growh Index'    , tab : STR_CS, 
				type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addStr' , params:  'gwthRankComp' }    }) ;


		filer.push({  id :  "pftStrComp" , label : 'Profitability Index'    , tab : STR_CS, 
				type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addStr' , params:  'pftStrComp' }   }) ;

		filer.push({  id :  "pftRankComp" , label : 'Profitability Rank'    , tab : STR_CS, 
				type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addStr' , params:  'pftRankComp' }   }) ;


		filer.push({  id :  "valStrComp" , label : 'Valuation Index'    , tab : STR_CS, 
				type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addStr' , params:  'valStrComp' }   }) ;

		filer.push({  id :  "valRankComp" , label : 'Valuation Rank'    , tab : STR_CS, 
				type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addStr' , params:  'valRankComp' }   }) ;


		filer.push({  id :  "stabStrComp" , label : 'Stability Index'    , tab : STR_CS, 
				type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addStr' , params:  'stabStrComp' }   }) ;

		filer.push({  id :  "stabRankComp" , label : 'Stability Rank'    , tab : STR_CS, 
				type : 'btn'  , filtDef : {obj:thisObject, fnc: 'addStr' , params:  'stabRankComp' }   }) ;


		return filer ;
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

		

	}


	return {


		// New Starts 

		gar : getAllRows,

		gfr : getFormRow,

		anf : addNewFilter,

		afc : addFilterChange,

		pfr : paintFilterRow,

		// New Ends

		
		strht :  getStrengthtml,
		tsc : tecStrChg,	
		trc : tecRankChg ,
		src : returnsChg,
		rrc : returnRankChg,
		rpsc : relPriceStrChg,
		// rsc  : relStrChg,
		fsc : fundaStrChg,
		frc : fundaRankChg,

		addStr : addStr	,



		vstr : validateStr,

		gcsf : getCustScrFilter
	}


})(); // module 			  