import { ArrowLeft, Radar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Metadata } from '../components/ui/Metadata';
export default function NotFoundPage() {
  return (
    <div className="page-container not-found">
      <Metadata
        title="Page Not Found — Yanislav Velikov"
        description="This route is outside the portfolio. Return to the project collection."
        noindex
      />
      <Radar
        size={48}
        className="accent mx-auto"
      />
      <p className="eyebrow mt-8">404 / Outside the mapped area</p>
      <h1 className="page-title">Let’s find a new path.</h1>
      <p className="muted">
        This page doesn’t exist. The next project might be what you’re looking for.
      </p>
      <Link
        className="button"
        to="/projects"
      >
        <ArrowLeft size={16} />
        Back to projects
      </Link>
    </div>
  );
}
