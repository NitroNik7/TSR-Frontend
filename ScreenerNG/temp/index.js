
  class umdToggler{
    constructor(){
      this._togglers = document.querySelectorAll("[data-mdb-umd-toggler]");

      this._init();
    }


    _init() {
      this._togglers.forEach((item) => {

        const umdScriptEnabled = item.dataset.script.toLowerCase() === "javascript";

        if (umdScriptEnabled) {
          item.checked = true;
        }

        const tabs = [...item.closest(".nav-pills").querySelectorAll(".nav-link")];

        
        const indexOfUmd = tabs.findIndex(
          (item) => item.textContent.toLowerCase() === "umd"
        );
        if (indexOfUmd >= 0) {
          tabs[indexOfUmd].textContent = "javascript";
        }
      });

      this._togglers.forEach((item) =>
        item.addEventListener("change", this._toggleScriptTab.bind(this))
      );
    }

    _getSortedScriptTabs(e, tabs) {
      
      const providedArray = e.target.value
        .replace("[", "")
        .replace("]", "")
        .split(" ");
      const isScriptFirst =
        providedArray.findIndex(item => item.toLowerCase() === "umd") > providedArray.findIndex(item => item.toLowerCase() === "javascript");

      
      const scripts = tabs.filter((item) => {

        return item.textContent.toLowerCase() === "javascript";
      });
      

      return isScriptFirst ? scripts : scripts.reverse();
    }

    _toggleScriptTab(e) {
      const inputParent = e.target.closest(".nav-pills")
      const tabs = [...inputParent.querySelectorAll(".nav-link")];

      const sortedScriptTabs = this._getSortedScriptTabs(e, tabs);

      
      const activeTab = inputParent
        .querySelector('.active')
        .textContent.toLowerCase();
      const isScriptCurrentTab =
        activeTab === "javascript" || activeTab === "umd";
      

      e.target.checked
        ? this._toggleScriptTabs(...sortedScriptTabs, isScriptCurrentTab)
        : this._toggleScriptTabs(
            ...sortedScriptTabs.slice().reverse(),
            isScriptCurrentTab
          );
    }

    _toggleScriptTabs(tab1, tab2, isScriptCurrentTab) {
      tab1.classList.toggle("d-none");
      tab2.classList.toggle("d-none");

      isScriptCurrentTab && tab2.click();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    new umdToggler();
  });