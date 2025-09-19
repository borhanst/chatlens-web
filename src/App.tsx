import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import SocialProof from './components/SocialProof';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import BottomCTA from './components/BottomCTA';
import Footer from './components/Footer';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Dashboard from './components/dashboard/Dashboard';
import BotSettings from './components/dashboard/BotSettings';
import ChatAnalytics from './components/dashboard/ChatAnalytics';
import CrawlerSettings from './components/dashboard/CrawlerSettings';
import WidgetAppearance from './components/dashboard/WidgetAppearance';
import ApiWebhookSettings from './components/dashboard/ApiWebhookSettings';
import BillingSettings from './components/dashboard/BillingSettings';

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <SocialProof />
      <HowItWorks />
      <Pricing />
      <BottomCTA />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />
          <Route path="/dashboard/bot-settings" element={
            <DashboardLayout>
              <BotSettings />
            </DashboardLayout>
          } />
          <Route path="/dashboard/analytics" element={
            <DashboardLayout>
              <ChatAnalytics />
            </DashboardLayout>
          } />
          <Route path="/dashboard/config" element={
            <DashboardLayout>
              <BotSettings />
            </DashboardLayout>
          } />
          <Route path="/dashboard/crawler" element={
            <DashboardLayout>
              <CrawlerSettings />
            </DashboardLayout>
          } />
          <Route path="/dashboard/appearance" element={
            <DashboardLayout>
              <WidgetAppearance />
            </DashboardLayout>
          } />
          <Route path="/dashboard/api" element={
            <DashboardLayout>
              <ApiWebhookSettings />
            </DashboardLayout>
          } />
          <Route path="/dashboard/billing" element={
            <DashboardLayout>
              <BillingSettings />
            </DashboardLayout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;