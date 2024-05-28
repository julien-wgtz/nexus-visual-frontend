import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useDashboardStore from '@/store/dashboardStore';
import { AlignCenter, AlignLeft, AlignRight, Bird, Rabbit, Sun, Turtle, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import themes from '@/data/config/themesChart.json';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import ChartsApi from '@/data/model/chart';
import { set, update } from 'lodash';
import { Button } from '@/components/ui/button';

interface Props {
	properties: any;
}

const DataForm: React.FC<Props> = ({ properties }) => {

	const t = useTranslations("EditorChart")
	const chartApi = new ChartsApi();
	const currentChart = useDashboardStore((state) => state.currentChart);
	const configChart = useDashboardStore((state) => state.configChart);
	const setConfigChart = useDashboardStore((state) => state.setConfigChart);
	const [axeXSelected, setAxeXSelected] = useState("")
	const [axeYSelected, setAxeYSelected] = useState([])
	const [isLoading, setIsLoading] = useState(true);

	useEffect(()=> {
		if(configChart.dataSelected && axeYSelected.length == 0) {
			setAxeYSelected([])
			configChart.dataSelected.map((item: any) => {
				if(item.axe == "X") {
					setAxeXSelected(item.id)
				} else if(item.axe == "Y") {
					const newArray = axeYSelected
					newArray.push(item.id)
					setAxeYSelected([...newArray])
				}
			})
		}
		isLoading && setIsLoading(false)
	}, [])

	useEffect(()=> {
		chartApi.updateConfigChart({id: currentChart.id, config: configChart})
	}, [configChart])

	const onchange = (event: any) => {
		if(!configChart.dataSelected) configChart.dataSelected = []
		if(event.target.name == "axeX") {
			let hasUpdate = false
			configChart.dataSelected.map((item: any) => {
				if(item.axe == "X" && hasUpdate == false) {
					hasUpdate = true
					item.id = event.target.value
				} 
			})
			if(!hasUpdate) {
				configChart.dataSelected.push({axe: "X", id: event.target.value})
			}
		}

		setConfigChart({...configChart})
	}

	const updateAxeX = (value: any, index: number, oldItem: any) => {
		if(value == "") return
		if(!configChart.dataSelected) configChart.dataSelected = []
		let hasUpdate = false;
		configChart.dataSelected.map((item: any) => {
				if(item.id == oldItem && hasUpdate == false) { 
					item.id = value
					hasUpdate = true
					const newArray = axeYSelected
					newArray[index] = value
					setAxeYSelected([...newArray])
				}

		})
		if(!hasUpdate) {
			configChart.dataSelected.push({axe: "Y", id: value})
			const newArray = axeYSelected
			newArray[index] = value
			setAxeYSelected([...newArray])
		}
		setConfigChart({...configChart})
	}

	const removeSeries = (e: any, itemId: string) => {
		e.preventDefault();
		const newArray = axeYSelected.filter((item) => item !== itemId)
		setAxeYSelected(newArray)
		const newDataSelected = configChart.dataSelected.filter((item: any) => {
			return item.id !== itemId
		})
		configChart.dataSelected = [...newDataSelected]
		setConfigChart({...configChart})
	}

	return (
		<form onChange={(event) => onchange(event)} className="grid w-full items-start gap-6 overflow-auto mt-[-9px]">
		<fieldset className="bg-muted/20 grid gap-6 rounded-lg border p-4">
			<legend className="-ml-1 px-1 text-sm font-medium">
				{t("chart.data")}
			</legend>
			<div className="grid gap-3">
				<Label htmlFor="axeX">Axe X</Label>
				{!isLoading && (
					<Select name="axeX" value={axeXSelected} onValueChange={value => setAxeXSelected(value)}>
						<SelectTrigger
							id="axeX"
							className="items-start [&_[data-description]]:hidden"
						>
							<SelectValue placeholder="Sélectionner axe X" />
						</SelectTrigger>
					<SelectContent>
					{properties.map((property: any) => (
							<SelectItem key={property.id} value={property.id}>
								<div className="flex items-start gap-3 text-muted-foreground">
								<div className="grid gap-0.5">
									<p>
									{property.name}
									</p>
								</div>
								</div>
							</SelectItem>
						))}
					</SelectContent>
					</Select>
				)}
			</div>
			<div className="grid gap-3">
				<Label htmlFor="axeX">Série</Label>
				{!isLoading && axeYSelected.map((axeY: any, index: number) =>(
					<div className='flex gap-3' key={index}>

						<Select name="axeY"  value={axeY} onValueChange={(value) => updateAxeX(value, index, axeY)}>
							<SelectTrigger
								id="axeY"
								className="items-start [&_[data-description]]:hidden"
							>
								<SelectValue placeholder="Sélectionner une série" />
							</SelectTrigger>
						<SelectContent>
						{properties.map((property: any) => (
							<div key={property.id}>
								{((axeYSelected.includes(property.id)) && property.id !== axeY) || property.id == axeXSelected ? null : (
									<SelectItem value={property.id}>
										<div className="flex items-start gap-3 text-muted-foreground">
										<div className="grid gap-0.5">
											<p>
											{property.name}
											</p>
										</div>
										</div>
									</SelectItem>
								)}
							</div>
							))}
						</SelectContent>
						</Select>
						<Button variant="outline" onClick={(e) => removeSeries(e, axeY)}>
							<X size={16}/>
						</Button>
					</div>
				))}
				<Button variant="secondary" onClick={(e) => {e.preventDefault(); setAxeYSelected([...axeYSelected, ""])}}>Ajouter une série</Button>
			</div>
		</fieldset>
	  </form>
	)
};

export default DataForm;