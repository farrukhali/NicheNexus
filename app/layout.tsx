import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnalyticsScripts from "@/components/analytics/AnalyticsScripts";
import { getSiteConfig } from "@/lib/site-config";
import JsonLdSchema from "@/components/seo/JsonLdSchema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfig();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <AnalyticsScripts />

        <JsonLdSchema type="Organization" data={{
          name: siteConfig.siteName,
          url: siteConfig.domain,
          logo: `${siteConfig.domain}/logo.png`,
          contactPoint: {
            telephone: siteConfig.contactPhone,
            contactType: "customer service"
          }
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

