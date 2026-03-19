var csFinCmnNg =  (function () {

	var thisObject = 'csFinCmnNg';
	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;



	function createScrPortlet(divId, col , title, elems, id, type, srcObj ){

	        var html =''

	        html += '<div class="'+col+'"  id="'+ divId+'" >'

	        html+= '<div class="card shadow-lg">'
	        
	        //  header
	        html+='<div class="card-header">' // 
	        html+= '<h6 class="card-title">'+  title+'</h6>';
	        html+='</div>'  // header   

	        html+= '<div class="card-body" style="padding:0px">'

	        html+='<div class="table-responsive">'

	        html+='<div id="'+divId+'Body"  style="max-height: 138px;overflow-y: scroll;">'

	        html += portletTable(elems, type, id , srcObj);

	        html+='</div>'  

	        html+='</div>'  // tab responsive  

	        html+='</div>'  // body  

	        html+='</div>'  // shadow  

	       html+='</div>'  // row 

	       return html;

	  }

	  function portletTable(elems, type, id , srcObj){

	        var html =''
	         html += '<table class="table table-striped table-bordered table-hover "  style="white-space: nowrap;overflow-x: scroll;">';

	            html+='<tbody>';

	            for(var i=0;i< elems.length ;i++){
	                var elem = elems[i];

	                if(elem.id === 'period') continue;

	                html += '<tr><td>';

	                var params = type + PARAM_DELIM + elem.id;

	                html +=  htmlU.getButtonP('Add' ,srcObj+'.ae' ,  params  , ' Add '+elem.label );

	                html+= SP_2 + elem.label ;
	                
	                html+= '</td></tr>';
	            }

	            html+='</tbody>'
	            html += '</table>'        

	        return html;
	  }


	function getHistPeriod(period, suffix){

		var tickPeriod = [
			{id: 'latest' , label: 'Latest '  + suffix},
			{id: 'p1' , label: 'Previous ' + suffix},
		];

	 	for(var i=2;i<period;i++){
	 		tickPeriod.push( {id: 'p' +i , label: '('+ suffix+' - '+i +')'}  );
	 	}
	 	return tickPeriod;
	}


return {

		csp : createScrPortlet,
		ghp : getHistPeriod

	}

})(); // module 	


