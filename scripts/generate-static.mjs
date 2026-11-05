import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SITE = 'https://bbbb.beauty';
const DIST = path.resolve('dist');
const baseHtml = await readFile(path.join(DIST, 'index.html'), 'utf8');
const today = new Date().toISOString().slice(0, 10);

const projects = [
  ['molecular-intelligence', 'Molecular Intelligence', '분자 수준의 치료 작용을 근거 기반의 시네마틱 흐름으로 시각화한 자체 R&D 프로젝트.', 'Evidence-based cinematic visualization of molecular-scale therapy in a self-initiated R&D project.', '/assets/BIO4-poster.jpg'],
  ['genetic-interface', 'Genetic Interface', 'CRISPR 유전자 치료 원리를 읽히는 인터페이스로 번역한 자체 R&D 프로젝트.', 'A self-initiated R&D project translating CRISPR gene therapy into a readable interface.', '/assets/work-crispr-poster.jpg'],
  ['cellular-repair', 'Cellular Repair', '나노 스케일 약물 전달을 대칭 구조와 레이어로 설명하는 자체 R&D 프로젝트.', 'A self-initiated R&D project explaining nanoscale drug delivery through structure and layers.', '/assets/work-nano-poster.jpg'],
  ['cellular-defense', 'Cellular Defense', '면역항암의 인식과 회피를 시각적 긴장과 리듬으로 연구한 콘셉트 스터디.', 'A concept study of immuno-oncology recognition and evasion through visual tension and rhythm.', '/assets/work-defense-poster.jpg'],
  ['tissue-scaffold', 'Tissue Scaffold', '조직 재생과 콜라겐 구조를 정밀한 장면으로 설계한 자체 R&D 프로젝트.', 'A self-initiated R&D project visualizing tissue regeneration and collagen structure.', '/assets/work-scaffold-poster.jpg'],
  ['signal-cascade', 'Signal Cascade', '약물 신호 전달을 빛의 연쇄로 탐구한 콘셉트 스터디.', 'A concept study exploring drug signal transduction as a cascade of light.', '/assets/work-signal-poster.jpg'],
  ['microbial-systems', 'Microbial Systems', '마이크로바이옴과 감염의 세계를 감각적으로 재구성한 자체 R&D 프로젝트.', 'A self-initiated R&D project reimagining microbiome and infection systems.', '/assets/work-microbial-poster.jpg'],
  ['threads-of-life', 'Threads of Life', 'DNA와 유전 정보를 리듬과 구조로 재해석한 자체 R&D 프로젝트.', 'A self-initiated R&D project reinterpreting DNA and genomic information as rhythm and structure.', '/assets/work-dna1-poster.jpg'],
];

const home = {
  ko: {
    title: 'bbbb MEDICAL VISUAL — 의학을 이해하는 언어로',
    description: '제약·바이오·메디컬 뷰티 기술을 정확하고 설득력 있는 시각 경험으로 번역하는 메디컬 비주얼 스튜디오.',
  },
  en: {
    title: 'bbbb MEDICAL VISUAL — Medicine, Made Visible',
    description: 'A medical visualization studio translating pharma, biotech, and medical beauty technology into accurate, persuasive visual experiences.',
  },
};

function esc(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function pageHtml({ lang, route, title, description, image, type = 'website', jsonLd }) {
  const opposite = lang === 'ko' ? 'en' : 'ko';
  const oppositeRoute = route.replace(`/${lang}/`, `/${opposite}/`);
  const canonical = `${SITE}${route}`;
  const absoluteImage = `${SITE}${image}`;
  const head = `
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="ko" href="${SITE}${lang === 'ko' ? route : oppositeRoute}" />
    <link rel="alternate" hreflang="en" href="${SITE}${lang === 'en' ? route : oppositeRoute}" />
    <link rel="alternate" hreflang="x-default" href="${SITE}${lang === 'ko' ? route : oppositeRoute}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${canonical}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${absoluteImage}" />
    <script id="bbbb-structured-data" type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`;

  return baseHtml
    .replace('<html lang="ko">', `<html lang="${lang}">`)
    .replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${esc(description)}" />`)
    .replace(/<meta property="og:title"[^>]*\/>/, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${esc(description)}" />`)
    .replace(/<meta property="og:image"[^>]*\/>/, `<meta property="og:image" content="${absoluteImage}" />`)
    .replace('</head>', `${head}\n  </head>`);
}

async function emit(route, html) {
  const dir = path.join(DIST, route.replace(/^\//, ''));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
}

const organization = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'bbbb MEDICAL VISUAL',
  url: SITE,
  email: 'im@bbbb.beauty',
  areaServed: 'Worldwide',
  address: { '@type': 'PostalAddress', addressLocality: 'Seoul', addressCountry: 'KR' },
  sameAs: [
    'https://www.instagram.com/bbbb.beauty_official/',
    'https://www.linkedin.com/in/bbbbbeauty-jay/',
    'https://www.youtube.com/@bbbb.beauty',
  ],
};

for (const lang of ['ko', 'en']) {
  const route = `/${lang}/`;
  await emit(route, pageHtml({ lang, route, ...home[lang], image: '/assets/BIO4-poster.jpg', jsonLd: organization }));
  for (const [slug, projectTitle, koDesc, enDesc, image] of projects) {
    const projectRoute = `/${lang}/work/${slug}/`;
    const description = lang === 'ko' ? koDesc : enDesc;
    const title = `${projectTitle} — bbbb MEDICAL VISUAL`;
    await emit(projectRoute, pageHtml({
      lang,
      route: projectRoute,
      title,
      description,
      image,
      type: 'article',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: projectTitle,
        description,
        url: `${SITE}${projectRoute}`,
        image: `${SITE}${image}`,
        creator: { '@type': 'Organization', name: 'bbbb MEDICAL VISUAL', url: SITE },
        inLanguage: lang,
      },
    }));
  }
}

const routes = ['/ko/', '/en/', ...projects.flatMap(([slug]) => [`/ko/work/${slug}/`, `/en/work/${slug}/`])];
await writeFile(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
await writeFile(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${SITE}${route}</loc><lastmod>${today}</lastmod><changefreq>${route.split('/').length <= 3 ? 'weekly' : 'monthly'}</changefreq></url>`).join('\n')}\n</urlset>\n`);
await writeFile(path.join(DIST, '404.html'), `<!doctype html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>404 — bbbb MEDICAL VISUAL</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#eef1f5;color:#0b1420;font:16px/1.6 system-ui}main{max-width:560px;padding:40px}h1{font-size:clamp(2rem,7vw,4.5rem);margin:.3em 0}a{color:inherit}</style></head><body><main><p>404</p><h1>페이지를 찾을 수 없습니다.</h1><p>주소가 변경되었거나 존재하지 않는 페이지입니다.</p><a href="/ko/">홈으로 이동</a></main></body></html>`);
console.log(`Generated ${routes.length} localized route shells, robots.txt, sitemap.xml and 404.html.`);
