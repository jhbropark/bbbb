import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { capabilities, tools } from '../data/brand';
import { useLang } from '../i18n/lang';
import { ui } from '../i18n/ui';

export function Capabilities({ reduced }: { reduced: boolean }) {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, !reduced);

  return (
    <section id="capabilities" className="section capabilities" ref={ref}>
      <div className="shell">
        <p className="eyebrow" data-reveal>
          {t(ui.capabilities.eyebrow)}
        </p>

        <ul className="cap-grid">
          {capabilities.map((c, i) => (
            <li className="cap-item" key={c.title.en} data-reveal>
              <span className="cap-n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="cap-title">{t(c.title)}</h3>
              <p className="cap-desc">{t(c.desc)}</p>
            </li>
          ))}
        </ul>

        <ul className="cap-tools" data-reveal>
          {tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
