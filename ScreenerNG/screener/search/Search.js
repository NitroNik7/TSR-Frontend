

var SRCH_DD ='dd' ;
var SRCH_BTN ='btn' ;

var mintSrch =  (function () {			
	var htmlU = mintHtmlUtil;
	// var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;

	var MAX_SIZE =20;

	var inited;
	var  FILTERS =   [];

	var  DEF_FILTERS =   [];


	var initPrice;



	function init(){

		 csp.gcsf(FILTERS, DEF_FILTERS);
		 csv.gcsf(FILTERS, DEF_FILTERS);
		 cshl.gcsf(FILTERS, DEF_FILTERS);

		 csbv.gcsf(FILTERS, DEF_FILTERS);

		 cspp.gcsf(FILTERS, DEF_FILTERS);
		 csstr.gcsf(FILTERS, DEF_FILTERS);


		 csma.gcsf(FILTERS, DEF_FILTERS);
		 cst.gcsf(FILTERS, DEF_FILTERS);
		 csd.gcsf(FILTERS, DEF_FILTERS);

		 cscp.gcsf(FILTERS, DEF_FILTERS);


		 if(!jsu.isMigContext()){
		 		csFrNg.gcsf(FILTERS, DEF_FILTERS);
		 		csStmtNg.gcsf(FILTERS, DEF_FILTERS);
		 		// csFr.gcsf(FILTERS);	
		 }

		 

		inited = true;
	}

	function getFilter(query){
		if(jsu.isNull(query)){
				return DEF_FILTERS;	
		}else{
				// return FILTERS;
			return filter(query);

		}
		
	}


	// function findFilter(){

	// 	if(!inited) {
	// 		init();
	// 	}


	// }

	function registerAutoSelect(){


		if(!inited) {
			init();
		}

		$("#csAcFilter").autocomplete({

    		// source : getFilters()  ,

    		source : function(request, response){




    			return getFilters(request.term, response);
    		},

            minLength: 1,
              select: function(event, ui) {

                var item = ui.item;

                if (item.id != '#') {
               		// location.href =  url;
               		console.log('selectd : ' + item.label);

               		 // $(this).val('');
               		

               		executeFilter(item);


               		this.value = "";
    				return false;
                }
                // this.value == ''
                // htmlU.setInputVal('csAcFilter','');

              },

              html: true, 
              open: function(event, ui) {
              $(".ui-autocomplete").css("z-index", 1100);
              }

        });

	}


	function executeFilter(item){

			myTsrScreener.showControl(item.tab);
			var filtDef = item.filtDef;

			if(mtgv.cs.ng){

				var params = (filtDef == null) ? null :   filtDef.params.split(PARAM_DELIM);
				let tab = jsu.getObjFrmArr(daily_tabs, item.tab);


				if(isMobile()){
						mcsh.sfb(item.mobFilter);
				}else{
						window[tab.tabObj].ngs(item, filtDef, params );					
				}

			}else{


               		if(jsu.isNull(filtDef.params) ){
               			window[filtDef.obj][filtDef.fnc]();
               		}else  {

               			var params = filtDef.params.split(PARAM_DELIM);

               			if( params.length==0 ) {
               				window[filtDef.obj][filtDef.fnc]();
               			}else if( params.length==1 ) {
               				window[filtDef.obj][filtDef.fnc](params[0] );
               			}else if( params.length==2 ) {
               				window[filtDef.obj][filtDef.fnc](params[0] , params[1] );
               			}else if( params.length==3 ) {
               				window[filtDef.obj][filtDef.fnc](params[0] , params[1]  ,params[2] );
               			}else if( params.length==4 ) {
               				window[filtDef.obj][filtDef.fnc](params[0] , params[1]  ,params[2] , params[3] );
               			}
               		}
      }

	}



	function getFilters(term, response){
		console.log('term ' + term);

		var filters = filter(term);
		

		response($.map(filters, function(item) {	return item;	}));
	}


	function filter(term){

			// var term = htmlU.getInputVal('csAcFilter');
			var filters = [];
		
			var shortlisted = [];

			if(jsu.isNotNull( term)){
				term = term.toUpperCase();

				addFullWord(filters, term, shortlisted);
				addStartsWith(filters, term,shortlisted)
				contains(filters, term,shortlisted)

			}

			if(filters.length ==0){
				filters.push(	{id: "#", label: "No Result Found"} );
			}

			return filters;
	}


	function addFullWord(filters, term, shortlisted){

		for(var i=0;i<FILTERS.length ;i++){

			if(filters.length > MAX_SIZE) break;
			var option = FILTERS[i];

			if( option.label.toUpperCase() === term ){
				// filters.push(option);
				addToShortListed(filters , shortlisted, option)
				continue;
			}

			var slabel = jsu.isNotNull( option.sLabel ) ? option.sLabel : option.slabel;
			
			if( jsu.isNotNull( slabel ) && slabel.toUpperCase() === term){
				// filters.push(option);
				addToShortListed(filters , shortlisted, option)
				continue;
			}

			if( jsu.isNotNull( option.subDef )){

				for(var j=0;j< option.subDef.length ;j++){
					var subOption = option.subDef[j];
					if( subOption.label.toUpperCase() === term ){
						// filters.push(option);
						addToShortListed(filters , shortlisted, option)
						continue;
					}
				}
			}
		}
	}

	function addStartsWith(filters, term, shortlisted){

		for(var i=0;i<FILTERS.length ;i++){
			if(filters.length > MAX_SIZE ) break;
			var option = FILTERS[i];

			if( option.label.toUpperCase().startsWith(term)  ){
				// filters.push(option);
				addToShortListed(filters , shortlisted, option)
				continue;
			}

			var slabel = jsu.isNotNull( option.sLabel ) ? option.sLabel : option.slabel;

			if( jsu.isNotNull( slabel ) && slabel .toUpperCase().startsWith(term)){
				// filters.push(option);
				addToShortListed(filters , shortlisted, option)
				continue;
			}

			if( jsu.isNotNull( option.subDef )){

				for(var j=0;j< option.subDef.length ;j++){
					var subOption = option.subDef[j];
					if( subOption.label .toUpperCase().startsWith(term) ){
						// filters.push(subOption);
						addToShortListed(filters , shortlisted, option)
						continue;
					}
				}
			}
		}
	}


	function contains(filters, term, shortlisted){

		for(var i=0;i<FILTERS.length ;i++){
			if(filters.length > MAX_SIZE ) break;
			var option = FILTERS[i];

			// console.log('option ' + JSON.stringify(  option));

			if( (option.label.toUpperCase()).includes(term)  ){
				// filters.push(option);
				addToShortListed(filters , shortlisted, option)
				continue;
			}

			var slabel = jsu.isNotNull( option.sLabel ) ? option.sLabel : option.slabel;

			if( jsu.isNotNull( slabel ) && (slabel .toUpperCase()).includes(term)){
				// filters.push(option);
				addToShortListed(filters , shortlisted, option)
				continue;
			}

			if( jsu.isNotNull( option.subDef )){

				for(var j=0;j< option.subDef.length ;j++){
					var subOption = option.subDef[j];
					if( (subOption.label .toUpperCase()).includes(term) ){
						// filters.push(option);
						addToShortListed(filters , shortlisted, option)
						continue;
					}
				}
			}
		}
	}


	function addToShortListed(filters , shortlisted, option){


		if(jsu.isNull(option.filtDef)){
			def = option.tab;
		}else{
			 def = option.tab +option.filtDef.obj + option.filtDef.fnc  +option.filtDef.params;
		}

		// var def = option.tab +option.filtDef.obj + option.filtDef.fnc  +option.filtDef.params;




		if(jsu.arrayContains( shortlisted, def)){
			return;
		}

		shortlisted.push( def);
		filters.push(option);
	}


	function getSearch( style ){

		if(style == null) style ='width:95%;'


		var search = '<input id="csAcFilter" type="text" class="form-control ui-autocomplete-input " onblur="if (this.value == \'\') '
              + ' this.value = this.defaultValue;'
              + ' onfocus=" if="" (this.value="=" this.defaultvalue)="" this.value="" ;";="" name="term" placeholder="Search a Filter" onclick="this.select();" style="'+style+'" autocomplete="off">         ';
              

			return  search;
			// '<div class="card-header border-bottom">'
               
              
              // + ' </div>'
	}



	// function 




	return {

		gs : getSearch,
		ras : registerAutoSelect,
		ef : executeFilter,
		gf : getFilter
		

	}


})(); // module 	