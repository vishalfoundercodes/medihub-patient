import { useRef } from 'react';
import { Search, X, ShoppingCart } from 'lucide-react';

export default function MedicineHero({ searchQuery, onSearch, cartCount, cartTotal }) {
  const inputRef = useRef(null);

  return (
    <div className="bg-white border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center gap-4">
        {/* Left — title */}
        <div className="shrink-0">
          <h1 className="text-3xl font-bold text-[var(--color-text-dark)]">Medicines</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Order medicines online and get them delivered to your doorstep
          </p>
        </div>

        {/* Center — search */}
        <div className="flex items-center gap-2 flex-1 md:mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search for medicines, health products..."
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
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white p-3 rounded-xl transition-all shrink-0"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Right — cart */}
        <div className="shrink-0">
          <button className="relative flex items-center gap-3 border border-[var(--color-border)] hover:border-[var(--color-primary)] px-4 py-2.5 rounded-xl transition-all group">
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--color-primary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="text-left">
              <p className="text-xs text-[var(--color-text-secondary)]">Cart</p>
              <p className="text-sm font-bold text-[var(--color-text-dark)]">
                {cartCount > 0 ? `₹${cartTotal.toLocaleString()}` : '₹0'}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
