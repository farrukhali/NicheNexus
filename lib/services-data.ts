export interface ServiceDetail {
    title: string
    slug: string
    description: (city: string, state: string) => string
    icon: string
    heroImage: string
    features: string[]
    benefits: string[]
    process?: string[]
    materials?: { name: string; description: string }[]
    faqs?: { question: string; answer: string }[]
}

export const servicesData: Record<string, ServiceDetail> = {
    "seamless-gutter-installation": {
        title: "Seamless Gutter Installation",
        slug: "seamless-gutter-installation",
        description: (city, state) => `Searching for seamless gutter installation near me in ${city}, ${state}? Our custom-fit 5" and 6" K-style seamless aluminum gutters are fabricated on-site to eliminate leaks. Licensed, insured, EPA RRP certified crews with lifetime warranty.`,
        icon: "🔧",
        heroImage: "https://i.ibb.co/Z6Wgrtzs/Premium-Gutter-Installation.png",
        features: ["Custom on-site fabrication with portable gutter machines", "5-inch and 6-inch K-style options", "0.027 and 0.032 gauge aluminum available", "20+ color options with baked enamel finish", "Professional hidden hanger installation"],
        benefits: ["No seams means no leaks", "Improved aesthetics and curb appeal", "30+ year lifespan with proper maintenance", "Lifetime transferable warranty", "Same-day installation available"],
        faqs: [
            { question: "How much do seamless gutters cost in {{city}}?", answer: "Seamless gutter installation in {{city}} typically costs $8-15 per linear foot, depending on material gauge, home height, and complexity. Most homes average $1,200-$2,500 for complete installation." },
            { question: "How long does seamless gutter installation take?", answer: "Most seamless gutter installations in {{city}} are completed in one day. A typical 150-200 linear foot installation takes 4-6 hours with our professional crews." },
            { question: "What's the difference between 5-inch and 6-inch gutters?", answer: "5-inch gutters handle most residential needs, while 6-inch gutters are recommended for larger roof areas, steep pitches, or heavy rainfall regions. We'll assess your {{city}} home and recommend the right size." },
            { question: "Do seamless gutters really prevent leaks?", answer: "Yes! Seamless gutters are fabricated as one continuous piece, eliminating the joints where 95% of gutter leaks occur. This is why we recommend seamless over sectional gutters." },
            { question: "What colors are available for seamless gutters?", answer: "We offer 20+ factory colors with baked enamel finish that resists fading, peeling, and chipping. Popular choices in {{city}} include white, bronze, charcoal, and custom color matching." },
            { question: "How long do seamless gutters last?", answer: "Quality seamless aluminum gutters last 30+ years with proper maintenance. Our installations in {{city}} come with a lifetime transferable warranty for your peace of mind." }
        ]
    },
    "gutter-guards-leaf-protection": {
        title: "Gutter Guards & Leaf Protection",
        slug: "gutter-guards-leaf-protection",
        description: (city, state) => `Looking for gutter guards near me in ${city}, ${state}? Our micro-mesh leaf guard systems with 50-micron openings block pine needles, leaves, and roof grit. Stop cleaning your gutters forever with professional leaf guard gutters near me.`,
        icon: "🛡️",
        heroImage: "https://i.ibb.co/Z6Wgrtzs/Premium-Gutter-Installation.png",
        features: ["Micro-mesh technology with 50-micron openings", "Fits existing 5\" and 6\" gutters", "Marine-grade stainless steel mesh", "Hidden fastener system", "Multiple protection levels available"],
        benefits: ["Eliminate gutter maintenance forever", "Prevents ice dams in winter", "Protects foundation from overflow", "25-year no-clog guarantee", "Increases gutter system lifespan"],
        faqs: [
            { question: "Do gutter guards really work in {{city}}?", answer: "Yes! Quality micro-mesh gutter guards block 99% of debris including pine needles, leaves, and roof grit. Our {{city}} installations come with a 25-year no-clog guarantee." },
            { question: "How much do gutter guards cost?", answer: "Professional gutter guard installation in {{city}} ranges from $15-30 per linear foot depending on the system type. Budget options start at $8/ft, while premium micro-mesh systems average $20-25/ft." },
            { question: "Can gutter guards be installed on existing gutters?", answer: "Absolutely! Our gutter guards are designed to fit existing 5\" and 6\" K-style and half-round gutters. We can install them on most gutter systems in {{city}} without replacement." },
            { question: "What type of gutter guard is best for {{city}}?", answer: "For {{city}}, we recommend micro-mesh guards with stainless steel screens. They handle heavy rain, block fine debris, and prevent ice dam formation in winter months." },
            { question: "Do gutter guards void roof warranties?", answer: "No. Our gutter guards are installed without lifting shingles or penetrating the roof. They attach directly to the gutter, preserving your {{city}} home's roof warranty." },
            { question: "How long do gutter guards last?", answer: "Premium aluminum and stainless steel gutter guards last 20-25 years. Our installations in {{city}} include manufacturer warranties and our workmanship guarantee." },
            { question: "Will I never have to clean my gutters again?", answer: "With our micro-mesh guards, gutter cleaning becomes virtually unnecessary. An occasional rinse with a garden hose once a year is all that's needed for most {{city}} homes." }
        ]
    },
    "gutter-cleaning-maintenance": {
        title: "Gutter Cleaning & Maintenance",
        slug: "gutter-cleaning-maintenance",
        description: (city, state) => `Need gutter cleaning near me in ${city}, ${state}? Our licensed technicians safely remove leaves, debris, and granules, flush downspouts, and inspect your entire drainage system. Same-day gutter cleaning service available.`,
        icon: "🧹",
        heroImage: "https://i.ibb.co/Z6Wgrtzs/Premium-Gutter-Installation.png",
        features: ["Thorough debris removal and bagging", "2x3\" and 3x4\" downspout flushing", "Full system inspection and report", "Before/after photo documentation", "Roof debris check included"],
        benefits: ["Prevents water damage and foundation issues", "Extends gutter lifespan", "No ladders needed for homeowners", "Annual maintenance plans available", "Identifies problems before they're expensive"],
        faqs: [
            { question: "How often should I clean my gutters in {{city}}?", answer: "We recommend gutter cleaning 2-3 times per year in {{city}}: after fall leaves drop, after spring pollen season, and before winter. Homes near trees may need quarterly cleaning." },
            { question: "How much does gutter cleaning cost in {{city}}?", answer: "Professional gutter cleaning in {{city}} typically costs $150-$350 for a single-story home and $200-$500 for two-story homes. Price varies by linear footage and accessibility." },
            { question: "What happens if I don't clean my gutters?", answer: "Clogged gutters can cause water damage to your roof, fascia, siding, and foundation. In {{city}}, we see many preventable repairs that could have been avoided with regular cleaning." },
            { question: "Do you offer gutter cleaning maintenance plans?", answer: "Yes! Our {{city}} maintenance plans include 2-3 annual cleanings, priority scheduling, and 10% discount on repairs. Most homeowners save $100+ per year with our plans." },
            { question: "How long does gutter cleaning take?", answer: "Most gutter cleaning jobs in {{city}} take 1-2 hours for average homes. Larger homes or severely clogged systems may take 2-3 hours." },
            { question: "Is gutter cleaning safe to do myself?", answer: "Ladder accidents cause 500,000+ injuries yearly. Our {{city}} crews are trained, insured, and equipped with proper safety gear. We recommend leaving ladder work to professionals." }
        ]
    },
    "downspout-installation-extensions": {
        title: "Downspout Installation & Extensions",
        slug: "downspout-installation-extensions",
        description: (city, state) => `Searching for downspout installation near me in ${city}, ${state}? We install 2x3" and 3x4" rectangular downspouts strategically sized for your roof. Underground drainage extensions keep water 10+ feet from your foundation.`,
        icon: "💧",
        heroImage: "https://i.ibb.co/Z6Wgrtzs/Premium-Gutter-Installation.png",
        features: ["2x3\" standard and 3x4\" high-capacity options", "Underground drain connections available", "Pop-up emitters for invisible drainage", "Proper sizing based on roof area", "French drain integration"],
        benefits: ["Protects foundation from water damage", "Prevents soil erosion", "Manages high-volume rain events", "Improves landscape appearance", "Eliminates foundation moisture problems"],
        faqs: [
            { question: "How far should downspouts extend from my foundation?", answer: "Downspouts should discharge water at least 6-10 feet from your {{city}} home's foundation. Underground extensions with pop-up emitters can move water even further for optimal protection." },
            { question: "How many downspouts does my home need?", answer: "As a rule, you need one downspout per 20-30 feet of gutter run. Our {{city}} experts will assess your roof area and rainfall patterns to determine the ideal placement." },
            { question: "What size downspout do I need?", answer: "Most homes use 2x3\" downspouts. However, for large roof sections, steep pitches, or heavy rainfall areas in {{city}}, we recommend 3x4\" high-capacity downspouts." },
            { question: "Can you connect downspouts to underground drains?", answer: "Yes! We specialize in underground drainage solutions in {{city}}. We'll connect your downspouts to buried pipes that discharge water safely away from your foundation." },
            { question: "How much does downspout installation cost?", answer: "New downspout installation in {{city}} costs $100-$200 per downspout including materials and labor. Underground extensions add $200-$400 per run depending on length." },
            { question: "What are pop-up emitters?", answer: "Pop-up emitters are discharge points that stay flush with your {{city}} lawn until water flows through, then pop up to release water. They're invisible when dry and perfect for clean landscaping." }
        ]
    },
    "soffit-fascia-repair": {
        title: "Soffit & Fascia Repair",
        slug: "soffit-fascia-repair",
        description: (city, state) => `Looking for soffit and fascia repair near me in ${city}, ${state}? We replace rotted wood fascia, install aluminum fascia covers, and repair ventilated soffit panels. Color matching included. Licensed soffit repair contractors near me.`,
        icon: "🏠",
        heroImage: "https://i.ibb.co/Z6Wgrtzs/Premium-Gutter-Installation.png",
        features: ["Wood and aluminum fascia options", "Ventilated and solid soffit panels", "Rot and water damage repair", "Custom color matching to existing trim", "Pest damage restoration"],
        benefits: ["Prevents pest and wildlife entry", "Improves attic ventilation", "Restores roofline aesthetics", "Protects rafters from moisture", "Increases home value"],
        faqs: [
            { question: "What causes soffit and fascia damage?", answer: "In {{city}}, the most common causes are water damage from clogged gutters, pest infestations (birds, squirrels, wasps), and age-related rot. UV exposure and humidity also accelerate wear." },
            { question: "How much does soffit and fascia repair cost in {{city}}?", answer: "Fascia repair in {{city}} typically costs $6-20 per linear foot depending on material (wood vs. aluminum). Full soffit replacement runs $8-15 per square foot. Most repairs average $500-$1,500." },
            { question: "Should I repair or replace my fascia?", answer: "If damage is localized to a few feet, repair is cost-effective. However, if rot has spread or you see multiple problem areas, full replacement with aluminum fascia cover provides better long-term value." },
            { question: "What's the difference between soffit and fascia?", answer: "Fascia is the vertical board behind your gutters, visible from the ground. Soffit is the horizontal panel underneath your roof overhang. Both protect your {{city}} home's structure." },
            { question: "Can you match my existing soffit color?", answer: "Yes! We carry 20+ standard colors and can custom-match any existing soffit or fascia color to ensure seamless integration with your {{city}} home's exterior." },
            { question: "Do vented soffits improve energy efficiency?", answer: "Absolutely! Proper soffit ventilation reduces attic heat in summer and prevents moisture buildup in winter. {{city}} homeowners often see reduced energy bills after installing vented soffits." }
        ]
    },
    "copper-gutter-systems": {
        title: "Copper Gutter Systems",
        slug: "copper-gutter-systems",
        description: (city, state) => `Want copper gutter installation near me in ${city}, ${state}? Our premium 16oz and 20oz copper gutter systems feature hand-soldered joints and develop a beautiful natural patina. Copper gutters near me with 75+ year lifespan.`,
        icon: "✨",
        heroImage: "https://i.ibb.co/Z6Wgrtzs/Premium-Gutter-Installation.png",
        features: ["16oz and 20oz weight options", "Hand-soldered seams and joints", "Half-round and K-style profiles", "Natural patina development", "Custom fabrication available"],
        benefits: ["75+ year expected lifespan", "Increases home value significantly", "Never rusts or corrodes", "Architectural beauty and elegance", "Historic home compatible"],
        faqs: [
            { question: "How much do copper gutters cost in {{city}}?", answer: "Copper gutter installation in {{city}} typically costs $25-50 per linear foot, making them 3-4x more expensive than aluminum. However, their 75+ year lifespan makes them cost-effective long-term." },
            { question: "How long do copper gutters last?", answer: "Copper gutters can last 75-100+ years with minimal maintenance. Many historic buildings still have their original copper gutters after a century of service." },
            { question: "Will copper gutters turn green?", answer: "Yes, copper naturally develops a beautiful green patina (verdigris) over 15-20 years. This patina actually protects the copper and is highly prized aesthetically. Some {{city}} homeowners prefer to maintain the bright copper look with annual polishing." },
            { question: "Are copper gutters worth it?", answer: "For {{city}} homeowners with historic, luxury, or high-end homes, copper gutters add significant curb appeal and home value. They're also ideal for salt-air coastal environments where aluminum corrodes faster." },
            { question: "What's the difference between 16oz and 20oz copper?", answer: "16oz copper is standard weight suitable for most residential applications. 20oz copper is heavier and more durable, recommended for larger commercial projects or homes in harsh {{city}} weather conditions." },
            { question: "Can copper gutters be painted?", answer: "While possible, painting copper removes its natural beauty and patina development. Most {{city}} homeowners choose copper specifically for its unpainted, natural aesthetic that improves with age." }
        ]
    },
    "commercial-gutter-services": {
        title: "Commercial Gutter Services",
        slug: "commercial-gutter-services",
        description: (city, state) => `Need commercial gutter installation near me in ${city}, ${state}? Our OSHA-compliant crews specialize in box gutters, industrial downspouts, and high-capacity drainage for retail, warehouse, and multi-family buildings.`,
        icon: "🏢",
        heroImage: "https://i.ibb.co/Z6Wgrtzs/Premium-Gutter-Installation.png",
        features: ["Box gutters and industrial profiles", "Large 4x5\" and 6\" round downspouts", "Scheduled maintenance contracts", "OSHA-compliant installation crews", "Multi-story building expertise"],
        benefits: ["Protects commercial assets", "Handles extreme water volume", "Minimizes business disruption", "Professional appearance maintenance", "Preventive maintenance programs"],
        faqs: [
            { question: "Do you service commercial buildings in {{city}}?", answer: "Yes! We specialize in commercial gutter services for {{city}} businesses including retail centers, office buildings, warehouses, apartments, and industrial facilities." },
            { question: "What type of gutters are best for commercial buildings?", answer: "Commercial buildings typically need box gutters or large K-style gutters (6-8\") with high-capacity downspouts. We design systems based on your {{city}} building's roof area and drainage requirements." },
            { question: "Do you offer commercial maintenance contracts?", answer: "Yes! Our {{city}} commercial maintenance contracts include quarterly cleanings, annual inspections, priority repair service, and detailed documentation for property managers." },
            { question: "Can you work during business hours?", answer: "We schedule work to minimize business disruption. For {{city}} retail and office buildings, we offer early morning, evening, or weekend installation options." },
            { question: "Are your crews OSHA certified?", answer: "Absolutely. All our commercial crews are OSHA-compliant with proper fall protection, lift equipment, and safety certifications required for multi-story work in {{city}}." },
            { question: "How do you handle flat roof drainage?", answer: "For flat commercial roofs in {{city}}, we install scuppers, internal drains, or parapet wall outlets connected to properly sized downspouts and underground drainage systems." }
        ]
    },
    "storm-damage-repair": {
        title: "Storm Damage Repair",
        slug: "storm-damage-repair",
        description: (city, state) => `Need emergency gutter repair near me in ${city}, ${state} after a storm? Fast 24-48 hour response for gutters damaged by wind, hail, or fallen branches. We work directly with insurance adjusters for seamless storm damage claims.`,
        icon: "⛈️",
        heroImage: "https://i.ibb.co/Z6Wgrtzs/Premium-Gutter-Installation.png",
        features: ["24-48 hour emergency response", "Insurance claim documentation", "Damage assessment and estimates", "Temporary repairs to prevent further damage", "Full photo documentation"],
        benefits: ["Restores home protection quickly", "Prevents secondary water damage", "Stress-free insurance process", "Licensed, insured, and bonded", "Emergency crew availability"],
        faqs: [
            { question: "How quickly can you respond to storm damage in {{city}}?", answer: "We offer 24-48 hour emergency response for storm damage in {{city}}. For active leaks or severe damage, we prioritize same-day temporary repairs to prevent further damage." },
            { question: "Does insurance cover gutter storm damage?", answer: "Most homeowner's insurance policies cover gutter damage from wind, hail, and fallen trees. We provide detailed documentation and work directly with {{city}} insurance adjusters." },
            { question: "What should I do after storm damages my gutters?", answer: "Document the damage with photos, avoid standing under damaged gutters, and call us immediately. We'll provide temporary protection if needed and give you a detailed estimate for your {{city}} insurance claim." },
            { question: "Can you repair dented gutters or must they be replaced?", answer: "Minor dents can sometimes be repaired. However, severely dented, kinked, or detached gutters usually need replacement for proper function. We'll assess your {{city}} situation honestly." },
            { question: "Do you work with my insurance company?", answer: "Yes! We work with all major insurance carriers in {{city}}. We provide itemized estimates, photo documentation marked with measurements, and can meet with adjusters on-site." },
            { question: "How do I know if my gutters have storm damage?", answer: "Signs include dents, sagging, detachment from fascia, bent hangers, crushed downspouts, or water overflowing in new places. After any major {{city}} storm, we recommend a free inspection." }
        ]
    },
    "ice-dam-removal": {
        title: "Ice Dam Removal",
        slug: "ice-dam-removal",
        description: (city, state) => `Searching for ice dam removal near me in ${city}, ${state}? Our low-pressure steam removal safely melts ice dams without damaging shingles or gutters. Professional ice dam prevention systems and heated gutter cables available.`,
        icon: "❄️",
        heroImage: "https://i.ibb.co/Z6Wgrtzs/Premium-Gutter-Installation.png",
        features: ["Low-pressure steam removal (safe for shingles)", "Heat cable installation available", "Ice and water shield installation", "Attic insulation assessment", "Gutter heating systems"],
        benefits: ["Prevents interior roof leaks", "Protects gutters from ice weight", "Safe for all roofing materials", "Long-term prevention options", "Emergency same-day service"],
        faqs: [
            { question: "What causes ice dams on my {{city}} home?", answer: "Ice dams form when heat escapes through your roof, melting snow that refreezes at the colder eave. Poor attic insulation and ventilation are the primary causes we see in {{city}} homes." },
            { question: "How do you remove ice dams safely?", answer: "We use low-pressure steam equipment to melt ice dams without damaging your shingles or gutters. Unlike hammers or chisels, steam is 100% safe for your {{city}} roof." },
            { question: "How much does ice dam removal cost?", answer: "Ice dam removal in {{city}} typically costs $300-$600 per hour depending on severity. Most residential jobs take 2-4 hours. Prevention solutions (heat cables, insulation) are more cost-effective long-term." },
            { question: "Can ice dams damage my home?", answer: "Absolutely. Ice dams cause water to back up under shingles, leading to roof leaks, damaged insulation, ruined ceilings, and mold growth. Prompt removal protects your {{city}} home." },
            { question: "How can I prevent ice dams permanently?", answer: "The best prevention is proper attic insulation and ventilation. We also install heat cables along roof edges and in gutters. For {{city}} homes with recurring problems, we recommend a full assessment." },
            { question: "Do you offer emergency ice dam removal?", answer: "Yes! When ice dams cause active leaks, we provide same-day emergency service for {{city}} homeowners. Call our 24/7 line for immediate response during winter weather events." }
        ]
    },
    "underground-drain-solutions": {
        title: "Underground Drain Solutions",
        slug: "underground-drain-solutions",
        description: (city, state) => `Need drainage solutions near me in ${city}, ${state}? We install French drains, buried downspout extensions, and pop-up emitters to move water far from your foundation. Professional drainage contractors near me guarantee dry foundations.`,
        icon: "🚇",
        heroImage: "https://i.ibb.co/Z6Wgrtzs/Premium-Gutter-Installation.png",
        features: ["French drains with perforated pipe", "Buried corrugated drainage lines", "Pop-up emitters at discharge points", "Proper grading and slope calculation", "Downspout drain connections"],
        benefits: ["Eliminates yard puddles and soggy spots", "Keeps foundations and crawlspaces dry", "Cleaner landscape appearance", "Protects foundation long-term", "Reduces mosquito breeding areas"],
        faqs: [
            { question: "What is a French drain?", answer: "A French drain is a gravel-filled trench with perforated pipe that collects and redirects groundwater away from your {{city}} home's foundation. It's ideal for yards with standing water or basement moisture issues." },
            { question: "How far should underground drains discharge?", answer: "Underground drains should discharge water at least 10-15 feet from your foundation, ideally to a low point in your {{city}} yard or connecting to municipal storm drains where permitted." },
            { question: "How much do underground drainage solutions cost?", answer: "Underground drainage in {{city}} typically costs $50-100 per linear foot installed. A basic buried downspout extension (20-30 feet) averages $500-$1,000, while full French drain systems range from $3,000-$8,000." },
            { question: "How long do underground drains last?", answer: "Quality corrugated drainage pipe lasts 25-50+ years when properly installed with adequate slope and clean gravel. Our {{city}} installations include proper filtering to prevent sediment clogs." },
            { question: "Can underground drains freeze in winter?", answer: "Properly installed underground drains in {{city}} are buried below the frost line and maintain slope for drainage. When water drains properly, freezing is rarely an issue." },
            { question: "Do I need a permit for underground drainage?", answer: "Permit requirements vary by {{city}} municipality. We handle all local permit requirements and ensure installations comply with {{city}} drainage codes and setback requirements." }
        ]
    },
    "color-gutter-matching": {
        title: "Color Gutter Matching",
        slug: "color-gutter-matching",
        description: (city, state) => `Looking for custom color gutters near me in ${city}, ${state}? Choose from 20+ factory colors or custom-painted gutters to perfectly match your home's siding, trim, and architectural style. Professional color matching service.`,
        icon: "🎨",
        heroImage: "https://i.ibb.co/Z6Wgrtzs/Premium-Gutter-Installation.png",
        features: ["20+ standard aluminum colors", "Custom paint matching available", "Kynar/Hylar finish options", "Sample chips for approval", "Fade-resistant factory finishes"],
        benefits: ["Seamless color coordination", "Boosts curb appeal and home value", "Long-lasting factory finish", "Personalized aesthetic", "HOA-approved color options"],
        faqs: [
            { question: "What gutter colors are available?", answer: "We offer 20+ standard colors including white, brown, bronze, charcoal, cream, forest green, and more. For {{city}} homes with unique colors, we also offer custom paint matching." },
            { question: "Can you match my existing siding or trim color?", answer: "Yes! Bring us a sample chip or we'll take a color reading from your {{city}} home. Our custom color matching ensures your new gutters blend seamlessly with existing trim." },
            { question: "Do colored gutters cost more?", answer: "Standard factory colors typically cost the same as white gutters. Custom paint matching adds $2-4 per linear foot for {{city}} installations requiring special color formulation." },
            { question: "Will the gutter color fade over time?", answer: "Quality factory finishes with Kynar or Hylar coatings resist fading for 20+ years. We use the highest-grade finishes for all {{city}} installations." },
            { question: "What's the most popular gutter color in {{city}}?", answer: "White and bronze are consistently popular in {{city}}. However, we're seeing more homeowners choose charcoal, black, and custom earth tones to complement modern home designs." },
            { question: "Do HOAs have color restrictions?", answer: "Many {{city}} HOAs have approved color palettes. We work with your HOA requirements and can provide color samples for approval before installation." }
        ]
    },
    "emergency-gutter-repair": {
        title: "Emergency Gutter Repair",
        slug: "emergency-gutter-repair",
        description: (city, state) => `Need urgent gutter repair near me in ${city}, ${state}? When you have an active leak, sagging gutter, or storm damage, our emergency crews respond within hours. 7-day availability for gutter emergencies near me.`,
        icon: "🚨",
        heroImage: "https://i.ibb.co/Z6Wgrtzs/Premium-Gutter-Installation.png",
        features: ["Same-day and next-day availability", "After-hours emergency line", "Temporary waterproofing solutions", "Full repair or replacement options", "24/7 emergency hotline"],
        benefits: ["Prevents active water damage", "Immediate professional response", "Honest assessment and fair pricing", "Licensed and insured crews", "No overtime surge pricing"],
        faqs: [
            { question: "How fast can you respond to a gutter emergency in {{city}}?", answer: "We offer same-day response for {{city}} gutter emergencies. For active leaks or imminent water damage, we can often arrive within 2-4 hours during business hours." },
            { question: "What is considered a gutter emergency?", answer: "Emergencies include active water leaking into your home, gutters pulling away from the fascia, severe storm damage, or any situation causing immediate property damage in {{city}}." },
            { question: "Do you charge extra for emergency service?", answer: "We don't charge surge pricing. However, after-hours, weekend, and holiday calls may include a $75-150 service call fee to cover crew callout for {{city}} emergency response." },
            { question: "Can you make temporary repairs?", answer: "Yes! If parts aren't immediately available or weather prevents permanent repair, we'll make temporary repairs to stop active leaks and protect your {{city}} home until complete repair is possible." },
            { question: "What should I do while waiting for emergency repair?", answer: "Place buckets under active leaks, move valuables away from water, and take photos for documentation. If safe, try to divert water away from your {{city}} home's foundation." },
            { question: "Are emergency repairs covered by insurance?", answer: "Emergency repairs to prevent further damage are typically covered by homeowner's insurance. We provide documentation to support your {{city}} insurance claim if needed." }
        ]
    }
}

