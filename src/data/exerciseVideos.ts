export interface ExerciseVideoInfo {
  id: string;
  name: string;
  target?: string;
  category?: string;
  difficulty?: string;
  duration?: string;
  videoUrl: string;
  fallbackUrls?: string[];
  helpsWith: string[];
  instructions: string[];
  muscles: string[];
  effortCalories?: string;
  safetyTips?: string;
}

export const EXERCISE_VIDEO_MAP: Record<string, ExerciseVideoInfo> = {
  'Bodyweight Squats': {
    id: 'vid-squats',
    name: 'Bodyweight Squats',
    target: '3 sets × 10 reps',
    category: 'Strength',
    difficulty: 'Beginner',
    duration: '0:08',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/5/5c/Squat_-_exercise_demonstration_video.webm/Squat_-_exercise_demonstration_video.webm.480p.vp9.webm',
    fallbackUrls: [
      'https://upload.wikimedia.org/wikipedia/commons/5/5c/Squat_-_exercise_demonstration_video.webm',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    ],
    helpsWith: [
      'Lower-body functional strength',
      'Hip and ankle mobility',
      'Core stabilization and balance',
      'Everyday stamina for climbing stairs'
    ],
    instructions: [
      'Stand with feet about shoulder-width apart, toes pointing slightly outward.',
      'Keep your chest tall, gaze forward, and engage your core.',
      'Hinge hips back and bend knees as if sitting down into an invisible sturdy chair.',
      'Lower until thighs are roughly parallel to the floor, ensuring knees track over toes.',
      'Drive through your heels to return to standing, squeezing glutes at top.'
    ],
    muscles: ['Quadriceps', 'Gluteus Maximus', 'Hamstrings', 'Core'],
    effortCalories: '~45-60 kcal',
    safetyTips: 'Keep your heels firmly on the floor. Only descend to a comfortable depth without rounding your back.'
  },

  'Walking / Brisk Walk': {
    id: 'vid-walking-brisk',
    name: 'Walking / Brisk Walk',
    target: '20 min',
    category: 'Cardio',
    difficulty: 'Beginner',
    duration: '2:04',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/2/2e/Fit_walking.webmhd.webm/Fit_walking.webmhd.webm.480p.vp9.webm',
    fallbackUrls: [
      'https://upload.wikimedia.org/wikipedia/commons/2/2e/Fit_walking.webmhd.webm',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
    ],
    helpsWith: [
      'Cardiovascular activity and endurance',
      'Daily baseline energy and metabolic stimulation',
      'Post-meal blood glucose regulation',
      'Joint lubrication and mental clarity'
    ],
    instructions: [
      'Stand tall with relaxed shoulders, eyes forward, and spine elongated.',
      'Step forward with a natural stride, landing gently heel-to-toe.',
      'Let your arms swing naturally in rhythmic opposition to your legs.',
      'Maintain a steady, brisk conversational pace for aerobic benefits.'
    ],
    muscles: ['Calves', 'Hamstrings', 'Quadriceps', 'Glutes'],
    effortCalories: '~80-110 kcal',
    safetyTips: 'Wear supportive shoes, maintain steady hydration, and keep breathing rhythmic.'
  },

  'Walking / Daily Steps': {
    id: 'vid-walking-steps',
    name: 'Walking / Daily Steps',
    target: '20-30 min',
    category: 'Cardio',
    difficulty: 'Beginner',
    duration: '2:04',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/2/2e/Fit_walking.webmhd.webm/Fit_walking.webmhd.webm.480p.vp9.webm',
    fallbackUrls: [
      'https://upload.wikimedia.org/wikipedia/commons/2/2e/Fit_walking.webmhd.webm',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
    ],
    helpsWith: [
      'Daily baseline calorie burn',
      'Cardiovascular endurance',
      'Mental clarity & stress reduction',
      'Joint lubrication'
    ],
    instructions: [
      'Maintain an upright, relaxed posture with shoulders back and down.',
      'Walk at a steady, comfortable conversational pace.',
      'Let your arms swing naturally in rhythm with your strides.',
      'Can be done around campus, office hallways, neighborhood, or treadmill.'
    ],
    muscles: ['Calves', 'Quadriceps', 'Hamstrings', 'Glutes'],
    effortCalories: '~80-120 kcal',
    safetyTips: 'Wear comfortable walking shoes and stay hydrated.'
  },

  'Brisk Walking': {
    id: 'vid-brisk-walking',
    name: 'Brisk Walking',
    target: '15-20 min',
    category: 'Cardio',
    difficulty: 'Beginner',
    duration: '2:04',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/2/2e/Fit_walking.webmhd.webm/Fit_walking.webmhd.webm.480p.vp9.webm',
    fallbackUrls: [
      'https://upload.wikimedia.org/wikipedia/commons/2/2e/Fit_walking.webmhd.webm',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
    ],
    helpsWith: [
      'Aerobic heart fitness',
      'Metabolic rate stimulation',
      'Post-meal glucose management',
      'Energy enhancement'
    ],
    instructions: [
      'Pick up your walking pace so your breathing rate slightly elevates.',
      'Land gently from heel to toe with each stride.',
      'Keep your core lightly engaged and eyes forward.',
      'A great 15-minute quick cardio booster between study/work sessions.'
    ],
    muscles: ['Lower Body', 'Calf Muscles', 'Shin Muscles', 'Core'],
    effortCalories: '~90-130 kcal',
    safetyTips: 'Breathe evenly through nose and mouth.'
  },

  'Push-ups / Wall Push-ups': {
    id: 'vid-pushups-wall',
    name: 'Push-ups / Wall Push-ups',
    target: '2 sets × 8 reps',
    category: 'Strength',
    difficulty: 'Beginner',
    duration: '0:15',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/e/eb/Half_rack_resistance_exercise_workout.webm/Half_rack_resistance_exercise_workout.webm.480p.vp9.webm',
    fallbackUrls: [
      'https://upload.wikimedia.org/wikipedia/commons/3/39/Burpee.webm',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
    ],
    helpsWith: [
      'Upper-body pressing power',
      'Chest, shoulder & tricep endurance',
      'Core bracing stability',
      'Desk posture counteraction'
    ],
    instructions: [
      'Place hands slightly wider than shoulder-width apart on the floor or against a wall.',
      'Keep your body in a straight line from head to heels.',
      'Lower your chest with control, keeping elbows at a ~45-degree angle.',
      'Push back to the start position while engaging your core.'
    ],
    muscles: ['Pectorals (Chest)', 'Triceps', 'Anterior Deltoids', 'Core'],
    effortCalories: '~30-45 kcal',
    safetyTips: 'Start with wall or incline push-ups if standard floor push-ups feel too challenging.'
  },

  'Standard Push-ups': {
    id: 'vid-pushups-std',
    name: 'Standard Push-ups',
    target: '2 sets × 8 reps',
    category: 'Strength',
    difficulty: 'Beginner',
    duration: '0:15',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/e/eb/Half_rack_resistance_exercise_workout.webm/Half_rack_resistance_exercise_workout.webm.480p.vp9.webm',
    fallbackUrls: [
      'https://upload.wikimedia.org/wikipedia/commons/3/39/Burpee.webm',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
    ],
    helpsWith: [
      'Upper-body pressing strength',
      'Chest, shoulder & tricep tone',
      'Core bracing power',
      'Desk posture counteraction'
    ],
    instructions: [
      'Place your palms flat on the floor slightly wider than shoulder-width.',
      'Form a straight plank line from your head down to your heels.',
      'Lower your chest toward the floor by bending elbows to about 45 degrees.',
      'Press the floor away to return to the top position.'
    ],
    muscles: ['Pectorals (Chest)', 'Triceps', 'Anterior Deltoids', 'Abdominals'],
    effortCalories: '~30-45 kcal',
    safetyTips: 'Avoid letting your lower back sag. Drop to knees or incline if needed.'
  },

  'Wall Push-ups': {
    id: 'vid-wall-pushups',
    name: 'Wall Push-ups',
    target: '3 sets × 12 reps',
    category: 'Strength',
    difficulty: 'Beginner',
    duration: '0:20',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/e/eb/Half_rack_resistance_exercise_workout.webm/Half_rack_resistance_exercise_workout.webm.480p.vp9.webm',
    fallbackUrls: [
      'https://upload.wikimedia.org/wikipedia/commons/3/39/Burpee.webm',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
    ],
    helpsWith: [
      'Zero-barrier upper-body activation',
      'Gentle shoulder conditioning',
      'Wrist and elbow joint comfort',
      'Beginner strength progression'
    ],
    instructions: [
      'Stand facing a sturdy wall about an arm’s length away.',
      'Place your hands on the wall at shoulder height and width.',
      'Bend your elbows to bring your chest toward the wall with control.',
      'Push back to the starting position.'
    ],
    muscles: ['Chest', 'Front Shoulders', 'Triceps'],
    effortCalories: '~20-30 kcal',
    safetyTips: 'Great low-impact option for office or study breaks without getting on the floor.'
  },

  'Forearm Plank': {
    id: 'vid-plank',
    name: 'Forearm Plank',
    target: '3 sets × 20 sec',
    category: 'Core',
    difficulty: 'Beginner',
    duration: '0:20',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/34/CrossFit_Burpee.webm/CrossFit_Burpee.webm.480p.vp9.webm',
    fallbackUrls: [
      'https://upload.wikimedia.org/wikipedia/commons/3/34/CrossFit_Burpee.webm',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
    ],
    helpsWith: [
      'Deep core endurance',
      'Spine stabilization',
      'Lower back support',
      'Posture alignment for desk workers'
    ],
    instructions: [
      'Rest on your forearms with elbows directly under shoulders.',
      'Extend legs straight behind you, balancing on toes.',
      'Keep hips level with spine — avoid sagging or arching high.',
      'Breathe steadily and hold for 20 seconds.'
    ],
    muscles: ['Transverse Abdominis', 'Rectus Abdominis', 'Obliques', 'Glutes'],
    effortCalories: '~25-35 kcal',
    safetyTips: 'Breathe normally; drop knees if lower back feels strained.'
  },

  'Full Body Stretching & Mobility': {
    id: 'vid-full-body-stretch-mob',
    name: 'Full Body Stretching & Mobility',
    target: '5 min',
    category: 'Mobility',
    difficulty: 'Beginner',
    duration: '0:30',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f5/30_Minutes_Alternating_Half_Snatch_-_Half_Marathon.webm/30_Minutes_Alternating_Half_Snatch_-_Half_Marathon.webm.480p.vp9.webm',
    fallbackUrls: [
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/2/2e/Fit_walking.webmhd.webm/Fit_walking.webmhd.webm.480p.vp9.webm',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
    ],
    helpsWith: [
      'Relieving desk stiffness',
      'Flexibility & circulation',
      'Muscle relaxation',
      'Mental reset and calm'
    ],
    instructions: [
      'Perform gentle neck rolls, shoulder shrugs, and arm circles.',
      'Do seated or standing hamstring stretches and side torso reaches.',
      'Hold each gentle stretch for 15-20 seconds without bouncing.',
      'Focus on deep, relaxing diaphragmatic breathing.'
    ],
    muscles: ['Hamstrings', 'Trapezius', 'Lats', 'Hip Flexors', 'Chest'],
    effortCalories: '~20-30 kcal',
    safetyTips: 'Move smoothly into stretches; never force painful ranges.'
  },

  'Full Body Stretching': {
    id: 'vid-full-body-stretch',
    name: 'Full Body Stretching',
    target: '5-8 min',
    category: 'Mobility',
    difficulty: 'Beginner',
    duration: '0:30',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f5/30_Minutes_Alternating_Half_Snatch_-_Half_Marathon.webm/30_Minutes_Alternating_Half_Snatch_-_Half_Marathon.webm.480p.vp9.webm',
    fallbackUrls: [
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/2/2e/Fit_walking.webmhd.webm/Fit_walking.webmhd.webm.480p.vp9.webm',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
    ],
    helpsWith: [
      'Muscle tension release',
      'Flexibility maintenance',
      'Post-workout recovery',
      'Relaxation & mental calm'
    ],
    instructions: [
      'Perform gentle standing side reaches and chest openers.',
      'Reach toward your toes for a comfortable hamstring stretch.',
      'Hold each gentle stretch for 15-20 seconds.',
      'Breathe deeply into tight areas.'
    ],
    muscles: ['Hamstrings', 'Lats', 'Chest', 'Calves', 'Lower Back'],
    effortCalories: '~20-30 kcal',
    safetyTips: 'Never bounce or stretch into sharp pain; aim for a pleasant, mild pull.'
  },

  'Light Jogging': {
    id: 'vid-light-jogging',
    name: 'Light Jogging',
    target: '10-15 min',
    category: 'Cardio',
    difficulty: 'Intermediate',
    duration: '0:45',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/2/2e/Fit_walking.webmhd.webm/Fit_walking.webmhd.webm.480p.vp9.webm',
    fallbackUrls: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4'
    ],
    helpsWith: [
      'Cardiovascular stamina',
      'Leg muscle endurance',
      'Bone density support',
      'Endorphin release'
    ],
    instructions: [
      'Start with a 2-minute easy warm-up walk.',
      'Transition into an easy, low-impact jog.',
      'Keep strides short and land softly under your body.',
      'Cool down with 2 minutes of relaxed walking.'
    ],
    muscles: ['Quadriceps', 'Hamstrings', 'Calves', 'Core Stabilizers'],
    effortCalories: '~100-150 kcal',
    safetyTips: 'Avoid overstriding; keep footsteps light and quiet.'
  },

  'Walking Lunges': {
    id: 'vid-walking-lunges',
    name: 'Walking Lunges',
    target: '2 sets × 8 reps per leg',
    category: 'Strength',
    difficulty: 'Beginner',
    duration: '0:25',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/5/5c/Squat_-_exercise_demonstration_video.webm/Squat_-_exercise_demonstration_video.webm.480p.vp9.webm',
    fallbackUrls: [
      'https://upload.wikimedia.org/wikipedia/commons/3/34/CrossFit_Burpee.webm',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    ],
    helpsWith: [
      'Single-leg balance & symmetry',
      'Glute and quad activation',
      'Hip flexor mobility',
      'Functional stride power'
    ],
    instructions: [
      'Take a comfortable stride forward with your right leg.',
      'Lower your hips until both knees form approximately 90-degree angles.',
      'Push through your front heel to step forward into the next lunge.',
      'Alternate legs smoothly.'
    ],
    muscles: ['Glutes', 'Quadriceps', 'Hamstrings', 'Calves'],
    effortCalories: '~40-55 kcal',
    safetyTips: 'Do not let your front knee drift excessively past your toes; keep torso upright.'
  },

  'Jumping Jacks': {
    id: 'vid-jumping-jacks',
    name: 'Jumping Jacks',
    target: '3 sets × 30 sec',
    category: 'Cardio',
    difficulty: 'Beginner',
    duration: '0:13',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Burpee.webm',
    fallbackUrls: [
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/39/Burpee.webm/Burpee.webm.480p.vp9.webm',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
    ],
    helpsWith: [
      'Quick cardio stimulation',
      'Lymphatic circulation',
      'Coordination & agility',
      'Rapid alertness boost'
    ],
    instructions: [
      'Stand upright with feet together and arms at your sides.',
      'Jump feet out to the sides while raising arms overhead.',
      'Jump back to the starting position with soft knees.',
      'Repeat in a continuous, springy rhythm.'
    ],
    muscles: ['Full Body', 'Calves', 'Shoulders', 'Cardiovascular System'],
    effortCalories: '~40-60 kcal',
    safetyTips: 'Land softly on the balls of your feet to protect your joints.'
  },

  'Shoulder Mobility & Arm Circles': {
    id: 'vid-shoulder-mobility',
    name: 'Shoulder Mobility & Arm Circles',
    target: '3-5 min',
    category: 'Mobility',
    difficulty: 'Beginner',
    duration: '0:30',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f5/30_Minutes_Alternating_Half_Snatch_-_Half_Marathon.webm/30_Minutes_Alternating_Half_Snatch_-_Half_Marathon.webm.480p.vp9.webm',
    fallbackUrls: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
    ],
    helpsWith: [
      'Alleviating desk & screen posture stiffness',
      'Shoulder joint lubrication',
      'Upper back circulation',
      'Headache prevention'
    ],
    instructions: [
      'Extend arms straight out to your sides at shoulder height.',
      'Make small, controlled forward circles for 30 seconds, then reverse.',
      'Finish with gentle shoulder shrugs and neck rotations.',
      'Keep your core still while isolating the shoulder joints.'
    ],
    muscles: ['Deltoids', 'Trapezius', 'Rotator Cuff', 'Upper Back'],
    effortCalories: '~15-25 kcal',
    safetyTips: 'Keep movements smooth and controlled without shrugging ears to shoulders.'
  },

  'Glute Bridges': {
    id: 'vid-glute-bridges',
    name: 'Glute Bridges',
    target: '3 sets × 12 reps',
    category: 'Strength',
    difficulty: 'Beginner',
    duration: '0:20',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/5/5c/Squat_-_exercise_demonstration_video.webm/Squat_-_exercise_demonstration_video.webm.480p.vp9.webm',
    fallbackUrls: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
    ],
    helpsWith: [
      'Activating glutes after prolonged sitting',
      'Strengthening lower back and hamstrings',
      'Hip extension mobility',
      'Pelvic stability'
    ],
    instructions: [
      'Lie flat on your back with knees bent and feet flat on the floor, hip-width apart.',
      'Press down through your heels to lift your hips toward the ceiling.',
      'Squeeze your glutes firmly at the top for 1 second.',
      'Lower your hips back down with control.'
    ],
    muscles: ['Gluteus Maximus', 'Hamstrings', 'Lower Back', 'Core'],
    effortCalories: '~30-40 kcal',
    safetyTips: 'Avoid over-arching your lower back at the top; lift primarily from the hips.'
  }
};

