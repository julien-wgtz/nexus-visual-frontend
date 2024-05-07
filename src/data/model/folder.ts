import { fetchData } from '@/lib/fetch';
import { Folders } from '../type/Folders';
import useFolderStore from '@/store/folderStore';

class FoldersApi {
	private baseUrl: string | undefined;

	constructor() {
		this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "folders/";
	}

	async getAllFolders(accountId: number): Promise<Folders[]> {
		try {
			const response = await fetchData(`${this.baseUrl}`,  {
				body: JSON.stringify({
				  accountId,
				}),
			});
			const folders = await response.json();
			return folders;
		} catch (error) {
			console.error('Error while fetching folders:', error);
			throw error;
		}
	}

	async createFolder({accountId, order, name} : Folders): Promise<Folders> {
		try {
			const response = await fetchData(`${this.baseUrl}create`,  {
				body: JSON.stringify({
				  accountId,
				  name,
				  order
				}),
			});
			const folder = await response.json();
			return folder;
		} catch (error) {
			console.error('Error while creating folder:', error);
			throw error;
		}
	}

	async updateFolder(folder : Folders): Promise<Folders> {
		try {
			const response = await fetchData(`${this.baseUrl}update`,  {
				body: JSON.stringify(folder),
			});
			const folderRename = await response.json();
			return folderRename;
		} catch (error) {
			console.error('Error while updating folder:', error);
			throw error;
		}
	}

	async updateFolderOrder(indexOrigine: number, indexDestination: number): Promise<Folders[]>{
		try {
			const response = await fetchData(`${this.baseUrl}update-order`,  {
				body: JSON.stringify({
					indexOrigine,
					indexDestination
				}),
			});
			const folders = await response.json();
			return folders;
		} catch (error) {
			console.error('Error while updating folder order:', error);
			throw error;
		}
	}

	async deleteFolder(folderId : number): Promise<void> {
		try {
			const response = await fetchData(`${this.baseUrl}delete`,  {
				body: JSON.stringify({
					id: folderId
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to delete folder');
			}
			const folders = await response.json();
			return folders;
		} catch (error) {
			console.error('Error while deleting folder:', error);
			throw error;
		}
	}

	async deleteFolderWithCharts(folderId : number): Promise<void> {
		try {
			const response = await fetchData(`${this.baseUrl}delete-with-charts`,  {
				body: JSON.stringify({
					id: folderId
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to delete folder');
			}
			const folders = await response.json();
			return folders;
		} catch (error) {
			console.error('Error while deleting folder:', error);
			throw error;
		}
	}
}

export default FoldersApi;