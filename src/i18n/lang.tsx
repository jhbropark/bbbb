/* eslint-disable react-refresh/only-export-components -- context module intentionally
   co-locates the provider with its hook/helpers; fast-refresh is not needed here. */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

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

function initialLang(): Lang {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(KEY);
    if (saved === 'ko' || saved === 'en') return saved;
  }
  return 'ko';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    if (typeof localStorage !== 'undefined') localStorage.setItem(KEY, lang);
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const toggle = () => setLangState((p) => (p === 'ko' ? 'en' : 'ko'));

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
