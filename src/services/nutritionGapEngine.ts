import { NutritionGapInfo, UserProfile, FoodItem } from '../types';
import { mockFoodCatalog } from '../data/mockMeals';

class NutritionGapEngine {
  public calculateBiggestGap(user: UserProfile, proteinConsumed: number, caloriesConsumed: number): NutritionGapInfo {
    const proteinMissing = Math.max(0, user.dailyProteinTarget - proteinConsumed);
    const calorieMissing = Math.max(0, user.dailyCalorieTarget - caloriesConsumed);

    if (proteinMissing > 15) {
      return {
        gapNutrient: 'Protein',
        missingAmount: proteinMissing,
        unit: 'g',
        whyItMatters: `Your protein intake is ${proteinMissing}g behind today's target. Low protein slows muscle repair and causes afternoon fatigue.`,
        quickActionTitle: 'FIX MY NEXT MEAL →',
        recommendedSwaps: [mockFoodCatalog[0], mockFoodCatalog[4], mockFoodCatalog[6]],
      };
    } else {
      return {
        gapNutrient: 'Fiber',
        missingAmount: 12,
        unit: 'g',
        whyItMatters: 'Fiber is 12g behind target. Adequate fiber optimizes gut microbiota and regulates glycemic response after meals.',
        quickActionTitle: 'ADD HIGH FIBER FOODS →',
        recommendedSwaps: [mockFoodCatalog[3], mockFoodCatalog[4], mockFoodCatalog[7]],
      };
    }
  }
}

export const nutritionGapEngine = new NutritionGapEngine();
