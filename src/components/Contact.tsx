import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { brand } from '../data/brand';
import { useLang } from '../i18n/lang';
import { ui } from '../i18n/ui';

export function Contact({ reduced }: { reduced: boolean }) {
  const { lang, t } = useLang();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, !reduced);
  const headline = ui.contact.headline[lang];

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="shell contact-inner">
        <h2 className="contact-headline" data-reveal>
          {headline.map((line, i) => (
            <span key={line}>
              {line}
              {i < headline.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <p className="contact-text" data-reveal>
          {t(ui.contact.text)}
        </p>
        <div className="contact-actions" data-reveal>
          <a className="btn btn-solid" href={`mailto:${brand.email}`} data-cursor="Send">
            <span>{t(ui.contact.cta)}</span>
            <ArrowRight className="btn-ico" size={18} strokeWidth={2} />
          </a>
          <a className="ul-link contact-mail" href={`mailto:${brand.email}`}>
            {brand.email}
          </a>
        </div>
      </div>
    </section>
  );
}
