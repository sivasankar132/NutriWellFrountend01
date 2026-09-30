import React, { useState } from 'react';
import { useDoctorAdmin } from '../../context/DoctorAdminContext';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  Sun,
  Moon,
  Bell,
  CheckCircle2,
  ShieldCheck,
  User,
  Power,
  ChevronDown,
  ArrowRightLeft,
  Sparkles,
  Camera
} from 'lucide-react';
import { MOCK_ACTIVITIES } from '../../data/doctorAdminMockData';
import { clsx } from 'clsx';
import { Link, useNavigate } from 'react-router-dom';

interface TopNavbarProps {
  onToggleSidebar: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onToggleSidebar }) => {
  const { currentRole, setCurrentRole, isDarkMode, toggleDarkMode, doctor, toggleDoctorOnline } = useDoctorAdmin();
  const { setIsScannerOpen } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const navigate = useNavigate();

  const handleRoleSwitch = (role: 'patient' | 'doctor' | 'admin') => {
    setShowRoleMenu(false);
    if (role === 'patient') {
      navigate('/home');
    } else if (role === 'doctor') {
      setCurrentRole('doctor');
      navigate('/doctor/dashboard');
    } else {
      setCurrentRole('admin');
      navigate('/admin/dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Left Area: Toggle Sidebar & Portal Switcher */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Quick Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu((p) => !p)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors border border-slate-200/60 dark:border-slate-700/60 cursor-pointer"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>Switch Role ({currentRole.toUpperCase()})</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showRoleMenu && (
            <div className="absolute left-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1.5 z-50 animate-fade-in">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Select Active View
              </div>
              <button
                onClick={() => handleRoleSwitch('patient')}
                className="w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 text-emerald-600 dark:text-emerald-400 cursor-pointer"
              >
                <span>Patient / User Portal</span>
              </button>
              <button
                onClick={() => handleRoleSwitch('doctor')}
                className={clsx(
                  'w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer',
                  currentRole === 'doctor' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-700 dark:text-slate-300'
                )}
              >
                <span>Nutritionists Portal</span>
                {currentRole === 'doctor' && <CheckCircle2 className="w-4 h-4 text-brand-500" />}
              </button>
              <button
                onClick={() => handleRoleSwitch('admin')}
                className={clsx(
                  'w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer',
                  currentRole === 'admin' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-700 dark:text-slate-300'
                )}
              >
                <span>Admin Portal</span>
                {currentRole === 'admin' && <CheckCircle2 className="w-4 h-4 text-purple-500" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Area: Scan Food, Online Switch, Dark Mode, Notifications, User Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Scan Food Icon Button */}
        <button
          type="button"
          onClick={() => setIsScannerOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
          title="Scan Food with AI Vision"
        >
          <Camera className="w-4 h-4" />
          <span className="hidden sm:inline">Scan Food</span>
        </button>

        {/* Doctor Online/Offline Switcher */}
        {currentRole === 'doctor' && (
          <button
            onClick={toggleDoctorOnline}
            className={clsx(
              'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs border cursor-pointer',
              doctor.isOnline
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
            )}
          >
            <span
              className={clsx(
                'w-2.5 h-2.5 rounded-full transition-transform',
                doctor.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
              )}
            />
            <span className="hidden sm:inline">{doctor.isOnline ? 'ONLINE' : 'OFFLINE'}</span>
          </button>
        )}

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="Toggle Dark / Light Theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((p) => !p)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Recent Notifications
                </h4>
                <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400">
                  4 New
                </span>
              </div>
              <div className="mt-3 space-y-3 max-h-80 overflow-y-auto pr-1">
                {MOCK_ACTIVITIES.map((act) => (
                  <div
                    key={act.id}
                    className="p-2.5 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-start gap-3 text-xs transition-colors"
                  >
                    {act.avatar ? (
                      <img src={act.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold shrink-0">
                        NV
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 dark:text-slate-100 truncate">{act.title}</p>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{act.description}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{act.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Menu Link */}
        <Link
          to={currentRole === 'doctor' ? '/doctor/profile' : '/admin/settings'}
          className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800"
        >
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-8 h-8 rounded-full object-cover border border-brand-500"
          />
          <div className="hidden md:block text-left text-xs">
            <p className="font-bold text-slate-900 dark:text-slate-100 leading-tight">
              {currentRole === 'doctor' ? doctor.name : 'System Admin'}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              {currentRole === 'doctor' ? 'Clinical Dietitian' : 'Root Control'}
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
};
