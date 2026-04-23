import { useState } from 'react';
import { User, Mail, Phone, Calendar, Users, Droplets, Pencil, Check, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Field = ({ icon: Icon, label, value }) => (
  <div className="flex items-center py-3.5 border-b border-[var(--color-border)] last:border-0">
    <div className="flex items-center gap-3 w-44 shrink-0">
      <Icon className="w-4 h-4 text-[var(--color-text-secondary)]" />
      <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
    </div>
    <span className="text-sm font-medium text-[var(--color-text-dark)]">{value || '—'}</span>
  </div>
);

export default function ProfileInfo() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    dob: user?.dob || '',
    gender: user?.gender || '',
    bloodGroup: user?.bloodGroup || '',
  });

  const handleSave = () => {
    updateUser(form);
    setEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-1">
      <div className="flex items-center justify-between mb-4 p-3">
        <h3 className="font-bold text-[var(--color-text-dark)]">Profile Information</h3>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] border border-[var(--color-primary)] px-4 py-1.5 rounded-xl hover:bg-blue-50 transition-all"
          >
            <Pencil className="w-3.5 h-3.5" /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleSave} className="flex items-center gap-1.5 text-sm font-semibold text-white bg-[var(--color-primary)] px-4 py-1.5 rounded-xl hover:bg-[var(--color-primary-dark)] transition-all">
              <Check className="w-3.5 h-3.5" /> Save
            </button>
            <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-text-secondary)] border border-[var(--color-border)] px-4 py-1.5 rounded-xl hover:bg-gray-50 transition-all">
              <X className="w-3.5 h-3.5" /> Cancel
            </button>
          </div>
        )}
      </div>

      {!editing ? (
        <div>
          <Field icon={User} label="Full Name" value={user?.name} />
          <Field icon={Mail} label="Email Address" value={user?.email} />
          <Field icon={Phone} label="Phone Number" value={`+91 ${user?.phone}`} />
          <Field icon={Calendar} label="Date of Birth" value={user?.dob} />
          <Field icon={Users} label="Gender" value={user?.gender} />
          <Field icon={Droplets} label="Blood Group" value={user?.bloodGroup} />
        </div>
      ) : (
        <div className="space-y-4">
          {[
            { key: 'name', label: 'Full Name', icon: User, type: 'text' },
            { key: 'email', label: 'Email Address', icon: Mail, type: 'email' },
            { key: 'dob', label: 'Date of Birth', icon: Calendar, type: 'text', placeholder: 'e.g. 15 March 1992' },
            { key: 'gender', label: 'Gender', icon: Users, type: 'text', placeholder: 'Male / Female / Other' },
            { key: 'bloodGroup', label: 'Blood Group', icon: Droplets, type: 'text', placeholder: 'e.g. B+' },
          ].map(({ key, label, icon: Icon, type, placeholder }) => (
            <div key={key}>
              <label className="text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 block">{label}</label>
              <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full pl-10 pr-4 py-2.5 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
            </div>
          ))}
          {/* Phone — read only */}
          <div>
            <label className="text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 block">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
              <input value={`+91 ${user?.phone}`} readOnly className="w-full pl-10 pr-4 py-2.5 border border-[var(--color-border)] rounded-xl text-sm bg-gray-50 text-[var(--color-text-secondary)] cursor-not-allowed" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
