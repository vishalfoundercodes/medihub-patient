import labHero from '../assets/Home/labHero.png';

export const LAB_TEST_DETAIL = {
  id: 'full-body-checkup',
  name: 'Full Body Checkup',
  badge: 'Popular',
  orderId: 'LT123456',
  image: labHero,
  price: 999,
  original: 1499,
  discount: 33,
  includes: '70+ Tests',
  features: ['Accurate Reports', 'Home Sample Collection', 'Fast & Reliable Results'],
  description: 'Full Body Checkup is a comprehensive health package that provides a detailed analysis of your overall health. It includes 70+ essential tests to help detect health issues at an early stage and monitor your well-being.',
  featureBadges: ['70+ Tests', 'Accurate Results', 'Home Collection', 'Trusted Labs'],
  testCategories: [
    {
      name: 'Blood Tests', count: 24,
      tests: ['Complete Blood Count (CBC)', 'ESR', 'Blood Sugar (Fasting)', 'Blood Sugar (PP)', 'HbA1c'],
      more: 19,
    },
    {
      name: 'Liver Function', count: 11,
      tests: ['SGOT', 'SGPT', 'Alkaline Phosphatase', 'Bilirubin (Total & Direct)', 'Total Protein'],
      more: 6,
    },
    {
      name: 'Kidney Function', count: 8,
      tests: ['Urea', 'Creatinine', 'Uric Acid', 'Sodium', 'Potassium'],
      more: 3,
    },
    {
      name: 'Lipid Profile', count: 10,
      tests: ['Total Cholesterol', 'HDL Cholesterol', 'LDL Cholesterol', 'Triglycerides', 'VLDL Cholesterol'],
      more: 5,
    },
    {
      name: 'Thyroid Profile', count: 3,
      tests: ['T3', 'T4', 'TSH'],
      more: 0,
    },
    {
      name: 'Urine Tests', count: 5,
      tests: ['Urine Routine', 'Urine Microscopy', 'Urine Culture'],
      more: 2,
    },
  ],
  howItWorks: [
    { step: 1, title: 'Book Test', desc: 'Choose your test and schedule your slot' },
    { step: 2, title: 'Sample Collection', desc: 'Our phlebotomist will collect sample from home' },
    { step: 3, title: 'Sample Processing', desc: 'Your sample is analyzed in certified labs' },
    { step: 4, title: 'Get Report', desc: 'Receive digital report within 24-48 hours' },
  ],
  preparation: [
    '12 hours fasting is required before the test',
    'Drink plenty of water before sample collection',
    'Avoid strenuous exercise 24 hours before the test',
    'Inform the phlebotomist about any medications you are taking',
    'Wear comfortable clothing with easy access to your arm',
  ],
  faqs: [
    { q: 'What is included in Full Body Checkup?', a: 'It includes 70+ tests covering blood, liver, kidney, lipid, thyroid, and urine parameters.' },
    { q: 'Is fasting required?', a: 'Yes, 12 hours fasting is required for accurate results.' },
    { q: 'How long does it take to get reports?', a: 'Reports are delivered within 24-48 hours after sample collection.' },
    { q: 'Is home collection available?', a: 'Yes, our trained phlebotomist will collect the sample from your home.' },
    { q: 'How do I reschedule my appointment?', a: 'You can reschedule from the booking summary section or contact our support team.' },
  ],
  booking: {
    testPrice: 1499,
    discount: 500,
    discountPct: 33,
    subtotal: 999,
    homeCollection: 'FREE',
    total: 999,
  },
  sampleCollection: {
    date: 'May 11, 2024',
    dateNote: 'Tomorrow',
    time: 'Between 7:00 AM - 9:00 AM',
    address: 'Home\nA-45, 2nd Floor, Green Park Extension\nNew Delhi, Delhi - 110016',
  },
  whyChooseUs: [
    { title: 'Certified Labs', desc: 'NABL accredited labs', color: 'text-[var(--color-primary)]', bg: 'bg-blue-50' },
    { title: 'Accurate Results', desc: '99% accuracy rate', color: 'text-teal-600', bg: 'bg-teal-50' },
    { title: 'Home Collection', desc: 'Trained professionals', color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Fast Reports', desc: 'Reports in 24-48 hours', color: 'text-orange-500', bg: 'bg-orange-50' },
  ],
  similarTests: [
    { id: 'diabetes-profile', name: 'Diabetes Profile', price: 699, original: 999, discount: 30, image: labHero },
    { id: 'thyroid-profile', name: 'Thyroid Profile', price: 649, original: 899, discount: 28, image: labHero },
    { id: 'lipid-profile', name: 'Lipid Profile', price: 799, original: 1199, discount: 33, image: labHero },
    { id: 'vitamin-d-test', name: 'Vitamin D Test', price: 500, original: 699, discount: 28, image: labHero },
    { id: 'heart-health', name: 'Heart Health Package', price: 1299, original: 1999, discount: 35, image: labHero },
  ],
};

export const MY_LAB_TESTS = [
  { id: 'full-body-checkup', name: 'Full Body Checkup', orderId: 'LT123456', date: 'May 10, 2024', status: 'Completed', price: 999, includes: '70+ Tests' },
  { id: 'diabetes-profile', name: 'Diabetes Profile', orderId: 'LT123455', date: 'Apr 20, 2024', status: 'Completed', price: 699, includes: 'Sugar & 5 Tests' },
  { id: 'thyroid-profile', name: 'Thyroid Profile', orderId: 'LT123454', date: 'Mar 15, 2024', status: 'Report Ready', price: 649, includes: 'T3, T4, TSH' },
  { id: 'lipid-profile', name: 'Lipid Profile', orderId: 'LT123453', date: 'Feb 28, 2024', status: 'Completed', price: 799, includes: '10+ Tests' },
];
