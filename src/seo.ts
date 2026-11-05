import type { Lang } from './i18n/lang';

export const SITE_URL = 'https://bbbb.beauty';
export const DEFAULT_IMAGE = '/assets/BIO4-poster.jpg';

interface SeoInput {
  title: string;
  description: string;
  path: string;
  lang: Lang;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown>;
}

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attrs).forEach(([key, value]) => element!.setAttribute(key, value));
}

function upsertLink(rel: string, hreflang: string | null, href: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    if (hreflang) element.hreflang = hreflang;
    document.head.appendChild(element);
  }
  element.href = href;
}

function localizedAlternates(pathname: string) {
  const stripped = pathname.replace(/^\/(ko|en)(?=\/|$)/, '') || '/';
  return {
    ko: `${SITE_URL}/ko${stripped}`.replace(/\/+$/, '/'),
    en: `${SITE_URL}/en${stripped}`.replace(/\/+$/, '/'),
  };
}

export function applySeo({
  title,
  description,
  path,
  lang,
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd,
}: SeoInput) {
  const canonical = `${SITE_URL}${path}`;
  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  const alternates = localizedAlternates(path);

  document.title = title;
  document.documentElement.lang = lang;
  upsertMeta('meta[name="description"]', { name: 'description', content: description });
  upsertMeta('meta[name="robots"]', {
    name: 'robots',
    content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
  });
  upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'bbbb MEDICAL VISUAL' });
  upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: lang === 'ko' ? 'ko_KR' : 'en_US' });
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type });
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: absoluteImage });
  upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: title });
  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: absoluteImage });
  upsertMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: title });
  upsertLink('canonical', null, canonical);
  upsertLink('alternate', 'ko', alternates.ko);
  upsertLink('alternate', 'en', alternates.en);
  upsertLink('alternate', 'x-default', alternates.ko);

  const id = 'bbbb-jsonld';
  document.getElementById('bbbb-structured-data')?.remove();
  document.getElementById(id)?.remove();
  if (jsonLd) {
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }
}
