import { Mail } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[var(--color-bg-section)] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-white p-4 rounded-full">
              <Mail className="w-8 h-8 text-[var(--color-primary)]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[var(--color-text-dark)] mb-1">Subscribe to our newsletter</h3>
              <p className="text-[var(--color-text-secondary)]">Get health tips & offers in your inbox</p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-80 px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            <button className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-lg font-medium hover:bg-[var(--color-primary-dark)] whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
