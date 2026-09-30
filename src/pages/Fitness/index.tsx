import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ExerciseVideoModal } from '../../components/fitness/ExerciseVideoModal';
import { DailyExercise } from '../../types';
import { 
  Activity, CheckCircle2, Circle, Flame, 
  ArrowLeft, Sparkles, Clock, Target, 
  ShieldCheck, Info, RotateCcw, ChevronRight,
  Dumbbell, HeartPulse, User, Footprints
} from 'lucide-react';

// Comprehensive Beginner Exercise Library
const EXERCISE_LIBRARY: DailyExercise[] = [
  {
    id: 'lib-1',
    name: 'Walking / Daily Steps',
    target: '20-30 min',
    durationMinutes: 20,
    category: 'Cardio',
    difficulty: 'Beginner',
    completed: false,
    instructions: [
      'Maintain an upright, relaxed posture with shoulders back and down.',
      'Walk at a steady, comfortable conversational pace.',
      'Let your arms swing naturally in rhythm with your strides.',
      'Can be done around campus, office hallways, neighborhood, or treadmill.'
    ],
    helpsWith: ['Daily baseline calorie burn', 'Cardiovascular endurance', 'Mental clarity & stress reduction', 'Joint lubrication'],
    muscles: ['Calves', 'Quadriceps', 'Hamstrings', 'Glutes'],
    effortCalories: '~80-120 kcal',
    safetyTips: 'Wear comfortable walking shoes and stay hydrated.'
  },
  {
    id: 'lib-2',
    name: 'Brisk Walking',
    target: '15-20 min',
    durationMinutes: 15,
    category: 'Cardio',
    difficulty: 'Beginner',
    completed: false,
    instructions: [
      'Pick up your walking pace so your breathing rate slightly elevates.',
      'Land gently from heel to toe with each stride.',
      'Keep your core lightly engaged and eyes forward.',
      'A great 15-minute quick cardio booster between study/work sessions.'
    ],
    helpsWith: ['Aerobic heart fitness', 'Metabolic rate stimulation', 'Post-meal glucose management', 'Energy enhancement'],
    muscles: ['Lower Body', 'Calf Muscles', 'Shin Muscles', 'Core'],
    effortCalories: '~90-130 kcal',
    safetyTips: 'Breathe evenly through nose and mouth.'
  },
  {
    id: 'lib-3',
    name: 'Light Jogging',
    target: '10-15 min',
    durationMinutes: 10,
    category: 'Cardio',
    difficulty: 'Intermediate',
    completed: false,
    instructions: [
      'Start with a 2-minute easy warm-up walk.',
      'Transition into an easy, low-impact jog.',
      'Keep strides short and land softly under your body.',
      'Cool down with 2 minutes of relaxed walking.'
    ],
    helpsWith: ['Cardiovascular stamina', 'Leg muscle endurance', 'Bone density support', 'Endorphin release'],
    muscles: ['Quadriceps', 'Hamstrings', 'Calves', 'Core Stabilizers'],
    effortCalories: '~100-150 kcal',
    safetyTips: 'Avoid overstriding; keep footsteps light and quiet.'
  },
  {
    id: 'lib-4',
    name: 'Bodyweight Squats',
    target: '3 sets × 10 reps',
    durationMinutes: 6,
    category: 'Strength',
    difficulty: 'Beginner',
    completed: false,
    instructions: [
      'Stand with feet about shoulder-width apart, toes pointing slightly outward.',
      'Lower your hips back and down as if sitting in an invisible sturdy chair.',
      'Keep your chest proud and spine neutral; ensure knees track over your toes.',
      'Drive through your whole foot to stand back up and squeeze your glutes.'
    ],
    helpsWith: ['Lower-body functional strength', 'Hip and ankle mobility', 'Everyday stamina for climbing stairs', 'Core stabilization'],
    muscles: ['Quadriceps', 'Gluteus Maximus', 'Hamstrings', 'Core'],
    effortCalories: '~45-60 kcal',
    safetyTips: 'Keep your heels firmly on the floor. Only descend to a comfortable depth.'
  },
  {
    id: 'lib-5',
    name: 'Walking Lunges',
    target: '2 sets × 8 reps per leg',
    durationMinutes: 6,
    category: 'Strength',
    difficulty: 'Beginner',
    completed: false,
    instructions: [
      'Take a comfortable stride forward with your right leg.',
      'Lower your hips until both knees form approximately 90-degree angles.',
      'Push through your front heel to step forward into the next lunge.',
      'Alternate legs smoothly.'
    ],
    helpsWith: ['Single-leg balance & symmetry', 'Glute and quad activation', 'Hip flexor mobility', 'Functional stride power'],
    muscles: ['Glutes', 'Quadriceps', 'Hamstrings', 'Calves'],
    effortCalories: '~40-55 kcal',
    safetyTips: 'Do not let your front knee drift excessively past your toes; keep torso upright.'
  },
  {
    id: 'lib-6',
    name: 'Standard Push-ups',
    target: '2 sets × 8 reps',
    durationMinutes: 5,
    category: 'Strength',
    difficulty: 'Beginner',
    completed: false,
    instructions: [
      'Place your palms flat on the floor slightly wider than shoulder-width.',
      'Form a straight plank line from your head down to your heels.',
      'Lower your chest toward the floor by bending elbows to about 45 degrees.',
      'Press the floor away to return to the top position.'
    ],
    helpsWith: ['Upper-body pressing strength', 'Chest, shoulder & tricep tone', 'Core bracing power', 'Desk posture counteraction'],
    muscles: ['Pectorals (Chest)', 'Triceps', 'Anterior Deltoids', 'Abdominals'],
    effortCalories: '~30-45 kcal',
    safetyTips: 'Avoid letting your lower back sag. Drop to knees or incline if needed.'
  },
  {
    id: 'lib-7',
    name: 'Wall Push-ups',
    target: '3 sets × 12 reps',
    durationMinutes: 4,
    category: 'Strength',
    difficulty: 'Beginner',
    completed: false,
    instructions: [
      'Stand facing a sturdy wall about an arm’s length away.',
      'Place your hands on the wall at shoulder height and width.',
      'Bend your elbows to bring your chest toward the wall with control.',
      'Push back to the starting position.'
    ],
    helpsWith: ['Zero-barrier upper-body activation', 'Gentle shoulder conditioning', 'Wrist and elbow joint comfort', 'Beginner strength progression'],
    muscles: ['Chest', 'Front Shoulders', 'Triceps'],
    effortCalories: '~20-30 kcal',
    safetyTips: 'Great low-impact option for office or study breaks without getting on the floor.'
  },
  {
    id: 'lib-8',
    name: 'Forearm Plank',
    target: '3 sets × 20 sec',
    durationMinutes: 4,
    category: 'Core',
    difficulty: 'Beginner',
    completed: false,
    instructions: [
      'Rest on your forearms with elbows placed directly below your shoulders.',
      'Extend both legs straight back on toes.',
      'Keep your body in a straight line without letting your hips sag or rise too high.',
      'Breathe smoothly and hold tension through your midsection.'
    ],
    helpsWith: ['Deep core stabilization', 'Lower back support', 'Spinal alignment', 'Posture improvement for desk workers'],
    muscles: ['Transverse Abdominis', 'Rectus Abdominis', 'Obliques', 'Glutes'],
    effortCalories: '~25-35 kcal',
    safetyTips: 'If lower back pinches, rest knees on the mat for a supported plank.'
  },
  {
    id: 'lib-9',
    name: 'Jumping Jacks',
    target: '3 sets × 30 sec',
    durationMinutes: 4,
    category: 'Cardio',
    difficulty: 'Beginner',
    completed: false,
    instructions: [
      'Stand upright with feet together and arms at your sides.',
      'Jump feet out to the sides while raising arms overhead.',
      'Jump back to the starting position with soft knees.',
      'Repeat in a continuous, springy rhythm.'
    ],
    helpsWith: ['Quick cardio stimulation', 'Lymphatic circulation', 'Coordination & agility', 'Rapid alertness boost'],
    muscles: ['Full Body', 'Calves', 'Shoulders', 'Cardiovascular System'],
    effortCalories: '~40-60 kcal',
    safetyTips: 'Land softly on the balls of your feet to protect your joints.'
  },
  {
    id: 'lib-10',
    name: 'Full Body Stretching',
    target: '5-8 min',
    durationMinutes: 6,
    category: 'Mobility',
    difficulty: 'Beginner',
    completed: false,
    instructions: [
      'Perform gentle standing side reaches and chest openers.',
      'Reach toward your toes for a comfortable hamstring stretch.',
      'Hold each gentle stretch for 15-20 seconds.',
      'Breathe deeply into tight areas.'
    ],
    helpsWith: ['Muscle tension release', 'Flexibility maintenance', 'Post-workout recovery', 'Relaxation & mental calm'],
    muscles: ['Hamstrings', 'Lats', 'Chest', 'Calves', 'Lower Back'],
    effortCalories: '~20-30 kcal',
    safetyTips: 'Never bounce or stretch into sharp pain; aim for a pleasant, mild pull.'
  },
  {
    id: 'lib-11',
    name: 'Shoulder Mobility & Arm Circles',
    target: '3-5 min',
    durationMinutes: 4,
    category: 'Mobility',
    difficulty: 'Beginner',
    completed: false,
    instructions: [
      'Extend arms straight out to your sides at shoulder height.',
      'Make small, controlled forward circles for 30 seconds, then reverse.',
      'Finish with gentle shoulder shrugs and neck rotations.',
      'Keep your core still while isolating the shoulder joints.'
    ],
    helpsWith: ['Alleviating desk & screen posture stiffness', 'Shoulder joint lubrication', 'Upper back circulation', 'Headache prevention'],
    muscles: ['Deltoids', 'Trapezius', 'Rotator Cuff', 'Upper Back'],
    effortCalories: '~15-25 kcal',
    safetyTips: 'Keep movements smooth and controlled without shrugging ears to shoulders.'
  },
  {
    id: 'lib-12',
    name: 'Glute Bridges',
    target: '3 sets × 12 reps',
    durationMinutes: 5,
    category: 'Strength',
    difficulty: 'Beginner',
    completed: false,
    instructions: [
      'Lie flat on your back with knees bent and feet flat on the floor, hip-width apart.',
      'Press down through your heels to lift your hips toward the ceiling.',
      'Squeeze your glutes firmly at the top for 1 second.',
      'Lower your hips back down with control.'
    ],
    helpsWith: ['Activating glutes after prolonged sitting', 'Strengthening lower back and hamstrings', 'Hip extension mobility', 'Pelvic stability'],
    muscles: ['Gluteus Maximus', 'Hamstrings', 'Lower Back', 'Core'],
    effortCalories: '~30-40 kcal',
    safetyTips: 'Avoid over-arching your lower back at the top; lift primarily from the hips.'
  }
];

