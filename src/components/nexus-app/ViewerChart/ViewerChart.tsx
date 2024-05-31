"use client"
import { Card, CardContent } from '@/components/ui/card';
import ChartsApi from '@/data/model/chart';
import { Charts } from '@/data/type/Charts';
import React, { use, useEffect, useState } from 'react';
import NexusBar from '../Charts/Bar/Bar';
import NexusLine from '../Charts/Line/NexusLine';
import ChartType from '@/data/enum/Charts';
import themes from '@/data/config/themesChart.json';

interface ViewerChartProps {
	chart: Charts;
}

const ViewerChart: React.FC<ViewerChartProps> = ({chart}:ViewerChartProps) => {
	
	const ChartApi = new ChartsApi();
	const [data, setData] = useState<any>(null);
	const [backgroundColor, setBackgroundColor] = useState<string>('transparent');
	const [dataOrder, setDataOrder] = useState<any>(data)

	useEffect(() => {
		if(!chart) return;
		ChartApi.getChartDataFromToken({shareToken: chart.shareToken}).then((data) => {
			setData(data);
		});
		const isInIframe = window.self !== window.top;
		const bg = isInIframe ? "transparent" : themes[chart.config.theme].backgroundColor;
		setBackgroundColor(bg)
	}, [chart])

	useEffect(() => {
		if(data == null || data?.length === 0 ) return
		const newData = {...data}
		const newDataData = [...newData.data]
		const axeX = chart.config.dataSelected.filter((item: any) => item.axe === "X")[0]?.id
		const axeXLabel = newData.properties.filter((item: any) => item.id === axeX)[0]?.name
		const axeXType = newData.properties.filter((item: any) => item.id === axeX)[0]?.type
		const orderStatus = chart.config.axeX.order ? chart.config.axeX.order : "none"
		if(orderStatus === "none") {
			setDataOrder({...data})
		} else {
			const dataOrder = newDataData.sort((a, b) => { 
				if(orderStatus === "asc") {
					if(axeXType === "date") {
						return new Date(a[axeXLabel]).getTime() - new Date(b[axeXLabel]).getTime();
					} else {
						return a[axeXLabel] - b[axeXLabel]
					}
				} else if(orderStatus === "desc") {
					if(axeXType === "date") {
						return new Date(b[axeXLabel]).getTime() - new Date(a[axeXLabel]).getTime();
					} else {
						return b[axeXLabel] - a[axeXLabel]
					}
				}
			})
			newData.data = dataOrder
			setDataOrder(newData)
		}
	}, [data])
	

	return (
		<div className='h-screen w-screen p-4' style={{backgroundColor: backgroundColor}}> 
		{(chart && dataOrder) ? (
			<Card className='h-full w-full aspect-video' style={{backgroundColor: themes[chart.config.theme].backgroundColor}}>
				<CardContent className=' w-full h-full p-2'>
					{chart.currentChartType === ChartType.BAR && (
						<NexusBar data={dataOrder} config={chart.config}/>
					)}
					{chart.currentChartType === ChartType.LINE && (
						<NexusLine data={dataOrder} config={chart.config}/>
					)}
				</CardContent>
			</Card>
		): (
			<p>loading</p>
		)}
		</div>
	);
};

export default ViewerChart;