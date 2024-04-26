"use strict";
exports.__esModule = true;
exports.Droppable = void 0;
var react_1 = require("react");
var core_1 = require("@dnd-kit/core");
function Droppable(props) {
    var _a = core_1.useDroppable({
        id: 'droppable'
    }), isOver = _a.isOver, setNodeRef = _a.setNodeRef;
    var style = {
        color: isOver ? 'green' : undefined
    };
    return (react_1["default"].createElement("div", { ref: setNodeRef, style: style }, props.children));
}
exports.Droppable = Droppable;
