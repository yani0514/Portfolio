import { ArrowUpRight, Info, Search, SearchX, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { categories, filterProjects, projects } from '../data/projects';
import { Breadcrumbs, PageHeading } from '../components/ui/PageHeading';
import { ProjectCard } from '../components/ui/ProjectCard';
import { Metadata } from '../components/ui/Metadata';
import styles from './Pages.module.css';

export default function ProjectsPage() {
  const [params, setParams] = useSearchParams();
  const rawCategory = params.get('category') || 'All projects';
  const category = categories.find((c) => c === rawCategory) ?? 'All projects';
  const query = params.get('q') || '';
  const filtered = filterProjects(category, query);
  function update(key: string, value: string) {
    setParams(
      (current) => {
        const next = new URLSearchParams(current);
        if (!value || value === 'All projects') next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true },
    );
  }
  return (
    <div className="page-container">
      <Metadata />
      <Breadcrumbs current="Projects" />
      <PageHeading
        label="The engineering workspace"
        title={
          <>
            Ideas, built into <span className="accent">systems.</span>
          </>
        }
        description="A collection of academic work and ongoing explorations — from autonomous vehicle control to the tools that help us build better software."
      />
      <div className={styles.galleryTools}>
        <div
          className={styles.filters}
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((c) => (
            <button
              className={styles.filter}
              key={c}
              aria-pressed={category === c}
              onClick={() => update('category', c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className={styles.search}>
          <Search size={16} />
          <label
            className="sr-only"
            htmlFor="project-search"
          >
            Search projects
          </label>
          <input
            id="project-search"
            type="search"
            placeholder="Search projects, technologies…"
            value={query}
            onChange={(e) => update('q', e.target.value)}
          />
          {query && (
            <button
              onClick={() => update('q', '')}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
      <div className={styles.resultsHeader}>
        <p
          role="status"
          aria-live="polite"
        >
          <strong>{String(filtered.length).padStart(2, '0')}</strong> /{' '}
          {String(projects.length).padStart(2, '0')} projects{' '}
          {category !== 'All projects' && `· ${category}`}
        </p>
        <span>
          Curiosity → Implementation{' '}
          <ArrowUpRight
            className="ml-1 inline"
            size={11}
          />
        </span>
      </div>
      {filtered.length ? (
        <div className={styles.projectGrid}>
          {filtered.map((project) => (
            <ProjectCard
              project={project}
              key={project.slug}
            />
          ))}
        </div>
      ) : (
        <div className={`panel ${styles.empty}`}>
          <SearchX
            className="accent mx-auto"
            size={30}
          />
          <h2>No matching projects</h2>
          <p>Try another technology or explore the full collection.</p>
          <button
            className="button secondary"
            onClick={() => setParams({})}
          >
            Reset filters
          </button>
        </div>
      )}
      <p className={styles.endNote}>
        <Info size={13} />
        Project artwork is illustrative. Status and case-study notes distinguish coursework, ongoing
        work and concepts.
      </p>
    </div>
  );
}
