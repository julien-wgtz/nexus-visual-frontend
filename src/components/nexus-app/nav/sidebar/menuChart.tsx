import { Button } from '@/components/ui/button';
import { ContextMenu } from '@/components/ui/context-menu';
import { fetchData } from '@/lib/fetch';
import { useAppStore } from '@/store/store';
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@radix-ui/react-context-menu';
import { ChevronRight, FolderPlus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { use, useEffect, useState } from 'react';
import './style.scss';
import { Skeleton } from '@/components/ui/skeleton';
import useFolderStore from '@/store/folderStore';
import { Folder } from './folders/folder';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createFolder } from './folders/action';
interface MenuChartProps {
  // Define the props for your component here
}

// TODO Faire une fonction pour réorganiser les chart

const MenuChart: React.FC<MenuChartProps> = (props) => {
  const t = useTranslations('chart');
  const appStore: any = useAppStore();
  const account = appStore.account;

  const folders = useFolderStore((state) => state.folders);
  const setFolders = useFolderStore((state) => state.updateFolders);
  const addFolder = useFolderStore((state) => state.addFolder);
  const updateFolders = useFolderStore((state) => state.updateFolders);
  const [loadingFolders, setLoadingFolders] = useState(false);
  const [folderReorder, setFolderReorder] = useState<any[]>([]);
  
  const reorderFolders = (f: any[]) => {
    const newFolders = [...f];
    newFolders.sort((a, b) => {
      if (a.order === b.order) {
        b.order += 1;
      }
      return a.order - b.order;
    });
    return newFolders;
  };

  useEffect(() => {
    setFolderReorder(reorderFolders(folders));
  }, [folders])

  useEffect(() => {
    if (account === null) return;
    try {
      const fetchDataAsync = async () => {
        const response = await fetchData(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}charts/get-folders`,
          {
            body: JSON.stringify({
              accountId: appStore.account.id,
            }),
          }
        );
        if (response.ok) {
          const folders = await response.json();
          const folderOrder = reorderFolders(folders);
          updateFolders(folderOrder);
          setFolders(folderOrder);
          setLoadingFolders(true);
        } else {
          console.error('Failed to fetch folders');
        }
      };

      fetchDataAsync();
    } catch (error) {
      console.error('An error occurred', error);
    }
  }, [account]);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex flex-col w-full h-full md:p-0 overflow-hidden">
        <div className="flex justify-end gap-2 p-2 md:p-4">
          <Button className="gap-2" variant="outline" size="sm">
            <Plus size={'16'} />
            {t('newChart')}
          </Button>
          <Button
            className="gap-2"
            variant="default"
            size="sm"
            onClick={() =>
              createFolder(
                t('newFolderLong'),
                account.id,
                folders.length,
                addFolder
              )
            }
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
                ></Folder>
              ))}
              <Folder key={10000} id={10000} index={10000}></Folder>
            </DndProvider>
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="ContextMenuContent">
        {/* <ContextMenuItem className="ContextMenuItem">
          {t('newChartLong')}
          <ContextMenuShortcut>⌘+g</ContextMenuShortcut>
        </ContextMenuItem> */}
        <ContextMenuItem
          className="ContextMenuItem"
          onClick={() =>
            createFolder(
              t('newFolderLong'),
              account.id,
              folders.length,
              addFolder
            )
          }
        >
          {t('newFolderLong')}
          {/* <ContextMenuShortcut>⌘+/</ContextMenuShortcut> */}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default MenuChart;
