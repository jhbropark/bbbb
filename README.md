# bbbb MEDICAL VISUAL

의료·헬스케어와 사람 사이를 연결하는 메디컬 비주얼 스튜디오 공식 홈페이지.
**Medicine, made visible.**

- 홈(`/`) + 프로젝트별 상세페이지(`/work/:slug`) 라우팅(react-router-dom).
- 상세 콘텐츠는 실제 **PDB(Protein Data Bank)** 구조와 **AlphaFold**를 학습 레퍼런스로 인용(임상 효능 주장 아님).
- 정적 호스팅용 SPA fallback: `public/_redirects`.

React + Vite + TypeScript + GSAP(ScrollTrigger) + Lenis 로 만든 단일 페이지 사이트입니다.

## 실행

```bash
npm install
# npm 신규 보안정책이 esbuild postinstall 을 막으면 한 번만:
node node_modules/esbuild/install.js
npm run dev      # http://localhost:5173
npm run lint     # ESLint (0 errors)
npm run build    # tsc --noEmit + vite build → dist/
npm run preview  # 빌드 미리보기
```

## 수정 위치 (한 곳에서 관리)

- **브랜드명·슬로건·이메일·소셜**: `src/data/brand.ts` → `brand`
- **내비게이션**: `src/data/brand.ts` → `nav`
- **프로젝트(Selected Work)**: `src/data/brand.ts` → `projects`
  - 실제 클라이언트 작업이 아니면 `category: 'Medical R&D'`, `kind: 'Concept Study'` 등으로 정직하게 표기합니다(가짜 고객/수상 금지).
- **역량·툴**: `src/data/brand.ts` → `capabilities`, `tools`
- **색·타이포·간격 토큰**: `src/styles/globals.css` `:root`

## 히어로 영상 교체

`public/assets/` 의 파일만 교체하면 됩니다(파일명 유지 시 코드 수정 불필요).

| 파일 | 용도 |
|---|---|
| `BIO4-desktop.mp4` | 데스크톱 히어로(스크럽) — 1920×1080, g15, 고화질 |
| `BIO4-mobile.mp4` | 모바일 히어로(스크럽) — 1280×720 |
| `BIO4-poster.jpg` | 히어로 포스터(고화질) |
| `work-dna1/2.mp4` (+poster) | Selected Work 영상 카드 |

권장 인코딩(데스크톱, 스크럽 친화):

```bash
ffmpeg -y -i 원본.mp4 -an -vf "scale=1920:1080:flags=lanczos" \
  -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -profile:v high \
  -g 15 -keyint_min 15 -sc_threshold 0 -movflags +faststart \
  public/assets/BIO4-desktop.mp4
```

- 영상은 `object-fit: cover` + `scale:1` 로만 표시됩니다(확대·blur·overlay 없음).
- 데스크톱은 절대 모바일 파일을 쓰지 않습니다(`HeroVideo.tsx` 의 source 선택).

## 구조

```
src/
  components/  Header Loader HeroVideo TranslationManifesto SelectedWork
               TranslationFramework VisualRnD Capabilities Process
               StudioStatement Contact Footer BioField
  hooks/       useSmoothScroll useVideoScrub useReveal useReducedMotion useMediaQuery
  data/        brand.ts (브랜드·프로젝트·역량)
  styles/      globals.css
  App.tsx main.tsx
```

## 스크롤 / 모바일

- Lenis 스무스 스크롤 ↔ GSAP ScrollTrigger 연동.
- 히어로는 데스크톱·모바일 **모두** 스크롤 스크럽(`useVideoScrub`).
  - `100svh` 기준 pin(주소창 변화에 안정), `loadedmetadata` 이후에만 seek,
    `!video.seeking` 병합 + rAF 보간(빠른 스크롤에서도 프레임이 뿌옇지 않음),
    `orientationchange`/resize 시 `ScrollTrigger.refresh()`.
- `prefers-reduced-motion` 에서는 스크럽을 끄고 포스터 + 텍스트만 유지.

## 배포

`dist/` 를 정적 호스팅에 올리면 됩니다(Vercel / Netlify / Cloudflare Pages).
가장 쉬운 방법: **Netlify Drop**(https://app.netlify.com/drop) 에 `dist` 폴더 또는
프로젝트 루트의 `../bbbb-biovisual-site.zip` 을 드래그.

## 남은 개선(다음 패스)

- 히어로/섹션의 **Three.js(R3F) WebGL "translation field"** 레이어(현재는
  성능·안정성을 위해 canvas 2D `BioField` 사용). 품질 티어·저사양 fallback 포함해
  추가 예정.
