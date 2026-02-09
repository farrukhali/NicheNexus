'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SiteConfig } from '@/lib/site-config'
import { Menu, X, Phone } from 'lucide-react'

interface NavbarProps {
    siteConfig: SiteConfig
}

export default function Navbar({ siteConfig }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const toggleMenu = () => setIsOpen(!isOpen)

    // Format phone for tel link
    const phoneHref = `tel:${siteConfig.contactPhone?.replace(/\D/g, '')}`

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
            ? 'bg-white shadow-xl py-3 border-b border-slate-100'
            : 'bg-transparent py-5'
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 group relative z-[60]">
                    {siteConfig.logoUrl ? (
                        <div className="p-1 px-3 rounded-xl bg-white/95 backdrop-blur-sm border border-white/20 shadow-lg group-hover:scale-105 transition-transform">
                            <img
                                src={siteConfig.logoUrl}
                                alt={siteConfig.siteName}
                                className="h-8 md:h-10 w-auto object-contain"
                            />
                        </div>
                    ) : (
                        <span className={`text-xl md:text-2xl font-extrabold transition-colors ${scrolled ? 'text-slate-900' : 'text-white'
                            }`}>
                            {siteConfig.siteName}
                        </span>
                    )}
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-10">
                    <div className={`flex gap-8 text-sm font-bold transition-colors ${scrolled ? 'text-slate-600' : 'text-white/90'
                        }`}>
                        <Link href="/" className="hover:text-blue-600 transition-colors uppercase tracking-wider">Locations</Link>
                        <Link href="/about" className="hover:text-blue-600 transition-colors uppercase tracking-wider">About</Link>
                        <Link href="/contact" className="hover:text-blue-600 transition-colors uppercase tracking-wider">Contact</Link>
                    </div>

                    <a
                        href={phoneHref}
                        className="bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5"
                    >
                        <Phone size={18} className="animate-pulse" />
                        <span>{siteConfig.contactPhone}</span>
                    </a>
                </div>

                {/* Mobile Controls */}
                <div className="flex items-center gap-4 md:hidden relative z-[60]">
                    <a
                        href={phoneHref}
                        className="bg-red-600 p-2.5 rounded-full text-white shadow-lg animate-pulse"
                    >
                        <Phone size={20} />
                    </a>
                    <button
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                        className={`p-1 transition-colors ${scrolled || isOpen ? 'text-slate-900' : 'text-white'
                            }`}
                    >
                        {isOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 bg-white z-50 transition-all duration-500 md:hidden flex flex-col ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                    <div className="relative z-10 flex flex-col pt-32 px-10 gap-6">
                        <Link onClick={toggleMenu} href="/" className="text-4xl font-black text-slate-800 border-b border-slate-100 pb-4 flex justify-between items-center group">
                            Locations
                            <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </Link>
                        <Link onClick={toggleMenu} href="/about" className="text-4xl font-black text-slate-800 border-b border-slate-100 pb-4 flex justify-between items-center group">
                            About Us
                            <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </Link>
                        <Link onClick={toggleMenu} href="/contact" className="text-4xl font-black text-slate-800 border-b border-slate-100 pb-4 flex justify-between items-center group">
                            Contact
                            <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </Link>

                        <div className="mt-12 space-y-6">
                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mb-4">Availability</p>
                                <div className="flex items-center gap-3 text-emerald-600 font-bold">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                                    24/7 Response Available
                                </div>
                            </div>

                            <a
                                href={phoneHref}
                                className="flex items-center justify-center gap-4 bg-red-600 text-white w-full py-6 rounded-2xl text-2xl font-black shadow-2xl shadow-red-500/30 active:scale-95 transition-transform"
                            >
                                <Phone size={32} fill="white" />
                                CALL NOW
                            </a>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-auto p-10 bg-slate-900 text-white">
                        <p className="text-slate-400 text-sm mb-2">Licensed & Insured Experts</p>
                        <p className="font-bold text-lg">{siteConfig.siteName}</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}
