import { useRef } from 'react';
import { useVideoScrub } from '../hooks/useVideoScrub';
import { useLang } from '../i18n/lang';
import { ui } from '../i18n/ui';

interface Props {
  /** Scroll-scrub enabled (desktop AND mobile). False only for reduced motion. */
  enabled: boolean;
  isMobile: boolean;
}

export function HeroVideo({ enabled, isMobile }: Props) {
  const { lang, t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useVideoScrub(sectionRef, videoRef, { enabled });

  // Desktop must never receive the mobile encode.
  const src = isMobile ? '/assets/BIO4-mobile.mp4' : '/assets/BIO4-desktop.mp4';

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`hero${enabled ? ' hero--scrub' : ''}`}
      aria-label="bbbb MEDICAL VISUAL — medicine, made visible"
    >
      <div className="hero-pin" data-hero-pin>
        <div className="hero-frame">
          <video
            ref={videoRef}
            className="hero-video"
            data-hero-video
            poster="/assets/BIO4-poster.jpg"
            muted
            playsInline
            preload="auto"
            autoPlay={!enabled}
            aria-hidden="true"
            tabIndex={-1}
            style={{ objectPosition: isMobile ? '50% 42%' : 'center center' }}
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>

        <div className="hero-copy shell">
          <p className="hero-eyebrow">{t(ui.hero.eyebrow)}</p>

          <div className="hero-stages">
            {ui.hero.stages.map((s, i) => (
              <div className="hero-stage" data-hero-stage key={i} aria-hidden={i !== 0}>
                <h1 className={`hero-title${s.lead ? ' hero-title--lead' : ''}`}>
                  {(lang === 'ko' ? s.ko : s.en).map((l) => (
                    <span className="hero-title-line" key={l}>
                      {l}
                    </span>
                  ))}
                </h1>
                {s.lead && (
                  <>
                    <p className="hero-sub">{t(ui.hero.sub)}</p>
                    <div className="hero-cta">
                      <a className="btn btn-solid" href="#work">
                        {t(ui.hero.viewWork)}
                      </a>
                      <a className="btn btn-line" href="#contact">
                        {t(ui.hero.startProject)}
                      </a>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="hero-indicator" data-hero-indicator aria-hidden="true">
          <span className="hero-indicator-label">{t(ui.hero.scroll)}</span>
          <span className="hero-indicator-line">
            <i />
          </span>
        </div>
      </div>
    </section>
  );
}
