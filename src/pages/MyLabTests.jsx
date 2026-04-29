import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import AccountSidebar from '../components/account/AccountSidebar';
import { FlaskConical, ChevronRight, Menu, Loader2 } from 'lucide-react';
import api, { apis } from '../utlities/api';

const statusStyle = {
  requested:  'bg-orange-100 text-orange-500',
  confirmed:  'bg-teal-100 text-teal-600',
  collected:  'bg-purple-100 text-purple-600',
  completed:  'bg-blue-100 text-[var(--color-primary)]',
  cancelled:  'bg-red-100 text-red-500',
};

const statusLabel = {
  requested: 'Requested',
  confirmed: 'Confirmed',
  collected: 'Collected',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const formatTime = (t) => {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`;
};

export default function MyLabTests() {
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(apis.getLabTestOrders)
      .then((res) => { if (res.data.success) setOrders(res.data.data.orders); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <Container className="py-8">

        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="lg:hidden mb-4 flex items-center gap-2 border border-[var(--color-border)] px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--color-text-dark)] bg-white hover:border-[var(--color-primary)] transition-all"
        >
          <Menu className="w-4 h-4" /> Account Menu
        </button>

        <div className="flex gap-7 items-start">
          <div className={`${mobileSidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}>
            <AccountSidebar
              active="labtests"
              onChange={(id) => {
                setMobileSidebarOpen(false);
                if (id === 'account') navigate('/account');
                else if (id === 'orders') navigate('/orders');
                else if (id === 'appointments') navigate('/appointments');
                else if (id === 'notifications') navigate('/notifications');
                else if (id === 'help') navigate('/help-support');
              }}
            />
          </div>

          <div className="flex-1 min-w-0 space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">My Lab Tests</h1>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">View and manage your booked lab tests</p>
            </div>

            {loading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-16 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FlaskConical className="w-8 h-8 text-[var(--color-primary)]" />
                </div>
                <h3 className="font-bold text-[var(--color-text-dark)] mb-2">No lab tests booked</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">Book a lab test to see it here</p>
                <button onClick={() => navigate('/lab-tests')} className="bg-[var(--color-primary)] text-white font-semibold px-6 py-2.5 rounded-xl text-sm">
                  Browse Lab Tests
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const bookingDate = new Date(order.booking_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                  const createdDate = new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                  return (
                    <div key={order.id}
                      onClick={() => navigate(`/my-lab-test/${order.id}`)}
                      className="bg-white rounded-2xl border border-[var(--color-border)] hover:border-blue-200 hover:shadow-md transition-all p-5 cursor-pointer"
                    >
                      <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                        {order.lab_test_image ? (
                          <img src={order.lab_test_image} alt={order.lab_test_name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                        ) : (
                          <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                            <FlaskConical className="w-7 h-7 text-[var(--color-primary)]" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-[var(--color-text-dark)]">{order.lab_test_name}</p>
                          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{order.category_name}</p>
                          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                            Booked on {createdDate} • Collection: {bookingDate}
                          </p>
                          {order.slot_start && (
                            <p className="text-xs text-[var(--color-primary)] font-medium mt-0.5">
                              🕐 {formatTime(order.slot_start)} – {formatTime(order.slot_end)}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col md:flex-row items-end md:items-center gap-3 shrink-0">
                          <div className="text-right">
                            <p className="font-bold text-[var(--color-text-dark)] mb-1">₹{parseFloat(order.discounted_price).toLocaleString()}</p>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[order.status] || 'bg-gray-100 text-gray-500'}`}>
                              {statusLabel[order.status] || order.status}
                            </span>
                          </div>
                          <ChevronRight className="w-7 h-7 text-[var(--color-text-secondary)] bg-blue-100 rounded-[5px] shrink-0" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
