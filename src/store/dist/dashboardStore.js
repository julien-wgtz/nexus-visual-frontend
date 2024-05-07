"use strict";
exports.__esModule = true;
var zustand_1 = require("zustand");
var middleware_1 = require("zustand/middleware");
var useDashboardStore = zustand_1.create(middleware_1.persist(function (set, get) { return ({
    dialogIsOpen: false,
    setDialogIsOpen: function (isOpen) { return set({ dialogIsOpen: isOpen }); },
    currentChart: null,
    setCurrentChart: function (chart) { return set({ currentChart: chart }); },
    currentFolder: null,
    setCurrentFolder: function (folder) { return set({ currentFolder: folder }); },
    dataForChart: null,
    setDataForChart: function (data) { return set({ dataForChart: data }); }
}); }, {
    name: 'currentChart-storage',
    storage: middleware_1.createJSONStorage(function () { return sessionStorage; })
}));
exports["default"] = useDashboardStore;
