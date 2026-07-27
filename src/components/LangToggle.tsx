import { useLang } from '../i18n/lang';
import { ui } from '../i18n/ui';

/** KO / EN segmented language switch. */
export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  return (
    <div
      className={`lang-toggle ${className}`.trim()}
      role="group"
      aria-label={t(ui.lang.switch)}
    >
      <button
        type="button"
        className={`lang-opt${lang === 'ko' ? ' is-active' : ''}`}
        aria-pressed={lang === 'ko'}
        onClick={() => setLang('ko')}
      >
        KO
      </button>
      <span className="lang-sep" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={`lang-opt${lang === 'en' ? ' is-active' : ''}`}
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
      >
        EN
      </button>
    </div>
  );
}
