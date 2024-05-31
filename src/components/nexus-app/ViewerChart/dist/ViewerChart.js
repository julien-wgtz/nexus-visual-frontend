"use client";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var card_1 = require("@/components/ui/card");
var chart_1 = require("@/data/model/chart");
var react_1 = require("react");
var Bar_1 = require("../Charts/Bar/Bar");
var NexusLine_1 = require("../Charts/Line/NexusLine");
var Charts_1 = require("@/data/enum/Charts");
var themesChart_json_1 = require("@/data/config/themesChart.json");
var ViewerChart = function (_a) {
    var chart = _a.chart;
    var ChartApi = new chart_1["default"]();
    var _b = react_1.useState(null), data = _b[0], setData = _b[1];
    var _c = react_1.useState('transparent'), backgroundColor = _c[0], setBackgroundColor = _c[1];
    var _d = react_1.useState(data), dataOrder = _d[0], setDataOrder = _d[1];
    react_1.useEffect(function () {
        if (!chart)
            return;
        ChartApi.getChartDataFromToken({ shareToken: chart.shareToken }).then(function (data) {
            setData(data);
        });
        var isInIframe = window.self !== window.top;
        var bg = isInIframe ? "transparent" : themesChart_json_1["default"][chart.config.theme].backgroundColor;
        setBackgroundColor(bg);
    }, [chart]);
    react_1.useEffect(function () {
        var _a, _b, _c;
        if (data == null || (data === null || data === void 0 ? void 0 : data.length) === 0)
            return;
        var newData = __assign({}, data);
        var newDataData = __spreadArrays(newData.data);
        var axeX = (_a = chart.config.dataSelected.filter(function (item) { return item.axe === "X"; })[0]) === null || _a === void 0 ? void 0 : _a.id;
        var axeXLabel = (_b = newData.properties.filter(function (item) { return item.id === axeX; })[0]) === null || _b === void 0 ? void 0 : _b.name;
        var axeXType = (_c = newData.properties.filter(function (item) { return item.id === axeX; })[0]) === null || _c === void 0 ? void 0 : _c.type;
        var orderStatus = chart.config.axeX.order ? chart.config.axeX.order : "none";
        if (orderStatus === "none") {
            setDataOrder(__assign({}, data));
        }
        else {
            var dataOrder_1 = newDataData.sort(function (a, b) {
                if (orderStatus === "asc") {
                    if (axeXType === "date") {
                        return new Date(a[axeXLabel]).getTime() - new Date(b[axeXLabel]).getTime();
                    }
                    else {
                        return a[axeXLabel] - b[axeXLabel];
                    }
                }
                else if (orderStatus === "desc") {
                    if (axeXType === "date") {
                        return new Date(b[axeXLabel]).getTime() - new Date(a[axeXLabel]).getTime();
                    }
                    else {
                        return b[axeXLabel] - a[axeXLabel];
                    }
                }
            });
            newData.data = dataOrder_1;
            setDataOrder(newData);
        }
    }, [data]);
    return (react_1["default"].createElement("div", { className: 'h-screen w-screen p-4', style: { backgroundColor: backgroundColor } }, (chart && dataOrder) ? (react_1["default"].createElement(card_1.Card, { className: 'h-full w-full aspect-video', style: { backgroundColor: themesChart_json_1["default"][chart.config.theme].backgroundColor } },
        react_1["default"].createElement(card_1.CardContent, { className: ' w-full h-full p-2' },
            chart.currentChartType === Charts_1["default"].BAR && (react_1["default"].createElement(Bar_1["default"], { data: dataOrder, config: chart.config })),
            chart.currentChartType === Charts_1["default"].LINE && (react_1["default"].createElement(NexusLine_1["default"], { data: dataOrder, config: chart.config }))))) : (react_1["default"].createElement("p", null, "loading"))));
};
exports["default"] = ViewerChart;
