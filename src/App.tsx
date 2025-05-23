import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Contexts
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";

// Layout
import AppLayout from "./components/AppLayout";
import PrivateRoute from "./components/PrivateRoute";

// Auth screens
import LoginScreen from "./screens/auth/LoginScreen";
import SignupScreen from "./screens/auth/SignupScreen";
import ForgotPasswordScreen from "./screens/auth/ForgotPasswordScreen";

// App screens
import HomeScreen from "./screens/HomeScreen";
import ServiceCategoryListScreen from "./screens/ServiceCategoryListScreen";
import CategoryProvidersScreen from "./screens/CategoryProvidersScreen";
import ServiceProviderScreen from "./screens/ServiceProviderScreen";
import ServiceProvidersScreen from "./screens/ServiceProvidersScreen";
import BookingScreen from "./screens/BookingScreen";
import BookingsScreen from "./screens/BookingsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UrgentServiceScreen from "./screens/UrgentServiceScreen";
import NotFound from "./pages/NotFound";

// Screens
import SplashScreen from "./screens/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import ChooseRoleScreen from "./screens/ChooseRoleScreen";

// Help Screens
import HelpCenterScreen from './screens/help/HelpCenterScreen';
import PrivacyScreen from './screens/help/PrivacyScreen';
import FAQScreen from './screens/help/FAQScreen';
import ContactSupportScreen from './screens/help/ContactSupportScreen';
import TermsScreen from './screens/help/TermsScreen';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <NotificationProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Initial Routes */}
                  <Route path="/" element={<SplashScreen />} />
                  <Route path="/onboarding" element={<OnboardingScreen />} />
                  <Route path="/choose-role" element={<ChooseRoleScreen />} />

                  {/* Public Routes */}
                  <Route path="/login" element={<LoginScreen />} />
                  <Route path="/signup" element={<SignupScreen />} />
                  <Route path="/forgot-password" element={<ForgotPasswordScreen />} />

                  {/* Help Center Routes */}
                  <Route path="/help" element={<HelpCenterScreen />} />
                  <Route path="/help/privacy" element={<PrivacyScreen />} />
                  <Route path="/help/faq" element={<FAQScreen />} />
                  <Route path="/help/contact" element={<ContactSupportScreen />} />
                  <Route path="/help/terms" element={<TermsScreen />} />

                  {/* Protected Routes */}
                  <Route element={<PrivateRoute />}>
                    <Route element={<AppLayout />}>
                      <Route path="/home" element={<HomeScreen />} />
                      <Route path="/categories" element={<ServiceCategoryListScreen />} />
                      <Route path="/category/:categoryId" element={<CategoryProvidersScreen />} />
                      <Route path="/providers" element={<ServiceProvidersScreen />} />
                      <Route path="/provider/:providerId" element={<ServiceProviderScreen />} />
                      <Route path="/booking/:providerId" element={<BookingScreen />} />
                      <Route path="/bookings" element={<BookingsScreen />} />
                      <Route path="/urgent" element={<UrgentServiceScreen />} />
                      <Route path="/profile" element={<ProfileScreen />} />
                    </Route>
                  </Route>

                  {/* Redirect root to home for logged in users */}
                  <Route 
                    path="/home" 
                    element={<Navigate to="/home" replace />} 
                  />

                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </NotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
