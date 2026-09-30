import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { 
  Sparkles, Shield, Camera, Utensils, Stethoscope, 
  AlertTriangle, BarChart2, CheckCircle2, ArrowRight, HeartPulse, Zap, Users, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-deep-forest text-slate-100 bg-emerald-radial-gradient font-sans">
      {/* Landing Navigation Header */}
      <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-emerald-900/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg emerald-glow-sm">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                NUTRI<span className="text-emerald-400">WELL</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">AI</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Log In
            </Button>
            <Button variant="primary" onClick={() => navigate('/signup')}>
              Get Started Free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 max-w-7xl mx-auto text-center space-y-8">
        <Badge variant="mint" icon={<Sparkles className="w-4 h-4" />}>
          Next-Generation Health Intelligence Platform
        </Badge>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
          Your Nutrition. <br />
          <span className="text-gradient-emerald">Your AI.</span> Your Care Team.
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
          Understand what you eat, improve your daily habits, and connect with professional care when you need it. Designed specifically for modern dietary lifestyles and Indian food intelligence.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} onClick={() => navigate('/signup')}>
            START YOUR JOURNEY
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/login')}>
            EXPLORE NUTRIWELL DEMO
          </Button>
        </div>

        {/* Hero Interactive Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto">
          <Card glow className="text-center py-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">98.4%</span>
            <p className="text-xs text-slate-400 mt-1">AI Scan Accuracy</p>
          </Card>
          <Card glow className="text-center py-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-mint-accent">1,200+</span>
            <p className="text-xs text-slate-400 mt-1">Indian Food Models</p>
          </Card>
          <Card glow className="text-center py-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-teal-300">100%</span>
            <p className="text-xs text-slate-400 mt-1">Verified Doctors</p>
          </Card>
          <Card glow className="text-center py-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">₹ INR</span>
            <p className="text-xs text-slate-400 mt-1">Budget Optimization</p>
          </Card>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="px-6 py-16 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <Badge variant="emerald">Comprehensive Ecosystem</Badge>
          <h2 className="text-3xl font-bold text-white">Commercial-Grade Health Intelligence</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">From computer vision food tracking to direct medical consultation, NutriWell unites every pillar of wellness into one platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hoverEffect className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Food Scanner</h3>
            <p className="text-xs text-slate-300 leading-relaxed">Instant macro breakdown, calorie count, and micronutrient extraction from a single camera photo.</p>
          </Card>

          <Card hoverEffect className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-950 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Fill The Plate Visualizer</h3>
            <p className="text-xs text-slate-300 leading-relaxed">Interactive drag-and-drop meal builder that calculates protein balance and cost efficiency in real-time.</p>
          </Card>

          <Card hoverEffect className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Verified Care Team</h3>
            <p className="text-xs text-slate-300 leading-relaxed">Direct video consultations with clinical dietitians, endocrinologists, and metabolic experts.</p>
          </Card>
        </div>
      </section>

      {/* FINAL END CARD EXPERIENCE — MATCHES LOGIN VISUAL DNA */}
      <section className="px-6 py-24 max-w-4xl mx-auto text-center">
        <div className="relative rounded-3xl bg-slate-950/90 border-2 border-emerald-500/40 p-10 sm:p-14 shadow-2xl emerald-glow-lg overflow-hidden backdrop-blur-2xl">
          {/* Subtle Background Emerald Orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 mx-auto shadow-xl emerald-glow-md">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-emerald-400 animate-pulse" />
              </div>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              "Your healthier journey starts with one better choice."
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto">
              Understand your nutrition. Improve your daily habits. Build a healthier future with AI precision.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} onClick={() => navigate('/signup')}>
                START MY NUTRITION JOURNEY
              </Button>
              <Button variant="outline" size="lg" icon={<Stethoscope className="w-5 h-5" />} onClick={() => navigate('/login')}>
                TALK TO A PROFESSIONAL
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-900/30 px-6 py-8 text-center text-xs text-slate-400">
        <p>© 2026 NutriWell Health Technologies Inc. All rights reserved. Commercial-Grade AI Healthcare System.</p>
      </footer>
    </div>
  );
};
