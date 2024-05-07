"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
  } from "@/components/ui/dialog";
import useDashboardStore from "@/store/dashboardStore";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from 'react';
import Step1CreateChart from "./step1";
import Step2CreateChart from "./step2";
import { useAppStore } from "@/store/appStore";
import StepConnectNotion from "./stepConnectNotion";
import useFolderStore from "@/store/folderStore";
import ChartsApi from "@/data/model/chart";

interface CreateChartDialogProps {

}	

const CreateChartDialog: React.FC<CreateChartDialogProps> = ({}) => {
	const t = useTranslations('');

	const account = useAppStore((state) => state.account);

	const chartApi = new ChartsApi();
	const dataForChart = useDashboardStore((state) => state.dataForChart);
	const addChart = useFolderStore((state) => state.addChart);
	const setCurrentChart = useDashboardStore((state) => state.setCurrentChart);
	const setCurrentFolder = useDashboardStore((state) => state.setCurrentFolder);

	const isOpen = useDashboardStore((state) => state.dialogIsOpen);
	const setIsOpen = useDashboardStore((state) => state.setDialogIsOpen);
	

	const [chart, setChart] = useState<any>({});
	const [step, setStep] = useState(0);
	
	const disableNextButton = () => {
		if(step === 0 && chart.type) return false;
		if(step === 1 && chart.database) return false;
		else return true;
	}

	useEffect(() => {
		return () => {
			setChart({});
			setStep(0);
		}
	},[isOpen])

	const addDataToChart = (data: any) => {
		setChart({...chart, ...data});
	}

	const onSubmit = () => {
		chartApi.createChart({
			folderId: dataForChart.id,
			title: t('chart.newChartLong'),
			type: chart.type,
			databaseId: chart.database
		}).then((res) => {
			addChart(res);
			setCurrentChart(res);
			setCurrentFolder(dataForChart.id);
			setIsOpen(false);
		})
		
	}

	//TODO Sinon flow de connexion notion à faire une fois que l'integration notion est en publique


	return (
		<Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
			<DialogContent className="lg:max-w-[750px]">
				{step === 0 && (
					<Step1CreateChart chartType={chart.type} setChart={addDataToChart} />
				)}
				{step === 1 && account.notionToken && (
					<Step2CreateChart chartDatabase={chart.database} setChart={addDataToChart} />
				)}
				{step === 1  && !account.notionToken && (
					<StepConnectNotion setChart={setChart} />
				)}
				<DialogFooter>
					{step > 0 && (
						<Button variant={"secondary"} onClick={() => setStep(step -1)}>{t("common.previous")}</Button>
					)}
					{step == 1 ? (
						<Button disabled={disableNextButton()} onClick={onSubmit} type="submit">{t("common.confirm")}</Button>
					): (
						<Button disabled={disableNextButton()} onClick={() => setStep(step +1)} type="submit">{t("common.next")}</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
};

export default CreateChartDialog;