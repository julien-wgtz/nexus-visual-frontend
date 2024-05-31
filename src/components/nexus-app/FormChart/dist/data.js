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
var label_1 = require("@/components/ui/label");
var select_1 = require("@/components/ui/select");
var dashboardStore_1 = require("@/store/dashboardStore");
var lucide_react_1 = require("lucide-react");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var toggle_group_1 = require("@/components/ui/toggle-group");
var chart_1 = require("@/data/model/chart");
var button_1 = require("@/components/ui/button");
var tooltip_1 = require("@/components/ui/tooltip");
var DataForm = function (_a) {
    var properties = _a.properties;
    var t = next_intl_1.useTranslations("EditorChart");
    var chartApi = new chart_1["default"]();
    var currentChart = dashboardStore_1["default"](function (state) { return state.currentChart; });
    var configChart = dashboardStore_1["default"](function (state) { return state.configChart; });
    var setConfigChart = dashboardStore_1["default"](function (state) { return state.setConfigChart; });
    var _b = react_1.useState(""), axeXSelected = _b[0], setAxeXSelected = _b[1];
    var _c = react_1.useState([]), axeYSelected = _c[0], setAxeYSelected = _c[1];
    var _d = react_1.useState("none"), orderAxeX = _d[0], setOrderAxeX = _d[1];
    var _e = react_1.useState(true), isLoading = _e[0], setIsLoading = _e[1];
    react_1.useEffect(function () {
        if (configChart.dataSelected && axeYSelected.length == 0) {
            setAxeYSelected([]);
            configChart.dataSelected.map(function (item) {
                if (item.axe == "X") {
                    setAxeXSelected(item.id);
                }
                else if (item.axe == "Y") {
                    var newArray = axeYSelected;
                    newArray.push(item.id);
                    setAxeYSelected(__spreadArrays(newArray));
                }
            });
        }
        if (configChart.axeX.order) {
            setOrderAxeX(configChart.axeX.order);
        }
        isLoading && setIsLoading(false);
    }, []);
    react_1.useEffect(function () {
        chartApi.updateConfigChart({ id: currentChart.id, config: configChart });
    }, [configChart]);
    var onchange = function (event) {
        if (!configChart.dataSelected)
            configChart.dataSelected = [];
        if (event.target.name == "axeX") {
            var hasUpdate_1 = false;
            configChart.dataSelected.map(function (item) {
                if (item.axe == "X" && hasUpdate_1 == false) {
                    hasUpdate_1 = true;
                    item.id = event.target.value;
                }
            });
            if (!hasUpdate_1) {
                configChart.dataSelected.push({ axe: "X", id: event.target.value });
            }
        }
        setConfigChart(__assign({}, configChart));
    };
    var onOrderAxeX = function (value) {
        if (!value)
            return;
        configChart.axeX.order = value;
        setOrderAxeX(value);
        setConfigChart(__assign({}, configChart));
    };
    var updateAxeX = function (value, index, oldItem) {
        if (value == "")
            return;
        if (!configChart.dataSelected)
            configChart.dataSelected = [];
        var hasUpdate = false;
        configChart.dataSelected.map(function (item) {
            if (item.id == oldItem && hasUpdate == false) {
                item.id = value;
                hasUpdate = true;
                var newArray = axeYSelected;
                newArray[index] = value;
                setAxeYSelected(__spreadArrays(newArray));
            }
        });
        if (!hasUpdate) {
            configChart.dataSelected.push({ axe: "Y", id: value });
            var newArray = axeYSelected;
            newArray[index] = value;
            setAxeYSelected(__spreadArrays(newArray));
        }
        setConfigChart(__assign({}, configChart));
    };
    var removeSeries = function (e, itemId) {
        e.preventDefault();
        var newArray = axeYSelected.filter(function (item) { return item !== itemId; });
        setAxeYSelected(newArray);
        var newDataSelected = configChart.dataSelected.filter(function (item) {
            return item.id !== itemId;
        });
        configChart.dataSelected = __spreadArrays(newDataSelected);
        setConfigChart(__assign({}, configChart));
    };
    return (react_1["default"].createElement("form", { onChange: function (event) { return onchange(event); }, className: "grid w-full items-start gap-6 overflow-auto mt-[-9px]" },
        react_1["default"].createElement("fieldset", { className: "bg-muted/20 grid gap-6 rounded-lg border p-4" },
            react_1["default"].createElement("legend", { className: "-ml-1 px-1 text-sm font-medium" }, t("chart.data")),
            react_1["default"].createElement("div", { className: "grid gap-3" },
                react_1["default"].createElement(label_1.Label, { htmlFor: "axeX" }, t("axeX")),
                !isLoading && (react_1["default"].createElement(select_1.Select, { name: "axeX", value: axeXSelected, onValueChange: function (value) { return setAxeXSelected(value); } },
                    react_1["default"].createElement(select_1.SelectTrigger, { id: "axeX", className: "items-start [&_[data-description]]:hidden" },
                        react_1["default"].createElement(select_1.SelectValue, { placeholder: t("selectX") })),
                    react_1["default"].createElement(select_1.SelectContent, null, properties === null || properties === void 0 ? void 0 : properties.map(function (property) { return (react_1["default"].createElement(select_1.SelectItem, { key: property.id, value: property.id },
                        react_1["default"].createElement("div", { className: "flex items-start gap-3 text-muted-foreground" },
                            react_1["default"].createElement("div", { className: "grid gap-0.5" },
                                react_1["default"].createElement("p", null, property.name))))); })))),
                !isLoading && axeXSelected && (react_1["default"].createElement(toggle_group_1.ToggleGroup, { value: orderAxeX, onValueChange: function (value) { return onOrderAxeX(value); }, id: "order", type: "single", variant: "outline", className: 'flex gap-2 justify-start' },
                    react_1["default"].createElement(toggle_group_1.ToggleGroupItem, { name: 'order', value: "none", "aria-label": "Toggle bold" },
                        react_1["default"].createElement(lucide_react_1.X, { className: "h-4 w-4" })),
                    react_1["default"].createElement(toggle_group_1.ToggleGroupItem, { name: 'order', value: "asc" }, "ASC"),
                    react_1["default"].createElement(toggle_group_1.ToggleGroupItem, { name: 'order', value: "desc" }, "DESC")))),
            react_1["default"].createElement("div", { className: "grid gap-3" },
                react_1["default"].createElement(label_1.Label, { htmlFor: "axeX" }, "S\u00E9rie"),
                !isLoading && axeYSelected.map(function (axeY, index) { return (react_1["default"].createElement("div", { className: 'flex gap-3', key: index },
                    react_1["default"].createElement(select_1.Select, { name: "axeY", value: axeY, onValueChange: function (value) { return updateAxeX(value, index, axeY); } },
                        react_1["default"].createElement(select_1.SelectTrigger, { id: "axeY", className: "items-start [&_[data-description]]:hidden" },
                            react_1["default"].createElement(select_1.SelectValue, { placeholder: t("selectSerie") })),
                        react_1["default"].createElement(select_1.SelectContent, null, properties === null || properties === void 0 ? void 0 : properties.map(function (property) { return (react_1["default"].createElement("div", { key: property.id }, ((axeYSelected.includes(property.id)) && property.id !== axeY) || property.id == axeXSelected ? null : (react_1["default"].createElement(select_1.SelectItem, { value: property.id },
                            react_1["default"].createElement("div", { className: "flex items-start gap-3 text-muted-foreground" },
                                react_1["default"].createElement("div", { className: "grid gap-0.5" },
                                    react_1["default"].createElement("p", null, property.name))))))); }))),
                    react_1["default"].createElement(button_1.Button, { variant: "outline", onClick: function (e) { return removeSeries(e, axeY); } },
                        react_1["default"].createElement(lucide_react_1.X, { size: 16 })))); }),
                react_1["default"].createElement(tooltip_1.TooltipProvider, null,
                    react_1["default"].createElement(tooltip_1.Tooltip, null,
                        react_1["default"].createElement(tooltip_1.TooltipTrigger, { asChild: true },
                            react_1["default"].createElement("div", { className: 'w-full' },
                                react_1["default"].createElement(button_1.Button, { variant: "secondary", className: 'w-full', disabled: axeYSelected.length >= 8, onClick: function (e) { e.preventDefault(); setAxeYSelected(__spreadArrays(axeYSelected, [""])); } }, t("addSeries")))),
                        react_1["default"].createElement(tooltip_1.TooltipContent, null, axeYSelected.length >= 8 ? t("maxSeries") : t("addSeries"))))))));
};
exports["default"] = DataForm;
