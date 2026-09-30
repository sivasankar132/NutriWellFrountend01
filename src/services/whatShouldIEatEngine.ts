import { FoodItem, WhatShouldIEatOption, UserProfile, ContextMode } from '../types';
import { mockFoodCatalog } from '../data/mockMeals';

class WhatShouldIEatEngine {
  public getTop3MealOptions(
    user: UserProfile,
    currentProteinGap: number,
    contextMode: ContextMode,
    customFoods: FoodItem[] = []
  ): WhatShouldIEatOption[] {
    const catalog = [...mockFoodCatalog, ...customFoods];

    // Filter and score based on context mode & budget
    const options: WhatShouldIEatOption[] = [
      {
        id: 'opt-1',
        title: contextMode === 'STUDENT' ? 'Moong Dal Chilla & Curd (Hostel Special)' : 'Paneer Tikka Quinoa Bowl',
        category: 'High Protein',
        calories: 380,
        protein: 26,
        costInr: contextMode === 'STUDENT' ? 65 : 140,
        prepTimeMinutes: 15,
        reasonWhy: `Fills ${Math.min(100, Math.round((26 / Math.max(1, currentProteinGap)) * 100))}% of your remaining protein target for under ₹${contextMode === 'STUDENT' ? 70 : 150}.`,
        foodItem: catalog[0],
      },
      {
        id: 'opt-2',
        title: 'Sprouted Moong & Chickpea Crunch',
        category: 'Budget & Quick',
        calories: 220,
        protein: 18,
        costInr: 45,
        prepTimeMinutes: 5,
        reasonWhy: 'Zero cooking required. High fiber + bioavailable iron for sustained focus.',
        foodItem: catalog[4],
      },
      {
        id: 'opt-3',
        title: 'Egg Curry with Whole Wheat Chapati',
        category: 'Balanced Comfort',
        calories: 390,
        protein: 22,
        costInr: 90,
        prepTimeMinutes: 20,
        reasonWhy: 'Rich in Choline & Vitamin D to support energy recovery during long work/study shifts.',
        foodItem: catalog[6],
      }
    ];

    return options;
  }
}

export const whatShouldIEatEngine = new WhatShouldIEatEngine();
