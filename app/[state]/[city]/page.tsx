import { supabase } from '@/lib/supabase'
import ServicePage from '@/components/ServicePage'
// import { notFound } from 'next/navigation'
import { Metadata } from 'next'

// Allow ISR
export const revalidate = 3600
export const dynamicParams = true

interface PageProps {
    params: Promise<{
        state: string
        city: string
    }>
}

// Fetch helper (can be shared)
// Fetch helper matches new DB schema
async function getCityData(stateCode: string, citySlug: string) {
    // Convert slug back to potential search term (e.g. 'new-york' -> 'New York')
    // We use ilike to be safe.
    const citySearchTerm = citySlug.replace(/-/g, ' ')

    const { data, error } = await supabase
        .from('usa city name') // Table name from screenshot
        .select('*')
        .ilike('state_id', stateCode) // Column 'state_id' (e.g. 'PA')
        .ilike('city', citySearchTerm) // Column 'city' (e.g. 'Abbottstown')
        // We limit to 1. Note: There might be duplicate city names in same state (rare but possible with counties), 
        // strictly we might want to just take the first one found.
        .limit(1)
        .single()

    if (error || !data) {
        console.error('Error fetching city:', error)
        return null
    }
    return data
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params
    const { state, city } = params

    // Format City/State for display
    const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    const formattedState = state.toUpperCase()

    return {
        title: `Best Gutter Installation in ${formattedCity}, ${formattedState} | Free Quote`,
        description: `Looking for top-rated gutter installers in ${formattedCity}, ${formattedState}? We provide seamless gutter installation, guards, and cleaning. Get a fast free quote today!`,
        alternates: {
            canonical: `/${state}/${city}`
        },
        openGraph: {
            title: `Best Gutter Installation in ${formattedCity}, ${formattedState}`,
            description: `We are the #1 rated gutter experts in ${formattedCity}. Call now for seamless gutters, guards, and repairs. Lifetime warranty included.`,
            url: `https://gutterpro.com/${state}/${city}`,
        }
    }
}

export default async function Page(props: PageProps) {
    const params = await props.params
    const { state, city } = params

    const cityData = await getCityData(state, city)

    // If data found, use it to populate the component. 
    // If not found, we fall back to URL params for robustness or show 404.
    // We'll map the DB columns to the component props.
    const cityName = cityData?.city || city
    const stateName = cityData?.state_name || state
    const stateCodeProper = cityData?.state_id || state

    return <ServicePage city={cityName} state={stateName} stateCode={stateCodeProper} />
}
