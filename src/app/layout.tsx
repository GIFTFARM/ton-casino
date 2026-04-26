import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TON Casino - Mini Games",
  description: "Play mini casino games with TON cryptocurrency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className={`${inter.variable} min-h-full flex flex-col bg-[#1E1F22] text-white`}>
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
