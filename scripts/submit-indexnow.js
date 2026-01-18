
const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')
const path = require('path')

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const SITE_URL = 'https://pipeypro.com'
const INDEXNOW_KEY = process.env.INDEXNOW_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!INDEXNOW_KEY || !SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing required environment variables')
    console.error('INDEXNOW_KEY:', !!INDEXNOW_KEY)
    console.error('SUPABASE_URL:', !!SUPABASE_URL)
    console.error('SUPABASE_KEY:', !!SUPABASE_KEY)
    process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function getUrls() {
    console.log('Fetching cities from database...')

    // Limit to 2000 for this batch
    const { data: cities, error } = await supabase
        .from('usa city name')
        .select('city, state_id')
        .limit(2000)

    if (error) {
        console.error('Error fetching data:', error)
        return []
    }

    const urls = []

    // Core pages
    urls.push(`${SITE_URL}/`)
    urls.push(`${SITE_URL}/about`)
    urls.push(`${SITE_URL}/contact`)
    urls.push(`${SITE_URL}/sitemap`)

    // City pages
    if (cities) {
        cities.forEach(record => {
            const citySlug = record.city.toLowerCase().replace(/ /g, '-')
            const stateSlug = record.state_id.toLowerCase()
            urls.push(`${SITE_URL}/${stateSlug}/${citySlug}`)
        })
    }

    return urls
}

async function submitToIndexNow(urlList) {
    if (urlList.length === 0) return

    console.log(`Submitting ${urlList.length} URLs to IndexNow...`)

    try {
        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                host: 'pipeypro.com',
                key: INDEXNOW_KEY,
                keyLocation: `https://pipeypro.com/${INDEXNOW_KEY}.txt`,
                urlList: urlList
            }),
        })

        if (response.status === 200 || response.status === 202) {
            console.log('✅ Success! IndexNow received the URLs.')
        } else {
            console.error(`❌ Error ${response.status}:`, await response.text())
        }
    } catch (err) {
        console.error('❌ Request failed:', err)
    }
}

async function main() {
    const urls = await getUrls()
    console.log(`Prepared ${urls.length} URLs.`)
    await submitToIndexNow(urls)
}

main()
