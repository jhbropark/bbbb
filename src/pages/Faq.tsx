import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { brand, CONTENT_LAST_MODIFIED } from '../data/brand';
import { faqItems } from '../data/faq';
import { Footer } from '../components/Footer';
import { LangToggle } from '../components/LangToggle';
import { useLang } from '../i18n/lang';
import { applySeo } from '../seo';
import { faqStructuredData } from '../structuredData';

export default function Faq() {
  const { lang, t } = useLang();
  const ko = lang === 'ko';
  const title = ko
    ? '메디컬 비주얼 제작 FAQ — bbbb MEDICAL VISUAL'
    : 'Medical Visualization Production FAQ — bbbb MEDICAL VISUAL';
  const description = ko
    ? '작용 기전 영상, 의료 검수, 제작 기간, 비용, 결과물과 과학적 출처에 대한 답변.'
    : 'Answers about MoA animation, medical review, schedules, cost, deliverables, and scientific sourcing.';

  useEffect(() => {
    applySeo({
      title,
      description,
      path: `/${lang}/faq/`,
      lang,
      type: 'website',
      jsonLd: faqStructuredData(lang, title, description),
    });
  }, [description, lang, title]);

  return (
    <div className="faq-page">
      <header className="detail-bar">
        <Link to={`/${lang}/`} className="hdr-brand" aria-label={`${brand.full} home`}>
          <img className="hdr-logo" src="/assets/logo.png" alt="" />
          <span className="hdr-brand-sub">{brand.suffix}</span>
        </Link>
        <div className="detail-bar-right">
          <Link to={`/${lang}/`} className="ul-link detail-back">
            <ArrowLeft size={16} strokeWidth={2} />
            <span>{ko ? '홈' : 'Home'}</span>
          </Link>
          <LangToggle />
        </div>
      </header>

      <main className="faq-main" id="main-content">
        <section className="shell faq-hero">
          <p className="detail-eyebrow">{ko ? '프로젝트 안내' : 'Project Guide'}</p>
          <h1 className="faq-title">{ko ? '메디컬 비주얼 제작 FAQ' : 'Medical Visualization Production FAQ'}</h1>
          <p className="faq-lead">{description}</p>
          <p className="faq-updated">
            {ko ? '최종 수정' : 'Last updated'} · {CONTENT_LAST_MODIFIED}
          </p>
        </section>

        <section className="shell faq-list" aria-label={ko ? '자주 묻는 질문' : 'Frequently asked questions'}>
          {faqItems.map((item, index) => (
            <details className="faq-item" key={item.id} open={index === 0}>
              <summary>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h2>{t(item.question)}</h2>
              </summary>
              <p>{t(item.answer)}</p>
            </details>
          ))}
        </section>

        <section className="shell faq-cta">
          <div>
            <p className="detail-eyebrow">{ko ? '다음 단계' : 'Next step'}</p>
            <h2>{ko ? '프로젝트 조건을 알려주세요.' : 'Tell us what the project needs.'}</h2>
          </div>
          <Link className="btn btn-solid" to={`/${lang}/#contact`}>
            {ko ? '프로젝트 브리프 작성' : 'Write a Project Brief'}
            <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
