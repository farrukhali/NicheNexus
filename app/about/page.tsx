import Link from 'next/link'
import Footer from '@/components/Footer'
import { NavbarCallBtn } from '@/components/CallBtn'

export const metadata = {
    title: 'About GutterPro | America\'s Trusted Gutter Experts',
    description: 'Learn about GutterPro, our mission to protect homes across the USA, and our network of certified gutter installation professionals.',
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">
                        GutterPro
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href="/" className="hidden md:block text-sm font-medium text-slate-600 hover:text-blue-600">
                            Back to Home
                        </Link>
                        <NavbarCallBtn />
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8">About GutterPro</h1>

                    <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                        <p>
                            At GutterPro, we believe that every home deserves proper protection from water damage. What started as a small local operation has grown into a nationwide network of top-rated gutter installation and repair professionals.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 pt-4">Our Mission</h2>
                        <p>
                            Our mission is simple: <strong>To connect homeowners with the most reliable, skilled, and affordable gutter experts in their local area.</strong> We take the hassle out of finding a contractor by vetting our partners for quality, insurance, and customer satisfaction.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 pt-4">Why Choose Us?</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Nationwide Coverage:</strong> We serve over 31,000 cities across all 50 states.</li>
                            <li><strong>Vetted Pros:</strong> We only work with licensed and insured installers.</li>
                            <li><strong>Seamless Technology:</strong> We prioritize seamless gutter systems for longevity and aesthetics.</li>
                            <li><strong>Customer First:</strong> Our lifetime warranty options and 5-star support set us apart.</li>
                        </ul>

                        <p className="pt-4">
                            Whether you need a full replacement, a simple repair, or advanced gutter guards, GutterPro has the expertise to get the job done right, the first time.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
