import ChartType from "../enum/Charts";

export type Charts = {
	id?: number;
	title?: string;
	folderId?: number;
	databaseId?: string;
	type?: ChartType;
	currentChartType?: ChartType;
	config?: any;
	shareToken?: string;
};