import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle, Clock, Circle, Package,
  MapPin, CreditCard, Download, RefreshCw, MessageCircle,
  Pill, FlaskConical, Calendar, Copy, ShieldCheck
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import AccountSidebar from '../components/account/AccountSidebar';
import { useAuth } from '../context/AuthContext';
import { ORDER_DETAILS } from '../data/orderDetailData';

const statusStyle = {
  Delivered:  { text: 'text-[var(--color-success)]',  bg: 'bg-green-50',  border: 'border-green-100' },
  Completed:  { text: 'text-[var(--color-primary)]',  bg: 'bg-blue-50',   border: 'border-blue-100'  },
  Shipped:    { text: 'text-purple-600',               bg: 'bg-purple-50', border: 'border-purple-100'},
  Processing: { text: 'text-orange-500',               bg: 'bg-orange-50', border: 'border-orange-100'},
  Confirmed:  { text: 'text-teal-600',                 bg: 'bg-teal-50',   border: 'border-teal-100'  },
};

const typeIcon = {
  Medicines:   { icon: Pill,         bg: 'bg-blue-50',   color: 'text-[var(--color-primary)]' },
  'Lab Test':  { icon: FlaskConical, bg: 'bg-red-50',    color: 'text-red-500'                },
  Appointment: { icon: Calendar,     bg: 'bg-purple-50', color: 'text-purple-600'             },
};

