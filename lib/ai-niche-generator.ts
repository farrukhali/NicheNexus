export interface AINicheConfig {
    primary_service: string;
    keywords: string[];
    services: {
        title: string;
        slug: string;
        description: string;
        icon: string;
        hero_image?: string;
        process?: string[];
        materials?: { name: string; description: string }[];
        faqs?: { question: string; answer: string }[];
    }[];
    faqs: {
        question: string;
        answer: string;
    }[];
}

export async function generateNicheWithAI(nicheName: string, apiKey: string): Promise<AINicheConfig | null> {
    if (!apiKey) return null;

    const prompt = `Act as an expert SEO and local lead generation specialist. 
    Create a comprehensive website configuration for the niche: "${nicheName}".
    
    CRITICAL: To ensure content uniqueness across thousands of city pages, use dynamic placeholders inside descriptions, processes, materials, and FAQs.
    Available placeholders:
    {{city}} - Will be replaced by the city name (e.g. Clifton)
    {{state}} - Will be replaced by the full state name (e.g. New Jersey)
    {{stateCode}} - Will be replaced by the 2-letter state code (e.g. NJ)
    {{service}} - Will be replaced by the specific service name
    
    Example usage in an answer: "Our team provides the best {{service}} in {{city}}, {{stateCode}} using specialized tools..."
    
    The output must be a valid JSON object with the following structure:
    {
        "primary_service": "Main service name",
        "keywords": ["20 SEO keywords"],
        "services": [
            {
                "title": "Service Title",
                "slug": "url-friendly-slug",
                "description": "2-sentence professional description using {{city}}.",
                "icon": "One emoji",
                "hero_image": "URL to a high-quality relevant placeholder like https://images.unsplash.com/photo-XXX",
                "process": ["Step 1 in {{city}}", "Step 2", "Step 3", "Step 4", "Step 5"],
                "materials": [
                    {"name": "Material/Tool 1", "description": "Why it's used for {{service}}"},
                    {"name": "Material/Tool 2", "description": "Why it's used in {{state}}"}
                ],
                "faqs": [
                    {"question": "Service specific question", "answer": "Detailed answer mentioning {{city}}."}
                ]
            }
        ],
        "faqs": [
            {"question": "General niche question", "answer": "Answer mentioning {{city}} and {{state}}."}
        ]
    }
    
    Generate 8 services and 6 general FAQs. Ensure every answer and description uses at least one placeholder naturally.
    Return ONLY the JSON object. No other text.`;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://niche-scaling-system.com",
                "X-Title": "Niche Site Generator"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;

        if (!content) return null;

        return JSON.parse(content) as AINicheConfig;
    } catch (error) {
        console.error("AI Niche Generation Error:", error);
        return null;
    }
}
