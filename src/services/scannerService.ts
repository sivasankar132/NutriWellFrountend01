import { FoodItem } from '../types';
import { aiApi } from './api/aiApi';

export interface ScanResult {
  food: FoodItem;
  confidenceScore: number;
  healthRating: 'Excellent' | 'Good' | 'Moderate' | 'High Calorie';
  aiAdvice: string;
  isEstimated: boolean;
}

class ScannerService {
  public getApiKey(): string {
    return import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('nutriwell_gemini_api_key') || '';
  }

  public setApiKey(key: string): void {
    if (key && key.trim()) {
      localStorage.setItem('nutriwell_gemini_api_key', key.trim());
    } else {
      localStorage.removeItem('nutriwell_gemini_api_key');
    }
  }

  /**
   * Analyzes food image using /ai/scan-food backend endpoint or direct client call.
   * Strictly enforces AI contract without generating mock/fake food fallbacks.
   */
  public async analyzeFoodImage(base64Image: string, mimeType: string = 'image/jpeg', customApiKey?: string): Promise<ScanResult> {
    const cleanBase64 = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;
    let detectedMime = mimeType;
    if (base64Image.startsWith('data:')) {
      const match = base64Image.match(/^data:(image\/[a-zA-Z+]+);base64,/);
      if (match) detectedMime = match[1];
    }

    try {
      // 1. First try backend endpoint /ai/scan-food
      const scannedData = await aiApi.scanFood(cleanBase64, detectedMime);

      if (!scannedData.name || scannedData.name.toLowerCase().includes('unidentified') || scannedData.name.toLowerCase().includes('unknown')) {
        throw new Error(scannedData.aiAdvice || 'Unable to identify food item in image. Please provide a clear food photo.');
      }

      const foodItem: FoodItem = {
        id: `scanned-${Date.now()}`,
        name: scannedData.name,
        category: scannedData.protein > 15 ? 'Protein' : (scannedData.fiber > 3 ? 'Fruits & Vegetables' : 'General Meal'),
        serving: scannedData.serving || '1 serving',
        calories: Number(scannedData.calories),
        protein: Number(scannedData.protein),
        carbs: Number(scannedData.carbs),
        fat: Number(scannedData.fat),
        fiber: Number(scannedData.fiber),
        vitamins: Array.isArray(scannedData.vitamins) ? scannedData.vitamins : [],
        minerals: Array.isArray(scannedData.minerals) ? scannedData.minerals : [],
        costInr: Number(scannedData.costInr) || 50,
        dietType: scannedData.dietType || 'Veg',
        isIndian: true,
        image: base64Image.startsWith('data:') ? base64Image : `data:${detectedMime};base64,${cleanBase64}`,
        proteinPerRupee: Number(scannedData.protein) && Number(scannedData.costInr) ? Number((Number(scannedData.protein) / Number(scannedData.costInr)).toFixed(2)) : 0.1
      };

      return {
        food: foodItem,
        confidenceScore: Math.min(99.4, Math.max(75.0, Number(scannedData.confidenceScore) || 90.0)),
        healthRating: scannedData.healthRating || (foodItem.protein > 15 || foodItem.fiber > 4 ? 'Excellent' : 'Good'),
        aiAdvice: scannedData.aiAdvice || `Scanned ${foodItem.name} with ${foodItem.calories} kcal, ${foodItem.protein}g protein.`,
        isEstimated: false
      };
    } catch (err: any) {
      console.warn('Backend /ai/scan-food failed, checking client key:', err?.message);

      const apiKey = customApiKey || this.getApiKey();
      if (!apiKey) {
        throw new Error(err?.message || 'AI generation failed. Please try again.');
      }

      // Direct fallback to client-side Gemini Vision API call only if client key is configured
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  {
                    text: `Analyze image and return JSON: {"name": "string", "serving": "string", "dietType": "Veg", "calories": 0, "protein": 0, "carbs": 0, "fat": 0, "fiber": 0, "vitamins": [], "minerals": [], "costInr": 50, "confidenceScore": 90, "healthRating": "Good", "aiAdvice": "string"}`
                  },
                  {
                    inline_data: { mime_type: detectedMime, data: cleanBase64 }
                  }
                ]
              }]
            })
          }
        );

        if (!response.ok) {
          throw new Error('AI generation failed. Please try again.');
        }

        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
        if (!cleanJson) {
          throw new Error('AI generation failed. Please try again.');
        }

        const parsed = JSON.parse(cleanJson);
        if (!parsed || !parsed.name) {
          throw new Error('AI generation failed. Please try again.');
        }

        const foodItem: FoodItem = {
          id: `scanned-${Date.now()}`,
          name: parsed.name,
          category: parsed.protein > 15 ? 'Protein' : 'General Meal',
          serving: parsed.serving || '1 serving',
          calories: Number(parsed.calories) || 0,
          protein: Number(parsed.protein) || 0,
          carbs: Number(parsed.carbs) || 0,
          fat: Number(parsed.fat) || 0,
          fiber: Number(parsed.fiber) || 0,
          vitamins: Array.isArray(parsed.vitamins) ? parsed.vitamins : [],
          minerals: Array.isArray(parsed.minerals) ? parsed.minerals : [],
          costInr: Number(parsed.costInr) || 50,
          dietType: parsed.dietType || 'Veg',
          isIndian: true,
          image: base64Image.startsWith('data:') ? base64Image : `data:${detectedMime};base64,${cleanBase64}`,
          proteinPerRupee: 0.1
        };

        return {
          food: foodItem,
          confidenceScore: Number(parsed.confidenceScore) || 90,
          healthRating: parsed.healthRating || 'Good',
          aiAdvice: parsed.aiAdvice || 'Scanned successfully.',
          isEstimated: false
        };
      } catch (clientErr: any) {
        throw new Error('AI generation failed. Please try again.');
      }
    }
  }
}

export const scannerService = new ScannerService();
