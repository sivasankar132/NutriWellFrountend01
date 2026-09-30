import React from 'react';
import { Doctor } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Star, Calendar, Globe, Award, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DoctorCardProps {
  doctor: Doctor;
  onBook: (doctor: Doctor) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBook }) => {
  const navigate = useNavigate();

  return (
    <Card hoverEffect className="flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        {/* Header Badges & Avatar */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-md emerald-glow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                {doctor.isDemo && <Badge variant="gold">DEMO PROFILE</Badge>}
                <span className="flex items-center text-amber-400 font-bold text-xs gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {doctor.rating} ({doctor.reviewsCount})
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">{doctor.name}</h3>
              <p className="text-xs text-emerald-400 font-medium">{doctor.specialty}</p>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <p className="text-xs text-slate-300 flex items-center gap-1.5 bg-slate-950/80 p-2 rounded-xl border border-emerald-900/30">
          <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="line-clamp-1">{doctor.credentials}</span>
        </p>

        {/* Languages & Nutrition Focus */}
        <div className="text-xs text-slate-400 space-y-1">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>Languages: {doctor.languages.join(', ')}</span>
          </div>
          <p className="text-[11px] text-emerald-200/80 line-clamp-2 italic">
            "{doctor.bio}"
          </p>
        </div>

        {/* Availability Pill */}
        <div className="flex items-center gap-1.5 text-xs text-mint-accent">
          <Calendar className="w-3.5 h-3.5" />
          <span>Next Available: <strong>{doctor.availability[0]}</strong></span>
        </div>
      </div>

      {/* Footer Price & Booking CTA */}
      <div className="pt-3 border-t border-emerald-900/40 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase">Consultation</span>
          <span className="text-base font-extrabold text-white">₹{doctor.consultationPriceInr}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate(`/doctors/${doctor.id}`)}>
            View Profile
          </Button>
          <Button variant="primary" size="sm" onClick={() => onBook(doctor)}>
            BOOK CONSULTATION
          </Button>
        </div>
      </div>
    </Card>
  );
};
