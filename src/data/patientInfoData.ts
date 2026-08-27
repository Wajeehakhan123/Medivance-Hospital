export interface PatientGuideSection {
  id: string;
  title: string;
  badge: string;
  iconName: string;
  summary: string;
  details: string[];
  tips?: string[];
}

export const patientInfoSections: PatientGuideSection[] = [
  {
    id: 'new-patient-registration',
    title: 'New Patient Registration',
    badge: 'Step-by-Step Guide',
    iconName: 'UserCheck',
    summary: 'We strive to make your first visit simple, welcoming, and efficient. You can pre-register online or at our central admissions desk.',
    details: [
      'Digital Pre-Registration: Complete the online intake form 24 hours prior to your visit to skip front-desk waiting lines.',
      'Check-In Counter: Located on Ground Floor, Main Lobby (Entrance A). Friendly guest service coordinators will guide you.',
      'Unique Patient ID (UHID): You will receive a secure medical record number used across all hospital visits, lab results, and consultations.',
      'Interpreter Services: Certified medical interpreters in over 20 languages available at no additional cost upon request.'
    ],
    tips: [
      'Arrive 15 minutes before your scheduled appointment time.',
      'Have your photo identification and insurance policy cards ready.'
    ]
  },
  {
    id: 'what-to-bring',
    title: 'What to Bring to Your Appointment',
    badge: 'Checklist',
    iconName: 'Briefcase',
    summary: 'Having the right documents and medical history ensures your physician can provide the most comprehensive evaluation.',
    details: [
      'Valid Government Photo ID (Driver’s License, Passport, or State ID)',
      'Current Health Insurance Card and primary policy holder information',
      'Referral letter or authorization form from your primary physician (if required by insurance)',
      'List of all current medications, vitamins, supplements, and exact dosages',
      'Previous medical records, CD/DVD imaging discs (MRI, CT, X-Ray), and recent laboratory reports',
      'Comfortable, loose-fitting clothing suitable for clinical physical examinations'
    ],
    tips: [
      'You can upload previous reports in advance through our online appointment portal.',
      'Write down questions you want to ask your doctor in advance.'
    ]
  },
  {
    id: 'visiting-hours',
    title: 'Visiting Hours & Ward Guidelines',
    badge: 'Hospital Policy',
    iconName: 'Clock',
    summary: 'Family and loved ones play a vital role in recovery. Our visiting guidelines balance comforting companionship with patient rest and infection prevention.',
    details: [
      'General Inpatient Wards: 10:00 AM - 1:00 PM and 4:30 PM - 8:30 PM daily (Maximum 2 visitors at bedside at a time).',
      'Intensive Care Units (ICU / CCU): 11:00 AM - 12:00 PM and 5:00 PM - 6:00 PM (Immediate family only, 1 visitor at a time).',
      'Maternity & Labor Suites (LDRP): Partner or primary support person has 24/7 rooming-in privileges.',
      'Pediatric Pavilion: One parent or guardian is accommodated to stay overnight in the child’s room 24/7.',
      'Children Visitors: Visitors under 12 years of age must be accompanied by an adult and cleared with nursing staff.'
    ],
    tips: [
      'Sanitize hands upon entering and leaving patient rooms.',
      'Visitors with cold, flu, fever, or infectious symptoms are strictly asked to refrain from visiting.'
    ]
  },
  {
    id: 'insurance-billing',
    title: 'Insurance, Cashless TPA & Payment Options',
    badge: 'Financial Services',
    iconName: 'CreditCard',
    summary: 'We partner with over 45 major health insurance networks and third-party administrators (TPAs) for hassle-free cashless claims.',
    details: [
      'Accepted Insurances: BlueCross BlueShield, Aetna, Cigna, UnitedHealthcare, Medicare, Humana, Kaiser Permanente, and all major commercial plans.',
      'Cashless Claim Desk: Located in Main Lobby, Counter 4. Open 24/7 for emergency and planned inpatient admissions.',
      'Financial Counseling: Our dedicated financial advisors help explain cost estimates, deductible responsibilities, and payment plan options.',
      'Accepted Payment Methods: Major credit/debit cards (Visa, MasterCard, Amex), Apple Pay, Google Pay, wire transfers, HSA/FSA cards, and interest-free installment plans.'
    ],
    tips: [
      'Bring your pre-authorization approval letter for elective surgeries.',
      'Emergency admissions do not require upfront payments before medical stabilization.'
    ]
  },
  {
    id: 'prescriptions-records',
    title: 'Prescriptions & Medical Records',
    badge: 'Digital Health Portal',
    iconName: 'FileText',
    summary: 'Access your electronic health records, diagnostic scan reports, and e-prescriptions anytime through our secure HIPAA-compliant portal.',
    details: [
      'Electronic Prescriptions: Your physician sends prescriptions straight to the in-house 24/7 pharmacy or your preferred local pharmacy.',
      'Medical Records (HIM) Desk: Request certified physical copies of discharge summaries, operative notes, and imaging films on Floor 1, Room 108.',
      'Online Patient Portal: Instant 24/7 access to lab results, doctor consultation notes, immunization history, and billing invoices.',
      'Confidentiality & Privacy: All patient records are secured according to strict federal HIPAA and international data security standards.'
    ],
    tips: [
      'Routine blood test results are uploaded to the portal within 2 hours of completion.',
      'You can request official records by calling Ext. 4015 or emailing records@medivancehospital.com'
    ]
  },
  {
    id: 'discharge-homecare',
    title: 'Discharge Process & Home-Care Support',
    badge: 'Safe Transition',
    iconName: 'Home',
    summary: 'Our care continues even after you leave our hospital doors. We ensure a safe, structured transition back home.',
    details: [
      'Discharge Timing: Inpatient discharge paperwork and billing reconciliations are completed between 10:00 AM and 1:00 PM.',
      'Medication Counseling: A clinical pharmacist meets with you at bedside to explain every medication, timing, dosage, and food precautions.',
      'Discharge Folder: You will receive a comprehensive printed summary containing follow-up appointments, wound care steps, and red-flag symptoms.',
      'Home-Care Nursing & Telehealth: Medivance Home-Care provides visiting nurse dressings, physical therapy, and follow-up telehealth visits.'
    ],
    tips: [
      'A hospital coordinator will call you 48 hours post-discharge to check on your recovery.',
      'If you have questions about your home medications, call our 24/7 Post-Discharge Hotline.'
    ]
  }
];

