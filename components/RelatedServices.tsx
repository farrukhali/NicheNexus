import Link from 'next/link'

const SERVICES = [
    "Seamless Gutter Installation",
    "Gutter Guards & Leaf Protection",
    "Gutter Cleaning & Maintenance",
    "Downspout Installation & Extensions",
    "Soffit & Fascia Repair",
    "Copper Gutter Systems",
    "Commercial Gutter Services",
    "Storm Damage Repair",
    "Ice Dam Removal",
    "Underground Drain Solutions",
    "Color Gutter Matching",
    "Emergency Gutter Repair"
]

interface RelatedServicesProps {
    city?: string
    state?: string
}

export default function RelatedServices({ city, state }: RelatedServicesProps) {
    const locationText = city && state ? `in ${city}, ${state}` : 'in your area'

    return (
        <section className="py-20 px-6 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Comprehensive Coverage</span>
                    <h2 className="text-3xl font-bold text-slate-900 mt-2">More than just Gutters</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SERVICES.map((service, index) => (
                        <div key={index} className="flex flex-col h-full bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                                <h3 className="font-bold text-slate-800 text-lg leading-tight">
                                    {service}
                                </h3>
                            </div>

                            <p className="text-slate-600 text-sm mb-6 flex-grow">
                                Professional {service.toLowerCase()} services {locationText}..
                            </p>

                            <a href="tel:+18588985338" className="mt-auto w-full block text-center bg-white border border-blue-200 text-blue-600 font-semibold py-2.5 rounded-xl hover:bg-blue-600 hover:text-white transition-colors">
                                Get Quotes
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
