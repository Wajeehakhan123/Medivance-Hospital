import { createClient } from '@supabase/supabase-js';
import { AppointmentRequest } from '../types';

// Supabase Project configuration
const getSupabaseUrl = (): string => {
  const envUrl = (import.meta.env && import.meta.env.VITE_SUPABASE_URL) ? String(import.meta.env.VITE_SUPABASE_URL).trim() : '';
  if (envUrl && (envUrl.startsWith('http://') || envUrl.startsWith('https://'))) {
    return envUrl;
  }
  return 'https://gfcaucmuuxsberlsbksv.supabase.co';
};

const getSupabaseKey = (): string => {
  const envKey = (import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) ? String(import.meta.env.VITE_SUPABASE_ANON_KEY).trim() : '';
  if (envKey && envKey.length > 5) {
    return envKey;
  }
  return 'sb_publishable_CW-ehdaraPErtGsffKfFLw_549tp8zD';
};

export const SUPABASE_URL = getSupabaseUrl();
export const SUPABASE_ANON_KEY = getSupabaseKey();

// Safely create Supabase client instance
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

// SQL Schema definition for the user's Supabase database
export const SUPABASE_APPOINTMENTS_SCHEMA_SQL = `-- Run this SQL query in your Supabase SQL Editor if the table is not yet created:
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference_number TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  dob DATE,
  gender TEXT,
  department_id TEXT NOT NULL,
  department_name TEXT NOT NULL,
  doctor_id TEXT,
  doctor_name TEXT,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  appointment_type TEXT NOT NULL,
  reason_for_visit TEXT NOT NULL,
  additional_message TEXT,
  status TEXT DEFAULT 'Pending Confirmation',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow public insert so website visitors can submit appointments
CREATE POLICY "Allow public inserts for appointments"
ON public.appointments
FOR INSERT
TO public
WITH CHECK (true);

-- Allow reading appointments
CREATE POLICY "Allow public select for appointments"
ON public.appointments
FOR SELECT
TO public
USING (true);
`;

export interface SupabaseSaveResult {
  success: boolean;
  data?: any;
  error?: string;
  isTableMissing?: boolean;
}

/**
 * Saves an appointment request into the Supabase 'appointments' table.
 */
export async function saveAppointmentToSupabase(
  request: AppointmentRequest
): Promise<SupabaseSaveResult> {
  try {
    const payload = {
      reference_number: request.referenceNumber,
      full_name: request.fullName,
      email: request.email,
      phone: request.phone,
      dob: request.dob || null,
      gender: request.gender,
      department_id: request.departmentId,
      department_name: request.departmentName,
      doctor_id: request.doctorId || null,
      doctor_name: request.doctorName,
      preferred_date: request.preferredDate,
      preferred_time: request.preferredTime,
      appointment_type: request.appointmentType,
      reason_for_visit: request.reasonForVisit,
      additional_message: request.additionalMessage || null,
      status: request.status || 'Pending Confirmation',
      created_at: request.createdAt || new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('appointments')
      .insert([payload])
      .select();

    if (error) {
      console.error('[Supabase Save Error]', error);
      const isMissing =
        error.code === '42P01' || // PostgreSQL undefined_table code
        error.message?.toLowerCase().includes('relation "public.appointments" does not exist') ||
        error.message?.toLowerCase().includes('table');

      return {
        success: false,
        error: error.message || 'Database insert failed',
        isTableMissing: isMissing
      };
    }

    return {
      success: true,
      data
    };
  } catch (err: any) {
    console.error('[Supabase Exception]', err);
    return {
      success: false,
      error: err?.message || 'Network error connecting to Supabase backend'
    };
  }
}

/**
 * Retrieves all appointments saved in Supabase (ordered by newest first).
 */
export async function fetchAppointmentsFromSupabase(): Promise<{
  data: AppointmentRequest[];
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { data: [], error: error.message };
    }

    if (!data) {
      return { data: [] };
    }

    const mapped: AppointmentRequest[] = data.map((row: any) => ({
      id: row.id || `supa-${row.reference_number}`,
      createdAt: row.created_at || new Date().toISOString(),
      fullName: row.full_name || '',
      email: row.email || '',
      phone: row.phone || '',
      dob: row.dob || '',
      gender: row.gender || 'Prefer not to say',
      departmentId: row.department_id || '',
      departmentName: row.department_name || 'General Department',
      doctorId: row.doctor_id || '',
      doctorName: row.doctor_name || 'Next Available Specialist',
      preferredDate: row.preferred_date || '',
      preferredTime: row.preferred_time || '',
      appointmentType: row.appointment_type || 'In-Person Consultation',
      reasonForVisit: row.reason_for_visit || '',
      additionalMessage: row.additional_message || '',
      status: row.status || 'Pending Confirmation',
      referenceNumber: row.reference_number || `MED-${Date.now()}`
    }));

    return { data: mapped };
  } catch (err: any) {
    return { data: [], error: err?.message || 'Failed to fetch appointments' };
  }
}

/**
 * Updates an appointment's status in Supabase
 */
