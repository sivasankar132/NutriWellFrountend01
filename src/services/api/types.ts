// TypeScript interfaces matching NutriWell FastAPI backend contracts

export interface ApiUser {
  id: string;
  email: string;
  name?: string;
  role: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: ApiUser;
}

export interface NutritionProfileDto {
  id?: string;
  user_id?: string;
  age: number;
  gender: string;
  height_cm: number;
  weight_kg: number;
  activity_level: string;
  dietary_preference: string;
  target_calories: number;
  target_protein_g: number;
  target_carbs_g: number;
  target_fat_g: number;
  target_fiber_g?: number;
  target_water_ml?: number;
  created_at?: string;
  updated_at?: string;
}

export interface NutritionGoalDto {
  id: string;
  user_id?: string;
  goal_type: string;
  target_weight_kg?: number;
  weekly_weight_goal_kg?: number;
  target_calories: number;
  target_protein_g: number;
  target_carbs_g?: number;
  target_fat_g?: number;
  target_water_ml?: number;
  start_date?: string;
  end_date?: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface FoodItemDto {
  id: string;
  name: string;
  category: string;
  calories_per_100g: number;
  protein_per_100g: number;
  carbs_per_100g: number;
  fat_per_100g: number;
  fiber_per_100g: number;
  serving_size_g: number;
  serving_unit: string;
  cost_inr: number;
  is_indian: boolean;
  diet_type: string;
  image_url?: string;
  created_at?: string;
}

export interface MealItemDto {
  id: string;
  meal_id?: string;
  food_id?: string;
  food_name: string;
  serving_size: number;
  serving_unit: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g?: number;
  cost_inr?: number;
  created_at?: string;
}

export interface MealDto {
  id: string;
  user_id?: string;
  name: string;
  meal_type: string;
  date: string;
  total_calories: number;
  total_protein_g: number;
  total_carbs_g: number;
  total_fat_g: number;
  created_at?: string;
  updated_at?: string;
  items?: MealItemDto[];
}

export interface MealPlanItemDto {
  id: string;
  meal_plan_id?: string;
  food_id?: string;
  food_name: string;
  day_of_week: string;
  meal_type: string;
  serving_size: number;
  serving_unit: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g?: number;
  notes?: string;
  created_at?: string;
}

export interface MealPlanDto {
  id: string;
  user_id?: string;
  name: string;
  description?: string;
  target_calories: number;
  target_protein_g: number;
  target_carbs_g: number;
  target_fat_g: number;
  start_date?: string;
  end_date?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  items?: MealPlanItemDto[];
}

export interface DailyNutritionDto {
  id?: string;
  user_id?: string;
  date: string;
  calories_consumed: number;
  protein_consumed_g: number;
  carbs_consumed_g: number;
  fat_consumed_g: number;
  fiber_consumed_g: number;
  water_consumed_ml: number;
  calorie_target: number;
  protein_target_g: number;
  water_target_ml: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProgressRecordDto {
  id: string;
  user_id?: string;
  date: string;
  weight: number;
  bmi: number;
  calories_consumed?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProgressSummaryDto {
  current_weight: number | null;
  starting_weight: number | null;
  weight_change: number | null;
  latest_bmi: number | null;
  latest_date: string | null;
  records_count: number;
}
