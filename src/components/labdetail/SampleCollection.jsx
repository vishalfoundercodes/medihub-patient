import { Calendar, Clock, MapPin, RefreshCw } from 'lucide-react';

export default function SampleCollection({ data }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-4">Sample Collection</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[var(--color-text-dark)]">{data.date}</p>
            <p className="text-xs font-semibold text-[var(--color-primary)]">({data.dateNote})</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-sm font-medium text-[var(--color-text-dark)]">{data.time}</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] whitespace-pre-line leading-relaxed">{data.address}</p>
        </div>
      </div>
      <button className="mt-5 w-full border border-[var(--color-border)] hover:border-[var(--color-primary)] text-sm font-semibold text-[var(--color-text-dark)] py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-blue-50">
        <RefreshCw className="w-4 h-4" /> Reschedule
      </button>
    </div>
  );
}
