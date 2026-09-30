import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  UserProfile, MealLog, Doctor, Appointment, JournalEntry, Language, 
  ContextMode, UserMode, AccountTier, FoodItem, PersonalNutritionMemory, 
  PrivacyConsentState, HealthCondition, OutOfState24hPlan,
  HealthReminder, ReminderPreset, BudgetItem, DailyExercise
} from '../types';
import { initialUserProfile } from '../data/mockUser';
import { nutritionService } from '../services/nutritionService';
import { doctorService } from '../services/doctorService';
import { journalService } from '../services/journalService';
import { translations } from '../data/translations';
import { privacyConsentService } from '../services/privacyConsentService';
import { chimeService } from '../services/chimeService';
import { REMINDER_PRESETS } from '../services/reminderPresets';

import { 
  authApi, 
  userApi, 
  nutritionApi, 
  mealsApi, 
  dailyNutritionApi, 
  progressApi,
  ApiUser
} from '../services/api';

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  contextMode: ContextMode;
  setContextMode: (mode: ContextMode) => void;
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  tier: AccountTier;
  setTier: (tier: AccountTier) => void;
  isPremiumModalOpen: boolean;
  setIsPremiumModalOpen: (open: boolean) => void;
  meals: MealLog[];
  addMeal: (meal: Omit<MealLog, 'id' | 'timestamp'>) => void;
  deleteMeal: (id: string) => void;
  appointments: Appointment[];
  bookAppointment: (doctor: Doctor, date: string, timeSlot: string) => Appointment;
  cancelAppointment: (id: string) => void;
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
  isScannerOpen: boolean;
  setIsScannerOpen: (open: boolean) => void;
  isQuickActionsOpen: boolean;
  setIsQuickActionsOpen: (open: boolean) => void;
  toast: string | null;
  showToast: (msg: string) => void;
  logWater: (amountMl?: number) => void;
  
  // Backend Integration & Authentication State
  isAuthenticated: boolean;
  authLoading: boolean;
  apiUser: ApiUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshFromBackend: () => Promise<void>;
  
  // Custom User-Created Options & Session Memory
  personalMemory: PersonalNutritionMemory;
  addCustomFoodItem: (food: Omit<FoodItem, 'id'>) => void;
  addCustomCuisinePreference: (cuisine: string) => void;
  toggleFavoriteFood: (foodName: string) => void;
  privacyConsent: PrivacyConsentState;
  updatePrivacyConsent: (updates: Partial<PrivacyConsentState>) => void;

  // Custom User-Entered Health Conditions
  customConditions: HealthCondition[];
  addCustomCondition: (conditionName: string) => HealthCondition;

  // Out of State Location Intelligence State
  outOfStateDestination: string;
  setOutOfStateDestination: (dest: string) => void;
  outOfStatePlan: OutOfState24hPlan;
  generateOutOfStatePlan: (dest: string) => void;
  toggleLockOutOfStatePlan: () => void;

  // Budget Management
  budgetItems: BudgetItem[];
  removeBudgetItem: (id: string) => void;
  addBudgetItem: (item: Omit<BudgetItem, 'id'>) => void;
  resetBudgetItems: () => void;
  isBudgetModalOpen: boolean;
  setIsBudgetModalOpen: (open: boolean) => void;

  // Daily Fitness & Movement
  dailyExercises: DailyExercise[];
  toggleExerciseComplete: (id: string) => void;
  completeExercise: (id: string) => void;
  resetDailyExercises: () => void;

  // Health Reminders & Schedule State
  reminders: HealthReminder[];
  activeAlert: HealthReminder | null;
  addReminder: (reminder: Omit<HealthReminder, 'id' | 'createdAt'>) => void;
  updateReminder: (id: string, updates: Partial<HealthReminder>) => void;
  deleteReminder: (id: string) => void;
  toggleReminder: (id: string) => void;
  applyPreset: (presetKey: ReminderPreset) => void;
  dismissActiveAlert: () => void;
  snoozeActiveAlert: (minutes?: number) => void;
  triggerTestNotification: () => void;
  desktopNotificationPermission: NotificationPermission | 'unsupported';
  requestDesktopNotificationPermission: () => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Session-only state (persists across navigation, resets on browser refresh for clean demo execution)
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [meals, setMeals] = useState<MealLog[]>(() => nutritionService.getLoggedMeals());
  const [appointments, setAppointments] = useState<Appointment[]>(() => doctorService.getAppointments());
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => journalService.getEntries());
  const [language, setLanguageState] = useState<Language>(initialUserProfile.language || 'en');
  const [contextMode, setContextMode] = useState<ContextMode>('STUDENT');
  const [userMode, setUserMode] = useState<UserMode>('ADULT');
  const [tier, setTier] = useState<AccountTier>('FREE');
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState<boolean>(false);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  // Backend Integration State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => authApi.isAuthenticated());
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [apiUser, setApiUser] = useState<ApiUser | null>(null);

  // Custom user conditions (persisted in session)
  const [customConditions, setCustomConditions] = useState<HealthCondition[]>([]);

  // Out of State Location State
  const [outOfStateDestination, setOutOfStateDestination] = useState<string>('Bangalore');
  const [outOfStatePlan, setOutOfStatePlan] = useState<OutOfState24hPlan>({
    destination: 'Bangalore',
    isLocked: false,
    meals: {
      breakfast: 'Ragi Dosa with Sambar & Sprouted Salad (22g Protein • ₹45)',
      lunch: 'South Karnataka Thali with Extra Dal & Curd (28g Protein • ₹70)',
      snack: 'Roasted Peanuts with Tender Coconut Water (14g Protein • ₹35)',
      dinner: 'Moong Dal Khichdi with Steamed Paneer Cubes (26g Protein • ₹60)'
    }
  });

  // Session Memory
  const [personalMemory, setPersonalMemory] = useState<PersonalNutritionMemory>({
    favoriteFoods: ['Paneer Tikka Bowl', 'Sprouted Moong Salad', 'Ragi Idli', 'Curd Rice with Pomegranate'],
    rejectedFoods: [],
    customFoods: [],
    customCuisines: ['South Indian & North Indian Healthy Fusion'],
    recentChoices: ['Sprouted Moong Salad', 'Paneer Tikka Bowl'],
    commonGaps: ['Protein'],
  });

  // Budget Management State
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { id: 'b-1', name: 'Moong Dal', cost: 40, category: 'Protein & Pulses', portion: '1 bowl cooked' },
    { id: 'b-2', name: 'Curd', cost: 25, category: 'Dairy & Probiotics', portion: '1 cup fresh' },
    { id: 'b-3', name: 'Eggs (2 pcs)', cost: 30, category: 'Protein & Choline', portion: '2 boiled/scrambled' },
    { id: 'b-4', name: 'Fresh Vegetables', cost: 35, category: 'Fiber & Micronutrients', portion: '1 bowl seasonal' },
  ]);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState<boolean>(false);

  // Daily Fitness & Movement State
  const [dailyExercises, setDailyExercises] = useState<DailyExercise[]>([
    {
      id: 'ex-1',
      name: 'Walking / Brisk Walk',
      target: '20 min',
      durationMinutes: 20,
      category: 'Cardio',
      difficulty: 'Beginner',
      completed: true,
      instructions: [
        'Maintain an upright, comfortable posture with relaxed shoulders.',
        'Walk at a steady, conversational pace.',
        'Swing arms naturally and breathe rhythmically.',
        'Can be done indoors, outdoors, or around your campus/office.'
      ],
      helpsWith: ['Cardiovascular health', 'Daily calorie burn', 'Stress reduction', 'Joint mobility'],
      muscles: ['Calves', 'Hamstrings', 'Quadriceps', 'Glutes'],
      effortCalories: '~80-110 kcal',
      safetyTips: 'Wear supportive shoes and stay hydrated.'
    },
    {
      id: 'ex-2',
      name: 'Bodyweight Squats',
      target: '3 sets × 10 reps',
      durationMinutes: 6,
      category: 'Strength',
      difficulty: 'Beginner',
      completed: true,
      instructions: [
        'Stand with feet about shoulder-width apart, toes slightly turned out.',
        'Lower your hips back and down with control, keeping your chest upright.',
        'Keep knees aligned over your toes without collapsing inward.',
        'Push through your whole foot to return to standing.'
      ],
      helpsWith: ['Lower-body strength', 'Hip mobility', 'Everyday functional movement', 'Core stability'],
      muscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
      effortCalories: '~45-60 kcal',
      safetyTips: 'Only go as low as comfortable; keep heels flat on the floor.'
    },
    {
      id: 'ex-3',
      name: 'Push-ups / Wall Push-ups',
      target: '2 sets × 8 reps',
      durationMinutes: 5,
      category: 'Strength',
      difficulty: 'Beginner',
      completed: true,
      instructions: [
        'Place hands slightly wider than shoulder-width apart on the floor or against a wall.',
        'Keep your body in a straight line from head to heels.',
        'Lower your chest with control, keeping elbows at a ~45-degree angle.',
        'Push back to the start position while engaging your core.'
      ],
      helpsWith: ['Upper-body strength', 'Chest & shoulder endurance', 'Core engagement', 'Desk posture support'],
      muscles: ['Pectorals (Chest)', 'Triceps', 'Anterior Deltoids', 'Core'],
      effortCalories: '~30-45 kcal',
      safetyTips: 'Start with wall or incline push-ups if standard floor push-ups feel too challenging.'
    },
    {
      id: 'ex-4',
      name: 'Forearm Plank',
      target: '3 sets × 20 sec',
      durationMinutes: 4,
      category: 'Core',
      difficulty: 'Beginner',
      completed: false,
      instructions: [
        'Rest on your forearms with elbows directly under shoulders.',
        'Extend legs straight behind you, balancing on toes.',
        'Keep hips level with spine — avoid sagging or arching high.',
        'Breathe steadily and hold for 20 seconds.'
      ],
      helpsWith: ['Core endurance', 'Spine stabilization', 'Lower back support', 'Posture alignment'],
      muscles: ['Transverse Abdominis', 'Rectus Abdominis', 'Glutes', 'Shoulder Girdle'],
      effortCalories: '~25-35 kcal',
      safetyTips: 'Breathe normally; drop knees if lower back feels strained.'
    },
    {
      id: 'ex-5',
      name: 'Full Body Stretching & Mobility',
      target: '5 min',
      durationMinutes: 5,
      category: 'Mobility',
      difficulty: 'Beginner',
      completed: false,
      instructions: [
        'Perform gentle neck rolls, shoulder shrugs, and arm circles.',
        'Do seated or standing hamstring stretches and side torso reaches.',
        'Hold each gentle stretch for 15-20 seconds without bouncing.',
        'Focus on deep, relaxing diaphragmatic breathing.'
      ],
      helpsWith: ['Relieving desk stiffness', 'Flexibility & circulation', 'Muscle relaxation', 'Mental reset'],
      muscles: ['Hamstrings', 'Trapezius', 'Lats', 'Hip Flexors', 'Chest'],
      effortCalories: '~20-30 kcal',
      safetyTips: 'Move smoothly into stretches; never force painful ranges.'
    }
  ]);

  const [privacyConsent, setPrivacyConsent] = useState<PrivacyConsentState>(() => privacyConsentService.getConsent());

  // Health Reminders & Schedule State
  const [reminders, setReminders] = useState<HealthReminder[]>(() => {
    try {
      const saved = localStorage.getItem('nutriwell_reminders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return REMINDER_PRESETS[0].reminders.map((r, idx) => ({
      ...r,
      id: `rem-init-${idx + 1}`,
      createdAt: Date.now() + idx,
    }));
  });

  const [activeAlert, setActiveAlert] = useState<HealthReminder | null>(null);

  const [desktopNotificationPermission, setDesktopNotificationPermission] = useState<NotificationPermission | 'unsupported'>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'unsupported';
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const requestDesktopNotificationPermission = async (): Promise<boolean> => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      showToast('Desktop notifications are not supported in this browser.');
      return false;
    }
    try {
      const res = await Notification.requestPermission();
      setDesktopNotificationPermission(res);
      if (res === 'granted') {
        showToast('Desktop alerts enabled! 🔔');
        return true;
      } else {
        showToast('Desktop notification permission denied.');
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  const triggerAlert = useCallback((reminder: HealthReminder) => {
    setActiveAlert(reminder);
    chimeService.playChime();

    // Trigger Desktop Notification if supported & granted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`⏰ ${reminder.title}`, {
          body: reminder.notes || `${reminder.category} Reminder (${reminder.time})`,
          icon: '/vite.svg',
        });
      } catch (e) {
        console.warn('Could not fire desktop notification:', e);
      }
    }
  }, []);

  const triggerTestNotification = () => {
    const testItem: HealthReminder = {
      id: 'test-alert-' + Date.now(),
      title: 'Hydration & Nutrition Alert',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      category: 'Hydration',
      notes: 'Drink 400ml water with electrolytes to sustain metabolic vitality!',
      enabled: true,
      createdAt: Date.now(),
    };
    triggerAlert(testItem);
    showToast('Test Notification Preview triggered! 🔔');
  };

  const dismissActiveAlert = () => {
    setActiveAlert(null);
  };

  const snoozeActiveAlert = (minutes = 10) => {
    if (activeAlert) {
      const currentAlert = activeAlert;
      setActiveAlert(null);
      showToast(`Reminder snoozed for ${minutes} minutes.`);
      setTimeout(() => {
        triggerAlert(currentAlert);
      }, minutes * 60 * 1000);
    }
  };

  const addReminder = (newRem: Omit<HealthReminder, 'id' | 'createdAt'>) => {
    const item: HealthReminder = {
      ...newRem,
      id: 'rem-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      createdAt: Date.now(),
    };
    setReminders(prev => {
      const updated = [...prev, item].sort((a, b) => a.time.localeCompare(b.time));
      try { localStorage.setItem('nutriwell_reminders', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    showToast(`Added reminder: ${item.title}`);
  };

  const updateReminder = (id: string, updates: Partial<HealthReminder>) => {
    setReminders(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, ...updates } : r).sort((a, b) => a.time.localeCompare(b.time));
      try { localStorage.setItem('nutriwell_reminders', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    showToast('Reminder updated.');
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => {
      const updated = prev.filter(r => r.id !== id);
      try { localStorage.setItem('nutriwell_reminders', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    showToast('Reminder removed.');
  };

  const toggleReminder = (id: string) => {
    setReminders(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r);
      try { localStorage.setItem('nutriwell_reminders', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  const applyPreset = (presetKey: ReminderPreset) => {
    const found = REMINDER_PRESETS.find(p => p.key === presetKey);
    if (!found) return;
    const newItems: HealthReminder[] = found.reminders.map((r, idx) => ({
      ...r,
      id: `rem-${presetKey.toLowerCase()}-${idx + 1}-${Date.now()}`,
      createdAt: Date.now() + idx,
    }));
    setReminders(newItems);
    try { localStorage.setItem('nutriwell_reminders', JSON.stringify(newItems)); } catch (e) {}
    showToast(`Applied preset: ${found.title}!`);
  };

  // Exact-time dual-tier background polling engine (checks every 10s, once-per-day guarantee)
  useEffect(() => {
    const checkSchedule = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${hours}:${minutes}`;
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const todayStr = `${year}-${month}-${day}`;

      setReminders(prev => {
        let triggeredAny = false;
        const updated = prev.map(rem => {
          if (rem.enabled && rem.time === currentTimeStr && rem.lastTriggeredDate !== todayStr) {
            triggeredAny = true;
            triggerAlert(rem);
            return { ...rem, lastTriggeredDate: todayStr };
          }
          return rem;
        });

        if (triggeredAny) {
          try {
            localStorage.setItem('nutriwell_reminders', JSON.stringify(updated));
          } catch (e) {}
          return updated;
        }
        return prev;
      });
    };

    checkSchedule();
    const interval = setInterval(checkSchedule, 10000);
    return () => clearInterval(interval);
  }, [triggerAlert]);

  // Backend Data Synchronizer
  const refreshFromBackend = useCallback(async () => {
    if (!authApi.isAuthenticated()) return;
    try {
      // 1. Fetch user and nutrition profile in parallel
      const [currentUserRes, nutritionProfRes] = await Promise.allSettled([
        userApi.getMe(),
        nutritionApi.getProfile()
      ]);

      if (currentUserRes.status === 'fulfilled' && currentUserRes.value) {
        setApiUser(currentUserRes.value);
        setUser(prev => ({
          ...prev,
          name: currentUserRes.value.name || prev.name,
          email: currentUserRes.value.email || prev.email,
        }));
      }

      if (nutritionProfRes.status === 'fulfilled' && nutritionProfRes.value) {
        const np = nutritionProfRes.value;
        setUser(prev => ({
          ...prev,
          age: np.age || prev.age,
          gender: (np.gender as any) || prev.gender,
          heightCm: np.height_cm || prev.heightCm,
          weightKg: np.weight_kg || prev.weightKg,
          activityLevel: (np.activity_level as any) || prev.activityLevel,
          dietPreference: np.dietary_preference || prev.dietPreference,
          dailyCalorieTarget: np.target_calories || prev.dailyCalorieTarget,
          dailyProteinTarget: np.target_protein_g || prev.dailyProteinTarget,
          dailyWaterTargetMl: np.target_water_ml || prev.dailyWaterTargetMl,
          hasCompletedOnboarding: true,
        }));
      }

      // 2. Fetch Logged Meals
      const mealsRes = await mealsApi.getMeals();
      if (Array.isArray(mealsRes) && mealsRes.length > 0) {
        const mappedMeals: MealLog[] = mealsRes.map(m => ({
          id: m.id,
          foodName: m.name,
          mealType: (m.meal_type as any) || 'Lunch',
          calories: m.total_calories || 0,
          protein: m.total_protein_g || 0,
          carbs: m.total_carbs_g || 0,
          fat: m.total_fat_g || 0,
          fiber: m.items?.reduce((sum, it) => sum + (it.fiber_g || 0), 0) || 0,
          costInr: m.items?.reduce((sum, it) => sum + (it.cost_inr || 0), 0) || 0,
          timestamp: m.date || new Date().toLocaleDateString(),
        }));
        setMeals(mappedMeals);
      }
    } catch (e) {
      console.warn('Backend sync notice:', e);
    }
  }, []);

  // Initial authentication sync & auth-expired event listener
  useEffect(() => {
    if (authApi.isAuthenticated()) {
      setIsAuthenticated(true);
      refreshFromBackend();
    }

    const handleAuthExpired = () => {
      setIsAuthenticated(false);
      setApiUser(null);
      showToast("Session expired. Please log in again.");
    };

    window.addEventListener('nutriwell:auth-expired', handleAuthExpired);
    return () => window.removeEventListener('nutriwell:auth-expired', handleAuthExpired);
  }, [refreshFromBackend]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setAuthLoading(true);
    try {
      const res = await authApi.login({ email, password });
      setIsAuthenticated(true);
      if (res.user) {
        setApiUser(res.user);
        setUser(prev => ({
          ...prev,
          name: res.user.name || prev.name,
          email: res.user.email,
        }));
      }
      await refreshFromBackend();
      showToast(`Welcome back, ${res.user?.name || email}!`);
      return { success: true };
    } catch (err: any) {
      const msg = err.message || 'Login failed. Please check your credentials.';
      showToast(msg);
      return { success: false, error: msg };
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setAuthLoading(true);
    try {
      const res = await authApi.signup({ name, email, password });
      setIsAuthenticated(true);
      if (res.user) {
        setApiUser(res.user);
        setUser(prev => ({
          ...prev,
          name: res.user.name || name,
          email: res.user.email,
        }));
      }
      showToast(`Account created successfully! Welcome to NutriWell.`);
      return { success: true };
    } catch (err: any) {
      const msg = err.message || 'Registration failed. Please try again.';
      showToast(msg);
      return { success: false, error: msg };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      authApi.clearAuth();
    } finally {
      setIsAuthenticated(false);
      setApiUser(null);
      setUser(initialUserProfile);
      showToast("Logged out successfully.");
    }
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };

      if (authApi.isAuthenticated()) {
        if (updates.name) {
          userApi.updateMe({ name: updates.name }).catch(console.warn);
        }
        nutritionApi.saveProfile({
          age: updated.age || 28,
          gender: updated.gender || 'Male',
          height_cm: updated.heightCm || 175,
          weight_kg: updated.weightKg || 72,
          activity_level: updated.activityLevel || 'Moderately Active',
          dietary_preference: updated.dietPreference || 'Veg',
          target_calories: updated.dailyCalorieTarget || 2200,
          target_protein_g: updated.dailyProteinTarget || 120,
          target_carbs_g: 220,
          target_fat_g: 60,
          target_fiber_g: 35,
          target_water_ml: updated.dailyWaterTargetMl || 3000,
        }).catch(console.warn);
      }

      return updated;
    });
    showToast("Health Profile updated successfully!");
  };

  const addMeal = async (meal: Omit<MealLog, 'id' | 'timestamp'>) => {
    const newLog = nutritionService.addMealLog(meal);
    setMeals([...nutritionService.getLoggedMeals()]);
    setUser(prev => ({
      ...prev,
      spentTodayInr: (prev?.spentTodayInr || 0) + meal.costInr
    }));
    
    // Remember meal choice in session memory
    setPersonalMemory(prev => ({
      ...prev,
      recentChoices: [meal.foodName, ...prev.recentChoices].slice(0, 10)
    }));

    if (authApi.isAuthenticated()) {
      const today = new Date().toISOString().split('T')[0];
      try {
        const saved = await mealsApi.createMeal({
          name: meal.foodName,
          meal_type: meal.mealType,
          date: today,
          total_calories: meal.calories,
          total_protein_g: meal.protein,
          total_carbs_g: meal.carbs,
          total_fat_g: meal.fat,
          items: [{
            food_name: meal.foodName,
            serving_size: 1,
            serving_unit: 'serving',
            calories: meal.calories,
            protein_g: meal.protein,
            carbs_g: meal.carbs,
            fat_g: meal.fat,
            fiber_g: meal.fiber,
            cost_inr: meal.costInr,
          }]
        });

        if (saved?.id) {
          setMeals(prev => prev.map(m => m.id === newLog.id ? { ...m, id: saved.id } : m));
        }

        const allMeals = nutritionService.getLoggedMeals();
        const cal = allMeals.reduce((acc, m) => acc + m.calories, 0);
        const prot = allMeals.reduce((acc, m) => acc + m.protein, 0);
        const carb = allMeals.reduce((acc, m) => acc + m.carbs, 0);
        const fat = allMeals.reduce((acc, m) => acc + m.fat, 0);
        const fib = allMeals.reduce((acc, m) => acc + m.fiber, 0);

        await dailyNutritionApi.recordDailyNutrition({
          date: today,
          calories_consumed: cal,
          protein_consumed_g: prot,
          carbs_consumed_g: carb,
          fat_consumed_g: fat,
          fiber_consumed_g: fib,
          water_consumed_ml: 2250,
          calorie_target: user.dailyCalorieTarget,
          protein_target_g: user.dailyProteinTarget,
          water_target_ml: user.dailyWaterTargetMl,
        });
      } catch (e) {
        console.warn('Backend meal logging sync note:', e);
      }
    }

    showToast(`Logged ${meal.foodName} (+${meal.protein}g protein)!`);
  };

  const deleteMeal = async (id: string) => {
    nutritionService.deleteMealLog(id);
    setMeals(prev => prev.filter(m => m.id !== id));
    if (authApi.isAuthenticated() && !id.startsWith('log-')) {
      try {
        await mealsApi.deleteMeal(id);
      } catch (e) {
        console.warn('Backend delete meal error:', e);
      }
    }
    showToast("Meal removed from log.");
  };

  const bookAppointment = (doctor: Doctor, date: string, timeSlot: string): Appointment => {
    const newApt = doctorService.bookAppointment(doctor, date, timeSlot);
    setAppointments([...doctorService.getAppointments()]);
    showToast(`Consultation booked with ${doctor.name}!`);
    return newApt;
  };

  const cancelAppointment = (id: string) => {
    doctorService.cancelAppointment(id);
    setAppointments([...doctorService.getAppointments()]);
    showToast("Appointment status updated.");
  };

  const addJournalEntry = (entry: Omit<JournalEntry, 'id'>) => {
    journalService.addEntry(entry);
    setJournalEntries([...journalService.getEntries()]);
    showToast("Journal entry saved!");
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setUser(prev => ({ ...prev, language: lang }));
    showToast(lang === 'te' ? "భాష తెలుగులోకి మార్చబడింది" : "Language switched to English");
  };

  const t = (key: keyof typeof translations['en']): string => {
    const currentLang = language || 'en';
    const langDict = translations[currentLang] || translations['en'];
    return langDict[key] || translations['en'][key] || String(key);
  };

  const logWater = (amountMl: number = 250) => {
    showToast(`Logged +${amountMl}ml water intake!`);
  };

  const addCustomFoodItem = (food: Omit<FoodItem, 'id'>) => {
    const newCustomFood: FoodItem = {
      ...food,
      id: `custom-${Date.now()}`,
      isCustom: true,
    };
    setPersonalMemory(prev => ({
      ...prev,
      customFoods: [newCustomFood, ...prev.customFoods]
    }));
    showToast(`Added custom staple "${food.name}" to your library!`);
  };

  const addCustomCuisinePreference = (cuisine: string) => {
    if (!cuisine.trim()) return;
    setPersonalMemory(prev => ({
      ...prev,
      customCuisines: [...prev.customCuisines, cuisine]
    }));
    setUser(prev => ({ ...prev, cuisinePreference: cuisine }));
    showToast(`Custom cuisine "${cuisine}" saved to session memory!`);
  };

  const toggleFavoriteFood = (foodName: string) => {
    setPersonalMemory(prev => {
      const exists = prev.favoriteFoods.includes(foodName);
      return {
        ...prev,
        favoriteFoods: exists
          ? prev.favoriteFoods.filter(f => f !== foodName)
          : [...prev.favoriteFoods, foodName]
      };
    });
    showToast(`Updated favorites memory.`);
  };

  const updatePrivacyConsent = (updates: Partial<PrivacyConsentState>) => {
    const updated = privacyConsentService.updateConsent(updates);
    setPrivacyConsent(updated);
    showToast("Privacy permissions updated!");
  };

  // Add Custom Health Condition
  const addCustomCondition = (conditionName: string): HealthCondition => {
    const newCondition: HealthCondition = {
      id: `custom-cond-${Date.now()}`,
      title: conditionName.trim(),
      category: 'User Added Health Concern',
      shortDescription: `User-provided wellness profile concern: ${conditionName.trim()}. Personalized nutritional guidelines tailored for your daily meals.`,
      fullGuidance: `General nutrition guidelines for ${conditionName.trim()}: Focus on nutrient-dense whole foods, balanced macronutrient distribution, adequate hydration, and limiting heavily processed additives. Please discuss tailored clinical management with a qualified healthcare professional.`,
      recommendedFoods: ['Sprouted Legumes & Pulses', 'Fresh Leafy Greens', 'High-Fiber Whole Grains', 'Healthy Plant Fats (Nuts & Seeds)'],
      avoidFoods: ['Refined Sugars', 'Ultra-Processed Snacks', 'Excessive Trans Fats', 'High-Sodium Packaged Condiments'],
      lifestyleTips: ['Maintain consistent meal timings', 'Target 2.5–3.0L daily hydration', 'Engage in 20 minutes daily movement', 'Prioritize 7-8 hours quality sleep'],
      doctorSpecialtyToConsult: 'Clinical Nutritionist / General Physician',
      isUserAdded: true,
    };

    setCustomConditions(prev => [newCondition, ...prev]);
    showToast(`Added "${conditionName}" to your Health Profile!`);
    return newCondition;
  };

  // Out of State Plan Logic
  const generateOutOfStatePlan = (dest: string) => {
    setOutOfStateDestination(dest);
    
    // Customize regional recommendations dynamically
    let planMeals = {
      breakfast: 'Ragi Dosa with Sambar & Sprouted Salad (22g Protein • ₹45)',
      lunch: 'South Karnataka Thali with Extra Dal & Curd (28g Protein • ₹70)',
      snack: 'Roasted Peanuts with Tender Coconut Water (14g Protein • ₹35)',
      dinner: 'Moong Dal Khichdi with Steamed Paneer Cubes (26g Protein • ₹60)'
    };

    if (dest.toLowerCase().includes('mumbai') || dest.toLowerCase().includes('pune')) {
      planMeals = {
        breakfast: 'Sprouted Usal Poha with Buttermilk (20g Protein • ₹40)',
        lunch: 'Jowar Bhakri + Pithla + Sprout Amti (26g Protein • ₹65)',
        snack: 'Boiled Chana Chaat with Lemon (15g Protein • ₹30)',
        dinner: 'Moong Dal Cheela with Mint Chutney (24g Protein • ₹55)'
      };
    } else if (dest.toLowerCase().includes('delhi') || dest.toLowerCase().includes('north')) {
      planMeals = {
        breakfast: 'Paneer Stuffed Besan Chilla with Curd (24g Protein • ₹50)',
        lunch: 'Rajma Bowl with Brown Rice & Cucumber Salad (28g Protein • ₹75)',
        snack: 'Roasted Makhana & Sattu Drink (16g Protein • ₹35)',
        dinner: 'Dal Tadka with Multigrain Roti & Paneer (26g Protein • ₹65)'
      };
    } else if (dest.toLowerCase().includes('chennai')) {
      planMeals = {
        breakfast: 'Kanchipuram Idli with Sambar & Podi Dal (22g Protein • ₹40)',
        lunch: 'Tamil Nadu Rice Thali with Kootu & Sundal (27g Protein • ₹70)',
        snack: 'Spiced Sundal Bowl (16g Protein • ₹30)',
        dinner: 'Adai Dosa with Avial & Buttermilk (25g Protein • ₹60)'
      };
    }

    setOutOfStatePlan({
      destination: dest,
      isLocked: false,
      meals: planMeals
    });

    showToast(`Generated 24-hour local nutrition plan for ${dest}!`);
  };

  const toggleLockOutOfStatePlan = () => {
    setOutOfStatePlan(prev => {
      const nextLocked = !prev.isLocked;
      showToast(nextLocked ? `Your ${prev.destination} 24-hour plan is LOCKED ✓` : `Plan unlocked for editing.`);
      return {
        ...prev,
        isLocked: nextLocked,
        lockedAt: nextLocked ? new Date().toISOString() : undefined
      };
    });
  };

  // Budget Management Actions
  const removeBudgetItem = (id: string) => {
    const itemToRemove = budgetItems.find(b => b.id === id);
    const updated = budgetItems.filter(b => b.id !== id);
    setBudgetItems(updated);
    const newSpent = updated.reduce((sum, item) => sum + item.cost, 0);
    setUser(prev => ({ ...prev, spentTodayInr: newSpent }));
    if (itemToRemove) {
      showToast(`Removed ${itemToRemove.name} (₹${itemToRemove.cost}) from selected budget items.`);
    }
  };

  const addBudgetItem = (item: Omit<BudgetItem, 'id'>) => {
    const newItem: BudgetItem = {
      ...item,
      id: `budget-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`
    };
    const updated = [...budgetItems, newItem];
    setBudgetItems(updated);
    const newSpent = updated.reduce((sum, i) => sum + i.cost, 0);
    setUser(prev => ({ ...prev, spentTodayInr: newSpent }));
    showToast(`Added ${item.name} (₹${item.cost}) to budget items.`);
  };

  const resetBudgetItems = () => {
    const initial = [
      { id: 'b-1', name: 'Moong Dal', cost: 40, category: 'Protein & Pulses', portion: '1 bowl cooked' },
      { id: 'b-2', name: 'Curd', cost: 25, category: 'Dairy & Probiotics', portion: '1 cup fresh' },
      { id: 'b-3', name: 'Eggs (2 pcs)', cost: 30, category: 'Protein & Choline', portion: '2 boiled/scrambled' },
      { id: 'b-4', name: 'Fresh Vegetables', cost: 35, category: 'Fiber & Micronutrients', portion: '1 bowl seasonal' },
    ];
    setBudgetItems(initial);
    const newSpent = initial.reduce((sum, i) => sum + i.cost, 0);
    setUser(prev => ({ ...prev, spentTodayInr: newSpent }));
    showToast('Reset budget items to default sample!');
  };

  // Daily Exercise Actions
  const toggleExerciseComplete = (id: string) => {
    setDailyExercises(prev => {
      const updated = prev.map(ex => {
        if (ex.id === id) {
          const nextState = !ex.completed;
          showToast(nextState ? `Completed "${ex.name}"! Great movement streak! 🔥` : `Marked "${ex.name}" as pending.`);
          return { ...ex, completed: nextState };
        }
        return ex;
      });
      return updated;
    });
  };

  const completeExercise = (id: string) => {
    setDailyExercises(prev => {
      const updated = prev.map(ex => {
        if (ex.id === id) {
          if (!ex.completed) {
            showToast(`Completed "${ex.name}"! Great movement streak! 🔥`);
          }
          return { ...ex, completed: true };
        }
        return ex;
      });
      return updated;
    });
  };

  const resetDailyExercises = () => {
    setDailyExercises(prev => prev.map(ex => ({ ...ex, completed: false })));
    showToast('Reset daily movement progress for a new workout!');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        updateUserProfile,
        contextMode,
        setContextMode,
        userMode,
        setUserMode,
        tier,
        setTier,
        isPremiumModalOpen,
        setIsPremiumModalOpen,
        meals,
        addMeal,
        deleteMeal,
        appointments,
        bookAppointment,
        cancelAppointment,
        journalEntries,
        addJournalEntry,
        language,
        setLanguage,
        t,
        isScannerOpen,
        setIsScannerOpen,
        isQuickActionsOpen,
        setIsQuickActionsOpen,
        toast,
        showToast,
        logWater,
        isAuthenticated,
        authLoading,
        apiUser,
        login,
        signup,
        logout,
        refreshFromBackend,
        personalMemory,
        addCustomFoodItem,
        addCustomCuisinePreference,
        toggleFavoriteFood,
        privacyConsent,
        updatePrivacyConsent,
        customConditions,
        addCustomCondition,
        outOfStateDestination,
        setOutOfStateDestination,
        outOfStatePlan,
        generateOutOfStatePlan,
        toggleLockOutOfStatePlan,
        budgetItems,
        removeBudgetItem,
        addBudgetItem,
        resetBudgetItems,
        isBudgetModalOpen,
        setIsBudgetModalOpen,
        dailyExercises,
        toggleExerciseComplete,
        completeExercise,
        resetDailyExercises,
        reminders,
        activeAlert,
        addReminder,
        updateReminder,
        deleteReminder,
        toggleReminder,
        applyPreset,
        dismissActiveAlert,
        snoozeActiveAlert,
        triggerTestNotification,
        desktopNotificationPermission,
        requestDesktopNotificationPermission,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
