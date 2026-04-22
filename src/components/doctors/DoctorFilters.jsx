import { useState } from 'react';
import { ChevronUp, ChevronDown, Plus } from 'lucide-react';
import { filterSpecializations, experienceOptions } from '../../data/doctorsData';

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[var(--color-border)] pb-4 mb-4">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full mb-3">
        <span className="font-semibold text-sm text-[var(--color-text-dark)]">{title}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-[var(--color-text-secondary)]" />
          : <ChevronDown className="w-4 h-4 text-[var(--color-text-secondary)]" />
        }
      </button>
      {open && children}
    </div>
  );
}

export default function DoctorFilters({ filters, onChange, onClear }) {
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const visibleSpecs = showAllSpecs ? filterSpecializations : filterSpecializations.slice(0, 6);

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 sticky top-[120px]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-[var(--color-text-dark)]">Filters</h3>
        <button onClick={onClear} className="text-xs font-semibold text-[var(--color-primary)] hover:underline">
          Clear All
        </button>
      </div>

      {/* Consultation Type */}
      <FilterSection title="Consultation Type">
        <div className="flex flex-col gap-2">
          {['All', 'In-clinic', 'Video Consultation'].map((type) => (
            <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.consultationTypes.includes(type)}
                onChange={() => onChange('consultationType', type)}
                className="w-4 h-4 accent-[var(--color-primary)] rounded"
              />
              <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-dark)]">{type}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Specialization */}
      <FilterSection title="Specialization">
        <div className="flex flex-col gap-2">
          {visibleSpecs.map((spec) => (
            <label key={spec} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.specializations.includes(spec)}
                onChange={() => onChange('specialization', spec)}
                className="w-4 h-4 accent-[var(--color-primary)] rounded"
              />
              <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-dark)]">{spec}</span>
            </label>
          ))}
          {!showAllSpecs && (
            <button
              onClick={() => setShowAllSpecs(true)}
              className="flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] mt-1 hover:underline"
            >
              <Plus className="w-3 h-3" /> View More
            </button>
          )}
        </div>
      </FilterSection>

      {/* Experience */}
      <FilterSection title="Experience">
        <div className="flex flex-col gap-2">
          {experienceOptions.map((exp) => (
            <label key={exp} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.experience.includes(exp)}
                onChange={() => onChange('experience', exp)}
                className="w-4 h-4 accent-[var(--color-primary)] rounded"
              />
              <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-dark)]">{exp}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Fees Range */}
      <FilterSection title="Fees Range">
        <input
          type="range"
          min={0}
          max={2000}
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
      <FilterSection title="Availability" defaultOpen={true}>
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
      <FilterSection title="Sort By" defaultOpen={true}>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange('sortBy', e.target.value)}
          className="w-full border border-[var(--color-border)] rounded-xl px-3 py-2.5 text-sm text-[var(--color-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white"
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
