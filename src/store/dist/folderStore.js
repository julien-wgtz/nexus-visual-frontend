"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
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
            // ajoute le folder à lavant dernier index dans le table folders
            var updatedFolders = __spreadArrays(state.folders);
            updatedFolders.splice(updatedFolders.length - 1, 0, folder);
            return { folders: updatedFolders };
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
    updateChart: function (chart) {
        set(function (state) {
            var folder = state.folders.find(function (f) { return f.charts.find(function (c) { return c.id === chart.id; }); });
            var chartIndex = folder.charts.findIndex(function (c) { return c.id === chart.id; });
            folder.charts[chartIndex] = __assign({}, chart);
            return { folders: state.folders };
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
    }
}); });
exports["default"] = useFolderStore;
