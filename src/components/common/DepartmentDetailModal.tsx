import React from 'react';
import {
  X,
  Phone,
  Clock,
  AlertCircle,
  Calendar,
  CheckCircle2,
  Users,
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { Department, Doctor } from '../../types';
import { doctorsData } from '../../data/doctorsData';
import { DynamicIcon } from './DynamicIcon';

interface DepartmentDetailModalProps {
  department: Department | null;
  isOpen: boolean;
  onClose: () => void;
  onBookDepartment: (departmentId: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export const DepartmentDetailModal: React.FC<DepartmentDetailModalProps> = ({
  department,
  isOpen,
  onClose,
  onBookDepartment,
  onSelectDoctor
}) => {
  if (!isOpen || !department) return null;

  const departmentDoctors = doctorsData.filter(d => d.departmentId === department.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with Image & Gradient */}
        <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden shrink-0">
          <img
            src={department.image}
            alt={department.name}
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Department Title Header */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600/90 backdrop-blur-xs flex items-center justify-center border border-blue-400/40 text-white shadow-md">
                <DynamicIcon name={department.iconName} className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 border border-blue-400/30 uppercase tracking-wider">
                  Center of Excellence
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5">{department.name}</h3>
              </div>
            </div>

            {department.emergencySupport && (
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 shrink-0">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>24/7 Emergency Support</span>
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <p className="text-slate-500 font-medium">Department Head</p>
              <p className="font-bold text-slate-800 truncate">{department.headOfDepartment}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Internal Extension</p>
              <p className="font-bold text-blue-700">{department.phoneExtension}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Operating Schedule</p>
              <p className="font-bold text-slate-800 truncate">{department.openingHours}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Specialist Doctors</p>
              <p className="font-bold text-emerald-700">{departmentDoctors.length} On Duty</p>
            </div>
          </div>

          {/* Department Overview */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900">Clinical Overview</h4>
            <p className="text-sm text-slate-600 leading-relaxed bg-blue-50/30 p-4 rounded-xl border border-blue-100/70">
              {department.fullOverview}
            </p>
          </div>

          {/* Two-Column: Services Offered & Conditions Treated */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Services Offered */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-blue-600" />
                <span>Specialized Services & Procedures</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {department.servicesOffered.map((srv, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{srv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conditions Treated */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-sky-600" />
                <span>Common Conditions Treated</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {department.commonConditions.map((cond, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200"
                  >
                    {cond}
                  </span>
                ))}
              </div>

              {/* Department Key Stats */}
              <div className="pt-2">
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Department Stats</h5>
                <div className="grid grid-cols-3 gap-2">
                  {department.stats.map((st, idx) => (
                    <div key={idx} className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-200/60 text-center">
                      <p className="text-sm font-bold text-blue-900">{st.value}</p>
                      <p className="text-[10px] text-blue-700 leading-tight mt-0.5">{st.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Department Faculty / Doctors List */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Department Specialists & Faculty ({departmentDoctors.length})</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {departmentDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
                    />
                    <div className="text-xs">
                      <p className="font-bold text-slate-900">{doc.name}</p>
                      <p className="text-blue-700 font-medium">{doc.specialty}</p>
                      <p className="text-slate-500 text-[11px]">{doc.experienceYears} Years Exp • {doc.timing}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectDoctor(doc);
                    }}
                    className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold shrink-0"
                    title="View Doctor Profile"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Have questions about {department.name}? Call extension <strong>{department.phoneExtension}</strong>.
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
                onBookDepartment(department.id);
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment with Department</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
