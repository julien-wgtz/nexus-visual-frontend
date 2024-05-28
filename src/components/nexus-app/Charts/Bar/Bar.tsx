import { Charts } from '@/data/type/Charts';
import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, Legend, XAxis, CartesianGrid, YAxis } from 'recharts';

interface BarProps {
	data: Charts[];
}

const NexusBar: React.FC<BarProps> = ({ data }) => {
	
	console.log(data)

	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart width={150} height={40} data={data}>
				<Bar dataKey="Somme_compte" fill="#4440cc" />
				<Bar dataKey="BankRoll_veille" fill="#10c0b8" />
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="Date" />
				<YAxis label="test"/>
				<Tooltip />
				<Legend align='left' verticalAlign='bottom' margin={{top:50, left: 0, right: 0, bottom:50}}/>
			</BarChart>
      </ResponsiveContainer>
	);
};

export default NexusBar;