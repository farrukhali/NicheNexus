import Head from 'next/head'
import { getSiteConfig } from '@/lib/site-config'

interface HeadManagerProps {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    canonical?: string;
}

export default async function HeadManager({ title, description, keywords, ogImage, canonical }: HeadManagerProps) {
    const siteConfig = await getSiteConfig();
    const fullTitle = title ? `${title} | ${siteConfig.siteName}` : siteConfig.siteName;

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords.join(', ')} />}

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteConfig.domain + canonical} />
            {ogImage && <meta property="og:image" content={ogImage} />}

            {/* Canonical */}
            {canonical && <link rel="canonical" href={siteConfig.domain + canonical} />}

            {/* Analytics Verification */}
            {siteConfig.gscId && <meta name="google-site-verification" content={siteConfig.gscId} />}
        </Head>
    );
}
