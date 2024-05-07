"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
  } from "@/components/ui/dialog";
import useDashboardStore from "@/store/dashboardStore";
import ChartType from "@/data/enum/Charts";
import { useTranslations } from "next-intl";
import React, { useState } from 'react';

interface Step1CreateChartProps {
	chartType: ChartType | null;
	setChart: (chart: any) => void;
}	

const Step1CreateChart: React.FC<Step1CreateChartProps> = ({setChart, chartType}) => {
	const t = useTranslations('chart');

	const types: ChartType[] = [ChartType.BAR, ChartType.LINE, ChartType.PIE];
	const [selectedType, setSelectedType] = useState<ChartType | null>(chartType);


	const onClick = (type: ChartType) => {
		setSelectedType(type);
		setChart({type});
	}

	return (
		<>
			<DialogHeader>
				<DialogTitle>{t("title_create_chart_step_1")}</DialogTitle>
			</DialogHeader>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
				{types.map((type, index) => (
					<Card onClick={() => onClick(type)} data-type={type} key={index} className={`w-full cursor-pointer hover:border-violet-500 ${selectedType == type ? 'border-violet-500': ''}`}>
						<CardHeader className="pb-2">
						<CardTitle>{type}</CardTitle>
						</CardHeader>
						<CardContent>
					
						</CardContent>
					</Card>
				))}
			</div>
		</>
	)
};

export default Step1CreateChart;