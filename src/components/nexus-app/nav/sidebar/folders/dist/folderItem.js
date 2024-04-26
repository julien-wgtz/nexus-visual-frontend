"use strict";
exports.__esModule = true;
var button_1 = require("@/components/ui/button");
var react_1 = require("react");
var react_dnd_1 = require("react-dnd");
var FolderItem = function (_a) {
    var index = _a.index, name = _a.name, id = _a.id, folderId = _a.folderId;
    var ref = react_1.useRef(null);
    var _b = react_dnd_1.useDrop({
        accept: 'files',
        drop: function (item, monitor) {
            if (!ref.current) {
                return;
            }
            var dragIndex = item.index;
            var hoverIndex = index;
            if (dragIndex !== hoverIndex) {
                // TODO Réorganiser le chart dans le folder et dans les autres folders si déplacé
                // moveFolders(dragIndex, hoverIndex);
            }
        },
        collect: function (monitor) { return ({
            isOver: monitor.isOver()
        }); }
    }), isOver = _b[0].isOver, drop = _b[1];
    var _c = react_dnd_1.useDrag({
        type: 'files',
        item: { id: id, index: index },
        canDrag: folderId !== undefined,
        collect: function (monitor) { return ({
            isDragging: monitor.isDragging()
        }); }
    }, [folderId, index]), drag = _c[1];
    drag(drop(ref));
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { style: { border: "1px solid " + (isOver ? 'blue' : 'transparent') } }),
        name ? (react_1["default"].createElement(button_1.Button, { ref: ref, className: "w-full flex justify-start font-normal rounded-none px-10", variant: "ghost", size: "sm" }, name)) : (react_1["default"].createElement("div", { ref: ref, draggable: false, className: "w-full h-[100%]" }))));
};
exports["default"] = FolderItem;
