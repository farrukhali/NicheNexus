import Link from 'next/link'
import { getSiteConfig } from '@/lib/site-config'

// Format phone number for display (e.g., "+12342342345" -> "+1 (234) 234-2345")
function formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
        return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
    }
    return phone
}

// Format phone number for tel: link (e.g., "+12342342345" -> "tel:+12342342345")
function formatPhoneHref(phone: string): string {
    const cleaned = phone.replace(/\D/g, '')
    return `tel:+${cleaned}`
}

export async function CallBtn({
    className = "",
    variant = "primary",
    label = "Call Now",
    showNumber = false
}: {
    className?: string,
    variant?: "primary" | "secondary" | "outline",
    label?: string,
    showNumber?: boolean
}) {
    const siteConfig = await getSiteConfig()
    const phoneNumber = formatPhoneNumber(siteConfig.contactPhone || "+1 (555) 123-4567")
    const phoneHref = formatPhoneHref(siteConfig.contactPhone || "+15551234567")

    const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-300 transform active:scale-95"

    const variants = {
        primary: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/30 rounded-full",
        secondary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 rounded-xl",
        outline: "border-2 border-white/20 hover:bg-white/10 text-white rounded-xl backdrop-blur-sm"
    }

    return (
        <a
            href={phoneHref}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            <span className="mr-2 text-xl">📞</span>
            <span>{label} {showNumber && <span className="ml-1 font-mono tracking-tighter opacity-90 block sm:inline"> | {phoneNumber}</span>}</span>
        </a>
    )
}

export async function FloatingCallBtn() {
    const siteConfig = await getSiteConfig()
    const phoneHref = formatPhoneHref(siteConfig.contactPhone || "+15551234567")

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-slow">
            <a
                href={phoneHref}
                className="flex items-center gap-3 bg-red-600 text-white px-6 py-4 rounded-full shadow-2xl border-4 border-white/20 font-bold text-lg"
            >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                    📞
                </div>
                Call Now for Estimate
            </a>
        </div>
    )
}

export async function NavbarCallBtn() {
    const siteConfig = await getSiteConfig()
    const phoneNumber = formatPhoneNumber(siteConfig.contactPhone || "+1 (555) 123-4567")
    const phoneHref = formatPhoneHref(siteConfig.contactPhone || "+15551234567")

    return (
        <a
            href={phoneHref}
            className="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5"
        >
            <span className="animate-pulse">📞</span>
            <span>{phoneNumber}</span>
        </a>
    )
}
