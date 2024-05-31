"use strict";
exports.__esModule = true;
var button_1 = require("@/components/ui/button");
var appStore_1 = require("@/store/appStore");
var lucide_react_1 = require("lucide-react");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var skeleton_1 = require("@/components/ui/skeleton");
var folderStore_1 = require("@/store/folderStore");
var react_dnd_1 = require("react-dnd");
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
var FolderItem_1 = require("./FolderItem");
require("./style.scss");
var dashboardStore_1 = require("@/store/dashboardStore");
var folder_1 = require("@/data/model/folder");
var ListFolders = function (props) {
    var t = next_intl_1.useTranslations('chart');
    var accountId = appStore_1.useAppStore(function (state) { return state.accountId; });
    var folderApi = new folder_1["default"]();
    var folders = folderStore_1["default"](function (state) { return state.folders; });
    var setFolders = folderStore_1["default"](function (state) { return state.setFolders; });
    var addFolder = folderStore_1["default"](function (state) { return state.addFolder; });
    var setOpenDialogCreateChart = dashboardStore_1["default"](function (state) { return state.setDialogIsOpen; });
    var setDataForChart = dashboardStore_1["default"](function (state) { return state.setDataForChart; });
    var _a = react_1.useState(true), loading = _a[0], setLoading = _a[1];
    react_1.useEffect(function () {
        if (accountId === null)
            return;
        folderApi.getAllFolders(accountId).then(function (folders) {
            setFolders(folders);
            setLoading(false);
        });
    }, [accountId]);
    var onCreateFolder = function () {
        folderApi.createFolder({ accountId: accountId, order: folders.length - 1, name: t("newFolderLong") }).then(function (folder) {
            addFolder(folder);
        });
    };
    var onCreateChart = function (id, order) {
        if (order === void 0) { order = 0; }
        setDataForChart({ id: id, order: order });
        setOpenDialogCreateChart(true);
    };
    return (react_1["default"].createElement("div", { className: 'flex flex-col h-full w-full pt-4 overflow-hidden' },
        react_1["default"].createElement("div", { className: "flex justify-end pb-4 px-4 gap-2" },
            react_1["default"].createElement(button_1.Button, { className: "gap-2", variant: "outline", size: "sm", onClick: function () { var _a, _b, _c; return onCreateChart((_a = folders[folders.length - 1]) === null || _a === void 0 ? void 0 : _a.id, (_c = (_b = folders[folders.length - 1]) === null || _b === void 0 ? void 0 : _b.charts) === null || _c === void 0 ? void 0 : _c.length); } },
                react_1["default"].createElement(lucide_react_1.Plus, { size: '16' }),
                t('newChart')),
            react_1["default"].createElement(button_1.Button, { className: "gap-2", variant: "default", size: "sm", onClick: onCreateFolder },
                react_1["default"].createElement(lucide_react_1.FolderPlus, { size: '16' }),
                t('newFolder'))),
        react_1["default"].createElement("div", { className: 'flex flex-col w-full h-full overflow-hidden' }, loading ? (react_1["default"].createElement("div", { className: "flex flex-col gap-2 pl-4" },
            react_1["default"].createElement("div", { className: "flex justify-start items-center gap-2 py-2" },
                react_1["default"].createElement(lucide_react_1.ChevronRight, { className: "icon-chevron", size: 16 }),
                react_1["default"].createElement(skeleton_1.Skeleton, { className: "h-[20px] w-1/2 " })),
            react_1["default"].createElement("div", { className: "flex justify-start items-center gap-2 py-2" },
                react_1["default"].createElement(lucide_react_1.ChevronRight, { className: "icon-chevron", size: 16 }),
                react_1["default"].createElement(skeleton_1.Skeleton, { className: "h-[20px] w-1/3 " })),
            react_1["default"].createElement("div", { className: "flex justify-start items-center gap-2 py-2" },
                react_1["default"].createElement(lucide_react_1.ChevronRight, { className: "icon-chevron", size: 16 }),
                react_1["default"].createElement(skeleton_1.Skeleton, { className: "h-[20px] w-2/5 " })))) : (react_1["default"].createElement("div", { className: 'flex flex-col h-full overflow-scroll' },
            react_1["default"].createElement(react_dnd_1.DndProvider, { backend: react_dnd_html5_backend_1.HTML5Backend }, folders === null || folders === void 0 ? void 0 : folders.map(function (folder, index) { return (react_1["default"].createElement(FolderItem_1["default"], { key: folder.id, index: index, folder: folder })); })))))));
};
exports["default"] = ListFolders;
