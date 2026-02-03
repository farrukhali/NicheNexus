import { SiteConfig } from './site-config'

export interface LocalReview {
    author: string
    rating: number
    body: string
    date?: string
}

export function generateLocalReviews(
    city: string,
    state: string,
    serviceName: string,
    siteConfig: SiteConfig,
    latitude?: number
): { reviews: LocalReview[]; finalRating: string; localReviewCount: number } {
    const seed = city.length + state.length + (latitude || 0) + siteConfig.domain.length
    const baseRating = siteConfig.trustSignals?.average_rating || 4.8

    // Variation: Rating and Review Count
    const ratingVariation = (seed % 4) / 10
    const finalRating = Math.min(4.9, Math.max(4.6, baseRating - 0.1 + ratingVariation)).toFixed(1)
    const localReviewCount = Math.floor(45 + (seed % 150))

    const reviewers = ['Sarah M.', 'John D.', 'Michael R.', 'Emily W.', 'Robert K.', 'Jessica L.', 'David P.', 'Lisa B.', 'Thomas H.', 'Amanda C.', 'Kevin S.', 'Rachel V.']

    // "Smart" templates that use the niche name and city name
    const templates = [
        `I called them for ${serviceName.toLowerCase()} in ${city} and they exceeded my expectations. Very professional crew!`,
        `The best ${siteConfig.nicheSlug} experts I've found in ${state}. They fixed my issues quickly and for a fair price.`,
        `Extremely happy with the ${serviceName.toLowerCase()} work done on my home. ${siteConfig.siteName} is my new go-to company.`,
        `Prompt, courteous, and very thorough. It's hard to find reliable ${serviceName.toLowerCase()} service in ${city}, but these guys are the real deal.`,
        `Great communication from start to finish. Our ${city} home looks much better now thanks to their expert ${serviceName.toLowerCase()}.`,
        `Fair quote and even better service. If you need ${serviceName.toLowerCase()} in the ${city} area, don't look anywhere else.`,
        `Professionalism at its finest. They treated my ${city} property with respect and delivered high-quality results.`,
        `Verified local service! They handled our ${serviceName.toLowerCase()} project in ${state} with zero stress. 5 stars.`
    ]

    // Generate stable relative dates (e.g., "2 days ago")
    const dates = ['2 days ago', '4 days ago', '1 week ago', '2 weeks ago', '3 weeks ago', '1 month ago']

    const reviews = [0, 1].map((i) => {
        const index = Math.floor(Math.abs(seed + i)) % templates.length
        const reviewerIndex = Math.floor(Math.abs(seed + i + 7)) % reviewers.length
        const dateIndex = Math.floor(Math.abs(seed + i + 3)) % dates.length

        return {
            author: reviewers[reviewerIndex] || 'Verified Customer',
            rating: 5,
            body: templates[index] || `Great ${serviceName.toLowerCase()} service!`,
            date: dates[dateIndex] || 'Recently'
        }
    })

    return { reviews, finalRating, localReviewCount }
}
