/**
 * Authentication service - handles login, register, logout, and user management
 */

import { api } from './api';
import { STORAGE_KEYS } from '@/utils/constants';
import type { 
  User, 
  LoginRequest, 
  RegisterRequest, 
  AuthTokens, 
  ApiResponse 
} from '@/types';

export class AuthService {
  // Register new user
  async register(data: RegisterRequest): Promise<ApiResponse<AuthTokens & { user: User }>> {
    const response = await api.post<ApiResponse<AuthTokens & { user: User }>>(
      '/auth/register', 
      data, 
      false
    );
    
    // Store tokens and user data
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
    
    return response;
  }

  // Login user
  async login(data: LoginRequest): Promise<ApiResponse<AuthTokens & { user: User }>> {
    const response = await api.post<ApiResponse<AuthTokens & { user: User }>>(
      '/auth/login', 
      data, 
      false
    );
    
    // Store tokens and user data
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
    
    return response;
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage
      api.clearTokens();
    }
  }

  // Get current user profile
  async getMe(): Promise<ApiResponse<User>> {
    return api.get<ApiResponse<User>>('/users/me');
  }

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    const response = await api.put<ApiResponse<User>>('/users/me', data);
    
    // Update stored user data
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data));
    
    return response;
  }

  // Change password
  async changePassword(newPassword: string): Promise<ApiResponse<void>> {
    return api.post<ApiResponse<void>>(`/users/change-password?newPassword=${newPassword}`);
  }

  // Delete account
  async deleteAccount(): Promise<ApiResponse<void>> {
    const response = await api.delete<ApiResponse<void>>('/users/me');
    
    // Clear all data after successful deletion
    api.clearTokens();
    
    return response;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  // Get stored user data
  getCurrentUser(): User | null {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  }
}

export const authService = new AuthService();