# bbbb MEDICAL VISUAL — 배포 & 도메인 연결 가이드

정적 사이트(React + Vite)입니다. 빌드 결과물인 `dist/` 폴더만 정적 호스팅에 올리면
동작하고, 원하는 도메인을 연결할 수 있습니다. **서버 프로그램(백엔드)이 필요 없습니다.**

---

## 0. 무엇을 전달받았는가

둘 중 하나를 받게 됩니다.

- **`bbbb-medical-site.zip`** — 이미 빌드된 `dist/` 결과물. 그대로 업로드하면 끝(수정 불가).
- **`bbbb-medical-source.zip`** — 소스 코드 전체. 직접 수정·재빌드하거나 Git 연동 배포용.
  - 빌드 방법:
    ```bash
    npm install
    # npm 보안정책이 esbuild 설치 스크립트를 막으면 한 번만:
    node node_modules/esbuild/install.js
    npm run build      # → dist/ 생성
    ```

> SPA 라우팅(`/work/…` 상세페이지)이 새로고침에도 동작하도록 `public/_redirects`,
> `netlify.toml`, `vercel.json` 설정이 이미 들어 있습니다.

---

## 1. 가장 쉬운 방법 — Netlify (드래그 배포 + 무료 도메인/커스텀 도메인)

1. https://app.netlify.com/drop 접속
2. **`dist` 폴더**(또는 `bbbb-medical-site.zip`)를 브라우저에 드래그
3. 즉시 `https://랜덤이름.netlify.app` 공개 URL 생성

### 커스텀 도메인 연결 (Netlify)
1. 사이트 대시보드 → **Domain settings** → **Add a domain** → 소유 도메인 입력
2. Netlify가 안내하는 DNS 설정을 도메인 등록업체(가비아·후이즈·GoDaddy·Cloudflare 등)에 입력:
   - **루트 도메인**(`example.com`): A 레코드 `75.2.60.5` *(또는 Netlify가 표시하는 최신 값/ALIAS)*
   - **www**(`www.example.com`): CNAME → `<사이트이름>.netlify.app`
   - 또는 도메인의 네임서버를 Netlify DNS로 위임(가장 간단)
3. HTTPS 인증서는 Netlify가 자동 발급(Let's Encrypt).

---

## 2. Vercel (Git 연동 자동 배포에 적합)

1. https://vercel.com 로그인 → **Add New… → Project**
2. 소스를 GitHub/GitLab에 올린 뒤 저장소를 Import (또는 Vercel CLI `vercel` 실행)
   - Framework: **Vite** 자동 감지 / Build: `npm run build` / Output: `dist`
   - `vercel.json`에 SPA rewrite가 이미 설정되어 있음
3. 배포 후 **Project → Settings → Domains** 에서 도메인 추가
   - 루트: A 레코드 `76.76.21.21`
   - www: CNAME → `cname.vercel-dns.com`
   *(정확한 값은 Vercel 화면 안내를 따르세요.)*

---

## 3. Cloudflare Pages

1. Cloudflare 대시보드 → **Workers & Pages → Create → Pages**
2. Git 저장소 연결 또는 `dist` 직접 업로드(Direct Upload)
   - Build command: `npm run build` / Output directory: `dist`
   - `public/_redirects`가 SPA 폴백을 처리
3. **Custom domains** 탭에서 도메인 연결(도메인이 Cloudflare에 있으면 클릭 한 번).

---

## 4. 직접 운영하는 웹서버에 올릴 때 (Nginx / Apache)

`dist/`의 내용을 웹루트에 복사하고, **모든 경로를 index.html로 폴백**해야
상세페이지 새로고침이 404가 나지 않습니다.

**Nginx**
```nginx
server {
  listen 80;
  server_name example.com www.example.com;
  root /var/www/bbbb/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

**Apache** (`.htaccess`를 dist 안에 추가)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
HTTPS는 Let's Encrypt(certbot) 등으로 발급하세요.

---

## 5. 도메인 DNS 요약

| 대상 | 레코드 | 값(예시 — 호스트 화면의 안내값 우선) |
|---|---|---|
| `example.com` (루트) | A / ALIAS / ANAME | 호스트가 지정한 IP 또는 별칭 |
| `www.example.com` | CNAME | `<사이트>.netlify.app` / `cname.vercel-dns.com` 등 |

- DNS 전파에는 보통 몇 분~최대 48시간이 걸립니다.
- 무료 HTTPS 인증서는 위 호스트들이 도메인 연결 후 자동 발급합니다.
- 이 사이트는 하위 경로(`/work/…`)를 쓰므로 **반드시 SPA 폴백(전 경로 → index.html)** 이
  설정되어야 합니다(위 설정 파일들이 이를 처리).

---

## 참고

- 영상 에셋(`dist/assets/*.mp4`)이 포함되어 zip 용량이 큽니다(약 50MB). 대역폭 무료 한도는
  호스트별로 다르니 트래픽이 많으면 유료 플랜/CDN을 확인하세요.
- 사이트 문구·이메일·프로젝트는 `src/data/brand.ts`, 섹션 문구는 `src/i18n/ui.ts`에서
  수정 후 재빌드하면 됩니다.
