import { RefreshCw, Trash2, CalendarPlus } from 'lucide-react';

export default function ApptActionButtons() {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 border border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-text-dark)] hover:text-[var(--color-primary)] font-semibold px-5 py-3 rounded-xl text-sm transition-all hover:bg-blue-50">
          <RefreshCw className="w-4 h-4" /> Reschedule Appointment
        </button>
        <button className="flex items-center gap-2 border border-red-200 hover:border-red-400 text-red-500 font-semibold px-5 py-3 rounded-xl text-sm transition-all hover:bg-red-50">
          <Trash2 className="w-4 h-4" /> Cancel Appointment
        </button>
        <button className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all shadow-md shadow-blue-100">
          <CalendarPlus className="w-4 h-4" /> Add to Calendar
        </button>
      </div>
    </div>
  );
}