export const admissionGuidelines = {
  requiredDocuments: [
    'Government photo ID (Passport / Driver\'s License / State ID)',
    'Original Health Insurance card or Corporate TPA authorization',
    'Doctor\'s admission note and clinical prescription',
    'Prior diagnostic reports, MRI/CT films, and lab results',
    'List of current regular medications with packaging'
  ],
  whatToBring: [
    'Comfortable cotton clothing / nightwear and non-slip footwear',
    'Personal toiletries (toothbrush, comb, shaving kit)',
    'Mobile phone and charger with long charging cord',
    'Spectacles, hearing aids, or CPAP machine if routinely used',
    'Copy of Advance Healthcare Directive or Power of Attorney (if available)'
  ]
};

export const visitingHours = [
  {
    ward: 'General Inpatient Rooms & Suites',
    hours: '10:00 AM – 1:00 PM & 4:30 PM – 8:30 PM',
    rules: 'Max 2 visitors at bedside'
  },
  {
    ward: 'Intensive Care Units (ICU, CCU, CTVS)',
    hours: '11:00 AM – 12:00 PM & 5:00 PM – 6:00 PM',
    rules: 'Immediate family only (1 visitor)'
  },
  {
    ward: 'Maternity & Labor Suites (LDRP)',
    hours: '24/7 Rooming-in for Spouse / Partner',
    rules: 'General guests: 11:00 AM – 7:00 PM'
  },
  {
    ward: 'Pediatric & NICU Pavilion',
    hours: '24/7 Overnight Stay for Parents',
    rules: 'Other visitors: 2:00 PM – 6:00 PM'
  }
];

export const patientRights = {
  rights: [
    'Right to respectful, dignified, and culturally sensitive medical care without discrimination.',
    'Right to complete information regarding clinical diagnosis, proposed treatments, risks, and prognosis in understandable terms.',
    'Right to give informed consent or refuse any procedure or treatment.',
    'Right to privacy and confidentiality of all medical records in compliance with HIPAA.',
    'Right to an itemized, transparent bill with full cost breakdowns.'
  ],
  responsibilities: [
    'Provide accurate and complete personal medical history, past allergies, and medications.',
    'Follow the clinical treatment plan recommended by your attending medical team.',
    'Respect the quiet and privacy rights of fellow inpatient roommates and clinical staff.',
    'Observe hospital safety, smoking, and infection control hygiene protocols.'
  ]
};

export const insurancePartners = [
  'BlueCross BlueShield',
  'Aetna Healthcare',
  'Cigna Global Health',
  'UnitedHealthcare',
  'Medicare & Medicaid',
  'Humana Health',
  'Kaiser Permanente',
  'MetLife Medical',
  'Anthem Health',
  'Allianz Care',
  'Bupa International',
  'Optum Health'
];

export const hospitalAmenities = [
  {
    title: 'The Grove Organic Cafeteria',
    icon: 'Coffee',
    description: 'Fresh nutritious meals, artisan coffee, salads, diabetic-friendly selections, and 24-hour grab-and-go kiosk.',
    location: 'Ground Floor, Courtyard Plaza'
  },
  {
    title: 'High-Speed Medical Wi-Fi',
    icon: 'Wifi',
    description: 'Complimentary high-speed fiber Wi-Fi throughout all inpatient rooms, waiting lounges, and ICU visitor areas.',
    location: 'Campus-wide (Network: Medivance-Guest)'
  },
  {
    title: '24/7 In-House Pharmacy',
    icon: 'Pill',
    description: 'Full inventory of specialty oncology, cardiac, critical care, and compounding prescription medications.',
    location: 'Ground Floor, Near Entrance A'
  },
  {
    title: 'Multi-Level Parking & Valet',
    icon: 'Car',
    description: 'Covered parking with 600+ spaces, EV fast chargers, wheelchair accessibility ramps, and free 24/7 ER valet.',
    location: 'East Wing Garage & Main Portico'
  },
  {
    title: 'Interfaith Prayer & Meditation Sanctuary',
    icon: 'Heart',
    description: 'Quiet, serene spaces for reflection, prayer, and emotional support across all religious traditions.',
    location: 'Floor 2, South Atrium'
  },
  {
    title: 'Bank ATMs & Forex Services',
    icon: 'CreditCard',
    description: '24/7 multi-currency ATMs (Chase, Bank of America) and international patient foreign exchange desk.',
    location: 'Main Lobby B'
  }
];
