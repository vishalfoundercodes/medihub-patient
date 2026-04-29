import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, FlaskConical, MapPin, Clock, Calendar,
  CheckCircle, Loader2, ShieldCheck, XCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import api, { apis } from '../utlities/api';

const statusStyle = {
  requested: { label: 'Requested', text: 'text-orange-500',             bg: 'bg-orange-50',  border: 'border-orange-100' },
  confirmed: { label: 'Confirmed', text: 'text-teal-600',               bg: 'bg-teal-50',    border: 'border-teal-100'   },
  collected: { label: 'Collected', text: 'text-purple-600',             bg: 'bg-purple-50',  border: 'border-purple-100' },
  completed: { label: 'Completed', text: 'text-[var(--color-primary)]', bg: 'bg-blue-50',    border: 'border-blue-100'   },
  cancelled: { label: 'Cancelled', text: 'text-red-500',                bg: 'bg-red-50',     border: 'border-red-100'    },
};

const formatTime = (t) => {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`;
};

const timeline = [
  { key: 'requested', label: 'Order Requested' },
  { key: 'confirmed', label: 'Confirmed'        },
  { key: 'collected', label: 'Sample Collected' },
  { key: 'completed', label: 'Report Ready'     },
];
const ORDER = ['requested', 'confirmed', 'collected', 'completed', 'cancelled'];

export default function LabTestOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`${apis.getLabTestOrderDetail}/${id}`)
      .then((res) => {
        if (res.data.success) setOrder(res.data.data.order);
        else setError(res.data.message || 'Failed to load order.');
      })
      .catch((err) => setError(err?.response?.data?.message || 'Network error.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <Container className="py-20 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary)] mx-auto" />
      </Container>
      <Footer />
    </div>
  );

  if (error || !order) return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <Container className="py-20 text-center">
        <p className="text-5xl mb-4">🧪</p>
        <h2 className="text-xl font-bold text-[var(--color-text-dark)] mb-4">{error || 'Order not found'}</h2>
        <button onClick={() => navigate('/my-lab-tests')} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-semibold text-sm">
          Back to Lab Tests
        </button>
      </Container>
      <Footer />
    </div>
  );

  const st = statusStyle[order.status] || statusStyle.requested;
  const currentIdx = ORDER.indexOf(order.status);
  const bookingDate = new Date(order.booking_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const createdDate = new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const steps = order.status === 'cancelled'
    ? [
        { label: 'Order Requested', done: true },
        { label: 'Order Cancelled', done: true, cancelled: true },
      ]
    : timeline.map((s, i) => ({
        label: s.label,
        done: i < currentIdx,
        active: i === currentIdx,
      }));

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <Container className="py-8">

        {/* Back */}
        <button onClick={() => navigate('/my-lab-tests')} className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to My Lab Tests
        </button>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left — 2/3 */}
          <div className="lg:col-span-2 space-y-5">

            {/* Test Info */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
              <div className="flex items-center gap-4">
                {order.lab_test_image ? (
                  <img src={order.lab_test_image} alt={order.lab_test_name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                ) : (
                  <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <FlaskConical className="w-8 h-8 text-[var(--color-primary)]" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <h2 className="font-bold text-lg text-[var(--color-text-dark)]">{order.lab_test_name}</h2>
                      <p className="text-sm text-[var(--color-text-secondary)]">{order.category_name}</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${st.text} ${st.bg} ${st.border}`}>
                      {st.label}
                    </span>
                  </div>
                  {order.description && (
                    <p className="text-xs text-[var(--color-text-secondary)] mt-2 leading-relaxed">{order.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
              <h3 className="font-bold text-[var(--color-text-dark)] mb-4">Booking Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-[var(--color-bg-section)] rounded-xl">
                  <Calendar className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--color-text-secondary)]">Collection Date</p>
                    <p className="text-sm font-bold text-[var(--color-text-dark)]">{bookingDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[var(--color-bg-section)] rounded-xl">
                  <Clock className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--color-text-secondary)]">Time Slot</p>
                    <p className="text-sm font-bold text-[var(--color-text-dark)]">{formatTime(order.slot_start)} – {formatTime(order.slot_end)}</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-3">Booked on {createdDate}</p>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
              <h3 className="font-bold text-[var(--color-text-dark)] mb-5">Order Timeline</h3>
              <div className="space-y-0">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10
                        ${step.cancelled ? 'bg-red-500'
                        : step.done ? 'bg-[var(--color-success)]'
                        : step.active ? 'bg-white border-2 border-[var(--color-primary)]'
                        : 'bg-white border-2 border-[var(--color-border)]'}`}>
                        {step.cancelled
                          ? <XCircle className="w-5 h-5 text-white" />
                          : step.done
                          ? <CheckCircle className="w-5 h-5 text-white" />
                          : step.active
                          ? <Clock className="w-4 h-4 text-[var(--color-primary)]" />
                          : <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-border)]" />}
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`w-0.5 h-8 ${step.done || step.cancelled ? 'bg-[var(--color-success)]' : 'bg-[var(--color-border)]'}`} />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className={`text-sm font-semibold ${step.done || step.active || step.cancelled ? 'text-[var(--color-text-dark)]' : 'text-[var(--color-text-secondary)]'}`}>
                        {step.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {order.cancel_reason && (
                <div className="mt-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <p className="text-xs font-semibold text-red-600 mb-0.5">Cancellation Reason</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{order.cancel_reason}</p>
                </div>
              )}
            </div>

            {/* Collection Address */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
              <h3 className="font-bold text-[var(--color-text-dark)] mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--color-primary)]" /> Collection Address
              </h3>
              <div className="bg-[var(--color-bg-section)] rounded-xl p-4">
                <p className="text-xs text-[var(--color-text-secondary)] mb-0.5">{order.mobile}</p>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {order.address_line}, {order.city}, {order.state} – {order.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Right — 1/3 */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 sticky top-24">
              <h3 className="font-bold text-[var(--color-text-dark)] mb-4">Price Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Original Price</span>
                  <span className="font-medium line-through text-[var(--color-text-secondary)]">₹{parseFloat(order.price).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Discount</span>
                  <span className="font-semibold text-red-500">- ₹{(parseFloat(order.price) - parseFloat(order.discounted_price)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Home Collection</span>
                  <span className="font-semibold text-[var(--color-success)]">FREE</span>
                </div>
                <div className="border-t border-dashed border-[var(--color-border)] pt-3 flex justify-between">
                  <span className="font-bold text-[var(--color-text-dark)]">Total Paid</span>
                  <span className="font-bold text-xl text-[var(--color-text-dark)]">₹{parseFloat(order.discounted_price).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mt-5">
                <div className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-success)]" /> NABL Certified
                </div>
                <div className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-success)]" /> Home Collection
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
