import { MapPin } from 'lucide-react';

export default function ApptHospitalCard({ hospital }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-4">Hospital Address</h3>
      <div className="flex items-start gap-3 mb-4">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-16 h-16 rounded-xl object-cover shrink-0"
        />
        <div>
          <p className="text-sm font-bold text-[var(--color-text-dark)] mb-1">{hospital.name}</p>
          <p className="text-xs text-[var(--color-text-secondary)] whitespace-pre-line leading-relaxed">{hospital.address}</p>
        </div>
      </div>
      <button className="w-full border border-[var(--color-border)] hover:border-[var(--color-primary)] text-sm font-semibold text-[var(--color-text-dark)] py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-blue-50">
        <MapPin className="w-4 h-4 text-[var(--color-primary)]" /> Get Directions
      </button>
    </div>
  );
}
