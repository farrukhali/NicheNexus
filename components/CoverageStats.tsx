export default function CoverageStats() {
    return (
        <section className="bg-white border-b border-slate-100 relative z-20">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold text-slate-900 mb-1">31k+</div>
                        <div className="text-slate-500 text-sm font-medium">Cities Covered</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-slate-900 mb-1">50</div>
                        <div className="text-slate-500 text-sm font-medium">States Served</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-slate-900 mb-1">4.9/5</div>
                        <div className="text-slate-500 text-sm font-medium">Average Rating</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-slate-900 mb-1">24h</div>
                        <div className="text-slate-500 text-sm font-medium">Fast Quotes</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
