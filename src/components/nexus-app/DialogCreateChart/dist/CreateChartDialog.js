"use client";
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
var button_1 = require("@/components/ui/button");
var dialog_1 = require("@/components/ui/dialog");
var dashboardStore_1 = require("@/store/dashboardStore");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var step1_1 = require("./step1");
var step2_1 = require("./step2");
var appStore_1 = require("@/store/appStore");
var stepConnectNotion_1 = require("./stepConnectNotion");
var folderStore_1 = require("@/store/folderStore");
var chart_1 = require("@/data/model/chart");
var CreateChartDialog = function (_a) {
    var t = next_intl_1.useTranslations('');
    var account = appStore_1.useAppStore(function (state) { return state.account; });
    var chartApi = new chart_1["default"]();
    var dataForChart = dashboardStore_1["default"](function (state) { return state.dataForChart; });
    var addChart = folderStore_1["default"](function (state) { return state.addChart; });
    var setCurrentChart = dashboardStore_1["default"](function (state) { return state.setCurrentChart; });
    var setCurrentFolder = dashboardStore_1["default"](function (state) { return state.setCurrentFolder; });
    var isOpen = dashboardStore_1["default"](function (state) { return state.dialogIsOpen; });
    var setIsOpen = dashboardStore_1["default"](function (state) { return state.setDialogIsOpen; });
    var _b = react_1.useState({}), chart = _b[0], setChart = _b[1];
    var _c = react_1.useState(0), step = _c[0], setStep = _c[1];
    var disableNextButton = function () {
        if (step === 0 && chart.type)
            return false;
        if (step === 1 && chart.database)
            return false;
        else
            return true;
    };
    react_1.useEffect(function () {
        return function () {
            setChart({});
            setStep(0);
        };
    }, [isOpen]);
    var addDataToChart = function (data) {
        setChart(__assign(__assign({}, chart), data));
    };
    var onSubmit = function () {
        chartApi.createChart({
            folderId: dataForChart.id,
            title: t('chart.newChartLong'),
            type: chart.type,
            databaseId: chart.database
        }).then(function (res) {
            addChart(res);
            setCurrentChart(res);
            setCurrentFolder(dataForChart.id);
            setIsOpen(false);
        });
    };
    //TODO Sinon flow de connexion notion à faire une fois que l'integration notion est en publique
    return (react_1["default"].createElement(dialog_1.Dialog, { open: isOpen, onOpenChange: function () { return setIsOpen(!isOpen); } },
        react_1["default"].createElement(dialog_1.DialogContent, { className: "lg:max-w-[750px]" },
            step === 0 && (react_1["default"].createElement(step1_1["default"], { chartType: chart.type, setChart: addDataToChart })),
            step === 1 && account.notionToken && (react_1["default"].createElement(step2_1["default"], { chartDatabase: chart.database, setChart: addDataToChart })),
            step === 1 && !account.notionToken && (react_1["default"].createElement(stepConnectNotion_1["default"], { setChart: setChart })),
            react_1["default"].createElement(dialog_1.DialogFooter, null,
                step > 0 && (react_1["default"].createElement(button_1.Button, { variant: "secondary", onClick: function () { return setStep(step - 1); } }, t("common.previous"))),
                step == 1 ? (react_1["default"].createElement(button_1.Button, { disabled: disableNextButton(), onClick: onSubmit, type: "submit" }, t("common.confirm"))) : (react_1["default"].createElement(button_1.Button, { disabled: disableNextButton(), onClick: function () { return setStep(step + 1); }, type: "submit" }, t("common.next")))))));
};
exports["default"] = CreateChartDialog;
