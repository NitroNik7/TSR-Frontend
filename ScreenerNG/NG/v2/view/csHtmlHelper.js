


var cshNg = (function () {

	// csr = Custom Screener Reesults....
	var htmlU = mintHtmlUtil;
	// var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;

	var scrAlias = 'myTsrScreener';

	var BACK_TEST_DIV = 'backtestDiv';



	function initHtml() {
		return initNg();
	}

	function initNg() {

		miscru.init('cs', scrAlias, 'csScrCtrlFbDiv');

		var html = '';

		// html+=htmlU.getLoadingDiv(SCR_INIT_LD_DIV,null);

		if (window.innerWidth > 768) { // TODO write a function for this condition
			html += getCsWrapper();
		}

		return html;
	}

	function getCsWrapper() {
		let html = "";

		html += `	<div class="d-flex flex-column border p-2">`
		html += `		<div class="d-flex">`
		html += getLeftColumn();
		html += `			<div class="vr mx-3"></div>`
		html += getRightColumn();
		html += `		</div>`
		html += `		<hr>`
		html += getFilterControl();
		html += `	</div>`


		return html;

	}

	// function initNg(){

	// 	miscru.init('cs', scrAlias , 'csScrCtrlFbDiv');

	// 	var html= '';

	// 	// html+=htmlU.getLoadingDiv(SCR_INIT_LD_DIV,null);

	// 	html+=    TSR_HR  ;

	// 	html+= getBroadFilterOptions();

	// 	html+=  TSR_HR ;

	// 	html+= (jsu.isMigContext() || inMyTsr) ? SMALL_BR_2 :'';

	// 	html+= getCommonFilterBody();

	//     // html+= TSR_HR;
	// 	html+= (jsu.isMigContext() || inMyTsr ) ? SMALL_BR_2 :BREAK_LINE;
	// 	// html+= 

	// 	if(isMobile()){
	// 		html+= `<div id="csSelFieldsDivWrapMobile" class="card mt-2 my-2" style="left: 2px; margin-right: 10px; display: block;">
	// 		    <div class="card-body shadow" style="background-color: #fff; border: 1px solid #979595; border-radius: 5px;">
	// 		        <div class="d-flex justify-content-between align-items-baseline" style="position: static;">
	// 		            <h5 align="left" class="ps-1">Selected Fields</h5>
	// 		            <a onclick="mintHtmlUtil.divHide('csSelFieldsDivWrapMobile')" title="Delete Row">
	// 		                <font size="4" color="red"><span class="fa fa-remove fa-times"></span>
	// 		                </font>
	// 		            </a>
	// 		        </div>

	// 		        <hr style="margin:1px;height:1;padding:1px;color:#adb5bd">
	// 		        <div id="csSelFieldsDiv" style="margin:5px; overflow: auto;  max-height: 150px;"></div>
	// 		    </div>
	// 		</div>`
	// 		html+= BREAK_LINE;
	// 	}



	//     html+= getFilterControl();

	// 	html+= '</div >' /// screenerControl
	// 	html+= (jsu.isMigContext() || inMyTsr ) ? SMALL_BR_2 :'';

	// 	html+=htmlU.getLoadingDiv(ScreenerLoadingDiv,null);
	//     html+=htmlU.createEmptyDiv(ScreenerFeedbackDiv); 

	// 	return html;
	// }


	// function add


	// function getBroadFilterOptions(){

	// 	var html = '';
	// 	html+= (jsu.isMigContext() || inMyTsr || pp) ? SMALL_BR :''


	// 	let scrFreq = localStorage.getItem( "csscrFreq");

	// 	if(scrFreq == null   ){

	// 		if(jsu.isMigContext()){	
	// 			scrFreq = FREQ_DAILY;
	// 		}else{
	// 			scrFreq = (mtgv.mktDet.mktHours ? FREQ_INTRA_DAILY  :   FREQ_DAILY  )	
	// 		}


	// 	}


	// 	mtgv.cs.screenerData.scrFreq = scrFreq;


	// 	if(isMobile()){
	// 		html+= '<div class="row g-1 migform d-block  ps-2 pb-2">';
	// 		var ColStart = '<div class="col-sm-12 col-md-6 col-lg-4 d-flex">';


	// 		html+=ColStart;
	// 		var tickFunc = 'myTsrScreener.sfc';

	// 		html+= ` <label for="scrFreq" style="width: 30%; text-align: start; align-content: center; ">Tick:
	//                                     </label>` 

	// 		html+= getDropDown(mtgv.mtpp.FREQ_SCR_MAP, 'scrFreq', 'width: 60%', tickFunc,null,  scrFreq);


	// 		html+=DIV_END

	// 		html+=ColStart;  // search 

	// 		html+= ` <label for="csAcFilter" style="width: 30%; text-align: start; align-content: center; ">
	// 			Search:
	//                                     </label>` 

	// 		html+= mintSrch.gs('width:60%;');
	// 		html+=DIV_END

	// 		// var ColStart = jsu.isMigContext() ?  BOOT_4COL : BOOT_3COL ;


	// 		html+=ColStart;  // saved Settings

	// 		html+= ` <label for="myScrSetting" style="width: 30%; text-align: start; align-content: center; ">
	// 			My Settings:
	//                                     </label>` 

	// 		html+='<select id ="myScrSetting"    '

	// 		// if(isMobile()){
	// 		// 	html+='onmousedown ';
	// 		// }else{
	// 		// 	html+='onmouseup  '	;
	// 		// }

	// 		html+='onmousedown  '	;
	// 		html+='="csmng.so();"  style="width:60%;"  onkeypress="csmng.soc();"  >'
	// 			+'<option value="none" selected="">My Settings</option> </select>';



	// 		html+=DIV_END



	// 		html+=DIV_END // row....
	// 	}else{

	// 		html+= '<div class="row g-1 migform  d-flex ps-2 pb-2">';
	// 		var ColStart = '<div class="col-3 d-flex align-items-baseline">';


	// 		html+=ColStart;
	// 		// html+= '<div class="col-3 d-flex align-items-baseline">';

	// 		var tickFunc = 'myTsrScreener.sfc';



	// 		// html+= 'Tick : ' + getDropDown(mtgv.mtpp.FREQ_SCR_MAP, 'scrFreq', null, tickFunc,null,  FREQ_DAILY);

	// 		html+= getDropDown(mtgv.mtpp.FREQ_SCR_MAP, 'scrFreq', 'width:70%;', tickFunc,null,  scrFreq);

	// 		html+=DIV_END

	// 		// html+=ColStart;  // search 
	// 		html+= '<div class="col-6 d-flex align-items-baseline">';


	// 		html+=  'Search  ' +SP_3 +  mintSrch.gs('width:70%;');
	// 		html+=DIV_END

	// 		// var ColStart = jsu.isMigContext() ?  BOOT_4COL : BOOT_3COL ;


	// 		html+=ColStart;  // saved Settings
	// 		html+='<select id ="myScrSetting"   '

	// 		// if(isMobile()){
	// 		// 	html+='onmousedown ';
	// 		// }else{
	// 		// 	html+='onmouseup  '	;
	// 		// }

	// 		html+='onmousedown  '	;
	// 		html+='="csmng.so();"  style="width:70%;"  onkeypress="csmng.soc();"  >'
	// 			+'<option value="none" selected="">My Settings</option> </select>';



	// 		html+=DIV_END



	// 		html+=DIV_END // row....

	// 	}




	// 	// if(!jsu.isMigContext()){ // Stock basket
	// 		// html+=ColStart;
	// 		// html+=''
	// 		// html+=DIV_END



	// 		html+= TSR_HR;
	// 		html+= getStockBasket();

	// 	// }

	// 	return html;

	// }



	// function getStockBasket(){

	// 	var html =''

	// 	html+= '<div class ="miCtrl">';
	// 		if(mtgv.mtpp.pr  ||   (jsu.isMigContext() && userProf.status == 'signedIn') ) {  //&& userProf.status == 'signedIn' 
	// 	        var sblcfg = { fieldName :'stkType',  obj : scrAlias , fnc :  'cbc',
	// 	        selected : mtgv.mtpp.CLASSI[1].id , stkBsktCat : null  };
	// 	        html+='<div id ="sbDiv" style="overflow-x:auto; white-space:nowrap" >'
	// 	        html+= msbu.ua('getsb' ,  sblcfg);
	// 	        html+='</div>';
	// 	    }else{
	// 	         html +=  '<b>Stock Basket </b> : '  +  htmlU.crg('stkType', scrAlias+'.cbc'  , mtgv.mtpp.CLASSI, mtgv.mtpp.DEF_CLASSI);
	// 	    }
	// 	    html+=DIV_END // screenerControl....
	// 	    html+=  htmlU.createEmptyDiv(CS_SCR_SB_FB_DIV, true);   //	
	// 	    return html;
	// }


	// function getCommonFilterBody(){

	// 	var html ='';


	// 	html+= '<div class ="miCtrl">';

	// 	html+= '<div class="tabs" id="tabs">'
	//     html+= '    <div class="left-scroll" id="left-scroll" onclick="csfstr.ls()">'
	//     html+= '        <span id="LeftScrollBtn" style="display: block;font-size:22px;"><i class="fa fa-solid fa-caret-left"  style="color: #000000;"></i></span>'
	//     html+= '    </div>'
	//     html+= '    <div id="insideTabs">'

	//     for(var i=0;i<mtgv.cs. tabs.length;i++){
	// 	 	var tab = mtgv.cs. tabs[i];
	// 	 	html+='<div onClick="'+scrAlias+'.showControl(\''+tab.id+'\')"  id = \''+tab.id+'\' >'+tab.label+'</div>';
	// 	}

	//     html+= '    </div>'
	//     html+= '    <div class="right-scroll" id="right-scroll" onclick="csfstr.rs()">'
	//     html+= '        <span id="RightScrollBtn" style="display: block;font-size:22px;"><i class="fa fa-classic fa-solid fa-caret-right style="color: #000000;"></i></span>'
	//     html+= '    </div>'
	//     html+= '</div>'

	//     // if(isMobile()){
	//     	html+='<div class="csWrapper  shadow-lg" style="height:max-content !important">'    // 
	//     // }else{
	//     // 	html+='<div class="csWrapper  shadow-lg">'    // 	
	//     // }





	//     html+='    		<div class="column" id="csControlsDiv" style="overflow-x:auto; white-space:nowrap">';
	//     // html+= 	csp.pht();

	//     html+='        </div>';

	//     if(!isMobile()){
	//     	    html+='        <div class="selectfields-Button">'
	// 	    html+='            <button id="selectfields-Button">Selected Fields</button>'
	// 	    html+='        </div>'
	// 	    html+='        <div class="csResizer">'
	// 	    html+='            <button id="collapse-button"> <i class="fa fa-classic fa-solid fa-caret-right style="color: #000000;"></i>   </button>'
	// 	    html+='        </div>'
	// 	    html+='        <div class="column" id="csSelFieldsDivWrap">'

	// 	    html+= 			'<h5 align="center">Selected Fields</h5> ' +TSR_HR
	// 						+'<div id="csSelFieldsDiv" style="margin:5px;"></div>';


	// 	    html+='   		</div>'
	//     }






	//     html+='</div>'


	//     return html ;

	// }




	// function getFilterControl(){

	// 	var custBtnClass = 'btn btn-outline-dark primary btn-sm';

	// 	var html ='';

	// 		html+= '<div style="overflow-x:auto; white-space:nowrap" >'	




	// 	html+=  htmlU.createEmptyDiv('csAutoRefDiv', true);   

	// 	html+= '<div id= "cstRsltDiv" ></div> ';	

	// 	html+=  htmlU.createEmptyDiv('csstkRelDiv', true);   

	// 	html+=  htmlU.createEmptyDiv(BACK_TEST_DIV, true);   

	// 	var func = scrAlias+'.'+'screenNow';


	// 	if(isMobile()){
	// 		html+= '<div style="padding:15px;">'
	// 	}else{
	// 		html+= '<div style="padding:2px;">'
	// 	}

	// 	// If Rupaskshi complains then add Tab Index
	// 	let tabindex = null;// set to 0 for tabs...

	// 	html+= SP_3 + htmlU.getCusBtn('Run ' , func, 'run','Run Screener', custBtnClass, 'fas fa-play' ,tabindex);

	// 	html+= SP_3 + htmlU.getCusBtn('Reset ' , func , 'reset','Reset Screener', custBtnClass, 'fas fa-redo-alt' ,tabindex);

	// 	html+= SP_3 + htmlU.getCusBtn('Save ' , func, 'save','Save Screener', custBtnClass, 'fas fa-save' ,tabindex);

	// 	// html+= SP_3 + htmlU.getCusBtn('Alert ' , func, 'alert','Alerts', custBtnClass, 'fas fa-bell',0);			

	// 	html+= SP_3 + htmlU.getCusBtn('Alert ' , func, 'alertNew','Alerts', custBtnClass, 'fas fa-bell',tabindex);				


	// 	if(isMobile()){
	// 		//csSelFieldsDivWrapMobile
	// 		html+= SP_3 + htmlU.getCusBtn('Selected Fields ' , 'csh.ssf' , '','Selected Fields', custBtnClass, 'fas fa-tasks' ,tabindex);
	// 	}


	// 	if(!jsu.isMigContext() ){

	// 		html+= SP_2 +   ' | '+SP_2 + miscru.arcb() +' Auto refresh';	

	// 		html+= SP_2 +   ' | '+SP_2 + miscru.srcb() +' Stock Relevance';	
	// 	}

	// 	if(mtgv.mtpp.srt.avail && !jsu.isMigContext()){
	// 		// html+= SP_3 + htmlU.getCusBtn('Back Test ' , func, '	','Back Test', custBtnClass, 'fas fa-history');			
	// 		html+= SP_2 +   ' | '+SP_2 +    misu.csua( 'gctcb'  ,scrAlias ,'screenNow', 'run') + ' Custom Results';
	// 	}
	// 	if( mtgv.mtpp.crossFreq ){

	// 		html+= SP_2 +   ' | '+SP_2 + getCheckboxP('csBt' , 'csh.bt', null,'bt')  +' BackTest';
	// 	}


	// 	html+= DIV_END;





	// 	html+=  htmlU.createEmptyDiv(CS_SCR_CTRL_FB_DIV, true);   //CS_SCR_SB_FB_DIV	





	// 	// html+= SP_3 + getButtonP('Run Screener' , scrAlias+'.'+'screenNow', 'run');
	// 	// // html+= SP_3 + getButtonP('Save' , scrAlias+'.'+'screenNow', 'save');
	// 	// html+= SP_3 + getButtonP('Reset' , scrAlias+'.'+'screenNow', 'reset');




	// 	html+= '</div>'

	// 	return html ;
	// }


	// new
	function getLeftColumn() {

		let searchBoxId = "tsrCsSearchBox"; // todo change later

		let html = ``;

		let dropdownIdSuffix = "DropdownMenu";

		let accordionIdSuffix = "Accordion";

		html += `			<div>`
		html += `				<div style="height: 40px;">`
		html += `					<input type="email" class="form-control" id="${searchBoxId}" placeholder="Search a Filter">`
		html += `				</div>`
		html += `				<hr>`
		html += `				<div class="d-flex flex-column">`;

		for (let i = 0; i < mtgv.cs.tabs.length; i++) { // for each cat.
			html += `<div class="btn-group dropend">`
			html += `	<button type="button" class="btn btn-light dropdown-toggle text-start tsrCsNgMenu" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" onclick="myTsrScreener.showControl('${mtgv.cs.tabs[i]["id"]}')">`
			html += mtgv.cs.tabs[i]["label"];
			html += `	</button>`
			html += `	<ul id="${mtgv.cs.tabs[i]["id"] + dropdownIdSuffix}" class="dropdown-menu" style="max-height: 500px; ">` // "overflow-y: auto; overflow-x: hidden;" - removing these two conditions made the 3rd submenu visible. "overflow-y: unset;  overflow-x: unset;"" also works
			let subMenu = mtgv.cs.tabs[i]["subMenu"]; // can be an arr of filters or an arr of nested filters
			if (jsu.isNotNull(subMenu)) {
				let listHtml = "";
				let accHtml = "";
				for (let j = 0; j < subMenu.length; j++) { // for each sub cat.
					let item = subMenu[j];
					let nestedMenu = item["subMenu"];

					if (jsu.isNull(nestedMenu)) {
						let func = item["func"];
						listHtml += `
								<li>
									<a class="dropdown-item text-black fs-6" href="#" onclick="${func}('${item['id']}')" style="text-wrap: nowrap;">
										${item["label"]}
									</a>
								</li>
							`
					} else {

						// For dropdowns
						html += `<li>`
						html += `<div class="btn-group dropend w-100">`
						html += `	<button type="button" class="btn dropdown-toggle dropdown-item text-black tsrCsNgMenu" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" >`
						html += item["label"];
						html += `	</button>`
						html += `	<ul class="dropdown-menu" style="max-height: 500px; overflow-y: auto; overflow-x: hidden; ">`
						for (let k = 0; k < nestedMenu.length; k++) { // for innermost nested filters

							let nestedItem = nestedMenu[k];
							let func = nestedItem["func"];

							let params = "";
							for (let l = 0; l < nestedItem["params"].length; l++) {
								params += "'" + nestedItem["params"][l] + "'";
								if (l < nestedItem["params"].length - 1) {
									params += ",";
								}
							}

							html += `<li>
											<a class="dropdown-item text-black fs-6" href="#" onclick="${func}(${params})">${nestedItem["label"]}</a>
									</li>
											`

						}
						html += `</ul>`
						html += `</li>`

						// dropdowns end


						// accHtml += `	<div class="accordion-item">`
						// accHtml += `
						// 				<h2 class="accordion-header" id="${item['id'] + accordionIdSuffix + "Heading"}">
						// 					<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${item['id'] + accordionIdSuffix}" aria-expanded="true" aria-controls="" style="text-wrap: nowrap;">
						// 						${item["label"]}
						// 					</button>
						// 				</h2>
						// 		`
						// accHtml += `
						// 				<div id="${item['id'] + accordionIdSuffix}" class="accordion-collapse collapse" aria-labelledby="${item['id'] + accordionIdSuffix + "Heading"}" data-bs-parent="#accordionExample">
						// 					<div class="accordion-body">	
						// 		`
						// // html += `<div class="btn-group dropend">`
						// // html += `	<button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" >`
						// // html += item["label"];
						// // html += `	</button>`
						// // html += `	<ul class="dropdown-menu" style="max-height: 500px; overflow-y: auto;">`
						// for (let k = 0; k < nestedMenu.length; k++) { // for innermost nested filters

						// 	let nestedItem = nestedMenu[k];
						// 	let func = nestedItem["func"];

						// 	let params = "";
						// 	for (let l = 0; l < nestedItem["params"].length; l++) {
						// 		params += "'" + nestedItem["params"][l] + "'";
						// 		if (l < nestedItem["params"].length - 1) {
						// 			params += ",";
						// 		}
						// 	}

						// 	accHtml += `
						// 					<a class="dropdown-item text-black fs-6" href="#" onclick="${func}(${params})">${nestedItem["label"]}</a>
						// 		`

						// }

						// accHtml += `
						// 					</div>
						// 				</div>
						// 			`
						// accHtml += `	</div>`

					}
				}
				// html += `<li>`
				// html += `	<div class="accordion accordion-flush" id="accordionExample">
				// 				`
				// html += accHtml;
				// html += `		
				// 			</div>`
				// html += `</li>`
				html += listHtml;

			}

			html += `	</ul>`
			html += `</div>`
		}
		html += `				</div>`;
		html += `			</div>`;




		return html;
	}

	function getRightColumn() {

		var html = '';
		html += (jsu.isMigContext() || inMyTsr || pp) ? SMALL_BR : ''


		let scrFreq = localStorage.getItem("csscrFreq");

		if (scrFreq == null) {

			if (jsu.isMigContext()) {
				scrFreq = FREQ_DAILY;
			} else {
				scrFreq = (mtgv.mktDet.mktHours ? FREQ_INTRA_DAILY : FREQ_DAILY)
			}


		}


		mtgv.cs.screenerData.scrFreq = scrFreq;


		if (isMobile()) {
			html += '<div class="row g-1 migform d-block  ps-2 pb-2">';
			var ColStart = '<div class="col-sm-12 col-md-6 col-lg-4 d-flex">';


			html += ColStart;
			var tickFunc = 'myTsrScreener.sfc';

			html += ` <label for="scrFreq" style="width: 30%; text-align: start; align-content: center; ">Tick:
                                        </label>`

			html += getDropDown(mtgv.mtpp.FREQ_SCR_MAP, 'scrFreq', 'width: 60%', tickFunc, null, scrFreq);


			html += DIV_END

			html += ColStart;  // search 

			html += ` <label for="csAcFilter" style="width: 30%; text-align: start; align-content: center; ">
				Search:
                                        </label>`

			html += mintSrch.gs('width:60%;');
			html += DIV_END

			// var ColStart = jsu.isMigContext() ?  BOOT_4COL : BOOT_3COL ;


			html += ColStart;  // saved Settings

			html += ` <label for="myScrSetting" style="width: 30%; text-align: start; align-content: center; ">
				My Settings:
                                        </label>`

			html += '<select id ="myScrSetting"    '

			// if(isMobile()){
			// 	html+='onmousedown ';
			// }else{
			// 	html+='onmouseup  '	;
			// }

			html += 'onmousedown  ';
			html += '="csmng.so();"  style="width:60%;"  onkeypress="csmng.soc();"  >'
				+ '<option value="none" selected="">My Settings</option> </select>';



			html += DIV_END



			html += DIV_END // row....
		} else {

			// html += '<div class="row g-1 migform  d-flex ps-2 pb-2">';
			// var ColStart = '<div class="col-3 d-flex align-items-baseline">';


			// html += ColStart;
			// html+= '<div class="col-3 d-flex align-items-baseline">';

			var tickFunc = 'myTsrScreener.sfc';

			html += `<div style="width: 100%; overflow-x: hidden;">`
			html += `   <div style="height: 40px;" class="d-flex justify-content-between">`
			html += `		<div class="d-flex">`

			html += getDropDown(mtgv.mtpp.FREQ_SCR_MAP, 'scrFreq', 'width:70%;', tickFunc, null, scrFreq); // todo get stock basket dropdown
			html += getDropDown(mtgv.mtpp.FREQ_SCR_MAP, 'scrFreq', 'width:70%;', tickFunc, null, scrFreq); // todo get tick dropdown
			html += getDropDown(mtgv.mtpp.FREQ_SCR_MAP, 'scrFreq', 'width:70%;', tickFunc, null, scrFreq); // todo get mySettings dropdown


			html += `		</div>`
			html += getSelectedFiltersTrigger();
			html += `	</div>`
			html += `	<hr>`

			html += `
						<div class="d-flex" style="height: 450px;">
							<div id="csControlsDiv" class="d-flex me-2" style="flex-grow: 1">

							</div>
							<div id="tsrCsDivSeperator" class="vr csResizer" style="display: none; width: 2px; cursor: col-resize;"></div>
							<div id="csSelFieldsDivWrap" class="ms-2" style="min-width: 350px; display: none;">
								
								<div id="csSelFieldsDiv" style="margin:5px;" class="d-flex flex-column">
									<span style="font-size: 12px; color: gray;">All filters that you select will appear here</span>
								</div>
								
							</div>
						</div>
				`
			html += `</div>`

			// // html+= 'Tick : ' + getDropDown(mtgv.mtpp.FREQ_SCR_MAP, 'scrFreq', null, tickFunc,null,  FREQ_DAILY);

			// html += getDropDown(mtgv.mtpp.FREQ_SCR_MAP, 'scrFreq', 'width:70%;', tickFunc, null, scrFreq);

			// html += DIV_END

			// // html+=ColStart;  // search 
			// html += '<div class="col-6 d-flex align-items-baseline">';


			// html += 'Search  ' + SP_3 + mintSrch.gs('width:70%;');
			// html += DIV_END

			// // var ColStart = jsu.isMigContext() ?  BOOT_4COL : BOOT_3COL ;


			// html += ColStart;  // saved Settings
			// html += '<select id ="myScrSetting"   '

			// // if(isMobile()){
			// // 	html+='onmousedown ';
			// // }else{
			// // 	html+='onmouseup  '	;
			// // }

			// html += 'onmousedown  ';
			// html += '="csmng.so();"  style="width:70%;"  onkeypress="csmng.soc();"  >'
			// 	+ '<option value="none" selected="">My Settings</option> </select>';



			// html += DIV_END



			// html += DIV_END // row....

		}




		// if(!jsu.isMigContext()){ // Stock basket
		// html+=ColStart;
		// html+=''
		// html+=DIV_END



		// html += TSR_HR;
		// html += getStockBasket();

		// }

		return html;

	}

	// new
	function getSelectedFiltersTrigger() {
		let html = "";

		// sf checkbox for width > 1200px
		html += `<div class="d-none d-xl-flex align-items-center mx-3">`
		html += `	<div class="form-check">`
		html += `		<input class="form-check-input" type="checkbox" id="sefFieldsCheck" onchange="showSelectedFields(this)">`
		html += `		<label class="form-check-label" for="sefFieldsCheck">`
		html += `			Selected Filters`
		html += `		</label>`
		html += `	</div>`

		// sf checkbox for width < 1200px
		// todo - selected fields count
		html += `</div>
				<div class="d-block d-xl-none position-relative mx-3">
					<button class="btn btn-sm btn-outline-dark"
						style="text-wrap: nowrap; height: 100%;">
						<span>
							<!-- <i class="fas fa-tasks"></i> -->
							<i class="fas fa-filter"></i>
						</span>
						<span class="d-none d-lg-inline-flex">Selected Filters</span>
						<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
							5 <span class="visually-hidden">unread messages</span>
						</span>
					</button>
				</div>
		`;

		return html;
	}



	function getFilterControl() {

		var custBtnClass = 'btn d-flex justify-content-evenly align-items-center';
		var func = scrAlias + '.' + 'screenNow';
		let tabIndex = "0";

		var html = '';

		// todo need to add style to buttons - 
		// style="min-width: 100px;"

		html += '<div class="d-flex justify-content-evenly">'
		html += `
					<button type="button" tabindex="0" title="Run Screener" class="" style="min-width: 100px;" onclick="${func}('run')">
						<i class="fas fa-play"></i>
						<span style="font-size: 16px;">Run</span>
					</button>
		`;

		html += htmlU.getCusBtn('Run ', func, 'run', 'Run Screener', custBtnClass, 'fas fa-play', tabIndex);

		html += `	<div class="vr"></div>`;

		html += htmlU.getCusBtn('Run ', func, 'reset', 'Reset Screener', custBtnClass, 'fas fa-undo', tabIndex);

		html += `	<div class="vr"></div>`;

		html += htmlU.getCusBtn('Run ', func, 'save', 'Save Screener', custBtnClass, 'fas fa-save', tabIndex);

		html += `	<div class="vr"></div>`;

		html += htmlU.getCusBtn('Alert', func, 'alertNew', 'Add Alert', custBtnClass, 'fas fa-bell', tabIndex);

		html += `	<div class="vr"></div>`;


		html += `
					<div class="d-flex justify-content-between align-items-center p-0">
						<label class="form-check-label" style="text-wrap: nowrap;" for="autoRefreshCheck">
							Auto Refresh
						</label>
						<input type="checkbox" class="form-check-input dropup ms-2" id="autoRefreshCheck" onchange="toggleCsAdvancedOptions()">
					</div>
		`;

		html += `	<div class="vr"></div>`;


		html += `	<div id="tsrCsAdvancedOptions" class="btn-group dropup" style="min-width: 100px;">`;
		html += `
						<button type="button" class="btn w-100 dropdown-toggle d-flex justify-content-evenly align-items-center" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
							<span style="font-size: 16px;">More</span>
						</button>
		`;

		html += `
						<div class="dropdown-menu">
							<form class="m-0" style="width: 500px;">
								<div class="d-flex flex-column">
		`
		html += `
									<div class="mx-3">
										<div class="d-flex justify-content-between p-0">`
		html += `							<label class="form-check-label" style="text-wrap: nowrap;" for="dropdownCheck1">
												Auto Refresh
											</label>`
		html += miscru.arcb();
		html += `						</div>
										<div id="csAutoRefDiv" class="mt-2" style="">

										</div>`
		html += `					</div>`


		html += `
									<div class="mx-3">
										<div class="d-flex justify-content-between p-0">
											<label class="form-check-label" style="text-wrap: nowrap;"
												for="dropdownCheck2">
												Stock Relevance
											</label>`
		html += miscru.srcb();
		html += `						</div>
										<div id="csstkRelDiv" class="mt-2" style="">
										</div>
									</div>
		`

		// ${misu.csua('gctcb', scrAlias, 'screenNow', 'run')} // -- for custom results checkbox
		html += `
									<div class="mx-3">
										<div class="d-flex justify-content-between p-0">
											<label class="form-check-label" style="text-wrap: nowrap;"
												for="dropdownCheck3">
												Custom Results
											</label>
											<input type="checkbox" class="form-check-input" id="dropdownCheck3" onchange="showCsAdvancedOptions()">
										</div>
										<div id="cstRsltDiv" class="mt-2" style="">

										</div>
									</div>
		`

		html += `					<div class="mx-3">
										<div class="d-flex justify-content-between p-0">
											<label class="form-check-label" style="text-wrap: nowrap;"
												for="dropdownCheck4">
												Backtest
											</label>`
		html += getCheckboxP('csBt', 'csh.bt', null, 'bt');
		html += `						</div>
										<div id="backtestDiv" style="" class="mt-2">
										</div>
									</div>
	`
		html += `
								</div>
							</form>
						</div>
	`;


		html += `	</div> `
		html += `</div> `


		return html;
	}



	return {
		// tabs : tabs

		// Html Creation
		initHtml: initHtml,
	}

})(); // module 	