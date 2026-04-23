import { User, Phone } from 'lucide-react';

export default function ApptAboutSection({ about }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 space-y-5">
      <h3 className="font-bold text-[var(--color-text-dark)]">About Your Appointment</h3>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-bold text-[var(--color-text-dark)] mb-1">Reason for Visit</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{about.reason}</p>
        </div>
        <div>
          <p className="text-sm font-bold text-[var(--color-text-dark)] mb-1">Symptoms / Notes</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{about.symptoms}</p>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)] pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-[var(--color-text-secondary)] mb-1">Patient Name</p>
          <p className="text-sm font-semibold text-[var(--color-text-dark)]">{about.patient.name}</p>
        </div>
        <div>
          <p className="text-xs text-[var(--color-text-secondary)] mb-1">Age / Gender</p>
          <p className="text-sm font-semibold text-[var(--color-text-dark)]">{about.patient.age} / {about.patient.gender}</p>
        </div>
        <div>
          <p className="text-xs text-[var(--color-text-secondary)] mb-1">Mobile Number</p>
          <p className="text-sm font-semibold text-[var(--color-text-dark)]">{about.patient.phone}</p>
        </div>
      </div>
    </div>
  );
}
