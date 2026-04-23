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
