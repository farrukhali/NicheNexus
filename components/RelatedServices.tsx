import Link from 'next/link'
import { getSiteConfig } from '@/lib/site-config'
import { getNicheConfig } from '@/lib/niche-configs'

interface RelatedServicesProps {
    city?: string
    state?: string
}

export default async function RelatedServices({ city, state }: RelatedServicesProps) {
    const siteConfig = await getSiteConfig()
    const niche = await getNicheConfig(siteConfig.nicheSlug)
    const locationText = city && state ? `in ${city}, ${state}` : 'in your area'

    return (
        <section className="py-20 px-6 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Comprehensive Coverage</span>
                    <h2 className="text-3xl font-bold text-slate-900 mt-2">Professional {niche.name} Services</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {niche.services.map((service, index) => {
                        const citySlug = city?.toLowerCase().replace(/ /g, '-')
                        // If we are on a city page, link to service page. Otherwise link to homepage/states
                        const isCityContext = city && state
                        const linkHref = isCityContext ? `/${state?.toLowerCase()}/${citySlug}/${service.slug}` : 'tel:' + (siteConfig.contactPhone || '')

                        return (
                            <div key={index} className="flex flex-col h-full bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-sm">
                                        {service.icon}
                                    </div>
                                    <h3 className="font-bold text-slate-800 text-lg leading-tight hover:text-blue-600 transition-colors">
                                        {isCityContext ? (
                                            <Link href={linkHref}>{service.title} Near Me</Link>
                                        ) : (
                                            <a href={linkHref}>{service.title} Near Me</a>
                                        )}
                                    </h3>
                                </div>

                                <p className="text-slate-600 text-sm mb-6 flex-grow">
                                    {city && state ? (
                                        `Looking for ${service.title.toLowerCase()} in ${city}, ${state}? Our professional local experts provide top-quality ${service.title.toLowerCase()} near me.`
                                    ) : (
                                        `Professional ${service.title.toLowerCase()} services and ${niche.name.toLowerCase()} solutions.`
                                    )}
                                </p>

                                {isCityContext ? (
                                    <Link href={linkHref} className="mt-auto w-full block text-center bg-white border border-blue-200 text-blue-600 font-semibold py-2.5 rounded-xl hover:bg-blue-600 hover:text-white transition-colors">
                                        Learn More
                                    </Link>
                                ) : (
                                    <a href={linkHref || 'tel:'} className="mt-auto w-full block text-center bg-white border border-blue-200 text-blue-600 font-semibold py-2.5 rounded-xl hover:bg-blue-600 hover:text-white transition-colors">
                                        Call for Free Quote
                                    </a>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
