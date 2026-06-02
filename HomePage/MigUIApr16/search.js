var miSrch = (function () {  // my Ui Head

		var htmlU = mintHtmlUtil;
		var jsu = mintJsUtil;
		var cjs = mintStkCommon;

		var objName = 'miSrch';

		var SEARCH_SUB_CAT =[
			{id: 'any' , label: "All "},
			{id: 'Screener' , label: "Screener Only"},
			{id: 'BirdsEyeView' , label: "Stock Birds Eye View"},
			{id: 'Candlestick' , label: "Stock Candlestick"},
			{id: 'InteractiveCharts' , label: "Stock Interactive Charts"},
			{id: 'FundamentalAnalysis' , label: "Stock Fundamentals"},
			{id: 'MovingAverage' , label: "Stock Moving Average"},
			{id: 'TechnicalAnalysis' , label: "Stock Technicals"},
			{id: 'PivotPoint' , label: "Stock Pivot Point"},
		];

		var TECH_INDI = [
			{id: 'any' , label: "All Technicals "},
			{id: 'ADX' , label: "ADX"},
			{id: 'AROON' , label: "AROON"},
			{id: 'AwesomeOscillator' , label: "AwesomeOsc"},
			{id: 'BOLLINGER' , label: "Bollinger"},
			{id: 'CCI' , label: "CCI"},
			{id: 'CMF' , label: "CMF"},
			{id: 'KeltnerBand' , label: "KeltnerBand"},
			{id: 'MACD' , label: "MACD"},
			{id: 'MFI' , label: "MFI"},
			{id: 'PSAR' , label: "PSAR"},
			{id: 'RsiSmooth' , label: "RSI"},
			{id: 'ROC' , label: "ROC"},
			{id: 'Supertrend' , label: "Supertrend"},
			{id: 'WilliamsR' , label: "WilliamsR"},
			];

		var FUNDA_INDI = [
				{id: 'any' , label: "All Fundamentals "},
				{id: 'AltmanZScore' , label: "Altman Z"},
				{id: 'CashRatio' , label: "Cash Ratio"},
				{id: 'DebtToEquityRatio' , label: "Debt to Eq Ratio"},

				{id: 'EBITDAMargin' , label: "EBITDA Margin"},
				{id: 'EVToEBITDA' , label: "EV to EBITDA"},

				{id: 'NetProfitMargin' , label: "Net Profit Margin"},
				{id: 'OperatingProfitMargin' , label: "Ops Profit Margin"},
				{id: 'PiotroskiFScore' , label: "Piotroski F Score"},
				{id: 'PriceToEarningRatio' , label: "PE Ratio"},
				{id: 'PriceToBookRatio' , label: "Price To Book"},
				{id: 'PriceToSalesRatio' , label: "Price To Sales"},
				{id: 'QuickRatio' , label: "Quick Ratio"},
				{id: 'ReturnOnEquity' , label: "Return on Equity"},
				{id: 'ReturnOnAsset' , label: "Return On Asset"},
				{id: 'ShareholdersEquityRatio' , label: "Sh Equity Ratio"},
				
				// {id: 'DebtToEBITDA' , label: ""},
				// {id: '' , label: ""},
				// {id: '' , label: ""},

			];


		var searchCore =  '<input id="user_input" type="text" class="form-control ui-autocomplete-input" onblur="if (this.value == \'\') '
              + ' this.value = this.defaultValue;'
              + ' onfocus=" if="" (this.value="=" this.defaultvalue)="" this.value="" ;";="" name="term" placeholder="Search a Stock / Screener" onclick="this.select();" '
              +' style="width:95%;" autocomplete="off">         '

        var ddStyle ='border-radius: 6px; height: 35px;  box-shadow: inset 0px 0px 0px 0px red;'
										+' text-shadow: none; border-color: #C0C0C0; background-color:white;'      

		var showSubCat ;

		function getSearch(showSubCatOpt){

			showSubcat = showSubCatOpt;

			// var search =''
			if(isMobile()){
				return searchCore;
			}
			

			if(showSubcat){

				var searchForm = '<div id="searchFormDiv">';
				searchForm +=   getSearchTable();
				searchForm+= '</div>';
			}else{
					searchForm = searchCore;
			}


			

			return '<div class="card-header border-bottom">' +searchForm  + ' </div>';
		}	


		function getSearchTable(){

				var defPref = localStorage.getItem('SearchPref');

				

				var searchForm = '<table border="0" width="100%">';

				searchForm +='<tr><td>'
				searchForm += searchCore;
				searchForm += '</td><td>'

				if(jsu.isMigContext()){ // Interactive charts not support in MIG
						jsu.removeFromArrayWithId(SEARCH_SUB_CAT, 'InteractiveCharts');
				}



				searchForm += htmlU.getDropDown(SEARCH_SUB_CAT, 'eqSubCat', ddStyle, objName+".sc", 'sc', defPref);

				if(defPref == 'TechnicalAnalysis') {
					searchForm += SP_2+  addTechIndiOpt();
				}else if(defPref == 'FundamentalAnalysis') {
					searchForm += SP_2+  addFundaIndiOpt();
				}

				searchForm += '</td></tr>'
				searchForm += '</table>'

				return searchForm;
		}

		function addTechIndiOpt(){

			var defTechPref = localStorage.getItem('DefTechSearchPref');

			return  htmlU.getDropDown(TECH_INDI, 'eqIndiSubCat', ddStyle, objName+".sc", 'ti', defTechPref);

		}


		function addFundaIndiOpt(){

			var defFundaPref = localStorage.getItem('DefFundaSearchPref');
			return  htmlU.getDropDown(FUNDA_INDI, 'eqIndiSubCat', ddStyle, objName+".sc", 'fi', defFundaPref);

		}


		function registerAutoSelect(){

			var eqSubCat = $('#eqSubCat').val();
			var tiIndiSubCat = $('#eqIndiSubCat').val();




			dynAutocomplete(eqSubCat, tiIndiSubCat);
			/*
					$(function() {
							var eqSubCat = $('#eqSubCat').val();

							if(jsu.isNull(eqSubCat)) eqSubCat = 'any';

							$('#eqSubCat').change(function(){
								eqSubCat = $('#eqSubCat').val();

								if(!jsu.isMigContext()){ // AIO
									localStorage.setItem("SearchPref", eqSubCat);	
								}


								dynAutocomplete(eqSubCat);
							});

							dynAutocomplete(eqSubCat);
					});
			*/   
		}

		function dynAutocomplete(eqSubCat, indiSubCat){

			if(jsu.isNull(eqSubCat)) eqSubCat = 'any';
			if(jsu.isNull(indiSubCat)) indiSubCat = 'any';


			var searchUrl = null;

			if(jsu.isRtContext() || jsu.isMyContext()){
				searchUrl = jsu.getBaseWwwUrl()+'/rt/Search.tsr'
			}else{
				
				// searchUrl = jsu.getBaseWwwUrl()+'/US/ai/Search.aio'
				searchUrl = jsu.getMigUrl()  +'/Search.aio'

			}

				$("#user_input").autocomplete({

              // source: '//' +window.location.host+"/rt/AcForEq.tsr?ex=in&trimJson=trimJson",
    			source : searchUrl + '?eqSubCat='+eqSubCat +'&indi='+ indiSubCat,
    			
    			// autoFocus: true,
    			// delay: 500,

              minLength: 1,
              select: function(event, ui) {
                var url = ui.item.id;

                if (url != '#') {

                	// window.location = link;
                	location.href =  url;
                	this.value = "";
    				return false;
                }
              },

              html: true, 
              open: function(event, ui) {
              $(".ui-autocomplete").css("z-index", 1000);
              // $(".ui-autocomplete").css("min-height", auto);
              }
        });

		}


	function subCatChange(type, subType){

		if(showSubcat){
			var indiSubCat;
			var eqSubCat;
			if(type == 'sc'){
				eqSubCat = $('#eqSubCat').val();
				localStorage.setItem("SearchPref", eqSubCat);	
			}else if(type == 'ti'){
				eqSubCat = 'TechnicalAnalysis';
				indiSubCat = $('#eqIndiSubCat').val();
				localStorage.setItem("DefTechSearchPref", indiSubCat);					
			}else if(type == 'fi'){
				eqSubCat = 'FundamentalAnalysis';
				indiSubCat = $('#eqIndiSubCat').val();
				localStorage.setItem("DefFundaSearchPref", indiSubCat);					
			}
			
			var html = getSearchTable();
			htmlU.addMsgToDiv('searchFormDiv' , true, html)
			dynAutocomplete(eqSubCat , indiSubCat);

		}
	}

	return 	{
				gs : getSearch,
				sc : subCatChange,

				ras : registerAutoSelect
			}

})(); // module 	