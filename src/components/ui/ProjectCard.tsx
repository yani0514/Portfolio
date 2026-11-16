import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../../data/projects';
import { ProjectVisual } from './ProjectVisual';
import styles from './ProjectCard.module.css';
export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const Heading = compact ? 'h3' : 'h2';
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`${styles.card} ${compact ? styles.compact : ''}`}
      aria-label={`View ${project.title} case study`}
    >
      <ProjectVisual
        kind={project.visual}
        className={styles.visual}
      />
      <div className={styles.body}>
        <div className={styles.meta}>
          <span>{project.category}</span>
          <ArrowUpRight size={15} />
        </div>
        <Heading className={styles.title}>{project.title}</Heading>
        <p className={styles.summary}>{project.summary}</p>
        <div className="tags">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              className="tag"
              key={tech}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.foot}>
        <span className="status">{project.status}</span>
        <span>
          Explore project <span aria-hidden="true">↗</span>
        </span>
      </div>
    </Link>
  );
}
