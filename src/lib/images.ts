import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{webp,png,jpg,jpeg}',
  { eager: true },
);

/** Resolve a legacy "/assets/images/..." path to an optimizable image in src/assets. */
export function resolveImage(path: string): ImageMetadata {
  const key = '/src/' + path.replace(/^\//, '');
  const mod = files[key];
  if (!mod) throw new Error(`Image not found in src/assets: ${path}`);
  return mod.default;
}
