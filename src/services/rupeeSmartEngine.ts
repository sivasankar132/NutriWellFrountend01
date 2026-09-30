import { FoodItem } from '../types';
import { foodsApi } from './api/foodsApi';

class RupeeSmartEngine {
  public async getMealsByBudget(maxBudgetInr: number): Promise<FoodItem[]> {
    try {
      const dbFoods = await foodsApi.getFoods({ limit: 50 });
      const mapped: FoodItem[] = (dbFoods || []).map((f: any) => {
        const cost = Number(f.costInr || f.cost_inr || 50);
        const prot = Number(f.protein || f.protein_per_100g || 0);
        return {
          id: f.id || `food-${Math.random()}`,
          name: f.name,
          category: f.category || 'General',
          serving: f.serving_size ? `${f.serving_size} ${f.serving_unit || 'g'}` : '100g',
          calories: Number(f.calories || f.calories_per_100g || 0),
          protein: prot,
          carbs: Number(f.carbs || f.carbs_per_100g || 0),
          fat: Number(f.fats || f.fat_per_100g || 0),
          fiber: Number(f.fiber || f.fiber_per_100g || 0),
          costInr: cost,
          dietType: f.diet_type || 'Veg',
          isIndian: true,
          proteinPerRupee: Number((prot / Math.max(1, cost)).toFixed(2))
        };
      });

      return mapped
        .filter(food => food.costInr <= maxBudgetInr)
        .sort((a, b) => (b.proteinPerRupee || 0) - (a.proteinPerRupee || 0));
    } catch (err) {
      return [];
    }
  }
}

export const rupeeSmartEngine = new RupeeSmartEngine();
