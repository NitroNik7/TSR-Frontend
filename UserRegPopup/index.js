function createUserAuthModals() {

    let regModal = document.getElementById("tsrUserRegModal");
    let loginModal = document.getElementById("tsrUserLoginModal");
    let resetPassModal = document.getElementById("tsrResetPswdModal");


    if (regModal != null) {
        document.body.removeChild(regModal);
    }

    if (loginModal != null) {
        document.body.removeChild(loginModal);
    }

    if (resetPassModal != null) {
        document.body.removeChild(resetPassModal);
    }

    regModal = createModal("UserReg");

    loginModal = createModal("UserLogin");

    resetPassModal = createModal("ResetPswd");

    document.body.appendChild(regModal);
    document.body.appendChild(loginModal);
    document.body.appendChild(resetPassModal);

    addModalContent();
    const myModal = new bootstrap.Modal(document.getElementById('tsrUserRegModal'));
    myModal.show();

}

function createModal(modalName) {

    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.setAttribute("tabindex", "-1");
    modal.id = "tsr" + modalName + "Modal";

    let modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    let modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");
    modalHeader.id = "tsr" + modalName + "ModalHeader";

    let modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalBody.id = "tsr" + modalName + "ModalBody";


    let modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer", "justify-content-center");
    modalFooter.id = "tsr" + modalName + "ModalFooter";


    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    return modal;

}

