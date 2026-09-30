import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Calendar, Video, Clock, CheckCircle2, XCircle } from 'lucide-react';

export const AppointmentsPage: React.FC = () => {
  const { appointments, cancelAppointment, showToast } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="mint" icon={<Calendar className="w-3.5 h-3.5" />}>Patient Tele-Health Manager</Badge>
        <h1 className="text-2xl font-bold text-white mt-1">My Medical Consultations</h1>
        <p className="text-xs text-slate-400">View upcoming video sessions, consultation notes, and prescriptions.</p>
      </div>

      <div className="space-y-4">
        {appointments.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-xs text-slate-400">No appointments scheduled.</p>
          </Card>
        ) : (
          appointments.map((apt) => (
            <Card key={apt.id} glow className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5">
              <div className="flex items-center gap-4">
                <img src={apt.doctorAvatar} alt={apt.doctorName} className="w-14 h-14 rounded-2xl object-cover border border-emerald-500/40" />
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant={apt.status === 'Confirmed' ? 'emerald' : 'slate'}>{apt.status}</Badge>
                    <span className="text-[11px] text-slate-400">Booked: {apt.bookedAt}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">{apt.doctorName}</h3>
                  <p className="text-xs text-emerald-400">{apt.doctorSpecialty}</p>
                  <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-mint-accent" />
                    Slot: <strong>{apt.date}, {apt.timeSlot}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {apt.status === 'Confirmed' && (
                  <>
                    <Button variant="primary" size="sm" icon={<Video className="w-3.5 h-3.5" />} onClick={() => showToast("Launching secure NutriWell Video Call Room...")}>
                      JOIN VIDEO CALL
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => cancelAppointment(apt.id)}>
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
