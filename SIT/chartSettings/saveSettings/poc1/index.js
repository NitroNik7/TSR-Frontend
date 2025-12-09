// Facebook - https://www.facebook.com/share_channel/
// Whatsapp - whatsapp://send?text=This%20is%20WhatsApp%20sharing%20example%20using%20link
// LinkedIn - 
// Twitter


let savePopupWrapper = document.getElementById("savePopupWrapper");

// Needs to be initialized before savedSettings initialization
var notes = [{
        "title": "ABC",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, dicta?"
    },
    {
        "title": "AAA BBB CCC DDD EEEEEAAA BBB CCC DDD EEEEE",
        "description": "The quick brown fox jumps over the lazy dog"
    }, {
        "title": "AAA 1234",
        "description": "The quick brown fox jumps over the lazy dog"
    },
];

var savedSettings = `
    <ul class="savedSettingsListWrapper">
            ${getSavedSettings()}
    </ul>
    `;

function saveSettingsPopup() {
    savePopupWrapper.innerHTML = "";
    savePopupWrapper.classList.remove("cc_dialog");
    savePopupWrapper.classList.remove("miCtrl");
    savePopupWrapper.style.display = savePopupWrapper.style.display === "block" ? "none" : "block";
    savePopupWrapper.style.width = "200px";

    if (savePopupWrapper.style.display === "block") {
        const savePopupDiv = document.createElement("div");
        savePopupDiv.id = "saveOptionsDiv";
        savePopupDiv.className = "saveOptionsDiv";
        // savePopupDiv.popoverTargetElement = "settingsOption";
        savePopupDiv.innerHTML = `
    <ul>
        <li onclick="saveSettingsOption('save')" popovertarget="settingsOption">
            <span>Save</span>
        </li>
        <li role="separator" class="divider"></li>
        <li onclick="saveSettingsOption('download')" popovertarget="settingsOption">
            <span>Download Chart</span>
        </li>
        <li role="separator" class="divider"></li>
        <li onclick="saveSettingsOption('share')" popovertarget="settingsOption">
            <span>Share</span>
        </li>
        <li role="separator" class="divider"></li>
        <li onclick="saveSettingsOption('load settings')" popovertarget="settingsOption">
            <span>Load Settings</span>
        </li>
        <li role="separator" class="divider"></li>
        <div popovertarget="settingsOption">
            <span style="font-size: 12px; padding: 10px 10px 0px 10px">Recently Saved Settings</span>
            ${savedSettings}
        </div>
    </ul>
    `;
        savePopupWrapper.append(savePopupDiv);
    }
}

// For main popup recently saved settings
function getSavedSettings() {
    let html = "";
    // (i < 3): For displaying max 3 notes in the main popup
    for (let i = 0; i < notes.length && i < 3; i++) {
        html += `<li class="savedSettingsListItem" onclick="editSavedSetting(${i})">
            <span>${notes[i].title}</span>
        </li>`;
    }
    return html;
}

// For load saved settings content
function getSavedSettingRows() {
    let html = "";
    for (let i = 0; i < notes.length; i++) {
        html += `
            <tr>
                <td>${notes[i].title}</td>
                <td>06/12/2024</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        `;
    }
    return html;
}

// For save settings - save to existing content
function getSavedSettingsOptions() {
    let html = "";
    for (let i = 0; i < notes.length; i++) {
        html += `<option onclick="editSettings(${i})">
            ${notes[i].title}
        </option>`;
    }
    return html;
}

const shareSettings = `
    <div class="shareSettings">
        <div>
            <input type="radio" name="share" id="facebook" value="facebook">
            <label for="share"><i class="fa-brands fa-facebook-f" style="color: #0866ff;"></i></label>
        </div>
        <div>
            <input type="radio" name="share" id="xTwitter" value="xTwitter">
            <label for="share"><i class="fa-brands fa-x-twitter"></i></label>
        </div>
        <div>
            <input type="radio" name="share" id="whatsapp" value="whatsapp">
            <label for="share"><i class="fa-brands fa-whatsapp"  style="color: #25d366;"></i></label>
        </div>
        <div>
            <input type="radio" name="share" id="linkedIn" value="linkedIn">
            <label for="share"><i class="fa-brands fa-linkedin-in"  style="color: #0a66c2;"></i></label>
        </div>
    </div>
`;

const closeSettingsOption = `
    <div onclick="saveSettingsPopup()" style="margin-top: auto; margin-bottom: auto;">
        <i class="fa-solid fa-xmark"></i>
    </div>
    `;

function showCollapseAccordionDiv() {
    var acc = document.getElementsByClassName("accordionSection");
    var i;
    acc[0].nextElementSibling.style.display = "block";
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            acc[0].classList.remove("active");
            acc[1].classList.remove("active");
            this.classList.toggle("active");
            /* Toggle between hiding and showing the active panel */
            var panels = document.getElementsByClassName("panel");
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
            document.getElementById("settingsOption").remove();
            document.body.onkeydown = null;
        }
    }
}

