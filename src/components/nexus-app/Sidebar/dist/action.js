"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deleteChart = exports.renameChart = exports.createChart = exports.updateFolderOrder = exports.renameFolder = exports.removeFolder = exports.createFolder = void 0;
var fetch_1 = require("@/lib/fetch");
exports.createFolder = function (name, accountId, index, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var response, newFolder, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, fetch_1.fetchData(process.env.NEXT_PUBLIC_BACKEND_URL + "charts/create-folder", {
                        body: JSON.stringify({
                            name: "" + name,
                            accountId: accountId,
                            order: index
                        })
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok) return [3 /*break*/, 3];
                return [4 /*yield*/, response.json()];
            case 2:
                newFolder = _a.sent();
                callback(newFolder);
                return [3 /*break*/, 4];
            case 3:
                // Handle error response
                console.error('Failed to create folder');
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                // Handle network or other errors
                console.error('An error occurred', error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.removeFolder = function (folderId, folderDestionationId) {
    if (folderDestionationId === void 0) { folderDestionationId = null; }
    return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch_1.fetchData(process.env.NEXT_PUBLIC_BACKEND_URL + "charts/delete-folder", {
                            body: JSON.stringify({
                                folderId: folderId,
                                folderDestionationId: folderDestionationId
                            })
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        console.error('Failed to delete folder');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('An error occurred', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.renameFolder = function (name, id, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var response, newFolder, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, fetch_1.fetchData(process.env.NEXT_PUBLIC_BACKEND_URL + "charts/rename-folder", {
                        body: JSON.stringify({
                            id: id,
                            name: name
                        })
                    })];
            case 1:
                response = _a.sent();
                if (!!response.ok) return [3 /*break*/, 2];
                console.error('Failed to update folder name');
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, response.json()];
            case 3:
                newFolder = _a.sent();
                callback(newFolder);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                console.error('An error occurred', error_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateFolderOrder = function (folderId, order) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetch_1.fetchData(process.env.NEXT_PUBLIC_BACKEND_URL + "charts/change-order", {
                        body: JSON.stringify({
                            id: folderId,
                            order: order
                        })
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    console.error('Failed to update folder order');
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error('An error occurred', error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// create a chart 
exports.createChart = function (title, folderId, type, order, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var response, newChart, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, fetch_1.fetchData(process.env.NEXT_PUBLIC_BACKEND_URL + "charts/create-chart", {
                        body: JSON.stringify({
                            folderId: folderId,
                            title: title,
                            type: type,
                            order: order
                        })
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok) return [3 /*break*/, 3];
                return [4 /*yield*/, response.json()];
            case 2:
                newChart = _a.sent();
                callback(newChart);
                return [3 /*break*/, 4];
            case 3:
                console.error('Failed to create chart');
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_5 = _a.sent();
                console.error('An error occurred', error_5);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.renameChart = function (title, id, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var response, newChart, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, fetch_1.fetchData(process.env.NEXT_PUBLIC_BACKEND_URL + "charts/update-chart", {
                        body: JSON.stringify({
                            id: id,
                            title: title
                        })
                    })];
            case 1:
                response = _a.sent();
                if (!!response.ok) return [3 /*break*/, 2];
                console.error('Failed to update chart');
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, response.json()];
            case 3:
                newChart = _a.sent();
                callback(newChart);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_6 = _a.sent();
                console.error('An error occurred', error_6);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteChart = function (chartId) { return __awaiter(void 0, void 0, void 0, function () {
    var response, chart, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch_1.fetchData(process.env.NEXT_PUBLIC_BACKEND_URL + "charts/delete-chart", {
                        body: JSON.stringify({
                            id: chartId
                        })
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    console.error('Failed to delete chart');
                }
                return [4 /*yield*/, response.json()];
            case 2:
                chart = _a.sent();
                console.log(chart);
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                console.error('An error occurred', error_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
