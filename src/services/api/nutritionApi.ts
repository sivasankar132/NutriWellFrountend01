import { apiClient } from './client';
import { NutritionProfileDto, NutritionGoalDto } from './types';

export interface NutritionProfilePayload {
  age: number;
  gender: string;
  height_cm: number;
  weight_kg: number;
  activity_level: string;
  dietary_preference: string;
  target_calories: number;
  target_protein_g: number;
  target_carbs_g: number;
  target_fat_g: number;
  target_fiber_g?: number;
  target_water_ml?: number;
}

export interface NutritionGoalPayload {
  goal_type: string;
  target_weight_kg?: number;
  weekly_weight_goal_kg?: number;
  target_calories: number;
  target_protein_g: number;
  target_carbs_g?: number;
  target_fat_g?: number;
  target_water_ml?: number;
  start_date?: string;
  end_date?: string;
  status?: string;
}

export const nutritionApi = {
  // --- Nutrition Profile ---
  async getProfile(): Promise<NutritionProfileDto> {
    return apiClient.get<NutritionProfileDto>('/nutrition/profile');
  },

  async createProfile(payload: NutritionProfilePayload): Promise<NutritionProfileDto> {
    return apiClient.post<NutritionProfileDto>('/nutrition/profile', payload);
  },

  async updateProfile(payload: Partial<NutritionProfilePayload>): Promise<NutritionProfileDto> {
    return apiClient.put<NutritionProfileDto>('/nutrition/profile', payload);
  },

  // Save (upsert helper: tries update first, falls back to create if not found)
  async saveProfile(payload: NutritionProfilePayload): Promise<NutritionProfileDto> {
    try {
      return await this.updateProfile(payload);
    } catch (err: any) {
      if (err?.status === 404) {
        return await this.createProfile(payload);
      }
      throw err;
    }
  },

  // --- Nutrition Goals ---
  async getGoals(): Promise<NutritionGoalDto[]> {
    return apiClient.get<NutritionGoalDto[]>('/nutrition/goals');
  },

  async createGoal(payload: NutritionGoalPayload): Promise<NutritionGoalDto> {
    return apiClient.post<NutritionGoalDto>('/nutrition/goals', payload);
  },

  async updateGoal(goalId: string, payload: Partial<NutritionGoalPayload>): Promise<NutritionGoalDto> {
    return apiClient.put<NutritionGoalDto>(`/nutrition/goals/${goalId}`, payload);
  },

  async deleteGoal(goalId: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/nutrition/goals/${goalId}`);
  }
};
