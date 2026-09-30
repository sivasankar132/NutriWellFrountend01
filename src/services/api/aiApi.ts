import { apiClient } from './client';

export interface AISuccessResponse<T> {
  success: boolean;
  data: T;
}

export interface AIErrorResponse {
  success: false;
  error_code: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  recommendedMeal?: any;
}

export interface ScanResultFood {
  name: string;
  serving: string;
  dietType: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  vitamins: string[];
  minerals: string[];
  costInr: number;
  confidenceScore: number;
  healthRating: 'Excellent' | 'Good' | 'Moderate' | 'High Calorie';
  aiAdvice: string;
}

export class AIApiService {
  /**
   * Helper to validate that a response strictly contains success === true and data.
   * Throws explicit error if response fails or returns success === false.
   * NO fallback data generation!
   */
  private handleResponse<T>(res: AISuccessResponse<T> | AIErrorResponse | any): T {
    if (!res) {
      throw new Error('AI generation failed. Please try again.');
    }
    if (res.success === false) {
      throw new Error(res.message || 'AI generation failed. Please try again.');
    }
    if (res.success === true && res.data) {
      return res.data;
    }
    // If backend returned object directly without wrapping or legacy format
    return res as T;
  }

  public async chat(prompt: string): Promise<ChatMessage> {
    try {
      const res = await apiClient.post<any>('/ai/chat', { prompt });
      return this.handleResponse<ChatMessage>(res);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'AI generation failed. Please try again.';
      throw new Error(msg);
    }
  }

  public async scanFood(imageBase64: string, mimeType: string = 'image/jpeg'): Promise<ScanResultFood> {
    try {
      const res = await apiClient.post<any>('/ai/scan-food', {
        image_base64: imageBase64,
        mime_type: mimeType,
      });
      return this.handleResponse<ScanResultFood>(res);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'AI generation failed. Please try again.';
      throw new Error(msg);
    }
  }

  public async whatShouldIEat(contextMode: string = 'GENERAL'): Promise<any> {
    try {
      const res = await apiClient.post<any>('/ai/what-should-i-eat', {
        context_mode: contextMode,
      });
      return this.handleResponse<any>(res);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'AI generation failed. Please try again.';
      throw new Error(msg);
    }
  }

  public async badDayRecovery(): Promise<any> {
    try {
      const res = await apiClient.post<any>('/ai/bad-day-recovery', {});
      return this.handleResponse<any>(res);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'AI generation failed. Please try again.';
      throw new Error(msg);
    }
  }

  public async ifIEatThis(foodItem: {
    food_name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    cost_inr: number;
  }): Promise<any> {
    try {
      const res = await apiClient.post<any>('/ai/if-i-eat-this', foodItem);
      return this.handleResponse<any>(res);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'AI generation failed. Please try again.';
      throw new Error(msg);
    }
  }
}

export const aiApi = new AIApiService();
