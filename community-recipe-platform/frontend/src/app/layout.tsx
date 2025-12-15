import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Community Recipes MVP",
  description: "A simple recipe sharing platform built with Next.js and FastAPI.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="container mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}
