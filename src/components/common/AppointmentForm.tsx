import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Building,
  Stethoscope,
  FileText,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Printer,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Database,
  Check,
  Copy,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Department, Doctor, AppointmentRequest } from '../../types';
import { departmentsData } from '../../data/departmentsData';
import { doctorsData } from '../../data/doctorsData';
import { saveAppointmentToSupabase, SUPABASE_APPOINTMENTS_SCHEMA_SQL } from '../../lib/supabase';
import { printAppointmentReceipt, downloadAppointmentReceipt } from '../../utils/printReceipt';

interface AppointmentFormProps {
  initialDepartmentId?: string;
  initialDoctorId?: string;
  onSuccessCallback?: (request: AppointmentRequest) => void;
  isModal?: boolean;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialDepartmentId = '',
  initialDoctorId = '',
  onSuccessCallback,
  isModal = false
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'Prefer not to say' as 'Male' | 'Female' | 'Other' | 'Prefer not to say',
    departmentId: initialDepartmentId || '',
    doctorId: initialDoctorId || '',
    preferredDate: '',
    preferredTime: '09:30 AM',
    appointmentType: 'In-Person Consultation' as 'In-Person Consultation' | 'Video Telehealth' | 'Follow-up Visit' | 'Second Opinion' | 'Health Checkup Review',
    reasonForVisit: '',
    additionalMessage: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<AppointmentRequest | null>(null);
  const [supabaseStatus, setSupabaseStatus] = useState<{
    saved: boolean;
    error?: string;
    isTableMissing?: boolean;
  }>({ saved: false });
  const [copiedSql, setCopiedSql] = useState(false);

  // Sync initial props
  useEffect(() => {
    if (initialDepartmentId) {
      setFormData(prev => ({ ...prev, departmentId: initialDepartmentId }));
    }
  }, [initialDepartmentId]);

  useEffect(() => {
    if (initialDoctorId) {
      const doc = doctorsData.find(d => d.id === initialDoctorId);
      if (doc) {
        setFormData(prev => ({
          ...prev,
          doctorId: initialDoctorId,
          departmentId: doc.departmentId
        }));
      }
    }
  }, [initialDoctorId]);

  // Filter doctors based on selected department
  const filteredDoctors = formData.departmentId
    ? doctorsData.filter(d => d.departmentId === formData.departmentId)
    : doctorsData;

