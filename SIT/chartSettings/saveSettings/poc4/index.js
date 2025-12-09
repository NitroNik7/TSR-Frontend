// Facebook - https://www.facebook.com/share_channel/
// Whatsapp - whatsapp://send?text=
// LinkedIn - https://www.linkedin.com/feed/?linkOrigin=LI_BADGE&shareActive=true&shareUrl=
// Twitter - https://x.com/intent/post?url=

let ch_savePopupWrapper = document.getElementById("ch_savePopupWrapper");

// Needs to be initialized before savedSettings initialization
var notes = [{
    "title": "ABC"
}, {
    "title": "AAA BBB CCC DDD EEEEEAAA BBB CCC DDD EEEEE"
}, {
    "title": "AAA 1234"
}, ];

// array which stores whether recently saved settings are saved or not
var settingsApplied = Array(notes.length).fill(0);

function closeSaveSettingsDropdown(e) {
    if (ch_savePopupWrapper.style.display === "block" && !(ch_savePopupWrapper.contains(e.target) || document.getElementById("ch_saveSettingsDropdown").contains(e.target))) {
        // ch_savePopupWrapper.innerHTML = "";
        ch_savePopupWrapper.style.display = "none";
        let dropdownBtn = document.getElementById("ch_saveSettingsDropdownIcon");
        if (dropdownBtn.style.rotate == "0deg" || dropdownBtn.style.rotate == "")
            dropdownBtn.style.rotate = "-180deg";
        else
            dropdownBtn.style.rotate = "0deg";

        return;
    }
}

function ch_openSaveSettingsPopup() {
    let dropdownBtn = document.getElementById("ch_saveSettingsDropdownIcon");
    if (dropdownBtn.style.rotate == "0deg" || dropdownBtn.style.rotate == "")
        dropdownBtn.style.rotate = "-180deg";
    else
        dropdownBtn.style.rotate = "0deg";

    ch_savePopupWrapper.innerHTML = "";
    ch_savePopupWrapper.classList.remove("cc_dialog");
    ch_savePopupWrapper.classList.remove("miCtrl");
    ch_savePopupWrapper.style.display = ch_savePopupWrapper.style.display === "block" ? "none" : "block";

    document.addEventListener("pointerdown", function (e) {
        closeSaveSettingsDropdown(e);
    }, {
        once: true
    });

    ch_savePopupWrapper.style.width = "200px";

    if (ch_savePopupWrapper.style.display === "block") {
        const ch_savePopupDiv = document.createElement("div");
        ch_savePopupDiv.id = "ch_saveOptionsDiv";
        ch_savePopupDiv.className = "ch_saveOptionsDiv";
        // ch_savePopupDiv.popoverTargetElement = "ch_settingsOption";
        ch_savePopupDiv.innerHTML = `
    <ul>
        <li onclick="ch_saveSettingsOption('save')" popovertarget="ch_settingsOption">
            <i class="fa-solid fa-floppy-disk"></i>
            <span>Save</span>
        </li>
        <li role="separator" class="divider"></li>
        <li onclick="ch_saveSettingsOption('download')" popovertarget="ch_settingsOption">
            <i class="fa-solid fa-download"></i>
            <span>Download Chart</span>
        </li>
        <li role="separator" class="divider"></li>
        <li onclick="ch_saveSettingsOption('share')" popovertarget="ch_settingsOption">
            <i class="fa-solid fa-share-nodes"></i>
            <span>Share</span>
        </li>
        <li role="separator" class="divider"></li>
        <li onclick="ch_saveSettingsOption('manage settings')" popovertarget="ch_settingsOption">
            <i class="fa-solid fa-gear"></i>
            <span>Manage Settings</span>
        </li>
        <li role="separator" class="divider"></li>
        <div>
            <span style="font-size: 13px; padding: 10px 10px 0px 10px">Recently Saved Settings</span>
            <ul class="savedSettingsListWrapper">
            ${ch_getSavedSettings()}
    </ul>
        </div>
    </ul>
    `;
        ch_savePopupWrapper.append(ch_savePopupDiv);
    }
}

// For main popup recently saved settings
function ch_getSavedSettings() {
    let html = "";
    // (i < 3): For displaying max 3 notes in the main popup
    for (let i = 0; i < notes.length && i < 3; i++) {
        if (settingsApplied[i] === 1) {
            html += `<li class="ch_sp_savedSettingsListItem" onclick="ch_applySettingsToChart(${i})">
            <div class="ch_sp_settingApplied" style="display: block;"><i class="fa-solid fa-check"></i></div>
            <span>${notes[i].title}</span>
            <button class="ch_sp_updateSavedSettingsBtn" onclick="ch_editSavedSetting(event, ${i}, false)" popovertarget="ch_settingsOption"><i class="fa-solid fa-pen-to-square"></i></button>
        </li>`;
        } else {
            html += `<li class="ch_sp_savedSettingsListItem" onclick="ch_applySettingsToChart(${i})">
            <div class="ch_sp_settingApplied"><i class="fa-solid fa-check"></i></div>
            <span>${notes[i].title}</span>
            <button class="ch_sp_updateSavedSettingsBtn" onclick="ch_editSavedSetting(event, ${i}, false)" popovertarget="ch_settingsOption"><i class="fa-solid fa-pen-to-square"></i></button>
        </li>`;
        }

    }
    return html;

}

