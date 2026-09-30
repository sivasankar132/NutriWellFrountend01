import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doctorService } from '../../services/doctorService';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { BookingModal } from '../../components/doctors/BookingModal';
import { Stethoscope, Award, Star, Globe, Calendar, ArrowLeft, ShieldCheck, Video } from 'lucide-react';

export const DoctorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const doctor = doctorService.getDoctorById(id || 'doc-1');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  if (!doctor) {
    return <div className="text-white py-12 text-center">Doctor profile not found.</div>;
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/doctors')}>
        Back to Doctors Directory
      </Button>

      <Card glow className="space-y-6 p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-28 h-28 rounded-3xl object-cover border-2 border-emerald-500/40 shadow-xl emerald-glow-md"
          />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {doctor.isDemo && <Badge variant="gold">DEMO PROFILE</Badge>}
              <Badge variant="mint">{doctor.experienceYears} Years Experience</Badge>
            </div>
            <h1 className="text-2xl font-bold text-white">{doctor.name}</h1>
            <p className="text-sm font-semibold text-emerald-400">{doctor.specialty}</p>
            <p className="text-xs text-slate-300 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400 shrink-0" />
              {doctor.credentials}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-emerald-900/40">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">About Practitioner</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{doctor.bio}</p>
            
            <div className="pt-2 space-y-1 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-teal-400" />
                Languages Spoken: <strong className="text-white">{doctor.languages.join(', ')}</strong>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Focus: <strong className="text-white">{doctor.nutritionFocus}</strong>
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-4 text-center flex flex-col justify-between">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block">Tele-Consultation Fee</span>
              <span className="text-3xl font-extrabold text-white mt-1 block">₹{doctor.consultationPriceInr}</span>
              <p className="text-xs text-mint-accent mt-2 flex items-center justify-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Available: {doctor.availability[0]}
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              icon={<Video className="w-4 h-4" />}
              onClick={() => setIsBookingOpen(true)}
            >
              BOOK CONSULTATION SLOT
            </Button>
          </div>
        </div>
      </Card>

      <BookingModal
        doctor={doctor}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};
