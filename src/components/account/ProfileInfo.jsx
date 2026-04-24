import { useState, useRef } from 'react';
import { User, Mail, Phone, Calendar, Users, Droplets, Pencil, Check, X, Upload, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api, { apis } from '../../utlities/api';

const Field = ({ icon: Icon, label, value }) => (
  <div className="flex items-center py-3.5 border-b border-[var(--color-border)] last:border-0">
    <div className="flex items-center gap-3 w-44 shrink-0">
      <Icon className="w-4 h-4 text-[var(--color-text-secondary)]" />
      <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
    </div>
    <span className="text-sm font-medium text-[var(--color-text-dark)]">{value || '—'}</span>
  </div>
);

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function ProfileInfo() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [profileImgFile, setProfileImgFile] = useState(null);
  const [profileImgPreview, setProfileImgPreview] = useState(null);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    dob: user?.dob || '',
    gender: user?.gender || '',
    blood_group: user?.blood_group || '',
  });

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImgFile(file);
    setProfileImgPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setLoading(true);
    setApiError('');
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('dob', form.dob);
      formData.append('gender', form.gender);
      formData.append('blood_group', form.blood_group);
      if (profileImgFile) {
        formData.append('profile_img', profileImgFile);
      }

      const res = await api.put(apis.profileUpdate, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        updateUser(res.data.data.user);
        setEditing(false);
        setProfileImgFile(null);
        setProfileImgPreview(null);
      } else {
        setApiError(res.data.message || 'Failed to update profile.');
      }
    } catch (err) {
      setApiError(err.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setApiError('');
    setProfileImgFile(null);
    setProfileImgPreview(null);
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      dob: user?.dob || '',
      gender: user?.gender || '',
      blood_group: user?.blood_group || '',
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-3">
      <div className="flex items-center justify-between mb-1 p-1">
        <h3 className="font-bold text-[var(--color-text-dark)]">Profile Information</h3>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 cursor-pointer text-sm font-semibold text-[var(--color-primary)] border border-[var(--color-primary)] px-4 py-1.5 rounded-xl hover:bg-blue-50 transition-all"
          >
            <Pencil className="w-3.5 h-3.5" /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-white bg-[var(--color-primary)] px-4 py-1.5 rounded-xl hover:bg-[var(--color-primary-dark)] disabled:opacity-60 transition-all"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex items-center cursor-pointer gap-1.5 text-sm font-semibold text-[var(--color-text-secondary)] border border-[var(--color-border)] px-4 py-1.5 rounded-xl hover:bg-gray-50 transition-all"
            >
              <X className="w-3.5 h-3.5" /> Cancel
            </button>
          </div>
        )}
      </div>

      {/* API error */}
      {apiError && (
        <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-3">{apiError}</p>
      )}

      {!editing ? (
        <div>
          <Field icon={User}     label="Full Name"      value={user?.name} />
          <Field icon={Mail}     label="Email Address"  value={user?.email} />
          <Field icon={Phone}    label="Phone Number"   value={user?.mobile ? `+91 ${user.mobile}` : ''} />
          <Field icon={Calendar} label="Date of Birth"  value={user?.dob} />
          <Field icon={Users}    label="Gender"         value={user?.gender} />
          <Field icon={Droplets} label="Blood Group"    value={user?.blood_group} />
        </div>
      ) : (
        <div className="space-y-4">

          {/* Profile Image Upload */}
          <div>
            <label className="text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 block">Profile Photo</label>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-[var(--color-bg-section)] border border-[var(--color-border)] shrink-0">
                {profileImgPreview || user?.profile_img
                  ? <img src={profileImgPreview || user.profile_img} alt="profile" className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center"><User className="w-6 h-6 text-[var(--color-text-secondary)]" /></div>
                }
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] border border-[var(--color-primary)] px-4 py-2 rounded-xl hover:bg-blue-50 transition-all"
              >
                <Upload className="w-3.5 h-3.5" /> Upload Photo
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImgChange} />
            </div>
          </div>

          {/* Name */}
          <EditField icon={User} label="Full Name" value={form.name} onChange={(v) => setForm((p) => ({ ...p, name: v }))} />

          {/* Email */}
          <EditField icon={Mail} label="Email Address" type="email" value={form.email} onChange={(v) => setForm((p) => ({ ...p, email: v }))} />

          {/* DOB */}
          <EditField icon={Calendar} label="Date of Birth" type="date" value={form.dob} onChange={(v) => setForm((p) => ({ ...p, dob: v }))} />

          {/* Gender */}
          <div>
            <label className="text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 block">Gender</label>
            <div className="flex gap-2">
              {['male', 'female', 'other'].map((g) => (
                <button
                  key={g} type="button"
                  onClick={() => setForm((p) => ({ ...p, gender: g }))}
                  className={`flex-1 py-2 rounded-xl border text-sm font-semibold capitalize transition-all
                    ${form.gender === g ? 'border-[var(--color-primary)] bg-blue-50 text-[var(--color-primary)]' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-blue-200'}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Blood Group */}
          <div>
            <label className="text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 block">Blood Group</label>
            <div className="flex flex-wrap gap-2">
              {BLOOD_GROUPS.map((bg) => (
                <button
                  key={bg} type="button"
                  onClick={() => setForm((p) => ({ ...p, blood_group: bg }))}
                  className={`px-3 py-1.5 rounded-xl border text-sm font-semibold transition-all
                    ${form.blood_group === bg ? 'border-[var(--color-primary)] bg-blue-50 text-[var(--color-primary)]' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-blue-200'}`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {/* Phone — read only */}
          <div>
            <label className="text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 block">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
              <input
                value={user?.mobile ? `+91 ${user.mobile}` : ''}
                readOnly
                className="w-full pl-10 pr-4 py-2.5 border border-[var(--color-border)] rounded-xl text-sm bg-gray-50 text-[var(--color-text-secondary)] cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EditField({ icon: Icon, label, value, onChange, type = 'text', placeholder }) {
  return (
    <div>
      <label className="text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 block">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
        <input
          type={type} value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </div>
    </div>
  );
}
