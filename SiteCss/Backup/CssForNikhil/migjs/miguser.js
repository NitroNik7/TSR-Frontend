var showSocialmedia = false;


var migu = (function () {

	var htmlU = mintHtmlUtil;
  	var jsu = mintJsUtil;
    var usrDt={};

    var GOOGLE_SIGN_IN_DIV =  'gglSignInDiv'; 

    var INVALID_CAPTCHA ='Please Enter Image Values. Click on change Image if image is not legible';


        var thisObject =  'migu'  ;//  'usrMgmt';
	    var SPC ='spc' // Design by SP Connect
	    var USER_FB_DIV = 'userFeedback'
	    var CONTENT_DIV = 'userEditContentDiv'
	    var nonModal ;
	    var userJson;

    // Google Sign In Dib
        


    var salutations = [
        {id: "Dear", label : "Dear"},
        {id: "Mr.", label : "Mr."},
        {id: "Mrs.", label : "Mrs."},
        {id: "Miss", label : "Miss"},
        {id: "Dr.", label : "Dr."},
        {id: "Prof.", label : "Prof."},
    ];

    var states = [];


	var countries = [
        
        {id: "USA", label: "United States"},
        {id: "CAN", label: "Canada"},
        {id: "GBR", label: "United Kingdom"},
        {id: "IND", label: "India"},
        {id: "AFG", label: "Afghanistan"},
        {id: "ALA", label: "Aland Islands"},
        {id: "ALB", label: "Albania"},
        {id: "DZA", label: "Algeria"},
        {id: "ASM", label: "American Samoa"},
        {id: "AND", label: "Andorra"},
        {id: "AGO", label: "Angola"},
        {id: "AIA", label: "Anguilla"},
        {id: "ATA", label: "Antarctica"},
        {id: "ATG", label: "Antigua and Barbuda"},
        {id: "ARG", label: "Argentina"},
        {id: "ARM", label: "Armenia"},
        {id: "ABW", label: "Aruba"},
        {id: "AUS", label: "Australia"},
        {id: "AUT", label: "Austria"},
        {id: "AZE", label: "Azerbaijan"},
        {id: "BHS", label: "Bahamas"},
        {id: "BHR", label: "Bahrain"},
        {id: "BGD", label: "Bangladesh"},
        {id: "BRB", label: "Barbados"},
        {id: "BLR", label: "Belarus"},
        {id: "BEL", label: "Belgium"},
        {id: "BLZ", label: "Belize"},
        {id: "BEN", label: "Benin"},
        {id: "BMU", label: "Bermuda"},
        {id: "BTN", label: "Bhutan"},
        {id: "BOL", label: "Bolivia, Plurinational State of"},
        {id: "BES", label: "Bonaire, Sint Eustatius and Saba"},
        {id: "BIH", label: "Bosnia and Herzegovina"},
        {id: "BWA", label: "Botswana"},
        {id: "BVT", label: "Bouvet Island"},
        {id: "BRA", label: "Brazil"},
        {id: "IOT", label: "British Indian Ocean Territory"},
        {id: "BRN", label: "Brunei Darussalam"},
        {id: "BGR", label: "Bulgaria"},
        {id: "BFA", label: "Burkina Faso"},
        {id: "BDI", label: "Burundi"},
        {id: "KHM", label: "Cambodia"},
        {id: "CMR", label: "Cameroon"},
        {id: "CAN", label: "Canada"},
        {id: "CPV", label: "Cape Verde"},
        {id: "CYM", label: "Cayman Islands"},
        {id: "CAF", label: "Central African Republic"},
        {id: "TCD", label: "Chad"},
        {id: "CHL", label: "Chile"},
        {id: "CHN", label: "China"},
        {id: "CXR", label: "Christmas Island"},
        {id: "CCK", label: "Cocos (Keeling) Islands"},
        {id: "COL", label: "Colombia"},
        {id: "COM", label: "Comoros"},
        {id: "COG", label: "Congo"},
        {id: "COD", label: "Congo, the Democratic Republic of the"},
        {id: "COK", label: "Cook Islands"},
        {id: "CRI", label: "Costa Rica"},
        {id: "CIV", label: "C�te d'Ivoire"},
        {id: "HRV", label: "Croatia"},
        {id: "CUB", label: "Cuba"},
        {id: "CUW", label: "Cura�ao"},
        {id: "CYP", label: "Cyprus"},
        {id: "CZE", label: "Czech Republic"},
        {id: "DNK", label: "Denmark"},
        {id: "DJI", label: "Djibouti"},
        {id: "DMA", label: "Dominica"},
        {id: "DOM", label: "Dominican Republic"},
        {id: "ECU", label: "Ecuador"},
        {id: "EGY", label: "Egypt"},
        {id: "SLV", label: "El Salvador"},
        {id: "GNQ", label: "Equatorial Guinea"},
        {id: "ERI", label: "Eritrea"},
        {id: "EST", label: "Estonia"},
        {id: "ETH", label: "Ethiopia"},
        {id: "FLK", label: "Falkland Islands (Malvinas)"},
        {id: "FRO", label: "Faroe Islands"},
        {id: "FJI", label: "Fiji"},
        {id: "FIN", label: "Finland"},
        {id: "FRA", label: "France"},
        {id: "GUF", label: "French Guiana"},
        {id: "PYF", label: "French Polynesia"},
        {id: "ATF", label: "French Southern Territories"},
        {id: "GAB", label: "Gabon"},
        {id: "GMB", label: "Gambia"},
        {id: "GEO", label: "Georgia"},
        {id: "DEU", label: "Germany"},
        {id: "GHA", label: "Ghana"},
        {id: "GIB", label: "Gibraltar"},
        {id: "GRC", label: "Greece"},
        {id: "GRL", label: "Greenland"},
        {id: "GRD", label: "Grenada"},
        {id: "GLP", label: "Guadeloupe"},
        {id: "GUM", label: "Guam"},
        {id: "GTM", label: "Guatemala"},
        {id: "GGY", label: "Guernsey"},
        {id: "GIN", label: "Guinea"},
        {id: "GNB", label: "Guinea-Bissau"},
        {id: "GUY", label: "Guyana"},
        {id: "HTI", label: "Haiti"},
        {id: "HMD", label: "Heard Island and McDonald Islands"},
        {id: "VAT", label: "Holy See (Vatican City State)"},
        {id: "HND", label: "Honduras"},
        {id: "HKG", label: "Hong Kong"},
        {id: "HUN", label: "Hungary"},
        {id: "ISL", label: "Iceland"},
        {id: "IND", label: "India"},
        {id: "IDN", label: "Indonesia"},
        {id: "IRN", label: "Iran, Islamic Republic of"},
        {id: "IRQ", label: "Iraq"},
        {id: "IRL", label: "Ireland"},
        {id: "IMN", label: "Isle of Man"},
        {id: "ISR", label: "Israel"},
        {id: "ITA", label: "Italy"},
        {id: "JAM", label: "Jamaica"},
        {id: "JPN", label: "Japan"},
        {id: "JEY", label: "Jersey"},
        {id: "JOR", label: "Jordan"},
        {id: "KAZ", label: "Kazakhstan"},
        {id: "KEN", label: "Kenya"},
        {id: "KIR", label: "Kiribati"},
        {id: "PRK", label: "Korea, Democratic People's Republic of"},
        {id: "KOR", label: "Korea, Republic of"},
        {id: "KWT", label: "Kuwait"},
        {id: "KGZ", label: "Kyrgyzstan"},
        {id: "LAO", label: "Lao People's Democratic Republic"},
        {id: "LVA", label: "Latvia"},
        {id: "LBN", label: "Lebanon"},
        {id: "LSO", label: "Lesotho"},
        {id: "LBR", label: "Liberia"},
        {id: "LBY", label: "Libya"},
        {id: "LIE", label: "Liechtenstein"},
        {id: "LTU", label: "Lithuania"},
        {id: "LUX", label: "Luxembourg"},
        {id: "MAC", label: "Macao"},
        {id: "MKD", label: "Macedonia, the former Yugoslav Republic of"},
        {id: "MDG", label: "Madagascar"},
        {id: "MWI", label: "Malawi"},
        {id: "MYS", label: "Malaysia"},
        {id: "MDV", label: "Maldives"},
        {id: "MLI", label: "Mali"},
        {id: "MLT", label: "Malta"},
        {id: "MHL", label: "Marshall Islands"},
        {id: "MTQ", label: "Martinique"},
        {id: "MRT", label: "Mauritania"},
        {id: "MUS", label: "Mauritius"},
        {id: "MYT", label: "Mayotte"},
        {id: "MEX", label: "Mexico"},
        {id: "FSM", label: "Micronesia, Federated States of"},
        {id: "MDA", label: "Moldova, Republic of"},
        {id: "MCO", label: "Monaco"},
        {id: "MNG", label: "Mongolia"},
        {id: "MNE", label: "Montenegro"},
        {id: "MSR", label: "Montserrat"},
        {id: "MAR", label: "Morocco"},
        {id: "MOZ", label: "Mozambique"},
        {id: "MMR", label: "Myanmar"},
        {id: "NAM", label: "Namibia"},
        {id: "NRU", label: "Nauru"},
        {id: "NPL", label: "Nepal"},
        {id: "NLD", label: "Netherlands"},
        {id: "NCL", label: "New Caledonia"},
        {id: "NZL", label: "New Zealand"},
        {id: "NIC", label: "Nicaragua"},
        {id: "NER", label: "Niger"},
        {id: "NGA", label: "Nigeria"},
        {id: "NIU", label: "Niue"},
        {id: "NFK", label: "Norfolk Island"},
        {id: "MNP", label: "Northern Mariana Islands"},
        {id: "NOR", label: "Norway"},
        {id: "OMN", label: "Oman"},
        {id: "PAK", label: "Pakistan"},
        {id: "PLW", label: "Palau"},
        {id: "PSE", label: "Palestinian Territory, Occupied"},
        {id: "PAN", label: "Panama"},
        {id: "PNG", label: "Papua New Guinea"},
        {id: "PRY", label: "Paraguay"},
        {id: "PER", label: "Peru"},
        {id: "PHL", label: "Philippines"},
        {id: "PCN", label: "Pitcairn"},
        {id: "POL", label: "Poland"},
        {id: "PRT", label: "Portugal"},
        {id: "PRI", label: "Puerto Rico"},
        {id: "QAT", label: "Qatar"},
        {id: "REU", label: "R�union"},
        {id: "ROU", label: "Romania"},
        {id: "RUS", label: "Russian Federation"},
        {id: "RWA", label: "Rwanda"},
        {id: "BLM", label: "Saint Barth�lemy"},
        {id: "SHN", label: "Saint Helena, Ascension and Tristan da Cunha"},
        {id: "KNA", label: "Saint Kitts and Nevis"},
        {id: "LCA", label: "Saint Lucia"},
        {id: "MAF", label: "Saint Martin (French part)"},
        {id: "SPM", label: "Saint Pierre and Miquelon"},
        {id: "VCT", label: "Saint Vincent and the Grenadines"},
        {id: "WSM", label: "Samoa"},
        {id: "SMR", label: "San Marino"},
        {id: "STP", label: "Sao Tome and Principe"},
        {id: "SAU", label: "Saudi Arabia"},
        {id: "SEN", label: "Senegal"},
        {id: "SRB", label: "Serbia"},
        {id: "SYC", label: "Seychelles"},
        {id: "SLE", label: "Sierra Leone"},
        {id: "SGP", label: "Singapore"},
        {id: "SXM", label: "Sint Maarten (Dutch part)"},
        {id: "SVK", label: "Slovakia"},
        {id: "SVN", label: "Slovenia"},
        {id: "SLB", label: "Solomon Islands"},
        {id: "SOM", label: "Somalia"},
        {id: "ZAF", label: "South Africa"},
        {id: "SGS", label: "South Georgia and the South Sandwich Islands"},
        {id: "SSD", label: "South Sudan"},
        {id: "ESP", label: "Spain"},
        {id: "LKA", label: "Sri Lanka"},
        {id: "SDN", label: "Sudan"},
        {id: "SUR", label: "Suriname"},
        {id: "SJM", label: "Svalbard and Jan Mayen"},
        {id: "SWZ", label: "Swaziland"},
        {id: "SWE", label: "Sweden"},
        {id: "CHE", label: "Switzerland"},
        {id: "SYR", label: "Syrian Arab Republic"},
        {id: "TWN", label: "Taiwan, Province of China"},
        {id: "TJK", label: "Tajikistan"},
        {id: "TZA", label: "Tanzania, United Republic of"},
        {id: "THA", label: "Thailand"},
        {id: "TLS", label: "Timor-Leste"},
        {id: "TGO", label: "Togo"},
        {id: "TKL", label: "Tokelau"},
        {id: "TON", label: "Tonga"},
        {id: "TTO", label: "Trinidad and Tobago"},
        {id: "TUN", label: "Tunisia"},
        {id: "TUR", label: "Turkey"},
        {id: "TKM", label: "Turkmenistan"},
        {id: "TCA", label: "Turks and Caicos Islands"},
        {id: "TUV", label: "Tuvalu"},
        {id: "UGA", label: "Uganda"},
        {id: "UKR", label: "Ukraine"},
        {id: "ARE", label: "United Arab Emirates"},
        {id: "GBR", label: "United Kingdom"},
        {id: "USA", label: "United States"},
        {id: "UMI", label: "United States Minor Outlying Islands"},
        {id: "URY", label: "Uruguay"},
        {id: "UZB", label: "Uzbekistan"},
        {id: "VUT", label: "Vanuatu"},
        {id: "VEN", label: "Venezuela, Bolivarian Republic of"},
        {id: "VNM", label: "Viet Nam"},
        {id: "VGB", label: "Virgin Islands, British"},
        {id: "VIR", label: "Virgin Islands, U.S."},
        {id: "WLF", label: "Wallis and Futuna"},
        {id: "ESH", label: "Western Sahara"},
        {id: "YEM", label: "Yemen"},
        {id: "ZMB", label: "Zambia"},
        {id: "ZWE", label: "Zimbabwe"},
        {id: "OTH", label: "Others"}
    ];



    var EDIT_USER = 'editUser';
    // var UPDATE_PREF = 'updatePref';
    var REGISTER = 'register';

    var EMAIL_CONFIRM = 'emailCnf';
    var INVALID_EMAIL_CONFIRM = 'invalidEmailCnf';


    var LOGIN = 'login';
    var LOG_OFF = 'logOff';

    var FORGOT_PASS = 'forgotPass';
    var CHANGE_PASS = 'changePass';

    var REGENRATE_ACT_EMAIL = 'regenerateActMail'

    var EXPIRED_EMAIL = 'expiredEmail'

    var CONTACT_US = 'contactUs';


    var FACEBOOK_REG ='registerWithFb';
    var GOOGLE_REG ='registerWithGoogle';



    var baseMigUrl = jsu.getMigUrl();

    // var MY_TSR_URL 			= baseMigUrl+'/MyTsr';
    var FORGOT_PWD_URL 		= baseMigUrl+'/UsrMgmtHandler';
    var IMAGE_URL 			= baseMigUrl+'/UsrMgmtHandler';
    var NEW_REGISTRATION	= baseMigUrl+'/UsrMgmtHandler';
    var EDIT_REGISTRATION 	= baseMigUrl+'/UsrMgmtHandler'
    var PASS_CHANGE_URL 	= baseMigUrl+'/UsrMgmtHandler'
    var LOGIN_URL 			= baseMigUrl+'/UsrMgmtHandler';
    // var UPDATE_PREF_URL 	= baseMigUrl+'/UsrMgmtHandler';
    var LOGOFF_URL 			= baseMigUrl+'/UsrMgmtHandler';
    var CONTACT_URL 		= baseMigUrl+'/UsrMgmtHandler';

    var RESEND_EMAIL_CONFIRM_URL         = baseMigUrl+'/UsrMgmtHandler';





    function createMenuHeader(data, type){
        // if(nonModal){
            var  html='<div class="text-center mb-3">';
                
            for(var i=0;i<data.length;i++){
                var link = data[i];
                // html+='<div class="col-md-4">'
                if(type == link.id){
                    // html+= htmlU.doBold( link.label );
                    // do nothing
                }else{
                    html+='    <a onClick="'+thisObject+'.ua(\''+link.id+'\')"; class="btn btn-custom btn-sm primary mt-2" >'+link.label+'</a> &nbsp;';    
                }
                 // html+='</div>';
            }
            html+='</div>' ;
            return html;
        // }else{
        //     return "";
        // }
    }

    function getMenuHeader(type){

        var headerData =[{id:LOGIN, label:"Login" },{id:FORGOT_PASS, label:"Forgot Password" }, {id:REGISTER, label:"Register" } ];
        // { id:UPDATE_PREF, label:"Update Preferences" },
        var loggedInHeaderData =[{id:EDIT_USER, label:"Update Profile" } ,
         {id:CHANGE_PASS, label:"Change Password" },{id:FORGOT_PASS, label:"Forgot Password" },{id:LOG_OFF, label:"Log Off" } ];

        var menu =''
        

        if(type == INVALID_EMAIL_CONFIRM || type== EMAIL_CONFIRM || type == EXPIRED_EMAIL){
            return '';
        }


        if(jsu.isNull(userJson)){
            menu = createMenuHeader(headerData, type)
        }else{
            menu = createMenuHeader(loggedInHeaderData,type);
        }
        
        return menu;
        // htmlU.addMsgToDiv('userEditMenuDiv', true, menu);
    }


    function setContent(type , title, content, addNotes, showCaptcha, addiMsg){
        var html='';
        htmlU.emptyDiv(CONTENT_DIV);
        // if(nonModal){
            html='  <div class="container">'
            html+=  ' <div class="row">'
            html+=  '     <div class="">'  //col-md-8 offset-md-2
            html+= getMenuHeader(type);

            if(jsu.isNotNull( addiMsg)){
               html+= htmlU.getSpan(addiMsg,'green', 15);
            }

            html+='<div class="card shadow-lg">'
            html+='            <div class="card-header">'
            html+='                <h4 class="card-title text-center">'+title+'</h4>'
            html+='            </div>'
            html+=' <div class="card-body"  id="cardBody">';
            
            html+=  content;




            html+= '        </div>'      //card-body
            html+= '            </div>'  // card shadow-lg

            if(jsu.isNotNull( addiMsg)){
               html+= htmlU.getSpan(addiMsg,'green',15);
            }


            html+= '                </div>' //col-md-8
            html+= '            </div>'// row
            html+= '        </div>' // container
        // }else{
        //     // modal will come here....
        //     if(jsu.isNotNull( addiMsg)){
        //        html+= getSpan(addiMsg,'green', 12);
        //     }


        //     html +=' <h5 class="text-center">'+title+'</h5>    ' + content;
        // }

        
        // if(addNotes){
        //     html+= getNotes();
        // }

        htmlU.addMsgToDiv(CONTENT_DIV, true, html);

        if(showCaptcha){
            changeImage();
        }



    }

    function init(nonModalArgs){
         nonModal = nonModalArgs;
        // if(nonModal){  // hack to get both Popup and In main Page...
           userJson = userJsonArgs ;
           CONTENT_DIV = 'userEditContentInlineDiv';
        // }
    }


    function userAction(type, msg, nonmodal, isInit){

       if(isInit) init(nonmodal); // second third argument called from out side only once....

       if( jsu.isNull( type )){
            type = LOGIN;
       }


        if(type ==LOGIN ){
            login(type,msg);
        }else if(type ==LOG_OFF){
            logOff(type,msg);    
        }else if(type ==FORGOT_PASS){
            forgotPass(type,msg);    
        }else if(type == CHANGE_PASS){
            changePass(type,msg);    
        }else if(type ==REGISTER){
            register(type,msg);
        }else if(type ==EDIT_USER){
            editUser(type,msg);
        // }else if(type ==UPDATE_PREF){
        //     updatePref(type,msg);

        }else if(type ==INVALID_EMAIL_CONFIRM){
            invalidEmailConfirm(type,msg);
        }else if(type ==EMAIL_CONFIRM){
            emailConfirm(type,msg);
        }else if(type ==EXPIRED_EMAIL){
            expiredMail(type,msg);    

        }else if(type ==CONTACT_US){
            contactUs(type,msg);
        }else{
            // Default ... 
            if(jsu.isNull(userJson)){
                login(LOGIN,msg);
            }else{
                editUser(EDIT_USER,msg);
            }
        }
    }

    function userActionSubmit(type){
        if(type ==LOGIN ){
            loginSubmit(type);
        }else if(type ==LOG_OFF){
            logOffSubmit(type);    
        }else if(type ==FORGOT_PASS){
            forgotPassSubmit(type);    
        }else if(type == CHANGE_PASS){
            changePassSubmit(type);    
        }else if(type ==REGISTER){
            registerSubmit(type);
        }else if(type ==EDIT_USER){
            editUserSubmit(type);
        }else if(type ==REGENRATE_ACT_EMAIL){
            regenerateActMailSubmit(type);


        // }else if(type ==UPDATE_PREF){
        //     updatePrefSubmit(type);
        }else if(type ==CONTACT_US){
            contactUsSubmit(type);
        }
    }



    function login(type,addiMsg){
        var html ='';

         
        // html+= '<div class="d-grid">'
        
        // FACE Book //
        // html+= '<div class="d-grid">'

        // 
            html+= '<div align="center">';
            html+= '<div id="'+GOOGLE_SIGN_IN_DIV+'"></div>';
        // html+=' </div>';

        if(showSocialmedia){
            html+= BREAK_LINE;
            html+= '  <div id="fb-root"></div>';
            html+= '<div class="fb-login-button" data-width="375" data-size="large" data-button-type="" data-layout="" '
                + 'data-auto-logout-link="true" data-use-continue-as="false" onlogin="checkLoginState();"></div>';
            // html+= '<button id=" Fb_logout" onclick="FB_logout()">Fb logout</button>';
            // html+=' </div>';

            // 
            

        }
        html+= BREAK_LINE;
        html+= BREAK_LINE;
        html+= '<h5 align = "center"> OR </h5>'
        html+='</div>'
        html+= BREAK_LINE;


        html+=   createSpcFormElem('Email Address', 'email', -1, null, thisObject+'.validateEmail', 'register',  'Email Address' , true , 'email');
        html+=   createSpcFormElem('Password', 'pass', -1, null, thisObject+'.passChange', SPC , 'Password' , true , 'password');
        html+=   getSpcCaptcha();
        html+=   createSpcFormElem('Image Value', 'captcha', -1, null, null, null , 'Please Enter Image Value' , true , null);
        // html+=   htmlU.createEmptyDiv(USER_FB_DIV, true)
        html+= getSpcSubmitBtn('login', 'Login')        ;

        // html+=   '<div class="row>';

        
        



        setContent(type , 'Login', html, true, true, addiMsg);

       
        // if(showSocialmedia){
            socialMediaInit();
        // }
        // Delaying Social Media Plugins for Aync Loading...
        // setTimeout(function() { socialMediaInit()} , 1500);

    }


    function loginSubmit(type){
        clearCommonFbDiv();
        var email = htmlU.getInputVal('email');

        var pass = htmlU.getInputVal('pass');
        var captcha = htmlU.getInputVal('captcha');

        if(!validateEmail('register')){
            htmlU.addMsgToDiv(USER_FB_DIV,true,'Please enter Valid mail Id.','red');
            return false;
        }
        if(!passChange('pass')){
            htmlU.addMsgToDiv(USER_FB_DIV,true,'Password field does not meet criteria.','red');
            return false;
        }
        if(jsu.isNull(captcha) || captcha.length !=6){
            htmlU.addMsgToDiv('captchaFbDiv',true,INVALID_CAPTCHA,'red');
            return false;
        }

        var data = { email:email,  pass:pass, captcha:captcha,linky:usrDt.linky};

        var pd={userParams: JSON.stringify(data) , action : type };
        
        // var subDomain = jsu.getSubDomain(); 
        // pd.subdee =subDomain;


        var rc= new RC(LOGIN_URL, null, pd, 'loadingDiv',USER_FB_DIV, thisObject,'umRes',type );
        
        // if(!nonModal){
        //     rc.xhrFields = {withCredentials: true};
        // }
            
        myTsrUtils.rc(rc);
        return false;
    }

    function logOff(type){

        var html =' <h5 class="text-center">Logoff</h5>    ';
        html+= htmlU.createEmptyDiv(USER_FB_DIV, true)

        htmlU.addMsgToDiv('cardBody', true, html);
        htmlU.addMsgToDiv(USER_FB_DIV, true, 'Request for Logoff is Being Processed...')

        var pd ={ action : type };
        // var pd={modal: "true" };
        // var subDomain = jsu.getSubDomain(); 
        // pd.subdee =subDomain;

        var rc= new RC(LOGOFF_URL, null, pd, 'loadingDiv',USER_FB_DIV, thisObject,'umRes',type );
        // if(!nonModal){
        //     rc.xhrFields = {withCredentials: true};
        // }

        myTsrUtils.rc(rc);
        return false;
    }


    function changePass(type, addiMsg){

        var html ='';

        html+=   createSpcFormElem('Old Password', 'oldpass', -1, null, thisObject+'.passChange', SPC , 'Old Password' , true , 'password');
        html+=   createSpcFormElem('New Password', 'newpass', -1, null, thisObject+'.passChange', SPC , 'New Password' , true , 'password');
        html+=   createSpcFormElem('Confirm New Password', 'newpassconfirm', -1, null, thisObject+'.passChange', SPC , 'Confirm Password' , true , 'password');
        html+= getSpcSubmitBtn('changePass', 'Change Password')        ;

        setContent(type , 'Change Password', html, true, true, addiMsg);

    }


    function changePassSubmit(type){
        var oldpass = htmlU.getInputVal('oldpass');
        var newpass = htmlU.getInputVal('newpass');
        var newpassconfirm = htmlU.getInputVal('newpassconfirm');

        if(jsu.isNull(oldpass) || jsu.isNull(newpass) || jsu.isNull(newpassconfirm)){
            htmlU.addMsgToDiv('userFeedback',true,'All fields are mandatory','red');
            return;
        }
        if(newpass.length <5 || newpassconfirm.length <5){
            htmlU.addMsgToDiv('userFeedback',true,'Enter Min 5 chars for password','red');
            return;
        }
        if( !(newpass === newpassconfirm)){
            htmlU.addMsgToDiv('userFeedback',true,'Password does not match','red');
            return;
        }
        var pd = {oldpass:oldpass, newpass:newpass ,newpassconfirm:newpassconfirm  , action : type };
        // var pd={userParams: JSON.stringify(data) };
        
        // var subDomain = jsu.getSubDomain(); 
        // pd.subdee =subDomain;
        var rc= new RC(PASS_CHANGE_URL, null, pd, 'loadingDiv','userFeedback', thisObject,'umRes',type );


        // if(!nonModal){
        //     rc.xhrFields = {withCredentials: true};
        // }

        myTsrUtils.rc(rc);
    }

    function forgotPass(type, addiMsg){
        var html ='';
      
        // html +=' <h5 class="text-center">Forgot Password</h5>    ';
        html+=   createSpcFormElem('Email Address', 'email', -1, null, thisObject+'.validateEmail', 'register',  'Email Address' , true , 'email');
        html+=   getSpcCaptcha();
        html+=   createSpcFormElem('Image Value', 'captcha', -1, null, null, null , 'Please Enter Image Value' , true , null);
        // html+=   htmlU.createEmptyDiv(USER_FB_DIV, true)
        html+=   getSpcSubmitBtn('forgotPass', 'Forgot Password')        ;

        setContent(type , 'Forgot Password', html, true, true, addiMsg);
    }


    function forgotPassSubmit(type){
        clearCommonFbDiv();
        var email = htmlU.getInputVal('email');
        
        var captcha = htmlU.getInputVal('captcha');

        if(!validateEmail('register')){
            htmlU.addMsgToDiv(USER_FB_DIV,true,'Please enter Valid mail Id.','red');
            return false;
        }
        
        if(jsu.isNull(captcha) || captcha.length !=6){
            htmlU.addMsgToDiv('captchaFbDiv',true,INVALID_CAPTCHA,'red');
            return false;
        }

        var data = { email:email,  captcha:captcha,linky:usrDt.linky , action : type };

        var pd={userParams: JSON.stringify(data), forgot:true  , action : type};
        var rc= new RC(FORGOT_PWD_URL, null, pd, 'loadingDiv',USER_FB_DIV, thisObject,'umRes',type );

        // if(!nonModal){
        //     rc.xhrFields = {withCredentials: true};
        // }

        myTsrUtils.rc(rc);
        return false;
    }


    function emailConfirm(type,msg){

        var html ='';
      
        html+= htmlU.getSpan(  ' Thank you for confirming your mail. ' , 'green' , 15);

        html+= BR_2;   

        html+=  ' You can now continue to use Stock AIO member services.. ';

        html+= BR_2;

        setContent(type , 'Email Confirmed', html, true, true, msg);
    }

    function invalidEmailConfirm(type,msg){

        var html ='';
      
        html+= htmlU.getSpan(  ' You are yet to Confirm Email. ', 'orange' , 18);

        html+= BR_2;
        html+= htmlU.getSpan( 'Please go through your email and confirm your email address', null, 15);

        html+= BR_2;
        html+= htmlU.getSpan( 'We suggest you to check in Spam also' , 'grey' ,15);

        html+= BR_2;


        html+= ' If you wish to get mail again then Click on regenrate. '
        html+= BR_2;

        html+=   createSpcFormElem('Email Address', 'email', -1, null, thisObject+'.validateEmail', 'register',  'Email Address' , true , 'email');



        html+=   getSpcCaptcha();
        html+=   createSpcFormElem('Image Value', 'captcha', -1, null, null, null , 'Please Enter Image Value' , true , null);

        html+=   getSpcSubmitBtn(REGENRATE_ACT_EMAIL, 'Resend Activation Email')        ;

        setContent(type , 'Confirm Email', html, true, true, msg);
    }


    function expiredMail(type,msg){

        var html ='';
      
        html+= htmlU.getSpan(  ' We encountered an issue validating your Request. ', 'orange' , 18);

        html+= BR_2;
        html+= htmlU.getSpan( 'This could be because of expiry of email validity', null, 15);
        html+= BR_2;

        html+= ' If you wish to get mail again then Click on regenrate. '
        html+= BR_2;

        html+=   createSpcFormElem('Email Address', 'email', -1, null, thisObject+'.validateEmail', 'register',  'Email Address' , true , 'email');

        html+=   getSpcCaptcha();
        html+=   createSpcFormElem('Image Value', 'captcha', -1, null, null, null , 'Please Enter Image Value' , true , null);

        html+=   getSpcSubmitBtn(REGENRATE_ACT_EMAIL, 'Resend Activation Email')        ;

        setContent(type , 'Confirm Email', html, true, true, msg);
    }





    function regenerateActMailSubmit(type){

        clearCommonFbDiv();
        
        var captcha = htmlU.getInputVal('captcha');
        var email = htmlU.getInputVal('email');

        if(!validateEmail('register')){
            htmlU.addMsgToDiv(USER_FB_DIV,true,'Please enter Valid mail Id.','red');
            return false;
        }
        
        if(jsu.isNull(captcha) || captcha.length !=6){
            htmlU.addMsgToDiv('captchaFbDiv',true,INVALID_CAPTCHA,'red');
            return false;
        }

        var data = { email:email,  captcha:captcha,linky:usrDt.linky , action : type };
        var pd={userParams: JSON.stringify(data), forgot:true  , action : type};

        var rc= new RC(RESEND_EMAIL_CONFIRM_URL, null, pd, 'loadingDiv',USER_FB_DIV, thisObject,'umRes',type );

        myTsrUtils.rc(rc);
        return false;
    }



    function register(type, addiMsg){
        var html ='';



        html+= '<div class="row">'
        html+=   createSpcFormElem('Email Address*', 'email', 6, null, thisObject+'.validateEmail', 'register' , 'Email Address*' , true , 'email');
        html+=   createSpcFormElem('Confirm Email Address*', 'email2', 6, null, thisObject+'.validateEmail', 'register', 'Confirm Email Address*' , true , 'email');      
        html+= '</div>';        

        html+= '<div class="row">'
        html+=   createSpcFormElem('Screen Name*', 'screenName', 6, null, null, null,  'Screen Name*' , true , null);
        html+=   createSpcFormElem('Password*', 'pass', 6, null, thisObject+'.passChange', SPC ,  'Password*' , true ,  'password');      
        html+= '</div>';        

        
        html+= '<div class="row">'

        html+=   createDropDownElemSpc ('sal', 'Salutation',salutations ,6,null, null, null);
        html+=   createSpcFormElem('First Name*', 'fName', 6, null, null, null,  'First Name*' , true , null);

        html+= createSpcFormElem('Telephone', 'tel', 6, null, null, null,  'Telephone' , true , null);
        // html+= createDropDownElemSpc ('state', 'State',states ,6,null, null, null);

        html+= createDropDownElemSpc ('country', 'Country',countries ,6,null, null, null);
        
        // html+= createSpcFormElem('Postal Code', 'pin', 6, null, null, null,  'Postal Code' , true , null);


        html+= '</div>'; 

        html+= '<div class="row">'
        

         html+= '</div>';     

        html+= '<div class="row">'

        html+= '<div class="col-md-12">';
        var terms =' <a href="https://www.topstockresearch.com/Disclaimer.html"  target="_blank">I agree to terms & Conditions/Disclaimer and read key notes mentioned below</a>';
        html+=getSpcCheckBoxElem( terms,'tnc',null)
        html+= '</div>'; 
        html+= '</div>'; 
         html+="<br/>";
        html+="<br/>";

        html+= getSpcCaptchaLine();
        html+="<br/>";
        html+=   htmlU.createEmptyDiv(USER_FB_DIV, true)
        html+= getSpcSubmitBtn(type, 'Register')        ;

        setContent(type , 'Register', html, true, true, addiMsg);
        setBootStrapDatePicker()
    }  

    function editUser(type,addiMsg){

        var user = userJson;

        var html ='';
        var title = user.sal +' ' +user.fName + ' Please update Personal Information';
        html +=' <h5 class="text-center">'+user.sal +' ' +user.fName + ' Please update Personal Information</h5>';


        // html+= '<div class="row">'
        // // html+=   createSpcFormElem('Screen Name*', 'screenName', 6, user.screenName, null, null,  'Screen Name*' , true , null);
        // html+= '</div>';        
       
        html+=createEditCommon(user);

        htmlU.createEmptyDiv(USER_FB_DIV, true)
        html+= getSpcSubmitBtn(type, 'Update Profile')        ;

        setContent(type ,'Update Profile' , html, true, true, addiMsg);

        if(jsu.isNotNull(userJson.dob)){
                 htmlU.setInputVal('Birthdate', userJson.dob);
                 htmlU.setInputVal('dob', userJson.dob);
        }

        setBootStrapDatePicker();
    }

    function setBootStrapDatePicker(){

        if(!nonModal){
            $('.datepicker').datepicker({
                        container: '#picker-container',
                        format: 'dd/mm/yyyy'
             }).noConflict();
        }
    }



    function createEditCommon(user){

        var html ='';
        html+= '<div class="row">'

        html+=   createSpcFormElem('Screen Name*', 'screenName', 6, user.screenName, null, null,  'Screen Name*' , true , null);

        html+=   createDropDownElemSpc ('sal', 'Salutation',salutations ,6,user.sal, null, null);
        html+=   createSpcFormElem('First Name*', 'fName', 6, user.fName, null, null,  'First Name*' , true , null);

        html+=   createSpcFormElem('Last Name', 'lName', 6, user.lName, null, null,  'Last Name' , true , null);
        html+= '</div>'; 

        html+= '<div class="row">'
       
        html+= createSpcFormElem('Address', 'add1', 12, user.add1, null, null,  'Address' , true , null);
        html+= createSpcFormElem('Postal Code', 'pin', 6, user.pin, null, null,  'Postal Code' , true , null);
        
        html+= createSpcFormElem ('State', 'state',6,user.state, null, null, 'State');

        html+= createDropDownElemSpc ('country', 'Country',countries ,6,user.country, null, null);

        html+= createSpcFormElem('Telephone', 'tel', 6, user.tel, null, null,  'Telephone' , true , null);
        html+= createSpcFormElem('DOB (dd/MM/yyyy)', 'dob', 6, user.workPlace , null, null,  'DOB(dd/MM/yyyy)' , true , null);


        html+= '</div>'; 

           

        html+= '<div class="row">'

        html+=getSpcCheckBoxElem( 'Email Product Updates','showUpdates',user.showUpdates,6);
        html+=getSpcCheckBoxElem( 'Email Research','showResearch',user.showResearch,6)

        html+= '</div>'; 

        html+= '<div class="row">'

        html+=getSpcCheckBoxElem( 'Email Offers','showOffers',user.showOffers,6);
        html+=getSpcCheckBoxElem( 'Connect Via WhatsApp','connectViaWhatsapp',user.connectViaWhatsapp,6)

        html+= '</div>'; 
         html+=BREAK_LINE;
/*
        html+=BR_2
        html+= '<div class="row">'
        html+= createSpcFormTextArea('About Me', 'aboutMe', 12, user.aboutMe,  'About Me' );    
        html+= '</div>'; 

*/        


        // html+= getSpcCaptchaLine();

        return html;

    }


    function registerSubmit(type){
        clearCommonFbDiv();

        var data = setCreateEditFields();

        if(!validateEmail('register') ){
            htmlU.focusToDiv('emailFbDiv');
            return;
        }
        if(jsu.isNull(email2)){
            htmlU.addMsgToDiv('email2FbDiv',true,'Please enter Email Id to Confirm pass.','red');
            htmlU.focusToDiv('email2FbDiv');
            return;
        }
        if(!passChange('pass')){
            htmlU.addMsgToDiv('passFbDiv',true,'Password Should be at least 5 Characters.','red');
            htmlU.addMsgToDiv(USER_FB_DIV,true,'Password Should be at least 5 Characters..','red');
            htmlU.focusToDiv('passFbDiv');
            return;
        }
        if(!valiCreateEdit(data)){
            return;
        }
        
        var tnc = htmlU.isChecked('tnc');

        if(!tnc){
            htmlU.addMsgToDiv(USER_FB_DIV,true,'Please accept Terms & Conditions to continue','red');

            return;
        }
        var pd={userParams: JSON.stringify(data) , action: type};
        var rc= new RC(NEW_REGISTRATION, null, pd, 'loadingDiv',USER_FB_DIV,thisObject,'umRes',type );

        // var subDomain = jsu.getSubDomain(); 
        // pd.subdee =subDomain;
        // if(!nonModal){
        //     rc.xhrFields = {withCredentials: true};
        // }
        myTsrUtils.rc(rc);
    }


    function editUserSubmit(type){
        clearCommonFbDiv();
        var data = setCreateEditFields();
        if(!valiCreateEdit(data)){
            return;
        }
        var pd={userParams: JSON.stringify(data) , action : type };
        var rc= new RC(EDIT_REGISTRATION, null, pd, 'loadingDiv','userFeedback',thisObject,'umRes',type );
        myTsrUtils.rc(rc);
    }


    function valiCreateEdit(data){

        if(jsu.isNull(data.screenName)){
            htmlU.addMsgToDiv('screenNameFbDiv',true,'Please Enter Screen Name.','red');
            htmlU.addMsgToDiv(USER_FB_DIV,true,'Please Enter Screen Name.','red');
            htmlU.focusToDiv('screenNameFbDiv');
            return false;
        }
        if(jsu.isNull(data.fName)){
            htmlU.addMsgToDiv('fNamefbDiv',true,'Please Enter First Name.','red');
            htmlU.addMsgToDiv(USER_FB_DIV,true,'Please Enter First Name.','red');
            htmlU.focusToDiv('fNameFbDiv');
            return false;
        }
/*
         if(jsu.isNull(data.tel)){
            htmlU.addMsgToDiv('telfbDiv',true,'Please Enter Telephone, required for Subscription Confirmation.','red');
            htmlU.addMsgToDiv(USER_FB_DIV,true,'Please Enter Telephone , required for Subscription Confirmation.','red');
            htmlU.focusToDiv('telFbDiv');
            return false;
        }


        if(jsu.isNull(data.pin)){
            htmlU.addMsgToDiv('pinfbDiv',true,'Please Enter Pin/Postal Code.','red');
            htmlU.addMsgToDiv(USER_FB_DIV,true,'Please Enter Pin/Postal Code.','red');
            return;
        }
*/
/*
        if(jsu.isNull(data.captcha)){
            htmlU.addMsgToDiv('captchaFbDiv',true,'Please Enter Image Values.','red');
            return false;
        }
*/

        return true;
    }

    function setCreateEditFields(){

        var email = htmlU.getInputVal('email');
        var email2 = htmlU.getInputVal('email2');
        var pass = htmlU.getInputVal('pass');
        var sal = htmlU.getInputVal('sal');
        var screenName = htmlU.getInputVal('screenName');
        var fName = htmlU.getInputVal('fName');
        // var mName = htmlU.getInputVal('mName');
        var lName = htmlU.getInputVal('lName');
        var add1 = htmlU.getInputVal('add1');
        // var add2 = htmlU.getInputVal('add2');

        var dob = htmlU.getInputVal('dob');
        var city = htmlU.getInputVal('city');
        var state = htmlU.getInputVal('state');
        var country = htmlU.getInputVal('country');

        var pin = htmlU.getInputVal('pin');
        var tel = htmlU.getInputVal('tel');

        // var workPlace = htmlU.getInputVal('workPlace');
        // var role = htmlU.getInputVal('role');
        var captcha = htmlU.getInputVal('captcha');


        var showUpdates = htmlU.isChecked('showUpdates');
        var showResearch = htmlU.isChecked('showResearch');
        var showOffers = htmlU.isChecked('showOffers');
        var connectViaWhatsapp = htmlU.isChecked('connectViaWhatsapp');

        var data = { email:email, email2:email2, pass:pass, screenName:screenName,
            fName:fName, lName :lName,  sal:sal,  add1 : add1,
            city :city , country :country, pin :pin, tel :tel,dob:dob, state : state,
            
            
            linky:usrDt.linky, captcha:captcha,
            
            blogUrl : htmlU.getInputVal('blogUrl'),
            aboutMe: htmlU.getInputVal('aboutMe'), signature: htmlU.getInputVal('signature'),

            showUpdates : showUpdates, showResearch : showResearch,
            showOffers : showOffers, connectViaWhatsapp : connectViaWhatsapp
        };

        return data;
    }



    function clearCommonFbDiv(){
        htmlU.emptyDiv(USER_FB_DIV);
        htmlU.emptyDiv('pass');
        htmlU.emptyDiv('emailFbDiv');
        htmlU.emptyDiv('email2FbDiv');
        htmlU.emptyDiv('passFbDiv');
        htmlU.emptyDiv('screenNameFbDiv');
        htmlU.emptyDiv('fNameFbDiv');
        htmlU.emptyDiv('captchaFbDiv');
    }

/*
    function updatePref(type,addiMsg){
        var user = userJson;
        var html ='';
        html +=' <h5 class="text-center">Update Preference</h5>    ';

        html+='<div class="row">'
                          +  '<div class="col-md-12">'
                          +     ' <p class="text-warning fw-bold">Alerts Affecting your stocks</p>'
                          +  '</div>'
                        +'</div>'


        html+= '<div class="row">'
        html+=getSpcCheckBoxElem( 'Receive My Alerts By emails','emailAlert',user.emailAlert,6)
        html+=getSpcCheckBoxElem( 'Auto Apply Bonus/Split to My Portfolio','applyCaInPortfolio',user.applyCaInPortfolio  ,6)
        html+= '<div>';

        html+= '<div class="row">'
        html+=getSpcCheckBoxElem( 'Receive Alert on Bonus/Split/Name Change in My Watch List Stocks','wlBonusSplitAlert',user.wlBonusSplitAlert,6)
        html+=getSpcCheckBoxElem( 'Receive Alert on Bonus/Split/Name Change in My Portfolio Stocks','pfBonusSplitAlert',user.pfBonusSplitAlert  ,6)
        html+= '<div>';

        html+= '<div class="row">'
        html+=getSpcCheckBoxElem( 'Receive Alert on Other Corp Action','othercaAlert',user.othercaAlert,6)
        html+=getSpcCheckBoxElem( 'Receive Alert User Comments on Watch List/Portfolio Stocks','commentsOnStockAlert',user.commentsOnStockAlert  ,6)
        html+= '<div>';


           html+='<div class="row">'
                          +  '<div class="col-md-12">'
                          +     ' <p class="text-warning fw-bold">Top Stock Research Alerts</p>'
                          +  '</div>'
                        +'</div>'

        html+= '<div class="row">'
        html+=getSpcCheckBoxElem( 'Receive Product Updates by Email','tsrProdUpdateAlert',user.tsrProdUpdateAlert,6)
        html+=getSpcCheckBoxElem( 'Receive Stock Research  By Email','tsrResearchAlert',user.tsrResearchAlert  ,6)
        html+= '<div>';

        html+= '<div class="row">'
        html+=getSpcCheckBoxElem( 'Receive Feature of the Week by Email','tsrWeeklyAlert',user.tsrWeeklyAlert,6)
        html+=getSpcCheckBoxElem( 'Receive Other Updates by Email','tsrOtherAlert',user.tsrOtherAlert  ,6)
        html+= '<div>';

           html+='<div class="row">'
                          +  '<div class="col-md-12">'
                          +     ' <p class="text-warning fw-bold">Personal Preferences</p>'
                          +  '</div>'
                        +'</div>'

        html+= '<div class="row">'
        html+=getSpcCheckBoxElem( 'Show Tel, Email, Name in Profile','showPersonalInfo',user.showPersonalInfo,6)
        html+=getSpcCheckBoxElem( 'Allow Private message','allowPm',user.allowPm  ,6)
        html+= '<div>';

        html+= '<div class="row">'
        html+=getSpcCheckBoxElem( 'Profile Visible to Public','pubProfile',user.pubProfile,6)
        html+= '<div>';

         html+= getSpcSubmitBtn(type, 'Update Preference')        ;

         setContent(type ,'My Preference' , html, true, true, addiMsg);
    }


    function updatePrefSubmit(type){
         var allowLink = isChecked('allowLink');
        var allowPm = isChecked('allowPm');

        var showPersonalInfo = isChecked('showPersonalInfo');
        var showWorkInfo = isChecked('showWorkInfo');
        var pubProfile = isChecked('pubProfile');

        var applyCaInPortfolio = isChecked('applyCaInPortfolio')
        var emailAlert = isChecked('emailAlert')

        var pfBonusSplitAlert = isChecked('pfBonusSplitAlert');
        var wlBonusSplitAlert = isChecked('wlBonusSplitAlert');

        var othercaAlert = isChecked('othercaAlert');
        var commentsOnStockAlert = isChecked('commentsOnStockAlert');

        var tsrProdUpdateAlert = isChecked('tsrProdUpdateAlert');
        var tsrResearchAlert = isChecked('tsrResearchAlert');
        var tsrWeeklyAlert = isChecked('tsrWeeklyAlert');
        var tsrOtherAlert = isChecked('tsrOtherAlert');

        var data = { allowLink : allowLink, allowPm : allowPm, showPersonalInfo : showPersonalInfo,
                      applyCaInPortfolio : applyCaInPortfolio ,    emailAlert : emailAlert,
                      pfBonusSplitAlert : pfBonusSplitAlert, wlBonusSplitAlert : wlBonusSplitAlert,
                      othercaAlert : othercaAlert, commentsOnStockAlert : commentsOnStockAlert,
                      tsrProdUpdateAlert : tsrProdUpdateAlert, tsrResearchAlert : tsrResearchAlert,
                      tsrWeeklyAlert : tsrWeeklyAlert , tsrOtherAlert : tsrOtherAlert,
                      pubProfile : pubProfile
          };

        // var pd = {oldpass:oldpass, newpass:newpass ,newpassconfirm:newpassconfirm };
        var pd={userParams: JSON.stringify(data) };
        var rc= new RC(UPDATE_PREF_URL, null, pd, 'loadingDiv','userFeedback',thisObject,'umRes',type );
        myTsrUtils.rc(rc);

    }
*/


    function contactUs(type, addiMsg){
        var html =BREAK_LINE;
        var user = userJson;
        if(jsu.isNull(userJson)) {
            html+= '<div class="row">'
            html +=' <h6 class="text-center">Hello, How Can we help you?</h6>';
            html+=   createSpcFormElem('Email Address', 'email', 6, null, thisObject+'.validateEmail', 'register' , 'Email Address*' , true , 'email');
            html+=   createSpcFormElem('Name*', 'name', 6, null, null, null,  'Screen Name*' , true , null);
            html+= '</div>';        

        }else{
              var title = user.sal +' ' +user.fName + ' Please update Personal Information';
              html +=' <h6 class="text-center">'+user.sal +' ' +user.fName + ', How Can we help you?</h6>';
        }

        html+= '<div class="row">'

        html+=   createSpcFormElem('Telephone', 'tel', 12, null, null, null,  'Telephone' , true , null);

        html+=   createSpcFormElem('Subject', 'subject', 12, null, null, 'register' , 'Email Address*' , true , 'email');
        
        // html+= createDropDownElemSpc ('state', 'State',states ,3,json.state, null, null);
        html+= '</div>';        
        // createSpcFormElem(label, id, col value, func, param , placeholder , fbDiv , type)

        html+= '<div class="row">'
        html+= createSpcFormTextArea('Description', 'details', 12, null,  'Description' );    
        html+= '</div>';       

        html+= getSpcCaptchaLine();

        htmlU.createEmptyDiv(USER_FB_DIV, true)
        html+= getSpcSubmitBtn(type, 'Contact US')        ;

        setContent(type ,'Contact StockAio Team' , html, true, true, addiMsg);

    }

    
    function contactUsSubmit(type){
        var data = { email:htmlU.getInputVal('email'), name:htmlU.getInputVal('name'), 
            subject:htmlU.getInputVal('subject'), details:htmlU.getInputVal('details'),
            linky: usrDt.linky, captcha: htmlU.getInputVal('captcha')
            , action : type , tel : htmlU.getInputVal('tel')
        };

        if(jsu.isNull(userJson)){

             if( jsu.isNull(userJson) &&  !validateEmail('register') ){
            // addMsgToDiv('emailFbDiv',true,'Please enter Valid mail Id.','red');
            // addMsgToDiv(USER_FB_DIV,true,'Please enter Valid mail Id.','red');
            htmlU.focusToDiv('emailFbDiv');
            return;
            }
            if( jsu.isNull(data.name)){
                htmlU.addMsgToDiv('nameFbDiv',true,'Please Enter  Name.','red');
                htmlU.addMsgToDiv(USER_FB_DIV,true,'Please Enter  Name.','red');
                htmlU.focusToDiv('nameFbDiv');
                return false;
            }


        }

       
        if(jsu.isNull(data.subject)){
            htmlU.addMsgToDiv('subjectFbDiv',true,'Please Enter  Subject.','red');
            htmlU.addMsgToDiv(USER_FB_DIV,true,'Please Enter  Subject.','red');
            htmlU.focusToDiv('subjectFbDiv');
            return false;
        }
        if(jsu.isNull(data.details)){
            htmlU.addMsgToDiv('detailsFbDiv',true,'Please Enter  Details.','red');
            htmlU.addMsgToDiv(USER_FB_DIV,true,'Please Enter  Details.','red');
            htmlU.focusToDiv('detailsFbDiv');
            return false;
        }

        var captcha = htmlU.getInputVal('captcha');

            if(isNull(captcha) || captcha.length !=6){
                htmlU.addMsgToDiv('captchaFbDiv',true,INVALID_CAPTCHA,'red');
                return false;
            }
       
        var pd={userParams: JSON.stringify(data)  , action : type ,
            subject:htmlU.getInputVal('subject'), message:htmlU.getInputVal('details') };

        var rc= new RC(CONTACT_URL, null, pd, 'loadingDiv',USER_FB_DIV,thisObject,'umRes',type );

        // var subDomain = jsu.getSubDomain(); 
        // pd.subdee =subDomain;
        // if(!nonModal){
        //     rc.xhrFields = {withCredentials: true};
        // }

        myTsrUtils.rc(rc);

    }



    function userManagementResponse(response, type){
        if(response.statusCode=='invalidValues'){
            htmlU.addMsgToDiv('userFeedback',true,response.statusMsg , 'red',12);
            return;
        }
        if(response.statusCode =='success'){
            htmlU.emptyDiv('userFeedback');
        }
        var message ='';
        if(type ==LOGIN ){
            // setWindowLocation(getMyTsrUrl());
            // console.log('login');



            // userAction(EDIT_USER, "You Have successfully Logged in. ");
            message += '<b>You Have successfully Logged in. You will be redirected to Home Page in a while</b>' ;
            htmlU.addMsgToDiv('cardBody', true, message , 'green',15);
            setTimeout(waitRedirect, 3000, jsu.getMigUrl()+"/Home");

            
            return;


        }else if(type ==LOG_OFF){
            message += '<b>Logged off Sucessfully. You will be redirected to Home Page in a while</b>' ;
            

             htmlU.addMsgToDiv('cardBody', true, message , 'green',15);
            setTimeout(waitRedirect, 3000, jsu.getMigUrl()+"/Home");
            return;

        }else if(type ==FORGOT_PASS){
            message = 'Auto generated password is sent to you mail. We recommend you to change it.';

            userAction(LOGIN, message);
            return;

        }else if(type == REGENRATE_ACT_EMAIL){


            message += ' We have shared an email to '+htmlU.getInputVal('email')+'. Please verify </b>';

            htmlU.addMsgToDiv('cardBody', true, message, 'green' , 14);
            return;

            // message = 'Auto generated password is sent to you mail. We recommend you to change it.';

            // userAction(LOGIN, message);
            // return;

        }else if(type == CHANGE_PASS){
            message = 'Password  updated..<br/> Please Click any of the menu Item to continue.';
            // userJson = response; 
            htmlU.addMsgToDiv('cardBody', true, message, 'green', 14);
            return;

        }else if(type ==REGISTER){

            message += '<b>Thank you for registering with us.</b>'+

            BR_2+' We have shared an email to '+htmlU.getInputVal('email')+'. Please verify </b>';

            htmlU.addMsgToDiv('cardBody', true, message);
            return;

            // setTimeout(waitRedirect, 5000, getMyTsrUrl());
        }else if(type ==EDIT_USER){
            userJson = response;    
            message += 'Your Profile is successfully been updated. <br/> Please Click any of the menu Item to continue.'
            htmlU.addMsgToDiv('cardBody', true, message,'green' ,14);
            return;


        // }else if(type ==UPDATE_PREF){
        //    message +='Preferences Sucessfully updated..<br/> Please Click any of the menu Item to continue.'
        //    userJson = response; 
        }else if(type ==CONTACT_US){
           message +='<br><br><b>Thank you for reaching out to us. We will review your post and get back to you.</b><br><br>'
           
           changeImage();
           htmlU.setInputVal('subject','');
           htmlU.setInputVal('details','');
           htmlU.setInputVal('captcha','');

        }else if(type == FACEBOOK_REG ){
            message += '<b>Thank you for registering with us via <b>Facebook</b> '
            +'<br/> Please Click any of the Menu to access Member features.' ;
            htmlU.addMsgToDiv('cardBody', true, message , 'green',15);
        }else if(type == GOOGLE_REG ){
            message += '<b>Thank you for registering with us via <b>Google</b> '
            +'<br/> Please Click any of the Menu to access Member features.' ;
            htmlU.addMsgToDiv('cardBody', true, message , 'green',15);
        }
        htmlU.addMsgToDiv(USER_FB_DIV,true,message,'green' ,12);

    }

    function waitRedirect(url){
        setWindowLocation(url);
    }
    

    function validateEmail (type){
        if(type=='register'){
            var email = htmlU.getInputVal('email');
            var email2 = htmlU.getInputVal('email2');
            if( jsu.isNull(email) || !isValidEmail(email)) {


            htmlU.addMsgToDiv('emailFbDiv',true,'Please enter Valid mail Id.','red'); // For SPC

            }else  if( !jsu.isNull(email2) && !isValidEmail(email2)) {
                // returnRedBorder('email');
                htmlU.addMsgToDiv('email2FbDiv',true,'Please enter Valid mail Id.','red');
            }else if(!jsu.isNull(email2) && email!=email2){
                htmlU.addMsgToDiv('email2FbDiv',true,'Email ID do not match.','red');
            }else{
                htmlU.emptyDiv('mailIdDiv');
                htmlU.emptyDiv('emailFbDiv');
                htmlU.emptyDiv('email2FbDiv');
                return true;
            }
        }
        htmlU.addMsgToDiv(USER_FB_DIV,true,'Please enter Valid mail Id.','red'); // For SPC

        return false;
    }

    function passChange(id){
        var div = id+'Div';
        var val = null;
        if(id ==SPC){  /// Dirty hack for now till pass is sttandardized
            div = 'passFbDiv'; 
            val = htmlU.getInputVal('pass');
        }else{
            val = htmlU.getInputVal(id);
        }

        if(jsu.isNull(val) || val.length <5){
             htmlU.addMsgToDiv(div,true,'Please enter min 5 characters for password. We recommend Alphanumeric with Special Character','red');
             return false;
         }
         htmlU.emptyDiv(div);
         return true;
    }


    function createSpcFormElem(label, id, col, value, func, param , placeholder , fbDiv , type){
        return htmlU.csfe(label, id, col, value, func, param , placeholder , fbDiv , type);
    }

    function createSpcFormTextArea(label, id, col, value,  placeholder ){

        return htmlU.csfta(label, id, col, value,  placeholder );
    }
  
    
    function getSpcSubmitBtn(action, label){

        return htmlU.gssb(action, label, thisObject , 'uas');
    }

    function getSpcCaptcha(){
        return htmlU.gsc(thisObject);
      
    }

    function getSpcCheckBoxElem( label,id,value, col){
       return htmlU.gscb(label,id,value, col); 
    }

    function getSpcCaptchaLine(){
        return htmlU.gscl(thisObject);
    }



    function createDropDownElemSpc (id, label,list,col,value, func, param){
            return htmlU.cddes(id, label,list,col,value, func, param);
    }


	function getCal(id){

      var html= '<div class="form-floating" id="picker-container"> '
                + '<input id="dob" type="text" class="datepicker form-control" placeholder="Date of Birth"> '
                + '<label for="dob">Date of Birth</label> '
                +  '</div>'
         return html;
     }


   

    function changeImage(){
        htmlU.chgImg(thisObject);

    }

    function applyImg(response,id){
        var html = '<img  class="img-responsive img-fluid" src="'+response.imagePath + '"/>';
        usrDt.linky = response.linky;
        htmlU.addMsgToDiv('captchaImg',true,html);
    }


// -----------------------  GOOGLE  --------------


    function socialMediaInit(){

        initializeGoog();

        if(showSocialmedia){
            fbAsyncInitNow();    
        }
    }


   
/*
    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
*/

    function initializeGoog(){
        google.accounts.id.initialize({
            client_id: gappid,
            callback: handleGoogleResponse,
            // ux_mode: 'redirect',
            // login_uri: jsu.getMigUrl()+'/LoginWithGoogle',
            // Login endpoint must be able to handle POST requests

            ux_mode: 'popup'
        });

        var width = isMobile() ? 275 : 375;
        var size = isMobile() ? 'medium' : 'large'


        // if(){

        // }


        google.accounts.id.renderButton(
            document.getElementById(GOOGLE_SIGN_IN_DIV),
            {
                theme: "outline",
                size: size,
                width: width,
                shape: 'rectangular',
                // shape:'pill',
                // shape:'circle',
                // shape:'square',
                // click_listener: onClickHandler
            }  // customization attributes
        );
    }

     function handleGoogleRes(response){
         // decodeJwtResponse() is a custom function defined by you
        // to decode the credential response.
        // const responsePayload = parseJwt(response.credential);
          // }
        var type =GOOGLE_REG;

        // var data = { email:responsePayload.email, screenName:responsePayload.given_name,
        //     fName:responsePayload.given_name, lName :responsePayload.family_name
        // };

        var pd={ action: type, credential : response.credential };
        var rc= new RC(NEW_REGISTRATION, null, pd, 'loadingDiv',USER_FB_DIV,thisObject,'umRes',type );
        myTsrUtils.rc(rc);
    }


    function handleFaceBookRes(response){

            var data = { email : response.email, fName:response.Name, dob: response.birthday  }

            var type = FACEBOOK_REG;

            var sessionObj = sessionStorage.getItem('fbssls_'+ fappid);   //938816587266648  -- APP ID  

            if(sessionObj == null){
                faceBookLoginBadMsg();
                return;
            }

            var pd={userParams: JSON.stringify(data)  , action : type ,  
              accessToken :  sessionObj.accessToken, fbUserId : sessionObj.userID };

            var rc= new RC(CONTACT_URL, null, pd, 'loadingDiv',USER_FB_DIV,thisObject,'umRes',type );

            // var subDomain = jsu.getSubDomain(); 
            // pd.subdee =subDomain;
            // if(!nonModal){
            //     rc.xhrFields = {withCredentials: true};
            // }

            myTsrUtils.rc(rc);


    }

    


    return {

        ua : userAction,
        uas : userActionSubmit,
        umRes :userManagementResponse, // user Management Response
	    passChange : passChange,
        validateEmail : validateEmail ,
        changeImage : changeImage,
        applyImg : applyImg,

        smint  : socialMediaInit,

        hgr : handleGoogleRes,
        hfbr : handleFaceBookRes
    }

})(); // module     


    

   



