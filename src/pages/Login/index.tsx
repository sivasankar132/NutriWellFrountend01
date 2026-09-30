import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { useApp } from '../../context/AppContext';
import { Sparkles, Mail, Lock, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, authLoading, showToast } = useApp();
  const [email, setEmail] = useState('siva@nutriwell.health');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const res = await login(email, password);
    if (res.success) {
      navigate('/home');
    } else {
      setErrorMessage(res.error || 'Authentication failed');
    }
  };

  return (
    <div className="w-full rounded-3xl bg-slate-950/90 border border-emerald-500/30 overflow-hidden shadow-2xl emerald-glow-lg grid grid-cols-1 lg:grid-cols-12 backdrop-blur-2xl">
      {/* Left Primary Visual Area */}
      <div className="lg:col-span-6 bg-gradient-to-br from-emerald-950 via-slate-950 to-deep-forest p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-emerald-900/40">
        {/* Soft Glowing Orbs */}
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-emerald-pulse" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg emerald-glow-sm">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              NUTRI<span className="text-emerald-400">WELL</span>
            </span>
          </Link>

          <div className="space-y-4 pt-6">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-900/60 text-mint-accent border border-emerald-500/30">
              COMMERCIAL HEALTH PLATFORM
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Your Nutrition. <br />
              Your AI. <br />
              <span className="text-gradient-emerald">Your Care Team.</span>
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Understand what you eat, build healthier habits, and connect with professional care when you need it.
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-8 space-y-3 border-t border-emerald-900/40 mt-8">
          <div className="flex items-center gap-2 text-xs text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Encrypted HIPAA & ABHA Health Data Compliance</span>
          </div>
        </div>
      </div>

      {/* Right Primary Form */}
      <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Sign In to NutriWell</h2>
          <p className="text-xs text-slate-400 mt-1">Access your personalized health command center</p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-emerald-900/50 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                placeholder="name@domain.com"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-emerald-900/50 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded bg-slate-900 border-emerald-800 text-emerald-500 focus:ring-emerald-400"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => showToast("Password reset link sent to your email!")}
              className="text-emerald-400 hover:text-emerald-300 font-medium"
            >
              Forgot password?
            </button>
          </div>

          <Button 
            variant="primary" 
            size="lg" 
            className="w-full" 
            disabled={authLoading}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {authLoading ? 'AUTHENTICATING...' : 'LOGIN TO NUTRIWELL'}
          </Button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2">
          <span>Don't have an account yet? </span>
          <Link to="/signup" className="text-emerald-400 hover:text-emerald-300 font-bold ml-1">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};
