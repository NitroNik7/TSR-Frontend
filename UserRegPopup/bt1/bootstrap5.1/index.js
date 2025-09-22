
let modalClickListener = null;
let modalKeydownListener = null;

function createUserAuthModals(e) {

    e.stopImmediatePropagation();

    let loginModalId = "tsrUserLoginModal";
    let regModalId = "tsrUserRegModal";
    let resetPassModalId = "tsrResetPswdModal";

    let loginModal = createModal(loginModalId);
    let regModal = createModal(regModalId);
    let resetPassModal = createModal(resetPassModalId);

    document.body.appendChild(loginModal);
    document.body.appendChild(regModal);
    document.body.appendChild(resetPassModal);

    addUserAuthModalContent(loginModalId, regModalId, resetPassModalId);
    const myModal = new bootstrap.Modal(document.getElementById(loginModalId));
    myModal.show();

    modalClickListener = function (e) {
        removeUserAuthModals(e, loginModalId, regModalId, resetPassModalId);
    };


    modalKeydownListener = function (e) {
        removeUserAuthModals(e, loginModalId, regModalId, resetPassModalId);
    }

    document.body.addEventListener("click", modalClickListener);
    document.body.addEventListener("keydown", modalKeydownListener);

}

function removeUserAuthModals(e, loginModalId, regModalId, resetPassModalId) {
    let loginModal = document.getElementById(loginModalId).querySelector(".modal-dialog");
    let regModal = document.getElementById(regModalId).querySelector(".modal-dialog");
    let resetPswdModal = document.getElementById(resetPassModalId).querySelector(".modal-dialog");

    // let modalBackdrop = document.querySelector(".modal-backdrop.show");

    if (e.type === "click") {
        let targetEle = e.target;

        if (!(loginModal.contains(targetEle) || regModal.contains(targetEle) || resetPswdModal.contains(targetEle))) {
            document.body.removeChild(loginModal.parentNode);
            document.body.removeChild(regModal.parentNode);
            document.body.removeChild(resetPswdModal.parentNode);

            document.body.removeEventListener("click", modalClickListener);
            document.body.removeEventListener("keydown", modalKeydownListener);

            // document.body.removeChild(modalBackdrop.parentNode);
        }
    }

    if (e.type === "keydown") {
        if (e.key === "Escape") {

            document.body.removeChild(loginModal.parentNode);
            document.body.removeChild(regModal.parentNode);
            document.body.removeChild(resetPswdModal.parentNode);

            document.body.removeEventListener("click", modalClickListener);
            document.body.removeEventListener("keydown", modalKeydownListener);
            // document.body.removeChild(modalBackdrop.parentNode);
        }
    }

}

function createUserDetailsModal(e, id) {

    e.stopImmediatePropagation();

    let userDetailModal = createModal(id);
    document.body.appendChild(userDetailModal);

    addUserDetailModalContent();
    const myModal = new bootstrap.Modal(document.getElementById(id));
    myModal.show();


    modalClickListener = function (e) {
        removeModal(e, id);
    };

    modalKeydownListener = function (e) {
        removeModal(e, id);
    };

    document.body.addEventListener("click", modalClickListener);
    document.body.addEventListener("keydown", modalKeydownListener);

}

function removeModal(e, modalId) {

    let modal = document.getElementById(modalId).querySelector(".modal-dialog");

    if (e.type === "click") {
        let targetEle = e.target;

        if (!(modal.contains(targetEle))) {
            document.body.removeChild(modal.parentNode);

            document.body.removeEventListener("click", modalClickListener);


            // document.body.removeChild(modalBackdrop.parentNode);
        }
    }

    if (e.type === "keydown") {
        if (e.key === "Escape") {

            document.body.removeChild(modal.parentNode);

            document.body.removeEventListener("keydown", modalKeydownListener);

            // document.body.removeChild(modalBackdrop.parentNode);
        }
    }
}

