import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigationType } from 'react-router-dom';
import {
  ArrowUpRight,
  AudioLines,
  Code2,
  GraduationCap,
  House,
  Layers3,
  Mail,
  Menu,
  UserRound,
  X,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { profile } from '../../data/profile';
import { useMotion } from '../../hooks/useMotion';
import { usePreferences } from '../../stores/preferences';
import styles from './Layout.module.css';

gsap.registerPlugin(ScrollTrigger);
const navigation = [
  { to: '/', label: 'Home', icon: House },
  { to: '/about', label: 'About', icon: UserRound },
  { to: '/projects', label: 'Projects', icon: Layers3 },
  { to: '/skills', label: 'Skills', icon: Code2 },
  { to: '/education', label: 'Education', icon: GraduationCap },
  { to: '/contact', label: 'Contact', icon: Mail },
];
const positions = new Map<string, number>();

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigationType = useNavigationType();
  const main = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const enabled = useMotion();
  const { motion, toggleMotion } = usePreferences();
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (!enabled || !window.matchMedia('(pointer:fine)').matches) return;
    const lenis = new Lenis({ duration: 0.85, smoothWheel: true, anchors: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [enabled]);

  useEffect(() => {
    const save = () => positions.set(location.key, window.scrollY);
    window.addEventListener('scroll', save, { passive: true });
    return () => window.removeEventListener('scroll', save);
  }, [location.key]);

  useEffect(() => {
    setMenuOpen(false);
    if (previousPath.current !== location.pathname) {
      const y = navigationType === 'POP' ? (positions.get(location.key) ?? 0) : 0;
      const frame = requestAnimationFrame(() => {
        window.scrollTo({ top: y, behavior: 'instant' });
        main.current?.focus({ preventScroll: true });
      });
      previousPath.current = location.pathname;
      return () => cancelAnimationFrame(frame);
    }
  }, [location.pathname, location.key, navigationType]);

  useEffect(() => {
    if (!enabled) return;
    const ctx = gsap.context(() =>
      gsap.fromTo(
        main.current,
        { opacity: 0.25, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'all' },
      ),
    );
    return () => ctx.revert();
  }, [location.pathname, enabled]);

  useEffect(() => {
    if (!menuOpen) return;
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [menuOpen]);

  return (
    <>
      <a
        className={styles.skip}
        href="#main"
      >
        Skip to content
      </a>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Link
            className={styles.brand}
            to="/"
            aria-label="Yanislav Velikov home"
          >
            Yanislav Velikov <span className={styles.brandSlash}>/</span>
            <span className={styles.descriptor}>Computer Science · Robotics & CPS</span>
          </Link>
          <nav
            className={styles.nav}
            aria-label="Main navigation"
          >
            {navigation.slice(1).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={`${styles.navLink} ${item.to === '/contact' ? styles.navContact : ''}`}
              >
                {item.label}
                {item.to === '/contact' && <ArrowUpRight size={13} />}
              </NavLink>
            ))}
          </nav>
          <button
            ref={menuButton}
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className={styles.mobileNav}
            aria-label="Mobile navigation"
          >
            {navigation.map(({ icon: Icon, ...item }) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMenuOpen(false)}
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>
      <nav
        className={`${styles.rail} ${location.pathname === '/' ? styles.homeRail : ''}`}
        aria-label="Page shortcuts"
      >
        {navigation.map(({ icon: Icon, ...item }) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={styles.railLink}
            aria-label={item.label}
          >
            <Icon
              size={21}
              strokeWidth={1.5}
            />
            <span className={styles.tooltip}>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <main
        id="main"
        ref={main}
        tabIndex={-1}
        className={styles.main}
        style={{ outline: 'none' }}
      >
        <Suspense
          fallback={
            <div
              className={styles.routeLoading}
              role="status"
            >
              Loading workspace…
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <div className={styles.footerIdentity}>
            <Link
              to="/"
              className={styles.monogram}
              aria-label="Home"
            >
              yv<span className="accent">.</span>
            </Link>
            <span>
              © {new Date().getFullYear()} Yanislav Velikov <span className="mx-2">/</span> Built
              with curiosity.
            </span>
          </div>
          <div className={styles.footerLinks}>
            <span>
              Luxembourg <span className="accent">↗</span>
            </span>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <Link to="/contact">Get in touch</Link>
            <button
              className={styles.motion}
              aria-pressed={motion}
              onClick={toggleMotion}
            >
              <AudioLines size={13} /> Motion {enabled ? 'on' : 'off'}
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
