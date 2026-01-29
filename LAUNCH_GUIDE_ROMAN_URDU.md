# 🚀 New Niche Site Launch Karne Ka Tareeka

Is guide mein bataya gaya hai ke aap is generic pSEO template ko istemal kar ke kaise chand minutes mein naya niche site (maslan HVAC, Plumbing, Solar) launch kar sakte hain.

---

## Step 1: Niche Configuration Add Karein
`lib/niche-configs.ts` file kholein aur `NICHE_CONFIGS` object mein apna naya niche add karein.

```typescript
"plumbing": {
    name: "Plumbing",
    slug: "plumbing",
    primaryService: "Plumbing Repair",
    keywords: ["emergency plumber", "drain cleaning", "water heater repair"],
    services: [
        { title: "Drain Cleaning", slug: "drain-cleaning", description: "Professional drain clearing.", icon: "🪠" },
        // ... mazeed services yahan add karein
    ],
    faqs: [
        { question: "Kya aap emergency service dete hain?", answer: "Ji haan, hum 24/7 available hain." }
    ]
}
```

## Step 2: Environment Variables Configure Karein
Apni `.env` file (ya deployment platform ki settings) mein naye site ki details update karein.

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

## Step 3: AI Content Generation (Optional)
Agar aap AI ke zariye shehar (city) level ka unique content banana chahte hain:
1. Check karein ke `.env` mein `OPENROUTER_API_KEY` mojood hai.
2. Ye script run karein:
   ```bash
   node scripts/generate-city-content.js
   ```
   *Ye script aapke `NICHE_SLUG` ko dekh kar khud-ba-khud naye niche ke mutabiq content generate karega.*

## Step 4: Verify aur Deploy Karein
1. **Local Check**: `npm run dev` chala kar check karein ke naya niche sahi nazar aa raha hai.
2. **Deploy**: Apne hosting provider (Vercel, Netlify, Coolify) par push karein.
3. **Sitemap**: `https://yourdomain.com/sitemap.xml` khol kar check karein ke naye service URLs ban gaye hain.

---

## 🛠 Troubleshooting (Maslay Masail)
- **Logo**: `public/logo.png` ko naye logo se badal dein.
- **Favicon**: `app/favicon.ico` update karein.
- **Database**: Check karein ke Supabase mein `usa city name` table mojood hai aur usme data hai.
