'use client';
"use strict";
exports.__esModule = true;
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var next_intl_1 = require("next-intl");
var utils_1 = require("@/lib/utils");
var store_1 = require("@/store/store");
var react_1 = require("react");
require("./style.scss");
var menuChart_1 = require("./menuChart");
var Sidebar = function (_a) {
    var _b;
    var children = _a.children, className = _a.className;
    var t = next_intl_1.useTranslations('common');
    var appStore = store_1.useAppStore();
    var accountStatus = (_b = appStore.account) === null || _b === void 0 ? void 0 : _b.status;
    return (react_1["default"].createElement("aside", { className: utils_1.cn(' hidden md:flex  flex-col justify-between h-full w-full border-r bg-background overflow-hidden', className) },
        react_1["default"].createElement(menuChart_1["default"], null),
        accountStatus === 'FREE' && (react_1["default"].createElement("div", { className: "mt-auto p-4" },
            react_1["default"].createElement(card_1.Card, null,
                react_1["default"].createElement(card_1.CardHeader, null,
                    react_1["default"].createElement(card_1.CardTitle, null, t('upgrade-title')),
                    react_1["default"].createElement(card_1.CardDescription, null, t('upgrade-description'))),
                react_1["default"].createElement(card_1.CardContent, null,
                    react_1["default"].createElement(button_1.Button, { size: "sm", className: "w-full" }, t('upgrade-button'))))))));
};
exports["default"] = Sidebar;
