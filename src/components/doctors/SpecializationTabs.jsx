import Container from '../Container';

export default function SpecializationTabs({ specializations, active, onChange }) {
  return (
    <div className="bg-white border-b border-[var(--color-border)] sticky top-[65px] z-40">
      <Container>
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-3">
          <button
            onClick={() => onChange('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border
              ${active === 'all'
                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-blue-100'
                : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
              }`}
          >
            🩺 All Specializations
          </button>
          {specializations.map((spec) => (
            <button
              key={spec}
              onClick={() => onChange(spec)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border
                ${active === spec
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-blue-100'
                  : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
}
