import { Charts } from '@/data/type/Charts';
import useDashboardStore from '@/store/dashboardStore';
import React, { useEffect, useState } from 'react';
import {  ResponsiveContainer, Tooltip, Legend, XAxis, CartesianGrid, YAxis, LineChart, Line, Label, CartesianAxis } from 'recharts';
import themes from '@/data/config/themesChart.json';
import CustomizedAxisTick from '../tickAxeX';

interface NexusLineProps {
	data: Charts[];
}

const NexusLine: React.FC<NexusLineProps> = ({ data }) => {
	
	const config = useDashboardStore((state) => state.configChart);
	const [styles, setStyles] =  useState(themes[config.theme])
	const [propertiesSelected, setPropertiesSelected] = useState([])
	const [dataAxeX, setDataAxeX] = useState([])

	useEffect(() => {
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
	}, [data, config])

	useEffect(() => {
		setStyles(themes[config.theme])
	}, [config])

	return (	
		<ResponsiveContainer  width="100%" height="100%">
			<LineChart data={data.data} margin={{ top: 0, right: 0, bottom: config.axeX?.label || config.legend.display ? 20 : 0, left: config.axeY?.label ? 10 : 0 }}>
				{config.background && <CartesianGrid strokeDasharray={`${styles.grid.widthDash} ${styles.grid.gapDash}`} stroke={styles.grid.color} />}
				<XAxis dataKey={dataAxeX[0]?.name} tick={<CustomizedAxisTick styles={styles} type={dataAxeX[0]?.type} />}  style={{stroke: styles.grid.color}}>
					{config.axeX?.label !== "" && <Label value={config.axeX.label} position={config.axeX?.position} fill={styles.fontColor} fontSize={styles.fontSize} fontWeight={styles.fontWeight} />}
				</XAxis>
				<YAxis tick={{fill: styles.fontColor, strokeWidth: 0, fontSize: styles.fontSize, fontWeight: styles.fontWeight }}  style={{stroke: styles.grid.color}}>
					{config.axeY?.label !== "" && <Label value={config.axeY.label} angle={-90}  position={config.axeY?.position} fill={styles.fontColor} fontSize={styles.fontSize} fontWeight={styles.fontWeight} />}
				</YAxis>	
				{config.legend.display && <Legend verticalAlign={config.legend.verticalAlign} align={config.legend.align} height={30}  wrapperStyle={{paddingTop: "25px", fontSize: styles.fontSize, fontWeight: styles.fontWeight}}/>}
				{propertiesSelected.map((p: any, i: number) => {
					return <Line type={config.lineType} dataKey={p.name} stroke={styles.colors[i].color} key={p.id} />
				})}
				<Tooltip />
			</LineChart>
      </ResponsiveContainer>
	);
};

export default NexusLine;
