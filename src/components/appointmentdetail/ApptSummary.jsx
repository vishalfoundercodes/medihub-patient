import { CheckCircle } from 'lucide-react';

export default function ApptSummary({ payment }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-4">Appointment Summary</h3>
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-text-secondary)]">Consultation Fee</span>
          <span className="font-medium text-[var(--color-text-dark)]">₹{payment.consultationFee}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-text-secondary)]">Platform Fee</span>
          <span className="font-medium text-[var(--color-text-dark)]">₹{payment.platformFee}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-text-secondary)]">Discount</span>
          <span className="font-medium text-red-500">- ₹{payment.discount}</span>
        </div>
        <div className="border-t border-dashed border-[var(--color-border)] pt-3 flex justify-between">
          <span className="font-bold text-[var(--color-text-dark)]">Total Amount</span>
          <span className="font-bold text-lg text-[var(--color-text-dark)]">₹{payment.total}</span>
        </div>
      </div>

      {/* Paid badge */}
      <div className="bg-green-50 border border-green-100 rounded-xl p-3 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle className="w-4 h-4 text-[var(--color-success)]" />
          <span className="text-sm font-bold text-[var(--color-success)]">{payment.status}</span>
        </div>
        <p className="text-xs text-[var(--color-text-secondary)]">Paid on {payment.paidOn}</p>
      </div>

      <button className="w-full border border-[var(--color-border)] hover:border-[var(--color-primary)] text-sm font-semibold text-[var(--color-text-dark)] py-2.5 rounded-xl transition-all hover:bg-blue-50">
        View Payment Details
      </button>
    </div>
  );
}
