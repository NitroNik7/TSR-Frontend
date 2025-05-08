// * Stock relevance should be shown only tick is an intraday tick or 
// * when saved screener chosen is an intraday tick based screener 

// Exit modal on "Esc"
document
  .getElementById("tsrAlertFormModal")
  .addEventListener("keydown", (e) => {
    if (e.key === "Escape") $("#tsrAlertFormModal").modal("hide");
  });

var currentTab = 0; // Current tab is set to be the first tab (0)
let currentStep = 1;
const circles = document.querySelectorAll(".tsr_af_circle"),
  progressBar = document.querySelector(".tsr_alert_form_indicator"),
  buttons = document.querySelectorAll("button");

// let tick = "5m";
let tick = "5m";
let intradayticks = ["1m", "2m", "3m", "5m", "10m", "15m"];

showTab(currentTab); // Display the current tab

// This function will display the specified tab of the form ...
function showTab(n) {
  var x = document.getElementsByClassName("tsr_alert_form_tab");
  x[n].style.display = "block";

  // x[n].scrollTop = 0;
  document.getElementById('tsrAlertForm').scrollIntoView();

  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("prevNextBtn").style.justifyContent = "end";

    let label = document.querySelector("label[for='getAlerts2']");
    let chooseAlertTimeButton = document.getElementById("getAlerts2");
    let dailyTickNote = document.getElementById("dailyTickNote");
    if (intradayticks.includes(tick)) {
      chooseAlertTimeButton.disabled = false;

      label.innerHTML = "Specific Time / Time Range Alerts";
      label.style.color = "black";
      dailyTickNote.style.display = "none";
    } else {
      chooseAlertTimeButton.disabled = true;

      label.innerHTML = "<s>Specific Time / Time Range Alerts</s>";
      label.style.color = "grey";
      dailyTickNote.style.display = "block";
    }
  } else {
    document.getElementById("prevBtn").style.display = "inline";
    document.getElementById("prevNextBtn").style.justifyContent =
      "space-between";
  }


  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Add alert";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

// This function will figure out which tab to display
function nextPrev(e, n) {
  var x = document.getElementsByClassName("tsr_alert_form_tab");
  // Exit the function if any field in the current tab is invalid:
  if (!validateForm()) return false;

  // Hide the current tab:
  x[currentTab].style.display = "none";

  document.getElementsByClassName("tsr_af_circle")[currentTab].className += " tsr_af_finish";
  currentTab = currentTab + n;

  // if you have reached the end of the form and alert is added... :
  if (currentTab >= x.length) {
    document.getElementById("tsrAlertToast").style.display = "block";
    showTab(--currentTab);
    return false;
  }
  document.getElementById("tsrAlertToast").style.display = "none";
  // Otherwise, display the correct tab:
  showTab(currentTab);

  currentStep = e.target.id === "nextBtn" ? ++currentStep : --currentStep;
  progressBar.style.width = `${((currentStep - 1) / (circles.length - 1)) * 100
    }%`;
}

