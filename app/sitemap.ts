import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

// Sitemap limit is 50,000 URLs per file.
// Ideally usage of sitemap index if more than 50k.
// For now we limit to 40k to be safe.

export const revalidate = 86400 // Revalidate daily

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://gutterpro.com'

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.6,
    }))

    // 2. Fetch all Cities
    const { data: cities } = await supabase
        .from('usa city name')
        .select('city, state_id')
        .limit(40000)

    if (!cities) {
        return staticRoutes
    }

    // 3. Extract Unique States for State Pages
    const uniqueStates = Array.from(new Set(cities.map(c => c.state_id)))
    const stateUrls = uniqueStates.map(stateCode => ({
        url: `${baseUrl}/${stateCode}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // 4. Generate City URLs
    const cityUrls = cities.map((c) => {
        const citySlug = c.city.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
        const stateSlug = c.state_id

        return {
            url: `${baseUrl}/${stateSlug}/${citySlug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }
    })

    return [
        ...staticRoutes,
        ...stateUrls,
        ...cityUrls,
    ]
}
