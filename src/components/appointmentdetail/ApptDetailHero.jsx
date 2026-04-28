import { ArrowLeft, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statusStyle = {
  pending:   'bg-yellow-50 text-yellow-600 border-yellow-100',
  upcoming:  'bg-blue-50 text-[var(--color-primary)] border-blue-100',
  completed: 'bg-green-50 text-[var(--color-success)] border-green-100',
  cancelled: 'bg-orange-50 text-orange-500 border-orange-100',
  rejected:  'bg-red-50 text-red-500 border-red-100',
};

const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

export default function ApptDetailHero({ id, status, bookedOn }) {
  const navigate = useNavigate();
  return (
    <div className="space-y-2">
      <button onClick={() => navigate('/appointments')} className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Appointments
      </button>
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">Appointment Details</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
              Appointment ID: <span className="text-[var(--color-text-dark)]">#{id}</span>
            </span>
            <button onClick={() => navigator.clipboard.writeText(String(id))} className="text-[var(--color-primary)] hover:opacity-70">
              <Copy className="w-3.5 h-3.5" />
            </button>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full border capitalize ${statusStyle[status] || statusStyle.pending}`}>
              {status}
            </span>
          </div>
        </div>
        <span className="text-xs text-[var(--color-text-secondary)]">Booked on {formatDate(bookedOn)}</span>
      </div>
    </div>
  );
}
