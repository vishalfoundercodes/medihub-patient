import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
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
import LabTestOrderDetail from './pages/LabTestOrderDetail';
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
        <Route path="/search" element={<Search />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/cancellation" element={<CancellationPolicy />} />
        <Route path="/lab-test/:id" element={<LabTestDetail />} />
        <Route path="/book-appointment/:id" element={<BookAppointment />} />

        {/* Protected Routes */}
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/order/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
        <Route path="/my-lab-tests" element={<ProtectedRoute><MyLabTests /></ProtectedRoute>} />
        <Route path="/my-lab-test/:id" element={<ProtectedRoute><LabTestOrderDetail /></ProtectedRoute>} />
        <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
        <Route path="/appointment/:id" element={<ProtectedRoute><AppointmentDetail /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/help-support" element={<ProtectedRoute><HelpSupport /></ProtectedRoute>} />
        <Route path="/lab-checkout" element={<ProtectedRoute><LabCheckout /></ProtectedRoute>} />
        <Route path="/medicine-cart" element={<ProtectedRoute><MedicineCart /></ProtectedRoute>} />
        <Route path="/my-addresses" element={<ProtectedRoute><MyAddresses /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
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
