/**
 * Single source of truth for brand copy, contact and projects.
 * Translatable strings are bilingual ({ ko, en }); resolve them with
 * `useLang().t(...)`. Edit here to change wording across the whole site.
 */
import type { L } from '../i18n/lang';

export const brand = {
  name: 'bbbb',
  suffix: 'MEDICAL VISUAL',
  full: 'bbbb MEDICAL VISUAL',
  email: 'im@bbbb.beauty',
  location: { ko: '대한민국 서울', en: 'Seoul, South Korea' } as L,
  sloganEn: 'MEDICINE, MADE VISIBLE.',
  sloganKo: ['의학을,', '이해하는 언어로 옮깁니다.'],
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/bbbb.beauty_official/' },
    { label: 'YouTube', href: 'https://www.youtube.com/@bbbb.beauty' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bbbbbeauty-jay/' },
  ],
  sales: 'https://sales.bbbb.beauty/',
};

export const nav: { label: L; href: string }[] = [
  { label: { ko: '작업', en: 'Work' }, href: '#work' },
  { label: { ko: '접근', en: 'Approach' }, href: '#framework' },
  { label: { ko: '연구개발', en: 'R&D' }, href: '#rnd' },
  { label: { ko: '스튜디오', en: 'Studio' }, href: '#studio' },
];

export type Project = {
  slug: string;
  title: string;
  category: L;
  kind: L;
  intent: L;
  media: 'video' | 'field';
  src?: string;
  poster?: string;
  scheme?: 'blue' | 'teal' | 'navy' | 'silver';
  size: 'feature' | 'tall' | 'wide';
  /** Detail-page content, grounded in real PDB structures + AlphaFold. */
  detail: {
    year: string;
    discipline: L;
    /** Longer overview shown on the detail page. */
    overview: L;
    /** Reference structure from the Protein Data Bank. */
    structure: { pdb: string; name: L; note: L };
    /** How AlphaFold relates to / extends this subject. */
    alphafold: L;
    /** bbbb's visual translation approach for this subject. */
    approach: L;
  };
};

/**
 * Detail content references real, verifiable entries:
 *  - PDB (Protein Data Bank, rcsb.org) — experimentally determined structures.
 *  - AlphaFold (DeepMind, Nature 2021 / AlphaFold DB with EMBL-EBI, 200M+ models;
 *    AlphaFold3, 2024, predicts protein–DNA/ligand/antibody complexes).
 * These are used as study references for visual R&D, not as clinical claims.
 */
