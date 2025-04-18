
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";

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
import BookingScreen from "./screens/BookingScreen";
import BookingsScreen from "./screens/BookingsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NotFound from "./pages/NotFound";

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
                  {/* Public Routes */}
                  <Route path="/login" element={<LoginScreen />} />
                  <Route path="/signup" element={<SignupScreen />} />
                  <Route path="/forgot-password" element={<ForgotPasswordScreen />} />

                  {/* Protected Routes */}
                  <Route element={<PrivateRoute />}>
                    <Route element={<AppLayout />}>
                      <Route path="/" element={<HomeScreen />} />
                      <Route path="/categories" element={<ServiceCategoryListScreen />} />
                      <Route path="/category/:categoryId" element={<CategoryProvidersScreen />} />
                      <Route path="/provider/:providerId" element={<ServiceProviderScreen />} />
                      <Route path="/booking/:providerId" element={<BookingScreen />} />
                      <Route path="/bookings" element={<BookingsScreen />} />
                      <Route path="/profile" element={<ProfileScreen />} />
                    </Route>
                  </Route>

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
