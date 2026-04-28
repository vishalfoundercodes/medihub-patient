import { CheckCircle } from 'lucide-react';

const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

export default function ApptSummary({ appt }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-4">Appointment Summary</h3>
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-text-secondary)]">Consultation Fee</span>
          <span className="font-medium text-[var(--color-text-dark)]">₹{appt.consultation_fee}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-text-secondary)]">Platform Fee</span>
          <span className="font-medium text-[var(--color-success)]">FREE</span>
        </div>
        <div className="border-t border-dashed border-[var(--color-border)] pt-3 flex justify-between">
          <span className="font-bold text-[var(--color-text-dark)]">Total Amount</span>
          <span className="font-bold text-lg text-[var(--color-text-dark)]">₹{appt.consultation_fee}</span>
        </div>
      </div>

      <div className="bg-green-50 border border-green-100 rounded-xl p-3">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle className="w-4 h-4 text-[var(--color-success)]" />
          <span className="text-sm font-bold text-[var(--color-success)] capitalize">{appt.status}</span>
        </div>
        <p className="text-xs text-[var(--color-text-secondary)]">Booked on {formatDate(appt.created_at)}</p>
      </div>
    </div>
  );
}
