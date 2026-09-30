import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, Plus, Minus, Crosshair, Flag, 
  Camera, Utensils, Target, Flame, LineChart, 
  Stethoscope, ChevronLeft, ArrowRight, Sparkles, 
  Navigation, RotateCcw, CheckCircle2, Shield
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

interface JourneyMapProps {
  onContinue: () => void;
  onBack: () => void;
}

// 2400 x 1400 Virtual World Coordinate System
const WORLD_WIDTH = 2400;
const WORLD_HEIGHT = 1400;

// The exact SVG path for the continuous primary highway
const ROUTE_PATH_D = "M 240 1080 C 320 1020, 420 890, 580 800 C 700 730, 770 540, 890 470 C 1000 410, 1100 660, 1230 740 C 1350 820, 1450 780, 1550 670 C 1640 570, 1730 450, 1840 410 C 1930 380, 2010 630, 2100 710 C 2180 780, 2260 520, 2240 330";

// Milestone and stop metadata
interface Milestone {
  id: string;
  numberStr: string;
  title: string;
  subtitle: string;
  x: number;
  y: number;
  icon: React.ReactNode;
  tags: string[];
  district: string;
}

const MILESTONES: Milestone[] = [
  {
    id: 'stop-1',
    numberStr: '01',
    title: 'KNOW YOUR FOOD',
    subtitle: "Scan meals and understand what you're eating.",
    x: 580,
    y: 800,
    icon: <Camera className="w-4 h-4 text-emerald-300" />,
    tags: ['AI Vision Scanner', 'Instant Analysis', 'Plate Breakdown'],
    district: 'FOOD INTELLIGENCE',
  },
  {
    id: 'stop-2',
    numberStr: '02',
    title: 'UNDERSTAND YOUR NUTRITION',
    subtitle: 'Understand calories, macros and key nutrients.',
    x: 890,
    y: 470,
    icon: <Utensils className="w-4 h-4 text-teal-300" />,
    tags: ['Protein Target', 'Carbs & Fats', 'Fiber & Micros'],
    district: 'NUTRITION DISTRICT',
  },
  {
    id: 'stop-3',
    numberStr: '03',
    title: 'MAKE SMARTER CHOICES',
    subtitle: 'Choose food based on your goals, preferences and budget.',
    x: 1230,
    y: 740,
    icon: <Target className="w-4 h-4 text-emerald-300" />,
    tags: ['What Should I Eat', 'Plate Builder', 'Smart Swaps'],
    district: 'SMART DECISION HUB',
  },
  {
    id: 'stop-4',
    numberStr: '04',
    title: 'BUILD HEALTHY HABITS',
    subtitle: 'Turn better choices into consistent habits.',
    x: 1550,
    y: 670,
    icon: <Flame className="w-4 h-4 text-cyan-300" />,
    tags: ['Hydration Streaks', 'Meal Timing', 'Daily Actions'],
    district: 'HABIT PARKWAY',
  },
  {
    id: 'stop-5',
    numberStr: '05',
    title: 'TRACK YOUR PROGRESS',
    subtitle: 'Understand your trends and progress.',
    x: 1840,
    y: 410,
    icon: <LineChart className="w-4 h-4 text-indigo-300" />,
    tags: ['Weekly Analytics', 'Health Journal', 'Body Metrics'],
    district: 'PROGRESS VALLEY',
  },
  {
    id: 'stop-6',
    numberStr: '06',
    title: 'PROFESSIONAL CARE',
    subtitle: 'Connect with nutrition professionals when support is needed.',
    x: 2100,
    y: 710,
    icon: <Stethoscope className="w-4 h-4 text-sky-300" />,
    tags: ['Verified Nutritionists', 'Doctor Consults', 'Care Plans'],
    district: 'CARE DISTRICT',
  },
];

// Start & Final Destination coordinates
const START_POS = { x: 240, y: 1080 };
const FINAL_POS = { x: 2240, y: 330 };

// Animation sequence steps:
// 0: Start Pause
// 1: Travel to Stop 1
// 2: Pause at Stop 1
// 3: Travel to Stop 2
// 4: Pause at Stop 2
// 5: Travel to Stop 3
// 6: Pause at Stop 3
// 7: Travel to Stop 4
// 8: Pause at Stop 4
// 9: Travel to Stop 5
// 10: Pause at Stop 5
// 11: Travel to Stop 6
// 12: Pause at Stop 6
// 13: Travel to Final Destination
// 14: Pause at Final Destination
// 15: Zoom out & Complete Route Overview

