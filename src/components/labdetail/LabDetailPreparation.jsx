import { CheckCircle } from 'lucide-react';

export default function LabDetailPreparation({ steps }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-5">Preparation Instructions</h3>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-[var(--color-bg-section)] rounded-xl">
            <CheckCircle className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--color-text-secondary)]">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
