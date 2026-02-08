// SEO Settings Interface
export interface SEOSettings {
    gtm_container_id?: string
    h1_template_home?: string
    h1_template_state?: string
    h1_template_city?: string
    h1_template_service?: string
    meta_title_home?: string
    meta_description_home?: string
    meta_title_state?: string
    meta_description_state?: string
    meta_title_city?: string
    meta_description_city?: string
    meta_title_service?: string
    meta_description_service?: string
    og_image_url?: string
    favicon_url?: string
    sitemap_enabled?: boolean
    sitemap_update_frequency?: string
    state_overrides?: Record<string, { meta_title?: string; meta_description?: string }>
}

// Expert/Author Settings Interface
export interface ExpertSettings {
    name?: string
    title?: string
    bio?: string
    photo_url?: string
    license_number?: string
    years_experience?: number
    certifications?: string[]
}

// Trust Signals Interface
export interface TrustSignals {
    years_in_business?: number
    average_rating?: number
    total_reviews?: number
    projects_completed?: number
    warranty_details?: string
    certifications?: string[]
    service_guarantee?: string
}

export interface SiteConfig {
    domain: string;
    nicheSlug: string;
    siteName: string;
    contactPhone: string;
    contactEmail: string;
    gscId?: string;
    ga4Id?: string;
    clarityId?: string;
    openRouterKey?: string;
    // Business Address
    businessAddress?: string;
    businessCity?: string;
    businessState?: string;
    businessZip?: string;
    // Social Media
    facebookUrl?: string;
    instagramUrl?: string;
    twitterUrl?: string;
    linkedinUrl?: string;
    // Branding
    footerTagline?: string;
    logoUrl?: string;
    // AI Settings
    aiSettings?: {
        model: string;
        promptTemplate: string;
    };
    // SEO Settings
    seoSettings?: SEOSettings;
    // Expert/Author Settings
    expertSettings?: ExpertSettings;
    // Trust Signals
    trustSignals?: TrustSignals;
    // Homepage Content
    homepageContent?: string;
}
