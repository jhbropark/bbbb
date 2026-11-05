import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import WorkDetail from './pages/WorkDetail';
import NotFound from './pages/NotFound';

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

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/ko/" replace />} />
        <Route path="/ko" element={<Home />} />
        <Route path="/en" element={<Home />} />
        <Route path="/ko/work/:slug" element={<WorkDetail />} />
        <Route path="/en/work/:slug" element={<WorkDetail />} />
        <Route path="/work/:slug" element={<LegacyWorkRedirect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
