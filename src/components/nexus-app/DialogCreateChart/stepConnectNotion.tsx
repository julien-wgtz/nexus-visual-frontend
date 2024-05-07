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

interface StepConnectNotionProps {
	setChart: (chart: any) => void;
}	

const StepConnectNotion: React.FC<StepConnectNotionProps> = ({setChart}) => {
	const t = useTranslations('chart');

	

	return (
		<>
			<DialogHeader>
				<DialogTitle>Connec to notion</DialogTitle>
			</DialogHeader>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
			</div>
		</>
	)
};

export default StepConnectNotion;