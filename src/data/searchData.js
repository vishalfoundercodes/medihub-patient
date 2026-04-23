import labHero from '../assets/Home/labHero.png';
import doctorImg from '../assets/Home/doctorHero.png';

export const SEARCH_DATA = [
  // Lab Tests
  { id: 1,  type: 'test',     name: 'Full Body Checkup',          subtitle: 'Includes 70+ Tests',          price: 999,  original: 1499, discount: 20, image: labHero,   rating: null, fee: null },
  { id: 2,  type: 'test',     name: 'Diabetes Profile',           subtitle: 'Includes Sugar & 5 Tests',    price: 699,  original: 999,  discount: 15, image: labHero,   rating: null, fee: null },
  { id: 3,  type: 'test',     name: 'Thyroid Profile',            subtitle: 'Includes T3, T4, TSH',        price: 649,  original: 899,  discount: 15, image: labHero,   rating: null, fee: null },
  { id: 4,  type: 'test',     name: 'Lipid Profile',              subtitle: 'Includes 10+ Tests',          price: 799,  original: 1199, discount: 20, image: labHero,   rating: null, fee: null },
  { id: 5,  type: 'test',     name: 'Liver Function Test',        subtitle: 'Includes 11 Tests',           price: 699,  original: 999,  discount: 15, image: labHero,   rating: null, fee: null },
  { id: 6,  type: 'test',     name: 'Kidney Profile',             subtitle: 'Includes 7 Tests',            price: 599,  original: 899,  discount: 15, image: labHero,   rating: null, fee: null },
  { id: 7,  type: 'test',     name: 'Vitamin D Test',             subtitle: 'Includes Vitamin D',          price: 499,  original: 599,  discount: 10, image: labHero,   rating: null, fee: null },
  { id: 8,  type: 'test',     name: 'CBC Complete Blood Count',   subtitle: 'Includes 24 Parameters',      price: 399,  original: 499,  discount: 20, image: labHero,   rating: null, fee: null },
  // Medicines
  { id: 101, type: 'medicine', name: 'Crocin 650mg Tablet',       subtitle: 'Strip of 15 Tablets',         price: 120,  original: 150,  discount: 20, image: labHero,   rating: null, fee: null },
  { id: 102, type: 'medicine', name: 'Augmentin 625mg Tablet',    subtitle: 'Strip of 10 Tablets',         price: 276,  original: 325,  discount: 15, image: labHero,   rating: null, fee: null },
  { id: 103, type: 'medicine', name: 'Dolo 650mg Tablet',         subtitle: 'Strip of 15 Tablets',         price: 135,  original: 150,  discount: 10, image: labHero,   rating: null, fee: null },
  { id: 104, type: 'medicine', name: 'Vitamin D3 60K Capsule',    subtitle: 'Strip of 4 Capsules',         price: 96,   original: 120,  discount: 20, image: labHero,   rating: null, fee: null },
  { id: 105, type: 'medicine', name: 'Himalaya Liv.52 DS Tablet', subtitle: 'Bottle of 60 Tablets',        price: 173,  original: 210,  discount: 18, image: labHero,   rating: null, fee: null },
  { id: 106, type: 'medicine', name: 'Combiflam Tablet',          subtitle: 'Strip of 10 Tablets',         price: 98,   original: 115,  discount: 15, image: labHero,   rating: null, fee: null },
  { id: 107, type: 'medicine', name: 'Cetirizine 10mg Tablet',    subtitle: 'Strip of 10 Tablets',         price: 21,   original: 23,   discount: 10, image: labHero,   rating: null, fee: null },
  { id: 108, type: 'medicine', name: 'Shelcal 500 Tablet',        subtitle: 'Strip of 15 Tablets',         price: 112,  original: 140,  discount: 20, image: labHero,   rating: null, fee: null },
  { id: 109, type: 'medicine', name: 'Pan 40mg Tablet',           subtitle: 'Strip of 15 Tablets',         price: 89,   original: 101,  discount: 12, image: labHero,   rating: null, fee: null },
  { id: 110, type: 'medicine', name: 'Azithral 500mg Tablet',     subtitle: 'Strip of 3 Tablets',          price: 102,  original: 120,  discount: 15, image: labHero,   rating: null, fee: null },
  // Doctors
  { id: 201, type: 'doctor',   name: 'Dr. Rajesh Kumar',          subtitle: 'General Physician',           price: null, original: null, discount: null, image: doctorImg, rating: 4.8, fee: 499 },
  { id: 202, type: 'doctor',   name: 'Dr. Priya Sharma',          subtitle: 'Gynecologist',                price: null, original: null, discount: null, image: doctorImg, rating: 4.9, fee: 599 },
  { id: 203, type: 'doctor',   name: 'Dr. Amit Verma',            subtitle: 'Dermatologist',               price: null, original: null, discount: null, image: doctorImg, rating: 4.7, fee: 499 },
  { id: 204, type: 'doctor',   name: 'Dr. Neha Singh',            subtitle: 'Pediatrician',                price: null, original: null, discount: null, image: doctorImg, rating: 4.8, fee: 499 },
  { id: 205, type: 'doctor',   name: 'Dr. Saurabh Mehta',         subtitle: 'Cardiologist',                price: null, original: null, discount: null, image: doctorImg, rating: 4.9, fee: 799 },
  { id: 206, type: 'doctor',   name: 'Dr. Ankita Patel',          subtitle: 'Dentist',                     price: null, original: null, discount: null, image: doctorImg, rating: 4.7, fee: 399 },
  { id: 207, type: 'doctor',   name: 'Dr. Mohit Bansal',          subtitle: 'Orthopedic',                  price: null, original: null, discount: null, image: doctorImg, rating: 4.8, fee: 699 },
  { id: 208, type: 'doctor',   name: 'Dr. Pooja Nair',            subtitle: 'ENT Specialist',              price: null, original: null, discount: null, image: doctorImg, rating: 4.6, fee: 499 },
];

export const POPULAR_SEARCHES = [
  'Full Body Checkup', 'Diabetes Profile', 'Thyroid Profile',
  'Crocin', 'Vitamin D', 'Dr. Priya Sharma', 'Cardiologist', 'Paracetamol',
];

export const RECENT_KEY = 'medihub_recent_searches';

export const getRecentSearches = () => {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); }
  catch { return []; }
};

export const saveRecentSearch = (query) => {
  if (!query.trim()) return;
  const prev = getRecentSearches().filter((q) => q !== query);
  localStorage.setItem(RECENT_KEY, JSON.stringify([query, ...prev].slice(0, 6)));
};

export const clearRecentSearches = () => localStorage.removeItem(RECENT_KEY);
