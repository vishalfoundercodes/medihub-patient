import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const discountOptions = ['10% and above', '20% and above', '30% and above'];

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[var(--color-border)] pb-4 mb-4">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full mb-3">
        <span className="font-semibold text-sm text-[var(--color-text-dark)]">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-[var(--color-text-secondary)]" /> : <ChevronDown className="w-4 h-4 text-[var(--color-text-secondary)]" />}
      </button>
      {open && children}
    </div>
  );
}

export default function LabFilters({ filters, onChange, onClear, categories = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 sticky top-[120px]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-[var(--color-text-dark)]">Filters</h3>
        <button onClick={onClear} className="text-xs font-semibold text-[var(--color-primary)] hover:underline">Clear All</button>
      </div>

      {/* Category */}
      <FilterSection title="Category">
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.categoryId === null}
              onChange={() => onChange('categoryId', null)}
              className="w-4 h-4 accent-[var(--color-primary)] rounded"
            />
            <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-dark)]">All Category</span>
          </label>
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.categoryId === cat.id}
                onChange={() => onChange('categoryId', filters.categoryId === cat.id ? null : cat.id)}
                className="w-4 h-4 accent-[var(--color-primary)] rounded"
              />
              <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-dark)]">{cat.name}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <input
          type="range" min={0} max={5000}
          value={filters.maxPrice}
          onChange={(e) => onChange('maxPrice', Number(e.target.value))}
          className="w-full accent-[var(--color-primary)]"
        />
        <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mt-1">
          <span>₹0</span>
          <span>₹{filters.maxPrice.toLocaleString()}</span>
        </div>
      </FilterSection>

      {/* Discount */}
      <FilterSection title="Discount">
        <div className="flex flex-col gap-2">
          {discountOptions.map((d) => (
            <label key={d} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.discounts.includes(d)}
                onChange={() => onChange('discount', d)}
                className="w-4 h-4 accent-[var(--color-primary)] rounded"
              />
              <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-dark)]">{d}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Sample Collection */}
      <FilterSection title="Sample Collection">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.homeCollection}
            onChange={() => onChange('homeCollection', !filters.homeCollection)}
            className="w-4 h-4 accent-[var(--color-primary)] rounded"
          />
          <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-dark)]">Home Collection Available</span>
        </label>
      </FilterSection>

      {/* Sort By */}
      <FilterSection title="Sort By">
        <select
          value={filters.sortBy}
          onChange={(e) => onChange('sortBy', e.target.value)}
          className="w-full border border-[var(--color-border)] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white"
        >
          <option>Popularity</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Discount</option>
        </select>
      </FilterSection>
    </div>
  );
}