function saveSettingsOption(str) {

    removeDialogOnEscPress();

    const settingsOptionDiv = document.createElement("dialog");
    settingsOptionDiv.id = "settingsOption";
    switch (str) {
        case "save":
            settingsOptionDiv.innerHTML = `
            
                <div class="settingsOptionHeader">
                    <p style="margin: 0">Save Settings</p>
                    ${closeSettingsOption}
                </div>
                <div id="toastContainer" class="toastContainer">
                </div>
                <div id="settingsOptionContent" class="settingsOptionContent">
                    <div class="accordion">
                        <button class="accordionSection active">
                            <i class="fa-solid fa-plus"></i>
                            <span>Create new</span>
                            </button>    
                        </button>
                        <div class="panel">
                            
                            <input type="text" name="settingsName" id="settingsName" class="optionInput" placeholder="" autocomplete="off">
                            <label for="settingsName">Settings Name</label>
                            <br>
                            <button onclick="showToast('Settings created!')">Save</button>
                        </div>
                    </div>

                    <div class="accordion">
                        <button class="accordionSection">
                            <i class="fa-solid fa-list"></i>
                            <span>Update existing</span>
                        </button>
                        <div class="panel">
                            <label for="saveToSettings" style="position: static;">Choose</label>
                            <select name="" id="">
                                ${getSavedSettingsOptions()}
                            </select>
                            <br>
                            <button onclick="showToast('Settings updated!')">Update</button>
                        </div>
                    </div>
                </div>          
            `;
            savePopupWrapper.append(settingsOptionDiv);
            settingsOptionDiv.showModal();
            showCollapseAccordionDiv();
            break;

        case "download":
            settingsOptionDiv.innerHTML = `
                <div class="settingsOptionHeader">
                    <p style="margin: 0">Download</p>
                    ${closeSettingsOption}
                </div>
                <div id="toastContainer">
                </div>
                <div id="settingsOptionContent" class="settingsOptionContent">
                <div class="accordion">
                    <button class="accordionSection active">
                        <i class="fa-solid fa-download"></i>
                        <span>Download as Image</span>
                        </button>    
                    </button>
                    <div class="panel">
                        <div id="toastContainer">
                        </div>
                        <input type="text" name="settingsName" id="settingsName" class="optionInput" placeholder="" autocomplete="off">
                        <label for="settingsName">Image Name</label>
                        <button onclick="showToast('Image downloaded!')">Download</button>
                    </div>
                </div>

                <div class="accordion">
                    <button class="accordionSection">
                        <i class="fa-solid fa-floppy-disk"></i>
                        <span>Save to Server</span>
                    </button>
                    <div class="panel">
                        <input type="text" name="settingsName" id="settingsName" class="optionInput" placeholder="" autocomplete="off">
                        <label for="saveToSettings">Image Name</label>
                        <button onclick="showToast('Saved to Server!')">Download</button>
                    </div>
                </div>
                </div>  
            `;
            savePopupWrapper.append(settingsOptionDiv);
            settingsOptionDiv.showModal();
            showCollapseAccordionDiv();
            break;

        case "share":
            // Handle form submit on server
            settingsOptionDiv.innerHTML = ` 
                <div class="settingsOptionHeader">
                    <p style="margin: 0">Share</p>
                    ${closeSettingsOption}
                </div>
                <div id="toastContainer">
                </div>
                <div id="settingsOptionContent" class="settingsOptionContent">
                    <form action="" target="_blank">
                        ${shareSettings}
                        <hr>
                        <div class="panel" style="text-align: center; display: block;">
                            <input type="text" name="shareMessage" id="settingsName" class="optionInput" placeholder="" autocomplete="off">
                            <label for="shareMessage">Write a Message</label>
                            <br>
                            <button type="submit">Share</button>
                        <div>   
                    </form>
                <div>
                `;
            savePopupWrapper.append(settingsOptionDiv);
            settingsOptionDiv.showModal();
            break;

        case "load settings":
            // To be completed
            settingsOptionDiv.innerHTML = `
                <div class="settingsOptionHeader">
                    <p style="margin: 0">Saved Settings</p>
                    ${closeSettingsOption}
                </div>
                <div id="settingsOptionContent" class="settingsOptionContent">
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Last modified</th>
                        <th>Edit</th>
                        <th>Share</th>
                        <th>Delete</th>
                    </tr>
                    ${getSavedSettingRows()}
                </table>
            `;
            savePopupWrapper.append(settingsOptionDiv);
            settingsOptionDiv.showModal();
            break;
        default:
            break;
    }
}

function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');

    toastContainer.innerHTML = "";

    // Create the toast element
    const toast = document.createElement('div');
    toast.className = 'toastNotification';

    toast.innerHTML = `
                <span>${message}</span>
                <button class="close-btn" onclick="closeToast(this)">
                    <i class="fa-solid fa-xmark" aria-hidden="true" style="height: 8px; width: 8px; margin-top: 8px;"></i>
                </button>
        `;

    // Append the toast to the container
    toastContainer.appendChild(toast);

    // setTimeout(() => {
    //     toastContainer.innerHTML = "";
    // }, 5000);
}

function closeToast(button) {
    const toast = button.parentElement;
    if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
    }
}

function editSavedSetting(index) {
    removeDialogOnEscPress();

    const settingsOptionDiv = document.createElement("dialog");
    settingsOptionDiv.id = "settingsOption";

    settingsOptionDiv.innerHTML = `
                <div class="settingsOptionHeader">
                    <p style="margin: 0">Rename Settings</p>
                    ${closeSettingsOption}
                </div>
                <div id="settingsOptionContent" class="settingsOptionContent">
                    <div class="panel" style="display: block;">
                        <input type="text" name="settingsName" id="settingsName" class="optionInput" placeholder="" autocomplete="off" value="${notes[index].title}">
                        <label for="settingsName">Enter new name</label>
                        <br>
                        <button>Update</button>
                    </div>
                </div>          
            `;
    savePopupWrapper.append(settingsOptionDiv);
    settingsOptionDiv.showModal();
}