"use strict";
exports.__esModule = true;
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var appStore_1 = require("@/store/appStore");
var next_intl_1 = require("next-intl");
var AccountEnum_1 = require("@/type/AccountEnum");
var MarketingBlock = function (props) {
    var t = next_intl_1.useTranslations('common');
    var accountStatus = appStore_1.useAppStore(function (state) { return state.status; });
    return (react_1["default"].createElement(react_1["default"].Fragment, null, accountStatus === AccountEnum_1.AccountStatus.FREE && (react_1["default"].createElement("div", { className: "mt-auto p-4" },
        react_1["default"].createElement(card_1.Card, null,
            react_1["default"].createElement(card_1.CardHeader, null,
                react_1["default"].createElement(card_1.CardTitle, null, t('upgrade-title')),
                react_1["default"].createElement(card_1.CardDescription, null, t('upgrade-description'))),
            react_1["default"].createElement(card_1.CardContent, null,
                react_1["default"].createElement(button_1.Button, { size: "sm", className: "w-full" }, t('upgrade-button'))))))));
};
exports["default"] = MarketingBlock;
