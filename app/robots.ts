import { MetadataRoute } from 'next'
import { getSiteConfig } from '@/lib/site-config'

export default async function robots(): Promise<MetadataRoute.Robots> {
    const siteConfig = await getSiteConfig()
    const protocol = siteConfig.domain.includes('localhost') ? 'http' : 'https'
    const baseUrl = `${protocol}://${siteConfig.domain}`

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
