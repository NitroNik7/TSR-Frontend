var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(a) {
    return a.raw = a
}
;
$jscomp.createTemplateTagFirstArgWithRaw = function(a, f) {
    a.raw = f;
    return a
}
;
$jscomp.arrayIteratorImpl = function(a) {
    var f = 0;
    return function() {
        return f < a.length ? {
            done: !1,
            value: a[f++]
        } : {
            done: !0
        }
    }
}
;
$jscomp.arrayIterator = function(a) {
    return {
        next: $jscomp.arrayIteratorImpl(a)
    }
}
;
$jscomp.makeIterator = function(a) {
    var f = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return f ? f.call(a) : $jscomp.arrayIterator(a)
}
;
$jscomp.arrayFromIterator = function(a) {
    for (var f, m = []; !(f = a.next()).done; )
        m.push(f.value);
    return m
}
;
$jscomp.arrayFromIterable = function(a) {
    return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a))
}
;
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, f, m) {
    if (a == Array.prototype || a == Object.prototype)
        return a;
    a[f] = m.value;
    return a
}
;
$jscomp.getGlobal = function(a) {
    a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var f = 0; f < a.length; ++f) {
        var m = a[f];
        if (m && m.Math == Math)
            return m
    }
    throw Error("Cannot find global object");
}
;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, f) {
    var m = $jscomp.propertyToPolyfillSymbol[f];
    if (null == m)
        return a[f];
    m = a[m];
    return void 0 !== m ? m : a[f]
};
$jscomp.polyfill = function(a, f, m, p) {
    f && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, f, m, p) : $jscomp.polyfillUnisolated(a, f, m, p))
}
;
$jscomp.polyfillUnisolated = function(a, f, m, p) {
    m = $jscomp.global;
    a = a.split(".");
    for (p = 0; p < a.length - 1; p++) {
        var n = a[p];
        if (!(n in m))
            return;
        m = m[n]
    }
    a = a[a.length - 1];
    p = m[a];
    f = f(p);
    f != p && null != f && $jscomp.defineProperty(m, a, {
        configurable: !0,
        writable: !0,
        value: f
    })
}
;
$jscomp.polyfillIsolated = function(a, f, m, p) {
    var n = a.split(".");
    a = 1 === n.length;
    p = n[0];
    p = !a && p in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var z = 0; z < n.length - 1; z++) {
        var c = n[z];
        if (!(c in p))
            return;
        p = p[c]
    }
    n = n[n.length - 1];
    m = $jscomp.IS_SYMBOL_NATIVE && "es6" === m ? p[n] : null;
    f = f(m);
    null != f && (a ? $jscomp.defineProperty($jscomp.polyfills, n, {
        configurable: !0,
        writable: !0,
        value: f
    }) : f !== m && (void 0 === $jscomp.propertyToPolyfillSymbol[n] && (m = 1E9 * Math.random() >>> 0,
    $jscomp.propertyToPolyfillSymbol[n] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(n) : $jscomp.POLYFILL_PREFIX + m + "$" + n),
    $jscomp.defineProperty(p, $jscomp.propertyToPolyfillSymbol[n], {
        configurable: !0,
        writable: !0,
        value: f
    })))
}
;
$jscomp.underscoreProtoCanBeSet = function() {
    var a = {
        a: !0
    }
      , f = {};
    try {
        return f.__proto__ = a,
        f.a
    } catch (m) {}
    return !1
}
;
$jscomp.setPrototypeOf = $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(a, f) {
    a.__proto__ = f;
    if (a.__proto__ !== f)
        throw new TypeError(a + " is not extensible");
    return a
}
: null;
$jscomp.generator = {};
$jscomp.generator.ensureIteratorResultIsObject_ = function(a) {
    if (!(a instanceof Object))
        throw new TypeError("Iterator result " + a + " is not an object");
}
;
$jscomp.generator.Context = function() {
    this.isRunning_ = !1;
    this.yieldAllIterator_ = null;
    this.yieldResult = void 0;
    this.nextAddress = 1;
    this.finallyAddress_ = this.catchAddress_ = 0;
    this.finallyContexts_ = this.abruptCompletion_ = null
}
;
$jscomp.generator.Context.prototype.start_ = function() {
    if (this.isRunning_)
        throw new TypeError("Generator is already running");
    this.isRunning_ = !0
}
;
$jscomp.generator.Context.prototype.stop_ = function() {
    this.isRunning_ = !1
}
;
$jscomp.generator.Context.prototype.jumpToErrorHandler_ = function() {
    this.nextAddress = this.catchAddress_ || this.finallyAddress_
}
;
$jscomp.generator.Context.prototype.next_ = function(a) {
    this.yieldResult = a
}
;
$jscomp.generator.Context.prototype.throw_ = function(a) {
    this.abruptCompletion_ = {
        exception: a,
        isException: !0
    };
    this.jumpToErrorHandler_()
}
;
$jscomp.generator.Context.prototype.return = function(a) {
    this.abruptCompletion_ = {
        return: a
    };
    this.nextAddress = this.finallyAddress_
}
;
$jscomp.generator.Context.prototype.jumpThroughFinallyBlocks = function(a) {
    this.abruptCompletion_ = {
        jumpTo: a
    };
    this.nextAddress = this.finallyAddress_
}
;
$jscomp.generator.Context.prototype.yield = function(a, f) {
    this.nextAddress = f;
    return {
        value: a
    }
}
;
$jscomp.generator.Context.prototype.yieldAll = function(a, f) {
    a = $jscomp.makeIterator(a);
    var m = a.next();
    $jscomp.generator.ensureIteratorResultIsObject_(m);
    if (m.done)
        this.yieldResult = m.value,
        this.nextAddress = f;
    else
        return this.yieldAllIterator_ = a,
        this.yield(m.value, f)
}
;
$jscomp.generator.Context.prototype.jumpTo = function(a) {
    this.nextAddress = a
}
;
$jscomp.generator.Context.prototype.jumpToEnd = function() {
    this.nextAddress = 0
}
;
$jscomp.generator.Context.prototype.setCatchFinallyBlocks = function(a, f) {
    this.catchAddress_ = a;
    void 0 != f && (this.finallyAddress_ = f)
}
;
$jscomp.generator.Context.prototype.setFinallyBlock = function(a) {
    this.catchAddress_ = 0;
    this.finallyAddress_ = a || 0
}
;
$jscomp.generator.Context.prototype.leaveTryBlock = function(a, f) {
    this.nextAddress = a;
    this.catchAddress_ = f || 0
}
;
$jscomp.generator.Context.prototype.enterCatchBlock = function(a) {
    this.catchAddress_ = a || 0;
    a = this.abruptCompletion_.exception;
    this.abruptCompletion_ = null;
    return a
}
;
$jscomp.generator.Context.prototype.enterFinallyBlock = function(a, f, m) {
    m ? this.finallyContexts_[m] = this.abruptCompletion_ : this.finallyContexts_ = [this.abruptCompletion_];
    this.catchAddress_ = a || 0;
    this.finallyAddress_ = f || 0
}
;
$jscomp.generator.Context.prototype.leaveFinallyBlock = function(a, f) {
    f = this.finallyContexts_.splice(f || 0)[0];
    if (f = this.abruptCompletion_ = this.abruptCompletion_ || f) {
        if (f.isException)
            return this.jumpToErrorHandler_();
        void 0 != f.jumpTo && this.finallyAddress_ < f.jumpTo ? (this.nextAddress = f.jumpTo,
        this.abruptCompletion_ = null) : this.nextAddress = this.finallyAddress_
    } else
        this.nextAddress = a
}
;
$jscomp.generator.Context.prototype.forIn = function(a) {
    return new $jscomp.generator.Context.PropertyIterator(a)
}
;
$jscomp.generator.Context.PropertyIterator = function(a) {
    this.object_ = a;
    this.properties_ = [];
    for (var f in a)
        this.properties_.push(f);
    this.properties_.reverse()
}
;
$jscomp.generator.Context.PropertyIterator.prototype.getNext = function() {
    for (; 0 < this.properties_.length; ) {
        var a = this.properties_.pop();
        if (a in this.object_)
            return a
    }
    return null
}
;
$jscomp.generator.Engine_ = function(a) {
    this.context_ = new $jscomp.generator.Context;
    this.program_ = a
}
;
$jscomp.generator.Engine_.prototype.next_ = function(a) {
    this.context_.start_();
    if (this.context_.yieldAllIterator_)
        return this.yieldAllStep_(this.context_.yieldAllIterator_.next, a, this.context_.next_);
    this.context_.next_(a);
    return this.nextStep_()
}
;
$jscomp.generator.Engine_.prototype.return_ = function(a) {
    this.context_.start_();
    var f = this.context_.yieldAllIterator_;
    if (f)
        return this.yieldAllStep_("return"in f ? f["return"] : function(m) {
            return {
                value: m,
                done: !0
            }
        }
        , a, this.context_.return);
    this.context_.return(a);
    return this.nextStep_()
}
;
$jscomp.generator.Engine_.prototype.throw_ = function(a) {
    this.context_.start_();
    if (this.context_.yieldAllIterator_)
        return this.yieldAllStep_(this.context_.yieldAllIterator_["throw"], a, this.context_.next_);
    this.context_.throw_(a);
    return this.nextStep_()
}
;
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function(a, f, m) {
    try {
        var p = a.call(this.context_.yieldAllIterator_, f);
        $jscomp.generator.ensureIteratorResultIsObject_(p);
        if (!p.done)
            return this.context_.stop_(),
            p;
        var n = p.value
    } catch (z) {
        return this.context_.yieldAllIterator_ = null,
        this.context_.throw_(z),
        this.nextStep_()
    }
    this.context_.yieldAllIterator_ = null;
    m.call(this.context_, n);
    return this.nextStep_()
}
;
$jscomp.generator.Engine_.prototype.nextStep_ = function() {
    for (; this.context_.nextAddress; )
        try {
            var a = this.program_(this.context_);
            if (a)
                return this.context_.stop_(),
                {
                    value: a.value,
                    done: !1
                }
        } catch (f) {
            this.context_.yieldResult = void 0,
            this.context_.throw_(f)
        }
    this.context_.stop_();
    if (this.context_.abruptCompletion_) {
        a = this.context_.abruptCompletion_;
        this.context_.abruptCompletion_ = null;
        if (a.isException)
            throw a.exception;
        return {
            value: a.return,
            done: !0
        }
    }
    return {
        value: void 0,
        done: !0
    }
}
;
$jscomp.generator.Generator_ = function(a) {
    this.next = function(f) {
        return a.next_(f)
    }
    ;
    this.throw = function(f) {
        return a.throw_(f)
    }
    ;
    this.return = function(f) {
        return a.return_(f)
    }
    ;
    this[Symbol.iterator] = function() {
        return this
    }
}
;
$jscomp.generator.createGenerator = function(a, f) {
    f = new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(f));
    $jscomp.setPrototypeOf && a.prototype && $jscomp.setPrototypeOf(f, a.prototype);
    return f
}
;
$jscomp.asyncExecutePromiseGenerator = function(a) {
    function f(p) {
        return a.next(p)
    }
    function m(p) {
        return a.throw(p)
    }
    return new Promise(function(p, n) {
        function z(c) {
            c.done ? p(c.value) : Promise.resolve(c.value).then(f, m).then(z, n)
        }
        z(a.next())
    }
    )
}
;
$jscomp.asyncExecutePromiseGeneratorFunction = function(a) {
    return $jscomp.asyncExecutePromiseGenerator(a())
}
;
$jscomp.asyncExecutePromiseGeneratorProgram = function(a) {
    return $jscomp.asyncExecutePromiseGenerator(new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(a)))
}
;
$jscomp.initSymbol = function() {}
;
$jscomp.polyfill("Symbol", function(a) {
    if (a)
        return a;
    var f = function(z, c) {
        this.$jscomp$symbol$id_ = z;
        $jscomp.defineProperty(this, "description", {
            configurable: !0,
            writable: !0,
            value: c
        })
    };
    f.prototype.toString = function() {
        return this.$jscomp$symbol$id_
    }
    ;
    var m = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_"
      , p = 0
      , n = function(z) {
        if (this instanceof n)
            throw new TypeError("Symbol is not a constructor");
        return new f(m + (z || "") + "_" + p++,z)
    };
    return n
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(a) {
    if (a)
        return a;
    a = Symbol("Symbol.iterator");
    for (var f = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), m = 0; m < f.length; m++) {
        var p = $jscomp.global[f[m]];
        "function" === typeof p && "function" != typeof p.prototype[a] && $jscomp.defineProperty(p.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function() {
                return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
            }
        })
    }
    return a
}, "es6", "es3");
$jscomp.iteratorPrototype = function(a) {
    a = {
        next: a
    };
    a[Symbol.iterator] = function() {
        return this
    }
    ;
    return a
}
;
$jscomp.polyfill("Promise", function(a) {
    function f() {
        this.batch_ = null
    }
    function m(c) {
        return c instanceof n ? c : new n(function(k, l) {
            k(c)
        }
        )
    }
    if (a && (!($jscomp.FORCE_POLYFILL_PROMISE || $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof $jscomp.global.PromiseRejectionEvent) || !$jscomp.global.Promise || -1 === $jscomp.global.Promise.toString().indexOf("[native code]")))
        return a;
    f.prototype.asyncExecute = function(c) {
        if (null == this.batch_) {
            this.batch_ = [];
            var k = this;
            this.asyncExecuteFunction(function() {
                k.executeBatch_()
            })
        }
        this.batch_.push(c)
    }
    ;
    var p = $jscomp.global.setTimeout;
    f.prototype.asyncExecuteFunction = function(c) {
        p(c, 0)
    }
    ;
    f.prototype.executeBatch_ = function() {
        for (; this.batch_ && this.batch_.length; ) {
            var c = this.batch_;
            this.batch_ = [];
            for (var k = 0; k < c.length; ++k) {
                var l = c[k];
                c[k] = null;
                try {
                    l()
                } catch (u) {
                    this.asyncThrow_(u)
                }
            }
        }
        this.batch_ = null
    }
    ;
    f.prototype.asyncThrow_ = function(c) {
        this.asyncExecuteFunction(function() {
            throw c;
        })
    }
    ;
    var n = function(c) {
        this.state_ = 0;
        this.result_ = void 0;
        this.onSettledCallbacks_ = [];
        this.isRejectionHandled_ = !1;
        var k = this.createResolveAndReject_();
        try {
            c(k.resolve, k.reject)
        } catch (l) {
            k.reject(l)
        }
    };
    n.prototype.createResolveAndReject_ = function() {
        function c(u) {
            return function(A) {
                l || (l = !0,
                u.call(k, A))
            }
        }
        var k = this
          , l = !1;
        return {
            resolve: c(this.resolveTo_),
            reject: c(this.reject_)
        }
    }
    ;
    n.prototype.resolveTo_ = function(c) {
        if (c === this)
            this.reject_(new TypeError("A Promise cannot resolve to itself"));
        else if (c instanceof n)
            this.settleSameAsPromise_(c);
        else {
            a: switch (typeof c) {
            case "object":
                var k = null != c;
                break a;
            case "function":
                k = !0;
                break a;
            default:
                k = !1
            }
            k ? this.resolveToNonPromiseObj_(c) : this.fulfill_(c)
        }
    }
    ;
    n.prototype.resolveToNonPromiseObj_ = function(c) {
        var k = void 0;
        try {
            k = c.then
        } catch (l) {
            this.reject_(l);
            return
        }
        "function" == typeof k ? this.settleSameAsThenable_(k, c) : this.fulfill_(c)
    }
    ;
    n.prototype.reject_ = function(c) {
        this.settle_(2, c)
    }
    ;
    n.prototype.fulfill_ = function(c) {
        this.settle_(1, c)
    }
    ;
    n.prototype.settle_ = function(c, k) {
        if (0 != this.state_)
            throw Error("Cannot settle(" + c + ", " + k + "): Promise already settled in state" + this.state_);
        this.state_ = c;
        this.result_ = k;
        2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
        this.executeOnSettledCallbacks_()
    }
    ;
    n.prototype.scheduleUnhandledRejectionCheck_ = function() {
        var c = this;
        p(function() {
            if (c.notifyUnhandledRejection_()) {
                var k = $jscomp.global.console;
                "undefined" !== typeof k && k.error(c.result_)
            }
        }, 1)
    }
    ;
    n.prototype.notifyUnhandledRejection_ = function() {
        if (this.isRejectionHandled_)
            return !1;
        var c = $jscomp.global.CustomEvent
          , k = $jscomp.global.Event
          , l = $jscomp.global.dispatchEvent;
        if ("undefined" === typeof l)
            return !0;
        "function" === typeof c ? c = new c("unhandledrejection",{
            cancelable: !0
        }) : "function" === typeof k ? c = new k("unhandledrejection",{
            cancelable: !0
        }) : (c = $jscomp.global.document.createEvent("CustomEvent"),
        c.initCustomEvent("unhandledrejection", !1, !0, c));
        c.promise = this;
        c.reason = this.result_;
        return l(c)
    }
    ;
    n.prototype.executeOnSettledCallbacks_ = function() {
        if (null != this.onSettledCallbacks_) {
            for (var c = 0; c < this.onSettledCallbacks_.length; ++c)
                z.asyncExecute(this.onSettledCallbacks_[c]);
            this.onSettledCallbacks_ = null
        }
    }
    ;
    var z = new f;
    n.prototype.settleSameAsPromise_ = function(c) {
        var k = this.createResolveAndReject_();
        c.callWhenSettled_(k.resolve, k.reject)
    }
    ;
    n.prototype.settleSameAsThenable_ = function(c, k) {
        var l = this.createResolveAndReject_();
        try {
            c.call(k, l.resolve, l.reject)
        } catch (u) {
            l.reject(u)
        }
    }
    ;
    n.prototype.then = function(c, k) {
        function l(y, D) {
            return "function" == typeof y ? function(x) {
                try {
                    u(y(x))
                } catch (G) {
                    A(G)
                }
            }
            : D
        }
        var u, A, C = new n(function(y, D) {
            u = y;
            A = D
        }
        );
        this.callWhenSettled_(l(c, u), l(k, A));
        return C
    }
    ;
    n.prototype.catch = function(c) {
        return this.then(void 0, c)
    }
    ;
    n.prototype.callWhenSettled_ = function(c, k) {
        function l() {
            switch (u.state_) {
            case 1:
                c(u.result_);
                break;
            case 2:
                k(u.result_);
                break;
            default:
                throw Error("Unexpected state: " + u.state_);
            }
        }
        var u = this;
        null == this.onSettledCallbacks_ ? z.asyncExecute(l) : this.onSettledCallbacks_.push(l);
        this.isRejectionHandled_ = !0
    }
    ;
    n.resolve = m;
    n.reject = function(c) {
        return new n(function(k, l) {
            l(c)
        }
        )
    }
    ;
    n.race = function(c) {
        return new n(function(k, l) {
            for (var u = $jscomp.makeIterator(c), A = u.next(); !A.done; A = u.next())
                m(A.value).callWhenSettled_(k, l)
        }
        )
    }
    ;
    n.all = function(c) {
        var k = $jscomp.makeIterator(c)
          , l = k.next();
        return l.done ? m([]) : new n(function(u, A) {
            function C(x) {
                return function(G) {
                    y[x] = G;
                    D--;
                    0 == D && u(y)
                }
            }
            var y = []
              , D = 0;
            do
                y.push(void 0),
                D++,
                m(l.value).callWhenSettled_(C(y.length - 1), A),
                l = k.next();
            while (!l.done)
        }
        )
    }
    ;
    return n
}, "es6", "es3");
$jscomp.owns = function(a, f) {
    return Object.prototype.hasOwnProperty.call(a, f)
}
;
$jscomp.polyfill("Object.entries", function(a) {
    return a ? a : function(f) {
        var m = [], p;
        for (p in f)
            $jscomp.owns(f, p) && m.push([p, f[p]]);
        return m
    }
}, "es8", "es3");
$jscomp.iteratorFromArray = function(a, f) {
    a instanceof String && (a += "");
    var m = 0
      , p = !1
      , n = {
        next: function() {
            if (!p && m < a.length) {
                var z = m++;
                return {
                    value: f(z, a[z]),
                    done: !1
                }
            }
            p = !0;
            return {
                done: !0,
                value: void 0
            }
        }
    };
    n[Symbol.iterator] = function() {
        return n
    }
    ;
    return n
}
;
$jscomp.polyfill("Array.prototype.keys", function(a) {
    return a ? a : function() {
        return $jscomp.iteratorFromArray(this, function(f) {
            return f
        })
    }
}, "es6", "es3");
var miSrnUtils = function() {
    function a(c) {
        if (!isNaN(parseFloat(c))) {
            c = parseFloat(c);
            if (0 == c)
                return c;
            "number" == typeof c && (9999999 < c && (c /= 1E7),
            -9999999 > c && (c /= 1E7),
            c = Math.round(100 * c) / 100)
        }
        return c
    }
    function f(c) {
        var k = document.getElementById("secRotToastContainer");
        p.isNotNull(mtgv) && p.isNotNull(mtgv.mtpp) && p.isNotNull(mtgv.mtpp) ? n = !0 : setTimeout(function() {
            f(c)
        }, 500);
        if (n && !mtgv.mtpp.pr && c) {
            var l = mintJsUtil.getBaseUrl() + "/my/UserManagement/?act=login"
              , u = mintJsUtil.getBaseUrl() + "/my/TsrPlans/";
            l = '<h5 style="color: red;">This is a premium feature. Please    <a href="' + (l + '">Login</a>   &nbsp;OR&nbsp;   <a href="') + (u + '">Subscribe</a>');
            l += "</h5>";
            k.innerHTML = l;
            k.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
            document.getElementById("tsrSecRotTypeSelect").value = "industry";
            document.getElementById("tsrSecRotDurationSelect").value = "3m"
        } else
            k.innerHTML = ""
    }
    function m(c, k) {
        p.isNotNull(mtgv) && p.isNotNull(mtgv.mtpp) && p.isNotNull(mtgv.mtpp) ? n = !0 : setTimeout(function() {
            m(c, k)
        }, 500);
        "undefined" != typeof DataTable && n && setTimeout(function() {
            $.fn.DataTable.isDataTable("#" + c) || $("#" + c).DataTable(k)
        }, 100)
    }
    var p = mintJsUtil
      , n = !1
      , z = {
        "Short Term": {
            "1d": {
                label: "1 Day",
                freq: "mm15",
                tick: "mm15",
                ema1: "5",
                ema2: "8",
                rtnBreak: "hh1"
            },
            "1w": {
                label: "1 Week",
                freq: "hh2",
                tick: "hh2",
                ema1: "5",
                ema2: "8",
                rtnBreak: "D"
            },
            "2w": {
                label: "2 Weeks",
                freq: "hh4",
                tick: "hh4",
                ema1: "5",
                ema2: "8",
                rtnBreak: "2D"
            }
        },
        "Medium Term": {
            "1m": {
                label: "1 Month",
                freq: "M",
                tick: "D",
                ema1: "5",
                ema2: "8",
                rtnBreak: "W"
            },
            "3m": {
                label: "3 Months",
                freq: "Q",
                tick: "D",
                ema1: "13",
                ema2: "34",
                rtnBreak: "W"
            },
            "6m": {
                label: "6 Months",
                freq: "HY",
                tick: "D",
                ema1: "15",
                ema2: "50",
                rtnBreak: "M"
            }
        },
        "Long Term": {
            "1y": {
                label: "1 Year",
                freq: "Y",
                tick: "D",
                ema1: "50",
                ema2: "200",
                rtnBreak: "Q"
            },
            "2y": {
                label: "2 Years",
                freq: "2Y",
                tick: "W",
                ema1: "13",
                ema2: "34",
                rtnBreak: "Q"
            },
            "5y": {
                label: "5 Years",
                freq: "5Y",
                tick: "M",
                ema1: "13",
                ema2: "34",
                rtnBreak: "Y"
            }
        }
    };
    return {
        pds: function(c, k) {
            c = document.getElementById(c);
            var l = "";
            Object.entries(z);
            var u = k;
            if (p.isNull(u) || "" == k)
                u = "3m";
            k = Object.entries(z);
            for (var A = 0; A < k.length; A++) {
                var C = k[A];
                l += '<optgroup label="' + C[0] + '">';
                C = Object.entries(C[1]);
                for (var y = 0; y < C.length; y++) {
                    var D = C[y];
                    l = D[0] != u ? l + ("<option value='" + D[0] + "'>" + D[1].label + "</option>") : l + ("<option value='" + D[0] + "' selected>" + D[1].label + "</option>")
                }
                l += "</optgroup>"
            }
            c.innerHTML = l
        },
        gd: function(c) {
            var k, l;
            return $jscomp.asyncExecutePromiseGeneratorProgram(function(u) {
                if (1 == u.nextAddress)
                    return u.yield(fetch(c), 2);
                if (4 != u.nextAddress)
                    return k = u.yieldResult,
                    k.redirected || 302 == k.status ? u.return({
                        statusCode: "redirected",
                        url: k.url
                    }) : u.yield(k.json(), 4);
                l = u.yieldResult;
                return u.return(l)
            })
        },
        gf: function(c) {
            for (var k = Object.entries(z), l = 0; l < k.length; l++)
                for (var u = Object.entries(k[l][1]), A = 0; A < u.length; A++) {
                    var C = u[A];
                    if (C[0] == c)
                        return C[1].freq
                }
        },
        gt: function(c) {
            for (var k = Object.entries(z), l = 0; l < k.length; l++)
                for (var u = Object.entries(k[l][1]), A = 0; A < u.length; A++) {
                    var C = u[A];
                    if (C[0] == c)
                        return C[1].tick
                }
        },
        grv: a,
        gcv: function(c, k, l) {
            c = a(c);
            if (p.isNull(l) || "string" != typeof l)
                l = "";
            var u = "";
            p.isNull(k) ? p.isNotNull(c) ? (textColor = 0 == c ? "#000000" : 0 < c ? "#059669" : "#dc2626",
            u += "<span style='color: " + textColor + "'> " + (c + (" " + l)) + " </span>") : u += "<span style='color: black;'> - </span>" : u += "<span style='color: " + k + ";'> " + (c + (" " + l)) + " </span>";
            return u
        },
        slt: f,
        mdt: m,
        esct: function(c, k) {
            c = document.getElementsByClassName("tsrSecRotTableExpandCollapseBadge");
            var l = document.getElementById("tsrSecRotOpSectorsWrapper")
              , u = document.getElementById("tsrSecRotUpSectorsWrapper");
            if (l.classList.contains("col-xl-6"))
                for (l.classList.remove("col-xl-6"),
                u.classList.remove("col-xl-6"),
                l.classList.add("col-12"),
                u.classList.add("col-12"),
                l = 0; l < c.length; l++)
                    c[l].innerHTML = '\n                <span class="fw-medium me-2">Show less</span>\n                <i class="fas fa-expand"></i>\n            ';
            else
                for (l.classList.remove("col-12"),
                u.classList.remove("col-12"),
                l.classList.add("col-xl-6"),
                u.classList.add("col-xl-6"),
                l = 0; l < c.length; l++)
                    c[l].innerHTML = '\n                <span class="fw-medium me-2">Show more</span>\n                <i class="fas fa-expand"></i>\n            ';
            document.getElementById(k).scrollIntoView({
                behavior: "smooth",
                block: "center"
            })
        },
        sem: function(c) {
            var k = document.getElementById("secRotToastContainer");
            k.innerHTML = '<h5 style="color: red;"> ' + c + "</h5>";
            k.scrollIntoView({
                behavior: "smooth",
                block: "center"
            })
        },
        css: "\n        \n\n                /* ======================================================\n                                    TSR Sector Rotation\n                    ====================================================== */\n\n                /* -- Design tokens -- */\n                :root {\n                    --tsrSecRotBlueDark: #0d2d6e;\n                    /* TSR brand deep navy  */\n                    --tsrSecRotBlue: #1a56db;\n                    /* TSR brand blue       */\n                    --tsrSecRotBlueMid: #2563eb;\n                    --tsrSecRotGold: #f59e0b;\n                    /* accent               */\n                    --tsrSecRotPos: #059669;\n                    --tsrSecRotPosBg: #ecfdf5;\n                    --tsrSecRotNeg: #dc2626;\n                    --tsrSecRotNegBg: #fef2f2;\n                    --tsrSecRotNeutral: #334155;\n                    --tsrSecRotSurface: #f8fafc;\n                    --tsrSecRotBorder: #e2e8f0;\n                    --tsrSecRotCardBg: #ffffff;\n                    --tsrSecRotMuted: #64748b;\n                    --tsrSecRotRadius: 10px;\n                    --tsrSecRotRadiusSm: 6px;\n                    --tsrSecRotShadow: 0 1px 4px rgba(0, 0, 0, .08);\n                    --tsrSecRotShadowMd: 0 4px 16px rgba(13, 45, 110, .12);\n                }\n\n                #tsrSecRotTitle {\n                    color: #515365;\n                    font-weight: bold;\n                    font-size: 50px;\n                }\n\n                #tsrSecRotTitle sup {\n                    top: -1em;\n                    font-size: 20px;\n                }\n\n                .tsrSecRotSettings {\n                    gap: 30px;\n                    display: flex;\n                    justify-content: center;\n                    align-items: center;\n                }\n\n                @media only screen and (max-width: 768px) {\n                    #tsrSecRotTitle {\n                        font-size: 40px;\n                    }\n\n                    #tsrSecRotTitle sup {\n                        font-size: 10px;\n                    }\n\n                    .tsrSecRotSettings {\n                        justify-content: space-between;\n                    }\n\n                    #tsrSecRotApplySettingsBtn {\n                        width: 100%;\n                    }\n                }\n\n                .tsrSecRotPage {\n                    background: #f5f8fc;\n                    border-radius: 15px;\n                    /* min-height: 100vh; */\n                }\n\n                /* .tsrSectRotBaseIndexSection,\n                .tsrSectRotSectCompareSection, */\n                .tsrSecRotSectOvrvwSection,\n                .tsrSecRotChartSection {\n                    background: #f5f8fc;\n                    border-radius: 15px;\n                }\n\n                .tsrSecRotControlCard,\n                .tsrSecRotTableCard {\n                    border: none;\n                    border-radius: 18px;\n                    box-shadow: 0 4px 18px rgba(15, 23, 42, 0.06);\n                }\n\n                .tsrSecRotControlCard .card-body,\n                .tsrSecRotTableCard .card-body {\n                    padding: 1.5rem;\n                }\n\n                .tsrSecRotSelect {\n                    border-radius: 12px;\n                    border: 1px solid #dbe4f0;\n                    min-height: 48px;\n                    font-weight: 500;\n                }\n\n                .tsrSecRotApplyBtn,\n                .tsrSecRotRefreshBtn {\n                    background: linear-gradient(135deg, #0b5ed7, #2563eb);\n                    color: white;\n                    border: none;\n                    min-height: 48px;\n                    border-radius: 12px;\n                    font-weight: 600;\n                    transition: 0.25s ease;\n                }\n\n                .tsrSecRotApplyBtn:hover,\n                .tsrSecRotRefreshBtn:hover {\n                    transform: translateY(-2px);\n                    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);\n                    color: white;\n                }\n\n                .tsrSecRotMetricCard {\n                    background: white;\n                    border-radius: 18px;\n                    padding: 22px;\n                    height: 100%;\n                    box-shadow: 0 4px 18px rgba(15, 23, 42, 0.06);\n                    transition: 0.25s ease;\n                }\n\n                .tsrSecRotMetricCard:hover {\n                    transform: translateY(-4px);\n                }\n\n                .tsrSecRotMetricTop {\n                    display: flex;\n                    justify-content: space-between;\n                    align-items: center;\n                    margin-bottom: 18px;\n                }\n\n                .tsrSecRotMetricIcon {\n                    width: 48px;\n                    height: 48px;\n                    /* width: 18px;\n                    height: 18px; */\n                    border-radius: 14px;\n                    background: #e8f1ff;\n                    color: #2563eb;\n                    display: flex;\n                    align-items: center;\n                    justify-content: center;\n                    font-size: 20px;\n                }\n\n                /* .tsrSecRotMetricIcon a {\n                    color:  unset;\n                } */\n\n                .tsrSecRotMetricIcon.negative {\n                    background: #ffe8e8;\n                    color: #dc2626;\n                }\n\n                .tsrSecRotMetricBadge {\n                    background: #dbeafe;\n                    color: #1d4ed8;\n                    padding: 5px 10px;\n                    border-radius: 50px;\n                    font-size: 11px;\n                    font-weight: 700;\n                }\n\n                .tsrSecRotMetricTitle {\n                    font-size: 13px;\n                    color: #64748b;\n                    margin-bottom: 8px;\n                }\n\n                .tsrSecRotMetricValue {\n                    font-size: 2rem;\n                    font-weight: 700;\n                    color: #0f172a;\n                }\n\n                .tsrSecRotMetricHighlight {\n                    font-size: 1.4rem;\n                    font-weight: 700;\n                }\n\n                .tsrSecRotMetricHighlight.positive {\n                    color: #059669;\n                }\n\n                .tsrSecRotMetricHighlight.negative {\n                    color: #dc2626;\n                }\n\n                .tsrSecRotMetricSubtext {\n                    margin-top: 8px;\n                    color: #64748b;\n                    font-size: 13px;\n                }\n\n                .tsrSecRotMetricChange {\n                    font-size: 14px;\n                    font-weight: 700;\n                    margin-top: 8px;\n                }\n\n                .tsrSecRotMetricChange.positive {\n                    color: #059669;\n                }\n\n                .tsrSecRotMetricChange.negative {\n                    color: #dc2626;\n                }\n\n                .tsrSecRotTableHeader {\n                    border: none;\n                    padding: 20px 24px;\n                    background: white;\n                    display: flex;\n                    justify-content: space-between;\n                    align-items: center;\n                }\n\n                .tsrSecRotTableExpandCollapseBadge {\n                    /* background: #dbeafe;\n                    color: #1d4ed8; */\n                    background-color: white;\n                    color: darkslategray;\n                    padding: 5px 10px;\n                    border-radius: 50px;\n                    font-size: 14px;\n                    font-weight: 700;\n                    transition: all 0.3s;\n                    cursor: pointer;\n                }\n\n                .tsrSecRotTableExpandCollapseBadge:hover {\n                    transform: scale(1.2);\n                }\n\n                .tsrSecRotTableHeader.outperform {\n                    border-bottom: 3px solid #10b981;\n\n                }\n\n                .tsrSecRotTableHeader.underperform {\n                    border-bottom: 3px solid #ef4444;\n                }\n\n                .tsrSecRotTableSubheader {\n                    font-size: 13px;\n                    color: #64748b;\n                }\n\n                .tsrSecRotTable th {\n                    color: #64748b;\n                    font-size: 13px;\n                    font-weight: 700;\n                    font-family: monospace;\n                    /* \n                    font-family: Arial, Helvetica, sans-serif;\n                    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;\n                    */\n                    /* border-bottom-width: 1px; */\n                    text-wrap: nowrap;\n                    border: 1px solid rgba(0, 0, 0, 0.08)\n                }\n\n                .tsrSecRotTable td {\n                    /* font-weight: 600; */\n                    font-size: 14px;\n                    /* font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; */\n                    text-wrap: nowrap;\n                    vertical-align: middle;\n                    padding-top: 8px;\n                    padding-bottom: 8px;\n\n                }\n\n                .tsrSecRotTable .positive {\n                    color: #059669;\n                }\n\n                .tsrSecRotTable .negative {\n                    color: #dc2626;\n                }\n\n                .tsrSecRotTrendBadge {\n                    padding: 6px 12px;\n                    border-radius: 50px;\n                    font-size: 12px;\n                    font-weight: 700;\n                }\n\n                .tsrSecRotTrendBadge.positive {\n                    background: #dcfce7;\n                    color: #15803d;\n                }\n\n                .tsrSecRotTrendBadge.negative {\n                    background: #fee2e2;\n                    color: #b91c1c;\n                }\n\n                @media (max-width: 768px) {\n\n                    .tsrSecRotTitle {\n                        font-size: 1.6rem;\n                    }\n\n                    .tsrSecRotMetricValue {\n                        font-size: 1.5rem;\n                    }\n\n                }\n\n\n                /* ==========================================================================\n                                                        TSR UI DOCK MATRIX LAYOUT SPECIFICATIONS\n                                                    ========================================================================== */\n\n                .tsrSectorRotationDetailsWorkspaceCard {\n                    background-color: #ffffff !important;\n                    border: 1px solid #e2e8f0 !important;\n                    border-radius: 12px !important;\n                }\n\n                .tsrSectorRotationCardHeaderTitle {\n                    color: #1e3a8a !important;\n                    /* Midnight Branding Accent */\n                    font-size: 1.35rem;\n                    letter-spacing: -0.2px;\n                }\n\n\n                .tsrSectorRotationMetricRow {\n                    display: flex;\n                    justify-content: space-between;\n                    align-items: center;\n                    padding: 0.72rem 1rem;\n                    border-bottom: 1px solid #f1f5f9;\n                }\n\n                .tsrSectorRotationMetricRow:hover {\n                    background-color: #f8fafc;\n                }\n\n                .tsrSecRotSectorDetailsSubText {\n                    font-size: 0.88rem;\n                    color: #475569;\n                    font-weight: 500;\n                }\n\n                .tsrSecRotSectorDetailsValue {\n                    font-size: 0.95rem;\n                    font-weight: 700;\n                }\n\n                /* Right Grid: Combined Card Modifications */\n                .tsrSectorRotationUnifiedTechCard {\n                    border-color: #e2e8f0 !important;\n                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02) !important;\n                }\n\n                /* Vertical Stacking Blocks Layout Adjustments */\n                .tsrSectorRotationRowCarouselBlock {\n                    background-color: #ffffff;\n                    padding: 0.25rem 0;\n                    width: 100%;\n                }\n\n                /* Single-Line Compact Slider Element Accents */\n                .tsrSectorRotationSliderSingleLine {\n                    display: flex;\n                    align-items: baseline;\n                    justify-content: space-between;\n                    background-color: #f8fafc;\n                    border: 1px solid #e2e8f0;\n                    padding: 0.45rem 0.65rem;\n                    border-radius: 6px;\n                    width: 100%;\n                }\n\n                .tsrSectorRotationSliderSingleLine span {\n                    font-size: 0.72rem;\n                    font-weight: 700;\n                    color: #64748b;\n                    text-transform: uppercase;\n                    letter-spacing: 0.1px;\n                }\n\n                .tsrSectorRotationSliderSingleLine strong {\n                    font-size: 0.92rem;\n                    font-weight: 800;\n                }\n\n                /* Owl Slider Micro Control Navigation Points */\n                .tsrSectorRotationOwlMetricsSlider .owl-dots {\n                    margin-top: 8px !important;\n                }\n\n                .tsrSectorRotationOwlMetricsSlider .owl-dot span {\n                    background: #e2e8f0 !important;\n                    width: 5px !important;\n                    height: 5px !important;\n                    margin: 3px !important;\n                }\n\n                .tsrSectorRotationOwlMetricsSlider .owl-dot.active span {\n                    background: #2563eb !important;\n                    width: 12px !important;\n                }\n\n                /* ==========================================================================\n                FIXED STOCKS SEGMENT CONTROLS PILL SPECIFICATION\n                ========================================================================== */\n\n                .tsrSectorRotationStockSegmentWrapper {\n                    display: flex;\n                    align-items: center;\n                }\n\n                .tsrSectorRotationStockSegmentWrapper .btn-group {\n                    background-color: #f1f5f9 !important;\n                    border: 1px solid #e2e8f0 !important;\n                    border-radius: 50px !important;\n                }\n\n                .tsrSectorRotationSegmentButton {\n                    border: 0 !important;\n                    color: #475569 !important;\n                    font-size: 0.78rem !important;\n                    font-weight: 700 !important;\n                    padding: 0.45rem 1.4rem !important;\n                    background: transparent !important;\n                    border-radius: 50px !important;\n                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n                }\n\n\n                @media only screen and (max-width: 768px){\n                    .tsrSectorRotationStockSegmentWrapper .btn-group {\n                        background-color: #f1f5f9 !important;\n                        border: 1px solid #e2e8f0 !important;\n                        border-radius: unset !important;\n                        flex-wrap: wrap;\n                    }\n\n                    .tsrSectorRotationSegmentButton {\n                                        border-radius: unset !important;\n                    }\n                }\n                .tsrSectorRotationSegmentButton:hover {\n                    color: #1e3a8a !important;\n                }\n\n                /* Dynamic slider background transition on active radio check overlay */\n                .btn-check:checked+.tsrSectorRotationSegmentButton {\n                    background-color: #ffffff !important;\n                    color: #2563eb !important;\n                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08) !important;\n                }\n\n                /* System DataTables Workspace Alignment Sync */\n                #tsrSecRotOutperformTable_wrapper,\n                #tsrSecRotUnderperformTable_wrapper {\n                    font-size: 12px;\n                }\n\n\n                .tsrSecRotStockSectionTitle {\n                    border-left: 3px solid #0d6efd;\n                    padding-left: 8px;\n                    letter-spacing: 0.5px;\n                    color: #515151;\n                    font-size: 0.8rem;\n                    text-transform: uppercase;\n                    font-weight: bold;\n                }\n\n                .tsrSecRotLabel {\n                    font-size: .875em;\n                    margin-bottom: .25rem !important;\n                    color: #6c757d !important;\n\n\n                }\n\n                /* TODO change later */\n                /* --- TRADITIONAL SELECT MENUS & INTERACTIVE GRID TABS --- \n                Unified properties applied across button types to maintain seamless sizing symmetry */\n                .tsrSecRotDropbtnIdx,\n                .tsrSecRotTabBtnIdx {\n                    background-color: #ffffff;\n                    /* color: #344054; */\n                    color: #64748b;\n                    padding: 10px 16px;\n                    font-size: 14px;\n                    font-weight: 600;\n                    border: 1px solid #d0d5dd;\n                    border-radius: 8px;\n                    cursor: pointer;\n                    display: inline-flex;\n                    align-items: center;\n                    justify-content: center;\n                    gap: 8px;\n                    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n                    outline: none;\n                    box-sizing: border-box;\n                    /* height: 42px; */\n                    /* Locks uniform heights across all options */\n                }\n\n                /* Custom indicator icon scale adjustments */\n                .tsrSecRotMs1 {\n                    font-size: 12px !important;\n                    color: #667085;\n                    transition: transform 0.2s ease;\n                }\n\n                /* Standard Hover States across Dropdowns & Stock Basket Tabs */\n                .tsrSecRotDdIdx:hover .tsrSecRotDropbtnIdx,\n                .tsrSecRotTabBtnIdx:hover {\n                    background-color: #f9fafb;\n                    border-color: #98a2b3;\n                    color: #101828;\n                }\n\n                /* Rotates indicator arrow dynamically on drop menu open states */\n                .tsrSecRotDdIdx:hover .tsrSecRotDropbtnIdx .tsrSecRotMs1 {\n                    transform: rotate(180deg);\n                    color: #101828;\n                }\n\n\n                /* Unified Label Formatting Styles */\n                .tsrSecRotControlLabel {\n                    font-size: 13px;\n                    font-weight: 600;\n                    color: #475467;\n                    text-transform: uppercase;\n                    letter-spacing: 0.02em;\n                    user-select: none;\n                    white-space: nowrap;\n                    /* position: absolute;\n                    top: -11px;\n                    left: 15px;\n                    background-color: white;\n                    padding: 3px; */\n                }\n\n\n                /* -- Technicals Tick Marker Note -- */\n                .tsrSecRotTickNote {\n                    font-size: 14px;\n                    font-weight: 700;\n                    color: var(--tsrSecRotNeutral);\n                    /* background-color: var(--tsrSecRotSurface); */\n                    background-color: white;\n                    border: 1px solid var(--tsrSecRotBorder);\n                    border-radius: var(--tsrSecRotRadiusSm);\n                    padding: 3px 8px;\n                    white-space: nowrap;\n                    letter-spacing: 0.02em;\n                }\n\n                .tsrSecRotTickAsterisk {\n                    color: var(--tsrSecRotNeg);\n                    margin-right: 1px;\n                }\n\n                /* ============== DATA TABLE BTNs ================ */\n                .tsrSecRotDtBtn {\n                    background-color: #64748b;\n                }\n\n    "
    }
}();
var defStk, json, jPlist = [], miSrn = function() {
    
    function isPrUser() {

        if (jsu.isNotNull(mtgv) && jsu.isNotNull(mtgv.mtpp) && jsu.isNotNull(mtgv.mtpp)) {
            premInit = true;
        } else {
            setTimeout(() => {
                console.log("new fn call")
                isPrUser();
            }, 500);
        }

        console.log("old fn call")
        if (premInit && mtgv.mtpp.pr) {
            return true;
        } else {
            return false;
        }
    }

    function a() {
        C.addCssToHead("tsrSecRotSettings", miSrnUtils.css);
        var h = I.value
          , d = H.value;
        miSrnUtils.pds("tsrSecRotDurationSelect", d);
        d = H.value;
        json = defStk = null;
        jPlist = [];
        var b = mintJsUtil.getBaseUrl() + "/static/img/LoadingMedium.gif"
          , r = document.getElementById("tsrSecRotBaseSectorSection");
        r.innerHTML = '\n                            <div style="width: 50px;">\n                                <img src="' + b + '" title="loading"></img>\n                            </div>  \n        ';
        document.getElementById("tsrSectRotSectCompareSection").innerHTML = "";
        document.getElementById("tsrSecRotSectorOverviewContainer").innerHTML = "";
        document.getElementById("tsrSecRotChartContainer").innerHTML = "";
        document.getElementById("tsrSecRotStockSectionPopup").innerHTML = "";
        window.miStkHl && miStkHl.cp("tsrSecRotStockSectionPopup");
        k() && ("industry" != h || "3m" != d ? miSrnUtils.slt(!0) : miSrnUtils.slt(!1),
        b = "",
        b = y.isNotNull(mintJsUtil.getRootUrl()) ? mintJsUtil.getRootUrl() + ("/djs?id=" + d + "&type=" + h + "&cat=SecRot&action=all") : "https://www.tsrbt1.com/rt/djs?id=" + d + "&type=" + h + "&cat=SecRot&action=all",
        h = h.toUpperCase(),
        d = d.toUpperCase(),
        miSrnUtils.gd(b).then(function(e) {
            D = e;
            x = y.cloneObj(D);
            if ("success" == x.statusCode) {
                for (var g = x.opSec, w = [], q = 0; q < g.length; q++) {
                    var v = g[q].opEqList.length + g[q].upEqList.length;
                    0 < g[q].mcChg && 0 < g[q].mcChgPc && 2 < v && w.push(g[q])
                }
                g = x.upSec;
                q = [];
                for (v = 0; v < g.length; v++) {
                    var t = g[v].opEqList.length + g[v].upEqList.length;
                    0 > g[v].mcChg && 0 > g[v].mcChgPc && 2 < t && q.push(g[v])
                }
                x.opSec = w;
                x.upSec = q;
                f();
                m()
            } else
                w = "",
                w = "redirected" == e.statusCode ? "Your free access is over. Redirecting you to login / Subscribe page" : ERROR_MSG,
                miSrnUtils.sem(w),
                "redirected" == e.statusCode && setTimeout(function() {
                    window.location.href = e.url
                }, 3E3)
        }).catch(function(e) {
            setTimeout(function() {
                miSrnUtils.sem(ERROR_MSG);
                console.log("Error: ", e.message)
            }, 3E3);
            r.innerHTML = ""
        }))
    }
    function f() {
        var h = document.getElementById("tsrSecRotBaseSectorSection");
        if (y.isNotNull(h) && y.isNotNull(x.NIFTY)) {
            var d = '   <div class="col-xl-3 col-md-6 mt-md-0 ">       <div class="tsrSecRotMetricCard">           <div class="tsrSecRotMetricTop">               <div class="tsrSecRotMetricIcon">                       <i class="fas fa-chart-line"></i>               </div>           </div>           <div class="tsrSecRotMetricTitle d-flex" style="gap: 10px;">               Benchmark           </div>           <div class="tsrSecRotMetricHighlight">               NIFTY           </div>            <div class="tsrSecRotMetricSubtext" >                <p style="margin-bottom: 0;">Market Cap Change:</p><p> <b>' + (miSrnUtils.gcv(x.NIFTY.mcChg, null, !0) + " | " + miSrnUtils.gcv(x.NIFTY.mcChgPc, null, "%") + "</b></p>");
            d += "            </div>       </div>   </div>";
            var b = y.cloneObj(x.opSec)
              , r = "-"
              , e = "-"
              , g = "";
            0 < b.length && (r = b[0].name,
            l("op") ? (e = "<p style='margin-bottom: 0;'>Relative Returns vs NIFTY:</p> <p style='margin-bottom: 0;'><b>" + miSrnUtils.gcv(b[0].vsNifty, null, "%") + "</b></p>",
            g = "miSrn.ssc('op', 0); miSrn.pc('op', '0', 'sectorList', '" + b[0].code + "', false, 'inline', false);") : (e = "<p style='margin-bottom: 0;'>Market Cap Change:</p><p><b>" + miSrnUtils.gcv(b[0].mcChg, null, "Cr.") + " | " + miSrnUtils.gcv(b[0].mcChgPc, null, "%") + "</b></p>",
            g = "miSrn.ssc('op', 0);"));
            d = d + '   <div class="col-xl-3 col-md-6 mt-md-0 ">        <div class="tsrSecRotMetricCard" style="cursor: pointer;" onclick="' + (g + '">            <div class="tsrSecRotMetricTop">                <div class="tsrSecRotMetricIcon">');
            d += '                    <i class="fas fa-bolt"></i>';
            d += "                </div>";
            d += "            </div>";
            d += '            <div class="tsrSecRotMetricTitle d-flex" style="gap: 10px;">';
            d += "                Strongest Sector";
            d += "            </div>";
            d += '            <div class="tsrSecRotMetricHighlight positive">';
            d += "                " + r;
            d += "            </div>";
            d += '            <div class="tsrSecRotMetricSubtext"  >';
            d += "                " + e;
            d += "            </div>";
            d += "        </div>";
            d += "   </div> ";
            r = y.cloneObj(x.upSec);
            var w = e = "-";
            g = "";
            0 < r.length && (e = r[0].name,
            l("up") ? (w = "<p style='margin-bottom: 0;'>Relative Returns vs NIFTY:</p> <p style='margin-bottom: 0;'><b>" + miSrnUtils.gcv(r[0].vsNifty, null, "%") + " </b></p>",
            g = "miSrn.ssc('up', 0); miSrn.pc('up', '0', 'sectorList', '" + r[0].code + "', false, 'inline', false);") : (w = "<p style='margin-bottom: 0;'>Market Cap Change:</p> <p><b>" + miSrnUtils.gcv(r[0].mcChg, null, "Cr.") + " | " + miSrnUtils.gcv(r[0].mcChgPc, null, "%") + "</b></p>",
            g = "miSrn.ssc('up', 0);"));
            d += '   <div class="col-xl-3 col-md-6 mt-md-0">';
            d += '        <div class="tsrSecRotMetricCard"  style="cursor: pointer;" onclick="' + g + '">            <div class="tsrSecRotMetricTop">                <div class="tsrSecRotMetricIcon" style="color: #ff4d4d; background-color: #ffe8e8;">';
            d += '                       <i class="fas fa-bolt"></i>';
            d += "                </div>";
            d += "            </div>";
            d += '            <div class="tsrSecRotMetricTitle d-flex" style="gap: 10px;">';
            d += "                Weakest Sector";
            d += "            </div>";
            d += '            <div class="tsrSecRotMetricHighlight negative">';
            d += "                " + e;
            d += "            </div>";
            d += '            <div class="tsrSecRotMetricSubtext"  >';
            d += "                " + w;
            d += "            </div>";
            d += "        </div>";
            d += "   </div> ";
            d += '   <div class="col-xl-3 col-md-6 mt-md-0">';
            d += '       <div class="tsrSecRotMetricCard">';
            d += '           <div class="tsrSecRotMetricTop">';
            d += '               <div class="tsrSecRotMetricIcon">';
            d += '                   <i class="fas fa-layer-group"></i>';
            d += "               </div>";
            d += "           </div>";
            d += '           <div class="tsrSecRotMetricTitle d-flex" style="gap: 10px;">';
            d += "               Sector Performance";
            d += "           </div>";
            d += '           <div class="d-flex flex-column flex-xxl-row" style="gap: 10px; height: 55%;">';
            d += '               <div class="h-100 d-flex flex-column">';
            d += '                   <p style="margin-bottom: 0; font-size: 14px; text-wrap: nowrap;">';
            d += '                       <span style="color: #64748b;">Outperforming</span>';
            d += '                       <i class="fas fa-arrow-up me-2" style="color: green;"></i>';
            d += "                   </p>";
            d += '                   <h3 class="mb-1 mb-md-0 mt-0 mt-xxl-2" style="color: #059669;">';
            d += "                       " + b.length;
            d += "                   </h3>";
            d += "               </div>";
            d += '               <div class="h-100 d-flex flex-column">';
            d += '                   <p style="margin-bottom: 0; font-size: 14px; text-wrap: nowrap;">';
            d += '                       <span style="color: #64748b;">Underperforming</span>';
            d += '                       <i class="fas fa-arrow-down me-2" style="color: #dc2626;"></i>';
            d += "                   </p>";
            d += '                   <h3 class="mb-1 mb-md-0 mt-0 mt-xxl-2" style="color: #dc2626;">';
            d += "                       " + r.length;
            d += "                   </h3>";
            d += "               </div>";
            d += "           </div>";
            d += "       </div>";
            d += "   </div>";
            h.innerHTML = d
        }
    }
    function m() {
        var h = document.getElementById("tsrSectRotSectCompareSection");
        isIdxBased = l("op");
        var d = '       <div id="tsrSecRotOpSectorsWrapper" class="col-xl-6">           <div class="card tsrSecRotTableCard">                 <div class="card-header tsrSecRotTableHeader outperform" style="background-color: #e4f7ee;">                     <div>                         <h6 class="mb-1">                             <i class="fas fa-arrow-up me-2" style="color: green;"></i>                             Outperforming Sectors                         </h6>                         <div class="tsrSecRotTableSubheader">                             Sectors outperforming benchmark                         </div>                     </div>                     <div class="tsrSecRotTableExpandCollapseBadge d-none d-xl-block"                         onclick="miSrnUtils.esct(this, \'tsrSecRotOpSectorsWrapper\');">                         <span class="fw-medium me-2">Show more</span>                         <i class="fas fa-expand"></i>                     </div>                 </div>                 <div class="card-body">                     <div id="tsrSecRotOpSectorTable" class="table-responsive">                     </div>';
        var b = y.cloneObj(x.opSec);
        isIdxBased && 0 < b.length && (d += '               <div class="border border-1 mt-4 p-3 d-flex flex-column flex-sm-row align-items-baseline" style="gap: 10px; border-radius: 10px;">                  \n                                        <p style="margin-bottom: 0; text-transform: uppercase;letter-spacing: 1px;font-size: 15px;font-weight: bold;color: #64748b; ">\n                                            Compare Sectorial Indices on Chart\n                                        </p>                   \n                                        <div class="d-flex" style="gap: 10px;">                    \n                                            <a class="tsrSecRotTabBtnIdx" style="cursor:pointer; padding: 5px 16px; box-shadow: 1px 1px 4px grey; background-color: white;" onclick="miSrn.pc(\'op\', 0, \'sectorList\', \'\', true, \'inline\', true);" oncontextmenu="return false;"> \n                                                <span class="fas fa-chart-line"></span> Inline \n                                            </a>         \n                                            <a class="tsrSecRotTabBtnIdx" style="cursor:pointer;  padding: 5px 16px; box-shadow: 1px 1px 4px grey; background-color: white;" onclick="miSrn.pc(\'op\', 0, \'sectorList\', \'\', true, \'tile\', true);" oncontextmenu="return false;">\n                                                <span class="fas fa-chart-line"></span> Tile  \n                                            </a>       \n                                        </div>   \n                                    </div>');
        d += '                 </div>             </div>         </div>       <div id="tsrSecRotUpSectorsWrapper" class="col-xl-6">           <div class="card tsrSecRotTableCard">               <div class="card-header tsrSecRotTableHeader underperform"  style="background-color: #ffe3e6;">                   <div>                       <h6 class="mb-1">                           <i class="fas fa-arrow-down me-2" style="color: red;"></i>                           Underperforming Sectors                       </h6>                       <div class="tsrSecRotTableSubheader">                           Sectors lagging benchmark                       </div>                   </div>                   <div class="tsrSecRotTableExpandCollapseBadge d-none d-xl-block"                       onclick="miSrnUtils.esct(this, \'tsrSecRotUpSectorsWrapper\');">                       <span class="fw-medium me-2">Show more</span>                       <i class="fas fa-expand"></i>                   </div>               </div>               <div class="card-body">                   <div id="tsrSecRotUpSectorTable"  class="table-responsive">                   </div>';
        b = y.cloneObj(x.upSec);
        isIdxBased && 0 < b.length && (d += '               <div class="border border-1 mt-4 p-3 d-flex flex-column flex-sm-row align-items-baseline" style="gap: 10px;  border-radius: 10px;">                  \n                                        <p style="margin-bottom: 0; text-transform: uppercase;letter-spacing: 1px;font-size: 15px;font-weight: bold;color: #64748b;">\n                                            Compare Sectorial Indices on Chart\n                                        </p>                   \n                                        <div class="d-flex" style="gap: 10px;">                    \n                                            <a class="tsrSecRotTabBtnIdx" style="cursor:pointer; padding: 5px 16px; box-shadow: 1px 1px 4px grey; background-color: white;" onclick="miSrn.pc(\'up\', 0, \'sectorList\', \'\', true, \'inline\', true);" oncontextmenu="return false;"> \n                                                <span class="fas fa-chart-line"></span> Inline \n                                            </a>         \n                                            <a class="tsrSecRotTabBtnIdx" style="cursor:pointer;  padding: 5px 16px; box-shadow: 1px 1px 4px grey; background-color: white;" onclick="miSrn.pc(\'up\', 0, \'sectorList\', \'\', true, \'tile\', true);" oncontextmenu="return false;">\n                                                <span class="fas fa-chart-line"></span> Tile  \n                                            </a>       \n                                        </div>   \n                                    </div>');
        h.innerHTML = d + "               </div>           </div>       </div>";
        p("tsrSecRotOpSectorTable", "op");
        p("tsrSecRotUpSectorTable", "up")
    }
    function p(h, d) {
        h = document.getElementById(h);
        var b = "";
        if ("op" == d) {
            var r = x.opSec;
            var e = "tsrSecRotOutperformTable"
        } else
            r = x.upSec,
            e = "tsrSecRotUnderperformTable";
        var g = l("op");
        b += '<table class="table align-middle tsrSecRotTable" id="' + e + '">   <thead>       <tr>';
        b += "           <th></th>";
        b += "           <th></th>";
        b += "           <th></th>";
        g && (b += "       <th></th>");
        b += '           <th colspan="2">Market Cap</th>';
        g && (b += "       <th></th>");
        b += '           <th colspan="2">Stock Performance</th>';
        b = g ? b + '           <th colspan="6">Sectorial Index <span style="font-size: 10px;">(Technicals)</span></th>' : b + '           <th colspan="9">Sector Summary <span style="font-size: 10px;">(Technicals)<span></th>';
        b += "       </tr>";
        b += "       <tr>";
        b += "           <th>Rank</th>";
        b += "           <th>Sector</th>";
        b += "           <th></th>";
        g && (b += "       <th>Returns vs NIFTY</th>");
        b += "           <th>Change (%)</th>";
        b += "           <th>Change (in Cr.)</th>";
        g && (b += "           <th>Period Returns (%)</th>");
        b += "           <th>Leading</th>";
        b += "           <th>Lagging</th>";
        g ? (b += "       <th>EMA " + x.ma1 + "</th>",
        b += "       <th>EMA " + x.ma2 + "</th>",
        b += "       <th>RSI</th>",
        b += "       <th>MACD</th>",
        b += "       <th>Signal</th>",
        b += "       <th>ST</th>") : (b += "       <th>Tech Strength</th>",
        b += "       <th>PE</th>",
        b += "       <th>PB</th>",
        b += "       <th>ROA</th>",
        b += "       <th>ROE</th>",
        b += "       <th>Cash Ratio</th>",
        b += "       <th>Debt to Equity</th>");
        b += "       </tr>";
        b += "   </thead>";
        b += "   <tbody>";
        if (0 == r.length)
            b += "<tr>",
            b += '   <td colspan = "13" class="text-center">',
            b += "       <b>No records</b>",
            b += "   </td>",
            b += "</tr> ";
        else
            for (var w = 0; w < r.length; w++) {
                var q = r[w];
                b += "       <tr>";
                b += "           <td><b>" + (w + 1) + "</b></td>";
                b = g ? b + ("           <td><b>" + q.name + "<b></td>") : b + ("           <td><b>" + q.sname + "<b></td>");
                var v = g ? "miSrn.ssc('" + d + "', " + w + "); miSrn.pc('" + d + "', '" + w + "', 'sectorList', '" + q.code + "', false, 'inline', false);" : "miSrn.ssc('" + d + "', " + w + ");";
                b += "           <td>";
                b += '               <button class="btn btn-sm btn-outline-primary"';
                b += '                   style="font-size: 12px;" onclick="' + v + '">';
                b += "                   View";
                b += '                   <i class="fas fa-arrow-down"></i>';
                b += "               </button>";
                b += "           </td>";
                g && (b += "           <td><b>" + miSrnUtils.gcv(q.vsNifty, null, "%") + "<b></td>");
                b += "           <td><b>" + miSrnUtils.gcv(q.mcChgPc, null, "%") + "</b></td>";
                b += "           <td>" + miSrnUtils.grv(q.mcChg) + "</td>";
                g && (b += "           <td>" + miSrnUtils.gcv(q.periodReturn, "black", "%") + "</td>");
                b += "           <td>" + q.opEq + "</td>";
                b += "           <td>" + q.upEq + "</td>";
                g ? (q = q.idxVals,
                b += "           <td>" + miSrnUtils.grv(q.ma1) + "</td>",
                b += "           <td>" + miSrnUtils.grv(q.ma2) + "</td>",
                b += "           <td>" + miSrnUtils.grv(q.rsi) + "</td>",
                b += "           <td>" + miSrnUtils.grv(q.macd) + "</td>",
                b += "           <td>" + miSrnUtils.grv(q.signal) + "</td>",
                b += "           <td>" + miSrnUtils.grv(q.st) + "</td>") : (q = q.tsrStr,
                b += '           <td><span style="color: ' + q.techClr + ';">' + miSrnUtils.grv(q.techStr) + "</span></td>",
                b += "           <td>" + miSrnUtils.grv(q.pe) + "</td>",
                b += "           <td>" + miSrnUtils.grv(q.pb) + "</td>",
                b += "           <td>" + miSrnUtils.grv(100 * q.roa) + "</td>",
                b += "           <td>" + miSrnUtils.grv(100 * q.roe) + "</td>",
                b += "           <td>" + miSrnUtils.grv(q.cashRatio) + "</td>",
                b += "           <td>" + miSrnUtils.grv(q.dtToEq) + "</td>");
                b += "       </tr>"
            }
        b += "   </tbody>";
        b += "</table>";
        h.innerHTML = b;
        isMobile() || miSrnUtils.mdt(e, {
            paging: !1,
            info: !1,
            ordering: !1,
            responsive: !0,
            scrollCollapse: !1,
            scrollY: 250,
            scrollX: !0,
            dom: "Bfrtip",
            buttons: [{
                extend: "copy",
                className: "btn btn-sm tsrSecRotDtBtn ms-2    mt-1",
                text: " Copy"
            }, {
                extend: "csv",
                className: "btn  btn-sm tsrSecRotDtBtn ms-2    mt-1",
                text: " CSV"
            }, {
                extend: "excel",
                className: "btn  btn-sm tsrSecRotDtBtn ms-2     mt-1",
                text: " Excel"
            }, {
                extend: "print",
                className: "btn  btn-sm tsrSecRotDtBtn ms-1    mt-1",
                text: " Print"
            }],
            fixedColumns: {
                leftColumns: 2
            }
        })
    }
    function n(h, d, b, r, e) {
        var g = [].concat($jscomp.arrayFromIterable(x[h + "Sec"]))[b]
          , w = ""
          , q = {
            info: !1,
            paging: !1,
            ordering: !0,
            responsive: !0,
            scrollY: 250,
            scrollX: !0,
            scrollCollapse: !0,
            dom: "Bfrtip",
            buttons: [{
                extend: "copy",
                className: "btn btn-sm  tsrSecRotDtBtn ms-2 mt-1",
                text: " Copy"
            }, {
                extend: "csv",
                className: "btn  btn-sm tsrSecRotDtBtn ms-2 mt-1",
                text: " CSV"
            }, {
                extend: "excel",
                className: "btn  btn-sm tsrSecRotDtBtn ms-2 mt-1",
                text: " Excel"
            }, {
                extend: "print",
                className: "btn  btn-sm tsrSecRotDtBtn ms-1 mt-1",
                text: " Print"
            }],
            fixedColumns: {
                leftColumns: 1
            }
        };
        r = mintJsUtil.getBaseUrl() + "/static/img/LoadingMedium.gif";
        w += '                       <div style="width: 50px;">';
        w += '                           <img src="' + r + '" title="loading"></img>';
        w += "                       </div>";
        var v = document.getElementById("tsrSecRotStockComparisonTableContainer" + b);
        v.innerHTML = w;
        w = "";
        if (k()) {
            r = I.value;
            e = H.value;
            var t = "";
            t = y.isNotNull(mintJsUtil.getRootUrl()) ? mintJsUtil.getRootUrl() + ("/djs?id=" + e + "&type=" + r + "&cat=SecRot&action=one&code=" + g.uriCode) : "https://www.tsrbt1.com/rt/djs?id=" + (e + "&type=" + r + "&cat=SecRot&action=one&code=" + g.uriCode);
            r = r.toUpperCase();
            e = e.toUpperCase();
            g.uriCode.toUpperCase();
            miSrnUtils.gd(t).then(function(B) {
                E = B;
                E.secType = h;
                E.secId = b;
                if ("success" == E.statusCode)
                    w = z(g, h, d, b),
                    v.innerHTML = w,
                    0 != E[d + "List"].length && miSrnUtils.mdt("tsrSecRotStockComparisonTable" + b, q);
                else {
                    var F = "";
                    F = "redirected" == B.statusCode ? "Your free access is over. Redirecting you to login / Subscribe page" : ERROR_MSG;
                    miSrnUtils.sem(F);
                    "redirected" == B.statusCode && setTimeout(function() {
                        window.location.href = B.url
                    }, 3E3)
                }
            }).catch(function(B) {
                miSrnUtils.sem(ERROR_MSG)
            })
        }
    }
    function z(h, d, b, r) {
        var e = '               <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-3">                   <div class="tsrSectorRotationStockSegmentWrapper">                       <b class="me-3">STOCKS</b>                       <div class="btn-group p-1 bg-light border rounded-pill" role="group" aria-label="Stock Performance View Filter">';
        e = ("opEq" == b ? e + ('               <input type="radio" class="btn-check" name="sector' + r + 'Stocks" id="outPerformingStocks' + r + '" autocomplete="off" checked>') : e + ('               <input type="radio" class="btn-check" name="sector' + r + 'Stocks" id="outPerformingStocks' + r + '" autocomplete="off">')) + ('                           <label class="btn btn-sm px-4 rounded-pill fw-bold text-uppercase tsrSectorRotationSegmentButton" for="tsrViewOutperforming" onclick="miSrn.ec(); miSrn.psts(\'' + d + "','opEq', " + r + ', true, true);">                               Outperforming');
        e += "                           </label>";
        e = ("upEq" == b ? e + ('               <input type="radio" class="btn-check" name="sector' + r + 'Stocks" id="underPerformingStocks' + r + '" autocomplete="off" checked>') : e + ('               <input type="radio" class="btn-check" name="sector' + r + 'Stocks" id="underPerformingStocks' + r + '" autocomplete="off">')) + ('                           <label class="btn btn-sm px-4 rounded-pill fw-bold text-uppercase tsrSectorRotationSegmentButton" for="tsrViewUnderperforming"  onclick="miSrn.ec(); miSrn.psts(\'' + d + "','upEq', " + r + ', true, true);">                               Underperforming');
        e += "                           </label>";
        e += "                       </div>";
        e += "                   </div>";
        e += '\n            <div class="tsrSecRotTickNote">\n                        <span class="tsrSecRotTickAsterisk">*</span> Values based on ' + x.displayFreq + " Tick\n                    </div>\n        ";
        e += "               </div>";
        var g = ["Code", "", "Price", "Price Chg %", "vs Nifty %", "Period Return %", "Tech Strength %", "EMA " + x.ma1, "EMA " + x.ma2, "RSI", "MACD", "Signal", "ST", "Chart"]
          , w = !1;
        y.isNotNull(h.secIdx) && h.secIdx && (w = !0,
        g.splice(4, 0, "vs " + h.name));
        e += '                  <div class="table-responsive ">';
        e += '                       <table id="tsrSecRotStockComparisonTable' + r + '" class="table align-middle tsrSecRotTable w-100">';
        e += "                           <thead>";
        e += "                               <tr>";
        for (h = 0; h < g.length; h++)
            e += '                                   <th scope="col">' + g[h] + "</th>";
        e += "                               </tr>";
        e += "                           </thead>";
        e += "                           <tbody>";
        h = E[b + "List"];
        if (0 == h.length)
            e += "<tr>",
            e += '   <td colspan="' + g.length + '"  class="text-center">',
            e += "       No records",
            e += "   </td>",
            e += "</tr>";
        else
            for (g = 0; g < h.length; g++) {
                e += "<tr>";
                e += '   <td><b title="' + h[g].name + '">' + h[g].code + "</b></td>";
                var q = "miSrn.pss('" + d + "', '" + b + "', " + r + ", '" + h[g].code + "', true);  \n                                miSrn.pc('" + d + "', " + r + ", '" + b + "List', '" + h[g].code + "', false, 'inline', false);";
                e += "   <td>";
                e += '       <button class="btn btn-sm btn-outline-primary" style="font-size: 12px;" onclick="' + q + '">';
                e += "           View";
                e += "       </button>";
                e += "   </td>";
                e += "   <td>" + miSrnUtils.grv(h[g].price) + "</td>";
                e += "   <td><b>" + miSrnUtils.gcv(h[g].priceChange) + "</b></td>";
                e += "   <td><b>" + miSrnUtils.gcv(h[g].vsNifty) + "</b></td>";
                w && (e += "   <td>" + miSrnUtils.grv(h[g].vsIdx) + "</td>");
                e += "   <td><b>" + miSrnUtils.gcv(h[g].periodReturn) + "</b></td>";
                e += "   <td>" + miSrnUtils.grv(100 * h[g].techStrength) + "</td>";
                e += "   <td>" + miSrnUtils.grv(h[g].eqVals.ma1) + "</td>";
                e += "   <td>" + miSrnUtils.grv(h[g].eqVals.ma2) + "</td>";
                e += "   <td>" + miSrnUtils.grv(h[g].eqVals.rsi) + "</td>";
                e += "   <td>" + miSrnUtils.grv(h[g].eqVals.macd) + "</td>";
                e += "   <td>" + miSrnUtils.grv(h[g].eqVals.signal) + "</td>";
                e += "   <td>" + miSrnUtils.grv(h[g].eqVals.st) + "</td>";
                e += "   <td>";
                e += '       <a style="cursor: pointer;" onclick="miSrn.pc(\'' + d + "', " + r + ", '" + b + "List', '" + h[g].code + "', false, 'inline', true); \">";
                e += '           <i style="color:grey; font-size:12pt;" class="fa fa-chart-line">';
                e += "           </i>";
                e += "       </a>";
                e += "   </td>";
                e += "</tr>"
            }
        e += "                           </tbody>";
        e += "                       </table>";
        e += "                   </div>";
        0 < h.length && (e += '   <div class="border border-1 mt-4 p-3 d-flex flex-column flex-sm-row align-items-baseline" style="gap: 10px; border-radius: 10px;">',
        e += '       <p style="margin-bottom: 0; text-transform: uppercase;letter-spacing: 1px;font-size: 13px;font-weight: bold;color: #64748b;">Compare Stocks on Chart</p>',
        e += '       <div class="d-flex" style="gap: 10px;">',
        e = e + ('           <a class="tsrSecRotTabBtnIdx" style="cursor:pointer; padding: 5px 16px; box-shadow: 1px 1px 4px grey; background-color: white;" onclick="miSrn.pc(\'' + d + "', " + r + ", '" + b + 'List\', \'\', true, \'inline\', true);" oncontextmenu="return false;"> <span class="fas fa-chart-line"></span> Inline </a>           <a class="tsrSecRotTabBtnIdx" style="cursor:pointer;  padding: 5px 16px;  box-shadow: 1px 1px 4px grey; background-color: white;" onclick="miSrn.pc(\'') + (d + "', " + r + ", '" + b + "List', '', true, 'tile', true);\" oncontextmenu=\"return false;\">  <span class=\"fas fa-chart-line\"></span> Tile  </a>       </div>   </div>"));
        return e
    }
    function c(h, d, b, r, e, g, w) {
        d = [].concat($jscomp.arrayFromIterable(x[d + "Sec"]));
        h = "sectorList" == b ? d : h[b];
        d = mintJsUtil.getBaseUrl() + "/static/img/LoadingMedium.gif";
        if (!(0 >= h.length)) {
            var q = document.getElementById("tsrSecRotChartContainer");
            q.style.display = "block";
            var v = '<div class="card p-3">';
            v = ("sectorList" == b ? v + '\n                    <div class="mb-3">\n                        <b>SECTOR CHART</b>\n                    </div>' : v + '\n                    <div class="mb-3">\n                        <b>STOCK CHART</b>\n                    </div>') + ("\n\n\n            <div id='Html5'>\n\n                <div id='chartPanel' class=\"chartPanel\">\n\n                    <div id=\"chartFocus\" style=\"margin:1px ; padding:1px; height:1px;width:1px\" tabindex='1'></div>\n\n                    <div id='NewChartSettingDiv' class='ch_root_sel_indi miCtrl'></div>\n\n                    <div id='chSettingsPopup' class='ch_settings_popup miCtrl'></div>\n\n\n                    <div id='chartControls'></div>\n\n                    <div id='chartLoading'></div>\n\n                    <div id='chartFeedBack' style='text-align:center'></div>\n\n                    <div id='panel' align='center'>\n\n                    </div>\n\n                    <div id='selectedValues' align='center'\n                        style='padding:0px;margin:3px; font-size: 8pt;height:12px; white-space:nowrap '> </div>\n\n                    <div id='settingsDiv' style='padding:0px;margin:0px;'> </div>\n\n                    <div id='chartWrap'>\n\n                        <div id='tsrchart' style=\"font-size:10px;width:100%\">\n                            <div style=\"height: 50px; width: 50px;\">\n                                <img src=\"" + d + '" title="loading"></img>\n                            </div>    \n                        </div>\n\n                    </div>\n\n\n                    <div id="chart_dialog" class="cc_dialog miCtrl">\n\n\n                    </div>\n\n                    <div id=\'imgDiv\'> </div>\n\n                </div>\n\n            </div>\n         </div>');
            q.innerHTML = v;
            w && C.focusToDiv("tsrSecRotChartContainer");
            json = {
                freq: x.cf,
                cf: x.cf,
                period: x.cp
            };
            if (1 == e) {
                G = x.NIFTY;
                defStk = {
                    name: G.name,
                    code: G.code,
                    scId: G.scId,
                    ecId: G.ecId
                };
                myTsrChartInit.init(defStk, json, g);
                jPlist = [{
                    id: "tp"
                }];
                y.isNotNull(J.secIdx) && J.secIdx && jPlist.push(J);
                for (b = 0; b < h.length && !(5 < b); b++)
                    jPlist.push(h[b]);
                ptia.ca(g, "ignore")
            } else
                b = "NIFTY" == r ? x.NIFTY : mintJsUtil.getObjFrmArrByField(h, "code", r),
                defStk = {
                    id: b.id,
                    name: b.name,
                    code: b.code,
                    scId: b.scId,
                    ecId: b.ecId
                },
                myTsrChartInit.init(defStk, json, g)
        }
    }
    function k() {
        return y.isNotNull(I) && y.isNotNull(H)
    }
    function l(h) {
        h = "op" == h ? x.opSec : x.upSec;
        for (var d = 0; d < h.length; d++)
            if (h[d].secIdx)
                return !0;
        return !1
    }
    function u() {
        var h = document.getElementById("tsrSecRotChartContainer");
        y.isNotNull(h) && (h.innerHTML = "",
        h.classList.remove("card"))
    }
    function A(h) {
        var d = {
            loop: !1,
            margin: 10,
            dots: !1,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                1E3: {
                    items: 3
                },
                1400: {
                    items: 4
                }
            }
        };
        h && ($("#tsrSecRotSectorMenuCarousal").owlCarousel(d),
        $(".tsrSecRotSectorMenuCarousalPrev").click(function() {
            $("#tsrSecRotSectorMenuCarousal").trigger("prev.owl.carousel", [300])
        }),
        $(".tsrSecRotSectorMenuCarousalNext").click(function() {
            $("#tsrSecRotSectorMenuCarousal").trigger("next.owl.carousel", [300])
        }));
        d = {
            loop: !1,
            dots: !1,
            nav: !1,
            mouseDrag: !1,
            touchDrag: !1,
            responsive: {
                0: {
                    items: 1
                }
            },
            smartSpeed: 0
        };
        h && ($("#sectorCardsCarousal").owlCarousel(d),
        $(".sectorCardsCarousalPrev").click(function() {
            $("#sectorCardsCarousal").trigger("prev.owl.carousel", [300]);
            u()
        }),
        $(".sectorCardsCarousalNext").click(function() {
            $("#sectorCardsCarousal").trigger("next.owl.carousel", [300]);
            u()
        }));
        $(".periodicReturns").owlCarousel({
            margin: 10,
            dots: !0,
            nav: !1,
            responsive: {
                0: {
                    items: 1
                },
                500: {
                    items: 2
                },
                1E3: {
                    items: 3
                },
                1400: {
                    items: 4
                }
            }
        });
        $(".periodicReturns").on("mousedown", ".owl-stage", function(b) {
            b.preventDefault();
            b.stopPropagation()
        });
        $(".periodicReturns").on("drag.owl.carousel", function(b) {
            b.preventDefault();
            b.stopPropagation()
        });
        $(".periodicReturns").on("dragged.owl.carousel", function(b) {
            b.preventDefault();
            b.stopPropagation()
        });
        $(".periodicReturns").on("touchstart", ".owl-stage", function(b) {
            b.preventDefault();
            event.stopPropagation()
        });
        h = {
            margin: 10,
            dots: !0,
            nav: !1,
            responsive: {
                0: {
                    items: 1
                },
                500: {
                    items: 2
                },
                1E3: {
                    items: 3
                },
                1400: {
                    items: 4
                }
            }
        };
        $(".technicals").owlCarousel(h);
        $(".technicals").on("mousedown", ".owl-stage", function(b) {
            b.preventDefault();
            b.stopPropagation()
        });
        $(".technicals").on("drag.owl.carousel", function(b) {
            b.preventDefault();
            b.stopPropagation()
        });
        $(".technicals").on("dragged.owl.carousel", function(b) {
            b.preventDefault();
            b.stopPropagation()
        });
        $(".technicals").on("touchstart", ".owl-stage", function(b) {
            b.preventDefault();
            event.stopPropagation()
        });
        $(".tsrStrengthIndex").owlCarousel(h);
        $(".tsrStrengthIndex").on("mousedown", ".owl-stage", function(b) {
            b.preventDefault();
            b.stopPropagation()
        });
        $(".tsrStrengthIndex").on("drag.owl.carousel", function(b) {
            b.preventDefault();
            b.stopPropagation()
        });
        $(".tsrStrengthIndex").on("dragged.owl.carousel", function(b) {
            b.preventDefault();
            b.stopPropagation()
        });
        $(".tsrStrengthIndex").on("touchstart", ".owl-stage", function(b) {
            b.preventDefault();
            event.stopPropagation()
        })
    }
    var C = mintHtmlUtil, y = mintJsUtil, D, x, G, E, J, K = {}, I = document.getElementById("tsrSecRotTypeSelect"), H = document.getElementById("tsrSecRotDurationSelect");
    a();
    return {
        init: a,
        isPrUser: isPrUser,
        ssc: function(h, d) {
            var b = document.getElementById("tsrSecRotSectorOverviewContainer")
              , r = x[h + "Sec"];
            var e = '<div id="tsrSecRotSectorMenuContainer" style="display: flex;" class="owl-nav align-items-center justify-content-center my-3">   <button type="button" role="presentation" class="owl-prev btn tsrSecRotSectorMenuCarousalPrev">       <span aria-label="Previous">           <i class="fas fa-angle-left"></i>       </span>   </button>   <div id="tsrSecRotSectorMenuCarousal" class="w-75 owl-carousel owl-theme">';
            for (var g = 0; g < r.length; g++)
                e += '   <div class="item p-2">',
                e += '       <a href="#' + g + '" onclick="miSrn.ec(); miSrn.psts(\'' + h + "','opEq', " + g + ', true, true);">',
                e += '           <div class="card flex-row justify-content-around shadow-sm p-2">',
                e += '               <span style="font-weight: 500;">',
                e += r[g].name,
                e += "               </span>",
                e += '               <span style="color: midnightblue; white-space: nowrap;">',
                e = 0 == g ? e + "               1 <sup> st</sup>" : 1 == g ? e + "               2 <sup> nd</sup>" : 2 == g ? e + "               3 <sup> rd</sup>" : e + ("               " + (g + 1) + " <sup>th</sup>"),
                e += "               </span>",
                e += "           </div>",
                e += "       </a>",
                e += "   </div>";
            e += '   </div>   <button type = "button" role = "presentation" class="owl-next btn tsrSecRotSectorMenuCarousalNext">       <span aria-label="Next">           <i class="fas fa-angle-right"></i>       </span>   </button></div><div id="sectorCardsCarousal" class="owl-carousel owl-theme mx-auto">';
            for (g = 0; g < r.length; g++) {
                var w = h
                  , q = r
                  , v = g;
                var t = '       <div class="tsrSecRotSectOvrvwSection border-0 p-3" data-hash="' + v + '">            <div class="card shadow-sm tsrSectorRotationDetailsWorkspaceCard">';
                t += '                <div class="card-header p-3 border-bottom" style="background-color: ' + ("op" == w ? "#e4f7ee" : "#ffe3e6") + ';">';
                t += '                    <div class="d-flex justify-content-between align-items-center">';
                0 != v && (t += '                   <div style="cursor: pointer; white-space: nowrap;" class="btn btn-sm sectorCardsCarousalPrev  text-black" onclick="miSrn.psts(\'' + w + "','opEq', " + (v - 1) + ', true, true);">                       <i class="fas fa-arrow-left"></i>',
                t += '                       <span class="d-none d-md-inline">',
                t += "                           &nbsp;",
                t += "                           Prev",
                t += "                       </span>",
                t += "                   </div>");
                t += '                       <h5 class="card-title text-center" style="font-weight: 600;">';
                t += '                           <p style="margin: 0;">';
                t += q[v].name;
                t += '                               <b class="d-none d-sm-inline">';
                t = 0 == v ? t + '                               <sup style="color: gray;"> 1 <sup>st</sup></sup>' : 1 == v ? t + '                               <sup style="color: gray;"> 2 <sup>nd</sup></sup>' : 2 == v ? t + '                               <sup style="color: gray;"> 3 <sup>rd</sup></sup>' : t + ('                               <sup style="color: gray;">' + (v + 1) + " <sup>th</sup></sup>");
                t += "                               </b>";
                t += "                           </p>";
                t += "                       </h5>";
                var B = mintJsUtil.getRootUrl() + "/Screener/Markets/" + q[v].url;
                "sector" == C.getInputVal("tsrSecRotTypeSelect") && (B += "/All");
                t += '                               <a href="' + B + '" target="_blank" class="tsrSecRotTabBtnIdx d-none d-md-block">';
                t += "                                   " + q[v].id + " Deep Dive";
                t += '                                   <i class="fas fa-external-link-square-alt"></i>';
                t += "                               </a>";
                v != q.length - 1 && (t += '                   <div style="cursor: pointer; white-space: nowrap;" class="btn btn-sm sectorCardsCarousalNext text-black" onclick="miSrn.psts(\'' + w + "','opEq', " + (v + 1) + ', true, true);">                       <span class="d-none d-md-inline ">',
                t += "                           Next",
                t += "                           &nbsp;",
                t += "                       </span>",
                t += '                       <i class="fas fa-arrow-right"></i>',
                t += "                   </div>");
                t += "                   </div>";
                t += '                       <div class="mt-2  d-flex d-md-none">';
                t += '                               <a href="' + B + '" target="_blank" class="tsrSecRotTabBtnIdx mx-auto" style="width: max-content;" >';
                t += "                                   " + q[v].id + " Deep Dive ";
                t += '                                   <i class="fas fa-external-link-square-alt"></i>';
                t += "                               </a>";
                t += "                       </div>";
                t += "               </div>";
                t += '                <div class="card-body p-4">';
                t += '                   <div id="tsrSecRotStockComparisonTableContainer' + v + '" class="tsrSecRotStockComparisonTableContainer row" >';
                t += "                   </div>";
                t += "                </div>";
                t += "            </div>";
                t += "        </div>";
                y.isNotNull(q[v].secIdx) && q[v].secIdx && (K[q[v].id] = {
                    divId: "trendStrengthDiv" + q[v].id,
                    rank: miSrnUtils.grv(q[v].idxVals.techStrength)
                });
                e += t
            }
            b.innerHTML = e + "</div>";
            A(!0);
            n(h, "opEq", d, !0, !1);
            C.focusToDiv("tsrSecRotSectorOverviewContainer");
            h = Object.keys(K);
            for (b = 0; b < h.length; b++)
                mintHtmlUtil.dlg({
                    divId: K[h[b]].divId,
                    rank: K[h[b]].rank,
                    title: "Technical Strength Daily",
                    leftLabel: "Sell",
                    rightLabel: "Buy",
                    width: 240,
                    height: 8
                });
            $("#sectorCardsCarousal").trigger("to.owl.carousel", [d])
        },
        psts: n,
        pss: function(h, d, b, r, e) {
            if (k()) {
                e = I.value;
                var g = H.value
                  , w = [].concat($jscomp.arrayFromIterable(x[h + "Sec"]))[b]
                  , q = "";
                q = y.isNotNull(mintJsUtil.getRootUrl()) ? mintJsUtil.getRootUrl() + ("/djs?id=" + g + "&type=" + e + "&cat=SecRot&action=one&code=" + w.uriCode) : "https://www.tsrbt1.com/rt/djs?id=" + (g + "&type=" + e + "&cat=SecRot&action=one&code=" + w.uriCode);
                e = e.toUpperCase();
                g = g.toUpperCase();
                w.uriCode.toUpperCase();
                miSrnUtils.gd(q).then(function(v) {
                    if ("success" == v.statusCode) {
                        E = v;
                        E.secType = h;
                        E.secId = b;
                        var t = H.value;
                        miSrnUtils.gf(t);
                        var B = mintJsUtil.getObjFrmArrByField(E[d + "List"], "code", r)
                          , F = {};
                        F.id = B.id;
                        F.name = B.name;
                        F.code = r;
                        F.sectorName = w.name;
                        F.vsNifty = B.vsNifty;
                        F.priceChange = B.priceChange;
                        y.isNotNull(B.vsIdx) && (F.vsIdx = B.vsIdx);
                        B = {};
                        B.stock = F;
                        B.id = t;
                        B.freq = miSrnUtils.gt(t);
                        miStkHl.pss(B, !0, "tsrSecRotStockSectionPopup")
                    } else
                        t = "",
                        t = "redirected" == v.statusCode ? "Your free access is over. Redirecting you to login / Subscribe page" : ERROR_MSG,
                        miSrnUtils.sem(t),
                        "redirected" == v.statusCode && setTimeout(function() {
                            window.location.href = v.url
                        }, 3E3)
                }).catch(function(v) {
                    miSrnUtils.sem(ERROR_MSG)
                })
            }
        },
        pc: function(h, d, b, r, e, g, w) {
            json = defStk = null;
            jPlist = [];
            document.getElementById("tsrSecRotDurationSelect");
            var q = [].concat($jscomp.arrayFromIterable(x[h + "Sec"]));
            J = q[d];
            d = q[d];
            "NIFTY" == r && c(d, h, b, r, e, g, w);
            y.isNotNull(mintJsUtil.getRootUrl()) && mintJsUtil.getRootUrl();
            c(E, h, b, r, e, g, w)
        },
        ust: p,
        ec: u
    }
}();
