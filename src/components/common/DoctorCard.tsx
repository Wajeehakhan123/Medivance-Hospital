import React from 'react';
import {
  Star,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Stethoscope,
  CheckCircle2
} from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorCardProps {
  doctor: Doctor;
  onSelect: (doctor: Doctor) => void;
  onBook: (doctorId: string, departmentId: string) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onSelect,
  onBook
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-blue-300">
      {/* Top Banner / Image Area */}
      <div className="p-5 pb-0">
        <div className="flex gap-4 items-start">
          {/* Doctor Avatar */}
          <div className="relative shrink-0 cursor-pointer" onClick={() => onSelect(doctor)}>
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-slate-100 shadow-xs group-hover:scale-105 transition-transform duration-300"
            />
            {doctor.featured && (
              <span className="absolute -top-2 -left-2 px-1.5 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                Top Rated
              </span>
            )}
          </div>

          {/* Info Header */}
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md truncate max-w-full">
                {doctor.departmentName}
              </span>
            </div>

            <h3
              onClick={() => onSelect(doctor)}
              className="font-bold text-slate-900 text-base sm:text-lg truncate group-hover:text-blue-600 transition-colors cursor-pointer"
            >
              {doctor.name}
            </h3>

            <p className="text-xs text-slate-600 font-medium line-clamp-1">{doctor.specialty}</p>

            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-amber-900">{doctor.rating}</span>
              </div>
              <span className="text-[11px] text-slate-400">• {doctor.experienceYears} Years Exp</span>
            </div>
          </div>
        </div>

        {/* Qualifications & Schedule */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
          <p className="text-[11px] text-slate-500 font-medium truncate">
            {doctor.qualifications}
          </p>

          <div className="flex items-center gap-1.5 text-slate-600">
            <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">{doctor.timing}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600">
            <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">Days: {doctor.availability.join(', ')}</span>
          </div>
        </div>

        {/* Key Expertise Chips */}
        <div className="flex flex-wrap gap-1.5 mt-3 pt-2">
          {doctor.expertise.slice(0, 2).map((exp, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium truncate max-w-full"
            >
              {exp}
            </span>
          ))}
          {doctor.expertise.length > 2 && (
            <span className="text-[10px] px-1.5 py-0.5 text-slate-400 font-medium">
              +{doctor.expertise.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-5 pt-4 mt-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelect(doctor)}
          className="text-xs font-semibold text-slate-700 hover:text-blue-700 px-3 py-2 rounded-lg hover:bg-slate-200/70 transition-colors"
        >
          View Profile
        </button>

        <button
          onClick={() => onBook(doctor.id, doctor.departmentId)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-blue-600/20 hover:shadow-md transition-all cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Appointment</span>
        </button>
      </div>
    </div>
  );
};
