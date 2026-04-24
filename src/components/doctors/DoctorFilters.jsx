import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const experienceOptions = ['0-5', '5-10', '10-20', '20+'];
const EXPERIENCE_LABELS = { '0-5': '0-5 Years', '5-10': '5-10 Years', '10-20': '10-20 Years', '20+': '20+ Years' };

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

export default function DoctorFilters({ filters, onChange, onClear, specializations = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 sticky top-[120px]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-[var(--color-text-dark)]">Filters</h3>
        <button onClick={onClear} className="text-xs font-semibold text-[var(--color-primary)] hover:underline">Clear All</button>
      </div>

      {/* Consultation Type */}
      <FilterSection title="Consultation Type">
        <div className="flex flex-col gap-2">
          {[{ label: 'All', value: 'all' }, { label: 'In-Clinic', value: 'clinic' }, { label: 'Online', value: 'online' }].map(({ label, value }) => (
            <label key={value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.consultancyType === value}
                onChange={() => onChange('consultancyType', filters.consultancyType === value ? 'all' : value)}
                className="w-4 h-4 accent-[var(--color-primary)] rounded"
              />
              <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-dark)]">{label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Specialization */}
      <FilterSection title="Specialization">
        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
          {specializations.map((spec) => (
            <label key={spec} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.specialization === spec}
                onChange={() => onChange('specialization', filters.specialization === spec ? '' : spec)}
                className="w-4 h-4 accent-[var(--color-primary)] rounded"
              />
              <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-dark)]">{spec}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Experience */}
      <FilterSection title="Experience">
        <div className="flex flex-col gap-2">
          {experienceOptions.map((exp) => (
            <label key={exp} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.experience === exp}
                onChange={() => onChange('experience', filters.experience === exp ? '' : exp)}
                className="w-4 h-4 accent-[var(--color-primary)] rounded"
              />
              <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-dark)]">{EXPERIENCE_LABELS[exp]}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Fees Range */}
      <FilterSection title="Fees Range">
        <input
          type="range" min={0} max={2000}
          value={filters.maxFee}
          onChange={(e) => onChange('maxFee', Number(e.target.value))}
          className="w-full accent-[var(--color-primary)]"
        />
        <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mt-1">
          <span>₹0</span>
          <span>{filters.maxFee >= 2000 ? '₹2000+' : `₹${filters.maxFee}`}</span>
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.availableToday}
            onChange={() => onChange('availableToday', !filters.availableToday)}
            className="w-4 h-4 accent-[var(--color-primary)] rounded"
          />
          <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-dark)]">Available Today</span>
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
          <option>Fee: Low to High</option>
          <option>Fee: High to Low</option>
          <option>Experience</option>
          <option>Rating</option>
        </select>
      </FilterSection>
    </div>
  );
}
