import React from 'react';
import {
  CheckCircle2,
  Clock,
  ChevronRight,
  Shield,
  ArrowUpRight
} from 'lucide-react';
import { MedicalService } from '../../types';
import { DynamicIcon } from './DynamicIcon';

interface ServiceCardProps {
  service: MedicalService;
  onSelect?: (service: MedicalService) => void;
  onBookService?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelect,
  onBookService
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-blue-300">
      <div className="p-6">
        {/* Category & Icon Header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <DynamicIcon name={service.iconName} className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {service.category}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
          {service.title}
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
          {service.shortDesc}
        </p>

        {/* Features Checklist */}
        <div className="space-y-1.5 pt-3 border-t border-slate-100">
          {service.features.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Bottom / Action */}
      <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 font-medium truncate max-w-[55%]">
          <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="truncate">{service.turnaroundTime}</span>
        </div>

        {onBookService && (
          <button
            onClick={onBookService}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group/btn cursor-pointer"
          >
            <span>Inquire / Book</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};
