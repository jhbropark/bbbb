import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './i18n/lang';
import './styles/globals.css';

// StrictMode intentionally disabled: it double-invokes effects in dev, which
// duplicates GSAP ScrollTrigger pins/spacers for the scrubbed hero.
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </BrowserRouter>,
);
