'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { LayoutDashboard, Settings, Globe, Phone, Mail, Plus, Save, Trash2, ShieldCheck, LogOut, Wand2, Loader2 } from 'lucide-react'
import { generateNicheWithAI } from '@/lib/ai-niche-generator'

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('site')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    // Site Config State
    const [siteConfig, setSiteConfig] = useState({
        site_name: '',
        domain: '',
        contact_phone: '',
        contact_email: '',
        niche_slug: '',
        gsc_id: '',
        ga4_id: '',
        clarity_id: '',
        open_router_key: '',
        // Business Address
        business_address: '',
        business_city: '',
        business_state: '',
        business_zip: '',
        // Social Media
        facebook_url: '',
        instagram_url: '',
        twitter_url: '',
        linkedin_url: '',
        // Branding
        footer_tagline: '',
        logo_url: ''
    })

    // Niche Config State
    const [niches, setNiches] = useState<any[]>([])
    const [selectedNiche, setSelectedNiche] = useState<any>(null)

    useEffect(() => {
        if (isLoggedIn) {
            fetchData()
        }
    }, [isLoggedIn])

    async function fetchData() {
        setLoading(true)
        const { data: sites } = await supabase.from('site_configs').select('*').limit(1).single()
        if (sites) setSiteConfig(sites)

        const { data: nichesData } = await supabase.from('niche_configs').select('*')
        if (nichesData) {
            setNiches(nichesData)
            if (nichesData.length > 0) setSelectedNiche(nichesData[0])
        }
        setLoading(false)
    }

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        // Simple client-side auth for demo/template purposes
        // In production, use Supabase Auth
        if (password === 'niche2026!') {
            setIsLoggedIn(true)
        } else {
            alert('Wrong password')
        }
    }

    const handleSaveSite = async () => {
        setLoading(true)
        const { error } = await supabase
            .from('site_configs')
            .upsert({
                ...siteConfig,
                domain: siteConfig.domain || 'localhost',
                niche_slug: siteConfig.niche_slug || null
            })

        if (error) {
            setMessage({ type: 'error', text: error.message })
        } else {
            setMessage({ type: 'success', text: 'Site settings saved!' })
        }
        setLoading(false)
        setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    }

    const handleSaveNiche = async () => {
        if (!selectedNiche) return
        setLoading(true)

        // Ensure slug is lowercase and dash-formatted
        const normalizedSlug = selectedNiche.slug.toLowerCase().trim().replace(/\s+/g, '-')
        const updatedNiche = {
            ...selectedNiche,
            slug: normalizedSlug,
            keywords: selectedNiche.keywords
        }

        const { error } = await supabase
            .from('niche_configs')
            .upsert(updatedNiche)

        if (error) {
            setMessage({ type: 'error', text: error.message })
        } else {
            setMessage({ type: 'success', text: 'Niche configuration saved!' })
            fetchData()
        }
        setLoading(false)
        setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    }

    const handleAddService = () => {
        const updatedServices = [...(selectedNiche.services || []), { title: 'New Service', slug: 'new-service', description: '', icon: '🔧' }]
        setSelectedNiche({ ...selectedNiche, services: updatedServices })
    }

    const handleAddNiche = () => {
        const newNiche = {
            name: 'New Niche',
            slug: 'new-niche',
            primary_service: 'Service Name',
            keywords: [],
            services: [],
            faqs: []
        }
        setNiches([...niches, newNiche])
        setSelectedNiche(newNiche)
    }

    const handleAddFAQ = () => {
        const updatedFaqs = [...(selectedNiche.faqs || []), { question: 'New Question', answer: '' }]
        setSelectedNiche({ ...selectedNiche, faqs: updatedFaqs })
    }

    const handleAIGenerate = async () => {
        if (!selectedNiche?.name) {
            alert('Please enter a niche name first (e.g., "Plumbing")')
            return
        }
        if (!siteConfig.open_router_key) {
            alert('Please add your OpenRouter API Key in Site Settings first.')
            setActiveTab('site')
            return
        }

        setLoading(true)
        setMessage({ type: 'info', text: 'AI is researching niche services and FAQs...' })

        const aiConfig = await generateNicheWithAI(selectedNiche.name, siteConfig.open_router_key)

        if (aiConfig) {
            setSelectedNiche({
                ...selectedNiche,
                primary_service: aiConfig.primary_service,
                keywords: aiConfig.keywords,
                services: aiConfig.services,
                faqs: aiConfig.faqs
            })
            setMessage({ type: 'success', text: 'AI Niche Configuration Generated!' })
        } else {
            setMessage({ type: 'error', text: 'AI Generation failed. Check your API Key.' })
        }

        setLoading(false)
        setTimeout(() => setMessage({ type: '', text: '' }), 4000)
    }

    const handleDeleteNiche = async () => {
        if (!selectedNiche || !confirm(`Are you sure you want to delete the ${selectedNiche.name} niche?`)) return
        setLoading(true)
        const { error } = await supabase
            .from('niche_configs')
            .delete()
            .eq('slug', selectedNiche.slug)

        if (error) {
            setMessage({ type: 'error', text: error.message })
        } else {
            setMessage({ type: 'success', text: 'Niche deleted successfully.' })
            fetchData()
        }
        setLoading(false)
        setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    }

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <ShieldCheck className="text-white w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
                        <p className="text-slate-500">Enter your password to manage your sites.</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Enter Admin Password"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all">
                            Login to Dashboard
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-blue-400">
                        <LayoutDashboard size={24} /> NicheAdmin
                    </h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('site')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'site' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                    >
                        <Settings size={20} /> Site Settings
                    </button>
                    <button
                        onClick={() => setActiveTab('niches')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'niches' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                    >
                        <Globe size={20} /> Niche Manager
                    </button>
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            {activeTab === 'site' ? 'Global Site Settings' : 'Niche Configuration'}
                        </h1>
                        <p className="text-slate-500">Manage how your niche sites look and behave.</p>
                    </div>
                    {message.text && (
                        <div className={`px-6 py-3 rounded-xl font-medium animate-bounce ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}
                </header>

                {activeTab === 'site' && (
                    <>
                        <div className="grid lg:grid-cols-2 gap-8">
                            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Globe className="text-blue-500" /> Core Identity
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Site Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            value={siteConfig.site_name}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, site_name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Target Domain</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            value={siteConfig.domain}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, domain: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Active Niche Slug</label>
                                        <select
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            value={siteConfig.niche_slug}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, niche_slug: e.target.value })}
                                        >
                                            <option value="">Select a Niche</option>
                                            {niches.map(n => <option key={n.slug} value={n.slug}>{n.name}</option>)}
                                        </select>
                                        <p className="mt-1 text-[10px] text-slate-500 italic">Important: Select your niche here and click "Save Site Settings" to activate it on the website.</p>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Phone className="text-blue-500" /> Contact & Analytics
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Contact Phone</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            value={siteConfig.contact_phone}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, contact_phone: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            value={siteConfig.contact_email}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, contact_email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">GSC ID</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            value={siteConfig.gsc_id}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, gsc_id: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">GA4 ID</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            value={siteConfig.ga4_id}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, ga4_id: e.target.value })}
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">OpenRouter API Key (for AI Niche Generation)</label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                                            placeholder="sk-or-v1-..."
                                            value={siteConfig.open_router_key}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, open_router_key: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={handleSaveSite}
                                    disabled={loading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                                >
                                    <Save size={20} /> {loading ? 'Saving...' : 'Save Site Settings'}
                                </button>
                            </section>
                        </div>

                        {/* Row 2: Business Address & Social Media */}
                        <div className="grid lg:grid-cols-2 gap-8 mt-8">
                            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    🏢 Business Address (for Schema)
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Street Address</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="123 Main Street"
                                            value={siteConfig.business_address}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, business_address: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="San Diego"
                                            value={siteConfig.business_city}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, business_city: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="CA"
                                            value={siteConfig.business_state}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, business_state: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">ZIP Code</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="92101"
                                            value={siteConfig.business_zip}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, business_zip: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    📱 Social Media Links
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Facebook URL</label>
                                        <input
                                            type="url"
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="https://facebook.com/yourpage"
                                            value={siteConfig.facebook_url}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, facebook_url: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Instagram URL</label>
                                        <input
                                            type="url"
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="https://instagram.com/yourpage"
                                            value={siteConfig.instagram_url}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, instagram_url: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Twitter/X URL</label>
                                        <input
                                            type="url"
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="https://twitter.com/yourpage"
                                            value={siteConfig.twitter_url}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, twitter_url: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn URL</label>
                                        <input
                                            type="url"
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="https://linkedin.com/company/yourpage"
                                            value={siteConfig.linkedin_url}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, linkedin_url: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Row 3: Branding & Save */}
                        <div className="grid lg:grid-cols-1 gap-8 mt-8">
                            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    🎨 Branding
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Logo URL</label>
                                        <input
                                            type="url"
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="https://example.com/logo.png"
                                            value={siteConfig.logo_url}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, logo_url: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Footer Tagline</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Your trusted local experts since 2010"
                                            value={siteConfig.footer_tagline}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, footer_tagline: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={handleSaveSite}
                                    disabled={loading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                                >
                                    <Save size={20} /> {loading ? 'Saving...' : 'Save All Site Settings'}
                                </button>
                            </section>
                        </div>
                    </>
                )}

                {activeTab === 'niches' && (
                    <div className="space-y-8">
                        <div className="flex gap-4 overflow-x-auto pb-4">
                            {niches.map(n => (
                                <button
                                    key={n.slug}
                                    onClick={() => setSelectedNiche(n)}
                                    className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${selectedNiche?.slug === n.slug ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400'}`}
                                >
                                    {n.name}
                                </button>
                            ))}
                            <button
                                onClick={handleAddNiche}
                                className="px-6 py-2 rounded-full font-medium bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 flex items-center gap-2"
                            >
                                <Plus size={16} /> Add Niche
                            </button>
                        </div>

                        {selectedNiche && (
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-bold">Edit Niche: {selectedNiche.name}</h2>
                                    <div className="flex gap-3">
                                        <button
                                            className="px-6 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-100 transition-all disabled:opacity-50"
                                            onClick={handleAIGenerate}
                                            disabled={loading}
                                        >
                                            {loading ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
                                            Generate with AI
                                        </button>
                                        <button className="px-6 py-3 bg-red-50 text-red-600 rounded-xl font-bold flex items-center gap-2 hover:bg-red-100 transition-all" onClick={handleDeleteNiche}>
                                            <Trash2 size={20} /> Delete Niche
                                        </button>
                                        <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all" onClick={handleSaveNiche}>
                                            <Save size={20} /> Save Niche
                                        </button>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Niche Name</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                                value={selectedNiche.name}
                                                onChange={(e) => setSelectedNiche({ ...selectedNiche, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Niche Slug (URL Identifier)</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                                                value={selectedNiche.slug}
                                                onChange={(e) => setSelectedNiche({ ...selectedNiche, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Primary Service</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                                value={selectedNiche.primary_service}
                                                onChange={(e) => setSelectedNiche({ ...selectedNiche, primary_service: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Keywords (Comma separated)</label>
                                            <textarea
                                                className="w-full h-24 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                                value={selectedNiche.keywords?.join(', ')}
                                                onChange={(e) => setSelectedNiche({ ...selectedNiche, keywords: e.target.value.split(',').map((k: string) => k.trim()) })}
                                            />
                                        </div>
                                        <div className="pt-6 border-t border-slate-100">
                                            <div className="flex justify-between items-center mb-4">
                                                <h4 className="font-bold text-slate-900 border-l-4 border-blue-500 pl-3">FAQs</h4>
                                                <button onClick={handleAddFAQ} className="text-blue-600 hover:text-blue-700 text-sm font-bold flex items-center gap-1">
                                                    <Plus size={16} /> Add FAQ
                                                </button>
                                            </div>
                                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                                                {selectedNiche.faqs?.map((faq: any, index: number) => (
                                                    <div key={index} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Question"
                                                            className="w-full px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-bold"
                                                            value={faq.question}
                                                            onChange={(e) => {
                                                                const newFaqs = [...selectedNiche.faqs]
                                                                newFaqs[index].question = e.target.value
                                                                setSelectedNiche({ ...selectedNiche, faqs: newFaqs })
                                                            }}
                                                        />
                                                        <textarea
                                                            placeholder="Answer"
                                                            className="w-full px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs h-16"
                                                            value={faq.answer}
                                                            onChange={(e) => {
                                                                const newFaqs = [...selectedNiche.faqs]
                                                                newFaqs[index].answer = e.target.value
                                                                setSelectedNiche({ ...selectedNiche, faqs: newFaqs })
                                                            }}
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                const newFaqs = selectedNiche.faqs.filter((_: any, i: number) => i !== index)
                                                                setSelectedNiche({ ...selectedNiche, faqs: newFaqs })
                                                            }}
                                                            className="text-red-500 hover:text-red-700 text-xs font-medium flex items-center gap-1 mt-1"
                                                        >
                                                            <Trash2 size={12} /> Remove FAQ
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-bold text-slate-900 border-l-4 border-blue-500 pl-3">Services</h4>
                                            <button onClick={handleAddService} className="text-blue-600 hover:text-blue-700 text-sm font-bold flex items-center gap-1">
                                                <Plus size={16} /> Add Service
                                            </button>
                                        </div>
                                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
                                            {selectedNiche.services?.map((service: any, index: number) => (
                                                <div key={index} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <input
                                                            type="text"
                                                            placeholder="Service Title"
                                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold"
                                                            value={service.title}
                                                            onChange={(e) => {
                                                                const newServices = [...selectedNiche.services]
                                                                newServices[index].title = e.target.value
                                                                setSelectedNiche({ ...selectedNiche, services: newServices })
                                                            }}
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Icon (e.g. 🪠)"
                                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-center text-lg"
                                                            value={service.icon || ''}
                                                            onChange={(e) => {
                                                                const newServices = [...selectedNiche.services]
                                                                newServices[index].icon = e.target.value
                                                                setSelectedNiche({ ...selectedNiche, services: newServices })
                                                            }}
                                                        />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="Slug (e.g. drain-cleaning)"
                                                        className="w-full px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                                                        value={service.slug}
                                                        onChange={(e) => {
                                                            const newServices = [...selectedNiche.services]
                                                            newServices[index].slug = e.target.value
                                                            setSelectedNiche({ ...selectedNiche, services: newServices })
                                                        }}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Hero Image URL (e.g. Unsplash URL)"
                                                        className="w-full px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                                                        value={service.heroImage || service.hero_image || ''}
                                                        onChange={(e) => {
                                                            const newServices = [...selectedNiche.services]
                                                            newServices[index].heroImage = e.target.value
                                                            setSelectedNiche({ ...selectedNiche, services: newServices })
                                                        }}
                                                    />
                                                    <textarea
                                                        placeholder="Short Description"
                                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs h-16"
                                                        value={service.description}
                                                        onChange={(e) => {
                                                            const newServices = [...selectedNiche.services]
                                                            newServices[index].description = e.target.value
                                                            setSelectedNiche({ ...selectedNiche, services: newServices })
                                                        }}
                                                    />
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <textarea
                                                            placeholder="Process Steps (one per line)"
                                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-[10px] h-24 font-mono"
                                                            value={Array.isArray(service.process) ? service.process.join('\n') : ''}
                                                            onChange={(e) => {
                                                                const newServices = [...selectedNiche.services]
                                                                newServices[index].process = e.target.value.split('\n').filter(Boolean)
                                                                setSelectedNiche({ ...selectedNiche, services: newServices })
                                                            }}
                                                        />
                                                        <textarea
                                                            placeholder="Materials (JSON: [{name, desc}])"
                                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-[10px] h-24 font-mono"
                                                            value={JSON.stringify(service.materials || [], null, 2)}
                                                            onChange={(e) => {
                                                                try {
                                                                    const newServices = [...selectedNiche.services]
                                                                    newServices[index].materials = JSON.parse(e.target.value)
                                                                    setSelectedNiche({ ...selectedNiche, services: newServices })
                                                                } catch (err) { }
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <button
                                                            onClick={() => {
                                                                const newServices = selectedNiche.services.filter((_: any, i: number) => i !== index)
                                                                setSelectedNiche({ ...selectedNiche, services: newServices })
                                                            }}
                                                            className="text-red-500 hover:text-red-700 text-xs font-medium flex items-center gap-1"
                                                        >
                                                            <Trash2 size={12} /> Remove Service
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    )
}
