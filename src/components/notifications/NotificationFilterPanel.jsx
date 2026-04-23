import { Bell, MailOpen, Calendar, FileText, Tag, User, CheckCheck } from 'lucide-react';

const filters = [
  { id: 'all',          label: 'All Notifications', icon: Bell     },
  { id: 'Unread',       label: 'Unread',             icon: MailOpen },
  { id: 'Appointments', label: 'Appointments',       icon: Calendar },
  { id: 'Reports',      label: 'Reports',            icon: FileText },
  { id: 'Offers',       label: 'Offers',             icon: Tag      },
  { id: 'Account',      label: 'Account',            icon: User     },
];

export default function NotificationFilterPanel({ active, counts, onChange, onMarkAllRead }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-4">Filter Notifications</h3>
      <div className="space-y-1 mb-5">
        {filters.map(({ id, label, icon: Icon }) => {
          const count = counts[id] ?? 0;
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                ${isActive
                  ? 'bg-blue-50 text-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-section)] hover:text-[var(--color-text-dark)]'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'}`} />
                {label}
              </div>
              {id !== 'all' && count > 0 && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full min-w-[22px] text-center
                  ${isActive ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-[var(--color-text-secondary)]'}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <button
        onClick={onMarkAllRead}
        className="w-full flex items-center justify-center gap-2 border border-[var(--color-border)] hover:border-[var(--color-primary)] text-sm font-semibold text-[var(--color-text-dark)] py-2.5 rounded-xl transition-all hover:bg-blue-50"
      >
        <CheckCheck className="w-4 h-4 text-[var(--color-primary)]" />
        Mark all as read
      </button>
    </div>
  );
}
