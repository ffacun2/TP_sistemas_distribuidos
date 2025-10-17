import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/blocks/Header";
import Footer from "@/components/blocks/Footer";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { QueryProvider } from "@/app/QueryProvider";
import { ScrollTopButton } from "@/components/ui/ScrollTopButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wiki Kokemones",
  description: "En desarrollo",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}>
        <Header />
          <main className="relative grow-1 ">
            <Image
                src="/main_bg.png"
                alt="Background Main"
                sizes="100vw"
                fill
                priority
                className=" object-cover -z-10"
            />
            <div className="max-w-6xl mx-auto h-full">
              <div className="bg-[#f5f5f5] flex flex-col z-10 text-center h-full border-r-2 border-l-2 border-gray-300 dark:bg-gray-800 dark:border-gray-700 shadow-lg">
                <Navbar/>
                <div className="flex grow-1 items-center justify-center ">
                  <QueryProvider>
                    {children}
                    <ScrollTopButton />
                  </QueryProvider>
                </div>
              </div>
            </div>
          </main>
        <Footer />
      </body>
    </html>
  );
}
