import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/public/navbar";
import {
  NextIntlClientProvider,
  useMessages,
} from "next-intl";

export default function LocalLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();

  return (
    <body className="flex flex-col items-center">
      <div className="bg-background flex justify-center w-full h-full">
        <NextIntlClientProvider messages={messages}>
          <NavBar />
        </NextIntlClientProvider>
        <main className="mt-[58px] md:max-w-7xl mx-auto w-full max-w-5xl">
          {children}
        </main>
      </div>
    </body>
  );
}
