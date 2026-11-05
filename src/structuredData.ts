import type { Lang } from './i18n/lang';
import {
  brand,
  capabilities,
  CONTENT_LAST_MODIFIED,
  type Project,
  projectEvidence,
  projectSourceLinks,
  projectVideoMetadata,
} from './data/brand';
import { faqItems } from './data/faq';
import { SITE_URL } from './seo';

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const text = <T extends { ko: string; en: string }>(value: T, lang: Lang) => value[lang];

export function organizationNode() {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: brand.full,
    alternateName: 'bbbb.beauty',
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo.png`,
    image: `${SITE_URL}/assets/BIO4-poster.jpg`,
    email: brand.email,
    areaServed: 'Worldwide',
    availableLanguage: ['ko', 'en'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Seoul',
      addressCountry: 'KR',
    },
    sameAs: brand.social.map((item) => item.href),
    knowsAbout: [
      'Medical visualization',
      'Mechanism of action animation',
      'Medical 3D animation',
      'Patient education',
      'Healthcare professional education',
      'Pharma and biotech visualization',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'project inquiry',
      email: brand.email,
      availableLanguage: ['Korean', 'English'],
    },
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: brand.full,
    alternateName: 'bbbb.beauty',
    publisher: { '@id': ORG_ID },
    inLanguage: ['ko', 'en'],
    dateModified: CONTENT_LAST_MODIFIED,
  };
}

function serviceNodes(lang: Lang) {
  return capabilities.map((service, index) => ({
    '@type': 'Service',
    '@id': `${SITE_URL}/#service-${index + 1}`,
    name: text(service.title, lang),
    description: text(service.desc, lang),
    provider: { '@id': ORG_ID },
    areaServed: 'Worldwide',
    availableLanguage: ['ko', 'en'],
    serviceType: text(service.title, lang),
  }));
}

export function homeStructuredData(lang: Lang, title: string, description: string) {
  const url = `${SITE_URL}/${lang}/`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      websiteNode(),
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: lang,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORG_ID },
        dateModified: CONTENT_LAST_MODIFIED,
      },
      ...serviceNodes(lang),
    ],
  };
}

export function faqStructuredData(lang: Lang, title: string, description: string) {
  const url = `${SITE_URL}/${lang}/faq/`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      websiteNode(),
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: lang,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORG_ID },
        dateModified: CONTENT_LAST_MODIFIED,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: lang === 'ko' ? '홈' : 'Home', item: `${SITE_URL}/${lang}/` },
          { '@type': 'ListItem', position: 2, name: lang === 'ko' ? '자주 묻는 질문' : 'FAQ', item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: text(item.question, lang),
          acceptedAnswer: { '@type': 'Answer', text: text(item.answer, lang) },
        })),
      },
      ...serviceNodes(lang),
    ],
  };
}

export function projectStructuredData(project: Project, lang: Lang) {
  const route = `/${lang}/work/${project.slug}/`;
  const url = `${SITE_URL}${route}`;
  const evidence = projectEvidence(project);
  const video = projectVideoMetadata(project);
  const sources = projectSourceLinks(project);
  const description = text(project.intent, lang);
  const title = `${project.title} — ${brand.full}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      websiteNode(),
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: lang,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': `${url}#creative-work` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        dateModified: CONTENT_LAST_MODIFIED,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: lang === 'ko' ? '홈' : 'Home', item: `${SITE_URL}/${lang}/` },
          { '@type': 'ListItem', position: 2, name: lang === 'ko' ? '작업' : 'Work', item: `${SITE_URL}/${lang}/#work` },
          { '@type': 'ListItem', position: 3, name: project.title, item: url },
        ],
      },
      {
        '@type': 'CreativeWork',
        '@id': `${url}#creative-work`,
        name: project.title,
        description,
        url,
        image: project.poster ? `${SITE_URL}${project.poster}` : undefined,
        creator: { '@id': ORG_ID },
        inLanguage: lang,
        dateCreated: project.detail.year,
        dateModified: CONTENT_LAST_MODIFIED,
        genre: text(project.kind, lang),
        keywords: [text(project.category, lang), text(project.kind, lang), text(project.detail.discipline, lang)],
        citation: sources.map((source) => source.url),
        isBasedOn: sources.map((source) => ({ '@type': 'CreativeWork', name: source.name, url: source.url })),
        reviewedBy: { '@id': ORG_ID },
        additionalProperty: [
          { '@type': 'PropertyValue', name: lang === 'ko' ? '프로젝트 유형' : 'Project type', value: text(evidence.type, lang) },
          { '@type': 'PropertyValue', name: lang === 'ko' ? '의료 검수' : 'Medical review', value: text(evidence.review, lang) },
          { '@type': 'PropertyValue', name: lang === 'ko' ? '외부 전문가' : 'External expert', value: text(evidence.reviewer, lang) },
        ],
        associatedMedia: { '@id': `${url}#video` },
      },
      {
        '@type': 'VideoObject',
        '@id': `${url}#video`,
        name: `${project.title} visual research film`,
        description,
        thumbnailUrl: project.poster ? `${SITE_URL}${project.poster}` : `${SITE_URL}/assets/BIO4-poster.jpg`,
        contentUrl: project.src ? `${SITE_URL}${project.src}` : undefined,
        duration: video.duration,
        transcript: text(video.transcript, lang),
        inLanguage: lang,
        creator: { '@id': ORG_ID },
        isFamilyFriendly: true,
      },
    ],
  };
}

export function entitySummary() {
  return {
    name: brand.full,
    alternateName: 'bbbb.beauty',
    canonicalUrl: SITE_URL,
    description: {
      ko: '제약·바이오·메디컬 뷰티 기술을 정확하고 설득력 있는 시각 경험으로 번역하는 서울 기반 메디컬 비주얼 스튜디오.',
      en: 'A Seoul-based medical visualization studio translating pharma, biotech, and medical beauty technology into accurate, persuasive visual experiences.',
    },
    location: brand.location,
    email: brand.email,
    languages: ['ko', 'en'],
    services: capabilities.map((service) => ({ name: service.title, description: service.desc })),
    sameAs: brand.social.map((item) => item.href),
    salesResources: brand.sales,
    evidencePolicy: {
      ko: '공개 구조 데이터와 고객사 제공 근거를 구분하며, 확인되지 않은 임상 효능을 주장하지 않습니다.',
      en: 'Public structural sources are separated from client evidence, and unverified clinical efficacy is not claimed.',
    },
    lastModified: CONTENT_LAST_MODIFIED,
  };
}
