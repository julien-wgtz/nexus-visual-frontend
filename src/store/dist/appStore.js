"use strict";
exports.__esModule = true;
exports.useAppStore = void 0;
var Account_1 = require("@/data/enum/Account");
var zustand_1 = require("zustand");
var middleware_1 = require("zustand/middleware");
exports.useAppStore = zustand_1.create(middleware_1.persist(function (set, get) { return ({
    user: null,
    account: null,
    accountId: null,
    role: Account_1.AccountStatus.FREE,
    theme: '',
    setTheme: function (theme) { return set({ theme: theme }); },
    setUser: function (user) { return set({ user: user }); },
    setAccount: function (account) {
        set({
            account: account,
            status: account.status,
            accountId: account.id
        });
    }
}); }, {
    name: 'app-storage',
    storage: middleware_1.createJSONStorage(function () { return sessionStorage; })
}));
