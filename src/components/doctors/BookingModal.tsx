import React, { useState } from 'react';
import { Doctor, Appointment } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, Video, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface BookingModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ doctor, isOpen, onClose }) => {
  const { bookAppointment } = useApp();
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null);

  if (!doctor) return null;

  const handleConfirmBooking = () => {
    if (!selectedSlot) return;
    const apt = bookAppointment(doctor, 'Tomorrow', selectedSlot);
    setBookedAppointment(apt);
  };

  const handleDone = () => {
    setBookedAppointment(null);
    setSelectedSlot('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleDone} title="Book Healthcare Consultation" maxWidth="lg">
      {!bookedAppointment ? (
        <div className="space-y-5">
          {/* Doctor Header */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-emerald-500/30">
            <img src={doctor.avatar} alt={doctor.name} className="w-14 h-14 rounded-xl object-cover" />
            <div>
              <h4 className="text-base font-bold text-white">{doctor.name}</h4>
              <p className="text-xs text-emerald-400">{doctor.specialty}</p>
              <p className="text-xs text-slate-400 mt-0.5">₹{doctor.consultationPriceInr} • 30 Min Tele-Consultation</p>
            </div>
          </div>

          {/* Time Slot Picker */}
          <div>
            <label className="text-xs font-bold text-white block mb-2">Select Available Time Slot</label>
            <div className="grid grid-cols-2 gap-2">
              {doctor.availability.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    selectedSlot === slot
                      ? 'bg-emerald-950 border-emerald-400 text-emerald-300 emerald-glow-sm'
                      : 'bg-slate-950 border-emerald-900/40 text-slate-300 hover:border-emerald-500/40'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    {slot}
                  </span>
                  {selectedSlot === slot && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Value First Guarantee */}
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-200 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>100% Verified Healthcare Professional. Includes post-consultation personalized meal plan update.</p>
          </div>

          {/* Footer CTAs */}
          <div className="pt-3 border-t border-emerald-900/40 flex items-center justify-between">
            <span className="text-sm font-bold text-white">Total: ₹{doctor.consultationPriceInr}</span>
            <Button
              variant="primary"
              size="lg"
              disabled={!selectedSlot}
              icon={<Video className="w-4 h-4" />}
              onClick={handleConfirmBooking}
            >
              CONFIRM & BOOK SLOT
            </Button>
          </div>
        </div>
      ) : (
        /* Confirmation Ticket State */
        <div className="py-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto emerald-glow-lg">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>
          <Badge variant="mint" icon={<Sparkles className="w-3.5 h-3.5" />}>BOOKING CONFIRMED</Badge>
          <h3 className="text-xl font-bold text-white">Consultation Booked Successfully!</h3>
          
          <div className="max-w-sm mx-auto p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 text-left space-y-2 text-xs text-slate-300">
            <p className="flex justify-between">
              <span>Appointment ID:</span> <strong className="text-emerald-400">{bookedAppointment.id}</strong>
            </p>
            <p className="flex justify-between">
              <span>Doctor:</span> <strong className="text-white">{bookedAppointment.doctorName}</strong>
            </p>
            <p className="flex justify-between">
              <span>Slot:</span> <strong className="text-emerald-300">{bookedAppointment.timeSlot}</strong>
            </p>
            <p className="flex justify-between">
              <span>Mode:</span> <strong className="text-teal-300">HD Video Consultation</strong>
            </p>
          </div>

          <Button variant="primary" size="lg" onClick={handleDone}>
            Go to My Appointments
          </Button>
        </div>
      )}
    </Modal>
  );
};
