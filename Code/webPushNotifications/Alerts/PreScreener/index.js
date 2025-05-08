document
  .getElementById("tsrAlertFormModal")
  .addEventListener("keydown", (e) => {
    if (e.key === "Escape") $("#tsrAlertFormModal").modal("hide");
  });

var currentTab = 0; // Current tab is set to be the first tab (0)
let currentStep = 1;
const circles = document.querySelectorAll(".circle"),
  progressBar = document.querySelector(".tsr_alert_form_indicator"),
  buttons = document.querySelectorAll("button");

// let tick = "5m";
let tick = "daily";
let intradayticks = ["1m", "2m", "3m", "5m", "10m", "15m"];

showTab(currentTab); // Display the current tab

// This function will display the specified tab of the form ...
function showTab(n) {
  var x = document.getElementsByClassName("tsr_alert_form_tab");
  x[n].style.display = "block";

  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("prevNextBtn").style.justifyContent = "end";

    let label = document.querySelector("label[for='getAlerts2']");
    let chooseAlertTimeButton = document.getElementById("getAlerts2");
    let dailyTickNote = document.getElementById("dailyTickNote");

    if (
      label == undefined ||
      chooseAlertTimeButton == null ||
      dailyTickNote == null
    )
      return;

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

  document.getElementsByClassName("circle")[currentTab].className += " finish";
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
  progressBar.style.width = `${
    ((currentStep - 1) / (circles.length - 1)) * 100
  }%`;
}

function validateForm() {
  // This function deals with validation of the form fields
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
    document.getElementsByClassName("circle")[currentTab].className +=
      " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("circle");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replaceAll(" active", "");
    if (i > n) x[i].className = x[i].className.replaceAll(" finish", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

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

function showTsrAlertModeInfo(e) {
    let div = document.getElementById("tsrAlertModeInfo");
    let height =
      document
        .getElementById("tsrAlertModeRadioContainer")
        .getBoundingClientRect().height - 25;
    // console.log(height);
    if (e.target.value == "webAlert") {
      div.innerHTML = `
              <div class="mt-0" style="height: ${height}; overflow-y: auto; font-size: 18px;">
                  <span style="color:#607D8B;"> Alerts will be shown as a popup on the website. You will need to be active on the site to view them. If you are offline then you can still view them later in the Alert Tab. </span>
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
              <span style="color:red;"> Please enter a short name for this Alert.
                  </span>
                  <section class="tsr_alert_form_info" style="display: inline !important;">
                  <i class="fas fa-info-circle"></i>
                  <div style="display: none;" id="infoChild15" class="tsr_alert_form_info_child">
                  <span>This will help you quickly recognize the notification when it's sent to you on SMS. Shorter names are easier to read and look cleaner in messages!</span>
                  </div>
                  </section>
                  <br>
                  <span style="color:#607D8B;"> Alert will be sent to your registered mobile number </span>
              </div>
              `;
    } else if (e.target.value == "whatsappAlert") {
      div.innerHTML = `
              <div class="mt-0" style="height: ${height}; overflow-y: auto; font-size: 18px;">
                  <span style="color:red;"> Please enter a short name for this Alert.
                  </span>
                  <section class="tsr_alert_form_info" style="display: inline !important;">
                      <i class="fas fa-info-circle"></i>
                      <div style="display: none;" id="infoChild15" class="tsr_alert_form_info_child">
                          <span>This will help you quickly recognize the notification when it's sent to you on WhatsApp. Shorter names are easier to read and look cleaner in messages!</span>
                      </div>
                  </section>
                  <br>
                  <span style="color:#607D8B;"> Alert will be sent to your registered Whatsapp number </span>
              </div>
                  `;
    } else {
      div.innerHTML = `
              <div class="mt-0" style="height: ${height}; overflow-y: auto; font-size: 18px;">
              <span style="color:red;"> Push Notifications are not enabled on this browser. </span>
              <br>
                  <span style="color:#607D8B;"> Enable them from <a href="#">here</a> to receive notifications even when you are not active on this site. </span>
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
  
