import { useEffect, useRef, useState } from 'react';
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import ChartItem from './ChartItem';
import { useTranslations } from 'next-intl';
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight, Ellipsis } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import useFolderStore from '@/store/folderStore';
import useDashboardStore from '@/store/dashboardStore';
import FoldersApi from '@/data/model/folder';
import ChartsApi from '@/data/model/chart';
import { flowRight } from 'lodash';

interface FolderItemProps {
  folder: any,
  index: number,
}

export const FolderItem = ({ index, folder }: FolderItemProps) => {
  const t = useTranslations('');

  const ref = useRef(null);
  const inputRef = useRef(null);

  const chartApi = new ChartsApi();
  const setOpenDialogCreateChart = useDashboardStore((state: any) => state.setDialogIsOpen);
  const setDataForChart = useDashboardStore((state: any) => state.setDataForChart);
  
  const folderApi = new FoldersApi();
  const currentFolder = useDashboardStore((state: any) => state.currentFolder)
  const currentChart = useDashboardStore((state: any) => state.currentChart)
  const resetCurrentChart = useDashboardStore((state: any) => state.resetCurrentChart)
  const updateFolder = useFolderStore((state: any) => state.updateFolder)
  const setFolders = useFolderStore((state: any) => state.setFolders)


  const [isOpened, setIsOpened] = useState(currentFolder == folder.id);
  const [isEditing, setIsEditing] = useState(false);

  const [folderName, setFolderName] = useState(folder.name);
  

  const [{ isOverLine, isOverFolder }, drop] = useDrop({
    accept: ['folder', 'chart'],
    drop(item: any, monitor) {
      if (!ref.current) {
        return;
      }
        const indexOrigine = item.index;
        const indexDestination = index;
        const effect = monitor.getDropResult();
        if(!item.folderId) {
          folderApi.updateFolderOrder(indexOrigine, indexDestination).then((newFolders) => {
            setFolders(newFolders)
          })
        } else {
          if( effect === null) {
              chartApi.updateChartOrder(item.index, 0, item.folderId, folder.id ).then((newFolders) => {
                setFolders(newFolders)
                setIsOpened(true)
              })
          }
        }
    },
    collect: (monitor) => ({
      isOverLine: monitor.isOver() && monitor.getItemType() === 'folder',
      isOverFolder: monitor.isOver() && monitor.getItemType() === 'chart',
    }),
  });

  const [{}, drag] = useDrag(
    {
      type: 'folder',
      item: { folder, index },
      canDrag: !folder.isShadow,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    },
    [folder, index]
  );
  drag(drop(ref));
  
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'Enter' && inputRef.current) {
        event.preventDefault();
        handleOnBlur();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },[])

  useEffect(() => {
    if(!isOpened) setIsOpened(currentFolder == folder.id);
  }, [currentFolder])

  useEffect(() => { 
    setTimeout(() => {
      const input: any = inputRef?.current;
      if (isEditing && inputRef.current) {
        input.focus();
      }
    }, 180);
  }, [isEditing]);



  const editFolder = (event: any) => {
    event.stopPropagation();
    setIsEditing(true);
  };

  const handleOnBlur = async () => {
    const input: any = inputRef?.current;
    if (folder.name === input.value) {setIsEditing(false); return;}
    folder.name = input.value;
    const folderRename = await folderApi.updateFolder(folder);
    updateFolder(folderRename);
    setIsEditing(false);
  };

  const handleCreateChart = (e: any) => {
    e.stopPropagation();
    setDataForChart({id: folder.id, order: folder.charts?.length})
    setOpenDialogCreateChart(true);
  }

  const onRemoveFolder = () => {
    folderApi.deleteFolder(folder.id).then((newFolder) => {
      setFolders(newFolder)
    })
  }

  const onRemoveFolderWithCharts = () => {
    folderApi.deleteFolderWithCharts(folder.id).then((newFolder) => {
      setFolders(newFolder)
      if(currentChart.folderId == folder.id) resetCurrentChart(undefined);
    })
  
  }

  return (
    <>
      <div className={`border-t-[2px] ${isOverLine ? 'border-indigo-400' : 'border-transparent'}`}/>
      {!folder.isShadow ? (
        <Collapsible
          ref={ref}
          open={isOpened || isOverFolder}
          onOpenChange={() => setIsOpened(!isOpened)}
          className="w-full collapsible-menu-sidebar"
          key={`folder-${folder.id}`}
        >
       <div className={`flex items-center justify-between space-x-4 ${isOverFolder ? "bg-muted" : ""}`}>
         <CollapsibleTrigger asChild>
           <div className={`itemFolder flex justify-between items-center w-full cursor-pointer hover:bg-muted/85 pl-4`}>
             <div className="flex justify-start items-center">
               <ChevronRight className="icon-chevron" size={16} />
               <div className="flex">
                 {isEditing ? (
                    <input
                      ref={inputRef}
                      className="text-sm font-normal rounded bg-muted p-1 pl-2"
                      type="text"
                      value={folderName}
                      onChange={(e) => {
                        setFolderName(e.target.value)
                      }}
                     onBlur={handleOnBlur}
                    />
                  ) : (
                     <h4 className="p-1 pl-2 text-sm font-normal">
                       {folderName}
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
                       onClick={(event) => handleCreateChart(event)}
                     >
                       {t('chart.newChartLong')}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="DropdownMenuItem"
                      onClick={editFolder}
                    >
                      {t('chart.renameFolder')}
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="DropdownMenuSubTrigger">{t("chart.delete")}</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem
                            className="DropdownMenuItem"
                            onClick={(event) => {
                              event.stopPropagation();
                              onRemoveFolder();
                            }}
                          >
                          {t('chart.removeFolder')}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="DropdownMenuItem"
                            onClick={(event) => {
                              event.stopPropagation();
                              onRemoveFolderWithCharts();
                            }}
                          >
                          {t('chart.removeFolderWithCharts')}
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
               </DropdownMenuContent>
             </DropdownMenu>
           </div>
         </CollapsibleTrigger>
       </div>
       <CollapsibleContent className="w-full">
         {folder.charts?.map((chart: any, index: number) => (
           <ChartItem
            key={index}
            index={index}
            chart={chart}
            folderId={folder.id}
           />
         ))}
            <ChartItem
            key={folder?.charts?.length}
            index={folder?.charts?.length}
            folderId={folder.id}
           />
       </CollapsibleContent>
     </Collapsible>
      ):(
        <ContextMenu>
          <ContextMenuTrigger className='flex flex-col h-full w-full min-h-4'>
              <div ref={ref} draggable={false} className="w-full h-[100%]  pb-48">
                <div className='w-full'>
                {folder.charts?.map((chart: any, index: number) => (
                    <ChartItem
                      key={index}
                      index={index}
                      chart={chart}
                      folderId={folder.id}
                      isShadow={true}
                    />
                  ))}
                  <ChartItem
                    key={folder?.charts?.length}
                    index={folder?.charts?.length}
                    folderId={folder.id}
                  />
                </div>
              </div>
          </ContextMenuTrigger>
          {/* <ContextMenuContent className="ContextMenuContent">
            <ContextMenuItem className="ContextMenuItem" 
            // onClick={() => {onCreateChart(foldersSort[foldersSort.length-1]?.id, foldersSort[foldersSort.length-1]?.charts?.length)}}
            >
              {t('chart.newChartLong')}
            </ContextMenuItem>
            <ContextMenuItem
              className="ContextMenuItem"
              // onClick={onCreateFolder}
            >
              {t('chart.newFolderLong')}
            </ContextMenuItem>
          </ContextMenuContent> */}
        </ContextMenu>
      )}
    </>
  );
};