import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { BioField } from './BioField';
import { projects, projectEvidence, type Project } from '../data/brand';
import { useLang } from '../i18n/lang';
import { ui } from '../i18n/ui';

interface Props {
  reduced: boolean;
  isMobile: boolean;
}

/** Hover-to-play on desktop; play the single most-centred card on mobile. */
function WorkVideo({ src, poster, isMobile }: { src: string; poster: string; isMobile: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Video posters are requested eagerly by browsers even with preload="none".
  // Attach poster and source only when the card is close to the viewport.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          io.disconnect();
        }
      },
      { rootMargin: '800px 0px' },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    const wrap = wrapRef.current;
    if (!v || !wrap || !loaded) return;

    if (isMobile) {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause())),
        { threshold: 0.6 },
      );
      io.observe(wrap);
      return () => io.disconnect();
    }
    const enter = () => v.play().catch(() => {});
    const leave = () => {
      v.pause();
      v.currentTime = 0;
    };
    wrap.addEventListener('mouseenter', enter);
    wrap.addEventListener('mouseleave', leave);
    return () => {
      wrap.removeEventListener('mouseenter', enter);
      wrap.removeEventListener('mouseleave', leave);
    };
  }, [isMobile, loaded]);

  return (
    <div className="work-media" ref={wrapRef} data-cursor="Play">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster={loaded ? poster : undefined}
        aria-hidden="true"
      >
        {loaded && <source src={src} type="video/mp4" />}
      </video>
    </div>
  );
}

function Card({ p, i, isMobile }: { p: Project; i: number; isMobile: boolean }) {
  const { lang, t } = useLang();
  const evidence = projectEvidence(p);
  return (
    <Link
      to={`/${lang}/work/${p.slug}/`}
      className={`work-card work-card--${p.size}`}
      data-reveal
      data-cursor="View"
      aria-label={`${p.title} — ${t(p.category)} ${t(ui.work.viewAria)}`}
    >
      {p.media === 'video' && p.src && p.poster ? (
        <WorkVideo src={p.src} poster={p.poster} isMobile={isMobile} />
      ) : (
        <div className="work-media">
          <BioField seed={7 + i} scheme={p.scheme || 'blue'} />
        </div>
      )}
      <div className="work-meta">
        <span className="work-type">{t(evidence.type)}</span>
        <h3 className="work-title">{p.title}</h3>
        <p className="work-cat">
          {t(p.category)} · {t(p.kind)}
        </p>
        <p className="work-desc">{t(p.intent)}</p>
        <span className="work-more">
          {t(ui.work.more)} <ArrowUpRight size={15} strokeWidth={2} />
        </span>
      </div>
    </Link>
  );
}

export function SelectedWork({ reduced, isMobile }: Props) {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, !reduced);

  return (
    <section id="work" className="section work" ref={ref}>
      <div className="shell work-head">
        <p className="eyebrow" data-reveal>
          {t(ui.work.eyebrow)}
        </p>
      </div>
      <div className="shell work-grid">
        {projects.map((p, i) => (
          <Card key={p.title} p={p} i={i} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}