function ch_applySettingsToChart(index) {
    // console.log("Settings applied");
    settingsApplied.fill(0);
    settingsApplied[index] = settingsApplied[index] === 0 ? 1 : 0;
    ch_openSaveSettingsPopup();
}


// For load saved settings content
function ch_getSavedSettingRows() {
    let html = "";
    for (let i = 0; i < notes.length; i++) {
        html += `
            <tr>
                <td>${notes[i].title}</td>
                <td>06/12/2024</td>
                <td onclick="ch_editSavedSetting(event, ${i}, true)">
                    <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>
                </td>
                <td></td>
                <td></td>
            </tr>
        `;
    }
    return html;
}

// For save settings - save to existing content
function ch_getSavedSettingsOptions() {
    let html = "";
    for (let i = 0; i < notes.length; i++) {
        html += `<option value="${notes[i].title}">
            ${notes[i].title}
        </option>`;
    }
    return html;
}


// Facebook - check existing
// Whatsapp - pass url as text param to send endpoint
// Twitter - Pass source and text as params to post endpoint
// Reddit - Pass url, title and type=LINK as params to submit endpoint
// Linkedin - pass linkOrigin=LI_BADGE and shareActive=true and shareUrl as params to feed endpoint
const ch_shareSettings = `
    <div class="ch_sp_shareSettings">
        <div>
            <input type="radio" name="ch_share" id="facebook" value="https://www.facebook.com/share_channel">
            <label for="share"><i class="fa-brands fa-facebook-f" style="color: #0866ff;"></i></label>
        </div>
        <div>
            <input type="radio" name="ch_share" id="xTwitter" value="https://x.com/intent/post">
            <label for="share"><i class="fa-brands fa-x-twitter"></i></label>
        </div>
        <div>
            <input type="radio" name="ch_share" id="whatsapp" value="whatsapp://send">
            <label for="share"><i class="fa-brands fa-whatsapp"  style="color: #25d366;"></i></label>
        </div>
        <div>
            <input type="radio" name="ch_share" id="reddit" value="https://www.reddit.com/submit">
            <label for="share"><i class="fa-brands fa-reddit"   style="color: #fe4400;"></i></label>
        </div>
        <div>
            <input type="radio" name="ch_share" id="linkedIn" value="https://www.linkedin.com/feed">
            <label for="share"><i class="fa-brands fa-linkedin-in"  style="color: #0a66c2;"></i></label>
        </div>
    </div>
`;

const ch_closeSettingsOption = `
    <div onclick="ch_openSaveSettingsPopup()" style="margin-top: auto; margin-bottom: auto;">
        <i class="fa-solid fa-xmark"></i>
    </div>
    `;

function ch_showCollapseAccordionDiv() {
    var acc = document.getElementsByClassName("ch_sp_accordionSection");
    var i;
    acc[0].nextElementSibling.style.display = "block";
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            acc[0].classList.remove("ch_sp_active");
            acc[1].classList.remove("ch_sp_active");
            this.classList.toggle("ch_sp_active");
            /* Toggle between hiding and showing the active panel */
            var panels = document.getElementsByClassName("ch_sp_accordionPanel");
            panels[0].style.display = "none";
            panels[1].style.display = "none";

            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}

// For removing previously appended dialog element
function removeDialogOnEscPress() {
    document.body.onkeydown = (event) => {
        if (event.key === "Escape") {
            // document.getElementById("ch_settingsOption").remove();
            ch_openSaveSettingsPopup();
            document.body.onkeydown = null;
        }
    }
}

