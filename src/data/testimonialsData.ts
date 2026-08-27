import { Testimonial } from '../types';

export const testimonialsData: Testimonial[] = [
  {
    id: 'test-1',
    patientName: 'Eleanor Vance',
    location: 'Metro Area, Resident',
    treatment: 'Robotic Total Knee Replacement',
    doctorName: 'Dr. Marcus Vance',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The robotic knee replacement gave me my active life back! I was walking with assistance within 24 hours and back in my garden by week 3. The surgical team and physical therapists at Medivance are beyond exceptional.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    verified: true
  },
  {
    id: 'test-2',
    patientName: 'David K. Morrison',
    location: 'Westside, Resident',
    treatment: 'Emergency Cardiac Stenting (STEMI)',
    doctorName: 'Dr. Arthur Sterling',
    rating: 5,
    date: '1 month ago',
    comment: 'When I experienced sudden severe chest pains at 2 AM, the Medivance ambulance arrived in 7 minutes. From the ER doors to the catheterization lab took under 35 minutes. Dr. Sterling saved my life. Truly world-class emergency care.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    verified: true
  },
  {
    id: 'test-3',
    patientName: 'Sophia & Lucas Martinez',
    location: 'North Bay, Parents',
    treatment: 'Maternity Delivery & NICU Care',
    doctorName: 'Dr. Claire Montgomery & Dr. Tariq Al-Hassan',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Delivering our twin daughters at Medivance was the most reassuring experience of our lives. The LDRP private suite was serene, and when our baby needed 4 days in the Level III NICU, the nursing team treated us like family.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    verified: true
  },
  {
    id: 'test-4',
    patientName: 'Robert Chang',
    location: 'Oakridge, Executive',
    treatment: 'Comprehensive Executive Health Audit',
    doctorName: 'Dr. Robert Harrison',
    rating: 5,
    date: '1 month ago',
    comment: 'The executive health checkup lounge is fantastic. Finished all blood work, 3T MRI, stress echo, and full physician consultation in 4 hours with zero wait times. Clear digital reports on the patient portal the next morning.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    verified: true
  }
];
