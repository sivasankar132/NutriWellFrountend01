import { apiClient } from './client';
import { FoodItemDto } from './types';

export interface FoodFilterParams {
  skip?: number;
  limit?: number;
  category?: string;
  search?: string;
}

export interface FoodCreatePayload {
  name: string;
  category: string;
  calories_per_100g: number;
  protein_per_100g: number;
  carbs_per_100g: number;
  fat_per_100g: number;
  fiber_per_100g?: number;
  serving_size_g?: number;
  serving_unit?: string;
  cost_inr?: number;
  is_indian?: boolean;
  diet_type?: string;
  image_url?: string;
}

export const foodsApi = {
  /**
   * List foods with optional pagination and category filtering
   * GET /foods
   */
  async getFoods(params?: FoodFilterParams): Promise<FoodItemDto[]> {
    const searchParams = new URLSearchParams();
    if (params?.skip !== undefined) searchParams.append('skip', String(params.skip));
    if (params?.limit !== undefined) searchParams.append('limit', String(params.limit));
    if (params?.category) searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);

    const qs = searchParams.toString();
    const endpoint = qs ? `/foods?${qs}` : '/foods';
    return apiClient.get<FoodItemDto[]>(endpoint);
  },

  /**
   * Fast search foods by keyword
   * GET /foods/search?q=...
   */
  async searchFoods(query: string, limit = 20): Promise<FoodItemDto[]> {
    const q = encodeURIComponent(query);
    return apiClient.get<FoodItemDto[]>(`/foods/search?q=${q}&limit=${limit}`);
  },

  /**
   * Get single food item by ID
   * GET /foods/{food_id}
   */
  async getFoodById(foodId: string): Promise<FoodItemDto> {
    return apiClient.get<FoodItemDto>(`/foods/${foodId}`);
  },

  /**
   * Create custom food item
   * POST /foods
   */
  async createFood(payload: FoodCreatePayload): Promise<FoodItemDto> {
    return apiClient.post<FoodItemDto>('/foods', payload);
  }
};
