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
    "sump-pump-installation": {
        whatIs: "A professional sump pump installation involves placing a submersible or pedestal pump in a basin (sump pit) at the lowest point of your basement. It automatically pumps accumulating water out and away from your home's foundation to prevent flooding and water damage.",
        process: [
            "Assessment of basement water intrusion source",
            "Excavation of sump pit (if new) or cleaning of existing",
            "Installation of perforated sump basin with gravel pack",
            "Pump placement and discharge pipe connection",
            "Silent check valve installation to prevent backflow",
            "Discharge line routing to exterior drainage"
        ],
        materials: [
            { name: "Cast Iron Submersible Pump", description: "Heavy-duty housing dissipates heat, 20+ year lifespan" },
            { name: "Thermoplastic Pump", description: "Corrosion-resistant, lightweight, cost-effective" },
            { name: "Silent Check Valve", description: "Spring-loaded valve that eliminates 'clunking' noise" },
            { name: "Sealed Basin Lid", description: "Prevents radon, odors, and moisture evaporation" }
        ],
        faqs: [
            { q: "What size sump pump do I need?", a: "For most homes, a 1/3 HP pump is sufficient. High water tables or deep basements may require 1/2 or 3/4 HP." },
            { q: "How long does a sump pump last?", a: "Average lifespan is 7-10 years. Frequent cycling or sediment can reduce this. We recommend replacement every 10 years." },
            { q: "Do I need a cover on my sump pit?", a: "Yes. A sealed lid prevents radon gas entry, keeps odors out, and prevents debris (or pets) from falling in." }
        ],
        priceRange: "$400-800 replacement, $2500+ new pit",
        duration: "1-2 hours replacement, 1 day new pit",
        warranty: "3-5 year manufacturer, 1 year labor"
    },
    "battery-backup-systems": {
        whatIs: "A battery backup sump pump system is a secondary pump powered by a heavy-duty marine battery. It sits next to your primary pump and automatically activates if the primary pump fails or if power is lost during a storm—exactly when you need protection most.",
        process: [
            "Testing of primary pump and discharge line",
            "Installation of backup pump in existing pit",
            "Connection to dedicated discharge or shared line",
            "Battery case and control unit mounting",
            "Wiring and float switch adjustment",
            "Simulation test to ensure auto-activation"
        ],
        materials: [
            { name: "AGM Deep Cycle Battery", description: "Maintenance-free, long life, safe for indoor use" },
            { name: "Smart Control Unit", description: "Digital display, self-testing, and alarm features" },
            { name: "DC Backup Pump", description: "Efficient 12V pump capable of removing 2000+ GPH" },
            { name: "Wifi Module", description: "Sends text/email alerts during activation" }
        ],
        faqs: [
            { q: "How long will the battery last?", a: "A fully charged battery typically provides 5-7 hours of continuous pumping, or 2-3 days of intermittent cycling." },
            { q: "Do I really need a backup?", a: "If you have a finished basement or store valuables there, yes. Power outages and storms go hand-in-hand." },
            { q: "Can I use a car battery?", a: "No. You need a Deep Cycle Marine/RV battery designed for long, slow discharge. Car batteries are for short bursts." }
        ],
        priceRange: "$800-1500 installed",
        duration: "2-3 hours",
        warranty: "3 year pump/controller, 1 year battery"
    },
    "sewage-ejector-pumps": {
        whatIs: "Sewage ejector pumps (or grinder pumps) lift wastewater from basement bathrooms, laundry sinks, or floor drains up to the main sewer line. Unlike sump pumps, they are designed to handle solids and sealed in gas-tight basins to prevent sewage gases.",
        process: [
            "Basin location and venting assessment",
            "Removal of old unit (if replacement)",
            "Installation of sealed gas-tight basin",
            "Connection of 2\" discharge and vent pipes",
            "Pump installation and float setting",
            "Seal testing to ensure no gas leaks"
        ],
        materials: [
            { name: "Grinder Pump", description: "Macerates solids into slurry, prevents clogs" },
            { name: "Solids Handling Pump", description: "Passes 2\" solids without grinding (standard)" },
            { name: "Gas-Tight Basin", description: "Bolted gasketed lid prevents sewer gas escape" },
            { name: "Check/Ball Valve", description: "Prevents wastewater backflow into basin" }
        ],
        faqs: [
            { q: "What is the difference between sump and ejector pumps?", a: "Sump pumps handle clear groundwater. Ejector pumps handle raw sewage and solids, requiring a sealed system." },
            { q: "Why does it smell?", a: "Smells usually indicate a compromised lid seal or a dry P-trap. We can smoke-test to find the leak." },
            { q: "Can I flush wipes?", a: "We strongly advise against it, even with a grinder pump. Wipes are the #1 cause of ejector pump failure." }
        ],
        priceRange: "$900-1800 replacement",
        duration: "2-4 hours",
        warranty: "3 year limited warranty"
    },
    "basement-waterproofing": {
        whatIs: "Basement waterproofing involves a combination of techniques to manage hydrostatic pressure and prevent water intrusion. This includes interior discharge drainage (French drains), vapor barriers, and sealant applications to keep your basement dry and mold-free.",
        process: [
            "Moisture mapping and foundation inspection",
            "Jackhammering perimeter floor trench (for French drain)",
            "Laying perforated pipe and gravel",
            "Installing wall vapor barrier/encapsulation",
            "Re-concreting the floor",
            "Connection to high-capacity sump system"
        ],
        materials: [
            { name: "Perforated Drain Tile", description: "Collects sub-floor water" },
            { name: "Washed Clean Gravel", description: "Filters sediment, improves flow" },
            { name: "Vapor Barrier (12-20 mil)", description: "Thick plastic sheeting stops moisture through walls" },
            { name: "Dimpled Drainage Board", description: "Directs wall leaks down to drain tile" }
        ],
        faqs: [
            { q: "Is this messy?", a: "Excavation creates dust, but we use negative pressure fans and plastic containment to keep your home clean." },
            { q: "Does this fix cracked walls?", a: "Waterproofing manages water. Structural crack repair is a separate service we often perform simultaneously." },
            { q: "Can I finish my basement after?", a: "Yes! Our internal systems are designed specifically to allow for drywall and flooring installation afterward." }
        ],
        priceRange: "$40-80 per linear foot",
        duration: "2-4 days",
        warranty: "Lifetime transferable warranty"
    },
    "french-drain-installation": {
        whatIs: "A French drain is a trench filled with gravel and a perforated pipe that redirects surface water or groundwater away from your foundation. Exterior French drains stop water before it enters, while interior drains capture water that has already penetrated.",
        process: [
            "Site grading and flow determination",
            "Trench excavation (exterior) or floor breaking (interior)",
            "Lining with filter fabric",
            "Pipe and gravel installation",
            "Backfilling and soil grading",
            "Discharge point termination (daylight or dry well)"
        ],
        materials: [
            { name: "Filter Fabric (Geotextile)", description: "Prevents soil from clogging the pipe" },
            { name: "Perforated PVC/Corrugated", description: "Allows water entry along entire length" },
            { name: "Drainage Stone", description: "Promotes rapid water movement to pipe" },
            { name: "Catch Basins", description: "Surface grates to capture standing water" }
        ],
        faqs: [
            { q: "Better: Interior or Exterior?", a: "Exterior is best to stop water entering. Interior is best for hydrostatic pressure relief under the floor." },
            { q: "Will it clog?", a: "With proper filter fabric and clean stone, clogs are rare. We install cleanouts for easy maintenance." },
            { q: "Where does the water go?", a: "To a sump pump (interior) or a gravity-fed daylight point/dry well (exterior) far from the house." }
        ],
        priceRange: "$30-70 per linear foot",
        duration: "1-3 days",
        warranty: "20 years on pipe/gravel system"
    },
    "smart-sump-pumps": {
        whatIs: "Smart sump pumps connect to your home's Wi-Fi to provide 24/7 monitoring. Using a smartphone app, you can check water levels, receive alerts for power outages or pump failures, and even track pumping cycles to understand your basement's water load.",
        process: [
            "Standard pump installation procedure",
            "Wifi controller mounting and wiring",
            "App download and account setup",
            "Network connection and signal testing",
            "Alert threshold configuration",
            "User training on app features"
        ],
        materials: [
            { name: "Smart Controller", description: "The 'brain' connecting pump to cloud" },
            { name: "Water Level Sensor", description: "Digital pressure sensor (no moving float parts)" },
            { name: "High Water Alarm", description: "Audible backup alarm" },
            { name: "App Interface", description: "iOS/Android dashboard" }
        ],
        faqs: [
            { q: "What if wifi goes out?", a: "The pump still works! You just won't get alerts. We recommend battery backups for full protection." },
            { q: "Is there a monthly fee?", a: "Most systems we install have free apps. Some advanced monitoring services have optional subscriptions." },
            { q: "Can I retrofit my old pump?", a: "Yes, we can add a smart outlet/controller to an existing standard pump in most cases." }
        ],
        priceRange: "$600-1200 installed",
        duration: "1-2 hours",
        warranty: "3 year electronics warranty"
    },
    "commercial-pump-services": {
        whatIs: "Commercial pump services address the high-capacity drainage needs of businesses, apartments, and industrial facilities. This includes elevator pit pumps (oil detection), duplex systems (redundancy), and 3-phase high-voltage pump systems.",
        process: [
            "System analysis and code compliance check",
            "Turnkey replacement or custom fabrication",
            "Control panel wiring and logic setup",
            "Oil-mind/separator installation (elevator pits)",
            "Discharge piping welding/fitting",
            "Commissioning and alarm testing"
        ],
        materials: [
            { name: "Duplex Control Panel", description: "Alternates pumps and runs both during high flow" },
            { name: "Oil-Sensing Switch", description: "Prevents pumping oil into sewer (required for elevators)" },
            { name: "3-Phase Pumps", description: "High torque, efficient industrial motors" },
            { name: "Rail Systems", description: "Allows pump removal without entering deep pits" }
        ],
        faqs: [
            { q: "Do you service elevator pits?", a: "Yes, we are certified to install oil-sensing pumps required by code for elevator shafts." },
            { q: "What is a duplex system?", a: "Two pumps in one pit. They alternate use to extend life and provide backup if one fails." },
            { q: "Do you offer maintenance contracts?", a: "Yes. Commercial systems should be inspected quarterly. We offer custom plans." }
        ],
        priceRange: "Custom Quote",
        duration: "Varies significantly",
        warranty: "Commercial warranty terms apply"
    },
    "emergency-plumber": {
        whatIs: "Our emergency sump pump repair service provides 24/7 rapid response for critical failures. If your basement is taking on water, our on-call plumbers arrive with stocked trucks to extract water, replace pumps, and secure your home immediately.",
        process: [
            "Immediate dispatch and phone triage",
            "Water extraction (if flooded)",
            "Temporary bypass pumping if needed",
            "Diagnosis of failure mode",
            "Permanent pump replacement",
            "Disinfectant application (if sewage)"
        ],
        materials: [
            { name: "Emergency Pump Stock", description: "Trucks carry 1/3 and 1/2 HP pumps at all times" },
            { name: "Portable Trash Pumps", description: "Gas-powered pumps for high-volume water removal" },
            { name: "Universal Fernco Couplings", description: "Fast adaptors for any pipe type" },
            { name: "Wet/Dry Vacuums", description: "Final cleanup tools" }
        ],
        faqs: [
            { q: "How fast can you get here?", a: "We aim for <2 hours for active flooding calls." },
            { q: "Do you charge extra?", a: "Emergency calls carry a dispatch fee, but we provide upfront flat-rate pricing before starting work." },
            { q: "Does insurance cover this?", a: "If you have 'Sump Pump Failure' rider, yes. We help with the documentation." }
        ],
        priceRange: "$350-600 + parts",
        duration: "Until the water stops",
        warranty: "Standard warranty on new parts"
    }
}

