import React, { useState } from 'react';
import { useApp } from '../../context/DoctorAdminContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StarRating } from '../../components/ui/StarRating';
import { EditProfileModal } from '../../components/modals/EditProfileModal';
import {
  User,
  Mail,
  Phone,
  Award,
  BookOpen,
  ShieldCheck,
  Star,
  Edit,
  ExternalLink,
  CheckCircle,
  Calendar,
  Clock,
} from 'lucide-react';

export const DoctorProfilePage: React.FC = () => {
  const { doctor, toggleDoctorOnline, reviews } = useApp();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Profile Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-brand-500 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                {doctor.name}
              </h1>
              <Badge variant="success" dot className="px-2.5 py-1">
                Verified Doctor
              </Badge>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-400 mt-1">
              {doctor.specialization}
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-slate-400" />
                {doctor.experienceYears} Years Experience
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-slate-400" />
                Joined {doctor.joinedDate}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Edit Profile Button */}
          <Button
            variant="outline"
            size="md"
            onClick={() => setIsEditModalOpen(true)}
            leftIcon={<Edit className="w-4 h-4" />}
          >
            Edit Profile
          </Button>

          {/* Availability Toggle */}
          <Button
            variant={doctor.isOnline ? 'success' : 'secondary'}
            size="md"
            onClick={toggleDoctorOnline}
            leftIcon={<Clock className="w-4 h-4" />}
          >
            {doctor.isOnline ? 'Online' : 'Offline'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Personal & Professional Details (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Full Name</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{doctor.name}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Email Address</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {doctor.email}
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800 sm:col-span-2">
                <span className="text-xs text-slate-400 block mb-1">Phone Number</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {doctor.phone}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Professional Credentials & Qualifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">Specialization</span>
                  <span className="font-bold text-brand-600 dark:text-brand-400">
                    {doctor.specialization}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">Experience</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {doctor.experienceYears} Years Clinical Practice
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1 font-semibold uppercase tracking-wider">
                  Degrees & Certifications
                </span>
                <p className="font-mono text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                  {doctor.qualification}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Verification Section */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Verification Status & Doctorate Certificate
              </CardTitle>
              <Badge variant="success" dot>
                {doctor.status.toUpperCase()}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Your Doctorate Certificate and Medical Council Licence have been re-verified by NutriWell Medical Board on 01 Sep 2026.
              </p>

              {/* Doctorate Certificate Preview */}
              <div className="relative group rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-md">
                <img
                  src={doctor.certificateUrl}
                  alt="Doctorate Certificate"
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <a
                    href={doctor.certificateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-white text-slate-900 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg"
                  >
                    View Full Certificate <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Ratings Summary & Reviews (1 Col) */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                Ratings Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-amber-50/50 dark:bg-amber-950/30 rounded-2xl border border-amber-200/60 dark:border-amber-900/40">
                <span className="text-4xl font-black text-slate-900 dark:text-slate-100 block">
                  {doctor.rating}
                </span>
                <div className="flex justify-center mt-1">
                  <StarRating rating={doctor.rating} size="lg" />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-2">
                  Based on {doctor.reviewCount} patient reviews
                </span>
              </div>

              {/* Patient Reviews Breakdown */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Recent Patient Reviews
                </h4>
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-slate-100">{rev.patientName}</span>
                      <StarRating rating={rev.overallRating} size="sm" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 italic line-clamp-2">
                      "{rev.comments}"
                    </p>
                    <span className="text-[10px] text-slate-400 block text-right">{rev.submittedAt}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Profile Modal Instance */}
      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </div>
  );
};
