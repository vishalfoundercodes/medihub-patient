import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import AccountSidebar from '../components/account/AccountSidebar';
import OrderSearch from '../components/orders/OrderSearch';
import OrderFilters from '../components/orders/OrderFilters';
import OrderCard from '../components/orders/OrderCard';
import OrderPagination from '../components/orders/OrderPagination';
import OrderHelpBar from '../components/orders/OrderHelpBar';
import { useAuth } from '../context/AuthContext';
import { MOCK_ORDERS } from '../context/AuthContext';

const PER_PAGE = 5;

// Generate more mock orders for pagination demo
const ALL_ORDERS = [
  ...MOCK_ORDERS,
  { id: 'MC123451', type: 'Medicines', date: 'Apr 28, 2024', amount: 320, status: 'Delivered', items: 2, deliveryLabel: 'Delivered on', deliveryDate: 'Apr 30, 2024', address: 'New Delhi, 110001' },
  { id: 'MC123450', type: 'Lab Test', date: 'Apr 25, 2024', amount: 799, status: 'Completed', items: 1, deliveryLabel: 'Completed on', deliveryDate: 'Apr 25, 2024', address: 'New Delhi, 110001' },
  { id: 'MC123449', type: 'Appointment', date: 'Apr 20, 2024', amount: 499, status: 'Confirmed', items: 1, deliveryLabel: 'Appointment on', deliveryDate: 'Apr 22, 2024 at 11:00 AM', address: 'Dr. Rajesh Kumar' },
  { id: 'MC123448', type: 'Medicines', date: 'Apr 15, 2024', amount: 1100, status: 'Delivered', items: 4, deliveryLabel: 'Delivered on', deliveryDate: 'Apr 17, 2024', address: 'New Delhi, 110001' },
  { id: 'MC123447', type: 'Lab Test', date: 'Apr 10, 2024', amount: 549, status: 'Completed', items: 1, deliveryLabel: 'Completed on', deliveryDate: 'Apr 10, 2024', address: 'New Delhi, 110001' },
  { id: 'MC123446', type: 'Medicines', date: 'Apr 05, 2024', amount: 875, status: 'Delivered', items: 3, deliveryLabel: 'Delivered on', deliveryDate: 'Apr 07, 2024', address: 'New Delhi, 110001' },
  { id: 'MC123445', type: 'Appointment', date: 'Mar 30, 2024', amount: 600, status: 'Confirmed', items: 1, deliveryLabel: 'Appointment on', deliveryDate: 'Apr 01, 2024 at 02:00 PM', address: 'Dr. Neha Singh' },
  { id: 'MC123444', type: 'Lab Test', date: 'Mar 25, 2024', amount: 999, status: 'Completed', items: 2, deliveryLabel: 'Completed on', deliveryDate: 'Mar 25, 2024', address: 'New Delhi, 110001' },
  { id: 'MC123443', type: 'Medicines', date: 'Mar 20, 2024', amount: 450, status: 'Delivered', items: 2, deliveryLabel: 'Delivered on', deliveryDate: 'Mar 22, 2024', address: 'New Delhi, 110001' },
  { id: 'MC123442', type: 'Medicines', date: 'Mar 15, 2024', amount: 230, status: 'Delivered', items: 1, deliveryLabel: 'Delivered on', deliveryDate: 'Mar 17, 2024', address: 'New Delhi, 110001' },
  { id: 'MC123441', type: 'Lab Test', date: 'Mar 10, 2024', amount: 649, status: 'Completed', items: 1, deliveryLabel: 'Completed on', deliveryDate: 'Mar 10, 2024', address: 'New Delhi, 110001' },
  { id: 'MC123440', type: 'Appointment', date: 'Mar 05, 2024', amount: 499, status: 'Confirmed', items: 1, deliveryLabel: 'Appointment on', deliveryDate: 'Mar 07, 2024 at 10:00 AM', address: 'Dr. Amit Verma' },
  { id: 'MC123439', type: 'Medicines', date: 'Mar 01, 2024', amount: 780, status: 'Delivered', items: 3, deliveryLabel: 'Delivered on', deliveryDate: 'Mar 03, 2024', address: 'New Delhi, 110001' },
  { id: 'MC123438', type: 'Lab Test', date: 'Feb 25, 2024', amount: 899, status: 'Completed', items: 1, deliveryLabel: 'Completed on', deliveryDate: 'Feb 25, 2024', address: 'New Delhi, 110001' },
  { id: 'MC123437', type: 'Medicines', date: 'Feb 20, 2024', amount: 560, status: 'Delivered', items: 2, deliveryLabel: 'Delivered on', deliveryDate: 'Feb 22, 2024', address: 'New Delhi, 110001' },
  { id: 'MC123436', type: 'Appointment', date: 'Feb 15, 2024', amount: 700, status: 'Confirmed', items: 1, deliveryLabel: 'Appointment on', deliveryDate: 'Feb 17, 2024 at 03:00 PM', address: 'Dr. Priya Sharma' },
  { id: 'MC123435', type: 'Lab Test', date: 'Feb 10, 2024', amount: 1199, status: 'Completed', items: 3, deliveryLabel: 'Completed on', deliveryDate: 'Feb 10, 2024', address: 'New Delhi, 110001' },
  { id: 'MC123434', type: 'Medicines', date: 'Feb 05, 2024', amount: 340, status: 'Delivered', items: 2, deliveryLabel: 'Delivered on', deliveryDate: 'Feb 07, 2024', address: 'New Delhi, 110001' },
];

export default function Orders() {
  const { user, setShowLogin } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [page, setPage] = useState(1);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) { setShowLogin(true); navigate('/'); }
  }, [user]);

  if (!user) return null;

  const filtered = useMemo(() => {
    let result = [...ALL_ORDERS];
    if (activeTab !== 'all') result = result.filter((o) => o.type === activeTab);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((o) =>
        o.id.toLowerCase().includes(q) ||
        o.type.toLowerCase().includes(q) ||
        o.status.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeTab, search]);

  // Reset to page 1 on filter/search change
  const resetPage = (fn) => (...args) => { fn(...args); setPage(1); };

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

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
              active="orders"
              onChange={(id) => {
                setMobileSidebarOpen(false);
                if (id === 'account') navigate('/account');
                else if (id === 'orders') navigate('/orders');
              }}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Header row */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">My Orders</h1>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                  Track, view and manage all your orders
                </p>
              </div>
              <OrderSearch value={search} onChange={resetPage(setSearch)} />
            </div>

            {/* Filters */}
            <OrderFilters active={activeTab} onChange={resetPage(setActiveTab)} />

            {/* Order list */}
            {paginated.length > 0 ? (
              <div className="space-y-4">
                {paginated.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-16 text-center">
                <p className="text-4xl mb-3">📦</p>
                <h3 className="font-bold text-[var(--color-text-dark)] mb-1">No orders found</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">Try adjusting your search or filter</p>
              </div>
            )}

            {/* Pagination */}
            {filtered.length > PER_PAGE && (
              <OrderPagination
                current={page}
                total={filtered.length}
                perPage={PER_PAGE}
                onChange={setPage}
              />
            )}

            {/* Help bar */}
            <OrderHelpBar />
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
