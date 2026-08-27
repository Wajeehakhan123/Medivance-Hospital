import React, { useState, useMemo } from 'react';
import {
  Activity,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Phone,
  Calendar,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { MedicalService, PageId } from '../../types';
import { servicesData } from '../../data/servicesData';
import { ServiceCard } from '../common/ServiceCard';

interface ServicesPageProps {
  onOpenBookingModal: (deptId?: string) => void;
  onNavigate: (page: PageId) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenBookingModal,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Critical Care', 'Diagnostics & Lab', 'Surgical & Inpatient', 'Pharmacy & Support', 'Wellness & Outpatient'];

  const filteredServices = useMemo(() => {
    return servicesData.filter((srv) => {
      const matchesSearch =
        srv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        srv.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        srv.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchesSearch) return false;

      if (selectedCategory !== 'All' && srv.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-12 pb-16">
      {/* Banner */}
      <section className="bg-slate-900 text-white py-14 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30 uppercase tracking-wider">
            Comprehensive Medical Facilities
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Hospital Services & Clinical Care
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From 24/7 advanced life support and digital diagnostic imaging to minimally invasive day surgery suites and customized preventive wellness checkups.
          </p>
        </div>
      </section>

      {/* Search and Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="search-services-input"
              placeholder="Search medical services or tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBookService={() => onOpenBookingModal()}
            />
          ))}
        </div>
      </section>

      {/* Package Highlight Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-blue-800 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
              Preventive Healthcare Plans
            </span>
            <h3 className="text-2xl font-bold text-white">
              Book an Executive Full-Body Health Checkup
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Comprehensive blood profiles, cardio screening, 3T MRI/CT, cancer markers, and full consultation review with our senior physician team.
            </p>
          </div>

          <button
            onClick={() => onOpenBookingModal()}
            className="px-6 py-3.5 rounded-xl bg-white text-blue-950 font-bold text-xs hover:bg-sky-50 shadow-md transition-colors shrink-0 cursor-pointer"
          >
            Inquire for Checkup Packages →
          </button>
        </div>
      </section>
    </div>
  );
};