function handleDownloadInvoice(order) {
  const lines = [
    `MEDIHUB - ORDER INVOICE`,
    `================================`,
    `Order ID    : #${order.id}`,
    `Order Date  : ${order.placedOn}`,
    `Status      : ${order.status}`,
    ``,
    `ITEMS:`,
    ...order.products.map((p) => `  - ${p.name} x${p.qty}  ₹${p.price * p.qty}`),
    ``,
    `Subtotal    : ₹${order.pricing.subtotal}`,
    `Discount    : -₹${order.pricing.discount}`,
    `Delivery    : ${order.pricing.delivery === 0 ? 'FREE' : '₹' + order.pricing.delivery}`,
    `Total       : ₹${order.pricing.total}`,
    ``,
    `Payment     : ${order.paymentMethod} (${order.paymentStatus})`,
    `================================`,
    `Thank you for choosing MediHub!`,
  ].join('\n');
  const blob = new Blob([lines], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MediHub_Invoice_${order.id}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function OrderDetail() {
  const { id } = useParams();
  const { user, setShowLogin } = useAuth();
  const navigate = useNavigate();
  const order = ORDER_DETAILS[id];

  useEffect(() => {
    if (!user) { setShowLogin(true); navigate('/'); }
  }, [user]);

  if (!user) return null;

  if (!order) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-main)]">
        <Navbar />
        <Container className="py-20 text-center">
          <p className="text-5xl mb-4">📦</p>
          <h2 className="text-xl font-bold text-[var(--color-text-dark)] mb-4">Order not found</h2>
          <button onClick={() => navigate('/orders')} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-semibold">
            Back to Orders
          </button>
        </Container>
        <Footer />
      </div>
    );
  }

  const st = statusStyle[order.status] || statusStyle.Delivered;
  const { icon: TypeIcon, bg: typeBg, color: typeColor } = typeIcon[order.type] || typeIcon['Medicines'];

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <Container className="py-8">
        <div className="flex gap-7 items-start">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <AccountSidebar active="orders" onChange={() => {}} />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Back + Title */}
            <div>
              <button
                onClick={() => navigate("/orders")}
                className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline mb-3"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Orders
              </button>
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">
                    Order Details
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      Order ID:{" "}
                      <span className="font-semibold text-[var(--color-text-dark)]">
                        #{order.id}
                      </span>
                    </span>
                    <button
                      onClick={() => navigator.clipboard?.writeText(order.id)}
                      className="text-[var(--color-primary)] hover:opacity-70"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-xs font-bold px-3 py-1.5 rounded-full border ${st.text} ${st.bg} ${st.border}`}
                  >
                    {order.status}
                  </span>
                  <span className="text-xs text-[var(--color-text-secondary)]">
                    Placed on {order.placedOn}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
              {/* Left col — 2/3 */}
              <div className="lg:col-span-2 space-y-5">
                {/* Order Items */}
                <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
                  <h3 className="font-bold text-[var(--color-text-dark)] mb-4 flex items-center gap-2">
                    <div
                      className={`${typeBg} w-8 h-8 rounded-lg flex items-center justify-center`}
                    >
                      <TypeIcon className={`w-4 h-4 ${typeColor}`} />
                    </div>
                    {order.type === "Medicines"
                      ? "Ordered Items"
                      : order.type === "Lab Test"
                        ? "Booked Tests"
                        : "Appointment Details"}
                    <span className="text-sm font-normal text-[var(--color-text-secondary)]">
                      ({order.products.length} item
                      {order.products.length > 1 ? "s" : ""})
                    </span>
                  </h3>
                  <div className="space-y-3">
                    {order.products.map((product, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-3 bg-[var(--color-bg-section)] rounded-xl"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-[var(--color-text-dark)]">
                            {product.name}
                          </p>
                          <p className="text-xs text-[var(--color-text-secondary)]">
                            {product.strip}
                          </p>
                          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                            Qty: {product.qty}
                          </p>
                        </div>
                        <p className="font-bold text-[var(--color-text-dark)] shrink-0">
                          ₹{(product.price * product.qty).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
                  <h3 className="font-bold text-[var(--color-text-dark)] mb-5">
                    Order Timeline
                  </h3>
                  <div className="space-y-0">
                    {order.timeline.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10
                            ${step.done ? "bg-[var(--color-success)]" : step.active ? "bg-white border-2 border-[var(--color-primary)]" : "bg-white border-2 border-[var(--color-border)]"}`}
                          >
                            {step.done ? (
                              <CheckCircle className="w-5 h-5 text-white" />
                            ) : step.active ? (
                              <Clock className="w-4 h-4 text-[var(--color-primary)]" />
                            ) : (
                              <Circle className="w-4 h-4 text-[var(--color-border)]" />
                            )}
                          </div>
                          {i < order.timeline.length - 1 && (
                            <div
                              className={`w-0.5 h-8 ${step.done ? "bg-[var(--color-success)]" : "bg-[var(--color-border)]"}`}
                            />
                          )}
                        </div>
                        <div className="pb-6">
                          <p
                            className={`text-sm font-semibold ${step.done || step.active ? "text-[var(--color-text-dark)]" : "text-[var(--color-text-secondary)]"}`}
                          >
                            {step.label}
                          </p>
                          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                            {step.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
                  <h3 className="font-bold text-[var(--color-text-dark)] mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
                    {order.type === "Appointment"
                      ? "Appointment Location"
                      : "Delivery Address"}
                  </h3>
                  <div className="bg-[var(--color-bg-section)] rounded-xl p-4">
                    <p className="font-bold text-sm text-[var(--color-text-dark)] mb-0.5">
                      {order.address.name}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)] mb-0.5">
                      {order.address.phone}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {order.address.line}, {order.address.city} -{" "}
                      {order.address.pincode}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleDownloadInvoice(order)}
                      className="flex items-center gap-2 border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-blue-50 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
                    >
                      <Download className="w-4 h-4" /> Download Invoice
                    </button>
                    {(order.status === "Shipped" ||
                      order.status === "Processing") && (
                      <button className="flex items-center gap-2 border border-[var(--color-border)] text-[var(--color-text-dark)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] font-semibold px-5 py-2.5 rounded-xl text-sm transition-all">
                        <RefreshCw className="w-4 h-4" /> Track Order
                      </button>
                    )}
                    <button
                      className="flex items-center gap-2 border border-[var(--color-border)] text-[var(--color-text-dark)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
                      onClick={() => navigate("/help-support")}
                    >
                      <MessageCircle className="w-4 h-4" /> Contact Support
                    </button>
                  </div>
                </div>
              </div>

              {/* Right col — 1/3 */}
              <div className="space-y-5">
                {/* Price Summary */}
                <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
                  <h3 className="font-bold text-[var(--color-text-dark)] mb-4">
                    Price Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-text-secondary)]">
                        Subtotal
                      </span>
                      <span className="font-medium text-[var(--color-text-dark)]">
                        ₹{order.pricing.subtotal.toLocaleString()}
                      </span>
                    </div>
                    {order.pricing.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--color-text-secondary)]">
                          Discount
                        </span>
                        <span className="font-semibold text-red-500">
                          - ₹{order.pricing.discount.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-text-secondary)]">
                        Delivery
                      </span>
                      <span className="font-semibold text-[var(--color-success)]">
                        {order.pricing.delivery === 0
                          ? "FREE"
                          : `₹${order.pricing.delivery}`}
                      </span>
                    </div>
                    <div className="border-t border-dashed border-[var(--color-border)] pt-3 flex justify-between">
                      <span className="font-bold text-[var(--color-text-dark)]">
                        Total Amount
                      </span>
                      <span className="font-bold text-xl text-[var(--color-text-dark)]">
                        ₹{order.pricing.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
                  <h3 className="font-bold text-[var(--color-text-dark)] mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[var(--color-primary)]" />
                    Payment Info
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-text-secondary)]">
                        Method
                      </span>
                      <span className="font-semibold text-[var(--color-text-dark)]">
                        {order.paymentMethod}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-text-secondary)]">
                        Status
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-[var(--color-success)]">
                        <CheckCircle className="w-3.5 h-3.5" />{" "}
                        {order.paymentStatus}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-text-secondary)]">
                        Amount
                      </span>
                      <span className="font-bold text-[var(--color-text-dark)]">
                        ₹{order.pricing.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust */}
                <div className="bg-[var(--color-bg-section)] rounded-2xl border border-[var(--color-border)] p-4">
                  <div className="space-y-2">
                    {[
                      "100% Genuine Products",
                      "Secure Payment",
                      "Easy Returns",
                    ].map((t) => (
                      <div
                        key={t}
                        className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-success)] shrink-0" />
                        {t}
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
