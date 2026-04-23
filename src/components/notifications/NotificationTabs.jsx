export default function NotificationTabs({ tabs, active, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] w-full">
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex min-w-max">
          {tabs.map(({ id, label, count }) => (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`px-2 py-4 text-xs md:text-sm font-semibold  border-b-2 transition-all flex items-center gap-0 
                ${active === id
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-dark)]'
                }`}
            >
              {label}
              <span className={`text-[10px] md:text-xs px-1.5 py-0.5 rounded-full font-medium
                ${active === id
                  ? 'bg-blue-100 text-[var(--color-primary)]'
                  : 'bg-gray-100 text-[var(--color-text-secondary)]'
                }`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
