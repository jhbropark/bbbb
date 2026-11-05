/* eslint-disable react-refresh/only-export-components -- context module intentionally
   co-locates the provider with its hook/helpers; fast-refresh is not needed here. */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type Lang = 'ko' | 'en';

/** A bilingual string. `t()` / `useLang().t` resolves it to the active language. */
export type L = { ko: string; en: string };
/** A bilingual multi-line string (each language is an array of lines). */
export type LL = { ko: string[]; en: string[] };

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<Ctx>({
  lang: 'ko',
  setLang: () => {},
  toggle: () => {},
});

const KEY = 'bbbb-lang';

function pathLang(pathname: string): Lang | null {
  const value = pathname.split('/')[1];
  return value === 'ko' || value === 'en' ? value : null;
}

function localizedPath(pathname: string, lang: Lang) {
  const stripped = pathname.replace(/^\/(ko|en)(?=\/|$)/, '') || '/';
  return `/${lang}${stripped}`.replace(/\/+$/, '/');
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [lang, setLangState] = useState<Lang>(() => pathLang(location.pathname) || 'ko');

  useEffect(() => {
    const routeLang = pathLang(location.pathname);
    if (routeLang && routeLang !== lang) setLangState(routeLang);
  }, [location.pathname, lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    if (typeof localStorage !== 'undefined') localStorage.setItem(KEY, lang);
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    navigate(`${localizedPath(location.pathname, next)}${location.search}${location.hash}`);
  };
  const toggle = () => setLang(lang === 'ko' ? 'en' : 'ko');

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>{children}</LanguageContext.Provider>
  );
}

/** Resolve a bilingual value to the given language. */
export function t(v: L, lang: Lang): string {
  return v[lang];
}

/**
 * Access the current language plus a bound translator.
 *   const { lang, t } = useLang();
 *   <h1>{t(ui.hero.title)}</h1>
 */
export function useLang() {
  const ctx = useContext(LanguageContext);
  return { ...ctx, t: (v: L) => v[ctx.lang] };
}
