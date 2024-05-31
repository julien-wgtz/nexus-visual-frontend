"use client"
import React, { use, useEffect, useState } from "react";
import CreateChartDialog from "@/components/nexus-app/DialogCreateChart/CreateChartDialog";
import EditorChart from "@/components/nexus-app/EditorChart/EditorChart";
import Sidebar from "@/components/nexus-app/Sidebar/sidebar";
import useDashboardStore from "@/store/dashboardStore";
import CircleLoader from "@/components/nexus-app/Loader/CircleLoader";
import { Button } from "@/components/ui/button";
import ChartsApi from "@/data/model/chart";
import configBase from '@/data/config/configChart.json';
import { set } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppStore } from "@/store/appStore";

const Page = () => {
  
  const chartApi = new ChartsApi();
  const currentChart = useDashboardStore((state: any) => state.currentChart);
  const setConfigChart = useDashboardStore((state: any) => state.setConfigChart);
  const config = useDashboardStore((state: any) => state.configChart);
  const user = useAppStore((state:any) => state.user); 
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(currentChart === null || currentChart === undefined) {
      setIsLoading(true)
      return;
    }
    setData([])
    setIsLoading(false)

    const getAllDataConfigChart = async () => {
      await chartApi.getChartData({id: currentChart.id}).then((data) => {
        setData(data);
      })
      
      await chartApi.getConfigChart({id: currentChart.id}).then((configFromDb) => {
        if(!configFromDb.config) {

          setConfigChart({...configBase, id: currentChart.id, theme: user.theme})
          chartApi.updateChart({id: currentChart.id, config: configBase})
        } else {
          if(configFromDb.config.id == currentChart.id) {
            setConfigChart(configFromDb.config)
          }
        }
      })
      setIsLoading(true);
    }
      getAllDataConfigChart();
  },[currentChart])

  // get All Data about chart
  return (
    <div className="grid h-14   w-full h-full ">
      <Sidebar />
      <div className="md:ml-[236px] lg:ml-[304px]">
        {isLoading ?(
          <>
            {currentChart && config ? (
              <EditorChart  chart={currentChart} data={data} config={config}/>
            ) : (
            <div className=" h-full p-4">
              <div className="flex flex-1 items-center justify-center h-full rounded-lg border border-dashed shadow-sm">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Vous navez aucun graphique de crée
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You can start using Nexus as soon create your first chart
                  </p>
                  <Button className="mt-4">
                    Add Product
                  </Button>
                </div>
              </div>
            </div>
            )}
          </>
        ): (
          <div className="flex flex-col gap-4 h-full p-4">
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold"><Skeleton className="w-[250px] h-[28px]"/></h3>
                <div className='flex gap-2'>
                  <Skeleton className="w-[80px] h-[36px]"/>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-9 gap-2 h-full min-h-[350px]">
              <Skeleton className=" col-span-1 lg:col-span-6 aspect-video" />
              <div className='flex flex-col gap-4 col-span-1 lg:col-span-3'>
              <Skeleton className="h-[250px]" />
              <Skeleton className="h-[350px]" />
              </div>
            </div>
          </div>
        )}
      </div>
      <CreateChartDialog/>
    </div>
  );
};

export default Page;
