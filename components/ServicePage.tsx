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
import TrustBadges from '@/components/TrustBadges'
import AuthoritySignals from '@/components/AuthoritySignals'
import TopBusinesses from '@/components/TopBusinesses'
import { getSiteConfig } from '@/lib/site-config'
import { getNicheConfig } from '@/lib/niche-configs'
import JsonLdSchema from '@/components/seo/JsonLdSchema'
import { replacePlaceholders } from '@/lib/seo-utils'

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
    customIntro?: string
}

export default async function ServicePage({ city, state, stateCode, zipCodes, relatedCities, latitude, longitude, customIntro }: ServicePageProps) {
    const siteConfig = await getSiteConfig()
    const niche = await getNicheConfig(siteConfig.nicheSlug)

    const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    const formattedState = state.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

    // Generate Dynamic SEO Content
    const content = await getSEOContent(formattedCity, formattedState, stateCode)

    const placeholderVars = {
        city: formattedCity,
        state: formattedState,
        stateCode: stateCode,
        niche: niche.name
    }

    if (customIntro) {
        content.intro = replacePlaceholders(customIntro, placeholderVars)
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
            <JsonLdSchema type="LocalBusiness" data={{
                name: `${siteConfig.siteName} - ${formattedCity}`,
                description: `Professional ${niche.name.toLowerCase()} in ${formattedCity}, ${stateCode}. Same-day quotes, licensed & insured.`,
                url: `https://${siteConfig.domain}/${stateCode.toLowerCase()}/${city.toLowerCase()}`,
                telephone: siteConfig.contactPhone,
                address: {
                    "@type": "PostalAddress",
                    "addressLocality": formattedCity,
                    "addressRegion": stateCode.toUpperCase(),
                    "addressCountry": "US",
                    "postalCode": zipCodes?.[0] || ""
                }
            }} />

            {/* Navigation */}
            <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">
                        {siteConfig.siteName}
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
                </div>

                <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm text-blue-300 text-sm font-semibold uppercase tracking-wider">
                            #1 Rated in {stateCode.toUpperCase()}
                        </div>
                        <h1 className="text-4xl md:text-[3.5rem] font-extrabold text-white mb-8 leading-tight tracking-tight">
                            {niche.primaryService} in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{formattedCity}, {stateCode.toUpperCase()} Near Me</span>
                        </h1>
                        <div className="text-lg md:text-xl text-slate-300 mb-10 font-light space-y-4">
                            <p dangerouslySetInnerHTML={{ __html: content.intro.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-medium">$1</span>') }} />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                            <CallBtn className="py-4 px-10 text-lg w-full sm:w-auto transform hover:scale-105" label="Call Now" showNumber={true} />
                            <Link href="#cities" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold py-4 px-10 rounded-full text-lg transition-all w-full sm:w-auto text-center">
                                View Locations
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <Breadcrumb items={[
                { label: formattedState, href: `/${stateCode.toLowerCase()}` },
                { label: formattedCity, href: `/${stateCode.toLowerCase()}/${city.toLowerCase()}` }
            ]} />

            <CoverageStats />
            <AuthoritySignals stateCode={stateCode} city={formattedCity} />
            <RelatedServices city={formattedCity} state={stateCode} />

            {/* Features Grid */}
            <section className="py-24 px-6 bg-white relative z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 -mt-32">
                        {niche.services.slice(0, 3).map((service, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-blue-100 transition-all hover:-translate-y-1 group">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                                <h3 className="text-xl font-bold mb-3 text-slate-800">{service.title}</h3>
                                <p className="text-slate-600 leading-relaxed line-clamp-3">{service.description}</p>
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
                            Why {formattedCity} Homeowners Trust {siteConfig.siteName}
                        </h2>
                        <div className="text-lg text-slate-600 mb-6 leading-relaxed space-y-4">
                            <p dangerouslySetInnerHTML={{ __html: content.whyChoose.replace(/\*\*(.*?)\*\*/g, '<span class="text-slate-900 font-semibold">$1</span>') }} />
                            <p dangerouslySetInnerHTML={{ __html: content.materials.replace(/\*\*(.*?)\*\*/g, '<span class="text-slate-900 font-semibold">$1</span>') }} />
                        </div>

                        <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 mb-4">
                            <p className="text-sm text-slate-700 font-semibold mb-1">📐 Technical Specifications</p>
                            <p className="text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: content.technicalSpecs.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </div>

                        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 mb-6">
                            <p className="text-sm text-amber-800 font-semibold mb-1">🌤️ {stateCode.toUpperCase()} Weather Alert</p>
                            <p className="text-sm text-amber-700">{content.climateConsiderations}</p>
                        </div>

                        <CityMap city={formattedCity} state={stateCode} />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-3xl transform rotate-3 opacity-20"></div>
                        <div className="relative bg-white p-2 rounded-3xl shadow-2xl overflow-hidden aspect-[4/3] flex items-center justify-center bg-slate-800 text-white">
                            <div className="text-center">
                                <div className="text-6xl mb-4">🏠</div>
                                <h3 className="text-2xl font-bold">{niche.name} Experts</h3>
                                <p className="text-blue-300">Serving {formattedCity}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <TopBusinesses city={formattedCity} state={stateCode} />

            {/* Services Detailed Section */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                            Professional {niche.name} in {formattedCity}
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            {content.serviceDesc}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {niche.services.map((service, i) => (
                            <div key={i} className="flex gap-6 p-8 rounded-2xl bg-white border border-slate-100 hover:shadow-xl transition-shadow group">
                                <div className="w-16 h-16 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                        {replacePlaceholders(service.title, placeholderVars)}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {replacePlaceholders(service.description, { ...placeholderVars, service: service.title })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {niche.faqs.map((faq, i) => (
                            <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-2">
                                    {replacePlaceholders(faq.question, placeholderVars)}
                                </h3>
                                <p className="text-slate-600">
                                    {replacePlaceholders(faq.answer, placeholderVars)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-slate-900 text-center text-white relative overflow-hidden">
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to get started in {formattedCity}?</h2>
                    <p className="text-xl text-blue-200 mb-10">Connect with local {niche.name.toLowerCase()} experts today for a free, no-obligation quote.</p>
                    <CallBtn className="py-4 px-12 text-xl" label="Get Free Quote" />
                </div>
            </section>

            <InternalLinks currentCity={formattedCity} stateCode={stateCode} relatedCities={relatedCities} />
            <TrustBadges />
            <Footer />
        </div>
    )
}
