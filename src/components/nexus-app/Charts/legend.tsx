import { set } from 'lodash';
import React, { use, useEffect, useState } from 'react';
import { Legend } from 'recharts';

interface LegendProps {
	config: any;
	styles: any;
	type: string;
	payload?: any;
	setOpacityAll: (name?: string) => void;
}

const LegendCustom: React.FC<LegendProps> = (props) => {
	const { config, styles, type, payload, setOpacityAll} = props;
	const [align, setAlign] = useState("")

	  useEffect(() => {
		if(config.legend.align === "center") {
			setAlign("center")
		} else if(config.legend.align === "left") {
			setAlign("start")
		}
		else {
			setAlign("end")
		}
	  }, [config, styles])

	  const handleMouseEnter = (o:any) => {
		const { dataKey } = o;
		console.log("enter", dataKey);
		setOpacityAll(dataKey)
	  }

	  const handleMouseLeave = (o: any) => {
		const { dataKey } = o;
		console.log("leave", dataKey);
		setOpacityAll()
	  }



	return (
		<ul className='flex flex-wrap gap-3 pt-6' style={{justifyContent: align}}>
		{
		  payload.map((entry:any, index: number) => (
			<li 
				className='flex items-center cursor-pointer '
				onMouseEnter={() => handleMouseEnter(entry)}
				onMouseLeave={() => handleMouseLeave(entry)}
				key={`item-${index}`}
			>
				<svg width="14" height="14" viewBox="0 0 32 32" style={{display: "inline-block", verticalAlign: "middle", marginRight: "4px"}}><path stroke-width="4" fill="none" stroke={styles.colors[index].color} d="M0,16h10.666666666666666
            A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
            H32M21.333333333333332,16
            A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"></path></svg>
				<p
					style={{
						color: styles.colors[index].color,
						fontSize: styles.fontSize,
						fontWeight: styles.fontWeight
					}} 
				>
					{entry.value}
				</p>
			</li>
		  ))
		}
	  </ul>
	);
};

export default LegendCustom;