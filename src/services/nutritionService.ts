import { FoodItem, MealLog, DailyNutritionScore, UserProfile } from '../types';
import { mockFoodCatalog, initialMealLogs } from '../data/mockMeals';

class NutritionService {
  private meals: MealLog[] = [...initialMealLogs];

  public getLoggedMeals(): MealLog[] {
    return this.meals;
  }

  public addMealLog(meal: Omit<MealLog, 'id' | 'timestamp'>): MealLog {
    const newLog: MealLog = {
      ...meal,
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    this.meals.unshift(newLog);
    return newLog;
  }

  public deleteMealLog(id: string): void {
    this.meals = this.meals.filter(m => m.id !== id);
  }

  public getFoodCatalog(): FoodItem[] {
    return mockFoodCatalog;
  }

  public calculateDailyTotals(user: UserProfile): DailyNutritionScore {
    const caloriesConsumed = this.meals.reduce((acc, m) => acc + m.calories, 0);
    const proteinConsumed = this.meals.reduce((acc, m) => acc + m.protein, 0);
    const carbsConsumed = this.meals.reduce((acc, m) => acc + m.carbs, 0);
    const fatConsumed = this.meals.reduce((acc, m) => acc + m.fat, 0);
    const fiberConsumed = this.meals.reduce((acc, m) => acc + m.fiber, 0);

    const calorieScore = Math.min(100, Math.round((caloriesConsumed / user.dailyCalorieTarget) * 100));
    const proteinScore = Math.min(100, Math.round((proteinConsumed / user.dailyProteinTarget) * 100));
    
    // Overall weighted score
    const score = Math.round((calorieScore * 0.4) + (proteinScore * 0.6));

    return {
      score,
      caloriesConsumed,
      calorieTarget: user.dailyCalorieTarget,
      proteinConsumed,
      proteinTarget: user.dailyProteinTarget,
      carbsConsumed,
      carbsTarget: 250,
      fatConsumed,
      fatTarget: 60,
      fiberConsumed,
      fiberTarget: 35,
      waterConsumedMl: 2250,
      waterTargetMl: user.dailyWaterTargetMl,
    };
  }

  public getSpentTodayInr(): number {
    return this.meals.reduce((acc, m) => acc + m.costInr, 0);
  }
}

export const nutritionService = new NutritionService();
