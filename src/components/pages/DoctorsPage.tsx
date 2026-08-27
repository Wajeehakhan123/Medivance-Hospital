import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Stethoscope,
  Star,
  Users,
  Award,
  Calendar,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { Doctor, PageId } from '../../types';
import { doctorsData } from '../../data/doctorsData';
import { departmentsData } from '../../data/departmentsData';
import { DoctorCard } from '../common/DoctorCard';

interface DoctorsPageProps {
  onSelectDoctor: (doctor: Doctor) => void;
  onOpenBookingModal: (deptId?: string, docId?: string) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({
  onSelectDoctor,
  onOpenBookingModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'experience' | 'rating' | 'name'>('experience');

  const filteredDoctors = useMemo(() => {
    return doctorsData
      .filter((doc) => {
        const matchesSearch =
          doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.qualifications.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()));

        if (!matchesSearch) return false;

        if (selectedDepartment !== 'all' && doc.departmentId !== selectedDepartment) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [searchTerm, selectedDepartment, sortBy]);

  return (
    <div className="space-y-12 pb-16">
      {/* Banner */}
      <section className="bg-slate-900 text-white py-14 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30 uppercase tracking-wider">
            Distinguished Medical Faculty
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Find Your Specialist Doctor
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Over 38 board-certified consultants, surgeons, and specialists dedicated to delivering evidence-based, compassionate care across all clinical disciplines.
          </p>
        </div>
      </section>

      {/* Search & Filter Control Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="search-doctors-input"
                placeholder="Search by physician name, specialty, or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-slate-50/50"
              />
            </div>

            {/* Department Filter */}
            <div className="md:col-span-4">
              <select
                id="filter-doctor-department"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              >
                <option value="all">All Departments ({departmentsData.length})</option>
                {departmentsData.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div className="md:col-span-2">
              <select
                id="sort-doctors-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              >
                <option value="experience">Sort: Experience</option>
                <option value="rating">Sort: Top Rated</option>
                <option value="name">Sort: Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Quick Department Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs">
            <span className="text-slate-400 font-semibold shrink-0">Quick Filter:</span>
            <button
              onClick={() => setSelectedDepartment('all')}
              className={`px-3 py-1 rounded-lg shrink-0 font-medium transition-colors ${
                selectedDepartment === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Specialists
            </button>
            {departmentsData.slice(0, 7).map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDepartment(d.id)}
                className={`px-3 py-1 rounded-lg shrink-0 font-medium transition-colors ${
                  selectedDepartment === d.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs sm:text-sm text-slate-500">
            Showing <strong className="text-slate-900">{filteredDoctors.length}</strong> qualified medical specialist(s)
          </p>

          {(searchTerm || selectedDepartment !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDepartment('all');
              }}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No doctors match your criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Please adjust your department selection or search query.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDepartment('all');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700"
            >
              Show All Doctors
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDoctors.map((doc) => (
              <DoctorCard
                key={doc.id}
                doctor={doc}
                onSelect={onSelectDoctor}
                onBook={(docId, deptId) => onOpenBookingModal(deptId, docId)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
