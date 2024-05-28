import { fetchData } from '@/lib/fetch';
import { Folders } from '../type/Folders';
import useFolderStore from '@/store/folderStore';
import { User } from '../type/User';

class UserApi {
	private baseUrl: string | undefined;

	constructor() {
		this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "users/get-user-by-id";
	}

	async getUserById(userId: number): Promise<User> {
		try {
			const response = await fetchData(`${this.baseUrl}`,  {
				body: JSON.stringify({
				  userId,
				}),
			});
			const user = await response.json();
			return user;
		} catch (error) {
			console.error('Error while fetching folders:', error);
			throw error;
		}
	}
}

export default UserApi;