function createModal(id) {

    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.setAttribute("tabindex", "-1");
    modal.id = id;

    let modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog", "modal-dialog-centered");

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    let modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");
    modalHeader.id = id + "Header";

    let modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalBody.id = id + "Body";


    let modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer", "justify-content-center");
    modalFooter.id = id + "Footer";

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    return modal;

}

function addUserAuthModalContent(loginModalId, regModalId, resetPswdModalId) {
    let regModalHeader = document.getElementById(regModalId + "Header");
    let regModalBody = document.getElementById(regModalId + "Body");
    let regModalFooter = document.getElementById(regModalId + "Footer");

    regModalHeader.innerHTML = `
        <h1 class="modal-title fs-5">
            Welcome to 
                <span style="color: #0d6efd;"> 
                    Top Stock Research
                </span>
        </h1>
    `;

    let html = "";

    html += `
                    <div class="d-flex justify-content-center">
                        <span style="font-weight: 500; font-size: 18px;">Register</span>
                    </div>
                    <br>

                    <!-- TODO -->
                    <div id="tsrUserRegGoogleSignIn" align="center" style="scale: 115%;">

                    </div>
                    <br>
                    <div class="line-container d-flex w-100">
                        <div class="line"></div>
                        <div class="fw-300 fs-16 mx-3">or</div>
                        <div class="line"></div>
                    </div>
                    <style>
                        .line-container {
                            align-items: center;
                        }

                        .line {
                            border-top: 1px solid #ccc;
                            width: 100%;
                        }
                    </style>
                    <form class="mt-3" id="tsrUserRegForm">
                        <div class="mb-3 d-flex">
                            <input type="text" class="form-control w-100 me-1" placeholder="First Name"
                                aria-label="First name">
                            <input type="text" class="form-control w-100 ms-1" placeholder="Last Name"
                                aria-label="Last name">
                        </div>
                        <div class="input-group mb-3">
                            <!-- <label for="tsrUserRegEmail" class="form-label" style="font-size: 14px;">Email address</label> -->
                            <span class="input-group-text" >
                                <i class="far fa-envelope"></i>
                            </span>

                            <input type="email" class="form-control" id="tsrUserRegEmail" placeholder="Email Address"
                                required>
                        </div>
                        <div class="input-group mb-3">
                            <!-- <label for="tsrUserRegPassword" class="form-label" style="font-size: 14px;">Password</label> -->
                            <span class="input-group-text">
                                <i class="fas fa-lock fa-sm"></i>
                            </span>
                            <input type="password" class="form-control" id="tsrUserRegPassword" placeholder="Password"
                                required>
                            <span class="input-group-text" id="userRegShowPasswordBtn" onclick="showUserAccPassword(event, 'tsrUserRegPassword')">
                                <i class="far fa-eye"></i>
                            </span>
                        </div>`;
    html += `            <div class="input-group mb-3">
                            <!-- <label for="tsrUserRegPhnNumber" class="form-label" style="font-size: 14px;">Phone number</label> -->
                            <span class="input-group-text" >
                                <i class="fas fa-phone fa-sm"></i>
                            </span>`;

    html += getCountryCodesSelect();

    html += `

                            <!-- All countries -->
                            <!-- Code and Calling Code -->
                            <!-- total - 252 -->
                            <!-- <div style="width: 15%;">
                                 <input type="text" class="form-control" id="tsrUserRegPhnNumber" placeholder="+91" required>

                             </div> -->

                            <input type="text" class="form-control" id="tsrUserRegPhnNumber" placeholder="Phone Number"
                                required>
                        </div>

                        <div class="row d-flex align-items-center mb,-3">
                            <div class="col-md-4">
                                <div id="captchaImg" style="display:inline;"><img class="img-responsive img-fluid"
                                        src="https://www.stockaio.com/static/img/pramanik/UKHMRrItUuBo/OQbtlyLmuUmB.jpg">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <a class="btn btn-primary mt-2 mb-2 btn-sm" onclick="migu.changeImage()">Change
                                    Image</a>
                            </div>
                            <div class="col-md-4">
                                <input class="form-control" id="captchaReg" placeholder="Image Value" type="text">
                            </div>
                        </div>

                        <div class="form-text mb-3 text-center">
                            By proceeding, I agree to
                            <a href="https://www.topstockresearch.com/Disclaimer.html" target="_blank"
                                style="font-size: 12px;">T&amp;C</a>
                            and
                            <a href="">Key notes</a>
                        </div>

                        <button type="submit" class="btn btn-primary w-100">Register</button>
                    </form>
    `;

    regModalBody.innerHTML = html;

    regModalFooter.innerHTML = `
            <button type="button" class="btn" data-bs-target="#${loginModalId}" data-bs-toggle="modal" style="font-weight: 300;">
                Already have an account? 
                <span style="text-decoration: underline; color: #0a58ca; font-weight: 500;">
                    Login
                </span>
            </button>
    `;

    // User login Modal
    let loginModalHeader = document.getElementById(loginModalId + "Header");
    let loginModalBody = document.getElementById(loginModalId + "Body");
    let loginModalFooter = document.getElementById(loginModalId + "Footer");

    loginModalHeader.innerHTML = `
         <h1 class="modal-title fs-5">Welcome back to <span style="color: #0d6efd;">Top
                            Stock Research</span></h1>
    `;

    html = "";

    html += `
                    <div class="d-flex justify-content-center">
                        <span style="font-weight: 500; font-size: 18px;">Login</span>
                    </div>
                    <br>

                    <!-- TODO -->
                    <div id="tsrUserLoginGoogleSignIn" align="center" style="scale: 115%;">

                    </div>
                    <br>
                    <div class="line-container d-flex w-100">
                        <div class="line"></div>
                        <div class="fw-300 fs-16 mx-3">or</div>
                        <div class="line"></div>
                    </div>

                    <form class="mt-3" id="tsrUserLoginForm">
                        
                    <div class="input-group mb-3">
                        <span class="input-group-text" >
                            <i class="far fa-envelope"></i>
                        </span>

                        <input type="email" class="form-control" id="tsrUserLoginEmail" placeholder="Email Address"
                            required>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" >
                            <i class="fas fa-lock fa-sm"></i>
                        </span>
                        <input type="password" class="form-control" id="tsrUserLoginPassword" placeholder="Password"
                            required>
                            <span class="input-group-text" id="tsrUserLoginShowPasswordBtn" onclick="showUserAccPassword(event, 'tsrUserLoginPassword')">
                                <i class="far fa-eye"></i>
                            </span>
                    </div>

                    <div class="form-text mb-3 text-end">
                                <button type="button" class="btn" data-bs-target="#tsrResetPswdModal" data-bs-toggle="modal">
                                        <span style="text-decoration: underline; color: #0a58ca;">
                                            Forgot Password ?
                                        </span>
                                </button>
                            </div>


                            <span style="text-decoration: underline; color: #0a58ca;">
                                    
                                </span>

                    <div class="row d-flex align-items-center mb-3">
                        <div class="col-md-4">
                            <div style="display:inline;"><img class="img-responsive img-fluid"
                                    src="https://www.stockaio.com/static/img/pramanik/UKHMRrItUuBo/OQbtlyLmuUmB.jpg">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <a class="btn btn-primary mt-2 mb-2 btn-sm" onclick="migu.changeImage()">Change
                                Image</a>
                        </div>
                        <div class="col-md-4">
                            <input class="form-control" id="captchaLogin" placeholder="Image Value" type="text">
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary w-100">Login</button>
                                        </form>


    `;

    loginModalBody.innerHTML = html;

    loginModalFooter.innerHTML = `
        <button type="button" class="btn" data-bs-target="#${regModalId}" data-bs-toggle="modal" style="font-weight: 300;" onclick="(event) => {event.stopImmediatePropagation();}">
                <span  style='text-decoration: underline; color: #0a58ca; font-weight: 500;'>
                    Register</span>
                    a new account 
            </button>
    `;



    let resetPswdModalHeader = document.getElementById(resetPswdModalId + "Header");
    let resetPswdModalBody = document.getElementById(resetPswdModalId + "Body");
    let resetPswdModalFooter = document.getElementById(resetPswdModalId + "Footer");

    resetPswdModalHeader.innerHTML = `
         <h1 class="modal-title fs-5">
            Reset Password
        </h1>
    `;

    html = "";

    html += `
        <form class="mt-3" id="tsrUserResetPswdForm">
            <div class="input-group mb-3">
                <span class="input-group-text" >
                    <i class="far fa-envelope"></i>
                </span>

                <input type="email" class="form-control" id="tsrUserResetPswdEmail" placeholder="Email Address"
                    required>
            </div>

            <div class="row d-flex align-items-center mb-3">
                <div class="col-md-4">
                    <div style="display:inline;"><img class="img-responsive img-fluid"
                            src="https://www.stockaio.com/static/img/pramanik/UKHMRrItUuBo/OQbtlyLmuUmB.jpg">
                    </div>
                </div>
                <div class="col-md-4">
                    <a class="btn btn-primary mt-2 mb-2 btn-sm" onclick="migu.changeImage()">Change
                        Image</a>
                </div>
                <div class="col-md-4">
                    <input class="form-control" id="captchaPswdReset" placeholder="Image Value" type="text">
                </div>
            </div>

            <button type="submit" class="btn btn-primary w-100">Submit</button>
        </form>

    `;

    resetPswdModalBody.innerHTML = html;

    resetPswdModalFooter.innerHTML = `
        <div style="font-weight: 300; text-align: center">
           On submit, you will receive a Password reset link on your e-mail, if it exists in our records
        </div>
        <div id="tsrUserRegPopup" class="form-text text-center">
            <button type="button" class="btn" data-bs-target="#${loginModalId}" data-bs-toggle="modal">
                Back to
                <span style="text-decoration: underline; color: #0a58ca;">
                    Login
                </span>
            </button>
        </div>
    `;

    google.accounts.id.renderButton(document.getElementById("tsrUserRegGoogleSignIn"), {
        theme: 'outline',
        size: 'large',
        text: "continue_with",
        width: "300px",
        size: "large"
    });

    google.accounts.id.renderButton(document.getElementById("tsrUserLoginGoogleSignIn"), {
        theme: 'outline',
        size: 'large',
        text: "continue_with",
        width: "300px",
        size: "large"
    });
}


