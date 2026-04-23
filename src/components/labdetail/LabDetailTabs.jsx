const TABS = ['Overview', 'Tests Included', 'Preparation', 'How it Works', 'FAQs'];

export default function LabDetailTabs({ active, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden">
      <div className="flex overflow-x-auto hide-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`px-1 md:px-5 py-4 text-xs font-semibold border-b-2 transition-all
              ${active === tab
                ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-dark)]'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
