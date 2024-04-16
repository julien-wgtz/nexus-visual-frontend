import createIntlMiddleware from "next-intl/middleware";
import {
  NextRequest,
  NextResponse,
} from "next/server";

const locales = ["en", "fr"];
const publicPages = ["/", "/signin", "/signup"];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

const authMiddleware = (req: NextRequest) => {
  const isAuthorized =
    req.cookies.get("connect.sid") !== undefined;
  if (isAuthorized) {
    return intlMiddleware(req);
  } else {
    return NextResponse.redirect(
      `${process.env.BASE_URL}signin`
    );
  }
};

export default function middleware(
  req: NextRequest
) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join(
      "|"
    )}))?(${publicPages.join("|")})?/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(
    req.nextUrl.pathname
  );

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
