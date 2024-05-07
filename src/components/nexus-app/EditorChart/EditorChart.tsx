import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import React, { useTransition } from 'react';

interface EditorChartProps {
	chart: any;
}

const EditorChart: React.FC<EditorChartProps> = ({ chart }) => {

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
			<div className='grid grid-cols-1 lg:grid-cols-8 gap-2'>
				<Card className='col-span-1 lg:col-span-5'>
					<CardContent>
						<div className="flex justify-center items-center h-[500px]">
							<h3 className="text-xl font-semibold">Editor Chart</h3>
						</div>
					</CardContent>
				</Card>
				<Card className='col-span-1 lg:col-span-3'>
					<CardContent>
						<div className="flex justify-center items-center h-[500px]">
							<h3 className="text-xl font-semibold">Setting Chart</h3>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default EditorChart;