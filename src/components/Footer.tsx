import { brand } from '../data/brand';
import { useLang } from '../i18n/lang';

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <div className="footer-brand">
          <p className="footer-name">{brand.full}</p>
          <p className="footer-loc">{t(brand.location)}</p>
        </div>

        <nav className="footer-social" aria-label="Social">
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
