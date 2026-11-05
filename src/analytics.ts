export const GA_MEASUREMENT_ID = 'G-NG0NE51F3T';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const aiReferrers: Record<string, string> = {
  'chatgpt.com': 'chatgpt',
  'chat.openai.com': 'chatgpt',
  'perplexity.ai': 'perplexity',
  'claude.ai': 'claude',
  'gemini.google.com': 'gemini',
  'copilot.microsoft.com': 'copilot',
  'you.com': 'you',
};

export function initAnalytics() {
  if (typeof window === 'undefined' || import.meta.env.DEV || document.querySelector(`script[data-ga4="${GA_MEASUREMENT_ID}"]`)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.dataset.ga4 = GA_MEASUREMENT_ID;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  try {
    const referrer = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, '') : '';
    const source = aiReferrers[referrer];
    if (source && sessionStorage.getItem('bbbb-ai-referral') !== source) {
      sessionStorage.setItem('bbbb-ai-referral', source);
      window.gtag('event', 'ai_referral', {
        ai_source: source,
        referrer_domain: referrer,
        page_location: location.href,
      });
    }
  } catch {
    // Invalid or unavailable referrer. Measurement must never block rendering.
  }
}

export function trackPageView(path: string, title: string) {
  if (!window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: `${location.origin}${path}`,
    page_title: title,
  });
}

export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  window.gtag?.('event', name, params);
}
