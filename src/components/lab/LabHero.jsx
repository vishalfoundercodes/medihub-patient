import { useRef } from 'react';
import { Search, X } from 'lucide-react';

export default function LabHero({ searchQuery, onSearch }) {
  const inputRef = useRef(null);

  return (
    <div className="bg-white border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-dark)]">Lab Tests</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Book accurate lab tests with trusted labs and get reports on time.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search for tests, packages..."
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
          <button
            onClick={() => inputRef.current?.focus()}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white p-3 rounded-xl transition-all"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
