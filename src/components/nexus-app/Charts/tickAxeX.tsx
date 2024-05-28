import React, { useEffect, useState } from 'react';

const CustomizedAxisTick = (props: any) => {
	const { x, y, payload, type, styles } = props;
	const [label, setLabel] = useState(payload.value)
	
	useEffect(() => {	
		if(type == "date"){
			const date = new Date(payload.value);
			const month = (date.getMonth() + 1).toString().padStart(2, '0');
			const day = date.getDate();
			setLabel(`${day}/${month}`);
		}
	})

	return (
		<g transform={`translate(${x},${y})`}>
			<text x={12} y={0} dy={13} textAnchor="end" fontSize={styles.fontSize} strokeWidth={0} fontWeight={styles.fontWeight} fill={styles.fontColor} transform="rotate(-25)">
				{label}
			</text>
		</g>
	);
};


export default CustomizedAxisTick;
