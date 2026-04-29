import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ShoppingCart, Plus, Minus, Trash2, Upload, X,
  FileText, MapPin, CheckCircle, Loader2, ShieldCheck, Tag
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import { useCart } from '../context/CartContext';
import { placeOrderAPI } from '../services/cartService';

const ADDRESSES = [
  { id: 1, label: 'Home', address: '12, Sector 15, Rohini, New Delhi - 110085' },
  { id: 2, label: 'Work', address: '4th Floor, Tower B, Cyber City, Gurugram - 122002' },
];

export default function MedicineCart() {
  const navigate = useNavigate();
  const { apiCart, summary, cartLoading, fetchCart, addToCart, removeFromCart } = useCart();

  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [note, setNote] = useState('');
  const [orderResult, setOrderResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');
  const fileInputRef = useRef(null);
  useEffect(() => { fetchCart(); }, []);

  // Filter only medicine items from apiCart
  const cartItems = apiCart
    .filter((item) => item.type === 'medicine')
    .map((item) => ({
      id: item.id,
      item_id: item.item_id,
      type: item.type,
      name: item.name,
      image: item.image_url,
      price: parseFloat(item.price),
      discount: parseFloat(item.discount_percent),
      subtotal: parseFloat(item.subtotal),
      qty: item.quantity,
    }));

  // Summary only for medicine items
  const subtotal    = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const savings     = cartItems.reduce((s, i) => s + (i.price * i.qty - i.subtotal), 0);
  const totalAmount = cartItems.reduce((s, i) => s + i.subtotal, 0);
  const deliveryFee = totalAmount >= 499 ? 0 : 49;
  const total       = totalAmount + deliveryFee;

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,  // keep actual File object for API
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type.startsWith('image/') ? 'image' : 'pdf',
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    }));
    setPrescriptions((prev) => [...prev, ...newFiles]);
    e.target.value = '';
  };

  const removePrescription = (id) => setPrescriptions((prev) => prev.filter((p) => p.id !== id));

  const handlePlaceOrder = async () => {
    setLoading(true);
    setOrderError('');
    try {
      // prescription: first uploaded file (if any)
      const prescriptionFile = prescriptions[0]?.file || null;
      const res = await placeOrderAPI({
        address_id: selectedAddress,
        note,
        prescription: prescriptionFile,
        type: 'medicine',
      });
      if (res.success) {
        setOrderResult(res.data);
        setSuccess(true);
      } else {
        setOrderError(res.message || 'Failed to place order. Please try again.');
      }
    } catch (err) {
      setOrderError(err?.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-main)]">
        <Navbar />
        <Container className="py-20 text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary)] mx-auto" />
          <p className="text-sm text-[var(--color-text-secondary)] mt-4">Loading your cart...</p>
        </Container>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-main)]">
        <Navbar />
        <Container className="py-20 text-center">
          <p className="text-6xl mb-4">🛒</p>
          <h2 className="text-xl font-bold text-[var(--color-text-dark)] mb-2">Your cart is empty</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">Add medicines to continue</p>
          <button onClick={() => navigate('/medicines')} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-semibold">
            Browse Medicines
          </button>
        </Container>
        <Footer />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-main)]">
        <Navbar />
        <Container className="py-20">
          <div className="max-w-lg mx-auto bg-white rounded-3xl border border-[var(--color-border)] p-10 text-center shadow-xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-11 h-11 text-[var(--color-success)]" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-text-dark)] mb-2">Order Placed!</h2>
            <p className="text-[var(--color-text-secondary)] mb-6">Your medicines will be delivered within 24–48 hours.</p>
            <div className="bg-[var(--color-bg-section)] rounded-2xl p-4 text-left mb-6 space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">Items</span>
                <span className="font-semibold text-[var(--color-text-dark)]">{cartItems.length} medicines</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">Delivery to</span>
                <span className="font-semibold text-[var(--color-text-dark)]">{ADDRESSES.find((a) => a.id === selectedAddress)?.label}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-[var(--color-border)] pt-2 mt-2">
                <span className="font-bold text-[var(--color-text-dark)]">Total Paid</span>
                <span className="font-bold text-[var(--color-primary)]">₹{total}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => navigate('/orders')} className="flex-1 border border-[var(--color-border)] text-[var(--color-text-dark)] font-semibold py-3 rounded-xl hover:bg-gray-50 text-sm">
                My Orders
              </button>
              <button onClick={() => navigate('/')} className="flex-1 bg-[var(--color-primary)] text-white font-semibold py-3 rounded-xl text-sm">
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

        {/* Header */}
        <div className="mb-6">
          <button onClick={() => navigate('/medicines')} className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline mb-3">
            <ArrowLeft className="w-4 h-4" /> Back to Medicines
          </button>
          <h1 className="text-2xl font-bold text-[var(--color-text-dark)] flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-[var(--color-primary)]" /> My Cart
            <span className="text-base font-normal text-[var(--color-text-secondary)]">({cartItems.length} items)</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-7">

          {/* ── Left ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Cart Items */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-2 md:p-4">
              <h3 className="font-bold text-[var(--color-text-dark)] mb-5">Cart Items</h3>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-[var(--color-border)] last:border-0 last:pb-0">
                    <img
                      src={item.image || 'https://placehold.co/64x64?text=Rx'}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[var(--color-border)]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-[var(--color-text-dark)] leading-snug mb-0.5">{item.name}</p>
                      <p className="text-xs text-[var(--color-text-secondary)] mb-2 capitalize">{item.type.replace('_', ' ')}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-[var(--color-text-dark)]">₹{item.price}</span>
                        {item.discount > 0 && (
                          <span className="text-xs font-semibold text-[var(--color-success)] bg-green-50 px-2 py-0.5 rounded-full">{Math.round(item.discount)}% OFF</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-3 shrink-0">
                      <div className="flex items-center border border-[var(--color-primary)] rounded-xl overflow-hidden">
                        <button onClick={() => removeFromCart(item.item_id)} className="px-3 py-2 cursor-pointer text-[var(--color-primary)] hover:bg-blue-50 transition-colors">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 font-bold text-sm text-[var(--color-text-dark)]">{item.qty}</span>
                        <button onClick={() => addToCart({ id: item.item_id, type: item.type }, item.type)} className="px-3 py-2 cursor-pointer text-[var(--color-primary)] hover:bg-blue-50 transition-colors">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.item_id)} className="w-8 h-8 cursor-pointer rounded-xl hover:bg-red-50 flex items-center justify-center transition-colors">
                        <Trash2 className="w-4 h-4 text-[var(--color-text-secondary)] hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prescription Upload */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
              <h3 className="font-bold text-[var(--color-text-dark)] mb-1 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[var(--color-primary)]" />
                Upload Prescriptions
                <span className="text-xs font-normal text-[var(--color-text-secondary)]">(Optional)</span>
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] mb-4">Upload prescriptions for all medicines at once — PDF, JPG, PNG supported</p>

              <div
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); handleFileUpload({ target: { files: e.dataTransfer.files }, value: '' }); }}
                className="border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-primary)] rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer transition-all hover:bg-blue-50 group"
              >
                <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors">
                  <Upload className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <p className="text-sm font-semibold text-[var(--color-text-dark)]">Click or drag files here</p>
                <p className="text-xs text-[var(--color-text-secondary)]">Upload multiple prescriptions at once • Max 10MB per file</p>
              </div>
              <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf" className="hidden" onChange={handleFileUpload} />

              {prescriptions.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {prescriptions.map((p) => (
                    <li key={p.id} className="flex items-center gap-3 p-3 bg-[var(--color-bg-section)] rounded-xl border border-[var(--color-border)]">
                      {p.type === 'image' && p.preview
                        ? <img src={p.preview} alt={p.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                        : <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 text-red-400" />
                          </div>
                      }
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--color-text-dark)] truncate">{p.name}</p>
                        <p className="text-xs text-[var(--color-text-secondary)]">{p.size}</p>
                      </div>
                      <button onClick={() => removePrescription(p.id)} className="w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors shrink-0">
                        <X className="w-4 h-4 text-[var(--color-text-secondary)] hover:text-red-500" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
              <h3 className="font-bold text-[var(--color-text-dark)] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
                Delivery Address
              </h3>
              <div className="space-y-3">
                {ADDRESSES.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr.id)}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                      ${selectedAddress === addr.id ? 'border-[var(--color-primary)] bg-blue-50' : 'border-[var(--color-border)] hover:border-blue-200'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5
                      ${selectedAddress === addr.id ? 'border-[var(--color-primary)] bg-[var(--color-primary)]' : 'border-[var(--color-border)]'}`}>
                      {selectedAddress === addr.id && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[var(--color-text-dark)] mb-0.5">{addr.label}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">{addr.address}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-primary)] text-sm font-semibold text-[var(--color-primary)] py-3 rounded-xl transition-all hover:bg-blue-50"
                onClick={()=>navigate("/address")}
                >
                  + Add New Address
                </button>
              </div>
            </div>
          </div>

          {/* ── Right — Order Summary ── */}
          <div>
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 sticky top-24 space-y-4">
              <h3 className="font-bold text-[var(--color-text-dark)]">Order Summary</h3>

              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Delivery Fee</span>
                  {deliveryFee === 0
                    ? <span className="font-medium text-[var(--color-success)]">FREE</span>
                    : <span className="font-medium">₹{deliveryFee}</span>
                  }
                </div>
                <div className="flex justify-between text-sm text-[var(--color-success)]">
                  <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> Total Savings</span>
                  <span className="font-semibold">-₹{savings}</span>
                </div>
              </div>

              {deliveryFee > 0 && (
                <p className="text-xs text-[var(--color-text-secondary)] bg-yellow-50 border border-yellow-100 rounded-xl px-3 py-2">
                  Add ₹{499 - totalAmount} more for <span className="font-semibold text-yellow-700">FREE delivery</span>
                </p>
              )}

              <div className="flex justify-between font-bold pt-3 border-t border-[var(--color-border)]">
                <span className="text-[var(--color-text-dark)]">Total Amount</span>
                <span className="text-xl text-[var(--color-text-dark)]">₹{total}</span>
              </div>

              {/* Note */}
              <div>
                <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">Delivery Note (Optional)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Please deliver before 4pm"
                  rows={2}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
                />
              </div>

              {orderError && (
                <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-xl px-3 py-2">{orderError}</p>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-60 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-100 text-sm"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>

              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-success)]" /> Secure Payment
                </div>
                <div className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-success)]" /> Genuine Medicines
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
