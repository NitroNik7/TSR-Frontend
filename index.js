function t(b) {
    return "boolean" == typeof b ? false : null == b || void 0 == b || "null" == b || "undefined" == b || "" == b ? true : false
}
