


var csh = (function () {

	// csr = Custom Screener Reesults....
	var htmlU = mintHtmlUtil;
	// var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;

	var scrAlias = 'myTsrScreener';

	var BACK_TEST_DIV = 'backtestDiv';


	function initHtml() {
		return initNg();
	}

	// modified
	function initNg() {

		miscru.init('cs', scrAlias, 'csScrCtrlFbDiv');

		var html = '';

		// html+=htmlU.getLoadingDiv(SCR_INIT_LD_DIV,null);

		if (mtgv.cs.ng) {
			if (window.innerWidth > 768) { // TODO write a function for this condition
				html += getCsWrapperNg();
			} else {
				html += mcsh.gch();
			}
		}
		else {
			html += getCsWrapper();
		}


		return html;
	}

	function getCsWrapper() {
		var html = "";
		html += TSR_HR;

		html += getBroadFilterOptions();

		html += TSR_HR;

		html += (jsu.isMigContext() || inMyTsr) ? SMALL_BR_2 : '';

		html += getCommonFilterBody();

		// html+= TSR_HR;
		html += (jsu.isMigContext() || inMyTsr) ? SMALL_BR_2 : BREAK_LINE;
		// html+= 

		if (isMobile()) {
			html += `<div id="csSelFieldsDivWrapMobile" class="card mt-2 my-2" style="left: 2px; margin-right: 10px; display: block;">
					<div class="card-body shadow" style="background-color: #fff; border: 1px solid #979595; border-radius: 5px;">
						<div class="d-flex justify-content-between align-items-baseline" style="position: static;">
							<h5 align="left" class="ps-1">Selected Fields</h5>
							<a onclick="mintHtmlUtil.divHide('csSelFieldsDivWrapMobile')" title="Delete Row">
								<font size="4" color="red"><span class="fa fa-remove fa-times"></span>
								</font>
							</a>
						</div>
	
						<hr style="margin:1px;height:1;padding:1px;color:#adb5bd">
						<div id="csSelFieldsDiv" style="margin:5px; overflow: auto;  max-height: 150px;"></div>
					</div>
				</div>`
			html += BREAK_LINE;
		}

		html += getFilterControl();

		html += '</div >' /// screenerControl
		html += (jsu.isMigContext() || inMyTsr) ? SMALL_BR_2 : '';

		html += htmlU.getLoadingDiv(ScreenerLoadingDiv, null);
		html += htmlU.createEmptyDiv(ScreenerFeedbackDiv);

		return html;
	}

	function getBroadFilterOptions() {

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

			html += '<div class="row g-1 migform  d-flex ps-2 pb-2">';
			var ColStart = '<div class="col-3 d-flex align-items-baseline">';


			html += ColStart;
			// html+= '<div class="col-3 d-flex align-items-baseline">';

			var tickFunc = 'myTsrScreener.sfc';



			// html+= 'Tick : ' + getDropDown(mtgv.mtpp.FREQ_SCR_MAP, 'scrFreq', null, tickFunc,null,  FREQ_DAILY);

			html += getDropDown(mtgv.mtpp.FREQ_SCR_MAP, 'scrFreq', 'width:70%;', tickFunc, null, scrFreq);

			html += DIV_END

			// html+=ColStart;  // search 
			html += '<div class="col-6 d-flex align-items-baseline">';


			html += 'Search  ' + SP_3 + mintSrch.gs('width:70%;');
			html += DIV_END

			// var ColStart = jsu.isMigContext() ?  BOOT_4COL : BOOT_3COL ;


			html += ColStart;  // saved Settings
			html += '<select id ="myScrSetting"   '

			// if(isMobile()){
			// 	html+='onmousedown ';
			// }else{
			// 	html+='onmouseup  '	;
			// }

			html += 'onmousedown  ';
			html += '="csmng.so();"  style="width:70%;"  onkeypress="csmng.soc();"  >'
				+ '<option value="none" selected="">My Settings</option> </select>';



			html += DIV_END



			html += DIV_END // row....

		}




		// if(!jsu.isMigContext()){ // Stock basket
		// html+=ColStart;
		// html+=''
		// html+=DIV_END



		html += TSR_HR;
		html += getStockBasket();

		// }

		return html;

	}

	function getStockBasket() {

		var html = ''

		html += '<div class ="miCtrl">';
		if (mtgv.mtpp.pr || (jsu.isMigContext() && userProf.status == 'signedIn')) {  //&& userProf.status == 'signedIn' 
			var sblcfg = {
				fieldName: 'stkType', obj: scrAlias, fnc: 'cbc',
				selected: mtgv.mtpp.CLASSI[1].id, stkBsktCat: null
			};
			html += '<div id ="sbDiv" style="overflow-x:auto; white-space:nowrap" >'
			html += msbu.ua('getsb', sblcfg);
			html += '</div>';
		} else {
			html += '<b>Stock Basket </b> : ' + htmlU.crg('stkType', scrAlias + '.cbc', mtgv.mtpp.CLASSI, mtgv.mtpp.DEF_CLASSI);
		}
		html += DIV_END // screenerControl....
		html += htmlU.createEmptyDiv(CS_SCR_SB_FB_DIV, true);   //	
		return html;
	}

	function getCommonFilterBody() {

		var html = '';


		html += '<div class ="miCtrl">';

		html += '<div class="tabs" id="tabs">'
		html += '    <div class="left-scroll" id="left-scroll" onclick="csfstr.ls()">'
		html += '        <span id="LeftScrollBtn" style="display: block;font-size:22px;"><i class="fa fa-solid fa-caret-left"  style="color: #000000;"></i></span>'
		html += '    </div>'
		html += '    <div id="insideTabs">'

		for (var i = 0; i < mtgv.cs.tabs.length; i++) {
			var tab = mtgv.cs.tabs[i];
			html += '<div onClick="' + scrAlias + '.showControl(\'' + tab.id + '\')"  id = \'' + tab.id + '\' >' + tab.label + '</div>';
		}

		html += '    </div>'
		html += '    <div class="right-scroll" id="right-scroll" onclick="csfstr.rs()">'
		html += '        <span id="RightScrollBtn" style="display: block;font-size:22px;"><i class="fa fa-classic fa-solid fa-caret-right style="color: #000000;"></i></span>'
		html += '    </div>'
		html += '</div>'

		// if(isMobile()){
		html += '<div class="csWrapper  shadow-lg" style="height:max-content !important">'    // 
		// }else{
		// 	html+='<div class="csWrapper  shadow-lg">'    // 	
		// }





		html += '    		<div class="column" id="csControlsDiv" style="overflow-x:auto; white-space:nowrap">';
		// html+= 	csp.pht();

		html += '        </div>';

		if (!isMobile()) {
			html += '        <div class="selectfields-Button">'
			html += '            <button id="selectfields-Button">Selected Fields</button>'
			html += '        </div>'
			html += '        <div class="csResizer">'
			html += '            <button id="collapse-button"> <i class="fa fa-classic fa-solid fa-caret-right style="color: #000000;"></i>   </button>'
			html += '        </div>'
			html += '        <div class="column" id="csSelFieldsDivWrap">'

			html += '<h5 align="center">Selected Fields</h5> ' + TSR_HR
				+ '<div id="csSelFieldsDiv" style="margin:5px;"></div>';


			html += '   		</div>'
		}






		html += '</div>'


		return html;

	}

	function getFilterControl() {

		var custBtnClass = 'btn btn-outline-dark primary btn-sm';

		var html = '';

		html += '<div style="overflow-x:auto; white-space:nowrap" >'




		html += htmlU.createEmptyDiv('csAutoRefDiv', true);

		html += '<div id= "cstRsltDiv" ></div> ';

		html += htmlU.createEmptyDiv('csstkRelDiv', true);

		html += htmlU.createEmptyDiv(BACK_TEST_DIV, true);

		var func = scrAlias + '.' + 'screenNow';


		if (isMobile()) {
			html += '<div style="padding:15px;">'
		} else {
			html += '<div style="padding:2px;">'
		}

		// If Rupaskshi complains then add Tab Index
		let tabindex = null;// set to 0 for tabs...

		html += SP_3 + htmlU.getCusBtn('Run ', func, 'run', 'Run Screener', custBtnClass, 'fas fa-play', tabindex);

		html += SP_3 + htmlU.getCusBtn('Reset ', func, 'reset', 'Reset Screener', custBtnClass, 'fas fa-redo-alt', tabindex);

		html += SP_3 + htmlU.getCusBtn('Save ', func, 'save', 'Save Screener', custBtnClass, 'fas fa-save', tabindex);

		// html+= SP_3 + htmlU.getCusBtn('Alert ' , func, 'alert','Alerts', custBtnClass, 'fas fa-bell',0);			

		html += SP_3 + htmlU.getCusBtn('Alert ', func, 'alertNew', 'Alerts', custBtnClass, 'fas fa-bell', tabindex);


		if (isMobile()) {
			//csSelFieldsDivWrapMobile
			html += SP_3 + htmlU.getCusBtn('Selected Fields ', 'csh.ssf', '', 'Selected Fields', custBtnClass, 'fas fa-tasks', tabindex);
		}


		if (!jsu.isMigContext()) {

			html += SP_2 + ' | ' + SP_2 + miscru.arcb() + ' Auto refresh';

			html += SP_2 + ' | ' + SP_2 + miscru.srcb() + ' Stock Relevance';
		}

		if (mtgv.mtpp.srt.avail && !jsu.isMigContext()) {
			// html+= SP_3 + htmlU.getCusBtn('Back Test ' , func, '	','Back Test', custBtnClass, 'fas fa-history');			
			html += SP_2 + ' | ' + SP_2 + misu.csua('gctcb', scrAlias, 'screenNow', 'run') + ' Custom Results';
		}
		if (mtgv.mtpp.crossFreq) {

			html += SP_2 + ' | ' + SP_2 + getCheckboxP('csBt', 'csh.bt', null, 'bt') + ' BackTest';
		}


		html += DIV_END;





		html += htmlU.createEmptyDiv(CS_SCR_CTRL_FB_DIV, true);   //CS_SCR_SB_FB_DIV	





		// html+= SP_3 + getButtonP('Run Screener' , scrAlias+'.'+'screenNow', 'run');
		// // html+= SP_3 + getButtonP('Save' , scrAlias+'.'+'screenNow', 'save');
		// html+= SP_3 + getButtonP('Reset' , scrAlias+'.'+'screenNow', 'reset');




		html += '</div>'

		return html;
	}

	function getBackTestDiv() {
		if ($("#csBt").prop('checked')) {

			var html = '';
			// html+=TSR_HR;

			if (inMyTsr || pp) {
				var btArr = [{ id: 0, label: "Latest Tick" }, { id: 1, label: "Prev Tick" }];

				for (var i = 2; i < 50; i++) {
					btArr.push({ id: i, label: " P - " + i });
				}

				html += htmlU.getSpan(' <b>Time Machine</b> : ', null, 12);

				html += SP_3 + getDropDown(btArr, 'btIndex', null, null, null, null);

				html += htmlU.getSpan('Only Filters from  <b>Price , Volume, TechIndi , MovAvg & Chart Patterns</b> are currently supported', 'grey', 10);


			} else if (jsu.isMigContext()) {

				var msg = htmlU.getGlaf('fa fa-remove fa-times', 'black', 14, 'mintHtmlUtil.divHide', BACK_TEST_DIV)

					+ 'Back Testing is Available in PRO plan only. '; //+')'

				htmlU.addMsgToDiv(BACK_TEST_DIV, true, msg, 'red', 14);
				// html+= msg;
				return;

			} else {

				var msg = htmlU.getGlaf('fa fa-remove fa-times', 'black', 14, 'mintHtmlUtil.divHide', BACK_TEST_DIV)

					+ 'This filter is available by logging in to ' + mintHtmlUtil.createLink(mintJsUtil.getMyTsrUrl() + '/MyTsr/#/CustomStockScreener', "MyTSR"); //+')'

				htmlU.addMsgToDiv(BACK_TEST_DIV, true, msg, 'red', 14);
				// html+= msg;
				return;

			}

			if (htmlU.isChecked('csAutoRefCB') || htmlU.isChecked('csstkRelCB')) {
				html += htmlU.getSpan('Auto refresh & Stock relevance is Disabled when Back Test is on', 'red', 12);
			}

			html += '<hr>';

			// html+=TSR_HR;

			htmlU.addMsgToDiv(BACK_TEST_DIV, true, html);

			htmlU.divShow(BACK_TEST_DIV);


		} else {
			htmlU.divHide(BACK_TEST_DIV);
		}
	}

	// DESKTOP CS NG code starts
	function getCsWrapperNg() {
		let csDiv = document.getElementById("csDiv");
		csDiv.setAttribute("style", "max-height: 70vh; min-height: 400px; overflow: hidden;");
		csDiv.classList.add("d-flex", "flex-column", "border", "p-2");

		let html = "";

		// html += `	<div class="d-flex flex-column border p-2"  style="max-height: 475px;">` //  style="min-height: 500px; height: 70vh;"
		html += getTopRowNg();
		html += `		<hr>`
		html += getMiddleRowNg();
		html += `		<hr>`
		html += getFilterControlNg();
		// html += `	</div>`

		return html;
	}

	function getTopRowNg() {


		let scrFreq = localStorage.getItem("csscrFreq");

		if (scrFreq == null) {
			if (jsu.isMigContext()) {
				scrFreq = FREQ_DAILY;
			} else {
				scrFreq = (mtgv.mktDet.mktHours ? FREQ_INTRA_DAILY : FREQ_DAILY)
			}
		}

		mtgv.cs.screenerData.scrFreq = scrFreq;

		var tickFunc = 'myTsrScreener.sfc';


		var html = "";

		// html += `			<div>`
		html += `				<div class="d-flex" style="height: 40px;">`
		html += mintSrch.gs('width:20%;');
		// html += `					<input type="email" class="form-control" id="${searchBoxId}" placeholder="Search a Filter">`
		html += `					<div class="vr"></div>`
		html += `					<div class="d-flex ms-2">`


		html += getDropDown(mtgv.mtpp.FREQ_SCR_MAP, 'scrFreq', 'width:70%; margin-left: 10px;', tickFunc, null, scrFreq); // todo get stock basket dropdown
		html += getTickDropdownHtml();

		// todo get mySettings dropdown
		// html += getDropDown(mtgv.mtpp.FREQ_SCR_MAP, 'scrFreq', 'width:70%;', tickFunc, null, scrFreq); 
		html += '						<select id ="myScrSetting" onmousedown ="csmng.so();" class="form-select ms-3" onkeypress="csmng.soc();">'
			+ '								<option value="none" selected="">My Settings</option>'
			+ '							</select>';


		html += `					</div>`
		html += `				</div>`
		// html += `			</div>`

		return html;

	}


	function getTickDropdownHtml() {

		let enabledTicks = [], disabledTicks = [];

		// mtgv.mtpp.FREQ_SCR_MAP = [
		// 	{ "id": "D", "label": "Daily (EOD)", "sf": "DAILY", "sLabel": "d", "cp": 1, "period": "3M" },
		// 	{ "id": "W", "label": "Weekly", "sf": "WEEKLY", "sLabel": "w", "cp": 4, "period": "1Y" },
		// 	{ "id": "M", "label": "Monthly", "sf": "MONTHLY", "sLabel": "m", "cp": 10, "period": "10Y" }
		// ]
		for (let i = 0; i < FREQ_SCR_MAP.length; i++) {
			let freq = FREQ_SCR_MAP[i];
			let enabled = false;
			for (let j = 0; j < mtgv.mtpp.FREQ_SCR_MAP.length; j++) {
				let enabledFreq = mtgv.mtpp.FREQ_SCR_MAP[j];
				if (freq.id == enabledFreq.id) {
					enabled = true;
				}
			}
			if (enabled) {
				enabledTicks.push(FREQ_SCR_MAP[i]);
			} else {
				disabledTicks.push(FREQ_SCR_MAP[i]);
			}
		}

		let html = "";
		var tickFunc = 'myTsrScreener.sfc()';

		html += `<select id="scrFreq" onchange="${tickFunc}" class="form-select ms-3">`
		for (let i = 0; i < enabledTicks.length; i++) {
			html += `<option value="${enabledTicks[i].id}">${enabledTicks[i].label}</option>`
		}
		for (let i = 0; i < disabledTicks.length; i++) {
			html += `<option value="${disabledTicks[i].id}" disabled>${disabledTicks[i].label}</option>`
		}
		html += `</select>`

		// html += getDropDown(mtgv.mtpp.FREQ_SCR_MAP, 'scrFreq', 'width:70%; margin-left: 10px;', tickFunc, null, scrFreq);
		return html;
	}

	let infoBoxId = "tsrCsFilterInfoBox";

	function getMiddleRowNg() {
		var html = ``;

		let dropdownIdSuffix = "DropdownMenu";

		html += `			<div id="tsrCsMiddleRow" class="d-flex" style="overflow-x: hidden; overscroll-behavior: contain;">`;

		html += `				<div class="d-flex flex-column">`;

		let DROPDOWN_MENU_STYLE = "";
		for (let i = 0; i < mtgv.cs.tabs.length; i++) { // for each cat.
			let tabId = mtgv.cs.tabs[i]["tab"];
			html += `<div class="btn-group dropend">`
			html += `	<button type="button" class="btn btn-light dropdown-toggle text-start tsrCsNgMenu m-0 border-bottom border-3" data-bs-toggle="dropdown" aria-expanded="false"  data-bs-auto-close="outside" onclick="csh.smh(this); myTsrScreener.showControl('${mtgv.cs.tabs[i]["id"]}'); csh.cd('${infoBoxId}')" >`
			html += mtgv.cs.tabs[i]["label"];
			html += `	</button>`
			let subMenu = mtgv.cs.tabs[i]["subMenu"]; // can be an arr of filters or an arr of nested filters
			html += `	<ul id="${mtgv.cs.tabs[i]["id"] + dropdownIdSuffix}" class="dropdown-menu" style="DROPDOWN_MENU_STYLE" >` // "overflow-y: auto; overflow-x: hidden;" - removing these two conditions made the 3rd submenu visible. "overflow-y: unset;  overflow-x: unset;"" also works
			if (jsu.isNotNull(subMenu)) {
				let listHtml = "";

				for (let j = 0; j < subMenu.length; j++) { // for each sub cat.
					let item = subMenu[j];
					let nestedMenu = item["subMenu"];
					if (jsu.isNull(nestedMenu)) { // if nestedMenu does not exist, i.e. item is a single filter
						DROPDOWN_MENU_STYLE = "overflow-y: auto;"; // max-height: 500px;  adds overflow property to list if there are no dropdowns(subMenu's) in it
						let idStr = mtgv.cs.tabs[i]["id"] + "_" + item["id"];
						html += getFilterHtml(item, idStr);
					} else { // nestedMenu exists
						DROPDOWN_MENU_STYLE = ""; // "overflow-y: auto; overflow-x: hidden;" - removing these two conditions makes the 3rd submenu visible. "overflow-y: unset; overflow-x: unset;"" also works

						// For dropdowns
						html += `<li>`
						html += `<div class="btn-group dropend w-100">`
						html += `	<button type="button" class="btn dropdown-toggle dropdown-item text-black tsrCsNgMenu m-0" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" onclick="csh.smh(this)">`
						html += item["label"];
						html += `	</button>`
						html += `	<ul class="dropdown-menu" style="overflow-y: auto; overflow-x: hidden; overscroll-behavior: contain; ">` // max-height: 500px; 
						for (let k = 0; k < nestedMenu.length; k++) { // for innermost nested filters

							let nestedItem = nestedMenu[k];
							let idStr = mtgv.cs.tabs[i]["id"] + "_" + item["id"] + "_" + nestedItem["id"];
							html += getFilterHtml(nestedItem, idStr);

						}
						html += `</ul>`
						html += `</li>`

						// dropdowns end
					}
				}

				html += listHtml;
			}

			html += `	</ul>`
			html += `</div>`

			html = html.replaceAll("DROPDOWN_MENU_STYLE", DROPDOWN_MENU_STYLE);
		}
		html += `				</div>`;
		html += `				<div class="d-flex flex-column w-100" style="position: sticky; top: 0px;">`
		html += `					<div id="tsrCsSelFieldsCheckRow" style="display: none;">`
		html += getSelFieldsCheckRowHtml();
		html += `					</div>`
		html += `					<div id="tsrCsInstrBox" style="display: block; width: 275px;">`
		html += getInstrBoxHtml();
		html += `					</div>`
		html += `					<div id="csControlsDiv" class="d-flex me-2 w-100 miCtrl">`
		html += `						<table id="${CS_FILTERS_TABLE}" class="table table-bordered table-striped  " style="white-space: nowrap; margin: 20px;" width="100%">`
		html += `						</table>`
		html += `					</div>`
		// html += `					<div id="csSelFieldsDivWrap" class="ms-2 w-100">`
		// html += `						<div id="csSelFieldsDiv" style="margin:5px;" class="d-flex flex-column">`
		// html += `							<span style="font-size: 12px; color: gray;">All filters that you select will appear here</span>`
		// html += `						</div>`
		// html += `					</div>`
		html += `				</div>`
		html += `			</div>`



		return html;
	}

	function getSelFieldsCheckRowHtml() { // todo add functionality to checkboxes
		let html = "";

		html += `						<div class="mx-3">`
		html += `							<div class="d-flex" style="font-size: 14px;">`
		html += `								<p>`
		html += `									View added filters with`
		html += `								</p>`
		html += `								<div class="mx-2">`
		html += `									<input type="checkbox" id="html" value="sfForm">`
		html += `									<label for="html">Forms</label>`
		html += `								</div>`
		html += `								<div class="mx-2">`
		html += `									<input type="checkbox" id="css" value="sfLabel">`
		html += `									<label for="css">Labels</label>`
		html += `								</div>`
		html += `							</div>`
		html += `							<div id="${infoBoxId}">`
		html += `							</div>`
		html += `						</div>`

		return html;
	}

	function getInstrBoxHtml() { // todo update preCreatedScr arr

		let html = "";


		let preCreatedScr = [
			{ id: "scr1", label: "RSI Above 20", func: "" },
			{ id: "scr2", label: "Supertrend Crossover", func: "" },
			{ id: "scr3", label: "Gainers", func: "" },
		];

		html += `	<div class="d-flex justify-content-evenly">`
		html += `		<div class="tsrCsNgArrowEle">`
		html += `		</div>`
		html += `		<div class="ms-3">`
		html += `			<span style="font-size: 20px;">`
		html += `				Add a Filter`
		html += `			</span>`
		html += `		</div>`
		html += `	</div>`
		html += `	<p class="ms-5 my-3 text-center">OR</p>`
		html += `	<div class="align-items-center d-flex flex-column ms-5">`
		html += `		<span>Run Pre-created Screener</span>`
		html += `		<div class="d-flex flex-column w-75">`

		for (let i = 0; i < preCreatedScr.length; i++) {
			let func = preCreatedScr[i].func + "();";
			html += `			<button onclick="${func}" class="btn btn-sm btn-outline-secondary d-flex justify-content-evenly align-items-center my-2">`
			html += `				<i class="fas fa-play"></i>`
			html += `				<span>${preCreatedScr[i].label}</span>`
			html += `			</button>`
		}

		html += `		</div>`
		html += `	</div>`

		return html;
	}


	function showInstrBox(show) { // todo - to be called after reset / if no filter is selected

		let instrBoxId = "tsrCsInstrBox";
		let instrBox = document.getElementById(instrBoxId);

		let sfCheckRowId = "tsrCsSelFieldsCheckRow";
		let sfCheckRow = document.getElementById(sfCheckRowId);

		if (show) {
			instrBox.style.display = "block";
			sfCheckRow.style.display = "none";
		} else {
			instrBox.style.display = "none";
			sfCheckRow.style.display = "block";
		}
	}

	function setMenuHeight(ele) {
		let nextEle = ele.nextElementSibling;
		let tsrCsMiddleRow = document.getElementById("tsrCsMiddleRow");

		nextEle.style.maxHeight = tsrCsMiddleRow.getBoundingClientRect().height;
	}

	function getFilterHtml(filterItem, idStr) {

		// let id = "" + filterItem["id"];

		// Which filters are available for premium / other plan users ? 
		// VWAP and others -  a few only
		let subsUser = false; // is user subscribed
		let prUser = false; // is premium plan user
		if (mtgv.mtpp.pr) {
			if (mtgv.mtpp.crossFreq) {
				prUser = true;
			} else {
				subsUser = true;
			}
		}

		// What are the upgradeFilters ?
		let prFilter = false;
		if (filterItem["premium"]) {
			prFilter = true;
		}

		let addOnce = false;
		if (filterItem["addOnce"]) {
			addOnce = true;
		}

		let func = filterItem["func"];

		let params = "";
		for (let l = 0; l < filterItem["params"].length; l++) {
			params += "'" + filterItem["params"][l] + "'";
			if (l < filterItem["params"].length - 1) {
				params += ",";
			}
		}

		let plansUrl = ""; // todo
		// -----------------HTML SECTION-----------------

		let html = "";
		if (prFilter) {
			if (prUser) {
				if (addOnce) {
					html += `<li>`
					html += `	<a id="${idStr}" class="dropdown-item" onclick=" csh.ttcm(); csh.uht('${idStr}'); ${func}(${params}); csh.df('${idStr}');" style="text-wrap: nowrap; font-size: 16px; color: black;">`
					html += filterItem["label"]
					html += `	</a>`
					html += `</li>`
				} else {
					html += `<li>`
					html += `	<a  id="${idStr}" class="dropdown-item" onclick=" csh.ttcm(); csh.uht('${idStr}'); ${func}(${params})" style="text-wrap: nowrap; font-size: 16px; color: black;">`
					html += filterItem["label"]
					html += `	</a>`
					html += `</li>`
				}
			} else {
				html += `<a id="${idStr}" class="dropdown-item d-flex justify-content-between align-items-baseline" href="${plansUrl}" style="text-wrap: nowrap; font-weight: 300; font-size: 16px; color: black;">`
				html += filterItem["label"]
				if (subsUser) {
					html += `	<span class="badge ms-2" style="background-color: #0254ad;">UPGRADE</span>`
				} else {
					html += `	<span class="badge ms-2" style="background-color: #0254ad;">PRO</span>`
				}
				html += `</a>`
			}
		} else {
			if (addOnce) {
				html += `<li>`
				html += `	<a id="${idStr}" class="dropdown-item" onclick=" csh.ttcm(); csh.uht('${idStr}'); ${func}(${params}); csh.df('${idStr}'); " style="text-wrap: nowrap; font-size: 16px; color: black;">`
				html += filterItem["label"]
				html += `	</a>`
				html += `</li>`
			} else {
				html += `<li>`
				html += `	<a id="${idStr}"class="dropdown-item" onclick=" csh.ttcm(); csh.uht('${idStr}'); ${func}(${params})" style="text-wrap: nowrap; font-size: 16px; color: black;">`
				html += filterItem["label"]
				html += `	</a>`
				html += `</li>`
			}
		}

		return html;
	}

	function toggleTsrCsMenu() { // for hiding dropdowns when a filter btn is clicked
		var dropdownElementList = [].slice.call(document.querySelectorAll('#csDiv .dropdown-toggle'))
		var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
			return new bootstrap.Dropdown(dropdownToggleEl);
		});

		for (let i = 0; i < dropdownList.length; i++) {
			dropdownList[i].toggle();
		}
	}

	function clearDiv(id) {
		htmlU.addMsgToDiv(id, true, "");
	}

	function disableFilter(idStr) {

		let filterEle = document.getElementById(idStr);
		let filterObj = getFilterObjFromScrData(idStr);

		// filterHtmlEle.onclick = null;
		filterEle.setAttribute("onclick", "");

		filterEle.setAttribute("style", "text-wrap: nowrap; font-size: 16px;");
		filterEle.classList.toggle("tsrCsNgFilter"); // .tsrCsNgFilter in style.css

		let html = ``;

		html += filterObj["label"]
		html += `		<span style="font-size: 12px; text-align: end; color: grey;">`
		html += `			Already added `
		html += `		</span>`

		filterEle.innerHTML = html;
	}

	function enableFilter(idStr) {
		let filterEle = document.getElementById(idStr);
		let filterObj = getFilterObjFromScrData(idStr);


		let params = "";
		for (let l = 0; l < filterObj["params"].length; l++) {
			params += "'" + filterObj["params"][l] + "'";
			if (l < filterObj["params"].length - 1) {
				params += ",";
			}
		}

		let htmlFunc = filterObj["func"] + "(" + params + ")";
		let func = `csh.ttcm(); csh.uht('${idStr}'); ${htmlFunc}; csh.df('${idStr}');`
		//  let func = `csh.ttcm(); csh.uht('${idStr}'); ${func}(${params}); csh.df('${idStr}')`

		filterEle.setAttribute("onclick", func);
		filterEle.setAttribute("style", "text-wrap: nowrap; font-size: 16px; color: black;");
		filterEle.classList.toggle("tsrCsNgFilter");

		let html = ``;
		html += filterObj["label"];

		filterEle.innerHTML = html;


	}

	function updateHelpText(idStr) { // todo load content using url

		let filterObj = getFilterObjFromScrData(idStr);

		if (jsu.isNotNull(filterObj)) {
			var html = "";

			html += `<div>`
			html += `	<button type="button" class="btn btn-outline-primary btn-sm d-inline-flex align-items-baseline" data-bs-toggle="dropdown" aria-expanded="false">`
			html += `		<span class="me-2">${filterObj["label"]}</span>`
			html += `		<i class="fas fa-info-circle"></i>`
			html += `	</button>`
			html += `	<div class="dropdown-menu text-center p-3" style="height: 80%; overflow: auto;">`
			html += `		<div>`

			html += `			<img src="https://tutorials.topstockresearch.com/ChartPatterns/Triangles/TypesofTrianglesChartPatterns.png" class="img-fluid img-thumbnail" alt="...">`
			html += `		</div>`
			html += `		<div>`
			html += `			<p>`
			html += `				Some example text that's free-flowing within the dropdown menu.`
			html += `				Some example text that's free-flowing within the dropdown menu.`
			html += `			</p>`
			html += `		</div>`

			html += `	</div>`
			html += `</div>`
			htmlU.addMsgToDiv(infoBoxId, true, html);
		}
	}


	function getFilterObjFromScrData(idStr) {
		let idArr = idStr.split("_");
		let objArr = mtgv.cs.tabs;
		let filterObj = null;
		for (let i = 0; i < idArr.length; i++) {
			filterObj = jsu.getObjFrmArr(objArr, idArr[i]);
			let subMenu = filterObj["subMenu"];
			if (jsu.isNotNull(subMenu)) {
				objArr = subMenu;
			}
		}

		return filterObj;
	}

	function getFilterControlNg() { // todo add styles to btns

		var custBtnClass = 'btn btn-outline-dark border-0';

		var html = '';

		var func = scrAlias + '.' + 'screenNow';
		let tabindex = 1;


		html += '<div class="d-flex justify-content-evenly">'

		html += htmlU.getCusBtn('Run ', func, 'run', 'Run Screener', custBtnClass, 'fas fa-play', tabindex);

		// html += `
		// 			<button type="button" class="btn d-flex justify-content-evenly align-items-center" style="min-width: 100px;" onclick="${func}('run')">
		// 				<i class="fas fa-play"></i>
		// 				<span style="font-size: 16px;">Run</span>
		// 			</button>
		// `;

		html += `	<div class="vr"></div>`;

		html += htmlU.getCusBtn('Reset', func, 'reset', 'Reset Screener', custBtnClass, 'fas fa-undo', tabindex);
		// html += `
		// 			<button type="button" class="btn d-flex justify-content-evenly align-items-center" style="min-width: 100px;" onclick="${func}('reset')">
		// 				<i class="fas fa-undo"></i>
		// 				<span style="font-size: 16px;">Reset</span>
		// 			</button>
		// `;
		html += `	<div class="vr"></div>`;

		html += htmlU.getCusBtn('Save ', func, 'save', 'Save Screener', custBtnClass, 'fas fa-save', tabindex);
		// html += `
		// 			<button type="button" class="btn d-flex justify-content-evenly align-items-center" style="min-width: 100px;" onclick="${func}('save)">
		// 				<i class="fas fa-save"></i>
		// 				<span style="font-size: 16px;">Save</span>
		// 			</button>
		// `;

		html += `	<div class="vr"></div>`;

		html += htmlU.getCusBtn('Alert ', func, 'alert', 'Add Alert', custBtnClass, 'fas fa-bell', tabindex);
		// html += `
		// 			<button type="button" class="btn d-flex justify-content-evenly align-items-center" style="min-width: 100px;" onclick="${func}('alertNew)">
		// 				<i class="fas fa-bell"></i>
		// 				<span style="font-size: 16px;">Alert</span>
		// 			</button>
		// `;

		html += `	<div class="vr"></div>`;
		html += `
					<div class="d-flex justify-content-between align-items-center p-0">
						<label class="form-check-label" style="text-wrap: nowrap;" for="autoRefreshCheck">
							Auto Refresh
						</label>
						<input type="checkbox" class="form-check-input dropup ms-2" id="autoRefreshCheck" onchange="toggleCsAdvancedOptions()">
					</div>
		`
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
		// html +=  miscru.arcb() + 'Auto Refresh';
		html += `							<label class="form-check-label" style="text-wrap: nowrap;" for="dropdownCheck1">
												Auto Refresh
											</label>
											${miscru.arcb()}
										</div>
										<div id="csAutoRefDiv" class="mt-2" style="">

										</div>`
		html += `					</div>`

		// html += `					<hr style="margin: 0.5rem 0">`

		// html += miscru.srcb() + ' Stock Relevance';

		html += `
									<div class="mx-3">
										<div class="d-flex justify-content-between p-0">
											<label class="form-check-label" style="text-wrap: nowrap;"
												for="dropdownCheck2">
												Stock Relevance
											</label>
											${miscru.srcb()}
										</div>
										<div id="csstkRelDiv" class="mt-2" style="">
										</div>
									</div>
		`
		// html += `					<hr style="margin: 0.5rem 0">`

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

		// html += `					<hr style="margin: 0.5rem 0">`
		// html+= getCheckboxP('csBt' , 'csh.bt', null,'bt') // -- for backtest checkbox
		html += `					<div class="mx-3">
										<div class="d-flex justify-content-between p-0">
											<label class="form-check-label" style="text-wrap: nowrap;"
												for="dropdownCheck4">
												Backtest
											</label>
											${getCheckboxP('csBt', 'csh.bt', null, 'bt')}
										</div>
										<div id="backtestDiv" style="" class="mt-2">

										</div>
									</div>
				`
		html += `
								</div>
							</form>
						</div>
		`;


		html += `	</div>`
		html += `</div>`


		return html;
	}

	// DESKTOP CS NG code ends



	// HTML Creation Starts
	function opsCompTd(obj, def) {
		var id = obj.id;
		var func = 'csu' + '.' + def.func;

		var funcParam = id + PARAM_DELIM + def.id
		var html = htmlU.getDropDown(def.list, id + def.field, null, func, funcParam, obj.field)
		html += SP_3 + csh.opCompHtml(obj, func, funcParam);
		html += ' %';
		var param = def.id + ':' + id;
		html += SP_3 + csh.delIcon(param);


		// Dirty Implementation ... 
		if (obj.type == 'vatComp' || obj.type == 'vadComp') {
			html += BREAK_LINE;
			html += getSpan('Caution :  ', 'orange', 10);

			html += getSpan('Please use ' + doBold('Tick Volume Vs Hist Vol') + ' Option Button <i class="fas fa-long-arrow-alt-down"></i> Instead. This will be removed by 31st Mar', 'grey', 10);

		}



		return { td1: doBold(def.label), td2: html };
	}

	function opsCompRow(obj) {
		var def = getObjFrmArr(LIST_OPS_COMPARE, obj.type);
		var html = csh.dynTr(obj, opsCompTd(obj, def));
		var ctrl = jsu.getObjFrmArr(daily_tabs, def.csType);

		$('#' + ctrl.tab).append(html);
		csu.dsf(); // displaySelectedFields();
		return html;
	}

	function dynTr(obj, tds) {
		var html = '<tr id=' + obj.id + '>'
			+ createTd(createDiv(obj.id + 'Td1Div', tds.td1, null), CS_LABEL_WIDTH)
			+ createTd(createDiv(obj.id + 'Td2Div', tds.td2, null)) + '</tr>';
		return html;
	}

	function getBasicOpCompHtml(obj, func, funcParam, suffixPc, textBoxSize) {  // getBasicOpCompHtml

		var html = '';

		if (jsu.isNull(textBoxSize)) textBoxSize = 10;



		if (jsu.isNull(suffixPc)) suffixPc = '';

		var id = obj.id;
		if (jsu.isNull(funcParam)) funcParam = id;

		html += htmlU.getDropDown(BASIC_OPS, id + 'ops', null, func, funcParam, obj.ops);
		html += SP_3;
		if (isNotNull(obj.ops) && obj.ops == CS_BETWEEN) {
			html += getInputTxtParam(id + 'v1', textBoxSize, obj.v1, func, funcParam) + suffixPc;
			html += SP_3 + 'And' + SP_3
			html += htmlU.getInputTxtParam(id + 'v2', textBoxSize, obj.v2, func, funcParam) + suffixPc;
		} else if (isNull(obj.ops) || obj.ops == CS_NOT_SELECTED) {
			// html+=' You can screen '+aeebDef.label+' using > , = , <  or Between'
		} else {
			html += getInputTxtParam(id + 'v1', textBoxSize, obj.v1, func, funcParam) + suffixPc;
		}
		return html;
	}

	function getAebbHtml(csTypeId, ops, v1, v2) {
		// var csTypeId='csPrice';
		var func = 'csu.csAebbChg';
		var aeebDef = getObjFrmArr(AEBB_MAP, csTypeId);

		var obj = { id: csTypeId, ops: ops, v1: v1, v2: v2, csType: aeebDef.csType };
		var html = csh.opCompHtml(obj, func);
		return { label: aeebDef.label, ctrl: html };
	}

	function getAebbStructureHtml(csTypeId, labelWidth) {

		if (jsu.isNull(labelWidth)) labelWidth = CS_LABEL_WIDTH

		// var data = getAebbData(csTypeId); 
		var data = getObjFrmArr(mtgv.cs.screenerData.aebb, csTypeId);

		var tds = getAebbHtml(csTypeId, data.ops, data.v1, data.v2)

		var val = doBold(tds.label);

		var aeebDef = getObjFrmArr(AEBB_MAP, csTypeId);
		if (jsu.isNotNull(aeebDef.info)) {
			val += htmlU.getSpan(" (" + aeebDef.info + ")", 'grey', 8);
		}

		var val2 = tds.ctrl;
		if (jsu.isNotNull(aeebDef.postInfo)) {
			val2 += htmlU.getSpan(" (" + aeebDef.postInfo + ")", 'grey', 8);
		}



		var html = '<tr>' + createTd(val, labelWidth) + createTd(createDiv(csTypeId + 'Div', val2, null)) + '</tr>';
		return html;
		// html+= getAebbHtml(csTypeId ,data.ops,data.v1,data.v2 );			

		// return getAebbHtml(csTypeId ,data.ops,data.v1,data.v2 );		;
	}

	function getAebbStructureHtmlNg(contId, csTypeId, labelWidth) {

		if (jsu.isNull(labelWidth)) labelWidth = CS_LABEL_WIDTH

		// var data = getAebbData(csTypeId); 
		var data = getObjFrmArr(mtgv.cs.screenerData.aebb, csTypeId);

		var tds = getAebbHtml(csTypeId, data.ops, data.v1, data.v2)

		var val = doBold(tds.label);

		var aeebDef = getObjFrmArr(AEBB_MAP, csTypeId);
		if (jsu.isNotNull(aeebDef.info)) {
			val += htmlU.getSpan(" (" + aeebDef.info + ")", 'grey', 8);
		}

		var val2 = tds.ctrl;
		if (jsu.isNotNull(aeebDef.postInfo)) {
			val2 += htmlU.getSpan(" (" + aeebDef.postInfo + ")", 'grey', 8);
		}



		var html = '<tr>' + createTd(val, labelWidth) + createTd(createDiv(csTypeId + 'Div', val2, null)) + '</tr>';

		let container = document.getElementById(contId);
		container.innerHTML = html;
		// return html;


		// html+= getAebbHtml(csTypeId ,data.ops,data.v1,data.v2 );			

		// return getAebbHtml(csTypeId ,data.ops,data.v1,data.v2 );		;
	}

	// HTML Creation ENDS 
	function createDisplayText(obj, text, params, selParam, valid) {
		// Count of fields per tab .... // Bad Deign but at a quick Workaround.. 
		// Related with   CustScrUtil.validateFields
		let elem = jsu.getObjFrmArr(mtgv.cs.TabCount, obj.csType);

		if (elem == null) {
			elem = { id: obj.csType, count: 1, valid: true };
			mtgv.cs.TabCount.push(elem);
		} else {
			elem.count++;
		}

		if (!valid) elem.valid = false;

		// var text = 'Today\'s Volume ' +ops.label + ' than ' + pc.label  + ' Of ' + volperiod.label;

		var textColor = (mtgv.cs.ng) ? '#457dce' : 'green';

		if (!valid) textColor = 'red';

		if (obj.disabled) {
			text += SP_3 + createPlayIcon(selParam);
			textColor = 'grey';
		} else {
			text += SP_3 + createPauseIcon(selParam);
		}
		text += SP_3 + csh.editIcon(obj.csType, selParam)   //htmlU. getGlaf('fa fa-edit', 'grey', 14, 'func', 'param' , 'Edit')
			+ SP_3 + csh.delIcon(selParam) //  htmlU. getGlaf('fa fa-remove', 'red', 14, 'func', 'param', 'Delete'


		if (!mtgv.cs.ng) {

			TSR_HR; //'<hr/>';
		}

		if (valid) {
			if (!obj.disabled) params.validFieldCount++;


			if (mtgv.cs.ng) {


				let activeObj = jsu.getObjFrmArr(mtgv.cs.editActive, obj.id)

				if (activeObj == null) {  // Not to show label when elem is active ...

					// let tableElement = document.getElementById(CS_FILTERS_TABLE);

					// let rowObj = mintJsUtil.getObjFrmArr(allRows, obj.id);

					let tdDiv = obj.id + 'Td2Div';

					htmlU.addMsgToDiv(tdDiv, true, text, textColor, 14);

				}





			} else {
				params.validFields += getSpan(text, textColor, CS_SEL_FONT_SIZE);
			}

		} else {
			// params.validFieldCount++;
			params.invalidFields += getSpan(text, textColor, CS_SEL_FONT_SIZE);

			if (mtgv.cs.ng) {
				let tdDiv = obj.id + 'Td2DivFb';
				htmlU.addMsgToDiv(tdDiv, true, text, textColor, 14);
			}


			if (!obj.disabled) params.invalidFieldCount++;
		}

		// return { text: text , color : defTextColor , CS_SEL_FONT_SIZE};

	}

	function createPauseIcon(param) {
		return '<a  onClick="javascript:' + 'csu.pc(\'' + param + '\');"  title="Disable i.e. this filter will not be selected for Run"><font size="4" color="grey"><span class="fa fa-pause" ></span></font> </a> ';
	}

	function createPlayIcon(param) {
		return '<a  onClick="javascript:' + 'csu.ec(\'' + param + '\');"  title="Enable this filter for Run"><font size="4" color="green"><span class="fa  fa-play" ></span></font> </a> ';
	}

	function createDelIcon(param) {
		return '<a  onClick="javascript:' + 'csu.dr(\'' + param + '\');"  title="Delete Row"><font size="4" color="red"><span class="fa fa-remove fa-times" ></span></font> </a> ';
	}

	function createEditIcon(param, selParam) {

		let func = ''

		if (mtgv.cs.ng) {

			// var val = selParam.split(':');
			// var arr; 
			// var type = val[0];
			// var id = val[1];
			func = `csu.er('${param}','${selParam}' );`

		} else {
			func = `myTsrScreener.showControl('${param}','${selParam}' );`
		}

		let edit = `<a  onClick="javascript:${func}"  title="Edit (Change Value)"><font size="4" color="grey"><span class="fa fa-edit" ></span></font> </a> `
		return edit;

		// return '<a  onClick="javascript:'+'myTsrScreener.showControl(\''+param+'\');"  title="Edit (Change Value)"><font size="4" color="grey"><span class="fa fa-edit" ></span></font> </a> ';
	}


	// DIALOG HTML 
	function dialogHtml(type, data) {

		if (type == 'save') {
			// return saveDialog(type)
			return csmng.sd(type);
		} else if (type == 'alert') {
			return getAlertHtml();
		} else if (type == 'alertNew') {
			return getAlertNewHtml();
		} else if (type == 'publish') {
			return publishDialog(type)
		} else if (type == 'publishForUser') {
			return publishForuserDialog(type)
		} else if (type == 'showPubScr') {
			return showPubScrDialog(type)
		} else if (type == 'printPubScr') {
			// mtgv.cs.pubScr= data.results;			
			showPubScr()
		}

	}

	function getAlertNewHtml() {


		var freq = mintHtmlUtil.getInputVal('scrFreq');;

		var classiId = $('input[name=stkType]:checked').val();


		var sbAndCat = msbu.ua('getStockBasketAndCat', mtgv.mtpp.sblcfg.stkBsktCat, classiId);

		var alertParams = {
			src: 'custScr', alertName: '', stkType: 'sb',
			freq: freq, fbDiv: 'alertFbDivNg',
			custSettings: mtgv.cs.MY_SCR_SETTINGS,
			hideAlertTime: true, hideStkBasket: true, sbLabel: sbAndCat.stkBasket.label,
			modalDiv: "artnuDiv",
			title: 'Add New Alert'
		};

		let html = ''


		artngc.init(3, true, alertParams)

	}

	function showPubScrDialog() {

		var html = '';
		html += '<div style="padding:10px;" id="expertScrDiv">';
		html += '</div>';

		html += SMALL_BR;
		html += getButtonP('Close', 'mintHtmlUtil.divHide', 'cs_dialog');
		htmlU.csd('Choose an Expert Screener', html, null, null, 'cs_dialog', 'left', null);

		if (jsu.isNull(mtgv.pubScr)) {
			esu.init({ id: null, type: 'pps' })

		} else {
			showPubScr()
		}
	}

	function showPubScr() {

		var data = mtgv.pubScr;
		var html = '';
		html += '<h2>  Expert Published Screener</h2>'


		html += "<div class='row no-gutter'  >";


		for (var i = 0; i < PUBLISH_CAT.length; i++) {

			var scrType = PUBLISH_CAT[i];

			var records = [];

			for (var j = 0; j < data.length; j++) {

				if (data[j].category == scrType.id) {
					records.push(data[j]);
				}
			}

			if (records.length == 0) {
				continue;
			}

			html += BOOT_3COL;
			html += '<div style="box-shadow: 2px 2px grey; margin:4px; border: 1.25px solid  grey;border-radius:5px;border-color: grey; ">'

			html += '<h2 align="center">' + scrType.label + '</h2>';
			html += '<div  style="max-height: 150px;overflow-y: scroll;">'
			html += '<table  border="1" width="100%" class="table table-striped table-bordered table-responsive-lg" cellspacing="0"><tbody>'

			for (var j = 0; j < records.length; j++) {
				var func = onClick = "csh.spsd('display'  ,'" + records[j].id + "' ) ";


				html += '<tr><td ><a onClick="' + func + '" style="color:#007bff;" >' + records[j].name + '</a> </td></tr>';
			}

			// html+= '<tr><td > </td></tr>';
			html += '</tbody></table>';
			html += '</div>';

			html += '<div id ="' + scrType.id + 'Div" ></div>';


			html += '</div></div>';
		}



		html += '</div>'; // Row Div

		htmlU.addMsgToDiv('expertScrDiv', true, html);


	}
	function showPubScrDet(type, id) {

		var obj = jsu.getObjFrmArr(mtgv.pubScr, id);

		if ('display' == type) {
			var html = htmlU.doBold('Screener : ') + obj.name;
			html += BREAK_LINE;
			html += htmlU.doBold("Description : ");
			// html+= BREAK_LINE ;
			html += obj.desc;

			var param = 'apply' + PARAM_DELIM + id;

			html += BREAK_LINE;

			html += htmlU.doBold("Posted By : ") + obj.postedBy;
			html += BREAK_LINE;

			html += htmlU.doBold("Posted On : ") + obj.postDate;
			html += BREAK_LINE;


			html += htmlU.getButtonP('Apply', 'csh.spsd', param, 'Run ' + obj.name + ' Screener');  // label, func, param, toolTip


			html = '<div style ="' + DIV_STYLE_GREEN_BORDER + '">' + html + '</div>';

			htmlU.addMsgToDiv(obj.category + 'Div', true, html);
		} else {


			myTsrScreener.acss('expertScr', obj.Settings);

			var html = BREAK_LINE + htmlU.getSpan('Settings ' + obj.name + ' is applied is results refreshed', 'green');


			htmlU.addMsgToDiv('cstExpertScrTitleDiv', true, BREAK_LINE + '<h2> Expert Screener : ' + obj.name + '</h2>');

			htmlU.addMsgToDiv(obj.category + 'Div', false, html);

			htmlU.divHide('cs_dialog');
			// console.log(id);

		}


	}

	//	Print RESULTS ...
	function displayResults(response, id, remoteObject) {


		setPrevResults(mtgv.cs.response);
		mtgv.cs.response = response;

		var showNew = $('#showNewCb').is(":checked");


		displayResultsMyTsr(response, id, remoteObject, showNew, mtgv.cs.prevResults);

	}

	function setPrevResults(data) {
		mtgv.cs.prevResults = [];

		if (jsu.isNull(data)) {
			return;
		}

		// mtgv.cs.prevResults =  [];	

		if (data.statusCode == 'norecord' || data.results == null || data.results.length == 0) {
			return;
		}

		// mtgv.cs.prevResults =[];

		for (var i = 0; i < data.results.length; i++) {
			mtgv.cs.prevResults.push(data.results[i]);
		}

	}

	function displayResultsMyTsr(response, id, remoteObject, showNew, prevResults) {

		if (jsu.isNotNull(response.reportGenTime)) {
			mtgv.cs.reportGenTime = mintJsUtil.parseDatedd_MM_yyyy_HH_ss(response.reportGenTime);
		}

		let params = miscru.gfs(response.results, prevResults);

		let playSound = remoteObject.runType == 'auto';

		miscru.pr(response, params, false, 'Screener Results', playSound);

	}

	function stockRelChanged() {

		if (mtgv.cs.response == null) {
			myTsrScreener.screenNow('run');
			return;
		}


		let params = miscru.gfs(mtgv.cs.response.results, mtgv.cs.prevResults);

		miscru.pr(mtgv.cs.response, params, false, 'Screener Results', null);
	}

	function showSelectedFields() {

		let elem = document.getElementById('csSelFieldsDivWrapMobile')

		if (elem.style.display == 'block') {
			elem.style.display = 'none';
		} else {
			elem.style.display = 'block';
		}

		// htmlU.divShow('csSelFieldsDivWrapMobile')
	}


	return {
		// tabs : tabs

		// Html Creation
		initHtml: initHtml,

		// getFreqHtml : getFreqHtml,
		dynTr: dynTr,
		opsCompTd: opsCompTd,
		opsCompRow: opsCompRow,
		opCompHtml: getBasicOpCompHtml,

		aebbHtm: getAebbHtml,
		aebbStrut: getAebbStructureHtml,
		aebbStrutNg: getAebbStructureHtmlNg,
		df: disableFilter,
		ef: enableFilter,
		cd: clearDiv,
		uht: updateHelpText,
		smh: setMenuHeight,
		ttcm: toggleTsrCsMenu,
		sib: showInstrBox,
		gtdh: getTickDropdownHtml,

		cdt: createDisplayText,
		delIcon: createDelIcon,
		editIcon: createEditIcon,
		disableIcon: createPauseIcon,
		enableIcon: createPlayIcon,

		ssf: showSelectedFields,

		dht: dialogHtml,
		// Results ...
		dr: displayResults,


		drsn: displayResultsMyTsr,  // display result show New 
		spsd: showPubScrDet,

		src: stockRelChanged,

		bt: getBackTestDiv


	}

})(); // module 	



/*


function simulateCsChange() {
		  const simulateCsChange = document.getElementById("csAcFilter");

		  // Create a synthetic click MouseEvent
		  let evt = new MouseEvent("mousedown", {
			bubbles: true,
			cancelable: true,
			view: window,
		  });

		  // Send the event to the checkbox element
		  simulateCsChange.dispatchEvent(evt);
}

*/



