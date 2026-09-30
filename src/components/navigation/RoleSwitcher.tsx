import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserCheck, Stethoscope, ShieldCheck, ArrowRightLeft, ChevronDown, Check } from 'lucide-react';
import { useDoctorAdmin } from '../../context/DoctorAdminContext';

export const RoleSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentRole } = useDoctorAdmin();

  // Determine current active portal based on URL path
  const isDoctor = location.pathname.startsWith('/doctor');
  const isAdmin = location.pathname.startsWith('/admin');
  const isPatient = !isDoctor && !isAdmin;

  const currentRoleName = isAdmin ? 'Admin' : isDoctor ? 'Doctor' : 'Patient';

  const handleSwitch = (portal: 'patient' | 'doctor' | 'admin') => {
    setIsOpen(false);
    if (portal === 'patient') {
      navigate('/home');
    } else if (portal === 'doctor') {
      setCurrentRole('doctor');
      navigate('/doctor/dashboard');
    } else if (portal === 'admin') {
      setCurrentRole('admin');
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="relative inline-block text-left z-50">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/40 text-emerald-300 hover:border-emerald-400 hover:text-white transition-all shadow-md group"
        title="Switch Role Portal"
      >
        <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-180 transition-transform duration-300" />
        <span>Role: <strong className="text-white uppercase tracking-wider">{currentRoleName}</strong></span>
        <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-emerald-500/30 shadow-2xl py-2 z-50 backdrop-blur-xl animate-fade-in">
          <div className="px-3 py-1.5 border-b border-emerald-900/40 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
            Switch Active Portal Role
          </div>

          {/* Patient Portal Option */}
          <button
            onClick={() => handleSwitch('patient')}
            className={`w-full px-3 py-2.5 text-left text-xs font-semibold flex items-center justify-between hover:bg-emerald-950/60 transition-colors ${
              isPatient ? 'text-emerald-400 bg-emerald-950/30' : 'text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="font-bold">Patient / User Portal</p>
                <p className="text-[10px] text-slate-400 font-normal">Health, Diets & Tracker</p>
              </div>
            </div>
            {isPatient && <Check className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Doctor / Nutritionist Portal Option */}
          <button
            onClick={() => handleSwitch('doctor')}
            className={`w-full px-3 py-2.5 text-left text-xs font-semibold flex items-center justify-between hover:bg-emerald-950/60 transition-colors ${
              isDoctor ? 'text-teal-400 bg-teal-950/30' : 'text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Stethoscope className="w-4 h-4 text-teal-400" />
              <div>
                <p className="font-bold">Nutritionists Portal</p>
                <p className="text-[10px] text-slate-400 font-normal">Patients & Consultations</p>
              </div>
            </div>
            {isDoctor && <Check className="w-4 h-4 text-teal-400" />}
          </button>

          {/* Admin Portal Option */}
          <button
            onClick={() => handleSwitch('admin')}
            className={`w-full px-3 py-2.5 text-left text-xs font-semibold flex items-center justify-between hover:bg-purple-950/60 transition-colors ${
              isAdmin ? 'text-purple-400 bg-purple-950/30' : 'text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <div>
                <p className="font-bold">Admin Portal</p>
                <p className="text-[10px] text-slate-400 font-normal">Platform & Doctor Approval</p>
              </div>
            </div>
            {isAdmin && <Check className="w-4 h-4 text-purple-400" />}
          </button>
        </div>
      )}
    </div>
  );
};
