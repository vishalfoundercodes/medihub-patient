import { Calendar, FileText, ShoppingBag, Tag, Wallet, Bell, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const typeConfig = {
  Appointments: { icon: Calendar,    bg: 'bg-blue-50',   color: 'text-[var(--color-primary)]' },
  Reports:      { icon: FileText,    bg: 'bg-green-50',  color: 'text-[var(--color-success)]' },
  Orders:       { icon: ShoppingBag, bg: 'bg-orange-50', color: 'text-orange-500'             },
  Offers:       { icon: Tag,         bg: 'bg-purple-50', color: 'text-purple-600'             },
  Account:      { icon: Wallet,      bg: 'bg-teal-50',   color: 'text-teal-600'               },
};

// Special override for cancelled appointments
const getCancelledConfig = (title) =>
  title.toLowerCase().includes('cancel')
    ? { icon: XCircle, bg: 'bg-red-50', color: 'text-red-500' }
    : null;

export default function NotificationItem({ notification, onRead }) {
  const navigate = useNavigate();
  const override = getCancelledConfig(notification.title);
  const config = override || typeConfig[notification.type] || typeConfig.Account;
  const Icon = config.icon;

  return (
    <div
      onClick={() => onRead(notification.id)}
      className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all hover:bg-[var(--color-bg-section)] group
        ${!notification.read ? 'bg-blue-50/40' : 'bg-white'}`}
    >
      {/* Icon */}
      <div className={`${config.bg} w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 mt-0.5`}>
        <Icon className={`w-5 h-5 ${config.color}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <p className={`text-sm font-bold text-[var(--color-text-dark)] leading-snug ${!notification.read ? 'text-[var(--color-primary)]' : ''}`}>
            {notification.title}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <div className="text-right">
              {notification.date && <p className="text-xs text-[var(--color-text-secondary)]">{notification.date}</p>}
              {notification.time && <p className="text-xs text-[var(--color-text-secondary)]">{notification.time}</p>}
            </div>
            {!notification.read && (
              <div className="w-2.5 h-2.5 bg-[var(--color-primary)] rounded-full shrink-0 mt-0.5" />
            )}
          </div>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1 leading-relaxed">
          {notification.message}
          {notification.link && (
            <>
              {' '}
              <button
                onClick={(e) => { e.stopPropagation(); navigate(notification.link.to); }}
                className="text-[var(--color-primary)] font-semibold hover:underline"
              >
                {notification.link.text}
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
