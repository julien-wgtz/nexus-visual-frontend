"use strict";
exports.__esModule = true;
var react_1 = require("react");
var LegendCustom = function (props) {
    var config = props.config, styles = props.styles, type = props.type, payload = props.payload, setOpacityAll = props.setOpacityAll;
    var _a = react_1.useState(""), align = _a[0], setAlign = _a[1];
    react_1.useEffect(function () {
        if (config.legend.align === "center") {
            setAlign("center");
        }
        else if (config.legend.align === "left") {
            setAlign("start");
        }
        else {
            setAlign("end");
        }
    }, [config, styles]);
    var handleMouseEnter = function (o) {
        var dataKey = o.dataKey;
        console.log("enter", dataKey);
        setOpacityAll(dataKey);
    };
    var handleMouseLeave = function (o) {
        var dataKey = o.dataKey;
        console.log("leave", dataKey);
        setOpacityAll();
    };
    return (react_1["default"].createElement("ul", { className: 'flex flex-wrap gap-3 pt-6', style: { justifyContent: align } }, payload.map(function (entry, index) { return (react_1["default"].createElement("li", { className: 'flex items-center cursor-pointer ', onMouseEnter: function () { return handleMouseEnter(entry); }, onMouseLeave: function () { return handleMouseLeave(entry); }, key: "item-" + index },
        react_1["default"].createElement("svg", { width: "14", height: "14", viewBox: "0 0 32 32", style: { display: "inline-block", verticalAlign: "middle", marginRight: "4px" } },
            react_1["default"].createElement("path", { "stroke-width": "4", fill: "none", stroke: styles.colors[index].color, d: "M0,16h10.666666666666666\n            A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16\n            H32M21.333333333333332,16\n            A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16" })),
        react_1["default"].createElement("p", { style: {
                color: styles.colors[index].color,
                fontSize: styles.fontSize,
                fontWeight: styles.fontWeight
            } }, entry.value))); })));
};
exports["default"] = LegendCustom;
