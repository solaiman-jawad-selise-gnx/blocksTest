import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLanguageContext, LanguageProvider } from './i18n/language-context';
import { LoadingOverlay } from './components/core/loading-overlay';
import './i18n/i18n';
import { ThemeProvider } from './styles/theme/theme-provider';
import { SidebarProvider } from './components/ui/sidebar';
import { Toaster } from './components/ui/toaster';
import { ClientMiddleware } from './state/client-middleware';
import { AuthLayout } from './pages/auth/auth-layout';
import { SigninPage } from './pages/auth/signin/signin-page';
import { SignupPage } from './pages/auth/signup/signup-page';
import { ForgotPasswordPage } from './pages/auth/forgot-password/forgot-password';
import { ResetPasswordPage } from './pages/auth/reset-password/reset-password';
import { SetPasswordPage } from './pages/auth/set-password/set-password';
import { EmailVerification } from './pages/auth/email-verification/email-verification';
import { VerifyOtpKey } from './pages/auth/verify-otp-key/verify-otp-key';
import { ActivationSuccess } from './pages/auth/activation-success/activation-success';
import { VerificationFailed } from './pages/auth/verification-failed/verification-failed';
import MainLayout from './pages/main/main-layout';
import IamTable from './pages/main/iam-table';
import CustomersPage from './pages/customers/customers';
import NotFound from './pages/error/not-found/not-found';
import ServiceUnavailable from './pages/error/service-unavailable/service-unavailable';

const queryClient = new QueryClient();

function AppContent() {
  const { isLoading } = useLanguageContext();

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="min-h-screen bg-background font-sans antialiased relative">
      <ClientMiddleware>
        <ThemeProvider>
          <SidebarProvider>
            <Routes>
              {/* Auth Routes */}
              <Route path="/auth" element={<AuthLayout />}>
                <Route index element={<Navigate to="/auth/signin" replace />} />
                <Route path="signin" element={<SigninPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />} />
                <Route path="reset-password" element={<ResetPasswordPage />} />
                <Route path="set-password" element={<SetPasswordPage />} />
                <Route path="email-verification" element={<EmailVerification />} />
                <Route path="verify-otp-key" element={<VerifyOtpKey />} />
                <Route path="activation-success" element={<ActivationSuccess />} />
                <Route path="verification-failed" element={<VerificationFailed />} />
              </Route>

              {/* Main Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/customers" replace />} />
                <Route path="identity-management" element={<IamTable />} />
                <Route path="customers" element={<CustomersPage />} />
              </Route>

              {/* Error Routes */}
              <Route path="/404" element={<NotFound />} />
              <Route path="/503" element={<ServiceUnavailable />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </SidebarProvider>
        </ThemeProvider>
      </ClientMiddleware>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider defaultLanguage="en-US" defaultModules={['common', 'auth']}>
          <AppContent />
        </LanguageProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
