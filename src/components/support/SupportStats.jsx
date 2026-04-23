import { Ticket, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function SupportStats({ tickets }) {
  const stats = [
    { label: 'Total Tickets', value: tickets.length, icon: Ticket, color: 'text-[var(--color-primary)]', bg: 'bg-blue-50' },
    { label: 'Open', value: tickets.filter((t) => t.status === 'Open').length, icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'In Progress', value: tickets.filter((t) => t.status === 'In Progress').length, icon: Clock, color: 'text-[var(--color-primary)]', bg: 'bg-blue-50' },
    { label: 'Resolved', value: tickets.filter((t) => t.status === 'Resolved').length, icon: CheckCircle, color: 'text-[var(--color-success)]', bg: 'bg-green-50' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-5">Ticket Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="flex items-center gap-3">
            <div className={`${bg} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className={`text-xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-[var(--color-text-secondary)]">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
