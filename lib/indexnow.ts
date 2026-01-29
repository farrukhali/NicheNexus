// IndexNow API Integration for Faster Indexing
// This notifies Bing/Yandex instantly when pages are updated
import { getSiteConfig } from './site-config'

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'your-indexnow-key-here'

interface IndexNowResponse {
    success: boolean
    message?: string
}

export async function notifyIndexNow(urls: string[]): Promise<IndexNowResponse> {
    const siteConfig = await getSiteConfig()
    const SITE_URL = `https://${siteConfig.domain}`

    if (!INDEXNOW_KEY || INDEXNOW_KEY === 'your-indexnow-key-here') {
        console.log('IndexNow key not configured')
        return { success: false, message: 'IndexNow key not configured' }
    }

    try {
        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                host: siteConfig.domain,
                key: INDEXNOW_KEY,
                keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
                urlList: urls.slice(0, 10000), // Max 10k URLs per request
            }),
        })

        if (response.ok) {
            console.log(`IndexNow: Successfully submitted ${urls.length} URLs`)
            return { success: true, message: `Submitted ${urls.length} URLs` }
        } else {
            const errorText = await response.text()
            console.error('IndexNow error:', errorText)
            return { success: false, message: errorText }
        }
    } catch (error) {
        console.error('IndexNow request failed:', error)
        return { success: false, message: String(error) }
    }
}

// Batch submit URLs for a state
export async function submitStateUrls(stateCode: string, cities: string[]): Promise<IndexNowResponse> {
    const siteConfig = await getSiteConfig()
    const SITE_URL = `https://${siteConfig.domain}`
    const urls = [
        `${SITE_URL}/${stateCode}`, // State page
        ...cities.map(city => `${SITE_URL}/${stateCode}/${city.toLowerCase().replace(/\s+/g, '-')}`),
    ]
    return notifyIndexNow(urls)
}

// Submit priority pages
export async function submitPriorityPages(): Promise<IndexNowResponse> {
    const siteConfig = await getSiteConfig()
    const SITE_URL = `https://${siteConfig.domain}`
    const priorityUrls = [
        SITE_URL,
        `${SITE_URL}/about`,
        `${SITE_URL}/contact`,
        `${SITE_URL}/privacy`,
    ]
    return notifyIndexNow(priorityUrls)
}
