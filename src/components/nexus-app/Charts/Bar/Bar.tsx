import { Charts } from '@/data/type/Charts';
import useDashboardStore from '@/store/dashboardStore';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, Legend, XAxis, CartesianGrid, YAxis, Label } from 'recharts';
import CustomizedAxisTick from '../tickAxeX';
import CustomTooltip from '../tooltip';
import themes from '@/data/config/themesChart.json';
import CircleLoader from '../../Loader/CircleLoader';
import LegendCustom from '../legend';

interface BarProps {
	data: any;
	config: any;
}

const NexusBar: React.FC<BarProps> = ({ data, config }) => {
	
	const [styles, setStyles] =  useState((themes as any)[config.theme])
	const [propertiesSelected, setPropertiesSelected] = useState([])
	const [dataAxeX, setDataAxeX] = useState<any>([])
	const [isLoading, setIsLoading] = useState(true)
	const [opacity, setOpacity] = useState<any>([])


	const SvgComponent = (props: any) => {
		const { fill, x, y, width, height, strokeOpacity } = props;
		const pathData = `
		M${x + 4},${y} 
		H${x + width - 4} 
		Q${x + width},${y} ${x + width},${y + 4} 
		V${y + height} 
		H${x} 
		V${y + 4} 
		Q${x},${y} ${x + 4},${y} 
		Z
	  `;
		return (
			<path 
			d={pathData} 
			opacity={strokeOpacity}
			style={{ fill: fill }} 
		  />
	
		);
	  };

	useEffect(() => {
		setIsLoading(true)
		const getPropertiesSelected = data.properties?.filter((p: any) => {
			if(config.dataSelected?.length == 0) return false
			
			return config.dataSelected?.map((ds: any) => ds.axe == "Y" ? ds.id: false).includes(p.id)
		})
	
		const getDataAxeX = data.properties?.filter((p: any) => {
			if(config.dataSelected?.length == 0) return true
			return config.dataSelected?.map((ds: any) => ds.axe == "X" ? ds.id: false).includes(p.id)
		})
		setPropertiesSelected(getPropertiesSelected)
		setDataAxeX(getDataAxeX)
		const op: any = propertiesSelected?.map((ds: any) => {
			return {name: ds.name, opacity: 1}
		})
		setOpacity(op)
		setIsLoading(false)
	}, [data, config])

	useEffect(() => {
		setStyles((themes as any)[config.theme])
	}, [config])

	const getOpacity = (name: string) => {
		const op: any = opacity.find((o: any) => o.name === name)
		return op?.opacity
	}

	const setOpacityAll = (name?: string) => {
		const updatedOpacity: any = opacity.map((op: any) => {
			if(!name) {
				return { ...op, opacity: 1 };
			}
			if (op.name === name) {
				return { ...op, opacity: 1 };
			} else {
				return { ...op, opacity: 0.2 };
			}
		});
		setOpacity(updatedOpacity);
	};

	return (
		<>
		{isLoading ? (<CircleLoader />) :
		(
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={data.data} margin={{ top: 0, right: 0, bottom: config.axeX?.label || config.legend.display ? 20 : 0, left: config.axeY?.label ? 10 : 0 }}>
					{config.background && <CartesianGrid strokeDasharray={`${styles.grid.widthDash} ${styles.grid.gapDash}`} stroke={styles.grid.color} />}
					<XAxis dataKey={dataAxeX?.length > 0 ?dataAxeX[0]?.name : null} tick={<CustomizedAxisTick styles={styles} type={dataAxeX?.length > 0 ?dataAxeX[0]?.type : null} />}  style={{stroke: styles.grid.color}}>
						{config.axeX?.label !== "" && <Label value={config.axeX.label} position={config.axeX?.position} fill={styles.fontColor} fontSize={styles.fontSize} fontWeight={styles.fontWeight} />}
					</XAxis>
					<YAxis tick={{fill: styles.fontColor, strokeWidth: 0, fontSize: styles.fontSize, fontWeight: styles.fontWeight }}  style={{stroke: styles.grid.color}}>
						{config.axeY?.label !== "" && <Label value={config.axeY.label} angle={-90}  position={config.axeY?.position} fill={styles.fontColor} fontSize={styles.fontSize} fontWeight={styles.fontWeight} />}
					</YAxis>	
					{config.legend.display && <Legend content={<LegendCustom setOpacityAll={setOpacityAll} config={config} styles={styles} type="bar"/>} verticalAlign={config.legend.verticalAlign} />}
					<Tooltip cursor={{ fill: `${styles.hoverColor}20`}} content={<CustomTooltip styles={styles} labelType={dataAxeX?.length > 0 ?dataAxeX[0]?.type : null}/>}/>
					{propertiesSelected?.map((p: any, i: number) => {
						return <Bar barSize={20} shape={<SvgComponent  strokeOpacity={getOpacity(p.name)} />} type={config.lineType} dataKey={p.name} fill={styles.colors[i].color} key={p.id} />
					})}
				</BarChart>
		</ResponsiveContainer>
		)}
	</>
	);
};

export default NexusBar;