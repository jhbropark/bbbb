import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useLang } from '../i18n/lang';
import { Loader } from '../components/Loader';
import { Header } from '../components/Header';
import { HeroVideo } from '../components/HeroVideo';
import { TranslationManifesto } from '../components/TranslationManifesto';
import { SelectedWork } from '../components/SelectedWork';
import { TranslationFramework } from '../components/TranslationFramework';
import { VisualRnD } from '../components/VisualRnD';
import { Capabilities } from '../components/Capabilities';
import { Process } from '../components/Process';
import { StudioStatement } from '../components/StudioStatement';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { applySeo, SITE_URL } from '../seo';

// Preview/deep-link aid: `?static` disables Lenis + hero pin (opt-in only).
const FORCE_STATIC =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('static');

if (FORCE_STATIC && typeof document !== 'undefined') {
  document.documentElement.classList.add('static-preview');
}

// The brand intro plays once per browser session — coming back from a detail
// page should not replay it.
const INTRO_KEY = 'bbbb-intro-shown';
const introAlreadyShown =
  typeof sessionStorage !== 'undefined' && sessionStorage.getItem(INTRO_KEY) === '1';

export default function Home() {
  const { lang } = useLang();
  const location = useLocation();
  const reduced = useReducedMotion() || FORCE_STATIC;
  const isMobile = useMediaQuery('(max-width: 768px)');
  // Mobile keeps the message and CTA visible without requiring a scrub gesture.
  const heroEnabled = !reduced && !isMobile;

  useSmoothScroll(!reduced && !isMobile);

  useEffect(() => {
    const ko = lang === 'ko';
    const title = ko
      ? 'bbbb MEDICAL VISUAL — 의학을 이해하는 언어로'
      : 'bbbb MEDICAL VISUAL — Medicine, Made Visible';
    const description = ko
      ? '제약·바이오·메디컬 뷰티 기술을 정확하고 설득력 있는 시각 경험으로 번역하는 메디컬 비주얼 스튜디오.'
      : 'A medical visualization studio translating pharma, biotech, and medical beauty technology into accurate, persuasive visual experiences.';
    applySeo({
      title,
      description,
      path: `/${lang}/`,
      lang,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'bbbb MEDICAL VISUAL',
        url: SITE_URL,
        email: 'im@bbbb.beauty',
        areaServed: 'Worldwide',
        address: { '@type': 'PostalAddress', addressLocality: 'Seoul', addressCountry: 'KR' },
      },
    });
  }, [lang, location.pathname]);

  const skipIntro = FORCE_STATIC || introAlreadyShown || isMobile;
  const [progress, setProgress] = useState(skipIntro ? 100 : 0);
  const [done, setDone] = useState(skipIntro);
  const [loaderGone, setLoaderGone] = useState(skipIntro);

  useEffect(() => {
    if (skipIntro) return;
    let p = 0;
    const id = window.setInterval(() => {
      p = Math.min(100, p + (100 - p) * 0.14 + 2.5);
      setProgress(p);
      if (p >= 99.4) {
        window.clearInterval(id);
        setProgress(100);
        window.setTimeout(() => setDone(true), 260);
      }
    }, 95);
    const safety = window.setTimeout(() => {
      setProgress(100);
      setDone(true);
    }, 3200);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(safety);
    };
  }, [skipIntro]);

  useEffect(() => {
    document.body.style.overflow = loaderGone ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loaderGone]);

  useEffect(() => {
    if (!loaderGone) return;
    if (typeof sessionStorage !== 'undefined') sessionStorage.setItem(INTRO_KEY, '1');
    const t = window.setTimeout(() => {
      ScrollTrigger.refresh();
      const hash = window.location.hash;
      if (hash.length > 1) {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }, 160);
    return () => window.clearTimeout(t);
  }, [loaderGone, heroEnabled]);

  // KO and EN text wrap to different heights — recalc pins/triggers on switch.
  useEffect(() => {
    if (!loaderGone) return;
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 140);
    return () => window.clearTimeout(t);
  }, [lang, loaderGone]);

  return (
    <>
      {!loaderGone && <Loader progress={progress} done={done} onExit={() => setLoaderGone(true)} />}

      <Header />

      <main id="main-content">
        <HeroVideo enabled={heroEnabled} isMobile={isMobile} />
        <TranslationManifesto reduced={reduced} />
        <SelectedWork reduced={reduced} isMobile={isMobile} />
        <TranslationFramework reduced={reduced} />
        <VisualRnD reduced={reduced} />
        <Capabilities reduced={reduced} />
        <Process reduced={reduced} />
        <StudioStatement reduced={reduced} />
        <Contact reduced={reduced} />
      </main>

      <Footer />
    </>
  );
}
