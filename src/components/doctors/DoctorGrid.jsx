import { ChevronDown } from 'lucide-react';
import DoctorCard from './DoctorCard';

export default function DoctorGrid({ doctors, total, sortBy, onSortChange }) {
  return (
    <div className="flex-1 min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-base font-bold text-[var(--color-text-dark)]">
          <span className="text-[var(--color-primary)]">{total}+</span> Doctors Available
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--color-text-secondary)]">Sort by:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none border border-[var(--color-border)] rounded-xl pl-3 pr-8 py-2 text-sm text-[var(--color-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white cursor-pointer"
            >
              <option>Popularity</option>
              <option>Fee: Low to High</option>
              <option>Fee: High to Low</option>
              <option>Experience</option>
              <option>Rating</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Grid */}
      {doctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="text-5xl mb-4">👨‍⚕️</span>
          <h3 className="font-bold text-[var(--color-text-dark)] mb-2">No doctors found</h3>
          <p className="text-sm text-[var(--color-text-secondary)]">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
