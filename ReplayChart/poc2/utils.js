var miChTbUtils = (function () {

    function paramDefined(param) {
        if (typeof param != "undefined" && param != null) {
            return true;
        }

        return false;
    }


    function isMobile() {
        if (window.innerWidth < 768) {
            return true;
        }

        return false;
    }

    return {
        pd: paramDefined,
        im: isMobile
    }
})();