import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ChartType from '@/data/enum/Charts';
import { Charts } from '@/data/type/Charts';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import NexusBar from '../Charts/Bar/Bar';
import NexusLine from '../Charts/Line/NexusLine';
import ApparenceForm from '../FormChart/apparence';
import themes from '@/data/config/themesChart.json';
import DataForm from '../FormChart/data';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import ChartsApi from '@/data/model/chart';

interface EditorChartProps {
	data: any;
	chart: any;
	config: any;
}

const EditorChart: React.FC<EditorChartProps> = ({ chart, data, config }) => {
	const t = useTranslations("")
	const urlbase =  window.location.origin
	const locale = useLocale()
	const { toast } = useToast()
	const ChartApi = new ChartsApi()
	const [url, setUrl] = useState<string>(`${urlbase}/${locale}/chart/${chart.shareToken}`)
	const [dataOrder, setDataOrder] = useState<any>(data)

	const copyUrl = () => {
		navigator.clipboard.writeText(url)
		toast({
			description: t("chart.copied"),
		})
	}

	const regenerateLink = () => {
		ChartApi.regenerateToken({id: chart.id}).then((data) => {
			setUrl(`${urlbase}/${locale}/chart/${data.shareToken}`)
			toast({
				description: t("chart.regenerated"),
			})
		}).catch((error) => {
			toast({
				description: t("chart.errorRegenerate"),
			})
		})
	}

	useEffect(() => {
		if(!config || config.dataSelected?.length === 0 || data?.length === 0 ) return
		const newData: any = {...data}
		const newDataData: any = [...newData.data]
		const axeX = config.dataSelected?.filter((item: any) => item.axe === "X")[0]?.id
		const axeXLabel = newData.properties?.filter((item: any) => item.id === axeX)[0]?.name
		const axeXType = newData.properties?.filter((item: any) => item.id === axeX)[0]?.type
		const orderStatus = config?.axeX?.order ? config.axeX.order : "none"
		if(orderStatus === "none") {
			setDataOrder({...data})
		} else {
			const dataOrder: any = newDataData.sort((a: any, b: any) => { 
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
	}, [config, data])
	return (
		<div className="flex flex-col gap-4 h-full p-4">
			<div>
				<div className="flex justify-between items-center">
					<h3 className="text-lg font-semibold">{chart.title}</h3>
					<div className='flex gap-2'>
						<Popover>
							<PopoverTrigger asChild>
								<Button>{t("chart.share")}</Button>
							</PopoverTrigger>
							<PopoverContent className="w-80 mr-4 mt-2">
								<div className="flex flex-col gap-4">
									<div className="space-y-2">
										<h4 className="font-medium leading-none">{t('shareLink')}</h4>
										<p className="text-sm text-muted-foreground">
											{t('shareLinkDescription')}
										</p>
									</div>
									<div className="flex  gap-2">
										<Input value={url} readOnly/>
										<Button onClick={copyUrl}>{t("chart.copy")}</Button>
									</div>
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button variant={"secondary"}>{t("chart.regenerate")}</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
											<AlertDialogTitle>{t("chart.regenerate")}</AlertDialogTitle>
											<AlertDialogDescription>
												{t("chart.regenerateDescription")}
											</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
											<AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
											<AlertDialogAction onClick={regenerateLink}>{t("confirm")}</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</div>
							</PopoverContent>
						</Popover>
					</div>
				</div>
			</div>
			<div className='grid grid-cols-1 lg:grid-cols-9 gap-2 h-full min-h-[350px]'>
				<Card className='bg-muted/30 col-span-1 lg:col-span-6 aspect-video' style={{backgroundColor: (themes as any)[config.theme].backgroundColor}}>
					<CardContent className=' w-full h-full p-2'>
						{chart.currentChartType === ChartType.BAR && (
							<NexusBar data={dataOrder} config={config}/>
						)}
						{chart.currentChartType === ChartType.LINE && (
							<NexusLine data={dataOrder} config={config}/>
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