import { useState } from 'react';
import { MapPin, Plus, Pencil, Trash2, Home, Briefcase, MoreHorizontal, X, Check } from 'lucide-react';

const TYPE_ICONS = { Home, Work: Briefcase, Other: MoreHorizontal };

const INITIAL_ADDRESSES = [
  { id: 1, type: 'Home', name: 'Rahul Sharma', phone: '9876543210', line1: '12, Sector 15', line2: 'Rohini', city: 'New Delhi', state: 'Delhi', pincode: '110085', isDefault: true },
  { id: 2, type: 'Work', name: 'Rahul Sharma', phone: '9876543210', line1: '4th Floor, Tower B, Cyber City', line2: '', city: 'Gurugram', state: 'Haryana', pincode: '122002', isDefault: false },
];

const EMPTY_FORM = { type: 'Home', name: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '' };

export default function MyAddresses() {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [modal, setModal] = useState(null); // null | { mode: 'add'|'edit'|'view', data }
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const openAdd = () => { setForm(EMPTY_FORM); setErrors({}); setModal({ mode: 'add' }); };
  const openEdit = (addr) => { setForm({ ...addr }); setErrors({}); setModal({ mode: 'edit', id: addr.id }); };
  const openView = (addr) => setModal({ mode: 'view', data: addr });
  const closeModal = () => setModal(null);

  const set = (k, v) => { setForm((p) => ({ ...p, [k]: v })); setErrors((p) => ({ ...p, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Valid 10-digit number required';
    if (!form.line1.trim()) e.line1 = 'Address line 1 is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.state.trim()) e.state = 'State is required';
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Valid 6-digit pincode required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (modal.mode === 'add') {
      setAddresses((prev) => [...prev, { ...form, id: Date.now(), isDefault: prev.length === 0 }]);
    } else {
      setAddresses((prev) => prev.map((a) => a.id === modal.id ? { ...form, id: modal.id, isDefault: a.isDefault } : a));
    }
    closeModal();
  };

  const handleDelete = (id) => setAddresses((prev) => prev.filter((a) => a.id !== id));

  const setDefault = (id) => setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">My Addresses</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{addresses.length} saved address{addresses.length !== 1 ? 'es' : ''}</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
        >
          <Plus className="w-4 h-4" /> Add Address
        </button>
      </div>

      {/* Address Cards */}
      {addresses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-12 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
          <h3 className="font-bold text-[var(--color-text-dark)] mb-2">No addresses saved</h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-5">Add a delivery address to get started</p>
          <button onClick={openAdd} className="flex items-center gap-2 bg-[var(--color-primary)] text-white text-sm font-semibold px-5 py-2.5 rounded-xl">
            <Plus className="w-4 h-4" /> Add Address
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {addresses.map((addr) => {
            const Icon = TYPE_ICONS[addr.type] || MoreHorizontal;
            return (
              <div key={addr.id} className={`bg-white rounded-2xl border-2 p-5 transition-all ${addr.isDefault ? 'border-[var(--color-primary)]' : 'border-[var(--color-border)]'}`}>
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[var(--color-primary)]" />
                    </div>
                    <span className="font-bold text-sm text-[var(--color-text-dark)]">{addr.type}</span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-bold text-[var(--color-primary)] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">Default</span>
                    )}
                  </div>
                </div>

                {/* Address details */}
                <p className="text-sm font-semibold text-[var(--color-text-dark)] mb-0.5">{addr.name}</p>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-0.5">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">{addr.city}, {addr.state} - {addr.pincode}</p>
                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">📞 +91 {addr.phone}</p>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[var(--color-border)]">
                  <button onClick={() => openView(addr)} className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all">
                    <MapPin className="w-3.5 h-3.5" /> View
                  </button>
                  <button onClick={() => openEdit(addr)} className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  {!addr.isDefault && (
                    <button onClick={() => setDefault(addr.id)} className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all">
                      <Check className="w-3.5 h-3.5" /> Set Default
                    </button>
                  )}
                  <button onClick={() => handleDelete(addr.id)} className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            );
          })}

          {/* Add new card */}
          <button
            onClick={openAdd}
            className="bg-white rounded-2xl border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-primary)] p-5 flex flex-col items-center justify-center gap-2 transition-all hover:bg-blue-50 min-h-[180px] group"
          >
            <div className="w-10 h-10 bg-blue-50 group-hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors">
              <Plus className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <p className="text-sm font-semibold text-[var(--color-primary)]">Add New Address</p>
          </button>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl border border-[var(--color-border)] w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto hide-scrollbar">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
              <h3 className="font-bold text-[var(--color-text-dark)]">
                {modal.mode === 'add' ? 'Add New Address' : modal.mode === 'edit' ? 'Edit Address' : 'Address Details'}
              </h3>
              <button onClick={closeModal} className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-[var(--color-text-secondary)]" />
              </button>
            </div>

            <div className="p-5">
              {/* View Mode */}
              {modal.mode === 'view' ? (
                <div className="space-y-3">
                  {[
                    ['Type', modal.data.type],
                    ['Full Name', modal.data.name],
                    ['Phone', `+91 ${modal.data.phone}`],
                    ['Address Line 1', modal.data.line1],
                    ...(modal.data.line2 ? [['Address Line 2', modal.data.line2]] : []),
                    ['City', modal.data.city],
                    ['State', modal.data.state],
                    ['Pincode', modal.data.pincode],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between text-sm py-2 border-b border-[var(--color-border)] last:border-0">
                      <span className="text-[var(--color-text-secondary)]">{label}</span>
                      <span className="font-semibold text-[var(--color-text-dark)]">{value}</span>
                    </div>
                  ))}
                  <button onClick={closeModal} className="w-full mt-2 bg-[var(--color-primary)] text-white font-semibold py-3 rounded-xl text-sm">
                    Close
                  </button>
                </div>
              ) : (
                /* Add / Edit Form */
                <div className="space-y-4">
                  {/* Type */}
                  <div>
                    <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">Address Type</label>
                    <div className="flex gap-2">
                      {['Home', 'Work', 'Other'].map((t) => (
                        <button
                          key={t}
                          onClick={() => set('type', t)}
                          className={`flex-1 py-2 rounded-xl border text-sm font-semibold transition-all
                            ${form.type === t ? 'border-[var(--color-primary)] bg-blue-50 text-[var(--color-primary)]' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-blue-200'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Full Name *" error={errors.name}>
                      <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Enter full name" className={input(errors.name)} />
                    </Field>
                    <Field label="Phone Number *" error={errors.phone}>
                      <input value={form.phone} onChange={(e) => set('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10-digit number" className={input(errors.phone)} />
                    </Field>
                  </div>

                  <Field label="Address Line 1 *" error={errors.line1}>
                    <input value={form.line1} onChange={(e) => set('line1', e.target.value)} placeholder="House no., Street, Area" className={input(errors.line1)} />
                  </Field>

                  <Field label="Address Line 2" error={errors.line2}>
                    <input value={form.line2} onChange={(e) => set('line2', e.target.value)} placeholder="Landmark, Colony (optional)" className={input(errors.line2)} />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="City *" error={errors.city}>
                      <input value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="City" className={input(errors.city)} />
                    </Field>
                    <Field label="State *" error={errors.state}>
                      <input value={form.state} onChange={(e) => set('state', e.target.value)} placeholder="State" className={input(errors.state)} />
                    </Field>
                  </div>

                  <Field label="Pincode *" error={errors.pincode}>
                    <input value={form.pincode} onChange={(e) => set('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="6-digit pincode" className={input(errors.pincode)} />
                  </Field>

                  <div className="flex gap-3 pt-2">
                    <button onClick={closeModal} className="flex-1 border border-[var(--color-border)] text-[var(--color-text-dark)] font-semibold py-3 rounded-xl text-sm hover:bg-gray-50 transition-all">
                      Cancel
                    </button>
                    <button onClick={handleSave} className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold py-3 rounded-xl text-sm transition-all">
                      {modal.mode === 'add' ? 'Save Address' : 'Update Address'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-1.5 block">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function input(error) {
  return `w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${error ? 'border-red-400' : 'border-[var(--color-border)]'}`;
}
