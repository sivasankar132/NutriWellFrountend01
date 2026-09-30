import { HealthReminder, ReminderPreset } from '../types';

export interface PresetRoutine {
  key: ReminderPreset;
  title: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  borderColor: string;
  iconName: string;
  description: string;
  reminders: Omit<HealthReminder, 'id' | 'createdAt'>[];
}

export const REMINDER_PRESETS: PresetRoutine[] = [
  {
    key: 'STANDARD_WELLNESS',
    title: 'Standard Wellness Routine',
    tagline: 'Balanced Energy & Vitality',
    badge: 'Beginner & Daily Balance',
    badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800/60',
    borderColor: 'border-emerald-500/30 hover:border-emerald-500/60',
    iconName: 'Leaf',
    description: 'Evenly distributed hydration, 3 wholesome meals, gentle evening activity, and an 8-hour sleep curfew.',
    reminders: [
      {
        title: 'Morning Hydration Boost',
        time: '08:00',
        category: 'Hydration',
        notes: 'Drink 500ml room-temperature water to activate internal organs.',
        enabled: true,
      },
      {
        title: 'Energizing Whole-Food Breakfast',
        time: '08:30',
        category: 'Meals',
        notes: 'High-protein start with complex carbohydrates and antioxidants.',
        enabled: true,
      },
      {
        title: 'Mid-Morning Hydration Check',
        time: '11:30',
        category: 'Hydration',
        notes: 'Drink 400ml water to maintain focus and cellular hydration.',
        enabled: true,
      },
      {
        title: 'Balanced Vitality Lunch',
        time: '13:00',
        category: 'Meals',
        notes: 'High-fiber vegetables, lean protein, and whole grains.',
        enabled: true,
      },
      {
        title: 'Afternoon Rehydration',
        time: '15:30',
        category: 'Hydration',
        notes: 'Drink 400ml cold water or green tea to bypass the mid-day slump.',
        enabled: true,
      },
      {
        title: 'Smart Afternoon Fuel',
        time: '17:00',
        category: 'Snacks',
        notes: 'Handful of roasted almonds, walnuts, or fresh seasonal fruit.',
        enabled: true,
      },
      {
        title: 'Daily Movement / Evening Walk',
        time: '18:00',
        category: 'Workouts',
        notes: '35-45 mins of brisk walking, cycling, or bodyweight mobility.',
        enabled: true,
      },
      {
        title: 'Light & Nourishing Dinner',
        time: '20:00',
        category: 'Meals',
        notes: 'Easily digestible protein and steamed veggies at least 2 hours before bed.',
        enabled: true,
      },
      {
        title: 'Screen Curfew & Sleep Wind-Down',
        time: '22:30',
        category: 'Sleep',
        notes: 'Dim lights, avoid blue-light screens, and prepare for 8 hours of restorative rest.',
        enabled: true,
      },
    ],
  },
  {
    key: 'GYM_BRO',
    title: 'Gym Bro Mass Routine',
    tagline: 'Hypertrophy & Macro Timing',
    badge: 'Muscle Building & Strength',
    badgeColor: 'bg-amber-950 text-amber-300 border-amber-800/60',
    borderColor: 'border-amber-500/30 hover:border-amber-500/60',
    iconName: 'Dumbbell',
    description: 'High-frequency water volume, pre/post workout nutrition, targeted protein shakes, and anabolic sleep.',
    reminders: [
      {
        title: 'Morning Volume Hydration',
        time: '07:00',
        category: 'Hydration',
        notes: 'Drink 600ml water + pinch of pink Himalayan salt for cellular pumps.',
        enabled: true,
      },
      {
        title: 'High-Protein Anabolic Breakfast',
        time: '07:30',
        category: 'Meals',
        notes: 'Eggs / Paneer scramble, oats, and peanut butter (35g+ protein).',
        enabled: true,
      },
      {
        title: 'Mid-Morning Whey Protein Shake',
        time: '10:30',
        category: 'Snacks',
        notes: '1 scoop whey protein with banana for positive nitrogen retention.',
        enabled: true,
      },
      {
        title: 'Power Mass Lunch',
        time: '12:30',
        category: 'Meals',
        notes: 'Grilled chicken / paneer bowl with brown rice and lentils (45g protein).',
        enabled: true,
      },
      {
        title: 'Mid-Day Hydration Volume Check',
        time: '14:30',
        category: 'Hydration',
        notes: 'Drink 500ml water to ensure maximal muscular performance.',
        enabled: true,
      },
      {
        title: 'Pre-Workout Fuel & Creatine',
        time: '16:30',
        category: 'Meals',
        notes: 'Fast-digesting complex carbs (banana / rice cakes) + 5g Creatine.',
        enabled: true,
      },
      {
        title: 'Heavy Resistance Training Session',
        time: '17:30',
        category: 'Workouts',
        notes: 'Heavy compound lifts with progressive overload (Chest / Back / Legs).',
        enabled: true,
      },
      {
        title: 'Post-Workout Electrolytes & Water',
        time: '19:00',
        category: 'Hydration',
        notes: 'Drink 700ml water to restore lost glycogen and intra-muscular fluids.',
        enabled: true,
      },
      {
        title: 'Post-Workout Anabolic Feast',
        time: '20:30',
        category: 'Meals',
        notes: 'High-protein dinner with clean carbs to spur hypertrophy and recovery.',
        enabled: true,
      },
      {
        title: 'Slow-Digesting Casein / Paneer Snack',
        time: '22:00',
        category: 'Snacks',
        notes: 'Greek yogurt or paneer cubes to prevent overnight muscle catabolism.',
        enabled: true,
      },
      {
        title: 'Deep Anabolic Recovery Sleep',
        time: '22:45',
        category: 'Sleep',
        notes: 'Full darkness and cool room temp for optimal growth hormone secretion.',
        enabled: true,
      },
    ],
  },
  {
    key: 'INTERMITTENT_FASTING',
    title: '16:8 Intermittent Fasting',
    tagline: 'Autophagy & Window Management',
    badge: 'Metabolic Health & Fat Loss',
    badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800/60',
    borderColor: 'border-cyan-500/30 hover:border-cyan-500/60',
    iconName: 'Clock',
    description: '16-hour fasting window with electrolyte hydration, followed by an 8-hour feeding window (12:00 PM – 8:00 PM).',
    reminders: [
      {
        title: 'Fasting Hydration & Black Coffee',
        time: '08:00',
        category: 'Hydration',
        notes: '500ml water or black coffee / green tea (0 calorie autophagy support).',
        enabled: true,
      },
      {
        title: 'Fasting Electrolyte Checkpoint',
        time: '10:30',
        category: 'Hydration',
        notes: 'Water with pinch of sodium and potassium to prevent headaches and dizziness.',
        enabled: true,
      },
      {
        title: 'Fast-Break Lunch (Window Opens: 12 PM)',
        time: '12:00',
        category: 'Meals',
        notes: 'Break fast gently with high protein, healthy fats, and low GI greens.',
        enabled: true,
      },
      {
        title: 'Window Hydration Check',
        time: '14:00',
        category: 'Hydration',
        notes: 'Drink 500ml water during your digestive window.',
        enabled: true,
      },
      {
        title: 'Fed State Workout Session',
        time: '15:30',
        category: 'Workouts',
        notes: 'Resistance or cardio training while fueled by break-fast meal.',
        enabled: true,
      },
      {
        title: 'High-Protein Feeding Window Snack',
        time: '16:30',
        category: 'Snacks',
        notes: 'Sprouted salad, roasted chickpeas, or curd bowl with berries.',
        enabled: true,
      },
      {
        title: 'Final Meal Before Fast (Dinner)',
        time: '19:30',
        category: 'Meals',
        notes: 'Nutrient-dense dinner with fiber and sustained protein to power through fast.',
        enabled: true,
      },
      {
        title: 'Fasting Window Commences (8:00 PM)',
        time: '20:00',
        category: 'Snacks',
        notes: 'Eating window closed! Switch strictly to water and herbal infusions.',
        enabled: true,
      },
      {
        title: 'Restorative Fasting Sleep',
        time: '23:00',
        category: 'Sleep',
        notes: 'Sleep promotes nighttime cellular autophagy and insulin sensitivity.',
        enabled: true,
      },
    ],
  },
];
