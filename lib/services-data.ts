export interface ServiceDetail {
    title: string
    slug: string
    description: (city: string, state: string) => string
    icon: string
    features: string[]
    benefits: string[]
}

export const servicesData: Record<string, ServiceDetail> = {
    "seamless-gutter-installation": {
        title: "Seamless Gutter Installation",
        slug: "seamless-gutter-installation",
        description: (city, state) => `Looking for seamless gutter installation near me in ${city}, ${state}? Our custom-fit 5" and 6" K-style seamless aluminum gutters eliminate leaks and enhance curb appeal. EPA RRP certified crews.`,
        icon: "🔧",
        features: ["Custom on-site fabrication with portable gutter machines", "5-inch and 6-inch K-style options", "0.027 and 0.032 gauge aluminum available", "20+ color options with baked enamel finish"],
        benefits: ["No seams means no leaks", "Improved aesthetics and curb appeal", "30+ year lifespan with proper maintenance", "Lifetime transferable warranty"]
    },
    "gutter-guards-leaf-protection": {
        title: "Gutter Guards & Leaf Protection",
        slug: "gutter-guards-leaf-protection",
        description: (city, state) => `Need gutter guards near me in ${city}, ${state}? Our micro-mesh leaf protection systems with 50-micron openings block pine needles, roof grit, and debris. Stop cleaning your gutters forever.`,
        icon: "🛡️",
        features: ["Micro-mesh technology with 50-micron openings", "Fits existing 5\" and 6\" gutters", "Marine-grade stainless steel mesh", "Hidden fastener system"],
        benefits: ["Eliminate maintenance forever", "Prevents ice dams in winter", "Protects foundation from overflow", "25-year no-clog guarantee"]
    },
    "gutter-cleaning-maintenance": {
        title: "Gutter Cleaning & Maintenance",
        slug: "gutter-cleaning-maintenance",
        description: (city, state) => `Searching for gutter cleaning near me in ${city}, ${state}? Our licensed technicians safely remove debris, flush downspouts, and inspect your entire drainage system. Same-day service available.`,
        icon: "🧹",
        features: ["Thorough debris removal and bagging", "2x3\" and 3x4\" downspout flushing", "Full system inspection and report", "Before/after photo documentation"],
        benefits: ["Prevents water damage and foundation issues", "Extends gutter lifespan", "No ladders needed for homeowners", "Annual maintenance plans available"]
    },
    "downspout-installation-extensions": {
        title: "Downspout Installation & Extensions",
        slug: "downspout-installation-extensions",
        description: (city, state) => `Need downspout extensions near me in ${city}, ${state}? We install 2x3\" and 3x4\" rectangular downspouts strategically sized for your roof square footage. Keep water 10+ feet from your foundation.`,
        icon: "💧",
        features: ["2x3\" standard and 3x4\" high-capacity options", "Underground drain connections available", "Pop-up emitters for invisible drainage", "Proper sizing based on roof area"],
        benefits: ["Protects foundation from water damage", "Prevents soil erosion", "Manages high-volume rain events", "Improves landscape appearance"]
    },
    "soffit-fascia-repair": {
        title: "Soffit & Fascia Repair",
        slug: "soffit-fascia-repair",
        description: (city, state) => `Looking for soffit and fascia repair near me in ${city}, ${state}? We replace rotted wood fascia, install aluminum fascia covers, and repair ventilated soffit panels. Color matching included.`,
        icon: "🏠",
        features: ["Wood and aluminum fascia options", "Ventilated and solid soffit panels", "Rot and water damage repair", "Custom color matching to existing trim"],
        benefits: ["Prevents pest and wildlife entry", "Improves attic ventilation", "Restores roofline aesthetics", "Protects rafters from moisture"]
    },
    "copper-gutter-systems": {
        title: "Copper Gutter Systems",
        slug: "copper-gutter-systems",
        description: (city, state) => `Want copper gutter installation near me in ${city}, ${state}? Our 16oz and 20oz copper gutter systems feature hand-soldered joints and develop a beautiful natural patina. 75+ year lifespan.`,
        icon: "✨",
        features: ["16oz and 20oz weight options", "Hand-soldered seams and joints", "Half-round and K-style profiles", "Natural patina development"],
        benefits: ["75+ year expected lifespan", "Increases home value significantly", "Never rusts or corrodes", "Architectural beauty and elegance"]
    },
    "commercial-gutter-services": {
        title: "Commercial Gutter Services",
        slug: "commercial-gutter-services",
        description: (city, state) => `Need commercial gutter installation near me in ${city}, ${state}? We specialize in box gutters, industrial downspouts, and high-capacity drainage for retail, warehouse, and multi-family buildings.`,
        icon: "🏢",
        features: ["Box gutters and industrial profiles", "Large 4x5\" and 6\" round downspouts", "Scheduled maintenance contracts", "OSHA-compliant installation crews"],
        benefits: ["Protects commercial assets", "Handles extreme water volume", "Minimizes business disruption", "Professional appearance maintenance"]
    },
    "storm-damage-repair": {
        title: "Storm Damage Repair",
        slug: "storm-damage-repair",
        description: (city, state) => `Need emergency gutter repair near me in ${city}, ${state}? Fast response for gutters damaged by wind, hail, or fallen branches. We work directly with insurance adjusters for seamless claims.`,
        icon: "⛈️",
        features: ["24-48 hour emergency response", "Insurance claim documentation", "Damage assessment and estimates", "Temporary repairs to prevent further damage"],
        benefits: ["Restores home protection quickly", "Prevents secondary water damage", "Stress-free insurance process", "Licensed, insured, and bonded"]
    },
    "ice-dam-removal": {
        title: "Ice Dam Removal",
        slug: "ice-dam-removal",
        description: (city, state) => `Searching for ice dam removal near me in ${city}, ${state}? Our low-pressure steam removal safely melts ice dams without damaging shingles or gutters. Prevention systems available.`,
        icon: "❄️",
        features: ["Low-pressure steam removal (safe for shingles)", "Heat cable installation available", "Ice and water shield installation", "Attic insulation assessment"],
        benefits: ["Prevents interior roof leaks", "Protects gutters from ice weight", "Safe for all roofing materials", "Long-term prevention options"]
    },
    "underground-drain-solutions": {
        title: "Underground Drain Solutions",
        slug: "underground-drain-solutions",
        description: (city, state) => `Need drainage solutions near me in ${city}, ${state}? We install French drains, buried downspout extensions, and pop-up emitters to move water far from your foundation. Dry basements guaranteed.`,
        icon: "🚇",
        features: ["French drains with perforated pipe", "Buried corrugated drainage lines", "Pop-up emitters at discharge points", "Proper grading and slope calculation"],
        benefits: ["Eliminates yard puddles and soggy spots", "Keeps basements and crawlspaces dry", "Cleaner landscape appearance", "Protects foundation long-term"]
    },
    "color-gutter-matching": {
        title: "Color Gutter Matching",
        slug: "color-gutter-matching",
        description: (city, state) => `Looking for custom color gutters near me in ${city}, ${state}? Choose from 20+ factory colors or custom-painted gutters to perfectly match your home's siding, trim, and architectural style.`,
        icon: "🎨",
        features: ["20+ standard aluminum colors", "Custom paint matching available", "Kynar/Hylar finish options", "Sample chips for approval"],
        benefits: ["Seamless color coordination", "Boosts curb appeal and home value", "Long-lasting factory finish", "Personalized aesthetic"]
    },
    "emergency-gutter-repair": {
        title: "Emergency Gutter Repair",
        slug: "emergency-gutter-repair",
        description: (city, state) => `Need urgent gutter repair near me in ${city}, ${state}? When you have an active leak or sagging gutter, our emergency crews respond within hours. Available 7 days a week.`,
        icon: "🚨",
        features: ["Same-day and next-day availability", "After-hours emergency line", "Temporary waterproofing solutions", "Full repair or replacement options"],
        benefits: ["Prevents active water damage", "Immediate professional response", "Honest assessment and fair pricing", "Licensed and insured crews"]
    }
}

