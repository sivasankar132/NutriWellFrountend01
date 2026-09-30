import { HealthCondition } from '../types';

export const mockHealthConditions: HealthCondition[] = [
  {
    id: 'cond-1',
    title: 'Type-2 Diabetes & Glycemic Control',
    category: 'Metabolic Health',
    shortDescription: 'Maintain steady blood sugar levels using low-glycemic Indian complex carbs and high-fiber legumes.',
    fullGuidance: 'Glycemic variability is heavily influenced by rapid digestion of refined grains. Replacing white rice with brown rice, millet (Ragi, Jowar), or quinoa along with adequate protein slows down glucose absorption and improves postprandial glycemic spikes.',
    recommendedFoods: ['Sprouted Moong Dal', 'Palak & Methi Saag', 'Bitter Gourd (Karela)', 'Bajra & Ragi Roti', 'Almonds & Walnuts'],
    avoidFoods: ['Refined White Maida', 'Sugary Beverages & Juices', 'Fried Snacks (Samosas)', 'Polished White Rice', 'Ultra-processed Sweets'],
    lifestyleTips: [
      'Take a 15-minute post-meal brisk walk.',
      'Always start your meal with salad/vegetables first, then protein, and carbohydrates last.',
      'Maintain consistent meal timing to avoid hypoglycemia.'
    ],
    doctorSpecialtyToConsult: 'Clinical Nutritionist & Metabolic Specialist',
  },
  {
    id: 'cond-2',
    title: 'Hypertension & Cardiac Wellness',
    category: 'Cardiovascular',
    shortDescription: 'Manage blood pressure through sodium reduction, high potassium greens, and omega-3 rich healthy fats.',
    fullGuidance: 'High blood pressure damages arterial walls over time. Increasing potassium intake through fresh leafy greens and fruit while capping daily sodium below 2,000mg helps lower systolic blood pressure effectively.',
    recommendedFoods: ['Fresh Coconut Water', 'Pomegranate', 'Flaxseeds & Chia', 'Oatmeal with Berries', 'Garlic & Turmeric Gravies'],
    avoidFoods: ['Excessive Pickles (Achar)', 'Papad & High Salt Snacks', 'Processed Canned Meats', 'Deep Fried Snacks', 'Trans-fat Butter'],
    lifestyleTips: [
      'Practice 10 minutes of deep pranayama breathwork daily.',
      'Cap daily salt intake to under 1 teaspoon total.',
      'Monitor blood pressure twice weekly in the morning.'
    ],
    doctorSpecialtyToConsult: 'Cardiovascular Dietitian & Sports Nutritionist',
  },
  {
    id: 'cond-3',
    title: 'IBS & Gut Microbiome Dysbiosis',
    category: 'Digestive Health',
    shortDescription: 'Soothe digestive inflammation and restore beneficial gut flora using fermentable fiber and anti-inflammatory spices.',
    fullGuidance: 'Irritable Bowel Syndrome requires careful identification of FODMAP triggers. Introducing gentle prebiotics such as cooked dahi (curd), buttermilk (chaas) with cumin, and steamed vegetables stabilizes bowel motility.',
    recommendedFoods: ['Home-made Curd (Dahi)', 'Jeera-Heeng Chaas', 'Steamed Bottle Gourd (Lauki)', 'Khichdi with Ghee', 'Papaya'],
    avoidFoods: ['Raw Garlic & Onions (if sensitive)', 'Artificial Sweeteners', 'Carbonated Sodas', 'Heavy Cheese Dishes', 'Ultra-spicy Chillies'],
    lifestyleTips: [
      'Chew each bite 20-30 times before swallowing.',
      'Avoid drinking large quantities of water during meals.',
      'Identify food sensitivities using the NutriWell Journal.'
    ],
    doctorSpecialtyToConsult: 'Gastroenterology & Gut Microbiome Expert',
  },
  {
    id: 'cond-4',
    title: 'Iron Deficiency & Anemia Management',
    category: 'Hematology',
    shortDescription: 'Boost hemoglobin levels by combining non-heme Indian iron sources with Vitamin C enhancers.',
    fullGuidance: 'Iron absorption is enhanced by 300% when non-heme plant iron is paired with Vitamin C (lemon juice, amla). Avoid drinking tea or coffee immediately after meals as tannins inhibit iron binding.',
    recommendedFoods: ['Amla (Indian Gooseberry)', 'Beetroot & Carrot Juice', 'Jaggery & Sesame Chikki', 'Spinach (Palak)', 'Dates & Figs'],
    avoidFoods: ['Black Tea/Coffee within 1hr of meals', 'Calcium Supplements with meals', 'High Phytate Unsoaked Grains'],
    lifestyleTips: [
      'Squeeze fresh lemon over cooked dal and spinach before consuming.',
      'Cook food in traditional iron kadai to increase bioavailable iron content.',
      'Check complete blood count (CBC) & ferritin every 3 months.'
    ],
    doctorSpecialtyToConsult: 'Ayurvedic Clinical Nutritionist & Endocrinologist',
  }
];
