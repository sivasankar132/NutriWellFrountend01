import { apiClient } from './client';
import { DailyNutritionDto } from './types';

export interface DailyNutritionPayload {
  date: string;
  calories_consumed: number;
  protein_consumed_g: number;
  carbs_consumed_g: number;
  fat_consumed_g: number;
  fiber_consumed_g?: number;
  water_consumed_ml?: number;
  calorie_target?: number;
  protein_target_g?: number;
  water_target_ml?: number;
  notes?: string;
}

export const dailyNutritionApi = {
  /**
   * Get all daily nutrition summaries
   * GET /nutrition/daily
   */
  async getDailySummaries(): Promise<DailyNutritionDto[]> {
    return apiClient.get<DailyNutritionDto[]>('/nutrition/daily');
  },

  /**
   * Get daily nutrition summary for specific date (YYYY-MM-DD)
   * GET /nutrition/daily/{date}
   */
  async getDailySummaryByDate(date: string): Promise<DailyNutritionDto> {
    return apiClient.get<DailyNutritionDto>(`/nutrition/daily/${encodeURIComponent(date)}`);
  },

  /**
   * Record or update daily nutrition log
   * POST /nutrition/daily
   */
  async recordDailyNutrition(payload: DailyNutritionPayload): Promise<DailyNutritionDto> {
    return apiClient.post<DailyNutritionDto>('/nutrition/daily', payload);
  }
};
