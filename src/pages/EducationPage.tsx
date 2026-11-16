import { ArrowRight, ArrowUpRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { education } from '../data/education';
import { projects } from '../data/projects';
import { Breadcrumbs, PageHeading } from '../components/ui/PageHeading';
import { Metadata } from '../components/ui/Metadata';
import styles from './Pages.module.css';
export default function EducationPage() {
  return (
    <div className="page-container">
      <Metadata />
      <Breadcrumbs current="Education" />
      <PageHeading
        label="Learning, in motion"
        title={
          <>
            Strong foundations.
            <br />
            <span className="accent">Wider perspectives.</span>
          </>
        }
        description="An academic journey across Luxembourg and Vienna — connecting computer science foundations to hands-on engineering."
      />
      <div className={styles.educationLayout}>
        <div className={styles.timeline}>
          {education.map((item, i) => (
            <article
              key={item.id}
              className={styles.educationCard}
            >
              <p className="eyebrow">{item.period}</p>
              <header>
                <div>
                  <h2>{item.name}</h2>
                  <h3>{item.title}</h3>
                </div>
                <div
                  className={styles.universityMark}
                  aria-hidden="true"
                >
                  {i === 0 ? 'uni.lu' : 'TU'}
                </div>
              </header>
              <div className={`panel ${styles.educationBody}`}>
                <p className="eyebrow mb-3">
                  {item.badge} / {item.location}
                </p>
                <p>{item.body}</p>
                <h4 className={styles.skillLabel}>Relevant coursework & areas</h4>
                <ul className={styles.courseList}>
                  {item.courses.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
                <div className={styles.projectRefs}>
                  <h4 className={styles.skillLabel}>From classroom to project</h4>
                  {item.projects.map((slug) => (
                    <Link
                      to={`/projects/${slug}`}
                      key={slug}
                    >
                      {projects.find((p) => p.slug === slug)!.title}
                      <ArrowUpRight size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <aside className={`panel ${styles.academicAside}`}>
          <Compass size={30} />
          <h2>Learning by making the connection.</h2>
          <p>
            Software engineering, AI, mathematics and robotics are increasingly connected in the
            systems I want to build.
          </p>
          <p className="mt-4">
            My next direction is advanced study in robotics, embedded computing and cyber-physical
            systems.
          </p>
          <Link
            className="text-link"
            to="/about"
          >
            More about my direction <ArrowRight size={14} />
          </Link>
        </aside>
      </div>
      <p className={styles.academicNote}>
        Academic status reflects November 2026. The Bachelor’s degree is in progress.
      </p>
    </div>
  );
}
