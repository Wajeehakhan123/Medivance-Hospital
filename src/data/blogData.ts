import { BlogPost } from '../types';

export const blogData: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Recognizing the Subtle Signs of Heart Disease in Men and Women',
    slug: 'subtle-signs-of-heart-disease',
    category: 'Heart Health',
    date: 'August 18, 2026',
    readTime: '5 min read',
    shortDescription: 'Cardiovascular symptoms are not always a sudden chest pain. Learn the subtle markers including unexplained fatigue, jaw ache, and breathlessness.',
    authorDoctorName: 'Dr. Arthur Sterling',
    authorSpecialty: 'Chief of Cardiology',
    authorImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=900&q=80',
    tags: ['Cardiology', 'Prevention', 'Heart Care', 'Warning Signs'],
    content: {
      intro: 'While movies often depict heart attacks as dramatic, clutching-the-chest events, the clinical reality is that cardiovascular disease often presents with subtle, easily dismissed warnings.',
      sections: [
        {
          heading: 'Gender Differences in Cardiac Symptoms',
          body: 'While crushing central chest pressure remains common in men, women frequently experience atypical signs including shortness of breath, unexplained nausea, persistent upper back ache, jaw discomfort, and profound unprovoked fatigue.'
        },
        {
          heading: 'When to Seek Immediate Emergency Evaluation',
          body: 'If any pressure or tightness in the chest radiates to the left arm, neck, or back—especially when accompanied by cold sweats or dizziness—call 911 immediately. Never attempt to drive yourself to the emergency department.'
        },
        {
          heading: 'Essential Preventive Steps',
          body: 'Monitoring your blood pressure (targeting under 120/80 mmHg), checking fasting lipid profiles annually, adhering to a Mediterranean-style whole-foods diet, and aiming for 150 minutes of moderate aerobic activity weekly will reduce overall cardiovascular risk by over 80%.'
        }
      ],
      keyTakeaways: [
        'Atypical symptoms like sudden fatigue and jaw tightness are frequent early warnings in women.',
        'Early emergency care (< 60 minutes) saves crucial heart muscle from permanent injury.',
        'Annual cardiac risk screening is recommended for all adults aged 35 and older.'
      ]
    }
  },
  {
    id: 'blog-2',
    title: 'Nurturing Maternal Wellness: A Trimester-by-Trimester Guide',
    slug: 'maternal-wellness-trimester-guide',
    category: "Women's Health",
    date: 'August 12, 2026',
    readTime: '6 min read',
    shortDescription: 'Essential medical milestones, nutritional priorities, and emotional wellbeing practices for expectant mothers from conception through postpartum.',
    authorDoctorName: 'Dr. Claire Montgomery',
    authorSpecialty: 'Maternal-Fetal Medicine Specialist',
    authorImage: 'https://images.unsplash.com/photo-1594824813501-48356fd836e5?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
    tags: ['Maternity', 'Pregnancy', 'Obstetrics', 'Prenatal Care'],
    content: {
      intro: 'Pregnancy is a transformative physiological journey. Knowing what to expect at each stage fosters confidence and safeguards both mother and developing infant.',
      sections: [
        {
          heading: 'First Trimester: Laying the Foundations',
          body: 'The first 12 weeks demand dedicated folate supplementation (400–800 mcg daily) to prevent neural tube defects, initial blood group testing, and early viability ultrasounds to confirm implantation.'
        },
        {
          heading: 'Second Trimester: The Golden Window',
          body: 'As morning sickness wanes, weeks 13–27 feature the comprehensive 20-week anatomy scan. This is also the ideal window to stay active with low-impact prenatal yoga, walking, and swimming.'
        },
        {
          heading: 'Third Trimester & Postpartum Preparation',
          body: 'Monitoring fetal movement kick counts, screening for gestational diabetes and group B streptococcus, and formulating a birth plan with your obstetrician ensures a smooth labor experience.'
        }
      ],
      keyTakeaways: [
        'Start prenatal vitamins containing methylfolate prior to or as soon as pregnancy is detected.',
        'The 20-week ultrasound provides crucial anatomical safety mapping for the baby.',
        'Postpartum mental health support is just as vital as physical obstetric checks.'
      ]
    }
  },
  {
    id: 'blog-3',
    title: 'Childhood Immunity & Vaccines: What Every Parent Needs to Know',
    slug: 'childhood-immunity-vaccines-guide',
    category: "Children's Health",
    date: 'August 05, 2026',
    readTime: '4 min read',
    shortDescription: 'How childhood immunization programs protect against serious infectious diseases and how to naturally bolster your child’s immune resilience.',
    authorDoctorName: 'Dr. Sarah Jenkins',
    authorSpecialty: 'Lead Pediatrician',
    authorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80',
    tags: ['Pediatrics', 'Vaccines', 'Immunity', 'Child Care'],
    content: {
      intro: 'Children are exposed to thousands of antigens daily. Understanding how modern pediatric immunizations work provides peace of mind for caring parents.',
      sections: [
        {
          heading: 'The Science of Pediatric Immunization',
          body: 'Vaccines train a child’s immature immune system to produce antibodies without causing the illness itself. Decades of peer-reviewed data confirm vaccines prevent dangerous complications like measles pneumonia and pertussis.'
        },
        {
          heading: 'Managing Common Post-Shot Reactions',
          body: 'Mild low-grade fever, slight fussiness, and redness at the injection site are normal signs that the immune system is actively responding. Gentle cool compresses and hydration usually bring quick comfort.'
        },
        {
          heading: 'Daily Habits That Strengthen Natural Defense',
          body: 'In addition to scheduled vaccines, adequate sleep (9–12 hours depending on age), reduced refined sugars, and daily outdoor active play are crucial pillars of pediatric immunity.'
        }
      ],
      keyTakeaways: [
        'Adhering to the CDC/AAP vaccine schedule prevents dangerous childhood infections.',
        'Minor fever after vaccination indicates appropriate antibody formation.',
        'Consistent sleep hygiene and balanced nutrition optimize natural immune defense.'
      ]
    }
  },
  {
    id: 'blog-4',
    title: 'Managing Chronic Stress and Protecting Your Nervous System',
    slug: 'managing-chronic-stress-nervous-system',
    category: 'Mental Health',
    date: 'July 28, 2026',
    readTime: '5 min read',
    shortDescription: 'Chronic cortisol elevation impacts sleep, digestion, and cardiovascular health. Evidence-based techniques to reset your autonomic nervous system.',
    authorDoctorName: 'Dr. Rachel Greenburg',
    authorSpecialty: 'Chief of Psychiatry',
    authorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
    tags: ['Mental Health', 'Stress Management', 'Mindfulness', 'Wellness'],
    content: {
      intro: 'In our hyper-connected modern world, the brain’s "fight or flight" response is frequently triggered without adequate periods of parasympathetic recovery.',
      sections: [
        {
          heading: 'The Physical Toll of Prolonged Stress',
          body: 'Sustained cortisol surges constrict blood vessels, elevate baseline blood sugar, disrupt microbiome balance, and fragment REM sleep stages, leading to emotional burnout.'
        },
        {
          heading: 'The Vagus Nerve Reset: Physiological Sighs',
          body: 'A two-stage deep nasal inhalation followed by an extended, slow oral exhalation immediately activates vagal tone, slowing heart rate and resetting sympathetic hyperactivity in under 60 seconds.'
        },
        {
          heading: 'Establishing Digital and Cognitive Boundaries',
          body: 'Creating screen-free buffer hours before bedtime and scheduling intentional recovery breaks throughout workdays restores cognitive resilience.'
        }
      ],
      keyTakeaways: [
        'Chronic stress is a physical medical condition, not just a mental mood.',
        'Breathing exercises like the physiological sigh directly stimulate vagal recovery.',
        'Professional counseling and psychiatric guidance are highly effective and stigma-free.'
      ]
    }
  },
  {
    id: 'blog-5',
    title: 'The Anti-Inflammatory Plate: Fueling Longevity & Gut Health',
    slug: 'anti-inflammatory-plate-gut-health',
    category: 'Nutrition',
    date: 'July 19, 2026',
    readTime: '5 min read',
    shortDescription: 'Discover how polyphenol-rich foods, prebiotic fiber, and healthy omega-3 fatty acids reduce chronic systemic inflammation and support gut microbiome diversity.',
    authorDoctorName: 'Dr. Ananya Sen',
    authorSpecialty: 'Gastroenterology & Nutrition Specialist',
    authorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80',
    tags: ['Nutrition', 'Gut Health', 'Dietary Medicine', 'Longevity'],
    content: {
      intro: 'Over 70% of the body’s immune system resides in the gut-associated lymphoid tissue. The foods we consume directly instruct our inflammatory pathways.',
      sections: [
        {
          heading: 'The Power of Colorful Polyphenols',
          body: 'Deeply pigmented berries, leafy greens, extra virgin olive oil, and turmeric contain phytonutrients that neutralize free radicals and suppress inflammatory cytokines.'
        },
        {
          heading: 'Nourishing the Microbiome with Prebiotics',
          body: 'Fermentable fibers found in garlic, onions, oats, and legumes produce short-chain fatty acids (like butyrate) that fortify the intestinal mucosal barrier.'
        },
        {
          heading: 'Limiting Ultra-Processed Triggers',
          body: 'Excessive refined seed oils, artificial sweeteners, and ultra-processed snacks disrupt microbial diversity and promote silent low-grade vascular inflammation.'
        }
      ],
      keyTakeaways: [
        'Aim for 30 different plant-based foods per week to maximize gut bacterial diversity.',
        'Omega-3 fatty acids from wild fish or flaxseeds actively resolve cellular inflammation.',
        'Hydration and mindful eating habits significantly reduce dyspepsia and reflux.'
      ]
    }
  },
  {
    id: 'blog-6',
    title: 'Preventive Health Screenings by Decade: Your Lifelong Roadmap',
    slug: 'preventive-health-screenings-by-decade',
    category: 'Preventive Care',
    date: 'July 10, 2026',
    readTime: '7 min read',
    shortDescription: 'From your 20s through your 70s, here are the essential diagnostic blood tests, cancer screenings, and cardiovascular checks you should never skip.',
    authorDoctorName: 'Dr. Robert Harrison',
    authorSpecialty: 'Director of Internal Medicine',
    authorImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=80',
    tags: ['Preventive Care', 'Health Audits', 'Longevity', 'Screenings'],
    content: {
      intro: 'The most effective cure in modern medicine is early detection before any symptomatic damage occurs. Having a clear screening calendar simplifies lifelong wellness.',
      sections: [
        {
          heading: 'In Your 20s & 30s: Baselines & Metabolic Markers',
          body: 'Establish baseline blood pressure, lipid panels (including ApoB/Lp(a)), fasting blood glucose/HbA1c, and skin checks. Women should begin cervical pap smears at age 21.'
        },
        {
          heading: 'In Your 40s: Cardiovascular & Cancer Vigilance',
          body: 'Initiate screening mammography for women at 40, baseline coronary calcium scans for cardiovascular risk, and comprehensive eye exams for glaucoma pressure.'
        },
        {
          heading: 'In Your 50s & Beyond: Colonoscopy & Bone Density',
          body: 'Screening colonoscopy begins at age 45-50. Men should discuss PSA prostate screening. DEXA bone density scans become important at 60 for osteoporosis prevention.'
        }
      ],
      keyTakeaways: [
        'Routine checkups detect conditions like hypertension and early diabetes when they are easily reversible.',
        'Colonoscopy remains the gold-standard preventive tool that can remove precancerous polyps during the scan.',
        'Personalized genetic and family history should dictate your specific testing intervals.'
      ]
    }
  },
  {
    id: 'blog-7',
    title: 'Joint Health and Longevity: Preserving Cartilage in Active Adults',
    slug: 'joint-health-preserving-cartilage',
    category: 'Fitness and Wellness',
    date: 'July 02, 2026',
    readTime: '5 min read',
    shortDescription: 'How resistance training, low-impact cross-training, and proper joint biomechanics protect your knees, hips, and spine from premature wear.',
    authorDoctorName: 'Dr. Marcus Vance',
    authorSpecialty: 'Orthopedic & Joint Replacement Surgeon',
    authorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80',
    tags: ['Orthopedics', 'Joint Health', 'Fitness', 'Cartilage'],
    content: {
      intro: 'Joint cartilage lacks direct blood vessels and relies on dynamic movement and joint fluid circulation to receive oxygen and nutrients.',
      sections: [
        {
          heading: 'Why Muscle Strength Protects Joints',
          body: 'Strong quadriceps, hamstrings, and gluteal muscles absorb shock forces before they can damage knee and hip cartilage. Progressive resistance training is the single best preserver of joint health.'
        },
        {
          heading: 'Low-Impact vs. High-Impact Conditioning',
          body: 'Mixing running with cycling, rowing, swimming, and elliptical training reduces repetitive compressive stress on joints while maintaining high cardiovascular fitness.'
        },
        {
          heading: 'Managing Acute Joint Flares',
          body: 'Never ignore persistent joint swelling or clicking associated with pain. Early evaluation with physical therapy or orthobiologic interventions prevents progressive degeneration.'
        }
      ],
      keyTakeaways: [
        'Movement is medicine: Cartilage needs regular compression cycles to absorb synovial fluid nutrients.',
        'Strength training the muscles around the knee relieves knee joint pressure by over 30%.',
        'Maintain a healthy body weight—every pound lost relieves four pounds of pressure on your knees.'
      ]
    }
  }
];
