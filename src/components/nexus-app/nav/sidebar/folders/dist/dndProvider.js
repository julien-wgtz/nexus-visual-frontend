"use strict";
exports.__esModule = true;
var react_dnd_1 = require("react-dnd");
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
var DnDProvider = function (_a) {
    var children = _a.children;
    return React.createElement(react_dnd_1.DndProvider, { backend: react_dnd_html5_backend_1.HTML5Backend }, children);
};
exports["default"] = DnDProvider;
