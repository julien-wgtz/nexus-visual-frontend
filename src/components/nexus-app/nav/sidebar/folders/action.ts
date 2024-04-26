import { fetchData } from '@/lib/fetch';

export const createFolder = async (
  name: string,
  accountId: number,
  index: number,
  callback: (folder: any) => void
) => {
  try {
    // Make an API call to create a folder on the backend
    const response = await fetchData(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}charts/create-folder`,
      {
        body: JSON.stringify({
          name: `${name}`,
          accountId: accountId,
          order: index,
        }),
      }
    );

    if (response.ok) {
      // Folder created successfully
      const newFolder = await response.json();
      callback(newFolder);
    } else {
      // Handle error response
      console.error('Failed to create folder');
    }
  } catch (error) {
    // Handle network or other errors
    console.error('An error occurred', error);
  }
};

export const removeFolder = async (
  folderId: string,
  callback: (folderId: any) => void
) => {
  try {
    const response = await fetchData(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}charts/delete-folder`,
      {
        body: JSON.stringify({
          id: folderId,
        }),
      }
    );

    if (response.ok) {
      callback(folderId);
    }
  } catch (error) {
    console.error('An error occurred', error);
  }
};

export const updateFolderOrder = async (folderId: string, order: number) => {
  try {
    const response = await fetchData(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}charts/change-order`,
      {
        body: JSON.stringify({
          id: folderId,
          order: order,
        }),
      }
    );

    if (!response.ok) {
      console.error('Failed to update folder order');
    }
  } catch (error) {
    console.error('An error occurred', error);
  }
};