function addUserDetailModalContent() {

    let userDetailsModalHeader = document.getElementById("tsrUserDetailsModalHeader");
    let userDetailsModalBody = document.getElementById("tsrUserDetailsModalBody");
    let userDetailsModalFooter = document.getElementById("tsrUserDetailsModalFooter");

    userDetailsModalHeader.innerHTML = `
        <h1 class="modal-title fs-5">
            Please enter your details 
        </h1>
    `;

    let html = "";
    html += `
                    <form class="mt-3" id="tsrUserRegForm">
                        <div class="mb-3 d-flex">
                            <input type="text" class="form-control w-100 me-1" placeholder="State"
                                aria-label="State">
                            
                        </div>
                            <!-- <label for="tsrUserRegEmail" class="form-label" style="font-size: 14px;">Email address</label> -->
                            <div class="form-floating mb-3">`;

    html += getCountrySelect();

    html += `
        <div class="input-group mb-3">
                            <!-- <label for="tsrUserRegPassword" class="form-label" style="font-size: 14px;">Password</label> -->
                            <span class="input-group-text" >
                                <i class="fas fa-lock fa-sm"></i>
                            </span>
                            <input type="password" class="form-control" id="tsrUserDetailsPassword" placeholder="Password"
                                required>
                            <span class="input-group-text" id="tsrUserDetailsShowPasswordBtn" onclick="showUserAccPassword(event, 'tsrUserDetailsPassword')">
                                <i class="far fa-eye"></i>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <!-- <label for="tsrUserRegPhnNumber" class="form-label" style="font-size: 14px;">Phone number</label> -->
                            <span class="input-group-text" >
                                <i class="fas fa-phone fa-sm"></i>
                            </span>
                            <!-- All countries -->
                            <!-- Code and Calling Code -->
                            <!-- total - 252 -->
                            <!-- <div style="width: 15%;">
                                 <input type="text" class="form-control" id="tsrUserRegPhnNumber" placeholder="+91" required>

                             </div> -->

                            <input type="text" class="form-control" id="tsrUserRegPhnNumber" placeholder="Phone Number"
                                required>
                        </div>

                        <div class="row d-flex align-items-center mb,-3">
                            <div class="col-md-4">
                                <div id="captchaImg" style="display:inline;"><img class="img-responsive img-fluid"
                                        src="https://www.stockaio.com/static/img/pramanik/UKHMRrItUuBo/OQbtlyLmuUmB.jpg">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <a class="btn btn-primary mt-2 mb-2 btn-sm" onclick="migu.changeImage()">Change
                                    Image</a>
                            </div>
                            <div class="col-md-4">
                                <input class="form-control" id="captchaReg" placeholder="Image Value" type="text">
                            </div>
                        </div>

                        <div class="form-text mb-3 text-center">
                            By proceeding, I agree to
                            <a href="https://www.topstockresearch.com/Disclaimer.html" target="_blank"
                                style="font-size: 12px;">T&amp;C</a>
                            and
                            <a href="">Key notes</a>
                        </div>

                    </form>
    `;

    userDetailsModalBody.innerHTML = html;

    userDetailsModalFooter.innerHTML = `
                <button type="submit" class="btn btn-primary w-100">Submit</button>

    `;

}
// Google sign in


