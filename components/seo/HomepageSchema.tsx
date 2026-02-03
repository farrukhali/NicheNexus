import { getSiteConfig } from '@/lib/site-config'
import { replacePlaceholders } from '@/lib/seo-utils'
import { getNicheConfig } from '@/lib/niche-configs'

interface HomepageSchemaProps {
    domain?: string
    nicheSlug?: string
}

export default async function HomepageSchema(props?: HomepageSchemaProps) {
    const siteConfig = await getSiteConfig()
    const niche = await getNicheConfig(siteConfig.nicheSlug)

    const domain = props?.domain || siteConfig.domain
    const baseUrl = `https://${domain}`

    // Organization Schema
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": siteConfig.siteName || `${niche.name} Experts`,
        "description": `Professional ${niche.name.toLowerCase()} services across the United States. Find licensed, insured contractors near you.`,
        "url": baseUrl,
        "logo": siteConfig.logoUrl || `${baseUrl}/logo.png`,
        "image": siteConfig.logoUrl || `${baseUrl}/logo.png`,
        "telephone": siteConfig.contactPhone || "+1-555-123-4567",
        "email": replacePlaceholders(siteConfig.contactEmail || "contact@example.com", { baseurl: siteConfig.domain }),
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "US",
            "addressRegion": "Nationwide"
        },
        "priceRange": "$$",
        "areaServed": {
            "@type": "Country",
            "name": "United States"
        },
        "serviceType": niche.primaryService,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": (siteConfig.trustSignals?.average_rating || 4.8).toString(),
            "reviewCount": (siteConfig.trustSignals?.total_reviews || 1247).toString(),
            "bestRating": "5",
            "worstRating": "1"
        }
    }

    // WebSite Schema with Sitelinks Search Box
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": siteConfig.siteName || `${niche.name} Directory`,
        "url": baseUrl,
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${baseUrl}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    }

    // Service Schema
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": niche.primaryService,
        "serviceType": niche.name,
        "provider": {
            "@type": "LocalBusiness",
            "name": siteConfig.siteName || `${niche.name} Experts`
        },
        "areaServed": {
            "@type": "Country",
            "name": "United States"
        },
        "description": `Find professional ${niche.name.toLowerCase()} contractors across the USA. Get free quotes from licensed, insured experts in your area.`,
        "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "USD",
            "lowPrice": "99",
            "availability": "https://schema.org/InStock"
        }
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
        </>
    )
}
