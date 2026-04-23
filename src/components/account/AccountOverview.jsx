import { ShoppingBag, FlaskConical, Calendar, Wallet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const stats = [
  { key: 'orders', label: 'Orders', icon: ShoppingBag, color: 'text-[var(--color-primary)]', bg: 'bg-blue-100' },
  { key: 'labTests', label: 'Lab Tests', icon: FlaskConical, color: 'text-teal-600', bg: 'bg-teal-100' },
  { key: 'appointments', label: 'Appointments', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-100' },
  { key: 'wallet', label: 'Wallet Balance', icon: Wallet, color: 'text-orange-500', bg: 'bg-orange-100', prefix: '₹' },
];

export default function AccountOverview() {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] px-3 py-4">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-3">Account Overview</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {stats.map(({ key, label, icon: Icon, color, bg, prefix }) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`${bg} w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className={`text-lg font-bold ${color}`}>
                {prefix}{user?.stats?.[key] ?? 0}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] whitespace-nowrap">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
