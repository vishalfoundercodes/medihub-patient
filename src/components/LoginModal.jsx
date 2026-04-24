import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Phone, Shield, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api, { apis } from '../utlities/api';

const STEPS = { PHONE: 'phone', OTP: 'otp', SUCCESS: 'success' };

export default function LoginModal() {
  const { setShowLogin, login } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(STEPS.PHONE);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const otpRefs = useRef([]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleSendOtp = async () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await api.post(apis.sendOtp, { mobile: phone });
      if (res.data.success) {
        setStep(STEPS.OTP);
        setResendTimer(30);
      } else {
        setError(res.data.message || 'Failed to send OTP. Try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    setError('');
    setOtpVerified(false);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      otpRefs.current[5]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const entered = otp.join('');
    if (entered.length < 6) { setError('Please enter the 6-digit OTP'); return; }
    setLoading(true);
    try {
      const res = await api.post(apis.verifyOtp, { mobile: phone, otp: entered });
      if (res.data.success) {
        const { token, isNewUser, user } = res.data.data;
        if (isNewUser) {
          setShowLogin(false);
          navigate('/register', { state: { phone, token } });
        } else {
          setOtpVerified(true);
          setError('');
          setStep(STEPS.SUCCESS);
          setTimeout(() => login(user, token), 1200);
        }
      } else {
        setError(res.data.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setOtp(['', '', '', '', '', '']);
    setOtpVerified(false);
    setError('');
    setResendTimer(30);
    otpRefs.current[0]?.focus();
    try {
      await api.post(apis.sendOtp, { mobile: phone });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLogin(false)} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] px-8 pt-8 pb-10">
          <button
            onClick={() => setShowLogin(false)}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 cursor-pointer hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              {step === STEPS.SUCCESS ? <CheckCircle className="w-6 h-6 text-white" />
                : step === STEPS.OTP ? <Shield className="w-6 h-6 text-white" />
                : <Phone className="w-6 h-6 text-white" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {step === STEPS.SUCCESS ? 'Welcome Back!' : step === STEPS.OTP ? 'Verify OTP' : 'Login / Register'}
              </h2>
              <p className="text-blue-100 text-xs">
                {step === STEPS.SUCCESS ? 'You are successfully logged in'
                  : step === STEPS.OTP ? `OTP sent to +91 ${phone}`
                  : 'Enter your mobile number to continue'}
              </p>
            </div>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 -mt-4 mb-2 relative z-10">
          {[STEPS.PHONE, STEPS.OTP, STEPS.SUCCESS].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
                ${step === s || (step === STEPS.SUCCESS && i < 3) || (step === STEPS.OTP && i === 0)
                  ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                  : 'bg-white border-gray-200 text-gray-400'}`}>
                {i + 1}
              </div>
              {i < 2 && (
                <div className={`w-8 h-0.5 ${step !== STEPS.PHONE && i === 0 ? 'bg-[var(--color-primary)]' : step === STEPS.SUCCESS && i === 1 ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="px-4 md:px-8 pb-8 pt-4">
          {/* STEP 1: Phone */}
          {step === STEPS.PHONE && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">Mobile Number</label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 border border-[var(--color-border)] rounded-xl px-3 bg-gray-50 shrink-0">
                    <span className="text-sm font-semibold text-[var(--color-text-dark)]">🇮🇳 +91</span>
                  </div>
                  <input
                    type="tel" maxLength={10} value={phone}
                    onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '')); setError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendOtp()}
                    placeholder="Enter 10-digit number"
                    className="flex-1 border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white"
                    autoFocus
                  />
                </div>
                {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
              </div>
              <p className="text-xs text-[var(--color-text-secondary)]">
                By continuing, you agree to our <a href="#" className="text-[var(--color-primary)] hover:underline">Terms of Service</a> and <a href="#" className="text-[var(--color-primary)] hover:underline">Privacy Policy</a>
              </p>
              <button
                onClick={handleSendOtp}
                disabled={loading || phone.length !== 10}
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Phone className="w-4 h-4" />}
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </div>
          )}

          {/* STEP 2: OTP */}
          {step === STEPS.OTP && (
            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-3 block">Enter 6-digit OTP</label>
                <div className="flex gap-2 justify-between" onPaste={handleOtpPaste}>
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpRefs.current[idx] = el)}
                      type="text" inputMode="numeric" maxLength={1} value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, idx)}
                      onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                      className={`w-10 h-10 md:w-12 md:h-12 text-center text-lg font-bold border-2 rounded-xl focus:outline-none transition-all
                        ${otpVerified ? 'border-[var(--color-success)] bg-green-50 text-[var(--color-success)]'
                          : digit ? 'border-[var(--color-primary)] bg-blue-50 text-[var(--color-primary)]'
                          : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'}`}
                    />
                  ))}
                </div>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                {otpVerified && (
                  <p className="text-[var(--color-success)] text-xs mt-2 flex items-center gap-1 font-medium">
                    <CheckCircle className="w-3.5 h-3.5" /> OTP verified successfully!
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-xs">
                <button
                  onClick={() => { setStep(STEPS.PHONE); setOtp(['', '', '', '', '', '']); setOtpVerified(false); setError(''); }}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] cursor-pointer"
                >
                  ← Change number
                </button>
                {resendTimer > 0
                  ? <span className="text-[var(--color-text-secondary)]">Resend in {resendTimer}s</span>
                  : <button onClick={handleResend} className="text-[var(--color-primary)] cursor-pointer font-semibold hover:underline">Resend OTP</button>
                }
              </div>

              {!otpVerified && (
                <button
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.join('').length < 6}
                  className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              )}
            </div>
          )}

          {/* STEP 3: Success */}
          {step === STEPS.SUCCESS && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-9 h-9 text-[var(--color-success)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-dark)] mb-1">Login Successful!</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Redirecting you to your dashboard...</p>
              <div className="mt-4 flex justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-[var(--color-primary)]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
