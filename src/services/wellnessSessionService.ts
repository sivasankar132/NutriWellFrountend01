import { FoodItem } from '../types';

export type ContextMode = 'Home' | 'Student' | 'Hostel' | 'Office' | 'Travel' | 'Eating Out' | 'Grocery';

export interface SmartMeal extends FoodItem {
  reason: string;
}

const makeFood = (id: string, name: string, protein: number, costInr: number, prepTimeMinutes: number, reason: string): SmartMeal => ({
  id,
  name,
  category: 'Protein',
  serving: '1 practical serving',
  calories: 320,
  protein,
  carbs: 38,
  fat: 11,
  fiber: 6,
  costInr,
  prepTimeMinutes,
  dietType: 'Veg',
  isIndian: true,
  image: '',
  reason,
});

export const getSmartMeals = (mode: ContextMode, budget: number, proteinGap: number, ingredients: string[] = []): SmartMeal[] => {
  const context = mode === 'Student' || mode === 'Hostel'
    ? 'fits a tight budget and a short gap between classes'
    : mode === 'Office'
      ? 'works in a 15-minute lunch break'
      : mode === 'Travel' || mode === 'Eating Out'
        ? 'is easy to find when you are out'
        : 'balances your next meal';
  const pantryNote = ingredients.length ? `uses what you have: ${ingredients.slice(0, 2).join(' + ')}` : context;
  const options = [
    makeFood('smart-dal', 'Dal + curd + rice', Math.max(16, Math.min(24, proteinGap)), 75, 12, `Protein-forward and ${pantryNote}.`),
    makeFood('smart-eggs', 'Egg bhurji roll', 18, 65, 10, `Fast, filling, and ${context}.`),
    makeFood('smart-paneer', 'Paneer veggie bowl', 22, 115, 18, `A higher-protein option for your remaining day.`),
  ];
  return options.filter((option, index) => index === 2 || option.costInr <= Math.max(80, budget));
};

export const buildCustomFood = (name: string, costInr: number): FoodItem => ({
  id: `custom-${Date.now()}`,
  name,
  category: 'Carbs',
  serving: '1 serving (your estimate)',
  calories: 280,
  protein: 10,
  carbs: 42,
  fat: 7,
  fiber: 4,
  costInr,
  prepTimeMinutes: 15,
  dietType: 'Veg',
  isIndian: true,
  image: '',
});
