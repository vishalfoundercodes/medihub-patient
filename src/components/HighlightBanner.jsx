import { Shield } from 'lucide-react';

export default function HighlightBanner() {
  return (
    <section className="bg-[var(--color-bg-main)] pb-2">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-xl p-4 flex items-center gap-4 text-white relative overflow-hidden">
          <Shield className="w-18 h-18 md:w-10 md:h-10" />
          <div>
            <h3 className="text-sm md:text-xl font-semibold mb-0">
              Your Health, Our Priority
            </h3>
            <p className="text-blue-100 text-sm md:text-xl">
              Accurate tests, genuine medicines and expert care – all in one
              place.
            </p>
          </div>
          <svg
            className="absolute right-0 top-0 h-full opacity-10"
            width="200"
            viewBox="0 0 200 100"
            fill="white"
          >
            <path d="M0,50 Q50,0 100,50 T200,50 L200,100 L0,100 Z" />
          </svg>
        </div>
      </div>
    </section>
  );
}
