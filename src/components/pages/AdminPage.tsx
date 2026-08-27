import React, { useState, useEffect, useMemo } from 'react';
import {
  Shield,
  Lock,
  UserCheck,
  KeyRound,
  Database,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Search,
  Filter,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock3,
  XCircle,
  Eye,
  Trash2,
  Download,
  Printer,
  LogOut,
  ChevronDown,
  Building2,
  Stethoscope,
  FileText,
  Copy,
  Check,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  FileSpreadsheet
} from 'lucide-react';
import { AppointmentRequest, PageId } from '../../types';
import {
  fetchAppointmentsFromSupabase,
  updateAppointmentStatusInSupabase,
  deleteAppointmentFromSupabase,
  isSingleAdminSlotClaimed,
  registerSingleAdminAccount,
  loginAdminAccount,
  getActiveAdminSession,
  logoutAdminAccount,
  updateAdminPassword,
  checkSupabaseConnection,
  SUPABASE_APPOINTMENTS_SCHEMA_SQL
} from '../../lib/supabase';
import { printAppointmentReceipt, downloadAppointmentReceipt } from '../../utils/printReceipt';
import { departmentsData } from '../../data/departmentsData';

interface AdminPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  // Auth state
  const [session, setSession] = useState<any | null>(null);
  const [isSlotClaimed, setIsSlotClaimed] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Register form state (Single slot)
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regSecurityPin, setRegSecurityPin] = useState('');

  // Dashboard Data State
  const [appointments, setAppointments] = useState<AppointmentRequest[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [activeTab, setActiveTab] = useState<'bookings' | 'today' | 'security'>('bookings');

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all'); // all, today, upcoming, past

  // Modal / Selected Item State
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRequest | null>(null);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Security password change form
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmNewPwd, setConfirmNewPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Check auth session & slot availability on mount
  useEffect(() => {
    const claimed = isSingleAdminSlotClaimed();
    setIsSlotClaimed(claimed);

    const activeSession = getActiveAdminSession();
    if (activeSession) {
      setSession(activeSession);
      loadAllAppointments();
    } else {
      // If no admin registered yet, default to register screen
      if (!claimed) {
        setAuthMode('register');
      } else {
        setAuthMode('login');
      }
    }
  }, []);

  const loadAllAppointments = async () => {
    setIsLoadingData(true);
    try {
      // Try fetching from Supabase
      const { data: supaData } = await fetchAppointmentsFromSupabase();

      // Read local cache as well
      let localData: AppointmentRequest[] = [];
      try {
        localData = JSON.parse(localStorage.getItem('medivance_appointments') || '[]');
      } catch (e) {
        console.warn(e);
      }

      // Merge by reference number
      const map = new Map<string, AppointmentRequest>();
      if (supaData && supaData.length > 0) {
        supaData.forEach(item => map.set(item.referenceNumber, item));
      }
      localData.forEach(item => {
        if (!map.has(item.referenceNumber)) {
          map.set(item.referenceNumber, item);
        }
      });

      const merged = Array.from(map.values()).sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      setAppointments(merged);
    } catch (err) {
      console.error('Error fetching bookings', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (!regFullName.trim() || !regUsername.trim() || !regEmail.trim() || !regPassword) {
      setAuthError('Please fill in all required registration fields.');
      return;
    }

    if (regPassword.length < 6) {
      setAuthError('Password must be at least 6 characters in length.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }

    setIsAuthLoading(true);
    const result = registerSingleAdminAccount({
      fullName: regFullName,
      username: regUsername,
      email: regEmail,
      password: regPassword,
      securityPin: regSecurityPin
    });

    if (result.success) {
      setIsSlotClaimed(true);
      // Auto login
      const loginRes = loginAdminAccount(regUsername, regPassword);
      if (loginRes.success && loginRes.session) {
        setSession(loginRes.session);
        setAuthSuccess('Single Admin Account successfully created & locked! Logging in...');
        loadAllAppointments();
      } else {
        setAuthMode('login');
        setAuthSuccess('Admin account created! Please sign in with your credentials.');
      }
    } else {
      setAuthError(result.error || 'Failed to create admin account.');
    }
    setIsAuthLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (!loginIdentifier.trim() || !loginPassword) {
      setAuthError('Please enter both your administrator username/email and password.');
      return;
    }

    setIsAuthLoading(true);
    const res = loginAdminAccount(loginIdentifier, loginPassword);
    if (res.success && res.session) {
      setSession(res.session);
      loadAllAppointments();
    } else {
      setAuthError(res.error || 'Authentication failed. Please verify your credentials.');
    }
    setIsAuthLoading(false);
  };

  const handleLogout = () => {
    logoutAdminAccount();
    setSession(null);
    setAuthMode('login');
    setSelectedAppointment(null);
  };

  const handleStatusChange = async (refNumber: string, newStatus: string) => {
    setIsUpdatingStatus(refNumber);
    try {
      // 1. Update Supabase
      await updateAppointmentStatusInSupabase(refNumber, newStatus);

      // 2. Update local state
      setAppointments(prev =>
        prev.map(item =>
          item.referenceNumber === refNumber ? { ...item, status: newStatus as any } : item
        )
      );

      // 3. Update local storage cache
      try {
        const local = JSON.parse(localStorage.getItem('medivance_appointments') || '[]');
        const updated = local.map((item: AppointmentRequest) =>
          item.referenceNumber === refNumber ? { ...item, status: newStatus } : item
        );
        localStorage.setItem('medivance_appointments', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }

      if (selectedAppointment && selectedAppointment.referenceNumber === refNumber) {
        setSelectedAppointment(prev => prev ? { ...prev, status: newStatus as any } : null);
      }

      setActionNotice({
        type: 'success',
        message: `Booking #${refNumber} status updated to "${newStatus}".`
      });
      setTimeout(() => setActionNotice(null), 3500);
    } catch (err: any) {
      setActionNotice({
        type: 'error',
        message: `Failed to update status: ${err.message || 'Error'}`
      });
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const handleDeleteBooking = async (refNumber: string) => {
    if (!window.confirm(`Are you sure you want to delete appointment #${refNumber}? This will remove it from Supabase and the portal.`)) {
      return;
    }

    try {
      await deleteAppointmentFromSupabase(refNumber);

      setAppointments(prev => prev.filter(item => item.referenceNumber !== refNumber));

      try {
        const local = JSON.parse(localStorage.getItem('medivance_appointments') || '[]');
        const filtered = local.filter((item: AppointmentRequest) => item.referenceNumber !== refNumber);
        localStorage.setItem('medivance_appointments', JSON.stringify(filtered));
      } catch (e) {
        console.warn(e);
      }

      if (selectedAppointment?.referenceNumber === refNumber) {
        setSelectedAppointment(null);
      }

      setActionNotice({
        type: 'success',
        message: `Appointment #${refNumber} has been permanently deleted.`
      });
      setTimeout(() => setActionNotice(null), 3500);
    } catch (err: any) {
      setActionNotice({
        type: 'error',
        message: `Could not delete booking: ${err.message || 'Error'}`
      });
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMsg(null);

    if (!currentPwd || !newPwd) {
      setPwdMsg({ type: 'error', text: 'Please fill in all password fields.' });
      return;
    }
    if (newPwd.length < 6) {
      setPwdMsg({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }
    if (newPwd !== confirmNewPwd) {
      setPwdMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    const res = updateAdminPassword(currentPwd, newPwd);
    if (res.success) {
      setPwdMsg({ type: 'success', text: 'Administrator password successfully updated!' });
      setCurrentPwd('');
      setNewPwd('');
      setConfirmNewPwd('');
    } else {
      setPwdMsg({ type: 'error', text: res.error || 'Failed to update password.' });
    }
  };

  const copyRefNumber = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(ref);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  // Export filtered bookings to CSV
  const exportToCsv = () => {
    if (filteredAppointments.length === 0) return;

    const headers = [
      'Reference Number',
      'Created At',
      'Patient Name',
      'Email',
      'Phone',
      'DOB',
      'Gender',
      'Department',
      'Doctor',
      'Appointment Date',
      'Time Slot',
      'Type',
      'Status',
      'Reason For Visit',
      'Notes'
    ];

    const rows = filteredAppointments.map(app => [
      `"${app.referenceNumber}"`,
      `"${new Date(app.createdAt).toLocaleString()}"`,
      `"${app.fullName.replace(/"/g, '""')}"`,
      `"${app.email}"`,
      `"${app.phone}"`,
      `"${app.dob || ''}"`,
      `"${app.gender}"`,
      `"${app.departmentName}"`,
      `"${app.doctorName}"`,
      `"${app.preferredDate}"`,
      `"${app.preferredTime}"`,
      `"${app.appointmentType}"`,
      `"${app.status}"`,
      `"${app.reasonForVisit.replace(/"/g, '""')}"`,
      `"${(app.additionalMessage || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Medivance-Appointments-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Appointments computation
  const filteredAppointments = useMemo(() => {
    return appointments.filter(app => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = app.fullName.toLowerCase().includes(q);
        const matchesRef = app.referenceNumber.toLowerCase().includes(q);
        const matchesEmail = app.email.toLowerCase().includes(q);
        const matchesPhone = app.phone.toLowerCase().includes(q);
        const matchesDoc = app.doctorName.toLowerCase().includes(q);
        const matchesDept = app.departmentName.toLowerCase().includes(q);

        if (!matchesName && !matchesRef && !matchesEmail && !matchesPhone && !matchesDoc && !matchesDept) {
          return false;
        }
      }

      // Status filter
      if (statusFilter !== 'all' && app.status !== statusFilter) {
        return false;
      }

      // Department filter
      if (deptFilter !== 'all' && app.departmentId !== deptFilter) {
        return false;
      }

      // Date filter
      if (dateFilter !== 'all') {
        const todayStr = new Date().toISOString().split('T')[0];
        const appDateStr = app.preferredDate;

        if (dateFilter === 'today' && appDateStr !== todayStr) return false;
        if (dateFilter === 'upcoming' && appDateStr < todayStr) return false;
        if (dateFilter === 'past' && appDateStr >= todayStr) return false;
      }

      return true;
    });
  }, [appointments, searchQuery, statusFilter, deptFilter, dateFilter]);

  // Today's Appointments
  const todayAppointments = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    return appointments.filter(a => a.preferredDate === todayStr);
  }, [appointments]);

  // Metrics
  const metrics = useMemo(() => {
    const total = appointments.length;
    const todayCount = todayAppointments.length;
    const pending = appointments.filter(a => a.status === 'Pending Confirmation' || a.status === 'Under Review').length;
    const scheduled = appointments.filter(a => a.status === 'Scheduled').length;
    const telehealth = appointments.filter(a => a.appointmentType === 'Video Telehealth').length;
    return { total, todayCount, pending, scheduled, telehealth };
  }, [appointments, todayAppointments]);

  // If not logged in, render Auth Portal
  if (!session) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 text-slate-100">
        <div className="max-w-md w-full space-y-6">
          {/* Header Card */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 mb-1 shadow-lg shadow-blue-500/10">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Medivance Hospital Portal
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Restricted Clinical & Administrative Access Control
            </p>
          </div>

          {/* Slot Status Notice */}
          <div className={`p-4 rounded-xl border text-xs leading-relaxed flex items-start gap-3 ${
            isSlotClaimed
              ? 'bg-slate-800/80 border-slate-700 text-slate-300'
              : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
          }`}>
            {isSlotClaimed ? (
              <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold text-white mb-0.5">
                {isSlotClaimed ? 'Single Admin Slot Claimed & Locked' : '1 Initial Administrator Slot Available'}
              </p>
              <p className="text-slate-400 text-[11px]">
                {isSlotClaimed
                  ? 'Registration is permanently locked. Only the designated administrator can sign in to view and manage bookings.'
                  : 'No administrator is registered yet. Create your single master administrator account now. Once registered, all future signups will be permanently closed.'}
              </p>
            </div>
          </div>

          {/* Auth Card */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm space-y-6">
            {/* Tabs */}
            <div className="flex border-b border-slate-700 pb-3 gap-2">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setAuthError(null); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!isSlotClaimed) {
                    setAuthMode('register');
                    setAuthError(null);
                  }
                }}
                disabled={isSlotClaimed}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                  authMode === 'register'
                    ? 'bg-emerald-600 text-white shadow-sm cursor-pointer'
                    : isSlotClaimed
                    ? 'text-slate-500 opacity-50 cursor-not-allowed'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50 cursor-pointer'
                }`}
                title={isSlotClaimed ? 'Registration is locked (1 slot limit reached)' : 'Create single master admin'}
              >
                {isSlotClaimed ? <Lock className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                <span>Create Admin {isSlotClaimed ? '(Locked)' : '(1 Slot)'}</span>
              </button>
            </div>

            {/* Error / Success Notifications */}
            {authError && (
              <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-600/50 text-rose-200 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{authError}</span>
              </div>
            )}
            {authSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{authSuccess}</span>
              </div>
            )}

            {/* Form: LOGIN */}
            {authMode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Admin Username or Hospital Email
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="e.g. admin or dr.smith@medivance.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Administrator Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAuthLoading}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isAuthLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
                  <span>Sign In to Admin Portal</span>
                </button>
              </form>
            )}

            {/* Form: REGISTER (SINGLE SLOT) */}
            {authMode === 'register' && !isSlotClaimed && (
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-[11px] text-emerald-300 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    You are setting up the <strong>Primary Master Administrator</strong> account. Once registered, this registration portal will permanently close.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Administrator Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="e.g. Dr. Arthur Pendelton"
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Admin Username *
                    </label>
                    <input
                      type="text"
                      required
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      placeholder="admin"
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Hospital Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="admin@medivance.com"
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Emergency Security Recovery PIN (Optional)
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={regSecurityPin}
                    onChange={(e) => setRegSecurityPin(e.target.value)}
                    placeholder="e.g. 948271"
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAuthLoading}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {isAuthLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                  <span>Create Single Master Account & Lock Slot</span>
                </button>
              </form>
            )}

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="text-xs text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <span>← Return to Public Hospital Website</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LOGGED-IN ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-20">
      {/* Top Admin Navigation Bar */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight">Medivance OPD Administration</h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold">
                  Live Supabase Sync
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Logged in as <strong className="text-slate-200">{session.admin.fullName}</strong> ({session.admin.role})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <button
              onClick={loadAllAppointments}
              disabled={isLoadingData}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
              title="Refresh database records"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? 'animate-spin text-blue-400' : 'text-slate-400'}`} />
              <span>{isLoadingData ? 'Syncing...' : 'Refresh'}</span>
            </button>

            <button
              onClick={exportToCsv}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
              title="Export filtered records to CSV spreadsheet"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            >
              Public Site
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Action Notice Banner */}
        {actionNotice && (
          <div className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs animate-in fade-in ${
            actionNotice.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}>
            <div className="flex items-center gap-2">
              {actionNotice.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span className="font-medium">{actionNotice.message}</span>
            </div>
            <button
              onClick={() => setActionNotice(null)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Dashboard Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Total Bookings</span>
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{metrics.total}</p>
            <p className="text-[11px] text-slate-400">All recorded patient visits</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Today's Roster</span>
              <Clock className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-700">{metrics.todayCount}</p>
            <p className="text-[11px] text-slate-400">Scheduled for today</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Pending Action</span>
              <Clock3 className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-amber-700">{metrics.pending}</p>
            <p className="text-[11px] text-amber-600/80 font-medium">Awaiting OPD confirmation</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Confirmed</span>
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-700">{metrics.scheduled}</p>
            <p className="text-[11px] text-slate-400">Officially scheduled</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Telehealth Visits</span>
              <Stethoscope className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-2xl font-bold text-indigo-700">{metrics.telehealth}</p>
            <p className="text-[11px] text-slate-400">Virtual consultations</p>
          </div>
        </div>

        {/* Navigation Subtabs */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>All Bookings Registry ({filteredAppointments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('today')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'today'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Today's Clinic Manifest ({todayAppointments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Profile & Security</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 px-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Supabase: <strong>gfcaucmuuxsberlsbksv</strong></span>
          </div>
        </div>

        {/* TAB 1: ALL BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-6">
            {/* Search & Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
              {/* Search input */}
              <div className="lg:col-span-4 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search patient, ref#, doctor, phone..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Status Filter */}
              <div className="lg:col-span-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                >
                  <option value="all">Status: All Bookings</option>
                  <option value="Pending Confirmation">Pending Confirmation</option>
                  <option value="Scheduled">Scheduled / Confirmed</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Department Filter */}
              <div className="lg:col-span-3">
                <select
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                >
                  <option value="all">Department: All Clinics</option>
                  {departmentsData.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div className="lg:col-span-2">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                >
                  <option value="all">Date: Any Time</option>
                  <option value="today">Today's Visits</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past Records</option>
                </select>
              </div>
            </div>

            {/* Bookings Table */}
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">No appointments found matching your filters</p>
                <p className="text-xs text-slate-500">Try adjusting your search terms or status selection.</p>
                {(searchQuery || statusFilter !== 'all' || deptFilter !== 'all' || dateFilter !== 'all') && (
                  <button
                    onClick={() => { setSearchQuery(''); setStatusFilter('all'); setDeptFilter('all'); setDateFilter('all'); }}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Ref # & Date</th>
                      <th className="py-3 px-4">Patient Profile</th>
                      <th className="py-3 px-4">Department & Doctor</th>
                      <th className="py-3 px-4">Appointment Schedule</th>
                      <th className="py-3 px-4">Status & Action</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {filteredAppointments.map((app) => (
                      <tr key={app.referenceNumber} className="hover:bg-slate-50/80 transition-colors">
                        {/* Ref # */}
                        <td className="py-3.5 px-4 align-top">
                          <div className="flex items-center gap-1.5 font-mono font-bold text-slate-900">
                            <span>{app.referenceNumber}</span>
                            <button
                              onClick={() => copyRefNumber(app.referenceNumber)}
                              className="text-slate-400 hover:text-blue-600 cursor-pointer"
                              title="Copy Reference Number"
                            >
                              {copiedRef === app.referenceNumber ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            Booked: {new Date(app.createdAt).toLocaleDateString()}
                          </p>
                        </td>

                        {/* Patient */}
                        <td className="py-3.5 px-4 align-top">
                          <p className="font-bold text-slate-900">{app.fullName}</p>
                          <div className="text-[11px] text-slate-500 space-y-0.5 mt-0.5">
                            <p className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-400" />
                              <span>{app.phone}</span>
                            </p>
                            <p className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-slate-400" />
                              <span className="truncate max-w-[160px]">{app.email}</span>
                            </p>
                          </div>
                        </td>

                        {/* Dept & Doctor */}
                        <td className="py-3.5 px-4 align-top">
                          <p className="font-semibold text-slate-800">{app.departmentName}</p>
                          <p className="text-[11px] text-blue-600 font-medium">{app.doctorName}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]">
                            {app.appointmentType}
                          </span>
                        </td>

                        {/* Schedule */}
                        <td className="py-3.5 px-4 align-top">
                          <div className="flex items-center gap-1.5 font-bold text-slate-800">
                            <Calendar className="w-3.5 h-3.5 text-blue-600" />
                            <span>{app.preferredDate}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-600 text-[11px] mt-0.5 font-medium">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{app.preferredTime}</span>
                          </div>
                        </td>

                        {/* Status dropdown */}
                        <td className="py-3.5 px-4 align-top">
                          <select
                            value={app.status}
                            disabled={isUpdatingStatus === app.referenceNumber}
                            onChange={(e) => handleStatusChange(app.referenceNumber, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${
                              app.status === 'Pending Confirmation'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : app.status === 'Scheduled'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : app.status === 'Completed'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : 'bg-slate-100 text-slate-700 border-slate-300'
                            }`}
                          >
                            <option value="Pending Confirmation">Pending Confirmation</option>
                            <option value="Scheduled">Scheduled (Confirmed)</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 align-top text-right space-x-1.5">
                          <button
                            onClick={() => setSelectedAppointment(app)}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                            title="View Full Booking Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => printAppointmentReceipt(app)}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Print Patient Receipt Voucher"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteBooking(app.referenceNumber)}
                            className="p-1.5 rounded-lg border border-slate-200 text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                            title="Delete Appointment Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TODAY'S MANIFEST */}
        {activeTab === 'today' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">Today's Patient OPD Manifest</h3>
                <p className="text-xs text-slate-500">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} • {todayAppointments.length} Patient arrivals scheduled
                </p>
              </div>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Clinic Daily Sheet</span>
              </button>
            </div>

            {todayAppointments.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <Clock className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">No appointments booked for today yet</p>
                <p className="text-xs text-slate-500">Any booking scheduled for today will automatically show on this daily manifest.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {todayAppointments.map((app) => (
                  <div
                    key={app.referenceNumber}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[11px] font-bold">
                        {app.preferredTime}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        app.status === 'Scheduled' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{app.fullName}</h4>
                      <p className="text-xs text-slate-600">{app.departmentName} • <strong className="text-blue-600">{app.doctorName}</strong></p>
                      <p className="text-[11px] text-slate-500 mt-1"><strong>Phone:</strong> {app.phone} | <strong>Reason:</strong> {app.reasonForVisit}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] text-slate-500">#{app.referenceNumber}</span>
                      <button
                        onClick={() => printAppointmentReceipt(app)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Printer className="w-3 h-3" />
                        <span>Print Slip</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ADMIN SECURITY & PROFILE */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Account Card */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-600">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Hospital Master Admin Profile</h3>
                  <p className="text-xs text-slate-500">Single administrator authorization credentials</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Administrator Name:</span>
                  <span className="font-bold text-slate-900">{session.admin.fullName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Admin Username:</span>
                  <span className="font-mono font-semibold text-slate-900">{session.admin.username}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Registered Email:</span>
                  <span className="font-medium text-slate-900">{session.admin.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Role Privilege:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {session.admin.role}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Single Slot Status:</span>
                  <span className="font-semibold text-slate-900 flex items-center gap-1 text-emerald-700">
                    <Lock className="w-3.5 h-3.5" /> 1 of 1 Claimed (Locked)
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-medium">Created On:</span>
                  <span className="text-slate-600">
                    {session.admin.createdAt ? new Date(session.admin.createdAt).toLocaleDateString() : 'Active'}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <ShieldAlert className="w-4 h-4 text-amber-700" />
                  <span>Single Admin Policy Enforced:</span>
                </p>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  Public signup for other users is disabled. No second admin account can be created without clearing master credentials.
                </p>
              </div>
            </div>

            {/* Change Password Form */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Update Admin Password</h3>
                  <p className="text-xs text-slate-500">Change your master login password securely</p>
                </div>
              </div>

              {pwdMsg && (
                <div className={`p-3 rounded-xl text-xs font-medium ${
                  pwdMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {pwdMsg.text}
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Current Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPwd}
                    onChange={(e) => setCurrentPwd(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    New Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmNewPwd}
                    onChange={(e) => setConfirmNewPwd(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Update Master Password
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* APPOINTMENT DETAIL VIEW MODAL */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Appointment Details
                  </h3>
                  <p className="text-xs font-mono text-slate-500">
                    Ref: #{selectedAppointment.referenceNumber}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Content Details */}
            <div className="space-y-4 text-xs text-slate-700">
              {/* Status Row */}
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-slate-500 text-[11px]">Current Status:</span>
                  <p className="font-bold text-slate-900 text-sm">{selectedAppointment.status}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedAppointment.referenceNumber, 'Scheduled')}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Confirm / Schedule
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedAppointment.referenceNumber, 'Completed')}
                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Mark Completed
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wider text-[10px] text-slate-400">Patient Information</h4>
                  <div className="space-y-1.5">
                    <p><strong>Name:</strong> {selectedAppointment.fullName}</p>
                    <p><strong>Phone:</strong> {selectedAppointment.phone}</p>
                    <p><strong>Email:</strong> {selectedAppointment.email}</p>
                    <p><strong>DOB / Gender:</strong> {selectedAppointment.dob || 'N/A'} ({selectedAppointment.gender})</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wider text-[10px] text-slate-400">Clinical Allocation</h4>
                  <div className="space-y-1.5">
                    <p><strong>Department:</strong> {selectedAppointment.departmentName}</p>
                    <p><strong>Physician:</strong> {selectedAppointment.doctorName}</p>
                    <p><strong>Schedule:</strong> {selectedAppointment.preferredDate} at {selectedAppointment.preferredTime}</p>
                    <p><strong>Consultation Mode:</strong> {selectedAppointment.appointmentType}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1 uppercase tracking-wider text-[10px] text-slate-400">Clinical Reason</h4>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="leading-relaxed">{selectedAppointment.reasonForVisit}</p>
                  {selectedAppointment.additionalMessage && (
                    <p className="mt-2 pt-2 border-t border-slate-200 text-slate-500 italic">
                      <strong>Patient Notes:</strong> {selectedAppointment.additionalMessage}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                onClick={() => printAppointmentReceipt(selectedAppointment)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Voucher</span>
              </button>

              <button
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
