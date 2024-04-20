import { Button } from '@/components/ui/button';
import { ContextMenu, ContextMenuShortcut } from '@/components/ui/context-menu';
import { fetchData } from '@/lib/fetch';
import { useAppStore } from '@/store/store';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@radix-ui/react-context-menu';
import { ChevronRight, Ellipsis, FolderPlus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { use, useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import './style.scss';
import { Skeleton } from '@/components/ui/skeleton';

interface MenuChartProps {
  // Define the props for your component here
}

// TODO Stocker les folders dans le store
//drag and drop
//TODO Ajouter le rename des folders

const MenuChart: React.FC<MenuChartProps> = (props) => {
  const t = useTranslations('chart');
  const appStore: any = useAppStore();
  const account = appStore.account;

  const [loadingFolders, setLoadingFolders] = useState(false);
  const [folders, setFolders] = useState<any>([]);

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
          setFolders(folders);
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

  const removeFolder = async (folderId: string) => {
    try {
      const response = await fetchData(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}charts/delete-folder`,
        {
          body: JSON.stringify({
            id: folderId,
          }),
        }
      );

      if (response.ok) {
        const newFolders = folders.filter(
          (folder: any) => folder.id !== folderId
        );
        setFolders(newFolders);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const createFolder = async () => {
    try {
      // Make an API call to create a folder on the backend
      const response = await fetchData(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}charts/create-folder`,
        {
          body: JSON.stringify({
            name: t('newFolderLong'),
            accountId: appStore.account.id,
          }),
        }
      );

      if (response.ok) {
        // Folder created successfully
        const newFolder = await response.json();
        setFolders([...folders, newFolder]);
      } else {
        // Handle error response
        console.error('Failed to create folder');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('An error occurred', error);
    }
  };

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
            onClick={createFolder}
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
            <>
              {folders.map((folder: any) => (
                <Collapsible
                  className="w-full collapsible-menu-sidebar"
                  key={`folder-${folder.id}`}
                >
                  <div className="flex items-center justify-between space-x-4">
                    <CollapsibleTrigger asChild>
                      <div className="flex justify-between items-center w-full cursor-pointer hover:bg-muted/85 px-4">
                        <div className="flex justify-start items-center gap-2 py-2">
                          <ChevronRight className="icon-chevron" size={16} />
                          <h4 className="text-sm font-normal">{folder.name}</h4>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className=" hover:bg-transparent focus:outline-none focus-visible:ring-0"
                            >
                              <Ellipsis
                                className="ellipseButton hidden"
                                size={16}
                              />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className="DropdownMenuContent"
                            side="bottom"
                            align="start"
                          >
                            <DropdownMenuGroup>
                              <DropdownMenuItem className="DropdownMenuItem">
                                {t('renameFolder')}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="DropdownMenuItem"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  removeFolder(folder.id);
                                }}
                              >
                                {t('removeFolder')}
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="w-full">
                    <Button
                      className="w-full flex justify-start font-normal rounded-none px-10"
                      variant="ghost"
                      size="sm"
                    >
                      résultat mensuel
                    </Button>
                    <Button
                      className="w-full flex justify-start font-normal rounded-none px-10"
                      variant="ghost"
                      size="sm"
                    >
                      résultat mensuel
                    </Button>
                    <Button
                      className="w-full flex justify-start font-normal rounded-none px-10"
                      variant="ghost"
                      size="sm"
                    >
                      résultat mensuel
                    </Button>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </>
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="ContextMenuContent">
        {/* <ContextMenuItem className="ContextMenuItem">
          {t('newChartLong')}
          <ContextMenuShortcut>⌘+g</ContextMenuShortcut>
        </ContextMenuItem> */}
        <ContextMenuItem className="ContextMenuItem" onClick={createFolder}>
          {t('newFolderLong')}
          {/* <ContextMenuShortcut>⌘+/</ContextMenuShortcut> */}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default MenuChart;
