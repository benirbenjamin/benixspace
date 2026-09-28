import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './client/components/layout/Navbar';
import { Footer } from './client/components/layout/Footer';

// Public Pages
import { HomePage } from './client/pages/HomePage';
import { ProjectsPage } from './client/pages/ProjectsPage';
import { ProjectDetailPage } from './client/pages/ProjectDetailPage';
import { ServicesPage } from './client/pages/ServicesPage';
import { AboutPage } from './client/pages/AboutPage';
import { BlogPage } from './client/pages/BlogPage';
import { BlogDetailPage } from './client/pages/BlogDetailPage';
import { ContactPage } from './client/pages/ContactPage';
import { PrivacyPage } from './client/pages/PrivacyPage';
import { CookiesPage } from './client/pages/CookiesPage';
import { NotFoundPage } from './client/pages/NotFoundPage';

// Admin System Pages
import { AdminLoginPage } from './client/pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './client/pages/admin/AdminDashboardPage';
import { AdminProjectsPage } from './client/pages/admin/AdminProjectsPage';
import { AdminBlogPage } from './client/pages/admin/AdminBlogPage';
import { AdminBlogEditPage } from './client/pages/admin/AdminBlogEditPage';
import { AdminAnalyticsPage } from './client/pages/admin/AdminAnalyticsPage';
import { AdminSeoPage } from './client/pages/admin/AdminSeoPage';
import { AdminSettingsPage } from './client/pages/admin/AdminSettingsPage';
import { AdminProfilePage } from './client/pages/admin/AdminProfilePage';
import { AdminUsersPage } from './client/pages/admin/AdminUsersPage';
import { getAuthToken } from './client/services/api';

import { RouteAnalyticsTracker } from './client/analytics/tracker';

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = getAuthToken();
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <RouteAnalyticsTracker />
        <Routes>
          
          {/* Admin Routes (No default Navbar/Footer) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedAdminRoute>
                <AdminProjectsPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/blog"
            element={
              <ProtectedAdminRoute>
                <AdminBlogPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/blog/new"
            element={
              <ProtectedAdminRoute>
                <AdminBlogEditPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/blog/edit/:id"
            element={
              <ProtectedAdminRoute>
                <AdminBlogEditPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedAdminRoute>
                <AdminUsersPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedAdminRoute>
                <AdminProfilePage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedAdminRoute>
                <AdminAnalyticsPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/seo"
            element={
              <ProtectedAdminRoute>
                <AdminSeoPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/settings/company"
            element={
              <ProtectedAdminRoute>
                <AdminSettingsPage />
              </ProtectedAdminRoute>
            }
          />

          {/* Public Routes (Wrapped with Navbar and Footer) */}
          <Route
            path="*"
            element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:slug" element={<BlogDetailPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/cookies" element={<CookiesPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />

        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
