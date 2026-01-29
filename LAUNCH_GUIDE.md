# 🚀 How to Launch a New Niche Site

This guide explains how to use this generic pSEO template to launch a new niche site (e.g., HVAC, Plumbing, Solar) in minutes.

---

## Step 1: Add Niche Configuration
Open `lib/niche-configs.ts` and add your new niche to the `NICHE_CONFIGS` object.

```typescript
"plumbing": {
    name: "Plumbing",
    slug: "plumbing",
    primaryService: "Plumbing Repair",
    keywords: ["emergency plumber", "drain cleaning", "water heater repair"],
    services: [
        { title: "Drain Cleaning", slug: "drain-cleaning", description: "Professional drain clearing.", icon: "🪠" },
        // ... more services
    ],
    faqs: [
        { question: "Do you offer emergency service?", answer: "Yes, we are available 24/7." }
    ]
}
```

## Step 2: Configure Environment Variables
Update your `.env` file (or your deployment platform's env settings) for the new site.

```bash
# Core Site Branding
NEXT_PUBLIC_NICHE_SLUG="plumbing"
NEXT_PUBLIC_SITE_NAME="America's Plumbing Pros"
NEXT_PUBLIC_SITE_DOMAIN="americaplumbingpros.com"
NEXT_PUBLIC_CONTACT_PHONE="(800) 123-4567"
NEXT_PUBLIC_CONTACT_EMAIL="support@americaplumbingpros.com"

# SEO & Tracking (Optional)
NEXT_PUBLIC_GSC_ID="your-gsc-id"
NEXT_PUBLIC_GA4_ID="your-ga4-id"
```

## Step 3: Run AI Content Generation (Optional)
If you want to pre-generate unique city-level content using AI:
1. Ensure `OPENROUTER_API_KEY` is set in your environment.
2. Run the generation script:
   ```bash
   node scripts/generate-city-content.js
   ```
   *This will use the `NICHE_SLUG` from your env to tailor all content to your new niche.*

## Step 4: Verify and Deploy
1. **Local Check**: Run `npm run dev` and navigate to a state/city page to ensure everything looks correct for the new niche.
2. **Deploy**: Push to your hosting provider (Vercel, Netlify, Coolify).
3. **Sitemap**: Check `https://yourdomain.com/sitemap.xml` to ensure it's generating the new service URLs.

---

## 🛠 Troubleshooting
- **Logo**: Replace `public/logo.png` with the logo for your new site.
- **Favicon**: Update `app/favicon.ico`.
- **Database**: Ensure your Supabase instance has the `usa city name` table populated (this template uses it for geographic routing).
