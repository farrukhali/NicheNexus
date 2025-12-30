import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gutterpro.com'), // Replace with actual domain
  title: {
    default: "GutterPro | Premier Gutter Installation & Repair Services",
    template: "%s | GutterPro"
  },
  description: "America's #1 rated gutter installation provided. Seamless gutters, guards, cleaning, and repair. Find your local expert today.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'GutterPro',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
