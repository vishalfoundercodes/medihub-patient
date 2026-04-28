import { Star, MapPin } from 'lucide-react';

export default function ApptDoctorCard({ appt }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
      <div className="flex items-start gap-5 flex-wrap sm:flex-nowrap">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-[var(--color-bg-section)] shrink-0 border-2 border-[var(--color-border)]">
          <img src={appt.doctor_img} alt={appt.doctor_name} className="w-full h-full object-cover object-top" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-[var(--color-text-dark)] mb-0.5">{appt.doctor_name}</h2>
          <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">{appt.specialization}</p>
          {appt.doctor_address && (
            <p className="text-sm text-[var(--color-text-secondary)] mb-3 flex items-start gap-1">
              <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[var(--color-primary)]" />
              {appt.doctor_address}
            </p>
          )}
          <span className="text-sm text-[var(--color-text-secondary)]">
            Consultation Fee: <span className="font-bold text-[var(--color-text-dark)]">₹{appt.consultation_fee}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
