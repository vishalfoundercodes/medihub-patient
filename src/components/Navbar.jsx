import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MapPin, Bell, ChevronDown, Menu, X, LogIn, User, LogOut } from 'lucide-react';
import medihubLogo from "../assets/medihubLogo.png";
import Container from './Container';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Tests', to: '/lab-tests' },
  { label: 'Medicines', to: '/medicines' },
  { label: 'Doctors', to: '/doctors' },
  // { label: 'Contact', to: '#' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, setShowLogin } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      {/* Top bar */}
      <div className="border-b border-[var(--color-border)]">
        <Container className="py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-blue-200">
              {/* <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-7 3a1 1 0 0 1 1 1v3h3a1 1 0 0 1 0 2h-3v3a1 1 0 0 1-2 0v-3H8a1 1 0 0 1 0-2h3V7a1 1 0 0 1 1-1z"/>
              </svg> */}
              <img src={medihubLogo} alt="" />
            </div>
            <div className="leading-tight">
              <span className="text-xl font-bold text-[var(--color-text-dark)] tracking-tight">
                Medi
              </span>
              <span className="text-xl font-bold text-[var(--color-primary)] tracking-tight">
                Hub1
              </span>
            </div>
          </a>

          {/* Nav Links — desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ label, to, badge }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5
                  ${isActive
                    ? 'text-[var(--color-primary)] bg-blue-50'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-dark)] hover:bg-gray-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {badge && (
                      <span className="bg-[var(--color-primary)] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none">
                        {badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[var(--color-primary)] rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Location */}
            <button className="hidden xl:flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-blue-50 transition-all group">
              <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
              <div className="text-left leading-tight">
                <p className="text-[10px] text-[var(--color-text-secondary)] font-medium">
                  Deliver to
                </p>
                <p className="text-xs font-semibold text-[var(--color-text-dark)] flex items-center gap-1">
                  New Delhi, 110001
                  <ChevronDown className="w-3 h-3 text-[var(--color-text-secondary)]" />
                </p>
              </div>
            </button>

            {/* Bell */}
            <button
              onClick={() => navigate('/notifications')}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-blue-50 transition-all">
              <Bell className="w-4.5 h-4.5 text-[var(--color-text-secondary)]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            {/* Login / User button */}
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => navigate('/account')}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 border border-blue-100 hover:border-[var(--color-primary)] transition-all"
                >
                  <div className="w-7 h-7 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-[var(--color-text-dark)]">Hi, {user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-[var(--color-text-secondary)]" />
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-red-500 px-3 py-2 rounded-xl hover:bg-red-50 transition-all"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="hidden md:flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-200 hover:shadow-blue-300"
              >
                <LogIn className="w-4 h-4" />
                Login / Register
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--color-border)] hover:bg-gray-50 transition-all"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </Container>
        </div>
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-[var(--color-border)] px-6 py-4">
          <div className="flex flex-col gap-1 mb-4">
            {navLinks.map(({ label, to, badge }) => (
              <NavLink
                key={label}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${isActive
                    ? 'bg-blue-50 text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-gray-50 hover:text-[var(--color-text-dark)]'
                  }`
                }
              >
                {label}
                {badge && (
                  <span className="bg-[var(--color-primary)] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-[var(--color-border)]">
            <button className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
              New Delhi, 110001
            </button>
            <button
              onClick={() => user ? logout() : setShowLogin(true)}
              className="ml-auto flex items-center gap-2 bg-[var(--color-primary)] text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
            >
              <LogIn className="w-4 h-4" />
              {user ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
