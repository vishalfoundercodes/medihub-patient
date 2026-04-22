import labHero from '../assets/Home/labHero.png';

export const medicines = [
  { id: 1, name: 'Crocin 650mg Tablet', strip: 'Strip of 15 Tablets', price: 120, original: 150, discount: 20, category: 'Pain Relief', brand: 'GSK', image: labHero },
  { id: 2, name: 'Augmentin 625mg Tablet', strip: 'Strip of 10 Tablets', price: 276, original: 325, discount: 15, category: 'Antibiotics', brand: 'GSK', image: labHero },
  { id: 3, name: 'Dolo 650mg Tablet', strip: 'Strip of 15 Tablets', price: 135, original: 150, discount: 10, category: 'Pain Relief', brand: 'Micro Labs', image: labHero },
  { id: 4, name: 'Vitamin D3 60K Capsule', strip: 'Strip of 4 Capsules', price: 96, original: 120, discount: 20, category: 'Vitamins & Supplements', brand: 'Sun Pharma', image: labHero },
  { id: 5, name: 'Himalaya Liv.52 DS Tablet', strip: 'Bottle of 60 Tablets', price: 173, original: 210, discount: 18, category: 'Digestive Care', brand: 'Himalaya', image: labHero },
  { id: 6, name: 'Combiflam Tablet', strip: 'Strip of 10 Tablets', price: 98, original: 115, discount: 15, category: 'Pain Relief', brand: 'Sanofi', image: labHero },
  { id: 7, name: 'Cetirizine 10mg Tablet', strip: 'Strip of 10 Tablets', price: 21, original: 23, discount: 10, category: 'Respiratory', brand: 'Cipla', image: labHero },
  { id: 8, name: 'Shelcal 500 Tablet', strip: 'Strip of 15 Tablets', price: 112, original: 140, discount: 20, category: 'Vitamins & Supplements', brand: 'Torrent', image: labHero },
  { id: 9, name: 'Pan 40mg Tablet', strip: 'Strip of 15 Tablets', price: 89, original: 101, discount: 12, category: 'Digestive Care', brand: 'Alkem', image: labHero },
  { id: 10, name: 'Azithral 500mg Tablet', strip: 'Strip of 3 Tablets', price: 102, original: 120, discount: 15, category: 'Antibiotics', brand: 'Alembic', image: labHero },
];

export const medicineCategories = [
  { label: 'All Categories', icon: '💊' },
  { label: 'Prescription', icon: '📋' },
  { label: 'OTC', icon: '🏥' },
  { label: 'Wellness', icon: '🌿' },
  { label: 'Baby Care', icon: '👶' },
  { label: 'Personal Care', icon: '🧴' },
  { label: 'Health Devices', icon: '🩺' },
  { label: 'Surgical', icon: '🔬' },
  { label: 'Ayurveda', icon: '🌱' },
];

export const medicineFilterCategories = [
  'All Categories', 'Pain Relief', 'Antibiotics',
  'Vitamins & Supplements', 'Diabetes Care',
  'Heart Care', 'Digestive Care', 'Respiratory',
];

export const brands = ['GSK', 'Cipla', 'Sun Pharma', 'Himalaya', 'Sanofi', 'Micro Labs', 'Alkem', 'Alembic', 'Torrent'];
