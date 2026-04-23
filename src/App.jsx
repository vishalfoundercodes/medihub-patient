import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import LabTests from './pages/LabTests';
import Medicines from './pages/Medicines';
import Doctors from './pages/Doctors';
import Register from './pages/Register';
import Account from './pages/Account';
import Orders from './pages/Orders';
import MyLabTests from './pages/MyLabTests';
import LabTestDetail from './pages/LabTestDetail';
import Appointments from './pages/Appointments';
import AppointmentDetail from './pages/AppointmentDetail';
import Notifications from './pages/Notifications';
import HelpSupport from './pages/HelpSupport';
import LabCheckout from './pages/LabCheckout';
import BookAppointment from './pages/BookAppointment';
import MedicineCart from './pages/MedicineCart';
import LoginModal from './components/LoginModal';
import './index.css';

function AppContent() {
  const { showLogin } = useAuth();
  return (
    <>
      {showLogin && <LoginModal />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lab-tests" element={<LabTests />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/my-lab-tests" element={<MyLabTests />} />
        <Route path="/lab-test/:id" element={<LabTestDetail />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointment/:id" element={<AppointmentDetail />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/lab-checkout" element={<LabCheckout />} />
        <Route path="/book-appointment/:id" element={<BookAppointment />} />
        <Route path="/medicine-cart" element={<MedicineCart />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
