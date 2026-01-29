import { getSiteConfig } from './site-config';

export interface AIContentRequest {
    niche: string;
    city: string;
    state: string;
    type: 'meta_title' | 'meta_description' | 'intro' | 'service_desc';
}

export async function generateAIContent(req: AIContentRequest) {
    const siteConfig = await getSiteConfig();
    const apiKey = siteConfig.openRouterKey;

    if (!apiKey) {
        console.warn("OpenRouter API Key not found. Falling back to templates.");
        return null;
    }

    const prompts = {
        meta_title: `Generate a unique, catchy SEO meta title (max 60 chars) for a ${req.niche} service in ${req.city}, ${req.state}. Make it sound professional and local.`,
        meta_description: `Generate a unique SEO meta description (max 160 chars) for a ${req.niche} service in ${req.city}, ${req.state}. Include a call to action.`,
        intro: `Write a professional 2-3 sentence introduction paragraph for a ${req.niche} company serving ${req.city}, ${req.state}. Focus on reliability and local expertise.`,
        service_desc: `Write a professional 2-3 sentence description of ${req.niche} services in ${req.city}, ${req.state}. Highlight quality materials and experienced crews.`
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
                model: "openai/gpt-3.5-turbo", // Cost-effective for pSEO
                messages: [{ role: "user", content: prompts[req.type] }],
                temperature: 0.7,
                max_tokens: 150
            })
        });

        const data = await response.json();
        return data.choices?.[0]?.message?.content?.trim();
    } catch (error) {
        console.error("AI Generation Error:", error);
        return null;
    }
}
