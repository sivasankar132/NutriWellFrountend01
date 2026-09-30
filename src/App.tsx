import React, { Component, ReactNode } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider as PatientAppProvider } from './context/AppContext';
import { DoctorAdminProvider } from './context/DoctorAdminContext';

// Patient Layouts
import { DashboardLayout } from './layouts/DashboardLayout';
import { AuthLayout } from './layouts/AuthLayout';

// Patient Pages
import { LandingPage } from './pages/Landing';
import { LoginPage } from './pages/Login';
import { SignupPage } from './pages/Signup';
import { OnboardingPage } from './pages/Onboarding';
import { HomePage } from './pages/Home';
import { NutritionPage } from './pages/Nutrition';
import { MealsPage } from './pages/Meals';
import { AnalyticsPage } from './pages/Analytics';
import { DoctorsPage } from './pages/Doctors';
import { DoctorDetailPage } from './pages/DoctorDetail';
import { AppointmentsPage } from './pages/Appointments';
import { EmergencyPage } from './pages/Emergency';
import { HealthConditionsPage } from './pages/HealthConditions';
import { JournalPage } from './pages/Journal';
import { ProgressPage } from './pages/Progress';
import { AIAssistantPage } from './pages/AIAssistant';
import { PricingPage } from './pages/Pricing';
import { ProfilePage } from './pages/Profile';
import { SettingsPage } from './pages/Settings';
import { ModePage } from './pages/Mode';
import { FitnessPage } from './pages/Fitness';
import { FileManagerPage } from './pages/FileManager';


// Doctor & Admin Layout
import { MainLayout as DoctorAdminLayout } from './components/layout/MainLayout';

// Doctor & Admin Pages
import { DoctorLoginPage } from './pages/auth/DoctorLoginPage';
import { DoctorDashboardPage } from './pages/doctor/DoctorDashboardPage';
import { ConsultationRequestsPage } from './pages/doctor/ConsultationRequestsPage';
import { PatientWorkspacePage } from './pages/doctor/PatientWorkspacePage';
import { PatientReviewPage } from './pages/doctor/PatientReviewPage';
import { EarningsWalletPage } from './pages/doctor/EarningsWalletPage';
import { DoctorProfilePage } from './pages/doctor/DoctorProfilePage';

import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { VerificationMgmtPage } from './pages/admin/VerificationMgmtPage';
import { DoctorsMgmtPage } from './pages/admin/DoctorsMgmtPage';
import { DoctorDetailsAdminPage } from './pages/admin/DoctorDetailsAdminPage';
import { PatientsMgmtPage } from './pages/admin/PatientsMgmtPage';
import { PlatformAnalyticsPage } from './pages/admin/PlatformAnalyticsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("NutriWell React Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#04140f] text-[#f0fdf4] flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl bg-[#09221b] border border-[#10b981]/40 shadow-2xl space-y-4">
            <h2 className="text-2xl font-bold text-white">NutriWell Platform Notice</h2>
            <p className="text-xs text-slate-300">An unexpected rendering issue occurred. Reload to restore your health command center.</p>
            <p className="text-[10px] text-emerald-400 bg-slate-950 p-2 rounded text-left overflow-x-auto font-mono">
              {this.state.error?.message}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.hash = '#/';
                window.location.reload();
              }}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
            >
              RELOAD NUTRIWELL
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <PatientAppProvider>
        <DoctorAdminProvider>
          <Router>
            <Routes>
              {/* Patient Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* Patient Auth Shell Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
              </Route>

              {/* Patient Logged-In App Shell Routes */}
              <Route element={<DashboardLayout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/nutrition" element={<NutritionPage />} />
                <Route path="/scanner" element={<HomePage />} />
                <Route path="/meals" element={<MealsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/doctors/:id" element={<DoctorDetailPage />} />
                <Route path="/appointments" element={<AppointmentsPage />} />
                <Route path="/emergency" element={<EmergencyPage />} />
                <Route path="/health-conditions" element={<HealthConditionsPage />} />
                <Route path="/journal" element={<JournalPage />} />
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="/ai-assistant" element={<AIAssistantPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/mode" element={<ModePage />} />
                <Route path="/mode/:modeSlug" element={<ModePage />} />
                <Route path="/fitness" element={<FitnessPage />} />
                <Route path="/file-manager" element={<FileManagerPage />} />
                <Route path="/filemanager" element={<FileManagerPage />} />
                <Route path="/file_manager" element={<FileManagerPage />} />
                <Route path="/files" element={<FileManagerPage />} />
                <Route path="/vault" element={<FileManagerPage />} />
                <Route path="/health-vault" element={<FileManagerPage />} />
                <Route path="/documents" element={<FileManagerPage />} />
              </Route>

              {/* Doctor & Admin Auth Screen */}
              <Route path="/doctor/login" element={<DoctorLoginPage />} />

              {/* Doctor & Admin Protected Layout */}
              <Route element={<DoctorAdminLayout />}>
                {/* DOCTOR PORTAL SCREENS */}
                <Route path="/doctor/dashboard" element={<DoctorDashboardPage />} />
                <Route path="/doctor/requests" element={<ConsultationRequestsPage />} />
                <Route path="/doctor/workspace" element={<PatientWorkspacePage />} />
                <Route path="/doctor/workspace/:requestId" element={<PatientWorkspacePage />} />
                <Route path="/doctor/review" element={<PatientReviewPage />} />
                <Route path="/doctor/earnings" element={<EarningsWalletPage />} />
                <Route path="/doctor/profile" element={<DoctorProfilePage />} />

                {/* ADMIN PORTAL SCREENS */}
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/verifications" element={<VerificationMgmtPage />} />
                <Route path="/admin/doctors" element={<DoctorsMgmtPage />} />
                <Route path="/admin/doctors/:doctorId" element={<DoctorDetailsAdminPage />} />
                <Route path="/admin/patients" element={<PatientsMgmtPage />} />
                <Route path="/admin/analytics" element={<PlatformAnalyticsPage />} />
                <Route path="/admin/settings" element={<AdminSettingsPage />} />
              </Route>

              {/* Fallback Catch-All */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </DoctorAdminProvider>
      </PatientAppProvider>
    </ErrorBoundary>
  );
};

export default App;