export const JourneyMap: React.FC<JourneyMapProps> = ({ onContinue, onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [containerSize, setContainerSize] = useState({ width: 1200, height: 700 });
  const [animStep, setAnimStep] = useState<number>(0);
  const [discoveredStops, setDiscoveredStops] = useState<Set<number>>(new Set());
  const [currentDistanceRatio, setCurrentDistanceRatio] = useState<number>(0);
  const [gpsHeading, setGpsHeading] = useState<number>(0);
  const [isOverviewMode, setIsOverviewMode] = useState<boolean>(false);

  // Measure container dimensions for responsive camera transforms
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setContainerSize({
          width: clientWidth || 1200,
          height: clientHeight || 700,
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Compute total length and step target distance ratios along the route
  const [stopRatios, setStopRatios] = useState<number[]>([0, 0.16, 0.32, 0.49, 0.65, 0.81, 0.95, 1.0]);

  useEffect(() => {
    if (pathRef.current) {
      const totalLen = pathRef.current.getTotalLength();
      if (totalLen > 0) {
        const getClosestRatio = (targetX: number, targetY: number) => {
          let bestDist = Infinity;
          let bestRatio = 0;
          const samples = 200;
          for (let i = 0; i <= samples; i++) {
            const ratio = i / samples;
            const pt = pathRef.current!.getPointAtLength(ratio * totalLen);
            const d = Math.hypot(pt.x - targetX, pt.y - targetY);
            if (d < bestDist) {
              bestDist = d;
              bestRatio = ratio;
            }
          }
          return bestRatio;
        };

        const r1 = getClosestRatio(MILESTONES[0].x, MILESTONES[0].y);
        const r2 = getClosestRatio(MILESTONES[1].x, MILESTONES[1].y);
        const r3 = getClosestRatio(MILESTONES[2].x, MILESTONES[2].y);
        const r4 = getClosestRatio(MILESTONES[3].x, MILESTONES[3].y);
        const r5 = getClosestRatio(MILESTONES[4].x, MILESTONES[4].y);
        const r6 = getClosestRatio(MILESTONES[5].x, MILESTONES[5].y);
        setStopRatios([0, r1, r2, r3, r4, r5, r6, 1.0]);
      }
    }
  }, []);

  // Main animation timeline sequencer
  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Timeline step execution:
    if (animStep === 0) {
      // START pause
      setCurrentDistanceRatio(0);
      timer = setTimeout(() => setAnimStep(1), 2000);
    } else if (animStep === 1) {
      // Travel to Stop 1
      const startRatio = stopRatios[0];
      const endRatio = stopRatios[1];
      const duration = 2400;
      const startTime = performance.now();

      const animateTravel = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2;
        const curRatio = startRatio + (endRatio - startRatio) * ease;
        setCurrentDistanceRatio(curRatio);

        if (progress < 1) {
          requestAnimationFrame(animateTravel);
        } else {
          setDiscoveredStops((prev) => new Set([...prev, 0]));
          setAnimStep(2);
        }
      };
      requestAnimationFrame(animateTravel);
    } else if (animStep === 2) {
      // Pause at Stop 1
      timer = setTimeout(() => setAnimStep(3), 2200);
    } else if (animStep === 3) {
      // Travel to Stop 2
      const startRatio = stopRatios[1];
      const endRatio = stopRatios[2];
      const duration = 2400;
      const startTime = performance.now();

      const animateTravel = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2;
        const curRatio = startRatio + (endRatio - startRatio) * ease;
        setCurrentDistanceRatio(curRatio);

        if (progress < 1) {
          requestAnimationFrame(animateTravel);
        } else {
          setDiscoveredStops((prev) => new Set([...prev, 1]));
          setAnimStep(4);
        }
      };
      requestAnimationFrame(animateTravel);
    } else if (animStep === 4) {
      // Pause at Stop 2
      timer = setTimeout(() => setAnimStep(5), 2200);
    } else if (animStep === 5) {
      // Travel to Stop 3
      const startRatio = stopRatios[2];
      const endRatio = stopRatios[3];
      const duration = 2400;
      const startTime = performance.now();

      const animateTravel = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2;
        const curRatio = startRatio + (endRatio - startRatio) * ease;
        setCurrentDistanceRatio(curRatio);

        if (progress < 1) {
          requestAnimationFrame(animateTravel);
        } else {
          setDiscoveredStops((prev) => new Set([...prev, 2]));
          setAnimStep(6);
        }
      };
      requestAnimationFrame(animateTravel);
    } else if (animStep === 6) {
      // Pause at Stop 3
      timer = setTimeout(() => setAnimStep(7), 2200);
    } else if (animStep === 7) {
      // Travel to Stop 4
      const startRatio = stopRatios[3];
      const endRatio = stopRatios[4];
      const duration = 2400;
      const startTime = performance.now();

      const animateTravel = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2;
        const curRatio = startRatio + (endRatio - startRatio) * ease;
        setCurrentDistanceRatio(curRatio);

        if (progress < 1) {
          requestAnimationFrame(animateTravel);
        } else {
          setDiscoveredStops((prev) => new Set([...prev, 3]));
          setAnimStep(8);
        }
      };
      requestAnimationFrame(animateTravel);
    } else if (animStep === 8) {
      // Pause at Stop 4
      timer = setTimeout(() => setAnimStep(9), 2200);
    } else if (animStep === 9) {
      // Travel to Stop 5
      const startRatio = stopRatios[4];
      const endRatio = stopRatios[5];
      const duration = 2400;
      const startTime = performance.now();

      const animateTravel = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2;
        const curRatio = startRatio + (endRatio - startRatio) * ease;
        setCurrentDistanceRatio(curRatio);

        if (progress < 1) {
          requestAnimationFrame(animateTravel);
        } else {
          setDiscoveredStops((prev) => new Set([...prev, 4]));
          setAnimStep(10);
        }
      };
      requestAnimationFrame(animateTravel);
    } else if (animStep === 10) {
      // Pause at Stop 5
      timer = setTimeout(() => setAnimStep(11), 2200);
    } else if (animStep === 11) {
      // Travel to Stop 6
      const startRatio = stopRatios[5];
      const endRatio = stopRatios[6];
      const duration = 2400;
      const startTime = performance.now();

      const animateTravel = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2;
        const curRatio = startRatio + (endRatio - startRatio) * ease;
        setCurrentDistanceRatio(curRatio);

        if (progress < 1) {
          requestAnimationFrame(animateTravel);
        } else {
          setDiscoveredStops((prev) => new Set([...prev, 5]));
          setAnimStep(12);
        }
      };
      requestAnimationFrame(animateTravel);
    } else if (animStep === 12) {
      // Pause at Stop 6
      timer = setTimeout(() => setAnimStep(13), 2200);
    } else if (animStep === 13) {
      // Travel to Final Destination
      const startRatio = stopRatios[6];
      const endRatio = stopRatios[7];
      const duration = 2400;
      const startTime = performance.now();

      const animateTravel = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2;
        const curRatio = startRatio + (endRatio - startRatio) * ease;
        setCurrentDistanceRatio(curRatio);

        if (progress < 1) {
          requestAnimationFrame(animateTravel);
        } else {
          setDiscoveredStops(new Set([0, 1, 2, 3, 4, 5]));
          setAnimStep(14);
        }
      };
      requestAnimationFrame(animateTravel);
    } else if (animStep === 14) {
      // Pause at Final Destination
      timer = setTimeout(() => {
        setIsOverviewMode(true);
        setAnimStep(15);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [animStep, stopRatios]);

  // Restart replay function
  const handleReplay = () => {
    setIsOverviewMode(false);
    setDiscoveredStops(new Set());
    setCurrentDistanceRatio(0);
    setAnimStep(0);
  };

  // Compute current GPS vehicle coordinate and heading angle from SVG path
  let currentPos = { x: START_POS.x, y: START_POS.y };
  if (pathRef.current) {
    const totalLen = pathRef.current.getTotalLength();
    if (totalLen > 0) {
      const distance = currentDistanceRatio * totalLen;
      const p = pathRef.current.getPointAtLength(distance);
      currentPos = { x: p.x, y: p.y };

      // Sample slightly ahead for heading angle
      const forwardDistance = Math.min(distance + 8, totalLen);
      const pNext = pathRef.current.getPointAtLength(forwardDistance);
      const angle = Math.atan2(pNext.y - p.y, pNext.x - p.x) * (180 / Math.PI);
      if (angle !== gpsHeading && Math.abs(angle - gpsHeading) > 1) {
        setGpsHeading(angle);
      }
    }
  }

  // Camera Target and Zoom calculation:
  // When in overview mode (animStep 15), zoom out to fit entire map world
  // When traveling / stopped, focus camera on currentPos with high zoom
  let cameraTargetX = currentPos.x;
  let cameraTargetY = currentPos.y;
  let cameraScale = 1.85;

  if (animStep === 0) {
    // Focused tightly at Start
    cameraTargetX = START_POS.x + 80;
    cameraTargetY = START_POS.y - 40;
    cameraScale = 2.0;
  } else if ([2, 4, 6, 8, 10, 12].includes(animStep)) {
    // Pausing at a milestone: zoom in slightly on the landmark
    const stopIdx = (animStep / 2) - 1;
    if (MILESTONES[stopIdx]) {
      cameraTargetX = MILESTONES[stopIdx].x;
      cameraTargetY = MILESTONES[stopIdx].y;
      cameraScale = 1.95;
    }
  } else if (animStep === 14) {
    // Pausing at final destination
    cameraTargetX = FINAL_POS.x - 80;
    cameraTargetY = FINAL_POS.y + 40;
    cameraScale = 1.95;
  } else if (animStep === 15 || isOverviewMode) {
    // Zoomed out full route overview:
    cameraTargetX = WORLD_WIDTH / 2;
    cameraTargetY = WORLD_HEIGHT / 2;
    // Fit 2400x1400 into container with padding
    const fitScaleX = containerSize.width / (WORLD_WIDTH + 100);
    const fitScaleY = containerSize.height / (WORLD_HEIGHT + 80);
    cameraScale = Math.min(fitScaleX, fitScaleY, 0.85);
  } else {
    // In traveling mode: follow currentPos with smooth zoom
    cameraTargetX = currentPos.x;
    cameraTargetY = currentPos.y;
    cameraScale = 1.65;
  }

  // Camera 2D translation: centers (cameraTargetX, cameraTargetY) in container viewport
  const cameraTranslateX = (containerSize.width / 2) - (cameraTargetX * cameraScale);
  const cameraTranslateY = (containerSize.height / 2) - (cameraTargetY * cameraScale);

  // Active milestone label for top HUD
  let hudMilestoneText = "STARTING POINT";
  let hudMilestoneCount = "00 / 06";
  let activeMilestoneIndex = -1;

  if (animStep === 0) {
    hudMilestoneText = "STARTING POINT";
    hudMilestoneCount = "START";
  } else if (animStep >= 1 && animStep <= 2) {
    hudMilestoneText = "MILESTONE 01 OF 06";
    hudMilestoneCount = "01 / 06";
    activeMilestoneIndex = 0;
  } else if (animStep >= 3 && animStep <= 4) {
    hudMilestoneText = "MILESTONE 02 OF 06";
    hudMilestoneCount = "02 / 06";
    activeMilestoneIndex = 1;
  } else if (animStep >= 5 && animStep <= 6) {
    hudMilestoneText = "MILESTONE 03 OF 06";
    hudMilestoneCount = "03 / 06";
    activeMilestoneIndex = 2;
  } else if (animStep >= 7 && animStep <= 8) {
    hudMilestoneText = "MILESTONE 04 OF 06";
    hudMilestoneCount = "04 / 06";
    activeMilestoneIndex = 3;
  } else if (animStep >= 9 && animStep <= 10) {
    hudMilestoneText = "MILESTONE 05 OF 06";
    hudMilestoneCount = "05 / 06";
    activeMilestoneIndex = 4;
  } else if (animStep >= 11 && animStep <= 12) {
    hudMilestoneText = "MILESTONE 06 OF 06";
    hudMilestoneCount = "06 / 06";
    activeMilestoneIndex = 5;
  } else if (animStep >= 13 && animStep <= 14) {
    hudMilestoneText = "FINAL DESTINATION";
    hudMilestoneCount = "GOAL";
    activeMilestoneIndex = 6;
  } else if (animStep >= 15) {
    hudMilestoneText = "JOURNEY COMPLETE";
    hudMilestoneCount = "06 / 06";
    activeMilestoneIndex = 7;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto flex flex-col gap-3.5 select-none"
    >
      {/* ========================================================================= */}
      {/* 1. TOP NAVIGATION HUD (Minimalist GPS-style Header Bar)                   */}
      {/* ========================================================================= */}
      <div className="rounded-2xl bg-slate-950/90 border border-emerald-500/30 p-3 sm:p-4 shadow-xl backdrop-blur-2xl flex items-center justify-between gap-3 relative overflow-hidden">
        <div className="absolute -top-12 left-1/4 w-64 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Left: NutriWell GPS Indicator */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.3)]">
            <Navigation className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white tracking-wide">NUTRIWELL JOURNEY</span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-400">
                GPS LIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Auto-navigating your personalized health & nutrition ecosystem
            </p>
          </div>
        </div>

        {/* Right: Milestone Progress Gauge */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
              {hudMilestoneText}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-sm font-extrabold text-white font-mono tracking-tight">
                {hudMilestoneCount}
              </span>
            </div>
          </div>

          {/* Replay Route Button (Active once route finishes) */}
          {animStep >= 15 && (
            <button
              type="button"
              onClick={handleReplay}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-950 text-xs font-semibold transition-all cursor-pointer shadow-md"
              title="Replay Map Navigation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Replay</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. THE LARGE GPS MAP CAMERA VIEWPORT (Overflow Hidden Cinematic Frame)    */}
      {/* ========================================================================= */}
      <div 
        ref={containerRef}
        className="w-full h-[540px] sm:h-[620px] lg:h-[680px] rounded-3xl bg-slate-950 border border-emerald-500/40 relative overflow-hidden shadow-2xl emerald-glow-lg"
        style={{ perspective: 1200 }}
      >
        {/* Hidden Path Reference for exact mathematical point sampling */}
        <svg className="absolute w-0 h-0 pointer-events-none opacity-0" viewBox="0 0 2400 1400">
          <path ref={pathRef} d={ROUTE_PATH_D} />
        </svg>

        {/* ========================================================================= */}
        {/* CINEMATIC 2D MAP CAMERA WORLD (Underlying oversized canvas)               */}
        {/* ========================================================================= */}
        <motion.div
          animate={{
            x: cameraTranslateX,
            y: cameraTranslateY,
            scale: cameraScale,
          }}
          transition={{
            type: 'tween',
            ease: [0.25, 0.1, 0.25, 1], // Smooth cinematic cubic bezier easing
            duration: animStep === 15 ? 2.2 : 2.0,
          }}
          style={{
            width: WORLD_WIDTH,
            height: WORLD_HEIGHT,
            transformOrigin: '0 0',
          }}
          className="absolute top-0 left-0"
        >
          {/* SVG MAP GRAPHICS (Terrains, Districts, Roads, Intersections, Route) */}
          <svg
            viewBox="0 0 2400 1400"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* High-Tech GPS Map Grid */}
              <pattern id="gps-grid-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#064e3b" strokeWidth="0.75" strokeOpacity="0.3" />
                <circle cx="80" cy="80" r="1.5" fill="#10b981" fillOpacity="0.25" />
              </pattern>

              <pattern id="gps-sub-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#042f2e" strokeWidth="0.4" strokeOpacity="0.25" />
              </pattern>

              {/* Glowing Highway Filter */}
              <filter id="gps-route-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="10" result="blur1" />
                <feGaussianBlur stdDeviation="4" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Primary Route Highway Gradient */}
              <linearGradient id="gpsRouteGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="20%" stopColor="#34d399" />
                <stop offset="45%" stopColor="#14b8a6" />
                <stop offset="70%" stopColor="#06b6d4" />
                <stop offset="90%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>

              {/* District Fill Gradients */}
              <radialGradient id="districtFood" cx="30%" cy="80%" r="60%">
                <stop offset="0%" stopColor="#064e3b" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#021c14" stopOpacity="0.05" />
              </radialGradient>

              <radialGradient id="districtNutrition" cx="40%" cy="30%" r="55%">
                <stop offset="0%" stopColor="#0f766e" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#042f2e" stopOpacity="0.05" />
              </radialGradient>

              <radialGradient id="districtHabits" cx="65%" cy="75%" r="55%">
                <stop offset="0%" stopColor="#0891b2" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#082f49" stopOpacity="0.05" />
              </radialGradient>

              <radialGradient id="districtCare" cx="85%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#0369a1" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#02131e" stopOpacity="0.05" />
              </radialGradient>
            </defs>

            {/* Base Geographic Land Fill */}
            <rect width="2400" height="1400" fill="#020907" />
            <rect width="2400" height="1400" fill="url(#gps-sub-grid)" />
            <rect width="2400" height="1400" fill="url(#gps-grid-pattern)" />

            {/* ========================================================= */}
            {/* GEOGRAPHIC DISTRICTS & CONTOUR ZONES                      */}
            {/* ========================================================= */}
            {/* 1. Food Intelligence Zone (Bottom-Left) */}
            <path
              d="M 40 760 Q 320 700 520 840 T 640 1360 L 40 1360 Z"
              fill="url(#districtFood)"
              stroke="#059669"
              strokeWidth="1.5"
              strokeOpacity="0.35"
              strokeDasharray="6 6"
            />
            {/* 2. Nutrition District (Top-Left / Mid) */}
            <path
              d="M 40 40 L 920 40 Q 860 360 620 540 T 40 700 Z"
              fill="url(#districtNutrition)"
              stroke="#0d9488"
              strokeWidth="1.5"
              strokeOpacity="0.35"
              strokeDasharray="6 6"
            />
            {/* 3. Smart Choices & Habits Basin (Center) */}
            <path
              d="M 960 680 Q 1280 540 1580 820 T 1920 1360 L 860 1360 Z"
              fill="url(#districtHabits)"
              stroke="#0891b2"
              strokeWidth="1.5"
              strokeOpacity="0.3"
              strokeDasharray="6 6"
            />
            {/* 4. Professional Care & AI Sanctuary (Top-Right) */}
            <path
              d="M 1660 40 L 2360 40 L 2360 840 Q 2040 780 1820 520 Z"
              fill="url(#districtCare)"
              stroke="#0284c7"
              strokeWidth="1.5"
              strokeOpacity="0.35"
              strokeDasharray="6 6"
            />

            {/* Subtle Topographic Elevation Contours */}
            <g stroke="#065f46" strokeWidth="1" strokeOpacity="0.2" fill="none">
              <ellipse cx="600" cy="800" rx="360" ry="240" />
              <ellipse cx="600" cy="800" rx="220" ry="140" />
              <ellipse cx="900" cy="460" rx="300" ry="180" />
              <ellipse cx="1550" cy="670" rx="340" ry="200" />
              <ellipse cx="2100" cy="680" rx="320" ry="190" />
              <ellipse cx="2240" cy="330" rx="260" ry="160" />
            </g>

            {/* DISTRICT WATERMARK LABELS */}
            <g className="font-mono font-black tracking-[0.3em] select-none" fillOpacity="0.25">
              <text x="120" y="1280" fill="#34d399" fontSize="22">FOOD INTELLIGENCE ZONE</text>
              <text x="140" y="140" fill="#2dd4bf" fontSize="22">NUTRITION DISTRICT</text>
              <text x="1080" y="1260" fill="#38bdf8" fontSize="22">PROGRESS VALLEY</text>
              <text x="1880" y="140" fill="#60a5fa" fontSize="22">CARE DISTRICT</text>
              <text x="1100" y="180" fill="#a7f3d0" fontSize="20">HEALTH & WELLNESS</text>
              <text x="2060" y="1280" fill="#67e8f9" fontSize="18">AI ZONE</text>
            </g>

            {/* ========================================================= */}
            {/* SECONDARY ROAD & STREET NETWORK                          */}
            {/* ========================================================= */}
            {/* Major Arterial Roads (Dark underlay) */}
            <g stroke="#111c24" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 0 720 L 640 960 L 1360 1220 L 2400 1160" />
              <path d="M 0 320 L 840 240 L 1720 340 L 2400 480" />
              <path d="M 380 1400 L 480 0" />
              <path d="M 980 1400 L 960 0" />
              <path d="M 1560 1400 L 1620 0" />
              <path d="M 2080 1400 L 2040 0" />
              {/* Diagonal connecting boulevards */}
              <path d="M 560 1360 C 720 960 840 840 1240 760" />
              <path d="M 1280 1400 C 1440 880 1680 800 2320 760" />
            </g>

            {/* Road Asphalt Fill */}
            <g stroke="#0a131a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 0 720 L 640 960 L 1360 1220 L 2400 1160" />
              <path d="M 0 320 L 840 240 L 1720 340 L 2400 480" />
              <path d="M 380 1400 L 480 0" />
              <path d="M 980 1400 L 960 0" />
              <path d="M 1560 1400 L 1620 0" />
              <path d="M 2080 1400 L 2040 0" />
            </g>

            {/* Street Intersections / Traffic Roundabouts */}
            <g fill="#0a131a" stroke="#162736" strokeWidth="6">
              <circle cx="430" cy="890" r="30" />
              <circle cx="970" cy="550" r="26" />
              <circle cx="1590" cy="1020" r="30" />
              <circle cx="2060" cy="660" r="28" />
            </g>

            {/* Street Name Typography */}
            <g className="font-mono text-[11px] fill-slate-500/50 font-bold tracking-widest select-none">
              <text x="80" y="700" transform="rotate(20, 80, 700)">MACRONUTRIENT BLVD</text>
              <text x="200" y="290" transform="rotate(-5, 200, 290)">BIO-SCANNER WAY</text>
              <text x="990" y="1100" transform="rotate(-90, 990, 1100)">HABIT PARKWAY</text>
              <text x="1570" y="1100" transform="rotate(-90, 1570, 1100)">METABOLIC DRIVE</text>
              <text x="2050" y="1100" transform="rotate(-90, 2050, 1100)">CLINICAL AVENUE</text>
              <text x="1440" y="1200" transform="rotate(-2, 1440, 1200)">WELLNESS CRESCENT</text>
            </g>

            {/* ========================================================= */}
            {/* THE PRIMARY GPS HIGHWAY / ROUTE (Sitting directly on road)*/}
            {/* ========================================================= */}
            
            {/* 1. Heavy Casing Bed */}
            <path
              d={ROUTE_PATH_D}
              fill="none"
              stroke="#022117"
              strokeWidth="42"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 2. Road Border Curbs */}
            <path
              d={ROUTE_PATH_D}
              fill="none"
              stroke="#064e3b"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.8"
            />

            {/* 3. Dark Asphalt Core */}
            <path
              d={ROUTE_PATH_D}
              fill="none"
              stroke="#031610"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 4. Active GPS Glowing Route Bed */}
            <path
              d={ROUTE_PATH_D}
              fill="none"
              stroke="url(#gpsRouteGradient)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#gps-route-glow)"
              opacity="0.85"
            />

            {/* 5. Bright Core Trajectory Highway */}
            <path
              d={ROUTE_PATH_D}
              fill="none"
              stroke="url(#gpsRouteGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 6. Dashed GPS Navigation Center Line */}
            <path
              d={ROUTE_PATH_D}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="10 14"
              strokeLinecap="round"
              opacity="0.9"
            />
          </svg>

          {/* ========================================================= */}
          {/* MOVING GPS VEHICLE INDICATOR & HEADLIGHT CONE             */}
          {/* ========================================================= */}
          <div
            className="absolute z-30 pointer-events-none transition-transform duration-75"
            style={{
              left: `${currentPos.x}px`,
              top: `${currentPos.y}px`,
              transform: `translate(-50%, -50%) rotate(${gpsHeading}deg)`,
            }}
          >
            {/* Headlight Projection Beam forward */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-y-1/2 w-32 h-16 origin-left pointer-events-none opacity-40"
              style={{
                background: 'radial-gradient(ellipse at left, rgba(52,211,153,0.8) 0%, rgba(20,184,166,0.2) 60%, transparent 100%)',
                clipPath: 'polygon(0% 40%, 100% 0%, 100% 100%, 0% 60%)',
              }}
            />

            {/* Pulse Radar Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-emerald-400/40 animate-ping" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/80 shadow-[0_0_20px_rgba(52,211,153,0.8)]" />

            {/* GPS Puck Pointer Shape */}
            <div className="relative w-8 h-8 rounded-full bg-slate-950 border-2 border-emerald-300 flex items-center justify-center shadow-2xl shadow-emerald-500">
              <Navigation className="w-4 h-4 text-emerald-300 rotate-45 transform" />
            </div>
          </div>

          {/* ========================================================= */}
          {/* STARTING LOCATION MAP PIN                                 */}
          {/* ========================================================= */}
          <div
            className="absolute -translate-x-1/2 -translate-y-full z-20 pointer-events-none"
            style={{ left: `${START_POS.x}px`, top: `${START_POS.y}px` }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              {/* Start Card */}
              <div className="px-4 py-2.5 rounded-2xl bg-slate-950/95 border-2 border-emerald-400 text-center shadow-2xl shadow-emerald-950/90 backdrop-blur-xl min-w-[180px]">
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  YOU ARE HERE
                </div>
                <div className="text-sm font-black text-white tracking-wide mt-0.5">START</div>
                <div className="text-[10px] text-slate-300 font-medium leading-tight mt-0.5">
                  Your NutriWell journey begins here.
                </div>
              </div>
              {/* Pin Spike & Ground Target Dot */}
              <div className="w-1 h-4 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              <div className="w-5 h-5 rounded-full bg-emerald-400 border-2 border-slate-950 ring-4 ring-emerald-500/40 shadow-xl" />
            </motion.div>
          </div>

          {/* ========================================================= */}
          {/* 6 JOURNEY MILESTONES / STOPS                              */}
          {/* ========================================================= */}
          {MILESTONES.map((stop, index) => {
            const isDiscovered = discoveredStops.has(index) || isOverviewMode;
            const isCurrentlyActive = activeMilestoneIndex === index;

            return (
              <div
                key={stop.id}
                className="absolute -translate-x-1/2 -translate-y-full z-20 pointer-events-none"
                style={{ left: `${stop.x}px`, top: `${stop.y}px` }}
              >
                <AnimatePresence>
                  {isDiscovered && (
                    <motion.div
                      initial={{ scale: 0.2, opacity: 0, y: 15 }}
                      animate={{ 
                        scale: isCurrentlyActive ? 1.08 : 1, 
                        opacity: 1, 
                        y: 0 
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className="flex flex-col items-center"
                    >
                      {/* Destination Card Callout */}
                      <div 
                        className={`p-3.5 rounded-2xl bg-slate-950/95 border text-left shadow-2xl backdrop-blur-xl w-[230px] transition-all duration-300 ${
                          isCurrentlyActive 
                            ? 'border-emerald-400 ring-2 ring-emerald-400/40 shadow-emerald-500/30' 
                            : 'border-emerald-500/60 shadow-slate-950/90'
                        }`}
                      >
                        {/* Header badge with milestone number */}
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-emerald-950 border border-emerald-800/80 text-emerald-300 font-mono tracking-wide">
                            STOP {stop.numberStr}
                          </span>
                          <div className="p-1 rounded-lg bg-slate-900 border border-emerald-900/60">
                            {stop.icon}
                          </div>
                        </div>

                        {/* Landmark Title */}
                        <div className="text-xs font-black text-white tracking-tight leading-snug">
                          {stop.title}
                        </div>

                        {/* Landmark Short Description */}
                        <div className="text-[10px] text-slate-300 leading-normal mt-1">
                          {stop.subtitle}
                        </div>

                        {/* Feature Tags */}
                        <div className="mt-2 pt-2 border-t border-emerald-900/40 flex flex-wrap gap-1 text-[8px] text-emerald-400/90 font-mono">
                          {stop.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="bg-slate-900 px-1.5 py-0.5 rounded border border-emerald-900/40"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Pin Stem & Road Anchor */}
                      <div className={`w-0.5 h-3 ${isCurrentlyActive ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
                      <div className={`w-4 h-4 rounded-full border-2 border-slate-950 shadow-md ${
                        isCurrentlyActive 
                          ? 'bg-emerald-300 ring-4 ring-emerald-400/50 scale-125' 
                          : 'bg-emerald-500 ring-2 ring-emerald-600/40'
                      }`} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* ========================================================= */}
          {/* FINAL DESTINATION MAP PIN                                 */}
          {/* ========================================================= */}
          <div
            className="absolute -translate-x-1/2 -translate-y-full z-20 pointer-events-none"
            style={{ left: `${FINAL_POS.x}px`, top: `${FINAL_POS.y}px` }}
          >
            <AnimatePresence>
              {(animStep >= 14 || isOverviewMode) && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex flex-col items-center"
                >
                  <div className="p-4 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-emerald-950 border-2 border-emerald-400 text-center shadow-2xl shadow-emerald-500/40 backdrop-blur-2xl w-[260px]">
                    <div className="flex items-center justify-center gap-1.5 mb-1.5 text-[9px] font-extrabold text-emerald-400 uppercase tracking-widest">
                      <Flag className="w-3.5 h-3.5 text-emerald-400" />
                      DESTINATION REACHED
                    </div>
                    <div className="text-sm font-black text-white tracking-wide">
                      YOUR NUTRIWELL JOURNEY
                    </div>
                    <div className="text-[10px] text-slate-300 leading-tight mt-1 font-medium">
                      Personalized nutrition. Smarter decisions. Better habits.
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-emerald-800/60 flex items-center justify-center gap-1 text-[9px] font-extrabold text-emerald-300 bg-emerald-950/80 py-1.5 rounded-xl border border-emerald-700/40">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      LIFELONG HEALTH ECOSYSTEM
                    </div>
                  </div>
                  <div className="w-1 h-5 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,1)]" />
                  <div className="w-5 h-5 rounded-full bg-emerald-300 border-2 border-slate-950 ring-4 ring-emerald-400/60 shadow-xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* DECORATIVE MAP HUD / COMPASS / CONTROLS (Non-functional as required)       */}
        {/* ========================================================================= */}
        <div className="absolute top-4 right-4 z-30 flex flex-col items-center gap-2 select-none pointer-events-none opacity-85">
          {/* Compass Rose */}
          <div className="w-9 h-9 rounded-xl bg-slate-900/90 border border-emerald-800/70 text-emerald-400 flex flex-col items-center justify-center shadow-xl backdrop-blur-md">
            <span className="text-[8px] font-black text-emerald-400">N</span>
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
          </div>

          {/* Decorative Zoom & Target Controls (Disabled / Non-functional) */}
          <div className="rounded-xl bg-slate-900/90 border border-emerald-800/70 p-1 flex flex-col items-center gap-1 shadow-xl backdrop-blur-md">
            <div className="w-6 h-6 rounded-lg text-slate-400 flex items-center justify-center">
              <Plus className="w-3 h-3" />
            </div>
            <div className="w-4 h-px bg-emerald-900/70" />
            <div className="w-6 h-6 rounded-lg text-slate-400 flex items-center justify-center">
              <Minus className="w-3 h-3" />
            </div>
            <div className="w-4 h-px bg-emerald-900/70" />
            <div className="w-6 h-6 rounded-lg text-emerald-400 flex items-center justify-center">
              <Crosshair className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Decorative Map Legend (Bottom-Left Desktop) */}
        <div className="absolute bottom-4 left-4 z-30 hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-emerald-900/60 text-[10px] text-slate-300 shadow-xl backdrop-blur-md pointer-events-none select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="font-semibold text-white">Main NutriWell Highway</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-500/40" />
            <span>6 Key Milestones</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MINIMAL BOTTOM ACTION / TRANSITION AREA                                */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <Button
          variant="ghost"
          size="sm"
          icon={<ChevronLeft className="w-4 h-4" />}
          onClick={onBack}
          className="w-full sm:w-auto text-slate-400 hover:text-white"
        >
          Back
        </Button>

        <div className="flex items-center gap-2 text-xs text-slate-400 text-center">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Follow the route to discover the NutriWell ecosystem.</span>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<ArrowRight className="w-4 h-4" />}
          onClick={onContinue}
          className={`w-full sm:w-auto font-bold transition-all ${
            animStep >= 15 ? 'emerald-glow-lg ring-2 ring-emerald-400/60' : 'emerald-glow-sm'
          }`}
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
};
