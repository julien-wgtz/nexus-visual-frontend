"use strict";
exports.__esModule = true;
exports.DropZone = void 0;
var react_dnd_1 = require("react-dnd");
var react_1 = require("react");
exports.DropZone = function (_a) {
    var onDrop = _a.onDrop, children = _a.children, index = _a.index;
    var ref = react_1.useRef(null);
    var _b = react_dnd_1.useDrop({
        accept: 'folder',
        drop: function (item) {
            onDrop(item.index, index);
        },
        collect: function (monitor) {
            return {
                isOver: !!monitor.isOver()
            };
        },
        hover: function (item, monitor) {
            console.log(item, monitor);
        }
    }), isOver = _b[0].isOver, drop = _b[1];
    drop(ref); // Associe le ref du DOM avec le Drop Target
    return (React.createElement("div", { className: "h-full", ref: ref, style: { background: isOver ? 'lightblue' : 'transparent' } }, children));
};
