import { IdCard, Clock, RefreshCw, FileText } from 'lucide-react';

const icons = [IdCard, Clock, RefreshCw, FileText];

export default function ApptInstructions({ instructions }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-4">Important Instructions</h3>
      <div className="space-y-3">
        {instructions.map((text, i) => {
          const Icon = icons[i] || FileText;
          return (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[var(--color-primary)]" />
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed pt-1">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
