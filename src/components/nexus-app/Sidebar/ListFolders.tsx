import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';
import { ChevronRight, FolderPlus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import useFolderStore from '@/store/folderStore';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FolderItem } from './FolderItem';
import './style.scss';
import useDashboardStore from '@/store/dashboardStore';
import FolderApi from '@/data/model/folder';

interface ListFoldersProps {
  // Define the props for your component here
}

const ListFolders: React.FC<ListFoldersProps> = (props) => {
  const t = useTranslations('chart');

  const accountId = useAppStore((state) => state.accountId);
  
  const folderApi = new FolderApi();
  const folders = useFolderStore((state) => state.folders);
  const setFolders = useFolderStore((state) => state.setFolders);
  const addFolder = useFolderStore((state) => state.addFolder);
  
  const setOpenDialogCreateChart = useDashboardStore((state) => state.setDialogIsOpen);
  const setDataForChart = useDashboardStore((state) => state.setDataForChart);


  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if (accountId === null) return;
    folderApi.getAllFolders(accountId).then((folders) => {
      setFolders(folders)
      setLoading(false)
    })
  }, [accountId]);

  const onCreateFolder = () => {
    folderApi.createFolder({accountId, order: folders.length - 1, name: t("newFolderLong")}).then((folder) => {
      addFolder(folder)
    })
  }

  const onCreateChart = (id: number, order: number = 0) => {
    setDataForChart({id, order})
    setOpenDialogCreateChart(true);
  }

  return (
    <div className='flex flex-col h-full w-full pt-4 overflow-hidden'>
      <div className="flex justify-end pb-4 px-4 gap-2">
        <Button 
          className="gap-2" 
          variant="outline" 
          size="sm"
          onClick={() => onCreateChart(folders[folders.length-1]?.id, folders[folders.length-1]?.charts?.length)} 
        >
          <Plus size={'16'} />
          {t('newChart')}
        </Button>
        <Button
          className="gap-2"
          variant="default"
          size="sm"
          onClick={onCreateFolder}
        >
          <FolderPlus size={'16'} />
          {t('newFolder')}
        </Button>
      </div>
      <div className='flex flex-col w-full h-full overflow-hidden'>
        {loading ? (
          <div className="flex flex-col gap-2 pl-4">
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
        ): (
          <div className='flex flex-col h-full overflow-scroll'>
            <DndProvider backend={HTML5Backend}>
              {folders?.map((folder: any, index: number) => (
                <FolderItem
                  key={folder.id}
                  index={index}
                  folder={folder}
                />
              ))}
            </DndProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListFolders;