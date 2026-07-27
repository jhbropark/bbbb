import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal } from '../hooks/useReveal';
import { useLang } from '../i18n/lang';
import { ui } from '../i18n/ui';

gsap.registerPlugin(ScrollTrigger);

export function Process({ reduced }: { reduced: boolean }) {
  const { lang, t } = useLang();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, !reduced);
  const headline = ui.process.headline[lang];

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      const line = el.querySelector<HTMLElement>('.proc-line-fill');
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 58%', end: 'bottom 78%', scrub: true },
          },
        );
      }
      gsap.utils.toArray<HTMLElement>('.proc-step', el).forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 66%',
          end: 'bottom 42%',
          onToggle: (self) => step.classList.toggle('is-active', self.isActive),
        });
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="process" className="section process" ref={ref}>
      <div className="shell">
        <h2 className="proc-headline" data-reveal>
          {headline.map((line, i) => (
            <span key={line}>
              {line}
              {i < headline.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <div className="proc-wrap">
          <div className="proc-line" aria-hidden="true">
            <span className="proc-line-fill" />
          </div>
          <ol className="proc-steps">
            {ui.process.steps.map((s) => (
              <li className="proc-step" key={s.n} data-reveal>
                <span className="proc-dot" aria-hidden="true" />
                <span className="proc-n">{s.n}</span>
                <div className="proc-body">
                  <h3 className="proc-title">{t(s.title)}</h3>
                  <p className="proc-desc">{t(s.desc)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