function handleGoogleResponse(response) {
    migu.hgr(response);
}



function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function (response) {   // See the onlogin handler
        handleFaceBookResponse(response);
    });
}




function fbAsyncInitNow () {

        console.log('init');

        FB.init({
            appId: fappid,
            cookie: true,                     // Enable cookies to allow the server to access the session.
            xfbml: true,                     // Parse social plugins on this webpage.
            version: 'v16.0'           // Use this Graph API version for this call.
        });
/*
        FB.getLoginStatus(function (response) {   // Called after the JS SDK has been initialized.
            handleFaceBookResponse(response);        // Returns the login status.
        });
*/        
};

function faceBookLoginBadMsg(){
        mintHtmlUtil.addMsgToDiv('userFeedback',true,'We are sorry, we could not login with facebook at this time.'
                +' Please try other option' , 'red',12); 
    }

function handleFaceBookResponse(response){
    
    // migu.hfbr(response);
    if(response.status =='unknown'){
            return;
    }

    if (response.status !== 'connected') {   // Logged into your webpage and Facebook.
                                            // Not logged into your webpage or we are unable to tell.
        faceBookLoginBadMsg();   
    }


    FB.api('/me', { fields: 'name,email,birthday' }, function (response) {
       migu.hfbr(response);
    });


}

function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function (response) {   // See the onlogin handler
         handleFaceBookResponse(response);
    });
}


function FB_logout() {
    FB.logout(FB.getLoginStatus(function (response) {   // See the onlogin handler
        // Person is now logged out
        console.log("logged out");
}));

};