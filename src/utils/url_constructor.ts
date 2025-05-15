/**
 * Utility functions for URL handling in the application
 */

/**
 * Converts a product name to URL-friendly slug format
 * @param name - The product name to convert
 * @returns A URL-friendly slug
 */
export const slugify = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Constructs a product URL with SEO-friendly format
 * @param name - The product name
 * @param id - The product ID
 * @returns A formatted product URL path
 */
export const getProductUrl = (name: string, id: string): string => {
  const slug = slugify(name);
  return `/${slug}-${id}`;
};

/**
 * Extracts the product ID from a product URL
 * @param url - The product URL path
 * @returns The product ID
 */
export const extractProductId = (url: string): string => {
  // Get the last part of the URL after the last hyphen
  const parts = url.split('-');
  return parts[parts.length - 1];
};