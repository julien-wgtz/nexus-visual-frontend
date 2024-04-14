import * as React from "react";
import {
  NextIntlClientProvider,
  useLocale,
  useMessages,
  useTranslations,
} from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import SignUpForm from "./form";

export async function generateMetadata({
  params: { locale },
}: any) {
  const t = await getTranslations({
    locale,
    namespace: "sign-up",
  });
  return {
    title: t("title"),
  };
}

export default function SignUp() {
  const messages = useMessages();
  const t = useTranslations("sign-up");
  const locale = useLocale();

  return (
    <section className="flex w-full h-full">
      <div className="flex justify-center items-center w-2/4 hidden md:flex h-full p-4">
        <div className="w-full max-w-[450px] max-h-[680px] h-full bg-slate-100 rounded-2xl"></div>
      </div>
      <aside className="flex w-full md:w-2/4 h-full p-4 text-gray-100">
        <div className="flex flex-col justify-center items-start w-full h-full rounded-2xl p-8">
          <h2 className="text-xl font-semibold">
            {t("title")}
          </h2>
          <p className="text-sm mt-2">
            {t("description")}
            <Link
              className="ml-2 text-blue-600 font-medium"
              href={`/${locale}/signin`}
            >
              {t("sign-in")}
            </Link>
          </p>
          <NextIntlClientProvider
            messages={messages}
          >
            <SignUpForm />
          </NextIntlClientProvider>
          <p className="mt-8 w-full text-gray-500 text-xs text-center">
            By signing up, you agree to our terms
            and privacy policy.
          </p>
        </div>
      </aside>
    </section>
  );
}
