-- Add a new column to store unique AI-generated intro content
ALTER TABLE "usa city name" 
ADD COLUMN IF NOT EXISTS "seo_intro" text;

-- Optional: Create an index if we plan to query empty intros often
-- CREATE INDEX idx_seo_intro_null ON "usa city name" (seo_intro) WHERE seo_intro IS NULL;
