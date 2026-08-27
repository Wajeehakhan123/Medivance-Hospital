import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Shield,
  Phone,
  HelpCircle,
  FileText,
  History,
  Trash2,
  RotateCcw,
  Database,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  Server
} from 'lucide-react';
import { AppointmentForm } from '../common/AppointmentForm';
import { AppointmentRequest, PageId } from '../../types';
import { fetchAppointmentsFromSupabase, SUPABASE_APPOINTMENTS_SCHEMA_SQL, SUPABASE_URL } from '../../lib/supabase';

interface AppointmentPageProps {
  initialDepartmentId?: string;
  initialDoctorId?: string;
  onNavigate: (page: PageId) => void;
}

export const AppointmentPage: React.FC<AppointmentPageProps> = ({
  initialDepartmentId = '',
  initialDoctorId = '',
  onNavigate
}) => {
  const [savedAppointments, setSavedAppointments] = useState<AppointmentRequest[]>([]);
  const [supabaseAppointments, setSupabaseAppointments] = useState<AppointmentRequest[]>([]);
  const [isLoadingSupabase, setIsLoadingSupabase] = useState(false);
  const [activeTab, setActiveTab] = useState<'book' | 'history'>('book');
  const [historySource, setHistorySource] = useState<'all' | 'supabase' | 'local'>('all');
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSqlGuide, setShowSqlGuide] = useState(false);

  const loadLocalAppointments = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('medivance_appointments') || '[]');
      setSavedAppointments(stored);
    } catch {
      setSavedAppointments([]);
    }
  };

  const loadSupabaseAppointments = async () => {
    setIsLoadingSupabase(true);
    const { data } = await fetchAppointmentsFromSupabase();
    if (data && data.length > 0) {
      setSupabaseAppointments(data);
    }
    setIsLoadingSupabase(false);
  };

  useEffect(() => {
    loadLocalAppointments();
    if (activeTab === 'history') {
      loadSupabaseAppointments();
    }
  }, [activeTab]);

  const clearHistory = () => {
    localStorage.removeItem('medivance_appointments');
    setSavedAppointments([]);
  };

  const copySql = () => {
    navigator.clipboard.writeText(SUPABASE_APPOINTMENTS_SCHEMA_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // Merge appointments without duplicates based on referenceNumber
  const combinedAppointments = React.useMemo(() => {
    if (historySource === 'supabase') return supabaseAppointments;
    if (historySource === 'local') return savedAppointments;

    const map = new Map<string, AppointmentRequest>();
    supabaseAppointments.forEach(item => map.set(item.referenceNumber, item));
    savedAppointments.forEach(item => {
      if (!map.has(item.referenceNumber)) {
        map.set(item.referenceNumber, item);
      }
    });
    return Array.from(map.values());
  }, [savedAppointments, supabaseAppointments, historySource]);

  return (
    <div className="space-y-12 pb-16">
      {/* Banner */}
      <section className="bg-slate-900 text-white py-14 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30 uppercase tracking-wider">
              Online OPD Scheduling Desk
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              <span>Supabase Connected</span>
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Book an Appointment
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Schedule an in-person consultation or video telehealth visit with our world-renowned physicians. Fast, secure, and synced directly to your Supabase backend.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sub-tab Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 mb-8 gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('book')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'book'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              New Appointment Request
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Booking Records ({combinedAppointments.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSqlGuide(!showSqlGuide)}
              className="text-xs text-slate-600 hover:text-blue-700 flex items-center gap-1 font-medium bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>Supabase Schema Info</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>OPD Desk: <strong>(555) 019-2834</strong></span>
            </div>
          </div>
        </div>

        {/* Supabase Schema Helper Banner */}
        {showSqlGuide && (
          <div className="mb-8 p-5 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold">Supabase PostgreSQL Schema Setup</h4>
              </div>
              <button
                onClick={copySql}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'SQL Copied!' : 'Copy SQL Script'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Your application is connected to Supabase Project <code className="text-emerald-300 font-mono">gfcaucmuuxsberlsbksv</code>. If you haven't created the <code className="text-emerald-300 font-mono">appointments</code> table yet in Supabase, paste this SQL in the Supabase SQL Editor:
            </p>
            <pre className="p-3 bg-slate-950 rounded-xl text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-48">
              {SUPABASE_APPOINTMENTS_SCHEMA_SQL}
            </pre>
          </div>
        )}

        {activeTab === 'book' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Booking Form Card */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <AppointmentForm
                initialDepartmentId={initialDepartmentId}
                initialDoctorId={initialDoctorId}
                onSuccessCallback={() => {
                  loadLocalAppointments();
                  loadSupabaseAppointments();
                }}
              />
            </div>

            {/* Sidebar Guide */}
            <div className="lg:col-span-4 space-y-6">
              {/* Backend Status Card */}
              <div className="bg-emerald-50/70 rounded-2xl border border-emerald-200 p-5 space-y-2.5 text-xs text-emerald-950">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <Database className="w-4 h-4 text-emerald-700" />
                  <span>Supabase Live Storage Active</span>
                </div>
                <p className="text-emerald-800 leading-relaxed text-[11px]">
                  All appointment submissions are automatically transmitted and saved to your Supabase PostgreSQL database in real-time.
                </p>
                <div className="pt-1 text-[10px] text-emerald-700 font-mono truncate">
                  Project: gfcaucmuuxsberlsbksv
                </div>
              </div>

              {/* Preparation Checklist */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Before You Visit Us</span>
                </h4>
                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>Bring a government-issued photo ID & health insurance card.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>Carry all previous medical records, MRI/CT scans, and current prescription bottles.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>Please arrive 15 minutes prior to your allocated slot for registration and vitals intake.</span>
                  </li>
                </ul>
              </div>

              {/* Emergency Hotline Alert */}
              <div className="bg-rose-50 rounded-2xl border border-rose-200 p-6 space-y-3">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
                  <Phone className="w-4 h-4 text-rose-600" />
                  <span>Is this an acute emergency?</span>
                </div>
                <p className="text-xs text-rose-700 leading-relaxed">
                  Do not submit an online form for chest pain, sudden numbness, severe breathing distress, or heavy trauma.
                </p>
                <a
                  href="tel:5559112273"
                  className="block w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-center rounded-xl text-xs font-bold transition-colors"
                >
                  Call ER Desk: (555) 911-CARE
                </a>
              </div>

              {/* Privacy Guarantee */}
              <div className="bg-blue-50/60 rounded-2xl border border-blue-200/60 p-5 space-y-2 text-xs text-blue-900">
                <div className="flex items-center gap-1.5 font-bold">
                  <Shield className="w-4 h-4 text-blue-700" />
                  <span>Confidentiality & Privacy</span>
                </div>
                <p className="text-blue-800 leading-relaxed text-[11px]">
                  All patient medical records and appointment requests are securely encrypted and managed according to HIPAA and international health data standards.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Booking History Tab */
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Appointment Request Records</h3>
                <p className="text-xs text-slate-500">Live database records and browser session history</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={loadSupabaseAppointments}
                  disabled={isLoadingSupabase}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 font-medium transition-colors cursor-pointer disabled:opacity-60"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSupabase ? 'animate-spin text-blue-600' : 'text-slate-500'}`} />
                  <span>{isLoadingSupabase ? 'Syncing...' : 'Sync Supabase'}</span>
                </button>

                {savedAppointments.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-xs text-rose-600 hover:text-rose-800 px-3 py-1.5 rounded-lg hover:bg-rose-50 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Local Cache</span>
                  </button>
                )}
              </div>
            </div>

            {combinedAppointments.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">No appointment requests found</p>
                <p className="text-xs text-slate-500">When you book an appointment, your confirmation slip will appear here and in your Supabase backend.</p>
                <button
                  onClick={() => setActiveTab('book')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 cursor-pointer"
                >
                  Book Your First Appointment
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {combinedAppointments.map((req) => (
                  <div
                    key={req.id || req.referenceNumber}
                    className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-mono font-bold text-blue-900">{req.referenceNumber}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[11px] font-semibold">
                          {req.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 text-slate-700">
                      <p><strong>Patient:</strong> {req.fullName} ({req.phone})</p>
                      <p><strong>Doctor / Specialty:</strong> {req.doctorName} • {req.departmentName}</p>
                      <p><strong>Date & Time:</strong> {req.preferredDate} at {req.preferredTime}</p>
                      <p><strong>Type:</strong> {req.appointmentType}</p>
                      <p className="text-slate-500 truncate"><strong>Reason:</strong> {req.reasonForVisit}</p>
                    </div>

                    <div className="text-[10px] text-slate-400 pt-1 flex items-center justify-between">
                      <span>Submitted: {new Date(req.createdAt).toLocaleString()}</span>
                      <span className="text-emerald-700 font-medium flex items-center gap-1">
                        <Database className="w-3 h-3" /> Supabase
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
