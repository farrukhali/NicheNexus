import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSiteConfig } from '@/lib/site-config'

export const revalidate = 3600 // Regenerate every hour
export const dynamic = 'force-dynamic'

/**
 * SITEMAP INDEX
 * 
 * /sitemap.xml (This route)
 *   ├── /sitemap/static.xml (Homepage, About, Contact, etc.)
 *   ├── /sitemap/az.xml (Arizona cities + services)
 *   ├── /sitemap/ca.xml (California cities + services)
 *   └── ... (each state has its own sitemap)
 */
export async function GET() {
    const siteConfig = await getSiteConfig()
    const baseUrl = `https://${siteConfig.domain}`
    const now = new Date().toISOString().split('T')[0]

    try {
        // Get all unique states
        const { data: statesData } = await supabase
            .from('usa city name')
            .select('state_id')

        const sitemapEntries: string[] = []

        // Add static sitemap
        sitemapEntries.push(`  <sitemap>
    <loc>${baseUrl}/sitemap/static.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`)

        if (statesData) {
            const uniqueStates = [...new Set(statesData.map(item => item.state_id))]
                .filter(Boolean)
                .sort()

            // Add a sitemap for each state
            uniqueStates.forEach(stateId => {
                sitemapEntries.push(`  <sitemap>
    <loc>${baseUrl}/sitemap/${stateId.toLowerCase()}.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`)
            })
        }

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</sitemapindex>`

        console.log(`Generated sitemap index with ${sitemapEntries.length} sitemaps`)

        return new NextResponse(xml, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            },
        })
    } catch (error) {
        console.error('Sitemap index generation error:', error)

        // Return minimal sitemap index on error
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap/static.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`

        return new NextResponse(xml, {
            headers: {
                'Content-Type': 'application/xml',
            },
        })
    }
}
