import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle, Clock, Circle,
  MapPin, CreditCard, Download, RefreshCw, MessageCircle,
  Pill, FlaskConical, Calendar, Copy, ShieldCheck, Loader2, XCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import AccountSidebar from '../components/account/AccountSidebar';
import { useAuth } from '../context/AuthContext';
import { getOrderDetailAPI } from '../services/cartService';

// ── Status config ──
const STATUS_MAP = {
  placed:    { label: 'Processing', text: 'text-orange-500',              bg: 'bg-orange-50',  border: 'border-orange-100' },
  confirmed: { label: 'Confirmed',  text: 'text-teal-600',                bg: 'bg-teal-50',    border: 'border-teal-100'   },
  shipped:   { label: 'Shipped',    text: 'text-purple-600',              bg: 'bg-purple-50',  border: 'border-purple-100' },
  delivered: { label: 'Delivered',  text: 'text-[var(--color-success)]',  bg: 'bg-green-50',   border: 'border-green-100'  },
  completed: { label: 'Completed',  text: 'text-[var(--color-primary)]',  bg: 'bg-blue-50',    border: 'border-blue-100'   },
  cancelled: { label: 'Cancelled',  text: 'text-red-500',                 bg: 'bg-red-50',     border: 'border-red-100'    },
};

// ── Type icon config ──
const TYPE_ICON = {
  medicine: { icon: Pill,         bg: 'bg-blue-50',   color: 'text-[var(--color-primary)]' },
  lab_test: { icon: FlaskConical, bg: 'bg-red-50',    color: 'text-red-500'                },
  appointment: { icon: Calendar,  bg: 'bg-purple-50', color: 'text-purple-600'             },
};

// ── Build timeline from status ──
const buildTimeline = (status, createdAt, updatedAt) => {
  const fmt = (d) => d ? new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';
  const steps = [
    { label: 'Order Placed',   key: 'placed'    },
    { label: 'Confirmed',      key: 'confirmed' },
    { label: 'Shipped',        key: 'shipped'   },
    { label: 'Delivered',      key: 'delivered' },
  ];
  const ORDER = ['placed', 'confirmed', 'shipped', 'delivered', 'completed', 'cancelled'];
  const currentIdx = ORDER.indexOf(status);

  if (status === 'cancelled') {
    return [
      { label: 'Order Placed', date: fmt(createdAt), done: true },
      { label: 'Order Cancelled', date: fmt(updatedAt), done: true, cancelled: true },
    ];
  }

  return steps.map((s, i) => ({
    label: s.label,
    date: i === 0 ? fmt(createdAt) : i <= currentIdx ? fmt(updatedAt) : '—',
    done: i < currentIdx,
    active: i === currentIdx,
  }));
};

