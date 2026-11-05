import type { L, LL } from './lang';

/** All section + detail UI copy, bilingual. Resolve strings with useLang().t(). */
export const ui = {
  nav: {
    sales: { ko: '세일즈 자료', en: 'Sales Resources' } as L,
    faq: { ko: 'FAQ', en: 'FAQ' } as L,
    contact: { ko: '연락', en: 'Contact' } as L,
  },
  lang: {
    switch: { ko: '언어 전환', en: 'Switch language' } as L,
  },
  hero: {
    eyebrow: { ko: '메디컬 비주얼 스튜디오 · 서울', en: 'MEDICAL VISUALIZATION STUDIO · SEOUL' } as L,
    sub: {
      ko: '복잡한 의학과 치료 원리를 이해하고 신뢰하는 이미지로 만듭니다.',
      en: 'We turn complex medicine into images people can understand and trust.',
    } as L,
    viewWork: { ko: '작업 보기', en: 'VIEW WORK' } as L,
    startProject: { ko: '프로젝트 시작', en: 'START A PROJECT' } as L,
    scroll: { ko: '스크롤', en: 'Scroll' } as L,
    // Stage 0 is the lead (headline + CTAs); the rest are scroll lines.
    stages: [
      { ko: ['의학을,', '이해하는 언어로 옮깁니다.'], en: ['MEDICINE,', 'MADE VISIBLE.'], lead: true },
      { ko: ['복잡함에서', '명료함으로.'], en: ['FROM COMPLEXITY', 'TO CLARITY.'] },
      { ko: ['진단에서', '이해로.'], en: ['FROM DIAGNOSIS', 'TO UNDERSTANDING.'] },
      { ko: ['연구에서', '신뢰로.'], en: ['FROM RESEARCH', 'TO TRUST.'] },
      { ko: ['정보에서', '경험으로.'], en: ['FROM INFORMATION', 'TO EXPERIENCE.'] },
    ] as (LL & { lead?: boolean })[],
  },
  manifesto: {
    eyebrow: { ko: '번역 선언', en: 'Translation Manifesto' } as L,
    headline: {
      ko: ['의학과 사람 사이에는', '번역이 필요합니다.'],
      en: ['BETWEEN MEDICINE AND PEOPLE,', 'TRANSLATION IS NEEDED.'],
    } as LL,
    l1: { ko: '임상은 정확성을 말합니다.', en: 'Clinicians speak in accuracy.' } as L,
    l2: { ko: '브랜드는 가치를 말합니다.', en: 'Brands speak in value.' } as L,
    l3: { ko: '환자는 이해할 수 있는 설명을 원합니다.', en: 'Patients want to understand.' } as L,
    close: {
      ko: 'bbbb MEDICAL VISUAL은 이 서로 다른 언어를 하나의 이미지로 연결합니다.',
      en: 'bbbb MEDICAL VISUAL connects these different languages into a single image.',
    } as L,
  },
  work: {
    eyebrow: { ko: '주요 작업', en: 'Selected Work' } as L,
    more: { ko: '프로젝트 보기', en: 'View project' } as L,
    viewAria: { ko: '상세 보기', en: 'view details' } as L,
  },
  framework: {
    eyebrow: { ko: '번역 프레임워크', en: 'Translation Framework' } as L,
    axes: [
      {
        n: '01',
        title: { ko: '연구를 명료함으로', en: 'Research into Clarity' } as L,
        desc: {
          ko: '복잡한 치료 원리와 작용 기전을 명료한 시각 구조로 바꿉니다.',
          en: 'We turn complex mechanisms of action into clear visual structure.',
        } as L,
        scheme: 'blue' as const,
      },
      {
        n: '02',
        title: { ko: '데이터를 신뢰로', en: 'Data into Trust' } as L,
        desc: {
          ko: '임상 데이터와 근거를 신뢰할 수 있는 경험으로 전달합니다.',
          en: 'We deliver clinical data and evidence as an experience you can trust.',
        } as L,
        scheme: 'teal' as const,
      },
      {
        n: '03',
        title: { ko: '의학을 경험으로', en: 'Medicine into Experience' } as L,
        desc: {
          ko: '의학 콘텐츠를 공간과 상호작용으로 확장합니다.',
          en: 'We extend medical content into space and interaction.',
        } as L,
        scheme: 'silver' as const,
      },
    ],
  },
  rnd: {
    eyebrow: { ko: '비주얼 R&D', en: 'Visual R&D' } as L,
    headline: {
      ko: ['제작에 앞서,', '의학이 어떻게 보여야 하는지 정의합니다.'],
      en: ['BEFORE PRODUCTION,', 'WE DEFINE HOW MEDICINE SHOULD LOOK.'],
    } as LL,
    text: {
      ko: '논문과 임상 자료를 그대로 옮기지 않습니다. 치료의 핵심과 사람의 이해 방식을 분석해 프로젝트만의 시각 언어를 만듭니다.',
      en: 'We don’t just transcribe papers and clinical data. We analyze the core of a therapy and how people understand it, then build a visual language unique to each project.',
    } as L,
    stages: [
      {
        n: '01',
        en: { ko: '임상 리딩', en: 'Clinical Reading' } as L,
        desc: { ko: '치료의 핵심과 전달 목표를 읽습니다.', en: 'Read the core of the therapy and the goal of communication.' } as L,
      },
      {
        n: '02',
        en: { ko: '비주얼 가설', en: 'Visual Hypothesis' } as L,
        desc: { ko: '어떤 이미지로 기억될지 가설을 세웁니다.', en: 'Hypothesize the image it will be remembered by.' } as L,
      },
      {
        n: '03',
        en: { ko: '모션 원리', en: 'Motion Principle' } as L,
        desc: { ko: '움직임의 원리를 설계합니다.', en: 'Design the principle of movement.' } as L,
      },
      {
        n: '04',
        en: { ko: '재질 언어', en: 'Material Language' } as L,
        desc: { ko: '재질과 빛의 언어를 정의합니다.', en: 'Define the language of material and light.' } as L,
      },
      {
        n: '05',
        en: { ko: '최종 시스템', en: 'Final System' } as L,
        desc: { ko: '프로젝트만의 시각 시스템으로 완성합니다.', en: 'Complete it as a visual system all its own.' } as L,
      },
    ],
  },
  capabilities: {
    eyebrow: { ko: '역량', en: 'Capabilities' } as L,
  },
  process: {
    headline: { ko: ['의학에서', '이해로.'], en: ['FROM MEDICINE', 'TO UNDERSTANDING.'] } as LL,
    steps: [
      {
        n: '01',
        title: { ko: '리서치', en: 'Research' } as L,
        desc: { ko: '치료 구조와 전달 목표를 읽습니다.', en: 'Read the structure of the therapy and the goal.' } as L,
      },
      {
        n: '02',
        title: { ko: '번역', en: 'Translation' } as L,
        desc: { ko: '복잡한 의학 정보를 핵심 언어로 정리합니다.', en: 'Distill complex medical information into core language.' } as L,
      },
      {
        n: '03',
        title: { ko: '비주얼 개발', en: 'Visual Development' } as L,
        desc: { ko: '룩, 재질, 움직임의 원리를 설계합니다.', en: 'Design the look, material, and principle of motion.' } as L,
      },
      {
        n: '04',
        title: { ko: '프로덕션', en: 'Production' } as L,
        desc: { ko: 'CGI, 시뮬레이션, AI와 VFX를 통합합니다.', en: 'Integrate CGI, simulation, AI, and VFX.' } as L,
      },
      {
        n: '05',
        title: { ko: '경험', en: 'Experience' } as L,
        desc: { ko: '영상, 전시, LED와 인터랙션으로 완성합니다.', en: 'Complete it in film, exhibition, LED, and interaction.' } as L,
      },
    ],
  },
  studio: {
    headline: {
      ko: ['정확하기만 한 것도,', '아름답기만 한 것도 아닙니다.'],
      en: ['NOT JUST CLINICAL.', 'NOT JUST BEAUTIFUL.'],
    } as LL,
    l1: { ko: '정확하기만 해서는 기억되지 않습니다.', en: 'Accuracy alone is not remembered.' } as L,
    l2: { ko: '아름답기만 해서는 신뢰받지 못합니다.', en: 'Beauty alone is not trusted.' } as L,
    close: {
      ko: 'bbbb MEDICAL VISUAL은 정확성과 신뢰 사이의 균형을 설계합니다.',
      en: 'bbbb MEDICAL VISUAL designs the balance between accuracy and trust.',
    } as L,
  },
  contact: {
    headline: {
      ko: ['당신의 의학은,', '이해될 자격이 있습니다.'],
      en: ['YOUR MEDICINE', 'DESERVES TO BE UNDERSTOOD.'],
    } as LL,
    text: {
      ko: '치료·제품과 필요한 결과물을 알려주세요. 보통 1영업일 내 회신합니다.',
      en: 'Tell us about the therapy or product and what you need. We usually reply within one business day.',
    } as L,
    cta: { ko: '프로젝트 브리프 작성', en: 'Write a Project Brief' } as L,
    submit: { ko: '이메일 브리프 보내기', en: 'Send Email Brief' } as L,
    direct: { ko: '직접 이메일', en: 'Email directly' } as L,
    note: {
      ko: '제출하면 작성한 내용이 담긴 이메일 앱이 열립니다. 전송 전 내용을 확인할 수 있습니다.',
      en: 'Submitting opens your email app with the brief filled in. You can review it before sending.',
    } as L,
  },
  detail: {
    allWork: { ko: '전체 작업', en: 'All Work' } as L,
    overview: { ko: '개요', en: 'Overview' } as L,
    refStructure: { ko: '참조 구조', en: 'Reference Structure' } as L,
    visualApproach: { ko: '비주얼 접근', en: 'Visual Approach' } as L,
    category: { ko: '카테고리', en: 'Category' } as L,
    discipline: { ko: '분야', en: 'Discipline' } as L,
    year: { ko: '연도', en: 'Year' } as L,
    reference: { ko: '레퍼런스', en: 'Reference' } as L,
    projectType: { ko: '프로젝트 유형', en: 'Project Type' } as L,
    scope: { ko: '담당 범위', en: 'Scope' } as L,
    deliverables: { ko: '결과물', en: 'Deliverables' } as L,
    review: { ko: '의료 검수', en: 'Medical Review' } as L,
    duration: { ko: '제작 기간', en: 'Duration' } as L,
    prev: { ko: '이전', en: 'Prev' } as L,
    next: { ko: '다음', en: 'Next' } as L,
    pdbLink: { ko: 'RCSB 단백질 데이터 뱅크', en: 'RCSB Protein Data Bank' } as L,
    afLink: { ko: 'AlphaFold 단백질 구조 데이터베이스', en: 'AlphaFold Protein Structure Database' } as L,
    ctaTitle: { ko: '이 주제로 프로젝트를 시작하고 싶다면.', en: 'Want to start a project on this subject?' } as L,
    startProject: { ko: '프로젝트 시작', en: 'Start a Project' } as L,
    backToWork: { ko: '작업으로 돌아가기', en: 'Back to Work' } as L,
    disclaimer: {
      ko: '구조 데이터는 시각 R&D를 위한 학습 레퍼런스이며, 임상적 효능을 주장하지 않습니다.',
      en: 'Structural data is a study reference for visual R&D and makes no clinical-efficacy claims.',
    } as L,
  },
};
