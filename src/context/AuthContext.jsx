import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const MOCK_ORDERS = [
  {
    id: 'MC123456', type: 'Medicines', date: 'May 10, 2024', amount: 598,
    status: 'Delivered', items: 3,
    deliveryLabel: 'Delivered on', deliveryDate: 'May 12, 2024',
    address: 'New Delhi, 110001',
  },
  {
    id: 'MC123455', type: 'Lab Test', date: 'May 08, 2024', amount: 998,
    status: 'Completed', items: 1,
    deliveryLabel: 'Completed on', deliveryDate: 'May 08, 2024',
    address: 'New Delhi, 110001',
  },
  {
    id: 'MC123454', type: 'Medicines', date: 'May 05, 2024', amount: 1249,
    status: 'Shipped', items: 2,
    deliveryLabel: 'Expected Delivery', deliveryDate: 'May 07, 2024',
    address: 'New Delhi, 110001',
  },
  {
    id: 'MC123453', type: 'Lab Test', date: 'May 03, 2024', amount: 649,
    status: 'Processing', items: 1,
    deliveryLabel: 'Expected on', deliveryDate: 'May 06, 2024',
    address: 'New Delhi, 110001',
  },
  {
    id: 'MC123452', type: 'Appointment', date: 'Apr 30, 2024', amount: 500,
    status: 'Confirmed', items: 1,
    deliveryLabel: 'Appointment on', deliveryDate: 'May 02, 2024 at 04:00 PM',
    address: 'Dr. Priya Sharma',
  },
];

const DEFAULT_PROFILE = {
  dob: '15 March 1992',
  gender: 'Male',
  bloodGroup: 'B+',
  verified: true,
  stats: { orders: 12, labTests: 5, appointments: 3, wallet: 850 },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const login = (userData) => {
    setUser({ ...DEFAULT_PROFILE, ...userData });
    setShowLogin(false);
  };

  const updateUser = (data) => setUser((prev) => ({ ...prev, ...data }));
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, showLogin, setShowLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
