'use client';
"use strict";
exports.__esModule = true;
var utils_1 = require("@/lib/utils");
var react_1 = require("react");
require("./style.scss");
var MarketingBlock_1 = require("../MarketingBlock/MarketingBlock");
var ListFolders_1 = require("./ListFolders");
var Sidebar = function (_a) {
    var children = _a.children, className = _a.className;
    return (react_1["default"].createElement("aside", { className: utils_1.cn('fixed  md:w-[236px] lg:w-[304px] hidden md:flex  flex-col justify-between h-full w-full border-r bg-background overflow-hidden', className) },
        react_1["default"].createElement(ListFolders_1["default"], null),
        react_1["default"].createElement(MarketingBlock_1["default"], null)));
};
exports["default"] = Sidebar;
