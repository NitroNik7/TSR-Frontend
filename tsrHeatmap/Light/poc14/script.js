document.addEventListener("DOMContentLoaded", () => {
    const workspace = document.getElementById("tsrHmWorkspaceWrapper");

    // Unified helper selector checking theme value updates
    const applyThemeState = (themeValue) => {
        if (themeValue === "dark") {
            workspace.classList.add("tsrHmDarkTheme");
        } else {
            workspace.classList.remove("tsrHmDarkTheme");
        }
    };

    // 1. Listen for clicks on the custom radio inputs built for #hmArDiv
    const lightRadio = document.getElementById("themeLight");
    const darkRadio = document.getElementById("themeDark");

    if (lightRadio && darkRadio) {
        lightRadio.addEventListener("change", () => applyThemeState("light"));
        darkRadio.addEventListener("change", () => applyThemeState("dark"));
    }

    // 2. Fallback listener to monitor clicks inside legacy layouts or .theme-btn components
    document.addEventListener("click", (event) => {
        const targetButton = event.target.closest(".theme-btn");
        if (targetButton) {
            const isDark = targetButton.textContent.trim().toLowerCase() === "dark";
            applyThemeState(isDark ? "dark" : "light");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {

    // Core functional routine tracking theme updates globally across required elements
    const applyGlobalTheme = (themeValue) => {
        // Collect all target elements that need visual overrides applied directly
        const targetElements = document.querySelectorAll(
            '.tsrHmDiv, .tsrHmColorSchemeWrapper, #tsrHmCtrlsWrapper, #heatMapDivTemp'
        );

        targetElements.forEach(element => {
            if (themeValue === "dark") {
                element.classList.add("tsrHmDarkTheme");
            } else {
                element.classList.remove("tsrHmDarkTheme");
            }
        });
    };

    // 1. Monitor state changes on specialized control inputs within #hmArDiv
    const lightRadio = document.getElementById("themeLight");
    const darkRadio = document.getElementById("themeDark");

    if (lightRadio && darkRadio) {
        lightRadio.addEventListener("change", () => applyGlobalTheme("light"));
        darkRadio.addEventListener("change", () => applyGlobalTheme("dark"));
    }

    // 2. Click monitor tracking fallback for native button groups like .theme-btn
    document.addEventListener("click", (event) => {
        const targetButton = event.target.closest(".theme-btn");
        if (targetButton) {
            const requestedTheme = targetButton.textContent.trim().toLowerCase();
            if (requestedTheme === "dark" || requestedTheme === "light") {
                applyGlobalTheme(requestedTheme);
            }
        }
    });
});


// Market segment handler

// 1. Show/Hide Dropdown Window Popover Block
function toggleSegmentPopover() {

    const popover = document.getElementById('tsrHmPopover');
    popover.classList.toggle('show-popover');

    // Position popover correctly
    let markSegBtn = document.getElementById("hmMarketSegment")
    let btnBounds = markSegBtn.getBoundingClientRect();
    if (window.innerWidth > 768) {
        if (btnBounds.left + popover.offsetWidth > window.innerWidth) {
            popover.style.right = 0;
            popover.style.left = "unset";
        }
        else {
            popover.style.right = "unset";
            popover.style.left = "0";
        }
    }
}

// 2. Tab Switching Engine inside Popover Layout
function switchSegmentTab(event, paneId) {
    event.stopPropagation(); // Prevents layout bubble collisions

    // Deactivate all tab action triggers
    const tabButtons = document.querySelectorAll('.popTabBtn');
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // Hide all item listing panes
    const dataPanes = document.querySelectorAll('.popDataPane');
    dataPanes.forEach(pane => pane.classList.remove('active'));

    // Activate target focus references
    event.currentTarget.classSub = event.currentTarget.classList.add('active');
    document.getElementById(paneId).classList.add('active');
}

// 3. Complete Final Target Item Selection Sequence Handling
function selectMarketItem(element, itemLabelText, passThroughCode = null) {
    // Update Master Top Button display string labels
    document.getElementById('tsrHmSegmentLabel').innerText = itemLabelText;

    // Unify styling highlight selection reset logic clears across both pane item paradigms
    const gridItems = document.querySelectorAll('.popGrid3Col a, .popGrid3Col button');
    gridItems.forEach(item => item.classList.remove('tsrHmActiveTab', 'active'));

    // Highlight selected item element based on target semantic tag variants
    element.classList.add(element.tagName === 'BUTTON' ? 'tsrHmActiveTab' : 'active');

    // Hide Popover Context Area upon click sequence completion
    document.getElementById('tsrHmPopover').classList.remove('show-popover');

    // Forward interaction events to tracker backend script engines if available
    const trackingKey = passThroughCode || itemLabelText;
    if (typeof dyhm !== 'undefined' && typeof dyhm.ua === 'function') {
        dyhm.ua('marketSegment', trackingKey);
    }
}

// 4. Window Event Listener Object Context hooks to close popover when clicking anywhere outside
window.addEventListener('click', function (e) {
    const wrapper = document.getElementById('tsrHmMarketSegmentWrapper');
    if (wrapper && !wrapper.contains(e.target)) {
        document.getElementById('tsrHmPopover').classList.remove('show-popover');
    }
});


// ----