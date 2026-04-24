import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, User, Calendar, MapPin, Home, Plus,
  CheckCircle, Loader2, FlaskConical, Trash2, ShieldCheck
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';

const SAVED_ADDRESSES = [
  {
    id: 1, label: 'Home',
    address: 'A-45, 2nd Floor, Green Park Extension',
    city: 'New Delhi', pincode: '110016', default: true,
  },
  {
    id: 2, label: 'Office',
    address: 'B-12, Connaught Place',
    city: 'New Delhi', pincode: '110001', default: false,
  },
];

const TIME_SLOTS = [
  '7:00 AM - 8:00 AM',
  '8:00 AM - 9:00 AM',
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
];

// Get next 7 dates
const getAvailableDates = () => {
  const dates = [];
  for (let i = 1; i <= 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push({
      value: d.toISOString().split('T')[0],
      label: d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
      isToday: i === 1,
    });
  }
  return dates;
};

export default function LabCheckout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const selected = state?.selected || [];

  const [form, setForm] = useState({
    patientName: '',
    age: '',
    gender: '',
    date: '',
    timeSlot: '',
    addressId: SAVED_ADDRESSES.find((a) => a.default)?.id || 1,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [tests, setTests] = useState(selected);

  const dates = getAvailableDates();

  const total = tests.reduce((s, t) => s + t.price, 0);
  const originalTotal = tests.reduce((s, t) => s + t.original, 0);
  const saved = originalTotal - total;

  const set = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    // if (!form.patientName.trim()) e.patientName = 'Patient name is required';
    if (!form.age || isNaN(form.age) || form.age < 1) e.age = 'Valid age is required';
    if (!form.gender) e.gender = 'Gender is required';
    if (!form.date) e.date = 'Please select a date';
    if (!form.timeSlot) e.timeSlot = 'Please select a time slot';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1500);
  };

  const removeTest = (id) => setTests((p) => p.filter((t) => t.id !== id));

  const selectedAddress = SAVED_ADDRESSES.find((a) => a.id === form.addressId);

  if (tests.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-main)]">
        <Navbar />
        <Container className="py-20 text-center">
          <p className="text-5xl mb-4">🛒</p>
          <h2 className="text-xl font-bold text-[var(--color-text-dark)] mb-2">No tests selected</h2>
          <button onClick={() => navigate('/lab-tests')} className="mt-4 bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-semibold">
            Browse Lab Tests
          </button>
        </Container>
        <Footer />
      </div>
    );
  }

  // ── Success screen ──
  if (success) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-main)]">
        <Navbar />
        <Container className="py-20">
          <div className="max-w-lg mx-auto bg-white rounded-3xl border border-[var(--color-border)] p-10 text-center shadow-xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-11 h-11 text-[var(--color-success)]" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-text-dark)] mb-2">Booking Confirmed!</h2>
            <p className="text-[var(--color-text-secondary)] mb-1">
              Your lab tests have been booked successfully.
            </p>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">
              Our phlebotomist will visit on <span className="font-semibold text-[var(--color-text-dark)]">{form.date}</span> between <span className="font-semibold text-[var(--color-text-dark)]">{form.timeSlot}</span>
            </p>

            {/* Booking summary */}
            <div className="bg-[var(--color-bg-section)] rounded-2xl p-4 text-left mb-6 space-y-2">
              <p className="text-xs font-semibold text-[var(--color-text-secondary)] mb-2">BOOKING DETAILS</p>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">Patient</span>
                <span className="font-semibold text-[var(--color-text-dark)]">
                  {/* {form.patientName}, */}
                   {form.age} yrs ({form.gender})</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">Tests</span>
                <span className="font-semibold text-[var(--color-text-dark)]">{tests.length} test{tests.length > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">Total Paid</span>
                <span className="font-bold text-[var(--color-primary)]">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => navigate('/my-lab-tests')} className="flex-1 border border-[var(--color-border)] text-[var(--color-text-dark)] font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all text-sm">
                My Lab Tests
              </button>
              <button onClick={() => navigate('/')} className="flex-1 bg-[var(--color-primary)] text-white font-semibold py-3 rounded-xl hover:bg-[var(--color-primary-dark)] transition-all text-sm">
                Go to Home
              </button>
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <Container className="py-8">

        {/* Back + Title */}
        <div className="mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline mb-3">
            <ArrowLeft className="w-4 h-4" /> Back to Lab Tests
          </button>
          <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">Checkout</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Complete your booking details</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-7">

          {/* ── Left — Form (2/3) ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Selected Tests */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
              <h3 className="font-bold text-[var(--color-text-dark)] mb-4 flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-[var(--color-primary)]" />
                Selected Tests ({tests.length})
              </h3>
              <div className="space-y-3">
                {tests.map((test) => (
                  <div key={test.id} className="flex items-center gap-4 p-3 bg-[var(--color-bg-section)] rounded-xl">
                    <img src={test.image} alt={test.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-[var(--color-text-dark)]">{test.name}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">{test.includes}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-[var(--color-text-dark)]">₹{test.price}</span>
                        <span className="text-xs text-[var(--color-text-secondary)] line-through">₹{test.original}</span>
                        <span className="text-xs font-semibold text-[var(--color-success)]">{test.discount}% OFF</span>
                      </div>
                    </div>
                    <button onClick={() => removeTest(test.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Patient Details */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
              <h3 className="font-bold text-[var(--color-text-dark)] mb-5 flex items-center gap-2">
                <User className="w-5 h-5 text-[var(--color-primary)]" />
                Patient Details
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">

                {/* Name */}
                {/* <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">Patient Name *</label>
                  <input
                    type="text"
                    value={form.patientName}
                    onChange={(e) => set('patientName', e.target.value)}
                    placeholder="Enter patient full name"
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${errors.patientName ? 'border-red-400' : 'border-[var(--color-border)]'}`}
                  />
                  {errors.patientName && <p className="text-red-500 text-xs mt-1">{errors.patientName}</p>}
                </div> */}

                {/* Age */}
                <div>
                  <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">Age *</label>
                  <input
                    type="number"
                    value={form.age}
                    onChange={(e) => set('age', e.target.value)}
                    placeholder="Age in years"
                    min={1} max={120}
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${errors.age ? 'border-red-400' : 'border-[var(--color-border)]'}`}
                  />
                  {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                </div>

                {/* Gender */}
                <div>
                  <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">Gender *</label>
                  <select
                    value={form.gender}
                    onChange={(e) => set('gender', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${errors.gender ? 'border-red-400' : 'border-[var(--color-border)]'}`}
                  >
                    <option value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
              <h3 className="font-bold text-[var(--color-text-dark)] mb-5 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
                Select Date & Time
              </h3>

              {/* Date pills */}
              <div className="mb-5">
                <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-3 block">Collection Date *</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 overflow-x-auto scrollbar-hide pb-1">
                  {dates.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => set('date', d.value)}
                      className={`flex flex-col items-center px-4 py-3 rounded-xl border text-sm font-medium whitespace-nowrap transition-all shrink-0
                        ${form.date === d.value
                          ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-blue-100'
                          : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                        }`}
                    >
                      <span className="text-xs">{d.label.split(' ')[0]}</span>
                      <span className="font-bold">{d.label.split(' ')[1]}</span>
                      <span className="text-xs">{d.label.split(' ')[2]}</span>
                      {d.isToday && <span className="text-[10px] mt-0.5 font-semibold">Tomorrow</span>}
                    </button>
                  ))}
                </div>
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>

              {/* Time slots */}
              <div>
                <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-3 block">Time Slot *</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => set('timeSlot', slot)}
                      className={`px-1 py-2.5 rounded-xl border text-xs font-semibold transition-all
                        ${form.timeSlot === slot
                          ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                          : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                        }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {errors.timeSlot && <p className="text-red-500 text-xs mt-1">{errors.timeSlot}</p>}
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
              <h3 className="font-bold text-[var(--color-text-dark)] mb-5 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
                Collection Address
              </h3>
              <div className="space-y-3 mb-4">
                {SAVED_ADDRESSES.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => set('addressId', addr.id)}
                    className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all
                      ${form.addressId === addr.id
                        ? 'border-[var(--color-primary)] bg-blue-50'
                        : 'border-[var(--color-border)] hover:border-blue-200'
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${form.addressId === addr.id ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-bg-section)]'}`}>
                      <Home className={`w-5 h-5 ${form.addressId === addr.id ? 'text-white' : 'text-[var(--color-text-secondary)]'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-bold text-[var(--color-text-dark)]">{addr.label}</p>
                        {addr.default && <span className="text-[10px] font-bold bg-blue-100 text-[var(--color-primary)] px-2 py-0.5 rounded-full">Default</span>}
                      </div>
                      <p className="text-xs text-[var(--color-text-secondary)]">{addr.address}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">{addr.city} - {addr.pincode}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${form.addressId === addr.id ? 'border-[var(--color-primary)] bg-[var(--color-primary)]' : 'border-[var(--color-border)]'}`}>
                      {form.addressId === addr.id && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowAddAddress(!showAddAddress)}
                className="flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
              >
                <Plus className="w-4 h-4" /> Add New Address
              </button>
              {showAddAddress && (
                <div className="mt-4 p-4 bg-[var(--color-bg-section)] rounded-xl border border-[var(--color-border)]">
                  <p className="text-sm text-[var(--color-text-secondary)] text-center">Address management available in <button onClick={() => navigate('/account')} className="text-[var(--color-primary)] font-semibold hover:underline">My Account → My Addresses</button></p>
                </div>
              )}
            </div>
          </div>

          {/* ── Right — Order Summary (1/3) ── */}
          <div className="space-y-5">

            {/* Price summary */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 sticky top-24">
              <h3 className="font-bold text-[var(--color-text-dark)] mb-4">Order Summary</h3>

              <div className="space-y-2 mb-4">
                {tests.map((t) => (
                  <div key={t.id} className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)] truncate mr-2">{t.name}</span>
                    <span className="font-medium text-[var(--color-text-dark)] shrink-0">₹{t.price}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-[var(--color-border)] pt-3 space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Subtotal</span>
                  <span className="font-medium text-[var(--color-text-dark)]">₹{originalTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Discount</span>
                  <span className="font-semibold text-red-500">- ₹{saved.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Home Collection</span>
                  <span className="font-semibold text-[var(--color-success)]">FREE</span>
                </div>
              </div>

              <div className="border-t border-[var(--color-border)] pt-3 flex justify-between mb-5">
                <span className="font-bold text-[var(--color-text-dark)]">Total Amount</span>
                <span className="font-bold text-xl text-[var(--color-text-dark)]">₹{total.toLocaleString()}</span>
              </div>

              {/* Booking info preview */}
              {(form.patientName || form.date || selectedAddress) && (
                <div className="bg-[var(--color-bg-section)] rounded-xl p-3 mb-4 space-y-1.5">
                  {form.patientName && (
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {/* 👤 <span className="font-semibold text-[var(--color-text-dark)]">{form.patientName}</span> */}
                      {form.age && `, ${form.age} yrs`}
                      {form.gender && ` (${form.gender})`}
                    </p>
                  )}
                  {form.date && (
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      📅 <span className="font-semibold text-[var(--color-text-dark)]">{form.date}</span>
                      {form.timeSlot && ` • ${form.timeSlot}`}
                    </p>
                  )}
                  {selectedAddress && (
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      📍 <span className="font-semibold text-[var(--color-text-dark)]">{selectedAddress.label}</span> — {selectedAddress.address}
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-60 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-100 text-sm"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                {loading ? 'Confirming Booking...' : 'Confirm Booking'}
              </button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-success)]" />
                  Secure Payment
                </div>
                <div className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-success)]" />
                  NABL Certified
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
