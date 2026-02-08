export interface AIContentRequest {
    niche: string;
    city: string;
    state: string;
    type: 'meta_title' | 'meta_description' | 'intro' | 'service_desc' | 'seo_template' | 'seo_desc_template';
    stateCode?: string;
    apiKey?: string;
}

export async function generateAIContent(req: AIContentRequest) {
    let apiKey = req.apiKey;

    // If no API key provided, try to fetch from server config (server-side only)
    if (!apiKey) {
        try {
            const { getSiteConfig } = await import('./site-config');
            const siteConfig = await getSiteConfig();
            apiKey = siteConfig.openRouterKey;
        } catch (e) {
            // Probably on client side without key provided
        }
    }

    if (!apiKey) {
        console.warn("OpenRouter API Key not found. Falling back to templates.");
        return null;
    }

    const prompts = {
        meta_title: `Generate a unique, catchy SEO meta title (max 60 chars) for a ${req.niche} service in ${req.city}, ${req.state}. Make it sound professional and local.`,
        meta_description: `Generate a unique SEO meta description (max 160 chars) for a ${req.niche} service in ${req.city}, ${req.state}. Include a call to action.`,
        intro: `Write a professional 2-3 sentence introduction paragraph for a ${req.niche} company serving ${req.city}, ${req.state}. Focus on reliability and local expertise.`,
        service_desc: `Write a professional 2-3 sentence description of ${req.niche} services in ${req.city}, ${req.state}. Highlight quality materials and experienced crews.`,
        seo_template: `You are a master SEO strategist. Create a high-CTR Meta Title template for ${req.niche} in ${req.state}. 

CRITICAL: VARIETY IS KEY. Do NOT start every title with the same word (like "Top-Rated"). 

STRICT GUIDELINES:
1. Use placeholders: {{service}} and {{state}}.
2. Length: Must be 50-60 Characters.
3. STRUCTURE: For this specific state, choose ONE of these unique structures at random:
   - [Trust First]: Expert {{service}} in the ${req.state} | {{state}} Specialists
   - [Value First]: Affordable {{service}} in the ${req.state} | Professional Pros
   - [Location First]: Best {{service}} in the ${req.state} (Nickname/Vibe) | {{state}} Pros
   - [Action First]: Get Reliable {{service}} in ${req.state} | Local Experts
   - [Authority First]: ${req.state}'s #1 {{service}} Team | Specialized Pros
4. LOCAL NICKNAMES: Research and use ${req.state}'s nickname (e.g. "Peach State", "Lone Star State", "Empire State") or local vibe to make it feel authentic.
5. CLEANLINESS: Return ONLY the text. No quotes. No intro. No labels.

Target State: ${req.state}`,
        seo_desc_template: `Create a high-CTR SEO Meta Description (140-155 characters) for ${req.niche} in ${req.state}. 
        Use placeholders: {{service}}, {{state}}. 
        Mention ${req.state}'s climate or local needs. 
        Include a strong Call to Action. 
        Return ONLY text, no quotes.`
    };

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://usgutters-template.com",
                "X-Title": "pSEO Site Generator"
            },
            body: JSON.stringify({
                model: "openai/gpt-4o-mini",
                messages: [{ role: "user", content: prompts[req.type] }],
                temperature: 0.95,
                max_tokens: 150
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`AI API Error (${response.status}):`, errorText);
            return null;
        }

        const data = await response.json();
        let content = data.choices?.[0]?.message?.content?.trim() || "";

        // Clean up quotes if the AI included them
        content = content.replace(/^["']|["']$/g, "").trim();

        return content;
    } catch (error) {
        console.error("AI Generation Network Error:", error);
        return null;
    }
}
