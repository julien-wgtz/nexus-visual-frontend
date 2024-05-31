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
var button_1 = require("@/components/ui/button");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var dashboardStore_1 = require("@/store/dashboardStore");
var lucide_react_1 = require("lucide-react");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var react_dnd_1 = require("react-dnd");
var folderStore_1 = require("@/store/folderStore");
var chart_1 = require("@/data/model/chart");
var ChartItem = function (_a) {
    var index = _a.index, chart = _a.chart, folderId = _a.folderId, isShadow = _a.isShadow;
    var t = next_intl_1.useTranslations("");
    var chartApi = new chart_1["default"]();
    var currentChart = dashboardStore_1["default"](function (state) { return state.currentChart; });
    var setCurrentChart = dashboardStore_1["default"](function (state) { return state.setCurrentChart; });
    var resetCurrentChart = dashboardStore_1["default"](function (state) { return state.resetCurrentChart; });
    var updateFolder = folderStore_1["default"](function (state) { return state.updateFolder; });
    var setFolders = folderStore_1["default"](function (state) { return state.setFolders; });
    var _b = react_1.useState(false), isEditing = _b[0], setIsEditing = _b[1];
    var _c = react_1.useState((chart === null || chart === void 0 ? void 0 : chart.title) || ""), chartName = _c[0], setChartName = _c[1];
    var inputRef = react_1.useRef(null);
    var ref = react_1.useRef(null);
    var _d = react_dnd_1.useDrop({
        accept: 'chart',
        drop: function (item, monitor) {
            if (!ref.current) {
                return;
            }
            chartApi.updateChartOrder(item.index, index, item.folderId, folderId).then(function (newFolders) {
                setFolders(newFolders);
            });
        },
        collect: function (monitor) { return ({
            isOver: monitor.isOver()
        }); }
    }), isOver = _d[0].isOver, drop = _d[1];
    var _e = react_dnd_1.useDrag({
        type: 'chart',
        item: { chart: chart, index: index, folderId: folderId },
        canDrag: function () { return chart !== undefined; },
        isDragging: function (monitor) { return monitor.getItem().chart.id === (chart === null || chart === void 0 ? void 0 : chart.id); },
        collect: function (monitor) { return ({
            isDragging: monitor.isDragging()
        }); }
    }, [folderId, index]), isDragging = _e[0].isDragging, drag = _e[1];
    drag(drop(ref));
    var onDeleteChart = function (event) {
        chartApi.deleteChart({ id: chart.id }).then(function (res) {
            updateFolder(res);
            resetCurrentChart(undefined);
        });
    };
    var editChart = function (event) {
        event.stopPropagation();
        setIsEditing(true);
    };
    var handleOnBlur = function () { return __awaiter(void 0, void 0, void 0, function () {
        var input;
        return __generator(this, function (_a) {
            input = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current;
            if (chart.title === input.value) {
                setIsEditing(false);
                return [2 /*return*/];
            }
            chart.title = input.value;
            chartApi.updateChart(chart).then(function (res) {
                if (currentChart.id === chart.id) {
                    setCurrentChart(res);
                }
            });
            setIsEditing(false);
            return [2 /*return*/];
        });
    }); };
    react_1.useEffect(function () {
        var handleKeyDown = function (event) {
            if (event.key === 'Enter' && inputRef.current) {
                event.preventDefault();
                handleOnBlur();
            }
        };
        setTimeout(function () {
            var input = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current;
            if (isEditing && inputRef.current) {
                input.focus();
                document.addEventListener('keydown', handleKeyDown);
            }
        }, 180);
        return function () {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isEditing]);
    react_1.useEffect(function () {
        setChartName(chart === null || chart === void 0 ? void 0 : chart.title);
    }, [chart]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { style: { border: "1px solid " + (isOver ? 'blue' : 'transparent') } }),
        react_1["default"].createElement("div", { ref: ref, "data-selected": chart !== undefined && (currentChart === null || currentChart === void 0 ? void 0 : currentChart.id) == (chart === null || chart === void 0 ? void 0 : chart.id), className: "group/item itemChart flex justify-between items-center w-full  " + (isDragging || !chart ? "" : "hover:bg-muted/85 cursor-pointer") + " " + (isShadow ? "" : "pl-4") + " data-[selected=true]:bg-muted/70", onClick: function () { return setCurrentChart(chart); } }, chart ? (react_1["default"].createElement(react_1["default"].Fragment, null,
            isEditing ? (react_1["default"].createElement("input", { ref: inputRef, className: "text-xs font-normal rounded bg-muted p-1 pl-2 ml-8", type: "text", value: chartName, onChange: function (e) {
                    setChartName(e.target.value);
                }, onBlur: handleOnBlur })) : (react_1["default"].createElement("h5", { className: "w-full flex justify-start text-xs font-normal rounded-none pl-10 hover:bg-inherit" }, chartName)),
            react_1["default"].createElement(dropdown_menu_1.DropdownMenu, null,
                react_1["default"].createElement(dropdown_menu_1.DropdownMenuTrigger, { asChild: true },
                    react_1["default"].createElement(button_1.Button, { variant: "ghost", size: "icon", className: " hover:bg-transparent focus:outline-none focus-visible:ring-0" },
                        react_1["default"].createElement(lucide_react_1.Ellipsis, { className: "ellipseButtonChart hidden", size: 16 }))),
                react_1["default"].createElement(dropdown_menu_1.DropdownMenuContent, { className: "DropdownMenuContent", side: "bottom", align: "start" },
                    react_1["default"].createElement(dropdown_menu_1.DropdownMenuGroup, null,
                        react_1["default"].createElement(dropdown_menu_1.DropdownMenuItem, { className: "DropdownMenuItem", onClick: editChart }, t('chart.renameFolder')),
                        react_1["default"].createElement(dropdown_menu_1.DropdownMenuItem, { className: "DropdownMenuItem", onClick: function (event) {
                                onDeleteChart(event);
                            } }, t('chart.removeChart'))))))) : (react_1["default"].createElement("div", { className: 'h-1' })))));
};
exports["default"] = ChartItem;
