-- Phase 10: Critical SEO Features - Database Migrations
-- Add new JSONB columns to site_configs table for enhanced SEO control

-- 1. Add SEO Settings column
ALTER TABLE site_configs 
ADD COLUMN IF NOT EXISTS seo_settings JSONB DEFAULT '{
  "ga4_measurement_id": "",
  "gtm_container_id": "",
  "search_console_verification": "",
  "h1_template_home": "Find {{service}} Near Me",
  "h1_template_state": "{{service}} in {{state}} | Local Experts",
  "h1_template_city": "{{service}} in {{city}}, {{state}} | Same-Day Service",
  "meta_title_template": "{{service}} in {{city}}, {{state}} | {{brand}}",
  "meta_description_template": "Professional {{service}} in {{city}}, {{state}}. Licensed, insured local experts. Get a free quote today!",
  "og_image_url": "",
  "favicon_url": "",
  "sitemap_enabled": true,
  "sitemap_update_frequency": "daily"
}'::jsonb;

-- 2. Add Expert/Author Settings column
ALTER TABLE site_configs 
ADD COLUMN IF NOT EXISTS expert_settings JSONB DEFAULT '{
  "name": "",
  "title": "",
  "bio": "",
  "photo_url": "",
  "license_number": "",
  "years_experience": 15,
  "certifications": []
}'::jsonb;

-- 3. Add Trust Signals column
ALTER TABLE site_configs 
ADD COLUMN IF NOT EXISTS trust_signals JSONB DEFAULT '{
  "years_in_business": 15,
  "average_rating": 4.8,
  "total_reviews": 1247,
  "projects_completed": 5000,
  "warranty_details": "10-Year Warranty on All Installations",
  "certifications": [],
  "service_guarantee": "100% Satisfaction Guaranteed or Your Money Back"
}'::jsonb;

-- Verify columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'site_configs' 
AND column_name IN ('seo_settings', 'expert_settings', 'trust_signals');
