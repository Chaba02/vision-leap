/**
 * Authentication hook - manages user authentication state and actions
 */

import { useState, useEffect, useCallback } from 'react';
import { authService } from '@/services/auth';
import type { User, LoginRequest, RegisterRequest } from '@/types';

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize authentication state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser && authService.isAuthenticated()) {
          // Verify token with server
          const response = await authService.getMe();
          setUser(response.data);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        authService.logout(); // Clear invalid tokens
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.login(data);
      setUser(response.data.user);
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.register(data);
      setUser(response.data.user);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.updateProfile(data);
      setUser(response.data);
    } catch (err: any) {
      setError(err.message || 'Profile update failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (newPassword: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await authService.changePassword(newPassword);
    } catch (err: any) {
      setError(err.message || 'Password change failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteAccount = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await authService.deleteAccount();
      setUser(null);
    } catch (err: any) {
      setError(err.message || 'Account deletion failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    deleteAccount,
    clearError,
  };
};