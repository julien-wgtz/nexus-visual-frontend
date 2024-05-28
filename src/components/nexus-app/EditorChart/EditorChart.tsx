import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ChartType from '@/data/enum/Charts';
import { Charts } from '@/data/type/Charts';
import { useTranslations } from 'next-intl';
import React, { useTransition } from 'react';
import NexusBar from '../Charts/Bar/Bar';
import NexusLine from '../Charts/Line/NexusLine';
import ApparenceForm from '../FormChart/apparence';
import themes from '@/data/config/themesChart.json';
import DataForm from '../FormChart/data';
interface EditorChartProps {
	data: Charts[];
	chart: any;
	config: any;
}

const EditorChart: React.FC<EditorChartProps> = ({ chart, data, config }) => {
	const t = useTranslations("")
	return (

		<div className="flex flex-col gap-4 h-full p-4">
			<div>
				<div className="flex justify-between items-center">
					<h3 className="text-lg font-semibold">{chart.title}</h3>
					<div className='flex gap-2'>
						<Button variant={"outline"}>{t("chart.save")}</Button>
						<Button>{t("chart.publish")}</Button>
					</div>
				</div>
			</div>
			<div className='grid grid-cols-1 lg:grid-cols-9 gap-2 h-full min-h-[350px]'>
				<Card className='bg-muted/30 col-span-1 lg:col-span-6 aspect-video' style={{backgroundColor: themes[config.theme].backgroundColor}}>
					<CardContent className=' w-full h-full p-2'>
						{chart.currentChartType === ChartType.BAR && (
							<NexusBar data={data}/>
						)}
						{chart.currentChartType === ChartType.LINE && (
							<NexusLine data={data}/>
						)}
					</CardContent>
				</Card>
				<div className='flex flex-col gap-4 col-span-1 lg:col-span-3'>
					<DataForm properties={data.properties}/>
					<ApparenceForm/>
				</div>
			</div>
		</div>
	);
};

export default EditorChart;