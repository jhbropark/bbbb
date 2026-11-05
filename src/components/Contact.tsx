import { useRef, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { brand } from '../data/brand';
import { useLang } from '../i18n/lang';
import { ui } from '../i18n/ui';
import { trackEvent } from '../analytics';

export function Contact({ reduced }: { reduced: boolean }) {
  const { lang, t } = useLang();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, !reduced);
  const headline = ui.contact.headline[lang];
  const ko = lang === 'ko';

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (name: string) => String(data.get(name) || '-').trim() || '-';
    const subject = `[bbbb 프로젝트 문의] ${get('organization')} · ${get('product')}`;
    const body = [
      `회사/기관: ${get('organization')}`,
      `담당자: ${get('name')}`,
      `회신 이메일: ${get('email')}`,
      `치료·제품 분야: ${get('product')}`,
      `필요한 결과물: ${get('deliverable')}`,
      `사용 채널: ${get('channel')}`,
      `희망 일정: ${get('timeline')}`,
      `예산 범위: ${get('budget')}`,
      `의료 검수: ${get('review')}`,
      '',
      '프로젝트 설명',
      get('message'),
    ].join('\n');
    trackEvent('project_brief_prepare', {
      language: lang,
      deliverable: get('deliverable'),
      budget_range: get('budget'),
      review_plan: get('review'),
    });
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="shell contact-inner">
        <div className="contact-intro">
          <p className="eyebrow" data-reveal>{t(ui.contact.cta)}</p>
          <h2 className="contact-headline" data-reveal>
            {headline.map((line, i) => (
              <span key={line}>
                {line}
                {i < headline.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="contact-text" data-reveal>{t(ui.contact.text)}</p>
          <a className="ul-link contact-mail" href={`mailto:${brand.email}`} data-reveal>
            {t(ui.contact.direct)} · {brand.email}
          </a>
        </div>

        <form className="brief-form" onSubmit={submit} data-reveal>
          <div className="brief-grid">
            <label>
              <span>{ko ? '회사·기관' : 'Company / Organization'}</span>
              <input name="organization" autoComplete="organization" required />
            </label>
            <label>
              <span>{ko ? '담당자 이름' : 'Contact name'}</span>
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              <span>{ko ? '회신 이메일' : 'Reply email'}</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              <span>{ko ? '치료·제품 분야' : 'Therapy / Product'}</span>
              <input name="product" placeholder={ko ? '예: 면역항암, 의료기기, 더마코스메틱' : 'e.g. immuno-oncology, medical device'} required />
            </label>
            <label>
              <span>{ko ? '필요한 결과물' : 'Deliverable'}</span>
              <select name="deliverable" required defaultValue="">
                <option value="" disabled>{ko ? '선택' : 'Select'}</option>
                <option>{ko ? '작용 기전(MoA) 영상' : 'Mechanism of Action film'}</option>
                <option>{ko ? '브랜드·제품 필름' : 'Brand / product film'}</option>
                <option>{ko ? '환자·의료진 교육 콘텐츠' : 'Patient / HCP education'}</option>
                <option>{ko ? '전시·인터랙티브 콘텐츠' : 'Exhibition / interactive content'}</option>
                <option>{ko ? '아직 미정' : 'Not decided yet'}</option>
              </select>
            </label>
            <label>
              <span>{ko ? '사용 채널' : 'Primary channel'}</span>
              <input name="channel" placeholder={ko ? '웹, 전시, 학회, 세일즈, SNS' : 'Web, exhibition, congress, sales, social'} />
            </label>
            <label>
              <span>{ko ? '희망 일정' : 'Timeline'}</span>
              <input name="timeline" placeholder={ko ? '예: 2027년 1월 공개' : 'e.g. launch in Jan 2027'} />
            </label>
            <label>
              <span>{ko ? '예산 범위' : 'Budget range'}</span>
              <select name="budget" defaultValue="">
                <option value="">{ko ? '협의 필요' : 'To be discussed'}</option>
                <option>{ko ? '1천만원 미만' : 'Under KRW 10M'}</option>
                <option>{ko ? '1천만–3천만원' : 'KRW 10M–30M'}</option>
                <option>{ko ? '3천만–5천만원' : 'KRW 30M–50M'}</option>
                <option>{ko ? '5천만원 이상' : 'KRW 50M+'}</option>
              </select>
            </label>
            <label className="brief-wide">
              <span>{ko ? '의료 검수 계획' : 'Medical review plan'}</span>
              <select name="review" defaultValue="">
                <option value="">{ko ? '미정' : 'Not decided'}</option>
                <option>{ko ? '고객사 의료진 검수 예정' : 'Client medical review planned'}</option>
                <option>{ko ? '외부 전문가 검수 필요' : 'External expert review needed'}</option>
                <option>{ko ? '의료 검수 불필요' : 'Medical review not required'}</option>
              </select>
            </label>
            <label className="brief-wide">
              <span>{ko ? '프로젝트 설명' : 'Project details'}</span>
              <textarea name="message" rows={5} placeholder={ko ? '전달해야 할 핵심 내용과 참고 링크를 적어주세요.' : 'Share the key message and any reference links.'} required />
            </label>
          </div>
          <p className="brief-note">{t(ui.contact.note)}</p>
          <button className="btn btn-solid brief-submit" type="submit" data-cursor="Send">
            <span>{t(ui.contact.submit)}</span>
            <ArrowRight className="btn-ico" size={18} strokeWidth={2} />
          </button>
        </form>
      </div>
    </section>
  );
}
