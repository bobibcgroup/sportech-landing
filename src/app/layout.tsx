import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sportech — The Fan Engagement Infrastructure",
  description:
    "Patented player camera technology, live predictions, fan voting, AR match view, and more. One platform. Every sport. Infinite fans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-canvas text-on-dark">{children}</body>
    </html>
  );
}
