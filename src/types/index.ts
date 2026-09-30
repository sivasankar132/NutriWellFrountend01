export type DietPreference = 'Veg' | 'Non-Veg' | 'Eggetarian' | 'Vegan' | string;

export type ActivityLevel = 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active';

export type NutritionGoal = 'Weight Loss' | 'Muscle Gain' | 'Diabetes Management' | 'Heart Health' | 'General Wellness' | string;

export type Language = 'en' | 'te';

export type ContextMode = 
  | 'STUDENT' 
  | 'EMPLOYEE' 
  | 'HOSTEL' 
  | 'HOME' 
  | 'TRAVEL' 
  | 'EATING_OUT' 
  | 'ACTIVE' 
  | 'WOMEN_WELLNESS' 
  | 'OFFICE' 
  | 'GROCERY';

export type UserMode = 'ADULT' | 'TEEN_SAFETY';

export type AccountTier = 'FREE' | 'PREMIUM';

export interface BudgetItem {
  id: string;
  name: string;
  cost: number;
  category: string;
  portion: string;
}

export interface DailyExercise {
  id: string;
  name: string;
  target: string;
  durationMinutes?: number;
  category: 'Cardio' | 'Strength' | 'Mobility' | 'Core';
  difficulty: 'Beginner' | 'Intermediate';
  completed: boolean;
  instructions: string[];
  helpsWith: string[];
  muscles: string[];
  effortCalories: string;
  safetyTips: string;
}

export type Gender = 'Male' | 'Female' | 'Other';

export interface UserProfile {
  name: string;
  email: string;
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  dietPreference: DietPreference;
  cuisinePreference: string;
  nutritionGoal: NutritionGoal;
  dailyCalorieTarget: number;
  dailyProteinTarget: number;
  dailyWaterTargetMl: number;
  dailyFoodBudgetInr: number;
  spentTodayInr: number;
  hasCompletedOnboarding: boolean;
  language: Language;
  contextMode: ContextMode;
  userMode: UserMode;
  tier: AccountTier;
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'Protein' | 'Carbs' | 'Vegetables' | 'Fruits' | 'Healthy Fats' | string;
  serving: string;
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
  fiber: number;   // in grams
  vitamins?: string[];
  minerals?: string[];
  costInr: number;
  prepTimeMinutes?: number;
  dietType: DietPreference;
  isIndian: boolean;
  image: string;
  proteinPerRupee?: number;
  isCustom?: boolean;
}

export interface MealLog {
  id: string;
  foodName: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  costInr: number;
  timestamp: string;
  image?: string;
  contextTag?: ContextMode;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  credentials: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  languages: string[];
  bio: string;
  availability: string[];
  consultationPriceInr: number;
  avatar: string;
  isDemo: boolean;
  nutritionFocus: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  date: string;
  timeSlot: string;
  consultationPriceInr: number;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  consultationType: 'Video' | 'Chat' | 'In-Person';
  bookedAt: string;
}

export interface HealthCondition {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullGuidance: string;
  recommendedFoods: string[];
  avoidFoods: string[];
  lifestyleTips: string[];
  doctorSpecialtyToConsult: string;
  isUserAdded?: boolean;
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: 'Ecstatic' | 'Good' | 'Neutral' | 'Tired' | 'Stressed' | string;
  energyLevel: number; // 1 to 5
  sleepHours: number;
  foodNotes: string;
  lifestyleNotes: string;
  tags: string[];
}

export interface DailyNutritionScore {
  score: number; // 0 - 100
  caloriesConsumed: number;
  calorieTarget: number;
  proteinConsumed: number;
  proteinTarget: number;
  carbsConsumed: number;
  carbsTarget: number;
  fatConsumed: number;
  fatTarget: number;
  fiberConsumed: number;
  fiberTarget: number;
  waterConsumedMl: number;
  waterTargetMl: number;
}

