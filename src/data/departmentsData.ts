import { Department } from '../types';

export const departmentsData: Department[] = [
  {
    id: 'cardiology',
    name: 'Cardiology & Heart Center',
    shortDescription: 'Comprehensive cardiovascular care, advanced catheterization, electrophysiology, and preventative heart wellness.',
    fullOverview: 'The Medivance Cardiology & Vascular Institute is a state-of-the-art center dedicated to the prevention, diagnosis, and treatment of complex cardiovascular diseases. Equipped with dual-plane digital cardiac catheterization labs and a 24/7 dedicated STEMI emergency response team, our board-certified cardiologists and cardiothoracic surgeons deliver world-class cardiac intervention.',
    iconName: 'HeartPulse',
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=900&q=80',
    headOfDepartment: 'Dr. Arthur Sterling, MD, FACC',
    phoneExtension: 'Ext. 4101 / 4102',
    openingHours: 'Mon - Sat: 8:00 AM - 8:00 PM (Emergency 24/7)',
    emergencySupport: true,
    servicesOffered: [
      'Coronary Angiography & Stenting',
      'Electrophysiology & Pacemaker Implantation',
      '3D Echocardiography & Stress Testing',
      'Heart Failure & Cardiac Rehabilitation',
      'Minimally Invasive Valve Repair (TAVR)',
      'Pediatric Cardiology Screening'
    ],
    commonConditions: [
      'Coronary Artery Disease',
      'Heart Attack (Myocardial Infarction)',
      'Arrhythmias & Atrial Fibrillation',
      'Hypertension & Vascular Disease',
      'Heart Failure & Cardiomyopathy',
      'Valvular Heart Disorders'
    ],
    stats: [
      { label: 'Cardiac Procedures', value: '4,500+/yr' },
      { label: 'Emergency STEMI Time', value: '< 45 min' },
      { label: 'Success Rate', value: '99.2%' }
    ],
    featured: true
  },
  {
    id: 'neurology',
    name: 'Neurology & Neurosurgery',
    shortDescription: 'Cutting-edge neuro-diagnostics, stroke intervention, neuro-oncology, and spine care.',
    fullOverview: 'Our Comprehensive Neurosciences Department combines neurological diagnostics with advanced neurosurgical procedures. Our dedicated Comprehensive Stroke Center provides rapid thrombolytic and endovascular thrombectomy care around the clock.',
    iconName: 'Brain',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=900&q=80',
    headOfDepartment: 'Dr. Elena Rostova, MD, PhD',
    phoneExtension: 'Ext. 4201',
    openingHours: 'Mon - Fri: 8:30 AM - 6:00 PM (24/7 Stroke Alert)',
    emergencySupport: true,
    servicesOffered: [
      'Rapid Stroke Thrombectomy & Thrombolysis',
      'Micro-Neurosurgery & Brain Tumor Resection',
      'Epilepsy Monitoring & Management (Video EEG)',
      'Parkinson’s & Movement Disorders Clinic',
      'Minimally Invasive Spine Surgery',
      'Neuromuscular & EMG Diagnostics'
    ],
    commonConditions: [
      'Acute Ischemic & Hemorrhagic Stroke',
      'Epilepsy & Seizure Disorders',
      'Parkinson’s Disease & Tremors',
      'Multiple Sclerosis & Neuro-immunology',
      'Migraines & Chronic Headaches',
      'Herniated Discs & Sciatica'
    ],
    stats: [
      { label: 'Stroke Door-to-Needle', value: '< 30 min' },
      { label: 'Brain & Spine Surgeries', value: '1,800+/yr' },
      { label: 'Neuro ICU Beds', value: '24 Beds' }
    ],
    featured: true
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Joint Replacement',
    shortDescription: 'Robot-assisted joint replacements, sports medicine, trauma surgery, and spinal rehabilitation.',
    fullOverview: 'The Medivance Center for Bone and Joint Health brings together world-class orthopedic surgeons, sports medicine specialists, and physical therapists. We utilize Mako robotic-arm assisted surgical technology for sub-millimeter precision in knee and hip replacements.',
    iconName: 'Bone',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80',
    headOfDepartment: 'Dr. Marcus Vance, MD, FAAOS',
    phoneExtension: 'Ext. 4301',
    openingHours: 'Mon - Sat: 8:00 AM - 7:00 PM',
    emergencySupport: true,
    servicesOffered: [
      'Robotic Total Knee & Hip Arthroplasty',
      'Arthroscopic Shoulder & Knee Reconstruction',
      'Complex Fracture & Trauma Care',
      'Spine Fusion & Disc Replacement',
      'Pediatric Orthopedic Corrections',
      'Sports Injury & Athlete Conditioning'
    ],
    commonConditions: [
      'Osteoarthritis of Knee & Hip',
      'ACL, Meniscus & Rotator Cuff Tears',
      'Bone Fractures & Dislocations',
      'Carpal Tunnel & Hand Injuries',
      'Scoliosis & Spinal Stenosis',
      'Osteoporosis & Bone Fragility'
    ],
    stats: [
      { label: 'Joint Replacements', value: '3,200+/yr' },
      { label: 'Robotic Precision', value: '< 0.5 mm' },
      { label: 'Rapid Recovery Track', value: '96% Walk in 24h' }
    ],
    featured: true
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics & Child Care',
    shortDescription: 'Compassionate pediatric medicine, Level III NICU, developmental monitoring, and adolescent care.',
    fullOverview: 'From newborn intensive care to adolescent medicine, our pediatric team creates a comforting, child-friendly environment. Our pediatricians, subspecialists, and pediatric nurses ensure every child receives tailored, nurturing care.',
    iconName: 'Baby',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80',
    headOfDepartment: 'Dr. Sarah Jenkins, MD, FAAP',
    phoneExtension: 'Ext. 4401',
    openingHours: 'Mon - Sun: 8:00 AM - 9:00 PM (Emergency 24/7)',
    emergencySupport: true,
    servicesOffered: [
      'Level III Neonatal Intensive Care (NICU)',
      'Pediatric Immunization & Well-Child Checks',
      'Pediatric Allergy & Pulmonology Clinic',
      'Developmental Milestones & Growth Tracking',
      'Pediatric Emergency Response',
      'Adolescent Health & Nutrition'
    ],
    commonConditions: [
      'Childhood Asthma & Bronchitis',
      'Neonatal Jaundice & Prematurity',
      'Viral Fevers & Pediatric Infections',
      'Food Allergies & Eczema',
      'ADHD & Developmental Delays',
      'Gastroenteritis & Dehydration'
    ],
    stats: [
      { label: 'Level III NICU Beds', value: '32 Beds' },
      { label: 'Young Patients Healed', value: '25,000+/yr' },
      { label: 'Parent Satisfaction', value: '99.4%' }
    ],
    featured: true
  },
  {
    id: 'gynecology-obstetrics',
    name: 'Gynecology and Obstetrics',
    shortDescription: 'Comprehensive maternity suites, high-risk pregnancy management, fertility care, and women’s health.',
    fullOverview: 'Medivance Women’s Health Institute provides nurturing care across all life stages, from adolescent gynecology and prenatal care to labor & delivery and menopause management. Our modern LDRP (Labor, Delivery, Recovery, Postpartum) luxury suites provide safety and comfort.',
    iconName: 'HeartHandshake',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
    headOfDepartment: 'Dr. Claire Montgomery, MD, FACOG',
    phoneExtension: 'Ext. 4501',
    openingHours: 'Mon - Sat: 8:00 AM - 8:00 PM (24/7 Maternity Emergency)',
    emergencySupport: true,
    servicesOffered: [
      'Comprehensive Prenatal & High-Risk Pregnancy Care',
      'Private LDRP Labor Suites & Water Birth',
      'Laparoscopic & Hysteroscopic Surgeries',
      'Infertility Evaluation & Reproductive Support',
      'Cervical Cancer Screening & HPV Vaccines',
      'Menopause & Pelvic Health Center'
    ],
    commonConditions: [
      'High-Risk Gestation & Preeclampsia',
      'PCOS & Hormonal Imbalances',
      'Uterine Fibroids & Endometriosis',
      'Pelvic Organ Prolapse',
      'Ovarian Cysts',
      'Menopausal Disorders'
    ],
    stats: [
      { label: 'Deliveries Annually', value: '4,100+' },
      { label: 'High-Risk Safety Record', value: '99.8%' },
      { label: 'Private Suites', value: '40 LDRP' }
    ],
    featured: true
  },
  {
    id: 'dermatology',
    name: 'Dermatology & Skin Center',
    shortDescription: 'Clinical dermatology, skin cancer screening, laser therapeutics, and aesthetic care.',
    fullOverview: 'Our dermatology department delivers evidence-based clinical diagnostics for severe skin disorders, autoimmune skin conditions, pediatric dermatology, and cosmetic laser technologies.',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
    headOfDepartment: 'Dr. Julian Thorne, MD, FAAD',
    phoneExtension: 'Ext. 4601',
    openingHours: 'Mon - Sat: 9:00 AM - 6:00 PM',
    emergencySupport: false,
    servicesOffered: [
      'Full Body Mole Mapping & Dermoscopy',
      'Mohs Micrographic Surgery for Skin Cancer',
      'Targeted Biologics for Psoriasis & Eczema',
      'Medical Laser Therapy & Scar Revision',
      'Patch Testing for Contact Allergies',
      'Vitiligo & Pigmentary Disorder Therapies'
    ],
    commonConditions: [
      'Melanoma & Basal Cell Carcinoma',
      'Severe Acne & Rosacea',
      'Psoriasis & Atopic Dermatitis',
      'Hair Loss (Alopecia) & Scalp Disorders',
      'Fungal & Bacterial Skin Infections',
      'Autoimmune Blistering Diseases'
    ],
    stats: [
      { label: 'Skin Screenings', value: '8,500+/yr' },
      { label: 'Early Detection Rate', value: '98.5%' },
      { label: 'Laser Tech Suites', value: '6 Suites' }
    ],
    featured: false
  },
  {
    id: 'general-medicine',
    name: 'General & Internal Medicine',
    shortDescription: 'Primary care, chronic disease management, geriatric medicine, and complex diagnosis.',
    fullOverview: 'The cornerstone of patient health at Medivance Hospital. Our internists provide holistic diagnostic assessments, manage multiple overlapping chronic conditions, and orchestrate specialty consultations for seamless recovery.',
    iconName: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=80',
    headOfDepartment: 'Dr. Robert Harrison, MD, FACP',
    phoneExtension: 'Ext. 4001',
    openingHours: 'Mon - Sun: 7:30 AM - 8:30 PM',
    emergencySupport: true,
    servicesOffered: [
      'Comprehensive Adult Health Checkups',
      'Diabetes, Hypertension & Lipid Management',
      'Geriatric Care & Polypharmacy Review',
      'Infectious Disease Triage & Treatment',
      'Pre-Operative Medical Clearance',
      'Immunization & Preventive Guidance'
    ],
    commonConditions: [
      'Type 2 & Type 1 Diabetes Mellitus',
      'Essential Hypertension & Dyslipidemia',
      'Metabolic Syndrome',
      'Unexplained Fevers & Chronic Fatigue',
      'Thyroid & Endocrine Disorders',
      'Acute Respiratory & Urinary Infections'
    ],
    stats: [
      { label: 'Outpatient Visits', value: '45,000+/yr' },
      { label: 'Preventive Screenings', value: '12,000+/yr' },
      { label: 'Patient Retention', value: '97%' }
    ],
    featured: true
  },
  {
    id: 'general-surgery',
    name: 'General & Laparoscopic Surgery',
    shortDescription: 'Minimally invasive keyhole surgery, surgical oncology, hernia repair, and acute trauma interventions.',
    fullOverview: 'Equipped with modular laminar airflow operating suites and 4K ultra-high definition laparoscopic towers, our surgical team excels at both planned elective procedures and critical emergency surgical interventions.',
    iconName: 'Scissors',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=900&q=80',
    headOfDepartment: 'Dr. Vikram Patel, MS, FACS, FRCS',
    phoneExtension: 'Ext. 4701',
    openingHours: 'Mon - Sat: 8:00 AM - 7:00 PM (Emergency OR 24/7)',
    emergencySupport: true,
    servicesOffered: [
      'Single-Incision Laparoscopic Surgery (SILS)',
      'Advanced Hernia Repair (Inguinal, Umbilical, Incisional)',
      'Gallbladder (Cholecystectomy) & Appendix Surgeries',
      'Thyroid & Endocrine Surgery',
      'Gastrointestinal & Colorectal Resections',
      'Trauma Laparotomy & Wound Reconstruction'
    ],
    commonConditions: [
      'Gallstones & Cholecystitis',
      'Acute Appendicitis & Peritonitis',
      'Inguinal & Ventral Hernias',
      'Intestinal Obstruction & Adhesions',
      'Benign & Malignant Soft Tissue Tumors',
      'Hemorrhoids & Anal Fistulae'
    ],
    stats: [
      { label: 'Surgeries Performed', value: '5,000+/yr' },
      { label: 'Minimally Invasive %', value: '88%' },
      { label: 'Infection Rate', value: '< 0.2%' }
    ],
    featured: false
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology & Hepatology',
    shortDescription: 'Advanced endoscopy, colonoscopy, liver disease management, and digestive health clinics.',
    fullOverview: 'Our state-of-the-art Endoscopy Suite provides high-definition diagnostic and therapeutic procedures including ERCP, EUS (Endoscopic Ultrasound), capsule endoscopy, and liver stiffness elastography.',
    iconName: 'Activity',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80',
    headOfDepartment: 'Dr. Ananya Sen, MD, DM (Gastro)',
    phoneExtension: 'Ext. 4801',
    openingHours: 'Mon - Sat: 8:30 AM - 6:30 PM',
    emergencySupport: true,
    servicesOffered: [
      'Diagnostic & Therapeutic Upper GI Endoscopy',
      'High-Definition Screening Colonoscopy',
      'ERCP for Biliary & Pancreatic Disorders',
      'Endoscopic Ultrasound (EUS) & Fine Needle Aspiration',
      'FibroScan Liver Stiffness Assessment',
      'Inflammatory Bowel Disease (IBD) Clinic'
    ],
    commonConditions: [
      'GERD & Acid Reflux Disease',
      'Peptic Ulcer Disease & H. Pylori',
      'Fatty Liver & Cirrhosis',
      'Crohn’s Disease & Ulcerative Colitis',
      'Irritable Bowel Syndrome (IBS)',
      'Pancreatitis & Bile Duct Stones'
    ],
    stats: [
      { label: 'Endoscopic Procedures', value: '6,400+/yr' },
      { label: 'Polyp Detection Rate', value: '42%' },
      { label: 'Painless Sedation', value: '100% Monitored' }
    ],
    featured: false
  },
  {
    id: 'pulmonology',
    name: 'Pulmonology & Respiratory Medicine',
    shortDescription: 'Advanced pulmonary function testing, sleep apnea center, asthma clinic, and interventional bronchoscopy.',
    fullOverview: 'Specialized in adult and pediatric lung disorders, respiratory failure, asthma, COPD, and sleep apnea. Our specialized Respiratory ICU handles severe acute lung conditions with advanced non-invasive and invasive ventilation.',
    iconName: 'Wind',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80',
    headOfDepartment: 'Dr. David Chen, MD, FCCP',
    phoneExtension: 'Ext. 4901',
    openingHours: 'Mon - Sat: 9:00 AM - 6:00 PM',
    emergencySupport: true,
    servicesOffered: [
      'Comprehensive Pulmonary Function Testing (PFT)',
      'Diagnostic & Therapeutic Flexible Bronchoscopy',
      'Overnight Sleep Apnea Studies (Polysomnography)',
      'Allergy Testing & Desensitization',
      'Pulmonary Rehabilitation Program',
      'Critical Care Mechanical Ventilation'
    ],
    commonConditions: [
      'Asthma & Severe Bronchial Hyperactivity',
      'Chronic Obstructive Pulmonary Disease (COPD)',
      'Obstructive Sleep Apnea (OSA)',
      'Pneumonia & Pleural Effusion',
      'Interstitial Lung Disease (ILD)',
      'Post-Viral Pulmonary Fibrosis'
    ],
    stats: [
      { label: 'Sleep Studies Conducted', value: '1,400+/yr' },
      { label: 'Bronchoscopy Procedures', value: '950+/yr' },
      { label: 'Rehab Success Rate', value: '94%' }
    ],
    featured: false
  },
  {
    id: 'ent',
    name: 'ENT (Ear, Nose & Throat)',
    shortDescription: 'Otolaryngology, endoscopic sinus surgery, micro-ear surgery, voice clinic, and balance disorders.',
    fullOverview: 'Providing advanced micro-surgical and endoscopic interventions for hearing loss, chronic sinusitis, snoring, vocal cord nodules, and head and neck lesions.',
    iconName: 'Ear',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80',
    headOfDepartment: 'Dr. Margaret Cole, MS (ENT), DLO',
    phoneExtension: 'Ext. 5001',
    openingHours: 'Mon - Sat: 9:00 AM - 5:30 PM',
    emergencySupport: true,
    servicesOffered: [
      'Functional Endoscopic Sinus Surgery (FESS)',
      'Tympanoplasty & Mastoid Micro-Surgery',
      'Cochlear Implant & Audiology Screening',
      'Voice Therapy & Stroboscopy Clinic',
      'Snoring & Sleep Apnea Surgery',
      'Vertigo & Balance Testing (VNG)'
    ],
    commonConditions: [
      'Chronic Sinusitis & Nasal Polyps',
      'Tympanic Perforation & Otitis Media',
      'Hearing Loss & Tinnitus',
      'Tonsillitis & Adenoid Hypertrophy',
      'Vocal Cord Polyps & Hoarseness',
      'Benign Paroxysmal Positional Vertigo (BPPV)'
    ],
    stats: [
      { label: 'Audiometry Tests', value: '4,800+/yr' },
      { label: 'Sinus Procedures', value: '1,100+/yr' },
      { label: 'Ear Microsurgery Success', value: '98.1%' }
    ],
    featured: false
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology & Eye Center',
    shortDescription: 'Blade-free cataract surgery, retinal lasers, glaucoma management, and pediatric vision care.',
    fullOverview: 'The Medivance Eye Care Center provides laser eye surgery, phacoemulsification for cataracts, diabetic retinopathy laser management, and corneal collagen cross-linking.',
    iconName: 'Eye',
    image: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&w=900&q=80',
    headOfDepartment: 'Dr. Liam O’Connor, MD, FRCS (Ophth)',
    phoneExtension: 'Ext. 5101',
    openingHours: 'Mon - Sat: 8:30 AM - 6:00 PM',
    emergencySupport: true,
    servicesOffered: [
      'Micro-Incision Phaco Cataract Surgery with Premium IOLs',
      'Diabetic Retinopathy Green Laser & Anti-VEGF Therapy',
      'Glaucoma Valve Implantation & Trabeculectomy',
      'Corneal Topography & Keratoconus Treatment',
      'Pediatric Squint & Amblyopia Correction',
      'Automated Visual Field & OCT Imaging'
    ],
    commonConditions: [
      'Cataracts & Cloudy Lens',
      'Glaucoma & Elevated Intraocular Pressure',
      'Macular Degeneration & Diabetic Eye Disease',
      'Refractive Errors (Myopia, Hyperopia, Astigmatism)',
      'Dry Eye Syndrome & Blepharitis',
      'Retinal Detachment & Flashes'
    ],
    stats: [
      { label: 'Cataract Surgeries', value: '3,800+/yr' },
      { label: 'Vision Recovery Index', value: '99.6%' },
      { label: 'Diagnostic OCT Scans', value: '7,200+/yr' }
    ],
    featured: false
  },
  {
    id: 'urology',
    name: 'Urology & Andrology',
    shortDescription: 'Laser stone treatment (RIRS), prostate laser surgery (HoLEP), uro-oncology, and male wellness.',
    fullOverview: 'Featuring high-power Holmium lasers for non-invasive kidney stone pulverization and scarless prostate enlargement surgery. Our urology department ensures rapid outpatient recovery with minimal discomfort.',
    iconName: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=900&q=80',
    headOfDepartment: 'Dr. Samuel K. Bradley, MCh, FRCS',
    phoneExtension: 'Ext. 5201',
    openingHours: 'Mon - Sat: 9:00 AM - 6:00 PM',
    emergencySupport: true,
    servicesOffered: [
      'Retrograde Intrarenal Surgery (RIRS) with Laser Lithotripsy',
      'Holmium Laser Enucleation of Prostate (HoLEP)',
      'Laparoscopic Uro-Oncology (Kidney, Bladder, Prostate)',
      'Urodynamic Studies & Urinary Incontinence Clinic',
      'Erectile Dysfunction & Male Fertility Management',
      'Pediatric Urology (Hypospadias, Undescended Testis)'
    ],
    commonConditions: [
      'Kidney & Ureteral Stones',
      'Benign Prostatic Hyperplasia (BPH)',
      'Urinary Tract Infections (UTI) & Hematuria',
      'Prostate & Bladder Cancer',
      'Overactive Bladder & Stress Incontinence',
      'Varicocele & Male Infertility'
    ],
    stats: [
      { label: 'Laser Stone Procedures', value: '2,600+/yr' },
      { label: 'Day-Care Discharge Rate', value: '89%' },
      { label: 'Prostate Laser Precision', value: '99.4%' }
    ],
    featured: false
  },
  {
    id: 'oncology',
    name: 'Comprehensive Cancer Center (Oncology)',
    shortDescription: 'Medical oncology, surgical oncology, immunotherapy, targeted therapy, and supportive care.',
    fullOverview: 'Our multidisciplinary tumor board reviews every patient case collaboratively. We provide cutting-edge immunotherapy, outpatient day-care chemotherapy infusion suites, intraoperative radiation guidance, and palliative support.',
    iconName: 'Crosshair',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80',
    headOfDepartment: 'Dr. Maya Lin-Siddiqui, MD, FACP',
    phoneExtension: 'Ext. 5301',
    openingHours: 'Mon - Fri: 8:00 AM - 7:00 PM',
    emergencySupport: true,
    servicesOffered: [
      'Precision Immunotherapy & Targeted Biologicals',
      'Outpatient Chemotherapy Infusion Center',
      'Surgical Oncology & Organ-Preserving Resections',
      'Genomic Tumor Profiling & Next-Gen Sequencing',
      'Pain Management & Palliative Medicine',
      'Cancer Survivorship & Psycho-Oncology Counseling'
    ],
    commonConditions: [
      'Breast & Gynecological Cancers',
      'Lung & Thoracic Malignancies',
      'Gastrointestinal & Colorectal Cancers',
      'Leukemia, Lymphoma & Myeloma',
      'Head & Neck Malignancies',
      'Prostate & Urological Cancers'
    ],
    stats: [
      { label: 'Multi-Disciplinary Tumor Boards', value: '500+/yr' },
      { label: 'Infusion Suites', value: '28 Private Pods' },
      { label: '5-Year Survival Milestone', value: 'Above Natl. Avg' }
    ],
    featured: true
  },
  {
    id: 'nephrology',
    name: 'Nephrology & Renal Dialysis',
    shortDescription: 'Kidney disease management, high-flux hemodialysis, peritoneal dialysis, and kidney transplant center.',
    fullOverview: 'Providing 24-station ultra-pure water hemodialysis, continuous renal replacement therapy (CRRT) in the ICU, pre-transplant workup, and acute kidney injury intervention.',
    iconName: 'Droplet',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=900&q=80',
    headOfDepartment: 'Dr. Tariq Al-Mansoor, MD, FASN',
    phoneExtension: 'Ext. 5401',
    openingHours: 'Mon - Sun: 6:00 AM - 10:00 PM (Emergency Dialysis 24/7)',
    emergencySupport: true,
    servicesOffered: [
      'High-Flux Bicarbonate Hemodialysis',
      'Continuous Renal Replacement Therapy (CRRT)',
      'Automated Peritoneal Dialysis (APD) Training',
      'Kidney Biopsy & Glomerular Diagnostics',
      'Arteriovenous (AV) Fistula Creation & Angioplasty',
      'Kidney Transplant Evaluation & Post-Transplant Care'
    ],
    commonConditions: [
      'Chronic Kidney Disease (CKD Stage 1-5)',
      'End-Stage Renal Disease (ESRD)',
      'Diabetic Nephropathy & Glomerulonephritis',
      'Acute Kidney Injury (AKI)',
      'Refractory Hypertension',
      'Polycystic Kidney Disease'
    ],
    stats: [
      { label: 'Dialysis Sessions', value: '18,000+/yr' },
      { label: 'Zero-Water Contamination', value: '100% ISO Tested' },
      { label: 'CRRT Bedside Units', value: '8 ICU Units' }
    ],
    featured: false
  },
  {
    id: 'psychiatry',
    name: 'Psychiatry & Mental Health',
    shortDescription: 'Confidential psychiatric care, behavioral therapy, neuropsychiatry, addiction medicine, and counseling.',
    fullOverview: 'A compassionate, stigma-free wellness environment offering outpatient psychotherapy, psychopharmacology, stress reduction programs, child behavioral therapies, and sleep wellness.',
    iconName: 'Smile',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
    headOfDepartment: 'Dr. Rachel Greenburg, MD, FAPA',
    phoneExtension: 'Ext. 5501',
    openingHours: 'Mon - Sat: 9:00 AM - 7:00 PM',
    emergencySupport: true,
    servicesOffered: [
      'Comprehensive Psychiatric Evaluation',
      'Cognitive Behavioral Therapy (CBT) & Psychotherapy',
      'Depression & Bipolar Disorder Management',
      'Anxiety, Panic & PTSD Treatment Programs',
      'Adolescent & Child Behavioral Guidance',
      'Substance De-Addiction & Relapse Prevention'
    ],
    commonConditions: [
      'Major Depressive Disorder (MDD)',
      'Generalized Anxiety & Panic Disorder',
      'Bipolar Affective Disorder',
      'Obsessive-Compulsive Disorder (OCD)',
      'Sleep & Insomnia Disorders',
      'Burnout, Workplace Stress & Grief'
    ],
    stats: [
      { label: 'Therapy Sessions', value: '6,200+/yr' },
      { label: 'Confidentiality Compliance', value: '100% HIPAA' },
      { label: 'Recovery Improvement', value: '91%' }
    ],
    featured: false
  },
  {
    id: 'emergency-medicine',
    name: 'Emergency Medicine & Trauma Center',
    shortDescription: '24/7 Level 1 trauma center, rapid response code teams, mobile intensive care units, and disaster triage.',
    fullOverview: 'The front line of urgent lifesaving care. Staffed round-the-clock by board-certified emergency physicians, trauma surgeons, and acute care nurses prepared for every critical medical event.',
    iconName: 'Ambulance',
    image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=900&q=80',
    headOfDepartment: 'Dr. Gregory Hayes, MD, FACEP',
    phoneExtension: 'Ext. 911 / 4000',
    openingHours: '24 Hours a Day / 7 Days a Week / 365 Days a Year',
    emergencySupport: true,
    servicesOffered: [
      '24/7 Emergency Triage & Level 1 Trauma Resuscitation',
      'Dedicated Code STEMI (Heart Attack) & Code Stroke Protocols',
      'Pediatric Emergency Care & Dedicated Trauma Pods',
      'Advanced Ground & Air Helicopter Ambulance Transport',
      'Bedside Point-of-Care Ultrasound & Rapid Blood Gas',
      'Toxico-Poisoning & Burn Stabilization Suite'
    ],
    commonConditions: [
      'Multiple Trauma & Severe Accidents',
      'Acute Chest Pain & Cardiac Arrest',
      'Severe Stroke & Sudden Weakness',
      'Acute Respiratory Distress & Choking',
      'Uncontrolled Bleeding & Severe Burns',
      'Anaphylaxis & Poisoning Overdoses'
    ],
    stats: [
      { label: 'Emergency Admissions', value: '38,000+/yr' },
      { label: 'Triage Response Time', value: '< 2 minutes' },
      { label: 'Trauma Bay Capacity', value: '18 Bays' }
    ],
    featured: true
  },
  {
    id: 'dental-care',
    name: 'Dental Care & Maxillofacial Center',
    shortDescription: 'Comprehensive dental hygiene, cosmetic dentistry, orthodontics, and maxillofacial surgery.',
    fullOverview: 'Combining painless digital dentistry, 3D CBCT imaging, invisible aligners, dental implants, root canal therapy, and corrective jaw reconstructions.',
    iconName: 'SmilePlus',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80',
    headOfDepartment: 'Dr. Fiona Campbell, DDS, MS (OMFS)',
    phoneExtension: 'Ext. 5601',
    openingHours: 'Mon - Sat: 9:00 AM - 7:00 PM',
    emergencySupport: false,
    servicesOffered: [
      'Painless Single-Sitting Root Canal Treatment (RCT)',
      'Digital Dental Implants & Bone Grafting',
      'Clear Aligners & Orthodontic Braces',
      'Impacted Wisdom Tooth Extraction',
      'Cosmetic Smile Designing & Veneers',
      'Maxillofacial Trauma & Jaw Fracture Fixation'
    ],
    commonConditions: [
      'Dental Caries & Tooth Decay',
      'Gingivitis & Severe Periodontitis',
      'Impacted Wisdom Teeth & Pain',
      'Malocclusion & Crooked Teeth',
      'Temporomandibular Joint (TMJ) Pain',
      'Facial Trauma & Dental Avulsion'
    ],
    stats: [
      { label: 'Dental Procedures', value: '7,500+/yr' },
      { label: 'Implant Success Rate', value: '99.1%' },
      { label: 'Digital 3D Scanners', value: '100% Digital' }
    ],
    featured: false
  },
  {
    id: 'physiotherapy',
    name: 'Physiotherapy & Sports Rehabilitation',
    shortDescription: 'Post-surgical recovery, musculoskeletal rehab, stroke neuro-rehabilitation, and athletic performance.',
    fullOverview: 'A 6,000 sq. ft. modern rehabilitation gymnasium with hydrotherapy pool, anti-gravity treadmills, robotic gait trainers, and individualized therapeutic recovery regimens.',
    iconName: 'Dumbbell',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
    headOfDepartment: 'Dr. Nathan Reed, PT, DPT, OCS',
    phoneExtension: 'Ext. 5701',
    openingHours: 'Mon - Sat: 7:00 AM - 8:00 PM',
    emergencySupport: false,
    servicesOffered: [
      'Post-Surgical Joint Replacement Rehabilitation',
      'Neuro-Rehabilitation for Stroke & Spinal Injury',
      'Sports Injury Reconditioning & Return-to-Play',
      'Ergonomic Posture & Chronic Back Pain Program',
      'Aquatic Hydrotherapy & Gait Training',
      'Dry Needling, Shockwave & Laser Therapy'
    ],
    commonConditions: [
      'Post-Operative Stiffness & Muscle Weakness',
      'Chronic Low Back Pain & Sciatica',
      'Frozen Shoulder & Rotator Cuff Tendinopathy',
      'Stroke Hemiplegia & Balance Loss',
      'Tennis/Golfer’s Elbow & Plantar Fasciitis',
      'Ligament Sprains & Muscle Strains'
    ],
    stats: [
      { label: 'Rehab Sessions', value: '22,000+/yr' },
      { label: 'Functional Recovery Rate', value: '95.4%' },
      { label: 'Hydrotherapy Suite', value: 'Olympic Spec' }
    ],
    featured: false
  }
];
