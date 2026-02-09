'use client'

import React, { useState, useEffect } from 'react'
import { Phone, ArrowRight } from 'lucide-react'

export default function FloatingMobileCTA({ phone }: { phone: string }) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling a bit (e.g., 400px)
            setIsVisible(window.scrollY > 400)
        }
        window.addEventListener('scroll', handleScroll)
        // Check initial state
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!phone) return null

    const phoneHref = `tel:${phone.replace(/\D/g, '')}`

    return (
        <div className={`fixed bottom-0 left-0 w-full p-4 z-[40] transition-all duration-700 ease-out md:hidden ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
            }`}>
            <a
                href={phoneHref}
                className="relative flex items-center justify-between bg-slate-900 text-white p-1 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 group overflow-hidden"
            >
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>

                <div className="flex items-center gap-3 pl-4 py-3">
                    <div className="relative">
                        <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg group-active:scale-90 transition-transform">
                            <Phone size={24} fill="white" className="animate-pulse" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 animate-ping"></div>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">Available Now</span>
                        <span className="text-lg font-black tracking-tight">{phone}</span>
                    </div>
                </div>

                <div className="bg-red-600 m-1 px-6 py-4 rounded-2xl font-black text-sm flex items-center gap-2 transition-all group-active:bg-red-700 shadow-inner">
                    GET FREE QUOTE
                    <ArrowRight size={16} strokeWidth={3} />
                </div>

                {/* Interactive Shine Effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-40 group-hover:animate-shine"></div>
            </a>
        </div>
    )
}
