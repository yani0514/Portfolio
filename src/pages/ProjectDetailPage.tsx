import { lazy, Suspense } from 'react';
import { ArrowRight, ArrowUpRight, CircleDot } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { Breadcrumbs } from '../components/ui/PageHeading';
import { Metadata } from '../components/ui/Metadata';
import { ProjectVisual } from '../components/ui/ProjectVisual';
import NotFoundPage from './NotFoundPage';
import styles from './ProjectDetailPage.module.css';
const PurePursuitDemo = lazy(() => import('../components/visualizations/PurePursuitDemo'));
const CoverageDemo = lazy(() => import('../components/visualizations/CoverageDemo'));

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFoundPage />;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const demo = project.visual === 'racing' || project.visual === 'coverage';
  return (
    <div className="page-container">
      <Metadata
        title={`${project.title} — Yanislav Velikov`}
        description={project.summary}
      />
      <Breadcrumbs
        current={project.title}
        project
      />
      <header className={styles.hero}>
        <div>
          <span className="eyebrow">{project.category} / Project notes</span>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <div className="tags">
            {project.technologies.map((t) => (
              <span
                className="tag"
                key={t}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <figure>
          <ProjectVisual
            kind={project.visual}
            className={styles.heroVisual}
          />
          <figcaption className={styles.visualCaption}>Conceptual project illustration</figcaption>
        </figure>
      </header>
      <dl className={styles.projectMeta}>
        <div>
          <dt>Context</dt>
          <dd>{project.institution}</dd>
        </div>
        <div>
          <dt>Period</dt>
          <dd>{project.period}</dd>
        </div>
        <div>
          <dt>Project status</dt>
          <dd>
            <span className="status">{project.status}</span>
          </dd>
        </div>
      </dl>
      <div className={styles.body}>
        <article className={styles.article}>
          <section id="overview">
            <h2>
              <span>01 /</span>The problem & my role
            </h2>
            <p>{project.intro}</p>
            <div className={styles.role}>
              <h3>MY CONTRIBUTION</h3>
              <p>{project.role}</p>
            </div>
          </section>
          <section id="architecture">
            <h2>
              <span>02 /</span>
              {project.visual === 'iot' ? 'Conceptual system flow' : 'System architecture'}
            </h2>
            <div className={styles.architecture}>
              {project.architecture.map((item, i) => (
                <div key={item.title}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <ArrowRight size={14} />
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>
          <section id="implementation">
            <h2>
              <span>03 /</span>
              {project.visual === 'iot' ? 'Concept & documentation' : 'Implementation notes'}
            </h2>
            {project.implementation.map((item) => (
              <div
                key={item.title}
                className={styles.implementation}
              >
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>
          {demo && (
            <section id="interactive">
              <h2>
                <span>↳ /</span>Explore the idea
              </h2>
              <Suspense fallback={<p role="status">Loading interactive demonstration…</p>}>
                {project.visual === 'racing' ? <PurePursuitDemo /> : <CoverageDemo />}
              </Suspense>
            </section>
          )}
          <section id="challenges">
            <h2>
              <span>04 /</span>Engineering considerations
            </h2>
            {project.challenges.map((c) => (
              <div
                key={c.title}
                className={styles.challenge}
              >
                <CircleDot size={15} />
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              </div>
            ))}
          </section>
          <section id="outcomes">
            <h2>
              <span>05 /</span>Outcomes & next questions
            </h2>
            <div className={`panel ${styles.outcome}`}>
              <p>{project.outcome}</p>
              <h3>LOOKING FORWARD</h3>
              <p>{project.next}</p>
            </div>
          </section>
        </article>
        <aside className={styles.toc}>
          <p>IN THIS CASE STUDY</p>
          <a href="#overview">Overview & contribution</a>
          <a href="#architecture">System architecture</a>
          <a href="#implementation">Implementation</a>
          {demo && <a href="#interactive">Interactive exploration</a>}
          <a href="#challenges">Considerations</a>
          <a href="#outcomes">Outcomes & next steps</a>
          <Link
            to="/projects"
            className="text-link"
          >
            All projects <ArrowUpRight size={13} />
          </Link>
        </aside>
      </div>
      <nav
        className={styles.next}
        aria-label="More projects"
      >
        <div>
          <span>Continue exploring</span>
          <Link to={`/projects/${next.slug}`}>
            {next.title}
            <ArrowRight size={22} />
          </Link>
        </div>
        <Link to="/projects">
          Back to the collection <ArrowUpRight size={14} />
        </Link>
      </nav>
    </div>
  );
}
