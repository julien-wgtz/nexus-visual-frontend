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
}),
{
  name: 'currentChart-storage',
  storage: createJSONStorage(() => sessionStorage),
}
));

export default useDashboardStore;