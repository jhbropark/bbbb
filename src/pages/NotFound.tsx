import { Link } from 'react-router-dom';
import { useLang } from '../i18n/lang';

export default function NotFound() {
  const { lang } = useLang();
  const ko = lang === 'ko';
  return (
    <main className="not-found">
      <p className="eyebrow">404</p>
      <h1>{ko ? '페이지를 찾을 수 없습니다.' : 'Page not found.'}</h1>
      <p>
        {ko
          ? '주소가 변경되었거나 존재하지 않는 페이지입니다.'
          : 'The address may have changed or the page does not exist.'}
      </p>
      <Link className="btn btn-solid" to={`/${lang}/`}>
        {ko ? '홈으로 이동' : 'Go to home'}
      </Link>
    </main>
  );
}
