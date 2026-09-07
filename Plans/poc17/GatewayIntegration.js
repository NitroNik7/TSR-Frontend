

var miSuPgi = (function () { // Mi Subscription payment Gateway Integration

    let htmlU = mintHtmlUtil;
    let jsu = mintJsUtil;


    var SP_LOADING_DIV ='defLoadingDiv';
	
	var SP_FEEBBACK_DIV ='tsrPlanActionModalFbDiv';

	var MY_SP_URL = "/my/MyTsrData/SubPlanNg.tsr";

	var spData ={};


    function userAction(action, id, period, country, telPrefix, tel){

		
		if(action  =='NEW'  || action  =='UPGRADE'  || action  =='RENEW' 
		 	|| action  =='ALERT_PACK'  || action  =='BUY_AIO' ){
	
			var reqType = ''

			// if(action  =='packSel') reqType = 'spBuyNow';

			// if(action  =='packUpgrade') reqType = 'spUpgradeNow';		

			// if(action  =='packSmsEmail') reqType = 'spSmsEmailNow';		


			// if(action  =='packRenew') reqType = 'spRenewNow';		

			// if(action  =='buyAio') reqType = 'spBuyAio';		

			var referral = $('#referral').val();

			var payGate = htmlU. getRadioVal('payGate')



			let postData = {reqType : action , subType : id, period : period, referral : referral, payGate : payGate ,
				country : country, telPrefix : telPrefix , tel : tel

			}

			console.log( 'referral : ' + referral);


			var success =false;

			$.ajax({url: MY_SP_URL,type: "POST", data : postData,
				 success: function(result){
					if(result.statusCode ==MSG_STATUS_GOOD){

						console.log(' Result : ' + result);
						var formName =null;

						if (result.PG_TYPE =='PG_CCA'){
							formName = 'nonseamless';

							document.forms[formName]['access_code'].value = result.access_code;
							document.forms[formName]['encRequest'].value = result.encRequest;

							
						}else if(result.PG_TYPE =='PG_PAYU'){
							formName = 'payuform';
							document.forms['payuform']['key'].value = result.key;
							document.forms['payuform']['amount'].value = result.amount;
							document.forms['payuform']['txnid'].value = result.txnid;

							document.forms['payuform']['productinfo'].value = result.productinfo;
							document.forms['payuform']['firstname'].value = result.firstname;
							

							document.forms['payuform']['email'].value = result.email;
							document.forms['payuform']['phone'].value = result.phone;

							document.forms['payuform']['surl'].value = result.surl;
							document.forms['payuform']['furl'].value = result.furl;
								

							document.forms['payuform']['hash'].value = result.hash;
							document.forms['payuform']['udf1'].value = result.udf1;
							document.forms['payuform']['udf2'].value = result.udf2;

							

							// setTimeout( function() {submitForm('payuform')} , 50);

						}

						setTimeout( function() {submitForm(formName)} , 50);
							

					}else if(result.statusCode == MSG_STATUS_INVALID_VALUES){	

						addMsgToDiv(SP_FEEBBACK_DIV,true, BR_2 +BR_2 + doBold( result.statusMsg),'red',12); 
						// htmlU.focusToDiv('sfj');
/*

					}else if(result.statusCode == 'TrialApplied'){

						var html = 	 '<br/><br/>' +  result.statusMsg;
						mintHtmlUtil.addMsgToDiv(SP_FEEBBACK_DIV , true, html, 'green', 12);;
						addMsgToDiv('subBuyMsgDiv',true, BR_2 +BR_2 +doBold( html),'green',12); 			
						htmlU.focusToDiv('subBuyMsgDiv');
*/			

					}else{
						mintHtmlUtil.addMsgToDiv(SP_FEEBBACK_DIV , true, result.statusMsg, 'red', 12);;
						addMsgToDiv('subBuyMsgDiv',true, BR_2 +BR_2 +doBold( result.statusMsg),'red',12); 

					}				 	
				},error : function(xhr,status,error){  // error
				  	mintHtmlUtil.divHide(SP_LOADING_DIV);
				  	mintHtmlUtil.addMsgToDiv(SP_FEEBBACK_DIV , true, ERROR_MSG, 'red', 12);;
			}});



		}
	}


	function submitForm(fName){
		$('form#' + fName).submit();
	}



return {
		ua: userAction,
		
    }
})();