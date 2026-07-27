import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { BioField } from './BioField';
import { useLang } from '../i18n/lang';
import { ui } from '../i18n/ui';

export function TranslationFramework({ reduced }: { reduced: boolean }) {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, !reduced);

  return (
    <section id="framework" className="section framework" ref={ref}>
      <div className="shell">
        <p className="eyebrow" data-reveal>
          {t(ui.framework.eyebrow)}
        </p>
      </div>

      <ul className="fw-list">
        {ui.framework.axes.map((a, i) => (
          <li className="fw-row" key={a.n} data-reveal>
            <BioField className="fw-bg" seed={i + 3} scheme={a.scheme} />
            <div className="shell fw-row-inner">
              <span className="fw-n">{a.n}</span>
              <h3 className="fw-title">{t(a.title)}</h3>
              <p className="fw-desc">{t(a.desc)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
