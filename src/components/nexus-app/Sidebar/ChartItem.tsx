import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import useDashboardStore from '@/store/dashboardStore';
import { Ellipsis, LucideAlignCenterHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import useFolderStore from '@/store/folderStore';
import ChartsApi from '@/data/model/chart';
import { set } from 'lodash';

interface Props {
  index: number;
  chart?: any;
  folderId?: any;
  isShadow?: boolean;
}

const ChartItem: React.FC<Props> = ({ index,chart, folderId, isShadow }: Props) => {
  const t = useTranslations("");

  const chartApi = new ChartsApi();
  const currentChart = useDashboardStore((state) => state.currentChart);
  const setCurrentChart = useDashboardStore((state) => state.setCurrentChart);
  const updateFolder = useFolderStore((state) => state.updateFolder);
  const setFolders = useFolderStore((state) => state.setFolders);

  const [isEditing, setIsEditing] = useState(false);
  const [chartName, setChartName] = useState(chart?.title || "");
  const inputRef = useRef(null);

  const ref = useRef(null);
  const [{ isOver }, drop] = useDrop({
    accept: 'chart',
    drop(item, monitor) {
      if (!ref.current) {
        return;
      }
      chartApi.updateChartOrder(item.index, index, item.folderId, folderId ).then((newFolders) => {
        setFolders(newFolders) 
      })
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  const [{isDragging}, drag] = useDrag(
    {
      type: 'chart',
      item: { chart, index, folderId },
      isDragging: (monitor) => monitor.getItem().chart.id === chart?.id,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    },
    [folderId, index]
  );
  drag(drop(ref));

  const onDeleteChart = (event: any) => {
    chartApi.deleteChart({id: chart.id}).then((res) => {
      updateFolder(res);
    })
  }


  const editChart = (event: any) => {
    event.stopPropagation();
    setIsEditing(true);
  };

  const handleOnBlur = async () => {
    if (chart.title === inputRef?.current?.value) {setIsEditing(false); return;}
    chart.title = inputRef?.current?.value;
    chartApi.updateChart(chart).then((res) => {
      if(currentChart.id === chart.id) {
        setCurrentChart(res);
      }
    })
    setIsEditing(false);
  };

  useEffect(() => { 
    const handleKeyDown = (event: any) => {
      if (event.key === 'Enter' && inputRef.current)  {
        event.preventDefault();
        handleOnBlur();
      }
    };
    setTimeout(() => {
      if (isEditing && inputRef.current) {
        inputRef?.current?.focus();
        document.addEventListener('keydown', handleKeyDown);
      }
    }, 180);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditing]);


  useEffect(() => {
    setChartName(chart?.title);
  }, [chart])

  return (
    <>
      <div style={{ border: `1px solid ${isOver ? 'blue' : 'transparent'}` }} />
      <div 
        ref={ref}
        data-selected={currentChart.id == chart?.id}
        className={`group/item itemChart flex justify-between items-center w-full cursor-pointer ${isDragging ? "":"hover:bg-muted/85"} ${isShadow ? "" : "pl-4"} data-[selected=true]:bg-muted/70`} 
        onClick={() => setCurrentChart(chart)}>
        {chart ? (
          <>
            {isEditing ? (
              <input
                ref={inputRef}
                className="text-xs font-normal rounded bg-muted p-1 pl-2 ml-8"
                type="text"
                value={chartName}
                onChange={(e) => {
                  setChartName(e.target.value)
                }}
                onBlur={handleOnBlur}
              />
            ) : (
                <h5 
                  className="w-full flex justify-start text-xs font-normal rounded-none pl-10 hover:bg-inherit"
                >
                  {chartName}
                </h5>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className=" hover:bg-transparent focus:outline-none focus-visible:ring-0"
                >
                  <Ellipsis className="ellipseButtonChart hidden" size={16} />
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
                    onClick={editChart}
                  >
                    {t('chart.renameFolder')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="DropdownMenuItem"
                    onClick={(event) => {
                      onDeleteChart(event);
                    }}
                  >
                    {t('chart.removeChart')}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ): (
          <div className='h-1'></div>
        )}
      </div>
    </>
  );
};

export default ChartItem;
