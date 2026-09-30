import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDoctorAdmin } from '../../context/DoctorAdminContext';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Stethoscope,
  Wallet,
  UserCheck,
  BarChart3,
  Settings,
  ShieldAlert,
  Star,
  Activity,
  HeartPulse,
  Sparkles,
  User,
} from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentRole, doctor, requests, doctors } = useDoctorAdmin();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isDoctorRole = !isAdminRoute && currentRole === 'doctor';

  const pendingDoctorRequests = doctor.pendingRequestsCount || requests.filter((r) => r.status === 'new' || r.status === 'pending').length;
  const pendingVerifications = doctors.filter((d) => d.status === 'pending').length;

  const doctorNavItems = [
    { label: 'Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
    { label: 'Consultation Requests', path: '/doctor/requests', icon: ClipboardList, badge: pendingDoctorRequests },
    { label: 'Patient Workspace', path: '/doctor/workspace', icon: Stethoscope },
    { label: 'Earnings & Wallet', path: '/doctor/earnings', icon: Wallet },
    { label: 'Doctor Profile', path: '/doctor/profile', icon: UserCheck },
    { label: 'Switch to Patient Portal', path: '/home', icon: User },
  ];

  const adminNavItems = [
    { label: 'Admin Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Doctor Verification', path: '/admin/verifications', icon: ShieldAlert, badge: pendingVerifications },
    { label: 'Doctors Management', path: '/admin/doctors', icon: Stethoscope },
    { label: 'Patients Management', path: '/admin/patients', icon: Users },
    { label: 'Platform Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Admin Settings', path: '/admin/settings', icon: Settings },
    { label: 'Switch to Patient Portal', path: '/home', icon: User },
  ];

  const navItems = isAdminRoute || currentRole === 'admin' ? adminNavItems : doctorNavItems;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={clsx(
          'fixed top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo Branding */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 font-sans">
                Nutri<span className="text-brand-600 dark:text-brand-400">Well</span>
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Health Intelligence
              </span>
            </div>
          </div>
        </div>

        {/* Current Portal Badge */}
        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Portal</span>
          <span
            className={clsx(
              'px-2.5 py-0.5 text-[11px] font-bold rounded-full uppercase tracking-wider',
              isDoctorRole
                ? 'bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
            )}
          >
            {isDoctorRole ? 'NUTRITIONISTS PORTAL' : 'ADMIN PORTAL'}
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all group',
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-amber-500 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Doctor Status Card in Sidebar bottom */}
        {currentRole === 'doctor' && (
          <div className="p-4 m-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={doctor.avatar}
                  alt={doctor.name}
                  className="w-10 h-10 rounded-full object-cover border border-brand-500"
                />
                <span
                  className={clsx(
                    'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900',
                    doctor.isOnline ? 'bg-emerald-500' : 'bg-slate-400'
                  )}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                  {doctor.name}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {doctor.rating} ({doctor.reviewCount})
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
