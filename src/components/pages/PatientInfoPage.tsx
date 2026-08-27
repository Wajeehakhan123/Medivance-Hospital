import React, { useState } from 'react';
import {
  FileText,
  CreditCard,
  Clock,
  ShieldCheck,
  Building,
  CheckCircle2,
  Download,
  AlertCircle,
  HelpCircle,
  Coffee,
  Wifi,
  Car,
  HeartHandshake
} from 'lucide-react';
import { PageId } from '../../types';
import {
  admissionGuidelines,
  visitingHours,
  patientRights,
  insurancePartners,
  hospitalAmenities
} from '../../data/patientInfoData';
import { DynamicIcon } from '../common/DynamicIcon';

interface PatientInfoPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const PatientInfoPage: React.FC<PatientInfoPageProps> = ({
  onNavigate,
  onOpenBookingModal
}) => {
  const [activeTab, setActiveTab] = useState<'admission' | 'visiting' | 'insurance' | 'rights' | 'amenities'>('admission');

  return (
    <div className="space-y-12 pb-16">
      {/* Banner */}
      <section className="bg-slate-900 text-white py-14 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30 uppercase tracking-wider">
            Patient & Visitor Portal
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Patient Guide & Hospital Information
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Everything you need to know about your hospital stay, visitor policies, insurance claim processing, and hospital amenities for a seamless healing experience.
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none text-xs sm:text-sm">
          {[
            { id: 'admission', label: 'Admissions & Discharge', icon: FileText },
            { id: 'visiting', label: 'Visiting Hours & Rules', icon: Clock },
            { id: 'insurance', label: 'Insurance & Billing', icon: CreditCard },
            { id: 'rights', label: 'Patient Rights & Safety', icon: ShieldCheck },
            { id: 'amenities', label: 'Campus Amenities', icon: Building }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Tab Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TAB 1: ADMISSIONS & DISCHARGE */}
        {activeTab === 'admission' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Hospital Admission Guidelines</h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Our central admission desk is situated on Ground Floor (Lobby B) and operates 24 hours daily.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-blue-900">Required Documents for Admission:</h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {admissionGuidelines.requiredDocuments.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-blue-900">What to Bring During Stay:</h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {admissionGuidelines.whatToBring.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <p className="font-bold">Valuables & Jewelry Notice:</p>
                <p>Please do not bring large amounts of cash, expensive jewelry, or irreplaceable electronic devices into inpatient wards. Medivance cannot be held responsible for lost items.</p>
              </div>
            </div>

            {/* Discharge Protocol */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Discharge Process</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard discharge check-out begins at 10:00 AM once your primary attending consultant completes morning clinical rounds and authorizes the discharge summary. The TPA insurance pre-settlement typically takes 2 to 3 hours. Your nurse will provide medication counseling and schedule follow-up appointments.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: VISITING HOURS */}
        {activeTab === 'visiting' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visitingHours.map((vh, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-base">{vh.ward}</h3>
                    <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-semibold">
                      {vh.rules}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs text-slate-700 font-mono">
                    <strong>Timings:</strong> {vh.hours}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3 text-xs text-slate-600">
              <h4 className="font-bold text-slate-900 text-sm">General Visitor Etiquette:</h4>
              <ul className="space-y-1.5 list-disc pl-5">
                <li>Sanitize hands at bedside dispensers upon entry and exit.</li>
                <li>Keep mobile phones on silent mode to maintain a quiet healing atmosphere.</li>
                <li>Children under 12 are not permitted in intensive care units (ICU/NICU) for infection control.</li>
                <li>Outside cooked food, flowers, and latex balloons are strictly prohibited in clinical zones.</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: INSURANCE & BILLING */}
        {activeTab === 'insurance' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Health Insurance & Cashless Hospitalization</h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  We are empaneled with all major domestic and international health insurance providers and Third-Party Administrators (TPAs).
                </p>
              </div>

              <div className="p-5 bg-blue-50/70 rounded-xl border border-blue-200 space-y-2">
                <h4 className="text-sm font-bold text-blue-950">How Cashless Pre-Authorization Works:</h4>
                <ol className="text-xs text-blue-900 space-y-1.5 list-decimal pl-4">
                  <li>Present your health insurance e-card and photo ID at our 24/7 Insurance TPA Desk.</li>
                  <li>Our billing specialist submits the digital pre-authorization request directly to your insurer.</li>
                  <li>Insurers approve the initial sanction (typically within 45 to 90 minutes for planned admissions).</li>
                  <li>Upon discharge, only non-medical or co-pay deductibles are settled directly by the patient.</li>
                </ol>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3">Empaneled Insurance & TPA Networks</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-slate-700">
                  {insurancePartners.map((ins, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center truncate">
                      {ins}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PATIENT RIGHTS & RESPONSIBILITIES */}
        {activeTab === 'rights' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span>Your Rights as a Patient</span>
              </h3>
              <ul className="space-y-3 text-xs text-slate-700">
                {patientRights.rights.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2 bg-slate-50 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-emerald-600" />
                <span>Patient & Attendant Responsibilities</span>
              </h3>
              <ul className="space-y-3 text-xs text-slate-700">
                {patientRights.responsibilities.map((res, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2 bg-slate-50 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 5: AMENITIES */}
        {activeTab === 'amenities' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {hospitalAmenities.map((am, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <DynamicIcon name={am.icon} className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{am.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{am.description}</p>
                <p className="text-[11px] font-mono text-blue-700 pt-1 border-t border-slate-100">
                  Location: {am.location}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Direct Contact for Patient Desk */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-lg text-white">Need Patient Admission Assistance?</h4>
            <p className="text-xs text-slate-400">Our patient relation executives are available 24/7 at Lobby B.</p>
          </div>
          <button
            onClick={onOpenBookingModal}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer"
          >
            Schedule OPD Visit
          </button>
        </div>
      </section>
    </div>
  );
};
