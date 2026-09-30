import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toast } from '../components/common/Toast';
import { useApp } from '../context/AppContext';

export const AuthLayout: React.FC = () => {
  const { toast } = useApp();

  return (
    <div className="min-h-screen bg-deep-forest text-slate-100 flex items-center justify-center p-4 relative overflow-hidden bg-emerald-radial-gradient">
      {/* Soft Emerald Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-5xl z-10">
        <Outlet />
      </div>

      <Toast message={toast} />
    </div>
  );
};
