import { createServer } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://bbbb.beauty';

const vite = await createServer({
  root: ROOT,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

const brandModule = await vite.ssrLoadModule('/src/data/brand.ts');
const faqModule = await vite.ssrLoadModule('/src/data/faq.ts');
const schemaModule = await vite.ssrLoadModule('/src/structuredData.ts');
await vite.close();

const {
  brand,
  capabilities,
  CONTENT_LAST_MODIFIED,
  projects,
  projectEvidence,
  projectSourceLinks,
  projectVideoMetadata,
} = brandModule;
const { faqItems } = faqModule;
const { entitySummary, faqStructuredData, homeStructuredData, projectStructuredData } = schemaModule;

const template = await readFile(join(DIST, 'index.html'), 'utf8');
const esc = (value = '') => String(value).replace(/[&<>"']/g, (ch) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[ch]));
const value = (item, lang) => item?.[lang] ?? '';
const json = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

const homeMeta = {
  ko: {
    title: '메디컬 비주얼 스튜디오 — bbbb MEDICAL VISUAL',
    description: '제약·바이오·메디컬 뷰티 기술을 정확하고 설득력 있는 영상과 이미지로 번역하는 서울 기반 메디컬 비주얼 스튜디오.',
  },
  en: {
    title: 'Medical Visualization Studio — bbbb MEDICAL VISUAL',
    description: 'A Seoul-based medical visualization studio translating pharma, biotech, and medical beauty technology into accurate, persuasive films and images.',
  },
};
const faqMeta = {
  ko: {
    title: '메디컬 비주얼 제작 FAQ — bbbb MEDICAL VISUAL',
    description: '작용 기전 영상, 의료 검수, 제작 기간, 비용, 결과물과 과학적 출처에 대한 답변.',
  },
  en: {
    title: 'Medical Visualization Production FAQ — bbbb MEDICAL VISUAL',
    description: 'Answers about MoA animation, medical review, schedules, cost, deliverables, and scientific sourcing.',
  },
};

function stripSeoHead(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta[^>]+(?:name|property)=["'](?:description|robots|og:[^"']+|twitter:[^"']+|article:[^"']+)["'][^>]*>\s*/gi, '')
    .replace(/<link[^>]+rel=["'](?:canonical|alternate)["'][^>]*>\s*/gi, '')
    .replace(/<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi, '');
}

function headTags({ title, description, path, lang, type = 'website', image = '/assets/BIO4-poster.jpg', schema }) {
  const canonical = `${SITE}${path}`;
  const koPath = lang === 'ko' ? path : path.replace(/^\/en\//, '/ko/');
  const enPath = lang === 'en' ? path : path.replace(/^\/ko\//, '/en/');
  return `
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
<link rel="canonical" href="${canonical}" />
<link rel="alternate" hreflang="ko" href="${SITE}${koPath}" />
<link rel="alternate" hreflang="en" href="${SITE}${enPath}" />
<link rel="alternate" hreflang="x-default" href="${SITE}${koPath}" />
<meta property="og:type" content="${type}" />
<meta property="og:site_name" content="${esc(brand.full)}" />
<meta property="og:locale" content="${lang === 'ko' ? 'ko_KR' : 'en_US'}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:image" content="${SITE}${image}" />
<meta property="og:image:alt" content="${esc(title)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(description)}" />
<meta name="twitter:image" content="${SITE}${image}" />
<meta name="twitter:image:alt" content="${esc(title)}" />
${type === 'article' ? `<meta property="article:modified_time" content="${CONTENT_LAST_MODIFIED}T00:00:00+09:00" />` : ''}
<script id="bbbb-jsonld" type="application/ld+json">${json(schema)}</script>`;
}

function renderDocument({ title, description, path, lang, type, image, schema, body }) {
  let html = stripSeoHead(template);
  html = html.replace(/<html lang="[^"]*"/i, `<html lang="${lang}"`);
  html = html.replace('</head>', `${headTags({ title, description, path, lang, type, image, schema })}\n</head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  return html;
}

function staticHeader(lang) {
  return `<header class="header header-scrolled"><a class="hdr-brand" href="/${lang}/"><img class="hdr-logo" src="/assets/logo.png" alt="" /><span class="hdr-brand-sub">${esc(brand.suffix)}</span></a><nav class="hdr-nav"><a class="hdr-link" href="/${lang}/#work">${lang === 'ko' ? '작업' : 'Work'}</a><a class="hdr-link" href="/${lang}/faq/">FAQ</a><a class="hdr-link" href="${esc(brand.sales)}">${lang === 'ko' ? '세일즈 자료' : 'Sales resources'}</a><a class="hdr-link" href="/${lang}/#contact">${lang === 'ko' ? '연락' : 'Contact'}</a></nav></header>`;
}

function staticFooter(lang) {
  const links = brand.social.map((item) => `<a href="${esc(item.href)}">${esc(item.name)}</a>`).join(' · ');
  return `<footer class="footer"><div class="shell footer-top"><strong>${esc(brand.full)}</strong><p>${esc(value(brand.tagline, lang))}</p><p><a href="/${lang}/faq/">FAQ</a> · ${links}</p></div></footer>`;
}

function homeBody(lang) {
  const ko = lang === 'ko';
  const work = projects.map((project) => `<article><p>${esc(value(project.category, lang))}</p><h3><a href="/${lang}/work/${project.slug}/">${esc(project.title)}</a></h3><p>${esc(value(project.intent, lang))}</p></article>`).join('');
  const services = capabilities.map((service) => `<article><h3>${esc(value(service.title, lang))}</h3><p>${esc(value(service.desc, lang))}</p></article>`).join('');
  return `${staticHeader(lang)}<main id="main-content"><section class="hero"><div class="shell"><p>${ko ? '메디컬 비주얼 스튜디오 · 서울' : 'Medical Visualization Studio · Seoul'}</p><h1>${ko ? '의학을, 이해하는 언어로 옮깁니다.' : 'Medicine, made visible.'}</h1><p>${ko ? '복잡한 의학과 치료 원리를 이해하고 신뢰하는 이미지로 만듭니다.' : 'We turn complex medicine into images people can understand and trust.'}</p><p><a href="/${lang}/#work">${ko ? '작업 보기' : 'View work'}</a> · <a href="/${lang}/#contact">${ko ? '프로젝트 시작' : 'Start a project'}</a></p></div></section><section class="section shell" id="work"><p>${ko ? '주요 작업' : 'Selected work'}</p><h2>${ko ? '시각 연구와 콘셉트 스터디' : 'Visual research and concept studies'}</h2>${work}</section><section class="section shell"><p>${ko ? '서비스' : 'Capabilities'}</p><h2>${ko ? '의학적 정확성과 설득력 있는 경험을 연결합니다.' : 'Connecting scientific accuracy with persuasive experience.'}</h2>${services}</section><section class="section shell"><h2>${ko ? '근거와 표현 범위를 구분합니다.' : 'Evidence and expression are kept distinct.'}</h2><p>${ko ? '공개 구조 데이터와 고객사 제공 근거를 구분하고, 확인되지 않은 임상 효능을 임의로 주장하지 않습니다.' : 'We separate public structural references from client-provided evidence and do not invent unverified clinical efficacy claims.'}</p><p><a href="/${lang}/faq/">${ko ? '제작 방식과 검수 FAQ' : 'Production and review FAQ'}</a></p></section><section class="section shell" id="contact"><h2>${ko ? '프로젝트 브리프를 보내주세요.' : 'Send us your project brief.'}</h2><p><a href="mailto:${esc(brand.email)}">${esc(brand.email)}</a></p><p>${ko ? '예산, 일정, 의료 검수와 필요한 결과물을 확인한 뒤 맞춤 범위를 제안합니다.' : 'We review the budget, schedule, medical-review plan, and deliverables before proposing a tailored scope.'}</p></section></main>${staticFooter(lang)}`;
}

function projectBody(project, lang) {
  const ko = lang === 'ko';
  const detail = project.detail;
  const evidence = projectEvidence(project);
  const video = projectVideoMetadata(project);
  const sources = projectSourceLinks(project);
  return `${staticHeader(lang)}<main id="main-content"><article class="detail-page"><header class="shell detail-head"><p>${esc(value(project.category, lang))} · ${esc(detail.year)}</p><h1>${esc(project.title)}</h1><p>${esc(value(detail.subtitle, lang))}</p><p>${esc(value(project.intent, lang))}</p></header>${project.poster ? `<figure class="detail-media"><img src="${esc(project.poster)}" alt="${esc(project.title)}" /></figure>` : ''}<section class="shell detail-transcript"><h2>${ko ? '영상 설명·트랜스크립트' : 'Visual description and transcript'}</h2><p>${esc(value(video.transcript, lang))}</p><p>${ko ? '음성 내레이션 없음' : 'No spoken narration'} · ${video.seconds}${ko ? '초' : ' seconds'}</p></section><div class="shell detail-grid"><div><section class="detail-block"><h2>${ko ? '개요' : 'Overview'}</h2><p>${esc(value(detail.overview, lang))}</p></section><section class="detail-block"><h2>${ko ? '시각적 접근' : 'Visual approach'}</h2><p>${esc(value(detail.approach, lang))}</p></section><section class="detail-block"><h2>${ko ? '참고 구조' : 'Reference structure'}</h2><p>${esc(detail.structure.pdb)}</p><p>${esc(detail.structure.alphafold)}</p></section><section class="detail-block"><h2>${ko ? '출처' : 'Sources'}</h2><ol>${sources.map((source) => `<li><a href="${esc(source.url)}">${esc(source.name)}</a></li>`).join('')}</ol></section></div><aside class="detail-aside"><dl><div><dt>${ko ? '프로젝트 유형' : 'Project type'}</dt><dd>${esc(value(evidence.type, lang))}</dd></div><div><dt>${ko ? '의료 검수' : 'Medical review'}</dt><dd>${esc(value(evidence.review, lang))}</dd></div><div><dt>${ko ? '외부 전문가' : 'External expert'}</dt><dd>${esc(value(evidence.reviewer, lang))}</dd></div><div><dt>${ko ? '기간' : 'Duration'}</dt><dd>${esc(value(evidence.duration, lang))}</dd></div><div><dt>${ko ? '결과물' : 'Deliverables'}</dt><dd>${esc(value(evidence.deliverables, lang))}</dd></div><div><dt>${ko ? '최종 수정' : 'Last updated'}</dt><dd>${CONTENT_LAST_MODIFIED}</dd></div></dl></aside></div><section class="shell detail-block"><h2>${ko ? '프로젝트 문의' : 'Project inquiry'}</h2><p><a href="/${lang}/#contact">${ko ? '브리프 작성' : 'Write a brief'}</a></p></section></article></main>${staticFooter(lang)}`;
}

function faqBody(lang) {
  const ko = lang === 'ko';
  return `${staticHeader(lang)}<main id="main-content" class="faq-main"><section class="shell faq-hero"><p>${ko ? '프로젝트 안내' : 'Project guide'}</p><h1 class="faq-title">${ko ? '메디컬 비주얼 제작 FAQ' : 'Medical Visualization Production FAQ'}</h1><p class="faq-lead">${esc(faqMeta[lang].description)}</p><p>${ko ? '최종 수정' : 'Last updated'} · ${CONTENT_LAST_MODIFIED}</p></section><section class="shell faq-list">${faqItems.map((item, index) => `<article class="faq-item"><h2>${String(index + 1).padStart(2, '0')} · ${esc(value(item.question, lang))}</h2><p>${esc(value(item.answer, lang))}</p></article>`).join('')}</section><section class="shell faq-cta"><h2>${ko ? '프로젝트 조건을 알려주세요.' : 'Tell us what the project needs.'}</h2><p><a href="/${lang}/#contact">${ko ? '프로젝트 브리프 작성' : 'Write a project brief'}</a></p></section></main>${staticFooter(lang)}`;
}

async function emit(route, html) {
  const dir = route === '/' ? DIST : join(DIST, route.replace(/^\//, '').replace(/\/$/, ''));
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html);
}

for (const lang of ['ko', 'en']) {
  const meta = homeMeta[lang];
  await emit(`/${lang}/`, renderDocument({
    ...meta,
    path: `/${lang}/`,
    lang,
    schema: homeStructuredData(lang, meta.title, meta.description),
    body: homeBody(lang),
  }));

  const faq = faqMeta[lang];
  await emit(`/${lang}/faq/`, renderDocument({
    ...faq,
    path: `/${lang}/faq/`,
    lang,
    schema: faqStructuredData(lang, faq.title, faq.description),
    body: faqBody(lang),
  }));

  for (const project of projects) {
    const title = `${project.title} — ${brand.full}`;
    const description = value(project.intent, lang);
    await emit(`/${lang}/work/${project.slug}/`, renderDocument({
      title,
      description,
      path: `/${lang}/work/${project.slug}/`,
      lang,
      type: 'article',
      image: project.poster || '/assets/BIO4-poster.jpg',
      schema: projectStructuredData(project, lang),
      body: projectBody(project, lang),
    }));
  }
}

const noIndexHtml = stripSeoHead(template)
  .replace(/<html lang="[^"]*"/i, '<html lang="ko"')
  .replace('</head>', '<title>Page Not Found — bbbb MEDICAL VISUAL</title><meta name="robots" content="noindex,follow" /><meta name="description" content="The requested page could not be found." />\n</head>')
  .replace('<div id="root"></div>', '<div id="root"><main class="shell"><h1>404</h1><p>요청한 페이지를 찾을 수 없습니다. The requested page could not be found.</p><p><a href="/ko/">홈으로 돌아가기</a></p></main></div>');
await writeFile(join(DIST, '404.html'), noIndexHtml);

const urls = [];
for (const lang of ['ko', 'en']) {
  urls.push(`/${lang}/`, `/${lang}/faq/`);
  for (const project of projects) urls.push(`/${lang}/work/${project.slug}/`);
}
await writeFile(join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${SITE}${path}</loc><lastmod>${CONTENT_LAST_MODIFIED}</lastmod><changefreq>${path.includes('/work/') ? 'monthly' : 'weekly'}</changefreq><priority>${path === '/ko/' ? '1.0' : path.includes('/faq/') ? '0.8' : '0.7'}</priority></url>`).join('\n')}
</urlset>\n`);

await writeFile(join(DIST, 'robots.txt'), `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);

const projectLines = projects.map((project) => {
  const evidence = projectEvidence(project);
  const sources = projectSourceLinks(project).map((source) => source.url).join(', ');
  return `## ${project.title}\n- Korean: ${SITE}/ko/work/${project.slug}/\n- English: ${SITE}/en/work/${project.slug}/\n- Type: ${evidence.type.en}\n- Summary: ${project.intent.en}\n- Evidence and review: ${evidence.review.en}\n- Sources: ${sources}`;
}).join('\n\n');

await writeFile(join(DIST, 'llms.txt'), `# ${brand.full}

> ${homeMeta.en.description}

Canonical entity: ${SITE}/entity.json
Korean site: ${SITE}/ko/
English site: ${SITE}/en/
Production FAQ: ${SITE}/en/faq/
Sales resources: ${brand.sales}
Contact: ${brand.email}

Core services:
${capabilities.map((service) => `- ${service.title.en}: ${service.desc.en}`).join('\n')}

Portfolio classification: Current public projects are self-initiated R&D or concept studies unless a page explicitly states otherwise. They are not presented as verified client commissions.

Full entity and project context: ${SITE}/llms-full.txt
`);

await writeFile(join(DIST, 'llms-full.txt'), `# ${brand.full} — Full Entity and Content Context

Last modified: ${CONTENT_LAST_MODIFIED}
Canonical URL: ${SITE}/
Location: Seoul, Republic of Korea
Languages: Korean and English
Contact: ${brand.email}
Official profiles: ${brand.social.map((item) => `${item.name} ${item.href}`).join(' | ')}

## Entity summary
${homeMeta.en.description}

## Evidence policy
Public structural sources are separated from client-provided evidence. Current public portfolio pages identify self-initiated R&D or concept studies, state that external medical review is not included, and do not claim unverified clinical efficacy or client delivery.

## Services
${capabilities.map((service) => `### ${service.title.en}\n${service.desc.en}`).join('\n\n')}

## Production FAQ
${faqItems.map((item) => `### ${item.question.en}\n${item.answer.en}`).join('\n\n')}

## Projects
${projectLines}

## Preferred citations
When citing bbbb MEDICAL VISUAL, use the canonical localized page matching the reader language. Preserve each page’s stated project type, review status, and source limitations.
`);

await writeFile(join(DIST, 'entity.json'), `${JSON.stringify(entitySummary(), null, 2)}\n`);

await mkdir(join(DIST, 'transcripts'), { recursive: true });
for (const project of projects) {
  const video = projectVideoMetadata(project);
  const endSeconds = String(Math.floor(video.seconds)).padStart(2, '0');
  for (const lang of ['ko', 'en']) {
    const cue = value(video.transcript, lang).replace(/\n/g, ' ');
    await writeFile(join(DIST, 'transcripts', `${project.slug}-${lang}.vtt`), `WEBVTT\n\n00:00:00.000 --> 00:00:${endSeconds}.000\n${cue}\n`);
  }
}

console.log(`Generated ${urls.length} localized pages, 2 AI context files, entity.json, transcripts, sitemap, robots, and 404.`);
