import { config } from 'process';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useDashboardStore = create( persist((set, get) => ({
	dialogIsOpen: false,
	setDialogIsOpen: (isOpen: boolean) => set({ dialogIsOpen: isOpen }),
	currentChart: null,
	setCurrentChart: (chart: any) => {
		set(() => {
			return { currentChart: {...chart}, currentFolder: chart.folderId}
		})
	},
	currentFolder: null,
	setCurrentFolder: (folder: any) => set({ currentFolder: folder }),
	dataForChart: null,
	setDataForChart: (data: any) => set({ dataForChart: data}),
	restoreData: () => set({ 
		dataForChart: null,
		currentChart: null,
		currentFolder: null,
		dialogIsOpen: false,
		ImageChart: null,
	}),
	configChart: null,
	setConfigChart: (config: any) => set({ configChart: config}),
}),
{
  name: 'currentChart-storage',
  storage: createJSONStorage(() => sessionStorage),
}
));

export default useDashboardStore;