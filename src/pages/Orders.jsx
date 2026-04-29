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
import { getOrdersAPI } from '../services/cartService';
import { Loader2 } from 'lucide-react';

const PER_PAGE = 5;

// Status mapping from API to display
const STATUS_MAP = {
  placed:    'Processing',
  confirmed: 'Confirmed',
  shipped:   'Shipped',
  delivered: 'Delivered',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

// Type mapping from API items to display
// Priority: if mixed → show by first item type
const getOrderType = (items) => {
  if (!items?.length) return 'Medicines';
  const types = [...new Set(items.map((i) => i.type))];
  if (types.includes('lab_test') && types.length === 1) return 'Lab Test';
  if (types.includes('medicine') && types.length === 1) return 'Medicines';
  if (types.includes('appointment')) return 'Appointment';
  // Mixed order — use first item type
  return types[0] === 'lab_test' ? 'Lab Test' : 'Medicines';
};

// Delivery label based on status
const getDeliveryLabel = (status) => {
  if (status === 'delivered' || status === 'completed') return 'Delivered on';
  if (status === 'cancelled') return 'Cancelled on';
  if (status === 'shipped') return 'Shipped on';
  return 'Order placed on';
};

export default function Orders() {
  const { user, setShowLogin } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [page, setPage] = useState(1);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getOrdersAPI();
      if (res.success) {
        // Map API response to display format
        const mapped = res.data.orders.map((o) => {
          const displayDate = new Date(o.created_at).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric'
          });
          return {
            id: o.uid,
            type: getOrderType(o.items),
            date: displayDate,
            amount: parseFloat(o.total_amount),
            status: STATUS_MAP[o.status] || o.status,
            items: o.total_items,
            deliveryLabel: getDeliveryLabel(o.status),
            deliveryDate: displayDate,
            address: `${o.city}, ${o.pincode}`,
            note: o.note,
            apiItems: o.items,
          };
        });
        setOrders(mapped);
      } else {
        setError(res.message || 'Failed to load orders.');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    let result = [...orders];
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
  }, [activeTab, search, orders]);

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
            {loading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
              </div>
            ) : error ? (
              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-10 text-center">
                <p className="text-red-500 text-sm mb-3">{error}</p>
                <button onClick={fetchOrders} className="text-sm font-semibold text-[var(--color-primary)] hover:underline">Retry</button>
              </div>
            ) : paginated.length > 0 ? (
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
