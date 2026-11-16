import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../app/App';
import ProjectsPage from '../pages/ProjectsPage';
import SkillsPage from '../pages/SkillsPage';
import PurePursuitDemo from '../components/visualizations/PurePursuitDemo';
import CoverageDemo from '../components/visualizations/CoverageDemo';
import { categories, filterProjects, projects } from '../data/projects';
import { skillDomains } from '../data/skills';
import { pursuitGeometry, WHEELBASE } from '../lib/pursuit';

describe('portfolio content integrity', () => {
  it('has unique routes and valid skill references', () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    for (const project of projects) {
      expect(project.implementation.length).toBeGreaterThan(0);
      expect(project.architecture.length).toBeGreaterThan(0);
      expect(categories).toContain(project.category);
    }
    for (const domain of skillDomains)
      for (const slug of domain.projects) expect(projects.some((p) => p.slug === slug)).toBe(true);
  });
  it('combines category and case-insensitive technology search', () => {
    expect(filterProjects('Robotics', '  c++  ').map((p) => p.slug)).toEqual([
      'autonomous-racing-cars',
    ]);
    expect(filterProjects('Software', 'PYTHON')).toHaveLength(0);
    expect(filterProjects('All projects', '')).toHaveLength(8);
  });
});
describe('project discovery', () => {
  it('supports category selection, search, no results and reset', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole('button', { name: 'Robotics' }));
    expect(screen.getByRole('heading', { name: 'Autonomous Racing Cars' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Artmart' })).not.toBeInTheDocument();
    await user.type(screen.getByRole('searchbox'), 'unmatched text');
    expect(screen.getByRole('heading', { name: 'No matching projects' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Reset filters' }));
    expect(screen.getAllByRole('link', { name: /case study/ })).toHaveLength(8);
    expect(screen.getByRole('searchbox')).toHaveValue('');
  });
  it('restores filters from a shared URL', () => {
    render(
      <MemoryRouter initialEntries={['/projects?category=Software&q=coverage']}>
        <ProjectsPage />
      </MemoryRouter>,
    );
    expect(screen.getAllByRole('link', { name: /case study/ })).toHaveLength(1);
    expect(screen.getByRole('searchbox')).toHaveValue('coverage');
  });
});
function BackButton() {
  const navigate = useNavigate();
  return <button onClick={() => navigate(-1)}>Test browser back</button>;
}
describe('real page routing', () => {
  it('navigates through the header, sets active state, and supports browser history', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <BackButton />
        <AppRoutes />
      </MemoryRouter>,
    );
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    await user.click(within(nav).getByRole('link', { name: 'About' }));
    expect(
      await screen.findByRole('heading', { level: 1, name: /Software is the start/ }),
    ).toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: 'About' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await user.click(screen.getByRole('button', { name: 'Test browser back' }));
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Yanislav Velikov' }),
    ).toBeInTheDocument();
  });
  it('opens nested case studies directly and renders their content', async () => {
    render(
      <MemoryRouter initialEntries={['/projects/artmart/']}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(await screen.findByRole('heading', { level: 1, name: 'Artmart' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Clear client and server responsibilities' }),
    ).toBeInTheDocument();
    expect(document.title).toBe('Artmart — Yanislav Velikov');
  });
  it('handles unknown project slugs with a useful 404', async () => {
    render(
      <MemoryRouter initialEntries={['/projects/not-a-project']}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole('heading', { name: 'Let’s find a new path.' }),
    ).toBeInTheDocument();
  });
  it('opens mobile navigation, closes with Escape, then closes after navigation', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AppRoutes />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole('button', { name: 'Open navigation' }));
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open navigation' })).toHaveFocus();
    await user.click(screen.getByRole('button', { name: 'Open navigation' }));
    await user.click(
      within(screen.getByRole('navigation', { name: 'Mobile navigation' })).getByRole('link', {
        name: 'Education',
      }),
    );
    expect(
      await screen.findByRole('heading', { level: 1, name: /Strong foundations/ }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
  });
});
describe('engineering interactions', () => {
  it('computes an exact lookahead intersection and valid steering', () => {
    for (const bend of [-0.2, -0.001, 0, 0.16, 0.2])
      for (const distance of [0.6, 2, 3]) {
        const geometry = pursuitGeometry(distance, bend);
        expect(Math.hypot(geometry.x, geometry.y)).toBeCloseTo(distance, 10);
        expect(geometry.y).toBeCloseTo(bend * geometry.x ** 2, 10);
        expect(geometry.steering).toBeCloseTo(
          Math.atan((WHEELBASE * 2 * geometry.y) / distance ** 2),
          10,
        );
        expect(geometry.x).toBeGreaterThan(0);
      }
    expect(pursuitGeometry(2, 0).steering).toBe(0);
    expect(() => pursuitGeometry(0, 0.2)).toThrow(RangeError);
  });
  it('updates the displayed geometry when a control changes', () => {
    render(<PurePursuitDemo />);
    fireEvent.change(screen.getByRole('slider', { name: /Lookahead distance/ }), {
      target: { value: '3' },
    });
    expect(screen.getByRole('img')).toHaveAccessibleName(/Lookahead 3.0 metres/);
    fireEvent.change(screen.getByRole('slider', { name: /Trajectory bend/ }), {
      target: { value: '0' },
    });
    expect(screen.getByText('0.00°')).toBeInTheDocument();
  });
  it('combines coverage sources and handles neither source selected', async () => {
    const user = userEvent.setup();
    render(<CoverageDemo />);
    expect(screen.getByText('7 / 8 executable lines covered')).toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: 'Integration tests' }));
    expect(screen.getByText('8 / 8 executable lines covered')).toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: 'Unit tests' }));
    await user.click(screen.getByRole('checkbox', { name: 'Integration tests' }));
    expect(screen.getByText('0 / 8 executable lines covered')).toBeInTheDocument();
  });
  it('filters skill domains and exposes related project links', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <SkillsPage />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole('button', { name: 'Robotics' }));
    expect(
      screen.getByRole('heading', { name: 'Robotics & cyber-physical systems' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Programming languages' }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Autonomous Racing Cars' })).toHaveAttribute(
      'href',
      '/projects/autonomous-racing-cars',
    );
    await user.click(screen.getByText('Studied concepts & developing interests'));
    expect(screen.getByText('SLAM fundamentals')).toBeVisible();
  });
});
