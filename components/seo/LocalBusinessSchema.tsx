import { generateLocalReviews } from '@/lib/local-data-utils'
import { SiteConfig } from '@/lib/site-config'

interface LocalBusinessSchemaProps {
    city: string
    state: string
    stateCode: string
    zipCodes?: string[]
    latitude?: number
    longitude?: number
    serviceName: string
    siteConfig: SiteConfig
}

export default function LocalBusinessSchema({
    city,
    state,
    stateCode,
    zipCodes,
    latitude,
    longitude,
    serviceName,
    siteConfig
}: LocalBusinessSchemaProps) {
    const baseUrl = `https://${siteConfig.domain}`
    const { reviews, finalRating, localReviewCount } = generateLocalReviews(city, state, serviceName, siteConfig, latitude)

    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `${siteConfig.siteName} - ${city}`,
        "description": `Top-rated ${serviceName.toLowerCase()} professionals in ${city}, ${stateCode}. Quality service you can trust.`,
        "url": baseUrl,
        "telephone": siteConfig.contactPhone,
        "image": siteConfig.logoUrl,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": city,
            "addressRegion": stateCode,
            "addressCountry": "US"
        },
        "geo": latitude && longitude ? {
            "@type": "GeoCoordinates",
            "latitude": latitude,
            "longitude": longitude
        } : undefined,
        "areaServed": {
            "@type": "City",
            "name": city,
            "containsPlace": zipCodes?.map(zip => ({
                "@type": "PostalAddress",
                "postalCode": zip
            }))
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": finalRating,
            "reviewCount": localReviewCount.toString(),
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": reviews.map(r => ({
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": r.author
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": r.rating.toString(),
                "bestRating": "5"
            },
            "reviewBody": r.body
        })),
        "priceRange": "$$"
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
