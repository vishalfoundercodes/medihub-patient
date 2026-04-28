import { CheckCircle, Clock, Circle } from 'lucide-react';

const STEPS = ['pending', 'upcoming', 'completed'];

const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

export default function ApptTimeline({ status, createdAt }) {
  const isCancelledOrRejected = status === 'cancelled' || status === 'rejected';

  const steps = isCancelledOrRejected
    ? [
        { label: 'Appointment Booked', done: true, date: formatDate(createdAt) },
        { label: status === 'cancelled' ? 'Appointment Cancelled' : 'Appointment Rejected', done: true, active: false, error: true, date: '' },
      ]
    : [
        { label: 'Appointment Booked',    done: true,                        date: formatDate(createdAt) },
        { label: 'Appointment Confirmed', done: status !== 'pending',        date: '' },
        { label: 'Consultation Done',     done: status === 'completed',      date: '' },
      ];

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-5">Appointment Timeline</h3>
      <div className="space-y-0">
        {steps.map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10
                ${item.error ? 'bg-red-500' : item.done ? 'bg-[var(--color-success)]' : 'bg-white border-2 border-[var(--color-border)]'}`}>
                {item.done
                  ? <CheckCircle className="w-5 h-5 text-white" />
                  : <Circle className="w-4 h-4 text-[var(--color-border)]" />}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-0.5 h-8 ${item.done ? 'bg-[var(--color-success)]' : 'bg-[var(--color-border)]'}`} />
              )}
            </div>
            <div className="pb-6">
              <p className={`text-sm font-semibold ${item.done ? 'text-[var(--color-text-dark)]' : 'text-[var(--color-text-secondary)]'}`}>
                {item.label}
              </p>
              {item.date && <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{item.date}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
