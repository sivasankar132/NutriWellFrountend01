import { apiClient } from './client';
import { MealDto, MealItemDto } from './types';

export interface MealItemPayload {
  food_id?: string;
  food_name: string;
  serving_size: number;
  serving_unit?: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g?: number;
  cost_inr?: number;
}

export interface MealCreatePayload {
  name: string;
  meal_type: string;
  date?: string;
  total_calories: number;
  total_protein_g: number;
  total_carbs_g: number;
  total_fat_g: number;
  items?: MealItemPayload[];
}

export interface MealUpdatePayload {
  name?: string;
  meal_type?: string;
  date?: string;
  total_calories?: number;
  total_protein_g?: number;
  total_carbs_g?: number;
  total_fat_g?: number;
}

export const mealsApi = {
  /**
   * Get all meals for user, optionally filtered by date (YYYY-MM-DD)
   * GET /meals
   */
  async getMeals(date?: string): Promise<MealDto[]> {
    const endpoint = date ? `/meals?date=${encodeURIComponent(date)}` : '/meals';
    return apiClient.get<MealDto[]>(endpoint);
  },

  /**
   * Log a new meal
   * POST /meals
   */
  async createMeal(payload: MealCreatePayload): Promise<MealDto> {
    return apiClient.post<MealDto>('/meals', payload);
  },

  /**
   * Get meal details by ID
   * GET /meals/{meal_id}
   */
  async getMealById(mealId: string): Promise<MealDto> {
    return apiClient.get<MealDto>(`/meals/${mealId}`);
  },

  /**
   * Update meal details
   * PUT /meals/{meal_id}
   */
  async updateMeal(mealId: string, payload: MealUpdatePayload): Promise<MealDto> {
    return apiClient.put<MealDto>(`/meals/${mealId}`, payload);
  },

  /**
   * Delete meal
   * DELETE /meals/{meal_id}
   */
  async deleteMeal(mealId: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/meals/${mealId}`);
  },

  /**
   * Add item to existing meal
   * POST /meals/{meal_id}/items
   */
  async addMealItem(mealId: string, item: MealItemPayload): Promise<MealItemDto> {
    return apiClient.post<MealItemDto>(`/meals/${mealId}/items`, item);
  },

  /**
   * Update item inside meal
   * PUT /meals/{meal_id}/items/{item_id}
   */
  async updateMealItem(mealId: string, itemId: string, item: Partial<MealItemPayload>): Promise<MealItemDto> {
    return apiClient.put<MealItemDto>(`/meals/${mealId}/items/${itemId}`, item);
  },

  /**
   * Remove item from meal
   * DELETE /meals/{meal_id}/items/{item_id}
   */
  async deleteMealItem(mealId: string, itemId: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/meals/${mealId}/items/${itemId}`);
  }
};
