"use strict";
exports.__esModule = true;
exports.useAppStore = void 0;
var AccountEnum_1 = require("@/type/AccountEnum");
var zustand_1 = require("zustand");
var middleware_1 = require("zustand/middleware");
exports.useAppStore = zustand_1.create(middleware_1.persist(function (set, get) { return ({
    user: null,
    account: null,
    role: AccountEnum_1.AccountRole.FREE,
    setUser: function (user) { return set({ user: user }); },
    setAccount: function (account) {
        set({ account: account, role: (account === null || account === void 0 ? void 0 : account.role) || AccountEnum_1.AccountRole.FREE });
    }
}); }, {
    name: 'app-storage',
    storage: middleware_1.createJSONStorage(function () { return sessionStorage; })
}));
