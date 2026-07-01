

var csngutil =  (function () {

	var jsu = mintJsUtil;
	var htmlU = mintHtmlUtil;



	function toggleTsrCsMenu(selector, show) {
		var dropdownElementList = [].slice.call(document.querySelectorAll(selector));
		// var dropdownElementList = [].slice.call(document.querySelectorAll('#csDiv .dropdown-toggle'))
		var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
			return new bootstrap.Dropdown(dropdownToggleEl);
		});

		for (let i = 0; i < dropdownList.length; i++) {
			if(show){
				dropdownList[i].show();	
			}else{
				dropdownList[i].hide();	
			}
			
		}
	}



	return {

		ttcm: toggleTsrCsMenu,
		

	}


})(); // module 