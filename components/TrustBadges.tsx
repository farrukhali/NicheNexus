
export default function TrustBadges() {
    return (
        <section className="py-12 px-6 bg-white border-t border-b border-slate-100">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Trusted Nationwide</span>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                    {/* Licensed Badge */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-3xl">🏛️</span>
                        </div>
                        <span className="text-sm font-bold text-slate-700">Licensed & Insured</span>
                        <span className="text-xs text-slate-500">All 50 States</span>
                    </div>

                    {/* BBB Badge */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-3xl">✓</span>
                        </div>
                        <span className="text-sm font-bold text-slate-700">A+ BBB Rating</span>
                        <span className="text-xs text-slate-500">Accredited Business</span>
                    </div>

                    {/* Warranty Badge */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                            <span className="text-3xl">🛡️</span>
                        </div>
                        <span className="text-sm font-bold text-slate-700">Lifetime Warranty</span>
                        <span className="text-xs text-slate-500">Transferable Coverage</span>
                    </div>

                    {/* Reviews Badge */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span className="text-3xl">⭐</span>
                        </div>
                        <span className="text-sm font-bold text-slate-700">4.9/5 Rating</span>
                        <span className="text-xs text-slate-500">10,000+ Reviews</span>
                    </div>

                    {/* EPA Certified */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-3xl">🌿</span>
                        </div>
                        <span className="text-sm font-bold text-slate-700">EPA RRP Certified</span>
                        <span className="text-xs text-slate-500">Lead-Safe Practices</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
