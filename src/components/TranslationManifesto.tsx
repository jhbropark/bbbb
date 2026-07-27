import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useLang } from '../i18n/lang';
import { ui } from '../i18n/ui';

export function TranslationManifesto({ reduced }: { reduced: boolean }) {
  const { lang, t } = useLang();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, !reduced);
  const headline = ui.manifesto.headline[lang];

  return (
    <section id="manifesto" className="section manifesto" ref={ref}>
      <div className="shell manifesto-grid">
        <p className="eyebrow" data-reveal>
          {t(ui.manifesto.eyebrow)}
        </p>
        <div className="manifesto-body">
          <h2 className="manifesto-headline">
            {headline.map((line) => (
              <span data-reveal key={line}>
                {line}
              </span>
            ))}
          </h2>
          <div className="manifesto-lines">
            <p data-reveal>{t(ui.manifesto.l1)}</p>
            <p data-reveal>{t(ui.manifesto.l2)}</p>
            <p data-reveal>{t(ui.manifesto.l3)}</p>
            <p className="manifesto-close" data-reveal>
              {t(ui.manifesto.close)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
