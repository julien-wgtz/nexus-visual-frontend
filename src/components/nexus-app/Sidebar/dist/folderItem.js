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
exports.__esModule = true;
exports.FolderItem = void 0;
var react_1 = require("react");
var react_dnd_1 = require("react-dnd");
var ChartItem_1 = require("./ChartItem");
var next_intl_1 = require("next-intl");
var context_menu_1 = require("@/components/ui/context-menu");
var collapsible_1 = require("@/components/ui/collapsible");
var lucide_react_1 = require("lucide-react");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var button_1 = require("@/components/ui/button");
var action_1 = require("./action");
var folderStore_1 = require("@/store/folderStore");
exports.FolderItem = function (_a) {
    var _b, _c;
    var index = _a.index, folder = _a.folder, onCreateChart = _a.onCreateChart, onCreateFolder = _a.onCreateFolder, onRemoveFolder = _a.onRemoveFolder, foldersSort = _a.foldersSort;
    var t = next_intl_1.useTranslations('');
    var ref = react_1.useRef(null);
    var inputRef = react_1.useRef(null);
    var updateFolder = folderStore_1["default"](function (state) { return state.updateFolder; });
    var _d = react_1.useState(false), isOpened = _d[0], setIsOpened = _d[1];
    var _e = react_1.useState(false), isEditing = _e[0], setIsEditing = _e[1];
    var _f = react_1.useState(folder.name), folderName = _f[0], setFolderName = _f[1];
    var _g = react_dnd_1.useDrop({
        accept: 'folder',
        drop: function (item, monitor) {
            if (!ref.current) {
                return;
            }
            console.log("ITEM", item, index);
            // const dragIndex = item.index;
            // const hoverIndex = index;
            // // Don't replace items with themselves
            // if (dragIndex !== hoverIndex) {
            //   moveFolders(dragIndex, hoverIndex);
            // }
        },
        collect: function (monitor) { return ({
            isOver: monitor.isOver()
        }); }
    }), isOver = _g[0].isOver, drop = _g[1];
    var _h = react_dnd_1.useDrag({
        type: 'folder',
        item: { folder: folder, index: index },
        canDrag: !folder.isShadow,
        collect: function (monitor) { return ({
            isDragging: monitor.isDragging()
        }); }
    }, [folder, index]), drag = _h[1];
    drag(drop(ref));
    var editFolder = function (event) {
        event.stopPropagation();
        setIsEditing(true);
    };
    var handleOnBlur = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (folder.name === ((_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.value)) {
                        setIsEditing(false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, action_1.renameFolder((_b = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _b === void 0 ? void 0 : _b.value, folder.id, updateFolder)];
                case 1:
                    _c.sent();
                    setIsEditing(false);
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        var handleKeyDown = function (event) {
            if (event.key === 'Enter' && inputRef.current) {
                event.preventDefault();
                handleOnBlur();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return function () {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    react_1.useEffect(function () {
        setTimeout(function () {
            var _a;
            if (isEditing && inputRef.current) {
                (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }
        }, 180);
    }, [isEditing]);
    var handleCreateChart = function (e) {
        var _a;
        e.stopPropagation();
        onCreateChart(folder.id, (_a = folder.charts) === null || _a === void 0 ? void 0 : _a.length);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "border-t-[2px] " + (isOver ? 'border-indigo-400' : 'border-transparent') }),
        !folder.isShadow ? (React.createElement(collapsible_1.Collapsible, { ref: ref, open: isOpened, onOpenChange: function () { return setIsOpened(!isOpened); }, className: "w-full collapsible-menu-sidebar", key: "folder-" + folder.id },
            React.createElement("div", { className: "flex items-center justify-between space-x-4" },
                React.createElement(collapsible_1.CollapsibleTrigger, { asChild: true },
                    React.createElement("div", { className: "itemFolder flex justify-between items-center w-full cursor-pointer hover:bg-muted/85 px-4" },
                        React.createElement("div", { className: "flex justify-start items-center" },
                            React.createElement(lucide_react_1.ChevronRight, { className: "icon-chevron", size: 16 }),
                            React.createElement("div", { className: "flex" }, isEditing ? (React.createElement("input", { ref: inputRef, className: "text-sm font-normal rounded bg-muted p-1 pl-2", type: "text", value: folderName, onChange: function (e) {
                                    setFolderName(e.target.value);
                                }, onBlur: handleOnBlur })) : (React.createElement("h4", { className: "p-1 pl-2 text-sm font-normal" }, folderName)))),
                        React.createElement(dropdown_menu_1.DropdownMenu, null,
                            React.createElement(dropdown_menu_1.DropdownMenuTrigger, { asChild: true },
                                React.createElement(button_1.Button, { variant: "ghost", size: "icon", className: " hover:bg-transparent focus:outline-none focus-visible:ring-0" },
                                    React.createElement(lucide_react_1.Ellipsis, { className: "ellipseButton hidden", size: 16 }))),
                            React.createElement(dropdown_menu_1.DropdownMenuContent, { className: "DropdownMenuContent", side: "bottom", align: "start" },
                                React.createElement(dropdown_menu_1.DropdownMenuGroup, null,
                                    React.createElement(dropdown_menu_1.DropdownMenuItem, { className: "DropdownMenuItem", onClick: function (event) { return handleCreateChart(event); } }, t('chart.newChartLong')),
                                    React.createElement(dropdown_menu_1.DropdownMenuItem, { className: "DropdownMenuItem", onClick: editFolder }, t('chart.renameFolder')),
                                    React.createElement(dropdown_menu_1.DropdownMenuItem, { className: "DropdownMenuItem", onClick: function (event) {
                                            event.stopPropagation();
                                            onRemoveFolder(index);
                                        } }, t('chart.removeFolder')))))))),
            React.createElement(collapsible_1.CollapsibleContent, { className: "w-full" }, (_b = folder.charts) === null || _b === void 0 ? void 0 : _b.map(function (chart, index) { return (React.createElement(ChartItem_1["default"], { key: index, index: index, chart: chart, folderId: folder.id })); })))) : (React.createElement(context_menu_1.ContextMenu, null,
            React.createElement(context_menu_1.ContextMenuTrigger, { className: 'flex flex-col h-full w-full min-h-4' },
                React.createElement("div", { ref: ref, draggable: false, className: "w-full h-[100%] " },
                    React.createElement("div", { className: 'w-full' }, (_c = folder.charts) === null || _c === void 0 ? void 0 : _c.map(function (chart, index) { return (React.createElement(ChartItem_1["default"], { key: index, index: index, chart: chart, folderId: folder.id, isShadow: true })); })))),
            React.createElement(context_menu_1.ContextMenuContent, { className: "ContextMenuContent" },
                React.createElement(context_menu_1.ContextMenuItem, { className: "ContextMenuItem", onClick: function () { var _a, _b, _c; onCreateChart((_a = foldersSort[foldersSort.length - 1]) === null || _a === void 0 ? void 0 : _a.id, (_c = (_b = foldersSort[foldersSort.length - 1]) === null || _b === void 0 ? void 0 : _b.charts) === null || _c === void 0 ? void 0 : _c.length); } }, t('chart.newChartLong')),
                React.createElement(context_menu_1.ContextMenuItem, { className: "ContextMenuItem", onClick: onCreateFolder }, t('chart.newFolderLong')))))));
};
// const t = useTranslations('chart');
//   const moveFolders = useFolderStore((state) => state.moveFolders);
//   const removeFolderStore = useFolderStore((state) => state.removeFolder);
//   const currentFolder = useDashboardStore((state) => state.currentFolder);
//   const ref = useRef(null);
//   const [isOpened, setIsOpened] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [folderName, setFolderName] = useState(folder.name);
//   const [isEditing, setIsEditing] = useState(false);
//   useEffect(() => {
//     document.addEventListener('click', handleClick);
//     return () => {
//       document.removeEventListener('click', handleClick);
//     };
//   }, [isEditing]);
//   useEffect(() => {
//     if(!isOpened) setIsOpened(currentFolder == id);
//   }, [currentFolder])
//   const [{ isOver }, drop] = useDrop({
//     accept: 'folder',
//     drop(item, monitor) {
//       if (!ref.current) {
//         return;
//       }
//       const dragIndex = item.index;
//       const hoverIndex = index;
//       // Don't replace items with themselves
//       if (dragIndex !== hoverIndex) {
//         moveFolders(dragIndex, hoverIndex);
//       }
//     },
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   });
//   const [, drag] = useDrag(
//     {
//       type: 'folder',
//       item: { id, index },
//       canDrag: !folder.isShadow,
//       collect: (monitor: DragSourceMonitor) => ({
//         isDragging: monitor.isDragging(),
//       }),
//     },
//     [folder, index]
//   );
//   drag(drop(ref));
//   const handleClick = (event: any) => {
//     if (inputRef.current && !inputRef.current.contains(event.target)) {
//       setIsEditing(false);
//     }
//   };
//   const editFolder = (event: any) => {
//     event.stopPropagation();
//     setIsEditing(true);
//   };
//   const handleOnBlur = () => {
//     //Update name in db
//     const fetchDataAsync = async () => {
//       try {
//         const response = await fetchData(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}charts/rename-folder`,
//           {
//             body: JSON.stringify({
//               id: folder.id,
//               name: folderName,
//             }),
//           }
//         );
//         if (response.ok) {
//           setIsEditing(false);
//         } else {
//           console.error('Failed to update folder name');
//         }
//       } catch (error) {
//         console.error('An error occurred', error);
//       }
//     };
//     if (folder.name === folderName) return;
//     folder.name = folderName;
//     fetchDataAsync();
//   };
//   const handleCreateChart =  (e: any) => {
//     e.stopPropagation();
//     onCreateChart(folder.id, folder.charts?.length)
//   }
{ /* <div
className={`border-t-[2px] ${
  isOver ? 'border-indigo-400' : 'border-transparent'
}`}
/>
{!folder.isShadow ? (
<Collapsible
  onDoubleClick={(e) => {
    e.stopPropagation();
  }}
  ref={ref}
  open={isOpened}
  onOpenChange={() => setIsOpened(!isOpened)}
  className="w-full collapsible-menu-sidebar"
  key={`folder-${id}`}
>
  <div className="flex items-center justify-between space-x-4">
    <CollapsibleTrigger asChild>
      <div className="flex justify-between items-center w-full cursor-pointer hover:bg-muted/85 px-4">
        <div className="flex justify-start items-center">
          <ChevronRight className="icon-chevron" size={16} />
          <div className="flex">
            {isEditing ? (
              <input
                ref={inputRef}
                className="text-sm font-normal rounded bg-muted p-1 pl-2"
                type="text"
                value={folderName}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  setFolderName(e.target.value);
                }}
                onBlur={handleOnBlur}
                autoFocus
              />
            ) : (
              <h4 className="p-1 pl-2 text-sm font-normal">
                {folder.name}
              </h4>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className=" hover:bg-transparent focus:outline-none focus-visible:ring-0"
            >
              <Ellipsis className="ellipseButton hidden" size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="DropdownMenuContent"
            side="bottom"
            align="start"
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="DropdownMenuItem"
                onClick={editFolder}
              >
                {t('renameFolder')}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="DropdownMenuItem"
                onClick={(event) => {
                  event.stopPropagation();
                  removeFolder(folder.id, removeFolderStore);
                }}
              >
                {t('removeFolder')}
              </DropdownMenuItem>
              <DropdownMenuItem
                  className="DropdownMenuItem"
                  onClick={(event) => handleCreateChart(event)}
                >
                  {t('newChartLong')}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CollapsibleTrigger>
  </div>
  <CollapsibleContent className="w-full">
    {folder.charts?.map((chart: any, index: number) => (
      <FolderItem
        key={index}
        title={chart.title}
        index={index}
        id={chart.id}
        folderId={folder.id}
      />
    ))}
  </CollapsibleContent>
</Collapsible>
) : (
<div ref={ref} draggable={false} className="w-full h-[100%]">
  <div className='w-full'>
  {folder.charts?.map((chart: any, index: number) => (
      <FolderItem
        key={index}
        title={chart.title}
        index={index}
        id={chart.id}
        folderId={folder.id}
      />
    ))}
  </div>
</div>
)}
</>  */
}
