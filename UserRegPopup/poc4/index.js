
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


        }

        function renderGsiButtons() {
            google.accounts.id.renderButton(document.getElementById("tsrUserLoginGoogleSignIn"), {
                theme: 'outline',
                size: 'large',
                text: "continue_with",
                width: "300px",
                size: "large"
            });

            google.accounts.id.renderButton(document.getElementById("tsrUserRegGoogleSignIn"), {
                theme: 'outline',
                size: 'large',
                text: "continue_with",
                width: "300px",
                size: "large"
            });
        }

        setTimeout(renderGsiButtons, 1000);

        function handleCredentialResponse(response) {
            console.log(response.credential);
        }