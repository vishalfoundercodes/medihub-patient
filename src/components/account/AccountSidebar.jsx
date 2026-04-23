import { User, ShoppingBag, FlaskConical, Calendar, FileText, Pill, MapPin, CreditCard, Tag, Bell, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { id: 'account', label: 'My Account', icon: User },
  { id: 'orders', label: 'My Orders', icon: ShoppingBag },
  { id: 'labtests', label: 'My Lab Tests', icon: FlaskConical },
  { id: 'appointments', label: 'My Appointments', icon: Calendar },
  // { id: 'reports', label: 'My Reports', icon: FileText },
  // { id: 'prescriptions', label: 'My Prescriptions', icon: Pill },
  { id: 'addresses', label: 'My Addresses', icon: MapPin },
  // { id: 'payments', label: 'Payment Methods', icon: CreditCard },
  // { id: 'offers', label: 'Offers & Wallet', icon: Tag },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  // { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
];

export default function AccountSidebar({ active, onChange }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  const handleClick = (id) => {
    if (id === 'account') { navigate('/account'); return; }
    if (id === 'orders') { navigate('/orders'); return; }
    if (id === 'labtests') { navigate('/my-lab-tests'); return; }
    if (id === 'appointments') { navigate('/appointments'); return; }
    if (id === 'notifications') { navigate('/notifications'); return; }
    if (id === 'help') { navigate('/help-support'); return; }
    onChange(id);
  };

  return (
    <aside className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden">
      {/* User mini profile */}
      <div className="p-5 border-b border-[var(--color-border)] flex items-center gap-3">
        <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center shrink-0">
          <User className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm text-[var(--color-text-dark)] truncate">{user?.name}</p>
          <p className="text-xs text-[var(--color-text-secondary)] truncate">{user?.phone}</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="p-2">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 cursor-pointer rounded-xl text-sm font-medium transition-all text-left
              ${active === id
                ? 'bg-blue-50 text-[var(--color-primary)]'
                : 'text-[var(--color-text-secondary)] hover:bg-gray-50 hover:text-[var(--color-text-dark)]'
              }`}
          >
            <Icon className={`w-4 h-4 shrink-0 ${active === id ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'}`} />
            {label}
          </button>
        ))}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 cursor-pointer rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-1"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Logout
        </button>
      </nav>
    </aside>
  );
}
