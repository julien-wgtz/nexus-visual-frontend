"use strict";
exports.__esModule = true;
exports.config = void 0;
var middleware_1 = require("next-intl/middleware");
var server_1 = require("next/server");
var locales = ["en", "fr", "es"];
var publicPages = ["/", "/signin", "/signup", "/chart/[^/]+"];
var intlMiddleware = middleware_1["default"]({
    locales: locales,
    defaultLocale: "en"
});
var authMiddleware = function (req) {
    var isAuthorized = req.cookies.get("connect.sid") !== undefined;
    if (isAuthorized) {
        return intlMiddleware(req);
    }
    else {
        return server_1.NextResponse.redirect(process.env.BASE_URL + "signin");
    }
};
function middleware(req) {
    var publicPathnameRegex = RegExp("^(/(" + locales.join("|") + "))?(" + publicPages.join("|") + ")?/?$", "i");
    var isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
    if (isPublicPage) {
        return intlMiddleware(req);
    }
    else {
        return authMiddleware(req);
    }
}
exports["default"] = middleware;
exports.config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"]
};
