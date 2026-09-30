import { apiClient } from './client';
import { ApiUser } from './types';

export interface UserUpdatePayload {
  name?: string;
  avatar_url?: string;
  phone?: string;
  bio?: string;
  [key: string]: any;
}

export const userApi = {
  /**
   * Get current user info
   * GET /users/me
   */
  async getMe(): Promise<ApiUser> {
    return apiClient.get<ApiUser>('/users/me');
  },

  /**
   * Update current user profile
   * PUT /users/me
   */
  async updateMe(payload: UserUpdatePayload): Promise<ApiUser> {
    return apiClient.put<ApiUser>('/users/me', payload);
  },

  /**
   * Get combined user & nutrition profile
   * GET /users/profile
   */
  async getProfile(): Promise<any> {
    return apiClient.get<any>('/users/profile');
  },

  /**
   * Update combined user & nutrition profile
   * PUT /users/profile
   */
  async updateProfile(payload: any): Promise<any> {
    return apiClient.put<any>('/users/profile', payload);
  }
};
