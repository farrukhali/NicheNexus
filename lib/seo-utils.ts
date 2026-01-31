/**
 * Replaces placeholders in a given text with dynamic variables.
 * Supported placeholders: {{city}}, {{state}}, {{stateCode}}, {{niche}}, {{nicheName}}, {{service}}
 */
export function replacePlaceholders(
    text: string | null | undefined,
    vars: {
        city?: string;
        state?: string;
        stateCode?: string;
        niche?: string;
        nicheName?: string;
        service?: string;
    }
): string {
    if (!text) return "";

    let result = text;

    // Case-insensitive replacement for common placeholders
    const replacements: Record<string, string | undefined> = {
        "{{city}}": vars.city,
        "{{state}}": vars.state,
        "{{stateCode}}": vars.stateCode,
        "{{niche}}": vars.niche,
        "{{nicheName}}": vars.nicheName || vars.niche,
        "{{service}}": vars.service,
    };

    Object.entries(replacements).forEach(([placeholder, value]) => {
        if (value) {
            // Replace all occurrences
            const regex = new RegExp(placeholder, "gi");
            result = result.replace(regex, value);
        }
    });

    return result;
}

/**
 * Replaces placeholders in an array of strings.
 */
export function replacePlaceholdersInArray(
    arr: string[] | null | undefined,
    vars: Parameters<typeof replacePlaceholders>[1]
): string[] {
    if (!arr) return [];
    return arr.map(item => replacePlaceholders(item, vars));
}

/**
 * Replaces placeholders in an object with 'name' and 'description' keys.
 */
export function replacePlaceholdersInMaterials(
    materials: { name: string; description: string }[] | null | undefined,
    vars: Parameters<typeof replacePlaceholders>[1]
): { name: string; description: string }[] {
    if (!materials) return [];
    return materials.map(m => ({
        name: replacePlaceholders(m.name, vars),
        description: replacePlaceholders(m.description, vars)
    }));
}
