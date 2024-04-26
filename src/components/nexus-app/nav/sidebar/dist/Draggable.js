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
exports.__esModule = true;
exports.Draggable = void 0;
var react_1 = require("react");
var core_1 = require("@dnd-kit/core");
function Draggable(props) {
    var _a = core_1.useDraggable({
        id: 'draggable'
    }), attributes = _a.attributes, listeners = _a.listeners, setNodeRef = _a.setNodeRef, transform = _a.transform;
    var style = transform
        ? {
            transform: "translate3d(" + transform.x + "px, " + transform.y + "px, 0)"
        }
        : undefined;
    return (react_1["default"].createElement("div", __assign({ ref: setNodeRef, style: style }, listeners, attributes), props.children));
}
exports.Draggable = Draggable;
