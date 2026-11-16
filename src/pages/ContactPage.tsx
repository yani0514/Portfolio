import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  Copy,
  GitFork as Github,
  GraduationCap,
  MapPin,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { Breadcrumbs, PageHeading } from '../components/ui/PageHeading';
import { Metadata } from '../components/ui/Metadata';
import styles from './Pages.module.css';
export default function ContactPage() {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.github);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
  }
  return (
    <div className="page-container">
      <Metadata />
      <Breadcrumbs current="Contact" />
      <PageHeading
        label="Let’s make the connection"
        title={
          <>
            Good systems start
            <br />
            with a <span className="accent">conversation.</span>
          </>
        }
        description="Interested in robotics, thoughtful software or a project that brings the two together? I’d be glad to connect."
      />
      <div className={styles.contactGrid}>
        <section>
          <h2 className={styles.contactLead}>
            Curious people.
            <br />
            Meaningful engineering problems.
            <br />
            Something worth building.
          </h2>
          <p>
            I’m a Computer Science student exploring the next steps in robotics and cyber-physical
            engineering. I’m interested in exchanging ideas, learning from others and contributing
            to thoughtful technical work.
          </p>
          <div className={styles.collaboration}>
            <div>
              <Bot size={21} />
              <span>Robotics & autonomous systems</span>
            </div>
            <div>
              <Code2 size={21} />
              <span>Software tools & engineering collaboration</span>
            </div>
            <div>
              <GraduationCap size={21} />
              <span>Academic projects & research directions</span>
            </div>
          </div>
          <div className={styles.location}>
            <MapPin size={15} />
            Luxembourg <span className="mx-2">/</span> Europe · CET / CEST
          </div>
        </section>
        <aside className={`panel ${styles.contactCard}`}>
          <div className={styles.contactCardTop}>
            <Github size={34} />
            <span className="eyebrow">Find me online</span>
          </div>
          <h2>Let’s connect on GitHub.</h2>
          <p>Explore my public work and professional profile.</p>
          <a
            className="button"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            Visit GitHub profile <ArrowUpRight size={17} />
          </a>
          <button
            className={styles.copyButton}
            onClick={copy}
          >
            {copyState === 'copied' ? <Check size={14} /> : <Copy size={14} />}
            <span role="status">
              {copyState === 'copied'
                ? 'Profile link copied'
                : copyState === 'error'
                  ? 'Copy unavailable — use the profile link above'
                  : 'Copy profile link'}
            </span>
          </button>
          {profile.email && (
            <a
              className="text-link mt-5"
              href={`mailto:${profile.email}`}
            >
              Send an email <ArrowUpRight size={14} />
            </a>
          )}
          {profile.linkedin && (
            <a
              className="text-link mt-5"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <ArrowUpRight size={14} />
            </a>
          )}
          {profile.cv && (
            <a
              className="text-link mt-5"
              href={`${import.meta.env.BASE_URL}${profile.cv}`}
              download
            >
              Download CV <ArrowRight size={14} />
            </a>
          )}
        </aside>
      </div>
      <div className={styles.contactClosing}>
        <p>A little more context before we connect?</p>
        <Link
          to="/projects"
          className="text-link"
        >
          Take a look at my work <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