function ch_saveSettingsOption(str, remove) {
    removeDialogOnEscPress();

    // Removes previous dialog if it exists (when toast Share/Download button is clicked)
    if (remove) {
        document.getElementById("ch_settingsOption").remove();
    }

    const ch_settingsOptionDiv = document.createElement("dialog");
    ch_settingsOptionDiv.id = "ch_settingsOption";
    switch (str) {
        case "save":
            ch_settingsOptionDiv.innerHTML = `
                <div class="ch_sp_settingsOptionHeader">
                    <p style="margin: 0">Save</p>
                    ${ch_closeSettingsOption}
                </div>
                <div id="ch_toastContainer">
                </div>
                <div id="ch_sp_settingsOptionContent" class="ch_sp_settingsOptionContent">
                    <div class="ch_sp_accordion">
                        <button class="ch_sp_accordionSection ch_sp_active">
                            <i class="fa-solid fa-plus"></i>
                            <span>Create new</span>
                            </button>    
                        </button>
                        <div class="ch_sp_accordionPanel">
                            <input type="text" name="settingsName" id="settingsName" class="ch_sp_optionInput" placeholder="" autocomplete="off">
                            <label for="settingsName">Settings Name</label>
                            <br>
                            <button onclick="ch_createNewSetting()">
                            <i class="fa-solid fa-floppy-disk"></i>
                            Save</button>
                        </div>
                    </div>

                    <div class="ch_sp_accordion">
                        <button class="ch_sp_accordionSection">
                            <i class="fa-solid fa-pen-to-square"></i>
                            <span>Update existing</span>
                        </button>
                        <div class="ch_sp_accordionPanel">
                            <label for="saveToSettings" style="position: static;">Choose</label>
                            <select name="" id="">
                                ${ch_getSavedSettingsOptions()}
                            </select>
                            <br>
                            <button onclick="ch_updateExistingSetting()">
                                <i class="fa-solid fa-pen-to-square"></i>
                                Update
                            </button>
                        </div>
                    </div>
                </div>          
            `;
            ch_savePopupWrapper.append(ch_settingsOptionDiv);
            ch_settingsOptionDiv.showModal();
            ch_showCollapseAccordionDiv();
            break;

        case "download":

            ch_settingsOptionDiv.innerHTML = `
                <div class="ch_sp_settingsOptionHeader">
                    <p style="margin: 0">Download</p>
                    ${ch_closeSettingsOption}
                </div>
                <div id="ch_toastContainer">
                </div>
                <div id="ch_sp_settingsOptionContent" class="ch_sp_settingsOptionContent">
                <div class="ch_sp_accordion">
                    <button class="ch_sp_accordionSection ch_sp_active">
                        <i class="fa-solid fa-download"></i>
                        <span>Download as Image</span>
                        </button>
                    </button>
                    <div class="ch_sp_accordionPanel">
                        <div id="ch_toastContainer">
                        </div>
                        <input type="text" name="ch_imageName" id="ch_imageName" class="ch_sp_optionInput" placeholder="" autocomplete="off">
                        <label for="ch_imageName">Image Name</label>
                        <br>
                        <button onclick="ch_downloadSettingAsImage()">
                            <i class="fa-solid fa-download"></i>
                            Download
                        </button>
                    </div>
                </div>
                <div class="ch_sp_accordion">
                    <button class="ch_sp_accordionSection">
                        <i class="fa-solid fa-floppy-disk"></i>
                        <span>Save to Server</span>
                    </button>
                    <div class="ch_sp_accordionPanel">
                        <input type="text" name="ch_serverImageName" id="ch_saveImageName" class="ch_sp_optionInput" placeholder="" autocomplete="off">
                        <label for="ch_saveImageName">Image Name</label>
                        <br>
                        <button onclick="ch_saveSettingOnServer()">
                            <i class="fa-solid fa-floppy-disk"></i>
                            Save
                        </button>
                    </div>
                </div>
                </div>  
            `;
            ch_savePopupWrapper.append(ch_settingsOptionDiv);
            ch_settingsOptionDiv.showModal();
            ch_showCollapseAccordionDiv();
            break;

        case "share":
            // Handle form submit on server
            ch_settingsOptionDiv.innerHTML = ` 
                <div class="ch_sp_settingsOptionHeader">
                    <p style="margin: 0">Share</p>
                    ${ch_closeSettingsOption}
                </div>
                <div id="ch_toastContainer">
                </div>
                <div id="ch_sp_settingsOptionContent" class="ch_sp_settingsOptionContent">
                    <form action="" target="_blank">
                        ${ch_shareSettings}
                        <hr>
                        <div class="ch_sp_accordionPanel" style="text-align: center; display: block;">
                            <input type="text" name="ch_shareMessage" id="ch_shareMessage" class="ch_sp_optionInput" placeholder="" autocomplete="off">
                            <label for="ch_shareMessage">Write a Message</label>
                            <br>
                            <button type="submit">Share</button>
                        <div>   
                    </form>
                <div>
                `;
            ch_savePopupWrapper.append(ch_settingsOptionDiv);
            ch_settingsOptionDiv.showModal();
            break;

        case "manage settings":
            // To be completed
            ch_settingsOptionDiv.innerHTML = `
                <div class="ch_sp_settingsOptionHeader">
                    <p style="margin: 0">Manage</p>
                    ${ch_closeSettingsOption}
                </div>
                <div id="ch_sp_settingsOptionContent" class="ch_sp_settingsOptionContent">
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Last modified</th>
                        <th>Edit</th>
                        <th>Share</th>
                        <th>Delete</th>
                    </tr>
                    ${ch_getSavedSettingRows()}
                </table>
            `;
            ch_savePopupWrapper.append(ch_settingsOptionDiv);
            ch_settingsOptionDiv.showModal();
            break;
        default:
            break;
    }
}

