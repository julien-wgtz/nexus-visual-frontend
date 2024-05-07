"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.useFetch = void 0;
var react_1 = require("react");
function useFetch(url, body, config) {
    var _a = react_1.useState(null), data = _a[0], setData = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(null), error = _c[0], setError = _c[1];
    var configBase = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(body)
    };
    var mergeConfig = __assign(__assign({}, configBase), config);
    react_1.useEffect(function () {
        fetch(url, mergeConfig)
            .then(function (response) { return response.json(); })
            .then(setData)["catch"](setError)["finally"](function () { return setLoading(false); });
    }, [url]);
    return { data: data, loading: loading, error: error };
}
exports.useFetch = useFetch;
