// components/NavBar.jsx
import Link from "next/link";
import React from "react";
import {
  useTranslations,
  useLocale,
} from "next-intl";
import { cookies, headers } from "next/headers";

const NavBar = () => {
  const t = useTranslations("navbar");
  const locale = useLocale();

  const isLogged = cookies().get("connect.sid");

  return (
    <nav className="md:max-w-7xl mx-auto w-full max-w-5xl px-6 bg-muted/40 fixed flex items-center">
      <div className="mx-auto hidden h-[58px] w-full items-center justify-between transition duration-500 ease-in-out md:flex">
        <div className="flex lg:w-[225px]">
          <Link
            className="font-semibold"
            href="/"
          >
            Nexus
          </Link>
        </div>
        <div className="flex lg:w-[225px] flex justify-end gap-2">
          {!isLogged ? (
            <>
              <Link
                className="h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary rounded-md"
                href={`/${locale}/signin`}
              >
                {t("sign-in")}
              </Link>
              <Link
                className="h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow rounded-md hover:bg-primary/90"
                href={`/${locale}/signup`}
              >
                {t("sign-up")}
              </Link>
            </>
          ) : (
            <Link
              className="h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow rounded-md hover:bg-primary/90"
              href={`/${locale}/dashboard`}
            >
              {t("dashboard")}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
