document.addEventListener("DOMContentLoaded", function () {

    const wrapper = document.getElementById("tsrHmToolbarWrap");

    let heatmap = document.getElementsByClassName("tsrHmDiv")[0];

    function tsrHmApplyTheme(theme) {

        if (theme === "dark") {

            wrapper.classList.remove("tsrHmThemeLight");
            wrapper.classList.add("tsrHmThemeDark");

            heatmap.style.backgroundColor = "#000a20";

        } else {
heatmap.style.backgroundColor = "#e3e3e3";
            wrapper.classList.remove("tsrHmThemeDark");
            wrapper.classList.add("tsrHmThemeLight");
        }
    }

    // Initial Theme
    const checkedTheme = document.querySelector('input[name="hmbgc"]:checked');

    if (checkedTheme) {
        tsrHmApplyTheme(checkedTheme.value);
    }

    // Theme Toggle Listener
    document.querySelectorAll('input[name="hmbgc"]').forEach(function (radio) {

        radio.addEventListener("change", function () {

            tsrHmApplyTheme(this.value);
        });
    });

});