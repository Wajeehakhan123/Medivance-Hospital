import React from 'react';
import { Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { PageId } from '../../types';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onNavigate: (page: PageId) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="space-y-12 pb-16">
      {/* Banner */}
      <section className="bg-slate-900 text-white py-14 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30 uppercase tracking-wider">
            Legal & Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {isPrivacy ? 'Patient Privacy Policy & HIPAA Notice' : 'Terms & Conditions of Service'}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Effective Date: January 1, 2026 • Medivance Hospital & Healthcare Institute
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 text-xs sm:text-sm leading-relaxed">
          {isPrivacy ? (
            <>
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">1. Notice of Privacy Practices (HIPAA)</h2>
                <p>
                  Medivance Hospital is committed to safeguarding your Protected Health Information (PHI). This Notice of Privacy Practices describes how medical information about you may be used and disclosed, and how you can obtain access to this information in accordance with HIPAA standards.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">2. How We Collect and Use Patient Information</h2>
                <p>
                  We collect personal and clinical health information when you register for OPD consultations, inpatient admissions, diagnostic imaging, lab tests, or use our digital appointment booking services. This information is utilized strictly for:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Delivering, coordinating, and managing your medical treatment and healthcare services.</li>
                  <li>Processing healthcare insurance claims, billing, and pre-authorization verifications.</li>
                  <li>Internal clinical quality improvement, audit reviews, and infection control monitoring.</li>
                  <li>Direct communication regarding appointment reminders, lab results, and discharge instructions.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">3. Information Security & Encryption</h2>
                <p>
                  All digital health records and appointment requests sent through this platform are protected by TLS 1.3 end-to-end encryption, strict role-based access control, and ISO 27001 certified data center infrastructure. We never sell or license patient data to third-party commercial marketing entities.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">4. Your Health Information Rights</h2>
                <p>
                  Under international medical privacy laws, you possess the right to inspect and receive copies of your electronic health record, request amendments, request confidential communication methods, and receive an accounting of disclosures.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">5. Contacting Our Data Privacy Officer</h2>
                <p>
                  If you have questions regarding our privacy practices or wish to submit a privacy inquiry, contact: <strong>privacy@medivancehospital.com</strong> or call (555) 019-2845.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
                <p>
                  By accessing, browsing, or utilizing the online services, booking forms, and health educational resources on the Medivance Hospital website, you agree to be bound by these Terms and Conditions and all applicable healthcare regulations.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">2. Medical Disclaimer (Not Medical Advice)</h2>
                <p>
                  The articles, FAQs, and medical content provided on this website are for educational and informational purposes only. They are not intended to substitute for clinical medical judgment, professional diagnosis, or personalized physician treatment. Always consult a qualified physician for any health condition.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">3. Online Appointment Booking Policy</h2>
                <p>
                  Submitting an online appointment booking form constitutes a scheduling request. All slots are provisional until confirmed by phone or SMS from the Medivance OPD scheduling desk. Same-day emergency walk-ins are treated according to medical triage severity at our 24/7 Emergency Center.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">4. Inpatient & Payment Terms</h2>
                <p>
                  Patients and their authorized guardians are responsible for charges incurred during diagnostic testing, consultations, and hospital admissions, subject to health insurance policy pre-approvals and copay arrangements.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">5. Limitation of Liability</h2>
                <p>
                  Medivance Hospital strives to maintain accurate and up-to-date information on this website, but assumes no liability for technical interruptions or typographical inaccuracies.
                </p>
              </div>
            </>
          )}

          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              ← Back to Homepage
            </button>

            <button
              onClick={() => onNavigate(isPrivacy ? 'terms' : 'privacy')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              {isPrivacy ? 'View Terms & Conditions →' : 'View Privacy Policy →'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
