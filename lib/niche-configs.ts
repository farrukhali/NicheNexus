export interface NicheConfig {
    name: string;
    slug: string;
    primaryService: string;
    cityHeroImage?: string;
    keywords: string[];
    services: {
        title: string;
        slug: string;
        description: string;
        icon: string;
        heroImage?: string;
        features?: string[];
        benefits?: string[];
        process?: string[];
        materials?: { name: string; description: string }[];
        faqs?: { question: string; answer: string }[];
    }[];
    faqs: {
        question: string;
        answer: string;
    }[];
    home_faqs?: {
        question: string;
        answer: string;
    }[];
    state_faqs?: {
        question: string;
        answer: string;
    }[];
    city_faqs?: {
        question: string;
        answer: string;
    }[];
}

export const NICHE_CONFIGS: Record<string, NicheConfig> = {
    "additions-remodels": {
        name: "Additions and Remodels",
        slug: "additions-remodels",
        primaryService: "Home Additions",
        keywords: ["home remodeling", "room additions", "second story addition", "kitchen remodel", "bathroom remodel"],
        services: [
            { title: "Kitchen Remodeling", slug: "kitchen-remodeling", description: "Complete kitchen renovation services.", icon: "🍳" },
            { title: "Bathroom Remodeling", slug: "bathroom-remodeling", description: "Modernize your bathroom with custom designs.", icon: "🚿" },
            { title: "Room Additions", slug: "room-additions", description: "Expand your living space with professional additions.", icon: "🏠" }
        ],
        faqs: [
            { question: "How much does a home addition cost?", answer: "Costs vary by size and complexity; typically $150-$300 per square foot." },
            { question: "How long does a remodel take?", answer: "Most remodels take 4-12 weeks depending on the scope." }
        ]
    },
    // More niches will be added here...
    "fences": {
        name: "Fences",
        slug: "fences",
        primaryService: "Fence Installation",
        keywords: ["vinyl fence", "wood fence", "chain link fence", "privacy fence", "professional fence installation"],
        services: [
            { title: "Vinyl Fence Installation", slug: "vinyl-fence", description: "Low-maintenance vinyl fencing solutions.", icon: "🏠" },
            { title: "Wood Privacy Fences", slug: "wood-fence", description: "Classic wood fencing for privacy and security.", icon: "🪵" }
        ],
        faqs: [
            { question: "How long does a wood fence last?", answer: "A properly maintained wood fence can last 15-20 years." }
        ]
    },
    "roofing": {
        name: "Roofing",
        slug: "roofing",
        primaryService: "Roof Replacement",
        keywords: ["shingle roof", "metal roof", "roof repair", "local roofing contractors", "roof inspection"],
        services: [
            { title: "Residential Roof Replacement", slug: "roof-replacement", description: "Complete roof overhaul with premium shingles.", icon: "🏠" },
            { title: "Roof Repair & Maintenance", slug: "roof-repair", description: "Fast fixes for leaks and storm damage.", icon: "🔨" }
        ],
        faqs: [
            { question: "When should I replace my roof?", answer: "Most asphalt roofs should be replaced every 20-25 years." }
        ]
    },
    "gutter": {
        name: "Gutter Installation",
        slug: "gutter",
        primaryService: "Gutter Installation",
        keywords: ["seamless gutters", "gutter repair", "gutter guards", "leaf protection"],
        services: [
            { title: "Seamless Gutter Installation", slug: "seamless-installation", description: "Professional installation of custom-fit seamless gutters.", icon: "🔧" },
            { title: "Gutter Repair & Cleaning", slug: "repair-cleaning", description: "Maintain your gutters with our repair and cleaning services.", icon: "🧹" }
        ],
        faqs: [
            { question: "How often should I clean my gutters?", answer: "We recommend cleaning at least twice a year, in spring and fall." }
        ]
    }
};

import { supabase } from './supabase'

export const getNicheConfig = async (slug: string): Promise<NicheConfig> => {
    if (!slug) return NICHE_CONFIGS["additions-remodels"];

    // Try fetching from Supabase first
    try {
        // Try exact match first
        let { data, error } = await supabase
            .from('niche_configs')
            .select('*')
            .eq('slug', slug)
            .single()

        // If not found, try case-insensitive match (ilike)
        if (!data || error) {
            const { data: ilikeData, error: ilikeError } = await supabase
                .from('niche_configs')
                .select('*')
                .ilike('slug', slug)
                .single()
            data = ilikeData
            error = ilikeError
        }

        if (data && !error) {
            return {
                name: data.name,
                slug: data.slug,
                primaryService: data.primary_service,
                cityHeroImage: data.city_hero_image || '',
                keywords: data.keywords || [],
                services: data.services || [],
                faqs: data.faqs || [],
                home_faqs: data.home_faqs || [],
                state_faqs: data.state_faqs || [],
                city_faqs: data.city_faqs || []
            }
        } else {
            console.warn(`Niche "${slug}" not found in DB, checking static configs`);
        }
    } catch (e) {
        console.warn('Niche Config DB Fetch Failed, falling back to static object', e)
    }

    // Fallback to static niche configurations
    const searchSlug = slug.toLowerCase()
    const config = NICHE_CONFIGS[searchSlug] || NICHE_CONFIGS["additions-remodels"];
    return config
};
