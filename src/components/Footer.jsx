import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import medihubLogo from "../assets/medihubLogo.png";
import Container from './Container';

const QUICK_LINKS = [
  { label: 'Home',      to: '/'          },
  { label: 'Tests',     to: '/lab-tests' },
  { label: 'Medicines', to: '/medicines' },
  { label: 'Doctors',   to: '/doctors'   },
  { label: 'Wishlist',  to: '/wishlist'  },
];

const COMPANY_LINKS = [
  { label: 'Help & Support', to: '/help-support' },
  { label: 'My Account',     to: '/account'      },
];

const CUSTOMER_CARE_LINKS = [
  { label: 'My Orders',    to: '/orders'       },
  { label: 'Notifications',to: '/notifications'},
];

const POLICY_LINKS = [
  { label: 'Privacy Policy',    to: '/help-support' },
  { label: 'Terms & Conditions',to: '/help-support' },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--color-border)]">
      <div className="max-w-full mx-auto  pt-12">
        <Container className="grid grid-cols-2 md:grid-cols-7 gap-0 mb-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <img src={medihubLogo} alt="" />
              </div>
              <span className="text-lg font-bold text-[var(--color-text-dark)]">
                Medihub1
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Your trusted partner for healthcare needs.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-[var(--color-primary)] hover:text-[var(--color-secondary)]"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[var(--color-text-dark)] mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              {QUICK_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-[var(--color-primary)] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[var(--color-text-dark)] mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              {COMPANY_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-[var(--color-primary)] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[var(--color-text-dark)] mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              {CUSTOMER_CARE_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-[var(--color-primary)] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[var(--color-text-dark)] mb-4">Policies</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)] mb-6">
              {POLICY_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-[var(--color-primary)] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[var(--color-text-dark)] mb-3">
              Download App
            </h4>
            <p className="text-xs text-[var(--color-text-secondary)] mb-3">
              Download our app for better experience
            </p>
            <div className="flex gap-2">
              <a
                href="#"
                className="bg-black text-white whitespace-nowrap text-xs px-2 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3.18 23.76c.33.18.7.24 1.06.18l11.9-6.87-2.56-2.56-10.4 9.25zm-1.5-20.3C1.25 3.9 1 4.4 1 5.04v13.92c0 .64.25 1.14.68 1.58l.09.08 7.8-7.8v-.18L1.68 3.46zm17.1 9.3l-2.67-1.54-2.84 2.84 2.84 2.84 2.68-1.55c.77-.44.77-1.15 0-1.59zm-16.4 9.3l10.4-9.25-2.56-2.56-11.9 6.87c.36.06.73 0 1.06-.18l3-1.73z" />
                </svg>
                Google Play
              </a>
              <a
                href="#"
                className="bg-black text-white whitespace-nowrap text-xs px-2 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
            </div>
          </div>
        </Container>
      </div>
      <div
        className="bg-primary px-[1rem] md:px-[4rem] py-2 flex items-center rounded-b-xl"
     
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
          <p className="text-sm text-white">
            © 2024 MediHub1. All rights reserved.
          </p>
          <p className="text-sm text-white flex items-center gap-1">
            Made with <span className="text-red-500">❤</span> for better
            healthcare
          </p>
        </div>
      </div>
    </footer>
  );
}
