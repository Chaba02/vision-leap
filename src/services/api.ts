/**
 * Centralized API service for all HTTP requests
 * Handles authentication, error handling, and request/response processing
 */

import { API_BASE_URL, STORAGE_KEYS } from '@/utils/constants';
import type { ApiResponse } from '@/types';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get stored access token
  private getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  // Get stored refresh token
  private getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  // Set authorization headers
  private getHeaders(includeAuth = true): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getAccessToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // Handle token refresh
  private async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) return false;

      const response = await fetch(`${this.baseURL}/auth/refresh-token?refreshToken=${refreshToken}`, {
        method: 'POST',
        headers: this.getHeaders(false),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
        if (data.refreshToken) {
          localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
        }
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
    
    return false;
  }

  // Generic request method with automatic token refresh
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    includeAuth = true
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(includeAuth),
        ...options.headers,
      },
    };

    try {
      let response = await fetch(url, config);

      // Handle 401 - attempt token refresh
      if (response.status === 401 && includeAuth) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry request with new token
          config.headers = {
            ...this.getHeaders(true),
            ...options.headers,
          };
          response = await fetch(url, config);
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        throw new ApiError(errorData.message || `HTTP ${response.status}`, response.status);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Network request failed', 0);
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, includeAuth = true): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, includeAuth);
  }

  async post<T>(endpoint: string, data?: any, includeAuth = true): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      },
      includeAuth
    );
  }

  async put<T>(endpoint: string, data?: any, includeAuth = true): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      },
      includeAuth
    );
  }

  async delete<T>(endpoint: string, includeAuth = true): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' }, includeAuth);
  }

  // Clear all stored tokens
  clearTokens(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  }
}

// Custom error class
class ApiError extends Error {
  constructor(message: string, public code: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = new ApiService();
export { ApiError };