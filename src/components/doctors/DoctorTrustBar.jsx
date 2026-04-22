import { ShieldCheck, CalendarCheck, Video, Lock } from 'lucide-react';

const items = [
  { icon: ShieldCheck, title: 'Verified Doctors', desc: 'All doctors are verified & experienced', color: 'text-[var(--color-primary)]', bg: 'bg-blue-50' },
  { icon: CalendarCheck, title: 'Easy Appointments', desc: 'Book appointments in just a few clicks', color: 'text-teal-600', bg: 'bg-teal-50' },
  { icon: Video, title: 'Video Consultation', desc: 'Consult online from the comfort of your home', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: Lock, title: '100% Safe & Secure', desc: 'Your data is safe with us', color: 'text-orange-500', bg: 'bg-orange-50' },
];

export default function DoctorTrustBar() {
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-2xl p-5 mt-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, title, desc, color, bg }) => (
          <div key={title} className="flex items-center gap-3">
            <div className={`${bg} w-11 h-11 rounded-xl flex items-center justify-center shrink-0`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-text-dark)]">{title}</p>
              <p className="text-xs text-[var(--color-text-secondary)]">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