function handleCredentialResponse(response) {
    console.log(response.credential);
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: '687781720116-6e04u9huhh1u235ar6o9in1d3a3r44t5.apps.googleusercontent.com',
        auto_select: true,
        callback: handleCredentialResponse,
        cancel_on_tap_outside: false,
        state_cookie_domain: "netlify.app",
        use_fedcm_for_prompt: true,
        use_fedcm_for_button: true

    }); // creates a Sign In With Google client instance for use throughout the webpage, it is called only once
    google.accounts.id.prompt();

    // var a = isMobile() ? 275 : 375;
    // var d = isMobile() ? "medium" : "large";
    // google.accounts.id.renderButton(document.getElementById("tsrGoogleSignIn"), {
    //     theme: 'outline',
    //     size: 'large',
    //     text: "continue_with",
    //     width: "300px",
    //     size: "large"
    // });
};

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
    "COD": { "name": "Congo, Democratic Republic of the", "code": "+243" },
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
    "KOR": { "name": "Korea, Republic of", "code": "+82" },
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

function getCountryCodesSelect() {
    let html = "";

    // html += `<div class="form-floating mb-3">`;
    html += `    <select class="form-select" name="countryCode" id="countryCode" style="max-width: 120px">`;

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

function getCountrySelect() {
    let html = "";

    html += `<div class="form-floating mb-3">`;
    html += `    <select class="form-select" name="country" id="country">`;

    let countryCodes = Object.keys(countryCallingCodes);
    for (let i = 0; i < countryCodes.length; i++) {
        let country = countryCallingCodes[countryCodes[i]].name;

        html += `<option value="${countryCodes[i]}">${country}</option>`;

    }

    html += `    </select>`;
    html += `   <label for="country">Country</label>`;
    html += `</div>`;

    return html;
}