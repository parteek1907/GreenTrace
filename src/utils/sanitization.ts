/**
 * Utility to sanitize inputs to prevent XSS and injection attacks.
 * Since React automatically escapes content rendered in the DOM,
 * this is mostly useful for data being stored in the database or used in raw HTML/attributes.
 */

/**
 * Removes dangerous HTML tags and attributes from a string.
 */
export function sanitizeHtml(input: string): string {
  if (!input) return "";
  // Basic sanitization replacing < and > to prevent script injection
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Strips all non-alphanumeric characters (useful for usernames or internal IDs).
 */
export function sanitizeAlphanumeric(input: string): string {
  if (!input) return "";
  return input.replace(/[^a-zA-Z0-9_-]/g, "");
}

/**
 * Validates and sanitizes a URL. Ensure it starts with http:// or https://.
 */
export function sanitizeUrl(input: string): string | null {
  try {
    const url = new URL(input);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.toString();
    }
  } catch {
    return null;
  }
  return null;
}
