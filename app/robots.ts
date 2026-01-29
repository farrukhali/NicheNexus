import { MetadataRoute } from 'next'
import { getSiteConfig } from '@/lib/site-config'

export default async function robots(): Promise<MetadataRoute.Robots> {
    const siteConfig = await getSiteConfig()
    const baseUrl = `https://${siteConfig.domain}`

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/api/',
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
