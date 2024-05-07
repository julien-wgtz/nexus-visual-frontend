"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var button_1 = require("@/components/ui/button");
var fetch_1 = require("@/lib/fetch");
var appStore_1 = require("@/store/appStore");
var lucide_react_1 = require("lucide-react");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var skeleton_1 = require("@/components/ui/skeleton");
var folderStore_1 = require("@/store/folderStore");
var react_dnd_1 = require("react-dnd");
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
var action_1 = require("./action");
var FolderItem_1 = require("./FolderItem");
require("./style.scss");
var dashboardStore_1 = require("@/store/dashboardStore");
var ListFolders = function (props) {
    var t = next_intl_1.useTranslations('chart');
    var accountId = appStore_1.useAppStore(function (state) { return state.accountId; });
    var folders = folderStore_1["default"](function (state) { return state.folders; });
    var setFolders = folderStore_1["default"](function (state) { return state.setFolders; });
    var addFolder = folderStore_1["default"](function (state) { return state.addFolder; });
    var setOpenDialogCreateChart = dashboardStore_1["default"](function (state) { return state.setDialogIsOpen; });
    var setDataForChart = dashboardStore_1["default"](function (state) { return state.setDataForChart; });
    var _a = react_1.useState(true), loading = _a[0], setLoading = _a[1];
    var _b = react_1.useState([]), foldersSort = _b[0], setFoldersSort = _b[1];
    var sortFolders = function (folders) {
        var sortByOrder = function (objects) {
            return objects.sort(function (a, b) { return a.order - b.order; });
        };
        var folderToSort = __spreadArrays(folders);
        folderToSort.map(function (folder) {
            if (folder.chart) {
                folder.chart = sortByOrder(folder.charts);
            }
        });
        return sortByOrder(folderToSort);
    };
    // Fetch all folder and chart
    react_1.useEffect(function () {
        if (accountId === null)
            return;
        try {
            var fetchDataAsync = function () { return __awaiter(void 0, void 0, void 0, function () {
                var response, folders_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch_1.fetchData(process.env.NEXT_PUBLIC_BACKEND_URL + "charts/get-folders", {
                                body: JSON.stringify({
                                    accountId: accountId
                                })
                            })];
                        case 1:
                            response = _a.sent();
                            if (!response.ok) return [3 /*break*/, 3];
                            return [4 /*yield*/, response.json()];
                        case 2:
                            folders_1 = _a.sent();
                            setFolders(folders_1);
                            setLoading(false);
                            return [3 /*break*/, 4];
                        case 3:
                            console.error('Failed to fetch folders');
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            }); };
            fetchDataAsync();
        }
        catch (error) {
            console.error('An error occurred', error);
        }
    }, [accountId]);
    react_1.useEffect(function () {
        setFoldersSort(sortFolders(folders));
    }, [folders]);
    var removeItemAndUpdateOrder = function (indexToRemove) { return __awaiter(void 0, void 0, void 0, function () {
        var updatedItems;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updatedItems = __spreadArrays(foldersSort);
                    return [4 /*yield*/, action_1.removeFolder(foldersSort[indexToRemove].id, foldersSort[folders.length - 1].id)];
                case 1:
                    _a.sent();
                    updatedItems.splice(indexToRemove, 1);
                    updatedItems.forEach(function (item, index) {
                        if (item.order === index || item.isShadow)
                            return;
                        item.order = index;
                        action_1.updateFolderOrder(item.id, index);
                    });
                    setFolders(updatedItems);
                    return [2 /*return*/, updatedItems];
            }
        });
    }); };
    var onCreateChart = function (id, order) {
        if (order === void 0) { order = 0; }
        setDataForChart({ id: id, order: order });
        setOpenDialogCreateChart(true);
    };
    return (react_1["default"].createElement("div", { className: 'flex flex-col h-full w-full pt-4 overflow-hidden' },
        react_1["default"].createElement("div", { className: "flex justify-end pb-4 px-4 gap-2" },
            react_1["default"].createElement(button_1.Button, { className: "gap-2", variant: "outline", size: "sm", onClick: function () { var _a, _b, _c; return onCreateChart((_a = foldersSort[foldersSort.length - 1]) === null || _a === void 0 ? void 0 : _a.id, (_c = (_b = foldersSort[foldersSort.length - 1]) === null || _b === void 0 ? void 0 : _b.charts) === null || _c === void 0 ? void 0 : _c.length); } },
                react_1["default"].createElement(lucide_react_1.Plus, { size: '16' }),
                t('newChart')),
            react_1["default"].createElement(button_1.Button, { className: "gap-2", variant: "default", size: "sm", onClick: function () { return action_1.createFolder(t('newFolderLong'), accountId, folders.length, addFolder); } },
                react_1["default"].createElement(lucide_react_1.FolderPlus, { size: '16' }),
                t('newFolder'))),
        react_1["default"].createElement("div", { className: 'flex flex-col w-full h-full overflow-hidden' }, loading ? (react_1["default"].createElement("div", { className: "flex flex-col gap-2" },
            react_1["default"].createElement("div", { className: "flex justify-start items-center gap-2 py-2" },
                react_1["default"].createElement(lucide_react_1.ChevronRight, { className: "icon-chevron", size: 16 }),
                react_1["default"].createElement(skeleton_1.Skeleton, { className: "h-[20px] w-1/2 " })),
            react_1["default"].createElement("div", { className: "flex justify-start items-center gap-2 py-2" },
                react_1["default"].createElement(lucide_react_1.ChevronRight, { className: "icon-chevron", size: 16 }),
                react_1["default"].createElement(skeleton_1.Skeleton, { className: "h-[20px] w-1/3 " })),
            react_1["default"].createElement("div", { className: "flex justify-start items-center gap-2 py-2" },
                react_1["default"].createElement(lucide_react_1.ChevronRight, { className: "icon-chevron", size: 16 }),
                react_1["default"].createElement(skeleton_1.Skeleton, { className: "h-[20px] w-2/5 " })))) : (react_1["default"].createElement("div", { className: 'flex flex-col h-full overflow-scroll' },
            react_1["default"].createElement(react_dnd_1.DndProvider, { backend: react_dnd_html5_backend_1.HTML5Backend }, foldersSort.map(function (folder, index) { return (react_1["default"].createElement(FolderItem_1.FolderItem, { key: folder.id, index: index, folder: folder, foldersSort: foldersSort, onCreateChart: onCreateChart, onRemoveFolder: function () { return removeItemAndUpdateOrder(index); }, onCreateFolder: function () { return action_1.createFolder(t('newFolderLong'), accountId, folders.length, addFolder); } })); })))))));
};
exports["default"] = ListFolders;
{ /* <ContextMenu>
      <ContextMenuTrigger className="flex flex-col w-full h-full md:p-0 overflow-hidden">
        <div className="flex justify-end gap-2 p-2 md:p-4">
          <Button onClick={() => onCreateChart(folders[folderShadowIndex]?.id, folders[folderShadowIndex]?.charts?.length)} className="gap-2" variant="outline" size="sm">
            <Plus size={'16'} />
            {t('newChart')}
          </Button>
          <Button
            className="gap-2"
            variant="default"
            size="sm"
            onClick={  ()  => createFolder(
              t('newFolderLong'),
              account.id,
              folders.length -1,
              addFolder
            )}
          >
            <FolderPlus size={'16'} />
            {t('newFolder')}
          </Button>
        </div>
        <div className="flex flex-col w-full h-full overflow-scroll ">
          {!loadingFolders ? (
            <div className="flex flex-col gap-2 px-4">
              <div className="flex justify-start items-center gap-2 py-2">
                <ChevronRight className="icon-chevron" size={16} />
                <Skeleton className="h-[20px] w-1/2 " />
              </div>
              <div className="flex justify-start items-center gap-2 py-2">
                <ChevronRight className="icon-chevron" size={16} />
                <Skeleton className="h-[20px] w-1/3 " />
              </div>
              <div className="flex justify-start items-center gap-2 py-2">
                <ChevronRight className="icon-chevron" size={16} />
                <Skeleton className="h-[20px] w-2/5 " />
              </div>
            </div>
          ) : (
            <DndProvider backend={HTML5Backend}>
              {folderReorder.map((folder: any, index: number) => (
                <Folder
                  key={folder.id}
                  id={folder.id}
                  index={index}
                  folder={folder}
                  onCreateChart={onCreateChart}
                ></Folder>
              ))}
            </DndProvider>
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="ContextMenuContent">
        <ContextMenuItem className="ContextMenuItem" onClick={() => {onCreateChart(folders[folderShadowIndex].id, folders[folderShadowIndex].charts?.length)}}>
          {t('newChartLong')}
        </ContextMenuItem>
        <ContextMenuItem
          className="ContextMenuItem"
          onClick={() =>
            createFolder(
              t('newFolderLong'),
              account.id,
              folders.length -1,
              addFolder
            )
          }
        >
          {t('newFolderLong')}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu> */
}
//   const appStore: any = useAppStore();
// const account = appStore.account;
// const folders = useFolderStore((state) => state.folders);
// const setFolders = useFolderStore((state) => state.updateFolders);
// const addFolder = useFolderStore((state) => state.addFolder);
// const updateFolders = useFolderStore((state) => state.updateFolders);
// const [loadingFolders, setLoadingFolders] = useState(false);
// const [folderReorder, setFolderReorder] = useState<any[]>([]);
// const [folderShadowIndex, setFolderShadowIndex] = useState<number>(0);
// const setOpenDialogCreateChart = useDashboardStore((state) => state.setDialogIsOpen);
// const setDataForChart = useDashboardStore((state) => state.setDataForChart);
// const reorderFolders = (f: any[]) => {
//   const newFolders = [...f];
//   newFolders.sort((a, b) => {
//     if (a.order === b.order) {
//       b.order += 1;
//     }
//     return a.order - b.order;
//   });
//   return newFolders;
// };
// useEffect(() => {
//   setFolderReorder(reorderFolders(folders));
//   const shadowFolder = folders.find((folder: any) => folder.isShadow);
//   const index = folders.indexOf(shadowFolder);
//   setFolderShadowIndex(index);
// }, [folders])
// useEffect(() => {
//   // SI account est égale à null donc le user n'est pas connecté mais à encore son token comment faire
//   if (account === null) return;
//   try {
//     const fetchDataAsync = async () => {
//       const response = await fetchData(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}charts/get-folders`,
//         {
//           body: JSON.stringify({
//             accountId: appStore.account.id,
//           }),
//         }
//       );
//       if (response.ok) {
//         const folders = await response.json();
//         const folderOrder = reorderFolders(folders);
//         updateFolders(folderOrder);
//         setFolders(folderOrder);
//         setLoadingFolders(true);
//       } else {
//         console.error('Failed to fetch folders');
//       }
//     };
//     fetchDataAsync();
//   } catch (error) {
//     console.error('An error occurred', error);
//   }
// }, [account]);
// const onCreateChart = (id: number, order: number = 0) => {
//   setDataForChart({id, order})
//   setOpenDialogCreateChart(true);
// }
