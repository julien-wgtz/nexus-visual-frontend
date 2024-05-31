import { create } from 'zustand';


const useFolderStore = create((set) => ({
  folders: [],
  setFolders: (folders: any) => {
    set((state: any) => {
      return { folders };
    });
  },
  addFolder: (folder: any) => {
    set((state: any) => {
      // ajoute le folder à lavant dernier index dans le table folders
      const updatedFolders = [...state.folders];
      updatedFolders.splice(updatedFolders.length - 1, 0, folder);
      return { folders: updatedFolders };
    });
  },
  updateFolder: (folder: any) => {
    set((state: any) => {
      const folderIndex = state.folders.findIndex((f: any) => f.id === folder.id);
      const updatedFolders = [...state.folders];
      updatedFolders[folderIndex] = folder
      return {folders: updatedFolders}
    })
  },
  updateChart: (chart: any) => {
    set((state: any) => {
      const folder = state.folders.find((f: any) => f.charts.find((c: any) => c.id === chart.id));
      const chartIndex = folder.charts.findIndex((c: any) => c.id === chart.id);
      folder.charts[chartIndex] = { ...chart };
      return { folders: state.folders };
    });
  },
  addChart: (chart: any) => {
    set((state: any) => {
      const updatedFolders = [...state.folders];
      const folder = updatedFolders.find((f: any) => f.id === chart.folderId);
      if(folder.charts === undefined) {
        folder.charts = [];
      }
      folder.charts.push(chart);
      return { folders: updatedFolders };
    });
  },
  removeChart: (chartId: string) => {
    set((state: any) => {
      const updatedFolders = [...state.folders];
      const folder = updatedFolders.find((f: any) => f.charts.find((c: any) => c.id === chartId));
      const chart = folder.charts.find((c: any) => c.id === chartId);
      const index = folder.charts.indexOf(chart);
      folder.charts.splice(index, 1);
      return { folders: updatedFolders };
    });
  }
}));

export default useFolderStore;
