export type PageId =
  | 'home'
  | 'about'
  | 'departments'
  | 'doctors'
  | 'services'
  | 'appointment'
  | 'emergency'
  | 'patient-info'
  | 'blog'
  | 'contact'
  | 'faqs'
  | 'privacy'
  | 'terms'
  | 'admin';

export interface AdminAccount {
  id: string;
  fullName: string;
  username: string;
  email: string;
  passwordHash: string;
  role: 'Super Administrator';
  createdAt: string;
  lastLoginAt?: string;
  securityPin?: string;
}

export interface AdminSession {
  token: string;
  admin: {
    id: string;
    fullName: string;
    username: string;
    email: string;
    role: string;
  };
  loginTime: string;
}

export interface Doctor {
  id: string;
  name: string;
  departmentId: string;
  departmentName: string;
  specialty: string;
  qualifications: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  languages: string[];
  availability: string[]; // e.g. ["Mon", "Tue", "Thu", "Sat"]
  timing: string; // e.g. "09:00 AM - 02:00 PM"
  consultationFee: string;
  image: string;
  bio: string;
  expertise: string[];
  education: string[];
  roomNumber: string;
  featured?: boolean;
}

export interface Department {
  id: string;
  name: string;
  shortDescription: string;
  fullOverview: string;
  iconName: string;
  image: string;
  headOfDepartment: string;
  phoneExtension: string;
  openingHours: string;
  emergencySupport: boolean;
  servicesOffered: string[];
  commonConditions: string[];
  stats: {
    label: string;
    value: string;
  }[];
  featured?: boolean;
}

export interface MedicalService {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: 'Diagnostic' | 'Clinical' | 'Surgical' | 'Emergency' | 'Wellness' | 'Critical Care';
  iconName: string;
  features: string[];
  turnaroundTime: string;
  preparationNotes: string;
  availability: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Heart Health' | "Women's Health" | "Children's Health" | 'Mental Health' | 'Nutrition' | 'Preventive Care' | 'Fitness and Wellness';
  date: string;
  readTime: string;
  shortDescription: string;
  authorDoctorName: string;
  authorSpecialty: string;
  authorImage: string;
  coverImage: string;
  tags: string[];
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
    }[];
    keyTakeaways: string[];
  };
}

export interface Testimonial {
  id: string;
  patientName: string;
  location: string;
  treatment: string;
  doctorName: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  category: 'Appointments' | 'Insurance & Billing' | 'Emergency' | 'Patient Services' | 'Medical Records';
  question: string;
  answer: string;
}

export interface AppointmentRequest {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  departmentId: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  preferredDate: string;
  preferredTime: string;
  appointmentType: 'In-Person Consultation' | 'Video Telehealth' | 'Follow-up Visit' | 'Second Opinion' | 'Health Checkup Review';
  reasonForVisit: string;
  additionalMessage?: string;
  status: 'Pending Confirmation' | 'Under Review' | 'Scheduled';
  referenceNumber: string;
}
