import React from 'react';
import {
  Award,
  Shield,
  Heart,
  Users,
  Target,
  CheckCircle2,
  Calendar,
  Sparkles,
  Building,
  TrendingUp,
  Stethoscope
} from 'lucide-react';
import { PageId } from '../../types';

interface AboutUsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate, onOpenBookingModal }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center max-w-3xl">
          <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30 uppercase tracking-wider">
            About Medivance Hospital
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Setting the Benchmark for Clinical Excellence & Patient Dignity
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Founded in 2001, Medivance Hospital has evolved into a premier 650-bed quaternary healthcare institution offering comprehensive medical specialties, cutting-edge surgical suites, and compassionate patient care.
          </p>
        </div>
      </section>

      {/* Hospital Story & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Our Journey & Heritage
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Over Two Decades of Pioneering Healthcare
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Medivance Hospital was established with a singular vision: to bring world-class healthcare within reach of every community member, without compromising on ethical standards, empathy, or medical rigor.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Today, our medical campus features over 19 specialized clinical institutes, 24 operating theaters equipped with robotic da Vinci surgical systems, hybrid cath labs, and an internationally recognized medical research board.
            </p>

            {/* Core Values Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { title: 'Patient-First Compassion', desc: 'Personalized treatment pathways designed around comfort and family care.' },
                { title: 'Clinical Rigor', desc: 'Evidence-based protocols vetted by multidisciplinary tumor and cardiology boards.' },
                { title: 'Ethical Transparency', desc: 'Clear cost estimation, zero hidden fees, and thorough patient consent.' },
                { title: 'Innovation in Care', desc: 'Continuous adoption of minimally invasive and robotic surgical techniques.' }
              ].map((val, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{val.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed pl-6">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80"
              alt="Medivance Modern Operating Theater"
              className="w-full h-64 sm:h-72 object-cover rounded-2xl shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80"
              alt="Medivance Clinical Consultation"
              className="w-full h-64 sm:h-72 object-cover rounded-2xl shadow-md mt-6"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To deliver unmatched clinical outcomes through interdisciplinary collaboration, continuous clinical innovation, and empathetic care that respects the unique dignity of each patient.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Our Vision</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To be the healthcare provider of choice recognized regionally and globally for transformative medical breakthroughs, zero-harm patient safety, and accessible community wellness.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Quality & Accreditations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fully accredited by the Joint Commission International (JCI Gold Seal), NABH, and College of American Pathologists (CAP) for clinical laboratory quality assurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Medical Governance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Hospital Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Executive & Clinical Board
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Guiding Medivance with clinical integrity, administrative excellence, and continuous patient advocacy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: 'Dr. Arthur Vance, MD, FACS',
              role: 'President & Chief Executive Officer',
              sub: 'Cardiothoracic Surgery Leader',
              image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'
            },
            {
              name: 'Dr. Rebecca Stern, MD, PhD',
              role: 'Chief Medical Officer',
              sub: 'Chair, Oncology & Molecular Medicine',
              image: 'https://images.unsplash.com/photo-1594824813633-4f9e17b8f9e6?auto=format&fit=crop&w=400&q=80'
            },
            {
              name: 'Dr. Marcus Holloway, MD',
              role: 'Chief of Surgery',
              sub: 'Orthopedic Spine Surgery',
              image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80'
            },
            {
              name: 'Sarah Lindqvist, RN, MSN',
              role: 'Chief Nursing Officer',
              sub: 'Patient Care & Clinical Nursing',
              image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80'
            }
          ].map((lead, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 text-center space-y-3 shadow-xs">
              <img
                src={lead.image}
                alt={lead.name}
                className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-blue-100 shadow-sm"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{lead.name}</h3>
                <p className="text-xs text-blue-700 font-semibold">{lead.role}</p>
                <p className="text-[11px] text-slate-400">{lead.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-sky-600 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold">Have Questions for Our Hospital Administration?</h3>
            <p className="text-xs sm:text-sm text-blue-100">
              Reach out to our patient advocacy desk or schedule a consultation with our medical departments.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-xl bg-white text-blue-900 font-bold text-xs hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Contact Administration
            </button>
            <button
              onClick={onOpenBookingModal}
              className="px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Book an Appointment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
