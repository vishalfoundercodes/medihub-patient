import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function OrderPagination({ current, total, perPage, onChange }) {
  const totalPages = Math.ceil(total / perPage);
  const from = (current - 1) * perPage + 1;
  const to = Math.min(current * perPage, total);

  const pages = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (current <= 3) return [1, 2, 3, '...', totalPages];
    if (current >= totalPages - 2) return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', current, '...', totalPages];
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <p className="text-sm text-[var(--color-text-secondary)]">
        Showing <span className="font-semibold text-[var(--color-text-dark)]">{from} to {to}</span> of{' '}
        <span className="font-semibold text-[var(--color-text-dark)]">{total}</span> orders
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(current - 1)}
          disabled={current === 1}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--color-border)] disabled:opacity-40 hover:border-[var(--color-primary)] hover:bg-blue-50 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        {pages().map((p, i) => (
          <button
            key={i}
            onClick={() => typeof p === 'number' && onChange(p)}
            className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all
              ${p === current
                ? 'bg-[var(--color-primary)] text-white border border-[var(--color-primary)]'
                : p === '...'
                  ? 'cursor-default text-[var(--color-text-secondary)]'
                  : 'border border-[var(--color-border)] text-[var(--color-text-dark)] hover:border-[var(--color-primary)] hover:bg-blue-50'
              }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onChange(current + 1)}
          disabled={current === totalPages}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--color-border)] disabled:opacity-40 hover:border-[var(--color-primary)] hover:bg-blue-50 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
