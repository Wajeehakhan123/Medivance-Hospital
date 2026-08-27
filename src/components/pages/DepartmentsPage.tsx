import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Building,
  AlertCircle,
  Stethoscope,
  ChevronRight,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Department, PageId } from '../../types';
import { departmentsData } from '../../data/departmentsData';
import { DepartmentCard } from '../common/DepartmentCard';

interface DepartmentsPageProps {
  onSelectDepartment: (dept: Department) => void;
  onOpenBookingModal: (deptId?: string) => void;
}

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({
  onSelectDepartment,
  onOpenBookingModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'featured' | 'emergency' | 'critical'>('all');

  const filteredDepartments = useMemo(() => {
    return departmentsData.filter((dept) => {
      const matchesSearch =
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.servicesOffered.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        dept.commonConditions.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchesSearch) return false;

      if (selectedFilter === 'featured') return dept.featured;
      if (selectedFilter === 'emergency') return dept.emergencySupport;
      if (selectedFilter === 'critical') return dept.id === 'icu-critical-care' || dept.id === 'emergency-medicine' || dept.id === 'cardiology';

      return true;
    });
  }, [searchTerm, selectedFilter]);

  return (
    <div className="space-y-12 pb-16">
      {/* Banner */}
      <section className="bg-slate-900 text-white py-14 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30 uppercase tracking-wider">
            Clinical Centers of Excellence
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Medical Departments & Specialty Institutes
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Medivance Hospital houses 19 specialized medical centers, combining advanced therapeutic technologies with internationally acclaimed clinical chairs and multidisciplinary care pathways.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="search-departments"
              placeholder="Search departments, conditions, or treatments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-slate-50/50"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </span>

            {[
              { label: 'All Centers (19)', value: 'all' as const },
              { label: 'Featured Institutes', value: 'featured' as const },
              { label: '24/7 Emergency Support', value: 'emergency' as const },
              { label: 'Critical & ICU', value: 'critical' as const }
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setSelectedFilter(f.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  selectedFilter === f.value
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredDepartments.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <Building className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No departments match your search</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try searching with general terms like "Heart", "Cancer", "Eye", or clear your filter options.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedFilter('all');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepartments.map((dept) => (
              <DepartmentCard
                key={dept.id}
                department={dept}
                onSelect={onSelectDepartment}
                onBook={(deptId) => onOpenBookingModal(deptId)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Emergency Department Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-rose-950 text-sm">Need Urgent or Life-Threatening Emergency Care?</h4>
              <p className="text-xs text-rose-700">Our Emergency Trauma Resuscitation Center is open 24 hours a day, 365 days a year.</p>
            </div>
          </div>

          <a
            href="tel:5559112273"
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shrink-0 transition-colors"
          >
            Call Emergency (555) 911-CARE
          </a>
        </div>
      </section>
    </div>
  );
};
