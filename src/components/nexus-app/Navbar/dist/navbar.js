'use client';
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
var badge_1 = require("@/components/ui/badge");
var button_1 = require("@/components/ui/button");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var sheet_1 = require("@/components/ui/sheet");
var fetch_1 = require("@/lib/fetch");
var appStore_1 = require("@/store/appStore");
var lucide_react_1 = require("lucide-react");
var next_intl_1 = require("next-intl");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var ListFolders_1 = require("../Sidebar/ListFolders");
var MarketingBlock_1 = require("../MarketingBlock/MarketingBlock");
var Navbar = function (_a) {
    var _b = _a.asSidebar, asSidebar = _b === void 0 ? true : _b;
    var t = next_intl_1.useTranslations('common');
    var router = navigation_1.useRouter();
    var appStore = appStore_1.useAppStore();
    var account = appStore.account;
    var handleLogout = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch_1.fetchData(process.env.NEXT_PUBLIC_BACKEND_URL + "auth/logout")];
                case 1:
                    response = _a.sent();
                    if (response === null || response === void 0 ? void 0 : response.ok) {
                        router.push('signin');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("header", { className: "fixed grid h-14 w-full grid-cols-[1fr_1fr] md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] items-center border-b px-4 lg:h-[60px] lg:px-6 bg-background " },
        react_1["default"].createElement("div", { className: "flex h-full items-center " + (asSidebar ? 'md:border-r' : '') },
            react_1["default"].createElement(link_1["default"], { href: '/dashboard', className: "hidden md:flex" },
                react_1["default"].createElement("h1", { className: "font-semibold" }, "Nexus")),
            react_1["default"].createElement(sheet_1.Sheet, null,
                react_1["default"].createElement(sheet_1.SheetTrigger, { asChild: true },
                    react_1["default"].createElement(button_1.Button, { variant: "outline", size: "icon", className: "shrink-0 md:hidden" },
                        react_1["default"].createElement(lucide_react_1.Menu, { className: "h-5 w-5" }))),
                react_1["default"].createElement(sheet_1.SheetContent, { side: "left", className: "flex flex-col items-center w-[350px]" },
                    react_1["default"].createElement(ListFolders_1["default"], null),
                    react_1["default"].createElement(MarketingBlock_1["default"], null)))),
        react_1["default"].createElement("div", { className: "flex justify-end items-center h-full" },
            react_1["default"].createElement(dropdown_menu_1.DropdownMenu, null,
                react_1["default"].createElement(dropdown_menu_1.DropdownMenuTrigger, { asChild: true },
                    react_1["default"].createElement(button_1.Button, { variant: "secondary", size: "icon", className: "rounded-full" },
                        react_1["default"].createElement(lucide_react_1.CircleUser, { className: "h-5 w-5" }))),
                react_1["default"].createElement(dropdown_menu_1.DropdownMenuContent, { align: "end" },
                    react_1["default"].createElement(dropdown_menu_1.DropdownMenuLabel, null,
                        t('profile'),
                        react_1["default"].createElement(badge_1.Badge, { className: "ml-4", variant: account === null || account === void 0 ? void 0 : account.status.toLowerCase() }, account === null || account === void 0 ? void 0 : account.status)),
                    react_1["default"].createElement(dropdown_menu_1.DropdownMenuSeparator, null),
                    react_1["default"].createElement(dropdown_menu_1.DropdownMenuItem, null,
                        react_1["default"].createElement(link_1["default"], { href: "/setting" }, t('settings'))),
                    react_1["default"].createElement(dropdown_menu_1.DropdownMenuSeparator, null),
                    react_1["default"].createElement(dropdown_menu_1.DropdownMenuItem, { onClick: handleLogout, className: "cursor-pointer" }, t('logout')))))));
};
exports["default"] = Navbar;
