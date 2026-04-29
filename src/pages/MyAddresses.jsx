import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Pencil, Trash2, Home, Briefcase, CheckCircle, X, Save, Loader2, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import AccountSidebar from '../components/account/AccountSidebar';
import { useAuth } from '../context/AuthContext';
import api, { apis } from '../utlities/api';

const EMPTY_FORM = { label: 'Home', name: '', phone: '', line1: '', city: '', state: '', pincode: '' };

export default function MyAddresses() {
  const { user, setShowLogin } = useAuth();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await api.get(apis.getAddress);
      if (res.data.success) setAddresses(res.data.data.addresses);
    } catch (err) {
      console.error('Failed to fetch addresses:', err);
    } finally {
      setPageLoading(false);
    }
  };

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

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    const body = {
      name: form.name,
      mobile: form.phone,
      address_line: form.line1,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      label: form.label.toLowerCase(),
      is_default: editId ? (addresses.find((a) => a.id === editId)?.is_default ?? 0) : (addresses.length === 0 ? 1 : 0),
    };
    try {
      if (editId) {
        const res = await api.put(`${apis.editAddress}/${editId}`, body);
        showToast(res.data.data.message);
      } else {
        await api.post(apis.addAddress, body);
        showToast('Address added successfully!');
      }
      await fetchAddresses();
      handleCancel();
    } catch (err) {
      setErrors((p) => ({ ...p, submit: err?.response?.data?.message || 'Failed to save address.' }));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (addr) => {
    setForm({
      label: addr.label.charAt(0).toUpperCase() + addr.label.slice(1),
      name: addr.name,
      phone: addr.mobile,
      line1: addr.address_line,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
    });
    setEditId(addr.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`${apis.updateAddress}/${id}`);
      setAddresses((p) => p.filter((a) => a.id !== id));
      showToast(res.data.data.message);
      await fetchAddresses();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleSetDefault = async (addr) => {
    try {
      const res = await api.put(`${apis.updateAddress}/${addr.id}`, {
        name: addr.name,
        mobile: addr.mobile,
        address_line: addr.address_line,
        city: addr.city,
        state: addr.state,
        pincode: addr.pincode,
        label: addr.label,
        is_default: 1,
      });
      showToast(res.data.data.message);
      await fetchAddresses();
    } catch (err) {
      console.error('Set default failed:', err);
    }
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

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-white border border-green-200 shadow-xl rounded-2xl px-5 py-3.5 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
          <p className="text-sm font-semibold text-[var(--color-text-dark)]">{toast}</p>
        </div>
      )}
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
                    disabled={saving}
                    className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {editId ? 'Update Address' : 'Save Address'}
                  </button>
                  <button onClick={handleCancel} className="border border-[var(--color-border)] text-[var(--color-text-secondary)] font-semibold px-6 py-3 rounded-xl text-sm hover:bg-gray-50 transition-all">
                    Cancel
                  </button>
                </div>
                {errors.submit && <p className="text-red-500 text-xs mt-2">{errors.submit}</p>}
              </div>
            )}

            {/* Address list */}
            {pageLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
              </div>
            ) : addresses.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-5">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`bg-white rounded-2xl border p-5 transition-all ${addr.is_default ? 'border-[var(--color-primary)] shadow-md shadow-blue-50' : 'border-[var(--color-border)] hover:border-blue-200 hover:shadow-sm'}`}
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${addr.is_default ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-bg-section)]'}`}>
                          {addr.label === 'home'
                            ? <Home className={`w-4 h-4 ${addr.is_default ? 'text-white' : 'text-[var(--color-text-secondary)]'}`} />
                            : addr.label === 'office'
                              ? <Briefcase className={`w-4 h-4 ${addr.is_default ? 'text-white' : 'text-[var(--color-text-secondary)]'}`} />
                              : <MapPin className={`w-4 h-4 ${addr.is_default ? 'text-white' : 'text-[var(--color-text-secondary)]'}`} />
                          }
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[var(--color-text-dark)] capitalize">{addr.label}</p>
                          {addr.is_default === 1 && (
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
                    <p className="text-xs text-[var(--color-text-secondary)] mb-0.5">{addr.mobile}</p>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {addr.address_line}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>

                    {/* Set default */}
                    {addr.is_default !== 1 && (
                      <button
                        onClick={() => handleSetDefault(addr)}
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
