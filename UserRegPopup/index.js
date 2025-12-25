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

                    <!-- Register with Broker -->

                    <style>
                        #tsrUserRegWithBroker button {
                            display: flex;
                            justify-content: space-around; 
                            align-items: center; 
                            background-color: #fff; 
                            border: 1px solid #dadce0; 
                            color: #3c4043; 
                            height: 40px; 
                            padding: 0 12px; 
                            border-radius: 4px; 
                            font-size: 17px; 
                            font-family: 'Google Sans',arial,sans-serif; 
                            width: 75%;
                        }
                    </style>


                    <div id="tsrUserRegWithBroker" align="center">
                        <br>
                            
                            <div class="accordion accordion-flush" id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                        <button class="text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                            <i class="fas fa-handshake"></i>
                                            <span> Continue with your broker </span>
                                        </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                            <hr style="width: 60%;">
                                            <div class="container" style="height: 100px; overflow-y: auto;">
                                                <div class="row">
                                                    <div class="col-6 p-3">
                                                        <svg width="78" height="24" viewBox="0 0 78 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M51.4971 5.18364V7.35984H47.8143V13.577C47.8143 14.8976 48.5815 15.558 49.8548 15.558C50.5432 15.5455 51.2234 15.4458 51.8828 15.259L52.2187 17.4601C51.5925 17.7051 50.4893 17.8754 49.4856 17.8754C46.8728 17.8754 45.2305 16.4135 45.2305 13.8884V7.35984H43.0075V5.18364H45.272V1.1967H47.7811V5.18364H51.4971ZM37.3543 10.1175C35.7783 9.79353 35.1936 9.40314 35.1936 8.62652C35.1936 7.7087 36.1309 7.17711 38.0179 7.17711C39.316 7.17711 40.8049 7.46367 41.8168 7.90389L42.0906 5.67785C41.0496 5.22517 39.4238 4.92615 37.8893 4.92615C34.7664 4.92615 32.6844 6.47939 32.6844 8.58915C32.6844 10.5079 33.854 11.7579 36.0521 12.2023L37.8976 12.5761C39.5109 12.9 40.1869 13.3527 40.1869 14.1958C40.1869 15.1551 39.3118 15.6203 37.4414 15.6203C35.9733 15.6037 34.5217 15.2963 33.1697 14.7232L32.8586 16.9409C33.9369 17.5224 35.7078 17.8712 37.6073 17.8712C40.639 17.8712 42.6919 16.6668 42.6919 14.1542C42.6919 11.9905 41.3399 10.9315 38.8017 10.4123L37.3543 10.1175ZM51.846 11.4008C51.846 7.76269 54.6828 4.92615 58.4817 4.92615C62.2807 4.92615 65.1174 7.76269 65.1174 11.4008C65.1174 15.0388 62.2848 17.8754 58.4859 17.8754C54.6869 17.8754 51.8502 15.0388 51.8502 11.4008H51.846ZM54.4215 11.4008C54.4215 13.6933 56.1302 15.4666 58.4859 15.4666C60.8415 15.4666 62.5461 13.6891 62.5461 11.4008C62.5461 9.10828 60.8415 7.33492 58.4859 7.33492C56.1302 7.33492 54.4256 9.10828 54.4256 11.4008H54.4215ZM67.2572 5.18362L70.4921 9.56094L73.7311 5.18362H76.6965L72.0929 11.2678L76.8001 17.6137H73.839L70.4921 12.9664L67.1493 17.6137H64.184L68.8912 11.2678L64.2877 5.18362H67.2572ZM21.4452 6.88224C22.37 5.70277 23.776 4.92615 25.8952 4.92615C29.4454 4.92615 32.166 7.6464 32.166 11.4672C32.166 15.288 29.4454 17.8754 25.8952 17.8754C23.776 17.8754 22.37 17.0988 21.4452 15.9193V22.7968H18.8697V5.18779H21.4452V6.88224ZM21.4618 11.4672C21.4618 13.7597 23.1912 15.5704 25.5842 15.5704C27.9896 15.5704 29.5905 13.7555 29.5947 11.4672C29.5947 9.17473 27.9938 7.2311 25.5883 7.2311H25.5842C23.1788 7.23525 21.4618 9.17473 21.4618 11.4672ZM5.62792 11.8451C6.00532 11.5793 6.36199 11.2803 6.68963 10.9522C7.30343 10.3417 7.81356 9.63985 8.2034 8.87153V12.1857C8.2034 14.2456 9.33562 15.4334 11.2475 15.4334C13.2134 15.4334 14.7603 14.2456 14.7603 12.1857V5.18362H17.3317V17.6137H14.7437V16.048C14.329 16.6834 13.1429 17.8712 10.8411 17.8712C7.432 17.8712 5.62377 15.749 5.62377 12.7297L5.62792 11.8451ZM0 13.2696V10.7778C1.50133 10.7736 2.94045 10.1839 4.01046 9.14146C4.53302 8.62233 4.9519 8.00767 5.23806 7.33073C5.52423 6.64962 5.67353 5.92284 5.67353 5.18775H8.19925C8.19925 6.25093 7.98774 7.30165 7.57301 8.28178C7.16242 9.2619 6.55691 10.1507 5.79795 10.8982C4.251 12.4182 2.16905 13.2696 0 13.2696Z"
                                                                fill="#542087" />
                                                        </svg>


                                                    </div>
                                                    <div class="col-6 p-3">

                                                        <svg width="150" height="30" viewBox="0 0 150 50" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M23.8946 44.3924C34.3365 41.9238 40.8029 31.4454 38.3379 20.9887C35.8728 10.5319 25.4092 4.05626 14.9674 6.52484C4.52551 8.99343 -1.94098 19.4719 0.524099 29.9286C2.98918 40.3853 13.4527 46.861 23.8946 44.3924Z"
                                                                fill="#5367FF" />
                                                            <path
                                                                d="M38.3377 20.9891C37.9862 19.4941 37.4698 18.0816 36.8144 16.7604L36.8101 16.7647L24.5758 28.0906C23.812 28.799 22.675 28.9207 21.7766 28.3949L16.5774 25.3439C15.7354 24.8528 14.6808 24.9267 13.917 25.5308C10.6968 28.0819 2.45091 34.6141 2.33373 34.7097C6.40024 42.2633 15.1539 46.4616 23.8945 44.3928C34.3363 41.9243 40.8028 31.4458 38.3377 20.9891Z"
                                                                fill="#00F3BB" />
                                                            <path
                                                                d="M61.135 35.5503C58.066 35.5503 55.5795 34.598 53.6755 32.6934C51.7715 30.7888 50.8196 28.3965 50.8196 25.5164V25.4607C50.8196 22.6735 51.7905 20.2951 53.7323 18.3255C55.6742 16.3559 58.1228 15.3711 61.0782 15.3711C62.7454 15.3711 64.1662 15.5894 65.3408 16.0261C66.5154 16.4627 67.6426 17.127 68.7224 18.0189L66.5059 20.611C65.6723 19.9049 64.834 19.38 63.991 19.0362C63.1479 18.6925 62.1296 18.5206 60.9361 18.5206C59.1174 18.5206 57.5876 19.1942 56.3467 20.5413C55.1058 21.8885 54.4854 23.5096 54.4854 25.4049V25.4607C54.4854 27.486 55.1106 29.1537 56.3609 30.4637C57.6113 31.7736 59.2405 32.4286 61.2487 32.4286C63.1053 32.4286 64.7061 31.9362 66.0512 30.9514V27.3002H60.9645V24.3179H69.4329V32.5122C67.0269 34.5376 64.261 35.5503 61.135 35.5503Z"
                                                                fill="#44475B" />
                                                            <path
                                                                d="M73.9878 35.215V20.4987H77.4262V23.8155C78.4872 21.307 80.2585 20.1085 82.7403 20.22V23.7876H82.5413C80.9879 23.7876 79.747 24.2846 78.8187 25.2787C77.8904 26.2728 77.4262 27.7175 77.4262 29.6128V35.215H73.9878Z"
                                                                fill="#44475B" />
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M87.0679 33.3349C88.5835 34.8121 90.4779 35.5507 92.7513 35.5507C95.0437 35.5507 96.9571 34.8028 98.4916 33.307C100.026 31.8112 100.793 30.0042 100.793 27.886V27.8302C100.793 25.712 100.031 23.9096 98.5058 22.4231C96.9808 20.9366 95.0816 20.1934 92.8082 20.1934C90.5348 20.1934 88.6308 20.9412 87.0963 22.437C85.5618 23.9328 84.7945 25.7491 84.7945 27.886V27.9417C84.7945 30.06 85.5523 31.8577 87.0679 33.3349ZM96.1045 31.2451C95.2709 32.1463 94.1721 32.5969 92.8081 32.5969C91.5009 32.5969 90.4116 32.137 89.5401 31.2173C88.6686 30.2975 88.2329 29.1873 88.2329 27.8866V27.8308C88.2329 26.5116 88.6497 25.4014 89.4833 24.5002C90.3168 23.599 91.4062 23.1484 92.7512 23.1484C94.0774 23.1484 95.1762 23.6083 96.0476 24.528C96.9191 25.4478 97.3548 26.5673 97.3548 27.8866V27.9423C97.3548 29.243 96.938 30.3439 96.1045 31.2451Z"
                                                                fill="#44475B" />
                                                            <path
                                                                d="M107.593 35.3249L102.734 20.4971H106.258L109.27 30.5867L112.595 20.4414H115.55L118.875 30.5867L121.944 20.4971H125.411L120.495 35.3249H117.397L114.044 25.2632L110.662 35.3249H107.593Z"
                                                                fill="#44475B" />
                                                            <path
                                                                d="M132.182 35.3249L127.323 20.4971H130.847L133.859 30.5867L137.184 20.4414H140.139L143.464 30.5867L146.533 20.4971H150L145.084 35.3249H141.986L138.633 25.2632L135.251 35.3249H132.182Z"
                                                                fill="#44475B" />
                                                        </svg>

                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-6 p-3">

                                                        <svg width="195" height="30" viewBox="0 0 195 55" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <g clip-path="url(#clip0_20_1053)">
                                                                <path
                                                                    d="M32.2272 0.939453V54.9394L25.0841 43.1955V25.8501H15.0754L10.3767 18.2072L10.2995 17.9088H24.9595C24.9687 17.9088 25.0841 17.7926 25.0841 17.7834V11.2213H5.93887C4.07916 8.16102 2.37146 5.00958 0.564912 1.91749C0.438661 1.70098 0.247624 1.23203 0.000106812 1.19023V0.939453H32.2272Z"
                                                                    fill="#182BFF" />
                                                                <path
                                                                    d="M67.1953 0.939453L61.2566 11.2213H42.1113V18.0759H56.7298C56.7381 18.2423 56.6202 18.3777 56.5463 18.5181C55.1907 21.0736 53.5179 23.4827 52.12 26.0172H42.1113V43.3627L34.9691 54.9394V0.939453H67.1953Z"
                                                                    fill="#182BFF" />
                                                                <path
                                                                    d="M194.999 35.9718C194.689 35.9126 194.838 36.1278 194.793 36.3026C193.363 41.8503 186.781 44.1364 181.654 42.8358C177.617 41.8118 173.585 38.8079 173.805 34.1943H180.183C180.01 39.7568 189.795 39.5199 188.988 33.8744C188.933 33.4902 188.694 32.9451 188.416 32.6726C186.531 30.8309 181.193 29.9116 178.579 28.7483C175.755 27.4912 173.802 25.4234 173.605 22.2003C173.252 16.4363 177.046 13.3711 182.393 12.7658C187.919 12.1397 194.32 15.2888 194.607 21.4547H188.033C187.853 18.6206 185.074 17.6529 182.6 17.9116C179.889 18.196 178.795 21.5999 180.922 23.4267C182.578 24.8497 186.563 25.5953 188.745 26.4159C191.531 27.4636 193.976 28.9043 194.794 31.9853C194.84 32.1591 194.689 32.3754 195 32.3161V35.9698L194.999 35.9718Z"
                                                                    fill="#979798" />
                                                                <path
                                                                    d="M147.215 12.9629L159.533 12.959C163.763 13.3797 167.494 15.2934 168.653 19.6788C170.035 24.9116 167.328 29.0343 162.369 30.5393C162.262 30.5718 162.192 30.4711 162.231 30.6834L169.095 42.7851H162.472C160.167 38.9991 158.007 35.1084 155.849 31.2315H153.102V42.7851H147.215V12.9629ZM153.102 26.7878H158.744C159.668 26.7878 161.263 25.8951 161.888 25.2118C163.31 23.6555 163.066 20.2862 161.376 19.0034C160.091 18.0278 158.045 18.0426 156.491 17.9952C155.364 17.9606 154.228 18.0288 153.102 17.9991V26.7878Z"
                                                                    fill="#979798" />
                                                                <path
                                                                    d="M141.622 13.1611V17.8023H130.584C130.573 17.8023 130.436 17.9396 130.436 17.9505V25.1591C130.436 25.17 130.573 25.3073 130.584 25.3073H140.445V29.9485H130.436V37.8484H141.622V42.9833H124.549V13.1611H141.622Z"
                                                                    fill="#979798" />
                                                                <path
                                                                    d="M101.982 13.1611L108.164 26.6897L114.59 13.1611H121.115L111.205 32.4665V42.9833H105.024V32.4665L95.1136 13.1611H101.982Z"
                                                                    fill="#979798" />
                                                                <path
                                                                    d="M93.4456 13.1611V17.753C93.4456 17.7638 93.3092 17.9011 93.2984 17.9011H81.1807V25.5047H90.6982V30.0966C90.6982 30.1074 90.5619 30.2447 90.5511 30.2447H81.1807V42.9833H75.1954V13.1611H93.4456Z"
                                                                    fill="#979798" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_20_1053">
                                                                    <rect width="195" height="54" fill="white"
                                                                        transform="translate(0.000106812 0.939453)" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>

                                                    </div>
                                                    <div class="col-6 p-3">
                                                        <img height="60"
                                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXE39dNXeijvTeJp0v3RoGimKNAiikdINL6g&s"
                                                            alt="">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <br>

                    </div>

                    
                     <div class="line-container d-flex w-100">
                        <div class="line"></div>
                        <div class="fw-300 fs-16 mx-3">or</div>
                        <div class="line"></div>
                    </div>

                    <!-- Register with broker ends here -->
                    
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

                    <!-- Login with Broker starts here -->
                    
                    <style>
                        #tsrUserLoginWithBroker button {
                            display: flex;
                            justify-content: space-around; 
                            align-items: center; 
                            background-color: #fff; 
                            border: 1px solid #dadce0; 
                            color: #3c4043; 
                            height: 40px; 
                            padding: 0 12px; 
                            border-radius: 4px; 
                            font-size: 17px; 
                            font-family: 'Google Sans',arial,sans-serif; 
                            width: 75%;
                            max-width: 350px;
                        }
                    </style>

                    <div id="tsrUserLoginWithBroker" align="center">
                        <br>
                            
                            <div class="accordion accordion-flush" id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                        <button class="text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                            <i class="fas fa-handshake"></i>
                                            <span> Continue with your broker </span>
                                        </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                            <hr style="width: 60%;">
                                            <div class="container" style="height: 100px; overflow-y: auto;">
                                                <div class="row">
                                                    <div class="col-6 p-3">
                                                        <svg width="78" height="24" viewBox="0 0 78 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M51.4971 5.18364V7.35984H47.8143V13.577C47.8143 14.8976 48.5815 15.558 49.8548 15.558C50.5432 15.5455 51.2234 15.4458 51.8828 15.259L52.2187 17.4601C51.5925 17.7051 50.4893 17.8754 49.4856 17.8754C46.8728 17.8754 45.2305 16.4135 45.2305 13.8884V7.35984H43.0075V5.18364H45.272V1.1967H47.7811V5.18364H51.4971ZM37.3543 10.1175C35.7783 9.79353 35.1936 9.40314 35.1936 8.62652C35.1936 7.7087 36.1309 7.17711 38.0179 7.17711C39.316 7.17711 40.8049 7.46367 41.8168 7.90389L42.0906 5.67785C41.0496 5.22517 39.4238 4.92615 37.8893 4.92615C34.7664 4.92615 32.6844 6.47939 32.6844 8.58915C32.6844 10.5079 33.854 11.7579 36.0521 12.2023L37.8976 12.5761C39.5109 12.9 40.1869 13.3527 40.1869 14.1958C40.1869 15.1551 39.3118 15.6203 37.4414 15.6203C35.9733 15.6037 34.5217 15.2963 33.1697 14.7232L32.8586 16.9409C33.9369 17.5224 35.7078 17.8712 37.6073 17.8712C40.639 17.8712 42.6919 16.6668 42.6919 14.1542C42.6919 11.9905 41.3399 10.9315 38.8017 10.4123L37.3543 10.1175ZM51.846 11.4008C51.846 7.76269 54.6828 4.92615 58.4817 4.92615C62.2807 4.92615 65.1174 7.76269 65.1174 11.4008C65.1174 15.0388 62.2848 17.8754 58.4859 17.8754C54.6869 17.8754 51.8502 15.0388 51.8502 11.4008H51.846ZM54.4215 11.4008C54.4215 13.6933 56.1302 15.4666 58.4859 15.4666C60.8415 15.4666 62.5461 13.6891 62.5461 11.4008C62.5461 9.10828 60.8415 7.33492 58.4859 7.33492C56.1302 7.33492 54.4256 9.10828 54.4256 11.4008H54.4215ZM67.2572 5.18362L70.4921 9.56094L73.7311 5.18362H76.6965L72.0929 11.2678L76.8001 17.6137H73.839L70.4921 12.9664L67.1493 17.6137H64.184L68.8912 11.2678L64.2877 5.18362H67.2572ZM21.4452 6.88224C22.37 5.70277 23.776 4.92615 25.8952 4.92615C29.4454 4.92615 32.166 7.6464 32.166 11.4672C32.166 15.288 29.4454 17.8754 25.8952 17.8754C23.776 17.8754 22.37 17.0988 21.4452 15.9193V22.7968H18.8697V5.18779H21.4452V6.88224ZM21.4618 11.4672C21.4618 13.7597 23.1912 15.5704 25.5842 15.5704C27.9896 15.5704 29.5905 13.7555 29.5947 11.4672C29.5947 9.17473 27.9938 7.2311 25.5883 7.2311H25.5842C23.1788 7.23525 21.4618 9.17473 21.4618 11.4672ZM5.62792 11.8451C6.00532 11.5793 6.36199 11.2803 6.68963 10.9522C7.30343 10.3417 7.81356 9.63985 8.2034 8.87153V12.1857C8.2034 14.2456 9.33562 15.4334 11.2475 15.4334C13.2134 15.4334 14.7603 14.2456 14.7603 12.1857V5.18362H17.3317V17.6137H14.7437V16.048C14.329 16.6834 13.1429 17.8712 10.8411 17.8712C7.432 17.8712 5.62377 15.749 5.62377 12.7297L5.62792 11.8451ZM0 13.2696V10.7778C1.50133 10.7736 2.94045 10.1839 4.01046 9.14146C4.53302 8.62233 4.9519 8.00767 5.23806 7.33073C5.52423 6.64962 5.67353 5.92284 5.67353 5.18775H8.19925C8.19925 6.25093 7.98774 7.30165 7.57301 8.28178C7.16242 9.2619 6.55691 10.1507 5.79795 10.8982C4.251 12.4182 2.16905 13.2696 0 13.2696Z"
                                                                fill="#542087" />
                                                        </svg>


                                                    </div>
                                                    <div class="col-6 p-3">

                                                        <svg width="150" height="30" viewBox="0 0 150 50" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M23.8946 44.3924C34.3365 41.9238 40.8029 31.4454 38.3379 20.9887C35.8728 10.5319 25.4092 4.05626 14.9674 6.52484C4.52551 8.99343 -1.94098 19.4719 0.524099 29.9286C2.98918 40.3853 13.4527 46.861 23.8946 44.3924Z"
                                                                fill="#5367FF" />
                                                            <path
                                                                d="M38.3377 20.9891C37.9862 19.4941 37.4698 18.0816 36.8144 16.7604L36.8101 16.7647L24.5758 28.0906C23.812 28.799 22.675 28.9207 21.7766 28.3949L16.5774 25.3439C15.7354 24.8528 14.6808 24.9267 13.917 25.5308C10.6968 28.0819 2.45091 34.6141 2.33373 34.7097C6.40024 42.2633 15.1539 46.4616 23.8945 44.3928C34.3363 41.9243 40.8028 31.4458 38.3377 20.9891Z"
                                                                fill="#00F3BB" />
                                                            <path
                                                                d="M61.135 35.5503C58.066 35.5503 55.5795 34.598 53.6755 32.6934C51.7715 30.7888 50.8196 28.3965 50.8196 25.5164V25.4607C50.8196 22.6735 51.7905 20.2951 53.7323 18.3255C55.6742 16.3559 58.1228 15.3711 61.0782 15.3711C62.7454 15.3711 64.1662 15.5894 65.3408 16.0261C66.5154 16.4627 67.6426 17.127 68.7224 18.0189L66.5059 20.611C65.6723 19.9049 64.834 19.38 63.991 19.0362C63.1479 18.6925 62.1296 18.5206 60.9361 18.5206C59.1174 18.5206 57.5876 19.1942 56.3467 20.5413C55.1058 21.8885 54.4854 23.5096 54.4854 25.4049V25.4607C54.4854 27.486 55.1106 29.1537 56.3609 30.4637C57.6113 31.7736 59.2405 32.4286 61.2487 32.4286C63.1053 32.4286 64.7061 31.9362 66.0512 30.9514V27.3002H60.9645V24.3179H69.4329V32.5122C67.0269 34.5376 64.261 35.5503 61.135 35.5503Z"
                                                                fill="#44475B" />
                                                            <path
                                                                d="M73.9878 35.215V20.4987H77.4262V23.8155C78.4872 21.307 80.2585 20.1085 82.7403 20.22V23.7876H82.5413C80.9879 23.7876 79.747 24.2846 78.8187 25.2787C77.8904 26.2728 77.4262 27.7175 77.4262 29.6128V35.215H73.9878Z"
                                                                fill="#44475B" />
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M87.0679 33.3349C88.5835 34.8121 90.4779 35.5507 92.7513 35.5507C95.0437 35.5507 96.9571 34.8028 98.4916 33.307C100.026 31.8112 100.793 30.0042 100.793 27.886V27.8302C100.793 25.712 100.031 23.9096 98.5058 22.4231C96.9808 20.9366 95.0816 20.1934 92.8082 20.1934C90.5348 20.1934 88.6308 20.9412 87.0963 22.437C85.5618 23.9328 84.7945 25.7491 84.7945 27.886V27.9417C84.7945 30.06 85.5523 31.8577 87.0679 33.3349ZM96.1045 31.2451C95.2709 32.1463 94.1721 32.5969 92.8081 32.5969C91.5009 32.5969 90.4116 32.137 89.5401 31.2173C88.6686 30.2975 88.2329 29.1873 88.2329 27.8866V27.8308C88.2329 26.5116 88.6497 25.4014 89.4833 24.5002C90.3168 23.599 91.4062 23.1484 92.7512 23.1484C94.0774 23.1484 95.1762 23.6083 96.0476 24.528C96.9191 25.4478 97.3548 26.5673 97.3548 27.8866V27.9423C97.3548 29.243 96.938 30.3439 96.1045 31.2451Z"
                                                                fill="#44475B" />
                                                            <path
                                                                d="M107.593 35.3249L102.734 20.4971H106.258L109.27 30.5867L112.595 20.4414H115.55L118.875 30.5867L121.944 20.4971H125.411L120.495 35.3249H117.397L114.044 25.2632L110.662 35.3249H107.593Z"
                                                                fill="#44475B" />
                                                            <path
                                                                d="M132.182 35.3249L127.323 20.4971H130.847L133.859 30.5867L137.184 20.4414H140.139L143.464 30.5867L146.533 20.4971H150L145.084 35.3249H141.986L138.633 25.2632L135.251 35.3249H132.182Z"
                                                                fill="#44475B" />
                                                        </svg>

                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-6 p-3">

                                                        <svg width="195" height="30" viewBox="0 0 195 55" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <g clip-path="url(#clip0_20_1053)">
                                                                <path
                                                                    d="M32.2272 0.939453V54.9394L25.0841 43.1955V25.8501H15.0754L10.3767 18.2072L10.2995 17.9088H24.9595C24.9687 17.9088 25.0841 17.7926 25.0841 17.7834V11.2213H5.93887C4.07916 8.16102 2.37146 5.00958 0.564912 1.91749C0.438661 1.70098 0.247624 1.23203 0.000106812 1.19023V0.939453H32.2272Z"
                                                                    fill="#182BFF" />
                                                                <path
                                                                    d="M67.1953 0.939453L61.2566 11.2213H42.1113V18.0759H56.7298C56.7381 18.2423 56.6202 18.3777 56.5463 18.5181C55.1907 21.0736 53.5179 23.4827 52.12 26.0172H42.1113V43.3627L34.9691 54.9394V0.939453H67.1953Z"
                                                                    fill="#182BFF" />
                                                                <path
                                                                    d="M194.999 35.9718C194.689 35.9126 194.838 36.1278 194.793 36.3026C193.363 41.8503 186.781 44.1364 181.654 42.8358C177.617 41.8118 173.585 38.8079 173.805 34.1943H180.183C180.01 39.7568 189.795 39.5199 188.988 33.8744C188.933 33.4902 188.694 32.9451 188.416 32.6726C186.531 30.8309 181.193 29.9116 178.579 28.7483C175.755 27.4912 173.802 25.4234 173.605 22.2003C173.252 16.4363 177.046 13.3711 182.393 12.7658C187.919 12.1397 194.32 15.2888 194.607 21.4547H188.033C187.853 18.6206 185.074 17.6529 182.6 17.9116C179.889 18.196 178.795 21.5999 180.922 23.4267C182.578 24.8497 186.563 25.5953 188.745 26.4159C191.531 27.4636 193.976 28.9043 194.794 31.9853C194.84 32.1591 194.689 32.3754 195 32.3161V35.9698L194.999 35.9718Z"
                                                                    fill="#979798" />
                                                                <path
                                                                    d="M147.215 12.9629L159.533 12.959C163.763 13.3797 167.494 15.2934 168.653 19.6788C170.035 24.9116 167.328 29.0343 162.369 30.5393C162.262 30.5718 162.192 30.4711 162.231 30.6834L169.095 42.7851H162.472C160.167 38.9991 158.007 35.1084 155.849 31.2315H153.102V42.7851H147.215V12.9629ZM153.102 26.7878H158.744C159.668 26.7878 161.263 25.8951 161.888 25.2118C163.31 23.6555 163.066 20.2862 161.376 19.0034C160.091 18.0278 158.045 18.0426 156.491 17.9952C155.364 17.9606 154.228 18.0288 153.102 17.9991V26.7878Z"
                                                                    fill="#979798" />
                                                                <path
                                                                    d="M141.622 13.1611V17.8023H130.584C130.573 17.8023 130.436 17.9396 130.436 17.9505V25.1591C130.436 25.17 130.573 25.3073 130.584 25.3073H140.445V29.9485H130.436V37.8484H141.622V42.9833H124.549V13.1611H141.622Z"
                                                                    fill="#979798" />
                                                                <path
                                                                    d="M101.982 13.1611L108.164 26.6897L114.59 13.1611H121.115L111.205 32.4665V42.9833H105.024V32.4665L95.1136 13.1611H101.982Z"
                                                                    fill="#979798" />
                                                                <path
                                                                    d="M93.4456 13.1611V17.753C93.4456 17.7638 93.3092 17.9011 93.2984 17.9011H81.1807V25.5047H90.6982V30.0966C90.6982 30.1074 90.5619 30.2447 90.5511 30.2447H81.1807V42.9833H75.1954V13.1611H93.4456Z"
                                                                    fill="#979798" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_20_1053">
                                                                    <rect width="195" height="54" fill="white"
                                                                        transform="translate(0.000106812 0.939453)" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>

                                                    </div>
                                                    <div class="col-6 p-3">
                                                        <img height="60"
                                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXE39dNXeijvTeJp0v3RoGimKNAiikdINL6g&s"
                                                            alt="">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <br>

                    </div>

                    
                     <div class="line-container d-flex w-100">
                        <div class="line"></div>
                        <div class="fw-300 fs-16 mx-3">or</div>
                        <div class="line"></div>
                    </div>

                    <!-- Login with broker ends here -->

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