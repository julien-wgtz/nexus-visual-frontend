"use client"
import React, { useState } from "react";
import CreateChartDialog from "@/components/nexus-app/DialogCreateChart/CreateChartDialog";
import EditorChart from "@/components/nexus-app/EditorChart/EditorChart";
import Sidebar from "@/components/nexus-app/Sidebar/sidebar";
import useDashboardStore from "@/store/dashboardStore";
import CircleLoader from "@/components/nexus-app/Loader/CircleLoader";
import { Button } from "@/components/ui/button";

const Page = () => {
  const currentChart = useDashboardStore((state) => state.currentChart);

  const [isLoading, setIsLoading] = useState(true);

  // get All Data about chart
  return (
    <div className="grid h-14   w-full h-full ">
      <Sidebar />
      <div className="md:ml-[236px] lg:ml-[304px]">
      {isLoading ?(
        <>
          {currentChart ? (
            <EditorChart  chart={currentChart}/>
          ) : (
            <div className=" h-full p-4">
            <div className="flex flex-1 items-center justify-center h-full rounded-lg border border-dashed shadow-sm">
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  Vous n'avez aucun graphique de crée
                </h3>
                <p className="text-sm text-muted-foreground">
                  You can start using Nexus as soon add create your first chart
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
