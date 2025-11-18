var miChTbUtils = (function () {

    function paramDefined(param) {
        if (typeof param != "undefined" && param != null) {
            return true;
        }

        return false;
    }

    return {
        pd: paramDefined,
    }
})();