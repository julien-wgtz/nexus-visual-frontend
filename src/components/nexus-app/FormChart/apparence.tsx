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

interface Props {
}

const ApparenceForm: React.FC<Props> = ({  }) => {

	const t = useTranslations("EditorChart")
	const chartApi = new ChartsApi();
	const currentChart = useDashboardStore((state: any) => state.currentChart);
	const configChart = useDashboardStore((state: any) => state.configChart);
	const setConfigChart = useDashboardStore((state: any) => state.setConfigChart);
	const [theme, setTheme] = useState(configChart.theme);
	const [line, setLine] = useState(configChart.lineType);
	const [grid, setGrid] = useState(configChart.background);
	const [legend, setLegend] = useState("");
	const [labelAxeX, setLabelAxeX] = useState("")
	const [labelAxeY, setLabelAxeY] = useState("")

	useEffect(()=> {
		if(configChart.legend.display) {
			setLegend(configChart.legend.align)
		} else {
			setLegend('none')
		}

		setLabelAxeX(configChart.axeX.label)
		setLabelAxeY(configChart.axeY.label)
		chartApi.updateConfigChart({id: currentChart.id, config: configChart})
	}, [configChart])

	const onchange = async (event: any) => {
		if(event.target.name === 'background') {
			configChart[event.target.name] = event.target.checked
		} else if (event.target.name == "axeX" || event.target.name == "axeY") {
			configChart[event.target.name].label = event.target.value
		} else {
			configChart[event.target.name] = event.target.value
		}
		setConfigChart({...configChart})
	}

	const onChangeLegend = (value:any) => {
		if(value == "none") {
			configChart.legend.display = false
		} else {
			configChart.legend.display = true
			configChart.legend.align = value
		}
		if(value) {
			setConfigChart({...configChart})
		}
	}

	return (
		<form onChange={(event) => onchange(event)} className="grid w-full items-start gap-6 overflow-auto mt-[-9px]">
		<fieldset className="bg-muted/20 grid gap-6 rounded-lg border p-4">
		  <legend className="-ml-1 px-1 text-sm font-medium">
			{t("chart.apparence")}
		  </legend>
		  <div className="grid gap-3">
			<Label htmlFor="theme">{t("themeDark")}</Label>
			<Select name='theme' value={theme} onValueChange={(value) => setTheme(value)}>
			  <SelectTrigger
				id="theme"
				className="items-start [&_[data-description]]:hidden"
			  >
				<SelectValue placeholder="Select a theme" />
			  </SelectTrigger>
			  <SelectContent>
				{themes.themes.map(theme => (
					<SelectItem key={theme.name} value={theme.name}>
						<div className="flex items-start gap-3 text-muted-foreground">
						<div className="grid gap-0.5">
							<p>
							{theme.label}
							</p>
						</div>
						</div>
					</SelectItem>
				))}
				</SelectContent>
			</Select>
		  </div>
		  <div className="grid gap-3">
			<Label htmlFor="line">{t("line-type")}</Label>
			<Select name="lineType" value={line} onValueChange={(value) => setLine(value)} >
			  <SelectTrigger
				id="line"
				className="items-start [&_[data-description]]:hidden"
			  >
				<SelectValue placeholder="Select a line" />
			  </SelectTrigger>
			  <SelectContent>
			  {themes.lines.map(line => (
					<SelectItem key={line.name} value={line.name}>
						<div className="flex items-start gap-3 text-muted-foreground">
						<div className="grid gap-0.5">
							<p>
							{line.label}
							</p>
						</div>
						</div>
					</SelectItem>
				))}
			  </SelectContent>
			</Select>
			</div>
			<div className="flex gap-3">
				<Label htmlFor="grid">Background grid</Label>
				<Switch name='background' id="grid" checked={grid} onCheckedChange={(value) => setGrid(value)} />
			</div>
			<div className="grid gap-3">
				<Label htmlFor="legend">Legend</Label>
				<ToggleGroup value={legend} onValueChange={(value) => onChangeLegend(value)} id="legend" type="single" variant="outline" className='flex gap-2 justify-start'>
					<ToggleGroupItem name='legend' value="none" aria-label="Toggle bold">
						<X className="h-4 w-4" />
					</ToggleGroupItem>
					<ToggleGroupItem name='legend' value="left" >
						<AlignLeft className="h-4 w-4" />
					</ToggleGroupItem>
					<ToggleGroupItem name='legend' value="center">
						<AlignCenter className="h-4 w-4" />
					</ToggleGroupItem>
					<ToggleGroupItem name='legend' value="right">
						<AlignRight className="h-4 w-4" />
					</ToggleGroupItem>
				</ToggleGroup>
			</div>
			<div className='grid gap-3'>
				<Label htmlFor='axeY'>Titre axe Y</Label>
				<Input value={labelAxeY} onChange={(value: any) => setLabelAxeY(value)} id="axeY" name='axeY' placeholder='Label' />
			</div>
			<div className='grid gap-3'>
				<Label htmlFor='axeX'>Label axe X</Label>
				<Input value={labelAxeX} onChange={(value: any) => setLabelAxeX(value)} id="axeX" name='axeX' placeholder='Label' />
			</div>
		</fieldset>
	  </form>
	)
};

export default ApparenceForm;