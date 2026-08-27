import React from 'react';
import {
  ArrowRight,
  Clock,
  AlertCircle,
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { Department } from '../../types';
import { DynamicIcon } from './DynamicIcon';

interface DepartmentCardProps {
  department: Department;
  onSelect: (department: Department) => void;
  onBook: (departmentId: string) => void;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({
  department,
  onSelect,
  onBook
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-blue-300">
      {/* Top Image & Icon Header */}
      <div className="relative h-40 bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onSelect(department)}>
        <img
          src={department.image}
          alt={department.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />

        {/* Floating Department Icon */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-600/90 backdrop-blur-xs flex items-center justify-center text-white shadow-md border border-blue-400/40">
            <DynamicIcon name={department.iconName} className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base leading-tight group-hover:text-sky-300 transition-colors">
              {department.name}
            </h3>
          </div>
        </div>

        {department.emergencySupport && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-rose-600/90 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs backdrop-blur-xs">
            24/7 ER
          </span>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
          {department.shortDescription}
        </p>

        {/* Key Services Preview */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Top Services:</p>
          <ul className="text-xs text-slate-700 space-y-1">
            {department.servicesOffered.slice(0, 2).map((srv, idx) => (
              <li key={idx} className="flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                <span className="truncate">{srv}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="p-5 pt-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelect(department)}
          className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 group/btn cursor-pointer"
        >
          <span>Department Details</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => onBook(department.id)}
          className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          Book Slot
        </button>
      </div>
    </div>
  );
};
