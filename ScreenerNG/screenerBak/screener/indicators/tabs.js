


// -- Daily Tech
// var PRICE_VOL 		= 	'pvCs';


var daily_tabs = [
				
				{id: PRICE_CS, label:'PriceAction',  tabObj : 'csp',   tab:  'priceCtrlTab',  map : PRICE_AEBB_MAP  , ANALYSIS_CAT : ANALYSIS_CAT_COMMON , mig: true} , // Price  Custom Screener Div
				{id: VOL_CS, label:'Volume', tabObj : 'csv', tab:  'volCtrlTab',  map : VOL_AEBB_MAP , ANALYSIS_CAT : ANALYSIS_CAT_COMMON  , mig: true} , //  Volume Custom Screener Div
				{id: HL_CS, label:'High/Low', tabObj : 'cshl', tab : 'hlCtrlTab', map : null , ANALYSIS_CAT : ANALYSIS_CAT_COMMON , mig: true } , //  Volume Custom Screener Div
				{id: BV_CS, label:'Beta/Vols', tabObj : '',tab : 'bvCtrlTab', map : null , ANALYSIS_CAT : ANALYSIS_CAT_COMMON } , //  Volume Custom Screener Div

				{id: PP_CS, label :'Pivot/Fib',tabObj : 'cspp', tab : 'ppCtrlTab', map : null , ANALYSIS_CAT : ANALYSIS_CAT_TECH  , mig: true} ,
				
				{id: STR_CS, label :'Strength',tabObj : 'csstr', tab : 'strCtrlTab', map : null , ANALYSIS_CAT : ANALYSIS_CAT_COMMON , mig: true } , //Tech Strength.....

				{id: MA_CS, label:'Mov Avg',  tabObj : 'csma', map:null , ANALYSIS_CAT : ANALYSIS_CAT_TECH , mig: true} ,
				{id: TI_CS, label:'Technicals',  tabObj : 'cst', map:null , ANALYSIS_CAT : ANALYSIS_CAT_TECH , mig: true} ,
				{id: DIV_CS, label:'Divergence',tabObj : 'csd', map:null , ANALYSIS_CAT : ANALYSIS_CAT_TECH , mig: true} ,

				{id: CP_CS, label:'Chart Patterns',tabObj : 'cscp', map:null , ANALYSIS_CAT : ANALYSIS_CAT_TECH, mig: true} ,

				 // <i class="fas fa-crown"></i>
				{id: FIN_RAT_NG, label:'Fin Ratio ', tabObj : 'csFrNg',  tab : 'finRatNgTab',  map:null , ANALYSIS_CAT : ANALYSIS_CAT_FUNDA , mig: true } ,

				{id: FIN_STMT_NG, label:'Fin Stmt', tabObj : 'csStmtNg',  tab : 'finStmtNgTab',  map:null , ANALYSIS_CAT : ANALYSIS_CAT_FUNDA , mig: true } ,


				// {id: FIN_HLR, label :'Fin Ratios (Old)', tab : 'hlrCtrlTab', map : null  , ANALYSIS_CAT : ANALYSIS_CAT_FUNDA },
				// {id: FIN_YR, label :'Fin Stmt (Old)', tab : 'finYCtrlTab', map : null , ANALYSIS_CAT : ANALYSIS_CAT_FUNDA},

				// {id: FIN_BASIC, label:'FinBasic', map:FIN_BASIC_AEBB_FIELDS} ,
				// {id: FIN_RATIO, label:'FinRatios', map : FIN_RATIO_AEBB_FIELDS} ,


				// {id: FIN_BAL_SHEET, label:'Bal Sheet', map:BAL_SHEET_AEBB_FIELDS} ,
				// {id: FIN_CASH_FLOW, label:'CashFlow', map:CASHFLOW_AEBB_FIELDS} ,

				// {id: FIN_INCOME, label:'Income', map: INCOME_AEBB_FIELDS} ,
				// {id: FIN_QTRLY, label:'Qtr Inc', map: QTRLY_AEBB_FIELDS} ,

				// {id: FIN_QTRLY, label:'Quarterly', map : QTRLY_AEBB_FIELDS} ,
		];	



		csTabDataDefNg.enrich();


		function getCsTabs(){

			var list = [];

			for(var i=0;i< daily_tabs.length;i++ ){

				var  tab = daily_tabs[i];


				if(mintJsUtil.arrayContains(mtgv.mtpp.analCat , tab.ANALYSIS_CAT)){

					if(mintJsUtil.isMigContext() &&  !tab.mig){
						continue;
					}

					list.push(tab);
				}


			}


			return list;




		}

    function showCSTab(id){

		for(var i=0;i<daily_tabs.length;i++){
		 	var tab = daily_tabs[i];

		 	if(tab.id == id){
		 		$('#'+tab.id).addClass('active');
		 	}else{
		 		$('#'+tab.id).removeClass('active');
		 	}
		}
	}