// This function deals with validation of the form fields
function validateForm() {
  var x,
    i,
    valid = true;
  x = document.getElementsByClassName("tsr_alert_form_tab");
  textBoxes = x[currentTab].querySelectorAll("input[type=text]");
  dateBoxes = x[currentTab].querySelectorAll("input[type=date]");
  for (i = 0; i < textBoxes.length; i++) {
    // If a field is empty...
    if (textBoxes[i].value == "") {
      // add an "invalid" class to the field:
      textBoxes[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }

  for (i = 0; i < dateBoxes.length; i++) {
    // If a field is empty...
    if (dateBoxes[i].value == "") {
      // add an "invalid" class to the field:
      dateBoxes[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("tsr_af_circle")[currentTab].className +=
      " tsr_af_finish";
  }
  return valid; // return the valid status
}

// This function removes the "active" class of all steps...
//... and adds the "active" class to the current step:
function fixStepIndicator(n) {
  var i,
    x = document.getElementsByClassName("tsr_af_circle");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replaceAll(" active", "");
    if (i > n) x[i].className = x[i].className.replaceAll(" tsr_af_finish", "");
  }
  x[n].className += " active";
}

// function to show subOptions for a radio button
function showSubOptions(e, id) {
  let childNodes = e.target.parentNode.childNodes;
  let divs = [];

  for (let i = 0; i < childNodes.length; i++) {
    if (childNodes[i].nodeName === "div" || childNodes[i].nodeName === "DIV")
      divs.push(childNodes[i]);
  }

  for (let i = 0; i < divs.length; i++) {
    if (divs[i].style.display != "flex") {
      if (divs[i].id == id) divs[i].style.display = "block";
      else divs[i].style.display = "none";
    }
  }
}

// for showing info box when uer hovers on i button
$(".tsr_alert_form_info").hover(
  function (event) {
    let infoChildId = event.currentTarget.querySelector(
      ".tsr_alert_form_info_child"
    ).id;

    let infoChildHeight =
      document.getElementById(infoChildId).getBoundingClientRect().height / 4;
    let infoChildWidth = document
      .getElementById(infoChildId)
      .getBoundingClientRect().width;

    let top, left;

    if (event.clientY > window.innerHeight / 2)
      top = event.clientY - infoChildHeight;
    else top = event.clientY;

    if (event.clientX > window.innerWidth / 2)
      left = event.clientX - infoChildWidth;
    else left = event.clientX;

    infoChildId = "#" + infoChildId;
    $(infoChildId).css({ top: top, left: left }).show();

  },
  function () {
    $(".tsr_alert_form_info_child").hide();
  }
);

// function to show/hide alert form instructions
function showAddAlertInstructions(e) {
  let tsrInfoDivs = document.getElementsByClassName('tsr_alert_info_div');
  let tsrInfoSections = document.getElementsByClassName('tsr_alert_form_info');
  if (e.target.checked) {
    for (let i = 0; i < tsrInfoDivs.length; i++) {
      let childNodes = tsrInfoDivs[i].parentNode.childNodes;
      tsrInfoDivs[i].style.display = 'flex';
      for (let i = 0; i < childNodes.length; i++) {
        let classList = childNodes[i].classList;
        if (classList != undefined && classList.contains("vert_divider")) {
          childNodes[i].style.border = '1px solid #dee2e6';
        }
      }
    }
    for (let i = 0; i < tsrInfoSections.length; i++) {
      tsrInfoSections[i].style.display = 'inline';
    }
  }
  else {
    for (let i = 0; i < tsrInfoDivs.length; i++) {
      let childNodes = tsrInfoDivs[i].parentNode.childNodes;
      tsrInfoDivs[i].style.display = 'none';
      for (let i = 0; i < childNodes.length; i++) {
        let classList = childNodes[i].classList;
        if (classList != undefined && classList.contains("vert_divider")) {
          childNodes[i].style.border = 'none';
        }
      }
    }
    for (let i = 0; i < tsrInfoSections.length; i++) {
      tsrInfoSections[i].style.display = 'none';
    }
  }
}

// function to show info box for any Alert Type
function showTsrAlertTypeInfo(e) {
  let div = e.target.parentNode.parentNode.getElementsByClassName("tsr_alert_info_div")[0];
  let height = 100;

  if (e.target.value == "alertTypeOne") {
    div.innerHTML = `
            <div class="mt-0" style="height: ${height}; overflow-y: auto; font-size: 18px;">
                <span style="color:#607D8B;">  Receive Alert on current settings. The alert may be added without having to save current settings. </span>
            </div>
    `;
  } else if (e.target.value == "alertTypeTwo") {
    div.innerHTML = `
            <div class="mt-0" style="height: ${height}; overflow-y: auto; font-size: 18px;">
                <span style="color:#607D8B;"> Select a saved screener on which you want to receive Alerts. </span>
            </div>
            `;
  } else {
    div.innerHTML = `
            <div class="mt-0" style="height: ${height}; overflow-y: auto; font-size: 18px;">
                <span style="color:#607D8B;"> Receive alerts using current settings on a particular stock, i.e. you can get a strategy alert on a stock </span>
            </div>
            `;
  }
}

function showTsrAlertSpecificTimeInfo(e) {
  let div = e.target.parentNode.parentNode.getElementsByClassName("tsr_alert_info_div")[0];
  let height = 100;

  let vertDivider = e.target.parentNode.parentNode.getElementsByClassName("vert_divider")[0];
  let horzDivider = e.target.parentNode.parentNode.getElementsByClassName("horz_divider")[0];

  if (e.target.value == "fixedTime") {
    div.innerHTML = `
            <div class="mt-0" style="height: ${height}; overflow-y: auto; font-size: 18px;">
                <span style="color:#607D8B;"> Alert will be generated only when criteria is met at the chosen Time. </span>
            </div>
    `;

    if (!vertDivider.classList.contains("d-md-block"))
      vertDivider.classList.add("d-md-block");

    if (!horzDivider.classList.contains("d-block"))
      horzDivider.classList.add("d-block");

  } else if (e.target.value == "timeRange") {
    div.innerHTML = `
            <div class="mt-0" style="height: ${height}; overflow-y: auto; font-size: 18px;">
                <span style="color:#607D8B;">  Alert will be generated only when criteria is met within chosen Time Range. </span>
            </div>
    `;

    if (!vertDivider.classList.contains("d-md-block"))
      vertDivider.classList.add("d-md-block");

    if (!horzDivider.classList.contains("d-block"))
      horzDivider.classList.add("d-block");

  }
  else {
    div.innerHTML = `
            <div class="mt-0" style="height: ${height}; overflow-y: auto; font-size: 18px;">
                <span style="color:#607D8B;">  </span>
            </div>
    `;
    vertDivider.classList.remove("d-md-block");
    horzDivider.classList.remove("d-block");
  }
}

function showTsrAlertChooseDayInfo(e) {
  let div = e.target.parentNode.parentNode.getElementsByClassName("tsr_alert_info_div")[0];
  let height = 75;

  let vertDivider = e.target.parentNode.parentNode.getElementsByClassName("vert_divider")[0];
  let horzDivider = e.target.parentNode.parentNode.getElementsByClassName("horz_divider")[0];

  if (e.target.value == "anyDayOfWeek") {

    div.innerHTML = `
            <div class="mt-0" style="height: ${height}; overflow-y: auto; font-size: 18px;">
                <span style="color:#607D8B;"> </span>
            </div>
    `;
    vertDivider.classList.remove("d-md-block");
    horzDivider.classList.remove("d-block");
  } else {
    div.innerHTML = `
            <div class="mt-0" style="height: ${height}; overflow-y: auto; font-size: 18px;">
                <span style="color:#607D8B;"> Alert will be generated only on selected day </span>
            </div>
    `;
    if (!vertDivider.classList.contains("d-md-block"))
      vertDivider.classList.add("d-md-block");

    if (!horzDivider.classList.contains("d-block"))
      horzDivider.classList.add("d-block");
  }
}

// function to show info box for any Alert Trigger time
function showTsrAlertTriggerTimesInfo(e) {
  let div = e.target.parentNode.parentNode.getElementsByClassName("tsr_alert_info_div")[0];
  let height = 125;

  if (e.target.value == "triggerTimeOne") {
    div.innerHTML = `
            <div class="mt-0" style="height: ${height}; overflow-y: auto; font-size: 18px;">
                <span style="color:#607D8B;"> <b>Once </b> -&gt; Alert will be paused once criteria is met. Works best on a stock. </span>
            </div>
    `;
  } else {
    div.innerHTML = `
            <div class="mt-0" style="height: ${height}; overflow-y: auto; font-size: 18px;">
                <span style="color:#607D8B;"> <b>Repeat </b> -&gt; Alert will be triggered whenever criteria is met. Works best for a Strategy alert. </span>
            </div>
    `;
  }
}

// function to show info box for Stock Relevance options
function showTsrAlertStockRelevanceInfo(e) {
  let div = e.target.parentNode.parentNode.getElementsByClassName("tsr_alert_info_div")[0];
  let height = 100;
  let maxHeight = height + 25;

  if (e.target.value == "showAll") {
    div.innerHTML = `
            <div class="mt-0" style="height: ${height}; max-height: ${maxHeight}; overflow-y: auto; font-size: 18px;">
                <span style="color:#607D8B;"> 
                  <b>Show All</b> - it shows all the stocks that match the criteria at the time of trigger. In such case you are likely to see the stocks repeating from previous alerts.</span>
            </div>
    `;
  } else {
    div.innerHTML = `
            <div class="mt-0" style="height: ${height}; max-height: ${maxHeight}; overflow-y: auto; font-size: 18px;">
                <span style="color:#607D8B;"> <b>Show New</b> - it shows stocks whose criteria was recently met, ignoring stocks which were shown in the previous runs.</span>
            </div>
            `;
  }

}

// function to show info box for any Alert Mode
function showTsrAlertModeInfo(e) {
  let div = document.getElementById("tsrAlertModeInfo");
  let height = 150;

  if (e.target.value == "webAlert") {
    div.innerHTML = `
            <div class="mt-0" style="height: ${height}; overflow-y: auto; font-size: 18px;">
                <span style="color:#607D8B;"> Alerts will be shown as a popup on the website. If you are offline then you can still view them later in the <a href="">Alert Tab</a>. </span>
            </div>
    `;
  } else if (e.target.value == "emailAlert") {
    div.innerHTML = `
            <div class="mt-0" style="height: ${height}; overflow-y: auto; font-size: 18px;">
                <span style="color:#607D8B;"> Alert will be sent to your registered Email ID </span>
            </div>
            `;
  } else if (e.target.value == "smsAlert") {
    div.innerHTML = `
            <div class="mt-0" style="height: ${height}; overflow-y: auto; font-size: 18px;">
            
              <span style="color:#6e4848;"> Please enter a short name for SMS Alert. </span>
                <section class="tsr_alert_form_info" style="display: inline !important;">
                    <i class="fas fa-info-circle"></i>
                    <div style="display: none;" id="infoChild15" class="tsr_alert_form_info_child">
                        <span>This will help you quickly recognize the notification when it's sent to you on SMS. Shorter names are easier to read and look cleaner in messages!</span>
                    </div>
                </section>
                <br><br>
                <span style="color:#607D8B;"> Alert will be sent to your registered Mobile number 
                  <span style="color: darkgrey;">
                    (works with +91 ISD numbers only)
                  </span>
                </span>

            </div>
            `;
  } else if (e.target.value == "whatsappAlert") {
    div.innerHTML = `
            <div class="mt-0" style="height: ${height}; overflow-y: auto; font-size: 18px;">
                
                <span style="color:#6e4848;"> Please enter a short name for Whatsapp Alert. </span>
                <section class="tsr_alert_form_info" style="display: inline !important;">
                    <i class="fas fa-info-circle"></i>
                    <div style="display: none;" id="infoChild16" class="tsr_alert_form_info_child">
                        <span>This will help you quickly recognize the notification when it's sent to you on WhatsApp. Shorter names are easier to read and look cleaner in messages!</span>
                    </div>
                </section>
                <br><br>
                <span style="color:#607D8B;"> Alert will be sent to your registered Whatsapp number 
                  <span style="color: darkgrey;">
                    (works with +91 ISD numbers only)
                  </span>
                </span>
                
            </div>
                `;
  } else {
    div.innerHTML = `
            <div class="mt-0" style="height: ${height}; overflow-y: auto; font-size: 18px;">
            <!-- <span style="color:red;"> Push Notifications are not enabled on this browser. </span> -->
            <!-- <br> -->
                <span style="color:#607D8B;"> You will get notifications on your device (Mobile/Desktop) when alert
is triggered, provided your browser is open. </span>
                <!-- <span style="color:#607D8B;"> Click <i class="fas fa-bell"></i> to enable them and receive notifications even when you are not active on this site. </span> -->
            </div>
            `;
  }

  div.innerHTML += `
  <br>
  <div class="mt-auto">
  <span style="color:#607D8B;"> View your balance Alert quota <a href="#">here</a> </span>
  <div class="mt-0">
  `;
}

let tsr_alert_form_steps = `.tsr_alert_form_steps {
  display: flex;
  justify-self: start;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  position: relative;
}`;

let tsr_af_circle = `.tsr_af_circle {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  color: #999;
  font-size: 16px;
  font-weight: 500;
  border-radius: 50%;
  background: #fff;
  border: 4px solid #e0e0e0;
  transition: all 200ms ease;
  transition-delay: 0s;
  z-index: 1;
}`;

let tsr_af_circle_active = `.tsr_af_circle.active {
  transition-delay: 100ms;
  border-color: #5580f6;
  color: #4070f4;
}`;
let tsr_alert_form_progress_bar = `.tsr_alert_form_progress_bar {
  position: absolute;
  height: 4px;
  width: 100%;
  background: #e0e0e0;
  z-index: 0;
}`;

let tsr_alert_form_indicator = `.tsr_alert_form_indicator {
  position: absolute;
  height: 100%;
  width: 0%;
  background: #4070f4;
  transition: all 300ms ease;
}`;

let tsr_af_finish = `.tsr_af_finish {
  border-color: #4070f4;
  color: #4070f4;
}`;


// Code to find CSS in HTML and append it if not found
addAlertFormCss();
function addAlertFormCss(){
  let className = 'tsr_af_finish';

        for (let sheet of document.styleSheets) {
            if (sheet.ownerNode && sheet.ownerNode.tagName === 'STYLE') {

                try {
                    for (let rule of sheet.cssRules) {
                        if (rule.selectorText && rule.selectorText.includes(`.${className}`)) {
                            console.log(rule.selectorText, rule.style.cssText);
                            break;
                            
                        }
                        else {
                            let style = document.createElement("style");
                            style.innerHTML = tsr_alert_form_steps + `\n` + tsr_af_circle + `\n` + tsr_af_circle_active + `\n` + tsr_alert_form_progress_bar + `\n` + tsr_alert_form_indicator + `\n` + tsr_af_finish + `\n` ;

                            document.getElementsByTagName('head')[0].appendChild(style);
                            break;
                            
                        }
                    }
                } catch (e) {
                    
                    // Some stylesheets might be from different origins and not accessible
                    // console.warn('Cannot access stylesheet:', sheet.href);
                }
                break;
            }
        }
}


