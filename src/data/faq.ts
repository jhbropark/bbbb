import type { L } from '../i18n/lang';

export type FaqItem = {
  id: string;
  question: L;
  answer: L;
};

export const faqItems: FaqItem[] = [
  {
    id: 'moa-animation',
    question: {
      ko: '작용 기전(MoA) 영상은 무엇인가요?',
      en: 'What is a mechanism-of-action (MoA) animation?',
    },
    answer: {
      ko: '약물, 의료기기 또는 치료 기술이 표적과 상호작용해 작동하는 과정을 시각적으로 설명하는 콘텐츠입니다. bbbb MEDICAL VISUAL은 공개 구조 데이터와 고객사가 제공한 근거를 구분해 사용하며, 확인되지 않은 임상 효능을 임의로 추가하지 않습니다.',
      en: 'It is a visual explanation of how a drug, medical device, or therapy interacts with its target. bbbb MEDICAL VISUAL separates public structural references from client-provided evidence and does not invent unverified clinical efficacy claims.',
    },
  },
  {
    id: 'required-materials',
    question: {
      ko: '프로젝트를 시작할 때 어떤 자료가 필요한가요?',
      en: 'What materials are needed to start a project?',
    },
    answer: {
      ko: '제품·치료 개요, 전달해야 할 핵심 주장, 논문·특허·임상 또는 기술 자료, 주요 대상, 사용 채널, 희망 일정이 필요합니다. 자료가 정리되지 않았다면 브리프 단계에서 근거와 표현 범위를 먼저 구분합니다.',
      en: 'We need a product or therapy overview, the claims to communicate, supporting papers, patents, clinical or technical materials, the target audience, channels, and desired schedule. If the materials are not organized, the brief phase first separates evidence from the intended expression.',
    },
  },
  {
    id: 'medical-review',
    question: {
      ko: '의료·과학 검수는 어떻게 진행하나요?',
      en: 'How is medical and scientific review handled?',
    },
    answer: {
      ko: '자체 R&D 작업은 PDB, AlphaFold 등 공개 구조 자료를 기반으로 내부 시각 검토를 진행합니다. 임상 주장, 제품 효능, 규제 대상 표현은 고객사 의료진 또는 별도로 지정한 외부 전문가의 최종 검수가 필요하며, 검수자와 승인 범위는 프로젝트 시작 전에 확정합니다.',
      en: 'Self-initiated R&D work receives an internal visual review based on public structural sources such as PDB and AlphaFold. Clinical claims, product efficacy, and regulated statements require final review by the client’s medical team or a separately appointed external expert. The reviewer and approval scope are confirmed before production.',
    },
  },
  {
    id: 'schedule',
    question: {
      ko: '제작 기간은 얼마나 걸리나요?',
      en: 'How long does production take?',
    },
    answer: {
      ko: '고정 기간을 일괄 적용하지 않습니다. 영상 길이, 과학적 복잡도, 필요한 결과물, 검수 횟수와 자료 준비 상태를 확인한 뒤 일정을 산정합니다. 문의 브리프에 희망 공개일을 적으면 역산해 가능한 제작 범위를 제안합니다.',
      en: 'There is no single fixed timeline. The schedule is estimated after reviewing runtime, scientific complexity, required deliverables, review rounds, and source readiness. Add the desired launch date to the brief and we will propose a feasible scope by working backward from it.',
    },
  },
  {
    id: 'cost',
    question: {
      ko: '제작 비용은 어떻게 결정되나요?',
      en: 'How is project cost determined?',
    },
    answer: {
      ko: '영상 길이와 장면 수, 3D·시뮬레이션 난이도, 과학 리서치 범위, 수정·검수 횟수, 납품 규격과 사용 범위에 따라 맞춤 견적합니다. 문의 브리프의 1천만원 미만, 1천만–3천만원, 3천만–5천만원, 5천만원 이상 항목은 상담을 위한 예산 구간이며 고정 판매가가 아닙니다.',
      en: 'Quotes are based on runtime and scene count, 3D or simulation complexity, scientific research scope, revision and review rounds, delivery formats, and usage scope. The brief’s ranges of under KRW 10M, KRW 10M–30M, KRW 30M–50M, and KRW 50M+ are planning bands, not fixed prices.',
    },
  },
  {
    id: 'deliverables',
    question: {
      ko: '어떤 결과물을 납품할 수 있나요?',
      en: 'What deliverables can be provided?',
    },
    answer: {
      ko: '프로젝트에 따라 작용 기전 영상, 브랜드·제품 필름, 환자·의료진 교육 콘텐츠, 전시·인터랙티브 콘텐츠, 스틸 이미지, 채널별 리사이즈와 자막 파일을 구성할 수 있습니다. 실제 납품 범위와 원본 파일 제공 여부는 견적서와 계약 범위에서 확정합니다.',
      en: 'Depending on the project, deliverables may include MoA animation, brand or product films, patient and HCP education, exhibition or interactive content, still images, channel-specific versions, and subtitle files. The final scope and availability of source files are confirmed in the quotation and agreement.',
    },
  },
  {
    id: 'sources',
    question: {
      ko: '과학적 출처는 어떻게 기록하나요?',
      en: 'How are scientific sources documented?',
    },
    answer: {
      ko: '프로젝트 페이지에 사용한 PDB 구조, AlphaFold 참고 범위, 고객사 제공 자료 여부를 구분해 기록합니다. 공개 자료는 원문 링크를 제공하고, 미확인 내용은 임상 사실이나 성과로 표현하지 않습니다.',
      en: 'Each project records the PDB structure used, the role of AlphaFold references, and whether evidence came from the client. Public sources link to the original record, and unverified information is not presented as clinical fact or proven performance.',
    },
  },
  {
    id: 'ai-use',
    question: {
      ko: 'AI는 제작 과정에서 어떻게 사용하나요?',
      en: 'How is AI used in production?',
    },
    answer: {
      ko: 'AI는 리서치 정리, 초기 시각 탐색과 제작 보조에 사용할 수 있지만 구조 데이터, 고객사 근거와 사람의 검수를 대체하지 않습니다. AI 사용 여부와 결과물 권리 조건은 프로젝트 범위에 맞춰 별도로 확인합니다.',
      en: 'AI may support research organization, early visual exploration, and production, but it does not replace structural data, client evidence, or human review. AI usage and rights conditions are confirmed for each project scope.',
    },
  },
];
