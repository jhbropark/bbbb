import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import WorkDetail from './pages/WorkDetail';
import NotFound from './pages/NotFound';
import Faq from './pages/Faq';
import { trackEvent, trackPageView } from './analytics';

/** Reset scroll to top on every route change (detail pages start at the top). */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LegacyWorkRedirect() {
  const { pathname } = useLocation();
  return <Navigate to={`/ko${pathname}/`} replace />;
}

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      trackPageView(`${location.pathname}${location.search}`, document.title);
    }, 80);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a');
      if (!link) return;
      const href = link.href;
      if (href.startsWith('mailto:')) trackEvent('project_brief_open', { link_text: link.textContent?.trim() || 'email' });
      if (href.startsWith('https://sales.bbbb.beauty')) trackEvent('sales_resource_click', { link_url: href });
      if (/\/(ko|en)\/work\//.test(href)) trackEvent('project_link_click', { link_url: href });
      if (/\/(ko|en)\/faq\//.test(href)) trackEvent('faq_link_click', { link_url: href });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<Navigate to="/ko/" replace />} />
        <Route path="/ko" element={<Home />} />
        <Route path="/en" element={<Home />} />
        <Route path="/ko/work/:slug" element={<WorkDetail />} />
        <Route path="/en/work/:slug" element={<WorkDetail />} />
        <Route path="/ko/faq" element={<Faq />} />
        <Route path="/en/faq" element={<Faq />} />
        <Route path="/faq" element={<Navigate to="/ko/faq/" replace />} />
        <Route path="/work/:slug" element={<LegacyWorkRedirect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
