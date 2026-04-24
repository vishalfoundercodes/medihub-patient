import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Phone, Mail, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import api, { apis } from '../utlities/api';

export default function Register() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const token = state?.token || '';

  const [form, setForm] = useState({ name: '', email: '', gender: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.gender) e.gender = 'Please select gender';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: '' }));
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await api.post(apis.register,
        { name: form.name, email: form.email, gender: form.gender },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setSuccess(true);
        setTimeout(() => {
          login(res.data.data.user, token);
          navigate('/');
        }, 1500);
      } else {
        setErrors({ name: res.data.message || 'Registration failed. Please try again.' });
      }
    } catch (err) {
      setErrors({ name: err.response?.data?.message || 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </button>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] px-8 py-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Create Account</h1>
                  <p className="text-blue-100 text-xs">Join MediHub for better healthcare</p>
                </div>
              </div>
            </div>

            <div className="px-8 py-8">
              {!success ? (
                <div className="space-y-5">

                  {/* Phone — display only */}
                  {state?.phone && (
                    <div>
                      <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">Mobile Number</label>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-2 border border-[var(--color-border)] rounded-xl px-3 bg-gray-50 shrink-0">
                          <span className="text-sm font-semibold text-[var(--color-text-dark)]">🇮🇳 +91</span>
                        </div>
                        <div className="flex-1 flex items-center gap-2 px-4 py-3 border border-blue-200 rounded-xl bg-blue-50">
                          <Phone className="w-4 h-4 text-[var(--color-primary)]" />
                          <span className="text-sm font-medium text-[var(--color-primary)]">{state.phone}</span>
                          <CheckCircle className="w-3.5 h-3.5 text-[var(--color-success)] ml-auto" />
                        </div>
                      </div>
                      <p className="text-xs text-[var(--color-success)] mt-1 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> OTP verified number
                      </p>
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
                      <input
                        type="text" value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Enter your full name" autoFocus
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white ${errors.name ? 'border-red-400' : 'border-[var(--color-border)]'}`}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
                      <input
                        type="email" value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="Enter your email"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white ${errors.email ? 'border-red-400' : 'border-[var(--color-border)]'}`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">Gender</label>
                    <div className="flex gap-2">
                      {['male', 'female', 'other'].map((g) => (
                        <button
                          key={g} onClick={() => handleChange('gender', g)}
                          className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold capitalize transition-all
                            ${form.gender === g ? 'border-[var(--color-primary)] bg-blue-50 text-[var(--color-primary)]' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-blue-200'}`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                  </div>

                  <p className="text-xs text-[var(--color-text-secondary)]">
                    By registering, you agree to our <a href="#" className="text-[var(--color-primary)] hover:underline">Terms of Service</a> and <a href="#" className="text-[var(--color-primary)] hover:underline">Privacy Policy</a>
                  </p>

                  <button
                    onClick={handleRegister} disabled={loading}
                    className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-100 cursor-pointer"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <User className="w-4 h-4" />}
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-9 h-9 text-[var(--color-success)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-text-dark)] mb-1">Account Created!</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    Welcome to MediHub, <span className="font-semibold text-[var(--color-text-dark)]">{form.name}</span>!
                  </p>
                  <div className="flex justify-center">
                    <Loader2 className="w-5 h-5 animate-spin text-[var(--color-primary)]" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
