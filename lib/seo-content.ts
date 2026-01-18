
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
    // Northeast - Heavy snow/ice melt
    "CT": { type: "cold", considerations: "spring thaw flooding and high water tables" },
    "MA": { type: "cold", considerations: "rapid snowmelt and basement flooding risks" },
    "ME": { type: "cold", considerations: "frozen discharge lines and spring runoff" },
    "NH": { type: "cold", considerations: "snowmelt accumulation and saturated soil" },
    "NY": { type: "cold", considerations: "older foundations and spring flooding" },
    "VT": { type: "cold", considerations: "mountain runoff and clay soils" },
    "PA": { type: "cold", considerations: "river flooding and limestone geology" },
    "NJ": { type: "cold", considerations: "coastal storms and high groundwater" },

    // Midwest - Snow and storms
    "IL": { type: "cold", considerations: "flat terrain drainage issues and spring rain" },
    "IN": { type: "cold", considerations: "heavy spring rains and clay soil saturation" },
    "MI": { type: "cold", considerations: "lake effect snow melt and basement hydrostatic pressure" },
    "MN": { type: "cold", considerations: "frozen pipe bursts and extreme cold operation" },
    "OH": { type: "cold", considerations: "river valley flooding and wet basements" },
    "WI": { type: "cold", considerations: "deep frost lines and spring thaws" },
    "IA": { type: "cold", considerations: "river flooding and agricultural runoff" },
    "ND": { type: "cold", considerations: "frozen discharge lines and overland flooding" },
    "SD": { type: "cold", considerations: "snowmelt flooding and flat plains drainage" },

    // Southeast - Heavy rain
    "FL": { type: "tropical", considerations: "tropical storms and high water tables" },
    "GA": { type: "humid", considerations: "clay soil expansion and summer storms" },
    "AL": { type: "humid", considerations: "flash flooding and severe thunderstorms" },
    "LA": { type: "tropical", considerations: "below-sea-level drainage and hurricanes" },
    "MS": { type: "humid", considerations: "river flooding and delta soil saturation" },
    "SC": { type: "humid", considerations: "coastal flooding and hurricane impact" },
    "NC": { type: "humid", considerations: "mountain runoff and coastal storms" },

    // Southwest - Heat and monsoons
    "AZ": { type: "desert", considerations: "monsoon flash floods and dry soil absorption issues" },
    "NM": { type: "desert", considerations: "arroyos flooding and sudden downpours" },
    "NV": { type: "desert", considerations: "urban runoff and flash flood risks" },
    "TX": { type: "mixed", considerations: "expansive clay soils and severe storms" },
    "OK": { type: "mixed", considerations: "tornado alley storms and flash flooding" },

    // Pacific Northwest - Rain
    "WA": { type: "rainy", considerations: "constant saturation and hydrostatic pressure" },
    "OR": { type: "rainy", considerations: "wet winters and hillside drainage issues" },

    // Mountain West - Snow
    "CO": { type: "cold", considerations: "snowmelt consistency and rocky soil drainage" },
    "UT": { type: "cold", considerations: "spring runoff and canyon flooding" },
    "MT": { type: "cold", considerations: "frozen ground flooding and ice jams" },
    "WY": { type: "cold", considerations: "rapid snowmelt and frozen discharge hazards" },
    "ID": { type: "cold", considerations: "river/canal flooding and spring thaw" },

    // California - Mixed
    "CA": { type: "mixed", considerations: "atmospheric rivers and atmospheric moisture" },
}

const getClimateContent = (stateCode: string): string => {
    const climate = CLIMATE_ZONES[stateCode.toUpperCase()]
    if (climate) {
        return climate.considerations
    }
    return "seasonal heavy rains and local flooding patterns"
}