export const getExerciseVideoInfo = (nameOrId: string): ExerciseVideoInfo => {
  if (EXERCISE_VIDEO_MAP[nameOrId]) {
    return EXERCISE_VIDEO_MAP[nameOrId];
  }

  // Case-insensitive or partial match fallback
  const normalized = (nameOrId || '').toLowerCase().trim();
  const matchedKey = Object.keys(EXERCISE_VIDEO_MAP).find(k => {
    const kNorm = k.toLowerCase();
    return kNorm === normalized || kNorm.includes(normalized) || normalized.includes(kNorm);
  });

  if (matchedKey && EXERCISE_VIDEO_MAP[matchedKey]) {
    return EXERCISE_VIDEO_MAP[matchedKey];
  }

  // Universal graceful fallback with clean defaults
  return {
    id: `vid-${normalized.replace(/[^a-z0-9]/g, '-') || 'custom'}`,
    name: nameOrId || 'Daily Exercise',
    target: 'Daily Routine',
    category: 'Strength',
    difficulty: 'Beginner',
    duration: '0:30',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/5/5c/Squat_-_exercise_demonstration_video.webm/Squat_-_exercise_demonstration_video.webm.480p.vp9.webm',
    fallbackUrls: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    ],
    helpsWith: [
      'Functional movement consistency',
      'Joint mobility and posture',
      'Daily energy and physical health'
    ],
    instructions: [
      'Stand in a balanced, comfortable posture with feet stable.',
      'Engage your core lightly and keep shoulders relaxed.',
      'Perform each repetition smoothly with controlled breathing.',
      'Maintain steady form throughout all repetitions.'
    ],
    muscles: ['Core', 'Full Body'],
    effortCalories: '~30-50 kcal',
    safetyTips: 'Perform at your own pace and maintain steady breathing.'
  };
};