export const projects: Project[] = [
  {
    slug: 'molecular-intelligence',
    title: 'Molecular Intelligence',
    category: { ko: '메디컬 비주얼라이제이션', en: 'Medical Visualization' },
    kind: { ko: '작용 기전 (MoA)', en: 'Mechanism of Action' },
    intent: {
      ko: '분자 수준의 치료 작용을 하나의 시네마틱 흐름으로.',
      en: 'Molecular-scale therapy as a single cinematic flow.',
    },
    media: 'video',
    src: '/assets/BIO4-desktop.mp4',
    poster: '/assets/BIO4-poster.jpg',
    size: 'feature',
    detail: {
      year: '2025',
      discipline: { ko: '분자 의학', en: 'Molecular Medicine' },
      overview: {
        ko: '약물이 표적 단백질에 결합해 작동하는 순간을 하나의 시네마틱 흐름으로 재구성한 대표 필름입니다. 실험적으로 규명된 구조(PDB)와 AlphaFold가 예측한 구조를 함께 참고해, 단백질의 형태·결합 포켓·구조 변화를 임의로 상상하지 않고 근거 위에서 시각화합니다.',
        en: 'Our flagship film reconstructs the moment a drug binds its target protein into one cinematic flow. Drawing on both experimentally determined structures (PDB) and AlphaFold predictions, we visualize protein shape, binding pockets, and conformational change on evidence rather than guesswork.',
      },
      structure: {
        pdb: 'PDB · rcsb.org',
        name: { ko: 'Protein Data Bank', en: 'Protein Data Bank' },
        note: {
          ko: '전 세계 단백질·핵산의 실험 구조 약 22만+ 건이 축적된 공개 저장소. 결합 포켓과 리간드 좌표를 실제 구조 데이터에서 가져옵니다.',
          en: 'The public archive of ~220,000+ experimental structures of proteins and nucleic acids. Binding pockets and ligand coordinates come from real structural data.',
        },
      },
      alphafold: {
        ko: 'AlphaFold2(DeepMind, Nature 2021)와 2억 개 이상의 예측 구조가 담긴 AlphaFold DB를 레퍼런스로, 실험 구조가 아직 없는 표적도 구조 기반으로 다룹니다. 잔기별 신뢰도 지표인 pLDDT의 색상 체계를 브랜드 컬러 언어로 재해석했습니다.',
        en: 'Using AlphaFold2 (DeepMind, Nature 2021) and the 200M+ models in the AlphaFold DB as reference, we handle targets that lack an experimental structure. We reinterpret the per-residue pLDDT confidence coloring as part of our brand color language.',
      },
      approach: {
        ko: '반투명 재질·서브서피스 스캐터링·굴절로 분자 표면을 표현하고, 결합이 일어나는 순간에만 강한 모션을 집중시킵니다.',
        en: 'Translucent materials, subsurface scattering, and refraction render the molecular surface; strong motion is concentrated only at the moment of binding.',
      },
    },
  },
  {
    slug: 'genetic-interface',
    title: 'Genetic Interface',
    category: { ko: '메디컬 R&D', en: 'Medical R&D' },
    kind: { ko: '유전자 치료', en: 'Gene Therapy' },
    intent: {
      ko: '유전자 치료의 원리를 읽히는 인터페이스로 번역.',
      en: 'Translating gene therapy into a readable interface.',
    },
    media: 'video',
    src: '/assets/work-crispr.mp4',
    poster: '/assets/work-crispr-poster.jpg',
    size: 'tall',
    detail: {
      year: '2025',
      discipline: { ko: '유전자 편집', en: 'Gene Editing' },
      overview: {
        ko: 'CRISPR-Cas9가 가이드 RNA를 따라 표적 DNA를 인식하고 절단하는 과정을, 읽히는 인터페이스 언어로 옮긴 프로젝트입니다.',
        en: 'A project that translates how CRISPR-Cas9 follows its guide RNA to recognize and cut target DNA into a readable interface language.',
      },
      structure: {
        pdb: 'PDB 4OO8',
        name: { ko: 'SpCas9–가이드 RNA–표적 DNA', en: 'SpCas9–sgRNA–target DNA' },
        note: {
          ko: 'Nishimasu 외(2014)가 규명한 Streptococcus pyogenes Cas9와 가이드 RNA·표적 DNA의 복합체 구조. Cas9의 인식·절단 메커니즘을 이 좌표에서 참고합니다.',
          en: 'The Streptococcus pyogenes Cas9 complex with guide RNA and target DNA solved by Nishimasu et al. (2014). We reference Cas9’s recognition and cleavage mechanism from these coordinates.',
        },
      },
      alphafold: {
        ko: 'AlphaFold-Multimer와 AlphaFold3(2024)로 Cas 변이체·염기교정 효소(base editor) 등 아직 결정화되지 않은 복합체의 형태를 예측 참고해 확장합니다.',
        en: 'We extend the work by referencing AlphaFold-Multimer and AlphaFold3 (2024) predictions of not-yet-crystallized complexes such as Cas variants and base editors.',
      },
      approach: {
        ko: '가이드 RNA의 흐름을 리본으로, 이중나선의 절단 순간을 빛의 균열로 표현합니다.',
        en: 'The guide RNA flows as a ribbon; the moment the double helix is cut reads as a fracture of light.',
      },
    },
  },
  {
    slug: 'cellular-repair',
    title: 'Cellular Repair',
    category: { ko: '메디컬 비주얼라이제이션', en: 'Medical Visualization' },
    kind: { ko: '나노의학', en: 'Nanomedicine' },
    intent: {
      ko: '나노 스케일 약물 전달을 이해하는 시각 언어로.',
      en: 'A visual language for understanding nanoscale drug delivery.',
    },
    media: 'video',
    src: '/assets/work-nano.mp4',
    poster: '/assets/work-nano-poster.jpg',
    size: 'wide',
    detail: {
      year: '2024',
      discipline: { ko: '나노의학', en: 'Nanomedicine' },
      overview: {
        ko: '단백질 나노케이지를 이용한 나노 스케일 약물 전달의 개념을, 대칭 기하학과 내부-외부 레이어로 이해할 수 있게 시각화했습니다.',
        en: 'We visualize the concept of nanoscale drug delivery via protein nanocages through symmetric geometry and inner/outer layering.',
      },
      structure: {
        pdb: 'PDB 1FHA',
        name: { ko: '인간 페리틴', en: 'Human ferritin' },
        note: {
          ko: '24개 소단위가 이루는 대칭 나노케이지 페리틴. 내부 공동에 물질을 담을 수 있어 약물 전달체 연구의 대표 골격으로 쓰입니다.',
          en: 'Ferritin — a symmetric nanocage of 24 subunits. Its inner cavity can hold cargo, making it a model scaffold for drug-carrier research.',
        },
      },
      alphafold: {
        ko: '자기조립 단백질·엔지니어링된 나노운반체를 AlphaFold로 설계·검증하는 흐름을 참고해, 실재하는 단백질 공학에 뿌리를 둡니다.',
        en: 'We ground the work in real protein engineering, referencing how self-assembling proteins and engineered nanocarriers are designed and validated with AlphaFold.',
      },
      approach: {
        ko: '정이십면체 대칭의 기하학과 반투명 껍질, 담지된 물질의 내부 광원을 재질 언어로 사용합니다.',
        en: 'Icosahedral symmetry, a translucent shell, and an inner light source from the loaded cargo form the material language.',
      },
    },
  },
  {
    slug: 'cellular-defense',
    title: 'Cellular Defense',
    category: { ko: '컨셉 스터디', en: 'Concept Study' },
    kind: { ko: '면역항암', en: 'Immuno-Oncology' },
    intent: {
      ko: '면역항암의 긴장과 리듬을 담은 습작.',
      en: 'A study capturing the tension and rhythm of immuno-oncology.',
    },
    media: 'video',
    src: '/assets/work-defense.mp4',
    poster: '/assets/work-defense-poster.jpg',
    size: 'tall',
    detail: {
      year: '2024',
      discipline: { ko: '면역항암', en: 'Immuno-Oncology' },
      overview: {
        ko: '면역세포와 종양세포 사이의 인식과 회피, 그리고 체크포인트 차단이 만드는 긴장과 리듬을 담은 컨셉 습작입니다.',
        en: 'A concept study capturing recognition and evasion between immune and tumor cells, and the tension and rhythm created by checkpoint blockade.',
      },
      structure: {
        pdb: 'PDB 4ZQK',
        name: { ko: 'PD-1 / PD-L1 복합체', en: 'PD-1 / PD-L1 complex' },
        note: {
          ko: '면역 회피의 핵심 상호작용인 PD-1과 PD-L1의 결합 구조. 다수 면역항암제(체크포인트 억제제)가 겨냥하는 접점입니다.',
          en: 'The binding structure of PD-1 and PD-L1, a key interaction in immune evasion — the contact point targeted by many checkpoint-inhibitor immunotherapies.',
        },
      },
      alphafold: {
        ko: 'AlphaFold3(2024)로 항체–항원(Fab–antigen) 복합체를 예측해, 신규 결합 부위 탐색의 시각적 은유로 삼습니다.',
        en: 'We use AlphaFold3 (2024) predictions of antibody–antigen (Fab–antigen) complexes as a visual metaphor for the search for new binding sites.',
      },
      approach: {
        ko: '세포 표면의 접촉과 인식, 항체의 Y자 실루엣을 대비와 리듬으로 구성합니다.',
        en: 'Cell-surface contact and recognition, and the Y-shaped silhouette of the antibody, are composed through contrast and rhythm.',
      },
    },
  },
  {
    slug: 'tissue-scaffold',
    title: 'Tissue Scaffold',
    category: { ko: '메디컬 R&D', en: 'Medical R&D' },
    kind: { ko: '재생의학', en: 'Regenerative Medicine' },
    intent: {
      ko: '조직 재생 치료 공정을 정밀한 장면으로 설계.',
      en: 'Designing the tissue-regeneration process as precise scenes.',
    },
    media: 'video',
    src: '/assets/work-scaffold.mp4',
    poster: '/assets/work-scaffold-poster.jpg',
    size: 'wide',
    detail: {
      year: '2024',
      discipline: { ko: '재생의학', en: 'Regenerative Medicine' },
      overview: {
        ko: '조직 재생과 바이오프린팅이 기대는 세포외기질(ECM)의 골격 — 콜라겐 섬유의 결과 직조를 정밀한 장면으로 설계했습니다.',
        en: 'The extracellular-matrix (ECM) scaffold that tissue regeneration and bioprinting rely on — we design the grain and weave of collagen fibers as precise scenes.',
      },
      structure: {
        pdb: 'PDB 1BKV',
        name: { ko: '콜라겐 삼중나선', en: 'Collagen triple helix' },
        note: {
          ko: '세포외기질의 기본 구조 단위인 콜라겐 삼중나선 모델 펩타이드. 조직의 강도와 결을 만드는 반복 구조입니다.',
          en: 'A collagen triple-helix model peptide — the basic structural unit of the extracellular matrix, whose repeating structure gives tissue its strength and grain.',
        },
      },
      alphafold: {
        ko: '콜라겐·엘라스틴처럼 반복 서열을 가진 구조 단백질의 예측에서 AlphaFold의 강점과 한계를 함께 참고합니다.',
        en: 'We reference both the strengths and the limits of AlphaFold in predicting structural proteins with repetitive sequences, such as collagen and elastin.',
      },
      approach: {
        ko: '섬유 다발의 결과 층, 성장·직조되는 방향성 모션을 중심 언어로 씁니다.',
        en: 'The grain and layering of fiber bundles, and directional motion of growth and weaving, are the core language.',
      },
    },
  },
  {
    slug: 'signal-cascade',
    title: 'Signal Cascade',
    category: { ko: '컨셉 스터디', en: 'Concept Study' },
    kind: { ko: '약물 작용 기전', en: 'Drug Mechanism' },
    intent: {
      ko: '약물 신호 전달을 빛의 연쇄로 시각화.',
      en: 'Visualizing drug signal transduction as a cascade of light.',
    },
    media: 'video',
    src: '/assets/work-signal.mp4',
    poster: '/assets/work-signal-poster.jpg',
    size: 'tall',
    detail: {
      year: '2023',
      discipline: { ko: '세포 신호전달', en: 'Cell Signaling' },
      overview: {
        ko: '세포막 수용체에서 시작되는 약물 신호 전달을, 세포 안팎으로 번지는 빛의 연쇄로 시각화한 습작입니다.',
        en: 'A study visualizing drug signal transduction — starting at a membrane receptor — as a cascade of light spreading in and out of the cell.',
      },
      structure: {
        pdb: 'PDB 2RH1',
        name: { ko: 'β2-아드레날린 수용체', en: 'β2-adrenergic receptor' },
        note: {
          ko: '최초로 고해상도로 규명된 인간 GPCR 구조. 수많은 약물이 겨냥하는 막관통 수용체 계열의 대표 좌표입니다.',
          en: 'The first human GPCR solved at high resolution — a landmark set of coordinates for the transmembrane receptor family that so many drugs target.',
        },
      },
      alphafold: {
        ko: '막단백질·GPCR 예측이 어려웠던 지점과 그 진전을, 신호가 번지는 시각적 은유로 옮깁니다.',
        en: 'We translate the difficulty — and the progress — of predicting membrane proteins and GPCRs into a visual metaphor of spreading signal.',
      },
      approach: {
        ko: '막관통 나선의 다발과, 세포 안팎으로 확산되는 신호의 파동을 표현합니다.',
        en: 'We express the bundle of transmembrane helices and the wave of signal diffusing across the cell.',
      },
    },
  },
  {
    slug: 'microbial-systems',
    title: 'Microbial Systems',
    category: { ko: '메디컬 비주얼라이제이션', en: 'Medical Visualization' },
    kind: { ko: '마이크로바이옴', en: 'Microbiome' },
    intent: {
      ko: '마이크로바이옴과 감염의 세계를 감각적으로 재구성.',
      en: 'Reimagining the world of the microbiome and infection.',
    },
    media: 'video',
    src: '/assets/work-microbial.mp4',
    poster: '/assets/work-microbial-poster.jpg',
    size: 'wide',
    detail: {
      year: '2023',
      discipline: { ko: '미생물학 · 바이러스학', en: 'Microbiology · Virology' },
      overview: {
        ko: '마이크로바이옴과 감염의 세계 — 바이러스 표면 단백질의 대칭과 당사슬을 감각적으로 재구성했습니다.',
        en: 'The world of the microbiome and infection — we reimagine the symmetry and glycans of a viral surface protein.',
      },
      structure: {
        pdb: 'PDB 6VSB',
        name: { ko: 'SARS-CoV-2 스파이크 (융합 전)', en: 'SARS-CoV-2 spike (prefusion)' },
        note: {
          ko: 'Wrapp 외(2020)가 규명한 코로나바이러스 스파이크 단백질의 융합 전 구조. 감염 기전과 백신 설계의 핵심 표적입니다.',
          en: 'The prefusion structure of the coronavirus spike protein solved by Wrapp et al. (2020) — a key target for infection mechanism and vaccine design.',
        },
      },
      alphafold: {
        ko: '2020년 DeepMind가 실험 구조 공개 이전에 SARS-CoV-2 단백질(ORF3a·ORF8 등)을 예측·공개했던 사례를, 예측이 현실을 앞서간 순간의 레퍼런스로 삼습니다.',
        en: 'We reference the moment prediction outran reality: in 2020 DeepMind released AlphaFold predictions of SARS-CoV-2 proteins (ORF3a, ORF8, and others) before experimental structures were available.',
      },
      approach: {
        ko: '스파이크의 삼량체 대칭과 표면 당사슬(glycan)의 질감을 시각 언어로 사용합니다.',
        en: 'The trimeric symmetry of the spike and the texture of its surface glycans become the visual language.',
      },
    },
  },
  {
    slug: 'threads-of-life',
    title: 'Threads of Life',
    category: { ko: '메디컬 R&D', en: 'Medical R&D' },
    kind: { ko: '유전체 의학', en: 'Genomic Medicine' },
    intent: {
      ko: 'DNA와 유전 정보를 감각적 리듬으로 재해석한 실험.',
      en: 'An experiment reinterpreting DNA and genetic information as rhythm.',
    },
    media: 'video',
    src: '/assets/work-dna1.mp4',
    poster: '/assets/work-dna1-poster.jpg',
    size: 'tall',
    detail: {
      year: '2023',
      discipline: { ko: '유전체 의학', en: 'Genomic Medicine' },
      overview: {
        ko: 'DNA 이중나선과 유전 정보를, 나선의 주기성과 염기쌍의 리듬으로 재해석한 실험입니다.',
        en: 'An experiment reinterpreting the DNA double helix and genetic information through the periodicity of the helix and the rhythm of base pairs.',
      },
      structure: {
        pdb: 'PDB 1BNA',
        name: { ko: 'B형 DNA 12량체', en: 'B-form DNA dodecamer' },
        note: {
          ko: 'Drew·Dickerson(1981)의 B형 DNA 12량체. 교과서적 이중나선의 표준 참조 구조로, 나선의 피치와 홈(groove)을 여기서 가져옵니다.',
          en: 'The Drew–Dickerson B-form DNA dodecamer (1981) — the textbook reference for the double helix, from which we take the pitch and grooves of the helix.',
        },
      },
      alphafold: {
        ko: 'AlphaFold3(2024)가 단백질–DNA 복합체까지 예측하게 된 흐름을 반영해, 서열이 구조가 되는 과정을 시각화합니다.',
        en: 'Reflecting how AlphaFold3 (2024) came to predict protein–DNA complexes, we visualize the process of sequence becoming structure.',
      },
      approach: {
        ko: '나선의 주기성, 주홈·부홈의 대비, 염기쌍의 규칙적 리듬을 핵심으로 구성합니다.',
        en: 'The periodicity of the helix, the contrast of major and minor grooves, and the regular rhythm of base pairs form the core.',
      },
    },
  },
];