export async function updateAppointmentStatusInSupabase(
  referenceNumber: string,
  newStatus: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status: newStatus })
      .eq('reference_number', referenceNumber);

    if (error) {
      console.warn('[Supabase Status Update Error]', error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update status' };
  }
}

/**
 * Deletes an appointment record from Supabase
 */
export async function deleteAppointmentFromSupabase(
  referenceNumber: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('reference_number', referenceNumber);

    if (error) {
      console.warn('[Supabase Delete Error]', error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to delete record' };
  }
}

// ----------------------------------------------------
// SINGLE-SLOT ADMIN ACCOUNT MANAGEMENT
// ----------------------------------------------------
const ADMIN_STORAGE_KEY = 'medivance_admin_master_account';
const ADMIN_SESSION_KEY = 'medivance_admin_active_session';

/**
 * Simple client-side hash function for secure local comparison
 */
export function hashAdminPassword(password: string): string {
  let hash = 0;
  const salted = `medivance_salt_2026_${password}_secure`;
  for (let i = 0; i < salted.length; i++) {
    const char = salted.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return 'hp_' + Math.abs(hash).toString(36) + '_' + salted.length;
}

/**
 * Checks if the single admin slot has already been claimed/registered.
 */
export function isSingleAdminSlotClaimed(): boolean {
  try {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return !!(parsed && parsed.username && parsed.passwordHash);
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Registers the ONLY permitted admin account. Fails if already claimed.
 */
export function registerSingleAdminAccount(details: {
  fullName: string;
  username: string;
  email: string;
  password: string;
  securityPin?: string;
}): { success: boolean; error?: string } {
  if (isSingleAdminSlotClaimed()) {
    return {
      success: false,
      error: 'Admin registration is closed. The single administrator slot has already been claimed.'
    };
  }

  const newAdmin = {
    id: `admin-${Date.now()}`,
    fullName: details.fullName.trim(),
    username: details.username.trim().toLowerCase(),
    email: details.email.trim().toLowerCase(),
    passwordHash: hashAdminPassword(details.password),
    securityPin: details.securityPin?.trim(),
    role: 'Super Administrator',
    createdAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(newAdmin));
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to save admin credentials' };
  }
}

/**
 * Authenticates the admin using username/email and password.
 */
export function loginAdminAccount(
  usernameOrEmail: string,
  passwordAttempt: string
): { success: boolean; session?: any; error?: string } {
  try {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!stored) {
      return {
        success: false,
        error: 'No administrator account exists yet. Please create your single admin account first.'
      };
    }

    const admin = JSON.parse(stored);
    const identifier = usernameOrEmail.trim().toLowerCase();
    const isUserMatch =
      admin.username.toLowerCase() === identifier ||
      admin.email.toLowerCase() === identifier;

    const computedHash = hashAdminPassword(passwordAttempt);
    const isPasswordMatch = admin.passwordHash === computedHash;

    if (!isUserMatch || !isPasswordMatch) {
      return {
        success: false,
        error: 'Invalid administrator credentials. Please check your username/email and password.'
      };
    }

    // Create session
    const session = {
      token: `admin-token-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      admin: {
        id: admin.id,
        fullName: admin.fullName,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        createdAt: admin.createdAt
      },
      loginTime: new Date().toISOString()
    };

    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));

    // Update last login
    admin.lastLoginAt = new Date().toISOString();
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(admin));

    return { success: true, session };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Authentication error' };
  }
}

/**
 * Gets current active admin session if valid.
 */
export function getActiveAdminSession(): any | null {
  try {
    const stored = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Logs out the administrator.
 */
export function logoutAdminAccount(): void {
  try {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  } catch (e) {
    console.warn(e);
  }
}

/**
 * Updates administrator password from dashboard
 */
export function updateAdminPassword(
  currentPassword: string,
  newPassword: string
): { success: boolean; error?: string } {
  try {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!stored) return { success: false, error: 'Admin account not found' };

    const admin = JSON.parse(stored);
    if (admin.passwordHash !== hashAdminPassword(currentPassword)) {
      return { success: false, error: 'Current password is incorrect' };
    }

    admin.passwordHash = hashAdminPassword(newPassword);
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(admin));
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update password' };
  }
}

/**
 * Tests connection to Supabase project
 */
export async function checkSupabaseConnection(): Promise<{
  connected: boolean;
  message: string;
}> {
  try {
    const { error } = await supabase.from('appointments').select('id').limit(1);
    if (error) {
      if (
        error.code === '42P01' ||
        error.message?.toLowerCase().includes('does not exist')
      ) {
        return {
          connected: true,
          message: 'Connected to Supabase project! (Table "appointments" will be auto-queried upon creation)'
        };
      }
      return {
        connected: false,
        message: `Supabase error: ${error.message}`
      };
    }
    return {
      connected: true,
      message: 'Successfully connected and verified Supabase "appointments" table!'
    };
  } catch (err: any) {
    return {
      connected: false,
      message: `Connection failed: ${err.message || 'Unknown network error'}`
    };
  }
}
