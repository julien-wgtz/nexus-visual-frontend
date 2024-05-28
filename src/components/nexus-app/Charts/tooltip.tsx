import { useLocale } from "next-intl";
import { use, useEffect, useState } from "react";

const CustomTooltip = (props: any) => {
	const { active, payload, styles, label, labelType } = props;
	const local = useLocale()
	const [labelAxeX, setLabelAxeX] = useState(payload.value)
	
	useEffect(() => {
		if(!local || !label) return;
		if(labelType == "date"){
			if (labelType === "date") {
				console.log(label, local)
				const formattedDate = new Intl.DateTimeFormat(local).format(new Date(label));
				const formattedDateWithDot = formattedDate.replace(/\//g, '.');
				setLabelAxeX(formattedDateWithDot);
			}
		}
	}, [label, labelType, local])

	if (active && payload && payload.length) {
		return (
			<div className="flex flex-col rounded border bg-background/80 p-3 gap-1">
				<p className="text-xs">{labelAxeX}</p>
				{payload.map((p: any, i: number) => {
					return (
						<div key={i} className="flex items-center justify-between text-sm">
							<div className="flex items-center">
								<svg className="recharts-surface" width="14" height="14" viewBox="0 0 32 32" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
									<path strokeWidth="4" fill="none" stroke={styles.colors[i].color} d="M0,16h10.666666666666666 A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16 H32M21.333333333333332,16 A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16" className="recharts-legend-icon"></path>
								</svg>
								<p key={i} className="font-thin text-foreground/65 mr-4">{p.name}</p>
							</div>
							<p>{p.value}</p>
						</div>
					)
				})}
			</div>
		);
	}
	return null;
}

export default CustomTooltip;