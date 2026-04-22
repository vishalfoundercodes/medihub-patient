import doctorImg from '../assets/Home/doctorHero.png';

export const doctors = [
  { id: 1, name: 'Dr. Rajesh Kumar', specialty: 'General Physician', rating: 4.8, reviews: 1200, experience: 12, fee: 499, consultationType: 'In-clinic', availableToday: true, image: doctorImg },
  { id: 2, name: 'Dr. Priya Sharma', specialty: 'Gynecologist', rating: 4.9, reviews: 980, experience: 10, fee: 599, consultationType: 'In-clinic', availableToday: true, image: doctorImg },
  { id: 3, name: 'Dr. Amit Verma', specialty: 'Dermatologist', rating: 4.7, reviews: 850, experience: 8, fee: 499, consultationType: 'Video Consultation', availableToday: true, image: doctorImg },
  { id: 4, name: 'Dr. Neha Singh', specialty: 'Pediatrician', rating: 4.8, reviews: 1100, experience: 9, fee: 499, consultationType: 'In-clinic', availableToday: true, image: doctorImg },
  { id: 5, name: 'Dr. Saurabh Mehta', specialty: 'Cardiologist', rating: 4.9, reviews: 760, experience: 15, fee: 799, consultationType: 'In-clinic', availableToday: true, image: doctorImg },
  { id: 6, name: 'Dr. Ankita Patel', specialty: 'Dentist', rating: 4.7, reviews: 620, experience: 7, fee: 399, consultationType: 'In-clinic', availableToday: true, image: doctorImg },
  { id: 7, name: 'Dr. Mohit Bansal', specialty: 'Orthopedic', rating: 4.8, reviews: 540, experience: 11, fee: 699, consultationType: 'Video Consultation', availableToday: true, image: doctorImg },
  { id: 8, name: 'Dr. Pooja Nair', specialty: 'ENT Specialist', rating: 4.6, reviews: 430, experience: 6, fee: 499, consultationType: 'In-clinic', availableToday: true, image: doctorImg },
];

export const specializations = [
  { label: 'All Specializations', icon: '🩺' },
  { label: 'General Physician', icon: '👨‍⚕️' },
  { label: 'Gynecologist', icon: '👩‍⚕️' },
  { label: 'Dermatologist', icon: '🧴' },
  { label: 'Pediatrician', icon: '👶' },
  { label: 'Cardiologist', icon: '❤️' },
  { label: 'Dentist', icon: '🦷' },
];

export const filterSpecializations = [
  'All Specializations', 'General Physician', 'Gynecologist',
  'Dermatologist', 'Pediatrician', 'Cardiologist',
];

export const experienceOptions = ['0-5 Years', '5-10 Years', '10-20 Years', '20+ Years'];
