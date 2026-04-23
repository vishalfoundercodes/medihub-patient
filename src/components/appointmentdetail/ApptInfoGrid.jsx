import { Calendar, Clock, Building2, Stethoscope, Info } from 'lucide-react';

export default function ApptInfoGrid({ appointment }) {
  const boxes = [
    {
      icon: Calendar, label: 'Date', value: appointment.date,
      note: appointment.dateNote, color: 'text-[var(--color-primary)]', bg: 'bg-blue-50',
    },
    {
      icon: Clock, label: 'Time', value: appointment.time,
      note: `(${appointment.duration})`, color: 'text-teal-600', bg: 'bg-teal-50',
    },
    {
      icon: Building2, label: 'Hospital', value: appointment.hospital,
      note: appointment.address, color: 'text-purple-600', bg: 'bg-purple-50',
    },
    {
      icon: Stethoscope, label: 'Consultation Type', value: appointment.consultationType,
      note: '', color: 'text-orange-500', bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {boxes.map(({ icon: Icon, label, value, note, color, bg }) => (
          <div key={label} className="flex flex-col gap-2">
            <div className={`${bg} w-10 h-10 rounded-xl flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-xs text-[var(--color-text-secondary)]">{label}</p>
            <p className="text-sm font-bold text-[var(--color-text-dark)] leading-snug">{value}</p>
            {note && <p className="text-xs text-[var(--color-primary)] font-medium">{note}</p>}
          </div>
        ))}
      </div>
      {appointment.note && (
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
          <Info className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--color-text-secondary)]">{appointment.note}</p>
        </div>
      )}
    </div>
  );
}
