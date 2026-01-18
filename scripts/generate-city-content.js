
const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')
const path = require('path')

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY

if (!SUPABASE_URL || !SUPABASE_KEY || !OPENROUTER_KEY) {
    console.error('Missing required environment variables.')
    process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function generateIntro(city, state) {
    const prompt = `Write a unique, engaging, and professional 100-word introduction for a Sump Pump Installation service page in ${city}, ${state}. 
    Focus on local relevance, citing specific weather patterns like heavy rain, snowmelt, or storms common to ${state}. 
    Mention "sump pump repair", "basement waterproofing", and "battery backup" naturally. 
    Do not use generic fluff. Make it sound like a local expert writing it.
    Return ONLY the text paragraph, no quotes or markdown.`

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-exp:free",
                "messages": [
                    { "role": "system", "content": "You are a professional SEO copywriter for a plumbing company." },
                    { "role": "user", "content": prompt }
                ]
            })
        });

        const data = await response.json()
        if (data.choices && data.choices[0]) {
            return data.choices[0].message.content.trim()
        }
    } catch (error) {
        console.error("Error generating content:", error)
    }
    return null
}

async function processCities() {
    console.log("Fetching cities without SEO content...")

    // Fetch top 5 cities by population that don't have an intro yet
    // Note: We assume 'seo_intro' column exists (run migration first!)
    const { data: cities, error } = await supabase
        .from('usa city name')
        .select('id, city, state_id, state_name')
        .is('seo_intro', null)
        .order('id', { ascending: true }) // Deterministic order
        .limit(5) // Start small to test

    if (error) {
        console.error("Error fetching cities:", error)
        return
    }

    console.log(`Found ${cities.length} cities to process.`)

    for (const city of cities) {
        console.log(`Generating content for ${city.city}, ${city.state_id}...`)
        const intro = await generateIntro(city.city, city.state_name)

        if (intro) {
            console.log(`Preview: ${intro.substring(0, 50)}...`)
            const { error: updateError } = await supabase
                .from('usa city name')
                .update({ seo_intro: intro })
                .eq('id', city.id)

            if (updateError) {
                console.error(`Failed to update ${city.city}:`, updateError)
            } else {
                console.log(`✅ Updated ${city.city}`)
            }
        } else {
            console.log(`Skipped ${city.city} (Generation failed)`)
        }

        // Brief pause to avoid rate limits
        await new Promise(r => setTimeout(r, 1000))
    }
}

processCities()
