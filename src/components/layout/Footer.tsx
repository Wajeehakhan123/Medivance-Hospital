import React from 'react';
import {
  Shield,
  Activity,
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  Calendar,
  ChevronRight,
  Award,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { PageId } from '../../types';

interface FooterProps {
  onNavigate: (page: PageId, params?: { departmentId?: string; doctorId?: string; blogId?: string }) => void;
  onOpenBookingModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBookingModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Emergency Callout */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-sky-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <div className="relative">
                  <Shield className="w-7 h-7 text-white" />
                  <Activity className="w-4 h-4 text-blue-100 absolute inset-0 m-auto" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">MEDIVANCE</span>
                <span className="text-xs font-semibold px-2 py-0.5 ml-2 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">HOSPITAL</span>
                <p className="text-xs text-slate-400">Compassionate Care, Trusted Healthcare</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Medivance Hospital is a state-of-the-art multi-specialty tertiary care center dedicated to delivering personalized, ethical, and world-class medical treatments backed by internationally accredited physicians.
            </p>

            {/* Emergency Hotline Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/60 to-slate-900 border border-rose-800/50 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
                <span>24/7 Rapid Emergency Response</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <a href="tel:5559112273" className="text-xl font-bold text-white hover:text-rose-300 transition-colors">
                    (555) 911-CARE
                  </a>
                  <p className="text-xs text-slate-400">Ambulance & Trauma Admissions</p>
                </div>
                <button
                  onClick={() => onNavigate('emergency')}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  ER Guide
                </button>
              </div>
            </div>

            {/* Accreditations */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>JCI Gold Accredited</span>
              </div>
              <span className="text-slate-700">•</span>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-amber-400" />
                <span>NABH Certified</span>
              </div>
              <span className="text-slate-700">•</span>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>ISO 9001:2026</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'About Our Hospital', page: 'about' as PageId },
                { label: 'Doctors Directory', page: 'doctors' as PageId },
                { label: 'Medical Services', page: 'services' as PageId },
                { label: 'Patient Information', page: 'patient-info' as PageId },
                { label: 'Health & Medical Blog', page: 'blog' as PageId },
                { label: 'Frequently Asked Questions', page: 'faqs' as PageId },
                { label: 'Contact & Campus Map', page: 'contact' as PageId }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1.5 group cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Departments */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Top Departments</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Cardiology & Heart', id: 'cardiology' },
                { name: 'Neurology & Stroke', id: 'neurology' },
                { name: 'Orthopedics & Joints', id: 'orthopedics' },
                { name: 'Pediatrics & NICU', id: 'pediatrics' },
                { name: 'Maternity & Obstetrics', id: 'gynecology-obstetrics' },
                { name: 'Cancer Center (Oncology)', id: 'oncology' },
                { name: 'Emergency Medicine', id: 'emergency-medicine' }
              ].map((dept, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate('departments', { departmentId: dept.id })}
                    className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1.5 group cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" />
                    <span>{dept.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Hospital Campus */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Hospital Contact</h3>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                <span>
                  742 Healthcare Boulevard<br />
                  Medical District Campus<br />
                  Metro City, MC 90210
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <p className="text-white font-medium">(555) 019-2834</p>
                  <p className="text-xs text-slate-500">General Enquiries & OPD</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-xs">contact@medivancehospital.com</span>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <div className="text-xs">
                  <p className="text-emerald-300 font-medium">Hospital Open 24/7</p>
                  <p className="text-slate-400">OPD Clinics: 8:00 AM - 8:00 PM</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="footer-book-btn"
                  onClick={onOpenBookingModal}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>© {new Date().getFullYear()} Medivance Hospital & Healthcare Institute. All rights reserved.</p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Medical disclaimer: Information on this website is for educational purposes and should not replace professional medical diagnosis.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('privacy')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => onNavigate('terms')}
              className="hover:text-slate-300 transition-colors"
            >
              Terms & Conditions
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => onNavigate('patient-info')}
              className="hover:text-slate-300 transition-colors"
            >
              Patient Rights
            </button>
            <span className="text-slate-700">•</span>
            <button
              id="footer-admin-link-btn"
              onClick={() => onNavigate('admin')}
              className="text-slate-400 hover:text-sky-400 font-medium transition-colors flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 hover:border-slate-700"
              title="Hospital Administration & Booking Management"
            >
              <Shield className="w-3 h-3 text-sky-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
