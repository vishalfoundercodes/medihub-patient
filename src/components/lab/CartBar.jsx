import { ShoppingCart, ArrowRight, X } from 'lucide-react';

export default function CartBar({ selected, onClear }) {
  if (selected.length === 0) return null;

  const total = selected.reduce((sum, t) => sum + t.price, 0);
  const originalTotal = selected.reduce((sum, t) => sum + t.original, 0);
  const saved = originalTotal - total;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[var(--color-border)] shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center gap-4 justify-between">

        {/* Left — cart info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[var(--color-primary)] text-white text-xs font-bold rounded-full flex items-center justify-center">
              {selected.length}
            </span>
          </div>
          <div>
            <p className="font-bold text-[var(--color-text-dark)] text-sm">{selected.length} Test{selected.length > 1 ? 's' : ''} Selected</p>
            <button onClick={onClear} className="text-xs text-[var(--color-primary)] hover:underline flex items-center gap-1">
              <X className="w-3 h-3" /> Clear All
            </button>
          </div>
        </div>

        {/* Center — price */}
        <div className="text-center sm:text-left">
          <p className="text-xs text-[var(--color-text-secondary)] mb-0.5">Total</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[var(--color-text-dark)]">₹{total.toLocaleString()}</span>
            <span className="text-sm text-[var(--color-text-secondary)] line-through">₹{originalTotal.toLocaleString()}</span>
            <span className="text-xs font-semibold text-[var(--color-success)] bg-[var(--color-success-bg)] px-2 py-0.5 rounded-full">
              You Save ₹{saved.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Right — CTA */}
        <button className="w-full sm:w-auto bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200">
          Proceed to Checkout
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
