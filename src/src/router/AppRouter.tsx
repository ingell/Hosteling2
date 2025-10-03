import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from '../shared/contexts/AppContext';
import { useAdmin } from '../contexts/AdminContext';

// Pages
import { LandingPage } from '../pages/LandingPage';
import { PreLaunchPage } from '../pages/PreLaunchPage';
import { BrowsePage } from '../pages/BrowsePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { DashboardPage } from '../pages/DashboardPage';
import { HostelDetailPage } from '../pages/HostelDetailPage';
import { HowItWorksPage } from '../pages/HowItWorksPage';
import { ForHostelsPage } from '../pages/ForHostelsPage';
import { VolunteerCommunityPage } from '../pages/VolunteerCommunityPage';
import { SafetyGuidelinesPage } from '../pages/SafetyGuidelinesPage';
import { AboutPage } from '../pages/AboutPage';
import { HelpCenterPage } from '../pages/HelpCenterPage';
import { ContactPage } from '../pages/ContactPage';
import { TermsPage } from '../pages/TermsPage';
import { PrivacyPage } from '../pages/PrivacyPage';

// Admin Pages
import { AdminLoginPage } from '../pages/AdminLoginPage';
import { AdminDashboardPage } from '../pages/AdminDashboardPage';

// Layouts
import { Layout } from '../layouts/Layout';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useApp();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Admin protected route component
const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdminLoggedIn } = useAdmin();
  
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

export const AppRouter: React.FC = () => {
  const { isLoggedIn } = useApp();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <PreLaunchPage />} />
      
      <Route path="/launch" element={
        <Layout>
          <LandingPage />
        </Layout>
      } />
      
      <Route path="/browse" element={
        <Layout>
          <BrowsePage />
        </Layout>
      } />
      
      <Route path="/login" element={
        <Layout headerVariant="minimal" showFooter={false}>
          <LoginPage />
        </Layout>
      } />
      
      <Route path="/signup" element={
        <Layout headerVariant="minimal" showFooter={false}>
          <SignupPage />
        </Layout>
      } />
      
      <Route path="/hostel/:id" element={
        <Layout>
          <HostelDetailPage />
        </Layout>
      } />
      
      {/* Informational pages */}
      <Route path="/how-it-works" element={
        <Layout>
          <HowItWorksPage />
        </Layout>
      } />
      
      <Route path="/for-hostels" element={
        <Layout>
          <ForHostelsPage />
        </Layout>
      } />
      
      <Route path="/volunteer-community" element={
        <Layout>
          <VolunteerCommunityPage />
        </Layout>
      } />
      
      <Route path="/safety-guidelines" element={
        <Layout>
          <SafetyGuidelinesPage />
        </Layout>
      } />
      
      <Route path="/about" element={
        <Layout>
          <AboutPage />
        </Layout>
      } />
      
      <Route path="/help-center" element={
        <Layout>
          <HelpCenterPage />
        </Layout>
      } />
      
      <Route path="/contact" element={
        <Layout>
          <ContactPage />
        </Layout>
      } />
      
      <Route path="/terms" element={
        <Layout>
          <TermsPage />
        </Layout>
      } />
      
      <Route path="/privacy" element={
        <Layout>
          <PrivacyPage />
        </Layout>
      } />

      {/* Protected routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <DashboardPage />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      
      <Route path="/admin/dashboard" element={
        <AdminProtectedRoute>
          <AdminDashboardPage />
        </AdminProtectedRoute>
      } />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};