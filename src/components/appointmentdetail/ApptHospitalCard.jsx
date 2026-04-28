import { MapPin } from 'lucide-react';

export default function ApptHospitalCard({ address }) {
  if (!address) return null;
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-4">Clinic Address</h3>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
          <MapPin className="w-5 h-5 text-purple-600" />
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed pt-1">{address}</p>
      </div>
      <a
        href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
        target="_blank"
        rel="noreferrer"
        className="w-full border border-[var(--color-border)] hover:border-[var(--color-primary)] text-sm font-semibold text-[var(--color-text-dark)] py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-blue-50"
      >
        <MapPin className="w-4 h-4 text-[var(--color-primary)]" /> Get Directions
      </a>
    </div>
  );
}
