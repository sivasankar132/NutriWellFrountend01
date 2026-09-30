import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/DoctorAdminContext';
import { HeartPulse, Mail, Lock, ShieldCheck, Stethoscope, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const DoctorLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentRole, showToast } = useApp();

  const [email, setEmail] = useState('dr.ananya@nutriwell.health');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'doctor' | 'admin'>('doctor');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentRole(selectedRole);
    showToast(
      'Login Successful',
      `Welcome back! Authenticated as ${selectedRole === 'doctor' ? 'Dr. Ananya Sharma (Nutritionist)' : 'Platform Administrator'}.`,
      'success'
    );
    if (selectedRole === 'doctor') {
      navigate('/doctor/dashboard');
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-400 text-white shadow-xl shadow-brand-500/20">
          <HeartPulse className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Nutri<span className="text-brand-600 dark:text-brand-400">Well</span>
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Clinical Nutrition Consultation & Telehealth Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-8 px-4 sm:px-10 shadow-2xl border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6">
          {/* Quick Role Switcher Pill */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setSelectedRole('doctor');
                setEmail('dr.ananya@nutriwell.health');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'doctor'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              Nutritionists Portal Login
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedRole('admin');
                setEmail('admin@nutriwell.health');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'admin'
                  ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Portal Login
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span>Remember me for 30 days</span>
              </label>

              <button
                type="button"
                onClick={() => showToast('Reset Link Sent', 'Password reset instructions sent to your email.', 'info')}
                className="font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 text-base font-bold shadow-lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Sign In to {selectedRole === 'doctor' ? 'Doctor Workspace' : 'Admin Portal'}
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
            Protected by Healthcare HIPAA 256-bit Encryption
          </div>
        </div>
      </div>
    </div>
  );
};
