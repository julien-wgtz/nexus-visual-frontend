"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var action_1 = require("@/components/nexus-app/Sidebar/action");
var zustand_1 = require("zustand");
var useFolderStore = zustand_1.create(function (set) { return ({
    folders: [],
    setFolders: function (folders) {
        set(function (state) {
            return { folders: folders };
        });
    },
    addFolder: function (folder) {
        set(function (state) {
            return { folders: __spreadArrays(state.folders, [folder]) };
        });
    },
    updateChart: function (chart) {
        set(function (state) {
            var folder = state.folders.find(function (f) { return f.charts.find(function (c) { return c.id === chart.id; }); });
            var chartIndex = folder.charts.findIndex(function (c) { return c.id === chart.id; });
            folder.charts[chartIndex] = chart;
            return { folders: state.folders };
        });
    },
    updateFolder: function (folder) {
        set(function (state) {
            var folderIndex = state.folders.findIndex(function (f) { return f.id === folder.id; });
            var updatedFolders = __spreadArrays(state.folders);
            updatedFolders[folderIndex] = folder;
            return { folders: updatedFolders };
        });
    },
    addChart: function (chart) {
        set(function (state) {
            var updatedFolders = __spreadArrays(state.folders);
            var folder = updatedFolders.find(function (f) { return f.id === chart.folderId; });
            if (folder.charts === undefined) {
                folder.charts = [];
            }
            folder.charts.push(chart);
            return { folders: updatedFolders };
        });
    },
    removeChart: function (chartId) {
        set(function (state) {
            var updatedFolders = __spreadArrays(state.folders);
            var folder = updatedFolders.find(function (f) { return f.charts.find(function (c) { return c.id === chartId; }); });
            var chart = folder.charts.find(function (c) { return c.id === chartId; });
            var index = folder.charts.indexOf(chart);
            folder.charts.splice(index, 1);
            return { folders: updatedFolders };
        });
    },
    removeFolder: function (folderId) {
        set(function (state) {
            var updatedFolders = __spreadArrays(state.folders);
            var folder = updatedFolders.find(function (f) { return f.id === folderId; });
            var index = updatedFolders.indexOf(folder);
            updatedFolders.splice(index, 1);
            updatedFolders.forEach(function (f, i) {
                console.log(f.order, index);
                if (f.order > folder.order && !f.isShadow) {
                    f.order--;
                    action_1.updateFolderOrder(f.id, f.order);
                }
            });
            return { folders: updatedFolders };
        });
    },
    moveFolders: function (currentIndex, newIndex) {
        set(function (state) {
            var updatedFolders = __spreadArrays(state.folders);
            var folder = updatedFolders.find(function (f) { return f.order === currentIndex; });
            if (currentIndex > newIndex) {
                updatedFolders.forEach(function (f) {
                    if (f.order >= newIndex && f.order < currentIndex) {
                        f.order++;
                        action_1.updateFolderOrder(f.id, f.order);
                    }
                });
                folder.order = newIndex;
                action_1.updateFolderOrder(folder.id, newIndex);
            }
            else {
                updatedFolders.forEach(function (f) {
                    if (f.order < newIndex && f.order > currentIndex) {
                        f.order--;
                        action_1.updateFolderOrder(f.id, f.order);
                    }
                });
                folder.order = newIndex - 1;
                action_1.updateFolderOrder(folder.id, folder.order);
            }
            return { folders: updatedFolders };
        });
    }
}); });
exports["default"] = useFolderStore;