// ── Download invoice ──
function downloadInvoice(order, items) {
  const lines = [
    `MEDIHUB - ORDER INVOICE`,
    `================================`,
    `Order ID  : ${order.uid}`,
    `Date      : ${new Date(order.created_at).toLocaleDateString('en-IN')}`,
    `Status    : ${order.status}`,
    ``,
    `ITEMS:`,
    ...items.map((i) => `  - ${i.name} x${i.quantity}  ₹${i.subtotal}`),
    ``,
    `Total     : ₹${order.total_amount}`,
    `Address   : ${order.address_line}, ${order.city} - ${order.pincode}`,
    order.note ? `Note      : ${order.note}` : '',
    `================================`,
    `Thank you for choosing MediHub!`,
  ].filter(Boolean).join('\n');

  const blob = new Blob([lines], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MediHub_Invoice_${order.uid}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function OrderDetail() {
  const { id } = useParams();
  const { user, setShowLogin } = useAuth();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  const fetchOrderDetail = async () => {
    setLoading(true);
    setError('');
    try {
      // Extract numeric id from uid like "ORD000001" → 1, or use raw id param
      const numericId = id.startsWith('ORD') ? parseInt(id.replace('ORD', ''), 10) : id;
      const res = await getOrderDetailAPI(numericId);
      if (res.success) {
        setOrder(res.data.order);
        setItems(res.data.items);
      } else {
        setError(res.message || 'Failed to load order details.');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-main)]">
        <Navbar />
        <Container className="py-20 text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary)] mx-auto" />
          <p className="text-sm text-[var(--color-text-secondary)] mt-4">Loading order details...</p>
        </Container>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !order) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-main)]">
        <Navbar />
        <Container className="py-20 text-center">
          <p className="text-5xl mb-4">📦</p>
          <h2 className="text-xl font-bold text-[var(--color-text-dark)] mb-2">{error || 'Order not found'}</h2>
          <div className="flex gap-3 justify-center mt-4">
            <button onClick={fetchOrderDetail} className="border border-[var(--color-primary)] text-[var(--color-primary)] px-5 py-2.5 rounded-xl font-semibold text-sm">Retry</button>
            <button onClick={() => navigate('/orders')} className="bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-xl font-semibold text-sm">Back to Orders</button>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  const st = STATUS_MAP[order.status] || STATUS_MAP.placed;
  const timeline = buildTimeline(order.status, order.created_at, order.updated_at);
  const placedOn = new Date(order.created_at).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const discount = parseFloat(order.total_discount);
  const total = parseFloat(order.total_amount);
  const original = parseFloat(order.total_original);

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <Container className="py-8">
        <div className="flex gap-7 items-start">

          {/* Sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <AccountSidebar active="orders" onChange={(id) => {
              if (id === 'account') navigate('/account');
              else if (id === 'orders') navigate('/orders');
            }} />
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Back + Title */}
            <div>
              <button onClick={() => navigate('/orders')} className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline mb-3">
                <ArrowLeft className="w-4 h-4" /> Back to Orders
              </button>
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">Order Details</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      Order ID: <span className="font-semibold text-[var(--color-text-dark)]">{order.uid}</span>
                    </span>
                    <button onClick={() => navigator.clipboard?.writeText(order.uid)} className="text-[var(--color-primary)] hover:opacity-70">
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${st.text} ${st.bg} ${st.border}`}>
                    {st.label}
                  </span>
                  <span className="text-xs text-[var(--color-text-secondary)]">Placed on {placedOn}</span>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-5">

              {/* Left — 2/3 */}
              <div className="lg:col-span-2 space-y-5">

                {/* Order Items */}
                <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
                  <h3 className="font-bold text-[var(--color-text-dark)] mb-4">
                    Ordered Items <span className="text-sm font-normal text-[var(--color-text-secondary)]">({items.length} item{items.length > 1 ? 's' : ''})</span>
                  </h3>
                  <div className="space-y-3">
                    {items.map((item) => {
                      const cfg = TYPE_ICON[item.type] || TYPE_ICON.medicine;
                      const Icon = cfg.icon;
                      return (
                        <div key={item.id} className="flex items-center gap-4 p-3 bg-[var(--color-bg-section)] rounded-xl">
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                          ) : (
                            <div className={`w-14 h-14 ${cfg.bg} rounded-xl flex items-center justify-center shrink-0`}>
                              <Icon className={`w-7 h-7 ${cfg.color}`} />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-[var(--color-text-dark)]">{item.name}</p>
                            <p className="text-xs text-[var(--color-text-secondary)] capitalize mt-0.5">{item.type.replace('_', ' ')}</p>
                            <p className="text-xs text-[var(--color-text-secondary)]">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-bold text-[var(--color-text-dark)]">₹{parseFloat(item.subtotal).toLocaleString()}</p>
                            <p className="text-xs text-[var(--color-text-secondary)]">₹{parseFloat(item.price)} × {item.quantity}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
                  <h3 className="font-bold text-[var(--color-text-dark)] mb-5">Order Timeline</h3>
                  <div className="space-y-0">
                    {timeline.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10
                            ${step.cancelled ? 'bg-red-500'
                            : step.done ? 'bg-[var(--color-success)]'
                            : step.active ? 'bg-white border-2 border-[var(--color-primary)]'
                            : 'bg-white border-2 border-[var(--color-border)]'}`}>
                            {step.cancelled ? <XCircle className="w-5 h-5 text-white" />
                              : step.done ? <CheckCircle className="w-5 h-5 text-white" />
                              : step.active ? <Clock className="w-4 h-4 text-[var(--color-primary)]" />
                              : <Circle className="w-4 h-4 text-[var(--color-border)]" />}
                          </div>
                          {i < timeline.length - 1 && (
                            <div className={`w-0.5 h-8 ${step.done || step.cancelled ? 'bg-[var(--color-success)]' : 'bg-[var(--color-border)]'}`} />
                          )}
                        </div>
                        <div className="pb-6">
                          <p className={`text-sm font-semibold ${step.done || step.active || step.cancelled ? 'text-[var(--color-text-dark)]' : 'text-[var(--color-text-secondary)]'}`}>
                            {step.label}
                          </p>
                          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cancel reason */}
                  {order.cancel_reason && (
                    <div className="mt-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      <p className="text-xs font-semibold text-red-600 mb-0.5">Cancellation Reason</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{order.cancel_reason}</p>
                    </div>
                  )}
                </div>

                {/* Delivery Address */}
                <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
                  <h3 className="font-bold text-[var(--color-text-dark)] mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[var(--color-primary)]" /> Delivery Address
                  </h3>
                  <div className="bg-[var(--color-bg-section)] rounded-xl p-4">
                    <p className="font-bold text-sm text-[var(--color-text-dark)] mb-0.5">{order.user_name}</p>
                    <p className="text-xs text-[var(--color-text-secondary)] mb-0.5">{order.mobile}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {order.address_line}, {order.city}, {order.state} - {order.pincode}
                    </p>
                    {order.note && (
                      <p className="text-xs text-[var(--color-primary)] mt-2 font-medium">📝 {order.note}</p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => downloadInvoice(order, items)}
                      className="flex items-center gap-2 border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-blue-50 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
                    >
                      <Download className="w-4 h-4" /> Download Invoice
                    </button>
                    {(order.status === 'placed' || order.status === 'confirmed' || order.status === 'shipped') && (
                      <button className="flex items-center gap-2 border border-[var(--color-border)] text-[var(--color-text-dark)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] font-semibold px-5 py-2.5 rounded-xl text-sm transition-all">
                        <RefreshCw className="w-4 h-4" /> Track Order
                      </button>
                    )}
                    <button onClick={() => navigate('/help-support')} className="flex items-center gap-2 border border-[var(--color-border)] text-[var(--color-text-dark)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] font-semibold px-5 py-2.5 rounded-xl text-sm transition-all">
                      <MessageCircle className="w-4 h-4" /> Contact Support
                    </button>
                  </div>
                </div>
              </div>

              {/* Right — 1/3 */}
              <div className="space-y-5">

                {/* Price Summary */}
                <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
                  <h3 className="font-bold text-[var(--color-text-dark)] mb-4">Price Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-text-secondary)]">Subtotal</span>
                      <span className="font-medium text-[var(--color-text-dark)]">₹{original.toLocaleString()}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--color-text-secondary)]">Discount</span>
                        <span className="font-semibold text-red-500">- ₹{discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-text-secondary)]">Delivery</span>
                      <span className="font-semibold text-[var(--color-success)]">FREE</span>
                    </div>
                    <div className="border-t border-dashed border-[var(--color-border)] pt-3 flex justify-between">
                      <span className="font-bold text-[var(--color-text-dark)]">Total Amount</span>
                      <span className="font-bold text-xl text-[var(--color-text-dark)]">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
                  <h3 className="font-bold text-[var(--color-text-dark)] mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[var(--color-primary)]" /> Payment Info
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-text-secondary)]">Status</span>
                      <span className="flex items-center gap-1 font-semibold text-[var(--color-success)]">
                        <CheckCircle className="w-3.5 h-3.5" /> Paid
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-text-secondary)]">Amount</span>
                      <span className="font-bold text-[var(--color-text-dark)]">₹{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-text-secondary)]">Mobile</span>
                      <span className="font-medium text-[var(--color-text-dark)]">{order.mobile}</span>
                    </div>
                  </div>
                </div>

                {/* Trust */}
                <div className="bg-[var(--color-bg-section)] rounded-2xl border border-[var(--color-border)] p-4">
                  <div className="space-y-2">
                    {['100% Genuine Products', 'Secure Payment', 'Easy Returns'].map((t) => (
                      <div key={t} className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-success)] shrink-0" /> {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
