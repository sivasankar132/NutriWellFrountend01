import React, { useState } from 'react';
import { doctorService } from '../../services/doctorService';
import { DoctorCard } from '../../components/doctors/DoctorCard';
import { BookingModal } from '../../components/doctors/BookingModal';
import { Doctor } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Stethoscope, Search, ShieldCheck } from 'lucide-react';

export const DoctorsPage: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const doctors = doctorService.getDoctors().filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenBooking = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Badge variant="mint" icon={<Stethoscope className="w-3.5 h-3.5" />}>100% Verified Care Directory</Badge>
          <h1 className="text-2xl font-bold text-white mt-1">Clinical Nutritionists & Healthcare Experts</h1>
          <p className="text-xs text-slate-400">Book direct tele-consultations for personalized metabolic and dietary treatment plans.</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search specialty, name..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-emerald-900/50 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} onBook={handleOpenBooking} />
        ))}
      </div>

      {/* Booking Modal Flow */}
      <BookingModal
        doctor={selectedDoctor}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};
