
var showSocialmedia = false;


var mitsru = (function () {

	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;
	var usrDt = {};

	let thisObject = 'mitsru';
	let initGoogle = false;



	var NEW_REGISTRATION = getMyTsrUrl() + '/usr/NewRegistration.tsr';
	var LOGIN_URL = getMyTsrUrl() + '/usr/login.tsr';
	var FORGOT_PWD_URL = getMyTsrUrl() + '/usr/ForgotPwd.tsr';
	var EDIT_REGISTRATION = getMyTsrUrl() + '/usr/EditRegistration.tsr'


	var REGISTER = 'register';
	var LOGIN = 'login';
	var FORGOT_PASS = 'forgotPass';
	var EDIT_USER = 'editUser';





	var GOOGLE_SIGN_IN_DIV = 'GoogleSignInDiv';  // 
	var GOOGLE_REG = 'registerWithGoogle';


	let tsrLogo = jsu.getStaticUrl() + '/v21/img/tsr/TsrLogo.png';

	let preCaution = jsu.getStaticUrl() + '/img/caution/HindiEngPrecaution.png';

	let disclaimer = 'www.topstockresearch.com/Disclaimer.html';

	let initFnc = thisObject + '.init';

	var USER_FB_DIV = 'userFeedback';

	var INVALID_CAPTCHA = 'Please Enter Image Values. Click on change Image if image is not legible';


	var usrDt = {};


	function init(modalType) {

		// if (!initializeGoog) {
		// 	initializeGoog();
		// }

		if (typeof usrData != 'undefined' && usrData != null) {
			modalType = EDIT_USER;
		}

		updateUserRegModal(modalType);
	}

	// User Action Submit flow starts
	// ------------------------------------------

	function userActionSubmit(type) {
		if (type == LOGIN) {
			loginSubmit(type);
		} else if (type == REGISTER) {
			registerSubmit(type);
		} else if (type == FORGOT_PASS) {
			forgotPassSubmit(type);
		} else if (type == EDIT_USER) {
			editUserSubmit(type);
		}
	}

	function loginSubmit(type) {
		clearCommonFbDiv();

		var email = htmlU.getInputVal('Email');
		var pass = htmlU.getInputVal('Password');
		var captcha = htmlU.getInputVal('captcha');

		let PASS_FB_DIV = "passFbDiv";


		if (!validateEmail('register')) {
			htmlU.addMsgToDiv(USER_FB_DIV, true, 'Please enter Valid mail Id.', 'red');
			return false;
		}
		if (!passChange('pass')) {
			htmlU.addMsgToDiv(USER_FB_DIV, true, 'Password field does not meet criteria.', 'red');
			return false;
		}
		if (jsu.isNull(captcha) || captcha.length != 6) {
			htmlU.addMsgToDiv(USER_FB_DIV, true, INVALID_CAPTCHA, 'red');
			return false;
		}



		var data = {
			email: email, email2: email, pass: pass, screenName: null, fName: null, lName: null, mName: null, sal: null, add1: null, add2: null, city: null, country: null, pin: null, tel: null, dob: null, state: null, workPlace: null, role: null, linky: usrDt.linky, captcha: captcha, blogUrl: null, aboutMe: null, signature: null
		};

		var pd = { userParams: JSON.stringify(data), action: type };

		// var subDomain = jsu.getSubDomain(); 
		// pd.subdee =subDomain;


		var rc = new RC(LOGIN_URL, null, pd, 'loadingDiv', USER_FB_DIV, thisObject, 'umRes', type);

		// if(!nonModal){
		//     rc.xhrFields = {withCredentials: true};
		// }

		myTsrUtils.rc(rc);
		return false;
	}

	function registerSubmit(type) {
		clearCommonFbDiv();

		var email = htmlU.getInputVal('Email');
		var pass = htmlU.getInputVal('Password');
		var captcha = htmlU.getInputVal('captcha');
		var fname = htmlU.getInputVal('FirstName');
		var lname = htmlU.getInputVal('LastName');

		var countryCode = htmlU.getInputVal('CountryCode');
		var tel = htmlU.getInputVal('PhnNumber');

		let PASS_FB_DIV = "passFbDiv";

		if (!validateEmail('register')) {
			htmlU.addMsgToDiv(USER_FB_DIV, true, 'Please enter valid Email Id.', 'red');
			return false;
		}

		if (!passChange('pass')) {
			htmlU.addMsgToDiv(PASS_FB_DIV, true, 'Password Should be at least 5 Characters..', 'red');
			return;
		}


		if (jsu.isNull(fname) || fname.length == 0) {
			htmlU.addMsgToDiv(USER_FB_DIV, true, 'Please enter Your First Name', 'red');
			return false;
		}

		if (!jsu.isNull(tel) && !isValidPhoneNumber(tel)) {
			htmlU.addMsgToDiv(USER_FB_DIV, true, 'Please enter a valid Phone number', 'red');
			return false;
		}

		if (jsu.isNull(captcha) || captcha.length != 6) {
			htmlU.addMsgToDiv(USER_FB_DIV, true, INVALID_CAPTCHA, 'red');
			return false;
		}


		// if (!valiCreateEdit(data)) {
		// 	return;
		// }

		var data = {
			email: email, email2: email, pass: pass, screenName: fname, fName: fname, lName: lname, mName: null,
			sal: null, add1: null, add2: null, city: null, country: countryCode, pin: null, tel: tel, dob: null, state: null, workPlace: null, role: null, linky: usrDt.linky, captcha: captcha, blogUrl: null, aboutMe: null, signature: null
		};


		var pd = { userParams: JSON.stringify(data), action: type };
		var rc = new RC(NEW_REGISTRATION, null, pd, 'loadingDiv', USER_FB_DIV, thisObject, 'umRes', type);

		// var subDomain = jsu.getSubDomain(); 
		// pd.subdee =subDomain;
		// if(!nonModal){
		//     rc.xhrFields = {withCredentials: true};
		// }
		myTsrUtils.rc(rc);
	}

	function forgotPassSubmit(type) {
		clearCommonFbDiv();
		var email = htmlU.getInputVal('Email');

		var captcha = htmlU.getInputVal('captcha');

		if (!validateEmail('register')) {
			htmlU.addMsgToDiv(USER_FB_DIV, true, 'Please enter Valid mail Id.', 'red');
			return false;
		}

		if (jsu.isNull(captcha) || captcha.length != 6) {
			htmlU.addMsgToDiv(USER_FB_DIV, true, INVALID_CAPTCHA, 'red');
			return false;
		}

		var data = {
			email: email, email2: email, pass: null, screenName: null, fName: null, lName: null, mName: null, sal: null, add1: null, add2: null, city: null, country: null, pin: null, tel: null, dob: null, state: null, workPlace: null, role: null, linky: usrDt.linky, captcha: captcha, blogUrl: null, aboutMe: null, signature: null
		};


		var pd = { userParams: JSON.stringify(data), forgot: true, action: type };
		var rc = new RC(FORGOT_PWD_URL, null, pd, 'loadingDiv', USER_FB_DIV, thisObject, 'umRes', type);

		// if(!nonModal){
		//     rc.xhrFields = {withCredentials: true};
		// }

		myTsrUtils.rc(rc);
		return false;
	}

	function editUserSubmit(type) {
		clearCommonFbDiv();

		var email = htmlU.getInputVal('Email');
		var fname = htmlU.getInputVal('FirstName');
		var lname = htmlU.getInputVal('LastName');

		// email, fname, lname validation skipped as fields are disabled

		var tel = htmlU.getInputVal('PhnNumber');

		let countryCode = htmlU.getInputVal('CountryCode');
		let stateSelect = htmlU.getInputVal('StateSelect');
		let postalCode = htmlU.getInputVal('PostalCode');


		if (jsu.isNull(tel) || !isValidPhoneNumber(tel)) {
			htmlU.addMsgToDiv(USER_FB_DIV, true, 'Please enter a valid Phone number', 'red');
			return false;
		}

		if (jsu.isNull(countryCode) || jsu.isNull(stateSelect) || jsu.isNull(postalCode)) {
			htmlU.addMsgToDiv(USER_FB_DIV, true, "One or more mandatory fields are missing", 'red');
			return false;
		}

		var data = {
			email: email, email2: email, pass: null, screenName: null, fName: fname, lName: lname, mName: null, sal: null, add1: null, add2: null, city: null, country: countryCode, pin: postalCode, tel: tel, dob: null, state: stateSelect, workPlace: null, role: null, linky: usrDt.linky, captcha: null, blogUrl: null, aboutMe: null, signature: null
		};

		var pd = { userParams: JSON.stringify(data), action: 'fromPlan' };
		var rc = new RC(EDIT_REGISTRATION, null, pd, 'loadingDiv', 'userFeedback', thisObject, 'umRes', type);
		myTsrUtils.rc(rc);
	}


	function validateEmail(type) {
		if (type == 'register') {
			var email = htmlU.getInputVal('Email');

			if (jsu.isNull(email) || !isValidEmail(email)) {
				htmlU.addMsgToDiv('emailFbDiv', true, 'Please enter Valid mail Id.', 'red'); // For SPC
			}
			else {
				htmlU.emptyDiv(USER_FB_DIV);
				return true;
			}
		}
		htmlU.addMsgToDiv(USER_FB_DIV, true, 'Please enter Valid mail Id.', 'red'); // For SPC

		return false;
	}

	// TODO
	// function validatePass(id) {

	// 	var val = htmlU.getInputVal('Password');
	// 	if (!jsu.isNull(val) && val.length >= 5) {
	// 		return true;
	// 	}


	// 	htmlU.addMsgToDiv(USER_FB_DIV, true, 'Please enter min 5 characters for password. We recommend Alphanumeric with Special Character', 'red');
	// 	return false;
	// }

	function passChange(id) {
		// var div = id + 'Div';
		// var val = null;
		// if (id == SPC) {  /// Dirty hack for now till pass is sttandardized
		// 	div = 'passFbDiv';
		// 	val = htmlU.getInputVal('pass');
		// } else {
		// 	val = htmlU.getInputVal(id);
		// }

		var val = htmlU.getInputVal('Password');

		let PASS_FB_DIV = "passFbDiv";

		if (jsu.isNull(val) || val.length < 5) {
			htmlU.addMsgToDiv(PASS_FB_DIV, true, 'Please enter min 5 characters for password. We recommend Alphanumeric with Special Character', 'red');
			return false;
		}

		htmlU.emptyDiv(PASS_FB_DIV);
		return true;
	}

	function clearCommonFbDiv() {
		htmlU.emptyDiv(USER_FB_DIV);
	}


	function isValidPhoneNumber(tel) {
		if (Number(tel) != NaN && Number(tel) >= 0 && Number.isInteger(Number(tel))) {
			return true;
		}

		return false;
	}

	// -------------------------------------------
	// User Action Submit flow ends

	// Shows User pass
	function showUserAccPassword(e, id) {

		let showPswdBtn = e.currentTarget;

		let passwordField = document.getElementById(id);
		let passwordFieldType = passwordField.getAttribute('type');

		if (passwordFieldType == 'password') {
			passwordField.setAttribute('type', 'text');
			showPswdBtn.innerHTML = '<i class="far fa-eye-slash"></i>';
		}
		else {
			passwordField.setAttribute('type', 'password');
			showPswdBtn.innerHTML = '<i class="far fa-eye"></i>';
		}

		e.stopImmediatePropagation();
	}



	function updateUserRegModal(modalType) {
		// console.log(' modalType ' + modalType)
		switch (modalType) {
			case 'editUser':
				document.getElementById("tsrUserRegModalContent").innerHTML = getUserDetailsModal();
				break;
			case 'userReg':
				document.getElementById("tsrUserRegModalContent").innerHTML = getUserRegModalHtml();
				// renderGsiButtons("GoogleSignIn");
				
					initializeGoog();
				

				break;
			case 'userForgotPswd':
				document.getElementById("tsrUserRegModalContent").innerHTML = getUserForgotPasswordModalHtml();
				break;
			default:
				document.getElementById("tsrUserRegModalContent").innerHTML = getUserLoginModalHtml();
				// renderGsiButtons("GoogleSignIn");


					initializeGoog();
				

				break;
		}

		changeImage();
	}


	function handleCredentialResponse(response) {
		console.log(response.credential);
	}

	function getUserLoginModalHtml() {

		// let id = "tsrUserLogin";
		let id = "";

		let html = "";

		html += `    <!-- Login Modal -->
	                <div class="modal-header">
	                    <div class="nav-logo" id="navLogoDiv">
	                        <div class="logo logo-dark"
	                            style="background-image: url(${tsrLogo})">
	                        </div>
	                    </div>
	                    <h1 class="modal-title fs-5 ms-3">
	                        Welcome to TSR Family

	                        <!-- <span style="color: #0d6efd;">Top Stock Research</span> -->
	                    </h1>

	                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	                </div>
	                <div class="modal-body">
	                    <div class="d-flex justify-content-center">
	                        <span style="font-weight: 500; font-size: 18px;">Login</span>
	                    </div>
	                    <br>

	                    <!-- TODO -->
	                    <div id="${id + GOOGLE_SIGN_IN_DIV}" align="center" style="scale: 115%;">

	                    </div>
	                    <br>
	                    <div class="miVertDivider d-flex w-100">
	                        <div class="miVertLine"></div>
	                        <div class="fw-300 fs-16 mx-3">or</div>
	                        <div class="miVertLine"></div>
	                    </div>`

		html += `<form class="mt-3" id="${id + "Form"}">

	                        <div class="input-group mb-3">
	                            <span class="input-group-text">
	                                <i class="far fa-envelope"></i>
	                            </span>

	                            <input type="email" class="form-control" id="${id + "Email"}" placeholder="Email Address"
	                                required>
	                        </div>
	                        <div class="input-group mb-3">
	                            <span class="input-group-text">
	                                <i class="fas fa-lock fa-sm"></i>
	                            </span>
	                            <input type="password" class="form-control" id="${id + "Password"}" placeholder="Password"
	                                required>
	                            <span class="input-group-text" id="${id + "ShowPasswordBtn"}"
	                                onclick="mitsru.suap(event, '${id + "Password"}')">
	                                <i class="far fa-eye"></i>
	                            </span>
	                        </div>
							<div id="${id + "passFbDiv"}"></div>

	                        <div class="form-text mb-3 text-end">
	                            
	                        </div>


	                        <span style="text-decoration: underline; color: #0a58ca;">

	                        </span>

	    					${getSpcCaptchaLine()}

							<div id=${USER_FB_DIV}></div>
							<br>

							 <button type="button" class="btn btn-primary w-100" onclick="mitsru.uas('${LOGIN}')">Login</button>
	                    </form>`;

		html += `</div>
	                <div class="modal-footer d-flex flex-column">
						<div class="d-flex justify-content-between w-100">
							<button class="btn" type="button" onclick="mitsru.uurm('userForgotPswd')">
								<span style="text-decoration: underline; color: #0a58ca; font-weight: 500;">
									Forgot Password ?
								</span>
							</button>
							<button type="button" class="btn" style="font-weight: 300;" onclick=mitsru.uurm('userReg')>
								<span style='text-decoration: underline; color: #0a58ca; font-weight: 500;'>
									Register</span>
								a new account
							</button>
						</div>
						<div align="center">
							<a href="https://www.topstockresearch.com/rt/TsrHighlights/TsrTechnicalTool" target='_blank' style="margin-left: 14px; font-weight: 500;font-size: 14px; color: black;">India's Best Technical Tool</a>
						</div>
						<div>
							<img class="img-responsive img-fluid"
								src="${preCaution}">
						</div>
	                </div>;`


		return html;
	}

	function getUserRegModalHtml() {

		let id = ""

		let html = "";

		html += `    <!-- Reg Modal -->
	                <div class="modal-header">
	                    <div class="nav-logo" id="navLogoDiv">
	                        <div class="logo logo-dark"
	                            style="background-image: url('${tsrLogo}')">
	                        </div>
	                    </div>
	                    <h1 class="modal-title fs-5 ms-3">
	                        Welcome to TSR Family
	                    </h1>
	                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	                </div>
	                <div class="modal-body">
	                    <div class="d-flex justify-content-center">
	                        <span style="font-weight: 500; font-size: 18px;">Register</span>
	                    </div>
	                    <br>

	                    <!-- TODO -->
	                    <div id="${id + GOOGLE_SIGN_IN_DIV}" align="center" style="scale: 115%;">

	                    </div>
	                    <br>
	                    <div class="miVertDivider d-flex w-100">
	                        <div class="miVertLine"></div>
	                        <div class="fw-300 fs-16 mx-3">or</div>
	                        <div class="miVertLine"></div>
	                    </div>`;

		html += `<form class="mt-3" id="${id + "Form"}">
	                        <div class="mb-3 d-flex">
	                            <input id="${id + "FirstName"}" type="text" class="form-control w-100 me-1" placeholder="First Name"
	                                aria-label="First name" required>
	                            <input id="${id + "LastName"}" type="text" class="form-control w-100 ms-1" placeholder="Last Name"
	                                aria-label="Last name">
	                        </div>
	                        <div class="input-group mb-3">
	                            <!-- <label for="${id + "Email"}" class="form-label" style="font-size: 14px;">Email address</label> -->
	                            <span class="input-group-text">
	                                <i class="far fa-envelope"></i>
	                            </span>

	                            <input type="email" class="form-control" id="${id + "Email"}" placeholder="Email Address"
	                                required>
	                        </div>
	                        <div class="input-group mb-3">
	                            <span class="input-group-text">
	                                <i class="fas fa-lock fa-sm"></i>
	                            </span>
	                            <input type="password" class="form-control" id="${id + "Password"}" placeholder="Password"
	                                required>
	                            <span class="input-group-text" id="${id + "ShowPasswordBtn"}"
	                                onclick="mitsru.suap(event, '${id + "Password"}')">
	                                <i class="far fa-eye"></i>
	                            </span>
	                        </div>
							<div id="${id + "passFbDiv"}"></div>

	                        <div class="input-group mb-3">
	                            <!-- <label for="${id + "PhnNumber"}" class="form-label" style="font-size: 14px;">Phone number</label> -->
	                            <span class="input-group-text">
	                                <i class="fas fa-phone fa-sm" style="rotate: 90deg;"></i>
	                            </span>

	                            ${getCountryCodesSelect(id)}

	                            <input type="text" class="form-control" id="${id + "PhnNumber"}" placeholder="Phone Number"
	                                required>
	                        </div>

	                        	${getSpcCaptchaLine()}


	                        <div class="form-text mb-3 text-center">
	                            By proceeding, I agree to have read and accepted the
	                            <a href="//${disclaimer}" target="_blank"
	                                style="font-size: 12px;">T&amp;C</a>
	                            and
	                            <a>Key notes provided below</a>
	                        </div>

							<div id=${USER_FB_DIV}></div>
							<br>
	                        
							<button type="button" class="btn btn-primary w-100" onclick="mitsru.uas('${REGISTER}')">Register</button>
	
	                    </form>
	`;



		html += `         </div>
	                <div class="modal-footer d-flex flex-column">
	                    <button type="button" class="btn" style="font-weight: 300;" onclick="mitsru.uurm('userLogin')">
	                        Already have an account?
	                        <span style="text-decoration: underline; color: #0a58ca; font-weight: 500;">
	                            Login
	                        </span>
	                    </button>
						<div>
							<a href="https://www.topstockresearch.com/rt/TsrHighlights/TsrTechnicalTool" target='_blank' style="margin-left: 14px; font-weight: 500; font-size: 14px; color: black;">India's Best Technical Tool</a>
						</div>
	                    <img class="img-responsive img-fluid"
	                        src="${preCaution}">
	                </div>
	                `;

		return html;
	}

	function getUserForgotPasswordModalHtml() {

		// let id = 'tsrUserForgotPswd';
		let id = '';

		let html = '';

		html += `    <!-- Login Modal -->
	                <div class="modal-header">
	                    <h1 class="modal-title fs-5">
	                        Reset Password
	                    </h1>
	                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	                </div>
	                <div class="modal-body">`

		html += `    <form class="mt-3" id="tsrUserResetPswdForm">
	                        <div class="input-group mb-3">
	                            <span class="input-group-text">
	                                <i class="far fa-envelope"></i>
	                            </span>

	                            <input type="email" class="form-control" id="${id + "Email"}"
	                                placeholder="Email Address" required>
	                        </div>

	                        ${getSpcCaptchaLine()}

							<div id=${USER_FB_DIV}></div>
							<br>

	                        <button type="button" class="btn btn-primary w-100" onclick="mitsru.uas('${FORGOT_PASS}')">Submit</button>
	                    </form>`;

		html += ``;

		html += `</div>
	                <div class="modal-footer d-flex justify-content-center">
	                    <div style="font-weight: 300; text-align: center">
	                        On submit, you will receive a new Password on your email, if it exists in our records
	                    </div>
	                    <button type="button" class="btn" style="font-weight: 300;" onclick="mitsru.uurm('userLogin')">
	                        Back to
	                        <span style="text-decoration: underline; color: #0a58ca;">
	                            Login
	                        </span>
	                    </button>
	                </div>`;

		return html;
	}

	function getUserDetailsModal() {
		// let id = 'tsrUserDetails';
		let id = '';
		let html = "";

		let email = usrData.email;
		let fname = usrData.fName;
		let lname = usrData.lName;

		let tel = (usrData.tel == "null") ? "" : usrData.tel;

		let postalCode = (usrData.pin == "null") ? "" : usrData.pin;


		html += `<!-- User Details Modal -->
	                <div class="modal-header">
	                    <h1 class="modal-title fs-5">
	                        Please update your details
	                    </h1>
	                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	                </div>
	                <div class="modal-body">
	                    <form class="mt-3" id="${id + "Form"}">

	                        <fieldset disabled>
	                            <div class="input-group mb-3">
	                                <span class="input-group-text">
	                                    <i class="far fa-envelope"></i>
	                                </span>

	                                <input type="email" class="form-control" id="${id + "Email"}" value="${email}" required>

	                            </div>

	                            <div class="mb-3 d-flex">
	                                <input id="${id + "FirstName"}" type="text" class="form-control w-100 me-1" value="${fname}"
	                                    aria-label="First name" required>
	                                <input id="${id + "LastName"}" type="text" class="form-control w-100 ms-1" value="${lname}"
	                                    aria-label="Last name">
	                            </div>

	                        </fieldset>


	                        <div class="input-group mb-3">
	                            <span class="input-group-text">
	                                <i class="fas fa-phone fa-sm" style="rotate: 90deg;"></i>
	                            </span>

	                                ${getCountryCodesSelect(id)}

	                            <input type="text" class="form-control" id="${id + "PhnNumber"}" placeholder="Phone Number" value="${tel}"
	                                required>
	                        </div>

	                        <div class="form-floating mb-3">
	                                ${getStateSelect(id)}
	                            <label for="StateSelect">State</label></div>

	                        <div class="mb-3 d-flex">
	                            <input id="${id + "PostalCode"}" type="text" class="form-control w-100 me-1" placeholder="Postal Code"  value="${postalCode}"
	                                aria-label="Postal Code" required>
	                        </div>


	                        <!-- <div class="form-floating mb-3"> <input class="form-control" id="${id + "Dob"}"
	                                placeholder="DOB(dd/MM/yyyy)" type="text"> <label for="dob">DOB (dd/MM/yyyy)</label>
	                            <div id="dobFbDiv"></div>
	                        </div> -->

	                        <!-- <div class="form-text mb-3 text-center">
	                            By proceeding, I agree to
	                            <a href="${disclaimer}" target="_blank"
	                                style="font-size: 12px;">T&amp;C</a>
	                            and
	                            <a href="">Key notes</a>
	                        </div> -->

							<div id='${USER_FB_DIV}'></div>
							<br>

	                        <button type="button" class="btn btn-primary w-100" style="font-weight: 300;" onclick="mitsru.uas('editUser')">
	                        Submit
	                    </button>

	                    </form>
	                </div>
	                <div class="modal-footer d-flex justify-content-center">
	                    
	                    <!-- <img class="img-responsive img-fluid" src="${preCaution}"> -->
	                </div>`;

		return html;
	}




	// Google Specific Code Starts

	function initializeGoog() {

		if(!initGoogle){
				google.accounts.id.initialize({
				client_id: GOOGLE_CLIENT_ID,
				auto_select: true,
				callback: handleGoogleResponse,
				cancel_on_tap_outside: false,
				use_fedcm_for_prompt: true,
				use_fedcm_for_button: true

			}); // creates a Sign In With Google client instance for use throughout the webpage, it is called only once
			google.accounts.id.prompt();


			initGoogle = true;

		}

		console.log(' initializeGoog ' + initializeGoog);
		

		renderGsiButtons(GOOGLE_SIGN_IN_DIV);
	}

	function renderGsiButtons(id) {

		
		google.accounts.id.renderButton(document.getElementById(id), {
			theme: 'outline',
			text: "continue_with",
			width: "300px",
			size: "large"
		});
	}


	function handleGoogleRes(response) {
		// TODO         
		var type = GOOGLE_REG;

		var pd = { action: type, credential: response.credential };
		var rc = new RC(NEW_REGISTRATION, null, pd, 'loadingDiv', USER_FB_DIV, thisObject, 'umRes', type);
		myTsrUtils.rc(rc);
	}


	// Captch

	function changeImage() {
		htmlU.chgImg(thisObject);

	}

	function applyImg(response, id) {
		var html = '<img  class="img-responsive img-fluid" src="' + response.imagePath + '"/>';
		usrDt.linky = response.linky;
		htmlU.addMsgToDiv('captchaImg', true, html);
	}



	function getSpcCaptchaLine() {

		var html = '';
		html += '<div class="row">'

		html += '	<div class="col-6">'
		html += '		<div id="captchaImg" style="display:inline;"> </div>'
		html += '	</div>'

		html += '	<div class="col-2">'
		html += '		<a class="btn mt-2 mb-2" onClick="' + thisObject + '.changeImage()" >'
		html += '			<i class="fas fa-sync-alt"></i>'
		html += '		</a>'
		html += '	</div>'

		// create Text Box ...
		// html+= createSpcFormElem('Image Value', 'captcha', 4, null, null, null , 'Please Enter Image Value' , true , null);
		// html += '	<div class="col-4">'
		html += htmlU.csfe('Image Value', 'captcha', 4, null, null, null, 'Please Enter Image Value', true, null);
		// html += '	</div>'


		html += '</div>'
		return html;

	}


	// htmlU.gsc(thisObject);

	// Country / State Specific Starts



	let countryCallingCodes = {
		"IND": { "name": "India", "code": "+91" },
		"AFG": { "name": "Afghanistan", "code": "+93" },
		"ALA": { "name": "Åland Islands", "code": "+358" },
		"ALB": { "name": "Albania", "code": "+355" },
		"DZA": { "name": "Algeria", "code": "+213" },
		"ASM": { "name": "American Samoa", "code": "+1684" },
		"AND": { "name": "Andorra", "code": "+376" },
		"AGO": { "name": "Angola", "code": "+244" },
		"AIA": { "name": "Anguilla", "code": "+1264" },
		"ATA": { "name": "Antarctica", "code": "+672" },
		"ATG": { "name": "Antigua and Barbuda", "code": "+1268" },
		"ARG": { "name": "Argentina", "code": "+54" },
		"ARM": { "name": "Armenia", "code": "+374" },
		"ABW": { "name": "Aruba", "code": "+297" },
		"AUS": { "name": "Australia", "code": "+61" },
		"AUT": { "name": "Austria", "code": "+43" },
		"AZE": { "name": "Azerbaijan", "code": "+994" },
		"BHS": { "name": "Bahamas", "code": "+1242" },
		"BHR": { "name": "Bahrain", "code": "+973" },
		"BGD": { "name": "Bangladesh", "code": "+880" },
		"BRB": { "name": "Barbados", "code": "+1246" },
		"BLR": { "name": "Belarus", "code": "+375" },
		"BEL": { "name": "Belgium", "code": "+32" },
		"BLZ": { "name": "Belize", "code": "+501" },
		"BEN": { "name": "Benin", "code": "+229" },
		"BMU": { "name": "Bermuda", "code": "+1441" },
		"BTN": { "name": "Bhutan", "code": "+975" },
		"BOL": { "name": "Bolivia", "code": "+591" },
		"BES": { "name": "Bonaire, Sint Eustatius and Saba", "code": "+599" },
		"BIH": { "name": "Bosnia and Herzegovina", "code": "+387" },
		"BWA": { "name": "Botswana", "code": "+267" },
		"BVT": { "name": "Bouvet Island", "code": "+47" },
		"BRA": { "name": "Brazil", "code": "+55" },
		"IOT": { "name": "British Indian Ocean Territory", "code": "+246" },
		"BRN": { "name": "Brunei Darussalam", "code": "+673" },
		"BGR": { "name": "Bulgaria", "code": "+359" },
		"BFA": { "name": "Burkina Faso", "code": "+226" },
		"BDI": { "name": "Burundi", "code": "+257" },
		"KHM": { "name": "Cambodia", "code": "+855" },
		"CMR": { "name": "Cameroon", "code": "+237" },
		"CAN": { "name": "Canada", "code": "+1" },
		"CPV": { "name": "Cabo Verde", "code": "+238" },
		"CYM": { "name": "Cayman Islands", "code": "+1345" },
		"CAF": { "name": "Central African Republic", "code": "+236" },
		"TCD": { "name": "Chad", "code": "+235" },
		"CHL": { "name": "Chile", "code": "+56" },
		"CHN": { "name": "China", "code": "+86" },
		"CXR": { "name": "Christmas Island", "code": "+61" },
		"CCK": { "name": "Cocos (Keeling) Islands", "code": "+61" },
		"COL": { "name": "Colombia", "code": "+57" },
		"COM": { "name": "Comoros", "code": "+269" },
		"COG": { "name": "Congo", "code": "+242" },
		"COD": { "name": "Congo, Democratic Republic of the Congo", "code": "+243" },
		"COK": { "name": "Cook Islands", "code": "+682" },
		"CRI": { "name": "Costa Rica", "code": "+506" },
		"CIV": { "name": "Côte d'Ivoire", "code": "+225" },
		"HRV": { "name": "Croatia", "code": "+385" },
		"CUB": { "name": "Cuba", "code": "+53" },
		"CUW": { "name": "Curaçao", "code": "+599" },
		"CYP": { "name": "Cyprus", "code": "+357" },
		"CZE": { "name": "Czechia", "code": "+420" },
		"DNK": { "name": "Denmark", "code": "+45" },
		"DJI": { "name": "Djibouti", "code": "+253" },
		"DMA": { "name": "Dominica", "code": "+1767" },
		"DOM": { "name": "Dominican Republic", "code": "+1809" },
		"ECU": { "name": "Ecuador", "code": "+593" },
		"EGY": { "name": "Egypt", "code": "+20" },
		"SLV": { "name": "El Salvador", "code": "+503" },
		"GNQ": { "name": "Equatorial Guinea", "code": "+240" },
		"ERI": { "name": "Eritrea", "code": "+291" },
		"EST": { "name": "Estonia", "code": "+372" },
		"ETH": { "name": "Ethiopia", "code": "+251" },
		"FJI": { "name": "Fiji", "code": "+679" },
		"FIN": { "name": "Finland", "code": "+358" },
		"FRA": { "name": "France", "code": "+33" },
		"DEU": { "name": "Germany", "code": "+49" },
		"GRC": { "name": "Greece", "code": "+30" },
		"HKG": { "name": "Hong Kong", "code": "+852" },
		"ISL": { "name": "Iceland", "code": "+354" },
		"IDN": { "name": "Indonesia", "code": "+62" },
		"IRN": { "name": "Iran", "code": "+98" },
		"IRQ": { "name": "Iraq", "code": "+964" },
		"IRL": { "name": "Ireland", "code": "+353" },
		"ISR": { "name": "Israel", "code": "+972" },
		"ITA": { "name": "Italy", "code": "+39" },
		"JPN": { "name": "Japan", "code": "+81" },
		"JOR": { "name": "Jordan", "code": "+962" },
		"KEN": { "name": "Kenya", "code": "+254" },
		"KOR": { "name": "South Korea", "code": "+82" },
		"LBN": { "name": "Lebanon", "code": "+961" },
		"LKA": { "name": "Sri Lanka", "code": "+94" },
		"MEX": { "name": "Mexico", "code": "+52" },
		"NPL": { "name": "Nepal", "code": "+977" },
		"NLD": { "name": "Netherlands", "code": "+31" },
		"NZL": { "name": "New Zealand", "code": "+64" },
		"NGA": { "name": "Nigeria", "code": "+234" },
		"NOR": { "name": "Norway", "code": "+47" },
		"PAK": { "name": "Pakistan", "code": "+92" },
		"PHL": { "name": "Philippines", "code": "+63" },
		"POL": { "name": "Poland", "code": "+48" },
		"PRT": { "name": "Portugal", "code": "+351" },
		"QAT": { "name": "Qatar", "code": "+974" },
		"ROU": { "name": "Romania", "code": "+40" },
		"RUS": { "name": "Russian Federation", "code": "+7" },
		"SAU": { "name": "Saudi Arabia", "code": "+966" },
		"SGP": { "name": "Singapore", "code": "+65" },
		"ZAF": { "name": "South Africa", "code": "+27" },
		"ESP": { "name": "Spain", "code": "+34" },
		"SWE": { "name": "Sweden", "code": "+46" },
		"CHE": { "name": "Switzerland", "code": "+41" },
		"TWN": { "name": "Taiwan", "code": "+886" },
		"THA": { "name": "Thailand", "code": "+66" },
		"TUR": { "name": "Türkiye", "code": "+90" },
		"UKR": { "name": "Ukraine", "code": "+380" },
		"ARE": { "name": "United Arab Emirates", "code": "+971" },
		"GBR": { "name": "United Kingdom", "code": "+44" },
		"USA": { "name": "United States of America", "code": "+1" },
		"URY": { "name": "Uruguay", "code": "+598" },
		"UZB": { "name": "Uzbekistan", "code": "+998" },
		"VEN": { "name": "Venezuela", "code": "+58" },
		"VNM": { "name": "Viet Nam", "code": "+84" },
		"YEM": { "name": "Yemen", "code": "+967" },
		"ZMB": { "name": "Zambia", "code": "+260" },
		"ZWE": { "name": "Zimbabwe", "code": "+263" },
		"OTH": { "name": "Other", "code": "" }
	}


	function getCountryCodesSelect(idPrefix) {
		let html = "";

		// html += `<div class="form-floating mb-3">`;
		html += `    <select class="form-select" name="countryCode" id="${idPrefix + "CountryCode"}" style="max-width: 120px">`;

		let countryCodes = Object.keys(countryCallingCodes);
		for (let i = 0; i < countryCodes.length; i++) {
			let country = countryCallingCodes[countryCodes[i]].name;
			let code = countryCallingCodes[countryCodes[i]].code;

			html += `<option value="${countryCodes[i]}">${code} ${country}</option>`;

		}

		html += `    </select>`;
		// html += `   <label for="countryCode">Code</label>`;
		// html += `</div>`;

		return html;

	}

	// function getCountrySelect(idPrefix) {
	// 	let html = "";

	// 	html += `<div class="form-floating mb-3">`;
	// 	html += `    <select class="form-select" name="country" id="${idPrefix + "Country"}">`;

	// 	let countryCodes = Object.keys(countryCallingCodes);
	// 	for (let i = 0; i < countryCodes.length; i++) {
	// 		let country = countryCallingCodes[countryCodes[i]].name;

	// 		html += `<option value="${countryCodes[i]}">${country}</option>`;

	// 	}

	// 	html += `    </select>`;
	// 	html += `   <label for="country">Country</label>`;
	// 	html += `</div>`;

	// 	return html;
	// }

	var states = [

		// {id: "NA", label: "ChooseOne"},
		{ id: "AD", label: "Andhra Pradesh" },
		{ id: "AN", label: "Andaman and Nicobar Islands" },
		{ id: "AR", label: "Arunachal Pradesh" },
		{ id: "AS", label: "Assam" },
		{ id: "BR", label: "Bihar" },
		{ id: "CG", label: "Chattisgarh" },
		{ id: "CH", label: "Chandigarh" },

		{ id: "DL", label: "Delhi" },
		{ id: "DNHDD", label: "Dadra & Nagar Haveli and Daman & Diu" },
		{ id: "GA", label: "Goa" },
		{ id: "GJ", label: "Gujarat" },
		{ id: "HR", label: "Haryana" },
		{ id: "HP", label: "Himachal Pradesh" },
		{ id: "JK", label: "Jammu and Kashmir" },
		{ id: "JH", label: "Jharkhand" },
		{ id: "KA", label: "Karnataka" },
		{ id: "KL", label: "Kerala" },
		{ id: "LA", label: "Ladakh" },
		{ id: "LD", label: "Lakshadweep Islands" },
		{ id: "MP", label: "Madhya Pradesh" },
		{ id: "MH", label: "Maharashtra" },
		{ id: "MN", label: "Manipur" },
		{ id: "ML", label: "Meghalaya" },
		{ id: "MZ", label: "Mizoram" },
		{ id: "NL", label: "Nagaland" },
		{ id: "OD", label: "Odisha" },
		{ id: "PY", label: "Pondicherry" },
		{ id: "PB", label: "Punjab" },
		{ id: "RJ", label: "Rajasthan" },
		{ id: "SK", label: "Sikkim" },
		{ id: "TN", label: "Tamil Nadu" },
		{ id: "TS", label: "Telangana" },
		{ id: "TR", label: "Tripura" },
		{ id: "UP", label: "Uttar Pradesh" },
		{ id: "UK", label: "Uttarakhand" },
		{ id: "WB", label: "West Bengal" },
		{ id: "OTHERS", label: "Others" },

	];


	function getStateSelect(idPrefix) {
		let html = "";

		// html += `<div class="form-floating mb-3">`;
		html += `    <select class="form-select" name="select" id="${idPrefix + "StateSelect"}">`;

		for (let i = 0; i < states.length; i++) {
			let stateCode = states[i].id;
			let state = states[i].label;

			html += `<option value="${stateCode}">${state}</option>`;

		}

		html += `    </select>`;

		return html;
	}


	function userManagementResponse(response, type) {
		if (response.statusCode !== 'success') {

			if (type == GOOGLE_REG) {

				let googleMsg = 'We are unable to register With Google. Please continue with Normal Login'
				htmlU.addMsgToDiv(USER_FB_DIV, true, response.statusMsg, 'red', 12);
			} else {
				htmlU.addMsgToDiv(USER_FB_DIV, true, response.statusMsg, 'red', 12);
			}

			// htmlU.addMsgToDiv(USER_FB_DIV,true,response.statusMsg , 'red',12);
			return;
		}



		var message = '';
		if (type == LOGIN) {

			var message = '<b>You Have successfully Logged in. You will be redirected to Home Page in a while</b>';

			htmlU.addMsgToDiv(USER_FB_DIV, true, message, 'green', 12);

			setTimeout(waitRedirect, 3000, jsu.getBaseUrl() + "/rt/Home");

			return;


		} else if (type == FORGOT_PASS) {
			message = 'Auto generated password is sent to your mail. We recommend you to change it.';

			updateUserRegModal('userLogin');

			htmlU.addMsgToDiv(USER_FB_DIV, true, message, 'green', 12);

			return;



		} else if (type == REGISTER) {

			htmlU.addMsgToDiv(USER_FB_DIV, true, response.statusMsg, 'green', 12);

			setTimeout(waitRedirect, 3000, jsu.getBaseUrl() + "/rt/Home");

			return;

		} else if (type == EDIT_USER) {

			let span = document.getElementById('missingUsrFieldSpan');
			// span.remove();

			let div = document.getElementById('usrDetDiv');
			div.remove();


			message = 'Profile Successully Updated. Please select Premium Plan'

			let modalDiv = document.getElementById("tsrUserRegModal");
			var modal = bootstrap.Modal.getInstance(modalDiv)
			modal.hide();


			htmlU.addMsgToDiv('missingUsrFieldSpan', true, message, 'green', 12);




			return;

		} else if (type == GOOGLE_REG) {
			htmlU.addMsgToDiv(USER_FB_DIV, true, response.statusMsg, 'green', 12);

			setTimeout(waitRedirect, 3000, jsu.getBaseUrl() + "/rt/Home");

			return;
		}



	}


	function waitRedirect(url) {
		setWindowLocation(url);
	}


	return {

		init: init,




		// ua : userAction,
		uas: userActionSubmit,
		suap: showUserAccPassword,
		umRes: userManagementResponse, // user Management Response
		passChange: passChange,
		validateEmail: validateEmail,
		changeImage: changeImage,
		applyImg: applyImg,

		// smint  : socialMediaInit,
		uurm: updateUserRegModal,
		hgr: handleGoogleRes

	}

})(); // module     




window.onload = function () {
	// mitsru.init();

}


function handleGoogleResponse(response) {
	mitsru.hgr(response);
}
