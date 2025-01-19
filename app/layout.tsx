import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navagiation";
import CategoriesList from "@/components/categoriesList";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "blogman",
  description: "the best place to get the best blog post",
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
          <Navigation />
          <CategoriesList/>
          {children}
        </div>
      </body>
    </html>
  );
}
