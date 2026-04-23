export const NOTIFICATIONS = [
  {
    id: 1, type: 'Appointments', title: 'Appointment Reminder',
    message: 'Your appointment with Dr. Priya Sharma is tomorrow, May 15, 2024 at 11:00 AM.',
    date: '', time: '10:00 AM', read: false, link: null,
  },
  {
    id: 2, type: 'Reports', title: 'Lab Report Available',
    message: 'Your Full Body Checkup report is now available.',
    date: 'Yesterday', time: '', read: false, link: { text: 'View your report.', to: '/my-lab-tests' },
  },
  {
    id: 3, type: 'Orders', title: 'Order Delivered',
    message: 'Your order #ORD123456 has been delivered successfully.',
    date: 'May 12, 2024', time: '06:30 PM', read: true, link: null,
  },
  {
    id: 4, type: 'Offers', title: 'Special Offer for You!',
    message: 'Get flat 20% off on all lab tests. Use code: HEALTH20',
    date: 'May 11, 2024', time: '09:15 AM', read: false, link: { text: 'Book a test now.', to: '/lab-tests' },
  },
  {
    id: 5, type: 'Account', title: 'Wallet Cashback Credited',
    message: '₹150 cashback has been added to your wallet for your recent order.',
    date: 'May 10, 2024', time: '04:20 PM', read: true, link: null,
  },
  {
    id: 6, type: 'Account', title: 'Password Changed Successfully',
    message: 'Your account password was changed successfully. If this wasn\'t you, please contact support.',
    date: 'May 09, 2024', time: '11:45 AM', read: true, link: null,
  },
  {
    id: 7, type: 'Appointments', title: 'Appointment Cancelled',
    message: 'Your appointment with Dr. Neha Singh on May 08, 2024 has been cancelled.',
    date: 'May 08, 2024', time: '10:30 AM', read: true, link: null,
  },
  {
    id: 8, type: 'Reports', title: 'Thyroid Profile Report Ready',
    message: 'Your Thyroid Profile test report is now available for download.',
    date: 'May 07, 2024', time: '02:00 PM', read: true, link: { text: 'Download report.', to: '/my-lab-tests' },
  },
  {
    id: 9, type: 'Appointments', title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Rajesh Kumar on May 08, 2024 at 10:30 AM is confirmed.',
    date: 'May 06, 2024', time: '03:15 PM', read: true, link: null,
  },
  {
    id: 10, type: 'Orders', title: 'Order Shipped',
    message: 'Your order #ORD123455 has been shipped and will be delivered by May 07, 2024.',
    date: 'May 05, 2024', time: '01:00 PM', read: true, link: null,
  },
  {
    id: 11, type: 'Offers', title: 'Weekend Health Offer',
    message: 'Book any doctor consultation this weekend and get ₹100 cashback.',
    date: 'May 04, 2024', time: '08:00 AM', read: true, link: { text: 'Book now.', to: '/doctors' },
  },
  {
    id: 12, type: 'Reports', title: 'Diabetes Profile Report Ready',
    message: 'Your Diabetes Profile test report is now available.',
    date: 'May 03, 2024', time: '05:30 PM', read: true, link: null,
  },
  {
    id: 13, type: 'Account', title: 'Profile Updated',
    message: 'Your profile information has been updated successfully.',
    date: 'May 02, 2024', time: '10:00 AM', read: true, link: null,
  },
  {
    id: 14, type: 'Appointments', title: 'Upcoming Appointment',
    message: 'Reminder: You have an appointment with Dr. Amit Verma tomorrow at 04:00 PM.',
    date: 'Apr 29, 2024', time: '09:00 AM', read: true, link: null,
  },
  {
    id: 15, type: 'Orders', title: 'Order Placed Successfully',
    message: 'Your order #ORD123454 for medicines has been placed successfully.',
    date: 'Apr 28, 2024', time: '07:45 PM', read: true, link: null,
  },
  {
    id: 16, type: 'Reports', title: 'Lipid Profile Report Ready',
    message: 'Your Lipid Profile test report is now available for download.',
    date: 'Apr 27, 2024', time: '03:00 PM', read: true, link: null,
  },
  {
    id: 17, type: 'Offers', title: 'Exclusive Member Offer',
    message: 'As a valued member, get 15% off on your next lab test booking.',
    date: 'Apr 26, 2024', time: '11:00 AM', read: true, link: null,
  },
  {
    id: 18, type: 'Reports', title: 'Vitamin D Test Report',
    message: 'Your Vitamin D test report is ready. Please check your reports section.',
    date: 'Apr 25, 2024', time: '04:00 PM', read: true, link: null,
  },
  {
    id: 19, type: 'Appointments', title: 'Appointment Rescheduled',
    message: 'Your appointment with Dr. Sandeep Gupta has been rescheduled to May 20, 2024.',
    date: 'Apr 24, 2024', time: '02:30 PM', read: true, link: null,
  },
  {
    id: 20, type: 'Account', title: 'New Login Detected',
    message: 'A new login was detected on your account from Delhi, India.',
    date: 'Apr 23, 2024', time: '08:15 PM', read: true, link: null,
  },
  {
    id: 21, type: 'Offers', title: 'Refer & Earn',
    message: 'Refer a friend and earn ₹200 wallet cashback when they book their first test.',
    date: 'Apr 22, 2024', time: '10:30 AM', read: true, link: null,
  },
  {
    id: 22, type: 'Reports', title: 'CBC Report Available',
    message: 'Your Complete Blood Count (CBC) report is now available.',
    date: 'Apr 21, 2024', time: '01:45 PM', read: true, link: null,
  },
  {
    id: 23, type: 'Account', title: 'Wallet Balance Updated',
    message: 'Your wallet balance has been updated. Current balance: ₹850.',
    date: 'Apr 20, 2024', time: '06:00 PM', read: true, link: null,
  },
];
