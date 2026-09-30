import { apiClient } from './client';
import { ApiUser, AuthResponse } from './types';

export interface RegisterPayload {
  email: string;
  password: string;
  name?: string;
  role?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authApi = {
  /**
   * Register a new user
   * POST /auth/signup
   */
  async signup(payload: RegisterPayload): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/signup', payload);
    if (res.access_token) {
      apiClient.setToken(res.access_token);
    }
    return res;
  },

  /**
   * Log in an existing user
   * POST /auth/login
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/login', payload);
    if (res.access_token) {
      apiClient.setToken(res.access_token);
    }
    return res;
  },

  /**
   * Log out current user
   * POST /auth/logout
   */
  async logout(): Promise<{ message: string }> {
    try {
      const res = await apiClient.post<{ message: string }>('/auth/logout');
      return res;
    } finally {
      apiClient.clearToken();
    }
  },

  /**
   * Get current authenticated user details
   * GET /auth/me
   */
  async getMe(): Promise<ApiUser> {
    return apiClient.get<ApiUser>('/auth/me');
  },

  /**
   * Check if token exists
   */
  isAuthenticated(): boolean {
    return apiClient.isAuthenticated();
  },

  /**
   * Retrieve current token
   */
  getToken(): string | null {
    return apiClient.getToken();
  },

  /**
   * Clear auth credentials
   */
  clearAuth(): void {
    apiClient.clearToken();
  }
};
