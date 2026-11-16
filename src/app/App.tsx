import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('../pages/ProjectDetailPage'));
const SkillsPage = lazy(() => import('../pages/SkillsPage'));
const EducationPage = lazy(() => import('../pages/EducationPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={<HomePage />}
        />
        <Route
          path="about"
          element={<AboutPage />}
        />
        <Route
          path="projects"
          element={<ProjectsPage />}
        />
        <Route
          path="projects/:slug"
          element={<ProjectDetailPage />}
        />
        <Route
          path="skills"
          element={<SkillsPage />}
        />
        <Route
          path="education"
          element={<EducationPage />}
        />
        <Route
          path="contact"
          element={<ContactPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
}
export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </BrowserRouter>
  );
}