// Session Memory & Intelligence Types
export interface PersonalNutritionMemory {
  favoriteFoods: string[];
  rejectedFoods: string[];
  customFoods: FoodItem[];
  customCuisines: string[];
  recentChoices: string[];
  commonGaps: string[];
}

export interface PrivacyConsentState {
  shareWithDoctors: boolean;
  aiDataProcessing: boolean;
  guardianConsentGranted: boolean;
  dataExportRequested: boolean;
}

export interface WhatShouldIEatOption {
  id: string;
  title: string;
  category: string;
  calories: number;
  protein: number;
  costInr: number;
  prepTimeMinutes: number;
  reasonWhy: string;
  foodItem: FoodItem;
}

export interface NutritionGapInfo {
  gapNutrient: 'Protein' | 'Fiber' | 'Calories' | 'Hydration';
  missingAmount: number;
  unit: string;
  whyItMatters: string;
  quickActionTitle: string;
  recommendedSwaps: FoodItem[];
}

export interface IfIEatThisImpact {
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  costInr: number;
  projectedCaloriePct: number;
  projectedProteinPct: number;
  betterSwap?: FoodItem;
}

export interface HealthTwinMetrics {
  nutritionScore: number;
  hydrationScore: number;
  metabolicConsistency: number;
  energyBalance: number;
  projected30DayWeightKg: number;
  projectedLeanMassChangeKg: number;
  adherenceStreakDays: number;
}

export interface WhatIfScenario {
  id: string;
  title: string;
  description: string;
  proteinDelta: number;
  calorieDelta: number;
  waterDeltaMl: number;
  costDeltaInr: number;
  projectedOutcome: string;
  energyImpact: string;
}

export interface PatternInsight {
  id: string;
  title: string;
  category: 'Protein' | 'Hydration' | 'Budget' | 'Timing';
  observation: string;
  rootCause: string;
  impact: string;
  actionableStep: string;
  confidence: number;
}

export interface PlanStrategy {
  focusWeek: string;
  objective: string;
  todayPriorities: {
    id: string;
    title: string;
    description: string;
    target: string;
    isCompleted?: boolean;
    category: 'Protein' | 'Hydration' | 'Budget' | 'Activity';
  }[];
  weeklyMilestones: {
    day: string;
    focus: string;
    targetValue: string;
  }[];
}

// AI Motivation Types
export interface AIMotivationItem {
  id: string;
  category: 'Progress' | 'Goal' | 'Consistency' | 'Recovery' | 'Small Win' | 'Challenge' | 'Encouragement' | 'Future';
  headline: string;
  quote: string;
  actionableTip: string;
}

// Out of State Location Types
export interface OutOfStateRecommendation {
  id: string;
  name: string;
  matchPct: number;
  category: string;
  calories: number;
  protein: number;
  costInr: number;
  reasonWhy: string;
}

export interface OutOfState24hPlan {
  destination: string;
  isLocked: boolean;
  lockedAt?: string;
  meals: {
    breakfast: string;
    lunch: string;
    snack: string;
    dinner: string;
  };
}

// Future You Trend Types
export interface FutureYouTrendData {
  nutritionConsistencyChangePct: number;
  hydrationConsistencyChangePct: number;
  proteinStabilityStatus: string;
  projected30DayMetabolicScore: number;
  nextBestMove: string;
}

// Health Reminder & Schedule Manager Types
export type ReminderCategory = 'Hydration' | 'Meals' | 'Snacks' | 'Workouts' | 'Sleep';

export interface HealthReminder {
  id: string;
  title: string;
  time: string; // 24-hour HH:MM format e.g. "08:30"
  category: ReminderCategory;
  notes?: string;
  enabled: boolean;
  lastTriggeredDate?: string; // "YYYY-MM-DD" for strict once-per-day triggering
  createdAt: number;
}

export type ReminderPreset = 'STANDARD_WELLNESS' | 'GYM_BRO' | 'INTERMITTENT_FASTING';
