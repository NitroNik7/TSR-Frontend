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