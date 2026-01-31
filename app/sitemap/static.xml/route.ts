import { NextResponse } from 'next/server'
import { getSiteConfig } from '@/lib/site-config'

export const revalidate = 3600

/**
 * STATIC SITEMAP
 * Contains: Homepage, About, Contact, Privacy, Terms
 */
export async function GET() {
    const siteConfig = await getSiteConfig()
    const baseUrl = `https://${siteConfig.domain}`
    const now = new Date().toISOString().split('T')[0]

    const staticPages = [
        { url: baseUrl, priority: '1.0', changefreq: 'daily' },
        { url: `${baseUrl}/about`, priority: '0.8', changefreq: 'monthly' },
        { url: `${baseUrl}/contact`, priority: '0.8', changefreq: 'monthly' },
        { url: `${baseUrl}/privacy`, priority: '0.5', changefreq: 'yearly' },
        { url: `${baseUrl}/terms`, priority: '0.5', changefreq: 'yearly' },
    ]

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    })
}
