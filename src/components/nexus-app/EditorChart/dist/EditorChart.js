"use strict";
exports.__esModule = true;
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var EditorChart = function (_a) {
    var chart = _a.chart;
    var t = next_intl_1.useTranslations("");
    return (react_1["default"].createElement("div", { className: "flex flex-col gap-4 h-full p-4" },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", { className: "flex justify-between items-center" },
                react_1["default"].createElement("h3", { className: "text-lg font-semibold" }, chart.title),
                react_1["default"].createElement("div", { className: 'flex gap-2' },
                    react_1["default"].createElement(button_1.Button, { variant: "outline" }, t("chart.save")),
                    react_1["default"].createElement(button_1.Button, null, t("chart.publish"))))),
        react_1["default"].createElement("div", { className: 'grid grid-cols-1 lg:grid-cols-8 gap-2' },
            react_1["default"].createElement(card_1.Card, { className: 'col-span-1 lg:col-span-5' },
                react_1["default"].createElement(card_1.CardContent, null,
                    react_1["default"].createElement("div", { className: "flex justify-center items-center h-[500px]" },
                        react_1["default"].createElement("h3", { className: "text-xl font-semibold" }, "Editor Chart")))),
            react_1["default"].createElement(card_1.Card, { className: 'col-span-1 lg:col-span-3' },
                react_1["default"].createElement(card_1.CardContent, null,
                    react_1["default"].createElement("div", { className: "flex justify-center items-center h-[500px]" },
                        react_1["default"].createElement("h3", { className: "text-xl font-semibold" }, "Setting Chart")))))));
};
exports["default"] = EditorChart;
