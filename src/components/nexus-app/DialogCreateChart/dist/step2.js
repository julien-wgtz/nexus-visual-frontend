"use client";
"use strict";
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
var dialog_1 = require("@/components/ui/dialog");
var fetch_1 = require("@/lib/fetch");
var appStore_1 = require("@/store/appStore");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var CircleLoader_1 = require("../Loader/CircleLoader");
var command_1 = require("@/components/ui/command");
var popover_1 = require("@/components/ui/popover");
var button_1 = require("@/components/ui/button");
var react_icons_1 = require("@radix-ui/react-icons");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
var Step2CreateChart = function (_a) {
    var setChart = _a.setChart, chartDatabase = _a.chartDatabase;
    var t = next_intl_1.useTranslations('chart');
    var account = appStore_1.useAppStore(function (state) { return state.account; });
    var _b = react_1.useState(null), database = _b[0], setDatabase = _b[1];
    var _c = react_1.useState(chartDatabase), databaseSelected = _c[0], setDatabaseSelected = _c[1];
    var _d = react_1.useState(false), open = _d[0], setOpen = _d[1];
    react_1.useEffect(function () {
        var fetchDataAsync = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch_1.fetchData(process.env.NEXT_PUBLIC_BACKEND_URL + "notion/get-databases", {
                                body: JSON.stringify({
                                    accountId: account.id
                                })
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        setDatabase(data);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchDataAsync();
    }, [account.id]);
    var filterOnSearch = function (value, search) {
        var db = database.find(function (db) { return db.id === value; });
        return db.title.toLowerCase().includes(search.toLowerCase());
    };
    var getTitle = function (id) {
        var _a, _b;
        var db = database.find(function (db) { return db.id === id; });
        return (react_1["default"].createElement("div", { className: "flex items-center" },
            ((_a = db === null || db === void 0 ? void 0 : db.icon) === null || _a === void 0 ? void 0 : _a.url) && (react_1["default"].createElement("img", { src: db.icon.url, alt: db.title, className: "w-4 h-4 mr-2" })),
            ((_b = db === null || db === void 0 ? void 0 : db.icon) === null || _b === void 0 ? void 0 : _b.emoji) && (react_1["default"].createElement("span", { className: "w-4 h-4 mr-2" }, db.icon.emoji)),
            react_1["default"].createElement("span", null, db === null || db === void 0 ? void 0 : db.title)));
    };
    var onSelect = function (currentValue) {
        setDatabaseSelected(currentValue);
        setChart({ database: currentValue });
        setOpen(false);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(dialog_1.DialogHeader, null,
            react_1["default"].createElement(dialog_1.DialogTitle, null, t("title_create_chart_step_2"))),
        react_1["default"].createElement("div", { className: "flex justify-center items-center w-full" }, (database === null || database === void 0 ? void 0 : database.length) > 0 ? (react_1["default"].createElement(popover_1.Popover, { open: open, onOpenChange: setOpen },
            react_1["default"].createElement(popover_1.PopoverTrigger, { asChild: true },
                react_1["default"].createElement(button_1.Button, { variant: "outline", role: "combobox", "aria-expanded": open, className: "w-full justify-between" },
                    databaseSelected != undefined
                        ? getTitle(databaseSelected)
                        : t("select_database"),
                    react_1["default"].createElement(react_icons_1.CaretSortIcon, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" }))),
            react_1["default"].createElement(popover_1.PopoverContent, { className: "w-[500px] p-0", align: "start" },
                react_1["default"].createElement(command_1.Command, { filter: function (value, search) { return filterOnSearch(value, search); } },
                    react_1["default"].createElement(command_1.CommandInput, { placeholder: t("select_database"), className: "h-9" }),
                    react_1["default"].createElement(command_1.CommandEmpty, null, "No framework found."),
                    react_1["default"].createElement(command_1.CommandList, null,
                        react_1["default"].createElement(command_1.CommandGroup, null, database && database.map(function (db) { return (react_1["default"].createElement(command_1.CommandItem, { className: "flex items-center", value: db.id, key: db.title, onSelect: function (currentValue) { onSelect(currentValue); } },
                            getTitle(db.id),
                            react_1["default"].createElement(lucide_react_1.CheckIcon, { className: utils_1.cn("ml-auto h-4 w-4", databaseSelected === db.id ? "opacity-100" : "opacity-0") }))); }))))))) : (react_1["default"].createElement(CircleLoader_1["default"], null)))));
};
exports["default"] = Step2CreateChart;
