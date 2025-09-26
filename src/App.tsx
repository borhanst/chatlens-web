import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
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
import ChatAnalytics from './components/dashboard/ChatAnalytics';
import CrawlerSettings from './components/dashboard/CrawlerSettings';
import CrawlerList from './components/dashboard/CrawlerList';
import CreateCrawler from './components/dashboard/CreateCrawler';
import WidgetAppearance from './components/dashboard/WidgetAppearance';
import ApiWebhookSettings from './components/dashboard/ApiWebhookSettings';
import BillingSettings from './components/dashboard/BillingSettings';
import ProfileSettings from './components/dashboard/ProfileSettings';
import AgentSettings from './components/dashboard/AgentSettings';
import { AgentManager } from './components/dashboard/AgentManager';

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
          <Route path="/login" element={
            <ProtectedRoute requireAuth={false}>
              <LoginPage />
            </ProtectedRoute>
          } />
          <Route path="/register" element={
            <ProtectedRoute requireAuth={false}>
              <RegisterPage />
            </ProtectedRoute>
          } />
          <Route path="/forgot-password" element={
            <ProtectedRoute requireAuth={false}>
              <ForgotPasswordPage />
            </ProtectedRoute>
          } />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/agent-settings" element={
            <ProtectedRoute>
              <DashboardLayout>
                <AgentManager />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/analytics" element={
            <ProtectedRoute>
              <DashboardLayout>
                <ChatAnalytics />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/config" element={
            <ProtectedRoute>
              <DashboardLayout>
                <AgentSettings />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/crawler" element={
            <ProtectedRoute>
              <DashboardLayout>
                <CrawlerList />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/crawler/create" element={
            <ProtectedRoute>
              <DashboardLayout>
                <CreateCrawler />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/crawler/:id" element={
            <ProtectedRoute>
              <DashboardLayout>
                <CrawlerSettings />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/appearance" element={
            <ProtectedRoute>
              <DashboardLayout>
                <WidgetAppearance />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/api" element={
            <ProtectedRoute>
              <DashboardLayout>
                <ApiWebhookSettings />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/billing" element={
            <ProtectedRoute>
              <DashboardLayout>
                <BillingSettings />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/profile" element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProfileSettings />
              </DashboardLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;