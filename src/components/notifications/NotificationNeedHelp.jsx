import { Headphones, MessageCircle } from 'lucide-react';

export default function NotificationNeedHelp() {
  return (
    <div className="bg-[var(--color-bg-section)] rounded-2xl border border-[var(--color-border)] p-5">
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
          <Headphones className="w-7 h-7 text-[var(--color-primary)]" />
        </div>
      </div>
      <h3 className="font-bold text-[var(--color-text-dark)] mb-2 text-center">Need Help?</h3>
      <p className="text-sm text-[var(--color-text-secondary)] text-center mb-4 leading-relaxed">
        If you have any questions or need assistance, our support team is here to help you.
      </p>
      <button className="w-full flex items-center justify-center gap-2 border border-[var(--color-border)] hover:border-[var(--color-primary)] bg-white text-sm font-semibold text-[var(--color-text-dark)] py-2.5 rounded-xl transition-all hover:bg-blue-50">
        <MessageCircle className="w-4 h-4 text-[var(--color-primary)]" />
        Contact Support
      </button>
    </div>
  );
}
