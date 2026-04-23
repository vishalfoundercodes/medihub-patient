import { LayoutGrid, Pill, FlaskConical, Calendar, SlidersHorizontal, ChevronDown } from 'lucide-react';

const tabs = [
  { id: 'all', label: 'All Orders', icon: LayoutGrid },
  { id: 'Medicines', label: 'Medicine', icon: Pill },
  { id: 'Lab Test', label: 'Lab Tests', icon: FlaskConical },
  { id: 'Appointment', label: 'Appointments', icon: Calendar },
];

export default function OrderFilters({ active, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <div className="flex items-center gap-2 flex-wrap">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all
              ${active === id
                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-blue-100'
                : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
              }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
      <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all">
        <SlidersHorizontal className="w-4 h-4" />
        Filter
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
