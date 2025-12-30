import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata = {
    title: 'Privacy Policy | GutterPro',
    description: 'Our commitment to protecting your data. Read our Privacy Policy.',
}

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">
                        GutterPro
                    </Link>
                </div>
            </nav>

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-3xl mx-auto prose prose-slate">
                    <h1>Privacy Policy</h1>
                    <p>Last Updated: December 2025</p>

                    <p>At GutterPro, we recognize that privacy is significant. This Privacy Policy applies to the collection, use, and disclosure of personal information by GutterPro and its affiliates.</p>

                    <h2>1. Information We Collect</h2>
                    <p>We collect information you provide directly to us, such as when you request a quote, fill out a form, or communicate with us. This may include your name, email address, phone number, and property address.</p>

                    <h2>2. How We Use Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul>
                        <li>Provide, maintain, and improve our services.</li>
                        <li>Process your requests for quotes and connect you with local service providers.</li>
                        <li>Send you technical notices, updates, and support messages.</li>
                    </ul>

                    <h2>3. Sharing of Information</h2>
                    <p>We may share your information with our network of trusted third-party service providers (installers) solely for the purpose of fulfilling your service requests.</p>

                    <h2>4. Data Security</h2>
                    <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access.</p>

                    <h2>5. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at support@gutterpro.com.</p>
                </div>
            </main>

            <Footer />
        </div>
    )
}
