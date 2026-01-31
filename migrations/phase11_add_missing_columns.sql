-- Phase 11: Add missing columns for Multi-Site Management
-- These columns are required for the "Global Site Settings" form to save correctly.

ALTER TABLE site_configs
ADD COLUMN IF NOT EXISTS business_address TEXT,
ADD COLUMN IF NOT EXISTS business_city TEXT,
ADD COLUMN IF NOT EXISTS business_state TEXT,
ADD COLUMN IF NOT EXISTS business_zip TEXT,
ADD COLUMN IF NOT EXISTS facebook_url TEXT,
ADD COLUMN IF NOT EXISTS instagram_url TEXT,
ADD COLUMN IF NOT EXISTS twitter_url TEXT,
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS footer_tagline TEXT,
ADD COLUMN IF NOT EXISTS logo_url TEXT,
ADD COLUMN IF NOT EXISTS open_router_key TEXT,
ADD COLUMN IF NOT EXISTS gsc_id TEXT,
ADD COLUMN IF NOT EXISTS ga4_id TEXT,
ADD COLUMN IF NOT EXISTS clarity_id TEXT;
