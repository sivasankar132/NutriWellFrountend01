import { apiClient } from './client';
import { MealPlanDto, MealPlanItemDto } from './types';

export interface MealPlanItemPayload {
  food_id?: string;
  food_name: string;
  day_of_week: string;
  meal_type: string;
  serving_size: number;
  serving_unit?: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g?: number;
  notes?: string;
}

export interface MealPlanCreatePayload {
  name: string;
  description?: string;
  target_calories: number;
  target_protein_g: number;
  target_carbs_g: number;
  target_fat_g: number;
  start_date?: string;
  end_date?: string;
  items?: MealPlanItemPayload[];
}

export interface MealPlanUpdatePayload {
  name?: string;
  description?: string;
  target_calories?: number;
  target_protein_g?: number;
  target_carbs_g?: number;
  target_fat_g?: number;
  start_date?: string;
  end_date?: string;
  is_active?: boolean;
}

export const mealPlansApi = {
  /**
   * Get all meal plans for user
   * GET /meal-plans
   */
  async getMealPlans(): Promise<MealPlanDto[]> {
    return apiClient.get<MealPlanDto[]>('/meal-plans');
  },

  /**
   * Create new meal plan
   * POST /meal-plans
   */
  async createMealPlan(payload: MealPlanCreatePayload): Promise<MealPlanDto> {
    return apiClient.post<MealPlanDto>('/meal-plans', payload);
  },

  /**
   * Get single meal plan details
   * GET /meal-plans/{plan_id}
   */
  async getMealPlanById(planId: string): Promise<MealPlanDto> {
    return apiClient.get<MealPlanDto>(`/meal-plans/${planId}`);
  },

  /**
   * Update meal plan
   * PUT /meal-plans/{plan_id}
   */
  async updateMealPlan(planId: string, payload: MealPlanUpdatePayload): Promise<MealPlanDto> {
    return apiClient.put<MealPlanDto>(`/meal-plans/${planId}`, payload);
  },

  /**
   * Delete meal plan
   * DELETE /meal-plans/{plan_id}
   */
  async deleteMealPlan(planId: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/meal-plans/${planId}`);
  },

  /**
   * Add item to meal plan
   * POST /meal-plans/{plan_id}/items
   */
  async addMealPlanItem(planId: string, item: MealPlanItemPayload): Promise<MealPlanItemDto> {
    return apiClient.post<MealPlanItemDto>(`/meal-plans/${planId}/items`, item);
  },

  /**
   * Update item inside meal plan
   * PUT /meal-plans/{plan_id}/items/{item_id}
   */
  async updateMealPlanItem(planId: string, itemId: string, item: Partial<MealPlanItemPayload>): Promise<MealPlanItemDto> {
    return apiClient.put<MealPlanItemDto>(`/meal-plans/${planId}/items/${itemId}`, item);
  },

  /**
   * Delete item from meal plan
   * DELETE /meal-plans/{plan_id}/items/{item_id}
   */
  async deleteMealPlanItem(planId: string, itemId: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/meal-plans/${planId}/items/${itemId}`);
  }
};
