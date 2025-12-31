
export interface ContentVars {
    intro: string
    serviceDesc: string
    whyChoose: string
    processIntro: string
    materials: string
    faqAnswers: { [key: string]: string }
}

const VARIANTS = {
    intros: [
        (city: string, state: string) => `Homeowners in **${city}** know that protecting their property starts with a reliable roofing and gutter system. At US Gutter Installation, we specialize in seamless gutter installation designed specifically for the weather patterns of **${state}**.`,
        (city: string, state: string) => `Living in **${city}**, effective water management is crucial for preserving your home's foundation. Our local team provides top-tier gutter replacement and installation services across **${state}**, ensuring your home stays dry year-round.`,
        (city: string, state: string) => `Upgrade your home's curb appeal and functionality with US Gutter Installation's premium seamless gutters. Serving the **${city}, ${state}** area, we deliver custom-fit solutions that handle heavy rainfall and prevent basement flooding.`,
    ],
    serviceDescs: [
        (city: string) => `Our **${city}** teams are equipped with on-site fabrication machines to create continuous K-style or Half-round gutters that perfectly match your home's trim.`,
        (city: string) => `We bring the factory to your driveway in **${city}**. By custom-cutting seamless aluminum channels on-site, we eliminate leak points and ensure a flawless fit.`,
        (city: string) => `Expertly crafted to withstand local conditions, our seamless channels provide superior drainage. We serve all neighborhoods in **${city}** with precision installation.`,
    ],
    materials: [
        "We offer a wide range of materials including durable **Aluminum** (available in 20+ colors), classic **Copper** for a premium patina, and robust **Galvanized Steel**.",
        "Choose from our premium selection: rust-resistant **Aluminum**, elegant **Copper** gutters that age beautifully, or heavy-duty **Steel** systems for maximum durability.",
        "Customize your look with our material options. Go with standard **0.027 gauge Aluminum** for value, or upgrade to **0.032 gauge** or **Copper** for lifetime performance.",
    ],
    whyChoose: [
        (city: string) => `We are not just contractors; we are your neighbors in **${city}**. We understand local building codes and common architectural styles, from historic renovations to new construction.`,
        (city: string) => `With years of experience serving **${city}**, we've built a reputation for honesty and quality. We treat every home like our own, ensuring clean jobsites and perfect alignment.`,
        (city: string) => `Local expertise matters. Our installers in **${city}** are trained to identify potential drainage issues specific to your property's grade and landscaping.`,
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

export function getSEOContent(city: string, state: string): ContentVars {
    const hash = getHash(city + state)

    // Select variants using modulo of the hash
    const introFn = VARIANTS.intros[hash % VARIANTS.intros.length]
    const serviceFn = VARIANTS.serviceDescs[(hash >> 1) % VARIANTS.serviceDescs.length]
    const materialTxt = VARIANTS.materials[(hash >> 2) % VARIANTS.materials.length]
    const whyFn = VARIANTS.whyChoose[(hash >> 3) % VARIANTS.whyChoose.length]

    return {
        intro: introFn(city, state),
        serviceDesc: serviceFn(city),
        materials: materialTxt,
        whyChoose: whyFn(city),
        processIntro: "Our streamlined process takes the hassle out of home improvement.",
        faqAnswers: {
            cost: `In ${city}, gutter installation typically ranges from $6 to $15 per linear foot depending on the material (Aluminum vs Copper) and complexity of your roofline.`,
            timeline: `Our ${city} crews are efficient. Most standard residential installations are completed in a single day.`
        }
    }
}