export function projectEvidence(project: Project) {
  const concept = project.category.en === 'Concept Study';
  return {
    type: concept
      ? ({ ko: '콘셉트 스터디', en: 'Concept Study' } as L)
      : ({ ko: '자체 R&D', en: 'Self-initiated R&D' } as L),
    scope: {
      ko: '비주얼 리서치 · 아트 디렉션 · CGI 제작',
      en: 'Visual research · Art direction · CGI production',
    } as L,
    deliverables: concept
      ? ({ ko: '콘셉트 필름 · 비주얼 시스템', en: 'Concept film · Visual system' } as L)
      : ({ ko: 'R&D 필름 · 비주얼 시스템', en: 'R&D film · Visual system' } as L),
    review: {
      ko: '공개 구조 데이터 기반 내부 검토 · 외부 의료 전문가 검수 미포함',
      en: 'Internal review based on public structural data · No external medical review',
    } as L,
    duration: {
      ko: '내부 연구 프로젝트 · 기간 비공개',
      en: 'Internal research project · Duration not published',
    } as L,
  };
}

export const capabilities: { title: L; desc: L }[] = [
  {
    title: { ko: '메디컬 비주얼라이제이션', en: 'Medical Visualization' },
    desc: {
      ko: '질환·해부·치료 메커니즘을 정확하고 명료하게 보여줍니다.',
      en: 'We show disease, anatomy, and mechanisms with accuracy and clarity.',
    },
  },
  {
    title: { ko: '작용 기전 시각화', en: 'Mechanism of Action' },
    desc: {
      ko: '약물과 치료의 작용 원리를 설득력 있는 시각으로 설명합니다.',
      en: 'We explain how drugs and therapies work — persuasively and visually.',
    },
  },
  {
    title: { ko: '환자·의료진 교육', en: 'Patient & HCP Education' },
    desc: {
      ko: '복잡한 의학을 환자와 의료진이 이해하도록 전달합니다.',
      en: 'We make complex medicine clear for patients and healthcare professionals.',
    },
  },
  {
    title: { ko: '메디컬 R&D 비주얼', en: 'Medical R&D Visual' },
    desc: {
      ko: '아직 정의되지 않은 치료·기술을 위한 고유한 시각 언어를 개발합니다.',
      en: 'We develop original visual language for therapies and technologies not yet defined.',
    },
  },
];

export const tools = ['Houdini', 'Blender', 'Procedural CGI', 'AI-assisted', 'VFX', 'Real-time'];
