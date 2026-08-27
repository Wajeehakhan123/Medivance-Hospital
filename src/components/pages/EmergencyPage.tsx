import React from 'react';
import {
  Phone,
  Heart,
  AlertTriangle,
  Clock,
  MapPin,
  Ambulance,
  ShieldAlert,
  Activity,
  CheckCircle2,
  Users,
  Award
} from 'lucide-react';
import { PageId } from '../../types';

interface EmergencyPageProps {
  onNavigate: (page: PageId) => void;
}

export const EmergencyPage: React.FC<EmergencyPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 pb-16">
      {/* High Alert Hero Banner */}
      <section className="bg-gradient-to-b from-rose-950 via-slate-950 to-slate-900 text-white py-14 sm:py-20 relative overflow-hidden border-b border-rose-900/40">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30 uppercase tracking-wider animate-pulse">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>24/7 Level 1 Trauma & Emergency Medical Center</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Rapid Emergency Care When Every Second Counts
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Our state-of-the-art emergency department is staffed 24 hours a day with board-certified trauma surgeons, emergency medicine physicians, interventional cardiologists, and rapid-response critical care nurses.
          </p>

          {/* Big Emergency Call Hotline */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:5559112273"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-lg sm:text-xl shadow-2xl shadow-rose-600/40 flex items-center justify-center gap-3 transition-all hover:scale-105"
            >
              <Phone className="w-6 h-6 animate-bounce" />
              <span>Call (555) 911-CARE</span>
            </a>

            <a
              href="tel:5559118728"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all"
            >
              <span>Trauma Admissions: (555) 911-TRAUMA</span>
            </a>
          </div>
        </div>
      </section>

      {/* When to visit the ER - Symptoms Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
            Critical Triage Warning Signs
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Red-Flag Symptoms Requiring Immediate ER Care
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            If you or a loved one experience any of the following symptoms, call our emergency hotline or dial 911 immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Cardiac & Chest Symptoms',
              items: ['Crushing chest pressure, tightness, or squeezing', 'Pain radiating to jaw, left shoulder, or back', 'Severe palpitations with cold sweat or dizziness']
            },
            {
              title: 'Stroke & Neurological Signs',
              items: ['Sudden facial drooping, arm weakness, or slurred speech (FAST)', 'Sudden loss of vision or severe double vision', 'Abrupt thunderclap headache or loss of consciousness']
            },
            {
              title: 'Severe Respiratory Distress',
              items: ['Inability to speak in full sentences due to breathlessness', 'Bluish lips or fingertips (cyanosis)', 'Severe acute asthma attack unresponsive to inhalers']
            },
            {
              title: 'Trauma & Heavy Bleeding',
              items: ['Arterial spurting or uncontrolled bleeding', 'Compound bone fractures with bone protrusion', 'Severe motor vehicle collisions or falls from height']
            },
            {
              title: 'Severe Abdominal & Poisoning',
              items: ['Sudden unbearable abdominal pain with rigid belly', 'Suspected overdose, chemical ingestion, or toxin poisoning', 'Severe persistent vomiting with high fever & disorientation']
            },
            {
              title: 'Pediatric & Neonatal Emergencies',
              items: ['High infant fever (>102°F) under 3 months of age', 'Lethargy, unresponsiveness, or seizures', 'Severe croup or choking episode with stridor']
            }
          ].map((sym, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 text-rose-700">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{sym.title}</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {sym.items.map((it, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Triage Flow */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Clinical Triage Protocol
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How Our Rapid ER Triage Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Patients are prioritized based on clinical severity to ensure critical interventions occur instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border-2 border-rose-400 shadow-xs space-y-3">
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
                Priority 1: Immediate (Red)
              </span>
              <h4 className="font-bold text-slate-900 text-lg">Resuscitation & Trauma</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cardiac arrest, severe respiratory failure, massive hemorrhages, acute stroke. Evaluated instantly within 0 seconds.
              </p>
              <div className="text-xs text-rose-700 font-bold">Wait Time: Immediate (0 mins)</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-amber-400 shadow-xs space-y-3">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
                Priority 2: Very Urgent (Yellow)
              </span>
              <h4 className="font-bold text-slate-900 text-lg">Acute Medical & Surgical</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Severe fractures, acute appendicitis, high fevers with dehydration, deep lacerations requiring sutures.
              </p>
              <div className="text-xs text-amber-700 font-bold">Wait Time: Under 15 minutes</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-emerald-400 shadow-xs space-y-3">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                Priority 3: Urgent / Stable (Green)
              </span>
              <h4 className="font-bold text-slate-900 text-lg">Standard Emergency</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Moderate sprains, minor burns, stable viral illness, ear infections. Monitored in fast-track treatment rooms.
              </p>
              <div className="text-xs text-emerald-700 font-bold">Wait Time: Fast-Track Assessment</div>
            </div>
          </div>
        </div>
      </section>

      {/* ER Arrival & Ambulance Bay Directions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Campus Emergency Ingress</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Direct Ambulance Bay & Walk-in ER Entrance
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              The Emergency Department has its own dedicated entrance on the <strong>East Wing of 742 Healthcare Boulevard</strong>. Follow the large red LED "EMERGENCY / AMBULANCE" illuminated overhead signs. 24/7 free emergency valet parking is stationed directly at the sliding ER doors.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Dedicated Stroke & Cath Labs on Level 1</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>24/7 Dedicated Emergency CT/MRI</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <a
              href="tel:5559112273"
              className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-bold text-center rounded-xl text-sm transition-colors"
            >
              Call Ambulance Hotline
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-center rounded-xl text-xs transition-colors"
            >
              View Campus Map & Parking
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
