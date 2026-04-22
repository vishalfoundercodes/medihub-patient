import { ChevronDown } from 'lucide-react';
import { categories } from '../../data/labTestsData';

export default function CategoryTabs({ active, onChange }) {
  return (
    <div className="bg-white border-b border-[var(--color-border)] sticky top-[65px] z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-3">
          {categories.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => onChange(label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border
                ${active === label
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-blue-100'
                  : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                }`}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
          {/* <button className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all">
            More <ChevronDown className="w-4 h-4" />
          </button> */}
        </div>
      </div>
    </div>
  );
}
