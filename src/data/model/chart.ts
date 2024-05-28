import { fetchData } from '@/lib/fetch';
import { Folders } from '../type/Folders';
import { Charts } from '../type/Charts';

class ChartsApi {
	private baseUrl: string | undefined;

	constructor() {
		this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "charts/";
	}

	async createChart({folderId, title, type, databaseId} : Charts): Promise<Charts> {
		try {
			const response = await fetchData(`${this.baseUrl}create`,  {
				body: JSON.stringify({
				  folderId,
				  title,
				  type,
				  databaseId
				}),
			});
			const chart = await response.json();
			return chart;
		} catch (error) {
			console.error('Error while creating chart:', error);
			throw error;
		}
	}

	async updateConfigChart({id, config}: Charts): Promise<void> {
		try {
			const response = await fetchData(`${this.baseUrl}update-config-from-chart`, {
				body: JSON.stringify({
					chartId: id,
					config
				}),
			});
			const chart = await response.json();
			return chart;
		} catch (error) {
			console.error('Error while deleting chart:', error);
			throw error;
		}
	}

	async deleteChart({id} : Charts): Promise<void> {
		try {
			const response = await fetchData(`${this.baseUrl}delete`, {
				body: JSON.stringify({
					id
				}),
			});
			const folders = await response.json();
			return folders;
		} catch (error) {
			console.error('Error while deleting chart:', error);
			throw error;
		}
	}

	async updateChart({id, title, type, databaseId} : Charts): Promise<Charts> {
		try {
			const response = await fetchData(`${this.baseUrl}update`, {
				body: JSON.stringify({
					id,
					title,
					type,
					databaseId
				}),
			});
			const chart = await response.json();
			return chart;
		} catch (error) {
			console.error('Error while updating chart:', error);
			throw error;
		}
	}

	async updateChartOrder(indexOrigine: number, indexDestination: number, folderOrigineId: number, folderDestinationId: number): Promise<Folders[]>{
		try {
			const response = await fetchData(`${this.baseUrl}update-order`,  {
				body: JSON.stringify({
					indexOrigine,
					indexDestination,
					folderOrigineId,
					folderDestinationId
				}),
			});
			if(response.ok) {
				const folders = await response.json();
				return folders;
			}
			throw new Error('Failed to update chart order');
		} catch (error) {
			console.error('Error while updating folder:', error);
			throw error;
		}
	}

	async getConfigChart({id}: Charts): Promise<any> {
		try {
			const response = await fetchData(`${this.baseUrl}get-config-from-chart`, {
				body: JSON.stringify({
					chartId: id
				}),
			
			});
			if(response.ok) {
				const data = await response.json();
				return data;
			}
			throw new Error('Failed to get chart data');
		} catch (error) {
			throw new Error('Failed to get chart data');
		}
	}

	async getChartData({id} : Charts): Promise<Charts> {
		try {
			const response = await fetchData(`${this.baseUrl}get-data-from-chart`, {
				body: JSON.stringify({
					chartId: id
				}),
			
			});
			if(response.ok) {
				const data = await response.json();
				return data;
			}
			throw new Error('Failed to get chart data');
		} catch (error) {
			throw new Error('Failed to get chart data');
		}
	}	
}

export default ChartsApi;