export default function ServiceSpecificPage({ city, state, stateCode, service, relatedCities }: ServiceSpecificPageProps) {
    const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    const formattedState = state.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

    // Get extended content for this service
    const extendedContent = serviceExtendedContent[service.slug] || serviceExtendedContent["sump-pump-installation"]

    // Build comprehensive schema
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": `${service.title} in ${formattedCity}, ${stateCode}`,
        "description": service.description(formattedCity, formattedState),
        "provider": {
            "@type": "PlumbingService",
            "name": "Pipey Pro",
            "telephone": "+13213420091",
            "url": "https://pipeypro.com",
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
        "url": `https://pipeypro.com/${stateCode}/${city}/${service.slug}`
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
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">

            {/* Schema Markup */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* Navigation */}
            <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">
                        Pipey Pro
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
                            {service.title} in {stateCode.toUpperCase()}
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
                            {/* Placeholder for Sump Pump - we removed the gutter image reference */}
                            <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden">
                                <Image
                                    src="https://i.ibb.co/Z6Wgrtzs/Premium-Gutter-Installation.png"
                                    alt="Professional Sump Pump Installation & Repair"
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
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
                        Equipment & Options for {service.title}
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
                            We provide {service.title.toLowerCase()} services throughout {formattedCity} and the surrounding {stateCode.toUpperCase()} areas. Our local crews are familiar with {formattedCity}'s water tables, flood zones, and plumbing codes.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                Licensed & Insured in {stateCode.toUpperCase()}
                            </li>
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                Local {formattedCity} Experts
                            </li>
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                Same-day or next-day quotes available
                            </li>
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                Top Rated in {stateCode}
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
                        *Prices vary based on basement conditions and pump selection. Request a free quote for exact pricing.
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
                                    href={`/${cityData.state_id.toLowerCase()}/${cityData.city.toLowerCase().replace(/ /g, '-')}/${service.slug}`}
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
