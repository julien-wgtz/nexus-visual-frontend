import ViewerChart from '@/components/nexus-app/ViewerChart/ViewerChart';
import ChartsApi from '@/data/model/chart';
import React from 'react';

const Page = async ({ params }: { params: { shareToken: string }} ) => {

	const chartApi = new ChartsApi();
	const token = await decodeURIComponent(params.shareToken);
	const chart = await chartApi.getChartFromToken({ shareToken: token });

	return (
		<div className='flex items-center justify-center h-screen w-screen'>
		{chart.id ? (
			<ViewerChart chart={chart} />
		) : (
			<p>Erreur</p>
		)}
		</div>
	);
};

export default Page;