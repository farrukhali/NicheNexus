import { supabase } from './supabase'

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
}

export const getSiteConfig = async (): Promise<SiteConfig> => {
    // Try fetching from Supabase first
    try {
        const { data, error } = await supabase
            .from('site_configs')
            .select('*')
            .limit(1)
            .single()

        if (data && !error) {
            return {
                domain: data.domain,
                nicheSlug: data.niche_slug,
                siteName: data.site_name,
                contactPhone: data.contact_phone,
                contactEmail: data.contact_email,
                gscId: data.gsc_id,
                ga4Id: data.ga4_id,
                clarityId: data.clarity_id,
                openRouterKey: data.open_router_key,
                // Business Address
                businessAddress: data.business_address,
                businessCity: data.business_city,
                businessState: data.business_state,
                businessZip: data.business_zip,
                // Social Media
                facebookUrl: data.facebook_url,
                instagramUrl: data.instagram_url,
                twitterUrl: data.twitter_url,
                linkedinUrl: data.linkedin_url,
                // Branding
                footerTagline: data.footer_tagline,
                logoUrl: data.logo_url,
            }
        }
    } catch (e) {
        console.warn('DB Config Fetch Failed, falling back to ENV', e)
    }

    // Fallback to Environment Variables
    return {
        domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || "localhost",
        nicheSlug: (process.env.NEXT_PUBLIC_NICHE_SLUG || "gutter").toLowerCase(),
        siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Professional Services",
        contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "(555) 000-0000",
        contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@example.com",
        gscId: process.env.NEXT_PUBLIC_GSC_ID,
        ga4Id: process.env.NEXT_PUBLIC_GA4_ID,
        clarityId: process.env.NEXT_PUBLIC_CLARITY_ID,
        openRouterKey: process.env.OPENROUTER_API_KEY,
    };
};
