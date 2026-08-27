import React from 'react';
import {
  X,
  Star,
  Award,
  Clock,
  Calendar,
  Languages,
  MapPin,
  Stethoscope,
  GraduationCap,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorDetailModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: (doctorId: string, departmentId: string) => void;
}

export const DoctorDetailModal: React.FC<DoctorDetailModalProps> = ({
  doctor,
  isOpen,
  onClose,
  onBookAppointment
}) => {
  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
              {doctor.departmentName}
            </span>
            <span className="text-xs text-slate-400">• Doctor Profile</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Profile Overview */}
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="relative shrink-0">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-2 border-slate-100 shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1.5 rounded-xl shadow-xs">
                <Stethoscope className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-2xl font-bold text-slate-900">{doctor.name}</h3>
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-amber-900">{doctor.rating}</span>
                  <span className="text-[11px] text-amber-700">({doctor.reviewsCount} reviews)</span>
                </div>
              </div>

              <p className="text-blue-700 font-semibold text-sm">{doctor.specialty}</p>
              <p className="text-xs text-slate-500">{doctor.qualifications}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                  <p className="text-[11px] text-slate-500 font-medium">Experience</p>
                  <p className="text-sm font-bold text-slate-800">{doctor.experienceYears}+ Years</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                  <p className="text-[11px] text-slate-500 font-medium">Consultation Fee</p>
                  <p className="text-sm font-bold text-emerald-700">{doctor.consultationFee}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 col-span-2 sm:col-span-1">
                  <p className="text-[11px] text-slate-500 font-medium">Location</p>
                  <p className="text-xs font-bold text-slate-800 truncate">{doctor.roomNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Professional Biography</span>
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed bg-blue-50/30 p-4 rounded-xl border border-blue-100">
              {doctor.bio}
            </p>
          </div>

          {/* Areas of Clinical Expertise */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900">Clinical Focus & Specializations</h4>
            <div className="flex flex-wrap gap-2">
              {doctor.expertise.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/70 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Education & Fellowships */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Education & Medical Training</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {doctor.education.map((edu, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>{edu}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Schedule & Consultation Hours */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">Consultation Days</p>
                <p className="text-slate-600">{doctor.availability.join(' • ')}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">Clinic Timings</p>
                <p className="text-slate-600">{doctor.timing}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Languages className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">Languages Spoken</p>
                <p className="text-slate-600">{doctor.languages.join(', ')}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">OPD Room</p>
                <p className="text-slate-600">{doctor.roomNumber}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Consultation by confirmed appointment. Same-day emergency walk-ins accepted.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookAppointment(doctor.id, doctor.departmentId);
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment with {doctor.name.split(' ')[1] || doctor.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
