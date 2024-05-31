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
var react_1 = require("react");
var recharts_1 = require("recharts");
var themesChart_json_1 = require("@/data/config/themesChart.json");
var tickAxeX_1 = require("../tickAxeX");
var tooltip_1 = require("../tooltip");
var CircleLoader_1 = require("../../Loader/CircleLoader");
var legend_1 = require("../legend");
var NexusLine = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var data = _a.data, config = _a.config;
    var _l = react_1.useState(themesChart_json_1["default"][config.theme]), styles = _l[0], setStyles = _l[1];
    var _m = react_1.useState([]), propertiesSelected = _m[0], setPropertiesSelected = _m[1];
    var _o = react_1.useState([]), dataAxeX = _o[0], setDataAxeX = _o[1];
    var _p = react_1.useState(true), isLoading = _p[0], setIsLoading = _p[1];
    var _q = react_1.useState([]), opacity = _q[0], setOpacity = _q[1];
    react_1.useEffect(function () {
        var _a, _b;
        setIsLoading(true);
        var getPropertiesSelected = (_a = data.properties) === null || _a === void 0 ? void 0 : _a.filter(function (p) {
            var _a, _b;
            if (((_a = config.dataSelected) === null || _a === void 0 ? void 0 : _a.length) == 0)
                return false;
            return (_b = config.dataSelected) === null || _b === void 0 ? void 0 : _b.map(function (ds) { return ds.axe == "Y" ? ds.id : false; }).includes(p.id);
        });
        var getDataAxeX = (_b = data.properties) === null || _b === void 0 ? void 0 : _b.filter(function (p) {
            var _a, _b;
            if (((_a = config.dataSelected) === null || _a === void 0 ? void 0 : _a.length) == 0)
                return true;
            return (_b = config.dataSelected) === null || _b === void 0 ? void 0 : _b.map(function (ds) { return ds.axe == "X" ? ds.id : false; }).includes(p.id);
        });
        setPropertiesSelected(getPropertiesSelected);
        setDataAxeX(getDataAxeX);
        setIsLoading(false);
        var op = propertiesSelected === null || propertiesSelected === void 0 ? void 0 : propertiesSelected.map(function (ds) {
            return { name: ds.name, opacity: 1 };
        });
        setOpacity(op);
    }, [data, config]);
    react_1.useEffect(function () {
        setStyles(themesChart_json_1["default"][config.theme]);
    }, [config]);
    var getOpacity = function (name) {
        var op = opacity.find(function (o) { return o.name === name; });
        return op === null || op === void 0 ? void 0 : op.opacity;
    };
    var setOpacityAll = function (name) {
        var updatedOpacity = opacity.map(function (op) {
            if (!name) {
                return __assign(__assign({}, op), { opacity: 1 });
            }
            if (op.name === name) {
                return __assign(__assign({}, op), { opacity: 1 });
            }
            else {
                return __assign(__assign({}, op), { opacity: 0.2 });
            }
        });
        setOpacity(updatedOpacity);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null, isLoading ? (react_1["default"].createElement(CircleLoader_1["default"], null)) :
        (react_1["default"].createElement(recharts_1.ResponsiveContainer, { width: "100%", height: "100%" },
            react_1["default"].createElement(recharts_1.LineChart, { data: data.data, margin: { top: 0, right: 0, bottom: ((_b = config.axeX) === null || _b === void 0 ? void 0 : _b.label) && !config.legend.display ? 20 : 0, left: ((_c = config.axeY) === null || _c === void 0 ? void 0 : _c.label) ? 10 : 0 } },
                config.background && react_1["default"].createElement(recharts_1.CartesianGrid, { strokeDasharray: styles.grid.widthDash + " " + styles.grid.gapDash, stroke: styles.grid.color }),
                react_1["default"].createElement(recharts_1.XAxis, { dataKey: (dataAxeX === null || dataAxeX === void 0 ? void 0 : dataAxeX.length) > 0 ? (_d = dataAxeX[0]) === null || _d === void 0 ? void 0 : _d.name : null, tick: react_1["default"].createElement(tickAxeX_1["default"], { styles: styles, type: (dataAxeX === null || dataAxeX === void 0 ? void 0 : dataAxeX.length) > 0 ? (_e = dataAxeX[0]) === null || _e === void 0 ? void 0 : _e.type : null }), style: { stroke: styles.grid.color } }, ((_f = config.axeX) === null || _f === void 0 ? void 0 : _f.label) !== "" && react_1["default"].createElement(recharts_1.Label, { value: config.axeX.label, position: (_g = config.axeX) === null || _g === void 0 ? void 0 : _g.position, fill: styles.fontColor, fontSize: styles.fontSize, fontWeight: styles.fontWeight })),
                react_1["default"].createElement(recharts_1.YAxis, { tick: { fill: styles.fontColor, strokeWidth: 0, fontSize: styles.fontSize, fontWeight: styles.fontWeight }, style: { stroke: styles.grid.color } }, ((_h = config.axeY) === null || _h === void 0 ? void 0 : _h.label) !== "" && react_1["default"].createElement(recharts_1.Label, { value: config.axeY.label, angle: -90, position: (_j = config.axeY) === null || _j === void 0 ? void 0 : _j.position, fill: styles.fontColor, fontSize: styles.fontSize, fontWeight: styles.fontWeight })),
                config.legend.display && react_1["default"].createElement(recharts_1.Legend, { content: react_1["default"].createElement(legend_1["default"], { setOpacityAll: setOpacityAll, config: config, styles: styles, type: "line" }), verticalAlign: config.legend.verticalAlign }), propertiesSelected === null || propertiesSelected === void 0 ? void 0 :
                propertiesSelected.map(function (p, i) {
                    return react_1["default"].createElement(recharts_1.Line, { type: config.lineType, dataKey: p.name, strokeOpacity: getOpacity(p.name), stroke: styles.colors[i].color, key: p.id });
                }),
                react_1["default"].createElement(recharts_1.Tooltip, { cursor: { stroke: styles.hoverColor + "85" }, content: react_1["default"].createElement(tooltip_1["default"], { styles: styles, labelType: (dataAxeX === null || dataAxeX === void 0 ? void 0 : dataAxeX.length) > 0 ? (_k = dataAxeX[0]) === null || _k === void 0 ? void 0 : _k.type : null }) }))))));
};
exports["default"] = NexusLine;
