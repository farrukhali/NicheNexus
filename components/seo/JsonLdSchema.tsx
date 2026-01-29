import { getSiteConfig } from '@/lib/site-config'

interface JsonLdSchemaProps {
    type: 'LocalBusiness' | 'Organization' | 'FAQPage';
    data: any;
}

export default async function JsonLdSchema({ type, data }: JsonLdSchemaProps) {
    const siteConfig = await getSiteConfig();

    let schema: any = {
        '@context': 'https://schema.org',
        '@type': type,
        ...data
    };

    // Common Address and Social Data
    const address = siteConfig.businessAddress ? {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.businessAddress,
        addressLocality: siteConfig.businessCity,
        addressRegion: siteConfig.businessState,
        postalCode: siteConfig.businessZip,
        addressCountry: 'US'
    } : undefined;

    const socialLinks = [
        siteConfig.facebookUrl,
        siteConfig.instagramUrl,
        siteConfig.twitterUrl,
        siteConfig.linkedinUrl
    ].filter(Boolean);

    if (type === 'LocalBusiness' || type === 'Organization') {
        schema = {
            ...schema,
            name: data.name || siteConfig.siteName,
            url: `https://${siteConfig.domain}`,
            telephone: siteConfig.contactPhone,
            logo: siteConfig.logoUrl,
            address: address || data.address,
            sameAs: socialLinks.length > 0 ? socialLinks : data.sameAs
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
