import { UserProfile } from '../types';

export const initialUserProfile: UserProfile = {
  name: 'Siva Sankar',
  email: 'siva@nutriwell.health',
  gender: 'Male',
  age: 28,
  heightCm: 175,
  weightKg: 72,
  activityLevel: 'Moderately Active',
  dietPreference: 'Veg',
  cuisinePreference: 'South & North Indian Healthy Fusion',
  nutritionGoal: 'Muscle Gain',
  dailyCalorieTarget: 2200,
  dailyProteinTarget: 110,
  dailyWaterTargetMl: 3000,
  dailyFoodBudgetInr: 400,
  spentTodayInr: 160,
  hasCompletedOnboarding: true,
  language: 'en',
  contextMode: 'HOME',
  userMode: 'ADULT',
  tier: 'FREE',
};
