import { MessageCircle, Phone } from 'lucide-react';

export default function NeedHelp() {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-1">Need Help?</h3>
      <p className="text-sm text-[var(--color-text-secondary)] mb-4">Our support team is here to help you</p>
      <button className="w-full border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-blue-50 font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm transition-all mb-3">
        <MessageCircle className="w-4 h-4" /> Contact Support
      </button>
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
        <Phone className="w-4 h-4 text-[var(--color-primary)]" />
        <span>Call us: <span className="font-semibold text-[var(--color-text-dark)]">1800-123-4567</span></span>
      </div>
    </div>
  );
}
