import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pages } from '../../data/profile';

export function Metadata({
  title,
  description,
  noindex = false,
}: {
  title?: string;
  description?: string;
  noindex?: boolean;
}) {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, '') || '/';
  const page = pages[path as keyof typeof pages];
  const resolvedTitle = title ?? page?.title ?? 'Yanislav Velikov';
  const resolvedDescription = description ?? page?.description ?? pages['/'].description;
  useEffect(() => {
    document.title = resolvedTitle;
    const meta = (attribute: string, key: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, key);
        document.head.append(el);
      }
      el.content = value;
    };
    meta('name', 'description', resolvedDescription);
    meta('property', 'og:title', resolvedTitle);
    meta('property', 'og:description', resolvedDescription);
    meta('name', 'robots', noindex ? 'noindex,follow' : 'index,follow');
    const origin = import.meta.env.VITE_SITE_URL as string | undefined;
    if (origin) {
      const base = import.meta.env.BASE_URL;
      const url = `${origin.replace(/\/$/, '')}${base}${path === '/' ? '' : `${path.slice(1)}/`}`;
      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.append(canonical);
      }
      canonical.href = url;
      meta('property', 'og:url', url);
    }
  }, [resolvedTitle, resolvedDescription, path, noindex]);
  return null;
}
