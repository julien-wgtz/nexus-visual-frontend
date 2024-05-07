import { fetchData } from '@/lib/fetch';
import { Folders } from '../type/Folders';
import useFolderStore from '@/store/folderStore';
import { Charts } from '../type/Charts';
import { deleteChart } from '@/components/nexus-app/Sidebar/action';

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
			const folders = await response.json();
			return folders;
		} catch (error) {
			console.error('Error while updating folder:', error);
			throw error;
		}
	}
}

export default ChartsApi;