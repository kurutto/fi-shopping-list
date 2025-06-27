import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/lib/next-auth/provider";
import Header from "@/components/header/header";
import { ModalContextProvider } from "@/context/modalContext";

export const metadata: Metadata = {
  title: "FI買物リスト",
  description: "在庫管理もできる買物リストアプリ",
};
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansJP.className} antialiased min-h-full`}>
        <div className="min-h-screen flex flex-col">
          <NextAuthProvider>
            <ModalContextProvider>
              <Header />
              <main className="flex-1 w-full md:px-5 md:py-20 md:max-w-7xl md:mx-auto md:space-y-12 max-md:px-4 max-md:pt-11 max-md:pb-20 max-md:space-y-6 max-md:bg-slight-gray">
                {children}
              </main>
            </ModalContextProvider>
          </NextAuthProvider>
        </div>
      </body>
    </html>
  );
}
