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

  // Mobile uses a static, instantly readable hero. Desktop loads only video metadata
  // until the user starts scrolling the scrub sequence.
  const mp4 = isMobile ? '/assets/BIO4-mobile.mp4' : '/assets/BIO4-desktop.mp4';
  const webm = isMobile ? '/assets/BIO4-mobile.webm' : '/assets/BIO4-desktop.webm';

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
            preload={isMobile ? 'none' : 'metadata'}
            aria-hidden="true"
            tabIndex={-1}
            style={{ objectPosition: isMobile ? '50% 42%' : 'center center' }}
          >
            <source src={webm} type="video/webm" />
            <source src={mp4} type="video/mp4" />
          </video>
        </div>

        <div className="hero-copy shell">
          <p className="hero-eyebrow">{t(ui.hero.eyebrow)}</p>

          <div className="hero-stages">
            {ui.hero.stages.map((s, i) => {
              const TitleTag = i === 0 ? 'h1' : 'p';
              return (
                <div className="hero-stage" data-hero-stage key={i} aria-hidden={i !== 0}>
                  <TitleTag className={`hero-title${s.lead ? ' hero-title--lead' : ''}`}>
                    {(lang === 'ko' ? s.ko : s.en).map((l) => (
                      <span className="hero-title-line" key={l}>
                        {l}
                      </span>
                    ))}
                  </TitleTag>
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
              );
            })}
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
