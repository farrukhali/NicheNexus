
export interface ContentVars {
    intro: string
    serviceDesc: string
    whyChoose: string
    processIntro: string
    materials: string
    technicalSpecs: string
    climateConsiderations: string
    faqAnswers: { [key: string]: string }
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
    intros: [
        (city: string, state: string) => `Homeowners looking for **gutter installation near me in ${city}** choose US Gutter Installation for reliability and quality. We specialize in seamless gutter systems designed specifically for the weather patterns of **${state}**.`,
        (city: string, state: string) => `Living in **${city}**, finding trusted **gutter companies near me** is crucial for preserving your home's foundation. Our local team provides top-tier gutter replacement and installation services across **${state}**, ensuring your home stays dry year-round.`,
        (city: string, state: string) => `Upgrade your home's curb appeal with the best **seamless gutters near me in ${city}, ${state}**. We deliver custom-fit solutions that handle heavy rainfall and prevent basement flooding, right in your neighborhood.`,
        (city: string, state: string) => `Searching for **professional gutter installers near me in ${city}**? Our ${state}-based crews have over 50 years of combined experience installing K-style and half-round gutters on homes just like yours.`,
        (city: string, state: string) => `**${city}** homeowners trust our local gutter experts for everything from new installations to emergency repairs. We've completed thousands of projects across **${state}** with a 4.9/5 satisfaction rating.`,
        (city: string, state: string) => `Don't let another rain storm damage your foundation. **Gutter installation near me in ${city}** has never been easier. Our **${state}** licensed professionals are ready to protect your home today.`,
        (city: string, state: string) => `When searching for **reliable gutter services near me**, ${city} residents consistently choose us for our transparent pricing, quality materials, and workmanship guarantee. We're proud to serve all of **${state}**.`,
        (city: string, state: string) => `Your home in **${city}** deserves the best protection from water damage. Our **certified gutter installers near me** use only commercial-grade materials suited for **${state}**'s unique climate conditions.`,
        (city: string, state: string) => `Looking for **affordable gutter installation near me in ${city}**? We offer competitive pricing without cutting corners. Every installation in **${state}** comes with our industry-leading warranty.`,
        (city: string, state: string) => `For over 9 years, we've been the trusted name for **gutter replacement near me** in the **${city}, ${state}** area. Our EPA RRP certified crews handle everything from simple repairs to complete system overhauls.`,
    ],
    serviceDescs: [
        (city: string) => `Our **${city}** teams are equipped with on-site fabrication machines to create continuous 5-inch and 6-inch K-style or half-round gutters. When you search for **gutter repair near me**, you expect fast, local service—that's exactly what we deliver.`,
        (city: string) => `We bring the factory to your driveway in **${city}**. By custom-cutting seamless aluminum channels (0.027 or 0.032 gauge) on-site, we eliminate leak points—proven local experts for **gutter installation near me**.`,
        (city: string) => `Our **${city}** installers use commercial-grade hidden hangers spaced every 24 inches for maximum strength. We serve all neighborhoods, making us the top choice for **gutter cleaning and installation near me**.`,
        (city: string) => `From 5-inch residential K-style to 6-inch high-capacity systems, our **${city}** crews have the expertise to match the right gutter size to your roof's square footage and pitch.`,
        (city: string) => `Every installation in **${city}** includes properly sized 2x3 or 3x4 rectangular downspouts with quality strainers to prevent clogs. We calculate the optimal number based on your roofline's drainage needs.`,
        (city: string) => `Our technicians in **${city}** are trained to identify and correct improper gutter slope (we use a 1/4" drop per 10 feet) ensuring water flows correctly and doesn't pool or overflow.`,
        (city: string) => `We specialize in both aluminum and copper seamless gutters in **${city}**. Our copper installations include proper soldering at joints and a natural patina finish that increases home value.`,
        (city: string) => `For homes in **${city}** with complex rooflines, we custom-fabricate inside and outside miters on-site using our portable gutter machines. No pre-cut pieces—every angle is precision-fit.`,
    ],
    materials: [
        "We offer **5-inch K-style** (handles 5,520 sq ft of roof) and **6-inch K-style** (handles 7,960 sq ft) seamless aluminum gutters. Choose from **20+ color options** in durable baked enamel finish.",
        "Our premium **0.032 gauge aluminum** gutters are 20% thicker than standard 0.027 gauge, providing superior dent resistance and a longer lifespan of 30+ years.",
        "For luxury homes, our **copper gutter systems** (16 oz or 20 oz weight) develop a beautiful patina over time and can last 75+ years with proper maintenance.",
        "We install **half-round gutters** in 5\" and 6\" sizes for historic homes and Tudor-style architecture. Available in aluminum, copper, and galvanized steel.",
        "All our aluminum gutters feature **hidden hanger brackets** rated for 25+ lbs each, spaced every 18-24 inches to support heavy rain loads and prevent sagging.",
        "Our **galvanized steel gutters** (26 gauge) offer superior strength for commercial applications and high-traffic areas, with a zinc coating that resists rust for 20+ years.",
        "We offer **2x3 inch** and **3x4 inch rectangular downspouts** sized appropriately for your gutter capacity. Larger 3x4 downspouts move 50% more water per minute.",
        "Every system includes our high-capacity **leaf strainers** and optional **micro-mesh gutter guards** with 50-micron openings that block even pine needles and roof grit.",
    ],
    whyChoose: [
        (city: string) => `We are not just contractors; we are your neighbors in **${city}**. We understand local building codes and common architectural styles, so you get the most experienced **gutter installers near me**.`,
        (city: string) => `With years of experience serving **${city}**, we've built a reputation for honesty and quality. If you want **gutter services near me** that treat every home like their own, look no further.`,
        (city: string) => `Local expertise matters. Our installers in **${city}** are trained to identify potential drainage issues specific to your property's grade and landscaping.`,
        (city: string) => `Every gutter installation in **${city}** comes with our comprehensive warranty: lifetime on materials, 10 years on labor. We stand behind our work 100%.`,
        (city: string) => `Our **${city}** crews arrive on time, complete most jobs in one day, and leave your property cleaner than they found it. We haul away all old materials at no extra charge.`,
        (city: string) => `We're BBB A+ rated and have maintained a 4.9/5 star rating across 10,000+ reviews. **${city}** homeowners trust us for quality that lasts.`,
        (city: string) => `Unlike big-box store subcontractors, our **${city}** team consists of full-time employees who are background-checked, drug-tested, and manufacturer-trained.`,
        (city: string) => `We offer free on-site estimates in **${city}** with detailed written quotes. No hidden fees, no surprises—just transparent pricing and quality work.`,
    ],
    technicalSpecs: [
        "**Gutter Sizes:** 5-inch K-style (standard), 6-inch K-style (high-capacity), 5-inch half-round, 6-inch half-round. **Downspouts:** 2x3\", 3x4\", or round.",
        "**Gutter Pitch:** We install at 1/4-inch slope per 10 linear feet to ensure proper drainage. Maximum run of 40 feet before a downspout.",
        "**Hanger Spacing:** Our hidden hangers are installed every 18-24 inches (vs. competitors' 36\") for superior strength against ice and debris loads.",
        "**Material Thickness:** Standard 0.027 gauge for residential, heavy-duty 0.032 gauge for high-exposure areas, or premium 16-20 oz copper.",
        "**Downspout Capacity:** 2x3\" handles 600 sq ft of roof per downspout. 3x4\" handles 1,200 sq ft. We calculate based on your specific roofline.",
        "**Fascia Attachment:** We use zinc-plated screws (not nails) at every rafter tail for secure mounting that won't loosen over time.",
    ],
    climateConsiderations: [
        (stateCode: string) => `In ${stateCode}, we engineer gutter systems to handle ${getClimateContent(stateCode)}. Our installations account for local weather extremes.`,
        (stateCode: string) => `${stateCode} weather requires gutters that can withstand ${getClimateContent(stateCode)}. We use appropriate materials and mounting techniques.`,
        (stateCode: string) => `For ${stateCode} homes, we recommend gutter guards and proper sizing to manage ${getClimateContent(stateCode)} effectively.`,
    ]
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

export function getSEOContent(city: string, state: string, stateCode?: string): ContentVars {
    const hash = getHash(city + state)
    const code = stateCode?.toUpperCase() || state.substring(0, 2).toUpperCase()

    // Select variants using modulo of the hash - now with 10 intro variants for more diversity
    const introFn = VARIANTS.intros[hash % VARIANTS.intros.length]
    const serviceFn = VARIANTS.serviceDescs[(hash >> 1) % VARIANTS.serviceDescs.length]
    const materialTxt = VARIANTS.materials[(hash >> 2) % VARIANTS.materials.length]
    const whyFn = VARIANTS.whyChoose[(hash >> 3) % VARIANTS.whyChoose.length]
    const techSpec = VARIANTS.technicalSpecs[(hash >> 4) % VARIANTS.technicalSpecs.length]
    const climateFn = VARIANTS.climateConsiderations[(hash >> 5) % VARIANTS.climateConsiderations.length]

    return {
        intro: introFn(city, state),
        serviceDesc: serviceFn(city),
        materials: materialTxt,
        whyChoose: whyFn(city),
        technicalSpecs: techSpec,
        climateConsiderations: climateFn(code),
        processIntro: "Our streamlined four-step process—Inspection, Measurement, Fabrication, Installation—takes the hassle out of home improvement.",
        faqAnswers: {
            cost: `In ${city}, seamless aluminum gutter installation typically costs $6-12 per linear foot, while copper ranges from $25-40. A standard 150-200 linear foot home averages $1,200-$2,400 for aluminum or $4,500-$8,000 for copper.`,
            timeline: `Our ${city} crews complete most residential gutter installations in a single 4-6 hour day. Complex rooflines or full copper systems may require two days.`,
            warranty: `Every installation in ${city} includes our industry-leading warranty: lifetime coverage on materials against manufacturing defects, plus 10 years on labor and workmanship.`,
            permit: `Most residential gutter replacements in ${city} don't require permits, but we verify local ${state} building codes for every project and pull permits when needed.`
        }
    }
}
