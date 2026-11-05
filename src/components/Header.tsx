import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brand, nav } from '../data/brand';
import { useLang } from '../i18n/lang';
import { ui } from '../i18n/ui';
import { LangToggle } from './LangToggle';

export function Header() {
  const { lang, t } = useLang();
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Dark text once the light Manifesto section reaches the header.
    const st = ScrollTrigger.create({
      trigger: '#manifesto',
      start: 'top 72px',
      onEnter: () => setDark(true),
      onLeaveBack: () => setDark(false),
    });
    return () => st.kill();
  }, []);

  // Lock body scroll while the mobile menu is open; restore on close/unmount.
  useEffect(() => {
    const y = window.scrollY;
    if (open) {
      document.body.style.position = 'fixed';
      document.body.style.top = `-${y}px`;
      document.body.style.width = '100%';
    }
    return () => {
      if (document.body.style.position === 'fixed') {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, y);
      }
    };
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // Defer so the scroll-lock is released before we scroll.
    requestAnimationFrame(() =>
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
    );
  };

  const items = [...nav, { label: ui.nav.contact, href: '#contact' }];

  return (
    <header ref={ref} className={`hdr${dark ? ' hdr--dark' : ''}${open ? ' hdr--open' : ''}`}>
      <a className="skip-link" href="#main-content">
        {lang === 'ko' ? '본문으로 건너뛰기' : 'Skip to content'}
      </a>
      <div className="hdr-inner">
        <a href={`/${lang}/#main-content`} className="hdr-brand" onClick={go('#main-content')} aria-label={`${brand.full} home`}>
          <img className="hdr-logo" src="/assets/logo.png" alt="" />
          <span className="hdr-brand-sub">{brand.suffix}</span>
        </a>

        <nav className="hdr-nav" aria-label="Primary">
          {items.map((n) => (
            <a key={n.href} href={n.href} className="ul-link hdr-link" onClick={go(n.href)}>
              {t(n.label)}
            </a>
          ))}
          <a className="ul-link hdr-link" href={brand.sales} target="_blank" rel="noreferrer noopener">
            {t(ui.nav.sales)}
          </a>
          <LangToggle className="hdr-lang" />
        </nav>

        <button
          className="hdr-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className="hdr-mobile" aria-hidden={!open}>
        <nav className="hdr-mobile-nav" aria-label="Mobile">
          {items.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={go(n.href)}
              style={{ transitionDelay: `${0.05 * i + 0.08}s` }}
            >
              {t(n.label)}
            </a>
          ))}
          <a href={brand.sales} target="_blank" rel="noreferrer noopener">
            {t(ui.nav.sales)}
          </a>
        </nav>
        <LangToggle className="hdr-mobile-lang" />
      </div>
    </header>
  );
}
