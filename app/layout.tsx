import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navagiation";
import { Toaster } from "react-hot-toast";
import { NextAuthProvider } from "@/components/provider";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "blognews",
  description: "the best place to get the best blog news around the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <div className="xl:max-w-[1280px] w-full m-auto mt-6 md:mt-12 ">
          <NextAuthProvider>
            <Navigation />
            {children}
            <Toaster />
          </NextAuthProvider>
        </div>
      </body>
    </html>
  );
}
