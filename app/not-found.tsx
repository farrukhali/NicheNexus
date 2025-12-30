import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
            <div className="text-center p-8">
                <h2 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">404</h2>
                <p className="text-2xl mb-8 text-slate-300">City Not Found</p>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                    We couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
                </p>
                <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
                    Return Home
                </Link>
            </div>
        </div>
    )
}
