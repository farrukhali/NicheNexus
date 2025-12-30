import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing env vars')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testCityFetch() {
    console.log('Testing fetch from "usa city name"...')

    // Test with a known city from screenshot: "Abbottstown", PA
    const stateId = 'PA'
    const citySearch = 'Abbottstown'

    const { data, error } = await supabase
        .from('usa city name')
        .select('*')
        .ilike('state_id', stateId)
        .ilike('city', citySearch)
        .limit(1)

    if (error) {
        console.error('Error:', error)
    } else {
        console.log('Success! Data:', data)
    }
}

testCityFetch()
