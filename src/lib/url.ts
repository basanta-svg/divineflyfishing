/** Prefix a root-relative path with the configured Astro `base` (needed for GitHub Pages project sites). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + (path.startsWith('/') ? path : '/' + path);
}
