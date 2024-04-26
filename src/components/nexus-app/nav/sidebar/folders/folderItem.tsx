import { Button } from '@/components/ui/button';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface Props {
  index: number;
  name?: string;
  id: number;
  folderId?: any;
}

const FolderItem: React.FC<Props> = ({ index, name, id, folderId }: Props) => {
  const ref = useRef(null);
  const [{ isOver }, drop] = useDrop({
    accept: 'files',
    drop(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex !== hoverIndex) {
        // TODO Réorganiser le chart dans le folder et dans les autres folders si déplacé
        // moveFolders(dragIndex, hoverIndex);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  const [, drag] = useDrag(
    {
      type: 'files',
      item: { id, index },
      canDrag: folderId !== undefined,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    },
    [folderId, index]
  );
  drag(drop(ref));
  return (
    <>
      <div style={{ border: `1px solid ${isOver ? 'blue' : 'transparent'}` }} />
      {name ? (
        <Button
          ref={ref}
          className="w-full flex justify-start font-normal rounded-none px-10"
          variant="ghost"
          size="sm"
        >
          {name}
        </Button>
      ) : (
        <div ref={ref} draggable={false} className="w-full h-[100%]"></div>
      )}
    </>
  );
};

export default FolderItem;
