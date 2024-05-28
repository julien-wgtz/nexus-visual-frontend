"use client"
import React, { useEffect, useState } from "react";
import CreateChartDialog from "@/components/nexus-app/DialogCreateChart/CreateChartDialog";
import EditorChart from "@/components/nexus-app/EditorChart/EditorChart";
import Sidebar from "@/components/nexus-app/Sidebar/sidebar";
import useDashboardStore from "@/store/dashboardStore";
import CircleLoader from "@/components/nexus-app/Loader/CircleLoader";
import { Button } from "@/components/ui/button";
import ChartsApi from "@/data/model/chart";
import configBase from '@/data/config/configChart.json';
import { set } from "lodash";

const Page = () => {
  
  const chartApi = new ChartsApi();
  const currentChart = useDashboardStore((state) => state.currentChart);
  const setConfigChart = useDashboardStore((state) => state.setConfigChart);
  const config = useDashboardStore((state) => state.configChart);
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(currentChart === null) {
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
          setConfigChart({...configBase})
          chartApi.updateChart({id: currentChart.id, config: configBase})
        } else {
          setConfigChart(configFromDb.config)
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
            {currentChart ? (
              <EditorChart  chart={currentChart} data={data} config={config}/>
            ) : (
            <div className=" h-full p-4">
              <div className="flex flex-1 items-center justify-center h-full rounded-lg border border-dashed shadow-sm">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Vous n'avez aucun graphique de crée
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
          <div className="flex justify-center items-center w-full w-full">
            {/* // TODO update loader shadow */}
            <CircleLoader />
          </div>
        )}
      </div>
      <CreateChartDialog/>
    </div>
  );
};

export default Page;
