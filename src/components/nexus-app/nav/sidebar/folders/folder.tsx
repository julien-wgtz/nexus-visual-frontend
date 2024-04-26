import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ChevronRight, Ellipsis } from 'lucide-react';
import { use, useEffect, useRef, useState } from 'react';
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import FolderItem from './folderItem';
import useFolderStore from '@/store/folderStore';
import { useTranslations } from 'next-intl';
import { removeFolder } from './action';
import { fetchData } from '@/lib/fetch';

export const Folder = ({ id, index, folder = '' }: any) => {
  const t = useTranslations('chart');
  const moveFolders = useFolderStore((state) => state.moveFolders);
  const removeFolderStore = useFolderStore((state) => state.removeFolder);

  const ref = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [folderName, setFolderName] = useState(folder.name);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isEditing]);

  const [{ isOver }, drop] = useDrop({
    accept: 'folder',
    drop(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex !== hoverIndex) {
        moveFolders(dragIndex, hoverIndex);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  const [, drag] = useDrag(
    {
      type: 'folder',
      item: { id, index },
      canDrag: folder !== '',
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    },
    [folder, index]
  );
  drag(drop(ref));

  const handleClick = (event: any) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsEditing(false);
    }
  };

  const editFolder = (event: any) => {
    event.stopPropagation();
    setIsEditing(true);
  };

  const handleOnBlur = () => {
    //Update name in db
    const fetchDataAsync = async () => {
      try {
        const response = await fetchData(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}charts/rename-folder`,
          {
            body: JSON.stringify({
              id: folder.id,
              name: folderName,
            }),
          }
        );
        if (response.ok) {
          setIsEditing(false);
        } else {
          console.error('Failed to update folder name');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };
    if (folder.name === folderName) return;
    folder.name = folderName;
    fetchDataAsync();
  };

  return (
    <>
      <div
        className={`border-t-[2px] ${
          isOver ? 'border-indigo-400' : 'border-transparent'
        }`}
      />
      {folder ? (
        <Collapsible
          onDoubleClick={(e) => {
            e.stopPropagation();
          }}
          ref={ref}
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
                name={chart.name}
                index={index}
                id={id}
                folderId={folder.id}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <div ref={ref} draggable={false} className="w-full h-[100%]">
          <FolderItem key={10000} index={10000} id={10000} />
        </div>
      )}
    </>
  );
};
