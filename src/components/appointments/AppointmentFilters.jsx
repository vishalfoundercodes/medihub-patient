import { LayoutGrid, Clock, CheckCircle, XCircle, SlidersHorizontal, ChevronDown } from 'lucide-react';

const tabs = [
  { id: 'all', label: 'All Appointments', icon: LayoutGrid },
  { id: 'Upcoming', label: 'Upcoming', icon: Clock },
  { id: 'Completed', label: 'Completed', icon: CheckCircle },
  { id: 'Cancelled', label: 'Cancelled', icon: XCircle },
];

export default function AppointmentFilters({ active, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <div className="flex items-center gap-2 flex-wrap">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-xl text-sm font-medium border transition-all
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
      {/* <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all">
        <SlidersHorizontal className="w-4 h-4" />
        Filter
        <ChevronDown className="w-3.5 h-3.5" />
      </button> */}
    </div>
  );
}
