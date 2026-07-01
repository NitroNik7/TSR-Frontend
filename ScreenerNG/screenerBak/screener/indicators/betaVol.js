var AVG_PRICE_RANGE = pdef.avgPriceRange;
	var BETA_PERIOD = pdef.betaPeriod;


var csbv =  (function () {			


	var thisObject = 'csbv';

	var htmlU = mintHtmlUtil;
	// var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;

	


	function getBetaVolHtml(id){
		var scrData = mtgv.cs.screenerData;
		var html ='';
		var html ='<br/><div id="'+id+'Div">';
		html+= '<table id="bvCtrlTab" class="'+INDI_TABLE_STYLE+' "  >';


		html+= '</table>';

		html+= getControls();


		html+='<div '+CS_HELP_DIV_STYLE +'>';  


		var  helpText = "Currently Both Price range and beta is Calculated Every Day at the end of day.  "
			+" We are working to work on intraday Values soon."

			// +"<br/> Standard Deviation is Coming soon "
		
			+"<br/> Price Range is a Volatility Indicator "
			+"where  extreme price(High/low) of the period is averaged to give sense of price movement in that duration. "
			+"<br/>Beta is Calculated Using NIFTY as index. "
			+"We provide beta for multiple time frames to cater for different type of trader needs "
			+" Custom Beta (Including custom index) Coming soon. "
			+" Please share ideas so that we can incorporate  to meet your requirements also"
			;
		
		if(!isMobile()){	

			html+=  getSpan(helpText,  'grey', 10);

		}	
		// html+= BR_2 + getSpan(ohlcComp,  'grey', 10);

		html+='</div>';
		
		html+='</div>';
		html+='<br/>';
		return html;
	}


	function getAllRows(){
		var scrData = mtgv.cs.screenerData;
		let html =''
		for(var i=0;i< scrData.prComp.length;i++){
			html+= csh.opsCompRow(scrData.prComp[i]) ;
		}	
		for(var i=0;i< scrData.betaComp.length;i++){	
			html+= csh.opsCompRow(scrData.betaComp[i]) ;
		}

			return html;

	}


	function getFormRow(type, id){ //MA_PRICE_OPTIONS


		if(type == 'prc'){
			return csu.ocn('prc').html;
		}else if( type == 'beta'){
			return csu.ocn('beta').html;
		}



	}


	function getControls(){

		let html= ''
		html+= SP_3 + getButtonP('Add Price Range' , 'csu.opsCompare','prc');
		html+= SP_3 + getButtonP('Add Beta' , 'csu.opsCompare','beta');



		return html;
	}


	function addBetaVol(type){ //MA_PRICE_OPTIONS

		let json = addNewFilter(type);

		$('#bvCtrlTab').append(json.html );

		addFilterChange(type , json.id);
	}

	function addNewFilter(type){

		if(type == 'prc'){
			return csu.ocn('prc');
		}else if( type == 'beta'){
			return csu.ocn('beta');
		}
	}

	function addFilterChange(type, id){ 

		if(type == 'prc'){
			 csu.listOpCompChg(id , type);
		}else if( type == 'beta'){
			 csu.listOpCompChg(id , type);
		}

		csu.dsf(); // displaySelectedFields();
	}


	function getCustScrFilter(filer, defFilter){
		if(!jsu.isMigContext()){
					// BETA   onclick="JavaScript:csu.opsCompare('prc');"

			filer.push({  id :  "prComp" , label : 'Price Range'    , tab : BV_CS, 
				type : 'btn'  , filtDef : {obj:'csu', fnc: 'opsCompare' , params:  'prc' } , subDef :AVG_PRICE_RANGE }) ;  //   JavaScript:cscmn.atn('price','priceCs');
			//onclick="JavaScript:csu.opsCompare('beta');"

			filer.push({  id :  "betaComp" , label : 'Beta '  ,  tab : BV_CS, 
				type : 'btn'  , filtDef : {obj:'csu', fnc: 'opsCompare' , params:  'beta' } , subDef : BETA_PERIOD }) ;  //   JavaScript:cscmn.atn('price','priceCs');

		}

		if (!jsu.isMigContext()) {

					defFilter.push({  id :  "prComp" , label : 'Price Range'    , tab : BV_CS, 
						type : 'btn'  , filtDef : {obj:'csu', fnc: 'opsCompare' , params:  'prc' } , subDef :AVG_PRICE_RANGE });
		}

	}

	function ngSearch(item, filterDef, params ){


		let id = ''

		let type = item.id

		if(type =='prComp'){ // add new Intraday
    	    id = 'hls'
		}else if(type=='betaComp'){
    	    id = 'anhl'
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
		paintFilterRow(item.id);
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

		anf : addNewFilter,

		afc : addFilterChange,

		pfr : paintFilterRow,

		ngs : ngSearch,
		// New Ends

		bvh : getBetaVolHtml,

	}


})(); // module 	