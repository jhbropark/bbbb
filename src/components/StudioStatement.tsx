import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useLang } from '../i18n/lang';
import { ui } from '../i18n/ui';

export function StudioStatement({ reduced }: { reduced: boolean }) {
  const { lang, t } = useLang();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, !reduced);
  const headline = ui.studio.headline[lang];

  return (
    <section id="studio" className="section statement" ref={ref}>
      <div className="shell statement-inner">
        <h2 className="statement-headline" data-reveal>
          {headline.map((line, i) => (
            <span key={line}>
              {line}
              {i < headline.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <div className="statement-body">
          <p data-reveal>{t(ui.studio.l1)}</p>
          <p data-reveal>{t(ui.studio.l2)}</p>
          <p className="statement-close" data-reveal>
            {t(ui.studio.close)}
          </p>
        </div>
      </div>
    </section>
  );
}
