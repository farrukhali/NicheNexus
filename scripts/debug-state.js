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

async function debugState() {
    const stateCode = 'AZ'
    console.log(`Fetching cities for state: ${stateCode}`)

    const { data, error } = await supabase
        .from('usa city name')
        .select('*')
        .limit(1)

    if (error) {
        console.error('Error fetching data:', error)
    } else {
        console.log(`Found ${data.length} records.`)
        console.log(data)
    }
}

debugState()
