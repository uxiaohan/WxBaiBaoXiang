function o(t) {
    return (o = "function" == typeof Symbol && "symbol" == n(Symbol.iterator) ? function(o) {
        return void 0 === o ? "undefined" : n(o);
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : void 0 === o ? "undefined" : n(o);
    })(t);
}

function t(n) {
    return "function" == typeof Symbol && "symbol" === o(Symbol.iterator) ? module.exports = t = function(t) {
        return o(t);
    } : module.exports = t = function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : o(t);
    }, t(n);
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
};

module.exports = t;