import { ArrowRight, GraduationCap, MapPin, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs, PageHeading } from '../components/ui/PageHeading';
import { Metadata } from '../components/ui/Metadata';
import styles from './Pages.module.css';

export default function AboutPage() {
  return (
    <div className="page-container">
      <Metadata />
      <Breadcrumbs current="About" />
      <PageHeading
        label="Behind the systems"
        title={
          <>
            Software is the start.
            <br />
            <span className="accent">The real world is the challenge.</span>
          </>
        }
        description="I’m Yanislav — a Computer Science student drawn to the place where code becomes movement, sensing and intelligent behavior."
      />
      <div className={styles.aboutGrid}>
        <article className={styles.aboutCopy}>
          <h2>A curiosity that goes beyond the screen.</h2>
          <p>
            I’m in my third year of the Bachelor of Computer Science at the{' '}
            <strong>University of Luxembourg</strong>. My work brings together software engineering,
            full-stack development and applied machine learning, with an increasingly clear
            direction: robotics and cyber-physical systems.
          </p>
          <p>
            During my Erasmus semester at <strong>TU Wien in spring 2026</strong>, I worked on
            autonomous vehicle control software using C++ and ROS 2. Implementing a Pure Pursuit
            controller made the relationship between an algorithm and a physical system tangible.
          </p>
          <p>
            A path on a screen becomes a steering command. A coordinate transform changes what a
            robot understands about its target. A small implementation decision matters beyond the
            code. That is the kind of engineering I want to keep exploring.
          </p>
          <Link
            to="/projects/autonomous-racing-cars"
            className="text-link"
          >
            Explore the project that shaped my direction <ArrowRight size={15} />
          </Link>
        </article>
        <aside className={`panel ${styles.identity}`}>
          <div
            className={styles.identityArt}
            aria-hidden="true"
          >
            <span>yv.</span>
          </div>
          <div className={styles.identityDetails}>
            <h3>Yanislav Velikov</h3>
            <p>
              Computer Science Student
              <br />
              Robotics & Cyber-Physical Systems
            </p>
            <div className={styles.identityLine}>
              <MapPin size={14} />
              Based in Luxembourg
            </div>
            <div className={styles.identityLine}>
              <GraduationCap size={14} />
              University of Luxembourg
            </div>
            <div className={styles.identityLine}>
              <Terminal size={14} />
              Learning through building
            </div>
          </div>
        </aside>
      </div>
      <section className={styles.philosophy}>
        <span className="eyebrow">How I approach engineering</span>
        <div className={styles.principleGrid}>
          {[
            [
              '01',
              'Understand the whole system',
              'I’m interested in how software, sensors, actuators and communication work together. A component makes more sense when its role in the larger system is clear.',
            ],
            [
              '02',
              'Make behavior observable',
              'A visualization, a useful trace or a clear model can reveal what an algorithm is actually doing. I value tools that make complex behavior easier to inspect.',
            ],
            [
              '03',
              'Build on strong foundations',
              'Mathematics, software design and careful validation matter. I want to understand the reasoning behind an implementation, as well as how to make it work.',
            ],
          ].map(([n, title, body]) => (
            <article
              className={styles.principle}
              key={n}
            >
              <span>{n} /</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={`panel ${styles.journey}`}>
        <div>
          <span className="eyebrow">Looking ahead</span>
          <h2>
            More connected.
            <br />
            More physical.
          </h2>
          <Link
            to="/education"
            className="text-link"
          >
            My academic journey <ArrowRight size={15} />
          </Link>
        </div>
        <div>
          <p>
            I want to pursue advanced studies and engineering work in systems that connect
            intelligent software with physical environments. These are the directions I’m curious
            about and working toward.
          </p>
          <div className={styles.interests}>
            {[
              'Autonomous robotics',
              'Embedded computing',
              'Cyber-physical systems',
              'Intelligent sensing',
              'Software + hardware',
            ].map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
