import { updateFolderOrder } from '@/components/nexus-app/nav/sidebar/folders/action';
import { fetchData } from '@/lib/fetch';
import { setFips } from 'crypto';
import { remove } from 'lodash';
import { any } from 'zod';
import { create } from 'zustand';

const useFolderStore = create((set) => ({
  folders: [],
  updateFolders: (folders: any) => {
    set((state: any) => {
      return { folders };
    });
  },
  addFolder: (folder: any) => {
    set((state: any) => {
      const updatedFolders = [...state.folders, folder];
      return { folders: updatedFolders };
    });
  },
  removeFolder: (folderId: string) => { 
    set((state: any) => {
      const updatedFolders = [...state.folders];
      const folder = updatedFolders.find((f: any) => f.id === folderId);
      const index = updatedFolders.indexOf(folder);
      updatedFolders.splice(index, 1);
      updatedFolders.forEach((f: any) => {
        if (f.order > index) {
          f.order--;
          updateFolderOrder(f.id, f.order);
        }
      });
      return { folders: updatedFolders };
    });
  },
  moveFolders: (currentIndex: number, newIndex: number) => {
    set((state: any) => {
      const updatedFolders = [...state.folders];
      const folder = updatedFolders.find((f: any) => f.order === currentIndex);

      if (newIndex === 10000) {
        newIndex = updatedFolders.length;
      }

      if (currentIndex > newIndex) {
        updatedFolders.forEach((f: any) => {
          if (f.order >= newIndex && f.order < currentIndex) {
            f.order++;
            updateFolderOrder(f.id, f.order);
          }
        });
        folder.order = newIndex;
        updateFolderOrder(folder.id, newIndex);
      } else {
        updatedFolders.forEach((f: any) => {
          if (f.order < newIndex && f.order > currentIndex) {
            f.order--;
            updateFolderOrder(f.id, f.order);
          }
        });
        folder.order = newIndex - 1;
        updateFolderOrder(folder.id, folder.order);
      }
      return { folders: updatedFolders };
    });
  },
}));

export default useFolderStore;
