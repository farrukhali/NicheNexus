import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Footer from '@/components/Footer'
import RelatedServices from '@/components/RelatedServices'
import TrustBadges from '@/components/TrustBadges'
import { Metadata } from 'next'

export const revalidate = 86400 // Revalidate daily

export const metadata: Metadata = {
  title: 'Sump Pump Installation Near Me | Repair & Battery Backup Systems',
  description: 'Looking for sump pump installation near me? Find licensed plumbers and waterproofing experts in 31,000+ cities. Sump pump repair, battery backups, basement waterproofing. Free quotes!',
  keywords: 'sump pump installation near me, sump pump repair near me, battery backup sump pump, basement waterproofing, sewage ejector pump, french drain installation, water backup system, flooded basement repair',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Find Sump Pump Installation Near Me | America\'s #1 Service Directory',
    description: 'Connect with top-rated sump pump installers near you. Installation, repair, and battery backups with warranty. Free estimates!',
    url: 'https://pipeypro.com',
  }
}


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
      {/* Hero Section - Optimized for "Near Me" */}
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
            Find Sump Pump Services Near You
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-white tracking-tight leading-tight">
            Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Sump Pump Installation</span><br />Near Me
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light mb-12 leading-relaxed">
            Searching for <span className="text-white font-semibold">sump pump contractors near me</span>? Connect with licensed, insured plumbers in over <span className="text-white font-semibold">31,000+ cities</span> across all 50 states. Get same-day quotes for new installations, repairs, and battery backups.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#states" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl shadow-blue-600/20 transition-all transform hover:scale-105">
              Find Sump Pump Pros Near Me
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
              <div className="text-slate-500 text-sm font-medium">Cities with Local Pros</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-1">50</div>
              <div className="text-slate-500 text-sm font-medium">States Covered Near You</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-1">4.9/5</div>
              <div className="text-slate-500 text-sm font-medium">Average Customer Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-1">24h</div>
              <div className="text-slate-500 text-sm font-medium">Fast Local Quotes</div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: What We Offer Section - Semantic Content */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Sump Pump Services Near Me</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Find professional sump pump installation, repair, and basement waterproofing services. All our contractors are licensed, insured, and background-checked.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Sump Pump Installation Near Me", desc: "Expert installation of submersible and pedestal sump pumps. Right-sized for your basement to handle any storm.", icon: "💧" },
              { title: "Battery Backup Installation", desc: "Never worry about power outages. Install reliable battery backup systems to keep your basement dry 24/7.", icon: "🔋" },
              { title: "Sump Pump Repair Near Me", desc: "Fast repair for failed pumps, stuck switches, and strange noises. Same-day emergency service available.", icon: "🔧" },
              { title: "Sewage Ejector Pumps", desc: "Installation and repair of sewage ejector pumps for basement bathrooms and laundry rooms.", icon: "🚽" },
              { title: "Basement Waterproofing", desc: "Comprehensive solutions including french drains, vapor barriers, and foundation sealing.", icon: "🏠" },
              { title: "Check Valve Replacement", desc: "Prevent water backflow with high-quality check valve installation and silence noisy pipes.", icon: "🔇" }
            ].map((service, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedServices />

      <main className="max-w-7xl mx-auto py-24 px-6">

        {/* State Grid */}
        <section id="states" className="mb-32 scroll-mt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Find Sump Pump Installation Near Me by State</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Select your state to find trusted local plumbing contractors. Each location has verified installers offering sump pump repair, replacement, and waterproofing services near you.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {uniqueStates.map((state) => (
              <Link
                key={state.state_id}
                href={`/${state.state_id.toLowerCase()}`}
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

        {/* NEW: Common Sump Pump Problems Section - LSI Keywords */}
        <section className="mb-32 bg-white rounded-3xl p-8 md:p-12 border border-slate-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Common Sump Pump Problems We Fix</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">When you search for pump repair near me, these are the most common issues our local contractors solve daily.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { problem: "Pump Not Running", solution: "Diagnostic of stuck floats, power issues, and motor failure", icon: "🛑" },
              { problem: "Pump Won't Stop", solution: "Adjustment or replacement of faulty float switches", icon: "🔄" },
              { problem: "Strange Noises", solution: "Fixing grinding impellers, vibrating pipes, and bad bearings", icon: "🔊" },
              { problem: "Circuit Breaker Trips", solution: "Electrical troubleshooting and dedicated circuit installation", icon: "⚡" },
              { problem: "Basement Flooding", solution: "Emergency pump replacement and backup system installation", icon: "🌊" },
              { problem: "Clogged Intake", solution: "Cleaning pump pits and installing debris screens", icon: "🧼" },
              { problem: "Frozen Discharge", solution: "Thawing lines and installing freeze-guard discharge protection", icon: "❄️" },
              { problem: "Old Age", solution: "Proactive replacement of pumps over 7-10 years old", icon: "⏳" }
            ].map((item, i) => (
              <div key={i} className="text-center p-4">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-slate-900 mb-1">{item.problem}</h3>
                <p className="text-sm text-slate-600">{item.solution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-32">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-white text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Find Sump Pump Installers Near Me</h2>
              <p className="text-slate-400 mb-12 max-w-2xl mx-auto">Connect with local waterproofing experts in 3 easy steps</p>
              <div className="grid md:grid-cols-3 gap-12">
                <div className="relative">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 rotate-3">1</div>
                  <h3 className="text-xl font-bold mb-4">Select Your Location</h3>
                  <p className="text-slate-400 leading-relaxed">Browse our directory to find sump pump services near you. We cover every zip code in all 50 states.</p>
                </div>
                <div className="relative">
                  <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 -rotate-3">2</div>
                  <h3 className="text-xl font-bold mb-4">Describe Your Issue</h3>
                  <p className="text-slate-400 leading-relaxed">Select from new installation, repair, battery backup, or general basement waterproofing needs.</p>
                </div>
                <div className="relative">
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 rotate-3">3</div>
                  <h3 className="text-xl font-bold mb-4">Get Free Local Quote</h3>
                  <p className="text-slate-400 leading-relaxed">Request a free estimate from verified local contractors. Fast response times for urgent flooding issues.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEW: Why Local Matters Section */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why Search for &quot;Sump Pump Installation Near Me&quot;?</h2>
              <div className="space-y-4 text-slate-600">
                <p>When you search for <strong>sump pump installation near me</strong>, you&apos;re looking for contractors who understand your local water table, soil conditions, and flooding risks.</p>
                <p>Local waterproofing companies offer faster response times—crucial during storms—and know exactly which pump horsepower and type works best for homes in your neighborhood.</p>
                <p>Our network of <strong>sump pump contractors near me</strong> includes only licensed, insured professionals who have been vetted for quality workmanship and reliability.</p>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Licensed & insured local plumbers",
                  "24/7 Emergency response available",
                  "Knowledge of local water tables",
                  "Correct sizing calculations",
                  "No travel fees or long wait times",
                  "Warranty on pumps and labor"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-3xl">
              <h3 className="font-bold text-xl text-slate-900 mb-4">Popular &quot;Near Me&quot; Searches</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "sump pump replacement near me",
                  "sump pump repair near me",
                  "battery backup sump pump near me",
                  "basement waterproofing near me",
                  "french drain installation near me",
                  "sewage pump repair near me",
                  "plumbers with sump pumps near me",
                  "Zoeller sump pump installers",
                  "water powered sump pump",
                  "crawl space sump pump",
                  "emergency sump pump service"
                ].map((term, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white text-slate-600 text-sm rounded-full border border-slate-200">{term}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Enhanced with Near Me Keywords */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How do I find sump pump installation near me?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Simply select your state from our directory, then choose your city. You'll find verified local plumbers and waterproofing experts with ratings, services offered, and contact information. Request a free quote online or call directly."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much does sump pump installation near me cost?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sump pump installation costs vary by pump type and basement condition. A standard replacement averages $400-$600. New installations with pit excavation can range from $2,500-$4,000. Battery backups add $600-$1,200."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need a battery backup sump pump?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we highly recommend it. Storms that cause flooding often cause power outages too. A battery backup system ensures your basement stays dry even when the electricity goes out."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long do sump pumps last?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most primary sump pumps last 7-10 years. If your pump is older than that, runs constantly, or makes strange noises, we recommend proactive replacement before it fails during a storm."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can you fix a sump pump that runs constantly?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. A constantly running pump often indicates a stuck float switch, a check valve failure, or a pump that is too small for the water volume. Our local pros can diagnose and fix this quickly."
                  }
                }
              ]
            })
          }}
        />
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">Frequently Asked Questions About Sump Pumps</h2>
          <p className="text-slate-600 text-center mb-10">Common questions from homeowners searching for waterproofing and pump services.</p>
          <div className="space-y-4">
            <details className="group bg-white p-6 rounded-2xl border border-slate-200 open:border-blue-200 open:ring-1 open:ring-blue-200 transition-all">
              <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-slate-800">
                <span>How do I find sump pump installation near me?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed group-open:animate-fadeIn">
                Simply select your state from our directory, then choose your city. You&apos;ll find verified local plumbers and waterproofing experts with ratings, services offered, and contact information. Request a free quote online or call directly.
              </p>
            </details>
            <details className="group bg-white p-6 rounded-2xl border border-slate-200 open:border-blue-200 open:ring-1 open:ring-blue-200 transition-all">
              <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-slate-800">
                <span>How much does sump pump installation cost?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed group-open:animate-fadeIn">
                Sump pump installation costs vary by pump type and basement condition. A standard replacement averages $400-$600. New installations with pit excavation can range from $2,500-$4,000. Battery backups add $600-$1,200.
              </p>
            </details>
            <details className="group bg-white p-6 rounded-2xl border border-slate-200 open:border-blue-200 open:ring-1 open:ring-blue-200 transition-all">
              <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-slate-800">
                <span>Do I really need a battery backup system?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed group-open:animate-fadeIn">
                Yes, we highly recommend it. Storms that cause flooding often cause power outages too. A battery backup system ensures your basement stays dry even when the electricity goes out. It&apos;s cheap insurance against a flooded basement.
              </p>
            </details>
            <details className="group bg-white p-6 rounded-2xl border border-slate-200 open:border-blue-200 open:ring-1 open:ring-blue-200 transition-all">
              <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-slate-800">
                <span>How long do sump pumps last?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed group-open:animate-fadeIn">
                Most primary sump pumps last 7-10 years. If your pump is older than that, runs constantly, or makes strange noises, we recommend proactive replacement before it fails during a storm.
              </p>
            </details>
          </div>
        </section>

      </main>

      <TrustBadges />
      <Footer />
    </div>
  )
}
