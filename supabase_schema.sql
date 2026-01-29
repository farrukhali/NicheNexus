-- Create niche_configs table
CREATE TABLE IF NOT EXISTS niche_configs (
    slug TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    primary_service TEXT NOT NULL,
    keywords TEXT[] DEFAULT '{}',
    services JSONB DEFAULT '[]',
    faqs JSONB DEFAULT '[]',
    description TEXT,
    hero_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create site_configs table
CREATE TABLE IF NOT EXISTS site_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain TEXT UNIQUE NOT NULL,
    site_name TEXT NOT NULL,
    niche_slug TEXT REFERENCES niche_configs(slug),
    contact_phone TEXT,
    contact_email TEXT,
    gsc_id TEXT,
    ga4_id TEXT,
    clarity_id TEXT,
    open_router_key TEXT,
    -- Business Address Fields
    business_address TEXT,
    business_city TEXT,
    business_state TEXT,
    business_zip TEXT,
    -- Social Media Links
    facebook_url TEXT,
    instagram_url TEXT,
    twitter_url TEXT,
    linkedin_url TEXT,
    -- Branding
    footer_tagline TEXT,
    logo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE niche_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_configs ENABLE ROW LEVEL SECURITY;

-- Create policies (Public Read, Admin Write)
-- Note: You'll need to adjust these based on your specific auth setup
CREATE POLICY "Allow public read niche_configs" ON niche_configs FOR SELECT USING (true);
CREATE POLICY "Allow public read site_configs" ON site_configs FOR SELECT USING (true);

-- Migration: Add new columns if they don't exist (for existing databases)
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS business_address TEXT;
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS business_city TEXT;
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS business_state TEXT;
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS business_zip TEXT;
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS facebook_url TEXT;
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS instagram_url TEXT;
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS twitter_url TEXT;
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS footer_tagline TEXT;
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE niche_configs ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE niche_configs ADD COLUMN IF NOT EXISTS hero_image TEXT;

-- Insert initial data (Gutter Niche)
INSERT INTO niche_configs (slug, name, primary_service, keywords, services, faqs)
VALUES (
    'gutter',
    'Gutter Installation',
    'Gutter Installation',
    '{"gutter repair", "seamless gutters", "gutter guards"}',
    '[
        {"title": "Seamless Gutter Installation", "slug": "seamless-gutter-installation", "description": "Custom-fit seamless aluminum gutters.", "icon": "🔧"},
        {"title": "Gutter Guards", "slug": "gutter-guards-leaf-protection", "description": "Micro-mesh leaf protection systems.", "icon": "🛡️"}
    ]',
    '[
        {"question": "How long do gutters last?", "answer": "Aluminum gutters last 20-30 years."}
    ]'
) ON CONFLICT (slug) DO NOTHING;

-- Insert initial site config
INSERT INTO site_configs (domain, site_name, niche_slug, contact_phone, contact_email)
VALUES (
    'usgutterinstallation.com',
    'US Gutter Installation',
    'gutter',
    '+18588985338',
    'support@usgutterinstallation.com'
) ON CONFLICT (domain) DO NOTHING;
