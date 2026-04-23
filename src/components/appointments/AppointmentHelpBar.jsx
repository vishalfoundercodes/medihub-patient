import { Headphones, MessageCircle } from 'lucide-react';

export default function AppointmentHelpBar() {
  return (
    <div className="bg-[var(--color-bg-section)] rounded-2xl border border-[var(--color-border)] p-5 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
          <Headphones className="w-6 h-6 text-[var(--color-primary)]" />
        </div>
        <div>
          <p className="font-bold text-[var(--color-text-dark)]">Need help with your appointment?</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Our support team is here to help you.</p>
        </div>
      </div>
      <button className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-blue-100 whitespace-nowrap">
        <MessageCircle className="w-4 h-4" />
        Contact Support
      </button>
    </div>
  );
}
