import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSiteConfig } from '@/lib/site-config'
import { getNicheConfig } from '@/lib/niche-configs'

export const revalidate = 3600 // Regenerate every hour

interface RouteParams {
    params: Promise<{
        state: string
    }>
}

/**
 * STATE-SPECIFIC SITEMAP
 * 
 * URL: /sitemap/az.xml, /sitemap/ca.xml, etc.
 * 
 * Contains:
 *   - State page (/az)
 *   - All cities in that state (/az/phoenix, /az/tucson, etc.)
 *   - All service pages for each city (/az/phoenix/gutter-installation, etc.)
 */
export async function GET(request: Request, { params }: RouteParams) {
    const { state } = await params
    const stateCode = state.replace('.xml', '').toUpperCase()

    const siteConfig = await getSiteConfig()
    const niche = await getNicheConfig(siteConfig.nicheSlug)
    const baseUrl = `https://${siteConfig.domain}`
    const now = new Date().toISOString().split('T')[0]

    try {
        // Fetch all cities for this state
        const { data: cities, error } = await supabase
            .from('usa city name')
            .select('city, state_id')
            .ilike('state_id', stateCode)
            .order('city', { ascending: true })

        if (error || !cities) {
            console.error(`Sitemap error for state ${stateCode}:`, error)
            return new NextResponse('State not found', { status: 404 })
        }

        // Build URLs array
        const urls: string[] = []

        // 1. State page
        urls.push(`  <url>
    <loc>${baseUrl}/${stateCode.toLowerCase()}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`)

        // 2. City pages and their service pages
        cities.forEach(cityData => {
            const citySlug = cityData.city.toLowerCase().replace(/\s+/g, '-')
            const stateSlug = cityData.state_id.toLowerCase()

            // City main page
            urls.push(`  <url>
    <loc>${baseUrl}/${stateSlug}/${citySlug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`)

            // Service pages for this city
            niche.services.forEach(service => {
                urls.push(`  <url>
    <loc>${baseUrl}/${stateSlug}/${citySlug}/${service.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`)
            })
        })

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

        console.log(`Generated sitemap for ${stateCode}: ${cities.length} cities, ${urls.length} total URLs`)

        return new NextResponse(xml, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            },
        })
    } catch (error) {
        console.error(`Sitemap generation error for ${stateCode}:`, error)
        return new NextResponse('Error generating sitemap', { status: 500 })
    }
}
