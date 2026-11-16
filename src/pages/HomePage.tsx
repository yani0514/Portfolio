import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CirclePlay,
  Code2,
  Cpu,
  GraduationCap,
  UserRound,
} from 'lucide-react';
import { gsap } from 'gsap';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ui/ProjectCard';
import { Metadata } from '../components/ui/Metadata';
import { useMotion } from '../hooks/useMotion';
import styles from './HomePage.module.css';

export default function HomePage() {
  const hero = useRef<HTMLElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const enabled = useMotion();
  useEffect(() => {
    if (!enabled) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-intro]', {
        y: 15,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'all',
      });
      gsap.to(image.current, {
        y: 35,
        ease: 'none',
        scrollTrigger: { trigger: hero.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, hero);
    const move = (event: PointerEvent) => {
      if (!window.matchMedia('(pointer:fine)').matches || !image.current) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 8;
      gsap.to(image.current, { x, duration: 1, overwrite: 'auto' });
    };
    const el = hero.current;
    el?.addEventListener('pointermove', move);
    return () => {
      ctx.revert();
      el?.removeEventListener('pointermove', move);
    };
  }, [enabled]);
  return (
    <>
      <Metadata />
      <section
        ref={hero}
        className={`${styles.hero} ${enabled ? styles.animated : ''}`}
      >
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={`${import.meta.env.BASE_URL}images/robotics-lab-mobile.webp`}
          />
          <img
            ref={image}
            className={styles.heroImage}
            src={`${import.meta.env.BASE_URL}images/robotics-lab.webp`}
            width="1672"
            height="941"
            fetchPriority="high"
            alt="White robotic arm illuminated by blue light in a dark laboratory; conceptual artwork"
          />
        </picture>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <p
              data-intro
              className={`${styles.label} eyebrow`}
            >
              Computer Science <span className="mx-2">/</span> Robotics{' '}
              <span className="mx-2">/</span> Cyber-Physical Systems
            </p>
            <h1
              data-intro
              className={styles.title}
            >
              Yanislav <span>Velikov</span>
            </h1>
            <p
              data-intro
              className={styles.subtitle}
            >
              Computer Science Student & Robotics Enthusiast
            </p>
            <div className={styles.divider} />
            <p
              data-intro
              className={styles.description}
            >
              <strong>Building intelligent systems</strong> that bridge software and real-world
              engineering — from autonomous robots to cyber-physical and IoT solutions.
            </p>
            <div
              data-intro
              className={styles.ctas}
            >
              <Link
                className="button"
                to="/projects"
              >
                <CirclePlay size={17} />
                Explore My Work
              </Link>
              <Link
                className="button secondary"
                to="/about"
              >
                About Me <ArrowUpRight size={15} />
              </Link>
            </div>
            <div
              data-intro
              className={styles.expertise}
            >
              <Link to="/projects?category=Robotics">
                <Bot size={22} />
                Robotics
              </Link>
              <Link to="/projects?category=Software">
                <Code2 size={22} />
                Software Engineering
              </Link>
              <Link to="/projects?category=AI+%26+Data">
                <Cpu size={22} />
                AI & Machine Learning
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.hologram} />
        <span className={styles.instrument}>Software ↔ Physical world</span>
      </section>
      <section className={styles.featured}>
        <div className="container">
          <div className={styles.sectionTop}>
            <h2 className="section-title">Featured Projects</h2>
            <Link
              to="/projects"
              className="text-link"
            >
              View all projects <ArrowRight size={16} />
            </Link>
          </div>
          <div className={styles.featuredGrid}>
            {projects
              .filter((p) => p.featured)
              .map((p) => (
                <ProjectCard
                  key={p.slug}
                  project={p}
                  compact
                />
              ))}
          </div>
        </div>
      </section>
      <section className={styles.intro}>
        <div className={`container ${styles.introInner}`}>
          <div>
            <span className="eyebrow">A little context</span>
            <h2>
              Curious about the code.
              <br />
              Even more about what it can move.
            </h2>
            <p>
              Studying Computer Science in Luxembourg. Exploring robotics, intelligent software and
              the space between the digital and physical worlds.
            </p>
          </div>
          <div className={styles.introLinks}>
            <Link to="/about">
              <UserRound size={23} />
              <span>
                <strong>The person behind the projects</strong>
                <small>My background, approach and engineering interests</small>
              </span>
              <ArrowUpRight size={18} />
            </Link>
            <Link to="/education">
              <GraduationCap size={23} />
              <span>
                <strong>Luxembourg → Vienna → what’s next</strong>
                <small>An academic journey shaped by hands-on learning</small>
              </span>
              <ArrowUpRight size={18} />
            </Link>
            <Link to="/skills">
              <Cpu size={23} />
              <span>
                <strong>A toolkit for connected systems</strong>
                <small>Explore the skills behind the work</small>
              </span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
