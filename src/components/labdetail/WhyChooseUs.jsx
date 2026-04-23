import { ShieldCheck, ClipboardCheck, Home, Zap } from 'lucide-react';

const icons = [ShieldCheck, ClipboardCheck, Home, Zap];

export default function WhyChooseUs({ items }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-4">Why Choose Us?</h3>
      <div className="space-y-3">
        {items.map((item, i) => {
          const Icon = icons[i] || ShieldCheck;
          return (
            <div key={item.title} className="flex items-center gap-3">
              <div className={`${item.bg} w-9 h-9 rounded-xl flex items-center justify-center shrink-0`}>
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-dark)]">{item.title}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
