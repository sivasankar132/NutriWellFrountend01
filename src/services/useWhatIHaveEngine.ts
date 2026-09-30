import { FoodItem } from '../types';
import { aiApi } from './api/aiApi';

export interface GeneratedRecipe {
  title: string;
  matchedIngredients: string[];
  missingIngredients: string[];
  calories: number;
  protein: number;
  costInr: number;
  prepTimeMinutes: number;
  suggestedFoodItem?: FoodItem;
}

class UseWhatIHaveEngine {
  public async generateFromIngredients(userIngredients: string[]): Promise<GeneratedRecipe[]> {
    const cleanInputs = userIngredients.map(i => i.trim()).filter(Boolean);
    const promptText = cleanInputs.length > 0
      ? `Generate 2 high-protein recipes using these available ingredients: ${cleanInputs.join(', ')}.`
      : "Generate 2 high-protein budget recipes using common pantry staples like Moong Dal, Eggs, Paneer, or Rice.";

    try {
      const response = await aiApi.chat(promptText);
      const text = response?.text || '';
      
      const suggestedMeal = response?.recommendedMeal;
      const title = suggestedMeal?.name || `Smart Recipe with ${cleanInputs.slice(0, 2).join(' & ') || 'Pantry Staples'}`;
      
      return [
        {
          title: title,
          matchedIngredients: cleanInputs.length > 0 ? cleanInputs : ['Staple Grains', 'Spices'],
          missingIngredients: ['Curd / Dahi', 'Salt & Cumin'],
          calories: Number(suggestedMeal?.calories) || 340,
          protein: Number(suggestedMeal?.protein) || 24,
          costInr: Number(suggestedMeal?.costInr) || 60,
          prepTimeMinutes: 15,
        }
      ];
    } catch (err) {
      throw new Error('AI generation failed. Please try again.');
    }
  }
}

export const useWhatIHaveEngine = new UseWhatIHaveEngine();
