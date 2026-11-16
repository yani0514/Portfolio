import { useState } from 'react';
import {
  ArrowUpRight,
  Bot,
  Braces,
  BrainCircuit,
  Code2,
  Layers3,
  Server,
  Wrench,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { skillDomains } from '../data/skills';
import { projects } from '../data/projects';
import { Breadcrumbs, PageHeading } from '../components/ui/PageHeading';
import { Metadata } from '../components/ui/Metadata';
import styles from './Pages.module.css';
const icons = [Bot, Braces, Code2, Server, BrainCircuit, Wrench];
export default function SkillsPage() {
  const [selected, setSelected] = useState('all');
  return (
    <div className="page-container">
      <Metadata />
      <Breadcrumbs current="Skills" />
      <PageHeading
        label="The engineering toolkit"
        title={
          <>
            Different disciplines.
            <br />
            <span className="accent">One systems mindset.</span>
          </>
        }
        description="A practical toolkit across software, robotics and intelligent systems. Connected to the work where I’ve used it, with room to keep learning."
      />
      <div className={styles.skillsLayout}>
        <aside
          className={styles.domainNav}
          aria-label="Engineering domains"
        >
          <button
            aria-pressed={selected === 'all'}
            onClick={() => setSelected('all')}
          >
            <Layers3 size={17} />
            All domains
          </button>
          {skillDomains.map((domain, i) => {
            const Icon = icons[i];
            return (
              <button
                key={domain.id}
                aria-pressed={selected === domain.id}
                onClick={() => setSelected(domain.id)}
              >
                <Icon size={17} />
                {domain.title.split(' & ')[0]}
              </button>
            );
          })}
          <p>
            Built through coursework and practical projects.
            <br />
            <br />
            Experience is shown through context, not arbitrary percentages.
          </p>
        </aside>
        <div aria-live="polite">
          {skillDomains
            .filter((d) => selected === 'all' || selected === d.id)
            .map((domain) => {
              const Icon = icons[skillDomains.indexOf(domain)];
              return (
                <article
                  key={domain.id}
                  className={`panel ${styles.skillCard}`}
                >
                  <header className={styles.skillHeader}>
                    <div className={styles.skillIcon}>
                      <Icon size={27} />
                    </div>
                    <div>
                      <h2>{domain.title}</h2>
                      <p>{domain.description}</p>
                    </div>
                  </header>
                  <p className={styles.practice}>{domain.practice}</p>
                  <h3 className={styles.skillLabel}>Tools & practical experience</h3>
                  <div className="tags">
                    {domain.skills.map((skill) => (
                      <span
                        className="tag"
                        key={skill}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  {domain.studied.length > 0 && (
                    <details>
                      <summary>Studied concepts & developing interests</summary>
                      <div className="tags mt-4">
                        {domain.studied.map((skill) => (
                          <span
                            className="tag"
                            key={skill}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </details>
                  )}
                  <div className={styles.projectRefs}>
                    <h3 className={styles.skillLabel}>See it in context</h3>
                    {domain.projects.map((slug) => {
                      const project = projects.find((p) => p.slug === slug)!;
                      return (
                        <Link
                          key={slug}
                          to={`/projects/${slug}`}
                        >
                          {project.title}
                          <ArrowUpRight size={15} />
                        </Link>
                      );
                    })}
                  </div>
                </article>
              );
            })}
        </div>
      </div>
    </div>
  );
}
