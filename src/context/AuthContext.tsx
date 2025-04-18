
import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate authentication state change
  useEffect(() => {
    // Check if user is logged in (using localStorage in this demo)
    const storedUser = localStorage.getItem('sewasetu_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call for login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, create a mock user
      if (email === 'user@example.com' && password === 'password') {
        const userData: User = {
          id: '1',
          name: 'Demo User',
          email: 'user@example.com',
          phone: '9876543210',
          address: 'Bangalore, Karnataka',
        };
        
        localStorage.setItem('sewasetu_user', JSON.stringify(userData));
        setUser(userData);
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Simulate API call for signup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, create a new user
      const userData: User = {
        id: Date.now().toString(),
        name,
        email,
      };
      
      localStorage.setItem('sewasetu_user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      // Clear stored user data
      localStorage.removeItem('sewasetu_user');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Forgot password function
  const forgotPassword = async (email: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Password reset email sent to ${email}`);
      // In a real app, this would call Firebase or your backend API
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  };

  // Update profile function
  const updateProfile = async (data: Partial<User>) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, ...data };
        localStorage.setItem('sewasetu_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    forgotPassword,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
