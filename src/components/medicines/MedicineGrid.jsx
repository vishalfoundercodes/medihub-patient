import { ChevronDown } from 'lucide-react';
import MedicineCard from './MedicineCard';

export default function MedicineGrid({ medicines, total, sortBy, onSortChange, onAdd, onRemove, cart }) {
  return (
    <div className="flex-1 min-w-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-5">
        <p className="text-base font-bold text-[var(--color-text-dark)]">
          All Medicines{' '}
          <span className="text-[var(--color-text-secondary)] font-normal">({total} Results)</span>
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
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Discount</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Grid */}
      {medicines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
          {medicines.map((med) => (
            <MedicineCard
              key={med.id}
              medicine={med}
              onAdd={onAdd}
              onRemove={onRemove}
              qty={cart[med.id] || 0}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="text-5xl mb-4">💊</span>
          <h3 className="font-bold text-[var(--color-text-dark)] mb-2">No medicines found</h3>
          <p className="text-sm text-[var(--color-text-secondary)]">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
