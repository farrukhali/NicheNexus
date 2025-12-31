import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import RelatedServices from '@/components/RelatedServices'
import TrustBadges from '@/components/TrustBadges'
import { CallBtn, NavbarCallBtn } from '@/components/CallBtn'
import Breadcrumb from '@/components/Breadcrumb'
import { ServiceDetail } from '@/lib/services-data'
import CityMap from '@/components/CityMap'

interface ServiceSpecificPageProps {
    city: string
    state: string
    stateCode: string
    service: ServiceDetail
    relatedCities?: {
        city: string
        state_id: string
    }[]
}

// Service-specific extended content for semantic SEO
const serviceExtendedContent: Record<string, {
    whatIs: string
    process: string[]
    materials: { name: string; description: string }[]
    faqs: { q: string; a: string }[]
    priceRange: string
    duration: string
    warranty: string
}> = {
    "seamless-gutter-installation": {
        whatIs: "Seamless gutters are continuous rain channels custom-fabricated on-site from a single piece of aluminum, copper, or steel. Unlike sectional gutters with joints every 10 feet, seamless systems have no seams except at corners and downspout connections, dramatically reducing leak points.",
        process: [
            "Roof and fascia inspection to assess condition and mounting options",
            "Precise measurement of all rooflines, including valleys and dormers",
            "On-site fabrication using portable gutter machine (K-style or half-round profile)",
            "Installation with hidden hangers spaced every 18-24 inches",
            "Downspout placement based on drainage calculations",
            "Final testing with water flow and cleanup"
        ],
        materials: [
            { name: "0.027 Gauge Aluminum", description: "Standard residential thickness, 20+ year lifespan, 20 colors available" },
            { name: "0.032 Gauge Aluminum", description: "Heavy-duty option, 20% thicker, ideal for high-debris areas" },
            { name: "16oz Copper", description: "Premium material, develops natural patina, 75+ year lifespan" },
            { name: "26 Gauge Steel", description: "Maximum strength for commercial applications, zinc-coated" }
        ],
        faqs: [
            { q: "How long does seamless gutter installation take?", a: "Most residential installations are completed in 4-6 hours (single day). Complex rooflines or larger homes may require a second day." },
            { q: "What size gutters do I need?", a: "5-inch K-style handles up to 5,520 sq ft of roof. 6-inch handles up to 7,960 sq ft. We calculate based on your roof pitch and square footage." },
            { q: "Are seamless gutters worth the extra cost?", a: "Yes. Seamless gutters cost 15-20% more upfront but significantly reduce leak repairs, maintenance, and last 10+ years longer than sectional systems." }
        ],
        priceRange: "$6-15 per linear foot for aluminum, $25-40 for copper",
        duration: "4-6 hours (single day for most homes)",
        warranty: "Lifetime on materials, 10 years on labor"
    },
    "gutter-guards-leaf-protection": {
        whatIs: "Gutter guards are protective covers installed over your existing gutters to prevent leaves, pine needles, roof grit, and debris from entering while allowing water to flow through. They eliminate the need for dangerous ladder climbing and twice-yearly gutter cleaning.",
        process: [
            "Existing gutter inspection and cleaning",
            "Measurement and guard material selection",
            "Precise cutting to fit corners and angles",
            "Secure attachment without voiding roof warranty",
            "Water flow testing to ensure proper drainage",
            "Maintenance instructions and warranty registration"
        ],
        materials: [
            { name: "Micro-Mesh Stainless Steel", description: "50-micron openings, blocks even pine needles and roof grit" },
            { name: "Perforated Aluminum Covers", description: "Durable and affordable, good for large leaf debris" },
            { name: "Brush Inserts", description: "Economical option, fits inside existing gutter channel" },
            { name: "Reverse Curve/Surface Tension", description: "Water clings to curved surface while debris falls off" }
        ],
        faqs: [
            { q: "Do gutter guards really work?", a: "Yes, high-quality micro-mesh guards block 99%+ of debris. Cheap screens and foam inserts are less effective and may require more maintenance." },
            { q: "Will gutter guards void my roof warranty?", a: "Our installation methods do not penetrate the roof or shingles, preserving your roofing warranty." },
            { q: "Can I install gutter guards myself?", a: "While DIY options exist, professional installation ensures proper fit, secure attachment, and comes with a no-clog guarantee." }
        ],
        priceRange: "$7-15 per linear foot installed",
        duration: "2-4 hours for most homes",
        warranty: "25-year no-clog guarantee, lifetime material warranty"
    },
    "gutter-cleaning-maintenance": {
        whatIs: "Professional gutter cleaning involves safely removing all debris, leaves, and sediment from your gutter channels and downspouts. It includes flushing the system to ensure proper water flow and inspecting for damage, leaks, or areas needing repair.",
        process: [
            "Ladder or lift setup with proper safety equipment",
            "Hand removal of leaves, twigs, and debris",
            "Scraping of compacted sediment from bottom of channels",
            "Downspout flushing with pressure washer or snake",
            "Inspection of hangers, seams, and fascia attachment",
            "Before/after photo documentation and written report"
        ],
        materials: [
            { name: "Professional Vacuum Systems", description: "High-powered debris removal without mess" },
            { name: "Pressure Washer Attachments", description: "Clears clogged downspouts and flushes entire system" },
            { name: "Gutter Scoops and Tools", description: "Safe removal without damaging gutter finish" },
            { name: "Safety Harnesses and Lifts", description: "OSHA-compliant equipment for 2+ story homes" }
        ],
        faqs: [
            { q: "How often should gutters be cleaned?", a: "Twice per year minimum (spring and fall). Homes with heavy tree coverage may need 3-4 times annually." },
            { q: "What happens if I don't clean my gutters?", a: "Clogged gutters cause water overflow leading to foundation damage, basement flooding, fascia rot, and landscape erosion." },
            { q: "Can cleaning damage my gutters?", a: "Improper techniques can. Our professionals use tools and methods designed to clean without denting or scratching." }
        ],
        priceRange: "$100-250 per cleaning (varies by home size)",
        duration: "1-2 hours for average home",
        warranty: "30-day clean guarantee"
    },
    "downspout-installation-extensions": {
        whatIs: "Downspouts are vertical pipes that carry rainwater from gutters to ground level. Extensions move water away from your foundation. Proper sizing and placement are critical—undersized or poorly placed downspouts cause overflow and foundation damage.",
        process: [
            "Calculate drainage needs based on roof square footage",
            "Determine optimal downspout placement (every 30-40 feet of gutter)",
            "Size selection: 2x3\" standard or 3x4\" high-capacity",
            "Cut and connect to gutter outlet",
            "Install extension, buried drain, or pop-up emitter",
            "Test water flow and adjust as needed"
        ],
        materials: [
            { name: "2x3\" Rectangular Downspouts", description: "Standard size, handles 600 sq ft roof per downspout" },
            { name: "3x4\" Rectangular Downspouts", description: "High-capacity, 50% more flow, handles 1,200 sq ft" },
            { name: "3\" Round Downspouts", description: "Classic look for half-round gutter systems" },
            { name: "Corrugated Flex Extensions", description: "Moves water 10+ feet from foundation" }
        ],
        faqs: [
            { q: "How far should downspouts extend from house?", a: "Minimum 4-6 feet, but 10 feet or more is ideal. Underground drains can move water 20+ feet away." },
            { q: "How many downspouts do I need?", a: "Generally one per 30-40 linear feet of gutter. More may be needed for high-pitch roofs or heavy rainfall areas." },
            { q: "Can I bury my downspout extensions?", a: "Yes, we install underground drain lines with pop-up emitters for a clean landscape appearance." }
        ],
        priceRange: "$15-30 per downspout, extensions $50-150 each",
        duration: "1-2 hours for complete installation",
        warranty: "10-year warranty on connections"
    },
    "soffit-fascia-repair": {
        whatIs: "Fascia is the vertical board behind your gutters, attached to rafter tails. Soffit is the horizontal underside of your roof overhang. Both protect your roof structure from moisture and pests. Water damage from faulty gutters often causes rot that requires repair.",
        process: [
            "Inspection to identify rot, water damage, and pest entry",
            "Removal of damaged sections and affected gutter",
            "Treatment of underlying wood structure if needed",
            "Installation of new fascia (wood or aluminum wrap)",
            "Installation of ventilated or solid soffit panels",
            "Prime and paint (if wood) or color-match aluminum"
        ],
        materials: [
            { name: "Wood Fascia", description: "Traditional look, requires painting, can rot if unprotected" },
            { name: "Aluminum Fascia Wrap", description: "Covers existing wood, maintenance-free, many colors" },
            { name: "Vinyl Soffit Panels", description: "Ventilated or solid, economical, rot-proof" },
            { name: "Aluminum Soffit", description: "Premium durability, won't crack or fade" }
        ],
        faqs: [
            { q: "How do I know if my fascia needs repair?", a: "Signs include peeling paint, visible rot, soft spots, gaps between fascia and roof, or pest entry holes." },
            { q: "Should I replace wood fascia with aluminum?", a: "Aluminum wrap over wood provides permanent protection without ongoing painting. It's highly recommended." },
            { q: "Why is my fascia rotting?", a: "Usually due to gutter failure—overflowing or leaking gutters allow water to constantly wet the fascia, causing rot." }
        ],
        priceRange: "$5-25 per linear foot depending on material",
        duration: "Half day to full day depending on scope",
        warranty: "5-year warranty on repairs"
    },
    "copper-gutter-systems": {
        whatIs: "Copper gutters are premium rain management systems prized for their beauty, durability, and 75+ year lifespan. They develop a distinctive green-brown patina over time and are often used on historic homes, luxury properties, and architectural masterpieces.",
        process: [
            "Design consultation and style selection (K-style or half-round)",
            "Precise measurement for custom copper fabrication",
            "Off-site fabrication with hand-soldered joints",
            "Careful installation to protect patina development",
            "Copper downspout installation with decorative options",
            "Sealing and initial weather aging guidance"
        ],
        materials: [
            { name: "16 oz Copper", description: "Standard weight, ideal for most residential applications" },
            { name: "20 oz Copper", description: "Heavy weight for maximum durability and historic restorations" },
            { name: "Lead-Coated Copper", description: "Maintains silver appearance, doesn't patina" },
            { name: "Copper Penny (Freedom Gray)", description: "Pre-patinated finish for immediate aged look" }
        ],
        faqs: [
            { q: "How long do copper gutters last?", a: "75-100+ years with proper installation. Many copper gutter systems from the 1800s are still functioning today." },
            { q: "How long until copper develops patina?", a: "Initial darkening begins within months. Full verdigris (green) patina takes 15-20 years depending on climate." },
            { q: "Are copper gutters worth the investment?", a: "For homes where aesthetics matter and long-term value is prioritized, copper provides unmatched ROI with virtually no maintenance." }
        ],
        priceRange: "$25-50 per linear foot installed",
        duration: "1-3 days depending on complexity",
        warranty: "Lifetime material warranty, 10-year workmanship"
    },
    "commercial-gutter-services": {
        whatIs: "Commercial gutter systems handle much larger roof areas and water volumes than residential systems. They require heavier materials, larger profiles, and engineering calculations to properly drain flat and low-slope commercial roofs.",
        process: [
            "Site evaluation and roof drainage assessment",
            "Engineering calculations for water volume and flow",
            "Custom fabrication of box gutters or large profiles",
            "OSHA-compliant installation by trained crews",
            "Downspout and drain connection to stormwater system",
            "Testing and maintenance plan development"
        ],
        materials: [
            { name: "Box Gutters", description: "Built into roof structure, handles massive water volume" },
            { name: "Industrial K-Style (6\" and 7\")", description: "Large capacity for medium commercial buildings" },
            { name: "4x5\" Commercial Downspouts", description: "Handles 3x the volume of residential downspouts" },
            { name: "Stainless Steel Systems", description: "Maximum durability for industrial environments" }
        ],
        faqs: [
            { q: "What size gutters do commercial buildings need?", a: "It depends on roof size and pitch. Many commercial buildings require 6-8\" gutters or built-in box gutters." },
            { q: "Do you work on multi-story buildings?", a: "Yes, our crews are equipped with lifts and scaffolding for buildings up to 6 stories. Taller projects require specialized equipment." },
            { q: "Do you offer maintenance contracts?", a: "Yes, we provide annual and semi-annual maintenance agreements to keep commercial systems functioning properly." }
        ],
        priceRange: "Custom quotes based on project scope",
        duration: "Multiple days depending on building size",
        warranty: "Custom warranty terms for commercial projects"
    },
    "storm-damage-repair": {
        whatIs: "Storm damage repair addresses gutters damaged by high winds, hail, falling tree branches, ice, and lightning. We provide emergency response to prevent further water damage and work directly with insurance adjusters to streamline your claim.",
        process: [
            "Emergency assessment within 24-48 hours",
            "Temporary repairs to prevent active water damage",
            "Detailed documentation with photos for insurance claim",
            "Insurance adjuster coordination and claim support",
            "Permanent repair or full system replacement",
            "Final inspection and warranty registration"
        ],
        materials: [
            { name: "Matching Gutter Sections", description: "We match existing color and profile for seamless repairs" },
            { name: "High-Wind Hangers", description: "Upgraded fasteners for hurricane-prone areas" },
            { name: "Ice Stop Clips", description: "Prevents future ice dam damage at edge" },
            { name: "Emergency Tarping", description: "Immediate protection while awaiting parts" }
        ],
        faqs: [
            { q: "Will my insurance cover gutter storm damage?", a: "Most homeowner policies cover sudden storm damage. We provide detailed documentation and work directly with adjusters." },
            { q: "How quickly can you respond?", a: "We offer 24-48 hour emergency response and can usually make temporary repairs same-day." },
            { q: "Should I repair or replace after storm damage?", a: "We recommend full replacement if more than 30% of the system is damaged. Otherwise, targeted repairs are usually sufficient." }
        ],
        priceRange: "Repairs $150-500+, replacement varies",
        duration: "Same-day temporary, 1-2 days for permanent",
        warranty: "Standard warranty applies to all repairs"
    },
    "ice-dam-removal": {
        whatIs: "Ice dams form when heat escapes through the roof, melting snow that refreezes at the cold eaves. This ice barrier traps water that backs up under shingles causing leaks. Safe removal requires specialized steam equipment to prevent roof damage.",
        process: [
            "Assessment of ice dam severity and leak risk",
            "Low-pressure steam application to melt ice safely",
            "Gutter channel clearing of ice blockage",
            "Downspout thawing to restore drainage",
            "Attic insulation and ventilation recommendations",
            "Heat cable installation discussion if recurring issue"
        ],
        materials: [
            { name: "Commercial Steam Equipment", description: "Melts ice at 280°F without damaging shingles" },
            { name: "Heat Cables (Roof & Gutter)", description: "Prevents ice formation at eaves and in gutters" },
            { name: "Ice & Water Shield", description: "Membrane installed under shingles at eave line" },
            { name: "Attic Ventilation Products", description: "Ridge and soffit vents to prevent heat buildup" }
        ],
        faqs: [
            { q: "Why shouldn't I chip ice dams myself?", a: "Picks and shovels damage shingles and can injure you from falling ice. Steam removal is the only safe method." },
            { q: "How can I prevent ice dams?", a: "Proper attic insulation and ventilation prevent heat escape. Heat cables provide additional protection at trouble spots." },
            { q: "Is ice dam removal covered by insurance?", a: "Ice dam removal itself is usually not covered, but interior water damage from ice dams typically is." }
        ],
        priceRange: "$400-1,000+ depending on severity",
        duration: "2-4 hours typically",
        warranty: "No warranty on removal, but prevention installs are warranted"
    },
    "underground-drain-solutions": {
        whatIs: "Underground drainage systems move water from your downspouts far away from your foundation through buried pipes. Pop-up emitters release water at a distance, or drains can connect to storm systems. This eliminates soggy yards and basement moisture problems.",
        process: [
            "Site grading assessment and drain plan design",
            "Trenching from downspout to discharge point",
            "Installation of corrugated or PVC drain pipe",
            "Connection to downspout with proper adapter",
            "Pop-up emitter or discharge point installation",
            "Backfill, grading, and landscape restoration"
        ],
        materials: [
            { name: "4\" Corrugated Pipe", description: "Flexible, easy installation, good for most residential use" },
            { name: "4\" Schedule 40 PVC", description: "Rigid, maximum durability, won't crush" },
            { name: "Pop-Up Emitters", description: "Flush with lawn, opens when water flows, closes when dry" },
            { name: "Catch Basins", description: "Collects surface water in addition to downspout flow" }
        ],
        faqs: [
            { q: "How deep should underground drains be?", a: "Minimum 6-12\" deep with proper slope (1/8\" per foot). Deeper in frost-prone areas to prevent freeze damage." },
            { q: "Can I connect to the city storm drain?", a: "In many areas yes, but permits may be required. We handle permitting when connecting to municipal systems." },
            { q: "Will this solve my wet basement?", a: "Moving downspout water away is crucial, but other factors (grading, cracks) may also need to be addressed." }
        ],
        priceRange: "$30-50 per linear foot installed",
        duration: "Half day to full day depending on length",
        warranty: "10-year warranty on drain lines"
    },
    "color-gutter-matching": {
        whatIs: "Color gutter matching ensures your new gutters perfectly complement your home's siding, trim, fascia, and roofing. With 20+ factory colors and custom paint options, we can match virtually any color scheme for a cohesive, attractive appearance.",
        process: [
            "Color consultation and sample selection",
            "Comparison with existing siding and trim",
            "Factory color order or custom paint specification",
            "Sample chip approval before fabrication",
            "Installation with color-matched accessories",
            "Touch-up paint provided for future needs"
        ],
        materials: [
            { name: "Baked Enamel Aluminum", description: "Factory finish in 20+ standard colors, fade-resistant" },
            { name: "Kynar 500/Hylar Finish", description: "Premium coating with 40-year fade warranty" },
            { name: "Custom Paint Match", description: "Any color matched using spectrophotometer analysis" },
            { name: "Two-Tone Options", description: "Different color for inside vs. outside of gutter" }
        ],
        faqs: [
            { q: "What if my siding color isn't in your standard options?", a: "We can custom match any color. Bring a sample or provide color code and we'll create an exact match." },
            { q: "Do colored gutters cost more?", a: "Standard colors are the same price. Custom matching adds $1-3 per linear foot." },
            { q: "Will the color fade over time?", a: "Quality baked enamel finishes resist fading for 20+ years. Premium Kynar finishes are warranted for 40 years." }
        ],
        priceRange: "Standard colors included, custom $1-3/ft extra",
        duration: "Same as standard installation",
        warranty: "20-year finish warranty (40-year for Kynar)"
    },
    "emergency-gutter-repair": {
        whatIs: "Emergency gutter repair addresses urgent issues like active leaks over entryways, sagging gutters about to fall, full detachment from fascia, or storm damage requiring immediate attention. We respond within hours to prevent water damage and safety hazards.",
        process: [
            "Phone assessment to understand urgency",
            "Dispatch of nearest available crew",
            "Immediate safety measures if gutter is unstable",
            "Temporary repair or full fix depending on materials",
            "Assessment of additional damage or needs",
            "Scheduling of permanent repair if temporary fix applied"
        ],
        materials: [
            { name: "Universal Gutter Hangers", description: "Fits most profiles for immediate reattachment" },
            { name: "Gutter Sealant", description: "Commercial-grade for seam and hole repairs" },
            { name: "Fascia Repair Boards", description: "Temporary support for unstable mounting" },
            { name: "Downspout Adapters", description: "Various sizes for quick reconnection" }
        ],
        faqs: [
            { q: "What qualifies as an emergency?", a: "Active leaks, gutters about to fall, complete system failure during rain, post-storm urgent damage." },
            { q: "How quickly can you get here?", a: "We aim for same-day response within normal hours. After-hours emergencies are handled within 12-24 hours." },
            { q: "Are emergency repairs more expensive?", a: "We charge a modest emergency dispatch fee, but repair costs are the same as scheduled work." }
        ],
        priceRange: "$150-400+ depending on repair, plus emergency fee",
        duration: "1-3 hours typically",
        warranty: "Standard warranty applies"
    }
}

