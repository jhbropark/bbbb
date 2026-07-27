import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal } from '../hooks/useReveal';
import { useLang } from '../i18n/lang';
import { ui } from '../i18n/ui';

gsap.registerPlugin(ScrollTrigger);

export function VisualRnD({ reduced }: { reduced: boolean }) {
  const { lang, t } = useLang();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, !reduced);
  const headline = ui.rnd.headline[lang];

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.rnd-step', el).forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 70%',
          end: 'bottom 45%',
          onToggle: (self) => step.classList.toggle('is-active', self.isActive),
        });
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="rnd" className="section rnd" ref={ref}>
      <div className="shell">
        <p className="eyebrow rnd-eyebrow" data-reveal>
          {t(ui.rnd.eyebrow)}
        </p>
        <div className="rnd-head">
          <h2 className="rnd-headline" data-reveal>
            {headline.map((line, i) => (
              <span key={line}>
                {line}
                {i < headline.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="rnd-text" data-reveal>
            {t(ui.rnd.text)}
          </p>
        </div>

        <ol className="rnd-steps">
          {ui.rnd.stages.map((s) => (
            <li className="rnd-step" key={s.n} data-reveal>
              <span className="rnd-n">{s.n}</span>
              <span className="rnd-en">{t(s.en)}</span>
              <span className="rnd-ko">{t(s.desc)}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
