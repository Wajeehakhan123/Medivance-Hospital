import React from 'react';
import { X, Calendar, Shield } from 'lucide-react';
import { AppointmentForm } from './AppointmentForm';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDepartmentId?: string;
  initialDoctorId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialDepartmentId = '',
  initialDoctorId = ''
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-sky-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-snug">Book Doctor Appointment</h3>
              <p className="text-xs text-blue-100">Medivance Multi-Specialty Hospital</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto">
          <AppointmentForm
            initialDepartmentId={initialDepartmentId}
            initialDoctorId={initialDoctorId}
            isModal={true}
          />
        </div>
      </div>
    </div>
  );
};
