import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function LabDetailFAQs({ faqs }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-5">Frequently Asked Questions</h3>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-[var(--color-border)] rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[var(--color-bg-section)] transition-colors"
            >
              <span className="text-sm font-semibold text-[var(--color-text-dark)]">{faq.q}</span>
              {open === i
                ? <ChevronUp className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                : <ChevronDown className="w-4 h-4 text-[var(--color-text-secondary)] shrink-0" />
              }
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border)] pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
