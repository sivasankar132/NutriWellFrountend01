import { FoodItem } from '../types';
import { mockFoodCatalog } from '../data/mockMeals';

export interface RecoveryPlan {
  empatheticHeadline: string;
  adviceMessage: string;
  suggestedEveningAction: string;
  recommendedRecoveryMeal: FoodItem;
}

class BadDayRecoveryEngine {
  public getRecoveryPlan(): RecoveryPlan {
    return {
      empatheticHeadline: "Today didn't go as planned. That's totally okay.",
      adviceMessage: "One heavy or missed meal does not undo your health momentum. What matters most is staying hydrated and getting a high-fiber, clean protein dinner.",
      suggestedEveningAction: "Drink 500ml water now and opt for a light, high-protein meal like Palak Moong Dal or Sprouted Chickpea Salad.",
      recommendedRecoveryMeal: mockFoodCatalog[3], // Palak Moong Dal
    };
  }
}

export const badDayRecoveryEngine = new BadDayRecoveryEngine();
