var csmng = (function () {  // my Ui Head


		var htmlU = mintHtmlUtil;
		var jsu = mintJsUtil;
		var cjs = mintStkCommon;

		var thisObject = 'csmng';

		var CS_MANAGE_DIV = 'csManageDiv';

		var USER_ACT_FNC = thisObject+ '.ua';


		function createSettingDropDown(type, MY_SCR_SETTINGS , id ){

			if(type == 'init'){
				$('#myScrSetting').empty();
				if(isNull(MY_SCR_SETTINGS) ||  MY_SCR_SETTINGS.length==0){
					$('#myScrSetting').append(getOption( 'none','No Availble Settings'));
					return;
				}
			}else{
				$('#myScrSetting').empty();
				$('#mysSettings').empty();
				if( isNull(MY_SCR_SETTINGS) || MY_SCR_SETTINGS.length==0){
					$('#myScrSetting').append(getOption( 'none','No Availble Settings'));
					$('#mysSettings').append(getOption( 'none','No Availble Settings'));
					return;
				}
			}
			$('#myScrSetting').append(getOption( 'none','My Settings'));
			for(var i=0;i<MY_SCR_SETTINGS.length;i++){
			        var setting = MY_SCR_SETTINGS[i];
			        var selected=false;
			        if( setting.id == id){
			            selected=true;
			        }
			        $('#mysSettings').append(getOption( setting.id,setting.Name,selected));
			        $('#myScrSetting').append(getOption( setting.id,setting.Name,selected));
		    }
		}

		function selectOneClassic(){
			var val = htmlU.getInputVal('myScrSetting');

			if(val== 'none') return;

			csmng.ua('run',val);
		}


		function selectOne(){

			if(jsu.isNotNull(event)){
				event.preventDefault();		
			}



			if(!inMyTsr && !jsu.isMigContext() && !pp){
				addMsgToDiv( CS_SCR_SB_FB_DIV, true, htmlU.getGlaf( 'fa fa-remove fa-times','black', 14, 'mintHtmlUtil.divHide', CS_SCR_SB_FB_DIV)  
				+ 'Option is Available in Premium View' , 'red' , 14); 
				return;
			}


		// 	setTimeout(function() {selectOneDelayed( ) } , 50); 
		// 	return;
		// }

		// function selectOneDelayed(){		

/*
			// $("#myScrSetting");
			// Create a synthetic click MouseEvent
			  let evt = new MouseEvent("onmouseout", {
			    bubbles: true,
			    cancelable: true,
			    view: window,
			  });

			  var myScrSettingElem = document.getElementById("myScrSetting");;

			  // Send the event to the checkbox element
			  myScrSettingElem.dispatchEvent(evt);
*/
/*
			$('#myScrSetting').find('option').each(function(index,element){
				element.style.display ='none';
				 // if(element.value ==id){
				 // 	elemExist = true;
				 // }
			 });
*/
			

			

			$("#cs_dialog").empty();
			var html=''

			html+='<table style="border: 0px;  style="width:100%;font-size:10px;min-width:500px; " cellpadding="3" cellspacing="0" width="100%" ><tr>';

			if(isMobile())  {
		        html+='<td width="15" class="cc_dialog_title align_right"><a onclick="javascript:HideDialog(\'cs_dialog\');" id="btnClose"> <font color=\'white\' size="4" ><span class=\'fa fa-remove fa-times\'></span></font></a> </td>';
		      }

		      html+='<td class="cc_dialog_title" align="center" >My Screener Settings</td>';
		      // html+='<td class="web_dialog_title align_right"><a href="javascript:fullScreen();" id="btnClose">FullScreen</a> </td>';
		      html+='<td width="15" class="cc_dialog_title align_right"><a onclick="javascript:HideDialog(\'cs_dialog\');" id="btnClose"> <font color=\'white\' size="4" ><span class=\'fa fa-remove fa-times\'></span></font></a> </td></tr>';
		      html+='</table>';

		      html+=htmlU.getLoadingDiv(CS_SAV_LDG_DIV,null);
        	  html+=htmlU.createEmptyDiv(CS_SAV_FB_DIV); 

		      html+='<div id="'+CS_MANAGE_DIV+'">';

		      html+= displaySettings();

		      html+='</div>';


		       $("#cs_dialog").append(html);
		      htmlU.divHide(CS_SAV_LDG_DIV);
		      // htmlU.divHide(CS_SAV_FB_DIV);

			  // $("#cs_dialog").fadeIn(300);
		       htmlU.divShow('cs_dialog');

			  if(!isMobile()){
			  	// $('#cs_dialog').draggable({ containment: "window" }); 
			}
			

			if(!isMobile()){
				var element = document.getElementById("myScrSetting");
				var bodyRect = document.body.getBoundingClientRect(),
				    elemRect = element.getBoundingClientRect(),
				    offsetTop   = elemRect.top - bodyRect.top,
				    offsetLeft   = elemRect.left - bodyRect.left -150;
				    ;
				    if(offsetLeft <20) offsetLeft = 20;

				    if(bodyRect.top < 0) {offsetTop   = elemRect.top }
				
				
				$("#cs_dialog").css("top",offsetTop +1);
		    	$("#cs_dialog").css("left",offsetLeft+1)    ;
			}


			disableTextBox();

			// document.getElementById('csAcFilter').select();
			  
			// $("#cs_dialog").focus();
			// htmlU.focusToDiv('cs_dialog');

			// $('html, body').transition({ scrollTop: $('#cs_dialog').offset().top }, 'fast');
			// $("#myScrSetting").blur();
			// $("#cs_dialog").css('min-width','500px')
			$("#cs_dialog").css("overflow", 'scroll');
			$("#cs_dialog").css("height", "auto");
			return true;

		}

		function disableTextBox(){
			var mysettings = mtgv.cs.MY_SCR_SETTINGS;

			if(jsu.isNotNull(mysettings) ){
				 for(var i=0;i<mysettings.length;i++){
                    var setting = mysettings[i];
				 	$('#SettingId'+setting.id).prop('disabled', true); //'SettingId'+setting.id
				}
			}
		}

		function setDisplaySettigs(){
			var html =displaySettings();

			htmlU.addMsgToDiv( CS_MANAGE_DIV, true, html );

			disableTextBox();

		}


		function displaySettings(){

			// onmousedown

			var html =''

			var mysettings = mtgv.cs.MY_SCR_SETTINGS;

			if(jsu.isNull(mysettings) || mysettings.length==0){

				return '<h5>You are yet to create any setting. Please use Save Button to create one</h5>'; 
			}

			var fields =[];
			var cols = null;
			if(isMobile()){
				 cols = [ 'Settings' , ' Run', '  Modify', '  Delete'];
        	}else{
        		cols = [ 'Settings' , '| Run', ' | Modify', ' | Publish', ' | Delete'];
        	}

			fields.push(cols);

			for(var i=0;i<mysettings.length;i++){
                    var setting = mysettings[i];
                    var id= 'SettingId'+setting.id;
                    var func = USER_ACT_FNC;


                    var  runGlf =     htmlU.getGlaf('fa fa-play'  , 'green', 16,  func, 'run'+PARAM_DELIM+  setting.id,'Apply Setting & Run');
                    var  updateGlf =   htmlU.getGlaf('far fa-edit'  , null, null, func,'showEdit'+PARAM_DELIM+setting.id,'Update Name');
                    var  publishGlf =   htmlU.getGlaf('fab fa-telegram-plane'  , null, null, func,'showpub'+PARAM_DELIM+setting.id,'Publish Settings');
                    var  delGlf =   htmlU.getGlaf('fas fa-trash-alt'  , 'red', null, func,'showDel'+PARAM_DELIM+setting.id,'Delete Settings');

                    // getSpanGlyphiconLink(gly, color, size, func, param, title){

                    if(isMobile()){
                    	cols = [ getInputTxt(id,30  ,setting.Name,null)+SP_3 ,  runGlf , updateGlf  , delGlf ];
                    }else{
	                    cols = [ getInputTxt(id,30  ,setting.Name,null)+SP_3 ,  runGlf , updateGlf , publishGlf , delGlf ];
                    }


                    fields.push(cols);

                }


                html+= htmlU.createTsrTableDiv(fields, 'center');



			// html+= '<table id="csManageTab" '+TAB_INDI_STYLE+'   >';

			// for(var i=0;i< mySettings.length;i++){

			// 	html+='<tr>'  ;



			// 	html+='</tr>'  ;				
			// }


			// html+= '</table>'

			return html;
		}





		function saveDialog(){


			if(jsu.isMigContext() || inMyTsr || pp){
			}else{
				addMsgToDiv( CS_SCR_CTRL_FB_DIV, true, htmlU.getGlaf( 'fa fa-remove fa-times','black', 14, 'mintHtmlUtil.divHide', CS_SCR_CTRL_FB_DIV)  
				+ 'Option is Available in Premium View' , 'red' , 14); 
				return;
			}


			var html ='';	
			html+=htmlU.getLoadingDiv(CS_SAV_LDG_DIV,null);
	       	html+=htmlU.createEmptyDiv(CS_SAV_FB_DIV); 


	       	html+= '<div align="center">'+ getInputTxt( 'setName' , 35, 'Setting Name') ;

	       	html+= BR_2;

	       	html+= getButtonP( 'Create','myTsrScreener.sss','sav') +'</div>';

	       	html+=BR_2;

			html+=  htmlU.createLink('javascript:'+thisObject+'.so()' , 'View My Settings' );

			html+= '</div>';

	       	htmlU.ccd('Save Settings' , html , null, null, 'cs_dialog','left', null);

	       	htmlU.divHide(CS_SAV_LDG_DIV);
		}

/*

		function saveDialog(type){

			var controlWidth = 500;
			$("#cs_dialog").empty();
			var html='';
		        if(isMobile()){
		            html+='<table style=" border: 0px;width:100%;px;font-size:10px" cellpadding="3" cellspacing="0"><tr>';
		        }else{
		            html+='<table style="border: 0px;  style="width:100%;font-size:10px" cellpadding="3" cellspacing="0" width="100%" ><tr>';
		        }

		      
		      if(isMobile())  {
		        html+='<td width="15" class="cc_dialog_title align_right"><a onclick="javascript:HideDialog(\'cs_dialog\');" id="btnClose"> <font color=\'white\' size="4" ><span class=\'fa fa-remove fa-times\'></span></font></a> </td>';
		      }

		      html+='<td class="cc_dialog_title" align="center" >My Screener Settings</td>';
		      // html+='<td class="web_dialog_title align_right"><a href="javascript:fullScreen();" id="btnClose">FullScreen</a> </td>';
		      html+='<td width="15" class="cc_dialog_title align_right"><a onclick="javascript:HideDialog(\'cs_dialog\');" id="btnClose"> <font color=\'white\' size="4" ><span class=\'fa fa-remove fa-times\'></span></font></a> </td></tr>';
		      html+='</table>';

		      if(type=='save'){
		      	html+= getSaveHtml();	
		      }
		      


		      $("#cs_dialog").append(html);
		      divHide(CS_SAV_LDG_DIV);
		      divHide(CS_SAV_FB_DIV);

			  $("#cs_dialog").fadeIn(300);

			  if(!isMobile()){
			  	$('#cs_dialog').draggable({ containment: "window" }); 
				}

		}





		function getSaveHtml(){

			var mySettings = mtgv.cs.MY_SCR_SETTINGS;

			var html = '';

	        html+='<div style="padding:10px;" id="SaveDiv">';


	        // html+=  '<div align="center"><b>Setting Name</b></div>';

	        // html+=getInputTxt( 'setName' , 40, 'Setting Name') ;

	        html+= '<div >'+ getInputTxt( 'setName' , 35, 'Setting Name') +SP_2+ getButtonP( 'Create','myTsrScreener.sss','sav') +'</div>';

	        // html+= BREAK_LINE;

	        // html+=  '<div align="center"><b>OR</b></div>';
	        html+='<hr/>';

	        var mycSettingsHtml = '<select style="width:300px;" id="mysSettings" ><option value="none">My Settings</option>';

	       if(mySettings!=null){
	            for(var i=0;i<mySettings.length;i++){
	            	var set = mySettings[i];

	            	if(jsu.isNotNull(set.Settings) ){
	            		if(   set.Settings.scrFreq in FREQ_CONVR_MAP){
	            			set.Settings.scrFreq = FREQ_CONVR_MAP[set.Settings.scrFreq ];
	            		}
	            	}
	               
	                mycSettingsHtml+=getOption(set.id,set.Name);
	            }
	        }
	 
	        mycSettingsHtml+= '</select>';

	        html+=mycSettingsHtml + SP_2+  getButtonP( 'Update','myTsrScreener.sss','upd');

	        html+='</div>';
	        html+=getLoadingDiv(CS_SAV_LDG_DIV,null);
	        html+=createEmptyDiv(CS_SAV_FB_DIV); 
	        // html+=  '<div align="center"><b>OR</b></div>';
	         html+='<hr/>';
		

	        html+=createEmptyDiv(CS_VIEW_MY_SET_DIV); 
	        // html+=BREAK_LINE;

	        

	        html+=createDiv('ManageSetDiv', getButtonP( 'Manage My Settings','myTsrScreener.sss','view')   
	        	+ SP_2 + getButtonP( 'Close','HideDialog','cs_dialog')
	        	);

	        // html+=  ;
	        html+=BREAK_LINE;	
	        return html;
		}

*/

		function userAction(type, id){

			if(type=='run'){
				$('#'+CS_FILTERS_TABLE).empty();
				csh.sib(false);

				applyUserSetting(id);
			}else if(type=='showEdit'){
				showEdit(id);
			}else if(type=='showDel'){
				showDelete(id);
			}else if(type=='showpub'){
				showPublish(id);
			}else if(type=='sds'){
				setDisplaySettigs();
			}else if(type=='usn'){
				updateSettingName(id);
			}else if(type=='upd'){
				updateSetting(id);
			}else if(type=='usd'){
				userSettingDelete(id);
			}else if(type=='pub'){
				publishSettings(id);
			}else if(type=='publishForUser'){
				publishForUser(id, type);
			}
		}

		function showEdit(id){

			var setting = getSetting(id);

			if( jsu.isNull(setting ) ){
				return notFoundOption();
			}

			var html = '<div align="center" class="miCtrl" style="margin:10px;">'

			// html += '<h4>Selected Setting </h4> '
			html += 'Setting : ' +doBold( setting.Name)
			html+=	TSR_HR;
			html+= getInputTxt('csSetName',30  ,setting.Name,null)

			html+=BR_2;
			// html += getInputTxt(id,30  ,setting.Name,null)			

			html+=htmlU.getButtonP('Update Name' , USER_ACT_FNC, 'usn' +PARAM_DELIM +id, 'Update Setting Name');
			
			html+='<h3>OR</h3>'

			html+=htmlU.getButtonP('Update With Current Filters' , USER_ACT_FNC, 'upd' +PARAM_DELIM +id, 'Update With Current Filters');

			html+=BR_2;

			html+=  getDisplaySettingButton();

			html+='</div>';

			htmlU.addMsgToDiv(CS_MANAGE_DIV, true, html);

		}


		function showDelete(id){

			var setting = getSetting(id);

			if( jsu.isNull(setting ) ){
				return notFoundOption();
			}

			var html = '<div align="center" class="miCtrl" style="margin:10px;">';

			html += 'Setting : ' +doBold( setting.Name)
			html+=TSR_HR;
			// html+=  doBold( setting.Name)

			html+=BR_2;
			html += 'Are You Sure you want to Delete? '			
			html+=BR_2;
			html+=htmlU.getButtonP('Yes, Delete' , USER_ACT_FNC, 'usd' +PARAM_DELIM +id, 'Delete Setting');
			html+=BR_2;

			html+=  getDisplaySettingButton();

			html+='</div>';

			htmlU.addMsgToDiv(CS_MANAGE_DIV, true, html);

		}

		function showPublish(id){

			var intUser = mtgv.mtpp.int;

			if(!intUser && ( jsu.isMigContext() || pp) ){

				var html = "<div align='center'>We are sorry <br/>Publish is not yet supported.</div>";

				html+=BR_2;

        		html+=  getDisplaySettingButton();


				htmlU.addMsgToDiv(CS_MANAGE_DIV, true, html ,'orange' , 14);
				return;
			}


			var setting = getSetting(id);

			if( jsu.isNull(setting ) ){
				return notFoundOption();
			}

			
			var eligibleForPub = false;


			if(!intUser){
				try {
			        var refCode = userProf.refCode;

			        if(refCode.length ==7){
			        	eligibleForPub = true;
			        }
			      } catch {
			         // object may not be defined...
			      }
			}




			var html = '<div id="pub4userDiv" >' + '<div align="center" class="miCtrl" style="margin:10px;">';

			html += 'Setting : ' +doBold( setting.Name)
			html+=TSR_HR;

			 html+= 'Name ' +  htmlU.getInputTxt('name' , 40, setting.Name, null);
	        html+= SMALL_BR ; 
	        html+=TSR_HR;

	        html+= 'Brief Description';
	        html+= SMALL_BR ;
	        html+= '<textarea id="pubDesc" name="pubDesc" rows="4" cols="50"> </textarea>'
	        html+= SMALL_BR ; 
	        html+=TSR_HR;

	        if(eligibleForPub || intUser ){
	        	html += doBold( 'PUBLISH FOR USERS')
	     		html+=BR_2;
	     		html+= 'Email : ' +  htmlU.getInputTxt('email' , 40, null, null);
		        html+= SMALL_BR ; 
		        html+=TSR_HR;
		        html+= htmlU.getButtonP( 'Publish For User',USER_ACT_FNC,'publishForUser'+PARAM_DELIM +id, 'Publish For User');
	        }else{

	        	if(jsu.isMyContext()){

		        	html+= 'Category ' +  htmlU.getDropDown(PUBLISH_CAT, 'pubCat');
			        html+= SMALL_BR ; 
			        html+=TSR_HR;

		    	    html+= htmlU.getButtonP( 'Publish Strategy',USER_ACT_FNC,'pub'+PARAM_DELIM +id, 'Publish Strategy');
		    	    html+= SMALL_BR ;
		     		html+= htmlU.getSpan("Once this strategy is published it will be available to all users." , 'orange', 10);
			 		 
		     		html+=BR_2;


		     		if(mtgv.mtpp.int  ){
			     		html += doBold( 'PUBLISH FOR USERS')
			     		html+=BR_2;
			     		html+= 'Email : ' +  htmlU.getInputTxt('email' , 40, null, null);
				        html+= SMALL_BR ; 
				        html+=TSR_HR;
				        html+= htmlU.getButtonP( 'Publish For User',USER_ACT_FNC,'publishForUser'+PARAM_DELIM +id, 'Publish For User');

			        }
		    	}
	    	}


	        
	        html+=BR_2;

	        html+='</div>'; // pub4userDiv div ...

        	html+=  getDisplaySettingButton();

			html+='</div>';

			htmlU.addMsgToDiv(CS_MANAGE_DIV, true, html);


		}



		function getSetting(id){
			var mysettings = mtgv.cs.MY_SCR_SETTINGS;

			var setting = jsu.getObjFrmArr(mysettings, id);

			return setting;
		}

		function notFoundOption(){
			var html=''
			html+= '<h4>Opps we could not find the setting</h4>';
			html+=  getDisplaySettingButton();

			htmlU.addMsgToDiv(CS_MANAGE_DIV, true, html);

		}


		function getDisplaySettingButton(){
			return htmlU.getButtonP("Back to My Settings" , thisObject+'.ua', 'sds' , "Back to My Settings" );;
		}

		function applyUserSetting(id){

			var mysettings = mtgv.cs.MY_SCR_SETTINGS;

			createSettingDropDown('ddRun', mysettings, id);	

			myTsrScreener. acss();

			htmlU.divHide('cs_dialog');
		}

		function updateSettingName(id){ // update Setting Name..
	        var name=getInputVal('csSetName');
	        var pd = {'id': id, name :name, action:'updateName'}
	            var rc =  new RC( SS_URL, null,pd, CS_SAV_LDG_DIV, CS_SAV_FB_DIV, 'myTsrScreener','ass', 'usn');
	            myTsrUtils.rc(rc);
	    }

	    function updateSetting(id){

	    	var selObjs = csos.getSelObjs('save');
			var json =  JSON.stringify(selObjs);
			var name=getInputVal('csSetName');

	    	var pd = {'setting': json, id :id, action:'update', name :name}
            var rc =  new RC( SS_URL, null,pd, CS_SAV_LDG_DIV, CS_SAV_FB_DIV, 'myTsrScreener','ass', 'upd');
            myTsrUtils.rc(rc);
	    }


	    function userSettingDelete(id){ // delete Setting Name..
	        var name=getInputVal('SettingId'+id);
	        var pd = {'id': id,  action:'delete'}
	            var rc =  new RC( SS_URL, null,pd, CS_SAV_LDG_DIV, CS_SAV_FB_DIV, 'myTsrScreener','ass', 'usd');
	            myTsrUtils.rc(rc);
	    }




	    function publishSettings(id){


	    	var setting = getSetting(id);
	    	var json =  JSON.stringify(setting.Settings);

	    	var name = getInputVal('name');
			var pubCat = getInputVal('pubCat');
			var pubDesc = getInputVal('pubDesc');

			if(jsu.isNull(name) || name.length < 5){

				htmlU.addMsgToDiv(CS_SAV_FB_DIV, true,'Please enter a valid name. Length should be between 5 to 100 Characters', 'red', null);
				return;
			}			

            var pd = {'setting': json, name :name, pubCat : pubCat,    action:'publish' , pubDesc : pubDesc}
            var rc =  new RC( SS_URL, null,pd, CUS_DIAL_LD_DIV, CS_SAV_FB_DIV, 'myTsrScreener','ass', 'publish');
            myTsrUtils.rc(rc);	

	    }

	    function publishForUser(id, type){
	    	var setting = getSetting(id);
	    	var json =  JSON.stringify(setting.Settings);

	    	var name = getInputVal('name');
			var email = getInputVal('email');

			if(jsu.isNull(name) || name.length < 5){

				htmlU.addMsgToDiv('csFbDiv', true,'Please enter a valid name. Length should be between 5 to 100 Characters', 'red', null);
				return;
			}			

            var pd = {'setting': json, name :name, email : email,    action:type }
            var rc =  new RC( SS_URL, null,pd, CUS_DIAL_LD_DIV, CS_SAV_FB_DIV, 'myTsrScreener','ass', type);
            myTsrUtils.rc(rc);		

	    }


	    function userActionResponse(){

		}


	    // function settingMouseUp(){
	    // 	console.log('mouse up called ...');
	    // }


		return 	{
			so : selectOne,
			soc : selectOneClassic,

			sd : saveDialog,
			csdd : createSettingDropDown,

			ua : userAction,
			uar : userActionResponse


			// aus : applyUserSetting, 
			// usd : userSettingDelete,
			// usn : updateSettingName,
			// pus : publishUsersettings,


			// smu : settingMouseUp
			
			

		}

})(); 
