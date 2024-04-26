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
exports.Folder = void 0;
var button_1 = require("@/components/ui/button");
var react_collapsible_1 = require("@radix-ui/react-collapsible");
var react_dropdown_menu_1 = require("@radix-ui/react-dropdown-menu");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var react_dnd_1 = require("react-dnd");
var folderItem_1 = require("./folderItem");
var folderStore_1 = require("@/store/folderStore");
var next_intl_1 = require("next-intl");
var action_1 = require("./action");
var fetch_1 = require("@/lib/fetch");
exports.Folder = function (_a) {
    var _b;
    var id = _a.id, index = _a.index, _c = _a.folder, folder = _c === void 0 ? '' : _c;
    var t = next_intl_1.useTranslations('chart');
    var moveFolders = folderStore_1["default"](function (state) { return state.moveFolders; });
    var removeFolderStore = folderStore_1["default"](function (state) { return state.removeFolder; });
    var ref = react_1.useRef(null);
    var inputRef = react_1.useRef(null);
    var _d = react_1.useState(folder.name), folderName = _d[0], setFolderName = _d[1];
    var _e = react_1.useState(false), isEditing = _e[0], setIsEditing = _e[1];
    react_1.useEffect(function () {
        document.addEventListener('click', handleClick);
        return function () {
            document.removeEventListener('click', handleClick);
        };
    }, [isEditing]);
    var _f = react_dnd_1.useDrop({
        accept: 'folder',
        drop: function (item, monitor) {
            if (!ref.current) {
                return;
            }
            var dragIndex = item.index;
            var hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex !== hoverIndex) {
                moveFolders(dragIndex, hoverIndex);
            }
        },
        collect: function (monitor) { return ({
            isOver: monitor.isOver()
        }); }
    }), isOver = _f[0].isOver, drop = _f[1];
    var _g = react_dnd_1.useDrag({
        type: 'folder',
        item: { id: id, index: index },
        canDrag: folder !== '',
        collect: function (monitor) { return ({
            isDragging: monitor.isDragging()
        }); }
    }, [folder, index]), drag = _g[1];
    drag(drop(ref));
    var handleClick = function (event) {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setIsEditing(false);
        }
    };
    var editFolder = function (event) {
        event.stopPropagation();
        setIsEditing(true);
    };
    var handleOnBlur = function () {
        //Update name in db
        var fetchDataAsync = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetch_1.fetchData(process.env.NEXT_PUBLIC_BACKEND_URL + "charts/rename-folder", {
                                body: JSON.stringify({
                                    id: folder.id,
                                    name: folderName
                                })
                            })];
                    case 1:
                        response = _a.sent();
                        if (response.ok) {
                            setIsEditing(false);
                        }
                        else {
                            console.error('Failed to update folder name');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('An error occurred', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        if (folder.name === folderName)
            return;
        folder.name = folderName;
        fetchDataAsync();
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "border-t-[2px] " + (isOver ? 'border-indigo-400' : 'border-transparent') }),
        folder ? (React.createElement(react_collapsible_1.Collapsible, { onDoubleClick: function (e) {
                e.stopPropagation();
            }, ref: ref, className: "w-full collapsible-menu-sidebar", key: "folder-" + id },
            React.createElement("div", { className: "flex items-center justify-between space-x-4" },
                React.createElement(react_collapsible_1.CollapsibleTrigger, { asChild: true },
                    React.createElement("div", { className: "flex justify-between items-center w-full cursor-pointer hover:bg-muted/85 px-4" },
                        React.createElement("div", { className: "flex justify-start items-center" },
                            React.createElement(lucide_react_1.ChevronRight, { className: "icon-chevron", size: 16 }),
                            React.createElement("div", { className: "flex" }, isEditing ? (React.createElement("input", { ref: inputRef, className: "text-sm font-normal rounded bg-muted p-1 pl-2", type: "text", value: folderName, onClick: function (e) { return e.stopPropagation(); }, onChange: function (e) {
                                    setFolderName(e.target.value);
                                }, onBlur: handleOnBlur, autoFocus: true })) : (React.createElement("h4", { className: "p-1 pl-2 text-sm font-normal" }, folder.name)))),
                        React.createElement(react_dropdown_menu_1.DropdownMenu, null,
                            React.createElement(react_dropdown_menu_1.DropdownMenuTrigger, { asChild: true },
                                React.createElement(button_1.Button, { variant: "ghost", size: "icon", className: " hover:bg-transparent focus:outline-none focus-visible:ring-0" },
                                    React.createElement(lucide_react_1.Ellipsis, { className: "ellipseButton hidden", size: 16 }))),
                            React.createElement(react_dropdown_menu_1.DropdownMenuContent, { className: "DropdownMenuContent", side: "bottom", align: "start" },
                                React.createElement(react_dropdown_menu_1.DropdownMenuGroup, null,
                                    React.createElement(react_dropdown_menu_1.DropdownMenuItem, { className: "DropdownMenuItem", onClick: editFolder }, t('renameFolder')),
                                    React.createElement(react_dropdown_menu_1.DropdownMenuItem, { className: "DropdownMenuItem", onClick: function (event) {
                                            event.stopPropagation();
                                            action_1.removeFolder(folder.id, removeFolderStore);
                                        } }, t('removeFolder')))))))),
            React.createElement(react_collapsible_1.CollapsibleContent, { className: "w-full" }, (_b = folder.charts) === null || _b === void 0 ? void 0 : _b.map(function (chart, index) { return (React.createElement(folderItem_1["default"], { key: index, name: chart.name, index: index, id: id, folderId: folder.id })); })))) : (React.createElement("div", { ref: ref, draggable: false, className: "w-full h-[100%]" },
            React.createElement(folderItem_1["default"], { key: 10000, index: 10000, id: 10000 })))));
};
