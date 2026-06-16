import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "./fonts/poly-inter-variable-font.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/poly-inter.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  title: "Polypoly",
  description: "Prediction markets platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
