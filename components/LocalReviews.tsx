import { generateLocalReviews } from '@/lib/local-data-utils'
import { SiteConfig } from '@/lib/site-config'
import { Star, User, Quote } from 'lucide-react'

interface LocalReviewsProps {
    city: string
    state: string
    serviceName: string
    siteConfig: SiteConfig
    latitude?: number
}

export default function LocalReviews({ city, state, serviceName, siteConfig, latitude }: LocalReviewsProps) {
    const { reviews, finalRating, localReviewCount } = generateLocalReviews(city, state, serviceName, siteConfig, latitude)

    return (
        <section className="py-24 bg-white" id="reviews">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Customer Feedback</h2>
                        <h3 className="text-4xl font-bold text-slate-900 leading-tight">
                            Trusted by Homeowners in <span className="text-blue-600">{city}</span>
                        </h3>
                        <p className="text-lg text-slate-600 mt-4 font-medium">
                            Don&apos;t just take our word for it. See why {city} residents consistently rate us as their top choice for {serviceName.toLowerCase()} services.
                        </p>
                    </div>

                    <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="text-center">
                            <div className="text-4xl font-black text-slate-900">{finalRating}</div>
                            <div className="flex gap-0.5 mt-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(Number(finalRating)) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="h-12 w-px bg-slate-200" />
                        <div>
                            <div className="text-2xl font-bold text-slate-900">{localReviewCount}</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Local Reviews</div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {reviews.map((review, idx) => (
                        <div
                            key={idx}
                            className="group relative p-8 bg-slate-50 rounded-4xl border border-slate-100 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
                        >
                            <div className="absolute top-8 right-8 text-slate-200 transition-colors group-hover:text-blue-100">
                                <Quote className="w-12 h-12" />
                            </div>

                            <div className="flex gap-0.5 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>

                            <p className="text-xl text-slate-800 leading-relaxed font-medium mb-8 relative z-10">
                                &quot;{review.body}&quot;
                            </p>

                            <div className="flex items-center gap-4 pt-6 border-t border-slate-200/60">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{review.author}</p>
                                    <p className="text-sm text-slate-400 font-semibold">{city} Resident • {review.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-slate-500 font-medium">
                        Total {siteConfig.siteName} national rating: <span className="text-slate-900 font-bold">{siteConfig.trustSignals?.average_rating || 4.8}/5</span> based on <span className="text-slate-900 font-bold">{siteConfig.trustSignals?.total_reviews || 1247}</span> reviews.
                    </p>
                </div>
            </div>
        </section>
    )
}
