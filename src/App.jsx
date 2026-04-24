import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import Wishlist from './pages/Wishlist';
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
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import CancellationPolicy from './pages/CancellationPolicy';
import Search from './pages/Search';
import MyAddresses from './pages/MyAddresses';
import OrderDetail from './pages/OrderDetail';
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
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/cancellation" element={<CancellationPolicy />} />
        <Route path="/search" element={<Search />} />
        <Route path="/my-addresses" element={<MyAddresses />} />
        <Route path="/order/:id" element={<OrderDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
        <AppContent />
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
