import { FoodItem, IfIEatThisImpact, UserProfile } from '../types';
import { mockFoodCatalog } from '../data/mockMeals';

class IfIEatThisEngine {
  public simulateImpact(food: FoodItem, user: UserProfile, currentCalories: number, currentProtein: number): IfIEatThisImpact {
    const projectedCal = currentCalories + food.calories;
    const projectedProt = currentProtein + food.protein;

    const projectedCaloriePct = Math.round((projectedCal / user.dailyCalorieTarget) * 100);
    const projectedProteinPct = Math.round((projectedProt / user.dailyProteinTarget) * 100);

    // Suggest a better high-protein swap if food is high-carb low-protein
    let betterSwap: FoodItem | undefined;
    if (food.protein < 10 && food.calories > 300) {
      betterSwap = mockFoodCatalog[0]; // Paneer tikka
    }

    return {
      foodName: food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      fiber: food.fiber,
      costInr: food.costInr,
      projectedCaloriePct,
      projectedProteinPct,
      betterSwap,
    };
  }
}

export const ifIEatThisEngine = new IfIEatThisEngine();