  // Selected doctor details if any
  const selectedDoctor = doctorsData.find(d => d.id === formData.doctorId);
  const selectedDepartment = departmentsData.find(d => d.id === formData.departmentId);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full legal name (at least 3 characters).';
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Please provide a valid phone number for SMS confirmation.';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required.';
    }

    if (!formData.departmentId) {
      newErrors.departmentId = 'Please select a hospital medical department.';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select your preferred consultation date.';
    } else {
      const chosenDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (chosenDate < today) {
        newErrors.preferredDate = 'Appointment date cannot be in the past.';
      }
    }

    if (!formData.reasonForVisit.trim() || formData.reasonForVisit.trim().length < 5) {
      newErrors.reasonForVisit = 'Please provide a brief reason or primary symptom (min 5 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSupabaseStatus({ saved: false });

    const refNum = `MED-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRequest: AppointmentRequest = {
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString(),
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      dob: formData.dob,
      gender: formData.gender,
      departmentId: formData.departmentId,
      departmentName: selectedDepartment?.name || 'General Department',
      doctorId: formData.doctorId || 'any-available',
      doctorName: selectedDoctor ? selectedDoctor.name : 'Next Available Department Specialist',
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      appointmentType: formData.appointmentType,
      reasonForVisit: formData.reasonForVisit.trim(),
      additionalMessage: formData.additionalMessage.trim(),
      status: 'Pending Confirmation',
      referenceNumber: refNum
    };

    // Save to Supabase backend table
    const result = await saveAppointmentToSupabase(newRequest);
    setSupabaseStatus({
      saved: result.success,
      error: result.error,
      isTableMissing: result.isTableMissing
    });

    // Save to local storage history as local cache
    try {
      const existing = JSON.parse(localStorage.getItem('medivance_appointments') || '[]');
      localStorage.setItem('medivance_appointments', JSON.stringify([newRequest, ...existing]));
    } catch (err) {
      console.error('Failed to save to local storage', err);
    }

    setSubmittedRequest(newRequest);
    setIsSubmitting(false);

    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Fallback gracefully
    }

    if (onSuccessCallback) {
      onSuccessCallback(newRequest);
    }
  };

  const handleReset = () => {
    setSubmittedRequest(null);
    setSupabaseStatus({ saved: false });
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      dob: '',
      gender: 'Prefer not to say',
      departmentId: '',
      doctorId: '',
      preferredDate: '',
      preferredTime: '09:30 AM',
      appointmentType: 'In-Person Consultation',
      reasonForVisit: '',
      additionalMessage: ''
    });
    setErrors({});
  };

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(SUPABASE_APPOINTMENTS_SCHEMA_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const timeSlots = [
    '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:30 PM'
  ];

  // If submitted, show detailed confirmation receipt card
  if (submittedRequest) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle className="w-10 h-10" />
          </div>
          <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">
            Request Received & Logged
          </span>
          <h3 className="text-2xl font-bold text-slate-900">Appointment Request Submitted</h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Thank you, <strong className="text-slate-800">{submittedRequest.fullName}</strong>. Your appointment request has been securely registered in the Medivance OPD queue.
          </p>
        </div>

        {/* Supabase Sync Status Indicator */}
        <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
          supabaseStatus.saved
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
            : supabaseStatus.isTableMissing
            ? 'bg-amber-50 border-amber-200 text-amber-900'
            : 'bg-blue-50/80 border-blue-200 text-blue-900'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-lg ${supabaseStatus.saved ? 'bg-emerald-200/70 text-emerald-800' : 'bg-amber-200/70 text-amber-800'}`}>
              <Database className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold flex items-center gap-1.5">
                <span>Supabase Backend:</span>
                {supabaseStatus.saved ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Saved to `appointments` table
                  </span>
                ) : (
                  <span className="text-amber-700 font-semibold">
                    Connected (Project: gfcaucmuuxsberlsbksv)
                  </span>
                )}
              </p>
              <p className="text-[11px] opacity-85">
                {supabaseStatus.saved
                  ? 'Your appointment record has been persisted into Supabase PostgreSQL database.'
                  : supabaseStatus.error || 'Connected to Supabase project.'}
              </p>
            </div>
          </div>

          {supabaseStatus.isTableMissing && (
            <button
              type="button"
              onClick={copySqlToClipboard}
              className="shrink-0 px-3 py-1.5 bg-amber-200/80 hover:bg-amber-300 text-amber-900 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSql ? 'SQL Copied!' : 'Copy Table SQL'}</span>
            </button>
          )}
        </div>

        {/* Official Reference Box */}
        <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="text-xs text-blue-800 font-medium">Unique Booking Reference</p>
            <p className="text-xl font-mono font-bold text-blue-900">{submittedRequest.referenceNumber}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-md text-xs font-semibold">
              Status: Pending Confirmation
            </span>
          </div>
        </div>

        {/* Appointment Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-slate-50 p-5 rounded-xl border border-slate-200">
          <div>
            <p className="text-xs text-slate-500 font-medium">Department</p>
            <p className="font-semibold text-slate-800">{submittedRequest.departmentName}</p>
          </div>

          <div>
            <p className="text-xs text-slate-500 font-medium">Assigned Physician / Specialist</p>
            <p className="font-semibold text-slate-800">{submittedRequest.doctorName}</p>
          </div>

          <div>
            <p className="text-xs text-slate-500 font-medium">Requested Date & Time</p>
            <p className="font-semibold text-slate-800">
              {new Date(submittedRequest.preferredDate + 'T00:00:00').toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}{' '}
              at {submittedRequest.preferredTime}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500 font-medium">Consultation Type</p>
            <p className="font-semibold text-slate-800">{submittedRequest.appointmentType}</p>
          </div>

          <div>
            <p className="text-xs text-slate-500 font-medium">Patient Contact</p>
            <p className="font-semibold text-slate-800">{submittedRequest.phone} • {submittedRequest.email}</p>
          </div>

          <div>
            <p className="text-xs text-slate-500 font-medium">Primary Reason</p>
            <p className="font-semibold text-slate-800 line-clamp-1">{submittedRequest.reasonForVisit}</p>
          </div>
        </div>

        {/* Instructions Banner */}
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span>Next Steps from Medivance OPD Desk:</span>
          </div>
          <p className="leading-relaxed">
            1. Our scheduling coordinator will contact you via phone/SMS at <strong>{submittedRequest.phone}</strong> within 30 minutes to confirm your final slot and pre-visit preparations.<br />
            2. Please bring a valid government photo ID and health insurance card.<br />
            3. For urgent medical emergencies, do not wait for appointment confirmation—call <strong>(555) 911-CARE</strong> immediately.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              id="print-receipt-btn"
              onClick={() => printAppointmentReceipt(submittedRequest)}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-blue-600" />
              <span>Print Receipt</span>
            </button>

            <button
              type="button"
              id="download-receipt-btn"
              onClick={() => downloadAppointmentReceipt(submittedRequest)}
              className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Download text slip copy"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Download Voucher</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Book Another Appointment</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Patient Information Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 pb-1 border-b border-slate-200">
          <User className="w-4 h-4 text-blue-600" />
          <span>1. Patient Personal Details</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Full Legal Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="input-full-name"
              placeholder="e.g. Eleanor Vance"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.fullName ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              id="input-email"
              placeholder="patient@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.email ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Mobile Phone Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              id="input-phone"
              placeholder="(555) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.phone ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
          </div>

          {/* Date of Birth & Gender */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Date of Birth <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                id="input-dob"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className={`w-full px-3 py-2 rounded-xl text-sm border bg-white focus:outline-none focus:ring-2 ${
                  errors.dob ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                }`}
              />
              {errors.dob && <p className="text-[11px] text-rose-600 mt-1">{errors.dob}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Gender
              </label>
              <select
                id="input-gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl text-sm border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="Prefer not to say">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Selection: Department & Doctor */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 pb-1 border-b border-slate-200">
          <Stethoscope className="w-4 h-4 text-blue-600" />
          <span>2. Department & Doctor Selection</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Department Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Medical Department <span className="text-rose-500">*</span>
            </label>
            <select
              id="select-department"
              value={formData.departmentId}
              onChange={(e) => {
                const newDept = e.target.value;
                setFormData({
                  ...formData,
                  departmentId: newDept,
                  doctorId: '' // Reset doctor when dept changes
                });
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.departmentId ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            >
              <option value="">-- Choose Department --</option>
              {departmentsData.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.departmentId && <p className="text-xs text-rose-600 mt-1">{errors.departmentId}</p>}
          </div>

          {/* Doctor Selection (Dynamically Filtered) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Preferred Physician
            </label>
            <select
              id="select-doctor"
              value={formData.doctorId}
              onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Any Available Specialist in Department</option>
              {filteredDoctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} — {doc.specialty}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1">
              {filteredDoctors.length} specialist(s) available for selection
            </p>
          </div>
        </div>

        {/* Selected Doctor Summary Card if chosen */}
        {selectedDoctor && (
          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200/80 flex items-center gap-3">
            <img
              src={selectedDoctor.image}
              alt={selectedDoctor.name}
              className="w-12 h-12 rounded-lg object-cover border border-white shadow-xs"
            />
            <div className="text-xs">
              <p className="font-bold text-slate-900">{selectedDoctor.name}</p>
              <p className="text-blue-800 font-medium">{selectedDoctor.specialty}</p>
              <p className="text-slate-500">
                Consultation: {selectedDoctor.timing} • Days: {selectedDoctor.availability.join(', ')}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Appointment Schedule & Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 pb-1 border-b border-slate-200">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>3. Schedule & Visit Purpose</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Preferred Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Preferred Appointment Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              id="input-preferred-date"
              min={new Date().toISOString().split('T')[0]}
              value={formData.preferredDate}
              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.preferredDate ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors.preferredDate && <p className="text-xs text-rose-600 mt-1">{errors.preferredDate}</p>}
          </div>

          {/* Appointment Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Type of Appointment
            </label>
            <select
              id="select-appointment-type"
              value={formData.appointmentType}
              onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value as any })}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="In-Person Consultation">In-Person Clinic Consultation</option>
              <option value="Video Telehealth">Video / Telehealth Consultation</option>
              <option value="Follow-up Visit">Follow-up Post-Treatment Visit</option>
              <option value="Second Opinion">Specialist Second Opinion</option>
              <option value="Health Checkup Review">Health Checkup Package Review</option>
            </select>
          </div>
        </div>

        {/* Time Slot Chips */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Preferred Time Slot
          </label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
            {timeSlots.map((slot) => {
              const isSelected = formData.preferredTime === slot;
              return (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setFormData({ ...formData, preferredTime: slot })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reason for Visit */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Reason for Visit / Primary Symptoms <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="input-reason"
            placeholder="e.g. Persistent lower back pain radiating down the left leg for 2 weeks"
            value={formData.reasonForVisit}
            onChange={(e) => setFormData({ ...formData, reasonForVisit: e.target.value })}
            className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-none focus:ring-2 transition-all ${
              errors.reasonForVisit ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
            }`}
          />
          {errors.reasonForVisit && <p className="text-xs text-rose-600 mt-1">{errors.reasonForVisit}</p>}
        </div>

        {/* Additional Message */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Additional Message / Medical History (Optional)
          </label>
          <textarea
            rows={2}
            id="textarea-additional"
            placeholder="Mention any known drug allergies, past surgeries, or mobility needs (e.g. wheelchair assistance required)."
            value={formData.additionalMessage}
            onChange={(e) => setFormData({ ...formData, additionalMessage: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Security & Verification Notice */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <span>
          Your health information is protected by HIPAA privacy standards. Submitting this form sends an appointment request; our OPD staff will confirm your time slot via SMS/phone call.
        </span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        id="submit-appointment-request-btn"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-semibold text-sm shadow-md shadow-blue-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Processing Request...</span>
          </>
        ) : (
          <>
            <Calendar className="w-4 h-4" />
            <span>Submit Appointment Request</span>
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};
