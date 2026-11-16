import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

export function Breadcrumbs({ current, project = false }: { current: string; project?: boolean }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="breadcrumb"
    >
      <Link to="/">Home</Link>
      <ChevronRight size={11} />
      {project && (
        <>
          <Link to="/projects">Projects</Link>
          <ChevronRight size={11} />
        </>
      )}
      <span aria-current="page">{current}</span>
    </nav>
  );
}
export function PageHeading({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-heading">
      <p className="eyebrow">{label}</p>
      <h1 className="page-title">{title}</h1>
      <p className="page-intro">{description}</p>
      {children}
    </header>
  );
}
