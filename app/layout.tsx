import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FloatingCallBtn } from "@/components/CallBtn";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Better for Core Web Vitals
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pipeypro.com'),
  title: {
    default: "Sump Pump Installation Near Me | Professional Repair & Replacement",
    template: "%s"
  },
  description: "Find expert sump pump installation and repair near me. 24/7 flood protection, basement waterproofing, and battery backup systems. Licensed pros in 31,000+ cities.",
  keywords: "sump pump installation, sump pump repair, basement waterproofing, battery backup sump pump, sewage ejector pump, flood prevention, sump pump replacement, water backup systems, drain tile installation, french drain installation",
  authors: [{ name: 'Pipey Pro' }],
  creator: 'Pipey Pro',
  publisher: 'Pipey Pro',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://pipeypro.com',
    languages: {
      'en-US': 'https://pipeypro.com',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Pipey Pro',
    title: 'Sump Pump Installation Near Me | Professional Repair & Replacement',
    description: 'Find expert sump pump installation and repair near me. 24/7 flood protection, basement waterproofing, and battery backup systems.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pipey Pro - Sump Pump Installation & Repair',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sump Pump Installation Near Me | Pipey Pro',
    description: 'Find expert sump pump installation and repair near me. 24/7 flood protection, basement waterproofing, and battery backup systems.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: "JsOFIn-4LScmGhM6RHqe9T9RYnGI4cMTn7ODAKY_iJw" // Updated verification code
  },
  category: 'Home Improvement',
};

// Organization Schema for Site-wide SEO
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Pipey Pro",
  "url": "https://pipeypro.com",
  "logo": "https://pipeypro.com/logo.png",
  "description": "America's #1 sump pump installation directory connecting homeowners with licensed local plumbing and waterproofing contractors.",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-321-342-0091",
    "contactType": "customer service",
    "availableLanguage": "English"
  },
  "sameAs": []
};

// WebSite Schema for Sitelinks Search Box
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Pipey Pro",
  "url": "https://pipeypro.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://pipeypro.com/{search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external resources for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch for analytics/tracking if any */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6SFTTD69YW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6SFTTD69YW');
          `}
        </Script>
        {children}
        <FloatingCallBtn />
      </body>
    </html>
  );
}

