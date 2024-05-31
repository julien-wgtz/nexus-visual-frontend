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
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var Charts_1 = require("@/data/enum/Charts");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var Bar_1 = require("../Charts/Bar/Bar");
var NexusLine_1 = require("../Charts/Line/NexusLine");
var apparence_1 = require("../FormChart/apparence");
var themesChart_json_1 = require("@/data/config/themesChart.json");
var data_1 = require("../FormChart/data");
var popover_1 = require("@/components/ui/popover");
var input_1 = require("@/components/ui/input");
var use_toast_1 = require("@/components/ui/use-toast");
var alert_dialog_1 = require("@/components/ui/alert-dialog");
var chart_1 = require("@/data/model/chart");
var EditorChart = function (_a) {
    var chart = _a.chart, data = _a.data, config = _a.config;
    var t = next_intl_1.useTranslations("");
    var urlbase = window.location.origin;
    var locale = next_intl_1.useLocale();
    var toast = use_toast_1.useToast().toast;
    var ChartApi = new chart_1["default"]();
    var _b = react_1.useState(urlbase + "/" + locale + "/chart/" + chart.shareToken), url = _b[0], setUrl = _b[1];
    var _c = react_1.useState(data), dataOrder = _c[0], setDataOrder = _c[1];
    var copyUrl = function () {
        navigator.clipboard.writeText(url);
        toast({
            description: t("chart.copied")
        });
    };
    var regenerateLink = function () {
        ChartApi.regenerateToken({ id: chart.id }).then(function (data) {
            setUrl(urlbase + "/" + locale + "/chart/" + data.shareToken);
            toast({
                description: t("chart.regenerated")
            });
        })["catch"](function (error) {
            toast({
                description: t("chart.errorRegenerate")
            });
        });
    };
    react_1.useEffect(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!config || ((_a = config.dataSelected) === null || _a === void 0 ? void 0 : _a.length) === 0 || (data === null || data === void 0 ? void 0 : data.length) === 0)
            return;
        var newData = __assign({}, data);
        var newDataData = __spreadArrays(newData.data);
        var axeX = (_c = (_b = config.dataSelected) === null || _b === void 0 ? void 0 : _b.filter(function (item) { return item.axe === "X"; })[0]) === null || _c === void 0 ? void 0 : _c.id;
        var axeXLabel = (_e = (_d = newData.properties) === null || _d === void 0 ? void 0 : _d.filter(function (item) { return item.id === axeX; })[0]) === null || _e === void 0 ? void 0 : _e.name;
        var axeXType = (_g = (_f = newData.properties) === null || _f === void 0 ? void 0 : _f.filter(function (item) { return item.id === axeX; })[0]) === null || _g === void 0 ? void 0 : _g.type;
        var orderStatus = ((_h = config === null || config === void 0 ? void 0 : config.axeX) === null || _h === void 0 ? void 0 : _h.order) ? config.axeX.order : "none";
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
    }, [config, data]);
    return (react_1["default"].createElement("div", { className: "flex flex-col gap-4 h-full p-4" },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", { className: "flex justify-between items-center" },
                react_1["default"].createElement("h3", { className: "text-lg font-semibold" }, chart.title),
                react_1["default"].createElement("div", { className: 'flex gap-2' },
                    react_1["default"].createElement(popover_1.Popover, null,
                        react_1["default"].createElement(popover_1.PopoverTrigger, { asChild: true },
                            react_1["default"].createElement(button_1.Button, null, t("chart.share"))),
                        react_1["default"].createElement(popover_1.PopoverContent, { className: "w-80 mr-4 mt-2" },
                            react_1["default"].createElement("div", { className: "flex flex-col gap-4" },
                                react_1["default"].createElement("div", { className: "space-y-2" },
                                    react_1["default"].createElement("h4", { className: "font-medium leading-none" }, t('shareLink')),
                                    react_1["default"].createElement("p", { className: "text-sm text-muted-foreground" }, t('shareLinkDescription'))),
                                react_1["default"].createElement("div", { className: "flex  gap-2" },
                                    react_1["default"].createElement(input_1.Input, { value: url, readOnly: true }),
                                    react_1["default"].createElement(button_1.Button, { onClick: copyUrl }, t("chart.copy"))),
                                react_1["default"].createElement(alert_dialog_1.AlertDialog, null,
                                    react_1["default"].createElement(alert_dialog_1.AlertDialogTrigger, { asChild: true },
                                        react_1["default"].createElement(button_1.Button, { variant: "secondary" }, t("chart.regenerate"))),
                                    react_1["default"].createElement(alert_dialog_1.AlertDialogContent, null,
                                        react_1["default"].createElement(alert_dialog_1.AlertDialogHeader, null,
                                            react_1["default"].createElement(alert_dialog_1.AlertDialogTitle, null, t("chart.regenerate")),
                                            react_1["default"].createElement(alert_dialog_1.AlertDialogDescription, null, t("chart.regenerateDescription"))),
                                        react_1["default"].createElement(alert_dialog_1.AlertDialogFooter, null,
                                            react_1["default"].createElement(alert_dialog_1.AlertDialogCancel, null, t("cancel")),
                                            react_1["default"].createElement(alert_dialog_1.AlertDialogAction, { onClick: regenerateLink }, t("confirm"))))))))))),
        react_1["default"].createElement("div", { className: 'grid grid-cols-1 lg:grid-cols-9 gap-2 h-full min-h-[350px]' },
            react_1["default"].createElement(card_1.Card, { className: 'bg-muted/30 col-span-1 lg:col-span-6 aspect-video', style: { backgroundColor: themesChart_json_1["default"][config.theme].backgroundColor } },
                react_1["default"].createElement(card_1.CardContent, { className: ' w-full h-full p-2' },
                    chart.currentChartType === Charts_1["default"].BAR && (react_1["default"].createElement(Bar_1["default"], { data: dataOrder, config: config })),
                    chart.currentChartType === Charts_1["default"].LINE && (react_1["default"].createElement(NexusLine_1["default"], { data: dataOrder, config: config })))),
            react_1["default"].createElement("div", { className: 'flex flex-col gap-4 col-span-1 lg:col-span-3' },
                react_1["default"].createElement(data_1["default"], { properties: data.properties }),
                react_1["default"].createElement(apparence_1["default"], null)))));
};
exports["default"] = EditorChart;
