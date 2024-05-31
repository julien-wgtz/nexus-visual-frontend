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
var react_1 = require("react");
var react_dnd_1 = require("react-dnd");
var ChartItem_1 = require("./ChartItem");
var next_intl_1 = require("next-intl");
var context_menu_1 = require("@/components/ui/context-menu");
var collapsible_1 = require("@/components/ui/collapsible");
var lucide_react_1 = require("lucide-react");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var button_1 = require("@/components/ui/button");
var folderStore_1 = require("@/store/folderStore");
var dashboardStore_1 = require("@/store/dashboardStore");
var folder_1 = require("@/data/model/folder");
var chart_1 = require("@/data/model/chart");
var FolderItem = function (_a) {
    var _b, _c, _d, _e, _f, _g;
    var index = _a.index, folder = _a.folder;
    var t = next_intl_1.useTranslations('');
    var ref = react_1.useRef(null);
    var inputRef = react_1.useRef(null);
    var chartApi = new chart_1["default"]();
    var setOpenDialogCreateChart = dashboardStore_1["default"](function (state) { return state.setDialogIsOpen; });
    var setDataForChart = dashboardStore_1["default"](function (state) { return state.setDataForChart; });
    var folderApi = new folder_1["default"]();
    var currentFolder = dashboardStore_1["default"](function (state) { return state.currentFolder; });
    var currentChart = dashboardStore_1["default"](function (state) { return state.currentChart; });
    var resetCurrentChart = dashboardStore_1["default"](function (state) { return state.resetCurrentChart; });
    var updateFolder = folderStore_1["default"](function (state) { return state.updateFolder; });
    var setFolders = folderStore_1["default"](function (state) { return state.setFolders; });
    var _h = react_1.useState(currentFolder == folder.id), isOpened = _h[0], setIsOpened = _h[1];
    var _j = react_1.useState(false), isEditing = _j[0], setIsEditing = _j[1];
    var _k = react_1.useState(folder.name), folderName = _k[0], setFolderName = _k[1];
    var _l = react_dnd_1.useDrop({
        accept: ['folder', 'chart'],
        drop: function (item, monitor) {
            if (!ref.current) {
                return;
            }
            var indexOrigine = item.index;
            var indexDestination = index;
            var effect = monitor.getDropResult();
            if (!item.folderId) {
                folderApi.updateFolderOrder(indexOrigine, indexDestination).then(function (newFolders) {
                    setFolders(newFolders);
                });
            }
            else {
                if (effect === null) {
                    chartApi.updateChartOrder(item.index, 0, item.folderId, folder.id).then(function (newFolders) {
                        setFolders(newFolders);
                        setIsOpened(true);
                    });
                }
            }
        },
        collect: function (monitor) { return ({
            isOverLine: monitor.isOver() && monitor.getItemType() === 'folder',
            isOverFolder: monitor.isOver() && monitor.getItemType() === 'chart'
        }); }
    }), _m = _l[0], isOverLine = _m.isOverLine, isOverFolder = _m.isOverFolder, drop = _l[1];
    var _o = react_dnd_1.useDrag({
        type: 'folder',
        item: { folder: folder, index: index },
        canDrag: !folder.isShadow,
        collect: function (monitor) { return ({
            isDragging: monitor.isDragging()
        }); }
    }, [folder, index]), _p = _o[0], drag = _o[1];
    drag(drop(ref));
    react_1.useEffect(function () {
        var handleKeyDown = function (event) {
            if (event.key === 'Enter' && inputRef.current) {
                event.preventDefault();
                handleOnBlur();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return function () {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    react_1.useEffect(function () {
        if (!isOpened)
            setIsOpened(currentFolder == folder.id);
    }, [currentFolder]);
    react_1.useEffect(function () {
        setTimeout(function () {
            var input = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current;
            if (isEditing && inputRef.current) {
                input.focus();
            }
        }, 180);
    }, [isEditing]);
    var editFolder = function (event) {
        event.stopPropagation();
        setIsEditing(true);
    };
    var handleOnBlur = function () { return __awaiter(void 0, void 0, void 0, function () {
        var input, folderRename;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    input = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current;
                    if (folder.name === input.value) {
                        setIsEditing(false);
                        return [2 /*return*/];
                    }
                    folder.name = input.value;
                    return [4 /*yield*/, folderApi.updateFolder(folder)];
                case 1:
                    folderRename = _a.sent();
                    updateFolder(folderRename);
                    setIsEditing(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleCreateChart = function (e) {
        var _a;
        e.stopPropagation();
        setDataForChart({ id: folder.id, order: (_a = folder.charts) === null || _a === void 0 ? void 0 : _a.length });
        setOpenDialogCreateChart(true);
    };
    var onRemoveFolder = function () {
        folderApi.deleteFolder(folder.id).then(function (newFolder) {
            setFolders(newFolder);
        });
    };
    var onRemoveFolderWithCharts = function () {
        folderApi.deleteFolderWithCharts(folder.id).then(function (newFolder) {
            setFolders(newFolder);
            if (currentChart.folderId == folder.id)
                resetCurrentChart(undefined);
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "border-t-[2px] " + (isOverLine ? 'border-indigo-400' : 'border-transparent') }),
        !folder.isShadow ? (React.createElement(collapsible_1.Collapsible, { ref: ref, open: isOpened || isOverFolder, onOpenChange: function () { return setIsOpened(!isOpened); }, className: "w-full collapsible-menu-sidebar", key: "folder-" + folder.id },
            React.createElement("div", { className: "flex items-center justify-between space-x-4 " + (isOverFolder ? "bg-muted" : "") },
                React.createElement(collapsible_1.CollapsibleTrigger, { asChild: true },
                    React.createElement("div", { className: "itemFolder flex justify-between items-center w-full cursor-pointer hover:bg-muted/85 pl-4" },
                        React.createElement("div", { className: "flex justify-start items-center" },
                            React.createElement(lucide_react_1.ChevronRight, { className: "icon-chevron", size: 16 }),
                            React.createElement("div", { className: "flex" }, isEditing ? (React.createElement("input", { ref: inputRef, className: "text-sm font-normal rounded bg-muted p-1 pl-2", type: "text", value: folderName, onChange: function (e) {
                                    setFolderName(e.target.value);
                                }, onBlur: handleOnBlur })) : (React.createElement("h4", { className: "p-1 pl-2 text-sm font-normal" }, folderName)))),
                        React.createElement(dropdown_menu_1.DropdownMenu, null,
                            React.createElement(dropdown_menu_1.DropdownMenuTrigger, { asChild: true },
                                React.createElement(button_1.Button, { variant: "ghost", size: "icon", className: " hover:bg-transparent focus:outline-none focus-visible:ring-0" },
                                    React.createElement(lucide_react_1.Ellipsis, { className: "ellipseButton hidden", size: 16 }))),
                            React.createElement(dropdown_menu_1.DropdownMenuContent, { className: "DropdownMenuContent", side: "bottom", align: "start" },
                                React.createElement(dropdown_menu_1.DropdownMenuGroup, null,
                                    React.createElement(dropdown_menu_1.DropdownMenuItem, { className: "DropdownMenuItem", onClick: function (event) { return handleCreateChart(event); } }, t('chart.newChartLong')),
                                    React.createElement(dropdown_menu_1.DropdownMenuItem, { className: "DropdownMenuItem", onClick: editFolder }, t('chart.renameFolder')),
                                    React.createElement(dropdown_menu_1.DropdownMenuSub, null,
                                        React.createElement(dropdown_menu_1.DropdownMenuSubTrigger, { className: "DropdownMenuSubTrigger" }, t("chart.delete")),
                                        React.createElement(dropdown_menu_1.DropdownMenuPortal, null,
                                            React.createElement(dropdown_menu_1.DropdownMenuSubContent, null,
                                                React.createElement(dropdown_menu_1.DropdownMenuItem, { className: "DropdownMenuItem", onClick: function (event) {
                                                        event.stopPropagation();
                                                        onRemoveFolder();
                                                    } }, t('chart.removeFolder')),
                                                React.createElement(dropdown_menu_1.DropdownMenuItem, { className: "DropdownMenuItem", onClick: function (event) {
                                                        event.stopPropagation();
                                                        onRemoveFolderWithCharts();
                                                    } }, t('chart.removeFolderWithCharts'))))))))))),
            React.createElement(collapsible_1.CollapsibleContent, { className: "w-full" }, (_b = folder.charts) === null || _b === void 0 ? void 0 :
                _b.map(function (chart, index) { return (React.createElement(ChartItem_1["default"], { key: index, index: index, chart: chart, folderId: folder.id })); }),
                React.createElement(ChartItem_1["default"], { key: (_c = folder === null || folder === void 0 ? void 0 : folder.charts) === null || _c === void 0 ? void 0 : _c.length, index: (_d = folder === null || folder === void 0 ? void 0 : folder.charts) === null || _d === void 0 ? void 0 : _d.length, folderId: folder.id })))) : (React.createElement(context_menu_1.ContextMenu, null,
            React.createElement(context_menu_1.ContextMenuTrigger, { className: 'flex flex-col h-full w-full min-h-4' },
                React.createElement("div", { ref: ref, draggable: false, className: "w-full h-[100%]  pb-48" },
                    React.createElement("div", { className: 'w-full' }, (_e = folder.charts) === null || _e === void 0 ? void 0 :
                        _e.map(function (chart, index) { return (React.createElement(ChartItem_1["default"], { key: index, index: index, chart: chart, folderId: folder.id, isShadow: true })); }),
                        React.createElement(ChartItem_1["default"], { key: (_f = folder === null || folder === void 0 ? void 0 : folder.charts) === null || _f === void 0 ? void 0 : _f.length, index: (_g = folder === null || folder === void 0 ? void 0 : folder.charts) === null || _g === void 0 ? void 0 : _g.length, folderId: folder.id }))))))));
};
exports["default"] = FolderItem;
