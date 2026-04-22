import { ShieldCheck, Truck, Lock, RotateCcw, FileText } from 'lucide-react';

const items = [
  { icon: ShieldCheck, title: 'Genuine Medicines', desc: '100% authentic medicines', color: 'text-teal-600', bg: 'bg-teal-50' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Quick delivery at your doorstep', color: 'text-[var(--color-primary)]', bg: 'bg-blue-50' },
  { icon: Lock, title: 'Secure Payment', desc: '100% secure payments', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: RotateCcw, title: 'Easy Returns', desc: 'Hassle-free returns', color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: FileText, title: 'Prescription Support', desc: 'Upload prescription & relax', color: 'text-green-600', bg: 'bg-green-50' },
];

export default function MedicineTrustBar() {
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-2xl p-5 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {items.map(({ icon: Icon, title, desc, color, bg }) => (
          <div key={title} className="flex items-center gap-3">
            <div className={`${bg} w-11 h-11 rounded-xl flex items-center justify-center shrink-0`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-text-dark)]">{title}</p>
              <p className="text-xs text-[var(--color-text-secondary)]">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
