import { useRef } from 'react';
import { brand } from '../data/brand';
import { useLang } from '../i18n/lang';
import { useReveal } from '../hooks/useReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { BbbbMark } from './BbbbMark';

export function Footer() {
  const { lang, t } = useLang();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, !reduced);

  return (
    <footer className="footer" ref={ref}>
      <div className="shell footer-sign" data-reveal>
        <BbbbMark className="footer-mark" />
      </div>

      <div className="shell footer-inner">
        <div className="footer-brand">
          <p className="footer-name">{brand.suffix}</p>
          <p className="footer-loc">{t(brand.location)}</p>
        </div>

        <nav className="footer-social" aria-label="Social and resources">
          <a href={`/${lang}/faq/`} className="ul-link">
            FAQ
          </a>
          {brand.social.map((s) => (
            <a key={s.label} href={s.href} className="ul-link" target="_blank" rel="noreferrer noopener">
              {s.label}
            </a>
          ))}
        </nav>

        <p className="footer-copy">© 2026 {brand.full}. All rights reserved.</p>
      </div>
    </footer>
  );
}
