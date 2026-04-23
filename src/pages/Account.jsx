import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Container from '../components/Container';
import AccountSidebar from '../components/account/AccountSidebar';
import ProfileCard from '../components/account/ProfileCard';
import ProfileInfo from '../components/account/ProfileInfo';
import AccountOverview from '../components/account/AccountOverview';
import RecentOrders from '../components/account/RecentOrders';
import AccountQuickActions from '../components/account/AccountQuickActions';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, FlaskConical, Calendar, FileText, Pill, MapPin, CreditCard, Tag, Bell, Settings, HelpCircle } from 'lucide-react';

function PlaceholderSection({ icon: Icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-12 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-[var(--color-primary)]" />
      </div>
      <h3 className="font-bold text-[var(--color-text-dark)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--color-text-secondary)]">{desc}</p>
    </div>
  );
}

const sectionMap = {
  orders: { icon: ShoppingBag, title: 'My Orders', desc: 'Your order history will appear here.' },
  labtests: { icon: FlaskConical, title: 'My Lab Tests', desc: 'Your booked lab tests will appear here.' },
  appointments: { icon: Calendar, title: 'My Appointments', desc: 'Your upcoming appointments will appear here.' },
  reports: { icon: FileText, title: 'My Reports', desc: 'Your downloaded reports will appear here.' },
  prescriptions: { icon: Pill, title: 'My Prescriptions', desc: 'Your prescriptions will appear here.' },
  addresses: { icon: MapPin, title: 'My Addresses', desc: 'Your saved addresses will appear here.' },
  payments: { icon: CreditCard, title: 'Payment Methods', desc: 'Your saved payment methods will appear here.' },
  offers: { icon: Tag, title: 'Offers & Wallet', desc: 'Your offers and wallet balance will appear here.' },
  notifications: { icon: Bell, title: 'Notifications', desc: 'Your notifications will appear here.' },
  settings: { icon: Settings, title: 'Settings', desc: 'Account settings will appear here.' },
  help: { icon: HelpCircle, title: 'Help & Support', desc: 'Help and support options will appear here.' },
};

export default function Account() {
  const { user, setShowLogin } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('account');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowLogin(true);
      navigate('/');
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />

      <Container className="py-8">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="lg:hidden mb-4 flex items-center gap-2 border border-[var(--color-border)] px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--color-text-dark)] bg-white hover:border-[var(--color-primary)] transition-all"
        >
          ☰ Account Menu
        </button>

        <div className="flex gap-7 items-start">
          {/* Sidebar */}
          <div className={`${mobileSidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}>
            <AccountSidebar
              active={activeSection}
              onChange={(id) => { setActiveSection(id); setMobileSidebarOpen(false); }}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-6">
            {activeSection === 'account' ? (
              <>
                {/* Page title */}
                <div>
                  <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">My Account</h1>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    Manage your profile, orders and account settings
                  </p>
                </div>

                {/* Top row: Profile card + Overview */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <ProfileCard />
                  <AccountOverview />
                </div>

                {/* Middle row: Profile info + Recent orders */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <ProfileInfo />
                  <RecentOrders />
                </div>

                {/* Quick actions */}
                <AccountQuickActions />
              </>
            ) : (
              <>
                <div>
                  <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">
                    {sectionMap[activeSection]?.title}
                  </h1>
                </div>
                <PlaceholderSection
                  icon={sectionMap[activeSection]?.icon}
                  title={sectionMap[activeSection]?.title}
                  desc={sectionMap[activeSection]?.desc}
                />
              </>
            )}
          </div>
        </div>
      </Container>

      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
}