function addModalContent() {
    let regModalHeader = document.getElementById("tsrUserRegModalHeader");
    let regModalBody = document.getElementById("tsrUserRegModalBody");
    let regModalFooter = document.getElementById("tsrUserRegModalFooter");

    regModalHeader.innerHTML = `
        <h1 class="modal-title fs-5" id="tsrUserRegPopupTitle">
            Welcome to 
                <span style="color: #0d6efd;"> 
                    Top Stock Research
                </span>
        </h1>
    `;

    regModalBody.innerHTML = `
        <div class="d-flex justify-content-center">
                        <span id="tsrRegLoginText" style="font-weight: 500; font-size: 18px;">Register</span>
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
                            <span class="input-group-text" id="basic-addon1">
                                <i class="far fa-envelope"></i>
                            </span>

                            <input type="email" class="form-control" id="tsrUserRegEmail" placeholder="Email Address"
                                required>
                        </div>
                        <div class="input-group mb-3">
                            <!-- <label for="tsrUserRegPassword" class="form-label" style="font-size: 14px;">Password</label> -->
                            <span class="input-group-text" id="basic-addon1">
                                <i class="fas fa-lock fa-sm"></i>
                            </span>
                            <input type="password" class="form-control" id="tsrUserRegPassword" placeholder="Password"
                                required>
                            <span class="input-group-text" id="basic-addon1" onclick="showPassword(event, 'tsrUserRegPassword')">
                                <i class="far fa-eye"></i>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <!-- <label for="tsrUserRegPhnNumber" class="form-label" style="font-size: 14px;">Phone number</label> -->
                            <span class="input-group-text" id="basic-addon1">
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

                        <button type="submit" class="btn btn-primary w-100">Register</button>
                    </form>
    `;

    regModalFooter.innerHTML = `
            <button type="button" class="btn" data-bs-target="#tsrUserLoginModal" data-bs-toggle="modal" style="font-weight: 300;">
                Already have an account? 
                <span style="text-decoration: underline; color: #0a58ca; font-weight: 500;">
                    Login
                </span>
            </button>
    `;

    // User login Modal
    let loginModalHeader = document.getElementById("tsrUserLoginModalHeader");
    let loginModalBody = document.getElementById("tsrUserLoginModalBody");
    let loginModalFooter = document.getElementById("tsrUserLoginModalFooter");

    loginModalHeader.innerHTML = `
         <h1 class="modal-title fs-5" id="tsrUserRegPopupTitle">Welcome back to <span style="color: #0d6efd;">Top
                            Stock Research</span></h1>
    `;

    loginModalBody.innerHTML = `
                    <div class="d-flex justify-content-center">
                        <span id="tsrRegLoginText" style="font-weight: 500; font-size: 18px;">Login</span>
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
                        <span class="input-group-text" id="basic-addon1">
                            <i class="far fa-envelope"></i>
                        </span>

                        <input type="email" class="form-control" id="tsrUserLoginEmail" placeholder="Email Address"
                            required>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">
                            <i class="fas fa-lock fa-sm"></i>
                        </span>
                        <input type="password" class="form-control" id="tsrUserLoginPassword" placeholder="Password"
                            required>
                            <span class="input-group-text" id="basic-addon1" onclick="showPassword(event, 'tsrUserLoginPassword')">
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

    loginModalFooter.innerHTML = `
        <button type="button" class="btn" data-bs-target="#tsrUserRegModal" data-bs-toggle="modal" style="font-weight: 300;">
                <span  style='text-decoration: underline; color: #0a58ca; font-weight: 500;'>
                    Register</span>
                    a new account 
            </button>
    `;



    let resetPswdModalHeader = document.getElementById("tsrResetPswdModalHeader");
    let resetPswdModalBody = document.getElementById("tsrResetPswdModalBody");
    let resetPswdModalFooter = document.getElementById("tsrResetPswdModalFooter");

    resetPswdModalHeader.innerHTML = `
         <h1 class="modal-title fs-5" id="tsrUserRegPopupTitle">
            Reset Password
        </h1>
    `;

    resetPswdModalBody.innerHTML = `
        <form class="mt-3" id="tsrUserResetPswdForm">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">
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

    resetPswdModalFooter.innerHTML = `
        <div style="font-weight: 300; text-align: center">
           On submit, you will receive a Password reset link on your e-mail, if it exists in our records
        </div>
        <div id="tsrUserRegPopup" class="form-text text-center">
            <button type="button" class="btn" data-bs-target="#tsrUserLoginModal" data-bs-toggle="modal">
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


function createUserDetailsModal(){
    let modal = createModal("UserDetails");

    document.body.appendChild(modal);

    let userDetailsModalHeader = document.getElementById("tsrUserRegModalHeader");
    let userDetailsModalBody = document.getElementById("tsrUserRegModalBody");
    let userDetailsModalFooter = document.getElementById("tsrUserRegModalFooter");

    userDetailsModalHeader.innerHTML = `
        <h1 class="modal-title fs-5" id="tsrUserRegPopupTitle">
            Welcome to 
                <span style="color: #0d6efd;"> 
                    Top Stock Research
                </span>
        </h1>
    `;

    userDetailsModalBody.innerHTML = `
        <div class="d-flex justify-content-center">
                        <span id="tsrRegLoginText" style="font-weight: 500; font-size: 18px;">Register</span>
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
                            <span class="input-group-text" id="basic-addon1">
                                <i class="far fa-envelope"></i>
                            </span>

                            <input type="email" class="form-control" id="tsrUserRegEmail" placeholder="Email Address"
                                required>
                        </div>
                        <div class="input-group mb-3">
                            <!-- <label for="tsrUserRegPassword" class="form-label" style="font-size: 14px;">Password</label> -->
                            <span class="input-group-text" id="basic-addon1">
                                <i class="fas fa-lock fa-sm"></i>
                            </span>
                            <input type="password" class="form-control" id="tsrUserRegPassword" placeholder="Password"
                                required>
                            <span class="input-group-text" id="basic-addon1" onclick="showPassword(event, 'tsrUserRegPassword')">
                                <i class="far fa-eye"></i>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <!-- <label for="tsrUserRegPhnNumber" class="form-label" style="font-size: 14px;">Phone number</label> -->
                            <span class="input-group-text" id="basic-addon1">
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

                        <button type="submit" class="btn btn-primary w-100">Register</button>
                    </form>
    `;

    userDetailsModalFooter.innerHTML = `
            <button type="button" class="btn" data-bs-target="#tsrUserLoginModal" data-bs-toggle="modal" style="font-weight: 300;">
                Already have an account? 
                <span style="text-decoration: underline; color: #0a58ca; font-weight: 500;">
                    Login
                </span>
            </button>
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

function showPassword(e, id) {

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
}