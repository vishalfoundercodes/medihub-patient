import { useRef } from 'react';
import { Search, X } from 'lucide-react';
import Container from '../Container';

export default function DoctorHero({ searchQuery, onSearch }) {
  const inputRef = useRef(null);

  return (
    <div className="bg-white border-b border-[var(--color-border)]">
      <Container className="py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="shrink-0">
          <h1 className="text-3xl font-bold text-[var(--color-text-dark)]">Find the Right Doctor</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Book appointments with verified doctors & get the best healthcare.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search doctors, specialization, symptoms..."
              className="w-full pl-11 pr-10 py-3 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-[var(--color-bg-section)]"
            />
            {searchQuery && (
              <button
                onClick={() => { onSearch(''); inputRef.current?.focus(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-dark)]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap">
            Search
          </button>
        </div>
      </Container>
      </div>)}
