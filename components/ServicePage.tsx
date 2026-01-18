import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import { getSEOContent } from '@/lib/seo-content'
import RelatedServices from '@/components/RelatedServices'
import { CallBtn, NavbarCallBtn } from '@/components/CallBtn'
import CoverageStats from '@/components/CoverageStats'
import Breadcrumb from '@/components/Breadcrumb'
import CityMap from '@/components/CityMap'
import InternalLinks from '@/components/InternalLinks'
import TopBusinesses from '@/components/TopBusinesses'
import AuthoritySignals from '@/components/AuthoritySignals'

interface ServicePageProps {
    city: string
    state: string
    stateCode: string
    zipCodes?: string[]
    relatedCities?: {
        city: string
        state_id: string
    }[]
    latitude?: number
    longitude?: number
}

export default function ServicePage({ city, state, stateCode, zipCodes, relatedCities, latitude, longitude }: ServicePageProps) {
    const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    const formattedState = state.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

    // Generate Dynamic SEO Content with state code for climate-specific messaging
    const content = getSEOContent(formattedCity, formattedState, stateCode)

    return (
        <div
            className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white"
            itemScope
            itemType="https://schema.org/PlumbingService"
        >

            {/* Navigation (Transparent Glass) */}
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
                    <div className="absolute top-48 -left-24 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Text */}
                    <div className="text-center lg:text-left">
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm text-blue-300 text-sm font-semibold uppercase tracking-wider">
                            #1 Rated in {stateCode.toUpperCase()}
                        </div>
                        <h1 className="text-4xl md:text-[3.5rem] font-extrabold text-white mb-8 leading-tight tracking-tight">
                            Sump Pump Installation & Repair in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{formattedCity}, {stateCode.toUpperCase()}</span>
                        </h1>
                        <div className="text-lg md:text-xl text-slate-300 mb-10 font-light space-y-4">
                            <p dangerouslySetInnerHTML={{ __html: content.intro.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-medium">$1</span>') }} />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                            <CallBtn className="py-4 px-10 text-lg w-full sm:w-auto transform hover:scale-105" label="Call For Estimate" showNumber={true} />
                            <Link href="#cities" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold py-4 px-10 rounded-full text-lg transition-all w-full sm:w-auto text-center">
                                View Service Areas
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="relative hidden lg:block">
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            {/* Decorative blob behind image */}
                            <div className="absolute inset-0 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                            {/* Placeholder for Sump Pump Image - Using a generic div/text if image missing, or a solid color block with text */}
                            <div className="relative z-10 w-full h-full bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 shadow-2xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-cyan-400/20"></div>
                                <div className="text-center p-8">
                                    <div className="text-6xl mb-4">💧</div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Pipey Pro</h3>
                                    <p className="text-blue-200">Expert Sump Pump Services</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <Breadcrumb items={[
                { label: state, href: `/${stateCode}` },
                { label: formattedCity, href: `/${stateCode}/${city}` }
            ]} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            // Organization Entity with full attributes
                            {
                                "@type": "PlumbingService",
                                "@id": "https://pipeypro.com/#organization",
                                "name": "Pipey Pro",
                                "description": "Professional sump pump installation, repair, and basement waterproofing services across 31,000+ cities in the United States. Licensed, insured, and certified.",
                                "url": "https://pipeypro.com",
                                "logo": "https://pipeypro.com/logo.png",
                                "telephone": "+13213420091",
                                "priceRange": "$$",
                                "areaServed": {
                                    "@type": "Country",
                                    "name": "United States"
                                },
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": formattedCity,
                                    "addressRegion": stateCode.toUpperCase(),
                                    "addressCountry": "US"
                                },
                                "aggregateRating": {
                                    "@type": "AggregateRating",
                                    "ratingValue": "4.9",
                                    "reviewCount": "2847",
                                    "bestRating": "5",
                                    "worstRating": "1"
                                }
                            },
                            // Local Business Branch for this city
                            {
                                "@type": "PlumbingService",
                                "@id": `https://pipeypro.com/${stateCode}/${city}/#localbusiness`,
                                "name": `Pipey Pro - ${formattedCity}, ${stateCode.toUpperCase()}`,
                                "description": `Professional sump pump installation repair and waterproofing in ${formattedCity}, ${stateCode.toUpperCase()}. Same-day quotes, licensed & insured.`,
                                "url": `https://pipeypro.com/${stateCode}/${city}`,
                                "telephone": "+13213420091",
                                "parentOrganization": { "@id": "https://pipeypro.com/#organization" },
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": formattedCity,
                                    "addressRegion": stateCode.toUpperCase(),
                                    "addressCountry": "US",
                                    "postalCode": zipCodes?.[0] || ""
                                },
                                "areaServed": {
                                    "@type": "City",
                                    "name": formattedCity
                                },
                                "priceRange": "$$",
                                "aggregateRating": {
                                    "@type": "AggregateRating",
                                    "ratingValue": "4.9",
                                    "reviewCount": "127",
                                    "bestRating": "5"
                                }
                            },
                            // Service Schema for primary service
                            {
                                "@type": "Service",
                                "@id": `https://pipeypro.com/${stateCode}/${city}/#service`,
                                "name": `Sump Pump Installation Near Me in ${formattedCity}, ${stateCode.toUpperCase()}`,
                                "serviceType": "Sump Pump Installation",
                                "description": `Looking for sump pump installation near me in ${formattedCity}, ${stateCode.toUpperCase()}? Complete waterproofing services including battery backups, sewage ejectors, and french drains.`,
                                "provider": { "@id": `https://pipeypro.com/${stateCode}/${city}/#localbusiness` },
                                "areaServed": {
                                    "@type": "City",
                                    "name": formattedCity
                                },
                                "hasOfferCatalog": {
                                    "@type": "OfferCatalog",
                                    "name": `Sump Pump Services in ${formattedCity}`,
                                    "itemListElement": [
                                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Submersible Pump Installation" } },
                                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Battery Backup Systems" } },
                                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sewage Ejector Pumps" } },
                                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Basement Waterproofing" } }
                                    ]
                                }
                            }
                        ]
                    })
                }}
            />

            <CoverageStats />

            <AuthoritySignals stateCode={stateCode} city={formattedCity} />

            <RelatedServices city={formattedCity} state={stateCode} />

            {/* Features Grid */}
            <section className="py-24 px-6 bg-white relative z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 -mt-32">
                        {[
                            { title: "Battery Backups", desc: "Never worry about power outages. Our backup systems keep your basement dry 24/7.", icon: "🔋" },
                            { title: "Submersible Pumps", desc: "Quiet, high-efficiency pumps that handle heavy storm loads with ease.", icon: "💧" },
                            { title: "Lifetime Warranty", desc: "We stand behind our pumps and installation workmanship 100%.", icon: "✅" }
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-blue-100 transition-all hover:-translate-y-1">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-3 text-slate-800">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Local Content Section */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                            Why {formattedCity} Homeowners Trust Us
                        </h2>
                        <div className="text-lg text-slate-600 mb-6 leading-relaxed space-y-4">
                            <p dangerouslySetInnerHTML={{ __html: content.whyChoose.replace(/\*\*(.*?)\*\*/g, '<span class="text-slate-900 font-semibold">$1</span>') }} />
                            <p dangerouslySetInnerHTML={{ __html: content.materials.replace(/\*\*(.*?)\*\*/g, '<span class="text-slate-900 font-semibold">$1</span>') }} />
                        </div>

                        {/* Technical Specs Box */}
                        <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 mb-4">
                            <p className="text-sm text-slate-700 font-semibold mb-1">📐 Technical Specifications</p>
                            <p className="text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: content.technicalSpecs.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </div>

                        {/* Climate Considerations */}
                        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 mb-6">
                            <p className="text-sm text-amber-800 font-semibold mb-1">🌤️ {stateCode.toUpperCase()} Weather Alert</p>
                            <p className="text-sm text-amber-700">{content.climateConsiderations}</p>
                        </div>

                        <ul className="space-y-4 mb-8">
                            {['Licensed & Insured in ' + stateCode.toUpperCase(), '24/7 Emergency Service', 'Same-Day Quotes'].map((item, i) => (
                                <li key={i} className="flex items-center text-slate-700 font-medium">
                                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* Dynamic Map Placeholder */}
                        <CityMap city={formattedCity} state={stateCode} />
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mt-4">
                            <p className="text-sm text-blue-800 font-semibold mb-1">Service Area Coverage</p>
                            <div className="text-blue-600">
                                We cover all neighborhoods in <span className="underline">{formattedCity}</span> and surrounding {stateCode.toUpperCase()} counties.
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-3xl transform rotate-3 opacity-20"></div>
                        <div className="relative bg-white p-2 rounded-3xl shadow-2xl">
                            <div className="aspect-[4/3] bg-slate-200 rounded-2xl flex items-center justify-center overflow-hidden relative">
                                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                                    <div className="text-center text-white p-4">
                                        <div className="text-5xl mb-2">🔧</div>
                                        <p className="font-bold">Local Service in {formattedCity}</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                                    <p className="font-medium text-lg">Project: {formattedCity}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top 10 Businesses Section */}
            <TopBusinesses city={formattedCity} state={stateCode} />

            {/* Popular Zip Codes Section */}
            {zipCodes && zipCodes.length > 0 && (
                <section className="py-16 px-6 bg-white border-y border-slate-100">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                            Popular Zip Codes in {formattedCity}
                        </h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {zipCodes.map((zip, i) => (
                                <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default">
                                    {zip}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Nearby Cities Section */}
            {relatedCities && relatedCities.length > 0 && (
                <section className="py-16 px-6 bg-slate-50 border-b border-slate-200">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                            Sump Pump Services in Other {stateCode.toUpperCase()} Cities
                        </h2>
                        <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto">
                            Looking for <strong>plumbers near me</strong> outside {formattedCity}? We serve these nearby {stateCode.toUpperCase()} communities with the same quality service.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {relatedCities.map((cityData, i) => (
                                <Link
                                    key={i}
                                    href={`/${cityData.state_id.toLowerCase()}/${cityData.city.toLowerCase().replace(/ /g, '-')}`}
                                    className="block p-3 bg-white rounded-lg shadow-sm border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-center text-slate-700 font-medium hover:text-blue-600"
                                    title={`Sump Pump Installation in ${cityData.city}, ${cityData.state_id}`}
                                >
                                    <span className="block text-xs text-slate-400 mb-1">Service</span>
                                    {cityData.city}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Services Detailed Section */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                            Complete Waterproofing Solutions in {formattedCity}
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            {content.serviceDesc.replace(/\*\*(.*?)\*\*/g, '$1')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Sump Pump Installation",
                                desc: "Expert installation of submersible and pedestal pumps. Right-sized for your basement to handle any storm.",
                                bg: "bg-blue-50", text: "text-blue-600",
                                icon: "💧"
                            },
                            {
                                title: "Battery Backup Systems",
                                desc: "Never worry about power outages. Install reliable battery backup systems to keep your basement dry 24/7.",
                                bg: "bg-green-50", text: "text-green-600",
                                icon: "🔋"
                            },
                            {
                                title: "Sewage Ejector Pumps",
                                desc: "Installation and repair of sewage ejector pumps for basement bathrooms and laundry rooms.",
                                bg: "bg-orange-50", text: "text-orange-600",
                                icon: "🚽"
                            },
                            {
                                title: "Basement Waterproofing",
                                desc: "Comprehensive solutions including french drains, vapor barriers, and foundation sealing.",
                                bg: "bg-purple-50", text: "text-purple-600",
                                icon: "🏠"
                            }
                        ].map((service, i) => (
                            <div key={i} className="flex gap-6 p-8 rounded-2xl bg-white border border-slate-100 hover:shadow-xl transition-shadow group">
                                <div className={`w-16 h-16 rounded-xl ${service.bg} ${service.text} flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform`}>
                                    {service.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{service.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Process Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                            How It Works
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            {content.processIntro}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10 hidden md:block"></div>

                        {[
                            { step: "01", title: "Diagnostic", desc: "We inspect your basement, check water tables, and identify the root cause of flooding or pump failure." },
                            { step: "02", title: "Pump Selection", desc: "We recommend the perfect pump capacity and type for your specific home needs." },
                            { step: "03", title: "Expert Install", desc: "Our licensed plumbers install your new system, test check valves, and ensure proper discharge." }
                        ].map((step, i) => (
                            <div key={i} className="bg-white p-8 pt-0 text-center">
                                <div className="w-20 h-20 mx-auto bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-200 mb-8 relative z-10">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                                <p className="text-slate-600">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Local Expertise Section */}
            <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-cyan-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Local Experts Serving {formattedCity} & Surrounding Areas
                        </h2>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                            When you search for <strong>sump pump installation near me in {formattedCity}</strong>, you deserve contractors who truly understand your local area. Our {stateCode.toUpperCase()}-based crews have served thousands of homeowners across {formattedCity} and the surrounding communities.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* Local Service Area */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                🏠 Neighborhoods We Serve in {formattedCity}
                            </h3>
                            <p className="text-slate-600 mb-4">
                                Our <strong>sump pump repair near me in {formattedCity}</strong> specialists cover all residential zones including downtown, suburbs, and rural properties. We understand high water table zones and flood-prone areas in your community.
                            </p>
                            <p className="text-slate-600">
                                We also serve surrounding {stateCode.toUpperCase()} communities within a 30-mile radius. Looking for <strong>plumbers near me</strong> outside city limits? Our crews regularly travel to nearby towns to provide the same quality service.
                            </p>
                        </div>

                        {/* Climate Expertise */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                🌤️ {stateCode.toUpperCase()} Storm-Ready Systems
                            </h3>
                            <p className="text-slate-600 mb-4">
                                {stateCode.toUpperCase()} homeowners face unique weather challenges: {content.climateConsiderations}. That's why our <strong>sump pump installation near me</strong> specialists design systems specifically engineered for local conditions.
                            </p>
                            <p className="text-slate-600">
                                We recommend <strong>battery backup sump pump</strong> installations that handle {stateCode.toUpperCase()}'s storms. Don't let a power outage flood your basement—get protected today.
                            </p>
                        </div>
                    </div>

                    {/* Additional Local Content */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 mb-8">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">
                            Why {formattedCity} Homeowners Choose Us for <span className="text-blue-600">Waterproofing Services</span>
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">🔧 Full-Service Solutions</h4>
                                <p className="text-slate-600 text-sm">
                                    From <strong>sump pump replacement</strong> to <strong>french drain installation</strong>, we handle everything: sewage pumps, check valves, discharge lines, and vapor barriers.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">⭐ Trusted Local Reputation</h4>
                                <p className="text-slate-600 text-sm">
                                    With thousands of completed projects across {stateCode.toUpperCase()}, we're the <strong>waterproofing company near me</strong> that {formattedCity} residents recommend.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">💰 Transparent Local Pricing</h4>
                                <p className="text-slate-600 text-sm">
                                    When you search for <strong>sump pump cost</strong>, you'll find our {formattedCity} pricing is competitive and straightforward—no hidden fees, no upsells.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Service Links with Strong Anchor Text */}
                    <div className="text-center">
                        <p className="text-slate-600 mb-4">
                            Ready to get started with a <strong>sump pump installation near me in {formattedCity}</strong>? Contact our local team today for a free, no-obligation estimate.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link href={`/${stateCode.toLowerCase()}/${city}/sump-pump-installation`} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                                Sump Pump Installation {formattedCity}
                            </Link>
                            <Link href={`/${stateCode.toLowerCase()}/${city}/battery-backup-systems`} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                                Battery Backups Near Me
                            </Link>
                            <Link href={`/${stateCode.toLowerCase()}/${city}/sewage-ejector-pumps`} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                                Sewage Pumps
                            </Link>
                            <Link href={`/${stateCode.toLowerCase()}/${city}/emergency-plumber`} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                                Emergency Repairs
                            </Link>
                            {/* Structured Data: FAQ + LocalBusiness + Breadcrumb */}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions in {formattedCity}</h2>

                    <div className="space-y-4">
                        {[
                            { q: `How much does sump pump installation cost in ${formattedCity}?`, a: content.faqAnswers.cost },
                            { q: `What's the best battery backup for ${stateCode.toUpperCase()} storms?`, a: content.faqAnswers.bestGuard },
                            { q: `Do you offer emergency sump pump repair in ${formattedCity}?`, a: content.faqAnswers.emergency },
                            { q: `How often should I check my sump pump in ${stateCode.toUpperCase()}?`, a: content.faqAnswers.cleaningFrequency },
                            { q: "Do you offer warranties?", a: content.faqAnswers.warranty },
                            { q: "How quickly can you replace my pump?", a: content.faqAnswers.timeline }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h3>
                                <p className="text-slate-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section (Social Proof) */}
            <section className="py-24 px-6 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-12 text-center">
                        What Neighbors in {formattedCity} Are Saying
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Michael R.", role: "Homeowner", text: "My basement stayed completely dry during the last big storm thanks to their battery backup system. Lifesavers!", stars: 5 },
                            { name: "Sarah J.", role: "Local Resident", text: "Fast response when my pump failed. The plumber was knowledgeable and fixed it in under an hour.", stars: 5 },
                            { name: "David K.", role: "Business Owner", text: "Professional installation of a commercial ejector pump. Clean work and great pricing.", stars: 5 }
                        ].map((review, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex text-yellow-400 mb-4">
                                    {[...Array(review.stars)].map((_, i) => <span key={i}>★</span>)}
                                </div>
                                <p className="text-slate-600 mb-6 italic">"{review.text}"</p>
                                <div>
                                    <div className="font-bold text-slate-900">{review.name}</div>
                                    <div className="text-sm text-slate-500">{review.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-grid-slate-800"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                        Ready to protect your basement in {formattedCity}?
                    </h2>
                    <p className="text-blue-200 text-xl mb-10 max-w-2xl mx-auto">
                        Get a comprehensive quote in minutes. No obligation, just honest expert advice.
                    </p>
                    <CallBtn className="py-4 px-12 text-xl" label={`Call Now in ${formattedCity}`} />
                </div>
            </section>

            {/* Internal Links for Crawlability */}
            <InternalLinks
                currentCity={formattedCity}
                stateCode={stateCode}
                relatedCities={relatedCities}
            />
        </div>
    )
}
