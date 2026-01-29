
export interface ContentVars {
    intro: string
    serviceDesc: string
    whyChoose: string
    processIntro: string
    materials: string
    technicalSpecs: string
    climateConsiderations: string
    faqAnswers: { [key: string]: string }
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string[]
}

// Regional climate data for more specific content
const CLIMATE_ZONES: Record<string, { type: string; considerations: string }> = {
    // Northeast - Heavy snow/ice
    "CT": { type: "cold", considerations: "ice dams and heavy snow loads" },
    "MA": { type: "cold", considerations: "ice dams and heavy snow loads" },
    "ME": { type: "cold", considerations: "ice dams and heavy snow loads" },
    "NH": { type: "cold", considerations: "ice dams and heavy snow loads" },
    "NY": { type: "cold", considerations: "ice dams and heavy snow loads" },
    "VT": { type: "cold", considerations: "ice dams and heavy snow loads" },
    "PA": { type: "cold", considerations: "ice dams and freeze-thaw cycles" },
    "NJ": { type: "cold", considerations: "freeze-thaw cycles and heavy rain" },

    // Midwest - Snow and storms
    "IL": { type: "cold", considerations: "heavy snow and spring storms" },
    "IN": { type: "cold", considerations: "heavy snow and spring storms" },
    "MI": { type: "cold", considerations: "lake effect snow and ice dams" },
    "MN": { type: "cold", considerations: "extreme cold and heavy snow loads" },
    "OH": { type: "cold", considerations: "heavy snow and freeze-thaw cycles" },
    "WI": { type: "cold", considerations: "extreme cold and ice dam prevention" },
    "IA": { type: "cold", considerations: "heavy snow and spring flooding" },
    "ND": { type: "cold", considerations: "extreme cold and blizzard conditions" },
    "SD": { type: "cold", considerations: "extreme cold and prairie winds" },

    // Southeast - Heavy rain
    "FL": { type: "tropical", considerations: "hurricane-force winds and heavy rainfall" },
    "GA": { type: "humid", considerations: "high humidity and summer thunderstorms" },
    "AL": { type: "humid", considerations: "high humidity and tornado season" },
    "LA": { type: "tropical", considerations: "hurricane season and extreme rainfall" },
    "MS": { type: "humid", considerations: "high humidity and severe storms" },
    "SC": { type: "humid", considerations: "hurricanes and coastal moisture" },
    "NC": { type: "humid", considerations: "hurricanes and mountain weather" },

    // Southwest - Heat and monsoons
    "AZ": { type: "desert", considerations: "monsoon season flash flooding" },
    "NM": { type: "desert", considerations: "monsoon rains and UV exposure" },
    "NV": { type: "desert", considerations: "flash floods and extreme heat" },
    "TX": { type: "mixed", considerations: "severe storms and hail damage" },
    "OK": { type: "mixed", considerations: "tornadoes and severe hailstorms" },

    // Pacific Northwest - Rain
    "WA": { type: "rainy", considerations: "persistent rain and moss growth" },
    "OR": { type: "rainy", considerations: "heavy rainfall and debris from evergreens" },

    // Mountain West - Snow
    "CO": { type: "cold", considerations: "heavy snowfall and altitude considerations" },
    "UT": { type: "cold", considerations: "heavy snowfall and freeze-thaw cycles" },
    "MT": { type: "cold", considerations: "extreme cold and heavy snow loads" },
    "WY": { type: "cold", considerations: "high winds and extreme cold" },
    "ID": { type: "cold", considerations: "heavy snowfall and spring runoff" },

    // California - Mixed
    "CA": { type: "mixed", considerations: "wildfires, drought, and occasional heavy rains" },
}

const getClimateContent = (stateCode: string): string => {
    const climate = CLIMATE_ZONES[stateCode.toUpperCase()]
    if (climate) {
        return climate.considerations
    }
    return "seasonal weather changes"
}

const VARIANTS = {
    intros: [],
    serviceDescs: [],
    materials: [],
    whyChoose: [],
    technicalSpecs: [],
    climateConsiderations: []
}

// Simple string hash function for deterministic selection
function getHash(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash)
}

import { replacePlaceholders } from './seo-utils'
import { getSiteConfig } from './site-config'
import { getNicheConfig } from './niche-configs'
import { generateAIContent } from './ai-content'

export async function getSEOContent(city: string, state: string, stateCode?: string): Promise<ContentVars> {
    const siteConfig = await getSiteConfig()
    const niche = await getNicheConfig(siteConfig.nicheSlug)
    const code = stateCode?.toUpperCase() || state.substring(0, 2).toUpperCase()

    // 1. Try to fetch AI-generated content if available (placeholder for DB check)
    const aiIntro = await generateAIContent({ niche: niche.name, city, state, type: 'intro' })
    const aiMetaTitle = await generateAIContent({ niche: niche.name, city, state, type: 'meta_title' })
    const aiMetaDesc = await generateAIContent({ niche: niche.name, city, state, type: 'meta_description' })

    const hashString = city + state + niche.slug
    const hash = getHash(hashString)
    const selectedService = niche.services[hash % niche.services.length]

    const placeholderVars = {
        city,
        state,
        stateCode: code,
        niche: niche.name,
        service: selectedService.title
    }

    return {
        metaTitle: replacePlaceholders(aiMetaTitle || `${niche.primaryService} in ${city}, ${stateCode || state} | #1 Local ${niche.name}`, placeholderVars),
        metaDescription: replacePlaceholders(aiMetaDesc || `Looking for ${niche.primaryService.toLowerCase()} in ${city}, ${stateCode || state}? Our professional crews provide top-quality ${niche.name.toLowerCase()} services near me. Free estimates!`, placeholderVars),
        metaKeywords: niche.keywords,
        intro: replacePlaceholders(aiIntro || `Searching for **${niche.primaryService.toLowerCase()} near me in ${city}**? You've found the #1 rated local ${niche.name.toLowerCase()} contractors in **${stateCode || state}**. We specialize in high-quality systems designed specifically for your area.`, placeholderVars),
        serviceDesc: replacePlaceholders(selectedService.description, placeholderVars),
        materials: replacePlaceholders(`We use only the highest quality materials for our ${niche.name.toLowerCase()} projects in ${city}.`, placeholderVars),
        whyChoose: replacePlaceholders(`Homeowners in ${city} trust us for our transparent pricing and quality workmanship.`, placeholderVars),
        technicalSpecs: replacePlaceholders(`Our installations meet all local ${stateCode || state} building codes.`, placeholderVars),
        climateConsiderations: replacePlaceholders(`In ${stateCode || state}, we specialize in ${niche.name.toLowerCase()} solutions that handle ${getClimateContent(code)}.`, placeholderVars),
        processIntro: "Our streamlined process takes the hassle out of home improvement.",
        faqAnswers: niche.faqs.reduce((acc: Record<string, string>, faq: any) => ({
            ...acc,
            [faq.question]: replacePlaceholders(faq.answer, placeholderVars)
        }), {})
    }
}
