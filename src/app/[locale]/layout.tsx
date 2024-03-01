import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/ui/navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function LocalLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html
      lang={locale}
      className="text-gray-100 bg-slate-950"
    >
      <body className="flex flex-col items-center h-screen bg-slate-950">
        <NavBar />
        <main className="mt-[58px]">
          {children}
        </main>
      </body>
    </html>
  );
}
