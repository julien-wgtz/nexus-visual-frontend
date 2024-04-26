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
var react_1 = require("react");
var react_beautiful_dnd_1 = require("react-beautiful-dnd");
var collapsible_1 = require("@/components/ui/collapsible");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var next_intl_1 = require("next-intl");
var store_1 = require("@/store/store");
var fetch_1 = require("@/lib/fetch");
var Folder = function (_a) {
    var children = _a.children, folder = _a.folder, index = _a.index;
    var t = next_intl_1.useTranslations('common');
    var appStore = store_1.useAppStore();
    var account = appStore.account;
    var removeFolder = function (folderId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, newFolders, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch_1.fetchData(process.env.NEXT_PUBLIC_BACKEND_URL + "charts/delete-folder", {
                            body: JSON.stringify({
                                id: folderId
                            })
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        newFolders = folders.filter(function (folder) { return folder.id !== folderId; });
                        // setFolders(newFolders);
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
    return (react_1["default"].createElement(react_beautiful_dnd_1.Draggable, { draggableId: folder.id.toString(), index: index }, function (provided) { return (react_1["default"].createElement(collapsible_1.Collapsible, __assign({ ref: provided.innerRef }, provided.draggableProps, provided.dragHandleProps, { className: "w-full collapsible-menu-sidebar", key: "folder-" + folder.id }),
        react_1["default"].createElement("div", { className: "flex items-center justify-between space-x-4" },
            react_1["default"].createElement(collapsible_1.CollapsibleTrigger, { asChild: true },
                react_1["default"].createElement("div", { className: "flex justify-between items-center w-full cursor-pointer hover:bg-muted/85 px-4" },
                    react_1["default"].createElement("div", { className: "flex justify-start items-center gap-2 py-2" },
                        react_1["default"].createElement(lucide_react_1.ChevronRight, { className: "icon-chevron", size: 16 }),
                        react_1["default"].createElement("h4", { className: "text-sm font-normal" }, folder.name)),
                    react_1["default"].createElement(dropdown_menu_1.DropdownMenu, null,
                        react_1["default"].createElement(dropdown_menu_1.DropdownMenuTrigger, { asChild: true },
                            react_1["default"].createElement(button_1.Button, { variant: "ghost", size: "icon", className: " hover:bg-transparent focus:outline-none focus-visible:ring-0" },
                                react_1["default"].createElement(lucide_react_1.Ellipsis, { className: "ellipseButton hidden", size: 16 }))),
                        react_1["default"].createElement(dropdown_menu_1.DropdownMenuContent, { className: "DropdownMenuContent", side: "bottom", align: "start" },
                            react_1["default"].createElement(dropdown_menu_1.DropdownMenuGroup, null,
                                react_1["default"].createElement(dropdown_menu_1.DropdownMenuItem, { className: "DropdownMenuItem" }, t('renameFolder')),
                                react_1["default"].createElement(dropdown_menu_1.DropdownMenuItem, { className: "DropdownMenuItem", onClick: function (event) {
                                        event.stopPropagation();
                                        removeFolder(folder.id);
                                    } }, t('removeFolder'))))))),
            react_1["default"].createElement(collapsible_1.CollapsibleContent, null, children)))); }));
};
exports["default"] = Folder;
