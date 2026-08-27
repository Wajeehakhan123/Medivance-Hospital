import React, { useState } from 'react';
import { Phone, Calendar, Heart, X, MessageCircle, AlertTriangle } from 'lucide-react';
import { PageId } from '../../types';

interface QuickEmergencyFloatProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const QuickEmergencyFloat: React.FC<QuickEmergencyFloatProps> = ({
  onNavigate,
  onOpenBookingModal
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
      {/* Expanded Quick Action Menu */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 w-72 space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800">Quick Patient Assistance</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Emergency 911 Direct Link */}
          <a
            href="tel:5559112273"
            className="flex items-center gap-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 hover:bg-rose-100 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 fill-white animate-pulse" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-rose-950">24/7 Emergency Line</p>
              <p className="font-mono text-rose-700 font-bold">(555) 911-CARE</p>
            </div>
          </a>

          {/* Book Appointment CTA */}
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenBookingModal();
            }}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 hover:bg-blue-100 transition-colors text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-blue-950">Book Doctor Appointment</p>
              <p className="text-blue-700">Online OPD Scheduling</p>
            </div>
          </button>

          {/* Emergency Guide Link */}
          <button
            onClick={() => {
              setIsOpen(false);
              onNavigate('emergency');
            }}
            className="w-full py-2 text-center text-xs font-semibold text-slate-600 hover:text-rose-600 transition-colors border-t border-slate-100 pt-2"
          >
            View 24/7 Emergency Center & Directions →
          </button>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        id="quick-patient-float-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900 text-white shadow-xl hover:shadow-2xl hover:bg-blue-600 transition-all border border-slate-700 cursor-pointer group"
        aria-label="Quick Patient Help"
      >
        <div className="relative">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 group-hover:text-white group-hover:fill-white animate-pulse" />
        </div>
        <span className="text-xs font-bold tracking-wide">Emergency / Book</span>
      </button>
    </div>
  );
};
