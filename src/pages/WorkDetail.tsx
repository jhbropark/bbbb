import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { brand, projects, tools } from '../data/brand';
import { Footer } from '../components/Footer';
import { LangToggle } from '../components/LangToggle';
import { useLang } from '../i18n/lang';
import { ui } from '../i18n/ui';

export default function WorkDetail() {
  const { slug } = useParams();
  const { t } = useLang();
  const index = projects.findIndex((p) => p.slug === slug);

  // Update the document title for shareable deep links.
  useEffect(() => {
    const p = projects[index];
    if (p) document.title = `${p.title} — ${brand.full}`;
    return () => {
      document.title = `${brand.full} — Medicine, Made Visible`;
    };
  }, [index]);

  if (index === -1) return <Navigate to="/" replace />;

  const p = projects[index];
  const d = p.detail;
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const rcsbUrl = /^PDB\s+\w{4}$/i.test(d.structure.pdb)
    ? `https://www.rcsb.org/structure/${d.structure.pdb.split(/\s+/)[1]}`
    : 'https://www.rcsb.org/';

  return (
    <div className="detail">
      <header className="detail-bar">
        <Link to="/" className="hdr-brand" aria-label={`${brand.full} home`}>
          <img className="hdr-logo" src="/assets/logo.png" alt="" />
          <span className="hdr-brand-sub">{brand.suffix}</span>
        </Link>
        <div className="detail-bar-right">
          <Link to="/#work" className="ul-link detail-back">
            <ArrowLeft size={16} strokeWidth={2} />
            <span>{t(ui.detail.allWork)}</span>
          </Link>
          <LangToggle />
        </div>
      </header>

      <main className="detail-main">
        <section className="detail-hero shell" data-detail-in>
          <p className="detail-eyebrow">
            {t(p.category)} · {t(p.kind)}
          </p>
          <h1 className="detail-title">{p.title}</h1>
          <p className="detail-intent">{t(p.intent)}</p>
        </section>

        <div className="detail-media shell" data-detail-in>
          {p.media === 'video' && p.src ? (
            <video
              className="detail-video"
              src={p.src}
              poster={p.poster}
              muted
              loop
              playsInline
              autoPlay
              aria-hidden="true"
            />
          ) : (
            p.poster && <img className="detail-video" src={p.poster} alt="" aria-hidden="true" />
          )}
        </div>

        <div className="shell detail-grid">
          <div className="detail-body">
            <section className="detail-block" data-detail-in>
              <h2 className="detail-h2">{t(ui.detail.overview)}</h2>
              <p className="detail-lead">{t(d.overview)}</p>
            </section>

            <section className="detail-block" data-detail-in>
              <h2 className="detail-h2">{t(ui.detail.refStructure)}</h2>
              <div className="detail-ref">
                <div className="detail-ref-head">
                  <span className="detail-pdb">{d.structure.pdb}</span>
                  <span className="detail-ref-name">{t(d.structure.name)}</span>
                </div>
                <p className="detail-ref-note">{t(d.structure.note)}</p>
                <a
                  className="ul-link detail-ref-link"
                  href={rcsbUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span>{t(ui.detail.pdbLink)}</span>
                  <ArrowUpRight size={15} strokeWidth={2} />
                </a>
              </div>
            </section>

            <section className="detail-block" data-detail-in>
              <h2 className="detail-h2">AlphaFold</h2>
              <p className="detail-lead">{t(d.alphafold)}</p>
              <a
                className="ul-link detail-ref-link"
                href="https://alphafold.ebi.ac.uk/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <span>{t(ui.detail.afLink)}</span>
                <ArrowUpRight size={15} strokeWidth={2} />
              </a>
            </section>

            <section className="detail-block" data-detail-in>
              <h2 className="detail-h2">{t(ui.detail.visualApproach)}</h2>
              <p className="detail-lead">{t(d.approach)}</p>
            </section>
          </div>

          <aside className="detail-meta" data-detail-in>
            <dl className="detail-specs">
              <div>
                <dt>{t(ui.detail.category)}</dt>
                <dd>{t(p.category)}</dd>
              </div>
              <div>
                <dt>{t(ui.detail.discipline)}</dt>
                <dd>{t(d.discipline)}</dd>
              </div>
              <div>
                <dt>{t(ui.detail.year)}</dt>
                <dd>{d.year}</dd>
              </div>
              <div>
                <dt>{t(ui.detail.reference)}</dt>
                <dd>{d.structure.pdb} · AlphaFold</dd>
              </div>
            </dl>
            <ul className="detail-tools">
              {tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
            <p className="detail-disclaimer">{t(ui.detail.disclaimer)}</p>
          </aside>
        </div>

        <nav className="shell detail-nav" aria-label="More work">
          <Link className="detail-nav-item detail-nav-prev" to={`/work/${prev.slug}`}>
            <span className="detail-nav-label">
              <ArrowLeft size={15} strokeWidth={2} /> {t(ui.detail.prev)}
            </span>
            <span className="detail-nav-title">{prev.title}</span>
          </Link>
          <Link className="detail-nav-item detail-nav-next" to={`/work/${next.slug}`}>
            <span className="detail-nav-label">
              {t(ui.detail.next)} <ArrowRight size={15} strokeWidth={2} />
            </span>
            <span className="detail-nav-title">{next.title}</span>
          </Link>
        </nav>

        <section className="shell detail-cta">
          <h2 className="detail-cta-title">{t(ui.detail.ctaTitle)}</h2>
          <div className="detail-cta-actions">
            <a className="btn btn-solid" href={`mailto:${brand.email}`}>
              <span>{t(ui.detail.startProject)}</span>
              <ArrowRight className="btn-ico" size={18} strokeWidth={2} />
            </a>
            <Link className="btn btn-line" to="/#work">
              {t(ui.detail.backToWork)}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
