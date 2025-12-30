import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Footer from '@/components/Footer'
import RelatedServices from '@/components/RelatedServices'

export const revalidate = 86400 // Revalidate daily


export default async function Home() {
  const { data, error } = await supabase
    .from('usa city name')
    .select('state_name, state_id')

  if (error) {
    console.error('Error fetching states:', error)
  }

  // Deduplicate states
  const uniqueStates = Array.from(new Map(data?.map(item => [item.state_id, item])).values())
    .sort((a, b) => a.state_name.localeCompare(b.state_name))

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* Hero Section */}
      <header className="relative py-32 px-6 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 via-slate-900 to-black opacity-95"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-48 -left-24 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-blue-300 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Available Nationwide
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-white tracking-tight leading-tight">
            America&apos;s Trusted <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Gutter Installation</span> Experts
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light mb-12 leading-relaxed">
            Connect with top-rated gutter pros in over <span className="text-white font-semibold">30,000+ cities</span>. Protect your home with seamless systems designed for your local climate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#states" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl shadow-blue-600/20 transition-all transform hover:scale-105">
              Find Your City
            </a>
          </div>
        </div>
      </header>

      {/* Stats Section */}
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

      <RelatedServices />

      <main className="max-w-7xl mx-auto py-24 px-6">

        {/* State Grid */}
        <section id="states" className="mb-32 scroll-mt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Browse by State</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Select your state below to find dedicated gutter installation services in your city.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {uniqueStates.map((state) => (
              <Link
                key={state.state_id}
                href={`/${state.state_id}`}
                className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">{state.state_id}</span>
                  <span className="font-semibold text-slate-700 group-hover:text-slate-900">{state.state_name}</span>
                </div>
                <div className="text-slate-300 group-hover:text-blue-500 transition-colors">
                  &rarr;
                </div>
              </Link>
            ))}
          </div>

          {!data && (
            <div className="text-center text-red-500 mt-8">
              Failed to load states. Please check database connection.
            </div>
          )}
        </section>

        {/* How It Works */}
        <section className="mb-32">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-white text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-16">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-12">
                <div className="relative">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 rotate-3">1</div>
                  <h3 className="text-xl font-bold mb-4">Find Your Location</h3>
                  <p className="text-slate-400 leading-relaxed">Browse our directory to find your specific city page. We have local data for every zip code.</p>
                </div>
                <div className="relative">
                  <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 -rotate-3">2</div>
                  <h3 className="text-xl font-bold mb-4">Check Services</h3>
                  <p className="text-slate-400 leading-relaxed">Review the gutter styles, materials, and protection systems available for your area.</p>
                </div>
                <div className="relative">
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 rotate-3">3</div>
                  <h3 className="text-xl font-bold mb-4">Get Matched</h3>
                  <p className="text-slate-400 leading-relaxed">Request a free quote. We&apos;ll instantly connect you with the highest-rated local installer.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group bg-white p-6 rounded-2xl border border-slate-200 open:border-blue-200 open:ring-1 open:ring-blue-200 transition-all">
              <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-slate-800">
                <span>How much does gutter installation cost?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed group-open:animate-fadeIn">
                Costs vary by material (aluminum, copper, vinyl) and linear footage. On average, homeowners spend between $600 and $1,500. Select your city to get a precise local estimate.
              </p>
            </details>
            <details className="group bg-white p-6 rounded-2xl border border-slate-200 open:border-blue-200 open:ring-1 open:ring-blue-200 transition-all">
              <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-slate-800">
                <span>Do you offer gutter guards?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed group-open:animate-fadeIn">
                Yes! Most of our local partners offer advanced micro-mesh gutter guards to prevent clogging and reduce maintenance.
              </p>
            </details>
            <details className="group bg-white p-6 rounded-2xl border border-slate-200 open:border-blue-200 open:ring-1 open:ring-blue-200 transition-all">
              <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-slate-800">
                <span>How quickly can you install?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed group-open:animate-fadeIn">
                Many of our partners offer same-week installation services. Emergency repairs can often be handled within 24-48 hours.
              </p>
            </details>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