// toastTimeoutId = 0; // Need this global variable to reset setTimeout (because ch_showToast may be called again before it's timer expires). if not reset, toast will expire abruptly and incorrectly 
function ch_showToast(message, action) {
    const ch_toastContainer = document.getElementById('ch_toastContainer');

    ch_toastContainer.innerHTML = "";

    // Create the toast element
    const toast = document.createElement('div');
    toast.className = 'ch_sp_toastNotification';

    if (action == "save") {

        toast.innerHTML = `
            <span>
                ${message}            
                <span class="ch_sp_toastAction" onclick="ch_saveSettingsOption('download', true)">
                    Download
                    <i class="fa-solid fa-download"></i>
                </span>
            </span>
            <button class="ch_close-btn" onclick="ch_closeToast(this)">
                <i class="fa-solid fa-xmark" aria-hidden="true" style="height: 8px; width: 8px; margin-top: 8px;"></i>
            </button>

    `;
    } else if (action == "update") {
        toast.innerHTML = `
            <span>
                ${message}
                <span class="ch_sp_toastAction" onclick="ch_saveSettingsOption('manage settings', true)">
                Manage all settings
                <i class="fa-solid fa-gear"></i>
                </span>
            </span>
            
            <button class="ch_close-btn" onclick="ch_closeToast(this)">
                <i class="fa-solid fa-xmark" aria-hidden="true" style="height: 8px; width: 8px; margin-top: 8px;"></i>
            </button>
    `;
    } else {
        toast.innerHTML = `
            <span>
                ${message}
                <span class="ch_sp_toastAction" onclick="ch_saveSettingsOption('share', true)">
                    Share
                    <i class="fa-solid fa-share-nodes"></i>
                </span>
            </span>
            
            <button class="ch_close-btn" onclick="ch_closeToast(this)">
                <i class="fa-solid fa-xmark" aria-hidden="true" style="height: 8px; width: 8px; margin-top: 8px;"></i>
            </button>
    `;
    }



    // Append the toast to the container
    ch_toastContainer.appendChild(toast);

    // clearTimeout(this.toastTimeoutId);
    // toastTimeoutId = setTimeout(() => {
    //     ch_toastContainer.innerHTML = "";
    // }, 3000);
}

function ch_closeToast(button) {
    const toast = button.parentElement;
    if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
    }
}

function ch_createNewSetting() {
    ch_showToast('Settings saved successfully!', 'save');
}

function ch_updateExistingSetting() {
    ch_showToast('Settings updated successfully!', 'update');
}

function ch_downloadSettingAsImage() {
    ch_showToast('Image downloaded successfully!', 'download');
}

function ch_saveSettingOnServer() {
    ch_showToast('Image saved to Server successfully!', 'download');
}

function ch_editSavedSetting(e, index, remove) {
    removeDialogOnEscPress();

    // Removes previous dialog if it exists (when toast Share/Download button is clicked)
    if (remove) {
        document.getElementById("ch_settingsOption").remove();
    }

    e.stopPropagation();

    const ch_settingsOptionDiv = document.createElement("dialog");
    ch_settingsOptionDiv.id = "ch_settingsOption";

    ch_settingsOptionDiv.innerHTML = `
                <div class="ch_sp_settingsOptionHeader">
                    <p style="margin: 0">Rename Settings</p>
                    ${ch_closeSettingsOption}
                </div>
                <div id="ch_toastContainer" class="ch_toastContainer">
                </div>
                <div id="ch_sp_settingsOptionContent" class="ch_sp_settingsOptionContent">
                    <div class="ch_sp_accordionPanel" style="display: block;">
                        <input type="text" name="ch_editSettingsName" id="ch_editSettingsName" class="ch_sp_optionInput" placeholder="" autocomplete="off" value="${notes[index].title}">
                        <label for="ch_editSettingsName">Enter new name</label>
                        <br>
                        <div style="display: flex; justify-content: space-around;">
                            <button onclick="ch_updateExistingSetting(${index})">Update</button>
                            <button onclick="ch_openSaveSettingsPopup()">Apply to Chart</button>
                        </div>
                    </div>
                </div>          
            `;
    ch_savePopupWrapper.append(ch_settingsOptionDiv);
    ch_settingsOptionDiv.showModal();
}