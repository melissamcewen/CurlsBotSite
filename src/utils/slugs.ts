/**
 * Converts a slug (URL-friendly string with hyphens) to an ID (internal string with underscores)
 */
export function slugToId(slug: string): string {
  return slug.replace(/-/g, '_');
}

/**
 * Converts an ID (internal string with underscores) to a slug (URL-friendly string with hyphens)
 */
export function idToSlug(id: string): string {
  return id.replace(/_/g, '-');
}

/**
 * Formats a string into a title case
 * Example: "low_porosity" -> "Low Porosity"
 */
export function formatTitle(str: string): string {
  return str
    .split(/[_-]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
