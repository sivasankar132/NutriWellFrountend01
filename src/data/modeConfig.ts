import { ContextMode, FoodItem } from '../types';
import { mockFoodCatalog } from './mockMeals';

export interface ModePlanItem {
  mealType: 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner';
  name: string;
  calories: number;
  protein: number;
  costInr: number;
  prepTimeMinutes: number;
  whyThisFits: string;
  items: string[];
}

export interface ModeQuickMeal {
  id: string;
  title: string;
  timeCategory: '< 10 min' | '< 15 min' | '< 20 min' | '< 30 min';
  calories: number;
  protein: number;
  costInr: number;
  ingredients: string[];
  tags: string[];
}

export interface ModeSpecializedData {
  sectionTitle: string;
  sectionSubtitle: string;
  cards: {
    title: string;
    badge: string;
    description: string;
    actionLabel?: string;
    details?: string[];
  }[];
}

export interface ModeConfig {
  id: ContextMode;
  slug: string;
  title: string;
  tagline: string;
  targetTag: string;
  dailyBudgetInr: number;
  themeColor: string;
  accentBg: string;
  borderAccent: string;
  badge: string;
  coreFocus: string;
  defaultPlateItems: FoodItem[];
  suggestedIngredients: FoodItem[];
  todayPlan: ModePlanItem[];
  quickMeals: ModeQuickMeal[];
  specializedData: ModeSpecializedData;
  analyticsMetrics: {
    label: string;
    value: string;
    change: string;
    status: 'good' | 'neutral' | 'attention';
    description: string;
  }[];
}

