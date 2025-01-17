import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400"]});


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
      <body
        className={ubuntu.className}
      >
        {children}
      </body>
    </html>
  );
}
