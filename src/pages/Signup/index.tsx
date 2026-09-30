import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { useApp } from '../../context/AppContext';
import { Sparkles, Mail, Lock, User, ArrowRight } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, authLoading, showToast } = useApp();
  const [name, setName] = useState('Siva Sankar');
  const [email, setEmail] = useState('siva@nutriwell.health');
  const [password, setPassword] = useState('password123');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const res = await signup(name, email, password);
    if (res.success) {
      navigate('/onboarding');
    } else {
      setErrorMessage(res.error || 'Registration failed');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-3xl bg-slate-950/90 border border-emerald-500/30 p-8 shadow-2xl emerald-glow-lg space-y-6 backdrop-blur-2xl">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 mx-auto shadow-lg emerald-glow-sm">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white">Create NutriWell Account</h2>
        <p className="text-xs text-slate-400">Join the commercial AI nutrition platform</p>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-medium">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-emerald-900/50 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-400"
              placeholder="Siva Sankar"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-emerald-900/50 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-400"
              placeholder="siva@domain.com"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-emerald-900/50 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-400"
              placeholder="••••••••"
            />
          </div>
        </div>

        <Button 
          variant="primary" 
          size="lg" 
          className="w-full" 
          disabled={authLoading}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          {authLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT & CONTINUE'}
        </Button>
      </form>

      <div className="text-center text-xs text-slate-400 pt-2">
        <span>Already have an account? </span>
        <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-bold ml-1">
          Login
        </Link>
      </div>
    </div>
  );
};