export default function ServiceSpecificPage({ city, state, stateCode, service, relatedCities }: ServiceSpecificPageProps) {
    const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    const formattedState = state.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

    // Get extended content for this service
    const extendedContent = serviceExtendedContent[service.slug] || serviceExtendedContent["seamless-gutter-installation"]

    // Build comprehensive schema
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": `${service.title} in ${formattedCity}, ${stateCode}`,
        "description": service.description(formattedCity, formattedState),
        "provider": {
            "@type": "LocalBusiness",
            "name": "US Gutter Installation",
            "telephone": "+18588985338",
            "url": "https://usgutterinstallation.com",
            "priceRange": "$$",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": formattedCity,
                "addressRegion": stateCode,
                "addressCountry": "US"
            }
        },
        "areaServed": {
            "@type": "City",
            "name": formattedCity,
            "containedInPlace": {
                "@type": "State",
                "name": formattedState
            }
        },
        "serviceType": service.title,
        "offers": {
            "@type": "Offer",
            "priceSpecification": {
                "@type": "PriceSpecification",
                "priceCurrency": "USD",
                "price": extendedContent.priceRange
            },
            "availability": "https://schema.org/InStock"
        },
        "termsOfService": extendedContent.warranty,
        "url": `https://usgutterinstallation.com/${stateCode}/${city}/${service.slug}`
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": extendedContent.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white">

            {/* Schema Markup */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* Navigation */}
            <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">
                        US Gutter Installation
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                            <Link href="/" className="hover:text-blue-600 transition-colors">Locations</Link>
                            <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
                            <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
                        </div>
                        <NavbarCallBtn />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-24 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 via-slate-900 to-black opacity-95"></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm text-blue-300 text-sm font-semibold uppercase tracking-wider">
                            {service.title} Near Me in {stateCode.toUpperCase()}
                        </div>
                        <h1 className="text-4xl md:text-[3.5rem] font-extrabold text-white mb-6 leading-tight tracking-tight">
                            {service.title} in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{formattedCity}, {stateCode.toUpperCase()}</span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-8 font-light">
                            {service.description(formattedCity, formattedState)}
                        </p>

                        {/* Quick Info Pills */}
                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                            <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white border border-white/20">
                                💰 {extendedContent.priceRange}
                            </span>
                            <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white border border-white/20">
                                ⏱️ {extendedContent.duration}
                            </span>
                            <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white border border-white/20">
                                🛡️ {extendedContent.warranty}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                            <CallBtn className="py-4 px-10 text-lg w-full sm:w-auto transform hover:scale-105" label="Get Free Quote" showNumber={true} />
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            <div className="absolute inset-0 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                            <Image
                                src="/Premium Gutter Installation-.png"
                                alt={`${service.title} in ${formattedCity}, ${stateCode}`}
                                width={600}
                                height={600}
                                className="relative z-10 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </header>

            <Breadcrumb items={[
                { label: state, href: `/${stateCode}` },
                { label: formattedCity, href: `/${stateCode}/${city}` },
                { label: service.title, href: `/${stateCode}/${city}/${service.slug}` }
            ]} />

            {/* What Is This Service Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">
                        What is {service.title}?
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        {extendedContent.whatIs}
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Key Features of Our {service.title} in {formattedCity}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {service.features.map((feature, i) => (
                            <div key={i} className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-4">
                                    {['🔧', '⚡', '📐', '✨'][i % 4]}
                                </div>
                                <p className="text-slate-700 font-medium">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Process Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Our {service.title} Process in {formattedCity}
                    </h2>
                    <div className="space-y-6">
                        {extendedContent.process.map((step, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                    {i + 1}
                                </div>
                                <div className="flex-1 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-slate-700">{step}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Materials Section */}
            <section className="py-16 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Materials & Options for {service.title}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {extendedContent.materials.map((material, i) => (
                            <div key={i} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{material.name}</h3>
                                <p className="text-slate-600">{material.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Benefits of Professional {service.title} in {formattedCity}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {service.benefits.map((benefit, i) => (
                            <div key={i} className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                                <div className="text-3xl mb-3">
                                    {['✓', '⭐', '🎯', '💎'][i % 4]}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit}</h3>
                                <p className="text-sm text-slate-600">Expert {service.title.toLowerCase()} in {formattedCity} delivers this benefit.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Local Service Area */}
            <section className="py-16 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            {service.title} Service Area in {formattedCity}
                        </h2>
                        <p className="text-lg text-slate-600 mb-6">
                            We provide {service.title.toLowerCase()} services throughout {formattedCity} and the surrounding {stateCode.toUpperCase()} areas. Our local crews are familiar with {formattedCity}'s architecture, weather patterns, and building codes.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                Licensed & Insured in {stateCode.toUpperCase()}
                            </li>
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                Local {formattedCity} crews (not subcontractors)
                            </li>
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                Same-day or next-day quotes available
                            </li>
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                BBB A+ Rated company
                            </li>
                        </ul>
                    </div>
                    <div>
                        <CityMap city={formattedCity} state={stateCode} />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        {service.title} FAQs for {formattedCity} Homeowners
                    </h2>
                    <div className="space-y-4">
                        {extendedContent.faqs.map((faq, i) => (
                            <details key={i} className="group bg-slate-50 p-6 rounded-xl border border-slate-200 open:border-blue-300 open:bg-blue-50 transition-all">
                                <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-slate-800">
                                    <span>{faq.q}</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </span>
                                </summary>
                                <p className="text-slate-600 mt-4 leading-relaxed">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Info */}
            <section className="py-16 px-6 bg-slate-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">{service.title} Pricing in {formattedCity}</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-3xl mb-2">💵</div>
                            <div className="text-sm text-slate-500 mb-1">Typical Price Range</div>
                            <div className="text-xl font-bold text-slate-900">{extendedContent.priceRange}</div>
                        </div>
                        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-3xl mb-2">⏰</div>
                            <div className="text-sm text-slate-500 mb-1">Time to Complete</div>
                            <div className="text-xl font-bold text-slate-900">{extendedContent.duration}</div>
                        </div>
                        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-3xl mb-2">🛡️</div>
                            <div className="text-sm text-slate-500 mb-1">Warranty Included</div>
                            <div className="text-xl font-bold text-slate-900">{extendedContent.warranty}</div>
                        </div>
                    </div>
                    <p className="text-slate-500 mt-6 text-sm">
                        *Prices vary based on home size, accessibility, and specific conditions. Request a free quote for exact pricing.
                    </p>
                </div>
            </section>

            {/* Nearby Cities */}
            {relatedCities && relatedCities.length > 0 && (
                <section className="py-16 px-6 bg-white border-t border-slate-200">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                            {service.title} Also Available in Nearby {stateCode.toUpperCase()} Cities
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {relatedCities.map((cityData, i) => (
                                <Link
                                    key={i}
                                    href={`/${cityData.state_id}/${cityData.city.toLowerCase().replace(/ /g, '-')}/${service.slug}`}
                                    className="block p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-center text-slate-700 font-medium truncate"
                                    title={`${service.title} in ${cityData.city}`}
                                >
                                    {cityData.city}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 px-6 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready for {service.title} in {formattedCity}?
                    </h2>
                    <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
                        Get a free, no-obligation quote from our local {formattedCity} experts. We respond within 24 hours with transparent pricing.
                    </p>
                    <CallBtn className="py-4 px-12 text-xl" label="Call Now for Free Quote" showNumber={true} />
                </div>
            </section>

            <TrustBadges />
            <RelatedServices city={formattedCity} state={stateCode} />
            <Footer />
        </div>
    )
}
