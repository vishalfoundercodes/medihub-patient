import { CalendarPlus, FileText, ClipboardList, HelpCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const actions = [
  { icon: CalendarPlus, title: 'Book New Appointment', desc: 'Find and book doctors', color: 'text-[var(--color-primary)]', bg: 'bg-blue-50', to: '/doctors' },
  { icon: FileText, title: 'My Prescriptions', desc: 'View your prescriptions', color: 'text-purple-600', bg: 'bg-purple-50', to: '/account' },
  { icon: ClipboardList, title: 'My Reports', desc: 'View your lab test reports', color: 'text-teal-600', bg: 'bg-teal-50', to: '/my-lab-tests' },
  { icon: HelpCircle, title: 'Help & Support', desc: 'Get help with appointments', color: 'text-orange-500', bg: 'bg-orange-50', to: '#' },
];

export default function AppointmentQuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-4">Quick Actions</h3>
      <div className="space-y-2">
        {actions.map(({ icon: Icon, title, desc, color, bg, to }) => (
          <button
            key={title}
            onClick={() => navigate(to)}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--color-bg-section)] transition-all group text-left"
          >
            <div className={`${bg} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[var(--color-text-dark)]">{title}</p>
              <p className="text-xs text-[var(--color-text-secondary)]">{desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}
