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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var select_1 = require("@/components/ui/select");
var dashboardStore_1 = require("@/store/dashboardStore");
var lucide_react_1 = require("lucide-react");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var themesChart_json_1 = require("@/data/config/themesChart.json");
var switch_1 = require("@/components/ui/switch");
var toggle_group_1 = require("@/components/ui/toggle-group");
var chart_1 = require("@/data/model/chart");
var ApparenceForm = function (_a) {
    var t = next_intl_1.useTranslations("EditorChart");
    var chartApi = new chart_1["default"]();
    var currentChart = dashboardStore_1["default"](function (state) { return state.currentChart; });
    var configChart = dashboardStore_1["default"](function (state) { return state.configChart; });
    var setConfigChart = dashboardStore_1["default"](function (state) { return state.setConfigChart; });
    var _b = react_1.useState(configChart.theme), theme = _b[0], setTheme = _b[1];
    var _c = react_1.useState(configChart.lineType), line = _c[0], setLine = _c[1];
    var _d = react_1.useState(configChart.background), grid = _d[0], setGrid = _d[1];
    var _e = react_1.useState(""), legend = _e[0], setLegend = _e[1];
    var _f = react_1.useState(""), labelAxeX = _f[0], setLabelAxeX = _f[1];
    var _g = react_1.useState(""), labelAxeY = _g[0], setLabelAxeY = _g[1];
    react_1.useEffect(function () {
        if (configChart.legend.display) {
            setLegend(configChart.legend.align);
        }
        else {
            setLegend('none');
        }
        setLabelAxeX(configChart.axeX.label);
        setLabelAxeY(configChart.axeY.label);
        chartApi.updateConfigChart({ id: currentChart.id, config: configChart });
    }, [configChart]);
    var onchange = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (event.target.name === 'background') {
                configChart[event.target.name] = event.target.checked;
            }
            else if (event.target.name == "axeX" || event.target.name == "axeY") {
                configChart[event.target.name].label = event.target.value;
            }
            else {
                configChart[event.target.name] = event.target.value;
            }
            setConfigChart(__assign({}, configChart));
            return [2 /*return*/];
        });
    }); };
    var onChangeLegend = function (value) {
        if (value == "none") {
            configChart.legend.display = false;
        }
        else {
            configChart.legend.display = true;
            configChart.legend.align = value;
        }
        if (value) {
            setConfigChart(__assign({}, configChart));
        }
    };
    return (react_1["default"].createElement("form", { onChange: function (event) { return onchange(event); }, className: "grid w-full items-start gap-6 overflow-auto mt-[-9px]" },
        react_1["default"].createElement("fieldset", { className: "bg-muted/20 grid gap-6 rounded-lg border p-4" },
            react_1["default"].createElement("legend", { className: "-ml-1 px-1 text-sm font-medium" }, t("chart.apparence")),
            react_1["default"].createElement("div", { className: "grid gap-3" },
                react_1["default"].createElement(label_1.Label, { htmlFor: "theme" }, t("themeDark")),
                react_1["default"].createElement(select_1.Select, { name: 'theme', value: theme, onValueChange: function (value) { return setTheme(value); } },
                    react_1["default"].createElement(select_1.SelectTrigger, { id: "theme", className: "items-start [&_[data-description]]:hidden" },
                        react_1["default"].createElement(select_1.SelectValue, { placeholder: "Select a theme" })),
                    react_1["default"].createElement(select_1.SelectContent, null, themesChart_json_1["default"].themes.map(function (theme) { return (react_1["default"].createElement(select_1.SelectItem, { key: theme.name, value: theme.name },
                        react_1["default"].createElement("div", { className: "flex items-start gap-3 text-muted-foreground" },
                            react_1["default"].createElement("div", { className: "grid gap-0.5" },
                                react_1["default"].createElement("p", null, theme.label))))); })))),
            react_1["default"].createElement("div", { className: "grid gap-3" },
                react_1["default"].createElement(label_1.Label, { htmlFor: "line" }, t("line-type")),
                react_1["default"].createElement(select_1.Select, { name: "lineType", value: line, onValueChange: function (value) { return setLine(value); } },
                    react_1["default"].createElement(select_1.SelectTrigger, { id: "line", className: "items-start [&_[data-description]]:hidden" },
                        react_1["default"].createElement(select_1.SelectValue, { placeholder: "Select a line" })),
                    react_1["default"].createElement(select_1.SelectContent, null, themesChart_json_1["default"].lines.map(function (line) { return (react_1["default"].createElement(select_1.SelectItem, { key: line.name, value: line.name },
                        react_1["default"].createElement("div", { className: "flex items-start gap-3 text-muted-foreground" },
                            react_1["default"].createElement("div", { className: "grid gap-0.5" },
                                react_1["default"].createElement("p", null, line.label))))); })))),
            react_1["default"].createElement("div", { className: "flex gap-3" },
                react_1["default"].createElement(label_1.Label, { htmlFor: "grid" }, "Background grid"),
                react_1["default"].createElement(switch_1.Switch, { name: 'background', id: "grid", checked: grid, onCheckedChange: function (value) { return setGrid(value); } })),
            react_1["default"].createElement("div", { className: "grid gap-3" },
                react_1["default"].createElement(label_1.Label, { htmlFor: "legend" }, "Legend"),
                react_1["default"].createElement(toggle_group_1.ToggleGroup, { value: legend, onValueChange: function (value) { return onChangeLegend(value); }, id: "legend", type: "single", variant: "outline", className: 'flex gap-2 justify-start' },
                    react_1["default"].createElement(toggle_group_1.ToggleGroupItem, { name: 'legend', value: "none", "aria-label": "Toggle bold" },
                        react_1["default"].createElement(lucide_react_1.X, { className: "h-4 w-4" })),
                    react_1["default"].createElement(toggle_group_1.ToggleGroupItem, { name: 'legend', value: "left" },
                        react_1["default"].createElement(lucide_react_1.AlignLeft, { className: "h-4 w-4" })),
                    react_1["default"].createElement(toggle_group_1.ToggleGroupItem, { name: 'legend', value: "center" },
                        react_1["default"].createElement(lucide_react_1.AlignCenter, { className: "h-4 w-4" })),
                    react_1["default"].createElement(toggle_group_1.ToggleGroupItem, { name: 'legend', value: "right" },
                        react_1["default"].createElement(lucide_react_1.AlignRight, { className: "h-4 w-4" })))),
            react_1["default"].createElement("div", { className: 'grid gap-3' },
                react_1["default"].createElement(label_1.Label, { htmlFor: 'axeY' }, "Titre axe Y"),
                react_1["default"].createElement(input_1.Input, { value: labelAxeY, onChange: function (value) { return setLabelAxeY(value); }, id: "axeY", name: 'axeY', placeholder: 'Label' })),
            react_1["default"].createElement("div", { className: 'grid gap-3' },
                react_1["default"].createElement(label_1.Label, { htmlFor: 'axeX' }, "Label axe X"),
                react_1["default"].createElement(input_1.Input, { value: labelAxeX, onChange: function (value) { return setLabelAxeX(value); }, id: "axeX", name: 'axeX', placeholder: 'Label' })))));
};
exports["default"] = ApparenceForm;
