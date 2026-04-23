import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Pencil, Trash2, Home, Briefcase, CheckCircle, X, Save } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import AccountSidebar from '../components/account/AccountSidebar';
import { useAuth } from '../context/AuthContext';

const DEFAULT_ADDRESSES = [
  {
    id: 1, label: 'Home', icon: 'home',
    name: 'Rahul Kumar', phone: '+91 98765 43210',
    line1: 'A-45, 2nd Floor, Green Park Extension',
    city: 'New Delhi', state: 'Delhi', pincode: '110016',
    default: true,
  },
  {
    id: 2, label: 'Office', icon: 'office',
    name: 'Rahul Kumar', phone: '+91 98765 43210',
    line1: 'B-12, Connaught Place',
    city: 'New Delhi', state: 'Delhi', pincode: '110001',
    default: false,
  },
];

const EMPTY_FORM = { label: 'Home', name: '', phone: '', line1: '', city: '', state: '', pincode: '' };

export default function MyAddresses() {
  const { user, setShowLogin } = useAuth();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState(DEFAULT_ADDRESSES);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) { setShowLogin(true); navigate('/'); }
  }, [user]);

  if (!user) return null;

  const set = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.line1.trim()) e.line1 = 'Address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.state.trim()) e.state = 'State is required';
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Valid 6-digit pincode required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (editId) {
      setAddresses((p) => p.map((a) => a.id === editId ? { ...a, ...form } : a));
    } else {
      setAddresses((p) => [...p, { ...form, id: Date.now(), default: p.length === 0 }]);
    }
    setShowForm(false);
    setEditId(null);
    setForm(EMPTY_FORM);
  };

  const handleEdit = (addr) => {
    setForm({ label: addr.label, name: addr.name, phone: addr.phone, line1: addr.line1, city: addr.city, state: addr.state, pincode: addr.pincode });
    setEditId(addr.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setAddresses((p) => p.filter((a) => a.id !== id));
  };

  const handleSetDefault = (id) => {
    setAddresses((p) => p.map((a) => ({ ...a, default: a.id === id })));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setForm(EMPTY_FORM);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <Container className="py-8">
        <div className="flex gap-7 items-start">

          {/* Sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <AccountSidebar active="addresses" onChange={() => {}} />
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">My Addresses</h1>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">Manage your saved delivery addresses</p>
              </div>
              {!showForm && (
                <button
                  onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY_FORM); }}
                  className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-blue-100"
                >
                  <Plus className="w-4 h-4" /> Add New Address
                </button>
              )}
            </div>

            {/* Add / Edit Form */}
            {showForm && (
              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-[var(--color-text-dark)]">
                    {editId ? 'Edit Address' : 'Add New Address'}
                  </h3>
                  <button onClick={handleCancel} className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-dark)]">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Label tabs */}
                <div className="flex gap-2 mb-5">
                  {['Home', 'Office', 'Other'].map((lbl) => (
                    <button
                      key={lbl}
                      onClick={() => set('label', lbl)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium transition-all
                        ${form.label === lbl
                          ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                          : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)]'
                        }`}
                    >
                      {lbl === 'Home' ? <Home className="w-3.5 h-3.5" /> : lbl === 'Office' ? <Briefcase className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                      {lbl}
                    </button>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { key: 'name', label: 'Full Name *', placeholder: 'Enter full name', span: false },
                    { key: 'phone', label: 'Phone Number *', placeholder: '+91 XXXXXXXXXX', span: false },
                    { key: 'line1', label: 'Address Line *', placeholder: 'House no, Street, Area', span: true },
                    { key: 'city', label: 'City *', placeholder: 'Enter city', span: false },
                    { key: 'state', label: 'State *', placeholder: 'Enter state', span: false },
                    { key: 'pincode', label: 'Pincode *', placeholder: '6-digit pincode', span: false },
                  ].map(({ key, label, placeholder, span }) => (
                    <div key={key} className={span ? 'sm:col-span-2' : ''}>
                      <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">{label}</label>
                      <input
                        type="text"
                        value={form[key]}
                        onChange={(e) => set(key, e.target.value)}
                        placeholder={placeholder}
                        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${errors[key] ? 'border-red-400' : 'border-[var(--color-border)]'}`}
                      />
                      {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all"
                  >
                    <Save className="w-4 h-4" /> {editId ? 'Update Address' : 'Save Address'}
                  </button>
                  <button onClick={handleCancel} className="border border-[var(--color-border)] text-[var(--color-text-secondary)] font-semibold px-6 py-3 rounded-xl text-sm hover:bg-gray-50 transition-all">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Address list */}
            {addresses.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-5">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`bg-white rounded-2xl border p-5 transition-all ${addr.default ? 'border-[var(--color-primary)] shadow-md shadow-blue-50' : 'border-[var(--color-border)] hover:border-blue-200 hover:shadow-sm'}`}
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${addr.default ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-bg-section)]'}`}>
                          {addr.label === 'Home'
                            ? <Home className={`w-4 h-4 ${addr.default ? 'text-white' : 'text-[var(--color-text-secondary)]'}`} />
                            : addr.label === 'Office'
                              ? <Briefcase className={`w-4 h-4 ${addr.default ? 'text-white' : 'text-[var(--color-text-secondary)]'}`} />
                              : <MapPin className={`w-4 h-4 ${addr.default ? 'text-white' : 'text-[var(--color-text-secondary)]'}`} />
                          }
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[var(--color-text-dark)]">{addr.label}</p>
                          {addr.default && (
                            <span className="text-[10px] font-bold text-[var(--color-primary)] bg-blue-50 px-2 py-0.5 rounded-full">Default</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleEdit(addr)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-all">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(addr.id)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-[var(--color-text-secondary)] hover:text-red-500 transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Address details */}
                    <p className="text-sm font-semibold text-[var(--color-text-dark)] mb-0.5">{addr.name}</p>
                    <p className="text-xs text-[var(--color-text-secondary)] mb-0.5">{addr.phone}</p>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {addr.line1}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>

                    {/* Set default */}
                    {!addr.default && (
                      <button
                        onClick={() => handleSetDefault(addr.id)}
                        className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:underline"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Set as Default
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-16 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-[var(--color-primary)]" />
                </div>
                <h3 className="font-bold text-[var(--color-text-dark)] mb-2">No addresses saved</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">Add your delivery address for faster checkout</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-[var(--color-primary)] text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-[var(--color-primary-dark)] transition-all"
                >
                  Add Address
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