export const modeConfigs: Record<string, ModeConfig> = {
  STUDENT: {
    id: 'STUDENT',
    slug: 'student',
    title: 'Student Mode',
    tagline: 'Nutrition that fits your study schedule, budget, and hostel life.',
    targetTag: 'College & Study Routine',
    dailyBudgetInr: 150,
    themeColor: 'text-amber-400',
    accentBg: 'bg-amber-950/40',
    borderAccent: 'border-amber-500/40',
    badge: '₹150 Budget • 20-Min Prep • Brain Focus',
    coreFocus: 'High protein-per-rupee & concentration-supportive staples',
    defaultPlateItems: [
      mockFoodCatalog[1],
      mockFoodCatalog[4],
    ],
    suggestedIngredients: [
      mockFoodCatalog[1],
      mockFoodCatalog[4],
      mockFoodCatalog[3],
      mockFoodCatalog[0],
      mockFoodCatalog[5],
    ],
    todayPlan: [
      {
        mealType: 'Breakfast',
        name: 'Quick Peanut Butter Banana Toast + Boiled Eggs / Milk',
        calories: 340,
        protein: 18,
        costInr: 30,
        prepTimeMinutes: 5,
        whyThisFits: 'Under ₹30, ready in 5 mins before 9:00 AM class.',
        items: ['2 Whole Wheat Bread', '1 tbsp Peanut Butter', '1 Banana', '1 Boiled Egg / Curd']
      },
      {
        mealType: 'Lunch',
        name: 'College Mess Dal Rice + 1 Bowl Extra Curd & Sprouts',
        calories: 480,
        protein: 26,
        costInr: 50,
        prepTimeMinutes: 15,
        whyThisFits: 'Maximizes standard mess food with high-protein low-cost curd addition.',
        items: ['1.5 Cup Steamed Rice', '1 Bowl Thick Dal Tadka', '100g Fresh Curd', 'Sprouted Moong Salad']
      },
      {
        mealType: 'Snack',
        name: 'Roasted Chana (Chickpeas) + Lemon Tea / Buttermilk',
        calories: 210,
        protein: 14,
        costInr: 20,
        prepTimeMinutes: 2,
        whyThisFits: 'Shelf-stable study snack to avoid library vending machine chips.',
        items: ['50g Roasted Chana', '1 Glass Chilled Buttermilk']
      },
      {
        mealType: 'Dinner',
        name: 'Paneer / Soya Chunks Bhurji with 3 Multigrain Rotis',
        calories: 460,
        protein: 28,
        costInr: 50,
        prepTimeMinutes: 20,
        whyThisFits: 'Sustained overnight amino acid delivery for muscle recovery & sleep.',
        items: ['80g Paneer / Soya Chunks', '3 Phulkas', 'Cucumber Tomato Salad']
      }
    ],
    quickMeals: [
      {
        id: 'qm-s1',
        title: '5-Minute Sattu Protein Drink',
        timeCategory: '< 10 min',
        calories: 220,
        protein: 16,
        costInr: 18,
        ingredients: ['3 tbsp Roasted Chana Sattu', 'Water / Buttermilk', 'Cumin & Salt'],
        tags: ['No Cooking', 'Under ₹20', 'High Protein']
      },
      {
        id: 'qm-s2',
        title: 'Kettle-Boiled Eggs & Sprout Chaat',
        timeCategory: '< 10 min',
        calories: 290,
        protein: 22,
        costInr: 35,
        ingredients: ['2 Eggs', 'Sprouted Moong', 'Onion, Tomato & Chaat Masala'],
        tags: ['Hostel Friendly', 'Quick Prep']
      },
      {
        id: 'qm-s3',
        title: '15-Minute Paneer Moong Cheela',
        timeCategory: '< 20 min',
        calories: 380,
        protein: 24,
        costInr: 55,
        ingredients: ['Moong Dal Batter', 'Grated Paneer', 'Green Chillies'],
        tags: ['Clean Carbs', 'Budget Win']
      }
    ],
    specializedData: {
      sectionTitle: 'Study & Exam Nutrition Optimizer',
      sectionSubtitle: 'Tailored nutritional timing to maintain mental sharpness during long academic days',
      cards: [
        {
          title: 'Exam Day Nutrition Protocol',
          badge: 'Cognitive Focus',
          description: 'Avoid high-glycemic white flour snacks before exams. Pair complex carbs (oats/sprouts) with steady protein to eliminate brain fog.',
          details: ['Pre-exam: Banana + Handful Almonds', 'Hydration: 500ml water 30 mins before start']
        },
        {
          title: 'Between-Class Pocket Fuel',
          badge: 'No Mess Needed',
          description: 'Keep dry roasted peanuts, roasted makhana, or sattu powder in your backpack for quick energy without dining out.',
          details: ['Saves ₹120/day vs canteen fried snacks', '14g protein per pocket serving']
        }
      ]
    },
    analyticsMetrics: [
      {
        label: 'Student Food Budget Compliance',
        value: '₹135 / ₹150',
        change: '₹15 saved daily',
        status: 'good',
        description: 'On track with your ₹150 student target'
      },
      {
        label: 'Study-Day Protein Stability',
        value: '92g / 110g',
        change: '+14% vs last week',
        status: 'good',
        description: 'Sprout & curd additions closed your mid-day gap'
      },
      {
        label: 'Library Afternoon Hydration',
        value: '2.2L / 3.0L',
        change: '73% target',
        status: 'attention',
        description: 'Refill 1 bottle during late afternoon study'
      }
    ]
  },

  EMPLOYEE: {
    id: 'EMPLOYEE',
    slug: 'employee',
    title: 'Employee Mode',
    tagline: 'Smart nutrition for fast-paced workdays, meetings, and desk routines.',
    targetTag: 'Working Professionals & Office',
    dailyBudgetInr: 280,
    themeColor: 'text-cyan-400',
    accentBg: 'bg-cyan-950/40',
    borderAccent: 'border-cyan-500/40',
    badge: '15-Min Lunch • Office Friendly • Anti-Slump',
    coreFocus: 'Workday energy stability & desk-clean meals',
    defaultPlateItems: [
      mockFoodCatalog[0],
      mockFoodCatalog[4],
    ],
    suggestedIngredients: [
      mockFoodCatalog[0],
      mockFoodCatalog[2],
      mockFoodCatalog[4],
      mockFoodCatalog[5],
    ],
    todayPlan: [
      {
        mealType: 'Breakfast',
        name: 'Overnight Oats with Chia Seeds & Whey / Greek Yogurt',
        calories: 380,
        protein: 26,
        costInr: 65,
        prepTimeMinutes: 5,
        whyThisFits: 'Zero morning prep time, smooth sustained glucose curve before standup.',
        items: ['50g Rolled Oats', '150ml Milk/Curd', '1 scoop Whey/Soy Protein', 'Chia Seeds']
      },
      {
        mealType: 'Lunch',
        name: 'Office Quinoa Paneer Tikka / Chicken Salad Bowl',
        calories: 490,
        protein: 34,
        costInr: 120,
        prepTimeMinutes: 15,
        whyThisFits: 'Non-greasy, desk-clean, prevents 2:30 PM carbohydrate crash.',
        items: ['Grilled Paneer/Chicken (120g)', 'Cooked Quinoa/Brown Rice', 'Steamed Broccoli & Peppers']
      },
      {
        mealType: 'Snack',
        name: 'Green Tea + Roasted Makhana & Pumpkin Seeds',
        calories: 180,
        protein: 9,
        costInr: 35,
        prepTimeMinutes: 3,
        whyThisFits: 'Office pantry friendly, anti-inflammatory caffeine synergy.',
        items: ['1 Cup Organic Green Tea', '30g Roasted Makhana', '15g Pumpkin Seeds']
      },
      {
        mealType: 'Dinner',
        name: 'Light Palak Dal Tadka + 2 Rotis + Sautéed Tofu',
        calories: 440,
        protein: 28,
        costInr: 60,
        prepTimeMinutes: 20,
        whyThisFits: 'High-fiber easy digestion for restful sleep after screen fatigue.',
        items: ['1 Bowl Palak Dal', '2 Phulkas', '100g Tofu/Paneer cubes']
      }
    ],
    quickMeals: [
      {
        id: 'qm-e1',
        title: '15-Minute Desk Protein Bowl',
        timeCategory: '< 20 min',
        calories: 420,
        protein: 30,
        costInr: 90,
        ingredients: ['Paneer/Tofu Cubes', 'Steamed Sweet Corn', 'Cucumber & Mint Yogurt'],
        tags: ['Desk Friendly', 'High Protein']
      },
      {
        id: 'qm-e2',
        title: 'Cafeteria Swap: Dal + Extra Curd (Skip Fried Starters)',
        timeCategory: '< 10 min',
        calories: 360,
        protein: 22,
        costInr: 70,
        ingredients: ['Cafeteria Dal', '200g Curd Bowl', 'Salad Bowl'],
        tags: ['Eating Out', 'Anti-Slump']
      }
    ],
    specializedData: {
      sectionTitle: 'Workday Productivity & Anti-Slump Guide',
      sectionSubtitle: 'Maintain peak executive focus and prevent late-afternoon burnout',
      cards: [
        {
          title: '3:00 PM Post-Lunch Energy Lock',
          badge: 'Productivity',
          description: 'When office lunches have excessive refined rice or naan, insulin spikes create brain fog. Switch to complex fiber and protein-rich bowls.',
          details: ['Target 30g protein at lunch', 'Walk 10 mins post-meal in office hallway']
        },
        {
          title: 'Desk Hydration Anchor',
          badge: 'Work Routine',
          description: 'Keep a 1-liter bottle at your desk and drink 1 glass every time you join a virtual meeting.',
          details: ['Reaches 3.0L effortlessly', 'Keeps hydration consistent across 8-hour shift']
        }
      ]
    },
    analyticsMetrics: [
      {
        label: 'Workday Lunch Consistency',
        value: '5 / 5 Days',
        change: '100% on target',
        status: 'good',
        description: 'Zero skipped workday lunches this week'
      },
      {
        label: 'Eating-Out Frequency',
        value: '2 Times / Week',
        change: 'Reduced from 4x',
        status: 'good',
        description: 'Saved ₹840 on delivery apps'
      },
      {
        label: 'Workday Hydration',
        value: '2.8L / 3.0L',
        change: '93% adherence',
        status: 'good',
        description: 'Desk bottle anchor is working effectively'
      }
    ]
  },

  HOSTEL: {
    id: 'HOSTEL',
    slug: 'hostel',
    title: 'Hostel / Mess Mode',
    tagline: 'Optimize hostel mess menus and build high-protein plates with limited cooking.',
    targetTag: 'Hostel Residents & Mess Food',
    dailyBudgetInr: 130,
    themeColor: 'text-emerald-400',
    accentBg: 'bg-emerald-950/40',
    borderAccent: 'border-emerald-500/40',
    badge: 'Mess Optimizer • Kettle Hacks • No-Cook',
    coreFocus: 'Practical mess substitutions & shelf-stable proteins',
    defaultPlateItems: [
      mockFoodCatalog[1],
      mockFoodCatalog[4],
    ],
    suggestedIngredients: [
      mockFoodCatalog[1],
      mockFoodCatalog[4],
      mockFoodCatalog[3],
      mockFoodCatalog[5],
    ],
    todayPlan: [
      {
        mealType: 'Breakfast',
        name: 'Mess Poha / Upma + 2 Boiled Eggs / Milk + Peanut Butter',
        calories: 350,
        protein: 20,
        costInr: 25,
        prepTimeMinutes: 5,
        whyThisFits: 'Upgrades standard high-carb mess breakfast with essential protein.',
        items: ['1 Bowl Mess Poha', '2 Boiled Eggs / 200ml Milk', '10g Peanuts']
      },
      {
        mealType: 'Lunch',
        name: 'Mess Rice & Dal + User Added Sattu / Curd',
        calories: 490,
        protein: 25,
        costInr: 40,
        prepTimeMinutes: 10,
        whyThisFits: 'Mix 2 tbsp sattu or curd into mess dal to double total protein.',
        items: ['Rice & Mess Dal', '2 tbsp Chana Sattu', 'Curd Bowl', 'Raw Onion Salad']
      },
      {
        mealType: 'Snack',
        name: 'Sprouted Moong (Room Jar) with Chaat Masala & Cucumber',
        calories: 180,
        protein: 14,
        costInr: 15,
        prepTimeMinutes: 2,
        whyThisFits: 'Zero cooking required. Sprouts grow easily in your hostel room.',
        items: ['1 Bowl Sprouted Moong', 'Chopped Cucumber', 'Chaat Masala']
      },
      {
        mealType: 'Dinner',
        name: 'Mess Roti & Sabzi + Extra Paneer / Soya chunks',
        calories: 460,
        protein: 27,
        costInr: 50,
        prepTimeMinutes: 15,
        whyThisFits: 'Balances evening carbohydrates with convenient room-stored proteins.',
        items: ['3 Mess Rotis', '1 Bowl Mess Sabzi', '60g Ready Paneer / Soya Chunks']
      }
    ],
    quickMeals: [
      {
        id: 'qm-h1',
        title: 'Mess Dal Protein Enhancer (Add Sattu)',
        timeCategory: '< 10 min',
        calories: 280,
        protein: 19,
        costInr: 15,
        ingredients: ['Mess Dal', '2 tbsp Roasted Sattu Powder', 'Lemon'],
        tags: ['Mess Hack', 'Under ₹20']
      },
      {
        id: 'qm-h2',
        title: 'Kettle Steamed Soya Chunks & Maggi Swap',
        timeCategory: '< 10 min',
        calories: 320,
        protein: 28,
        costInr: 30,
        ingredients: ['50g Soya Chunks (boiled)', 'Spices', 'Tomato'],
        tags: ['Hostel Favorite', '28g Protein']
      }
    ],
    specializedData: {
      sectionTitle: "Hostel Room Nutrition & Mess Hacks",
      sectionSubtitle: 'Practical strategies when you only have a kettle and mess food',
      cards: [
        {
          title: 'Hostel Room Grocery Stash',
          badge: 'Room Essentials',
          description: 'Keep these non-perishable staples in your room: Roasted Chana, Sattu powder, Peanut Butter, Chia seeds, and raw Moong beans.',
          details: ['Cost: Under ₹400 for 2 weeks', 'Guarantees 25g+ protein daily']
        },
        {
          title: 'The Mess Menu Optimizer',
          badge: 'Mess Hack',
          description: 'When mess serves low-protein meals (e.g. potato curry), always take double curd and ask for extra thick dal from the bottom of the vessel.',
          details: ['Boosts protein by +12g with zero extra cost']
        }
      ]
    },
    analyticsMetrics: [
      {
        label: 'Mess Food Nutrition Balance',
        value: '78% Optimal',
        change: '+22% with room staples',
        status: 'good',
        description: 'Room protein additions balanced your mess diet'
      },
      {
        label: 'Weekly Hostel Grocery Spend',
        value: '₹340 / ₹500',
        change: '₹160 within budget',
        status: 'good',
        description: 'Sattu & chana keeping costs low'
      }
    ]
  },

  HOME: {
    id: 'HOME',
    slug: 'home',
    title: 'Home Mode',
    tagline: 'Wholesome home-cooked meal planning from ingredients already in your kitchen.',
    targetTag: 'Home Kitchen & Family Cooking',
    dailyBudgetInr: 200,
    themeColor: 'text-mint-accent',
    accentBg: 'bg-emerald-950/40',
    borderAccent: 'border-emerald-500/40',
    badge: 'Fresh Ingredients • Family Friendly • Batch Cook',
    coreFocus: 'Balanced pantry cooking & wholesome routines',
    defaultPlateItems: [
      mockFoodCatalog[3],
      mockFoodCatalog[0],
    ],
    suggestedIngredients: [
      mockFoodCatalog[0],
      mockFoodCatalog[3],
      mockFoodCatalog[4],
      mockFoodCatalog[1],
    ],
    todayPlan: [
      {
        mealType: 'Breakfast',
        name: 'Vegetable Stuffed Besan Chilla with Mint Coriander Chutney',
        calories: 320,
        protein: 20,
        costInr: 35,
        prepTimeMinutes: 15,
        whyThisFits: 'High-protein chickpea batter with fresh home vegetables.',
        items: ['2 Besan Chillas', 'Grated Carrots & Paneer', 'Fresh Mint Chutney']
      },
      {
        mealType: 'Lunch',
        name: 'Home Thali: Brown Rice + Palak Dal Tadka + Bhindi Fry + Curd',
        calories: 510,
        protein: 28,
        costInr: 65,
        prepTimeMinutes: 30,
        whyThisFits: 'Complete balanced home meal with active live cultures and dietary fiber.',
        items: ['1 Cup Brown Rice', '1 Bowl Spinach Dal', 'Bhindi Masala', 'Fresh Home Curd']
      },
      {
        mealType: 'Snack',
        name: 'Fruit Salad (Papaya/Guava) with Roasted Pumpkin Seeds',
        calories: 160,
        protein: 6,
        costInr: 30,
        prepTimeMinutes: 5,
        whyThisFits: 'Rich in vitamin C and digestive enzymes.',
        items: ['1 Bowl Fresh Seasonal Fruit', '15g Pumpkin Seeds']
      },
      {
        mealType: 'Dinner',
        name: 'Paneer / Soya Matar Curry with 2 Jowar / Multigrain Rotis',
        calories: 460,
        protein: 26,
        costInr: 60,
        prepTimeMinutes: 25,
        whyThisFits: 'Complex millet grains with slow-digesting proteins.',
        items: ['150g Paneer Matar', '2 Jowar Rotis', 'Kachumber Salad']
      }
    ],
    quickMeals: [
      {
        id: 'qm-hm1',
        title: 'Home Kitchen 10-Minute Moong Sprouts Tadka',
        timeCategory: '< 10 min',
        calories: 240,
        protein: 18,
        costInr: 25,
        ingredients: ['Sprouted Moong', 'Mustard seeds & Curry leaves', 'Lemon juice'],
        tags: ['Home Staple', 'Gut Friendly']
      }
    ],
    specializedData: {
      sectionTitle: "What's in Your Home Kitchen?",
      sectionSubtitle: 'Select your available pantry ingredients to generate instant home recipes',
      cards: [
        {
          title: 'Family Meal Portion Optimizer',
          badge: 'Family Friendly',
          description: 'One core family dish (e.g. Rajma or Dal) can be adjusted with extra paneer/egg for fitness goals without cooking separate meals.',
          details: ['Saves cooking time for family', 'Fits individual macro targets']
        },
        {
          title: 'Weekly Batch-Cook Strategy',
          badge: 'Batch Prep',
          description: 'Boil a large batch of chickpeas/dal and keep fresh homemade green chutney ready in the fridge for 3 days of effortless meals.',
          details: ['Reduces daily dinner prep to 10 minutes']
        }
      ]
    },
    analyticsMetrics: [
      {
        label: 'Home Cooking Compliance',
        value: '88% of Meals',
        change: '+12% vs last month',
        status: 'good',
        description: 'Wholesome whole-food adherence'
      },
      {
        label: 'Dietary Fiber Consistency',
        value: '34g / 35g Target',
        change: '97% Target',
        status: 'good',
        description: 'Home vegetables meeting fiber targets'
      }
    ]
  },

  TRAVEL: {
    id: 'TRAVEL',
    slug: 'travel',
    title: 'Travel Mode',
    tagline: 'Maintain your nutrition targets and budget wherever you travel across India.',
    targetTag: 'On the Move & Transit',
    dailyBudgetInr: 350,
    themeColor: 'text-teal-400',
    accentBg: 'bg-teal-950/40',
    borderAccent: 'border-teal-500/40',
    badge: 'Location Match • Transit Fuel • Portable',
    coreFocus: 'On-the-move digestion & regional nutritious picks',
    defaultPlateItems: [
      mockFoodCatalog[1],
      mockFoodCatalog[0],
    ],
    suggestedIngredients: [
      mockFoodCatalog[1],
      mockFoodCatalog[0],
      mockFoodCatalog[4],
    ],
    todayPlan: [
      {
        mealType: 'Breakfast',
        name: 'Regional South/West Indian Idli / Poha + Tender Coconut Water',
        calories: 320,
        protein: 16,
        costInr: 60,
        prepTimeMinutes: 10,
        whyThisFits: 'Clean, safe transit breakfast with natural electrolytes.',
        items: ['3 Steamed Idlis', 'Sambar', 'Fresh Coconut Water']
      },
      {
        mealType: 'Lunch',
        name: 'Local Regional Thali (Ask for Extra Dal & Curd)',
        calories: 520,
        protein: 26,
        costInr: 120,
        prepTimeMinutes: 20,
        whyThisFits: 'Universally available across highway dhabas and railway/airport restaurants.',
        items: ['Local Thali with 2 Rotis', 'Thick Dal', 'Curd', 'Salad']
      },
      {
        mealType: 'Snack',
        name: 'Portable Travel Trail Mix: Almonds, Roasted Chana & Raisins',
        calories: 220,
        protein: 12,
        costInr: 45,
        prepTimeMinutes: 2,
        whyThisFits: 'Non-perishable bag snack preventing roadside junk food impulse buys.',
        items: ['Handful Almonds & Chana', '1 Bottle Mineral Water']
      },
      {
        mealType: 'Dinner',
        name: 'Paneer Tikka / Grilled Chicken + Steamed Rice & Clear Soup',
        calories: 480,
        protein: 32,
        costInr: 125,
        prepTimeMinutes: 20,
        whyThisFits: 'High-protein, non-bloating meal for overnight hotel stay.',
        items: ['Grilled Protein (150g)', 'Small Rice bowl', 'Clear Vegetable Soup']
      }
    ],
    quickMeals: [
      {
        id: 'qm-tr1',
        title: 'Highway Dhaba Smart Pick: Dal Fry + Tandoori Roti',
        timeCategory: '< 15 min',
        calories: 420,
        protein: 22,
        costInr: 90,
        ingredients: ['Yellow Dal Tadka', '2 Tandoori Rotis (Unbuttered)', 'Onions'],
        tags: ['Clean Travel', 'High Protein']
      }
    ],
    specializedData: {
      sectionTitle: "Location Nutrition & Regional Match",
      sectionSubtitle: 'Tailored recommendations for your destination city with Out of State integration',
      cards: [
        {
          title: 'Destination: Bangalore Match',
          badge: '94% Match',
          description: 'Top local picks: Ragi Dosa + Sambar (22g protein), Sprouted Sundal, and Darshini Thali.',
          details: ['Average meal cost: ₹55–80', 'Rich in iron and clean carbs']
        },
        {
          title: 'Transit Hydration & Electrolytes',
          badge: 'Travel Guard',
          description: 'Air travel and trains cause subtle dehydration. Drink 250ml water every 2 hours and choose tender coconut water over sodas.',
          details: ['Prevents transit fatigue and digestive sluggishness']
        }
      ]
    },
    analyticsMetrics: [
      {
        label: 'Travel Day Calorie Adherence',
        value: '2,050 / 2,100',
        change: '98% on target',
        status: 'good',
        description: 'Successfully avoided roadside fried snacks'
      },
      {
        label: 'Travel Water Intake',
        value: '2.5L / 3.0L',
        change: '83% Target',
        status: 'good',
        description: 'Bottled water tracking active'
      }
    ]
  },

  EATING_OUT: {
    id: 'EATING_OUT',
    slug: 'eating-out',
    title: 'Eating Out Mode',
    tagline: 'Make the smartest, highest-protein choices from any restaurant menu.',
    targetTag: 'Restaurants & Social Dining',
    dailyBudgetInr: 320,
    themeColor: 'text-purple-400',
    accentBg: 'bg-purple-950/40',
    borderAccent: 'border-purple-500/40',
    badge: 'Menu Swaps • Protein Maximizer • Calorie Buffer',
    coreFocus: 'Smart restaurant orders & high-protein choices',
    defaultPlateItems: [
      mockFoodCatalog[0],
      mockFoodCatalog[2],
    ],
    suggestedIngredients: [
      mockFoodCatalog[0],
      mockFoodCatalog[2],
      mockFoodCatalog[4],
    ],
    todayPlan: [
      {
        mealType: 'Breakfast',
        name: 'South Indian Darshini: 2 Steamed Idlis + 1 Vada (Shared) + Sambar',
        calories: 340,
        protein: 14,
        costInr: 60,
        prepTimeMinutes: 10,
        whyThisFits: 'Prioritizes steamed idlis and avoids excess deep-fried sides.',
        items: ['2 Idlis', 'Sambar', 'Coconut Chutney (1 tbsp)']
      },
      {
        mealType: 'Lunch',
        name: 'Restaurant Tandoori Paneer / Chicken Tikka Platter + Roti',
        calories: 520,
        protein: 36,
        costInr: 180,
        prepTimeMinutes: 20,
        whyThisFits: 'Tandoori cooking uses minimal oil while maximizing lean protein.',
        items: ['6 Pcs Tandoori Tikka', '1 Tandoori Roti', 'Mint Dip & Onion Salad']
      },
      {
        mealType: 'Snack',
        name: 'Café Cold Brew / Americano + Roasted Almonds',
        calories: 140,
        protein: 6,
        costInr: 80,
        prepTimeMinutes: 5,
        whyThisFits: 'Zero sugar coffee keeps calorie room for social dinners.',
        items: ['Unsweetened Iced Coffee', '20g Roasted Almonds']
      },
      {
        mealType: 'Dinner',
        name: 'Sizzler / Bowl Swap: Sautéed Veggies & Grilled Protein (Skip heavy creamy gravies)',
        calories: 480,
        protein: 32,
        costInr: 210,
        prepTimeMinutes: 25,
        whyThisFits: 'Saves 350 hidden calories from butter/cream gravies.',
        items: ['Grilled Protein Base', 'Steamed/Grilled Veggies', 'Herb Rice (small portion)']
      }
    ],
    quickMeals: [
      {
        id: 'qm-eo1',
        title: 'Smart Restaurant Swap: Tandoori over Butter Masala',
        timeCategory: '< 15 min',
        calories: 380,
        protein: 32,
        costInr: 160,
        ingredients: ['Tandoori Paneer/Chicken', 'Roti', 'Salad'],
        tags: ['Saves 280 kcal', '32g Protein']
      }
    ],
    specializedData: {
      sectionTitle: "Smart Menu Comparison & Better Swaps",
      sectionSubtitle: 'Decide what to order with personalized nutritional ratings',
      cards: [
        {
          title: 'Option A: Tandoori Tikka + Roti',
          badge: '96% Best Match (₹180)',
          description: 'High Protein (34g), Low Fat. The most nutrient-dense item on Indian restaurant menus.',
          details: ['Recommended Swap over Shahi Paneer or Butter Chicken']
        },
        {
          title: 'Option B: Dal Makhani + Butter Naan',
          badge: '64% Match (₹220)',
          description: 'High Saturated Fat (38g), Lower Protein (14g). Creates heavy digestive sluggishness.',
          details: ['Swap advice: Ask for Yellow Dal Tadka + Tandoori Roti']
        }
      ]
    },
    analyticsMetrics: [
      {
        label: 'Smart Menu Swap Success',
        value: '4 Swaps Made',
        change: 'Saved ~920 kcal',
        status: 'good',
        description: 'Chose tandoori & dal tadka over cream curries'
      },
      {
        label: 'Social Dining Budget',
        value: '₹380 Spent Today',
        change: 'Within social buffer',
        status: 'good',
        description: 'Healthy portion control maintained'
      }
    ]
  },

  ACTIVE: {
    id: 'ACTIVE',
    slug: 'active',
    title: 'Active / Fitness Mode',
    tagline: 'High-protein timing, workout performance, and muscle recovery nutrition.',
    targetTag: 'Gym, Athletics & High Energy',
    dailyBudgetInr: 250,
    themeColor: 'text-mint-accent',
    accentBg: 'bg-emerald-950/40',
    borderAccent: 'border-emerald-500/40',
    badge: '1.8-2.2g/kg Protein • Pre/Post Workout • Electrolytes',
    coreFocus: 'Muscle synthesis, recovery & electrolyte balance',
    defaultPlateItems: [
      mockFoodCatalog[2],
      mockFoodCatalog[0],
      mockFoodCatalog[4],
    ],
    suggestedIngredients: [
      mockFoodCatalog[2],
      mockFoodCatalog[0],
      mockFoodCatalog[4],
      mockFoodCatalog[5],
    ],
    todayPlan: [
      {
        mealType: 'Breakfast',
        name: 'Pre-Workout Banana Oats + 4 Boiled Egg Whites / Whey Shake',
        calories: 420,
        protein: 34,
        costInr: 60,
        prepTimeMinutes: 10,
        whyThisFits: 'Fast-digesting carbs and high biological value protein 90 mins before training.',
        items: ['60g Oats', '1 Banana', '4 Egg Whites / 1 scoop Whey', 'Chia seeds']
      },
      {
        mealType: 'Lunch',
        name: 'Post-Workout Power Plate: Grilled Chicken/Paneer (180g) + Brown Rice & Dal',
        calories: 580,
        protein: 44,
        costInr: 140,
        prepTimeMinutes: 25,
        whyThisFits: 'Optimal 3:1 carb to protein ratio for muscle glycogen and protein synthesis.',
        items: ['180g Paneer/Chicken Breast', '1.5 Cups Rice', '1 Bowl Dal', 'Green Salad']
      },
      {
        mealType: 'Snack',
        name: 'Sprouted Moong Salad with Roasted Peanuts & Lemon Water',
        calories: 260,
        protein: 18,
        costInr: 25,
        prepTimeMinutes: 5,
        whyThisFits: 'Sustained leucine surge for mid-day muscle preservation.',
        items: ['100g Sprouted Moong', '25g Roasted Peanuts', 'Electrolyte Lemon Water']
      },
      {
        mealType: 'Dinner',
        name: 'Soya / Tofu Veggie Stir-Fry + 3 Multigrain Rotis + Curd',
        calories: 480,
        protein: 36,
        costInr: 65,
        prepTimeMinutes: 20,
        whyThisFits: 'Slow-digesting casein/soy protein for overnight muscle repair.',
        items: ['120g Soya Chunks / Tofu', '3 Phulkas', '1 Bowl Fresh Curd']
      }
    ],
    quickMeals: [
      {
        id: 'qm-ac1',
        title: '3-Minute Post-Workout Whey & Sattu Power Shake',
        timeCategory: '< 10 min',
        calories: 310,
        protein: 35,
        costInr: 55,
        ingredients: ['1 scoop Whey / 3 tbsp Sattu', '250ml Milk/Water', '1 tsp Honey'],
        tags: ['35g Protein', 'Immediate Recovery']
      }
    ],
    specializedData: {
      sectionTitle: "Performance Timing & Recovery",
      sectionSubtitle: 'Evidence-informed meal timing around your training sessions',
      cards: [
        {
          title: 'Pre-Workout Window (60-90m)',
          badge: 'Fuel & Pump',
          description: 'Focus on easily digestible carbohydrates (banana/oats/idli) + 15g protein. Keep fat low to avoid heavy stomach during training.',
          details: ['Boosts training stamina', 'Spares muscle protein breakdown']
        },
        {
          title: 'Post-Workout Synthesis (Within 2 hrs)',
          badge: 'Muscle Synthesis',
          description: 'Consume 30-40g protein rich in essential amino acids (eggs/paneer/chicken/whey/soy) along with complex carbs.',
          details: ['Replenishes muscle glycogen', 'Accelerates recovery']
        }
      ]
    },
    analyticsMetrics: [
      {
        label: 'Daily Protein Target Adherence',
        value: '132g / 130g',
        change: '101% of Target',
        status: 'good',
        description: 'Optimal 1.9g/kg bodyweight reached'
      },
      {
        label: 'Post-Workout Hydration',
        value: '3.2L / 3.5L',
        change: '91% Target',
        status: 'good',
        description: 'Electrolytes replenished'
      }
    ]
  },

  WOMEN_WELLNESS: {
    id: 'WOMEN_WELLNESS',
    slug: 'womens-wellness',
    title: "Women's Wellness Mode",
    tagline: 'Balanced natural nourishment, iron-rich staples, and steady daily vitality.',
    targetTag: 'Iron, Vitality & Balanced Nutrition',
    dailyBudgetInr: 220,
    themeColor: 'text-pink-400',
    accentBg: 'bg-pink-950/40',
    borderAccent: 'border-pink-500/40',
    badge: 'Iron Rich • Natural Balance • Hydration Support',
    coreFocus: 'Natural energy balance & micronutrient nourishment',
    defaultPlateItems: [
      mockFoodCatalog[3],
      mockFoodCatalog[4],
    ],
    suggestedIngredients: [
      mockFoodCatalog[3],
      mockFoodCatalog[4],
      mockFoodCatalog[0],
      mockFoodCatalog[1],
    ],
    todayPlan: [
      {
        mealType: 'Breakfast',
        name: 'Ragi (Finger Millet) Dosa with Palak Sambar & Mint Chutney',
        calories: 340,
        protein: 18,
        costInr: 45,
        prepTimeMinutes: 15,
        whyThisFits: 'Ragi is loaded with natural calcium and non-heme iron.',
        items: ['2 Ragi Dosa', 'Palak Sambar', '1 Boiled Egg / Curd']
      },
      {
        mealType: 'Lunch',
        name: 'Iron Power Bowl: Spinach Dal Tadka + Beetroot Salad + Brown Rice + Paneer',
        calories: 490,
        protein: 28,
        costInr: 75,
        prepTimeMinutes: 25,
        whyThisFits: 'Combining vitamin C (lemon & beetroot) triples dietary iron absorption.',
        items: ['1 Bowl Palak Dal', 'Beetroot Cucumber Salad with Lemon', '1 Cup Rice', 'Paneer (80g)']
      },
      {
        mealType: 'Snack',
        name: 'Soaked Figs (Anjeer), Dates & Roasted Pumpkin Seeds + Herbal Tea',
        calories: 190,
        protein: 8,
        costInr: 35,
        prepTimeMinutes: 3,
        whyThisFits: 'Rich in zinc, magnesium, and natural gentle energy.',
        items: ['2 Soaked Figs', '2 Dates', '15g Pumpkin Seeds', 'Chamomile/Green Tea']
      },
      {
        mealType: 'Dinner',
        name: 'Methi (Fenugreek) Moong Dal Khichdi with Curd & Pomegranate',
        calories: 440,
        protein: 24,
        costInr: 55,
        prepTimeMinutes: 20,
        whyThisFits: 'Light, gut-soothing, and anti-inflammatory for restorative sleep.',
        items: ['1 Bowl Methi Khichdi', '1 Bowl Fresh Curd', 'Pomegranate seeds']
      }
    ],
    quickMeals: [
      {
        id: 'qm-w1',
        title: '5-Minute Beetroot Lemon & Sprout Salad',
        timeCategory: '< 10 min',
        calories: 210,
        protein: 14,
        costInr: 25,
        ingredients: ['Grated Beetroot', 'Sprouted Moong', 'Lemon juice', 'Coriander'],
        tags: ['Iron Booster', 'Antioxidant']
      }
    ],
    specializedData: {
      sectionTitle: "Micronutrient Awareness & Daily Vitality",
      sectionSubtitle: 'General evidence-based dietary recommendations for sustained wellbeing',
      cards: [
        {
          title: 'Iron & Vitamin C Synergy',
          badge: 'Micronutrients',
          description: 'Plant-based iron (spinach, dal, ragi) is absorbed significantly better when paired with Vitamin C (lemon juice, tomatoes, amla). Always squeeze lemon over your dals.',
          details: ['Triples bioavailable iron', 'Combats mid-afternoon tiredness naturally']
        },
        {
          title: 'Hydration & Electrolyte Balance',
          badge: 'Vitality',
          description: 'Maintain 2.5–3.0L daily hydration with infused water (cucumber, mint, lemon) to support cellular vitality and clear skin.',
          details: ['Natural gentle electrolyte replenishment']
        }
      ]
    },
    analyticsMetrics: [
      {
        label: 'Dietary Iron Intake Est.',
        value: '16.8mg / 18mg Target',
        change: '93% of Daily Target',
        status: 'good',
        description: 'Spinach & ragi staples meeting requirements'
      },
      {
        label: 'Hydration & Vitality Index',
        value: '2.6L / 2.8L',
        change: '93% Adherence',
        status: 'good',
        description: 'Consistent fluid intake throughout the day'
      }
    ]
  }
};