const VARIANTS = {
    intros: [
        (city: string, state: string) => `Searching for **sump pump installation near me in ${city}**? You've found the #1 rated local plumbing and waterproofing experts in **${state}**. We specialize in primary pumps, battery backups, and complete basement waterproofing designed specifically for ${state}'s unique water table and weather patterns.`,
        (city: string, state: string) => `When you search for **sump pump repair near me** in **${city}**, you need local pros who understand your area's flooding risks. Our ${state}-licensed plumbers provide top-tier **sump pump replacement** services, ensuring your basement stays dry during the worst storms.`,
        (city: string, state: string) => `Looking for **basement waterproofing near me in ${city}, ${state}**? We're your local defense against flooding. From check valve replacement to full pit installation, homeowners across ${state} choose us to protect their property.`,
        (city: string, state: string) => `Need **sump pump contractors near me in ${city}**? Our ${state}-based crews have decades of experience installing submersible and pedestal pumps. We're the trusted name for **sump pump installation near me** in your neighborhood.`,
        (city: string, state: string) => `**${city}** homeowners searching for **emergency plumber near me** trust our local experts for everything from failed pumps to flooded basements. We've saved thousands of homes across **${state}** with our 24/7 rapid response.`,
        (city: string, state: string) => `Stop basement flooding before it starts. **Sump pump installation near me in ${city}** is your best insurance policy. Our **${state}** licensed experts are ready to protect your home with high-capacity pumps and reliable battery backups.`,
        (city: string, state: string) => `When you search for **reliable plumbing services near me**, ${city} residents consistently choose Pipey Pro for transparent pricing, premium cast-iron pumps, and our leak-free guarantee. Serving all of **${state}**.`,
        (city: string, state: string) => `Your home in **${city}** deserves the best flood protection. Our **certified waterproofing contractors near me** use only industrial-grade pumps and backup systems designed for **${state}**'s heavy rains.`,
        (city: string, state: string) => `Looking for **affordable sump pump replacement near me in ${city}**? Get peace of mind without breaking the bank. Every installation in **${state}** comes with our industry-leading manufacturer warranties.`,
        (city: string, state: string) => `For years, we've been the go-to name for **sump pump repair near me** in **${city}, ${state}**. Our certified plumbers handle everything from stuck switches and burnt-out motors to frozen discharge lines.`,
        (city: string, state: string) => `Why worry about power outages in **${city}**? Invest in our **battery backup sump pump near me** systems and keep your basement dry even when the grid goes down. We serve all neighborhoods in **${state}**.`,
        (city: string, state: string) => `Homeowners in **${city}** ask us: "Who offers the best **basement waterproofing near me**?" Our answer: comprehensive solutions that manage hydrostatic pressure and keep water out. Available throughout **${state}**.`,
    ],
    serviceDescs: [
        (city: string) => `Our **${city}** teams are equipped with the latest diagnostic tools to identify pump failure causes instantly. When you search for **sump pump repair near me** or **new installation**, you expect fast, reliable service—that's exactly what we deliver.`,
        (city: string) => `We bring full-service waterproofing capabilities to your home in **${city}**. By installing high-efficiency pumps and sealed basins, we eliminate moisture and odors. We're the proven local experts when you search for **sump pump installers near me**.`,
        (city: string) => `Our **${city}** plumbers use commercial-grade check valves and schedule 40 PVC piping for maximum durability. Serving all neighborhoods, we're the top choice for **sewage ejector pump repair** and **backup pump installation**.`,
        (city: string) => `From 1/3 HP residential pumps to 1 HP commercial units, our **${city}** crews precisely match the right pump capacity to your basement's size, water table, and local rainfall intensity.`,
        (city: string) => `Every installation in **${city}** includes properly sized discharge lines to move water safely away from your foundation. We calculate the optimal friction loss and head pressure for your specific setup.`,
        (city: string) => `Our technicians in **${city}** are factory-trained to identify and correct improper pit depth and switch placement, ensuring your pump cycles correctly without short-cycling or overheating.`,
    ],
    materials: [
        "We offer **1/3 HP**, **1/2 HP**, and **3/4 HP** submersible pumps (handles up to 4,000 GPH). Choose from **cast iron housings** or corrosion-resistant thermoplastics. Perfect for homeowners searching for **sump pump replacement near me**.",
        "Our premium **Battery Backup Systems** provide days of protection during power outages, featuring AGM maintenance-free batteries and smart monitoring. Ideal for areas with frequent storms searching for **backup sump pump near me**.",
        "For sewage applications, our **Ejector Pumps** (2-inch discharge) handle solids up to 2 inches and are built for heavy-duty basement bathroom use. The top choice when you want **sewage pump repair near me**.",
        "We install **sealed sump basins** that prevent radon gas entry, odors, and humidity. Essential for finished basements and homeowners searching for **basement waterproofing near me**.",
        "All our installations feature **silent check valves** to eliminate the loud 'clunk' sound when the pump shuts off. A favorite upgrade for **sump pump repair near me** clients.",
        "Our **WiFi-enabled smart pumps** send alerts directly to your phone if high water levels are detected or if the pump fails. Perfect for peace of mind when searching for **smart sump pump installation**.",
    ],
    whyChoose: [
        (city: string) => `We're not just plumbers; we're your neighbors in **${city}**. We understand local water tables, flood zones, and municipal drainage codes. That's why we're the most recommended **sump pump installers near me**.`,
        (city: string) => `With years of experience serving **${city}**, we've built a reputation for honesty, quality, and round-the-clock reliability. When you want **emergency plumbing near me** that prioritizes your safety, look no further.`,
        (city: string) => `Local expertise matters for dry basements. Our installers in **${city}** are trained to identify potential water intrusion points specific to your property's foundation type and soil conditions.`,
        (city: string) => `Every pump installation in **${city}** comes with our comprehensive warranty: manufacturer coverage on pumps, plus our guarantee on labor. We stand behind our **waterproofing services near me**.`,
        (city: string) => `Our **${city}** crews arrive fully stocked, complete most replacements in under 2 hours, and test every system rigorously. We leave your basement clean and dry—that's the **pipey pro** difference.`,
        (city: string) => `We're top rated with a consistent 5-star rating across verified reviews. **${city}** homeowners trust us because we deliver what we promise: quality **sump pump repair near me** that keeps the water out.`,
    ],
    technicalSpecs: [
        "**Pump Types:** Submersible (quiet, efficient), Pedestal (long lifespan), Water-Powered Backup (infinite runtime). **Horsepower:** 1/3 HP (standard), 1/2 HP (high water table), 3/4 HP (extreme flooding).",
        "**Discharge Piping:** We use Schedule 40 PVC (1.5\" or 1.25\") glued and primed for leak-proof performance. We ensure proper slope and freeze protection. This precision is what sets **professional plumbers near me** apart.",
        "**Switch Types:** Vertical float (reliable, compact), Tethered float (wide differential), Electronic (no moving parts). We match the switch to your pit size to prevent hanging up.",
        "**Backup Power:** 12V Deep Cycle Marine Batteries (standard), AC/DC Inverter systems, or municipal water-powered backups. Essential for **battery backup sump pump** reliability.",
        "**Pit Sizing:** Standard 18x22\" basins, or custom depths for lower water tables. Proper pit sizing prevents short-cycling and extends pump life.",
    ],
    climateConsiderations: [
        (stateCode: string) => `In ${stateCode}, we configure pump systems specifically to handle ${getClimateContent(stateCode)}. Our installations account for local storm surges—that's why homeowners search for **sump pump installation near me** experts who know the region.`,
        (stateCode: string) => `${stateCode} weather requires pumps that can work overtime during ${getClimateContent(stateCode)}. We use thermal-protected motors and high-cycle switches. Local **waterproofing companies near me** understand these unique challenges.`,
        (stateCode: string) => `For ${stateCode} homes, we recommend battery backups to handle power loss during ${getClimateContent(stateCode)}. Ask about our storm-ready packages when searching for **sump pump repair near me**.`,
        (stateCode: string) => `Living in ${stateCode} means dealing with ${getClimateContent(stateCode)}. Our **plumbing contractors near me** are factory-trained on systems designed for exactly these saturation levels.`,
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

    // Select variants using modulo of the hash
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
        processIntro: "Our streamlined process—Diagnosis, Pump Selection, Installation, and Testing—ensures your home is protected against flooding.",
        faqAnswers: {
            cost: `In ${city}, standard sump pump replacement typically costs $400-$700 depending on the pump HP and type. New installations requiring pit excavation range from $2,500-$4,500. Battery backups add $600-$1,200 installed.`,
            timeline: `Our ${city} plumbers complete most sump pump replacements in 1-2 hours. Full waterproofing systems or new pit installations may take 1-2 days.`,
            warranty: `Every installation in ${city} includes manufacturer warranties (typically 3-5 years) on pumps, plus our solid guarantee on labor and installation quality.`,
            permit: `Most pump replacements in ${city} don't require permits, but new electrical circuits or drainage lines might. We verify local ${state} codes for every project.`,
            bestGuard: `For ${state} weather conditions, we recommend a cast-iron submersible pump with a battery backup. This combination handles ${getClimateContent(code)} and power outages effectively.`,
            emergency: `Yes! We offer 24/7 **emergency sump pump repair in ${city}**. If your pump has failed during a storm, call us immediately for priority service to prevent basement flooding.`,
            cleaningFrequency: `In ${city}, ${state}, we recommend inspecting your sump pit twice a year. We clean the intake screen, test the float switch, and ensure the discharge line is clear of debris or ice.`,
            soffitFascia: `While we focus on waterproofing, our partner network in ${city} can assist with related home repairs. Our primary expertise is keeping your basement dry.`
        }
    }
}
