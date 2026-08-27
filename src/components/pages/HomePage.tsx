import React, { useState } from 'react';
import {
  Calendar,
  Phone,
  Shield,
  Activity,
  Heart,
  Clock,
  Award,
  Users,
  Building,
  Sparkles,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  Star,
  Ambulance,
  CreditCard,
  MapPin,
  HelpCircle,
  FileText
} from 'lucide-react';
import { PageId, Doctor, Department, BlogPost, MedicalService } from '../../types';
import { departmentsData } from '../../data/departmentsData';
import { doctorsData } from '../../data/doctorsData';
import { servicesData } from '../../data/servicesData';
import { blogData } from '../../data/blogData';
import { testimonialsData } from '../../data/testimonialsData';
import { faqData } from '../../data/faqData';
import { insurancePartners } from '../../data/patientInfoData';
import { DoctorCard } from '../common/DoctorCard';
import { DepartmentCard } from '../common/DepartmentCard';
import { ServiceCard } from '../common/ServiceCard';
import { BlogCard } from '../common/BlogCard';

interface HomePageProps {
  onNavigate: (page: PageId, params?: { departmentId?: string; doctorId?: string; blogId?: string }) => void;
  onOpenBookingModal: (deptId?: string, docId?: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onSelectDepartment: (department: Department) => void;
  onSelectBlog: (post: BlogPost) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBookingModal,
  onSelectDoctor,
  onSelectDepartment,
  onSelectBlog
}) => {
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('All');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  const featuredDepartments = departmentsData.filter(d => d.featured).slice(0, 6);
  const featuredDoctors = doctorsData.filter(d => d.featured).slice(0, 4);
  const keyServices = servicesData.slice(0, 6);
  const latestArticles = blogData.slice(0, 3);

  const homeFaqs = faqData.slice(0, 5);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 text-white overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-xs">
                <Shield className="w-4 h-4 text-sky-400" />
                <span>Ranked #1 Regional Multi-Specialty Medical Institute</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Compassionate Care,<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-300 to-white">
                  Trusted Healthcare
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Welcome to Medivance Hospital. Delivering world-class, patient-centered clinical care across 19 specialized medical centers with cutting-edge robotic technology, board-certified physicians, and 24/7 dedicated emergency trauma teams.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="hero-book-btn"
                  onClick={() => onOpenBookingModal()}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book an Appointment</span>
                </button>

                <button
                  id="hero-services-btn"
                  onClick={() => onNavigate('services')}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm backdrop-blur-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 text-sky-300" />
                </button>
              </div>

              {/* Quick Emergency Call Strip */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-rose-300 font-bold">24/7 Emergency:</span>
                  <a href="tel:5559112273" className="font-bold text-white hover:text-rose-300 underline decoration-rose-400">
                    (555) 911-CARE
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero-Wait ER Triage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>JCI Gold Standard</span>
                </div>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80"
                    alt="Medivance Modern Medical Facility"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="p-6 bg-slate-900/95 backdrop-blur-md border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                          <Stethoscope className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Medical Excellence</p>
                          <h4 className="font-bold text-white text-sm">38+ Board-Certified Doctors</h4>
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                        Active Today
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      Instant online booking for 19 clinical departments. Same-day emergency walk-ins always welcome.
                    </p>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-5 -left-5 bg-white text-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-200 hidden sm:flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">4.9 / 5.0 Rating</p>
                    <p className="text-[11px] text-slate-500">Over 15,000+ Patient Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 4-PILLAR EMERGENCY & CLINICAL HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: 24/7 Emergency */}
          <div
            onClick={() => onNavigate('emergency')}
            className="p-6 rounded-2xl bg-white border border-rose-200 shadow-md hover:shadow-xl transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Ambulance className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-rose-600 transition-colors">
              24/7 Emergency Care
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Level 1 trauma resuscitation, dedicated cardiac catheterization, and rapid stroke response.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600">
              Call (555) 911-CARE →
            </span>
          </div>

          {/* Card 2: Find a Doctor */}
          <div
            onClick={() => onNavigate('doctors')}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
              Qualified Specialists
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Consult with internationally trained doctors, surgeons, and department chairs.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600">
              Browse Doctor Directory →
            </span>
          </div>

          {/* Card 3: 24/7 Pharmacy */}
          <div
            onClick={() => onNavigate('services')}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-600 transition-colors">
              24/7 In-House Pharmacy
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Authentic temperature-controlled medications, compounding, and electronic refills.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
              Pharmacy & Services →
            </span>
          </div>

          {/* Card 4: Easy Appointment */}
          <div
            onClick={() => onOpenBookingModal()}
            className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-600 text-white shadow-md hover:shadow-xl transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base">
              Online OPD Booking
            </h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              Book consultations, follow-ups, or second opinions with zero wait times.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-white underline">
              Book Appointment Now →
            </span>
          </div>
        </div>
      </section>

      {/* 3. HOSPITAL STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-sky-400">180+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">Specialist Doctors</p>
              <p className="text-[11px] text-slate-500">Board-certified clinicians</p>
            </div>

            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-blue-400">19</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">Medical Departments</p>
              <p className="text-[11px] text-slate-500">Centers of excellence</p>
            </div>

            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400">150,000+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">Patients Served</p>
              <p className="text-[11px] text-slate-500">Compassionate healing</p>
            </div>

            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400">25+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">Years of Excellence</p>
              <p className="text-[11px] text-slate-500">Continuous trusted care</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED DEPARTMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <Building className="w-4 h-4" />
              <span>Centers of Medical Excellence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Featured Hospital Departments
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mt-1">
              From advanced interventional cardiology to robot-assisted orthopedics, our multi-disciplinary departments deliver world-class medical outcomes.
            </p>
          </div>

          <button
            onClick={() => onNavigate('departments')}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>View All 19 Departments</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDepartments.map((dept) => (
            <DepartmentCard
              key={dept.id}
              department={dept}
              onSelect={onSelectDepartment}
              onBook={(deptId) => onOpenBookingModal(deptId)}
            />
          ))}
        </div>
      </section>

      {/* 5. WHY CHOOSE MEDIVANCE HOSPITAL */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
              Why Choose Medivance Hospital
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
              Uncompromising Quality & Patient-First Philosophy
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We combine compassionate bedside manner with cutting-edge medical diagnostic technologies to ensure each patient receives personalized care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Gold Standard Accreditations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                JCI (Joint Commission International) Gold Seal and NABH accredited, adhering to the world’s most stringent patient safety and clinical protocols.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Advanced Diagnostic Precision</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Equipped with 3T Silent MRI, 128-Slice Low-Dose CT, robotic surgery suites, and fully automated robotic pathology labs with same-day reports.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">24/7 Rapid Emergency Triage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Immediate door-to-balloon time under 45 minutes for acute cardiac arrest and comprehensive stroke thrombolysis protocols around the clock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED DOCTORS DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <Stethoscope className="w-4 h-4" />
              <span>Medical Faculty & Specialists</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Meet Our Senior Specialists
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mt-1">
              Our multidisciplinary team of board-certified clinicians bring decades of specialized clinical experience from leading global medical centers.
            </p>
          </div>

          <button
            onClick={() => onNavigate('doctors')}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>View All Doctors ({doctorsData.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDoctors.map((doc) => (
            <DoctorCard
              key={doc.id}
              doctor={doc}
              onSelect={onSelectDoctor}
              onBook={(docId, deptId) => onOpenBookingModal(deptId, docId)}
            />
          ))}
        </div>
      </section>

      {/* 7. KEY MEDICAL SERVICES */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Comprehensive Healthcare Facilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Key Medical & Clinical Services
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl mt-1">
                From high-resolution radiology and surgical suites to outpatient physiotherapy and executive health checks.
              </p>
            </div>

            <button
              onClick={() => onNavigate('services')}
              className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              <span>Explore All 16 Services</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBookService={() => onOpenBookingModal()}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. PATIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Patient Stories & Recovery
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Healing Words from Those We've Served
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Real experiences from patients who entrusted their health to Medivance Hospital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsData.map((test) => (
            <div
              key={test.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  "{test.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={test.avatar}
                  alt={test.patientName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">{test.patientName}</p>
                  <p className="text-[11px] text-blue-700 font-medium">{test.treatment}</p>
                  <p className="text-[10px] text-slate-400">{test.doctorName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. INSURANCE & PAYMENT PARTNERS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-blue-800 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
                <CreditCard className="w-4 h-4" />
                <span>Zero-Hassle Cashless Treatment</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Partnered with 45+ Major Health Insurance Networks
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Our 24/7 on-site insurance desk provides immediate pre-authorization, cashless hospital admissions, and flexible 0% APR installment financing for elective procedures.
              </p>
            </div>

            <button
              onClick={() => onNavigate('patient-info')}
              className="self-start lg:self-center px-6 py-3.5 rounded-xl bg-white text-blue-950 font-bold text-xs hover:bg-sky-50 shadow-md transition-colors shrink-0 cursor-pointer"
            >
              View Insurance & Payment Guide →
            </button>
          </div>

          <div className="pt-4 border-t border-blue-800/80 flex flex-wrap items-center gap-2 sm:gap-3">
            {insurancePartners.slice(0, 8).map((ins, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-blue-950/80 border border-blue-700/60 text-blue-200 text-xs font-medium"
              >
                {ins}
              </span>
            ))}
            <span className="text-xs text-sky-400 font-semibold px-2">
              + 35 more TPA networks
            </span>
          </div>
        </div>
      </section>

      {/* 10. LATEST HEALTH BLOG & MEDICAL ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Medical Education & Insights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Latest Health & Wellness Articles
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mt-1">
              Evidence-based medical guidance authored and verified by Medivance senior clinical faculty.
            </p>
          </div>

          <button
            onClick={() => onNavigate('blog')}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Visit Health Blog</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onReadMore={onSelectBlog}
            />
          ))}
        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Patient Help & Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Quick answers regarding appointments, insurance, emergency care, and records.
            </p>
          </div>

          <div className="space-y-3">
            {homeFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <span className="text-blue-600 font-bold text-lg shrink-0">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-blue-50/20">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('faqs')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 underline"
            >
              View Full FAQ Knowledgebase →
            </button>
          </div>
        </div>
      </section>

      {/* 12. CAMPUS LOCATION & DIRECT CONTACT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Medivance Medical Campus</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Ready to Experience Compassionate Healthcare?
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              Located conveniently at <strong>742 Healthcare Boulevard, Medical District Campus</strong> with multi-level covered parking, metro connectivity, and 24/7 valet assistance.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700 pt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Open 24 Hours / 7 Days a Week</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>OPD Desk: (555) 019-2834</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              onClick={() => onOpenBookingModal()}
              className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors text-center cursor-pointer"
            >
              Book an Appointment
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full py-3.5 px-6 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-colors text-center cursor-pointer"
            >
              Get Campus Directions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
