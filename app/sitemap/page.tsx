import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const revalidate = 86400 // Daily revalidation

export const metadata: Metadata = {
    title: 'Site Directory | Pipey Pro',
    description: 'Browse our complete directory of Sump Pump Installation and Repair services by state and city.',
    robots: {
        index: true,
        follow: true
    }
}

export default async function SitemapPage() {
    // efficient fetch of distinct states
    const { data: cities } = await supabase
        .from('usa city name')
        .select('state_id, state_name')

    // Deduplicate states
    const uniqueStates = Array.from(new Map(cities?.map(item => [item.state_id, item])).values())
        .sort((a, b) => a.state_name.localeCompare(b.state_name))

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <nav className="bg-white border-b border-slate-200 py-4 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">
                        Pipey Pro
                    </Link>
                    <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600">
                        Back to Home
                    </Link>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-16 px-6">
                <header className="mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Site Directory</h1>
                    <p className="text-lg text-slate-600 max-w-2xl">
                        Find local sump pump repair and installation experts in your area. Browse by state below.
                    </p>
                </header>

                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
                        Service Areas by State
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-4 gap-x-6">
                        {uniqueStates.map((state) => (
                            <Link
                                key={state.state_id}
                                href={`/${state.state_id.toLowerCase()}`}
                                className="group flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors"
                            >
                                <span className="font-medium text-slate-700 group-hover:text-blue-600">
                                    {state.state_name}
                                </span>
                                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full group-hover:bg-blue-50 group-hover:text-blue-500">
                                    {state.state_id}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="mt-12 bg-blue-50 rounded-2xl p-8 border border-blue-100">
                    <h2 className="text-xl font-bold text-blue-900 mb-4">Main Pages</h2>
                    <ul className="flex flex-wrap gap-6 text-blue-800 font-medium">
                        <li><Link href="/" className="hover:underline">Home</Link></li>
                        <li><Link href="/about" className="hover:underline">About Us</Link></li>
                        <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                        <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                    </ul>
                </section>
            </main>

            <Footer />
        </div>
    )
}
