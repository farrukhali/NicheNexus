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
  metadataBase: new URL('https://usgutterinstallation.com'),
  title: {
    default: "Gutter Installation Near Me | Seamless Gutters & Gutter Guards",
    template: "%s"
  },
  description: "Find expert gutter installation and repair near me. Seamless gutters, gutter guards, soffit & fascia repair. Licensed pros in 31,000+ cities.",
  keywords: "gutter installation near me, seamless gutters near me, gutter repair near me, gutter guards near me, gutter cleaning near me, gutter companies near me, leaf guard gutters near me, soffit repair near me, fascia repair near me, downspout installation near me",
  authors: [{ name: 'US Gutter Installation' }],
  creator: 'US Gutter Installation',
  publisher: 'US Gutter Installation',
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
    canonical: 'https://usgutterinstallation.com',
    languages: {
      'en-US': 'https://usgutterinstallation.com',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'US Gutter Installation',
    title: 'Gutter Installation Near Me | Seamless Gutters & Gutter Guards',
    description: 'Find expert gutter installation and repair near me. Seamless gutters, gutter guards, soffit & fascia repair.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'US Gutter Installation - Seamless Gutters & Gutter Guards',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gutter Installation Near Me | US Gutter Installation',
    description: 'Find expert gutter installation and repair near me. Seamless gutters, gutter guards, soffit & fascia repair.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: "google3bbb133698f713fa" // Updated verification code
  },
  category: 'Home Improvement',
};

// Organization Schema for Site-wide SEO
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "US Gutter Installation",
  "url": "https://usgutterinstallation.com",
  "logo": "https://usgutterinstallation.com/logo.png",
  "description": "America's #1 gutter installation directory connecting homeowners with licensed local gutter contractors.",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-858-898-5338",
    "contactType": "customer service",
    "availableLanguage": "English"
  },
  "sameAs": []
};

// WebSite Schema for Sitelinks Search Box
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "US Gutter Installation",
  "url": "https://usgutterinstallation.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://usgutterinstallation.com/{search_term_string}"
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
    <html lang="en" suppressHydrationWarning>
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

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "v8ga79vpui");
          `}
        </Script>
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