export const FitnessPage: React.FC = () => {
  const { user, dailyExercises, toggleExerciseComplete, completeExercise, resetDailyExercises, t } = useApp();
  const navigate = useNavigate();

  const [selectedExercise, setSelectedExercise] = useState<DailyExercise | null>(null);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Cardio' | 'Strength' | 'Mobility' | 'Core'>('All');

  const totalExercises = dailyExercises.length;
  const completedCount = dailyExercises.filter(e => e.completed).length;
  const progressPct = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;
  
  // Calculate estimated active minutes & calories from completed
  const completedMinutes = dailyExercises
    .filter(e => e.completed)
    .reduce((sum, e) => sum + (e.durationMinutes || 5), 0);
  const estimatedCalories = Math.round(completedMinutes * 4.5);

  const filteredLibrary = activeCategory === 'All' 
    ? EXERCISE_LIBRARY 
    : EXERCISE_LIBRARY.filter(e => e.category === activeCategory);

  return (
    <div className="space-y-6 animate-fade-in text-slate-100 pb-12">
      {/* Top Header with Back Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/home')}
            className="p-2.5 rounded-xl bg-slate-900 border border-emerald-900/50 hover:border-emerald-500/50 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="mint" icon={<Activity className="w-3.5 h-3.5" />}>
                Daily Movement &amp; Fitness
              </Badge>
              <span className="text-[11px] text-emerald-400 font-semibold hidden sm:inline">
                {user.activityLevel} Focus
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
              FITNESS &amp; DAILY MOVEMENT
            </h1>
            <p className="text-xs text-slate-400">
              Simple, daily bodyweight exercises &amp; routines for energy, consistency, and metabolic health.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={resetDailyExercises}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Reset Routine
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/home')}
            className="text-xs"
          >
            Back to Home
          </Button>
        </div>
      </div>

      {/* 1. TODAY'S FITNESS GOAL & PROGRESS HERO CARD */}
      <Card glow className="p-6 space-y-5 bg-gradient-to-br from-slate-950 via-emerald-950/40 to-slate-900 border border-emerald-500/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              Today's Movement Goal
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {completedCount} / {totalExercises} Completed
            </h2>
            <p className="text-xs text-slate-300">
              {progressPct === 100 
                ? '🎉 Incredible job! You completed all daily movement goals for today!'
                : progressPct >= 60
                ? '🔥 Great momentum! Keep moving to complete your baseline consistency.'
                : '⚡ Get started with a 5-minute walk or gentle stretch to build daily habit.'}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-emerald-900/50">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Progress</span>
              <span className="text-2xl font-black text-emerald-400">{progressPct}%</span>
            </div>
            <div className="h-8 w-px bg-emerald-900/60" />
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Time</span>
              <span className="text-xl font-bold text-teal-300">{completedMinutes} min</span>
            </div>
            <div className="h-8 w-px bg-emerald-900/60" />
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Burn</span>
              <span className="text-xl font-bold text-amber-300">~{estimatedCalories} kcal</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-300">{progressPct}% Daily Movement Goal</span>
            <span className="text-emerald-400">{completedCount} of {totalExercises} Done</span>
          </div>
          <div className="h-3 rounded-full bg-slate-950 overflow-hidden p-0.5 border border-emerald-900/60 shadow-inner">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-500 shadow-md shadow-emerald-500/30"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </Card>

      {/* 2. TODAY'S DAILY EXERCISE CHECKLIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" />
            Today's Exercises
          </h3>
          <span className="text-xs text-slate-400">Click exercise to view instructions &amp; guidance</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dailyExercises.map((exercise, idx) => (
            <div
              key={exercise.id}
              className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer group ${
                exercise.completed
                  ? 'bg-emerald-950/40 border-emerald-800/50 shadow-xs'
                  : 'bg-slate-900/90 border-slate-800 hover:border-emerald-600/40'
              }`}
              onClick={() => setSelectedExercise(exercise)}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExerciseComplete(exercise.id);
                  }}
                  className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                    exercise.completed
                      ? 'text-emerald-400 bg-emerald-900/60 hover:scale-110'
                      : 'text-slate-500 hover:text-emerald-400 hover:bg-slate-800'
                  }`}
                  title={exercise.completed ? 'Mark pending' : 'Mark complete'}
                >
                  {exercise.completed ? (
                    <CheckCircle2 className="w-6 h-6 fill-emerald-500 text-slate-950" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                    <p className={`text-sm font-bold truncate ${exercise.completed ? 'text-emerald-200 line-through' : 'text-white group-hover:text-emerald-300'}`}>
                      {exercise.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span className="text-amber-300 font-semibold">{exercise.target}</span>
                    <span>•</span>
                    <span>{exercise.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={exercise.completed ? 'mint' : 'slate'}>
                  {exercise.completed ? 'Done' : 'Pending'}
                </Badge>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. BEGINNER EXERCISE LIBRARY */}
      <div className="space-y-4 pt-4 border-t border-emerald-900/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-teal-400" />
              Beginner Exercise Library
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Practical movement library designed for quick study breaks, hostel rooms, or home routines.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(['All', 'Cardio', 'Strength', 'Mobility', 'Core'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Library Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLibrary.map((item) => (
            <Card
              key={item.id}
              className="p-4 space-y-3 bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer group flex flex-col justify-between"
              onClick={() => setSelectedExercise(item)}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="mint">{item.category}</Badge>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    {item.difficulty}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {item.helpsWith.join(' • ')}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-amber-300 font-bold">{item.target}</span>
                <span className="text-emerald-400 font-semibold group-hover:underline flex items-center gap-1">
                  View Guide <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 4. EXERCISE DEMONSTRATION VIDEO MODAL */}
      <ExerciseVideoModal
        isOpen={!!selectedExercise}
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
        onMarkComplete={(id) => {
          completeExercise(id);
          setSelectedExercise(null);
        }}
      />
    </div>
  );
};
