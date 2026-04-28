import { Calendar, Clock, Video, Building2, User } from 'lucide-react';

const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

const formatTime = (t) => {
  if (!t) return '—';
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${ampm}`;
};

export default function ApptInfoGrid({ appt }) {
  const boxes = [
    { icon: Calendar, label: 'Date',  value: formatDate(appt.appointment_date), color: 'text-[var(--color-primary)]', bg: 'bg-blue-50' },
    { icon: Clock,    label: 'Time',  value: `${formatTime(appt.slot_start)} - ${formatTime(appt.slot_end)}`, color: 'text-teal-600', bg: 'bg-teal-50' },
    {
      icon: appt.consultancy_type === 'online' ? Video : Building2,
      label: 'Type',
      value: appt.consultancy_type === 'online' ? 'Video Consultation' : 'In-Clinic Visit',
      color: appt.consultancy_type === 'online' ? 'text-teal-600' : 'text-purple-600',
      bg: appt.consultancy_type === 'online' ? 'bg-teal-50' : 'bg-purple-50',
    },
    { icon: User, label: 'Patient', value: `${appt.patient_name || '—'}, ${appt.age} yrs (${appt.gender})`, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {boxes.map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="flex flex-col gap-2">
            <div className={`${bg} w-10 h-10 rounded-xl flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-xs text-[var(--color-text-secondary)]">{label}</p>
            <p className="text-sm font-bold text-[var(--color-text-dark)] leading-snug">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
