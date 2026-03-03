/**
 * Converts a city/place name to an ASCII-safe URL slug.
 * 
 * Strips diacritics/accents (ñ→n, á→a, ó→o, í→i, etc.),
 * lowercases, trims, and replaces spaces with hyphens.
 * 
 * Examples:
 *   "Lopeño"        → "lopeno"
 *   "Río Blanco"    → "rio-blanco"
 *   "Tomás de Castro" → "tomas-de-castro"
 *   "Mariano Colón"  → "mariano-colon"
 *   "New York"       → "new-york"
 */
export function toAsciiSlug(name: string): string {
    return name
        .normalize('NFD')                    // Decompose accented chars (ñ → n + ̃)
        .replace(/[\u0300-\u036f]/g, '')     // Strip combining diacritical marks
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')               // Spaces → hyphens
        .replace(/[^a-z0-9-]/g, '')          // Remove any remaining non-ASCII
        .replace(/-+/g, '-')                 // Collapse multiple hyphens
        .replace(/^-|-$/g, '')               // Trim leading/trailing hyphens
}
